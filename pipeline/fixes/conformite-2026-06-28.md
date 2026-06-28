# Journal des corrections — CONFORMITÉ & IDENTITÉ — 2026-06-28

**Source to-do :** `pipeline/audits/conformite-LATEST.md` (2026-06-28).
**Doctrine :** `skills/emd-fix/SKILL.md` v1.6.0 + `skills/humaniser-fr/SKILL.md`.
**Périmètre appliqué :** Légal & RGPD · Identité · Auteur (RÈGLE NOM). Commits sur `main` uniquement.
**Principe §0 :** correction de la SOURCE réellement rendue + vérification du câblage (import + montage tracés).

---

## CORRIGÉ

### Légal & RGPD

#### Site 5 — meilleure-voiture-7-places.be (main) — BLOQUANT levé
- **Bandeau cookies créé** (était totalement absent) : `components/layout/CookieConsent.tsx` (RGPD, Accepter/Refuser, lien politique, FR+EN via prop `lang`, lien localisé `/confidentialite` | `/en/privacy`).
- **Gating analytics** : `components/layout/GatedAnalytics.tsx` créé ; `app/layout.tsx` passe de `<Analytics/>` (chargé sans consentement) à `<GatedAnalytics/>` → aucun tracker avant acceptation.
- **Montage vérifié** : `<CookieConsent lang="fr"/>` dans `app/(site)/layout.tsx`, `<CookieConsent lang="en"/>` dans `app/en/layout.tsx`.
- Commit `c3611a9`.

#### Site 11 — meilleure-neobanque.be (main) — BLOQUANT levé
- **Bandeau monté sur tout l'arbre `/en`** (était absent) : `<CookieConsent lang="en"/>` ajouté dans `app/en/layout.tsx`.
- **Bandeau rendu bilingue** : `components/ui/CookieConsent.tsx` reçoit désormais une prop `lang` (textes FR+EN, lien `/confidentialite` | `/en/privacy`) ; `<CookieConsent lang="fr"/>` côté `app/(site)/layout.tsx`.
- **Gating analytics global** : `components/layout/GatedAnalytics.tsx` créé (lit `mnb-cookie-consent`) ; `app/layout.tsx` passe de `<Analytics/>` à `<GatedAnalytics/>` → plus de mesure d'audience sans consentement, y compris sur `/en`. Le bandeau émet désormais `cookie-consent-change`.
- Commit `f0d1699`.

#### Sites 2 & 3 — déjà conformes (idempotent, aucun changement)
- **meilleur-suv.be** : `app/en/layout.tsx` rend déjà `<CookieConsent lang="en"/>` et `app/(site)/layout.tsx` `<CookieConsent/>` (défaut `'fr'`). Le bandeau supporte déjà `lang` et est bilingue → l'arbre `/en` affiche bien l'EN. Réserve de l'audit (FR en dur sur `/en`) non reproduite sur l'état actuel du repo.
- **meilleure-voiture-familiale.be** : l'arbre EN est un route group `app/(en)/layout.tsx` (et non `app/en/`) qui rend déjà `<CookieConsent lang="en"/>`. Idem : bilingue, conforme.

### Identité

#### Site 5 — meilleure-voiture-7-places.be (main)
- **Bolt template retiré du Footer** : `Footer.tsx` rendait l'éclair générique `M13 2 4.5 13.5…`. Remplacé par la marque « arche famille » (toit + 3 sièges), identique au `Nav.tsx` et au favicon `app/icon.svg`. Commit `c3611a9` (même commit que le RGPD).

#### Site 8 — meilleur-fournisseur-energie-be (main)
- **Marque Nav distincte du favicon** : le SVG inline du `Nav.tsx` reprenait à l'identique la flamme de `app/icon.svg` (aucune différenciation logo/favicon). Remplacé par un mark « soleil » (disque + 8 rayons, path filled, tinté par la même règle CSS). Favicon flamme conservé. Commit `6b5dffa`.

#### Site 9 — meilleures-assurances-auto.be (main)
- **Marque graphique inline ajoutée au Nav** : le `Nav.tsx` ne rendait qu'un wordmark texte. Ajout d'un mark SVG inline (bouclier + coche, repris du favicon `app/icon.svg`, tinté `var(--accent-1)`) avant le wordmark. Commit `7908782`.

