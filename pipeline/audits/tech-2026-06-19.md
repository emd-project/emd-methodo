# Audit TECHNIQUE & i18n — sites EMD

**Date :** 2026-06-19 · **Mode :** LECTURE SEULE · **Périmètre :** sites « Live » + « Configuré » de `pipeline/sites.csv`
**Domaines audités uniquement :** SEO technique · Multilingue réel (`references/i18n-multilingue.md`) · Santé
**Doctrine :** `skills/emd-audit/SKILL.md` v1.5.0 + `references/i18n-multilingue.md`

> Santé : les URLs de prod ne sont pas *fetchables* depuis l'environnement de cette tâche planifiée → statut **« non vérifié »** (à confirmer au prochain run avec accès réseau).

---

## 1. Scorecard

| Site | Statut | Multilingue réel | SEO technique | Pseudo-multilingue ? | NL orphelin | Santé |
|---|---|:---:|:---:|:---:|:---:|:---:|
| meilleure-voiture.be | Live | ❌ | ❌ | ⚠️ faux bilingue (mono-locale) | — | non vérifié |
| meilleur-suv.be | Live | ✅ | ✅ | non | ⚠️ `content/blog/nl` | non vérifié |
| meilleure-voiture-electrique.be | Live | ✅ (réf.) | ✅ | non | — | non vérifié |
| quel-operateur-choisir.be | Live | ✅ (réf.) | ✅ | non | — | non vérifié |
| meilleur-fournisseur-energie.be | Live | ⚠️ | ✅ | à vérifier (parité EN) | — | non vérifié |
| meilleures-assurances-auto.be | Live | ❌ | ⚠️ | ✅ EN shell sans contenu | — | non vérifié |
| meilleure-carte-credit.be | Live | ✅ (réf.) | ✅ | non | — | non vérifié |
| meilleure-voiture-familiale.be | Configuré | ✅ | ✅ | non | ⚠️ `content/blog/nl` | non vérifié |

Légende : ✅ conforme · ⚠️ à corriger (non bloquant) · ❌ bloquant. « (réf.) » = site de référence i18n cité par la doctrine.

**Synthèse :** 4 sites i18n conformes (suv, electrique, operateur, carte-credit, familiale), **2 sites en échec multilingue bloquant** (meilleure-voiture.be, meilleures-assurances-auto.be), **1 à confirmer** (energie), **2 orphelins NL à purger** (suv, familiale).

---

## 2. Détail par site (trié par sévérité)

### ❌ meilleure-voiture.be — faux bilingue + sitemap cassé (BLOQUANT)
- **Multilingue ❌** : **aucun arbre `app/en/`** (seul `app/(site)`). Toutes les routes `/en` renvoient 404. Le scaffolding i18n existe (`lib/i18n/alternates.ts`, `article-slugs.ts`, `server-locale.ts`) mais **n'est branché sur rien**.
- **`lib/i18n/article-slugs.ts`** ne contient **qu'une entrée résiduelle copiée d'un autre site** (`'meilleur-suv-belgique-2026' → 'best-suv-belgium-2026'`) — artefact de provisioning (anti-footprint), slug qui n'appartient pas à ce site.
- `lib/blog.ts` est locale-aware (`dirsFor(locale)`) **mais sans liste blanche `isFrCategory`** : si un dossier `content/blog/en` était déversé, il serait lu comme **fausse catégorie**. (Actuellement `content/blog` ne contient que des catégories FR réelles : citadines, electriques, hybrides, occasions, suv — donc pas de pollution *à ce jour*, mais le reader est fragile.)
- **SEO technique ❌** — `app/sitemap.ts` :
  1. Boucle sur `niche.locales` et **émet des URLs `/en/...` qui n'existent pas** (404) → mauvais signal SEO majeur.
  2. N'inclut **que les articles standalone** (`getAllStandaloneArticles`) + sections statiques : **les articles de blog (`content/blog/[cat]/*.mdx`) sont absents du sitemap**.
