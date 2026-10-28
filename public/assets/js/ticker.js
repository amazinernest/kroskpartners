/**
 * KROSK PARTNERS LIMITED — REAL-TIME OTC MARKET TICKER
 * Simulates institutional FMDQ indicative runs across Nigerian fixed income benchmarks
 */

(function() {
  'use strict';

  // Authentic Nigerian Capital Markets Benchmarks
  const MARKET_DATA = [
    { code: 'FGN 13.53% 2025', category: 'Bonds', yieldVal: '19.45%', change: '+12 bps', dir: 'up' },
    { code: 'FGN 12.50% 2026', category: 'Bonds', yieldVal: '19.85%', change: '-08 bps', dir: 'down' },
    { code: 'FGN 16.28% 2027', category: 'Bonds', yieldVal: '20.15%', change: '+05 bps', dir: 'up' },
    { code: 'FGN 14.55% 2029', category: 'Bonds', yieldVal: '20.60%', change: '00 bps', dir: 'neutral' },
    { code: 'FGN 12.14% 2034', category: 'Bonds', yieldVal: '21.20%', change: '+15 bps', dir: 'up' },
    { code: 'FGN 12.98% 2050', category: 'Bonds', yieldVal: '21.75%', change: '-10 bps', dir: 'down' },
    { code: 'NTB 91-DAY', category: 'T-Bills', yieldVal: '16.50%', change: '+20 bps', dir: 'up' },
    { code: 'NTB 182-DAY', category: 'T-Bills', yieldVal: '17.80%', change: '-05 bps', dir: 'down' },
    { code: 'NTB 364-DAY', category: 'T-Bills', yieldVal: '21.12%', change: '+18 bps', dir: 'up' },
    { code: 'NGN EUROBOND 2027', category: 'Eurobonds', yieldVal: '9.45%', change: '-14 bps', dir: 'down' },
    { code: 'NGN EUROBOND 2031', category: 'Eurobonds', yieldVal: '10.25%', change: '+08 bps', dir: 'up' },
    { code: 'NGN EUROBOND 2047', category: 'Eurobonds', yieldVal: '11.10%', change: '-04 bps', dir: 'down' },
    { code: 'CBN MPR', category: 'Macro', yieldVal: '27.25%', change: '+50 bps', dir: 'up' },
    { code: 'CALL / REPO (OBB)', category: 'Money Market', yieldVal: '28.50%', change: '-35 bps', dir: 'down' },
    { code: 'COMMERCIAL PAPER 180D', category: 'Money Market', yieldVal: '22.40%', change: '+10 bps', dir: 'up' }
  ];

  function populateTicker() {
    const track = document.getElementById('marketTickerTrack');
    if (!track) return;

    // Duplicate list to allow seamless infinite CSS marquee loop
    const combined = [...MARKET_DATA, ...MARKET_DATA];
    
    let html = '';
    combined.forEach(item => {
      const arrow = item.dir === 'up' ? '▲' : item.dir === 'down' ? '▼' : '■';
      html += `
        <div class="ticker-item">
          <span class="ticker-instrument">${item.code}</span>
          <span class="ticker-yield">${item.yieldVal}</span>
          <span class="ticker-change ${item.dir}">${arrow} ${item.change}</span>
        </div>
      `;
    });

    track.innerHTML = html;
  }

  function updateMarketClock() {
    const clockEl = document.getElementById('marketClock');
    if (!clockEl) return;

    const now = new Date();
    // Format in West Africa Time (UTC+1, Lagos)
    const options = {
      timeZone: 'Africa/Lagos',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeStr = now.toLocaleTimeString('en-US', options);
    
    // Check if trading day and hours (Mon-Fri 8:00 AM - 5:00 PM WAT)
    const day = now.getDay();
    const hour = now.getUTCHours() + 1; // Lagos UTC+1
    const isOpen = (day >= 1 && day <= 5) && (hour >= 8 && hour < 17);

    clockEl.innerHTML = `
      <span>LAGOS: ${timeStr} WAT</span>
      <span style="opacity: 0.4; margin: 0 4px;">|</span>
      <span style="color: ${isOpen ? 'var(--market-up)' : 'var(--color-accent-gold)'}; font-weight: 700;">
        ${isOpen ? 'OTC MARKET OPEN' : 'OTC INDICATIVE CLOSE'}
      </span>
    `;
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    populateTicker();
    updateMarketClock();
    setInterval(updateMarketClock, 1000);
  });
})();
