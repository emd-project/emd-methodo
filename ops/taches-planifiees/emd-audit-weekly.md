---
name: emd-audit-weekly
description: Audit QA hebdo (SEO, DA, images, accessibilité) de tous les sites EMD existants → dashboard consolidé dans emd-methodo. Lecture seule.
---

Audit QA hebdomadaire de tous les sites EMD. **NE dépend d'AUCUN plugin installé** : la doctrine se lit directement dans le repo.

1. Lis `skills/emd-audit/SKILL.md` dans le repo `emd-project/emd-methodo` via `github_read_file` (MCP nano-mentionbox). C'est ta **doctrine d'audit complète** : catégories, sévérités, format du scorecard, chemins de sortie. Si le fichier est introuvable, arrête-toi et signale-le sans rien écrire.

2. Applique-la **intégralement** : périmètre = sites « Live » et « Configuré » de `pipeline/sites.csv` ; checklist complète (multilingue + sélecteur de langue + liaison FR↔EN, contenu/thin content < 800 mots, SEO sémantique + technique, identité favicon/logo, auteur/E-E-A-T — flag « la rédaction », images + covers de catégorie rendues, légal + RGPD + bandeau cookies, responsive **zéro scroll horizontal**, DA, accessibilité, santé, anti-footprint inter-sites).

3. **LECTURE SEULE** sur les repos de sites. Écris le dashboard consolidé dans `emd-project/emd-methodo` → `pipeline/audits/audit-AAAA-MM-JJ.md` (date du jour) et mets à jour `pipeline/audits/LATEST.md`.

4. Résume : sites audités, nb de ❌/⚠️, nb d'articles thin content, les 5 urgences, lien vers le rapport.

Outils : github_read_file, github_list_files, github_list_repos, github_write_file (MCP nano-mentionbox).