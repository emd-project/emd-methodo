---
name: emd-outils-calculateurs
description: Construit 1 calculateur par semaine sur les sites EMD, en dépilant la file de PROGRESS-OUTILS.md (emd-methodo). Outil interactif + article complet + FAQ + miroir EN. Mercredi 18h.
---

Tu construis **UN SEUL calculateur par run** sur l'un des sites du réseau EMD, via le MCP **nano-mentionbox** (`github_read_file`, `github_list_files`, `github_write_file`, `github_commit_batch`) et `mcp__cuik__get_keyword_ideas`.

# 0 — DOCTRINE, À LIRE AVANT TOUT

Sur `emd-project/emd-methodo` : `skills/seo-geo-redaction/SKILL.md` — **en particulier la section « Socle éditorial »**, qui commande le minage Cuik, la donnée propriétaire, la régionalisation et les garde-fous produits. Puis `skills/humaniser-fr/SKILL.md` et `references/garde-fous.md`.
Sur le repo du site cible : `content/piliers.md` (angle propre et garde-fous sectoriels), `niche.config.ts`, et un article existant pour le schéma de frontmatter.

# LA RÈGLE QUI PRIME SUR TOUTES LES AUTRES

**Un calculateur seul ne se positionne pas.** Une page qui ne contient qu'un formulaire et un résultat n'a rien à indexer, rien à citer, et Google la traite comme une page vide. **Tu livres un ARTICLE COMPLET dont l'outil est le cœur, pas une page-outil.**

Structure obligatoire :
1. **H1** et chapô de 40-60 mots donnant la réponse courte avant même l'outil.
2. **L'outil**, placé haut mais pas en premier élément absolu.
3. **La méthode, expliquée et sourcée** — la formule, d'où viennent les coefficients, ce que l'outil suppose et ce qu'il ne prend pas en compte. C'est ce qui rend la page citable plutôt que remplaçable.
4. **Un exemple chiffré complet**, déroulé à la main, sur un cas réaliste belge.
5. **≥ 70 % des H2 en question stricte**, pattern Answer-Explanation-Example.
6. **Un tableau de repères** — utile même sans utiliser l'outil, et repris tel quel par les moteurs génératifs.
7. **Les limites et les erreurs fréquentes** d'interprétation du résultat.
8. **FAQ de 6 à 7 questions** dans le frontmatter.
9. **Les sources, datées.**
10. **Maillage interne** vers le classement, le comparateur et 1-2 articles voisins.

Plancher : **≥ 1000 mots dans chaque locale**, hors interface de l'outil.

# 1 — CHOISIR L'OUTIL DU JOUR

Lis **`PROGRESS-OUTILS.md`** à la racine de `emd-project/emd-methodo`. Il porte la file, les sites écartés et le journal.

Prends **le premier outil non coché** (`- [ ]`). Les lignes `- [x]` (faites) et `- [!]` (écartées) ne comptent pas et **ne se réévaluent jamais**.

Si un outil s'avère infaisable — architecture incompatible, données non sourçables, outil équivalent déjà meilleur ailleurs — **marque-le `- [!] … · écarté le AAAA-MM-JJ (raison)`** et passe au suivant.

**File vide ?** Ne t'arrête pas : mine `mcp__cuik__get_keyword_ideas` sur des seeds en « combien », « calcul », « conversion », « simulateur », pour les sites qui ne figurent pas encore dans la section « Sites sans outil en file ». Propose 5 nouveaux outils en fin de file, avec leurs entrées et sorties, et arrête-toi là pour ce run. **Rappelle-toi le critère d'admission** : un calculateur ne se justifie que si le calcul EST la réponse à une requête réelle. Dans le doute, écarte — une file encombrée d'outils faibles bloque les bons.

# 2 — AVANT D'ÉCRIRE UNE LIGNE DE CODE : CALQUER L'EXISTANT

**C'est la cause d'échec numéro un. Chaque site du réseau a une architecture différente.**

1. `github_list_files` sur le repo pour repérer comment le site rend ses outils : route dédiée (`app/simulateur/`), composant MDX interactif, ou les deux.
2. **Ouvre un simulateur ou un composant interactif EXISTANT du site** et relève exactement : le framework et sa version, les conventions de nommage, la gestion d'état, le style, la façon dont le composant est déclaré et importé dans le MDX, la liste des composants autorisés.
3. **Reproduis ce pattern à l'identique.** N'introduis **aucune dépendance nouvelle**, aucune bibliothèque de graphiques, aucun appel réseau, aucun stockage navigateur. **Le calcul se fait entièrement côté client, en JavaScript pur, sans API.**
4. Si le site n'a **aucun** pattern interactif existant, ne l'invente pas : marque l'outil comme écarté et passe au suivant. Un build cassé coûte plus cher qu'un outil manquant.

# 3 — LA JUSTESSE DU CALCUL

**Un calculateur faux est bien pire qu'un calculateur absent.** Il sera cité, repris, et il trompera des gens sur des décisions d'argent — ou, sur certains outils de la file, sur des décisions de sécurité.

