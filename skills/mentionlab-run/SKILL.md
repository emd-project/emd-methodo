---
name: mentionlab-run
version: 1.0.0
description: "Génère une grille de prompts taguée prête à importer dans un projet MentionLab, puis lit le positionnement des sites dans les réponses des LLM. Utiliser quand l'utilisateur veut auditer la visibilité GEO d'une marque, créer/étendre les queries d'un projet MentionLab, monter une grille de prompts par persona/segment, ou voir comment ses sites se positionnent dans ChatGPT/Gemini/AI Overview."
---

# mentionlab-run

Tu construis une **grille de prompts instrumentée** pour un projet MentionLab : pas des "bonnes questions" isolées, mais une matrice où chaque prompt isole **une cellule mesurable** `CAT × TYPE × SCAT × CR × FUN × QT`. Cette répétition structurée est le design : elle rend la visibilité attribuable par segment.

Livrable par défaut : un **CSV à valider puis importer** (l'humain relit avant de lancer un run). Ne pousse PAS les queries directement dans le projet sauf demande explicite.

## Étape 0 — Bootstrap MentionLab (obligatoire, dans l'ordre)

Le serveur MCP MentionLab expose ~110 outils, beaucoup masqués. Utilise `search_tools(keywords)` puis `describe_tool(name)` pour révéler un outil, ou `run_code` pour appeler les outils read-only en lot.

1. `get_user_info` — vérifie l'auth.
2. `list_all_projects` — chaque résultat porte `projectId` ET `organisationId`.
3. `set_active_context(projectId)` — l'org se résout automatiquement ; ensuite tu peux omettre les IDs.
4. `get_last_execution_date` — ancre de fraîcheur des données.

## Étape 1 — Choisir le projet

Si l'utilisateur n'a pas nommé le projet, liste les projets et demande lequel. Puis `set_active_context`.

## Étape 2 — Lire le contexte du projet (pour la dérivation hybride)

Avant de proposer quoi que ce soit, lis :
- `get_project` → description, website, industry, nameAliases (la marque), blackListAliases.
- `list_entities` → la marque propre + les concurrents suivis (ça cadre le marché).
- `list_queries` + `list_tags` (paginés, via `run_code` si volumineux) → la taxonomie déjà en place et les prompts existants, pour **ne pas dupliquer** et **réutiliser les conventions de tags**.

## Étape 3 — Proposer la taxonomie (mode HYBRIDE — défaut)

Déduis depuis la description + entities une proposition de taxonomie sur 6 axes (voir `reference/taxonomy.md` pour le gabarit-or ING Belgium). Présente-la à l'utilisateur **pour validation/ajustement avant génération**. Structure :

- **`CAT_`** : 2–4 macro-catégories client (ex. Starters / Business, ou B2C / B2B).
- **`TYPE_`** : les personas fins (ex. Freelancer, SME, Family, Senior, Student…), incluant les segments sectoriels si pertinents.
- **`SCAT_`** : les produits/besoins (ex. Financing, Insurance, Current_Account…).
- **`CR_`** : les critères de choix (ex. Quality_Price, Advice_Expertise, Digital_Experience, Reputation…).
- **`FUN_`** : l'étape du cycle de vie / funnel (ex. Discovery, Company_Creation, Operational_Setup, Expanding, Retention…).
- **`QT_`** : Comparative / Informative / Brand.

Si l'utilisateur dit "auto", génère sans valider. S'il fournit une liste de personas, pars de la sienne.

## Étape 4 — Paramètres du run

Demande (avec des défauts sensés) :
- **Nombre de prompts par langue** (défaut 100).
- **Langues** + pays (défaut: la langue/pays du projet ; en BE → FR + NL).
- **Répartition QT** : % Comparative / Informative / Brand (défaut 60/30/10 ; pour un pur comparateur, monter le comparative ; pour une marque à monitorer, garder ≥10% Brand).

## Étape 5 — Générer la grille (règles de rédaction NON négociables)

Décline la matrice : chaque ligne = une intersection unique, le même besoin décliné sur chaque persona et inversement. Applique :

- **QT pilote la formulation** :
  - *Comparative* → formule pour **forcer des noms d'entreprises** ("Quelle banque offre le meilleur…", "What are the best…"). **Ne jamais citer la marque.** On mesure la visibilité spontanée et le share of voice.
  - *Informative* → la vraie question d'un utilisateur, **sans pousser de noms** ("Comment financer…", "Qu'est-ce que le VAPZ ?"). On mesure quelles **sources** le LLM cite.
  - *Brand* → **nommer explicitement la marque** ("Que pensez-vous de l'offre X pour…"). On mesure perception/sentiment. ~10 questions ciblées, qualité > quantité.
- **Simplifier au maximum.** Pas de contexte superflu. **Sortir le pays de la phrase** quand c'est possible (le pays est porté par la colonne `country`).
- **Variation sémantique** : alterner "quelle / recommande / liste les meilleures / quels sont…".
- **Workflow langues** : rédiger et valider d'abord en une langue, **puis traduire**. Chaque prompt existe dans chaque langue demandée.
- **Un seul type de question à la fois** lors de la rédaction.

## Étape 6 — Sortir le CSV

Colonnes exactes (voir `reference/csv_and_rules.md`) : `query,language,country,CAT_,SCAT_,TYPE_,CR_,FUN_,QT_`. Une ligne par prompt × langue. Calquer le format des tags existants lus à l'étape 2. Sauvegarder le CSV et le présenter ; récap : nb de prompts, répartition QT/TYPE/SCAT, langues, cellules vides (gaps).

## Étape 7 — (Optionnel) Pousser + lancer + lire le positionnement

Seulement si l'utilisateur valide : pousser via `create_tags` puis `create_queries` (appel direct) ; lancer via `trigger_job` ; lire le positionnement avec `brand_overview`/`competitive_landscape`/`query_deep_dive` + `analytics_*`. **Passer la main au skill `geo-writer`** avec les segments faibles + sources citées : chaque cellule sous-performante = un brief de contenu.

## Garde-fous
- `organisationId` requis pour tout appel projet — `set_active_context` le mémorise.
- Les models qui ONT des données viennent de `get_project_models`, jamais de `llmProviders`.
- Résultat tronqué/"too large" → relance le MÊME appel dans `run_code` et agrège.
