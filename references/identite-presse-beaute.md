# Thème BEAUTÉ & BIEN-ÊTRE — on copie le démo, on change la couleur

**Décision du 2026-09-17.** Les sites de beauté et de bien-être reprennent le thème de `meilleure-beaute-demo` **en entier**, et **seule la teinte d'accent change d'un site à l'autre**.

Ce n'est pas une option offerte à l'art-director. C'est la règle de la famille, et elle prime sur le tirage habituel de palette et de typo.

---

## La règle, en une phrase

> **Sur un sujet beauté, bien-être ou soin : tu copies la DA du démo, tu changes la teinte d'accent, tu ne touches à rien d'autre.**

Les autres familles — automobile, banque, assurance, télécom, énergie, retail, juridique — gardent le fonctionnement normal : tirage de palette, de typo et de permutations, divergence maximale entre voisins.

## Ce qu'on copie — valeurs relevées sur le rendu du démo le 2026-09-17

| Token | Valeur | Statut |
|---|---|---|
| `identity` | `presse` | **copié** |
| `mode` | `light` | **copié** |
| `--bg-primary` | `#FBF6F1` | **copié** |
| `--bg-surface` | `#FFFFFF` | **copié** |
| `--bg-surface-2` | `#F1E9E1` | **copié** |
| `--text-primary` | `#211A16` | **copié** |
| `--text-secondary` | `#5A4F47` | **copié** |
| `--text-muted` | `#6F655D` | **copié** |
| display | **Fraunces** | **copié** |
| body | **Hanken Grotesk** | **copié** |
| `permutations` | `sharp` / `hairline` / `flat` (rayons à 0) | **copié** |
| `style.effects` | `none` — papier, aucun dégradé | **copié** |
| `--accent-1` | **← LA VARIABLE** | le démo est à `#A6325A`, **339,3°** |
| `--accent-2/4/5` | `#7A5230` terre · `#6B4A86` mauve · `#A85610` ocre | copiés, ré-accordés seulement si la teinte 1 les rend illisibles |
| `--accent-3` | re-accordé au sujet du site | libre |

## Ce qu'on change : la teinte, et elle seule

`--accent-1` porte l'identité du site. Elle reste soumise au **contrôle du `da-registry`** : au moins **25° d'écart** avec chacun des huit derniers sites enregistrés. C'est le seul garde-fou visuel qui subsiste entre deux sites beauté, donc il n'est **pas négociable**.

Après le choix de la teinte, recalculer les contrastes sur le papier crème `#FBF6F1` : texte ≥ 4,5, gros titres, bordures et focus ≥ 3. Une teinte claire passe rarement sur ce fond — viser une valeur sombre et saturée, du registre « encre ».

`da-site.css` reste **maigre** : deux ou trois traitements typographiques au maximum, jamais de matière ni de mouvement qui contredirait le papier. Sur cette famille, la différenciation **est** la couleur.

## Ce que ça coûte, et pourquoi on l'accepte

Trois règles d'anti-empreinte sont **délibérément enfreintes**. Elles sont listées ici pour que personne ne les « corrige » par inadvertance, et pour que la tâche d'audit ne les signale pas comme des défauts.

1. **Le couple de fonds est partagé** par tous les sites beauté. Le `da-registry` traite normalement un couple dupliqué comme un défaut (`duplicatedBackgroundCouples`). Ici il est voulu.
2. **La typo est partagée.** Et `Hanken Grotesk` est la police **body par défaut du template** — sur un site hors famille beauté, la conserver signale un fork non configuré. `Fraunces` est par ailleurs portée par `meilleure-voiture-familiale.be`.
3. **Les permutations sont partagées** : `sharp` / `hairline` / `flat` sur toute la famille.

Le pipeline compte **25 domaines Beauty**. Quand ils seront tous sortis, ils se ressembleront — c'est le prix de la cohérence de famille, et c'est un choix assumé, pas un oubli. Le seul écart entre deux sites frères sera la teinte, donc le contrôle des 25° devient la contrainte critique de cette famille.

## L'identité `presse` — rappel technique

Elle avait été retirée le **2026-08-02** au motif qu'elle était maintenue pour un seul secteur. Ce motif est caduc : la famille compte 25 sites, et le registre éditorial est précisément ce qui les rend crédibles sur leur marché.

**Ce que c'est** — une identité, pas un troisième squelette de home :

| Surface | Standard | Presse |
|---|---|---|
| En-tête | `Nav` | `PresseMasthead` (wordmark sérif centré + nav catégories collante) |
| Pied | `Footer` | `PresseFooter` |
| Home | `MagazineHome` / `MarcheHome` | `PresseHome` |
| Hub blog | corps Voltéo | `PresseBlogHub` |
| Catégorie | corps Voltéo | `PresseCategory` |
| Article | corps Voltéo | `PresseArticle` |

