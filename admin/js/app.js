/* ================================================================
   Balance 3D Admin — App  (app.js)
   Shell · Router · i18n · Modal · Toast · All 11 sections
   ================================================================ */
'use strict';

/* ════════════════════════════════════════════════════════════════
   TRANSLATIONS
════════════════════════════════════════════════════════════════ */
const T = {
  ar: {
    /* nav */
    'nav.dashboard':'لوحة التحكم','nav.analytics':'الإحصائيات',
    'nav.products':'المنتجات','nav.categories':'التصنيفات',
    'nav.orders':'الطلبات','nav.customers':'العملاء',
    'nav.shipping':'الشحن والتتبع','nav.payments':'المدفوعات',
    'nav.reviews':'التقييمات','nav.discounts':'الخصومات',
    'nav.settings':'الإعدادات',
    /* common */
    'common.loading':'جاري التحميل…','common.save':'حفظ',
    'common.cancel':'إلغاء','common.delete':'حذف','common.edit':'تعديل',
    'common.add':'إضافة','common.search':'بحث…','common.actions':'الإجراءات',
    'common.noData':'لا توجد بيانات','common.confirm':'تأكيد',
    'common.confirmDelete':'هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.',
    'common.yes':'نعم، احذف','common.viewAll':'عرض الكل',
    'common.status':'الحالة','common.date':'التاريخ','common.amount':'المبلغ',
    'common.name':'الاسم','common.email':'البريد الإلكتروني',
    'common.phone':'الجوال','common.city':'المدينة',
    'common.all':'الكل','common.active':'نشط','common.blocked':'محظور',
    'common.saved':'تم الحفظ ✓','common.deleted':'تم الحذف',
    'common.error':'حدث خطأ، يرجى المحاولة مرة أخرى',
    /* dashboard */
    'dash.revenue':'إجمالي الإيرادات','dash.monthRev':'إيرادات الشهر',
    'dash.orders':'إجمالي الطلبات','dash.pending':'طلبات معلقة',
    'dash.products':'المنتجات','dash.outOfStock':'نفد المخزون',
    'dash.customers':'العملاء','dash.recentOrders':'أحدث الطلبات',
    'dash.topProducts':'المنتجات الأكثر مبيعاً','dash.lowStock':'مخزون منخفض',
    'dash.revenueChart':'إيرادات آخر 7 أيام','dash.orderStatus':'توزيع حالات الطلبات',
    'dash.sar':'ر.س',
    /* products */
    'prod.title':'المنتجات','prod.add':'إضافة منتج','prod.edit':'تعديل المنتج',
    'prod.nameEn':'الاسم (إنجليزي)','prod.nameAr':'الاسم (عربي)',
    'prod.descEn':'الوصف (إنجليزي)','prod.descAr':'الوصف (عربي)',
    'prod.category':'التصنيف','prod.categoryEn':'التصنيف (إنجليزي)','prod.categoryAr':'التصنيف (عربي)',
    'prod.material':'المادة','prod.price':'السعر (ر.س)',
    'prod.stock':'الكمية','prod.badge':'الشارة','prod.image':'صورة المنتج',
    'prod.status.active':'نشط','prod.status.draft':'مسودة',
    'prod.status.out_of_stock':'نفد المخزون',
    'prod.badge.none':'بلا شارة','prod.badge.new':'جديد',
    'prod.badge.popular':'الأكثر طلباً','prod.badge.sale':'تخفيض',
    'prod.badge.trending':'رائج','prod.badge.bestseller':'الأكثر مبيعاً',
    'prod.colors':'ألوان المنتج',
    /* categories */
    'cat.title':'التصنيفات','cat.add':'إضافة تصنيف','cat.edit':'تعديل التصنيف',
    'cat.nameEn':'الاسم (إنجليزي)','cat.nameAr':'الاسم (عربي)',
    'cat.icon':'أيقونة','cat.products':'المنتجات',
    /* orders */
    'ord.title':'الطلبات','ord.id':'رقم الطلب','ord.customer':'العميل',
    'ord.product':'المنتج','ord.items':'العناصر','ord.total':'الإجمالي',
    'ord.tracking':'رقم التتبع','ord.updateStatus':'تحديث الحالة',
    'ord.detail':'تفاصيل الطلب','ord.address':'العنوان',
    'ord.deliveryAddr':'عنوان التوصيل','ord.street':'الشارع',
    'ord.district':'الحي','ord.buildingNum':'رقم المبنى',
    'ord.postalCode':'الرمز البريدي','ord.deliveryNotes':'ملاحظات التوصيل',
    'ord.orderedItems':'المنتجات المطلوبة','ord.unitPrice':'سعر الوحدة',
    'ord.qty':'الكمية','ord.lineTotal':'الإجمالي الفرعي',
    'ord.subtotal':'المجموع قبل الشحن','ord.shippingCost':'تكلفة الشحن',
    'ord.status.pending':'معلق','ord.status.processing':'قيد المعالجة',
    'ord.status.shipped':'تم الشحن','ord.status.delivered':'تم التسليم',
    'ord.status.cancelled':'ملغي',
    /* customers */
    'cust.title':'العملاء','cust.orders':'الطلبات','cust.spent':'إجمالي الإنفاق',
    'cust.joined':'تاريخ التسجيل','cust.history':'سجل الطلبات',
    'cust.toggle':'تغيير الحالة','cust.delete':'حذف العميل',
    'cust.block':'حظر العميل','cust.unblock':'إلغاء الحظر',
    'cust.confirmBlock':'هل تريد حظر هذا العميل؟ سيتم تسجيل خروجه فوراً ولن يتمكن من تسجيل الدخول حتى يتم رفع الحظر.',
    'cust.confirmDelete':'هل أنت متأكد من حذف هذا الحساب نهائياً؟ لا يمكن التراجع عن هذا الإجراء.',
    'cust.blocked':'تم حظر العميل وتسجيل خروجه','cust.unblocked':'تم إلغاء الحظر',
    /* shipping */
    'ship.title':'الشحن والتتبع','ship.noTracking':'لم يُحدد بعد',
    'ship.editTracking':'تحديث بيانات الشحن','ship.trackingNo':'رقم التتبع',
    'ship.carrier':'شركة الشحن',
    /* payments */
    'pay.title':'المدفوعات','pay.method':'طريقة الدفع','pay.ref':'مرجع الطلب',
    'pay.status.paid':'مدفوع','pay.status.pending':'معلق','pay.status.refunded':'مسترجع',
    'pay.method.credit_card':'بطاقة ائتمانية','pay.method.mada':'مدى',
    'pay.method.stc_pay':'STC Pay','pay.method.apple_pay':'Apple Pay',
    'pay.method.cash':'نقداً','pay.method.pending':'—',
    /* reviews */
    'rev.title':'التقييمات','rev.rating':'التقييم','rev.comment':'التعليق',
    'rev.approve':'موافقة','rev.approved':'معتمد','rev.pending':'بانتظار الموافقة',
    /* discounts */
    'disc.title':'الخصومات','disc.add':'إضافة كود خصم','disc.edit':'تعديل كود الخصم',
    'disc.code':'الكود','disc.type':'النوع','disc.value':'القيمة',
    'disc.minOrder':'الحد الأدنى للطلب','disc.usage':'الاستخدام',
    'disc.expiry':'تاريخ الانتهاء','disc.type.percent':'نسبة مئوية',
    'disc.type.fixed':'مبلغ ثابت','disc.active':'نشط','disc.expired':'منتهي',
    'disc.usedCode':'كود الخصم المستخدم','disc.savedAmount':'مبلغ الخصم','disc.origTotal':'المجموع قبل الخصم',
    /* settings */
    'set.title':'الإعدادات','set.storeEn':'اسم المتجر (إنجليزي)',
    'set.storeAr':'اسم المتجر (عربي)','set.email':'البريد الإلكتروني',
    'set.phone':'رقم الجوال','set.address':'العنوان','set.currency':'العملة',
    'set.loginCreds':'بيانات الدخول',
    'set.username':'اسم المستخدم / البريد الإلكتروني',
    'set.updateUsername':'تحديث اسم المستخدم',
    'set.currentPw':'كلمة المرور الحالية',
    'set.newPw':'كلمة المرور الجديدة',
    'set.confirmPw':'تأكيد كلمة المرور الجديدة',
    'set.updatePw':'تحديث كلمة المرور',
    'set.errPwMatch':'كلمتا المرور غير متطابقتان',
    'set.errPwLen':'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
    'set.errWrongPw':'كلمة المرور الحالية غير صحيحة',
    'set.successCreds':'تم تحديث بيانات الدخول بنجاح ✓',
    'set.errUpdate':'فشل التحديث، يرجى المحاولة مرة أخرى',
    /* analytics */
    'ana.title':'الإحصائيات','ana.salesChart':'المبيعات عبر الزمن',
    'ana.statusBreakdown':'توزيع حالات الطلبات',
    'ana.topByRevenue':'أعلى المنتجات إيراداً',
    'ana.custGrowth':'نمو العملاء',
    'ana.orders':'الطلبات','ana.revenue':'الإيرادات',
  },
  en: {
    'nav.dashboard':'Dashboard','nav.analytics':'Analytics',
    'nav.products':'Products','nav.categories':'Categories',
    'nav.orders':'Orders','nav.customers':'Customers',
    'nav.shipping':'Shipping','nav.payments':'Payments',
    'nav.reviews':'Reviews','nav.discounts':'Discounts',
    'nav.settings':'Settings',
    'common.loading':'Loading…','common.save':'Save',
    'common.cancel':'Cancel','common.delete':'Delete','common.edit':'Edit',
    'common.add':'Add','common.search':'Search…','common.actions':'Actions',
    'common.noData':'No data found','common.confirm':'Confirm',
    'common.confirmDelete':'Are you sure you want to delete this? This action cannot be undone.',
    'common.yes':'Yes, delete','common.viewAll':'View all',
    'common.status':'Status','common.date':'Date','common.amount':'Amount',
    'common.name':'Name','common.email':'Email',
    'common.phone':'Phone','common.city':'City',
    'common.all':'All','common.active':'Active','common.blocked':'Blocked',
    'common.saved':'Saved ✓','common.deleted':'Deleted',
    'common.error':'An error occurred, please try again',
    'dash.revenue':'Total Revenue','dash.monthRev':'Monthly Revenue',
    'dash.orders':'Total Orders','dash.pending':'Pending Orders',
    'dash.products':'Products','dash.outOfStock':'Out of Stock',
    'dash.customers':'Customers','dash.recentOrders':'Recent Orders',
    'dash.topProducts':'Top-Selling Products','dash.lowStock':'Low Stock',
    'dash.revenueChart':'Revenue — Last 7 Days','dash.orderStatus':'Order Status Distribution',
    'dash.sar':'SAR',
    'prod.title':'Products','prod.add':'Add Product','prod.edit':'Edit Product',
    'prod.nameEn':'Name (English)','prod.nameAr':'Name (Arabic)',
    'prod.descEn':'Description (EN)','prod.descAr':'Description (AR)',
    'prod.category':'Category','prod.categoryEn':'Category (English)','prod.categoryAr':'Category (Arabic)',
    'prod.material':'Material','prod.price':'Price (SAR)',
    'prod.stock':'Stock Qty','prod.badge':'Badge','prod.image':'Product Image',
    'prod.status.active':'Active','prod.status.draft':'Draft',
    'prod.status.out_of_stock':'Out of Stock',
    'prod.badge.none':'None','prod.badge.new':'New',
    'prod.badge.popular':'Popular','prod.badge.sale':'Sale',
    'prod.badge.trending':'Trending','prod.badge.bestseller':'Best Seller',
    'prod.colors':'Color Swatches',
    'cat.title':'Categories','cat.add':'Add Category','cat.edit':'Edit Category',
    'cat.nameEn':'Name (English)','cat.nameAr':'Name (Arabic)',
    'cat.icon':'Icon','cat.products':'Products',
    'ord.title':'Orders','ord.id':'Order ID','ord.customer':'Customer',
    'ord.product':'Product','ord.items':'Items','ord.total':'Total',
    'ord.tracking':'Tracking No.','ord.updateStatus':'Update Status',
    'ord.detail':'Order Detail','ord.address':'Address',
    'ord.deliveryAddr':'Delivery Address','ord.street':'Street',
    'ord.district':'District','ord.buildingNum':'Building No.',
    'ord.postalCode':'Postal Code','ord.deliveryNotes':'Delivery Notes',
    'ord.orderedItems':'Ordered Items','ord.unitPrice':'Unit Price',
    'ord.qty':'Qty','ord.lineTotal':'Line Total',
    'ord.subtotal':'Subtotal','ord.shippingCost':'Shipping Cost',
    'ord.status.pending':'Pending','ord.status.processing':'Processing',
    'ord.status.shipped':'Shipped','ord.status.delivered':'Delivered',
    'ord.status.cancelled':'Cancelled',
    'cust.title':'Customers','cust.orders':'Orders','cust.spent':'Total Spent',
    'cust.joined':'Joined','cust.history':'Order History',
    'cust.toggle':'Toggle Status','cust.delete':'Delete Customer',
    'cust.block':'Block Customer','cust.unblock':'Unblock',
    'cust.confirmBlock':'Block this customer? They will be signed out immediately and cannot log back in until unblocked.',
    'cust.confirmDelete':'Permanently delete this account? This cannot be undone.',
    'cust.blocked':'Customer blocked and signed out','cust.unblocked':'Customer unblocked',
    'ship.title':'Shipping & Tracking','ship.noTracking':'Not assigned',
    'ship.editTracking':'Update Shipping','ship.trackingNo':'Tracking Number',
    'ship.carrier':'Carrier',
    'pay.title':'Payments','pay.method':'Method','pay.ref':'Order Ref',
    'pay.status.paid':'Paid','pay.status.pending':'Pending','pay.status.refunded':'Refunded',
    'pay.method.credit_card':'Credit Card','pay.method.mada':'Mada',
    'pay.method.stc_pay':'STC Pay','pay.method.apple_pay':'Apple Pay',
    'pay.method.cash':'Cash','pay.method.pending':'—',
    'rev.title':'Reviews','rev.rating':'Rating','rev.comment':'Comment',
    'rev.approve':'Approve','rev.approved':'Approved','rev.pending':'Pending',
    'disc.title':'Discounts','disc.add':'Add Discount','disc.edit':'Edit Discount',
    'disc.code':'Code','disc.type':'Type','disc.value':'Value',
    'disc.minOrder':'Min Order','disc.usage':'Usage',
    'disc.expiry':'Expiry','disc.type.percent':'Percentage',
    'disc.type.fixed':'Fixed Amount','disc.active':'Active','disc.expired':'Expired',
    'disc.usedCode':'Discount Code Used','disc.savedAmount':'Discount Amount','disc.origTotal':'Total Before Discount',
    'set.title':'Settings','set.storeEn':'Store Name (English)',
    'set.storeAr':'Store Name (Arabic)','set.email':'Email',
    'set.phone':'Phone','set.address':'Address','set.currency':'Currency',
    'set.loginCreds':'Login Credentials',
    'set.username':'Username / Email',
    'set.updateUsername':'Update Username',
    'set.currentPw':'Current Password',
    'set.newPw':'New Password',
    'set.confirmPw':'Confirm New Password',
    'set.updatePw':'Update Password',
    'set.errPwMatch':'Passwords do not match',
    'set.errPwLen':'Password must be at least 8 characters',
    'set.errWrongPw':'Current password is incorrect',
    'set.successCreds':'Login credentials updated successfully ✓',
    'set.errUpdate':'Update failed, please try again',
    'ana.title':'Analytics','ana.salesChart':'Sales Over Time',
    'ana.statusBreakdown':'Orders by Status',
    'ana.topByRevenue':'Top Products by Revenue',
    'ana.custGrowth':'Customer Growth',
    'ana.orders':'Orders','ana.revenue':'Revenue',
  },
};

/* ════════════════════════════════════════════════════════════════
   UTILITIES
════════════════════════════════════════════════════════════════ */
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const fmt = n => Number(n || 0).toLocaleString();

function t(key) {
  const lang = Admin.lang || 'ar';
  return (T[lang] && T[lang][key]) || (T.en[key]) || key;
}

function fmtSar(n) {
  return fmt(n) + ' ' + t('dash.sar');
}

/* status → badge class */
const BADGE_CLS = {
  pending:'warning', processing:'info', shipped:'accent',
  delivered:'success', cancelled:'error',
  paid:'success', refunded:'warning',
  active:'success', blocked:'error',
  draft:'neutral', out_of_stock:'error',
  approved:'success',
};

function badge(status, labelKey) {
  const cls   = BADGE_CLS[status] || 'neutral';
  const label = labelKey ? t(labelKey + '.' + status) : (t('ord.status.' + status) || status);
  return `<span class="adm-badge adm-badge--${cls} adm-badge--dot">${esc(label)}</span>`;
}

function stars(n) {
  const full = Math.round(Number(n) || 0);
  return '<span class="adm-stars">' + '★'.repeat(full) + '☆'.repeat(5 - full) + '</span>';
}

