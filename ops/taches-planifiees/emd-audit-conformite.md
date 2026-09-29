---
name: emd-audit-conformite
description: Audit hebdo — domaine CONFORMITÉ & IDENTITÉ (RGPD/cookies, légal, favicon/logo/OG, auteur E-E-A-T). Jeudi 7h.
---

Audit QA — domaine **CONFORMITÉ & IDENTITÉ** — des NOUVEAUX sites EMD (≤14j). LECTURE SEULE sur les sites.

1. Lis `skills/emd-audit/SKILL.md` (repo emd-project/emd-methodo) via github_read_file = doctrine. Applique le **principe « auditer le rendu réel »**.
2. **Périmètre RESTREINT (cf. emd-audit § Périmètre)** : UNIQUEMENT les sites de `pipeline/provisioned-log.csv` **provisionnés ≤ 14 jours** ET **pas déjà audités par CE domaine** (ledger `pipeline/audits/audited-conformite.csv`). Après avoir audité un site, **append son domaine + date dans `audited-conformite.csv`**. Aucun candidat → écris « Rien à auditer (aucun nouveau site ≤14j non audité) » et STOP. **Jamais de re-scan du parc.** (Site ciblé explicitement à la main → uniquement celui-là.)
3. Applique UNIQUEMENT : **LÉGAL & RGPD** (pages légales remplies — pas de placeholder `[À compléter]` — en **noindex** + infos société exactes : MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique ; **bandeau cookies RGPD présent ET monté dans le layout**, léger/discret, Accepter/Refuser, lien politique, aucun tracker non essentiel avant consentement, FR+EN — absent = bloquant) ; **IDENTITÉ** (favicon réellement servi via `app/icon` ; **logo réellement rendu unique** = inspecte le SVG inline du `Nav.tsx`, flag l'éclair générique ; **OG unique via `app/opengraph-image`**, flag OG identique entre sites) ; **AUTEUR / E-E-A-T** (flag « la rédaction »/générique/vide, bio E-E-A-T, page auteur, JSON-LD author, auteur unique au site ; **RÈGLE NOM — l'auteur ne doit JAMAIS afficher de nom de famille : seuls un prénom seul (« Hugo ») ou prénom + initiale (« Hugo L. ») sont autorisés. Flag tout patronyme complet, partout : `niche.config.author.name`, page auteur `/auteurs/<slug>`, JSON-LD `Person`, frontmatter des articles**).
4. Écris `pipeline/audits/conformite-AAAA-MM-JJ.md` + `pipeline/audits/conformite-LATEST.md` (overwrite). Scorecard + détail + top actions.
5. Résume : sites audités, ❌/⚠️, bandeaux cookies/légal manquants, auteurs génériques, **auteurs affichant un nom de famille**, 5 urgences.
Si `emd-audit/SKILL.md` introuvable, arrête-toi sans rien écrire.