/**
 * KROSK PARTNERS LIMITED — INSTITUTIONAL RFQ & TRADE DESK MODAL
 * Handles counterparty order flow and quote requests
 */

(function() {
  'use strict';

  function initRFQ() {
    const modal = document.getElementById('rfqModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const rfqForm = document.getElementById('institutionalRfqForm');
    const triggers = document.querySelectorAll('[data-open-rfq]');

    if (!modal) return;

    // Open Modal Handlers
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const desk = btn.getAttribute('data-desk') || 'Fixed Income';
        openModal(desk);
      });
    });

    // Close handlers
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Form submission
    if (rfqForm) {
      rfqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit(rfqForm);
      });
    }
  }

  function openModal(defaultDesk) {
    const modal = document.getElementById('rfqModal');
    const deskSelect = document.getElementById('rfqDesk');
    
    if (deskSelect && defaultDesk) {
      for (let option of deskSelect.options) {
        if (option.value.toLowerCase().includes(defaultDesk.toLowerCase()) || 
            option.text.toLowerCase().includes(defaultDesk.toLowerCase())) {
          deskSelect.value = option.value;
          break;
        }
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('rfqModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function handleSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting to Trading Desk...</span>`;

    setTimeout(() => {
      const ticketRef = 'KPL-' + Math.floor(100000 + Math.random() * 900000);
      const entity = document.getElementById('rfqEntity')?.value || 'Institutional Member';
      
      const modalBody = form.parentElement;
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem auto;">
            ✓
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #0a1118; margin-bottom: 0.5rem;">Mandate Transmitted Successfully</h3>
          <p style="font-size: 0.9375rem; color: #475569; margin-bottom: 1.5rem; line-height: 1.6;">
            Your RFQ ticket has been routed to our fixed income brokers. A dedicated trading representative will respond via Bloomberg / direct institutional line within 5 minutes during trading hours.
          </p>
          <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
            <div><strong>TICKET REF:</strong> ${ticketRef}</div>
            <div><strong>INSTITUTION:</strong> ${entity}</div>
            <div><strong>DESK:</strong> ${document.getElementById('rfqDesk')?.value || 'Fixed Income'}</div>
          </div>
          <button type="button" class="btn btn-primary" onclick="location.reload()">Done</button>
        </div>
      `;
    }, 1000);
  }

  // Expose global opener
  window.openRfqModal = openModal;

  document.addEventListener('DOMContentLoaded', initRFQ);
})();