/* ── Toast ─────────────────────────────────────────────────── */
function toast(msg, type = 'success') {
  let container = document.getElementById('admToasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'admToasts';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `adm-toast adm-toast--${type}`;
  el.textContent = msg;
  container.appendChild(el);
  requestAnimationFrame(() => { requestAnimationFrame(() => el.classList.add('show')); });
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 320);
  }, 3200);
}

/* ── Modal ─────────────────────────────────────────────────── */
function openModal(content, opts = {}) {
  const modal = document.getElementById('admModal');
  if (!modal) return;
  modal.querySelector('.adm-modal__box').className =
    'adm-modal__box' + (opts.lg ? ' adm-modal__box--lg' : opts.sm ? ' adm-modal__box--sm' : '');
  modal.querySelector('.adm-modal__body').innerHTML = content;
  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('admModal')?.classList.remove('open');
}

/* ── Confirm dialog ────────────────────────────────────────── */
function confirmDialog(msg, onYes, opts = {}) {
  const html = `
    <div class="adm-confirm">
      <div class="adm-confirm__ico">${opts.icon || '⚠️'}</div>
      <h3>${esc(opts.title || t('common.confirm'))}</h3>
      <p>${esc(msg)}</p>
      <div class="adm-confirm__btns">
        <button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
        <button class="adm-btn adm-btn--danger" id="admConfirmYes">${esc(opts.yes || t('common.yes'))}</button>
      </div>
    </div>`;
  openModal(html, { sm: true });
  document.getElementById('admConfirmYes').onclick = () => { closeModal(); onYes(); };
}

/* ── Loading skeleton ──────────────────────────────────────── */
function skeletonPage(rows = 5) {
  const rowsHtml = Array.from({ length: rows }, (_, i) =>
    `<div class="adm-sk adm-sk-row" style="width:${70 + (i % 3) * 10}%"></div>`
  ).join('');
  return `<div class="adm-sk-page">
    <div class="adm-sk-stats">
      <div class="adm-sk adm-sk-stat"></div><div class="adm-sk adm-sk-stat"></div>
      <div class="adm-sk adm-sk-stat"></div><div class="adm-sk adm-sk-stat"></div>
    </div>
    <div class="adm-sk adm-sk-table"></div>
    <div style="margin-top:1rem">${rowsHtml}</div>
  </div>`;
}

function skeletonTable() {
  return `<div class="adm-sk-page"><div class="adm-sk adm-sk-table"></div></div>`;
}

/* ── SVG icons ─────────────────────────────────────────────── */
const ICO = {
  revenue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  orders:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  box:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  users:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  check:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  edit:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  plus:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  eye:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  logout:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  search:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  menu:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  x:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  ban:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,
  unlock:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
};

/* ════════════════════════════════════════════════════════════════
   ADMIN SHELL
════════════════════════════════════════════════════════════════ */
const Admin = {
  lang: localStorage.getItem('b3d_admin_lang') || 'ar',
  section: 'dashboard',

  init() {
    this.lang = localStorage.getItem('b3d_admin_lang') || 'ar';
    document.documentElement.lang = this.lang;
    document.documentElement.dir  = this.lang === 'ar' ? 'rtl' : 'ltr';
    this._renderShell();
    const hash = (location.hash || '').replace('#', '');
    const VALID = ['dashboard','analytics','products','categories','orders',
                   'customers','shipping','payments','reviews','discounts','settings'];
    this.navigate(VALID.includes(hash) ? hash : 'dashboard');
  },

  _renderShell() {
    const l = this.lang;
    const nav = [
      { group: l==='ar'?'الرئيسية':'Main' },
      { id:'dashboard',  icon:ICO.revenue },
      { id:'analytics',  icon:ICO.orders  },
      { group: l==='ar'?'الكتالوج':'Catalog' },
      { id:'products',   icon:ICO.box    },
      { id:'categories', icon:ICO.box    },
      { group: l==='ar'?'التجارة':'Commerce' },
      { id:'orders',     icon:ICO.orders  },
      { id:'customers',  icon:ICO.users   },
      { group: l==='ar'?'اللوجستيات':'Logistics' },
      { id:'shipping',   icon:ICO.box    },
      { id:'payments',   icon:ICO.revenue },
      { group: l==='ar'?'المزيد':'More' },
      { id:'reviews',    icon:ICO.check  },
      { id:'discounts',  icon:ICO.revenue },
      { id:'settings',   icon:ICO.orders  },
    ];

    const navHTML = nav.map(n => {
      if (n.group) return `<div class="adm-nav__section-lbl">${esc(n.group)}</div>`;
      return `<div class="adm-nav__item">
        <div class="adm-nav__link" data-section="${n.id}">
          ${n.icon}<span>${t('nav.' + n.id)}</span>
        </div>
      </div>`;
    }).join('');

    document.getElementById('admSidebar').innerHTML = `
      <a class="adm-logo" href="../index.html">
        <div class="adm-logo__mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polygon points="12 2 2 7 12 12 22 7"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </div>
        <div class="adm-logo__text">
          <div class="adm-logo__name">Balance 3D</div>
          <div class="adm-logo__sub">${l==='ar'?'لوحة التحكم':'Admin Panel'}</div>
        </div>
      </a>
      <nav class="adm-nav">${navHTML}</nav>
      <div class="adm-sidebar-foot">
        <div class="adm-sidebar-foot__user" id="admLogoutBtn">
          <div class="adm-sidebar-foot__av">A</div>
          <div>
            <div class="adm-sidebar-foot__name">Admin</div>
            <div class="adm-sidebar-foot__role">${l==='ar'?'مسؤول النظام':'System Admin'}</div>
          </div>
          <div class="adm-sidebar-foot__out">${ICO.logout}</div>
        </div>
      </div>`;

    document.getElementById('admTopbar').innerHTML = `
      <button class="adm-hamburger" id="admHamburger">${ICO.menu}</button>
      <div class="adm-topbar__title" id="admTopbarTitle">${t('nav.dashboard')}</div>
      <div class="adm-topbar__search-wrap">
        <span class="adm-topbar__search-icon">${ICO.search}</span>
        <input class="adm-topbar__search" id="admGlobalSearch" placeholder="${t('common.search')}"/>
      </div>
      <div class="adm-topbar__actions">
        <button class="adm-topbar__btn adm-topbar__btn--lang" id="admLangBtn">${l==='ar'?'EN':'ع'}</button>
      </div>`;

    /* bind nav clicks */
    document.getElementById('admSidebar').addEventListener('click', e => {
      const link = e.target.closest('[data-section]');
      if (link) this.navigate(link.dataset.section);
    });
    document.getElementById('admHamburger').onclick = () => this.toggleSidebar();
    document.getElementById('admOverlay').onclick   = () => this.closeSidebar();
    document.getElementById('admLangBtn').onclick   = () => this.toggleLang();
    document.getElementById('admLogoutBtn').onclick = () => {
      sessionStorage.removeItem('b3d_admin_auth');
      location.href = 'login.html';
    };

    /* close modal on backdrop click */
    document.getElementById('admModal').querySelector('.adm-modal__bd').onclick = closeModal;
    document.getElementById('admModal').querySelector('.adm-modal__close').onclick = closeModal;

    /* ESC key */
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  },

  navigate(section) {
    this.section = section;
    location.hash = section;
    document.getElementById('admTopbarTitle').textContent = t('nav.' + section);
    document.querySelectorAll('.adm-nav__link').forEach(l =>
      l.classList.toggle('active', l.dataset.section === section));
    this.closeSidebar();
    const el = document.getElementById('admContent');
    el.innerHTML = skeletonTable();
    Sections[section]?.render(el);
  },

  toggleSidebar() {
    const s = document.getElementById('admSidebar');
    const o = document.getElementById('admOverlay');
    s.classList.toggle('open');
    o.classList.toggle('show');
  },

  closeSidebar() {
    document.getElementById('admSidebar')?.classList.remove('open');
    document.getElementById('admOverlay')?.classList.remove('show');
  },

  toggleLang() {
    this.lang = this.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('b3d_admin_lang', this.lang);
    document.documentElement.lang = this.lang;
    document.documentElement.dir  = this.lang === 'ar' ? 'rtl' : 'ltr';
    this._renderShell();
    this.navigate(this.section);
  },
};

/* expose closeModal globally for inline handlers */
window.closeModal = closeModal;

/* ════════════════════════════════════════════════════════════════
   IMAGE COMPRESSION UTILITY
   Uses canvas to resize + JPEG-encode before storing in localStorage.
   Targets ≤ 150 KB per image so 8–10 products fit comfortably within
   the browser's 5 MB localStorage quota.
════════════════════════════════════════════════════════════════ */
/**
 * Compress a File/Blob to a base64 JPEG string.
 * Makes two passes if needed: first at 900 px / q=0.82, then at 600 px / q=0.65.
 * @param {File} file
 * @returns {Promise<string>} base64 data-URL (image/jpeg)
 */
function _compressImage(file) {
  const TARGET_KB = 150;           // hard target per image
  const PASSES = [
    { maxPx: 900, quality: 0.82 }, // pass 1 — high quality, usually enough
    { maxPx: 600, quality: 0.65 }, // pass 2 — fallback for very large sources
    { maxPx: 400, quality: 0.50 }, // pass 3 — last resort
  ];

  return new Promise((resolve, reject) => {
    const img = new Image();
    const blobUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(blobUrl);

      const run = idx => {
        if (idx >= PASSES.length) {
          // All passes done — return whatever we have (best we can do)
          return resolve(lastResult);
        }
        const { maxPx, quality } = PASSES[idx];
        let { naturalWidth: w, naturalHeight: h } = img;
        if (w > maxPx || h > maxPx) {
          if (w >= h) { h = Math.round(h * maxPx / w); w = maxPx; }
          else        { w = Math.round(w * maxPx / h); h = maxPx; }
        }
        const canvas = document.createElement('canvas');
        canvas.width  = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const b64 = canvas.toDataURL('image/jpeg', quality);
        lastResult = b64;
        const kb = Math.round(b64.length * 0.75 / 1024); // approx decoded KB
        console.log(`[Compress] pass ${idx + 1}: ${w}×${h} q=${quality} → ${kb} KB`);
        if (kb <= TARGET_KB) return resolve(b64);
        run(idx + 1);
      };

      let lastResult = '';
      run(0);
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error('Cannot read image file'));
    };

    img.src = blobUrl;
  });
}

/* ════════════════════════════════════════════════════════════════
   SECTION RENDERERS
════════════════════════════════════════════════════════════════ */
const Sections = {};

