# Fix CONFORMITÉ & IDENTITÉ — 2026-11-20

**Source :** `pipeline/audits/conformite-LATEST.md` (audit du 2026-11-19)
**Périmètre :** 0 site. L'audit ne liste aucun nouveau site (≤14j, non audité). Le plus récent, `fonds-investissement.be` (provisionné le 2026-10-20), est hors fenêtre, audité le 2026-10-22 et corrigé le 2026-10-23 (`pipeline/fixes/conformite-2026-10-23.md`).
**Doctrine :** `skills/emd-fix/SKILL.md` + `skills/humaniser-fr/SKILL.md` (lus).

## Corrigé
Rien. Périmètre vide, aucun repo de site modifié.

## Reporté (toujours ouvert, rappel des journaux 2026-10-23 → 2026-11-12)
- Template : bandeau cookies RGPD et Analytics conditionné au consentement toujours absents du template. Hors périmètre emd-fix (sites du rapport uniquement), à traiter par une tâche dédiée.
- fonds-investissement.be, mineur dormant : route legacy `app/(site)/[article]/page.tsx` sans `authorName`.

## À vérifier (câblage non prouvé en prod, hérité du 2026-10-23)
- fonds-investissement.be : build Vercel de `fd91f56` et `9c3f17a`, rendu du bandeau à 320/375 px, aucune requête `/_vercel/insights` avant « Accepter », `/en/auteurs/cedric-h` en anglais.
