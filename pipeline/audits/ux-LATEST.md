# Audit QA — DA · UX · IMAGES · RESPONSIVE · A11y

**Date :** 2026-07-19 · **Domaine d'audit :** `ux` · **Mode :** LECTURE SEULE (rendu réel)

## Périmètre

Sites provisionnés ≤ 14 jours (via `pipeline/provisioned-log.csv`) NON encore audités par le domaine `ux` (ledger `pipeline/audits/audited-ux.csv`).

| Domaine | Provisionné | Statut périmètre |
|---|---|---|
| simulateur-assurance-auto.be | 2026-07-10 | Déjà audité (ledger) → **exclu** |
| quel-fournisseur-energie.be | 2026-07-13 | ≤14j, non audité → **AUDITÉ** |
| meilleur-abonnement-5g.be | 2026-07-17 | ≤14j, non audité → **AUDITÉ** |

**2 sites audités.** Aucun re-scan du parc.

---

## Scorecard

| Site | DA / Direction | Logo / Identité | Images | Responsive | A11y |
|---|:--:|:--:|:--:|:--:|:--:|
| quel-fournisseur-energie.be | ✅ | ⚠️ | ❌ | ✅ | ✅ |
| meilleur-abonnement-5g.be | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ |

Légende : ✅ conforme · ⚠️ à corriger (important/mineur) · ❌ bloquant.

---

## Détail par site

### 1. quel-fournisseur-energie.be — Direction DA #2 « Éditorial » (crème), mutée

**DA / Direction ✅**
- Direction assumée et unique : DA-DIRECTIONS #2 « Éditorial » mutée (bordeaux→brique-prune `#8E2F3C`, or→laiton `#8A5A16`), mode **LIGHT fixe** (aucun toggle monté), fonts en variables (`Spectral` display + `Figtree` body via `next/font`). Palette **mutée et propre**, pas un skin brut.
- Source de vérité **correcte** : `niche.config.palette` → propagée dans `app/globals.css` (`:root` + `@theme`). Rien de la palette n'est écrit dans `volteo.css :root`.
- Mineur : le bloc Tailwind `@theme` de `globals.css` déclare `--color-accent-1..4` mais **omet `--color-accent-5`** (`#6B4E71`, catégorie « changer »).

**Logo / Identité ⚠️**
- Logo Nav = **mark SVG inline sur mesure** (anneau de bascule + flamme), tinté `var(--accent-1)`, wordmark en texte CSS. Pas de raster, pas d'« éclair réseau ». ✅
- **Incohérence favicon ↔ logo** : `app/icon.svg` = **monogramme « Q » serif**, DIFFÉRENT du mark anneau+flamme rendu dans `Nav.tsx` (dont le commentaire prétend pourtant « le même mark sert de favicon »). À aligner.
- OG dynamique aux couleurs de la palette. ✅

**Images ❌**
- **Article `fournisseur-energie-verte-belgique.mdx` : `featureImage: ""` (vide)** alors que publié → `CategoryView.Cover` retombe sur placeholder rayé `.ph`.
- **Covers de catégorie non rendues** : `public/images/categories/*.jpeg` existent mais `CategoryView` (hub-hero) ne les référence jamais.
- **Images in-body = covers catégorie recyclées** (`/images/categories/fournisseurs.jpeg`, `/images/blog/category-fournisseurs.jpeg`) — non uniques.
- Positif : `alt` descriptifs + `next/image`.

**Responsive ✅** — `overflow-x:hidden` (body), médias/tables `max-width:100%`, tables markdown dans `.table-scroll-wrap`, menu mobile `@940px`, wordmark tronqué proprement.

**A11y ✅** — `lang="en"` via wrapper `/en` (`display:contents`), skip-link, `:focus-visible`, `prefers-reduced-motion`, ordre des titres cohérent.

---

### 2. meilleur-abonnement-5g.be — Direction DA #4 « Premium sombre », mutée

**DA / Direction ⚠️**
- Direction assumée et unique : DA-DIRECTIONS #4 « Premium sombre » mutée (turquoise `#4FD1C5`, graphite bleuté froid), mode **DARK fixe** (`da-site.css` en dernier, `!important`), fonts `Space Grotesk` + `IBM Plex Sans`. Palette mutée et propre.
- **Risque token important** : `globals.css` garde la palette **TEMPLATE dans `@theme`** (`--color-accent-1: #FF3D57` rouge…). `da-site.css` n'override que `:root` (`--accent-*`), **pas les tokens `@theme`** → les utilitaires Tailwind `*-accent-*` rendraient le **rouge/ambre template, hors-DA**. À synchroniser.
- Blocs `prefers-color-scheme:light` + `data-theme` conservés (neutralisés `!important`) — fonctionne mais fragile.

