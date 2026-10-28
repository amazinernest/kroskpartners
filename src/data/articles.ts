export interface Article {
  slug: string;
  title: string;
  category: string;
  deskTag: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  pullQuote: string;
  excerpt: string;
  image: string;
  content: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'money-bags',
    title: 'Money Bags',
    category: 'Finance and Investing',
    deskTag: 'Fixed Income Desk',
    author: 'Olushola Adeniyi',
    authorRole: 'Chief Executive Officer / Inter-Dealer Broker',
    date: 'July 5, 2023',
    readTime: '4 min read',
    pullQuote: 'No matter the stochastic belly of the curve analysis done in this market, the truth is we will remain bid, there is more money than instruments.',
    excerpt: 'An incisive retrospective on persistent rate hikes, sovereign borrowing pressure, and liquidity re-pricing across Nigerian sovereign debt.',
    image: '/assets/images/insights/money-bags.jpg',
    content: [
      'We are definitely done with borrowing for this year now!!! Oh, maybe we are borrowing from now for next year’s budget!!! The 50s are almost out of supply, so I need to buy duration now!!! There might be no more issuance of the 50s as they have done 930bn!!! The 26s look cheap vs the rest of the curve so I can use them to pick some short-end yield!!! When I stock my house with the finest whiskey ahead of a potential FX devaluation, it’s because I have the cash. I probably would have still bought what was needed if prices went up or down. No matter the stochastic belly of the curve analysis done in this market, the truth is we will remain bid, there is more money than instruments.',
      'Wednesday auction saw the DMO continue its trend of overselling which matches our theory that the deficit was more than needed and we are still aggressive borrowers as a nation. We expect this trend to continue till the end of the year with about another 1trn still needed before the end of the year. We think the market has the money and the DMO won’t have a problem with bids.',
      'The question remains value and where we see long-term rates ahead of much more aggressive borrowing plan next year. The sale on the 26s to 11.65 from a MTM of around 11% was very interesting and truly there is value there for someone that’s been aggressively buying at 11% and below pre-auction given it was trading at 10.40 before addition to the auction calendar. On the bond curve, this has the most value in our view.',
      'Short-duration pair trades continue to look attractive going into the end of the year given our bearish view. We had advised some short 50s vs long 36s at around 10-15bps which has opened to around 35bps and we think that is where value exists. A relative yield pair trade is a short 45s or 49s vs long 50s, another interesting trade we think will make long term money, but we think repo on those 45s and 49s are tough to find given the market is net short and the technical might make it hard to realize the profit. But even in a rally, the 45s get to around 12 where there are loads of sellers and 50s will be a profit king if that happens.',
      'Let me end my ranting. We believe yields will have an upward trend at some point this year, issuance of a new bond to replace the 50s, a market realization that bonds will continue to be oversold, money market remaining at 14% or even going higher as the CBN continues to supply $$$ to corporates. Money bags is/are not limitless. It will be a very interesting end to the year, please wear your seatbelts tight, it’s a bumpy ride.'
    ]
  },
  {
    slug: 'ngn-deficit',
    title: 'NGN Deficit 101, 102, 103',
    category: 'Fiscal & Debt Analysis',
    deskTag: 'Sovereign Borrowing Window',
    author: 'Olushola Adeniyi',
    authorRole: 'Chief Executive Officer / Inter-Dealer Broker',
    date: 'July 5, 2023',
    readTime: '3 min read',
    pullQuote: 'Please let me refer you to page 16 of the prospectus where all our analysis broke down... While we are expecting another NGN450bn left to issue this year, the number seems to be another NGN1.40trn left to borrow.',
    excerpt: 'Detailed prospectus dissection investigating why the DMO remains aggressive in the borrowing window and the true fiscal deficit scale.',
    image: '/assets/images/insights/ngn-deficit.jpg',
    content: [
      'Since the last NGN bond issuance, we have been spending some time to understand why DMO, by our calculations having very little debt left to issue this year continues to remain aggressive in the borrowing window. Our first thought was to do with the FOMC in the US and their possible rate hike or insinuation, of which we previously wrote our views. However, with a long 9hr road-trip ahead of me and time to kill, I decided to read more around this Euro-bond prospectus provided ahead of the last month issuance.',
      'Please let me refer you to page 16 of the prospectus where all our analysis broke down. Into the year, we had a NGN4.6trn budget deficit, we had a NGN1trn supplementary budget passed, taking us to NGN5.6trn deficit. However, on page 16, we have a NGN6.449trn deficit. Is this a typo error? Well, I tried to put the revenue and expenditure on excel and still got the same NGN6.449trn.',
      'So what does this mean? So while me and my learned colleagues are busy expecting another NGN450bn left to issue this year, the number seems to be another NGN1.40trn left to borrow. Yes we have raised an extra $1bn from the Euro-bond and we might tap it again, but we definitely have a lot more to borrow than we thought. At this point I will leave the analysis of the market to the more capable and studious minds.'
    ]
  },
  {
    slug: 'market-hangover',
    title: 'Market Hangover (Part 1)',
    category: 'Market Structure',
    deskTag: 'Maturity & Coupon Cycles',
    author: 'Krosk Partners Desk',
    authorRole: 'Institutional Trading Desk',
    date: 'July 5, 2023',
    readTime: '4 min read',
    pullQuote: 'Market yesterday felt like a hangover from a wild party. We were there, we had fun, paid the bills and when we saw the bank statement, just couldn’t believe it.',
    excerpt: 'Examining post-rally liquidity dynamics, coupon reinvestments, and the technical mechanics behind curve repricing.',
    image: '/assets/images/insights/market-hangover.jpg',
    content: [
      'Market yesterday felt like a hangover from a wild party. We were there, we had fun, paid the bills and when we saw the bank statement, just couldn’t believe it. The rally has been immense on the back of the anticipated Jan 2022 bond maturity and coupons but felt overdone and we saw some reversal. But as I have always stated in this market, there is more money than investment opportunities, hence we might see some 20-50bps volatility, but we are not going anywhere. Most of the selling seems to be market-driven with clients on the sideline cherry-picking good bonds into the panic.',
      'With little to no CRR debit, the market is awash with liquidity but there seems to be a feeling the debit will be this week, a lack of which could potentially spur another leg of the rally.',
      'The short end of the curve remains largely bid with the 26s experiencing some correction, albeit conservatively. Most of the selling seems to be on the long end of the curve, 42s-50s. The belly of the curve 34s-37s still holding in well with relative value making it remain attractive and a seemingly large buyer.',
      'Today, we expect the buying trend to remain the same although I do not think we will see as many buyers of the long end as we saw yesterday. The real buyers seem to want a better compensation for the duration difference between the 37s and the 49s with the 42s not seemingly very attractive due to its availability at auction. Fundamentals of bond issuance, fuel subsidy, supplementary budgets and how far yields can move would be interesting topics to discuss, but as I said, we are still drinking espresso for our hangover.'
    ]
  },
  {
    slug: 'we-going-up',
    title: 'WE GOING UP, WE WANT THE WORLD TO KNOW, GOT TO LET MEFFY SHOW!!!',
    category: 'Monetary Policy',
    deskTag: 'Central Bank Decisions',
    author: 'Olushola Adeniyi',
    authorRole: 'Chief Executive Officer / Inter-Dealer Broker',
    date: 'July 5, 2023',
    readTime: '5 min read',
    pullQuote: 'Interest rate increased by 150bps to the highest it has been in more than two decades... Of a more significant immediate impact is the 500bps increase in CRR to be provisioned by Thursday at each bank.',
    excerpt: 'Comprehensive critique of historic MPR rate hikes, 500bps CRR shocks, and bank liquidity provisioning impacts across Lagos trading desks.',
    image: '/assets/images/template/680f3755b0d5d7c71655943e_brand-image-1.webp',
    content: [
      'Was it expected? Yes. To this scale? Yes. Inflation has gone totally out of hand, and you can call it what it is, a global issue, so you cannot ignore it. Nigeria for the longest time has traded in isolation of the global markets given the substantial amount of local liquidity but we are now in unchartered territory. Interest rate increased by 150bps to the highest it has been in more than two decades.',
      'Of a more significant immediate impact is the 500bps increase in CRR to be provisioned by Thursday at each bank. This will result in the banks needing to raise about ₦2.5trn in short-term liquidity even though we opened 230bn short yesterday. This will be tough, and we would expect to see some ridiculous rates on the short end of the bills curve if at all there are any buyers. PMA today will be highly impacted by this liquidity event, and we don’t expect to see significant participations except from the asset managers. FD should see a more significant impact of this new policy as banks continue to struggle with naira liquidity.',
      'The UST 10yr crossed 4% for the first time since 2008, and the low-interest rate environment as we know it has shifted. Do we chase economic growth or fight inflation? This is the question everyone is facing, and the answer seems the same everywhere: the value of the currency cannot be left to be totally eroded by inflation. The increase in MPR was significant both for size and the tone in the follow up where he continued to reiterate the inability of the MPC to act in isolation with inflation going over the roof. This left room for continued MPR hikes if inflation cannot be reined in; this leaves the market in a bearish state with more uncertainty.',
      'Where do we reprice to? We would expect a minimum of 75-100bps revaluation on the 28s and beyond with the auction bonds probably suffering the most at around 100-200bps reprice. It will be a tough day to make markets, but we will be here working tirelessly to ensure swift and best execution when we see your mandates.'
    ]
  }
];
