---
name: emd-hero-classement-2col
description: Propage le hero classement en 2 colonnes (intro + « En bref ») du template vers chaque site EMD. 2 sites/heure, chirurgical (préserve les libellés du fork), idempotent, s'auto-désactive.
---

Tu propages une amélioration de mise en page des pages **classement** depuis `emd-project/emd-template` vers les sites EMD : **2 sites par run**. Tâche autonome, sans utilisateur présent.

OUTILS : MCP nano-mentionbox uniquement (`github_list_repos`, `github_read_file`, `github_write_file`). Pas de build, pas de déploiement à déclencher (le push suffit).

## L'AMÉLIORATION (3 changements, rien d'autre)
Le hero de `/classement/[produit]` laissait un tiers de page vide à droite. Désormais :
1. **Hero en 2 colonnes** : l'intro (bornée à `maxWidth: 620`) à gauche, et un **encart « En bref »** (les puces `c.tldr`) à droite. Conteneur : `display:flex, flexWrap:'wrap', alignItems:'flex-start', gap:'var(--space-7)'` ; colonne texte `flex:'1 1 420px', minWidth:0, maxWidth:620` ; aside `flex:'1 1 280px', minWidth:0, maxWidth:380`. **Aucune media query** (ça s'empile tout seul en mobile).
2. **`showTldr={false}`** passé à `<ClassementList>` — sinon le « En bref » s'afficherait deux fois.
3. `ClassementList` accepte la prop **`showTldr?: boolean` (défaut `true`)** et les paragraphes de l'analyse long-form sont bornés à `maxWidth: '68ch'`.

## SOURCE DE VÉRITÉ (à relire à CHAQUE run)
Lis ces 3 fichiers dans `emd-project/emd-template` (branche `main`) — c'est le modèle de référence :
- `components/classement/ClassementList.tsx`
- `app/(site)/classement/[produit]/page.tsx`
- `app/en/classement/[produit]/page.tsx`

## 1 — Liste des sites
`github_list_repos` → repos `emd-project/*` ayant un `niche.config.ts`.
**EXCLUS** : `emd-template`, `emd-methodo`, `mentionbox-seo`, `test-be`, et tout repo hors de `emd-project`.
⚠️ Utilise la **branche par défaut RÉELLE de chaque repo** (ce n'est pas toujours `main` : `meilleure-voiture-electrique` et `meilleure-carte-credit.be` ont une branche `claude/...`).

## 2 — Idempotence et éligibilité (AVANT de modifier quoi que ce soit)
Pour chaque site candidat :
- Si `components/classement/ClassementList.tsx` **contient déjà `showTldr`** → **déjà fait**, passe au suivant.
- Si `app/(site)/classement/[produit]/page.tsx` **n'existe pas** → site sans page classement, saute-le (signale-le).
Traite les **2 PREMIERS sites éligibles non encore faits**, puis arrête-toi.
**S'il ne reste plus aucun site à traiter** : ne modifie rien et **désactive cette tâche** via `mcp__scheduled-tasks__update_scheduled_task` (taskId `emd-hero-classement-2col`, `enabled: false`), puis rapporte « Propagation terminée — tâche désactivée ».

## 3 — Application CHIRURGICALE (ne copie pas bêtement le fichier du template)
Les forks ont des **libellés, un ton et parfois des ajustements qui leur sont propres**. Tu appliques donc les 3 changements **dans le fichier du fork**, en préservant tout le reste :
- **`ClassementList.tsx`** : ajoute `showTldr?: boolean` au type `Props`, la valeur par défaut `showTldr = true` dans la signature, la condition `showTldr && ...` devant le bloc TL;DR, et `maxWidth: '68ch'` sur les `<p>` des `sections`. **Ne touche à rien d'autre.**
- **Les 2 `page.tsx`** : remplace le `<p>` de l'intro (et le `<p>` « Mis à jour » / « Updated ») par le conteneur flex à 2 colonnes décrit plus haut, avec l'aside « En bref » alimenté par `c.tldr` ; ajoute `const hasTldr = Boolean(c.tldr && c.tldr.length > 0)` ; passe `showTldr={false}` à `<ClassementList>`. **Garde les LABELS, les textes, le fil d'Ariane, le JSON-LD et les conditions de CTA du fork tels quels** — l'étiquette de l'encart doit être **`LABELS.tldr` du fork**, pas une chaîne en dur.
- Si le fichier du fork **diverge nettement** du modèle (composants supplémentaires, structure de hero différente, sections custom) au point que tu ne peux pas appliquer proprement les 3 changements : **NE MODIFIE RIEN pour ce site**, signale-le dans le rapport avec la raison. Un site sauté vaut mieux qu'un site cassé.

## 4 — Vérification avant écriture (tu ne peux pas compiler)
Pour chaque fichier réécrit : relis-le en entier, vérifie que **chaque symbole importé existe** dans le fork (`c.tldr` existe bien sur le type `Classement`, `LABELS.tldr` est défini, `var(--space-7)` est utilisé ailleurs dans le repo), que le JSX est équilibré, et qu'aucune variable n'est référencée sans être déclarée. **Une erreur de type casse le déploiement du site.**

Écris avec `github_write_file` (`overwrite: true`) sur la branche par défaut du repo. Message de commit :
`feat(classement): hero 2 colonnes — intro + « En bref » (fin du vide à droite)`

## 5 — Garde-fous (durs)
- **Ne touche QUE ces 3 fichiers.** Jamais `niche.config.ts`, jamais les données (`content/data/*`), jamais le contenu.
- **2 sites MAXIMUM par run.**
- Aucune branche, aucune PR, aucun workflow.
- En cas de doute sur un fork → saute-le et signale-le. Ne devine jamais.

## 6 — Rapport (court)
Par site : domaine · branche · 3 fichiers modifiés (ou raison du saut) · liens de commit. Puis le **nombre de sites restants**. Si tu as désactivé la tâche, dis-le.