**Logo / Identité ⚠️**
- Logo Nav = **mark SVG inline** (3 arcs de signal + base) tinté `var(--accent-1)`. Favicon `app/icon.svg` = **même mark** → cohérence favicon↔logo ✅.
- ⚠️ Motif **proche d'un glyphe réseau/wifi générique** — thématiquement juste (5G) mais peu distinctif ; ce n'est pas l'« éclair » partagé.
- OG dynamique, accroche honnête (omet quiz/simulateur/deals désactivés). ✅

**Images ⚠️**
- Featured OK (`a5g-seed-cover.jpeg` + `alt`).
- **Covers de catégorie non rendues** (mêmes limites `CategoryView`).
- Images in-body = covers catégorie/blogcat recyclées.
- Positif : `alt`, table débits wrappée.

**Responsive ✅** — `da-site.css` `html,body{overflow-x:hidden}`, garde-fous globals, menu mobile, table wrappée.

**A11y ✅** — `lang="en"` wrapper, skip-link, `:focus-visible`, `prefers-reduced-motion`.

---

## Section anti-footprint

| Axe | quel-fournisseur-energie.be | meilleur-abonnement-5g.be | Verdict |
|---|---|---|---|
| Direction DA | #2 Éditorial (crème/brique) | #4 Premium sombre (graphite/turquoise) | ✅ distinctes |
| Palette | brique-prune / laiton / crème | turquoise / lime / graphite | ✅ éloignées |
| Variante home | `magazine` | `marche` | ✅ pas de `comparateur` systématique |
| Logo inline | anneau + flamme | arcs de signal + base | ✅ marks distincts, aucun « éclair » partagé |
| Auteur | Camille (énergie) | Bastien (télécom) | ✅ bios uniques, prénom seul |
| Mode | light fixe | dark fixe | ✅ |

**Footprints à corriger (transverses) :**
- ⚠️ `volteo.css` **byte-identique** (`sha 2a4b253`) avec **hex en dur dans `:root`** (`--elec/--gaz/--green/--water/--mobi` + `-soft`). `.news` rend `var(--green)` = **vert `#1AA35F` hors-palette** sur les 2 sites. Bug doctrine.
- ⚠️ **Template OG commun** (barre d'accent, eyebrow `DOMAIN·année`, filigrane `★`) répété sur le réseau.
- ⚠️ **Images in-body recyclées** depuis les covers catégorie sur les 2 sites.

---

## Top 5 des actions prioritaires

1. **[Images — 2 sites] Rendre les covers de catégorie sur la page catégorie** (`CategoryView` hub-hero ne rend aucune image). **PS** : générer une image de couverture liée à la catégorie là où elle manque.
2. **[Images — énergie ❌] `featureImage` unique** pour `fournisseur-energie-verte-belgique.mdx` (vide → placeholder) + stopper le recyclage des covers en images de corps.
3. **[DA — 5G ⚠️] Synchroniser `globals.css @theme`** sur la palette turquoise du site (au lieu du rouge template).
4. **[DA transverse] Purger les hex en dur de `volteo.css :root`** + `.news { background: var(--green) }` → tokens de palette.
5. **[Identité — énergie ⚠️] Aligner le favicon** (`app/icon.svg` « Q ») sur le mark anneau+flamme du Nav.

---

## Résumé exécutif

- **Sites audités (2)** : quel-fournisseur-energie.be, meilleur-abonnement-5g.be.
- **❌** : Images énergie (covers catégorie non rendues + article sans featured image).
- **⚠️** : covers catégorie non rendues (5G), `@theme` non synchronisé (5G), hex en dur `volteo.css :root` (transverse), favicon≠logo (énergie), images in-body recyclées.
- **Scroll horizontal** : aucun (garde-fous + tables wrappées sur les 2 sites).
- **Sites sans direction DA / comparateur systématique** : **aucun** — directions et variantes home distinctes.
- **Paires footprint** : `volteo.css` identique (hex en dur), OG commun, images in-body recyclées. Logos/auteurs/directions/variantes = distincts ✅.
