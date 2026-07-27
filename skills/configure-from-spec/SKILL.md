---
name: configure-from-spec
version: 3.0.0
description: Configure un nouveau site fork-é depuis emd-template À PARTIR D'UN FICHIER SPEC pré-rempli par le wizard nano-mentionbox. Lit `init-spec.md`, analyse les exports Semrush dans `semrush-exports/` pour clusteriser et déterminer l'arborescence (categories), écrit `niche.config.ts` + tous les `content/*` (miroir si N langues), compose une DA UNIQUE (famille via classifyNiche + tirage seedé suggestVariants/suggestFonts + palette tirée d'une bibliothèque curatée puis MUTÉE — jamais un clone d'un autre site), valide le CONTRASTE par calcul WCAG (design fiable sans review visuelle), bâtit l'arborescence + un seed BILINGUE + 1 classement seed, dérive les pages clés du classement seed (comparateur, /choisir, quiz FR+EN) → ZÉRO PLACEHOLDER, éteint proprement deals et simulateur, commit, déploie, PUIS journalise (sites.csv + provisioned-log) et crée la tâche de rédaction, et SEULEMENT ENSUITE génère les images une par une (registre getAllImageSlots). À utiliser SEULEMENT quand un init-spec.md fraîchement poussé par le wizard est présent à la racine et que l'utilisateur dit « configure le site depuis init-spec.md », « configure depuis la spec », « init from spec », « lance la configuration », « setup le repo ». Ne JAMAIS utiliser pour un site déjà configuré (niche.config.ts.market défini → init-site pour amender). Ne JAMAIS proposer si init-spec.md n'existe pas — proposer init-site.
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

# configure-from-spec v3.0 — Configurer un site depuis un init-spec.md

> **Deux principes qui gouvernent tout le reste :**
>
> **1. Tu travailles EN AVEUGLE.** Personne ne regarde le rendu avant publication. Donc aucune
> décision de design « au feeling » : chaque choix vient d'une **bibliothèque curatée** ou d'un
> **tirage seedé**, et tout ce qui est vérifiable l'est **par calcul ou par grep**
> (`references/design-ux-regles.md`).
>
> **2. L'ordre des étapes protège le site.** La comptabilité (CSV + journal) et la tâche de
> rédaction passent **AVANT** les images. Les images sont la partie la plus longue du run ; quand
> il s'épuise dedans, tout ce qui suit saute. Deux sites l'ont appris à leurs dépens
> (`quelle-assurance-auto.be` jamais journalisé, `comparer-banque.be` muet pendant des semaines).

