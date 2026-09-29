---
name: emd-geo-loop
description: Boucle GEO mensuelle : lit les MentionMeters SECTORIELS (fan-outs + segments faibles, BE/fr) → briefs priorités-geo par site. Plus de projet MentionLab par site. Le 1er du mois.
---

Tu boucles la roue GEO d'EMD : une fois par mois, tu transformes la visibilité LLM mesurée en briefs de contenu priorisés par site.

**Changement de modèle — lis ceci avant tout.** On ne crée plus de projet MentionLab par site. On lit désormais les **MentionMeters sectoriels**, dans l'organisation **`MentionMeters`** (`019eca9c-5b96-7bfb-9cb9-867ba22c8bd8`) : 21 projets qui couvrent un secteur entier, bien plus riches qu'une grille faite à la main. Automotive porte à lui seul 1 200 requêtes et 23 600 réponses.

**MentionLab reste en LECTURE SEULE.** Jamais de `trigger_job`, jamais de création de projet, zéro quota consommé.

DOCTRINE à lire et appliquer (`github_read_file` sur `emd-project/emd-methodo`) : `skills/geo-writer/SKILL.md` (traduire un segment faible en brief) et `skills/seo-geo-redaction/SKILL.md` (structure, répartition, anti-cannibalisation).

═══ ÉTAPE 0 — BOOTSTRAP ═══

`get_user_info` → `list_all_projects`. Repère les projets de l'organisation **MentionMeters** et note leurs IDs.

Lis `pipeline/sites.csv` (emd-methodo). Traite chaque site **« Live » ou « Configuré »** (ignore « À faire »).

**Map site → secteur**, par le secteur du site :

| Secteur du site | Projet MentionMeter |
|---|---|
| voiture, SUV, citadine, familiale, 7 places, utilitaire, électrique, luxe auto | **Automotive** |
| banque, néobanque, carte de crédit, compte épargne | **Banking** |
| assurance | **Insurance** |
| énergie, électricité, gaz | **Energy** |
| télécom, opérateur, mobile, fibre, 5G | **Telecom** |
| beauté | **Beauty** |
| chocolat | **Chocolate** |
| électroménager | **Household Appliances** |

Aucun secteur correspondant → **saute le site**, note-le dans le log. Ne bricole pas un rapprochement approximatif.

═══ ÉTAPE 1 — LIRE LE SECTEUR (par projet, pas par site) ═══

Pour chaque secteur concerné, **une seule fois** — plusieurs sites partagent le même :

`set_active_context(projectId, organisationId)` puis `get_last_execution_date` pour ancrer la fenêtre (un mois glissant).

**Filtre TOUJOURS sur `countries: ["BE"]` et `languages: ["fr"]`.** Ces projets sont internationaux — sans ce filtre tu lis du marché américain.

Deux sources, complémentaires :

**a) Les FAN-OUTS** — `analytics_fanouts_top`. Ce sont les sous-questions que les LLM génèrent eux-mêmes pour répondre : une demande **observée**, pas une estimation. C'est la source la plus fraîche dont tu disposes.

Observation utile : sur Automotive, ils sont massivement **qualifiés par persona ou par usage** — « meilleures citadines jeune conducteur », « meilleurs SUV familiaux budget limité », « meilleures berlines confort longs trajets ». Ils portent presque tous l'année, et les LLM élargissent souvent la Belgique à « Europe ».

**b) Les SEGMENTS FAIBLES** — `analytics_sources_domains` (filtré `tlds: ["be"]`) pour voir qui est cité à la place du site, et `analytics_visibility_*` / `analytics_tags_*` pour les cellules où il est absent. Le site est-il dans le top belge du secteur, et sur quoi ne l'est-il pas ?

Si un appel renvoie « too large », relance-le **dans `run_code`** et agrège là-bas.

═══ ÉTAPE 2 — ANTI-CANNIBALISATION (obligatoire, AVANT de rédiger) ═══

**Un seul propriétaire par requête exacte. Cette règle prime sur l'intérêt d'un fan-out.**

