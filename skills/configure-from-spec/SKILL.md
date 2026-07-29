---
name: configure-from-spec
version: 3.1.0
description: Configure un nouveau site fork-é depuis emd-template À PARTIR D'UN FICHIER SPEC pré-rempli par le wizard nano-mentionbox. Lit `init-spec.md`, analyse les exports Semrush dans `semrush-exports/` pour clusteriser et déterminer l'arborescence (categories), écrit `niche.config.ts` + tous les `content/*` (miroir si N langues), et DÉVELOPPE une direction artistique complète — parti pris écrit, template adapté à la thématique (classifyNiche + suggestVariants avec anti-collision), palette d'une bibliothèque curatée puis MUTÉE, typo tirée, et 3 à 5 EFFETS choisis dans docs/DA-EFFETS.md et écrits dans app/styles/da-site.css (le fichier propre au site) — puis valide le CONTRASTE par calcul WCAG (design fiable sans review visuelle), bâtit l'arborescence + un seed BILINGUE + 1 classement seed, dérive les pages clés du classement seed (comparateur, /choisir, quiz FR+EN) → ZÉRO PLACEHOLDER, éteint proprement deals et simulateur, commit, déploie, PUIS journalise (sites.csv + provisioned-log) et crée la tâche de rédaction, et SEULEMENT ENSUITE génère les images une par une (registre getAllImageSlots). À utiliser SEULEMENT quand un init-spec.md fraîchement poussé par le wizard est présent à la racine et que l'utilisateur dit « configure le site depuis init-spec.md », « configure depuis la spec », « init from spec », « lance la configuration », « setup le repo ». Ne JAMAIS utiliser pour un site déjà configuré (niche.config.ts.market défini → init-site pour amender). Ne JAMAIS proposer si init-spec.md n'existe pas — proposer init-site.
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

# configure-from-spec v3.1 — Configurer un site depuis un init-spec.md

> **Trois principes qui gouvernent tout le reste :**
>
> **1. Tu travailles EN AVEUGLE.** Personne ne regarde le rendu avant publication. Donc aucune
> décision « au feeling » : chaque choix vient d'une **bibliothèque curatée** ou d'un **tirage seedé**,
> et tout ce qui est vérifiable l'est **par calcul ou par grep** (`references/design-ux-regles.md`).
>
> **2. La DA (étape 6) est une VRAIE PHASE, pas une case à cocher.** C'est l'étape qui décide si le
> site ressemble à ses voisins. **Six leviers**, pas trois. Prends le temps.
>
> **3. L'ordre des étapes protège le site.** La comptabilité (CSV + journal) et la tâche de rédaction
> passent **AVANT** les images. Les images sont la partie la plus longue du run ; quand il s'épuise
> dedans, tout ce qui suit saute. Deux sites l'ont appris à leurs dépens (`quelle-assurance-auto.be`
> jamais journalisé, `comparer-banque.be` muet pendant des semaines).

## Pré-requis vérifiés au démarrage
1. **`init-spec.md` existe** à la racine. Sinon → proposer `init-site`.
2. **`niche.config.ts.market` vide/placeholder**. Si déjà rempli → STOP (site déjà configuré).
3. **MCP nano-mentionbox disponible**. Sinon → prévenir : les images de l'étape 11 ne tourneront pas
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
seed (étape 7bis).

## Étape 4 — Écrire `niche.config.ts`
Mapping spec → config. Dériver entity/entities/heroPrefix/rotatingWords des clusters.
- **Genre (`entityGender`)** : genre RÉEL de l'entité (`'m'`/`'f'`) — pilote TOUS les accords FR
  (« néobanque » → `'f'`). `dealWordGender` si `dealWord` diffère. **JAMAIS le défaut masculin pour une
  entité féminine.** Accorder heroPrefix/heroSuffix/rotatingWords.
- **Auteur** : `name` = **PRÉNOM SEUL** (« Jean ») ou **prénom + initiale** (« Jean M. ») — **JAMAIS de
  nom de famille inventé** ; `slug` = kebab du prénom. La `bio` détaille l'expertise sans jamais révéler
  de nom de famille.