## Pré-requis vérifiés au démarrage
1. **`init-spec.md` existe** à la racine. Sinon → proposer `init-site`.
2. **`niche.config.ts.market` vide/placeholder**. Si déjà rempli → STOP (site déjà configuré).
3. **MCP nano-mentionbox disponible**. Sinon → prévenir : les images de l'étape 9 ne tourneront pas
   (le BUILD, lui, n'en dépend pas).
4. **Git status clean** ou changements non liés.

En dehors de ces points, ne pas s'interrompre : la spec fait foi. **Aucune confirmation demandée.**

---

## Étape 1 — Parser le init-spec.md
Sections : `## Identité`, `## Bloc 0` (marché+langues), `## Bloc 1` (voix), `## Bloc 2` (mots-clés +
`semrush-exports/*.csv`), `## Bloc 3` (calendrier), `## Bloc 4` (concurrents), `## Bloc 5` (FAQ),
`## Bloc 6` (mentions), `## Bloc 7` (auteur, opt), `## Design` (archetype/skin/vertical/brandColor/mode).
Si Bloc 0/1/6 manque → STOP. **Retenir le SECTEUR** (colonne CATÉGORIE de `sites.csv`) : il pilote la famille.

## Étape 2 — Validation sémantique
`market` valide · `locales[0]===defaultLocale` · `localePrefix as-needed` ⇒ N≥2 · email contact (STOP si
absent) · slug auteur kebab-case. Regrouper les warnings.

## Étape 3 — Analyser Semrush (`semrush-exports/*.csv`)
Agréger/dédoublonner · classer l'intent · clusteriser (5-10) · dériver `niche.config.categories` TOUJOURS
depuis les clusters. Par cluster : head term (KD≤50), longue traîne (vol 30-500), quick wins (KD≤30 &
vol≥20), à éviter (vol 0 ou KD>70). **Repérer le CLUSTER PRINCIPAL** → son head term sera le classement
seed (étape 5bis).

## Étape 4 — Écrire `niche.config.ts`
Mapping spec → config. Dériver entity/entities/heroPrefix/rotatingWords des clusters.
- **Genre (`entityGender`)** : genre RÉEL de l'entité (`'m'`/`'f'`) — pilote TOUS les accords FR
  (« néobanque » → `'f'`). `dealWordGender` si `dealWord` diffère. **JAMAIS le défaut masculin pour une
  entité féminine.** Accorder heroPrefix/heroSuffix/rotatingWords.
- **Auteur** : `name` = **PRÉNOM SEUL** (« Jean ») ou **prénom + initiale** (« Jean M. ») — **JAMAIS de
  nom de famille inventé** ; `slug` = kebab du prénom. Même si le Bloc 7 donne un nom complet, ne garder
  que le prénom. La `bio` détaille l'expertise sans jamais révéler de nom de famille.

## Étape 5 — Contenus
`content/mots-cles.md` (clusters + « requêtes à ÉVITER » = head nu réservé aux assets) ·
`content/calendrier-edito.md` (50 articles, SERP-first, ⅔ marques / ⅓ info, anti-cannibalisation) ·
`content/ton-of-voice.md` · `content/personas.md` (2-4) · `content/concurrents.md` · `content/faq-base.md` ·
`content/pages/mentions-legales.yaml` (+ locales) · `docs/AUTHOR-[slug].md` si Bloc 7.

---

## Étape 6 — DA : famille → squelette → palette → typo

`ls -la design-incoming/` : **non vide** → `integrate-claude-design`. **Vide** → dérouler ci-dessous
(doctrine détaillée : `docs/AUTO-DESIGN.md` du fork, qui fait foi sur le code).

### 6.1 Famille — `classifyNiche`, jamais à la main
```ts
const { family, confidence, conflict } = classifyNiche({ domain, siteName, sector })
```
- **service souscriptible** (assurance, banque, énergie, télécom, crédit, casino, VPN) → `comparateur`
  → pool **⅔ `marche` / ⅓ `comparateur`**
- **beauté & mode** → `beaute` → **`presse`** : identité éditoriale COMPLÈTE. Dès `layouts.home='presse'`,
  écrire AUSSI `layouts.category='presse'` et `layouts.article='presse'`. Variante unique de la famille :
  **la divergence y vient de la palette et de la typo.**
- **produit physique** (voiture, aspirateur, TV), hospitality, tech, **et défaut prudent** → `editorial`
  → pool **⅔ `magazine` / ⅓ `fil`**

⛔ Ne JAMAIS classer sur « la requête est-elle comparative ? » : presque tous les domaines du réseau le
sont. Le signal est l'**entité** (`citadine`), pas le modificateur (`meilleure`). Signaler `conflict` ou
`confidence: 'low'`.

### 6.2 Squelette — tirage seedé + ANTI-COLLISION INTER-SITES
```ts
const v = suggestVariants(niche.domain, family, { home: [...homesDesTroisDerniersSitesDeLaFamille] })
```
**Avant de tirer**, lis `pipeline/provisioned-log.csv`, prends les **3 derniers sites** et lis leur
`niche.config.ts` → `layouts.home`. Passe-les en `exclude.home`. Si `v.homeCollision === true`, le pool de
la famille est épuisé : **signale-le dans le rapport** (c'est le signal qu'il faut une variante de plus).
Écrire `layouts` (home/category/article), `permutations` (shape/border/shadow), **`style.effects` et
`style.cards`** (tirés eux aussi), et `style.hero` cohérent : magazine/marche/presse → `centered`,
comparateur → `split`, fil → `minimal`. **Jamais `split` par défaut.**

> ⚠️ `style.effects` et `style.cards` ne sont pas encore consommés par le rendu (comme
> `niche.config.fonts`). On les écrit pour la traçabilité du tirage ; ne pas prétendre dans le rapport
> qu'ils changent le design.

### 6.3 Palette — TOUJOURS une bibliothèque curatée, JAMAIS d'hex inventés
**Ordre de préférence :**
1. **Une des 5 directions de `docs/DA-DIRECTIONS.md`**, choisie selon la niche et l'intent, **PUIS MUTÉE** :
   teinte de marque **±12-45°**, accent secondaire ré-accordé. C'est le **défaut**.
2. **`lib/da-presets/palettes.json`** (161 palettes) si aucune direction ne colle vraiment à la niche
   (verticale très typée : finance, santé, SaaS). Muter également.
3. Un `brandColor` fourni par la spec remplace **UNIQUEMENT `accent-1`** ; le reste vient de la source
   choisie.

**INTERDIT d'improviser des hex** (fonds, surfaces, texte, bordures) : un agent sans yeux qui invente des
couleurs produit les sites cassés qu'on a connus.

**ANTI-CLONE — vérifier les 3 derniers sites** (mêmes fichiers que 6.2) : `accent-1` doit diverger en
**teinte** (≥ 25°) **et** le couple `bgPrimary`/`bgSurface` ne doit pas être identique à celui d'un
voisin de la même famille. *(Piège constaté : deux presets différents peuvent partager exactement le même
stack de fonds `#F8FAFC`/`#FFFFFF` — deux sites paraissent alors jumeaux malgré des accents différents.)*

**Propagation** : écrire `niche.config.palette`, puis propager dans **TOUS les blocs** de
`app/globals.css` — `@theme`, `:root`, `@media (prefers-color-scheme: light)`, `html[data-theme="light"]`,
`html[data-theme="dark"]`. N'en oublier aucun : ne réécrire que `:root` laisse **tous les sites
identiques en mode clair**. **NE JAMAIS écrire de valeur dans `app/styles/volteo.css :root`** (couche
d'alias). Mode **light OU dark FIXE** — supprimer le toggle localStorage et poser `data-theme` sur `<html>`.

### 6.4 Typo — `suggestFonts` → **`app/layout.tsx`**
`suggestFonts(niche.domain, v.home)` (la paire par défaut du template est exclue du tirage : un site en
typo template est indistinguable d'un fork non configuré). Écrire la paire dans **`app/layout.tsx`** via
`next/font/google` (imports **statiques**). ⚠️ **`niche.config.fonts` n'est lu par AUCUN code** : l'écrire
seul ne change RIEN au rendu. Le renseigner en plus, pour la trace.

### 6.5 Contraste — CALCULÉ, pas regardé (avant le commit de DA)
Ratios WCAG depuis les hex finaux (`L = 0,2126R + 0,7152G + 0,0722B` sur canaux linéarisés ;
`ratio = (L1+0,05)/(L2+0,05)`), **en clair ET en sombre** : `--foreground`/`--background` ·
`--muted-foreground`/`--background` et `/--card` · texte des boutons-badges sur `--accent-1` · bordures
d'input et anneau de focus. **≥ 4,5 texte (< 24px, ou < 18,5px si gras), ≥ 3 gros titres / bordures /
focus. Aucun arrondi : 4,49 échoue.** Sous le seuil → ajuster la **lightness** du token (pas la teinte),
recalculer, consigner dans DECISIONS.md.

### 6.6 Garde-fous chiffrés + anti-pattern IA
Détail dans `references/design-ux-regles.md`. Minimum : corps ≥ 16px et `line-height` **1,5-1,65** ·
titres ≥ 32px en **1,1-1,25** · **≤ 10 tailles de police**, **≤ 3 familles** · prose **60-75ch** ·
espacements sur l'échelle 4/8 avec `padding` de carte **<** `gap` de la grille · cibles **≥ 44px** en
mobile · jamais `outline-none` sans `focus-visible:` · animations sous `prefers-reduced-motion` (100-600ms) ·
images avec dimensions/`aspect-ratio`.
**Proscrits** : dégradé indigo→violet→rose · badge-pill au-dessus du H1 + hero centré + 3 cartes
identiques · ombre unique partout · emoji-icône · `text-align: justify` · capitales > 3 mots · preuve
sociale fabriquée. **Grep-toi avant de committer.**

### 6.7 Dépublier les previews
Supprimer `/home-vN`, `/cat-vN`, `/art-vN` (+ `/en/...`).

---

## Étape 7 — Arborescence + seed BILINGUE
- Catégories browsables depuis `niche.config.categories`.
- **1-2 articles seed réels sourcés.** Si `locales ≥ 2` : chaque seed en FR **ET** en miroir strict
  (`content/blog/[locale]/[categorie]/[slug].mdx`) **+ paire ajoutée à `lib/i18n/article-slugs.ts`**.
  Sinon `/en` vide + LangSwitch 404 = **échec d'init**. Si `locales = 1` → pas d'arbre `/en`.
- **Titres FR accordés au genre** : « Les **meilleures** néobanques ».

## Étape 7bis — CLASSEMENT SEED (asset GEO #1)
On **remplit** le système existant (`lib/classement.ts`, `/classement/[produit]`) — **JAMAIS une archi
`/classements` bespoke**. Dans `content/data/classements.json` (+ `.en.json`) :
- **slug + label** = head term du cluster principal (l'asset **possède le head nu**) · **`genre`** du label
- **`items`** : Top 5-8 réels, **recherche SERP dédiée** — `rank`, `nom`, `score`/100, `badge`/`bestFor`,
  `verdict`, `pros`/`cons`, `prix`, `url` (**lien NEUTRE, jamais affilié**)
- **`excerpt`** (COURT ≤ 160c → carte du hub + `<meta description>`) **+ `intro`** (LONG answer-first)
  — écrire LES DEUX
- **`tldr`** 3-5 puces (**affichées dans le hero, colonne droite**) · **`sections`** 3-5 blocs dont
  **`q` est un H2 EN QUESTION** · `criteria` · `methodology` · `sources` · `faq` 6-7
- **Cible ≥ 1000 mots** · **FR + miroir EN strict**

## Étape 7ter — ZÉRO PLACEHOLDER (tout dérive du classement seed)
La recherche SERP est **déjà faite** : c'est du **remploi**, pas du travail neuf.
- **Comparateur** → `content/data/comparateurs.json` : `modeles` = les items du classement (`prix` en
  **number**, `sourceUrl` neutre ou absent) ; `specsLabels` = les `criteria`. **≥ 5 items.** Faire
  coïncider les slugs comparateur avec les slugs de catégorie quand c'est pertinent (sinon le `ToolCTA`
  des articles retombe sur `/comparer`).
- **`/choisir`** → `content/data/choisir.json` : `tldr` + `sections` + `faq` repris du classement,
  **une entrée par slug comparateur**.
- **Quiz** → `content/pages/quiz.yaml` **ET `content/pages/quiz.en.yaml`** (sinon `/en/quiz` = 404
  permanent référencé par le footer EN) + `niche.quiz` : **3-6 questions** menant à un **item RÉEL**.
  **Quiz impossible honnêtement → `quiz.enabled = false`** et aucun lien vers `/quiz`.
- **Deals → `enabled: false`** + **supprimer** `app/(site)/deals/` et `app/en/deals/`, retirer `'deals'`
  de `homeSections`. Le composant est structurellement affilié ; le modèle est **MENTION**. Jamais de
  fausse promo.
- **Simulateur → `simulator.enabled = false`** + **supprimer** `app/(site)/simulateur/` et
  `app/en/simulateur/`. « Cycles de prix » n'a de sens que pour un bien vendu par générations ; ailleurs
  c'est une coquille vide annoncée au sitemap.
- **Supprimer les gabarits** : `content/**/_example.*`, `content/blog/**/article-modele.mdx` (+ EN).
- **Aucune chaîne de gabarit ne survit** : « Modèle A/B/C », « À définir », « TBD », « Lorem ipsum ».
- **`npm run check:placeholders` doit passer.** S'il signale quelque chose → **corriger la donnée**.

## Étape 8 — Identité, légal, cookies, responsive, commit
- **Favicon = MONOGRAMME** (`app/icon.svg`) : rond `palette.accent1` + initiale de la thématique,
  couleur de lettre calculée (cf. `references/logo-pipeline.md` §1). **Jamais un mark dessiné en favicon.**
- **Logo header** = mark SVG vectorisé inline dans `Nav.tsx`, tinté `var(--accent-1)`, + wordmark texte.
- **Légal** rempli, noindex, MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne.
- **Cookies RGPD** : bandeau monté dans le layout, Accepter/Refuser, aucun tracker avant consentement.
- **Responsive** : 0 scroll horizontal, lisible à **320px**, marges mobiles ≥ 16px.
- **Commit atomique** (code + contenu), build vert, puis **deploy Vercel**.

---

## Étape 9 — COMPTABILITÉ — AVANT LES IMAGES, NON NÉGOCIABLE
Deux écritures, deux minutes :
1. `pipeline/sites.csv` : la ligne du domaine passe à **« Configuré »** (+ URL Vercel).
2. **append `pipeline/provisioned-log.csv`** : `<domaine.be>,<AAAA-MM-JJ>` (créer avec l'en-tête
   `domaine,date` si absent). **C'est ce journal que lisent le spawner de tâches et les audits : un site
   absent du journal est un site invisible, qui ne publiera jamais.**
Si une écriture échoue, **réessayer** avant de continuer.

## Étape 10 — TÂCHE DE RÉDACTION — avant les images aussi
Gabarit `docs/SCHEDULED-TASK-REDACTION.md`. Byline = auteur (prénom seul), titres accordés au genre,
articles **maillant vers le classement seed**. TaskId `[repoName]-article-daily`, **horaire de NUIT
19h00-05h59** dans un créneau libre. Créée AUTO, sans confirmation. Échec → log, ne pas bloquer.

## Étape 11 — IMAGES, EN DERNIER, UNE PAR UNE
Checklist = **`lib/image-slots.ts` → `getAllImageSlots()`** (registre EXHAUSTIF) **+ 1 cover par seed
+ 2 `<ArticleImage>` réutilisées**. **JAMAIS de liste « ≤ N » en dur.** Couverture : hero ×2 · **les DEUX
slots PAR catégorie** · `author-[slug]` · 1 cover par seed. **Séquentiel strict** : generate → wait →
WebP → push au chemin exact → suivante. Commits séparés. **Vérif finale `github_list_files`** ; manquant →
retry `-v2`, sinon placeholder + ligne « images à rattraper » dans PROGRESS.md, **sans bloquer**.
Si le run s'épuise ici : le site est déjà journalisé, publié, et il rédige.

## Étape 12 — PROGRESS.md + DECISIONS.md + rapport
**Réécrire le PROGRESS.md du site** (ne pas laisser celui du template — erreur constatée sur
`comparer-banque.be`). Documenter : famille + variante (+ `homeCollision` le cas échéant), permutations,
**source de palette (direction mutée ou preset) + mutations chiffrées**, typo réelle, **ratios de
contraste calculés**, `entityGender`, classement seed, pages dérivées, deals/simulateur éteints, seed
bilingue, images slot par slot, previews dépubliées.
Rapport final : NDD · catégorie · famille + variante · genre · DA (palette + typo + contrastes) ·
favicon monogramme · auteur · seed · classement · pages clés · check-placeholders · cookies · responsive ·
multilingue · **CSV + journal écrits** · horaire de rédaction · images · URL Vercel · sites restants.

---

## Règles strictes (récapitulatif)
- **NE JAMAIS exécuter** sans `init-spec.md` · **NE JAMAIS écraser** un `niche.config.ts` rempli.
- **ORDRE : comptabilité (9) et tâche de rédaction (10) AVANT les images (11).** Jamais l'inverse.
- **DA : famille par `classifyNiche`, squelette par `suggestVariants` (avec exclusion des 3 derniers
  sites de la famille), palette d'une bibliothèque curatée PUIS MUTÉE (jamais d'hex inventés), typo dans
  `layout.tsx`, contraste CALCULÉ, palette propagée dans les 5 blocs.** Vérifier la divergence sur
  `accent-1` (teinte) ET sur le couple de fonds.
- **ZÉRO PLACEHOLDER** : classement seed + comparateur + `/choisir` + quiz **FR ET EN** ; gabarits
  supprimés ; deals + simulateur éteints et routes supprimées ; `check:placeholders` passe.
- **Genre réel** (`entityGender`) · **auteur prénom seul** · **favicon monogramme**.
- **Seed BILINGUE** dès N≥2 (miroir + mapping) sinon échec d'init.
- **Modèle MENTION** : aucune affiliation, liens sortants neutres uniquement.
- **Anti-cannibalisation** : le head nu appartient aux assets, le blog maille vers eux.

## Liens
`nouveau-site` (routeur) · `init-site` (sans spec) · `integrate-claude-design` ·
`references/design-ux-regles.md` (règles chiffrées) · `references/pages-cles.md` (inventaire des routes) ·
`references/logo-pipeline.md` (favicon monogramme + logo) · `references/garde-fous.md` ·
`docs/AUTO-DESIGN.md` + `lib/niche-classify.ts` + `lib/variants.ts` + `lib/typography.ts` +
`lib/da-presets/` + `docs/DA-DIRECTIONS.md` · `lib/image-slots.ts` · `lib/utils/grammar.ts` ·
`lib/classement.ts` · `docs/SCHEDULED-TASK-REDACTION.md` · `seo-geo-redaction` · `ton-of-voice` ·
`humaniser-fr` · boucle `emd-build-pages`.
