---
name: emd-audit-ux
description: Audit hebdo — domaine DA · UX · Images · Responsive · A11y + anti-footprint. Mercredi 7h.
---

Audit QA — domaine **DA · UX · IMAGES · RESPONSIVE · A11y** — des NOUVEAUX sites EMD (≤14j). LECTURE SEULE sur les sites.

1. Lis `skills/emd-audit/SKILL.md` (repo emd-project/emd-methodo) via github_read_file = doctrine. Applique le **principe « auditer le rendu réel »** (logo inline du Nav, app/icon, app/opengraph-image).
2. **Périmètre RESTREINT (cf. emd-audit § Périmètre)** : UNIQUEMENT les sites de `pipeline/provisioned-log.csv` **provisionnés ≤ 14 jours** ET **pas déjà audités par CE domaine** (ledger `pipeline/audits/audited-ux.csv`). Après avoir audité un site, **append son domaine + date dans `audited-ux.csv`**. Aucun candidat → écris « Rien à auditer (aucun nouveau site ≤14j non audité) » et STOP. **Jamais de re-scan du parc.** (Site ciblé explicitement à la main → uniquement celui-là.)
3. Applique UNIQUEMENT : **DA / IDENTITÉ** (zéro hex en dur — la DA passe par `niche.config.palette`, **jamais des valeurs dans `volteo.css :root`** ; fonts en variables ; contraste AA ; **direction de design assumée = une des 5 de `docs/DA-DIRECTIONS.md`**, palette **mutée et unique** — flag un **skin générique/brut** ou un look comparateur indifférencié ; **variante home = `suggestVariants` — flag le `comparateur` systématique** entre sites voisins ; **logo = vrai mark SVG sur mesure inline dans `Nav.tsx`, flag l'« éclair » réseau par défaut / logo générique / raster** ; mode light/dark fixe) ; **IMAGES** (featured UNIQUE par article + ~2 images in-body, alt descriptifs, next/image, **cover de catégorie réellement rendue** sur la page catégorie, chemins cassés) ; **RESPONSIVE** (**zéro scroll horizontal** à 320/375/768/1024/1440, viewport meta, tableaux/médias wrappés, cibles tactiles, menu mobile) ; **ACCESSIBILITÉ** (alt, ordre des titres, prefers-reduced-motion, lang par locale) ; **ANTI-FOOTPRINT transverse** (compare aux sites voisins récents : même **direction de design** + palette proche, **logo/éclair inline identique**, **même variante home**, **OG identique**, auteur/bio réutilisés).
4. Écris `pipeline/audits/ux-AAAA-MM-JJ.md` + `pipeline/audits/ux-LATEST.md` (overwrite). Scorecard + détail + section anti-footprint + top actions.
5. Résume : sites audités, ❌/⚠️, scroll horizontal, **sites sans direction DA assumée / comparateur systématique**, paires footprint, 5 urgences.
Si `emd-audit/SKILL.md` introuvable, arrête-toi sans rien écrire.

PS : Il va très certainement manquer des images de couverture dans les pages catégorie. il faudra demander de générer une image de couverture en lien avec la catégorie dans le fix