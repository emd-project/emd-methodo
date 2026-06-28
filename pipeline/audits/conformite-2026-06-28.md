# Audit QA — CONFORMITÉ & IDENTITÉ — Réseau EMD

**Date :** 2026-06-28
**Mode :** LECTURE SEULE sur les sites — seul ce rapport est écrit (dans `emd-methodo`).
**Doctrine :** `emd-project/emd-methodo:skills/emd-audit/SKILL.md` v1.5.0 — principe « auditer le RENDU RÉEL, pas le fichier au bon nom » (import + montage tracés ; logo = SVG inline du `Nav.tsx`/`Header.tsx` ; favicon = `app/icon` ; OG = `app/opengraph-image` ; auteur = nom réellement rendu).
**Domaines audités (uniquement) :** LÉGAL & RGPD · IDENTITÉ · AUTEUR / E-E-A-T.
**Périmètre :** 11 sites « Live » / « Configuré » de `pipeline/sites.csv`.

---

## 1. Scorecard

| # | Site | Branche | Légal-RGPD | Identité | Auteur | Nom de famille |
|---|------|---------|:---:|:---:|:---:|---|
| 1 | meilleure-voiture.be | main | ✅ | ✅ | ❌ | Julien **Vanderhaeghe** |
| 2 | meilleur-suv.be | main | ⚠️ | ✅ | ❌ | Damien **Crols** |
| 3 | meilleure-voiture-familiale.be | main | ⚠️ | ✅ | ❌ | Audrey **Pirard** |
| 4 | meilleure-voiture-utilitaire.be | main | ✅ | ✅ | ❌ | Damien **Lardinois** |
| 5 | meilleure-voiture-7-places.be | main | ❌ | ⚠️ | ❌ | Sophie **Lambrechts** |
| 6 | meilleure-voiture-electrique | claude/no-image-spec-generator-nTjFC | ✅ | ✅ | ✅ | — (Christophe F. conforme) |
| 7 | quel-operateur-choisir.be | main | ✅ | ✅ | ❌ | Maxime **Dubois** |
| 8 | meilleur-fournisseur-energie-be | main | ✅ | ⚠️ | ❌ | Camille **Mertens** |
| 9 | meilleures-assurances-auto.be | main | ✅ | ⚠️ | ❌ | Thomas **Renard** (propagé ~20 articles) |
| 10 | meilleure-carte-credit.be | claude/setup-nextjs-apple-guide-En4gb | ✅ | ✅ | ❌ | Sophie **Laurent** |
| 11 | meilleure-neobanque.be | main | ❌ | ⚠️ | ⚠️ | Maxime **Vanderlinden** (slug/URL only) |

Légende : ✅ conforme · ⚠️ réserve · ❌ non conforme / bloquant.

**Synthèse chiffrée :**
- Légal-RGPD : 7 ✅ · 2 ⚠️ · 2 ❌ (bloquants : sites 5 et 11)
- Identité : 7 ✅ · 4 ⚠️ · 0 ❌
- Auteur : 1 ✅ · 1 ⚠️ · 9 ❌
- **10 sites sur 11 affichent un nom de famille** (seul `meilleure-voiture-electrique` est conforme à la règle prénom-seul / prénom + initiale).
- Pages légales : **toutes présentes, remplies (aucun `[À compléter]`), en noindex, infos société exactes** sur les 11 sites.

---

## 2. Détail par site (trié par sévérité)

### ❌ BLOQUANTS

#### Site 5 — meilleure-voiture-7-places.be (main)
- **Légal/RGPD ❌ BLOQUANT — bandeau cookies TOTALEMENT ABSENT.** Aucun composant CookieBanner/CookieConsent dans `components/ui` ni `components/layout`. `app/(site)/layout.tsx` ne monte que `<Nav />` + `{children}` + `<Footer />` ; `app/layout.tsx` charge `<Analytics />` (Vercel) sans aucun gating de consentement. Politique de confidentialité décrit pourtant des cookies analytics.
- **Identité ⚠️ — éclair/bolt de template résiduel.** Le `Nav.tsx` rend un mark unique « arche famille » (toit + 3 sièges, cohérent avec `app/icon.svg`), MAIS `Footer.tsx` rend l'**éclair générique** `<path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z">` — footprint de template à retirer.
- **Auteur ❌** — « Sophie **Lambrechts** » rendu dans `niche.config author.name` + `author.slug`, H1/title/OG/canonical de `/auteurs/sophie-lambrechts`, JSON-LD `Person.name`, fichier avatar.
- Pages légales : présentes, remplies, noindex, infos société exactes ✅.

