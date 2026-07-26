# Règles de design, typographie et UX — pour un agent qui NE VOIT PAS le rendu

> **À quoi sert ce document.** Le provisionnement et les corrections de DA tournent **sans review
> visuelle** : personne ne regarde le site avant publication. Un agent aveugle ne peut donc appliquer
> que des règles **chiffrées, calculables ou greppables**. « Aérer », « équilibrer », « rendre élégant »
> ne veulent rien dire ici. « `line-height` ≥ 1,5 sur le corps de texte » veut dire quelque chose.
>
> **Trois statuts, à ne jamais confondre :**
> · **[N] NORMATIF** — WCAG 2.2. Obligation. Un manquement est un défaut, pas un goût.
> · **[P] PLATEFORME** — Material 3 / Apple HIG / IBM Carbon. Contraignant seulement si on suit le système ;
>   sert de valeur de référence quand il faut trancher.
> · **[C] CONVENTION** — usage de praticiens (échelles modulaires, 60-30-10, grille 8pt). Utile, **pas prouvé**.
>   L'agent peut s'en écarter avec une raison, jamais d'une norme [N].
>
> **Portée** : emd-template (Next.js 16, Tailwind v4, tokens CSS dans `app/globals.css`).
> **Rappel dur du template** : on touche aux **tokens**, jamais aux valeurs en dur dans les composants ;
> la palette vient **toujours** de `lib/da-presets/palettes.json` (161 palettes curatées), **jamais d'hex
> improvisés** ; la propagation d'une palette touche **les 5 blocs** de `globals.css` (cf. `docs/AUTO-DESIGN.md`).

---

## 1. Contraste & couleur

### Seuils opposables [N]
- **Texte normal ≥ 4,5:1** · **texte large ≥ 3:1** (WCAG 1.4.3, AA).
  « Large » = **≥ 24 px** en poids < 700, **ou ≥ 18,5 px** en poids ≥ 700 (conversion officielle 1 pt = 1,333 px).
- **Composants d'UI et objets graphiques porteurs de sens ≥ 3:1** (1.4.11) : bordure d'input, contour de
  focus, coche, icône signifiante, série d'un graphique. Exemptés : éléments **désactivés**.
- **La couleur ne peut jamais être le seul porteur d'information** (1.4.1). Deux couleurs ne se distinguent
  valablement que si leur contraste mutuel est **≥ 3:1** ; sinon → ajouter icône, forme ou texte.
- **Jamais un `color` sans `background-color` associé** (échec F24) : le fond de l'utilisateur est inconnu.
- **Les seuils ne s'arrondissent pas : 4,49:1 échoue.**

### Calcul (c'est LE contrôle design d'un agent aveugle)
Luminance relative : linéariser chaque canal sRGB (`c ≤ 0,03928 ? c/12,92 : ((c+0,055)/1,055)^2,4`),
puis `L = 0,2126R + 0,7152G + 0,0722B`. Ratio = `(L_clair + 0,05) / (L_sombre + 0,05)`.
**À exécuter sur les tokens finaux, en mode clair ET en mode sombre**, sur au minimum :
`--foreground`/`--background` · `--muted-foreground`/`--background` · `--muted-foreground`/`--card` ·
texte des boutons/badges sur `--accent-1` · bordures d'input et anneau de focus sur leur fond.
**Ratio insuffisant → ajuster la LIGHTNESS du token** (jamais la teinte), recalculer, consigner dans DECISIONS.md.

### Mode sombre
- Surface de base **≈ #121212, jamais `#000000` pur** [P] : le noir absolu crée de la halation sur le
  texte clair et supprime la hiérarchie d'élévation.
- Un accent lisible en clair ne l'est **pas mécaniquement** en sombre : sur fond sombre, prendre une
  **version plus claire de l'accent** (équivalent tone 200-300 chez Material) et **re-calculer le ratio**.
- WCAG 2 est **symétrique** (inverser fond/texte donne le même ratio) alors que l'œil ne l'est pas ; APCA
  corrige ce biais mais **n'est pas normatif**. On reste sur WCAG 2.2, en sachant que le texte clair sur
  fond très sombre est le cas où le ratio flatte la réalité → viser confortablement au-dessus de 4,5.

### Palette
- **Piocher dans `lib/da-presets/palettes.json`.** La bibliothèque EST le goût : harmonies et rôles y sont
  déjà validés. Un `brandColor` fourni par le wizard remplace **uniquement `accent-1`** du preset le plus
  proche — **jamais** une palette complète recomposée à la main.
