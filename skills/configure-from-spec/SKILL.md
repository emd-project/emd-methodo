---
name: configure-from-spec
version: 2.5.0
description: Configure un nouveau site fork-é depuis emd-template À PARTIR D'UN FICHIER SPEC pré-rempli par le wizard nano-mentionbox. Lit `init-spec.md`, analyse les exports Semrush dans `semrush-exports/` pour clusteriser et déterminer l'arborescence (categories), écrit `niche.config.ts` + tous les `content/*` (miroir si N langues), compose une DA UNIQUE via le SYSTÈME DE VARIANTES (suggestVariants/suggestFonts/palette preset seedés sur le domaine — jamais un clone d'un autre site), bâtit l'arborescence + un seed BILINGUE (FR + miroir EN + mapping i18n), commit le site, PUIS génère les images À LA FIN une par une, et crée la scheduled task EN TOUT DERNIER (auto, sans confirmation). À utiliser SEULEMENT quand un init-spec.md fraîchement poussé par le wizard est présent à la racine et que l'utilisateur dit « configure le site depuis init-spec.md », « configure depuis la spec », « init from spec », « lance la configuration », « setup le repo ». Ne JAMAIS utiliser pour un site déjà configuré (niche.config.ts.market défini → init-site pour amender). Ne JAMAIS proposer si init-spec.md n'existe pas — proposer init-site.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - WebSearch
  - mcp__nano-mentionbox__generate_image
  - mcp__nano-mentionbox__wait_for_image
  - mcp__nano-mentionbox__github_push_images
---

# configure-from-spec v2.5 — Configurer un site depuis un init-spec.md du wizard

> **v2.4 → v2.5 (corrige les pannes terrain du provisionnement)** :
> 1. **DA par le SYSTÈME DE VARIANTES** (étape 12) : `suggestVariants`/`suggestFonts` + palette preset
>    **seedés sur le domaine** + **règle anti-clone + check de divergence**. Fini le `composePreset` à
>    l'aveugle qui produisait des **clones** (ex. ressemblance à meilleure-voiture).
> 2. **Seed BILINGUE obligatoire** (étape 13) : article seed FR **+ miroir EN + mapping `article-slugs.ts`**
>    → LangSwitch + hreflang fonctionnent (avant : article placeholder non traduit, pas de sélecteur).
> 3. **Images À LA FIN, UNE PAR UNE** (étape 15) : après le commit du site, génération **séquentielle**
>    (anti-saturation MCP). Le site est déjà prêt même si une image échoue.
> 4. **Scheduled task EN TOUT DERNIER, AUTO sans confirmation** (étape 17) : un run nocturne ne bloque plus.

## Pré-requis vérifiés au démarrage
1. **`init-spec.md` existe** à la racine. Sinon → proposer `init-site`.
2. **`niche.config.ts.market` vide/placeholder**. Si déjà rempli → STOP (site déjà configuré).
3. **MCP nano-mentionbox disponible** (`mcp__nano-mentionbox__generate_image`). Sinon → prévenir : les images de l'étape 15 ne tourneront pas (le BUILD du site, lui, n'en dépend pas).
4. **Git status clean** ou changements non liés.

En dehors de ces points, ne pas s'interrompre : la spec fait foi. **Aucune confirmation demandée** (provisionnement autonome).

---

## Étape 1 — Parser le init-spec.md
Sections Markdown + YAML : `## Identité`, `## Bloc 0` (marché+langues), `## Bloc 1` (voix), `## Bloc 2` (mots-clés + `semrush-exports/*.csv`), `## Bloc 3` (calendrier), `## Bloc 4` (concurrents), `## Bloc 5` (FAQ — auto), `## Bloc 6` (mentions), `## Bloc 7` (auteur, opt), `## Design` (archetype/skin/vertical/brandColor/mode). Détecter les « 🤖 Mode AUTO ». Si Bloc 0/1/6 manque → STOP.

## Étape 2 — Validation sémantique
`market` valide · `locales[0]===defaultLocale` · `localePrefix as-needed` ⇒ N≥2 · email contact (STOP si absent) · slug auteur kebab-case. Regrouper les warnings.

## Étape 3 — Analyser Semrush (`semrush-exports/*.csv`)
Agréger/dédoublonner · classer l'intent · clusteriser (5-10) · dériver `niche.config.ts.categories` TOUJOURS depuis les clusters. Par cluster : head term (KD≤50), longue traîne (vol 30-500), quick wins (KD≤30 & vol≥20), à éviter (vol 0 ou KD>70).

