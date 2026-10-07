'use client'

/**
 * EpargneCompare : deux comptes d'épargne réglementés côte à côte, en euros.
 * Usage MDX : <EpargneCompare />
 *
 * Répond à une seule question : avec CE capital et CE versement mensuel, sur CETTE
 * durée, combien d'intérêts chaque compte a-t-il réellement produits, une fois le
 * plafond de versement appliqué et la prime de fidélité comptée seulement quand elle
 * est acquise.
 *
 * 'use client' isolé (même patron que FaqAccordion) : les pages article restent
 * Server Component. Calcul 100 % côté client, aucune dépendance, aucun appel réseau,
 * aucun stockage navigateur. Styles inline sur les tokens de app/globals.css.
 *
 * Modèle MENTION : aucun lien sortant, aucun CTA de souscription.
 */

import { useState } from 'react'

/* ─────────────── Calcul (fonctions pures) ─────────────── */

export type ResultatCompte = {
  /** Somme entrée sur le compte au terme de la durée. */
  place: number
  /** Somme restée dehors à cause du plafond de versement. */
  nonPlace: number
  /** Intérêts de base, au prorata des mois de présence. */
  base: number
  /** Primes de fidélité acquises (périodes de douze mois complètes). */
  primeAcquise: number
  /** Primes en cours d'acquisition au terme : perdues en cas de retrait ce jour-là. */
  primeEnCours: number
  /** base + primeAcquise. */
  total: number
}

/**
 * Hypothèses, toutes affichées dans l'interface :
 *  - le capital de départ est disponible au mois 0, le versement mensuel arrive à
 *    partir du mois 1 (convention du comparateur Wikifin) ;
 *  - chaque mois, on verse tout ce qui est disponible, dans la limite du plafond ;
 *    ce qui ne rentre pas attend le mois suivant, sans rémunération ;
 *  - taux de base : dépôt × taux × mois de présence / 12 (mois de 1/12 d'année) ;
 *  - prime : dépôt × taux pour chaque période de douze mois complète ;
 *  - taux constants, intérêts non réinvestis, aucun retrait.
 */
export function simulerCompte(
  capital: number,
  mensuel: number,
  mois: number,
  tauxBasePct: number,
  tauxPrimePct: number,
  plafondMensuel: number,
): ResultatCompte {
  const b = tauxBasePct / 100
  const p = tauxPrimePct / 100
  let reserve = 0
  let place = 0
  let base = 0
  let primeAcquise = 0
  let primeEnCours = 0
  for (let k = 0; k < mois; k++) {
    const dispo = reserve + (k === 0 ? capital : mensuel)
    const depot = plafondMensuel > 0 ? Math.min(plafondMensuel, dispo) : dispo
    reserve = dispo - depot
    const reste = mois - k
    base += (depot * b * reste) / 12
    primeAcquise += depot * p * Math.floor(reste / 12)
    primeEnCours += (depot * p * (reste % 12)) / 12
    place += depot
  }
  return { place, nonPlace: reserve, base, primeAcquise, primeEnCours, total: base + primeAcquise }
}

export type Seuil = { capital: number; avant: 'A' | 'B' } | null

/**
 * Capital de départ à partir duquel le classement des deux comptes s'inverse, à
 * versement mensuel et durée constants. Balayage de 100 € en 100 € jusqu'à 300 000 €,
 * puis dichotomie à l'euro près. `null` si le classement ne change jamais.
 */
export function seuilDeBascule(
  mensuel: number,
  mois: number,
  a: { base: number; prime: number; plafond: number },
  b: { base: number; prime: number; plafond: number },
): Seuil {
  const ecart = (c: number) =>
    simulerCompte(c, mensuel, mois, a.base, a.prime, a.plafond).total -
    simulerCompte(c, mensuel, mois, b.base, b.prime, b.plafond).total
  const EPS = 0.005
  let precC = 100
  let prec = ecart(precC)
  for (let c = 200; c <= 300000; c += 100) {
    const cur = ecart(c)
    if (Math.abs(prec) > EPS && Math.abs(cur) > EPS && prec > 0 !== cur > 0) {
      let lo = precC
      let hi = c
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2
        if (ecart(mid) > 0 === prec > 0) lo = mid
        else hi = mid
      }
      return { capital: Math.round((lo + hi) / 2), avant: prec > 0 ? 'A' : 'B' }
    }
    if (Math.abs(cur) > EPS) {
      prec = cur
      precC = c
    }
  }
  return null
}

/* ─────────────── Textes FR / EN ─────────────── */

