# Audit CONTENU & SEO/GEO — 2026-07-13

Domaine d'audit : **content** (CONTENU / SEO SÉMANTIQUE / GEO-structure article).
Mode : **lecture seule** sur les repos de sites.
Périmètre (cf. `emd-audit` § Périmètre) : sites de `pipeline/provisioned-log.csv` **provisionnés ≤ 14 j** et **non encore audités** par ce domaine.

- Candidats ≤14 j : `simulateur-assurance-auto.be` (provisionné le 2026-07-10)
- Ledger `pipeline/audits/audited-content.csv` : **inexistant** → aucun site déjà audité, il est créé par ce run.
- **Périmètre final : 1 site.**

---

## Scorecard

| Site | Contenu (thin) | SEO sémantique | GEO / structure | % H2-questions (échantillon) | Verdict |
|---|---|---|---|---|---|
| simulateur-assurance-auto.be | ❌ | ❌ | ⚠️ | **88 %** (art. réel) · **0 %** (article-modèle publié) | ⚠️ à corriger avant montée en charge |

Articles échantillonnés (3 = la totalité du corpus) :

| Article | Mots (corps) | H2 | H2-questions | Statut |
|---|---|---|---|---|
| `blog/comparatifs/simulateur-assurance-auto-belgique.mdx` (FR) | **736** | 8 | 7 → **88 %** ✅ | ⚠️ thin (< 800) |
| `blog/en/comparatifs/simulate-car-insurance-belgium.mdx` (EN) | **~700** | 8 | 7 → **88 %** ✅ | ⚠️ thin (< 800) |
| `blog/guides/article-modele.mdx` (+ `en/guides/article-model.mdx`) | **~350** | 10 | 0 → **0 %** ❌ | ❌ **article de démo du template publié en prod** (`draft: false`) |

**Bilan chiffré : 3 articles thin sur 3 · 1 article (×2 locales) sous 70 % de H2-questions.**

---

## Détail — simulateur-assurance-auto.be

### ❌ Bloquants / important

1. **Article de démo du template publié en production.**
   `content/blog/guides/article-modele.mdx` (+ sa version EN) porte `draft: false`, `authorSlug: ""`, `featureImage: ""` et son propre en-tête dit « À SUPPRIMER lors de l'init d'un nouveau site ». Il est servi, listé et indexable. Conséquences cumulées : thin content (~350 mots), **0 % de H2-questions**, auteur vide, contenu lorem-ipsum (« Option A / Option B », « Produit exemple », « 299 € ») et **catégorie `guides` inexistante dans `niche.config.categories`** (simulateur, comparatifs, garanties, prix, profils) → page orpheline, hors navigation et hors maillage. → **Supprimer (ou passer `draft: true`) les 2 fichiers + `content/articles/_example.mdx`.**

2. **Thin content généralisé : 3/3 articles sous 800 mots.** Le seul article réel fait **736 mots** (FR) et ~700 (EN). Il lui manque ~150-250 mots : un chapô, un tableau comparatif et une section persona suffisent à passer le seuil.

3. **Stratégie sémantique non définie — `content/mots-cles.md` est le template brut, 100 % de `TODO`.** Aucun positionnement, aucun cluster, aucun head term, aucune longue traîne, aucune liste de « requêtes à ÉVITER ». La **frontière des assets** (blog vs classement vs comparateur vs choisir) n'est donc instanciée nulle part → le risque de cannibalisation ci-dessous est structurel, pas accidentel.

4. **Cannibalisation article ↔ classement (déjà réelle sur 1 seul article).**
   - Le H2 « **Quelle est la meilleure assurance auto en Belgique en 2026 ?** » de l'article reprend le **head nu** propriété de `/classement/meilleures-assurances-auto` (dont le titre est « Top 6 des meilleures assurances auto en Belgique en 2026 »).
   - La question de FAQ « Quelle est la meilleure assurance auto en Belgique en 2026 ? » est **strictement identique** dans les deux pages (FAQPage dupliqué → PAA en concurrence avec soi-même).
   - Idem « Peut-on faire baisser le prix… » ↔ « Comment faire baisser sa prime… ».
   → L'article doit **mailler** vers le classement (il le fait, ✅ liens valides) mais **ne pas rejouer** la même requête ni la même FAQ.

5. **Année en dur partout — la doctrine impose l'année dynamique.**
   - Article : `title: "… : le guide complet 2026"`, `description` « …en 2026 », `aiSummary` « …classement 2026 », corps « en tête en 2026 ».
   - `content/data/classements.json` : `title` « …en Belgique en 2026 », `excerpt`, `intro`, `methodology` (« juillet 2026 »).
   → Contenu périmé mécaniquement au 1er janvier. Passer par `currentYear()`.

### ⚠️ Important

6. **Pas de lead / chapô réponse-first.** L'article démarre directement sur un H2 (`## Pourquoi simuler…`). La doctrine exige un **chapô de 40-60 mots répondant dès la première phrase**, avant le premier H2. (Le `description` sert de standfirst visuel mais n'est pas un lead citable dans le corps.)

