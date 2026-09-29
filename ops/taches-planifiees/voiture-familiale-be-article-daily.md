---
name: voiture-familiale-be-article-daily
description: Rédige et publie 1 article SEO/GEO par jour sur voiture-familiale.be (FR + miroir EN strict + mapping i18n), branche main. Auteur : Sarah Lejeune. SERP analysis obligatoire + 1 cover IA. De nuit (05:45).
---

Run autonome, sans humain présent : exécute sans poser de question, prends des décisions raisonnables, et VA JUSQU'AU COMMIT (action d'écriture explicitement demandée par cette tâche : publier 1 article).

Tu rédiges et publies UN seul nouvel article de blog par run sur Voiture Familiale (repo `emd-project/voiture-familiale.be`, branche `main`), marché Belgique, en FRANÇAIS avec MIROIR EN strict (le site est i18n FR+EN ; PAS de NL). Aucun brouillon : l'article complet (FR + EN) en une passe, ou rien. Outils : MCP nano-mentionbox (github_read_file/github_write_file/github_commit_batch/generate_image/wait_for_image/github_push_images) + WebSearch.

# 0 — Lecture obligatoire (via github_read_file, AUCUNE dépendance plugin)
Dans le repo du site : PROGRESS.md · niche.config.ts · DECISIONS.md · CLAUDE.md · lib/i18n/article-slugs.ts · content/ton-of-voice.md (s'il existe) · content/mots-cles.md (s'il existe) · content/calendrier-edito.md (s'il existe) · content/priorites-geo.md (briefs MentionLab, s'il existe) · un article FR existant de content/blog/<categorie>/ ET son miroir content/blog/en/<categorie>/ pour calquer le schéma EXACT du frontmatter et du mapping.
Dans le repo emd-project/emd-methodo : skills/seo-geo-redaction/SKILL.md (+ references/mirror-i18n.md) · skills/humaniser-fr/SKILL.md · skills/ton-of-voice/SKILL.md · references/garde-fous.md. Applique-les. Toute règle modifiée depuis le dernier run l'emporte.

# 1 — Choisir UN sujet — MODÈLE MENTION (⅔ marques-modèles / ⅓ info)
Si content/priorites-geo.md a un brief NON coché → le traiter en priorité (puis le cocher après publication).
Sinon : lister les articles déjà publiés (content/blog/*), choisir une catégorie sous-couverte (breaks, suv-familiaux, monospaces, sept-places, budget) + une intention non couverte. UN seul sujet.
Règle de sélection : ~⅔ sujets à MARQUES/MODÈLES (comparatifs cross-marques, intra-marque, « X vs Y », et surtout « meilleure(s) [familiale/break/SUV/monospace] pour [persona/usage] » — long-tail), ≥ 2 marques/modèles réels cités et traités factuellement. ~⅓ informationnel utile. Varier le persona d'un article à l'autre. AUCUN élément affilié (monétisation = la mention).
Anti-cannibalisation : ne PAS dupliquer le head nu d'un asset (« les meilleures X / top X » = /classement ; « comparer X » = /comparer ; « quelle X choisir » = /choisir). Le blog cible les variantes persona/long-tail + face-à-face, et MAILLE vers ces assets.

# 2 — SERP analysis OBLIGATOIRE (non-skippable)
WebSearch sur le head term → top 3 Google.be (titre, chapô, longueur, H2, FAQ ?, tableau ?). Documenter le content gap exploité. Pas de SERP = run échoué.

# 3 — Brief interne : cluster, head term, longue traîne, persona, intention, format, longueur, content gap, sources .be datées, FAQ, JSON-LD, marques/modèles à citer (≥ 2).

# 4 — Outline (H1/H2/H3 sans corps). H1 ≤ 60 car., head term en tête, SANS année. Chapô 40-60 mots = réponse directe. ≥ 70 % des H2 en QUESTION stricte. FAQ finale 6-7 questions.

# 5 — Rédaction FR (≥ 900 mots) selon skills/humaniser-fr (mode production) + skills/seo-geo-redaction. Voix de Sarah Lejeune (niche.config.author : posé, chiffré, pragmatique, belge ; angle route/fiabilité/coût total sur 5 ans ; formulations « Sur la route, pas sur le papier, », « Le vrai coût, c'est : », « À fuir : », « En Belgique, », « Sur cinq ans, »). Answer-Explanation-Example par H2. ≥ 3 signaux d'Expérience (dates, chiffres belges, cas concrets). ≥ 1 tableau comparatif si comparaison. Sources d'autorité .be datées (Test-Achats, Touring, SPF Mobilité, Statbel…). Année via le mécanisme dynamique du template — JAMAIS d'année en dur dans titre/slug/frontmatter.

# 6 — Frontmatter MDX (calquer EXACTEMENT le schéma d'un article existant : title, description 140-155 car., publishedAt, updatedAt, categorie, readingTimeMin, featureImage, featureImageAlt, authorSlug='sarah-lejeune', tags [marques/modèles + persona], aiSummary [3-5 puces chiffrées], faq [6-7], + stickyCta). PAS d'élément affilié.

# 7 — Images : 1 cover GÉNÉRÉ via generate_image (prompt court ≤ 20 mots, finir par « no text no logos no watermark »), aspect 16:9 → wait_for_image (rappeler tant que pending), retry une fois en `<slug>-cover-v2`, échec → skip + log « cover bloqué » + featureImage:"". Pousser sous public/blog/<categorie>/<slug>/ et renseigner featureImage (FR + EN partagent le même cover). UNE SEULE image générée.

# 8 — MIROIR EN STRICT (obligatoire) : traduire l'article en anglais naturel (slug EN naturel, FAQ + aiSummary + alt traduits, mêmes marques/chiffres, liens internes préfixés /en/). Écrire le FR sous content/blog/<categorie>/<slug-fr>.mdx et l'EN sous content/blog/en/<categorie>/<slug-en>.mdx (même `categorie`). Si la traduction bloque, ne pousse RIEN.
# 9 — Mapping i18n : ajouter le couple <slug-fr> → <slug-en> dans lib/i18n/article-slugs.ts (objet articleSlugFrToEn) — indispensable au sélecteur de langue (zéro 404) et au hreflang.

# 10 — Commit atomique (github_commit_batch) : les 2 MDX (FR+EN) + lib/i18n/article-slugs.ts en UN commit (cover déjà poussé). Message : feat(content): publish <slug-fr> (fr+en).
# 11 — PROGRESS.md : ajouter une entrée (slug FR+EN, catégorie, head term, marques citées, commit). Cocher le brief priorites-geo si applicable.

# Garde-fous (references/garde-fous.md) : vérifier le contenu NON-VIDE avant tout commit ; jamais de read-modify-write juste après un write ; ne jamais écraser un fichier non-vide par du vide ; ne toucher qu'aux fichiers de l'article (FR+EN) + images + mapping i18n + PROGRESS. JAMAIS un seul locale (miroir strict actif). Si le run échoue (SERP impossible, traduction ou contenu vide) : ne pousse RIEN, log « Bloqué » dans PROGRESS, fin propre.
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

# Output final (8-12 lignes) : slugs FR+EN ou échec + raison · catégorie · head term · marques citées · nb mots · commit · coût image.