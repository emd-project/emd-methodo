# Audit QA — Domaine CONTENU & SEO/GEO — Réseau EMD

**Date :** 2026-07-04 · **Mode :** LECTURE SEULE (aucun repo de site modifié) · **Domaine audité :** CONTENU (thin content), SEO SÉMANTIQUE, GEO / STRUCTURE ARTICLE uniquement.
**Doctrine :** `skills/emd-audit/SKILL.md` (v1.5.0) + `skills/seo-geo-redaction/SKILL.md` (v1.5.1).
**Périmètre :** 13 sites « Live » / « Configuré » de `pipeline/sites.csv` (10 Live + 3 Configuré). Échantillon de 2-3 articles FR par site, lus en entier, source réellement rendue (pas le fichier au bon nom).
**Nouveauté vs 2026-06-27 :** +2 sites dans le périmètre — **meilleure-fibre-internet.be** et **meilleur-fournisseur-electricite.be** (statut Configuré).

> Seuil GEO n°1 (doctrine) : **≥ 70 % de H2 en question stricte** (Faut-il / Quel / Comment / Pourquoi / Est-ce que / Quand / Où / « X vs Y »). En dessous = flag. Thin content = corps < 800 mots. FAQ attendue = 6-7. TL;DR/aiSummary = 3-5 bullets. Année jamais en dur dans slug/title/fichier.

---

## 1. Scorecard

| Site | Statut | Art. réels | CONTENU | SEO sém. | GEO | **% H2-questions** (échantillon) | Thin/vide | Année en dur |
|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | ~16 | ⚠️ | ⚠️ | ⚠️ | 75 % · **0 %** · 75 % | 1 (~850 mots) | **Oui** (slugs) |
| meilleur-suv.be | Live | 9 | ✅ | ✅ | ✅ | 100 % · 100 % · 100 % | 0 | Non |
| meilleure-voiture-familiale.be | Live | 8 | ✅ | ✅ | ✅ | 100 % · 83 % · 100 % | 0 | slug (1) |
| meilleure-voiture-utilitaire.be | Live | 8 | ✅ | ✅ | ✅ | 86 % · 88 % · 88 % | 0 | Non |
| meilleure-voiture-7-places.be | Live | ~5 | ✅ | ⚠️ | ✅ | 75 % · 88 % · 89 % | 0 | **Oui** (pilier/slug) |
| meilleure-voiture-electrique | Live | 100+ | ✅ | ✅ | ⚠️ | 83 % · **67 %** · **50 %** | ~1 (~624 mots) | Partiel |
| quel-operateur-choisir.be | Live | ~29 | ✅ | ✅ | ✅ | 86 % · 100 % | 0 | Non |
| meilleure-fibre-internet.be | Configuré | **2** | ❌ | ⚠️ | ✅ | 86 % · 83 % | **site quasi vide** | H1 (1) |
| meilleur-fournisseur-energie-be | Live | 31 | ✅ | ⚠️ | ⚠️ | 100 % · 100 % · **40 %** | 0 | Non |
| meilleur-fournisseur-electricite.be | Configuré | 6 | ⚠️ | ✅ | ✅ | 100 % · 100 % | 0 | Non |
| meilleures-assurances-auto.be | Live | 32 | ✅ | ✅ | ✅ | 100 % · 88 % | 0 | **Oui** (titres) |
| meilleure-carte-credit.be | Live | 67 | ✅ | ✅ | ✅ | 86 % · 86 % | 0 | title (dyn.) |
| meilleure-neobanque.be | Configuré | ~10 | ✅ | ✅ | ✅ | 88 % · 88 % | 0 | slug (1) |

**Légende :** ✅ conforme · ⚠️ à corriger · ❌ bloquant. Un seul article échantillonné < 70 % suffit à flagger le site en GEO.

**JSON-LD (transversal) :** le template réseau génère de façon fiable **BreadcrumbList + Article + Person (auteur nommé) + FAQPage** (conditionnel au champ `faq`) sur les 13 sites. Aucun « la rédaction » dans le schéma. **Aucun JSON-LD FAQ/Person absent** → aucun ❌ JSON-LD ce cycle.

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleure-fibre-internet.be (Configuré) — site quasi vide
- **CONTENU ❌ (bloquant) :** **2 articles réels seulement** (Proximus fibre, Digi fibre). Gabarit `article-modele.mdx` en `draft:true`, `content/articles/` = `_example` seul.
- **GEO ✅ :** les 2 articles sont conformes — 86 % et 83 % de H2-questions, réponse-first, aiSummary 3, FAQ 6-7, JSON-LD Article+FAQPage+Person (auteur `nicolas`).
- **SEO sém. ⚠️ :** maillage pauvre (seulement vers `/classement/...`) ; **année en dur** « 2026 » dans le H1/title Proximus.