## Étape 4 — Écrire `niche.config.ts`
Mapping spec → config. Dériver entity/entities/heroPrefix/rotatingWords des clusters. TODO seulement si ambigu.

## Étape 5 — `content/mots-cles.md`
Positionnement · méthodo · clusters (head/longue traîne/quick wins/à éviter) · « **requêtes à ÉVITER** » = head nu déjà pris par un asset (classement/comparateur/choisir) — cf. `seo-geo-redaction`.

## Étape 6 — `content/calendrier-edito.md` (50 articles)
En tête : règle SERP-first obligatoire. 50 articles classés par priorité (volume × intent / KD). **Modèle MENTION** (cf. `seo-geo-redaction`) : ~⅔ sujets marques/modèles (dont « meilleurs X pour [persona] ») / ⅓ info. **Anti-cannibalisation** : ne pas inscrire au calendrier le **head nu** réservé au classement/comparateur/choisir.

## Étape 7 — `content/ton-of-voice.md` · Étape 7bis — `content/personas.md` (auto-dérivé, 2-4 personas) · Étape 8 — `content/concurrents.md` · Étape 9 — `content/faq-base.md` (PAA auto) · Étape 10 — `content/pages/mentions-legales.yaml` (+ locales) · Étape 11 — `docs/AUTHOR-[slug].md` (si Bloc 7).

---

## Étape 12 — DA via le SYSTÈME DE VARIANTES (full-auto, JAMAIS un clone)

`ls -la design-incoming/` :
- **non vide** → `integrate-claude-design`.
- **vide** → dérouler **`docs/AUTO-DESIGN.md`** du fork (procédure full-auto). Le fork EMBARQUE déjà `lib/variants.ts`, `lib/typography.ts`, `components/layout/PermutationStyle.tsx` :
  1. **Variante** : `suggestVariants(niche.domain)` + override thématique (depuis `## Design` archetype) → écrire `niche.config.layouts.home` (magazine/comparateur/marche/fil) + `layouts.category` (classic/editorial) + `niche.style.hero` cohérent. (`marche` seulement si classements générés.)
  2. **Permutations** : `suggestVariants(niche.domain)` → `niche.config.permutations` (`shape`/`border`/`shadow`).
  3. **Palette** : `## Design` (`brandColor`/`skin`) sinon **preset déterministe** (`lib/da-presets/`, choisi par thématique + **seed domaine**) → écrire `niche.config.palette` PUIS propager dans `app/globals.css :root` (+ `@theme`).
  4. **Typo** : `suggestFonts(niche.domain, home)` (`lib/typography.ts`) → écrire la paire dans `app/layout.tsx` (next/font, imports statiques).
  5. **Dépublier les previews** : supprimer `/home-vN`, `/cat-vN`, `/art-v1` (+ `/en/...`).

> ⚠️ **ANTI-CLONE (règle dure).** La DA se **dérive du DOMAINE** (seed). **INTERDIT** d'ouvrir/copier le code,
> la palette ou les fonts d'un AUTRE site du réseau (`emd-project/*`) — c'est ce qui produisait des clones
> (ex. ressemblance meilleure-voiture). `composePreset` à l'aveugle sans seed = interdit.
> **Check de divergence** : la **variante home**, la **palette (accent-1)** ET la **paire de fonts** doivent
> **différer** d'un site voisin. Si par mégarde tu as regardé un voisin, ta sortie doit s'en écarter
> (re-roll avec un autre salt sur le seed). Documenter dans DECISIONS.md la combinaison retenue.
> **PAS d'images ici** (cf. étape 15). **Ne PAS écraser `niche.config.ts.categories`** (clusters Semrush).

---

## Étape 13 — Arborescence + contenu seed (BILINGUE si `locales ≥ 2`)

- Catégories browsables (depuis `niche.config.categories`).
- **1-2 articles seed réels sourcés.** **Si `locales ≥ 2`** : chaque seed est écrit en FR **ET** dans chaque
  autre langue (miroir strict, `content/blog/[locale]/[categorie]/[slug].mdx`) **+ la paire ajoutée à
  `lib/i18n/article-slugs.ts`**. Sinon : `/en` vide + **LangSwitch 404** + hreflang manquant = **échec d'init**.
  Modèle de référence : `content/blog/guides/article-modele.mdx` ↔ `content/blog/en/guides/article-model.mdx`.
  Si `locales = 1` → un seul fichier, pas d'arbre `/en`.
- **Vérifier** : le sélecteur de langue fonctionne (mapping présent), hreflang réciproque sur le seed.

---

