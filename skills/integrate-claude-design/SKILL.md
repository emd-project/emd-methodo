---
name: integrate-claude-design
version: 1.2.0
description: Intègre les outputs livrés par Claude Design (JSX, HTML, snippets Tailwind, mockups, descriptions de sections) dans la structure du template emd-template. Mappe les pages vers app/, les composants vers components/, les tokens vers niche.config.ts, applique les conversions techniques (variables CSS, next/image, RSC vs 'use client'), réutilise les composants MDX existants, ET propage la DA à TOUTES les pages du site (home, hub blog, sous-hub catégorie, article, comparateur, produit, quiz). À utiliser quand l'utilisateur dit « intègre ce qui est dans design-incoming », « merge les designs », « applique les outputs Claude Design », « intègre les écrans livrés », ou quand le dossier design-incoming/ à la racine du repo contient des fichiers à traiter.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# integrate-claude-design — Intégration des outputs Claude Design

## Mission

Quand le dossier `design-incoming/` contient des fichiers livrés par Claude Design (un site externe qui génère du JSX, HTML, snippets Tailwind, mockups), ton rôle est de :

1. Lire chaque fichier livré avant toute action.
2. Mapper chaque output sur la structure du template (pages → `app/`, composants → `components/`, tokens → `niche.config.ts`, contenus → `content/`).
3. Appliquer les conversions techniques obligatoires (variables CSS, `next/image`, RSC par défaut, syntaxe Tailwind v4).
4. Réutiliser les composants MDX et UI déjà présents plutôt que les ressaisir.
5. **Propager la DA à TOUTES les pages, pas seulement la home** (cf. Étape 6 — garde-fou).
6. Respecter le filtre qualité de `CLAUDE.md`.
7. Nettoyer le dossier `design-incoming/` une fois l'intégration committée.

Ne jamais proposer un questionnaire d'init ou une génération de boilerplate à partir de rien. L'init est géré par le skill `nouveau-site` (qui route vers `init-site` ou `configure-from-spec`). Ce skill-ci gère UNIQUEMENT l'intégration de `design-incoming/`. Le workflow est linéaire : outputs livrés → mapping → conversions → **cohérence toutes pages** → nettoyage.

---

## Étape 1 — Reconnaissance

Avant tout, recense ce qui est dans `design-incoming/` :

```bash
ls -la design-incoming/
```

Pour chaque fichier, identifie son type (page complète, section, composant réutilisable, mockup, description textuelle) et son intention. Si un fichier est ambigu, demande à l'utilisateur avant de mapper.

Lis chaque fichier intégralement avant d'écrire la moindre ligne dans `app/` ou `components/`. Pas de mapping aveugle.

---

## Étape 2 — Mapping vers la structure du template

| Type d'output Claude Design | Destination dans le template |
|---|---|
| Page complète (home, page produit, page comparateur…) | `app/[route]/page.tsx` |
| Layout / wrapper | `app/[route]/layout.tsx` |
| Composant réutilisable (Hero, Card, Footer custom…) | `components/[Nom].tsx` |
| Section spécifique à une page | `app/[route]/_components/[Nom].tsx` |
| Tokens (couleurs, fonts, vocabulaire, logo) | Champs de `niche.config.ts` |
| Contenu éditorial (texte, FAQ, briefs) | `content/` selon le type |
| Mockup PNG / référence visuelle | `public/images/design-references/` (ou jeté si plus nécessaire après intégration) |

Si Claude Design a livré un composant qui existe déjà dans `components/` sous un autre nom, **ne pas dupliquer**. Le signaler à l'utilisateur, proposer soit :
- d'enrichir le composant existant avec les nouveautés du livrable,
- soit de remplacer le composant existant si le livrable est meilleur.

---

## Étape 3 — Conversions techniques obligatoires

Aucun output Claude Design ne va dans le repo tel quel. Applique systématiquement :

### 3.1 Couleurs et fonts en dur → variables CSS

```tsx
// ❌ Avant (livré par Claude Design)
<div className="bg-[#FF3D57] text-white font-['Unbounded']">

// ✅ Après (intégré dans le template)
<div className="bg-[var(--accent-1)] text-[var(--text-primary)] font-display">
```

