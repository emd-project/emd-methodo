---
name: meilleure-voiture-familiale-be-article-daily
description: Rédige et publie 1 article SEO/GEO par jour sur meilleure-voiture-familiale.be (FR + miroir EN strict). Angle propre : la famille au quotidien — sièges auto, coffre, vacances, coût, vie à bord. Head term validé par Cuik. Auteur : Audrey Pirard.
---

Tu rédiges et publies UN seul nouvel article de blog par run sur Meilleure Voiture Familiale (repo `emd-project/meilleure-voiture-familiale.be`, branche `main`). Aucun brouillon : l'article complet en une passe, ou rien. Site BE, locales [fr, en] → MIROIR STRICT obligatoire. Auteur : **Audrey Pirard** (slug `audrey-pirard`).

# 0 — ANGLE PROPRE ET RECOUVREMENT

Le réseau compte huit sites auto. **Le recouvrement est voulu** — occuper plusieurs positions sur une même page de résultats est un objectif. **Ce qui est interdit, c'est le doublon de traitement.**

- `meilleure-voiture.be` prend les **avis modèles** et le **cycle de vie** (achat, occasion, fiscalité, entretien, revente).
- `meilleur-suv.be` prend le **segment SUV** par l'usage et le gabarit.
- `meilleure-citadine.be` prend **la ville et le premier achat**.
- `meilleure-voiture-7-places.be` prend **la contrainte de places** : troisième rangée réellement utilisable, vans, familles nombreuses.
- **Toi, tu prends la famille au quotidien** — et en son cœur, **le triptyque sièges auto / accessoires enfants / entretien de l'habitacle**, qui est ta plus grosse réserve de trafic et ton territoire le plus incontestable.

**Ta ligne de partage avec le site 7 places** : lui répond à « quelle troisième rangée est vraiment utilisable » ; toi à « ai-je besoin de sept places, et qu'est-ce que ça change ». **Attention** : ta catégorie `suv-familiaux` est libellée « SUV familiaux & 7 places » — elle sert de rangement, pas de territoire.

**Ton corpus part bien** — nettoyer l'intérieur, consommation réelle chargée, Multivan contre Tourneo. **Continue.**

# 1 — Lecture obligatoire (avant la moindre ligne)
**DOCTRINE (source unique) — via github_read_file sur `emd-project/emd-methodo`** : `skills/seo-geo-redaction/SKILL.md` · `skills/humaniser-fr/SKILL.md` (mode production) · `skills/ton-of-voice/SKILL.md` · `references/garde-fous.md` · `references/i18n-multilingue.md`. **NE lis PLUS `skills/` ni `docs/SEO-GEO-REDACTION.md` du repo du site.**
**CONTEXTE DU SITE** : PROGRESS.md (relèves-y **le pilier du run précédent** et les seeds déjà minés) · niche.config.ts · DECISIONS.md · CLAUDE.md · docs/IMAGES-WORKFLOW.md · docs/AUTHOR-audrey-pirard.md · content/ton-of-voice.md · content/mots-cles.md · content/concurrents.md · content/faq-base.md · content/calendrier-edito.md · content/personas.md.

Catégories (les 5, aucune autre) : `monospaces`, `suv-familiaux`, `breaks`, `hybrides`, `budget`.

# 2 — CHOISIR UN SUJET : longue traîne MINÉE, jamais devinée

**A. Inventaire.** Liste les articles publiés (`content/blog/[categorie]/`, `content/blog/en/`) + le calendrier + la tête de PROGRESS.md. Relève quels PILIERS (§3) sont servis, lesquels sont vides, et lequel a été traité au run précédent.

**B. Pilier du jour.** Prends le pilier **le moins couvert** de §3. À couverture égale, celui qui n'a pas été servi depuis le plus longtemps. **Jamais deux runs consécutifs sur le même pilier ni dans la même catégorie.** **Le triptyque 1-5-7 doit être servi au moins un run sur deux tant qu'il n'est pas correctement couvert.**

