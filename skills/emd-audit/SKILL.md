---
name: emd-audit
version: 1.1.0
description: Audit QA d'un ou de tous les sites EMD — multilingue, contenu (thin content < 800 mots), SEO sémantique + technique, images, DA, identité de marque (favicon/logo), légal + RGPD (mentions noindex, infos société, bandeau cookies), responsive (zéro scroll horizontal), accessibilité, anti-footprint inter-sites. LECTURE SEULE : ne modifie aucun repo de site, produit un dashboard consolidé dans emd-methodo/pipeline/audits/. À utiliser quand on dit « audite les sites EMD », « audit QA », « vérifie le SEO / la DA / le multilingue / le responsive d'un site », « check thin content », ou depuis la tâche planifiée d'audit hebdomadaire.
---

# emd-audit — Audit QA des sites EMD

MODE **LECTURE SEULE**. Tu ne modifies AUCUN repo de site. Le seul fichier écrit est le rapport d'audit dans `emd-project/emd-methodo`. Tu ne corriges rien — tu signales. (La correction est le rôle du skill `emd-fix`.)

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file` (MCP nano-mentionbox). Fetch des URLs de prod possible pour un check HTTP.

## Périmètre
Par défaut : **tous les sites** de `pipeline/sites.csv` (repo `emd-project/emd-methodo`) au statut « Live » ou « Configuré » (ignore « À faire »). Si l'utilisateur cible un site, n'audite que celui-là.
Repo = colonne `repo` sous l'org `emd-project`. URL de prod = `https://<repo sans les points>.vercel.app`.

## Checks par site (statique ; sévérité bloquant / important / mineur)

### MULTILINGUE (FR + EN) — priorité
- i18n/routing FR + EN (locales fr+en, routes /fr /en, locale par défaut). **Jamais de NL.**
- **Sélecteur de langue présent ET monté** dans le layout/nav.
- **Liaison FR ↔ EN par article** (alternance précise + hreflang). Signale les orphelins de traduction et les liens d'alternance cassés / vers la home.
- Parité de contenu FR vs EN.

### CONTENU (thin content)
- Compte les mots du corps de chaque article. **Flag tout article < 800 mots** (important), titre + compte. Signale doublons / titres dupliqués.

### SEO SÉMANTIQUE
- Intent cohérent avec le type de page ; mot-clé cible (title/H1/intro/meta) ; un seul H1 ; FAQ/PAA ; **maillage interne** (orphelins de liens) ; **cannibalisation**.

### SEO TECHNIQUE
- `sitemap.xml` (2 locales) ; `robots.txt` non bloquant ; `canonical` correct ; **pas de noindex/nofollow accidentel** sur le contenu ; **hreflang FR↔EN réciproque** (+ x-default) ; OpenGraph + Twitter card ; **JSON-LD** Article/FAQ/Breadcrumb ; slugs propres ; pas de lien mort.

### IDENTITÉ DE MARQUE
- **Favicon présent** (app/icon ou favicon) et non générique.
- **Logo présent, lisible et UNIQUE** — ni le logo par défaut du template, ni identique à un autre site du réseau.

### IMAGES
- **Featured image UNIQUE par article** (signale doublons) ; **~2 images dans le corps** de chaque article (pas d'article sans visuel de corps) ; `alt` descriptifs ; `next/image` (pas de `<img>` brut) ; dimensions définies (CLS) ; aucun chemin cassé.
- **Cover de chaque collection/catégorie présente ET rendue sur la page catégorie** (pas seulement dans public/), y compris sur mobile.

### LÉGAL & RGPD — priorité
- Pages légales (mentions légales, politique de confidentialité, CGU) présentes et en **noindex**.
- **Infos société exactes** présentes : MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique.
- **Bandeau de consentement cookies RGPD** : présent, **léger/discret** (pas de modal plein écran bloquant), boutons **Accepter / Refuser**, lien vers la politique de confidentialité, choix mémorisé, et **AUCUN cookie/tracker non essentiel avant consentement**. FR + EN. (Bandeau absent = risque RGPD = bloquant.)

### RESPONSIVE / MOBILE — priorité
- **ZÉRO scroll horizontal** aux largeurs 320 / 360 / 375 / 768 / 1024 / 1440 px. Détecte dans le code les causes probables : largeurs fixes en px trop grandes, `100vw` avec padding, tableaux / blocs de code / images non wrappés (`overflow-x`), `min-w` excessifs, éléments en position absolue qui débordent, longues chaînes sans coupure (`break-words`).
- `<meta name="viewport" content="width=device-width, initial-scale=1">` présent.
- Cibles tactiles ≥ ~44px ; texte lisible sans zoom ; images responsive (`sizes`/`fill`, `max-width:100%`) ; menu mobile fonctionnel.

### DA / DESIGN
- Aucune couleur hex en dur dans `app/`/`components/` (tokens uniquement) ; fonts en variables ; contraste AA.
- Note le **type de home** + la **palette** pour l'anti-footprint. **Cohérence du type de home avec le NDD** : signale le « comparateur » systématique (si quasi tous les sites sont en comparateur → manque de variété/cohérence).

### ACCESSIBILITÉ
- alt présents, ordre des titres cohérent, `prefers-reduced-motion`, **attribut `lang` correct par locale**.

### SANTÉ
- URL de prod 200 (+ une page /en 200) si fetchable, sinon « non vérifié ».

Continue site par site même en cas d'échec — collecte, n'abandonne pas.

## Anti-footprint inter-sites
Signale toute paire trop similaire (même type de home ET palette proche, ou logos qui se ressemblent).

## Sortie — dashboard consolidé
Rapport Markdown :
- **Scorecard** : sites × catégories (Multilingue / Contenu / SEO sémantique / SEO technique / Identité / Images / Légal-RGPD / Responsive / DA / A11y / Santé) en ✅ / ⚠️ / ❌.
- **Détail par site** trié par sévérité ; mets en avant : ruptures multilingues, **bandeau cookies / pages légales manquants**, **scroll horizontal**, articles thin content (< 800 mots), favicon/logo manquants ou génériques, covers de catégorie non rendues, cannibalisation, JSON-LD manquant.
- Section **anti-footprint**.
- **Top des actions prioritaires** (❌ d'abord — RGPD et responsive en tête).

Écris dans `emd-project/emd-methodo` → `pipeline/audits/audit-AAAA-MM-JJ.md` (date du jour), et mets à jour `pipeline/audits/LATEST.md` (overwrite=true). C'est ce `LATEST.md` que le skill `emd-fix` consomme.

## Contraintes
- LECTURE SEULE sur les repos de sites ; tu n'écris QUE le rapport dans `emd-methodo`.
- Efficace : énumère les fichiers, lis frontmatters/configs et corps d'articles pour le comptage de mots, plutôt que de tout relire inutilement.
