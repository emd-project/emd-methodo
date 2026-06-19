# Audit — PAGES CLÉS VIDES — sites EMD

**Date :** 2026-06-19
**Périmètre :** sites « Live » + « Configuré » de `pipeline/sites.csv` (8 sites)
**Mode :** lecture seule sur les sites
**Référence :** `references/pages-cles.md` (une page clé livrée = comparateur ≥ 5 items, quiz ≥ 3 questions→reco, tableaux non vides ; data-driven, jamais de code risqué)

---

## TL;DR

- **2 sites ont des pages clés VIDES (shell)** : `meilleur-suv.be` (**Live**) et `meilleure-voiture-familiale.be` (Configuré). Dans les deux cas : **comparateur vide** (`COMPARATEURS = {}`) **et** **/choisir vide** (`CHOISIR_CONTENT = {}`).
- **Point dur — architecture non data-driven** : sur 6 des 7 sites de l'ancien template, les données du comparateur et de /choisir vivent **en dur dans `lib/comparateur.ts` et `lib/choisir-content.ts`** (constantes TS), **pas** dans `content/data/comparateurs.json` / `choisir.json` comme le veut la référence. Le dossier `content/data/` est **absent partout** sur ces sites. Remplir/rafraîchir = **éditer du `.ts`** → **à coder / à signaler** (cf. garde-fous), pas un build « données » sûr.
- **1 seul site est réellement data-driven** : `meilleure-voiture-electrique` (nouveau template) — comparateur alimenté par `data/cars/*.json` (63 modèles). C'est la cible architecturale ; les autres ne l'ont pas encore adoptée.
- **Données « périssables » à rafraîchir** mais coincées en TS : `meilleur-fournisseur-energie-be` (prix énergie, notés « à réactualiser chaque mois ») et `meilleures-assurances-auto.be` (primes datées 04/06/2026).

---

## Détail par site

### 1. meilleure-voiture.be — Voiture / Live
- **Comparateur : REMPLI.** 3 comparateurs (`suv`, `citadines`, `electriques`), 5 modèles chacun, sourcés/datés (juin 2026).
- **/choisir : REMPLI.** `suv` + `electrique` (tldr, sections, tables, faq).
- **Quiz :** activé, 5 critères (`niche.config.ts` → `quiz.criteria`).
- **Simulateur :** désactivé (`simulator.enabled = false`) — pas de page attendue.
- **Format des données :** `lib/comparateur.ts` (`COMPARATEURS`) + `lib/choisir-content.ts` (`CHOISIR_CONTENT`) — **constantes TS, pas de JSON**.
- **Data-driven : NON.** Pas de `content/data/*.json`. → refresh = édition `.ts`.

