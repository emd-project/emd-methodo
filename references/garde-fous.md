# Garde-fous des tâches autonomes EMD

Règles **dures** que toute tâche qui ÉCRIT dans un repo (provision, fix, rédaction, geo-loop) lit et respecte **avant d'agir**. But : **prévenir** le geste destructeur — pas le constater après coup (ça, c'est le rôle de `emd-audit`). Un audit détecte un article vidé une semaine plus tard ; un garde-fou empêche de le vider.

## 1. Anti perte de données (priorité absolue)
- **Jamais de read-modify-write juste après une écriture** sur le même fichier. Le cache de lecture peut renvoyer un **blob vide** après un write → tu réécrirais du vide par-dessus le contenu. Si tu dois transformer un fichier que tu viens d'écrire, garde la version en mémoire, ne le relis pas pour le réécrire.
- **Vérifier NON-VIDE avant tout commit** de contenu (`.mdx`, article, page) : si une lecture renvoie vide/tronqué alors que le fichier devrait avoir du corps → **STOP, ne pousse pas, loggue**. Ne déduis jamais « le fichier est vide » d'une lecture suspecte.
- **Ne jamais écraser un fichier non-vide par du vide** (ou par un contenu anormalement plus court). En cas de doute, abandonne l'écriture et loggue.
- **Ne jamais supprimer du contenu existant pour « corriger »** (ré-attribution d'auteur, refactor de structure, reformatage) : édite **en place**, conserve le corps. Une correction ne réduit jamais un article à un stub.

## 2. Build-risqué = SIGNALER, pas bricoler
- Toucher à de la **logique de composant**, du **routing**, une **config** ou tout ce qui peut **casser le build** → ne tente pas en autonome. **Signale-le dans le log** (audit/journal), laisse l'humain le faire et vérifier le build sur Vercel.
- Les tâches autonomes remplissent des **données** et du **contenu**, elles n'écrivent pas de logique applicative risquée (cf. `references/pages-cles.md` : data-driven, jamais de code risqué).
- Rappel : un push sur `main` redéploie Vercel **automatiquement**, sans filet de build. Donc dans le doute, **ne pousse pas**.

## 3. Idempotence & ciblage
- **Édits ciblés et minimaux** : ne réécris que ce qui doit changer. Déjà en place → **passe** (ne « re-corrige » pas un asset déjà bon, ne re-rédige pas un brief déjà coché).
- **Respecte les plafonds** d'opérations lourdes des skills (ex. `emd-fix` ~15/run) pour ne pas inonder un déploiement.
- **Commits clairs** (Conventional Commits), un type par commit.

## 4. Périmètre d'écriture
- N'écris **que** les fichiers prévus par ta tâche. Une tâche de rédaction touche un article + ses images + le calendrier ; elle ne touche pas une config, un composant, une autre tâche. Une tâche GEO-loop touche `priorites-geo.md` + des CSV/log ; jamais un article.
- En cas d'échec sur un item : **loggue et continue** (sauf risque de casse → stop ce site), ne laisse pas un demi-état non journalisé.

## 5. Câblage réel (anti correctif fantôme)
- Corrige/écris la **source réellement rendue**, pas un fichier au bon nom non câblé (logo = SVG inline du `Nav.tsx` ; favicon = `app/icon.svg` ; OG = `app/opengraph-image.tsx`). Vérifie le câblage après coup ou loggue « à vérifier ». (Détail dans `emd-fix` §0.)
