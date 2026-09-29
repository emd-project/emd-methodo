---
name: beaute-demo-backfill-covers
description: Rattrapage one-shot : génère les 6 covers manquantes des articles d'Édito Beauté et rebranche featureImage. S'auto-désactive après.
---

Tâche de RATTRAPAGE (one-shot) sur le repo `emd-project/meilleure-beaute-demo`, branche `main`.

## But
Les 6 articles du magazine ont été publiés **sans `featureImage`** parce que la file de génération d'images était saturée à l'init. Le layout presse affiche donc un dégradé teinté à la place des photos. Objectif de ce run : **générer les 6 covers, les pousser, et rebrancher `featureImage`** dans chaque article.

## Articles concernés (chemin → slug de cover à produire)
1. `content/blog/soin-visage/creme-hydratante-lire-la-formule.mdx` → `a-beaute-creme-hydratante-lire-la-formule-cover`
2. `content/blog/soin-visage/acide-hyaluronique-ce-quil-fait.mdx` → `a-beaute-acide-hyaluronique-cover`
3. `content/blog/cheveux/cheveux-secs-routine-minimale.mdx` → `a-beaute-cheveux-secs-cover`
4. `content/blog/maquillage/fond-de-teint-couvrance-ou-peau-nue.mdx` → `a-beaute-fond-de-teint-cover`
5. `content/blog/parfum/eau-de-parfum-ou-eau-de-toilette.mdx` → `a-beaute-parfum-edp-edt-cover`
6. `content/blog/solaire/spf-quotidien-toute-lannee.mdx` → `a-beaute-spf-quotidien-cover`

## Direction artistique (DA « presse crème »)
Nature morte éditoriale, lumière naturelle douce, tons crème / rosé / beige, faible profondeur de champ, cadrage magazine. **Pas de visage**, pas de peau retouchée, **jamais de marque ni de logo réel**. Prompts ≤ 20 mots, finissant par « no text, no logos, no watermark ». Ratio **16:9**.

Suggestions de sujets : (1) pot de crème ouvert avec texture prélevée ; (2) pipette de sérum et goutte transparente ; (3) mèches de cheveux brossées, lumière chaude ; (4) nuancier de fonds de teint et pinceau ; (5) flacon de parfum en verre à contre-jour ; (6) tube de solaire sur surface claire ensoleillée.

## Procédure — STRICTEMENT SÉQUENTIELLE, une image à la fois
Pour chaque article, dans l'ordre :
1. `mcp__nano-mentionbox__generate_image` (16:9, prompt DA ci-dessus, `filename` = le slug de cover indiqué).
2. `mcp__nano-mentionbox__wait_for_image`. **Si toujours `pending` après ~3 minutes de polling cumulé** → abandonne ce job, relance UNE fois avec le même prompt et un `filename` suffixé `-v2`, puis re-poll ~3 minutes.
3. Dès que l'image est prête : **pousse-la IMMÉDIATEMENT** via `github_push_images` vers `public/images/blog/` (la file purge les images après un TTL court — ne jamais attendre d'avoir tout généré avant de pousser).
4. Mets ensuite à jour le `.mdx` : ajoute dans le frontmatter, juste après `description` :
   `featureImage: "/images/blog/<nom-du-fichier-poussé>.jpeg"`
   `featureImageAlt: "<description précise et sobre de l'image, en français>"`
   **Réécris le fichier à l'identique par ailleurs** — ne touche à rien d'autre (ni au corps, ni aux autres champs).
5. Passe à l'article suivant.

## Règles dures
- **N'écris JAMAIS un `featureImage` pointant vers un fichier qui n'a pas été poussé avec succès.** Si les deux tentatives échouent pour un article, **laisse-le sans `featureImage`** (le dégradé presse reste) et signale-le dans le rapport. Une image cassée est pire que pas d'image.
- Ne réduis ni ne vide aucun article : le corps du texte doit rester strictement identique. Vérifie que le fichier réécrit est bien plus long que le frontmatter seul avant de committer.
- Jamais de read-modify-write juste après une écriture sur le même fichier.
- Commits séparés et clairs (Conventional Commits), p. ex. `feat(images): cover <slug>`. Un push sur `main` redéploie Vercel.

## Sortie
Rapport : pour chacun des 6 articles → cover générée (nom du fichier) ou échec + raison, et si `featureImage` a bien été rebranché. Plus le lien des commits.