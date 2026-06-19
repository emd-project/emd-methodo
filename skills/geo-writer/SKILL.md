---
name: geo-writer
version: 1.0.0
description: "Rédige des articles de blog optimisés GEO (Generative Engine Optimization) pour augmenter les citations et mentions d'un site dans les réponses des LLM, puis les commit sur GitHub. Utiliser quand l'utilisateur veut créer du contenu pour mieux apparaître dans ChatGPT/Gemini/AI Overview, boucher les trous de visibilité d'un projet MentionLab, ou transformer un diagnostic de segments faibles en articles publiés."
---

# geo-writer

Tu transformes un **diagnostic de visibilité** en **contenu qui se fait citer par les LLM**. Principe : **chaque cellule sous-performante de la grille MentionLab est un brief de contenu.** Tu n'écris pas du SEO classique — tu écris pour qu'un LLM extraie, cite et mentionne.

Boucle : diagnostiquer → choisir l'angle → rédiger selon le playbook GEO → committer sur le repo du site → proposer un re-run MentionLab.

## Étape 1 — Récupérer le diagnostic
**A. Depuis MentionLab (préféré).** Bootstrap (`get_user_info` → `list_all_projects` → `set_active_context` → `get_last_execution_date`). Identifie : segments **faibles** (`brand_overview`, `competitive_landscape`, `query_deep_dive`, `analytics_*`) et **sources citées** (`analytics_sources_*`, fan-outs). Distingue : faible visibilité + bon ranking = **couverture** ; faible visibilité + mauvais ranking = **position/autorité**.
**B. Brief manuel.** Sujet/persona/segment fourni → pars de là (demande langue + repo).

## Étape 2 — Choisir l'angle
Priorise les cellules à fort impact. Mappe sur le type de question : Informative faible → Q&A ; Comparative faible → comparatif « meilleur X pour Y » + tableau ; Brand sentiment bas → message de marque + FAQ réputationnelle. Confirme angle/persona/langue/repo avant de rédiger.

## Étape 3 — Rédiger selon le playbook GEO
Applique `reference/geo_playbook.md`. En résumé : (1) Q&A réponse d'abord ; (2) structurer pour la machine (tableaux, listes, phrases citables) ; (3) matcher la langue du marché ; (4) fraîcheur datée ; (5) clarté entité (marque/chiffres/définitions) ; (6) couverture exhaustive ; (7) JSON-LD.

## Étape 4 — Committer sur GitHub (via nano-mentionbox)
`github_list_repos` → repérer le repo ; `github_list_files`/`github_read_file` sur un article existant pour calquer la structure (frontmatter, dossier, .mdx, slug) ; écrire via `github_write_file` sur la **branche par défaut** (parfois `claude/...`, pas `main` — vérifier). Images : `github_push_images` / `generate_image`. Commit clair.

## Étape 5 — Boucler
Proposer un re-run MentionLab (skill `mentionlab-run`, étape 7) après indexation pour mesurer l'évolution.

## Garde-fous
- Jamais inventer chiffres/prix/taux/faits ; vérifier + dater.
- Respecter la marque et le ton du site (lire un article d'abord).
- Valider l'angle avant commit si relecture demandée ; sinon commit direct.
- Un article = un segment/intention. Ne pas diluer.
