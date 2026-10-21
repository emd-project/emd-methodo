# Audit QA : DA · UX · IMAGES · RESPONSIVE · A11y

**Date :** 2026-10-21 · **Domaine d'audit :** `ux` · **Mode :** LECTURE SEULE (rendu réel, code de `main` @ `b78208d`, 2026-10-20) · **Doctrine :** `skills/emd-audit/SKILL.md` v1.6.0 + `docs/DA-DIRECTIONS.md` (copie du dépôt du site)

> **Méthode, nouveauté de cette semaine :** le site a été **buildé et servi en local** (`next build` + `next start`) puis mesuré dans Chromium (Playwright) à 320 / 360 / 375 / 768 / 1024 / 1440 px sur 16 URL FR + EN. Seule entorse : Google Fonts n'étant pas joignable depuis l'environnement d'audit, Manrope a été remplacée par la police de repli pour le build local. **Manrope étant plus large que la police de repli, les débordements mesurés sont un minimum.**
> Santé prod : **non vérifiée** (fetch de `fond-investissement.vercel.app` / `www.fonds-investissement.be` bloqué par le proxy de l'exécution planifiée).

## Périmètre

Sites provisionnés ≤ 14 jours (fenêtre depuis le 2026-10-07, source `pipeline/provisioned-log.csv`) et non audités par `ux` (ledger `audited-ux.csv`).

| Domaine | Provisionné | Statut |
|---|---|---|
| beste-waterdispenser.be | 2026-10-01 | > 14 j (et déjà audité le 2026-10-07) → hors périmètre |
| fonds-investissement.be | 2026-10-20 | ≤14j, non audité → **AUDITÉ** |

**1 site audité.** Aucun re-scan du parc.

⚠️ **Nom de dépôt ≠ domaine** : le site `fonds-investissement.be` vit dans **`emd-project/fond-investissement`** (sans « s », sans `.be`, et **dépôt PUBLIC** contrairement aux autres sites du réseau). Le dépôt `emd-project/fonds-investissement.be` n'existe pas. Même cas que waterdispenser la semaine dernière : à consigner dans `pipeline/sites.csv`. Le caractère public du dépôt est un risque d'anti-footprint (tout le réseau devient lisible via `niche.config`, `CLAUDE.md`, `registry/`) : à passer en privé.

---

## Scorecard

| Site | DA / Direction | Logo / Identité | Images | Responsive | A11y | Santé |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| fonds-investissement.be | ⚠️ | ❌ | ❌ | ❌ | ⚠️ | non vérifié |

Légende : ✅ conforme · ⚠️ à corriger (important ou mineur) · ❌ bloquant.

---

## Détail : fonds-investissement.be (dépôt `fond-investissement`)

Site FR + EN, **31 articles FR + 31 EN**, 6 catégories. Home `marche`, catégorie `classic`, article `classic`. Parti pris déclaré (`content/da-report.json`) : « acte notarié et registre des parts — papier ivoire vergé, encre violette de tampon ».

### Responsive ❌ : burger hors écran à 320 px, rogné à 360 px

- **Aucun scroll horizontal** à aucune largeur (`scrollWidth == clientWidth` sur les 16 URL × 6 largeurs) ✅. Garde-fou `overflow-x: clip` sur `html` et `body`, tableaux MDX wrappés dans `.table-scroll-wrap` (article biotech à 30 lignes de tableau OK), comparateur en défilement interne.
- **Mais ce garde-fou masque un débordement réel de la Nav ❌** : le wordmark « Fonds d'Investissement » (≈ 247 px, sans ellipsis) pousse le bouton burger à **x = 325 → 367 px quelle que soit la largeur**.
  - **320 px : burger entièrement hors écran** (325 > 320), clippé par `overflow-x: clip` → **menu mobile inaccessible**, donc plus aucun accès à Comparer / Classement / Blog / EN depuis la Nav.
  - **360 px : burger rogné de 7 px.** 375 px : tient de justesse (8 px de marge).
  - Avec la vraie Manrope (plus large que la police de repli), le seuil remonte probablement au-dessus de 375 px.
  - Fix : `.nav .logo .word { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }` + `.nav .logo { min-width: 0; flex: 1 1 auto }`, ou wordmark court sous 400 px (« fonds·investissement » est déjà dans `niche.logo`).
- `<meta name="viewport">` présent ✅ (défaut Next).
- Cibles tactiles < 44 px : burger **42 px** ; liens du fil d'Ariane 22 px ; byline auteur 23 px ; « Voir la fiche officielle » 23 px (×9 sur `/choisir`) ; « Tous les articles » 22 px.
- Menu mobile fermé : seulement translaté hors écran, sans `inert` → liens tabulables au clavier.

### DA ⚠️ : direction n°2 assumée dans la palette, contredite par le skin `marche`

**Conforme ✅**
- **Direction n°2 Éditorial mutée** : papier ivoire #F6F2E9 / #FFFDF8, encre prune **#6B2760** (teinte 309,7°, mutée depuis le bordeaux), laiton #7D5F17, vert registre #2C5A4D. Palette **unique** : écart d'accent ≥ 47,6° avec les 8 derniers sites, couple de fonds non partagé.
- **`niche.config.palette` = source unique** : les **5 blocs** de `globals.css` (`@theme`, `:root`, `prefers-color-scheme: light`, `data-theme=light`, `data-theme=dark`) reprennent exactement la palette ; dark dérivé proprement. Seul manque : `--color-accent-5` dans `@theme` (mineur).
- **`volteo.css :root` ne contient que des alias** ✅ (aucune couleur en dur).
- `da-site.css` : 5 effets cohérents avec le parti pris (chiffres tabulaires, grain 0,03, tableaux zébrés, filets, sélection à l'encre), tokens uniquement.
- Contrastes en clair : texte 15,3:1, muted 5,3:1 (4,8:1 sur surface 2), accent 9,0:1, blanc sur accent 10,1:1.
- Fonts via `next/font` en variables. Ni la paire interdite, ni une paire d'un voisin.
- Home `marche` tirée par `suggestVariants` : **pas de `comparateur`** (variante retirée du moteur).

**À corriger ⚠️**
- **Le skin `volteo-marche.css` n'est pas neutralisé** alors que `style.effects: 'none'` (« DA papier : aucun voile coloré ») :
  - H1 de la home : mot « fonds » en **dégradé texte** (`.md-title .grad`, primary → mobi → water) ;
  - CTA principal et carte « Choix gagnant » en **dégradé** (`.md-btn-primary`, `.md-best` + `.blob` flouté) ;
  - **3 halos radiaux** dans le hero, orbites et pastilles flottantes ;
  - `.hub-hero .glow` (disque flouté 420 px) sur toutes les pages catégorie ;
  - bloc « Au classement » et footer sur fond **chrome sombre** au milieu d'un site papier.
  → Résultat : la home se lit comme le **gabarit comparateur `marche`** du réseau (cf. epargne et carte-bancaire), pas comme un acte notarié. À neutraliser dans `da-site.css` (`.md-title .grad { background: none; color: var(--accent-1) }`, `.md-btn-primary, .md-best { background: var(--accent-1) }`, `.md-hero` sans `radial-gradient`, `.glow, .blob { display: none }`).
- **Copie « marché en direct » du gabarit** : « Marché en direct · à l'instant », « Le marché, en direct », colonne **« Tendance » en barres vertes** type cotation dans le classement. Il n'y a aucune donnée live sur ce site, et `signature.forbidden` exclut précisément le « graphique boursier ». Copie de `md-flow` également générique (« On classe les offres par valeur réelle, sans favoritisme »).
- **Fonts hors registre de la direction** : la n°2 appelle une **serif de titrage** (Newsreader / Fraunces / Spectral) ; le site est en **Manrope mono-famille** (registre Électrique / Suisse). Assumé par `suggestFonts`, mais affaiblit la lecture « acte notarié ».
- **Contraste AA en échec pour un OS en mode sombre** : `volteo-hub.css` force `--text-muted: #8A8AA0` sous `prefers-color-scheme: dark`, alors que le site reste clair. **Mesuré en navigateur** (émulation dark) : **3,0:1** sur #F6F2E9 et **2,7:1** sur #ECE6D8 (dates, méta, fil d'Ariane, compteurs). Même bug que waterdispenser et epargne : à corriger dans le template.
- **Mode non verrouillé** : clair de fait, aucun toggle monté, mais le script du `<head>` lit toujours `localStorage.theme` et le bloc `html[data-theme="dark"]` existe.
- **Couleurs en dur dans le rendu** (restes du template, hors palette) :
  - `AuthorCard` : `rgba(255,61,87,…)` / `rgba(123,97,255,…)` (rose/violet Voltéo) ;
  - `app/(site)/[article]/page.tsx` l.204 : tag `rgba(255,61,87,.1)` ;
  - `ImagePlaceholder` : mêmes rose/violet ; `ChoisirEditorial` : `rgba(255,210,63,.35)` (jaune) ;
  - `ArticleView` : voile `rgba(10,10,15,…)` + `#fff` ; `Pagination` `#FFFFFF` ; `Footer` `#fff`.

### Logo / Identité ❌

- **Nav : mark sur mesure ✅.** Tampon d'acte (double cercle + barre de signature), inline dans `Nav.tsx`, papier sur encre prune (9,9:1). Ce n'est ni l'éclair, ni un raster.
- **Footer : ÉCLAIR RÉSEAU ❌.** `Footer.tsx` l.75 rend toujours `M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z` en `#fff`, sur toutes les pages FR et EN. **5ᵉ site du réseau** à le porter (après hotel-bruges, carte-bancaire, lave-linge, besttennisshoes).
- **Favicon ⚠️** : `app/icon.svg` = « emd-monogram v1 », **rond #6B2760 + « F »** en police système. Couleur juste, mais ce n'est pas la marque (le tampon), et c'est le même gabarit « rond + initiale » que 6 voisins.
- **OG ❌ : l'image ne se génère pas.** En local, `/opengraph-image` et `/en/opengraph-image` renvoient une **réponse vide** : Satori lève `Expected <div> to have explicit "display: flex" … if it has more than one child node` sur l'eyebrow `{domain} · {year}` de `SiteOgImage.tsx` (3 nœuds texte dans un `div` sans `display: flex`). La home, les catégories et les pages légales déclarent cette URL en `og:image` → **aperçu de partage cassé** (les articles, eux, pointent sur leur cover ✅). Fix : `display: 'flex'` sur ce div, ou chaîne unique `` {`${domain} · ${year}`} ``. À vérifier sur la prod.
  - Même s'il se génère, l'OG reste le **gabarit commun** : barre en dégradé (contraire à `effects: 'none'`), eyebrow `DOMAINE · ANNÉE`, filigrane ★, et ligne de services citant **Quiz et Simulateur, désactivés** sur ce site.
- `public/icons/brand/logo.svg` = « 10min-template » (Syne, #FF3D57) : non rendu sur le site public (seul `/admin` lie `brand/favicon.svg`), mais résidu à supprimer.

### Images ❌

- **Featured ✅** : 31 covers uniques (aucun doublon md5), toutes présentes, 1280×720 webp, alt descriptifs. Les articles EN réutilisent la cover FR correspondante (acceptable).
- **In-body ❌ : 0 image propre sur 62 articles.** Chaque article a **une seule** `<ArticleImage>` et c'est **la cover de sa catégorie recyclée** (`/images/categories/<cat>.webp`) :
  - `lever-des-fonds.webp` affichée dans le corps des **10** articles de la catégorie (×2 avec l'EN = 20 fois), `comprendre-les-fonds.webp` ×12, `reprise-et-transmission.webp` ×10, etc. ;
  - **les alt décrivent des scènes qui ne sont pas dans l'image** : sous la même photo, « Classeurs numérotés… data room », « Dirigeant relisant une term sheet avec son avocat », « Plan financier prévisionnel et table de capitalisation posés sur un bureau »… Alt mensongers = défaut a11y en plus du défaut visuel.
  - Doctrine : ~2 images in-body **propres** par article.
- **Covers de catégorie ✅ : 6/6 présentes ET rendues** (fond du `hub-hero` de `CategoryView`, garde `imageExists`, mobile compris ; vignettes 48 px sur la home `marche`). Vérifié en capture à 1440 px. **Aucune cover de catégorie à générer sur ce site.** Le scrim crème (58 → 84 %) les délave fortement : acceptable.
- `next/image` partout, aucun `<img>` brut (vérifié dans le DOM rendu), dimensions définies.
- Alt de cover de catégorie : gabarit « Illustration — {label FR} », **en français aussi sur les pages EN** (`lib/image-slots.ts`).
- Mineur : plusieurs covers contiennent du pseudo-texte généré en anglais (« SAVINGS STATEMENT », « SAM BUSINESS PLAN ») sur un site FR.

### A11y ⚠️

- Un H1 par page sur home, catégories, articles, classement/comparer/choisir produit, auteur, légales ✅.
- **Hubs `/comparer` et `/classement` sans H1 ❌** (0 H1 mesuré dans le DOM).
- Sauts de niveau de titre (h2 → h4) sur home, hubs, classement, auteur, légales ; `h4` du footer sans `h3`.
- Skip-link, `:focus-visible`, `prefers-reduced-motion` (globals, `volteo-marche`, `volteo-motion`, ticker) ✅.
- **`lang` EN ⚠️** : `<html lang="fr">` sur toutes les pages `/en`, `lang="en"` seulement sur un `div display:contents`. Skip-link en FR sur l'EN.
- Menu mobile `role="dialog"` sans piège de focus, menu fermé tabulable (cf. Responsive).
- Formulaire newsletter de `MarcheHome` **sans `action`** (soumission sans effet), `aria-label="Email"` non traduit.
- Alt in-body mensongers (cf. Images).

---

## Catégories sans cover rendue (pour `emd-fix`)

> **PS demandé :** sur ce site, **les 6 covers de catégorie existent et sont rendues** sur la page catégorie (desktop et mobile). **Aucune cover de catégorie à générer.** Ce qui manque, ce sont les **images de corps**.

| Site | Catégorie | Cover | Action |
|---|---|---|---|
| fonds-investissement.be | les 6 (`comprendre-les-fonds`, `lever-des-fonds`, `fonds-propres-ou-dette`, `reprise-et-transmission`, `start-up-et-scale-up`, `fonds-par-region`) | présente + rendue ✅ | aucune |

**Images à GÉNÉRER dans le fix** (`generate_image`, 16:9, sans texte lisible, palette papier ivoire / encre prune / laiton, motifs du parti pris : acte, registre des parts, tampon, table de capitalisation ; **interdits** : poignée de main, fusée, graphique boursier, pièces) : **2 images de corps propres par article FR = 62 images**, réutilisées par les 31 versions EN. Partir de l'alt existant de chaque article (il décrit déjà la scène voulue) pour la 1ʳᵉ image, et d'un H2 du milieu de l'article pour la 2ᵉ. Puis remplacer `src="/images/categories/…"` par les nouveaux chemins dans les 62 MDX.

---

## Section anti-footprint

Comparaison avec les sites voisins récents (audits `ux` du 2026-09-30 et du 2026-10-07).

| Site | Direction | Accent1 · fonds · mode | Fonts | Home réelle | Logo Nav | Logo Footer | Favicon | OG | Auteur |
|---|---|---|---|---|---|---|---|---|---|
| **fonds-investissement** | 2 Éditorial muté | **#6B2760** · #F6F2E9/#FFFDF8 · light* | Manrope × Manrope | **marche** (skin non neutralisé) | tampon ✅ | **éclair** | rond « F » | gabarit commun ★ (cassé) | Cédric H. |
| compte-epargne | 2 Éditorial muté « livret tamponné » | #A32922 · #EFE9E7/#FAF6F5 · light | Petrona × Assistant | **marche** (skin non neutralisé) | 3 barres | — | rond « C » | gabarit commun ★ | Florence W. |
| carte-bancaire | 3 Suisse muté | #532C96 · #E9E7EE/#FDFCFE · light | Gabarito × Onest | **marche** (skin non neutralisé) | éclair | éclair | carré « C » | gabarit commun ★ | Benoît P. |
| waterdispenser | 2 Éditorial muté | #1F4FB5 · #FBFAF6/#FFF · light | Fraunces × Poppins | magazine | gobelet | gobelet | rond « B » | gabarit commun ★ | Wouter D. |
| tennis | 1 Électrique muté | #1D3FB8 · #F4F6FB/#FFF · light | Archivo | CourtHome | balle | éclair | rond « B » | sur mesure | Julien S. |
| lave-linge | 5 Chaleureux muté | #6A6112 · #EBEEE8/#F8FAF6 · light* | Zilla Slab × Inter Tight | magazine | éclair | éclair | rond « L » | gabarit commun ★ | Xavier D. |

\* mode qui peut basculer (script `localStorage.theme` / muted forcé en OS sombre).

**Ce qui est distinct ✅**
- Accent prune à ≥ 47,6° de tous les voisins ; couple de fonds inédit ; fonts non partagées.
- Mark de Nav sur mesure (tampon).
- Auteur en prénom + initiale, métier propre (ancien analyste crédit entreprises).

**Paires ou groupes trop proches ❌/⚠️**
1. ❌ **Trio finance `marche` : fonds-investissement × compte-epargne × carte-bancaire.** Trois sites finance, même home `marche`, **même skin template non neutralisé** (H1 en dégradé, CTA en dégradé, halos, carte « Choix gagnant », board sombre à barres « Tendance », ticker, statusbar « en direct »). Les palettes diffèrent, mais la silhouette de page est identique. Avec **fonds-investissement × compte-epargne**, s'ajoute le **même parti pris « tampon »** (« livret tamponné » vs « tampon à encre violette ») et la même direction n°2.
2. ❌ **Éclair réseau en Footer** : 5ᵉ site concerné.
3. ⚠️ **OG gabarit commun** : 7ᵉ site (barre dégradée, `DOMAINE · ANNÉE`, ★, services désactivés), et ici en plus il plante.
4. ⚠️ **Favicon « rond + initiale »** (emd-monogram v1) : 7 des 8 derniers sites.
5. ⚠️ **Bio auteur sur le même moule** : « Cédric a passé huit ans, de 2009 à 2017, dans le service crédits entreprises d'une banque belge à Namur… Installé à Gembloux… » = gabarit « N ans (20xx-20xx) à [ville belge], puis… » déjà relevé pour Aurélie, Xavier, Hélène, Benoît, Florence, Wouter.
6. ⚠️ **Dépôt public** : expose la mécanique du réseau (registres DA/voix, `CLAUDE.md`, `da-report.json` listant les 8 sites voisins et leurs teintes).

---

## Top actions prioritaires

1. **[Responsive ❌] Débloquer la Nav sous 375 px** : wordmark en ellipsis / `min-width: 0` (ou wordmark court `fonds·investissement` sous 400 px) pour que le burger reste à l'écran à 320 et 360 px. Passer le burger à 44 px et `inert` sur le menu fermé.
2. **[OG ❌] Réparer `SiteOgImage.tsx`** : `display: 'flex'` sur l'eyebrow (ou une seule chaîne) → l'OG de la home / catégories / légales se génère. Dans la foulée : retirer quiz/simulateur désactivés de la ligne de services, le ★ et la barre en dégradé ; y mettre le tampon.
3. **[Images ❌] Générer 62 images de corps** (2 par article FR, cf. liste ci-dessus) et remplacer la cover de catégorie recyclée dans les 62 MDX ; corriger les alt pour qu'ils décrivent l'image réelle. **Aucune cover de catégorie à générer.**
4. **[Logo ❌] Remplacer l'éclair du `Footer.tsx`** par le SVG du tampon (même markup que `Nav.tsx`, `currentColor`) ; refaire `app/icon.svg` avec le tampon au lieu du monogramme « F ». Supprimer `public/icons/brand/logo.svg` (10min-template).
5. **[DA / anti-footprint ⚠️] Neutraliser le skin `marche` dans `da-site.css`** (dégradés texte/CTA/carte, halos, glow, blob) et réécrire la copie « en direct » / colonne « Tendance » pour sortir du trio finance jumeau ; retirer l'override `--text-muted: #8A8AA0` en OS sombre (3,0:1) ; H1 sur `/comparer` et `/classement` ; `lang="en"` sur `<html>` pour `/en` ; passer le dépôt en privé.

---

## Résumé exécutif

- **Site audité (1)** : fonds-investissement.be (dépôt `fond-investissement`, public). Mesures faites en navigateur sur build local.
- **❌ (4)** : burger hors écran à 320 px (menu mobile inaccessible), rogné à 360 px ; OG de la home qui ne se génère pas (erreur Satori) ; 0 image in-body propre sur 62 articles (cover de catégorie recyclée, alt mensongers) ; éclair réseau dans le Footer.
- **⚠️** : skin `marche` à dégradés malgré `effects: 'none'` + copie « marché en direct » ; muted 3,0:1 en OS sombre ; favicon monogramme générique ; `lang` EN ; hubs sans H1 ; cibles tactiles < 44 px ; hex template résiduels.
- **Scroll horizontal** : aucun à 320-1440 px (mesuré), mais le `overflow-x: clip` masque le débordement de la Nav.
- **Direction DA / comparateur systématique** : direction n°2 Éditorial assumée, palette mutée et unique, tout passe par `niche.config.palette`, `volteo.css` propre. Pas de `comparateur` (home `marche`), mais **3ᵉ site finance en `marche` non neutralisé** → silhouette jumelle.
- **Paires footprint** : trio finance fonds × epargne × carte-bancaire (même home `marche` + skin) ; fonds × epargne (même direction + parti pris « tampon ») ; éclair Footer ×5 ; OG commun ×7 ; favicon rond-initiale ×7 ; bio auteur sur le même moule.