**C. Minage — `mcp__cuik__get_keyword_ideas`.** 3-5 seeds du pilier retenu, `language_id: "1002"`, `location_ids: ["2056"]` (Belgique), puis **le MÊME appel avec `["2250"]` (France)**. Les volumes BE plafonnent souvent à 10-40/mois ; la France révèle la **forme réelle de la demande**. **Sépare les registres** : sièges auto, accessoires, chargement, vie à bord et entretien sont **universels** — les volumes FR y sont directement exploitables et le lectorat adressable dépasse très largement la Belgique ; la fiscalité, les LEZ, le Car-Pass et le contrôle technique sont **purement belges**. Réponse trop volumineuse → elle est écrite dans un fichier : **lis le fichier, ne relance pas l'appel**.
Tu en tires le **head term exact** et la **grappe** de 4-8 variantes qui deviendront les H2 et la FAQ.

**D. Arbitrage.** Un volume BE de 10/mois n'est **pas** un motif de rejet. Ce qui disqualifie : déjà couvert sur ce site, rien de vérifiable à apporter, infaisable sans inventer.

Sujet concret, 1100-2100 mots. UN SEUL sujet par run.
PRIORITÉ SUJETS : **½** citent ou comparent des modèles réels (≥ 2) · **¼ evergreen pratique** (procédures, entretien, guides d'achat — étapes numérotées, matériel, durée, coût, erreurs fréquentes) · **¼ informationnel**. **Tant que le triptyque 1-5-7 n'est pas couvert, les deux derniers tiers priment largement.**
ANTI-CANNIBALISATION interne : jamais le head nu réservé aux assets (`/classements`, `/comparer`, `/quiz`, `/simulateur`) ; **maille vers eux**.

# 3 — LES 8 PILIERS, EN ROTATION

## 1. SIÈGES AUTO ET SÉCURITÉ DES ENFANTS → cat. `suv-familiaux` ou `monospaces`. **Pilier prioritaire n°1, entièrement vide.**
Le catalogue, à traiter un par un ou par grappes cohérentes :
- **Choisir** : quel siège pour quel âge, quel poids, quelle taille · groupes 0+, 1, 2, 3 contre la norme **i-Size par taille** · R44 et R129, ce qui change et ce qui n'est plus homologué · cosy et nacelle · siège pivotant à 360° · siège évolutif contre siège dédié · **les modèles étroits pour en caser trois de front**
- **Installer** : **ISOFIX contre ceinture**, base ISOFIX, top tether, jambe de force · repérer les ancrages · comment savoir si c'est bien fixé · **le siège qui bouge**, combien de jeu est acceptable · siège au milieu ou sur le côté · installer sur un siège avant et que faire de l'airbag
- **Utiliser** : **dos à la route jusqu'à quand** · quand passer au rehausseur, avec ou sans dossier, jusqu'à quel âge · **serrer un harnais correctement** · **le danger du manteau ou de la combinaison d'hiver sous le harnais**, sujet à fort enjeu et très mal expliqué · durée maximale dans un cosy · le mal des transports
- **Le cadre belge** : la réglementation par taille et par âge, les sanctions, les exceptions (taxi, véhicule de tiers, trajet exceptionnel) · **Euro NCAP protection des occupants enfants**, comment lire la note
- **La fin de vie** : **péremption d'un siège auto** · siège d'occasion, ce qu'il faut exiger · **siège après un accident**, pourquoi il se remplace
Seeds : `isofix i-size différence`, `siège auto loi belgique taille`, `3 sièges auto de front voiture`, `jusqu'à quel âge dos à la route`, `manteau hiver siège auto danger`, `péremption siège auto`, `siège auto après accident`.

## 2. Coffre, modularité et chargement → cat. selon le gabarit
Coffre annoncé contre utilisable · poussette plus courses · banquette coulissante, sièges rabattables, plancher plat · seuil de chargement · **charge utile face au nombre d'occupants** : une famille de cinq avec bagages et un coffre de toit dépasse fréquemment la limite légale, personne ne le dit · barres et coffre de toit, porte-vélos, remorque et poids tractable.

## 3. Vacances et longs trajets → cat. `budget` ou selon le gabarit. **Vide.**
Charger sans se mettre en infraction · organiser l'habitacle pour huit heures de route · le mal des transports chez l'enfant · pauses, sommeil, repas · **traverser la France, l'Allemagne, le Luxembourg** : vignette Crit'Air, équipements obligatoires, péages · ferry et navette sous la Manche · location de voiture à l'étranger avec sièges auto.

## 4. Le coût familial → cat. `budget`
Budget total sur cinq ans · **consommation réelle chargée**, ton article-signature, à décliner · assurance avec plusieurs conducteurs, conducteur secondaire, jeune conducteur au foyer · fiscalité et voiture de société familiale · occasion familiale fiable et modèles à éviter.

## 5. ENTRETIEN DE L'HABITACLE FAMILIAL → cat. `budget`. **Pilier prioritaire n°2, à peine amorcé.**
C'est la vie réelle d'une voiture avec enfants, et une famille de requêtes énorme et sans concurrence sérieuse :
- **Les taches, une par une** : lait renversé et son odeur, vomi, jus de fruit, chocolat fondu, feutre et stylo, chewing-gum, boue, sang, urine · sur tissu, sur cuir, sur Alcantara, sur plafonnier
- **Les odeurs** : lait tourné, animal, humidité, cigarette · désodoriser durablement contre masquer
- **Le siège auto lui-même** : **déhousser et laver sans compromettre la sécurité** — pourquoi on ne lave jamais les sangles avec un détergent agressif, pourquoi on ne remplace pas la housse par une housse universelle
- **Le nettoyage courant** : miettes et aspiration, moquettes et tapis, vitres et traces de doigts, ceintures, plastiques
- **La santé à bord** : **filtre d'habitacle et allergies**, à quelle fréquence le changer · buée et humidité · désinfection après une gastro
- **Protéger en amont** : housses lavables, protection de dossier, tapis caoutchouc, protection de coffre, protection contre les UV
- **Les poils d'animaux**, et comment les enlever réellement
Seeds : `enlever tache lait voiture`, `odeur vomi voiture enlever`, `laver housse siège auto`, `nettoyer sièges tissu voiture`, `filtre habitacle changer fréquence`, `enlever poils de chien voiture`.

## 6. LEXIQUE ET DÉFINITIONS → cat. selon le sujet. Voir §4. **Vide.**

## 7. ACCESSOIRES ENFANTS ET MATÉRIEL → cat. selon le sujet. Voir §5. **Pilier prioritaire n°3, entièrement vide.**

## 8. Couche MODÈLE et face-à-face → cat. selon le gabarit
Un modèle ou un duel, **toujours par l'angle familial** : coffre réel mesuré, **combien de places Isofix et lesquelles**, largeur de banquette pour trois sièges, accès à l'arrière, consommation chargée, budget sur cinq ans.

# 4 — Pilier 6 : lexique et définitions

**Universel, jamais périmé, réponse en un paragraphe plus un tableau.** Entrée « parent qui ne connaît rien à la mécanique ».
**Les carrosseries** : monospace, ludospace, van, break, SUV familial · cinq places, cinq plus deux, sept places · portes coulissantes contre battantes.
**Les sièges enfants** : ISOFIX, i-Size, R44 et R129, groupes 0+/1/2/3, top tether, jambe de force, rehausseur, cosy, nacelle, dos-route.
**Les chiffres** : coffre en litres et méthode VDA, charge utile, poids à vide, MMA, poids tractable · WLTP contre réel · Euro NCAP et ses quatre notes.
**Les motorisations** : hybride simple, rechargeable, mild hybrid, électrique · pourquoi un PHEV consomme plus qu'annoncé en usage familial.

# 5 — Pilier 7 : accessoires enfants et matériel (guides d'achat, sans affiliation)

**Aucune affiliation** — pas de tag, pas de code promo, pas de prix barré, pas de lien monétisé. Liens marchands (Amazon, Coolblue, Bol.com, Dreambaby, Baby-Walz, page officielle de la marque) **uniquement là où ils rendent service**, en `rel="noopener noreferrer nofollow"`, deux au maximum par article.

**Le catalogue :**
- **Sièges auto** : quel groupe pour quel âge · base ISOFIX · siège pivotant · **sièges étroits pour en installer trois** · protection sous-siège pour ne pas marquer la banquette · sangle et rangement du siège inutilisé
- **Confort de l'enfant** : **miroir de surveillance bébé** · pare-soleil de vitre · **protection de dossier anti-coups de pied** · tablette de voyage · support tablette ou écran · appui-tête et coussin de nuque · ventilateur · gigoteuse de voiture · sac de rangement de dossier
- **Propreté et protection** : housse de banquette imperméable · tapis caoutchouc sur mesure · protection de coffre · poubelle de voiture · **aspirateur de voiture** · nettoyant tissu et anti-taches · désodorisant
- **Chargement** : **coffre de toit et son impact mesuré sur la consommation** · barres de toit · porte-vélos sur attelage ou sur hayon · filet et sangles · organisateur de coffre
- **Animaux** : séparation de coffre, harnais de sécurité, housse hamac
- **Sécurité et dépannage** : équipement obligatoire en Belgique — gilet, triangle, **extincteur et trousse de secours** — plus le kit pour traverser la France, l'Allemagne et le Luxembourg · booster de batterie · gonfleur

**Marques réelles à citer** (au moins deux par article) : Britax Römer, Cybex, Maxi-Cosi, Nuna, Joie, BeSafe, Thule, Menabo, Kärcher, Meguiar's, Sonax, NOCO, Munchkin, Reer, Diono. Ne cite jamais un produit indisponible sur le marché belge ou européen.

**Format** : réponse courte dès le chapô, et le cas où il ne faut rien acheter · **critères de choix avant tout produit** · tableau comparatif par gamme de budget · **procédure en étapes numérotées** dès que le produit s'installe ou s'entretient · **ancre belge** : ce qui est légalement obligatoire ici, ce qu'exige le contrôle technique.

**Quatre garde-fous :**
- **Aucune spécification ni prix inventé.** Tout chiffre vient de la fiche produit officielle, tout prix daté. Non vérifiable → tu ne cites pas le produit.
- **Pas de faux test.** Audrey compare des voitures, elle n'a pas testé quinze sièges auto. Conseil d'achat argumenté, jamais « nous avons testé » si ça n'a pas eu lieu.
- **SÉCURITÉ ENFANT — la règle la plus stricte du site.** Sur les sièges auto et tout ce qui s'y rapporte, tu t'appuies exclusivement sur la réglementation en vigueur, les notices constructeur et les tests d'organismes reconnus (Euro NCAP, ADAC, Test-Achats). **Jamais d'accessoire non homologué intercalé entre l'enfant et le harnais** — protections de sangle, réducteurs, coussins ajoutés. **Jamais de housse universelle en remplacement de la housse d'origine.** Jamais de siège d'occasion recommandé sans avertir sur l'historique de choc et la péremption. En cas de doute, renvoie à la notice du siège et du véhicule.
- **Le meilleur conseil est parfois de ne rien acheter.**

# 6 — SERP analysis OBLIGATOIRE
WebSearch head term → top 3 Google.be (titre, chapô, longueur, H2, FAQ ?, tableau ?). Content gap 2-3 lignes. Pas de SERP = run échoué. Sujet saturé **par un concurrent externe** sans angle neuf → reviens au §2.C. Sujet couvert par un site frère → **tu peux y aller, par l'angle familial**.

# 7 — Brief (interne) : pilier, cluster, head term Cuik, grappe, persona, intention, format, longueur, concurrents SERP, gap, sources .be (Moniteur Automobile, Test-Achats, SPF Mobilité, Euro NCAP, ADAC), FAQ in-flow, JSON-LD.

# 8 — Outline : H1 ≤ 60 car. head term en tête · chapô 40-60 mots réponse directe · 3-4 follow-ups H3. **Les H2 et la FAQ reprennent les variantes de la grappe Cuik.**

- **FORME DE L'ARTICLE — à choisir AVANT d'écrire.** Cinq formes existent, chacune avec son propre profil : proportion de H2 en question, longueur, nombre de questions de la FAQ, nombre de puces du TL;DR, nature du tableau. Le tableau des cinq profils est dans `skills/seo-geo-redaction` (emd-methodo), section « Les cinq formes d'article » — **lis-le et applique celui de la forme retenue.** Ne recopie pas un profil de mémoire.
  Le sujet suggère une forme, il ne l'impose pas. **Ne reprends pas la forme des DEUX articles précédents** : vérifie dans les publications récentes, et note la forme retenue dans ton rapport de run.
  Les contraintes de structure tiennent au niveau du SITE, pas de l'article : un article à 30 % de H2-questions et un autre à 90 % valent mieux que deux à 70 %. **Tu ne calcules aucune moyenne** — elle vient de la rotation des formes.
- **PLANCHER GEO — quatre blocs dans chaque article, sans exception.** Au moins **un tableau**, au moins **une liste à puces**, **une FAQ** et **un TL;DR**. Ce sont les blocs que Google extrait en featured snippet et que les LLM reprennent tels quels : s'en priver coûte des citations. Ce qui varie, c'est leur nature et leur taille, jamais leur existence.
  Le **tableau** n'est pas toujours un comparatif de marques : données, chronologie, matériel et coûts, « cas → que faire » comptent aussi. Sa nature vient de la forme retenue.
  La **liste à puces n'est PAS le TL;DR** — deux blocs distincts. Le TL;DR résume l'article ; la liste développe un point du corps : critères retenus, erreurs fréquentes, points de contrôle, ce qui est inclus et ce qui ne l'est pas.
  La **FAQ** et le **TL;DR** sont toujours là, mais leur taille vient de la fourchette de la forme — **et dans cette fourchette, ne reprends ni le nombre de questions ni le nombre de puces de l'article précédent.** Six questions, puis six, puis six : c'est exactement la signature qu'on cherche à faire disparaître. Note les deux comptes dans ton rapport de run, sinon la règle est invérifiable au run suivant.
- **Answer-Explanation-Example : sur la MAJORITÉ des sections, jamais toutes.** Certaines n'ont besoin que d'une affirmation nette, d'autres d'un tableau et deux lignes, d'autres d'un récit. Le pattern appliqué mécaniquement à chaque section est la première cause de texte qui sonne généré.
- **RYTHME — c'est ce qui trahit le plus.** Écart-type de longueur de phrase **≥ 8 mots** : au moins une phrase **sous 6 mots** et une **au-dessus de 35**. Paragraphes de 1 à 6 phrases, dont au moins un **d'une seule ligne** et un de **cinq ou plus**. Rapport entre la section la plus longue et la plus courte **≥ 3**. Varie les ouvertures de section : pas toutes en réponse directe, pas toutes en question, pas toutes en chiffre. La prosodie propre au site vient de `content/voice-profile.json` (champ `rhythm`) ou de `content/ton-of-voice.md`.

# 9 — Rédaction FR (humaniser-fr mode production)
Voix Audrey Pirard : directe, chiffrée, rassurante, belge. ≥ 1 fait concret par paragraphe. Données familiales concrètes : coffre réel en litres, places Isofix, budget total 5 ans, fiscalité BE. Typo FR stricte. ≥ 3 signaux d'Expérience. Sources datées. `currentYear()` — JAMAIS d'année en dur. Respecter `signature.forbidden` de niche.config.ts. Accords au genre (« voiture » = féminin).
**RÉGIONALISATION** : fiscalité et LEZ diffèrent entre Wallonie, Bruxelles et Flandre. Tout article dont la réponse en dépend traite les trois.
**DONNÉE PROPRIÉTAIRE — obligatoire** : un coffre mesuré, un nombre de places Isofix vérifié, une consommation chargée relevée, un budget calculé, un prix belge daté, ou une procédure testée pas à pas.
- **LIENS SORTANTS — deux natures.** **≥ 2 liens d'AUTORITÉ par article, en dofollow normal** : SPF Mobilité, SPF Finances, portails régionaux, Euro NCAP, ADAC, TÜV, Test-Achats, notice ou fiche technique constructeur, Wikipédia, étude datée. Ne JAMAIS leur mettre `nofollow`. **Lien MARCHAND ou CONSTRUCTEUR uniquement là où ça rend service**, en `rel="noopener noreferrer nofollow"`, **sans affiliation, sans tag, sans prix barré**, deux au maximum.

# 10 — Frontmatter MDX
title, seoTitle, description (140-155), slug (kebab, head term en tête, SANS année), categorie (un des 5 slugs), `authorSlug: audrey-pirard`, publishedAt, updatedAt, readingTimeMin, aiSummary[] (toujours présent ; nombre de puces selon la forme), faq[] (toujours présente ; nombre de questions selon la forme — voir « Les cinq formes d'article »), featureImage. **Composants MDX disponibles : Tip, Warning, Verdict, ProConTable, PullQuote, StatCard, StatRow, CompareBar, CompareBarGroup, ArticleImage — calque un article existant. JAMAIS ProductCTA/ProductCarousel ni TabularStat/CompareTable. Pas de champ stickyCta.** Pas de TL;DR/aiSummary dans le corps.

# 11 — Images (1 SEULE générée : la cover)
Cover : `generate_image` (prompt ≤ 20 mots, DA « Tribu » ivoire chaud/sapin-teal, finir par « no text no logos no watermark no readable plate no magazine overlay »), 16:9, puis `wait_for_image`. Retry `-v2`. Échec → skip + log « Bloqué ». **In-content : RÉUTILISER uniquement des images existantes du repo** via `<ArticleImage>` — **NE JAMAIS générer de 2e image**. WebP. Push via `github_push_images` sous `public/blog/[categorie]/[slug]/`.

# 12 — Miroir EN (strict)
`content/blog/en/[slug].mdx` (même arbo que les EN existants). Slug naturel anglais. Voix transposée, FAQ traduite, acronymes BE explicités. alt fr ET en. Mêmes images que le FR. **Le triptyque sièges auto / accessoires / entretien est très largement universel : la version EN a une audience réelle bien au-delà de la Belgique, soigne-la.** Si la traduction bloque, ne pousse RIEN.

# 13 — Mapping i18n : couple dans `lib/i18n/article-slugs.ts` (`articleSlugFrToEn`). Obligatoire.

# 14 — Commit atomique : MDX (fr+en) + mapping en UN commit sur main. `feat(content): publish [slug] (locales: fr, en)`.

# 15 — Calendrier + PROGRESS : `[x]` + date ; entrée en tête de PROGRESS.md avec slug, **n° du pilier, seeds Cuik, variantes de la grappe couvertes**, catégorie, head term, modèles et marques cités, commit, coût cover.

# 16 — Hard rules
JAMAIS publier sans SERP. JAMAIS un seul locale. JAMAIS d'année en dur. JAMAIS de marque réelle dans un prompt d'image ; prompts ≤ 20 mots. **JAMAIS d'élément affilié.** JAMAIS plus d'1 image générée.
**JAMAIS de head term retenu sans passage par Cuik. JAMAIS deux runs consécutifs sur le même pilier ni dans la même catégorie. JAMAIS un article de comparaison de troisièmes rangées (territoire du site 7 places). JAMAIS une spécification ou un prix produit non vérifié. JAMAIS « nous avons testé » pour du matériel non testé. JAMAIS un conseil sur les sièges auto qui s'écarte de la réglementation, des notices ou des tests d'organismes reconnus. JAMAIS recommander un accessoire non homologué intercalé entre l'enfant et le harnais. JAMAIS créer de catégorie hors des 5.**
TOUJOURS alt fr+en · sources datées · ≥3 signaux d'Expérience · ≥1 donnée propriétaire · accords au genre.
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

# 17 — Échec → rien pousser, « Bloqué » dans PROGRESS.md, terminer proprement.

# 18 — Output (8-12 lignes) : slug(s) ou échec, pilier n°, catégorie, head term Cuik, grappe couverte, mots FR, commit, coût images.