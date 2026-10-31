# Audit PAGES CLÉS — 2026-10-31

Périmètre : sites de `pipeline/provisioned-log.csv` provisionnés ≤ 14 jours (depuis le 2026-10-17) et absents de `audited-pages.csv`. **1 site audité** : fonds-investissement.be (provisionné le 2026-10-20, repo `emd-project/fond-investissement`, `main` @ `5c3a35f` du 29/10). Lecture seule sur le code du repo — aucun build ni test HTTP en production. Référence : `references/pages-cles.md`.

## Synthèse

| Site (provisionné) | Comparateur | /choisir | Quiz | Classements | Simulateur | Deals | Verdict |
|---|---|---|---|---|---|---|---|
| fonds-investissement.be (20/10) | OK (2 slugs × 9 items, FR/EN) | OK FR (2 entrées) / 404 EN voulu | éteint proprement | OK (2, parité FR/EN) | éteint, **routes restantes** | éteint, **routes restantes** | Mineur |

**Aucune page clé réellement vide exposée.** Rien à construire en data ; uniquement des écarts de code mineurs (à coder).

## « À coder » (composant NON data-driven — à traiter à part)

- **Simulateur** (`const CYCLES: CyclePrix[] = []` figé dans `app/(site)/simulateur/page.tsx`) et **Deals** : éteints par flag (`simulator.enabled: false`, `deals.enabled: false`), absents de nav/footer/sitemap/ToolCTA, mais **les routes `app/(site)/simulateur`, `app/en/simulateur`, `app/(site)/deals`, `app/en/deals` n'ont pas été supprimées** (écart §5). `content/pages/deals.yaml` résiduel. Action = suppression de routes.
- **CTA quiz trompeur (FR)** : `app/(site)/comparer/[produit]/page.tsx` l.114-118 affiche « Répondez à 4 questions pour trouver votre modèle — Faire le quiz → » vers `/choisir/[produit]`, alors que le quiz n'a **0 step** : la page `/choisir` ne contient que l'éditorial. Texte en dur, gardé par `hasChoisir` (éditorial) et non par la présence de steps. Pas un lien mort, mais une promesse fausse → reformuler (« Lire le guide de choix → ») ou garder sur `hasQuizSteps('fr')`. À vérifier aussi : libellé `quizCta` de `app/(site)/classement/[produit]/page.tsx`.

Tout le reste (comparateur, choisir, quiz, classement) est **data-driven** → remplissage sûr par fichiers de données.

## Détail — fonds-investissement.be (FR + EN)

- **Comparateur : OK.** `content/data/comparateurs.json` + `.en.json` : 2 slugs (`fonds-investissement-pme`, `invests-wallons`), 9 items chacun, parité FR/EN, `sourceUrl` neutre sur 18/18, aucune spec vide. `comparator.enabled: true`. **Prix (= ticket) ≤ 0 sur 6/9 et 7/9 items** → rendu « — » (« non publié par la source », géré par `components/comparer`). Pas un shell, mais colonne prix peu informative. Data-driven : oui (`lib/comparateur.ts`).
- **/choisir : OK en FR.** `content/data/choisir.json` : 1 entrée par slug comparateur (2/2). `/en/choisir/[produit]` en 404 voulu (pas d'éditorial EN, `quiz.en.yaml` vide) ; CTA EN (`comparer`, `classement`) et sitemap EN correctement gardés par `hasQuizSteps('en')`. Data-driven : oui (`lib/choisir-content.ts`).
- **Quiz : éteint proprement.** `quiz.enabled: false`, `steps: []` dans `content/pages/quiz.yaml` et `quiz.en.yaml`. Footer, home (`ComparateurHome`) et sitemap gardés. Data attendue : `content/pages/quiz(.en).yaml` (3-6 steps, `value` = slug comparateur) + `niche.config.ts` (`quiz.question`, `quiz.criteria`). Data-driven : oui (`components/quiz/QuizEngine.tsx`). Optionnel : l'activer rendrait `/en/choisir` disponible.
- **Classements : OK.** `content/data/classements.json` + `.en.json` : `fonds-investissement-pme` (9 items, 5 sections, 7 FAQ, ~2 040 mots FR / ~1 810 EN) et `invests-wallons` (9 items, 5 sections, 7 FAQ, ~2 425 FR / ~2 265 EN), `excerpt` présents, parité FR/EN. Prix « non publié » sur 4-6/9 items (tickets non communiqués par les invests — factuel). Corps `sections` seul = 624-930 mots (le reste vient de FAQ/items). 6 catégories éditoriales pour 2 classements ; d'autres classements sont `planned` dans `content/site-plan.json` (complétés par la tâche `fond-investissement-article-daily`). Data-driven : oui (`lib/classement.ts`).
- **Simulateur / Deals** : voir « À coder ».
- Non vérifié : rendu prod, statut HTTP réel des routes simulateur/deals, libellés i18n EN des CTA.
