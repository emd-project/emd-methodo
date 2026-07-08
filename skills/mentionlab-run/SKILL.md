---
name: mentionlab-run
metadata:
  version: 2.2.0
description: "Génère une grille de prompts taguée prête à importer dans un projet MentionLab (format queries,language,country,tags), puis lit le positionnement des sites dans les réponses des LLM. Utiliser quand l'utilisateur veut auditer la visibilité GEO d'une marque, créer/étendre les queries d'un projet MentionLab, monter une grille de prompts par persona/segment, ou voir comment ses sites se positionnent dans ChatGPT/Gemini/AI Overview."
---

# mentionlab-run

Tu construis une **grille de prompts instrumentée** pour un projet MentionLab : une matrice où chaque ligne isole **une cellule mesurable**. Le socle est `CAT × THEM × TYPE × FUN × QT` (les 5 axes cœur), mais si une **structure amont** (le skill `mentionlab-structure`) fournit des **namespaces additionnels** (`ATTR_`, `BRAND_`, `STY_`, `SECT_`…), tu les portes en plus — tu es **agnostique aux namespaces**. Le texte de chaque query reste **une vraie question d'internaute, simple et naturelle** — on définit l'objectif, on écrit la question, PUIS on la tague. La matrice est une **checklist de couverture**, pas un générateur de phrases.

> 🏷️ **OBJECTIF BUSINESS EMD (prioritaire — lire en premier).** EMD monétise en **vendant des mentions** : une marque paie pour être citée favorablement dans un contenu qui alimente ensuite les réponses des LLM. Les requêtes **qui nomment une marque ou un modèle** (« avis Peugeot 3008 », « Peugeot 3008 vs Tucson », « meilleure alternative au 3008 », « Revolut ou N26 ») sont donc des requêtes **à FORTE valeur** : ce sont celles sur lesquelles EMD veut se positionner comme **source citée**. Pour un projet EMD, ces requêtes de marque/modèle sont un **seau de première classe, à générer explicitement** — jamais à exclure. On les tague avec le namespace `BRAND_<Marque_ou_Modele>` pour que l'analyse par tag mesure la visibilité EMD **sur les requêtes de marque séparément** de la visibilité spontanée. (Voir étape 5, sous-types Comparative et Informative « de marque ».)

> 🔗 **Passation depuis `mentionlab-structure`.** Si l'utilisateur arrive avec une matrice/structure d'étude déjà cadrée (axes, #queries par tag, paliers, namespaces), pars de cette structure : elle fixe la **couverture** (quels tags, combien de queries chacun) et la **liste des namespaces** à préserver. Ton travail est alors de **rédiger les queries** qui remplissent cette structure, en conservant tous les préfixes fournis.

Livrable par défaut : un **CSV à valider puis importer** au format **`queries,language,country,tags`** (cf. étape 6). L'humain relit avant tout run. Ne pousse PAS les queries dans le projet sauf demande explicite.

> ⚠️ **Ce skill sert à CRÉER les queries, en amont — souvent AVANT même qu'un projet MentionLab existe.** Le livrable normal est un CSV que l'utilisateur importera lui-même. **Ne cherche donc PAS un projet dans le MCP MentionLab par défaut, et ne lance aucun appel MCP pour « retrouver » un projet qui n'existe pas encore.** Tu construis la grille à partir du **contexte fourni par l'utilisateur** (marque, site, secteur, concurrents, personas). Le MCP n'entre en jeu **que** en Cas B (étendre un projet existant, étape 2) ou à l'étape 7 (pousser/lancer, sur validation).

> ⚠️ **Méthode = génération par LLM (toi), pas concaténation mécanique.** MentionLab recommande d'utiliser un LLM pour rédiger les prompts. Tu écris donc de vraies questions naturelles avec ton jugement. Le **piège à éviter** reste la fabrication mécanique `template × segment` (assemblage de chaînes en Python) : elle produit des phrases robotiques et répétitives. N'utilise du code (Python/run_code) QUE pour **assembler/valider le CSV final**, jamais pour fabriquer la formulation.

## Les règles d'or MentionLab (doc officielle)

1. **Simplifier au maximum.** Le contexte est **inutile sauf quand on crée une nouvelle segmentation**. Exception : les **Comparative** tolèrent plus de contexte pour cadrer le terrain du client. ⚠️ « Simple » concerne la **longueur/le contexte**, PAS la variété : varier les registres et les tournures reste obligatoire (cf. règles de naturalité).
2. **Une seule typologie à la fois.** On génère Comparative OU Informative OU Branded — un lot par type (l'équivalent d'« une page LLM par type »). On ne mélange pas les intentions dans un même passage.
3. **Objectif d'abord.** Objectif projet → objectif de la question → question.
4. **Valider en EN ou FR, puis traduire** (jamais mot-à-mot).

## Les règles de NATURALITÉ (non négociables)

1. **Toujours une question ou une demande réelle.** Ce qu'un internaute tape vraiment. **Jamais de style mots-clés** (« Meilleure petite voiture pas chère » → « Quelle petite voiture pas chère à l'achat ? »).
2. **Zéro vouvoiement.** Formulation impersonnelle OU **1re personne utilisateur** (« Je… ») — jamais « recommandez-vous ».
3. **Richesse sémantique = varier les registres, pas alourdir.** « Simple » ne veut pas dire monotone : la grille doit sonner comme de vrais humains différents. **Ne pas commencer toutes les lignes par « Quel/Quelle… ».** Alterner au moins ces ouvertures :
   - **Interrogatif direct** : « Quel est le meilleur… ? », « Quelles sont les… ? »
   - **1re personne / mise en situation** : « Je suis étudiant avec un petit budget, quel laptop prendre ? », « Je cherche une citadine fiable pour aller au boulot… », « J'hésite entre un SUV et un break pour une famille… »
   - **Impératif / demande** : « Recommande-moi… », « Liste les meilleurs… », « Conseille un… »
   - **Comparatif fronto** : « Vaut-il mieux X ou Y pour… ? »
   La **1re personne est aussi la façon naturelle d'injecter le persona (`TYPE_`)** sans ajouter de contexte lourd. Aucune tête de question répétée en boucle ; si deux lignes s'ouvrent pareil, réécris.
