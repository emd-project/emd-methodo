# Audit CONFORMITÉ & IDENTITÉ — 2026-10-22

**Domaine d'audit :** conformité & identité (Légal/RGPD · Identité · Auteur/E-E-A-T)
**Mode :** LECTURE SEULE sur les sites — rendu réel audité (layouts réellement montés, SVG inline `Nav.tsx`/`Footer.tsx`, `app/icon.svg`, `app/opengraph-image.tsx`, JSON-LD de `ArticleView`, pages auteur).
**Périmètre (restreint ≤14j = provisionné ≥ 2026-10-08, non déjà audité par ce domaine) :** 1 site.

| Site | Repo | Provisionné | Statut périmètre |
|---|---|---|---|
| fonds-investissement.be | `emd-project/fond-investissement` (sans « s ») | 2026-10-20 | ✅ audité (nouveau) |

Aucun re-scan du parc. Source auditée : `main` @ `798e6d5` (2026-10-21), clone superficiel.
Limite : santé prod non vérifiée (fetch prod bloqué par le proxy des exécutions planifiées, cf. audit UX du 2026-10-21).

---

## Scorecard

| Site | Légal & RGPD | Identité | Auteur / E-E-A-T | Auteur affiché | Nom de famille ? |
|---|:---:|:---:|:---:|---|:---:|
| fonds-investissement.be | ❌ | ✅ | ⚠️ | Cédric H. | Non ✅ |

Légende : ✅ conforme · ⚠️ écart important · ❌ bloquant.

**Synthèse :**
- ❌ **Aucun bandeau cookies** (aucun composant consentement dans `components/**`, rien de monté dans `app/layout.tsx`, `app/(site)/layout.tsx`, `app/en/layout.tsx`) **et `<Analytics />` (`@vercel/analytics/next`) monté sans condition** dans `app/layout.tsx`. Même défaut récurrent que beste-waterdispenser.be (15/10) et 5/7 sites du 01/10 → défaut de **template**.
- ✅ Pages légales FR + EN remplies, `robots: { index:false, follow:false }`, infos société exactes.
- ✅ Identité sur mesure : mark **« tampon d'acte »** (double cercle + barre) en Nav, Footer, favicon `app/icon.svg` (encre prune `#6B2760`) et OG `app/opengraph-image.tsx` (+ variante `app/en/`). Pas d'éclair générique.
- ✅ **Règle NOM auteur conforme** : « Cédric H. » partout (niche.config, pages auteur FR/EN, JSON-LD Person + Article.author ; 64/64 articles en `authorSlug: "cedric-h"`).
- ⚠️ Côté EN, l'auteur reste en français (titre + bio) et tous les liens auteur pointent vers la page FR.

---

## Détail — fonds-investissement.be

### Légal & RGPD — ❌
- ❌ **Bandeau cookies absent** : `components/ui/` = AuthorByline, AuthorCard ; aucun `CookieBanner`/consent nulle part ; aucun layout n'en monte. Bloquant.
- ❌ **`<Analytics />` inconditionnel** (`app/layout.tsx`, fin de `<body>`) → mesure d'audience chargée avant tout consentement. Or `/confidentialite` et `/en/privacy` annoncent des « cookies analytiques » via Vercel Analytics, sans mécanisme Accepter/Refuser.
- ✅ `/mentions-legales` + `/confidentialite` (FR), `/en/legal-notice` + `/en/privacy` (EN) : remplis, aucun placeholder `[À compléter]`, `noindex,nofollow`.
- ✅ Infos société exactes : MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique (mentions FR + legal notice EN). Hébergeur Vercel Inc. mentionné.
- ✅ Liens footer vers les pages légales via `legalPath(locale, …)` (slugs EN corrects).
- ⚠️ mineur : `/en/privacy` → « Data controller » omet l'adresse du siège (présente dans `/confidentialite`).
- ⚠️ mineur : les politiques ne décrivent ni la base légale du traitement analytique ni le moyen de retirer son consentement (à ajouter avec le bandeau).

