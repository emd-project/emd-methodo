# Référence — pipeline logo & favicon EMD

**Deux objets distincts, deux méthodes.** Ne pas les confondre — c'est l'erreur qui a produit les favicons illisibles :
- **Favicon (`app/icon.svg`)** → **MONOGRAMME** : rond plein à la couleur de la DA + initiale de la thématique. **Jamais un mark dessiné** (à 16px, une silhouette vectorisée devient une tache).
- **Logo du header (`Nav.tsx` / masthead)** → mark **dessiné** (Gemini → vectorisé), inline et tintable, avec le wordmark en texte CSS à côté.

---

## 1. FAVICON — monogramme (règle par défaut, tous les sites)

Un favicon est vu à **16px**. À cette taille, seules deux formes survivent : un aplat de couleur et une lettre. D'où :

**Contenu EXACT de `app/icon.svg`** (seuls les 4 champs entre accolades varient) :

```svg
<!-- emd-monogram v1 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="{SITE_NAME}">
  <circle cx="32" cy="32" r="32" fill="{ACCENT1}"/>
  <text x="32" y="45.5" text-anchor="middle" fill="{COULEUR_LETTRE}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="0.5">{LETTRE}</text>
</svg>
```

- **`{LETTRE}`** = **première lettre de `niche.entity`**, en MAJUSCULE, **sans accent** (é→E, à→A, ç→C).
  « banque » → `B` · « chocolat » → `C` · « voiture » → `V` · « opérateur » → `O` · « néobanque » → `N`.
  Entity absente ou placeholder → première lettre du **mot thématique du domaine** (`meilleur-suv.be` → `S`,
  `quel-fournisseur-energie.be` → `E`). **Une seule lettre, jamais deux, jamais de texte.**
- **`{ACCENT1}`** = `niche.palette.accent1` (la couleur de DA du site — c'est elle qui distingue les sites entre eux).
- **`{COULEUR_LETTRE}`** = **calculée**, jamais supposée : ratio WCAG entre `#FFFFFF` et `accent1`
  (luminance relative, cf. `references/design-ux-regles.md` §1). **≥ 4,5 → lettre blanche** ; sinon
  **lettre = `niche.palette.textPrimary`** (accent clair : jaune, cyan pâle, beige) ; si ça ne passe toujours
  pas, `#111111`.
- **Ne change ni le `viewBox`, ni les coordonnées, ni `font-size`** : la ligne de base `y="45.5"` centre
  optiquement la capitale dans le rond. Garder le commentaire `<!-- emd-monogram v1 -->` en tête (marqueur
  d'idempotence : un fichier qui commence par cette ligne est déjà fait).

**Pourquoi pas de mark dessiné en favicon** : testé sur tout le parc, illisible à 16px, et coûteux à
générer. Le monogramme est net, unique par site (couleur + lettre), et gratuit.

---

## 2. LOGO DU HEADER — mark dessiné (Gemini → vectorisation SVG)

Objectif : une marque **dessinée**, pas un SVG géométrique générique tracé à la main. On **génère le SYMBOLE avec Gemini**, puis on le **vectorise en SVG propre** (tintable, net). Chaîne **validée** : `vtracer` (pip) en mode silhouette → 1 seul `<path>`, ~5 Ko.

### Règles dures (sinon « logo IA » raté)
- **Symbole SEUL dans l'image — JAMAIS le nom/texte** (Gemini écrit mal → artefacts). Le **wordmark = texte CSS** dans la font display du site, posé à côté du mark.
- **Bold & simple** : formes pleines, fort contraste, 1 idée graphique. Pas de fins détails, pas de dégradé, pas de 3D, pas de « swoosh » générique.
- **Mono-silhouette tintable** par défaut : le mark final est un SVG `fill="currentColor"` → il prend la couleur de marque via CSS et s'adapte light/dark.
- **Unique par site** (anti-footprint) : symbole différent d'un site à l'autre, cohérent avec la niche + la direction DA choisie.

### Pipeline (validé — à suivre tel quel)
1. **Générer le symbole** (Gemini, MCP nano-mentionbox) :
   `generate_image(filename="logo-<site>-mark", aspect_ratio="1:1", prompt="<symbole lié à la niche>, bold flat vector brand icon, single solid shape, high contrast black on white, centered, thick strokes, minimalist, no text, no letters, no words, no gradient, no 3d")` → `wait_for_image(job_id)`.
   Fichier déposé dans `Nano MentionBox/data/images/logo-<site>-mark.jpeg` → chemin sandbox : `/sessions/<id>/mnt/Nano MentionBox/data/images/logo-<site>-mark.jpeg`.
2. **Vectoriser** (sandbox `mcp__workspace__bash`) :
   ```bash
   pip install vtracer --break-system-packages -q
   IN="/sessions/<id>/mnt/Nano MentionBox/data/images/logo-<site>-mark.jpeg"
   # silhouette nette : niveaux de gris + seuil
   convert "$IN" -background white -flatten -colorspace Gray -threshold 55% /tmp/mark.png
   python3 -c "import vtracer; vtracer.convert_image_to_svg_py('/tmp/mark.png','/tmp/mark.svg', colormode='binary', mode='spline', filter_speckle=6, corner_threshold=60, path_precision=4)"
   ```
3. **Nettoyer pour l'inline** (tintable + scalable) :
   ```bash
   python3 - <<'PY'
   import re
   s=open('/tmp/mark.svg').read()
   s=s.replace('fill="#000000"','fill="currentColor"')
   m=re.search(r'width="(\d+)" height="(\d+)"',s); w,h=m.group(1),m.group(2)
   s=re.sub(r'<svg[^>]*>', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="currentColor" aria-hidden="true">', s, count=1)
   s=re.sub(r'<\?xml[^>]*\?>\n?','',s); s=re.sub(r'<!--.*?-->\n?','',s)
   open('/tmp/mark.clean.svg','w').write(s.strip())
   PY
   ```
4. **Câbler** :
   - **Logo header** : pose le `<svg>` nettoyé **inline dans `Nav.tsx`** (ou le masthead en identité presse), dimensionné par CSS (height ~24-28px), tinté `color: var(--accent-1)`. **Wordmark = texte CSS** à côté (font display).
   - **Favicon** : **NE PAS y mettre ce mark** → écrire le **monogramme** du §1 dans `app/icon.svg`.
   - Supprime tout reste de thème par défaut (`emd·template`).

### Garde-fous
- Silhouette sale (multi-path, bruit) → **régénère un symbole plus simple** (varier le filename `-v2`) plutôt que bricoler le SVG.
- Mark trop chargé → simplifie le prompt (moins d'éléments).
- Variante 2 couleurs possible (`colormode='color'`, `color_precision` bas) mais la **silhouette mono tintable** reste le défaut.
- Respecte `references/garde-fous.md` : idempotent (ne refais pas un logo déjà propre), ne casse pas le `Nav.tsx` existant.
