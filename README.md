# emd-methodo — Plugin méthodo éditoriale EMD

Le « cerveau » partagé des sites EMD : les skills, la doctrine DA, la rédaction SEO/GEO,
les garde-fous anti-IA, la génération d'images, et l'audit/correction QA. Installé **une fois**
par machine, mis à jour **au centre** (un push ici → tout le monde fait `/plugin update`).

> Ce plugin contient la **méthodo** (ce que fait Claude). Le **code des sites** vit dans
> `emd-template` (le moteur Next.js). Deux couches séparées, mises à jour indépendamment.

## Contenu

| Type | Détail |
|---|---|
| **Skills** | `nouveau-site` (routeur d'init), `init-site`, `configure-from-spec`, `seo-geo-redaction`, `integrate-claude-design`, `ton-of-voice`, `humaniser-fr`, `emd-audit` (audit QA), `emd-fix` (correction auto) |
| **Pipeline** | `pipeline/sites.csv` (sites à provisionner), `pipeline/audits/` (rapports d'audit), `pipeline/fixes/` (journaux de correction) |
| **Docs méthodo** | `docs/` — DA (composition + anti-IA + CSS par style), workflow images V2, gabarit tâche planifiée, guide de duplication, presets DA |
| **Prompts** | `prompts/` — bibliothèque de prompts images Gemini (≤ 20 mots, alignés DA) |

## Installation (une fois par machine)

```
/plugin marketplace add emd-project/emd-methodo
/plugin install emd-methodo
```

> Repo privé : la machine doit avoir un accès lecture à `emd-project/emd-methodo`.

## Mise à jour (propagation des changements)

```
/plugin            → ouvrir le gestionnaire → mettre à jour emd-methodo
```

Tu pushes une correction ici, chaque collègue fait `/plugin update`. Aucune intervention
sur sa machine.

## MCP nano-mentionbox (non bundlé — volontairement)

La génération d'images et les actions GitHub/Vercel passent par le MCP **local**
`nano-mentionbox`, dont le chemin dépend de l'emplacement de l'app sur chaque machine. Il
n'est donc PAS bundlé ici : il reste câblé par l'installeur de l'app Nano MentionBox.

## Utilisation

- Configurer un site neuf : **`/nouveau-site`** (jamais « lance l'init » → percute le `/init` intégré).
- Rédiger : « rédige un article… » → `ton-of-voice` + `seo-geo-redaction` + `humaniser-fr` se chargent en parallèle.
- Intégrer un design : déposer les fichiers dans `design-incoming/` → `integrate-claude-design`.
- **Auditer les sites** : « audite les sites EMD » → `emd-audit` (lecture seule, dashboard dans `pipeline/audits/`).
- **Corriger depuis l'audit** : « applique les fixes de l'audit » → `emd-fix` (sur `main`).

## Versions

Voir `.claude-plugin/plugin.json`. Semver : une correction de doctrine = patch, un nouveau
skill = minor.
