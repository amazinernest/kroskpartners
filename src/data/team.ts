export interface TeamMember {
  name: string;
  role: string;
  category: 'Executive' | 'Brokers' | 'Governance';
  bio: string;
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Olushola Adeniyi',
    role: 'Chief Executive Officer / IDB',
    category: 'Executive',
    bio: 'Seasoned fixed income strategist and Inter-Dealer Broker leading KPL’s market positioning, counterparty relationships, institutional desk mandates, and macro research commentaries.',
    image: '/assets/images/team/olushola-adeniyi.webp'
  },
  {
    name: 'Lookman Oladimeji',
    role: 'Chief Operating Officer (COO)',
    category: 'Executive',
    bio: 'Oversees operational infrastructure, trading desk execution systems, institutional clearing coordination, and corporate workflows across all secondary market desks.',
    image: '/assets/images/team/lookman-oladimeji.jpg'
  },
  {
    name: 'Damilola Adeniyi',
    role: 'Chief Financial Officer (CFO)',
    category: 'Executive',
    bio: 'Directs financial governance, institutional capital allocation, fiscal planning, and enterprise risk management across Krosk Partners operations.',
    image: '/assets/images/team/damilola-adeniyi.webp'
  },
  {
    name: 'Olusola Olowookere',
    role: 'Sales Broker / RM',
    category: 'Brokers',
    bio: 'Manages institutional counterparty relationships across Pension Fund Administrators (PFAs), asset management firms, and commercial bank insurance treasuries.',
    image: '/assets/images/team/olusola-olowookere.webp'
  },
  {
    name: 'Ayodele Adetimehin',
    role: 'Sales Broker / RM',
    category: 'Brokers',
    bio: 'Specializes in sovereign and corporate bond distribution, wholesale liquidity intermediation, and primary dealer counterparty order fulfillment.',
    image: '/assets/images/team/ayodele-adetimehin.webp'
  },
  {
    name: 'Ajibola Adeniyi',
    role: 'Desk Manager',
    category: 'Brokers',
    bio: 'Directs cross-functional desk coordination, trade confirmations, institutional mandate workflows, and day-to-day trading floor support.',
    image: '/assets/images/team/ajibola-adeniyi.webp'
  },
  {
    name: 'Oluwaseyi Akindutire',
    role: 'Trader / Broker',
    category: 'Brokers',
    bio: 'Active fixed income trader executing benchmark Treasury Bills, FGN Bonds, and Money Market liquidity runs across OTC secondary markets.',
    image: '/assets/images/team/oluwaseyi-akindutire.webp'
  },
  {
    name: 'Anthony Ogbebor',
    role: 'HR & Compliance Manager',
    category: 'Governance',
    bio: 'Supervises regulatory compliance, FMDQ adherence, institutional code of conduct, AML/KYC policies, and human capital governance.',
    image: '/assets/images/team/anthony-ogbebor.jpg'
  },
  {
    name: 'Olusegun Koleosho',
    role: 'Accountant',
    category: 'Governance',
    bio: 'Manages institutional accounting controls, trade settlement audits, financial reporting, and statutory regulatory filings.',
    image: '/assets/images/team/olusegun-koleosho.webp'
  },
  {
    name: 'Rukayat Adisa',
    role: 'Operations Specialist',
    category: 'Governance',
    bio: 'Coordinates trade matching verification, post-trade documentation, counterparty confirmations, and CSCS settlement tracking.',
    image: '/assets/images/team/rukayat-adisa.webp'
  }
];
