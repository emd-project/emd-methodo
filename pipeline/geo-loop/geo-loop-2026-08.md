# Boucle GEO — août 2026

Run du **2026-08-17**. Source : **MentionMeters** (org `019eca9c-5b96-7bfb-9cb9-867ba22c8bd8`), 5 projets sectoriels lus en **lecture seule** (aucun `trigger_job`, aucune création de projet, zéro quota consommé).

Fenêtre d'analyse : **2026-07-13 → 2026-08-13** (mois glissant ancré sur `get_last_execution_date`).
Filtre appliqué à **tous** les appels analytics : `countries: ["BE"]` + `languages: ["fr"]`.

| Secteur | Projet MentionLab | Dernier run | Réponses | Domaines .be |
|---|---|---|---|---|
| Automotive | `019eca9c-da50-7ac3-9038-45ab40588225` | 2026-08-12 | 2 000 | 160 |
| Telecom | `019ecfe0-fd9b-78e0-9e09-264ec59088dc` | 2026-08-12 | — | 221 |
| Energy | `019ecb4e-30fc-703a-a9a4-2290e9dcc926` | 2026-08-12 | — | 431 |
| Insurance | `019ecbe8-d927-76fc-9cd3-777552fe2747` | 2026-08-12 | — | 350 |
| Banking | `019ecabc-8fef-716f-abcd-618de593fb6b` | 2026-08-12 | — | 355 |

**Total : 21 sites servis · 132 briefs injectés · 31 classements / 101 articles.**

---

## Positions mesurées dans le top belge, par secteur

### Automotive — 160 domaines .be
Top : autoscout24.be 14,81 % · vroom.be 8,24 % · **meilleure-voiture.be 5,56 %** · lizy.be 5,03 % · moniteurautomobile.be 4,41 % · **meilleure-voiture-electrique.be 4,07 %** · myway.be 3,83 % · test-achats.be 3,21 % · **meilleur-suv.be 2,73 %** · gocar.be 2,68 % · touring.be 2,25 % · yago.be 2,01 %

| Site | Rang .be | SoV | Pages citées |
|---|---|---|---|
| meilleure-voiture.be | **#3** | 5,56 % | 11 |
| meilleure-voiture-electrique.be | **#6** | 4,07 % | 17 |
| meilleur-suv.be | **#9** | 2,73 % | 15 |
| meilleure-voiture-familiale.be | #24 | 1,01 % | 1 |
| meilleure-voiture-7-places.be | absent | 0 % | 0 |
| meilleure-voiture-utilitaire.be | absent | 0 % | 0 |
| meilleure-citadine.be | absent | 0 % | 0 |
| meilleure-voiture-de-luxe.be | absent | 0 % | 0 |

### Telecom — 221 domaines .be
Top : selectra.be 13,97 % · orange.be 8,04 % · test-achats.be 7,59 % · astel.be 7,5 % · proximus.be 7,39 % · callmepower.be 7,28 % · comparateur.be 4,55 % · **quel-operateur-choisir.be 3,06 %**

| Site | Rang .be | SoV | Pages citées |
|---|---|---|---|
| quel-operateur-choisir.be | **#8** | 3,06 % | 23 |
| meilleur-operateur-mobile.be | absent | 0 % | 0 |
| meilleur-abonnement-5g.be | absent | 0 % | 0 |
| meilleure-fibre-internet.be | absent | 0 % | 0 |
| comparer-abonnement-tv.be | absent | 0 % | 0 |

### Energy — 431 domaines .be
Top : comparateur-energie.be 5,42 % · creg.be 5,27 % · test-achats.be 4,51 % · selectra.be 3,95 % · callmepower.be 3,69 % · totalenergies.be 3,61 %

| Site | Rang .be | SoV | Pages citées |
|---|---|---|---|
| meilleur-fournisseur-energie.be | #22 | 1,07 % | 7 |
| meilleur-fournisseur-electricite.be | #35 | 0,80 % | 7 |
| quel-fournisseur-energie.be | absent | 0 % | 0 |

