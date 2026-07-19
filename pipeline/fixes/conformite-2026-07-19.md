# Journal des corrections — CONFORMITÉ & IDENTITÉ — 2026-07-19

**Domaine :** Légal/RGPD · Identité · Auteur/E-E-A-T
**Source (to-do) :** `pipeline/audits/conformite-LATEST.md` (audit du 2026-07-19)
**Doctrine appliquée :** `skills/emd-fix/SKILL.md` (v1.6.1) + `skills/humaniser-fr/SKILL.md`
**Périmètre :** exactement les 2 sites du rapport (nouveaux ≤14j) — aucun re-scan du parc.
**Branche :** `main` (redéploiement Vercel automatique).

---

## meilleur-abonnement-5g.be

### ✅ Corrigé — [IMPORTANT · RGPD] Bandeau cookies bilingue FR + EN
- **Problème (audit) :** `CookieBanner.tsx` avait un texte codé en dur en **français uniquement**. Sur les pages `/en`, le visiteur voyait un bandeau français. La doctrine exige FR + EN.
- **Cause racine :** le bandeau est monté dans le **layout racine** (`app/layout.tsx` → `ConsentGate` → `CookieBanner`), lequel n'est pas conscient de la locale.
- **Correctif (source réellement rendue) :** détection de locale depuis l'URL (préfixe `/en`) via `usePathname()` dans le composant client ; ajout des strings **EN** (paragraphe, `aria-label`, boutons *Decline/Accept*). Lien politique mappé par locale : `/confidentialite` (FR) → `/en/privacy` (EN).
- **Idempotence / anti-casse :** exports préservés (`CONSENT_KEY`, `readConsent`, `Consent`, `CookieBanner`) ; signature `{ onChange }` inchangée — `ConsentGate` continue de le consommer à l'identique ; aucun tracker avant consentement (inchangé).
- **Câblage vérifié :** `app/layout.tsx` → `<ConsentGate />` → `<CookieBanner onChange={…} />`. C'est bien le composant rendu.
- **Commit :** `7d1b7dd` — `fix(rgpd): bandeau cookies bilingue FR+EN`.

### ✅ Corrigé — [MINEUR · footprint] Composition OG diversifiée
- **Problème (audit) :** les deux `opengraph-image.tsx` du périmètre partageaient **exactement la même composition** (barre d'accent horizontale en haut + eyebrow `DOMAIN · année` + watermark ★ en bas-droite) ; seules palette et tagline changeaient → motif reconnaissable inter-sites.
- **Correctif :** sur ce site, **rail d'accent vertical à gauche** + **watermark de marque « 5G »** en haut à droite (signature propre au site). Palette, tagline et wiring `app/opengraph-image.tsx` inchangés. quel-fournisseur-energie.be conservé comme composition de référence → la paire n'est plus identique.
- **Commit :** `e719013` — `refactor(og): diversifier la composition OG`.

### Identité / Légal / Auteur — déjà conformes (idempotent, non touché)
- Favicon `app/icon.svg`, logo `BrandMark` SVG inline unique dans `Nav.tsx`, pages légales remplies + noindex + société exacte (MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne), auteur **Bastien** (prénom seul, bio E-E-A-T FR, page auteur + JSON-LD Person). Rien à corriger.
- Aucun article publié (`_example.mdx` vide) → rien à ré-attribuer.

---

## quel-fournisseur-energie.be

### ✅ Corrigé — [MINEUR · RGPD] Locale câblée au bandeau cookies (+ lien EN)
- **Problème (audit) :** bandeau monté sans prop `locale` → figé sur `defaultLocale` (**FR**) même sur `/en`, alors que les strings EN existaient déjà dans le composant.
- **Correctif (source réellement rendue) :** détection de locale depuis l'URL (préfixe `/en`) via `usePathname()` ; une prop `locale` explicite reste prioritaire. **Bug latent corrigé au passage :** le lien EN utilisait `localePath(locale, '/confidentialite')` → `/en/confidentialite` (**404**) ; désormais mappé sur la route réelle `/en/privacy`.
- **Idempotence / anti-casse :** unique consommateur = `app/layout.tsx` (`<CookieBanner />` sans prop) ; nouvelle signature `{ locale }: {…} = {}` gère l'absence de prop ; imports `niche`/`localePath` retirés (plus référencés dans le fichier) → pas d'import mort.
- **Câblage vérifié :** `app/layout.tsx` monte `<CookieBanner />` ; `<Analytics />` toujours gaté par `choice === 'granted'`.
- **Commit :** `c217b47` — `fix(rgpd): câbler la locale au bandeau cookies + corriger le lien EN`.

### Identité / Légal / Auteur — déjà conformes (idempotent, non touché)
- Favicon `app/icon.svg` (« Q » serif), logo `BrandMark` SVG inline unique (flamme + anneau), pages légales remplies + noindex + société exacte, auteur **Camille** (prénom seul, bio E-E-A-T FR, page auteur + JSON-LD Person). Rien à corriger.
- Aucun article publié → rien à ré-attribuer.

---

## Reporté (au prochain run, avec raison)

- **[MINEUR · légal] quel-fournisseur-energie.be — page CGU distincte.** Non bloquant. Créer une CGU exige de rédiger des conditions réelles propres au site (via `humaniser-fr`, anti-footprint) ; hors du strict périmètre RGPD/identité de ce run. À traiter comme chantier de contenu dédié.
- **[SUIVI] les 2 sites — articles.** Aucun article publié (`_example.mdx` vide) : au premier contenu, re-vérifier `author` en frontmatter (prénom seul) et le JSON-LD `Person` par article.

## À vérifier (câblage prouvé par lecture, rendu à confirmer au déploiement)

- Les 3 correctifs modifient la **source réellement rendue** (composants montés dans le layout / route OG standard Next). Build non exécuté ici : confirmer au déploiement Vercel que (1) le bandeau `/en` s'affiche bien en anglais sur les 2 sites, (2) le lien « Privacy policy » pointe vers `/en/privacy`, (3) l'OG 5G rend le rail vertical + watermark « 5G ».

---

*Rien d'écrasé, aucun contenu réduit à un stub, aucune perte de données. Périmètre respecté : uniquement les 2 sites du rapport.*
