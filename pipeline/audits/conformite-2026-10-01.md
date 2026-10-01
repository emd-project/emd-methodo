# Audit CONFORMITÉ & IDENTITÉ — 2026-10-01

**Domaine d'audit :** conformité & identité (Légal/RGPD · Identité · Auteur/E-E-A-T)
**Mode :** LECTURE SEULE sur les sites — rendu réel audité (layouts réellement montés, SVG inline, `app/icon`, `app/opengraph-image`, JSON-LD).
**Périmètre (restreint ≤14j = provisionné ≥ 2026-09-17, non déjà audité par ce domaine) :** 7 sites, tous nouveaux au ledger.

| Site | Provisionné | Statut périmètre |
|---|---|---|
| meilleur-shampoing.be | 2026-09-17 | ✅ audité (nouveau) |
| comparer-compte-epargne.be | 2026-09-17 | ✅ audité (nouveau) |
| gestion-copropriete.be | 2026-09-17 | ✅ audité (nouveau) |
| meilleur-hotel-bruges.be | 2026-09-21 | ✅ audité (nouveau) |
| meilleure-carte-bancaire.be | 2026-09-25 | ✅ audité (nouveau) |
| meilleur-lave-linge.be | 2026-09-28 | ✅ audité (nouveau) |
| besttennisshoes.be | 2026-09-29 | ✅ audité (nouveau) |

Aucun re-scan du parc (les sites provisionnés avant le 2026-09-17 sont hors périmètre).
Limite outillage : recherche de code GitHub non indexée sur ces repos → vérifications faites par lecture fichier par fichier (`github_read_file`).

---

## Scorecard

| Site | Légal & RGPD | Identité | Auteur / E-E-A-T | Auteur affiché | Nom de famille ? |
|---|:---:|:---:|:---:|---|:---:|
| meilleur-shampoing.be | ❌ | ⚠️ | ✅ | Aurélie V. | Non ✅ |
| comparer-compte-epargne.be | ❌ | ⚠️ | ✅ | Florence W. | Non ✅ |
| gestion-copropriete.be | ✅ | ⚠️ | ⚠️ | Claude O. | Non ✅ |
| meilleur-hotel-bruges.be | ❌ | ❌ | ⚠️ | Hélène D. | Non ✅ |
| meilleure-carte-bancaire.be | ❌ | ❌ | ✅ | Benoît P. | Non ✅ |
| meilleur-lave-linge.be | ❌ | ❌ | ✅ | Xavier D. | Non ✅ |
| besttennisshoes.be | ✅ | ⚠️ | ✅ | Julien S. | Non ✅ |

Légende : ✅ conforme · ⚠️ écart important · ❌ bloquant (RGPD) ou logo = éclair générique rendu en header.

**Synthèse :**
- **5/7 sites ❌ RGPD** : `<Analytics />` (Vercel) monté **sans condition** dans `app/layout.tsx`. **4 sites n'ont AUCUN bandeau cookies** (shampoing, hotel-bruges, carte-bancaire, lave-linge) ; comparer-compte-epargne a un bandeau monté mais **inopérant** (Analytics chargé même après « Refuser ») et FR-only.
- **Logo éclair générique** (`M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z`) **rendu dans la Nav** : hotel-bruges, carte-bancaire, lave-linge. Rendu dans le **Footer** seul : besttennisshoes. Dormant (Nav non montée) : shampoing.
- **Règle NOM auteur : 7/7 conformes** (prénom + initiale partout : niche.config, page auteur, JSON-LD Person, Article.author ; frontmatters en `authorSlug`, aucun patronyme).
- **Aucun auteur générique** (« la rédaction ») — 7 auteurs distincts.
- Pages légales : remplies, noindex, infos société exactes sur les 7 sites (aucun placeholder rendu).

---

## Détail par site (trié par sévérité)

### meilleur-hotel-bruges.be — ❌ RGPD · ❌ Identité · ⚠️ Auteur

**Légal & RGPD — ❌**
- Pages légales FR (`app/(site)/mentions-legales`, `confidentialite`) + EN (`app/en/legal-notice`, `privacy`) : remplies, `robots: { index:false, follow:false }` ✓. Infos société exactes ✓.
- ❌ **Bandeau cookies absent** (aucun composant dans `components/**`, rien dans `app/layout.tsx`, `app/(site)/layout.tsx`, `app/en/layout.tsx`).
- ❌ **`<Analytics />` Vercel inconditionnel** dans `app/layout.tsx` — la politique annonce elle-même des « cookies analytics via Vercel Analytics ».
- mineur : `/en/privacy` omet l'adresse du siège dans « Data controller ».

