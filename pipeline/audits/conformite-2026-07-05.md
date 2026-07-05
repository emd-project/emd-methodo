# Audit QA — CONFORMITÉ & IDENTITÉ — Réseau EMD

**Date :** 2026-07-05
**Mode :** LECTURE SEULE sur les sites — seul ce rapport est écrit (dans `emd-methodo`).
**Doctrine :** `emd-project/emd-methodo:skills/emd-audit/SKILL.md` v1.5.0 — principe « auditer le RENDU RÉEL, pas le fichier au bon nom » (import + montage tracés ; logo = SVG inline du `Nav.tsx`/`Header.tsx` ; favicon = `app/icon` ; OG = `app/opengraph-image` ; auteur = nom réellement rendu).
**Domaines audités (uniquement) :** LÉGAL & RGPD · IDENTITÉ · AUTEUR / E-E-A-T (incl. **règle nom** : prénom seul ou prénom + initiale ; jamais de patronyme complet affiché).
**Périmètre :** 13 sites « Live » / « Configuré » de `pipeline/sites.csv` (11 Live + 2 Configuré). +2 sites vs run précédent (ajout de `meilleure-fibre-internet.be` et `meilleur-fournisseur-electricite.be`).

---

## 1. Scorecard

| # | Site | Statut | Branche | Légal-RGPD | Identité | Auteur | Nom affiché |
|---|------|--------|---------|:---:|:---:|:---:|---|
| 1 | meilleure-voiture.be | Live | main | ✅ | ✅ | ✅ | Julien V. |
| 2 | meilleur-suv.be | Live | main | ✅ | ✅ | ✅ | Damien C. |
| 3 | meilleure-voiture-familiale.be | Live | main | ✅ | ⚠️ | ✅ | Audrey P. |
| 4 | meilleure-voiture-utilitaire.be | Live | main | ✅ | ✅ | ✅ | Damien L. |
| 5 | meilleure-voiture-7-places.be | Live | main | ✅ | ✅ | ✅ | Sophie L. |
| 6 | meilleure-voiture-electrique | Live | claude/no-image-spec-generator-nTjFC | ✅ | ✅ | ✅ | Christophe F. |
| 7 | quel-operateur-choisir.be | Live | main | ✅ | ✅ | ✅ | Maxime D. |
| 8 | meilleur-fournisseur-energie-be | Live | main | ✅ | ✅ | ✅ | Camille M. |
| 9 | meilleures-assurances-auto.be | Live | main | ✅ | ✅ | ✅ | Thomas R. |
| 10 | meilleure-carte-credit.be | Live | claude/setup-nextjs-apple-guide-En4gb | ✅ | ✅ | ❌ | **Sophie Laurent** |
| 11 | meilleure-fibre-internet.be | Configuré | main | ⚠️ | ⚠️ | ✅ | Nicolas |
| 12 | meilleur-fournisseur-electricite.be | Configuré | main | ❌ | ❌ | ✅ | Julien |
| 13 | meilleure-neobanque.be | Configuré | main | ✅ | ✅ | ✅ | Maxime |

Légende : ✅ conforme · ⚠️ réserve · ❌ non conforme / bloquant.

**Synthèse chiffrée :**
- Légal-RGPD : 10 ✅ · 2 ⚠️ · 1 ❌ (bloquant : site 12).
- Identité : 10 ✅ · 2 ⚠️ · 1 ❌ (bloquant : site 12).
- Auteur (nom affiché) : 12 ✅ · 0 ⚠️ · 1 ❌ (bloquant : site 10).
- **1 seul site sur 13 affiche encore un nom de famille complet** (`meilleure-carte-credit.be` — « Sophie Laurent »). Les 12 autres sont passés en prénom + initiale (ou prénom seul) → **règle nom quasi généralisée** (vs 10 sites non conformes au run précédent).
- Pages légales : **toutes présentes, remplies (aucun `[À compléter]`), en noindex, infos société exactes** (MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne) sur les 13 sites.

---

## 2. Détail par site (trié par sévérité)

### ❌ BLOQUANTS

