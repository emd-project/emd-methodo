# Boucle GEO — novembre 2026 (run du 2026-11-01) — NON EXÉCUTÉE

## Statut

**Run avorté à l'étape 0.** Le connecteur **MentionLab** n'est pas authentifié dans la session cloud de la tâche planifiée : aucun outil MentionLab (`get_user_info`, `list_all_projects`, `analytics_fanouts_top`, `analytics_sources_domains`…) n'était exposé.

Sans lecture des MentionMeters sectoriels (fan-outs + segments faibles BE/fr), aucun brief ne peut être fondé sur une demande observée. Conformément aux garde-fous, **aucun `priorites-geo.md` n'a été écrit ni modifié** : les briefs d'octobre (`geo-loop-2026-10.md`, 34 repos, 199 briefs) restent en place pour les rédacteurs de nuit.

## Bilan

- Sites servis : 0 · briefs : 0 · classements ajoutés : 0.
- Aucune écriture hors de ce log. MentionLab : aucun appel, zéro quota consommé.

## Action requise

Réautoriser le connecteur MentionLab (paramètres des connecteurs claude.ai), puis relancer la tâche `emd-geo-loop` manuellement (ou attendre le 1er décembre).