### Identité — ✅
- ✅ Favicon servi via **`app/icon.svg`** : carré prune `#6B2760` rx14 + tampon papier `#FFFDF8` (même tracé que le mark).
- ✅ **Logo rendu unique** : SVG inline `Nav.tsx` l.81 = `circle r9` + `circle r5.5` + `path M8.5 12h7` (tampon d'acte), repris à l'identique dans `Footer.tsx` l.76. Pas d'éclair. Cohérent avec `signature.inspiration` (« tampon à encre violette », « acte notarié ») et enregistré dans `registry/da-registry.json`.
- ✅ **OG unique** via `app/opengraph-image.tsx` → `components/og/SiteOgImage.tsx` (palette `niche.palette`, mark tampon, siteName, services actifs, sans dégradé ni filigrane ★) + `app/en/opengraph-image.tsx` (locale EN).
- mineur : `niche.config.logo: 'fonds·investissement'` n'est pas lu (le wordmark rend `siteName`) — sans impact.

### Auteur / E-E-A-T — ⚠️
- ✅ Auteur identifié **Cédric H.** — « Ancien analyste crédit entreprises — financement des PME en Wallonie et à Bruxelles ». Bio E-E-A-T crédible et concrète (8 ans crédits entreprises dans une banque à Namur, contrôleur de gestion d'une PME du Hainaut lors de l'entrée d'un invest provincial, relevé mensuel des conditions des fonds).
- ✅ Pages auteur `/auteurs/cedric-h` et `/en/auteurs/cedric-h` avec JSON-LD `Person` (name, url, jobTitle, description, worksFor).
- ✅ JSON-LD `Article.author` = `Person` « Cédric H. » + jobTitle + url + description (`components/article/ArticleView.tsx` l.146-150) ; byline + AuthorCard rendus avec le nom.
- ✅ Frontmatter : **64/64** articles `authorSlug: "cedric-h"` ; aucun patronyme nulle part. Aucune signature « la rédaction » sur les articles (les occurrences de `fr.json` sont des libellés UI : « Le mot de la rédaction », « en cours de rédaction »). La première version maison du site signée « la rédaction » a bien été remplacée (cf. `voice-registry.json`).
- ✅ Auteur unique au réseau (seule occurrence de « Cédric » dans les registres).
- ⚠️ **Bio/titre non traduits en EN** : `app/en/auteurs/[slug]/page.tsx` lit `niche.author.title`/`bio` (FR) et `niche.config.localized.en` ne contient aucun bloc `author` → page auteur EN, AuthorCard et JSON-LD `Person` des articles EN en français.
- ⚠️ **Liens auteur non localisés** : `AuthorByline` (l.56) et `AuthorCard` (l.105, l.124) lient en dur `/auteurs/<slug>` sans `localePath`, et `ArticleView` l.149 met `url: ${SITE_URL}/auteurs/…` → sur les articles EN, lien + JSON-LD pointent vers la page **FR**. (Même défaut de template que beste-waterdispenser.be.)
- mineur (dormant) : route legacy `app/(site)/[article]/page.tsx` appelle `AuthorByline`/`AuthorCard` **sans `authorName`** et met `name: … || 'Auteur'` en JSON-LD ; aucun `content/articles/` aujourd'hui → rien de rendu.

---

## Anti-footprint
- Mark tampon d'acte, encre prune `#6B2760`, titrage Libre Caslon Text, auteur Cédric H. : distincts du réseau (registres DA + voix).
- Défauts **partagés** (template, pas identité) : absence de bandeau cookies + `<Analytics />` inconditionnel ; liens auteur non localisés.

---

## Top actions prioritaires
1. ❌ **fonds-investissement.be — monter un bandeau cookies RGPD** (FR+EN, léger, Accepter/Refuser, lien `/confidentialite` · `/en/privacy`, choix mémorisé) dans le root layout.
2. ❌ **Conditionner `<Analytics />` au consentement** (ne charger Vercel Analytics qu'après « Accepter »).
3. ⚠️ **Corriger le template** (`emd-site-template`) : bandeau cookies + Analytics conditionnel par défaut — c'est le 3ᵉ audit consécutif avec ce bloquant sur un site neuf.
4. ⚠️ **Traduire l'auteur en EN** : ajouter `localized.en.author { title, bio }` et le lire dans `/en/auteurs/[slug]`, AuthorCard et JSON-LD des articles EN.
5. ⚠️ **Localiser les liens auteur** (`AuthorByline`, `AuthorCard`, `ArticleView` author.url) via `localePath` ; puis compléter `/en/privacy` (adresse du siège) et la base légale / retrait du consentement dans les deux politiques.
