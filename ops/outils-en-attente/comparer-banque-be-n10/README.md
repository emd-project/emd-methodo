# Outil n°10, prêt à pousser sur `emd-project/comparer-banque.be` (branche `main`)

Construit et vérifié le 2026-10-07 par `emd-outils-calculateurs`. **Non publié** : le poste qui porte le MCP nano-mentionbox s'est déconnecté avant le commit, et rien n'a été écrit sur le repo du site (aucun demi-état).

Les cinq fichiers de ce dossier se posent tels quels, au même chemin relatif, en **un seul commit** :

| Fichier | Nature | Contrôle avant de pousser |
|---|---|---|
| `components/blog/EpargneCompare.tsx` | nouveau | aucun |
| `components/article/ArticleView.tsx` | modifié (1 import, 1 entrée de map MDX) | le fichier distant doit encore avoir le sha `713804e` ; sinon rejouer les deux lignes sur la version courante |
| `lib/i18n/article-slugs.ts` | modifié (1 paire) | le fichier distant doit encore avoir le sha `29cb200` ; sinon ajouter la paire à la version courante |
| `content/blog/epargne/simulateur-compte-epargne-belgique.mdx` | nouveau | aucun |
| `content/blog/en/epargne/savings-account-calculator-belgium.mdx` | nouveau | aucun |

Message de commit prévu : `feat(outils): simulateur de comptes d'épargne à deux colonnes, article FR + miroir EN`.

Les taux par défaut portent la date du 7 octobre 2026. Si la publication a lieu plus tard, relire la page KBC Start2Save et le taux Keytrade High Fidelity, puis mettre à jour les dates dans l'interface (`srcA`, `srcB`) et dans les deux articles.
