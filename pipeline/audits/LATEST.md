> **Dernier audit : 2026-06-18** — source : [`pipeline/audits/audit-2026-06-18.md`](./audit-2026-06-18.md). Fichier consommé par le skill `emd-fix`.

# Audit QA EMD — 2026-06-18

Mode **lecture seule**. Périmètre : sites « Live » + « Configuré » de `pipeline/sites.csv` (8 sites). Doctrine appliquée : `skills/emd-audit/SKILL.md` v1.3.0 + `skills/seo-geo-redaction/SKILL.md`.

**Bilan chiffré** : 8 sites audités · **18 ❌ (bloquants)** · **29 ⚠️ (importants)** · **~9 articles thin content (< 800 mots)**.

Constat transversal n°1 : **7 sites sur 8 sont non conformes RGPD** (pages légales en placeholder + aucun bandeau cookies + tracker chargé sans consentement). Seul `meilleure-carte-credit.be` est propre sur ce volet et constitue la **référence de réseau** à répliquer.

---

## Scorecard

Légende : ✅ conforme · ⚠️ important · ❌ bloquant

| Site | Multi | Contenu | SEO sém | GEO | SEO tech | Identité | Auteur | Images | Légal-RGPD | Resp. | DA | A11y |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| meilleure-voiture.be | ❌ | ⚠️ | ⚠️ | ✅ | ❌ | ✅ | ❌ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ |
| meilleur-suv.be | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ✅ | ✅ | ✅ |
| meilleure-voiture-familiale.be *(Configuré)* | ❌ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ✅ | ❌ | ⚠️ |
| meilleure-voiture-electrique.be | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| quel-operateur-choisir.be | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| meilleur-fournisseur-energie.be | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ❌ | ✅ | ⚠️ | ✅ |
| meilleures-assurances-auto.be | ❌ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ✅ | ✅ | ✅ |
| meilleure-carte-credit.be | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ |

---

## Top des actions prioritaires

1. **🔴 RGPD — bloquant réseau (7 sites).** Aucun bandeau cookies sur `meilleure-voiture.be`, `meilleur-suv.be`, `meilleure-voiture-familiale.be`, `quel-operateur-choisir.be`, `meilleur-fournisseur-energie.be`, `meilleures-assurances-auto.be`, alors que **Vercel Analytics est chargé sans consentement**. Cas `meilleure-voiture-electrique.be` : bandeau présent mais la politique nie l'usage de Google Analytics pourtant chargé. → Déployer le composant cookie conforme de `meilleure-carte-credit.be` et gater les trackers.
2. **🔴 Pages légales « [À compléter] » (6 sites).** Injecter partout l'éditeur : **MentionBox SRL · SRL de droit belge · BE 0784.700.405 · Rue Blanche-Eau 15, 6950 Nassogne, Belgique.**
3. **🔴 Multilingue cassé / interdit (4 sites).** NL interdit sur `meilleur-suv.be` (contenu mort) et `meilleure-voiture-familiale.be` (NL rendu). Mono-FR de fait sur `meilleure-voiture.be` et `meilleures-assurances-auto.be` (switcher non monté, zéro EN). Supprimer tout NL.
4. **🔴 Identité = assets template « 10min » (3 sites).** `meilleur-suv.be` (favicon+logo), `meilleure-voiture-familiale.be` (favicon), `meilleur-fournisseur-energie.be` (OG image). Remplacer.
5. **🔴 Auteur « la rédaction » — cluster Voiture (3 sites).** Créer un auteur humain nommé, crédible et unique par site.

**À suivre (important) :** GEO H2-questions < 70 % sur familiale, energie et plusieurs guides assurances (reformuler les H2 déclaratifs en questions). `Speakable` JSON-LD absent sauf electrique/operateur/carte-credit. Sitemaps statiques sur le cluster Voiture ; hreflang de sitemap cassé sur carte-credit. FAQ souvent à 3-5 Q (cible 6-7).

---

*Pour le détail complet par site, l'anti-footprint et les listes thin content / GEO par article, voir [`audit-2026-06-18.md`](./audit-2026-06-18.md).*
