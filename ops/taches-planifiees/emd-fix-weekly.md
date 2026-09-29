---
name: emd-fix-weekly
description: Corrige automatiquement (sur main, tous sites) les problèmes du dernier audit EMD. Dimanche soir, après l'audit du matin.
---

Correction hebdomadaire des sites EMD. **NE dépend d'AUCUN plugin installé** : la doctrine se lit dans le repo.

1. Lis `skills/emd-fix/SKILL.md` ET `skills/humaniser-fr/SKILL.md` dans `emd-project/emd-methodo` via `github_read_file` (doctrine de correction + doctrine de rédaction anti-IA à appliquer pour tout texte créé/réécrit). Si `emd-fix/SKILL.md` est introuvable, arrête-toi et signale.

2. Lis le dernier audit `pipeline/audits/LATEST.md` (repo emd-methodo). Absent → « Aucun audit disponible », stop.

3. Applique la doctrine `emd-fix` **intégralement**, directement sur `main` de chaque site : correctifs MÉCANIQUES partout (alt, next/image, OG/JSON-LD, sitemap/robots/canonical, multilingue, favicon/logo, **auteur persona** remplaçant « la rédaction », images manquantes/doublons + covers catégorie, **pages légales noindex + infos société**, **bandeau cookies RGPD**, **responsive 0 scroll horizontal**, hex→tokens) + correctifs LOURDS plafonnés à ~15 ops/run (réécriture thin content ≥ 800 mots, traductions EN manquantes). FR + EN (jamais NL), images 16:9 uniques (favicon/logo/avatar 1:1), tout texte selon `humaniser-fr`, DA unique préservée, idempotent, zéro casse. Le push sur main redéploie Vercel. Journalise dans `pipeline/fixes/fix-AAAA-MM-JJ.md`.

4. Résume : sites touchés, correctifs mécaniques, opérations lourdes faites vs reportées, restants.

Outils : github_read_file, github_list_files, github_list_repos, github_write_file, github_commit_batch, generate_image, wait_for_image (MCP nano-mentionbox).