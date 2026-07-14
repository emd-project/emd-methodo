---
name: configure-from-spec
version: 2.8.0
description: Configure un nouveau site fork-é depuis emd-template À PARTIR D'UN FICHIER SPEC pré-rempli par le wizard nano-mentionbox. Lit `init-spec.md`, analyse les exports Semrush dans `semrush-exports/` pour clusteriser et déterminer l'arborescence (categories), écrit `niche.config.ts` + tous les `content/*` (miroir si N langues), compose une DA UNIQUE via le SYSTÈME DE VARIANTES (famille de home déduite du SECTEUR — `beaute` / `comparateur` / `editorial` — + suggestVariants/suggestFonts/palette seedés sur le domaine — jamais un clone d'un autre site), bâtit l'arborescence + un seed BILINGUE (FR + miroir EN + mapping i18n) + 1 classement seed, **dérive les pages clés du classement seed (comparateur, /choisir, quiz) → ZÉRO PLACEHOLDER à la livraison**, commit le site, PUIS génère TOUTES les images À LA FIN une par une (checklist EXHAUSTIVE via lib/image-slots.ts → getAllImageSlots, aucun slot oublié), et crée la scheduled task EN TOUT DERNIER (auto, sans confirmation). À utiliser SEULEMENT quand un init-spec.md fraîchement poussé par le wizard est présent à la racine et que l'utilisateur dit « configure le site depuis init-spec.md », « configure depuis la spec », « init from spec », « lance la configuration », « setup le repo ». Ne JAMAIS utiliser pour un site déjà configuré (niche.config.ts.market défini → init-site pour amender). Ne JAMAIS proposer si init-spec.md n'existe pas — proposer init-site.
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

# configure-from-spec v2.8 — Configurer un site depuis un init-spec.md du wizard

> **v2.7.3 → v2.8.0 (TROIS familles de home + ZÉRO PLACEHOLDER)** :
> · **Nouvelle famille `beaute` (variante `presse`)** — Beauty · Mode quitte la famille `editorial` pour sa
>   propre famille. `presse` n'est pas une home de plus : c'est une **identité éditoriale COMPLÈTE**
>   (masthead sérif centré, nav catégories sticky, une + sections par catégorie, colonne « à ne pas
>   manquer », **vues blog / catégorie / article dédiées**). Dès que `layouts.home = 'presse'`, écrire AUSSI
>   `layouts.category = 'presse'` et `layouts.article = 'presse'`. C'est la **SEULE** variante de la famille :
>   **la variété inter-sites vient de la PALETTE + de la TYPO (seedées sur le domaine), PAS du layout.**
>   `homeFamily(secteur)` renvoie désormais `'beaute' | 'comparateur' | 'editorial'`.
> · **Nouvelle étape 13ter — ZÉRO PLACEHOLDER** : le classement seed (13bis) a déjà fait la recherche SERP,
>   donc **comparateur + `/choisir` + quiz s'en DÉRIVENT** (remploi, pas travail neuf), les gabarits sont
>   supprimés, **`deals` est désactivé** (le composant est structurellement affilié → jamais de fausse promo),
>   et **`npm run check:placeholders` doit passer**. Un site ne sort JAMAIS de l'init avec une coquille vide.
>
> **v2.7.2 → v2.7.3 (le SECTEUR décide de la famille, le seed tranche DANS la famille)** :
> Correction du raisonnement de la v2.7.2. Le design n'est ni un choix « thématique » libre (qui faisait
> retomber sur `comparateur` partout), ni un tirage totalement aveugle (qui collait un comparateur sur un
> site *voiture*). Le bon critère est **l'INTENTION de l'internaute dans le secteur** :
> · **Assurance · Banque · Énergie · Télécom · Crédit · Casino & Paris** → on vient **comparer une offre à
>   souscrire** (prix, conditions) → famille **`comparateur`** : pool **⅔ `marche` / ⅓ `comparateur`**.
> · **Voiture · Beauty · Retailer & Tech · Hospitality · Agence · autres** → thématique **éditoriale**, on
>   vient **lire / se documenter** → famille **`editorial`** : pool **⅔ `magazine` / ⅓ `fil`**.
>   *(Beauty · Mode en est sortie en v2.8.0 → famille `beaute`.)*
> Appeler **`suggestVariants(niche.domain, homeFamily(secteur))`** (`lib/variants.ts`). Le **seed (domaine)
> tranche DANS la famille** → deux sites du même secteur ne tombent pas forcément sur le même design.
> `marche` est **éligible d'office** (le classement seed lui fournit ses données).
> **INTERDIT** : un `comparateur`/`marche` plaqué sur une thématique éditoriale (voiture, beauté…), ou un
> `magazine` plaqué sur une offre à souscrire (assurance, banque, énergie).
>
> **v2.7.1 → v2.7.2 (variété des designs)** : la variante home est **écrite depuis `suggestVariants`**,
> jamais « choisie » librement — sinon tous les sites finissent en `comparateur`. (Raffiné par la v2.7.3.)
>
> **v2.7.0 → v2.7.1 (excerpt classement)** : un classement a DEUX champs texte distincts —
> **`excerpt`** = résumé **COURT (≤ ~160 caractères)** pour la **carte du hub `/classement`** + la
> **`<meta description>`** ; **`intro`** = paragraphe **LONG answer-first** du corps de page. Écrire LES
> DEUX (sinon le rendu tronque `intro`, mais un excerpt rédigé est meilleur). Évite l'excerpt-pavé.
>
> **v2.6.2 → v2.7.0 (classement seed à l'init)** :
> Le hub `/classement` du template est désormais **rempli dès l'init** (avant : placeholder « Aucun
> classement publié »). On écrit **≥1 classement SEED** = le **head term** du cluster principal,
> **data-driven (SERP)**, **≥1000 mots** : `excerpt` + `intro` + `sections` (H2 **EN QUESTIONS**,
> answer-first) + `items` notés/100 + `criteria` + `methodology` + `sources` + `faq` 6-7 + `genre`, en
> **FR + miroir EN**, dans `content/data/classements.json` (+ `.en.json`). Les autres clusters sont
> complétés par la boucle week-end **`emd-build-pages`**. **NE JAMAIS recréer une archi `/classements`
> bespoke** : on REMPLIT le système EXISTANT du template (`lib/classement.ts`).
>
> **v2.6.1 → v2.6.2 (accord en genre FR)** :
> Renseigner **`niche.config.entityGender`** (`'m'` / `'f'`) selon le genre RÉEL de l'entité
> (« néobanque » → `'f'`, « opérateur » → `'m'`…) — et `dealWordGender` si `dealWord` diffère. Pour CHAQUE
> classement, écrire son **`genre`**. Le template accorde alors « meilleur·e·s », « Quel/Quelle », « le/la »,
> « tous/toutes », participes (via `lib/utils/grammar.ts`). **NE JAMAIS laisser le défaut masculin** si
> l'entité est féminine (sinon « meilleurs néobanques » = faute).
>
> **v2.6 → v2.6.1 (auteur sans nom de famille)** :
> `niche.config.author.name` = **prénom seul** (« Jean ») **OU prénom + initiale** (« Jean M. »),
> **JAMAIS de nom de famille inventé** ; `slug` = kebab du prénom. Même si le Bloc 7 fournit un nom complet,
> ne garder QUE le prénom (+ initiale). S'applique à la byline de TOUT le site.
>
> **v2.5 → v2.6 (images : AUCUN slot oublié)** :
> L'**étape 15** pilote la génération sur **`lib/image-slots.ts` → `getAllImageSlots()`** (source UNIQUE et
> EXHAUSTIVE) **+** 1 cover par seed. Fini le plafond « ≤5 » en dur qui faisait sauter des catégories.
> Toujours **une image à la fois, à la toute fin**, avec **vérif finale `github_list_files`**.
>
> **v2.4 → v2.5 (pannes terrain du provisionnement)** : DA par le système de variantes (anti-clone) ·
> seed BILINGUE obligatoire · images à la fin une par une · scheduled task en tout dernier (auto).

