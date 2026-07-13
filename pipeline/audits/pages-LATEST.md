# Audit — Pages clés vides / shell — 2026-07-13

**Périmètre** : nouveaux sites `pipeline/provisioned-log.csv` provisionnés ≤ 14 jours et non encore audités (ledger `pipeline/audits/audited-pages.csv` — inexistant avant ce run, donc les 2 sites étaient candidats).
**Mode** : LECTURE SEULE sur les sites (aucun commit sur les repos audités).
**Référence** : `references/pages-cles.md`.

| Site | Provisionné | Comparateur | Quiz | Tableaux/offres | Classements | Simulateur |
|---|---|---|---|---|---|---|
| simulateur-assurance-auto.be | 2026-07-10 | ✅ rempli | ❌ shell | ✅ rempli | 🟡 1 seul cluster | ✅ rempli |
| quel-fournisseur-energie.be | 2026-07-13 | ❌ shell | ❌ shell | ❌ vide | 🟡 1 seul cluster | ❌ vide + **à coder** |

---

## 1. simulateur-assurance-auto.be (provisionné 2026-07-10)

### ✅ Pages clés REMPLIES

- **Comparateur** — `content/data/comparateurs.json` + `comparateurs.en.json`. Deux comparateurs : `assurance-auto` (**7 items** : ING, AXA, Yuzzu, Belfius Direct, Ethias, Allianz, KBC Brussels) et `omnium` (**6 items** : Yuzzu, Belfius Direct, ING, Baloise, Ethias, AG Insurance). Specs sourcées et datées (relevé 13/07/2026), `sourceUrl` neutres. Parité FR/EN OK. **Data-driven : OUI.**
- **Tableaux de prix / offres** — portés par le comparateur ci-dessus + les `table` de `content/data/choisir.json` (fourchettes de prime par âge du véhicule, primes RC+omnium par assureur). Sourcés et datés. **Data-driven : OUI.**
- **/choisir (éditorial)** — `content/data/choisir.json` rempli : 2 produits (`assurance-auto`, `omnium`), avec tldr, sections, tables, tips, liens internes et FAQ. **Data-driven : OUI.**
- **Simulateur** — `components/simulateur/SimulateurPrime.tsx` + `lib/simulateur.ts`. Formulaire complet (âge, permis, bonus-malus, km, région, usage, valeur/âge/puissance véhicule, couverture, franchise, options) et calcul calibré sur des tarifs BE réels (base RC 400 €/an, part omnium calibrée sur les relevés janvier 2026). Rend un montant, une fourchette et le détail des facteurs. **Configuré : OUI.**

### ❌ Page clé VIDE / SHELL

- **Quiz** — `content/pages/quiz.yaml` est **le placeholder du template, intact** : questions « Quelle catégorie vous intéresse ? » → *Catégorie A / B / C*, « Quel est votre budget ? », « Votre usage principal ? ». Aucun rapport avec la niche assurance auto, alors que `niche.config.ts` déclare pourtant les bons critères (`quiz.criteria` : âge du conducteur, valeur du véhicule, kilométrage, budget, niveau de couverture).
  - **Format de données attendu** : `content/pages/quiz.yaml` → clé `steps: [{ id, question, options: [{ label, value, emoji? }] }]`, lu par `getPageContent('quiz')` (`lib/cms-pages.ts`) et passé en prop `steps` à `<QuizEngine />`.
  - **Composant data-driven : PARTIELLEMENT.** Les **questions** sont data-driven (YAML → prop `steps`) ✅. Mais la **recommandation** ne l'est pas ❌ — voir « À coder » ci-dessous.

### 🟡 Incomplet (pas vide, mais sous-couvert)

- **Classements** — `content/data/classements.json` (+ `.en.json`) contient **1 seul classement** : `meilleures-assurances-auto` (6 items, 5 sections H2-questions, 6 FAQ, `excerpt` + `intro` présents, parité FR/EN stricte). C'est le **classement seed d'init**. Les autres clusters du site (comparatifs assureurs, garanties/formules, prix & primes, profils conducteurs) **n'ont pas de classement**. Rien n'est « vide » au sens shell — le hub `/classement` affiche bien 1 entrée — mais il reste des clusters à couvrir (cap 2-3 classements/run/site). **Data-driven : OUI.**

