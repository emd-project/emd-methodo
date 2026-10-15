# Fix CONFORMITÉ & IDENTITÉ — 2026-10-15

**Source :** `pipeline/audits/conformite-LATEST.md` (audit du 2026-10-15)
**Périmètre :** 1 site (hérité de l'audit, aucun re-scan du parc).
**Doctrine :** `skills/emd-fix/SKILL.md` v1.6.1 + `references/garde-fous.md` + `skills/humaniser-fr`.

| Site | Repo | Légal & RGPD | Identité | Auteur |
|---|---|:---:|:---:|:---:|
| beste-waterdispenser.be | `emd-project/beste-waterfontein.be` | ❌ → ✅ | ✅ (inchangé) | ✅ (+ lien EN corrigé) |

---

## beste-waterdispenser.be

### Corrigé
1. ❌ **Bandeau cookies RGPD NL+EN créé et monté** — commit [`9f7e40c`](https://github.com/emd-project/beste-waterfontein.be/commit/9f7e40c48d31d7a3e13ff9ec67d52023b7d3d5bc)
   - Nouveau `components/layout/CookieConsent.tsx` (client) : bandeau discret bas-gauche (max 400 px, `left/right: 16` → pas de scroll horizontal à 320 px), boutons **Weigeren / Accepteren · Decline / Accept** de même poids, lien vers `/privacybeleid` · `/en/privacy` via `legalPath()`, choix mémorisé (`localStorage['cookie-consent']`, try/catch), locale déduite du chemin, masqué sur `/admin`.
   - **Câblage vérifié** : `<CookieConsent />` monté dans `app/layout.tsx` (root layout, sert NL **et** EN) ; fichier relu sur `main` après commit (6125 o, non vide).
2. ❌ **`<Analytics />` conditionné au consentement** — même commit : import `@vercel/analytics/next` retiré de `app/layout.tsx`, `<Analytics />` rendu uniquement dans `CookieConsent` quand `consent === 'accepted'`. Aucun chargement avant « Accepter ».
3. ⚠️ **Politique de confidentialité complétée** (NL + EN) — même commit :
   - Section « Rechtsgrond en toestemming » / « Legal basis and consent » : consentement (art. 6.1.a AVG) pour Vercel Analytics, intérêt légitime (6.1.f) pour le strict nécessaire.
   - Retrait du consentement : bouton `CookieSettingsButton` (rouvre le bandeau) + droit de retrait ajouté à la liste des droits.
   - `/en/privacy` : **adresse du siège ajoutée** (Rue Blanche-Eau 15, 6950 Nassogne, Belgium).
   - `noindex,nofollow` et hreflang conservés.
4. ⚠️ **Liens auteur localisés** — commit [`3b5721c`](https://github.com/emd-project/beste-waterfontein.be/commit/3b5721c2a61ed3df1aa867395d2c521e76451300) : `AuthorByline` et `AuthorCard` utilisent `localePath(locale, '/auteurs/<slug>')` → `/en/auteurs/wouter-d` sur les articles EN (`ArticleView` passe déjà `locale`). Aucune signature de props modifiée → aucun consommateur à mettre à jour.

Contrôle : typecheck isolé (tsc strict + stubs) des nouveaux fichiers OK ; prose ajoutée sans tiret cadratin.

### Inchangé (déjà conforme, idempotent)
- Pages légales NL/EN, infos société, noindex.
- Identité : favicon `app/icon.svg`, mark gobelet inline `Nav.tsx`/`Footer.tsx`, OG `app/opengraph-image.tsx` (+ EN).
- Auteur Wouter D. (persona, pages auteur, JSON-LD).

### Reporté
- mineur (dormant) : `app/(site)/[article]/page.tsx` (route legacy) n'envoie pas `authorName` à `AuthorByline`/`AuthorCard` et garde `name: … || 'Auteur'` en JSON-LD. Aucun `content/articles/` aujourd'hui → rien n'est rendu. Reporté : fichier de 15 Ko à réécrire en entier via l'API fichier, risque de régression disproportionné pour une route sans contenu. À faire avant tout article standalone.

### À vérifier (câblage non prouvé en prod)
- Build Vercel du commit `3b5721c` (pas de build local possible ici : repo hors clone).
- Rendu réel du bandeau à 320/375 px et absence de requête `/_vercel/insights` avant « Accepteren » (pas de fetch HTTP dans ce run).
