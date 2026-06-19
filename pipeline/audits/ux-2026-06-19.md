# Audit QA — DA · UX · Images · Responsive · A11y

**Date :** 2026-06-19 · **Mode :** lecture seule · **Doctrine :** `skills/emd-audit/SKILL.md` v1.5.0
**Périmètre :** 8 sites au statut *Live* / *Configuré* de `pipeline/sites.csv`
**Principe appliqué :** auditer le **rendu réel** (logo inline du `Nav.tsx`, `app/icon`, `app/opengraph-image`, tokens réellement servis), pas le fichier au bon nom.

> 🔧 **Révision 2026-06-19 (post-revue propriétaire)** : le verdict « zéro scroll horizontal » de la 1ʳᵉ passe était **faux**. Après re-vérification du code, un **bug de scroll horizontal de la barre de navigation** est confirmé sur `meilleure-voiture.be`, `meilleur-suv.be`, `meilleure-voiture-familiale.be` et `meilleure-voiture-electrique`. Voir §1.bis. Scorecard, détail et actions mis à jour en conséquence.

> ⚠️ **Note méthodo** : `docs/DA-DIRECTIONS.md` est introuvable (ni dans `emd-methodo`, ni dans les repos de sites). La conformité « une des 5 directions » a donc été évaluée par la **cohérence palette+fonts+mode+forme** et le caractère **muté/unique** du skin, pas par correspondance nominale à une direction cataloguée. À recréer pour fiabiliser ce critère.

---

## 1. Scorecard

Légende : ✅ conforme · ⚠️ à surveiller · ❌ bloquant/flag fort

| Site | Statut | DA / Direction | Logo (mark inline) | Tokens / Palette | OG + Favicon | Images | Responsive | A11y / `lang` |
|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | ✅ « Auto Naval » muté | ❌ **éclair générique** | ⚠️ `globals.css` accents = défaut template | ⚠️ OG ✅ / **favicon non servi** | ✅ next/image | ❌ **scroll horizontal nav (mobile)** | ✅ `lang` dynamique |
| meilleur-suv.be | Live | ✅ « Carbone » au rendu / ❌ config désynchro | ✅ hexagone sur mesure | ⚠️ dark-only, `niche.config` = défaut | ✅ OG + icon.svg | ❌ blog ~vide (1 draft) | ❌ **scroll horizontal nav (mobile)** | ⚠️ `lang="fr"` figé (bilingue) |
| meilleure-voiture-familiale.be | Configuré | ✅ « Tribu » muté | ✅ maison sur mesure | ⚠️ `globals.css` accents = défaut template | ✅ OG + icon.svg | ❌ tous `.mdx` à 0 octet | ❌ **scroll horizontal nav (mobile)** | ⚠️ `lang="fr"` figé (bilingue) |
| meilleure-voiture-electrique | Live | ✅ bleu muté (build sur-mesure) | ✅ wordmark MVE | ✅ accents réécrits | ❌ **OG + icon = ancienne DA chaude** | ⚠️ pas de cover d'article | ❌ **scroll horizontal nav (768–900px)** | ✅ `lang` dynamique (fr-BE/en-BE) |
| quel-operateur-choisir.be | Live | ✅ « Signal » muté | ✅ barres-signal sur mesure | ✅ via `overrides.css` | ✅ OG + icon.svg | ✅ featureImage + next/image | ✅ (garde `overflow-x: clip`) | ⚠️ `lang="fr"` figé (bilingue) |
| meilleur-fournisseur-energie-be | Live | ❌ **skin V1 défaut non muté** | ❌ **éclair générique** | ❌ palette = défaut `#3D5AFE` | ✅ OG / ⚠️ icon = éclair | ⚠️ cartes « related » en placeholder | ✅ (garde `overflow-x: clip`) | ⚠️ i18n incohérent (config FR vs LangSwitch EN) |
| meilleures-assurances-auto.be | Live | ✅ « Serenity » muté | ✅ bouclier sur mesure | ✅ accents réécrits, triple thème | ✅ OG + icon + apple-icon | ✅ cover + next/image | ✅ | ⚠️ `lang="fr"` figé (mono-locale, OK) |
| meilleure-carte-credit.be | Live | ✅ « Papier » muté | ✅ monogramme M sur mesure | ✅ accents réécrits | ❌ **OG = défaut template V1 néon** | ⚠️ contenu = `_example` draft | ✅ (garde `overflow-x: clip`) | ⚠️ `lang="fr"` figé (bilingue) |

