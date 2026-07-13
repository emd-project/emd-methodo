# Anti-placeholder

**Règle :** un site EMD ne publie jamais un contenu que personne n'a écrit.
Une section absente vaut mieux qu'une section « Modèle A ».

---

## 1. Le problème constaté

Le template `emd-project/emd-template` est cloné sur une vingtaine de sites. Il livrait des
**placeholders silencieux** : du faux contenu qui *ressemble* à du vrai, censé être remplacé
« à l'init »… et qui ne l'a jamais été. Résultat : ça tourne en prod, indexé, lisible par les
visiteurs et par les LLM.

Inventaire de ce qui est parti en prod :

| Fichier | Placeholder |
|---|---|
| `components/quiz/QuizEngine.tsx` | Questions « Catégorie A / B / C », `recommend()` renvoyant `modele: 'Modèle placeholder'`, `prix: 'À définir'`, et le texte « le contenu sera personnalisé selon votre niche à l'init » |
| `content/pages/quiz.yaml` | Mêmes questions « Catégorie A / B / C » côté CMS |
| `content/data/comparateurs.json` | « Modèle A / B / C » à 299 / 249 / 399 €, « Comparatif de démonstration — à remplacer à l'init » |
| `content/data/classements.json` | Top 3 « Modèle A / B / C » avec scores et verdicts inventés |
| `content/data/choisir.json` | `{}` → pages `/choisir` sans contenu éditorial |
| `app/(site)/deals/page.tsx` | `const DEALS: Deal[] = []` → page deals vide |
| `app/(site)/simulateur/page.tsx` | `const CYCLES: CyclePrix[] = []` → simulateur vide |
| `content/produits/_example.yaml`, `content/articles/_example.mdx` | Gabarits jamais supprimés — `_example.mdx` était même **publié** à l'URL `/_example` |
| `content/blog/guides/article-modele.mdx` | Article gabarit publié (`draft: false`) |

**Pourquoi ça a tenu si longtemps :** rien ne cassait. Le build passait, la page s'affichait,
le déploiement était vert. Le placeholder était *plausible*. Personne ne le voyait.

---

## 2. La parade

Quatre couches, dans le repo `emd-template` (donc héritées par tous les nouveaux sites).

### a. Un script de détection — `scripts/check-placeholders.mjs`

Node pur, zéro dépendance. Scanne `app/`, `components/`, `content/`, `lib/`, `packages/` +
`niche.config.ts` (ignore `node_modules`, `.next`, `.git`, `docs`, `skills`, `tests`, `scripts`).
**Sort en code 1** dès qu'il détecte :

- des **chaînes gabarits** : `Modèle A/B/C`, `Catégorie A/B/C`, `Category A`, `Modèle placeholder`,
  `À définir`, `sera personnalisé`, `à remplacer à l'init`, `Comparatif de démonstration`,
  `contenu exemple`, `TBD`, `Lorem ipsum` ;
- des **tableaux de data vides en dur** : `const DEALS: Deal[] = []`, `const CYCLES: CyclePrix[] = []` ;
- des **JSON de data vides** : `content/data/*.json` qui parse en `{}` ou `[]` ;
- des **gabarits encore présents** : `content/**/_example.*`, `content/**/article-modele.mdx` ;
- un **quiz activé sans questions** : `niche.quiz.enabled: true` + `content/pages/quiz.yaml` avec `steps: []`.

Sortie : `fichier:ligne — motif détecté`, groupée par fichier, + `X placeholder(s) dans Y fichier(s)`.
Flag `--warn-only` pour afficher sans échouer.

```bash
npm run check:placeholders
npm run check:placeholders -- --warn-only
```

**Gate auto-armé.** Tant que `niche.config.ts` est celui du template nu (`siteName: 'emd-template'`,
`domain: 'example.com'`), le script reste en warn-only — le template contient des gabarits par
construction. Dès que la niche est configurée, il bloque. Rien à activer, rien à oublier.

### b. Le build gate