#### Site 11 — meilleure-neobanque.be (main)
- **OG propre à la niche** : `app/opengraph-image.tsx` était le visuel template (watermark ★). Remplacé par un motif néobanque (marque « 3 barres ascendantes » reprise du logo/favicon + carte bancaire stylisée), couleurs = palette du site. Commit `f0d1699`.

### Auteur — RÈGLE NOM (patronyme → prénom + initiale)

Tous les sites du réseau ont déjà un **auteur nommé unique** avec bio E-E-A-T, page auteur et JSON-LD `Person` (aucun « la rédaction » / auteur générique). Le défaut réel = patronyme complet rendu. Correctif appliqué : `niche.author.name` → prénom + initiale. Comme toutes les surfaces (H1 page auteur, `JSON-LD Person.name`, AuthorCard, byline d'articles, page `/a-propos`) lisent `niche.author.name`, le changement se propage partout **sans toucher au `slug` ni à l'URL** (`/auteurs/<slug>` inchangé → zéro casse SEO).

| Site (main) | Avant | Après | Extra | Commit |
|---|---|---|---|---|
| meilleure-voiture.be | Julien Vanderhaeghe | Julien V. | — | `3ff7e27` |
| meilleur-suv.be | Damien Crols | Damien C. | /a-propos lit author.name (auto) | `6ad50bc` |
| meilleure-voiture-familiale.be | Audrey Pirard | Audrey P. | — | `2a457ff` |
| meilleure-voiture-utilitaire.be | Damien Lardinois | Damien L. | — | `bf60e10` |
| meilleure-voiture-7-places.be | Sophie Lambrechts | Sophie L. | — | `513b68d` |
| quel-operateur-choisir.be | Maxime Dubois | Maxime D. | — | `1052581` |
| meilleur-fournisseur-energie-be | Camille Mertens | Camille M. | bio nettoyée (« Camille décortique… ») | `888d7ae` |
| meilleures-assurances-auto.be | Thomas Renard | Thomas R. | bio nettoyée ; byline des ~20 articles auto-corrigée via config | `da8567d` |

---

## REPORTÉ (au prochain run, avec raison)

- **Site 11 — slug auteur `maxime-vanderlinden`** (⚠️, pas bloquant) : le nom affiché est déjà « Maxime » (conforme). Le patronyme ne subsiste que dans le `slug` → URL `/auteurs/maxime-vanderlinden`, `Person.url`, `canonical` et `authorSlug` des articles. Le renommer en `maxime` change une URL publique : nécessite une stratégie de redirection (301 ancien→nouveau slug) pour respecter « zéro casse ». Reporté tant que la redirection n'est pas câblée.
- **Sites 6 & 10 hors `main`** : `meilleure-voiture-electrique` (branche `claude/no-image-spec-generator-nTjFC`, déjà CONFORME « Christophe F. ») et `meilleure-carte-credit.be` (branche `claude/setup-nextjs-apple-guide-En4gb`, auteur « Sophie Laurent » à corriger). La consigne du run limite les écritures à `main`. Le correctif RÈGLE NOM pour le site 10 (config + `i18n/fr.json author.name` + `authorSlug`) est à appliquer quand la branche sera fusionnée sur `main`.

---

## À VÉRIFIER (câblage à confirmer sur le rendu Vercel)

- **OG site 11** (`app/opengraph-image.tsx`) : la génération `next/og` (satori, runtime edge) doit produire l'image sans erreur de layout — chaque conteneur multi-enfants a `display:flex`. À confirmer via l'aperçu de partage (carte Twitter/LinkedIn) après redéploiement.
- **Marques inline sites 8 & 9** : le tintage CSS du mark dépend de la règle existante (`fill` pour le soleil site 8 via `.nav .logo .mark svg path` ; `stroke="var(--accent-1)"` posé en dur pour le bouclier site 9). Vérifier le rendu visuel header en light/dark après déploiement.
- **Bandeaux cookies sites 5 & 11** : confirmer à l'écran que `<Analytics/>` ne se charge qu'après « Accepter » (Network : aucune requête Vercel Analytics avant consentement), et que le bandeau s'affiche bien en EN sur `/en/...`.

---

## RAPPEL — points hors périmètre de ce run (déjà ✅ à l'audit)
- Pages légales : toutes remplies, en noindex, infos société exactes (MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne) sur les 11 sites — rien à corriger.
- Favicons `app/icon.svg` : présents et câblés sur tous les sites.

*Journal généré par la tâche planifiée `emd-fix-conformite`. N'écrase pas l'audit source.*
