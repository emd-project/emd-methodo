---
name: emd-rapport-hebdo
description: Rapport hebdo EMD (lundi 9h) : nouveaux sites, chantiers audit/fix de la semaine, reste à faire, tableau du parc + statut MentionLab. Livré en PDF dans la conversation.
---

Tu produis le **RAPPORT HEBDO EMD** : une synthèse claire de la semaine écoulée pour un humain qui n'a pas suivi les runs et qui se sent noyé. Objectif : qu'après 3 minutes de lecture il sache **ce qui a été fait, ce qui reste, et où en est chaque site**.

**LIVRAISON : un PDF présenté DANS LA CONVERSATION. N'écris RIEN sur GitHub (lecture seule sur les repos). Ne commit rien.**

PÉRIODE = les **7 derniers jours** (du lundi précédent à aujourd'hui). Calcule les dates via `date`.

## 1) Collecte des sources (lecture seule)

**A. Repo `emd-project/emd-methodo`** (via `github_read_file` / `github_list_files`, MCP nano-mentionbox) :
- `pipeline/provisioned-log.csv` → **nouveaux sites** (colonnes `domaine,date`). Retiens ceux datés dans les 7 derniers jours. (Fichier possiblement absent au début : dis-le simplement, ne bloque pas.)
- `pipeline/sites.csv` → **état du parc** (`DOMAINE,CATÉGORIE,SOUS-TYPE,STATUT,URL,ACHETÉ`).
- `pipeline/audits/` → liste les fichiers, lis ceux **datés de la semaine** (`content-AAAA-MM-JJ.md`, `tech-…`, `ux-…`, `conformite-…`, `pages-…`) + les `*-LATEST.md`.
- `pipeline/fixes/` → lis les journaux **datés de la semaine** (`content-…`, `tech-…`, `ux-…`, `conformite-…`, `pages-…`, `fix-…`) : c'est là que sont les corrections appliquées ET les items **reportés / à vérifier / à coder**.
- `pipeline/audits/audited-*.csv` → ledgers (quels sites ont déjà été audités par domaine).

**B. MentionLab** (MCP MentionLab) : `list_all_projects` → la liste des projets GEO existants (nom + `website`). Sert à savoir quels sites live ont un projet et lesquels n'en ont PAS.

**C. Tâches planifiées** : `list_scheduled_tasks` → repère les tâches qui ont tourné cette semaine (`lastRunAt`), celles **désactivées** (`enabled: false`) et celles qui n'ont jamais tourné — signale toute anomalie (une boucle QA muette = problème).

## 2) Contenu du PDF (dans cet ordre, factuel, zéro blabla)

1. **SYNTHÈSE DE LA SEMAINE** — 4-6 puces max, en français simple : combien de nouveaux sites, ce que les audits ont trouvé, ce que les fix ont corrigé, les 2-3 points qui méritent son attention. C'est la section la plus importante : elle doit suffire s'il ne lit que ça.
2. **NOUVEAUX SITES CRÉÉS** (semaine) — pour chacun : domaine, catégorie, **variante de home + direction DA**, auteur (prénom), **classement seed** (oui/non), **images** (toutes générées / lesquelles manquent), URL Vercel, tâche de rédaction quotidienne créée (heure). Si aucun : « Aucun nouveau site cette semaine ».
3. **CHANTIERS EFFECTUÉS** — regroupés par domaine (Contenu/SEO-GEO · Technique/i18n · DA-UX-Images · Conformité · Pages clés). Par site : ce que l'audit a trouvé → ce que le fix a réellement corrigé. Sois concret (« 3 articles réécrits ≥800 mots », « bandeau cookies monté », « hreflang réciproque ajouté »), pas générique.
4. **CE QU'IL RESTE À FAIRE** — liste **actionnable et priorisée** (❌ bloquant d'abord, puis ⚠️) : items « reporté » / « à vérifier » / « à coder » des journaux de fix, images restées en placeholder, pages clés encore vides, clusters sans classement, sites sans tâche de rédaction. Chaque ligne = 1 action + le site concerné.
5. **TABLEAU DU PARC** — une ligne par site au statut **Live** ou **Configuré** :
   `Site | Catégorie | Statut | NDD (Acheté / À acheter) | URL | Projet MentionLab (✅ nom / ❌ à créer) | Rédaction quotidienne (✅/❌)`
   Croise `sites.csv` avec `list_all_projects` (compare sur le domaine dans `website`).
6. **MENTIONLAB — À CRÉER** — la liste explicite des sites **Live sans projet MentionLab** (c'est un trou de visibilité GEO). + rappel des sites « À faire » dont le **NDD est déjà acheté** (prêts à être provisionnés) et de ceux « À acheter » (bloqués tant que le domaine n'est pas pris).
7. **PROCHAINES ACTIONS — TOP 5** — les 5 choses les plus utiles à faire cette semaine, dans l'ordre, chacune en une phrase.

Règles de fond : **факty seulement** — si une donnée manque (fichier absent, log vide), écris-le explicitement plutôt que d'inventer. Pas de remplissage. Chiffre tout ce qui peut l'être.

## 3) Produire et livrer le PDF

- Lis la skill **`pdf`** puis génère le document : titre « Rapport hebdo EMD — semaine du <lundi> au <dimanche> », mise en page lisible (titres, tableaux, puces courtes).
- Nom de fichier : `EMD-rapport-hebdo-AAAA-MM-JJ.pdf`.
- **Présente le PDF dans la conversation avec l'outil `present_files`.** C'est le livrable. **Ne le commit PAS sur GitHub.**
- Termine par un message de 3-4 lignes max reprenant la synthèse (les 2-3 points qui comptent) — pas un résumé du résumé.

Si absolument aucune activité (aucun nouveau site, aucun audit, aucun fix) : dis-le en une ligne, **mais produis quand même le PDF** avec le tableau du parc + MentionLab à créer + prochaines actions — c'est le référentiel qui remet les idées en place.