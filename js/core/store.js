/* ============================================================
   Balance 3D — ProductStore  (store.js  v3)

   Single source of truth for all product data.
   Loaded by BOTH the storefront (index/products pages)
   and the admin dashboard — with no other file required.

   Storage key:  'b3d_products'       (canonical array)
   Image keys:   'b3d_admin_img_<id>' (base64, one per product)

   Canonical product schema
   ─────────────────────────
   {
     id:       string
     title:    { en: string, ar: string }
     desc:     { en: string, ar: string }
     category: { en: string, ar: string }
     material: string
     price:    number
     stock:    number   (integer ≥ 0)
     inStock:  boolean  (stock > 0 AND status !== 'out_of_stock')
     badge:    string|null   ('new','popular','sale','trending','bestseller')
     status:   string        ('active','draft','out_of_stock')
     colors:   string[]      (hex codes for placeholder SVG)
     rating:   number
     reviews:  number
   }
   ============================================================ */

'use strict';

/* ------------------------------------------------------------------ */
/*  Arabic category labels (for admin → canonical conversion)          */
/* ------------------------------------------------------------------ */
const CAT_AR = {
  'Figurines':    'مجسمات',
  'Tools':        'أدوات',
  'Architecture': 'هندسة معمارية',
  'Jewelry':      'مجوهرات',
  'Home Decor':   'ديكور منزلي',
  'Engineering':  'هندسة',
  'Gaming':       'ألعاب',
  'Automotive':   'سيارات',
  'Other':        'أخرى',
};

/* ------------------------------------------------------------------ */
/*  Built-in seed — canonical schema, used when no stored data exists. */
/*  Shared between storefront (data.js) and admin (admin-data.js).     */
/* ------------------------------------------------------------------ */
const _STORE_SEED = [
  {
    id:'p001', title:{en:'Articulated Dragon',ar:'تنين متحرك'},
    desc:{en:'Fully articulated dragon with moving joints. Printed in premium PLA.',ar:'تنين متحرك بالكامل مع مفاصل قابلة للحركة. مطبوع بـ PLA عالي الجودة.'},
    category:{en:'Figurines',ar:'مجسمات'}, material:'PLA Pro',
    price:145, stock:23, inStock:true, badge:'popular', status:'active',
    colors:['#E8E8E8','#2D3436','#0984E3'], rating:4.9, reviews:124,
  },
  {
    id:'p002', title:{en:'Desk Organizer Pro',ar:'منظم مكتب احترافي'},
    desc:{en:'Modular desk organizer with 8 compartments. PETG for durability.',ar:'منظم مكتب معياري بـ٨ أقسام. مصنوع من PETG للمتانة.'},
    category:{en:'Tools',ar:'أدوات'}, material:'PETG',
    price:89, stock:40, inStock:true, badge:'new', status:'active',
    colors:['#FDCB6E','#2D3436','#FFFFFF'], rating:4.7, reviews:87,
  },
  {
    id:'p003', title:{en:'Mini Skyline Model',ar:'نموذج أفق مصغر'},
    desc:{en:'Detailed cityscape miniature. Perfect for offices and gifts.',ar:'نموذج مصغر مفصّل للمدينة. مثالي للمكاتب والهدايا.'},
    category:{en:'Architecture',ar:'هندسة معمارية'}, material:'Resin',
    price:220, stock:12, inStock:true, badge:null, status:'active',
    colors:['#DFE6E9','#2D3436'], rating:4.8, reviews:53,
  },
  {
    id:'p004', title:{en:'Geometric Ring Set',ar:'طقم خواتم هندسية'},
    desc:{en:'Set of 3 geometric rings printed in resin. Multiple sizes.',ar:'طقم من ٣ خواتم هندسية مطبوعة بالراتنج. أحجام متعددة.'},
    category:{en:'Jewelry',ar:'مجوهرات'}, material:'Resin',
    price:65, stock:78, inStock:true, badge:'sale', status:'active',
    colors:['#A29BFE','#FD79A8','#FFEAA7'], rating:4.6, reviews:211,
  },
  {
    id:'p005', title:{en:'Vase Collection',ar:'مجموعة المزهريات'},
    desc:{en:'Elegant parametric vase set. Available in 3 sizes.',ar:'طقم مزهريات بتصميم هندسي أنيق. متوفر بـ٣ أحجام.'},
    category:{en:'Home Decor',ar:'ديكور منزلي'}, material:'PLA Pro',
    price:110, stock:31, inStock:true, badge:'new', status:'active',
    colors:['#FFFFFF','#636E72','#00B894'], rating:4.8, reviews:98,
  },
  {
    id:'p006', title:{en:'Gear Mechanism',ar:'آلية التروس'},
    desc:{en:'Functional gear set with 5 interlocking gears. Educational.',ar:'طقم تروس وظيفي بـ٥ تروس متشابكة. تعليمي.'},
    category:{en:'Engineering',ar:'هندسة'}, material:'PETG',
    price:175, stock:0, inStock:false, badge:null, status:'out_of_stock',
    colors:['#FF6B35','#2D3436'], rating:4.9, reviews:42,
  },
  {
    id:'p007', title:{en:'Chess Set 3D',ar:'طقم شطرنج ثلاثي الأبعاد'},
    desc:{en:'Full chess set with unique 3D designs. Board included.',ar:'طقم شطرنج كامل بتصاميم ثلاثية الأبعاد فريدة. يشمل اللوحة.'},
    category:{en:'Gaming',ar:'ألعاب'}, material:'PLA Pro',
    price:340, stock:9, inStock:true, badge:'popular', status:'active',
    colors:['#2D3436','#DFE6E9'], rating:5.0, reviews:67,
  },
  {
    id:'p008', title:{en:'Scale Car Model',ar:'نموذج سيارة مصغر'},
    desc:{en:'Highly detailed 1:24 scale car model. Resin printed.',ar:'نموذج سيارة مفصّل للغاية بمقياس ١:٢٤. مطبوع بالراتنج.'},
    category:{en:'Automotive',ar:'سيارات'}, material:'Resin',
    price:195, stock:17, inStock:true, badge:null, status:'active',
    colors:['#E17055','#0984E3','#2D3436'], rating:4.7, reviews:39,
  },
];

