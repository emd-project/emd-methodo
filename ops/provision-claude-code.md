# Provisionnement EMD sous Claude Code (build + yeux intégrés)

Remplace la tâche Cowork `emd-provision-sites`. Pourquoi Claude Code : **exécution locale**
(`tsc` + `next build` + `vitest` AVANT chaque push — fini les builds rouges découverts sur Vercel)
et **Playwright** (l'agent VOIT le site déployé et itère sur le design dans le même run).

## Partage des rôles (important)
- **Claude Code (ce document)** : sélection du site → fork → init complet → build vert → deploy →
  images → **design-review avec screenshots** → log.
- **Cowork (reste en place)** : les tâches de rédaction quotidiennes + la tâche `emd-task-spawner`
  qui **crée automatiquement la tâche de rédaction** de tout site provisionné qui n'en a pas
  (Claude Code n'a pas accès au planificateur Cowork — ne pas essayer).

## Mise en place (une fois)

1. **Dossier de travail** : `mkdir -p ~/emd && cd ~/emd` · `gh auth login` (accès org emd-project) ·
   `git clone git@github.com:emd-project/emd-methodo.git`.
2. **MCP nano-mentionbox dans Claude Code** (images + create_repo_from_template + deploy_to_vercel) :
   recopier la config du connecteur depuis Cowork (Réglages → Connecteurs) dans la config MCP de
   Claude Code (`claude mcp add …`). Idem **Cuik** si on veut les volumes à l'init.
   Alternative sans MCP : `gh repo create emd-project/<repo> --template emd-project/emd-template --private`
   + `vercel` CLI ; mais les IMAGES exigent nano-mentionbox.
3. **Playwright** : `npx playwright install chromium` (une fois).
4. **Permissions headless** : en cron, `claude -p` doit pouvoir agir sans humain → configurer
   l'allowlist d'outils dans les settings Claude Code (Bash, Edit, MCP nano-mentionbox), ou assumer
   `--dangerously-skip-permissions` sur une machine dédiée. Premier run TOUJOURS supervisé en terminal.
5. **Cron (lun & jeu 6h05)** :
   ```cron
   5 6 * * 1,4 cd ~/emd && ./provision.sh >> provision.log 2>&1
   ```
   `provision.sh` :
   ```bash
   #!/usr/bin/env bash
   cd ~/emd/emd-methodo && git pull --quiet
   claude -p "$(cat ops/provision-claude-code.md) — EXÉCUTE LA ROUTINE ci-dessous maintenant."
   ```

## LA ROUTINE (ce que l'agent exécute à chaque run)

Tu es le provisionneur EMD sous Claude Code, avec git/npm/Playwright en local. UN SEUL site par run.
La doctrine vit dans le clone local `~/emd/emd-methodo` (fais `git pull` d'abord) : **applique
`skills/configure-from-spec/SKILL.md` intégralement** (sélection, DA par famille de secteur, genre,
auteur prénom-seul, seed bilingue FR+EN + mapping, classement seed ≥1000 mots, pages dérivées
zéro-placeholder, deals off, gabarits supprimés) avec les ADAPTATIONS Claude Code suivantes :

1. **SÉLECTION** : `pipeline/sites.csv` — STATUT « À faire » ET ACHETÉ « Acheté » uniquement ;
   tirage équilibré par catégorie (≠ dernière catégorie provisionnée) ; la CATÉGORIE pilote la
   famille de design (`homeFamily`). Rien d'éligible → stop.
2. **FORK** : `create_repo_from_template` (MCP) ou `gh repo create --template`, puis
   `git clone` DU FORK en local. **Tout le travail se fait en local** (édits fins, pas de
   réécritures de fichiers entiers), commits atomiques.
3. **GATE DE BUILD (le grand gain — NON NÉGOCIABLE)** : avant CHAQUE push :
   `npm ci && npx tsc --noEmit && npm run build && npx vitest run`. Rouge → corriger AVANT de
   pousser. Les garde-fous `da-guards` (fonts remplacées, palette purgée du template dans les
   5 blocs de globals.css, variante choisie, previews dépubliées) échouent tant que l'init est
   incomplet : c'est voulu, termine l'init.
4. **DEPLOY** : push main → `deploy_to_vercel` (MCP) ou `vercel --prod`. Attendre l'URL 200.
5. **IMAGES À LA FIN, une par une** : worklist = `getAllImageSlots()` + 1 cover par seed
   (via MCP nano-mentionbox, séquentiel, retry -v2, jamais bloquer). Push, redeploy.
6. **DESIGN REVIEW INTÉGRÉE** : applique **`skills/design-review/SKILL.md`** en mode Claude Code —
   screenshots Playwright (4 pages × 2 viewports × clair/sombre) de l'URL déployée, critique
   (bloquant : texte invisible, scroll mobile, placeholder ; important : look par défaut, clone
   d'un voisin), corrections token-driven (presets `lib/da-presets/` en bibliothèque), gate de
   build, redeploy, re-screenshot. **Max 3 itérations**, anti-churn (rien de bloquant → ne touche à rien).
7. **JOURNAL** : `pipeline/sites.csv` → « Configuré » ; append `pipeline/provisioned-log.csv`
   (`domaine,date`) — c'est ce log que Cowork (`emd-task-spawner`, audits, rapport hebdo) consomme ;
   commit + push emd-methodo.
8. **PAS de création de tâche de rédaction ici** : c'est `emd-task-spawner` (Cowork) qui la crée
   depuis `docs/SCHEDULED-TASK-REDACTION.md` en détectant le nouveau site dans provisioned-log.
9. **Rapport final** : site, catégorie, famille + variante, palette/typo retenues (≠ voisins),
   verdict design-review (avant/après, captures), classement seed, état FR/EN, URL, restes.

Contraintes inchangées (cf. configure-from-spec) : NDD obligatoire, auteur prénom-seul, genre réel,
modèle MENTION zéro affiliation, zéro placeholder, jamais de NL. En cas de blocage : log précis,
ne rien laisser à moitié poussé (le gate de build protège).

## Bascule
1. Premier run **supervisé** en terminal (`./provision.sh` à la main), inspection du résultat.
2. Si OK : **désactiver** la tâche Cowork `emd-provision-sites` (ne pas la supprimer — repli),
   activer le cron, et vérifier que `emd-task-spawner` (Cowork) a bien créé la tâche de rédaction
   du site test.
