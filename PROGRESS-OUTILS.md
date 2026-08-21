# PROGRESS-OUTILS — calculateurs et simulateurs EMD

Fichier unique : il porte **la file** (lignes non cochées) **et le journal** (lignes cochées). Consommé par la tâche planifiée `emd-outils-calculateurs`, un outil par semaine, le mercredi.

**Conventions.**
`- [ ]` en file · `- [x] … · publié le AAAA-MM-JJ` fait · `- [!] … · écarté le AAAA-MM-JJ (raison)` abandonné, **ne plus jamais réévaluer**.

**Le critère d'admission, et il est strict.** Un calculateur ne se justifie que si **le calcul EST la réponse** à une requête réelle : conversion, coût, seuil de bascule, durée. Un outil qui se contente d'afficher ce qu'un tableau dirait mieux n'a pas sa place — et une file encombrée d'outils faibles bloque les bons.

**Rappel de format.** Un outil se livre comme un **article complet** dont il est le cœur : ≥ 1000 mots par locale hors interface, méthode de calcul expliquée et sourcée, exemple chiffré déroulé à la main, tableau de repères, limites, FAQ. Une page qui ne contient qu'un formulaire n'a rien à indexer ni à citer.

---

## À construire

1. - [x] **quel-fournisseur-energie.be** — Convertisseur m³ de gaz en kWh. Entrées : m³, coefficient de conversion (défaut sourcé et modifiable), prix du kWh. Sorties : kWh, coût, équivalence. Traiter le pouvoir calorifique et la différence gaz pauvre / gaz riche. *Le plus recherché de la file, aucun bon outil francophone belge n'existe.* · publié le 2026-08-18
2. - [x] **meilleur-operateur-mobile.be** — Combien de Go me faut-il ? Entrées : heures mensuelles de streaming vidéo (avec qualité), musique, visio, navigation, GPS, partage de connexion. Sorties : volume estimé, taille de forfait conseillée, marge. *Requête la plus tapée du secteur, entièrement universelle.* · publié le 2026-08-21
3. - [ ] **simulateur-assurance-auto.be** — Déclarer ou payer de sa poche. Entrées : montant du dégât, franchise, degré bonus-malus, prime annuelle. Sorties : coût des deux options, surcoût de prime cumulé sur 5 ans, seuil de bascule.
4. - [ ] **meilleure-fibre-internet.be** — Débit en temps de téléchargement. Entrées : débit Mb/s, taille du fichier. Sorties : temps réel + tableau pour tailles types. Inclure la conversion Mb/s ↔ Mo/s.
5. - [ ] **meilleure-voiture-familiale.be** — Suis-je en surcharge ? Entrées : MMA et poids à vide relevés sur le certificat d'immatriculation, occupants, bagages, coffre de toit, attelage. Sorties : charge utile restante ou dépassement, détail du calcul. *Garde-fou renforcé : seules les valeurs du certificat font foi, le résultat est une estimation, seul un pesage officiel fait foi en cas de contrôle.*
6. - [ ] **quel-operateur-choisir.be** — Identifier un préfixe mobile belge. Entrée : numéro ou préfixe. Sortie : opérateur d'attribution d'origine selon le plan de numérotation IBPT. *Garde-fou renforcé : l'avertissement de portabilité doit apparaître dans le résultat lui-même, pas seulement dans l'article.* Compléter avec les préfixes géographiques et les familles de numéros surtaxés.
7. - [ ] **meilleure-voiture.be** — TMC et taxe de circulation par région. Entrées : région, puissance fiscale ou kW, cylindrée, motorisation, norme, âge. Sorties : TMC estimée et taxe annuelle, **pour les trois régions côte à côte**.
8. - [ ] **meilleure-voiture-familiale.be** — Quel siège auto pour mon enfant ? Entrées : taille, âge, poids. Sorties : groupe et norme applicables, dos-route ou face-route, rehausseur, cadre belge. *Le plus sensible de la file. Garde-fou renforcé : appui exclusif sur la réglementation et les tests d'organismes reconnus, orientation vers une catégorie et jamais vers un produit, rappel visible que les notices du siège et du véhicule priment.*
9. - [ ] **comparer-carte-credit.be** — Coût d'un solde reporté. Entrées : montant, TAEG, mensualité. Sorties : durée de remboursement, intérêts totaux, coût total.
10. - [ ] **comparer-banque.be** — Rendement réel d'un compte d'épargne. Entrées : montant, versements mensuels, taux de base, prime de fidélité, plafond mensuel. Sorties : intérêts réels après plafond et condition d'ancienneté. *Le mécanisme belge que personne ne calcule correctement.*
11. - [ ] **quel-operateur-choisir.be** — eSIM de voyage contre roaming. Entrées : destination, durée, data souhaitée. Sorties : coût comparé, seuil de bascule.
12. - [ ] **comparer-abonnement-tv.be** — Coût réel sur 24 mois. Entrées : prix promo, durée de la promo, tarif hors promotion, frais d'activation. Sorties : coût total sur 12 et 24 mois, moyenne mensuelle réelle.
13. - [ ] **quel-fournisseur-energie.be** — Coût annuel de chauffage par énergie. Entrées : surface ou consommation, type de logement, énergie. Sorties : coût annuel comparé gaz / électricité / mazout / pompe à chaleur, aux prix belges datés.
14. - [ ] **meilleur-fournisseur-electricite.be** — Combien me coûte cet appareil. Entrées : puissance en watts, heures d'usage, prix du kWh, tarif mono ou bihoraire. Sorties : coût journalier, mensuel, annuel, gain en heures creuses.
15. - [ ] **simulateur-assurance-auto.be** — Franchise haute ou basse. Entrées : écart de prime, écart de franchise, fréquence de sinistre estimée. Sorties : point de bascule et recommandation chiffrée.