---

## 2. quel-fournisseur-energie.be (provisionné 2026-07-13)

### ❌ Pages clés VIDES / SHELL

- **Comparateur** — `content/data/comparateurs.json` + `comparateurs.en.json` sont **le placeholder du template** : une seule entrée `exemple` (« Comparatif exemple », description « à remplacer à l'init par les vrais modèles de la niche ») avec **3 items fictifs** (*Modèle A / B / C*, notes « 4,5/5 », garanties « 2 ans », « En stock »). **3 items < 5 requis, et aucun n'est réel.** Aucun fournisseur d'énergie belge n'y figure — alors que le classement du site en documente 7.
  - **Format attendu** : `content/data/comparateurs.json` → `{ "<slug>": { id, label, description, specsLabels: {clé: libellé}, modeles: [{ nom, prix (number), nouveaute?, sourceUrl?, specs: {clé: valeur} }] } }`, consommé par `lib/comparateur.ts`. Miroir EN dans `comparateurs.en.json`.
  - **Critères déjà déclarés** dans `niche.config.ts` (`comparator.criteria`) : prix du kWh élec/gaz, redevance annuelle, type de contrat (fixe/variable/dynamique), énergie 100 % verte, service client (Trustpilot), facilité de résiliation.
  - **Composant data-driven : OUI** → remplissage sans risque de build.

- **Tableaux de prix / offres** — vides, car portés par le comparateur ci-dessus (placeholder) et par `/choisir` (vide). **Data-driven : OUI.**

- **/choisir (éditorial)** — `content/data/choisir.json` = **`{}`** (fichier de 3 octets, littéralement vide). Toutes les pages `/choisir/[produit]` sont donc sans contenu.
  - **Format attendu** : `{ "<slug>": { tldr: [...], sections: [{ id, title, intro, paragraphs, table?, tip?, internalLink? }], faq: [{q,a}] } }`, consommé par `lib/choisir-content.ts`.
  - **Composant data-driven : OUI.**

- **Quiz** — `content/pages/quiz.yaml` **identique au placeholder du template** (même contenu octet-pour-octet que sur simulateur-assurance-auto.be, sha `f2485a0`) : *Catégorie A / B / C*, budget, usage. Aucun rapport avec l'énergie, alors que `niche.config.ts` déclare les bons critères (`quiz.criteria` : gaz/élec/les deux, consommation annuelle, tarif fixe ou variable, importance du vert, service vs prix).
  - **Format attendu** : `content/pages/quiz.yaml` → `steps: [{ id, question, options: [{label, value}] }]`.
  - **Composant data-driven : PARTIELLEMENT** (questions oui, recommandation non — voir « À coder »).

- **Simulateur** — **VIDE ET NON DATA-DRIVEN**. `app/(site)/simulateur/page.tsx` contient un tableau **codé en dur, inline et vide** :
  ```ts
  const CYCLES: CyclePrix[] = []
  ```
  La page rend donc l'état vide : « *Aucune donnée de cycle de prix pour le moment. Revenez bientôt !* ». Il n'existe **aucun fichier de données** pour l'alimenter, et **`components/simulateur/` n'existe pas** sur ce repo.
  - Aggravant : le template générique affiché est un simulateur de **« cycles de prix »** (prix de lancement / prix actuel / prochaine annonce / « bon moment pour acheter »), **sémantiquement hors-sujet** pour la niche — `niche.config.ts` déclare pourtant `simulator.title = "Simulateur de facture énergie"` et `description = "Estimez votre facture annuelle gaz + électricité selon votre consommation et votre région"`.
  - **Composant data-driven : NON** → **à coder** (voir ci-dessous).

### 🟡 Incomplet (pas vide)

- **Classements** — `content/data/classements.json` (+ `.en.json`) contient **1 classement rempli** : `fournisseurs-energie` (7 items réels : Mega, Bolt, Eneco, Engie, Luminus, TotalEnergies, OCTA+ ; 5 sections H2-questions, 7 FAQ, méthodologie chiffrée, sources CREG/CWaPE, `excerpt` + `intro`, parité FR/EN stricte). C'est le seed. Les autres clusters (gaz, électricité, contrats & tarifs, changer de fournisseur) n'ont pas encore de classement. **Data-driven : OUI.**

---

## 3. Synthèse

### Sites audités avec pages clés vides

| Site | Pages vides / shell |
|---|---|
| **simulateur-assurance-auto.be** | Quiz (placeholder template) |
| **quel-fournisseur-energie.be** | Comparateur (placeholder « Modèle A/B/C », 3 items), /choisir (`{}`), Quiz (placeholder template), Simulateur (vide) |

### À remplir — composants DATA-DRIVEN, build sûr

Ces éléments se corrigent en **écrivant des fichiers de données**, sans toucher au code des composants :

| Site | Fichier | Contenu à produire |
|---|---|---|
| quel-fournisseur-energie.be | `content/data/comparateurs.json` + `.en.json` | 5-12 fournisseurs BE réels (Mega, Bolt, Eneco, Engie, Luminus, TotalEnergies, OCTA+, Ecopower…) sur les 6 critères déjà déclarés. Les données existent déjà dans `classements.json` du même site → recyclables. |
| quel-fournisseur-energie.be | `content/data/choisir.json` | ≥ 1 produit (ex. `fournisseurs-energie`, `gaz`, `electricite`) : tldr, sections, tables, faq. |
| quel-fournisseur-energie.be | `content/pages/quiz.yaml` | 3-6 questions réelles (gaz/élec/les deux, consommation, fixe/variable, vert, service vs prix). |
| simulateur-assurance-auto.be | `content/pages/quiz.yaml` | 3-6 questions réelles (âge conducteur, valeur véhicule, km/an, budget, niveau de couverture). |
| les 2 sites | `content/data/classements.json` + `.en.json` | Compléter les clusters restants (cap 2-3/run/site, ≥1000 mots chacun). |

### ⚠️ À CODER — composants NON data-driven (à traiter à part, hors boucle de remplissage)

Ces deux points **ne peuvent pas être réglés en écrivant de la donnée** — ils exigent une modification de composant, donc un **build risqué** (cf. `references/garde-fous.md`). Ils sont **signalés, pas bricolés**.

1. **Recommandation du quiz — `components/quiz/QuizEngine.tsx` (les 2 sites).**
   La fonction `recommend(answers, locale)` est **codée en dur** et ignore les réponses : elle retourne systématiquement un placeholder — `produit: 'Produit recommandé'`, `modele: 'Modèle placeholder'`, `prix: 'À définir'`, `pourquoi: "Ce produit correspond à vos critères. Le contenu sera personnalisé selon votre niche à l'init."`.
   **Conséquence : même après avoir rempli `quiz.yaml` avec de vraies questions, le quiz affichera « Modèle placeholder / À définir » en résultat.** Remplir le YAML est donc nécessaire mais **pas suffisant**.
   *Correctif requis* : rendre le mapping réponses → recommandation data-driven (ex. bloc `recommendations` dans `quiz.yaml`, ou `quiz.criteria` + mapping dans `niche.config.ts` comme le prévoit `references/pages-cles.md` §2), puis brancher `recommend()` dessus. **À faire une fois dans le template** — le bug est hérité, il touchera tous les nouveaux sites.

2. **Simulateur — `app/(site)/simulateur/page.tsx` (quel-fournisseur-energie.be).**
   `const CYCLES: CyclePrix[] = []` est un tableau **inline dans la page**, sans source de données externe, et le modèle « cycles de prix » ne correspond pas à la niche énergie.
   *Correctif requis* : soit externaliser les données vers `content/data/` et adapter le composant à la niche (facture annuelle gaz + élec, comme le prévoit `niche.config.simulator`), soit **masquer la page** (`simulator.enabled = false`) en attendant — un shell « Aucune donnée » ne doit pas rester en prod.
   *Référence de ce qu'il faut viser* : simulateur-assurance-auto.be a le bon pattern (`lib/simulateur.ts` + `components/simulateur/SimulateurPrime.tsx`, calcul calibré, page = Server Component + îlot client).

### Note de run

Le ledger `pipeline/audits/audited-pages.csv` n'existait pas avant ce run : il a été créé et les 2 domaines y sont désormais inscrits. Aux prochains runs, ces sites ne seront plus re-scannés.
