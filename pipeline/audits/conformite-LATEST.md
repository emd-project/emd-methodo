# Audit CONFORMITÉ & IDENTITÉ — 2026-10-22

> Copie de `pipeline/audits/conformite-2026-10-22.md` (consommée par `emd-fix`).

**Domaine d'audit :** conformité & identité (Légal/RGPD · Identité · Auteur/E-E-A-T)
**Mode :** LECTURE SEULE sur les sites — rendu réel audité (layouts réellement montés, SVG inline `Nav.tsx`/`Footer.tsx`, `app/icon.svg`, `app/opengraph-image.tsx`, JSON-LD de `ArticleView`, pages auteur).
**Périmètre (restreint ≤14j = provisionné ≥ 2026-10-08, non déjà audité par ce domaine) :** 1 site — **fonds-investissement.be** (repo `emd-project/fond-investissement`, provisionné 2026-10-20). Source : `main` @ `798e6d5`. Santé prod non vérifiée (proxy).

## Scorecard

| Site | Légal & RGPD | Identité | Auteur / E-E-A-T | Auteur affiché | Nom de famille ? |
|---|:---:|:---:|:---:|---|:---:|
| fonds-investissement.be | ❌ | ✅ | ⚠️ | Cédric H. | Non ✅ |

## Détail — fonds-investissement.be

### Légal & RGPD — ❌
- ❌ **Bandeau cookies absent** : aucun composant consentement dans `components/**` ; rien de monté dans `app/layout.tsx`, `app/(site)/layout.tsx`, `app/en/layout.tsx`. Bloquant.
- ❌ **`<Analytics />` (`@vercel/analytics/next`) inconditionnel** dans `app/layout.tsx` → audience mesurée avant consentement, alors que `/confidentialite` et `/en/privacy` annoncent des cookies analytiques Vercel.
- ✅ Pages légales FR (`/mentions-legales`, `/confidentialite`) + EN (`/en/legal-notice`, `/en/privacy`) remplies, sans placeholder, `noindex,nofollow` ; infos société exactes (MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique) ; liens footer via `legalPath`.
- ⚠️ mineur : `/en/privacy` « Data controller » sans adresse du siège ; politiques sans base légale analytique ni retrait du consentement.

### Identité — ✅
- ✅ Favicon `app/icon.svg` (prune `#6B2760` + tampon papier).
- ✅ Logo inline `Nav.tsx` l.81 / `Footer.tsx` l.76 = tampon d'acte (`circle r9` + `circle r5.5` + `path M8.5 12h7`), unique, pas d'éclair.
- ✅ OG `app/opengraph-image.tsx` + `app/en/opengraph-image.tsx` → `SiteOgImage.tsx` (palette du site, mark tampon, sans dégradé/★).

### Auteur / E-E-A-T — ⚠️
- ✅ **Cédric H.** (prénom + initiale) partout : niche.config, `/auteurs/cedric-h`, `/en/auteurs/cedric-h`, JSON-LD Person + Article.author, 64/64 frontmatters `authorSlug: "cedric-h"`. Bio E-E-A-T crédible (ex-analyste crédit entreprises, Namur ; contrôleur de gestion PME Hainaut). Unique au réseau. Pas de « la rédaction ».
- ⚠️ **Auteur non traduit en EN** : pas de `localized.en.author` ; page auteur EN, AuthorCard et JSON-LD des articles EN en français.
- ⚠️ **Liens auteur non localisés** : `AuthorByline` l.56, `AuthorCard` l.105/124 (`/auteurs/<slug>` en dur) et `ArticleView` l.149 (`author.url`) → pages FR depuis les articles EN.
- mineur (dormant) : route legacy `app/(site)/[article]/page.tsx` sans `authorName` + repli `'Auteur'` en JSON-LD (aucun article standalone aujourd'hui).

## Anti-footprint
- Identité distincte (mark tampon, prune, Libre Caslon Text, Cédric H.). Défauts partagés = template (cookies/Analytics, liens auteur).

## Top actions prioritaires
1. ❌ fonds-investissement.be — monter un bandeau cookies RGPD FR+EN (léger, Accepter/Refuser, lien politique, choix mémorisé) dans le root layout.
2. ❌ Conditionner `<Analytics />` au consentement.
3. ⚠️ Corriger le template : bandeau cookies + Analytics conditionnel par défaut (3ᵉ audit consécutif avec ce bloquant).
4. ⚠️ Ajouter `localized.en.author { title, bio }` et le consommer côté EN (page auteur, AuthorCard, JSON-LD).
5. ⚠️ Localiser les liens auteur via `localePath` ; compléter `/en/privacy` (adresse) + base légale / retrait du consentement.
