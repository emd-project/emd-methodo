# Audit QA — DA · UX · Images · Responsive · A11y

**Date :** 2026-07-05 · **Mode :** lecture seule · **Doctrine :** `skills/emd-audit/SKILL.md` v1.5.0
**Périmètre :** 13 sites au statut *Live* / *Configuré* de `pipeline/sites.csv`
**Principe appliqué :** auditer le **rendu réel** (logo SVG inline du `Nav.tsx`/`Header.tsx`, `app/icon`, `app/opengraph-image`, tokens réellement servis après l'ordre d'import CSS), pas le fichier au bon nom.

> ✅ **Deux victoires réseau depuis la passe du 2026-06-28.**
> 1. **Le scroll horizontal a disparu partout.** Les 4 sites « auto » template V1 encore vulnérables le 28/06 (`meilleure-voiture.be` confirmé, `familiale` probable, `utilitaire`/`7-places` à risque) ont **tous** désormais le garde `html,body{overflow-x:clip;max-width:100%}` + `.nav-cta` masqué ≤940px (`volteo-overrides.css` / `brand-tokens.css`). **Zéro scroll horizontal confirmé sur les 13 sites** à 320/375/768/1024/1440.
> 2. **`meilleure-neobanque.be` est dé-templatisé.** Le seul « site sans direction DA » du 28/06 rend maintenant une direction assumée « Coffre » (jade `#25A37C` / laiton `#C6953F` sur pétrole `#0C1418`), **abandonne Space Grotesk pour Sora**, un **vrai mark sur mesure** (anneau/pièce + flèche ascendante) remplace les 3 barres génériques, et le contenu est passé à **10 articles réels**. Il n'y a **plus aucun site sans direction DA assumée**.

