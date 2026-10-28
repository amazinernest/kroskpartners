/**
 * KROSK PARTNERS LIMITED — DIGITENCY CONTROLLER
 * Pure Vanilla JavaScript: Interactive Accordions, Modals, Yield Calculator & Navigation
 */

(function () {
  'use strict';

  // 1. Sticky Navbar on Scroll
  function initStickyNavbar() {
    const navbar = document.querySelector('.rt-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Navigation Toggle & Dropdown Handling
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileNavToggle') || document.getElementById('mobileMenuButton');
    const navMenu = document.getElementById('primaryNavMenu');
    if (!toggleBtn || !navMenu) return;

    function closeMenu() {
      navMenu.classList.remove('mobile-open');
      toggleBtn.classList.remove('w--open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function toggleMenu() {
      const isOpen = navMenu.classList.toggle('mobile-open');
      toggleBtn.classList.toggle('w--open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        closeMenu();
      }
    });

    // Mobile dropdown toggle
    const dropdownToggle = navMenu.querySelector('.rt-dropdown-toggle');
    const dropdownList = navMenu.querySelector('.rt-navbar-dropdown-list');
    if (dropdownToggle && dropdownList) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          e.stopPropagation();
          dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
        }
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        if (navMenu.classList.contains('mobile-open')) {
          closeMenu();
        }
      }
    });

    // Close mobile menu on link navigation or action buttons
    const navActions = navMenu.querySelectorAll('a:not(.rt-dropdown-toggle), button');
    navActions.forEach((item) => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
          closeMenu();
        }
      });
    });
  }

  // 3. Interactive Vertical Accordion (Trading Desks)
  function initVerticalAccordion() {
    const boxes = document.querySelectorAll('.rt-vartical-according-box');
    if (!boxes.length) return;

    boxes.forEach((box) => {
      box.addEventListener('click', function (e) {
        // Prevent if clicking on an interactive button inside the box
        if (e.target.closest('button') || e.target.closest('a')) return;

        boxes.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Links with data-desk-index
    const deskLinks = document.querySelectorAll('[data-desk-index]');
    deskLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const index = parseInt(this.getAttribute('data-desk-index'), 10);
        const targetBox = document.querySelector('.rt-vartical-according-box[data-index="' + index + '"]');
        if (targetBox) {
          boxes.forEach((b) => b.classList.remove('active'));
          targetBox.classList.add('active');
          targetBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  // 4. RFQ Modal Controller
  function initRfqModal() {
    const modal = document.getElementById('rfqModal');
    const closeBtn = document.getElementById('rfqModalClose');
    const deskSelect = document.getElementById('rfqDeskSelect');
    const form = document.getElementById('rfqForm');
    const openBtns = document.querySelectorAll('[data-open-rfq]');

    if (!modal) return;

    function openModal(deskName) {
      if (deskSelect && deskName) {
        for (let i = 0; i < deskSelect.options.length; i++) {
          if (deskSelect.options[i].value.toLowerCase().includes(deskName.toLowerCase()) ||
              deskName.toLowerCase().includes(deskSelect.options[i].value.toLowerCase())) {
            deskSelect.selectedIndex = i;
            break;
          }
        }
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const desk = btn.getAttribute('data-desk') || '';
        openModal(desk);
      });
    });

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

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Transmitting to Trading Desk...</span>';
        }

        setTimeout(() => {
          form.innerHTML = `
            <div style="padding: 30px; background: rgba(8, 100, 48, 0.08); border: 1px solid var(--color--krosk-green); border-radius: 16px; text-align: center;">
              <div style="font-size: 3rem; color: var(--color--krosk-green); margin-bottom: 12px;">&#10003;</div>
              <h3 style="margin: 0 0 10px; font-size: 26px; color: var(--color--dark-olive-brown);">RFQ Transmitted to Trading Floor</h3>
              <p style="font-size: 14.5px; line-height: 1.6; color: var(--color--dark-khaki); margin-bottom: 20px;">
                Your institutional quote request has been transmitted confidentially to our registered brokers at 6, Tunde Fisayo Street, Lekki Phase 1, Lagos. A dedicated broker will call or message your desk directly.
              </p>
              <div style="display: inline-block; padding: 10px 20px; background: #fff; border-radius: 100px; font-family: 'Antonio', sans-serif; font-size: 15px; font-weight: 600; color: var(--color--krosk-green); border: 1px solid var(--color--krosk-green);">
                DIRECT DESK: +234 803 801 8023
              </div>
            </div>
          `;
        }, 1000);
      });
    }
  }

  // 5. Interactive Yield & Settlement Calculator
  function initYieldCalculator() {
    const form = document.getElementById('quickCalcForm');
    if (!form) return;

    const secType = document.getElementById('simSecurityType');
    const faceValInput = document.getElementById('simFaceValue');
    const rateInput = document.getElementById('simRate');
    const daysInput = document.getElementById('simDays');

    const resConsideration = document.getElementById('resConsideration');
    const resDiscount = document.getElementById('resDiscount');
    const resEffectiveYield = document.getElementById('resEffectiveYield');

    function calculate() {
      const type = secType.value;
      const faceValue = parseFloat(faceValInput.value) || 0;
      const rate = (parseFloat(rateInput.value) || 0) / 100;
      const days = parseFloat(daysInput.value) || 1;

      let consideration = 0;
      let discountOrCoupon = 0;
      let effectiveYield = 0;

      if (type === 'tbill' || type === 'cp') {
        const discountFraction = (rate * days) / 360;
        discountOrCoupon = faceValue * discountFraction;
        consideration = faceValue - discountOrCoupon;

        if (consideration > 0) {
          effectiveYield = ((faceValue - consideration) / consideration) * (365 / days) * 100;
        }
      } else if (type === 'bond' || type === 'eurobond') {
        const annualCoupon = faceValue * rate;
        discountOrCoupon = annualCoupon * (days / 365);
        consideration = faceValue + discountOrCoupon;
        effectiveYield = rate * 100;
      }

      const prefix = type === 'eurobond' ? '$' : '₦';

      if (resConsideration) {
        resConsideration.textContent = prefix + Math.round(consideration).toLocaleString('en-US');
      }
      if (resDiscount) {
        resDiscount.textContent = prefix + Math.round(discountOrCoupon).toLocaleString('en-US');
      }
      if (resEffectiveYield) {
        resEffectiveYield.textContent = effectiveYield.toFixed(2) + '%';
      }
    }

    [secType, faceValInput, rateInput, daysInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', calculate);
        input.addEventListener('change', calculate);
      }
    });

    calculate();
  }

  // Initialize all controllers
  document.addEventListener('DOMContentLoaded', () => {
    initStickyNavbar();
    initMobileMenu();
    initVerticalAccordion();
    initRfqModal();
    initYieldCalculator();
  });
})();
