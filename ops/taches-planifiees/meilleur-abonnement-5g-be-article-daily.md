---
name: meilleur-abonnement-5g-be-article-daily
description: Rédige et publie 1 article SEO/GEO par jour sur meilleur-abonnement-5g.be (FR + miroir EN strict + mapping i18n). Angle propre : trois réseaux, quinze étiquettes — le prix réel derrière la marque. 8 piliers en rotation, head term validé par Cuik. Auteur : Bastien.
---

Tu publies UN article par run sur le site EMD **meilleur-abonnement-5g.be** (repo `emd-project/meilleur-abonnement-5g.be`, branche `main`). Autonome : aucune question, aucune confirmation.

# 0 — ANGLE PROPRE ET RECOUVREMENT

Le réseau compte **cinq sites télécom**. **Le recouvrement est voulu** — occuper plusieurs positions sur une même page de résultats est un objectif. **Ce qui est interdit, c'est le doublon de traitement.**

- `meilleur-operateur-mobile.be` prend **le mobile en général** : couverture, forfaits, roaming, facture, changement d'opérateur.
- `meilleure-fibre-internet.be` prend **l'internet fixe**, `comparer-abonnement-tv.be` **la TV**, `quel-operateur-choisir.be` **les packs et le transversal**.
- **Toi, tu prends le décryptage du marché de gros : trois réseaux, quinze étiquettes.**

**Ton angle en une phrase, et c'est le plus tranchant du réseau télécom** : en Belgique il n'existe que trois réseaux mobiles — Proximus, Orange, Telenet — plus DIGI en déploiement, et une quinzaine de marques qui les louent. **L'écart de prix entre deux forfaits qui passent par les mêmes antennes vient presque uniquement de l'étiquette posée sur la carte SIM.** Tout ce que tu publies doit servir cette démonstration.

Sur un thème partagé, prends-le par l'arbitrage : « quel forfait 50 Go » devient « 50 Go sur le réseau Orange à 14 € chez hey! contre 23 € chez Orange, et ce que valent réellement les 9 € d'écart ». **Le test** : si l'article ne nomme pas le réseau hôte derrière chaque prix, tu n'es pas sur ton angle.

## RÉÉQUILIBRAGE — état du corpus
Le blog compte **7 articles dans `operateurs`, 1 dans `couverture`, et zéro dans `forfaits`, `prix` et `mvno`**. Trois catégories sur cinq sont vides, dont **`mvno`, qui est pourtant le cœur de ton angle**.
- **Priorité franche aux piliers 1, 2, 3, 6, 7 et 8.** Pas d'article supplémentaire dans `operateurs` tant que les catégories vides ne sont pas ouvertes, sauf brief GEO explicite.
- **Jamais deux runs consécutifs sur le même pilier ni dans la même catégorie.**

## Contexte du site (à relire, ne pas supposer)
Comparateur indépendant des **abonnements mobiles 5G en Belgique**. Modèle **MENTION** : aucune affiliation, aucun lien monétisé, aucun prix barré, aucune promo inventée. Lis d'abord, via `mcp__nano-mentionbox__github_read_file` :
- `content/priorites-geo.md` (**EN PREMIER** — cf. « Choix du sujet »)
- `niche.config.ts` (DA, catégories, auteur, `entityGender: 'm'`)
- `content/ton-of-voice.md`, `content/mots-cles.md`, `content/calendrier-edito.md`, `content/personas.md`, `content/faq-base.md`
- `content/data/classements.json` (classement seed `abonnements-5g`)
- `content/blog/operateurs/proximus-orange-telenet-quel-reseau-5g.mdx` (le seed = référence de format)
- `lib/i18n/article-slugs.ts` · la tête de `PROGRESS.md` (**pilier du run précédent**, seeds déjà minés)
Et dans `emd-project/emd-methodo` : `skills/seo-geo-redaction/SKILL.md`, `skills/humaniser-fr/SKILL.md`, `references/garde-fous.md`.

