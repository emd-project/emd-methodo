# Audit CONFORMITÉ & IDENTITÉ — 2026-10-15

**Domaine d'audit :** conformité & identité (Légal/RGPD · Identité · Auteur/E-E-A-T)
**Mode :** LECTURE SEULE sur les sites — rendu réel audité (layouts réellement montés, SVG inline `Nav.tsx`/`Footer.tsx`, `app/icon`, `app/opengraph-image`, JSON-LD de `ArticleView`).
**Périmètre (restreint ≤14j = provisionné ≥ 2026-10-01, non déjà audité par ce domaine) :** 1 site.

| Site | Repo | Provisionné | Statut périmètre |
|---|---|---|---|
| beste-waterdispenser.be | `emd-project/beste-waterfontein.be` (ancien nom conservé) | 2026-10-01 | ✅ audité (nouveau) |

Aucun re-scan du parc. Site bilingue **NL (défaut) + EN** par conception (propriété Spadel) — les exigences « FR+EN » de la doctrine s'appliquent ici en NL+EN.
Limites : clone git indisponible → lecture fichier par fichier (`github_read_file`) ; santé prod non vérifiée (pas de fetch HTTP dans ce run).

---

## Scorecard

| Site | Légal & RGPD | Identité | Auteur / E-E-A-T | Auteur affiché | Nom de famille ? |
|---|:---:|:---:|:---:|---|:---:|
| beste-waterdispenser.be | ❌ | ✅ | ✅ (⚠️ mineurs) | Wouter D. | Non ✅ |

Légende : ✅ conforme · ⚠️ écart important · ❌ bloquant.

**Synthèse :**
- ❌ **Aucun bandeau cookies** (ni composant, ni montage dans `app/layout.tsx`, `app/(site)/layout.tsx`, `app/en/layout.tsx`) **et `<Analytics />` Vercel monté sans condition** dans `app/layout.tsx` — même défaut que 5/7 sites de l'audit du 2026-10-01.
- ✅ Pages légales NL + EN remplies, `noindex,nofollow`, infos société exactes (MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne).
- ✅ Identité sur mesure : mark **gobelet** (pas l'éclair générique) en Nav, Footer, favicon `app/icon.svg` et OG `app/opengraph-image.tsx` (+ `app/en/opengraph-image.tsx`).
- ✅ **Règle NOM auteur conforme** : « Wouter D. » partout (niche.config, pages auteur NL/EN, JSON-LD Person + Article.author, frontmatter en `authorSlug: "wouter-d"`).

---

## Détail — beste-waterdispenser.be

### Légal & RGPD — ❌
- ✅ `/juridische-informatie` + `/privacybeleid` (NL) et `/en/legal-notice` + `/en/privacy` (EN) : remplis, aucun placeholder, `robots: { index:false, follow:false }`, hreflang nl/en/x-default.
- ✅ Infos société exactes (NL + EN legal notice). Hébergeur Vercel mentionné.
- ❌ **Bandeau cookies absent** : `components/**` ne contient aucun composant consentement (`ui/` = AuthorByline, AuthorCard, ImagePlaceholder) ; aucun layout n'en monte. Bloquant.
- ❌ **`<Analytics />` (`@vercel/analytics/next`) inconditionnel** dans `app/layout.tsx` → mesure d'audience chargée avant tout consentement. Les politiques NL/EN annoncent pourtant des « analytische cookies via Vercel Analytics » sans mécanisme d'acceptation/refus.
- ⚠️ mineur : `/en/privacy` → « Data controller » omet l'adresse du siège (présente en NL).
- ⚠️ mineur : la politique ne décrit ni la base légale du traitement analytique ni le moyen de retirer son consentement (à ajouter avec le bandeau).

### Identité — ✅
- ✅ Favicon servi via **`app/icon.svg`** : carré pétrole `#0A5C7E` + gobelet blanc.
- ✅ **Logo rendu unique** : SVG inline `Nav.tsx` = gobelet (`M5 3h14l-1.7 17.3…`), repris dans `Footer.tsx`. Pas d'éclair générique. Aucun autre site du réseau connu n'utilise ce tracé.
- ✅ **OG unique** via `app/opengraph-image.tsx` → `components/og/SiteOgImage.tsx` (palette du site, mark gobelet, sans dégradé ni filigrane ★, services limités aux outils actifs ; refait le 2026-10-14). Variante EN montée.
- mineur : `niche.config.logo: 'beste·waterdispenser'` n'est pas lu (le wordmark rend `siteName`) — sans impact.

### Auteur / E-E-A-T — ✅ (mineurs)
- ✅ Auteur identifié **Wouter D.** — « Facility-journalist, water op het werk » ; bio E-E-A-T crédible (10 ans facility coordinator, contrats waterkoelers, calcul prix/litre), bio + titre traduits EN (`localized.en`).
- ✅ Pages auteur `/auteurs/wouter-d` et `/en/auteurs/wouter-d` avec JSON-LD `Person` (name, jobTitle, description, worksFor) ; hreflang sur la version EN.
- ✅ JSON-LD `Article.author` = `Person` « Wouter D. » + url + jobTitle + description (`components/article/ArticleView.tsx`) ; byline + AuthorCard rendus avec le nom.
- ✅ Frontmatter échantillonné (`waterkoeler-op-waterleiding-of-met-packs.mdx`) : `authorSlug: "wouter-d"`, aucun patronyme. Transparence Spadel affichée sur la page auteur (bon pour la confiance).
- ✅ Auteur unique au réseau (aucun autre « Wouter » dans emd-methodo).
- ⚠️ mineur : `AuthorByline` et `AuthorCard` lient en dur `/auteurs/<slug>` sans `localePath` → sur les articles EN, le lien auteur pointe vers la page **NL**.
- ⚠️ mineur (dormant) : la route legacy `app/(site)/[article]/page.tsx` appelle `AuthorByline`/`AuthorCard` **sans `authorName`** (→ nom vide) et met `name: … || 'Auteur'` en JSON-LD. Aucun `content/articles/` aujourd'hui, donc rien de rendu — à corriger avant tout article standalone.

---

## Anti-footprint
- Logo gobelet, palette pétrole `#0A5C7E` (mutée le 2026-10-14 pour s'écarter de besttennisshoes.be), auteur Wouter D. : distincts du réseau.

---

## Top actions prioritaires
1. ❌ **Créer un bandeau cookies RGPD NL+EN** (léger, Accepter / Weigeren · Accept / Decline, lien vers `/privacybeleid` · `/en/privacy`, choix mémorisé) et le **monter dans `app/layout.tsx`**.
2. ❌ **Conditionner `<Analytics />` au consentement** (ne charger Vercel Analytics qu'après « Accepter »).
3. ⚠️ Compléter `/privacybeleid` + `/en/privacy` : base légale (consentement), retrait du consentement via le bandeau ; ajouter l'adresse du siège dans `/en/privacy`.
4. ⚠️ Localiser les liens auteur de `AuthorByline`/`AuthorCard` (`localePath(locale, '/auteurs/…')`).
5. mineur : passer `authorName={niche.author.name}` dans `app/(site)/[article]/page.tsx` (route legacy dormante).
