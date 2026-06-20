# Audit — PAGES CLÉS VIDES — sites EMD

**Date :** 2026-06-20
**Périmètre :** sites « Live » + « Configuré » de `pipeline/sites.csv` (**9 sites**)
**Mode :** lecture seule sur les sites
**Référence :** `references/pages-cles.md` (une page clé livrée = comparateur ≥ 5 items, quiz ≥ 3 questions→reco, tableaux non vides ; data-driven, jamais de code risqué)

---

## TL;DR

- **2 sites ont des pages clés VIDES (shell)** : `meilleure-voiture-utilitaire.be` (**Configuré**, nouveau au périmètre) et `meilleure-voiture-familiale.be` (Configuré). Dans les deux cas : **comparateur vide ET /choisir vide**.
- **Bonne nouvelle vs 2026-06-19 :** `meilleur-suv.be` (Live) — hier vide (`COMPARATEURS = {}`) — est **désormais REMPLI** ET **migré en data-driven** (`content/data/comparateurs.json` + `choisir.json`, 6 items × 3 comparateurs). ✅ Régression corrigée.
- **La distinction qui conditionne le build :**
  - `meilleure-voiture-utilitaire.be` est **data-driven** (`content/data/comparateurs.json` & `choisir.json` présents mais = `{}`) → **build SÛR** : il suffit de remplir les JSON selon le schéma de la référence.
  - `meilleure-voiture-familiale.be` est **NON data-driven** (placeholder en dur dans `lib/comparateur.ts` / `lib/choisir-content.ts`, pas de `content/data/`) → **À CODER / à signaler** (cf. garde-fous), pas un build « données » sûr.
- **Point dur — architecture non data-driven** : 5 des 7 sites Live ont toujours leurs données comparateur/choisir **en dur dans `lib/*.ts`** (constantes TS), pas dans `content/data/*.json`. Remplir/rafraîchir = **éditer du `.ts`** → à coder.
- **2 sites sont la cible data-driven** : `meilleur-suv.be` (`content/data/*.json`) et `meilleure-voiture-electrique` (`data/cars/*.json`, 63 modèles).
- **Données « périssables » coincées en TS (refresh à coder)** : `meilleur-fournisseur-energie-be` (prix énergie, « à réactualiser chaque mois ») et `meilleures-assurances-auto.be` (primes datées 04/06/2026).

---

## Détail par site

### 1. meilleure-voiture.be — Voiture / Live
- **Comparateur : REMPLI.** 3 comparateurs (`suv`, `citadines`, `electriques`), 5 modèles chacun, sourcés/datés (juin 2026).
- **/choisir : REMPLI.** `suv` + `electrique` (tldr, sections, tables, faq). _NB : 3 slugs comparateur mais /choisir n'en couvre que 2 (`citadines` sans page) — mineur._
- **Quiz :** activé, 5 critères. **Simulateur :** désactivé.
- **Format des données :** `lib/comparateur.ts` + `lib/choisir-content.ts` — **constantes TS**.
- **Data-driven : NON.** Pas de `content/data/*.json`.

### 2. meilleur-suv.be — Voiture / Live ✅ (corrigé depuis 2026-06-19)
- **Comparateur : REMPLI et DATA-DRIVEN.** `content/data/comparateurs.json` → `familial`, `electrique`, `hybride`, **6 modèles chacun**, marques BE réelles, datés juin 2026.
- **/choisir : REMPLI et DATA-DRIVEN.** `content/data/choisir.json` → `familial`, `electrique`, `hybride`.
- **Quiz :** activé, 5 critères. **Simulateur :** désactivé.
- **Format des données :** `content/data/comparateurs.json` & `content/data/choisir.json`.
- **Data-driven : OUI.** Conforme à la référence.