#### Site 12 — meilleur-fournisseur-electricite.be (Configuré, main)
- **Légal/RGPD ❌ BLOQUANT — tracker AVANT consentement.** `app/layout.tsx` importe et monte `<Analytics />` (`@vercel/analytics/next`) **inconditionnellement** en fin de `<body>`, sur toutes les pages. Pas de `GatedAnalytics` dans le repo → mesure d'audience sans consentement.
- **Légal/RGPD ❌ BLOQUANT — bandeau cookies absent sur `/en` + non fonctionnel en FR.** `CookieBanner.tsx` n'est monté que dans `app/(site)/layout.tsx` ; `app/en/layout.tsx` ne monte que `<Nav/>`+`<Footer/>` → aucun bandeau sur tout l'arbre `/en`. Même côté FR, `decide()` écrit `localStorage['cookie-consent']` mais **aucun script ne lit cette clé** (Analytics déjà chargé) → consentement décoratif. Lien « En savoir plus » figé vers `/confidentialite` (FR) même sur pages EN ; texte FR en dur (pas de prop `lang`).
- **Identité ❌ — logo/favicon = éclair générique.** `components/layout/Nav.tsx` rend un mark « bolt-in-hexagon » (path `M12 1.2 21.85 6.9 V17.1 … L12.95 6.2 L7.7 13.6 …` = hexagone contenant un **éclair**) ; `app/icon.svg` reprend exactement le même path (`fill="#0B6E80"`). Éclair réseau à remplacer par une marque sur mesure.
- Pages légales : remplies, noindex, infos société exactes ✅. **Auteur ✅** : « Julien » (prénom seul), slug `julien`, JSON-LD `Person.name` = « Julien », bio E-E-A-T solide (10 ans énergie, CREG/VREG/CWaPE). Aucun patronyme.

#### Site 10 — meilleure-carte-credit.be (Live, claude/setup-nextjs-apple-guide-En4gb)
- **Auteur ❌ BLOQUANT — RÈGLE NOM violée : patronyme complet « Sophie Laurent » affiché partout (rendu réel).**
  - `niche.config.ts` → `author.name: 'Sophie Laurent'`, `slug: 'sophie-laurent'`, bio « **Sophie Laurent** a passé huit ans… ».
  - `i18n/fr.json` + `i18n/en.json` → `author.name: "Sophie Laurent"` + même bio.
  - **Rendu :** H1 de la page auteur (`{author.name}`), **JSON-LD `Person.name` = "Sophie Laurent"**, `<title>` metadata + OpenGraph title, `AuthorCard` (byline), lien footer. Patronyme dans le HTML indexable ET les données structurées, FR et EN.
  - **Seul site du réseau à afficher encore un patronyme complet.** Correctif : `author.name` → « Sophie L. » (ou prénom seul) dans `niche.config.ts`, `i18n/fr.json`, `i18n/en.json` (`author.name` + 1re phrase de la bio) ; aligner le `slug`.