`package.json` : `"build": "node scripts/check-placeholders.mjs && next build"`.
→ **un déploiement Vercel échoue** tant qu'un placeholder subsiste. C'est la couche qui compte :
elle empêche physiquement la mise en prod.

### c. La CI

`.github/workflows/check-placeholders.yml` : sur `push` et `pull_request` → checkout, setup-node,
`npm run check:placeholders`. Le job échoue rouge. On le voit avant de déployer.

### d. Des composants qui échouent au lieu de mentir

Le vrai fond du problème n'est pas le script — c'est que le template **fabriquait** du faux contenu.
Contrat changé :

- **`QuizEngine`** : `DEFAULT_STEPS_FR` / `DEFAULT_STEPS_EN` et la `recommend()` bidon sont
  **supprimés**. Sans `steps` : `throw new Error(...)` explicite en dev, `return null` en prod.
  La recommandation finale vient d'une prop `recommend` ; à défaut, on n'affiche que des faits
  (le choix du visiteur + liens `/comparer` et `/choisir`) — jamais un modèle ni un prix inventés.
- **Data vide = section absente.** `/quiz` renvoie 404 sans questions. `/choisir/[produit]` ne rend
  pas le bloc quiz s'il n'existe pas. Les hubs `/comparer`, `/classement`, `/deals`, `/simulateur`
  affichent un état vide explicite. `content/data/*.json` du template sont vides (`{}`) — la
  structure de référence vit dans `docs/examples/*.example.json`, hors du contenu livré.
- **Gabarits non publiables** : `lib/blog.ts` ignore les fichiers `_*.mdx` (fini `/_example`), et
  `article-modele.mdx` est en `draft: true`. Ils doivent quand même être supprimés — le check les réclame.

---

## 3. Checklist à chaque nouveau site

À faire **avant** le premier déploiement (et à revérifier après toute reprise du template).

- [ ] `niche.config.ts` renseigné (`siteName`, `domain`, `entity`/`entities`, `entityGender`, catégories).
      C'est ce qui **arme** le garde-fou.
- [ ] `content/data/comparateurs.json` (+ `.en.json` si locale EN) : vraies familles, vrais modèles,
      vrais prix. Structure : `docs/examples/comparateurs.example.json`.
- [ ] `content/data/classements.json` (+ `.en.json`) : vrai Top issu d'un check SERP.
      Structure : `docs/examples/classements.example.json`.
- [ ] `content/data/choisir.json` : contenu éditorial des pages `/choisir/[produit]`.
- [ ] `content/pages/quiz.yaml` : vraies questions **ou** `niche.quiz.enabled: false` dans `niche.config.ts`.
- [ ] `app/(site)/deals/page.tsx` → `DEALS` rempli, **ou** page supprimée.
- [ ] `app/(site)/simulateur/page.tsx` → `CYCLES` rempli, **ou** page supprimée.
- [ ] Gabarits **supprimés** : `content/produits/_example.yaml`, `content/articles/_example.mdx`,
      `content/blog/guides/article-modele.mdx`.
- [ ] `npm run check:placeholders` → « aucun placeholder détecté ».
- [ ] `npm run build` passe (le check est enchaîné dedans).
- [ ] Le workflow GitHub `check-placeholders` est vert sur `main`.

### Sur les sites déjà en prod (les ~20 clones existants)

Le garde-fou vit dans le template : les clones **ne l'ont pas** tant qu'on ne le leur porte pas.
Pour chaque site existant :

1. Copier `scripts/check-placeholders.mjs` + `.github/workflows/check-placeholders.yml`.
2. Enchaîner le check dans le `build` du `package.json`.
3. Lancer `npm run check:placeholders -- --warn-only` → inventaire du site.
4. Boucher les trous (contenu réel) ou supprimer les sections concernées.
5. Retirer `--warn-only` : à partir de là, le site ne peut plus régresser.

---

## 4. La règle, en une ligne

**Le template livre des trous, pas du faux.** Un trou fait échouer le build ; du faux passe en prod.
