# Audit CONFORMITÉ & IDENTITÉ — 2026-07-13

Périmètre restreint (emd-audit v1.6) : sites de `pipeline/provisioned-log.csv` provisionnés ≤ 14 j
et non encore audités par le domaine `conformite`.

- Candidats ≤14j : **simulateur-assurance-auto.be** (provisionné le 2026-07-10)
- Ledger `audited-conformite.csv` : inexistant avant ce run → aucun exclu
- **Périmètre final : 1 site**

Mode LECTURE SEULE. Audit du **rendu réel** (layouts, SVG inline du Nav, montage des composants).

## Scorecard

| Site | Légal & RGPD | Identité | Auteur / E-E-A-T |
|---|---|---|---|
| simulateur-assurance-auto.be | ❌ | ✅ | ✅ |

Bloquants : **2** · Importants : **2** · Mineurs : **2**

---

## simulateur-assurance-auto.be

### ❌ LÉGAL & RGPD

**❌ BLOQUANT — Aucun bandeau cookies sur tout l'arbre EN.**
`app/(site)/layout.tsx` monte bien `<CookieBanner />`, mais `app/en/layout.tsx` ne rend que `Nav` +
`Footer` : toutes les routes `/en/*` (home EN, blog EN, comparer, simulateur…) sont servies **sans
bandeau de consentement**. Fix : ajouter `<CookieBanner />` dans `app/en/layout.tsx`.

**❌ BLOQUANT — CookieBanner mono-langue (FR uniquement).**
`components/ui/CookieBanner.tsx` a tous ses textes en dur en français (« Nous utilisons une mesure
d'audience anonyme… », « Accepter », « Refuser », `aria-label="Gestion des cookies"`) et pointe vers
`/confidentialite` (route FR). Aucun passage par `tl(locale, …)` / `localePath`. Doctrine : bandeau
**FR + EN**. Fix : passer les libellés en i18n + lien vers `/en/privacy` en locale EN.

**⚠️ IMPORTANT — Pas de page CGU.**
Le site expose `/mentions-legales` + `/confidentialite` (et miroirs `/en/legal-notice` + `/en/privacy`),
mais **aucune page CGU / conditions d'utilisation** (doctrine : mentions, confidentialité, CGU).

**⚠️ IMPORTANT — `/en/privacy` : siège social manquant.**
Le bloc « Data controller » ne reprend que société + n° d'entreprise + email ; l'adresse
« Rue Blanche-Eau 15, 6950 Nassogne » (présente côté FR sur `/confidentialite`) a été omise.
Parité légale FR/EN à rétablir.

**⚠️ MINEUR — Analytics chargé avant consentement.**
`<Analytics />` (`@vercel/analytics`) est monté inconditionnellement dans `app/layout.tsx`, donc actif
avant tout choix de l'utilisateur et **non désactivé en cas de refus**. Vercel Analytics est cookieless
et anonyme (donc pas un tracker au sens strict), mais le refus exprimé dans le bandeau n'a aujourd'hui
aucun effet technique. Recommandé : conditionner le montage au consentement (ou documenter clairement
le caractère « strictement nécessaire »).

**✅ CONFORME**
- Pages légales **remplies** : aucun placeholder `[À compléter]` sur les 4 pages.
- **noindex** correct : `robots: { index: false, follow: false }` sur `/mentions-legales`,
  `/confidentialite`, `/en/legal-notice`, `/en/privacy`.
- **Infos société exactes** : MentionBox SRL · société à responsabilité limitée (SRL) de droit belge ·
  BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique · emd@mentionbox.be.
- Bandeau (côté FR) : léger/discret, **Accepter / Refuser**, lien vers la politique, choix mémorisé
  (`localStorage: cookie-consent`), aucun tracker publicitaire.
- Hreflang réciproque + x-default sur les pages légales EN.

### ✅ IDENTITÉ

- **Favicon réellement servi** : `app/icon.svg` présent. ✅
- **OG unique** : `app/opengraph-image.tsx` (edge, 1200×630) génère l'image depuis
  `niche.palette` + `niche.tagline` + `niche.domain` → contenu propre au site, pas d'OG partagé. ✅
- **Logo réellement rendu unique** : le SVG **inline dans `Nav.tsx`** est un mark **bouclier + coche**
  (`fill: currentColor` → `var(--accent-1)`), pas l'éclair réseau générique. ✅
- **⚠️ MINEUR — anti-footprint** : `meilleures-assurances-auto.be` rend dans son `Nav.tsx` un mark
  **également bouclier + coche** (version stroke au lieu de fill). Concept de marque identique entre
  deux sites voisins du réseau assurance → différencier l'un des deux marks.

### ✅ AUTEUR / E-E-A-T

- Auteur identifié : **Damien** — pas de « la rédaction », pas de champ vide. ✅
- **RÈGLE NOM respectée : aucun nom de famille**, prénom seul, partout —
  `niche.config.author.name` = `Damien` · slug `damien` · page `/auteurs/damien` ·
  JSON-LD `Person` (page auteur) et `Article.author` (`@type: Person`, name = `niche.author.name`) ·
  frontmatter FR et EN (`authorSlug: "damien"`). ✅
- Bio E-E-A-T crédible et spécifique (ex-gestionnaire de sinistres devenu analyste indépendant,
  marché belge, AG/Ethias/KBC/Belfius/P&V/Corona Direct) + titre d'expertise. ✅
- Page auteur présente (FR `/auteurs/[slug]` + arbre `app/en/auteurs`), JSON-LD `Person` avec
  `jobTitle`, `url`, `worksFor`. Cohérence frontmatter ↔ page auteur ↔ données structurées. ✅
- Unicité inter-sites : nom/bio propres au site sur le périmètre observé (pas de re-scan du parc).

---

## Top actions prioritaires

1. **❌ Monter `<CookieBanner />` dans `app/en/layout.tsx`** — actuellement zéro consentement sur `/en/*`.
2. **❌ Internationaliser le CookieBanner** (libellés FR/EN via `tl(locale, …)` + lien `/en/privacy`).
3. **⚠️ Créer la page CGU** (FR + miroir EN, en noindex).
4. **⚠️ Ajouter le siège social** (Rue Blanche-Eau 15, 6950 Nassogne) dans `/en/privacy`.
5. **⚠️ Différencier le logo** : le mark bouclier + coche double celui de `meilleures-assurances-auto.be`.

Bonus (mineur) : conditionner `<Analytics />` au consentement pour rendre le « Refuser » effectif.
