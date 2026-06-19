---
name: emd-fix
version: 1.5.0
description: Corrige automatiquement les problèmes d'un audit EMD directement sur la branche main des sites — correctifs mécaniques (alt, next/image, OG/JSON-LD, sitemap, multilingue, images, favicon/logo, auteur/persona E-E-A-T, pages légales noindex + infos société, bandeau cookies RGPD, responsive zéro scroll horizontal, covers de catégorie, structure GEO : H2 en questions / réponse-first / FAQ, identité DA : logo/favicon/OG = mark SVG unique) + correctifs lourds plafonnés (réécriture thin content ≥ 800 mots, traductions EN manquantes). La refonte d'une direction de design sur un site live = signalée, jamais auto. Corrige la SOURCE réellement rendue (pas le fichier au bon nom) et vérifie le câblage après coup. À utiliser quand on dit « corrige les sites depuis l'audit », « applique les fixes », « répare le multilingue / les images / le responsive / le RGPD / l'auteur / la GEO / l'identité DA », ou depuis la tâche planifiée hebdomadaire. ÉCRIT EN PROD : précis, idempotent, zéro casse.
---

# emd-fix — Correction automatique des sites EMD

Tu corriges les problèmes du dernier audit **directement sur `main`** de chaque site. Tu agis en prod : édits ciblés, minimaux, idempotents, jamais de casse.

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file`, `github_commit_batch`, `generate_image`, `wait_for_image` (MCP nano-mentionbox). Lis aussi la doctrine `skills/humaniser-fr/SKILL.md` (anti-IA) et `skills/seo-geo-redaction/SKILL.md` (structure GEO) du repo emd-methodo pour tout correctif de contenu.

## 0 — Principe ABSOLU : corriger la SOURCE rendue, pas le fichier au bon nom (anti correctif fantôme)
Un commit qui édite un fichier **non câblé** ne change rien à l'écran = **correctif fantôme**. Avant de « corriger » un asset, TRACE ce qui est réellement rendu, puis corrige là, puis **vérifie le câblage**.

Pièges Next.js fréquents (à vérifier systématiquement) :
- **Logo header** : souvent un **SVG inline dans `Nav.tsx`/`Header.tsx`** (le « éclair » réseau générique), PAS `public/.../logo.svg`. → corrige le tracé **dans le composant qui le rend** (garde la même mécanique CSS, change juste le path). Éditer `logo.svg` seul ne change rien.
- **Favicon** : servi par la **convention `app/icon.svg` / `app/icon.png` / `app/favicon.ico`** (Next émet le `<link rel="icon">` auto). Un `public/favicon.svg` non référencé n'est PAS servi. → crée/édite `app/icon.svg`.
- **OG / Twitter image** : un **`app/opengraph-image.(tsx|png)`** dynamique **prime** sur un `og-default.svg` + metadata statique. → vérifie sa présence AVANT d'éditer un fichier OG statique ; corrige la source effective.
- **Cover de catégorie** : vérifie que la page catégorie **rend** la cover (composant/champ), pas seulement qu'un fichier existe dans `public/`.
- **Auteur** : l'auteur affiché vient du `authorSlug`/`author` résolu par la config auteurs ou un composant `AuthorCard` — change la **source** + ré-attribue, pas juste un texte isolé.

**Vérification post-fix OBLIGATOIRE** : après chaque correctif d'asset/structure, confirme qu'il est dans le **chemin de rendu** (grep le composant/route/metadata qui l'émet). Si tu n'as pas pu confirmer le câblage, **logue-le comme “à vérifier”** plutôt que de le marquer corrigé. L'idempotence inclut : ne pas « re-corriger » un asset déjà bien câblé, et ne pas marquer corrigé un asset dont le câblage n'est pas prouvé.

## 1 — Charger la to-do
Lis `pipeline/audits/LATEST.md` dans `emd-project/emd-methodo`. Note sa date. Absent → « Aucun audit disponible », stop. Site ciblé → ne traite que celui-là. Priorise **❌ d'abord, puis ⚠️** (RGPD, responsive, auteur, GEO en tête).

## 2 — Corriger chaque site (commits sur `main`, un site à la fois)

### Correctifs MÉCANIQUES (partout où l'audit les signale)
- On-page/A11y/SEO : `alt` descriptifs, `<img>` → `next/image`, OpenGraph + Twitter + **JSON-LD** (Article/FAQ/Breadcrumb/Person), `sitemap.xml` (2 locales), `robots.txt`, `canonical` ; retirer tout `noindex/nofollow` accidentel sur le contenu. (OG : vérifier `app/opengraph-image` avant tout — cf. §0.)
- Multilingue : monter le **sélecteur de langue** (vérifier qu'il est **importé ET rendu** dans le Nav, pas seulement présent en fichier) ; réparer les **liens d'alternance FR↔EN** (vers l'article équivalent, pas la home) ; hreflang réciproque + attribut `lang`.
- **Identité de marque** : favicon manquant/générique → générer un favicon UNIQUE (1:1) **et le câbler via `app/icon.svg`** ; logo manquant/générique/cloné (éclair réseau par défaut) → **dessiner une marque SVG unique** (mark sur mesure selon la niche + accent + wordmark, cf. spec LOGO de `docs/DA-DIRECTIONS.md`) et la poser **là où elle est rendue** (SVG inline du `Nav.tsx`/`Header.tsx`), pas juste `logo.svg` ; OG via `app/opengraph-image`. Vérifier le rendu de chaque (cf. §0).
- **Auteur / E-E-A-T** : articles signés « la rédaction » / générique / vide → **créer un persona auteur UNIQUE** (nom réaliste, spécialité niche, **bio E-E-A-T** FR + EN via `humaniser-fr`, **avatar** 1:1, **page auteur**), le câbler comme **auteur par défaut**, **ré-attribuer les articles existants** (frontmatter + JSON-LD author), et le transmettre à la tâche de rédaction du site. Unique au site.
- **GEO / structure article** (doctrine `seo-geo-redaction`) : articles non conformes (< 70 % H2-questions, pas de réponse-first, FAQ incomplète, JSON-LD/aiSummary manquant, année en dur) → **reformuler les H2 en questions** (≥ 70 %), ajouter la **réponse directe < 60 mots en tête de H2** (Answer-Explanation-Example), compléter la **FAQ à 6-7**, ajouter **TL;DR/aiSummary**, ajouter le **JSON-LD**, années dynamiques. Édition de structure (pas une réécriture complète) → léger ; refonte de fond → correctif lourd plafonné.
- **Images** : générer les **cover de catégorie manquantes** (16:9) ET **vérifier qu'elles s'affichent** sur la page catégorie ; **featured manquantes ou doublons** (16:9, unique) ; ajouter **~2 images in-body réutilisées** aux articles qui n'en ont pas ; chemins cassés.
- **Légal & RGPD** : pages légales en **noindex** + infos société exactes (MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique) ; **bandeau cookies RGPD** s'il manque (léger/discret, Accepter/Refuser, lien politique, choix mémorisé, aucun tracker non essentiel avant consentement, FR + EN, tokens). Vérifier que le composant est **monté dans le layout**, pas seulement créé.
- **Responsive (zéro scroll horizontal)** : largeurs fixes → responsive, tableaux/code en `overflow-x-auto`, `max-width:100%` médias, meta `viewport`, `break-words`, supprimer `100vw`/`min-w` qui débordent. Objectif **0 scroll horizontal** à 320/375/768/1024/1440.
- **DA / tokens (mécanique)** : hex en dur dans `app/`/`components/` → **tokens `globals`** ; **couleurs en dur dans `volteo.css :root` = bug** → la DA doit passer par **`niche.config.palette`** (+ fonts dans `layout.tsx`), JAMAIS par des valeurs écrites dans `volteo.css :root` (qui n'est qu'une couche d'alias) ; contraste AA ; mode light/dark fixe (pas de mélange) — **sans changer la direction/identité du site** (cf. À SIGNALER pour la refonte).

### Correctifs LOURDS (contenu) — priorisés et PLAFONNÉS
- **Thin content < 800 mots** : réécrire/enrichir à ≥ 800 mots, sourcé, via `humaniser-fr` + structure `seo-geo-redaction`, FR + EN, **signé par l'auteur du site**.
- **Traductions EN manquantes** : créer la contrepartie EN (et inversement) + câbler alternance/hreflang.
- **PLAFOND : ~15 opérations lourdes max par run**, du plus en défaut au moins. Logue le reste.

### À SIGNALER sans refonte auto
- **Type de home incohérent avec le NDD** : refonte risquée → **signale dans le log**, ne refonds pas automatiquement (sauf cas trivial).
- **DA sans direction assumée / skin générique** (pas une des 5 directions de `docs/DA-DIRECTIONS.md`, palette non mutée, look « comparateur » indifférencié) : changer la **direction ou la palette d'un site live** est visuellement disruptif → **signale-le** (direction recommandée selon la niche + mutation suggérée), **ne refonds PAS la DA automatiquement**. Seuls les correctifs d'identité **mécaniques** s'appliquent ici : logo / favicon / OG = **mark SVG unique** (cf. Identité de marque ci-dessus).

### Règles
- Édits ciblés et minimaux. Correctif ambigu/risqué → NE PAS tenter, logue-le.
- Idempotent : déjà en place → passe. Ne supprime jamais de contenu, ne casse jamais l'existant.
- Commits clairs (Conventional Commits) par type. **Le push sur `main` redéploie Vercel automatiquement.**

## 3 — Journal des corrections
`pipeline/fixes/fix-AAAA-MM-JJ.md` dans `emd-project/emd-methodo` : par site, corrigé vs **reporté** (plafond, risqué, home type / direction DA à revoir) vs **à vérifier** (câblage non prouvé). N'écrase PAS l'audit.

## 4 — Rapport de run
Sites touchés, correctifs mécaniques (dont RGPD/responsive/identité/auteur/GEO/logo-favicon-OG), opérations lourdes faites vs reportées, **directions de DA signalées (refonte non auto)**, **assets dont le câblage reste à confirmer**, problèmes restants.

## Contraintes
- Prod sur `main` : précision, idempotence, zéro casse.
- **Corriger la source RENDUE (§0) + vérifier le câblage** — jamais un fichier au bon nom non câblé.
- FR + EN (jamais NL) ; contenu/featured 16:9, favicon/logo/avatar 1:1, featured unique + 2 images in-body ; **auteur persona unique (jamais « la rédaction »)** ; **GEO : ≥ 70 % H2-questions + réponse-first + FAQ 6-7** ; bandeau cookies RGPD monté ; 0 scroll horizontal ; texte via `humaniser-fr`.
- **Identité DA : logo/favicon/OG = mark SVG unique (mécanique) ; direction/palette d'un site live = signalée, jamais refondue auto. DA via `niche.config.palette`, jamais `volteo.css :root`.**
- Respecte le plafond d'opérations lourdes.
