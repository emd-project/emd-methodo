---
name: emd-audit
version: 1.5.0
description: Audit QA d'un ou de tous les sites EMD — multilingue, contenu (thin content < 800 mots), SEO sémantique + technique, GEO (structure article : ≥70% H2-questions, réponse-first, FAQ, JSON-LD), images, DA/identité (direction de design parmi les 5, logo SVG sur mesure, tokens), favicon/logo/OG, auteur/E-E-A-T, légal + RGPD (mentions noindex, infos société, bandeau cookies), responsive (zéro scroll horizontal), accessibilité, anti-footprint inter-sites. Audite la SOURCE réellement rendue (pas le fichier au bon nom). LECTURE SEULE : ne modifie aucun repo de site, produit un dashboard consolidé dans emd-methodo/pipeline/audits/. À utiliser quand on dit « audite les sites EMD », « audit QA », « vérifie le SEO / la GEO / la DA / le multilingue / le responsive / l'auteur d'un site », « check thin content », ou depuis la tâche planifiée d'audit hebdomadaire.
---

# emd-audit — Audit QA des sites EMD

MODE **LECTURE SEULE**. Tu ne modifies AUCUN repo de site. Le seul fichier écrit est le rapport d'audit dans `emd-project/emd-methodo`. Tu ne corriges rien — tu signales. (La correction est le rôle du skill `emd-fix`.)

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file` (MCP nano-mentionbox). Fetch des URLs de prod possible pour un check HTTP.

## Principe — auditer le RENDU RÉEL, pas le fichier au bon nom
Un asset peut exister en fichier mais ne pas être celui qui s'affiche → **faux positif** (ex. logo « unique » jugé OK alors que le header rend un SVG inline générique). Trace toujours la source réellement rendue :
- **Logo** : regarde le SVG **inline dans `Nav.tsx`/`Header.tsx`** (pas seulement `public/.../logo.svg`). Flag l'« éclair » réseau générique partagé entre sites.
- **Favicon** : présence de **`app/icon.svg`/`app/icon.png`/`app/favicon.ico`** (sinon non servi, même si `public/favicon.svg` existe).
- **OG** : présence d'un **`app/opengraph-image.(tsx|png)`** (prime sur un OG statique + metadata).
- **Sélecteur de langue / bandeau cookies** : **importés ET rendus** dans le layout/nav, pas seulement définis en fichier.

## Périmètre
Par défaut : **tous les sites** de `pipeline/sites.csv` (repo `emd-project/emd-methodo`) au statut « Live » ou « Configuré » (ignore « À faire »). Si l'utilisateur cible un site, n'audite que celui-là.
Repo = colonne `repo` sous l'org `emd-project`. URL de prod = `https://<repo sans les points>.vercel.app`.

## Checks par site (statique ; sévérité bloquant / important / mineur)

### MULTILINGUE (FR + EN) — priorité
- i18n/routing FR + EN (locales fr+en, routes /fr /en, locale par défaut). **Jamais de NL.**
- **Sélecteur de langue présent ET monté** (importé + rendu) dans le layout/nav.
- **Liaison FR ↔ EN par article** (alternance précise + hreflang). Signale les orphelins de traduction et les liens d'alternance cassés / vers la home.
- Parité de contenu FR vs EN.

### CONTENU (thin content)
- Compte les mots du corps de chaque article. **Flag tout article < 800 mots** (important), titre + compte. Signale doublons / titres dupliqués.

### SEO SÉMANTIQUE
- Intent cohérent avec le type de page ; mot-clé cible (title/H1/intro/meta) ; un seul H1 ; FAQ/PAA ; **maillage interne** (orphelins de liens) ; **cannibalisation**.

### GEO / STRUCTURE ARTICLE — priorité
Conformité à la doctrine `skills/seo-geo-redaction/SKILL.md`. Pour un échantillon d'articles par site :
- **% de H2 en question** : compte les H2, calcule le ratio. **Flag si < 70 %** de H2 en question stricte (Faut-il / Quel / Comment / Pourquoi / Est-ce que / Quand / X vs Y). Signal n°1.
- **Réponse-first** : lead 40-60 mots en réponse directe ; **réponse directe < 60 mots en tête de chaque H2**. Flag les H2 qui partent dans le contexte sans répondre.
- **FAQ-bloc 6-7 questions** ; **TL;DR / aiSummary 3-5 bullets** (frontmatter).
- **JSON-LD** Article + FAQPage + **Person (auteur)** + Breadcrumb + Speakable.
- **Année dynamique** (pas d'année en dur dans title/slug/frontmatter).
- **Sujet** (modèle mention) : majorité de sujets à **marques/modèles × persona** ; flag un site trop informationnel-sans-marque (cf. seo-geo-redaction).

### SEO TECHNIQUE
- `sitemap.xml` (2 locales, avec les articles + hreflang) ; `robots.txt` non bloquant ; `canonical` correct ; **pas de noindex/nofollow accidentel** sur le contenu ; **hreflang FR↔EN réciproque** (+ x-default) ; **OG/Twitter card servis** (vérifier `app/opengraph-image` ou metadata statique réellement câblée) ; **JSON-LD** Article/FAQ/Breadcrumb ; slugs propres ; pas de lien mort.

### IDENTITÉ DE MARQUE
- **Favicon réellement servi** via `app/icon`/`favicon.ico` (pas seulement un fichier dans `public/`).
- **Logo réellement rendu UNIQUE** : inspecte le SVG inline du `Nav.tsx`/`Header.tsx`. **Flag l'éclair réseau générique** partagé entre sites, ou un logo identique à un autre site.

### AUTEUR / E-E-A-T — priorité
- Les articles ont un **auteur identifié** — **flag « la rédaction », auteur générique, ou champ vide**.
- L'auteur a une **bio E-E-A-T crédible** (expert ou passionné, expérience concrète) et idéalement une **page auteur** + avatar.
- Le **JSON-LD Article** référence l'auteur (champ author) ; cohérence frontmatter / page auteur / données structurées.
- L'auteur est **unique au site** (pas le même nom/bio qu'un autre site — anti-footprint).

