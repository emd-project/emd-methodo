# Audit TECHNIQUE & i18n — 2026-07-18

**Domaine d'audit :** `tech` (SEO technique + multilingue réel + santé)
**Mode :** LECTURE SEULE sur les repos de sites.
**Périmètre :** nouveaux sites provisionnés ≤ 14 j ET non encore audités par `tech`.

## Périmètre retenu

| Site | Provisionné | Âge | Déjà audité tech ? | Statut |
|---|---|---|---|---|
| simulateur-assurance-auto.be | 2026-07-10 | 8 j | ✅ oui (ledger) | exclu |
| **quel-fournisseur-energie.be** | 2026-07-13 | 5 j | ❌ non | **audité** |

→ **1 site dans le périmètre** : `quel-fournisseur-energie.be`.

## Scorecard

| Site | SEO technique | Multilingue réel | Pseudo-multilingue ? | Santé prod |
|---|:---:|:---:|:---:|:---:|
| quel-fournisseur-energie.be | ✅ | ✅ | Non | ⚠️ non vérifié |

Aucun ❌. Un seul ⚠️ (santé prod non fetchable en tâche planifiée).

---

## Détail — quel-fournisseur-energie.be

### SEO TECHNIQUE — ✅
- **sitemap.ts** : émet FR **et** EN dynamiquement (home, /blog, catégories ≥1 article, articles blog + standalone). `hreflang` réciproque `fr` + `en` + `x-default` posé sur chaque paire FR↔EN réellement existante (home, /blog, catégories mirrorées, articles présents dans `articleSlugFrToEn`). N'émet que des URLs indexables (pages légales noindex exclues). ✅
- **robots.ts** : `allow: '/'`, `disallow` limité à `/api/` et `/admin` (zones non publiques), `sitemap` + `host` renseignés. Non bloquant. ✅
- **canonical** : posé au layout (`/`) et **par article** (`generateMetadata` → `alternates.canonical` self-référent). ✅
- **noindex/nofollow** : global `index:true / follow:true` (root layout) ; aucun noindex accidentel sur le contenu. ✅
- **hreflang FR↔EN + x-default** : présent à la fois dans le **sitemap** ET dans le **`generateMetadata` de chaque article** (`languages: { fr, en?, x-default }`, `en` ajouté seulement si la traduction existe → pas d'annotation cassée). ✅
- **OG/Twitter réellement câblés** : `app/opengraph-image.tsx` présent et **dynamique** (palette du site, pas de couleurs template en dur) ; `twitter.card = summary_large_image` au root ; `openGraph` `type=article` par article (title/description/url/publishedTime/authors/image). ✅
- **JSON-LD** : `ArticleView` injecte **BreadcrumbList + Article (author `Person`, publisher `Organization`) + FAQPage** (conditionnel FAQ), locale-aware, appliqué **aussi bien au FR qu'au EN** (composant unique partagé). ✅
- **Slugs** : naturels par langue (SEO), propres. **Liens morts** : le mapping FR↔EN évite les 404 sur bascule de langue (`articleSlugInOrNull` → repli home si pas de traduction). ✅

**⚠️ Point mineur — désalignement whitelist catégories / dossiers de contenu :**
- Whitelist `niche.config.categories` = `fournisseurs, gaz, electricite, contrats, changer`.
- Dossiers `content/blog/` = `changer, contrats, electricite, gaz, guides`.
- `fournisseurs` est whitelisté **mais n'a aucun dossier de contenu** → catégorie routable potentiellement vide (non émise au sitemap car `getCategories()` exige ≥1 article, donc pas de dead link sitemap, mais `/blog/fournisseurs` rendrait une page vide si liée ailleurs).
- `guides/` contient uniquement le **template** `article-modele.mdx`, **hors whitelist** → non lu comme catégorie, non routé (placeholder inoffensif, mais reste référencé dans `articleSlugFrToEn['article-modele']`).
- Sévérité : **mineure** (pas bloquant, pas de 404 émise). À nettoyer.

### MULTILINGUE RÉEL — ✅ (vrai site multilingue, conforme à la référence)
Critères de `references/i18n-multilingue.md`, tous vérifiés :
1. **Arbre `app/en/` séparé** : `layout.tsx`, `page.tsx`, `blog/`, `legal-notice/`, `privacy/`, etc. — disjoint des routes FR (`app/(site)/`). ✅
2. **Lecteurs miroir `…En()`** : `getAllArticlesEn`, `getCategoriesEn`, `getArticleRawEn`, `articleExistsEn` dans `lib/blog.ts` lisent `content/blog/en/…`. ✅
3. **Dossiers de locale jamais lus comme catégories** : `RESERVED_LOCALE_DIRS = {en, nl, de}` + `isFrCategory()` exclut tout dossier de locale (whitelist stricte quand `niche.categories` est renseigné). ✅
4. **Mapping FR↔EN par page** : `lib/i18n/article-slugs.ts` (`articleSlugFrToEn` + réciproque dérivée), slug naturel par langue. ✅
5. **`LangSwitch` monté dans la Nav** : importé **et rendu** (desktop `nav-cta` + menu mobile), gated par `isMultilingual()`, cible `page ↔ page équivalente`. ✅
6. **hreflang réciproque + x-default** et **`lang`** correct (`<html lang="fr">` + conteneur `app/en` `lang="en"`). ✅
7. **Parité de contenu** : 4 catégories réelles 1:1 FR↔EN (`changer`, `contrats`, `electricite`, `gaz`) + template (`guides/article-modele` ↔ `en/guides/article-model`). **Aucun orphelin de traduction.** ✅
8. **Jamais de NL** : ✅ (aucun dossier/route NL).

→ **NON pseudo-multilingue.** Ce site porte le pattern i18n de référence (arbre EN séparé, mapping, switcher, hreflang, parité), pas le déversement de `.mdx` EN en fausses catégories.

### SANTÉ — ⚠️ non vérifié
Fetch de l'URL de prod (`https://quel-fournisseur-energiebe.vercel.app` + `/en`) **bloqué** en exécution planifiée (URL hors « provenance set » du fetch). Statut prod **non vérifié** — à contrôler manuellement (HTTP 200 FR + une page `/en`).

---

## Top actions prioritaires

1. **⚠️ Aligner catégories ↔ contenu** (mineur, mais propre) : soit créer du contenu pour la catégorie whitelistée `fournisseurs`, soit la retirer de `niche.config.categories` ; sortir le template `guides/article-modele.mdx` de `content/blog/` (ou ajouter `guides` à la whitelist si on veut la router).
2. **⚠️ Vérifier la santé prod manuellement** : HTTP 200 sur la home FR et sur une page `/en` (non fetchable depuis la tâche planifiée).

Rien d'autre à signaler côté SEO technique / multilingue : le site est conforme.