**Identité — ❌**
- Favicon `app/icon.svg` : disque turquoise `#4FC3C7`, « H » Literata ✓.
- ❌ **Logo = éclair générique du template** (SVG inline `Nav.tsx` + `Footer.tsx`), sans rapport avec la DA « comptoir de nuit / laiton ».
- OG `app/opengraph-image.tsx` + `app/en/…` via `components/og/SiteOgImage.tsx` (palette niche ✓) — mineur : filigrane ★ (interdit par `signature.forbidden`), ligne de services annonçant comparateur/quiz/simulateur désactivés.

**Auteur — ⚠️**
- **Hélène D.** (slug `helene-d`) — ancienne réceptionniste/yield manager hôtellerie brugeoise, 12 ans ✓. Page auteur FR+EN + JSON-LD Person ✓ ; Article.author ✓. Frontmatters 6/6 vérifiés (`authorSlug`) ✓.
- ⚠️ **Avatar cassé** : `lib/image-slots.ts` déclare `/images/authors/helene-d.webp`, fichier absent (`public/images/authors/` inexistant) → image cassée sur page auteur + AuthorCard.
- ⚠️ Page auteur EN affiche bio/titre FR ; `AuthorCard` et `author.url` JSON-LD EN pointent vers l'URL FR.

### meilleure-carte-bancaire.be — ❌ RGPD · ❌ Identité · ✅ Auteur

**Légal & RGPD — ❌**
- 4 pages légales FR/EN remplies, noindex, infos société exactes ✓.
- ❌ **Bandeau cookies absent** ; ❌ **`<Analytics />` inconditionnel** dans `app/layout.tsx`.
- mineur : adresse siège absente de `/en/privacy` ; résidus template `content/pages/mentions-legales.yaml` (TODO, `noindex:false`) et `content/settings.yaml` (non rendus).

**Identité — ❌**
- Favicon : carré violet `#532C96`, « C » Gabarito ✓.
- ❌ **Logo = éclair générique** (Nav + Footer), incohérent avec la DA « grille de contacts / puce EMV ».
- OG via `SiteOgImage` (palette ✓) — mineur : barre en dégradé (interdit par la DA), ★ générique, « Quiz · Simulateur » désactivés.

**Auteur — ✅** **Benoît P.** — ex-gestionnaire monétique d'une banque belge (2013-2021) ✓. Avatar `benoit-p.webp` servi ✓. Pages auteur FR/EN + JSON-LD ✓. Frontmatters 9/9 ✓. Mineurs : bio non traduite EN, liens auteur non localisés, Person sans `image`, `longBio` = doublon de la bio.

### meilleur-lave-linge.be — ❌ RGPD · ❌ Identité · ✅ Auteur

**Légal & RGPD — ❌**
- 4 pages légales FR/EN remplies, noindex, infos société exactes ✓.
- ❌ **Bandeau cookies absent** ; ❌ **`<Analytics />` inconditionnel**.
- mineur : adresse siège absente de `/en/privacy` ; `content/pages/mentions-legales.yaml` plein de TODO (non rendu).

**Identité — ❌**
- Favicon : disque laiton `#6A6112`, « L » Georgia ✓.
- ❌ **Logo = éclair générique** (Nav + Footer), sans rapport avec la DA « buanderie carrelée ».
- OG via `SiteOgImage` — important : barre en dégradé contraire à la DA (`effects:'none'`), ★ générique, services désactivés listés. Résidus `public/icons/brand/logo.svg` (aria-label « 10min-template », non référencé).

**Auteur — ✅** **Xavier D.** — ex-technicien SAV électroménager, Liège, 11 ans ✓. Avatar `xavier.jpeg` ✓. Pages auteur + JSON-LD ✓. Frontmatters 5/5 ✓. Mineurs : liens/JSON-LD auteur non localisés EN.

### meilleur-shampoing.be — ❌ RGPD · ⚠️ Identité · ✅ Auteur

**Légal & RGPD — ❌**
- 4 pages légales FR/EN remplies, noindex, infos société exactes ✓.
- ❌ **Bandeau cookies absent** ; ❌ **`<Analytics />` inconditionnel**.
- mineur : adresse siège absente de `/en/privacy` ; `mentions-legales.yaml` TODO (non rendu).

**Identité — ⚠️**
- Rendu réel = identité `presse` (`PresseMasthead`/`PresseFooter`) ; `Nav.tsx`/`Footer.tsx` non montés.
- Favicon : disque indigo `#2E3793`, « S » Georgia ✓.
- ⚠️ **Logo rendu = wordmark texte** (Fraunces caps entre filets), **pas de mark SVG propre** ; l'**éclair template reste dans `Nav.tsx` dormant** (réapparaît si l'identité repasse en `standard`).
- OG via `SiteOgImage` — ★ template, quiz/simulateur désactivés listés, police par défaut (pas Fraunces).

