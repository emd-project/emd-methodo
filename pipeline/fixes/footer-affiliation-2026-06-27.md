# Journal — Suppression des mentions d'affiliation en footer

**Date :** 2026-06-27 · **Demande :** retirer toutes les mentions de type « Liens affiliés. En achetant via nos liens, vous soutenez le site sans surcoût. » du footer des sites.
**Principe :** EMD ne fait aucune affiliation (cf. `skills/humaniser-fr/SKILL.md`). On retire le **rendu** dans le footer (source réellement affichée).

---

## Corrigé (rendu retiré, FR+EN couverts par le même composant)

| Site | Source | Détail | Commit |
|------|--------|--------|--------|
| meilleure-voiture.be | `components/layout/Footer.tsx` | `<span>` `footer.affiliateDisclaimer` retiré du footer-bottom | `3241ffa` |
| meilleur-suv.be | `components/layout/Footer.tsx` | idem | `aaecb4b` |
| meilleure-voiture-familiale.be | `components/layout/Footer.tsx` | idem (`makeT`/`tr`) | `aeef0d2` |
| meilleures-assurances-auto.be | `components/layout/Footer.tsx` | `<p>` `footer.affiliateDisclaimer` retiré + commentaire d'en-tête mis à jour | `9c1f8ca` |
| meilleure-carte-credit.be | `components/layout/Footer.tsx` (branche déployée `claude/setup-nextjs-apple-guide-En4gb`) | `<p>` `footer.disclaimer` retiré ; ligne « copyright » (Site indépendant.) conservée | `718bcf4` |

La ligne « © AAAA {site} — indépendant » est conservée partout (ce n'est pas une mention d'affiliation).

## Déjà conforme (aucune mention d'affiliation en footer)

- **meilleur-fournisseur-energie-be** — footer FR/EN : copyright + « Comparateur indépendant agréé ». Pas de disclaimer affilié.
- **meilleure-voiture-utilitaire.be** — déjà retiré (commentaire « La mention éditeur a été retirée du footer »).
- **quel-operateur-choisir.be** — footer = copyright + réseaux sociaux.
- **meilleure-voiture-electrique** — bas de footer = copyright + disclaimer « données indicatives » (pas d'affiliation).
- **emd-template** — déjà dé-affilié (commentaire « la ligne disclaimer affilié a été retirée »). Les nouveaux sites n'hériteront donc pas du disclaimer.

## Notes

- Les **clés i18n** `footer.affiliateDisclaimer` (voiture, suv, familiale, assurances) et `footer.disclaimer` (carte-crédit) restent présentes mais **ne sont plus rendues** → aucune mention visible. Purge optionnelle des clés inutilisées lors d'un prochain passage (laissées en place ici pour zéro risque de référence pendante).
- **Hors périmètre de la demande (footer)** mais à signaler : `meilleur-fournisseur-energie-be` `app/(site)/mentions-legales/page.tsx` contient encore une section « Liens affiliés » (page légale, pas footer). À traiter séparément si souhaité.

---
*Écritures limitées aux 5 Footer.tsx concernés (carte-crédit sur sa branche déployée) + ce fichier.*
