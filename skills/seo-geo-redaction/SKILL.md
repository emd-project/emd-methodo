---
name: seo-geo-redaction
version: 1.6.0
description: Doctrine canonique de rédaction SEO/GEO des sites EMD — structure d'article optimisée pour le référencement Google ET la citabilité par les LLM (ChatGPT/Gemini/AI Overview), avec priorité aux sujets qui citent/comparent des marques et modèles, déclinés par persona (monétisation par mention, sans affiliation). Source de vérité unique : ≥70% de H2 en question, pattern Answer-Explanation-Example, FAQ, données structurées par type de page, workflow images (MCP nano-mentionbox), infrastructure GEO (llms.txt, robots.txt), maillage interne, sources datées, FR+EN, anti-cannibalisation par frontière head-nu/long-tail, monitoring de citabilité. À lire/appliquer pour toute rédaction d'article de blog sur un site EMD (rédaction quotidienne, article seed, correction).
---

# seo-geo-redaction — Doctrine GEO canonique EMD

Référence absolue pour la structure d'un article EMD. Optimise à la fois le **SEO** (Google.be) et la **GEO** (citabilité par les LLM). À combiner toujours avec `humaniser-fr` (anti-IA, mode production) et la voix/auteur du site.

**Avant toute écriture/commit, respecte `references/garde-fous.md`** (emd-methodo) : vérifier non-vide avant commit, jamais de read-modify-write juste après un write, ne jamais écraser du contenu existant par du vide, build-risqué = signaler.

> Le **schéma de frontmatter** (noms de champs : `aiSummary` vs `tldr`, `faq[q/a]` vs `faq[question/answer]`, `cover` vs `featureImage`, `category` vs `categorie`) **varie selon les sites**. Lis toujours `niche.config.ts` et un article existant du repo pour calquer le schéma exact. La doctrine porte sur la STRUCTURE, pas sur les noms de champs.

## Modèle de monétisation — la MENTION (pas d'affiliation)
La monétisation EMD = **vendre des mentions** : une marque paie pour être **citée favorablement** dans le contenu, qui alimente ensuite les réponses des LLM. **Il n'y a PAS d'affiliation** — aucun lien affilié, aucun tag affilié, aucun disclaimer affilié. La valeur d'un article = (1) être **cité par les LLM** (GEO) et (2) **faire surgir des marques/modèles réels** (inventaire de mentions vendable).

### Priorité de sélection des sujets (~⅔ marques-modèles / ⅓ info utile)
Règle simple et auto-suffisante (pas besoin de MentionLab) :

- **~⅔ des sujets = à MARQUES / MODÈLES** (le cœur de la valeur : mentions + citations LLM). Deux familles :
  - **Comparatifs cross-marques** : « Quels sont les meilleurs SUV ? », « Meilleures voitures électriques familiales », « X vs Y ». Font surgir **plusieurs marques**.
  - **Comparatifs intra-marque / entre modèles** : « Les meilleurs SUV de Mercedes », « La gamme électrique de BMW comparée », « BMW i4 vs Tesla Model 3 », test/avis d'un **modèle nommé**.
  → Chaque sujet de ce ⅔ doit **citer ≥ 2 marques ou modèles réels**, traités **équitablement et factuellement** (jamais de promo creuse — Google/LLM pénalisent).

- **Angle PERSONA (à privilégier sur les sujets à marques)** : décline le sujet par **persona/segment** quand c'est naturel → « meilleurs SUV **pour grandes familles** », « meilleure carte de crédit **pour étudiants** », « meilleure néobanque **pour freelances** », « meilleure voiture électrique **pour seniors** », « meilleure assurance auto **pour jeunes conducteurs** ». Ça cible la **longue traîne** (questions précises posées aux LLM, peu concurrentielles → citation plus facile) tout en gardant les marques. Aligné sur la **taxonomie persona (TYPE_)** du projet. Varier les personas d'un article à l'autre (anti-cannibalisation).