> ⚠️ **Trois flags forts persistent ou apparaissent.**
> - **Font interdite `Space Grotesk` rendue sur 3 sites** : `meilleur-suv.be`, `meilleure-voiture-utilitaire.be`, `meilleur-fournisseur-electricite.be`. (neobanque l'a corrigée, mais l'empreinte se déplace ailleurs.)
> - **Couvertures cassées / manquantes / non uniques sur 3 sites** : `meilleure-fibre-internet.be` (cover `digi` en `.webp` inexistante → placeholder), `meilleure-carte-credit.be` (catégorie `pro-business` sans cover + grille « Trois univers » incohérente avec 4 catégories), `meilleure-voiture-electrique` (majorité d'articles sans `cover` → fallback `cover.webp` partagé).
> - **`<html lang>` figé** sur 7 sites bilingues (SSR sert `/en` en `lang="fr"`).

> ➕ **2 sites entrent au périmètre** depuis le 28/06 : `meilleure-fibre-internet.be` (Configuré) et `meilleur-fournisseur-electricite.be` (Configuré).

> ⚠️ **Note méthodo (inchangée).** `docs/DA-DIRECTIONS.md` reste **introuvable** (dossier `docs/` absent de `emd-methodo`). La conformité « une des 5 directions » est évaluée par la **cohérence palette+fonts+mode+forme** et le caractère **muté/unique** du skin, pas par correspondance nominale. **Action méthodo : créer `docs/DA-DIRECTIONS.md`.**

---

## 1. Scorecard

Légende : ✅ conforme · ⚠️ à surveiller · ❌ bloquant / flag fort

| Site | Statut | DA / Direction | Logo (mark inline) | Tokens / Palette | OG + Favicon | Images | Responsive | A11y / `lang` |
|---|---|---|---|---|---|---|---|---|
| meilleure-voiture.be | Live | ✅ « Auto Naval » (light) | ✅ silhouette voiture | ⚠️ néons `@theme` résiduels (masqués) | ✅ OG niche + `icon.svg` | ✅ uniques + 2 in-body | ✅ **corrigé** | ✅ `lang` SSR dynamique |
| meilleur-suv.be | Live | ✅ « Carbone » (dark) | ✅ hexagone | ⚠️ néons `@theme` résiduels | ✅ OG + `icon.svg` | ⚠️ 3 `.mdx` en draft + in-body recycle cover | ✅ | ❌ **font Space Grotesk (interdite)** · ⚠️ `lang` figé |
| meilleure-voiture-familiale.be | Live | ✅ « Tribu » (serif, light) | ✅ maison/toit | ⚠️ hex littéraux dans override `:root` | ⚠️ **favicon `#C2410C` hors-palette** | ⚠️ **featured non unique + 0 in-body** + auteur `redaction` | ✅ **corrigé** | ⚠️ `lang` client |
| meilleure-voiture-utilitaire.be | Live | ✅ « Graphite copper » (dark) | ✅ van/chevrons | ⚠️ `@theme` Tailwind néon non overridé (rendu copper OK) | ✅ OG niche + `icon.svg` | ⚠️ 0 image in-body | ✅ **garde ajoutée** | ❌ **font Space Grotesk** · ⚠️ `lang` figé |
| meilleure-voiture-7-places.be | Live | ✅ « Sable » (light, bords nets) | ✅ arche-famille | ✅ `.news` corrigée (terracotta) | ✅ OG + `icon.svg` | ✅ uniques, ~1 in-body | ✅ **garde ajoutée** | ⚠️ `lang` figé (à confirmer) |
| meilleure-voiture-electrique | Live | ✅ « Electric cool » (light+toggle) | ⚠️ **logo typographique (pas de mark)** | ⚠️ hex en dur `globals :root` (hors `niche.config`) | ✅ OG bleu + `icon.svg` | ❌ **covers majoritairement manquantes/non uniques** | ✅ fix ≤960px + clip | ✅ `lang` dynamique (fr-BE/en-BE) |
| quel-operateur-choisir.be | Live | ✅ « Signal » (violet, light) | ✅ barres-signal 5-couleurs | ✅ (`#FF3D57` corrigé en `color-mix`) | ✅ OG + `icon.svg` | ✅ uniques + in-body | ✅ clip + tables wrappées | ✅ `lang` script `/en` |
| meilleur-fournisseur-energie-be | Live | ⚠️ « Cuivre » (accent seul, **bg `#EDF1F8` template**) | ✅ soleil (Nav) + flamme (favicon) | ⚠️ **leak `rgba(255,61,87)` dans `RecentArticles.tsx`** + ambiances template | ✅ OG niche + `icon.svg` | ✅ 6 covers + alt | ✅ clip + médias | ⚠️ `lang` figé sans bascule |
| meilleures-assurances-auto.be | Live | ✅ « Sérénité » émeraude (light+dark) | ✅ bouclier + coche | ✅ 100 % variables | ✅ OG + `icon.svg` | ⚠️ 0 in-body (échantillon) | ✅/⚠️ pas de garde `clip` explicite (risque faible) | ⚠️ `lang` figé |
| meilleure-carte-credit.be | Live | ✅ « Éditorial papier » (serif) | ✅ monogramme « M » | ⚠️ hex helpers `.pill` (badges, légitime) | ✅ OG + `icon.svg` + `favicon.ico` | ❌ **cover `pro-business` manquante + grille « Trois univers » ≠ 4 cat.** | ✅ clip + media queries complètes | ✅ `lang` script `/en` |
| meilleure-fibre-internet.be | Configuré | ✅ « Fibre » teal (light) | ✅ hexagone fibre | ⚠️ néons `@theme` résiduels (masqués par `da-site.css`) | ✅ OG niche + `icon.svg` | ❌ **cover `digi` cassée (.webp absent)** + 0 in-body | ✅ clip + `.nav-cta` masqué | ⚠️ `lang` figé |
| meilleur-fournisseur-electricite.be | Configuré | ✅ « Électrique » teal (light) | ✅ éclair-hexagone | ⚠️ hex propres au site (résidus légitimes) | ✅ OG dynamique + `icon.svg` | ✅ 7 articles, uniques, ~2 in-body | ✅ clip + `.nav-cta` masqué | ✅ **`lang` par locale (wrapper `/en`)** · ❌ **font Space Grotesk** |
| meilleure-neobanque.be | Configuré | ✅ **« Coffre » (redressé)** | ✅ **anneau/flèche (redressé)** | ⚠️ néons `@theme` résiduels (masqués par `da-site.css`) | ✅ OG dynamique + `icon.svg` | ✅ 10 articles, uniques, ~2 in-body | ✅ clip + `.nav-cta` masqué | ⚠️ `lang` figé |

---

## 1.bis. Responsive — scroll horizontal : réseau assaini

Le bug historique (template V1 « auto ») était : `.nav-cta` en `display:flex` **inline** dans `Nav.tsx`, jamais masqué en mobile ; media query qui masque `.nav-links` mais **pas** `.nav-cta` ; **aucun garde** `html,body{overflow-x:clip}`.

**État au 2026-07-05 :** les 13 sites disposent désormais du **garde `overflow-x:clip;max-width:100%`** ET du **masquage `.nav-cta` ≤940px** (ou du burger équivalent), via `volteo-overrides.css`, `brand-tokens.css`, `responsive-fix.css` ou `da-site.css` chargés en dernier.

| Site | `.nav-cta` masqué mobile ? | garde `overflow-x:clip` ? | Verdict |
|---|---|---|---|
| meilleure-voiture.be | ✅ (`volteo-overrides.css`) | ✅ | ✅ **corrigé depuis le 28/06** |
| meilleure-voiture-familiale.be | ✅ (`volteo-overrides.css`) | ✅ | ✅ **corrigé depuis le 28/06** |
| meilleure-voiture-utilitaire.be | ✅ (`brand-tokens.css`) | ✅ | ✅ **garde ajoutée** |
| meilleure-voiture-7-places.be | ✅ (`volteo-overrides.css`) | ✅ | ✅ **garde ajoutée** |
| meilleur-suv.be | ✅ | ✅ | ✅ (déjà corrigé) |
| meilleure-voiture-electrique | ✅ (burger ≤960px) | ✅ (`responsive-fix.css`) | ✅ |
| quel-operateur / énergie / carte-credit / fibre / electricite / neobanque | ✅ | ✅ | ✅ |
| meilleures-assurances-auto.be | ✅ (`.nav-desktop` ≤767px) | ⚠️ pas de garde `clip` explicite | ✅/⚠️ (layout flex/grid, risque faible) |

**Seul filet manquant :** `meilleures-assurances-auto.be` n'a pas de garde `overflow-x:clip` explicite (mise en page tout flex/grid, risque faible mais à ajouter par sécurité).

---

## 2. Détail par site (trié par sévérité)

### ❌/⚠️ meilleure-voiture-electrique (Live, branche `claude/no-image-spec-generator-…`) — *covers manquantes*
- **Images (bloquant sur la branche)** : stratégie V2 = 1 `cover` unique/article. Réalité partielle — `garantie-batterie` et `famille-quotidien` ont leurs covers, mais `guide-achat` est **vide**, la plupart d'`autonomie-batterie` sans dossier, et l'article échantillon n'a **aucun champ `cover`** → `ArticleCover.tsx` retombe sur le **`/blog/cover.webp` partagé** = covers **non uniques**. Cohérent avec le nom de branche, mais bloquant avant merge.
- **Logo** ⚠️ : logo **typographique « MVE.be »**, pas de mark vectoriel dédié (distinctif mais plus faible qu'un vrai mark).
- **Tokens** ⚠️ : tokens en dur dans `globals :root` (pas de `niche.config` — lignée template différente) ; assumé, mais hors règle « DA via `niche.config.palette` ».
- ✅ **Meilleur A11y du réseau** : `<html lang>` dynamique (`fr-BE`/`en-BE`), drawer mobile ARIA complet, `prefers-reduced-motion`, CookieConsent RGPD. Responsive corrigé (≤960px + clip). OG bleu réaligné.

### ❌ meilleure-carte-credit.be (Live, branche `claude/setup-nextjs-apple-guide-…`) — *catégorie sans cover*
- **Images (bloquant)** : `pro-business` **absent** de `public/images/categories/` **et** de `CATEGORY_IMAGES` → la 4ᵉ colonne catégorie rend un fond sombre sans illustration (dégradé gracieux, pas d'image cassée). Incohérence : `CategoryColumns` boucle sur **4** `niche.categories` dans une grille `repeat(3,1fr)` titrée **« Trois univers »** → le 4ᵉ déborde sans cover. **À générer une cover `pro-business` + corriger le titre/grille.**
- **Images** ⚠️ : 0 image in-body (articles = liens internes + tables) ; skip-link « Skip to main content » non traduit (mineur).
- ✅ DA « Éditorial papier » très distinctive ; monogramme « M » ; OG papier + `icon.svg` + `favicon.ico` ; responsive le plus complet ; `lang` dynamique par script.

### ❌ meilleure-fibre-internet.be (Configuré) — *cover `digi` cassée*
- **Images (bloquant)** : `digi` référence `/images/blog/digi-fibre-avis-belgique-cover.webp` **absent** (les 2 autres articles sont en `.jpeg`) → **placeholder** sur carte blog, catégorie et hero. **Renommer/générer en `.jpeg` ou créer le `.webp`.**
- **Images** ⚠️ : **0 image in-body** dans les 3 articles (seule la cover). Contenu mince (3 articles) — cohérent avec « Configuré ».
- **Tokens** ⚠️ : `globals.css @theme/:root` garde les **littéraux template néon** (`#FF3D57/#FFD23F/#3DFFC0/#7B61FF`, bg `#0A0A0F`), neutralisés au rendu par `da-site.css` (teal). Dette de dé-templatisation.
- **A11y** ⚠️ : `<html lang="fr">` **figé** (bilingue → `/en` en `fr`).
- ✅ DA « Fibre » teal mutée ; mark hexagone-fibre sur mesure ; OG tokenisé ; responsive propre.

### ❌ (font) meilleur-suv.be (Live) — *Space Grotesk interdite*
- **Font (flag fort)** : le site rend **Space Grotesk** (display) — **font interdite réseau** (marqueur template). Le commentaire du config la croit « anti-footprint » : contresens. **À remplacer** (Clash/Familjen/Sora…).
- **Images** ⚠️ : 3 `.mdx` `draft:true` vides ; l'`<ArticleImage>` in-body recycle une cover catégorie.
- **A11y** ⚠️ : `<html lang="fr">` figé au layout racine (pas de correction SSR).
- ✅ DA « Carbone » dark mutée ; hexagone sur mesure ; OG data-driven + `icon.svg` ; responsive corrigé.

### ❌ (font) meilleure-voiture-utilitaire.be (Live) — *Space Grotesk + `@theme` néon latent*
- **Font (flag fort)** : rend **Space Grotesk** + Mulish — interdite réseau.
- **Tokens** ⚠️ : `brand-tokens.css` (chargé en dernier) remappe bien les `--accent-*` en copper (**rendu correct**), mais `globals.css @theme` garde les **`--color-accent-*` Tailwind en néon** (`#FF3D57…`) non overridés → dette latente si une classe utilitaire `text-accent-1` est utilisée. *(Progrès : le 28/06 le néon était réimposé en dark au runtime ; c'est corrigé, il ne reste que la dette `@theme`.)*
- **A11y** ⚠️ : `<html lang="fr">` figé.
- ✅ Mark van/chevrons sur mesure ; OG niche ; featured uniques ; responsive corrigé (garde `clip` ajoutée).

### ❌ (font) meilleur-fournisseur-electricite.be (Configuré) — *Space Grotesk*
- **Font (flag fort)** : rend **Space Grotesk** + Inter — interdite réseau. À remplacer.
- **Tokens** ⚠️ : hex en dur dans `@theme/:root` mais **valeurs propres au site** (pas de littéraux template néon) + résidus legacy énergie (`#FFB400/#FF6B35/#1AA35F`) volontaires.
- ✅ **Bon élève A11y** : `<html lang>` correct par locale (wrapper `/en` avec `lang="en"`). Palette « Électrique » teal mutée ; éclair-hexagone sur mesure ; OG dynamique `next/og` ; 7 articles, featured uniques, ~2 in-body ; responsive propre.

### ⚠️ meilleur-fournisseur-energie-be (Live) — *bg template + leak néon*
- **DA** ⚠️ : la direction « Cuivre » ne mute que `--primary` (`#B45309`) ; le **fond reste `#EDF1F8` bleu-gris template** → « cuivre » n'est qu'un accent, pas une ambiance. Le sélecteur d'ambiances template (`[data-theme="solaire"/"neon"]` avec néon `#12B76A/#E6FF4D`) est toujours dans `globals.css`.
- **Tokens** ⚠️ : **`RecentArticles.tsx` garde `rgba(255,61,87,0.35)` = néon `#FF3D57`** non muté (quel-operateur a corrigé cette même ligne, pas énergie).
- **A11y** ⚠️ : `<html lang="fr">` **figé sans script de bascule** (`/en` non aligné) — plus faible que quel-operateur.
- ✅ Deux marks propres (soleil Nav + flamme favicon) ; OG niche ; 6 covers + alt ; responsive propre.

### ⚠️ meilleure-voiture-familiale.be (Live) — *favicon hors-palette + images faibles*
- **OG/Favicon** ⚠️ : `app/icon.svg` = maison sur fond **`#C2410C`** (orange brûlé) qui **ne correspond ni** au teal accent1 `#0E7C66` **ni** au terracotta config `#C0563B`. Incohérence favicon vs OG/palette.
- **Images** ⚠️ : featureImage **réutilisée entre articles** (non unique — `meilleur-monospace-familial-2026` emprunte la cover de `berlingo-rifter-combo`) ; **aucune `<ArticleImage>` in-body** ; auteur **`redaction`** générique sur certains articles au lieu de `audrey-pirard`.
- **Tokens** ⚠️ : quelques hex littéraux dans l'override `:root` (`#9A340A`, `#0066CC`, `#C8001F`) ; `niche.signature` **vide** (pas de garde-fou DA/ton, contrairement aux siblings).
- ✅ DA « Tribu » serif la plus distinctive ; maison/toit sur mesure ; **responsive corrigé** (garde `clip` + logo clamp ≤600px) ; `coverAlt` localisé fr/en.

### ⚠️ meilleure-neobanque.be (Configuré) — *redressée ; reste `@theme` + lang*
- **Tokens** ⚠️ : `globals.css @theme/:root` garde les **littéraux template néon** (`#FF3D57…`, bg `#0A0A0F`), neutralisés par `da-site.css` (jade/laiton). Dette de dé-templatisation à nettoyer.
- **A11y** ⚠️ : `<html lang="fr">` figé (`/en` en `fr`).
- ✅ **Redressement complet** : direction « Coffre » assumée, **Sora** (plus de Space Grotesk), **mark anneau/flèche sur mesure** (fini les 3 barres), 10 articles réels, featured uniques + ~2 in-body, OG dynamique, responsive propre.

### ⚠️ meilleures-assurances-auto.be (Live) — *référence ; 2 micro-flags*
- **Responsive** ⚠️ : pas de garde `overflow-x:clip` explicite (layout flex/grid, risque faible) — à ajouter par sécurité.
- **Images** ⚠️ : 0 image in-body dans l'échantillon (`<CompareBar>`/tables) ; alt de carte = `article.title` (générique) mais `coverAlt` descriptif en frontmatter.
- **A11y** ⚠️ : `<html lang="fr">` figé + script thème (pas de bascule lang).
- ✅ DA « Sérénité » émeraude la plus aboutie techniquement (light+dark, 100 % variables) ; bouclier+coche ; OG aligné ; tables wrappées.

### ✅ meilleure-voiture.be (Live) — *redressée*
- ✅ **Responsive corrigé** (garde `clip` + `.nav-cta` masqué) ; DA « Auto Naval » ; silhouette voiture sur mesure ; OG niche + `icon.svg` ; **`lang` SSR dynamique** ; featured uniques + 2 in-body. Reste : néons `@theme` résiduels (masqués).

### ✅ quel-operateur-choisir.be (Live) — *propre*
- ✅ DA « Signal » ; barres-signal 5-couleurs ; **`#FF3D57` corrigé** (`color-mix`) ; OG aligné ; garde `clip` + tables wrappées ; `lang` par script. Fragilité mineure : palette dépend de l'ordre d'import (`overrides.css` après le skin bleu template de `globals`).

---

## 3. Anti-footprint inter-sites

Palettes primaires, modes, logos et OG **bien différenciés** site à site (13 marks distincts, aucun éclair réseau / 3-barres Voltéo / raster). Les motifs partagés restants :

| # | Paire / motif | Type | Sévérité |
|---|---|---|---|
| 1 | **Font `Space Grotesk` (interdite) rendue** — `meilleur-suv.be`, `meilleure-voiture-utilitaire.be`, `meilleur-fournisseur-electricite.be` | Marqueur template partagé (3 sites) | ❌ Fort |
| 2 | **Littéraux template néon `#FF3D57/#FFD23F/#3DFFC0/#7B61FF`** dans `globals @theme/:root` (neutralisés au rendu) — voiture.be, suv, utilitaire, familiale, fibre, neobanque | Dette de dé-templatisation (6 sites) | ⚠️ Moyen |
| 3 | **Paire fonts `Bricolage Grotesque + Hanken Grotesk`** — quel-operateur + énergie | Empreinte 2 sites | ⚠️ Moyen |
| 4 | **`<html lang="fr">` figé** — suv, familiale (client), utilitaire, 7-places, énergie, fibre, neobanque | A11y bilingue (7 sites) | ⚠️ Moyen |
| 5 | **Fond `#EDF1F8` template non mué** — énergie (l'ambiance reste bleu-gris réseau) | Skin partiel | ⚠️ Faible |
| 6 | **Body `Inter` partagé** — suv, electricite, neobanque | Empreinte faible | ⚠️ Faible |
| 7 | **Auteur générique `redaction`** — familiale (certains articles) | E-E-A-T / footprint | ⚠️ Faible |

**Wins réseau :** (1) **plus aucun éclair générique ni logo dupliqué** — chaque site rend un mark sur mesure distinct, **y compris neobanque** (résolu). (2) **Space Grotesk a disparu de neobanque** — mais l'empreinte s'est **déplacée** vers 3 autres sites (suv, utilitaire, electricite) : à traiter globalement. (3) **Scroll horizontal éliminé** sur tout le réseau.

**Couvertures à générer (étape `emd-fix`) :** `meilleure-carte-credit.be` → cover **`pro-business`** (catégorie) ; `meilleure-fibre-internet.be` → cover **`digi`** (chemin `.webp` cassé) ; `meilleure-voiture-electrique` → covers d'articles manquantes (`guide-achat`, `autonomie-batterie`). Générer une image de couverture **en lien avec la catégorie/l'article** pour chaque manque.

---

## 4. Top des actions prioritaires

1. **❌ FONTS — retirer `Space Grotesk` (interdite réseau) de 3 sites.** `meilleur-suv.be`, `meilleure-voiture-utilitaire.be`, `meilleur-fournisseur-electricite.be` : remplacer par une display distincte par site (éviter de recréer une paire commune). Empreinte template n°1 du réseau.
2. **❌ IMAGES — générer/réparer les couvertures manquantes.** `meilleure-carte-credit.be` : générer une cover **`pro-business`** (+ corriger la grille « Trois univers » qui affiche 4 catégories) ; `meilleure-fibre-internet.be` : réparer la cover **`digi`** (`.webp` inexistant → générer/renommer) ; `meilleure-voiture-electrique` : générer les covers d'articles manquantes (fallback `cover.webp` partagé = covers non uniques). **Générer chaque image en lien avec sa catégorie/son article.**
3. **⚠️ A11y `<html lang>` dynamique.** Répliquer le pattern correct (`meilleur-fournisseur-electricite.be` wrapper `/en`, ou SSR de `meilleure-voiture.be`) sur les 7 sites bilingues figés — prioriser énergie, fibre, neobanque (aucune bascule).
4. **⚠️ Hygiène DA / dé-templatisation.** Nettoyer les **littéraux néon `@theme/:root`** (voiture.be, suv, utilitaire, familiale, fibre, neobanque) depuis `niche.config.palette` ; corriger le **leak `rgba(255,61,87)`** de `RecentArticles.tsx` (énergie) ; **muter le fond `#EDF1F8`** d'énergie vers l'ambiance cuivre ; **favicon `#C2410C` hors-palette** (familiale) ; remplir `niche.signature` vide (familiale).
5. **⚠️ Images in-body & auteur.** Ajouter ~2 `<ArticleImage>` in-body là où il n'y en a pas (familiale, utilitaire, fibre, assurances, carte-credit) ; corriger l'auteur générique **`redaction`** (familiale) vers `audrey-pirard` ; ajouter le garde `overflow-x:clip` explicite à `meilleures-assurances-auto.be`.

---

*Audit DA/UX/Images/Responsive/A11y généré automatiquement (tâche planifiée `emd-audit-ux`). Lecture seule : aucun repo de site modifié — seul ce rapport est écrit dans `emd-methodo`.*
