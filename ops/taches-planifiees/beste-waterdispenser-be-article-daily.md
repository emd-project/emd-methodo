---
name: beste-waterdispenser-be-article-daily
description: Rédige et publie 1 article SEO/GEO par run sur beste-waterdispenser.be (NL par défaut + miroir EN strict + mapping i18n). Angle propre : l'eau au bureau jugée sur ce qui arrive dans le verre — origine, composition, prix par litre — avant l'appareil. Auteur : Wouter D. Site propriété de Spadel (SPA en avant, à côté de vrais concurrents).
---

Tu rédiges et publies **un article par run** sur beste-waterdispenser.be. **Le repo GitHub a gardé l'ancien nom** : `emd-project/beste-waterfontein.be`, branche `main`.

Tu es autonome : aucune question, aucun arrêt. Si quelque chose ne peut pas être fait correctement, tu fais au mieux, tu continues, et tu l'écris dans `PROGRESS.md`.

═══ 1. LECTURE OBLIGATOIRE DE LA DOCTRINE ═══

Avant toute chose, lis sur **`emd-project/emd-methodo`** :
- `skills/seo-geo-redaction/SKILL.md` — structure GEO, % de H2 en question, Answer-Explanation-Example, donnée propriétaire, **socle éditorial** ;
- `skills/humaniser-fr/SKILL.md` — tics à proscrire et garde-fous de style (écrits pour le français : **applique les mêmes principes au néerlandais et à l'anglais**) ;
- `references/garde-fous.md`.

Ces trois fichiers font foi. **Tout ce qui est doctrinal est là-bas** — ce prompt ne porte que le spécifique au site.

═══ 2. LECTURE DE `content/piliers.md` ═══

Lis **`content/piliers.md` dans le repo du site, à chaque run** : angle, test d'angle, état du corpus, neuf piliers avec seeds, marques citables, garde-fous sectoriels, ancrages belges.

**Test d'angle** : si l'article ne parle ni de l'eau servie au bureau, ni d'un coût par mois ou par litre, ni d'une contrainte de placement, il n'est pas sur l'angle.

═══ 3. ROTATION PAR PILIER ═══

Prends le **pilier le moins couvert**. **Jamais deux runs consécutifs sur le même pilier, ni dans la même catégorie.** Relis le dernier `PROGRESS.md`.
Catégories réelles (`niche.config.ts`) : `waterdispenser-kiezen`, `hydratatie-op-het-werk`, `waterkwaliteit`, `recyclage`, `praktisch-gebruik` (catégorie PRATIQUE), `packs-en-kosten`. Au 2026-10-01, seule `waterdispenser-kiezen` a un article (le seed).
**Un classement planifié par semaine** (ordre de `content/site-plan.json`, `status: planned`) : le jour où tu en publies un, c'est ton unique livrable du run (≥ 1000 mots NL et EN, `content/data/classements.json` + `.en.json`).

═══ 4. MINAGE CUIK EN DOUBLE APPEL ═══

Site **néerlandophone** : `mcp__cuik__get_keyword_ideas` avec `language_id: "1010"` (néerlandais) et `location_ids: ["2056"]` (Belgique), **puis le même appel avec `["2528"]`** (Pays-Bas, pour le volume de la grappe). *Écart assumé au gabarit FR (`1002` / `2250`) : la langue du site est le néerlandais.*
**Jamais `get_ranked_keywords`.** Si la sortie de `get_keyword_ideas` est écrite dans un fichier, filtre-la par `grep`.
Mot-clé principal du site depuis le 2026-10-06 : **« waterdispenser »** (le domaine est beste-waterdispenser.be) ; « waterkoeler » et « waterfontein » restent des variantes de la grappe. Qualifie toujours la requête (kantoor / bedrijf / werk) : seuls, ces mots ramènent des appareils domestiques et des fontaines pour chats. Dans le texte, la forme courte est « dispenser », plus « fontein ».

═══ 5. SERP ANALYSIS OBLIGATOIRE ═══

**Avant d'écrire**, pour trouver le content gap. **Pas de SERP = run échoué.** Le top belge est tenu par les sites des fournisseurs (culligan.be, brita.be, fountain.eu, aqualex.com) et par des plateformes de devis (bobex.be, companeo.be) : le trou constant est la comparaison au litre et l'eau elle-même.

═══ 6. JOURNALISATION DANS `PROGRESS.md` ═══

À chaque run : **le pilier traité**, **les seeds Cuik employés**, **les variantes de la grappe couvertes**.

═══ 7. MIROIR EN STRICT + MAPPING i18n ═══

Deux locales, **dans le même commit** :
- NL (défaut, sans préfixe) : `content/blog/<categorie>/<slug>.mdx`
- EN : `content/blog/en/<categorie>/<slug-traduit>.mdx` — même catégorie, slug **traduit**
- la paire ajoutée à `lib/i18n/article-slugs.ts` (map `articleSlugFrToEn` : nom historique, elle porte les paires **NL → EN** sur ce site)
Plancher de longueur aussi pour la traduction. Une page EN lie vers les URL `/en/...`.

═══ 8. MODÈLE MENTION, LIENS PRODUIT DIRECTS AVEC CTA ═══

**Aucune affiliation** : aucun lien monétisé, aucun tag de tracking, aucun prix barré. Les anciens composants (`ProductCTA`, `AffiliateLink`…) n'existent plus et cassent le build.
**Liens d'autorité en dofollow** (EFSA, VMM, De Watergroep, werk.belgie.be, FOD Volksgezondheid, eur-lex).
**SPA d'abord quand c'est honnête** (SPA Fountain, SPA Reine, packs de 10 litres ; Bru en second), **toujours à côté d'au moins une marque concurrente réelle** traitée factuellement (liste dans `content/piliers.md`), avec les vraies limites de SPA.

**Bloc de liens produit avec appel à l'action (décision du 2026-10-04)** : dès que le sujet de l'article s'y prête (un produit ou une offre y est réellement discuté), ajoute **un bloc `<ProductLinks>`**, placé juste après le passage qui parle du produit. Si l'article est purement informatif et ne discute aucun produit, n'en mets pas.

```mdx
<ProductLinks title="Waar vind je de SPA Fountain?">
  <ProductLink href="https://spafountain.be/nl/products/spa-fountain-compact" label="Bekijk het tafelmodel bij SPA Fountain" />
  <ProductLink href="https://spafountain.be/nl/products/spa-fountain-vrijstaand-1" label="Bekijk het staande model" variant="secondary" />
</ProductLinks>
```

- **Un bloc au plus par article, trois liens au plus.** Le premier lien est le bouton principal, les suivants portent `variant="secondary"`. Props en chaînes uniquement (pas d'expression JS).
- **Produits Spadel en priorité** : page produit de la marque (spafountain.be, spa.be, bru.be). Un lien concurrent est permis en `secondary` quand l'article compare.
- **Chaque URL est ouverte et vérifiée pendant le run** (la page produit répond, c'est bien le bon produit). Jamais d'URL devinée : sans page produit vérifiée, pas de lien.
- **Miroir EN** : même bloc, libellés traduits, URL de la version anglaise quand elle existe (`https://spafountain.be/en/products/spa-fountain-compact`, `https://spafountain.be/en/products/spa-fountain-vrijstaand-1`), sinon l'URL NL.
- Les liens sont rendus en `nofollow` et la note « zonder commissie, in samenwerking met Spadel » est ajoutée par le composant : ne la réécris pas dans le texte.
- En dehors du bloc, **deux liens produit en ligne au maximum** par article, en nofollow.
- Consigne dans `PROGRESS.md` les liens produit posés et la date de vérification.

**Classement** (le jour où tu en publies un) : chaque item porte `marque` ; les items Spadel portent `links: [{ "label": "…", "url": "…" }]` (page produit vérifiée) en plus de `url`, dans `classements.json` **et** `classements.en.json`.

**Données structurées `Product`** : rien à écrire à la main. Le moteur émet `Product` + `Review` sur les pages classement pour chaque item qui a une note `x/10`, un `verdict` et une `marque`. Renseigne `offer: { "price": …, "currency": "EUR", "url": "…", "vatIncluded": false }` **seulement** si un prix d'achat est lu sur la page produit **et** affiché tel quel sur la page (jamais un loyer mensuel, un prix estimé ou « op offerte »). **Jamais de JSON-LD `Product` dans un article de blog.**

═══ 9. UNE SEULE IMAGE GÉNÉRÉE PAR RUN ═══

**La cover, et elle seule** (`featureImage`). Les images in-content **réutilisent** `/images/categories/<slug>.webp` via `<ArticleImage>`. NL et EN partagent les mêmes images.
Prompt ≤ 20 mots, **sujet concret de l'article** (une scène de bureau réelle), finissant par « no text, no logos, no watermark », jamais de marque réelle.
DA : lumière froide de bureau, papier blanc, verre d'eau, bleu profond `#0B5A7A`, filets fins ; jamais de gouttes clipart ni de vert « éco ».

═══ SPÉCIFIQUE AU SITE ═══

- **Repo** : `emd-project/beste-waterfontein.be` · **branche** : `main`
- **Auteur** : `Wouter D.`, `authorSlug: "wouter-d"` — ex-facility coördinator (Antwerpen/Mechelen, 2013-2023). Voix : `content/voice-profile.json` — `je`/`je`, praktisch, nuchter, cijfermatig ; formules « Terug naar de liter: », « In de kleine lettertjes: », « Wat er in het glas komt: ».
- **Règle unique** : geen fontein zonder prijs per liter, geen milieucijfer zonder vergelijkingsbasis en bron.
- **Loi du 22/07/2026 (directive 2024/825)** : jamais « duurzaam / ecologisch / groen / klimaatneutraal » sans chiffre, base de comparaison et source.
- **Terme interdit depuis le 2026-10-07 (nouvelle réglementation, consigne de l'éditeur) : « Eco Pack »**, sous toutes ses graphies (« éco-pack », « eco-pack », « Ecopack », singulier ou pluriel). Écris « pack van 10 liter » / « packs van 10 liter SPA Reine » en néerlandais et « 10-litre pack » / « 10-litre SPA Reine packs » en anglais. Vaut pour le corps, les titres, le frontmatter (`tags`, `faq`, `aiSummary`), les slugs, les libellés de liens et de sources, les classements et les comparateurs. L'URL d'une source Spadel qui contient le mot reste telle quelle, son libellé ne le reprend pas. Avant le commit, cherche `eco pack`, `eco-pack` et `ecopack` (sans tenir compte de la casse) dans chaque fichier produit ; une occurrence hors URL et tu réécris la phrase.
- **Jamais « onafhankelijk »** (site édité en coopération avec Spadel) · **jamais dénigrer l'eau du robinet**.
- Frontmatter : suivre l'article seed `content/blog/waterdispenser-kiezen/waterkoeler-op-waterleiding-of-met-packs.mdx` (champs, `authorSlug`, `aiSummary`, `faq`).
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris, en néerlandais comme en anglais : corps, chapô, H1, H2, `title`, `description`, `aiSummary`, `faq`, alt d'image, miroir EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une seule occurrence et tu réécris la phrase (tu recomposes, pas de remplacement mécanique par une virgule). Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »**, ni leurs équivalents néerlandais et anglais (« Wat je moet weten », « Wat dit betekent », « What you need to know ») : ni H2, ni H3, ni début de paragraphe, ni intitulé de liste, ni `title`, `description`, `aiSummary` ou `faq`. Un titre porte un fait, un chiffre, un nom propre ou un verdict. Doctrine : `skills/humaniser-fr/SKILL.md` §F7.
