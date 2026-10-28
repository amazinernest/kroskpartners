/**
 * KROSK PARTNERS LIMITED — INSTITUTIONAL YIELD & SETTLEMENT CALCULATOR
 * Accurate FMDQ OTC Standard Financial Mathematics & Real-Time DOM Binding
 */

export interface CalcResult {
  title: string;
  primaryMetric: string;
  primaryLabel: string;
  consideration: string;
  discountOrCoupon: string;
  effectiveYield: string;
  maturityVal: string;
  tenorLabel: string;
}

export function formatCurrency(amount: number, currency: 'NGN' | 'USD' = 'NGN'): string {
  const prefix = currency === 'USD' ? '$' : '₦';
  return prefix + ' ' + Math.round(amount).toLocaleString('en-US');
}

export function calculateTBills(faceVal: number, discountRate: number, days: number): CalcResult {
  // Price per ₦100 (Money market 360 day count basis for discount formula)
  const pricePer100 = 100 - (discountRate * days / 360);
  const consideration = faceVal * (pricePer100 / 100);
  const discountEarned = faceVal - consideration;
  
  // True Effective Yield % based on Actual/365 day count convention
  const trueYield = consideration > 0 ? (discountEarned / consideration) * (365 / days) * 100 : 0;

  return {
    title: 'Nigerian Treasury Bills & Commercial Papers (Discount Basis)',
    primaryLabel: 'EFFECTIVE ANNUAL TRUE YIELD (EY)',
    primaryMetric: trueYield.toFixed(2) + '%',
    consideration: formatCurrency(consideration),
    discountOrCoupon: formatCurrency(discountEarned),
    effectiveYield: trueYield.toFixed(2) + '%',
    maturityVal: formatCurrency(faceVal),
    tenorLabel: `${days} Days (Actual/365 Day Basis)`
  };
}

export function calculateBonds(faceVal: number, couponRate: number, ytm: number, years: number, currency: 'NGN' | 'USD' = 'NGN'): CalcResult {
  const periods = Math.max(1, Math.round(years * 2)); // Semi-annual coupons
  const semiCoupon = (couponRate / 100 / 2) * 100; // Per 100 face
  const semiYTM = (ytm / 100) / 2;

  let pvCoupons = 0;
  for (let t = 1; t <= periods; t++) {
    pvCoupons += semiCoupon / Math.pow(1 + semiYTM, t);
  }
  const pvFace = 100 / Math.pow(1 + semiYTM, periods);
  const cleanPricePer100 = pvCoupons + pvFace;

  const totalConsideration = faceVal * (cleanPricePer100 / 100);
  const annualCouponIncome = faceVal * (couponRate / 100);

  return {
    title: currency === 'USD' ? 'Nigerian Sovereign Eurobonds (USD)' : 'FGN Benchmark Bonds (Semi-Annual Coupon)',
    primaryLabel: 'INDICATIVE CLEAN PRICE',
    primaryMetric: (currency === 'USD' ? '$' : '₦') + ' ' + cleanPricePer100.toFixed(2),
    consideration: formatCurrency(totalConsideration, currency),
    discountOrCoupon: formatCurrency(annualCouponIncome, currency),
    effectiveYield: ytm.toFixed(2) + '%',
    maturityVal: formatCurrency(faceVal, currency),
    tenorLabel: `${years} Years (${periods} Semi-Annual Coupon Cycles)`
  };
}