- **Anti-répétition** : `accent-1` doit différer des 2 derniers sites provisionnés.
- Éviter les gris à saturation 0 % pour le texte : teinter légèrement vers la dominante [C].
- **60-30-10** (dominante / secondaire / accent) : garde-fou de proportion utile, **pas un critère de
  conformité** [C].

### Greppable
`#[0-9a-f]{6}` uniques hors tokens > ~20 → la palette a fui · `bg-black` en surface de fond ·
`text-red-*` sans texte ni icône d'état à côté · tout `bg-*` doit avoir un `text-*` apparié.

---

## 2. Typographie

### Tailles
- Corps : **≥ 16 px mobile**, 16-18 px desktop. Légendes/labels **≥ 12 px**. Plancher absolu 11 px [P].
- **Jamais de poids 100-300 sous 16 px.**
- Tailles de texte en **`rem`** (le zoom 200 % de WCAG 1.4.4 doit fonctionner).
- Échelle de référence Material 3 (taille/interligne) si un doute : Display 57/64 · 36/44 · Headline 32/40 ·
  24/32 · Title 22/28 · 16/24 · Body **16/24** · 14/20 · Label 12/16.

### Longueur de ligne (measure) — sources en désaccord, assumé
Butterick 45-90 caractères · Bringhurst 45-75 (idéal 66) · Baymard 50-75 (au-delà de **80**, les blocs sont
sautés ~41 % plus souvent) · WCAG 1.4.8 ≤ 80 (AAA).
**Zone de consensus retenue : 60-75ch** → `max-w-[65ch]` / `max-w-prose` sur tout conteneur de prose.
Passer par `ch` plutôt que par des px règle l'ambiguïté (la largeur lisible dépend de la taille de police).

### Interlignage
- **Corps : 1,5-1,65** (unitless). WCAG 1.4.12 [N] exige que le contenu reste lisible si l'utilisateur force
  `line-height: 1,5` — un design déjà à 1,5 ne casse pas.