const T = {
  fr: {
    titre: 'Deux comptes d’épargne, un seul chiffre qui compte : les euros',
    vous: 'Votre épargne',
    capital: 'Capital déjà disponible (€)',
    mensuel: 'Versement mensuel (€)',
    duree: 'Durée sans retrait (mois)',
    dureeAide: 'De 1 à 120 mois. La prime de fidélité n’est acquise qu’après 12 mois pleins.',
    compte: 'Compte',
    nom: 'Nom du compte',
    base: 'Taux de base (%)',
    prime: 'Prime de fidélité (%)',
    plafond: 'Plafond de versement (€ par mois, 0 = aucun)',
    srcA:
      'Par défaut : KBC Start2Save, 1,65 % + 1,50 %, 500 € par mois. Source : page produit KBC, consultée le 7 octobre 2026.',
    srcB:
      'Par défaut : Keytrade High Fidelity, 0,50 % + 1,50 %, sans plafond. Source : relevé Test-Achats du 21 septembre 2026, recoupé le 7 octobre 2026.',
    modif: 'Toutes les valeurs sont modifiables : remplacez-les par celles de la fiche d’informations clés de votre compte.',
    resultat: 'Résultat au terme de la durée',
    lPlace: 'Somme entrée sur le compte',
    lDehors: 'Somme restée dehors (plafond)',
    lBase: 'Intérêts de base',
    lPrime: 'Primes de fidélité acquises',
    lTotal: 'Intérêts acquis, bruts',
    lCours: 'Prime en cours, perdue si vous retirez ce jour-là',
    lRdt: 'Rendement annuel sur tout l’argent disponible',
    egal: 'Sur cette durée, les deux comptes produisent la même somme.',
    gagne: (n: string, e: string, m: number) => `${n} rapporte ${e} de plus sur ${m} mois.`,
    dehors: (n: string, e: string) =>
      `Attention : ${e} ne sont jamais entrés sur ${n} à cause du plafond de versement. Cet argent est compté ici comme ne rapportant rien.`,
    seuil: (c: string, avant: string, apres: string) =>
      `Seuil de bascule : en dessous de ${c} de capital de départ, ${avant} rapporte plus ; au-dessus, ${apres} passe devant (même versement mensuel, même durée).`,
    pasSeuil: 'Aucun seuil de bascule jusqu’à 300 000 € de capital : le classement ne dépend pas du capital de départ avec ces réglages.',
    court:
      'Durée inférieure à 12 mois : aucune prime de fidélité n’est acquise. Seul le taux de base est encaissé.',
    pm: 'Au-delà de 1 020 € d’intérêts par personne et par an (revenus 2026, source Wikifin/FSMA, page du 12 mai 2026), un précompte mobilier de 15 % s’applique à l’excédent sur un compte réglementé. Il n’est pas déduit ici.',
    hypTitre: 'Hypothèses du calcul',
    hyp: [
      'Capital de départ versé au mois 0, versement mensuel à partir du mois 1 (convention du comparateur de comptes d’épargne de Wikifin).',
      'Chaque mois, tout l’argent disponible est versé, dans la limite du plafond. Le surplus attend le mois suivant sans être rémunéré.',
      'Taux de base : dépôt × taux × mois de présence ÷ 12. Les banques comptent en jours : l’écart ne dépasse pas un ou deux jours d’intérêts de base par versement.',
      'Prime de fidélité : dépôt × taux, pour chaque période de 12 mois complète. Elle est payée le premier jour du trimestre qui suit son acquisition.',
      'Taux supposés constants. En réalité, le taux de base peut changer à tout moment ; la prime est figée 12 mois à partir de chaque versement.',
      'Intérêts non réinvestis, aucun retrait, plafond de solde total non géré, précompte mobilier non déduit.',
    ],
    avisTitre: 'Une estimation, pas un décompte',
    avis:
      'Seuls le décompte de votre banque et la fiche d’informations clés pour l’épargnant font foi. Cet outil compare des conditions ; il ne recommande aucun placement et ne constitue pas un conseil personnalisé. Pour comparer tous les comptes du marché, le comparateur officiel de Wikifin (FSMA) est la référence.',
    invalide: 'Indiquez un capital ou un versement mensuel supérieur à zéro.',
  },
  en: {
    titre: 'Two savings accounts, one figure that matters: euros',
    vous: 'Your savings',
    capital: 'Capital already available (€)',
    mensuel: 'Monthly deposit (€)',
    duree: 'Period with no withdrawal (months)',
    dureeAide: 'From 1 to 120 months. The loyalty bonus is only earned after 12 full months.',
    compte: 'Account',
    nom: 'Account name',
    base: 'Base rate (%)',
    prime: 'Loyalty bonus (%)',
    plafond: 'Deposit cap (€ per month, 0 = none)',
    srcA:
      'Default: KBC Start2Save, 1.65% + 1.50%, €500 per month. Source: KBC product page, accessed 7 October 2026.',
    srcB:
      'Default: Keytrade High Fidelity, 0.50% + 1.50%, no cap. Source: Test-Achats survey of 21 September 2026, cross-checked 7 October 2026.',
    modif: 'Every value can be edited: replace them with the figures on your own account’s key information sheet.',
    resultat: 'Result at the end of the period',
    lPlace: 'Amount that entered the account',
    lDehors: 'Amount left outside (cap)',
    lBase: 'Base interest',
    lPrime: 'Loyalty bonuses earned',
    lTotal: 'Interest earned, gross',
    lCours: 'Bonus still accruing, lost if you withdraw that day',
    lRdt: 'Annual yield on all the money available',
    egal: 'Over this period, both accounts produce the same amount.',
    gagne: (n: string, e: string, m: number) => `${n} earns ${e} more over ${m} months.`,
    dehors: (n: string, e: string) =>
      `Note: ${e} never entered ${n} because of the deposit cap. That money is counted here as earning nothing.`,
    seuil: (c: string, avant: string, apres: string) =>
      `Tipping point: below ${c} of starting capital, ${avant} earns more; above it, ${apres} moves ahead (same monthly deposit, same period).`,
    pasSeuil: 'No tipping point up to €300,000 of capital: with these settings the ranking does not depend on starting capital.',
    court: 'Period shorter than 12 months: no loyalty bonus is earned. Only the base rate is collected.',
    pm: 'Above €1,020 of interest per person per year (2026 income, source Wikifin/FSMA, page dated 12 May 2026), a 15% withholding tax applies to the excess on a regulated account. It is not deducted here.',
    hypTitre: 'Assumptions behind the calculation',
    hyp: [
      'Starting capital deposited in month 0, monthly deposit from month 1 (the convention used by Wikifin’s savings account comparator).',
      'Each month, all available money is deposited, up to the cap. The surplus waits for the next month and earns nothing meanwhile.',
      'Base rate: deposit × rate × months held ÷ 12. Banks count in days: the gap is no more than one or two days of base interest per deposit.',
      'Loyalty bonus: deposit × rate, for each complete 12-month period. It is paid on the first day of the quarter after it is earned.',
      'Rates assumed constant. In practice the base rate can change at any time; the bonus is locked for 12 months from each deposit.',
      'Interest not reinvested, no withdrawals, total balance caps not handled, withholding tax not deducted.',
    ],
    avisTitre: 'An estimate, not a statement',
    avis:
      'Only your bank’s own statement and the key information sheet for savers are authoritative. This tool compares conditions; it recommends no investment and is not personal advice. To compare every account on the market, the official Wikifin (FSMA) comparator is the reference.',
    invalide: 'Enter a starting capital or a monthly deposit above zero.',
  },
} as const