/* ------------------------------------------------------------------ */
/*  ProductStore                                                        */
/* ------------------------------------------------------------------ */
const ProductStore = {
  KEY: 'b3d_products',

  /* ---- Storage ---- */
  _read() {
    try {
      const v = localStorage.getItem(this.KEY);
      if (v) return JSON.parse(v);
    } catch (_) {}
    return null;
  },

  _write(arr) {
    try { localStorage.setItem(this.KEY, JSON.stringify(arr)); return true; }
    catch (e) { console.warn('[ProductStore] write failed:', e); return false; }
  },

  /* ---- Auto-seed on first load ---- */
  _ensureSeeded() {
    if (this._read() !== null) return;   // already has data
    this._write(_STORE_SEED);
  },

  /* Explicit seed from external data (kept for data.js compatibility) */
  seed(products) {
    if (this._read() !== null) return;
    this._write(products.map(p => this._toCanonical(p)));
  },

  /* ---------------------------------------------------------------- */
  /*  Storefront API                                                    */
  /* ---------------------------------------------------------------- */

  /** All products (excludes drafts by default) */
  getAll(includeNonActive) {
    this._ensureSeeded();
    const arr = this._read() || [];
    return includeNonActive ? arr : arr.filter(p => p.status !== 'draft');
  },

  getById(id) {
    return this.getAll(true).find(p => p.id === id) || null;
  },

  /** Resolve display image: uploaded base64 → SVG fallback */
  resolveImage(product) {
    if (product?.id) {
      try {
        const up = localStorage.getItem('b3d_admin_img_' + product.id);
        if (up) return up;
      } catch (_) {}
    }
    const c = encodeURIComponent((product?.colors?.[0]) || '#C0C8E0');
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='${c}1A' width='400' height='300'/%3E%3Cg transform='translate(200,150)'%3E%3Cpolygon points='0,-68 59,34 -59,34' fill='${c}33' stroke='${c}' stroke-width='2'/%3E%3Crect x='-29' y='34' width='58' height='38' fill='${c}22' stroke='${c}' stroke-width='1.5'/%3E%3C/g%3E%3C/svg%3E`;
  },

  getImage(id) {
    try { return localStorage.getItem('b3d_admin_img_' + id) || null; } catch (_) { return null; }
  },

  /* ---------------------------------------------------------------- */
  /*  Admin API                                                         */
  /* ---------------------------------------------------------------- */

  /** All products in admin flat schema */
  adminGetAll() {
    this._ensureSeeded();
    return this.getAll(true).map(p => this._toAdmin(p));
  },

  /** Upsert from admin flat schema */
  adminSave(a) {
    this._ensureSeeded();
    const arr   = this.getAll(true);
    const canon = this._fromAdmin(a);
    const idx   = arr.findIndex(p => p.id === canon.id);
    if (idx >= 0) arr[idx] = canon;
    else          arr.unshift(canon);
    return this._write(arr);
  },

  /** Delete product + image */
  adminDelete(id) {
    this._ensureSeeded();
    const arr = this.getAll(true).filter(p => p.id !== id);
    try { localStorage.removeItem('b3d_admin_img_' + id); } catch (_) {}
    return this._write(arr);
  },

  /** Save uploaded image */
  saveImage(id, base64) {
    try { localStorage.setItem('b3d_admin_img_' + id, base64); return true; }
    catch (e) { console.warn('[ProductStore] image save failed:', e); return false; }
  },

  deleteImage(id) {
    try { localStorage.removeItem('b3d_admin_img_' + id); } catch (_) {}
  },

  /* ---------------------------------------------------------------- */
  /*  Schema converters                                                 */
  /* ---------------------------------------------------------------- */

  /** Loose input (from old data.js PRODUCTS array) → canonical */
  _toCanonical(p) {
    const catEn = (typeof p.category === 'object') ? (p.category.en || '') : (p.category || '');
    const catAr = (typeof p.category === 'object') ? (p.category.ar || '') : (CAT_AR[p.category] || p.category || '');
    const stock = Number(p.stock !== undefined ? p.stock : (p.inStock ? 10 : 0));
    return {
      id:       p.id,
      title:    typeof p.title === 'object' ? p.title    : { en: p.title || '',    ar: p.title || '' },
      desc:     typeof p.desc  === 'object' ? p.desc     : { en: p.desc  || '',    ar: p.desc  || '' },
      category: { en: catEn, ar: catAr },
      material: p.material || '',
      price:    Number(p.price)   || 0,
      stock,
      inStock:  (p.inStock !== undefined) ? Boolean(p.inStock) : stock > 0,
      badge:    p.badge  || null,
      status:   p.status || (p.inStock === false ? 'out_of_stock' : 'active'),
      colors:   Array.isArray(p.colors) ? p.colors : ['#C0C8E0'],
      rating:   Number(p.rating)  || 0,
      reviews:  Number(p.reviews) || 0,
    };
  },

  /** Admin flat → canonical */
  _fromAdmin(a) {
    const catEn = a.category || '';
    const stock = Number(a.stock) || 0;
    return {
      id:       a.id,
      title:    { en: a.titleEn || '', ar: a.titleAr || '' },
      desc:     { en: a.descEn  || '', ar: a.descAr  || '' },
      category: { en: catEn, ar: CAT_AR[catEn] || catEn },
      material: a.material || '',
      price:    Number(a.price) || 0,
      stock,
      inStock:  stock > 0 && a.status !== 'out_of_stock',
      badge:    a.badge  || null,
      status:   a.status || 'active',
      colors:   Array.isArray(a.colors) ? a.colors : ['#C0C8E0'],
      rating:   Number(a.rating)  || 0,
      reviews:  Number(a.reviews) || 0,
    };
  },

  /** Canonical → admin flat */
  _toAdmin(p) {
    return {
      id:       p.id,
      titleEn:  p.title?.en  || '',
      titleAr:  p.title?.ar  || '',
      descEn:   p.desc?.en   || '',
      descAr:   p.desc?.ar   || '',
      category: p.category?.en || '',
      material: p.material   || '',
      price:    p.price,
      stock:    p.stock,
      badge:    p.badge,
      status:   p.status,
      colors:   p.colors,
      rating:   p.rating,
      reviews:  p.reviews,
    };
  },
};

/* Auto-seed immediately so any page that loads store.js has data */
ProductStore._ensureSeeded();