- **~⅓ des sujets = informationnels UTILES** (élargir la surface de citation GEO : « comment… », « qu'est-ce que… »).
  - **À ÉVITER / limiter STRICTEMENT à ce ⅓** : le **trop-informationnel sans marque** — how-to de niche pure (ex. « Remorquer une voiture électrique en panne en Belgique ») : **zéro marque, zéro mention, zéro citation commerciale**. Ne jamais dépasser ⅓.
  - Privilégier l'informationnel qui **ramène vers des marques/modèles** ou très citable.

- **Taguer les marques/modèles + le persona** dans le frontmatter (inventaire de mentions + segmentation).

### Frontière des assets — UN propriétaire par requête EXACTE (anti-cannibalisation)
Le blog FAIT des comparatifs marques (c'est le cœur des mentions), mais il ne **duplique jamais le head nu** d'un asset dédié. Frontière par **spécificité de requête** :

| Requête | Propriétaire | Le blog ne duplique PAS |
|---|---|---|
| head nu « les meilleurs X / top X / classement X » | **Classement** `/classement/X` (page rankée de référence) | ✗ ce terme nu |
| « meilleurs X **pour [persona/usage]** » (long-tail) | **Blog** (comparatif persona — cœur mentions) | ✓ légitime |
| « X vs Y » (2 items, face-à-face) | **Blog** | ✓ légitime |
| « comparer X » côte à côte, multi-items interactif | **Comparateur** `/comparer/X` | ✗ l'outil |
| « quel X choisir / quel X pour moi » | **Choisir / Quiz** `/choisir/X`, `/quiz` | ✗ la reco perso |
| comment / pourquoi / qu'est-ce que / prix / définition | **Blog** (informationnel, le ⅓) | — |

→ Le blog **maille vers** le classement/comparateur du cluster ; jamais deux pages sur la **même requête exacte**. Le head nu déjà pris par un asset va dans `content/mots-cles.md` → « requêtes à ÉVITER » (blog).

### Page Classement — ≥ 1000 mots
La page `/classement/X` est l'asset GEO #1 et fait **≥ 1000 mots** : intro + TL;DR + critères + méthodologie + sources + FAQ + par item verdict/pros/cons/bestFor. Contenu data-driven dans `content/data/classements.json` (+ `.en`). En dessous de 1000 mots = thin, non citable → enrichir le JSON (pas le template).

## Workflow
1. **Briefs GEO mesurés EN PRIORITÉ** : si `content/priorites-geo.md` existe dans le repo et contient des briefs **non cochés**, en traiter UN en priorité avant tout autre content gap. Ce fichier est alimenté par la **boucle MentionLab mensuelle** (`emd-geo-loop`) : chaque brief = un **segment où le site est faiblement cité par les LLM** (gap mesuré, donc plus rentable qu'un sujet choisi à l'aveugle). Respecte quand même le ratio ⅔ marques-modèles × persona / ⅓ info sur l'ensemble. **Après publication, coche le brief** (`- [x]`) dans `content/priorites-geo.md` (write idempotent, ne supprime rien d'autre). Aucun brief non coché → workflow normal ci-dessous.
2. **Content gap (sinon)** : lister les articles publiés, choisir une catégorie sous-couverte + une intention non couverte par les concurrents .be — **en appliquant le ratio ⅔ marques-modèles (× persona) / ⅓ info** ; varier le persona. UN seul sujet. Respecter la **frontière des assets** (ne pas reprendre un head nu déjà pris).
3. **SERP analysis (obligatoire)** : WebSearch sur le head term → top 3 Google.be (titre, chapô, longueur, H2, FAQ, tableau). Différenciateur documenté. Pas de SERP = run échoué.
4. **Brief + outline** avant rédaction.
5. **Rédaction** selon la structure GEO ci-dessous, via `humaniser-fr`.
6. **Images** selon le workflow ci-dessous (« Stratégie d'images »), **i18n et publication** selon les workflows du site.

## Structure GEO obligatoire
- **H1** ≤ 60 caractères, head term en tête (sans année — la marque est ajoutée par le template racine).
- **Accord en genre (OBLIGATOIRE).** Accorde TOUJOURS adjectifs/déterminants/participes au genre réel de l'entité (`niche.config.entityGender`) : entité féminine → « les **meilleures** néobanques », « **Quelle** néobanque choisir », « la néobanque **idéale** » ; masculine → « les meilleurs opérateurs ». JAMAIS de masculin par défaut sur une entité féminine. Vaut pour H1, titres, metadata, intros, sections de classement et FAQ.
- **Lead/chapô** 40-60 mots = **réponse directe** dès la première phrase.
- **TL;DR / résumé IA** : 3-5 bullets chiffrés dans le frontmatter (jamais en dur dans le corps).
- **≥ 70 % des H2 en QUESTION stricte** (Faut-il / Quel / Comment / Pourquoi / Est-ce que / Quand / Où / « X vs Y »). 30 % factuels (pas de clickbait).
- **Pattern Answer-Explanation-Example dans CHAQUE H2** : (1) réponse directe < 60 mots citable, (2) explication 2-4 §, (3) exemple chiffré / cas belge / donnée originale.
- **Signal de définition** pour le concept central. **Désambiguïsation** si la requête a plusieurs intentions.
- **≥ 3 signaux d'Expérience** : dates précises, données belges, faits négatifs, cas limites.
- **FAQ in-flow** (H3) + **FAQ-bloc finale 6-7 questions** (PAA Google.be), réponses ≤ 4 phrases.
- **Anticipation de 3-4 follow-ups** en H3.
- **≥ 1 tableau comparatif** normé dès que le sujet compare des marques/modèles.
- **Maillage interne** : 2-4 liens contextuels (slugs vérifiés), dont 1 vers la page pilier/comparateur du cluster + 1 vers l'asset commercial (classement/comparateur/choisir).
- **Anti-cannibalisation** : un seul propriétaire par requête exacte (cf. « Frontière des assets ») ; angle/persona distinct + lien vers le pilier sinon.
- **Sources d'autorité datées**, priorité .be / institutionnel (.gov.be, FSMA, BNB, IBPT, Statbel, Assuralia, Test-Achats, SPF…). Ne jamais inventer ce que disent les concurrents.
- **Année dynamique** (`currentYear()` / `[[date]]`) — jamais d'année en dur dans titre/slug/frontmatter.

## Stratégie d'images (workflow MCP nano-mentionbox)
Génération via le MCP **nano-mentionbox** (`generate_image` / `wait_for_image` / `github_push_images`). Dimensions et noms alignés sur `docs/IMAGES-WORKFLOW.md` + `lib/image-slots.ts` du site.

- **Cover (obligatoire, LA SEULE image générée)** : `[slug]-cover.webp`, 1280×720 (16:9), WebP. Prompt dérivé du H1 + voix + DA du site. Alt factuel ≤ 125 caractères, écrit à la main (jamais généré), dans toutes les locales.
- **2 images in-content RÉUTILISÉES** (aucune génération) : `<ArticleImage>` pointant vers `/images/categories/[cat].webp` et `/images/blog/category-[cat].webp`, placées ~1/3 et ~2/3 de l'article, alt traduits.
- **Workflow fire-and-poll** :
  1. Prompt ≤ 20 mots, finissant par « no text, no logos, no watermark » ; **jamais de marque réelle dans le prompt**.
  2. `generate_image` (16:9) → `wait_for_image`.
  3. Échec → UN retry en `[slug]-cover-v2` ; second échec → skip + log « Bloqué » (ne jamais bloquer la publication sur une image).
  4. Conversion WebP → `github_push_images` sous `public/blog/[categorie]/[slug]/`.
  5. Référencer dans le frontmatter/MDX (`next/image`) avec l'alt manuel (FR + locales).

## Données structurées (JSON-LD) — par type de page
| Page | Schemas obligatoires |
|---|---|
| Article | Article + Person (auteur) + BreadcrumbList + FAQPage |
| Classement | BreadcrumbList + ItemList + FAQPage |
| Comparatif | BreadcrumbList + ItemList |
| Page auteur | Person |
| Guide / pilier | Article (+ HowTo si étapes) |

Champs obligatoires d'un Article : `headline`, `datePublished`, `dateModified`, `author` (Person + `sameAs`), `publisher`, `description`, `inLanguage` (BCP 47 : `fr-BE`, `en-BE`). **Speakable** sur le TL;DR / key takeaways (ex. `.article-tldr`, `.article-key-takeaway`). `author` = l'auteur/persona du site (jamais « la rédaction »).

## Infrastructure GEO (site)
- **`public/llms.txt`** : index à destination des crawlers LLM (présent et à jour — le template le génère ; ne pas le supprimer).
- **`robots.txt`** : ne bloque AUCUN crawler IA — `GPTBot`, `ClaudeBot`/`anthropic-ai`, `PerplexityBot`, `CCBot`, `Google-Extended` doivent pouvoir crawler. Bloquer un crawler IA = renoncer aux citations (contraire au modèle mention).

## Multilingue (FR + EN par défaut)
Miroir FR + EN : slug naturel par langue, FAQ traduite, acronymes belges explicités, **alt FR + EN**, **mapping i18n** mis à jour (FR↔EN) pour le sélecteur (zéro-404) + hreflang. Doctrine complète : `references/i18n-multilingue.md` (emd-methodo).

## Monitoring de citabilité (mensuel) & refresh
- **Monitoring** : chaque mois, tester ~5 head terms publiés sur Perplexity / ChatGPT Search / Google AI Overview / Claude Search. Logger le résultat (cité / non cité / concurrent cité). Une chute de citation = ré-audit GEO de l'article concerné. La **boucle MentionLab** (`emd-geo-loop`) complète ce monitoring et alimente `content/priorites-geo.md` en briefs mesurés.
- **Refresh d'articles** : tout refresh majeur met à jour `dateModified`, les données datées, et re-vérifie sources et concurrents SERP.

## Checklist finale
- [ ] **`references/garde-fous.md` respecté** : commit seulement si contenu non-vide, aucun écrasement de contenu existant.
- [ ] **Brief `priorites-geo.md` non coché traité en priorité s'il en existe** (puis coché après publication).
- [ ] Sujet conforme : **⅔ marques-modèles (≥ 2 cités), idéalement décliné PERSONA** / ⅓ info utile ; **pas un how-to sans marque** au-delà du ⅓ ; persona varié. Marques + persona tagués. **Aucun élément affilié.**
- [ ] **Frontière des assets respectée** : ne duplique pas le head nu « les meilleurs X / top X » (= classement) ni « comparer X » (= comparateur) ni « quel X choisir » (= choisir) ; variantes persona/long-tail + « X vs Y » OK ; maille vers l'asset.
- [ ] Page classement (si c'est l'objet) **≥ 1000 mots**.
- [ ] H1 ≤ 60 car. ; lead = réponse directe.
- [ ] **Accord en genre** : adjectifs/déterminants/participes accordés au genre réel de l'entité (`niche.config.entityGender`) ; aucun masculin par défaut sur une entité féminine (H1, titres, metadata, intros, classement, FAQ).
- [ ] ≥ 70 % H2 en question ; Answer-Explanation-Example par H2.
- [ ] ≥ 3 signaux d'Expérience ; sources datées .be.
- [ ] FAQ 6-7 ; TL;DR 3-5 bullets ; tableau comparatif si comparaison de marques/modèles ; 2-4 liens internes valides.
- [ ] **Images** : 1 cover générée (workflow fire-and-poll, une seule génération) + 2 in-content réutilisées ; alt manuel dans toutes les locales.
- [ ] JSON-LD conforme au tableau par type de page (+ Speakable) ; année dynamique ; `llms.txt` et `robots.txt` intacts (aucun crawler IA bloqué).
- [ ] FR + EN + mapping i18n ; passé par `humaniser-fr` ; signé par l'auteur.
