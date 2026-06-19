# Audit Conformité & Identité — réseau EMD

**Date :** 2026-06-19 · **Domaine audité :** CONFORMITÉ & IDENTITÉ uniquement (Légal & RGPD · Identité · Auteur/E-E-A-T)
**Mode :** LECTURE SEULE sur les sites · **Principe appliqué :** audit du *rendu réel* (assets réellement servis/montés, SVG inline du Nav, OG réel), pas du fichier au bon nom.
**Périmètre :** 8 sites au statut « Live » ou « Configuré » de `pipeline/sites.csv` (les « À faire » sont ignorés).

---

## Scorecard

| Site | Statut | Légal & RGPD | Identité | Auteur / E-E-A-T |
|---|---|:---:|:---:|:---:|
| meilleure-voiture.be | Live | ✅ | ❌ | ✅ |
| meilleur-suv.be | Live | ✅ | ✅ | ⚠️ |
| meilleure-voiture-familiale.be | Configuré | ✅ | ✅ | ⚠️ |
| meilleure-voiture-electrique.be | Live | ⚠️ | ✅ | ✅ |
| quel-operateur-choisir.be | Live | ✅ | ⚠️ | ✅ |
| meilleur-fournisseur-energie.be | Live | ✅ | ⚠️ | ⚠️ |
| meilleures-assurances-auto.be | Live | ✅ | ✅ | ✅ |
| meilleure-carte-credit.be | Live | ⚠️ | ✅ | ⚠️ |

Légende : ✅ conforme · ⚠️ écart important/mineur · ❌ bloquant ou multi-défaut.

**Vue d'ensemble :** aucun bandeau cookies totalement absent (donc aucun bloquant RGPD « banner manquant »). Toutes les pages légales sont remplies, en noindex, avec les infos société exactes sur les 8 sites. Les écarts portent sur : un favicon non servi (1 site), des logos génériques réseau (3 sites), un template OG partagé (3 sites), des incohérences de déclaration cookies / tracker non gaté (2 sites) et l'absence d'avatar auteur réel (7 sites sur 8).

---

## Détail par site (trié par sévérité)

### 1. meilleure-voiture.be — Identité ❌
- **❌ Identité (important×2) :** favicon **non réellement servi** — l'asset n'existe qu'en `public/icons/brand/favicon.svg`, sans `app/icon.*` ni champ `icons` dans la metadata → Next ne le sert pas (favicon par défaut navigateur). Logo = SVG inline « **spark/étoile** » générique du réseau dans `Nav.tsx` (pas un mark auto sur mesure). OG = **template réseau générique** (palette `#FF3D57/#7B61FF/#3DFFC0`, watermark « 10 », eyebrow domaine·2026), couleurs hors palette du site (bleu naval).
- **✅ Légal & RGPD :** pages remplies + noindex ; infos société exactes ; `CookieConsent` monté dans le layout, Accepter/Refuser, lien `/confidentialite` ; `GatedAnalytics` ne charge Vercel Analytics qu'après consentement. *Mineur :* banner monté sans prop `lang` → reste en FR même en EN.
- **✅ Auteur :** Julien Vanderhaeghe, bio E-E-A-T crédible, JSON-LD Person dans l'Article. *Mineur :* avatar = monogramme CSS, pas de photo.

