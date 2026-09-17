# Identité `presse` — famille BEAUTÉ & BIEN-ÊTRE

**Décision du 2026-09-17.** Les sites de beauté et de bien-être reprennent le thème éditorial de `meilleure-beaute-demo`. Ce n'est pas une option offerte à l'art-director : c'est le **défaut de la famille**.

---

## La règle

> **Tout site dont la thématique relève de la beauté, du soin ou du bien-être sort en identité `presse`.**
> Les autres familles — automobile, banque, assurance, télécom, énergie, retail, juridique — gardent `standard`.

Écrit dans le fork, une seule ligne :

```ts
layouts: { home: 'magazine', category: 'editorial', article: 'classic', identity: 'presse' },
```

## Pourquoi cette réouverture

L'identité `presse` avait été retirée le **2026-08-02**, au motif qu'elle était « une IDENTITÉ complète maintenue pour un seul secteur ». Le motif était juste à la date où il a été écrit : un seul site beauté existait, et c'était un démo.

Il ne l'est plus. `pipeline/sites.csv` compte **25 domaines Beauty** et la famille Hospitality s'en rapproche. Rendre `magazine` sur ces thématiques n'était pas une simplification, c'était un appauvrissement : le registre éditorial — masthead sérif, rails de catégories, « le mot de la rédaction » — est précisément ce qui rend ces sites crédibles sur leur marché.

La décision du 2026-08-02 **reste valable pour `comparateur` et `fil`**, qui ne sont pas réouvertes.

## Ce que l'identité change, et ce qu'elle ne change pas

**Elle change le chrome et les corps éditoriaux** — c'est tout :

| Surface | Standard | Presse |
|---|---|---|
| En-tête | `Nav` | `PresseMasthead` (wordmark sérif centré + nav catégories collante) |
| Pied | `Footer` | `PresseFooter` |
| Home | `MagazineHome` / `MarcheHome` | `PresseHome` (la une + une section par catégorie + colonne sticky) |
| Hub blog | corps Voltéo | `PresseBlogHub` |
| Catégorie | corps Voltéo | `PresseCategory` |
| Article | corps Voltéo | `PresseArticle` |

**Elle ne change RIEN au reste.** Mêmes données, mêmes métadonnées, même JSON-LD, même ISR, mêmes routes, même sitemap. **Le SEO ne dépend pas de la variante** — c'est la condition qui rend ce levier peu risqué.

`layouts.home` reste renseigné : il n'est pas lu tant que l'identité est `presse`, mais il est le repli si un site repasse en `standard`.

## Anti-empreinte — le point à ne pas rater

Le layout presse est **figé** : deux sites beauté auront la même structure. C'est assumé, exactement comme deux sites `marche`.

**La divergence passe entièrement par la peau**, et les règles habituelles s'appliquent sans aménagement :

- palette à **≥ 25° d'écart de teinte** de chacun des 8 derniers sites du `da-registry` ;
- typo absente de la même fenêtre ;
- couple de fonds inédit ;
- permutations `shape`/`border`/`shadow` et leviers `effects`/`cards` ;
- 3 à 5 effets propres dans `da-site.css`.

`PresseHome` est **100 % token-driven** : la maquette d'origine utilisait rose/mauve/or/terre/sauge, ce sont désormais `--accent-1..5`. Une palette sombre rend donc une presse sombre, sans retouche.

**Corollaire à surveiller** : quand les 25 sites Beauty seront sortis, ils partageront tous ce squelette. L'écart de teinte devient le seul garde-fou visuel entre sites frères — le contrôle du `da-registry` n'est pas négociable sur cette famille.

## L'état du câblage au 2026-09-17

Dans `emd-template`, **tout était resté en place** sauf deux points :

1. `lib/variants.ts` → `isPresse()` rendait `false` en dur (`@deprecated`) ;
2. `components/home/HomeRouter.tsx` → ne dispatchait plus `PresseHome`.

Étaient **intacts** : les sept composants `components/presse/*`, les branches `if (isPresse())` du hub blog, de la page catégorie et de la vue article, les deux layouts `app/(site)/layout.tsx` et `app/en/layout.tsx`, et les clés de traduction `presse.*` en FR et en EN.

Le rebranchement tient donc en trois fichiers : le type + la valeur dans `niche.config.ts`, `isPresse()` qui relit la config dans `lib/variants.ts`, et le dispatch dans `HomeRouter`. Première application : **meilleur-shampoing.be**, le 2026-09-17.

## Dette ouverte

- [ ] **Porter les trois changements dans `emd-project/emd-template`**, pour que les forks suivants naissent avec `identity` dans le type et `isPresse()` fonctionnel. Tant que ce n'est pas fait, chaque site beauté doit rejouer les trois éditions à la main.
- [ ] **Mettre à jour le skill `art-director`** (`.claude/skills/art-director/SKILL.md`) : le levier 2 dit encore « il n'y a plus que DEUX homes, et le choix n'en est pas un ». Ajouter que l'identité est une dimension distincte, et qu'elle est imposée sur la famille beauté.
- [ ] **Décider pour Hospitality** (hôtels, restaurants) : registre éditorial proche, famille non tranchée à ce jour.
- [ ] **`meilleure-beaute-demo`** tourne encore sur l'ancien câblage (`layouts.home: 'presse'`). À aligner sur `layouts.identity` lors de son prochain passage.
