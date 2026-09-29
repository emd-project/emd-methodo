---
name: refresh-prix-energie-be
description: Rafraîchit mensuellement les prix du comparateur d'énergie (FR + EN) pour garder le « moins cher en {mois} » exact
---

Le 1er de chaque mois, rafraîchis les prix de l'énergie du comparateur du site (repo GitHub `emd-project/meilleur-fournisseur-energie-be`). Objectif : garder honnête l'affichage dynamique « le moins cher en [mois courant] » des articles et du comparateur.

ÉTAPES :
1. Pour ÉLECTRICITÉ (profil 3 500 kWh/an), GAZ (17 000 kWh/an) et GAZ VERT : fais des WebSearch sur les tarifs belges À JOUR (sources : CREG / CREG Scan, CallMePower, Selectra, HelloSafe, mega.be, callmepower). Relève pour chaque fournisseur déjà présent : le coût annuel estimé et le prix du kWh actuels (réf. Wallonie sauf mention).

2. Mets à jour `lib/comparateur.ts` ET `lib/comparateur.en.ts` :
   - le champ `prix` (coût annuel) et `specs.prixKwh` / `specs.pricePerKwh` de chaque modèle ;
   - réordonne les modèles si le classement a changé (le moins cher en premier, marque `nouveaute: true` sur le meilleur prix) ;
   - mets à jour le `profil` (« relevé [mois précédent/ courant] 2026 ») et le champ `note` (mentionne le nouveau moins cher) ;
   - garde EXACTEMENT la même structure TypeScript, les mêmes fournisseurs et les mêmes clés. Ne casse pas les types.

3. Garde les fournisseurs régionaux/coopératifs (Ecopower, Cociter) avec leur particularité (« Part coopérative »). Ne supprime aucun fournisseur sans raison.

4. Si tu n'es pas sûr d'un prix, garde l'ancienne valeur plutôt que d'inventer. Les prix doivent rester réalistes et sourcés.

5. Commit unique sur `main` (message : « data: refresh prix comparateur [mois] »). Confirme à la fin : les 3 nouveaux « moins cher », et les principaux mouvements de prix.

NE crée PAS d'article. Cette tâche met seulement à jour les données de prix.