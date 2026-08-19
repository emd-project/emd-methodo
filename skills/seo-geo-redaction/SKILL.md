---
name: seo-geo-redaction
version: 1.12.0
description: Doctrine canonique de rédaction SEO/GEO des sites EMD — structure d'article optimisée pour le référencement Google ET la citabilité par les LLM (ChatGPT/Gemini/AI Overview), avec rotation par PILIERS lus dans content/piliers.md, minage de longue traîne Cuik en double appel BE+FR, angle propre par site (recouvrement autorisé, doublon de traitement interdit), trois piliers transversaux obligatoires (lexique, questions pures, matériel), donnée propriétaire belge par article, répartition ½ comparatifs de marques et modèles déclinés par persona / ¼ evergreen pratique / ¼ informationnel, monétisation par mention sans affiliation, et liens d'autorité sortants obligatoires. Source de vérité unique : CINQ FORMES d'article en rotation (enquête, guide pratique, face-à-face, réponse rapide, décryptage) posées au-dessus d'un PLANCHER GEO présent dans TOUT article — au moins un tableau, au moins une liste à puces, une FAQ, un TL;DR ; ce qui varie d'une forme à l'autre, c'est leur TAILLE et leur NATURE, pas leur existence. Les contraintes qui portent sur le CORPUS et non sur chaque texte sont le taux de H2 en question, la longueur et l'Answer-Explanation-Example ; données structurées par type de page, workflow images (MCP nano-mentionbox), infrastructure GEO (llms.txt, robots.txt), maillage interne, sources datées, FR+EN, anti-cannibalisation par frontière head-nu/long-tail, monitoring de citabilité. À lire/appliquer pour toute rédaction d'article de blog sur un site EMD.
---

# seo-geo-redaction — Doctrine GEO canonique EMD

Référence absolue pour la structure d'un article EMD. Optimise à la fois le **SEO** (Google.be) et la **GEO** (citabilité par les LLM). À combiner toujours avec `humaniser-fr` (anti-IA, mode production) et la voix/auteur du site.

**Avant toute écriture/commit, respecte `references/garde-fous.md`** (emd-methodo) : vérifier non-vide avant commit, jamais de read-modify-write juste après un write, ne jamais écraser du contenu existant par du vide, build-risqué = signaler.

> Le **schéma de frontmatter** (noms de champs : `aiSummary` vs `tldr`, `faq[q/a]` vs `faq[question/answer]`, `cover` vs `featureImage`, `category` vs `categorie`) **varie selon les sites**. Lis toujours `niche.config.ts` et un article existant du repo pour calquer le schéma exact. La doctrine porte sur la STRUCTURE, pas sur les noms de champs.

## Modèle de monétisation — la MENTION (pas d'affiliation)
La monétisation EMD = **vendre des mentions** : une marque paie pour être **citée favorablement** dans le contenu, qui alimente ensuite les réponses des LLM. **Il n'y a PAS d'affiliation** — aucun lien affilié, aucun tag affilié, aucun disclaimer affilié. La valeur d'un article = (1) être **cité par les LLM** (GEO) et (2) **faire surgir des marques/modèles réels** (inventaire de mentions vendable).

### Priorité de sélection des sujets (½ marques-modèles / ¼ evergreen pratique / ¼ info)
- **½ des sujets = à MARQUES / MODÈLES.** Comparatifs cross-marques (« meilleurs SUV », « X vs Y ») ou intra-marque / entre modèles. Chaque sujet cite **≥ 2 marques ou modèles réels**, traités équitablement et factuellement.
- **Angle PERSONA** à privilégier sur ces sujets : « meilleurs SUV **pour grandes familles** », « meilleure néobanque **pour freelances** ». Longue traîne, peu concurrentielle, citation plus facile. Varier les personas.
- **¼ des sujets = EVERGREEN PRATIQUE.** Procédures, entretien, réparation, démarches, guides d'achat de matériel. Ce sont les requêtes **les moins disputées** du secteur, et **les procédures en étapes sont le format que les LLM citent le plus volontiers**. C'est aussi un **second inventaire de mentions** : marques de produits au lieu de marques de modèles. Structure : étapes numérotées, matériel, durée, coût, erreurs fréquentes, quand faire appel à un professionnel. JSON-LD `HowTo` en plus de `Article`.
- **¼ des sujets = informationnels** : définitions, prix, « pourquoi », « qu'est-ce que ».
- **Regarde ce qui est déjà publié avant de choisir.** L'ancienne règle a produit des sites où presque tous les articles sont des comparatifs déclinés par persona, donc interchangeables. Rééquilibre activement.
- **Taguer les marques/modèles + le persona** dans le frontmatter.