## Pré-requis vérifiés au démarrage
1. **`init-spec.md` existe** à la racine. Sinon → proposer `init-site`.
2. **`niche.config.ts.market` vide/placeholder**. Si déjà rempli → STOP (site déjà configuré).
3. **MCP nano-mentionbox disponible** (`mcp__nano-mentionbox__generate_image`). Sinon → prévenir : les images de l'étape 15 ne tourneront pas (le BUILD du site, lui, n'en dépend pas).
4. **Git status clean** ou changements non liés.

En dehors de ces points, ne pas s'interrompre : la spec fait foi. **Aucune confirmation demandée** (provisionnement autonome).

---

## Étape 1 — Parser le init-spec.md
Sections Markdown + YAML : `## Identité`, `## Bloc 0` (marché+langues), `## Bloc 1` (voix), `## Bloc 2` (mots-clés + `semrush-exports/*.csv`), `## Bloc 3` (calendrier), `## Bloc 4` (concurrents), `## Bloc 5` (FAQ — auto), `## Bloc 6` (mentions), `## Bloc 7` (auteur, opt), `## Design` (archetype/skin/vertical/brandColor/mode). Détecter les « 🤖 Mode AUTO ». Si Bloc 0/1/6 manque → STOP.
**Retenir le SECTEUR** (catégorie de la niche : Assurance, Banque, Énergie, Télécom, Voiture, Beauty…) — il pilote la **famille de home** (étape 12.1).