**Auteur — ✅** **Aurélie V.** — ex-coiffeuse-coloriste Namur puis formatrice technique ✓. Avatar ✓. Pages auteur + JSON-LD ✓. Frontmatters 11/11 ✓. Mineurs : liens/JSON-LD non localisés EN, `longBio` doublon.

### comparer-compte-epargne.be — ❌ RGPD · ⚠️ Identité · ✅ Auteur

**Légal & RGPD — ❌**
- 4 pages légales FR/EN remplies, noindex, infos société exactes ✓.
- ⚠️ `CookieBanner` **monté** dans `app/layout.tsx` (Accepter/Refuser, lien politique, choix mémorisé `localStorage('cookie-consent')`) **mais textes FR en dur, sans prop locale** → FR + lien `/confidentialite` sur les pages `/en`.
- ❌ **`<Analytics />` monté sans condition** : chargé avant consentement **et après « Refuser »** → bandeau inopérant (le commentaire du composant affirme l'inverse).
- ⚠️ **Liens footer EN cassés** : `/en/mentions-legales` et `/en/confidentialite` (les pages EN sont `/en/legal-notice` et `/en/privacy`) → 404 probables.
- ⚠️ Contradiction : confidentialité FR/EN parle de « cookies analytics », bandeau/yaml disent « sans cookie ».
- mineur : adresse siège absente de `/en/privacy` ; yaml non rendu divergent (e-mail, ancienne adresse Vercel).

**Identité — ⚠️**
- ✅ **Logo unique** : SVG inline Nav/Footer, 3 barres de croissance (`<rect>` uniquement), teinté `--accent-1`.
- ⚠️ Favicon = monogramme générique sarcelle `#0A6E77` (hors palette — accent `#A32922`), ≠ motif du logo.
- ⚠️ OG via `opengraph-image.tsx` : annonce Quiz/Offres désactivés ; tagline ~120 car. à 72px → risque de débordement.

**Auteur — ✅** **Florence W.** — ex-back-office titres et dépôts banque belge (Wavre, 2013-2022) ✓. Pages auteur + JSON-LD ✓. Frontmatters 16/16 ✓. Mineurs : bio EN absente, liens auteur FR sur les articles EN, pas d'avatar (monogramme CSS).

### besttennisshoes.be — ✅ RGPD · ⚠️ Identité · ✅ Auteur

**Légal & RGPD — ✅**
- Pages légales FR/EN/NL remplies, noindex (vérifié via `applySeo`), infos société exactes ✓.
- ✅ `components/layout/CookieConsent.tsx` **monté** dans `app/layout.tsx` ; Accepter/Refuser ; lien politique localisé ; choix mémorisé ; **`<Analytics />` rendu uniquement si `granted`** ✓ ; textes FR/EN/NL, locale déduite du pathname ✓.
- mineur : adresse siège absente des politiques EN/NL ; politiques ne décrivent pas le bandeau ; `mentions-legales.yaml` TODO (non rendu).

**Identité — ⚠️**
- ✅ Logo Nav = SVG balle de tennis sur mesure (`M4.2 5.6c3.6 2.6 3.6 10.2 0 12.8M19.8 5.6c…`).
- ⚠️ **Footer = éclair générique** (`Footer.tsx`), incohérent avec la balle.
- mineur : favicon monogramme « B » Arial sur disque bleu, sans la balle. OG dédié (court bleu, balle jaune, lignes craie) ✓ — le meilleur OG du lot.

**Auteur — ✅** **Julien S.** — rédacteur matériel tennis, méthode coût/heure de jeu ✓. Bio traduite EN/NL ✓. Pages auteur + JSON-LD ✓. 7/27 frontmatters lus (`authorSlug`) ; `parseMeta` ignore tout champ `author` → aucun risque de patronyme affiché. Mineurs : pas d'avatar, `author.url`/jobTitle non localisés, `longBio` doublon.
- *Hors domaine (multilingue)* : le site expose une locale **NL** — la doctrine dit « Jamais de NL ». À arbitrer côté audit UX/tech.

### gestion-copropriete.be — ✅ RGPD · ⚠️ Identité · ⚠️ Auteur

Architecture hors moteur template : `next.config.ts` `pageExtensions: ['site.tsx','site.ts']` → seul `app/**/*.site.tsx` est servi ; site 100 % FR par choix (pas d'`/en`).

**Légal & RGPD — ✅**
- Page unique mentions + confidentialité `app/mentions-legales/page.site.tsx` : remplie, noindex ✓. Société exacte (MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne) ✓.
- Pas de bandeau : **aucun traceur servi** (layout `app/layout.site.tsx` sans Analytics ; CSP `connect-src 'self'` ; page déclare « aucun cookie ») → absence **justifiée**, écart au standard EMD à valider.
- ⚠️ Risque latent : `app/layout.tsx` (mort) monte `<Analytics />` sans consentement et `@vercel/analytics` reste en dépendance.
- mineur : « SRL de droit belge » absent du texte ; droits RGPD incomplets (opposition, limitation, portabilité, transfert hors UE Vercel).

**Identité — ⚠️**
- Favicon : carré terracotta `#9E3B1F`, « g » Georgia ✓.
- ⚠️ Logo = wordmark texte (« gestion-copropriété**.be** », Source Serif 4), pas de mark SVG. Pas d'éclair.
- OG = JPEG statique illustré (immeubles au trait) via metadata ; dimensions déclarées 1200×630 vs réelles ~1376×768 (mineur).
- ⚠️ `niche.config.ts` entièrement au placeholder template (`emd-template`, `example.com`, auteur vide, palette `#FF3D57`) — non rendu mais trompeur pour tout outil.

**Auteur — ⚠️**
- **Claude O.** (prénom + initiale ✓) — défini dans `site/lib/seo.ts`. Page `/auteurs/claude-o/` + JSON-LD Person ✓ ; Article/BlogPosting.author ✓ ; 5/5 billets `auteur: "claude-o"` ✓.
- ⚠️ **Bio sans signal E-E-A-T** (méthode seulement, aucune expérience/qualification), pas d'avatar, ni `image` ni `sameAs` ; prénom « Claude » ambigu (lu comme l'IA).

---

## Anti-footprint (inter-sites)

- **Éclair template `M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z`** présent sur **5 sites** (rendu Nav : hotel-bruges, carte-bancaire, lave-linge ; rendu Footer : besttennisshoes ; dormant : shampoing) → footprint réseau évident.
- **OG quasi identiques** : 5 sites (shampoing, compte-epargne, hotel-bruges, carte-bancaire, lave-linge) utilisent le même `SiteOgImage` (eyebrow `DOMAINE · année` + tagline 72px + ligne de services + barre dégradée + ★ filigrane). Seules palette et tagline changent → OG non unique au sens structure.
- **Favicons** : même gabarit « disque plein + lettre blanche serif » sur 5 sites (shampoing, compte-epargne, hotel-bruges, lave-linge, tennis) — `emd-monogram v1`.
- **Auteurs** : 7 noms et bios distincts ✓ (Hélène D. / Xavier D. partagent juste l'initiale). Même défaut commun : bio/liens auteur non localisés EN, `longBio = [bio]`.
- **Pattern template commun** : pages légales identiques omettant l'adresse siège en `/en/privacy` (6 sites), `mentions-legales.yaml` TODO résiduel (5 sites).

---

## Top actions prioritaires

1. ❌ **RGPD — hotel-bruges, carte-bancaire, lave-linge, shampoing** : créer + monter un bandeau cookies FR/EN (Accepter/Refuser, lien politique, choix mémorisé, câblé à la locale) dans `app/layout.tsx` et **conditionner `<Analytics />` au consentement** (modèle : `besttennisshoes.be/components/layout/CookieConsent.tsx`).
2. ❌ **RGPD — comparer-compte-epargne** : conditionner `<Analytics />` à `cookie-consent === 'accepted'` ; rendre le `CookieBanner` bilingue (prop locale, lien `/en/privacy`) ; corriger les liens footer EN (`/en/legal-notice`, `/en/privacy`).
3. ❌ **Identité — hotel-bruges, carte-bancaire, lave-linge** : remplacer l'éclair Nav+Footer par un mark SVG sur mesure conforme à la DA ; **besttennisshoes** : Footer = SVG balle ; **shampoing** : purger l'éclair du `Nav.tsx` dormant (+ envisager un mark SVG).
4. ⚠️ **Auteur — hotel-bruges** : déposer `public/images/authors/helene-d.webp` (image cassée) ; **gestion-copropriete** : enrichir la bio E-E-A-T (expérience concrète), avatar, `image`/`sameAs`.
5. ⚠️ **OG / favicon (anti-footprint)** : retirer ★ + dégradé + services désactivés du `SiteOgImage` (5 sites) et différencier la structure ; aligner favicons sur le mark du logo (compte-epargne en priorité : hors palette).

Mineurs transverses : ajouter l'adresse siège dans `/en/privacy` (6 sites) ; localiser bio/liens/`author.url` auteur sur les pages EN ; supprimer les `mentions-legales.yaml`/`settings.yaml` template ; gestion-copropriete : nettoyer `niche.config.ts` + `app/layout.tsx` morts et compléter les droits RGPD.