## Étape 14 — Commit atomique du SITE (code + contenu, AVANT les images)

UN commit : `niche.config.ts` + `content/*` + DA (`globals.css`/`layout.tsx`) + seed bilingue + mapping i18n + previews dépubliées. **Le site est déjà déployable** (placeholders d'images temporaires en attendant l'étape 15). Conventional Commits anglais.

---

## Étape 15 — Images À LA FIN, UNE PAR UNE (anti-saturation MCP)

APRÈS que le site est bâti **et commité**. Génération **STRICTEMENT SÉQUENTIELLE** (jamais deux `generate_image` en parallèle) :
pour chaque slot → `generate_image` → `wait_for_image` → compresser WebP → `github_push_images` → **PUIS la suivante**. Petite pause entre deux pour ménager le MCP.

- **Plafond ≤ ~5 structurelles** : hero home + couverture hub `/blog` + **illustration/fond par catégorie**
  (ces images de catégorie servent aussi de **réemploi in-content** des articles).
- **Par article seed : 1 cover GÉNÉRÉ** (`featureImage`, `[slug]-cover.webp`, 16:9) **+ 1 image EXISTANTE
  réutilisée in-content** (`<ArticleImage>` vers une image de catégorie déjà générée) pour le rythme. Aucune autre génération.
- Prompts ≤ ~20 mots alignés DA, finir par « no text, no logos, no watermark », jamais de marque réelle.
- **Échec d'une image → retry une fois (`-v2`)**, sinon **laisser le placeholder + log dans PROGRESS, CONTINUER** (ne bloque jamais : le site est déjà commité à l'étape 14).
- Pousser les images en commits séparés.

> Pourquoi à la fin + une par une : si le MCP sature ou si une génération échoue (souvent la nuit, sans humain), **le site est déjà prêt et déployé** — seules les images manquent, rattrapables.

---

## Étape 16 — PROGRESS.md + DECISIONS.md
Documenter : variante + permutations + palette + typo retenues (et **pourquoi elles divergent** des voisins), seed bilingue, images générées/échouées, previews dépubliées.

---

## Étape 17 — Scheduled task de rédaction — EN TOUT DERNIER, AUTO (sans confirmation)

**DERNIÈRE action**, une fois le site complet (code + images). **La spec vaut CONSENTEMENT → créer la tâche
AUTOMATIQUEMENT, SANS demander confirmation** (un run nocturne ne doit JAMAIS bloquer ici).
Gabarit canonique **`docs/SCHEDULED-TASK-REDACTION.md`** : remplacer les `[placeholders]` depuis `niche.config.ts` + la spec.
- TaskId : `[repoName]-article-daily` · Cron : cadence Bloc 3 (`0 8 * * *` défaut).
Si la création de tâche échoue (API indispo) → log « tâche à créer » dans PROGRESS, **ne pas bloquer** : le site est déjà livré.

## Étape 18 — Récap utilisateur
Marché/locales · clusters/categories · **DA : variante + permutations + palette + typo (divergentes)** · seed bilingue (LangSwitch OK) · images ≤5 + covers seed · scheduled task créée · lien repo.

---

## Règles strictes
- **NE JAMAIS exécuter** sans `init-spec.md` · **NE JAMAIS écraser** un `niche.config.ts` rempli.
- **DA = système de variantes, JAMAIS un clone** : `layouts` + `permutations` + `palette` + typo écrits, dérivés du **seed domaine** ; interdiction de copier un site voisin ; check de divergence.
- **Seed BILINGUE dès N≥2** : FR + miroir + mapping i18n (LangSwitch/hreflang OK). Sinon échec d'init.
- **Images À LA FIN, une par une**, ≤5 structurelles + 1 cover/seed + 1 réemploi in-content ; échec → placeholder + continuer.
- **Scheduled task EN DERNIER, AUTO sans confirmation** (provisionnement autonome).
- **TOUJOURS** : commit atomique du site avant images · categories depuis Semrush · miroir strict si N≥2 · modèle MENTION (pas d'affiliation) · anti-cannibalisation (head nu réservé aux assets).

## Lien avec les autres skills / docs
`nouveau-site` (routeur) · `init-site` (sans spec — même doctrine) · `integrate-claude-design` (étape 12 cas A) ·
`docs/AUTO-DESIGN.md` + `lib/variants.ts` + `lib/typography.ts` (DA) · `docs/IMAGES-WORKFLOW.md` ·
`docs/SCHEDULED-TASK-REDACTION.md` · `seo-geo-redaction` + `ton-of-voice` + `humaniser-fr`.
