---
name: emd-fix
version: 1.6.1
description: Corrige les sites EMD directement sur main — MANDAT ÉLARGI : ose les gros chantiers (refonte de DA d'un site sans direction, restructuration de page, reconstruction de la liaison i18n FR↔EN, réécriture de plusieurs articles), pas seulement des correctifs de surface. Couvre aussi le mécanique (alt, next/image, OG/JSON-LD, sitemap, multilingue, images, favicon/logo, auteur/persona E-E-A-T, légal noindex + société, cookies RGPD, responsive zéro scroll horizontal, GEO : H2-questions/réponse-first/FAQ, identité DA). Corrige la SOURCE réellement rendue et garde le build cohérent (énumère les consommateurs avant tout renommage). À utiliser quand on dit « corrige les sites », « applique les fixes », « refais la DA / l'i18n / l'auteur / la GEO », ou depuis les tâches planifiées hebdo. ÉCRIT EN PROD sur main : ose, mais zéro perte de données.
---

# emd-fix — Correction des sites EMD (mandat élargi)

Tu corriges les problèmes du dernier audit **directement sur `main`** de chaque site. **N'ose pas à moitié** : un site doit ressortir **matériellement meilleur**, pas juste rafistolé en surface. Tu es autorisé à entreprendre de **gros chantiers** (cf. § Mandat). La prod est surveillée sur Vercel par l'humain.

> **v1.6.1 — périmètre hérité (pas de re-scan du parc)** : le rapport d'audit consommé est désormais
> **RESTREINT aux nouveaux sites (≤ 14 j, non déjà audités)** — cf. `emd-audit` v1.6. Tu ne corriges donc
> QUE les sites présents dans ce rapport. **NE va JAMAIS chercher d'autres sites du parc** ni re-corriger
> un site absent du rapport (économie de tokens + on ne churn pas les sites déjà stabilisés).

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file`, `github_commit_batch`, `generate_image`, `wait_for_image` (MCP nano-mentionbox). Lis aussi `skills/humaniser-fr/SKILL.md` (anti-IA) et `skills/seo-geo-redaction/SKILL.md` (structure GEO) pour tout correctif de contenu.

**Avant toute écriture, applique `references/garde-fous.md`** (emd-methodo). Deux choses à retenir : (1) **INVARIANT ABSOLU** — jamais de read-modify-write juste après un write, vérifier non-vide avant commit, ne jamais écraser du contenu par du vide, ne jamais réduire un article à un stub ; (2) **cohérence build** — avant de renommer/déplacer un symbole (type, champ, export, props), **énumère TOUS ses consommateurs dans le repo et mets-les à jour dans le même commit** (un renommage qui laisse une référence pendante = build cassé).

## Mandat — OSE les gros chantiers (mais idempotents)
Tu n'es plus limité aux retouches mécaniques. Quand l'audit révèle un défaut de fond, **traite-le pour de vrai** :
- **DA / identité** : un site **sans direction assumée** (skin générique, palette non mutée, logo « éclair » par défaut, **variante home = `comparateur` par réflexe**) → **refais sa DA** : applique l'une des 5 directions de `docs/DA-DIRECTIONS.md`, mute-la (unique, anti-footprint), **remets une variante home issue de `suggestVariants` si elle est en comparateur générique**, dessine un **vrai mark SVG** (logo inline `Nav.tsx` + favicon `app/icon.svg` + OG). Une fois la DA propre, **n'y retouche plus** (idempotent — on ne la churn pas chaque semaine).
- **Structure de page / type de home** incohérent avec le NDD → **restructure** (sections, archétype), sans homogénéiser le réseau.
- **Liaison i18n FR↔EN** cassée/absente → **reconstruis-la** : crée les fichiers EN manquants (`content/blog/en/<cat>/<slug-en>.mdx`, même slug de catégorie que le FR) + remplis le **mapping** que le sélecteur consomme réellement (article-slugs / pathnames selon le site) + hreflang réciproque. Vérifie le rendu du corps EN, pas juste un 200.
- **Contenu** : réécris **autant d'articles** que nécessaire (thin content, GEO non conforme), pas un quota symbolique.
- Tout chantier reste soumis à l'INVARIANT anti-perte-de-données et à la cohérence build.

## 0 — Principe : corriger la SOURCE rendue, pas le fichier au bon nom (anti correctif fantôme)
Un commit qui édite un fichier **non câblé** ne change rien à l'écran = **correctif fantôme**. Avant de « corriger » un asset, TRACE ce qui est réellement rendu, corrige là, puis **vérifie le câblage**.
- **Logo header** : souvent un **SVG inline dans `Nav.tsx`/`Header.tsx`**, PAS `public/.../logo.svg`. Corrige le tracé **dans le composant qui le rend**.
- **Favicon** : convention **`app/icon.svg` / `app/icon.png` / `app/favicon.ico`** (Next émet le `<link rel="icon">`). Un `public/favicon.svg` non référencé n'est PAS servi.
- **OG / Twitter image** : un **`app/opengraph-image.(tsx|png)`** prime sur un OG statique + metadata. Vérifie sa présence avant d'éditer un fichier OG.
- **Cover de catégorie** : vérifie que la page catégorie **rend** la cover (composant/champ), pas seulement qu'un fichier existe.
- **Auteur** : l'auteur affiché vient du `author`/`authorSlug` résolu par la config/`AuthorByline` — change la **source** + ré-attribue.

**Vérification post-fix** : confirme que le correctif est dans le **chemin de rendu**. Sinon **logue « à vérifier »** plutôt que « corrigé ».

## 1 — Charger la to-do (périmètre déjà restreint)
Lis `pipeline/audits/<domaine>-LATEST.md` (ex. `ux-LATEST.md`, `content-LATEST.md`) dans `emd-project/emd-methodo`. Absent → « Aucun audit disponible », stop. **Ce rapport ne contient QUE les nouveaux sites (≤14j, non déjà audités)** — ton périmètre = **exactement ces sites**, rien d'autre. Site ciblé manuellement → ne traite que celui-là. Priorise **❌ d'abord, puis ⚠️** (RGPD, responsive, auteur, i18n, GEO, DA en tête).

## 2 — Corriger chaque site (commits sur `main`, un site à la fois)

### Correctifs MÉCANIQUES (partout où l'audit les signale)
- On-page/A11y/SEO : `alt` descriptifs, `<img>` → `next/image`, OpenGraph + Twitter + **JSON-LD** (Article/FAQ/Breadcrumb/Person), `sitemap.xml` (2 locales), `robots.txt`, `canonical` ; retirer tout `noindex/nofollow` accidentel sur le contenu.
- Multilingue : **sélecteur de langue importé ET rendu** ; **liens d'alternance FR↔EN** vers l'article équivalent (cf. Mandat pour la reconstruction de fond) ; hreflang réciproque + `lang`.
- **Identité de marque** : favicon/logo générique/cloné → **mark SVG unique** câblé (cf. §0 + Mandat DA).
- **Auteur / E-E-A-T** : « la rédaction »/générique/vide/**nom de famille** → **persona unique** (prénom seul ou prénom + initiale, bio E-E-A-T FR+EN via `humaniser-fr`, avatar, page auteur), câblé en auteur par défaut + **ré-attribution** des articles (frontmatter + JSON-LD).
- **GEO / structure** (doctrine `seo-geo-redaction`) : < 70 % H2-questions, pas de réponse-first, FAQ incomplète, JSON-LD/aiSummary manquant, année en dur, **accords de genre faux** → reformuler en questions (≥70 %), réponse < 60 mots en tête de H2, FAQ 6-7, TL;DR, JSON-LD, années dynamiques, accords via `lib/utils/grammar.ts`/`entityGender`.
- **Images** : covers de catégorie manquantes (16:9) **rendues** ; featured manquantes/doublons (unique 16:9) ; ~2 images in-body ; chemins cassés.
- **Légal & RGPD** : pages légales **noindex** + société (MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne) ; **bandeau cookies RGPD monté dans le layout** (Accepter/Refuser, lien politique, rien d'non-essentiel avant consentement, FR+EN).
- **Responsive** : 0 scroll horizontal à 320/375/768/1024/1440 (largeurs fixes→responsive, overflow-x sur tableaux/code, médias max-width:100%, viewport, break-words).
- **DA / tokens** : hex en dur → tokens `globals` ; **valeurs en dur dans `volteo.css :root` = bug** → DA via `niche.config.palette` (+ fonts dans `layout.tsx`) ; contraste AA ; mode light/dark fixe.

### Correctifs LOURDS & gros chantiers (cf. Mandat) — pas de plafond artificiel
- **Thin content / GEO de fond** : réécris à ≥ 800 mots, sourcé, via `humaniser-fr` + `seo-geo-redaction`, FR+EN, signé par l'auteur. **Traite tous les articles en défaut** (priorise les pires d'abord), ne te bride pas à un quota.
- **Traductions EN manquantes** : crée la contrepartie EN (+ mapping + hreflang) — reconstruction i18n complète si besoin (cf. Mandat).
- **Refonte DA / restructuration** : cf. Mandat — fais-le bien, une fois, puis idempotent.
- Si un run est très long, ordonne par sévérité et **loggue ce qui reste** pour le prochain run — mais ne refuse pas un chantier juste parce qu'il est gros.

### Règles
- INVARIANT anti-perte-de-données (garde-fous §1) **non négociable**, même en gros chantier.
- Cohérence build : énumère les consommateurs avant tout renommage/refactor.
- Idempotent : déjà bon → passe. Ne supprime jamais de contenu existant.
- Commits clairs (Conventional Commits) par type. Le push sur `main` redéploie Vercel automatiquement.

## 3 — Journal des corrections
`pipeline/fixes/fix-AAAA-MM-JJ.md` (emd-methodo) : par site, corrigé (dont **gros chantiers entrepris**) vs reporté (au prochain run, avec raison) vs à vérifier (câblage non prouvé). N'écrase PAS l'audit.

## 4 — Rapport de run
Sites touchés, mécaniques + **gros chantiers réalisés** (DA refaite, i18n reconstruite, N articles réécrits…), reportés, **assets dont le câblage reste à confirmer**, problèmes restants.

## Contraintes
- **Périmètre = uniquement les sites du rapport d'audit (nouveaux ≤14j)** ; jamais de re-scan / re-fix du parc stabilisé.
- Prod sur `main` : **ose les gros chantiers**, mais zéro perte de données et code compilable (énumère les consommateurs).
- Corriger la source RENDUE (§0) + vérifier le câblage.
- FR + EN (jamais NL) ; contenu/featured 16:9, favicon/logo/avatar 1:1 ; **auteur persona unique (prénom seul / prénom + initiale)** ; **GEO ≥ 70 % H2-questions** ; cookies RGPD monté ; 0 scroll horizontal ; texte via `humaniser-fr`.
- **DA** : refonte autorisée pour un site sans direction (1 des 5, mutée, unique, mark SVG, **variante home ≠ comparateur générique**), puis idempotent ; DA via `niche.config.palette`, jamais `volteo.css :root`.
