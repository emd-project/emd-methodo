# Format CSV d'import MentionLab & règles de rédaction

## Format d'import OBLIGATOIRE (cf. `import-template.csv`)

MentionLab attend **exactement 4 colonnes** — en-tête au pluriel `queries` :
```
queries,language,country,tags
```
- **queries** : le texte de la question — **une vraie question d'internaute**, naturelle, pays sorti de la phrase.
- **language** : `fr`, `nl`, `en`… (minuscule). **country** : ISO alpha-2 majuscule (`BE`, `FR`).
- **tags** : **UN SEUL champ** entre guillemets, liste de tags **séparés par des virgules**, chaque tag **préfixé par son axe**. Les 6 axes ne sont **PAS** des colonnes séparées — ils vivent comme valeurs préfixées dans `tags` :
  `CAT_… , SCAT_… , TYPE_… , CR_… , FUN_… , QT_…`

> ⚠️ Erreur historique : sortir une colonne par axe (`query,...,CAT_,SCAT_,...`). FAUX. L'import veut
> `queries,language,country,tags` avec tous les axes **dans** `tags`.

## Exemple (correct)
```
queries,language,country,tags
"Quelle citadine pas chère à l'achat pour un jeune conducteur ?",fr,BE,"CAT_Auto,SCAT_Citadine,TYPE_JeuneConducteur,CR_Prix,FUN_Decision,QT_Comparative"
"Quels sont les SUV familiaux les plus fiables à moins de 40.000 € ?",fr,BE,"CAT_Auto,SCAT_SUV,TYPE_Famille,CR_Fiabilite,FUN_Decision,QT_Comparative"
"Comment fonctionne la prime régionale pour une voiture électrique en 2026 ?",fr,BE,"CAT_Auto,SCAT_Electrique,CR_Prix,FUN_Discovery,QT_Informative"
"What is the most reliable used family SUV under €40,000?",en,BE,"CAT_Auto,SCAT_SUV,TYPE_Famille,CR_Fiabilite,FUN_Decision,QT_Comparative"
```
- Une ligne par prompt × langue. Calquer la **casse/les préfixes** des tags déjà présents (`list_tags`).
- Axe sans valeur → simplement absent de `tags` (ne pas inventer, ne pas mettre `Generic` par défaut).

## Checklist de rédaction
- [ ] En-tête **exact** `queries,language,country,tags` (pas `query`, pas de colonnes par axe).
- [ ] **Toujours une question** (interrogative), jamais du style mots-clés.
- [ ] **Zéro vouvoiement** : impersonnel/naturel, jamais « recommandez-vous ».
- [ ] **Pas de patron** « X ou Y : laquelle choisir ? » → « Vaut-il mieux X ou Y… ? ».
- [ ] **Variété réelle** : aucune tête de question répétée ; > 2–3 occurrences d'une tournure = réécrire.
- [ ] **Comparative** : aucune mention de la marque du site ; formulation qui force des noms.
- [ ] **Informative** : aucune marque poussée ; vraie question ; sources variées ; marqueurs temporels sur une partie.
- [ ] **Brand** : **0 par défaut**, seulement si explicitement demandé.
- [ ] **`SCAT_` produit/segment / `TYPE_` persona** — jamais le même libellé dans les deux.
- [ ] Pays hors de la phrase ; FR d'abord puis **traduction naturelle** ; accords relus par langue.

## Répartition QT recommandée (Brand = 0 par défaut)
| Objectif | Comparative | Informative | Brand |
|---|---|---|---|
| Comparateur / visibilité (**défaut**) | 65–70% | 30–35% | **0%** |
| Diagnostic sources | 30% | 70% | 0% |
| Marque à monitorer (**sur demande**) | 50% | 30% | 20% |
Ne jamais descendre l'informatif à ~0. **Le Brand ne s'ajoute que si l'utilisateur le demande explicitement.**
