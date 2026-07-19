# Audit CONFORMITÉ & IDENTITÉ — 2026-07-19

**Domaine d'audit :** conformité & identité (Légal/RGPD · Identité · Auteur/E-E-A-T)
**Mode :** LECTURE SEULE sur les sites — rendu réel audité (SVG inline, montage layout, sources servies).
**Périmètre (restreint ≤14j, non déjà audité par ce domaine) :**

| Site | Provisionné | Statut périmètre |
|---|---|---|
| quel-fournisseur-energie.be | 2026-07-13 | ✅ audité (nouveau) |
| meilleur-abonnement-5g.be | 2026-07-17 | ✅ audité (nouveau) |
| simulateur-assurance-auto.be | 2026-07-10 | ⏭️ exclu — déjà au ledger (2026-07-13) |

Aucun re-scan du parc. 2 sites dans le périmètre.

---

## Scorecard

| Site | Légal & RGPD | Identité | Auteur / E-E-A-T | Nom de famille auteur |
|---|:---:|:---:|:---:|:---:|
| quel-fournisseur-energie.be | ✅ | ✅ | ✅ | Aucun (Camille) |
| meilleur-abonnement-5g.be | ⚠️ | ✅ | ✅ | Aucun (Bastien) |

Légende : ✅ conforme · ⚠️ écart important · ❌ bloquant.

---

## Détail par site

### quel-fournisseur-energie.be — ✅ conforme (1 point mineur)

**Légal & RGPD — ✅**
- Mentions légales : remplies, aucun placeholder `[À compléter]`, `robots: { index:false, follow:false }` (noindex) ✓.
- Confidentialité : remplie, noindex ✓.
- Infos société exactes : MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique ✓.
- Bandeau cookies : `CookieBanner` **réellement monté** dans `app/layout.tsx` (racine) ✓ ; léger/discret ✓ ; **Accepter / Refuser** de poids équivalent ✓ ; lien vers la politique ✓ ; **aucun tracker avant consentement** (`<Analytics />` monté uniquement si `choice === 'granted'`) ✓ ; **strings FR + EN présents** dans le composant ✓.
- ⚠️ *mineur* : le bandeau est monté sans prop `locale` → il **retombe sur `defaultLocale` (FR)** même sur les pages `/en`. Le composant sait rendre l'EN, mais il n'est pas câblé à la locale. À corriger pour un vrai bilingue du bandeau.
- *mineur* : pas de page CGU distincte (uniquement mentions-légales + confidentialité).

**Identité — ✅**
- Favicon réellement servi : `app/icon.svg` (lettre « Q » serif brique-prune sur crème) ✓.
- Logo réellement rendu **unique** : `BrandMark` **SVG inline** dans `Nav.tsx` (anneau de bascule + flamme), tinté `var(--accent-1)`. **Pas l'éclair réseau générique** ✓. Même mark repris dans le `Footer.tsx`.
- OG unique via `app/opengraph-image.tsx`, couleurs = `niche.palette` du site (crème/brique) ✓.

**Auteur / E-E-A-T — ✅**
- Auteur identifié : **Camille** — pas de « la rédaction », pas de champ vide ✓.
- Règle NOM : **prénom seul, aucun nom de famille** — conforme en `niche.config.author.name`, page `/auteurs/camille`, JSON-LD `Person.name` ✓.
- Bio E-E-A-T crédible (analyste marché énergie BE, ~10 ans, méthode CREG/CWaPE/VREG/Brugel) ✓.
- Page auteur `/auteurs/[slug]` présente + **JSON-LD `Person`** (name, jobTitle, description, worksFor) ✓.
- Auteur unique au site (≠ Bastien) ✓.
- Articles publiés : aucun encore (`_example.mdx` vide) → rien à flagger côté frontmatter.

---

### meilleur-abonnement-5g.be — ⚠️ (bandeau cookies non bilingue)

