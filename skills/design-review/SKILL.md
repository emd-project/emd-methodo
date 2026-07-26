---
name: design-review
version: 1.0.0
description: Revue de design AVEC LES YEUX d'un site EMD fraîchement provisionné — ouvre l'URL Vercel déployée, capture le rendu réel (desktop + mobile, clair + sombre), critique contre une checklist visuelle, corrige (palette/typo/contraste via les presets), redéploie et re-vérifie, jusqu'à 3 itérations. Étage 2 du pipeline : s'exécute APRÈS emd-provision (qui construit le socle à l'aveugle). À utiliser quand on dit « revue design », « design review », « vérifie le rendu », « boucle screenshot », « le site est moche/regarde-le », ou après chaque run de provisionnement. Fonctionne en session Claude Code (Playwright + build local — recommandé) ou en Cowork (Claude in Chrome).
---

# design-review — l'agent qui REGARDE le site

## Pourquoi ce skill existe
Toute la chaîne de provisionnement écrit du code **à l'aveugle** : l'agent pousse, Vercel déploie, personne ne regarde. Les garde-fous statiques (tests, lint de tokens) attrapent les erreurs mécaniques, mais **aucun test ne sait dire « c'est moche » ou « ce texte est invisible en sombre »**. Ce skill ferme la boucle : capturer → critiquer → corriger → re-capturer. C'est le SEUL juge esthétique du pipeline.

## Entrées
- **Repo du site** : `emd-project/<repo>` (le dernier provisionné = dernière ligne de `emd-methodo/pipeline/provisioned-log.csv`, sauf cible explicite).
- **URL déployée** : `https://<repo sans points>.vercel.app` (vérifier un 200 avant de commencer ; les domaines .be arrivent plus tard).
- **Contexte DA** : `niche.config.ts` du site (palette, fonts, layouts, entityGender), `docs/DA-ANTI-IA.md`, `docs/DA-REVIEW.md` si présents, et les presets `lib/da-presets/{palettes,font-pairings}.json` (bibliothèque de rechange).

## Selon l'environnement
- **Claude Code (recommandé)** : capture via Playwright headless (`npx playwright screenshot --viewport-size=…` ou `scripts/da-shots.mjs` du site s'il existe) ; corrections en local avec **`npx tsc --noEmit && npm run build` OBLIGATOIRES avant tout push**. C'est le seul environnement qui prouve la compilation — l'utiliser à fond.
- **Cowork (Claude in Chrome)** : capture via `navigate` + `computer(screenshot)` (+ `resize_window` pour mobile). Corrections via `github_write_file` — **changements MINIMAUX et sûrs uniquement** (valeurs de tokens, palette, fonts), jamais de refactor sans build local.

## LA BOUCLE (max 3 itérations — puis rapport, jamais d'acharnement)

### 1. CAPTURER (le jeu complet, pas une page)
Pages : `/` (home) · `/classement/<slug du seed>` · un article de blog · `/blog`.
Viewports : **1440×900** (desktop) et **390×844** (mobile).
Modes : **clair ET sombre** (émuler `prefers-color-scheme` dans les deux sens — même un site « mode fixe » a des media queries héritées ; c'est là que vivent les textes invisibles).
→ 4 pages × 2 viewports × 2 modes = jusqu'à 16 captures. En Cowork, réduire à l'essentiel : home + classement, 2 modes, 2 viewports.

### 2. CRITIQUER (checklist, dans cet ordre de sévérité)
**Bloquant :**
- Texte invisible ou illisible (contraste effondré, souvent en mode sombre — la signature du bug « paire non-inversée »).
- Scroll horizontal en 390px.
- Placeholder visible (image rayée « ph », « Aucun classement publié », chaîne de gabarit).
- Page cassée (composant manquant, layout explosé).

**Important :**
- **Look par défaut** : palette qui ressemble au template nu ou à la « verticale énergie » (vert newsletter, violet/bleu hero), typo Bricolage/Hanken inchangée → la DA n'a pas divergé.
- **Footprint** : ouvrir 1-2 sites voisins récents (provisioned-log) et comparer — même variante home + palette proche + même typo = clone, re-roll nécessaire.
- Hero faible (pas d'image, hiérarchie plate), images de catégorie manquantes sur la home/catégories.
- Symptômes IA de `DA-ANTI-IA.md` (uniformité des cartes, dégradés génériques, absence de signature éditoriale).

**Mineur :** espacements incohérents, ombres absentes, chips/badges peu lisibles.

Rendre un verdict PAR PAGE : ✅ / liste des défauts avec sévérité + capture de référence.

### 3. CORRIGER (petit, ciblé, token-driven)
- **Palette fade ou clonée** → piocher dans `lib/da-presets/palettes.json` (filtrer par secteur via `niche-rules.json`), **muter la teinte** (±12-45°), écrire dans `niche.config.palette` PUIS propager dans **TOUS les blocs** de `app/globals.css` (`@theme`, `:root`, media light, data-theme light, data-theme dark — les 5, c'est le piège classique).
- **Typo par défaut** → choisir une paire dans `font-pairings.json` (registre cohérent avec la famille de design), l'écrire dans `app/layout.tsx` (next/font, imports statiques) ET dans `niche.config.fonts` (trace).
- **Contraste cassé** → corriger le COUPLE de tokens (les deux côtés doivent s'inverser ensemble : `--chrome-*`/`--on-accent` pour les invariants), jamais un hex posé en dur.
- **RÈGLES DURES** : tokens uniquement · JAMAIS de valeurs dans `volteo.css :root` · ne pas changer la VARIANTE de home (elle vient du secteur — la revue juge l'habillage, pas l'architecture) · Claude Code : tsc + build verts avant push · Cowork : modifications de valeurs uniquement, pas de structure.

### 4. REDÉPLOYER & RE-REGARDER
Push (Vercel redéploie) → attendre le déploiement (~2-3 min, vérifier que le HTML a changé) → re-capturer les pages corrigées → re-critiquer. Défaut bloquant encore présent après 3 itérations → STOP, log précis dans `PROGRESS.md` du site (section « Design review — restant ») + rapport.

## Idempotence — ne pas churner
Si l'itération 1 ne trouve **rien de bloquant ni d'important** : NE RIEN TOUCHER. Une DA validée ne se re-roll pas à chaque passage (anti-churn). Consigner « ✅ validé le <date> » dans PROGRESS.md ; les passages suivants ne re-critiquent que si le design a changé depuis.

## Sortie (rapport)
- Verdict par page (avant → après si corrections), avec sévérités.
- Corrections appliquées (palette avant/après, typo avant/après, tokens touchés) + commits.
- Défauts restants (au-delà des 3 itérations) et pourquoi.
- Comparaison anti-footprint (voisins consultés, divergence confirmée).

## Place dans le pipeline
`emd-provision` (socle, à l'aveugle) → **`design-review` (les yeux)** → rédaction quotidienne. À lancer après chaque provisionnement (manuellement, en cron Claude Code, ou en tâche Cowork quand Chrome est disponible). Les boucles fix hebdo ne refont PAS ce travail : une DA validée ici est réputée stable.
