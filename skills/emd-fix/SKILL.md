---
name: emd-fix
version: 1.2.0
description: Corrige automatiquement les problèmes d'un audit EMD directement sur la branche main des sites — correctifs mécaniques (alt, next/image, OG/JSON-LD, sitemap, multilingue, images, favicon/logo, auteur/persona E-E-A-T, pages légales noindex + infos société, bandeau cookies RGPD, responsive zéro scroll horizontal, covers de catégorie) + correctifs lourds plafonnés (réécriture thin content ≥ 800 mots, traductions EN manquantes). À utiliser quand on dit « corrige les sites depuis l'audit », « applique les fixes », « répare le multilingue / les images / le responsive / le RGPD / l'auteur », ou depuis la tâche planifiée hebdomadaire. ÉCRIT EN PROD : précis, idempotent, zéro casse.
---

# emd-fix — Correction automatique des sites EMD

Tu corriges les problèmes du dernier audit **directement sur `main`** de chaque site. Tu agis en prod : édits ciblés, minimaux, idempotents, jamais de casse.

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file`, `github_commit_batch`, `generate_image`, `wait_for_image` (MCP nano-mentionbox). Plus les skills emd-methodo, dont `humaniser-fr`.

## Paramètres par défaut
- Langues : **FR + EN** uniquement (jamais NL).
- Images : `generate_image` en **16:9** pour contenu/hero/couverture/featured (jamais 2:1) ; **favicon, logo et avatar auteur en 1:1** ; **featured image UNIQUE par article**.
- Tout texte créé/réécrit via **`humaniser-fr`**. DA : garde chaque site **UNIQUE** (ne jamais homogénéiser).

## 1 — Charger la to-do
Lis `pipeline/audits/LATEST.md` dans `emd-project/emd-methodo`. Note sa date. Absent → « Aucun audit disponible », stop. Site ciblé → ne traite que celui-là. Priorise **❌ d'abord, puis ⚠️** (RGPD, responsive, auteur en tête).

## 2 — Corriger chaque site (commits sur `main`, un site à la fois)

### Correctifs MÉCANIQUES (partout où l'audit les signale)
- On-page/A11y/SEO : `alt` descriptifs, `<img>` → `next/image`, OpenGraph + Twitter + **JSON-LD** (Article/FAQ/Breadcrumb), `sitemap.xml` (2 locales), `robots.txt`, `canonical` ; retirer tout `noindex/nofollow` accidentel sur le contenu.
- Multilingue : monter le **sélecteur de langue** ; réparer les **liens d'alternance FR↔EN** (vers l'article équivalent, pas la home) ; hreflang réciproque + attribut `lang`.
- **Identité** : favicon manquant/générique → générer un favicon UNIQUE (1:1) ; logo manquant/générique/cloné → générer un logo UNIQUE (1:1) et le câbler (header/nav + `niche.config`).
- **Auteur / E-E-A-T** : si les articles sont signés « la rédaction » / auteur générique / vide → **créer un persona auteur UNIQUE** (prénom + nom réalistes, spécialité liée à la niche, **bio E-E-A-T** FR + EN via `humaniser-fr`, **avatar** généré 1:1, **page auteur**), le câbler comme **auteur par défaut**, **ré-attribuer les articles existants** à cet auteur (frontmatter + JSON-LD author), et transmettre l'auteur à la tâche de rédaction du site. Unique au site (jamais réutilisé d'un autre site).
- **Images** : générer les **cover de catégorie manquantes** (16:9) ET **les wirer dans la page catégorie** (rendu) ; générer les **featured manquantes ou dédoublonner** (16:9, unique) ; ajouter **~2 images in-body réutilisées** du pool aux articles qui n'en ont pas (sans nouvelle génération) ; corriger les chemins cassés.
- **Légal & RGPD** : pages légales en **noindex** + infos société exactes (MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique) ; **ajouter le bandeau cookies RGPD** s'il manque (léger/discret, Accepter/Refuser, lien politique, choix mémorisé, aucun tracker non essentiel avant consentement, FR + EN, tokens).
- **Responsive (zéro scroll horizontal)** : remplacer largeurs fixes par responsive, wrapper tableaux/code en `overflow-x-auto`, `max-width:100%` médias, ajouter le meta `viewport`, `break-words`, supprimer les `100vw`/`min-w` qui débordent. Objectif **0 scroll horizontal** à 320/375/768/1024/1440.
- DA : hex en dur → tokens ; corriger le contraste — sans changer l'identité unique du site.

### Correctifs LOURDS (contenu) — priorisés et PLAFONNÉS
- **Thin content < 800 mots** : réécrire/enrichir à ≥ 800 mots, sourcé, via `humaniser-fr`, FR + EN, **signé par l'auteur du site**.
- **Traductions EN manquantes** : créer la contrepartie EN (et inversement) + câbler alternance/hreflang.
- **PLAFOND : ~15 opérations lourdes max par run**, du plus en défaut au moins. Logue le reste.

### À SIGNALER sans refonte auto
- **Type de home incohérent avec le NDD** : refonte risquée → **signale dans le log**, ne refonds pas automatiquement (sauf cas trivial).

### Règles
- Édits ciblés et minimaux. Correctif ambigu/risqué → NE PAS tenter, logue-le.
- Idempotent : déjà en place → passe. Ne supprime jamais de contenu, ne casse jamais l'existant.
- Commits clairs (Conventional Commits) par type. **Le push sur `main` redéploie Vercel automatiquement.**

## 3 — Journal des corrections
`pipeline/fixes/fix-AAAA-MM-JJ.md` dans `emd-project/emd-methodo` : par site, corrigé vs **reporté** (plafond, risqué, home type à revoir). N'écrase PAS l'audit.

## 4 — Rapport de run
Sites touchés, correctifs mécaniques (dont RGPD/responsive/identité/auteur), opérations lourdes faites vs reportées, problèmes restants.

## Contraintes
- Prod sur `main` : précision, idempotence, zéro casse.
- FR + EN (jamais NL) ; contenu/featured 16:9, favicon/logo/avatar 1:1, featured unique + 2 images in-body ; **auteur persona unique (jamais « la rédaction »)** ; bandeau cookies RGPD ; 0 scroll horizontal ; texte via `humaniser-fr` ; DA unique préservée.
- Respecte le plafond d'opérations lourdes.
