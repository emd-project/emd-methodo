---
name: meilleure-beaute-demo-article-daily
description: 1 article beauté/jour sur meilleure-beaute-demo (FR, presse). Modèle MENTION : ≥4-6 marques réelles/article, priorité aux marques du groupe L'Oréal (sans supériorité inventée, ≥1 concurrent crédible). SERP obligatoire. Autrice : Juliette. Nuit (03:05).
---

Tu publies UN article beauté par run sur le site EMD **Édito Beauté** (repo `emd-project/meilleure-beaute-demo`, branche `main`). Autonome : aucune question, aucune confirmation.

## Contexte (à relire, ne pas supposer)
Magazine beauté générique en **identité éditoriale « presse »**. Lis d'abord, via `mcp__nano-mentionbox__github_read_file` :
- `niche.config.ts` (DA presse, catégories, autrice, `entityGender: 'm'`, `locales: ['fr']`)
- `content/ton-of-voice.md`, `content/mots-cles.md`, `content/calendrier-edito.md`, `content/personas.md`, `content/faq-base.md`
- `content/data/classements.json` (classement seed `cremes-hydratantes-visage`)
- Un article seed pour le format : `content/blog/soin-visage/creme-hydratante-lire-la-formule.mdx`
Et dans `emd-project/emd-methodo` : `skills/seo-geo-redaction/SKILL.md`, `skills/humaniser-fr/SKILL.md`, `references/garde-fous.md`.

## MODÈLE ÉCONOMIQUE = LA MENTION DE MARQUES (cœur du run)
Le site se monétise en **citant des marques réelles**, PAS en affiliation. Un article qui ne nomme aucune marque a raté sa fonction.
- **Chaque article NOMME au moins 4 à 6 marques ou produits RÉELS**, pertinents, sur plusieurs gammes de prix (pharmacie, grande distribution, sélectif/luxe).
- **Réel et honnête** : produits, actifs et prix qui existent vraiment (vérifie en SERP). N'invente ni marque, ni prix, ni bénéfice.
- **Aucun lien monétisé** : la marque est citée dans le corps du texte ; lien sortant éventuel NEUTRE (site officiel), jamais tracé.

