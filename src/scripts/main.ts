/**
 * KROSK PARTNERS LIMITED — GLOBAL CLIENT APPLICATION CONTROLLER
 * TypeScript runtime for Navigation, Market Clock, RFQ Flow, and Interactivity
 */

export interface RfqPrefill {
  desk?: string;
  notional?: string;
  targetYield?: string;
}

export function initApp(): void {
  initStickyNavbar();
  initMobileMenu();
  initLagosMarketClock();
  initRfqModal();
}

/** 1. Sticky Blurred Navbar */
function initStickyNavbar(): void {
  const navbar = document.querySelector('.site-header');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/** 2. Mobile Nav Drawer */
function initMobileMenu(): void {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close on inner link click
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/** 3. Real-Time Lagos WAT Market Clock */
function initLagosMarketClock(): void {
  const clockEl = document.getElementById('lagosMarketClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    // West Africa Time (UTC+1, Lagos)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Africa/Lagos',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeStr = now.toLocaleTimeString('en-US', options);

    // Trading hours: Mon-Fri 8:00 AM – 5:00 PM WAT
    // In UTC, Lagos is UTC+1.
    const utcHours = now.getUTCHours();
    const lagosHour = (utcHours + 1) % 24;
    const day = now.getUTCDay(); // 0 is Sunday, 6 is Saturday

    const isWeekday = day >= 1 && day <= 5;
    const isOpen = isWeekday && lagosHour >= 8 && lagosHour < 17;

    clockEl!.innerHTML = `
      <span class="live-dot" style="background-color: ${isOpen ? 'var(--color-emerald)' : '#94A3B8'};"></span>
      <span style="font-weight: 700; color: var(--text-primary);">LAGOS: ${timeStr} WAT</span>
      <span style="color: rgba(0,0,0,0.18);">|</span>
      <span style="font-weight: 800; color: ${isOpen ? 'var(--color-emerald)' : 'var(--color-navy)'};">
        ${isOpen ? 'OTC MARKET OPEN' : 'OTC CLOSE (INDICATIVE)'}
      </span>
    `;
  }

  update();
  setInterval(update, 1000);
}

/** 4. Institutional RFQ Modal Controller */
function initRfqModal(): void {
  const modal = document.getElementById('rfqModal');
  const closeBtn = document.getElementById('rfqModalClose');
  const form = document.getElementById('rfqMandateForm') as HTMLFormElement | null;
  const deskSelect = document.getElementById('rfqDeskSelect') as HTMLSelectElement | null;
  const notionalInput = document.getElementById('rfqNotional') as HTMLInputElement | null;
  const successState = document.getElementById('rfqSuccessState');

  if (!modal) return;

  function open(deskName?: string, prefill?: RfqPrefill) {
    if (deskSelect && deskName) {
      for (let i = 0; i < deskSelect.options.length; i++) {
        const optVal = deskSelect.options[i].value.toLowerCase();
        const optText = deskSelect.options[i].text.toLowerCase();
        const query = deskName.toLowerCase();
        if (optVal.includes(query) || optText.includes(query) || query.includes(optVal)) {
          deskSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (notionalInput && prefill?.notional) {
      notionalInput.value = prefill.notional;
    }

    // Reset view states
    if (form) form.style.display = 'block';
    if (successState) successState.style.display = 'none';

    modal!.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal!.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind all trigger buttons
  document.querySelectorAll('[data-open-rfq]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const desk = btn.getAttribute('data-desk') || undefined;
      open(desk);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      close();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Transmitting to Trading Desk...</span>`;
      }

      setTimeout(() => {
        const ticketRef = 'KPL-' + Math.floor(100000 + Math.random() * 900000);
        const entityName = (document.getElementById('rfqEntityName') as HTMLInputElement)?.value || 'Institutional Member';
        const selectedDesk = deskSelect?.value || 'Fixed Income Desk';

        const refEl = document.getElementById('rfqTicketRef');
        const entityEl = document.getElementById('rfqConfirmEntity');
        const deskEl = document.getElementById('rfqConfirmDesk');

        if (refEl) refEl.textContent = ticketRef;
        if (entityEl) entityEl.textContent = entityName;
        if (deskEl) deskEl.textContent = selectedDesk;

        form.style.display = 'none';
        if (successState) successState.style.display = 'block';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Transmit Order Mandate</span>`;
        }
      }, 900);
    });
  }

  // Expose to window for external component calls (e.g. calculator)
  (window as any).openRfqModal = (desk?: string, prefill?: RfqPrefill) => open(desk, prefill);
}

// Auto-run on DOM ready or immediate if already interactive
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
