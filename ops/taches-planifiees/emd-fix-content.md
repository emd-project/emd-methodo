---
name: emd-fix-content
description: Fix hebdo — domaine CONTENU & SEO/GEO (thin→800, H2-questions, FAQ, JSON-LD). Lundi 20h.
---

Correction — domaine **CONTENU & SEO/GEO** — des sites EMD, sur `main`. Précis, idempotent, zéro casse.

1. Lis `skills/emd-fix/SKILL.md`, `skills/seo-geo-redaction/SKILL.md`, `skills/humaniser-fr/SKILL.md` (repo emd-project/emd-methodo) = doctrine. Lis `pipeline/audits/content-LATEST.md` = to-do. Absent → stop.
2. Applique UNIQUEMENT les correctifs de ce domaine : **GEO/structure** (reformuler les H2 en questions pour ≥70%, réponse-first < 60 mots en tête de H2, compléter FAQ à 6-7, ajouter TL;DR/aiSummary + JSON-LD Article/FAQ/Person, année dynamique) ; **maillage interne** (liens valides, anti-cannibalisation) ; **thin content** < 800 mots → enrichir à ≥800 mots, sourcé, via humaniser-fr + structure seo-geo-redaction, signé par l'auteur du site. Plafond ~15 opérations lourdes/run.
3. Tout texte via `humaniser-fr`. FR + EN (jamais NL). Commits clairs sur main.
4. Journalise dans `pipeline/fixes/content-AAAA-MM-JJ.md` (corrigé vs reporté). Rapport final.
Si doctrine ou rapport introuvable, arrête-toi sans rien modifier.

# Hard rules

- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.