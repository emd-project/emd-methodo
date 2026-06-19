# Journal des corrections — Conformité & Identité — 2026-06-19

Source : `pipeline/audits/conformite-LATEST.md` (2026-06-19). Doctrine : `skills/emd-fix/SKILL.md` 1.5.1 + `skills/humaniser-fr/SKILL.md` + `references/garde-fous.md`.
Périmètre appliqué : **Légal & RGPD · Identité (favicon/logo/OG) · Auteur/E-E-A-T** uniquement. Écriture en prod, édits ciblés, câblage réel vérifié (§0).

> **Note branches.** Deux repos n'ont **pas** de branche `main` ; leur branche live (déployée Vercel) est la branche par défaut. Pour ne pas créer de `main` orpheline divergente (= correctif fantôme), les commits y ont été poussés sur la branche **réellement rendue** :
> - `meilleure-voiture-electrique` → `claude/no-image-spec-generator-nTjFC`
> - `meilleure-carte-credit.be` → `claude/setup-nextjs-apple-guide-En4gb`
> Tous les autres sites : `main`.

---

## meilleure-voiture.be — `main`
**Corrigé :**
- **Identité (favicon)** — favicon non servi → ajout de `app/icon.svg` (carré naval `#1C3FAA` + voiture blanche). Next sert l'icône automatiquement via la convention `app/icon.*`. ✅ câblé.
- **Identité (logo)** — SVG inline « spark/étoile » générique dans `components/layout/Nav.tsx` remplacé par une **silhouette de voiture sur mesure** (même mécanique CSS `.mark` ; seul le `d` du path change → fill `var(--primary)` conservé). ✅ câblé (source rendue).
- **Identité (OG)** — `app/opengraph-image.tsx` : template réseau générique (`#0A0A0F` + dégradé `#FF3D57/#7B61FF/#3DFFC0` + watermark « 10 ») remplacé par un OG **propre à la niche auto** (gradient naval, barre d'accent palette du site, eyebrow « Comparateur auto belge », catégories réelles, filigrane voiture, wordmark domaine). ✅ source effective (prime sur og statique).
- **Auteur/E-E-A-T (avatar)** — portrait réel **Julien Vanderhaeghe** poussé en `public/images/authors/julien-vanderhaeghe.webp` → câblé via le slot auto `author-{slug}` (`lib/image-slots.ts` + `AuthorCard`/`ImagePlaceholder`). ✅ câblé.

**À vérifier :** rendu de `julien-vanderhaeghe.webp` (octets JPEG sous extension `.webp` — `next/image` ré-encode par sniff de contenu, rendu attendu OK ; confirmer visuellement).

## quel-operateur-choisir.be — `main`
**Corrigé :**
- **Identité (logo, anti-footprint)** — mark « barres de signal » monochrome `var(--primary)` (générique réutilisable) rendu unique : **une couleur par univers** (mobile bleu / internet teal / TV rose / packs orange), conforme à la signature DA du site. Appliqué dans `components/layout/Nav.tsx` (FR) **et** `app/en/layout.tsx` (header EN) ; footer EN gardé monochrome (`mono="#fff"`). Couleurs en `style` inline pour primer sur toute règle `.mark svg path`. ✅ câblé (2 rendus).
- **Identité (OG, anti-footprint)** — `app/opengraph-image.tsx` : template réseau générique remplacé par un OG **identité « Signal »** (ivoire chaud, barre 5-couleurs, motif barres multicolore, marque violette, wordmark `quel·opérateur.`). ✅

## meilleur-fournisseur-energie.be — `main`
**Corrigé :**
- **Identité (unification marque, anti-footprint)** — la flamme/goutte sur mesure du Nav FR était contredite par un **éclair générique** (`M13 2 4.5 13.5…`, aria-label « Voltéo » par défaut) sur le favicon, le header/footer EN **et** le footer FR. Flamme/goutte posée partout :
  - `app/icon.svg` (forme flamme, bg `#0D1626`, fill `#3D5AFE`),
  - `app/en/layout.tsx` (composant `Bolt`→`Flame`, header + footer EN),
  - `components/layout/Footer.tsx` (footer FR, fill `#fff`). ✅ câblé (chaque rendu).
- **Auteur/E-E-A-T (bio)** — bio de **Camille Mertens** étoffée (mono-paragraphe → bio E-E-A-T : depuis 2019, Bruxelles, fournisseurs nommés Engie/Luminus/TotalEnergies/Mega/Octa+/Bolt, paramètres indexés + CREG, jargon traduit), via doctrine `humaniser-fr`. `niche.config.ts`. ✅

**Reporté / à faire :** avatar réel de Camille — moteur « Voltéo » rend un **monogramme CSS** (`.byline .avatar` / `.author-card .avatar`), pas d'`ImagePlaceholder`/slot. Câblage = édition du composant auteur (rendu `<img>` + fallback). Portrait généré, non encore poussé (cf. file d'attente images). **Build-sensible → non tenté en autonome (garde-fous §2).**

