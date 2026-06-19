# Audit QA — DA · UX · Images · Responsive · A11y

**Date :** 2026-06-19 · **Mode :** lecture seule · **Doctrine :** `skills/emd-audit/SKILL.md` v1.5.0
**Périmètre :** 8 sites au statut *Live* / *Configuré* de `pipeline/sites.csv`
**Principe appliqué :** auditer le **rendu réel** (logo inline du `Nav.tsx`, `app/icon`, `app/opengraph-image`, tokens réellement servis), pas le fichier au bon nom.

> ⚠️ **Note méthodo** : `docs/DA-DIRECTIONS.md` est introuvable (ni dans `emd-methodo`, ni dans les repos de sites). La conformité « une des 5 directions » a donc été évaluée par la **cohérence palette+fonts+mode+forme** et le caractère **muté/unique** du skin, pas par correspondance nominale à une direction cataloguée. À recréer pour fiabiliser ce critère.

---

## 1. Scorecard

Légende : ✅ conforme · ⚠️ à surveiller · ❌ bloquant/flag fort

| Site | Statut | DA / Direction | Logo (mark inline) | Tokens / Palette | OG + Favicon | Images | Responsive | A11y / `lang` |
|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | ✅ « Auto Naval » muté | ❌ **éclair générique** | ⚠️ `globals.css` accents = défaut template | ⚠️ OG ✅ / **favicon non servi** | ✅ next/image | ✅ | ✅ `lang` dynamique |
| meilleur-suv.be | Live | ✅ « Carbone » au rendu / ❌ config désynchro | ✅ hexagone sur mesure | ⚠️ dark-only, `niche.config` = défaut | ✅ OG + icon.svg | ❌ blog ~vide (1 draft) | ✅ | ⚠️ `lang="fr"` figé (bilingue) |
| meilleure-voiture-familiale.be | Configuré | ✅ « Tribu » muté | ✅ maison sur mesure | ⚠️ `globals.css` accents = défaut template | ✅ OG + icon.svg | ❌ tous `.mdx` à 0 octet | ✅ | ⚠️ `lang="fr"` figé (bilingue) |
| meilleure-voiture-electrique | Live | ✅ bleu muté (build sur-mesure) | ✅ wordmark MVE | ✅ accents réécrits | ❌ **OG + icon = ancienne DA chaude** | ⚠️ pas de cover d'article | ✅ | ✅ `lang` dynamique (fr-BE/en-BE) |
| quel-operateur-choisir.be | Live | ✅ « Signal » muté | ✅ barres-signal sur mesure | ✅ via `overrides.css` | ✅ OG + icon.svg | ✅ featureImage + next/image | ✅ | ⚠️ `lang="fr"` figé (bilingue) |
| meilleur-fournisseur-energie-be | Live | ❌ **skin V1 défaut non muté** | ❌ **éclair générique** | ❌ palette = défaut `#3D5AFE` | ✅ OG / ⚠️ icon = éclair | ⚠️ cartes « related » en placeholder | ✅ | ⚠️ i18n incohérent (config FR vs LangSwitch EN) |
| meilleures-assurances-auto.be | Live | ✅ « Serenity » muté | ✅ bouclier sur mesure | ✅ accents réécrits, triple thème | ✅ OG + icon + apple-icon | ✅ cover + next/image | ✅ | ⚠️ `lang="fr"` figé (mono-locale, OK) |
| meilleure-carte-credit.be | Live | ✅ « Papier » muté | ✅ monogramme M sur mesure | ✅ accents réécrits | ❌ **OG = défaut template V1 néon** | ⚠️ contenu = `_example` draft | ✅ | ⚠️ `lang="fr"` figé (bilingue) |