Toutes les couleurs viennent de `niche.config.ts` → exposées comme variables CSS (`--accent-1` à `--accent-5`, `--bg-primary`, `--bg-surface`, `--text-primary`, etc.). Les fonts viennent des mêmes variables (`--font-display`, `--font-primary`, `--font-mono`).

Si Claude Design a livré une couleur ou une font qui ne correspond à aucun token de `niche.config.ts` :
- soit l'ajouter à `niche.config.ts` (en discuter avec l'utilisateur d'abord),
- soit utiliser le token le plus proche.

### 3.2 `<img>` → `next/image`

```tsx
// ❌ Avant
<img src="/hero.jpg" alt="Hero" className="w-full" />

// ✅ Après
import Image from 'next/image'
<Image src="/hero.jpg" alt="Hero décrivant le sujet en mots-clés" width={1200} height={600} className="w-full" />
```

L'`alt` doit être descriptif (pas « Hero » ou « Image »). Si Claude Design n'a pas fourni d'alt utile, **demander à l'utilisateur** plutôt que d'inventer.

### 3.3 Server Component par défaut, `'use client'` seulement si interactif

```tsx
// ❌ Avant (par défaut chez Claude Design)
'use client'
export default function Hero() {
  return <section>...</section>
}

// ✅ Après (si aucun event handler, aucun useState, aucun useEffect)
export default function Hero() {
  return <section>...</section>
}
```

Garder `'use client'` uniquement si le composant a effectivement : un `onClick`, un `useState`, un `useEffect`, ou un hook React quelconque. Sinon, le retirer — c'est plus rapide et plus léger.

### 3.4 Syntaxe Tailwind v4 (pas v3)

Claude Design peut sortir du Tailwind v3 par habitude. À traduire :

| Tailwind v3 | Tailwind v4 |
|---|---|
| `text-opacity-50` | `text-[color]/50` (couleur/opacité inline) |
| `bg-opacity-X` | `bg-[color]/X` |
| `@layer` custom | Variables CSS dans `globals.css` |
| `theme()` dans CSS | `var(--token)` directement |

Verify avec `grep -r "text-opacity-\|bg-opacity-" components/ app/` — si ça renvoie un résultat post-intégration, c'est qu'il reste du v3.

### 3.5 Pas de fonts.googleapis.com en dur

Si Claude Design a inclus un `<link href="https://fonts.googleapis.com/...">` : à retirer. Les fonts passent par `next/font` configuré dans `app/layout.tsx`.

### 3.6 Liens sortants → liens neutres (pas d'affiliation)

Un lien sortant (vers une marque, un fabricant, une source) est un **lien neutre**. Le modèle EMD ne repose sur **aucune affiliation** : pas de tag d'affiliation, pas de composant `AffiliateLink`, pas de plugin de réécriture de liens. La monétisation passe par la mention de marque, pas par une commission sur ces sites.

```tsx
// ❌ Avant (livré par Claude Design, à ne PAS reproduire)
import { AffiliateLink } from '@/components/AffiliateLink'
<AffiliateLink href="https://exemple.com/produit">Voir le produit</AffiliateLink>

// ✅ Après (lien neutre standard)
<a href="https://exemple.com/produit" rel="noopener">Voir le produit</a>
```

Si un output contient un lien « affilié » (tag d'affiliation dans l'URL, wrapper `AffiliateLink`, plugin remark de tagging) : le **décâbler** vers un lien sortant neutre. Aucune affiliation n'est configurée sur ces sites, et il ne faut pas en introduire.

---

## Étape 4 — Réutiliser les composants MDX existants

Le template embarque déjà une bibliothèque de composants pour le contenu éditorial. Si Claude Design propose un équivalent, **réutiliser l'existant** :

