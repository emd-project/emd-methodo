# Audit QA — Domaine CONTENU & SEO/GEO — Réseau EMD

**Date :** 2026-06-27 · **Mode :** LECTURE SEULE (aucun repo de site modifié) · **Domaine audité :** CONTENU (thin content), SEO SÉMANTIQUE, GEO / STRUCTURE ARTICLE uniquement.
**Doctrine :** `skills/emd-audit/SKILL.md` (v1.5.0) + `skills/seo-geo-redaction/SKILL.md` (v1.5.0).
**Périmètre :** 11 sites « Live » / « Configuré » de `pipeline/sites.csv` (10 Live + 1 Configuré). Échantillon de 2-4 articles FR par site, lus en entier, source réellement rendue (pas le fichier au bon nom).

> Seuil GEO n°1 (doctrine) : **≥ 70 % de H2 en question stricte** (Faut-il / Quel / Comment / Pourquoi / Est-ce que / Quand / Où / « X vs Y »). En dessous = flag. Thin content = corps < 800 mots. FAQ attendue = 6-7. TL;DR/aiSummary = 3-5 bullets. Année jamais en dur dans slug/title/fichier.

---

## 1. Scorecard

| Site | Statut | Art. réels | CONTENU | SEO sém. | GEO | **% H2-questions** (échantillon) | Thin/vide | Année en dur | Speakable |
|---|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | 16 | ⚠️ | ❌ | ⚠️ | 78 % · 71 % · 78 % | 0 (1 stub) | **Oui** (slugs) | Non |
| meilleur-suv.be | Live | 9 | ⚠️ | ✅ | ✅ | 80 % · 83 % · 88 % | 0 (3 stubs liés) | Non | Non |
| meilleure-voiture-7-places.be | Live | 5 | ⚠️ | ⚠️ | ✅ | 75 % · 78 % · 71 % · 83 % | 0 (1 gabarit publié) | **Oui** (pilier) | Non |
| meilleure-voiture-familiale.be | Live | 8 | ⚠️ | ⚠️ | ✅ | 83 % · 83 % | **6 fichiers 0 octet** | **Oui** (piliers) | Non |
| meilleure-voiture-utilitaire.be | Live | 8 | ✅ | ✅ | ✅ | 86 % · 89 % | 0 | Non | Non |
| meilleure-voiture-electrique | Live | 100+ | ✅ | ✅ | ✅ | 100 % · 100 % | 0 | Partiel | **Oui** |
| quel-operateur-choisir.be | Live | 23 | ✅ | ✅ | ✅ | 83 % · 83 % | 0 | Non | Non |
| meilleur-fournisseur-energie-be | Live | 24 | ✅ | ✅ | ⚠️ | 100 % · **20 %** | 1 thin (~700 mots) | Non | Non |
| meilleures-assurances-auto.be | Live | 32 | ✅ | ✅ | ⚠️ | 100 % · 88 % · **25 %** | 0 | **Oui** (titres) | Non |
| meilleure-carte-credit.be | Live | 67 | ✅ | ✅ | ⚠️ | 100 % · 100 % · **20 %** | 0 (1 slug doublon) | Non (dynamique) | **Oui** |
| meilleure-neobanque.be | Configuré | 3 | ⚠️ | ✅ | ⚠️ | 87 % · 87 % | 0 (volume faible) | Non | Non |

**Légende :** ✅ conforme · ⚠️ à corriger · ❌ bloquant. Un seul article échantillonné < 70 % suffit à flagger le site en GEO.

