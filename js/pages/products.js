/* ============================================================
   Balance 3D — Products Page  (v2 — unified store)
   ============================================================ */

'use strict';

const ProductsPage = {
  activeCategory:  'all',
  activeMaterials: [],
  maxPrice:        9999,   // set properly on init from store
  searchQuery:     '',
  sortMode:        'default',

  async init() {
    // Refresh PRODUCTS from store on every init (catches admin edits)
    if (typeof ProductStore !== 'undefined') {
      PRODUCTS = await ProductStore.getAll();
    }
    this.maxPrice = this._maxStorePrice();
    this._syncPriceSlider();
    this.renderFilters();
    this.renderProducts();
    this.bindEvents();
    this.updateLabels();
  },

  _maxStorePrice() {
    if (!PRODUCTS.length) return 500;
    /* Use salePrice (effective price) for the slider range */
    return Math.ceil(Math.max(...PRODUCTS.map(p => p.salePrice ?? p.price ?? 0)) / 50) * 50;
  },

  _syncPriceSlider() {
    const slider = document.getElementById('priceMax');
    if (slider) {
      slider.max   = this.maxPrice;
      slider.value = this.maxPrice;
    }
  },

  updateLabels() {
    const l  = App.lang;
    const el = id => document.getElementById(id);
    if (el('sidebarCatTitle'))   el('sidebarCatTitle').textContent   = l === 'ar' ? 'الفئات'      : 'Categories';
    if (el('sidebarMatTitle'))   el('sidebarMatTitle').textContent   = l === 'ar' ? 'المادة'      : 'Material';
    if (el('sidebarPriceTitle')) el('sidebarPriceTitle').textContent = l === 'ar' ? 'نطاق السعر'  : 'Price Range';
    if (el('sortDefault'))       el('sortDefault').textContent       = l === 'ar' ? 'الافتراضي'   : 'Default';
    if (el('sortPriceAsc'))      el('sortPriceAsc').textContent      = l === 'ar' ? 'السعر: الأقل أولاً' : 'Price: Low to High';
    if (el('sortPriceDesc'))     el('sortPriceDesc').textContent     = l === 'ar' ? 'السعر: الأعلى أولاً': 'Price: High to Low';
    if (el('sortRating'))        el('sortRating').textContent        = l === 'ar' ? 'الأعلى تقييماً'     : 'Top Rated';
    if (el('emptyTitle'))        el('emptyTitle').textContent        = l === 'ar' ? 'لا توجد منتجات'     : 'No products found';
    if (el('emptyDesc'))         el('emptyDesc').textContent         = l === 'ar' ? 'جرب تعديل الفلاتر أو مصطلح البحث.' : 'Try adjusting your filters or search term.';
    const priceLabel = el('priceMaxLabel');
    if (priceLabel) priceLabel.textContent = `${this.maxPrice} ${l === 'ar' ? 'ر.س' : 'SAR'}`;
  },

  /* ---- Filters ---- */
  renderFilters() {
    const l = App.lang;

    // Dynamic category counts from live store
    const catList = document.getElementById('categoryList');
    if (catList) {
      catList.innerHTML = CATEGORIES.map(c => `
        <li class="sidebar-item ${this.activeCategory === c.id ? 'active' : ''}" data-cat="${c.id}">
          <span>${c[l]}</span>
          <span class="sidebar-item__count">${this._catCount(c.id)}</span>
        </li>
      `).join('');
      catList.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
          this.activeCategory = item.dataset.cat;
          this.renderFilters();
          this.renderProducts();
        });
      });
    }

    // Materials
    const matList = document.getElementById('materialList');
    if (matList) {
      matList.innerHTML = MATERIALS.map(m => `
        <li class="sidebar-item ${this.activeMaterials.includes(m.id) ? 'active' : ''}" data-mat="${m.id}">
          <span class="sidebar-item-dot" style="background:${m.color}"></span>
          <span>${m[l].name}</span>
          <span class="sidebar-item__count">${this._matCount(m.id)}</span>
        </li>
      `).join('');
      matList.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
          const id  = item.dataset.mat;
          const idx = this.activeMaterials.indexOf(id);
          if (idx >= 0) this.activeMaterials.splice(idx, 1);
          else          this.activeMaterials.push(id);
          this.renderFilters();
          this.renderProducts();
        });
      });
    }
  },

  _catCount(catId) {
    if (catId === 'all') return PRODUCTS.length;
    const name = CATEGORIES.find(c => c.id === catId)?.en?.toLowerCase() || '';
    return PRODUCTS.filter(p => (p.category?.en || '').toLowerCase() === name).length;
  },

  _matCount(matId) {
    const matMap = { pla: 'PLA Pro', petg: 'PETG', resin: 'Resin', abs: 'ABS' };
    return PRODUCTS.filter(p => p.material === matMap[matId]).length;
  },

  /* ---- Filtering + sorting ---- */
  getFilteredProducts() {
    let list = [...PRODUCTS];

    // Category
    if (this.activeCategory !== 'all') {
      const name = CATEGORIES.find(c => c.id === this.activeCategory)?.en?.toLowerCase() || '';
      list = list.filter(p => (p.category?.en || '').toLowerCase() === name);
    }

    // Material
    if (this.activeMaterials.length > 0) {
      const matMap = { pla: 'PLA Pro', petg: 'PETG', resin: 'Resin', abs: 'ABS' };
      list = list.filter(p => this.activeMaterials.some(m => matMap[m] === p.material));
    }

    // Price — filter by effective (sale) price
    list = list.filter(p => (p.salePrice ?? p.price ?? 0) <= this.maxPrice);

    // Search (title EN+AR, category EN+AR, material)
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p =>
        (p.title?.en  || '').toLowerCase().includes(q) ||
        (p.title?.ar  || '').includes(q)               ||
        (p.category?.en || '').toLowerCase().includes(q) ||
        (p.category?.ar || '').includes(q)             ||
        (p.material   || '').toLowerCase().includes(q)
      );
    }

    // Sort by effective price
    if (this.sortMode === 'price-asc')  list.sort((a, b) => (a.salePrice??a.price??0) - (b.salePrice??b.price??0));
    if (this.sortMode === 'price-desc') list.sort((a, b) => (b.salePrice??b.price??0) - (a.salePrice??a.price??0));
    if (this.sortMode === 'rating')     list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  },

  /* ---- Product grid ---- */
  renderProducts() {
    // Always re-read from store so edits/deletions are reflected immediately
    // (sync read from cached PRODUCTS — full refresh happens via data.js async init)

    const grid    = document.getElementById('productsGrid');
    const empty   = document.getElementById('productsEmpty');
    const countEl = document.getElementById('productsCount');
    if (!grid) return;

    const list = this.getFilteredProducts();
    const l    = App.lang;

    if (countEl) {
      countEl.textContent = `${list.length} ${App.t('products.count')}`;
    }

    if (list.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'flex';
      return;
    }
    if (empty) empty.style.display = 'none';

    const sar = App.t('product.sar');

    grid.innerHTML = list.map((p, i) => {
      const badgeMap = {
        popular:    `<span class="badge badge-accent">${App.t('product.popular')}</span>`,
        new:        `<span class="badge badge-success">${App.t('product.new')}</span>`,
        sale:       `<span class="badge badge-warm">${App.t('product.sale')}</span>`,
        trending:   `<span class="badge badge-accent">${l === 'ar' ? 'رائج' : 'Trending'}</span>`,
        bestseller: `<span class="badge badge-warm">${l === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller'}</span>`,
      };
      const imgSrc  = getProductPlaceholderSvg(p);
      const stars   = '★'.repeat(Math.min(5, Math.round(p.rating || 0)));
      const stockQty = Number(p.stock) || 0;
      const inStock  = p.inStock && p.status !== 'out_of_stock' && stockQty > 0;

      /* Discount chip — shown when isOnSale; replaces the badge pill on the image */
      const saleChip = (() => {
        if (!p.isOnSale || !p.originalPrice) return '';
        const ep  = p.salePrice ?? p.price ?? 0;
        const pct = Math.round(((p.originalPrice - ep) / p.originalPrice) * 100);
        return `<div class="product-card__discount-chip">${l==='ar'?`خصم ${pct}%`:`${pct}% off`}</div>`;
      })();

      /* Badge pill — only shown when there is NO discount chip to avoid overlap */
      const effectiveBadge = !saleChip ? p.badge : null;
      const badge = effectiveBadge ? (badgeMap[effectiveBadge] || '') : '';

      /* Stock badge: green ≥10, orange 1-9, red 0 */
      const inStockEl = !inStock
        ? `<span class="badge" style="background:rgba(239,68,68,.1);color:var(--clr-error,#ef4444);font-size:.62rem">${l==='ar'?'نفد المخزون':'Out of Stock'}</span>`
        : stockQty < 10
          ? `<span class="badge" style="background:rgba(245,158,11,.12);color:#d97706;font-size:.62rem">${l==='ar'?`تبقّى ${stockQty} فقط`:`Only ${stockQty} left`}</span>`
          : `<span class="badge badge-success" style="font-size:.62rem">${l==='ar'?'متوفر ✓':'In Stock ✓'}</span>`;

      /* Out-of-stock overlay on card image */
      const oosOverlay = !inStock
        ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;
                       justify-content:center;border-radius:inherit;z-index:2">
             <span style="color:#fff;font-size:.78rem;font-weight:700;background:rgba(239,68,68,.85);
                          padding:.3rem .75rem;border-radius:100px;letter-spacing:.03em">
               ${l==='ar'?'نفد المخزون':'Out of Stock'}
             </span>
           </div>`
        : '';

      return `
        <div class="card product-card reveal" style="transition-delay:${Math.min(i, 8) * 55}ms${!inStock?';opacity:.72;filter:grayscale(.25)':''}">
          <div class="product-card__image" style="position:relative">
            <img src="${imgSrc}" alt="${(p.title?.[l] || '').replace(/"/g,'&quot;')}" loading="lazy"/>
            ${badge ? `<div class="product-card__badge">${badge}</div>` : ''}
            ${saleChip}
            ${oosOverlay}
          </div>
          <div class="product-card__body">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span class="product-card__category">${p.category?.[l] || ''}</span>
              ${inStockEl}
            </div>
            <h3 class="product-card__title">${p.title?.[l] || ''}</h3>
            <p class="product-card__desc">${p.desc?.[l] || ''}</p>
            <div style="display:flex;align-items:center;gap:var(--space-2);margin-top:var(--space-2)">
              <span style="color:var(--clr-warning);font-size:var(--text-xs)">${stars}</span>
              ${p.reviews ? `<span style="font-size:var(--text-xs);color:var(--clr-text-muted)">(${p.reviews})</span>` : ''}
              <span style="font-size:var(--text-xs);color:var(--clr-text-muted)">• ${p.material || ''}</span>
            </div>
            <div class="product-card__footer">
              ${renderProductPrice(p, sar)}
              ${inStock
                ? `<button class="btn btn-primary btn-sm" data-pid="${p.id}" onclick="App.addToCart(typeof ProductStore!=='undefined' ? ProductStore.getById(this.dataset.pid) : PRODUCTS.find(x=>x.id===this.dataset.pid))">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                       <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                       <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                     </svg>
                     ${App.t('product.add')}
                   </button>`
                : `<button class="btn btn-outline btn-sm" disabled style="opacity:.5;cursor:not-allowed">
                     ${l === 'ar' ? 'نفذ من المخزون' : 'Out of Stock'}
                   </button>`
              }
            </div>
          </div>
        </div>
      `;
    }).join('');

    Reveal.refresh();
  },

  /* ---- Events ---- */
  bindEvents() {
    // Search
    const search = document.getElementById('productSearch');
    if (search) {
      search.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        this.renderProducts();
      });
    }

    // Sort
    const sort = document.getElementById('productSort');
    if (sort) {
      sort.addEventListener('change', (e) => {
        this.sortMode = e.target.value;
        this.renderProducts();
      });
    }

    // Price range
    const priceMax = document.getElementById('priceMax');
    if (priceMax) {
      priceMax.addEventListener('input', (e) => {
        this.maxPrice = parseInt(e.target.value);
        const pct = (this.maxPrice / parseInt(e.target.max || priceMax.max || 500)) * 100;
        e.target.style.setProperty('--pct', pct + '%');
        const lbl = document.getElementById('priceMaxLabel');
        if (lbl) lbl.textContent = `${this.maxPrice} ${App.lang === 'ar' ? 'ر.س' : 'SAR'}`;
        this.renderProducts();
      });
    }

    // Mobile sidebar toggle
    const toggle  = document.getElementById('filterToggle');
    const sidebar = document.getElementById('productsSidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const closeSidebar = () => sidebar.classList.remove('open');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
    // Close sidebar via X button
    if (sidebarClose) {
      sidebarClose.addEventListener('click', closeSidebar);
    }
    // Close sidebar when clicking outside (on the backdrop)
    document.addEventListener('click', (e) => {
      if (sidebar && sidebar.classList.contains('open')) {
        // If click is outside the sidebar and not on the toggle button
        if (!sidebar.contains(e.target) && e.target !== toggle && !toggle?.contains(e.target)) {
          closeSidebar();
        }
      }
    });
  },
};

/* ---- currentPage hook (called by App.applyLang on language switch) ---- */
window.currentPage = {
  async render() {
    if (typeof ProductStore !== 'undefined') {
      try { PRODUCTS = await ProductStore.getAll(); } catch(_) {}
    }
    ProductsPage.renderFilters();
    ProductsPage.renderProducts();
    ProductsPage.updateLabels();
  },
};

document.addEventListener('DOMContentLoaded', () => ProductsPage.init().catch(e => console.error('[ProductsPage]', e)));
