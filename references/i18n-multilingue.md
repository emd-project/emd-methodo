# Référence i18n — « vrai site multilingue » EMD

Doctrine canonique du multilingue FR + EN. Référence vivante : **`quel-operateur-choisir.be`** (et `meilleure-voiture-electrique`, `meilleure-carte-credit.be`) — copier fidèlement ce pattern, ne pas réinventer.

## Définition d'un VRAI site multilingue (critères d'acceptation)
Un site « FR + EN » n'est conforme que si TOUS ces points sont vrais :
1. **Arbre de routes EN séparé `app/en/`** : `app/en/layout.tsx`, `app/en/page.tsx`, `app/en/blog/...`, `app/en/legal-notice/...`. Il **ne touche pas** les routes FR (donc ne peut pas casser le FR au runtime).
2. **Lecteurs miroir `…En()`** dans `lib/blog.ts` qui lisent `content/blog/en/[catégorie]/*.mdx`.
3. **Les dossiers de locale ne sont JAMAIS lus comme des catégories.** `lib/blog.ts` ne traite comme catégories que la **liste blanche des catégories FR réelles** (`isFrCategory`). Un dossier `en/` ou `nl/` dans `content/blog/` ne doit JAMAIS apparaître comme catégorie.
4. **Mapping FR↔EN par page** dans `lib/i18n/article-slugs.ts` (`articleSlugFrToEn` / `articleSlugEnToFr`), slug naturel par langue.
5. **Sélecteur de langue `LangSwitch` monté dans la Nav** (FR et EN), qui renvoie **page ↔ page équivalente** (jamais vers la home).
6. **hreflang réciproque** (+ `x-default`) dans la metadata de chaque page, et **attribut `lang`** correct par locale.
7. **Parité de contenu** : chaque page/article a sa version EN (au minimum l'article seed au provisioning). Jamais d'orphelin.
8. **Jamais de NL.**

## Anti-pattern à bannir (le bug à ne jamais reproduire)
Déverser des `.mdx` EN (ou NL) dans `content/blog/` **sans** l'arbre `app/en/`, le mapping et le switcher : les dossiers de locale s'affichent comme de **fausses catégories**, il n'y a ni routing `/en`, ni hreflang, ni sélecteur. Ce n'est PAS un site multilingue — c'est un site cassé.

## Garanties zéro-404 (mapping, switcher, hreflang)

### Le mapping est la source de vérité
`lib/i18n/article-slugs.ts` (`articleSlugFrToEn`, inverse dérivé automatiquement ; helpers `articleSlugInOrNull(slug, from, to)` → `null` si non traduit, `translateArticleSlug()` → même slug en dernier recours) est la **source de vérité** du sélecteur de langue, des redirects et du hreflang. Règle absolue : **TOUT nouvel article est inscrit dans le mapping** dans le même commit que ses MDX (check pré-commit : tout nouveau MDX apparaît dans le mapping).

### Switcher — jamais une 404
- Le switcher navigue **page ↔ page équivalente** via le mapping (doctrine EMD : la parité de contenu rend ce cas nominal).
- Cas dégradé (anomalie : slug absent du mapping) : le switcher retombe **proprement sur l'accueil de la locale cible** — il ne pointe **JAMAIS vers une 404**. La dégradation est un filet de sécurité, pas une excuse pour négliger le mapping.
- Les pages à route fixe (blog, comparer, mentions…) font un simple swap de préfixe : elles existent dans toutes les locales grâce à la parité.
- **Ne jamais regénérer un switcher « maison »** : câbler le composant existant du pattern de référence (`quel-operateur-choisir.be`). En mono-langue il rend `null` (aucun effet), il peut rester monté en permanence.

### hreflang — UNIQUEMENT les traductions qui existent
- N'émettre une alternate `hreflang` **QUE pour les locales où la traduction existe réellement** (slug mappé / fichier MDX présent — filtrer sur `articleSlugInOrNull(...) != null`). Un hreflang pointant vers une page absente est un **signal cassé** pour Google.
- Toujours déclarer **`x-default`** pointant vers la locale par défaut (sinon Google ne sait pas quelle locale servir aux marchés ambigus).
- `canonical` par locale : URL FR sans préfixe, URL EN sous `/en/...`.

## Publication — commit atomique (règle d'or)
Un article = 1 fichier MDX **par locale** + la mise à jour du mapping i18n, poussés en **UN SEUL commit** (les images, partagées entre locales, peuvent être poussées avant). Si le run ne peut pas produire toutes les versions, **ne RIEN pousser** : mieux vaut un run skippé qu'un miroir cassé en prod. Jamais d'« article publié uniquement en FR sur un site bilingue ».

## Sitemap multi-langue
`app/sitemap.ts` produit **une entrée par (URL × locale)**, avec `alternates.languages` réciproques et `lastModified` = date de modification de l'article. Aucune URL d'une traduction inexistante.

## JSON-LD — inLanguage
Chaque Article déclare `inLanguage` au format BCP 47 `{locale}-{market}` (`fr-BE`, `en-BE`), aligné sur la locale de la page rendue. L'auteur (`Person` + `sameAs`) est identique dans toutes les locales.

## Anti-patterns (complément)
| Erreur | Conséquence | Fix |
|---|---|---|
| Publier l'article FR sans la version EN | Miroir cassé, hreflang vide en EN | Refuser le commit jusqu'à avoir toutes les versions |
| Slug identique dans toutes les locales | SEO pénalisé (duplicate URL pattern) | Slug naturel par langue + mapping |
| Oublier le mapping dans `lib/i18n/article-slugs.ts` | Switcher dégradé + hreflang incomplet | Validation pré-commit : tout nouveau MDX est mappé |
| Regénérer un LangSwitch maison | Risque de 404 réintroduit | Câbler le composant du pattern de référence |
| hreflang vers une traduction inexistante | Signal cassé pour Google | Alternate émise seulement si la version existe |
| `x-default` oublié | Locale ambiguë pour Google | Toujours déclarer `x-default` (locale par défaut) |
| Traduire les noms d'institutions belges (FSMA, BNB, SPF…) | Confusion lecteur, perte d'autorité | Garder les acronymes officiels + parenthèse explicative en EN |
| Mentions légales en FR uniquement | RGPD partiellement servi, expérience cassée | Pages légales traduites dans toutes les locales |

## Règle de sécurité BUILD (critique)
L'arbre `app/en/` **doit compiler entièrement** : une seule erreur de compilation fait **échouer tout le déploiement Vercel, FR inclus**. Donc :
- Construire en **incréments compilables** (légal EN → blog EN + articles → home EN en dernier).
- **Vérifier le build** (`npm run build` local ou préview Vercel sur branche) **avant** de pousser sur `main` quand c'est possible. Pousser un `app/en` complet « à l'aveugle » sur un `main` auto-déployé est le scénario « cata » à éviter.

## Cause racine & fix durable
Le cluster Voiture (`emd-template` mono-locale) ne porte PAS ce système → tout site provisionné dessus est pseudo-multilingue. **Fix racine : porter ce système i18n dans `emd-template`** pour que tout nouveau site soit multilingue par construction. Tant que ce n'est pas fait, le provisioning doit porter le pattern depuis la référence operateur, en incréments compilables.
