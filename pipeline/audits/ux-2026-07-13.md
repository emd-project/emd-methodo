# Audit UX / DA / Images / Responsive / A11y — 2026-07-13

**Domaine d'audit** : `ux` · **Mode** : lecture seule
**Périmètre** (doctrine emd-audit v1.6 — sites ≤14j non encore audités par `ux`) :

| Site | Provisionné | Déjà audité `ux` | Dans le périmètre |
|---|---|---|---|
| simulateur-assurance-auto.be | 2026-07-10 (J-3) | non (ledger inexistant) | ✅ |

**1 site audité.** Aucun autre site ≤14j dans `pipeline/provisioned-log.csv` → pas de re-scan du parc.

---

## Scorecard

| Site | DA / Direction | Logo & identité | Tokens (zéro hex) | Variante home | Images | Cover catégorie | Responsive | A11y | Anti-footprint |
|---|---|---|---|---|---|---|---|---|---|
| simulateur-assurance-auto.be | ✅ | ✅ | ❌ | ✅ `fil` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ (n/a) |

Légende : ✅ conforme · ⚠️ important · ❌ bloquant

---

## Détail — simulateur-assurance-auto.be

### ❌ Bloquants

**1. Covers de catégorie présentes mais JAMAIS rendues**
10 fichiers existent — `public/images/categories/{simulateur,comparatifs,garanties,prix,profils}.webp` **et** un doublon `public/images/blog/category-*.webp` — mais **aucun composant ne les consomme** :
- `components/category/CategoryView.tsx` → le `hub-hero` de la page catégorie ne rend que du texte (crumb + tag + `<h1>` + compte d'articles). Aucun `<Image>` de cover.
- `components/home/CategorySection.tsx` → aucune image non plus.

→ Les 5 pages `/blog/[categorie]` (et `/en/blog/...`) sont **sans visuel de couverture**, desktop et mobile. Faux positif classique évité : le fichier existe, le rendu non.
**Fix attendu** : câbler la cover dans le `hub-hero` de `CategoryView` (next/image, `priority`, alt descriptif issu de `niche.categories[].description`) **et générer une image de couverture réellement liée à chaque catégorie** (simulation de prime / comparatif assureurs / garanties & formules / prix & bonus-malus / profils conducteurs) dans la DA Net-Suisse mutée (cardinal `#B01E33` + navy `#1F3A5F`, sobre, pas de voiture accidentée — cf. `signature.forbidden`). Dédupliquer ensuite les deux jeux d'assets.

**2. Zéro image dans le corps des articles**
Les 2 articles publiés (`content/blog/comparatifs/simulateur-assurance-auto-belgique.mdx` + sa traduction EN) ont une **featured image unique** ✅ (`/images/covers/simulateur-assurance-auto-belgique.webp`, présente) mais **0 image in-body** — la doctrine en attend ~2 (schéma/tableau illustré/photo) avec `alt` descriptif via `next/image`.

**3. Couleurs en dur dans `app/styles/volteo.css :root`** (violation explicite de la doctrine « la DA passe par `niche.config.palette`, JAMAIS par des valeurs dans `volteo.css :root` »)
```
--elec: #FFB400  --gaz: #FF6B35  --green: #1AA35F  --water: #2D8FE0  --mobi: #7C5CFF (+ variantes -soft)
.tag.elec { color:#966400 } .tag.green { color:#0c6e3f } .tag.water { color:#1a6bb0 } .tag.mobi { color:#5a3ed6 }
```
Ce ne sont pas des tokens morts — ils **rendent** :
- `.news` (bloc newsletter) : `background: var(--green)` → **bandeau VERT #1AA35F**, totalement hors palette cardinal/navy.
- `.fil-live-head .fil-pdot` (home variante `fil`, en production) : point « live » **vert #1AA35F**.
- `volteo-fil.css` : `.fil-pdot { background: #E0524D }` → rouge-orangé en dur, ≠ accent cardinal `#B01E33`.
**Fix** : aliaser `--elec/--gaz/--green/--water/--mobi` sur `--accent-1..5` (comme `--cat-1..5` le font déjà) et remplacer `#E0524D` par `var(--accent-1)`.

### ⚠️ Importants

**4. `alt` non descriptifs alors que le frontmatter en fournit un**
`CategoryView.Cover` fait `alt={a.title}`, alors que les MDX exposent un `featureImageAlt` déjà rédigé (« Conducteur comparant des devis d'assurance auto sur un ordinateur portable »). Le champ existe mais n'est pas lu → alt = titre d'article. Corriger dans `Cover` (et vérifier `ArticleCarousel` / `FilHome`).

**5. `body { overflow-x: hidden }` dans `globals.css`**
Masque tout scroll horizontal au lieu de le corriger — et **neutralise la détection** (un test 320px passera toujours). L'analyse statique n'a trouvé aucun débordement franc : tableaux wrappés (`.table-scroll-wrap`), `.fil-bk-track` sous mask, `.fil-news-form input { max-width: 60vw }`, breakpoints présents à 920/760/560/520px. Risque réel **faible**, mais la garantie « zéro scroll horizontal » n'est pas vérifiable tant que la règle est là. Recommandation : retirer `overflow-x: hidden`, re-tester 320/375/768/1024/1440.

**6. `lang` non piloté par la locale**
`app/layout.tsx` pose `<html lang="fr">` **en dur**. `app/en/layout.tsx` rattrape via `<div lang="en" style={{display:'contents'}}>` — les lecteurs d'écran héritent bien du `lang` le plus proche pour le contenu, mais le **document** `/en/*` reste déclaré `fr`. À corriger (locale déduite du segment, ou root layout par locale).

**7. Cible tactile du burger limite**
`.nav-burger { padding: 8px }` + `svg 26px` ≈ **42px** de zone tactile, sous les ~44px recommandés. Passer à `padding: 10px`.

**8. Assets orphelins / footprint d'assets**
- Double jeu de covers catégorie (`images/categories/*` + `images/blog/category-*`) — un seul sera câblé, purger l'autre.
- `public/images/blog-image-1_d7c73ced-0a9f-47fa-80ea-95d09ca018a0_2000x.webp` : nom de fichier typé export Shopify, orphelin → **empreinte** à supprimer.
- `components/layout/ThemeToggle.tsx` : présent mais **non monté** (Nav ne l'importe pas) → mode light fixe respecté ✅, mais code mort à retirer.

### ✅ Conformes (rendu réel vérifié)

- **Direction de design assumée** : DA-DIRECTIONS **#3 « Net / Suisse »**, **mutée** — accent cardinal `#B01E33` + navy/vert/bronze/slate, radius sobres (3/6/10/16), `cards: bordered`, `effects: subtle`. Pas de skin brut, pas de look comparateur indifférencié.
- **Mode light fixe** : `data-theme="light"` en dur au layout, `html[data-theme="dark"]` neutralisé, aucun toggle monté.
- **Palette pilotée par `niche.config.palette`** et propagée dans `app/globals.css` (`@theme` + `:root`) — c'est bien le bon canal (le problème est cantonné aux legacy de `volteo.css`, cf. ❌3).
- **Fonts en variables** : Archivo (display) + Manrope (body) via `next/font`, exposées en `--next-font-*`.
- **Logo = vrai mark SVG sur mesure, inline dans `Nav.tsx`** : bouclier + check (« protection assurée »), `fill: currentColor` teinté `var(--accent-1)`. **Aucun éclair réseau générique.** `app/icon.svg` reprend le même mark ✅ ; `app/opengraph-image.tsx` présent ✅.
- **Variante home = `fil`** (≠ `comparateur`), catégorie = `editorial` — divergence anti-empreinte respectée.
- **Contraste AA** : `#B01E33` sur blanc ≈ 6.8:1 ; `--text-muted #5E6771` sur `#FBFBFD` ≈ 5.2:1 ; badges `.tag.c1..c5` dérivés en `color-mix` 72%/noir.
- **`prefers-reduced-motion`** couvert dans `globals.css`, `volteo.css` **et** `volteo-fil.css` (marquees, ping, feed, aurora).
- **Menu mobile** fonctionnel : burger `aria-expanded`, `role="dialog"`, verrou de scroll, fermeture au changement de route.
- **A11y divers** : skip-link, `:focus-visible` jamais supprimé, doublons du fil « live » en `aria-hidden` + `tabIndex={-1}`.
- `next/image` utilisé (pas de `<img>` brut) ; viewport meta = défaut Next App Router.

---

## Anti-footprint

**Aucune paire évaluable ce cycle** : `simulateur-assurance-auto.be` est le seul site du log de provisioning (≤14j). Comparaison impossible sans re-scan du parc (interdit par la doctrine v1.6).

Signaux déclarés et vérifiés dans le code, favorables :

| Axe | Valeur | Verdict |
|---|---|---|
| Direction DA | #3 Net/Suisse **mutée** (cardinal/navy) | distinctive |
| Variante home | `fil` (les 2 sites précédents seraient en `comparateur`) | divergente ✅ |
| Logo inline | bouclier + check sur mesure | pas d'éclair partagé ✅ |
| OG | `app/opengraph-image.tsx` (dynamique) | à recouper au prochain cycle |
| Auteur | Damien (prénom seul), bio spécifique assurance BE | unique en l'état |

⚠️ Un seul vecteur d'empreinte détecté : les **legacy tokens `volteo.css`** (`--elec/--gaz/--green`…) sont, par construction, **identiques sur tous les sites du template** et rendent visiblement (newsletter verte, point live vert). Deux sites voisins auront donc le même bandeau vert hors-palette → **footprint transverse à corriger sur le template**, pas seulement ici.

---

## Top 5 des actions prioritaires

1. **❌ Générer + câbler les covers de catégorie** (5 images thématiques dans la DA cardinal/navy) et les rendre dans le `hub-hero` de `CategoryView` — les pages catégorie sont actuellement sans visuel.
2. **❌ Ajouter ~2 images in-body** par article (FR + EN) avec `alt` descriptifs et `next/image`.
3. **❌ Purger les hex en dur de `volteo.css :root`** (+ `#E0524D` dans `volteo-fil.css`) → aliaser sur `--accent-1..5`. Corrige la newsletter verte et le point « live » hors palette. **À remonter au template** (footprint réseau).
4. **⚠️ Lire `featureImageAlt`** dans `Cover` au lieu de `alt={a.title}`.
5. **⚠️ Retirer `body { overflow-x: hidden }`**, re-tester 320→1440, et poser `lang` par locale (`/en` déclaré `fr` au niveau document) ; burger à ≥44px.