## Étape 5 — Contenus
`content/mots-cles.md` (clusters + « requêtes à ÉVITER » = head nu réservé aux assets) ·
`content/calendrier-edito.md` (50 articles, SERP-first, ⅔ marques / ⅓ info, anti-cannibalisation) ·
`content/ton-of-voice.md` · `content/personas.md` (2-4) · `content/concurrents.md` · `content/faq-base.md` ·
`content/pages/mentions-legales.yaml` (+ locales) · `docs/AUTHOR-[slug].md` si Bloc 7.

---

# Étape 6 — DIRECTION ARTISTIQUE (la phase longue)

`ls -la design-incoming/` : **non vide** → `integrate-claude-design`. **Vide** → dérouler ci-dessous.
Doctrine code : `docs/AUTO-DESIGN.md` · palettes : `docs/DA-DIRECTIONS.md` · effets : `docs/DA-EFFETS.md`.

## 6.0 — LE PARTI PRIS, D'ABORD

Avant tout choix technique, écris **en une phrase** l'idée directrice du site, ancrée dans sa thématique :

> « papier fiduciaire, tableaux comptables sobres, cuivre et marine »
> « atelier mécanique, métal brossé et orange sécurité »
> « herbier, papier crème et vert sauge »

Cette phrase gouverne **tout ce qui suit** — palette, typo, effets — et se retrouve **en tête de
`app/styles/da-site.css`** ainsi que dans DECISIONS.md. **Sans parti pris, les choix ne sont pas
cohérents entre eux : c'est exactement ce qui produit des sites plats et interchangeables.**

## 6.1 — TEMPLATE adapté à la thématique — `classifyNiche`, jamais à la main
```ts
const { family, confidence, conflict } = classifyNiche({ domain, siteName, sector })
```
- **service souscriptible** (assurance, banque, énergie, télécom, crédit, casino, VPN) → `comparateur`
  → pool **⅔ `marche` / ⅓ `comparateur`**
- **beauté & mode** → `beaute` → **`presse`** : identité éditoriale COMPLÈTE. Dès `layouts.home='presse'`,
  écrire AUSSI `layouts.category='presse'` et `layouts.article='presse'`. Variante unique de la famille :
  **la divergence y vient de la palette, de la typo et des effets.**
- **produit physique** (voiture, aspirateur, TV), hospitality, tech, **et défaut prudent** → `editorial`
  → pool **⅔ `magazine` / ⅓ `fil`**

⛔ Ne JAMAIS classer sur « la requête est-elle comparative ? » : presque tous les domaines du réseau le
sont. Le signal est l'**entité** (`citadine`), pas le modificateur (`meilleure`). Signaler `conflict` ou
`confidence: 'low'`.

**ANTI-COLLISION INTER-SITES** — lis `pipeline/provisioned-log.csv`, prends les **3 derniers sites**,
ouvre leur `niche.config.ts` → `layouts.home`, et passe-les en exclusion :
```ts
const v = suggestVariants(niche.domain, family, { home: [...homesDesTroisDerniers] })
```
Écris EXACTEMENT le tirage. Si `v.homeCollision === true`, le pool de la famille est épuisé :
**signale-le** (c'est le signal qu'il faut une variante de plus). `style.hero` cohérent :
magazine/marche/presse → `centered`, comparateur → `split`, fil → `minimal`. **Jamais `split` par défaut.**

## 6.2 — PALETTE — bibliothèque curatée PUIS mutation, jamais d'hex inventés
1. **Une des 5 directions de `docs/DA-DIRECTIONS.md`** choisie selon la niche et le parti pris,
   **PUIS MUTÉE** (teinte de marque **±12-45°**, accent secondaire ré-accordé). C'est le **défaut**.
2. **`lib/da-presets/palettes.json`** (161 palettes) si aucune direction ne colle vraiment (verticale
   très typée : finance, santé, SaaS). Muter également.
3. Un `brandColor` de la spec remplace **UNIQUEMENT `accent-1`**.

**ANTI-CLONE — vérifier les 3 derniers sites** : `accent-1` doit diverger en **teinte (≥ 25°)** ET le
couple `bgPrimary`/`bgSurface` ne doit pas être identique. *(Piège constaté : deux presets différents
partagent parfois le même stack de fonds `#F8FAFC`/`#FFFFFF` — les sites paraissent alors jumeaux malgré
des accents distincts.)*

