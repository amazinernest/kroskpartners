/**
 * KROSK PARTNERS LIMITED — FIXED INCOME CALCULATOR
 * Accurate standard financial mathematics for Nigerian Treasury Bills and Fixed Rate Bonds
 */

(function() {
  'use strict';

  let currentMode = 'tbills'; // 'tbills' or 'bonds'

  function initCalculator() {
    const tabTBills = document.getElementById('calcTabTBills');
    const tabBonds = document.getElementById('calcTabBonds');
    
    if (tabTBills && tabBonds) {
      tabTBills.addEventListener('click', () => switchTab('tbills'));
      tabBonds.addEventListener('click', () => switchTab('bonds'));
    }

    // T-Bills Inputs
    const tbFaceVal = document.getElementById('tbFaceVal');
    const tbDiscountRate = document.getElementById('tbDiscountRate');
    const tbDays = document.getElementById('tbDays');
    const tbDiscountRange = document.getElementById('tbDiscountRange');

    // Sync slider and number inputs for discount rate
    if (tbDiscountRate && tbDiscountRange) {
      tbDiscountRate.addEventListener('input', (e) => {
        tbDiscountRange.value = e.target.value;
        calculateTBills();
      });
      tbDiscountRange.addEventListener('input', (e) => {
        tbDiscountRate.value = e.target.value;
        calculateTBills();
      });
    }

    if (tbFaceVal) tbFaceVal.addEventListener('input', calculateTBills);
    if (tbDays) tbDays.addEventListener('change', calculateTBills);

    // Bonds Inputs
    const bondFaceVal = document.getElementById('bondFaceVal');
    const bondCoupon = document.getElementById('bondCoupon');
    const bondYTM = document.getElementById('bondYTM');
    const bondYTMRange = document.getElementById('bondYTMRange');
    const bondTenor = document.getElementById('bondTenor');

    if (bondYTM && bondYTMRange) {
      bondYTM.addEventListener('input', (e) => {
        bondYTMRange.value = e.target.value;
        calculateBonds();
      });
      bondYTMRange.addEventListener('input', (e) => {
        bondYTM.value = e.target.value;
        calculateBonds();
      });
    }

    if (bondFaceVal) bondFaceVal.addEventListener('input', calculateBonds);
    if (bondCoupon) bondCoupon.addEventListener('input', calculateBonds);
    if (bondTenor) bondTenor.addEventListener('input', calculateBonds);

    // Initial calculation
    calculateTBills();
  }

  function switchTab(mode) {
    currentMode = mode;
    const tabTBills = document.getElementById('calcTabTBills');
    const tabBonds = document.getElementById('calcTabBonds');
    const formTBills = document.getElementById('formTBills');
    const formBonds = document.getElementById('formBonds');

    if (mode === 'tbills') {
      tabTBills.classList.add('active');
      tabBonds.classList.remove('active');
      formTBills.style.display = 'block';
      formBonds.style.display = 'none';
      calculateTBills();
    } else {
      tabBonds.classList.add('active');
      tabTBills.classList.remove('active');
      formBonds.style.display = 'block';
      formTBills.style.display = 'none';
      calculateBonds();
    }
  }

  function formatNaira(num) {
    return '₦ ' + Number(num).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Nigerian Treasury Bills Discount & True Yield Formula:
   * Price Per 100 = 100 - (Discount Rate * Days / 360)
   * Consideration (Purchase Price) = Face Value * (Price Per 100 / 100)
   * Discount Earned = Face Value - Consideration
   * Effective True Yield % = (Discount Earned / Consideration) * (365 / Days) * 100
   */
  function calculateTBills() {
    const faceVal = parseFloat(document.getElementById('tbFaceVal')?.value || 10000000);
    const discountRate = parseFloat(document.getElementById('tbDiscountRate')?.value || 17.5);
    const days = parseInt(document.getElementById('tbDays')?.value || 364, 10);

    // Price per ₦100
    const pricePer100 = 100 - (discountRate * days / 360);
    const consideration = faceVal * (pricePer100 / 100);
    const discountEarned = faceVal - consideration;
    const trueYield = (discountEarned / consideration) * (365 / days) * 100;

    // Update DOM
    updateResultsUI({
      kpiTitle: 'EFFECTIVE ANNUAL YIELD (TRUE YIELD)',
      kpiValue: trueYield.toFixed(2) + '%',
      rows: [
        { label: 'Purchase Consideration', val: formatNaira(consideration) },
        { label: 'Upfront Discount Earned', val: formatNaira(discountEarned) },
        { label: 'Maturity Value (Par)', val: formatNaira(faceVal) },
        { label: 'Indicative Clean Price / ₦100', val: '₦ ' + pricePer100.toFixed(4) },
        { label: 'Tenor Remaining', val: days + ' Days' }
      ]
    });
  }

  /**
   * FGN Bond Pricing Formula (Semi-Annual Coupon Convention):
   * Price = Sum( Coupon / (1 + YTM/2)^t ) + FaceVal / (1 + YTM/2)^(2*years)
   */
  function calculateBonds() {
    const faceVal = parseFloat(document.getElementById('bondFaceVal')?.value || 50000000);
    const couponRate = parseFloat(document.getElementById('bondCoupon')?.value || 14.5);
    const ytm = parseFloat(document.getElementById('bondYTM')?.value || 19.5);
    const years = parseFloat(document.getElementById('bondTenor')?.value || 5);

    const periods = Math.round(years * 2); // Semi-annual coupons
    const semiCoupon = (couponRate / 100 / 2) * 100; // Per ₦100 face
    const semiYTM = (ytm / 100) / 2;

    let pvCoupons = 0;
    for (let t = 1; t <= periods; t++) {
      pvCoupons += semiCoupon / Math.pow(1 + semiYTM, t);
    }
    const pvFace = 100 / Math.pow(1 + semiYTM, periods);
    const cleanPricePer100 = pvCoupons + pvFace;

    const totalConsideration = faceVal * (cleanPricePer100 / 100);
    const annualCouponIncome = faceVal * (couponRate / 100);

    updateResultsUI({
      kpiTitle: 'INDICATIVE CLEAN PRICE',
      kpiValue: '₦ ' + cleanPricePer100.toFixed(2),
      rows: [
        { label: 'Estimated Clean Consideration', val: formatNaira(totalConsideration) },
        { label: 'Annual Coupon Cash Flow', val: formatNaira(annualCouponIncome) },
        { label: 'Semi-Annual Coupon Payment', val: formatNaira(annualCouponIncome / 2) },
        { label: 'Yield to Maturity (YTM)', val: ytm.toFixed(2) + '%' },
        { label: 'Coupon Rate (p.a.)', val: couponRate.toFixed(2) + '%' }
      ]
    });
  }

  function updateResultsUI({ kpiTitle, kpiValue, rows }) {
    const kpiTitleEl = document.getElementById('calcKpiTitle');
    const kpiValEl = document.getElementById('calcKpiValue');
    const rowsContainer = document.getElementById('calcDataRows');

    if (kpiTitleEl) kpiTitleEl.innerText = kpiTitle;
    if (kpiValEl) kpiValEl.innerText = kpiValue;

    if (rowsContainer) {
      rowsContainer.innerHTML = rows.map(r => `
        <div class="calc-row">
          <span class="calc-row-label">${r.label}</span>
          <span class="calc-row-val">${r.val}</span>
        </div>
      `).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', initCalculator);
})();
