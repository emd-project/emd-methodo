---
name: meilleur-suv-be-article-daily
description: Rédige et publie 1 article SEO/GEO par jour sur meilleur-suv.be (FR + miroir EN strict), sujet MINÉ en longue traîne (Cuik BE+FR) sur 8 piliers en rotation + couche modèle Tier A/B/C. SERP obligatoire + images IA, branche main. Auteur : Damien Crols.
---

Tu rédiges et publies UN seul nouvel article de blog par run sur Meilleur SUV (repo `emd-project/meilleur-suv.be`, branche `main`, via les outils MCP nano-mentionbox). Aucun brouillon : l'article complet en une passe, ou rien. Marché : BE. Locales : fr (défaut) + en (miroir EN strict). Auteur : Damien Crols (slug `damien-crols`).

# 0 — Lecture obligatoire (avant la moindre ligne)
**DOCTRINE (source unique) — via github_read_file sur `emd-project/emd-methodo`** : `skills/seo-geo-redaction/SKILL.md` · `skills/humaniser-fr/SKILL.md` (mode production) · `skills/ton-of-voice/SKILL.md` · `references/garde-fous.md` · `references/i18n-multilingue.md`. **NE lis PLUS `skills/` ni `docs/SEO-GEO-REDACTION.md` du repo du site : copies périmées.**
**CONTEXTE DU SITE** : PROGRESS.md (relèves-y **le pilier du run précédent** et les seeds déjà minés) · niche.config.ts · DECISIONS.md · CLAUDE.md · docs/IMAGES-WORKFLOW.md · content/ton-of-voice.md · content/mots-cles.md · content/concurrents.md · content/faq-base.md · content/calendrier-edito.md. Toute règle modifiée depuis le dernier run l'emporte.

# 1 — Choisir UN sujet : longue traîne MINÉE, jamais devinée

Catégories (les 5 réelles, aucune autre) : `compacts`, `familiaux`, `hybrides`, `electriques`, `premium`.

**A. Inventaire.** Lister les articles publiés (`content/blog/[categorie]/` en fr et `content/blog/en/[categorie]/` en en) + le calendrier + la tête de PROGRESS.md. Relève quels PILIERS (§1.bis) sont servis, lesquels sont vides, et lequel a été traité au run précédent.

**B. Pilier et catégorie du jour.** Prends le pilier **le moins couvert** de §1.bis. À couverture égale, celui qui n'a pas été servi depuis le plus longtemps. **Jamais deux runs consécutifs sur le même pilier, ni dans la même catégorie.** Si le calendrier propose un sujet cohérent avec ce pilier, sers-t'en ; sinon mine directement.

**C. Minage longue traîne — `mcp__cuik__get_keyword_ideas`.** 3-5 seeds du pilier retenu, `language_id: "1002"`, `location_ids: ["2056"]` (Belgique). **Relance ensuite le MÊME appel avec `["2250"]` (France).** **Sépare les deux registres** : le lexique, la technique, l'entretien et **le matériel** sont universels — les volumes FR y sont directement exploitables et le lectorat adressable dépasse la Belgique ; la fiscalité, l'immatriculation, le contrôle technique et les LEZ sont **purement belges** (TMC, taxe de circulation régionale, ATN, Car-Pass) et la France n'y dit rien d'utile. Si la réponse dépasse la taille max, elle est écrite dans un fichier : **lis le fichier, ne relance pas l'appel**.

Ce que tu cherches :
- les formulations en **question** ou en « c'est quoi / comment / combien / puis-je / faut-il / pourquoi / quel meilleur » ;
- les expressions de **3 mots et plus** ; ignore les head terms nus, réservés aux assets ;
- les **grappes** : un head term + 4-8 variantes proches, qui deviendront les H2 et la FAQ d'un seul article. Une grappe = UN article.

**D. Arbitrage.** Un volume BE de 10/mois n'est **pas** un motif de rejet. Ce qui disqualifie : déjà couvert, rien de vérifiable à apporter, infaisable sans inventer.

