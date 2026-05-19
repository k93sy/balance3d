/* ============================================================
   Balance 3D Admin — Section Renderers  (v2)
   Dashboard | Products | Categories | Orders | Customers
   Shipping  | Payments | Reviews    | Settings
   ============================================================ */
'use strict';

/* ── Global helpers ─────────────────────────────────────────── */
function fmt(n)          { return Number(n||0).toLocaleString(); }
function fmtSar(n, lang) { return fmt(n) + ' ' + (lang==='ar'?'ر.س':'SAR'); }
function esc(s)          { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function stars(n)        { return '⭐'.repeat(Math.round(n||0)) + '☆'.repeat(5-Math.round(n||0)); }

const STATUS_CLR = {
  pending:'warning', processing:'info', shipped:'accent',
  delivered:'success', cancelled:'error',
  paid:'success', refunded:'warning',
  active:'success', blocked:'error', draft:'neutral', out_of_stock:'error',
  approved:'success',
};

function badge(status, pfx) {
  const cls   = STATUS_CLR[status] || 'neutral';
  const label = Admin.t(pfx + '.' + status) || status;
  return `<span class="adm-badge adm-badge--${cls} adm-badge--dot">${esc(label)}</span>`;
}

function prodBadge(b) {
  if (!b) return '<span style="color:var(--clr-text-muted)">—</span>';
  const c = {new:'accent',popular:'warm',sale:'error',trending:'info',bestseller:'success'}[b]||'neutral';
  return `<span class="adm-badge adm-badge--${c}">${esc(Admin.t('prod.badge.'+b))}</span>`;
}

/* ── Pagination ─────────────────────────────────────────────── */
const _pages = {};
function getPage(k, total, pp=10) {
  if (!_pages[k]) _pages[k] = 1;
  _pages[k] = Math.min(_pages[k], Math.max(1, Math.ceil(total/pp)));
  return _pages[k];
}
function setPage(k, p) { _pages[k] = p; }

function pager(key, total, pp=10, onRender='') {
  if (total === 0) return '';
  const cur  = getPage(key, total, pp);
  const pgs  = Math.max(1, Math.ceil(total/pp));
  const s    = (cur-1)*pp+1, e = Math.min(cur*pp, total);
  let btns = '';
  const maxShow = 5;
  let lo = Math.max(1, cur - Math.floor(maxShow/2));
  let hi = Math.min(pgs, lo + maxShow - 1);
  if (hi - lo < maxShow - 1) lo = Math.max(1, hi - maxShow + 1);
  if (lo > 1)  btns += `<div class="adm-pager__page" onclick="setPage('${key}',1);${onRender}">1</div>${lo>2?'<div class="adm-pager__dots">…</div>':''}`;
  for (let i=lo; i<=hi; i++) btns += `<div class="adm-pager__page${i===cur?' active':''}" onclick="setPage('${key}',${i});${onRender}">${i}</div>`;
  if (hi < pgs) btns += `${hi<pgs-1?'<div class="adm-pager__dots">…</div>':''}<div class="adm-pager__page" onclick="setPage('${key}',${pgs});${onRender}">${pgs}</div>`;
  const l = Admin.lang;
  return `<div class="adm-pager">
    <span class="adm-pager__info">${Admin.t('common.showing')} ${s}–${e} ${Admin.t('common.of')} ${total}</span>
    <div class="adm-pager__pages">
      <div class="adm-pager__page${cur===1?' disabled':''}" onclick="if(${cur}>1){setPage('${key}',${cur-1});${onRender}}">&lsaquo;</div>
      ${btns}
      <div class="adm-pager__page${cur===pgs?' disabled':''}" onclick="if(${cur}<${pgs}){setPage('${key}',${cur+1});${onRender}}">&rsaquo;</div>
    </div>
  </div>`;
}

/* ============================================================
   DASHBOARD
   ============================================================ */
const DashboardSection = {
  async render() {
    const el = document.getElementById('section-dashboard');
    if (!el) return;
    try {
    el.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--clr-text-muted)">${Admin.t('common.loading')}</div>`;
    const s = await AdminDB.getStats();
    const l = Admin.lang;
    const t = k => Admin.t(k);

    /* Stat cards */
    const stats = `<div class="adm-stats-row">
      ${this._stat('stat.monthly',  fmtSar(s.monthRevenue,l),  '+12%', true,  'blue',   this._ico('revenue'))}
      ${this._stat('stat.pending',  s.pendingOrders,           s.pendingOrders>0?'▲':'', false, 'warm', this._ico('orders'))}
      ${this._stat('stat.products', s.totalProducts,           '',     true,  'purple', this._ico('box'))}
      ${this._stat('stat.customers',s.totalCustomers,          '+5',   true,  'green',  this._ico('users'))}
    </div>`;

    /* Revenue bars */
    const maxV  = Math.max(...s.weekChart.map(d=>d.val), 1);
    const bars  = s.weekChart.map(d=>`
      <div class="adm-bar-group">
        <div class="adm-bar-val">${d.val?fmt(d.val):''}</div>
        <div class="adm-bar" style="height:${Math.max(6,(d.val/maxV)*140)}px" title="${fmtSar(d.val,l)}"></div>
        <div class="adm-bar-label">${esc(d.day)}</div>
      </div>`).join('');

    /* Donut */
    const tot    = s.orderStatusDist.reduce((a,b)=>a+b.count,0)||1;
    const deliv  = s.orderStatusDist.find(x=>x.status==='delivered')?.count||0;
    const pct    = Math.round(deliv/tot*100);
    const circ   = 2*Math.PI*44;
    const offset = circ-(pct/100)*circ;

    /* Recent orders */
    const orders = AdminDB.getOrders().slice(0,6);
    const ordRows= orders.map(o=>`<tr>
      <td><code class="adm-code">${esc(o.id)}</code></td>
      <td>${esc(l==='ar'?o.customer.ar:o.customer.en)}</td>
      <td><strong>${fmtSar(o.amount,l)}</strong></td>
      <td>${badge(o.status,'ord.status')}</td>
      <td>${esc(o.date)}</td>
    </tr>`).join('');

    /* Low stock */
    const prods   = AdminDB.getProducts();
    const lowStock= prods.filter(p=>p.stock<5 && p.stock>=0);
    const lowRows = lowStock.map(p=>`<tr>
      <td>${esc(l==='ar'?p.titleAr:p.titleEn)}</td>
      <td><strong style="color:${p.stock===0?'var(--clr-error)':'var(--clr-warning)'}">${p.stock}</strong></td>
      <td>${badge(p.status,'prod.status')}</td>
    </tr>`).join('');

    /* Pending reviews */
    const noReply = AdminDB.getReviews().filter(r=>!r.reply).length;

    el.innerHTML = `
      ${stats}
      ${noReply>0?`<div class="adm-alert adm-alert--warning" style="margin-bottom:var(--adm-space-5)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:16px;height:16px;flex-shrink:0">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span>${l==='ar'?`لديك <strong>${noReply}</strong> تقييم بدون رد`:`You have <strong>${noReply}</strong> unanswered review${noReply>1?'s':''}`}
        — <a href="#" onclick="Admin.navigate('reviews');return false" style="color:var(--clr-accent);text-decoration:underline">${l==='ar'?'عرض التقييمات':'View Reviews'}</a></span>
      </div>`:''}
      <div class="adm-grid-2-1" style="margin-bottom:var(--adm-space-5)">
        <div class="adm-chart-box">
          <div class="adm-chart-header">
            <div class="adm-chart-title">${t('dash.revenueChart')}</div>
            <span class="adm-badge adm-badge--accent">${fmtSar(s.monthRevenue,l)}</span>
          </div>
          <div class="adm-bar-chart">${bars}</div>
        </div>
        <div class="adm-chart-box" style="display:flex;flex-direction:column;align-items:center">
          <div class="adm-chart-title" style="margin-bottom:var(--adm-space-4);align-self:flex-start">${t('dash.orderStatus')}</div>
          <div class="adm-donut" style="position:relative;width:130px;height:130px">
            <svg viewBox="0 0 100 100" width="130" height="130" style="position:absolute;inset:0">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--clr-surface-2)" stroke-width="10"/>
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--clr-accent)" stroke-width="10" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round" style="transition:stroke-dashoffset .6s ease"/>
            </svg>
            <div class="adm-donut__label">
              <div class="adm-donut__val">${pct}%</div>
              <div class="adm-donut__sub">${l==='ar'?'مُسلَّم':'delivered'}</div>
            </div>
          </div>
          <div style="width:100%;margin-top:var(--adm-space-4);display:flex;flex-direction:column;gap:6px">
            ${s.orderStatusDist.map(x=>`
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:.72rem">
                <span style="color:var(--adm-text-muted)">${Admin.t('ord.status.'+x.status)}</span>
                <span style="font-weight:700">${x.count}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="adm-grid-2" style="margin-bottom:var(--adm-space-5)">
        <div class="adm-table-wrap">
          <div class="adm-table-toolbar">
            <div class="adm-table-title">${t('dash.recentOrders')}</div>
            <button class="adm-btn adm-btn--ghost adm-btn--sm" onclick="Admin.navigate('orders')">${l==='ar'?'عرض الكل':'View all'}</button>
          </div>
          <table><thead><tr>
            <th>${t('ord.id')}</th><th>${t('ord.customer')}</th>
            <th>${t('ord.amount')}</th><th>${t('ord.status')}</th><th>${t('ord.date')}</th>
          </tr></thead><tbody>${ordRows||`<tr><td colspan="5" style="text-align:center;padding:1.5rem;color:var(--adm-text-muted)">${t('common.noData')}</td></tr>`}</tbody></table>
        </div>
        ${lowStock.length?`
        <div class="adm-table-wrap">
          <div class="adm-table-toolbar">
            <div class="adm-table-title" style="color:var(--adm-warning)">
              ⚠ ${t('dash.lowStock')}
              <div style="font-size:.7rem;color:var(--adm-text-muted);font-weight:400">${t('dash.lowStockDesc')}</div>
            </div>
          </div>
          <table><thead><tr><th>${l==='ar'?'المنتج':'Product'}</th><th>${l==='ar'?'المخزون':'Stock'}</th><th>${t('ord.status')}</th></tr></thead>
          <tbody>${lowRows}</tbody></table>
        </div>`:`<div class="adm-chart-box" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem">
          <div style="font-size:3rem">✅</div>
          <div style="font-weight:600">${l==='ar'?'المخزون سليم':'Stock levels are healthy'}</div>
          <div style="font-size:.8rem;color:var(--adm-text-muted)">${l==='ar'?'لا يوجد منتجات ينفد مخزونها':'No products running low'}</div>
        </div>`}
      </div>`;
    } catch(e) {
      console.error('[DashboardSection]', e);
      el.innerHTML = `<div style="padding:2rem;color:var(--clr-error);text-align:center">⚠ ${esc(e.message)}</div>`;
    }
  },

  _stat(key, value, trend, up, color, icon) {
    const tHtml = trend ? `<div class="adm-stat-card__trend${up?' adm-stat-card__trend--up':' adm-stat-card__trend--down'}">${up?'▲':'▼'} ${trend} <span>${Admin.t('trend.vsLastMonth')}</span></div>` : '';
    return `<div class="adm-stat-card">
      <div class="adm-stat-card__icon adm-stat-card__icon--${color}">${icon}</div>
      <div class="adm-stat-card__body">
        <div class="adm-stat-card__label">${Admin.t(key)}</div>
        <div class="adm-stat-card__value">${value}</div>
        ${tHtml}
      </div>
    </div>`;
  },

  _ico(name) {
    const map = {
      revenue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      orders:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>',
      box:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      users:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    };
    return map[name] || '';
  },
};

/* ============================================================
   PRODUCTS
   ============================================================ */
const ProductsSection = {
  _search: '', _filter: 'all',
  _pendingImage: undefined,

  async render() {
    const el = document.getElementById('section-products');
    if (!el) return;
    const l  = Admin.lang, t = k => Admin.t(k);
    let prods = AdminDB.getProducts();
    if (this._search) prods = prods.filter(p => (l==='ar'?p.titleAr:p.titleEn).toLowerCase().includes(this._search.toLowerCase()) || p.category.toLowerCase().includes(this._search.toLowerCase()));
    if (this._filter !== 'all') prods = prods.filter(p => (p.badge||'') === this._filter);

    const page  = getPage('products', prods.length);
    const paged = prods.slice((page-1)*10, page*10);
    const BADGES= ['all','new','popular','sale','trending','bestseller'];

    const rows = paged.map(p => {
      const img = AdminDB.getImage(p.id) || this._placeholder(p);
      return `<tr>
        <td>
          <div class="adm-prod-cell">
            <img class="adm-thumb" src="${img}" alt="${esc(l==='ar'?p.titleAr:p.titleEn)}" loading="lazy"/>
            <div>
              <div class="adm-prod-cell__name">${esc(l==='ar'?p.titleAr:p.titleEn)}</div>
              <div class="adm-prod-cell__meta">${esc(p.category)} · ${esc(p.material)}</div>
            </div>
          </div>
        </td>
        <td><strong>${fmtSar(p.price,l)}</strong></td>
        <td><span class="adm-stock${p.stock===0?' adm-stock--zero':p.stock<5?' adm-stock--low':''}">${p.stock}</span></td>
        <td>${prodBadge(p.badge)}</td>
        <td>${badge(p.status,'prod.status')}</td>
        <td>
          <div class="adm-row-actions">
            <button class="adm-btn adm-btn--ghost adm-btn--icon" title="${t('prod.edit')}" onclick="ProductsSection.openEdit('${esc(p.id)}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="adm-btn adm-btn--danger adm-btn--sm" onclick="ProductsSection.confirmDelete('${esc(p.id)}')">${t('prod.delete')}</button>
          </div>
        </td>
      </tr>`;
    }).join('') || `<tr><td colspan="6" class="adm-empty">${t('common.noData')}</td></tr>`;

    const filterBtns = BADGES.map(b => `
      <button class="adm-filter-btn${this._filter===b?' active':''}" onclick="ProductsSection._filter='${b}';setPage('products',1);ProductsSection.render()">
        ${b==='all'?t('common.all'):t('prod.badge.'+b)}
      </button>`).join('');

    el.innerHTML = `
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('prod.title')} <span class="adm-count">${prods.length}</span></div>
          <div class="adm-table-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="ProductsSection._search=this.value;setPage('products',1);ProductsSection.render()"/>
          </div>
          <button class="adm-btn adm-btn--accent" onclick="ProductsSection.openAdd()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:15px;height:15px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ${t('prod.add')}
          </button>
        </div>
        <div class="adm-filter-bar">${filterBtns}</div>
        <div style="overflow-x:auto">
          <table>
            <thead><tr>
              <th>${l==='ar'?'المنتج':'Product'}</th>
              <th>${t('prod.price')}</th><th>${t('prod.stock')}</th>
              <th>${t('prod.badge')}</th><th>${t('prod.status')}</th>
              <th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${pager('products', prods.length, 10, 'ProductsSection.render()')}
      </div>`;
  },

  _placeholder(p) {
    const c = encodeURIComponent((p.colors&&p.colors[0])||'#E0E0E0');
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 60'%3E%3Crect fill='${c}22' width='80' height='60'/%3E%3Cg transform='translate(40,30)'%3E%3Cpolygon points='0,-18 16,9 -16,9' fill='${c}55' stroke='${c}' stroke-width='1.5'/%3E%3C/g%3E%3C/svg%3E`;
  },

  _compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Read failed'));
      reader.onload  = e => {
        const img = new Image();
        img.onerror = () => reject(new Error('Load failed'));
        img.onload  = () => {
          let { width: w, height: h } = img;
          const MAX = 900, Q = 0.82;
          if (w > MAX || h > MAX) { const r=Math.min(MAX/w,MAX/h); w=Math.round(w*r); h=Math.round(h*r); }
          const cv = document.createElement('canvas');
          cv.width=w; cv.height=h;
          cv.getContext('2d').drawImage(img,0,0,w,h);
          const webp = cv.toDataURL('image/webp', Q);
          resolve(webp.startsWith('data:image/webp') ? webp : cv.toDataURL('image/jpeg', Q));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  _formHtml(p = {}) {
    const t  = k => Admin.t(k);
    const BADGES   = ['','new','popular','sale','trending','bestseller'];
    const STATUSES = ['active','draft','out_of_stock'];
    const MATERIALS= ['PLA Pro','PETG','Resin','ABS','Nylon','TPU','PLA+'];
    const cats = AdminDB.getCategories();
    const cOpts = cats.map(c => `<option value="${esc(c.nameEn)}" ${p.category===c.nameEn?'selected':''}>${esc(c.nameEn)} — ${esc(c.nameAr)}</option>`).join('');
    const bOpts = BADGES.map(b=>`<option value="${b}" ${(p.badge||'')===b?'selected':''}>${b?t('prod.badge.'+b):t('prod.badge.none')}</option>`).join('');
    const sOpts = STATUSES.map(s=>`<option value="${s}" ${p.status===s?'selected':''}>${t('prod.status.'+s)}</option>`).join('');
    const mOpts = MATERIALS.map(m=>`<option value="${m}" ${p.material===m?'selected':''}>${m}</option>`).join('');

    const existImg = p.id ? AdminDB.getImage(p.id) : null;
    const uploadHtml = existImg
      ? `<div id="imgState">
           <div class="adm-img-preview" id="imgPreviewWrap">
             <img id="imgPreview" src="${existImg}" alt=""/>
             <button type="button" class="adm-img-preview__remove" id="imgRemove">✕</button>
           </div>
         </div>`
      : `<div id="imgState">
           <label class="adm-upload-zone" id="imgZone">
             <input type="file" id="imgFile" accept="image/*" style="display:none"/>
             <div class="adm-upload-zone__body">
               <div class="adm-upload-zone__icon">📸</div>
               <div class="adm-upload-zone__label">${Admin.lang==='ar'?'اسحب الصورة هنا أو انقر للتحديد':'Drop image here or click to browse'}</div>
               <div class="adm-upload-zone__sub">JPG · PNG · WebP · Max 15 MB</div>
             </div>
           </label>
           <div class="adm-upload-progress" id="imgProgress" style="display:none"><div id="imgBar"></div></div>
           <div id="imgPreviewWrap" style="display:none" class="adm-img-preview">
             <img id="imgPreview" src="" alt=""/>
             <button type="button" class="adm-img-preview__remove" id="imgRemove">✕</button>
           </div>
         </div>`;

    return `<div class="adm-form">
      <div class="adm-form-group">
        <label class="adm-label">${Admin.lang==='ar'?'صورة المنتج':'Product Image'}</label>
        ${uploadHtml}
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('prod.name.en')} <span class="adm-req">*</span></label><input class="adm-input" id="pTitleEn" value="${esc(p.titleEn||'')}"/></div>
        <div class="adm-form-group"><label class="adm-label">${t('prod.name.ar')} <span class="adm-req">*</span></label><input class="adm-input" id="pTitleAr" dir="rtl" value="${esc(p.titleAr||'')}"/></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('prod.desc.en')}</label><textarea class="adm-input adm-textarea" id="pDescEn" rows="2">${esc(p.descEn||'')}</textarea></div>
        <div class="adm-form-group"><label class="adm-label">${t('prod.desc.ar')}</label><textarea class="adm-input adm-textarea" id="pDescAr" dir="rtl" rows="2">${esc(p.descAr||'')}</textarea></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('prod.category')}</label><select class="adm-select" id="pCat">${cOpts}</select></div>
        <div class="adm-form-group"><label class="adm-label">${t('prod.material')}</label><select class="adm-select" id="pMat">${mOpts}</select></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('prod.price')} <span class="adm-req">*</span></label><input class="adm-input" type="number" min="0" step="0.01" id="pPrice" value="${p.price||''}"/></div>
        <div class="adm-form-group"><label class="adm-label">${t('prod.stock')} <span class="adm-req">*</span></label><input class="adm-input" type="number" min="0" id="pStock" value="${p.stock!==undefined?p.stock:''}"/></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('prod.badge')}</label><select class="adm-select" id="pBadge">${bOpts}</select></div>
        <div class="adm-form-group"><label class="adm-label">${t('prod.status')}</label><select class="adm-select" id="pStatus">${sOpts}</select></div>
      </div>
    </div>`;
  },

  _bindUpload(productId) {
    ProductsSection._pendingImage = undefined;
    const $ = id => document.getElementById(id);
    const zone  = $('imgZone');
    const file  = $('imgFile');
    const prev  = $('imgPreview');
    const wrap  = $('imgPreviewWrap');
    const prog  = $('imgProgress');
    const bar   = $('imgBar');
    const remBtn= $('imgRemove');

    const showProg = pct => {
      if (!prog) return;
      prog.style.display = 'block';
      if (bar) bar.style.width = pct + '%';
      if (pct >= 100) setTimeout(()=>{prog.style.display='none';},500);
    };

    const handle = async f => {
      if (!f) return;
      if (!f.type.startsWith('image/')) { Admin.toast(Admin.lang==='ar'?'ملفات الصور فقط مسموح بها':'Only image files allowed','error'); return; }
      if (f.size > 15*1024*1024) { Admin.toast(Admin.lang==='ar'?'حجم الملف يتجاوز 15 ميجابايت':'File exceeds 15 MB','error'); return; }
      showProg(20);
      try {
        const b64 = await ProductsSection._compressImage(f);
        showProg(85);
        if (prev) prev.src = b64;
        if (wrap) wrap.style.display = 'flex';
        if (zone) zone.style.display = 'none';
        ProductsSection._pendingImage = b64;
        showProg(100);
        Admin.toast(Admin.lang==='ar'?'تم تحضير الصورة ✓':'Image ready — save to confirm','success');
      } catch(_) {
        prog.style.display='none';
        Admin.toast(Admin.lang==='ar'?'فشل معالجة الصورة':'Image processing failed','error');
      }
    };

    if (file) file.addEventListener('change', ()=>handle(file.files[0]));
    if (zone) {
      zone.addEventListener('dragover', e=>{e.preventDefault();zone.classList.add('drag-over');});
      zone.addEventListener('dragleave', ()=>zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e=>{e.preventDefault();zone.classList.remove('drag-over');handle(e.dataTransfer.files[0]);});
    }
    if (remBtn) {
      remBtn.addEventListener('click', ()=>{
        ProductsSection._pendingImage = null;
        if (prev) prev.src='';
        if (wrap) wrap.style.display='none';
        const state = $('imgState');
        if (state) state.innerHTML = `<label class="adm-upload-zone" id="imgZone">
          <input type="file" id="imgFile" accept="image/*" style="display:none"/>
          <div class="adm-upload-zone__body">
            <div class="adm-upload-zone__icon">📸</div>
            <div class="adm-upload-zone__label">${Admin.lang==='ar'?'اسحب الصورة هنا أو انقر':'Drop image here or click to browse'}</div>
            <div class="adm-upload-zone__sub">JPG · PNG · WebP · Max 15 MB</div>
          </div></label>
          <div class="adm-upload-progress" id="imgProgress" style="display:none"><div id="imgBar"></div></div>
          <div id="imgPreviewWrap" style="display:none" class="adm-img-preview">
            <img id="imgPreview" src="" alt=""/>
            <button type="button" class="adm-img-preview__remove" id="imgRemove">✕</button>
          </div>`;
        ProductsSection._bindUpload(productId);
      });
    }
  },

  _commitImage(id) {
    if (ProductsSection._pendingImage === undefined) return;
    if (ProductsSection._pendingImage === null) AdminDB.deleteImage(id);
    else {
      const ok = AdminDB.saveImage(id, ProductsSection._pendingImage);
      if (!ok) Admin.toast(Admin.lang==='ar'?'تحذير: فشل حفظ الصورة — مساحة التخزين ممتلئة':'Warning: image not saved (storage full)','warning');
    }
    ProductsSection._pendingImage = undefined;
  },

  openAdd() {
    const t = k => Admin.t(k);
    Admin.openModal(t('prod.add'), this._formHtml(), () => {
      const en    = document.getElementById('pTitleEn')?.value.trim();
      const ar    = document.getElementById('pTitleAr')?.value.trim();
      const price = parseFloat(document.getElementById('pPrice')?.value)||0;
      const stock = parseInt(document.getElementById('pStock')?.value)||0;
      if (!en||!ar) { Admin.toast(t('common.required'),'error'); return false; }
      const id = 'p'+Date.now();
      AdminDB.addProduct({
        id, titleEn:en, titleAr:ar,
        descEn: document.getElementById('pDescEn')?.value.trim()||'',
        descAr: document.getElementById('pDescAr')?.value.trim()||'',
        category: document.getElementById('pCat')?.value||'',
        material: document.getElementById('pMat')?.value||'PLA Pro',
        price, stock,
        badge:  document.getElementById('pBadge')?.value||null,
        status: document.getElementById('pStatus')?.value||'active',
        colors: ['#C0C8E0'], rating:0, reviews:0,
      });
      this._commitImage(id);
      Admin.toast(t('prod.saved'));
      this.render();
      Admin._refreshBadges();
    }, { wide: true });
    requestAnimationFrame(()=>this._bindUpload(null));
  },

  async openEdit(id) {
    const prods = AdminDB.getProducts();
    const p = prods.find(x=>x.id===id);
    if (!p) return;
    const t = k => Admin.t(k);
    Admin.openModal(t('prod.edit'), this._formHtml(p), () => {
      const en = document.getElementById('pTitleEn')?.value.trim();
      const ar = document.getElementById('pTitleAr')?.value.trim();
      if (!en||!ar) { Admin.toast(t('common.required'),'error'); return false; }
      AdminDB.updateProduct({
        ...p, titleEn:en, titleAr:ar,
        descEn: document.getElementById('pDescEn')?.value.trim()||'',
        descAr: document.getElementById('pDescAr')?.value.trim()||'',
        category: document.getElementById('pCat')?.value||p.category,
        material: document.getElementById('pMat')?.value||p.material,
        price: parseFloat(document.getElementById('pPrice')?.value)||p.price,
        stock: parseInt(document.getElementById('pStock')?.value)||0,
        badge:  document.getElementById('pBadge')?.value||null,
        status: document.getElementById('pStatus')?.value||'active',
      });
      this._commitImage(id);
      Admin.toast(t('prod.saved'));
      this.render();
    }, { wide: true });
    requestAnimationFrame(()=>this._bindUpload(id));
  },

  confirmDelete(id) {
    Admin.confirm(Admin.t('common.confirmDelete'), ()=>{
      AdminDB.deleteProduct(id);
      AdminDB.deleteImage(id);
      Admin.toast(Admin.t('prod.deleted'));
      this.render();
    });
  },
};

/* ============================================================
   CATEGORIES
   ============================================================ */
const CategoriesSection = {
  async render() {
    const el = document.getElementById('section-categories');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    AdminDB._syncCategoryCounts();
    const cats = AdminDB.getCategories();

    const cards = cats.map(c => `
      <div class="adm-cat-card">
        <div class="adm-cat-card__icon" style="background:${esc(c.color||'#8B5CF6')}22;color:${esc(c.color||'#8B5CF6')}">${esc(c.icon||'📦')}</div>
        <div class="adm-cat-card__body">
          <div class="adm-cat-card__name">${esc(l==='ar'?c.nameAr:c.nameEn)}</div>
          <div class="adm-cat-card__sub">${esc(l==='ar'?c.nameEn:c.nameAr)}</div>
          <div class="adm-cat-card__count">${c.products||0} ${t('cat.products')}</div>
        </div>
        <div class="adm-cat-card__actions">
          <button class="adm-btn adm-btn--ghost adm-btn--icon" title="${t('cat.edit')}" onclick="CategoriesSection.openEdit('${esc(c.id)}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="adm-btn adm-btn--danger adm-btn--sm" onclick="CategoriesSection.confirmDelete('${esc(c.id)}')">${t('common.delete')}</button>
        </div>
      </div>`).join('') || `<div class="adm-empty" style="grid-column:1/-1">${t('common.noData')}</div>`;

    el.innerHTML = `
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('cat.title')} <span class="adm-count">${cats.length}</span></div>
          <button class="adm-btn adm-btn--accent" onclick="CategoriesSection.openAdd()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:15px;height:15px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ${t('cat.add')}
          </button>
        </div>
        <div class="adm-cat-grid">${cards}</div>
      </div>`;
  },

  _formHtml(c = {}) {
    const t = k => Admin.t(k);
    return `<div class="adm-form">
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('cat.name.en')} <span class="adm-req">*</span></label><input class="adm-input" id="cNameEn" value="${esc(c.nameEn||'')}"/></div>
        <div class="adm-form-group"><label class="adm-label">${t('cat.name.ar')} <span class="adm-req">*</span></label><input class="adm-input" id="cNameAr" dir="rtl" value="${esc(c.nameAr||'')}"/></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group">
          <label class="adm-label">${t('cat.icon')}</label>
          <input class="adm-input" id="cIcon" value="${esc(c.icon||'📦')}" placeholder="📦 🎮 💍 🔧"/>
          <div style="font-size:.72rem;color:var(--adm-text-muted);margin-top:4px">${Admin.lang==='ar'?'أدخل رمز تعبيري أو نص':'Enter an emoji or short text'}</div>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('cat.color')}</label>
          <div style="display:flex;gap:.5rem;align-items:center">
            <input type="color" id="cColor" value="${c.color||'#8B5CF6'}" style="width:48px;height:38px;border:none;border-radius:8px;cursor:pointer;padding:2px;background:none"/>
            <input class="adm-input" id="cColorHex" value="${c.color||'#8B5CF6'}" placeholder="#8B5CF6" style="font-family:monospace"/>
          </div>
        </div>
      </div>
    </div>`;
  },

  _bindColorSync() {
    const col = document.getElementById('cColor');
    const hex = document.getElementById('cColorHex');
    if (col && hex) {
      col.addEventListener('input', ()=>{ hex.value = col.value; });
      hex.addEventListener('input', ()=>{ if(/^#[0-9a-f]{6}$/i.test(hex.value)) col.value = hex.value; });
    }
  },

  openAdd() {
    const t = k => Admin.t(k);
    Admin.openModal(t('cat.add'), this._formHtml(), () => {
      const en = document.getElementById('cNameEn')?.value.trim();
      const ar = document.getElementById('cNameAr')?.value.trim();
      if (!en||!ar) { Admin.toast(t('common.required'),'error'); return false; }
      AdminDB.addCategory({
        nameEn: en, nameAr: ar,
        icon:  document.getElementById('cIcon')?.value.trim()||'📦',
        color: document.getElementById('cColorHex')?.value||'#8B5CF6',
      });
      Admin.toast(t('cat.saved'));
      this.render();
    });
    requestAnimationFrame(()=>this._bindColorSync());
  },

  openEdit(id) {
    const c = AdminDB.getCategories().find(x=>x.id===id);
    if (!c) return;
    const t = k => Admin.t(k);
    Admin.openModal(t('cat.edit'), this._formHtml(c), () => {
      const en = document.getElementById('cNameEn')?.value.trim();
      const ar = document.getElementById('cNameAr')?.value.trim();
      if (!en||!ar) { Admin.toast(t('common.required'),'error'); return false; }
      AdminDB.updateCategory({
        ...c, nameEn:en, nameAr:ar,
        icon:  document.getElementById('cIcon')?.value.trim()||c.icon,
        color: document.getElementById('cColorHex')?.value||c.color,
      });
      Admin.toast(t('cat.saved'));
      this.render();
    });
    requestAnimationFrame(()=>this._bindColorSync());
  },

  confirmDelete(id) {
    Admin.confirm(Admin.t('common.confirmDelete'), ()=>{
      AdminDB.deleteCategory(id);
      Admin.toast(Admin.t('cat.deleted'));
      this.render();
    });
  },
};

/* ============================================================
   ORDERS
   ============================================================ */
const OrdersSection = {
  _search: '', _filter: 'all',

  render() {
    const el = document.getElementById('section-orders');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    let orders = AdminDB.getOrders();
    if (this._search) orders = orders.filter(o => o.id.toLowerCase().includes(this._search.toLowerCase()) || (l==='ar'?o.customer.ar:o.customer.en).toLowerCase().includes(this._search.toLowerCase()) || (o.email||'').toLowerCase().includes(this._search.toLowerCase()));
    if (this._filter !== 'all') orders = orders.filter(o => o.status===this._filter);

    const page  = getPage('orders', orders.length);
    const paged = orders.slice((page-1)*10, page*10);
    const STATUSES=['pending','processing','shipped','delivered','cancelled'];

    const rows = paged.map(o=>`<tr>
      <td><code class="adm-code">${esc(o.id)}</code></td>
      <td>
        <div style="font-weight:600">${esc(l==='ar'?o.customer.ar:o.customer.en)}</div>
        <div style="font-size:.7rem;color:var(--adm-text-muted)">${esc(o.email)}</div>
      </td>
      <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(o.product)}">${esc(o.product)}</td>
      <td><strong>${fmtSar(o.amount,l)}</strong></td>
      <td>${badge(o.status,'ord.status')}</td>
      <td>${esc(l==='ar'?o.city?.ar:o.city?.en)||'—'}</td>
      <td>${esc(o.date)}</td>
      <td>
        <select class="adm-select" style="font-size:.72rem;padding:.3rem .6rem;width:auto;min-width:115px" onchange="OrdersSection.updateStatus('${esc(o.id)}',this.value)">
          ${STATUSES.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${t('ord.status.'+s)}</option>`).join('')}
        </select>
      </td>
    </tr>`).join('') || `<tr><td colspan="8" class="adm-empty">${t('common.noData')}</td></tr>`;

    const filterBtns = ['all',...STATUSES].map(s=>`
      <button class="adm-filter-btn${this._filter===s?' active':''}" onclick="OrdersSection._filter='${s}';setPage('orders',1);OrdersSection.render()">
        ${s==='all'?t('common.all'):t('ord.status.'+s)}
      </button>`).join('');

    el.innerHTML = `
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('ord.title')} <span class="adm-count">${orders.length}</span></div>
          <div class="adm-table-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="OrdersSection._search=this.value;setPage('orders',1);OrdersSection.render()"/>
          </div>
        </div>
        <div class="adm-filter-bar">${filterBtns}</div>
        <div style="overflow-x:auto">
          <table>
            <thead><tr>
              <th>${t('ord.id')}</th><th>${t('ord.customer')}</th><th>${t('ord.product')}</th>
              <th>${t('ord.amount')}</th><th>${t('ord.status')}</th><th>${t('ord.city')}</th>
              <th>${t('ord.date')}</th><th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${pager('orders', orders.length, 10, 'OrdersSection.render()')}
      </div>`;
  },

  updateStatus(id, status) {
    AdminDB.updateOrderStatus(id, status);
    Admin.toast(Admin.t('ord.saved'));
    this.render();
    Admin._refreshBadges().then(()=>Admin.renderShell()).then(()=>Admin.navigate(Admin.currentSection,false));
  },
};

/* ============================================================
   CUSTOMERS
   ============================================================ */
const CustomersSection = {
  _search: '', _filter: 'all',

  render() {
    const el = document.getElementById('section-customers');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    let custs = AdminDB.getCustomers();
    if (this._search) custs = custs.filter(c => (l==='ar'?c.nameAr:c.nameEn).toLowerCase().includes(this._search.toLowerCase()) || c.email.toLowerCase().includes(this._search.toLowerCase()));
    if (this._filter !== 'all') custs = custs.filter(c => c.status===this._filter);

    const page  = getPage('customers', custs.length);
    const paged = custs.slice((page-1)*10, page*10);

    const rows = paged.map(c=>`<tr>
      <td>
        <div class="adm-cust-cell">
          <div class="adm-avatar">${(l==='ar'?c.nameAr:c.nameEn).charAt(0).toUpperCase()}</div>
          <div>
            <div style="font-weight:600">${esc(l==='ar'?c.nameAr:c.nameEn)}</div>
            <div style="font-size:.7rem;color:var(--adm-text-muted)">${esc(c.email)}</div>
          </div>
        </div>
      </td>
      <td dir="ltr" style="text-align:${l==='ar'?'right':'left'}">${esc(c.phone)}</td>
      <td>${esc(l==='ar'?c.city?.ar:c.city?.en)}</td>
      <td>${c.orders}</td>
      <td>${fmtSar(c.totalSpent,l)}</td>
      <td>${esc(c.joinDate)}</td>
      <td>${badge(c.status,'cust.status')}</td>
      <td>
        <button class="adm-btn ${c.status==='active'?'adm-btn--outline':'adm-btn--accent'} adm-btn--sm" onclick="CustomersSection.toggle('${esc(c.id)}')">
          ${c.status==='active'?(l==='ar'?'حظر':'Block'):(l==='ar'?'تفعيل':'Activate')}
        </button>
      </td>
    </tr>`).join('') || `<tr><td colspan="8" class="adm-empty">${t('common.noData')}</td></tr>`;

    const filterBtns = ['all','active','blocked'].map(f=>`
      <button class="adm-filter-btn${this._filter===f?' active':''}" onclick="CustomersSection._filter='${f}';setPage('customers',1);CustomersSection.render()">
        ${f==='all'?t('common.all'):t('cust.status.'+f)}
      </button>`).join('');

    el.innerHTML = `
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('cust.title')} <span class="adm-count">${custs.length}</span></div>
          <div class="adm-table-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="CustomersSection._search=this.value;setPage('customers',1);CustomersSection.render()"/>
          </div>
        </div>
        <div class="adm-filter-bar">${filterBtns}</div>
        <div style="overflow-x:auto">
          <table>
            <thead><tr>
              <th>${t('cust.name')}</th><th>${t('cust.phone')}</th><th>${t('cust.city')}</th>
              <th>${t('cust.orders')}</th><th>${t('cust.spent')}</th><th>${t('cust.joined')}</th>
              <th>${t('cust.status')}</th><th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${pager('customers', custs.length, 10, 'CustomersSection.render()')}
      </div>`;
  },

  toggle(id) {
    AdminDB.toggleCustomer(id);
    Admin.toast(Admin.t('cust.toggled'));
    this.render();
  },
};

/* ============================================================
   SHIPPING
   ============================================================ */
const ShippingSection = {
  _search: '', _filter: 'all',

  render() {
    const el = document.getElementById('section-shipping');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    let orders = AdminDB.getOrders().filter(o=>['processing','shipped','delivered'].includes(o.status));
    if (this._search) orders = orders.filter(o => o.id.toLowerCase().includes(this._search.toLowerCase()) || (o.tracking||'').includes(this._search));
    if (this._filter !== 'all') orders = orders.filter(o => o.status===this._filter);

    const page  = getPage('shipping', orders.length);
    const paged = orders.slice((page-1)*10, page*10);

    const rows = paged.map(o=>`<tr>
      <td><code class="adm-code">${esc(o.id)}</code></td>
      <td>${esc(l==='ar'?o.customer.ar:o.customer.en)}</td>
      <td>${esc(l==='ar'?o.city?.ar:o.city?.en)||'—'}</td>
      <td>${badge(o.status,'ord.status')}</td>
      <td>${o.tracking
        ? `<code class="adm-code adm-code--success">${esc(o.tracking)}</code>`
        : `<span style="color:var(--adm-text-muted);font-size:.75rem">${t('ship.noTracking')}</span>`}
      </td>
      <td>
        <button class="adm-btn adm-btn--outline adm-btn--sm" onclick="ShippingSection.editTracking('${esc(o.id)}','${esc(o.tracking||'')}')">
          ${t('ship.edit')}
        </button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="adm-empty">${t('common.noData')}</td></tr>`;

    const filterBtns = ['all','processing','shipped','delivered'].map(f=>`
      <button class="adm-filter-btn${this._filter===f?' active':''}" onclick="ShippingSection._filter='${f}';setPage('shipping',1);ShippingSection.render()">
        ${f==='all'?t('common.all'):t('ord.status.'+f)}
      </button>`).join('');

    el.innerHTML = `
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('ship.title')} <span class="adm-count">${orders.length}</span></div>
          <div class="adm-table-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="ShippingSection._search=this.value;setPage('shipping',1);ShippingSection.render()"/>
          </div>
        </div>
        <div class="adm-filter-bar">${filterBtns}</div>
        <div style="overflow-x:auto">
          <table>
            <thead><tr>
              <th>${t('ship.orderId')}</th><th>${t('ship.customer')}</th><th>${t('ship.city')}</th>
              <th>${t('ship.status')}</th><th>${t('ship.tracking')}</th><th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${pager('shipping', orders.length, 10, 'ShippingSection.render()')}
      </div>`;
  },

  editTracking(id, current) {
    const l = Admin.lang;
    Admin.openModal(Admin.t('ship.edit'), `
      <div class="adm-form-group">
        <label class="adm-label">${Admin.t('ship.tracking')}</label>
        <input class="adm-input" id="trackInput" value="${esc(current)}" placeholder="SA123456789" style="font-family:monospace;letter-spacing:.05em"/>
        <div style="font-size:.75rem;color:var(--adm-text-muted);margin-top:4px">
          ${l==='ar'?'أدخل رقم تتبع الشحنة':'Enter the shipment tracking number'}
        </div>
      </div>`, () => {
        const code = document.getElementById('trackInput')?.value.trim();
        AdminDB.updateTracking(id, code);
        Admin.toast(Admin.t('ship.saved'));
        this.render();
      }
    );
  },
};

/* ============================================================
   PAYMENTS
   ============================================================ */
const PaymentsSection = {
  _search: '', _filter: 'all',

  render() {
    const el = document.getElementById('section-payments');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    let orders = AdminDB.getOrders();
    if (this._search) orders = orders.filter(o => o.id.toLowerCase().includes(this._search.toLowerCase()) || (l==='ar'?o.customer.ar:o.customer.en).toLowerCase().includes(this._search.toLowerCase()));
    if (this._filter !== 'all') orders = orders.filter(o => o.paymentStatus===this._filter);

    const totalPaid = orders.filter(o=>o.paymentStatus==='paid').reduce((s,o)=>s+o.amount,0);
    const pending   = orders.filter(o=>o.paymentStatus==='pending').length;
    const refunded  = orders.filter(o=>o.paymentStatus==='refunded').length;

    const page  = getPage('payments', orders.length);
    const paged = orders.slice((page-1)*10, page*10);
    const FILTERS=['all','paid','pending','refunded'];

    const rows = paged.map(o=>`<tr>
      <td><code class="adm-code">${esc(o.id)}</code></td>
      <td>${esc(l==='ar'?o.customer.ar:o.customer.en)}</td>
      <td><strong>${fmtSar(o.amount,l)}</strong></td>
      <td>${esc(t('pay.method.'+o.paymentMethod)||o.paymentMethod)}</td>
      <td>${badge(o.paymentStatus||'pending','pay.status')}</td>
      <td>${esc(o.date)}</td>
    </tr>`).join('') || `<tr><td colspan="6" class="adm-empty">${t('common.noData')}</td></tr>`;

    el.innerHTML = `
      <div class="adm-stats-row" style="margin-bottom:var(--adm-space-5)">
        <div class="adm-stat-card">
          <div class="adm-stat-card__icon adm-stat-card__icon--green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="adm-stat-card__body"><div class="adm-stat-card__label">${t('pay.status.paid')}</div><div class="adm-stat-card__value">${fmtSar(totalPaid,l)}</div></div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-card__icon adm-stat-card__icon--warm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="adm-stat-card__body"><div class="adm-stat-card__label">${t('pay.status.pending')}</div><div class="adm-stat-card__value">${pending}</div></div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-card__icon adm-stat-card__icon--purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.85"/></svg>
          </div>
          <div class="adm-stat-card__body"><div class="adm-stat-card__label">${t('pay.status.refunded')}</div><div class="adm-stat-card__value">${refunded}</div></div>
        </div>
      </div>
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('pay.title')} <span class="adm-count">${orders.length}</span></div>
          <div class="adm-table-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="PaymentsSection._search=this.value;setPage('payments',1);PaymentsSection.render()"/>
          </div>
        </div>
        <div class="adm-filter-bar">
          ${FILTERS.map(f=>`<button class="adm-filter-btn${this._filter===f?' active':''}" onclick="PaymentsSection._filter='${f}';setPage('payments',1);PaymentsSection.render()">${f==='all'?t('common.all'):t('pay.status.'+f)}</button>`).join('')}
        </div>
        <div style="overflow-x:auto">
          <table>
            <thead><tr>
              <th>${t('pay.order')}</th><th>${t('pay.customer')}</th><th>${t('pay.amount')}</th>
              <th>${t('pay.method')}</th><th>${t('pay.status')}</th><th>${t('pay.date')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${pager('payments', orders.length, 10, 'PaymentsSection.render()')}
      </div>`;
  },
};

/* ============================================================
   REVIEWS
   ============================================================ */
const ReviewsSection = {
  _search: '', _filter: 'all',

  render() {
    const el = document.getElementById('section-reviews');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    let revs = AdminDB.getReviews();

    if (this._search) revs = revs.filter(r =>
      (l==='ar'?r.customerAr:r.customerEn).toLowerCase().includes(this._search.toLowerCase()) ||
      (l==='ar'?r.productAr:r.productEn).toLowerCase().includes(this._search.toLowerCase()) ||
      (r.text||'').toLowerCase().includes(this._search.toLowerCase())
    );

    switch (this._filter) {
      case 'replied': revs = revs.filter(r=>!!r.reply); break;
      case 'pending': revs = revs.filter(r=>!r.reply);  break;
      case '5':  revs = revs.filter(r=>r.rating>=5); break;
      case '4':  revs = revs.filter(r=>r.rating>=4 && r.rating<5); break;
      case '3':  revs = revs.filter(r=>r.rating>=3 && r.rating<4); break;
      case 'low':revs = revs.filter(r=>r.rating<3);  break;
    }

    const page  = getPage('reviews', revs.length);
    const paged = revs.slice((page-1)*10, page*10);

    const cards = paged.map(r => `
      <div class="adm-review-card">
        <div class="adm-review-card__header">
          <div class="adm-cust-cell">
            <div class="adm-avatar">${(l==='ar'?r.customerAr:r.customerEn).charAt(0).toUpperCase()}</div>
            <div>
              <div style="font-weight:600;font-size:.85rem">${esc(l==='ar'?r.customerAr:r.customerEn)}</div>
              <div style="font-size:.7rem;color:var(--adm-text-muted)">${esc(r.email)}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:.75rem;flex-shrink:0">
            <div class="adm-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
            <span style="font-size:.7rem;color:var(--adm-text-muted)">${esc(r.date)}</span>
            ${r.reply
              ? `<span class="adm-badge adm-badge--success adm-badge--dot">${t('rev.replied')}</span>`
              : `<span class="adm-badge adm-badge--warning adm-badge--dot">${t('rev.pending')}</span>`}
          </div>
        </div>
        <div class="adm-review-card__product">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:13px;height:13px"><polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          ${esc(l==='ar'?r.productAr:r.productEn)}
        </div>
        <div class="adm-review-card__text">${esc(l==='ar'?r.textAr||r.text:r.text)}</div>
        ${r.reply ? `
          <div class="adm-review-card__reply">
            <div class="adm-review-card__reply-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:13px;height:13px"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
              ${l==='ar'?'رد الإدارة':'Admin Reply'}
            </div>
            <div class="adm-review-card__reply-text">${esc(r.reply)}</div>
          </div>` : ''}
        <div class="adm-review-card__actions">
          <button class="adm-btn ${r.reply?'adm-btn--outline':'adm-btn--accent'} adm-btn--sm" onclick="ReviewsSection.openReply('${esc(r.id)}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:14px;height:14px"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
            ${r.reply?(l==='ar'?'تعديل الرد':'Edit Reply'):(l==='ar'?'رد':'Reply')}
          </button>
          <button class="adm-btn adm-btn--ghost adm-btn--sm" style="color:var(--adm-error)" onclick="ReviewsSection.confirmDelete('${esc(r.id)}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:14px;height:14px"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
            ${t('common.delete')}
          </button>
        </div>
      </div>`).join('') || `<div class="adm-empty">${t('common.noData')}</div>`;

    const filterBtns = ['all','pending','replied','5','4','3','low'].map(f=>`
      <button class="adm-filter-btn${this._filter===f?' active':''}" onclick="ReviewsSection._filter='${f}';setPage('reviews',1);ReviewsSection.render()">
        ${t('rev.filter.'+f)||t('rev.'+f)||t('common.all')}
      </button>`).join('');

    /* Summary stats */
    const allRevs  = AdminDB.getReviews();
    const avgRating= allRevs.length ? (allRevs.reduce((s,r)=>s+r.rating,0)/allRevs.length).toFixed(1) : '—';
    const noReply  = allRevs.filter(r=>!r.reply).length;

    el.innerHTML = `
      <div class="adm-stats-row" style="margin-bottom:var(--adm-space-5)">
        <div class="adm-stat-card">
          <div class="adm-stat-card__icon adm-stat-card__icon--blue" style="font-size:1.5rem">⭐</div>
          <div class="adm-stat-card__body"><div class="adm-stat-card__label">${l==='ar'?'متوسط التقييم':'Average Rating'}</div><div class="adm-stat-card__value">${avgRating} / 5</div></div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-card__icon adm-stat-card__icon--green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="adm-stat-card__body"><div class="adm-stat-card__label">${l==='ar'?'إجمالي التقييمات':'Total Reviews'}</div><div class="adm-stat-card__value">${allRevs.length}</div></div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-card__icon adm-stat-card__icon--warm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="adm-stat-card__body"><div class="adm-stat-card__label">${l==='ar'?'بانتظار الرد':'Awaiting Reply'}</div><div class="adm-stat-card__value">${noReply}</div></div>
        </div>
      </div>
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('rev.title')} <span class="adm-count">${revs.length}</span></div>
          <div class="adm-table-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="ReviewsSection._search=this.value;setPage('reviews',1);ReviewsSection.render()"/>
          </div>
        </div>
        <div class="adm-filter-bar">${filterBtns}</div>
        <div class="adm-review-list">${cards}</div>
        ${pager('reviews', revs.length, 10, 'ReviewsSection.render()')}
      </div>`;
  },

  openReply(id) {
    const r = AdminDB.getReviews().find(x=>x.id===id);
    if (!r) return;
    const l = Admin.lang;
    Admin.openModal(
      l==='ar'?'الرد على التقييم':'Reply to Review',
      `<div class="adm-form">
        <div class="adm-review-card" style="margin-bottom:var(--adm-space-4);background:var(--adm-surface-2)">
          <div class="adm-stars" style="margin-bottom:.5rem">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
          <div class="adm-review-card__text">${esc(l==='ar'?r.textAr||r.text:r.text)}</div>
          <div style="font-size:.72rem;color:var(--adm-text-muted);margin-top:.5rem">— ${esc(l==='ar'?r.customerAr:r.customerEn)}, ${esc(r.date)}</div>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${Admin.t('rev.reply')} <span class="adm-req">*</span></label>
          <textarea class="adm-input adm-textarea" id="replyText" rows="4" placeholder="${Admin.t('rev.replyPlaceholder')}">${esc(r.reply||'')}</textarea>
        </div>
      </div>`,
      () => {
        const txt = document.getElementById('replyText')?.value.trim();
        if (!txt) { Admin.toast(Admin.t('common.required'),'error'); return false; }
        AdminDB.replyToReview(id, txt);
        Admin.toast(Admin.t('rev.saved'));
        this.render();
        Admin._refreshBadges().then(()=>Admin.renderShell()).then(()=>Admin.navigate(Admin.currentSection,false));
      },
      { saveLabel: l==='ar'?'إرسال الرد':'Send Reply' }
    );
  },

  confirmDelete(id) {
    Admin.confirm(Admin.t('common.confirmDelete'), ()=>{
      AdminDB.deleteReview(id);
      Admin.toast(Admin.t('rev.deleted'));
      this.render();
    });
  },
};

/* ============================================================
   SETTINGS
   ============================================================ */
const SettingsSection = {
  _tab: 'shipping',

  render() {
    const el = document.getElementById('section-settings');
    if (!el) return;
    const l = Admin.lang, t = k => Admin.t(k);
    const s = AdminDB.getSettings();

    const tabs = ['shipping','payment','store'].map(tab=>`
      <button class="adm-tab-btn${this._tab===tab?' active':''}" onclick="SettingsSection._tab='${tab}';SettingsSection.render()">
        ${t('set.tab.'+tab)}
      </button>`).join('');

    let tabContent = '';

    if (this._tab === 'shipping') {
      const ship = s.shipping || {};
      const cityRows = (ship.cities||[]).map((c,i)=>`
        <tr>
          <td>${esc(l==='ar'?c.nameAr:c.nameEn)}</td>
          <td>${esc(l==='ar'?c.nameEn:c.nameAr)}</td>
          <td><strong>${c.rate}</strong> ${t('common.sar')}</td>
          <td>${esc(c.days)} ${l==='ar'?'أيام':'days'}</td>
          <td>
            <div class="adm-row-actions">
              <button class="adm-btn adm-btn--ghost adm-btn--icon" onclick="SettingsSection.editCity(${i})" title="${t('common.edit')}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:14px;height:14px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="adm-btn adm-btn--danger adm-btn--sm" onclick="SettingsSection.deleteCity(${i})">${t('common.delete')}</button>
            </div>
          </td>
        </tr>`).join('') || `<tr><td colspan="5" class="adm-empty">${t('common.noData')}</td></tr>`;

      tabContent = `
        <div class="adm-settings-section">
          <div class="adm-settings-title">${l==='ar'?'إعدادات الشحن العامة':'General Shipping Settings'}</div>
          <div class="adm-form">
            <div class="adm-form-row">
              <div class="adm-form-group">
                <label class="adm-label">${t('set.ship.free')}</label>
                <div class="adm-input-group"><span class="adm-input-group__addon">${t('common.sar')}</span><input class="adm-input" type="number" min="0" id="shipFree" value="${ship.freeThreshold||500}"/></div>
              </div>
              <div class="adm-form-group">
                <label class="adm-label">${t('set.ship.express')}</label>
                <div class="adm-input-group"><span class="adm-input-group__addon">${t('common.sar')}</span><input class="adm-input" type="number" min="0" id="shipExpress" value="${ship.expressRate||65}"/></div>
              </div>
              <div class="adm-form-group">
                <label class="adm-label">${t('set.ship.default')}</label>
                <div class="adm-input-group"><span class="adm-input-group__addon">${t('common.sar')}</span><input class="adm-input" type="number" min="0" id="shipDefault" value="${ship.defaultRate||35}"/></div>
              </div>
            </div>
          </div>
        </div>
        <div class="adm-settings-section">
          <div class="adm-table-toolbar" style="margin-bottom:var(--adm-space-4)">
            <div class="adm-settings-title" style="margin:0">${t('set.ship.cities')}</div>
            <button class="adm-btn adm-btn--accent adm-btn--sm" onclick="SettingsSection.addCity()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:13px;height:13px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              ${t('set.ship.addCity')}
            </button>
          </div>
          <div style="overflow-x:auto">
            <table>
              <thead><tr>
                <th>${l==='ar'?'المدينة (عربي)':'City (EN)'}</th>
                <th>${l==='ar'?'المدينة (إنجليزي)':'City (AR)'}</th>
                <th>${t('set.ship.rate')}</th><th>${t('set.ship.days')}</th>
                <th>${t('common.actions')}</th>
              </tr></thead>
              <tbody>${cityRows}</tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:var(--adm-space-5)">
          <button class="adm-btn adm-btn--primary" onclick="SettingsSection.saveShipping()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:15px;height:15px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            ${t('common.save')}
          </button>
        </div>`;
    }

    if (this._tab === 'payment') {
      const pay = s.payment || {};
      const methods = (pay.methods || []).map((m, i) => `
        <div class="adm-pay-method-row">
          <div class="adm-pay-method-row__info">
            <div class="adm-pay-method-row__name">${esc(l==='ar'?m.nameAr:m.nameEn)}</div>
            <div class="adm-pay-method-row__sub">${esc(l==='ar'?m.nameEn:m.nameAr)}</div>
          </div>
          <div class="adm-pay-method-row__fees">
            <label style="font-size:.72rem;color:var(--adm-text-muted)">${t('set.pay.fees')}</label>
            <input class="adm-input" type="number" min="0" step="0.5" id="payFees_${i}" value="${m.fees||0}" style="width:90px"/>
          </div>
          <label class="adm-toggle" title="${m.enabled?t('common.enabled'):t('common.disabled')}">
            <input type="checkbox" id="payEnabled_${i}" ${m.enabled?'checked':''}/>
            <span class="adm-toggle__track"></span>
          </label>
        </div>`).join('');

      tabContent = `
        <div class="adm-settings-section">
          <div class="adm-settings-title">${t('set.pay.methods')}</div>
          <div class="adm-pay-methods-list">${methods}</div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:var(--adm-space-5)">
          <button class="adm-btn adm-btn--primary" onclick="SettingsSection.savePayment()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:15px;height:15px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            ${t('common.save')}
          </button>
        </div>`;
    }

    if (this._tab === 'store') {
      const store = s.store || {};
      tabContent = `
        <div class="adm-settings-section">
          <div class="adm-settings-title">${t('set.tab.store')}</div>
          <div class="adm-form">
            <div class="adm-form-row">
              <div class="adm-form-group"><label class="adm-label">${t('set.store.nameEn')}</label><input class="adm-input" id="storeNameEn" value="${esc(store.nameEn||'')}"/></div>
              <div class="adm-form-group"><label class="adm-label">${t('set.store.nameAr')}</label><input class="adm-input" id="storeNameAr" dir="rtl" value="${esc(store.nameAr||'')}"/></div>
            </div>
            <div class="adm-form-row">
              <div class="adm-form-group"><label class="adm-label">${t('set.store.phone')}</label><input class="adm-input" id="storePhone" type="tel" dir="ltr" value="${esc(store.phone||'')}"/></div>
              <div class="adm-form-group"><label class="adm-label">${t('set.store.email')}</label><input class="adm-input" id="storeEmail" type="email" dir="ltr" value="${esc(store.email||'')}"/></div>
            </div>
            <div class="adm-form-row">
              <div class="adm-form-group"><label class="adm-label">${t('set.store.vat')}</label><input class="adm-input" id="storeVat" dir="ltr" value="${esc(store.vatNumber||'')}"/></div>
              <div class="adm-form-group"><label class="adm-label">${t('set.store.address')}</label><input class="adm-input" id="storeAddr" value="${esc(store.address||'')}"/></div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:var(--adm-space-5)">
          <button class="adm-btn adm-btn--primary" onclick="SettingsSection.saveStore()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:15px;height:15px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            ${t('common.save')}
          </button>
        </div>`;
    }

    el.innerHTML = `
      <div class="adm-table-wrap">
        <div class="adm-table-toolbar">
          <div class="adm-table-title">${t('set.title')}</div>
        </div>
        <div class="adm-tabs">${tabs}</div>
        <div class="adm-tab-content">${tabContent}</div>
      </div>`;
  },

  saveShipping() {
    const s = AdminDB.getSettings();
    s.shipping.freeThreshold = parseFloat(document.getElementById('shipFree')?.value)||500;
    s.shipping.expressRate   = parseFloat(document.getElementById('shipExpress')?.value)||65;
    s.shipping.defaultRate   = parseFloat(document.getElementById('shipDefault')?.value)||35;
    AdminDB.saveSettings(s);
    Admin.toast(Admin.t('set.saved'));
  },

  addCity() {
    const l = Admin.lang, t = k => Admin.t(k);
    Admin.openModal(t('set.ship.addCity'), `
      <div class="adm-form">
        <div class="adm-form-row">
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.city.en')} <span class="adm-req">*</span></label><input class="adm-input" id="cityEn"/></div>
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.city.ar')} <span class="adm-req">*</span></label><input class="adm-input" id="cityAr" dir="rtl"/></div>
        </div>
        <div class="adm-form-row">
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.rate')} <span class="adm-req">*</span></label><input class="adm-input" type="number" min="0" id="cityRate" value="35"/></div>
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.days')}</label><input class="adm-input" id="cityDays" value="3–5" placeholder="2–3"/></div>
        </div>
      </div>`, () => {
        const en = document.getElementById('cityEn')?.value.trim();
        const ar = document.getElementById('cityAr')?.value.trim();
        const rate = parseFloat(document.getElementById('cityRate')?.value)||35;
        const days = document.getElementById('cityDays')?.value.trim()||'3–5';
        if (!en||!ar) { Admin.toast(t('common.required'),'error'); return false; }
        const s = AdminDB.getSettings();
        s.shipping.cities.push({ id:'c'+Date.now(), nameEn:en, nameAr:ar, rate, days });
        AdminDB.saveSettings(s);
        Admin.toast(Admin.t('set.saved'));
        this.render();
      }
    );
  },

  editCity(idx) {
    const s = AdminDB.getSettings();
    const c = s.shipping.cities[idx];
    if (!c) return;
    const l = Admin.lang, t = k => Admin.t(k);
    Admin.openModal(t('common.edit') + ' — ' + (l==='ar'?c.nameAr:c.nameEn), `
      <div class="adm-form">
        <div class="adm-form-row">
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.city.en')}</label><input class="adm-input" id="cityEn" value="${esc(c.nameEn)}"/></div>
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.city.ar')}</label><input class="adm-input" id="cityAr" dir="rtl" value="${esc(c.nameAr)}"/></div>
        </div>
        <div class="adm-form-row">
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.rate')}</label><input class="adm-input" type="number" min="0" id="cityRate" value="${c.rate}"/></div>
          <div class="adm-form-group"><label class="adm-label">${t('set.ship.days')}</label><input class="adm-input" id="cityDays" value="${esc(c.days)}"/></div>
        </div>
      </div>`, () => {
        s.shipping.cities[idx] = {
          ...c,
          nameEn: document.getElementById('cityEn')?.value.trim()||c.nameEn,
          nameAr: document.getElementById('cityAr')?.value.trim()||c.nameAr,
          rate: parseFloat(document.getElementById('cityRate')?.value)||c.rate,
          days: document.getElementById('cityDays')?.value.trim()||c.days,
        };
        AdminDB.saveSettings(s);
        Admin.toast(Admin.t('set.saved'));
        this.render();
      }
    );
  },

  deleteCity(idx) {
    Admin.confirm(Admin.t('common.confirmDelete'), ()=>{
      const s = AdminDB.getSettings();
      s.shipping.cities.splice(idx,1);
      AdminDB.saveSettings(s);
      Admin.toast(Admin.t('set.saved'));
      this.render();
    });
  },

  savePayment() {
    const s = AdminDB.getSettings();
    (s.payment.methods||[]).forEach((m,i)=>{
      const cbEl   = document.getElementById('payEnabled_'+i);
      const feesEl = document.getElementById('payFees_'+i);
      if (cbEl)   m.enabled = cbEl.checked;
      if (feesEl) m.fees    = parseFloat(feesEl.value)||0;
    });
    AdminDB.saveSettings(s);
    Admin.toast(Admin.t('set.saved'));
  },

  saveStore() {
    const s = AdminDB.getSettings();
    s.store.nameEn    = document.getElementById('storeNameEn')?.value.trim()||s.store.nameEn;
    s.store.nameAr    = document.getElementById('storeNameAr')?.value.trim()||s.store.nameAr;
    s.store.phone     = document.getElementById('storePhone')?.value.trim()||s.store.phone;
    s.store.email     = document.getElementById('storeEmail')?.value.trim()||s.store.email;
    s.store.vatNumber = document.getElementById('storeVat')?.value.trim()||s.store.vatNumber;
    s.store.address   = document.getElementById('storeAddr')?.value.trim()||s.store.address;
    AdminDB.saveSettings(s);
    Admin.toast(Admin.t('set.saved'));
  },
};

/* ============================================================
   DISCOUNTS & COUPONS
   ============================================================ */
const DiscountsSection = {
  _search: '', _filter: 'all',

  _discountStatus(d) {
    if (!d.enabled) return 'disabled';
    if (d.usageLimit && d.usageCount >= d.usageLimit) return 'expired';
    if (d.expiry && new Date(d.expiry) < new Date()) return 'expired';
    return 'active';
  },

  render() {
    try {
      const el = document.getElementById('section-discounts');
      if (!el) return;
      const l = Admin.lang, t = k => Admin.t(k);
      let discounts = AdminDB.getDiscounts();

      if (this._search) {
        const q = this._search.toLowerCase();
        discounts = discounts.filter(d =>
          d.code.toLowerCase().includes(q) ||
          (d.descEn||'').toLowerCase().includes(q) ||
          (d.descAr||'').toLowerCase().includes(q)
        );
      }
      if (this._filter !== 'all') {
        discounts = discounts.filter(d => this._discountStatus(d) === this._filter);
      }

      const page  = getPage('discounts', discounts.length);
      const paged = discounts.slice((page-1)*10, page*10);

      const rows = paged.map(d => {
        const status = this._discountStatus(d);
        const statusClr = {active:'success',expired:'warning',disabled:'neutral'}[status]||'neutral';
        const statusLabel = t('disc.status.' + status) || status;
        const typeLabel = t('disc.type.' + d.type) || d.type;
        const pct = d.usageLimit ? Math.min(100, Math.round(d.usageCount/d.usageLimit*100)) : 0;

        return `<tr>
          <td>
            <code class="adm-code${status==='active'?' adm-code--success':''}" style="font-size:.85rem;letter-spacing:.08em">${esc(d.code)}</code>
          </td>
          <td>
            <div style="font-size:.8rem">${esc(l==='ar'?d.descAr:d.descEn)}</div>
          </td>
          <td><span class="adm-badge adm-badge--accent">${esc(typeLabel)}</span></td>
          <td>
            <strong>${d.type==='percent'?d.value+'%':d.type==='fixed'?fmtSar(d.value,l):'—'}</strong>
            ${d.minOrder?`<div style="font-size:.7rem;color:var(--adm-text-muted)">${l==='ar'?'حد أدنى':'Min'}: ${fmtSar(d.minOrder,l)}</div>`:''}
          </td>
          <td>
            <div style="display:flex;align-items:center;gap:.5rem">
              <span>${d.usageCount}${d.usageLimit?'/'+d.usageLimit:''}</span>
              ${d.usageLimit?`<div style="width:50px;height:4px;background:var(--clr-surface-3);border-radius:4px;overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--clr-accent);border-radius:4px"></div></div>`:''}
            </div>
          </td>
          <td style="font-size:.78rem;color:${d.expiry&&new Date(d.expiry)<new Date()?'var(--clr-error)':'inherit'}">${esc(d.expiry||'—')}</td>
          <td><span class="adm-badge adm-badge--${statusClr} adm-badge--dot">${esc(statusLabel)}</span></td>
          <td>
            <div class="adm-row-actions">
              <button class="adm-btn adm-btn--ghost adm-btn--icon" title="${t('common.edit')}" onclick="DiscountsSection.openEdit('${esc(d.id)}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="adm-btn ${d.enabled?'adm-btn--outline':'adm-btn--accent'} adm-btn--sm" onclick="DiscountsSection.toggle('${esc(d.id)}')">
                ${d.enabled?(l==='ar'?'تعطيل':'Disable'):(l==='ar'?'تفعيل':'Enable')}
              </button>
              <button class="adm-btn adm-btn--danger adm-btn--sm" onclick="DiscountsSection.confirmDelete('${esc(d.id)}')">${t('common.delete')}</button>
            </div>
          </td>
        </tr>`;
      }).join('') || `<tr><td colspan="8" class="adm-empty">${t('common.noData')}</td></tr>`;

      const filterBtns = ['all','active','expired','disabled'].map(f => `
        <button class="adm-filter-btn${this._filter===f?' active':''}" onclick="DiscountsSection._filter='${f}';setPage('discounts',1);DiscountsSection.render()">
          ${f==='all'?t('common.all'):(t('disc.status.'+f)||f)}
        </button>`).join('');

      /* Summary cards */
      const all = AdminDB.getDiscounts();
      const activeCount   = all.filter(d=>this._discountStatus(d)==='active').length;
      const expiredCount  = all.filter(d=>this._discountStatus(d)==='expired').length;
      const totalUsed     = all.reduce((s,d)=>s+(d.usageCount||0),0);

      el.innerHTML = `
        <div class="adm-stats-row" style="margin-bottom:var(--adm-space-5)">
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--green" style="font-size:1.4rem">🎟️</div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'كوبونات نشطة':'Active Coupons'}</div>
              <div class="adm-stat-card__value">${activeCount}</div>
            </div>
          </div>
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--warm" style="font-size:1.4rem">⏰</div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'منتهية/معطلة':'Expired / Disabled'}</div>
              <div class="adm-stat-card__value">${expiredCount + all.filter(d=>!d.enabled).length}</div>
            </div>
          </div>
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--blue" style="font-size:1.4rem">📊</div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'إجمالي الاستخدامات':'Total Redemptions'}</div>
              <div class="adm-stat-card__value">${fmt(totalUsed)}</div>
            </div>
          </div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-table-toolbar">
            <div class="adm-table-title">${t('disc.title')} <span class="adm-count">${discounts.length}</span></div>
            <div class="adm-table-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="${t('common.search')}" value="${esc(this._search)}" oninput="DiscountsSection._search=this.value;setPage('discounts',1);DiscountsSection.render()"/>
            </div>
            <button class="adm-btn adm-btn--accent" onclick="DiscountsSection.openAdd()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:15px;height:15px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              ${t('disc.add')}
            </button>
          </div>
          <div class="adm-filter-bar">${filterBtns}</div>
          <div style="overflow-x:auto">
            <table>
              <thead><tr>
                <th>${t('disc.code')}</th>
                <th>${l==='ar'?'الوصف':'Description'}</th>
                <th>${t('disc.type')}</th>
                <th>${t('disc.value')}</th>
                <th>${t('disc.usageCount')}</th>
                <th>${t('disc.expiry')}</th>
                <th>${t('disc.status')}</th>
                <th>${t('common.actions')}</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          ${pager('discounts', discounts.length, 10, 'DiscountsSection.render()')}
        </div>`;
    } catch(e) {
      console.error('[DiscountsSection]', e);
      const el = document.getElementById('section-discounts');
      if (el) el.innerHTML = `<div class="adm-empty" style="color:var(--clr-error)">Error: ${esc(e.message)}</div>`;
    }
  },

  _formHtml(d = {}) {
    const t = k => Admin.t(k);
    const TYPES = ['percent','fixed','shipping'];
    return `<div class="adm-form">
      <div class="adm-form-group">
        <label class="adm-label">${t('disc.code')} <span class="adm-req">*</span></label>
        <input class="adm-input" id="dCode" value="${esc(d.code||'')}" placeholder="SAVE20" style="text-transform:uppercase;font-family:monospace;letter-spacing:.1em"/>
        <div style="font-size:.72rem;color:var(--adm-text-muted);margin-top:4px">${Admin.lang==='ar'?'أحرف كبيرة وأرقام فقط':'Letters and numbers only (auto-uppercased)'}</div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('disc.desc.en')}</label><input class="adm-input" id="dDescEn" value="${esc(d.descEn||'')}"/></div>
        <div class="adm-form-group"><label class="adm-label">${t('disc.desc.ar')}</label><input class="adm-input" id="dDescAr" dir="rtl" value="${esc(d.descAr||'')}"/></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group">
          <label class="adm-label">${t('disc.type')} <span class="adm-req">*</span></label>
          <select class="adm-select" id="dType" onchange="DiscountsSection._updateTypeHint()">
            ${TYPES.map(tp=>`<option value="${tp}" ${(d.type||'percent')===tp?'selected':''}>${t('disc.type.'+tp)}</option>`).join('')}
          </select>
        </div>
        <div class="adm-form-group" id="dValueGroup">
          <label class="adm-label">${t('disc.value')} <span class="adm-req">*</span></label>
          <input class="adm-input" type="number" min="0" id="dValue" value="${d.value!==undefined?d.value:''}" placeholder="20"/>
        </div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('disc.minOrder')}</label><input class="adm-input" type="number" min="0" id="dMinOrder" value="${d.minOrder||0}"/></div>
        <div class="adm-form-group"><label class="adm-label">${t('disc.maxDiscount')}</label><input class="adm-input" type="number" min="0" id="dMaxDisc" value="${d.maxDiscount||''}"/></div>
      </div>
      <div class="adm-form-row">
        <div class="adm-form-group"><label class="adm-label">${t('disc.usageLimit')}</label><input class="adm-input" type="number" min="0" id="dLimit" value="${d.usageLimit||''}" placeholder="${Admin.lang==='ar'?'غير محدود':'Unlimited'}"/></div>
        <div class="adm-form-group"><label class="adm-label">${t('disc.expiry')}</label><input class="adm-input" type="date" id="dExpiry" value="${d.expiry||''}"/></div>
      </div>
    </div>`;
  },

  _updateTypeHint() {
    const tp = document.getElementById('dType')?.value;
    const vg = document.getElementById('dValueGroup');
    if (vg) vg.style.display = tp === 'shipping' ? 'none' : '';
  },

  openAdd() {
    const t = k => Admin.t(k);
    Admin.openModal(t('disc.add'), this._formHtml(), () => {
      const code = (document.getElementById('dCode')?.value||'').trim().toUpperCase();
      const type = document.getElementById('dType')?.value||'percent';
      const value= parseFloat(document.getElementById('dValue')?.value)||0;
      if (!code) { Admin.toast(t('common.required'),'error'); return false; }
      // Check duplicate
      if (AdminDB.getDiscounts().some(d=>d.code===code)) {
        Admin.toast(Admin.lang==='ar'?'الكود موجود بالفعل':'Coupon code already exists','error');
        return false;
      }
      AdminDB.addDiscount({
        code, type, value,
        descEn:      document.getElementById('dDescEn')?.value.trim()||'',
        descAr:      document.getElementById('dDescAr')?.value.trim()||'',
        minOrder:    parseFloat(document.getElementById('dMinOrder')?.value)||0,
        maxDiscount: parseFloat(document.getElementById('dMaxDisc')?.value)||0,
        usageLimit:  parseInt(document.getElementById('dLimit')?.value)||0,
        expiry:      document.getElementById('dExpiry')?.value||'',
        enabled:     true,
      });
      Admin.toast(t('disc.saved'));
      this.render();
    });
    requestAnimationFrame(()=>this._updateTypeHint());
  },

  openEdit(id) {
    const d = AdminDB.getDiscounts().find(x=>x.id===id);
    if (!d) return;
    const t = k => Admin.t(k);
    Admin.openModal(t('common.edit'), this._formHtml(d), () => {
      const code = (document.getElementById('dCode')?.value||'').trim().toUpperCase();
      const type = document.getElementById('dType')?.value||d.type;
      const value= parseFloat(document.getElementById('dValue')?.value)||0;
      if (!code) { Admin.toast(t('common.required'),'error'); return false; }
      // Check duplicate (excluding self)
      if (AdminDB.getDiscounts().some(x=>x.code===code && x.id!==id)) {
        Admin.toast(Admin.lang==='ar'?'الكود موجود بالفعل':'Coupon code already exists','error');
        return false;
      }
      AdminDB.updateDiscount({
        ...d, code, type, value,
        descEn:      document.getElementById('dDescEn')?.value.trim()||d.descEn,
        descAr:      document.getElementById('dDescAr')?.value.trim()||d.descAr,
        minOrder:    parseFloat(document.getElementById('dMinOrder')?.value)||0,
        maxDiscount: parseFloat(document.getElementById('dMaxDisc')?.value)||0,
        usageLimit:  parseInt(document.getElementById('dLimit')?.value)||0,
        expiry:      document.getElementById('dExpiry')?.value||d.expiry,
      });
      Admin.toast(t('disc.saved'));
      this.render();
    });
    requestAnimationFrame(()=>this._updateTypeHint());
  },

  toggle(id) {
    AdminDB.toggleDiscount(id);
    Admin.toast(Admin.t('set.saved'));
    this.render();
  },

  confirmDelete(id) {
    Admin.confirm(Admin.t('common.confirmDelete'), ()=>{
      AdminDB.deleteDiscount(id);
      Admin.toast(Admin.t('disc.deleted'));
      this.render();
    });
  },
};

/* ============================================================
   ANALYTICS & STATISTICS
   ============================================================ */
const AnalyticsSection = {
  async render() {
    try {
      const el = document.getElementById('section-analytics');
      if (!el) return;
      el.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--clr-text-muted)">${Admin.t('common.loading')}</div>`;

      const l       = Admin.lang;
      const t       = k => Admin.t(k);
      const orders  = AdminDB.getOrders();
      const prods   = AdminDB.getProducts();
      const custs   = AdminDB.getCustomers();
      const stats   = await AdminDB.getStats();

      /* ── Revenue by month (last 6 months) ── */
      const months = [];
      const now = new Date();
      for (let i=5; i>=0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
        const mo = d.getMonth(), yr = d.getFullYear();
        const rev = orders.filter(o=>{
          const od = new Date(o.date);
          return od.getMonth()===mo && od.getFullYear()===yr && o.paymentStatus==='paid';
        }).reduce((s,o)=>s+o.amount,0);
        const label = l==='ar'
          ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][mo]
          : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][mo];
        months.push({ label, rev });
      }
      const maxRev = Math.max(...months.map(m=>m.rev), 1);
      const revBars = months.map(m=>`
        <div class="adm-bar-group">
          <div class="adm-bar-val" style="font-size:.65rem">${m.rev?fmtSar(m.rev,l):''}</div>
          <div class="adm-bar" style="height:${Math.max(6,(m.rev/maxRev)*120)}px" title="${fmtSar(m.rev,l)}"></div>
          <div class="adm-bar-label" style="font-size:.65rem">${esc(m.label)}</div>
        </div>`).join('');

      /* ── Top 5 products by order count ── */
      const prodCount = {};
      orders.forEach(o=>{ prodCount[o.product]=(prodCount[o.product]||0)+1; });
      const topProds = Object.entries(prodCount)
        .sort((a,b)=>b[1]-a[1]).slice(0,5);
      const maxProd = topProds[0]?.[1]||1;
      const topProdRows = topProds.map(([name,cnt],i)=>`
        <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--clr-border)">
          <div style="width:22px;height:22px;border-radius:50%;background:var(--clr-accent);color:#fff;font-size:.65rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.8rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(name)}</div>
            <div style="height:4px;background:var(--clr-surface-3);border-radius:4px;margin-top:4px;overflow:hidden">
              <div style="height:100%;width:${Math.round(cnt/maxProd*100)}%;background:var(--clr-accent);border-radius:4px"></div>
            </div>
          </div>
          <div style="font-weight:700;color:var(--clr-accent);font-size:.85rem;flex-shrink:0">${cnt}</div>
        </div>`).join('') || `<div class="adm-empty">${t('common.noData')}</div>`;

      /* ── Revenue by city ── */
      const cityRev = {};
      orders.filter(o=>o.paymentStatus==='paid').forEach(o=>{
        const city = l==='ar'?(o.city?.ar||o.city?.en||'Other'):(o.city?.en||'Other');
        cityRev[city]=(cityRev[city]||0)+o.amount;
      });
      const topCities = Object.entries(cityRev).sort((a,b)=>b[1]-a[1]).slice(0,6);
      const maxCity = topCities[0]?.[1]||1;
      const cityRows = topCities.map(([city,rev])=>`
        <div style="display:flex;align-items:center;gap:.75rem;padding:.5rem 0">
          <div style="font-size:.8rem;font-weight:500;width:90px;flex-shrink:0">${esc(city)}</div>
          <div style="flex:1;height:8px;background:var(--clr-surface-3);border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${Math.round(rev/maxCity*100)}%;background:var(--clr-accent);border-radius:4px;transition:.6s"></div>
          </div>
          <div style="font-size:.78rem;font-weight:600;flex-shrink:0;min-width:70px;text-align:end">${fmtSar(rev,l)}</div>
        </div>`).join('') || `<div class="adm-empty">${t('common.noData')}</div>`;

      /* ── Payment methods breakdown ── */
      const payMap = {};
      orders.filter(o=>o.paymentStatus==='paid').forEach(o=>{
        const m = o.paymentMethod||'other';
        payMap[m]=(payMap[m]||0)+o.amount;
      });
      const PAYICONS = { credit_card:'💳', mada:'🏧', stc_pay:'📱', apple_pay:'🍎', cash:'💵' };
      const payRows = Object.entries(payMap).sort((a,b)=>b[1]-a[1]).map(([m,rev])=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--clr-border)">
          <div style="display:flex;align-items:center;gap:.5rem;font-size:.8rem">
            <span>${PAYICONS[m]||'💰'}</span>
            <span>${esc(Admin.t('pay.method.'+m)||m)}</span>
          </div>
          <strong style="font-size:.82rem">${fmtSar(rev,l)}</strong>
        </div>`).join('') || `<div class="adm-empty">${t('common.noData')}</div>`;

      /* ── KPIs ── */
      const totalPaid = orders.filter(o=>o.paymentStatus==='paid').reduce((s,o)=>s+o.amount,0);
      const avgOrder  = orders.length ? Math.round(totalPaid/orders.length) : 0;
      const convRate  = custs.length  ? Math.round(orders.length/custs.length*100) : 0;

      el.innerHTML = `
        <div class="adm-stats-row" style="margin-bottom:var(--adm-space-5)">
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'إجمالي الإيرادات':'Total Revenue'}</div>
              <div class="adm-stat-card__value">${fmtSar(totalPaid,l)}</div>
            </div>
          </div>
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
            </div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'متوسط قيمة الطلب':'Avg. Order Value'}</div>
              <div class="adm-stat-card__value">${fmtSar(avgOrder,l)}</div>
            </div>
          </div>
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'معدل التحويل':'Conversion Rate'}</div>
              <div class="adm-stat-card__value">${convRate}%</div>
            </div>
          </div>
          <div class="adm-stat-card">
            <div class="adm-stat-card__icon adm-stat-card__icon--warm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div class="adm-stat-card__body">
              <div class="adm-stat-card__label">${l==='ar'?'إجمالي الطلبات':'Total Orders'}</div>
              <div class="adm-stat-card__value">${orders.length}</div>
            </div>
          </div>
        </div>

        <div class="adm-grid-2-1" style="margin-bottom:var(--adm-space-5)">
          <div class="adm-chart-box">
            <div class="adm-chart-header">
              <div class="adm-chart-title">${t('anal.revenue')} — ${l==='ar'?'آخر ٦ أشهر':'Last 6 Months'}</div>
              <span class="adm-badge adm-badge--accent">${fmtSar(totalPaid,l)}</span>
            </div>
            <div class="adm-bar-chart" style="min-height:140px">${revBars}</div>
          </div>
          <div class="adm-chart-box">
            <div class="adm-chart-title" style="margin-bottom:var(--adm-space-4)">${t('anal.payMethods')}</div>
            <div>${payRows}</div>
          </div>
        </div>

        <div class="adm-grid-2" style="margin-bottom:var(--adm-space-5)">
          <div class="adm-chart-box">
            <div class="adm-chart-title" style="margin-bottom:var(--adm-space-4)">${t('anal.topProducts')}</div>
            <div>${topProdRows}</div>
          </div>
          <div class="adm-chart-box">
            <div class="adm-chart-title" style="margin-bottom:var(--adm-space-4)">${t('anal.byCity')}</div>
            <div>${cityRows}</div>
          </div>
        </div>

        <div class="adm-chart-box">
          <div class="adm-chart-header">
            <div class="adm-chart-title">${l==='ar'?'إحصائيات المخزون':'Inventory Statistics'}</div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem;margin-top:var(--adm-space-4)">
            ${prods.map(p=>`
              <div style="padding:.75rem;border-radius:var(--radius-md);background:var(--clr-surface-2);display:flex;align-items:center;justify-content:space-between;gap:.5rem">
                <div style="font-size:.75rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(l==='ar'?p.titleAr:p.titleEn)}</div>
                <span class="adm-stock${p.stock===0?' adm-stock--zero':p.stock<5?' adm-stock--low':''}">${p.stock}</span>
              </div>`).join('')}
          </div>
        </div>`;
    } catch(e) {
      console.error('[AnalyticsSection]', e);
      const el = document.getElementById('section-analytics');
      if (el) el.innerHTML = `<div class="adm-empty" style="color:var(--clr-error)">Error: ${esc(e.message)}</div>`;
    }
  },
};

/* ── Explicit global exports (ensures cross-script accessibility) ─ */
window.DashboardSection  = DashboardSection;
window.ProductsSection   = ProductsSection;
window.CategoriesSection = CategoriesSection;
window.OrdersSection     = OrdersSection;
window.CustomersSection  = CustomersSection;
window.ShippingSection   = ShippingSection;
window.PaymentsSection   = PaymentsSection;
window.ReviewsSection    = ReviewsSection;
window.SettingsSection   = SettingsSection;
window.DiscountsSection  = DiscountsSection;
window.AnalyticsSection  = AnalyticsSection;
/* Pager helper used in onclick="" strings must be global */
window.setPage           = setPage;
window.getPage           = getPage;