#### Site 11 — meilleure-neobanque.be (main)
- **Légal/RGPD ❌ BLOQUANT — bandeau cookies absent sur tout l'arbre `/en`.** `components/ui/CookieConsent.tsx` existe et est monté dans `app/(site)/layout.tsx` (FR), mais `app/en/layout.tsx` ne monte que `<Nav/>` + `<Footer/>` → aucune page `/en/...` n'affiche le bandeau. Aggravant : `app/layout.tsx` charge `<Analytics/>` (Vercel) globalement, donc mesure d'audience sur l'arbre EN sans consentement. De plus, le bandeau est **monolingue FR** (texte en dur, pas de prop `lang`) → ne satisfait pas l'exigence FR+EN même côté FR.
- **Identité ⚠️ — OG générique au template.** Favicon (`app/icon.svg`, 3 barres ascendantes) ✅ et logo inline unique (3 `<rect>` croissants dans `Nav.tsx`, pas de bolt) ✅, mais `app/opengraph-image.tsx` reste le visuel template (watermark ★, layout standard) sans motif propre à la niche néobanque → risque de ressemblance inter-sites.
- **Auteur ⚠️ — nom affiché OK, patronyme exposé dans le slug.** `author.name = 'Maxime'` (prénom seul, rendu OK en H1/JSON-LD `Person.name`). MAIS `author.slug = 'maxime-vanderlinden'` + `authorSlug` des articles → patronyme **« Vanderlinden »** rendu dans l'URL publique `/auteurs/maxime-vanderlinden`, le `canonical` et `Person.url`. À corriger (slug → `maxime`).
- *Mineur :* adresse hébergeur Vercel divergente entre sites (à harmoniser).

---

### ⚠️ RÉSERVES (légal non bilingue)

#### Site 2 — meilleur-suv.be (main)
- **Légal/RGPD ⚠️ — bandeau monté mais non bilingue.** `CookieConsent` importé+rendu dans `app/(site)/layout.tsx`, mais appelé `<CookieConsent />` sans prop `lang` → défaut `'fr'` en dur ; le sous-arbre `/en` garde un bandeau français. Conforme sur le fond (Accepter/Refuser, lien, gating analytics), mais déroge à l'exigence FR+EN.
- **Identité ✅** — favicon `app/icon.svg` (hexagone cuivre) ; logo inline unique « hexagone banc d'essai » dans `Nav.tsx` (pas de bolt) ; OG `app/opengraph-image.tsx` distinct (fond carbone + chips).
- **Auteur ❌** — « Damien **Crols** » dans `niche.config author.name`, H1 page auteur, JSON-LD, AuthorCard, et page `/a-propos` (×2). Bio commence par « Damien » (OK).
- Pages légales : remplies, noindex, infos société exactes ✅.

#### Site 3 — meilleure-voiture-familiale.be (main)
- **Légal/RGPD ⚠️ — même cas que site 2 :** `<CookieConsent />` rendu sans prop `lang` → bandeau FR sur l'arbre `/en`. Conforme sur le fond, pas réellement FR+EN.
- **Identité ✅** — favicon `app/icon.svg` (maison terracotta) ; logo inline « maison/toit » unique dans `Nav.tsx` ; OG ivoire clair distinct.
- **Auteur ❌** — « Audrey **Pirard** » dans `niche.config author.name`, H1 page auteur, JSON-LD, AuthorCard ; articles publiés référencent le slug `audrey-pirard` qui résout vers le patronyme complet à l'affichage.
- Pages légales : remplies, noindex, infos société exactes ✅.

