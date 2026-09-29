---
name: emd-audit-content
description: Audit hebdo — domaine CONTENU & SEO/GEO (thin, H2-questions, FAQ, JSON-LD, maillage). Lundi 7h.
---

Audit QA — domaine **CONTENU & SEO/GEO** — des NOUVEAUX sites EMD (≤14j). LECTURE SEULE sur les sites.

1. Lis `skills/emd-audit/SKILL.md` ET `skills/seo-geo-redaction/SKILL.md` (repo emd-project/emd-methodo) via github_read_file = doctrine.
2. **Périmètre RESTREINT (cf. emd-audit § Périmètre)** : UNIQUEMENT les sites de `pipeline/provisioned-log.csv` **provisionnés ≤ 14 jours** ET **pas déjà audités par CE domaine** (ledger `pipeline/audits/audited-content.csv`). Après avoir audité un site, **append son domaine + date dans `audited-content.csv`**. Aucun candidat → écris « Rien à auditer (aucun nouveau site ≤14j non audité) » et STOP. **Jamais de re-scan du parc.** (Site ciblé explicitement à la main → uniquement celui-là.)
3. Applique UNIQUEMENT les catégories de ce domaine : **CONTENU** (thin content < 800 mots), **SEO SÉMANTIQUE** (intent, mot-clé, H1, maillage interne/orphelins, cannibalisation), **GEO / STRUCTURE ARTICLE** (mesure le **% de H2 en question** et flag < 70%, réponse-first, FAQ 6-7, TL;DR/aiSummary, JSON-LD Article/FAQ/Person, année dynamique, **accords de genre** via `entityGender`). Échantillonne 2-3 articles/site.
4. Écris le rapport dans `emd-project/emd-methodo` : `pipeline/audits/content-AAAA-MM-JJ.md` + `pipeline/audits/content-LATEST.md` (overwrite). Scorecard (avec colonne % H2-questions) + détail + top actions.
5. Résume : sites audités, ❌/⚠️, nb articles thin + sous 70% H2, 5 urgences.
Si `emd-audit/SKILL.md` introuvable, arrête-toi sans rien écrire.