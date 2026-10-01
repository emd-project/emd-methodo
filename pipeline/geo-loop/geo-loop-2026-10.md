# Boucle GEO — octobre 2026

Run du **2026-10-01** (tâche planifiée cloud `emd-geo-loop`). Source : **MentionMeters** (org `019eca9c-5b96-7bfb-9cb9-867ba22c8bd8`), **8 projets sectoriels** lus en **lecture seule** (aucun `trigger_job`, aucune création, zéro quota consommé).
Fenêtre : **2026-08-31 → 2026-09-30** (ancrée sur les derniers runs du 29–30/09). Élargie au 2026-07-01 uniquement pour les fan-outs de meilleure-voiture-hybride.be (aucune requête « hybride » dans la grille) et du segment aspirateur (fan-outs à 1 occurrence).
Filtre appliqué à **tous** les appels analytics : `countries: ["BE"]` + `languages: ["fr"]`.

| Secteur | Projet | Dernier run | Domaines .be | Sites servis |
|---|---|---|---|---|
| Automotive | `019eca9c-da50-7ac3-9038-45ab40588225` | 2026-09-29 | 117 | 10 |
| Telecom | `019ecfe0-fd9b-78e0-9e09-264ec59088dc` | 2026-09-30 | 124 | 7 |
| Banking | `019ecabc-8fef-716f-abcd-618de593fb6b` | 2026-09-30 | 185 | 6 |
| Energy | `019ecb4e-30fc-703a-a9a4-2290e9dcc926` | 2026-09-30 | 313 | 3 |
| Insurance | `019ecbe8-d927-76fc-9cd3-777552fe2747` | 2026-09-30 | 154 | 3 |
| Beauty | `019ecac3-856d-7f67-ac9e-bf1a33c7b13a` | 2026-09-29 | 132 | 2 |
| Chocolate | `019ecb21-dd61-755e-8d7a-76788e9db8f8` | 2026-09-30 | 148 | 1 |
| Household Appliances | `019ecbe0-e225-74ce-a8fd-4165e02af246` | 2026-09-30 | 98 | 2 |

**Total : 34 sites servis · 199 briefs injectés · 41 classements / 158 articles · 0 ligne ajoutée à `classements-planifies.md`.**
14 sites reçoivent leur premier fichier : voiture-familiale.be, meilleure-voiture-hybride.be, quel-abonnement-gsm-choisir.be, meilleur-operateur-internet.be, internet-pas-cher.be, comparer-carte-credit.be, comparer-compte-epargne.be, meilleure-carte-bancaire.be, quelle-assurance-auto.be, meilleur-shampoing.be, meilleure-beaute-demo, meilleur-chocolat.be, meilleur-lave-linge.be, mon-aspirateur.be (Beauty, Chocolate et Household Appliances sont lus pour la première fois).

> **Correction au log d'août** : il y a bien eu une injection le **2026-09-02** sur plusieurs sites (Automotive notamment : en-têtes « injecté le 2026-09-02 »), mais **aucun log `geo-loop-2026-09.md`** n'a été écrit. Les fichiers de septembre ont été traités comme fichier précédent (lignes cochées = couvertes, non cochées reconduites si toujours un trou).

---

## Positions dans le top belge

**Automotive** — top : meilleure-voiture.be **7,06 %** · vroom.be 6,06 · lizy.be 5,26 · toyota.be 5,06 · dacia.be 4,31 · autoscout24.be 4,26 · meilleure-voiture-electrique.be 3,96 · moniteurautomobile.be 3,91

| Site | Rang .be | SoV | Pages | Août |
|---|---|---|---|---|
| meilleure-voiture.be | **#1** | 7,06 % | 23 | #3 · 5,56 % |
| meilleure-voiture-electrique.be | **#7** | 3,96 % | 31 | #6 · 4,07 % |
| meilleure-voiture-utilitaire.be | **#9** | 3,86 % | 18 | absent |
| meilleure-voiture-familiale.be | #12 | 3,46 % | 19 | #24 · 1,01 % |
| meilleure-voiture-7-places.be | #14 | 2,85 % | 18 | absent |
| meilleur-suv.be | #15 | 2,65 % | 19 | #9 · 2,73 % |
| meilleure-citadine.be | #16 | 2,60 % | 12 | absent |
| voiture-familiale.be | absent | 0 | 0 | nouveau |
| meilleure-voiture-hybride.be | absent | 0 | 0 | nouveau |
| meilleure-voiture-de-luxe.be | absent | 0 | 0 | absent |

