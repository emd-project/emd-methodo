# Référence — pages clés EMD (comparateur, quiz, tableaux)

Définit ce que doivent contenir les **pages fonctionnelles** d'un site EMD, souvent **vides** sur les sites neufs. Objectif : pages utiles + qui **font surgir des marques** (inventaire de mentions). **Aucune affiliation** : pas de lien affilié, pas de prix-pour-clic, pas de disclaimer affilié. Les « offres/prix » sont des **données factuelles comparatives**, pas des liens monétisés. Un lien sortant éventuel est NEUTRE (`sourceUrl` : source officielle / page de la marque).

## Principe : data-driven, jamais de code risqué
Le builder **remplit des fichiers de DONNÉES** que les **composants du template consomment** — il n'écrit PAS de logique de composant (build-risqué, cf. `references/garde-fous.md`). Les données vivent désormais en JSON :
- **Comparateur** → `content/data/comparateurs.json` (consommé par `lib/comparateur.ts`).
- **/choisir (éditorial)** → `content/data/choisir.json` (consommé par `lib/choisir-content.ts`).
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

## États vides à bannir
Une page clé livrée doit être **remplie** : comparateur avec ≥ 5 items, quiz avec ≥ 3 questions menant à des recos, tableaux non vides. Un shell vide (« aucun produit », quiz à 0 question) = à construire ou à masquer, jamais laissé tel quel en prod.

## Multilingue
Comparateur/quiz/tableaux disponibles en FR **et** EN (libellés + données), cohérents avec l'i18n du site.
