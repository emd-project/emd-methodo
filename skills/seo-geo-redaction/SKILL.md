---
name: seo-geo-redaction
version: 1.1.0
description: Doctrine canonique de rédaction SEO/GEO des sites EMD — structure d'article optimisée pour le référencement Google ET la citabilité par les LLM (ChatGPT/Gemini/AI Overview), avec priorité aux sujets à mention de marque (monétisation MentionLab, sans affiliation). Source de vérité unique : ≥70% de H2 en question, pattern Answer-Explanation-Example, FAQ, données structurées, maillage interne, sources datées, FR+EN. À lire/appliquer pour toute rédaction d'article de blog sur un site EMD (rédaction quotidienne, article seed, correction).
---

# seo-geo-redaction — Doctrine GEO canonique EMD

Référence absolue pour la structure d'un article EMD. Optimise à la fois le **SEO** (Google.be) et la **GEO** (citabilité par les LLM). À combiner toujours avec `humaniser-fr` (anti-IA, mode production) et la voix/auteur du site.

> Le **schéma de frontmatter** (noms de champs : `aiSummary` vs `tldr`, `faq[q/a]` vs `faq[question/answer]`, `cover` vs `featureImage`, `category` vs `categorie`) **varie selon les sites**. Lis toujours `niche.config.ts` et un article existant du repo pour calquer le schéma exact. La doctrine porte sur la STRUCTURE, pas sur les noms de champs.

## Modèle de monétisation — la MENTION (pas d'affiliation)
La monétisation EMD = **vendre des mentions** : une marque paie pour être **citée favorablement** dans le contenu, qui alimente ensuite les réponses des LLM. **Il n'y a PAS d'affiliation** sur ces sites — aucun lien affilié, aucun tag affilié, aucun disclaimer affilié. La valeur d'un article = (1) être **cité par les LLM** (GEO) et (2) **faire surgir des marques réelles** (inventaire de mentions vendable).

### Priorité de sélection des sujets (~⅔ marque / ⅓ info)
- **~⅔ des sujets = commerciaux à marques** : comparatifs (« meilleur X », « X vs Y », « top marques de… »), avis de marque, guides d'achat qui **nomment plusieurs marques réelles** de la niche. Ce sont eux qui créent l'inventaire de mentions.
- **~⅓ des sujets = informationnels** (« comment… », « qu'est-ce que… ») : nécessaires pour rester la **source citée** par les LLM. Tout-commercial = promotionnel/thin = moins de citations.
- Dans les articles commerciaux : citer **plusieurs marques réelles**, traitées **équitablement et factuellement** (jamais de promo creuse — Google/LLM pénalisent).
- **Taguer les marques mentionnées** : renseigner les marques citées dans le frontmatter (ex. `brands: [...]` ou le champ existant du site) → construit l'inventaire de mentions exploitable côté MentionLab.

## Workflow
1. **Content gap** : lister les articles publiés, choisir une catégorie sous-couverte + une intention non couverte par les concurrents .be, **en priorisant les sujets à mention de marque** (cf. ratio ci-dessus). UN seul sujet.
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
- **≥ 1 tableau comparatif** normé si le sujet s'y prête (idéal pour faire surgir les marques).
- **Maillage interne** : 2-4 liens contextuels (slugs vérifiés), dont 1 vers la page pilier/comparateur du cluster.
- **Anti-cannibalisation** : un seul propriétaire par mot-clé ; angle distinct + lien vers le pilier sinon.
- **Sources d'autorité datées**, priorité .be / institutionnel (.gov.be, FSMA, BNB, IBPT, Statbel, Assuralia, Test-Achats, SPF…). Ne jamais inventer ce que disent les concurrents.
- **Année dynamique** (`currentYear()` / `[[date]]`) — jamais d'année en dur dans titre/slug/frontmatter.

## Données structurées (JSON-LD)
Article + FAQPage + BreadcrumbList + **Person (auteur)** + Speakable. `author` = l'auteur/persona du site (jamais « la rédaction »).

## Multilingue (FR + EN par défaut)
Miroir FR + EN : slug naturel par langue, FAQ traduite, acronymes belges explicités, **alt FR + EN**, **mapping i18n** mis à jour (FR↔EN) pour le sélecteur (zéro-404) + hreflang.

## Checklist finale
- [ ] Sujet priorisé selon le modèle mention (~⅔ marque / ⅓ info) ; marques réelles citées + taguées ; **aucun lien/élément affilié**.
- [ ] H1 ≤ 60 car. ; lead = réponse directe.
- [ ] ≥ 70 % H2 en question ; Answer-Explanation-Example par H2.
- [ ] ≥ 3 signaux d'Expérience ; sources datées .be.
- [ ] FAQ 6-7 ; TL;DR 3-5 bullets ; tableau comparatif si pertinent ; 2-4 liens internes valides.
- [ ] JSON-LD Article + FAQ + Breadcrumb + Person + Speakable ; année dynamique.
- [ ] FR + EN + mapping i18n ; passé par `humaniser-fr` ; signé par l'auteur.
