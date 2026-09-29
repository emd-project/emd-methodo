---
name: emd-audit-tech
description: Audit hebdo — domaine TECHNIQUE & i18n (canonical, sitemap, hreflang, OG câblé, vrai multilingue). Mardi 7h.
---

Audit QA — domaine **TECHNIQUE & i18n** — des NOUVEAUX sites EMD (≤14j). LECTURE SEULE sur les sites.

1. Lis `skills/emd-audit/SKILL.md` ET `references/i18n-multilingue.md` (repo emd-project/emd-methodo) via github_read_file = doctrine.
2. **Périmètre RESTREINT (cf. emd-audit § Périmètre)** : UNIQUEMENT les sites de `pipeline/provisioned-log.csv` **provisionnés ≤ 14 jours** ET **pas déjà audités par CE domaine** (ledger `pipeline/audits/audited-tech.csv`). Après avoir audité un site, **append son domaine + date dans `audited-tech.csv`**. Aucun candidat → écris « Rien à auditer (aucun nouveau site ≤14j non audité) » et STOP. **Jamais de re-scan du parc.** (Site ciblé explicitement à la main → uniquement celui-là.)
3. Applique UNIQUEMENT : **SEO TECHNIQUE** (sitemap.xml 2 locales + articles, robots.txt, canonical, pas de noindex/nofollow accidentel, hreflang FR↔EN réciproque + x-default, **OG/Twitter réellement câblés via `app/opengraph-image`**, JSON-LD, slugs, liens morts) ; **MULTILINGUE RÉEL** (critères de `references/i18n-multilingue.md` : arbre `app/en/` séparé, lecteurs `…En()`, dossiers de locale **jamais lus comme catégories**, mapping FR↔EN, `LangSwitch` monté, parité de contenu ; **flag tout pseudo-multilingue** = EN/NL déversés en fausses catégories ; **jamais de NL**) ; **SANTÉ** (URL prod 200 + une page /en 200 si fetchable).
4. Écris `pipeline/audits/tech-AAAA-MM-JJ.md` + `pipeline/audits/tech-LATEST.md` (overwrite). Scorecard + détail + top actions.
5. Résume : sites audités, ❌/⚠️, lesquels sont pseudo-multilingues, 5 urgences.
Si `emd-audit/SKILL.md` introuvable, arrête-toi sans rien écrire.