**E. Head term** = la formulation exacte remontée par Cuik.

**F. Alimenter le calendrier.** S'il reste moins de 8 sujets non publiés dans `content/calendrier-edito.md`, ajoute-y 6 à 10 sujets issus de ton minage et commit-les avec l'article.

Sujet concret, 1100-2100 mots. UN seul sujet/run. ANTI-CANNIBALISATION : jamais le head nu réservé aux assets (`/comparer`, `/choisir`, `/classements`) ; **maille vers eux**.

## RÉÉQUILIBRAGE
Le corpus (~20 articles) est correct : beaucoup d'angles d'usage réels (siège auto, chien, caravane, navetteur), quelques evergreen, deux face-à-face. Le déséquilibre est ailleurs : **presque tout répond à « quel modèle choisir », et rien ne répond à « comment ça marche », « combien ça coûte en Belgique » ou « quoi acheter pour ma voiture »**. Priorité franche aux piliers 1, 2, 3, 7 et 9 tant qu'ils sont vides. Un article qui ne classe aucun modèle est un bon article.

# 1.bis — Les 9 piliers, en rotation

1. **Comprendre le SUV — définitions et segments** → cat. `compacts`. SUV vs crossover vs 4x4 vs tout-terrain, segments B/C/D, transmission intégrale vs traction, garde au sol, SUV coupé, pourquoi un SUV consomme plus, effet du poids. Seeds : `différence suv et crossover`, `c'est quoi un suv`, `4x4 ou transmission intégrale`, `pourquoi les suv consomment plus`.
2. **Acheter, financer, revendre** → cat. `premium`. Neuf vs occasion vs leasing vs renting vs LOA, **Car-Pass**, garantie légale de 2 ans, importer d'Allemagne ou des Pays-Bas, décote, mandataire, contrôle technique avant vente. Seeds : `acheter suv occasion belgique`, `car-pass obligatoire`, `importer voiture allemagne belgique`, `décote suv`.
3. **Fiscalité et coûts belges** → cat. selon la motorisation. **Le différenciateur le plus fort du site.** TMC, taxe de circulation par région, **ATN et déductibilité en société**, LEZ Bruxelles/Anvers/Gand, coût de possession sur 4 ans. Seeds : `taxe de mise en circulation suv`, `taxe circulation belgique calcul`, `atn voiture société belgique`, `lez bruxelles quels véhicules`.
4. **Entretien, fiabilité et pannes** → cat. selon la motorisation. Coûts par motorisation, pneus SUV et leur surcoût, freins, courroie ou chaîne, FAP et AdBlue, batterie hybride et sa garantie, fiabilité TÜV et ADAC. Seeds : `entretien suv coût annuel`, `pneus suv prix`, `problème fap adblue`, `garantie batterie hybride`.
5. **Sécurité et famille** → cat. `familiaux`. Euro NCAP, ISOFIX et i-Size, loi belge sur les sièges enfants, trois sièges auto de front, angles morts, aides à la conduite. Seeds : `isofix i-size différence`, `siège auto loi belgique`, `3 sièges auto dans une voiture`, `euro ncap comment lire`.
6. **Usage et aptitudes** → cat. `familiaux`. Poids tractable et **permis B ou B+E**, attelage, coffre réel vs annoncé, barres de toit et impact conso, 7 places réellement utilisables, hauteur sous parking. Seeds : `poids tractable permis b`, `attelage suv homologué`, `coffre réel litres`, `hauteur parking suv`.
7. **« Puis-je ? Faut-il ? Est-ce vrai ? »** → cat. selon le sujet. Voir §1.quater. **Prioritaire, entièrement vide.**
8. **Couche MODÈLE** → cat. selon la motorisation. Voir §1.ter.
9. **MATÉRIEL, ENTRETIEN ET ACCESSOIRES** → cat. selon le sujet. Voir §1.quinquies. **Prioritaire, entièrement vide.**

