# Brouillon en attente — meilleure-voiture-hybride.be (run du 2026-11-06)

Article rédigé par la tâche `meilleure-voiture-hybride-be-article-daily` mais **non publié** : le pont nano-mentionbox (seul accès en écriture au repo du site) s'est déconnecté à répétition pendant le run.

À publier tel quel sur `emd-project/meilleure-voiture-hybride.be` (branche `main`), en un seul commit :

1. `content/blog/batterie-et-autonomie/duree-de-vie-batterie-hybride.mdx` (FR)
2. `content/blog/en/batterie-et-autonomie/how-long-a-hybrid-battery-lasts.mdx` (EN)
3. Dans `lib/i18n/article-slugs.ts`, ajouter dans `articleSlugFrToEn` après la ligne `tracter-avec-une-voiture-hybride` :
   `  'duree-de-vie-batterie-hybride': 'how-long-a-hybrid-battery-lasts',`

Cover : non générée (featureImage provisoire = `/images/categories/batterie-et-autonomie.jpeg`). Pilier 4, forme enquête, FAQ 4, TL;DR 3. Le run suivant doit publier ce brouillon avant d'en écrire un nouveau, puis journaliser dans PROGRESS.md.
