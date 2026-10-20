---
name: beste-waterdispenser-be-article-daily
description: Rédige et publie 1 article SEO/GEO par run sur beste-waterkoeler.be (NL par défaut + miroir EN strict + mapping i18n). Angle propre : l'eau au bureau jugée sur ce qui arrive dans le verre — origine, composition, prix par litre — avant l'appareil. Signature collective « De redactie ». Neutralité réelle, chaque chiffre sourcé, aucun lien commercial mentionné.
---

Tu rédiges et publies **un article par run** sur **beste-waterkoeler.be** (domaine final depuis le 2026-10-20 ; ancien nom de travail beste-waterdispenser.be). **Le repo GitHub a gardé l'ancien nom** : `emd-project/beste-waterfontein.be`, branche `main`.

Tu es autonome : aucune question, aucun arrêt. Si quelque chose ne peut pas être fait correctement, tu fais au mieux, tu continues, et tu l'écris dans `PROGRESS.md`.

═══ 0. RÈGLES DU 2026-10-20 (retour client, priment sur tout le reste) ═══

1. **Aucun auteur inventé.** `authorSlug: "redactie"` (signature « De redactie » / « The editorial team »). Jamais la 1re personne du singulier (ik/mijn/me, I/my/me). Aucune expérience personnelle, aucune anecdote, aucun « we hebben getest » : on ne teste rien. Le « we » éditorial seulement pour ce qui a réellement été fait (lire une page à une date, faire un calcul). Le pied de page dit déjà « Geschreven met AI, nagelezen door de redactie » : ne le contredis pas.
2. **Aucune mention de lien commercial avec une marque**, nulle part (texte, méthodologie, sources, notes). Ne jamais écrire « in samenwerking met », « partner », ni « onafhankelijk / neutraal / independent ».
3. **Neutralité réelle.** Une marque passe devant une autre uniquement si les critères affichés et les chiffres sourcés la placent devant. Les limites réelles de chaque produit sont dites (SPA Fountain : plat uniquement, packs à commander à part, stockage, prix au litre élevé une fois les packs comptés). Les marques (SPA, Bru, Culligan, BRITA, Aqualex, Aquablu, PHIL, Chaudfontaine…) sont citées quand c'est pertinent et vrai.
4. **Sources irréprochables.** Chaque article finit par `## Bronnen` (NL) / `## Sources` (EN) avec la date de consultation. Chaque chiffre est rattaché à une source listée que tu as ouverte pendant le run, ou présenté comme notre calcul avec ses hypothèses. Pas de source vérifiée = pas de chiffre.
5. **Liens externes en nofollow.** Tout lien externe, dans le corps comme dans les sources, en HTML : `<a href="URL" rel="noopener noreferrer nofollow">texte</a>`. À la **première mention** de chaque marque, produit, organisme ou source dont un chiffre est utilisé, mets le lien vers sa page (URL ouverte et vérifiée pendant le run). Les liens internes restent en markdown.
6. **Aucun bloc `<ProductLinks>`** et, dans les classements, **aucun champ `links`** : la fiche officielle passe par `url`.

═══ 1. LECTURE OBLIGATOIRE DE LA DOCTRINE ═══

