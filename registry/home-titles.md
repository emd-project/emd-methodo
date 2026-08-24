# Titres de page d'accueil — registre des valeurs décidées

<!--
Registre CENTRAL, au même titre que da-registry.json et voice-registry.json.
Il vit ici et n'est JAMAIS copié dans un fork : un fork le lit à distance.

Lu à l'init par le skill `copywriter` (emd-template, .claude/skills/copywriter).

RÈGLE D'USAGE, dans cet ordre :
1. Le domaine figure au tableau  → prends le titre TEL QUEL. Il est décidé, pas
   à réinventer. Une variation « améliorée » recrée exactement la dispersion
   que ce fichier existe pour empêcher.
2. Le domaine n'y figure PAS     → applique les règles ci-dessous, puis AJOUTE
   ta ligne au tableau dans le même run.

⚠️ dans la colonne « repo » = domaine prévu, repo pas encore créé. Le titre est
arrêté d'avance : le jour où le site sort, il n'y a rien à décider.
-->

## Les règles

**Format** — `Nom du site - Promesse`. Séparateur : **espace, tiret simple, espace**. Jamais de pipe, jamais de tiret cadratin, jamais de deux-points.

**Longueur — 60 caractères maximum**, viser 50-58. Au-delà, Google tronque. Un titre est déjà sorti à 67 et a dû être ramené à 56.

**Le nom est normalisé, pas transcrit du domaine.** `meilleures-assurances-auto.be` donne « Meilleure Assurance Auto » — au singulier. `meilleure-voiture-utilitaire.be` donne « Voiture Utilitaire » — le superlatif saute quand il alourdit la ligne. On garde ce qui se lit, on jette la redondance.

**La promesse est concrète : ce qu'on trouve, ou ce qu'on y gagne.** Jamais une posture éditoriale. Proscrits : « le comparateur indépendant », « votre guide neutre », « tout savoir sur », « votre référence », « le site de référence ».

**Deux registres, à alterner** — sinon trente sites ouvrent tous sur « Trouver » :

- **bénéfice** — « Trouver la banque la moins chère », « Réduire votre facture », « Estimer votre prime en 2 minutes »
- **facettes** — trois items, `&` avant le dernier : « Coffre, sièges & budget », « Autonomie, primes & recharge »

**`&` plutôt que « et »** dans les listes : deux caractères gagnés, et ça se lit mieux serré.

**Jamais d'année. Jamais le nom du site répété dans la promesse.**

**La locale secondaire écrit son propre titre**, elle ne traduit pas le français. Un titre anglais se construit avec ses mots et sa longueur à lui.

---

## Automobile

| Repo | Titre |
|---|---|
| `meilleure-voiture-de-luxe.be` | Meilleure Voiture de Luxe - Assurance, décote & entretien |
| `meilleure-voiture.be` | Meilleure Voiture - Trouver la voiture faite pour vous |
| `meilleur-suv.be` | Meilleur SUV - Trouver le SUV adapté à vos besoins |
| `meilleure-citadine.be` | Meilleure Citadine - Trouver la petite voiture idéale |
| `meilleure-voiture-familiale.be` | Meilleure Voiture Familiale - Coffre, sièges & budget |
| `voiture-familiale.be` | Voiture Familiale - Trouver la voiture pour votre famille |
| `meilleure-voiture-7-places.be` | Voiture 7 Places - Trouver la 7 places qui vous convient |
| `meilleure-voiture-utilitaire.be` | Voiture Utilitaire - Trouver l'utilitaire fait pour vous |
| `meilleure-voiture-hybride.be` ⚠️ | Meilleure Voiture Hybride - Consommation, prix & fiscalité |
| `meilleure-voiture-electrique` ⚠️ | Meilleure Voiture Électrique - Autonomie, primes & recharge |

## Assurance

| Repo | Titre |
|---|---|
| `quelle-assurance-auto.be` | Quelle Assurance Auto - Trouver la bonne assurance au bon prix |
| `meilleures-assurances-auto.be` | Meilleure Assurance Auto - Comparer les meilleures offres |
| `simulateur-assurance-auto.be` | Simulateur Assurance Auto - Estimer votre prime en 2 minutes |

## Banque & finance

| Repo | Titre |
|---|---|
| `meilleure-banque.be` | Meilleure Banque - Trouver la banque la moins chère |
| `comparer-banque.be` | Comparer Banque - Trouver la banque pour vos besoins |
| `meilleure-neobanque.be` | Meilleure Néobanque - Trouver la néobanque faite pour vous |
| `meilleure-carte-credit.be` | Meilleure Carte Crédit - Trouver la carte faite pour vous |
| `comparer-carte-credit.be` | Comparer Carte Crédit - Cotisation, taux & avantages |
| `comparer-compte-epargne.be` | Comparer Épargne - Trouver le compte qui rapporte le plus |

## Télécom

| Repo | Titre |
|---|---|
| `meilleur-operateur-mobile.be` | Meilleur Opérateur Mobile - Trouver l'opérateur fait pour vous |
| `quel-operateur-choisir.be` | Quel Opérateur Choisir - TV, mobile & internet comparés |
| `quel-abonnement-gsm-choisir.be` | Quel Abonnement GSM Choisir - Trouver le forfait au bon prix |
| `meilleur-abonnement-5g.be` | Meilleur Abonnement 5G - Trouver le forfait 5G le moins cher |
| `meilleure-fibre-internet.be` | Meilleure Fibre Internet - Trouver la fibre la plus rapide |
| `comparer-abonnement-tv.be` | Comparer Abonnement TV - Chaînes, prix & options comparés |
| `internet-pas-cher.be` ⚠️ | Internet Pas Cher - Trouver l'abonnement le moins cher |

## Énergie

| Repo | Titre |
|---|---|
| `meilleur-fournisseur-energie.be` | Meilleur Fournisseur Énergie - Réduire votre facture |
| `meilleur-fournisseur-electricite.be` | Meilleur Fournisseur Électricité - Payer moins chaque mois |
| `quel-fournisseur-energie.be` | Quel Fournisseur Énergie - Trouver l'offre gaz & électricité |

## Autres

| Repo | Titre |
|---|---|
| `www.meilleur-chocolat.be` | Meilleur Chocolat - Pralines, chocolatiers & adresses |
| `meilleur-parti-politique` | Meilleur Parti Politique - Le parti qui vous ressemble |
| `meilleure-beaute-demo` | Édito Beauté - Soins, cheveux, maquillage & parfum |
| `mon-aspirateur-be` ⚠️ | Mon Aspirateur - Trouver l'aspirateur fait pour vous |

---

## Notes de rédaction

« **décote** » s'écrit sans accent circonflexe.

« Simulateur Assurance Auto - Estimer votre prime en 2 minutes » fait **exactement 60 caractères** : c'est la limite dure, pas la cible. Ne t'en sers pas comme modèle de longueur.

Le compte de caractères porte sur la **chaîne complète**, espaces et séparateur inclus.
