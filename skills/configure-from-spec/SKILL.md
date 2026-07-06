---
name: configure-from-spec
version: 2.7.2
description: Configure un nouveau site fork-é depuis emd-template À PARTIR D'UN FICHIER SPEC pré-rempli par le wizard nano-mentionbox. Lit `init-spec.md`, analyse les exports Semrush dans `semrush-exports/` pour clusteriser et déterminer l'arborescence (categories), écrit `niche.config.ts` + tous les `content/*` (miroir si N langues), compose une DA UNIQUE via le SYSTÈME DE VARIANTES (suggestVariants/suggestFonts/palette preset seedés sur le domaine — jamais un clone d'un autre site), bâtit l'arborescence + un seed BILINGUE (FR + miroir EN + mapping i18n) + 1 classement seed, commit le site, PUIS génère TOUTES les images À LA FIN une par une (checklist EXHAUSTIVE via lib/image-slots.ts → getAllImageSlots, aucun slot oublié), et crée la scheduled task EN TOUT DERNIER (auto, sans confirmation). À utiliser SEULEMENT quand un init-spec.md fraîchement poussé par le wizard est présent à la racine et que l'utilisateur dit « configure le site depuis init-spec.md », « configure depuis la spec », « init from spec », « lance la configuration », « setup le repo ». Ne JAMAIS utiliser pour un site déjà configuré (niche.config.ts.market défini → init-site pour amender). Ne JAMAIS proposer si init-spec.md n'existe pas — proposer init-site.
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

# configure-from-spec v2.7 — Configurer un site depuis un init-spec.md du wizard

> **v2.7.1 → v2.7.2 (variété des designs — fin du « toujours comparateur »)** :
> La **variante home = `suggestVariants(niche.domain).home` (AUTORITAIRE)**, PAS un choix « thématique ».
> Constat terrain : néobanque ET électricité tous deux en `comparateur` + `hero: split` parce que Claude
> raisonnait « c'est un site de comparaison » — or **TOUS les sites EMD sont des niches comparatives**,
> donc ce n'est PAS un critère : ça produit le même design partout (effet reskin). Désormais : écrire
> EXACTEMENT le tirage seedé + **anti-répétition** vs les 2 derniers sites provisionnés (étape 12.1).
>
> **v2.7.0 → v2.7.1 (excerpt classement)** : un classement a DEUX champs texte distincts —
> **`excerpt`** = résumé **COURT (≤ ~160 caractères)** pour la **carte du hub `/classement`** + la
> **`<meta description>`** ; **`intro`** = paragraphe **LONG answer-first** du corps de page. Écrire LES
> DEUX (sinon le rendu tronque `intro`, mais un excerpt rédigé est meilleur). Évite l'excerpt-pavé.
>
> **v2.6.2 → v2.7.0 (classement seed à l'init)** :
> Le hub `/classement` du template est désormais **rempli dès l'init** (avant : placeholder « Aucun
> classement publié »). On écrit **≥1 classement SEED** = le **head term** du cluster principal
> (« meilleurs SUV », « meilleures néobanques »…), **data-driven (SERP)**, **≥1000 mots** : `excerpt`
> (court) + `intro` (long) + `sections` (H2 **EN QUESTIONS**, answer-first) + `items` notés/100 +
> `criteria` + `methodology` + `sources` + `faq` 6-7 + `genre`, en **FR + miroir EN**, dans
> `content/data/classements.json` (+ `.en.json`). Les autres clusters sont complétés par la boucle
> week-end **`emd-build-pages`**. **NE JAMAIS recréer une archi `/classements` bespoke** (comme certains
> vieux sites) : on REMPLIT le système EXISTANT du template (`/classement` + `/classement/[produit]`,
> `lib/classement.ts`).
>
> **v2.6.1 → v2.6.2 (accord en genre FR)** :
> Renseigner **`niche.config.entityGender`** (`'m'` / `'f'`) selon le genre RÉEL de l'entité
> (« néobanque » → `'f'`, « opérateur » → `'m'`, « assurance » → `'f'`…) — et `dealWordGender`
> si `dealWord` diffère. Pour CHAQUE classement, écrire son **`genre`** dans
> `content/data/classements.json`. Le template accorde alors automatiquement « meilleur·e·s »,
> « Quel/Quelle », « le/la », « tous/toutes », participes (via `lib/utils/grammar.ts`).
> **NE JAMAIS laisser le défaut masculin** si l'entité est féminine (sinon « meilleurs néobanques » = faute).
>
> **v2.6 → v2.6.1 (auteur sans nom de famille)** :
> `niche.config.author.name` = **prénom seul** (« Jean ») **OU prénom + initiale** (« Jean M. »),
> **JAMAIS de nom de famille inventé** ; `slug` = kebab du prénom (`jean` / `jean-m`). Même si le
> Bloc 7 fournit un nom complet, ne garder QUE le prénom (+ initiale). La bio peut détailler l'expertise
> mais ne révèle jamais de nom de famille. S'applique à la byline de TOUT le site.
>
> **v2.5 → v2.6 (images : AUCUN slot oublié)** :
> L'**étape 15** pilote désormais la génération sur **`lib/image-slots.ts` → `getAllImageSlots()`**
> (source UNIQUE et EXHAUSTIVE, dérivée de `niche.config.categories`/`author`) **+** 1 cover par seed.
> Fini le plafond « ≤5 » codé en dur qui faisait sauter des catégories : la worklist se construit
> automatiquement, donc **aucune image (home, par catégorie, auteur, article) ne peut être oubliée**.
> Toujours **une image à la fois, à la toute fin**, avec **vérif finale `github_list_files`** que
> chaque slot visible existe bien dans le repo (sinon retry puis log précis pour rattrapage).
>
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
Agréger/dédoublonner · classer l'intent · clusteriser (5-10) · dériver `niche.config.ts.categories` TOUJOURS depuis les clusters. Par cluster : head term (KD≤50), longue traîne (vol 30-500), quick wins (KD≤30 & vol≥20), à éviter (vol 0 ou KD>70). **Repérer le CLUSTER PRINCIPAL** (volume × intent) → son head term sera le **classement seed** (étape 13bis).

## Étape 4 — Écrire `niche.config.ts`
Mapping spec → config. Dériver entity/entities/heroPrefix/rotatingWords des clusters. TODO seulement si ambigu.
**Genre (`entityGender`)** : déterminer le genre RÉEL de l'entité et l'écrire (`'m'`/`'f'`) — pilote TOUS les accords FR du template (« néobanque » → `'f'`, « assurance » → `'f'`, « opérateur » → `'m'`). Si `dealWord` est d'un autre genre, renseigner `dealWordGender`. **JAMAIS** laisser le défaut masculin pour une entité féminine. Accorder aussi `heroPrefix`/`heroSuffix`/`rotatingWords` au genre (« Choisir votre néobarque » → « Choisir votre néobanque idéale » accordé).
**Auteur (`niche.config.author`)** : `name` = **PRÉNOM SEUL** (« Jean ») **OU prénom + initiale** (« Jean M. ») — **JAMAIS de nom de famille inventé** ; `slug` = kebab du prénom (`jean` / `jean-m`). Même si le Bloc 7 donne un nom complet, ne conserver que le prénom (+ initiale). La `bio` peut détailler l'expertise sans jamais révéler de nom de famille.

## Étape 5 — `content/mots-cles.md`
Positionnement · méthodo · clusters (head/longue traîne/quick wins/à éviter) · « **requêtes à ÉVITER** » = head nu déjà pris par un asset (classement/comparateur/choisir) — cf. `seo-geo-redaction`.

## Étape 6 — `content/calendrier-edito.md` (50 articles)
En tête : règle SERP-first obligatoire. 50 articles classés par priorité (volume × intent / KD). **Modèle MENTION** (cf. `seo-geo-redaction`) : ~⅔ sujets marques/modèles (dont « meilleurs X pour [persona] ») / ⅓ info. **Anti-cannibalisation** : ne pas inscrire au calendrier le **head nu** réservé au classement/comparateur/choisir.

## Étape 7 — `content/ton-of-voice.md` · Étape 7bis — `content/personas.md` (auto-dérivé, 2-4 personas) · Étape 8 — `content/concurrents.md` · Étape 9 — `content/faq-base.md` (PAA auto) · Étape 10 — `content/pages/mentions-legales.yaml` (+ locales) · Étape 11 — `docs/AUTHOR-[slug].md` (si Bloc 7 — **prénom seul / prénom + initiale, jamais de nom de famille**).

---

## Étape 12 — DA via le SYSTÈME DE VARIANTES (full-auto, JAMAIS un clone)

`ls -la design-incoming/` :
- **non vide** → `integrate-claude-design`.
- **vide** → dérouler **`docs/AUTO-DESIGN.md`** du fork (procédure full-auto). Le fork EMBARQUE déjà `lib/variants.ts`, `lib/typography.ts`, `components/layout/PermutationStyle.tsx` :
  1. **Variante home = `suggestVariants(niche.domain).home` — AUTORITAIRE.** Tirage seedé sur le domaine
     (pool `magazine` | `comparateur` | `fil`). **Écris EXACTEMENT ce que renvoie la fonction** dans
     `niche.config.layouts.home`. **INTERDIT de choisir `comparateur` (ou `style.hero: 'split'`) « parce que
     c'est un site de comparaison » : TOUS les sites EMD sont des niches comparatives → ce n'est PAS un
     critère, ça fabrique le même design partout.** **ANTI-RÉPÉTITION** : la variante doit DIFFÉRER de celle
     des **2 derniers sites provisionnés** (`github_read_file` sur leur `niche.config.ts` → `layouts.home`).
     Si `suggestVariants` retombe sur la même, **re-roll** avec un salt : `suggestVariants(niche.domain + '-2')`.
     `marche` uniquement si **≥2 classements** générés. Écris aussi `layouts.category` = `suggestVariants().category`
     et `niche.style.hero` **COHÉRENT avec la variante** (magazine→`centered`, comparateur→`split`, fil→`minimal`) —
     **sans forcer `split` par défaut**. L'archetype `## Design` ne nuance QUE les effets/couleurs, JAMAIS la variante.
  2. **Permutations** : `suggestVariants(niche.domain)` → `niche.config.permutations` (`shape`/`border`/`shadow`).
  3. **Palette** : `## Design` (`brandColor`/`skin`) sinon **preset déterministe** (`lib/da-presets/`, choisi par thématique + **seed domaine**) → écrire `niche.config.palette` PUIS propager dans `app/globals.css :root` (+ `@theme`).
  4. **Typo** : `suggestFonts(niche.domain, home)` (`lib/typography.ts`) → écrire la paire dans `app/layout.tsx` (next/font, imports statiques).
  5. **Dépublier les previews** : supprimer `/home-vN`, `/cat-vN`, `/art-v1` (+ `/en/...`).

> ⚠️ **ANTI-CLONE (règle dure).** La DA se **dérive du DOMAINE** (seed). **INTERDIT** d'ouvrir/copier le code,
> la palette ou les fonts d'un AUTRE site du réseau (`emd-project/*`) — c'est ce qui produisait des clones
> (ex. ressemblance meilleure-voiture). `composePreset` à l'aveugle sans seed = interdit.
> **Check de divergence** : la **variante home**, la **palette (accent-1)** ET la **paire de fonts** doivent
> **différer** d'un site voisin. La **variante home** en particulier ne doit PAS répéter les 2 derniers sites
> (cf. 12.1) — pas de `comparateur` par réflexe. Documenter dans DECISIONS.md la combinaison retenue.
> **PAS d'images ici** (cf. étape 15). **Ne PAS écraser `niche.config.ts.categories`** (clusters Semrush).

---

## Étape 13 — Arborescence + contenu seed (BILINGUE si `locales ≥ 2`)

- Catégories browsables (depuis `niche.config.categories`).
- **1-2 articles seed réels sourcés.** **Si `locales ≥ 2`** : chaque seed est écrit en FR **ET** dans chaque
  autre langue (miroir strict, `content/blog/[locale]/[categorie]/[slug].mdx`) **+ la paire ajoutée à
  `lib/i18n/article-slugs.ts`**. Sinon : `/en` vide + **LangSwitch 404** + hreflang manquant = **échec d'init**.
  Modèle de référence : `content/blog/guides/article-modele.mdx` ↔ `content/blog/en/guides/article-model.mdx`.
  Si `locales = 1` → un seul fichier, pas d'arbre `/en`.
- **Titres FR accordés au genre** (`entityGender`) : « Les **meilleures** néobanques », jamais « meilleurs ».
- **Vérifier** : le sélecteur de langue fonctionne (mapping présent), hreflang réciproque sur le seed.

## Étape 13bis — Classement SEED (asset GEO #1, dans le système EXISTANT du template)

On **remplit** le système de classement déjà présent dans le fork (`/classement` + `/classement/[produit]`,
`lib/classement.ts`, `components/classement/ClassementList`) — **JAMAIS recréer une archi `/classements`
bespoke**. Écrire **1 classement SEED** dans `content/data/classements.json` (+ miroir `classements.en.json`
si `locales ≥ 2`) :

- **slug + label** = le **head term du cluster principal** (étape 3), p. ex. `meilleurs-suv` / « SUV »,
  `meilleures-neobanques` / « Néobanques ». C'est l'asset qui **possède le head nu** (anti-cannibalisation :
  le blog n'écrit pas ce head term, il **maille vers** le classement).
- **`genre`** du label ('m'/'f') pour l'accord du titre.
- **`items`** : Top 5-8 réels, **recherche SERP dédiée** (sources datées, prix marché), chacun avec
  `rank`, `nom`, `score` (noté /100), `badge`/`bestFor`, `verdict`, `pros`/`cons`, `prix`, `url` (lien NEUTRE, jamais affilié).
- **`excerpt`** (résumé COURT ≤ ~160c — pour la **carte du hub** + la **`<meta description>`**) **+ `intro`**
  (paragraphe LONG answer-first, corps de page) — **écrire LES DEUX, ne pas mettre le pavé `intro` en excerpt**.
- **`sections`** : 3-5 blocs d'analyse long-form où **`q` est un H2 FORMULÉ EN QUESTION** (≥70% des H2) et
  `body` la réponse answer-first (1re phrase = réponse). + **`tldr`** (3-5 puces) + **`criteria`** +
  **`methodology`** + **`sources`** + **`faq`** 6-7. **Cible : ≥ 1000 mots** au total.
- **FR + miroir EN strict** (même slug, parité — cf. `tests/i18n-parity.test.ts`).

Le hub `/classement` (+ nav/sitemap) se câble **automatiquement** dès qu'une entrée existe (rien à coder).
Vérifier : `/classement` liste le seed (carte avec excerpt COURT), `/classement/[slug]` rend Top + sections + FAQ + JSON-LD ItemList/FAQPage.
Les **autres clusters** → laissés à la boucle week-end **`emd-build-pages`** (1 classement/cluster, même gabarit).

---

## Étape 14 — Commit atomique du SITE (code + contenu, AVANT les images)

UN commit : `niche.config.ts` + `content/*` (dont `content/data/classements.json` + `.en.json` du seed) + DA (`globals.css`/`layout.tsx`) + seed bilingue + mapping i18n + previews dépubliées. **Le site est déjà déployable** (placeholders d'images temporaires en attendant l'étape 15). Conventional Commits anglais.

---

## Étape 15 — Images À LA FIN, UNE PAR UNE, AUCUN SLOT OUBLIÉ

APRÈS que le site est bâti **et commité** (étape 14). La **checklist d'images = `lib/image-slots.ts` →
`getAllImageSlots()`** : c'est la **source UNIQUE et EXHAUSTIVE** (générée depuis `niche.config.categories`
et `niche.config.author`), donc **aucune catégorie ni aucun slot ne peut être oublié**. **NE JAMAIS** coder
une liste « ≤ N » en dur ni énumérer les images à la main : on **itère sur ce que renvoie le registre**.

**Construire la worklist** = `getAllImageSlots()` (tous les slots structurels) **+** 1 cover par article seed.
Puis générer **STRICTEMENT EN SÉQUENCE** (jamais deux `generate_image` en parallèle). Pour CHAQUE entrée :
`generate_image` (prompt du slot, aligné DA) → `wait_for_image` → compresser WebP → `github_push_images`
au **chemin EXACT du slot** (`slot.path`) → **cocher dans PROGRESS** → courte pause → entrée suivante.

**Couverture attendue (vient du registre — ne rien retirer de la partie visible) :**
1. **Home** : `home-hero-background` **+** `home-hero-visual` — anime l'above-fold.
2. **Catégories — les DEUX slots PAR catégorie** (impératif : pages catégorie + réemploi in-content) :
   `home-category-[slug]` (`/images/categories/[slug].webp`) **ET** `blog-category-background-[slug]`
   (`/images/blog/category-[slug].webp`), **pour CHAQUE** entrée de `niche.categories`.
3. **Auteur** : `author-[slug]` (1:1) si un auteur est défini.
4. **Article(s) seed** : **1 cover GÉNÉRÉ** par seed (`[slug]-cover.webp`, 16:9 → frontmatter `featureImage`
   + `featureImageAlt` fr+locales) **+ exactement 2 `<ArticleImage>` RÉUTILISÉES** (AUCUNE génération :
   elles pointent vers les images catégorie du point 2, à ~1/3 et ~2/3 de l'article).
5. **OG + bandeaux outils** (`og-default`, `comparer/quiz/simulateur/deals-hero`) : générer **si la page
   correspondante existe** (l'OG dynamique `app/opengraph-image.tsx` couvre déjà le partage ; les bandeaux
   outils n'existent qu'une fois la page outil bâtie par la boucle build-pages). Sinon **logguer en TODO**
   pour la boucle week-end — ne pas bloquer.

**Anti-oubli — vérif finale OBLIGATOIRE.** Après la boucle, re-parcourir `getAllImageSlots()` et **vérifier via
`github_list_files`** que CHAQUE fichier de la partie visible (points 1-4) existe bien dans le repo. Tout slot
manquant → **retry une fois (`-v2`)** ; si encore absent → laisser le placeholder + **inscrire le slot précis
dans PROGRESS** (rattrapage par la boucle week-end). Le récap (étape 18) liste « générées / placeholder » **slot
par slot**, jamais un simple total.

- Prompts ≤ ~20 mots alignés DA, finir par « no text, no logos, no watermark », jamais de marque réelle.
- Pousser les images en commits séparés (1 ou quelques slots par commit).

> Pourquoi à la fin + une par une + checklist registre : si le MCP sature ou qu'une génération échoue
> (souvent la nuit, sans humain), **le site est déjà commité et déployé** ; et comme la worklist vient de
> `getAllImageSlots()`, **aucune catégorie/slot ne passe à la trappe** — ce qui manque est tracé précisément
> pour rattrapage.

---

## Étape 16 — PROGRESS.md + DECISIONS.md
Documenter : variante + permutations + palette + typo retenues (et **pourquoi elles divergent** des voisins — dont la **variante home ≠ des 2 derniers sites**), **genre de l'entité (`entityGender`)**, **classement seed (slug + head term)**, seed bilingue, **images générées/placeholder SLOT PAR SLOT** (depuis `getAllImageSlots()`), previews dépubliées.

---

## Étape 17 — Scheduled task de rédaction — EN TOUT DERNIER, AUTO (sans confirmation)

**DERNIÈRE action**, une fois le site complet (code + images). **La spec vaut CONSENTEMENT → créer la tâche
AUTOMATIQUEMENT, SANS demander confirmation** (un run nocturne ne doit JAMAIS bloquer ici).
Gabarit canonique **`docs/SCHEDULED-TASK-REDACTION.md`** : remplacer les `[placeholders]` depuis `niche.config.ts` + la spec (byline = auteur **prénom seul / prénom + initiale**, jamais de nom de famille ni « la rédaction » ; titres **accordés au genre** ; articles **maillent vers le classement** pour le head term).
- TaskId : `[repoName]-article-daily` · Cron : cadence Bloc 3 (`0 8 * * *` défaut).
Si la création de tâche échoue (API indispo) → log « tâche à créer » dans PROGRESS, **ne pas bloquer** : le site est déjà livré.

## Étape 18 — Récap utilisateur
Marché/locales · clusters/categories · **DA : variante home (issue de suggestVariants, ≠ des 2 derniers) + permutations + palette + typo (divergentes)** · **genre entité (`entityGender`)** · **auteur (prénom seul / prénom + initiale, jamais de nom de famille)** · seed bilingue (LangSwitch OK) · **classement seed (head term, excerpt court + ≥1000 mots, FR+EN)** · **images SLOT PAR SLOT (générées / placeholder)** depuis `getAllImageSlots()` + covers seed · scheduled task créée · lien repo.

---

## Règles strictes
- **NE JAMAIS exécuter** sans `init-spec.md` · **NE JAMAIS écraser** un `niche.config.ts` rempli.
- **DA = système de variantes, JAMAIS un clone** : `layouts` + `permutations` + `palette` + typo écrits, dérivés du **seed domaine** ; interdiction de copier un site voisin ; check de divergence.
- **Variante home = `suggestVariants(domaine).home` AUTORITAIRE** — jamais `comparateur`/`split` « par défaut parce que c'est un comparateur » ; **anti-répétition** vs les 2 derniers sites (re-roll avec salt si identique) ; `style.hero` cohérent avec la variante.
- **Genre : `entityGender` renseigné au genre RÉEL** ('m'/'f' ; + `dealWordGender` si besoin ; + `genre` par classement dans `classements.json`) — sinon accords FR faux (« meilleurs néobanques »). Le template accorde via `lib/utils/grammar.ts`.
- **Auteur = PRÉNOM SEUL ou prénom + initiale, JAMAIS de nom de famille inventé** (`name` = prénom [+ initiale], `slug` = kebab du prénom) ; byline de tout le site cohérente.
- **Classement SEED dès l'init** dans le système EXISTANT du template (`content/data/classements.json` + `.en.json`) : head term du cluster principal, **`excerpt` court (≤160c) + `intro` long distincts**, ≥1000 mots (sections H2 questions + items notés + critères + méthodo + sources + FAQ), `genre`, FR+EN. **JAMAIS d'archi `/classements` bespoke.** Reste des clusters → boucle week-end `emd-build-pages`.
- **Seed BILINGUE dès N≥2** : FR + miroir + mapping i18n (LangSwitch/hreflang OK). Sinon échec d'init.
- **Images À LA FIN, une par une** : worklist = `lib/image-slots.ts` (`getAllImageSlots()`) + 1 cover/seed + 2 réemplois in-content ; **aucun slot oublié** (vérif `github_list_files` en fin) ; échec → placeholder + log précis du slot + continuer. **JAMAIS** de liste d'images en dur.
- **Scheduled task EN DERNIER, AUTO sans confirmation** (provisionnement autonome).
- **TOUJOURS** : commit atomique du site avant images · categories depuis Semrush · miroir strict si N≥2 · modèle MENTION (pas d'affiliation) · anti-cannibalisation (head nu réservé aux assets).

## Lien avec les autres skills / docs
`nouveau-site` (routeur) · `init-site` (sans spec — même doctrine) · `integrate-claude-design` (étape 12 cas A) ·
`docs/AUTO-DESIGN.md` + `lib/variants.ts` + `lib/typography.ts` (DA) · `docs/IMAGES-WORKFLOW.md` + `lib/image-slots.ts` (registre images) · `lib/utils/grammar.ts` (accords FR genre/nombre) · `lib/classement.ts` + `components/classement/ClassementList` (classements — système template) ·
`docs/SCHEDULED-TASK-REDACTION.md` · `seo-geo-redaction` + `ton-of-voice` + `humaniser-fr` · boucle `emd-build-pages` (complète les classements).
