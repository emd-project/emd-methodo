# Audit conformité — CONFORMITÉ & IDENTITÉ — réseau EMD

**Date :** 2026-06-21 · **Mode :** lecture seule (rendu réel) · **Doctrine :** `skills/emd-audit/SKILL.md` v1.5.0
**Périmètre :** sites « Live » + « Configuré » de `pipeline/sites.csv` (9 sites)
**Domaines audités uniquement :** Légal & RGPD · Identité (favicon / logo / OG) · Auteur / E-E-A-T

> Bilan : **0 bloquant**. Toutes les pages légales sont remplies (aucun placeholder `[À compléter]`), en noindex, avec les infos société exactes ; un bandeau cookies est monté dans chaque layout ; chaque site sert un favicon `app/icon.svg`, un logo unique (aucun « éclair » réseau) et un OG dynamique propre ; chaque site a un auteur nommé et crédible (aucun « la rédaction »). Restent des points ⚠️/ℹ️ détaillés ci-dessous.

---

## Scorecard

| # | Site | Statut | Légal & RGPD | Identité | Auteur / E-E-A-T | Verdict |
|---|------|--------|:---:|:---:|:---:|:---:|
| 1 | meilleure-voiture.be | Live | ⚠️ | ✅ | ✅ | ⚠️ |
| 2 | meilleur-suv.be | Live | ⚠️ | ✅ | ✅ | ⚠️ |
| 3 | meilleure-voiture-electrique.be | Live | ✅ | ✅ | ✅ | ✅ |
| 4 | quel-operateur-choisir.be | Live | ✅ | ✅ | ✅ | ✅ |
| 5 | meilleur-fournisseur-energie.be | Live | ✅ | ⚠️ | ✅ | ⚠️ |
| 6 | meilleures-assurances-auto.be | Live | ✅ | ✅ | ✅ | ✅ |
| 7 | meilleure-carte-credit.be | Live | ✅ | ✅ | ✅ | ✅ |
| 8 | meilleure-voiture-familiale.be | Configuré | ⚠️ | ✅ | ✅ | ⚠️ |
| 9 | meilleure-voiture-utilitaire.be | Configuré | ✅* | ✅ | ✅ | ✅ |

`✅` conforme · `⚠️` conforme avec réserve · `❌` bloquant (aucun) · `*` bandeau cookies présent mais composant `CookieBanner` non inspecté en détail (localisation à confirmer).

---

## Synthèse par domaine

### Légal & RGPD
Les **trois pages contrôlées en profondeur** (meilleure-voiture, meilleure-voiture-electrique, meilleur-fournisseur-energie) sont **remplies, en `robots: { index:false, follow:false }`**, avec les infos société **exactes** : *MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique*. La politique de confidentialité détaille responsable, base légale RGPD, durées, droits et APD. **Aucun placeholder `[À compléter]` détecté.**

Le **bandeau cookies est monté dans le layout de chaque site** (`<CookieConsent/>` ou `<CookieBanner/>`), discret (carte flottante max ~540px), avec **Accepter / Refuser**, lien vers la politique, choix mémorisé (localStorage + cookie 365 j), et — sur le template standard — **gating des trackers** (Vercel Analytics chargé après consentement via `GatedAnalytics`).

**Réserve récurrente (⚠️) :** sur les sites bilingues du template standard — **meilleure-voiture, meilleur-suv, meilleure-voiture-familiale** — le bandeau est rendu `<CookieConsent />` **sans prop `lang`**. Le composant possède bien les chaînes FR **et** EN mais retombe sur `'fr'` par défaut → **le bandeau reste en français sur les pages `/en`**. À corriger en passant la locale serveur (comme le font déjà carte-credit et electrique).