Pour chaque site, lis ce qui est déjà couvert :
- `content/blog/**` et `content/articles/**` (`github_list_files`)
- `content/classements-planifies.md` s'il existe — **y compris les lignes non cochées** : elles sont déjà attribuées
- les classements publiés (`content/data/classements.json`, ou `lib/classements.ts`, ou les routes — ça varie selon les sites)
- `content/calendrier-edito.md` et `content/mots-cles.md`

**Écarte tout fan-out déjà couvert, planifié, ou trop proche d'une page existante.** Un brief est un trou réel, jamais un sujet déjà pris. En cas de doute, écarte.

═══ ÉTAPE 3 — ROUTER : classement ou article ? ═══

**La frontière passe par le FORMAT de la réponse, pas par le type de requête.**

- La réponse honnête est une **liste ordonnée d'items** → c'est un **CLASSEMENT**. Y compris qualifié par persona (« meilleures citadines jeune conducteur »). Ajoute-le à `content/classements-planifies.md` si le fichier existe, sinon signale-le dans le brief comme `type: classement`.
  **Plancher dur : 5 items réels crédibles sur le marché belge.** En dessous, n'ouvre pas.
- La réponse est de la **prose avec un point de vue**, un **face-à-face**, ou une **procédure** → **ARTICLE**.

**Répartition visée sur l'ensemble des briefs : ½ marques/modèles · ¼ evergreen pratique · ¼ informationnel.** L'evergreen pratique — « comment atténuer une rayure », « que faire après un sinistre » — est peu disputé et c'est le format que les LLM citent le plus volontiers. Ne le sacrifie pas au profit des comparatifs.

═══ ÉTAPE 4 — ÉCRIRE LES BRIEFS ═══

**5 à 10 briefs par site, maximum**, priorisés par impact. Écris (overwrite=true) `content/priorites-geo.md` dans le repo du site, **sur sa branche par défaut** (tous les sites ne sont pas sur `main`) :

```
# Priorités GEO — <mois AAAA> (injecté le <date> · source : MentionMeter <secteur>, run du <date>)
> Les rédacteurs de nuit traitent ces briefs EN PRIORITÉ (cf. seo-geo-redaction). Cocher [x] après publication.
```

puis un bloc par brief :

```
- [ ] **<head term>** — type: <classement|article> · persona: <…> · cluster: <…> · marques à citer: <…> · raison: <fan-out observé N fois | segment faiblement cité, SoV X %> · sources à dépasser: <…> · langue: fr(+en)
```

**Vérifie que le contenu est NON VIDE avant de committer.** Ne touche à aucun autre fichier. Commit : `feat(geo): priorités GEO <mois> depuis le MentionMeter <secteur>`.

═══ ÉTAPE 5 — LOG ═══

`pipeline/geo-loop/geo-loop-AAAA-MM.md` (emd-methodo) : par site → secteur lu, nombre de briefs injectés et lesquels, **combien de classements vs articles**, fan-outs retenus avec leur nombre d'occurrences, doublons écartés et pourquoi, position du site dans le top belge du secteur, sites sautés faute de secteur.

Sortie finale, 8 à 15 lignes : X sites servis, Y briefs, Z classements ajoutés, sites sautés.

═══ GARDE-FOUS ═══

- **MentionLab en lecture seule.** Jamais de `trigger_job`, jamais de création de projet.
- **Toujours filtrer `countries: ["BE"]` + `languages: ["fr"]`** — sinon tu lis le marché américain.
- Écritures autorisées **uniquement** : `content/priorites-geo.md` et `content/classements-planifies.md` dans les repos de sites ; `pipeline/geo-loop/*.md` dans emd-methodo. **Jamais** un article, un calendrier, une config, un composant.
- N'écris un fichier que si son contenu est NON VIDE. Jamais de read-modify-write sur du contenu d'article.
- **Anti-cannibalisation absolue** : un brief ne cible jamais un sujet publié, planifié, ou déjà attribué à un autre asset.
- Continue site par site même si l'un échoue ; loggue et poursuis.