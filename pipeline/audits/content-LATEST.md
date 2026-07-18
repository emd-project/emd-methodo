# Audit CONTENU & SEO/GEO — LATEST (2026-07-18)

**Domaine d'audit :** `content` (CONTENU · SEO SÉMANTIQUE · GEO/STRUCTURE ARTICLE)
**Mode :** LECTURE SEULE sur les repos de sites.
**Périmètre (≤14j, non déjà audité par `content`) :** 1 site — `quel-fournisseur-energie.be` (provisionné le 2026-07-13).
_Exclu : `simulateur-assurance-auto.be` (provisionné 2026-07-10 mais déjà audité `content` le 2026-07-13). Aucun autre site ≤14j._

---

## Scorecard

| Site | Contenu (thin) | SEO sém. | GEO/structure | % H2-questions (moy.) | Verdict domaine |
|---|:---:|:---:|:---:|:---:|:---:|
| quel-fournisseur-energie.be | ✅ | ⚠️ | ⚠️ | **87 %** | ⚠️ |

Légende : ✅ conforme · ⚠️ à corriger (non bloquant) · ❌ bloquant.

### % H2-questions par article échantillonné

| Article | H2 total | H2 en question | % | Seuil 70 % |
|---|:---:|:---:|:---:|:---:|
| electricite/prix-kwh-electricite-belgique-2026 | 8 | 7 | 88 % | ✅ |
| gaz/prix-gaz-belgique-2026 | 9 | 8 | 89 % | ✅ |
| contrats/contrat-energie-fixe-variable-dynamique-belgique | 7 | 6 | 86 % | ✅ |
| changer/changer-de-fournisseur-energie-belgique | 8 | 7 | 88 % | ✅ |

**Aucun article sous 70 % de H2-questions. Aucun thin content.**

---

## Détail — quel-fournisseur-energie.be

Échantillon : 4 articles FR (tout le blog publié hors templates). Miroir EN présent (`content/blog/en/{changer,contrats,electricite,gaz}`).

### CONTENU (thin content < 800 mots) — ✅
- 4/4 articles largement > 800 mots (8–9 min de lecture). Aucun thin content, aucun titre dupliqué.

### SEO SÉMANTIQUE — ⚠️
- Intent & mot-clé (H1/intro/meta) ✅ ; un seul H1 ✅ ; maillage interne 2–4 liens dont `/classement` ✅ ; pas d'orphelin ; cannibalisation ✅ (frontière head-nu respectée).
- **⚠️ Mix de sujets trop informationnel** : 4/4 articles info (le ⅓), **0 comparatif persona × marques**. Doctrine = ~⅔ marques-modèles (× persona). Marques citées dans le corps + `/classement`, mais la **sélection des sujets** doit basculer persona-comparatif.

### GEO / STRUCTURE ARTICLE — ⚠️
- % H2-questions 86–89 % ✅ ; réponse-first ✅ ; FAQ 7 ✅ ; aiSummary 5 bullets ✅ ; JSON-LD Breadcrumb+Article+Person(auteur)+FAQPage ✅.
- **⚠️ `Speakable` absent** du JSON-LD (mineur).
- Accord en genre ✅ (`entityGender: 'm'`, masculin correct).
- **⚠️ Année en dur (point n°1)** : 4/4 `title` contiennent « en 2026 » ; 2/4 slugs datés (`prix-kwh-electricite-belgique-2026`, `prix-gaz-belgique-2026`). Doctrine = année dynamique.

### Auteur (E-E-A-T) — ✅
- **Camille**, analyste marché énergie BE, bio E-E-A-T crédible, prénom seul, JSON-LD `author` Person. Pas de « la rédaction ».

---

## Top des actions prioritaires (pour emd-fix)

1. **Année dynamique** — retirer « 2026 » des 4 `title` + 2 slugs datés → `currentYear()` ; prévoir redirections des slugs datés.
2. **Rééquilibrer les sujets persona × marques** — prochains articles : « Quel fournisseur pour [famille/locataire/gros conso/PME] », « Mega vs Bolt », « fournisseurs 100 % verts ». Tagger marques + persona.
3. **Ajouter `Speakable`** au JSON-LD dans `ArticleView.tsx`.
4. **Maintenir la structure GEO** (% H2-questions, réponse-first, FAQ 7, aiSummary) — ne pas régresser.
5. **Surveiller ratio ⅔/⅓ + anti-cannibalisation** à mesure que le blog grandit.

---

## Résumé

- **Sites audités :** 1 — `quel-fournisseur-energie.be`. **Verdict ⚠️** (aucun ❌ bloquant).
- **Thin content :** 0. **Articles < 70 % H2-questions :** 0 (moy. 87 %).
- **5 urgences :** (1) année en dur (titres+slugs) ; (2) comparatifs persona × marques ; (3) `Speakable` JSON-LD ; (4) redirections des 2 slugs datés ; (5) tags marques+persona.