## Étape 2 — Validation sémantique
`market` valide · `locales[0]===defaultLocale` · `localePrefix as-needed` ⇒ N≥2 · email contact (STOP si absent) · slug auteur kebab-case. Regrouper les warnings.

## Étape 3 — Analyser Semrush (`semrush-exports/*.csv`)
Agréger/dédoublonner · classer l'intent · clusteriser (5-10) · dériver `niche.config.ts.categories` TOUJOURS depuis les clusters. Par cluster : head term (KD≤50), longue traîne (vol 30-500), quick wins (KD≤30 & vol≥20), à éviter (vol 0 ou KD>70). **Repérer le CLUSTER PRINCIPAL** (volume × intent) → son head term sera le **classement seed** (étape 13bis).

## Étape 4 — Écrire `niche.config.ts`
Mapping spec → config. Dériver entity/entities/heroPrefix/rotatingWords des clusters. TODO seulement si ambigu.
**Genre (`entityGender`)** : déterminer le genre RÉEL de l'entité et l'écrire (`'m'`/`'f'`) — pilote TOUS les accords FR du template (« néobanque » → `'f'`, « assurance » → `'f'`, « opérateur » → `'m'`). Si `dealWord` est d'un autre genre, renseigner `dealWordGender`. **JAMAIS** laisser le défaut masculin pour une entité féminine. Accorder aussi `heroPrefix`/`heroSuffix`/`rotatingWords` au genre.
**Auteur (`niche.config.author`)** : `name` = **PRÉNOM SEUL** (« Jean ») **OU prénom + initiale** (« Jean M. ») — **JAMAIS de nom de famille inventé** ; `slug` = kebab du prénom. Même si le Bloc 7 donne un nom complet, ne conserver que le prénom (+ initiale). La `bio` peut détailler l'expertise sans jamais révéler de nom de famille.

## Étape 5 — `content/mots-cles.md`
Positionnement · méthodo · clusters (head/longue traîne/quick wins/à éviter) · « **requêtes à ÉVITER** » = head nu déjà pris par un asset (classement/comparateur/choisir) — cf. `seo-geo-redaction`.

## Étape 6 — `content/calendrier-edito.md` (50 articles)
En tête : règle SERP-first obligatoire. 50 articles classés par priorité (volume × intent / KD). **Modèle MENTION** : ~⅔ sujets marques/modèles / ⅓ info. **Anti-cannibalisation** : ne pas inscrire le **head nu** réservé au classement/comparateur/choisir.

## Étape 7 — `content/ton-of-voice.md` · Étape 7bis — `content/personas.md` (2-4 personas) · Étape 8 — `content/concurrents.md` · Étape 9 — `content/faq-base.md` · Étape 10 — `content/pages/mentions-legales.yaml` (+ locales) · Étape 11 — `docs/AUTHOR-[slug].md` (si Bloc 7 — **prénom seul / prénom + initiale**).

---

## Étape 12 — DA via le SYSTÈME DE VARIANTES (full-auto, JAMAIS un clone)