| Besoin | Composant template à réutiliser |
|---|---|
| Image inline dans un article | `<ArticleImage>` |
| Carte produit | `<ProductCTA>` |
| Carousel horizontal de produits | `<ProductCarousel>` |
| Barre de comparaison visuelle | `<CompareBar>` / `<CompareBarGroup>` |
| Bloc conseil | `<Tip>` |
| Bloc avertissement | `<Warning>` |
| Verdict avec note | `<Verdict>` |
| Tableau pros/cons | `<ProConTable>` |
| Citation mise en avant | `<PullQuote>` |
| Statistique | `<StatCard>` / `<StatRow>` |

Ne pas ré-inventer un composant qui existe déjà. Si l'output Claude Design est *meilleur* que l'existant : proposer une amélioration du composant existant, ne pas créer un parallèle.

---

## Étape 5 — Tokens vers niche.config.ts

Si Claude Design a livré des tokens (palette, fonts, nom du site, tagline, vocabulaire de niche, signature DA) :

1. Ouvrir `niche.config.ts`.
2. Mettre à jour les champs correspondants (`siteName`, `palette.*`, `fonts.*`, `signature.*`, etc.).
3. Ne jamais hardcoder une couleur ou un nom dans le JSX livré. Si l'output Claude Design est « pré-cablé » avec des valeurs en dur, les **décâbler** vers `niche.config.ts`.

---

## Étape 6 — ⚠️ GARDE-FOU : cohérence DA sur TOUTES les pages

**Le piège n°1 : une home magnifique, mais le hub blog, les catégories et les articles restent en design par défaut.** Inacceptable. Un design ne livre presque jamais TOUS les écrans — tu dois **étendre** la DA livrée aux pages manquantes en réutilisant ses composants, tokens, traitements (cartes, hero, typo, animations, espacements).

Passer en revue **chaque type de page** et s'assurer qu'il partage la DA :

| Route | Type | À vérifier |
|---|---|---|
| `/` | Home | DA livrée appliquée |
| `/blog` | **Hub** | header, grille d'articles, filtres, footer = même DA |
| `/blog/[categorie]` | **Sous-hub** (catégorie) | en-tête de catégorie, liste, pagination = même DA |
| `/blog/[categorie]/[slug]` | **Article** | typo de corps, titres, cartes MDX, cover/mid, AuthorCard, FAQ = même DA |
| `/comparer` · `/comparer/[produit]` | Comparateur + produit | tableaux, CompareBar, CTA = même DA |
| `/choisir/[produit]` | Guide d'achat | étapes, critères = même DA |
| `/quiz` · `/simulateur` | Outils | formulaires, résultats = même DA |
| `/classement/[cat]` | Classement | liste rankée, verdicts, FAQ = même DA |
| `/auteurs/[slug]` | Auteur | carte, bio = même DA |
| `/mentions-legales` · `/confidentialite` | Légal | au moins typo + header/footer cohérents |

Règle : la DA passe par les **tokens** (`niche.config.ts` + variables CSS) ET par le **traitement des composants partagés** (Nav, Footer, Card, Hero, sections, composants MDX). Si une page utilise des classes/couleurs en dur ou un vieux composant non re-stylé, elle décroche → corriger.

**Vérification obligatoire** (ne pas se fier au code seul) :

```bash
pnpm dev   # puis ouvrir chaque route ci-dessus
```

Rendre chaque type de page et **comparer visuellement** à la home. Idéalement, capturer un screenshot par type. Une page qui ne ressemble pas au reste du site = **bug d'intégration**, on ne livre pas.

---

## Étape 7 — Filtre qualité (hérité de CLAUDE.md)

Avant de marquer l'intégration terminée, vérifier :

- [ ] `tsc --noEmit` passe
- [ ] `npm run lint` passe
- [ ] Aucun `<img>` brut dans `app/` ou `components/` (`grep -r "<img " app/ components/`)
- [ ] Toutes les images ont un `alt` descriptif
- [ ] Aucune couleur hex en dur dans le JSX (`grep -rE "#[0-9a-fA-F]{3,6}" app/ components/` — ne devrait rien retourner sauf cas justifiés)
- [ ] Aucune référence à `fonts.googleapis.com`
- [ ] `'use client'` uniquement sur composants interactifs
- [ ] Liens sortants neutres (aucun tag d'affiliation ni composant `AffiliateLink` — pas d'affiliation sur ces sites)
- [ ] **DA cohérente sur TOUTES les routes** (home, hub /blog, sous-hub catégorie, article, comparateur, produit, quiz, classement) — vérifié page par page (Étape 6). Aucune page en design par défaut.
- [ ] `prefers-reduced-motion` respecté si animations
- [ ] Composants nouveaux < 150 lignes (sinon à splitter)