---

## 1.bis. Responsive — bug de scroll horizontal de la barre de nav (confirmé)

**Symptôme :** scroll horizontal de la page sur mobile (et tablette), barre de nav trop large (logo + menu/CTA qui débordent).

### Template V1 « auto » — `meilleure-voiture.be`, `meilleur-suv.be`, `meilleure-voiture-familiale.be`
Code de nav **identique** sur ces trois sites (`components/layout/Nav.tsx` + `app/styles/volteo.css`).
- Dans `Nav.tsx`, le cluster CTA est rendu en **inline style** : `<div className="nav-cta" style={{ display: 'flex', … }}>` (LangSwitcher + bouton pilule « Comparer », ce dernier en `white-space: nowrap`).
- La seule media query mobile de `volteo.css` est :
  ```css
  @media (max-width: 940px) {
    .nav-links { display: none; }
    .nav-burger { display: block; }
  }
  ```
  → elle masque **uniquement** `.nav-links`. **`.nav-cta` n'est jamais masqué** ; et même une règle `.nav-cta{display:none}` serait sans effet car le `display:flex` **inline** du composant l'emporte sur la feuille de style.
- Résultat sur 320–375px : la rangée = `.logo` (mark 32px + nom du site à 22px/800, sans troncature/wrap) **+ LangSwitcher + bouton « Comparer » (nowrap) + burger**, séparés par `gap: 32px`. La somme dépasse la largeur du viewport.
- **Aucun garde** `html, body { overflow-x: clip }` dans `globals.css`/`volteo.css` de ces sites → le débordement devient un **scroll horizontal réel de la page**.
- **Correctifs possibles :** (a) retirer le `display:flex` inline de `.nav-cta` et le masquer en CSS sous 940px (le CTA + la langue sont déjà repris dans `.mobile-menu`) ; (b) ajouter `html,body{overflow-x:clip}` comme filet ; (c) réduire le logo et autoriser le wrap/troncature du nom.

### Build sur-mesure — `meilleure-voiture-electrique`
- Le header `.hdr` (`components/layout/Header.tsx`) ne bascule en burger qu'à **≤767px** :
  ```css
  @media (max-width: 767px) { .hdr-nav { display: none; } .hdr-right { display: none; } }
  ```
