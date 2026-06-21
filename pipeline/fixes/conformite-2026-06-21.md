# Journal des corrections — CONFORMITÉ & IDENTITÉ — réseau EMD

**Date :** 2026-06-21 · **Doctrine :** `skills/emd-fix/SKILL.md` v1.6.0 + `skills/humaniser-fr/SKILL.md`
**To-do :** `pipeline/audits/conformite-LATEST.md` (audit 2026-06-21)
**Domaines traités (uniquement) :** Légal & RGPD · Identité (favicon/logo/OG) · Auteur / E-E-A-T
**Principe appliqué :** §0 — corriger la SOURCE réellement rendue + vérifier le câblage. INVARIANT anti-perte-de-données respecté (aucune réécriture par du vide, aucun stub).

---

## Corrigé

### meilleur-fournisseur-energie-be — Identité (⚠️ → ✅)
**Problème (audit) :** le logo visible affichait « Voltéo », marque par défaut du template réseau (footprint + incohérence de marque).
**Action :** rebranding vers une marque propre **« Énerwatt »** sur **toutes les surfaces réellement rendues** (le mark SVG « flamme » et la DA « Cuivre chaud » étaient déjà uniques → conservés). Marque choisie de façon autonome (distincte du suffixe template `-éo`, ancrée énergie, FR+EN ; modifiable par l'humain si une marque officielle existe).
- `app/icon.svg` — `aria-label` (commit `37530e7`)
- `components/layout/Nav.tsx` — wordmark rendu + `aria-label` ; `components/layout/Footer.tsx` — wordmark + colonne + copyright + `aria-label` (commit `0008790`)
- `niche.config.ts` — `logo` (**consommé par `app/opengraph-image.tsx`** → corrige aussi l'OG) + `defaultStore` + commentaires (commit `c3a7eef`)
- `app/en/layout.tsx` — chrome EN (header + footer + copyright) qui rendait aussi « Voltéo » (commit `2823624`)
**Câblage vérifié :** OG = `niche.logo` ✓ ; Nav/Footer FR ✓ ; chrome EN ✓ ; favicon mark inchangé (déjà unique). SEO/title/JSON-LD/pages légales **inchangés** (déjà « Meilleur Fournisseur Énergie », société exacte, noindex).

### meilleure-voiture.be — RGPD (⚠️ → ✅)
**Problème :** bandeau rendu `<CookieConsent />` sans `lang` → restait en français sur `/en`.
**Action :** la locale serveur (`getLocale()`, déjà résolue pour Nav/Footer) est désormais passée au bandeau, normalisée en `'fr'|'en'` pour respecter le type du prop : `<CookieConsent lang={locale === 'en' ? 'en' : 'fr'} />`. `app/(site)/layout.tsx` (commit `2f31958`).
**Câblage vérifié :** ce site sert FR **et** EN via un layout `(site)` unique piloté par l'en-tête `x-mv-locale` → un seul point de montage, désormais localisé. Le composant possédait déjà les chaînes EN.

### meilleure-carte-credit.be — Auteur / E-E-A-T (ℹ️ → ✅)
**Problème :** bio de Sophie Laurent trop courte (2 phrases) vs. les pairs.
**Action :** réécriture E-E-A-T concrète et sourcée (humaniser-fr) FR+EN — 8 ans en agence, parcours, banques/néobanques couvertes, méthode (conditions tarifaires : cotisation, frais de change, taux, plafonds, assurances), point de vue assumé. Ville : Louvain-la-Neuve (anti-footprint : distincte des autres auteurs).
- `i18n/fr.json` + `i18n/en.json` — **source réellement rendue** (page auteur `app/[lang]/auteurs/[slug]`, JSON-LD `Person`, `generateMetadata`, `AuthorCard`) via `getDict(lang).author.bio` (commits `dc7f5ba`, `3945036`)
- `niche.config.ts` — `author.bio` canonique aligné (commit `4148d5f`)
**Branche :** commits sur la **branche par défaut réellement déployée** `claude/setup-nextjs-apple-guide-En4gb` (et non `main`, qui n'est pas la branche déployée — cf. § Reporté). Choix dicté par §0 (corriger la source rendue) pour éviter un correctif fantôme.

---

## Vérifié — déjà conforme (aucune modification ; faux positifs de l'audit)

### meilleur-suv.be — RGPD
L'audit signalait « cookies /en sans `lang` ». **Câblage réel :** le `/en` est servi par `app/en/layout.tsx`, qui rend déjà `<CookieConsent lang="en" />` ; le layout `app/(site)` (FR) retombe correctement sur `'fr'`. Le `<CookieConsent />` sans `lang` vu dans `(site)/layout.tsx` ne concerne que les pages FR. **Conforme, rien à corriger.**

### meilleure-voiture-familiale.be — RGPD
Même cas : `app/(en)/layout.tsx` rend déjà `<CookieConsent lang="en" />` ; `(site)` (FR) → `'fr'`. **Conforme.**

### meilleure-voiture-utilitaire.be — RGPD
`components/ui/CookieBanner.tsx` déduit la locale du chemin (`/en` → anglais), possède le copy **FR+EN** complet (Accepter/Refuser → Accept/Decline), lien politique localisé (`/confidentialite` ↔ `/en/confidentialite`), monté dans `app/(site)/layout.tsx` **et** `app/en/layout.tsx`. **Localisation FR/EN confirmée.**

---

## Reporté (hors des 3 domaines de ce run, ou non réalisable via les outils)

- **Déploiement (ℹ️ audit #4) — brancher sur `main`** `meilleure-carte-credit.be` (défaut `claude/setup-nextjs-apple-guide-En4gb`) et `meilleure-voiture-electrique` (défaut `claude/no-image-spec-generator-nTjFC`). Changer la branche par défaut / la branche de déploiement Vercel n'est pas réalisable avec les outils disponibles (réglage GitHub/Vercel). Les corrections carte-crédit de ce run ont donc été appliquées **sur la branche déployée** pour être réellement rendues. **À faire côté humain :** pointer le déploiement sur `main` puis y reporter la branche.
- **meilleure-voiture-electrique** — aucune action **dans les 3 domaines** : l'audit ne relève que des points ℹ️ hors périmètre (branche de déploiement ci-dessus ; `<Analytics/>` cookieless chargé inconditionnellement, bouton « Refuser » sans effet technique — jugé acceptable car sans cookie par l'audit). Non modifié.
- **meilleure-carte-credit.be — bio Sophie Laurent** : voir aussi « Corrigé ». La correction ne sera visible en prod que parce que la branche `claude/setup-…` **est** la branche déployée ; si le déploiement passe à `main`, y reporter les 3 commits.

---

## À vérifier (câblage source corrigé, rendu non observé)

- Les corrections sont **au niveau source** ; le build/déploiement Vercel n'a pas été observé dans ce run. À confirmer après redeploy :
  - **OG énergie** : `app/opengraph-image.tsx` (runtime edge) régénère bien l'eyebrow « Énerwatt · {année} ».
  - **voiture** : type-check OK sur `<CookieConsent lang={locale === 'en' ? 'en' : 'fr'} />` (ternaire → littéral, conforme au prop `'fr'|'en'`).
  - **carte-crédit** : page auteur + JSON-LD `Person` + meta description reflètent la bio enrichie après ISR (`revalidate 86400`).

---

## Observations hors périmètre (non modifiées — signalées pour un prochain run)

- **meilleur-fournisseur-energie-be** : `app/(site)/mentions-legales/page.tsx` contient une clause « Liens affiliés » alors que la doctrine EMD indique **aucune affiliation**. Pré-existant, non relevé par l'audit conformité, hors des 3 domaines → non touché.
- **meilleure-voiture-utilitaire.be** : `app/en/layout.tsx` rend `<Nav />` sans `locale="en"` (le `Footer` reçoit pourtant `locale="en"`) → libellés de nav potentiellement en FR sur `/en`. Domaine i18n, hors périmètre conformité → non touché.
- **meilleur-fournisseur-energie-be** : `niche.config` déclare `locales: ['fr']` mais un sous-arbre `app/en` complet existe (chrome EN rebrandé ici par cohérence). Statut multilingue ambigu, déjà noté « hors périmètre » par l'audit.

---
*Journal généré par la tâche planifiée `emd-fix-conformite`. Écritures limitées aux sites concernés (sur leur branche déployée) + ce fichier dans emd-methodo. N'écrase pas l'audit.*
