---
name: emd-fix
version: 1.0.0
description: Corrige automatiquement les problèmes remontés par un audit EMD, directement sur la branche main des sites — correctifs mécaniques partout (alt, next/image, OG/JSON-LD, sitemap, multilingue, images manquantes/doublons, hex→tokens) + correctifs lourds plafonnés (réécriture du thin content ≥ 800 mots, traductions EN manquantes). À utiliser quand on dit « corrige les sites depuis l'audit », « applique les fixes », « répare le multilingue / les images / le SEO », ou depuis la tâche planifiée de correction hebdomadaire. ÉCRIT EN PROD : précis, idempotent, zéro casse.
---

# emd-fix — Correction automatique des sites EMD

Tu corriges les problèmes du dernier audit **directement sur `main`** de chaque site. Tu agis en prod : édits ciblés, minimaux, idempotents, jamais de casse.

Outils : `github_read_file`, `github_list_files`, `github_list_repos`, `github_write_file`, `github_commit_batch`, `generate_image`, `wait_for_image` (MCP nano-mentionbox). Plus les skills emd-methodo, dont `humaniser-fr`.

## Paramètres par défaut
- Langues : **FR + EN** uniquement (jamais NL).
- Images : `generate_image` en **16:9 uniquement** (jamais 2:1) ; **featured image UNIQUE** par article.
- Tout texte créé/réécrit passe par **`humaniser-fr`**. DA : garde chaque site **UNIQUE** (ne jamais homogénéiser les sites entre eux).

## 1 — Charger la to-do
Lis `pipeline/audits/LATEST.md` dans `emd-project/emd-methodo` (dernier audit produit par `emd-audit`). Note sa date. Absent → « Aucun audit disponible, rien à corriger », stop.
Si l'utilisateur cible un site précis, ne traite que celui-là.
Priorise : **❌ (bloquant) d'abord, puis ⚠️**.

## 2 — Corriger chaque site (commits sur `main`, un site à la fois)

### Correctifs MÉCANIQUES (partout où l'audit les signale)
- On-page/A11y/SEO : `alt` descriptifs, `<img>` → `next/image`, OpenGraph + Twitter card + **JSON-LD** (Article/FAQ/Breadcrumb), réparer/compléter `sitemap.xml` (2 locales), `robots.txt`, `canonical` ; retirer tout `noindex/nofollow` accidentel.
- Multilingue : monter le **sélecteur de langue** s'il manque ; réparer les **liens d'alternance FR↔EN** (pointer vers l'article équivalent, pas la home) ; corriger hreflang réciproque + attribut `lang`.
- Images : générer les **cover de hub** manquantes et les **featured images manquantes ou en doublon** (16:9, unique par article) ; corriger les chemins cassés.
- DA : remplacer les hex en dur par les tokens ; corriger les paires de contraste — sans changer l'identité unique du site.

### Correctifs LOURDS (contenu) — priorisés et PLAFONNÉS
- **Thin content < 800 mots** : réécrire/enrichir à ≥ 800 mots, sourcé, via `humaniser-fr`, en FR + EN.
- **Traductions EN manquantes** : créer la contrepartie EN des articles FR (et inversement), via `humaniser-fr`, puis câbler le lien d'alternance + hreflang.
- **PLAFOND : ~15 opérations lourdes (réécritures + traductions) max par run**, en commençant par les sites/articles les plus en défaut. Logue le reste pour la fois suivante.

### Règles
- Édits ciblés et minimaux. Correctif ambigu ou risqué → NE PAS tenter, logue-le.
- Idempotent : correctif déjà en place → passe.
- Ne supprime jamais de contenu. Ne casse jamais une fonctionnalité qui marche.
- Commits clairs (Conventional Commits) par type de correctif. **Le push sur `main` déclenche automatiquement le redéploiement Vercel** (projets git-liés) — pas besoin d'appeler un outil de déploiement.

## 3 — Journal des corrections
Écris `pipeline/fixes/fix-AAAA-MM-JJ.md` dans `emd-project/emd-methodo` : par site, ce qui a été corrigé et ce qui a été **reporté** (plafond lourd, correctifs risqués sautés). N'écrase PAS le fichier d'audit.

## 4 — Rapport de run
Sites touchés, nombre de correctifs mécaniques, opérations lourdes faites vs reportées, problèmes restants prioritaires.

## Contraintes
- Agit en prod sur `main` : précision, idempotence, zéro casse.
- FR + EN (jamais NL) ; images 16:9 uniques ; texte via `humaniser-fr` ; DA de chaque site préservée et unique.
- Respecte le plafond d'opérations lourdes pour garder le run tractable.