---

### ✅ / ⚠️ (auteur non conforme, reste OK)

#### Site 1 — meilleure-voiture.be (main)
- **Légal/RGPD ✅** — pages remplies + noindex + infos société exactes ; `CookieConsent` monté dans `app/(site)/layout.tsx` **avec locale** (`lang={locale==='en'?'en':'fr'}`), Accepter/Refuser, gating réel (`GatedAnalytics`), FR+EN. Bonne implémentation de référence.
- **Identité ✅** — favicon `app/icon.svg` ; logo inline unique « silhouette voiture » dans `Nav.tsx` (pas de bolt) ; OG distinct (gradient naval + filigrane voiture).
- **Auteur ❌** — « Julien **Vanderhaeghe** » dans `niche.config author.name`, H1 `/auteurs/julien-vanderhaeghe`, title/OG, JSON-LD `Person.name`, AuthorCard. Bio body commence par « Julien » (OK).

#### Site 4 — meilleure-voiture-utilitaire.be (main)
- **Légal/RGPD ✅** — pages remplies + noindex + infos société exactes ; `components/ui/CookieBanner.tsx` importé+monté dans `app/(site)/layout.tsx`, FR+EN (locale déduite du chemin), Accepter/Refuser, lien politique, consentement localStorage, pas de tracker pub.
- **Identité ✅** — favicon `app/icon.svg` (van + chevrons) ; logo inline unique « van/fourgon » cohérent Nav/Footer/favicon (pas de bolt) ; OG sur palette du site.
- **Auteur ❌** — « Damien **Lardinois** » dans `niche.config author.name` + `author.slug`, page `/auteurs/[slug]` (H1/title/OG/canonical), JSON-LD `Person.name`, avatar, `authorSlug` des articles.

#### Site 7 — quel-operateur-choisir.be (main)
- **Légal/RGPD ✅** — pages remplies + noindex + infos société exactes (mot pour mot) ; `components/layout/CookieConsent.tsx` monté dans `app/(site)/layout.tsx`, FR+EN, Accepter/Refuser, `GatedAnalytics` (pas de tracker avant consentement).
- **Identité ✅** — favicon `app/icon.svg` (barres de signal) ; logo inline unique `SignalMark` (4 barres montantes multicolores) dans `Nav.tsx` (pas de bolt) ; OG distinct.
- **Auteur ❌** — « Maxime **Dubois** » dans `niche.config author.name`, H1 `/auteurs/maxime-dubois`, JSON-LD `Person.name`, title/OG. Pas d'articles réels publiés (que `_example.mdx`).

#### Site 8 — meilleur-fournisseur-energie-be (main)
- **Légal/RGPD ✅** — pages remplies + noindex + infos société exactes ; `CookieConsent` monté dans `app/(site)/layout.tsx`, bilingue, Accepter/Refuser, lien `/confidentialite`, analytics gaté.
- **Identité ⚠️ — logo générique type « flamme/goutte ».** Le SVG inline du `Nav.tsx` est un seul path flamme (`M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0...`) — motif générique « énergie » (cousin du bolt) **strictement identique à `app/icon.svg`** → aucune différenciation logo/favicon. Wordmark « Énerwatt » OK ; OG propre ✅.
- **Auteur ❌** — « Camille **Mertens** » dans `niche.config author.name`, **dans le texte de la bio** (« Camille Mertens décortique… » → rendu sur la page auteur ET en meta description), H1 page auteur, JSON-LD `Person.name`. Pas d'articles réels.

