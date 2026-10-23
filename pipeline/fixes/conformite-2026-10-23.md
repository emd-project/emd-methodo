# Fix CONFORMITÉ & IDENTITÉ — 2026-10-23

**Source :** `pipeline/audits/conformite-LATEST.md` (audit du 2026-10-22)
**Périmètre :** 1 site (hérité de l'audit, aucun re-scan du parc).
**Doctrine :** `skills/emd-fix/SKILL.md` v1.6.1 + `references/garde-fous.md` + `skills/humaniser-fr`.

| Site | Repo | Légal & RGPD | Identité | Auteur |
|---|---|:---:|:---:|:---:|
| fonds-investissement.be | `emd-project/fond-investissement` | ❌ → ✅ | ✅ (inchangé) | ⚠️ → ✅ |

---

## fonds-investissement.be

### Corrigé
1. ❌ **Bandeau cookies RGPD FR+EN créé et monté** — commit [`fd91f56`](https://github.com/emd-project/fond-investissement/commit/fd91f5696335521ef69f3600facdf702f271a059)
   - Nouveau `components/layout/CookieConsent.tsx` (client) : bandeau discret bas-gauche (max 400 px, `left/right: 16` → pas de scroll horizontal à 320 px), boutons **Refuser / Accepter · Decline / Accept** de même poids, lien vers `/confidentialite` · `/en/privacy` via `legalPath()`, choix mémorisé (`localStorage['cookie-consent']`, try/catch), locale déduite du chemin, masqué sur `/admin`. Couleurs via tokens du site (`--bg-surface`, `--accent-1` prune).
   - **Câblage vérifié** : `<CookieConsent />` monté dans `app/layout.tsx` (root layout, sert FR **et** EN).
2. ❌ **`<Analytics />` conditionné au consentement** — même commit : import `@vercel/analytics/next` retiré de `app/layout.tsx`, `<Analytics />` rendu uniquement dans `CookieConsent` quand `consent === 'accepted'`.
3. ⚠️ **Politique de confidentialité complétée** (FR + EN) — même commit :
   - Section « Base légale et consentement » / « Legal basis and consent » (6.1.a pour Vercel Analytics, 6.1.f pour le strict nécessaire et les demandes de contact).
   - Retrait du consentement : `CookieSettingsButton` (« Gérer mes cookies » / « Manage cookies ») + droit de retrait dans la liste des droits.
   - `/en/privacy` : **adresse du siège ajoutée** + « SRL de droit belge » traduit.
   - `noindex,nofollow` et hreflang conservés.
4. ⚠️ **Auteur traduit en EN** — commit [`9c3f17a`](https://github.com/emd-project/fond-investissement/commit/9c3f17abf8c4ab29852d5a0bd66af05a418ef07d)
   - `niche.config.ts` : `localized.en.author { title, bio }` (nom et slug inchangés) ; type `NicheConfig.localized[locale].author?` ajouté (optionnel, repli silencieux).
   - `lib/niche-l10n.ts` : nouveau `authorL(locale)`.
   - `/en/auteurs/[slug]` : titre, bio, meta description et JSON-LD Person en anglais.
   - `ArticleView` : JSON-LD `Article.author` (jobTitle, description, url) dans la locale de l'article ; `AuthorCard` reçoit la bio localisée.
5. ⚠️ **Liens auteur localisés** — même commit : `AuthorByline` et `AuthorCard` utilisent `localePath(locale, '/auteurs/<slug>')` ; `ArticleView` `author.url` → `/en/auteurs/cedric-h` sur les articles EN. Aucune signature de props modifiée → aucun consommateur à mettre à jour.

**Contrôles :** clone du repo + `npm ci` + `tsc --noEmit` **0 erreur** sur l'arbre modifié ; arbre distant (`origin/main` @ `9c3f17a`) **identique octet pour octet** à l'arbre vérifié (`git diff` vide). `next build` non concluant ici (téléchargement Google Fonts bloqué par le proxy, sans rapport avec le diff). Prose ajoutée sans tiret cadratin.

### Inchangé (déjà conforme, idempotent)
- Pages légales FR/EN, infos société, noindex.
- Identité : favicon `app/icon.svg`, mark tampon inline `Nav.tsx`/`Footer.tsx`, OG `app/opengraph-image.tsx` (+ EN).
- Persona Cédric H. (nom, slug, page FR, 64/64 frontmatters).

### Reporté
- mineur (dormant) : route legacy `app/(site)/[article]/page.tsx` sans `authorName` + repli `'Auteur'` en JSON-LD. Aucun article standalone → rien n'est rendu. Même arbitrage que beste-waterdispenser.be (2026-10-15).
- Template : bandeau cookies + Analytics conditionnel toujours absents du template (3ᵉ audit consécutif). Hors périmètre de ce fix (sites du rapport uniquement) → à porter dans le template par une tâche dédiée.
- Titre FR de l'auteur contient un tiret cadratin (« … entreprises — financement … ») : non signalé par l'audit, laissé tel quel.

### À vérifier (câblage non prouvé en prod)
- Build Vercel des commits `fd91f56` et `9c3f17a`.
- Rendu réel du bandeau à 320/375 px et absence de requête `/_vercel/insights` avant « Accepter ».
- `/en/auteurs/cedric-h` en anglais et lien de byline EN → `/en/auteurs/cedric-h`.
