# Journal des corrections — CONFORMITÉ & IDENTITÉ — 2026-10-01

**Domaine :** Légal/RGPD · Identité · Auteur/E-E-A-T
**Source (to-do) :** `pipeline/audits/conformite-LATEST.md` (audit du 2026-10-01)
**Doctrine appliquée :** `skills/emd-fix/SKILL.md` (v1.6.1) + `skills/humaniser-fr/SKILL.md` + `references/garde-fous.md`
**Périmètre :** exactement les 7 sites du rapport (nouveaux ≤14j). Aucun re-scan du parc.
**Branche :** `main` de chaque repo (redéploiement Vercel automatique). Écritures via `github_commit_batch` / `github_write_file` (MCP nano-mentionbox), fichiers lus intégralement avant réécriture, aucun read-modify-write après écriture.

---

## Synthèse

| Site | RGPD | Identité | Auteur | Commits |
|---|---|---|---|---|
| meilleur-hotel-bruges.be | ✅ bandeau monté + Analytics gaté | ✅ éclair → clé de comptoir (Nav, Footer, favicon) | ✅ portrait Hélène D. déposé | 4 |
| meilleure-carte-bancaire.be | ✅ bandeau monté + Analytics gaté | ✅ éclair → puce EMV (Nav, Footer, favicon) | déjà ✅ | 3 |
| meilleur-lave-linge.be | ✅ bandeau monté + Analytics gaté | ✅ éclair → façade/hublot (Nav, Footer, favicon) | déjà ✅ | 3 |
| meilleur-shampoing.be | ✅ bandeau monté + Analytics gaté | ✅ éclair purgé des Nav/Footer dormants | déjà ✅ | 3 |
| comparer-compte-epargne.be | ✅ Analytics gaté, bandeau FR+EN, liens légaux EN | ✅ favicon aligné sur le mark + palette | déjà ✅ | 2 |
| besttennisshoes.be | déjà ✅ | ✅ Footer = balle (fin de l'éclair) + coutures protégées | déjà ✅ | 1 |
| gestion-copropriete.be | déjà ✅ (aucun traceur servi) | non touché (wordmark assumé) | ⏸ reporté (cf. arbitrage) | 0 |

---

## meilleur-hotel-bruges.be

### ✅ [❌ RGPD] Bandeau cookies + Analytics conditionné — `1bda280`
- **Nouveau** `components/layout/CookieConsent.tsx` (client) : Accepter/Refuser, lien politique via `legalPath(locale,'privacy')` (→ `/confidentialite` ou `/en/privacy`), FR+EN déduits du chemin, choix mémorisé (`localStorage` `mhb-consent`), lu via `useSyncExternalStore` (le serveur ne rend rien → zéro écart d'hydratation). **`<Analytics />` n'est rendu QU'APRÈS « Accepter »** ; rien avant réponse, rien après refus. Styles inline sur les tokens (`--bg-surface`, `--text-primary`, `--bg-primary`, `--border-strong`, `--radius-*`, `--shadow-lg`), barre fixe discrète, `flex-wrap` (pas de débordement à 320 px).
- `app/layout.tsx` : import `@vercel/analytics/next` et `<Analytics />` retirés, `<CookieConsent />` monté à la place. Reste du fichier recopié à l'identique.
- **Câblage vérifié :** `app/layout.tsx` (layout racine, englobe FR et `/en`) → `<CookieConsent />` → `<Analytics />` conditionnel. Seul montage d'Analytics signalé par l'audit.

### ✅ [❌ Identité] Logo éclair → « clé de comptoir » en laiton — `1394c69`
- Tracé plein unique (anneau + œil + tige + panneton, règle nonzero, œil en sens inverse) posé **dans le SVG inline rendu** de `Nav.tsx` (path sans `fill` → peint par la règle CSS `.logo .mark svg path` comme l'éclair) et de `Footer.tsx` (`fill="#fff"`).
- `app/icon.svg` : même clé en laiton `#C9A227` (accent2) sur carré arrondi `#0D1B1E` (bgPrimary), remplace le gabarit « disque + lettre » (anti-footprint `emd-monogram`). 1:1.
- Cohérent avec la DA « comptoir de nuit / casier à clés en laiton » (`signature.inspiration`).

### ✅ [⚠️ Auteur] Portrait d'Hélène D. (image cassée) — `a87ba56`
- Portrait éditorial 1:1 généré (ancienne réceptionniste, rue brugeoise au crépuscule, lumière laiton) déposé en `public/images/authors/helene-d.jpg`.
- `lib/image-slots.ts` : chemin du slot auteur `.webp` → `.jpg` (le fichier réel est un JPEG). Fichier recopié intégralement, seule la ligne `path` + un commentaire daté changent.

### ✅ [mineur légal] `/en/privacy` — `b7e2d0f`
- « Data controller » : forme juridique (SRL de droit belge) + adresse du siège (Rue Blanche-Eau 15, 6950 Nassogne, Belgium). Section cookies réécrite : mesure d'audience chargée uniquement après « Accept », choix stocké localement, droit de retrait du consentement ajouté.

## meilleure-carte-bancaire.be

- ✅ **RGPD** — `1fdc169` : même `CookieConsent` (clé `mcb-consent`, texte propre au site), `<Analytics />` retiré du layout racine.
- ✅ **Identité** — `6747654` : éclair → **puce EMV** (grille de contacts, découpes nonzero) dans `Nav.tsx` + `Footer.tsx` ; `app/icon.svg` = puce `#FDFCFE` sur `#532C96`. Cohérent avec la DA « grille de contacts / puce EMV ».
- ✅ **Légal mineur** — `d772455` : `/en/privacy` adresse + forme juridique + section consentement.

## meilleur-lave-linge.be

- ✅ **RGPD** — `168c38e` : `CookieConsent` (clé `mll-consent`), `<Analytics />` retiré du layout (import `voice-profile.json` et HOME_TITLE conservés tels quels).
- ✅ **Identité** — `a02e906` : éclair → **façade de lave-linge** (caisse, hublot, tambour, bandeau de commandes) dans `Nav.tsx` + `Footer.tsx` ; `app/icon.svg` = façade blanche sur carré `#6A6112`. Cohérent avec la DA « buanderie carrelée / plaque signalétique ».
- ✅ **Légal mineur** — `088ba44` : `/en/privacy`.

## meilleur-shampoing.be

- ✅ **RGPD** — `0f2f2f6` : `CookieConsent` (clé `msh-consent`, replis de couleur accordés au papier crème de la famille beauté), `<Analytics />` retiré du layout.
- ✅ **Identité (dormant)** — `de6adde` : éclair purgé de `Nav.tsx` et `Footer.tsx` (non montés : l'identité rendue est `presse`) au profit d'une **goutte + bulle** propre au site, pour qu'il ne réapparaisse pas si l'identité repasse en `standard`. Le wordmark du `PresseMasthead` est **laissé tel quel** : c'est l'identité de famille décidée le 2026-09-17 (`references/identite-presse-beaute.md`), pas un défaut.
- ✅ **Légal mineur** — `0ae180f` : `/en/privacy`.

## comparer-compte-epargne.be

### ✅ [❌ RGPD] Bandeau rendu opérant + bilingue + liens footer EN — `2d8ae22`
- `components/layout/CookieBanner.tsx` : **rend désormais `<Analytics />` uniquement si `cookie-consent === 'accepted'`** (avant : Analytics chargé avant consentement et après refus). Clé et valeurs `accepted`/`refused` **inchangées** (les choix déjà faits restent valables). Libellés FR/EN selon le chemin, lien `/confidentialite` ou `/en/privacy`. Texte corrigé : plus d'affirmation « sans cookie » contradictoire avec la politique. Export `CookieBanner` et classes CSS (`cookie-banner`, `cookie-actions`, `cookie-btn`) conservés → aucun consommateur cassé.
- `app/layout.tsx` : import et `<Analytics />` retirés ; `<CookieBanner />` reste monté.
- `components/layout/Footer.tsx` : liens légaux EN `/en/mentions-legales` et `/en/confidentialite` (404) → table `LEGAL` vers `/en/legal-notice` et `/en/privacy` (routes vérifiées présentes dans `app/en/`).

### ✅ [⚠️ Identité] Favicon — `27adf85`
- `app/icon.svg` : monogramme sarcelle hors palette → **mêmes 3 barres de croissance que le logo**, blanches sur `#A32922` (accent de la palette). 1:1.

## besttennisshoes.be

### ✅ [⚠️ Identité] Footer = balle de tennis — `d78a41c`
- `Footer.tsx` : éclair template → même SVG balle que la Nav (classe `mark mark-ball`, `var(--ball)` / `var(--ball-seam)`).
- `Nav.tsx` + `Footer.tsx` : coutures du mark avec `style={{ fill: 'none' }}` pour neutraliser la règle générique `.nav .logo .mark svg path { fill: var(--primary) }` qui les remplissait en croissants (défaut relevé par l'audit UX du 2026-09-30). Aucun autre changement.
- RGPD et Auteur déjà conformes → non touchés (idempotent).

## gestion-copropriete.be — ⏸ aucune écriture

- **RGPD** : aucun traceur servi (layout `app/layout.site.tsx` sans Analytics, CSP `connect-src 'self'`) → pas de bandeau nécessaire, conforme.
- **Identité** : wordmark texte sans éclair, favicon propre → pas de défaut bloquant ; non touché.
- **Auteur — REPORTÉ, arbitrage humain requis.** L'audit demande d'enrichir la bio de **Claude O.** avec un signal E-E-A-T (expérience, qualification). Or `site/lib/seo.ts` porte une décision explicite du site (D1 du 2026-09-25, `docs/AUTHOR-claude-o.md`, `docs/CONTENT-SPEC.md` règle 3) : *« bio limitée à des faits vrais : aucune carrière ni expérience inventée »*. Inventer un parcours contredirait cette règle propre au site ; je ne l'ai pas fait. À trancher : (a) fournir des éléments vrais d'expérience pour la bio, ou (b) lever la règle 3 et basculer sur un persona du réseau. Le prénom « Claude » (lu comme l'IA) est à arbitrer dans la même décision. L'avatar suit la même décision.

---

## Reporté (prochain run / autres domaines)

- **OG anti-footprint (5 sites, `SiteOgImage`)** : ★ en filigrane, barre en dégradé, ligne de services désactivés (quiz/simulateur). Composant partagé à refactorer avec soin (consommé par `app/opengraph-image.tsx` + `app/en/opengraph-image.tsx`) ; non traité ce run faute de temps, priorité ⚠️.
- **Favicons gabarit « disque + lettre »** : remplacés sur hotel-bruges, carte-bancaire (déjà carré), lave-linge, compte-epargne. Restent : shampoing (famille beauté, à garder cohérent avec la teinte), besttennisshoes (« B » Arial → balle, à faire).
- **Auteur — localisation EN** (tous sites template) : bio/jobTitle non traduits sur les pages auteur EN, `author.url` JSON-LD et liens AuthorCard non localisés ; `longBio` = doublon de `bio`. Hotel-bruges : page auteur EN affiche bio FR.
- **Résidus template non rendus** : `content/pages/mentions-legales.yaml` (TODO), `content/settings.yaml`, `public/icons/brand/logo.svg` (lave-linge, aria-label « 10min-template ») — suppression = opération destructive, laissée à l'humain.
- **gestion-copropriete** : `app/layout.tsx` mort qui monte encore `<Analytics />` (non servi grâce à `pageExtensions`) et `niche.config.ts` au placeholder template — nettoyage à valider ; droits RGPD incomplets (opposition, limitation, portabilité, transfert hors UE) sur la page mentions/confidentialité.
- **Politique FR `/confidentialite`** (5 sites template) : à aligner sur le bandeau comme la version EN (mention du consentement + adresse du siège si absente).
- **Hors domaine** : besttennisshoes expose une locale NL (« jamais de NL ») → audit UX/tech.

## À vérifier au déploiement (câblage prouvé par lecture, build non exécuté ici)

1. **Bandeau** sur les 5 sites : s'affiche en FR sur `/`, en EN sur `/en/*`, disparaît après choix ; **aucune requête `/_vercel/insights` avant « Accepter »** ni après « Refuser ».
2. **Marks** hotel-bruges, carte-bancaire, lave-linge : rendu header + footer en light/dark. Hypothèse : la règle `.logo .mark svg path` peint le tracé plein comme elle peignait l'éclair (même structure SVG). Vérifier le contraste du mark sur sa pastille.
3. **Favicons** (`app/icon.svg`) des 4 sites modifiés : servis par Next via `<link rel="icon">`.
4. **Portrait Hélène D.** : `/auteurs/helene-d` et AuthorCard affichent `/images/authors/helene-d.jpg` (vérifier qu'aucun autre composant ne code le chemin `.webp` en dur).
5. **besttennisshoes** : coutures de la balle visibles en trait (plus de croissants pleins) en Nav et Footer.
6. **compte-epargne** : liens footer EN « Legal notice » / « Privacy » → 200.

---

*Rien d'écrasé par du vide, aucun contenu réduit, aucune suppression de fichier. Exports et signatures publiques conservés (`CookieBanner`, `Footer`, `Nav`). Périmètre : uniquement les 7 sites du rapport.*