4. **Pas de patron artificiel.** Interdit : « X ou Y : laquelle choisir ? ». À la place : « Vaut-il mieux X ou Y pour… ? ».
5. **Grammaire relue par langue.** Corriger accords/superlatifs (pas de « les meilleures voiture », pas de « the most safe » → « the safest »).

## Étape 0 — Cadrer le besoin (PAS de MCP par défaut)

Le flux par défaut **ne touche pas au MCP MentionLab**. N'appelle ni `get_user_info`, ni `list_all_projects`, ni `set_active_context`, ni `get_project` pour démarrer — il n'y a pas forcément de projet, et le but du skill est justement d'en préparer un.

Détermine dans quel cas tu es :
- **Cas A — Créer une grille (défaut).** L'utilisateur prépare des queries (nouveau projet, nouveau site, ou juste un CSV à importer). → Va directement à l'étape 1, sans MCP.
- **Cas B — Étendre un projet MentionLab existant.** L'utilisateur dit explicitement qu'un projet existe et veut réutiliser sa taxonomie / éviter les doublons. → Là seulement, lis le projet via le MCP (étape 2).

En cas de doute, considère que tu es en **Cas A** et demande avant de lancer le moindre appel MCP.

## Étape 1 — Collecter le contexte (auprès de l'utilisateur, sans MCP)

Rassemble ce qui suit — **demande-le** ou déduis-le de ce que l'utilisateur a fourni :
- **La marque / le site** à mesurer (et ses domaines).
- **Le secteur / marché** et l'offre principale.
- **Les concurrents** connus (cadre le marché et le share of voice).
- **Les personas / segments** cibles.
- **(EMD) Les marques/modèles clés du marché** à cibler dans les requêtes de marque (ex. modèles de voitures phares, néobanques nommées, fournisseurs nommés). Ce sont les entités des requêtes `BRAND_`.

Pas besoin d'un projet MentionLab pour ça. Si l'utilisateur ne fournit rien, pose 2–3 questions ciblées (marque, secteur, concurrents).

**Plusieurs sites :** génère **UN site, présente-le pour validation, puis enchaîne** un par un. Ne sors pas 6 fichiers d'un coup tant que le 1er n'est pas validé.

## Étape 2 — (Cas B uniquement) Lire un projet existant pour ne pas dupliquer

**À NE FAIRE QUE si l'utilisateur veut étendre un projet qui existe déjà.** Sinon, saute cette étape.

