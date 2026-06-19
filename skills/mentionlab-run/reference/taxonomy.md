# Gabarit-or de taxonomie — référence ING Belgium

Le projet ING Belgium est la maille la plus fine : **6 axes tagués sur chaque query**. Sers-t'en comme référence pour cadrer n'importe quel nouveau projet (adapte les valeurs au secteur).

## Les 6 axes

| Axe | Rôle | Exemples (ING Belgium) |
|---|---|---|
| `CAT_` | Macro-catégorie client | `Starters`, `Business` |
| `TYPE_` | Persona précis | `Freelancer`, `Self_Employed`, `SME`, `Legal_Entity`, sectoriels `Sector_Healthcare`… |
| `SCAT_` | Produit / besoin | `Financing`, `Insurance`, `Current_Account`, `Credit_Card`… |
| `CR_` | Critère de choix | `Quality_Price`, `Advice_Expertise`, `Digital_Experience`, `Reputation` |
| `FUN_` | Étape funnel | `Company_Creation`, `Operational_Setup`, `Expanding`, `First_Milestones`… |
| `QT_` | Type de question | `Comparative`, `Informative`, `Brand` |

## Adapter à un autre secteur
- **B2C produit** → souvent `CT_` (catégorie) + `PS_` (persona) + `QT_` suffisent. Garder au minimum persona ET type de question.
- **Assurances** → axe fort `B2C/B2B` × branche produit ; ajouter les profils (jeune conducteur…) souvent oubliés.
- **Comparateur** → beaucoup de `Comparative`, mais garder un socle `Informative` et quelques `Brand`.

## Erreurs de tagging à éviter
1. Tagging à plat (mélange personas et critères) → séparer les axes.
2. Pas de `QT_` → impossible de distinguer comparatif/informatif/brand.
3. Personas dans le texte mais pas tagués → doivent vivre dans `TYPE_`/`PS_`.
4. Pas de `FUN_`/`INT_` → on perd l'axe cycle de vie.

## Principe directeur
On n'écrit pas des questions, **on instrumente une grille de segments**. La formulation est dictée par ce qu'on mesure : citation (informatif), visibilité (comparatif), perception (brand).