**Speakable (JSON-LD) :** présent uniquement sur `meilleure-voiture-electrique` et `meilleure-carte-credit.be`. **Absent** sur les 9 autres templates — y compris `meilleure-neobanque.be` dont le `ArticleView` plus récent a **perdu le Speakable** (régression vs le template de référence carte-credit).

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleure-voiture.be — cannibalisation / doublons de slugs
- **SEO sém. ❌ :** le dossier `content/articles/` duplique **4 slugs piliers** déjà présents dans `content/blog/` (`meilleur-suv-belgique-2026`, `meilleure-citadine-2026-belgique`, `meilleur-hybride-2026-belgique`, `meilleure-voiture-electrique-2026`). 2 paires sont **identiques au mot près**, 2 paires sont **2 articles différents sur le même slug/titre** → doublons d'URL + cannibalisation sur les 4 requêtes têtes de la niche. À dédupliquer/canonicaliser en priorité.
- **GEO ⚠️ :** les 3 articles échantillonnés sont au-dessus du seuil (78 % · 71 % · 78 %), lead réponse-first, FAQ 7, aiSummary 4-5 bullets — mais marge faible (citadine à 71 %).
- **CONTENU ⚠️ :** aucun thin (~1800-1950 mots), 1 stub `_example.mdx`.
- **Année en dur** dans tous les slugs/filenames (`-2026`) → dette de réécriture annuelle.

### ⚠️ meilleur-fournisseur-energie-be — GEO flag + thin
- **GEO ⚠️ :** pilier exemplaire (`fournisseur-electricite-belgique-guide` à **100 %**, 7/7) mais l'article procédural `changer-fournisseur-energie-belgique` tombe à **20 %** (1/5 ; H2 en énoncés « Les démarches, étape par étape », « Les idées reçues à oublier »). FAQ à **4** (< 6).
- **CONTENU ⚠️→ :** `changer-...` ≈ **700 mots** = thin (< 800).
- **Bonne pratique :** le doublon de fichier daté `2026-06-02-fournisseur-gaz-electricite-moins-cher-belgique.mdx` est **proprement neutralisé** (`draft:true`, titre « Archivé — doublon », filtré par le loader) — plus de cannibalisation. Année dynamique via `[[date]]`. Pas de bug FAQ (clés `q/a` cohérentes).

### ⚠️ meilleures-assurances-auto.be — GEO flag + année en dur (bug FAQ résolu)
- **GEO ⚠️ :** très contrasté. Pilier `meilleure-assurance-auto-belgique` à **100 %** (8/8), `axa-vs-ethias` à **88 %**, mais le guide `bonus-malus-assurance-auto-belgique` à **25 %** (2/8). La catégorie `guides` utilise des H2 en énoncés.
- **Bug FAQPage : RÉSOLU.** Vérifié : `lib/blog.ts parseMeta` shim `f.q ?? f.question` / `f.a ?? f.answer` → la FAQPage est bien sérialisée pour tous les articles `content/blog`. ⚠️ latent : `lib/articles.ts` (route standalone) fait un spread brut sans shim — seul `_example.mdx` y vit aujourd'hui, donc pas d'impact prod, mais à corriger par sécurité.
- **Année en dur :** « 2026 » figé dans les `title`/`seoTitle` ; le template **n'injecte volontairement pas** d'année dynamique (commentaire « PAS de year ajouté ») → staleness en 2027.
- **CONTENU ✅ :** aucun thin sur l'échantillon (1550-2200 mots).

