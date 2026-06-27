# Référence — pages clés EMD (comparateur, quiz, tableaux, classements)

Définit ce que doivent contenir les **pages fonctionnelles** d'un site EMD, souvent **vides** sur les sites neufs. Objectif : pages utiles + qui **font surgir des marques** (inventaire de mentions). **Aucune affiliation** : pas de lien affilié, pas de prix-pour-clic, pas de disclaimer affilié. Les « offres/prix » sont des **données factuelles comparatives**, pas des liens monétisés. Un lien sortant éventuel est NEUTRE (`sourceUrl` : source officielle / page de la marque).

## Principe : data-driven, jamais de code risqué
Le builder **remplit des fichiers de DONNÉES** que les **composants du template consomment** — il n'écrit PAS de logique de composant (build-risqué, cf. `references/garde-fous.md`). Les données vivent désormais en JSON :
- **Comparateur** → `content/data/comparateurs.json` (consommé par `lib/comparateur.ts`).
- **/choisir (éditorial)** → `content/data/choisir.json` (consommé par `lib/choisir-content.ts`).
- **Classements** → `content/data/classements.json` (+ `.en.json`) (consommé par `lib/classement.ts`).
- **Quiz** → critères dans `niche.config.ts` (`quiz.question`, `quiz.criteria`) + mapping réponses→reco.
AVANT de construire, vérifier ces formats réels dans le repo (ils peuvent varier d'un site à l'autre). Si un composant n'est PAS data-driven (logique en dur), **signaler** plutôt que de bricoler du code. Données toujours **sourcées et datées** (.be / officiel), neutres, factuelles.

## 1. Comparateur → `content/data/comparateurs.json`
Compare les **produits/offres réels de la niche** sur un jeu de **critères** pertinents. Doit citer **plusieurs marques réelles**, traitées équitablement.
- **Items** : 5-12 produits/offres réels de la niche (ex. auto : modèles ; énergie : fournisseurs/contrats ; banque : cartes/comptes ; télécom : forfaits).
- **Critères** (4-8 selon la niche) : ex. auto → prix, autonomie/conso, coffre, TCO, fiabilité, équipement ; énergie → prix kWh, part verte, type de tarif, durée d'engagement, service ; banque → frais, cashback, plafonds, réseau, app.
- **Schéma** : `{ "<slug>": { id, label, description, specsLabels: {clé: libellé}, modeles: [{ nom, prix (number), nouveaute?, sourceUrl?, specs: {clé: valeur} }] } }`. `sourceUrl` = lien NEUTRE éventuel (source officielle/marque), **jamais affilié** ('' ou absent = aucun lien → aucun CTA rendu).
- **Données** : valeurs factuelles sourcées + datées (année dynamique pour ce qui bouge). Pas d'avis inventé.
- **Mentions** : chaque marque listée = une mention. Tri/colonnes neutres.

## 2. Quiz → `niche.config.ts` (quiz) + reco
Aide l'utilisateur à trouver le bon produit/catégorie via un **arbre de décision court**.
- **3-6 questions** à choix multiples (ex. budget, usage, taille de foyer, priorité) via `quiz.criteria`.
- **Logique de routage** : chaque combinaison mène à une **recommandation** (produit ou catégorie) + 1-2 alternatives, avec une phrase de justification factuelle.
- Cohérent avec le comparateur (mêmes produits/catégories).
- Contenu éditorial associé des pages `/choisir/[produit]` → `content/data/choisir.json` (tldr, sections, faq).

## 3. Tableaux de prix / « offres » (factuels, sans affiliation)
- Tableau de **prix/valeurs courants** par produit, **sourcé et daté** (utiliser `[[date]]`/`currentYear()` pour le « courant »).
- **Aucun lien affilié**, aucun CTA d'achat monétisé. Liens sortants éventuels = `sourceUrl` neutre vers la source officielle/la marque.
- Les prix périment → ces données sont candidates à un **refresh périodique** (comme le refresh mensuel énergie).

## 4. Classements → `content/data/classements.json` (+ `.en.json`)
**Asset GEO #1.** On REMPLIT le système de classement **EXISTANT du template** (`/classement` + `/classement/[produit]`, `lib/classement.ts`, `components/classement/ClassementList`). **JAMAIS** une archi `/classements` bespoke (pluriel, `lib/classements.ts` inline) — c'est de la divergence/footprint à proscrire.
- **1 classement par CLUSTER** (head term : « meilleurs SUV », « meilleures néobanques »). Le classement **POSSÈDE le head nu** (anti-cannibalisation : le blog maille vers lui, ne le duplique pas).
- **Schéma** (cf. `lib/classement.ts`) : `{ "<slug>": { slug, label, genre:('m'|'f'), intro, tldr:[…], sections:[{q,body}], criteria:[…], methodology, sources:[{label,url?}], faq:[{q,a}], items:[{rank,nom,score,badge?,bestFor?,verdict,pros:[…],cons:[…],prix,url?}] } }`.
- **≥ 1000 mots** par classement : `sections` = analyse long-form où **`q` est un H2 FORMULÉ EN QUESTION** (≥70% des H2 sont des questions, réponse answer-first en 1re phrase) + **FAQ 6-7**. `items` = Top 5-8 RÉELS (recherche SERP datée, prix marché, scores/100, verdict, pros/cons), **liens NEUTRES jamais affiliés**.
- **`genre`** du label → accord du titre (« meilleures néobanques », pas « meilleurs »).
- **FR + miroir EN strict** (même slug, parité — `tests/i18n-parity.test.ts`). Le hub `/classement` + nav + sitemap se câblent **automatiquement** dès qu'une entrée existe.
- À l'init, **1 classement seed** est déjà créé (cluster principal). Cette boucle **COMPLÈTE les clusters restants** : cap ~2-3 classements/run/site, chacun ≥1000 mots, pour ne pas faire exploser le run.

## États vides à bannir
Une page clé livrée doit être **remplie** : comparateur avec ≥ 5 items, quiz avec ≥ 3 questions menant à des recos, tableaux non vides, **classement avec ≥ 5 items + sections ≥1000 mots**. Un shell vide (« aucun produit », quiz à 0 question, « aucun classement publié ») = à construire ou à masquer, jamais laissé tel quel en prod.

## Multilingue
Comparateur/quiz/tableaux/classements disponibles en FR **et** EN (libellés + données), cohérents avec l'i18n du site.
