# Audit — PAGES CLÉS VIDES (sites EMD)

**Date :** 2026-07-04
**Référence :** `references/pages-cles.md` (emd-project/emd-methodo)
**Mode :** LECTURE SEULE (aucune écriture sur les sites)
**Périmètre :** sites « Live » + « Configuré » de `pipeline/sites.csv` → **13 sites** (10 Live + 3 Configuré)

> Une page clé livrée doit être **remplie** : comparateur ≥ 5 items, quiz ≥ 3 questions menant à des recos, tableaux non vides, **classement ≥ 5 items + sections ≥ 1000 mots**. Un shell vide = à construire, jamais laissé tel quel.

**Méthode de ce run :** audit complet des **2 nouveaux sites** entrés en périmètre (`meilleure-fibre-internet.be`, `meilleur-fournisseur-electricite.be`, tous deux « Configuré »). Pour les 11 sites déjà audités le 2026-06-27, re-vérification ciblée des trous précédemment signalés ; le reste des constats structurels (deals/simulateur inline, classements absents, TS hardcodé) est reporté depuis le run précédent — ces éléments ne changent pas en une semaine sans refonte.

---

## ⚠️ Constat transversal d'architecture (inchangé)

La méthodo attend des composants **data-driven** consommant `content/data/*.json` (`comparateurs.json`, `classements.json`, `choisir.json`) + quiz via `niche.config.ts` / `quiz.yaml`. **La réalité diverge fortement selon les sites** :

