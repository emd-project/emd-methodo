# Gabarit-or de taxonomie — référence ING Belgium

Le projet ING Belgium est la maille la plus fine : **6 axes tagués sur chaque query**. Sers-t'en comme référence pour cadrer n'importe quel nouveau projet (adapte les valeurs au secteur).

## Les 6 axes

| Axe | Rôle | Exemples (ING Belgium) |
|---|---|---|
| `CAT_` | Macro-catégorie client | `Starters`, `Business` |
| `TYPE_` | Persona précis | `Freelancer`, `Self_Employed`, `SME`, `Legal_Entity`, sectoriels `Sector_Healthcare`… |
| `SCAT_` | Produit / segment / besoin | `Financing`, `Insurance`, `Current_Account`, `Credit_Card`… |
| `CR_` | Critère de choix | `Quality_Price`, `Advice_Expertise`, `Digital_Experience`, `Reputation` |
| `FUN_` | Étape funnel | `Company_Creation`, `Operational_Setup`, `Expanding`, `First_Milestones`… |
| `QT_` | Type de question | `Comparative`, `Informative` (`Brand` sur demande seulement) |

## Adapter à un autre secteur
- **B2C produit** → souvent `CT_` (catégorie) + `PS_` (persona) + `QT_` suffisent. Garder au minimum persona ET type de question.
- **Assurances** → axe fort `B2C/B2B` × branche produit ; ajouter les profils (jeune conducteur…) souvent oubliés — **en `TYPE_`, pas en `SCAT_`**.
- **Comparateur** → beaucoup de `Comparative`, socle `Informative`, **pas de `Brand` par défaut**.

## Erreurs de tagging à éviter
1. Tagging à plat (mélange personas et critères) → séparer les axes.
2. Pas de `QT_` → impossible de distinguer comparatif/informatif.
3. Personas dans le texte mais pas tagués → doivent vivre dans `TYPE_`/`PS_`.
4. **Le MÊME libellé dans `SCAT_` ET `TYPE_`** (ex. `JeuneConducteur`) → INTERDIT. `SCAT_` = produit/segment uniquement ; `TYPE_` = persona uniquement. Un « jeune conducteur » cherchant une première voiture = `TYPE_=JeuneConducteur` + `SCAT_=Citadine`.
5. `Generic` mis par remplissage → ne l'utiliser que si AUCUN tag pertinent n'existe.
6. Pas de `FUN_`/`INT_` → on perd l'axe cycle de vie.

## Principe directeur
La grille **instrumente la mesure** (tagging par segment), mais le texte reste **une vraie question naturelle d'internaute** : on écrit la question d'abord, on la tague ensuite. La formulation n'est jamais dictée par un template mécanique — ce qu'on mesure (citation / visibilité / perception) guide l'angle, pas la syntaxe.