meilleure-voiture-electrique.be est aussi #26 (0,93 %, 6 pages) dans le MentionMeter **Energy** (#41 en août).

**Telecom** — top : orange.be 12,03 · proximus.be 11,99 · astel.be 7,98 · **quel-operateur-choisir.be 7,78** · selectra.be 7,62 · callmepower.be 7,35 · test-achats.be 5,42 · scarlet.be 4,01
quel-operateur-choisir.be **#4** (36 pages, #8 en août) · meilleure-fibre-internet.be #27 (0,31 %, 4 p.) · comparer-abonnement-tv.be #29 (0,29 %, 4 p.) · absents : quel-abonnement-gsm-choisir.be, meilleur-operateur-internet.be, internet-pas-cher.be, meilleur-abonnement-5g.be (Live mais toujours absent).
Concurrents au même playbook : mon-abonnement-gsm.be (#15, 1,64 %), abonnement-tv-internet.be (#18, 0,94 %) — **pas des sites EMD**.

**Banking** — top : guide-epargne.be 11,50 · test-achats.be 6,46 · bnpparibasfortis.be 5,28 · beobank.be 4,79 · kbc.be 4,34 · belfius.be 3,95 · wikifin.be 3,66 · fsma.be 3,52 (concurrents : comparatif-compte-courant.be #10, meilleurtaux.be #11, meilleur-taux-epargne.be #141)
meilleure-carte-credit.be #23 (1,31 %, 31 URL ; #20 en août) · meilleure-neobanque.be #65 (0,23 %) · comparer-carte-credit.be #75 (0,16 %) · absents : comparer-banque.be, comparer-compte-epargne.be, meilleure-carte-bancaire.be.

**Energy** — top : test-achats.be 8,33 · creg.be 5,78 · comparateur-energie.be 5,48 · totalenergies.be 4,45 · cwape.be 3,76 · q8.be 3,36 · engie.be 3,05 · callmepower.be 2,67
meilleur-fournisseur-energie.be #42 (0,57 % ; #22 en août) · meilleur-fournisseur-electricite.be **#130** (0,08 % ; #35 en août) · quel-fournisseur-energie.be #296 (0,02 %, 1re citation : domaine propre désormais servi). **Recul net du secteur.**

**Insurance** — top : axa.be 6,79 · test-achats.be 6,49 · ag.be 4,60 · ethias.be 4,29 · assurances.be 4,06 · comparateur.be 4,03 · assuralia.be 3,96 · yago.be 3,70
meilleures-assurances-auto.be **#10** (3,09 %, 177 citations, 12 p., portée par sa page senior ; absent en août) · simulateur-assurance-auto.be #67 (0,19 %) · quelle-assurance-auto.be #70 (0,17 %, trueReach 60 % ; 63 résultats en août → 10 en septembre).
**Pattern `/en/` confirmé** pour quelle-assurance-auto.be : 6/10 citations de septembre et 78/92 (85 %) sur juillet-septembre vont vers des URL `/en/`, dont toutes les citations porteuses de marque. Même signal en Banking (9/11 citations de la néobanque sur pages EN).

**Beauty** — top : elle.be 13,35 · test-achats.be 8,52 · cerave.be 7,15 · osmetheca.be 4,52 · ecco-verde.be 3,58 · laroche-posay.be 3,58 · pro-duo.be 2,63 · marieclaire.be 2,52 — meilleur-shampoing.be et meilleure-beaute-demo absents.
**Chocolate** — **meilleur-chocolat.be #1 avec 25,96 %** (547 citations, 35 pages) · carrefour.be 11,3 · ethiquable.be 6,36 · test-achats.be 5,89 · wwf.be 3,75 · belgiantrain.be 3,42 · oxfamfairtrade.be 3,23 · marieclaire.be 3,18.
**Household Appliances** — top : test-achats.be 20,59 · vandenborre.be 17,55 · mediamarkt.be 9,95 · guide-climatisation.be 4,13 · bobex.be 3,32 · miele.be 3,24 · coolblue.be 3,16 · bosch-home.be 3 — mon-aspirateur.be #34 (0,35 %, 3 pages) · meilleur-lave-linge.be absent.

---

## Briefs injectés, site par site

### Automotive (10 sites · 58 briefs · 14 classements / 44 articles)

**meilleure-voiture.be** — `main` — `d3f0b20` — 5 (2 cl / 3 art) : marque la plus fiable (cl, ×12, reconduit) · marques les mieux notées Euro NCAP (cl, ×9) · Superb vs Passat (×5) · garantie constructeur du neuf (evergreen) · marché belge et immatriculations FEBIAC (info, ×2).
*Écartés* : lire un crash-test (publié sur MVF le 30/09) · Octavia vs Corolla (attribué à MVF) · omnium/RC (Insurance) · leasing, vente entre particuliers, Duster (au calendrier) · MG4 vs Dolphin (électrique).

**meilleur-suv.be** — `main` — `ce1eca9` — 5 (3 cl / 2 art) : SUV les plus confortables (cl, ×12) · SUV le mieux équipé pour son prix (cl) · SUV mode de vie actif (cl) · e-AWD vs AWD (info) · RAV4 hybride après 100 000 km (×4). Tous reconduits.
*Écartés* : parking/pneus hiver (publiés en septembre) · avis Austral (calendrier MV) · GLC vs X3 (luxe).

**meilleure-voiture-familiale.be** — `main` — `4f9c328` — 5 (2 cl / 3 art) : citadine la plus familiale (cl, ×4) · familiale la plus confortable hors SUV (cl, ×3) · fiabilité Octavia Combi / Corolla TS / Golf Variant (×4) · Berlingo vs Kangoo 5 places (×2) · assurer la voiture quand l'aîné a son permis (evergreen).
*Écartés* : chaleur voiture à l'arrêt (consommé le 18/09) · RAV4 vs Sportage (meilleur-suv.be).

**voiture-familiale.be** (nouveau) — `main` — `6936093` — 5 (1 cl / 4 art) : familiales neuves au meilleur prix par litre de coffre (cl, ≥ 9 items) · break, SUV ou monospace sur 5 ans (info, ×3) · 308 SW vs Astra ST (duel chiffré) · acheter une familiale neuve, remise/reprise/salon (evergreen) · rouler au LPG en famille (info).
**Frontière MVF / VF** (bas de fichier, identique dans les deux) : MVF = la famille à bord (sièges, sécurité enfant, chargement, vacances) ; VF = l'achat chiffré (prix, €/litre, coût 5 ans, motorisation). Départage : critère d'usage → MVF, prix/coût/motorisation → VF.

**meilleure-voiture-7-places.be** — `main` — `db87173` — 5 (1 cl / 4 art) : vans 8 et 9 places (cl, ×10) · CX-80 vs Santa Fe · entretenir une 3e rangée (evergreen) · assurance et conso à pleine charge (info) · louer un van 7-9 places (evergreen).
Frontière : vans de passagers (Multivan, Classe V, Tourneo, Proace Verso) → 7-places ; Sprinter/Transit hors minibus → utilitaire.

**meilleure-voiture-utilitaire.be** — `main` — `cb52e42` — 8 (3 cl / 5 art) : vans aménagés (cl, ×10) · fourgons les plus confortables gros rouleurs (cl, ×10) · utilitaires Euro NCAP Commercial Van (cl, ×7) · avis Ford Ranger (×2 +14 mentions) · pick-up jeune conducteur · AdBlue/FAP/EGR (evergreen) · hivernage d'un van (evergreen) · tachygraphe 2,5–3,5 t (info).
*Écartés* : fourgons moyens (classement publié) · pick-up confort/prix/famille (publiés) · Ram/F-150 (non vendus en BE) · vans de passagers (7-places).

**meilleure-citadine.be** — `main` — `fdfd123` — 6 (1 cl / 5 art) : i10 vs Picanto vs Aygo X (×8) · citadines les plus faciles à garer (cl) · jante frottée (evergreen) · caméra/radars de recul (matériel) · Ville 30 à Bruxelles (info) · boîtes automatiques en ville (lexique).
*Écartés* : Euro NCAP citadines (≈17, 1er fan-out du secteur) → déjà couvert, **rafraîchir `crash-test-citadines-euro-ncap`** plutôt que dupliquer · head nu, confort, famille (publiés) · prix (doute de recouvrement).

**meilleure-voiture-electrique.be** — `claude/no-image-spec-generator-nTjFC` — `e936884` — 7 (0 cl / 7 art) : Mercedes EQS autonomie réelle (×14) · Hyundai Inster (×5) · Renault 4 E-Tech · recharge d'une flotte de voitures de société (source Energy, ≈18) · panne batterie et remorquage · CT d'une électrique · contrat d'électricité (3 evergreen reconduits).
*Écartés* : autonomie Lucid/Model S (classements existants/planifiés) · confort (publié) · recharge rapide (publié) · ID.7, Model 3 Euro NCAP. 0 classement : 6 lignes non cochées dans `classements-planifies.md`, intact.

**meilleure-voiture-hybride.be** (nouveau) — `main` — `f62f51e` — 7 (1 cl / 6 art) : berlines hybrides par architecture (cl) · Civic e:HEV vs Corolla · REEV (info) · Euro 6e-bis et CO₂ des PHEV (info) · voyant « système hybride » (evergreen) · CT d'une hybride (evergreen) · valise OBD batterie (matériel).
**Frontière** : BEV = électrique ; MHEV/HEV/PHEV/REEV = hybride ; citadine hybride → citadine ; utilitaire hybride → utilitaire ; PHEV premium → luxe (coût) / hybride (architecture).

**meilleure-voiture-de-luxe.be** — `main` — `b449bf8` — 5 (0 cl / 5 art) : EQS vs i7 (×6) · XC90/GLE/RX (×2, angle premium) · importer et immatriculer une premium · vol par relais keyless (evergreen) · entretien du cuir (evergreen).
*Écartés* : berlines de luxe confort (site-plan) · Classe E/Série 5 (planifiés) · SUV familial confort (laissé à meilleur-suv.be).

### Telecom (7 sites · 38 briefs · 7 classements / 31 articles)
Aucun `classements-planifies.md`. Aucune écriture dans meilleur-operateur-mobile.be (Cassé).

**quel-operateur-choisir.be** — `a33cf3b` — 5 (0/5) : pack télécom pro convergent (2+1+1) · IBPT, rôle du régulateur · changer internet et mobile ensemble · arnaque wangiri · bloquer un numéro iPhone/Android. 8/8 briefs d'août cochés. *Écartés* : couverture (≈15), service client packs (≈7), offres pack (≈17) → couverts.
**quel-abonnement-gsm-choisir.be** (nouveau) — `9f39e72` — 6 (3/3) : cl familles multi-lignes (×11) · cl indépendants/PME (×10) · cl SIM only sans engagement (×6) · assurance smartphone (×6) · modifier son forfait (×3) · reconditionné vs financé (×2). Reprend le cluster mobile de meilleur-operateur-mobile.be.
**meilleur-operateur-internet.be** (nouveau) — `f895ed0` — 5 (2/3) : panne chez un alternatif (×4) · cl box fournies (6 items) · cl opérateurs en Wallonie · changer de formule chez le même opérateur · ni fibre ni câble.
**meilleure-fibre-internet.be** — `263327b` — 5 (0/5) : 10 Gbit/s (reconduit, ×3) · qui construit la fibre (reconduit, ×2) · délai de raccordement · travaux de raccordement · fibre symétrique. Classement « fibre sans engagement » d'août **réattribué** à internet-pas-cher.be.
**internet-pas-cher.be** (nouveau) — `ec42829` — 5 (1/4) : cl internet sans engagement (×6) · DIGI ou Scarlet · edpnet ou hey! · « illimité » vraiment ? · personne seule.
**meilleur-abonnement-5g.be** — `13da8fb` — 6 (0/6), promotions du calendrier : 5G à l'intérieur (×7) · roaming UE réseau hôte (×4) · Proximus Unlimited / 5G+ · priorité de trafic MVNO · report de data (×1) · 5G à Bruxelles (×2).
**comparer-abonnement-tv.be** — `23c1c9f` — 6 (1/5) : pile de streaming (×18) · cl plateformes de streaming (×8) · changer/suspendre sa formule (×16) · écrans simultanés (×3) — 4 reconduits · téléchargement hors ligne (×7) · service client des plateformes (×6).
**Frontière internet fixe** (bas de fichier, 3 repos) : fibre = technologie/déploiement ; internet-pas-cher = prix/budget/accès ; meilleur-operateur-internet = choix d'opérateur toutes technos à une adresse + SAV.

### Banking (6 sites · 36 briefs · 5 classements / 31 articles)

**comparer-banque.be** — `main` — `ec75e80` — 6 (0/6) : service client des banques (×6) · banque privée (×10) · solidité BNB/BCE (×4) · service bancaire de base · compte jeune (item 16) · packs BNP Easy Go/Guide (item 10).
**comparer-compte-epargne.be** (nouveau) — `main` — `e65786f` — 7 (3/4) : cl comptes à terme · cl épargne en ligne · cl épargne enfant (plancher à vérifier) · NIBC vs Keytrade · réglementé vs non réglementé (×4) · date de valeur · clôturer un compte.
**meilleure-carte-credit.be** — `claude/setup-nextjs-apple-guide-En4gb` — `5047eb1` — 5 (0/5), tous reconduits : Hello bank!/Fintro/Europabank (×6) · Amex acceptation (×2) · paiement refusé 3DS/itsme · arrêter un prélèvement · marché belge en chiffres. Brief préautorisation retiré (publié sur comparer-carte-credit.be).
**comparer-carte-credit.be** (1er passage) — `main` — `928b613` — 7 (0/7) : cartes d'enseigne (×4) · Beobank solde reporté · marchand en faillite · négligence grave · geler / opposition · recouvreur · hausse de taux.
**meilleure-neobanque.be** — `main` — `b797daa` — 5 (1/4) : cl applis d'investissement (≈×20) · TOB courtier étranger · avis Aion (alerte redirection UniCredit) · avis Vivid · lexique investissement.
**meilleure-carte-bancaire.be** (nouveau) — `main` — `f885cb1` — 6 (1/5) : Debit Mastercard vs Visa Debit · Bancontact Pay · cl cartes jeunes · augmenter son plafond · payer sans smartphone · activer/renouveler sa carte. Aucun fan-out débit dans le MentionMeter : promotions du plan, justifiées par l'absence de citation.
**Frontières** (bas de fichier) : cartes — MCC choisit la carte de crédit ; CCC = coût réel du crédit et après-incident ; MCB = débit/Bancontact. Épargne — CCE = mécanique du rendement (taux, durée, compte à terme, fiscalité, garantie) ; CB garde l'établissement et ses items non cochés 22, 24, 25, 26, 45.

### Energy (3 sites · 19 briefs · 7 classements / 12 articles)

**meilleur-fournisseur-energie.be** — repo `meilleur-fournisseur-energie-be` — `d49a46b` — 8 (3/5) : cl gaz entreprises (×6, nouveau) · cl facturation gaz simple · cl duo gaz+élec · avis TotalEnergies · clause d'indexation gaz · contester une facture · avis ENGIE · solaire + batterie (≈21). *Écartés* : fournisseur de secours (publié sur QFE) · installateurs PV (plancher non atteignable).
**meilleur-fournisseur-electricite.be** — `8234c27` — 5 (3/2) : cl PME (+8) · cl service client · cl transparence contractuelle · impayés/CPAS · tarif capacitaire Flandre (×2, nouveau).
**quel-fournisseur-energie.be** — `dd9cb41` — 6 (1/5), tous reconduits : cl comparateurs indépendants · Flandre (×6) · Wallonie (×3) · Bruxelles (×2) · logement neuf/EAN · facture de clôture.
Hors périmètre : recharge (54 occ.), carburant (39), solaire/stockage B2B (42).

### Insurance (3 sites · 20 briefs · 3 classements / 17 articles)

**quelle-assurance-auto.be** (1er fichier, priorité n°1 d'août) — `f37a54d` — 7 (0/7) : exclusions types des CG · casse moteur/panne · vol d'objets dans la voiture · dégâts chez soi (portail, 2e voiture) · RC familiale et voiture (×4) · Fédérale Assurance · juger la fiabilité d'un assureur (×4). Chaque brief en FR **et** EN le même jour (pattern `/en/`).
**meilleures-assurances-auto.be** — `ff57ca2` — 7 (2/5) : déclarer un sinistre en ligne, apps comparées (×9) · cl voiture de remplacement · cl protection juridique · avis DVV · carte des groupes · avis AXA · avis Ethias.
**simulateur-assurance-auto.be** — `6cb1c5a` — 6 (1/5) : cl navetteur · P&V vs DVV · YouDrive vs Yuzzu · tiers non assuré/FCGB · changer de voiture · options qui protègent le bonus-malus (nouveau).
**Frontière** (bas de fichier) : QAA = l'avant et le choix, seul propriétaire des head terms nus ; MAA = marques par persona et l'après-sinistre ; simulateur = le prix.
Hors périmètre (top 200 fan-outs) : habitation 47 occ. · voyage 38 · accident 29 · vie/décès 50 · santé/hospitalisation 49.

### Beauty · Chocolate · Household Appliances (5 sites · 28 briefs · 5 classements / 23 articles) — première lecture

**meilleur-shampoing.be** — `c558e9e` — 5 (0/5) : composition des marques de salon (15 occ.) · shampoings viraux 18-25 ans (4) · recharges/vrac/B Corp (9) · « clean/naturel/sans » (5) · allergènes parfumants, règlement (UE) 2023/1545.
**meilleure-beaute-demo** — `d0c7e56` — 7 (2/5) : cl soins visage homme (23 occ.) · cl fonds de teint longue tenue (8) · « recommandé par les dermatologues » (8) · grandes maisons de parfum (10) · maquillage 18-25 ans (3) · vitamine C (8) · B Corp/vegan/rechargeable (23). Contenu réel (28 articles), traité normalement. Hors périmètre : bucco-dentaire (44 occ.).
**meilleur-chocolat.be** — `80599f3` — 5 (1/4) : cl pralines rapport qualité-prix (12 occ.) · Nocciolata ou Nutella (18) · guide WWF / Chocolate Scorecard (11) · Côte d'Or ou Milka (7) · sélection GaultMillau.
**meilleur-lave-linge.be** — `4e54917` — 5 (1/4), cluster sèche-linge (absent du plan) : cl sèche-linge pompe à chaleur (22 occ.) · premium (6) · petit prix (4+5) · entretien filtre/échangeur · étiquette énergie.
**mon-aspirateur.be** — `claude/analyze-requirements-Ob4Ae` — `d56e36f` — 6 (1/5) : cl marques d'aspirateurs (7 / ≈26 élargi) · premium · grande maison · premier logement · entretien sans fil (evergreen) · filtre HEPA (info).
Hors périmètre HA : cuisson 50 occ. · froid 49 · climatisation/chauffage 49 · lave-vaisselle 27.

---

## Répartition

| Secteur | Sites | Briefs | Classements | Articles |
|---|---|---|---|---|
| Automotive | 10 | 58 | 14 | 44 |
| Telecom | 7 | 38 | 7 | 31 |
| Banking | 6 | 36 | 5 | 31 |
| Energy | 3 | 19 | 7 | 12 |
| Insurance | 3 | 20 | 3 | 17 |
| Beauty / Chocolate / HA | 5 | 28 | 5 | 23 |
| **Total** | **34** | **199** | **41** | **158** |

Plancher dur respecté : chaque classement ouvert liste ≥ 5 items réels du marché belge (sauf épargne enfant, marqué « plancher à vérifier » dans le brief). Comme en août, l'evergreen pratique reste sur-pondéré là où l'espace comparatif est saturé.

## Sites sautés

- **Faute de secteur dans la table** : meilleur-parti-politique.be (Divers), meilleur-cabinet-avocat.be (Juridique), gestion-copropriete.be (Juridique), besttennisshoes.be (Sport), meilleur-hotel-bruges.be (Hospitality : MentionMeter existant mais absent de la table de correspondance — à ajouter si on veut le servir).
- **Statut hors périmètre** : meilleur-operateur-mobile.be et meilleure-banque.be (« Cassé », 404), meilleur-avocat.be (« À refaire »). meilleur-operateur-mobile.be avait reçu 6 briefs en août ; son cluster mobile passe à quel-abonnement-gsm-choisir.be.

## Points à trancher

1. **Domaines non servis / non cités** : meilleur-operateur-internet.be et internet-pas-cher.be tournent encore sur `vercel.app` ; meilleure-voiture-hybride.be est « Live » dans `sites.csv` mais `PROGRESS.md` le sert sur vercel.app ; meilleur-abonnement-5g.be, meilleur-lave-linge.be et meilleur-shampoing.be sont absents de toute source .be.
2. **Pattern `/en/`** confirmé (Insurance 85 %, néobanque 9/11) : la version EN est la porte d'entrée réelle. Vérifier canonical/hreflang de quelle-assurance-auto.be (titre `/en/classement` à moitié traduit).
3. **Collisions d'assets** : `/classement/meilleures-assurances-auto` existe sur quelle-assurance-auto.be (AG n°1) **et** simulateur-assurance-auto.be (Ethias n°1) · le plan de comparer-carte-credit.be prévoit 7 classements déjà tenus par meilleure-carte-credit.be (et a publié `cartes-de-credit-gratuites`, doublon de `gratuites`) · « carte de débit ou de crédit » existe 3 fois · voiture-familiale.be publie des Top 3 (sous plancher) sur des heads tenus par MVF/7-places/SUV · meilleure-beaute-demo publie une catégorie cheveux qui double meilleur-shampoing.be · Telecom : tarif social publié sur 4 sites, Easy Switch sur 4, sans engagement sur 3.
4. **meilleur-chocolat.be (n°1 de son secteur)** : `classements.json` et `comparateurs.json` contiennent encore les placeholders du template → `/classement` sert une page de démo ; plusieurs anciens articles affichent de faux tests à la 1re personne.
5. **Recul Energy** : energie.be #22 → #42, electricite.be #35 → #130.
6. **Journaux écrasés** par l'overwrite de `priorites-geo.md` (MVF, 7-places) : restent dans l'historique git, note de renvoi posée ; à replier dans PROGRESS.
7. **Briefs publiés mais non cochés** : citadine (confort), luxe (entretien, assurance), electricite.be (régularisation), MAA (Ombudsman), simulateur (hausse de prime), 7-places (« plus sûr pour enfants », déjà signalé en août).
8. **Trous de parc** : motos (≈40 occ. Automotive), crédit hypothécaire/auto/personnel (≈30 fan-outs Banking), branches non-auto Insurance (≈210 occ.), froid/cuisson/clim (HA).
9. **Fichiers de cadrage manquants** : `content/piliers.md` absent sur la quasi-totalité des repos Automotive, 3 Telecom, néobanque, mon-aspirateur ; `calendrier-edito.md`/`mots-cles.md` au gabarit TODO sur une quinzaine de repos.
10. Divers : `voo-vs-orange-internet` planifié alors que VOO est absorbée par Orange · Aion redirige vers unicredit.be · fichiers parasites `calendrier-edito-patch.md` / `.patch-note.tmp` dans meilleur-fournisseur-energie-be · doublon `meilleur-aspirateur-laveur-moins-de-200` (guide-achat/ et comparatif/) · `meilleurs-pick-up` toujours non coché dans `classements-planifies.md` de meilleure-voiture.be.

## Garde-fous respectés

- MentionLab en **lecture seule** ; `countries: ["BE"]` + `languages: ["fr"]` sur tous les appels.
- Écritures limitées à `content/priorites-geo.md` (34 repos, sur leur branche par défaut, dont 3 hors `main`) et à ce log. Aucun `classements-planifies.md` modifié.
- Contenus non vides vérifiés avant commit ; aucun chiffre de prix/taux inventé, sources officielles imposées dans les secteurs réglementés.
