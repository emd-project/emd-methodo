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

## Règle de sécurité BUILD (critique)
L'arbre `app/en/` **doit compiler entièrement** : une seule erreur de compilation fait **échouer tout le déploiement Vercel, FR inclus**. Donc :
- Construire en **incréments compilables** (légal EN → blog EN + articles → home EN en dernier).
- **Vérifier le build** (`npm run build` local ou préview Vercel sur branche) **avant** de pousser sur `main` quand c'est possible. Pousser un `app/en` complet « à l'aveugle » sur un `main` auto-déployé est le scénario « cata » à éviter.

## Cause racine & fix durable
Le cluster Voiture (`emd-template` mono-locale) ne porte PAS ce système → tout site provisionné dessus est pseudo-multilingue. **Fix racine : porter ce système i18n dans `emd-template`** pour que tout nouveau site soit multilingue par construction. Tant que ce n'est pas fait, le provisioning doit porter le pattern depuis la référence operateur, en incréments compilables.
