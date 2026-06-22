# Format CSV & règles de rédaction

## Colonnes du CSV de sortie
```
query,language,country,CAT_,SCAT_,TYPE_,CR_,FUN_,QT_
```
- **query** : texte du prompt — **une vraie question d'internaute**, naturelle, simplifiée, pays sorti de la phrase quand possible.
- **language** : `fr`, `nl`, `en`… **country** : ISO alpha-2 majuscule (`BE`, `FR`).
- Colonnes de tags : une valeur par axe ; calquer le format des tags déjà présents (`list_tags`).
Une ligne par prompt × langue ; axe sans valeur → vide plutôt qu'inventer (mais ne pas mettre « Generic » par défaut).

## Exemple (gabarit ING Belgium)
```
query,language,country,CAT_,SCAT_,TYPE_,CR_,FUN_,QT_
"Quelle banque offre le meilleur accompagnement pour un freelance qui crée son activité ?",fr,BE,Starters,Package_Startup,Freelancer,Advice_Expertise,Company_Creation,Comparative
"Qu'est-ce que le VAPZ et comment fonctionne-t-il pour un indépendant ?",fr,BE,Starters,Insurance,Freelancer,,Professional_Life_Start,Informative
```

## Checklist de rédaction
- [ ] **Toujours une question** (interrogative), jamais du style mots-clés.
- [ ] **Zéro vouvoiement** : impersonnel/naturel, jamais « recommandez-vous ».
- [ ] **Pas de patron** « X ou Y : laquelle choisir ? » → « Vaut-il mieux X ou Y… ? ».
- [ ] **Variété réelle** : aucune tête de question répétée ; > 2–3 occurrences d'une tournure = réécrire.
- [ ] **Comparative** : aucune mention de la marque du site ; formulation qui force des noms.
- [ ] **Informative** : aucune marque poussée ; vraie question ; sources variées ; marqueurs temporels sur une partie.
- [ ] **Brand** : **0 par défaut**, seulement si explicitement demandé.
- [ ] **`SCAT_` produit/segment / `TYPE_` persona** — jamais le même libellé dans les deux.
- [ ] Pays hors de la phrase ; FR d'abord puis **traduction naturelle** (pas mot-à-mot) ; accords relus par langue.

## Répartition QT recommandée (Brand = 0 par défaut)
| Objectif | Comparative | Informative | Brand |
|---|---|---|---|
| Comparateur / visibilité (**défaut**) | 65–70% | 30–35% | **0%** |
| Diagnostic sources | 30% | 70% | 0% |
| Marque à monitorer (**sur demande**) | 50% | 30% | 20% |
Ne jamais descendre l'informatif à ~0 (sinon on ne sait pas quelles sources alimentent les LLM). **Le Brand ne s'ajoute que si l'utilisateur le demande explicitement.**