---

## Sites sans outil en file

Décision explicite, pour que la tâche de conformité du samedi ne les signale pas indéfiniment comme oubliés.

- - [!] **comparer-banque.be** (au-delà de l'outil n°10) — pas d'autre calcul décisif en banque de détail.
- - [!] **meilleure-neobanque.be** — le seul calcul candidat (conversion dynamique à l'étranger) est trop proche de l'outil n°11.
- - [!] **meilleur-chocolat.be** — aucun calcul ne porte de décision réelle. Un convertisseur de recette serait un gadget.
- - [!] **meilleur-parti-politique.be** — le site a déjà un quiz de positionnement ; tout calculateur supplémentaire porterait un jugement.
- - [!] **meilleur-suv.be**, **meilleure-citadine.be**, **meilleure-voiture-de-luxe.be**, **meilleure-voiture-utilitaire.be**, **meilleure-voiture-7-places.be** — les calculs fiscaux et de charge utile sont portés par les outils n°5, 7 et 8 sur les sites frères. Y revenir serait du doublon.
- - [!] **meilleure-voiture-electrique.be** — le site dispose déjà de trois simulateurs (TCO, recharge, trajet).
- - [!] **meilleures-assurances-auto.be**, **quelle-assurance-auto.be** — le chiffrage appartient à `simulateur-assurance-auto.be` (outils n°3 et 15).
- - [!] **meilleur-abonnement-5g.be** — couvert par l'outil n°2 sur le site mobile.
- - [!] **meilleure-carte-credit.be** — le site a déjà un simulateur de coût annuel.
- - [!] **meilleure-voiture.be** (au-delà de l'outil n°7), **meilleure-beaute-demo** — pas de calcul décisif identifié à ce jour.

---

## Journal

*(Les outils construits viennent ici, avec leur date, le site, les slugs FR/EN, le head term Cuik retenu, les sources des coefficients et les deux cas de vérification utilisés.)*

### 2026-08-18 — outil n°1 · quel-fournisseur-energie.be · convertisseur m³ de gaz ⇄ kWh

- **Composant** : `components/blog/GasConverter.tsx`, calqué sur `FaqAccordion` (client component isolé, useState, styles inline sur tokens, zéro dépendance).
- **Slugs** : FR `content/blog/gaz/conversion-m3-gaz-en-kwh-belgique.mdx` · EN `content/blog/en/gaz/convert-gas-m3-to-kwh-belgium.mdx`.
- **Head term** : « conversion m³ gaz en kWh ».
- **Sources des coefficients** : CREG, « Conversion du m³ de gaz en kWh », 11,6 kWh/m³ (gaz H) et 10,3 kWh/m³ (gaz L), consultée le 18/08/2026 · ORES, PCS de 10,81 à 12,79 kWh/m³(n) et fin du gaz pauvre au 01/09/2024, consultée le 18/08/2026 · CWaPE, fourchette 10 à 12 kWh/m³, page modifiée le 11/12/2025 · Sibelga, open data PCS par SRA · prix du kWh de gaz, ordres de grandeur du marché belge relevés en août 2026.
- **Cas de vérification** : 1 500 m³ × 11,6 = 17 400 kWh (exemple donné par la CREG elle-même, repris comme exemple déroulé) · 1 250 m³ en gaz H puis en gaz L = 14 500 vs 12 875 kWh, soit 1 625 kWh d'écart.
- **i18n** : paire ajoutée à `lib/i18n/article-slugs.ts`. Vérifié le 2026-08-21.
- **Note** : outil construit et publié le 18/08 mais jamais journalisé ; ligne écrite rétroactivement au run du 21/08.

### 2026-08-21 — outil n°2 · meilleur-operateur-mobile.be · estimateur de consommation data

- **Composant** : `components/blog/DataCalculator.tsx`, calqué sur `FaqAccordion` du même repo (client component isolé, `useState`, styles inline sur tokens `--accent-*` / `--space-*` / `--radius-*`, zéro dépendance, zéro appel réseau, zéro stockage navigateur). Exposé dans la map MDX unique de `components/article/ArticleView.tsx` avec la prop `locale`, comme `Warning` et `ProConTable`.
- **Slugs** : FR `content/blog/reseaux/combien-de-go-consomme-netflix-youtube-spotify.mdx` · EN `content/blog/en/reseaux/how-much-data-netflix-youtube-spotify-use.mdx`.
- **Head term Cuik** : grappe « combien de go consomme netflix » (10 BE / 10 FR) + « combien de go consomme youtube » (10/10) + « combien de go pour regarder un film » (30 FR) + « 1 go correspond a combien de temps » (10 FR) + « spotify consommation data » (10 FR). Seeds : `combien de go consomme netflix`, `calculer consommation data mobile`, `combien de go pour un mois`, `consommation data par heure`, `combien de go consomme youtube`, puis `combien de go consomme`, `consommation internet mobile applications`, `1 go correspond a combien de temps`, `combien de go pour regarder un film`. Double appel BE `2056` puis FR `2250`, `language_id 1002`.
- **Anti-cannibalisation** : le head term « combien de Go par mois » reste la propriété de `content/blog/abonnements/combien-de-go-forfait-mobile-belgique.mdx` (méthode manuelle par relevé). Le nouvel article prend l'angle **consommation par usage** (pilier 9 — lexique et unités, catégorie `reseaux`, jusqu'ici vide) et maille vers lui.
- **Sources des coefficients** : Netflix, « How to control how much data Netflix uses », 0,3 / 0,7 / 1 / 3 / 7 Go/h par appareil, consultée le 21/08/2026 · YouTube, « System requirements & supported devices », débits soutenus recommandés 0,7 / 1,1 / 2,5 / 5 / 20 Mb/s, consultée le 21/08/2026 · Spotify, « Audio quality », ≈ 24 / 96 / 160 / 320 kbit/s, consultée le 21/08/2026 · Zoom, « System requirements: iOS, iPadOS, and Android », bande passante recommandée montante ET descendante (1,0+0,6 · 2,6+1,8 · 3,8+3,0 Mb/s), consultée le 21/08/2026 · IBPT, « La consommation de données mobiles a plus que triplé en cinq ans », 11,9 Go/mois par carte SIM contre 3,9 Go cinq ans plus tôt, publiée en juillet 2026.
- **Conversion appliquée** : Mo/h = kbit/s × 3600 ÷ 8 ÷ 1000, gigaoctet décimal (1 Go = 1000 Mo, convention des opérateurs).
- **Cas de vérification** (calculés à la main puis rejoués en script) : **cas A**, 4 h Netflix HD + 10 h YouTube 720p + 30 h Spotify 160 kbit/s + 2 h Zoom 720p = 29 370 Mo = **29,37 Go**, 38,18 Go avec 30 % de marge, palier 50 Go, 247 % de la moyenne IBPT — repris comme exemple déroulé dans l'article · **cas B**, 2 h Netflix Faible + 5 h YouTube 480p + 20 h Spotify 96 kbit/s + 1 h Zoom haute qualité = 4 659 Mo = **4,66 Go**, 6,06 Go avec marge, palier 10 Go, 39 % de la moyenne IBPT.
- **Garde-fous posés dans l'interface** : chaque ligne d'usage porte sa source et sa date · tous les débits sont modifiables · la marge de trafic de fond (30 %) est explicitement présentée comme n'ayant **aucune source officielle** · mention que les éditeurs publient des plafonds « jusqu'à » et des débits *recommandés*, donc que le résultat est une **borne haute** · rappel que seul le relevé du téléphone fait foi · aucun préréglage pour les usages non sourçables (réseaux sociaux, GPS, jeu), remplacés par une ligne « autre usage » à saisir.
- **Vérification avant commit** : MDX FR et EN compilés avec `@mdx-js/mdx` + `remark-gfm` (OK) · `DataCalculator.tsx` typé en `tsc --strict` sans erreur · 8 H2 dont 7 en question (88 %) par locale · FAQ 6 questions, TL;DR 6 puces (l'article voisin en avait 7 et 5) · ≥ 1000 mots par locale · 4 liens d'autorité en dofollow · 4 liens internes vérifiés.
- **i18n** : paire `combien-de-go-consomme-netflix-youtube-spotify` ↔ `how-much-data-netflix-youtube-spotify-use` ajoutée à `lib/i18n/article-slugs.ts`.
- **Commits** (branche `main`) : `8d9b9b4` composant · `8e535a0` câblage MDX + i18n · `ad705cb` articles FR/EN.
