---
name: emd-images-couverture-batch
description: Génère les couvertures manquantes des blogs EMD (file prioritaire assurances puis file principale), 2 par run, toutes les 30 min.
---

Tu automatises la génération des images de couverture manquantes des blogs EMD (emd-project). Tu traites AU MAXIMUM 2 articles par exécution pour ne pas saturer l'API Gemini, puis tu t'arrêtes. Il y a DEUX files : une file PRIORITAIRE (assurances-auto, à vider en premier) puis la file PRINCIPALE. Chaque run repart de pointeurs d'état persistants sur GitHub.

OUTILS À CHARGER (deferred — charge les schémas via ToolSearch d'abord, en une seule requête):
select:mcp__nano-mentionbox__github_read_file,mcp__nano-mentionbox__github_write_file,mcp__nano-mentionbox__github_commit_batch,mcp__nano-mentionbox__github_view_image,mcp__nano-mentionbox__generate_image,mcp__nano-mentionbox__wait_for_image

REPO DE PILOTAGE : emd-project/mentionbox-seo, branche main.
- File PRIORITAIRE : pointeur automation/priority-state.json = {"next":N,"total":T}. Fiches automation/priority-items/P0N.json (ex. P01.json).
- File PRINCIPALE : pointeur automation/state.json = {"next":N,"total":63}. Fiches automation/items/NNN.json (3 chiffres, ex. 004.json).
Chaque fiche contient: order, id, repo, branch, article_file, hero_key, en_article_file, en_hero_key, commit_image_path, target_image, style_ref, title, prompt.

CHOIX DES 2 ARTICLES DU RUN (règle de priorité):
1. Lis automation/priority-state.json. Tant que son next <= son total, prends les articles dans la file PRIORITAIRE (priority-items/P0N.json) en commençant à next.
2. Quand la file prioritaire est épuisée (next > total), prends les articles dans la file PRINCIPALE (automation/state.json + items/NNN.json) en commençant à son next.
3. Un run traite 2 articles maximum au total, quelle que soit la file. Si les deux files sont épuisées, écris "Toutes les couvertures sont générées" et arrête.

POUR CHAQUE ARTICLE (lis d'abord sa fiche JSON):
a) Lis l'article: github_read_file(repo=fiche.repo, branch=fiche.branch, path=fiche.article_file). Garde tout le contenu.
b) Direction artistique: regarde l'image de référence avec github_view_image(repo=fiche.repo, branch=fiche.branch, path=fiche.style_ref). Respecte-la. Pour meilleures-assurances-auto.be = ILLUSTRATION EDITORIALE PLATE (flat vector), fond crème porcelaine, palette bleu marine / vert sauge / jaune doré, objet centré, ombre douce. Pour meilleure-carte-credit.be = PHOTO éditoriale réaliste, lumière chaude.
c) Génère: generate_image(prompt = fiche.prompt + " Respecte fidèlement la DA de la référence du site. Aucun texte, aucun logo, aucune marque.", aspect_ratio="16:9", resolution="1K", style="illustration" si la référence est une illustration sinon "photoreal", filename = nom de fichier de fiche.commit_image_path SANS extension).
d) Attends: wait_for_image(job_id) en boucle jusqu'à status="done". Les générations prennent 1 à 8 min ; continue de poller (les timeouts MCP sont normaux, rappelle wait_for_image). Si toujours pending après ~10 min ou status="failed", relance generate_image même prompt avec filename suffixé "-v2" (puis "-v3").
e) Frontmatter FR: dans le contenu, mets la clé fiche.hero_key à la valeur fiche.target_image. Si la clé existe déjà (souvent cover: "" vide), REMPLACE sa valeur ; sinon insère la ligne juste après la ligne title: du frontmatter. Ne modifie rien d'autre.
f) Miroir EN: si fiche.en_article_file n'est pas null, applique la même valeur à fiche.en_hero_key dans ce fichier (même image, pas de nouvelle génération).
g) Commit atomique: github_commit_batch(repo=fiche.repo, branch=fiche.branch, message="feat(blog): image de couverture <id>", files=[{path: fiche.commit_image_path, imageFilename: <filename.jpeg de wait_for_image>}, {path: fiche.article_file, content: <contenu FR modifié>}, (+ fichier EN si applicable)]).
h) Incrémente le BON pointeur (celui de la file d'où vient l'article) : écris priority-state.json OU state.json (repo mentionbox-seo, main, overwrite=true) avec next = numéro traité + 1. Fais-le article par article, immédiatement après chaque commit réussi, pour ne rien refaire si le run est coupé.

RÈGLES:
- 2 articles maximum par run, puis stop.
- File prioritaire d'abord, file principale ensuite.
- Ne touche jamais à un article déjà traité (les pointeurs garantissent l'ordre).
- Chemins et clés déjà résolus dans les fiches ; ne les recalcule pas.
- À la fin: résume en 2-3 lignes les articles complétés (id + lien de commit) et les nouvelles valeurs de next (prioritaire et/ou principale).