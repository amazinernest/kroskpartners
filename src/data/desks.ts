export interface TradingDesk {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  settlement: string;
  executionMode: string;
  minLotSize: string;
  counterparties: string;
  instruments: string[];
  specs: { label: string; value: string }[];
  rfqDeskName: string;
}

export const TRADING_DESKS: TradingDesk[] = [
  {
    id: 'bonds',
    number: '01',
    title: 'Government & Corporate Bonds',
    tagline: 'Sovereign Benchmark & Investment-Grade Corporate Debt',
    description: 'We intermediate primary and secondary runs across the complete Nigerian sovereign yield curve (FGN Bonds 2Y to 30Y tenors), Sukuk sovereign issues, sub-national debt, and senior corporate bond runs with strict pre-trade anonymity and sharp two-way pricing.',
    settlement: 'T+2 Business Days (DvP)',
    executionMode: 'FMDQ Voice & STP Intermediation',
    minLotSize: '₦50,000,000 Face Value',
    counterparties: 'PFAs, Commercial Banks, Merchant Banks, Insurers',
    instruments: [
      'FGN Benchmark Bonds (2Y to 30Y)',
      'Federal Government of Nigeria Sukuk',
      'Sub-National State Infrastructure Bonds',
      'Investment-Grade Corporate Debentures'
    ],
    specs: [
      { label: 'Market Framework', value: 'FMDQ OTC Secondary Market' },
      { label: 'Standard Settlement', value: 'T+2 Business Days (DvP)' },
      { label: 'Coupon Convention', value: 'Semi-Annual (Actual/Actual)' },
      { label: 'Wholesale Lot Size', value: '₦50,000,000+' },
      { label: 'Quotation Mode', value: 'Clean Price & Yield-To-Maturity' },
      { label: 'Clearing Channel', value: 'CSCS DvP Settlement' }
    ],
    rfqDeskName: 'Government & Corporate Bonds'
  },
  {
    id: 'tbills',
    number: '02',
    title: 'Treasury Bills (NTBs & OMO)',
    tagline: 'Short-Term Discount Sovereign Debt & Central Bank Paper',
    description: 'Continuous two-way price discovery for 91-Day, 182-Day, and 364-Day Nigerian Treasury Bills (NTBs) as well as CBN Open Market Operations (OMO) bills. We connect active bank treasuries and buy-side portfolio managers seeking high-velocity yield adjustments.',
    settlement: 'T+0 Same-Day / T+2 Settlement',
    executionMode: 'FMDQ Best-Execution Protocol',
    minLotSize: '₦100,000,000 Nominal',
    counterparties: 'Discount Houses, Bank Treasuries, PFAs, Asset Managers',
    instruments: [
      '91-Day Sovereign Discount Bills',
      '182-Day Sovereign Discount Bills',
      '364-Day Benchmark Sovereign Bills',
      'CBN Open Market Operations (OMO) Bills'
    ],
    specs: [
      { label: 'Day-Count Basis', value: 'Actual / 365 Days' },
      { label: 'Price Discovery', value: 'Real-time Discount Rate & True Yield' },
      { label: 'Standard Settlement', value: 'T+0 / T+2 DvP' },
      { label: 'Wholesale Min Lot', value: '₦100,000,000 Nominal' },
      { label: 'Clearing Engine', value: 'Central Securities Clearing System (CSCS)' },
      { label: 'Regulatory Body', value: 'FMDQ OTC / CBN Supervised' }
    ],
    rfqDeskName: 'Treasury Bills'
  },
  {
    id: 'moneymarket',
    number: '03',
    title: 'Commercial Papers & Money Market',
    tagline: 'High-Grade Corporate Working Capital & Interbank Liquidity',
    description: 'Short-term wholesale liquidity intermediation matching blue-chip corporate issuers (MTN, Dangote, BUA, Flour Mills) with institutional treasurers seeking significant yield enhancement over sovereign paper, supported by interbank placements and repo financing.',
    settlement: 'T+0 / T+1 / T+2 Bespoke',
    executionMode: 'Bespoke Institutional Intermediation',
    minLotSize: '₦50,000,000 Face Value',
    counterparties: 'Corporate Treasurers, PFA Money Market Funds, Banks',
    instruments: [
      'Investment-Grade Commercial Papers (CPs)',
      'Banker’s Acceptances & Promissory Notes',
      'Interbank Placements & Tenor Matches',
      'Open Buy Back (OBB) & Repo Intermediation'
    ],
    specs: [
      { label: 'Tenor Profiles', value: '90 to 270 Days' },
      { label: 'Credit Ratings', value: 'A- to AAA Only' },
      { label: 'Wholesale Min Lot', value: '₦50,000,000 Face Value' },
      { label: 'Yield Spread', value: '150 – 400 bps over Sovereign NTBs' },
      { label: 'Affirmation Protocol', value: 'FMDQ OTC Commercial Paper Registry' },
      { label: 'Clearing Channels', value: 'CSCS & Commercial Settlement Banks' }
    ],
    rfqDeskName: 'Money Market & Commercial Papers'
  },
  {
    id: 'eurobonds',
    number: '04',
    title: 'Nigerian Eurobonds (USD)',
    tagline: 'Cross-Border Sovereign & Tier-1 Corporate Foreign Currency Debt',
    description: 'Offshore and domestic execution for institutional asset managers, family offices, and foreign portfolio investors managing Federal Republic of Nigeria USD Eurobonds (2025 to 2051 maturities) and Tier-1 Nigerian Bank USD senior notes.',
    settlement: 'T+2 Business Days (DvP International)',
    executionMode: 'Global OTC & Clearing Conduits',
    minLotSize: '$200,000 Nominal',
    counterparties: 'Offshore Asset Managers, Domestic PFAs, Private Wealth Desks',
    instruments: [
      'Federal Republic of Nigeria USD Eurobonds (2027, 2031, 2047)',
      'Tier-1 Nigerian Bank USD Senior Notes (Access, Zenith, UBA)',
      'Diaspora Sovereign USD Bonds',
      'Supranational African Development USD Facilities'
    ],
    specs: [
      { label: 'Settlement Custody', value: 'Euroclear & Clearstream' },
      { label: 'Denomination Currency', value: 'United States Dollars (USD)' },
      { label: 'Day Count Convention', value: '30 / 360 Semi-Annual' },
      { label: 'Wholesale Min Lot', value: '$200,000 Nominal' },
      { label: 'Execution Protocol', value: 'STP Messaging & Direct Desk Voice' },
      { label: 'Benchmark Maturities', value: '2025, 2027, 2031, 2038, 2047, 2051' }
    ],
    rfqDeskName: 'Nigerian Eurobonds (USD)'
  }
];