### Frontière des assets — UN propriétaire par requête EXACTE (anti-cannibalisation interne au site)
| Requête | Propriétaire | Le blog ne duplique PAS |
|---|---|---|
| head nu « les meilleurs X / top X / classement X » | **Classement** `/classement/X` | ✗ ce terme nu |
| « meilleurs X **pour [persona/usage]** » | **Blog** | ✓ légitime |
| « X vs Y » | **Blog** | ✓ légitime |
| « comparer X » multi-items interactif | **Comparateur** `/comparer/X` | ✗ l'outil |
| « quel X choisir » | **Choisir / Quiz** | ✗ la reco perso |
| **comment faire X / démarche / entretien / fréquence** | **Blog** (evergreen pratique) | ✓ légitime |
| pourquoi / qu'est-ce que / prix / définition | **Blog** (informationnel) | — |

→ Le blog **maille vers** le classement/comparateur du cluster ; jamais deux pages sur la **même requête exacte**.

### Page Classement — ≥ 1000 mots
La page `/classement/X` est l'asset GEO #1 : intro + TL;DR + critères + méthodologie + sources + FAQ + par item verdict/pros/cons/bestFor. Contenu data-driven dans `content/data/classements.json` (+ `.en`). En dessous de 1000 mots = thin, non citable.

---

# SOCLE ÉDITORIAL — angle, piliers, rotation

Cette partie est **transversale à tous les sites EMD** et prime sur toute habitude locale. Le pendant site-spécifique vit dans **`content/piliers.md`** du repo du site : l'angle propre, la table des piliers avec leurs seeds, les catalogues, les marques citables et les garde-fous sectoriels. **Lis `content/piliers.md` à chaque run.** S'il n'existe pas, signale-le dans le rapport et travaille au jugement — mais ne l'invente pas à la volée.

## 1. L'angle propre — le recouvrement est voulu, le doublon de traitement est interdit

Le réseau compte plusieurs sites par famille (huit en auto, cinq en télécom, trois en énergie…). **Occuper plusieurs positions sur une même page de résultats est un objectif**, pas un accident : ne t'interdis jamais un sujet parce qu'un site frère l'a traité.

Ce qui est interdit, c'est le **doublon de traitement** : deux pages du réseau qui répondent à la même question de la même façon ne s'additionnent pas, elles se remplacent, et l'une des deux ne se positionne pas — pour deux fois le coût de production.

**Le test, à appliquer avant d'écrire** : *si un site frère pouvait publier cet article tel quel sans que ça choque, c'est que j'écris sous son angle.* Alors on retravaille l'angle, pas le sujet.

L'angle propre du site est la première ligne de `content/piliers.md`. Il tient en une phrase et il commande tout le reste.

## 2. La rotation par pilier

`content/piliers.md` liste les piliers du site. À chaque run :

1. **Inventorie** les articles publiés et la tête de `PROGRESS.md` pour savoir quels piliers sont servis et lequel a été traité au run précédent.
2. **Prends le pilier le moins couvert.** À couverture égale, celui qui n'a pas été servi depuis le plus longtemps.
3. **Jamais deux runs consécutifs sur le même pilier ni dans la même catégorie.** C'est la règle qui empêche un site de devenir monomaniaque — le travers le plus courant et le plus coûteux du réseau.

Une **catégorie vide** est une anomalie prioritaire : sur la plupart des templates, une catégorie ne s'affiche avec du contenu qu'à partir d'un premier article publié.

## 3. Les trois piliers transversaux — obligatoires sur tout site

Ils figurent dans le `content/piliers.md` de chaque site, déclinés à sa niche. Ce sont, ensemble, la plus grosse réserve de trafic du réseau et la couche la plus citée par les moteurs génératifs.

**Le LEXIQUE et les définitions.** Chaque secteur est saturé de termes que les gens rencontrent sans les comprendre, chacun génère sa requête, et **aucune ne périme**. Réponse en un paragraphe suivi d'un tableau : c'est exactement ce qu'un moteur génératif extrait. Traite par **grappes** (six à dix termes liés dans un article), jamais une définition par page. Deux règles : la réponse tient en une phrase dès le chapô, et **chaque article porte un chiffre ou un ordre de grandeur** — une définition sans repère chiffré reste abstraite et non citable.

**Les QUESTIONS PURES.** Forme « puis-je », « faut-il », « est-ce couvert », « ai-je droit », « que se passe-t-il si ». Format imposé : **réponse binaire dès le chapô**, la condition qui la nuance, un **tableau des cas** (par région, par formule, par situation), puis la marche à suivre. Quand la réponse dépend d'un contrat ou d'une notice, formule en « en principe » et invite à vérifier — une affirmation catégorique sur un cas particulier est une faute.

