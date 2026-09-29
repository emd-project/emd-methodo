---
name: emd-fix-ux
description: Fix hebdo — domaine DA · UX · Images · Responsive · A11y. Mercredi 20h.
---

Correction — domaine **DA · UX · IMAGES · RESPONSIVE · A11y** — des sites EMD, sur `main`. **Ose les gros chantiers** (mandat élargi de `emd-fix`), mais **zéro perte de données** et **code compilable** (énumère tous les consommateurs avant tout renommage/refactor). Câblage réel vérifié.

1. Lis `skills/emd-fix/SKILL.md` (repo emd-project/emd-methodo) = doctrine (dont §0 câblage réel, § Mandat, et `references/garde-fous.md`). Lis `pipeline/audits/ux-LATEST.md` = to-do. Absent → stop.
2. Applique UNIQUEMENT ce domaine : **Images** (générer cover de catégorie manquantes 16:9 ET les wirer/vérifier le rendu ; featured manquantes/doublons → unique 16:9 ; ~2 images in-body réutilisées du pool ; chemins cassés) ; **Responsive** (0 scroll horizontal : largeurs fixes→responsive, overflow-x-auto sur tableaux/code, max-width:100% médias, viewport meta, break-words, supprimer 100vw/min-w qui débordent) ; **DA / identité** (hex→tokens `globals` — jamais de valeurs dans `volteo.css :root` ; contraste ; **logo générique / éclair par défaut → mark SVG unique inline dans `Nav.tsx`** ; **direction de DA générique / skin non muté → REFAIS la DA** : applique une des 5 directions de `docs/DA-DIRECTIONS.md`, mute-la (unique, anti-footprint), **une seule fois puis idempotent** ; **restructure le type de home** s'il est incohérent avec le NDD) ; **A11y** (alt, ordre titres, prefers-reduced-motion, lang). Anti-footprint : diversifier sans homogénéiser le réseau.
3. Images en 16:9 (favicon/logo/avatar 1:1 ; le **logo en tant que mark SVG** se corrige ici car c'est du tracé inline). FR + EN. Commits clairs sur main (push → redeploy Vercel auto).
4. Journalise dans `pipeline/fixes/ux-AAAA-MM-JJ.md` (dont **gros chantiers entrepris** : DA refaite, home restructuré). Rapport final.
Si doctrine ou rapport introuvable, arrête-toi sans rien modifier.