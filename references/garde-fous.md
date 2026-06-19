# Garde-fous des tâches autonomes EMD

Règles **dures** que toute tâche qui ÉCRIT dans un repo (provision, fix, rédaction, geo-loop) lit et respecte **avant d'agir**. But : **prévenir** le geste destructeur — pas le constater après coup (ça, c'est le rôle de `emd-audit`). Un audit détecte un article vidé une semaine plus tard ; un garde-fou empêche de le vider.

## 1. Anti perte de données (INVARIANT ABSOLU — jamais d'exception)
- **Jamais de read-modify-write juste après une écriture** sur le même fichier. Le cache de lecture peut renvoyer un **blob vide** après un write → tu réécrirais du vide par-dessus le contenu. Si tu dois transformer un fichier que tu viens d'écrire, garde la version en mémoire, ne le relis pas pour le réécrire.
- **Vérifier NON-VIDE avant tout commit** de contenu (`.mdx`, article, page) : si une lecture renvoie vide/tronqué alors que le fichier devrait avoir du corps → **STOP, ne pousse pas, loggue**. Ne déduis jamais « le fichier est vide » d'une lecture suspecte.
- **Ne jamais écraser un fichier non-vide par du vide** (ou par un contenu anormalement plus court). En cas de doute, abandonne l'écriture et loggue.
- **Ne jamais supprimer du contenu existant pour « corriger »** (ré-attribution d'auteur, refactor de structure, reformatage) : édite **en place**, conserve le corps. Une correction ne réduit jamais un article à un stub.

Cet invariant tient **même quand on attaque un gros chantier** (§2). Oser plus ≠ détruire.

## 2. Gros chantiers & cohérence du build
- **Rédaction & provision** : restez sur **data + contenu**, pas de refactor applicatif risqué (cf. `references/pages-cles.md` : data-driven).
- **Tâches de FIX** : vous êtes **AUTORISÉES à entreprendre de gros chantiers** — refonte de DA, restructuration de page, reconstruction de la liaison i18n, réécriture de plusieurs articles — et à pousser sur `main`. **N'osez pas à moitié** : un site doit ressortir matériellement meilleur, pas juste rafistolé en surface. La prod est **surveillée sur Vercel** par l'humain (filet de build assumé côté humain).
- **Contrepartie : garde le code compilable.** Avant de renommer/déplacer un symbole (type, champ, fonction, export, props), **énumère TOUS ses consommateurs** dans le repo (recherche) et mets-les à jour **dans le même commit**. Un renommage qui laisse une référence pendante = build cassé en prod. Vise un changement cohérent du premier coup.
- **Idempotence des gros chantiers** : un chantier réussi ne se refait pas la semaine suivante (une DA propre reste, on ne la churn pas). Déjà bon → passe.
- Rappel : un push sur `main` redéploie Vercel automatiquement, sans filet de build automatisé.

## 3. Idempotence & ciblage
- **Édits ciblés** : ne réécris que ce qui doit changer. Déjà en place → **passe** (ne « re-corrige » pas un asset déjà bon, ne re-rédige pas un brief déjà coché).
- **Commits clairs** (Conventional Commits), un type par commit.

## 4. Périmètre d'écriture
- N'écris **que** les fichiers pertinents pour ta tâche/ton domaine. Une tâche de rédaction touche un article + ses images + le calendrier ; une tâche GEO-loop touche `priorites-geo.md` + des CSV/log, jamais un article.
- En cas d'échec sur un item : **loggue et continue** (sauf risque de casse irréversible → stop ce site), ne laisse pas un demi-état non journalisé.

## 5. Câblage réel (anti correctif fantôme)
- Corrige/écris la **source réellement rendue**, pas un fichier au bon nom non câblé (logo = SVG inline du `Nav.tsx` ; favicon = `app/icon.svg` ; OG = `app/opengraph-image.tsx`). Vérifie le câblage après coup ou loggue « à vérifier ». (Détail dans `emd-fix` §0.)