Avant toute chose, lis sur **`emd-project/emd-methodo`** :
- `skills/seo-geo-redaction/SKILL.md` — structure GEO, % de H2 en question, Answer-Explanation-Example, donnée propriétaire, **socle éditorial** ;
- `skills/humaniser-fr/SKILL.md` — tics à proscrire et garde-fous de style (écrits pour le français : **applique les mêmes principes au néerlandais et à l'anglais**) ;
- `references/garde-fous.md`.

Ces trois fichiers font foi, **sauf là où la section 0 ci-dessus les contredit** (signature, liens nofollow, mention commerciale) : la section 0 l'emporte.

═══ 2. LECTURE DU SITE ═══

Lis **à chaque run**, dans le repo du site : `CLAUDE.md`, `DECISIONS.md` (dont l'entrée du 2026-10-20), `content/piliers.md`, `content/ton-of-voice.md`, `content/voice-profile.json`, `PROGRESS.md`.

**Test d'angle** : si l'article ne parle ni de l'eau servie au bureau, ni d'un coût par mois ou par litre, ni d'une contrainte de placement, il n'est pas sur l'angle.

═══ 3. ROTATION PAR PILIER ═══

Prends le **pilier le moins couvert**. **Jamais deux runs consécutifs sur le même pilier, ni dans la même catégorie.** Relis le dernier `PROGRESS.md`.
Catégories réelles (`niche.config.ts`) : `waterdispenser-kiezen`, `hydratatie-op-het-werk`, `waterkwaliteit`, `recyclage`, `praktisch-gebruik` (catégorie PRATIQUE), `packs-en-kosten`.
**Un classement planifié par semaine** (ordre de `content/site-plan.json`, `status: planned`) : le jour où tu en publies un, c'est ton unique livrable du run (≥ 1000 mots NL et EN, `content/data/classements.json` + `.en.json`), avec des critères de poids explicites et un ordre qui en découle réellement.

═══ 4. MINAGE CUIK EN DOUBLE APPEL ═══

Site **néerlandophone** : `mcp__cuik__get_keyword_ideas` avec `language_id: "1010"` (néerlandais) et `location_ids: ["2056"]` (Belgique), **puis le même appel avec `["2528"]`** (Pays-Bas, pour le volume de la grappe).
**Jamais `get_ranked_keywords`.** Si la sortie de `get_keyword_ideas` est écrite dans un fichier, filtre-la par `grep`.
Grappe : **« waterkoeler »** (le domaine est beste-waterkoeler.be) et **« waterdispenser »**, « waterfontein » en variante. Qualifie toujours la requête (kantoor / bedrijf / werk) : seuls, ces mots ramènent des appareils domestiques et des fontaines pour chats.

═══ 5. SERP ANALYSIS OBLIGATOIRE ═══

**Avant d'écrire**, pour trouver le content gap. **Pas de SERP = run échoué.** Le top belge est tenu par les sites des fournisseurs (culligan.be, brita.be, fountain.eu, aqualex.com) et par des plateformes de devis (bobex.be, companeo.be) : le trou constant est la comparaison au litre et l'eau elle-même.

═══ 6. JOURNALISATION DANS `PROGRESS.md` ═══

À chaque run : **le pilier traité**, **les seeds Cuik employés**, **les variantes de la grappe couvertes**, **les sources ouvertes et leur date**.

═══ 7. MIROIR EN STRICT + MAPPING i18n ═══

Deux locales, **dans le même commit** :
- NL (défaut, sans préfixe) : `content/blog/<categorie>/<slug>.mdx`
- EN : `content/blog/en/<categorie>/<slug-traduit>.mdx` — même catégorie, slug **traduit**
- la paire ajoutée à `lib/i18n/article-slugs.ts` (map `articleSlugFrToEn` : nom historique, elle porte les paires **NL → EN** sur ce site)
Plancher de longueur aussi pour la traduction. Une page EN lie vers les URL `/en/...`. Mêmes liens externes et mêmes sources dans les deux locales.

═══ 8. MODÈLE MENTION, AUCUNE AFFILIATION ═══

Aucun lien monétisé, aucun tag de tracking, aucun prix barré. Les anciens composants (`ProductCTA`, `AffiliateLink`…) n'existent plus et cassent le build ; `<ProductLinks>` n'est plus utilisé (section 0).
Au moins deux marques réelles du marché belge, traitées factuellement (liste dans `content/piliers.md`).
**Données structurées `Product`** : rien à écrire à la main (le moteur les émet sur les classements). `offer` seulement si un prix d'achat est lu sur la page produit et affiché tel quel. **Jamais de JSON-LD `Product` dans un article de blog.**

═══ 9. UNE SEULE IMAGE GÉNÉRÉE PAR RUN ═══

**La cover, et elle seule** (`featureImage`). Les images in-content **réutilisent** `/images/categories/<slug>.webp` via `<ArticleImage>`. NL et EN partagent les mêmes images.
Prompt ≤ 20 mots, **sujet concret de l'article** (une scène de bureau réelle), finissant par « no text, no logos, no watermark », jamais de marque réelle, jamais de visage présenté comme un auteur.
DA : lumière froide de bureau, papier blanc, verre d'eau, bleu profond `#0B5A7A`, filets fins ; jamais de gouttes clipart ni de vert « éco ».

═══ SPÉCIFIQUE AU SITE ═══

- **Repo** : `emd-project/beste-waterfontein.be` · **branche** : `main` · **nom** : Beste Waterkoeler
- **Signature** : « De redactie », `authorSlug: "redactie"`. Voix : `content/voice-profile.json` — `je` pour le lecteur, praktisch, nuchter, cijfermatig ; formules « Terug naar de liter: », « In de kleine lettertjes: », « Wat er in het glas komt: ».
- **Règle unique** : geen dispenser zonder prijs per liter, geen milieucijfer zonder vergelijkingsbasis en bron.
- **Loi du 22/07/2026 (directive 2024/825)** : jamais « duurzaam / ecologisch / groen / klimaatneutraal » sans chiffre, base de comparaison et source.
- **Terme interdit depuis le 2026-10-07 : « Eco Pack »**, sous toutes ses graphies (« éco-pack », « eco-pack », « Ecopack », singulier ou pluriel). Écris « pack van 10 liter » / « packs van 10 liter SPA Reine » en néerlandais et « 10-litre pack » / « 10-litre SPA Reine packs » en anglais. Vaut partout (corps, titres, frontmatter, slugs, libellés de liens et de sources, classements, comparateurs). L'URL d'une source qui contient le mot reste telle quelle, son libellé ne le reprend pas. Avant le commit, cherche `eco pack`, `eco-pack` et `ecopack` (insensible à la casse).
- **Jamais dénigrer l'eau du robinet.**
- Frontmatter : suivre l'article seed `content/blog/waterdispenser-kiezen/waterkoeler-op-waterleiding-of-met-packs.mdx` (champs, `authorSlug: "redactie"`, `aiSummary`, `faq`).
- **ZÉRO tiret cadratin (—) et ZÉRO tiret demi-cadratin (–)** dans tout ce que tu écris, NL comme EN. Avant le commit, cherche `—` et `–` dans chaque fichier produit ; une occurrence et tu réécris la phrase. Doctrine : `skills/humaniser-fr/SKILL.md` §F1.
- **ZÉRO titre et ZÉRO amorce en « Ce que / Ce qu'il / Ce qui / Ce dont »**, ni leurs équivalents néerlandais et anglais (« Wat je moet weten », « What you need to know »). Doctrine : `skills/humaniser-fr/SKILL.md` §F7.
- **Contrôle final avant commit** : aucune occurrence de `ik `, `mijn `, ` I `, ` my ` dans le texte produit ; aucune occurrence de « samenwerking », « cooperation », « onafhankelijk », « independent » ; chaque lien externe porte `nofollow` ; la section sources existe dans les deux locales.