/* ─────────────────────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────────────────────── */
Sections.dashboard = {
  async render(el) {
    el.innerHTML = skeletonPage();
    try {
      const s  = DB.getStats();
      const l  = Admin.lang;
      const ar = l === 'ar';

      /* stat cards */
      const stats = [
        { key:'dash.revenue',  val: fmtSar(s.totalRevenue), ico:'blue',   icon: ICO.revenue },
        { key:'dash.monthRev', val: fmtSar(s.monthRevenue), ico:'teal',   icon: ICO.revenue },
        { key:'dash.orders',   val: fmt(s.totalOrders),     ico:'warm',   icon: ICO.orders  },
        { key:'dash.pending',  val: fmt(s.pendingOrders),   ico:'red',    icon: ICO.orders  },
        { key:'dash.products', val: fmt(s.totalProducts),   ico:'purple', icon: ICO.box     },
        { key:'dash.outOfStock',val:fmt(s.outOfStock),      ico:'red',    icon: ICO.warning },
        { key:'dash.customers',val: fmt(s.totalCustomers),  ico:'green',  icon: ICO.users   },
      ];
      const statsHTML = stats.map(s => `
        <div class="adm-stat">
          <div class="adm-stat__ico adm-stat__ico--${s.ico}">${s.icon}</div>
          <div class="adm-stat__body">
            <div class="adm-stat__val">${s.val}</div>
            <div class="adm-stat__lbl">${t(s.key)}</div>
          </div>
        </div>`).join('');

      /* revenue bar chart */
      const maxV = Math.max(...s.weekChart.map(d => d.revenue), 1);
      const bars = s.weekChart.map(d => `
        <div class="adm-bar-grp">
          <div class="adm-bar-val">${d.revenue ? fmt(d.revenue) : ''}</div>
          <div class="adm-bar-bar" style="height:${Math.max(4, (d.revenue / maxV) * 120)}px" title="${fmtSar(d.revenue)}"></div>
          <div class="adm-bar-lbl">${esc(ar ? d.labelAr : d.labelEn)}</div>
        </div>`).join('');

      /* donut */
      const statuses = ['pending','processing','shipped','delivered','cancelled'];
      const total    = Object.values(s.statusDist).reduce((a, b) => a + b, 0) || 1;
      const deliv    = s.statusDist.delivered || 0;
      const pct      = Math.round((deliv / total) * 100);
      const circ     = 2 * Math.PI * 44;
      const offset   = circ - (pct / 100) * circ;

      /* recent orders */
      const ordRows = s.recentOrders.length
        ? s.recentOrders.map(o => `<tr>
            <td><span class="adm-code">${esc(o.id)}</span></td>
            <td>${esc(ar ? o.customer.ar : o.customer.en)}</td>
            <td><strong>${fmtSar(o.amount)}</strong></td>
            <td>${badge(o.status, 'ord.status')}</td>
            <td>${esc(o.date)}</td>
          </tr>`).join('')
        : `<tr><td colspan="5" class="adm-empty" style="padding:1.5rem">${t('common.noData')}</td></tr>`;

      /* top products */
      const topRows = s.topProducts.length
        ? s.topProducts.map((p, i) => {
            const pct2 = Math.round((p.count / (s.topProducts[0]?.count || 1)) * 100);
            return `<tr>
              <td style="font-size:1.1rem;text-align:center">${['🥇','🥈','🥉'][i] || (i+1)}</td>
              <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.name)}</td>
              <td style="text-align:center"><span class="adm-badge adm-badge--accent">${p.count} ${ar?'طلب':'orders'}</span></td>
              <td style="text-align:end;font-weight:700">${fmtSar(p.revenue)}</td>
              <td style="width:100px">
                <div class="adm-progress"><div class="adm-progress__bar" style="width:${pct2}%"></div></div>
              </td>
            </tr>`;
          }).join('')
        : `<tr><td colspan="5" class="adm-empty" style="padding:1.5rem">${t('common.noData')}</td></tr>`;

      /* low stock */
      const lowAlert = s.lowStock.length ? `
        <div class="adm-alert adm-alert--warning">
          ${ICO.warning}
          <span>${ar?'منتجات تنخفض مخزوناتها':'Low stock products'}: <strong>${s.lowStock.map(p => ar ? p.title?.ar||p.title?.en : p.title?.en).join('، ')}</strong></span>
        </div>` : '';

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr">
          <div><div class="adm-page-title">${t('nav.dashboard')}</div>
               <div class="adm-page-sub">${new Date().toLocaleDateString(ar?'ar-SA':'en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
        </div>
        ${lowAlert}
        <div class="adm-stats">${statsHTML}</div>
        <div class="adm-grid-2">
          <div class="adm-card">
            <div class="adm-card__hdr"><span class="adm-card__title">${t('dash.revenueChart')}</span>
              <span class="adm-badge adm-badge--accent">${fmtSar(s.monthRevenue)}</span>
            </div>
            <div class="adm-card__body"><div class="adm-bar-chart">${bars}</div></div>
          </div>
          <div class="adm-card">
            <div class="adm-card__hdr"><span class="adm-card__title">${t('dash.orderStatus')}</span></div>
            <div class="adm-card__body" style="display:flex;flex-direction:column;align-items:center;gap:1rem">
              <div class="adm-donut">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="var(--surface2)" stroke-width="10"/>
                  <circle cx="50" cy="50" r="44" fill="none" stroke="var(--acc)" stroke-width="10"
                    stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
                    stroke-linecap="round" style="transition:stroke-dashoffset .6s ease"/>
                </svg>
                <div class="adm-donut__lbl">
                  <div class="adm-donut__val">${pct}%</div>
                  <div class="adm-donut__sub">${ar?'مُسلَّم':'delivered'}</div>
                </div>
              </div>
              <div style="width:100%;display:flex;flex-direction:column;gap:6px">
                ${statuses.map(st => `
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:.75rem">
                    <span style="color:var(--txt-m)">${t('ord.status.'+st)}</span>
                    <strong>${s.statusDist[st] || 0}</strong>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-toolbar">
            <span class="adm-toolbar__title">${t('dash.recentOrders')}</span>
            <div class="adm-spacer"></div>
            <button class="adm-btn adm-btn--ghost adm-btn--sm" onclick="Admin.navigate('orders')">${t('common.viewAll')}</button>
          </div>
          <div class="adm-table-scroll"><table>
            <thead><tr><th>${t('ord.id')}</th><th>${t('ord.customer')}</th><th>${t('common.amount')}</th><th>${t('common.status')}</th><th>${t('common.date')}</th></tr></thead>
            <tbody>${ordRows}</tbody>
          </table></div>
        </div>
        ${s.topProducts.length ? `
        <div class="adm-table-wrap">
          <div class="adm-toolbar">
            <span class="adm-toolbar__title">${t('dash.topProducts')}</span>
            <div class="adm-spacer"></div>
            <button class="adm-btn adm-btn--ghost adm-btn--sm" onclick="Admin.navigate('products')">${t('common.viewAll')}</button>
          </div>
          <div class="adm-table-scroll"><table>
            <thead><tr><th>#</th><th>${ar?'المنتج':'Product'}</th><th style="text-align:center">${ar?'الطلبات':'Orders'}</th><th style="text-align:end">${ar?'الإيرادات':'Revenue'}</th><th>${ar?'الأداء':'Performance'}</th></tr></thead>
            <tbody>${topRows}</tbody>
          </table></div>
        </div>` : ''}
      </div>`;
    } catch(e) {
      console.error('[Dashboard]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   ANALYTICS
───────────────────────────────────────────────────────────── */
Sections.analytics = {
  async render(el) {
    el.innerHTML = skeletonPage();
    try {
      const s  = DB.getStats();
      const orders = DB.getOrders();
      const l  = Admin.lang;
      const ar = l === 'ar';

      /* 30-day sales chart */
      const days30 = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (29 - i));
        const ds = d.toISOString().split('T')[0];
        const rev = orders.filter(o => o.date === ds && o.status === 'delivered').reduce((s, o) => s + o.amount, 0);
        return { ds, rev, lbl: d.getDate() };
      });
      const maxD = Math.max(...days30.map(d => d.rev), 1);
      const bars30 = days30.map(d => `
        <div class="adm-bar-grp" style="min-width:12px">
          <div class="adm-bar-bar" style="height:${Math.max(2,(d.rev/maxD)*140)}px" title="${d.ds}: ${fmtSar(d.rev)}"></div>
          <div class="adm-bar-lbl" style="font-size:.5rem">${d.rev ? d.lbl : ''}</div>
        </div>`).join('');

      /* status table */
      const STATUSES = ['pending','processing','shipped','delivered','cancelled'];
      const total = orders.length || 1;
      const statusRows = STATUSES.map(st => {
        const cnt = orders.filter(o => o.status === st).length;
        const p   = Math.round((cnt / total) * 100);
        return `<tr>
          <td>${badge(st,'ord.status')}</td>
          <td style="text-align:center;font-weight:700;font-family:var(--font-en)">${cnt}</td>
          <td style="width:140px"><div class="adm-progress"><div class="adm-progress__bar" style="width:${p}%"></div></div></td>
          <td style="text-align:end;font-size:.75rem;color:var(--txt-m)">${p}%</td>
        </tr>`;
      }).join('');

      /* top products by revenue */
      const topRevRows = s.topProducts.map((p, i) => `<tr>
        <td style="text-align:center">${['🥇','🥈','🥉'][i]||i+1}</td>
        <td>${esc(p.name)}</td>
        <td style="text-align:center">${p.count}</td>
        <td style="text-align:end;font-weight:700">${fmtSar(p.revenue)}</td>
      </tr>`).join('') || `<tr><td colspan="4" class="adm-empty">${t('common.noData')}</td></tr>`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr"><div class="adm-page-title">${t('nav.analytics')}</div></div>
        <div class="adm-card" style="margin-bottom:1rem">
          <div class="adm-card__hdr"><span class="adm-card__title">${t('ana.salesChart')} — ${ar?'آخر 30 يوماً':'Last 30 Days'}</span>
            <span class="adm-badge adm-badge--success">${fmtSar(s.totalRevenue)}</span>
          </div>
          <div class="adm-card__body"><div class="adm-bar-chart" style="height:160px">${bars30}</div></div>
        </div>
        <div class="adm-grid-2">
          <div class="adm-table-wrap" style="margin-bottom:0">
            <div class="adm-toolbar"><span class="adm-toolbar__title">${t('ana.statusBreakdown')}</span></div>
            <div class="adm-table-scroll"><table>
              <thead><tr><th>${t('common.status')}</th><th style="text-align:center">${ar?'العدد':'Count'}</th><th>${ar?'النسبة':'Share'}</th><th></th></tr></thead>
              <tbody>${statusRows}</tbody>
            </table></div>
          </div>
          <div class="adm-table-wrap" style="margin-bottom:0">
            <div class="adm-toolbar"><span class="adm-toolbar__title">${t('ana.topByRevenue')}</span></div>
            <div class="adm-table-scroll"><table>
              <thead><tr><th>#</th><th>${ar?'المنتج':'Product'}</th><th style="text-align:center">${ar?'طلبات':'Orders'}</th><th style="text-align:end">${ar?'إيراد':'Revenue'}</th></tr></thead>
              <tbody>${topRevRows}</tbody>
            </table></div>
          </div>
        </div>
        <div class="adm-card">
          <div class="adm-card__hdr"><span class="adm-card__title">${t('ana.custGrowth')}</span></div>
          <div class="adm-card__body">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem">
              <div style="text-align:center"><div style="font-size:2rem;font-weight:800;color:var(--acc)">${s.totalCustomers}</div><div style="font-size:.75rem;color:var(--txt-m)">${ar?'إجمالي العملاء':'Total Customers'}</div></div>
              <div style="text-align:center"><div style="font-size:2rem;font-weight:800;color:var(--success)">${s.activeCustomers}</div><div style="font-size:.75rem;color:var(--txt-m)">${ar?'نشطون':'Active'}</div></div>
              <div style="text-align:center"><div style="font-size:2rem;font-weight:800;color:var(--warning)">${s.totalOrders}</div><div style="font-size:.75rem;color:var(--txt-m)">${ar?'إجمالي الطلبات':'Total Orders'}</div></div>
              <div style="text-align:center"><div style="font-size:2rem;font-weight:800;color:var(--txt)">${s.outOfStock}</div><div style="font-size:.75rem;color:var(--txt-m)">${ar?'نفد مخزونه':'Out of Stock'}</div></div>
            </div>
          </div>
        </div>
      </div>`;
    } catch(e) {
      console.error('[Analytics]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   PRODUCTS
───────────────────────────────────────────────────────────── */
Sections.products = {
  _filter: '',
  _cat: '',
  _colors: ['#C0C8E0'],

  async render(el) {
    el.innerHTML = skeletonTable();

    /* ── Remove any previously-attached click listener to prevent accumulation ── */
    if (this._clickHandler) {
      el.removeEventListener('click', this._clickHandler);
      this._clickHandler = null;
    }

    try {
      /* Silently free any orphaned image keys before reading data */
      DB.cleanupOrphanedImages();
      /* One-time migration: backfill salePrice/isOnSale on old products */
      DB.migrateProductPrices();

      const raw  = DB.getProducts();
      const prods = Array.isArray(raw) ? raw : [];
      const ar    = Admin.lang === 'ar';
      const cats  = [...new Set(prods.map(p => p.category?.en || '').filter(Boolean))];

      this._el = el;
      this._prods = prods;

      const catOpts = `<option value="">${t('common.all')}</option>` +
        cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');

      /* ── Low-stock alert banner (quantity ≤ 3) ── */
      const criticalProds = prods.filter(p => Number(p.stock) <= 3 && p.status !== 'draft');
      const lowBanner = criticalProds.length
        ? `<div class="adm-alert adm-alert--warning" style="margin-bottom:.75rem;cursor:pointer" id="prodLowBanner">
             ${ICO.warning}
             <span>
               ${ar ? '⚠️ تحذير: هذه المنتجات على وشك النفاد — '
                    : '⚠️ Warning: The following products are almost out of stock — '}
               <strong>${criticalProds.map(p => ar ? (p.title?.ar||p.title?.en) : (p.title?.en||p.title?.ar)).join('، ')}</strong>
             </span>
           </div>`
        : '';

      el.innerHTML = `<div class="adm-page">
        ${lowBanner}
        <div class="adm-page-hdr">
          <div><div class="adm-page-title">${t('prod.title')}</div>
               <div class="adm-page-sub">${fmt(prods.length)} ${ar?'منتج':'products'}</div></div>
          <div class="adm-page-acts">
            <button class="adm-btn adm-btn--primary" id="prodAddBtn">${ICO.plus} ${t('prod.add')}</button>
          </div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-toolbar">
            <div class="adm-search-wrap">
              <span class="adm-search-icon">${ICO.search}</span>
              <input class="adm-search" id="prodSearch" placeholder="${t('common.search')}">
            </div>
            <select class="adm-input" id="prodCatFilter" style="width:auto;padding:.38rem .7rem;font-size:.76rem">${catOpts}</select>
            <button class="adm-btn adm-btn--ghost adm-btn--sm" id="prodLowStockBtn"
                    style="font-size:.74rem;gap:.3rem">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              ${ar ? 'مخزون منخفض' : 'Low Stock'}
            </button>
            <div class="adm-spacer"></div>
            <span class="adm-badge adm-badge--neutral" id="prodCount">${fmt(prods.length)}</span>
          </div>
          <div id="prodTableWrap"></div>
        </div>
      </div>`;

      el.querySelector('#prodAddBtn').onclick    = () => this._openForm();
      el.querySelector('#prodSearch').oninput    = e  => { this._filter = e.target.value; this._renderTable(); };
      el.querySelector('#prodCatFilter').onchange= e  => { this._cat = e.target.value; this._renderTable(); };
      el.querySelector('#prodLowStockBtn').onclick = () => {
        this._lowStockOnly = !this._lowStockOnly;
        el.querySelector('#prodLowStockBtn').classList.toggle('adm-btn--accent', this._lowStockOnly);
        this._renderTable();
      };
      el.querySelector('#prodLowBanner')?.addEventListener('click', () => {
        this._lowStockOnly = true;
        el.querySelector('#prodLowStockBtn').classList.add('adm-btn--accent');
        this._renderTable();
      });

      /* Store handler reference so it can be removed on next render (prevents accumulation) */
      this._clickHandler = e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action, id } = btn.dataset;
        if (action === 'edit')     this._openForm(id);
        if (action === 'delete')   this._delete(id);
        if (action === 'stocklog') this._stockLogModal(id);
      };
      el.addEventListener('click', this._clickHandler);

      this._renderTable();
    } catch(e) {
      console.error('[Products]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },

  _renderTable() {
    const ar = Admin.lang === 'ar';
    const q  = (this._filter || '').toLowerCase();
    const filtered = (this._prods || []).filter(p => {
      const name = (ar ? p.title?.ar : p.title?.en) || '';
      const cat  = p.category?.en || '';
      const matchQ        = !q || name.toLowerCase().includes(q) || cat.toLowerCase().includes(q);
      const matchCat      = !this._cat || cat === this._cat;
      const matchLowStock = !this._lowStockOnly || Number(p.stock) < 10;
      return matchQ && matchCat && matchLowStock;
    });

    const wrap = document.getElementById('prodTableWrap');
    const count = document.getElementById('prodCount');
    if (count) count.textContent = fmt(filtered.length);

    if (!wrap) return;
    if (!filtered.length) {
      wrap.innerHTML = `<div class="adm-empty"><div class="adm-empty__ico">📦</div><div class="adm-empty__txt">${t('common.noData')}</div></div>`;
      return;
    }

    wrap.innerHTML = `<div class="adm-table-scroll"><table>
      <thead><tr>
        <th>${ar?'الصورة':'Image'}</th>
        <th>${ar?'الاسم':'Name'}</th>
        <th>${t('prod.category')}</th>
        <th>${ar?'السعر':'Price'}</th>
        <th>${ar?'المخزون':'Stock'}</th>
        <th>${t('common.status')}</th>
        <th>${t('common.actions')}</th>
      </tr></thead>
      <tbody>${filtered.map(p => {
        const img = DB.getImage(p.id) || p.imageUrl;
        const name = ar ? (p.title?.ar || p.title?.en) : (p.title?.en || p.title?.ar);
        const stock = Number(p.stock) || 0;
        return `<tr>
          <td>${img
            ? `<img class="adm-thumb" src="${esc(img)}" alt=""
                    onerror="this.onerror=null;this.style.display='none';this.insertAdjacentHTML('afterend','<div class=\\'adm-thumb\\'style=\\'background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:1.2rem\\'>📦</div>')">`
            : `<div class="adm-thumb" style="background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:1.2rem">📦</div>`}</td>
          <td>
            <div style="font-weight:600;font-size:.82rem;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(name)}</div>
            ${p.badge ? `<span class="adm-badge adm-badge--accent" style="margin-top:3px">${esc(t('prod.badge.'+p.badge))}</span>` : ''}
          </td>
          <td style="color:var(--txt-m);font-size:.78rem">${esc(ar ? p.category?.ar : p.category?.en)}</td>
          <td>${(() => {
            if (p.isOnSale && p.originalPrice) {
              const pct = Math.round(((p.originalPrice - p.salePrice) / p.originalPrice) * 100);
              return `<span style="text-decoration:line-through;color:var(--txt-m);font-size:.75rem;display:block">${fmtSar(p.originalPrice)}</span>
                      <strong style="color:var(--acc)">${fmtSar(p.salePrice)}</strong>
                      <span style="background:var(--error);color:white;border-radius:4px;padding:1px 5px;font-size:.68rem;font-weight:700;margin-${ar?'right':'left'}:.25rem">${ar?`خصم ${pct}%`:`${pct}% off`}</span>`;
            }
            return `<strong>${fmtSar(p.salePrice ?? p.price)}</strong>`;
          })()}</td>
          <td>${(() => {
            if (stock === 0) return `<span style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,.12);color:var(--error);border-radius:4px;padding:1px 6px;font-size:.78rem;font-weight:700">${stock} ${ar?'نفد':'Out'}</span>`;
            if (stock < 10) return `<span style="display:inline-flex;align-items:center;gap:3px;background:rgba(245,158,11,.12);color:var(--warning,#F59E0B);border-radius:4px;padding:1px 6px;font-size:.78rem;font-weight:700">⚠ ${stock}</span>`;
            return `<span style="color:var(--success);font-weight:700;font-size:.82rem">${stock}</span>`;
          })()}</td>
          <td>${badge(p.status, 'prod.status')}</td>
          <td>
            <div style="display:flex;gap:.3rem">
              <button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="edit" data-id="${p.id}" title="${t('common.edit')}">${ICO.edit}</button>
              <button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="stocklog" data-id="${p.id}" title="${ar?'سجل المخزون':'Stock Log'}" style="font-size:.9rem">📋</button>
              <button class="adm-btn adm-btn--danger adm-btn--icon" data-action="delete" data-id="${p.id}" title="${t('common.delete')}">${ICO.trash}</button>
            </div>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>`;
  },

  _openForm(id) {
    const ar = Admin.lang === 'ar';
    /* Always read fresh from DB when editing — never trust in-memory cache for form population */
    const p  = id ? DB.getProducts().find(x => x.id === id) : null;
    if (id && !p) {
      console.error('🔴 _openForm: product not found in DB for id:', id);
      toast(ar ? 'تعذّر العثور على المنتج' : 'Product not found in database', 'error');
      return;
    }
    console.log('📂 Opening form for product:', id ? { id: p.id, titleEn: p.title?.en, salePrice: p.salePrice } : '(new)');
    const img = id ? (DB.getImage(id) || p?.imageUrl || '') : '';
    const cats = DB.getCategories();
    const catOpts = cats.map(c =>
      `<option value="${esc(c.nameEn)}" data-ar="${esc(c.nameAr)}"${(p?.category?.en===c.nameEn)?'selected':''}>${esc(ar?c.nameAr:c.nameEn)}</option>`
    ).join('');

    openModal(`
      <div class="adm-form-grid">
        <div class="adm-form-group">
          <label class="adm-label">${t('prod.nameAr')} <span>*</span></label>
          <input class="adm-input" id="pTitleAr" value="${esc(p?.title?.ar||'')}">
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('prod.nameEn')} <span>*</span></label>
          <input class="adm-input" id="pTitleEn" value="${esc(p?.title?.en||'')}">
        </div>
        <div class="adm-form-group adm-form-full">
          <label class="adm-label">${t('prod.descAr')}</label>
          <textarea class="adm-textarea" id="pDescAr">${esc(p?.desc?.ar||'')}</textarea>
        </div>
        <div class="adm-form-group adm-form-full">
          <label class="adm-label">${t('prod.descEn')}</label>
          <textarea class="adm-textarea" id="pDescEn">${esc(p?.desc?.en||'')}</textarea>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('prod.category')}</label>
          <select class="adm-select" id="pCat">${catOpts}</select>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('prod.material')}</label>
          <input class="adm-input" id="pMaterial" value="${esc(p?.material||'')}">
        </div>
        <!-- ── Pricing block ── -->
        <div class="adm-form-group adm-form-full" id="pPricingBlock">

          <!-- 1. Discount toggle — always at top -->
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem">
            <label class="adm-label" style="margin:0;cursor:pointer" for="pIsOnSale">${ar?'تفعيل الخصم':'Enable Discount'}</label>
            <label style="position:relative;display:inline-flex;align-items:center;cursor:pointer;user-select:none">
              <input type="checkbox" id="pIsOnSale" style="width:0;height:0;opacity:0;position:absolute"
                     ${p?.isOnSale?'checked':''}>
              <span id="pToggleTrack" style="display:inline-block;width:40px;height:22px;border-radius:11px;background:${p?.isOnSale?'var(--acc)':'var(--border-s)'};transition:background .2s;flex-shrink:0"></span>
              <span id="pToggleThumb" style="position:absolute;${ar?'right':'left'}:${p?.isOnSale?'19px':'1px'};top:1px;width:20px;height:20px;border-radius:50%;background:white;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:${ar?'right':'left'} .2s"></span>
            </label>
          </div>

          <!-- 2. Price fields — single column (OFF) or two-column grid (ON) -->
          <div id="pPriceFieldsWrap" style="display:grid;grid-template-columns:${p?.isOnSale?'1fr 1fr':'1fr'};gap:.75rem">

            <!-- Original price — only visible when discount is ON -->
            <div id="pOrigPriceCol" style="display:${p?.isOnSale?'block':'none'}">
              <label class="adm-label">${ar?'السعر الأصلي':'Original Price'} <span style="color:var(--error)">*</span></label>
              <input class="adm-input" id="pOriginalPrice" type="number" min="0" step="0.01"
                     placeholder="0.00" value="${p?.originalPrice||''}">
            </div>

            <!-- Sale / regular price (always shown) -->
            <div id="pSalePriceCol">
              <label class="adm-label" id="pSalePriceLabel">${ar ? (p?.isOnSale?'سعر البيع':'السعر') : (p?.isOnSale?'Sale Price':'Price')} <span style="color:var(--error)">*</span></label>
              <input class="adm-input" id="pSalePrice" type="number" min="0" step="0.01"
                     placeholder="0.00" value="${p?.salePrice ?? p?.price ?? ''}">
            </div>
          </div>

          <!-- 3. Validation error -->
          <div class="adm-form-err" id="pOrigPriceErr" style="display:none;color:var(--error);font-size:.74rem;margin-top:.4rem">
            ${ar?'يجب أن يكون السعر الأصلي أكبر من سعر البيع':'Original price must be greater than sale price'}
          </div>

          <!-- 4. Live preview — shown when both prices are valid -->
          <div id="pPricePreview" style="display:${(p?.isOnSale&&p?.originalPrice&&p?.salePrice&&p.originalPrice>p.salePrice)?'block':'none'};margin-top:.75rem;padding:.5rem .75rem;border-radius:8px;background:rgba(14,165,233,.07);border:1px solid rgba(14,165,233,.2);font-size:.82rem;line-height:1.6">
            ${(p?.isOnSale&&p?.originalPrice&&p?.salePrice&&p.originalPrice>p.salePrice) ? (ar
              ? `سيظهر للعميل: <s style="color:#9CA3AF">${p.originalPrice} ر.س</s> &rarr; <strong style="color:#0EA5E9">${p.salePrice} ر.س</strong> <span style="color:#FF3B30;font-weight:700">(خصم ${Math.round(((p.originalPrice-p.salePrice)/p.originalPrice)*100)}%)</span>`
              : `Customer sees: <s style="color:#9CA3AF">${p.originalPrice} SAR</s> &rarr; <strong style="color:#0EA5E9">${p.salePrice} SAR</strong> <span style="color:#FF3B30;font-weight:700">(${Math.round(((p.originalPrice-p.salePrice)/p.originalPrice)*100)}% off)</span>`)
              : ''}
          </div>
        </div>
        <div class="adm-form-group">
          <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
            <span>${t('prod.stock')}</span>
            ${id ? `<button type="button" class="adm-btn adm-btn--ghost adm-btn--sm" id="pStockAdjBtn"
                            style="font-size:.72rem;padding:.2rem .5rem">
                      ${ar?'تعديل المخزون':'Adjust Stock'}
                    </button>` : ''}
          </label>
          <input class="adm-input" id="pStock" type="number" min="0" value="${p?.stock??''}">
          <!-- Inline manual-adjustment sub-form (hidden by default) -->
          <div id="pStockAdjForm" style="display:none;margin-top:.6rem;padding:.7rem;background:var(--s2);border:1px solid var(--border-s);border-radius:var(--r-md)">
            <div style="font-size:.72rem;font-weight:700;color:var(--txt-m);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.05em">
              ${ar?'تعديل يدوي للمخزون':'Manual Stock Adjustment'}
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.5rem">
              <div>
                <label class="adm-label" style="font-size:.72rem">${ar?'الكمية الجديدة':'New Quantity'}</label>
                <input class="adm-input" id="pStockNewQty" type="number" min="0" placeholder="${p?.stock??0}"
                       style="font-size:.82rem">
              </div>
              <div>
                <label class="adm-label" style="font-size:.72rem">${ar?'السبب':'Reason'}</label>
                <select class="adm-select" id="pStockReason" style="font-size:.82rem">
                  <option value="manual_adjustment">${ar?'تعديل يدوي':'Manual Adjustment'}</option>
                  <option value="restock">${ar?'استلام بضاعة جديدة':'New Stock Received'}</option>
                  <option value="damaged">${ar?'تالف / مفقود':'Damaged / Lost'}</option>
                  <option value="correction">${ar?'تصحيح خطأ':'Error Correction'}</option>
                </select>
              </div>
            </div>
            <div style="display:flex;gap:.4rem">
              <button type="button" class="adm-btn adm-btn--primary adm-btn--sm" id="pStockAdjSave" style="font-size:.76rem">
                ${ar?'تطبيق التعديل':'Apply Adjustment'}
              </button>
              <button type="button" class="adm-btn adm-btn--ghost adm-btn--sm" id="pStockAdjCancel" style="font-size:.76rem">
                ${ar?'إلغاء':'Cancel'}
              </button>
            </div>
          </div>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('prod.badge')}</label>
          <select class="adm-select" id="pBadge">
            ${['none','new','popular','sale','trending','bestseller'].map(b =>
              `<option value="${b==='none'?'':b}"${(p?.badge||'')===(b==='none'?'':b)?'selected':''}>${t('prod.badge.'+b)}</option>`
            ).join('')}
          </select>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('common.status')}</label>
          <select class="adm-select" id="pStatus">
            ${['active','draft','out_of_stock'].map(s =>
              `<option value="${s}"${(p?.status||'active')===s?'selected':''}>${t('prod.status.'+s)}</option>`
            ).join('')}
          </select>
        </div>
        <div class="adm-form-group adm-form-full">
          <label class="adm-label">${t('prod.image')}</label>
          <div class="adm-img-drop" id="pImgDrop">
            ${img ? `<img class="adm-img-drop__thumb" id="pImgPreview" src="${esc(img)}">` : '<div id="pImgPreview"></div>'}
            <input type="file" id="pImgFile" accept="image/*">
            <div class="adm-img-drop__txt">${ar?'اسحب الصورة أو انقر للاختيار':'Drag or click to upload image'}</div>
          </div>
        </div>
      </div>`, { lg: true });

    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent =
      p ? t('prod.edit') : t('prod.add');

    /* image preview */
    document.getElementById('pImgFile').onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        let prev = document.getElementById('pImgPreview');
        if (!prev || prev.tagName !== 'IMG') {
          prev = document.createElement('img');
          prev.id = 'pImgPreview';
          prev.className = 'adm-img-drop__thumb';
          document.getElementById('pImgDrop').prepend(prev);
        }
        prev.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    };

    /* ── Manual stock adjustment wiring ── */
    if (id) {
      const adjBtn    = document.getElementById('pStockAdjBtn');
      const adjForm   = document.getElementById('pStockAdjForm');
      const adjCancel = document.getElementById('pStockAdjCancel');
      const adjSave   = document.getElementById('pStockAdjSave');

      adjBtn?.addEventListener('click', () => {
        const shown = adjForm.style.display !== 'none';
        adjForm.style.display = shown ? 'none' : 'block';
        if (!shown) document.getElementById('pStockNewQty')?.focus();
      });
      adjCancel?.addEventListener('click', () => { adjForm.style.display = 'none'; });

      adjSave?.addEventListener('click', () => {
        const newQtyEl  = document.getElementById('pStockNewQty');
        const reasonEl  = document.getElementById('pStockReason');
        const newQty    = parseInt(newQtyEl?.value ?? '', 10);
        if (isNaN(newQty) || newQty < 0) {
          toast(ar ? 'أدخل كمية صحيحة (0 أو أكثر)' : 'Enter a valid quantity (0 or more)', 'error');
          return;
        }
        const currentQty = Number(document.getElementById('pStock')?.value) || Number(p?.stock) || 0;
        const delta      = newQty - currentQty;
        const reason     = reasonEl?.value || 'manual_adjustment';

        DB.adjustStock(id, delta, 'manual_adjustment', null, reason);

        /* Sync the stock field so the save button uses the adjusted value */
        const stockInput = document.getElementById('pStock');
        if (stockInput) stockInput.value = newQty;

        adjForm.style.display = 'none';
        if (newQtyEl) newQtyEl.value = '';
        toast(ar ? `تم تعديل المخزون إلى ${newQty} ✓` : `Stock updated to ${newQty} ✓`, 'success');
      });
    }

    /* ── Discount toggle wiring ── */
    const _calcDiscountPct = () => {
      const preview    = document.getElementById('pPricePreview');
      const origPriceErr = document.getElementById('pOrigPriceErr');
      const isOn = document.getElementById('pIsOnSale')?.checked;
      const orig = parseFloat(document.getElementById('pOriginalPrice')?.value) || 0;
      const sale = parseFloat(document.getElementById('pSalePrice')?.value)     || 0;
      if (!preview) return;
      if (isOn && orig > 0 && sale > 0 && orig > sale) {
        const pct = Math.round(((orig - sale) / orig) * 100);
        preview.style.display = 'block';
        preview.innerHTML = ar
          ? `سيظهر للعميل: <s style="color:#9CA3AF">${orig} ر.س</s> &rarr; <strong style="color:#0EA5E9">${sale} ر.س</strong> <span style="color:#FF3B30;font-weight:700">(خصم ${pct}%)</span>`
          : `Customer sees: <s style="color:#9CA3AF">${orig} SAR</s> &rarr; <strong style="color:#0EA5E9">${sale} SAR</strong> <span style="color:#FF3B30;font-weight:700">(${pct}% off)</span>`;
        if (origPriceErr) origPriceErr.style.display = 'none';
      } else {
        preview.style.display = 'none';
      }
    };
    const _updateDiscountUI = () => {
      const isOn       = document.getElementById('pIsOnSale')?.checked;
      const track      = document.getElementById('pToggleTrack');
      const thumb      = document.getElementById('pToggleThumb');
      const wrap       = document.getElementById('pPriceFieldsWrap');
      const origCol    = document.getElementById('pOrigPriceCol');
      const saleLabel  = document.getElementById('pSalePriceLabel');
      const preview    = document.getElementById('pPricePreview');
      if (track)     track.style.background = isOn ? 'var(--acc)' : 'var(--border-s)';
      if (thumb)     thumb.style[ar ? 'right' : 'left'] = isOn ? '19px' : '1px';
      if (wrap)      wrap.style.gridTemplateColumns = isOn ? '1fr 1fr' : '1fr';
      if (origCol)   origCol.style.display = isOn ? 'block' : 'none';
      if (saleLabel) saleLabel.innerHTML = isOn
        ? `${ar ? 'سعر البيع' : 'Sale Price'} <span style="color:var(--error)">*</span>`
        : `${ar ? 'السعر' : 'Price'} <span style="color:var(--error)">*</span>`;
      if (!isOn && preview) preview.style.display = 'none';
      _calcDiscountPct();
    };

    /* ── Toggle wiring ─────────────────────────────────────────────────────
       Root cause of the isOnSale save bug:
       pToggleTrack and pToggleThumb are DOM children of the <label> that
       wraps #pIsOnSale.  Old code manually set `isOnSaleCb.checked =
       !isOnSaleCb.checked` inside click listeners on those spans, but the
       click then bubbled up to the <label>, which fired a synthetic click on
       the checkbox and toggled it BACK to its original value.  Net effect:
       .checked was always the pre-click value when save read it.

       Fix: remove all manual toggles from the span handlers.  The <label>
       already toggles the checkbox whenever any of its descendants are clicked.
       We just react to the resulting `change` event on the checkbox itself.
    ── */
    const isOnSaleCb = document.getElementById('pIsOnSale');
    if (isOnSaleCb) {
      isOnSaleCb.addEventListener('change', _updateDiscountUI);
    }

    /* Live discount % recalc on price input */
    ['pSalePrice', 'pOriginalPrice'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', _calcDiscountPct);
    });
    /* Run once on open to set initial state */
    _updateDiscountUI();

    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML = `
      <button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
      <button class="adm-btn adm-btn--primary" id="pSaveBtn">${t('common.save')}</button>`;

    document.getElementById('pSaveBtn').onclick = async () => {
      const btn = document.getElementById('pSaveBtn');
      if (!btn || btn.disabled) return;           // prevent double-fire

      console.log('🔴 SAVE CALLED [product]', { id, timestamp: new Date() });

      /* ── Collect form values ── */
      const catEl     = document.getElementById('pCat');
      const catSelOpt = catEl?.options[catEl.selectedIndex];
      const data = {
        id:         id,                            // undefined = new product
        titleAr:    document.getElementById('pTitleAr')?.value.trim()   || '',
        titleEn:    document.getElementById('pTitleEn')?.value.trim()   || '',
        descAr:     document.getElementById('pDescAr')?.value.trim()    || '',
        descEn:     document.getElementById('pDescEn')?.value.trim()    || '',
        categoryEn: catEl?.value                  || '',
        categoryAr: catSelOpt?.dataset.ar          || catEl?.value || '',
        material:      document.getElementById('pMaterial')?.value.trim()     || '',
        salePrice:     document.getElementById('pSalePrice')?.value          || '',
        originalPrice: document.getElementById('pOriginalPrice')?.value      || '',
        isOnSale:      document.getElementById('pIsOnSale')?.checked ?? false,
        /* legacy price kept = salePrice so old code paths still work */
        price:         document.getElementById('pSalePrice')?.value          || '',
        stock:         document.getElementById('pStock')?.value              || '0',
        badge:      document.getElementById('pBadge')?.value            || '',
        status:     document.getElementById('pStatus')?.value           || 'active',
        /* preserve existing external URL if no new file is chosen */
        imageUrl:   p?.imageUrl || null,
        /* preserve existing metadata so they aren't wiped on edit */
        colors:     p?.colors,
        rating:     p?.rating,
        reviews:    p?.reviews,
      };

      console.log('2. Product data being saved:', data);

      /* ── Validation ── */
      if (!data.titleAr && !data.titleEn) {
        toast(ar ? 'أدخل اسم المنتج' : 'Enter product name', 'error'); return;
      }
      const saleVal = Number(data.salePrice);
      if (!data.salePrice || isNaN(saleVal) || saleVal <= 0) {
        toast(ar ? 'أدخل سعر بيع صحيح' : 'Enter a valid sale price', 'error'); return;
      }
      if (data.isOnSale) {
        const origVal = Number(data.originalPrice);
        const errEl   = document.getElementById('pOrigPriceErr');
        if (!data.originalPrice || isNaN(origVal) || origVal <= saleVal) {
          if (errEl) errEl.style.display = 'block';
          toast(ar ? 'يجب أن يكون السعر الأصلي أكبر من سعر البيع' : 'Original price must be greater than sale price', 'error');
          return;
        }
        if (errEl) errEl.style.display = 'none';
      }

      /* ── Disable button + show loading state ── */
      btn.disabled    = true;
      btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';

      try {
        /* ── Step 1: Compress image (canvas resize → JPEG ≤ 150 KB) ── */
        const fileInput  = document.getElementById('pImgFile');
        let   imageBase64 = null;

        if (fileInput?.files[0]) {
          imageBase64 = await _compressImage(fileInput.files[0]);
          const kb = Math.round(imageBase64.length * 0.75 / 1024);
          console.log('3. Image upload result: compressed to', kb, 'KB');
        } else {
          console.log('3. Image upload result: no new file selected');
        }

        /* ── Step 2: Save product text data (throws if localStorage full) ── */
        console.log('📝 Writing to DB:', { id: data.id || '(new)', titleEn: data.titleEn, titleAr: data.titleAr, salePrice: data.salePrice, isOnSale: data.isOnSale });
        const newId = DB.saveProduct(data);
        console.log('💾 DB.saveProduct returned id:', newId);

        /* ── Step 2b: Read-back verification — confirm the write actually landed ── */
        const savedProduct = DB.getProducts().find(p => p.id === newId);
        if (!savedProduct) {
          throw new Error(
            ar ? 'فشل التحقق من الحفظ: المنتج غير موجود في قاعدة البيانات بعد الحفظ!'
               : 'Save verification failed: product not found in DB after write!'
          );
        }
        console.log('🟢 DB WRITE RESULT [product]', {
          id:        savedProduct.id,
          titleEn:   savedProduct.title?.en,
          titleAr:   savedProduct.title?.ar,
          salePrice: savedProduct.salePrice,
          isOnSale:  savedProduct.isOnSale,
          stock:     savedProduct.stock,
          status:    savedProduct.status,
        });

        /* ── Step 3: Save compressed image — block + rollback if it still fails ── */
        if (imageBase64) {
          /* Free any orphaned image keys before writing, to maximise available space */
          DB.cleanupOrphanedImages();
          const imgOk = DB.saveImage(newId, imageBase64);
          console.log('🖼️ Image saved to b3d_admin_img_' + newId + ':', imgOk);
          if (!imgOk) {
            /* Storage still full even after compression — rollback the product
               record so we never leave a product without its image. */
            DB.deleteProduct(newId);
            throw new Error(
              ar ? 'فشل رفع الصورة — المساحة ممتلئة. احذف صوراً قديمة ثم أعد المحاولة.'
                 : 'Image upload failed — storage full. Delete old images then retry.'
            );
          }
        }

        /* ── Step 4: Refresh list FIRST, then close modal so UI is always fresh ── */
        await this.render(document.getElementById('admContent'));
        closeModal();
        toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');

      } catch (err) {
        console.error('🔴 DB WRITE ERROR [product]', err);
        toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
        /* Re-enable save button so user can try again (modal stays open) */
        const b = document.getElementById('pSaveBtn');
        if (b) { b.disabled = false; b.textContent = t('common.save'); }
      }
    };
  },

  _delete(id) {
    const ar = Admin.lang === 'ar';
    confirmDialog(t('common.confirmDelete'), () => {
      console.log('🔴 SAVE CALLED [product-delete]', { id, timestamp: new Date() });
      try {
        DB.deleteProduct(id);
        const stillExists = DB.getProducts().find(p => p.id === id);
        console.log('🟢 DB WRITE RESULT [product-delete]', stillExists ? 'NOT DELETED!' : 'Deleted OK');
        toast(t('common.deleted'));
        this.render(document.getElementById('admContent'));
      } catch (err) {
        console.error('🔴 DB WRITE ERROR [product-delete]', err);
        toast((ar ? 'فشل الحذف: ' : 'Delete failed: ') + err.message, 'error');
      }
    });
  },
};

/* ─────────────────────────────────────────────────────────────
   CATEGORIES
───────────────────────────────────────────────────────────── */
Sections.categories = {
  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const cats = DB.getCategories();
      const prods = DB.getProducts();
      const ar = Admin.lang === 'ar';

      const countMap = {};
      prods.forEach(p => { const en = p.category?.en||''; if(en) countMap[en] = (countMap[en]||0)+1; });

      const rows = cats.length ? cats.map(c => `<tr>
        <td style="font-size:1.5rem;text-align:center">${esc(c.icon||'📦')}</td>
        <td><strong>${esc(ar?c.nameAr:c.nameEn)}</strong></td>
        <td style="color:var(--txt-m)">${esc(ar?c.nameEn:c.nameAr)}</td>
        <td><span class="adm-badge adm-badge--neutral">${countMap[c.nameEn]||0}</span></td>
        <td>
          <div style="display:flex;gap:.3rem">
            <button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="edit" data-id="${esc(c.id)}" title="${t('common.edit')}">${ICO.edit}</button>
            <button class="adm-btn adm-btn--danger adm-btn--icon" data-action="delete" data-id="${esc(c.id)}" title="${t('common.delete')}">${ICO.trash}</button>
          </div>
        </td>
      </tr>`).join('') : `<tr><td colspan="5"><div class="adm-empty"><div class="adm-empty__ico">🗂️</div><div class="adm-empty__txt">${t('common.noData')}</div></div></td></tr>`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr">
          <div><div class="adm-page-title">${t('cat.title')}</div>
               <div class="adm-page-sub">${fmt(cats.length)} ${ar?'تصنيف':'categories'}</div></div>
          <div class="adm-page-acts">
            <button class="adm-btn adm-btn--primary" id="catAddBtn">${ICO.plus} ${t('cat.add')}</button>
          </div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-table-scroll"><table>
            <thead><tr><th>${ar?'أيقونة':'Icon'}</th><th>${ar?'الاسم':'Name'}</th><th>${ar?'بالإنجليزية':'In English'}</th><th>${t('cat.products')}</th><th>${t('common.actions')}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </div>
      </div>`;

      el.querySelector('#catAddBtn').onclick = () => this._openForm();
      el.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action, id } = btn.dataset;
        if (action === 'edit')   this._openForm(cats.find(c => c.id === id));
        if (action === 'delete') this._delete(id);
      });
    } catch(e) {
      console.error('[Categories]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },

  _openForm(cat) {
    const ar = Admin.lang === 'ar';
    openModal(`
      <div class="adm-form-grid">
        <div class="adm-form-group">
          <label class="adm-label">${t('cat.nameAr')} <span>*</span></label>
          <input class="adm-input" id="cNameAr" value="${esc(cat?.nameAr||'')}">
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('cat.nameEn')} <span>*</span></label>
          <input class="adm-input" id="cNameEn" value="${esc(cat?.nameEn||'')}">
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('cat.icon')}</label>
          <input class="adm-input" id="cIcon" value="${esc(cat?.icon||'📦')}" maxlength="4">
        </div>
      </div>`, { sm: true });

    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent =
      cat ? t('cat.edit') : t('cat.add');
    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML = `
      <button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
      <button class="adm-btn adm-btn--primary" id="cSaveBtn">${t('common.save')}</button>`;

    document.getElementById('cSaveBtn').onclick = () => {
      const btn    = document.getElementById('cSaveBtn');
      const nameAr = document.getElementById('cNameAr').value.trim();
      const nameEn = document.getElementById('cNameEn').value.trim();
      if (!nameAr && !nameEn) { toast(ar?'أدخل اسم التصنيف':'Enter category name','error'); return; }
      const payload = { id: cat?.id, nameAr, nameEn, icon: document.getElementById('cIcon').value.trim()||'📦' };
      console.log('🔴 SAVE CALLED [category]', { payload, timestamp: new Date() });
      btn.disabled = true; btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';
      try {
        DB.saveCategory(payload);
        /* Verify: read back and confirm the id exists */
        const saved = DB.getCategories().find(c => c.nameEn === nameEn || c.nameAr === nameAr);
        console.log('🟢 DB WRITE RESULT [category]', saved);
        closeModal();
        toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');
        this.render(document.getElementById('admContent'));
      } catch (err) {
        console.error('🔴 DB WRITE ERROR [category]', err);
        btn.disabled = false; btn.textContent = t('common.save');
        toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
      }
    };
  },

  _delete(id) {
    confirmDialog(t('common.confirmDelete'), () => {
      DB.deleteCategory(id);
      toast(t('common.deleted'));
      this.render(document.getElementById('admContent'));
    });
  },
};

/* ─────────────────────────────────────────────────────────────
   ORDERS
───────────────────────────────────────────────────────────── */
Sections.orders = {
  _status: '',
  _filter: '',

  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const raw    = DB.getOrders();
      const orders = Array.isArray(raw) ? raw : [];
      const ar     = Admin.lang === 'ar';
      this._orders = orders;

      const STATUSES = ['pending','processing','shipped','delivered','cancelled'];
      const filterBtns = [{ val:'', lbl: t('common.all') }, ...STATUSES.map(s => ({ val:s, lbl: t('ord.status.'+s) }))];

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr">
          <div><div class="adm-page-title">${t('ord.title')}</div>
               <div class="adm-page-sub">${fmt(orders.length)} ${ar?'طلب':'orders'}</div></div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-toolbar">
            <div class="adm-filters" id="ordFilters">
              ${filterBtns.map(f => `<button class="adm-filter${this._status===f.val?' active':''}" data-status="${esc(f.val)}">${esc(f.lbl)}</button>`).join('')}
            </div>
            <div class="adm-spacer"></div>
            <div class="adm-search-wrap">
              <span class="adm-search-icon">${ICO.search}</span>
              <input class="adm-search" id="ordSearch" placeholder="${t('common.search')}" value="${esc(this._filter)}">
            </div>
          </div>
          <div id="ordTableWrap"></div>
        </div>
      </div>`;

      el.querySelector('#ordFilters').addEventListener('click', e => {
        const btn = e.target.closest('[data-status]');
        if (!btn) return;
        this._status = btn.dataset.status;
        el.querySelectorAll('#ordFilters .adm-filter').forEach(b => b.classList.toggle('active', b.dataset.status === this._status));
        this._renderTable();
      });
      el.querySelector('#ordSearch').oninput = e => { this._filter = e.target.value; this._renderTable(); };
      el.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action, id } = btn.dataset;
        if (action === 'detail') this._detail(id);
        if (action === 'status') this._statusModal(id);
      });

      this._renderTable();
    } catch(e) {
      console.error('[Orders]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },

  _renderTable() {
    const ar = Admin.lang === 'ar';
    const q  = (this._filter || '').toLowerCase();
    const filtered = (this._orders || []).filter(o => {
      const cust = (ar ? o.customer?.ar : o.customer?.en) || '';
      const matchStatus = !this._status || o.status === this._status;
      const matchQ = !q || o.id.toLowerCase().includes(q) || cust.toLowerCase().includes(q);
      return matchStatus && matchQ;
    });

    const wrap = document.getElementById('ordTableWrap');
    if (!wrap) return;

    if (!filtered.length) {
      wrap.innerHTML = `<div class="adm-empty"><div class="adm-empty__ico">📋</div><div class="adm-empty__txt">${t('common.noData')}</div></div>`;
      return;
    }

    wrap.innerHTML = `<div class="adm-table-scroll"><table>
      <thead><tr>
        <th>${t('ord.id')}</th><th>${t('ord.customer')}</th>
        <th>${t('common.phone')}</th>
        <th>${t('common.city')}</th>
        <th>${t('ord.product')}</th><th>${t('common.amount')}</th>
        <th>${t('common.status')}</th><th>${t('common.date')}</th>
        <th>${t('common.actions')}</th>
      </tr></thead>
      <tbody>${filtered.map(o => {
        const name = ar ? (o.customer?.ar||o.customer?.en) : (o.customer?.en||o.customer?.ar);
        const city = ar ? (o.city?.ar||o.city?.en) : (o.city?.en||o.city?.ar);
        return `<tr>
          <td><span class="adm-code">${esc(o.id)}</span></td>
          <td>
            <div style="display:flex;align-items:center;gap:.5rem">
              <div class="adm-avatar">${(name||'?').charAt(0).toUpperCase()}</div>
              <div>
                <div style="font-weight:600;font-size:.82rem">${esc(name)}</div>
                <div style="font-size:.68rem;color:var(--txt-m)">${esc(o.email)}</div>
              </div>
            </div>
          </td>
          <td style="font-size:.78rem;direction:ltr;text-align:start">${esc(o.phone||'—')}</td>
          <td style="font-size:.78rem">${esc(city||'—')}</td>
          <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--txt-m);font-size:.78rem">${esc(o.product||'—')}</td>
          <td><strong>${fmtSar(o.amount)}</strong></td>
          <td>${badge(o.status,'ord.status')}</td>
          <td style="font-size:.78rem">${esc(o.date)}</td>
          <td>
            <div style="display:flex;gap:.3rem">
              <button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="detail" data-id="${esc(o.id)}" title="${t('ord.detail')}">${ICO.eye}</button>
              <button class="adm-btn adm-btn--accent adm-btn--sm" data-action="status" data-id="${esc(o.id)}">${t('ord.updateStatus')}</button>
            </div>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>`;
  },

  _detail(id) {
    const o  = (this._orders || []).find(x => x.id === id);
    if (!o) return;
    const ar   = Admin.lang === 'ar';
    const name = ar ? (o.customer?.ar||o.customer?.en) : (o.customer?.en||o.customer?.ar);
    const city = ar ? (o.city?.ar||o.city?.en) : (o.city?.en||o.city?.ar);
    const da   = o.deliveryAddress || {};

    /* ── Delivery address block ── */
    /* ── Map coordinates (if customer pinned their location) ── */
    const coords = da.coordinates;
    const mapLat  = coords?.latitude;
    const mapLng  = coords?.longitude;
    const googleMapsUrl = mapLat
      ? `https://www.google.com/maps?q=${mapLat},${mapLng}`
      : null;
    const osmUrl = da.mapLink
      || (mapLat ? `https://www.openstreetmap.org/?mlat=${mapLat}&mlon=${mapLng}` : null);

    /* Static map tile preview (80×60) using OSM tiles — no key needed */
    const staticMapHtml = mapLat ? (() => {
      /* Tile x/y at zoom 15 for the pinned location */
      const z  = 15;
      const tx = Math.floor((mapLng + 180) / 360 * Math.pow(2, z));
      const ty = Math.floor((1 - Math.log(Math.tan(mapLat * Math.PI / 180) + 1 / Math.cos(mapLat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z));
      return `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer"
                 style="display:block;width:100%;border-radius:var(--r-sm);overflow:hidden;margin-top:.6rem;text-decoration:none">
                <img src="https://tile.openstreetmap.org/${z}/${tx}/${ty}.png"
                     alt="map preview"
                     style="width:100%;height:80px;object-fit:cover;display:block"
                     loading="lazy"
                     onerror="this.closest('a').style.display='none'"/>
              </a>`;
    })() : '';

    const coordsRow = mapLat
      ? `<div class="adm-detail-item" style="grid-column:1/-1">
           <label>${ar ? 'موقع التوصيل' : 'Pinned Location'}</label>
           <span style="display:flex;flex-direction:column;gap:.4rem">
             <span style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap">
               <span dir="ltr" style="font-size:.78rem;color:var(--txt-m);font-family:monospace">
                 ${mapLat.toFixed(6)}, ${mapLng.toFixed(6)}
               </span>
               <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer"
                  style="display:inline-flex;align-items:center;gap:.3rem;font-size:.78rem;color:var(--acc);text-decoration:none;font-weight:700;padding:.15rem .5rem;background:rgba(var(--acc-rgb,99,102,241),.08);border-radius:var(--r-sm)">
                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                 ${ar ? 'فتح في الخريطة' : 'Open in Maps'}
               </a>
               ${osmUrl ? `<a href="${osmUrl}" target="_blank" rel="noopener noreferrer"
                  style="font-size:.72rem;color:var(--txt-m);text-decoration:none;opacity:.7">OSM ↗</a>` : ''}
             </span>
             ${staticMapHtml}
           </span>
         </div>`
      : '';

    const addrFields = [
      da.street     ? `<div class="adm-detail-item"><label>${t('ord.street')}</label><span>${esc(da.street)}</span></div>` : '',
      da.district   ? `<div class="adm-detail-item"><label>${t('ord.district')}</label><span>${esc(da.district)}</span></div>` : '',
      da.city||city ? `<div class="adm-detail-item"><label>${t('common.city')}</label><span>${esc(da.city||city)}</span></div>` : '',
      da.buildingNumber ? `<div class="adm-detail-item"><label>${t('ord.buildingNum')}</label><span>${esc(da.buildingNumber)}</span></div>` : '',
      da.postalCode ? `<div class="adm-detail-item"><label>${t('ord.postalCode')}</label><span dir="ltr">${esc(da.postalCode)}</span></div>` : '',
      da.notes      ? `<div class="adm-detail-item" style="grid-column:1/-1"><label>${t('ord.deliveryNotes')}</label><span>${esc(da.notes)}</span></div>` : '',
      coordsRow,
    ].filter(Boolean).join('');

    const addrBlock = addrFields
      ? `<div class="adm-detail-item" style="grid-column:1/-1">
           <div style="padding:.75rem;background:var(--s2);border:1px solid var(--border-s);border-radius:var(--r-md)">
             <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--txt-m);margin-bottom:.6rem">${t('ord.deliveryAddr')}</div>
             <div class="adm-detail-grid" style="gap:.5rem .75rem">${addrFields}</div>
           </div>
         </div>`
      : (o.address ? `<div class="adm-detail-item" style="grid-column:1/-1"><label>${t('ord.address')}</label><span>${esc(o.address)}</span></div>` : '');

    /* ── Ordered items table ── */
    const itemsArr = Array.isArray(o.items) ? o.items : [];
    const itemsBlock = itemsArr.length
      ? `<div class="adm-detail-item" style="grid-column:1/-1">
           <div style="padding:.75rem;background:var(--s2);border:1px solid var(--border-s);border-radius:var(--r-md)">
             <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--txt-m);margin-bottom:.6rem">${t('ord.orderedItems')}</div>
             <div style="overflow-x:auto">
             <table style="width:100%;border-collapse:collapse;font-size:.8rem">
               <thead>
                 <tr style="border-bottom:1.5px solid var(--border-s);color:var(--txt-m)">
                   <th style="text-align:start;padding:.35rem .5rem;font-weight:600">${ar?'المنتج':'Product'}</th>
                   <th style="padding:.35rem .5rem;font-weight:600;text-align:center">${t('ord.qty')}</th>
                   <th style="padding:.35rem .5rem;font-weight:600;text-align:end">${t('ord.unitPrice')}</th>
                   <th style="padding:.35rem .5rem;font-weight:600;text-align:end">${t('ord.lineTotal')}</th>
                 </tr>
               </thead>
               <tbody>
                 ${itemsArr.map(item => {
                   const iname = ar ? (item.title?.ar||item.title?.en) : (item.title?.en||item.title?.ar);
                   const qty   = item.qty || item.quantity || 1;
                   const price = Number(item.price||item.salePrice||0);
                   return `<tr style="border-bottom:1px solid var(--border)">
                     <td style="padding:.4rem .5rem">${esc(iname||item.title||'—')}</td>
                     <td style="padding:.4rem .5rem;text-align:center">${qty}</td>
                     <td style="padding:.4rem .5rem;text-align:end;direction:ltr">${fmtSar(price)}</td>
                     <td style="padding:.4rem .5rem;text-align:end;font-weight:600;direction:ltr">${fmtSar(price*qty)}</td>
                   </tr>`;
                 }).join('')}
               </tbody>
             </table>
             </div>
           </div>
         </div>`
      : '';

    /* ── Pricing summary ── */
    const pricingBlock = `
      <div class="adm-detail-item" style="grid-column:1/-1">
        <div style="padding:.75rem;background:var(--s2);border:1px solid var(--border-s);border-radius:var(--r-md)">
          <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--txt-m);margin-bottom:.6rem">${ar?'ملخص التسعير':'Pricing'}</div>
          ${o.subtotal ? `<div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.3rem">
            <span style="color:var(--txt-m)">${t('ord.subtotal')}</span>
            <span>${fmtSar(o.subtotal)}</span>
          </div>` : ''}
          ${o.shippingCost !== undefined ? `<div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.3rem">
            <span style="color:var(--txt-m)">${t('ord.shippingCost')}</span>
            <span>${o.shippingCost === 0 ? (ar?'مجاني':'Free') : fmtSar(o.shippingCost)}</span>
          </div>` : ''}
          ${o.discountCode ? `<div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.3rem;color:#059669">
            <span>${t('disc.usedCode')}: <span class="adm-code" style="font-size:.78rem;color:#059669;text-transform:uppercase">${esc(o.discountCode)}</span></span>
            <span>- ${fmtSar(o.discountAmount||0)}</span>
          </div>` : ''}
          <div style="display:flex;justify-content:space-between;font-size:.9rem;font-weight:800;border-top:1.5px solid var(--border-s);padding-top:.4rem;margin-top:.3rem">
            <span>${t('ord.total')}</span>
            <span style="color:var(--acc)">${fmtSar(o.amount)}</span>
          </div>
        </div>
      </div>`;

    openModal(`
      <div class="adm-detail-grid">
        <div class="adm-detail-item"><label>${t('ord.id')}</label><span class="adm-code">${esc(o.id)}</span></div>
        <div class="adm-detail-item"><label>${t('common.date')}</label><span>${esc(o.date)}</span></div>
        <div class="adm-detail-item"><label>${t('common.status')}</label><span>${badge(o.status,'ord.status')}</span></div>
        <div class="adm-detail-item"><label>${ar?'حالة الدفع':'Payment Status'}</label><span>${badge(o.paymentStatus||'pending','pay.status')}</span></div>
        <div class="adm-detail-item"><label>${t('ord.customer')}</label><span>${esc(name)}</span></div>
        <div class="adm-detail-item"><label>${t('common.email')}</label><span>${esc(o.email||'—')}</span></div>
        <div class="adm-detail-item"><label>${t('common.phone')}</label><span dir="ltr">${esc(o.phone||da.phone||'—')}</span></div>
        <div class="adm-detail-item"><label>${t('pay.method')}</label><span>${esc(t('pay.method.'+(o.paymentMethod||'pending')))}</span></div>
        <div class="adm-detail-item"><label>${t('ord.tracking')}</label><span class="adm-code">${esc(o.tracking||t('ship.noTracking'))}</span></div>
        ${addrBlock}
        ${itemsBlock}
        ${pricingBlock}
      </div>`, { lg: true });
    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent = t('ord.detail') + ' — ' + o.id;
    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML =
      `<button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
       <button class="adm-btn adm-btn--accent" onclick="closeModal();Sections.orders._statusModal('${esc(id)}')">${t('ord.updateStatus')}</button>`;
  },

  _stockLogModal(productId) {
    const ar      = Admin.lang === 'ar';
    const product = DB.getProducts().find(p => p.id === productId);
    if (!product) return;
    const name    = ar ? (product.title?.ar || product.title?.en) : (product.title?.en || product.title?.ar);
    const log     = DB.getStockLog(productId);

    const typeLabel = type => {
      const map = {
        order_placed:      ar ? 'طلب جديد'     : 'Order Placed',
        order_cancelled:   ar ? 'إلغاء طلب'    : 'Order Cancelled',
        manual_adjustment: ar ? 'تعديل يدوي'   : 'Manual Adjustment',
        restock:           ar ? 'استلام بضاعة' : 'Restock',
        damaged:           ar ? 'تالف/مفقود'   : 'Damaged/Lost',
        correction:        ar ? 'تصحيح خطأ'    : 'Error Correction',
      };
      return map[type] || type;
    };

    const rows = log.length
      ? log.map(e => {
          const date  = e.timestamp ? new Date(e.timestamp).toLocaleString(ar ? 'ar-SA' : 'en-GB') : '—';
          const delta = e.delta >= 0 ? `<span style="color:var(--success);font-weight:700">+${e.delta}</span>`
                                     : `<span style="color:var(--error);font-weight:700">${e.delta}</span>`;
          return `<tr style="border-bottom:1px solid var(--border)">
            <td style="padding:.35rem .5rem;font-size:.78rem;color:var(--txt-m)">${date}</td>
            <td style="padding:.35rem .5rem;font-size:.8rem">${esc(typeLabel(e.changeType))}</td>
            <td style="padding:.35rem .5rem;text-align:center">${delta}</td>
            <td style="padding:.35rem .5rem;text-align:center;font-weight:600">${e.stockAfter ?? '—'}</td>
            <td style="padding:.35rem .5rem;font-size:.75rem;color:var(--txt-m)">${e.orderId ? `<span class="adm-code" style="font-size:.72rem">${esc(e.orderId)}</span>` : '—'}</td>
          </tr>`;
        }).join('')
      : `<tr><td colspan="5" style="text-align:center;padding:1.5rem;color:var(--txt-m);font-size:.82rem">
           ${ar ? 'لا توجد تغييرات مسجلة بعد' : 'No stock changes recorded yet'}
         </td></tr>`;

    openModal(`
      <div style="margin-bottom:.75rem">
        <div style="font-size:.72rem;color:var(--txt-m);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.2rem">
          ${ar ? 'سجل المخزون — ' : 'Stock History — '}
        </div>
        <div style="font-weight:700;font-size:.95rem">${esc(name)}</div>
        <div style="margin-top:.3rem;font-size:.82rem;color:var(--txt-m)">
          ${ar ? 'المخزون الحالي:' : 'Current stock:'}
          <strong style="color:${Number(product.stock)===0?'var(--error)':Number(product.stock)<10?'var(--warning)':'var(--success)'}">${product.stock ?? 0}</strong>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:.8rem">
          <thead>
            <tr style="border-bottom:1.5px solid var(--border-s);color:var(--txt-m)">
              <th style="padding:.35rem .5rem;text-align:start;font-weight:600">${ar?'التاريخ':'Date'}</th>
              <th style="padding:.35rem .5rem;text-align:start;font-weight:600">${ar?'نوع التغيير':'Type'}</th>
              <th style="padding:.35rem .5rem;text-align:center;font-weight:600">${ar?'التغيير':'Change'}</th>
              <th style="padding:.35rem .5rem;text-align:center;font-weight:600">${ar?'الكمية بعد':'After'}</th>
              <th style="padding:.35rem .5rem;text-align:start;font-weight:600">${ar?'رقم الطلب':'Order ID'}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`, { lg: true });
    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent =
      ar ? 'سجل المخزون' : 'Stock History';
    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML =
      `<button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>`;
  },

  _statusModal(id) {
    const o  = (this._orders || DB.getOrders()).find(x => x.id === id);
    if (!o) return;
    const ar = Admin.lang === 'ar';
    const STATUSES = ['pending','processing','shipped','delivered','cancelled'];
    openModal(`
      <p style="margin-bottom:1rem;font-size:.85rem;color:var(--txt-m)">${ar?'اختر الحالة الجديدة للطلب':'Choose the new order status'} <strong>${esc(id)}</strong></p>
      <div style="display:flex;flex-direction:column;gap:.5rem">
        ${STATUSES.map(s => `
          <label style="display:flex;align-items:center;gap:.75rem;padding:.65rem .9rem;border:1.5px solid ${o.status===s?'var(--acc)':'var(--border-s)'};border-radius:var(--r-md);cursor:pointer;transition:border-color .2s">
            <input type="radio" name="ordStatus" value="${s}" ${o.status===s?'checked':''} style="accent-color:var(--acc)">
            ${badge(s,'ord.status')}
          </label>`).join('')}
      </div>`, { sm: true });
    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent = t('ord.updateStatus');
    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML = `
      <button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
      <button class="adm-btn adm-btn--primary" id="ordStatusSave">${t('common.save')}</button>`;
    document.getElementById('ordStatusSave').onclick = () => {
      const btn = document.getElementById('ordStatusSave');
      const sel = document.querySelector('input[name="ordStatus"]:checked');
      if (!sel) return;
      const ar        = Admin.lang === 'ar';
      const prevStatus = o.status;
      const newStatus  = sel.value;
      console.log('🔴 SAVE CALLED [order-status]', { orderId: id, prevStatus, newStatus, timestamp: new Date() });
      btn.disabled = true; btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';
      try {
        DB.updateOrder(id, { status: newStatus });

        /* ── Restore stock when order is cancelled ────────────────────────
           Only restore if the order was NOT already cancelled before this
           update, to prevent double-restoring on repeated saves.           */
        if (newStatus === 'cancelled' && prevStatus !== 'cancelled') {
          const items = o.items || [];
          let restored = 0;
          for (const item of items) {
            const pid = item.id || item.productId;
            const qty = Math.max(1, Number(item.qty || item.quantity || 1));
            if (pid) {
              DB.adjustStock(pid, +qty, 'order_cancelled', id);
              restored++;
            }
          }
          if (restored) {
            console.info(`[Orders] Restored stock for ${restored} item(s) on cancel of ${id}`);
          }
        }

        const saved = DB.getOrders().find(o => o.id === id);
        console.log('🟢 DB WRITE RESULT [order-status]', saved);
        closeModal();
        toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');
        this.render(document.getElementById('admContent'));
      } catch (err) {
        console.error('🔴 DB WRITE ERROR [order-status]', err);
        btn.disabled = false; btn.textContent = t('common.save');
        toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
      }
    };
  },
};

/* ─────────────────────────────────────────────────────────────
   CUSTOMERS
───────────────────────────────────────────────────────────── */
Sections.customers = {
  _filter: '',

  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const raw  = DB.getCustomers();
      const custs = Array.isArray(raw) ? raw : [];
      const ar    = Admin.lang === 'ar';
      this._custs = custs;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr">
          <div><div class="adm-page-title">${t('cust.title')}</div>
               <div class="adm-page-sub">${fmt(custs.length)} ${ar?'عميل':'customers'}</div></div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-toolbar">
            <div class="adm-search-wrap">
              <span class="adm-search-icon">${ICO.search}</span>
              <input class="adm-search" id="custSearch" placeholder="${t('common.search')}">
            </div>
            <div class="adm-spacer"></div>
            <span class="adm-badge adm-badge--neutral" id="custCount">${fmt(custs.length)}</span>
          </div>
          <div id="custTableWrap"></div>
        </div>
      </div>`;

      el.querySelector('#custSearch').oninput = e => { this._filter = e.target.value; this._renderTable(); };
      el.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action, id } = btn.dataset;
        if (action === 'history') this._history(id);
        if (action === 'toggle')  this._toggle(id);
        if (action === 'delete')  this._delete(id);
      });

      this._renderTable();
    } catch(e) {
      console.error('[Customers]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },

  _renderTable() {
    const ar = Admin.lang === 'ar';
    const q  = (this._filter || '').toLowerCase();
    const filtered = (this._custs || []).filter(c => {
      const name = (ar ? c.nameAr : c.nameEn) || '';
      return !q || name.toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q);
    });
    const wrap  = document.getElementById('custTableWrap');
    const count = document.getElementById('custCount');
    if (count) count.textContent = fmt(filtered.length);
    if (!wrap) return;

    if (!filtered.length) {
      wrap.innerHTML = `<div class="adm-empty"><div class="adm-empty__ico">👥</div><div class="adm-empty__txt">${t('common.noData')}</div></div>`;
      return;
    }

    wrap.innerHTML = `<div class="adm-table-scroll"><table>
      <thead><tr>
        <th>${t('common.name')}</th><th>${t('common.email')}</th>
        <th>${t('cust.orders')}</th><th>${t('cust.spent')}</th>
        <th>${t('cust.joined')}</th><th>${t('common.status')}</th>
        <th>${t('common.actions')}</th>
      </tr></thead>
      <tbody>${filtered.map(c => {
        const name      = ar ? (c.nameAr||c.nameEn) : (c.nameEn||c.nameAr);
        const isBlocked = (c.status || 'active') === 'blocked';
        /* Block button: red ban icon when active, green unlock when blocked */
        const toggleBtn = isBlocked
          ? `<button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="toggle" data-id="${esc(c.id)}"
                title="${t('cust.unblock')}" style="color:var(--success)">${ICO.unlock}</button>`
          : `<button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="toggle" data-id="${esc(c.id)}"
                title="${t('cust.block')}" style="color:var(--warning)">${ICO.ban}</button>`;
        return `<tr>
          <td>
            <div style="display:flex;align-items:center;gap:.5rem">
              <div class="adm-avatar" style="${isBlocked?'opacity:.5':''}">
                ${(name||'?').charAt(0).toUpperCase()}
              </div>
              <div>
                <div style="font-weight:600;font-size:.82rem">${esc(name)}</div>
                ${isBlocked ? `<span style="font-size:.65rem;color:var(--error);font-weight:700">${ar?'محظور':'BLOCKED'}</span>` : ''}
              </div>
            </div>
          </td>
          <td style="font-size:.78rem;color:var(--txt-m)">${esc(c.email)}</td>
          <td style="text-align:center"><span class="adm-badge adm-badge--accent">${c.orders||0}</span></td>
          <td><strong>${fmtSar(c.totalSpent||0)}</strong></td>
          <td style="font-size:.78rem;color:var(--txt-m)">${esc(c.joinDate||'—')}</td>
          <td>${badge(c.status||'active','common')}</td>
          <td>
            <div style="display:flex;gap:.3rem">
              <button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="history" data-id="${esc(c.id)}" title="${t('cust.history')}">${ICO.eye}</button>
              ${toggleBtn}
              <button class="adm-btn adm-btn--danger adm-btn--icon" data-action="delete" data-id="${esc(c.id)}" title="${t('common.delete')}">${ICO.trash}</button>
            </div>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>`;
  },

  _history(id) {
    const c = (this._custs||[]).find(x => x.id === id);
    if (!c) return;
    const ar = Admin.lang === 'ar';
    const name = ar ? (c.nameAr||c.nameEn) : (c.nameEn||c.nameAr);
    const orders = DB.getOrders().filter(o => o.email === c.email);
    const rows = orders.length
      ? orders.map(o => `<tr><td><span class="adm-code">${esc(o.id)}</span></td><td>${fmtSar(o.amount)}</td><td>${badge(o.status,'ord.status')}</td><td>${esc(o.date)}</td></tr>`).join('')
      : `<tr><td colspan="4" class="adm-empty">${t('common.noData')}</td></tr>`;
    openModal(`
      <div style="margin-bottom:1rem;display:flex;align-items:center;gap:.75rem">
        <div class="adm-avatar" style="width:42px;height:42px;font-size:1rem">${(name||'?').charAt(0).toUpperCase()}</div>
        <div>
          <div style="font-weight:700">${esc(name)}</div>
          <div style="font-size:.75rem;color:var(--txt-m)">${esc(c.email)}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>${t('ord.id')}</th><th>${t('common.amount')}</th><th>${t('common.status')}</th><th>${t('common.date')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`, { lg: true });
    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent = t('cust.history');
  },

  _toggle(id) {
    const c = (this._custs || []).find(x => x.id === id);
    if (!c) return;
    const isBlocked = (c.status || 'active') === 'blocked';

    if (isBlocked) {
      /* Unblock — no confirmation needed, non-destructive */
      DB.toggleCustomer(id);
      toast(t('cust.unblocked'));
      this.render(document.getElementById('admContent'));
    } else {
      /* Block — requires confirmation; destructive to the customer's session */
      confirmDialog(t('cust.confirmBlock'), () => {
        DB.toggleCustomer(id);
        toast(t('cust.blocked'));
        this.render(document.getElementById('admContent'));
      }, { icon: '🚫' });
    }
  },

  _delete(id) {
    confirmDialog(t('cust.confirmDelete'), () => {
      DB.deleteCustomer(id);
      toast(t('common.deleted'));
      this.render(document.getElementById('admContent'));
    }, { icon: '🗑️' });
  },
};

/* ─────────────────────────────────────────────────────────────
   SHIPPING
───────────────────────────────────────────────────────────── */
Sections.shipping = {
  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const orders = DB.getOrders();
      const ar = Admin.lang === 'ar';
      this._orders = orders;

      const rows = orders.length ? orders.map(o => {
        const name = ar ? (o.customer?.ar||o.customer?.en) : (o.customer?.en||o.customer?.ar);
        const city = ar ? (o.city?.ar||o.city?.en) : (o.city?.en||o.city?.ar);
        return `<tr>
          <td><span class="adm-code">${esc(o.id)}</span></td>
          <td><div style="font-weight:600;font-size:.82rem">${esc(name)}</div></td>
          <td style="font-size:.78rem;color:var(--txt-m)">${esc(city)}</td>
          <td>${badge(o.status,'ord.status')}</td>
          <td>${o.tracking ? `<span class="adm-code">${esc(o.tracking)}</span>` : `<span style="color:var(--txt-m);font-size:.75rem">${t('ship.noTracking')}</span>`}</td>
          <td>${esc(o.date)}</td>
          <td><button class="adm-btn adm-btn--ghost adm-btn--sm" data-action="edit" data-id="${esc(o.id)}">${t('common.edit')}</button></td>
        </tr>`;
      }).join('') : `<tr><td colspan="7"><div class="adm-empty"><div class="adm-empty__ico">🚚</div><div class="adm-empty__txt">${t('common.noData')}</div></div></td></tr>`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr"><div class="adm-page-title">${t('ship.title')}</div></div>
        <div class="adm-table-wrap">
          <div class="adm-table-scroll"><table>
            <thead><tr>
              <th>${t('ord.id')}</th><th>${t('ord.customer')}</th><th>${t('common.city')}</th>
              <th>${t('common.status')}</th><th>${t('ord.tracking')}</th><th>${t('common.date')}</th>
              <th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </div>
      </div>`;

      el.addEventListener('click', e => {
        const btn = e.target.closest('[data-action="edit"]');
        if (btn) this._editTracking(btn.dataset.id);
      });
    } catch(e) {
      console.error('[Shipping]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },

  _editTracking(id) {
    const o  = (this._orders||[]).find(x => x.id === id);
    if (!o) return;
    const ar = Admin.lang === 'ar';
    const STATUSES = ['pending','processing','shipped','delivered','cancelled'];
    openModal(`
      <div class="adm-form-group" style="margin-bottom:1rem">
        <label class="adm-label">${t('ship.trackingNo')}</label>
        <input class="adm-input" id="trackNum" value="${esc(o.tracking||'')}">
      </div>
      <div class="adm-form-group">
        <label class="adm-label">${t('common.status')}</label>
        <select class="adm-select" id="trackStatus">
          ${STATUSES.map(s => `<option value="${s}"${o.status===s?'selected':''}>${t('ord.status.'+s)}</option>`).join('')}
        </select>
      </div>`, { sm: true });
    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent = t('ship.editTracking') + ' — ' + id;
    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML = `
      <button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
      <button class="adm-btn adm-btn--primary" id="trackSave">${t('common.save')}</button>`;
    document.getElementById('trackSave').onclick = () => {
      const btn = document.getElementById('trackSave');
      const ar = Admin.lang === 'ar';
      const payload = {
        tracking: document.getElementById('trackNum').value.trim() || null,
        status:   document.getElementById('trackStatus').value,
      };
      console.log('🔴 SAVE CALLED [tracking]', { orderId: id, payload, timestamp: new Date() });
      btn.disabled = true; btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';
      try {
        DB.updateOrder(id, payload);
        const saved = DB.getOrders().find(o => o.id === id);
        console.log('🟢 DB WRITE RESULT [tracking]', saved);
        closeModal();
        toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');
        this.render(document.getElementById('admContent'));
      } catch (err) {
        console.error('🔴 DB WRITE ERROR [tracking]', err);
        btn.disabled = false; btn.textContent = t('common.save');
        toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
      }
    };
  },
};

/* ─────────────────────────────────────────────────────────────
   PAYMENTS
───────────────────────────────────────────────────────────── */
Sections.payments = {
  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const orders = DB.getOrders();
      const ar = Admin.lang === 'ar';

      const rows = orders.length ? orders.map(o => {
        const name = ar ? (o.customer?.ar||o.customer?.en) : (o.customer?.en||o.customer?.ar);
        return `<tr>
          <td><span class="adm-code">${esc(o.id)}</span></td>
          <td style="font-weight:600;font-size:.82rem">${esc(name)}</td>
          <td><strong>${fmtSar(o.amount)}</strong></td>
          <td>${esc(t('pay.method.'+(o.paymentMethod||'pending')))}</td>
          <td>${badge(o.paymentStatus||'pending','pay.status')}</td>
          <td style="font-size:.78rem">${esc(o.date)}</td>
        </tr>`;
      }).join('') : `<tr><td colspan="6"><div class="adm-empty"><div class="adm-empty__ico">💳</div><div class="adm-empty__txt">${t('common.noData')}</div></div></td></tr>`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr"><div class="adm-page-title">${t('pay.title')}</div></div>
        <div class="adm-table-wrap">
          <div class="adm-table-scroll"><table>
            <thead><tr>
              <th>${t('pay.ref')}</th><th>${t('ord.customer')}</th><th>${t('common.amount')}</th>
              <th>${t('pay.method')}</th><th>${t('common.status')}</th><th>${t('common.date')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </div>
      </div>`;
    } catch(e) {
      console.error('[Payments]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   REVIEWS
───────────────────────────────────────────────────────────── */
Sections.reviews = {
  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const raw  = DB.getReviews();
      const revs = Array.isArray(raw) ? raw : [];
      const ar   = Admin.lang === 'ar';
      this._revs = revs;

      const rows = revs.length ? revs.map(r => `<tr>
        <td style="font-size:.82rem;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(ar?r.productAr||r.productEn:r.productEn||r.productAr)}</td>
        <td style="font-weight:600;font-size:.82rem">${esc(ar?r.customerAr||r.customerEn:r.customerEn||r.customerAr)}</td>
        <td>${stars(r.rating)}</td>
        <td style="font-size:.78rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.comment||'—')}</td>
        <td>${badge(r.status||'pending','rev')}</td>
        <td style="font-size:.75rem">${esc(r.date||'')}</td>
        <td>
          <div style="display:flex;gap:.3rem">
            ${r.status!=='approved'?`<button class="adm-btn adm-btn--success adm-btn--icon" data-action="approve" data-id="${esc(r.id)}" title="${t('rev.approve')}">${ICO.check}</button>`:''}
            <button class="adm-btn adm-btn--danger adm-btn--icon" data-action="delete" data-id="${esc(r.id)}" title="${t('common.delete')}">${ICO.trash}</button>
          </div>
        </td>
      </tr>`).join('') : `<tr><td colspan="7"><div class="adm-empty"><div class="adm-empty__ico">⭐</div><div class="adm-empty__txt">${t('common.noData')}</div><div class="adm-empty__sub">${ar?'لا توجد تقييمات بعد':'No reviews yet'}</div></div></td></tr>`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr"><div class="adm-page-title">${t('rev.title')}</div>
          <div class="adm-page-sub">${fmt(revs.length)} ${ar?'تقييم':'reviews'}</div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-table-scroll"><table>
            <thead><tr>
              <th>${ar?'المنتج':'Product'}</th><th>${t('ord.customer')}</th>
              <th>${t('rev.rating')}</th><th>${t('rev.comment')}</th>
              <th>${t('common.status')}</th><th>${t('common.date')}</th>
              <th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </div>
      </div>`;

      el.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action, id } = btn.dataset;
        if (action === 'approve') {
          const ar  = Admin.lang === 'ar';
          const rev = revs.find(r => r.id === id) || {};
          console.log('🔴 SAVE CALLED [review-approve]', { id, timestamp: new Date() });
          try {
            DB.saveReview({ ...rev, status: 'approved' });
            const saved = DB.getReviews().find(r => r.id === id);
            console.log('🟢 DB WRITE RESULT [review-approve]', saved);
            toast(ar ? 'تمت الموافقة بنجاح ✓' : 'Approved successfully ✓', 'success');
            this.render(document.getElementById('admContent'));
          } catch (err) {
            console.error('🔴 DB WRITE ERROR [review-approve]', err);
            toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
          }
        }
        if (action === 'delete') {
          confirmDialog(t('common.confirmDelete'), () => {
            const ar = Admin.lang === 'ar';
            console.log('🔴 SAVE CALLED [review-delete]', { id, timestamp: new Date() });
            try {
              DB.deleteReview(id);
              const stillExists = DB.getReviews().find(r => r.id === id);
              console.log('🟢 DB WRITE RESULT [review-delete]', stillExists ? 'NOT DELETED!' : 'Deleted OK');
              toast(t('common.deleted'));
              this.render(document.getElementById('admContent'));
            } catch (err) {
              console.error('🔴 DB WRITE ERROR [review-delete]', err);
              toast((ar ? 'فشل الحذف: ' : 'Delete failed: ') + err.message, 'error');
            }
          });
        }
      });
    } catch(e) {
      console.error('[Reviews]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   DISCOUNTS
───────────────────────────────────────────────────────────── */
Sections.discounts = {
  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const raw   = DB.getDiscounts();
      const discs = Array.isArray(raw) ? raw : [];
      const ar    = Admin.lang === 'ar';
      this._discs = discs;

      const rows = discs.length ? discs.map(d => {
        const expired = d.expiry && new Date(d.expiry) < new Date();
        return `<tr>
          <td><span class="adm-code" style="font-size:.78rem;text-transform:uppercase">${esc(d.code)}</span></td>
          <td>${d.type==='percent' ? `${d.value}%` : fmtSar(d.value)}</td>
          <td style="font-size:.75rem;color:var(--txt-m)">${esc(t('disc.type.'+d.type))}</td>
          <td style="text-align:center">${fmtSar(d.minOrder||0)}</td>
          <td style="text-align:center;font-family:var(--font-en)">${d.usageCount||0}</td>
          <td style="font-size:.75rem">${esc(d.expiry||'—')}</td>
          <td>${expired ? badge('expired','disc') : badge('active','disc')}</td>
          <td>
            <div style="display:flex;gap:.3rem">
              <button class="adm-btn adm-btn--ghost adm-btn--icon" data-action="edit" data-id="${esc(d.id)}" title="${t('common.edit')}">${ICO.edit}</button>
              <button class="adm-btn adm-btn--danger adm-btn--icon" data-action="delete" data-id="${esc(d.id)}" title="${t('common.delete')}">${ICO.trash}</button>
            </div>
          </td>
        </tr>`;
      }).join('') : `<tr><td colspan="8"><div class="adm-empty"><div class="adm-empty__ico">🏷️</div><div class="adm-empty__txt">${t('common.noData')}</div></div></td></tr>`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr">
          <div><div class="adm-page-title">${t('disc.title')}</div>
               <div class="adm-page-sub">${fmt(discs.length)} ${ar?'كود خصم':'discount codes'}</div></div>
          <div class="adm-page-acts">
            <button class="adm-btn adm-btn--primary" id="discAddBtn">${ICO.plus} ${t('disc.add')}</button>
          </div>
        </div>
        <div class="adm-table-wrap">
          <div class="adm-table-scroll"><table>
            <thead><tr>
              <th>${t('disc.code')}</th><th>${t('disc.value')}</th><th>${t('disc.type')}</th>
              <th>${t('disc.minOrder')}</th><th>${t('disc.usage')}</th>
              <th>${t('disc.expiry')}</th><th>${t('common.status')}</th>
              <th>${t('common.actions')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </div>
      </div>`;

      el.querySelector('#discAddBtn').onclick = () => this._openForm();
      el.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action, id } = btn.dataset;
        if (action === 'edit')   this._openForm(discs.find(d => d.id === id));
        if (action === 'delete') confirmDialog(t('common.confirmDelete'), () => {
          DB.deleteDiscount(id); toast(t('common.deleted')); this.render(document.getElementById('admContent'));
        });
      });
    } catch(e) {
      console.error('[Discounts]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },

  _openForm(d) {
    const ar = Admin.lang === 'ar';
    openModal(`
      <div class="adm-form-grid">
        <div class="adm-form-group">
          <label class="adm-label">${t('disc.code')} <span>*</span></label>
          <input class="adm-input" id="dCode" value="${esc(d?.code||'')}" style="text-transform:uppercase" placeholder="SUMMER20">
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('disc.type')}</label>
          <select class="adm-select" id="dType">
            <option value="percent" ${d?.type==='percent'?'selected':''}>${t('disc.type.percent')}</option>
            <option value="fixed"   ${d?.type==='fixed'?'selected':''}>${t('disc.type.fixed')}</option>
          </select>
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('disc.value')} <span>*</span></label>
          <input class="adm-input" id="dValue" type="number" min="0" value="${d?.value||''}">
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('disc.minOrder')}</label>
          <input class="adm-input" id="dMinOrder" type="number" min="0" value="${d?.minOrder||0}">
        </div>
        <div class="adm-form-group">
          <label class="adm-label">${t('disc.expiry')}</label>
          <input class="adm-input" id="dExpiry" type="date" value="${esc(d?.expiry||'')}">
        </div>
      </div>`, { sm: true });
    document.getElementById('admModal').querySelector('.adm-modal__hdr .adm-modal__title').textContent = d ? t('disc.edit') : t('disc.add');
    document.getElementById('admModal').querySelector('.adm-modal__foot').innerHTML = `
      <button class="adm-btn adm-btn--ghost" onclick="closeModal()">${t('common.cancel')}</button>
      <button class="adm-btn adm-btn--primary" id="dSaveBtn">${t('common.save')}</button>`;
    document.getElementById('dSaveBtn').onclick = () => {
      const btn  = document.getElementById('dSaveBtn');
      const code = document.getElementById('dCode').value.trim().toUpperCase();
      const val  = document.getElementById('dValue').value;
      if (!code) { toast(ar?'أدخل كود الخصم':'Enter discount code','error'); return; }
      if (!val)  { toast(ar?'أدخل قيمة الخصم':'Enter discount value','error'); return; }
      const payload = {
        id: d?.id, code,
        type:       document.getElementById('dType').value,
        value:      Number(val),
        minOrder:   Number(document.getElementById('dMinOrder').value)||0,
        expiry:     document.getElementById('dExpiry').value||null,
        usageCount: d?.usageCount||0,
      };
      console.log('🔴 SAVE CALLED [discount]', { payload, timestamp: new Date() });
      btn.disabled = true; btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';
      try {
        DB.saveDiscount(payload);
        const saved = DB.getDiscounts().find(dc => dc.code === code);
        console.log('🟢 DB WRITE RESULT [discount]', saved);
        closeModal();
        toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');
        this.render(document.getElementById('admContent'));
      } catch (err) {
        console.error('🔴 DB WRITE ERROR [discount]', err);
        btn.disabled = false; btn.textContent = t('common.save');
        toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
      }
    };
  },
};

/* ─────────────────────────────────────────────────────────────
   SETTINGS
───────────────────────────────────────────────────────────── */
Sections.settings = {
  async render(el) {
    el.innerHTML = skeletonTable();
    try {
      const s  = DB.getSettings() || {};
      const ar = Admin.lang === 'ar';

      /* Current admin username (custom stored creds override the demo default) */
      let _curAdmUser = 'admin';
      try {
        const _sc = JSON.parse(localStorage.getItem('b3d_admin_creds') || 'null');
        if (_sc && _sc.username) _curAdmUser = _sc.username;
      } catch {}

      const EYE_OPEN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      const EYE_OFF  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      const PW_TOGGLE_STYLE = `position:absolute;inset-block:0;inset-inline-end:0;width:2.4rem;display:flex;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;color:var(--txt-m);transition:color .13s`;

      el.innerHTML = `<div class="adm-page">
        <div class="adm-page-hdr">
          <div class="adm-page-title">${t('set.title')}</div>
        </div>

        <!-- ── Store Settings ── -->
        <div class="adm-card">
          <div class="adm-card__hdr"><span class="adm-card__title">${ar?'إعدادات المتجر':'Store Settings'}</span></div>
          <div class="adm-card__body">
            <div class="adm-form-grid">
              <div class="adm-form-group">
                <label class="adm-label">${t('set.storeAr')}</label>
                <input class="adm-input" id="sNameAr" value="${esc(s.storeNameAr||'')}">
              </div>
              <div class="adm-form-group">
                <label class="adm-label">${t('set.storeEn')}</label>
                <input class="adm-input" id="sNameEn" value="${esc(s.storeNameEn||'')}">
              </div>
              <div class="adm-form-group">
                <label class="adm-label">${t('set.email')}</label>
                <input class="adm-input" id="sEmail" type="email" value="${esc(s.email||'')}">
              </div>
              <div class="adm-form-group">
                <label class="adm-label">${t('set.phone')}</label>
                <input class="adm-input" id="sPhone" value="${esc(s.phone||'')}">
              </div>
              <div class="adm-form-group adm-form-full">
                <label class="adm-label">${t('set.address')}</label>
                <textarea class="adm-textarea" id="sAddress">${esc(s.address||'')}</textarea>
              </div>
              <div class="adm-form-group">
                <label class="adm-label">${t('set.currency')}</label>
                <select class="adm-select" id="sCurrency">
                  <option value="SAR" ${s.currency==='SAR'?'selected':''}>SAR — ريال سعودي</option>
                  <option value="USD" ${s.currency==='USD'?'selected':''}>USD — US Dollar</option>
                  <option value="AED" ${s.currency==='AED'?'selected':''}>AED — درهم إماراتي</option>
                </select>
              </div>
            </div>
            <div style="margin-top:1.25rem;display:flex;justify-content:flex-end">
              <button class="adm-btn adm-btn--primary" id="sSaveBtn">${t('common.save')}</button>
            </div>
          </div>
        </div>

        <!-- ── Store Info & Social Media ── -->
        <div class="adm-card" style="margin-top:1.5rem">
          <div class="adm-card__hdr">
            <span class="adm-card__title" style="display:flex;align-items:center;gap:.45rem">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              ${ar ? 'معلومات المتجر والتواصل' : 'Store Contact & Social Media'}
            </span>
          </div>
          <div class="adm-card__body">

            <!-- Contact fields -->
            <div style="margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border-s)">
              <p style="font-size:.75rem;font-weight:600;color:var(--txt-m);text-transform:uppercase;letter-spacing:.06em;margin-bottom:1rem">${ar?'بيانات التواصل':'Contact Details'}</p>
              <div class="adm-form-grid">
                <div class="adm-form-group">
                  <label class="adm-label">${ar?'العنوان الرئيسي':'Main Address'}</label>
                  <input class="adm-input" id="sContactAddress" value="${esc(s.contactAddress||'')}">
                </div>
                <div class="adm-form-group">
                  <label class="adm-label">${ar?'تفاصيل العنوان':'Address Detail'}</label>
                  <input class="adm-input" id="sAddressDetail" placeholder="${ar?'مثال: حي التقنية، طريق الملك فهد':'e.g. Tech District, King Fahd Rd'}" value="${esc(s.addressDetail||'')}">
                </div>
                <div class="adm-form-group">
                  <label class="adm-label">${ar?'الهاتف / واتساب':'Phone / WhatsApp'}</label>
                  <input class="adm-input" id="sContactPhone" type="tel" value="${esc(s.contactPhone||'')}">
                </div>
                <div class="adm-form-group">
                  <label class="adm-label">${ar?'البريد الإلكتروني (للعرض)':'Display Email'}</label>
                  <input class="adm-input" id="sContactEmail" type="email" value="${esc(s.contactEmail||'')}">
                </div>
                <div class="adm-form-group adm-form-full">
                  <label class="adm-label">${ar?'ساعات العمل':'Working Hours'}</label>
                  <input class="adm-input" id="sWorkingHours" placeholder="${ar?'مثال: السبت – الخميس، 9 ص – 6 م':'e.g. Sat–Thu, 9am–6pm'}" value="${esc(s.workingHours||'')}">
                </div>
              </div>
            </div>

            <!-- Social media rows -->
            <p style="font-size:.75rem;font-weight:600;color:var(--txt-m);text-transform:uppercase;letter-spacing:.06em;margin-bottom:1rem">${ar?'حسابات التواصل الاجتماعي':'Social Media Accounts'}</p>
            <div style="display:flex;flex-direction:column;gap:.85rem">

              <!-- WhatsApp -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(37,211,102,.12);display:flex;align-items:center;justify-content:center;color:#25d366;flex-shrink:0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </div>
                <input class="adm-input" id="sSocialWhatsapp" placeholder="https://wa.me/966XXXXXXXXX" value="${esc(s.socialWhatsapp||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowWhatsapp" ${s.showWhatsapp!==false?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

              <!-- Instagram -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(225,48,108,.12);display:flex;align-items:center;justify-content:center;color:#e1306c;flex-shrink:0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <input class="adm-input" id="sSocialInstagram" placeholder="https://instagram.com/yourpage" value="${esc(s.socialInstagram||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowInstagram" ${s.showInstagram!==false?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

              <!-- X / Twitter -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;color:var(--txt);flex-shrink:0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <input class="adm-input" id="sSocialX" placeholder="https://x.com/yourhandle" value="${esc(s.socialX||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowX" ${s.showX!==false?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

              <!-- LinkedIn -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(10,102,194,.12);display:flex;align-items:center;justify-content:center;color:#0a66c2;flex-shrink:0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <input class="adm-input" id="sSocialLinkedin" placeholder="https://linkedin.com/company/yourpage" value="${esc(s.socialLinkedin||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowLinkedin" ${s.showLinkedin!==false?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

              <!-- Snapchat -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,252,0,.15);display:flex;align-items:center;justify-content:center;color:#fffc00;flex-shrink:0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.165-.015h-.105c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/></svg>
                </div>
                <input class="adm-input" id="sSocialSnapchat" placeholder="https://snapchat.com/add/yourhandle" value="${esc(s.socialSnapchat||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowSnapchat" ${s.showSnapchat?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

              <!-- TikTok -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;color:var(--txt);flex-shrink:0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.6a8.17 8.17 0 0 0 4.78 1.52V6.69a4.85 4.85 0 0 1-1.01-.0z"/></svg>
                </div>
                <input class="adm-input" id="sSocialTiktok" placeholder="https://tiktok.com/@yourhandle" value="${esc(s.socialTiktok||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowTiktok" ${s.showTiktok?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

              <!-- YouTube -->
              <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem">
                <div style="width:36px;height:36px;border-radius:8px;background:rgba(255,0,0,.12);display:flex;align-items:center;justify-content:center;color:#ff0000;flex-shrink:0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <input class="adm-input" id="sSocialYoutube" placeholder="https://youtube.com/@yourchannel" value="${esc(s.socialYoutube||'')}">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.8rem;color:var(--txt-m);white-space:nowrap">
                  <input type="checkbox" id="sShowYoutube" ${s.showYoutube?'checked':''} style="width:15px;height:15px;accent-color:var(--acc)">
                  ${ar?'إظهار':'Show'}
                </label>
              </div>

            </div>

            <div style="margin-top:1.5rem;display:flex;justify-content:flex-end">
              <button class="adm-btn adm-btn--primary" id="sSaveContactBtn">${ar?'حفظ معلومات المتجر':'Save Store Info'}</button>
            </div>
          </div>
        </div>

        <!-- ── Login Credentials ── -->
        <div class="adm-card" style="margin-top:1.5rem">
          <div class="adm-card__hdr">
            <span class="adm-card__title" style="display:flex;align-items:center;gap:.45rem">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              ${t('set.loginCreds')}
            </span>
          </div>
          <div class="adm-card__body">

            <!-- Username -->
            <div style="padding-bottom:1.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--border-s)">
              <div class="adm-form-grid" style="grid-template-columns:1fr">
                <div class="adm-form-group">
                  <label class="adm-label">${t('set.username')}</label>
                  <input class="adm-input" id="sAdmUsername" value="${esc(_curAdmUser)}" autocomplete="off" spellcheck="false">
                  <div class="adm-form-err" id="sUsernameErr"></div>
                </div>
              </div>
              <div style="margin-top:1rem;display:flex;justify-content:flex-end">
                <button class="adm-btn adm-btn--primary" id="sUpdateUsernameBtn">${t('set.updateUsername')}</button>
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="adm-form-grid">
                <div class="adm-form-group adm-form-full">
                  <label class="adm-label">${t('set.currentPw')}</label>
                  <div style="position:relative">
                    <input class="adm-input" id="sCurrentPw" type="password" autocomplete="current-password" style="padding-inline-end:2.4rem">
                    <button type="button" id="sCurrentPwToggle" title="${ar?'إظهار/إخفاء':'Show/Hide'}" style="${PW_TOGGLE_STYLE}">${EYE_OPEN}</button>
                  </div>
                </div>
                <div class="adm-form-group">
                  <label class="adm-label">${t('set.newPw')}</label>
                  <div style="position:relative">
                    <input class="adm-input" id="sNewPw" type="password" autocomplete="new-password" style="padding-inline-end:2.4rem">
                    <button type="button" id="sNewPwToggle" title="${ar?'إظهار/إخفاء':'Show/Hide'}" style="${PW_TOGGLE_STYLE}">${EYE_OPEN}</button>
                  </div>
                </div>
                <div class="adm-form-group">
                  <label class="adm-label">${t('set.confirmPw')}</label>
                  <div style="position:relative">
                    <input class="adm-input" id="sConfirmPw" type="password" autocomplete="new-password" style="padding-inline-end:2.4rem">
                    <button type="button" id="sConfirmPwToggle" title="${ar?'إظهار/إخفاء':'Show/Hide'}" style="${PW_TOGGLE_STYLE}">${EYE_OPEN}</button>
                  </div>
                </div>
              </div>
              <div class="adm-form-err" id="sPwErr" style="margin-top:.75rem;font-size:.74rem"></div>
              <div style="margin-top:1rem;display:flex;justify-content:flex-end">
                <button class="adm-btn adm-btn--primary" id="sUpdatePwBtn">${t('set.updatePw')}</button>
              </div>
            </div>

          </div>
        </div>
      </div>`;

      /* ── Store settings save ── */
      el.querySelector('#sSaveBtn').onclick = () => {
        const btn = el.querySelector('#sSaveBtn');
        const ar  = Admin.lang === 'ar';
        const payload = {
          storeNameAr: document.getElementById('sNameAr').value.trim(),
          storeNameEn: document.getElementById('sNameEn').value.trim(),
          email:       document.getElementById('sEmail').value.trim(),
          phone:       document.getElementById('sPhone').value.trim(),
          address:     document.getElementById('sAddress').value.trim(),
          currency:    document.getElementById('sCurrency').value,
        };
        console.log('🔴 SAVE CALLED [settings-store]', { payload, timestamp: new Date() });
        btn.disabled = true; btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';
        try {
          const cur = DB.getSettings();
          DB.saveSettings(Object.assign({}, cur, payload));
          const saved = DB.getSettings();
          console.log('🟢 DB WRITE RESULT [settings-store]', saved);
          btn.disabled = false; btn.textContent = t('common.save');
          toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');
        } catch (err) {
          console.error('🔴 DB WRITE ERROR [settings-store]', err);
          btn.disabled = false; btn.textContent = t('common.save');
          toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
        }
      };

      /* ── Store contact & social save ── */
      el.querySelector('#sSaveContactBtn').onclick = () => {
        const btn = el.querySelector('#sSaveContactBtn');
        const ar  = Admin.lang === 'ar';
        const payload = {
          contactAddress:  document.getElementById('sContactAddress').value.trim(),
          addressDetail:   document.getElementById('sAddressDetail').value.trim(),
          contactPhone:    document.getElementById('sContactPhone').value.trim(),
          contactEmail:    document.getElementById('sContactEmail').value.trim(),
          workingHours:    document.getElementById('sWorkingHours').value.trim(),
          socialWhatsapp:  document.getElementById('sSocialWhatsapp').value.trim(),
          socialInstagram: document.getElementById('sSocialInstagram').value.trim(),
          socialX:         document.getElementById('sSocialX').value.trim(),
          socialLinkedin:  document.getElementById('sSocialLinkedin').value.trim(),
          socialSnapchat:  document.getElementById('sSocialSnapchat').value.trim(),
          socialTiktok:    document.getElementById('sSocialTiktok').value.trim(),
          socialYoutube:   document.getElementById('sSocialYoutube').value.trim(),
          showWhatsapp:    document.getElementById('sShowWhatsapp').checked,
          showInstagram:   document.getElementById('sShowInstagram').checked,
          showX:           document.getElementById('sShowX').checked,
          showLinkedin:    document.getElementById('sShowLinkedin').checked,
          showSnapchat:    document.getElementById('sShowSnapchat').checked,
          showTiktok:      document.getElementById('sShowTiktok').checked,
          showYoutube:     document.getElementById('sShowYoutube').checked,
        };
        console.log('🔴 SAVE CALLED [settings-contact]', { payload, timestamp: new Date() });
        btn.disabled = true; btn.textContent = ar ? 'جاري الحفظ…' : 'Saving…';
        try {
          const cur = DB.getSettings();
          DB.saveSettings(Object.assign({}, cur, payload));
          const saved = DB.getSettings();
          console.log('🟢 DB WRITE RESULT [settings-contact]', saved);
          btn.disabled = false; btn.textContent = ar ? 'حفظ معلومات المتجر' : 'Save Store Info';
          toast(ar ? 'تم الحفظ بنجاح ✓' : 'Saved successfully ✓', 'success');
        } catch (err) {
          console.error('🔴 DB WRITE ERROR [settings-contact]', err);
          btn.disabled = false; btn.textContent = ar ? 'حفظ معلومات المتجر' : 'Save Store Info';
          toast((ar ? 'فشل الحفظ: ' : 'Save failed: ') + err.message, 'error');
        }
      };

      /* ── Eye toggles (show / hide password) ── */
      ['sCurrentPw', 'sNewPw', 'sConfirmPw'].forEach(id => {
        const input = document.getElementById(id);
        const btn   = document.getElementById(id + 'Toggle');
        if (!input || !btn) return;
        btn.addEventListener('click', () => {
          const reveal = input.type === 'password';
          input.type   = reveal ? 'text' : 'password';
          btn.innerHTML = reveal ? EYE_OFF : EYE_OPEN;
          btn.style.color = reveal ? 'var(--txt)' : 'var(--txt-m)';
        });
      });

      /* ── Username update ── */
      document.getElementById('sUpdateUsernameBtn').onclick = async () => {
        const newUser = document.getElementById('sAdmUsername').value.trim();
        const errEl   = document.getElementById('sUsernameErr');
        errEl.classList.remove('show'); errEl.textContent = '';

        if (!newUser) {
          errEl.textContent = ar ? 'اسم المستخدم مطلوب' : 'Username is required';
          errEl.classList.add('show'); return;
        }
        if (newUser.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser)) {
          errEl.textContent = ar ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format';
          errEl.classList.add('show'); return;
        }

        const btn = document.getElementById('sUpdateUsernameBtn');
        btn.disabled = true; btn.textContent = ar ? 'جاري التحديث…' : 'Updating…';

        const result = await AuthService.updateAdminUsername(newUser);
        btn.disabled = false; btn.textContent = t('set.updateUsername');

        if (result.ok) {
          toast(t('set.successCreds'));
        } else {
          errEl.textContent = result.error || t('set.errUpdate');
          errEl.classList.add('show');
        }
      };

      /* ── Password update ── */
      document.getElementById('sUpdatePwBtn').onclick = async () => {
        const currentPw = document.getElementById('sCurrentPw').value;
        const newPw     = document.getElementById('sNewPw').value;
        const confirmPw = document.getElementById('sConfirmPw').value;
        const errEl     = document.getElementById('sPwErr');
        errEl.classList.remove('show'); errEl.textContent = '';

        // Validation
        if (!currentPw) {
          errEl.textContent = ar ? 'أدخل كلمة المرور الحالية' : 'Enter your current password';
          errEl.classList.add('show'); return;
        }
        if (!newPw || newPw.length < 8) {
          errEl.textContent = t('set.errPwLen');
          errEl.classList.add('show'); return;
        }
        if (newPw !== confirmPw) {
          errEl.textContent = t('set.errPwMatch');
          errEl.classList.add('show'); return;
        }

        const btn = document.getElementById('sUpdatePwBtn');
        btn.disabled = true; btn.textContent = ar ? 'جاري التحديث…' : 'Updating…';

        const result = await AuthService.updateAdminPassword(currentPw, newPw);
        btn.disabled = false; btn.textContent = t('set.updatePw');

        if (result.ok) {
          // Clear all password fields and reset eye toggles
          ['sCurrentPw', 'sNewPw', 'sConfirmPw'].forEach(id => {
            const inp = document.getElementById(id);
            const tog = document.getElementById(id + 'Toggle');
            if (inp) inp.type = 'password';
            if (tog) { tog.innerHTML = EYE_OPEN; tog.style.color = 'var(--txt-m)'; }
            if (inp) inp.value = '';
          });
          toast(t('set.successCreds'));
        } else {
          errEl.textContent = result.error || t('set.errUpdate');
          errEl.classList.add('show');
        }
      };

    } catch(e) {
      console.error('[Settings]', e);
      el.innerHTML = `<div class="adm-page"><div class="adm-alert adm-alert--error">${ICO.warning}<span>${esc(e.message)}</span></div></div>`;
    }
  },
};

/* ════════════════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════════════ */
window.Admin    = Admin;
window.Sections = Sections;

document.addEventListener('DOMContentLoaded', () => {
  if (!AuthService.requireAdmin('login.html')) return;

  /* ── Storage smoke-test — catch blocked localStorage before first save ── */
  const _stor = DB.checkStorage();
  if (!_stor.ok) {
    console.error('❌ [Admin] localStorage is NOT available:', _stor.reason);
    // Show a persistent banner so the user knows saves will fail
    const banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;top:0;inset-inline:0;z-index:9999;background:#ef4444;color:#fff;text-align:center;padding:.6rem 1rem;font-size:.85rem;font-weight:600';
    banner.textContent = 'تحذير: التخزين المحلي غير متاح في هذا المتصفح — لن يتم حفظ أي بيانات. جرب وضعاً غير خفي أو متصفحاً آخر. (localStorage blocked — saves will not persist.)';
    document.body.prepend(banner);
  } else {
    console.log('✅ [Admin] localStorage OK');
  }

  Admin.init();
});
