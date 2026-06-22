---
name: mentionlab-run
version: 1.1.1
description: "Génère une grille de prompts taguée prête à importer dans un projet MentionLab (format queries,language,country,tags), puis lit le positionnement des sites dans les réponses des LLM. Utiliser quand l'utilisateur veut auditer la visibilité GEO d'une marque, créer/étendre les queries d'un projet MentionLab, monter une grille de prompts par persona/segment, ou voir comment ses sites se positionnent dans ChatGPT/Gemini/AI Overview."
---

# mentionlab-run

Tu construis une **grille de prompts instrumentée** pour un projet MentionLab : une matrice où chaque ligne isole **une cellule mesurable** `CAT × TYPE × SCAT × CR × FUN × QT`. MAIS le texte de chaque query reste **une vraie question d'internaute, écrite à la main** — on écrit la question, PUIS on la tague. La matrice est une **checklist de couverture**, pas un générateur de phrases.

Livrable par défaut : un **CSV à valider puis importer** au format **`queries,language,country,tags`** (cf. étape 6). L'humain relit avant de lancer un run. Ne pousse PAS les queries directement dans le projet sauf demande explicite.

> ⚠️ **Le piège à éviter (retour terrain) : la génération mécanique `template × segment`.** Elle produit des phrases correctes mais **robotiques, répétitives et non naturelles** (« vaut le plus le coup en ce moment » en boucle), des fautes d'accord, et des cellules « Generic » de remplissage. Écris les questions **une par une**. N'utilise du code (Python/run_code) QUE pour **assembler/valider le CSV**, jamais pour fabriquer la formulation.

## Les 5 règles de NATURALITÉ (non négociables)

1. **Toujours une question.** Une phrase interrogative qu'un internaute tape vraiment. **Jamais de style mots-clés** (« Meilleure petite voiture pas chère » → « Quelle petite voiture pas chère à l'achat ? »).
2. **Zéro vouvoiement.** Formulation **impersonnelle** ou langage utilisateur naturel. Jamais « recommandez-vous » → « Quels modèles sortent du lot ? », « Quelle est la meilleure… ? ».
3. **Variété réelle.** Aucune tête de question répétée en boucle. Varier tournures, angles et formats (question directe, contrainte budget en €, contexte d'usage, profil, critère précis…). Si deux lignes commencent pareil, réécris.
4. **Pas de patron artificiel.** Interdit : « X ou Y : laquelle choisir ? ». À la place : « Vaut-il mieux X ou Y pour… ? », « X ou Y, lequel est plus fiable ? ».
5. **Grammaire relue par langue.** Écrire et valider d'abord en une langue, **puis traduire de façon naturelle** (jamais mot-à-mot). Corriger accords/superlatifs (pas de « les meilleures voiture », pas de « the most safe » → « the safest »).

## Étape 0 — Bootstrap MentionLab (obligatoire, dans l'ordre)

Le serveur MCP MentionLab expose ~110 outils, beaucoup masqués. Utilise `search_tools(keywords)` puis `describe_tool(name)` pour révéler un outil, ou `run_code` pour appeler les outils read-only en lot.

1. `get_user_info` — vérifie l'auth.
2. `list_all_projects` — chaque résultat porte `projectId` ET `organisationId`.
3. `set_active_context(projectId)` — l'org se résout automatiquement ; ensuite tu peux omettre les IDs.
4. `get_last_execution_date` — ancre de fraîcheur des données.

## Étape 1 — Choisir le(s) projet(s) / le scope

Si l'utilisateur n'a pas nommé le projet, liste les projets et demande lequel. Puis `set_active_context`.

**Scope par date de création (ex. « repos créés entre le 15 et le 22 juin ») :** `github_list_repos` **ne renvoie PAS la date de création** → ne devine pas. Demande à l'utilisateur la liste exacte des repos concernés (ou croise via le premier commit si l'info est dispo). Propose comme indice les repos **sans projet MentionLab existant**.

**Plusieurs sites :** génère **UN site, présente-le pour validation, puis enchaîne** un par un. Ne sors pas 6 fichiers d'un coup tant que le 1er n'est pas validé (formulations, tags, répartition).

## Étape 2 — Lire le contexte du projet (pour la dérivation hybride)

Avant de proposer quoi que ce soit, lis :
- `get_project` → description, website, industry, nameAliases (la marque), blackListAliases.
- `list_entities` → la marque propre + les concurrents suivis (ça cadre le marché).
- `list_queries` + `list_tags` (paginés, via `run_code` si volumineux) → la taxonomie déjà en place et les prompts existants, pour **ne pas dupliquer** et **réutiliser les conventions de tags** (préfixes, casse, valeurs).

## Étape 3 — Proposer la taxonomie (mode HYBRIDE — défaut)

Déduis depuis la description + entities une proposition sur 6 axes (gabarit-or ING dans `reference/taxonomy.md`). Présente-la **pour validation avant génération**.