#### Site 9 — meilleures-assurances-auto.be (main)
- **Légal/RGPD ✅** — pages remplies + noindex + infos société exactes ; `CookieConsent` monté dans `app/(site)/layout.tsx`, bilingue, Accepter/Refuser, analytics gaté.
- **Identité ⚠️ — logo sans SVG inline.** Favicon `app/icon.svg` distinctif (bouclier émeraude + coche) + `app/apple-icon.svg` ✅. MAIS le `Nav.tsx` rend un **wordmark texte seul** (`niche.logo`) — pas d'éclair (✅) mais pas de marque graphique inline ; le bouclier de l'icône n'est pas repris en Nav. OG unique ✅.
- **Auteur ❌ — le plus étendu.** « Thomas **Renard** » dans `niche.config author.name`, H1 + JSON-LD `Person.name` de `/auteurs/thomas-renard`, metadata, **ET frontmatter `author: thomas-renard` de ~20 articles publiés** (vérifié sur `meilleure-assurance-auto-belgique.mdx`, `bonus-malus-assurance-auto-belgique.mdx`) → patronyme rendu sur chaque article.

#### Site 10 — meilleure-carte-credit.be (claude/setup-nextjs-apple-guide-En4gb)
- **Légal/RGPD ✅** — `mentions-legales` (11,5 Ko) + `confidentialite` (15,4 Ko, RGPD complet avec tableau cookies) remplies, noindex, infos société exactes ; `components/layout/CookieConsent.tsx` monté dans `app/[lang]/layout.tsx` (`lang={lang}`), bilingue, Accepter/Refuser, aucun analytics embarqué (cookie de consentement seul).
- **Identité ✅** — favicon `app/icon.svg` + `favicon.ico` ; logo inline unique `<BrandMark>` (« M » crème + point rouge sur carré encre) dans `Nav.tsx` (pas de bolt) ; OG distinct (carte de crédit dessinée).
- **Auteur ❌** — « Sophie **Laurent** » dans `niche.config.ts` (`author.name`, `author.slug`, bio), `i18n/fr.json author.name` (= H1 page auteur + JSON-LD `Person.name` + title), et `authorSlug: "sophie-laurent"` du frontmatter de tous les articles.

#### Site 6 — meilleure-voiture-electrique (claude/no-image-spec-generator-nTjFC) — ✅ CONFORME
- **Légal/RGPD ✅** — `mentions-legales`, `confidentialite`, `cookies` (sous `app/[locale]/(site)/`) remplies, noindex, infos société exactes ; `components/ui/CookieConsent.tsx` monté dans `app/[locale]/layout.tsx` (`locale={locale}`), FR+EN, Accepter/Refuser ; **trackers correctement gatés** (Microsoft Clarity chargé seulement si consentement === accepted ; Vercel Analytics cookieless).
- **Identité ✅** — favicon `app/icon.svg` (monogramme « MV ») ; logo typographique unique « MVE.be » (pas de bolt) ; OG spécifique.
- **Auteur ✅ — CONFORME RÈGLE NOM.** « Christophe **F.** » = prénom + initiale partout (page auteur, JSON-LD `Person.name`, footer, frontmatter `author: "christophe-f"`). Aucun patronyme complet.
- *Mineur (hors périmètre) :* footer annonce « FR · NL · EN » alors que NL n'est pas implémenté.

---

## 3. Récapitulatif des points critiques