### IMAGES
- **Featured image UNIQUE par article** (signale doublons) ; **~2 images dans le corps** de chaque article ; `alt` descriptifs ; `next/image` (pas de `<img>` brut) ; dimensions définies (CLS) ; aucun chemin cassé.
- **Cover de chaque collection/catégorie présente ET rendue sur la page catégorie** (pas seulement dans public/), mobile inclus.

### LÉGAL & RGPD — priorité
- Pages légales (mentions, confidentialité, CGU) présentes, **remplies** (pas de placeholder `[À compléter]`) et en **noindex**.
- **Infos société exactes** : MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique.
- **Bandeau cookies RGPD** : présent **ET monté dans le layout**, **léger/discret**, **Accepter / Refuser**, lien politique, choix mémorisé, **aucun cookie/tracker non essentiel avant consentement**. FR + EN. (Absent = bloquant.)

### RESPONSIVE / MOBILE — priorité
- **ZÉRO scroll horizontal** à 320 / 360 / 375 / 768 / 1024 / 1440 px. Détecte dans le code : largeurs fixes en px trop grandes, `100vw` avec padding, tableaux / blocs de code / images non wrappés (`overflow-x`), `min-w` excessifs, position absolue qui déborde, longues chaînes sans `break-words`.
- `<meta name="viewport">` présent ; cibles tactiles ≥ ~44px ; texte lisible sans zoom ; images responsive ; menu mobile fonctionnel.

### DA / DESIGN — IDENTITÉ (priorité)
- **Direction de design assumée** : le site applique-t-il **une des 5 directions** de `docs/DA-DIRECTIONS.md` (palette + fonts + rayons + mode cohérents entre eux) ? **Flag un site sans direction** : tokens bruts d'un skin, palette non mutée (valeurs par défaut), look « comparateur générique » indifférencié.
- **Logo = vrai mark SVG sur mesure** : inspecte le SVG inline du `Nav.tsx`. **Flag l'éclair réseau par défaut**, un logo générique, ou une **image raster** en guise de logo. Favicon = la marque dans `app/icon.svg`.
- **Tokens** : aucune couleur hex en dur dans `app/`/`components/` (tokens `globals` uniquement) ; **la DA passe par `niche.config.palette`, JAMAIS par des valeurs écrites dans `volteo.css :root`** (si tu vois des couleurs en dur dans `volteo.css :root`, c'est un bug — flag) ; fonts en variables ; contraste AA ; **mode light/dark cohérent et fixe** (pas de mélange, pas de toggle).
- Note le **type de home** + la **palette** + la **direction** pour l'anti-footprint. **Cohérence du home avec le NDD** : signale le « comparateur » systématique.

### ACCESSIBILITÉ
- alt présents, ordre des titres cohérent, `prefers-reduced-motion`, attribut `lang` correct par locale.

### SANTÉ
- URL de prod 200 (+ une page /en 200) si fetchable, sinon « non vérifié ».

Continue site par site même en cas d'échec — collecte, n'abandonne pas.

## Anti-footprint inter-sites
Signale toute paire trop similaire : même **direction de design** + palette proche, **logo/éclair inline identique**, même type de home + sections, ou **même auteur/bio réutilisés**. Deux sites du réseau doivent avoir une identité distincte.

## Sortie — dashboard consolidé
Rapport Markdown :
- **Scorecard** : sites × catégories (Multilingue / Contenu / SEO sém. / GEO / SEO tech. / Identité / Auteur / Images / Légal-RGPD / Responsive / DA / A11y / Santé) en ✅ / ⚠️ / ❌, avec une **colonne « % H2-questions »** chiffrée.
- **Détail par site** trié par sévérité ; mets en avant : bandeau cookies / pages légales (placeholders) manquants, scroll horizontal, **auteur générique « la rédaction »**, **logo éclair par défaut / non-SVG**, **DA sans direction (skin générique)**, **articles sous 70 % de H2-questions (% mesuré)**, thin content, covers de catégorie non rendues, cannibalisation, JSON-LD manquant.
- Section **anti-footprint** (directions/palettes/logos/auteurs trop proches).
- **Top des actions prioritaires** (❌ d'abord — RGPD, responsive, auteur, GEO, identité DA en tête).

Écris dans `emd-project/emd-methodo` → `pipeline/audits/audit-AAAA-MM-JJ.md` (date du jour), et mets à jour `pipeline/audits/LATEST.md` (overwrite=true). C'est ce `LATEST.md` que le skill `emd-fix` consomme.

## Contraintes
- LECTURE SEULE sur les repos de sites ; tu n'écris QUE le rapport dans `emd-methodo`.
- **Audite le rendu réel** (cf. Principe) pour éviter les faux positifs.
- Efficace : énumère les fichiers, lis frontmatters/configs et corps d'articles (échantillon pour le GEO) plutôt que de tout relire.