### ⚠️ meilleur-fournisseur-energie-be — bug `[[date]]` en frontmatter + article à 40 %
- **GEO ⚠️ (nouveau) :** `[[date]]` n'est expansé que sur le corps, pas sur le frontmatter → « [[date]] » littéral dans l'encadré IA et le **FAQPage JSON-LD** (`luminus-ou-totalenergies`, `electricite-verte`).
- **GEO ⚠️ (H2) :** `electricite-verte` à **40 %** (2/5) ; pilier `changer-fournisseur` et `luminus` à 100 %.
- **SEO sém. ⚠️ :** doublon `2026-06-02-fournisseur-gaz-electricite-moins-cher-belgique.mdx` / `fournisseur-gaz-electricite-moins-cher-belgique.mdx` à confirmer neutralisé.
- **CONTENU ✅ :** 31 articles, aucun thin, maillage dense.

### ⚠️ meilleure-voiture.be — article SUV hors doctrine + orphelin
- **GEO ⚠️ :** `meilleur-suv-belgique-2026` à **0 %** de H2-questions (liste plate Méthode/Top 5/Verdict, modèles en `###`) ; électrique/hybride à 75 %.
- **CONTENU ⚠️ :** article SUV limite thin (~850 mots), FAQ à 4.
- **SEO sém. ⚠️ :** article SUV orphelin (0 lien sortant) ; **cannibalisation `content/articles` ↔ `content/blog` (4 slugs piliers) signalée le 2026-06-27 à revérifier**.
- **Année en dur** dans les slugs (`-2026`).

### ⚠️ meilleure-voiture-electrique — site divergent, GEO à réaligner
- **GEO ⚠️ :** `voiture-societe-electrique-2026` à **67 %**, `byd-tang-vs-kia-ev9` à **50 %** ; leads narratifs non réponse-first ; pas de champ `aiSummary` dédié (dérivé de `tldr`).
- **CONTENU ⚠️ (léger) :** `byd-tang-vs-kia-ev9` ≈ 624 mots de prose.
- **Architecture divergente :** auteur en dur dans `page.tsx`, pas de `niche.config.ts`. JSON-LD riche (Article+FAQPage+Person+Breadcrumb+Speakable).

### ⚠️ meilleur-fournisseur-electricite.be (Configuré) — qualité OK, volume faible
- **CONTENU ⚠️ :** 6 articles réels (1/catégorie), gabarit draft non compté.
- **GEO ✅ :** `mega-ou-engie` et `petit-consommateur` à **100 %**, réponse-first, aiSummary 3-5, FAQ 6-7, JSON-LD complet (auteur `julien`).
- **SEO sém. ✅ :** H1 unique, mot-clé bien placé ; maillage inter-articles à densifier.

### ⚠️ meilleure-voiture-7-places.be — liens cassés + pilier orphelin
- **SEO sém. ⚠️ :** `skoda-kodiaq-vs-peugeot-5008` — 5 liens internes en chemin racine nu → **404 attendus** ; pilier `meilleure-voiture-7-places-belgique-2026` sans lien sortant.
- **GEO ✅ :** 75 / 88 / 89 %, réponse-first, aiSummary 5, FAQ 6-7, JSON-LD complet (auteur `sophie-lambrechts`). Double JSON-LD à nettoyer sur l'article Santa Fe.
- **Année en dur** dans le slug/filename/titre du pilier.

### ⚠️ meilleure-voiture-familiale.be — un orphelin + frontmatter mort
- **GEO ✅ / SEO ✅ :** 100 / 83 / 100 %, aiSummary 5, FAQ 7, JSON-LD complet (auteur `audrey-pirard`), 1200-1250 mots.
- **⚠️ mineur :** `berlingo-vs-rifter-vs-combo` orphelin + `author: redaction` mort en frontmatter ; « 2026 » dans le slug `meilleur-break-familial-2026`.

### ✅ meilleur-suv.be — référence GEO du cluster voiture
- 3 articles à **100 %** de H2-questions, 1400-1550 mots, aiSummary 5-6, FAQ 7, ancrage BE fort, JSON-LD complet (auteur `damien-crols`), slugs evergreen. Bémol : `occasion-fiable` orphelin.

### ✅ quel-operateur-choisir.be — solide
- ~29 articles, 86-100 %, aiSummary + tldr, FAQ 7, maillage riche, JSON-LD complet (auteur `maxime-dubois`). Cannibalisation à surveiller en GSC (intents distincts).

### ✅ meilleure-voiture-utilitaire.be — solide
- 8 articles (950-1700 mots), 86-88 %, aiSummary 5, FAQ 7, réponse-first, maillage dense, JSON-LD complet (auteur `damien-lardinois`), slugs evergreen.

### ✅ meilleures-assurances-auto.be — solide
- Échantillon 100 % / 88 %, 1550-1750 mots, FAQ 6-7, maillage 3-5 liens, JSON-LD complet (auteur `thomas-renard`). **⚠️ :** année en dur dans le pilier ; vérifier mapping `tldr`→`aiSummary`. Le flag `bonus-malus` à 25 % du 2026-06-27 non reconfirmé (ré-échantillon à 88 %).

