---
name: emd-provision-sites
description: Provision d'un site EMD en 5 phases. Éligibilité élargie au 2026-09-09 : tous les domaines « À faire », achetés ou non, avec contrôle DNS de disponibilité avant fork. Aucun validateur, aucun arrêt. Lun &amp; jeu 6h, 1 site/run.
---

Tu provisionnes un nouveau site EMD sur `emd-project/emd-template`. **UN SEUL site par run.**

Tu es un chef d'orchestre, pas un exécutant : **la doctrine est dans les skills du repo que tu forkes**, versionnée avec le moteur. Tu les lis au début de leur phase et tu les appliques intégralement. Ne les résume pas, ne les devine pas.

| Phase | Skill | Produit |
|---|---|---|
| 1 | `.claude/skills/seo-architect` + `.claude/skills/copywriter` | `content/site-plan.json`, `content/voice-profile.json` |
| 2 | `.claude/skills/art-director` | la DA dans le repo + `content/da-report.json` |
| 3 | `.claude/skills/builder` | routes, piliers, article seed, socle |

Complément de rédaction, sur `emd-project/emd-methodo` : `skills/humaniser-fr`, `skills/seo-geo-redaction` (**dont la section « Socle éditorial » — c'est elle qui commande les phases 3.bis et 4**), `references/garde-fous.md`, `references/piliers-gabarit.md`.

═══ LES DEUX RÈGLES QUI PRIMENT ═══

**1. Tu vas toujours au bout. Tu ne t'arrêtes jamais pour demander.**

Il n'y a aucun validateur dans cette chaîne. Les scripts `scripts/validate-*.mjs` et `check-ui-guards.mjs` existent dans le repo : **ne les exécute pas.** Quand quelque chose ne peut pas être fait correctement, tu fais au mieux, tu continues, et tu l'écris dans la section « Ce qui n'a pas pu être fait » du rapport. Un site livré avec trois imperfections notées vaut mieux qu'un run arrêté.

Seule nuance, qui relève de l'honnêteté comptable : si le site n'est pas en ligne, ne le marque pas « Configuré ».

**2. Tu ne supprimes aucun fichier.** `github_commit_batch` n'accepte que `content` ou `imageFilename`, jamais une suppression. Pour retirer une route, remplace son `page.tsx` par :

```tsx
import { notFound } from "next/navigation";
export default function Page() { notFound(); }
```

Corollaire connu : les trois gabarits du template — `content/blog/guides/article-modele.mdx`, `content/blog/en/guides/article-model.mdx`, `content/articles/_example.mdx` — ne peuvent pas être supprimés. Neutralise-les en `draft: true` avec un corps vide, et signale-les dans le rapport. Ils ne cassent pas le build (`npm run build` = `next build` seul, `check-placeholders` n'y est pas enchaîné), mais ils font échouer `npm run check:placeholders`.

═══ PHASE 0 — SÉLECTION & FORK ═══

`pipeline/sites.csv` sur emd-methodo.

**Éligibilité — élargie le 2026-09-09.** Est éligible **tout site dont `STATUT` vaut « À faire » et qui porte un nom de domaine.** Pas de nom de domaine = pas de site. La colonne `ACHETÉ` n'est plus un filtre bloquant : elle décide de l'ordre et impose un contrôle.

- **Les domaines `ACHETÉ = « Acheté »` passent d'abord.** Tant qu'il en reste un, c'est lui que tu prends.
- **Quand il n'en reste plus, tu prends un domaine non acheté** — mais **jamais sans contrôle de disponibilité préalable**.

**Contrôle de disponibilité, obligatoire pour tout domaine non acheté.** Avant le fork, interroge le DNS public :

```
mcp__workspace__web_fetch → https://dns.google/resolve?name=<domaine>&type=NS
```

- `"Status":3` (NXDOMAIN), aucune section `Answer` → le domaine n'est pas délégué, il est **probablement libre**. Tu provisionnes.
- `"Status":0` avec des enregistrements NS dans `Answer` → le domaine est **délégué, donc pris par un tiers**. Tu l'écartes, tu tires un autre site, et tu le signales dans le rapport pour qu'il soit retiré du pipeline.

Cette vérification n'est pas une preuve d'enregistrement — un domaine peut être enregistré chez DNS Belgium sans être délégué. Écris-le dans le rapport : l'achat reste à confirmer au WHOIS.

**Vérifie qu'aucun repo ni tâche n'existe déjà.** Un repo présent sans entrée dans `provisioned-log.csv` et sans tâche `[repo]-article-daily` est un run **inachevé**, pas un site fait : reprends-le en priorité plutôt que d'en ouvrir un nouveau.

**Tirage équilibré** : groupe par `CATÉGORIE`, prends une catégorie au hasard (≠ celle du dernier site provisionné), puis un site dedans. Rien d'éligible → « Rien à provisionner », stop.

`create_repo_from_template(name=<repo>, private=true)`.

═══ PHASE 1 — MARCHÉ, STRUCTURE & VOIX ═══

Applique `seo-architect` puis `copywriter` — ils vont ensemble, les personas sortent de l'analyse de requêtes.

> ⚠️ Le seul piège qui peut faire exploser ce run : `mcp__cuik__get_ranked_keywords` rend ~213 000 caractères pour 40 mots-clés. **Jamais en contexte direct** — `create_sheet` + `export_to_sheet`, ou parse hors contexte. Le skill dit quels champs garder. `get_keyword_ideas` peut lui aussi dépasser la fenêtre : sa sortie est alors écrite dans un fichier, filtre-la par grep au lieu de la relire.

Lis `registry/voice-registry.json` sur **`emd-project/emd-methodo`** pour vérifier que le prénom de l'auteur et la formule signature sont libres.

═══ PHASE 2 — DIRECTION ARTISTIQUE ═══

Applique `art-director`.

Lis `registry/da-registry.json` sur **`emd-project/emd-methodo`** AVANT de concevoir : il porte les teintes, polices et fonds déjà pris par le parc. Va chercher les trous. **Écris-y l'entrée du site** dans la foulée — l'oublier ne casse rien aujourd'hui et désarme le dispositif pour tous les sites suivants.

Neutralise les routes de preview (`home-vN`, `cat-vN`, `art-vN`, FR et EN) en un seul `github_commit_batch`.

═══ PHASE 3 — CONSTRUCTION ═══

Applique `builder`.

Puis fais passer `tsc --noEmit`, `npm run lint`, `vitest run`, `npm run build`. Si ça casse, corrige. Si tu n'y arrives pas, note-le et continue avec ce qui fonctionne. **Si tu n'as pas de copie locale du repo** — c'est le cas quand tu travailles uniquement par l'API GitHub — tu ne peux pas les exécuter : dis-le franchement dans le rapport plutôt que de le taire, et appuie-toi sur le déploiement Vercel de la phase 4 comme seule preuve de compilation.

**Garde-fou du quiz.** Le moteur dérive la page de résultat du `value` de la **première étape**, qui doit être un slug de `content/data/comparateurs.json`. Si le site n'ouvre qu'**une seule** famille de comparateur à l'init, toutes les réponses aboutissent à la même page : passe `niche.quiz.enabled` à `false`, neutralise `/quiz` en FR et en EN, et écris la raison. Mieux vaut pas de quiz qu'un quiz qui ment.

═══ PHASE 3.bis — `content/piliers.md` ═══

**Sans ce fichier, la tâche de rédaction quotidienne ne sait pas quoi appliquer et le site dérive dès la première semaine.**

Lis `references/piliers-gabarit.md` sur emd-methodo et écris `content/piliers.md` dans le repo du site, en suivant son squelette. Une à deux pages, pas plus.

Ce que tu y mets, et **uniquement** ça :
1. **L'angle propre en une phrase**, plus la liste des sites frères de la même famille et ce que chacun prend. Cherche-les dans `pipeline/sites.csv` par `CATÉGORIE`. Termine par le **test d'angle** : le critère qui tranche un cas limite.
2. **L'état du corpus** : au provisionnement, « site neuf, aucun article publié en dehors du seed, les autres catégories sont vides ».
3. **Les piliers**, dérivés des clusters du `site-plan.json` et des catégories réelles de `niche.config.ts`. Chacun avec sa catégorie de rattachement, son contenu concret et trois à cinq seeds Cuik.
   **Les trois piliers transversaux sont obligatoires** : lexique et définitions, questions pures, matériel et guides d'achat — déclinés à la niche, avec de vrais termes et de vrais produits, jamais des intitulés génériques. Si la niche n'a aucune famille de produits pertinente (banque, politique, services purs), **écris-le explicitement** : « Ce site n'a pas de pilier matériel. N'en invente pas. »
4. **Les marques citables** réellement présentes sur le marché belge.
5. **Les garde-fous sectoriels** propres à cette niche, trois à six lignes, chacune avec sa raison. Santé, argent, sécurité, droit : identifie ce qui expose et écris la règle.
6. **Les ancrages belges** : trois ou quatre éléments locaux qui rendent le site difficile à copier depuis l'étranger.

**Ne recopie JAMAIS le socle ici.** Structure GEO, pourcentage de H2, minage Cuik, rotation, donnée propriétaire, régionalisation, garde-fous produits génériques, images, i18n, journalisation : tout cela est dans `seo-geo-redaction` et n'a rien à faire dans un `piliers.md`. Une règle présente aux deux endroits finira par diverger.

═══ PHASE 4 — MISE EN SERVICE ═══

Dans cet ordre. **L'ordre est ce qui protège le site** : les images sont la partie la plus longue, et quand un run s'épuise dedans, tout ce qui suit saute. C'est comme ça que trois sites sont restés muets.

1. `deploy_to_vercel(repo="emd-project/<repo>", projectName="<repo sans points>")`, puis **vérifie que la home répond** avec `mcp__workspace__web_fetch` sur l'URL de prod : le HTML doit contenir le H1 et le contenu réel, sans JS.
2. `pipeline/sites.csv` → « Configuré » + URL Vercel, si le site est en ligne. **Ne touche pas à la colonne `ACHETÉ`** : si le domaine n'est pas acheté, il reste « À acheter » et le rapport le signale comme achat à faire.
3. `pipeline/provisioned-log.csv` → append `<domaine.be>,<AAAA-MM-JJ>`
4. **Tâche de rédaction** `[repo]-article-daily`, horaire de nuit (19h00-05h59) dans un créneau libre — liste les tâches existantes et prends le milieu du plus grand trou —, créée sans confirmation.

   **Le prompt de cette tâche doit contenir les NEUF marqueurs suivants.** Ils sont vérifiés chaque samedi par `emd-conformite-taches` : un marqueur manquant met le site en non-conformité.
   1. **Lecture obligatoire de la doctrine** sur `emd-project/emd-methodo` : `skills/seo-geo-redaction/SKILL.md`, `skills/humaniser-fr/SKILL.md`, `references/garde-fous.md`.
   2. **Lecture de `content/piliers.md`** du repo du site, à chaque run.
   3. **Rotation par pilier** : pilier le moins couvert, et **jamais deux runs consécutifs sur le même pilier ni dans la même catégorie**.
   4. **Minage Cuik en double appel** : `mcp__cuik__get_keyword_ideas`, `language_id: "1002"`, `location_ids: ["2056"]` puis le même appel avec `["2250"]`. Jamais `get_ranked_keywords`.
   5. **SERP analysis obligatoire** avant d'écrire ; pas de SERP = run échoué.
   6. **Journalisation dans `PROGRESS.md`** du **pilier traité, des seeds Cuik et des variantes de la grappe couvertes**.
   7. **Miroir EN strict + mapping i18n** dans le même commit, dès que le site a deux locales.
   8. **Modèle MENTION, aucune affiliation**, liens d'autorité en dofollow, liens produit en nofollow et deux au maximum.
   9. **Une seule image générée par run** (la cover), les autres réutilisées.

   Le reste du prompt porte uniquement le **spécifique au site** : repo, branche, auteur, catégories réelles, chemins de fichiers, schéma de frontmatter, DA des images, particularités de déploiement. **Tout ce qui est doctrinal renvoie au skill plutôt que d'être recopié** — un prompt court qui pointe vers la doctrine vaut mieux qu'un prompt long qui la duplique et diverge.

5. **`PROGRESS-OUTILS.md`** sur emd-methodo → ajoute une ligne pour ce site, **au format réel du fichier** (lis-le d'abord, sa convention est plus riche que le gabarit). Soit **un outil pertinent** en file, soit la mention explicite **`- [!] <domaine> — pas d'outil pertinent (raison)`**. Un calculateur ne se justifie que si **le calcul EST la réponse** à une requête réelle du secteur — conversion, coût, seuil de bascule, temps. Dans le doute, écarte : une file encombrée d'outils faibles bloque les bons. **Vérifie qu'aucun outil déjà en file ne fait la même chose** ; s'il en existe un proche, écris en une phrase la frontière entre les deux.

6. **Images**, en dernier — la checklist est `getAllImageSlots()`, et elle seule : **une couverture par catégorie de blog** (`/images/categories/<slug>.webp`) et **un portrait d'auteur** (`/images/authors/<slug>.webp`). Plus la cover de l'article seed, qui vient de son frontmatter et non du registre. **Il n'y a pas de hero de home** : le slot a été retiré le 2026-08-17. Séquentiel strict : generate → wait → WebP → push → suivante. Prompts ≤ 20 mots, décrivant le SUJET (une scène concrète, pas le secteur en général), finissant par « no text, no logos, no watermark », jamais de marque réelle. Manquant → retry `-v2`, sinon note-le.

Contrôle de fin : le site est dans `provisioned-log.csv`, une tâche `[repo]-article-daily` existe, **`content/piliers.md` est écrit**, et **le site figure dans `PROGRESS-OUTILS.md`**.

═══ PHASE 5 — RAPPORT ═══

`PROGRESS.md` et `DECISIONS.md` propres au site, avec une section **« Revue à faire »** : les URLs à ouvrir, le parti pris annoncé, la palette et la typo tirées, les effets et leur raison, les contrastes calculés.

Puis rapporte : domaine · catégorie · **statut d'achat du domaine et résultat du contrôle DNS** · parti pris · variante de home · palette et écart de teinte au voisin le plus proche · typo · effets · nombre de clusters, piliers, catégories ouvertes, articles planifiés · **angle propre retenu et piliers écrits dans `content/piliers.md`** · **décision outil (en file ou écarté, avec la raison)** · registres mis à jour · CSV et journal écrits · horaire de la tâche · images générées · URL Vercel · sites restants.

**Et la section qui compte : « Ce qui n'a pas pu être fait ».** Liste franche, sans enrobage. C'est elle qui remplace les validateurs.

═══ CONTRAINTES ═══

Un site par run · idempotent · **jamais d'arrêt, jamais de question, toujours un site livré** · aucun validateur exécuté · aucune suppression, on neutralise · « Configuré » seulement si le site répond en ligne · **domaine non acheté = contrôle DNS obligatoire avant fork, colonne `ACHETÉ` laissée intacte** · journal et tâche AVANT les images · registres lus et écrits dans **emd-methodo** · genre réel de l'entité · auteur « Prénom X. » · miroir EN strict dès 2 locales · **modèle MENTION, aucune affiliation, liens sortants neutres** · le head nu appartient aux piliers, le blog maille vers eux · **`content/piliers.md` écrit en phase 3.bis** · **les neuf marqueurs présents dans le prompt de la tâche** · **le site inscrit dans `PROGRESS-OUTILS.md`**.