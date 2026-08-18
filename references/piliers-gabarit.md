# Gabarit — `content/piliers.md`

Ce fichier vit dans **chaque repo de site**, à `content/piliers.md`. Il porte tout ce qui est **propre au site** ; le transversal est dans `skills/seo-geo-redaction/SKILL.md` (section « Socle éditorial ») et ne se recopie **jamais** ici.

**Règle de non-duplication.** Une règle présente à la fois dans le socle et dans un `piliers.md` finira par diverger, et l'agent prendra la mauvaise. Si c'est dans le socle, ça ne s'écrit pas ici.

**Taille cible : une à deux pages.** Au-delà, c'est qu'il contient du transversal déguisé.

---

## Le format, section par section

### 1. Angle propre — une phrase, pas plus

La chose que ce site fait mieux que ses frères, formulée assez précisément pour trancher un cas limite. Suivie de la liste des sites frères de la même famille et de ce que chacun prend, pour que le **test d'angle** du socle soit applicable.

> **Angle** — Le coût de détention réel, pas le prix catalogue.
> `meilleure-voiture.be` prend les avis modèles et le cycle de vie · `meilleur-suv.be` le segment SUV par l'usage · `meilleure-citadine.be` la ville et le premier achat.
> **Test** : si l'article ne contient ni montant, ni calcul, ni arbitrage de coût, je ne suis pas sur mon angle.

### 2. État du corpus — le déséquilibre à corriger

Deux ou trois phrases factuelles : combien d'articles, comment ils se répartissent, quel format sature, quelles catégories sont vides. C'est ce qui permet à la rotation de viser juste au lieu de tourner à vide.

> 24 articles : 15 déclinaisons « meilleur X pour [persona] », 7 face-à-face, 2 procédures. Catégories `epargne`, `cartes-paiements` et `changer-de-banque` à zéro article.
> **N'écris un nouveau persona ou un nouveau face-à-face que si le besoin est démontré.**

### 3. Les piliers

Un bloc par pilier, numéroté. Chaque bloc porte :
- le **nom** du pilier et sa **catégorie de rattachement** (un slug réel de `niche.config.ts`) ;
- une **marque d'état** quand c'est utile : *prioritaire*, *vide*, *bien servi, n'y reviens qu'avec un angle absent* ;
- le **contenu concret** : les sujets réels, pas des intitulés génériques ;
- trois à cinq **seeds Cuik** de départ, à faire varier d'un run à l'autre.

**Les trois piliers transversaux sont obligatoires** et déclinés à la niche : lexique et définitions, questions pures, matériel et guides d'achat. Si le site n'a pas de famille de produits pertinente, écris-le explicitement — sinon l'agent en inventera une.

> **7. LEXIQUE ET DÉFINITIONS** → cat. `guides`. **Prioritaire, vide.**
> Les garanties : RC contre omnium contre mini-omnium · franchise fixe, proportionnelle, **anglaise** · plafond et sous-limite.
> L'indemnisation : **valeur vénale contre valeur agréée contre valeur à neuf**, le trio le plus décisif financièrement · vétusté · subrogation.
> Le bonus-malus belge : l'échelle 0-22, ce que vaut un degré. **Purement belge, aucune source française utilisable.**
> Seeds : `franchise anglaise assurance`, `valeur vénale voiture`, `bonus malus belgique calcul`, `déchéance de garantie`.

### 4. Marques et entités citables

La liste réelle du marché belge, pour ce site. Elle évite deux erreurs symétriques : citer une marque absente du marché, et n'en citer qu'une.

### 5. Garde-fous sectoriels

Uniquement ce qui est **propre à ce secteur** et qui ne figure pas dans le socle. Trois à six lignes, chacune avec sa raison.

> - **Jamais de prime chiffrée attribuée à un assureur nommé.** La prime dépend du profil, du véhicule, du code postal et du degré : « X coûte Y € » est faux par construction.
> - **Jamais d'affirmation catégorique sur une couverture** sans réserve sur les conditions particulières du lecteur.
> - **Information, pas conseil personnalisé.** Le site n'est pas un intermédiaire d'assurance.

### 6. Ancrages belges à exploiter

Les trois ou quatre éléments locaux qui rendent ce site difficile à copier depuis l'étranger. C'est la matière première de la **donnée propriétaire** exigée par le socle.

> Échelle bonus-malus 0-22 · Bureau de Tarification · Fonds commun de garantie · Ombudsman des assurances · gestionnaires de voirie régionaux pour les dégâts de voirie.

---

## Ce qui ne va PAS dans ce fichier

Tout ce qui est déjà dans le socle : la structure GEO, le pourcentage de H2 en question, le pattern Answer-Explanation-Example, la procédure de minage Cuik, la règle de rotation, la donnée propriétaire, la régionalisation, les garde-fous produits génériques, le workflow images, l'i18n, la journalisation.

Tout ce qui est déjà dans le prompt de la tâche : le repo, la branche, l'auteur, les chemins de fichiers, le schéma de frontmatter, la DA des images.

---

## Squelette à copier

```markdown
# Piliers éditoriaux — [nom du site]

## Angle
[Une phrase.]
Sites frères : [site] prend [angle] · [site] prend [angle].
**Test** : [le critère qui tranche un cas limite.]

## État du corpus
[Deux ou trois phrases factuelles, avec les catégories vides nommées.]

## Piliers

### 1. [Nom] → cat. `slug`
[État. Contenu concret.]
Seeds : `…`, `…`, `…`

### 2. [Nom] → cat. `slug`
…

### N-2. LEXIQUE ET DÉFINITIONS → cat. `slug`
[Les grappes de termes, déclinées à la niche.]
Seeds : `…`

### N-1. QUESTIONS PURES → cat. `slug`
[Le catalogue de questions réelles.]

### N. MATÉRIEL ET GUIDES D'ACHAT → cat. `slug`
[Le catalogue de produits, ou : « Ce site n'a pas de pilier matériel : aucune famille de produits pertinente. N'en invente pas. »]

## Marques citables
[Liste réelle du marché belge.]

## Garde-fous sectoriels
- **[Règle.]** [Raison.]

## Ancrages belges
[Trois ou quatre éléments locaux différenciants.]
```