/* ─────────────── Helpers d'affichage ─────────────── */

function lire(s: string): number {
  const n = parseFloat(s.replace(/\s/g, '').replace(',', '.'))
  return Number.isFinite(n) && n >= 0 ? n : 0
}

/** Format monétaire maison : évite tout écart serveur/navigateur d'Intl à l'hydratation. */
function euros(n: number, en: boolean): string {
  const [ent, dec] = Math.abs(n).toFixed(2).split('.')
  const groupes = ent.replace(/\B(?=(\d{3})+(?!\d))/g, en ? ',' : ' ')
  const signe = n < 0 ? '-' : ''
  return en ? `${signe}€${groupes}.${dec}` : `${signe}${groupes},${dec} €`
}

function pourcent(n: number, en: boolean): string {
  const s = n.toFixed(2)
  return en ? `${s}%` : `${s.replace('.', ',')} %`
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: 'var(--space-1)',
} as const

const inputStyle = {
  width: '100%',
  minHeight: '44px',
  padding: 'var(--space-2) var(--space-3)',
  fontSize: '16px',
  font: 'inherit',
  color: 'var(--text-primary)',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-sm)',
} as const

const aideStyle = {
  fontSize: '12px',
  lineHeight: 1.5,
  color: 'var(--text-muted)',
  margin: 'var(--space-1) 0 0',
} as const

function Champ({
  id,
  label,
  value,
  onChange,
  aide,
  texte = false,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  aide?: string
  texte?: boolean
}) {
  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={texte ? 'text' : 'decimal'}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
      {aide ? <p style={aideStyle}>{aide}</p> : null}
    </div>
  )
}