- **Chaque coefficient, taux, barème ou valeur par défaut vient d'une source officielle, citée et datée** dans l'article. Pas de valeur reconstituée de mémoire.
- **Vérifie le calcul à la main sur au moins deux cas** avant de commiter, et fais figurer l'un des deux comme exemple déroulé dans l'article.
- **Affiche les hypothèses dans l'interface même** : « calcul basé sur un coefficient de X, relevé le [date], source [Y] ». L'utilisateur doit pouvoir contester le résultat.
- **Rends les valeurs par défaut modifiables** dès qu'elles varient. Un chiffre figé périme la page en trois mois.
- **Dis ce que l'outil ne fait pas.** Une estimation n'est pas un devis, ni un calcul officiel, ni un conseil.
- Argent, dette, assurance, fiscalité : **information, jamais conseil personnalisé**. Renvoie vers l'administration, le régulateur ou un professionnel agréé pour la valeur qui fait foi.

**Les garde-fous renforcés sont écrits ligne par ligne dans `PROGRESS-OUTILS.md`**, sur les outils concernés (charge utile, siège auto, préfixes téléphoniques). Applique-les à la lettre : ils portent sur la sécurité ou sur une affirmation qui serait fausse dans une bonne partie des cas. **Leur présence dans l'interface — pas seulement dans le texte — est un point de vérification bloquant (§5).**

# 4 — LONGUE TRAÎNE ET SERP

Minage Cuik selon le §4 du socle : 3-5 seeds, `language_id: "1002"`, `location_ids: ["2056"]`, puis le MÊME appel avec `["2250"]`. Sur les calculateurs universels — conversion, débit, data, unités —, les volumes français représentent une audience directement adressable. **Jamais `get_ranked_keywords`.** Réponse trop volumineuse → elle est écrite dans un fichier : lis le fichier, ne relance pas l'appel.

Tu en tires le **head term exact** (H1 et slug) et la **grappe** de 4-8 variantes qui deviennent les H2 et la FAQ.

Puis **SERP analysis obligatoire** : WebSearch sur le head term, top 3 Google.be, content gap documenté. Si un outil équivalent existe déjà et fait mieux, dis en quoi le tien diffère ou change d'angle.

# 5 — VÉRIFICATION AVANT COMMIT

Non négociable, dans cet ordre :
1. Le composant compile-t-il avec les conventions du site ? (imports valides, aucun composant non déclaré, MDX sûr — jamais un `<` suivi d'un chiffre ou d'un mot non-composant)
2. Le calcul a-t-il été vérifié à la main sur deux cas ?
3. Chaque valeur par défaut a-t-elle sa source et sa date, dans l'interface **et** dans l'article ?
4. **Les garde-fous renforcés de `PROGRESS-OUTILS.md` sont-ils présents dans l'interface** pour l'outil concerné ?
5. Le frontmatter est-il complet et conforme à un article existant du site ?
6. Le miroir EN et le mapping i18n sont-ils faits ?

**Si l'un des six échoue : ne pousse rien.** Note le blocage dans `PROGRESS-OUTILS.md` et termine proprement. Aucun demi-état, jamais de fichier écrasé par du vide.

# 6 — PUBLICATION

- Respecte **la voix, le frontmatter, les catégories, l'auteur et les conventions du site cible**. Ne plaque jamais le gabarit d'un autre site.
- **Miroir EN strict** si le site est bilingue : article traduit intégralement, **interface de l'outil traduite**, même plancher de mots, paire ajoutée au mapping i18n. Sans le mapping, le sélecteur de langue casse.
- **JSON-LD** : `FAQPage` + `BreadcrumbList`, plus `HowTo` si l'article décrit une procédure de calcul.
- **Images** : réutilise une image existante du site en cover. **Aucune génération** — l'effort de ce run va dans le code et la méthode.
- **Modèle MENTION, aucune affiliation.** **≥ 2 liens d'AUTORITÉ en dofollow normal** vers les sources du calcul ; ne JAMAIS leur mettre `nofollow`.
- Commit sur la branche de travail habituelle du site — **vérifie-la dans la tâche de rédaction quotidienne correspondante avant de pousser**, plusieurs sites ne travaillent pas sur `main`. Conventional Commits.

# 7 — JOURNAL

Dans `PROGRESS-OUTILS.md` : coche l'outil avec la date, et ajoute une ligne au journal — site, slugs FR/EN, head term Cuik, sources des coefficients avec leurs dates, et les deux cas de vérification utilisés.

# 8 — RAPPORT DE FIN DE RUN (8-12 lignes)

Site, outil construit, slugs FR et EN, head term, mots par locale, sources des coefficients et leurs dates, les deux cas de vérification et leurs résultats, pattern existant calqué, garde-fous posés dans l'interface, commit, et une section franche **« Ce qui n'a pas pu être fait »**.

# Hard rules

- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.