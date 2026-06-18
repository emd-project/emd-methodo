# Référence — pages clés EMD (comparateur, quiz, tableaux)

Définit ce que doivent contenir les **pages fonctionnelles** d'un site EMD, souvent **vides** sur les sites neufs. Objectif : pages utiles + qui **font surgir des marques** (inventaire de mentions). **Aucune affiliation** : pas de lien affilié, pas de prix-pour-clic, pas de disclaimer affilié. Les « offres/prix » sont des **données factuelles comparatives**, pas des liens monétisés.

## Principe : data-driven, jamais du code risqué
Le builder **remplit des données** (fichiers de data / config) que les **composants du template consomment** — il n'écrit pas de logique de composant. AVANT de construire, vérifier que les composants comparateur/quiz du site sont bien **data-driven** ; s'ils ne le sont pas (logique en dur, pas de source de données), **signaler** plutôt que de bricoler du code (build-risqué). Données toujours **sourcées et datées** (.be / officiel), neutres, factuelles.

## 1. Comparateur
Compare les **produits/offres réels de la niche** sur un jeu de **critères** pertinents. Doit citer **plusieurs marques réelles**, traitées équitablement.
- **Items** : 5-12 produits/offres réels de la niche (ex. auto : modèles ; énergie : fournisseurs/contrats ; banque : cartes/comptes ; télécom : forfaits).
- **Critères** (4-8 selon la niche) : ex. auto → prix, autonomie/conso, coffre, TCO, fiabilité, équipement ; énergie → prix kWh, part verte, type de tarif, durée d'engagement, service ; banque → frais, cashback, plafonds, réseau, app.
- **Données** : valeurs factuelles sourcées + datées (année dynamique pour ce qui bouge). Pas d'avis inventé.
- **Sortie** : alimenter le fichier de données du comparateur du template (trouver son format réel : `lib/…`/`content/…`/`data/…`).
- **Mentions** : chaque marque listée = une mention. Tri/colonnes neutres.

## 2. Quiz
Aide l'utilisateur à trouver le bon produit/catégorie via un **arbre de décision court**.
- **3-6 questions** à choix multiples (ex. budget, usage, taille de foyer, priorité).
- **Logique de routage** : chaque combinaison mène à une **recommandation** (produit ou catégorie) + 1-2 alternatives, avec une phrase de justification factuelle.
- **Sortie** : alimenter la structure de données du quiz du template (questions + mapping réponses→reco).
- Cohérent avec le comparateur (mêmes produits/catégories).

## 3. Tableaux de prix / « offres » (factuels, sans affiliation)
- Tableau de **prix/valeurs courants** par produit, **sourcé et daté** (utiliser `[[date]]`/`currentYear()` pour le « courant »).
- **Aucun lien affilié**, aucun CTA d'achat monétisé. Liens sortants éventuels = vers la source officielle/la marque, neutres.
- Les prix périment → ces données sont candidates à un **refresh périodique** (comme le refresh mensuel énergie).

## États vides à bannir
Une page clé livrée doit être **remplie** : comparateur avec ≥ 5 items, quiz avec ≥ 3 questions menant à des recos, tableaux non vides. Un shell vide (« aucun produit », quiz à 0 question) = à construire ou à masquer, jamais laissé tel quel en prod.

## Multilingue
Comparateur/quiz/tableaux disponibles en FR **et** EN (libellés + données), cohérents avec l'i18n du site.