- **Titres ≥ 32 px : 1,1-1,25.** Un titre en 1,5 fait « document Word ».
- `line-height` **sans unité**, jamais en px (bloque l'override utilisateur).
- Prévoir aussi la survie à `letter-spacing: 0,12em` et `word-spacing: 0,16em` (1.4.12) → pas de conteneur
  de texte à hauteur fixe.

### Hiérarchie & échelle
- Ratio d'échelle : 1,125 / 1,2 pour l'UI dense · **1,25 par défaut** · 1,333-1,618 pour l'éditorial et les
  hero desktop [C]. Ratio **constant** entre paliers consécutifs.
- **Écart ≥ 25 % entre deux paliers** pour qu'ils se distinguent [C]. Échelle courte type
  **12 · 14 · 16 · 20 · 24 · 32 · 48**.
- **> 10 tailles de police distinctes dans le repo = le système a fui** (repère chiffré, à mesurer).
- Hiérarchiser d'abord par **poids et couleur**, pas en rétrécissant : le texte secondaire se **désature**,
  il ne rapetisse pas sous 14 px.
- **1 à 2 familles de polices, 3 maximum.** Paire type : display (sérif ou grotesk fort) + texte lisible.
- Tracking : titres ≥ 32 px → **−0,01 à −0,03em** ; capitales et petits labels → **+0,05 à +0,1em** ;
  corps 16 px → 0 [P].

### Greppable
compter les `font-size` distincts (> 10 = alerte) · `line-height/font-size` du corps ≥ 1,5 ·
tout `.prose`/`<article>` a un `max-w` ≤ 75ch · `font-thin|extralight|light` croisé avec `text-xs|text-sm` ·
`fontFamily` ≤ 3 · tailles arbitraires hors échelle (`text-[13px]`).

---

## 3. Espacement & layout

- **Échelle 4/8 px, non linéaire** : 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Les écarts doivent
  **croître**, sinon les niveaux ne se distinguent plus [C]. Aucune valeur arbitraire (`p-[13px]`).
- **Proximité — la règle la plus rentable, et la plus souvent ratée** : l'espace **AUTOUR** d'un groupe doit
  être **nettement supérieur** à l'espace **DANS** le groupe. Aucune source d'autorité ne chiffre le
  multiplicateur ; **convention interne EMD, à appliquer telle quelle** :
  label→champ **4-8 px** · champ→champ **16-24 px** · bloc→bloc **32-48 px** · section→section
  **64-96 px desktop / 40-64 px mobile**. Et : **`padding` interne d'une carte < `gap` de sa grille parente.**
- Marges latérales : **≥ 16 px en mobile** (< 600 px), **24 px** au-delà [P].
- Gouttières de grille : **16-32 px**, **une seule valeur de `gap` par grille**.
- **Reflow [N] (1.4.10)** : le contenu doit tenir à **320 px** de large sans double défilement (= zoom 400 %
  sur 1280 px). Aucun conteneur racine à largeur fixe > 320 px, aucun `overflow-x` non maîtrisé, pas de
  tableau large sans conteneur scrollable dédié.
- **CLS ≤ 0,10** (Core Web Vitals, impact SEO direct) : **toute image porte `width`/`height` ou
  `aspect-ratio`**, les polices utilisent `next/font` (pas de FOUT non contrôlé).

### Greppable
valeurs d'espacement hors échelle · `max-w` absent sur la prose · `px-4` minimum sans breakpoint ·
`<img>`/`<Image>` sans dimensions ni `aspect-*` · `gap` multiples dans une même grille.

---

## 4. UX & accessibilité mécanique

### Cibles tactiles — quatre chiffres empilés, pas contradictoires
**24×24 px = plancher AA opposable** (WCAG 2.5.8) · **44×44 px = AAA et Apple** · **48×48 dp = Material,
avec 8 dp d'écart minimum**.
**Règle EMD : 44 px minimum sur mobile** pour toute cible interactive ; 24 px toléré uniquement pour une
icône secondaire **isolée par ≥ 24 px** d'espace libre. Les liens en ligne dans un paragraphe sont exemptés.

### États et focus
- **Focus visible obligatoire [N]** (2.4.7). Ne jamais poser `outline: none` / `outline-none` sans
  `focus-visible:` de remplacement. Cible : anneau **≥ 2 px**, contraste **≥ 3:1** avec le fond adjacent.
- Un composant complet a **au minimum 4 états** : default / hover / active / disabled — en pratique 8 avec
  focus / loading / empty / error. **Un état manquant est un défaut de design, pas une omission mineure.**
- Désactivé : **opacité ~38 %** [P], exempté du contraste 1.4.3, mais jamais signalé **par la seule couleur**.
- **Empty states** : une liste vide affiche un message utile, jamais un cadre vide (`/quiz`, classements,
  résultats de filtre).

### Mouvement
- Tout mouvement automatique de **> 5 s** doit être stoppable [N] (2.2.2) · **≤ 3 flashs/seconde** [N] (2.3.1).
- **Toute animation respecte `prefers-reduced-motion`** (variante `motion-reduce:` ou media query).
- Durées : **100-600 ms** (100-200 micro-interaction, ~300 transition standard, ≤ 500 entrée d'élément) [P].
  Au-delà, ça traîne ; en deçà de 100 ms, ça saute.

### Formulaires et CTA
- `<label htmlFor>` apparié à chaque `<input id>` — **le placeholder n'est pas un label** (il disparaît à la
  saisie et son contraste est faible).
- `autocomplete` avec tokens standards sur les champs d'identité [N] (1.3.5).
- **Un seul CTA primaire par vue** [C]. Hauteur de bouton **48-60 px desktop, 56-72 px mobile**.

### Anti-patterns à proscrire
Texte sur image **sans overlay** (scrim ≥ 40 % de noir **et** ratio final ≥ 4,5:1) · `text-align: justify`
(rivières, pas de césure en CSS) · **capitales sur plus de ~3 mots** (lecture ~10 % plus lente, pénalité
aggravée en dyslexie) · italique sur bloc long · `text-center` sur un bloc de plus de ~200 caractères ·
information portée par la seule couleur.

---

## 5. Signaux de « site généré à la va-vite » — à détecter dans le CODE

> Ces motifs sont la signature statistique des sites produits par IA. Notre objectif est l'inverse : des
> sites **uniques, sans pattern IA**. Chacun est greppable.

1. **Le dégradé indigo → violet → rose** (`from-indigo-500`, `#6366f1`, `#8b5cf6`, `to-purple-500`,
   `to-pink-500`) : le cliché n°1, hérité de la palette Tailwind par défaut. **Proscrit.**
   Plus largement : nombre de `bg-gradient-*` rapporté au nombre de sections → un dégradé n'est pas un design.
2. **Le kit complet du hero généré** : badge/pill juste au-dessus du `<h1>`, hero centré, grille de
   **3 cartes identiques** avec petite icône fine en haut, étapes numérotées 1-2-3, bandeau de stats,
   labels de section en capitales, glassmorphism, Inter partout. En croiser deux ou trois = site clone.
3. **Ombres uniformes** : la même `box-shadow` partout. Une échelle d'élévation tient en **4-6 niveaux
   réutilisés**, chaque niveau idéalement **2-3 ombres empilées** (une serrée sombre + une large douce).
4. **Rayons incohérents** : imposer une échelle (2/4/8/12/16/full) et la formule des coins imbriqués —
   **rayon extérieur = rayon intérieur + padding** (carte r=16 dans un conteneur padding 8 → r=24).
5. **Emoji utilisé comme icône** : le lecteur d'écran énonce le nom Unicode complet. Interdit sans
   `aria-hidden` ou label explicite — et jamais en remplacement d'un vrai jeu d'icônes.
6. **Cartes de longueurs de texte quasi identiques** dans une grille : trahit le remplissage de gabarit.
   Le contenu réel a des longueurs irrégulières.
7. **Absence de `loading.tsx` / `error.tsx` / `not-found.tsx`** dans l'App Router : aucun état non-nominal
   traité.
8. **Preuve sociale fabriquée** (« Trusted by 10 000+ », logos non sourcés, témoignages sans nom réel) :
   c'est un **deceptive pattern**, et c'est incompatible avec le modèle MENTION. **Jamais.**
9. **Restes de gabarit** : `lorem ipsum`, `TODO`, `placeholder`, `example.com`, `href="#"`,
   « Modèle A/B/C », « À définir ». Un site ne sort jamais de l'init avec ça (cf. étape 13ter).
10. **`tailwind.config` non personnalisé** (couleurs/spacing/radius par défaut, police restée Inter) :
    signature d'une sortie de générateur jamais reprise.

---

## Check-list de sortie (à dérouler avant le commit de DA)

1. Contraste **calculé** en clair et en sombre sur les paires clés → toutes ≥ 4,5 (≥ 3 pour gros titres,
   bordures, focus). *Un échec ici signale presque toujours un hex improvisé.*
2. Palette = **preset `lib/da-presets`** identifié par son nom, `accent-1` divergent des 2 derniers sites.
3. `font-size` distincts **≤ 10** · corps ≥ 16 px · `line-height` corps **≥ 1,5** · titres **1,1-1,25** ·
   familles **≤ 3**.
4. Prose bornée à **60-75ch**.
5. Espacements sur l'échelle 4/8 · `padding` de carte **<** `gap` de la grille · marge mobile ≥ 16 px.
6. Aucune cible interactive < **44 px** en mobile (hors liens en ligne) · aucun `outline-none` orphelin.
7. `prefers-reduced-motion` couvert · durées 100-600 ms.
8. Images avec dimensions/`aspect-ratio` (CLS).
9. Grep anti-pattern IA : gradient indigo-violet-rose, emoji-icône, `justify`, capitales longues,
   preuve sociale fabriquée, restes de gabarit.
10. `loading.tsx` / `error.tsx` / `not-found.tsx` présents ; états vides rédigés.

---

## Avertissements honnêtes
- **Seul WCAG est opposable.** Échelles modulaires, grille 8pt, 60-30-10, nombre de polices, ratios de
  rayon : ce sont des **conventions**. L'agent peut s'en écarter avec une raison — jamais d'une règle [N].
- Le **ratio numérique espace extérieur / espace intérieur** n'existe dans aucune source d'autorité : les
  valeurs de la section 3 sont une **convention interne EMD**, assumée comme telle.
- Ces règles rendent un site **correct et sain**, pas remarquable. Elles éliminent les fautes (texte
  illisible, cibles trop petites, clichés IA) ; elles ne remplacent pas un regard humain sur le résultat.

**Sources principales** : W3C WCAG 2.2 (Understanding 1.4.3 / 1.4.10 / 1.4.11 / 1.4.12 / 2.4.7 / 2.5.8) ·
Material Design 3 (type scale, spacing, states, motion) · Apple HIG (typography, targets) ·
IBM Carbon (spacing, type sets) · Nielsen Norman Group (touch targets, empty states, placeholders) ·
Baymard Institute (line length, button design) · Butterick's Practical Typography · Refactoring UI ·
web.dev (CLS) · deceptive.design.
