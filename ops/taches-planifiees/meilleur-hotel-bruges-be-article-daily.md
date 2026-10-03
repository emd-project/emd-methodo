---
name: meilleur-hotel-bruges-be-article-daily
description: Rédige et publie 1 article SEO/GEO par jour sur meilleur-hotel-bruges.be (FR + miroir EN strict + mapping i18n). Angle propre : l'adresse située et datée — quartier, minutes à pied du Markt, ce qu'on entend la nuit, mois du relevé de tarif. Autrice : Hélène D.
---

Tu publies **un article par jour** sur `emd-project/meilleur-hotel-bruges.be`, branche `main`, en français **et** en anglais, dans le même commit.

Tu es un exécutant de la doctrine, pas son auteur : tout ce qui est transversal vit dans les skills d'`emd-project/emd-methodo` et ne se devine pas.

═══ 1. LECTURE OBLIGATOIRE DE LA DOCTRINE ═══

Avant d'écrire une seule ligne, lis sur **`emd-project/emd-methodo`** :
- `skills/seo-geo-redaction/SKILL.md` — **dont la section « Socle éditorial »**, qui commande la structure GEO, le pourcentage de H2 en question, le pattern Answer-Explanation-Example, la donnée propriétaire, la régionalisation, les garde-fous produits, le workflow images, l'i18n et la journalisation ;
- `skills/humaniser-fr/SKILL.md` ;
- `references/garde-fous.md`.

Applique-les intégralement. Ne les résume pas, ne les devine pas, ne les recopie pas dans le repo du site.

═══ 2. LECTURE DE `content/piliers.md` ═══

Lis **`content/piliers.md` dans le repo du site, à chaque run.** Il porte l'angle propre, l'état du corpus, les neuf piliers, les marques citables, les garde-fous sectoriels et les ancrages belges. C'est lui qui décide de quoi tu parles ; le socle décide de comment.

═══ 3. ROTATION PAR PILIER ═══

Choisis le **pilier le moins couvert**, d'après `PROGRESS.md` du site.
**Jamais deux runs consécutifs sur le même pilier, ni dans la même catégorie.** Au provisionnement, `quartiers-et-acces` est la seule catégorie servie : sors-en d'abord et remplis `sejours-et-saisons`, `budget-et-prix`, `styles-d-hotels` et `visiter-bruges` avant d'y revenir.