Si un point n'est pas respecté : corriger avant de proposer le commit.

---

## Étape 8 — Nettoyage et commit

Une fois l'intégration validée :

1. Supprimer le contenu de `design-incoming/` (sauf le `READ-FIRST.md`, qui est la doc du dossier).
2. Mettre à jour `PROGRESS.md` avec ce qui a été intégré.
3. Documenter dans `DECISIONS.md` les choix non triviaux, et **quelles pages ont dû être restylées** au-delà du livrable (par exemple : « Claude Design proposait un Hero avec animation fade-in, on l'a remplacé par un slide horizontal pour respecter `signature.oneRule` »).
4. Proposer un commit avec un message clair en Conventional Commits :
   ```
   feat(home): integrate Claude Design home v2

   - Hero, FeaturedTools, CategorySection redesigned
   - Tokens updated in niche.config.ts (palette + fonts)
   - All <img> converted to next/image
   ```

Si tu fais le commit toi-même (Claude Code en mode tooling) : jamais directement sur main. Créer une branche `feature/integrate-design-[date]` et ouvrir une PR.

---

## Ce qu'il NE faut PAS faire

- **Ne pas styler uniquement la home** en laissant `/blog`, les catégories et les articles en design par défaut. La DA couvre TOUT le site (Étape 6).
- **Ne pas** lancer d'interview d'init ni de questionnaire ici. L'init passe par le skill `nouveau-site` (qui route vers `init-site` ou `configure-from-spec`). Ce skill gère UNIQUEMENT l'intégration de `design-incoming/`.
- **Ne pas** recopier du JSX tel quel sans le passer par le filtre qualité.
- **Ne pas** inventer une couleur, une font, un nom de site ou un slogan si Claude Design ne les a pas fournis. Demander à l'utilisateur ou laisser un `TODO` explicite dans `niche.config.ts`.
- **Ne pas** toucher à `packages/cms/`, `lib/`, `middleware.ts`, ni aux composants génériques (`Hero`, `Nav`, `Footer`, `CategorySection`) sans raison explicite et documentée dans `DECISIONS.md`.
- **Ne pas** dupliquer un composant qui existe déjà sous un autre nom. Enrichir l'existant.
- **Ne pas** committer avec `design-incoming/` non vide — le dossier doit être purgé sauf le `READ-FIRST.md`.
- **Ne pas** introduire d'affiliation (tag, wrapper, disclaimer) — modèle mention uniquement (cf. 3.6).

---

## Si `design-incoming/` est vide ou absent

Ne rien déclencher. Le skill n'a pas de travail à faire. Demander à l'utilisateur ce qu'il veut faire (rédiger un article, configurer le site via `nouveau-site`, fix, etc.). Surtout, **ne pas proposer de générer du design « from scratch »** — ce n'est pas le rôle de Claude Code dans ce workflow. Claude Design est l'amont, Claude Code l'aval. (Pour composer une DA quand il n'y a PAS de livrable Claude Design, c'est `docs/AUTO-DESIGN.md`, déclenché par l'init.)

---

## Format de sortie attendu

Pour chaque intégration, livrer à l'utilisateur :

1. **Récapitulatif des fichiers livrés** (nom + type d'output + destination dans le repo).
2. **Liste des conversions appliquées** (couleurs → vars CSS, `<img>` → `next/image`, etc.).
3. **Pages restylées au-delà du livrable** (hub, sous-hub, article, outils…) pour la cohérence DA.
4. **Décisions non triviales** si l'output Claude Design était ambigu ou en conflit avec l'existant.
5. **Résultat du filtre qualité** (les checks passés, les checks failés — dont la vérif toutes-pages de l'Étape 6).
6. **Proposition de commit** (message + branche).
7. **Nettoyage** (confirmation que `design-incoming/` est vide).
