# Audit TECHNIQUE & i18n — LATEST (2026-10-27)

Périmètre : sites de `provisioned-log.csv` provisionnés ≤ 14 jours (depuis le 2026-10-13) et absents de `audited-tech.csv`. **1 site audité : `fonds-investissement.be`** (provisionné le 2026-10-20). Repo `emd-project/fond-investissement` (sans « s »), HEAD `279df0c` (2026-10-26). Audit statique de la source, en lecture seule.

> **Santé HTTP : non vérifiée.** Le proxy sortant de ce run bloque `fond-investissement.vercel.app` (CONNECT 403) et la demande de permission WebFetch a expiré. Aucun contournement tenté. Rien de ce qui suit ne repose sur des balises rendues.

## Scorecard

| Site | Provisionné | SEO tech. | Multilingue | Pseudo-multilingue | Santé | Locales réelles |
|---|---|---|---|---|---|---|
| fonds-investissement.be | 2026-10-20 | ⚠️ | ✅ | **non** | non vérifié | fr (défaut) + en |

**Multilingue réel conforme** sur les 8 critères de `references/i18n-multilingue.md` :
1. Arbre `app/en/` séparé : layout, home, blog, catégories, articles, classement, comparer, choisir, auteurs, legal-notice, privacy.
2. Lecteurs miroir `getAllArticlesEn` / `getCategoriesEn` / `getArticleRawEn` / `getRelatedArticlesEn` dans `lib/blog.ts`.
3. `RESERVED_LOCALE_DIRS` + `isFrCategory` : le dossier `content/blog/en/` n'est jamais lu comme catégorie.
4. Mapping `lib/i18n/article-slugs.ts` : 34 entrées. 34 MDX FR et 34 MDX EN. **Zéro orphelin**, zéro écart de catégorie.
5. `LangSwitch` importé et rendu dans `Nav.tsx` (desktop + mobile) et `PresseMasthead.tsx`.
6. hreflang article réciproque + `x-default` (FR et EN). Côté EN, l'alternate FR n'est émise que si le slug est mappé.
7. Parité 34/34. Les 6 catégories existent dans les deux locales.
8. Aucune locale NL : `locales: ['fr','en']`, pas de `content/blog/nl`, pas d'`app/nl`.

**Acquis SEO tech.** :
- `app/sitemap.ts` couvre les 2 locales et les articles. Les alternates sont gardées par `articleExistsEn`. Les routes désactivées sont exclues du sitemap (quiz, simulateur, deals).
- `app/robots.ts` n'est pas bloquant : il exclut seulement `/api/` et `/admin`.
- Canonical défini par locale sur les articles, catégories, home, blog, classements et choisir.
- Le noindex est limité aux pages légales FR/EN, à `/admin` et à la page 404.
- `app/opengraph-image.tsx` et `app/en/opengraph-image.tsx` sont présents. L'`openGraph` des articles utilise la featured image en URL absolue.
- JSON-LD présents : Article (`inLanguage` `fr-BE` / `en-BE`, Person, publisher, Speakable), FAQPage et BreadcrumbList.
- Le lien mort de la sidebar `/comparer/${categorie}` signalé par l'audit content est **corrigé** : un garde-fou `PRODUIT_SLUGS` est en place dans `ArticleView.tsx`.
- **0 lien interne mort** sur les 68 MDX : toutes les cibles `/blog/…`, `/classement/…` et `/comparer/…` existent dans la bonne locale, et aucun lien EN ne pointe vers une page FR.

## Détail — fonds-investissement.be (SEO tech. ⚠️)

**Important**
- **`<html lang="fr">` en dur dans le HTML serveur de toutes les pages `/en`** (`app/layout.tsx`). Un script inline corrige en `en` côté client, et `app/en/layout.tsx` ajoute un `<div lang="en">`. Les crawlers qui n'exécutent pas le JS (et une partie des LLM) lisent donc `fr` sur toute la section EN.
- **La Twitter card hérite du titre et de la description de la HOME sur toutes les pages.** Seul le root layout définit `twitter` (`title: HOME_TITLE`), et aucune page ne le redéfinit. Résultat : `twitter:title` est identique sur les 68 articles, les classements, etc. De plus, aucun `twitter-image` n'est défini (repli sur `og:image`).
- **hreflang non réciproque côté FR** sur `/comparer`, `/comparer/[produit]`, `/auteurs/[slug]`, `/simulateur`, `/deals` et `/[article]`. Ces pages FR ne déclarent qu'un `canonical`, alors que leurs miroirs `/en/…` déclarent `fr` + `x-default`. Les signaux sont incomplets sur `/comparer/fonds-investissement-pme`, la page outil indexée.
- **Domaine canonique non vérifié.** Toutes les URLs absolues valent `NEXT_PUBLIC_SITE_URL ?? https://www.fonds-investissement.be` (canonical, hreflang, sitemap, robots, JSON-LD). Or `pipeline/sites.csv` indique « À acheter » et la prod tourne sur `fond-investissement.vercel.app`. Si la variable d'env Vercel n'est pas posée, tous les canonicals et le sitemap pointent vers un domaine non acheté. À contrôler dans les settings Vercel.

**Mineur**
- Root layout : `canonical: '/'` plus des hreflang construits en dur sur `https://www.${domain}` (ils ignorent `SITE_URL`) et **sans `x-default`**. Ces valeurs sont héritées par les pages sans `alternates` propres : `mentions-legales` et `confidentialite`. Ces pages sont en noindex, donc l'impact est faible, mais leur canonical pointe vers la home.
- `openGraph.locale` absent sur les articles FR (présent en EN : `en`). Il vaut mieux viser `fr_BE` / `en_BE`.
- `lastModified` = date du build pour tout ce qui n'est pas un article dans le sitemap (home, blog, hubs, classements).
- 3 slugs EN identiques au FR (`management-buy-out-mbo`, `management-buy-in-mbi`, `owner-buy-out-obo`). Acceptable : ce sont des termes anglais d'usage. Pas d'action requise.
- Le hreflang des pages catégorie (FR et EN) est inconditionnel. Il est sans effet aujourd'hui (6/6 catégories mirrorées) mais fragile si une catégorie FR naît sans miroir EN.

## Pseudo-multilingue
Aucun. `fonds-investissement.be` est un vrai FR + EN.

## Top actions
1. **Vérifier `NEXT_PUBLIC_SITE_URL` dans Vercel** (projet `fond-investissement`). Il doit être aligné sur le domaine réellement servi, sinon tous les canonicals et le sitemap pointent vers `www.fonds-investissement.be`, qui n'est pas acheté.
2. **Servir `lang="en"` côté serveur sur `/en`.** Exemple : root layout neutre ou locale lue via un header posé par le middleware, au lieu du script client.
3. **Définir `twitter` (title/description) par page**, au minimum sur les articles, classements et comparer. Ou le dériver de l'`openGraph` dans un helper commun.
4. **Ajouter `alternates.languages` (fr/en/x-default)** sur les pages FR `comparer`, `comparer/[produit]`, `auteurs/[slug]` (et `simulateur`, `deals`, `[article]` quand elles sont actives).
5. **Nettoyer le root layout** : retirer les hreflang en dur, ou les baser sur `SITE_URL` avec `x-default`. Ajouter `alternates.canonical` sur les pages légales FR et `openGraph.locale` `fr_BE` sur les articles FR.

Les points 2 à 5 viennent du template (`emd-template-v2`). Ils touchent probablement les autres sites récents : corriger à la racine.