**Légal & RGPD — ⚠️**
- Mentions légales : remplies, aucun placeholder, noindex ✓.
- Confidentialité : remplie, noindex ✓ ; **excellente** (décrit le comportement réel du consentement, adresse APD/GBA) ✓.
- Infos société exactes : MentionBox SRL · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne ✓.
- Bandeau cookies : monté via `ConsentGate` dans `app/layout.tsx` racine ✓ ; léger ✓ ; **Accepter / Refuser** de poids visuel équivalent ✓ ; lien politique ✓ ; **aucun tracker avant consentement** (`<Analytics />` seulement si `consent === 'granted'`) ✓.
- ⚠️ **IMPORTANT** : le composant `CookieBanner.tsx` a un **texte codé en dur en FRANÇAIS uniquement** — aucune variante EN (« On mesure l'audience… », boutons « Refuser » / « Accepter »). Sur les pages `/en`, le visiteur voit un bandeau **français**. La doctrine exige un bandeau **FR + EN**. Pages légales EN présentes (`app/en/legal-notice`, `app/en/privacy`), mais **le bandeau, lui, n'est pas traduit**.

**Identité — ✅**
- Favicon réellement servi : `app/icon.svg` (mark « signal » = 3 arcs de diffusion + base pleine, turquoise) ✓.
- Logo réellement rendu **unique** : `BrandMark` **SVG inline** dans `Nav.tsx`, **identique au favicon**, tinté `var(--accent-1)`. **Pas l'éclair générique** ✓. **Distinct** du mark de quel-fournisseur-energie.be ✓.
- OG unique via `app/opengraph-image.tsx`, couleurs = `niche.palette` (graphite froid + turquoise), tagline propre au site ✓.

**Auteur / E-E-A-T — ✅**
- Auteur identifié : **Bastien** — pas de « la rédaction » ✓.
- Règle NOM : **prénom seul, aucun nom de famille** — conforme en `niche.config.author.name`, page `/auteurs/bastien`, JSON-LD `Person.name` ✓.
- Bio E-E-A-T crédible (7 ans déploiement réseaux mobiles Wallonie/Bruxelles, méthode IBPT) ✓.
- Page auteur + **JSON-LD `Person`** ✓.
- Auteur unique au site (≠ Camille) ✓.
- Aucun article publié (`_example.mdx` vide) → rien à flagger côté frontmatter.

---

## Anti-footprint (dans le périmètre)

- **Logos** : marks bien distincts (flamme+anneau vs signal 3-arcs), chacun SVG inline unique et repris en favicon. ✅ Pas d'empreinte.
- **Auteurs** : Camille (énergie) vs Bastien (télécom) — noms, titres et bios totalement distincts. ✅
- **Palettes / DA** : crème éditorial (light) vs graphite-turquoise (dark) — divergence nette. ✅
- ⚠️ *mineur (à surveiller)* : les deux `opengraph-image.tsx` partagent **exactement la même composition** (barre d'accent en dégradé + eyebrow `DOMAIN · année` + tagline + **watermark étoile ★ opacity 0.05** en bas-droite). Seules la palette et la tagline changent. Ce n'est pas une image identique, mais la **mise en page OG est répétée** sur le réseau — motif reconnaissable inter-sites. À diversifier côté template si d'autres sites la reprennent.

---

## Top actions prioritaires

1. **[IMPORTANT — RGPD] meilleur-abonnement-5g.be** : rendre le **bandeau cookies bilingue** (FR + EN). Le `CookieBanner.tsx` est FR codé en dur ; ajouter la détection de locale + les strings EN (comme le fait le composant de quel-fournisseur-energie.be).
2. **[MINEUR — RGPD] quel-fournisseur-energie.be** : câbler la **locale au bandeau** monté en layout racine (aujourd'hui figé sur FR même sur `/en`, bien que les strings EN existent).
3. **[MINEUR — footprint] les deux sites** : diversifier la **composition de l'OG** (watermark ★ + eyebrow `DOMAIN · année` identiques) pour éviter une empreinte visuelle réseau.
4. **[MINEUR — légal] quel-fournisseur-energie.be** : envisager une page **CGU** distincte (aujourd'hui mentions-légales + confidentialité seulement).
5. **[SUIVI] les deux sites** : aucun article publié — au premier contenu, re-vérifier `author` en frontmatter (prénom seul) et le `JSON-LD Person` par article.

---

*Sites conformes sur l'essentiel identité + auteur + légal. Seul écart important : le bandeau cookies non bilingue de meilleur-abonnement-5g.be.*