### 2. meilleur-suv.be — Voiture / Live ⚠️
- **Comparateur : VIDE (shell).** `lib/comparateur.ts` → `export const COMPARATEURS = {}` (placeholder d'init non rempli). 0 produit.
- **/choisir : VIDE.** `lib/choisir-content.ts` → `CHOISIR_CONTENT = {}`.
- **Quiz :** activé, 5 critères en config — mais aucune donnée comparateur pour alimenter une reco cohérente.
- **Simulateur :** activé (« Coût total de possession ») — page vraisemblablement shell (données comparateur absentes).
- **Format attendu :** `lib/comparateur.ts` / `lib/choisir-content.ts` (TS). `content/data/` absent.
- **Data-driven : NON.** → **à coder / à signaler.**
- **Criticité : HAUTE** — site Live avec comparateur et /choisir vides.

### 3. meilleure-voiture-electrique — Voiture / Live
- **Comparateur : REMPLI et DATA-DRIVEN.** `app/[locale]/(site)/comparateur/page.tsx` lit `data/cars/*.json` (**63 modèles**, tri par prix) → `ComparateurSideBySide`.
- **Pages clés présentes :** `comparateur`, `classements`, `modeles`, `simulateurs` (TCO), `blog`.
- **Format des données :** `data/cars/<slug>.json` (schéma `TCar`, ex. `prixDepuis`), `data/primes-be.json` (primes régionales BE, simulateur), `data/vehicules.json`.
- **Data-driven : OUI** (template nouvelle génération).
- **À signaler (non bloquant) :**
  - Repo sur branche par défaut `claude/no-image-spec-generator-nTjFC` (**pas `main`**) — à vérifier/merger.
  - `data/vehicules.json` ne contient que **3 véhicules** avec un schéma différent (`prix_be` vs `prixDepuis`) — fichier legacy/secondaire potentiellement orphelin ; le comparateur, lui, consomme bien `data/cars/` (63).

### 4. quel-operateur-choisir.be — Télécom / Live
- **Comparateur : REMPLI.** 4 familles (`mobile`, `internet`, `tv`, `packs`), 4–6 offres chacune, opérateurs BE réels, tarifs juin 2026.
- **Tableaux de prix :** présents et sourcés (Test-Achats, Selectra, CallMePower).
- **Format des données :** `lib/comparateur.ts` (`COMPARATEURS`, TS).
- **Data-driven : NON.** → refresh = édition `.ts`.

### 5. meilleur-fournisseur-energie-be — Énergie / Live
- **Comparateur : REMPLI (riche).** `electricite` (11 fournisseurs), `gaz` (7), `gaz-vert` (4), sourcés (CREG, CallMePower, Selectra), datés juin 2026, avec notes de marché.
- **Tableaux de prix :** présents, profils de référence définis (3 500 kWh élec / 17 000 kWh gaz).
- **Format des données :** `lib/comparateur.ts` (`COMPARATEURS`, TS).
- **Data-driven : NON.** ⚠️ Le fichier indique lui-même « prix à réactualiser chaque mois » — or le refresh suppose d'**éditer du `.ts`** → **à coder / à signaler** pour le refresh mensuel énergie.

### 6. meilleures-assurances-auto.be — Assurance / Live
- **Comparateur : REMPLI.** 5 comparateurs (`comparatifs` RC, `guides` full-omnium, `simulateurs` mini-omnium, `jeunes-conducteurs`, `types-assurance`), primes réelles sourcées CallMePower/Selectra, datées 04/06/2026.
- **Simulateur : CONFIGURÉ et FONCTIONNEL.** `app/(site)/simulateur/page.tsx` → composant interactif `HomeEstimator` (piloté par `niche.config.simulator`). Non vide.
- **Quiz :** activé, 6 critères.
- **Format des données :** `lib/comparateur.ts` (TS) ; simulateur = config `niche.config.ts` + composant.
- **Data-driven : NON** (comparateur en TS). Simulateur = logique de composant (par design).
- ⚠️ Primes datées (04/06/2026) → refresh périodique nécessaire, coincé en `.ts`.

### 7. meilleure-carte-credit.be — Banque / Live
- **Comparateur : REMPLI et BILINGUE.** FR + EN, 2 familles (`banques-tradi` 6 cartes, `neobanques` 6 cartes).
- **Format des données :** `lib/comparateur.ts` (`COMPARATEURS_FR` / `COMPARATEURS_EN`, TS).
- **Data-driven : NON.** → refresh = édition `.ts`.
- **À signaler :** branche par défaut `claude/setup-nextjs-apple-guide-En4gb` (**pas `main`**) — à vérifier/merger.

### 8. meilleure-voiture-familiale.be — Voiture / Configuré ⚠️
- **Comparateur : VIDE (shell).** `COMPARATEURS = {}`.
- **/choisir : VIDE.** `CHOISIR_CONTENT = {}`.
- **Quiz :** activé, 5 critères en config (mais pas de données comparateur).
- **Simulateur :** activé (« Coût total de possession »).
- **Format attendu :** `lib/comparateur.ts` / `lib/choisir-content.ts` (TS). `content/data/` absent.
- **Data-driven : NON.** → **à coder / à signaler.**
- **Criticité : MOYENNE** — statut « Configuré » (livraison non finalisée, vide attendu).

---

## Synthèse

### Sites avec pages clés vides
| Site | Statut | Pages vides | Criticité |
|---|---|---|---|
| **meilleur-suv.be** | Live | comparateur (`{}`) + /choisir (`{}`) | **HAUTE** (site Live) |
| **meilleure-voiture-familiale.be** | Configuré | comparateur (`{}`) + /choisir (`{}`) | Moyenne (config en cours) |

### Pages clés « à coder » (composant NON data-driven)
La quasi-totalité du parc (ancien template) n'est **pas** data-driven au sens de la référence : les données vivent dans `lib/comparateur.ts` / `lib/choisir-content.ts` (constantes TS), `content/data/comparateurs.json`/`choisir.json` **n'existent nulle part**. Remplir ou rafraîchir = **éditer du `.ts`** → traiter à part (garde-fous), pas un build « données » sûr :

- `meilleure-voiture.be`, `meilleur-suv.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie-be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be`, `meilleure-voiture-familiale.be` → **comparateur/choisir en TS (non data-driven)**.
- **Seul `meilleure-voiture-electrique`** est conforme à la cible data-driven (`data/cars/*.json`).

### Données périssables coincées en TS (refresh « à coder »)
- `meilleur-fournisseur-energie-be` — prix énergie, « à réactualiser chaque mois ».
- `meilleures-assurances-auto.be` — primes datées (04/06/2026).

### Anomalies repo (hors périmètre « pages vides », à vérifier)
- `meilleure-voiture-electrique` : branche défaut ≠ `main` ; `data/vehicules.json` (3 items, schéma divergent) potentiellement orphelin.
- `meilleure-carte-credit.be` : branche défaut ≠ `main`.

---

## Actions recommandées
1. **Prioritaire (Live vide) :** remplir le comparateur + /choisir de `meilleur-suv.be`. Données auto réelles BE disponibles (cf. `meilleure-voiture.be`). **À coder** car cible = `lib/comparateur.ts` (TS) → passer par le canal « build risqué / à signaler ».
2. **Configuré :** finaliser `meilleure-voiture-familiale.be` (comparateur + /choisir).
3. **Décision d'architecture :** acter si l'on migre les anciens sites vers le modèle data-driven `data/*.json` (comme l'électrique) pour rendre les refresh (énergie, assurance) sûrs et automatisables — ou si l'on assume l'édition `.ts` au cas par cas.
4. Vérifier/merger les branches par défaut non-`main` (`meilleure-voiture-electrique`, `meilleure-carte-credit.be`).