`ls -la design-incoming/` :
- **non vide** → `integrate-claude-design`.
- **vide** → dérouler **`docs/AUTO-DESIGN.md`** du fork. Le fork EMBARQUE déjà `lib/variants.ts`, `lib/typography.ts`, `components/layout/PermutationStyle.tsx` :

  **1. VARIANTE HOME — le SECTEUR décide de la famille, le SEED tranche dans la famille.**

  a. **Famille** = `homeFamily(secteur)` (`lib/variants.ts`), depuis le secteur de la niche (étape 1).
     Il existe **TROIS** familles — `homeFamily(secteur)` renvoie `'beaute' | 'comparateur' | 'editorial'` :
     - **Assurance · Banque · Énergie · Télécom · Crédit · Casino & Paris** → famille **`comparateur`**
       (l'internaute vient **comparer une offre à souscrire** : prix, conditions) → pool **⅔ `marche` / ⅓ `comparateur`**.
     - **Beauty · Mode** (cosmétique, maquillage, parfum, soin, cheveux, fashion) → famille **`beaute`**
       → variante **`presse`**. Ce n'est pas une simple home : c'est une **IDENTITÉ ÉDITORIALE COMPLÈTE** —
       masthead sérif centré + nav catégories sticky, une + sections par catégorie, colonne
       « à ne pas manquer », et des **vues blog / catégorie / article dédiées**. Dès que
       `layouts.home = 'presse'`, écrire **AUSSI** `layouts.category = 'presse'` **et**
       `layouts.article = 'presse'` (le layout bascule tout seul via `isPresse()`).
       C'est la **SEULE** variante de cette famille : **la variété inter-sites y vient de la PALETTE + de la
       TYPO (seedées sur le domaine), PAS du layout.** Deux sites beauté partagent la structure mais ont une
       DA différente → **soigner particulièrement la typo** (paire **sérif display + grotesk de lecture**) et
       les **5 accents de catégorie** distincts.
     - **Voiture · Retailer & Tech · Hospitality · Agence · autres** → famille **`editorial`**
       (thématique où l'on vient **lire / se documenter**) → pool **⅔ `magazine` / ⅓ `fil`**.
  b. **`suggestVariants(niche.domain, homeFamily(secteur)).home` est AUTORITAIRE** : écris **EXACTEMENT** ce
     tirage dans `niche.config.layouts.home`. Le seed (domaine) fait diverger deux sites du même secteur.
  c. **INTERDIT** : plaquer un `comparateur`/`marche` (ou `style.hero: 'split'`) sur une thématique
     **éditoriale ou beauté** (voiture, beauté, mode…) ; plaquer un `magazine` sur une **offre à souscrire**
     (assurance, banque, énergie, télécom). Et ne JAMAIS choisir `comparateur` « parce que tous nos sites
     sont des comparateurs » — c'est faux : **le secteur décide**.
  d. **ANTI-RÉPÉTITION** : si le tirage donne la même variante que les **2 derniers sites de la MÊME
     famille** (`github_read_file` sur leur `niche.config.ts` → `layouts.home`), **re-roll** :
     `suggestVariants(niche.domain + '-2', famille)`. *(Sans objet pour `beaute`, famille mono-variante :
     c'est la palette + la typo qui divergent.)*
  e. **`style.hero` COHÉRENT** avec la variante : magazine→`centered`, marche→`centered`,
     **presse→`centered`**, comparateur→`split`, fil→`minimal`. **Jamais `split` par défaut.**
  f. `marche` est **éligible d'office** : le classement seed (étape 13bis) alimente son tableau du marché
     et le spotlight du n°1. L'archetype `## Design` ne nuance QUE les effets/couleurs, **jamais la variante**.

  2. **Permutations** : `suggestVariants(niche.domain, famille)` → `niche.config.permutations` (`shape`/`border`/`shadow`) + `layouts.category` (⚠️ sauf `presse`, où `category` et `article` sont forcés à `'presse'`).
  3. **Palette** : `## Design` (`brandColor`/`skin`) sinon **preset déterministe** (`lib/da-presets/`, par thématique + **seed domaine**) → écrire `niche.config.palette` PUIS propager dans `app/globals.css :root` (+ `@theme`).
  4. **Typo** : `suggestFonts(niche.domain, home)` (`lib/typography.ts`) → écrire la paire dans `app/layout.tsx` (next/font, imports statiques).
  5. **Dépublier les previews** : supprimer `/home-vN`, `/cat-vN`, `/art-v1` (+ `/en/...`).

> ⚠️ **ANTI-CLONE (règle dure).** La DA se **dérive du DOMAINE** (seed) et du **SECTEUR** (famille).
> **INTERDIT** d'ouvrir/copier le code, la palette ou les fonts d'un AUTRE site du réseau (`emd-project/*`).
> **Check de divergence** : la **variante home**, la **palette (accent-1)** ET la **paire de fonts** doivent
> **différer** d'un site voisin de la même famille (cf. 12.1.d). En famille `beaute`, la variante est
> commune : ce sont la **palette** et la **typo** qui DOIVENT diverger. Documenter la combinaison dans
> DECISIONS.md. **PAS d'images ici** (cf. étape 15). **Ne PAS écraser `niche.config.ts.categories`**
> (clusters Semrush).

---

## Étape 13 — Arborescence + contenu seed (BILINGUE si `locales ≥ 2`)

- Catégories browsables (depuis `niche.config.categories`).
- **1-2 articles seed réels sourcés.** **Si `locales ≥ 2`** : chaque seed est écrit en FR **ET** dans chaque
  autre langue (miroir strict, `content/blog/[locale]/[categorie]/[slug].mdx`) **+ la paire ajoutée à
  `lib/i18n/article-slugs.ts`**. Sinon : `/en` vide + **LangSwitch 404** + hreflang manquant = **échec d'init**.
  Si `locales = 1` → un seul fichier, pas d'arbre `/en`.
- **Titres FR accordés au genre** (`entityGender`) : « Les **meilleures** néobanques », jamais « meilleurs ».
- **Vérifier** : le sélecteur de langue fonctionne (mapping présent), hreflang réciproque sur le seed.

## Étape 13bis — Classement SEED (asset GEO #1, dans le système EXISTANT du template)

On **remplit** le système déjà présent dans le fork (`/classement` + `/classement/[produit]`,
`lib/classement.ts`, `components/classement/ClassementList`) — **JAMAIS recréer une archi `/classements`
bespoke**. Écrire **1 classement SEED** dans `content/data/classements.json` (+ miroir `classements.en.json`
si `locales ≥ 2`) :

- **slug + label** = le **head term du cluster principal** (étape 3). C'est l'asset qui **possède le head nu**
  (anti-cannibalisation : le blog n'écrit pas ce head term, il **maille vers** le classement).
- **`genre`** du label ('m'/'f') pour l'accord du titre.
- **`items`** : Top 5-8 réels, **recherche SERP dédiée** (sources datées, prix marché), chacun avec
  `rank`, `nom`, `score` (/100), `badge`/`bestFor`, `verdict`, `pros`/`cons`, `prix`, `url` (lien NEUTRE, jamais affilié).
- **`excerpt`** (résumé COURT ≤ ~160c — **carte du hub** + **`<meta description>`**) **+ `intro`**
  (paragraphe LONG answer-first, corps de page) — **écrire LES DEUX, ne pas mettre le pavé `intro` en excerpt**.
- **`sections`** : 3-5 blocs long-form où **`q` est un H2 FORMULÉ EN QUESTION** (≥70% des H2) et `body` la
  réponse answer-first. + **`tldr`** (3-5 puces) + **`criteria`** + **`methodology`** + **`sources`** +
  **`faq`** 6-7. **Cible : ≥ 1000 mots**.
- **FR + miroir EN strict** (même slug, parité — `tests/i18n-parity.test.ts`).

Le hub `/classement` (+ nav/sitemap) se câble **automatiquement**. **Si la home est `marche`**, ce classement
alimente aussi le **tableau du marché** + le **spotlight du n°1** de la home.
Les **autres clusters** → boucle week-end **`emd-build-pages`**.

## Étape 13ter — ZÉRO PLACEHOLDER : dériver les pages clés DU CLASSEMENT SEED

> Le classement seed (13bis) a **déjà fait la recherche SERP** : items réels, prix, scores, pros/cons,
> critères, sources. Les autres pages clés s'en **DÉRIVENT** — c'est du **remploi, pas du travail neuf**.
> Un site ne sort **JAMAIS** de l'init avec une coquille vide.

- **Comparateur** → `content/data/comparateurs.json` : 1 famille = le **cluster principal** ;
  `modeles` = **les items du classement** (`nom`, `prix` en **number**, `specs`, `sourceUrl`
  **NEUTRE ou absent — jamais affilié**) ; `specsLabels` = **les `criteria` du classement**.
  **≥ 5 items, jamais vide.**
- **`/choisir`** → `content/data/choisir.json` : `tldr` + `sections` + `faq` **repris du classement**.
- **Quiz** → renseigner `niche.quiz.question` + `quiz.criteria` : **3-6 questions** à choix multiples bâties
  sur `comparator.criteria`, chaque combinaison menant à un **item RÉEL du classement** (+ 1-2 alternatives,
  justification factuelle). **Si un quiz honnête et utile est impossible → `quiz.enabled = false`.**
  Mieux vaut **pas de quiz** qu'un `/quiz` vide qui renvoie 404 alors que le sitemap l'annonce.
- **Deals → `niche.deals = { enabled: false }`** : le composant `DealsGrid` est **structurellement affilié**
  (`amazonUrl`, `AffiliateLink`, prix barré, « −X% »), or le modèle EMD est **MENTION, sans aucune
  affiliation**. Le remplir imposerait d'**inventer des promos** → **on ne le fait JAMAIS**. On **SUPPRIME
  les routes `app/(site)/deals/` et `app/en/deals/`** du fork et on retire `'deals'` de `homeSections`.
  (Le lien disparaît de la nav tout seul : `dealsEnabled()`.)
- **Supprimer les gabarits** une fois le seed écrit : `content/**/_example.*` et
  `content/blog/**/article-modele.mdx` (+ miroir EN).
- **Aucune chaîne de gabarit ne survit** : « Modèle A/B/C », « Catégorie A/B/C », « À définir », « TBD »,
  « Lorem ipsum », « sera personnalisé », « contenu de démonstration ».
- **Vérification de sortie** : **`npm run check:placeholders` doit passer**. S'il signale quelque chose →
  **corriger la DONNÉE**. Ne jamais masquer, ne jamais désarmer le garde-fou.

---

## Étape 14 — Commit atomique du SITE (code + contenu, AVANT les images)

UN commit : `niche.config.ts` + `content/*` (dont `content/data/classements.json` + `.en.json` du seed, `comparateurs.json`, `choisir.json`) + DA (`globals.css`/`layout.tsx`) + seed bilingue + mapping i18n + previews dépubliées + routes `deals` supprimées. **Le site est déjà déployable** (placeholders d'images temporaires). Conventional Commits anglais.

---

## Étape 15 — Images À LA FIN, UNE PAR UNE, AUCUN SLOT OUBLIÉ

APRÈS que le site est bâti **et commité** (étape 14). La **checklist = `lib/image-slots.ts` →
`getAllImageSlots()`** : source **UNIQUE et EXHAUSTIVE** (dérivée de `niche.config.categories`/`author`),
donc **aucune catégorie ni slot ne peut être oublié**. **NE JAMAIS** coder une liste « ≤ N » en dur.

**Worklist** = `getAllImageSlots()` **+** 1 cover par article seed. Génération **STRICTEMENT SÉQUENTIELLE** :
`generate_image` → `wait_for_image` → WebP → `github_push_images` au **chemin EXACT du slot** → cocher dans
PROGRESS → pause → suivante.

**Couverture attendue :**
1. **Home** : `home-hero-background` + `home-hero-visual`.
2. **Catégories — les DEUX slots PAR catégorie** : `home-category-[slug]` **ET** `blog-category-background-[slug]`, pour CHAQUE catégorie.
3. **Auteur** : `author-[slug]` (1:1).
4. **Article(s) seed** : **1 cover GÉNÉRÉ** (`featureImage` + `featureImageAlt`) **+ 2 `<ArticleImage>` RÉUTILISÉES** (aucune génération).
5. **OG + bandeaux outils** : seulement **si la page existe**, sinon TODO week-end.

**Anti-oubli — vérif finale OBLIGATOIRE** : re-parcourir `getAllImageSlots()` et **vérifier via
`github_list_files`** que chaque fichier visible (1-4) existe. Manquant → **retry `-v2`** ; sinon placeholder
+ **slot précis dans PROGRESS**. Le récap liste « générées / placeholder » **slot par slot**.

- Prompts ≤ ~20 mots alignés DA, finir par « no text, no logos, no watermark », jamais de marque réelle.
- Images en commits séparés.

---

## Étape 16 — PROGRESS.md + DECISIONS.md
Documenter : **famille de home (secteur) + variante tirée** (et pourquoi elle diverge des voisins de la même famille — en `beaute`, la divergence porte sur palette + typo), permutations + palette + typo, **`entityGender`**, **classement seed**, **pages dérivées du seed (comparateur / choisir / quiz) + deals désactivé**, seed bilingue, **images SLOT PAR SLOT**, previews dépubliées.

---

## Étape 17 — Scheduled task de rédaction — EN TOUT DERNIER, AUTO (sans confirmation)

**DERNIÈRE action**, une fois le site complet. **La spec vaut CONSENTEMENT → créer la tâche AUTOMATIQUEMENT,
SANS demander confirmation.** Gabarit **`docs/SCHEDULED-TASK-REDACTION.md`** (byline = auteur **prénom seul /
prénom + initiale** ; titres **accordés au genre** ; articles **maillent vers le classement**).
- TaskId : `[repoName]-article-daily` · Cron : cadence Bloc 3 (`0 8 * * *` défaut).
Échec de création → log dans PROGRESS, **ne pas bloquer**.

## Étape 18 — Récap utilisateur
Marché/locales · clusters/categories · **DA : famille (secteur) + variante home + permutations + palette + typo (divergentes)** · **genre entité** · **auteur (prénom seul / + initiale)** · seed bilingue (LangSwitch OK) · **classement seed (head term, excerpt court + ≥1000 mots, FR+EN)** · **pages dérivées : comparateur + /choisir + quiz, deals désactivé, `check:placeholders` OK** · **images SLOT PAR SLOT** · scheduled task créée · lien repo.

---

## Règles strictes
- **NE JAMAIS exécuter** sans `init-spec.md` · **NE JAMAIS écraser** un `niche.config.ts` rempli.
- **DA = système de variantes, JAMAIS un clone** : `layouts` + `permutations` + `palette` + typo dérivés du **seed domaine** ; interdiction de copier un site voisin ; check de divergence.
- **Home : le SECTEUR décide de la FAMILLE, le SEED tranche dedans.** Beauty/Mode → `beaute` (`presse`, identité complète : `category` + `article` = `'presse'`) ; Assurance/Banque/Énergie/Télécom/Crédit/Casino → `comparateur` (⅔ `marche`, ⅓ `comparateur`) ; Voiture/Retail/Hospitality/autres → `editorial` (⅔ `magazine`, ⅓ `fil`). `suggestVariants(domaine, homeFamily(secteur))` **AUTORITAIRE** + **anti-répétition** vs les 2 derniers de la même famille. **Jamais un comparateur sur une thématique éditoriale ou beauté, jamais un magazine sur une offre à souscrire.** `style.hero` cohérent (magazine/marche/**presse** → `centered`, comparateur → `split`, fil → `minimal`).
- **ZÉRO PLACEHOLDER à la livraison** : comparateur + `/choisir` + quiz **dérivés du classement seed**, gabarits supprimés, **deals désactivé** (jamais de fausse promo), `check:placeholders` passe.
- **Genre : `entityGender` au genre RÉEL** ('m'/'f' ; + `dealWordGender` ; + `genre` par classement) — sinon accords FR faux (« meilleurs néobanques »). Le template accorde via `lib/utils/grammar.ts`.
- **Auteur = PRÉNOM SEUL ou prénom + initiale, JAMAIS de nom de famille inventé.**
- **Classement SEED dès l'init** dans le système EXISTANT du template : head term du cluster principal, **`excerpt` court + `intro` long distincts**, ≥1000 mots (sections H2 questions + items notés + critères + méthodo + sources + FAQ), `genre`, FR+EN. **JAMAIS d'archi `/classements` bespoke.**
- **Seed BILINGUE dès N≥2** : FR + miroir + mapping i18n. Sinon échec d'init.
- **Images À LA FIN, une par une** : worklist = `getAllImageSlots()` + 1 cover/seed + 2 réemplois ; **aucun slot oublié** (vérif `github_list_files`) ; échec → placeholder + log + continuer.
- **Scheduled task EN DERNIER, AUTO sans confirmation.**
- **TOUJOURS** : commit atomique avant images · categories depuis Semrush · miroir strict si N≥2 · modèle MENTION (pas d'affiliation) · anti-cannibalisation (head nu réservé aux assets).

## Lien avec les autres skills / docs
`nouveau-site` (routeur) · `init-site` (sans spec — même doctrine) · `integrate-claude-design` (étape 12 cas A) ·
`docs/AUTO-DESIGN.md` + `lib/variants.ts` (familles `beaute`/`comparateur`/`editorial` + variantes) + `lib/typography.ts` · `docs/IMAGES-WORKFLOW.md` + `lib/image-slots.ts` · `lib/utils/grammar.ts` (accords FR) · `lib/classement.ts` + `ClassementList` ·
`docs/SCHEDULED-TASK-REDACTION.md` · `seo-geo-redaction` + `ton-of-voice` + `humaniser-fr` · boucle `emd-build-pages`.