- **Légal/RGPD ✅** — `mentions-legales` + `confidentialite` bilingues, très complètes, noindex, infos société exactes ; `CookieConsent` monté dans `app/[lang]/layout.tsx` (`lang={lang}`), bilingue, Accepter/Refuser, lien politique. Aucun analytics chargé → aucun tracker avant consentement (conforme par construction).
- **Identité ✅** — favicon `app/icon.svg` + `favicon.ico` ; logo inline `BrandMark.tsx` (« M » crème + point rouge sur carré encre, pas d'éclair) ; OG distinct (carte éditoriale papier crème).
- *Note : branche de setup non mergée en main — à corriger avant mise en production.*

---

### ⚠️ RÉSERVES

#### Site 11 — meilleure-fibre-internet.be (Configuré, main)
- **Légal/RGPD ⚠️** — pages légales FR+EN remplies, noindex, infos société exactes ✅ ; `CookieConsent` monté au root `app/layout.tsx` (couvre FR+/en), Accepter/Refuser, lien politique, tracker **gaté** (`GatedAnalytics`, Vercel Analytics seulement après `mnb-cookie-consent === 'accepted'`) ✅. **Réserve :** bandeau **FR-only** (texte en dur, pas de prop `lang`) → s'affiche en français sur `/en/*`.
- **Identité ⚠️ — éclair résiduel au Footer.** `app/icon.svg` = hexagone + nœud (motif fibre) sur mesure ✅ ; `Nav.tsx` = même hexagone inline ✅ ; **mais `Footer.tsx` rend l'éclair générique** (`<path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z" fill="#fff" />`). L'éclair n'a été remplacé qu'au Nav. **OG ⚠️** : `opengraph-image.tsx` = template générique partagé (barre accent + eyebrow `DOMAIN·YEAR` + « Comparateur · Quiz · Simulateur » + watermark ★), **identique à electricite** → empreinte réseau.
- **Auteur ✅** — « Nicolas » (prénom seul), slug `nicolas`, JSON-LD `Person.name` = « Nicolas », bio E-E-A-T (8 ans télécoms, ex-technicien). Conforme.

#### Site 3 — meilleure-voiture-familiale.be (Live, main)
- **Identité ⚠️ — logo Nav générique.** `Nav.tsx` rend un pictogramme « maison/chevron » passe-partout (`M12 3 L21 11 H18 V20 H6 V11 H3 Z`), dupliqué depuis `app/icon.svg` — pas de mark propre à la niche « familiale » (ce n'est pas l'éclair, mais un mark template à différencier). Favicon `app/icon.svg` présent ✅. OG typé (ivoire + terracotta) mais squelette potentiellement partagé — à vérifier.
- **Légal/RGPD ✅** — pages remplies, noindex, infos société exactes ; `CookieConsent` monté FR (`app/(site)/layout.tsx`) + EN (`app/(en)/layout.tsx`), Accepter/Refuser, lien politique, gaté.
- **Auteur ✅** — « Audrey P. » affiché partout (config, H1 page auteur, JSON-LD `Person.name`), bio E-E-A-T (teste depuis 2015, Wavre, Isofix). *Réserve slug : `audrey-pirard` expose « Pirard » dans l'URL / `Person.url`.*

#### Site 4 — meilleure-voiture-utilitaire.be (Live, main)
- **Légal/RGPD ✅ (réserve mineure)** — pages remplies, noindex, infos société exactes ; `CookieBanner.tsx` monté FR+EN, Accepter/Refuser, lien politique. **Réserve :** `app/layout.tsx` monte `<Analytics/>` (Vercel) **non gaté** (cookieless, défendable RGPD, mais **incohérent** avec le sibling 7-places qui gate via `GatedAnalytics`) — à harmoniser.
- **Identité ✅** — favicon `app/icon.svg` (van+chevrons) ; logo inline « van/fourgon » sur mesure cohérent Nav/favicon ; OG `opengraph-image.tsx`. **Réserve anti-footprint :** OG **byte-identique (sha `c9b26dd`) à celui de 7-places.be** (même template ★) — seule palette/tagline diffère.
- **Auteur ✅** — « Damien L. » affiché (config, page auteur, JSON-LD). *Réserve : frontmatter articles `authorSlug: "damien-lardinois"` (non affiché, rendu via `niche.author.name`).*

---

### ✅ CONFORMES (réserves mineures possibles)

#### Site 1 — meilleure-voiture.be (Live, main)
- **Légal/RGPD ✅** — pages remplies, noindex, infos société exactes ; `CookieConsent` monté avec locale, Accepter/Refuser, gating réel (`GatedAnalytics`), FR+EN — implémentation de référence.
- **Identité ✅** — favicon `app/icon.svg` ; logo inline « voiture/calandre » sur mesure dans `Nav.tsx` (arcs de roues), pas d'éclair ; OG distinct (gradient naval + filigrane voiture orange).
- **Auteur ✅** — « Julien V. » partout (config, page auteur, JSON-LD, byline, OG), bio crédible (essais depuis 2012, TÜV/ADAC, Liège). *Réserve slug `julien-vanderhaeghe`.*

#### Site 2 — meilleur-suv.be (Live, main)
- **Légal/RGPD ✅** — pages remplies, noindex, infos société exactes (+ hébergeur Vercel déclaré) ; `CookieConsent` monté FR (`app/(site)/layout.tsx`) + EN (`app/en/layout.tsx`), Accepter/Refuser, gaté.
- **Identité ✅** — favicon `app/icon.svg` ; logo inline « hexagone banc d'essai » sur mesure ; OG distinct (graphite + accent cuivre).
- **Auteur ✅** — « Damien C. » affiché partout (config, H1, JSON-LD, AuthorCard), bio crédible (SUV depuis 2014, Namur). *Réserve slug : `damien-crols` expose « Crols » dans URL / og:url / `Person.url` / `authorSlug` articles.*

#### Site 5 — meilleure-voiture-7-places.be (Live, main)
- **Légal/RGPD ✅ (RÉSOLU)** — bandeau **désormais présent et gaté** : `CookieConsent.tsx` monté FR (`app/(site)/layout.tsx`) + EN (`app/en/layout.tsx`) ; `GatedAnalytics.tsx` ne charge Vercel Analytics qu'après `cookie-consent === 'accepted'`. Accepter/Refuser + lien localisé. **Meilleure implémentation RGPD des sites auto.** Pages légales remplies, noindex, infos société exactes.
- **Identité ✅** — favicon `app/icon.svg` (arche famille) ; logo inline « arche/sièges » sur mesure. **Réserve anti-footprint :** OG byte-identique à utilitaire.be (sha `c9b26dd`).
- **Auteur ✅** — « Sophie L. » (config, page auteur, JSON-LD), bio E-E-A-T (journaliste auto familiale depuis 2013, mère de 3). Articles réels absents (`_example.mdx` seul) → aucun leak.

#### Site 6 — meilleure-voiture-electrique (Live, claude/no-image-spec-generator-nTjFC)
- **Légal/RGPD ✅** — `mentions-legales`, `confidentialite`, `/cookies` remplies, noindex, infos société exactes ; `CookieConsent` monté avec `locale` FR+EN ; trackers gatés (Microsoft Clarity `xd3rbvo9wu` seulement si consentement ; Vercel cookieless). Politique la plus détaillée du réseau.
- **Identité ✅** — favicon `app/icon.svg` (monogramme « MV ») ; logo typographique « MVE.be » (pas d'éclair) ; **OG entièrement distinct** (pierre `#F1F4F8`, barre éditoriale, titre serif) → anti-footprint OK.
- **Auteur ✅** — « Christophe F. » partout (page auteur, JSON-LD, frontmatter `author: christophe-f`, shortcode `PullQuote`), slug `christophe-f` (sans patronyme). Conforme y compris au slug.

#### Site 7 — quel-operateur-choisir.be (Live, main)
- **Légal/RGPD ✅** — pages remplies, noindex, infos société exactes ; `CookieConsent` monté FR+EN, Accepter/Refuser, `GatedAnalytics`.
- **Identité ✅** — favicon `app/icon.svg` (barres signal) ; logo inline `SignalBars` (4 barres multicolores) sur mesure ; OG propre (ivoire + wordmark violet).
- **Auteur ✅** — « Maxime D. » (config, H1, JSON-LD). *Réserve slug `maxime-dubois`.*

#### Site 8 — meilleur-fournisseur-energie-be (Live, main)
- **Légal/RGPD ✅** — pages remplies, noindex, infos société exactes ; `CookieConsent` monté, bilingue, `GatedAnalytics`. *Mineur : root layout sans `x-default` hreflang (hors périmètre conformité).*
- **Identité ✅ (AMÉLIORÉ)** — favicon `app/icon.svg` (flamme cuivre) ; **logo inline « soleil » (disque + 8 rayons) dans `Nav.tsx`, désormais distinct du favicon** (le run précédent flaggait un logo flamme = favicon) ; wordmark « Énerwatt » ; OG propre.
- **Auteur ✅** — « Camille M. » (config, page auteur, JSON-LD, bio « Camille » seul). *Réserve slug `camille-mertens`.*

#### Site 9 — meilleures-assurances-auto.be (Live, main)
- **Légal/RGPD ✅** — `mentions-legales` FR + `/en/mentions-legales`, `confidentialite` FR + EN, toutes remplies, noindex, infos société exactes (FR + EN) ; `CookieConsent` monté FR+EN, `GatedAnalytics`.
- **Identité ✅ (AMÉLIORÉ)** — favicon `app/icon.svg` (bouclier + coche émeraude) + `apple-icon.svg` ; **logo inline bouclier + coche dans `Nav.tsx`** (le run précédent flaggait un wordmark texte seul) ; OG propre (porcelaine verte + watermark €).
- **Auteur ✅** — « Thomas R. » affiché partout (config, H1, JSON-LD, metadata), bio E-E-A-T (ex-courtier FSMA). *Réserve slug `thomas-renard` (+ frontmatter articles).*

#### Site 13 — meilleure-neobanque.be (Configuré, main)
- **Légal/RGPD ✅ (RÉSOLU)** — bandeau **désormais bilingue et complet** : `CookieConsent.tsx` (prop `lang`) monté FR (`app/(site)/layout.tsx`) + EN (`app/en/layout.tsx`), Accepter/Refuser, lien politique localisé ; **tracker gaté** via `GatedAnalytics` (`mnb-cookie-consent === 'accepted'`). Pages légales remplies, noindex, infos société exactes.
- **Identité ✅** — favicon `app/icon.svg` (pièce + flèche ascendante) ; logo inline cohérent (cercle + flèche) sur mesure ; **OG différencié** (carte bancaire + 3 barres ascendantes) → anti-footprint OK.
- **Auteur ✅ (nom affiché)** — « Maxime » (prénom seul) en H1 / JSON-LD `Person.name`, bio E-E-A-T (10 ans fintech). *Réserve slug : `author.slug = 'maxime-vanderlinden'` → patronyme « Vanderlinden » exposé dans l'URL `/auteurs/maxime-vanderlinden`, le canonical, l'`og:url` et le **JSON-LD `Person.url`**. Corriger le slug en `maxime`.*

---

## 3. Récapitulatif des points critiques

### Bandeaux cookies / légal
- **Bloquant :** site 12 (meilleur-fournisseur-electricite.be) — `<Analytics/>` non gaté (tracker avant consentement) + bandeau absent sur `/en` et non fonctionnel en FR.
- **Réserves (non bilingue / FR-only sur /en) :** site 11 (meilleure-fibre-internet.be, bandeau FR-only).
- **Réserve (gating incohérent) :** site 4 (meilleure-voiture-utilitaire.be, Vercel Analytics non gaté — cookieless mais à harmoniser).
- **Pages légales :** les 13 sites — remplies, noindex, infos société exactes (MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne). Aucun placeholder, aucun bloquant légal de contenu.

### Auteurs génériques
- Aucun site n'utilise « la rédaction » / auteur vide. Tous ont un auteur nommé, unique au site, avec bio E-E-A-T crédible, page auteur et JSON-LD `Person`.

### Auteurs affichant un NOM DE FAMILLE complet (violation RÈGLE NOM — à corriger, réserve)
| Site | Patronyme affiché | Où il est rendu |
|------|-------------------|-----------------|
| **meilleure-carte-credit.be** | **Laurent** (Sophie) — ❌ **NON CONFORME** | config `author.name` + bio, `i18n/fr.json` + `i18n/en.json`, **H1 page auteur**, **JSON-LD `Person.name`**, `<title>`/OG, AuthorCard — FR + EN |

**Seul site affichant encore un patronyme complet.** Les 12 autres affichent un prénom + initiale (ou prénom seul) et sont **conformes à la règle nom** au niveau du rendu.

### Patronyme exposé via le SLUG / URL / JSON-LD `Person.url` (nom affiché OK, réserve à lister)
Le nom *affiché* est conforme, mais le patronyme reste déductible dans l'URL publique `/auteurs/<slug>`, le `canonical`, l'`og:url`, le `Person.url` du JSON-LD et/ou l'`authorSlug` des articles :

| Site | Patronyme dans le slug | Nom affiché (conforme) |
|------|------------------------|------------------------|
| meilleure-voiture.be | `julien-vanderhaeghe` | Julien V. |
| meilleur-suv.be | `damien-crols` | Damien C. |
| meilleure-voiture-familiale.be | `audrey-pirard` | Audrey P. |
| meilleure-voiture-utilitaire.be | `damien-lardinois` (frontmatter) | Damien L. |
| quel-operateur-choisir.be | `maxime-dubois` | Maxime D. |
| meilleur-fournisseur-energie-be | `camille-mertens` | Camille M. |
| meilleures-assurances-auto.be | `thomas-renard` (+ frontmatter articles) | Thomas R. |
| meilleure-neobanque.be | `maxime-vanderlinden` (→ `Person.url`, canonical, og:url) | Maxime |

Conformes jusqu'au slug : meilleure-voiture-electrique (`christophe-f`), meilleure-fibre-internet.be (`nicolas`), meilleur-fournisseur-electricite.be (`julien`).

### Identité — autres réserves / bloquant
- **❌ Bloquant :** site 12 (electricite) — logo/favicon = éclair générique.
- **⚠️ site 11** (fibre) — éclair résiduel dans `Footer.tsx` (Nav OK).
- **⚠️ site 3** (familiale) — logo Nav générique (maison/chevron dupliqué du favicon).
- **Anti-footprint OG :** template OG **byte-identique** entre utilitaire.be & 7-places.be (sha `c9b26dd`) et entre fibre & electricite (template ★ « Comparateur · Quiz · Simulateur ») → à différencier. Les OG « bien différenciés » : voiture, suv, electrique, quel-operateur, energie, assurances-auto, carte-credit, neobanque.

---

## 4. Évolution depuis le run précédent (2026-06-28)

**Corrigé / amélioré :**
- **Règle nom (rendu) : 10 sites non conformes → 1 seul restant.** Tous les patronymes affichés ont été passés en prénom + initiale, sauf `meilleure-carte-credit.be` (« Sophie Laurent », toujours ❌).
- **meilleure-voiture-7-places.be** — bandeau cookies auparavant **totalement absent (bloquant)** → désormais monté FR+EN et gaté (`GatedAnalytics`). ✅ Résolu.
- **meilleure-neobanque.be** — bandeau auparavant **absent sur `/en` + FR-only (bloquant)** → désormais bilingue et gaté. ✅ Résolu (reste le slug patronymique).
- **meilleur-fournisseur-energie-be** — logo Nav flamme (= favicon) → **logo « soleil » distinct**. ✅
- **meilleures-assurances-auto.be** — Nav wordmark texte seul → **logo bouclier inline**. ✅

**Nouveau / non résolu :**
- **meilleur-fournisseur-electricite.be** (nouvellement audité) — 2 bloquants RGPD (`<Analytics/>` non gaté ; bandeau absent sur `/en`) + logo éclair générique. ❌
- **meilleure-fibre-internet.be** (nouvellement audité) — réserves : éclair au Footer, bandeau FR-only sur `/en`, OG template partagé. ⚠️
- **meilleure-carte-credit.be** — patronyme « Sophie Laurent » **toujours affiché** (non corrigé depuis le run précédent). ❌
- Footprint OG (utilitaire ↔ 7-places byte-identiques ; fibre ↔ electricite) — persistant.

---

## 5. Top 5 actions prioritaires

1. **[BLOQUANT RGPD] meilleur-fournisseur-electricite.be** — gater `<Analytics/>` derrière le consentement (adopter le pattern `GatedAnalytics` de fibre/neobanque) ET monter `CookieBanner` sur `app/en/layout.tsx` (absent sur tout `/en`) + rendre le bandeau réellement fonctionnel/bilingue.
2. **[BLOQUANT RÈGLE NOM] meilleure-carte-credit.be** — remplacer « Sophie Laurent » par « Sophie L. » dans `niche.config.ts` (`author.name` + bio), `i18n/fr.json` + `i18n/en.json` (`author.name` + 1re phrase de bio), et aligner le `slug` — corrige d'un coup H1, JSON-LD `Person.name`, `<title>`/OG et AuthorCard.
3. **[BLOQUANT Identité] meilleur-fournisseur-electricite.be** — remplacer le logo/favicon éclair (`Nav.tsx` + `app/icon.svg`) par un mark SVG sur mesure propre à la niche énergie.
4. **[RGPD FR+EN] meilleure-fibre-internet.be** — passer une prop `lang`/locale au bandeau cookies (actuellement FR en dur sur `/en`) ; retirer l'éclair résiduel du `Footer.tsx`.
5. **[Anti-footprint] OG partagés** — différencier `opengraph-image.tsx` entre utilitaire.be ↔ 7-places.be (byte-identiques) et fibre ↔ electricite (template ★) ; et remplacer le logo Nav générique « maison/chevron » de meilleure-voiture-familiale.be par un mark propre.

*Réserve transverse (à trancher au niveau doctrine) : 8 sites exposent encore le patronyme complet de l'auteur dans le **slug** `/auteurs/<slug>` (et parfois le `Person.url` du JSON-LD), alors que le nom affiché est conforme. Si la doctrine veut zéro patronyme même en URL/données structurées, aligner les slugs sur le prénom seul (réf. `christophe-f`, `nicolas`, `julien`).*

---

*Audit généré automatiquement (tâche planifiée `emd-audit-conformite`). Lecture seule sur les sites ; rendu réel tracé (import + montage). Choix autonomes notés : périmètre = 13 sites Live/Configuré ; CGU non bloquante (absente sur les comparateurs éditoriaux sans transaction) ; slug patronymique classé en réserve (le nom affiché prime, cf. doctrine « vérifie le rendu réel, pas seulement le slug »).*