function Ligne({ label, a, b, fort = false }: { label: string; a: string; b: string; fort?: boolean }) {
  const cell = {
    padding: 'var(--space-2) var(--space-3)',
    borderBottom: '1px solid var(--border)',
    fontSize: '14px',
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: fort ? 700 : 400,
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
  } as const
  return (
    <tr>
      <th
        scope="row"
        style={{ ...cell, textAlign: 'left', whiteSpace: 'normal', fontWeight: fort ? 700 : 400, color: 'var(--text-secondary)' }}
      >
        {label}
      </th>
      <td style={cell}>{a}</td>
      <td style={cell}>{b}</td>
    </tr>
  )
}

/* ─────────────── Composant ─────────────── */

export function EpargneCompare({ locale = 'fr' }: { locale?: string }) {
  const en = locale === 'en'
  const t = en ? T.en : T.fr

  const [capital, setCapital] = useState('10000')
  const [mensuel, setMensuel] = useState('0')
  const [duree, setDuree] = useState('12')

  const [nomA, setNomA] = useState('KBC Start2Save')
  const [baseA, setBaseA] = useState(en ? '1.65' : '1,65')
  const [primeA, setPrimeA] = useState(en ? '1.50' : '1,50')
  const [plafA, setPlafA] = useState('500')

  const [nomB, setNomB] = useState('Keytrade High Fidelity')
  const [baseB, setBaseB] = useState(en ? '0.50' : '0,50')
  const [primeB, setPrimeB] = useState(en ? '1.50' : '1,50')
  const [plafB, setPlafB] = useState('0')

  const C = lire(capital)
  const M = lire(mensuel)
  const H = Math.min(120, Math.max(1, Math.round(lire(duree)) || 1))
  const A = { base: Math.min(lire(baseA), 20), prime: Math.min(lire(primeA), 20), plafond: lire(plafA) }
  const B = { base: Math.min(lire(baseB), 20), prime: Math.min(lire(primeB), 20), plafond: lire(plafB) }

  const valide = C > 0 || M > 0
  const rA = simulerCompte(C, M, H, A.base, A.prime, A.plafond)
  const rB = simulerCompte(C, M, H, B.base, B.prime, B.plafond)
  const seuil = valide ? seuilDeBascule(M, H, A, B) : null

  // Argent disponible pondéré par sa durée de disponibilité, en euros-années.
  const eurosAnnees = (C * H) / 12 + (M * (H * (H - 1))) / 24
  const rdt = (r: ResultatCompte) => (eurosAnnees > 0 ? (r.total / eurosAnnees) * 100 : 0)

  const lA = nomA.trim() || `${t.compte} A`
  const lB = nomB.trim() || `${t.compte} B`
  // Écart calculé sur les totaux arrondis au centime, pour rester cohérent avec le tableau.
  const ecart = Math.round(rA.total * 100) / 100 - Math.round(rB.total * 100) / 100
  const parAn = (r: ResultatCompte) => (r.total / H) * 12

  const carte = {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-4)',
    background: 'var(--bg-primary)',
  } as const
  const sousTitre = {
    fontFamily: 'var(--next-font-mono), monospace',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--accent-2)',
    margin: '0 0 var(--space-3)',
  } as const
  const note = { fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 var(--space-3)' } as const

  return (
    <section
      aria-label={t.titre}
      style={{
        margin: 'var(--space-8) 0',
        padding: 'var(--space-5)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-strong)',
        borderTop: '3px solid var(--accent-2)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: '18px',
          fontWeight: 800,
          lineHeight: 1.3,
          color: 'var(--text-primary)',
          margin: '0 0 var(--space-4)',
        }}
      >
        {t.titre}
      </p>

      <div style={{ ...carte, marginBottom: 'var(--space-4)' }}>
        <p style={sousTitre}>{t.vous}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0 var(--space-4)' }}>
          <Champ id="ec-capital" label={t.capital} value={capital} onChange={setCapital} />
          <Champ id="ec-mensuel" label={t.mensuel} value={mensuel} onChange={setMensuel} />
          <Champ id="ec-duree" label={t.duree} value={duree} onChange={setDuree} aide={t.dureeAide} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <div style={carte}>
          <p style={sousTitre}>{t.compte} A</p>
          <Champ id="ec-nom-a" label={t.nom} value={nomA} onChange={setNomA} texte />
          <Champ id="ec-base-a" label={t.base} value={baseA} onChange={setBaseA} />
          <Champ id="ec-prime-a" label={t.prime} value={primeA} onChange={setPrimeA} />
          <Champ id="ec-plaf-a" label={t.plafond} value={plafA} onChange={setPlafA} aide={t.srcA} />
        </div>
        <div style={carte}>
          <p style={sousTitre}>{t.compte} B</p>
          <Champ id="ec-nom-b" label={t.nom} value={nomB} onChange={setNomB} texte />
          <Champ id="ec-base-b" label={t.base} value={baseB} onChange={setBaseB} />
          <Champ id="ec-prime-b" label={t.prime} value={primeB} onChange={setPrimeB} />
          <Champ id="ec-plaf-b" label={t.plafond} value={plafB} onChange={setPlafB} aide={t.srcB} />
        </div>
      </div>
      <p style={{ ...aideStyle, margin: 'var(--space-3) 0 var(--space-5)' }}>{t.modif}</p>

      <div aria-live="polite">
        <p style={sousTitre}>{t.resultat}</p>
        {!valide ? (
          <p style={{ ...note, color: 'var(--error)', fontWeight: 600 }}>{t.invalide}</p>
        ) : (
          <>
            <div style={{ overflowX: 'auto', marginBottom: 'var(--space-4)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0 }}>
                <thead>
                  <tr>
                    <td style={{ padding: 'var(--space-2) var(--space-3)', borderBottom: '2px solid var(--border-strong)' }} />
                    {[lA, lB].map((n, i) => (
                      <th
                        key={i}
                        scope="col"
                        style={{
                          padding: 'var(--space-2) var(--space-3)',
                          borderBottom: '2px solid var(--border-strong)',
                          textAlign: 'right',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          background: 'transparent',
                          whiteSpace: 'normal',
                          letterSpacing: 0,
                        }}
                      >
                        {n}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <Ligne label={t.lPlace} a={euros(rA.place, en)} b={euros(rB.place, en)} />
                  <Ligne label={t.lDehors} a={euros(rA.nonPlace, en)} b={euros(rB.nonPlace, en)} />
                  <Ligne label={t.lBase} a={euros(rA.base, en)} b={euros(rB.base, en)} />
                  <Ligne label={t.lPrime} a={euros(rA.primeAcquise, en)} b={euros(rB.primeAcquise, en)} />
                  <Ligne label={t.lTotal} a={euros(rA.total, en)} b={euros(rB.total, en)} fort />
                  <Ligne label={t.lRdt} a={pourcent(rdt(rA), en)} b={pourcent(rdt(rB), en)} />
                  <Ligne label={t.lCours} a={euros(rA.primeEnCours, en)} b={euros(rB.primeEnCours, en)} />
                </tbody>
              </table>
            </div>

            <p style={{ ...note, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {Math.abs(ecart) < 0.005
                ? t.egal
                : ecart > 0
                  ? t.gagne(lA, euros(ecart, en), H)
                  : t.gagne(lB, euros(-ecart, en), H)}
            </p>
            <p style={note}>
              {seuil
                ? t.seuil(euros(seuil.capital, en), seuil.avant === 'A' ? lA : lB, seuil.avant === 'A' ? lB : lA)
                : t.pasSeuil}
            </p>
            {rA.nonPlace > 0.005 ? <p style={{ ...note, color: 'var(--accent-1)', fontWeight: 600 }}>{t.dehors(lA, euros(rA.nonPlace, en))}</p> : null}
            {rB.nonPlace > 0.005 ? <p style={{ ...note, color: 'var(--accent-1)', fontWeight: 600 }}>{t.dehors(lB, euros(rB.nonPlace, en))}</p> : null}
            {H < 12 ? <p style={{ ...note, color: 'var(--accent-1)', fontWeight: 600 }}>{t.court}</p> : null}
            {parAn(rA) > 1020 || parAn(rB) > 1020 ? <p style={note}>{t.pm}</p> : null}
          </>
        )}
      </div>

      <details style={{ margin: 'var(--space-4) 0', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-3)' }}>
        <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', minHeight: '32px' }}>
          {t.hypTitre}
        </summary>
        <ul style={{ margin: 'var(--space-3) 0 0', paddingLeft: '1.25em', listStyle: 'disc outside' }}>
          {t.hyp.map((h, i) => (
            <li key={i} style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              {h}
            </li>
          ))}
        </ul>
      </details>

      <div role="note" style={{ borderTop: '2px solid var(--accent-2)', paddingTop: 'var(--space-3)' }}>
        <p style={sousTitre}>{t.avisTitre}</p>
        <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{t.avis}</p>
      </div>
    </section>
  )
}