**Le MATÉRIEL et les guides d'achat.** Forte intention, très peu disputés, et ils prouvent une expertise que le comparatif seul ne démontre pas. Format : réponse courte dès le chapô **et le cas où il ne faut rien acheter**, puis **les critères de choix expliqués avant tout produit** — c'est ce qui fait l'expertise et ce qu'un moteur reprend —, un tableau par gamme de budget, les erreurs fréquentes, et une ancre belge (ce qui est légalement obligatoire ici, ce qu'exige un contrôle). Certains sites n'ont pas de famille de produits pertinente : leur `piliers.md` le dit explicitement, et on n'en invente pas.

## 4. Le minage de longue traîne — double appel Cuik

Le sujet ne s'improvise pas au feeling et un plan éditorial ne donne qu'un **angle**, jamais la formulation que les gens tapent.

`mcp__cuik__get_keyword_ideas` avec 3-5 seeds du pilier retenu, `language_id: "1002"`, `location_ids: ["2056"]` (Belgique). **Puis le MÊME appel avec `["2250"]` (France).**

Le second appel n'est pas un doublon. Le marché belge francophone est petit : les volumes BE plafonnent le plus souvent à **10-40 recherches/mois** et ne discriminent rien entre deux candidats. La France sert de **révélateur de la forme de la demande** — quelles formulations existent, quelles sous-questions les gens posent.

**Sépare les deux registres, c'est le point qui décide de l'usage que tu fais du second appel :**
- **Universel** — lexique, unités, technique, entretien, matériel, santé, sécurité produit. Les volumes FR y sont **directement exploitables** et le lectorat adressable dépasse largement la Belgique.
- **Purement belge** — fiscalité, régulateurs, GRD, procédures administratives, tarifs, couverture, droit national. La France n'y dit **rien d'utile** : sers-toi des suggestions pour la forme des questions, jamais pour le fond.

Ce que tu en tires :
- le **head term exact**, la formulation réellement tapée, qui ouvre le H1 et le slug — **et qui remplace le titre du plan s'il en diffère** ;
- la **grappe** : quatre à huit variantes proches qui deviendront les H2 et la FAQ. **Une grappe = UN article**, jamais huit articles thin.

Ce qui **disqualifie** un sujet : déjà couvert sur ce site, rien de vérifiable à apporter, infaisable sans inventer. Un **volume BE de 10/mois n'est pas un motif de rejet** — c'est la norme à cette échelle de marché, et une page citée par un moteur génératif vaut mieux qu'une ligne de Keyword Planner.

**Contraintes d'usage.** Un appel coûte un crédit : groupe les seeds, jamais de boucle. **Jamais `get_ranked_keywords`** — la réponse dépasse 200 000 caractères et fait exploser le run. Si une réponse dépasse la taille maximale, elle est écrite dans un fichier : **lis le fichier, ne relance pas l'appel**. Outil indisponible ou en erreur → continue au jugement et signale-le ; un run ne doit jamais échouer à cause de Cuik.

## 5. La donnée propriétaire — une par article, sans exception

Sur un sujet générique, tu affrontes des sites français ou des comparateurs installés depuis quinze ans. **Chaque article doit contenir au moins un élément qu'ils n'ont pas** : un prix relevé et daté sur le marché belge, un calcul chiffré, une comparaison entre les trois régions, une mesure, un tableau construit à partir de sources primaires.

Sans cela, la page est une paraphrase de plus et aucun moteur génératif n'a de raison de la préférer.

## 6. La régionalisation belge

Fiscalité, primes, tarifs réseau, LEZ, distributeurs, contrôle technique, règles de démarchage : presque tout diffère entre **Wallonie, Bruxelles et Flandre** — et parfois entre communes. **Tout article dont la réponse change selon la région doit le dire et traiter les trois**, sinon il est faux pour deux tiers des lecteurs. C'est aussi le différenciateur le plus difficile à copier depuis l'étranger.

## 7. Garde-fous produits — dès qu'un article cite du matériel

- **Aucune spécification ni aucun prix inventé.** Tout chiffre technique vient de la **fiche produit officielle du fabricant**, tout prix porte sa **date de relevé**. Non vérifiable → on ne cite pas le produit.
- **Jamais « nous avons testé »** pour du matériel qui ne l'a pas été. L'auteur du site compare des offres ou mesure sur son terrain ; il n'a pas testé quinze produits. Un faux banc d'essai détruit la crédibilité du site entier.
- **Au moins deux marques réelles** sur un guide d'achat, jamais une seule.
- **Le meilleur conseil est parfois de ne rien acheter** — dis-le quand c'est le cas.
- **La légalité et la sécurité priment sur le conseil d'achat.** Produit interdit ou réglementé en Belgique, intervention sur une installation électrique, gaz ou eau, équipement de sécurité enfant : on traite le cadre avant le produit, et on renvoie au professionnel agréé ou à la notice. Le `piliers.md` du site précise les cas sectoriels.

## 8. Réalimentation du plan et sujets écartés

Un site qui travaille sur un plan (`calendrier-edito.md`, `site-plan.json`, `piliers-editoriaux.md`…) ne doit **jamais s'arrêter faute de sujets**. S'il reste **moins de 8 entrées non publiées**, mine deux ou trois seeds larges des piliers et **ajoute 6 à 10 entrées au plan**, au format exact des existantes, dans le même commit que l'article.

Un sujet infaisable (source introuvable, doublon découvert, aucune demande) se **marque comme écarté** — `- [!] … · écarté le AAAA-MM-JJ (raison)` — et **ne doit plus jamais être réévalué**. Sans ce marquage, chaque run refait la même recherche pour rien.

## 9. Journalisation — c'est elle qui rend la rotation possible

Chaque run note dans `PROGRESS.md`, en plus des informations habituelles :
**le pilier traité, la FORME d'article retenue, le nombre de questions de la FAQ, le nombre de puces du TL;DR, les seeds Cuik utilisés, et les variantes de la grappe couvertes.**

Sans ces éléments, le run suivant ne peut ni faire tourner les piliers, ni faire tourner les formes, ni éviter de reprendre le même nombre de questions de FAQ ou le même nombre de puces de TL;DR, ni éviter de re-miner les mêmes seeds. C'est aussi **l'instrument de contrôle de conformité** du réseau : un journal muet signale une tâche qui n'a pas suivi son prompt.

---

## Workflow
1. **Lire `content/piliers.md`** du site : angle propre, table des piliers, garde-fous sectoriels.
2. **Briefs GEO mesurés EN PRIORITÉ** : si `content/priorites-geo.md` existe et contient des briefs **non cochés**, en traiter UN avant tout autre content gap. Alimenté par la boucle MentionLab mensuelle (`emd-geo-loop`) : chaque brief = un segment où le site est faiblement cité, donc un gap mesuré. **Cocher le brief après publication.**
3. **Sinon, rotation par pilier** (§2 du socle) puis choix du sujet dans le plan du site ou par content gap, en respectant la frontière des assets et la répartition ½ / ¼ / ¼.
4. **Minage Cuik en double appel** (§4 du socle) → head term exact + grappe.
5. **SERP analysis (obligatoire, non remplacée par le volume)** : WebSearch sur le head term retenu → top 3 Google.be (titre, chapô, longueur, H2, FAQ, tableau) + **PAA visibles → candidates FAQ**. Différenciateur documenté. Pas de SERP = run échoué. Sujet saturé **par un concurrent externe** sans angle neuf → reviens au minage. Sujet couvert par un **site frère** → tu peux y aller, sous ton angle.
6. **Choix de la FORME** (section ci-dessous) : ni celle du run précédent, ni celle du run d'avant. La forme fixe la longueur, le taux de H2 en question, le **nombre** de questions de la FAQ, la **nature** du tableau et la **longueur** du TL;DR. Elle ne décide jamais de la *présence* du tableau, de la liste à puces, de la FAQ ni du TL;DR : c'est le plancher GEO, il vaut pour tout article.
7. **Brief + outline** avant rédaction. Les H2 et la FAQ reprennent les variantes de la grappe, reformulées naturellement.
8. **Rédaction** selon la forme retenue et la structure GEO ci-dessous, via `humaniser-fr`.
9. **Images**, **i18n**, **publication**, **journalisation** (§9 du socle).

---

## Les cinq formes d'article — une par texte, en rotation

**Le problème que cette section corrige.** Appliquées à chaque article, nos propres règles de structure *étaient* le gabarit : 70 % de H2 en question, Answer-Explanation-Example dans chaque section, TL;DR de 3-5 puces, FAQ de 6-7 questions, un tableau comparatif. Chaque règle est bonne isolément. Ensemble, elles donnaient le même squelette à tous les articles de tous les sites — un métronome à trois temps, section après section, reconnaissable en trois secondes par un lecteur comme par un classifieur.

**Attention à ce qui faisait réellement le gabarit.** Ce n'étaient pas ces blocs, c'étaient leurs **mesures toujours identiques** : sept questions à chaque fois, un comparatif de marques à chaque fois, une seule liste à puces qui était toujours le TL;DR. Supprimer les blocs pour casser le moule revenait à jeter la visibilité avec l'uniformité — voir le plancher GEO ci-dessous.

**Le bénéfice GEO vient de la masse de questions indexées sur le site, pas de leur répartition dans chaque texte.** Un article à 30 % de H2-questions et un autre à 90 % valent mieux que deux articles à 70 % : même total de questions couvertes, deux textes qui ne se ressemblent pas. Ces contraintes-là portent donc sur le **CORPUS**, et ce sont les formes qui les portent.

| Forme | H2 en question | Longueur corps | FAQ (nb de questions) | TL;DR (nb de puces) | Tableau — sa nature | Answer-Explanation-Example |
|---|---|---|---|---|---|---|
| **L'enquête** | 30-50 % | 1800-2500 mots | 3-4 | court, 3 puces | tableau de données ou de chronologie | sur la moitié des sections |
| **Le guide pratique** | 60-80 % | 900-1400 | 5-7 | 4-5 puces | matériel, coûts, durées | remplacé par des étapes numérotées |
| **Le face-à-face** | 40-60 % | 1200-1600 | 4-5 | 3-4 puces | comparatif, central | sur les sections de critère |
| **La réponse rapide** | 70-90 % | 900-1200 | 6-8 | développé, 5-6 puces | « cas → que faire » | oui, sections courtes |
| **Le décryptage** | 40-60 % | 1400-2000 | 3-5 | court, 3 puces | chiffres à l'appui de la thèse | thèse → objection → nuance |

> ### LE PLANCHER GEO — dans chaque article, sans exception
>
> - **Un tableau au minimum.** Sa **nature** vient de la forme — comparatif, données, chronologie, matériel et coûts, « cas → que faire ». Ce n'est pas toujours un comparatif de marques, et ça ne doit pas l'être.
> - **Une liste à puces au minimum**, et **qui n'est pas le TL;DR** : critères retenus, erreurs fréquentes, points de contrôle, ce qui est inclus et ce qui ne l'est pas.
> - **Une FAQ, toujours.** Son **nombre de questions** vient de la fourchette de la forme — **et à l'intérieur de cette fourchette, ne reprends pas le compte de l'article précédent.** Six questions puis six questions puis six questions, c'est exactement la signature qu'on cherche à faire disparaître.
> - **Un TL;DR, toujours.** C'est le bloc que les moteurs reprennent en résumé et que les LLM citent en premier — s'en priver sur une forme, c'est renoncer à la citation la plus facile. Sa **longueur** vient de la forme, de trois à six puces. Comme pour la FAQ : **ne reprends pas le compte de l'article précédent.**
>
> **La liste à puces exigée par le plancher n'est PAS le TL;DR.** C'est le point qui prête le plus à confusion, donc il est écrit noir sur blanc : ce sont **deux blocs distincts**, et il en faut deux. Le TL;DR **résume** l'article ; la liste à puces **développe un point du corps** — critères, erreurs fréquentes, points de contrôle, ce qui est inclus et ce qui ne l'est pas. Un article dont la seule liste est son TL;DR ne satisfait pas le plancher.
>
> **Pourquoi ces quatre-là et pas d'autres.** Ce sont les blocs que Google extrait en featured snippet et que les LLM reprennent tels quels, mot pour mot : un tableau se cite entier, une liste à puces se cite entière, une paire question-réponse se cite entière, un résumé se cite entier. Les rendre facultatifs selon la forme **coûtait des citations** — deux formes sur cinq publiaient sans FAQ ou sans tableau, et le décryptage sans TL;DR, donc sans prise pour l'extraction. Ce qui devait varier, c'était leur **forme**, pas leur **existence**.

**Ce que chaque forme est.**
- **L'enquête** creuse un sujet qu'on n'a pas encore vu traité correctement : on remonte aux sources, on relève des prix, on compte, et on raconte ce qu'on a trouvé. Peu de titres, longs développements — le corps *est* la réponse, et la FAQ finale, courte (trois ou quatre questions), ne fait que ramasser ce que le récit n'aborde pas frontalement. Le TL;DR y tient en trois puces : ce qu'on a cherché, ce qu'on a trouvé, ce que ça change. Le tableau y est un tableau de données relevées ou une chronologie, pas un comparatif.
- **Le guide pratique** fait faire quelque chose au lecteur. Étapes numérotées, matériel, durée, coût, erreurs fréquentes, quand appeler un pro. Le TL;DR y court sur quatre à cinq puces (durée, coût, matériel, difficulté, le piège principal). Le tableau y porte le matériel, les coûts et les durées. C'est le format que les LLM citent le plus volontiers. JSON-LD `HowTo`.
- **Le face-à-face** oppose deux ou trois options sur des critères explicites. Le tableau comparatif est le cœur de l'article, pas un ornement ; chaque section de critère tranche. Le TL;DR, trois à quatre puces, donne le verdict par profil sans attendre le tableau.
- **La réponse rapide** répond à une question fermée et à ses satellites. Sections courtes, beaucoup de titres interrogatifs, FAQ chargée, tableau « cas → que faire ». C'est la forme la plus « GEO » — TL;DR développé, cinq à six puces — raison de plus pour ne pas la servir tout le temps.
- **Le décryptage** explique pourquoi les choses sont comme elles sont. Il avance une thèse, la confronte à l'objection sérieuse, puis nuance ; ses chiffres sont rassemblés dans un tableau à l'appui de la thèse. Son TL;DR est le plus court de tous — **trois puces**, pas davantage : assez pour donner la prise de citation, trop peu pour dérouler le raisonnement à la place du corps. La FAQ, elle, reste : trois à cinq questions, en fin d'article, là où elle ne court-circuite rien.

### Règles d'usage

- **Tu ne calcules aucune moyenne de corpus.** Elle s'obtient toute seule par la rotation des formes. Ne compte rien, ne rattrape rien : choisis une forme, applique-la.
- **Tu ne reprends pas la forme des DEUX articles précédents.** Vérifie dans `PROGRESS.md` ou dans la liste des articles publiés. **Note la forme retenue, le nombre de questions de FAQ et le nombre de puces du TL;DR dans ton rapport de run** (§9 du socle) — sans ça, le run suivant est aveugle.
- **Le sujet suggère une forme, il ne l'impose pas.** Une procédure appelle le guide pratique, un « X vs Y » le face-à-face, une question fermée la réponse rapide. Mais un sujet peut légitimement être traité en enquête ou en décryptage, et c'est souvent là que naît le meilleur article du mois.
- **Le tableau, la liste à puces, la FAQ et le TL;DR sont SYSTÉMATIQUES.** Ce que la forme fait varier, c'est leur taille et leur nature (plancher GEO ci-dessus). Un tableau posé sur un sujet qui ne compare rien n'est pas un motif pour supprimer le tableau : c'est le signe qu'il fallait un tableau de données, de chronologie ou de cas, et non un comparatif de marques.
- **Les fourchettes de longueur sont celles du corps de l'article**, hors frontmatter, hors FAQ, hors légendes. En dessous du bas de la fourchette, l'article est thin pour sa forme ; au-dessus du haut, c'est en général qu'il fallait deux articles.
- **Un run peut mixer** : une enquête peut se terminer par un tableau récapitulatif, un guide peut ouvrir sur trois puces. Ce que la doctrine interdit, c'est que tous les articles fassent la même chose, de la même taille, au même endroit.

---

## Structure GEO — ce qui est fixe, ce qui dépend de la forme

**Fixe sur tout article, quelle que soit la forme :**
- **Le plancher GEO** : **au moins un tableau**, **au moins une liste à puces** qui n'est pas le TL;DR, **une FAQ**, **un TL;DR**. Voir « Les cinq formes d'article » pour la taille et la nature de chacun.
- **H1** ≤ 60 caractères, head term en tête (sans année).
- **Accord en genre (OBLIGATOIRE).** Accorde TOUJOURS au genre réel de l'entité (`niche.config.entityGender`) : entité féminine → « les **meilleures** néobanques », « **Quelle** néobanque » ; masculine → « les meilleurs opérateurs ». JAMAIS de masculin par défaut. Vaut pour H1, titres, metadata, intros, classement, FAQ.
- **Lead/chapô** 40-60 mots = **réponse directe** dès la première phrase.
- **Signal de définition** pour le concept central. **Désambiguïsation** si la requête a plusieurs intentions.
- **≥ 3 signaux d'Expérience** : dates précises, données belges, faits négatifs, cas limites.
- **≥ 1 donnée propriétaire** (§5 du socle).
- **Maillage interne** : 2-4 liens contextuels (slugs vérifiés), dont 1 vers la page pilier/comparateur du cluster + 1 vers l'asset commercial.
- **Liens sortants — deux natures, à ne jamais confondre :**
  - **Liens d'AUTORITÉ : ≥ 2 par article, en dofollow normal.** Source officielle, régulateur, administration, Wikipédia, documentation constructeur, étude datée. Priorité .be / institutionnel. Une page qui ne cite personne a l'air d'une page qui ne sait rien. **Ne JAMAIS leur mettre `nofollow`** : ce serait garder le lien et jeter le signal.
  - **Liens PRODUIT : uniquement si le produit s'achète en ligne**, là où ça rend service, en `rel="noopener noreferrer nofollow"`, **deux au maximum par article**. **Aucune affiliation, aucun tag, aucun prix barré.**
- **Année dynamique** (`currentYear()` / `[[date]]`) — jamais d'année en dur.

**Dépend de la FORME retenue** (voir le tableau ci-dessus) :
- **Le taux de H2 en QUESTION stricte** — de 30 % sur une enquête à 90 % sur une réponse rapide. Les H2 non interrogatifs sont factuels, jamais du clickbait. Aucun article n'est tenu à 70 %, et le corpus y arrive quand même par la rotation.
- **La longueur du corps.**
- **La LONGUEUR du TL;DR / résumé IA** — de 3 puces sur une enquête ou un décryptage à 5-6 puces développées sur une réponse rapide ; le TL;DR lui-même n'est **jamais** absent, il fait partie du plancher GEO. Puces chiffrées, **dans le frontmatter**, jamais en dur dans le corps. À l'intérieur de la fourchette de la forme, **ne reprends pas le compte de puces de l'article précédent**. Le TL;DR ne compte jamais comme « la » liste à puces de l'article : ce sont deux blocs distincts, et il en faut deux.
- **Le NOMBRE de questions de la FAQ-bloc finale** — de 3 à 8 selon la forme ; la FAQ elle-même n'est **jamais** absente. À l'intérieur de la fourchette de la forme, **ne reprends pas le compte de l'article précédent**. Réponses ≤ 4 phrases. La **FAQ in-flow** (H3) et l'**anticipation de 3-4 follow-ups** restent disponibles sur toutes les formes : ce sont des outils de rédaction **en plus** du bloc final, jamais à sa place.
- **La NATURE du tableau** — comparatif et central sur le face-à-face ; matériel, coûts et durées sur le guide pratique ; données relevées ou chronologie sur l'enquête ; « cas → que faire » sur la réponse rapide ; chiffres à l'appui de la thèse sur le décryptage. Un article de lexique ou de question pure porte un tableau des termes ou des cas, parce que c'est la forme même de sa réponse. Ce qui est proscrit, ce n'est pas le tableau : c'est le réflexe du comparatif de marques quand le sujet ne compare pas de marques.
- **Le pattern Answer-Explanation-Example** — voir juste en dessous.

### Answer-Explanation-Example — sur la majorité des sections, jamais toutes

Le pattern reste bon : (1) réponse directe < 60 mots, citable telle quelle ; (2) explication en 2-4 paragraphes ; (3) exemple chiffré, cas belge ou donnée originale.

Il s'applique sur la **majorité** des sections d'un article. **Jamais sur toutes.**

Certaines sections n'ont besoin que d'une affirmation nette, tenue en trois lignes. D'autres d'un tableau et de deux lignes de commentaire. D'autres d'un récit — ce qu'on a mesuré, où ça a coincé, ce qu'on en a conclu. D'autres encore posent une objection et la laissent ouverte.

**Le pattern appliqué mécaniquement à toutes les sections est la première cause de texte qui sonne généré.** Trois temps identiques, section après section : le lecteur le sent au troisième H2, un classifieur le voit au premier. Un article dont chaque section suit le même gabarit interne est un article que personne ne finit de lire, et le temps de lecture est un signal.

---

## Stratégie d'images (workflow MCP nano-mentionbox)
- **Cover (obligatoire, LA SEULE image générée)** : `[slug]-cover.webp`, 1280×720 (16:9). Prompt ≤ 20 mots dérivé du H1 + DA du site, finissant par « no text, no logos, no watermark » ; **jamais de marque réelle dans le prompt**. Alt factuel ≤ 125 caractères, écrit à la main, dans toutes les locales.
- **Images in-content : RÉUTILISÉES**, aucune génération. `<ArticleImage>` pointant vers les visuels de catégorie existants du repo.
- **Workflow fire-and-poll** : `generate_image` → `wait_for_image` → échec → UN retry en `-v2` → second échec → skip + log « Bloqué » (ne jamais bloquer la publication sur une image) → conversion WebP → `github_push_images`.

## Données structurées (JSON-LD) — par type de page
| Page | Schemas obligatoires |
|---|---|
| Article | Article + Person (auteur) + BreadcrumbList + FAQPage |
| Classement | BreadcrumbList + ItemList + FAQPage |
| Comparatif | BreadcrumbList + ItemList |
| Page auteur | Person |
| Guide / pilier / procédure | Article (+ HowTo si étapes) |

Champs obligatoires d'un Article : `headline`, `datePublished`, `dateModified`, `author` (Person + `sameAs`), `publisher`, `description`, `inLanguage` (`fr-BE`, `en-BE`). **Speakable** sur le TL;DR. `author` = l'auteur/persona du site (jamais « la rédaction »).

> `FAQPage` est **obligatoire sur tout article** : c'est le corollaire direct du plancher GEO, tout article porte une FAQ. Le balisage suit la FAQ réellement publiée, question pour question — un balisage FAQ sans FAQ visible reste une erreur de données structurées. **`Speakable` est obligatoire sur tout article pour la même raison** : le TL;DR fait désormais partie du plancher, donc tout article a une cible `Speakable`. Un article sans `Speakable` signale un article sans TL;DR, c'est-à-dire un plancher non respecté.

## Infrastructure GEO (site)
- **`public/llms.txt`** : index à destination des crawlers LLM, présent et à jour.
- **`robots.txt`** : ne bloque AUCUN crawler IA — `GPTBot`, `ClaudeBot`/`anthropic-ai`, `PerplexityBot`, `CCBot`, `Google-Extended`. Bloquer un crawler IA = renoncer aux citations, contraire au modèle mention.

## Multilingue (FR + EN par défaut)
Miroir FR + EN : slug naturel par langue, FAQ traduite, acronymes belges explicités à la première occurrence, **alt FR + EN**, **mapping i18n** mis à jour (FR↔EN) pour le sélecteur (zéro-404) + hreflang. Sans le mapping, le sélecteur de langue renvoie une 404. Doctrine complète : `references/i18n-multilingue.md`.

## Monitoring de citabilité (mensuel) & refresh
- **Monitoring** : chaque mois, tester ~5 head terms publiés sur Perplexity / ChatGPT Search / Google AI Overview / Claude Search. Logger cité / non cité / concurrent cité. Une chute = ré-audit GEO de l'article. La boucle MentionLab (`emd-geo-loop`) alimente `content/priorites-geo.md`.
- **Refresh** : tout refresh majeur met à jour `dateModified`, les données datées, et re-vérifie sources et concurrents SERP.

## Checklist finale
- [ ] **`content/piliers.md` lu** ; pilier du jour = le moins couvert ; **pas deux runs consécutifs sur le même pilier ni la même catégorie**.
- [ ] **Test d'angle passé** : l'article ne pourrait pas être publié tel quel par un site frère.
- [ ] **Minage Cuik fait en double appel** (BE `2056` puis FR `2250`, `language_id 1002`, seeds groupés, un crédit par appel, jamais `get_ranked_keywords`) → head term exact + grappe. Repli au jugement si l'outil est indisponible, jamais de run bloqué.
- [ ] **Les H2 et la FAQ reprennent les variantes de la grappe.**
- [ ] **`references/garde-fous.md` respecté** : commit seulement si contenu non-vide, aucun écrasement.
- [ ] **Brief `priorites-geo.md` non coché traité en priorité s'il en existe** (puis coché).
- [ ] Répartition ½ marques-modèles / ¼ evergreen pratique / ¼ info vérifiée **contre ce qui est déjà publié** ; persona varié ; marques + persona tagués. **Aucun élément affilié.**
- [ ] **≥ 1 donnée propriétaire belge** (prix relevé et daté, calcul, comparaison régionale, mesure).
- [ ] **Les trois régions traitées** dès que la réponse en dépend.
- [ ] **≥ 2 liens d'autorité en dofollow** ; lien produit uniquement si le produit s'achète en ligne, en nofollow, deux maximum.
- [ ] **Garde-fous produits** si l'article cite du matériel : aucune spécification ni prix non vérifié, tout prix daté, **jamais « nous avons testé »**, ≥ 2 marques, légalité et sécurité traitées avant le produit.
- [ ] **Frontière des assets respectée** : pas de head nu de classement, de comparateur ni de « quel X choisir » ; maille vers l'asset.
- [ ] Page classement (si c'est l'objet) **≥ 1000 mots**.
- [ ] H1 ≤ 60 car. ; lead = réponse directe ; **accord en genre**.
- [ ] **PLANCHER GEO présent** : **≥ 1 tableau** (de la nature qu'appelle la forme, pas un comparatif par défaut), **≥ 1 liste à puces qui n'est pas le TL;DR**, **une FAQ**, **un TL;DR**.
- [ ] **Nombre de questions de la FAQ** dans la fourchette de la forme **et différent de celui de l'article précédent**.
- [ ] **Nombre de puces du TL;DR** dans la fourchette de la forme **et différent de celui de l'article précédent**.
- [ ] **FORME choisie et différente de celles des DEUX runs précédents** ; taux de H2 en question, longueur, longueur du TL;DR, nombre de questions de FAQ et nature du tableau conformes à cette forme — **aucune moyenne de corpus à calculer**.
- [ ] **Answer-Explanation-Example sur la majorité des sections, jamais toutes** ; au moins une section traitée autrement (affirmation nette, tableau commenté, récit).
- [ ] ≥ 3 signaux d'Expérience ; sources datées .be.
- [ ] 2-4 liens internes valides ; **TL;DR dans le frontmatter, jamais en dur dans le corps**.
- [ ] **Images** : 1 cover générée + in-content réutilisées ; alt manuel dans toutes les locales.
- [ ] JSON-LD conforme (`FAQPage` et `Speakable` sur tout article, `Speakable` pointant le TL;DR) ; année dynamique ; `llms.txt` et `robots.txt` intacts.
- [ ] FR + EN + mapping i18n ; passé par `humaniser-fr` ; signé par l'auteur.
- [ ] **Plan réalimenté** s'il restait moins de 8 entrées ; sujets infaisables marqués `- [!]`.
- [ ] **`PROGRESS.md` journalise le pilier, la forme, le nombre de questions de FAQ, le nombre de puces du TL;DR, les seeds Cuik et la grappe couverte.**