### ✅ meilleure-carte-credit.be — template GEO mature
- Échantillon 86 % / 86 %, 1650-2100 mots, FAQ 7, JSON-LD complet + **Speakable** (auteur `sophie-laurent`), année dynamique. **⚠️ :** cannibalisation légère hub vs guides ; sous-dossier `neobanques/` (comparatifs) flaggé ~20 % le 2026-06-27 — hors échantillon, à recontrôler.

### ✅ meilleure-neobanque.be (Configuré) — progrès net de volume
- **~10 articles réels** (vs 3 au 2026-06-27). Échantillon à 88 %, 1550-2200 mots, aiSummary 4, FAQ 6-7, sources citées, JSON-LD complet (auteur `maxime-vanderlinden`). **⚠️ :** maillage mince ; « 2026 » en dur dans le slug (URL périmable).

---

## 3. Constats transversaux

1. **GEO — le seuil des 70 % de H2-questions reste le défaut n°1**, concentré sur les guides descriptifs/procéduraux et certains comparatifs « X vs Y ». 4 articles échantillonnés sous le seuil ce cycle.
2. **Nouveau bug GEO — `[[date]]` non expansé en frontmatter** (énergie) : littéral « [[date]] » dans l'encadré IA et le FAQPage JSON-LD.
3. **JSON-LD sain partout** : Article + FAQPage + Person (auteur nommé) sur les 13 sites — aucun ❌ JSON-LD.
4. **Sites Configuré à contenu insuffisant :** fibre-internet (2 → ❌), electricite (6), neobanque (~10, en progrès).
5. **Liens internes cassés / orphelins :** 7-places (chemins nus → 404 + pilier orphelin) ; orphelins isolés (voiture SUV, suv occasion, familiale Berlingo).
6. **Années en dur** dans slugs/titres : voiture, 7-places, familiale, neobanque, assurances, fibre.
7. **Écarts d'architecture :** meilleure-voiture-electrique diverge du template ; `author: redaction` mort sur familiale.
8. **Angles morts d'échantillonnage :** flags 2026-06-27 sur assurances `bonus-malus`, carte-credit `neobanques/`, voiture cannibalisation — non confirmés/infirmés ce cycle, à recontrôler ciblé.

---

## 4. Top des actions prioritaires

1. **meilleure-fibre-internet.be (❌) :** produire du contenu (2 articles pour un site Configuré) ; retirer « 2026 » du H1 Proximus ; densifier le maillage.
2. **meilleur-fournisseur-energie-be :** corriger le bug `[[date]]` en frontmatter ; réécrire les H2 de `electricite-verte` (40 % → ≥ 70 %) ; confirmer la neutralisation du doublon.
3. **meilleure-voiture.be :** réaligner l'article SUV (0 % → ≥ 70 %), l'étoffer + FAQ 6-7 + liens sortants ; revérifier la cannibalisation `content/articles` ↔ `content/blog`.
4. **meilleure-voiture-electrique :** leads réponse-first, remonter les 2 articles < 70 %, ajouter un `aiSummary` dédié, étoffer `byd-tang-vs-kia-ev9`.
5. **meilleure-voiture-7-places.be :** corriger les liens en chemin nu (→ 404), ajouter des liens sortants au pilier, nettoyer le double JSON-LD ; généraliser `currentYear()` (années en dur réseau).

---

## 5. Résumé exécutif

- **Sites audités :** 13 (10 Live + 3 Configuré). **+2 vs 2026-06-27** : fibre-internet et fournisseur-electricite.
- **❌ bloquant :** 1 — **meilleure-fibre-internet.be** (CONTENU : 2 articles).
- **⚠️ à corriger :** meilleure-voiture.be, meilleure-voiture-electrique, meilleur-fournisseur-energie-be, meilleur-fournisseur-electricite.be, meilleure-voiture-7-places.be.
- **Sous 70 % de H2-questions (échantillon) :** 4 — voiture SUV (0 %), électrique `voiture-societe` (67 %) et `byd-tang-vs-kia-ev9` (50 %), énergie `electricite-verte` (40 %).
- **Thin content :** ~2 articles limites + fibre quasi vide.
- **JSON-LD :** Article + FAQPage + Person présents sur les 13 sites — aucun manque bloquant.
- **5 urgences :** (1) contenu fibre-internet ; (2) bug `[[date]]` + `electricite-verte` ; (3) article SUV voiture ; (4) réalignement GEO électrique ; (5) liens cassés 7-places + années en dur.
- **Références :** meilleur-suv.be, meilleure-voiture-utilitaire.be.

*Rapport généré automatiquement (tâche planifiée `emd-audit-content`). Lecture seule sur les sites ; seuls les fichiers d'audit dans `emd-methodo` ont été écrits.*
