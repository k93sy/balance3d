/* ================================================================
   Balance 3D — Database Layer  (db.js)
   Supabase-backed replacement for the localStorage ProductStore.

   SETUP:
   1. Create a Supabase project at https://supabase.com
   2. Run db/schema.sql in the Supabase SQL Editor
   3. Run db/seed-orders.sql for sample data
   4. Copy your project URL and anon key into the config below
   5. That's it — no build step needed.

   API CONTRACT (identical to the old ProductStore / AdminDB):
   - ProductStore.*   → used by storefront pages
   - AdminDB.*        → used by admin dashboard
   All callers are unchanged; only this file and store.js swap out.
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   CONFIGURATION — fill in your Supabase credentials
   ---------------------------------------------------------------- */
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';
const STORAGE_BUCKET = 'product-images';

/* ----------------------------------------------------------------
   SDK bootstrap (loaded from CDN in HTML)
   ---------------------------------------------------------------- */
const _sb = (() => {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    return supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  }
  // Not configured yet — db.js is in offline/demo mode
  return null;
})();

const _configured = () => {
  return _sb &&
    SUPABASE_URL  !== 'https://YOUR_PROJECT_ID.supabase.co' &&
    SUPABASE_ANON !== 'YOUR_ANON_PUBLIC_KEY';
};

/* ----------------------------------------------------------------
   Arabic category lookup (unchanged from store.js)
   ---------------------------------------------------------------- */
const CAT_AR = {
  'Figurines':'مجسمات','Tools':'أدوات','Architecture':'هندسة معمارية',
  'Jewelry':'مجوهرات','Home Decor':'ديكور منزلي','Engineering':'هندسة',
  'Gaming':'ألعاب','Automotive':'سيارات','Other':'أخرى',
};

/* ----------------------------------------------------------------
   Row → canonical product (matches ProductStore schema)
   ---------------------------------------------------------------- */
function _rowToCanonical(r) {
  return {
    id:       r.id,
    title:    { en: r.title_en || '', ar: r.title_ar || '' },
    desc:     { en: r.desc_en  || '', ar: r.desc_ar  || '' },
    category: { en: r.category_en || '', ar: r.category_ar || '' },
    material: r.material || '',
    price:    Number(r.price)   || 0,
    stock:    Number(r.stock)   || 0,
    inStock:  Boolean(r.in_stock),
    badge:    r.badge || null,
    status:   r.status || 'active',
    colors:   Array.isArray(r.colors) ? r.colors : ['#C0C8E0'],
    rating:   Number(r.rating)  || 0,
    reviews:  Number(r.reviews) || 0,
    imageUrl: r.image_url || null,
  };
}

/* Canonical → DB row (for upsert) */
function _canonicalToRow(p) {
  return {
    id:           p.id,
    title_en:     p.title?.en     || '',
    title_ar:     p.title?.ar     || '',
    desc_en:      p.desc?.en      || '',
    desc_ar:      p.desc?.ar      || '',
    category_en:  p.category?.en  || '',
    category_ar:  p.category?.ar  || '',
    material:     p.material      || '',
    price:        Number(p.price) || 0,
    stock:        Number(p.stock) || 0,
    badge:        p.badge         || null,
    status:       p.status        || 'active',
    colors:       Array.isArray(p.colors) ? p.colors : ['#C0C8E0'],
    rating:       Number(p.rating)  || 0,
    reviews:      Number(p.reviews) || 0,
    image_url:    p.imageUrl        || null,
  };
}

/* Admin flat → DB row */
function _adminToRow(a) {
  const catEn = a.category || '';
  return {
    id:           a.id,
    title_en:     a.titleEn   || '',
    title_ar:     a.titleAr   || '',
    desc_en:      a.descEn    || '',
    desc_ar:      a.descAr    || '',
    category_en:  catEn,
    category_ar:  CAT_AR[catEn] || catEn,
    material:     a.material  || '',
    price:        Number(a.price) || 0,
    stock:        Number(a.stock) || 0,
    badge:        a.badge  || null,
    status:       a.status || 'active',
    colors:       Array.isArray(a.colors) ? a.colors : ['#C0C8E0'],
    rating:       Number(a.rating)  || 0,
    reviews:      Number(a.reviews) || 0,
    image_url:    a.imageUrl || null,
  };
}

