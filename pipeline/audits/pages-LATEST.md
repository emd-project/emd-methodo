# Audit — PAGES CLÉS VIDES (sites EMD)

**Date :** 2026-06-27
**Référence :** `references/pages-cles.md` (emd-project/emd-methodo)
**Mode :** LECTURE SEULE (aucune écriture sur les sites)
**Périmètre :** sites « Live » + « Configuré » de `pipeline/sites.csv` → **11 sites**

> Une page clé livrée doit être **remplie** : comparateur ≥ 5 items, quiz ≥ 3 questions menant à des recos, tableaux non vides, **classement ≥ 5 items + sections ≥ 1000 mots**. Un shell vide = à construire, jamais laissé tel quel.

---

## ⚠️ Constat transversal d'architecture (important)

La méthodo attend des composants **data-driven** consommant `content/data/*.json` (`comparateurs.json`, `classements.json`, `choisir.json`) + quiz via `niche.config.ts`. **La réalité diverge fortement selon les sites** :

- **Sites « JSON » (conformes méthodo)** : `meilleur-suv.be`, `meilleure-voiture-utilitaire.be`, `meilleure-voiture-7-places.be`, `meilleure-neobanque.be`. Ici remplir = éditer un JSON → **safe**.
- **Sites « TS hardcodé »** (`content/data/` absent, données dans `lib/*.ts`) : `meilleure-voiture.be`, `meilleure-voiture-familiale.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be`. Remplir = **éditer du TypeScript** → à traiter comme « à coder », pas comme un simple fill JSON.
- **Site architecture custom** : `meilleure-voiture-electrique.be` (pas de `niche.config.ts`, données par voiture dans `data/cars/*.json`, classements/quiz hors méthodo).
- **`/deals` et `/simulateur`** : sur quasi tous les sites, les données sont des **arrays inline dans `page.tsx`** (`DEALS = []`, `CYCLES = []`) → **non data-driven → à coder**.
- **Quiz** : sur plusieurs sites les questions viennent d'un YAML/config mais la **logique de reco (`recommend()` dans `QuizEngine.tsx`) est un placeholder hardcodé** (« Modèle placeholder ») → reco **à coder**.
- **Classements (GEO asset #1)** : **totalement absent** sur 4 sites (utilitaire, opérateur, énergie, assurances-auto, carte-crédit) ; présent mais **hardcodé en TS (pas JSON)** sur voiture / suv / familiale / electrique.

---

## Détail par site

### 1. meilleure-voiture.be — Voiture (Live)
`emd-project/meilleure-voiture.be` @ `main` · **`content/data/` ABSENT** (données en TS)

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED (partiel) | 3 slugs × 5 items ; manquent `hybrides`, `occasions` | `lib/comparateur.ts` (TS) | Non (TS hardcodé) |
| Quiz principal `/quiz` | FILLED | 4 questions | `content/pages/quiz.yaml` | Oui (YAML) |
| Quiz embarqué `/choisir` | **SHELL** | steps « Catégorie A/B/C », reco « À définir » | inline `choisir/[produit]/page.tsx` | Non |
| Classements | FILLED | 5 classements × 7-8, long-form FR/EN | `lib/classements.ts` (TS) | Non (TS hardcodé) |
| /choisir éditorial | **SHELL partiel** | `suv` + `electriques` OK ; `citadines` **absent** | `lib/choisir-content.ts` | Non |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` → « Aucune promotion » | inline `deals/page.tsx` | Non |
| Simulateur | **EMPTY** | `CYCLES = []`, `enabled:false` | inline `simulateur/page.tsx` | Non |

**Vides :** `/deals`, `/simulateur`, quiz embarqué `/choisir`, éditorial `citadines`, comparateurs `hybrides`/`occasions`.
**À coder (non data-driven) :** comparateur, classements, choisir, deals, simulateur, quiz embarqué (tout est TS/inline).

### 2. meilleur-suv.be — Voiture (Live)
`emd-project/meilleur-suv.be` @ `main`

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 3 slugs × 6 | `content/data/comparateurs.json` | **Oui** |
| Quiz | **SHELL** | `quiz.yaml` placeholder + `recommend()` placeholder « Modèle placeholder » | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Questions oui / reco non |
| Classements | FILLED | 4 slugs × 8, long-form FR/EN | `lib/classements.ts` (TS, **pas de JSON**) | Non (TS) |
| /choisir | FILLED | 3 produits | `content/data/choisir.json` | **Oui** |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` | inline `deals/page.tsx` | Non |
| Simulateur | N/A | `enabled:false`, `CYCLES = []` | inline | Non |

**Vides :** Quiz (questions + reco), `/deals`.
**À coder :** moteur de reco quiz (`QuizEngine.recommend()`), deals. Classements rempli mais en TS (à signaler : devrait être `classements.json`).

### 3. meilleure-voiture-familiale.be — Voiture (Live)
`emd-project/meilleure-voiture-familiale.be` @ `main` · **`content/data/` ABSENT**

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | **EMPTY** | `COMPARATEURS = {}` → « Aucune famille configurée » | `lib/comparateur.ts` | Câblé mais vide |
| Quiz | **SHELL** | `quiz.yaml` placeholder + `recommend()` placeholder | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Questions oui / reco non |
| Classements | FILLED | 4 slugs × 8, long-form FR/EN | `lib/classements.ts` (TS) | Non (TS) |
| /choisir | **EMPTY** | `CHOISIR_CONTENT = {}` | `lib/choisir-content.ts` | Câblé mais vide |
| Simulateur | **EMPTY** | `CYCLES = []`, `enabled:true` | inline `simulateur/page.tsx` | Non |
| Tableaux prix | placeholder | `content/pages/deals.yaml` placeholder | — | — |

**Vides :** comparateur, choisir, quiz, simulateur, deals.
**À coder :** simulateur (inline), moteur reco quiz.

### 4. meilleure-voiture-utilitaire.be — Voiture (Live)
`emd-project/meilleure-voiture-utilitaire.be` @ `main`

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 5 slugs, tous ≥ 5 | `content/data/comparateurs.json` | **Oui** |
| /choisir | FILLED | 5 slugs (sections ~250-350 mots, un peu courtes) | `content/data/choisir.json` | **Oui** |
| Quiz | **SHELL** | 4 questions OK mais `recommend()` placeholder | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Questions oui / reco non |
| Classements | **ABSENT** | aucun data/lib/route | — | N/A |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` | inline `deals/page.tsx` | Non |
| Simulateur | **EMPTY** | `CYCLES = []` ; mismatch TCO vs « cycles de prix » | inline | Non |

**Vides :** classements (absent), `/deals`, `/simulateur`, reco quiz.
**À coder :** classements (from scratch), deals, simulateur, moteur reco quiz.

### 5. meilleure-voiture-7-places.be — Voiture (Live)
`emd-project/meilleure-voiture-7-places.be` @ `main`

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 6 slugs × 10 | `content/data/comparateurs.json` (+`.en`) | **Oui** |
| Classements | FILLED | 6 slugs × 10, long-form | `content/data/classements.json` (+`.en`) | **Oui** |
| /choisir | **EMPTY** | `choisir.json = {}` ; `.en.json` absent | `content/data/choisir.json` | Câblé mais vide |
| Quiz | **SHELL** | `quiz.yaml` placeholder + `recommend()` placeholder | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Reco non |
| Tableaux prix `/deals` | **EMPTY** | `deals.yaml` placeholder, pas de table | `content/pages/deals.yaml` | — |
| Simulateur | N/A | `enabled:false`, `CYCLES = []` | inline | Non |

**Vides :** /choisir, quiz, /deals.
**À coder :** moteur reco quiz ; simulateur (si activé).

### 6. meilleure-voiture-electrique.be — Voiture (Live) · **architecture custom**
`emd-project/meilleure-voiture-electrique` @ `claude/no-image-spec-generator-nTjFC`
> Pas de `niche.config.ts`, pas de `content/data/`. Données par voiture dans `data/cars/*.json`.

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 62 voitures (specs + reviews FR/EN) | `data/cars/*.json` | **Oui** |
| Classements | FILLED (contenu) | hub + 4 classements × 10, long-form | inline `CARS[]` dans `page.tsx` | **Non → à coder** |
| Quiz | **ABSENT** | aucune route/config | — | N/A |
| /choisir | **ABSENT** | aucune route | — | N/A |
| Tableaux prix / primes | FILLED | primes régionales + prix par voiture | `data/primes-be.json` + `data/cars/*.json` | **Oui** |
| Simulateur | FILLED | TCO + recharge + trajet (logique testée) | `lib/utils/calc*.ts` | **Oui** (logique) |

**Vides / absents :** quiz, /choisir.
**À coder :** classements (refactor data-driven depuis `data/cars/`).

### 7. quel-operateur-choisir.be — Télécom (Live)
`emd-project/quel-operateur-choisir.be` @ `main` · **`content/data/` ABSENT**

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 4 familles (mobile 6, internet 6, tv 4, packs 4) | `lib/comparateur.ts` (TS) | Non (TS) |
| Quiz | FILLED | 4 questions + reco règle-basée réelle | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Questions oui / reco hardcodée |
| Classements | **ABSENT** | aucun data/lib/route | — | N/A |
| /choisir | **EMPTY** | `CHOISIR_CONTENT = {}` | `lib/choisir-content.ts` | Câblé mais vide |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` | inline `deals/page.tsx` | Non |
| Simulateur | À confirmer | route existe (`enabled:true`), contenu non inspecté | `app/(site)/simulateur` | ? |

**Vides :** /choisir, /deals (+ simulateur à vérifier).
**À coder :** classements (from scratch).

### 8. meilleur-fournisseur-energie.be — Énergie (Live)
`emd-project/meilleur-fournisseur-energie-be` @ `main` · **`content/data/` ABSENT**

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 3 slugs (élec 11, gaz 7, gaz-vert 4) | `lib/comparateur.ts` (TS) | Non (TS) |
| Quiz | FILLED | 3 questions + reco sur COMPARATEURS | `QuizEngine.tsx` (questions hardcodées) | Reco data-driven / questions hardcodées |
| /choisir | FILLED | 3 produits | `lib/choisir-content.ts` (TS) | Non (TS) |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` → « Bientôt disponible » | inline `deals/page.tsx` | Non |
| Simulateur | **EMPTY** | `CYCLES = []` (placeholder template) | inline `simulateur/page.tsx` | Non |
| Classements | **ABSENT** | aucun data/lib/route | — | N/A |

> Prix datés « relevé juin 2026 » (sources CREG/Selectra) → refresh mensuel OK.

**Vides :** /deals, /simulateur, classements (absent).
**À coder :** deals (remplir + câbler), simulateur (code + data), classements (from scratch).

### 9. meilleures-assurances-auto.be — Assurance (Live)
`emd-project/meilleures-assurances-auto.be` @ `main` · **`content/data/` ABSENT**

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 6 slugs (3-6 items) | `lib/comparateur.ts` / `-en.ts` (TS) | Non (TS) |
| Quiz | FILLED | 5 questions + reco sourcée | `QuizEngine.tsx` (hardcodé) | Non (hardcodé) |
| Simulateur (KEY) | FILLED / fonctionnel | estimateur interactif FR/EN | `_components/HomeEstimator.tsx` | Non (logique hardcodée) |
| Classements | **ABSENT** | aucun data/lib/route | — | N/A |
| /choisir | **EMPTY** | `CHOISIR_CONTENT = {}` | `lib/choisir-content.ts` | Câblé mais vide |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` | inline `deals/page.tsx` | Non |

**Vides :** /choisir, /deals, classements (absent).
**À coder :** classements (from scratch) ; deals inline. (/choisir remplissable en data via `lib/choisir-content.ts`.)

### 10. meilleure-carte-credit.be — Banque (Live)
`emd-project/meilleure-carte-credit.be` @ `claude/setup-nextjs-apple-guide-En4gb` · **`content/data/` ABSENT**

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | FILLED | 2 slugs × 6 = 12 | `lib/comparateur.ts` (TS) | Non (TS) |
| Quiz | FILLED | 4 questions + reco sur 12 cartes | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Questions oui / reco dérivée |
| Classements | **ABSENT** | aucun data/lib/route | — | N/A |
| /choisir | FILLED | 2 produits (sections + tables + FAQ) | `lib/choisir-content.ts` (TS) | Non (TS) |
| Tableaux prix `/deals` | **EMPTY** | `DEALS = []` | inline `deals/page.tsx` | Non |
| Simulateur | FILLED / fonctionnel | réutilise cartes comparateur via adapter | `SimulatorEngine.tsx` | Oui (via adapter) |

**Vides :** /deals, classements (absent).
**À coder :** classements (from scratch), deals inline.

### 11. meilleure-neobanque.be — Banque (Configuré)
`emd-project/meilleure-neobanque.be` @ `main` · **`content/data/` EXISTE** — largement rempli pour un « Configuré »

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | **SHELL** | 2 slugs × **4 items (< 5)** | `content/data/comparateurs.json` (+`.en`) | **Oui** |
| Quiz | FILLED | 3 questions + reco 5 branches | `content/pages/quiz.yaml` + `QuizEngine.tsx` | Questions oui / reco hardcodée |
| Classements | FILLED | 1 slug × 5 (seed), FAQ/méthodo/sources, FR/EN | `content/data/classements.json` (+`.en`) | **Oui** |
| /choisir | FILLED (léger) | 2 slugs (comptes-pro = 1 section) | `content/data/choisir.json` | **Oui** |
| Tableaux prix `/deals` | FILLED | 4 offres + FAQ | inline `deals/page.tsx` | Non |
| Simulateur | FILLED | 4 profils | inline `simulateur/page.tsx` | Non |

**Vides / sous-seuil :** comparateur (4 < 5 par slug → ajouter ≥ 1 item/slug, ex. Aion, Vivid).
**À coder :** deals inline, simulateur inline, reco quiz (pour enrichissements futurs).

---

## Synthèse

### Sites avec pages clés vides / shell (10 / 11)
Seul **meilleure-voiture-electrique.be** n'a aucun shell parmi ses routes existantes (mais quiz & /choisir absents).

### Récap des trous par type de page

**Comparateur vide ou sous-seuil :**
- `meilleure-voiture-familiale.be` → **vide** (`COMPARATEURS = {}`)
- `meilleure-neobanque.be` → **4 < 5 items** par slug
- `meilleure-voiture.be` → 2 catégories manquantes (`hybrides`, `occasions`)

**Quiz shell (reco placeholder) :** `meilleur-suv.be`, `meilleure-voiture-familiale.be`, `meilleure-voiture-utilitaire.be`, `meilleure-voiture-7-places.be`, `meilleure-voiture.be` (quiz embarqué /choisir).

**/choisir éditorial vide :** `meilleure-voiture-familiale.be`, `meilleure-voiture-7-places.be`, `quel-operateur-choisir.be`, `meilleures-assurances-auto.be`, `meilleure-voiture.be` (citadines).

**Tableaux de prix `/deals` vides :** `meilleure-voiture.be`, `meilleur-suv.be`, `meilleure-voiture-familiale.be`, `meilleure-voiture-utilitaire.be`, `meilleure-voiture-7-places.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be` (**9 sites**).

**Simulateur vide / shell :** `meilleure-voiture.be`, `meilleure-voiture-familiale.be`, `meilleure-voiture-utilitaire.be`, `meilleur-fournisseur-energie.be` (vides) ; `quel-operateur-choisir.be` (à vérifier).

**Classements ABSENTS (GEO asset #1 manquant) :** `meilleure-voiture-utilitaire.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be` (**5 sites**).

### Pages « À CODER » (composant NON data-driven — à traiter à part, ne pas bricoler)

1. **`/deals` et `/simulateur` partout** : arrays inline dans `page.tsx` (non data-driven). Remplir = éditer du code, pas un JSON.
2. **Moteur de reco quiz** (`QuizEngine.recommend()` placeholder) : suv, familiale, utilitaire, 7-places, voiture (embarqué) → mapping réponse→reco à coder.
3. **Classements à construire from scratch** (route + lib + data) : utilitaire, opérateur, énergie, assurances-auto, carte-crédit.
4. **Classements en TS hardcodé** (existants mais hors méthodo `classements.json`) : voiture, suv, familiale (`lib/classements.ts`), electrique (inline page) → à signaler / refactorer vers data-driven.
5. **Sites « tout TS »** (comparateur/choisir dans `lib/*.ts`, pas de `content/data/`) : voiture, familiale, opérateur, énergie, assurances-auto, carte-crédit → tout remplissage passe par du TS = « à coder ».

### Priorités suggérées (lecture seule — aucune action prise)
- **Sûr / data-fill JSON :** `meilleure-neobanque.be` (comparateur +1 item/slug), `meilleur-suv.be` & `meilleure-voiture-utilitaire.be` & `meilleure-voiture-7-places.be` (/choisir, et combler quiz côté données) — sites conformes méthodo.
- **À coder (à planifier hors boucle de fill) :** tous les `/deals` & `/simulateur` inline, les moteurs de reco quiz placeholder, et les 5 classements absents.