export function initCalculatorDom() {
  const tabTBills = document.getElementById('calcTabTBills');
  const tabBonds = document.getElementById('calcTabBonds');
  const formTBills = document.getElementById('formTBills');
  const formBonds = document.getElementById('formBonds');

  if (!tabTBills || !tabBonds || !formTBills || !formBonds) return;

  let activeMode: 'tbills' | 'bonds' = 'tbills';

  function setMode(mode: 'tbills' | 'bonds') {
    activeMode = mode;
    if (mode === 'tbills') {
      tabTBills?.classList.add('active');
      tabBonds?.classList.remove('active');
      formTBills.style.display = 'block';
      formBonds.style.display = 'none';
      runTBillsCalc();
    } else {
      tabBonds?.classList.add('active');
      tabTBills?.classList.remove('active');
      formBonds.style.display = 'block';
      formTBills.style.display = 'none';
      runBondsCalc();
    }
  }

  tabTBills.addEventListener('click', () => setMode('tbills'));
  tabBonds.addEventListener('click', () => setMode('bonds'));

  // T-Bills Elements
  const tbFace = document.getElementById('tbFaceVal') as HTMLInputElement | null;
  const tbRate = document.getElementById('tbDiscountRate') as HTMLInputElement | null;
  const tbRateRange = document.getElementById('tbDiscountRange') as HTMLInputElement | null;
  const tbDays = document.getElementById('tbDays') as HTMLSelectElement | null;

  // Bonds Elements
  const bondFace = document.getElementById('bondFaceVal') as HTMLInputElement | null;
  const bondCoupon = document.getElementById('bondCoupon') as HTMLInputElement | null;
  const bondYTM = document.getElementById('bondYTM') as HTMLInputElement | null;
  const bondYTMRange = document.getElementById('bondYTMRange') as HTMLInputElement | null;
  const bondTenor = document.getElementById('bondTenor') as HTMLSelectElement | null;
  const bondCurrency = document.getElementById('bondCurrency') as HTMLSelectElement | null;

  // Sync sliders
  if (tbRate && tbRateRange) {
    tbRate.addEventListener('input', () => {
      tbRateRange.value = tbRate.value;
      runTBillsCalc();
    });
    tbRateRange.addEventListener('input', () => {
      tbRate.value = tbRateRange.value;
      runTBillsCalc();
    });
  }

  if (tbFace) tbFace.addEventListener('input', runTBillsCalc);
  if (tbDays) tbDays.addEventListener('change', runTBillsCalc);

  if (bondYTM && bondYTMRange) {
    bondYTM.addEventListener('input', () => {
      bondYTMRange.value = bondYTM.value;
      runBondsCalc();
    });
    bondYTMRange.addEventListener('input', () => {
      bondYTM.value = bondYTMRange.value;
      runBondsCalc();
    });
  }

  if (bondFace) bondFace.addEventListener('input', runBondsCalc);
  if (bondCoupon) bondCoupon.addEventListener('input', runBondsCalc);
  if (bondTenor) bondTenor.addEventListener('change', runBondsCalc);
  if (bondCurrency) bondCurrency.addEventListener('change', runBondsCalc);

  function runTBillsCalc() {
    const face = parseFloat(tbFace?.value || '100000000');
    const rate = parseFloat(tbRate?.value || '21.50');
    const days = parseInt(tbDays?.value || '182', 10);
    const res = calculateTBills(face, rate, days);
    updateResultUI(res, 'tbills', face, rate);
  }

  function runBondsCalc() {
    const face = parseFloat(bondFace?.value || '100000000');
    const coupon = parseFloat(bondCoupon?.value || '14.50');
    const ytm = parseFloat(bondYTM?.value || '20.25');
    const years = parseFloat(bondTenor?.value || '5');
    const curr = (bondCurrency?.value === 'USD' ? 'USD' : 'NGN') as 'NGN' | 'USD';
    const res = calculateBonds(face, coupon, ytm, years, curr);
    updateResultUI(res, 'bonds', face, ytm);
  }

  function updateResultUI(res: CalcResult, mode: string, face: number, rate: number) {
    const kpiLabel = document.getElementById('calcKpiLabel');
    const kpiMetric = document.getElementById('calcKpiMetric');
    const metricConsideration = document.getElementById('calcMetricConsideration');
    const metricDiscount = document.getElementById('calcMetricDiscount');
    const metricTenor = document.getElementById('calcMetricTenor');
    const metricPar = document.getElementById('calcMetricPar');
    const executeBtn = document.getElementById('calcExecuteBtn') as HTMLButtonElement | null;

    if (kpiLabel) kpiLabel.textContent = res.primaryLabel;
    if (kpiMetric) kpiMetric.textContent = res.primaryMetric;
    if (metricConsideration) metricConsideration.textContent = res.consideration;
    if (metricDiscount) metricDiscount.textContent = res.discountOrCoupon;
    if (metricTenor) metricTenor.textContent = res.tenorLabel;
    if (metricPar) metricPar.textContent = res.maturityVal;

    if (executeBtn) {
      executeBtn.onclick = () => {
        const desk = mode === 'tbills' ? 'Treasury Bills' : 'Government & Corporate Bonds';
        if (typeof (window as any).openRfqModal === 'function') {
          (window as any).openRfqModal(desk, {
            notional: face.toLocaleString(),
            targetYield: rate.toString() + '%'
          });
        }
      };
    }
  }

  // Initial calculation
  runTBillsCalc();
}
