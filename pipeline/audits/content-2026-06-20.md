# Audit QA — Domaine CONTENU & SEO/GEO — Réseau EMD

**Date :** 2026-06-20 · **Mode :** LECTURE SEULE (aucun repo de site modifié) · **Domaine audité :** CONTENU (thin content), SEO SÉMANTIQUE, GEO / STRUCTURE ARTICLE uniquement.
**Doctrine :** `skills/emd-audit/SKILL.md` (v1.5.0) + `skills/seo-geo-redaction/SKILL.md` (v1.4.1).
**Périmètre :** 9 sites « Live » / « Configuré » de `pipeline/sites.csv`. Échantillon de 2-3 articles FR par site, lus en entier. Collection canonique = `content/articles` (cms.config.ts) ; le contenu réel vit selon le site dans `content/articles` ou `content/blog/<categorie>`.

> Seuil GEO n°1 (doctrine) : **≥ 70 % de H2 en question stricte**. En dessous = flag. Thin content = corps < 800 mots. FAQ attendue = 6-7. TL;DR/aiSummary = 3-5 bullets. Année jamais en dur dans slug/title/fichier.

---

## 1. Scorecard

| Site | Statut | Art. réels | CONTENU | SEO sém. | GEO | **% H2-questions** (échantillon) | Thin/vide | Année en dur |
|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | 4 | ⚠️ | ⚠️ | ❌ | **0 %** (pilier SUV) · 86 % · 83 % | 0 | **Oui** (4 art.) |
| meilleur-suv.be | Live | 2 (+2 stubs) | ❌ | ⚠️ | ⚠️ | 100 % (1 seul complet) | 2 stubs vides | Non |
| meilleure-voiture-electrique | Live | dizaines | ✅ | ⚠️ | ⚠️ | 100 % · 100 % · 100 % | 0 | Non |
| quel-operateur-choisir.be | Live | 14 | ✅ | ⚠️ | ⚠️ | **67 %** · 80 % | 0 | Non |
| meilleur-fournisseur-energie.be | Live | 20 | ⚠️ | ⚠️ | ❌ | **50 %** · **17 %** | 1 thin + 1 doublon | **Oui** (title+fichier) |
| meilleures-assurances-auto.be | Live | 22 | ✅ | ⚠️ | ❌ | **25 %** (pilier) · 88 % | 0 | **Oui** (title/seoTitle) |
| meilleure-carte-credit.be | Live | ~61 | ✅ | ✅ | ✅ | 86 % · 86 % | 0 | Mineur (pilier) |
| meilleure-voiture-familiale.be | Configuré | 0 | ❌ | ❌ | ❌ | n/a | **9 fichiers vides** | Oui (slugs) |
| meilleure-voiture-utilitaire.be | Configuré | 1 | ⚠️ | ✅ | ⚠️ | 86 % | 0 (1 art. ~950 mots) | Non |

**Légende :** ✅ conforme · ⚠️ à corriger · ❌ bloquant. Le % H2-questions liste les articles échantillonnés ; un seul article < 70 % suffit à flagger le site en GEO.

