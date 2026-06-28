# Audit QA — DA · UX · Images · Responsive · A11y

**Date :** 2026-06-28 · **Mode :** lecture seule · **Doctrine :** `skills/emd-audit/SKILL.md` v1.5.0
**Périmètre :** 11 sites au statut *Live* / *Configuré* de `pipeline/sites.csv`
**Principe appliqué :** auditer le **rendu réel** (logo SVG inline du `Nav.tsx`/`Header.tsx`, `app/icon`, `app/opengraph-image`, tokens réellement servis), pas le fichier au bon nom.

> ✅ **Progrès nets depuis la passe du 2026-06-19.** (1) **L'éclair réseau générique a disparu** : `meilleure-voiture.be` et `meilleur-fournisseur-energie-be` rendent désormais des marks sur mesure (voiture / flamme) — la paire footprint n°1 est résolue. (2) `meilleur-suv.be` a **patché son scroll horizontal** (`app/styles/volteo-overrides.css`, commentaire « FIX nav mobile audit ux 2026-06-19 »). (3) `meilleure-voiture-electrique` a **réparé le responsive** (burger ≤960px + garde `overflow-x:clip`), **réaligné son OG/favicon sur le bleu froid** et rendu `<html lang>` dynamique. (4) `meilleure-carte-credit.be` a **réaligné son OG** (papier, plus le néon V1) et rempli son contenu (12 articles). Le réseau est globalement plus propre ; les flags restants sont ciblés.

> ⚠️ **Note méthodo (inchangée).** `docs/DA-DIRECTIONS.md` reste **introuvable** (dossier `docs/` vide dans `emd-methodo`). La conformité « une des 5 directions » est donc évaluée par la **cohérence palette+fonts+mode+forme** et le caractère **muté/unique** du skin, pas par correspondance nominale. **Action méthodo : (re)créer `docs/DA-DIRECTIONS.md`** pour fiabiliser ce critère.

> ➕ **3 sites entrent au périmètre** depuis le 19/06 : `meilleure-voiture-utilitaire.be` (Live), `meilleure-voiture-7-places.be` (Live) et `meilleure-neobanque.be` (Configuré).

---

## 1. Scorecard

Légende : ✅ conforme · ⚠️ à surveiller · ❌ bloquant / flag fort

| Site | Statut | DA / Direction | Logo (mark inline) | Tokens / Palette | OG + Favicon | Images | Responsive | A11y / `lang` |
|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | ✅ « Auto Naval » muté | ✅ **mark voiture sur mesure** | ⚠️ `globals.css` néon défaut non muté (volteo surcharge) | ✅ OG niche + `icon.svg` | ✅ next/image, uniques | ❌ **scroll horizontal nav (confirmé 3/3)** | ✅ `lang` dynamique |
| meilleur-suv.be | Live | ✅ « Carbone » dark | ✅ hexagone sur mesure | ✅ muté partout | ✅ OG + `icon.svg` | ⚠️ 3 `.mdx` vides + 1 img in-body générique | ✅ **patché** (`volteo-overrides.css`) | ⚠️ `lang="fr"` figé (fix client) |
| meilleure-voiture-familiale.be | Live | ✅ « Tribu » (signature vide) | ✅ maison/toit sur mesure | ⚠️ `globals.css` néon + catégories désync | ⚠️ OK / **jpeg orphelin à la racine** | ✅ uniques + coverAlt | ❌ **scroll horizontal nav (probable)** | ✅ `lang` réécrit par script |
| meilleure-voiture-utilitaire.be | Live | ⚠️ « Graphite copper » (token leak) | ✅ van/fourgon sur mesure | ❌ **`globals` néon réimposé en dark** (≠ niche.config) | ⚠️ `icon.svg` OK / pas `.ico`/`.png` + **jpeg orphelin racine** | ✅ uniques | ⚠️ risque (manque `overflow-x:clip`) | ⚠️ `lang="fr"` figé |
| meilleure-voiture-7-places.be | Live | ⚠️ « Sable chaleureux » (token leak) | ✅ arche-famille sur mesure | ⚠️ `.news` rendue **verte hors DA** + radius soft/`sharp` incohérent | ⚠️ `icon.svg` OK / pas `.ico`/`.png` | ✅ uniques, next/image | ⚠️ risque (manque `overflow-x:clip`) | ❌ **`lang="fr"` figé sans fix** (sert `/en` en `fr`) |
| meilleure-voiture-electrique | Live | ✅ bleu froid (build sur-mesure) | ✅ wordmark typo MVE | ✅ mutés à la source | ✅ **OG bleu réaligné** + `icon.svg` | ⚠️ **couvertures non uniques** (1 cover partagée) | ✅ **fix ≤960px + clip** | ✅ `lang` dynamique (fr-BE/en-BE) |
| quel-operateur-choisir.be | Live | ✅ « Signal » violet | ✅ barres-signal sur mesure | ⚠️ skin indigo non muté (`globals`, masqué par `overrides.css`) | ⚠️ OG OK / **`icon.svg` teintes pastel divergentes** | ⚠️ `#FF3D57` en dur (`RecentArticles.tsx`) | ✅ `clip` + tables wrappées | ⚠️ `lang="fr"` figé (fix client) |
| meilleur-fournisseur-energie-be | Live | ✅ « Cuivre » (Énerwatt) | ✅ **flamme sur mesure** | ⚠️ `#3D5AFE`/`#CCFF48` dans `globals` (masqué par `overrides.css`) | ✅ **OG dynamique aligné** + `icon.svg` | ✅ 26 covers réelles + alt | ✅ `clip` + tables wrappées | ⚠️ `lang="fr"` figé (div `/en`) |
| meilleures-assurances-auto.be | Live | ✅ « Sérénité » émeraude | ✅ bouclier + check | ✅ muté | ✅ OG + `icon` + `apple-icon` | ✅ cover + next/image | ✅ | ✅ `lang="fr"` figé (mono-locale, OK) |
| meilleure-carte-credit.be | Live | ✅ « Éditorial papier » | ✅ monogramme « M » | ✅ muté (hex cohérents/intentionnels) | ✅ **OG papier réaligné** + `icon.svg` + `favicon.ico` | ✅ 12 articles réels | ✅ `clip` + tables | ✅ `lang` dynamique |
| meilleure-neobanque.be | Configuré | ❌ **skin néon défaut non muté + Space Grotesk (interdit réseau)** | ⚠️ **3 barres génériques** (≈ mark moteur Voltéo) | ❌ palette défaut + `globals @theme` valeurs littérales `#FF3D57…` | ✅ mécanique token-driven | ⚠️ 1 seul vrai article | ✅ patché (`volteo-overrides.css`) | ⚠️ `lang="fr"` figé (bilingue) |

