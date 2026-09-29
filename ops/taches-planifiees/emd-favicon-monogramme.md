---
name: emd-favicon-monogramme
description: Remplace le favicon de chaque site EMD par un monogramme (rond couleur DA + initiale de la thématique). 2 sites par heure, idempotent, s'auto-désactive quand tout est fait.
---

Tu remplaces le favicon de **2 sites EMD par run** par un **monogramme** : un rond plein à la couleur de la DA du site, avec l'initiale de la thématique en blanc au centre. Les marks vectorisés actuels sont illisibles à 16px. Tâche autonome, sans utilisateur présent.

OUTILS : MCP nano-mentionbox (`github_list_repos`, `github_read_file`, `github_write_file`). Rien d'autre. Aucun build, aucun déploiement à déclencher (le push suffit, Vercel redéploie).

## 1 — Constituer la liste des sites
`github_list_repos` → garde les repos `emd-project/*` qui sont des **sites** (ils ont un `niche.config.ts` et un `app/icon.svg`).
**EXCLUS explicitement** : `emd-template`, `emd-methodo`, `mentionbox-seo`, `test-be`, et tout repo hors de l'organisation `emd-project`.
⚠️ **Branche** : utilise la **branche par défaut RÉELLE de chaque repo** telle que renvoyée par `github_list_repos` — ce n'est PAS toujours `main` (ex. `meilleure-voiture-electrique` → `claude/no-image-spec-generator-nTjFC`, `meilleure-carte-credit.be` → `claude/setup-nextjs-apple-guide-En4gb`). Écrire sur la mauvaise branche ne sert à rien.

## 2 — Idempotence (à faire AVANT tout traitement)
Pour chaque site candidat, lis `app/icon.svg`. **S'il commence par `<!-- emd-monogram v1 -->`, il est déjà fait → passe au suivant.** Traite les 2 PREMIERS sites non encore faits, puis arrête-toi.
**Si plus aucun site ne reste à faire** : ne modifie rien, et **désactive cette tâche** via `mcp__scheduled-tasks__update_scheduled_task` (taskId `emd-favicon-monogramme`, `enabled: false`), puis rapporte « Tous les favicons sont faits — tâche désactivée ».

## 3 — Pour chaque site : lire `niche.config.ts`
Récupère :
- **`niche.entity`** (le mot de la thématique au singulier : « banque », « chocolat », « voiture », « opérateur »…)
- **`niche.palette.accent1`** (hex de la couleur de DA)
- **`niche.palette.textPrimary`** (hex du texte sombre, pour le cas de repli)
- **`niche.siteName`** (pour l'`aria-label`)

**LETTRE** = **première lettre de `niche.entity`, en MAJUSCULE, sans accent** (é→E, à→A, ç→C). Exemples : « banque » → `B`, « chocolat » → `C`, « voiture » → `V`, « opérateur » → `O`, « assurance » → `A`, « néobanque » → `N`.
Si `entity` est vide ou absurde (placeholder), prends la première lettre du **mot thématique du domaine** (`meilleur-suv.be` → `S`, `quel-fournisseur-energie.be` → `E` pour « énergie »). **Une seule lettre, jamais deux.**

**COULEUR DE LA LETTRE** — à CALCULER, pas à supposer :
calcule le ratio de contraste WCAG entre **blanc `#FFFFFF`** et `accent1`.
Formule : linéariser chaque canal sRGB (`c/255` puis `c ≤ 0,03928 ? c/12,92 : ((c+0,055)/1,055)^2,4`), luminance `L = 0,2126R + 0,7152G + 0,0722B`, ratio `= (L_clair + 0,05) / (L_sombre + 0,05)`.
- **Ratio ≥ 4,5 → lettre blanche `#FFFFFF`** (cas le plus fréquent).
- **Ratio < 4,5** (accent clair : jaune, cyan pâle, beige…) → **lettre = `niche.palette.textPrimary`** (texte sombre). Vérifie que CE ratio est ≥ 4,5 ; s'il ne l'est toujours pas, utilise `#111111`.

## 4 — Écrire `app/icon.svg` (contenu EXACT, seuls les 4 champs varient)
```
<!-- emd-monogram v1 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="{SITE_NAME}">
  <circle cx="32" cy="32" r="32" fill="{ACCENT1}"/>
  <text x="32" y="45.5" text-anchor="middle" fill="{COULEUR_LETTRE}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="0.5">{LETTRE}</text>
</svg>
```
Remplace `{SITE_NAME}`, `{ACCENT1}`, `{COULEUR_LETTRE}`, `{LETTRE}`. **Ne change NI le viewBox, NI les coordonnées, NI la taille de police** (elles sont calées pour que la lettre soit centrée optiquement dans le rond). Garde le commentaire `<!-- emd-monogram v1 -->` en première ligne : c'est le marqueur d'idempotence.

`github_write_file` avec `overwrite: true`, sur la **branche par défaut du repo**, message de commit :
`feat(identite): favicon monogramme — rond DA + initiale, lisible à 16px`

## 5 — Garde-fous (durs)
- **Ne touche QUE `app/icon.svg`.** Jamais `niche.config.ts`, jamais `app/opengraph-image.tsx`, jamais le logo de la nav, jamais le contenu.
- **2 sites MAXIMUM par run**, puis stop (même s'il en reste).
- Un site où `niche.config.ts` est illisible ou sans `palette.accent1` → **saute-le** et signale-le, ne devine pas de couleur.
- Ne crée aucun fichier, aucune branche, aucune PR.

## 6 — Rapport (court)
Pour chacun des 2 sites : domaine · branche · lettre retenue (et d'où elle vient) · couleur du rond · couleur de la lettre + ratio calculé · lien du commit. Puis : **nombre de sites restants à traiter**. Si tu as désactivé la tâche, dis-le explicitement.