### 3. meilleure-voiture-familiale.be — Voiture / Configuré ⚠️
- **Comparateur : VIDE (shell).** `lib/comparateur.ts` → `COMPARATEURS = {}` (placeholder d'init). 0 produit.
- **/choisir : VIDE.** `lib/choisir-content.ts` → `CHOISIR_CONTENT = {}`.
- **Quiz :** activé, 5 critères. **Simulateur :** activé (TCO « Coût total de possession »).
- **Format attendu :** `lib/comparateur.ts` / `lib/choisir-content.ts` (TS). **`content/data/` absent.**
- **Data-driven : NON.** → **à coder / à signaler**.
- **Criticité : MOYENNE** (Configuré) ; à traiter à part car non data-driven.

### 4. meilleure-voiture-utilitaire.be — Voiture / Configuré ⚠️ (nouveau au périmètre)
- **Comparateur : VIDE (shell).** `content/data/comparateurs.json` = `{}`. 0 produit.
- **/choisir : VIDE.** `content/data/choisir.json` = `{}`.
- **Quiz :** activé, 5 critères. **Simulateur :** activé (TCO).
- **Format attendu :** `content/data/comparateurs.json` & `content/data/choisir.json` (fichiers présents).
- **Data-driven : OUI.** → **build SÛR** : remplir les JSON (fourgonnettes, fourgons moyens, grands fourgons, pick-up, électriques).
- **Criticité : MOYENNE** (Configuré) ; remplissage sans risque code.

### 5. meilleure-voiture-electrique — Voiture / Live
- **Comparateur : REMPLI et DATA-DRIVEN.** `comparateur/page.tsx` (+ `[slug]`) lit `data/cars/*.json` (**63 modèles**).
- **Pages clés présentes :** `comparateur`, `classements`, `modeles`, `simulateurs` (`recharge`, `tco`, `trajet`), `blog`.
- **Format des données :** `data/cars/<slug>.json` (63), `data/primes-be.json` (rempli).
- **Data-driven : OUI** (template nouvelle génération).
- **Pas de page `quiz`** : architecture divergente (remplacée par `classements`/`comparateur`/`simulateurs`) — absence par design, pas un shell vide.
- **À signaler :** branche défaut `claude/no-image-spec-generator-nTjFC` (≠ `main`) ; `data/vehicules.json` (3 items, schéma divergent) potentiellement orphelin.

### 6. quel-operateur-choisir.be — Télécom / Live
- **Comparateur : REMPLI.** `mobile` (6), `internet` (6), `tv` (**4**), `packs` (**4**), opérateurs BE réels, juin 2026.
- **Tableaux de prix :** présents et sourcés. **Quiz :** activé, 4 critères. **Simulateur :** activé.
- **Format des données :** `lib/comparateur.ts` (TS).
- **Data-driven : NON.** _Mineur : `tv`/`packs` < 5 items._

### 7. meilleur-fournisseur-energie-be — Énergie / Live
- **Comparateur : REMPLI (riche).** `electricite` (11), `gaz` (7), `gaz-vert` (**4**), sourcés (CREG, CallMePower, Selectra), juin 2026.
- **Tableaux de prix :** présents (profils 3 500 kWh / 17 000 kWh). **Quiz :** activé, 3 critères. **Simulateur :** activé.
- **Format des données :** `lib/comparateur.ts` (TS).
- **Data-driven : NON.** ⚠️ « prix à réactualiser chaque mois » → refresh = édition `.ts` → **à coder**. _Mineur : `gaz-vert` < 5._

### 8. meilleures-assurances-auto.be — Assurance / Live
- **Comparateur : REMPLI.** `comparatifs` (RC, 6), `guides` (full-omnium, **3**), `simulateurs` (mini-omnium, 6), `jeunes-conducteurs` (**3**), `types-assurance` (**3**), primes sourcées CallMePower/Selectra, 04/06/2026.
- **Simulateur :** activé (« Calculez votre prime ») ; CTA comparateur → `/simulateur`. Confirmé fonctionnel au 2026-06-19 (`HomeEstimator`).
- **Quiz :** activé, 6 critères.
- **Format des données :** `lib/comparateur.ts` (TS) ; simulateur = config + composant.
- **Data-driven : NON.** ⚠️ Primes datées → refresh à coder. _Mineur : 3 comparatifs < 5 items._

### 9. meilleure-carte-credit.be — Banque / Live
- **Comparateur : REMPLI et BILINGUE.** FR + EN, `banques-tradi` (6), `neobanques` (6).
- **Quiz :** activé, 4 critères. **Simulateur :** activé (cashback annuel).
- **Format des données :** `lib/comparateur.ts` (`COMPARATEURS_FR`/`COMPARATEURS_EN`, TS).
- **Data-driven : NON.** **À signaler :** branche défaut `claude/setup-nextjs-apple-guide-En4gb` (≠ `main`).

---

## Synthèse

### Sites avec pages clés vides
| Site | Statut | Pages vides | Data-driven | Traitement |
|---|---|---|---|---|
| **meilleure-voiture-utilitaire.be** | Configuré | comparateur (`{}`) + /choisir (`{}`) | **OUI** (`content/data/*.json`) | **Build SÛR** — remplir les JSON |
| **meilleure-voiture-familiale.be** | Configuré | comparateur (`{}`) + /choisir (`{}`) | **NON** (`lib/*.ts` placeholder) | **À CODER** — signaler (garde-fous) |

### Pages clés « à coder » (composant NON data-driven)
Données dans `lib/comparateur.ts` / `lib/choisir-content.ts` (TS), `content/data/*.json` absent → remplir/rafraîchir = éditer du `.ts` → traiter à part (garde-fous) :
- **NON data-driven :** `meilleure-voiture.be`, `meilleure-voiture-familiale.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie-be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be`.
- **Data-driven (cible) :** `meilleur-suv.be` (`content/data/*.json`), `meilleure-voiture-electrique` (`data/cars/*.json`).

### Données périssables coincées en TS (refresh « à coder »)
- `meilleur-fournisseur-energie-be` — prix énergie, « à réactualiser chaque mois ».
- `meilleures-assurances-auto.be` — primes datées (04/06/2026).

### Comparateurs sous le seuil (< 5 items, à compléter — mineur)
- `quel-operateur-choisir.be` : `tv` (4), `packs` (4).
- `meilleur-fournisseur-energie-be` : `gaz-vert` (4).
- `meilleures-assurances-auto.be` : `guides` (3), `jeunes-conducteurs` (3), `types-assurance` (3).

### Anomalies repo (à vérifier)
- `meilleure-voiture-electrique` : branche défaut ≠ `main` ; `data/vehicules.json` (3 items) potentiellement orphelin.
- `meilleure-carte-credit.be` : branche défaut ≠ `main`.

---

## Actions recommandées
1. **Prioritaire (build sûr) :** remplir `meilleure-voiture-utilitaire.be` (`content/data/comparateurs.json` + `choisir.json`) — data-driven, aucun risque code.
2. **À coder / signaler :** `meilleure-voiture-familiale.be` — vides mais en `lib/*.ts`. Migrer vers `content/data/*.json` (recommandé) puis remplir, ou canal « build risqué ».
3. **Décision d'architecture :** migrer les anciens sites vers `content/data/*.json` (déjà fait sur `meilleur-suv.be`) pour des refresh sûrs/automatisables, ou assumer l'édition `.ts` au cas par cas.
4. **Complétude :** porter à ≥ 5 items les sous-comparateurs sous le seuil.
5. Vérifier/merger les branches par défaut non-`main` (`meilleure-voiture-electrique`, `meilleure-carte-credit.be`).
