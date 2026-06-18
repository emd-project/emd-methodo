---
name: seo-geo-redaction
version: 1.2.0
description: Doctrine canonique de rédaction SEO/GEO des sites EMD — structure d'article optimisée pour le référencement Google ET la citabilité par les LLM (ChatGPT/Gemini/AI Overview), avec priorité aux sujets qui citent/comparent des marques et modèles (monétisation par mention, sans affiliation). Source de vérité unique : ≥70% de H2 en question, pattern Answer-Explanation-Example, FAQ, données structurées, maillage interne, sources datées, FR+EN. À lire/appliquer pour toute rédaction d'article de blog sur un site EMD (rédaction quotidienne, article seed, correction).
---

# seo-geo-redaction — Doctrine GEO canonique EMD

Référence absolue pour la structure d'un article EMD. Optimise à la fois le **SEO** (Google.be) et la **GEO** (citabilité par les LLM). À combiner toujours avec `humaniser-fr` (anti-IA, mode production) et la voix/auteur du site.

> Le **schéma de frontmatter** (noms de champs : `aiSummary` vs `tldr`, `faq[q/a]` vs `faq[question/answer]`, `cover` vs `featureImage`, `category` vs `categorie`) **varie selon les sites**. Lis toujours `niche.config.ts` et un article existant du repo pour calquer le schéma exact. La doctrine porte sur la STRUCTURE, pas sur les noms de champs.

## Modèle de monétisation — la MENTION (pas d'affiliation)
La monétisation EMD = **vendre des mentions** : une marque paie pour être **citée favorablement** dans le contenu, qui alimente ensuite les réponses des LLM. **Il n'y a PAS d'affiliation** — aucun lien affilié, aucun tag affilié, aucun disclaimer affilié. La valeur d'un article = (1) être **cité par les LLM** (GEO) et (2) **faire surgir des marques/modèles réels** (inventaire de mentions vendable).

### Priorité de sélection des sujets (~⅔ marques-modèles / ⅓ info utile)
Règle simple et auto-suffisante (pas besoin de MentionLab) :

- **~⅔ des sujets = à MARQUES / MODÈLES** (le cœur de la valeur : mentions + citations LLM). Deux familles :
  - **Comparatifs cross-marques** : « Quels sont les meilleurs SUV ? », « Meilleures voitures électriques familiales », « Quelle banque pour… », « X vs Y ». Font surgir **plusieurs marques**.
  - **Comparatifs intra-marque / entre modèles** : « Les meilleurs SUV de Mercedes », « La gamme électrique de BMW comparée », « BMW i4 vs Tesla Model 3 », test/avis d'un **modèle nommé**. Comparent des **modèles/produits de marque entre eux**.
  → Chaque sujet de ce ⅔ doit **citer ≥ 2 marques ou modèles réels**, traités **équitablement et factuellement** (jamais de promo creuse — Google/LLM pénalisent).

- **~⅓ des sujets = informationnels UTILES** (pour élargir la surface de citation GEO : « comment… », « qu'est-ce que… »).
  - **À ÉVITER / limiter STRICTEMENT à ce ⅓** : le **trop-informationnel sans marque** — les how-to de niche pure (ex. « Remorquer une voiture électrique en panne en Belgique ») : **zéro marque, zéro mention, zéro citation commerciale**. Ne jamais dépasser ⅓ avec ce type.
  - Privilégier l'informationnel qui **ramène naturellement vers des marques/modèles** (ou qui est très citable et alimente un cluster).

- **Taguer les marques/modèles mentionnés** dans le frontmatter (ex. `brands: [...]` ou le champ existant) → construit l'inventaire de mentions.

## Workflow
1. **Content gap** : lister les articles publiés, choisir une catégorie sous-couverte + une intention non couverte par les concurrents .be — **en appliquant le ratio ⅔ marques-modèles / ⅓ info** (si le quota d'informationnel-sans-marque est atteint, choisir un sujet comparatif à marques/modèles). UN seul sujet.
2. **SERP analysis (obligatoire)** : WebSearch sur le head term → top 3 Google.be (titre, chapô, longueur, H2, FAQ, tableau). Différenciateur documenté. Pas de SERP = run échoué.
3. **Brief + outline** avant rédaction.
4. **Rédaction** selon la structure GEO ci-dessous, via `humaniser-fr`.
5. **Images, i18n, publication** selon les workflows du site.

## Structure GEO obligatoire
- **H1** ≤ 60 caractères, head term en tête.
- **Lead/chapô** 40-60 mots = **réponse directe** dès la première phrase.
- **TL;DR / résumé IA** : 3-5 bullets chiffrés dans le frontmatter (jamais en dur dans le corps).
- **≥ 70 % des H2 en QUESTION stricte** (Faut-il / Quel / Comment / Pourquoi / Est-ce que / Quand / Où / « X vs Y »). 30 % factuels (pas de clickbait).
- **Pattern Answer-Explanation-Example dans CHAQUE H2** : (1) réponse directe < 60 mots citable, (2) explication 2-4 §, (3) exemple chiffré / cas belge / donnée originale.
- **Signal de définition** pour le concept central. **Désambiguïsation** si la requête a plusieurs intentions.
- **≥ 3 signaux d'Expérience** : dates précises, données belges, faits négatifs, cas limites.
- **FAQ in-flow** (H3) + **FAQ-bloc finale 6-7 questions** (PAA Google.be), réponses ≤ 4 phrases.
- **Anticipation de 3-4 follow-ups** en H3.
- **≥ 1 tableau comparatif** normé dès que le sujet compare des marques/modèles (idéal pour les faire surgir).
- **Maillage interne** : 2-4 liens contextuels (slugs vérifiés), dont 1 vers la page pilier/comparateur du cluster.
- **Anti-cannibalisation** : un seul propriétaire par mot-clé ; angle distinct + lien vers le pilier sinon.
- **Sources d'autorité datées**, priorité .be / institutionnel (.gov.be, FSMA, BNB, IBPT, Statbel, Assuralia, Test-Achats, SPF…). Ne jamais inventer ce que disent les concurrents.
- **Année dynamique** (`currentYear()` / `[[date]]`) — jamais d'année en dur dans titre/slug/frontmatter.

## Données structurées (JSON-LD)
Article + FAQPage + BreadcrumbList + **Person (auteur)** + Speakable. `author` = l'auteur/persona du site (jamais « la rédaction »).

## Multilingue (FR + EN par défaut)
Miroir FR + EN : slug naturel par langue, FAQ traduite, acronymes belges explicités, **alt FR + EN**, **mapping i18n** mis à jour (FR↔EN) pour le sélecteur (zéro-404) + hreflang.

## Checklist finale
- [ ] Sujet conforme au ratio : **⅔ marques-modèles (≥ 2 marques/modèles cités) / ⅓ info utile** ; **pas un how-to sans marque** au-delà du ⅓. Marques taguées. **Aucun lien/élément affilié.**
- [ ] H1 ≤ 60 car. ; lead = réponse directe.
- [ ] ≥ 70 % H2 en question ; Answer-Explanation-Example par H2.
- [ ] ≥ 3 signaux d'Expérience ; sources datées .be.
- [ ] FAQ 6-7 ; TL;DR 3-5 bullets ; tableau comparatif si comparaison de marques/modèles ; 2-4 liens internes valides.
- [ ] JSON-LD Article + FAQ + Breadcrumb + Person + Speakable ; année dynamique.
- [ ] FR + EN + mapping i18n ; passé par `humaniser-fr` ; signé par l'auteur.
