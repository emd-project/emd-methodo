/**
 * lib/i18n/article-slugs.ts — mapping bidirectionnel des slugs d'articles entre locales.
 *
 * Rempli au fil de la publication (la tâche de rédaction quotidienne ajoute une entrée par
 * article). Slug naturel par langue (SEO) → on a besoin du mapping pour :
 *  - le sélecteur de langue (savoir où rediriger, JAMAIS une 404)
 *  - hreflang (pointer vers les bonnes alternates, et seulement si elles existent)
 *  - les redirects (taper un slug FR sur /en/... → bon slug EN)
 *
 * cf. skills/seo-geo-redaction/references/mirror-i18n.md
 */

/** Slugs d'articles FR → EN. */
export const articleSlugFrToEn: Record<string, string> = {
  'frais-bancaires-belgique-2026': 'banking-fees-belgium-2026',
  'compte-a-vue-gratuit-belgique-2026': 'free-current-account-belgium-2026',
  'virement-instantane-banques-belges-tarifs': 'instant-transfer-belgian-banks-fees',
  'lire-document-information-tarifaire-banque': 'read-bank-fee-information-document-belgium',
  'package-ou-compte-de-base-belgique': 'bank-package-or-basic-account-belgium',
  'argenta-compte-green-compte-gratuit': 'argenta-green-account-belgium',
  'keytrade-keypack-compte-gratuit': 'keytrade-keypack-free-account-belgium',
  'prime-de-fidelite-compte-epargne-belgique': 'savings-account-loyalty-bonus-belgium',
  'banque-en-ligne-ou-banque-traditionnelle-belgique': 'online-bank-vs-traditional-bank-belgium',
  'carte-de-debit-ou-carte-de-credit-belgique': 'debit-card-vs-credit-card-belgium',
  'changer-de-banque-belgique-mode-emploi': 'switch-banks-belgium-step-by-step',
  'compte-a-terme-ou-compte-epargne-belgique': 'term-deposit-vs-savings-account-belgium',
  'revolut-belgique-iban-belge': 'revolut-belgium-belgian-iban',
  'compte-bloque-apres-deces-belgique': 'blocked-bank-account-after-death-belgium',
  'frais-hors-zone-euro-banques-belges': 'non-euro-card-fees-belgian-banks',
  'service-bancaire-de-base-belgique': 'basic-banking-service-belgium',
  'transfert-compte-epargne-autre-banque-belgique': 'transfer-savings-account-another-bank-belgium',
  'n26-belgique-compte-gratuit': 'n26-belgium-free-account',
  'simulateur-compte-epargne-belgique': 'savings-account-calculator-belgium',
}

/** Réciproque EN → FR (dérivée automatiquement). */
export const articleSlugEnToFr: Record<string, string> = Object.fromEntries(
  Object.entries(articleSlugFrToEn).map(([fr, en]) => [en, fr]),
)

/**
 * Slug équivalent dans la locale cible, ou `null` si aucune traduction connue.
 * `null` = signal au sélecteur de langue de retomber sur l'accueil (jamais une 404).
 */
export function articleSlugInOrNull(slug: string, from: string, to: string): string | null {
  if (from === to) return slug
  if (from === 'fr' && to === 'en') return articleSlugFrToEn[slug] ?? null
  if (from === 'en' && to === 'fr') return articleSlugEnToFr[slug] ?? null
  return null // autres paires (NL/DE…) : étendre ici si le site ajoute des locales
}

/** Variante tolérante : même slug en dernier recours (pour hreflang best-effort). */
export function translateArticleSlug(slug: string, from: string, to: string): string {
  return articleSlugInOrNull(slug, from, to) ?? slug
}
