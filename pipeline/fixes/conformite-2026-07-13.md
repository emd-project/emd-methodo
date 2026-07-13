# Journal des corrections — CONFORMITÉ & IDENTITÉ — 2026-07-13

Source : `pipeline/audits/conformite-LATEST.md` (audit du 2026-07-13).
Périmètre hérité : **1 site** (simulateur-assurance-auto.be, provisionné le 2026-07-10).
Écriture en prod sur `main`. Aucun autre site du parc n'a été touché.

---

## simulateur-assurance-auto.be

### ✅ Corrigé

**❌ BLOQUANT — Aucun bandeau cookies sur l'arbre EN.**
`<CookieBanner />` monté dans `app/en/layout.tsx`, à côté de `Nav` + `Footer`. Toutes les routes
`/en/*` (home, blog, comparer, simulateur, classement…) servent désormais le bandeau de consentement.
Câblage vérifié par relecture du fichier après commit.
→ commit `7ef9638`

**❌ BLOQUANT — CookieBanner mono-langue.**
Libellés sortis du dur : `tl(locale, 'cookies.*')`, locale déduite du path (même helper que la Nav).
Clés `cookies.{aria,message,policyIntro,policyLink,accept,refuse}` ajoutées dans
`content/translations/fr.json` et `en.json`. Le lien de la politique passe par `legalPath(locale, 'privacy')`
→ `/confidentialite` en FR, `/en/privacy` en EN (avant : `/confidentialite` en dur, donc hors-locale en EN).
→ commits `7ef9638`, `eb6d714`

**⚠️ IMPORTANT — Pas de page CGU.**
Créées : `/conditions-generales` (FR) + `/en/terms` (EN), toutes deux en `robots: { index: false, follow: false }`,
avec `canonical` + hreflang réciproque + `x-default` sur le FR. Contenu spécifique au site, pas de boilerplate
réseau : objet, ce que le site fait, **ce qu'il ne fait pas** (aucune vente d'assurance, aucune activité de
courtage ou de distribution, aucune commission, aucun conseil personnalisé au sens réglementaire), valeur des
estimations du simulateur (ordre de grandeur, ni devis ni offre ; la prime réelle dépend d'éléments que le site
ne connaît pas), PI, responsabilité, liens externes, données personnelles, droit belge.
Mapping `conditions-generales ⇄ terms` ajouté dans `LangSwitch` (LEGAL_EQUIV) pour que le sélecteur de langue
tombe sur la page équivalente et non sur l'accueil.
→ commits `114ffd8`, `f3c9b4a`

**⚠️ IMPORTANT — `/en/privacy` : siège social manquant.**
« Registered office: Rue Blanche-Eau 15, 6950 Nassogne, Belgium » ajouté au bloc *Data controller*.
Parité légale FR/EN rétablie (société · n° d'entreprise · siège · email · site).
→ commit `114ffd8`

**⚠️ MINEUR — Analytics chargé avant consentement.**
`<Analytics />` ne se monte plus en dur dans `app/layout.tsx`. Il passe par
`components/analytics/ConsentAnalytics.tsx`, qui ne le rend **qu'après un « Accepter » explicite**.
`lib/consent.ts` est la source unique de la clé (`cookie-consent`, valeurs `accepted`/`refused` — inchangées,
donc les choix déjà mémorisés sont respectés) et diffuse un événement custom : accepter active la mesure
immédiatement, sans rechargement. « Refuser » est désormais suivi d'effet.
→ commit `7ef9638`

**⚠️ MINEUR — Logo : empreinte inter-sites.**
Le mark **bouclier + coche** doublait celui de `meilleures-assurances-auto.be` (même concept de marque sur deux
sites voisins du réseau assurance). Nouveau mark : **cadran de jauge + aiguille** — le simulateur de prime,
c'est-à-dire l'ancre de signature du site (« la prime réelle et la garantie côte à côte »).
Posé dans les **trois** chemins de rendu réels : SVG inline de `Nav.tsx`, `app/icon.svg` (favicon servi par Next),
et `Footer.tsx`. Tracé identique partout, 1:1 (viewBox 24×24), tintable (`currentColor` → `--accent-1`).
→ commits `7431f67`, `114ffd8`

### 🔧 Corrigé en plus (hors to-do, détecté en traçant le rendu — §0)

**Footer : mark générique.** Le `Footer.tsx` rendait encore **l'éclair générique du template** (le SVG inline du
template, jamais remplacé lors du provisioning). L'audit n'avait regardé que le Nav. Corrigé avec le même mark
que le Nav et le favicon.

