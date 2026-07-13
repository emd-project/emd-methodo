# Audit TECHNIQUE & i18n — 2026-07-13

Domaine d'audit : **tech** (SEO technique · multilingue réel · santé). Lecture seule.
Périmètre (emd-audit v1.6) : sites de `provisioned-log.csv` provisionnés ≤ 14 j et non présents dans `audits/audited-tech.csv`.

**Périmètre retenu : 1 site** — `simulateur-assurance-auto.be` (provisionné 2026-07-10, J+3). Ledger `audited-tech.csv` inexistant avant ce run → premier audit tech.

## Scorecard

| Site | SEO technique | Multilingue réel | Pseudo-multilingue ? | Santé |
|---|---|---|---|---|
| simulateur-assurance-auto.be | ⚠️ | ✅ (2 réserves) | **Non** | ⚠️ |

Prod auditée : `https://simulateur-assurance-auto-be.vercel.app` (l'URL déduite « repo sans les points » — `simulateur-assurance-autobe.vercel.app` — renvoie 404 : l'alias Vercel réel utilise un tiret).

## Détail — simulateur-assurance-auto.be

### ❌ / ⚠️ Bloquants & importants

1. **⚠️→❌ Toutes les URLs absolues pointent vers un domaine qui ne répond pas.** `canonical`, `hreflang`, `og:url`, `og:image` et le sitemap sont émis sur `https://www.simulateur-assurance-auto.be/…` (fallback `niche.domain`, `NEXT_PUBLIC_SITE_URL` non défini). Or ce host est en **ERR_CONNECTION_REFUSED** (DNS/domaine pas encore branché sur Vercel). Conséquence : canonicals auto-référents cassés, hreflang cassés, OG images 404 pour les crawlers. **Action : brancher le domaine sur le projet Vercel** (ou, en attendant, définir `NEXT_PUBLIC_SITE_URL=https://simulateur-assurance-auto-be.vercel.app`).
2. **⚠️ `<html lang="fr">` sur les pages EN.** `app/layout.tsx` détient le `<html lang="fr">` ; `app/en/layout.tsx` ne pose `lang="en"` que sur un `<div style="display:contents">`. Vérifié en prod : `document.documentElement.lang === "fr"` sur `/en` et `/en/blog/...`. Non conforme au critère 6 de `references/i18n-multilingue.md` (attribut `lang` correct par locale) + a11y.
3. **⚠️ Pas de H1 sur la home FR ni sur `/en`.** Probe : `h1: []` sur `/` et `/en`. Les articles ont bien un H1 unique.
4. **⚠️ Article de démo du template indexable et hors sitemap.** `content/blog/guides/article-modele.mdx` (+ `content/blog/en/guides/article-model.mdx`). La catégorie `guides` **n'est pas dans la liste blanche** `niche.categories` (simulateur, comparatifs, garanties, prix, profils) → l'article est absent de `getAllArticles()`, donc **absent du sitemap et des listings**, mais la route reste servie : `/blog/guides/article-modele` répond **200 en `index, follow`** (titre « Article modèle : structure, sidebar et sommaire », 404 console sur sa cover). Orphelin indexable + contenu de template. **Action : supprimer les deux fichiers `guides/`** (ou noindex).
5. **⚠️ Mapping FR↔EN incomplet.** `articleSlugFrToEn` ne contient que `simulateur-assurance-auto-belgique → simulate-car-insurance-belgium`. La paire `article-modele ↔ article-model` existe en fichiers mais pas en mapping → pas de hreflang, LangSwitch retombe sur la home. Disparaît si on supprime les fichiers de démo (point 4).
6. **⚠️ Twitter card non spécifique aux articles.** `twitter:title` / `twitter:description` restent ceux du layout racine (tagline du site) sur les pages article ; seul l'OG est surchargé. Ajouter `twitter` dans `generateMetadata` des routes article FR + EN.

### ✅ Conforme

**SEO technique**
- `app/sitemap.ts` dynamique : FR + EN, home/blog/catégories/articles, hreflang réciproque + `x-default` sur les paires réelles, pages noindex exclues, catégories bornées à la liste blanche. `/sitemap.xml` sert bien du XML (200).
- `app/robots.ts` : `allow: /`, disallow `/api/` + `/admin`, pointe le sitemap. Non bloquant.
- Pas de `noindex/nofollow` accidentel : les articles FR et EN sortent en `index, follow`.
- **hreflang réciproque vérifié en prod** : article FR → `fr` + `en` + `x-default` ; article EN → `en` + `fr` + `x-default` (x-default sur le FR). Réciprocité et auto-référence OK (aux URLs près, cf. point 1).
- **OG réellement câblé** : `app/opengraph-image.tsx` (edge, `ImageResponse`, palette du site) + OG par article dans `generateMetadata`. `twitter:card=summary_large_image` présent.
- **JSON-LD** servi sur les articles FR et EN : `BreadcrumbList` + `Article` (author `Person` + `speakable`) + `FAQPage`.
- Slugs propres et naturels par langue. Aucun lien mort sur les pages sondées (les `ERR_ABORTED` sont des prefetch RSC annulés, sans impact).

**Multilingue réel (critères `references/i18n-multilingue.md`)**
1. Arbre `app/en/` séparé et complet, disjoint des routes FR. ✅
2. Lecteurs miroir `…En()` dans `lib/blog.ts`. ✅
3. **Dossiers de locale jamais lus comme catégories** (`RESERVED_LOCALE_DIRS` + liste blanche `niche.categories`). ✅ → **pas de pseudo-multilingue**.
4. Mapping FR↔EN dans `lib/i18n/article-slugs.ts` (fallback home, jamais de 404). ✅ (incomplet, cf. point 5)
5. `LangSwitch` importé ET rendu dans `Nav.tsx` (desktop + menu mobile). ✅
6. hreflang réciproque + x-default ✅ — attribut `lang` ⚠️ (point 2).
7. **Parité de contenu** : 1 article réel FR ↔ 1 article réel EN. Aucun orphelin. ✅
8. **Aucun NL** (`locales: ['fr','en']`). ✅

**Santé**
- `/` → 200 · `/en` → 200 · article FR → 200 · article EN → 200 (CLS 0, load ~0,5 s).
- ⚠️ `https://www.simulateur-assurance-auto.be` → **connexion refusée** (domaine non branché).

## Top 5 des actions prioritaires

1. **Brancher le domaine `simulateur-assurance-auto.be` sur Vercel** (ou fixer `NEXT_PUBLIC_SITE_URL`) — sinon canonicals + hreflang + OG pointent vers un host mort.
2. **Poser `lang="en"` sur le `<html>` des routes `/en`.**
3. **Supprimer `content/blog/guides/article-modele.mdx` et `content/blog/en/guides/article-model.mdx`.**
4. **Ajouter un H1 unique sur la home FR et sur `/en`.**
5. **Surcharger la Twitter card par article** dans les deux routes article.

## Anti-footprint (tech)
Rien à signaler : le site reprend fidèlement le pattern i18n de référence (`quel-operateur-choisir.be`) — comportement attendu, pas un footprint.
