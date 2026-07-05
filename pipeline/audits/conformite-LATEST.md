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
- **Identité ❌ — logo/favicon = éclair générique.** `components/layout/Nav.tsx` rend un mark « bolt-in-hexagon » (hexagone contenant un **éclair**) ; `app/icon.svg` reprend exactement le même path (`fill="#0B6E80"`). Éclair réseau à remplacer par une marque sur mesure.
- Pages légales : remplies, noindex, infos société exactes ✅. **Auteur ✅** : « Julien » (prénom seul), slug `julien`, JSON-LD `Person.name` = « Julien », bio E-E-A-T solide. Aucun patronyme.

#### Site 10 — meilleure-carte-credit.be (Live, claude/setup-nextjs-apple-guide-En4gb)
- **Auteur ❌ BLOQUANT — RÈGLE NOM violée : patronyme complet « Sophie Laurent » affiché partout (rendu réel).** `niche.config.ts` (`author.name: 'Sophie Laurent'` + bio), `i18n/fr.json` + `i18n/en.json`, H1 page auteur, **JSON-LD `Person.name`**, `<title>`/OG, AuthorCard — FR + EN. **Seul site du réseau à afficher encore un patronyme complet.** Correctif : `author.name` → « Sophie L. ».
- **Légal/RGPD ✅** — pages légales bilingues complètes, noindex, infos société exactes ; `CookieConsent` monté (`lang={lang}`), aucun analytics chargé (conforme par construction).
- **Identité ✅** — favicon `app/icon.svg` + `favicon.ico` ; logo inline `BrandMark.tsx` (pas d'éclair) ; OG distinct.
- *Branche de setup non mergée en main — à corriger avant prod.*

---

### ⚠️ RÉSERVES

#### Site 11 — meilleure-fibre-internet.be (Configuré, main)
- **Légal/RGPD ⚠️** — pages FR+EN remplies, noindex, infos société exactes ✅ ; `CookieConsent` monté au root, tracker gaté (`GatedAnalytics`) ✅. **Réserve :** bandeau **FR-only** (texte en dur) → affiché en FR sur `/en/*`.
- **Identité ⚠️** — `app/icon.svg` + Nav = hexagone fibre sur mesure ✅ ; **mais `Footer.tsx` rend l'éclair générique**. OG = template générique partagé (★), **identique à electricite** → empreinte réseau.
- **Auteur ✅** — « Nicolas » (prénom seul), slug `nicolas`, conforme.

#### Site 3 — meilleure-voiture-familiale.be (Live, main)
- **Identité ⚠️** — logo Nav générique « maison/chevron » dupliqué du favicon (pas propre à la niche). Favicon présent ✅.
- **Légal/RGPD ✅** — pages remplies, noindex, infos société exactes ; `CookieConsent` monté FR+EN, gaté.
- **Auteur ✅** — « Audrey P. » affiché. *Réserve slug `audrey-pirard`.*

#### Site 4 — meilleure-voiture-utilitaire.be (Live, main)
- **Légal/RGPD ✅ (réserve mineure)** — pages remplies, noindex, infos société exactes ; `CookieBanner` monté FR+EN. **Réserve :** `<Analytics/>` **non gaté** (cookieless, mais incohérent avec 7-places) — à harmoniser.
- **Identité ✅** — favicon + logo inline « van » sur mesure. **Réserve anti-footprint :** OG **byte-identique (sha `c9b26dd`) à 7-places.be**.
- **Auteur ✅** — « Damien L. » affiché. *Réserve frontmatter `authorSlug: "damien-lardinois"`.*

---

### ✅ CONFORMES (réserves mineures possibles)

#### Site 1 — meilleure-voiture.be (Live, main)
- Légal/RGPD ✅ (CookieConsent avec locale + `GatedAnalytics`, référence) · Identité ✅ (logo « voiture » inline, OG distinct) · Auteur ✅ « Julien V. » (*réserve slug `julien-vanderhaeghe`*).

#### Site 2 — meilleur-suv.be (Live, main)
- Légal/RGPD ✅ (CookieConsent FR+EN, gaté) · Identité ✅ (hexagone banc d'essai, OG distinct) · Auteur ✅ « Damien C. » (*réserve slug `damien-crols`*).

#### Site 5 — meilleure-voiture-7-places.be (Live, main)
- **Légal/RGPD ✅ (RÉSOLU)** — bandeau désormais présent, monté FR+EN, gaté (`GatedAnalytics`). · Identité ✅ (arche/sièges ; *réserve OG byte-identique à utilitaire*). · Auteur ✅ « Sophie L. » (pas d'articles réels).

#### Site 6 — meilleure-voiture-electrique (Live, branche)
- Légal/RGPD ✅ (Clarity + Vercel gatés, politique la plus détaillée) · Identité ✅ (monogramme MV, OG distinct) · **Auteur ✅ « Christophe F. » conforme y compris slug `christophe-f`.**

#### Site 7 — quel-operateur-choisir.be (Live, main)
- Légal/RGPD ✅ (CookieConsent FR+EN, `GatedAnalytics`) · Identité ✅ (SignalBars, OG propre) · Auteur ✅ « Maxime D. » (*réserve slug `maxime-dubois`*).

#### Site 8 — meilleur-fournisseur-energie-be (Live, main)
- Légal/RGPD ✅ (CookieConsent bilingue, `GatedAnalytics`) · **Identité ✅ (AMÉLIORÉ : logo « soleil » désormais distinct du favicon)** · Auteur ✅ « Camille M. » (*réserve slug `camille-mertens`*).

#### Site 9 — meilleures-assurances-auto.be (Live, main)
- Légal/RGPD ✅ (légal FR+EN, `GatedAnalytics`) · **Identité ✅ (AMÉLIORÉ : logo bouclier inline en Nav)** · Auteur ✅ « Thomas R. » (*réserve slug `thomas-renard` + frontmatter articles*).

#### Site 13 — meilleure-neobanque.be (Configuré, main)
- **Légal/RGPD ✅ (RÉSOLU)** — bandeau désormais bilingue FR+EN, tracker gaté. · Identité ✅ (pièce+flèche, OG différencié). · **Auteur ✅ nom affiché « Maxime »** mais *réserve : slug `maxime-vanderlinden` expose « Vanderlinden » dans URL/canonical/og:url/**JSON-LD `Person.url`** → corriger en `maxime`.*

---

## 3. Récapitulatif des points critiques

### Bandeaux cookies / légal manquants
- **Bloquant :** site 12 (electricite) — `<Analytics/>` non gaté + bandeau absent sur `/en` et non fonctionnel en FR.
- **Réserve FR-only :** site 11 (fibre).
- **Réserve gating incohérent :** site 4 (utilitaire, Analytics non gaté).
- **Pages légales :** les 13 sites remplies, noindex, infos société exactes. Aucun placeholder.

### Auteurs génériques
- Aucun (« la rédaction »/vide) : les 13 sites ont un auteur nommé + bio E-E-A-T + page auteur + JSON-LD `Person`.

### Auteurs affichant un NOM DE FAMILLE complet (non conforme règle nom)
| Site | Patronyme affiché | Où |
|------|-------------------|-----|
| **meilleure-carte-credit.be** ❌ | **Laurent** (Sophie) | config `author.name` + bio, `i18n/fr.json`+`en.json`, H1 page auteur, JSON-LD `Person.name`, `<title>`/OG, AuthorCard (FR+EN) |

**Seul site non conforme au rendu.** 12 autres conformes (prénom + initiale / prénom seul).

### Patronyme exposé via le SLUG uniquement (nom affiché OK — réserve à lister)
`julien-vanderhaeghe` (voiture) · `damien-crols` (suv) · `audrey-pirard` (familiale) · `damien-lardinois` (utilitaire, frontmatter) · `maxime-dubois` (quel-operateur) · `camille-mertens` (energie) · `thomas-renard` (assurances-auto, + frontmatter articles) · `maxime-vanderlinden` (neobanque → aussi `Person.url`/canonical/og:url).
Conformes jusqu'au slug : `christophe-f`, `nicolas`, `julien`.

### Identité — logos éclair / génériques
- **❌ site 12** (electricite) : logo + favicon = éclair générique.
- **⚠️ site 11** (fibre) : éclair résiduel au `Footer.tsx`.
- **⚠️ site 3** (familiale) : logo Nav « maison/chevron » générique.
- **Anti-footprint OG :** byte-identique utilitaire↔7-places (sha `c9b26dd`) ; template ★ partagé fibre↔electricite.

---

## 4. Évolution depuis le run précédent (2026-06-28)

**Corrigé :** règle nom 10 → 1 site non conforme (tous les patronymes affichés passés en prénom+initiale sauf carte-credit) · 7-places.be bandeau cookies (absent → monté+gaté) · neobanque.be bandeau (/en absent → bilingue+gaté) · energie logo (flamme=favicon → soleil distinct) · assurances-auto logo (wordmark → bouclier inline).

**Nouveau / non résolu :** electricite.be (2 bloquants RGPD + éclair) · fibre.be (réserves : éclair footer, FR-only, OG partagé) · carte-credit.be (« Sophie Laurent » toujours affiché) · footprint OG persistant.

---

## 5. Top 5 actions prioritaires

1. **[BLOQUANT RGPD] meilleur-fournisseur-electricite.be** — gater `<Analytics/>` (pattern `GatedAnalytics`) + monter le bandeau cookies sur `app/en/layout.tsx` + le rendre fonctionnel/bilingue.
2. **[BLOQUANT RÈGLE NOM] meilleure-carte-credit.be** — « Sophie Laurent » → « Sophie L. » dans `niche.config.ts`, `i18n/fr.json`+`en.json` (name + bio), aligner le slug.
3. **[BLOQUANT Identité] meilleur-fournisseur-electricite.be** — remplacer le logo/favicon éclair par un mark SVG sur mesure.
4. **[RGPD FR+EN] meilleure-fibre-internet.be** — bandeau cookies bilingue (prop `lang`) + retirer l'éclair du `Footer.tsx`.
5. **[Anti-footprint] OG partagés** — différencier utilitaire↔7-places et fibre↔electricite ; remplacer le logo Nav générique de meilleure-voiture-familiale.be.

*Réserve transverse : 8 sites exposent le patronyme dans le slug `/auteurs/<slug>` (nom affiché conforme). À aligner sur le prénom seul si la doctrine veut zéro patronyme même en URL/JSON-LD.*

---

*Audit auto (tâche `emd-audit-conformite`). Lecture seule ; rendu réel tracé. Choix autonomes : périmètre 13 sites Live/Configuré ; CGU non bloquante ; slug patronymique classé en réserve (le nom affiché prime).*
