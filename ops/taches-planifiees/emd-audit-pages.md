---
name: emd-audit-pages
description: Audit hebdo — PAGES CLÉS vides (comparateur, quiz, tableaux de prix, simulateur) sur tous les sites. Samedi 11h. Lecture seule.
---

Audit — **PAGES CLÉS VIDES** — des NOUVEAUX sites EMD (≤14j). LECTURE SEULE sur les sites.

1. Lis `references/pages-cles.md` (repo emd-project/emd-methodo) via github_read_file = ce qu'une page clé doit contenir.
2. **Périmètre RESTREINT** : UNIQUEMENT les sites de `pipeline/provisioned-log.csv` **provisionnés ≤ 14 jours** ET **pas déjà audités par CE domaine** (ledger `pipeline/audits/audited-pages.csv`). Après avoir audité un site, **append son domaine + date dans `audited-pages.csv`**. Aucun candidat → écris « Rien à auditer (aucun nouveau site ≤14j non audité) » et STOP. **Jamais de re-scan du parc.** (Site ciblé explicitement à la main → uniquement celui-là.)
3. Pour chaque site, détecte les **pages clés vides ou shell** : **comparateur** (0 produit / < 5 items), **quiz** (0 question), **tableaux de prix / offres** (vides), **classements** (« aucun classement publié » ou clusters sans classement), **simulateur** (non configuré), et toute page fonctionnelle livrée vide. Vérifie aussi si les composants correspondants sont **data-driven** (consomment une source de données) ou en logique figée — note-le (ça conditionne si le build sera sûr ou « à coder »).
4. Écris `pipeline/audits/pages-AAAA-MM-JJ.md` + `pipeline/audits/pages-LATEST.md` (overwrite). Pour chaque site : quelles pages clés sont vides, leur format de données attendu (chemin du fichier de data si trouvé), et si le composant est data-driven (oui/non).
5. Résume : sites audités avec pages vides, lesquelles, et celles « à coder » (composant non data-driven) à traiter à part.
Si `references/pages-cles.md` introuvable, arrête-toi sans rien écrire.