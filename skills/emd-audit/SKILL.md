---
name: emd-audit
version: 1.0.0
description: Audit QA d'un ou de tous les sites EMD — multilingue, contenu (thin content < 800 mots), SEO sémantique + technique, images, DA, accessibilité, anti-footprint inter-sites. LECTURE SEULE : ne modifie aucun repo de site, produit un dashboard consolidé dans emd-methodo/pipeline/audits/. À utiliser quand on dit « audite les sites EMD », « audit QA », « vérifie le SEO / la DA / le multilingue d'un site », « check thin content », ou depuis la tâche planifiée d'audit hebdomadaire.
---

# emd-audit — Audit QA des sites EMD

MODE **LECTURE SEULE**. Tu ne modifies AUCUN repo de site. Le seul fichier écrit est le rapport d'audit dans `emd-project/emd-methodo`. Tu ne corriges rien — tu signales. (La correction est le rôle du skill `emd-fix`.)

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file` (MCP nano-mentionbox). Fetch des URLs de prod possible pour un check HTTP.

## Périmètre

Par défaut : **tous les sites** listés dans `pipeline/sites.csv` (repo `emd-project/emd-methodo`) dont le statut est « Live » ou « Configuré » (ignore « À faire »). Si l'utilisateur cible un site précis, n'audite que celui-là.
Repo d'un site = colonne `repo` sous l'org `emd-project`. URL de prod = `https://<repo sans les points>.vercel.app`.

## Checks par site (statique, par sévérité : bloquant / important / mineur)

### MULTILINGUE (FR + EN) — priorité
- i18n/routing FR + EN configuré (locales fr+en, routes /fr /en ou équivalent, locale par défaut). **Jamais de NL.**
- **Sélecteur de langue présent ET monté** dans le layout/nav (réellement rendu, pas juste défini).
- **Liaison FR ↔ EN par article** : chaque article/page FR pointe vers son alternative EN précise (et inversement) via le mécanisme d'alternance du template + hreflang. Signale les articles **orphelins de traduction** et les liens d'alternance **cassés / qui renvoient vers la home**.
- **Parité de contenu** FR vs EN (écarts de nombre d'articles).

### CONTENU (thin content)
- Estime le **nombre de mots du corps de chaque article**. **Flag tout article < 800 mots** (important), avec titre + compte de mots, listés explicitement.
- Signale articles quasi-vides, doublons, ou titres dupliqués.

### SEO SÉMANTIQUE
- Intent cohérent avec le type de page (informational / comparatif / transactionnel).
- Mot-clé cible dans title, H1, 1er paragraphe, meta ; hiérarchie de titres logique (un seul H1).
- Couverture topique : entités/questions liées, bloc FAQ/PAA.
- **Maillage interne** : article → hub + frères ; hub → articles. Signale les articles orphelins de liens internes.
- **Cannibalisation** : plusieurs articles sur le même mot-clé primaire.

### SEO TECHNIQUE
- `sitemap.xml` valide avec les **2 locales** ; `robots.txt` non bloquant.
- `canonical` auto-référent correct ; **pas de noindex/nofollow accidentel** sur le contenu.
- **hreflang FR ↔ EN réciproque** (+ x-default si applicable).
- **OpenGraph + Twitter card** (avec featured image).
- **JSON-LD** Article / FAQ / Breadcrumb présents et cohérents.
- Slugs propres, structure d'URL cohérente, pas de lien interne mort.

### IMAGES
- Cover par hub/catégorie ; **featured image UNIQUE par article** (signale les doublons) ; `alt` descriptifs ; `next/image` (pas de `<img>` brut) ; dimensions définies (CLS) ; aucun chemin cassé dans `public/`.

### DA / DESIGN
- Aucune couleur hex en dur dans `app/`/`components/` (tokens uniquement) ; fonts en variables ; contraste AA. Note le **type de home** + la **palette** (`niche.config.palette`) pour le check anti-footprint.

### ACCESSIBILITÉ
- alt présents, ordre des titres cohérent, `prefers-reduced-motion`, **attribut `lang` correct par locale**.

### SANTÉ
- URL de prod 200 (+ une page /en 200) si fetchable, sinon « non vérifié ».

Continue site par site même en cas d'échec — collecte, n'abandonne pas le run.

## Anti-footprint inter-sites
Compare les sites : signale toute paire trop similaire (même type de home ET palette proche) — l'unicité de la DA est la protection anti-footprint du réseau.

## Sortie — dashboard consolidé
Rapport Markdown :
- **Scorecard** : sites × catégories (Multilingue / Contenu / SEO sémantique / SEO technique / Images / DA / A11y / Santé) en ✅ / ⚠️ / ❌.
- **Détail par site** trié par sévérité ; mets en avant : ruptures multilingues, **liste des articles thin content (< 800 mots)**, cannibalisation, données structurées manquantes.
- Section **anti-footprint**.
- **Top des actions prioritaires** (❌ d'abord).

Écris dans `emd-project/emd-methodo` → `pipeline/audits/audit-AAAA-MM-JJ.md` (date du jour), et mets à jour `pipeline/audits/LATEST.md` (overwrite=true). C'est ce `LATEST.md` que le skill `emd-fix` consomme.

## Contraintes
- LECTURE SEULE sur les repos de sites ; tu n'écris QUE le rapport dans `emd-methodo`.
- Efficace : énumère les fichiers, lis frontmatters/configs et corps d'articles pour le comptage de mots, plutôt que de tout relire inutilement.