À noter : **meilleure-voiture-electrique.be est cité dans le secteur Energy** (#41, 0,67 %, 4 pages) — débordement de franchise sur la recharge, pas exploité ce mois-ci.

### Insurance — 350 domaines .be
Top : selectra.be 5,76 % · axa.be 4,99 % · ag.be 4,89 % · yago.be 4,57 % · test-achats.be 3,95 % · assurance.be 3,54 %

| Site | Rang .be | SoV |
|---|---|---|
| meilleures-assurances-auto.be | absent | 0 % |
| simulateur-assurance-auto.be | absent | 0 % |

**Le seul site EMD cité dans le secteur est `quelle-assurance-auto.be`** (#36, 0,73 %, 63 résultats, 4 pages) — il était au statut « À faire » dans `sites.csv`, donc **hors périmètre de ce run**, alors qu'il est en réalité servi sur son domaine propre et déjà cité. **Corrigé le 2026-08-17 : passé en « Live » avec son URL** (commit `bc5ccce`).

Ses chiffres méritent l'attention : `presence` 75 %, `brandResultCount` 57 sur 63, **`trueReach` 91,18 %** — c'est le meilleur ratio du parc, très au-dessus de meilleure-voiture.be. Autrement dit : quand il est cité, il est cité utilement, avec la marque. Pages captées :

| URL citée | Résultats |
|---|---|
| `/en/classement` | 56 |
| `/` | 6 |
| `/en/comparer/omnium-complete` | 5 |
| `/en/choisir/assurance-rc` | 1 |

**Trois des quatre pages citées sont en `/en/`.** Le site est capté par les LLM majoritairement sur sa version anglaise, pas française — signal à creuser au prochain run (la doctrine FR+EN paie ici, et peut-être plus que prévu).

**Ce site n'a reçu aucun brief ce mois-ci.** C'est le principal manque du run : il faut le traiter en priorité en septembre.

### Banking — 355 domaines .be
Top : guide-epargne.be 9,70 % · beobank.be 5,18 % · test-achats.be 5,04 % · bnpparibasfortis.be 4,11 % · cbc.be 4,02 % · wikifin.be 3,88 %

| Site | Rang .be | SoV | Pages citées |
|---|---|---|---|
| meilleure-carte-credit.be | **#20** | 1,47 % | 30 |
| comparer-banque.be | absent | 0 % | 0 |
| meilleure-neobanque.be | absent | 0 % | 0 |

⚠️ **`meilleur-taux-epargne.be` (#49, 0,43 %, 12 pages) N'EST PAS un site EMD.** Il avait été capté par erreur au premier passage, sur le simple motif de son pattern de nommage (`meilleur-*.be`) ; vérification faite, il n'appartient pas au parc et n'a jamais figuré dans `sites.csv`. **C'est un CONCURRENT — et un concurrent qui applique exactement le même playbook** (domaine exact-match .be, contenu de comparaison, 12 pages citées). Il rejoint la liste des sources à dépasser en Banking, aux côtés de `guide-epargne.be` (#1, 9,70 %) et `comparatif-compte-courant.be` (#8, 2,35 %), qui relèvent de la même famille. Ne pas rouvrir le sujet d'une « intégration au pipeline ».

*Rappel de méthode pour les prochains runs : identifier un site du parc par correspondance de nom est faux. La seule source de vérité est `pipeline/sites.csv`.*

---

## Briefs injectés, site par site

### Automotive (8 sites · 45 briefs · 13 classements / 32 articles)

**meilleure-voiture.be** — main — 5 briefs (1 classement / 4 articles)
Marque la plus fiable en Belgique (classement, fan-out ×4) · Acheter, louer ou leaser (article, ajouté en arbitrage) · Vendre son occasion entre particuliers (evergreen) · Omnium / mini-omnium / RC (evergreen) · Combien de temps garder sa voiture (info).
*Écartés* : berlines confort/abordables/comparatif (5+3+4) → classement `meilleures-berlines` déjà attribué · citadines premier achat + jeune conducteur (6+5) → article publié + classement planifié · citadines RQP/confort/quotidien (5+3+3) → modifieurs de `meilleure-citadine-2026-belgique` · autonomie électrique (3) → article ADAC + classement planifié · tous les fan-outs SUV et familiaux → autres sites · 7 evergreen (rayure, constat, pneus, CT, immatriculation, batterie 12 V, dépannage VE) → piste evergreen du calendrier.
2 lignes ajoutées à `content/classements-planifies.md` (write idempotent, rien supprimé).

**meilleur-suv.be** — main — 6 briefs (3 classements / 3 articles)
SUV le mieux équipé pour son prix (classement, **fan-out ×8, le plus fréquent du secteur**) · SUV les plus confortables (×7) · SUV pour mode de vie actif (×7) · Tracter avec un SUV, B96/BE/MMA (evergreen) · Pneus hiver ou 4 saisons (evergreen) · Ce qu'un SUV coûte vraiment, TMC et taxe (info).
*Écartés* : SUV familiaux budget limité (6) → `meilleur-suv-familial-moins-35000-euros` · SUV 2026 comparatif (5) + familiaux comparatif (3) → piliers tenus · RQP (4+3) → recouvre le brief « mieux équipé » · électriques familiaux (3+2) → article publié · sécurité enfants / fiabilité par marque / occasion → 3 articles publiés en juillet-août.

**meilleure-voiture-familiale.be** — main — 5 briefs (2 classements / 3 articles)
Citadine la plus familiale (classement ×5) · Familiale la plus confortable long trajet **hors SUV** (classement ×6) · Nettoyer un intérieur familial (evergreen) · Panne avec les enfants à bord (evergreen) · Bébé en voiture, cosi et airbag (evergreen).
Le site avait **0 evergreen pratique sur ~31 articles** — le ¼ manquant est ouvert ici.
*Écartés* : berlines familiales (5+4+3) → calendrier #25 · électriques familiales (3+2) → 3 articles + calendrier #39 · catégories de carrosserie (2) → #8/#19/#27 · vans 8 places + Euro NCAP van → 7-places.be · Isofix → #9/#18 · coffre de toit → #29.

**meilleure-voiture-7-places.be** — main — 5 briefs (1 classement / 4 articles)
Meilleur van 8 et 9 places (classement ×5, franchise non tenue en .be) · Voyager à 7, charge utile et bagages (evergreen) · Acheter un 7 places d'occasion, 3e rangée (evergreen) · Entretenir une 3e rangée (evergreen) · Ce que coûte réellement un 7 places (info).
*Écartés* : « Toyota Highlander / Honda CR-V / Kia Carnival » (1) → Carnival non distribué en Belgique et CR-V pas 7 places, brief non ouvrable sans inventer une disponibilité · vans aménagés (3+1) → utilitaire.be · ludospaces (1) → 2 duels publiés · SUV familiaux (6+3) → meilleur-suv.be.
*Détecté* : le brief « Quel 7 places est le plus sûr pour des enfants ? » était resté décoché alors que l'article existe (`suv-7-places/voiture-7-places-la-plus-sure-enfants.mdx`) — signalé dans le fichier.

**meilleure-voiture-utilitaire.be** — main — 6 briefs (2 classements / 4 articles)
Vans aménagés prêts à rouler (classement ×6) · Utilitaires les mieux notés Euro NCAP Commercial Van (classement ×3) · Arrimer et répartir sa charge (evergreen) · Tracter, PTRA / permis BE / code 96 (evergreen) · Borne de recharge au dépôt pour flotte (evergreen) · Homologuer un fourgon en motorhome à la DIV (evergreen).
*Écartés* : pick-up quotidien/confort/familial/RQP (×2) → classement `pick-up` publié + 3 articles · ludospace (×1) → article + classement `fourgonnettes` · Transporter/Transit Custom/Trafic prix (×1) → classement `fourgons-moyens` + duels publiés · Euro NCAP pick-up (×1) → fondu dans le classement sécurité.

**meilleure-citadine.be** — main — 8 briefs (3 classements / 5 articles)
Citadines les moins chères à l'usage (classement, 6+5) · Citadines les plus confortables (classement, 3+2) · Citadines les plus sûres Euro NCAP (classement, 3+2) · Quelle citadine tombe le moins en panne (article) · Occasion, Car-Pass et CT de vente (evergreen) · Pneus hiver / 4 saisons (evergreen) · Assurance jeune conducteur (evergreen) · Rouler en LEZ avec une citadine ancienne (evergreen).
*Écartés* : « comparatif 2026 » (5) + « marché 2026 » (3) → head nu = classement publié `meilleure-citadine` · familiales abordables (5+1) → `guides/meilleure-citadine-pour-une-famille` · jeune conducteur en comparatif (5) → `guides/meilleure-citadine-jeune-conducteur` · conduite quotidienne (3) → absorbé par le classement publié.

**meilleure-voiture-electrique.be** — branche `claude/no-image-spec-generator-nTjFC` — 6 briefs (0 classement / 6 articles)
BMW iX3 Neue Klasse (article) · Hyundai Inster, avis mono-modèle (article) · Panne de batterie et remorquage (evergreen) · Contrôle technique d'une électrique, dont SoH (evergreen) · Quel contrat d'électricité quand on roule électrique (evergreen) · Lire une fiche technique EV, kWh brut/net, WLTP vs EPA (info).
*Écartés* : familiaux (3+2) → classement `meilleures-familles` + 10 articles · autonomie (3) → classement `meilleure-autonomie` · abordables Europe (3) → article + 2 classements planifiés · confort (3+3) → article publié · RQP (3+2) → classement publié · longs trajets (2) → déjà écarté dans `classements-planifies.md` · débutant (1) → article publié · confort EQS/i7/EQE/i5 → transféré au site luxe.
**0 classement ouvert** : les 11 lignes non cochées de `classements-planifies.md` sont toutes attribuées — fichier laissé intact.

**meilleure-voiture-de-luxe.be** — main — 5 briefs (0 classement / 5 articles)
Mercedes EQS vs BMW i7 (face-à-face ×2) · Volvo XC90 / Mercedes GLE / Lexus RX (face-à-face ×1) · Importer et immatriculer une premium, DIV et TMC (evergreen) · Entretien premium, concession vs indépendant (evergreen) · Assurer une voiture de luxe, valeur agréée (evergreen).
*Écartés* : berlines les plus confortables (1) → article `planned` du `site-plan.json` · confort EQE/i5/Ioniq 6 (1) → recouvrement avec le brief EQS vs i7 · 31 articles seed/planned/published déjà attribués.

### Telecom (5 sites · 32 briefs · 6 classements / 26 articles)
Aucun repo ne contenait `content/classements-planifies.md` → classements signalés en `type: classement` dans le brief.

**quel-operateur-choisir.be** — 8 briefs (0 classement / 8 articles) — avis Orange · fusion Telenet/VOO/Wyre · souscrire (délais, frais, rétractation) · pack sans engagement (3+3) · glossaire télécom belge · lire sa facture ligne par ligne (evergreen) · panne internet/TV, les étapes avant d'appeler (evergreen) · le comparateur officiel IBPT et ses angles morts.
**0 classement volontairement** : les 4 classements publiés (mobile, internet, TV, packs) couvrent chaque cluster ; un 5e cannibaliserait un asset.
*Écarté notable* : le brief de juillet « Quel opérateur a le moins de plaintes ? » est **abandonné** — cannibalisé depuis par `meilleur-service-client-operateur-belgique` (26/07) et `proximus-ou-telenet-avis-belgique` (12/08).

**meilleur-operateur-mobile.be** — 6 briefs (3 classements / 3 articles) — quel opérateur capte le mieux (**article**, fan-out ×9 cumulés) · forfait famille (classement) · forfait pro indépendants/PME (classement) · assurance smartphone (classement) · mauvaise réception à la maison, VoWiFi (evergreen) · bloquer le hors-forfait (evergreen).
**Routage important** : la couverture réseau — fan-out n°1 du secteur — est traitée en **article, pas en classement** : la Belgique ne compte que **4 réseaux physiques** (Proximus, Orange, Telenet/BASE, DIGI), le plancher de 5 items réels n'est pas atteignable.
**Créneau vierge** : l'assurance smartphone (4 occurrences) n'est couverte par aucun des 5 sites ni aucun comparateur .be.

**meilleur-abonnement-5g.be** — 6 briefs (1 classement / 5 articles) — couverture 5G commune par commune (7+1) · tester la couverture à son adresse (evergreen) · 5G à la maison vs ligne fixe (3+2+2) · coût réel sur 24 mois (3) · tarif social télécom · 5G data illimitée (classement, qualifié persona).
Les 6 briefs sont des **promotions de lignes non cochées du calendrier** (n° 26, 35, 12+41, 36+40, 43, 17) — aucun sujet neuf ajouté au backlog de 44 lignes.

**meilleure-fibre-internet.be** — 6 briefs (1 classement / 5 articles) — meilleure offre fibre sans engagement (classement, **6× cumulés**) · 10 Gbit/s en Belgique (1) · Wi-Fi lent malgré la fibre (evergreen) · mesurer son vrai débit (evergreen) · panne prolongée, dédommagement (evergreen) · qui construit la fibre (Fiberklaar, Wyre, Unifiber, FastFiber).
*Écarté notable* : « internet professionnel » (2+2) écarté **malgré sa présence au backlog du site** — `meilleur-operateur-internet-independant-pme-belgique` (QOC, 29/07) couvre déjà l'angle SLA + IP fixe + HTVA.

**comparer-abonnement-tv.be** — 6 briefs (1 classement / 5 articles) — plateformes de streaming en Belgique (classement, 3+1) · coût réel d'une pile de streaming (2+2) · changer de formule (evergreen, 2+1) · résilier et rendre son décodeur (evergreen) · écrans simultanés et profils (1+2) · décodeur, location/achat/app (evergreen).
Le **cluster streaming totalise 11 occurrences** et était entièrement vide — plus grosse opportunité non exploitée du périmètre. Site le plus vide du parc (1 article publié).

### Energy (3 sites · 18 briefs · 7 classements / 11 articles)
Aucun `classements-planifies.md` dans les 3 repos.
Frontières arbitrées : **electricite.be** = électricité pure · **energie.be** = multi-fluide et gaz · **quel-fournisseur-energie.be** = intention de choix, procédures, régions.

**meilleur-fournisseur-energie.be** — 6 briefs (2 classements / 4 articles) — fournisseurs gaz à la facturation la plus simple (classement, 4 occ) · offre duo gaz + électricité (classement) · avis TotalEnergies · clause d'indexation du gaz · contester une facture / Service de Médiation (evergreen) · fournisseur de secours en cas de faillite (evergreen).
*Écartés* : gaz prix comparateur (×5) + gaz comparatif (×3) → classement publié `gaz` · gaz service client (×2) + satisfaction (×2) → article publié · élec (×4, ×2) → périmètre electricite.be · solaire (×4+2+2+2+1) et batteries (×2+2) → 2 briefs juillet non cochés **et plancher de 5 installateurs PV réels non atteignable sans invention** · carburant, hydrogène/STEP → hors périmètre.

**meilleur-fournisseur-electricite.be** — 6 briefs (4 classements / 2 articles) — meilleur service client (classement, 5 occ) · les plus transparents sur les conditions (classement, 6 occ) · meilleur pour PME/TPE (classement, 3 occ) · les alternatifs que personne ne compare (classement — Aspiravi, Frank Energie, Elegant, Ebem, Wase Wind, EnergyVision, Trévion : 7 items réels) · facture de régularisation trop élevée (evergreen) · impayés, compteur à budget, CPAS (evergreen).
*Écartés* : élec comparatif (×4) + prix (×2) → classement publié · tarif fixe (×2) → article publié **et** brief juillet non coché · facture claire résidentielle (×2) → trop proche du brief juillet « Comprendre sa facture » (seule la moitié B2B reprise) · verte / garanties d'origine → classement + 4 articles.

**quel-fournisseur-energie.be** — 6 briefs (1 classement / 5 articles), fichier créé — choisir en Wallonie, CompaCWaPE (2 occ) · choisir à Bruxelles, BRUGEL/Brusim (1) · choisir en Flandre, V-test du VREG (1) · les comparateurs belges, lesquels sont indépendants (classement, 8 items) · ouvrir un contrat dans un logement neuf, EAN et mise en service (evergreen) · facture de clôture après changement (evergreen).
Le classement « comparateurs indépendants » attaque frontalement les 5 sources à dépasser, qui cumulent **22,8 % de SoV**.

### Insurance (2 sites · 16 briefs · 3 classements / 13 articles)

**meilleures-assurances-auto.be** — 8 briefs (2 classements / 6 articles) — voiture de remplacement incluse (classement) · protections juridiques auto, DAS/ARAG/LAR (classement) · avis AG · avis Allianz · avis DVV · recours contre son assureur, Ombudsman/FSMA (evergreen) · vérifier l'agrément FSMA (evergreen) · carte des groupes d'assurance belges (info).
*Écartés* : les 4 head terms comparatifs (4+3+2) → article + 4 classements de `classements.json` · gestion des sinistres (3+1) → article publié · senior (2+1) → article publié, volet prime cédé au simulateur · famille (2) → article publié · les 2 fan-outs « France » → hors cible · habitation/voyage/accident familiale (**17 occurrences cumulées**) → hors périmètre, aucun site du run ne porte ces branches.

**simulateur-assurance-auto.be** — 8 briefs (1 classement / 7 articles) — assurances pour navetteur (classement) · P&V vs DVV, vitesse de descente du bonus-malus · Ethias YouDrive vs Yuzzu (télématique) · prime après 65 ans · constat européen case par case (evergreen) · tiers non assuré / délit de fuite, FCGB (evergreen) · vente, remplacement, immobilisation (evergreen) · hausse de prime sans sinistre, indexation et taxes (info).
*Écartés* : head terms nus → propriété de `/classement`, `/comparer`, `/quiz` (règle de `mots-cles.md`) · « Ethias vs AG » et « Belfius Direct vs Yuzzu » → déjà attribués · « récupérer son bonus-malus » → 2 articles + Car@ttest publié le 17/08 sur le site voisin.

**quelle-assurance-auto.be** — **0 brief, site non traité** (statut `sites.csv` erroné au moment du run). Frontière à établir en septembre avec les deux sites ci-dessus avant toute injection : il possède déjà `/classement`, `/comparer/*` et `/choisir/*`, donc les head terms nus lui appartiennent.

### Banking (3 sites · 20 briefs · 2 classements / 18 articles)

**comparer-banque.be** — 7 briefs (1 classement / 6 articles) — comptes à terme (classement) · MeDirect/NIBC/Santander, banques d'épargne sans agence · solidité des banques belges (BNB/BCE) · service client (Test-Achats, Ombudsfin) · garantie des dépôts 100 000 € (evergreen) · débloquer un compte après un décès (evergreen) · service bancaire de base (evergreen).
*Écarté massivement* : **les items 8 à 50 du `calendrier-edito.md` sont non cochés donc attribués** — cela absorbe le **fan-out n°1 du secteur** (6× « meilleurs taux comptes épargne », item 18), toute l'épargne réglementée (3+3+3+1), les comptes courants (3+2 → assets `/classement/banques` et `/comparer/banques`), les frais mensuels (2+1+1), la mobilité bancaire (items 42-47) et la fraude carte (items 41, 49). Premium Europe (4+2) et investissement (2+2) routés vers meilleure-neobanque.be.

**meilleure-carte-credit.be** — branche `claude/setup-nextjs-apple-guide-En4gb` — 6 briefs (0 classement / 6 articles) — Hello bank!/Fintro/Europabank · acceptation réelle d'American Express en Belgique · caution et préautorisation (evergreen) · paiement refusé, 3D Secure/itsme (evergreen) · arrêter un prélèvement récurrent (evergreen) · marché belge de la carte en chiffres (info).
*Écartés* : **les 8 fan-outs cartes sont tous couverts** — comparatif (4) → article + classement `banques-tradi` · frais annuels (2) → classement `gratuites` publié le 12/08 · avantages/cashback/miles (2+1+1) → 3 articles + classement écarté sous plancher · jeunes (1+1) → 2 articles + classement `etudiants` non coché · première carte (1) → article publié. L'evergreen « carte débitée frauduleusement » est un doublon exact de 3 articles publiés. Aucune ligne ajoutée à `classements-planifies.md` : les 10 lignes non cochées restent attribuées.

**meilleure-neobanque.be** — 7 briefs (1 classement / 6 articles) — applications d'investissement accessibles depuis la Belgique (classement, 2×) · régulation FSMA et garantie des investisseurs (2+1) · avis Aion Bank (2×) · avis Vivid (4×) · ouvrir un compte sans se déplacer, itsme (evergreen) · compte bloqué KYC/AML (evergreen) · emprunter avec un IBAN étranger (evergreen, 3×).
*Écartés* : premium Europe en head nu (4) → article publié · comptes courants mobiles (1+2) → article + brief non coché · jeunes (1) → 2 articles · garantie des dépôts (1+2) → article publié · taux d'épargne réglementée (6) → frontière comparer-banque.be.

---

## Arbitrages anti-cannibalisation inter-sites (post-vérification)

Deux collisions détectées à la vérification finale et **corrigées avant clôture du run** :

1. **Classement « vans 8 et 9 places »** ouvert en double sur `meilleure-voiture-7-places.be` (brief 1) et `meilleure-voiture-utilitaire.be` (brief 2), même inventaire, même fan-out compté différemment (5 vs 2 occurrences), chaque bloc anti-cannibalisation ignorant l'autre site.
   → **Retiré de utilitaire.be, conservé sur 7-places.be.** Motif : le transport de passagers par nombre de places est la franchise de 7-places.be ; utilitaire.be garde le van de loisir (aménagé) et le van de métier (tôlé). Frontière écrite dans les deux fichiers.

2. **Classement « Meilleur pick-up en Belgique »** ouvert sur `meilleure-voiture.be` avec une justification **fausse** (« aucun site EMD ne couvre le pick-up ») : `meilleure-voiture-utilitaire.be` publie déjà un classement `pick-up` et trois articles pick-up.
   → **Retiré de meilleure-voiture.be**, remplacé par « Acheter, louer ou prendre en leasing sa voiture en Belgique », adossé au constat que lizy.be (#4, 5,03 %) et myway.be (#7, 3,83 %) captent le canal d'acquisition sans que le site ait la moindre page dessus.

Chiffres du log post-correction : **132 briefs** (133 écrits, 1 retiré net), **31 classements / 101 articles**.

## Répartition obtenue

| Secteur | Briefs | Classements | Articles |
|---|---|---|---|
| Automotive | 46 | 12 | 34 |
| Telecom | 32 | 6 | 26 |
| Energy | 18 | 7 | 11 |
| Insurance | 16 | 3 | 13 |
| Banking | 20 | 2 | 18 |
| **Total** | **132** | **31** | **101** |

Répartition doctrinale (½ marques-modèles · ¼ evergreen pratique · ¼ informationnel) : l'**evergreen pratique est volontairement sur-pondéré** sur la majorité des sites. Motif constant d'un secteur à l'autre : l'espace comparatif est saturé (les head terms de segment sont publiés ou déjà attribués), plusieurs sites étaient à **0 ou 1 article procédural**, et c'est le format que les LLM citent le plus volontiers. Les fan-outs restants pointaient massivement vers des pages existantes.

**5 sites ouvrent zéro classement** (meilleure-voiture-electrique.be, meilleure-voiture-de-luxe.be, quel-operateur-choisir.be, meilleure-carte-credit.be, et de facto simulateur au minimum) — chacun le justifie par un stock de classements déjà publiés ou planifiés. Conforme au plancher dur : chaque classement ouvert tient **≥ 5 items réels crédibles sur le marché belge** (7 à 9 listés par brief). Un cas explicitement refusé pour plancher non atteignable : la couverture réseau mobile (4 réseaux physiques en Belgique) et les installateurs photovoltaïques.

## Sites sautés

**Aucun site sauté faute de secteur correspondant.** Les 21 sites qui étaient « Live » ou « Configuré » dans `pipeline/sites.csv` au moment du run sont tous couverts par un des 5 MentionMeters lus.

**Un site manqué pour cause de statut erroné** : `quelle-assurance-auto.be`, marqué « À faire » alors qu'il est servi et cité. Corrigé dans `sites.csv` le 2026-08-17 ; il portera le périmètre Insurance à 3 sites au prochain run.

Secteurs disponibles mais non lus ce mois-ci faute de site actif : Beauty, Chocolate, Household Appliances, Hospitality, Multimedia, Luxe, et les 10 autres MentionMeters de l'organisation.

## Points à trancher pour le prochain run

- **`quelle-assurance-auto.be` est la priorité n°1 de septembre.** Reclassé « Live » le 2026-08-17, il n'a reçu aucun brief ce mois-ci alors qu'il affiche le meilleur `trueReach` du parc (91,18 %) et 57 résultats de marque sur 63. Deux questions à trancher avant injection : (a) la frontière avec `meilleures-assurances-auto.be` et `simulateur-assurance-auto.be`, qui se recoupent fortement — il possède déjà `/classement`, `/comparer/*` et `/choisir/*` ; (b) **pourquoi 3 de ses 4 pages citées sont-elles en `/en/`** et pas en français, alors que le filtre du run est `languages: ["fr"]`. Si le pattern se confirme, il change la priorisation FR/EN de toute la doctrine.
- **`meilleur-taux-epargne.be` n'est pas à nous** — concurrent appliquant le même playbook, à traiter comme source à dépasser en Banking, avec `guide-epargne.be` et `comparatif-compte-courant.be`. Voir l'avertissement en section Banking.
- **9 sites sur 21 sont servis depuis une URL `vercel.app`** (statut « Configuré ») : quel-fournisseur-energie.be, meilleure-citadine.be, meilleure-voiture-de-luxe.be, meilleur-operateur-mobile.be, meilleur-abonnement-5g.be, meilleure-fibre-internet.be, comparer-abonnement-tv.be, comparer-banque.be, meilleure-neobanque.be. **Tant que le domaine propre n'est pas servi, aucune citation ne leur sera attribuée** et leurs 58 briefs n'auront aucun effet mesurable. La bascule DNS est le prérequis n°1 du parc.
- **meilleure-voiture-electrique.be déborde sur le secteur Energy** (#41, 0,67 %) : envisager de lire les deux MentionMeters pour ce site au prochain run.
- Dettes signalées, non corrigées (hors périmètre d'écriture) : `comparer-abonnement-tv.be/content/data/comparateurs.json` contient deux clés identiques (`abonnement-tv` et `operateurs`) · l'item 31 du calendrier de comparer-banque.be fait doublon avec une page publiée sur meilleure-neobanque.be · le brief « 7 places le plus sûr pour des enfants » est décoché alors que l'article existe.
- Les 5 fichiers Telecom placent le contexte mesuré en commentaire de bas de fichier au lieu d'un paragraphe d'en-tête — divergence de format avec les 16 autres, non bloquante.

## Garde-fous respectés

- MentionLab en **lecture seule** : aucun `trigger_job`, aucune création de projet, aucun quota consommé.
- `countries: ["BE"]` + `languages: ["fr"]` sur **tous** les appels analytics.
- Écritures limitées à `content/priorites-geo.md` (21 repos, tous sur leur branche par défaut — dont 2 hors `main`) et `content/classements-planifies.md` (1 repo, ajout idempotent, aucune suppression), plus ce log et la correction de statut dans `pipeline/sites.csv` (demandée explicitement après le run).
- Contenu vérifié non vide avant chaque commit : **21/21 fichiers présents, 6 479 à 10 480 octets, aucun brief incomplet, aucune case pré-cochée, aucun en-tête d'un autre mois.**
- Aucun chiffre inventé : les briefs des secteurs réglementés (Banking, Insurance, Energy) imposent des sources officielles datées (FSMA, BNB, Assuralia, Ombudsman/Ombudsfin, Wikifin, Febelfin, CREG/CWaPE/BRUGEL/VREG, IBPT, SPF).