- Présents : `robots.ts`, `app/opengraph-image.tsx`. Manque `app/icon.svg` (favicon — hors périmètre tech, signalé pour l'audit identité).
- **Verdict :** listé « Live, fr,en » mais c'est un site **mono-locale**. Soit provisionner l'i18n réel (pattern référence), soit retirer EN du sitemap + requalifier le statut.

### ❌ meilleures-assurances-auto.be — EN shell sans contenu (pseudo-multilingue)
- **Arbre `app/en/` complet présent** (blog, comparer, auteurs, simulateur, quiz, deals, légal)…
- …**mais `lib/blog.ts` est la version mono-locale ancienne** : **aucun lecteur miroir `…En()`**, aucun `RESERVED_LOCALE_DIRS`, signatures sans paramètre `locale`.
- `content/blog/en` **vide/introuvable** → les pages `/en/blog` n'ont **aucun contenu anglais** (rendu vide ou contenu FR). **Critères i18n #2 (lecteurs `…En()`) et #7 (parité) non satisfaits.**
- `lib/blog.ts` lit tous les sous-dossiers de `content/blog` comme catégories **sans exclusion de locale** : actuellement sûr (pas de `en`/`nl`), mais régressera dès qu'un dossier de locale y sera déversé.
- **SEO technique ⚠️** : `robots.ts`, `opengraph-image.tsx`, `icon.svg`, `apple-icon.svg` OK ; sitemap présent mais la branche EN n'a aucun article à émettre.
- **Verdict :** routes EN « coquilles » sans contenu ni lecteurs → **pseudo-multilingue**. Porter les lecteurs `…En()` + créer `content/blog/en` (pattern operateur), ou désactiver `app/en` tant que pas prêt.

### ⚠️ meilleur-suv.be — i18n conforme, orphelin NL à purger
- **Multilingue ✅** : `app/en/` complet, `lib/blog.ts` locale-aware avec `RESERVED_LOCALE_DIRS` (exclut `en` **et** `nl` des catégories FR), `lib/i18n/article-slugs.ts` (mapping FR↔EN), `app/sitemap.ts` exemplaire (hreflang réciproque par article, EN conditionné à l'existence de contenu, catégories EN).
- **Orphelin NL ⚠️** : `content/blog/nl` présent dans le repo (doctrine : **« jamais de NL »**). Correctement exclu des catégories par le reader, mais c'est du contenu mort à supprimer.
- **SEO technique ✅** : sitemap avec `alternates.languages`, `robots.ts`, `opengraph-image.tsx`, `app/icon.svg`.
- **Verdict :** conforme. Action unique : purger `content/blog/nl`.

### ⚠️ meilleure-voiture-familiale.be (Configuré) — i18n réel, NL à purger
- **Multilingue ✅** : routing `/en` via `app/(en)/en/...` (groupe de routes `(en)` + segment `en` → résout bien `/en`, avec layout EN dédié). `lib/blog.ts` avec `LOCALE_BLOG_DIRS = {en, nl}` exclus des catégories + lecteurs miroir `getAllEnArticles()/getEnArticleRaw()`. `app/sitemap.ts` avec hreflang réciproque (`fr-BE`/`en-BE`/`x-default`) + articles EN.
- **Orphelin NL ⚠️** : `content/blog/nl` présent → **violation « jamais de NL »**, à purger.
- **Parité ⚠️ (mineur)** : l'arbre `app/(en)/en` couvre blog, comparer, auteurs, quiz, deals, légal mais **pas** `choisir` / `simulateur` / `a-propos` (présents côté FR). À compléter ou à assumer.
- **SEO technique ✅**, identité `app/icon.svg` présente.
- **Verdict :** vrai site multilingue. Actions : purger NL, compléter la parité de sections.

### ⚠️ meilleur-fournisseur-energie.be — structure EN soignée, parité contenu à confirmer
- **Multilingue ⚠️** : `app/en/` complet avec **segments de route traduits en anglais** (`choose`, `compare`, `guides`, `legal-notice`, `simulator`) — localisation la plus poussée du réseau. `app/icon.svg`, `opengraph-image.tsx`, `overrides.css` présents.
- **Contenu / parité à vérifier** : `content/blog` est **vide** (`.gitkeep` seul) ; les 21 articles vivent en **standalone FR** dans `content/articles/`. Aucun article EN identifié → la parité FR↔EN n'est pas démontrée (pages EN statiques probablement traduites, mais blog/guides EN sans contenu).
- **Propreté ⚠️** : `content/articles/_example.mdx` (gabarit) à supprimer ; doublon apparent `fournisseur-gaz-electricite-moins-cher-belgique.mdx` vs `2026-06-02-fournisseur-gaz-electricite-moins-cher-belgique.mdx` (slug en double — risque de cannibalisation, à confirmer côté contenu).
- **SEO technique ✅** : `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.svg`.
- **Verdict :** ossature i18n OK ; établir/confirmer la parité de contenu EN.

### ✅ Sites de référence (conformes)
- **quel-operateur-choisir.be** — canonique : `app/en/` complet, `lib/i18n/`, `lib/comparateur-en.ts` (lecteur miroir), `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg`. ✅
- **meilleure-voiture-electrique.be** — pattern dynamique `app/[locale]/` : `opengraph-image.tsx` dans `[locale]`, `icon.svg`, `robots.ts`, `sitemap.ts`. ✅
- **meilleure-carte-credit.be** — pattern dynamique `app/[lang]/` : `opengraph-image.tsx` racine, `favicon.ico` + `icon.svg`, `robots.ts`, `sitemap.ts`. ✅

---

## 3. Synthèse i18n / pseudo-multilingue

**Pseudo-multilingue / faux bilingue :**
- **meilleure-voiture.be** — mono-locale : aucun `app/en`, sitemap qui annonce des `/en` morts. (Pas le motif « fausses catégories », mais bilingue annoncé non livré.)
- **meilleures-assurances-auto.be** — `app/en` présent mais **sans lecteurs `…En()` ni contenu EN** → coquilles vides.

**Motif « EN/NL déversés en fausses catégories » :** **aucun site** ne l'exhibe actuellement — les deux sites portant des dossiers `en/`+`nl/` (suv, familiale) les excluent correctement via liste blanche. Reader fragile (sans liste blanche) repéré sur **meilleure-voiture.be** et **meilleures-assurances-auto.be** : risque si une locale y est déversée.

**Orphelins NL (doctrine « jamais de NL ») :** `content/blog/nl` sur **meilleur-suv.be** et **meilleure-voiture-familiale.be** → à supprimer.

**hreflang / sitemap :** réciprocité FR↔EN + `x-default` correctement implémentés sur suv et familiale ; sitemap **défectueux** sur meilleure-voiture.be (URLs EN mortes + articles blog absents).

---

## 4. Top 5 actions prioritaires

1. **meilleure-voiture.be — sitemap (BLOQUANT)** : retirer la boucle `/en` (routes inexistantes → 404) **ET** ajouter les articles de blog au sitemap. À défaut de provisionner l'EN, requalifier le statut « Live fr » (pas « fr,en »).
2. **meilleures-assurances-auto.be — EN shell (BLOQUANT)** : porter les lecteurs miroir `…En()` dans `lib/blog.ts` + créer `content/blog/en` (pattern operateur), sinon désactiver `app/en` tant que le contenu n'existe pas. Établir la parité FR↔EN.
3. **meilleure-voiture.be — i18n réel** : provisionner l'arbre `app/en` complet (référence operateur) **ou** assumer mono-locale ; nettoyer l'entrée parasite copiée dans `lib/i18n/article-slugs.ts`.
4. **meilleur-suv.be + meilleure-voiture-familiale.be — purge NL** : supprimer `content/blog/nl` (doctrine « jamais de NL »).
5. **meilleur-fournisseur-energie.be — parité EN + propreté** : confirmer/produire le contenu EN du blog ; supprimer `content/articles/_example.mdx` et lever le doublon de slug `fournisseur-gaz-electricite-moins-cher-belgique`.

---

## 5. Note de méthode / limites
- Audit **statique** des repos `emd-project/*` (rendu réel : `app/`, `lib/blog.ts`, `lib/i18n/`, `app/sitemap.ts`, `content/`).
- **Santé HTTP non vérifiée** (URLs de prod non *fetchables* depuis cette tâche planifiée) → à relancer avec accès réseau.
- Canonical / `noindex` accidentel / liens morts / JSON-LD : non lus page par page faute de rendu HTTP ; jugés au niveau structure (metadata/layout). À approfondir au prochain run avec fetch prod.
- Sites « À faire » de `sites.csv` exclus du périmètre.