Bootstrap MCP dans l'ordre, puis lis la taxonomie en place :
1. `get_user_info` — vérifie l'auth.
2. `list_all_projects` — chaque résultat porte `projectId` ET `organisationId`. Si le projet n'est pas nommé, liste-les et demande.
3. `set_active_context(projectId)` — l'org se résout automatiquement.
4. `get_project` → description, website, industry, nameAliases, blackListAliases.
5. `list_entities` → la marque + les concurrents suivis.
6. `list_queries` + `list_tags` (paginés via `run_code` si volumineux) → **ne pas dupliquer** et **réutiliser les conventions de tags** (préfixes, casse, valeurs).

Le serveur MCP expose ~110 outils, beaucoup masqués : `search_tools(keywords)` puis `describe_tool(name)`, ou `run_code` pour les read-only en lot.

## Étape 3 — Proposer la taxonomie (structure officielle MentionLab)

Déduis depuis le contexte une proposition d'axes (détail + buckets dans `reference/taxonomy.md`). Présente-la **pour validation avant génération**.

- **`CAT_`** : macro-catégorie / marché (Laptop, Bank, Insurance…).
- **`THEM_`** : thème / sous-catégorie / **critère de sélection** (Generic, Price, Battery, Performance, Quality_Price, Reputation…). *(Remplace l'ancien `CR_` ; on n'utilise plus `SCAT_`.)*
- **`TYPE_`** : persona (Generic, Student, Freelancer, Family…).
- **`FUN_`** : intent (Discovery, Consideration, Decision, Purchase, Retention) **+ moment-clé** (Newcomer, First_Child, Moving_House, Claim…).
- **`QT_`** : Comparative / Informative / **Branded** (Branded seulement si demandé, cf. étape 4).
- **`BRAND_` (namespace EMD, quand une marque/modèle est nommé dans la query)** : `BRAND_<Marque_ou_Modele>` (ex. `BRAND_Peugeot3008`, `BRAND_Revolut`). À poser sur **toute** ligne qui nomme un produit/marque tiers — Comparative de marque OU Informative « avis <modèle> ». Permet d'isoler la visibilité EMD sur les requêtes de marque. N'est PAS un `QT_` : une requête de marque reste `QT_Comparative` ou `QT_Informative` selon l'intention.

> **Intégrité :** `THEM_` = thème/critère/sous-catégorie ; `TYPE_` = persona uniquement. **Jamais le même libellé dans les deux.** `Generic` seulement quand « pas de segmentation » est le vrai sens — jamais comme remplissage.

> **Namespaces additionnels (agnosticisme).** Les 5 cœur sont le socle minimal. Si le contexte — surtout une structure venue de `mentionlab-structure` — définit des préfixes **en plus** (`BRAND_`, `ATTR_`, `STY_`, `SECT_`, `INT_`, `KM_`, ou tout préfixe custom), **conserve-les tels quels** : ce sont des tags MentionLab valides que l'analyse par tag exploite. Ne les fonds pas dans les 5 cœur, ne les jette pas. Chaque ligne porte donc les 5 cœur **plus** les additionnels pertinents pour sa cellule.

Si l'utilisateur dit "auto", génère sans valider. S'il fournit une liste de personas, pars de la sienne. En Cas B, calque les préfixes/valeurs existants. *(Variante riche à 6 axes ING dispo dans `reference/taxonomy.md` si maille très fine demandée.)*

## Étape 4 — Paramètres du run

Demande (avec des défauts sensés) :
- **Nombre de prompts par langue** (défaut 100 ; les méta-prompts génèrent typiquement ~30 par catégorie pour le Comparative, ~10 pour le Branded).
- **Langues** + pays (défaut : langue/pays du marché ; en BE → FR + NL, ou FR + EN selon le cas). Pays porté par la colonne `country`, **hors de la phrase**.
- **Répartition QT** — deux profils :
  - **Défaut générique (hors EMD)** : **65 Comparative / 35 Informative / 0 Branded**. Le Branded n'est ajouté **QUE si demandé** (≤ 10 %). Ne jamais descendre l'informatif à ~0.
  - **Profil EMD (vente de mentions) — recommandé pour tout projet EMD** : réserver une part explicite aux **requêtes de marque** `BRAND_`. Répartition indicative sur 100/langue : **~45 Comparative générique** (sans marque — mesure la visibilité spontanée / le head nu) · **~25 Comparative de marque** (X vs Y nommés, « meilleure alternative à <modèle> », taguées `BRAND_`) · **~15 Informative de marque** (« avis <modèle> », « <modèle> fiable ? », taguées `BRAND_`) · **~15 Informative générique** (sources, sans nom). Ajuster selon le marché. Le but : mesurer côte à côte la visibilité **spontanée** ET la visibilité sur les **requêtes de marque monétisables**.

