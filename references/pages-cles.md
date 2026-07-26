# Référence — pages clés EMD (comparateur, quiz, tableaux, classements)

Définit ce que doivent contenir les **pages fonctionnelles** d'un site EMD, souvent **vides** sur les sites neufs. Objectif : pages utiles + qui **font surgir des marques** (inventaire de mentions). **Aucune affiliation** : pas de lien affilié, pas de prix-pour-clic, pas de disclaimer affilié. Les « offres/prix » sont des **données factuelles comparatives**, pas des liens monétisés. Un lien sortant éventuel est NEUTRE (`sourceUrl` : source officielle / page de la marque).

## Principe : data-driven, jamais de code risqué
Le builder **remplit des fichiers de DONNÉES** que les **composants du template consomment** — il n'écrit PAS de logique de composant (build-risqué, cf. `references/garde-fous.md`). Les données vivent désormais en JSON :
- **Comparateur** → `content/data/comparateurs.json` (consommé par `lib/comparateur.ts`).
- **/choisir (éditorial)** → `content/data/choisir.json` (consommé par `lib/choisir-content.ts`).
- **Classements** → `content/data/classements.json` (+ `.en.json`) (consommé par `lib/classement.ts`).
- **Quiz** → `content/pages/quiz.yaml` (+ **`quiz.en.yaml`**) pour les `steps`, critères dans `niche.config.ts` (`quiz.question`, `quiz.criteria`).
AVANT de construire, vérifier ces formats réels dans le repo (ils peuvent varier d'un site à l'autre). Si un composant n'est PAS data-driven (logique en dur), **signaler** plutôt que de bricoler du code. Données toujours **sourcées et datées** (.be / officiel), neutres, factuelles.

---

## 0. INVENTAIRE DES ROUTES D'UN FORK — statut attendu À LA LIVRAISON

> Un site ne sort **jamais** de l'init avec une page vide **ni un lien mort**. Passer cette table en revue
> avant de déclarer le site « Configuré ». (Audit du 26/07/2026 : c'est exactement ce qui manquait —
> `/simulateur` vide était annoncé au sitemap ET à la nav, `/en/quiz` renvoyait 404, et le footer EN
> pointait vers des routes FR inexistantes.)

| Route | Source | Attendu à la livraison |
|---|---|---|
| `/` + `/en` | `niche.config` + MDX | Rempli (sections gardées si donnée absente) |
| `/blog`, `/blog/[cat]`, `/[article]` | MDX `content/blog/**` | ≥ 1 article seed FR (+ miroir EN si N≥2) |
| `/classement` + `/classement/[produit]` | `classements.json` (+ `.en`) | **1 classement seed minimum** — asset GEO n°1, **doit être au sitemap** |
| `/comparer` + `/comparer/[produit]` | `comparateurs.json` | ≥ 5 items dérivés du classement seed |
| `/choisir/[produit]` | `choisir.json` + steps quiz | Rempli **pour chaque slug comparateur**, sinon la page fait `notFound()` et les liens entrants ne sont pas émis |
| `/quiz` + `/en/quiz` | `quiz.yaml` + **`quiz.en.yaml`** | 3-6 étapes **dans les DEUX locales**, ou `quiz.enabled = false` |
| `/simulateur` + `/en/simulateur` | ⚠️ données en dur | **Désactivé par défaut** — voir §5 |
| `/deals` + `/en/deals` | — | **Toujours désactivé** (structurellement affilié) + routes supprimées |
| `/auteurs/[slug]` | `niche.config.author` | Rempli, prénom seul |
| Légal FR/EN | pages en dur | Rempli, `noindex`. **Routes EN = `/en/legal-notice` et `/en/privacy`** (jamais `/en/mentions-legales`) |

**Contrôle des liens de locale** : pour chaque `lp('/x')` / `localePath('en', '/x')` du template, vérifier
qu'`app/en/x/` existe réellement. Un slug traduit (légal) casse le lien sans casser le build.

---

