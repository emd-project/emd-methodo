# Chantier GEO — quel-fournisseur-energie.be (2026-08-18)

Passe complète sur les 16 articles FR et leurs 16 miroirs EN, déclenchée après un audit
qui montrait un socle correct (FAQ, aiSummary, H2 en question) mais une absence quasi
totale de **données extractibles** — le format que les moteurs génératifs reprennent.

## État avant

| Trou | Articles concernés (sur 16) |
|---|---|
| Aucun tableau markdown | 15 |
| Aucune liste à puces | 14 |
| Aucune liste numérotée | 14 |
| Aucun lien externe (sources citées en texte brut) | 13 |
| Aucun bloc « Sources » daté | 14 |
| Ni tableau, ni StatRow, ni ProConTable | 6 |

Homogènes et corrects avant chantier, non touchés : `faq` à 7 entrées sur 16/16,
`aiSummary` à 5 points sur 16/16, ratio de H2 interrogatifs entre 78 et 90 %.

## Bugs de rendu corrigés

1. **`CompareBar` appelé avec une API inexistante** (`value` / `unit` / `max`) dans
   `prix-gaz-belgique-2026` (2 barres) et `consommation-moyenne-gaz-belgique` (3 barres).
   Le composant attend `label` / `left` / `right` : `toTen(undefined)` renvoyait 0, donc
   **5 barres rendaient à 0,0/10 avec un remplissage nul**, et `CompareBarGroup` excluait
   tous ses enfants, supprimant la ligne « Moyenne ». Les blocs ont été remplacés par des
   tableaux markdown portant les mêmes chiffres. L'argument central de l'article prix du
   gaz (800 € d'écart entre contrats) était invisible.
2. **`ProConTable` avec des props en expression JSX** (`pros={[…]}`) dans
   `compteur-numerique-belgique`. `compileMDX` supprime ces props → deux encadrés vides.
   Converti en forme string pipe `pros="a|b|c"`, seule forme supportée.
3. **Covers en 404 ou absentes.** `resolveFeatureImage` dans `lib/blog.ts` ne testait que
   `.webp` alors que `public/images/blog/` ne contient que des `.jpeg` : le repli catégorie
   ne se déclenchait jamais. Rendu auto-réparateur : test multi-extensions
   (`jpeg`/`jpg`/`webp`/`png`) **et** vérification que le `featureImage` déclaré existe
   réellement, avec repli sur l'image de catégorie sinon. Couvre `tarif-social`,
   `fournisseur-energie-verte` (frontmatter vide) et `compteur-bihoraire` (fichier absent).
4. **`StatCard` débordait sur les valeurs textuelles longues** (taille fixe de 72 px) :
   chevauchement entre colonnes voisines. Échelle typographique à 4 paliers selon la
   longueur + `overflowWrap: anywhere` ; `StatRow` passe de `minmax(120px)` à `minmax(150px)`.
5. **Puces et numéros invisibles dans tout le corps MDX.** Le preflight de Tailwind v4
   neutralise `list-style` et le reset de `globals.css` remet les paddings à 0. Règles
   ajoutées dans `app/styles/volteo-article.css` (chargé après `globals.css`), **scopées en
   enfant direct `.prose-article > ul`** — sans ce `>`, les `<ul>` internes des composants
   (ProConTable et ses `→` / `×`) recevaient une seconde puce.
6. **Liens internes EN morts.** Des liens de la forme `/blog/en/…` avaient été produits :
   c'est le chemin FICHIER, pas l'URL servie (`app/en/blog/…` → `/en/blog/…`). 39 liens
   normalisés sur 10 fichiers, `stickyCta.url` du frontmatter compris.

## Règles de production appliquées aux agents

- **Zéro chiffre inventé.** Restructuration uniquement : les tableaux sont bâtis avec des
  valeurs déjà présentes dans le corps, `n.c.` là où l'article ne dit rien. Chiffres FR et
  EN rigoureusement identiques.
- **Liens d'autorité** sur les organismes déjà cités nommément, première occurrence, URL
  racines uniquement, dofollow normal. Jamais de comparateur commercial.
- **`CompareBar` interdit** aux agents : API piégeuse, un tableau markdown fait mieux.
- **Parité FR/EN stricte** sur chaque modification structurelle.

## État après — audit de contrôle sur 32 fichiers

- **Aucun bloquant MDX.** Zéro balise hors liste blanche, zéro prop en accolades JSX, zéro
  chevron dangereux, zéro `CompareBar` résiduel. 26 tableaux FR + 26 EN, tous bien formés.
- **16/16** sur tableaux, listes et `updatedAt`. **16/16** sur le bloc `**Sources**`.
- **Parité FR/EN sans aucun écart** sur les 16 paires (tableaux, listes, liens, Sources).
- **Zéro `/blog/en/`, zéro `/en/en/`** ; 100 % des liens internes EN préfixés `/en/`.

## Reste à faire

- **3 paires sous le seuil de 2 liens d'autorité** : `frais-resiliation-contrat-energie-belgique`,
  `contrat-energie-fixe-variable-dynamique-belgique`, `consommation-moyenne-gaz-belgique`.
  Elles ne citent nommément aucun organisme liable en dehors de la CREG, déjà liée. Combler
  suppose d'**ajouter une mention éditoriale sourcée** (CWaPE/VREG/Brugel sur les régulateurs
  régionaux, Statbel ou SPF Économie sur les repères de consommation) — travail de rédaction,
  pas de balisage. À confier à la tâche quotidienne du site.
- **`app/styles/volteo-overrides.css` n'est importé nulle part** dans `app/layout.tsx`. Il
  porte pourtant le `overflow-x: clip` et le calage à droite du burger mobile : ces deux
  correctifs ne s'appliquent pas aujourd'hui. Bug latent, hors périmètre de ce chantier.
- **Alias shortcode `summary` non résolvable** : `lib/content/shortcodes.ts` mappe
  `summary → AISummarize`, mais `AISummarize` n'est pas dans le `components` de `compileMDX`
  (il est rendu hors MDX). Aucun article n'en utilise — latent seulement.

## Enseignements réutilisables sur les autres sites EMD

1. **Vérifier l'API réelle d'un composant avant de l'utiliser en MDX.** Deux composants du
   template (`CompareBar`, `ProConTable`) ont des props strictes et échouent en silence :
   pas d'erreur de build, juste un rendu vide ou à zéro. À contrôler sur tous les forks.
2. **Le preflight Tailwind v4 tue les puces.** Tout site issu du template a probablement des
   listes markdown sans marqueur. Contrôle à ajouter à l'audit UX.
3. **Scoper les styles de liste en enfant direct** de la zone de prose, sinon collision avec
   les listes internes des composants.
4. **`/blog/en/…` est un chemin fichier, jamais une URL.** Piège récurrent : trois agents
   successifs s'y sont trompés. À écrire noir sur blanc dans les prompts de rédaction EN.