## Étape 5 — Générer les questions, une typologie à la fois

Génère **un type à la fois** en t'appuyant sur les **méta-prompts officiels** (`reference/meta-prompts.md`). Pour chaque cellule à couvrir, écris une vraie question simple (règles de naturalité + règles d'or), puis tague-la. La matrice garantit la **couverture** (chaque persona, thème, intent représenté) — pas la phrase.

- **Comparative générique (sans marque)** → le prompt **ne cite aucune marque**, mais se **calibre sur le terrain du client** (sa catégorie + ses `THEM_`) pour que la réponse de l'IA incite à citer le client. On mesure la visibilité spontanée / share of voice.
  - **Mécanique** : traduis les **forces / différenciateurs du client en critères génériques** (`THEM_`) dans la question. Ex. client fort sur le rapport qualité-prix familial → « Quelle est la meilleure X familiale au meilleur rapport qualité-prix ? ». Aucune marque nommée ; la réponse attendue inclut le client.
  - Formuler pour **forcer des noms** : « what is the best… », « recommend… », « list the best… ». **Éviter les segments où le client n'a aucune légitimité**.
- **Comparative de marque (EMD — namespace `BRAND_`)** → le prompt **nomme un ou plusieurs modèles/marques tiers** : fronto « <ModèleA> vs <ModèleB> », « meilleure alternative à <modèle> », « <marque> ou <marque> pour… ». On mesure si le site EMD remonte comme **source** sur les requêtes de marque (les requêtes monétisables). Tague `QT_Comparative` + `BRAND_<chaque modèle nommé>`. **Ne jamais nommer la marque du site EMD lui-même** (ça, c'est du Branded, cf. plus bas).
- **Informative générique** → vraie question fréquente, **sans pousser de noms**, avec des **marqueurs temporels** (« in 2026, today, currently ») sur une partie. On mesure quelles **sources** l'IA cite.
- **Informative de marque (EMD — namespace `BRAND_`)** → question qui **nomme un modèle/produit tiers** : « avis <modèle> », « <modèle> est-il fiable ? », « prix / autonomie / problèmes du <modèle> ». Intention informationnelle sur une entité nommée = requête monétisable très fréquente. Tague `QT_Informative` + `BRAND_<modèle>`.
- **Branded** (si et seulement si demandé) → **on nomme explicitement le site/la marque du client EMD** (ex. « Meilleure Voiture »). Perception/sentiment du client. **Seul type** où le prompt cite la marque **du client**. Qualité > quantité (~10). À distinguer nettement des requêtes `BRAND_` ci-dessus, qui nomment des **tiers**.

Couverture : vérifier que `THEM_`, `TYPE_`, `FUN_` sont **réellement** peuplés (pas tous « Generic »). Un axe vide partout = un gap à corriger, pas à masquer.

## Étape 6 — Sortir le CSV (format d'import MentionLab OBLIGATOIRE)

Format **EXACT** (cf. `reference/import-template.csv` + `reference/csv_and_rules.md`) :
```
queries,language,country,tags
```
- **`queries`** : le texte de la question (en-tête au **pluriel**).
- **`language`** (fr/nl/en) · **`country`** (ISO majuscule, `BE`).
- **`tags`** : **UN seul champ** entre guillemets, tags **séparés par des virgules**, chacun **préfixé par son axe**. Socle = les 5 cœur `"CAT_…,THEM_…,TYPE_…,FUN_…,QT_…"`. **Si la ligne nomme un modèle/marque tiers (EMD), ajoute `BRAND_<entité>`** (une par entité nommée). Idem pour tout autre namespace additionnel fourni par la structure amont (`ATTR_`, `STY_`…) — porte l'ensemble sans en perdre un seul. Les axes ne sont **PAS** des colonnes séparées.

Exemples :
```
queries,language,country,tags
"What is the best laptop for a student on a tight budget?",en,BE,"CAT_Laptop,THEM_Price,TYPE_Student,FUN_Decision,QT_Comparative"
"Le Peugeot 3008 est-il fiable après 100 000 km ?",fr,BE,"CAT_Auto,THEM_SUV,THEM_Fiabilite,TYPE_Famille,FUN_Consideration,QT_Informative,BRAND_Peugeot3008"
"Vaut-il mieux un Peugeot 3008 ou un Hyundai Tucson pour une famille ?",fr,BE,"CAT_Auto,THEM_SUV,THEM_Espace,TYPE_Famille,FUN_Decision,QT_Comparative,BRAND_Peugeot3008,BRAND_HyundaiTucson"
```
Les 2ᵉ/3ᵉ lignes montrent le seau EMD « requêtes de marque » : les 5 cœur **plus** le(s) `BRAND_` de chaque modèle nommé. La 1ʳᵉ est une Comparative générique (aucune marque).

Une ligne par prompt × langue. En Cas B, calquer la casse/les préfixes existants. Sauvegarder et présenter ; récap : nb de prompts, répartition QT / part BRAND_ (générique vs marque) / THEM / TYPE, langues, gaps. **Relecture finale anti-répétition** : si une tournure revient > 2–3 fois, réécris. **Valider EN/FR d'abord, puis traduire.**

C'est le **livrable normal** : l'utilisateur importe ce CSV lui-même dans MentionLab (ou via l'étape 7 s'il le demande).

## Étape 7 — (Optionnel, sur validation) Pousser + lancer + lire le positionnement

Seulement si l'utilisateur valide **et** veut que tu le fasses. C'est le seul autre cas (avec le Cas B) où tu touches au MCP. Si aucun projet n'existe encore, l'utilisateur doit d'abord le créer côté MentionLab ; tu peux alors bootstrap (`get_user_info` → `list_all_projects` → `set_active_context`) puis :
- pousser via `create_tags` puis `create_queries` (appel direct) ;
- lancer via `trigger_job` ;
- lire le positionnement avec `brand_overview` / `competitive_landscape` / `query_deep_dive` + `analytics_*`. **Lire aussi la visibilité par tag `BRAND_`** (analytics_tags_*) : c'est la mesure directe de la valeur monétisable EMD (« suis-je cité sur les requêtes de marque ? »).

**Passer la main au skill `geo-writer`** avec les segments faibles + sources citées : chaque cellule sous-performante = un brief de contenu. Une cellule `BRAND_` faible = un article de marque/modèle (« avis <modèle> », « X vs Y ») à produire — le cœur de l'inventaire de mentions vendable.

## Garde-fous
- **Par défaut, aucun appel MCP MentionLab** : le livrable est un CSV construit depuis le contexte utilisateur. Le MCP ne sert qu'en Cas B (étendre) ou à l'étape 7 (pousser/lancer, sur validation).
- Ne « cherche » jamais un projet inexistant dans le MCP — c'est un non-sens vu le but du skill.
- **Simplifier les queries** ; le contexte ne s'ajoute que pour une nouvelle segmentation (et un peu plus pour les Comparative).
- **(EMD) Ne jamais exclure les requêtes de marque/modèle** : ce sont les requêtes monétisables. Les générer explicitement (Comparative de marque + Informative de marque) et les taguer `BRAND_`. Ne nommer que des **tiers** dans `BRAND_` — jamais le site EMD lui-même (ça, c'est `QT_Branded`).
- **Préserver les namespaces additionnels** fournis par la structure amont (`mentionlab-structure`) : porte-les tous dans le champ `tags`, ne réduis jamais aux 5 cœur en jetant les autres.
- **Une typologie à la fois** ; valider EN/FR puis traduire.
- (MCP utilisé) `organisationId` requis pour tout appel projet — `set_active_context` le mémorise.
- (MCP utilisé) Les models qui ONT des données viennent de `get_project_models`, jamais de `llmProviders`.
- (MCP utilisé) Résultat tronqué/"too large" → relance le MÊME appel dans `run_code` et agrège.
- **Ne pas dépendre du sandbox bash** pour la formulation : les queries se rédigent par LLM ; le code ne sert qu'à écrire le CSV final au format `queries,language,country,tags`.