---

## 1.bis. Responsive — état du scroll horizontal de la barre de nav

Rappel du bug (template V1 « auto ») : `.nav-cta` rendu en `display:flex` **inline** dans `Nav.tsx`, jamais masqué ; la seule media query mobile masque `.nav-links` mais **pas** `.nav-cta` ; et **aucun garde** `html,body{overflow-x:clip}`. Trois conditions réunies = scroll horizontal réel de la page sur mobile.

| Site (template V1) | `.nav-cta` masqué <940px ? | garde `overflow-x:clip` ? | Verdict |
|---|---|---|---|
| meilleur-suv.be | ✅ oui (`volteo-overrides.css`) | ✅ oui | ✅ **corrigé** |
| meilleure-voiture.be | ❌ non (flex inline) | ❌ non | ❌ **scroll horizontal confirmé (3/3)** |
| meilleure-voiture-familiale.be | ❌ non (flex inline) | ❌ non | ❌ **probable** (mêmes conditions) |
| meilleure-voiture-utilitaire.be | ✅ oui (media query masque `.nav-cta`) | ❌ non | ⚠️ risque résiduel (1/3) |
| meilleure-voiture-7-places.be | ✅ oui (media query masque `.nav-cta`) | ❌ non | ⚠️ risque résiduel (1/3) |

**Build sur-mesure `meilleure-voiture-electrique` :** ✅ corrigé — burger remonté à **≤960px** (`app/responsive-fix.css`) + garde `html,body{overflow-x:clip;max-width:100%}`. (Réserve cosmétique : `MobileNav.tsx` ferme le drawer à `min-width:768px`, léger désaccord avec le breakpoint CSS 960px, non bloquant.)

**Le fix de référence existe déjà** (suv) : retirer/masquer le `.nav-cta` inline sous 940px + ajouter le garde `overflow-x:clip`. Il suffit de le **propager** à `meilleure-voiture.be` et `meilleure-voiture-familiale.be` (bloquants) et d'ajouter le **filet `overflow-x:clip`** à utilitaire + 7-places.

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleure-neobanque.be (Configuré) — *seul site sans direction DA assumée*
- **DA non mutée (bloquant)** : `niche.config.ts` porte la palette **néon « premium-dark-fintech » générique** (`#7B6CFF / #2FE6B0 / #5BB0FF / #FF9F6B / #C9A6FF` sur `bgPrimary #0B0F17`) et la fonte **Space Grotesk**, **explicitement interdite** par la signature réseau (cf. `forbidden` de `meilleure-voiture-electrique`). Pire : `app/globals.css @theme` garde encore les **valeurs template littérales** `#FF3D57/#FFD23F/#3DFFC0/#7B61FF` + `bg #0A0A0F`. Skin **brut, non dé-templatisé** = exactement ce que la doctrine demande de flagger.
- **Logo générique** ⚠️ : `Nav.tsx` rend **3 barres `<rect>`** ascendantes, identiques au `.logo .mark` du moteur Voltéo ; repris dans `app/icon.svg`. Pas un vrai mark sur mesure.
- **A11y** ⚠️ : `<html lang="fr" data-theme="dark">` **figé** alors que `locales:['fr','en']`.
- **Images** ⚠️ : un seul vrai article (`comparatifs/meilleures-neobanques-belgique-2026.mdx`, cover OK). L'article référence `/images/blog/category-comparatifs.webp` (seul `public/images/categories/comparatifs.webp` confirmé) → **risque d'image inline cassée à vérifier**. Site neuf, attendu.
- **Auteur** ⚠️ : `author.name = "Maxime"` (prénom seul) pour le slug `maxime-vanderlinden`.
- ✅ Responsive patché (`volteo-overrides.css`), OG token-driven, favicon servi.

