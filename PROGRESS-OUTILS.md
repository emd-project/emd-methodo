# PROGRESS-OUTILS — file des calculateurs EMD

Journal de la tâche planifiée `emd-outils-calculateurs` (1 calculateur par run).
Règle : prendre **le premier outil non coché**, le cocher en fin de run avec la date.
Un outil infaisable est marqué `- [!] … écarté le AAAA-MM-JJ (raison)` et **jamais réévalué**.

## File des outils, par ordre de priorité

- [x] **quel-fournisseur-energie.be — Convertisseur m³ de gaz en kWh** — fait le 2026-08-18
- [ ] **simulateur-assurance-auto.be — Déclarer ou payer de sa poche** (montant du dégât, franchise, degré bonus-malus, prime annuelle → coût immédiat des deux options, surcoût de prime cumulé sur 5 ans, seuil de bascule)
- [ ] **meilleure-fibre-internet.be — Débit en temps de téléchargement** (débit Mb/s, taille du fichier → temps réel + tableau de correspondance + conversion Mb/s ↔ Mo/s)
- [ ] **meilleure-voiture.be — TMC et taxe de circulation par région** (région, puissance fiscale ou kW, cylindrée, motorisation, norme, âge → TMC estimée et taxe annuelle pour les trois régions côte à côte)
- [ ] **comparer-carte-credit.be — Coût d'un solde reporté** (montant, TAEG, mensualité → durée de remboursement, intérêts totaux, coût total)
- [ ] **comparer-banque.be — Rendement réel d'un compte d'épargne** (montant, versements mensuels, taux de base, prime de fidélité, plafond mensuel → intérêts réels après plafond et condition d'ancienneté)
- [ ] **comparer-abonnement-tv.be — Coût réel sur 24 mois** (prix promo, durée de la promo, tarif hors promo, frais d'activation → coût total 12 et 24 mois, moyenne mensuelle réelle)
- [ ] **quel-fournisseur-energie.be — Coût annuel de chauffage par énergie** (surface ou consommation, type de logement, énergie → coût annuel comparé gaz / électricité / mazout / PAC, prix belges datés)
- [ ] **meilleur-fournisseur-electricite.be — Combien me coûte cet appareil** (puissance en watts, heures d'usage, prix du kWh, mono ou bihoraire → coût journalier, mensuel, annuel, gain en heures creuses)
- [ ] **simulateur-assurance-auto.be — Franchise haute ou basse** (écart de prime, écart de franchise, fréquence de sinistre estimée → point de bascule et recommandation chiffrée)

---

## Journal des runs

### 2026-08-18 — quel-fournisseur-energie.be · Convertisseur m³ de gaz ⇄ kWh

- **Slugs** : FR `/blog/gaz/conversion-m3-gaz-en-kwh-belgique` · EN `/en/blog/gaz/convert-gas-m3-to-kwh-belgium` · paire ajoutée à `lib/i18n/article-slugs.ts`
- **Head term Cuik** : « conversion m3 gaz en kwh » — BE 260/mois, FR 590/mois (`language_id 1002`, `location_ids 2056` puis `2250`). Grappe exploitée : convertisseur m3 gaz en kwh (BE 70 / FR 110), conversion kwh en m3 gaz (260/590), combien de kwh dans 1 m3 de gaz (10/40), coefficient de conversion gaz (10/140), pouvoir calorifique gaz naturel kwh m3 (10/110), compteur gaz m3 ou kwh.
- **Composant** : `components/blog/GasConverter.tsx`, îlot `'use client'` calqué sur `FaqAccordion` (useState, inline styles sur variables CSS, zéro dépendance, zéro réseau, zéro stockage). Enregistré dans la map MDX de `components/article/ArticleView.tsx` avec injection de `locale`. Libellés FR + EN embarqués dans le composant (aucune clé ajoutée à `lib/i18n`, aucun risque sur `tests/i18n-parity.test.ts`).
- **Sources des coefficients** (toutes consultées le 2026-08-18) :
  - CREG, « Conversion du m³ de gaz en kWh » → 11,6 kWh/m³ (gaz H) et 10,3 kWh/m³ (gaz L) ; coefficient de facture = moyenne des 12 coefficients mensuels ; variation par station de réception agrégée (SRA).
  - ORES, « Le pouvoir calorifique du gaz » → PCS de 10,81 à 12,79 kWh/m³(n) ; gaz pauvre distribué jusqu'au 1er septembre 2024 seulement.
  - CWaPE, « À combien de kWh correspond 1 m³ de gaz ? » (page modifiée le 2025-12-11) → fourchette 10 à 12 kWh/m³.
  - Brugel, « La conversion des réseaux de gaz » + CWaPE, phase de conversion L→H à partir du 2024-06-01.
  - Sibelga, open data « Pouvoir calorifique supérieur du gaz » par SRA (Bruxelles).
  - Prix par défaut : 0,11 €/kWh tout compris TVAC et 0,06 €/kWh composante énergie seule — ordres de grandeur du marché belge relevés en août 2026. **Champs modifiables**, mode de prix explicite dans l'interface.
- **Cas de vérification (calculés à la main puis en JS)** :
  1. 1 250 m³ × 11,6 = **14 500 kWh** ; × 0,11 € = **1 595,00 €** ; 85 % du profil D3a. Contre-épreuve gaz pauvre : 1 250 × 10,3 = **12 875 kWh**.
  2. Sens inverse : 17 000 kWh ÷ 11,6 = **1 465,5 m³** ; × 0,11 € = **1 870,00 €**.
  3. Contrôle croisé sur l'exemple publié par la CREG elle-même : 1 500 × 11,6 = **17 400 kWh** — identique au régulateur.
- **Anti-cannibalisation** : l'article `consommation-moyenne-gaz-belgique` garde la requête « consommation moyenne gaz » ; le nouvel article prend « conversion m3 gaz en kwh ». Maillage croisé posé entre les deux, plus comparateur et classement.
- **Volume** : 2 108 mots FR, 1 906 mots EN, hors interface de l'outil. 9 H2 sur 9 en question stricte.
- **Commits** : `32ca450` (composant), `fd53129` (mapping i18n), `2a49f98` (enregistrement MDX), `809d120` (articles FR + EN), branche `main`.
- **Non fait** : pas de JSON-LD `HowTo`. `ArticleView` émet déjà `Article` + `BreadcrumbList` + `FAQPage` ; ajouter `HowTo` imposerait un champ de frontmatter et une modification du type `ArticleMeta` dans `lib/blog.ts`, hors périmètre d'un run outil. À traiter comme un chantier transverse si le besoin se confirme sur les prochains calculateurs.
