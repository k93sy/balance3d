/* ================================================================
   Balance 3D — Payment Service  (payment.js)

   Primary:   Moyasar  (moyasar.com)  — Saudi-native, Mada, Apple
              Pay, STC Pay, Visa/MC in one API
   Secondary: HyperPay — fallback / alternative configuration

   DEMO MODE: when MOYASAR_PUBLISHABLE_KEY is the placeholder value,
   the service runs entirely client-side with simulated responses so
   the checkout flow is fully testable without real credentials.

   Public API
   ──────────
   PaymentService.init()
   PaymentService.createOrder(orderData)   → { ok, orderId }
   PaymentService.pay(orderId, source)     → Moyasar form render / redirect
   PaymentService.verifyCallback(params)   → { ok, status, orderId }
   PaymentService.getOrderStatus(orderId)  → { status, paymentStatus }
   PaymentService.getSupportedMethods()    → ['creditcard','mada','applepay','stcpay']

   Config (set before calling init):
   PaymentService.MOYASAR_KEY  = 'pk_live_...'   (publishable key — safe in browser)
   PaymentService.RETURN_URL   = 'https://...'   (checkout return URL)
   ================================================================ */

'use strict';

const PaymentService = {

  /* ── Configuration ─────────────────────────────────────────── */
  MOYASAR_KEY : 'pk_test_YOUR_MOYASAR_PUBLISHABLE_KEY',
  HYPERPAY_KEY: 'YOUR_HYPERPAY_ENTITY_ID',           // fallback only
  RETURN_URL  : window.location.origin + '/pages/checkout.html',
  CURRENCY    : 'SAR',
  PROVIDER    : 'moyasar',  // 'moyasar' | 'hyperpay'

  get _demo() {
    return this.MOYASAR_KEY.includes('YOUR_MOYASAR') ||
           this.MOYASAR_KEY === '' ||
           this.MOYASAR_KEY.startsWith('pk_test_YOUR');
  },

  /* ── Local order store (shared with AdminDB) ─────────────────── */
  _lsOrders() {
    try { return JSON.parse(localStorage.getItem('b3d_orders') || '[]'); } catch(_) { return []; }
  },
  _saveOrders(arr) {
    try { localStorage.setItem('b3d_orders', JSON.stringify(arr)); } catch(_) {}
  },

  /* ── Init: inject Moyasar JS SDK if not already loaded ──────── */
  init() {
    if (this._demo) return;
    if (document.getElementById('moyasar-sdk')) return;
    const s = document.createElement('script');
    s.id  = 'moyasar-sdk';
    s.src = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.js';
    document.head.appendChild(s);
    const l = document.createElement('link');
    l.rel  = 'stylesheet';
    l.href = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.css';
    document.head.appendChild(l);
  },

  /* ── Create order record ────────────────────────────────────── */
  async createOrder(orderData) {
    const orderId = 'ORD-' + Date.now();
    const order   = {
      id:                orderId,
      customer_name_en:  orderData.nameEn   || '',
      customer_name_ar:  orderData.nameAr   || '',
      customer_email:    orderData.email    || '',
      customer_phone:    orderData.phone    || '',
      city_en:           orderData.cityEn   || '',
      city_ar:           orderData.cityAr   || orderData.cityEn || '',
      address:           orderData.address  || '',
      items:             orderData.items,          // array of cart items
      product_name:      orderData.items.map(i => i.title?.en || i.title || '').join(', ').slice(0,100),
      amount:            orderData.total,
      payment_method:    null,
      payment_status:    'pending',
      status:            'pending',
      order_date:        new Date().toISOString().split('T')[0],
      created_at:        new Date().toISOString(),
    };

    if (typeof AdminDB !== 'undefined' && typeof AdminDB.getOrders === 'function') {
      // Persist to the shared orders store (shows in admin dashboard)
      try {
        const orders = await AdminDB.getOrders();
        orders.unshift(order);
        // If online, push to Supabase
        if (typeof _sb !== 'undefined' && _sb) {
          await _sb.from('orders').insert({
            id:               order.id,
            customer_name_en: order.customer_name_en,
            customer_name_ar: order.customer_name_ar,
            customer_email:   order.customer_email,
            city_en:          order.city_en,
            city_ar:          order.city_ar,
            product_name:     order.product_name,
            amount:           order.amount,
            payment_status:   'pending',
            status:           'pending',
            items:            orderData.items.length,
            order_date:       order.order_date,
          }).then(({ error }) => { if (error) console.warn('[Payment] Supabase order insert:', error.message); });
        }
        localStorage.setItem('b3d_pending_order', JSON.stringify(order));
      } catch(e) { console.warn('[Payment] createOrder store error:', e); }
    }

    // Always save to localStorage
    const orders = this._lsOrders();
    orders.unshift(order);
    this._saveOrders(orders);
    localStorage.setItem('b3d_pending_order', JSON.stringify(order));

    return { ok: true, orderId, order };
  },

  /* ── Render Moyasar payment form ────────────────────────────── */
  renderMoyasarForm(containerId, orderId, amount, description) {
    if (this._demo) {
      this._renderDemoForm(containerId, orderId, amount, description);
      return;
    }

    if (!window.Moyasar) {
      // SDK not loaded yet — retry after load
      const sdk = document.getElementById('moyasar-sdk');
      if (sdk) {
        sdk.onload = () => this.renderMoyasarForm(containerId, orderId, amount, description);
      }
      return;
    }

    window.Moyasar.init({
      element:     '#' + containerId,
      amount:      Math.round(amount * 100),     // halalas
      currency:    this.CURRENCY,
      description: description,
      publishable_api_key: this.MOYASAR_KEY,
      callback_url: this.RETURN_URL + '?order=' + encodeURIComponent(orderId),
      methods:     ['creditcard', 'mada', 'applepay', 'stcpay'],
      apple_pay: {
        country:      'SA',
        label:        'Balance 3D',
        validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate',
      },
      on_completed: (payment) => {
        this._handleCallback({ id: payment.id, status: payment.status, orderId });
      },
      on_failure: (payment) => {
        this._handleCallback({ id: payment?.id, status: 'failed', orderId, message: payment?.source?.message });
      },
    });
  },

  /* ── Demo mode: render a fake payment form for testing ──────── */
  _renderDemoForm(containerId, orderId, amount, description) {
    const el   = document.getElementById(containerId);
    if (!el) return;
    const isAr = (localStorage.getItem('b3d_lang') || 'ar') === 'ar';
    const sar  = isAr ? '\u0631.\u0633' : 'SAR';

    el.innerHTML = `
      <div class="pay-demo-banner">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${isAr ? '\u0648\u0636\u0639 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u2014 \u0623\u0636\u0641 \u0645\u0641\u062a\u0627\u062d Moyasar \u0644\u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u062d\u0642\u064a\u0642\u064a' : 'Test mode \u2014 add your Moyasar key to enable real payments'}</span>
      </div>

      <div class="pay-methods">

        <button type="button" class="pay-method-btn active" data-method="creditcard">
          <div class="pay-method-btn__logos">
            ${this._visaLogo()} ${this._mastercardLogo()} ${this._madaLogo()}
          </div>
          <span class="pay-method-btn__label">${isAr ? '\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0627\u0626\u062a\u0645\u0627\u0646' : 'Credit Card'}</span>
        </button>

        <button type="button" class="pay-method-btn" data-method="stcpay">
          <div class="pay-method-btn__logos">
            ${this._stcLogo()}
          </div>
          <span class="pay-method-btn__label">STC Pay</span>
        </button>

        <button type="button" class="pay-method-btn" data-method="applepay">
          <div class="pay-method-btn__logos">
            ${this._applePayLogo()}
          </div>
          <span class="pay-method-btn__label">Apple Pay</span>
        </button>

      </div>

      <div class="pay-card-form" id="payCardForm">
        <div class="pay-field">
          <label class="pay-label">${isAr ? '\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629' : 'Card Number'}</label>
          <input class="pay-input" id="demoCardNum" type="text" maxlength="19"
                 placeholder="4111 1111 1111 1111" inputmode="numeric" autocomplete="cc-number"/>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="pay-field">
            <label class="pay-label">${isAr ? '\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621' : 'Expiry'}</label>
            <input class="pay-input" id="demoExpiry" type="text" placeholder="MM / YY" maxlength="7" autocomplete="cc-exp"/>
          </div>
          <div class="pay-field">
            <label class="pay-label">CVV</label>
            <input class="pay-input" id="demoCvv" type="text" maxlength="4" placeholder="\u2022\u2022\u2022" autocomplete="cc-csc" inputmode="numeric"/>
          </div>
        </div>
        <div class="pay-field">
          <label class="pay-label">${isAr ? '\u0627\u0633\u0645 \u062d\u0627\u0645\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629' : 'Cardholder Name'}</label>
          <input class="pay-input" id="demoName" type="text" autocomplete="cc-name"
                 placeholder="${isAr ? '\u0627\u0644\u0627\u0633\u0645 \u0643\u0645\u0627 \u064a\u0638\u0647\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u0637\u0627\u0642\u0629' : 'Name as on card'}"/>
        </div>
      </div>

      <div class="pay-total-row">
        <span>${isAr ? '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0645\u0633\u062a\u062d\u0642' : 'Amount Due'}</span>
        <strong>${Number(amount).toFixed(2)} ${sar}</strong>
      </div>

      <button type="button" class="pay-submit-btn" id="demoPayBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
        <span id="demoPayLabel">${isAr ? '\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062f\u0641\u0639' : 'Pay Now'} \u2014 ${Number(amount).toFixed(2)} ${sar}</span>
      </button>

      <p class="pay-secure-note">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        ${isAr ? '\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a \u0645\u0634\u0641\u0631\u0629 \u0648\u0645\u0624\u0645\u0651\u0646\u0629 \u0628\u0640 SSL' : 'All payments are SSL encrypted & secure'}
      </p>`;

    el.querySelector('#demoCardNum')?.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    });

    el.querySelector('#demoExpiry')?.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2);
      e.target.value = v;
    });

    const payBtnLabels = {
      ar: { creditcard: '\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062f\u0641\u0639',
            applepay:   '\u0627\u0644\u062f\u0641\u0639 \u0628\u0640 Apple Pay',
            stcpay:     '\u0627\u0644\u062f\u0641\u0639 \u0628\u0640 STC Pay' },
      en: { creditcard: 'Pay Now', applepay: 'Pay with Apple Pay', stcpay: 'Pay with STC Pay' },
    };
    const lang = isAr ? 'ar' : 'en';

    el.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const method   = btn.dataset.method;
        const cardForm = el.querySelector('#payCardForm');
        if (cardForm) {
          cardForm.style.display = (method === 'creditcard') ? 'flex' : 'none';
        }
        const labelEl = el.querySelector('#demoPayLabel');
        if (labelEl) {
          labelEl.textContent = (payBtnLabels[lang][method] || 'Pay') +
                                ` \u2014 ${Number(amount).toFixed(2)} ${sar}`;
        }
      });
    });

    el.querySelector('#demoPayBtn')?.addEventListener('click', async () => {
      const payBtn = el.querySelector('#demoPayBtn');
      if (payBtn) { payBtn.disabled = true; payBtn.classList.add('pay-submit-btn--loading'); }
      await new Promise(r => setTimeout(r, 1600));
      const demoTxnId = 'demo_' + Date.now();
      this._handleCallback({ id: demoTxnId, status: 'paid', orderId, demo: true });
    });
  },

  /* ── Handle gateway callback (return URL or on_completed hook) ── */
  async _handleCallback({ id, status, orderId, message, demo }) {
    // Update order in store
    const mappedStatus = status === 'paid' ? 'processing' : (status === 'failed' ? 'cancelled' : 'pending');
    const orders = this._lsOrders();
    const idx    = orders.findIndex(o => o.id === orderId);
    if (idx >= 0) {
      orders[idx].payment_id     = id;
      orders[idx].payment_status = status;
      orders[idx].status         = mappedStatus;
      this._saveOrders(orders);
    }

    // Update pending order
    const pending = this._getPendingOrder();
    if (pending) {
      localStorage.setItem('b3d_pending_order', JSON.stringify({
        ...pending, payment_id: id, payment_status: status, status: mappedStatus,
      }));
    }

    // If online, call Supabase RPC
    if (!demo && typeof _sb !== 'undefined' && _sb) {
      try {
        await _sb.rpc('confirm_payment', {
          p_provider_txn_id: id,
          p_status:          status,
          p_gateway_message: message || null,
        });
      } catch(e) { console.warn('[Payment] confirm_payment RPC error:', e); }
    }

    // Navigate to confirmation
    window.location.href = '/pages/checkout.html?status=' + status + '&order=' + encodeURIComponent(orderId);
  },

  /* ── Verify callback from return URL ───────────────────────── */
  async verifyCallback(searchParams) {
    const moyasarId  = searchParams.get('id');
    const moyasarSt  = searchParams.get('status');
    const orderId    = searchParams.get('order');

    if (!moyasarId && !orderId) return { ok: false, status: 'unknown' };

    // In demo mode, status comes directly from our own redirect
    const status = searchParams.get('status') || moyasarSt || 'pending';
    return { ok: true, status, orderId, paymentId: moyasarId };
  },

  /* ── Get order status ──────────────────────────────────────── */
  getOrderStatus(orderId) {
    const orders = this._lsOrders();
    const order  = orders.find(o => o.id === orderId);
    if (!order) return null;
    return { status: order.status, paymentStatus: order.payment_status };
  },

  getPendingOrder() { return this._getPendingOrder(); },
  _getPendingOrder() {
    try { const v = localStorage.getItem('b3d_pending_order'); return v ? JSON.parse(v) : null; } catch(_) { return null; }
  },
  clearPendingOrder() { localStorage.removeItem('b3d_pending_order'); },

  getSupportedMethods() {
    return ['creditcard', 'mada', 'applepay', 'stcpay'];
  },

  /* ── Payment logos ─────────────────────────────────────────────
     Three methods:
       creditcard → _visaLogo() + _mastercardLogo() + _madaLogo()  (height 16px each)
       stcpay     → _stcLogo()                                      (height 22px)
       applepay   → _applePayLogo()                                 (height 22px)

     Rules:
     - Every SVG has an explicit viewBox whose bounds match the visible artwork.
     - Text uses dominant-baseline="central" + y at vertical centre so it never
       clips regardless of browser font metrics.
     - The Mastercard lens uses two arcs (one per circle) — the only correct way.
     - No transform="scale()" — all coordinates are pre-computed absolute values.
  ────────────────────────────────────────────────────────────── */

  /* ── Visa ── white card chip, clean VISA letterforms */
  _visaLogo() {
    // viewBox 0 0 38 14 — no hard width attr; CSS height:14px controls render size.
    // Tighter viewBox makes the SVG narrower so three logos fit side-by-side
    // inside the Credit Card button without overflow.
    // Letters: V(x 0.5–9.5) · I(x 11–13.5) · S(x 15–23) · A(x 25–37.5)
    // All y coordinates: content spans y=1–13 (centred in 14-unit height).
    //
    // V — 5-point polygon: outer-left, inner-left, apex, inner-right, outer-right.
    // S — five connected rectangles: 3 full-width bars + left post + right post.
    // A — two 4-point leg polygons converging at apex + crossbar.
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 14" width="38" height="14" role="img" aria-label="Visa">
      <rect x="0.25" y="0.25" width="37.5" height="13.5" rx="2" fill="white" stroke="#d0d0d0" stroke-width="0.5"/>
      <!-- V: 5-point polygon, apex at (5, 13) -->
      <polygon points="0.5,1 2.5,1 5,13 7.5,1 9.5,1" fill="#1A1F71"/>
      <!-- I -->
      <rect x="11" y="1" width="2.5" height="12" fill="#1A1F71"/>
      <!-- S: three full-width bars + two side posts -->
      <rect x="15" y="1"  width="8" height="1.8" rx="0.9" fill="#1A1F71"/>
      <rect x="15" y="1"  width="1.8" height="5.5"         fill="#1A1F71"/>
      <rect x="15" y="6"  width="8" height="1.8" rx="0.9" fill="#1A1F71"/>
      <rect x="21.2" y="7"  width="1.8" height="5.5"       fill="#1A1F71"/>
      <rect x="15" y="11" width="8" height="1.8" rx="0.9" fill="#1A1F71"/>
      <!-- A: two leg polygons + crossbar -->
      <polygon points="25,13 27,13 31,1 29,1"     fill="#1A1F71"/>
      <polygon points="37.5,13 35.5,13 31,1 33,1" fill="#1A1F71"/>
      <rect x="27" y="7.5" width="5" height="1.8" fill="#1A1F71"/>
    </svg>`;
  },

  /* ── Mastercard ── two circles, correct lens intersection */
  _mastercardLogo() {
    // Circle centres: (14, 12) and (24, 12), r=8
    // Intersection x = (14+24)/2 = 19
    // h = sqrt(64 - 25) = sqrt(39) ≈ 6.24
    // Intersection points: (19, 5.76) and (19, 18.24)
    // Lens: CCW arc on right circle + CCW arc on left circle
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="38" height="24" role="img" aria-label="Mastercard">
      <rect width="38" height="24" rx="3" fill="white" stroke="#d0d0d0" stroke-width="0.6"/>
      <circle cx="14" cy="12" r="8" fill="#EB001B"/>
      <circle cx="24" cy="12" r="8" fill="#F79E1B"/>
      <path d="M19 5.76 A8 8 0 0 0 19 18.24 A8 8 0 0 0 19 5.76 Z" fill="#FF5F00"/>
    </svg>`;
  },

  /* ── Mada ── official teal badge, text centred with dominant-baseline=central */
  _madaLogo() {
    // dominant-baseline="central" centres the text on the y coordinate
    // y=12 is the vertical centre of the 24px-tall badge → always centred
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 24" width="52" height="24" role="img" aria-label="Mada">
      <rect width="52" height="24" rx="5" fill="#00847C"/>
      <text x="26" y="12.5"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="Arial, Helvetica, sans-serif"
            font-weight="800"
            font-size="11"
            fill="white"
            letter-spacing="0.8">mada</text>
    </svg>`;
  },

  /* ── STC Pay ── purple badge, text centred */
  _stcLogo() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 28" width="74" height="28" role="img" aria-label="STC Pay">
      <rect width="74" height="28" rx="5" fill="#6A1F8E"/>
      <text x="37" y="14.5"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="Arial, Helvetica, sans-serif"
            font-weight="700"
            font-size="11"
            fill="white"
            letter-spacing="0.5">STC Pay</text>
    </svg>`;
  },

  /* ── Apple Pay ── black badge, Apple glyph + "Apple Pay" text */
  _applePayLogo() {
    // Apple logo glyph (pre-scaled, no transform) occupies roughly x=6..18, y=5..23
    // "Apple Pay" text starts at x=20 to x=68 → centred at x=44
    // Both fit within viewBox 0 0 80 28
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 28" width="80" height="28" role="img" aria-label="Apple Pay">
      <rect width="80" height="28" rx="5" fill="#000"/>
      <!-- Apple logo: leaf -->
      <path fill="white" d="M15.7 6.2 C16.4 5.3 16.3 4.3 16.3 4.3 C16.3 4.3 15.4 4.4 14.7 5 C14.1 5.5 13.7 6.3 13.9 6.9 C14.7 7 15.4 6.6 15.7 6.2 Z"/>
      <!-- Apple logo: body -->
      <path fill="white" d="M17.5 8.3 C16.5 8.3 15.7 9 15.1 9 C14.5 9 13.7 8.4 12.8 8.4 C11.6 8.4 10.5 9.1 9.9 10.2 C8.7 12.4 9.5 15.7 10.7 17.5 C11.3 18.4 12 19.3 12.9 19.3 C13.7 19.3 14 18.8 15 18.8 C16 18.8 16.3 19.3 17.1 19.3 C18 19.3 18.7 18.4 19.2 17.5 C19.6 16.9 19.8 16.4 20 15.7 C19.1 15.3 18.3 14.4 18.3 13.2 C18.3 12 19 11.1 20 10.5 C19.4 9.6 18.5 8.9 17.5 8.3 Z"/>
      <!-- "Apple Pay" label -->
      <text x="44" y="14.5"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="Arial, Helvetica, sans-serif"
            font-weight="500"
            font-size="10"
            fill="white"
            letter-spacing="0.2">Apple Pay</text>
    </svg>`;
  },

  /* Legacy aliases — keep existing call-sites working */
  _cardIcon()      { return this._visaLogo(); },
  _visaIcon()      { return this._visaLogo(); },
  _mastercardIcon(){ return this._mastercardLogo(); },
  _madaIcon()      { return this._madaLogo(); },
  _appleIcon()     { return this._applePayLogo(); },
  _applePayIcon()  { return this._applePayLogo(); },
  _stcIcon()       { return this._stcLogo(); }
};

/* Expose globally */
if (typeof window !== 'undefined') {
  window.PaymentService = PaymentService;
}