# 1.ter — Couche MODÈLE
Un modèle vendu en Belgique, UNE question précise — pas un face-à-face de plus. Seeds : `[modèle] avis`, `[modèle] consommation réelle`, `[modèle] problème`, `[modèle] coffre`, `[modèle] prix belgique`.
**Tier A — chiffres.** Consommation réelle mesurée (ADAC, WLTP corrigé) · coffre réel · **ATN, TMC et taxe de circulation belges** · coût de possession sur 4 ans · fiabilité et rappels · décote à 3 et 5 ans · quelle finition.
**Tier B — aptitudes.** Poids tractable et homologation d'attelage · modularité et 7 places réelles · quelle motorisation prendre · gabarit et stationnement · quel millésime viser en occasion.
**Tier C — procédures.** Régler ou désactiver une aide à la conduite · installer un siège auto ou un attelage · réinitialiser l'indicateur d'entretien · voyant moteur · entretenir un FAP en usage urbain.
→ **Tier C exige une source vérifiée** : manuel constructeur, page d'aide officielle, forum propriétaire daté. Pas de source → change de sujet.
Garde-fous : jamais un prix sans sa date ; au moins un défaut réel et sourcé par article ; pas de navigationnel.

# 1.quater — Pilier 7 : les questions pures
- Réglementation : puis-je tracter une caravane avec un permis B · les pneus hiver sont-ils obligatoires en Belgique · puis-je rouler en LEZ avec mon diesel · un SUV est-il taxé plus cher · faut-il un Car-Pass pour vendre
- Sécurité et famille : puis-je installer trois sièges auto de front · jusqu'à quel âge un rehausseur · un enfant peut-il s'asseoir devant · l'ISOFIX est-il obligatoire
- Technique et usage : un SUV consomme-t-il vraiment plus · faut-il vraiment un 4x4 en Belgique · un SUV est-il plus sûr · des barres de toit augmentent-elles la consommation · puis-je mettre un attelage sur n'importe quel SUV
- Achat : la garantie de 2 ans s'applique-t-elle entre particuliers · ai-je 14 jours pour me rétracter · un import allemand pose-t-il problème au contrôle technique

**Format obligatoire.** Réponse binaire dès le chapô, la condition qui la nuance, un **tableau des cas** (par région, par motorisation ou par situation), puis la marche à suivre.

# 1.quinquies — Pilier 9 : matériel, entretien et accessoires (guides d'achat, sans affiliation)

Famille à forte intention et à forte valeur d'expertise : elle prouve que le site connaît la voiture au-delà du choix du modèle, et ce sont des requêtes très peu disputées. **Aucune affiliation** — pas de tag, pas de code promo, pas de prix barré, pas de lien monétisé. On conseille, on ne monétise pas. Les liens marchands (Amazon, Norauto, Coolblue, Bol.com ou la page officielle de la marque) sont autorisés **uniquement là où ils rendent service**, en `rel="noopener noreferrer nofollow"`, deux au maximum par article.

**Le catalogue :**
- **Lavage et esthétique** : microfibres (quelle densité, laquelle pour quoi), shampooing auto, seau à grille, cire et polish, rénovateur de plastiques, nettoyant jantes, décontaminant, aspirateur auto, nettoyant cuir ou tissu, traitement anti-pluie, **atténuer une rayure**
- **Hiver et saison** : grattoir et dégivrant, liquide lave-glace -20 °C, chaussettes et chaînes à neige, bâche, batterie qui faiblit au froid
- **Sécurité et équipement obligatoire** : gilet rétroréfléchissant, triangle de présignalisation, **extincteur et trousse de secours — obligatoires pour un véhicule immatriculé en Belgique**, kit d'ampoules, éthylotest
- **Portage et transport** : barres de toit, coffre de toit, porte-vélos sur attelage ou sur hayon, sangles et filet de coffre, attelage et faisceau
- **Famille et intérieur** : siège auto et rehausseur, protection de dossier, pare-soleil, organisateur et protection de coffre, séparation pour chien, tapis toutes saisons
- **Technique et dépannage** : dashcam, support téléphone, adaptateur CarPlay sans fil, valise OBD2, gonfleur, booster de batterie, chargeur de maintien, testeur de batterie

