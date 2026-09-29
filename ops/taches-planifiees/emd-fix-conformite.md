---
name: emd-fix-conformite
description: Fix hebdo — domaine CONFORMITÉ & IDENTITÉ (RGPD/cookies, légal, favicon/logo/OG, auteur). Jeudi 20h.
---

Correction — domaine **CONFORMITÉ & IDENTITÉ** — des sites EMD, sur `main`. Précis, idempotent, zéro casse, **câblage réel vérifié (§0 de la doctrine)**.

1. Lis `skills/emd-fix/SKILL.md` + `skills/humaniser-fr/SKILL.md` (repo emd-project/emd-methodo) = doctrine. Lis `pipeline/audits/conformite-LATEST.md` = to-do. Absent → stop.
2. Applique UNIQUEMENT : **Légal & RGPD** (remplir les pages légales — mentions/confidentialité/CGU — en **noindex** + infos société exactes : MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique ; **ajouter le bandeau cookies RGPD** s'il manque, léger/discret, Accepter/Refuser, lien politique, aucun tracker non essentiel avant consentement, FR+EN, **monté dans le layout** — vérifier le montage) ; **Identité** (favicon → câbler via `app/icon.svg` ; logo générique/éclair inline → marque UNIQUE posée **dans le SVG rendu du Nav.tsx** ; OG générique/identique → unique via `app/opengraph-image.tsx`. Vérifier chaque câblage) ; **Auteur/E-E-A-T** (« la rédaction »/générique → créer un persona unique : bio E-E-A-T FR+EN via humaniser-fr + avatar 1:1 + page auteur, auteur par défaut, ré-attribuer les articles, JSON-LD author).
3. Favicon/logo/avatar en 1:1. FR + EN. Commits clairs sur main.
4. Journalise dans `pipeline/fixes/conformite-AAAA-MM-JJ.md`. Rapport final (dont assets dont le câblage reste à confirmer).
Si doctrine ou rapport introuvable, arrête-toi sans rien modifier.