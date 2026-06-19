# Format CSV & règles de rédaction

## Colonnes du CSV de sortie
```
query,language,country,CAT_,SCAT_,TYPE_,CR_,FUN_,QT_
```
- **query** : texte du prompt, simplifié, pays sorti de la phrase quand possible.
- **language** : `fr`, `nl`, `en`… **country** : ISO alpha-2 majuscule (`BE`, `FR`).
- Colonnes de tags : une valeur par axe ; calquer le format des tags déjà présents (`list_tags`).
Une ligne par prompt × langue ; axe sans valeur → vide plutôt qu'inventer.

## Exemple (gabarit ING Belgium)
```
query,language,country,CAT_,SCAT_,TYPE_,CR_,FUN_,QT_
"Quelle banque offre le meilleur accompagnement personnalisé pour un freelance qui crée son activité ?",fr,BE,Starters,Package_Startup,Freelancer,Advice_Expertise,Company_Creation,Comparative
"Qu'est-ce que le VAPZ et comment fonctionne-t-il pour un indépendant ?",fr,BE,Starters,Insurance,Freelancer,,Professional_Life_Start,Informative
"Que pensez-vous de l'offre ING pour les indépendants qui démarrent leur activité ?",fr,BE,Starters,Package_Startup,Self_Employed,,Professional_Life_Start,Brand
```

## Checklist de rédaction
- [ ] Comparative : aucune mention de la marque ; formulation qui force des noms d'entreprises.
- [ ] Informative : aucune marque poussée ; vraie question utilisateur.
- [ ] Brand : marque nommée ; ~10 questions ciblées.
- [ ] Pays hors de la phrase ; variation sémantique réelle.
- [ ] FR d'abord puis traduction ; pas de doublon ; cellules vides listées comme gaps.

## Répartition QT recommandée
| Objectif | Comparative | Informative | Brand |
|---|---|---|---|
| Comparateur / visibilité | 60–70% | 25–35% | 0–5% |
| Marque à monitorer | 50% | 30% | 20% |
| Diagnostic sources | 30% | 60% | 10% |
Ne jamais descendre l'informatif à ~0 (sinon on ne sait pas quelles sources alimentent les LLM).