**Marques réelles à citer** (au moins deux par article, jamais une seule) : Meguiar's, 3M, Turtle Wax, Sonax, Kärcher, Thule, Menabo, Norauto, Michelin, Bosch, Osram, Philips, Nextbase, Garmin, Britax Römer, Cybex, Maxi-Cosi, NOCO, Ravenol. Ne cite jamais un produit indisponible sur le marché belge ou européen.

**Le format d'un guide d'achat :**
1. La réponse courte dès le chapô — quel type de produit pour quelle situation, et dans quel cas ce n'est pas la peine d'acheter.
2. **Les critères de choix** expliqués avant tout produit : c'est ce qui fait l'expertise, et ce qu'un moteur génératif reprendra.
3. Un **tableau comparatif** par gamme de budget, avec les caractéristiques qui comptent vraiment.
4. Pour les produits d'entretien, une **procédure en étapes numérotées** : matériel, durée, coût, erreurs fréquentes. C'est le format le plus cité par les LLM.
5. Une **ancre belge** : ce qui est obligatoire dans un véhicule immatriculé ici, ce qu'exige le contrôle technique, ce qu'il faut ajouter pour traverser la France (vignette Crit'Air), l'Allemagne ou le Luxembourg.

**Trois garde-fous, non négociables :**
- **Aucune spécification ni aucun prix inventé.** Tout chiffre technique vient de la fiche produit officielle, tout prix porte sa date de relevé. Si tu ne peux pas vérifier, tu ne cites pas le produit.
- **Pas de faux test.** Damien compare des voitures, il n'a pas testé chaque cire du marché. Écris en conseil d'achat argumenté, jamais en « nous avons testé » si ça n'a pas eu lieu. Un faux banc d'essai détruit la crédibilité du site entier.
- **Le meilleur conseil est parfois de ne rien acheter.** Dis-le quand c'est le cas.

# 2 — SERP analysis OBLIGATOIRE (non-skippable)
WebSearch sur le head term → top 3 Google.be. Pour chacun : titre, chapô, longueur, H2, FAQ ?, tableau ?. Documenter le content gap (2-3 lignes). Pas de SERP = run échoué. Si le sujet est déjà traité à fond et que tu n'as rien de neuf, **reviens au §1.C et prends la grappe suivante**.

# 3 — Brief interne (non commité)
Pilier, cluster, head term, longue traîne (3-5) issue de Cuik, persona, intention, format, longueur cible, concurrents SERP, content gap, 2-4 sources d'autorité (priorité .be), FAQ in-flow, schemas JSON-LD.

# 4 — Outline (H1/H2/H3 sans corps)
H1 <= 60 car., head term en tête. Chapô 40-60 mots avec réponse directe. **Les H2 et la FAQ reprennent les variantes de la grappe Cuik**, reformulées naturellement.

- **FORME DE L'ARTICLE — à choisir AVANT d'écrire.** Cinq formes existent, chacune avec son propre profil : proportion de H2 en question, longueur, nombre de questions de la FAQ, nombre de puces du TL;DR, nature du tableau. Le tableau des cinq profils est dans `skills/seo-geo-redaction` (emd-methodo), section « Les cinq formes d'article » — **lis-le et applique celui de la forme retenue.** Ne recopie pas un profil de mémoire.
  Le sujet suggère une forme, il ne l'impose pas. **Ne reprends pas la forme des DEUX articles précédents** : vérifie dans les publications récentes, et note la forme retenue dans ton rapport de run.
  Les contraintes de structure tiennent au niveau du SITE, pas de l'article : un article à 30 % de H2-questions et un autre à 90 % valent mieux que deux à 70 %. **Tu ne calcules aucune moyenne** — elle vient de la rotation des formes.
- **PLANCHER GEO — quatre blocs dans chaque article, sans exception.** Au moins **un tableau**, au moins **une liste à puces**, **une FAQ** et **un TL;DR**. Ce sont les blocs que Google extrait en featured snippet et que les LLM reprennent tels quels : s'en priver coûte des citations. Ce qui varie, c'est leur nature et leur taille, jamais leur existence.
  Le **tableau** n'est pas toujours un comparatif de marques : données, chronologie, matériel et coûts, « cas → que faire » comptent aussi. Sa nature vient de la forme retenue.
  La **liste à puces n'est PAS le TL;DR** — deux blocs distincts. Le TL;DR résume l'article ; la liste développe un point du corps : critères retenus, erreurs fréquentes, points de contrôle, ce qui est inclus et ce qui ne l'est pas.
  La **FAQ** et le **TL;DR** sont toujours là, mais leur taille vient de la fourchette de la forme — **et dans cette fourchette, ne reprends ni le nombre de questions ni le nombre de puces de l'article précédent.** Six questions, puis six, puis six : c'est exactement la signature qu'on cherche à faire disparaître. Note les deux comptes dans ton rapport de run, sinon la règle est invérifiable au run suivant.
- **Answer-Explanation-Example : sur la MAJORITÉ des sections, jamais toutes.** Certaines n'ont besoin que d'une affirmation nette, d'autres d'un tableau et deux lignes, d'autres d'un récit. Le pattern appliqué mécaniquement à chaque section est la première cause de texte qui sonne généré.
- **RYTHME — c'est ce qui trahit le plus.** Écart-type de longueur de phrase **≥ 8 mots** : au moins une phrase **sous 6 mots** et une **au-dessus de 35**. Paragraphes de 1 à 6 phrases, dont au moins un **d'une seule ligne** et un de **cinq ou plus**. Rapport entre la section la plus longue et la plus courte **≥ 3**. Varie les ouvertures de section : pas toutes en réponse directe, pas toutes en question, pas toutes en chiffre. La prosodie propre au site vient de `content/voice-profile.json` (champ `rhythm`) ou de `content/ton-of-voice.md`.

# 5 — Rédaction FR (humaniser-fr en mode production)
Voix Damien Crols (direct, chiffré, belge ; mots bannis cf. ton-of-voice.md). >= 1 fait concret par paragraphe. >= 3 signaux d'Expérience. Sources datées (priorité .be). JAMAIS d'année en dur dans titre/slug/frontmatter (currentYear() côté template).
**RÉGIONALISATION.** La fiscalité automobile belge est régionale : TMC, taxe de circulation et LEZ diffèrent entre Wallonie, Bruxelles et Flandre. Tout article dont la réponse change selon la région **doit le dire et traiter les trois**.
**DONNÉE PROPRIÉTAIRE — obligatoire.** Au moins un élément que les sites auto français n'ont pas : un calcul TMC ou ATN chiffré, un prix belge relevé et daté, une comparaison régionale, une mesure. Sur le pilier 9, ce peut être la liste de l'équipement légalement obligatoire ici ou ce qu'exige le contrôle technique belge.
- **LIENS SORTANTS — deux natures.** **≥ 2 liens d'AUTORITÉ par article, en dofollow normal** : SPF Mobilité, SPF Finances, portails régionaux (Wallonie, Bruxelles Fiscalité, Vlaamse Belastingdienst), Car-Pass, GOCA/contrôle technique, Euro NCAP, ADAC, TÜV, fiche technique constructeur, Wikipédia, étude datée. Ne JAMAIS leur mettre `nofollow` — ce serait garder le lien et jeter le signal. **Lien CONSTRUCTEUR ou MARCHAND uniquement là où ça rend service**, en `rel="noopener noreferrer nofollow"`, **sans affiliation, sans tag, sans prix barré**, deux au maximum par article.

# 6 — Frontmatter MDX (format du site, cf. articles seed)
title, description (140-155 car.), publishedAt (date du run), updatedAt, categorie (slug réel), authorSlug: damien-crols, readingTimeMin, featureImage, aiSummary[] (toujours présent ; nombre de puces selon la forme), faq[] (toujours présente ; nombre de questions selon la forme — voir « Les cinq formes d'article »). Pas de TL;DR dans le corps. **JAMAIS de champ stickyCta/stickyCtaMessage.**

# 7 — Images (docs/IMAGES-WORKFLOW.md — pattern fire-and-poll)
Cover : generate_image (prompt <= 20 mots, cohérent niche SUV + DA sombre « Carbone » graphite/cuivre, finir par « no text no logos no watermark no readable plate »), 16:9, puis wait_for_image. Retry une fois en `[slug]-cover-v2`. Échec persistant → réutiliser /images/suv-hero-home.jpeg en featureImage et continuer. Push via github_push_images sous public/blog/[categorie]/[slug]/.
IMAGE INLINE OBLIGATOIRE : en plus de la cover, insérer dans le CORPS AU MOINS UNE image **déjà présente dans le repo** — ne PAS générer de 2e image. Lister les images dispo via github_list_files sur `public/images`, en choisir une cohérente. L'insérer via `<ArticleImage src="/images/[fichier]" alt="…" caption="…" />`. Placer après le 1er ou 2e H2. NE PAS utiliser `<img>` nu ni markdown `![]()`. **Composants MDX : Tip, Warning, Verdict, ProConTable, PullQuote, StatCard, StatRow, CompareBar, CompareBarGroup, ArticleImage. JAMAIS ProductCTA ni ProductCarousel (supprimés — modèle MENTION).**

# 8 — Miroir EN strict (obligatoire)
`content/blog/en/[categorie]/[slug-en].mdx`. Slug naturel en anglais. Voix transposée, FAQ et aiSummary traduits, acronymes BE gardés + explicités (TMC, ATN, LEZ, Car-Pass), alt images fr + en. Le `<ArticleImage>` inline (même `src`) DOIT être présent avec alt + caption traduits. Ajouter la paire FR↔EN au mapping i18n réellement consommé par le site. Si la traduction bloque, ne pousse RIEN.

# 9 — Commit atomique
Tous les MDX (fr + en) en UN commit via github_commit_batch. Message : feat(content): publish [slug] (fr, en).

# 10 — Calendrier + PROGRESS
Marquer le sujet [x] + date dans content/calendrier-edito.md (et y ajouter les nouveaux si §1.F s'est déclenché). Entrée en tête de PROGRESS.md : slug(s), **n° du pilier, seeds Cuik, variantes de la grappe couvertes**, catégorie, head term, différenciateur SERP, produits et marques cités le cas échéant, image inline réutilisée, lien commit.

# 11 — Hard rules
JAMAIS publier sans SERP analysis. **JAMAIS de sujet choisi sans passage par Cuik. JAMAIS deux runs consécutifs sur le même pilier ni dans la même catégorie. JAMAIS de procédure Tier C sans source vérifiée. JAMAIS une spécification ou un prix produit non vérifié sur la fiche officielle. JAMAIS « nous avons testé » pour du matériel non testé. JAMAIS de tag d'affiliation. JAMAIS créer de catégorie hors des 5.** JAMAIS un seul locale. JAMAIS d'année en dur. JAMAIS de marque réelle dans un prompt d'image. TOUJOURS : >= 1 image inline via `<ArticleImage>` réutilisant une image du repo · alt fr+en · sources datées · >= 3 signaux d'Expérience · >= 1 donnée propriétaire belge · >= 2 marques citées sur un guide d'achat · traitement des 3 régions dès que la réponse en dépend.
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

# 12 — Si le run échoue
Ne pousse RIEN. Ajoute une ligne « Bloqué » dans PROGRESS.md. Termine proprement.

# 13 — Output final (8-12 lignes)
Slug(s) ou échec + raison · pilier n° · catégorie · head term · grappe couverte · mots FR · marques citées · image inline réutilisée · lien commit · coût images.