### Bandeaux cookies / légal
- **Absents (BLOQUANT) :** site 5 (meilleure-voiture-7-places.be — aucun composant) ; site 11 (meilleure-neobanque.be — absent sur tout l'arbre `/en`).
- **Montés mais non bilingues (⚠️) :** site 2 (meilleur-suv.be) ; site 3 (meilleure-voiture-familiale.be) ; site 11 (FR-only).
- **Pages légales :** toutes remplies, en noindex, infos société exactes (MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne) sur les 11 sites — aucun placeholder, aucun bloquant légal de ce côté.

### Auteurs génériques
- Aucun site n'utilise « la rédaction » / auteur vide. Tous ont un auteur nommé, unique au site, avec bio E-E-A-T crédible, page auteur et JSON-LD `Person`.

### Auteurs affichant un NOM DE FAMILLE (violation RÈGLE NOM — réserve, à corriger)
| Site | Patronyme interdit | Où il est rendu |
|------|--------------------|-----------------|
| meilleure-voiture.be | **Vanderhaeghe** (Julien) | config `author.name`, page auteur H1/title/OG, JSON-LD `Person.name`, AuthorCard |
| meilleur-suv.be | **Crols** (Damien) | config `author.name`, page auteur, JSON-LD, AuthorCard, `/a-propos` ×2 |
| meilleure-voiture-familiale.be | **Pirard** (Audrey) | config `author.name`, page auteur, JSON-LD, AuthorCard ; articles via slug |
| meilleure-voiture-utilitaire.be | **Lardinois** (Damien) | config `author.name` + `slug`, page auteur, JSON-LD, avatar, `authorSlug` articles |
| meilleure-voiture-7-places.be | **Lambrechts** (Sophie) | config `author.name` + `slug`, page auteur, JSON-LD, avatar |
| quel-operateur-choisir.be | **Dubois** (Maxime) | config `author.name`, page auteur H1, JSON-LD, metadata |
| meilleur-fournisseur-energie-be | **Mertens** (Camille) | config `author.name` + **texte de la bio**, page auteur, JSON-LD, meta description |
| meilleures-assurances-auto.be | **Renard** (Thomas) | config `author.name`, page auteur, JSON-LD, metadata + **frontmatter ~20 articles** |
| meilleure-carte-credit.be | **Laurent** (Sophie) | config `author.name` + `slug` + bio, `i18n/fr.json`, JSON-LD, `authorSlug` articles |
| meilleure-neobanque.be | **Vanderlinden** (Maxime) | nom affiché OK (« Maxime ») mais patronyme dans `author.slug`, URL `/auteurs/maxime-vanderlinden`, `Person.url`/canonical, `authorSlug` articles |

**Conforme :** meilleure-voiture-electrique (« Christophe F. »).

**Correctif type (à appliquer par `emd-fix`, hors périmètre lecture seule) :** remplacer `author.name` par prénom seul ou prénom + initiale (ex. « Julien V. ») — se propage au H1, JSON-LD, AuthorCard et bylines puisque tout lit `niche.author.name`. Aligner aussi `author.slug` / `authorSlug` pour ne pas exposer le patronyme dans l'URL et le JSON-LD `url`. Pour le site 8, corriger en plus le texte de la bio ; pour le site 9, les frontmatters d'articles.

### Identité — autres réserves
- Site 5 : éclair/bolt template résiduel dans `Footer.tsx` (footprint réseau) — à retirer.
- Site 8 : logo Nav = path flamme générique, identique au favicon — marque peu différenciée.
- Site 9 : pas de marque graphique inline en Nav (wordmark texte seul).
- Site 11 : OG générique au template (sans motif propre à la niche).

---

## 4. Top 5 actions prioritaires

1. **[BLOQUANT RGPD] meilleure-voiture-7-places.be** — créer et monter un bandeau cookies (composant inexistant) ; gater `<Analytics/>` derrière le consentement.
2. **[BLOQUANT RGPD] meilleure-neobanque.be** — monter `CookieConsent` dans `app/en/layout.tsx` (absent sur tout `/en`), rendre le bandeau bilingue (texte FR en dur), gater `<Analytics/>`.
3. **[RÈGLE NOM] 9 sites avec patronyme complet** — passer chaque `author.name` en prénom (+ initiale) et aligner slugs/`authorSlug` ; priorité aux sites avec articles publiés (meilleures-assurances-auto.be ~20 articles, meilleure-carte-credit.be, meilleure-voiture-familiale.be).
4. **[RGPD FR+EN] meilleur-suv.be & meilleure-voiture-familiale.be** — transmettre la prop `lang`/locale au `CookieConsent` (actuellement FR en dur sur l'arbre `/en`). Référence : implémentation de meilleure-voiture.be.
5. **[Identité / anti-footprint] meilleure-voiture-7-places.be** (bolt en footer) & **meilleur-fournisseur-energie-be** (logo flamme = favicon) — remplacer par un mark SVG inline réellement distinctif.

---

*Audit généré automatiquement (tâche planifiée `emd-audit-conformite`). Lecture seule sur les sites ; rendu réel tracé (import + montage). Choix autonomes notés : périmètre = 11 sites Live/Configuré ; CGU non bloquante (« si présente ») ; format multi-lignes des infos société accepté tant que les données sont exactes.*
