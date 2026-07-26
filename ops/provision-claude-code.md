# [ABANDONNÉ] Provisionnement sous Claude Code

**Testé le 25/07/2026 — abandonné.** Les routines Claude Code s'exécutent **uniquement en cloud**
(pas sur la machine locale) et cet environnement **n'a pas accès au MCP nano-mentionbox**
(create_repo_from_template, deploy_to_vercel, génération d'images) → le provisionnement y est
impossible sans réécrire toute la chaîne d'outillage.

## Architecture retenue à la place
- **Provision : tâche Cowork `emd-provision-sites`** (lun & jeu 6h05) — inchangée, doctrine
  `skills/configure-from-spec` + `skills/design-review`.
- **Les yeux : GitHub Action `da-shots`** dans le template/forks — Playwright tourne chez GitHub,
  capture le rendu (pages × viewports × clair/sombre), committe les PNG dans `docs/da-shots/` ;
  l'agent Cowork les REGARDE via `github_view_image`, critique (skills/design-review), corrige,
  re-push (ce qui re-déclenche les shots). Boucle fermée sans navigateur local.
- **Tâches de rédaction : Cowork** (+ `emd-task-spawner` en filet quotidien).

Ce fichier est conservé comme trace de la décision. Ne pas re-tenter la voie routine cloud
sans avoir vérifié que le MCP nano-mentionbox y est devenu accessible.