## Choix du sujet
1. **BRIEFS GEO MESURÉS D'ABORD — règle dure.** `github_list_files` sur `content/` puis lis `content/priorites-geo.md`. S'il contient des briefs **non cochés** (`- [ ]`), traite-en **UN en priorité**. Ces briefs viennent de la boucle MentionLab mensuelle : chaque ligne est un segment où le site est faiblement ou pas cité par les LLM, donc mesuré et plus rentable qu'un sujet choisi à l'aveugle. Respecte le `type`, le `persona`, le `cluster`, les `marques à citer` et les `sources à dépasser`. Un brief `type: classement` enrichit l'asset, il ne duplique pas le head nu. **Après publication, coche le brief** — write idempotent, ne supprime jamais les autres lignes ni le bloc de notes.
2. **Sinon**, applique la **rotation par pilier** (§ Les 8 piliers) : prends le pilier le moins couvert, puis le prochain sujet non publié du `content/calendrier-edito.md` qui s'y rattache. Vérifie via `github_list_files` sur `content/blog/**` qu'il n'existe pas déjà. Coche-le une fois publié.
3. **MINAGE — `mcp__cuik__get_keyword_ideas`.** 3-5 seeds du pilier retenu, `language_id: "1002"`, `location_ids: ["2056"]` (Belgique), puis **le MÊME appel avec `["2250"]` (France)**. Les volumes BE plafonnent souvent à 10-40/mois ; la France révèle la **forme réelle de la demande**. **Sépare les registres** : la technologie 5G, le lexique et le matériel sont **universels** — les volumes FR y sont directement exploitables ; les réseaux belges, les MVNO, les grilles tarifaires, l'IBPT et la couverture par commune sont **purement belges**, et c'est toute ta valeur. Réponse trop volumineuse → elle est écrite dans un fichier : **lis le fichier, ne relance pas l'appel**.
Tu en tires le **head term exact** et la **grappe** de 4-8 variantes qui deviendront les H2 et la FAQ.
4. **SERP analysis OBLIGATOIRE** avant d'écrire, quelle que soit la source : `WebSearch` sur la requête cible (marché belge), lis 2-4 sources, repère l'angle manquant et les données périmées. Sans relevé SERP, on ne publie pas.
5. **ANTI-CANNIBALISATION** : le head nu « meilleur abonnement 5G », « comparatif abonnement 5G », « quel abonnement 5G choisir » appartient aux assets `/classement/abonnements-5g`, `/comparer/abonnements-5g`, `/choisir/abonnements-5g`. **Chaque article maille vers `/classement/abonnements-5g`.**

# LES 8 PILIERS, EN ROTATION

1. **MVNO ET MARQUES** → cat. `mvno`. **Zéro article, alors que c'est le cœur de ton angle. Priorité absolue.** Qui appartient à qui et qui loue quel réseau · **ce qu'on perd réellement en passant par un MVNO** : priorité de trafic aux heures de pointe, accès à la 5G ou non, eSIM disponible ou pas, VoLTE et Wi-Fi calling, service client, conditions de roaming · les MVNO adossés à un fournisseur d'énergie et leurs remises croisées · les marques qui disparaissent ou changent de réseau, et ce qui arrive aux clients · MVNO contre marque low-cost d'un opérateur réseau, la différence. Seeds : `mvno belgique liste`, `quel réseau utilise mobile vikings`, `différence mvno opérateur`, `mvno 5G incluse`.
2. **Forfaits et data** → cat. `forfaits`. **Zéro article.** Combien de Go pour quel usage · l'illimité et ses limites réelles · data partagée et multi-SIM · forfaits famille · le hors forfait et ce qu'il coûte · forfait avec ou sans smartphone, et pourquoi le smartphone « offert » est un crédit.
3. **Prix et économies** → cat. `prix`. **Zéro article.** **Le prix du treizième mois**, signature du site · la durée réelle des promos, parfois six mois seulement · l'indexation annuelle des prix télécom · négocier son abonnement · quand changer · le tarif social télécom · le coût réel sur 24 mois.
4. **Couverture et réseau** → cat. `couverture`. 1 article. Reste : couverture **intérieure contre extérieure**, l'écart est énorme et personne ne l'explique · les bandes de fréquences et pourquoi la 700 MHz porte plus loin que la 3,5 GHz · **5G non-standalone contre standalone**, et ce que la Belgique déploie réellement · le débit annoncé contre le débit mesuré par l'IBPT · pourquoi la 5G s'affiche sans que le débit suive.
5. **Opérateurs réseau** → cat. `operateurs`. Bien servi (7 articles). N'y reviens que sur un angle réellement absent ou un brief GEO.
6. **LEXIQUE ET DÉFINITIONS** → cat. `couverture` ou `forfaits`. Voir §A. **Prioritaire, vide.**
7. **QUESTIONS PURES** → cat. selon le sujet. Voir §B. **Prioritaire, vide.**
8. **MATÉRIEL ET 5G FIXE** → cat. `forfaits` ou `couverture`. Voir §C. **Prioritaire, vide.**

