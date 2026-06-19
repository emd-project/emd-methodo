# emd-methodo — Plugin méthodo éditoriale EMD

Le « cerveau » partagé des sites EMD : les skills, la doctrine DA, la rédaction SEO/GEO,
les garde-fous anti-IA, la génération d'images, l'audit/correction QA, et les skills GEO/MentionLab.
Installé **une fois** par machine, mis à jour **au centre**.

> Ce plugin contient la **méthodo** (ce que fait Claude). Le **code des sites** vit dans
> `emd-template` (le moteur Next.js). Deux couches séparées.

## Contenu

| Type | Détail |
|---|---|
| **Skills site** | `nouveau-site`, `init-site`, `configure-from-spec`, `seo-geo-redaction`, `integrate-claude-design`, `ton-of-voice`, `humaniser-fr`, `emd-audit`, `emd-fix` |
| **Skills GEO/MentionLab** | `mentionlab-run` (grille de prompts MentionLab + lecture du positionnement), `geo-writer` (rédige des articles GEO et les commit) |
| **Pipeline** | `pipeline/sites.csv`, `pipeline/audits/`, `pipeline/fixes/` |
| **Références** | `references/` — i18n multilingue, pages clés, etc. |

## Skills indisponibles ? (1re session / nouvelle machine)

Si Claude n'a pas accès à un skill EMD (nouveau collègue, nouvelle machine, 1re discussion), installe la méthodo :

**Claude Code**
```
/plugin marketplace add emd-project/emd-methodo
/plugin install emd-methodo
```
puis `/plugin update` pour récupérer les mises à jour.

**Cowork (app desktop)** — les commandes `/plugin` ne s'appliquent pas. Deux voies :
- **Automatisation** : les tâches planifiées **lisent la doctrine directement depuis ce repo** via `github_read_file` (MCP nano-mentionbox) → aucune installation requise.
- **Usage interactif** : installe les skills via **Réglages → Capacités** (fichiers `.skill`).

**Pré-requis** : accès lecture au repo privé `emd-project/emd-methodo` + MCP `nano-mentionbox` connecté (et MCP `MentionLab` pour `mentionlab-run`/`geo-writer`).

## Mise à jour
```
/plugin   → gestionnaire → mettre à jour emd-methodo
```
Un push ici → chaque collègue fait `/plugin update`.

## Utilisation
- Configurer un site neuf : **`/nouveau-site`**.
- Rédiger : « rédige un article… » → `ton-of-voice` + `seo-geo-redaction` + `humaniser-fr`.
- Intégrer un design : déposer dans `design-incoming/` → `integrate-claude-design`.
- **Auditer** : « audite les sites EMD » → `emd-audit` (dashboard dans `pipeline/audits/`).
- **Corriger** : « applique les fixes » → `emd-fix`.
- **Visibilité GEO** : « grille MentionLab pour <projet> » → `mentionlab-run` ; « rédige du contenu GEO pour boucher les gaps » → `geo-writer`.

## Versions
Voir `.claude-plugin/plugin.json`. Semver : correction de doctrine = patch, nouveau skill = minor.