### ❌ meilleure-voiture.be — *scroll horizontal nav (confirmé) + split-palette globals*
- **Responsive (bloquant)** : 3/3 — `.nav-cta` `display:flex` inline + media query qui ne masque que `.nav-links` + absence de garde `overflow-x:clip`. Scroll horizontal mobile **confirmé**.
- **Split-brain palette** ⚠️ : DA « Auto Naval » dans le 2ᵉ `:root` de `volteo.css` (`--primary:#1C3FAA`), mais `globals.css` garde les néons template `#FF3D57/#FFD23F/#3DFFC0/#7B61FF` (+ light `#C8001F`).
- ✅ **Progrès** : logo **mark voiture sur mesure** (plus d'éclair) ; OG palette niche ; `icon.svg` ; `lang` dynamique ; 22 visuels next/image.

### ❌ meilleure-voiture-utilitaire.be — *globals néon réimposé en dark*
- **Tokens (bloquant fonctionnel)** : `html[data-theme="dark"]` (mode du site) **réimpose** les néons template sur `--accent-*` → la palette copper de `niche.config` (`#E0913C`) ne s'applique pas au runtime.
- **Responsive** ⚠️ : `.nav-cta` masqué <940px mais **pas de garde** `overflow-x:clip`.
- **A11y** ⚠️ : `<html lang="fr">` figé alors que `/en` existe.
- **Résidus** : pas de `.ico`/`.png` ; **jpeg orphelin à la racine**.
- ✅ Logo van sur mesure ; OG palette site ; featureImages uniques, MDX pleins.

### ❌ meilleure-voiture-7-places.be — *`lang` figé sans fix + `.news` hors DA*
- **A11y (bloquant)** : `<html lang="fr">` figé bilingue **sans** fix script → `/en/*` servi en `fr`.
- **Tokens** ⚠️ : `volteo.css` garde des tokens « énergie » → `.news` **verte `#1AA35F`** hors palette ; incohérence radius soft vs `shape:'sharp'`.
- **Responsive** ⚠️ : `.nav-cta` masqué <940px mais pas de garde `overflow-x:clip`.
- ✅ Logo arche-famille sur mesure ; globals propre (palette Sable dédupliquée) ; 6 featureImages uniques.

### ❌ meilleure-voiture-familiale.be — *scroll horizontal nav (probable) + signature vide*
- **Responsive (probable)** : même `Nav.tsx`/`volteo.css` V1 que voiture.be → conditions du bug réunies.
- **Tokens** ⚠️ : `globals.css` néon template ; catégories `volteo.css` désync ; `niche.config.signature` **vide**.
- **Résidus** : **jpeg orphelin à la racine** ; asset stock résiduel.
- ✅ Logo maison/toit sur mesure ; OG terracotta + `icon.svg` ; featureImages uniques + coverAlt ; `lang` réécrit par script.

### ⚠️ meilleur-suv.be — *responsive patché ; reste blog vide + lang*
- **Images** ⚠️ : 3 `.mdx` vides (`draft:true`) ; 1 img in-body générique.
- **A11y** ⚠️ : `lang="fr"` figé (fix client).
- ✅ **Responsive corrigé** ; DA Carbone mutée ; logo hexagone ; OG + `icon.svg`.

### ⚠️ quel-operateur-choisir.be — *DA propre, 3 micro-flags*
- **Favicon** ⚠️ : `icon.svg` teintes **pastel** divergentes des hex du logo/OG.
- **Tokens** ⚠️ : skin indigo non muté dans `globals`, neutralisé par `overrides.css`.
- **Images** ⚠️ : `#FF3D57` en dur dans `RecentArticles.tsx`.
- **A11y** ⚠️ : `lang="fr"` figé (fix client).
- ✅ Logo barres-signal ; OG aligné ; garde `overflow-x:clip` ; featureImage+cover next/image.

### ⚠️ meilleur-fournisseur-energie-be — *gros progrès, reste résidus globals + lang*
- **Tokens** ⚠️ : `#3D5AFE`/`#CCFF48` dans `globals :root @theme`, masqués par `overrides.css` (`--primary:#B45309`).
- **A11y** ⚠️ : `<html lang="fr">` figé ; `/en` via `<div lang="en" display:contents>` (sous-arbre corrigé, pas la racine SSR).
- ✅ **Plus d'éclair** : logo **flamme sur mesure** ; OG dynamique ; 26 covers + alt ; garde `overflow-x:clip`.

### ✅ meilleure-carte-credit.be — *redressé depuis le 19/06*
- ✅ **OG réaligné** (papier, plus le néon V1) ; monogramme « M » ; `icon.svg` + `favicon.ico` ; DA « Éditorial papier » mutée ; garde `overflow-x:clip` ; **`lang` dynamique** ; **12 articles** ; auteur Sophie Laurent.

### ✅ meilleures-assurances-auto.be — *reste la référence du réseau*
- ✅ DA « Sérénité » émeraude mutée ; mark **bouclier+check** ; OG aligné ; tables wrappées ; responsive/a11y propres ; auteur Thomas Renard (ex-courtier FSMA). `lang="fr"` figé acceptable (mono-locale).

---

## 3. Anti-footprint inter-sites

| # | Paire / motif | Type | Sévérité |
|---|---|---|---|
| 1 | **`globals.css :root` néon défaut non muté** (masqué par overrides/volteo) — voiture.be, familiale, **utilitaire** (réimposé dark), quel-operateur, énergie, **neobanque** | Dette template récurrente (6 sites) | ❌ Fort |
| 2 | **Même `Nav.tsx` + `volteo.css` V1** (5 sites auto) → même bug latent ; suv patché, **voiture.be & familiale** vulnérables | ❌ Fort (technique) |
| 3 | **neobanque** : logo 3 barres = mark moteur Voltéo + palette néon défaut + Space Grotesk | ❌ Fort |
| 4 | **`<html lang="fr">` figé** sur 7 sites bilingues ; SSR correct seulement sur voiture.be, électrique, carte-credit | ⚠️ Moyen |
| 5 | Fonts **Bricolage + Hanken** partagées (suv-config, quel-operateur, énergie) | ⚠️ Faible |
| 6 | **jpeg orphelins racine** (familiale, utilitaire) | ⚠️ Faible (hygiène) |

**Win réseau :** l'**éclair générique a disparu** — chaque site rend un mark sur mesure distinct, **sauf** `meilleure-neobanque.be` (barres génériques). Paire footprint n°1 du 19/06 **résolue**.

**Auteurs :** uniques et incarnés, **sauf** `meilleure-neobanque.be` (« Maxime », prénom seul).

**Covers :** `meilleure-voiture-electrique` n'a **qu'une cover d'article partagée** (1 seul article illustré) ; `meilleure-neobanque.be` = risque d'image inline cassée (`category-comparatifs.webp`). À générer au stade `emd-fix`.

---

## 4. Top des actions prioritaires

1. **❌ RESPONSIVE — propager le fix scroll horizontal.** `meilleure-voiture.be` (confirmé) + `meilleure-voiture-familiale.be` (probable) : appliquer le correctif déjà en place sur `meilleur-suv.be` (masquer `.nav-cta` <940px + garde `overflow-x:clip`). Ajouter le filet `overflow-x:clip` à utilitaire + 7-places.
2. **❌ meilleure-neobanque.be — dé-templatiser (seul site sans direction DA assumée).** Muter la palette hors du néon défaut, **abandonner Space Grotesk** (interdit), réécrire `globals.css @theme/:root` (valeurs littérales `#FF3D57…`), remplacer les 3 barres génériques par un vrai mark.
3. **❌ meilleure-voiture-utilitaire.be — réparer les tokens en dark.** `html[data-theme="dark"]` réimpose les néons sur `--accent-*` → réécrire depuis `niche.config.palette`.
4. **⚠️ A11y `<html lang>` dynamique en SSR.** Prioriser 7-places et utilitaire (aucun fix), puis harmoniser les fix client (suv, familiale, quel-operateur, énergie, neobanque).
5. **⚠️ Hygiène DA & assets.** Accents `globals.css` depuis `niche.config.palette` (voiture.be, familiale) ; `.news` verte + radius 7-places ; `icon.svg` pastel + `#FF3D57` de quel-operateur ; `.ico`/`.png` utilitaire & 7-places ; jpeg orphelins (familiale, utilitaire) ; **générer les couvertures manquantes** (électrique, neobanque).

---

*Audit DA/UX/Images/Responsive/A11y généré automatiquement (tâche planifiée `emd-audit-ux`). Lecture seule : aucun repo de site modifié — seul ce rapport est écrit dans `emd-methodo`.*