## meilleure-voiture-electrique.be — `claude/no-image-spec-generator-nTjFC` (branche live)
**Corrigé :**
- **RGPD (déclaration cookies)** — `components/ui/CookieConsent.tsx` annonçait « mesure d'audience anonyme via **Google Analytics** » + embarquait du code `gtag`/`updateGtagConsent()` **mort** (aucun GA). Texte FR + EN aligné sur « Vercel Analytics anonyme et sans cookie » ; fonction et appels `gtag` retirés (aucune autre référence → build sûr). ✅ aligné avec `/cookies` et `/confidentialite`.

**Reporté / à faire :** avatar de Christophe — site magazine (slot `author-{slug}`), **s'auto-câblera** au simple push de `public/images/authors/{slug}.webp`. Portrait en file d'attente (non récupéré ce run).

## meilleure-carte-credit.be — `claude/setup-nextjs-apple-guide-En4gb` (branche live)
**Corrigé :**
- **RGPD (tracker non gaté — quasi-bloquant)** — `@vercel/analytics` était monté **inconditionnellement** dans `app/layout.tsx` (avant tout consentement), en contradiction avec la politique « aucun outil d'analyse tiers ». **Analytics retiré** (import + `<Analytics />`). Choix le plus cohérent et le plus sûr : rend le site conforme à sa propre politique + au texte du bandeau (« no analytics tracking ») sans réécrire la politique ni introduire de logique. ✅
  - *Alternative si l'audience est souhaitée plus tard :* réintroduire le pattern `GatedAnalytics` (présent sur les sites frères) + corriger la politique en conséquence.
- **Identité (OG, anti-footprint)** — `app/opengraph-image.tsx` : template réseau générique (partagé avec voiture + opérateur) remplacé par un OG **« éditorial papier »** propre à la niche (crème `#F5EFE6`, barre rouge/vert/or, motif carte de crédit, wordmark). ✅

**Reporté / à faire :** avatar de Sophie Laurent — moteur `app/[lang]` **sans** `lib/image-slots.ts` ; câblage à confirmer (composant auteur dédié). Portrait **généré et prêt**, non poussé faute de chemin de câblage confirmé (évite le correctif fantôme).

## meilleur-suv.be — `main`
**Reporté / à faire :** avatar de Maxime Delvaux — site magazine (slot `author-{slug}`), s'auto-câblera au push de `public/images/authors/maxime-delvaux.webp`. Portrait en file d'attente. *Note audit : couleurs en dur dans `icon.svg` hors palette — cosmétique, non traité (hors périmètre strict).*

## meilleure-voiture-familiale.be — `main`
**Reporté / à faire :** avatar d'Audrey Pirard — idem (slot `author-{slug}`, auto-câblage au push). Portrait en file d'attente.

## meilleures-assurances-auto.be — `main`
**Rien à faire** — tout ✅ à l'audit (avatar photo réel `thomas-renard.webp`, favicon servi, logo + OG uniques, RGPD conforme). Sert de **modèle** de câblage avatar (slot `author-{slug}`).

---

## Synthèse images auteur (E-E-A-T)
7 portraits 1:1 photoréalistes générés ce run (Nano Banana). **Infra de génération dégradée** : 2 prêts en 10 s, **5 bloqués en file > 30 min**. Récupérés : `julien-vanderhaeghe` (poussé + câblé, voiture), `sophie-laurent` (prêt, câblage carte-credit à confirmer). En attente (job_id idempotents, à repousser au prochain run) : maxime-delvaux (suv), audrey-pirard (familiale), christophe-fontaine (électrique), maxime-dubois (opérateur), camille-mertens (énergie).

**Auto-câblage au push** (slot `author-{slug}`, zéro code) : voiture ✅, suv, familiale, électrique.
**Câblage composant requis** (monogramme CSS / moteur sans slot) : énergie, opérateur, carte-credit → à faire hors autonomie (build-sensible).

## Hors périmètre (signalé, non touché)
- Tokens DA en dur dans `globals.css :root` (énergie, opérateur) au lieu de `niche.config.palette` — refonte DA, **signalée**, jamais auto.
- `niche.config.locales=['fr']` alors qu'un arbre EN est rendu (énergie) → hreflang EN non émis : correctif routing **build-sensible**, à faire à la main.
- Mineurs cosmétiques (sous-titre OG « FR/NL/EN », bandeau sans `lang`, couleurs `icon.svg` hors palette) : non traités, faible impact.
