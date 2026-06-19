# Référence — pipeline logo & favicon EMD (Gemini → vectorisation SVG)

Objectif : des marques **dessinées**, pas des SVG géométriques génériques tracés à la main (c'est ce qui donnait les logos « nuls »). On **génère le SYMBOLE avec Gemini**, puis on le **vectorise en SVG propre** (tintable, net à 16px). Chaîne **validée** : `vtracer` (pip) en mode silhouette → 1 seul `<path>`, ~5 Ko, rendu OK à 64px **et** 16px.

## Règles dures (sinon « logo IA » raté)
- **Symbole SEUL dans l'image — JAMAIS le nom/texte** (Gemini écrit mal → artefacts). Le **wordmark = texte CSS** dans la font display du site, posé à côté du mark.
- **Bold & simple** : formes pleines, fort contraste, 1 idée graphique. Doit rester lisible réduit à **16px** (favicon). Pas de fins détails, pas de dégradé, pas de 3D, pas de « swoosh » générique.
- **Mono-silhouette tintable** par défaut : le mark final est un SVG `fill="currentColor"` → il prend la couleur de marque via CSS et s'adapte light/dark.
- **Unique par site** (anti-footprint) : symbole différent d'un site à l'autre, cohérent avec la niche + la direction DA choisie.

## Pipeline (validé — à suivre tel quel)
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
   convert -background none /tmp/mark.clean.svg -resize 16x16 /tmp/c16.png   # contrôle lisibilité favicon
   ```
4. **Câbler** (câblage réel, cf. `emd-fix` §0) :
   - **Logo header** : pose le `<svg>` nettoyé **inline dans `Nav.tsx`**, dimensionné par CSS (height ~24-28px), tinté `color: var(--accent-1)`. **Wordmark = texte CSS** à côté (font display).
   - **Favicon** : écris le `<svg>` nettoyé dans **`app/icon.svg`** (Next sert `<link rel="icon">` auto).
   - Supprime tout reste de thème par défaut (`emd·template`).

## Garde-fous
- Silhouette sale (multi-path, bruit) → **régénère un symbole plus simple** (varier le filename `-v2`) plutôt que bricoler le SVG.
- Mark illisible à 16px → simplifie le prompt (moins d'éléments). Le favicon prime sur le détail.
- Variante 2 couleurs possible (`colormode='color'`, `color_precision` bas) mais la **silhouette mono tintable** reste le défaut (plus net, plus petit, s'adapte au thème).
- Respecte `references/garde-fous.md` : idempotent (ne refais pas un logo déjà propre), ne casse pas le `Nav.tsx` existant.