**Speakable (JSON-LD) :** présent uniquement sur `meilleure-carte-credit.be` et `meilleure-voiture-electrique`. **Absent** sur tous les autres templates (meilleure-voiture.be, meilleur-suv.be, opérateur, énergie, assurances, utilitaire).

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleur-fournisseur-energie.be — GEO bloquant
- **GEO :** %H2-questions très bas — **50 %** (« Fournisseur d'électricité… guide 2026 ») et **17 %** (« Contrat fixe ou variable »). Très loin du seuil 70 %. FAQ sous le seuil : **4 et 5 entrées** (<6).
- **CONTENU :** 1 article thin (~**780 mots**) ; **doublon de fichier** `2026-06-02-fournisseur-gaz-electricite-moins-cher-belgique.mdx` **vs** `fournisseur-gaz-electricite-moins-cher-belgique.mdx` (même slug cible → cannibalisation + **année en dur dans le nom de fichier**).
- **SEO sém. :** maillage interne correct (3 liens dont pilier) ; mot-clé bien présent. Risque cannibalisation sur le doublon « moins cher ».
- **Année en dur :** « 2026 » dans le `title` d'un guide (le corps utilise pourtant le token dynamique `[[date]]` — incohérence).
- Bonne pratique notée : usage de `[[date]]` dans corps/FAQ/aiSummary.

### ❌ meilleure-voiture.be — GEO bloquant + duplication
- **GEO :** l'article pilier **« Meilleur SUV 2026 »** est à **0 % de H2-questions** (6 H2, 0 question : « Le marché du SUV… », « SUV urbains… », « Notre verdict »). FAQ à **5** (<6). Les 2 autres articles échantillonnés sont bons (86 %, 83 %).
- **CONTENU :** **DUPLICATION grave** — les slugs `meilleur-suv-belgique-2026` et `meilleure-voiture-electrique-2026` existent à la fois dans `content/articles` **et** `content/blog/<cat>` (deux contenus différents, deux routes rendues) → cannibalisation + duplicate content réel. Aucun article thin.
- **SEO sém. :** l'article SUV est **orphelin (0 lien interne)** ; les 2 autres sont bien maillés (3-4 liens).
- **Année en dur :** « 2026 » dans slug + title + nom de fichier des **4 articles**, alors que le repo possède `lib/utils/year.ts` (`currentYear()`).

### ❌ meilleures-assurances-auto.be — bug structured data + pilier faible
- **GEO :** très contrasté. L'article pilier (« Quelle est la meilleure assurance auto… Comparatif 2026 ») est à **25 % de H2-questions** ; l'article « AXA ou Ethias » est exemplaire (**88 %**, 7 FAQ).
- **Bug JSON-LD FAQPage :** le frontmatter FAQ utilise les clés `question`/`answer`, mais le template mappe `{ q, a }` → **les FAQ ne sont probablement PAS sérialisées** dans le schéma FAQPage (Question/Answer vides). Impact GEO/SEO élevé, vraisemblablement sur tous les articles assurances.
- **CONTENU :** articles longs (1550-2200 mots), aucun thin. Cannibalisation inter-catégories à arbitrer : paires de slugs voisins (km, jeune conducteur, omnium) entre `comparatifs/`, `types-assurance/`, `jeunes-conducteurs/`.
- **SEO sém. :** article pilier `meilleure-assurance-auto-belgique` **sans aucun lien interne dans le corps** (orphelin ; maillage uniquement via `related` frontmatter).
- **Année en dur :** « 2026 » dans plusieurs `title`/`seoTitle`.

### ❌ meilleure-voiture-familiale.be (Configuré) — contenu non démarré
- **9 fichiers .mdx tous vides (0 octet)** dans `content/blog/<cat>` ; `content/articles` = `_example.mdx` seul. **0 article réel.** Rien à indexer/mesurer (CONTENU/SEO/GEO ❌).
- Plusieurs noms de fichiers/slugs contiennent « 2026 » en dur — à corriger avant rédaction.
- Action : site à l'état de coquille ; rédiger au moins le pilier avant toute promotion.

### ❌→⚠️ meilleur-suv.be — site largement vide
- **CONTENU ❌ :** sur 4 fichiers blog, **2 sont des stubs `draft:true` vides** (`meilleur-suv-compact-belgique`, `meilleur-suv-7-places-belgique`). `content/articles` ne contient que `_example.mdx` (désalignement CMS).
- **GEO ⚠️ :** le seul article complet échantillonné (« Meilleur SUV électrique ») est exemplaire — **100 % H2-questions**, FAQ 7, pas d'année en dur — mais **aiSummary à 6 bullets** (hors plage 3-5). La majorité du site n'a aucun contenu.
- **SEO sém. :** bon sémantiquement, mais **0 lien interne** (orphelin), aggravé par des cibles de maillage inexistantes (stubs vides).

### ⚠️ quel-operateur-choisir.be
- **GEO :** 1 article à **67 %** de H2-questions (« Quel opérateur mobile choisir ») — juste sous le seuil ; l'autre à 80 %. FAQ 7 partout, réponse-first nette, sous-titres H3 souvent en question. aiSummary à 5 bullets (limite haute).
- **CONTENU ✅ :** articles riches (>1100 mots), pas de thin.
- **SEO sém. :** maillage correct (2-4 liens dont pilier) ; **cannibalisation potentielle** : paires `choisir` vs `moins-cher` en mobile, et `meilleur-operateur-internet` vs `quel-operateur-internet-choisir`.

### ⚠️ meilleure-voiture-electrique — qualité ✅, maillage et lead à corriger
- **CONTENU ✅ :** site le plus fourni (dizaines d'articles, sous-dossiers par catégorie), aucun thin (>1400 mots). Pas de duplication.
- **GEO ⚠️ (proche ✅) :** **100 % H2-questions** sur les 3 articles, FAQ 6-7, `tldr` 3 bullets, pas d'année en dur. **JSON-LD le plus riche du réseau** (Article + wordCount + mentions + Person + Breadcrumb + **Speakable** + FAQPage). **Accroc :** les leads sont **anecdotiques** (« Samedi dernier, parking du Colruyt… ») au lieu d'une réponse directe 40-60 mots → affaiblit l'extraction IA et le Speakable (qui cible le 1er paragraphe).
- **SEO sém. ⚠️ :** maillage **contextuel in-text quasi nul** (0-1 lien dans le corps) ; le bloc `related` du frontmatter compense partiellement mais ce ne sont pas des liens contextuels.

### ⚠️ meilleure-voiture-utilitaire.be (Configuré) — 1 seul article
- **CONTENU ⚠️ :** 1 article réel (~**950 mots**, juste au-dessus du seuil). Volume éditorial très faible.
- **GEO ⚠️ :** l'article est bon (**86 % H2-questions**, FAQ 7, aiSummary 5 bullets, réponse-first), mais le **template JSON-LD ne pose pas de Speakable** (breadcrumb à 2 niveaux) — à aligner sur carte-credit/électrique.
- **SEO sém. ✅ :** mot-clé cible bien présent, 1 seul H1, 3 liens internes contextuels (dans la fourchette).

### ✅ meilleure-carte-credit.be — référence du réseau
- **CONTENU ✅ :** ~61 articles, corps >800 mots, FAQ 7, pas de duplication.
- **SEO sém. ✅ :** mot-clé dans title/H1/intro/description, 1 H1, maillage riche (>4 liens dont pilier/comparer).
- **GEO ✅ :** **86 % H2-questions**, réponse-first, FAQ ≥6, aiSummary présent, **JSON-LD complet (Speakable + FAQPage + Person + Breadcrumb 4 niveaux)**, `<title>` à année dynamique (`currentYear()`).
- Réserve mineure : « 2026 » en dur dans le title/slug du pilier ; aiSummary à 3 bullets (bas de fourchette).

---

## 3. Constats transversaux

1. **GEO — H2 non interrogatifs sur les guides/piliers.** Les articles « comparatif / X vs Y » sont bons (80-100 %), mais les articles « guide / pilier » chutent (énergie 17-50 %, assurance pilier 25 %, meilleure-voiture pilier SUV 0 %, opérateur mobile 67 %). C'est le point n°1 de la doctrine et le défaut le plus répandu.
2. **Bug JSON-LD FAQPage (assurances).** Clés frontmatter `question`/`answer` non mappées par le template `{q,a}` → FAQ probablement absente du structured data. Le plus impactant à corriger.
3. **Doublons / cannibalisation.** meilleure-voiture.be (slugs identiques `content/articles` vs `content/blog`), énergie (`2026-06-02-…` vs version sans date), plus paires de mots-clés voisins (opérateur, assurance).
4. **Contenu non démarré.** meilleure-voiture-familiale.be (9 fichiers à 0 octet) et meilleur-suv.be (2 stubs vides) — l'enjeu réseau n'est pas la qualité (élevée là où il y a du contenu) mais le **volume / l'amorçage**.
5. **Année en dur.** Présente sur meilleure-voiture.be (4 articles), énergie (title+fichier), assurances (title/seoTitle), familiale (slugs), carte-credit (pilier) — alors que `currentYear()` / `[[date]]` existent.
6. **Speakable absent** sur la majorité des templates (seuls carte-credit et électrique l'émettent) — opportunité GEO commune.
7. **Maillage interne contextuel faible** quasi partout (plusieurs piliers orphelins, 0 lien in-text) ; doctrine 2-4 liens contextuels dont 1 pilier rarement atteinte.
8. **Désalignement CMS.** Sur plusieurs sites, la collection canonique `content/articles` (déclarée dans cms.config.ts) est vide, le contenu réel vivant dans `content/blog` — le CMS pointe vers le mauvais dossier.

---

## 4. Top des actions prioritaires

1. **Réécrire les H2 des guides/piliers en questions** pour repasser ≥ 70 % : énergie (17 % et 50 %), assurance pilier (25 %), meilleure-voiture pilier SUV (0 %), opérateur mobile (67 %). *(GEO, signal n°1)*
2. **Corriger le bug FAQPage du site assurances** (mapping `question`/`answer` → `q`/`a`) pour que les FAQ soient réellement émises en JSON-LD. *(GEO/SEO, fort impact, faible effort)*
3. **Dédupliquer** : supprimer le doublon `content/blog` ↔ `content/articles` de meilleure-voiture.be (2 slugs) et le doublon de fichier `2026-06-02-…` du site énergie ; arbitrer les paires cannibales (opérateur, assurance).
4. **Amorcer le contenu** des sites « Configuré » vides : meilleure-voiture-familiale.be (9 fichiers vides) et finir les 2 stubs de meilleur-suv.be — au minimum le pilier de chaque cluster.
5. **Supprimer les années en dur** (slug/title/fichier) en généralisant `currentYear()` / `[[date]]` ; corriger FAQ < 6 (énergie) et aiSummary hors plage (suv 6 bullets) ; ajouter **Speakable** + réponse-first aux leads anecdotiques (meilleure-voiture-electrique).

---

## 5. Résumé exécutif

- **Sites audités :** 9 (7 Live + 2 Configuré), domaine CONTENU & SEO/GEO.
- **GEO ❌ (bloquant) :** 3 sites — meilleure-voiture.be, meilleur-fournisseur-energie.be, meilleures-assurances-auto.be. + 1 site sans contenu (familiale).
- **Articles thin / vides :** ~12 — 9 fichiers vides (familiale), 2 stubs vides (suv), 1 article thin ~780 mots (énergie) ; + 1 article ~950 mots limite (utilitaire).
- **Articles échantillonnés sous 70 % de H2-questions :** au moins 5 — meilleure-voiture pilier SUV (0 %), énergie « contrat fixe/variable » (17 %), énergie guide élec. (50 %), assurance pilier (25 %), opérateur mobile (67 %).
- **5 urgences :** (1) H2-questions des guides ; (2) bug FAQPage assurances ; (3) doublons/cannibalisation ; (4) amorçage contenu familiale + suv ; (5) années en dur + Speakable + leads réponse-first.
- **Référence du réseau :** meilleure-carte-credit.be (template GEO complet à propager) et meilleure-voiture-electrique (qualité éditoriale).

*Rapport généré automatiquement (tâche planifiée `emd-audit-content`). Lecture seule sur les sites ; seuls les fichiers d'audit dans `emd-methodo` ont été écrits.*