### ⚠️ meilleure-carte-credit.be — référence, mais GEO « X vs Y » à corriger
- **GEO ⚠️ (systémique sur un cluster) :** les guides single-entity sont à **100 %** (meilleure-carte-credit 6/6 ; ING 7/7), mais les comparatifs « X vs Y » tombent à **20 %** (`revolut-vs-n26` 2/10 ; H2 descriptifs « L'IBAN belge : avantage Revolut », « Bancontact : le point faible commun »). **Tout le sous-dossier `neobanques/` (12 comparatifs) suit ce patron** → en dessous du seuil. À corriger car ce template est la référence propagée au réseau.
- **SEO sém. ⚠️ :** doublon de slug `carte-credit-independant-belgique.mdx` présent à la fois dans `blog/guides/` ET `blog/pro-business/` → cannibalisation, à dédupliquer.
- **GEO ✅ par ailleurs :** JSON-LD complet (Article + Breadcrumb + Person + FAQPage + **Speakable**), année dynamique (`currentYear()`), FAQ 6-7, aiSummary 3-5, réponse-first. Reste quelques « 2026 » en dur dans certains titres/slugs frontmatter.

### ⚠️ meilleure-neobanque.be (Configuré) — volume faible + régression Speakable
- **CONTENU ⚠️ :** seulement **3 articles réels** (2 FR complets + 1 gabarit draft) sur 5 catégories définies → 3 catégories sans article (orphelines), maillage pilier faible. (Net progrès : le site n'est plus une coquille vide.)
- **GEO ⚠️ :** les 2 articles existants sont **excellents** (87 % de H2-questions, FAQ 6-7, aiSummary 4, réponse-first, bloc Sources, maillage vers /comparer et /quiz) — **mais `ArticleView.tsx` n'émet pas de Speakable** (régression vs carte-credit). À ajouter.
- **Année :** titre sans année dynamique propre, mais « 2026 » en dur dans le slug `meilleures-neobanques-belgique-2026`.

### ⚠️ meilleure-voiture-familiale.be — 6 fichiers piliers à 0 octet
- **CONTENU ⚠️ (grave sur les piliers) :** **6 fichiers .mdx à 0 octet** (sha `e69de29` = blob git vide) — et ce sont exactement les **pages piliers / têtes de requête** : `meilleur-break-familial-2026`, `meilleur-monospace-familial-2026`, `meilleure-voiture-familiale-hybride-2026`, `meilleur-suv-familial-7-places-belgique`, `voiture-familiale-pas-chere-2026`, `monospace-7-places-pas-cher`.
- **SEO sém. ⚠️ :** les 8 articles cluster **maillent vers ces piliers vides** → liens internes cassés + clusters orphelins, autorité thématique affaiblie.
- **GEO ✅ :** les 8 articles réels sont de qualité (83 % de H2-questions, réponse-first, FAQ 6-7, aiSummary 5) — aucun thin (~1500-2200 mots).
- **Année en dur** dans les slugs des piliers ; 1 article signé `redaction` (auteur générique, hors périmètre E-E-A-T mais à noter).

### ⚠️ meilleure-voiture-7-places.be — gabarit publié + pilier orphelin sortant
- **CONTENU ⚠️ :** le gabarit `content/blog/guides/article-modele.mdx` est `draft:false` → **rendu en production** alors que son en-tête indique « À SUPPRIMER lors de l'init ». À retirer / passer en draft. Volume éditorial faible (5 articles réels).
- **SEO sém. ⚠️ :** l'article **pilier** (`meilleure-voiture-7-places-belgique-2026`) a **0 lien contextuel sortant** dans le corps (hub-and-spoke unidirectionnel : les clusters pointent vers lui, lui ne redescend ni vers les clusters ni vers `/comparer`).
- **GEO ✅ :** les 5 articles réels sont ≥ 71 %, FAQ 6-7, aiSummary 5, > 1000 mots, réponse-first (pilier à 100 %).
- **Année en dur** dans le slug + filename + titre du pilier.

### ⚠️ meilleur-suv.be — stubs liés (404 internes)
- **CONTENU ⚠️ :** 3 stubs `draft:true` de 20 octets (`meilleur-suv-compact-belgique`, `meilleur-suv-7-places-belgique`, `meilleur-suv-hybride-belgique`). Non rendus (filtrés), donc pas d'URL vide — **mais plusieurs articles publiés y pointent en lien interne** → **404 internes potentiels**. Soit publier, soit retirer les liens.
- **GEO ✅ :** meilleur des sites « voiture » sur l'échantillon (80-88 % de H2-questions), réponse-first, FAQ 7, maillage 2-6 liens dont `/comparer`.
- **Année :** slugs propres sans année (evergreen) — bon point. Pas de cannibalisation.

### ✅ meilleure-voiture-utilitaire.be — solide
- **CONTENU ✅ :** 8 articles complets (1800-2800 mots), aucun thin/vide. Architecture intentionnelle (`content/articles` standalone, alignée avec `cms.config.ts` — pas de désalignement ici).
- **GEO ✅ :** 86-89 % de H2-questions, FAQ 6-7, aiSummary 5, réponse-first, maillage dense vers le pilier. Pas d'orphelin, pas de cannibalisation, slugs evergreen.
- **Manque GEO :** pas de Speakable, pas de Person par article (auteur global), pas de `wordCount`/`mentions` dans le schéma Article (vs électrique).

### ✅ quel-operateur-choisir.be — solide
- **CONTENU ✅ :** 23 articles, aucun thin. **GEO ✅ :** 83 % de H2-questions, réponse-first, FAQ 6-7, aiSummary + tldr présents, maillage 3-5 liens contextuels dont pilier. JSON-LD Article + FAQPage + Person + Breadcrumb. Année dynamique (`currentYear()`).
- **Manque :** Speakable absent. Désalignement CMS mineur (`cms.config.ts` → `content/articles` vide, contenu réel sous `content/blog`).

### ✅ meilleure-voiture-electrique — référence éditoriale du réseau
- **CONTENU ✅ :** 100+ articles sur 13 catégories, aucun thin. **GEO ✅ :** **100 %** de H2-questions sur l'échantillon, réponse-first, tldr 3 bullets, FAQ 6, maillage `related` contextuel. **JSON-LD le plus riche du réseau** (Article + wordCount + mentions + Person + Breadcrumb + **Speakable** + FAQPage), bilingue FR/EN + hreflang.
- **Réserve mineure :** quelques slugs/titres fiscaux à « 2026 » en dur (semi-justifié car année-spécifique). Branche auditée = feature branch `claude/no-image-spec-generator-nTjFC` (source réellement rendue).

---

## 3. Constats transversaux

1. **GEO — le défaut s'est déplacé du « pilier » vers les « comparatifs X vs Y » et les « guides procéduraux ».** Net progrès depuis le 2026-06-20 : les piliers énergie (17-50 % → 100 %), assurance (25 % → 100 %) et voiture (SUV 0 % → 71-78 %) sont **corrigés**. Restent flaggés : carte-credit comparatifs neobanques (~20 %, **12 articles**), énergie « changer » (20 %), assurance guide « bonus-malus » (25 %).
2. **Speakable toujours absent sur 9/11 sites** (seuls électrique + carte-credit l'émettent), et **régression** sur le nouveau `ArticleView` de neobanque. Correctif de template unique à propager.
3. **Bug FAQPage assurances : RÉSOLU** (shim `q ?? question` dans `lib/blog.ts`). Reste un risque latent dans `lib/articles.ts` (spread brut sans shim) — à harmoniser.
4. **Doublons / cannibalisation :** meilleure-voiture.be (4 slugs piliers `content/articles` ↔ `content/blog`, dont 2 identiques) et carte-credit (`carte-credit-independant-belgique` en double `guides`/`pro-business`).
5. **Fichiers vides / non finis :** familiale (6 piliers à 0 octet + maillage cassé), suv (3 stubs liés → 404 internes), 7-places (gabarit `article-modele` publié en prod).
6. **Année en dur** persistante dans les slugs/filenames : voiture (4+), 7-places (pilier), familiale (piliers), assurances (titres figés sans mécanisme dynamique) — alors que `currentYear()` / `[[date]]` existent et sont utilisés par opérateur, énergie, électrique, carte-credit.
7. **Désalignement CMS** récurrent : `cms.config.ts` déclare la collection canonique `content/articles` alors que le contenu réel vit sous `content/blog/<cat>` (rendu OK via `lib/blog.ts`, mais l'admin CMS édite le mauvais dossier). Sites concernés : voiture, familiale, opérateur, assurances, carte-credit, neobanque. (utilitaire est correctement aligné.)
8. **Volume éditorial faible** sur neobanque (3 articles) et 7-places (5) — enjeu d'amorçage, pas de qualité (la qualité est bonne là où il y a du contenu).

---

## 4. Top des actions prioritaires

1. **Réécrire en questions les H2 des comparatifs « X vs Y » et guides procéduraux** pour repasser ≥ 70 % : carte-credit `neobanques/` (12 articles, ~20 %), énergie « changer » (20 %), assurance « bonus-malus » (25 %). *(GEO, signal n°1 — le défaut le plus répandu désormais)*
2. **Remplir ou neutraliser les 6 fichiers piliers à 0 octet** de meilleure-voiture-familiale.be (et retirer/réorienter les liens internes qui pointent vers eux). *(CONTENU/SEO, liens cassés + clusters orphelins)*
3. **Dédupliquer :** meilleure-voiture.be (4 slugs piliers `content/articles` ↔ `content/blog`) et carte-credit (`carte-credit-independant-belgique`). Nettoyer les stubs liés de meilleur-suv.be (404 internes) et dépublier le gabarit `article-modele.mdx` de 7-places. *(SEO, cannibalisation)*
4. **Ajouter Speakable au template partagé** des 9 sites qui ne l'émettent pas (corriger en priorité la régression du `ArticleView` de neobanque) ; harmoniser le shim FAQ `q ?? question` dans `lib/articles.ts`. *(GEO/SEO, fort impact, faible effort, correctif unique)*
5. **Supprimer les années en dur** (slug/title/filename) en généralisant `currentYear()` / `[[date]]` — surtout voiture, 7-places, familiale, et **assurances** (qui n'a aucun mécanisme dynamique) ; corriger FAQ < 6 + thin ~700 mots (énergie « changer »). *(SEO, dette annuelle)*

---

## 5. Résumé exécutif

- **Sites audités :** 11 (10 Live + 1 Configuré), domaine CONTENU & SEO/GEO. 2 nouveaux vs 2026-06-20 : meilleure-voiture-7-places.be et meilleure-neobanque.be.
- **GEO flaggé (article échantillonné < 70 %) :** 3 sites — meilleur-fournisseur-energie-be (20 %), meilleures-assurances-auto.be (25 %), meilleure-carte-credit.be (20 %, **+12 articles du cluster neobanques**). *(Aucun pilier bloquant : nette amélioration vs l'audit précédent où 3 piliers étaient à 0-50 %.)*
- **SEO bloquant :** 1 site — meilleure-voiture.be (cannibalisation de 4 slugs piliers).
- **Articles thin / fichiers vides :** ~10 — 6 piliers à 0 octet (familiale), 3 stubs draft liés (suv → 404 internes), 1 article thin ~700 mots (énergie) ; + 1 gabarit publié en prod (7-places).
- **Articles échantillonnés sous 70 % de H2-questions :** au moins 3 — énergie « changer » (20 %), assurance « bonus-malus » (25 %), carte-credit « revolut-vs-n26 » (20 %) ; le patron carte-credit touche **tout le sous-dossier neobanques (12 articles)**.
- **5 urgences :** (1) H2-questions des comparatifs « X vs Y » + guides procéduraux ; (2) 6 piliers vides familiale + liens cassés ; (3) doublons/cannibalisation (voiture, carte-credit, suv, 7-places) ; (4) Speakable + shim FAQ au template partagé ; (5) années en dur + thin/FAQ énergie.
- **Références du réseau :** meilleure-voiture-electrique (qualité éditoriale + JSON-LD le plus riche) et meilleure-carte-credit.be (template GEO complet — à corriger sur le patron comparatifs).

*Rapport généré automatiquement (tâche planifiée `emd-audit-content`). Lecture seule sur les sites ; seuls les fichiers d'audit dans `emd-methodo` ont été écrits.*
