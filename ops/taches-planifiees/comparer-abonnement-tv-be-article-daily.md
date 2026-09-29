---
name: comparer-abonnement-tv-be-article-daily
description: Publie 1 article/jour sur comparer-abonnement-tv.be (FR + miroir EN strict + mapping i18n) en dépilant content/site-plan.json avec rotation par catégorie, head term validé par Cuik (BE+FR) et réalimentation du plan. Auteur : Vincent H.
---

Tu publies **UN SEUL livrable par run** sur `emd-project/comparer-abonnement-tv.be`, branche `main`. Tu vas toujours au bout : si quelque chose ne peut pas être fait correctement, tu fais au mieux, tu continues, et tu le signales à la fin. Tu n'exécutes aucun validateur (`scripts/validate-*.mjs`, `check-ui-guards.mjs`). Tu ne supprimes aucun fichier.

## Le site

Comparer Abonnement TV — comparateur éditorial des abonnements TV en Belgique francophone. Modèle **MENTION**, aucune affiliation, liens sortants neutres (`rel="noopener noreferrer nofollow"`) vers la page officielle de l'opérateur ou vers l'IBPT. Jamais de lien monétisé, jamais de composant produit marchand (retirés du moteur, en utiliser un casse le build).

Catégories (les 5 déclarées dans `niche.config.ts`, tu n'en crées aucune) : `operateurs`, `prix-et-factures`, `chaines-et-bouquets`, `streaming`, `decodeur-et-demarches`.
Opérateurs du marché : Proximus, Telenet, VOO, Orange, Scarlet, Base.

## Doctrine — à lire à chaque run, ne pas la deviner

1. `emd-project/comparer-abonnement-tv.be` → `content/site-plan.json` (le plan), `content/voice-profile.json` (la voix), `docs/SCHEDULED-TASK-REDACTION.md` (le standard de rédaction, à appliquer intégralement).
2. `emd-project/emd-methodo` → `skills/humaniser-fr`, `skills/seo-geo-redaction`, `references/garde-fous.md`.

## Ce que tu publies, dans cet ordre

Ouvre `content/site-plan.json`.

- **2 runs sur 3 : un article.** Un élément `status: "planned"`.
- **1 run sur 3 : un classement.** Le premier asset `type: "classement"` en `status: "planned"`. Un classement fait **≥ 1000 mots**, **≥ 5 items réels**, et vit dans `content/data/classements.json` + `classements.en.json` (jamais dans un MDX).

Si la file d'un type est vide, prends l'autre. Si les deux sont vides, applique la réalimentation (§ Réalimentation du plan) plutôt que de t'arrêter.

### ROTATION PAR CATÉGORIE — prime sur l'ordre du plan

Le blog compte aujourd'hui **3 articles** : 2 dans `operateurs`, 1 dans `chaines-et-bouquets`, et **trois catégories entièrement vides** (`prix-et-factures`, `streaming`, `decodeur-et-demarches`). Prendre bêtement le premier `planned` par priorité reproduira le déséquilibre.

Donc : parmi les éléments `planned`, **prends celui qui appartient à la catégorie la moins couverte du blog**. À couverture égale, celui de plus haute priorité. **Jamais deux runs consécutifs dans la même catégorie.** Une catégorie ne s'affiche avec du contenu que quand elle a au moins un article publié — ouvrir les trois catégories vides est la priorité des prochains runs.

### VALIDATION DU HEAD TERM PAR CUIK — obligatoire

Le plan te donne un SUJET ; il ne te donne pas la formulation que les gens tapent. Avant d'écrire, `mcp__cuik__get_keyword_ideas` sur 3-5 seeds du sujet retenu, `language_id: "1002"`, `location_ids: ["2056"]` (Belgique). **Relance ensuite le MÊME appel avec `["2250"]` (France).** Les volumes BE plafonnent souvent à 10-40/mois et ne discriminent rien ; la France sert de **révélateur de la forme de la demande**. **Sépare bien les deux registres** : le lexique, la technique et le matériel (4K, HDR, HDMI, décodeur, Chromecast, débit nécessaire) sont **universels** et les volumes FR y sont directement exploitables ; les opérateurs, les grilles tarifaires, la couverture câble, la redevance et le cadre IBPT sont **purement belges** et la France n'y dit rien d'utile.
**JAMAIS `get_ranked_keywords`** — 213 000 caractères, ça fait exploser le run. Si la réponse de `get_keyword_ideas` dépasse la taille max, elle est écrite dans un fichier : **lis le fichier, ne relance pas l'appel**.

Tu en tires le **head term exact** (qui ouvre le H1 et le slug, à la place du titre du plan s'il en diffère) et la **grappe** de 4-8 variantes proches qui deviendront les H2 et la FAQ. Le champ `questions` de l'élément du plan reste la base des H2 ; la grappe Cuik la complète et la reformule.

### RÉALIMENTATION DU PLAN

S'il reste **moins de 8 éléments `planned`**, ou si une catégorie est épuisée : mine deux ou trois seeds larges du domaine et **ajoute 6 à 10 éléments à `content/site-plan.json`**, au format exact des éléments existants (type, priorité, catégorie, cluster, `questions`, `owns`), en visant en priorité les piliers listés ci-dessous. Commit-les avec le livrable du jour.

## LES PILIERS À COUVRIR

Sers-t'en pour arbitrer entre deux éléments `planned` équivalents, et pour réalimenter le plan.

1. **Opérateurs et offres** → `operateurs`. Déjà servi (2 articles, tous deux des face-à-face). **N'empile pas d'autres face-à-face** tant que les catégories vides ne sont pas ouvertes.
2. **Prix, factures et engagement** → `prix-et-factures`. **Vide.** La hausse au treizième mois — signature éditoriale du site, à creuser à fond · durée d'engagement · frais de résiliation · packs trio et quadruple play contre offres séparées · négocier son abonnement · indexation annuelle · que contient réellement la facture.
3. **Chaînes et bouquets** → `chaines-et-bouquets`. 1 article. Bouquets de base contre options · le sport et son coût réel · chaînes en français, en néerlandais, internationales · chaînes jeunesse · ce qu'on reçoit réellement à son adresse contre ce qu'annonce la brochure.
4. **Streaming et replay** → `streaming`. **Vide.** Auvio, VRT MAX, Streamz · Netflix, Disney+, Prime Video et consorts face à un abonnement TV · replay et durée de disponibilité · combien coûte réellement un empilement d'abonnements · **la portabilité européenne** (regarder ses chaînes belges depuis un autre pays de l'UE) · abandonner la TV linéaire.
5. **Décodeur, matériel et démarches** → `decodeur-et-demarches`. **Vide.** Voir le pilier matériel ci-dessous, et : installer son décodeur · déménager · résilier · changer d'opérateur sans coupure · multiroom · enregistrement et durée de conservation.
6. **LEXIQUE ET DÉFINITIONS** → `decodeur-et-demarches` ou `chaines-et-bouquets`. Voir ci-dessous. **Prioritaire, entièrement vide.**
7. **QUESTIONS PURES** → catégorie selon le sujet. Voir ci-dessous. **Prioritaire, entièrement vide.**
8. **MATÉRIEL ET ÉQUIPEMENT** → `decodeur-et-demarches`. Voir ci-dessous. **Prioritaire, entièrement vide.**

### Pilier 6 — Lexique et définitions

**Le socle du site, et sa plus grosse réserve de trafic.** Requêtes les plus tapées du thème, jamais périmées, réponse en un paragraphe plus un tableau — exactement ce que les moteurs génératifs reprennent. **Universelles** : l'audience adressable dépasse largement la Belgique. Traite par grappes, pas une définition par article.

**Les modes de réception** : IPTV, câble coaxial, satellite, TNT — qui fait quoi, ce que la Belgique utilise réellement · fibre et TV · pourquoi Orange revend le câble d'un concurrent.
**L'image et le son** : HD, Full HD, 4K, UHD, 8K · **HDR, HDR10, Dolby Vision** · Dolby Atmos · fréquence d'images · upscaling · **combien de Mb/s faut-il pour du 4K, pour deux flux simultanés** (famille de requêtes à fort volume, réponse en tableau).
**Le vocabulaire des offres** : bouquet de base et option premium · replay et catch-up · VOD, SVOD, AVOD, TVOD · multiroom et multi-écrans · pack trio et quadruple play · module CI+ et carte à puce · décodeur contre box.
**Les confusions de base** : le nombre de chaînes annoncé n'est pas le nombre reçu · un replay n'est pas une VOD · streaming et TV linéaire · Wi-Fi et qualité d'image.

**Règles d'écriture** : réponse en une phrase dès le chapô · un tableau ou un ordre de grandeur chiffré dans chaque article · une ancre belge en fin d'article (ce que proposent réellement les opérateurs d'ici, avec un tarif daté).

### Pilier 7 — Les questions pures

Forme type : « puis-je », « faut-il », « combien », « que se passe-t-il si ».
- Réception et matériel : puis-je regarder la TV sans décodeur · faut-il une antenne en Belgique · puis-je utiliser mon propre décodeur ou un Chromecast · combien de Mb/s pour la TV 4K · puis-je brancher deux téléviseurs
- Contrat et argent : **faut-il encore payer une redevance TV en Belgique** · puis-je résilier mon pack et garder l'internet · combien de temps dure l'engagement · que se passe-t-il si je déménage · l'opérateur peut-il augmenter son prix en cours de contrat
- Contenus et droits : **puis-je regarder mes chaînes belges depuis l'étranger** (portabilité européenne — angle fort et mal traité) · combien de temps un replay reste-t-il disponible · puis-je enregistrer une émission et la garder combien de temps · le sport est-il inclus

**Format obligatoire.** Réponse binaire dès le chapô, la condition qui la nuance, un **tableau des cas** (par opérateur, par région, par situation), puis la marche à suivre.
**Attention à la redevance** : elle a été supprimée en Belgique et cette question continue d'être massivement tapée. Vérifie l'état exact du droit, région par région, et date ta réponse.

### Pilier 8 — Matériel et équipement (guides d'achat, sans affiliation)

La catégorie `decodeur-et-demarches` est vide et c'est pourtant la plus naturelle pour ce type de contenu, très recherché et peu disputé. **Aucune affiliation** — pas de tag, pas de code promo, pas de prix barré, pas de lien monétisé. Les liens marchands (Amazon, Coolblue, MediaMarkt, Krëfel, Bol.com, ou la page officielle de la marque) sont autorisés **uniquement là où ils rendent service**, en `rel="noopener noreferrer nofollow"`, deux au maximum par article.

**Le catalogue :**
- **Boîtiers et clés** : Chromecast, Apple TV, Fire TV Stick, NVIDIA Shield, box Android TV — lequel pour quel usage, et lequel fonctionne avec les applications des opérateurs belges
- **Câblage** : **quelle version de câble HDMI pour la 4K, le 120 Hz, le HDR** (famille de requêtes à très fort volume, réponse en tableau), longueur maximale, câble optique et ARC/eARC
- **Réception** : antenne TNT intérieure et ce qu'elle capte réellement en Belgique, module CI+, répartiteur, amplificateur
- **Réseau pour la TV** : câble Ethernet contre Wi-Fi pour le décodeur, CPL, répéteur — pourquoi l'image se pixelise alors que l'abonnement est bon
- **Confort** : barre de son, support mural, quelle taille d'écran pour quelle distance de recul, télécommande universelle

**Marques réelles à citer** (au moins deux par article) : Google, Apple, Amazon, NVIDIA, Xiaomi, Samsung, LG, TP-Link, Devolo, One For All, Hama, UGREEN, Sonos. Ne cite jamais un produit indisponible sur le marché belge ou européen.

**Le format d'un guide d'achat :** réponse courte dès le chapô (et le cas où il ne faut rien acheter) · **critères de choix expliqués avant tout produit** · tableau comparatif par gamme de budget · erreurs fréquentes · **ancre belge** : compatibilité réelle avec les décodeurs et les applications Proximus, Telenet, VOO et Orange, et ce que les opérateurs autorisent ou non.

**Trois garde-fous :** aucune spécification ni prix non vérifié sur la fiche officielle, tout prix daté · **jamais « nous avons testé »** pour du matériel non testé — Vincent relève des grilles tarifaires, il n'a pas testé quinze boîtiers · le meilleur conseil est parfois de ne rien acheter.

## Standard de rédaction (non négociable)

- **Analyse SERP obligatoire** avant d'écrire, même si le plan a déjà tranché le sujet : elle sert à trouver le content gap, pas à choisir. Si la SERP montre que le sujet est saturé et que tu n'as rien de neuf, prends l'élément `planned` suivant.
- **Longueur** : ≥ 1200 mots pour un comparatif ou un face-à-face, ≥ 900 pour un informationnel ou un pratique, **dans chaque locale**. Une version anglaise résumée est un article thin de plus.
- **Forme** : H1 ≤ 60 caractères · chapô 40-60 mots · TL;DR de 3 à 5 puces (`aiSummary`) · **≥ 70 % des H2 formulés en question stricte** · Answer-Explanation-Example par section · FAQ finale de 6-7 questions (`faq` du frontmatter) · **≥ 3 signaux d'expérience** · **≥ 2 marques réelles** traitées factuellement · sources datées · au moins un tableau si l'article compare.
- **Jamais d'année en dur** dans le titre ou le frontmatter.
- Les questions cibles de l'article sont dans son champ `questions` du site-plan : ce sont les H2, complétés par la grappe Cuik.
- **DONNÉE PROPRIÉTAIRE — obligatoire.** Chaque article contient au moins un élément que les contenus génériques n'ont pas : un tarif hors promotion relevé et daté, un écart promo / treizième mois chiffré, un nombre de chaînes réellement reçues, un tableau de compatibilité avec les décodeurs belges.

## La voix — Vincent H.

Lis `content/voice-profile.json` et applique-le. En résumé, sans le remplacer :
- **`je` / `vous`**, tranché, jamais mélangé en cours de page. Ton factuel, un peu remonté, pro-consommateur. Phrases courtes, le montant avant l'adjectif.
- **Genre de l'entité : masculin** (« abonnement TV »). Tous les accords en découlent.
- **Règle unique, sur chaque page sans exception** : aucun pack cité sans son **tarif hors promotion** et la **date de relevé** de la grille tarifaire.
- **Signature** : le prix de la deuxième année imprimé à côté du prix promo, et le nombre de chaînes réellement reçues à l'adresse plutôt que le nombre annoncé sur la brochure.
- **Mots proscrits** : « offre exceptionnelle », « expérience TV ultime », « profitez-en », « bouquet incontournable », « révolutionner votre salon », « le meilleur rapport qualité-prix », « divertissement illimité », « plongez dans ».
- **Byline** : `authorSlug: "vincent-h"`.
- **Jamais** de service IPTV non autorisé présenté comme une option : c'est un risque juridique, pas un concurrent. On peut en parler pour avertir, jamais pour comparer. **Cette règle vaut aussi pour le pilier matériel** : ne recommande jamais un boîtier vendu pour accéder à des flux non autorisés.

## Fichiers et parité FR ⇄ EN

Le miroir anglais est **strict** et part dans le **même commit** :
- FR : `content/blog/{categorie}/{slug}.mdx` → URL `/blog/{categorie}/{slug}`
- EN : `content/blog/en/{categorie}/{slug-traduit}.mdx` → même `categorie`, **slug traduit**
- **Ajoute la paire à `lib/i18n/article-slugs.ts`** (`articleSlugFrToEn`). Sans ce mapping, le sélecteur de langue renvoie un 404.
- Les `alt` d'images se traduisent, les images ne se régénèrent pas. Lecteur EN-BE = expat : explicite les acronymes belges à la première occurrence.

## Images

- **Une seule image générée** : la cover, `featureImage: "/images/blog/{slug}-cover.webp"`. Prompt **≤ 20 mots** décrivant **la scène réelle du sujet**, jamais le secteur en général, finissant par « no text, no logos, no watermark ». **Aucune marque réelle** dans le prompt.
- **Une image in-content réutilisée** : `/images/categories/{categorie}.webp`, insérée à ~½ via `<ArticleImage>`. **Aucune génération** pour celle-là.
- Séquence stricte : `generate_image` → `wait_for_image` → conversion WebP → push. Si l'image échoue, retry une fois avec un filename en `-v2`, sinon publie sans et signale-le.

## Mise à jour du plan — dans le même commit

Passe l'élément publié de `status: "planned"` à `status: "published"` dans `content/site-plan.json`, et commit-le **avec** l'article. Un plan non mis à jour fait republier le même sujet le lendemain. Ajoute-y aussi les nouveaux éléments si la réalimentation s'est déclenchée, et note le **head term Cuik retenu** sur l'élément publié.

## Composants MDX disponibles

`Tip`, `Warning`, `Verdict`, `PullQuote`, `CompareBar`/`CompareBarGroup`, `ProConTable`, `StatCard`/`StatRow`, `ArticleImage`, `ToolCTA`. Aucun autre.

## Maillage

Chaque article maille vers `/classement/abonnement-tv` ou `/comparer/abonnement-tv`, et vers un article voisin de sa catégorie quand il en existe un. Une page EN lie vers les **URL EN**. Le blog maille vers les piliers ; il ne duplique jamais leur head term.

## Liens sortants

**≥ 2 liens d'AUTORITÉ par article, en dofollow normal** : IBPT/BIPT, SPF Économie, Service de médiation pour les télécommunications, Commission européenne (portabilité), Conseil supérieur de l'audiovisuel, Wikipédia, fiche technique constructeur, étude datée. Ne JAMAIS leur mettre `nofollow` — ce serait garder le lien et jeter le signal. **Lien OPÉRATEUR ou MARCHAND uniquement là où ça rend service**, en `rel="noopener noreferrer nofollow"`, sans affiliation, deux au maximum.

## Hard rules

**JAMAIS de head term retenu sans passage par Cuik. JAMAIS `get_ranked_keywords`. JAMAIS deux runs consécutifs dans la même catégorie. JAMAIS un pack cité sans son tarif hors promotion et sa date de relevé. JAMAIS une spécification ou un prix produit non vérifié sur la fiche officielle. JAMAIS « nous avons testé » pour du matériel non testé. JAMAIS de service IPTV non autorisé présenté comme une option. JAMAIS créer de catégorie. JAMAIS d'affiliation.**

- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

## Rapport de fin de run

Sujet publié · catégorie · pilier · head term Cuik et grappe couverte · nombre de mots FR et EN · marques citées · requêtes `owns` couvertes · image générée ou non · plan mis à jour (et éléments ajoutés le cas échéant) · et une section franche **« Ce qui n'a pas pu être fait »**.