/* Canonical → admin flat */
function _canonicalToAdmin(p) {
  return {
    id:       p.id,
    titleEn:  p.title?.en   || '',
    titleAr:  p.title?.ar   || '',
    descEn:   p.desc?.en    || '',
    descAr:   p.desc?.ar    || '',
    category: p.category?.en || '',
    material: p.material    || '',
    price:    p.price,
    stock:    p.stock,
    badge:    p.badge,
    status:   p.status,
    colors:   p.colors,
    rating:   p.rating,
    reviews:  p.reviews,
    imageUrl: p.imageUrl || null,
  };
}

/* ----------------------------------------------------------------
   SVG placeholder (identical to store.js)
   ---------------------------------------------------------------- */
function _svgPlaceholder(product) {
  const c = encodeURIComponent((product?.colors?.[0]) || '#C0C8E0');
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='${c}1A' width='400' height='300'/%3E%3Cg transform='translate(200,150)'%3E%3Cpolygon points='0,-68 59,34 -59,34' fill='${c}33' stroke='${c}' stroke-width='2'/%3E%3Crect x='-29' y='34' width='58' height='38' fill='${c}22' stroke='${c}' stroke-width='1.5'/%3E%3C/g%3E%3C/svg%3E`;
}

/* ================================================================
   ProductStore — public API (called by storefront pages)
   ================================================================ */
const ProductStore = {
  KEY: 'b3d_products',   // kept for cross-tab storage events

  /* -- Storefront: fetch all active products -- */
  async getAll(includeNonActive) {
    if (!_configured()) return _localFallback(includeNonActive);
    let q = _sb.from('products').select('*').order('created_at', { ascending: true });
    if (!includeNonActive) q = q.neq('status', 'draft');
    const { data, error } = await q;
    if (error) { console.error('[DB] getAll:', error.message); return _localFallback(includeNonActive); }
    return data.map(_rowToCanonical);
  },

  /* -- Storefront: fetch single product -- */
  async getById(id) {
    if (!_configured()) return _localFallbackById(id);
    const { data, error } = await _sb.from('products').select('*').eq('id', id).maybeSingle();
    if (error) { console.error('[DB] getById:', error.message); return null; }
    return data ? _rowToCanonical(data) : null;
  },

  /* -- Resolve display image -- */
  resolveImage(product) {
    if (product?.imageUrl) return product.imageUrl;
    // localStorage fallback for images saved before Supabase integration
    if (product?.id) {
      try {
        const local = localStorage.getItem('b3d_admin_img_' + product.id);
        if (local) return local;
      } catch (_) {}
    }
    return _svgPlaceholder(product);
  },

  /* -- Image helpers (used by admin) -- */
  getImage(id) {
    try { return localStorage.getItem('b3d_admin_img_' + id) || null; } catch (_) { return null; }
  },

  /* -- Admin: upsert product -- */
  async adminSave(a) {
    if (!_configured()) { _localAdminSave(a); return true; }
    const row = _adminToRow(a);
    const { error } = await _sb.from('products').upsert(row, { onConflict: 'id' });
    if (error) { console.error('[DB] adminSave:', error.message); _localAdminSave(a); return false; }
    _broadcastChange();
    return true;
  },

  /* -- Admin: delete product -- */
  async adminDelete(id) {
    if (!_configured()) { _localAdminDelete(id); return true; }
    const { error } = await _sb.from('products').delete().eq('id', id);
    if (error) { console.error('[DB] adminDelete:', error.message); return false; }
    // Also delete from storage bucket
    await _sb.storage.from(STORAGE_BUCKET).remove([`${id}/main`]);
    _broadcastChange();
    return true;
  },

  /* -- Admin: get all products in flat admin schema -- */
  async adminGetAll() {
    if (!_configured()) return _localAdminGetAll();
    const { data, error } = await _sb.from('products').select('*').order('created_at', { ascending: true });
    if (error) { console.error('[DB] adminGetAll:', error.message); return _localAdminGetAll(); }
    return data.map(_rowToCanonical).map(_canonicalToAdmin);
  },

  /* -- Upload product image to Supabase Storage -- */
  async uploadImage(productId, file) {
    if (!_configured()) return null;
    const ext  = file.name.split('.').pop().toLowerCase() || 'jpg';
    const path = `${productId}/main.${ext}`;
    const { error } = await _sb.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type });
    if (error) { console.error('[DB] uploadImage:', error.message); return null; }
    const { data } = _sb.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  },

  /* -- Save base64 image to localStorage (offline / fallback) -- */
  saveImage(id, base64) {
    try { localStorage.setItem('b3d_admin_img_' + id, base64); return true; }
    catch (e) { console.warn('[DB] saveImage localStorage failed:', e); return false; }
  },

  deleteImage(id) {
    try { localStorage.removeItem('b3d_admin_img_' + id); } catch (_) {}
    if (_configured()) {
      _sb.storage.from(STORAGE_BUCKET).remove([`${id}/main`]).catch(() => {});
    }
  },

  /* -- Realtime: subscribe to product changes -- */
  subscribeToProducts(callback) {
    if (!_configured()) return null;
    return _sb
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, callback)
      .subscribe();
  },

  /* -- Seed fallback (called by data.js for localStorage compatibility) -- */
  seed() { /* no-op: Supabase is seeded via schema.sql */ },
  _ensureSeeded() { /* no-op */ },

  /* Internal helpers */
  _fromAdmin: _adminToRow,
  _toAdmin:   _canonicalToAdmin,
  _toCanonical: _rowToCanonical,
};

/* ================================================================
   AdminDB — public API (called by admin dashboard)
   ================================================================ */
const AdminDB = {

  /* ---------- Products (delegated to ProductStore) ---------- */
  async getProducts()   { return ProductStore.adminGetAll(); },
  async addProduct(p)   { return ProductStore.adminSave(p); },
  async updateProduct(p){ return ProductStore.adminSave(p); },
  async deleteProduct(id){ return ProductStore.adminDelete(id); },

  getImage(id)       { return ProductStore.getImage(id); },
  saveImage(id, b64) { return ProductStore.saveImage(id, b64); },
  deleteImage(id)    { ProductStore.deleteImage(id); },

  /* ---------- Orders ---------- */
  async getOrders() {
    if (!_configured()) return _localOrders();
    const { data, error } = await _sb
      .from('orders').select('*').order('order_date', { ascending: false });
    if (error) { console.error('[DB] getOrders:', error.message); return _localOrders(); }
    return data.map(_rowToOrder);
  },

  async updateOrderStatus(id, status) {
    if (!_configured()) { _localUpdateOrderStatus(id, status); return; }
    const { error } = await _sb.from('orders').update({ status }).eq('id', id);
    if (error) console.error('[DB] updateOrderStatus:', error.message);
  },

  async updateTracking(id, code) {
    if (!_configured()) { _localUpdateTracking(id, code); return; }
    const { error } = await _sb.from('orders')
      .update({ tracking_number: code || null }).eq('id', id);
    if (error) console.error('[DB] updateTracking:', error.message);
  },

  /* ---------- Customers ---------- */
  async getCustomers() {
    if (!_configured()) return _localCustomers();
    const { data, error } = await _sb
      .from('customers').select('*').order('created_at', { ascending: false });
    if (error) { console.error('[DB] getCustomers:', error.message); return _localCustomers(); }
    return data.map(_rowToCustomer);
  },

  async toggleCustomer(id) {
    if (!_configured()) { _localToggleCustomer(id); return; }
    const current = (await _sb.from('customers').select('status').eq('id', id).maybeSingle()).data;
    if (!current) return;
    const next = current.status === 'active' ? 'blocked' : 'active';
    const { error } = await _sb.from('customers').update({ status: next }).eq('id', id);
    if (error) console.error('[DB] toggleCustomer:', error.message);
  },

  /* ---------- Stats (computed) ---------- */
  async getStats() {
    const [orders, products, customers] = await Promise.all([
      this.getOrders(),
      ProductStore.getAll(true),
      this.getCustomers(),
    ]);
    const revenue    = orders.filter(o => o.status === 'delivered').reduce((s,o) => s + o.amount, 0);
    const monthStart = new Date(new Date().setDate(1));
    const thisMonth  = orders.filter(o => new Date(o.date) >= monthStart);
    const daysAgoFn  = n => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().split('T')[0]; };
    return {
      totalRevenue:    revenue,
      monthRevenue:    thisMonth.filter(o => o.status === 'delivered').reduce((s,o) => s + o.amount, 0),
      totalOrders:     orders.length,
      pendingOrders:   orders.filter(o => o.status === 'pending').length,
      totalProducts:   products.length,
      outOfStock:      products.filter(p => p.stock === 0).length,
      totalCustomers:  customers.length,
      activeCustomers: customers.filter(c => c.status === 'active').length,
      weekChart: Array.from({ length: 7 }, (_, i) => {
        const d = daysAgoFn(6 - i);
        return { day: d.slice(5), val: orders.filter(o => o.date === d && o.status === 'delivered').reduce((s,o) => s + o.amount, 0) };
      }),
      orderStatusDist: ['pending','processing','shipped','delivered','cancelled'].map(s => ({
        status: s, count: orders.filter(o => o.status === s).length,
      })),
    };
  },
};

/* ================================================================
   Row mappers for orders / customers
   ================================================================ */
function _rowToOrder(r) {
  return {
    id:       r.id,
    customer: { en: r.customer_name_en, ar: r.customer_name_ar },
    email:    r.customer_email,
    city:     { en: r.city_en, ar: r.city_ar },
    product:  r.product_name,
    amount:   Number(r.amount),
    status:   r.status,
    date:     r.order_date,
    items:    r.items,
    tracking: r.tracking_number || null,
    paymentMethod: r.payment_method,
    paymentStatus: r.payment_status,
  };
}

function _rowToCustomer(r) {
  return {
    id:         r.id,
    nameEn:     r.name_en,
    nameAr:     r.name_ar,
    email:      r.email,
    phone:      r.phone,
    city:       { en: r.city_en, ar: r.city_ar },
    orders:     r.order_count,
    totalSpent: Number(r.total_spent),
    joinDate:   r.join_date,
    status:     r.status,
  };
}

/* ================================================================
   localStorage FALLBACK helpers
   (exact same seed data / logic as old store.js / admin-data.js)
   Used automatically when SUPABASE_URL is not yet configured.
   ================================================================ */
const _LS_PRODUCTS  = 'b3d_products';
const _LS_ORDERS    = 'b3d_admin_orders';
const _LS_CUSTOMERS = 'b3d_admin_customers';

const _lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (_) { return fb; } };
const _lsSet = (k, v)  => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} };

/* Products fallback */
function _localFallback(includeNonActive) {
  let arr = _lsGet(_LS_PRODUCTS, null);
  if (!arr) { _lsSet(_LS_PRODUCTS, _STORE_SEED); arr = _STORE_SEED; }
  return includeNonActive ? arr : arr.filter(p => p.status !== 'draft');
}
function _localFallbackById(id) {
  return _localFallback(true).find(p => p.id === id) || null;
}
function _localAdminGetAll() {
  return _localFallback(true).map(_canonicalToAdmin);
}
function _localAdminSave(a) {
  const arr   = _localFallback(true);
  const canon = { id: a.id, title: { en: a.titleEn||'', ar: a.titleAr||'' }, desc: { en: a.descEn||'', ar: a.descAr||'' }, category: { en: a.category||'', ar: CAT_AR[a.category]||a.category||'' }, material: a.material||'', price: Number(a.price)||0, stock: Number(a.stock)||0, inStock: Number(a.stock)>0 && a.status!=='out_of_stock', badge: a.badge||null, status: a.status||'active', colors: Array.isArray(a.colors)?a.colors:['#C0C8E0'], rating: Number(a.rating)||0, reviews: Number(a.reviews)||0 };
  const idx = arr.findIndex(p => p.id === canon.id);
  if (idx >= 0) arr[idx] = canon; else arr.unshift(canon);
  _lsSet(_LS_PRODUCTS, arr);
  _broadcastChange();
}
function _localAdminDelete(id) {
  _lsSet(_LS_PRODUCTS, _localFallback(true).filter(p => p.id !== id));
  try { localStorage.removeItem('b3d_admin_img_' + id); } catch (_) {}
  _broadcastChange();
}

/* Orders fallback */
const _RAND = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const _PICK = a => a[Math.floor(Math.random()*a.length)];
const _DAYS_AGO = n => { const d = new Date(); d.setDate(d.getDate()-n); return d.toISOString().split('T')[0]; };
const _SEED_ORDERS = (() => {
  const NAR=['أحمد الشمري','فاطمة العتيبي','محمد الغامدي','سارة الزهراني','عبدالله القحطاني'];
  const NEN=['Ahmed Al-Shamri','Fatima Al-Otaibi','Mohammed Al-Ghamdi','Sara Al-Zahrani','Abdullah Al-Qahtani'];
  const CAR=['الرياض','جدة','الدمام','مكة المكرمة','المدينة المنورة'];
  const CEN=['Riyadh','Jeddah','Dammam','Makkah','Madinah'];
  const STS=['pending','processing','shipped','delivered','cancelled'];
  return Array.from({length:20},(_,i)=>({ id:'ORD-'+String(1000+i).padStart(4,'0'), customer:{ar:NAR[i%5],en:NEN[i%5]}, email:NEN[i%5].toLowerCase().replace(/[^a-z]/g,'')+i+'@email.com', city:{ar:CAR[i%5],en:CEN[i%5]}, product:'Product '+(i%8+1), amount:_RAND(65,680), status:STS[i%5], date:_DAYS_AGO(i), items:_RAND(1,4), tracking:i%3===0?'SA'+_RAND(100000000,999999999):null, paymentMethod:_PICK(['credit_card','mada','stc_pay','cash']), paymentStatus:_PICK(['paid','pending','refunded']) }));
})();
function _localOrders() { return _lsGet(_LS_ORDERS, _SEED_ORDERS); }
function _localUpdateOrderStatus(id, status) { _lsSet(_LS_ORDERS, _localOrders().map(o=>o.id===id?{...o,status}:o)); }
function _localUpdateTracking(id, code) { _lsSet(_LS_ORDERS, _localOrders().map(o=>o.id===id?{...o,tracking:code}:o)); }

/* Customers fallback */
const _SEED_CUSTOMERS = (() => {
  const NAR=['أحمد الشمري','فاطمة العتيبي','محمد الغامدي','سارة الزهراني','عبدالله القحطاني'];
  const NEN=['Ahmed Al-Shamri','Fatima Al-Otaibi','Mohammed Al-Ghamdi','Sara Al-Zahrani','Abdullah Al-Qahtani'];
  const CAR=['الرياض','جدة','الدمام','مكة المكرمة','المدينة المنورة'];
  const CEN=['Riyadh','Jeddah','Dammam','Makkah','Madinah'];
  return Array.from({length:12},(_,i)=>({ id:'C'+String(100+i).padStart(3,'0'), nameAr:NAR[i%5], nameEn:NEN[i%5], email:NEN[i%5].toLowerCase().replace(/[^a-z]/g,'')+i+'@email.com', phone:'+966 5'+_RAND(10000000,99999999), city:{ar:CAR[i%5],en:CEN[i%5]}, orders:_RAND(1,12), totalSpent:_RAND(100,4500), joinDate:_DAYS_AGO(_RAND(10,300)), status:i%7===0?'blocked':'active' }));
})();
function _localCustomers() { return _lsGet(_LS_CUSTOMERS, _SEED_CUSTOMERS); }
function _localToggleCustomer(id) { _lsSet(_LS_CUSTOMERS, _localCustomers().map(c=>c.id===id?{...c,status:c.status==='active'?'blocked':'active'}:c)); }

/* Broadcast localStorage change so other tabs update */
function _broadcastChange() {
  try { localStorage.setItem(_LS_PRODUCTS + '_ping', Date.now()); localStorage.removeItem(_LS_PRODUCTS + '_ping'); } catch (_) {}
}

/* ================================================================
   _STORE_SEED — kept here so localFallback works standalone
   ================================================================ */
const _STORE_SEED = [
  {id:'p001',title:{en:'Articulated Dragon',ar:'تنين متحرك'},desc:{en:'Fully articulated dragon with moving joints. Printed in premium PLA.',ar:'تنين متحرك بالكامل مع مفاصل قابلة للحركة. مطبوع بـ PLA عالي الجودة.'},category:{en:'Figurines',ar:'مجسمات'},material:'PLA Pro',price:145,stock:23,inStock:true,badge:'popular',status:'active',colors:['#E8E8E8','#2D3436','#0984E3'],rating:4.9,reviews:124},
  {id:'p002',title:{en:'Desk Organizer Pro',ar:'منظم مكتب احترافي'},desc:{en:'Modular desk organizer with 8 compartments. PETG for durability.',ar:'منظم مكتب معياري بـ٨ أقسام. مصنوع من PETG للمتانة.'},category:{en:'Tools',ar:'أدوات'},material:'PETG',price:89,stock:40,inStock:true,badge:'new',status:'active',colors:['#FDCB6E','#2D3436','#FFFFFF'],rating:4.7,reviews:87},
  {id:'p003',title:{en:'Mini Skyline Model',ar:'نموذج أفق مصغر'},desc:{en:'Detailed cityscape miniature. Perfect for offices and gifts.',ar:'نموذج مصغر مفصّل للمدينة. مثالي للمكاتب والهدايا.'},category:{en:'Architecture',ar:'هندسة معمارية'},material:'Resin',price:220,stock:12,inStock:true,badge:null,status:'active',colors:['#DFE6E9','#2D3436'],rating:4.8,reviews:53},
  {id:'p004',title:{en:'Geometric Ring Set',ar:'طقم خواتم هندسية'},desc:{en:'Set of 3 geometric rings printed in resin. Multiple sizes.',ar:'طقم من ٣ خواتم هندسية مطبوعة بالراتنج. أحجام متعددة.'},category:{en:'Jewelry',ar:'مجوهرات'},material:'Resin',price:65,stock:78,inStock:true,badge:'sale',status:'active',colors:['#A29BFE','#FD79A8','#FFEAA7'],rating:4.6,reviews:211},
  {id:'p005',title:{en:'Vase Collection',ar:'مجموعة المزهريات'},desc:{en:'Elegant parametric vase set. Available in 3 sizes.',ar:'طقم مزهريات بتصميم هندسي أنيق. متوفر بـ٣ أحجام.'},category:{en:'Home Decor',ar:'ديكور منزلي'},material:'PLA Pro',price:110,stock:31,inStock:true,badge:'new',status:'active',colors:['#FFFFFF','#636E72','#00B894'],rating:4.8,reviews:98},
  {id:'p006',title:{en:'Gear Mechanism',ar:'آلية التروس'},desc:{en:'Functional gear set with 5 interlocking gears. Educational.',ar:'طقم تروس وظيفي بـ٥ تروس متشابكة. تعليمي.'},category:{en:'Engineering',ar:'هندسة'},material:'PETG',price:175,stock:0,inStock:false,badge:null,status:'out_of_stock',colors:['#FF6B35','#2D3436'],rating:4.9,reviews:42},
  {id:'p007',title:{en:'Chess Set 3D',ar:'طقم شطرنج ثلاثي الأبعاد'},desc:{en:'Full chess set with unique 3D designs. Board included.',ar:'طقم شطرنج كامل بتصاميم ثلاثية الأبعاد فريدة. يشمل اللوحة.'},category:{en:'Gaming',ar:'ألعاب'},material:'PLA Pro',price:340,stock:9,inStock:true,badge:'popular',status:'active',colors:['#2D3436','#DFE6E9'],rating:5.0,reviews:67},
  {id:'p008',title:{en:'Scale Car Model',ar:'نموذج سيارة مصغر'},desc:{en:'Highly detailed 1:24 scale car model. Resin printed.',ar:'نموذج سيارة مفصّل للغاية بمقياس ١:٢٤. مطبوع بالراتنج.'},category:{en:'Automotive',ar:'سيارات'},material:'Resin',price:195,stock:17,inStock:true,badge:null,status:'active',colors:['#E17055','#0984E3','#2D3436'],rating:4.7,reviews:39},
];

/* Expose as browser globals so all pages can access them */
if (typeof window !== 'undefined') {
  window.ProductStore = ProductStore;
  window.AdminDB      = AdminDB;
  window.CAT_AR       = CAT_AR;
  window._sbClient    = _sb;   // AuthService in auth.js reads this
}
