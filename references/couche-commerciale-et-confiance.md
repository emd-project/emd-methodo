# Couche commerciale et confiance

Référence pour la V2 du projet EMD. Rédigée le 6 octobre 2026 à partir de l'observation de besttennisshoes.be (accueil, classement général, fiche Nike Vapor 12).

## Constat de départ

Constat de Mathias : besttennisshoes.be performe très bien parce que Google croit que le site vend des produits (liens vers les sites marchands et Amazon, schema.org, etc.). Les sites purement informationnels, sans ce côté produit, performent plus difficilement. La V2 doit donc prévoir des éléments de CTA et de CRO inspirés de ce site, et tout ce qui aide Google à faire confiance aux sites.

Statut : hypothèse forte, pas encore isolée. Ce site a aussi reçu plus de travail que les autres (six classements thématiques, métas écrites à la main, trois runs de rédaction par jour). Test à faire : ajouter la couche produit à deux ou trois sites informationnels existants et comparer leur évolution.

## Ce que besttennisshoes.be fait

- Produit vedette dès l'accueil : note sur 10, prix indicatif, bouton « Voir chez Tennis-Point ».
- Plusieurs marchands par produit : quatre sur la fiche Vapor 12 (Tennis-Point, Passasports, Nike.com, TennisDirect), Amazon.com.be sur l'accueil.
- Prix situés et datés : « moyenne relevée en Belgique entre juin et septembre 2026 », plus un coût par heure de jeu.
- Notation décomposée : cinq critères chiffrés (durabilité, accroche, confort, stabilité, légèreté) qui donnent la note globale, méthode expliquée.
- Outils de choix : quiz en 30 secondes, comparateur, face-à-face de la semaine, entrées par profil (petit budget, confort, semelle qui dure).
- Signaux de sérieux : auteur avec sa page, date de mise à jour, sources citées, mention « liens directs vers les marchands, sans commission ».
- Classement : top 10 avec pour et contre, tableau récapitulatif (modèle, note, prix, meilleur pour), FAQ, onglets vers six classements thématiques.

## Blocs à intégrer au moteur commun

1. Carte produit : note, prix indicatif daté, « meilleur pour », bouton marchand.
2. Bloc « où acheter » : deux à quatre marchands, priorité aux enseignes locales du marché visé.
3. Tableau comparatif en haut des classements, un bouton par ligne.
4. Grille de notation par critères, identique sur fiches et classements.
5. Quiz et comparateur, alimentés par les mêmes données produits.
6. Rappel du choix n° 1 en fin d'article et en bandeau fixe sur mobile.
7. Entrées par profil et par budget sur l'accueil.
8. Données structurées générées depuis les données, jamais écrites à la main : `Product` avec `Review`, `ItemList` sur les classements, `FAQPage`, `BreadcrumbList`, `Article` avec auteur, `Organization`.

Prérequis : une base produits par site (modèle, caractéristiques, prix, liens marchands vérifiés). Elle devient une étape de l'assistant de création.

## Ce qui construit la confiance de Google

- Les consignes de Google sur les avis produits demandent des mesures chiffrées, des comparaisons entre modèles et des liens vers plusieurs vendeurs. Le site les suit, et c'est sans doute autant cela que l'aspect « boutique » qui joue.
- Balisage strictement égal au visible : même prix, même note que sur la page. Pas d'`AggregateRating` sans vrais avis d'utilisateurs.
- Fraîcheur réelle : date de mise à jour, prix relevés à nouveau et liens marchands testés par une tâche planifiée. Un lien mort ou un prix périmé détruit le signal.
- Pages d'identité : à propos, méthode de test, contact, mentions légales, politique sur les liens.
- Honnêteté sur la méthode : le site dit compiler données fabricants et tests tiers. Garder cette formulation, ne jamais écrire « nous avons testé » si ce n'est pas le cas.
- Auteur vérifiable : une page auteur ne pèse que si la personne existe et se retrouve ailleurs.
- Aucun prix inventé : un prix absent reste absent, il n'est pas estimé.

## Adaptation aux niches sans produit physique

| Niche | Équivalent du produit | Bouton | Balisage |
|---|---|---|---|
| Banque, crédit, assurance | Offre avec taux et frais datés | « Voir l'offre chez [banque] » | `FinancialProduct` |
| Énergie, télécom | Tarif ou abonnement, simulateur | « Voir le tarif chez [fournisseur] » | `Service` avec `Offer` |
| Avocats, hôtels, restaurants | Fiche établissement | « Contacter », « Réserver » | `LegalService`, `Hotel`, `Restaurant` |

Principe commun : chaque page mène à une action chez un tiers identifié, avec une donnée chiffrée et datée.

## À vérifier

- Le balisage schema.org réellement émis par besttennisshoes.be n'a pas été contrôlé (l'outil de lecture ne remonte pas le JSON-LD). À passer au test des résultats enrichis de Google.
- La page de classement renvoie vers « la fiche officielle » du fabricant, alors que la fiche produit renvoie vers les marchands. À harmoniser si le lien marchand est bien le signal recherché.

## Voir aussi

- Convention des liens produits de beste-waterdispenser.be : composant `ProductLinks`, un bloc, trois liens maximum, URL vérifiées à l'exécution (`ops/taches-planifiees/`, section 8 des instructions de la tâche de rédaction).