- **Sites « JSON » (conformes méthodo)** : `meilleur-suv.be`, `meilleure-voiture-utilitaire.be`, `meilleure-voiture-7-places.be`, `meilleure-neobanque.be`, **`meilleure-fibre-internet.be` (nouveau)**, **`meilleur-fournisseur-electricite.be` (nouveau)**. Ici remplir = éditer un JSON → **safe**.
- **Sites « TS hardcodé »** (`content/data/` absent, données dans `lib/*.ts`) : `meilleure-voiture.be`, `meilleure-voiture-familiale.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be`. Remplir = **éditer du TypeScript** → « à coder ».
- **Site architecture custom** : `meilleure-voiture-electrique.be` (pas de `niche.config.ts`, données par voiture dans `data/cars/*.json`).
- **`/deals` et `/simulateur`** : sur quasi tous les sites, données en **arrays inline dans `page.tsx`** (`DEALS = []`, `CYCLES = []`) → **non data-driven → à coder**.
- **Quiz** : sur plusieurs sites la **logique de reco (`recommend()` dans `QuizEngine.tsx`) est un placeholder hardcodé** → reco **à coder**.
- **Classements (GEO asset #1)** : **absent** sur plusieurs sites ; présent mais **hardcodé en TS** sur voiture / suv / familiale / electrique.

---

## Détail par site

### 12. meilleure-fibre-internet.be — Télécom / Fibre (Configuré) · **NOUVEAU en périmètre**
`emd-project/meilleure-fibre-internet.be` @ `main` · **`content/data/` EXISTE** (site conforme méthodo, data-driven)

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | **EMPTY (placeholder seed)** | 1 slug `exemple` × 3 « Modèle A/B/C » démo ; **aucun opérateur réel** | `content/data/comparateurs.json` (+`.en`) | **Oui** |
| Classements | **FILLED** | 1 slug `meilleure-fibre-internet` × **6 items réels** (Proximus, Digi, Telenet, Orange, VOO, Mobile Vikings), long-form, FAQ 7, sources datées juin 2026 | `content/data/classements.json` (+`.en`) | **Oui** |
| /choisir | **EMPTY** | `choisir.json = {}` | `content/data/choisir.json` | Câblé mais vide |
| Quiz | **SHELL** | `quiz.yaml` placeholder générique (« Catégorie A/B/C », budget, usage) | `content/pages/quiz.yaml` | Questions non pertinentes |
| Tableaux prix `/deals` | **EMPTY** | `deals.yaml` = titres/disclaimer, **aucune offre listée** ; ⚠️ contient un `affiliate_disclaimer` (« liens affiliés ») **contraire à la méthodo « aucune affiliation »** — à retirer | `content/pages/deals.yaml` | — |

**Vides :** comparateur (placeholder seed), /choisir, quiz, /deals.
**À coder :** rien de bloquant — tout est data-driven. `/deals` en YAML. **Signalement conformité :** retirer le `affiliate_disclaimer` du `deals.yaml` (viole la règle « aucun lien affilié »).
**Sûr / data-fill JSON :** remplir `comparateurs.json` (5-12 offres fibre réelles ≥ 5), `choisir.json`, corriger `quiz.yaml`.

### 13. meilleur-fournisseur-electricite.be — Énergie / Fournisseur (Configuré) · **NOUVEAU en périmètre**
`emd-project/meilleur-fournisseur-electricite.be` @ `main` · **`content/data/` EXISTE** (site conforme méthodo, data-driven)

| Page clé | Statut | Détail | Source données | Data-driven |
|---|---|---|---|---|
| Comparateur | **EMPTY (placeholder seed)** | 1 slug `exemple` × 3 « Modèle A/B/C » démo ; **aucun fournisseur réel** | `content/data/comparateurs.json` (+`.en`) | **Oui** |
| Classements | **FILLED** | 1 slug `meilleurs-fournisseurs-electricite` × **7 items réels** (Mega, Bolt, Luminus, Eneco, Engie, OCTA+, Ecopower), long-form, FAQ 7, sources CREG/VREG/CWaPE datées juin 2026 | `content/data/classements.json` (+`.en`) | **Oui** |
| /choisir | **EMPTY** | `choisir.json = {}` | `content/data/choisir.json` | Câblé mais vide |
| Quiz | **SHELL** | `quiz.yaml` placeholder générique (« Catégorie A/B/C ») | `content/pages/quiz.yaml` | Questions non pertinentes |
| Tableaux prix `/deals` | **EMPTY** | `deals.yaml` placeholder, aucune offre | `content/pages/deals.yaml` | — |

**Vides :** comparateur (placeholder seed), /choisir, quiz, /deals.
**À coder :** rien de bloquant — data-driven. `/deals` en YAML.
**Sûr / data-fill JSON :** remplir `comparateurs.json` (fournisseurs élec réels ≥ 5), `choisir.json`, adapter `quiz.yaml` (routage vers fournisseurs). Prix classement datés juin 2026 → candidats refresh mensuel comme énergie.

---

## Sites déjà audités (delta re-vérifié depuis 2026-06-27)

### ✅ Corrigés depuis le dernier run
- **meilleure-neobanque.be** — comparateur **passé de 4 à 5 items/slug** (neobanques : N26, Revolut, bunq, Wise, **Aion** ; comptes-pro : Revolut, Qonto, bunq, Wise, **N26**). **Seuil ≥ 5 atteint → n'est plus sous-seuil.** `content/data/comparateurs.json`, data-driven. Restent « à coder » : deals/simulateur inline, reco quiz.
- **meilleure-voiture-7-places.be** — `/choisir` **passé de `{}` à rempli** (4 slugs riches : voiture-7-places, suv-7-places, electrique, pas-cher, sections + FAQ). `content/data/choisir.json`, data-driven. Restent vides : quiz (reco placeholder), `/deals`.

### ⏳ Inchangés (reportés du 2026-06-27)
- **meilleure-voiture-utilitaire.be** — **classements toujours ABSENTS** (`content/data/` = seulement choisir + comparateurs, pas de `classements.json`). `/deals` & simulateur vides ; reco quiz placeholder.
- **meilleure-voiture.be** — TS hardcodé ; `/deals`, `/simulateur`, quiz embarqué `/choisir` vides ; comparateurs `hybrides`/`occasions` manquants ; éditorial `citadines` absent.
- **meilleur-suv.be** — quiz reco placeholder ; `/deals` vide ; classements en TS (à refactorer vers `classements.json`).
- **meilleure-voiture-familiale.be** — comparateur `{}`, /choisir `{}`, quiz + simulateur + deals vides (TS hardcodé).
- **meilleure-voiture-electrique.be** — archi custom ; quiz & /choisir **absents** ; classements inline TS (à refactorer). Comparateur/simulateur/primes remplis.
- **quel-operateur-choisir.be** — /choisir `{}`, `/deals` vide, classements **absents** ; simulateur à confirmer (TS hardcodé).
- **meilleur-fournisseur-energie.be** — `/deals` & `/simulateur` vides, classements **absents** (TS hardcodé). Prix datés juin 2026.
- **meilleures-assurances-auto.be** — /choisir `{}`, `/deals` vide, classements **absents** (TS hardcodé). Simulateur fonctionnel.
- **meilleure-carte-credit.be** — `/deals` vide, classements **absents** (TS hardcodé). Comparateur/quiz/choisir/simulateur remplis.

> Détail complet des 9 sites ci-dessus : voir `pipeline/audits/pages-2026-06-27.md`. Les constats structurels (deals/simulateur inline, classements absents, TS hardcodé) sont stables tant qu'aucune refonte n'a lieu.

---

## Synthèse

### Sites avec pages clés vides / shell : **13 / 13**
Les 2 nouveaux sites (`fibre`, `electricite`) sont des **seeds « Configuré »** typiques : seul le **classement seed** est rempli (bon, ≥ 5 items, long-form) ; comparateur (placeholder démo), /choisir, quiz et /deals restent vides. Les 11 autres conservent des trous, avec 2 corrections cette semaine (neobanque, 7-places).

### Récap des trous par type de page

**Comparateur vide / placeholder / sous-seuil :**
- `meilleure-fibre-internet.be` → **placeholder démo** (« Modèle A/B/C », 0 opérateur réel)
- `meilleur-fournisseur-electricite.be` → **placeholder démo** (0 fournisseur réel)
- `meilleure-voiture-familiale.be` → **vide** (`COMPARATEURS = {}`)
- `meilleure-voiture.be` → 2 catégories manquantes (`hybrides`, `occasions`)
- ~~`meilleure-neobanque.be`~~ → **corrigé** (5 items/slug)

**Quiz shell (reco / questions placeholder) :** `meilleure-fibre-internet.be`, `meilleur-fournisseur-electricite.be` (questions démo), `meilleur-suv.be`, `meilleure-voiture-familiale.be`, `meilleure-voiture-utilitaire.be`, `meilleure-voiture-7-places.be`, `meilleure-voiture.be` (quiz embarqué /choisir).

**/choisir éditorial vide :** `meilleure-fibre-internet.be`, `meilleur-fournisseur-electricite.be`, `meilleure-voiture-familiale.be`, `quel-operateur-choisir.be`, `meilleures-assurances-auto.be`, `meilleure-voiture.be` (citadines). ~~`meilleure-voiture-7-places.be`~~ → **corrigé**.

**Tableaux de prix `/deals` vides :** `meilleure-fibre-internet.be`, `meilleur-fournisseur-electricite.be`, `meilleure-voiture.be`, `meilleur-suv.be`, `meilleure-voiture-familiale.be`, `meilleure-voiture-utilitaire.be`, `meilleure-voiture-7-places.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be` (**11 sites**).

**Simulateur vide / shell :** `meilleure-voiture.be`, `meilleure-voiture-familiale.be`, `meilleure-voiture-utilitaire.be`, `meilleur-fournisseur-energie.be` ; `quel-operateur-choisir.be` (à vérifier). (fibre/electricite : pas de route simulateur.)

**Classements ABSENTS (GEO asset #1 manquant) :** `meilleure-voiture-utilitaire.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, `meilleure-carte-credit.be` (**5 sites**). Les 2 nouveaux sites ont, eux, leur classement seed **déjà rempli**.

### Pages « À CODER » (composant NON data-driven — à traiter à part, ne pas bricoler)

1. **`/deals` et `/simulateur` inline** (arrays dans `page.tsx`) sur les sites « TS/voiture » : voiture, suv, familiale, utilitaire, 7-places, opérateur, énergie, assurances-auto, carte-crédit, neobanque. Remplir = éditer du code. (Sur `fibre`/`electricite`, `/deals` est en **YAML data → safe**.)
2. **Moteur de reco quiz** (`QuizEngine.recommend()` placeholder) : suv, familiale, utilitaire, 7-places, voiture (embarqué).
3. **Classements à construire from scratch** (route + lib + data) : utilitaire, opérateur, énergie, assurances-auto, carte-crédit.
4. **Classements en TS hardcodé** (hors méthodo `classements.json`) : voiture, suv, familiale (`lib/classements.ts`), electrique (inline page) → à refactorer vers data-driven.
5. **Sites « tout TS »** (comparateur/choisir dans `lib/*.ts`) : voiture, familiale, opérateur, énergie, assurances-auto, carte-crédit → tout remplissage = « à coder ».

### Signalements conformité (hors « vide »)
- **`meilleure-fibre-internet.be`** : `deals.yaml` contient un `affiliate_disclaimer` évoquant des liens affiliés → **contraire à la règle méthodo « aucune affiliation »**. À retirer.

### Priorités suggérées (lecture seule — aucune action prise ce run)
- **Sûr / data-fill JSON (nouveaux sites)** : `meilleure-fibre-internet.be` & `meilleur-fournisseur-electricite.be` → remplir `comparateurs.json` (≥ 5 offres réelles), `choisir.json`, corriger `quiz.yaml`. Classements déjà OK.
- **Sûr / data-fill JSON (existants)** : combler quiz-data et compléments sur suv / utilitaire / 7-places / neobanque.
- **À coder (à planifier hors boucle de fill)** : tous les `/deals` & `/simulateur` inline, les moteurs de reco quiz placeholder, et les **5 classements absents**.
