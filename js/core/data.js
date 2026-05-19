/* ============================================================
   Balance 3D — data.js  (v4 — Supabase-aware)

   db.js (loaded before this) exports ProductStore backed by
   Supabase with a localStorage fallback.

   ProductStore.getAll() is now async. This file:
   - Initialises PRODUCTS as an empty array (sync start)
   - Fetches products async and calls page render when ready
   - Provides CATEGORIES, MATERIALS, getProductPlaceholderSvg
   ============================================================ */
'use strict';

/* Live product list — populated async */
let PRODUCTS = [];

/* Kick off async load; pages render when this resolves */
(async () => {
  try {
    PRODUCTS = await ProductStore.getAll();
  } catch (e) {
    console.error('[data] ProductStore.getAll failed:', e);
    PRODUCTS = [];
  }
  // Notify any already-initialised page renderer
  if (window.currentPage?.render)   window.currentPage.render();
  if (typeof renderHomeProducts === 'function') renderHomeProducts();
})();

/* Filter/sort metadata */
const CATEGORIES = [
  { id:'all',         en:'All',         ar:'الكل' },
  { id:'figurines',   en:'Figurines',   ar:'مجسمات' },
  { id:'tools',       en:'Tools',       ar:'أدوات' },
  { id:'home-decor',  en:'Home Decor',  ar:'ديكور' },
  { id:'engineering', en:'Engineering', ar:'هندسة' },
  { id:'jewelry',     en:'Jewelry',     ar:'مجوهرات' },
  { id:'gaming',      en:'Gaming',      ar:'ألعاب' },
];

const MATERIALS = [
  { id:'pla',  name:'PLA Pro', color:'#00B894', en:{name:'PLA Pro', desc:'Best for decorative pieces and prototypes. Biodegradable, wide color range.'}, ar:{name:'PLA Pro', desc:'الأفضل للقطع الزخرفية والنماذج الأولية. قابل للتحلل البيولوجي.'} },
  { id:'petg', name:'PETG',    color:'#0984E3', en:{name:'PETG',    desc:'Strong and flexible. Ideal for functional parts and mechanical components.'}, ar:{name:'PETG',    desc:'قوي ومرن. مثالي للأجزاء الوظيفية والمكونات الميكانيكية.'} },
  { id:'resin',name:'Resin',   color:'#A29BFE', en:{name:'Resin',   desc:'Ultra-fine detail. Perfect for jewelry, miniatures, and display models.'},    ar:{name:'راتنج',   desc:'تفاصيل فائقة الدقة. مثالي للمجوهرات والمجسمات المصغرة.'} },
  { id:'abs',  name:'ABS',     color:'#FDCB6E', en:{name:'ABS',     desc:'Heat-resistant and durable. Best for engineering applications.'},             ar:{name:'ABS',     desc:'مقاوم للحرارة ومتين. الأفضل لتطبيقات الهندسة.'} },
];

/* Image resolver */
function getProductPlaceholderSvg(product) {
  return ProductStore.resolveImage(product);
}

/* Supabase realtime: refresh on product table changes */
if (typeof ProductStore.subscribeToProducts === 'function') {
  ProductStore.subscribeToProducts(async () => {
    PRODUCTS = await ProductStore.getAll();
    if (window.currentPage?.render)   window.currentPage.render();
    if (typeof renderHomeProducts === 'function') renderHomeProducts();
  });
}

/* localStorage cross-tab sync (fallback when Supabase not configured) */
window.addEventListener('storage', async (e) => {
  if (!e.key || (!e.key.startsWith('b3d_products') && !e.key.startsWith('b3d_admin_img_'))) return;
  PRODUCTS = await ProductStore.getAll();
  if (window.currentPage?.render)   window.currentPage.render();
  if (typeof renderHomeProducts === 'function') renderHomeProducts();
});
