# PROGRESS-OUTILS — calculateurs et simulateurs EMD

Fichier unique : il porte **la file** (lignes non cochées) **et le journal** (lignes cochées). Consommé par la tâche planifiée `emd-outils-calculateurs`, un outil par semaine, le mercredi.

**Conventions.**
`- [ ]` en file · `- [x] … · publié le AAAA-MM-JJ` fait · `- [!] … · écarté le AAAA-MM-JJ (raison)` abandonné, **ne plus jamais réévaluer**.

**Le critère d'admission, et il est strict.** Un calculateur ne se justifie que si **le calcul EST la réponse** à une requête réelle : conversion, coût, seuil de bascule, durée. Un outil qui se contente d'afficher ce qu'un tableau dirait mieux n'a pas sa place — et une file encombrée d'outils faibles bloque les bons.

**Rappel de format.** Un outil se livre comme un **article complet** dont il est le cœur : ≥ 1000 mots par locale hors interface, méthode de calcul expliquée et sourcée, exemple chiffré déroulé à la main, tableau de repères, limites, FAQ. Une page qui ne contient qu'un formulaire n'a rien à indexer ni à citer.

---

## À construire

1. - [ ] **quel-fournisseur-energie.be** — Convertisseur m³ de gaz en kWh. Entrées : m³, coefficient de conversion (défaut sourcé et modifiable), prix du kWh. Sorties : kWh, coût, équivalence. Traiter le pouvoir calorifique et la différence gaz pauvre / gaz riche. *Le plus recherché de la file, aucun bon outil francophone belge n'existe.*
2. - [ ] **meilleur-operateur-mobile.be** — Combien de Go me faut-il ? Entrées : heures mensuelles de streaming vidéo (avec qualité), musique, visio, navigation, GPS, partage de connexion. Sorties : volume estimé, taille de forfait conseillée, marge. *Requête la plus tapée du secteur, entièrement universelle.*
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

Aucun outil construit à ce jour.