7. **Aucun tableau comparatif** alors que l'article compare Ethias / AG / Belfius Direct / Yuzzu. Doctrine : « ≥ 1 tableau comparatif normé dès que le sujet compare des marques/modèles ». C'est aussi le format le plus repris par les LLM.

8. **Aucune source d'autorité datée dans l'article.** Zéro lien externe, zéro référence .be/institutionnelle (Assuralia, FSMA, Statbel, Test-Achats). Le classement, lui, cite Selectra + HelloSafe (2 comparateurs commerciaux, pas d'institutionnel) — à renforcer.

9. **JSON-LD : `Speakable` manquant.** `ArticleView.tsx` émet bien **BreadcrumbList + Article + Person (auteur, avec `jobTitle`, `url`, `description`) + FAQPage** ✅, mais pas de `speakable`. Note : le JSON-LD prend l'auteur depuis `niche.author` et **ignore `meta.authorSlug`** — l'article-modèle à `authorSlug: ""` sort donc quand même signé « Damien » (incohérence frontmatter ↔ données structurées).

10. **Mix de sujets non conforme au modèle mention.** 1 article publié, purement **informationnel-sans-persona** (« comment simuler »). La doctrine vise **~⅔ de sujets à marques/modèles × persona**. Les catégories `profils` (jeune conducteur, malussé, électrique) et `garanties` sont vides alors qu'elles portent précisément la longue traîne persona (« meilleure assurance auto pour jeune conducteur », « Ethias vs AG pour petit rouleur »). Marques citées mais **non taguées** dans le frontmatter (`tags` = mots-clés génériques, aucune marque, aucun persona) → inventaire de mentions non exploitable.

11. **Maillage interne pauvre / articles orphelins.** 3 liens internes dans l'article (classement, comparateur, simulateur) ✅ et tous valides (le slug `meilleures-assurances-auto` existe bien dans `classements.json`). Mais **aucun article ne pointe vers un autre article** (corpus = 1) et l'article-modèle est orphelin (catégorie fantôme).

### ✅ Conforme

- **% de H2-questions : 88 %** sur l'article réel (7/8, questions strictes : Pourquoi / Quelles / Qu'est-ce qui / Faut-il / Comment ×2 / Quelle) — **au-dessus du seuil de 70 %**, FR comme EN.
- **Réponse-first par H2** : chaque H2 ouvre par une réponse directe < 60 mots, citable telle quelle. Bien fait.
- **FAQ-bloc : 6 questions** (seuil 6-7) ✅, réponses ≤ 4 phrases ✅, FR + EN.
- **TL;DR / `aiSummary` : 4 bullets chiffrés** dans le frontmatter (jamais en dur dans le corps) ✅.
- **Accords de genre** (`entityGender: 'f'`) : « les **meilleures** assurances auto », « **Quelle** assurance… », « une omnium complète », `classements.json → "genre": "f"`. **Aucun masculin par défaut détecté.** ✅
- **Parité FR/EN** de l'article réel : structure, FAQ, aiSummary et liens localisés (`/en/classement/…`) miroir exact ✅.
- **Page classement ≥ 1000 mots** (~1 400 mots : intro + TL;DR + critères + méthodologie + sources + 5 sections + 6 items verdict/pros/cons/bestFor) ✅ — et **6 marques réelles** comparées factuellement, sans affiliation ✅.
- H1 sans année dans le slug ✅ ; slugs propres ✅.

---

## Top des actions prioritaires

1. **Supprimer l'article de démo du template** (`blog/guides/article-modele.mdx`, `blog/en/guides/article-model.mdx`, `content/articles/_example.mdx`) — un contenu lorem-ipsum à 0 % de H2-questions est en ligne. *(❌ n°1)*
2. **Remplir `content/mots-cles.md`** (clusters, head terms, longue traîne persona, requêtes à ÉVITER) — sans ça, la cannibalisation se reproduira à chaque article. *(❌)*
3. **Dé-cannibaliser l'article vs le classement** : retirer/reformuler le H2 « Quelle est la meilleure assurance auto… 2026 » et la FAQ dupliquée ; garder le lien vers le classement. *(❌)*
4. **Basculer toutes les années en dynamique** (`currentYear()`) dans le frontmatter de l'article, ses `aiSummary`, et `content/data/classements.json` (title/excerpt/intro/methodology). *(❌)*
5. **Épaissir l'article à ≥ 800 mots** : ajouter un chapô réponse-first (40-60 mots), un tableau comparatif des 4 assureurs cités, et 1-2 sources .be datées (Assuralia / Statbel / FSMA). *(⚠️)*

Puis, pour le prochain cycle éditorial : passer au **ratio ⅔ marques × persona** en attaquant les catégories vides (`profils`, `garanties`) — « meilleure assurance auto pour jeune conducteur », « Ethias vs AG », « quelle omnium pour une voiture de 6 ans » — et **taguer marques + persona** dans le frontmatter.

---

*Audit généré par la tâche planifiée `emd-audit-content` — doctrine : `skills/emd-audit/SKILL.md` v1.6.0 + `skills/seo-geo-redaction/SKILL.md` v1.5.1.*