## 1. Comparateur → `content/data/comparateurs.json`
Compare les **produits/offres réels de la niche** sur un jeu de **critères** pertinents. Doit citer **plusieurs marques réelles**, traitées équitablement.
- **Items** : 5-12 produits/offres réels de la niche (ex. auto : modèles ; énergie : fournisseurs/contrats ; banque : cartes/comptes ; télécom : forfaits).
- **Critères** (4-8 selon la niche) : ex. auto → prix, autonomie/conso, coffre, TCO, fiabilité, équipement ; énergie → prix kWh, part verte, type de tarif, durée d'engagement, service ; banque → frais, cashback, plafonds, réseau, app.
- **Schéma** : `{ "<slug>": { id, label, description, specsLabels: {clé: libellé}, modeles: [{ nom, prix (number), nouveaute?, sourceUrl?, specs: {clé: valeur} }] } }`. `sourceUrl` = lien NEUTRE éventuel (source officielle/marque), **jamais affilié** ('' ou absent = aucun lien → aucun CTA rendu).
- **Données** : valeurs factuelles sourcées + datées (année dynamique pour ce qui bouge). Pas d'avis inventé.
- **Mentions** : chaque marque listée = une mention. Tri/colonnes neutres.
- ⚠️ **Slugs comparateur vs slugs de catégorie** : `ToolCTA` ne propose le comparateur d'une catégorie que si
  un produit du **même slug** existe ici. Faire coïncider les slugs quand c'est pertinent (sinon le CTA
  retombe silencieusement sur `/comparer`, ce qui est correct mais moins utile).

## 2. Quiz → `content/pages/quiz.yaml` **+ `quiz.en.yaml`** + `niche.config.ts`
Aide l'utilisateur à trouver le bon produit/catégorie via un **arbre de décision court**.
- **3-6 questions** à choix multiples (ex. budget, usage, taille de foyer, priorité) via `quiz.criteria`.
- **Logique de routage** : chaque combinaison mène à une **recommandation** (produit ou catégorie) + 1-2 alternatives, avec une phrase de justification factuelle.
- **PARITÉ OBLIGATOIRE** : `/quiz` fait `notFound()` si ses `steps` sont vides. Si le site est bilingue,
  **`content/pages/quiz.en.yaml` doit exister et être rempli**, sinon `/en/quiz` est un 404 permanent
  alors que le footer EN le référence. Quiz impossible honnêtement → `quiz.enabled = false` **et** on ne
  laisse aucun lien vers `/quiz`.
