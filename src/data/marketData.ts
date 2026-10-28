export interface MarketQuote {
  code: string;
  category: 'Bonds' | 'T-Bills' | 'Eurobonds' | 'Money Market' | 'Macro';
  yieldVal: string;
  change: string;
  dir: 'up' | 'down' | 'neutral';
  tenor?: string;
  indicativePrice?: string;
}

export const MARKET_DATA: MarketQuote[] = [
  { code: 'FGN 13.53% 2025', category: 'Bonds', yieldVal: '19.45%', change: '+12 bps', dir: 'up', tenor: '1Y', indicativePrice: '94.20' },
  { code: 'FGN 12.50% 2026', category: 'Bonds', yieldVal: '19.85%', change: '-08 bps', dir: 'down', tenor: '2Y', indicativePrice: '88.50' },
  { code: 'FGN 16.28% 2027', category: 'Bonds', yieldVal: '20.15%', change: '+05 bps', dir: 'up', tenor: '3Y', indicativePrice: '92.10' },
  { code: 'FGN 14.55% 2029', category: 'Bonds', yieldVal: '20.60%', change: '00 bps', dir: 'neutral', tenor: '5Y', indicativePrice: '81.40' },
  { code: 'FGN 12.14% 2034', category: 'Bonds', yieldVal: '21.20%', change: '+15 bps', dir: 'up', tenor: '10Y', indicativePrice: '62.75' },
  { code: 'FGN 12.98% 2050', category: 'Bonds', yieldVal: '21.75%', change: '-10 bps', dir: 'down', tenor: '25Y', indicativePrice: '58.30' },
  { code: 'NTB 91-DAY', category: 'T-Bills', yieldVal: '16.50%', change: '+20 bps', dir: 'up', tenor: '91D', indicativePrice: '95.82' },
  { code: 'NTB 182-DAY', category: 'T-Bills', yieldVal: '17.80%', change: '-05 bps', dir: 'down', tenor: '182D', indicativePrice: '91.75' },
  { code: 'NTB 364-DAY', category: 'T-Bills', yieldVal: '21.12%', change: '+18 bps', dir: 'up', tenor: '364D', indicativePrice: '82.45' },
  { code: 'NGN EUROBOND 2027', category: 'Eurobonds', yieldVal: '9.45%', change: '-14 bps', dir: 'down', tenor: 'USD 3Y', indicativePrice: '97.60' },
  { code: 'NGN EUROBOND 2031', category: 'Eurobonds', yieldVal: '10.25%', change: '+08 bps', dir: 'up', tenor: 'USD 7Y', indicativePrice: '91.80' },
  { code: 'NGN EUROBOND 2047', category: 'Eurobonds', yieldVal: '11.10%', change: '-04 bps', dir: 'down', tenor: 'USD 23Y', indicativePrice: '83.25' },
  { code: 'CBN POLICY RATE (MPR)', category: 'Macro', yieldVal: '27.25%', change: '+50 bps', dir: 'up' },
  { code: 'CALL / REPO (OBB)', category: 'Money Market', yieldVal: '28.50%', change: '-35 bps', dir: 'down' },
  { code: 'COMMERCIAL PAPER 180D', category: 'Money Market', yieldVal: '22.40%', change: '+10 bps', dir: 'up', tenor: '180D', indicativePrice: '89.92' }
];

export const TRUST_PARTNERS = [
  'FMDQ OTC SECURITIES EXCHANGE (ASSOCIATE MEMBER)',
  'CENTRAL BANK OF NIGERIA (CBN SUPERVISED ECOSYSTEM)',
  'DEBT MANAGEMENT OFFICE NIGERIA (DMO PRIMARY DEALER NETWORK)',
  'PENOP (PENSION FUND OPERATORS OF NIGERIA)',
  'LICENSED COMMERCIAL & MERCHANT BANKS',
  'CENTRAL SECURITIES CLEARING SYSTEM (CSCS)',
  'DROSK COMPANY LIMITED (PARENT HOLDING ENTERPRISE)'
];