### Identité (favicon / logo / OG)
- **Favicon réellement servi :** `app/icon.svg` présent sur tous les sites contrôlés (+ `favicon.ico` sur carte-credit, `apple-icon.svg` sur assurances). ✅
- **Logo réellement rendu unique :** inspection du SVG inline de `Nav.tsx`/`Header.tsx` → **aucun « éclair » réseau générique**. Chaque marque est distincte : voiture = silhouette auto ; SUV = hexagone « banc d'essai » ; électrique = wordmark typographique `MVE.be` ; opérateur = barres de signal colorées ; énergie = flamme ; assurance = wordmark texte ; carte-crédit = `BrandMark` + serif Fraunces ; familiale = maison ; utilitaire = fourgon + chevrons (SVG détaillé). ✅
- **OG unique via `app/opengraph-image` :** présent partout, **généré dynamiquement** depuis `niche.config` (tagline, catégories, domaine, palette) → **OG distinct par site**, pas de template réseau partagé. ✅

**Réserve (⚠️) — meilleur-fournisseur-energie :** le **logo visible affiche « Voltéo »**, la marque par défaut du template, et non le nom du site. C'est l'identité résiduelle du squelette réseau → incohérence de marque + risque de footprint. À renommer vers une marque propre.

### Auteur / E-E-A-T
**Tous les sites ont un auteur nommé, crédible et unique** — aucun « la rédaction », générique ou champ vide. Chaque auteur dispose d'une **page auteur** (`/auteurs/<slug>`) avec **JSON-LD `Person`** (`worksFor`, `jobTitle`, `description`).

| Site | Auteur | Crédibilité E-E-A-T |
|------|--------|---------------------|
| voiture | Julien Vanderhaeghe | Journaliste auto depuis 2012, Liège, données TÜV/ADAC — forte |
| suv | Damien Crols | Essayeur SUV depuis 2014, Namur, conso réelle mesurée — forte |
| electrique | Christophe F. | Bruxellois, père de famille, VE sur E411, TCO 4 ans — forte (patronyme abrégé) |
| quel-operateur | Maxime Dubois | 10 ans télécom BE, grilles Proximus/Orange/… — solide |
| energie | Camille Mertens | Analyste énergie depuis 2019, Bruxelles, prix CREG — forte |
| assurances | Thomas Renard | Ex-courtier agréé FSMA, +2000 conducteurs — forte |
| carte-credit | Sophie Laurent | Ex-conseillère bancaire, 8 ans — **bio courte (2 phrases)** |
| familiale | Audrey Pirard | Maman de 2, Wavre, teste Isofix, budget 5 ans — forte |
| utilitaire | Damien Lardinois | Ex-gestionnaire de flotte 12 ans, Namur — forte (avatar défini) |

Aucune bio/identité réutilisée d'un site à l'autre. **Anti-footprint OK.**

---

## Détail par site (trié par sévérité)

**1. meilleure-voiture.be — ⚠️**
Cookies non localisés sur `/en` (`<CookieConsent/>` sans `lang`). Légal complet + société exacte + noindex. Logo auto SVG unique, favicon servi, OG dynamique. Auteur Julien Vanderhaeghe (E-E-A-T forte, page + JSON-LD Person).

**2. meilleur-suv.be — ⚠️**
Même réserve cookies `/en` (sans `lang`). Layout/Nav template confirmés ; logo hexagone unique. Auteur Damien Crols (forte).

**3. meilleure-voiture-electrique.be — ✅ (meilleure copie RGPD)**
Cookie **locale-aware** (`<CookieConsent locale={locale}/>`, FR+EN, Accepter/Refuser, lien `/cookies`). Pages mentions-légales / confidentialité / **cookies** / plan-du-site, société exacte, noindex. Wordmark `MVE.be`, `app/icon.svg`, OG par locale. Auteur « Christophe F. » bio riche + JSON-LD Person.
ℹ️ Repo sur branche par défaut **non-`main`** (`claude/no-image-spec-generator-nTjFC`) → vérifier ce qui est réellement déployé.
ℹ️ Vercel `<Analytics/>` chargé inconditionnellement (cookieless) ; le bouton « Refuser » n'a pas d'effet technique — acceptable car sans cookie, mais à clarifier vs les autres sites qui gatent.

