---
name: emd-fix-tech
description: Fix hebdo — domaine TECHNIQUE & i18n (canonical, sitemap, hreflang, OG, multilingue). Mardi 20h.
---

Correction — domaine **TECHNIQUE & i18n** — des sites EMD, sur `main`. Précis, idempotent, zéro casse, **câblage réel vérifié**.

1. Lis `skills/emd-fix/SKILL.md` + `references/i18n-multilingue.md` (repo emd-project/emd-methodo) = doctrine. Lis `pipeline/audits/tech-LATEST.md` = to-do. Absent → stop.
2. Applique UNIQUEMENT : **SEO technique** (réparer sitemap 2 locales + articles, robots, canonical, retirer noindex/nofollow accidentel, hreflang réciproque + x-default, **OG via `app/opengraph-image` unique** — corrige la source rendue, pas un fichier au bon nom, et VÉRIFIE le câblage) ; **MULTILINGUE RÉEL** (références/i18n-multilingue.md).
3. ⚠️ **i18n = build-risquant** : porter un arbre `app/en` complet sur un `main` auto-déployé sans build check peut casser TOUT le déploiement (FR inclus). Donc : si le site n'a PAS le système i18n (template mono-locale), **NE pousse PAS un app/en à l'aveugle** — applique le pattern de `quel-operateur-choisir.be` UNIQUEMENT en **incréments compilables** et, faute de build de vérification, **logue « i18n à porter (build check requis) »** plutôt que de risquer la casse. Corrige sans risque : retirer les dossiers de locale lus comme fausses catégories, supprimer le NL, réparer hreflang/lang/mapping/switcher quand le socle i18n existe déjà.
4. Journalise dans `pipeline/fixes/tech-AAAA-MM-JJ.md` (corrigé vs reporté vs « build check requis »). Rapport final.
Si doctrine ou rapport introuvable, arrête-toi sans rien modifier.