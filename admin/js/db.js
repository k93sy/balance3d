/* ================================================================
   Balance 3D Admin — Data Layer  (db.js)

   All data is read from / written to the same localStorage keys
   the storefront uses.  Zero hardcoded values: every collection
   returns real data or an empty array.

   localStorage keys (shared with storefront)
   ──────────────────────────────────────────
   b3d_products        canonical product array (canonical format)
   b3d_orders          PaymentService orders   (snake_case flat)
   b3d_admin_orders    admin-format orders     (camelCase nested)
   b3d_local_users     registered users via AuthService
   b3d_admin_customers seed / imported customers
   b3d_admin_img_<id>  product image base-64

   localStorage keys (admin-only)
   ──────────────────────────────
   b3d_admin_reviews   product reviews
   b3d_admin_discounts discount codes
   b3d_admin_categories custom category list
   b3d_admin_settings  store settings
   ================================================================ */

'use strict';

const DB = (() => {

  /* ── localStorage helpers ─────────────────────────────────── */
  const _get = k => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; }
    catch { return null; }
  };
  /**
   * Write to localStorage.
   * Throws on failure so every caller automatically surfaces errors —
   * nothing can silently pretend to save when storage is blocked or full.
   */
  const _set = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      const msg = e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        ? 'مساحة التخزين ممتلئة — احذف الصور القديمة أو امسح بيانات المتصفح. (Storage full — delete old images or clear browser data.)'
        : `تعذّر الحفظ: ${e.message} (Save failed: ${e.message})`;
      console.error('[DB] ❌ localStorage write failed — key:', k, '| error:', e.name, e.message);
      throw new Error(msg);
    }
  };
  const _arr = v => Array.isArray(v) ? v : [];

  /**
   * Quick localStorage smoke-test — call this on admin init to catch
   * blocked storage (private mode, browser settings) before any save attempt.
   * Returns { ok: true } or { ok: false, reason: string }.
   */
  function _checkStorage() {
    const TEST_KEY = '__b3d_storage_test__';
    try {
      localStorage.setItem(TEST_KEY, '1');
      const val = localStorage.getItem(TEST_KEY);
      localStorage.removeItem(TEST_KEY);
      if (val !== '1') return { ok: false, reason: 'read-back mismatch' };
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: e.message };
    }
  }

  /* ── Order normalizer ─────────────────────────────────────── */
  /* Handles PaymentService (snake_case) AND admin (camelCase nested) formats */
  function _norm(raw) {
    if (!raw || !raw.id) return null;

    // Admin canonical format — customer is already an object
    if (raw.customer && typeof raw.customer === 'object') {
      return {
        id:              raw.id,
        customer:        { en: raw.customer.en || '', ar: raw.customer.ar || '' },
        email:           raw.email || '',
        phone:           raw.phone || '',
        city:            typeof raw.city === 'object'
                           ? { en: raw.city.en || '', ar: raw.city.ar || '' }
                           : { en: raw.city || '', ar: raw.city || '' },
        address:         raw.address || '',
        deliveryAddress: raw.deliveryAddress || null,
        product:         raw.product || '',
        items:           Array.isArray(raw.items) ? raw.items : [],
        amount:          Number(raw.amount) || 0,
        subtotal:        Number(raw.subtotal || raw.amount) || 0,
        shippingCost:    Number(raw.shippingCost || raw.shipping_cost) || 0,
        discountCode:    raw.discountCode  || raw.discount_code  || null,
        discountAmount:  Number(raw.discountAmount || raw.discount_amount) || 0,
        totalBeforeDiscount: raw.totalBeforeDiscount || raw.total_before_discount || null,
        status:          raw.status || 'pending',
        paymentStatus:   raw.paymentStatus || raw.payment_status || 'pending',
        paymentMethod:   raw.paymentMethod || raw.payment_method || '',
        date:            raw.date || new Date().toISOString().split('T')[0],
        tracking:        raw.tracking || null,
      };
    }

    // PaymentService format — flat snake_case
    const items = Array.isArray(raw.items) ? raw.items : [];
    return {
      id:              raw.id,
      customer:        {
        en: raw.customer_name_en || '',
        ar: raw.customer_name_ar || raw.customer_name_en || '',
      },
      email:           raw.customer_email || '',
      phone:           raw.customer_phone || '',
      city:            { en: raw.city_en || '', ar: raw.city_ar || raw.city_en || '' },
      address:         raw.address || '',
      deliveryAddress: raw.delivery_address || null,
      product:         raw.product_name ||
                       items.map(i => i.title?.en || i.titleEn || i.title || '').join(', ').slice(0, 120),
      items,
      amount:          Number(raw.amount) || 0,
      subtotal:        Number(raw.subtotal || raw.amount) || 0,
      shippingCost:    Number(raw.shipping_cost || raw.shippingCost) || 0,
      discountCode:    raw.discount_code  || raw.discountCode  || null,
      discountAmount:  Number(raw.discount_amount || raw.discountAmount) || 0,
      totalBeforeDiscount: raw.total_before_discount || raw.totalBeforeDiscount || null,
      status:          raw.status || 'pending',
      paymentStatus:   raw.payment_status || 'pending',
      paymentMethod:   raw.payment_method || '',
      date:            raw.order_date ||
                       (raw.created_at ? raw.created_at.split('T')[0] : new Date().toISOString().split('T')[0]),
      tracking:        raw.tracking_number || null,
    };
  }

  /* ── Public API ───────────────────────────────────────────── */
  return {

    /** Test whether localStorage is actually available and writable. */
    checkStorage: _checkStorage,

    /* ══════════════════════════════════════
       PRODUCTS
    ══════════════════════════════════════ */
    getProducts() {
      return _arr(_get('b3d_products'));
    },

    saveProduct(data) {
      const products = this.getProducts();
      const id = data.id || ('p' + Date.now());
      const stock = Number(data.stock) || 0;

      /* ── Pricing: support both old single-price and new dual-price models ── */
      const isOnSale     = data.isOnSale === true || data.isOnSale === 'true';
      const salePrice    = Number(data.salePrice)    || Number(data.price) || 0;
      const originalPrice= isOnSale ? (Number(data.originalPrice) || 0) : null;
      /* Keep legacy `price` field = what the customer actually pays */
      const price        = salePrice;

      const canonical = {
        id,
        title:    { en: data.titleEn   || '', ar: data.titleAr   || '' },
        desc:     { en: data.descEn    || '', ar: data.descAr    || '' },
        category: { en: data.categoryEn || data.category || '', ar: data.categoryAr || '' },
        material: data.material || '',
        price,           /* effective price (always = salePrice) */
        salePrice,       /* what customer pays */
        originalPrice,   /* pre-discount price, null when not on sale */
        isOnSale,        /* true → show strikethrough + discount badge */
        stock,
        inStock:  stock > 0 && data.status !== 'out_of_stock',
        /* badge: auto-set to 'sale' when isOnSale, otherwise use admin choice */
        badge:    isOnSale ? 'sale' : (data.badge === 'sale' ? null : (data.badge || null)),
        status:   data.status || 'active',
        colors:   Array.isArray(data.colors) ? data.colors : ['#C0C8E0'],
        rating:   Number(data.rating)  || 0,
        reviews:  Number(data.reviews) || 0,
        imageUrl: data.imageUrl || null,
      };
      const idx = products.findIndex(p => p.id === id);
      if (idx >= 0) products[idx] = canonical; else products.unshift(canonical);
      _set('b3d_products', products);  // throws on failure
      return id;
    },

    deleteProduct(id) {
      _set('b3d_products', this.getProducts().filter(p => p.id !== id));
      try { localStorage.removeItem('b3d_admin_img_' + id); } catch {}
    },

    /**
     * One-time migration: backfill salePrice / isOnSale / originalPrice
     * on products saved before the dual-price feature was added.
     * Safe to call multiple times (idempotent).
     */
    migrateProductPrices() {
      const products = this.getProducts();
      let changed = false;
      products.forEach(p => {
        if (p.salePrice === undefined) {
          p.salePrice     = p.price || 0;
          p.originalPrice = null;
          p.isOnSale      = false;
          changed = true;
        }
      });
      if (changed) _set('b3d_products', products);
    },

    /* ══════════════════════════════════════
       STOCK MANAGEMENT
    ══════════════════════════════════════ */

    /**
     * Atomically adjust a product's stock quantity and write a log entry.
     *
     * @param {string}      productId
     * @param {number}      delta        Negative to deduct, positive to restore
     * @param {string}      changeType   'order_placed' | 'order_cancelled' | 'manual_adjustment'
     * @param {string|null} orderId      Associated order ID (or null)
     * @param {string}      [reason]     Human-readable note for manual adjustments
     * @returns {boolean} true if product was found and updated
     */
    adjustStock(productId, delta, changeType, orderId = null, reason = '') {
      try {
        const products    = this.getProducts();
        const idx         = products.findIndex(p => p.id === productId);
        if (idx < 0) { console.warn('[DB.adjustStock] product not found:', productId); return false; }

        const p           = products[idx];
        const stockBefore = Number(p.stock) || 0;
        const stockAfter  = Math.max(0, stockBefore + delta);

        products[idx] = {
          ...p,
          stock:   stockAfter,
          inStock: stockAfter > 0,
          /* Auto-manage status:
             - hits zero  → out_of_stock
             - restored from out_of_stock above zero → back to active */
          status: stockAfter === 0
            ? 'out_of_stock'
            : (p.status === 'out_of_stock' && stockAfter > 0 ? 'active' : p.status),
        };
        _set('b3d_products', products);

        /* Append log entry */
        const log = _arr(_get('b3d_stock_log'));
        log.unshift({
          id:            'sl-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          productId,
          productNameEn: p.title?.en || '',
          productNameAr: p.title?.ar || '',
          changeType,
          delta,
          stockBefore,
          stockAfter,
          orderId:       orderId || null,
          reason:        reason  || '',
          timestamp:     new Date().toISOString(),
        });
        _set('b3d_stock_log', log.slice(0, 1000));
        return true;
      } catch (e) {
        console.warn('[DB.adjustStock] error:', e);
        return false;
      }
    },

    /**
     * Return stock-log entries, optionally filtered to one product.
     * @param {string|null} productId  Pass null to get all entries
     */
    getStockLog(productId = null) {
      const log = _arr(_get('b3d_stock_log'));
      return productId ? log.filter(e => e.productId === productId) : log;
    },

    getImage(id) {
      try { return localStorage.getItem('b3d_admin_img_' + id) || null; } catch { return null; }
    },
    saveImage(id, base64) {
      try { localStorage.setItem('b3d_admin_img_' + id, base64); return true; }
      catch (e) { console.warn('[DB] saveImage failed:', e); return false; }
    },

    /**
     * Remove any b3d_admin_img_* keys whose product ID no longer exists.
     * Call this before attempting an image save to free up quota first.
     * @returns {number} count of orphaned image keys removed
     */
    cleanupOrphanedImages() {
      try {
        const validIds = new Set(this.getProducts().map(p => p.id));
        const PREFIX   = 'b3d_admin_img_';
        const toRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(PREFIX)) {
            const pid = key.slice(PREFIX.length);
            if (!validIds.has(pid)) toRemove.push(key);
          }
        }
        toRemove.forEach(k => { try { localStorage.removeItem(k); } catch {} });
        if (toRemove.length) console.log('[DB] Removed', toRemove.length, 'orphaned image(s):', toRemove);
        return toRemove.length;
      } catch (e) {
        console.warn('[DB] cleanupOrphanedImages error:', e);
        return 0;
      }
    },

    /**
     * Returns a human-readable breakdown of localStorage usage.
     * Useful for diagnosing quota issues from the browser console: DB.storageReport()
     */
    storageReport() {
      try {
        let total = 0;
        const lines = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          const v = localStorage.getItem(k) || '';
          const kb = Math.round(v.length * 0.75 / 1024);
          total += kb;
          if (k.startsWith('b3d_')) lines.push({ key: k, kb });
        }
        lines.sort((a, b) => b.kb - a.kb);
        console.table(lines);
        console.log('Total b3d_ usage ≈', total, 'KB of ~5120 KB quota');
        return lines;
      } catch (e) {
        return [];
      }
    },

    /* ══════════════════════════════════════
       ORDERS  (merges both stores)
    ══════════════════════════════════════ */
    getOrders() {
      const admin = _arr(_get('b3d_admin_orders')).map(_norm).filter(Boolean);
      const sf    = _arr(_get('b3d_orders')).map(_norm).filter(Boolean);
      const seen  = new Set();
      const out   = [];
      // Real checkout orders take priority
      for (const o of sf)    { if (!seen.has(o.id)) { seen.add(o.id); out.push(o); } }
      for (const o of admin) { if (!seen.has(o.id)) { seen.add(o.id); out.push(o); } }
      return out.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    },

    updateOrder(id, patch) {
      // Write to b3d_admin_orders (canonical patch)
      const adminArr = _arr(_get('b3d_admin_orders'));
      const ai = adminArr.findIndex(o => o.id === id);
      if (ai >= 0) {
        Object.assign(adminArr[ai], patch);
        _set('b3d_admin_orders', adminArr);
      }
      // Also propagate to b3d_orders (sf format)
      const sfArr = _arr(_get('b3d_orders'));
      const si = sfArr.findIndex(o => o.id === id);
      if (si >= 0) {
        if (patch.status)   sfArr[si].status = patch.status;
        if (patch.tracking) sfArr[si].tracking_number = patch.tracking;
        if (patch.paymentStatus) sfArr[si].payment_status = patch.paymentStatus;
        _set('b3d_orders', sfArr);
      }
      // If not in either store, add a normalized copy to admin store
      if (ai < 0 && si < 0) {
        const order = this.getOrders().find(o => o.id === id);
        if (order) {
          adminArr.unshift({ ...order, ...patch });
          _set('b3d_admin_orders', adminArr);
        }
      }
    },

    /* ══════════════════════════════════════
       CUSTOMERS  (merges real users + seed)
    ══════════════════════════════════════ */
    getCustomers() {
      const orders     = this.getOrders();
      const localUsers = _arr(_get('b3d_local_users'));

      // Real registered users (AuthService writes these)
      const fromAuth = localUsers.filter(u => u.email).map(u => {
        const { password: _, ...safe } = u;          // strip password
        const userOrders = orders.filter(o => o.email === u.email);
        const nameEn = u.nameEn
          || (u.firstName ? (u.firstName + (u.lastName ? ' ' + u.lastName : '')) : '')
          || u.email.split('@')[0];
        return {
          id:         u.id,
          nameEn,
          nameAr:     u.nameAr || u.lastName || nameEn,
          email:      u.email,
          phone:      u.phone || '',
          orders:     userOrders.length,
          totalSpent: userOrders.reduce((s, o) => s + o.amount, 0),
          joinDate:   u.createdAt ? u.createdAt.split('T')[0] : (u.joinDate || ''),
          status:     u.status || 'active',
          _src:       'auth',
        };
      });

      // Seed/admin customers (exclude already-seen emails)
      const realEmails = new Set(fromAuth.map(u => u.email));
      const seed = _arr(_get('b3d_admin_customers'))
        .filter(c => c.email && !realEmails.has(c.email))
        .map(c => {
          const cOrders = orders.filter(o => o.email === c.email);
          return cOrders.length
            ? { ...c, orders: cOrders.length, totalSpent: cOrders.reduce((s, o) => s + o.amount, 0) }
            : c;
        });

      return [...fromAuth, ...seed];
    },

    /**
     * Immediately revoke the storefront session for a given user ID.
     * Clears b3d_session and b3d_user so the user is effectively logged out
     * on their next action. Works because all auth state lives in localStorage.
     * @param {string} userId
     */
    _revokeStorefrontSession(userId) {
      try {
        const raw = localStorage.getItem('b3d_session');
        if (!raw) return;
        const session = JSON.parse(raw);
        const sid = session?.user?.id;
        if (sid && sid === userId) {
          localStorage.removeItem('b3d_session');
          localStorage.removeItem('b3d_user');
          console.log('[DB] Storefront session revoked for user', userId);
        }
      } catch (e) { console.warn('[DB] _revokeStorefrontSession error:', e); }
    },

    toggleCustomer(id) {
      const flip = s => (s === 'active' ? 'blocked' : 'active');

      const lu = _arr(_get('b3d_local_users'));
      const li = lu.findIndex(u => u.id === id);
      if (li >= 0) {
        const newStatus = flip(lu[li].status || 'active');
        lu[li].status    = newStatus;
        lu[li].updatedAt = new Date().toISOString();
        if (newStatus === 'blocked') {
          lu[li].blockedAt = new Date().toISOString();
          this._revokeStorefrontSession(id);   // log them out immediately
        } else {
          delete lu[li].blockedAt;
        }
        _set('b3d_local_users', lu);
        return;
      }

      const cu = _arr(_get('b3d_admin_customers'));
      const ci = cu.findIndex(c => c.id === id);
      if (ci >= 0) {
        const newStatus = flip(cu[ci].status || 'active');
        cu[ci].status    = newStatus;
        cu[ci].updatedAt = new Date().toISOString();
        if (newStatus === 'blocked') {
          cu[ci].blockedAt = new Date().toISOString();
          this._revokeStorefrontSession(id);
        } else {
          delete cu[ci].blockedAt;
        }
        _set('b3d_admin_customers', cu);
      }
    },

    deleteCustomer(id) {
      // Revoke session BEFORE deleting the record so the user ID is still
      // resolvable inside _revokeStorefrontSession.
      this._revokeStorefrontSession(id);

      const lu = _arr(_get('b3d_local_users'));
      const li = lu.findIndex(u => u.id === id);
      if (li >= 0) { lu.splice(li, 1); _set('b3d_local_users', lu); return; }
      _set('b3d_admin_customers', _arr(_get('b3d_admin_customers')).filter(c => c.id !== id));
    },

    /* ══════════════════════════════════════
       CATEGORIES
    ══════════════════════════════════════ */
    getCategories() {
      const stored = _get('b3d_admin_categories');
      if (Array.isArray(stored) && stored.length) return stored;
      // Derive from products if no stored list yet
      const catMap = {};
      this.getProducts().forEach(p => {
        const en = p.category?.en || '';
        const ar = p.category?.ar || en;
        if (!en) return;
        if (!catMap[en]) catMap[en] = { id: 'cat-' + en.toLowerCase().replace(/\s+/g, '-'), nameEn: en, nameAr: ar, icon: '📦', count: 0 };
        catMap[en].count++;
      });
      return Object.values(catMap);
    },

    saveCategory(c) {
      const cats = this.getCategories();
      if (!c.id) c.id = 'cat-' + Date.now();
      const idx = cats.findIndex(x => x.id === c.id);
      if (idx >= 0) cats[idx] = c; else cats.push(c);
      _set('b3d_admin_categories', cats);
    },

    deleteCategory(id) {
      _set('b3d_admin_categories', this.getCategories().filter(c => c.id !== id));
    },

    /* ══════════════════════════════════════
       REVIEWS
    ══════════════════════════════════════ */
    getReviews() { return _arr(_get('b3d_admin_reviews')); },

    saveReview(r) {
      const reviews = this.getReviews();
      const idx = reviews.findIndex(x => x.id === r.id);
      if (idx >= 0) reviews[idx] = r; else reviews.push(r);
      _set('b3d_admin_reviews', reviews);
    },

    deleteReview(id) {
      _set('b3d_admin_reviews', this.getReviews().filter(r => r.id !== id));
    },

    /* ══════════════════════════════════════
       DISCOUNTS
    ══════════════════════════════════════ */
    getDiscounts() { return _arr(_get('b3d_admin_discounts')); },

    saveDiscount(d) {
      const list = this.getDiscounts();
      if (!d.id) d.id = 'DC-' + Date.now();
      const idx = list.findIndex(x => x.id === d.id);
      if (idx >= 0) list[idx] = d; else list.unshift(d);
      _set('b3d_admin_discounts', list);
    },

    deleteDiscount(id) {
      _set('b3d_admin_discounts', this.getDiscounts().filter(d => d.id !== id));
    },

    /* ══════════════════════════════════════
       SETTINGS
    ══════════════════════════════════════ */
    getSettings() {
      const defaults = {
        storeNameEn:    'Balance 3D',
        storeNameAr:    'بالانس ثري دي',
        email:          'info@balance3d.com',
        phone:          '+966 50 000 0000',
        address:        'الرياض، المملكة العربية السعودية',
        currency:       'SAR',
        /* ── Contact info (footer & contact page) ── */
        contactAddress:  'الرياض، المملكة العربية السعودية',
        addressDetail:   'حي التقنية، طريق الملك فهد',
        contactPhone:    '+966 55 123 4567',
        contactEmail:    'hello@balance3d.sa',
        workingHours:    'السبت – الخميس، 9 ص – 6 م',
        /* ── Social media URLs ── */
        socialWhatsapp:  '',
        socialInstagram: '',
        socialX:         '',
        socialLinkedin:  '',
        socialSnapchat:  '',
        socialTiktok:    '',
        socialYoutube:   '',
        /* ── Social media visibility toggles ── */
        showWhatsapp:  true,
        showInstagram: true,
        showX:         true,
        showLinkedin:  true,
        showSnapchat:  false,
        showTiktok:    false,
        showYoutube:   false,
      };
      const stored = _get('b3d_admin_settings');
      /* Merge stored over defaults so new fields always have fallback values */
      return stored ? Object.assign({}, defaults, stored) : defaults;
    },

    saveSettings(s) { _set('b3d_admin_settings', s); },

    /* ══════════════════════════════════════
       STATS  (100% computed from real data)
    ══════════════════════════════════════ */
    getStats() {
      const orders    = this.getOrders();
      const products  = this.getProducts();
      const customers = this.getCustomers();

      const now        = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
                           .toISOString().split('T')[0];

      const delivered     = orders.filter(o => o.status === 'delivered');
      const totalRevenue  = delivered.reduce((s, o) => s + o.amount, 0);
      const monthRevenue  = delivered
                              .filter(o => o.date >= monthStart)
                              .reduce((s, o) => s + o.amount, 0);

      // Last 7 days chart
      const weekChart = Array.from({ length: 7 }, (_, i) => {
        const d  = new Date(now);
        d.setDate(d.getDate() - (6 - i));
        const ds = d.toISOString().split('T')[0];
        const dayDelivered = orders.filter(o => o.date === ds && o.status === 'delivered');
        return {
          date:    ds,
          labelAr: d.toLocaleDateString('ar-SA', { weekday: 'short' }),
          labelEn: d.toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: dayDelivered.reduce((s, o) => s + o.amount, 0),
          count:   orders.filter(o => o.date === ds).length,
        };
      });

      // Status distribution
      const statusDist = {};
      orders.forEach(o => { statusDist[o.status] = (statusDist[o.status] || 0) + 1; });

      // Top products by order frequency
      const prodMap = {};
      orders.forEach(o => {
        if (!o.product) return;
        if (!prodMap[o.product]) prodMap[o.product] = { count: 0, revenue: 0 };
        prodMap[o.product].count++;
        prodMap[o.product].revenue += o.amount;
      });
      const topProducts = Object.entries(prodMap)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)
        .map(([name, d]) => ({ name, count: d.count, revenue: d.revenue }));

      return {
        totalRevenue,
        monthRevenue,
        totalOrders:     orders.length,
        pendingOrders:   orders.filter(o => o.status === 'pending').length,
        totalProducts:   products.length,
        outOfStock:      products.filter(p => p.stock === 0).length,
        totalCustomers:  customers.length,
        activeCustomers: customers.filter(c => c.status === 'active').length,
        weekChart,
        statusDist,
        topProducts,
        recentOrders: orders.slice(0, 10),
        lowStock:     products.filter(p => p.stock > 0 && p.stock < 5).slice(0, 8),
      };
    },
  };
})();

/* Expose globally */
if (typeof window !== 'undefined') window.DB = DB;