- Mais la rangée desktop complète (`.hdr-logo` + 5 liens « Modèles A–Z / Comparateur / Classements / Simulateurs / Blog » + LanguageSwitcher + CTA « Comparer → ») représente **~900px de contenu**, sans `flex-wrap`.
- Donc dans la bande **768–~900px** (iPad portrait, petits laptops), le menu desktop **déborde** ; et là aussi **aucun** `overflow-x: clip` sur `body` → scroll horizontal. (Le `.hero-halo-da` de 900px est, lui, correctement clippé par `.hero { overflow: hidden }` — ce n'est pas la cause.)
- **Correctif :** remonter le breakpoint burger (p. ex. `≤1024px` ou `≤900px`) pour que le menu se replie avant de déborder, + filet `overflow-x: clip`.

### Pourquoi les autres sites passent
`quel-operateur-choisir.be`, `meilleur-fournisseur-energie-be` et `meilleure-carte-credit.be` embarquent un **garde `html, body { overflow-x: clip; max-width: 100% }`** (dans `app/overrides.css` / `globals.css`) qui neutralise tout débordement résiduel. C'est précisément ce filet qui **manque** aux 3 sites « auto » V1 et au build électrique.

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleur-fournisseur-energie-be — *DA non assumée + logo éclair*
- **DA générique (bloquant)** : pas de `volteo.css` ni de bloc de surcharge ; `globals.css :root` conserve le **skin V1 « Électrique » par défaut** (`--primary: #3D5AFE`, vars `--elec/--gaz/--green/--water/--mobi` brutes). Palette **non mutée** — exactement le « skin générique/brut » que la doctrine demande de flagger.
- **Logo = éclair réseau** : `Nav.tsx` rend `d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z"` — l'éclair par défaut. Repris à l'identique dans `app/icon.svg`.
- **i18n incohérent** : `niche.config.locales: ['fr']` mais `Nav` rend un `LangSwitch → EN` inconditionnel et un dossier `app/en` existe ; `lang="fr"` figé.
- **Images** ⚠️ : 20 articles réels avec `featureImage` `.webp` en `next/image` ✅, mais les cartes « related » affichent un `<ImagePlaceholder>` rayé au lieu de la vraie cover.
- ✅ Responsive : garde `overflow-x: clip`, tables wrappées, reduced-motion — pas de scroll horizontal.

### ❌ meilleure-voiture.be — *scroll horizontal nav + logo éclair + favicon non servi + split palette*
- **Responsive (bloquant)** : scroll horizontal sur mobile — `.nav-cta` (LangSwitcher + « Comparer ») en `display:flex` inline jamais masqué + pas de garde `overflow-x`. Cf. §1.bis.
- **Logo = éclair réseau** : `Nav.tsx` rend l'éclair générique `M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z` (fill naval, mais **forme par défaut**). Contredit une DA « Auto Naval » par ailleurs soignée.
- **Favicon non servi** : `app/` ne contient ni `icon.svg`, ni `icon.png`, ni `favicon.ico` (seulement `opengraph-image.tsx`).
- **Split-brain palette** ⚠️ : `volteo.css` reçoit la surcharge « Auto Naval » (`--primary #1C3FAA`) ✅, mais `globals.css :root`/`@theme` garde les **accents par défaut** (`#FF3D57` dark / `#C8001F` light) → liens `prose-article`, lettrine, aurora rendent en rouge générique.
- ✅ Bon : seule occurrence de `lang={locale}` **dynamique** parmi les sites V1 ; palette `niche.config` mutée, author Julien Vanderhaeghe, `signature.components` remplis, next/image.

### ❌ meilleure-carte-credit.be — *OG = template par défaut + lang figé + contenu vide*
- **OG footprint (bloquant)** : `app/opengraph-image.tsx` = **template V1 par défaut** (fond `#0A0A0F`, néon `#FF3D57 / #7B61FF / #3DFFC0`, watermark `#FFD23F`). Déconnecté de la DA « papier » et **fingerprintable**.
- **`lang="fr"` figé** sur site bilingue (FR + `/en/`).
- **Contenu** ⚠️ : seulement `_example(.fr).mdx` `draft`, `featureImage: ""` vide.
- ✅ Responsive : garde `overflow-x: clip`, tables scrollables. Palette papier mutée, monogramme « M » sur mesure, favicon.ico + icon.svg.

### ❌ meilleure-voiture-familiale.be — *scroll horizontal nav + contenu inexistant*
- **Responsive (bloquant)** : même code nav que `meilleure-voiture.be` → scroll horizontal mobile (`.nav-cta` inline non masqué, pas de garde `overflow-x`). Cf. §1.bis.
- **Contenu** ❌ : tous les `.mdx` du blog à **0 octet** (blobs vides). Aucun article rédigé.
- **`globals.css` accents = défaut template** (`#FF3D57`/`#C8001F`) non réécrits (split-brain ; DA visible portée par `volteo.css` muté « Tribu »).
- **`lang="fr"` figé** (bilingue) ; `signature.components: []` vide.
- ✅ Bon : palette mutée (sapin-teal `#0E7C66`, ivoire `#F4F1EA`), logo **maison sur mesure** (`M12 3 L21 11 H18 V20 H6 V11 H3 Z`), fonts Fraunces/Mulish, author Audrey Pirard, OG + icon.svg.

### ❌ meilleur-suv.be — *scroll horizontal nav + config désynchronisée + blog vide*
- **Responsive (bloquant)** : même code nav → scroll horizontal mobile (`.nav-cta` inline non masqué, pas de garde `overflow-x`). Cf. §1.bis.
- **`niche.config.ts` désynchronisé** : annonce `mode:'light'`, palette **défaut générique** (`#FF3D57…`), fonts Bricolage/Hanken, `signature.components: []` **vide** — alors que le rendu réel est « Carbone » **dark**, cuivre `#E8A33D`, Space Grotesk/Inter. `niche.config` n'est plus la source de vérité.
- **`lang="fr"` figé** (bilingue) ; **blog quasi vide** (1 `.mdx` `draft`, sans featured).
- ✅ Bon : DA rendue mutée (Carbone), logo **hexagone sur mesure** (`M12 2 L21 7 V17 L12 22 L3 17 V7 Z`), `volteo.css` + `globals.css` réécrits cohérents, OG + icon.svg, next/image. Bémol : dark-only contredit `mode:'light'`.

### ❌ meilleure-voiture-electrique — *scroll horizontal nav (768–900px) + OG/favicon obsolètes*
- **Responsive (bloquant)** : header `.hdr` ne se replie en burger qu'à ≤767px alors que la rangée desktop ≈ 900px → débordement 768–~900px, sans garde `overflow-x`. Cf. §1.bis.
- **Architecture différente** : pas le template V1 (pas de `niche.config.ts`/`volteo.css`/`Nav.tsx`). Build Next.js App Router sur-mesure (`app/[locale]/`, `Header.tsx` + `MobileNav.tsx`).
- **OG + favicon désalignés** ❌ : `opengraph-image.tsx` (crème `#F8F5EF` + rouille `#C4390E`) et `app/icon.svg` (bronze `#C17E2A`) portent une **ancienne DA chaude** ; le site live est bleu froid `#0F62E8` / `#F1F4F8`.
- **Images** ⚠️ : pas de cover/featured dans les frontmatters — cartes blog **texte-only** (choix éditorial assumé). next/image sur le hero.
- ✅ Bon : palette bleue mutée (light + dark), fonts Fraunces/Jost/JetBrains, wordmark MVE (pas d'éclair), `lang` **dynamique** (fr-BE/en-BE). Aucune trace du skin `#3D5AFE`.

### ⚠️ quel-operateur-choisir.be — *DA propre, seul flag = lang figé*
- **`lang="fr"` figé** sur site bilingue fr/en (a11y/SEO mineur).
- Surcharge palette dans `app/overrides.css` (et non `volteo.css`) — même rôle, valide.
- ✅ Bon : DA « Signal » mutée (violet `#6D28D9`, ivoire `#F6F4EF`), logo **barres-signal sur mesure**, fonts Bricolage/Hanken, author Maxime Dubois, OG dynamique + icon.svg, `featureImage`+`cover` `.webp` en `next/image`, **`overflow-x: clip`**, tables `min-width:520` scrollables, reduced-motion ×2.

### ✅ meilleures-assurances-auto.be — *référence du réseau*
- DA « Serenity-Trust » distincte : palette émeraude-petrol mutée (`#0B6E59`, porcelaine `#EEF3F1`), fonts Outfit/IBM Plex, mark **bouclier+checkmark** (`app/icon.svg` + `apple-icon.svg`), section inédite « bonus-malus », author Thomas Renard (ex-courtier FSMA).
- `globals.css` accents réécrits (zéro défaut), **triple thème** (media + data-theme), OG dynamique, `cover` `.webp` + next/image, responsive/a11y exemplaires.
- Micro-flag : `lang="fr"` figé — **acceptable** (mono-locale `['fr']`, `LangSwitcher` retourne `null`).

---

## 3. Anti-footprint inter-sites

| # | Paire / motif | Type | Sévérité |
|---|---|---|---|
| 1 | **meilleure-voiture.be ↔ meilleur-fournisseur-energie-be** | **Logo éclair inline IDENTIQUE** (`M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z`), repris aussi dans l'`icon.svg` de l'énergie | ❌ Fort |
| 2 | **meilleure-voiture.be ↔ meilleur-suv.be ↔ meilleure-voiture-familiale.be** | **Même `Nav.tsx` + `volteo.css`** → **même bug de scroll horizontal** (`.nav-cta` inline non masqué) ET même structure de barre | ❌ Fort (technique) |
| 3 | **meilleure-voiture.be ↔ meilleure-voiture-familiale.be** | **Accents `globals.css` par défaut identiques** (`#FF3D57` / `#C8001F`) → même rendu générique dans les corps d'articles | ⚠️ Moyen |
| 4 | **meilleure-carte-credit.be (OG) + meilleure-voiture.be (globals)** | Réutilisation de la **palette néon du générateur par défaut** (`#FF3D57 / #FFD23F / #3DFFC0 / #7B61FF`) | ❌ Fort |
| 5 | Fonts **Bricolage Grotesque + Hanken Grotesk** partagées (suv-config, quel-operateur, énergie) | Même couple typo, rendus/palettes différents → footprint faible | ⚠️ Faible |

**Auteurs :** ✅ aucun doublon — chaque site a un auteur unique et incarné (Julien Vanderhaeghe, Maxime Delvaux, Audrey Pirard, Christophe F., Maxime Dubois, Camille Mertens, Thomas Renard, Sophie Laurent).

---

## 4. Top des actions prioritaires

1. **❌ RESPONSIVE — corriger le scroll horizontal de la nav (bloquant mobile).**
   - Template V1 (`meilleure-voiture.be`, `meilleur-suv.be`, `meilleure-voiture-familiale.be`) : retirer le `display:flex` **inline** de `.nav-cta` dans `Nav.tsx` et le masquer en CSS sous 940px (CTA + langue déjà présents dans `.mobile-menu`).
   - `meilleure-voiture-electrique` : remonter le breakpoint burger (`≤1024`/`≤900px`) pour replier le menu avant qu'il ne déborde.
   - Filet commun : ajouter `html, body { overflow-x: clip; max-width: 100% }` sur les 4 sites (comme énergie/télécom/banque).
2. **❌ meilleur-fournisseur-energie-be — assumer une DA.** Muter la palette hors du défaut `#3D5AFE` et remplacer l'éclair générique par un mark énergie sur mesure (`Nav.tsx` + `app/icon.svg`). Seul site **sans direction DA assumée**.
3. **❌ Éradiquer l'éclair réseau partagé.** Remplacer le logo inline `M13 2 4.5 13.5…` sur **meilleure-voiture.be** et **meilleur-fournisseur-energie-be** (paire footprint n°1).
4. **❌ Réaligner les OG/favicons sur la DA réelle.** OG de **meilleure-carte-credit.be** (néon V1) et OG + `icon.svg` de **meilleure-voiture-electrique** (rouille obsolète).
5. **⚠️ Cohérence config & i18n.** Réécrire les accents `globals.css` depuis `niche.config.palette` (voiture.be, familiale) ; resynchroniser `niche.config.ts` de **meilleur-suv.be** avec son rendu (Carbone/dark) ; rendre `<html lang>` dynamique sur les bilingues à `lang="fr"` figé (suv, familiale, quel-operateur, carte-credit) ; servir un favicon via `app/icon.svg` sur **meilleure-voiture.be**. *(Hors-scope mais relevé : blogs vides sur suv, familiale, carte-credit.)*

---

*Audit DA/UX/Images/Responsive/A11y généré automatiquement (tâche planifiée `emd-audit-ux`), révisé après revue propriétaire. Lecture seule : aucun repo de site modifié.*
