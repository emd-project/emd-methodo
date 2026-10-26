# Audit CONTENU & SEO/GEO — 2026-10-26

Tâche planifiée `emd-audit-content` · doctrine `emd-audit` v1.6.0 + `seo-geo-redaction` v1.13.0 · LECTURE SEULE.

## Périmètre
- Fenêtre ≤ 14 j : provisionnés depuis le 2026-10-12 → **1 candidat** : `fonds-investissement.be` (provisionné le 2026-10-20).
- Ledger `audited-content.csv` : non audité → **dans le périmètre**.
- Repo : `emd-project/fond-investissement` (le nom du repo n'a pas de « s », alors que le domaine en a un). Corpus FR : **33 articles** sur 6 catégories (+ miroir `content/blog/en/`).
- Échantillon GEO lu en entier : 4 articles (3 publiés au lancement le 15.10, 1 publié après le lancement le 23.10).

## Scorecard

| Site | Contenu | SEO sém. | GEO | % H2-questions (échantillon) | Accords de genre |
|---|---|---|---|---|---|
| fonds-investissement.be | ✅ | ⚠️ | ⚠️ | **81 %** (21/26 H2) | ✅ (m, « fonds ») |

### Détail de l'échantillon

| Article | Forme (déduite) | Mots corps (≈) | H2 Q / total | % | TL;DR | FAQ | Tableau | Liste ≠ TL;DR | Liens int. | Liens autorité |
|---|---|---|---|---|---|---|---|---|---|---|
| lever-des-fonds/lever-des-fonds-pme-etapes | guide pratique | ≈ 1 200 | 4/5 | 80 % | 4 | 5 | ✅ (2) | ✅ | 3 | 3 (ORSA, WE, ejustice) |
| lever-des-fonds/un-fonds-veut-40-pour-cent-de-mon-capital | réponse rapide | ≈ 1 100 | 7/7 | 100 % | 5 | 7 | ✅ (2) | ✅ | 5 | 2 (ejustice, ORSA) |
| comprendre-les-fonds/invest-public-ou-fonds-prive | face-à-face | ≈ 1 750 | 4/7 | **57 %** ⚠️ | 4 | 5 | ✅ | ✅ | 4 | 5+ |
| fonds-propres-ou-dette/dette-mezzanine | décryptage / enquête | ≈ 1 500 | 6/7 | 86 % | 6 | 7 | ✅ (3) | ✅ | 4 | 5+ (guichet.lu, kmu.admin, WE, FSMA) |

*Comptes de mots estimés depuis la taille des fichiers, hors frontmatter et FAQ : tous les articles de l'échantillon sont bien au-dessus de 800 mots.*

## Détail — fonds-investissement.be

### CONTENU ✅
- **0 article thin** dans l'échantillon (4/4 au-dessus de 1 000 mots). Les 29 autres articles n'ont pas été lus en entier (audit sur échantillon).
- Pas de coulisses SEO visibles (aucun volume, aucun outil). Les données propriétaires sont fortes : relevés datés au 15.10.2026, tickets publiés, calculs de dilution, coût chiffré d'une mezzanine. Les règles « non publié » et « exemple construit » sont respectées, sans chiffre inventé.
- Les trois régions sont traitées dès que la réponse en dépend (Wallonie / Bruxelles / Flandre via PMV).

### SEO SÉMANTIQUE ⚠️
- **[important] Lien mort dans la sidebar de TOUS les articles FR.** `components/article/ArticleView.tsx` rend `<Link href={lp(`/comparer/${categorie}`)}>` (bloc `toc-cta`) **sans le garde-fou `PRODUIT_SLUGS`** que `ToolCTA.tsx` applique, lui. Or `/comparer/[produit]` appelle `notFound()` hors de `PRODUIT_SLUGS` (clés de `comparateurs.json`, *a priori* le seul `fonds-investissement-pme`). Résultat : `/comparer/lever-des-fonds`, `/comparer/comprendre-les-fonds`, etc. renvoient **404 depuis chacun des 33 articles**. Le bug vient très probablement du template, donc il peut toucher d'autres sites : vérifier dans `emd-template-v2`.
- **[mineur] Risques de cannibalisation à vérifier** (paires de slugs proches, titres non lus en entier) :
  - `fonds-evergreen-ou-fonds-ferme` ↔ `retraite-dans-quatre-ans-fonds-evergreen-ou-ferme`
  - `dette-bancaire-ou-fonds-propres` ↔ `fonds-propres-dette-et-quasi-capital` ↔ `la-banque-refuse-de-financer-mon-extension`
  - `lever-des-fonds-pme-etapes` ↔ `preparer-une-levee-de-fonds`
  - `start-up-scale-up-et-biotech` ↔ `financer-une-biotech`
  - `fonds-et-aides-par-region` ↔ `invests-wallons` / `financer-son-entreprise-a-bruxelles`

  Ce sont probablement des couples pilier → article satellite. Ils restent sains si chaque pilier renvoie vers ses satellites et vise une requête distincte.
- **[mineur] Balise title > 60 car.** : `${meta.title} | Fonds d'Investissement` ajoute 24 caractères (ex. « Lever des fonds pour une PME : les cinq étapes | Fonds d'Investissement » ≈ 71 car.).
- **[mineur]** La page `/comparer/[produit]` garde le vocabulaire produit du template (« quel modèle choisir ? », « Sélectionnez les modèles », « Faire le quiz → ») : décalé pour des fonds (intent B2B financier).
- ✅ Un seul H1 (= `meta.title`). Mot-clé en tête du H1 et de la meta. Maillage contextuel de 3 à 5 liens par article, avec renvoi vers `/classement/fonds-investissement-pme` et `/comparer/fonds-investissement-pme`. Les ancres internes sont valides : la route `/blog/[categorie]/[slug]` existe.

### GEO / STRUCTURE ARTICLE ⚠️
- **% H2-questions : 81 % sur l'échantillon.** Un article est **sous 70 %** : `invest-public-ou-fonds-prive` (**57 %**). La doctrine v1.13 l'admet pour un face-à-face (40-60 %) ; il est flaggé ici selon le seuil de la tâche. Si on corrige, deux H2 se reformulent facilement : « Trois familles d'acteurs… » → « Qui sont les invests, Wallonie Entreprendre et les fonds privés ? » ; « Bruxelles et Flandre : un autre guichet » → « À qui s'adresser à Bruxelles et en Flandre ? ».
- **[mineur] `un-fonds-veut-40-pour-cent` à 100 %**, au-dessus de la fourchette de la réponse rapide (70-90 %). Sans gravité.
- ✅ Réponse-first : chaque chapô fait 40 à 60 mots et répond directement. Les H2 ouvrent presque tous sur une réponse courte.
- ✅ Plancher GEO complet sur 4/4 (tableau, liste à puces distincte du TL;DR, FAQ, TL;DR dans le frontmatter). Les comptes varient bien d'un article à l'autre (FAQ 5/7/5/7, TL;DR 4/5/4/6) et les formes tournent.
- **[important] `Speakable` absent** du JSON-LD (`ArticleView.tsx`). La doctrine l'exige sur tout article, pointé vers le TL;DR (`#en-bref`).
- **[mineur] JSON-LD Article incomplet** : `inLanguage` = `fr` / `en` au lieu de `fr-BE` / `en-BE` ; pas d'`image` ; pas de `sameAs` sur la Person ; pas de `HowTo` sur le guide pratique `lever-des-fonds-pme-etapes` (5 étapes numérotées).
- ✅ Article + Person (auteur Cédric H., prénom + initiale, bio E-E-A-T crédible, `url` de la page auteur) + BreadcrumbList + FAQPage, ce dernier généré depuis la FAQ réellement publiée.
- ✅ Année dynamique : aucune année en dur dans les titles, slugs ou H1. Les dates du corps sont des dates de relevé, comme le veut la doctrine.
- ✅ Sujets : les marques réelles sont nombreuses et taguées (ORSA, Noshaq, Namur Invest, Invest.BW, finance&invest.brussels, Mezzanine Partners, Muzinich…), sous un angle persona « dirigeant de PME ».
- ✅ Accords de genre : `entityGender: 'm'`. Aucun accord fautif relevé.
- **[à arbitrer] `dette-mezzanine`** : la phrase « **ORSA, partenaire mis en avant de ce site**, publie… » rend visible la relation commerciale (modèle mention). Elle est acceptable comme transparence, mais elle rompt la neutralité éditoriale et ressemble à une coulisse. Décider de la garder (en mention légale cohérente sur tout le site) ou de la neutraliser.

## Top actions prioritaires
1. **[important · template]** Ajouter le garde-fou `PRODUIT_SLUGS.includes(categorie)` (repli `/comparer`) au `toc-cta` d'`ArticleView.tsx` → supprime le 404 de la sidebar sur les 33 articles FR. Vérifier aussi `emd-template-v2` et les autres sites.
2. **[important · GEO]** Ajouter `Speakable` (cssSelector `#en-bref`) au JSON-LD Article.
3. **[mineur · GEO]** Corriger le JSON-LD : `inLanguage` `fr-BE` / `en-BE`, `image` = featureImage, `sameAs` auteur ; `HowTo` sur les guides pratiques à étapes.
4. **[à arbitrer]** Phrase « partenaire mis en avant de ce site » dans `dette-mezzanine`.
5. **[mineur · SEO]** Raccourcir le suffixe des titles (≤ 60 car.) ; passer en revue les 5 paires de slugs proches pour la cannibalisation ; adapter le vocabulaire « modèle / quiz » de `/comparer/[produit]`. Optionnel : remonter `invest-public-ou-fonds-prive` au-dessus de 70 % de H2-questions (2 reformulations).

## Synthèse
- Sites audités : **1** (fonds-investissement.be) · ❌ 0 · ⚠️ 2 (SEO sém., GEO).
- Articles thin (< 800 mots) dans l'échantillon : **0/4**.
- Articles sous 70 % de H2-questions : **1/4** (`invest-public-ou-fonds-prive`, 57 %, conforme à sa forme face-à-face).