**Propagation dans les CINQ blocs** de `app/globals.css` : `@theme`, `:root`,
`@media (prefers-color-scheme: light)`, `html[data-theme="light"]`, `html[data-theme="dark"]`. N'en
oublier aucun : ne réécrire que `:root` laisse **tous les sites identiques en mode clair**.
**NE JAMAIS écrire de valeur dans `app/styles/volteo.css :root`** (couche d'alias). Mode **light OU dark
FIXE** — supprimer le toggle localStorage, poser `data-theme` sur `<html>`.

## 6.3 — TYPO — `suggestFonts` → **`app/layout.tsx`**
`suggestFonts(niche.domain, v.home)` → écrire la paire dans **`app/layout.tsx`** (next/font, imports
**statiques**). ⚠️ **`niche.config.fonts` n'est lu par AUCUN code** : l'écrire seul ne change RIEN au
rendu (le renseigner en plus, pour la trace). **La paire par défaut du template (Bricolage Grotesque ×
Hanken Grotesk) est INTERDITE** et exclue du tirage : un site qui sort avec elle est indistinguable d'un
fork non configuré.

## 6.4 — EFFETS — la peau du site (`docs/DA-EFFETS.md` → `app/styles/da-site.css`)

C'est le levier le plus sous-exploité, et celui qui rend un site reconnaissable. Lis
**`docs/DA-EFFETS.md`** (22 traitements prêts à coller : titres, cartes, sections, mouvement, finitions)
et **choisis 3 à 5 effets qui servent le parti pris de 6.0**. Écris-les dans
**`app/styles/da-site.css`** — le **seul** fichier propre à ce site, importé en dernier.

**Pourquoi là et pas ailleurs** : les composants (homes, hubs, articles) sont **partagés par tous les
forks** ; y toucher casse les autres sites et interdit toute correction centralisée. `da-site.css` est
sans risque.

**Règles dures** : **tokens uniquement, zéro hex** · toute animation enveloppée d'un
`@media (prefers-reduced-motion: reduce)` · **aucune règle de layout** (pas de `grid-template-columns`,
pas de largeurs — le layout appartient aux composants ; ici on fait de la couleur, de la matière, du
mouvement, de la typographie) · contraste recalculé sur toute surface repeinte.

**Ta sélection d'effets doit DIFFÉRER de celle des 3 derniers sites** (ouvre leur `da-site.css`) —
c'est le 3ᵉ niveau d'anti-empreinte, après le squelette et la palette.

> ⚠️ Limite à connaître : `PresseHome`, `PresseArticle` et `ClassementList` sont stylés **en inline**,
> et l'inline gagne sur la feuille CSS. Sur ces surfaces, `da-site.css` n'agit que par les **tokens**.

## 6.5 — PERMUTATIONS
Écrire `permutations` (shape/border/shadow) + `style.effects` / `style.cards` depuis le tirage.
> ⚠️ `style.effects` et `style.cards` **ne sont pas encore consommés par le rendu** (comme
> `niche.config.fonts`) : ils tracent le tirage. **Ne pas prétendre dans le rapport qu'ils changent le
> design** — c'est `da-site.css` qui le fait.

## 6.6 — CONTRASTE — CALCULÉ, pas regardé (avant le commit de DA)
Ratios WCAG depuis les hex finaux (`L = 0,2126R + 0,7152G + 0,0722B` sur canaux linéarisés ;
`ratio = (L1+0,05)/(L2+0,05)`), **en clair ET en sombre** : `--text-primary`/`--bg-primary` ·
`--text-secondary`/`--bg-primary` et `/--bg-surface` · texte des boutons-badges sur `--accent-1` ·
bordures d'input et anneau de focus · **plus toute surface repeinte par un effet de 6.4**.
**≥ 4,5 texte (< 24px, ou < 18,5px si gras), ≥ 3 gros titres / bordures / focus. Aucun arrondi : 4,49
échoue.** Sous le seuil → ajuster la **lightness** du token (pas la teinte), recalculer, consigner.

## 6.7 — Garde-fous chiffrés + anti-pattern IA
Détail : `references/design-ux-regles.md`. Minimum : corps ≥ 16px, `line-height` **1,5-1,65** ·
titres ≥ 32px en **1,1-1,25** · **≤ 10 tailles de police**, **≤ 3 familles** · prose **60-75ch** ·
échelle d'espacement 4/8 avec `padding` de carte **<** `gap` de la grille · cibles **≥ 44px** en mobile ·
jamais `outline-none` sans `focus-visible:` · durées 100-600ms · images avec dimensions/`aspect-ratio`.
**Proscrits** : dégradé indigo→violet→rose · badge-pill au-dessus du H1 + hero centré + 3 cartes
identiques · ombre unique partout · emoji-icône · `text-align: justify` · capitales > 3 mots · preuve
sociale fabriquée. **Grep-toi avant de committer.**

## 6.8 — Dépublier les previews
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
  de `homeSections`. Structurellement affilié ; le modèle est **MENTION**. Jamais de fausse promo.
- **Simulateur → `simulator.enabled = false`** + **supprimer** `app/(site)/simulateur/` et
  `app/en/simulateur/`. « Cycles de prix » n'a de sens que pour un bien vendu par générations.
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
WebP → push au chemin exact → suivante. Prompts ≤ 20 mots finissant par « no text, no logos, no
watermark », jamais de marque réelle. **Vérif finale `github_list_files`** ; manquant → retry `-v2`,
sinon placeholder + ligne « images à rattraper » dans PROGRESS.md, **sans bloquer**.
Si le run s'épuise ici : le site est déjà journalisé, publié, et il rédige.

## Étape 12 — PROGRESS.md + DECISIONS.md + rapport
**Réécrire le PROGRESS.md du site** (ne pas laisser celui du template — erreur constatée sur
`comparer-banque.be`). Documenter : **parti pris**, famille + variante (+ `homeCollision`), permutations,
**source de palette + mutations chiffrées + divergence vs les 3 derniers**, typo réelle, **effets retenus
et pourquoi ils servent le parti pris**, **ratios de contraste calculés**, `entityGender`, classement
seed, pages dérivées, deals/simulateur éteints, seed bilingue, images slot par slot, previews dépubliées.

---

## Règles strictes (récapitulatif)
- **NE JAMAIS exécuter** sans `init-spec.md` · **NE JAMAIS écraser** un `niche.config.ts` rempli.
- **ORDRE : comptabilité (9) et tâche de rédaction (10) AVANT les images (11).** Jamais l'inverse.
- **DA DÉVELOPPÉE, jamais expédiée** : parti pris écrit → template (`classifyNiche` + `suggestVariants`
  avec exclusion des 3 derniers) → palette curatée puis mutée → typo dans `layout.tsx` → **3-5 effets
  dans `da-site.css`** → contraste calculé. Divergence vérifiée sur **accent, fonds ET effets**.
- **Jamais d'hex inventés. Jamais de CSS partagé modifié.**
- **ZÉRO PLACEHOLDER** : classement seed + comparateur + `/choisir` + quiz **FR ET EN** ; gabarits
  supprimés ; deals + simulateur éteints et routes supprimées ; `check:placeholders` passe.
- **Genre réel** · **auteur prénom seul** · **favicon monogramme**.
- **Seed BILINGUE** dès N≥2 (miroir + mapping) sinon échec d'init.
- **Modèle MENTION** : aucune affiliation, liens sortants neutres uniquement.
- **Anti-cannibalisation** : le head nu appartient aux assets, le blog maille vers eux.

## Liens
`nouveau-site` (routeur) · `init-site` (sans spec) · `integrate-claude-design` ·
`references/design-ux-regles.md` · `references/pages-cles.md` · `references/logo-pipeline.md` ·
`references/garde-fous.md` · `docs/AUTO-DESIGN.md` · **`docs/DA-DIRECTIONS.md`** ·
**`docs/DA-EFFETS.md`** · `lib/niche-classify.ts` · `lib/variants.ts` · `lib/typography.ts` ·
`lib/da-presets/` · `lib/image-slots.ts` · `lib/utils/grammar.ts` · `lib/classement.ts` ·
`docs/SCHEDULED-TASK-REDACTION.md` · `seo-geo-redaction` · `ton-of-voice` · `humaniser-fr` ·
boucle `emd-build-pages`.