**Footer : liens légaux EN en 404.** `colApropos` construisait ses hrefs avec `localePath`, qui produit
`/en/mentions-legales` et `/en/confidentialite` — deux routes qui **n'existent pas** (les vraies sont
`/en/legal-notice` et `/en/privacy`). Les deux liens légaux du footer EN étaient donc morts.
Nouveau module `lib/legal-paths.ts` (`legalPath(locale, page)`) : mapping explicite des slugs légaux par locale,
consommé par le `Footer` et le `CookieBanner`. Entrée CGU ajoutée dans la colonne « À propos » (FR + EN).

### ✅ Déjà conforme — non touché (idempotence)

- Pages légales FR/EN remplies, `noindex` correct, infos société exactes (MentionBox SRL · SRL de droit belge ·
  BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne).
- Favicon réellement servi (`app/icon.svg`) et OG unique (`app/opengraph-image.tsx`, généré depuis la palette et
  la tagline du site) : **câblage déjà bon**, seul le tracé du mark a changé.
- Auteur / E-E-A-T : persona **Damien** (prénom seul), bio spécifique, page auteur, JSON-LD `Person`,
  frontmatter FR + EN cohérents. Rien à reprendre.

### ⏳ À vérifier (câblage non prouvé depuis le repo)

- **Rendu visuel du nouveau mark** à 16 px (favicon) et dans le Nav/Footer : le tracé est correct en SVG, mais
  seul un coup d'œil sur le déploiement Vercel confirme la lisibilité réelle du cadran fin. Le tracé est
  identique dans les trois fichiers, donc un ajustement éventuel se fait en trois endroits.
- **Build Vercel** : commits poussés sur `main`, déploiement automatique. Aucun renommage de symbole exporté
  (`CookieBanner`, `Footer`, `Nav`, `LangSwitch` inchangés) ; les seuls ajouts sont des modules neufs
  (`lib/consent.ts`, `lib/legal-paths.ts`, `components/analytics/ConsentAnalytics.tsx`) et l'import de
  `Analytics` a été déplacé de `app/layout.tsx` vers `ConsentAnalytics`. Aucune référence pendante attendue.
- **Sitemap** : vérifié — `app/sitemap.ts` n'émet aucune page légale (par construction), les CGU noindex n'y
  entreront donc pas.

### 📋 Reporté

- **Mark de `meilleures-assurances-auto.be`** : c'est le site voisin qui portait l'autre bouclier + coche. Il est
  **hors périmètre** (pas dans l'audit ≤14 j) : le doublon est levé côté simulateur-assurance-auto.be, on ne
  churne pas un site déjà stabilisé. À traiter s'il repasse un jour en audit.

---

## Récap

| | |
|---|---|
| Sites du périmètre | 1 |
| Sites touchés | 1 |
| Bloquants corrigés | 2 / 2 |
| Importants corrigés | 2 / 2 |
| Mineurs corrigés | 2 / 2 |
| Défauts corrigés hors to-do | 2 (mark générique du Footer, liens légaux EN en 404) |
| Commits sur `main` | 5 — `7431f67`, `7ef9638`, `eb6d714`, `114ffd8`, `f3c9b4a` |