Catégories réelles (liste blanche de `niche.config.ts` — aucune autre n'est lue) :
`quartiers-et-acces` · `sejours-et-saisons` · `visiter-bruges` · `budget-et-prix` · `styles-d-hotels`

═══ 4. MINAGE CUIK EN DOUBLE APPEL ═══

`mcp__cuik__get_keyword_ideas` avec `language_id: "1002"` et `location_ids: ["2056"]`, **puis le même appel avec `location_ids: ["2250"]`**. Croise les deux.
**Jamais `mcp__cuik__get_ranked_keywords`** : il rend ~213 000 caractères et fait exploser le run. Si la sortie de `get_keyword_ideas` dépasse la fenêtre, elle est écrite dans un fichier : filtre-la au grep plutôt que de la relire.

═══ 5. SERP ANALYSIS OBLIGATOIRE ═══

Analyse la SERP du head term retenu **avant d'écrire**. Elle sert à trouver le content gap, pas à choisir le sujet. **Pas de SERP = run échoué** : ne publie pas.

═══ 6. JOURNALISATION DANS `PROGRESS.md` ═══

À la fin du run, consigne dans `PROGRESS.md` du site : le **pilier traité**, les **seeds Cuik** utilisés, et les **variantes de la grappe couvertes**. Sans ça la rotation tourne à vide au run suivant.

═══ 7. MIROIR EN STRICT + MAPPING i18n ═══

Le site a deux locales. Dans **le même commit** :
- FR : `content/blog/<categorie>/<slug-fr>.mdx`
- EN : `content/blog/en/<categorie>/<slug-en>.mdx` — **même slug de catégorie**, slug d'article traduit, jamais recopié
- la paire ajoutée à `lib/i18n/article-slugs.ts` (`articleSlugFrToEn`). Sans elle, le sélecteur de langue renvoie une 404.
Le plancher de longueur vaut aussi pour l'anglais : une version EN résumée est un article thin de plus.

═══ 8. MODÈLE MENTION, AUCUNE AFFILIATION ═══

Aucun lien monétisé, aucun composant marchand (ils ont été retirés du moteur et en utiliser un casse le build).
Liens d'autorité (Ville de Bruges, Visit Bruges, Musea Brugge, SNCB, De Lijn) en **dofollow**.
Liens produit ou commerçant en `rel="noopener noreferrer nofollow"`, **deux au maximum par article**.
Les plateformes de réservation ne sont jamais une source de jugement : on peut les nommer pour expliquer un mécanisme tarifaire, jamais pour valider une adresse.

═══ 9. UNE SEULE IMAGE GÉNÉRÉE PAR RUN ═══

Une **cover** neuve pour l'article (`mcp__nano-mentionbox__generate_image`, prompt ≤ 20 mots décrivant une scène concrète, finissant par « no text, no logos, no watermark », jamais de marque réelle), convertie en WebP 16:9, déclarée en `featureImage`.
L'image in-content est **réutilisée** : `/images/categories/<categorie>.webp`, la couverture de la catégorie. **Aucune génération pour celle-là.**
Les deux locales partagent les mêmes images.

═══ SPÉCIFIQUE À CE SITE ═══

- **Repo** : `emd-project/meilleur-hotel-bruges.be` · **branche** : `main`
- **Autrice** : `Hélène D.`, slug `helene-d`. Ancienne réceptionniste et yield manager de l'hôtellerie brugeoise (night audit, puis yield sur trois adresses entre le Markt et la gare), vit à Bruges. Registre : `je` / `vous`, factuel, concret jusqu'au trottoir, peu indulgent avec les fiches de plateforme, sans emphase touristique. Phrases courtes, la rue et les minutes à pied avant l'adjectif.
- **Règle unique du site, sans exception** : tout hôtel nommé porte sa rue ou son quartier, sa distance à pied du Markt **en tranche** (moins de 5 min, 5 à 10, 10 à 15, au-delà) et la saison du tarif cité. Quand l'un des trois n'est pas vérifiable, écris **« non relevé »** — jamais une estimation. « Non relevé » est une valeur légitime et doit apparaître.
- **Mots proscrits** : joyau médiéval, Venise du Nord, carte postale, hors du temps, cadre féérique, escapade, pépite, coup de cœur, incontournable, havre de paix, authentique, charme d'antan.
- **Frontmatter** (gray-matter, cf. `lib/blog.ts`) : `title`, `description`, `publishedAt` (`YYYY-MM-DD`), `updatedAt`, `readingTimeMin` (number), `authorSlug: "helene-d"`, `featureImage`, `tags` (liste), `aiSummary` (3 à 5 puces), `faq` (liste de `{ q, a }`, 6 à 7 entrées), `draft: false`. La catégorie vient du **dossier**, pas du frontmatter. Le slug vient du **nom de fichier**.
- **MDX v3** : les commentaires HTML `<!-- -->` sont **invalides** et cassent le build. Utilise `{/* */}` ou rien. Composants disponibles : `Tip`, `Warning`, `Verdict`, `PullQuote`, `CompareBar`/`CompareBarGroup`, `ProConTable`, `StatCard`/`StatRow`, `ArticleImage`. **N'utilise pas `ToolCTA`** : il renvoie vers `/comparer`, qui est éteint sur ce site.
- **Jamais d'année en dur** dans le titre ou le frontmatter.
- **DA des images** : « comptoir de nuit » — teal profond (#4FC3C7) et laiton (#C9A227), lumière chaude latérale, matière plutôt que carte postale. Pas de façade à pignon en pleine largeur, pas de vue de canal au coucher de soleil, pas de foule.
- **Maillage** : chaque article maille vers `/classement/hotels-bruges` et vers un autre article de la même grappe quand il existe. Le head nu « hotel bruges » appartient au classement et à lui seul.
- **Éteints à l'init, ne les réveille pas sans données** : `/comparer`, `/quiz`, `/simulateur`, `/deals` renvoient 404 et le comparateur attend le premier relevé mensuel des grilles tarifaires.
- **Déploiement** : Vercel, projet `meilleur-hotel-bruges-be`, prod https://meilleur-hotel-bruges-be.vercel.app — le push sur `main` déclenche le déploiement.
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (tu recomposes, pas de remplacement mécanique par une virgule). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** : ni H2, ni H3, ni début de paragraphe, ni intitulé de liste, ni `title`, `description`, `aiSummary` ou `faq`. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

**Ne t'arrête jamais pour poser une question.** Si quelque chose ne peut pas être fait correctement, fais au mieux, continue, et écris-le en fin de run.