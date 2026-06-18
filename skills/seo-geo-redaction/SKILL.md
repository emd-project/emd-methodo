---
name: seo-geo-redaction
version: 1.0.0
description: Doctrine canonique de rédaction SEO/GEO des sites EMD — structure d'article optimisée pour le référencement Google ET la citabilité par les LLM (ChatGPT/Gemini/AI Overview). Source de vérité unique : ≥70% de H2 en question, pattern Answer-Explanation-Example, FAQ, données structurées, maillage interne, sources datées, FR+EN. À lire/appliquer pour toute rédaction d'article de blog sur un site EMD (tâches de rédaction quotidienne, article seed de provisioning, correction d'articles).
---

# seo-geo-redaction — Doctrine GEO canonique EMD

Référence absolue pour la structure d'un article EMD. Optimise à la fois le **SEO** (Google.be) et la **GEO** (citabilité par les LLM). À combiner toujours avec `humaniser-fr` (anti-IA, mode production) et la voix/auteur du site.

> Le **schéma de frontmatter** (noms de champs : `aiSummary` vs `tldr`, `faq[q/a]` vs `faq[question/answer]`, `cover` vs `featureImage`, `category` vs `categorie`) **varie selon les sites**. Lis toujours `niche.config.ts` et un article existant du repo pour calquer le schéma exact. La doctrine ci-dessous porte sur la STRUCTURE, pas sur les noms de champs.

## Workflow
1. **Content gap** : lister les articles publiés, choisir une catégorie sous-couverte + une intention de recherche non couverte par les concurrents .be. UN seul sujet.
2. **SERP analysis (obligatoire)** : WebSearch sur le head term → top 3 Google.be (titre, chapô, longueur, H2, FAQ, tableau). Documenter le différenciateur. Pas de SERP = run échoué.
3. **Brief + outline** avant rédaction.
4. **Rédaction** selon la structure GEO ci-dessous, via `humaniser-fr`.
5. **Images, i18n, publication** selon les workflows du site.

## Structure GEO obligatoire
- **H1** ≤ 60 caractères, head term en tête.
- **Lead/chapô** 40-60 mots = **réponse directe** à la requête dès la première phrase.
- **TL;DR / résumé IA** : 3-5 bullets chiffrés dans le frontmatter (jamais en dur dans le corps — injecté par le template).
- **≥ 70 % des H2 en QUESTION stricte** : Faut-il / Quel / Comment / Pourquoi / Est-ce que / Quand / Où / « X vs Y ». Les 30 % restants sont **factuels** (pas de clickbait).
- **Pattern Answer-Explanation-Example dans CHAQUE H2** :
  1. **Réponse directe < 60 mots**, citable hors contexte (c'est ce que le LLM extrait).
  2. Explication / contexte / nuance (2-4 paragraphes).
  3. **Exemple chiffré, cas belge concret, ou donnée originale.**
- **Signal de définition** pour le concept central (« X désigne… », « Concrètement, X signifie… »).
- **Désambiguïsation** explicite si la requête a plusieurs intentions.
- **≥ 3 signaux d'Expérience** : dates précises, données chiffrées belges, **faits négatifs gênants**, cas limites qui bornent la généralité.
- **FAQ in-flow** (H3 sous au moins 1 H2 stratégique) **+ FAQ-bloc finale de 6-7 questions minimum** (issues du PAA Google.be), réponses ≤ 4 phrases.
- **Anticipation de 3-4 follow-ups** en H3 successifs.
- **≥ 1 tableau comparatif** normé si le sujet s'y prête.
- **Maillage interne** : 2-4 liens contextuels avec ancres descriptives (slugs **vérifiés existants**), dont 1 vers la page pilier/comparateur du cluster.
- **Anti-cannibalisation** : un seul propriétaire par mot-clé. Si le mot-clé est détenu par une page comparateur/pilier, prendre un angle informationnel distinct ET lier vers elle.
- **Sources d'autorité datées**, priorité .be / institutionnel (.gov.be, FSMA, BNB, IBPT, Statbel, Assuralia, Test-Achats, SPF…). Jamais inventer ce que disent les concurrents ; ne pas citer un agrégateur concurrent si le site l'interdit.
- **Année dynamique** (`currentYear()` côté template, ou `[[date]]` pour les classements « courants ») — **jamais d'année en dur** dans titre/slug/frontmatter ; garder en dur uniquement les dates-faits.

## Données structurées (JSON-LD)
Article + FAQPage + BreadcrumbList + **Person (auteur)** + Speakable. L'`author` du JSON-LD = l'auteur/persona du site (jamais « la rédaction »).

## Multilingue (FR + EN par défaut)
Miroir FR + EN (sauf site explicitement monolingue) : slug **naturel par langue** (pas une transposition mot-à-mot), FAQ traduite, acronymes belges gardés + explicités, **alt FR + EN**, et **mapping i18n** mis à jour (couple FR↔EN) pour le sélecteur de langue (zéro-404) + hreflang.

## Checklist finale (avant publication)
- [ ] H1 ≤ 60 car., head term en tête ; lead = réponse directe.
- [ ] **≥ 70 % des H2 en question** ; 30 % factuels non-clickbait.
- [ ] Answer-Explanation-Example dans chaque H2 (réponse < 60 mots citable).
- [ ] ≥ 3 signaux d'Expérience ; sources datées .be.
- [ ] FAQ-bloc 6-7 questions ; TL;DR 3-5 bullets (frontmatter).
- [ ] Tableau comparatif si pertinent ; 2-4 liens internes valides ; anti-cannibalisation.
- [ ] JSON-LD Article + FAQ + Breadcrumb + Person + Speakable.
- [ ] Année dynamique, pas en dur.
- [ ] FR + EN (si site multilingue) + mapping i18n.
- [ ] Passé par `humaniser-fr` (mode production) ; signé par l'auteur du site.