**Scroll horizontal (320 / 375 / 768 / 1024 / 1440) :** aucun débordement détecté sur les 8 sites — `overflow-x: clip/auto`, `.table-scroll-wrap`, grids responsives et `img{max-width:100%}` présents partout. ✅

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleur-fournisseur-energie-be — *DA non assumée + logo éclair*
- **DA générique (bloquant)** : pas de `volteo.css` ni de bloc de surcharge ; `globals.css :root` conserve le **skin V1 « Électrique » par défaut** (`--primary: #3D5AFE`, vars `--elec/--gaz/--green/--water/--mobi` brutes). Palette **non mutée** — c'est exactement le « skin générique/brut » que la doctrine demande de flagger.
- **Logo = éclair réseau** : `Nav.tsx` rend `d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z"` — l'éclair par défaut. Repris à l'identique dans `app/icon.svg`.
- **i18n incohérent** : `niche.config.locales: ['fr']` mais `Nav` rend un `LangSwitch → EN` inconditionnel et un dossier `app/en` existe ; `lang="fr"` figé.
- **Images** ⚠️ : 20 articles réels avec `featureImage` `.webp` rendus en `next/image` ✅, mais les cartes « related » affichent un `<ImagePlaceholder>` rayé au lieu de la vraie cover.
- ✅ Bon : OG dynamique sur-mesure, fonts cohérentes (Bricolage/Hanken), responsive + reduced-motion solides.

### ❌ meilleure-voiture.be — *logo éclair + favicon non servi + split palette*
- **Logo = éclair réseau** : `Nav.tsx` rend l'éclair générique `M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z` (fill `var(--primary)` naval, mais **forme par défaut**). Contredit une DA « Auto Naval » par ailleurs soignée.
- **Favicon non servi** : `app/` ne contient ni `icon.svg`, ni `icon.png`, ni `favicon.ico` (seulement `opengraph-image.tsx`). Le favicon n'est donc pas rendu malgré une éventuelle présence dans `public/`.
- **Split-brain palette** ⚠️ : `volteo.css` reçoit bien la surcharge « Auto Naval » (`--primary #1C3FAA`) ✅, mais `app/globals.css :root`/`@theme` garde les **accents par défaut du template** (`#FF3D57` dark / `#C8001F` light). Les éléments pilotés par `--accent-*` (liens `prose-article`, lettrine, aurora, hero gradient) rendent donc en **rouge générique**, pas en naval.
- ✅ Bon : seule occurrence de `lang={locale}` **dynamique** parmi les sites V1 ; palette `niche.config` mutée et unique, author Julien Vanderhaeghe incarné, `signature.components` remplis, next/image, responsive/a11y OK.

### ❌ meilleure-carte-credit.be — *OG = template par défaut + lang figé + contenu vide*
- **OG footprint (bloquant)** : `app/opengraph-image.tsx` utilise encore le **template V1 par défaut** — fond `#0A0A0F`, accents néon `#FF3D57 / #7B61FF / #3DFFC0`, watermark `#FFD23F`. Totalement déconnecté de la DA « papier crème/rouge/vert » du site, et **réutilisable pour fingerprinter le générateur**.
- **`lang="fr"` figé** sur site bilingue (FR + `/en/`) → tout le sous-arbre `/en/` sert un `lang` erroné.
- **Contenu** ⚠️ : seulement `_example(.fr).mdx` en `draft`, `featureImage: ""` vide. Site Live mais non alimenté.
- ✅ Bon : palette papier mutée/unique (Fraunces + Inter Tight), monogramme « M » sur mesure (`M5 23 L5 9 …`) + favicon.ico + icon.svg, responsive/a11y robustes.

### ⚠️ meilleur-suv.be — *config désynchronisée du rendu + blog vide + lang figé*
- **`niche.config.ts` désynchronisé** : annonce `mode:'light'`, palette **défaut générique** (`#FF3D57…`), fonts Bricolage/Hanken, `signature.components: []` **vide**. Le rendu réel est en fait « Carbone » **dark**, cuivre `#E8A33D`, fonts Space Grotesk/Inter. `niche.config` n'est plus la source de vérité → risque de régression au prochain build piloté par config.
- **`lang="fr"` figé** (bilingue) ; **blog quasi vide** (1 `.mdx` `draft`, sans featured image).
- ✅ Bon : DA **rendue** mutée et unique (Carbone), logo **hexagone sur mesure** (`M12 2 L21 7 V17 L12 22 L3 17 V7 Z`), `volteo.css` + `globals.css` réécrits cohérents entre eux, OG + icon.svg, next/image partout, responsive/a11y OK. Bémol : dark-only contredit `mode:'light'` du config.