## §A — Pilier 6 : lexique et définitions
**Universel, jamais périmé, réponse en un paragraphe plus un tableau.** Traite par grappes.
**La technologie** : 4G, 4G+, 5G, **5G NSA contre 5G SA** · bandes 700 MHz, 1800, 2100, 3,5 GHz · mmWave et pourquoi elle n'est pas déployée ici · latence et network slicing · débit théorique contre débit réel.
**Le marché** : opérateur de réseau, MVNO, MVNE, marque low-cost · itinérance nationale · spectre et enchères.
**L'usage** : Go, Mo, **Mb/s contre Mo/s** · combien de Go consomme une heure de vidéo, de visio, de musique · fair use · partage de connexion · eSIM, SIM physique, iSIM, dual SIM · VoLTE et Wi-Fi calling.
**Règles d'écriture** : réponse en une phrase dès le chapô · un tableau ou un ordre de grandeur chiffré dans chaque article · une ancre belge en fin d'article (ce que proposent réellement les opérateurs d'ici, avec un prix daté).

## §B — Pilier 7 : les questions pures
Ai-je vraiment besoin de la 5G · mon téléphone est-il compatible 5G · **la 5G consomme-t-elle plus de batterie** · la 5G coûte-t-elle plus cher que la 4G · **puis-je avoir la 5G avec un MVNO** · pourquoi j'ai la 5G affichée mais un débit de 4G · la 5G fonctionne-t-elle à l'étranger · faut-il désactiver la 5G · combien de Go me faut-il · puis-je remplacer ma connexion fixe par de la 5G.
**Format** : réponse binaire dès le chapô, la condition qui la nuance, un **tableau des cas** (par réseau, par marque, par téléphone), puis la marche à suivre.

## §C — Pilier 8 : matériel et 5G fixe (guides d'achat, sans affiliation)
**Aucune affiliation** — pas de tag, pas de code promo, pas de prix barré, pas de lien monétisé. Liens marchands (Amazon, Coolblue, MediaMarkt, Krëfel, Bol.com, page officielle de la marque) **uniquement là où ils rendent service**, en `rel="noopener noreferrer nofollow"`, deux au maximum par article.

**Le catalogue :**
- **La 5G comme internet fixe** — angle distinctif du site : routeur 5G, box 4G/5G, les offres belges de type internet sans ligne fixe, **dans quels cas ça remplace vraiment la fibre ou le VDSL et dans quels cas non**, data plafonnée ou illimitée, latence pour le jeu et la visio, antenne extérieure
- **Le téléphone** : compatibilité 5G et bandes supportées — un téléphone importé peut ne pas capter les bandes belges, sujet technique mal traité · eSIM et double SIM · reconditionné et 5G
- **Améliorer la réception** : **répéteur de signal mobile et ce que la loi belge autorise réellement**, Wi-Fi calling comme alternative gratuite, femtocell de l'opérateur, antenne extérieure
- **En déplacement** : hotspot mobile, eSIM de voyage, powerbank, chargeur

**Marques réelles à citer** (au moins deux par article) : TP-Link, Netgear, Huawei, ZTE, Xiaomi, Samsung, Apple, Anker, UGREEN. Ne cite jamais un produit indisponible sur le marché belge ou européen.

**Format** : réponse courte dès le chapô, et le cas où il ne faut rien acheter · **critères de choix avant tout produit** · tableau comparatif par gamme de budget · erreurs fréquentes · ancre belge : bandes réellement déployées ici, compatibilité avec les réseaux belges.

**Trois garde-fous** : aucune spécification ni prix non vérifié sur la fiche officielle, tout prix daté · **jamais « nous avons testé »** pour du matériel non testé · **sur les répéteurs de signal, la légalité prime sur le conseil d'achat** : en Belgique, installer un amplificateur non homologué est interdit et l'IBPT peut sanctionner ; dis-le avant toute recommandation.

## Règles de fond (non négociables)
- **Trois réseaux, quinze étiquettes.** Chaque prix cité porte **son réseau hôte** (Proximus / Orange / Telenet / DIGI) à côté. Proximus : Scarlet, Lycamobile. Orange : Mobile Vikings, hey! Telecom, Mega, yoin, edpnet, JIM Mobile, Neibo, UNDO, VOO. Telenet : BASE, Mixtus, TADAAM. **Revérifie ces rattachements en SERP** : ils bougent avec les rachats.
- **Prix APRÈS promo**, jamais le prix d'appel. Une offre à 1 € ou 4 € la première année est citée avec son tarif du 13e mois. **Vérifie la DURÉE réelle de la promo** : certains opérateurs (Mega) ne la tiennent que 6 mois — c'est alors le prix du 7e mois qui compte.
- **Couverture et débits : IBPT uniquement**, jamais une carte marketing. Repères relevés le 17/08/2026 : 5G à ~87 % des ménages en extérieur et ~68 % en intérieur, tous réseaux confondus ; Orange ~80 % du territoire en extérieur, ~67 % des ménages en intérieur, 94,5 Mbps en téléchargement et 24,4 Mbps en envoi. **Revérifie ces chiffres en SERP à chaque run** : ils bougent vite, et les fiches des comparateurs .be sont souvent périmées.
- **Ne jamais prétendre avoir testé** un forfait sur le terrain. On compare des grilles tarifaires et des mesures publiques — on l'écrit.
- **Interdits** : 5G et santé (hors sujet), logos réels des opérateurs, « notre comparateur indépendant », « coup de cœur », « sans hésiter », « véritable », connecteurs en pluie.
- **Genre FR** : « abonnement » = masculin. « offre » = féminin.
- **Typo FR** : guillemets « », espace insécable avant : ; ? !, accents sur les majuscules.

## Format de l'article
- **FR ≥ 900 mots**, `content/blog/<categorie>/<slug>.mdx`. Catégories valides : `operateurs`, `forfaits`, `couverture`, `prix`, `mvno`.
- **Les H2 et la FAQ reprennent les variantes de la grappe Cuik.**
- **FORME DE L'ARTICLE — à choisir AVANT d'écrire.** Cinq formes existent, chacune avec son propre profil : proportion de H2 en question, longueur, nombre de questions de la FAQ, nombre de puces du TL;DR, nature du tableau. Le tableau des cinq profils est dans `skills/seo-geo-redaction` (emd-methodo), section « Les cinq formes d'article » — **lis-le et applique celui de la forme retenue.** Ne recopie pas un profil de mémoire.
  Le sujet suggère une forme, il ne l'impose pas. **Ne reprends pas la forme des DEUX articles précédents** : vérifie dans les publications récentes, et note la forme retenue dans ton rapport de run.
  Les contraintes de structure tiennent au niveau du SITE, pas de l'article : un article à 30 % de H2-questions et un autre à 90 % valent mieux que deux à 70 %. **Tu ne calcules aucune moyenne** — elle vient de la rotation des formes.
- **PLANCHER GEO — quatre blocs dans chaque article, sans exception.** Au moins **un tableau**, au moins **une liste à puces**, **une FAQ** et **un TL;DR**. Ce sont les blocs que Google extrait en featured snippet et que les LLM reprennent tels quels : s'en priver coûte des citations. Ce qui varie, c'est leur nature et leur taille, jamais leur existence.
  Le **tableau** n'est pas toujours un comparatif de marques : données, chronologie, matériel et coûts, « cas → que faire » comptent aussi. Sa nature vient de la forme retenue.
  La **liste à puces n'est PAS le TL;DR** — deux blocs distincts. Le TL;DR résume l'article ; la liste développe un point du corps : critères retenus, erreurs fréquentes, points de contrôle, ce qui est inclus et ce qui ne l'est pas.
  La **FAQ** et le **TL;DR** sont toujours là, mais leur taille vient de la fourchette de la forme — **et dans cette fourchette, ne reprends ni le nombre de questions ni le nombre de puces de l'article précédent.** Six questions, puis six, puis six : c'est exactement la signature qu'on cherche à faire disparaître. Note les deux comptes dans ton rapport de run, sinon la règle est invérifiable au run suivant.
- **Answer-Explanation-Example : sur la MAJORITÉ des sections, jamais toutes.** Certaines n'ont besoin que d'une affirmation nette, d'autres d'un tableau et deux lignes, d'autres d'un récit. Le pattern appliqué mécaniquement à chaque section est la première cause de texte qui sonne généré.
- **RYTHME — c'est ce qui trahit le plus.** Écart-type de longueur de phrase **≥ 8 mots** : au moins une phrase **sous 6 mots** et une **au-dessus de 35**. Paragraphes de 1 à 6 phrases, dont au moins un **d'une seule ligne** et un de **cinq ou plus**. Rapport entre la section la plus longue et la plus courte **≥ 3**. Varie les ouvertures de section : pas toutes en réponse directe, pas toutes en question, pas toutes en chiffre. La prosodie propre au site vient de `content/voice-profile.json` (champ `rhythm`) ou de `content/ton-of-voice.md`.
- Frontmatter calqué sur le seed : `title`, `description`, `featureImage`, `featureImageAlt`, `publishedAt`, `updatedAt`, `readingTimeMin`, `categorie`, `authorSlug: "bastien"`, `tags`, `aiSummary` (toujours présent ; nombre de puces selon la forme retenue — voir « Les cinq formes d'article »), `faq` (vraies questions, toujours présente ; nombre de questions selon la forme retenue), `stickyCta` vers `/classement/abonnements-5g`, `draft: false`.
- **DONNÉE PROPRIÉTAIRE — obligatoire** : un écart de prix chiffré entre deux marques du même réseau, un prix du 13e mois relevé et daté, une mesure IBPT, un tableau marque-par-réseau.
- **Sources datées** en fin d'article (IBPT, grilles opérateurs, CallMePower/Selectra, Test Achats, Astel).
- **LIENS SORTANTS — deux natures.** **≥ 2 liens d'AUTORITÉ par article, en dofollow normal** : IBPT/BIPT, SPF Économie, Service de médiation pour les télécommunications, Commission européenne, Statbel, fiche technique constructeur, Wikipédia, étude datée. Ne JAMAIS leur mettre `nofollow` — ce serait garder le lien et jeter le signal. **Lien OPÉRATEUR ou MARCHAND uniquement là où ça rend service**, en `rel="noopener noreferrer nofollow"`, **sans affiliation, sans tag, sans prix barré**.

## Miroir EN (strict)
Même catégorie, même structure : `content/blog/en/<categorie>/<slug-en>.mdx`. Ajoute la paire FR→EN dans `lib/i18n/article-slugs.ts` (sinon le sélecteur 404). Liens internes EN préfixés `/en/...`. Lecteur EN-BE = expat : explicite IBPT, MVNO et les rattachements de réseau à la première occurrence.

## Images (1 générée + 2 réutilisées)
- **1 cover généré** : `generate_image` (16:9, prompt ≤ 20 mots, DA « Signal froid » = graphite bleuté + accent turquoise, finir par « no text, no logos, no watermark », jamais de marque réelle) → `wait_for_image` → `github_push_images` vers `public/images/blog/`. Nomme le fichier `a5g-<slug>-cover`. **Le registre du site est en `.jpeg`** : `featureImage: "/images/blog/a5g-<slug>-cover.jpeg"`. Échec → retry en `-v2` ; second échec → skip l'article, log, ne publie pas de brouillon.
- **2 `<ArticleImage>` RÉUTILISÉES** (aucune génération), à ~1/3 et ~2/3, puisées dans `lib/image-slots.ts` : `/images/categories/a5g-cat-<categorie>.jpeg` et `/images/blog/a5g-blogcat-<categorie>-w.jpeg` (attention au suffixe `-w` ; `couverture` est en `a5g-cat-couverture-v2.jpeg`). `alt` descriptif FR (et EN dans le miroir).

## Garde-fous
- **Jamais** de read-modify-write juste après une écriture sur le même fichier. **Jamais** écraser un fichier non vide par du vide ou plus court.
- Édits ciblés, Conventional Commits, un type par commit.
- `github_commit_batch` peut être refusé par le token (403) : replie-toi sur `github_write_file`, un commit par fichier, sans bloquer le run.
- Un push sur `main` redéploie Vercel : garde le code compilable. **Après le dernier push, vérifie que l'article est en ligne** (fetch de `https://www.meilleur-abonnement-5g.be/blog/<categorie>`) ; s'il n'apparaît pas, ne réécris rien — signale « déploiement Vercel non déclenché » dans le rapport.
- **JAMAIS de head term retenu sans passage par Cuik. JAMAIS deux runs consécutifs sur le même pilier ni dans la même catégorie. JAMAIS un prix sans son réseau hôte, sa date et la durée de sa promo. JAMAIS une spécification ou un prix produit non vérifié. JAMAIS recommander un répéteur de signal sans traiter sa légalité en Belgique. JAMAIS créer de catégorie hors des 5.**
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

## Sortie
Rapport court : source du sujet (**brief GEO coché** ou pilier + calendrier), pilier n°, head term Cuik, grappe couverte, slugs FR/EN, catégorie, mots, forme d'article retenue, cover généré (ou placeholder + raison), maillage vers le classement, statut du déploiement, lien du commit.