**Elle ne change rien au reste** : mêmes données, mêmes métadonnées, même JSON-LD, même ISR, mêmes routes, même sitemap. **Le SEO ne dépend pas de la variante** — c'est la condition qui rend ce levier peu risqué.

`layouts.home` reste renseigné : il n'est pas lu tant que l'identité est `presse`, mais il est le repli si un site repasse en `standard`.

## Le rebranchement — quatre fichiers

Dans `emd-template`, **tout était resté en place** sauf deux points : `isPresse()` rendait `false` en dur (`@deprecated`), et `HomeRouter` ne dispatchait plus `PresseHome`. Étaient intacts : les sept composants `components/presse/*`, les branches `if (isPresse())` du hub blog, de la catégorie et de l'article, les deux layouts FR/EN, et les clés de traduction `presse.*` en FR et en EN.

1. `niche.config.ts` → ajouter `identity?: 'standard' | 'presse'` au type `layouts`, puis `identity: 'presse'`
2. `lib/variants.ts` → `isPresse()` relit `niche.layouts?.identity`, et `suggestVariants` rend `identity: 'presse'` quand la famille est `beaute`
3. `components/home/HomeRouter.tsx` → dispatcher `PresseHome` quand `isPresse()`, **sauf** sur les routes preview `/home-vN`
4. **`PresseMasthead` + les deux layouts** → la nav de catégories (voir ci-dessous)

Première application : **meilleur-shampoing.be**, le 2026-09-17, teinte **235,0°** (encre violette) contre 339,3° pour le démo.

## La nav de catégories ne doit lier que les catégories REMPLIES

**Constaté le 2026-09-20 sur meilleur-shampoing.be : six liens morts dans le masthead** (trois catégories × deux locales), au lendemain du provisionnement.

Le mécanisme, et il vaut pour **tout site presse fraîchement provisionné** :

- `niche.config.categories` déclare 4 à 6 catégories — c'est ce que `seo-architect` demande ;
- `budget.seedArticles` vaut **1** — c'est ce que la doctrine impose ;
- `app/(site)/blog/[categorie]/page.tsx` fait `if (all.length === 0) notFound()`, et `generateStaticParams()` dérive de `getCategories()`, qui part des articles **publiés** ;
- `PresseMasthead` liait `niche.categories`, donc **toutes** les catégories déclarées.

Résultat : autant de 404 dans le menu que de catégories vides, jusqu'à ce que la tâche quotidienne les remplisse — et la règle de rotation lui interdit deux runs consécutifs dans la même catégorie, donc ça dure plusieurs jours.

**Le correctif** — `PresseMasthead` prend une prop optionnelle `categories?: { slug, label }[]` :

- prop **absente** → repli sur `niche.categories`, comportement d'avant, aucun fork cassé ;
- prop **présente** → la nav lie exactement cette liste ;
- `app/(site)/layout.tsx` passe `getCategories()`, `app/en/layout.tsx` passe **`getCategoriesEn()`** — une catégorie peut être remplie en FR et pas encore en EN ;
- les deux listes sont **réordonnées selon `niche.config.categories`**, sinon la barre change d'ordre à chaque publication ;
- l'accent de la pastille vient du **slug** (`categoryAccents()`), jamais de l'index de la liste rendue — sinon filtrer décalerait toutes les couleurs.

Les catégories **reviennent seules** dans le menu dès qu'elles reçoivent leur premier article. Aucun contenu inventé, aucune page creuse indexée.

## Dette ouverte

- [ ] **Porter les QUATRE changements dans `emd-project/emd-template`**, pour que les forks suivants naissent avec `identity` dans le type, `isPresse()` fonctionnel, le dispatch `PresseHome` et la nav filtrée. Tant que ce n'est pas fait, chaque site beauté doit rejouer les quatre éditions à la main.
- [ ] **Mettre à jour le skill `art-director`** : le levier 2 dit encore « il n'y a plus que DEUX homes, et le choix n'en est pas un », et les leviers 3 et 4 imposent un tirage de palette et de typo que cette famille n'applique plus. Y écrire la règle de copie.
- [ ] **Bug i18n dans `PresseHome`** : les kickers de catégorie lisent `niche.categories[].label`, donc la locale de BASE. Sur `/en`, les libellés restent en français. Le correctif est de passer par `categoryLabelL(locale, slug)` (`lib/niche-l10n.ts`) dans `catLabel()`. Constaté sur meilleur-shampoing.be le 2026-09-17, à corriger dans le template.
- [ ] **Chaîne `presse.letterDesc`** (`content/translations/fr.json`) : « Nos guides et nos **coups de cœur** » emploie un tic proscrit par `humaniser-fr`, et il s'affiche sur la home de tous les sites presse.
- [ ] **Décider pour Hospitality** (hôtels, restaurants) : registre éditorial proche, famille non tranchée à ce jour.
- [ ] **`meilleure-beaute-demo`** tourne encore sur l'ancien câblage (`layouts.home: 'presse'`). À aligner sur `layouts.identity` lors de son prochain passage.