### 2. meilleur-fournisseur-energie.be — Identité ⚠️ · Auteur ⚠️
- **⚠️ Identité (anti-footprint) :** incohérence de marque — le Nav FR rend une **flamme/goutte sur mesure**, mais le favicon `app/icon.svg` ET le header/footer EN utilisent un **éclair générique standard** (`M13 2 4.5 13.5…`), mark réutilisable inter-sites. Favicon bien servi, OG propre au site (carte « facture », chip « jusqu'à 490 €/an »).
- **⚠️ Auteur (important) :** Camille Mertens — bio crédible mais **courte (mono-paragraphe)** et **aucun avatar** (monogramme CSS). JSON-LD Person OK.
- **✅ Légal & RGPD :** pages FR+EN remplies + noindex, infos société exactes, `CookieConsent` monté FR+EN, trackers gatés. *Mineur :* `niche.config.locales=['fr']` alors qu'un arbre EN complet est rendu → hreflang EN non émis.

### 3. meilleure-voiture-electrique.be — Légal & RGPD ⚠️
- **⚠️ Légal & RGPD (important) :** le texte du bandeau `CookieConsent.tsx` annonce « mesure d'audience anonyme via **Google Analytics** » et contient une fonction `updateGtagConsent()`/`window.gtag(...)`, **alors que** les pages `/confidentialite` et `/cookies` affirment « pas de Google Analytics / Vercel Analytics sans cookie ». Déclaration cookies **contradictoire** (mentionne un tracker GA inexistant) → risque juridique/crédibilité + code mort à retirer. Banner par ailleurs monté FR+EN, Accepter/Refuser, lien `/cookies`.
- **✅ Identité :** favicon servi (`app/icon.svg`), logo typographique « MVE.be » sur mesure, OG unique (signature magazine, barre éditoriale). *Mineur :* le sous-titre OG mentionne « FR/NL/EN » alors que le site ne sert que FR+EN.
- **✅ Auteur :** Christophe F., bio E-E-A-T incarnée, JSON-LD Person. Absence d'avatar = choix éditorial assumé (mineur).

### 4. meilleure-carte-credit.be — Légal & RGPD ⚠️ · Auteur ⚠️
- **⚠️ Légal & RGPD (important — quasi-bloquant) :** `@vercel/analytics` est monté **inconditionnellement** dans `app/layout.tsx` (root), donc **chargé avant tout consentement** ; le bandeau ne gate rien (« accept/refuse both just dismiss »). Cela **contredit** la politique de confidentialité (« aucun tracker… ni outil d'analyse tiers / aucun cookie analytique »). Banner sinon monté FR+EN, Accepter/Refuser, lien politique.
- **⚠️ Auteur (mineur) :** Sophie Laurent, bio crédible, JSON-LD Person — mais **aucun avatar** (monogramme CSS).
- **✅ Identité :** favicon servi (`app/icon.svg` carte de crédit), logo monogramme « M » sur mesure (`BrandMark`). *Anti-footprint :* OG = **même template réseau générique** que meilleure-voiture.be et quel-operateur-choisir.be.

### 5. quel-operateur-choisir.be — Identité ⚠️
- **⚠️ Identité (important, anti-footprint) :** logo = mark « **barres de signal / équaliseur** » générique réseau (SVG paramétrique identique entre Nav FR et layout EN) ; seul le wordmark texte `quel·opérateur.` est propre à la niche. Favicon servi (`app/icon.svg`), OG palette propre mais **structure du template réseau** (eyebrow domaine·2026 + headline tagline + watermark « 10 »). *Mineur :* pas d'OG localisée EN.
- **✅ Légal & RGPD :** pages FR+EN remplies + noindex, infos société exactes, `CookieConsent` monté FR+EN, trackers gatés.
- **✅ Auteur :** Maxime Dubois, bio télécom crédible, JSON-LD Person. *Mineur :* avatar = monogramme CSS.

### 6. meilleur-suv.be — Auteur ⚠️
- **⚠️ Auteur (important) :** Maxime Delvaux, bio E-E-A-T riche, JSON-LD Person OK — mais **avatar absent** (champ `avatar` absent du `niche.config` → pas de photo, pas d'`image` dans le JSON-LD).
- **✅ Identité :** favicon servi (`app/icon.svg` hexagone), logo hexagone sur mesure (pas l'éclair), OG unique piloté par `niche.config`. *Mineur :* couleurs en dur `#0E1420/#E8A33D` dans `icon.svg` hors palette config.
- **✅ Légal & RGPD :** pages remplies + noindex, infos société exactes, banner monté FR+EN, trackers gatés. *Mineur :* banner EN monté sans `lang` → reste FR.

### 7. meilleure-voiture-familiale.be — Auteur ⚠️
- **⚠️ Auteur (important) :** Audrey Pirard, bio E-E-A-T spécifique (Isofix, budget 5 ans), JSON-LD Person OK — mais **avatar absent** (champ `avatar` absent du config).
- **✅ Identité :** favicon servi (`app/icon.svg` maison terracotta), logo maison/toit sur mesure, OG unique (chips catégories familiales). *Mineur :* barre OG en vert alors que le commentaire dit « terracotta » (cosmétique).
- **✅ Légal & RGPD :** pages remplies + noindex, infos société exactes, `CookieConsent` monté correctement **avec `lang`** FR et EN, trackers gatés.

### 8. meilleures-assurances-auto.be — tout ✅
- **✅ Auteur :** Thomas Renard, ex-courtier agréé FSMA, bio crédible chiffrée, **avatar photo réel** (`thomas-renard.webp`), JSON-LD Person dans l'Article. **Seul site avec un vrai portrait auteur.**
- **✅ Identité :** favicon servi (`app/icon.svg` bouclier + coche), logo wordmark sur mesure `meilleure·assurance·auto`, OG unique (signature « Sérénité », filigrane €).
- **✅ Légal & RGPD :** pages remplies + noindex, infos société exactes, `CookieConsent` monté, trackers gatés. *Mineur :* arbre `app/en/` dormant (`locales:['fr']`) ; banner sans `lang` (cohérent mono-locale FR).

---

## Anti-footprint inter-sites

- **OG — template réseau partagé (important) :** `meilleure-voiture.be`, `quel-operateur-choisir.be` et `meilleure-carte-credit.be` partagent le **même template OG** : fond `#0A0A0F`, barre d'accent dégradée `#FF3D57 → #7B61FF → #3DFFC0`, eyebrow `DOMAINE · 2026`, headline = tagline, watermark chiffre « 10 » jaune. Seul le texte change → empreinte réseau visible. Les 5 autres sites ont un OG distinct par niche.
- **Logos génériques réseau (important) :** `meilleure-voiture.be` (spark/étoile) et `quel-operateur-choisir.be` (barres de signal) rendent des marks paramétriques génériques ; `meilleur-fournisseur-energie.be` utilise un **éclair générique** (`M13 2 4.5 13.5…`) sur son favicon et sa version EN. Marks réutilisables → à différencier. Les autres (hexagone, maison, MVE typo, bouclier, monogramme M) sont sur mesure.
- **Avatars auteur (E-E-A-T) :** 7 sites sur 8 n'ont **aucun portrait réel** (monogramme CSS ou champ absent). Seul `meilleures-assurances-auto.be` sert une vraie photo.
- **Auteurs :** tous **nommés et uniques**, aucun « la rédaction », **aucune bio réutilisée** entre sites — bon point anti-footprint. (Coïncidence mineure de prénoms : « Maxime » Delvaux (SUV) et « Maxime » Dubois (opérateur) — noms/niches distincts, sans impact.)

---

## Top 5 actions prioritaires

1. **[RGPD — important] meilleure-carte-credit.be** : `@vercel/analytics` est chargé avant consentement et contredit la politique « aucun outil d'analyse tiers ». Gater Analytics derrière le consentement (comme `GatedAnalytics` des autres sites) **ou** retirer Analytics **ou** corriger la politique.
2. **[Identité — important] meilleure-voiture.be** : favicon **non servi**. Ajouter `app/icon.svg` (ou un champ `icons` en metadata) pour servir réellement la marque.
3. **[RGPD — important] meilleure-voiture-electrique.be** : le bandeau cookies annonce « Google Analytics » et embarque du code `gtag` mort alors qu'aucun GA n'existe. Aligner le texte FR+EN sur « Vercel Analytics cookieless » et supprimer le code mort.
4. **[Identité / anti-footprint — important] meilleure-voiture.be + quel-operateur-choisir.be** : remplacer les logos génériques réseau (spark, barres de signal) par des marks sur mesure ; différencier le template OG partagé par 3 sites.
5. **[Auteur / E-E-A-T — important] meilleur-suv.be, meilleure-voiture-familiale.be, meilleur-fournisseur-energie.be (+ 3 autres)** : ajouter un **avatar auteur réel** (champ `avatar` + `image` JSON-LD) ; étoffer la bio courte de Camille Mertens (énergie). Modèle à suivre : `meilleures-assurances-auto.be`.

---

## Résumé exécutif

8 sites audités sur le domaine Conformité & Identité. **Fondations légales solides** : pages légales remplies, en noindex, avec les infos société exactes (MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne) sur les 8 sites, et un bandeau cookies réellement monté partout (aucun banner manquant). Les risques résiduels sont : un **tracker non gaté** (carte-credit) et une **déclaration cookies erronée** (électrique) côté RGPD ; un **favicon non servi** (voiture) et des **logos/OG génériques réseau** (voiture, opérateur, énergie, carte-credit) côté identité/anti-footprint ; et une **carence d'avatars auteurs** sur 7 sites sur 8. Aucun auteur générique « la rédaction », tous nommés et uniques.
