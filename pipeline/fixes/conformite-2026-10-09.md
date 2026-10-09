# Journal des corrections — CONFORMITÉ & IDENTITÉ — 2026-10-09

**Domaine :** Légal/RGPD · Identité · Auteur/E-E-A-T
**Source (to-do) :** `pipeline/audits/conformite-LATEST.md` (audit du 2026-10-01, inchangé depuis le run précédent)
**Doctrine appliquée :** `skills/emd-fix/SKILL.md` (v1.6.1) + `skills/humaniser-fr/SKILL.md` + `references/garde-fous.md`
**Périmètre :** les 7 sites du rapport, rien d'autre.
**Contexte :** run planifié du jeudi 2026-10-08 20h, exécuté le 2026-10-09. L'audit n'a pas été renouvelé : les ❌ et ⚠️ majeurs ont déjà été traités le 2026-10-01 (`conformite-2026-10-01.md`). Vérification faite sur `meilleur-hotel-bruges.be` (favicon clé de comptoir bien en place). Ce run traite donc uniquement les points **reportés** du journal précédent qui relèvent du domaine. Tout le reste : déjà bon → passé (idempotent).

---

## Synthèse

| Site | Corrigé ce run | Commits |
|---|---|---|
| meilleur-hotel-bruges.be | OG propre au site · politique FR alignée | `036b3c1`, `ead56cf` |
| meilleure-carte-bancaire.be | OG propre au site · politique FR alignée | `a3e8515`, `5e21b88` |
| meilleur-lave-linge.be | OG propre au site · politique FR alignée | `a532a53`, commit confidentialité (blob `657094f`) |
| meilleur-shampoing.be | OG propre au site · politique FR alignée | `f4f81c1`, `7d5b583` |
| comparer-compte-epargne.be | OG propre au site · politique FR alignée | `86811e7`, `9ec3193` |
| besttennisshoes.be | favicon = balle du logo | `17a4263` |
| gestion-copropriete.be | aucune écriture (arbitrage humain toujours attendu) | 0 |

---

## ✅ OG anti-footprint (action n° 5 de l'audit) — 5 sites

Les 5 sites partageaient le même gabarit : barre en dégradé, ★ en filigrane, ligne « Comparateur · Quiz · Simulateur » alors que ces outils sont éteints. Chaque site a maintenant **sa propre composition**, en aplats, avec le mark de son logo et ses trois premières rubriques réelles à la place des outils désactivés.

| Site | Fichier rendu | Composition |
|---|---|---|
| hotel-bruges | `components/og/SiteOgImage.tsx` | texte à gauche sous un filet de laiton, clé du logo à droite dans un casier bordé |
| carte-bancaire | `components/og/SiteOgImage.tsx` | carte au trait, puce EMV en haut à gauche, tagline à la place du numéro |
| lave-linge | `components/og/SiteOgImage.tsx` | deux volets : pan plein à la couleur d'accent avec la façade, texte à droite |
| shampoing | `components/og/SiteOgImage.tsx` | manchette de presse : titre en capitales entre deux filets, tagline centrée |
| compte-epargne | `app/opengraph-image.tsx` | trois barres de croissance sur une ligne de base, tagline ramenée de 72 à 46 px (débordement) |

- **Câblage vérifié par lecture** : sur les 4 sites à `SiteOgImage`, `app/opengraph-image.tsx` et `app/en/opengraph-image.tsx` importent `ogAlt`, `renderSiteOgImage`, `OG_SIZE` : les trois exports sont conservés à l'identique (signature comprise). `categoriesL` vérifié présent dans `lib/niche-l10n.ts` des 4 repos. Import `tl` retiré (plus utilisé). Sur compte-epargne, le fichier de convention est édité directement ; `niche.categories[].label` vérifié (déjà consommé par `Footer.tsx`).
- Couleurs : uniquement `niche.palette`, aucun hex en dur. Texte alt : tiret cadratin remplacé par un deux-points.

## ✅ Politique de confidentialité FR alignée sur le bandeau — 5 sites

`app/(site)/confidentialite/page.tsx` (fichier identique sur les 5 repos, blob `fe39137`, lu sur chacun avant écriture). La page annonçait des « cookies analytiques » sans mentionner le consentement, alors que le bandeau est monté depuis le 2026-10-01.
- Mesure d'audience décrite comme chargée **uniquement après acceptation** ; mémorisation du choix en stockage local ; façon de revenir sur son choix.
- Forme juridique ajoutée (« SRL de droit belge ») ; droits complétés (limitation, retrait du consentement).
- `robots: { index: false, follow: false }` conservé. Aucun contenu retiré (fichier plus long qu'avant : 4247 → 5241 o).
- Lave-linge : l'outil a renvoyé « Connection closed » à l'écriture ; relecture faite, le nouveau contenu est bien en place.

## ✅ besttennisshoes.be — favicon

`app/icon.svg` : monogramme « B » Arial sur disque → balle de tennis (mêmes coutures que le mark de `Nav.tsx`/`Footer.tsx`) sur carré arrondi bleu `#1D3FB8`. 1:1.

---

## Reporté

- **gestion-copropriete.be — auteur Claude O. : arbitrage humain toujours requis.** L'audit demande une bio avec expérience ; la règle propre au site (`docs/CONTENT-SPEC.md` règle 3, `docs/AUTHOR-claude-o.md`) interdit d'inventer un parcours. À trancher : (a) fournir des éléments vrais, ou (b) lever la règle et basculer sur un persona du réseau (prénom « Claude » à revoir dans le même mouvement, avatar ensuite).
- **Auteur — localisation EN** (sites template) : bio/titre non traduits sur les pages auteur EN, `author.url` JSON-LD et liens `AuthorCard` non localisés, `longBio` = doublon de `bio`. Touche le type `NicheConfig.localized` et plusieurs consommateurs : à faire dans un run dédié, consommateurs énumérés.
- **meilleur-shampoing.be — favicon** « disque + lettre » : laissé (famille beauté, décision du 2026-09-17).
- **Résidus template non rendus** (`content/pages/mentions-legales.yaml`, `content/settings.yaml`, `public/icons/brand/logo.svg` de lave-linge) et fichiers morts de gestion-copropriete (`app/layout.tsx`, `niche.config.ts`) : suppression laissée à l'humain.
- **Hors domaine** : besttennisshoes expose une locale NL.

## À vérifier au déploiement (build non exécuté ici)

1. **OG des 5 sites** : ouvrir `/opengraph-image` et `/en/opengraph-image`. Points à regarder : la tagline tient sans déborder (tailles 46 à 66 px choisies sans connaître la longueur de chaque tagline sauf hotel-bruges), le mark SVG s'affiche (rendu Satori d'un `<path>` à plusieurs sous-tracés), contraste du mark lave-linge (`bgPrimary` sur `accent1`).
2. **besttennisshoes** : le jaune de la balle du favicon (`#D7F23A`) est choisi à l'œil, la valeur de `--ball` n'a pas été lue. À aligner si elle diffère.
3. Les points 1 à 6 du journal du 2026-10-01 (bandeau, marks, portrait) restent à confirmer s'ils ne l'ont pas été.

---

*Rien d'écrasé par du vide, aucun contenu réduit, aucune suppression de fichier, aucun export renommé. Aucun read-modify-write après écriture.*