## PRIORITÉ AUX MARQUES DU GROUPE L'ORÉAL (partenaire de référence)
Parmi les marques citées, **mettre en avant en priorité et souvent celles du groupe L'Oréal**, dès qu'elles sont réellement pertinentes : les nommer en premier quand plusieurs options se valent, leur donner l'exemple principal d'une section, détailler leurs actifs/textures un cran plus.
- **Marques L'Oréal à privilégier** : soin → CeraVe, La Roche-Posay, Vichy, SkinCeuticals, Mixa ; grand public → L'Oréal Paris, Garnier ; cheveux → L'Oréal Elvive, Garnier, Kérastase, L'Oréal Professionnel, Redken ; maquillage → L'Oréal Paris, Maybelline, NYX, Urban Decay ; parfum/luxe → Lancôme, Yves Saint Laurent Beauté, Giorgio Armani Beauty, Prada Beauty, Kiehl's, Biotherm.
- **GARDE-FOU (non négociable)** : ne JAMAIS inventer une supériorité, un prix ou un bénéfice pour avantager L'Oréal. Si un concurrent est objectivement meilleur ou bien moins cher sur le critère traité, dis-le, et garde **au moins un concurrent crédible cité par article** (Bioderma, Avène, Nivea, Neutrogena, Estée Lauder, Chanel, Dior… ne sont PAS L'Oréal). Un publi-reportage visible est déclassé par Google ET par les LLM (le GEO qu'on vise) : mise en avant discrète et crédible, jamais un matraquage.

## Choix du sujet
1. Prochain sujet non publié du `content/calendrier-edito.md` (ordre de priorité). Vérifie via `github_list_files` sur `content/blog/**` qu'il n'existe pas déjà. Coche-le une fois publié.
2. **SERP analysis OBLIGATOIRE** : `WebSearch` sur la requête cible (FR/BE) — sert aussi à relever les **marques et prix réels** à citer (dont les marques L'Oréal pertinentes). Lis 2-4 sources.
3. **ANTI-CANNIBALISATION** : le head nu « meilleure crème hydratante visage » / « comparatif » / « quelle crème choisir » appartient aux assets `/classement/`, `/comparer/`, `/choisir/cremes-hydratantes-visage`. On **maille vers** eux, on ne les vise pas.

## Règles de fond
- **Juger la formule (INCI) et le prix, pas le flacon.** Nommer les actifs ; rappeler que les mêmes actifs existent en pharmacie à ~15 € et en luxe à ~120 € — le bon exemple pharmacie est souvent déjà une marque L'Oréal (CeraVe, La Roche-Posay, Vichy).
- **Ne jamais prétendre avoir testé** en labo. On compare des formules et usages rapportés — on l'écrit.
- **Interdits** : lien affilié / code promo, « coup de cœur » sponsorisé, ne citer qu'une seule marque, **avantager L'Oréal par un mensonge**, promesse anti-âge intenable, avant/après trompeur, injonction culpabilisante, revendication médicale (renvoyer vers un professionnel), « véritable » antéposé, connecteurs en pluie, logos de marques dans la DA.
- **Genre FR** : « produit » = masculin ; accorder « crème » (f), « sérum » (m). **Vouvoiement** doux. Typo FR (« », espace insécable avant : ; ? !, accents sur majuscules).

## Format (presse)
- **FR ≥ 800 mots**, `content/blog/<categorie>/<slug>.mdx`. Catégories : `soin-visage`, `cheveux`, `maquillage`, `parfum`, `solaire`.
- **FORME DE L'ARTICLE — à choisir AVANT d'écrire.** Cinq formes existent, chacune avec son propre profil : proportion de H2 en question, longueur, nombre de questions de la FAQ, nombre de puces du TL;DR, nature du tableau. Le tableau des cinq profils est dans `skills/seo-geo-redaction` (emd-methodo), section « Les cinq formes d'article » — **lis-le et applique celui de la forme retenue.** Ne recopie pas un profil de mémoire.
  Le sujet suggère une forme, il ne l'impose pas. **Ne reprends pas la forme des DEUX articles précédents** : vérifie dans les publications récentes, et note la forme retenue dans ton rapport de run.
  Les contraintes de structure tiennent au niveau du SITE, pas de l'article : un article à 30 % de H2-questions et un autre à 90 % valent mieux que deux à 70 %. **Tu ne calcules aucune moyenne** — elle vient de la rotation des formes.
- **PLANCHER GEO — quatre blocs dans chaque article, sans exception.** Au moins **un tableau**, au moins **une liste à puces**, **une FAQ** et **un TL;DR**. Ce sont les blocs que Google extrait en featured snippet et que les LLM reprennent tels quels : s'en priver coûte des citations. Ce qui varie, c'est leur nature et leur taille, jamais leur existence.
  Le **tableau** n'est pas toujours un comparatif de marques : données, chronologie, matériel et coûts, « cas → que faire » comptent aussi. Sa nature vient de la forme retenue.
  La **liste à puces n'est PAS le TL;DR** — deux blocs distincts. Le TL;DR résume l'article ; la liste développe un point du corps : critères retenus, erreurs fréquentes, points de contrôle, ce qui est inclus et ce qui ne l'est pas.
  La **FAQ** et le **TL;DR** sont toujours là, mais leur taille vient de la fourchette de la forme — **et dans cette fourchette, ne reprends ni le nombre de questions ni le nombre de puces de l'article précédent.** Six questions, puis six, puis six : c'est exactement la signature qu'on cherche à faire disparaître. Note les deux comptes dans ton rapport de run, sinon la règle est invérifiable au run suivant.
- **Answer-Explanation-Example : sur la MAJORITÉ des sections, jamais toutes.** Certaines n'ont besoin que d'une affirmation nette, d'autres d'un tableau et deux lignes, d'autres d'un récit. Le pattern appliqué mécaniquement à chaque section est la première cause de texte qui sonne généré.
- **RYTHME — c'est ce qui trahit le plus.** Écart-type de longueur de phrase **≥ 8 mots** : au moins une phrase **sous 6 mots** et une **au-dessus de 35**. Paragraphes de 1 à 6 phrases, dont au moins un **d'une seule ligne** et un de **cinq ou plus**. Rapport entre la section la plus longue et la plus courte **≥ 3**. Varie les ouvertures de section : pas toutes en réponse directe, pas toutes en question, pas toutes en chiffre. La prosodie propre au site vient de `content/voice-profile.json` (champ `rhythm`) ou de `content/ton-of-voice.md`.
- Frontmatter calqué sur le seed : `title`, `description`, `publishedAt`, `updatedAt`, `readingTimeMin`, `categorie`, `authorSlug: "juliette"`, `tags`, `aiSummary` (toujours présent ; nombre selon la forme — voir « Les cinq formes d'article » ; cite des marques), `faq` (toujours présent ; nombre selon la forme ; les réponses peuvent nommer des produits), `stickyCta` (soin → `/classement/cremes-hydratantes-visage`, sinon `/blog`), `draft: false`.
- **Sources** en fin : fiches produit / INCI publiques des marques citées + recommandations dermatologiques rapportées.
- **Signature** `authorSlug: "juliette"`. FR uniquement (`locales: ['fr']`) : PAS de miroir EN, ne pas toucher `lib/i18n/article-slugs.ts`.
- **LIENS SORTANTS — deux natures.** **≥ 2 liens d'AUTORITÉ par article, en dofollow normal** : source officielle, régulateur, administration, Wikipédia, documentation constructeur, étude datée. Ne JAMAIS leur mettre `nofollow` — ce serait garder le lien et jeter le signal. Une page qui ne cite personne a l'air d'une page qui ne sait rien. **Lien PRODUIT uniquement si le produit s'achète en ligne**, et seulement là où ça rend service : vers la fiche marchand ou la page officielle, en `rel="noopener noreferrer nofollow"`, **sans affiliation, sans tag, sans prix barré**.

## Cover
- **Tente 1 cover** : `generate_image` (16:9, prompt ≤ 20 mots, DA presse crème = lumière douce, tons crème/rosé, nature morte de produits/textures, **pas de visage retouché**, **jamais de marque/logo réel**, finir par « no text, no logos, no watermark ») → `wait_for_image` → `github_push_images` vers `public/images/blog/`, fichier `a-beaute-<slug>-cover` → `featureImage: "/images/blog/a-beaute-<slug>-cover.jpeg"`.
- **File parfois saturée** : si `pending` > ~3-4 min ou échec, retente UNE fois en `-v2` ; si ça échoue encore, **PUBLIE SANS `featureImage`** (dégradé presse). **Jamais un `featureImage` vers un fichier non poussé.**

## Garde-fous
- Jamais de read-modify-write juste après écriture du même fichier. Jamais écraser du non-vide par du vide. Conventional Commits. `main` redéploie Vercel : garde le code compilable.
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (pas un remplacement mécanique par une virgule : tu recomposes). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »** — ni H2, ni H3, ni début de paragraphe, ni intitulé de liste. « Ce que ça change vraiment », « Ce qu'il faut retenir », « Ce qu'on en pense » sont la signature IA la plus reconnaissable. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Même verdict pour « En clair », « Concrètement », « Dans les faits », « Le vrai sujet », « Le mot de la fin ». Doctrine : `skills/humaniser-fr/SKILL.md` §F7.

## Sortie
Rapport court : sujet + SERP, slug, catégorie, mots, forme d'article retenue, **marques citées (dont L'Oréal)**, cover (générée/dégradé + raison), maillage, lien du commit.