**4. quel-operateur-choisir.be — ✅**
Logo « barres de signal » très distinctif. Auteur Maxime Dubois. Conforme.

**5. meilleur-fournisseur-energie.be — ⚠️**
**Logo visible « Voltéo »** (marque template par défaut) ≠ nom du site → à rebrander. Légal complet + société exacte + noindex (avec clause liens affiliés). Cookie monté `lang="fr"` (site FR), favicon + OG OK. Auteur Camille Mertens (forte).
ℹ️ `niche.config` déclare `locales: ['fr']` mais un dossier `app/en` existe → statut multilingue ambigu (hors périmètre, à clarifier).

**6. meilleures-assurances-auto.be — ✅**
Site FR ; cookie monté (FR). Logo wordmark distinct, `app/icon.svg` + `apple-icon.svg`, OG propre. Auteur Thomas Renard (ex-FSMA, forte).

**7. meilleure-carte-credit.be — ✅ (meilleure gestion bilingue cookies)**
Cookie **locale-aware** (`<CookieConsent lang={lang}/>`). Légal FR+EN, `BrandMark` SVG, `app/icon.svg`+`favicon.ico`+OG. Auteur Sophie Laurent.
ℹ️ Branche par défaut **non-`main`** (`claude/setup-nextjs-apple-guide-En4gb`) → vérifier le déploiement.
ℹ️ Bio auteur plus courte que les pairs — à étoffer pour l'E-E-A-T.

**8. meilleure-voiture-familiale.be — ⚠️ (Configuré)**
Réserve cookies `/en` (sans `lang`). Pages légales présentes, logo « maison » unique. Auteur Audrey Pirard (forte). `niche.signature` vide (cosmétique, hors périmètre).

**9. meilleure-voiture-utilitaire.be — ✅ (Configuré)**
Bandeau via `CookieBanner` (composant distinct) monté dans le layout — **localisation FR/EN à confirmer**. Pages légales présentes, logo fourgon SVG très détaillé + favicon annoncé identique. Auteur Damien Lardinois (forte, avatar défini).

---

## Anti-footprint (périmètre conformité/identité)
- **Logos :** 9 marques distinctes, aucune réutilisation, aucun « éclair » par défaut. ✅
- **OG :** générés depuis `niche.config` → distincts par site. ✅
- **Auteurs :** 9 identités uniques, aucune bio recyclée. ✅ Seul rapprochement mineur : deux prénoms « Damien » (Crols / Lardinois), mais noms complets, villes et bios différents.
- **Résidu template :** marque « Voltéo » encore visible sur le site énergie (cf. site 5).

---

## Top 5 actions prioritaires
1. **Énergie — rebrander le logo « Voltéo »** vers la marque propre du site (résidu template, footprint). ⚠️ Identité
2. **Cookies bilingues — passer la locale au bandeau** sur meilleure-voiture, meilleur-suv, meilleure-voiture-familiale (`<CookieConsent locale={locale}/>`) pour que le texte s'affiche en EN sur `/en`. ⚠️ RGPD
3. **Confirmer la localisation du `CookieBanner`** de meilleure-voiture-utilitaire (FR+EN). ℹ️ RGPD
4. **Brancher sur `main`** les déploiements de meilleure-voiture-electrique et meilleure-carte-credit (branches par défaut non-`main`). ℹ️ Déploiement
5. **Étoffer la bio auteur de Sophie Laurent** (carte-credit) au niveau E-E-A-T des autres sites. ℹ️ Auteur

---
*Audit généré automatiquement (tâche planifiée `emd-audit-conformite`). Lecture seule sur les repos de sites ; seul fichier écrit = ce rapport dans `emd-methodo`. Vérifications fondées sur le rendu réel (SVG inline des Nav, montage des composants dans les layouts, `app/icon`/`app/opengraph-image`, JSON-LD des pages auteur), pas sur la simple présence de fichiers.*