- Cohérent avec le comparateur (mêmes produits/catégories).
- Contenu éditorial associé des pages `/choisir/[produit]` → `content/data/choisir.json` (tldr, sections, faq),
  **une entrée par slug comparateur** (sinon la page 404 et le maillage depuis `/classement` et `/comparer`
  ne s'affiche pas).

## 3. Tableaux de prix / « offres » (factuels, sans affiliation)
- Tableau de **prix/valeurs courants** par produit, **sourcé et daté** (utiliser `[[date]]`/`currentYear()` pour le « courant »).
- **Aucun lien affilié**, aucun CTA d'achat monétisé. Liens sortants éventuels = `sourceUrl` neutre vers la source officielle/la marque.
- Les prix périment → ces données sont candidates à un **refresh périodique** (comme le refresh mensuel énergie).

## 4. Classements → `content/data/classements.json` (+ `.en.json`)
**Asset GEO #1.** On REMPLIT le système de classement **EXISTANT du template** (`/classement` + `/classement/[produit]`, `lib/classement.ts`, `components/classement/ClassementList`). **JAMAIS** une archi `/classements` bespoke (pluriel, `lib/classements.ts` inline) — c'est de la divergence/footprint à proscrire.
- **1 classement par CLUSTER** (head term : « meilleurs SUV », « meilleures néobanques »). Le classement **POSSÈDE le head nu** (anti-cannibalisation : le blog maille vers lui, ne le duplique pas).
- **Schéma** (cf. `lib/classement.ts`) : `{ "<slug>": { slug, label, genre:('m'|'f'), excerpt, intro, tldr:[…], sections:[{q,body}], criteria:[…], methodology, sources:[{label,url?}], faq:[{q,a}], items:[{rank,nom,score,badge?,bestFor?,verdict,pros:[…],cons:[…],prix,url?}] } }`.
- **`excerpt` vs `intro` (ne pas confondre)** : `excerpt` = résumé **COURT (≤ ~160 caractères)** utilisé pour la **carte du hub `/classement`** et la **`<meta description>`** ; `intro` = paragraphe **LONG answer-first** affiché en tête du **corps** de page. Écrire LES DEUX. (Sans `excerpt`, le rendu tronque `intro` — mais un excerpt rédigé est meilleur.)
- **≥ 1000 mots** par classement : `sections` = analyse long-form où **`q` est un H2 FORMULÉ EN QUESTION** (≥70% des H2 sont des questions, réponse answer-first en 1re phrase) + **FAQ 6-7**. `items` = Top 5-8 RÉELS (recherche SERP datée, prix marché, scores/100, verdict, pros/cons), **liens NEUTRES jamais affiliés**.
- **`genre`** du label → accord du titre (« meilleures néobanques », pas « meilleurs »).
- **FR + miroir EN strict** (même slug, parité — `tests/i18n-parity.test.ts`). Le hub `/classement` + nav **et le sitemap** se câblent **automatiquement** dès qu'une entrée existe.
- À l'init, **1 classement seed** est déjà créé (cluster principal). Cette boucle **COMPLÈTE les clusters restants** : cap ~2-3 classements/run/site, chacun ≥1000 mots, pour ne pas faire exploser le run.

## 5. Pages qu'on ne remplit PAS — on les éteint proprement

Certaines pages du template ne se remplissent pas honnêtement : on les **désactive**, on **supprime la route**,
et on vérifie qu'**aucun lien** ne subsiste. Une page éteinte proprement vaut mieux qu'une coquille.

- **`/deals`** — le composant est **structurellement affilié** (prix barré, « −X% », lien marchand), or le
  modèle EMD est **MENTION**. `niche.deals = { enabled: false }`, **routes `app/(site)/deals/` et
  `app/en/deals/` supprimées**, `'deals'` retiré de `homeSections`. **N'invente JAMAIS une promo.**
- **`/simulateur`** — « cycles de prix » (prix de lancement → décote à la sortie du modèle suivant) ne veut
  rien dire pour la majorité des niches EMD : **assurance, banque, énergie, télécom** sont des abonnements
  (pas de génération produit) ; **beauté, chocolat, alimentaire** sont reconduits en continu. Ça n'a de sens
  que pour un bien durable vendu par générations (tech, électroménager, voiture neuve) — et là encore, ça
  exige des prix datés donc périssables, à rebours d'un site statique.
  → **`simulator.enabled = false` par défaut** (la page fait `notFound()`), et la provision **supprime les
  routes `app/(site)/simulateur/` et `app/en/simulateur/`**. Si le cycle de prix est vraiment pertinent pour
  la niche, l'angle est mieux servi par un **article daté** (« Quand acheter un X ? ») que par une page-outil
  qui prétend être à jour.

## États vides à bannir
Une page clé livrée doit être **remplie** : comparateur avec ≥ 5 items, quiz avec ≥ 3 questions menant à des recos **dans chaque locale**, tableaux non vides, **classement avec ≥ 5 items + sections ≥1000 mots**. Un shell vide (« aucun produit », quiz à 0 question, « aucun classement publié », « revenez bientôt ») = à construire ou à **éteindre** (§5), jamais laissé tel quel en prod. Corollaire : **aucune page vide ne doit figurer au sitemap ni à la nav**, et **aucune page remplie ne doit en être absente**.

## Multilingue
Comparateur/quiz/tableaux/classements disponibles en FR **et** EN (libellés + données), cohérents avec l'i18n du site. Vérifier les **slugs traduits** (légal : `/en/legal-notice`, `/en/privacy`) — un lien de locale non traduit est un 404 silencieux qui ne casse pas le build.