### ⚠️ meilleure-voiture-familiale.be — *Configuré : DA OK mais contenu inexistant*
- **Contenu** ❌ : tous les `.mdx` du blog sont à **0 octet** (blobs vides). Images d'article non vérifiables, aucun article rédigé.
- **`globals.css` accents = défaut template** (`#FF3D57` / `#C8001F`) non réécrits — même split-brain que `meilleure-voiture.be` (la DA visible repose sur `volteo.css`, correctement muté « Tribu »).
- **`lang="fr"` figé** (bilingue fr/en/nl) ; `signature.components: []` vide.
- ✅ Bon : palette mutée/unique (sapin-teal `#0E7C66`, ivoire `#F4F1EA`), logo **maison sur mesure** (`M12 3 L21 11 H18 V20 H6 V11 H3 Z`), fonts Fraunces/Mulish cohérentes, author Audrey Pirard incarnée, OG + icon.svg, responsive/a11y OK.

### ⚠️ meilleure-voiture-electrique — *DA sur-mesure soignée, mais OG/favicon obsolètes*
- **Architecture différente** : pas le template V1 (pas de `niche.config.ts`/`volteo.css`/`Nav.tsx`). Build Next.js App Router sur-mesure (`app/[locale]/`, `Header.tsx`).
- **OG + favicon désalignés** ❌ : `opengraph-image.tsx` (fond crème `#F8F5EF` + barre rouille `#C4390E`) et `app/icon.svg` (bronze `#C17E2A`) portent une **ancienne DA chaude abandonnée** ; le site live est bleu froid `#0F62E8` / `#F1F4F8`. Vignette sociale + favicon à réaligner.
- **Images** ⚠️ : pas de champ cover/featured dans les frontmatters — cartes blog **texte-only** (choix éditorial assumé, commenté dans le code). next/image sur le hero.
- ✅ Bon : palette bleue mutée+assumée (light + dark complet), fonts Fraunces/Jost/JetBrains distinctives, wordmark MVE (pas d'éclair), `lang` **dynamique** (fr-BE/en-BE), tables wrappées, reduced-motion. Aucune trace du skin `#3D5AFE`.

### ⚠️ quel-operateur-choisir.be — *DA propre, seul flag = lang figé*
- **`lang="fr"` figé** sur site bilingue fr/en (a11y/SEO mineur — à vérifier si un `app/en/layout.tsx` corrige).
- Surcharge palette dans `app/overrides.css` (et non `volteo.css`) — même rôle, valide.
- ✅ Bon : DA « Signal » mutée/unique (violet `#6D28D9`, ivoire `#F6F4EF`), logo **barres-signal sur mesure**, fonts Bricolage/Hanken, author Maxime Dubois, OG dynamique + icon.svg, `featureImage`+`cover` `.webp` en `next/image`, `overflow-x: clip`, tables `min-width:520` scrollables, reduced-motion ×2.

### ✅ meilleures-assurances-auto.be — *référence du réseau*
- DA « Serenity-Trust » entièrement distincte : palette émeraude-petrol mutée (`#0B6E59`, porcelaine `#EEF3F1`), fonts Outfit/IBM Plex, mark **bouclier+checkmark** sur mesure (`app/icon.svg` + `apple-icon.svg`), section inédite « bonus-malus », author Thomas Renard (ex-courtier FSMA).
- `globals.css` accents réécrits (zéro défaut), **triple thème** (media + data-theme light/dark), OG dynamique sur-mesure, `cover` `.webp` + next/image, responsive/a11y exemplaires.
- Seul micro-flag : `lang="fr"` figé — **acceptable** car mono-locale (`locales: ['fr']`), et `LangSwitcher` retourne `null` proprement.

---

## 3. Anti-footprint inter-sites

| # | Paire / motif | Type | Sévérité |
|---|---|---|---|
| 1 | **meilleure-voiture.be ↔ meilleur-fournisseur-energie-be** | **Logo éclair inline IDENTIQUE** (`M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z`), repris aussi dans l'`icon.svg` de l'énergie | ❌ Fort |
| 2 | **meilleure-voiture.be ↔ meilleure-voiture-familiale.be** | **Accents `globals.css` par défaut identiques** (`#FF3D57` dark / `#C8001F` light) → même rendu générique dans les corps d'articles (liens, lettrine, aurora) | ⚠️ Moyen |
| 3 | **meilleure-carte-credit.be (OG) + meilleure-voiture.be (globals)** | Réutilisation de la **palette néon du générateur par défaut** (`#FF3D57 / #FFD23F / #3DFFC0 / #7B61FF`) — signature fingerprintable du template non personnalisé | ❌ Fort |
| 4 | Fonts **Bricolage Grotesque + Hanken Grotesk** partagées (suv-config, quel-operateur, énergie) | Même couple typo, mais rendus/palettes différents → footprint **faible** tant que la DA diverge | ⚠️ Faible |
| 5 | Vocabulaire de composants partagé (`CompareBar`, `Verdict`, `StatRow`) | Attendu (moteur commun) — non flaggé tant que palette/logo/OG diffèrent | ℹ️ Info |

**Auteurs :** ✅ aucun doublon — chaque site a un auteur unique et incarné (Julien Vanderhaeghe, Maxime Delvaux, Audrey Pirard, Christophe F., Maxime Dubois, Camille Mertens, Thomas Renard, Sophie Laurent).

---

## 4. Top des actions prioritaires

1. **❌ meilleur-fournisseur-energie-be — assumer une DA.** Muter la palette hors du défaut `#3D5AFE` (skin V1 « Électrique ») et remplacer l'éclair générique par un mark énergie sur mesure dans `Nav.tsx` + `app/icon.svg`. C'est le seul site **sans direction DA assumée**.
2. **❌ Éradiquer l'éclair réseau partagé.** Remplacer le logo inline `M13 2 4.5 13.5…` sur **meilleure-voiture.be** et **meilleur-fournisseur-energie-be** par des marks distincts (paire footprint n°1).
3. **❌ Réaligner les OG/favicons sur la DA réelle.** `opengraph-image.tsx` de **meilleure-carte-credit.be** (néon V1 par défaut) et l'OG + `icon.svg` de **meilleure-voiture-electrique** (palette rouille obsolète) ne reflètent pas le site rendu.
4. **⚠️ Réécrire les accents `globals.css`** sur **meilleure-voiture.be** et **meilleure-voiture-familiale.be** depuis `niche.config.palette` (aujourd'hui figés sur `#FF3D57`/`#C8001F`) pour supprimer le split-brain et le footprint n°2 ; et **resynchroniser `niche.config.ts` de meilleur-suv.be** avec son rendu réel (Carbone/dark).
5. **⚠️ Rendre `<html lang>` dynamique** sur les sites **bilingues** servant `lang="fr"` en dur : meilleur-suv.be, meilleure-voiture-familiale.be, quel-operateur-choisir.be, meilleure-carte-credit.be. **Servir un favicon** via `app/icon.svg` sur meilleure-voiture.be. *(Hors-scope mais relevé : blogs vides sur meilleur-suv.be, familiale et carte-credit — à alimenter.)*

---

*Audit DA/UX/Images/Responsive/A11y généré automatiquement (tâche planifiée `emd-audit-ux`). Lecture seule : aucun repo de site modifié.*
