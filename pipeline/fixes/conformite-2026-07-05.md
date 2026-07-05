# Journal des fixes — CONFORMITÉ & IDENTITÉ — 2026-07-05

**Tâche :** `emd-fix-conformite` (run auto). **Domaine :** Légal & RGPD · Identité · Auteur/E-E-A-T.
**Source :** `pipeline/audits/conformite-LATEST.md` (2026-07-05). Écrit sur `main`, un site à la fois.
**Doctrine :** `skills/emd-fix` §0 (câblage réel) + `references/garde-fous.md` (anti perte de données, cohérence build). Édits ciblés, idempotents.

---

## Corrigé

### Site 12 — meilleur-fournisseur-electricite.be (main) — 2 bloquants levés
- **RGPD (bloquant) — tracker avant consentement.** Ajout de `components/layout/GatedAnalytics.tsx` (ne monte `<Analytics/>` que si `cookie-consent==='accepted'`, réagit à l'évènement `cookie-consent-change`). `app/layout.tsx` : `<Analytics/>` inconditionnel → `<GatedAnalytics/>`.
  Commit `b0a3358`.
- **RGPD (bloquant) — bandeau /en absent + non fonctionnel.** `CookieBanner` rendu bilingue (prop `lang`), écrit désormais un cookie + émet `cookie-consent-change` (consentement effectif, plus décoratif), lien « En savoir plus » localisé. Monté sur `app/en/layout.tsx` (`lang="en"`) — était absent sur tout l'arbre `/en`. Commit `b0a3358`.
- **Identité (bloquant) — logo/favicon éclair générique.** `Nav.tsx` (SVG inline rendu) + `app/icon.svg` : éclair « bolt-in-hexagon » → marque sur mesure « compteur électrique » (cadran + aiguille + moyeu). Favicon = tuile teal + jauge blanche, lisible en petit. Commit `b9703414`.
- **Identité (anti-footprint) — OG template ★ partagé.** `app/opengraph-image.tsx` : template étoile réseau → motif « barres d'énergie » + copie spécifique. Piloté par `niche.palette`. Commit `67de7bd`.

### Site 11 — meilleure-fibre-internet.be (main)
- **RGPD (réserve) — bandeau FR-only sur `/en`.** `CookieConsent` (monté une fois au root) rendu bilingue via `usePathname` (préfixe `/en` → copie EN + lien légal `/en`). Commit `1e9f4a2`.
- **Identité (réserve) — éclair résiduel au Footer.** `Footer.tsx` : éclair → marque hexagone-nœud fibre (identique à Nav / `app/icon.svg`). Commit `28b8512`.
- **Identité (anti-footprint) — OG partagé avec electricite.** `app/opengraph-image.tsx` : ★ → motif « anneaux de signal » fibre + copie propre. Commit `28b8512`.

### Site 3 — meilleure-voiture-familiale.be (main)
- **Identité (réserve) — logo Nav « maison/chevron » dupliqué du favicon.** `Nav.tsx` + `app/icon.svg` : maison générique → silhouette « voiture familiale / monospace » (path unique, roues en evenodd), propre à la niche. Couleurs inchangées (accent `#0E7C66`). Commit `aa28e8f`.

### Site 4 — meilleure-voiture-utilitaire.be (main)
- **RGPD (réserve) — `<Analytics/>` non gaté.** Ajout `GatedAnalytics`, `CookieBanner` émet `cookie-consent-change`, `app/layout.tsx` : `<Analytics/>` → `<GatedAnalytics/>`. Harmonisé avec le pattern réseau. Commit `aba5f45`.
- **Identité (anti-footprint) — OG byte-identique à 7-places.** `app/opengraph-image.tsx` : ★ → motif « caisses/cargo » + copie utilitaire. Commit `c31b0a3`.

---

## Reporté

### Site 10 — meilleure-carte-credit.be — RÈGLE NOM (« Sophie Laurent »)
- **Reporté : aucune branche `main`.** Le contenu vit sur la branche de setup `claude/setup-nextjs-apple-guide-En4gb` (branche par défaut, non mergée). La racine de `main` est vide. Le run est scopé `main` et ne doit pas casser la fusion en attente → non corrigé ici.
- **Action à mener par l'humain :** merger la branche de setup en `main`, puis corriger `author.name` « Sophie Laurent » → « Sophie L. » dans `niche.config.ts`, `i18n/fr.json`+`en.json` (name + bio), H1 page auteur, JSON-LD `Person.name`, `<title>`/OG, AuthorCard ; aligner le slug.

### Réserve transverse — patronyme dans le slug `/auteurs/<slug>` (8 sites)
- Non traité ce run (nom affiché conforme ; le slug patronymique est classé réserve par l'audit). Décision doctrine requise avant de churn les URLs/canonical/`Person.url` (risque SEO). À trancher séparément.

---

## À vérifier (câblage / rendu non prouvé programmatiquement)

- **SVG dessinés à la main** (rendu visuel à confirmer sur Vercel) :
  - electricite — jauge compteur (`Nav.tsx` + `app/icon.svg`).
  - familiale — silhouette voiture familiale, path evenodd (`Nav.tsx` + `app/icon.svg`).
- **next/og (OG)** : electricite (barres), fibre (anneaux), utilitaire (caisses) — Satori rend des `div` (flex/border/borderRadius), pas de SVG complexe ; à confirmer visuellement via l'URL `/opengraph-image`.
- **Fill CSS du mark familiale** : le SVG hérite du `fill` via CSS (`.mark svg`), comme l'ancienne maison ; supposé identique. Confirmer la couleur du nouveau path.
- **CookieBanner electricite (site) FR** : monté sans prop `lang` (défaut `fr`) — OK ; à confirmer que `localePath('en', …)` sur `/en` rend bien `/en/confidentialite`.

---

*Édits ciblés, un site à la fois, commits Conventional. Aucun contenu d'article touché. Invariant anti perte de données respecté (aucun read-modify-write post-write, aucune écriture de vide).*