- **`CAT_`** : 2–4 macro-catégories client.
- **`TYPE_`** : personas fins (Freelancer, Famille, JeuneConducteur, Senior, Navetteur, Société…).
- **`SCAT_`** : produits/segments/besoins (Citadine, SUV, Hybride, Financing, Insurance…).
- **`CR_`** : critères de choix (Prix, Fiabilité, Coffre, Conso, Sécurité, Fiscalité…).
- **`FUN_`** : étape du cycle (Discovery, Decision, Achat, Revente…).
- **`QT_`** : Comparative / Informative (**Brand seulement si explicitement demandé**, cf. étape 4).

> **Règle d'intégrité (erreur terrain) :** `SCAT_` = **uniquement un produit/segment** ; `TYPE_` = **uniquement un persona**. **Jamais le même libellé dans les deux** (ex. « JeuneConducteur » est un `TYPE_`, le produit associé est `Citadine` en `SCAT_`). « Generic » seulement quand AUCUN tag pertinent n'existe — jamais comme remplissage par défaut.

Si l'utilisateur dit "auto", génère sans valider. S'il fournit une liste de personas, pars de la sienne.

## Étape 4 — Paramètres du run

Demande (avec des défauts sensés) :
- **Nombre de prompts par langue** (défaut 100).
- **Langues** + pays (défaut : langue/pays du projet ; en BE → FR + NL, ou FR + EN selon le projet). Pays porté par la colonne `country`, **hors de la phrase**.
- **Répartition QT** — **défaut SANS Brand** : **65 Comparative / 35 Informative / 0 Brand**. **Le Brand n'est ajouté QUE si l'utilisateur le demande explicitement** (et reste ≤ 10 %). Ne jamais descendre l'informatif à ~0.

## Étape 5 — Écrire les questions (à la main, naturelles) + tagger

Pour chaque cellule de la matrice à couvrir, **écris une vraie question** (cf. les 5 règles de naturalité en tête), puis tague-la sur les 6 axes. La matrice sert à garantir la **couverture** (chaque persona, segment, critère est représenté) — pas à fabriquer la phrase.

Par type de question :
- **Comparative** → formuler pour **forcer des noms d'entreprises/modèles** (« Quelle est la meilleure citadine à moins de 15.000 € ? »). **Ne jamais citer la marque du site.** On mesure la visibilité spontanée et le share of voice. Varier : budget, usage, profil, critère, comparaison fronto (« Vaut-il mieux… ou… ? »).
- **Informative** → la vraie question d'un utilisateur, **sans pousser de noms**, orientée vers des **familles de sources variées** (organismes officiels, tests conso, financier/TCO, marché/actu, occasion, fiscalité régionale…) avec des **marqueurs temporels** (« en 2026 », « actuellement ») sur une partie pour déclencher la recherche live. On mesure quelles **sources** le LLM cite.
- **Brand** (si et seulement si demandé) → nommer la marque. Perception/sentiment. ~10 questions ciblées.

Couverture : vérifier que `TYPE_`, `SCAT_`, `CR_` sont **réellement** peuplés (pas tous « Generic »). Si un axe est vide partout, c'est un gap à corriger, pas à masquer.

## Étape 6 — Sortir le CSV (format d'import MentionLab OBLIGATOIRE)

Format **EXACT** attendu par l'import (cf. `reference/import-template.csv` + `reference/csv_and_rules.md`) :
```
queries,language,country,tags
```
- **`queries`** : le texte de la question (en-tête au **pluriel**).
- **`language`** (fr/nl/en) · **`country`** (ISO majuscule, `BE`).
- **`tags`** : **UN seul champ** entre guillemets, tags **séparés par des virgules**, chacun **préfixé par son axe** : `"CAT_…,SCAT_…,TYPE_…,CR_…,FUN_…,QT_…"`. Les 6 axes ne sont **PAS** des colonnes séparées.

Exemple :
```
queries,language,country,tags
"Quelle citadine pas chère à l'achat pour un jeune conducteur ?",fr,BE,"CAT_Auto,SCAT_Citadine,TYPE_JeuneConducteur,CR_Prix,FUN_Decision,QT_Comparative"
```

Une ligne par prompt × langue. Calquer la casse/les préfixes des tags existants (étape 2). Sauvegarder et présenter ; récap : nb de prompts, répartition QT/TYPE/SCAT, langues, gaps. **Relecture finale anti-répétition** : si une tournure revient > 2–3 fois, réécris.

## Étape 7 — (Optionnel) Pousser + lancer + lire le positionnement

Seulement si l'utilisateur valide : pousser via `create_tags` puis `create_queries` (appel direct) ; lancer via `trigger_job` ; lire le positionnement avec `brand_overview`/`competitive_landscape`/`query_deep_dive` + `analytics_*`. **Passer la main au skill `geo-writer`** avec les segments faibles + sources citées : chaque cellule sous-performante = un brief de contenu.

## Garde-fous
- `organisationId` requis pour tout appel projet — `set_active_context` le mémorise.
- Les models qui ONT des données viennent de `get_project_models`, jamais de `llmProviders`.
- Résultat tronqué/"too large" → relance le MÊME appel dans `run_code` et agrège.
- **Ne pas dépendre du sandbox bash** pour la formulation : les queries s'écrivent à la main ; le code ne sert qu'à écrire le fichier CSV final au format `queries,language,country,tags`.
