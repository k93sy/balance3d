/* ============================================================
   Balance 3D Admin — Core: Auth, i18n, Shell, Router  (v2)
   ============================================================ */
'use strict';

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const ADM_T = {
  en: {
    /* Sidebar nav */
    'nav.dashboard':'Dashboard',   'nav.products':'Products',
    'nav.categories':'Categories', 'nav.orders':'Orders',
    'nav.customers':'Customers',   'nav.shipping':'Shipping',
    'nav.payments':'Payments',     'nav.reviews':'Reviews',
    'nav.settings':'Settings',
    'nav.catalog':'Catalog', 'nav.commerce':'Commerce',
    'nav.system':'System',   'nav.config':'Configuration',
    /* Topbar */
    'topbar.search':'Search...', 'topbar.lang':'ع',
    /* Stats */
    'stat.revenue':'Total Revenue',    'stat.orders':'Total Orders',
    'stat.products':'Products',        'stat.customers':'Customers',
    'stat.pending':'Pending Orders',   'stat.outofstock':'Out of Stock',
    'stat.monthly':'Monthly Revenue',  'stat.active':'Active Customers',
    'trend.vsLastMonth':'vs last month',
    /* Products */
    'prod.title':'Products',         'prod.add':'Add Product',
    'prod.name.en':'Name (English)', 'prod.name.ar':'Name (Arabic)',
    'prod.desc.en':'Description (EN)','prod.desc.ar':'Description (AR)',
    'prod.category':'Category',      'prod.material':'Material',
    'prod.price':'Price (SAR)',       'prod.stock':'Stock Qty',
    'prod.badge':'Badge',            'prod.status':'Status',
    'prod.edit':'Edit',              'prod.delete':'Delete',
    'prod.saved':'Product saved ✓',  'prod.deleted':'Product deleted',
    'prod.badge.none':'None',        'prod.badge.new':'New',
    'prod.badge.popular':'Popular',  'prod.badge.sale':'Sale',
    'prod.badge.trending':'Trending','prod.badge.bestseller':'Best Seller',
    'prod.status.active':'Active',   'prod.status.draft':'Draft',
    'prod.status.out_of_stock':'Out of Stock',
    'prod.color':'Color Swatches',   'prod.addColor':'Add color',
    /* Categories */
    'cat.title':'Categories',        'cat.add':'Add Category',
    'cat.name.en':'Name (English)',  'cat.name.ar':'Name (Arabic)',
    'cat.icon':'Icon / Emoji',       'cat.color':'Accent Color',
    'cat.products':'Products',       'cat.saved':'Category saved ✓',
    'cat.deleted':'Category deleted','cat.edit':'Edit',
    /* Orders */
    'ord.title':'Orders',        'ord.id':'Order ID',
    'ord.customer':'Customer',   'ord.product':'Product',
    'ord.amount':'Amount',       'ord.status':'Status',
    'ord.date':'Date',           'ord.actions':'Actions',
    'ord.tracking':'Tracking',   'ord.city':'City',
    'ord.status.pending':'Pending',       'ord.status.processing':'Processing',
    'ord.status.shipped':'Shipped',       'ord.status.delivered':'Delivered',
    'ord.status.cancelled':'Cancelled',
    'ord.updateStatus':'Update Status',   'ord.saved':'Order updated ✓',
    /* Customers */
    'cust.title':'Customers',    'cust.name':'Name',
    'cust.email':'Email',        'cust.phone':'Phone',
    'cust.city':'City',          'cust.orders':'Orders',
    'cust.spent':'Total Spent',  'cust.joined':'Joined',
    'cust.status':'Status',
    'cust.status.active':'Active',   'cust.status.blocked':'Blocked',
    'cust.toggle':'Toggle Status',   'cust.toggled':'Customer status updated ✓',
    /* Shipping */
    'ship.title':'Shipping & Delivery', 'ship.orderId':'Order',
    'ship.customer':'Customer',          'ship.tracking':'Tracking No.',
    'ship.status':'Status',              'ship.city':'City',
    'ship.edit':'Add / Edit Tracking',   'ship.saved':'Tracking updated ✓',
    'ship.noTracking':'Not assigned',
    /* Payments */
    'pay.title':'Payments',       'pay.order':'Order',
    'pay.customer':'Customer',    'pay.amount':'Amount',
    'pay.method':'Method',        'pay.status':'Status',
    'pay.date':'Date',
    'pay.status.paid':'Paid',     'pay.status.pending':'Pending',
    'pay.status.refunded':'Refunded',
    'pay.method.credit_card':'Credit Card',  'pay.method.mada':'Mada',
    'pay.method.stc_pay':'STC Pay',          'pay.method.apple_pay':'Apple Pay',
    'pay.method.cash':'Cash on Delivery',
    /* Reviews */
    'rev.title':'Reviews & Ratings', 'rev.product':'Product',
    'rev.customer':'Customer',       'rev.rating':'Rating',
    'rev.review':'Review',           'rev.date':'Date',
    'rev.replied':'Replied',         'rev.pending':'Pending Reply',
    'rev.reply':'Reply',             'rev.replyPlaceholder':'Write your reply…',
    'rev.saved':'Reply sent ✓',      'rev.deleted':'Review deleted',
    'rev.all':'All', 'rev.filter.replied':'Replied',
    'rev.filter.pending':'Awaiting Reply',
    'rev.filter.5':'⭐⭐⭐⭐⭐ 5 Stars',  'rev.filter.4':'⭐⭐⭐⭐ 4 Stars',
    'rev.filter.3':'⭐⭐⭐ 3 Stars',      'rev.filter.low':'Low (1–2)',
    /* Settings */
    'set.title':'Settings',
    'set.tab.shipping':'Shipping',   'set.tab.payment':'Payment',
    'set.tab.store':'Store Info',
    'set.ship.free':'Free Shipping Threshold (SAR)',
    'set.ship.express':'Express Shipping Rate (SAR)',
    'set.ship.default':'Default Rate for Unlisted Cities (SAR)',
    'set.ship.cities':'City Rates',  'set.ship.addCity':'Add City',
    'set.ship.city.en':'City (English)', 'set.ship.city.ar':'City (Arabic)',
    'set.ship.rate':'Rate (SAR)',    'set.ship.days':'Est. Days',
    'set.pay.methods':'Payment Methods',
    'set.pay.fees':'Extra Fees (SAR)',
    'set.store.nameEn':'Store Name (EN)', 'set.store.nameAr':'Store Name (AR)',
    'set.store.phone':'Support Phone',    'set.store.email':'Support Email',
    'set.store.vat':'VAT Number',         'set.store.address':'Address',
    'set.saved':'Settings saved ✓',
    /* Dashboard */
    'dash.revenueChart':'Revenue — Last 7 Days',
    'dash.orderStatus':'Order Distribution',
    'dash.recentOrders':'Recent Orders',
    'dash.lowStock':'Low Stock Alert',
    'dash.lowStockDesc':'Products with fewer than 5 units',
    /* Common */
    'common.save':'Save',           'common.cancel':'Cancel',
    'common.delete':'Delete',       'common.edit':'Edit',
    'common.add':'Add',             'common.search':'Search',
    'common.noData':'No data found','common.of':'of',
    'common.showing':'Showing',     'common.entries':'entries',
    'common.confirm':'Confirm',
    'common.confirmDelete':'Are you sure? This action cannot be undone.',
    'common.all':'All',             'common.filter':'Filter',
    'common.items':'items',         'common.sar':'SAR',
    'common.required':'This field is required',
    'common.yes':'Yes',             'common.no':'No',
    'common.enabled':'Enabled',     'common.disabled':'Disabled',
    'common.actions':'Actions',     'common.close':'Close',
    'common.loading':'Loading…',
    /* Analytics & Discounts */
    'nav.analytics':'Analytics',        'nav.discounts':'Discounts',
    'disc.title':'Discounts & Coupons', 'disc.add':'Add Coupon',
    'disc.code':'Code',                 'disc.type':'Type',
    'disc.value':'Value',               'disc.minOrder':'Min. Order (SAR)',
    'disc.maxDiscount':'Max Disc (SAR)','disc.usageLimit':'Limit',
    'disc.usageCount':'Times Used',     'disc.expiry':'Expiry Date',
    'disc.desc.en':'Description (EN)',  'disc.desc.ar':'Description (AR)',
    'disc.type.percent':'% Off',        'disc.type.fixed':'Fixed SAR',
    'disc.type.shipping':'Free Shipping','disc.saved':'Coupon saved ✓',
    'disc.deleted':'Coupon deleted',    'disc.status.active':'Active',
    'disc.status.expired':'Expired',    'disc.status.disabled':'Disabled',
    'anal.title':'Analytics',           'anal.revenue':'Revenue Overview',
    'anal.topProducts':'Top Products',  'anal.byCity':'Revenue by City',
    'anal.payMethods':'Payment Methods','anal.orderTrend':'Order Trends',
    /* Auth */
    'auth.title':'Admin Dashboard',
    'auth.subtitle':'Sign in to manage Balance 3D',
    'auth.username':'Username',  'auth.password':'Password',
    'auth.signin':'Sign In',     'auth.back':'Back to site',
    'auth.invalid':'Invalid credentials. Try admin / admin123',
    'auth.logout':'Signed out',
    'auth.logoutConfirm':'Sign out of the admin panel?',
  },
  ar: {
    'nav.dashboard':'لوحة التحكم',   'nav.products':'المنتجات',
    'nav.categories':'التصنيفات',     'nav.orders':'الطلبات',
    'nav.customers':'العملاء',        'nav.shipping':'الشحن والتتبع',
    'nav.payments':'المدفوعات',       'nav.reviews':'التقييمات',
    'nav.settings':'الإعدادات',
    'nav.catalog':'الكتالوج', 'nav.commerce':'التجارة',
    'nav.system':'النظام',    'nav.config':'الإعدادات',
    'topbar.search':'بحث...', 'topbar.lang':'EN',
    'stat.revenue':'إجمالي الإيرادات',  'stat.orders':'إجمالي الطلبات',
    'stat.products':'المنتجات',          'stat.customers':'العملاء',
    'stat.pending':'طلبات معلقة',        'stat.outofstock':'نفد المخزون',
    'stat.monthly':'إيرادات الشهر',      'stat.active':'عملاء نشطون',
    'trend.vsLastMonth':'مقارنة بالشهر الماضي',
    'prod.title':'المنتجات',         'prod.add':'إضافة منتج',
    'prod.name.en':'الاسم (إنجليزي)', 'prod.name.ar':'الاسم (عربي)',
    'prod.desc.en':'الوصف (إنجليزي)','prod.desc.ar':'الوصف (عربي)',
    'prod.category':'الفئة',          'prod.material':'المادة',
    'prod.price':'السعر (ر.س)',        'prod.stock':'المخزون',
    'prod.badge':'الشارة',            'prod.status':'الحالة',
    'prod.edit':'تعديل',             'prod.delete':'حذف',
    'prod.saved':'تم حفظ المنتج ✓',  'prod.deleted':'تم حذف المنتج',
    'prod.badge.none':'بدون',         'prod.badge.new':'جديد',
    'prod.badge.popular':'شائع',      'prod.badge.sale':'تخفيض',
    'prod.badge.trending':'رائج',     'prod.badge.bestseller':'الأكثر مبيعاً',
    'prod.status.active':'نشط',       'prod.status.draft':'مسودة',
    'prod.status.out_of_stock':'نفد',
    'prod.color':'ألوان المنتج',      'prod.addColor':'إضافة لون',
    'cat.title':'التصنيفات',          'cat.add':'إضافة تصنيف',
    'cat.name.en':'الاسم (إنجليزي)', 'cat.name.ar':'الاسم (عربي)',
    'cat.icon':'أيقونة / إيموجي',    'cat.color':'لون مميز',
    'cat.products':'المنتجات',        'cat.saved':'تم حفظ التصنيف ✓',
    'cat.deleted':'تم حذف التصنيف',  'cat.edit':'تعديل',
    'ord.title':'الطلبات',           'ord.id':'رقم الطلب',
    'ord.customer':'العميل',          'ord.product':'المنتج',
    'ord.amount':'المبلغ',            'ord.status':'الحالة',
    'ord.date':'التاريخ',            'ord.actions':'الإجراءات',
    'ord.tracking':'التتبع',          'ord.city':'المدينة',
    'ord.status.pending':'معلق',      'ord.status.processing':'قيد المعالجة',
    'ord.status.shipped':'تم الشحن', 'ord.status.delivered':'تم التسليم',
    'ord.status.cancelled':'ملغى',
    'ord.updateStatus':'تحديث الحالة','ord.saved':'تم تحديث الطلب ✓',
    'cust.title':'العملاء',           'cust.name':'الاسم',
    'cust.email':'البريد الإلكتروني','cust.phone':'الهاتف',
    'cust.city':'المدينة',            'cust.orders':'الطلبات',
    'cust.spent':'إجمالي الإنفاق',   'cust.joined':'تاريخ الانضمام',
    'cust.status':'الحالة',
    'cust.status.active':'نشط',       'cust.status.blocked':'محظور',
    'cust.toggle':'تغيير الحالة',     'cust.toggled':'تم تحديث حالة العميل ✓',
    'ship.title':'الشحن والتسليم',    'ship.orderId':'الطلب',
    'ship.customer':'العميل',          'ship.tracking':'رقم التتبع',
    'ship.status':'الحالة',           'ship.city':'المدينة',
    'ship.edit':'إضافة/تعديل التتبع','ship.saved':'تم تحديث التتبع ✓',
    'ship.noTracking':'لم يُعيَّن بعد',
    'pay.title':'المدفوعات',          'pay.order':'الطلب',
    'pay.customer':'العميل',          'pay.amount':'المبلغ',
    'pay.method':'طريقة الدفع',       'pay.status':'الحالة',
    'pay.date':'التاريخ',
    'pay.status.paid':'مدفوع',        'pay.status.pending':'معلق',
    'pay.status.refunded':'مسترد',
    'pay.method.credit_card':'بطاقة ائتمان', 'pay.method.mada':'مدى',
    'pay.method.stc_pay':'STC Pay',           'pay.method.apple_pay':'Apple Pay',
    'pay.method.cash':'الدفع عند الاستلام',
    'rev.title':'التقييمات والمراجعات', 'rev.product':'المنتج',
    'rev.customer':'العميل',             'rev.rating':'التقييم',
    'rev.review':'المراجعة',             'rev.date':'التاريخ',
    'rev.replied':'تمت الإجابة',         'rev.pending':'بانتظار الرد',
    'rev.reply':'رد',                    'rev.replyPlaceholder':'اكتب ردك هنا…',
    'rev.saved':'تم إرسال الرد ✓',      'rev.deleted':'تم حذف التقييم',
    'rev.all':'الكل', 'rev.filter.replied':'تمت الإجابة',
    'rev.filter.pending':'بانتظار الرد',
    'rev.filter.5':'⭐⭐⭐⭐⭐ ٥ نجوم',  'rev.filter.4':'⭐⭐⭐⭐ ٤ نجوم',
    'rev.filter.3':'⭐⭐⭐ ٣ نجوم',      'rev.filter.low':'منخفض (١–٢)',
    'set.title':'الإعدادات',
    'set.tab.shipping':'الشحن',          'set.tab.payment':'الدفع',
    'set.tab.store':'معلومات المتجر',
    'set.ship.free':'حد الشحن المجاني (ر.س)',
    'set.ship.express':'سعر الشحن السريع (ر.س)',
    'set.ship.default':'السعر الافتراضي للمدن غير المدرجة (ر.س)',
    'set.ship.cities':'أسعار المدن',      'set.ship.addCity':'إضافة مدينة',
    'set.ship.city.en':'المدينة (إنجليزي)', 'set.ship.city.ar':'المدينة (عربي)',
    'set.ship.rate':'السعر (ر.س)',        'set.ship.days':'الأيام المتوقعة',
    'set.pay.methods':'طرق الدفع',
    'set.pay.fees':'رسوم إضافية (ر.س)',
    'set.store.nameEn':'اسم المتجر (إنجليزي)', 'set.store.nameAr':'اسم المتجر (عربي)',
    'set.store.phone':'هاتف الدعم',        'set.store.email':'بريد الدعم',
    'set.store.vat':'الرقم الضريبي',       'set.store.address':'العنوان',
    'set.saved':'تم حفظ الإعدادات ✓',
    'dash.revenueChart':'الإيرادات — آخر ٧ أيام',
    'dash.orderStatus':'توزيع الطلبات',
    'dash.recentOrders':'أحدث الطلبات',
    'dash.lowStock':'تنبيه انخفاض المخزون',
    'dash.lowStockDesc':'منتجات المخزون أقل من ٥',
    'common.save':'حفظ',             'common.cancel':'إلغاء',
    'common.delete':'حذف',           'common.edit':'تعديل',
    'common.add':'إضافة',            'common.search':'بحث',
    'common.noData':'لا توجد بيانات','common.of':'من',
    'common.showing':'عرض',          'common.entries':'سجل',
    'common.confirm':'تأكيد',
    'common.confirmDelete':'هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.',
    'common.all':'الكل',             'common.filter':'فلترة',
    'common.items':'عناصر',          'common.sar':'ر.س',
    'common.required':'هذا الحقل مطلوب',
    'common.yes':'نعم',              'common.no':'لا',
    'common.enabled':'مفعّل',        'common.disabled':'معطّل',
    'common.actions':'الإجراءات',    'common.close':'إغلاق',
    'common.loading':'جارٍ التحميل…',
    /* Analytics & Discounts (AR) */
    'nav.analytics':'الإحصائيات',      'nav.discounts':'الخصومات',
    'disc.title':'الخصومات والكوبونات','disc.add':'إضافة كوبون',
    'disc.code':'الكود',                'disc.type':'النوع',
    'disc.value':'القيمة',              'disc.minOrder':'حد الطلب (ر.س)',
    'disc.maxDiscount':'أقصى خصم (ر.س)','disc.usageLimit':'الحد الأقصى',
    'disc.usageCount':'مرات الاستخدام','disc.expiry':'تاريخ الانتهاء',
    'disc.desc.en':'الوصف (إنجليزي)',  'disc.desc.ar':'الوصف (عربي)',
    'disc.type.percent':'نسبة مئوية',  'disc.type.fixed':'مبلغ ثابت',
    'disc.type.shipping':'شحن مجاني',  'disc.saved':'تم حفظ الكوبون ✓',
    'disc.deleted':'تم حذف الكوبون',  'disc.status.active':'نشط',
    'disc.status.expired':'منتهي',     'disc.status.disabled':'معطّل',
    'anal.title':'الإحصائيات',         'anal.revenue':'نظرة عامة على الإيرادات',
    'anal.topProducts':'أفضل المنتجات','anal.byCity':'الإيرادات حسب المدينة',
    'anal.payMethods':'طرق الدفع',     'anal.orderTrend':'توجهات الطلبات',
    'auth.title':'لوحة التحكم',
    'auth.subtitle':'سجّل دخولك لإدارة Balance 3D',
    'auth.username':'اسم المستخدم',  'auth.password':'كلمة المرور',
    'auth.signin':'تسجيل الدخول',    'auth.back':'العودة للموقع',
    'auth.invalid':'بيانات غير صحيحة. جرّب admin / admin123',
    'auth.logout':'تم تسجيل الخروج',
    'auth.logoutConfirm':'هل تريد الخروج من لوحة التحكم؟',
  },
};

/* ============================================================
   ADMIN APP
   ============================================================ */
const Admin = {
  lang: localStorage.getItem('b3d_admin_lang') || 'ar',
  currentSection: 'dashboard',

  t(key) {
    return ADM_T[this.lang]?.[key] ?? ADM_T['en']?.[key] ?? key;
  },

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('b3d_admin_lang', lang);
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('data-lang', lang);
    this.renderShell();
    this.navigate(this.currentSection, false);
  },

  toggleLang() { this.setLang(this.lang === 'ar' ? 'en' : 'ar'); },

  /* ── Navigation ─────────────────────────────────────────── */
  navigate(section, _pushState = true) {
    this.currentSection = section;
    document.querySelectorAll('.adm-nav__item').forEach(el => {
      el.classList.toggle('active', el.dataset.section === section);
    });
    document.querySelectorAll('.adm-section').forEach(el => {
      el.classList.toggle('active', el.id === 'section-' + section);
    });
    const titleEl = document.getElementById('topbarTitle');
    if (titleEl) titleEl.textContent = this.t('nav.' + section);
    const breadEl = document.getElementById('topbarBreadcrumb');
    if (breadEl) breadEl.innerHTML = `<span>${this.t('nav.' + section)}</span>`;
    this._renderSection(section);
    this.closeSidebar();
  },

  _renderSection(section) {
    const map = {
      dashboard:  () => DashboardSection.render(),
      products:   () => ProductsSection.render(),
      categories: () => CategoriesSection.render(),
      orders:     () => OrdersSection.render(),
      customers:  () => CustomersSection.render(),
      shipping:   () => ShippingSection.render(),
      payments:   () => PaymentsSection.render(),
      reviews:    () => ReviewsSection.render(),
      settings:   () => SettingsSection.render(),
      discounts:  () => DiscountsSection.render(),
      analytics:  () => AnalyticsSection.render(),
    };
    try {
      const p = map[section]?.();
      if (p && typeof p.catch === 'function') {
        p.catch(err => {
          console.error('[Admin] async render error in', section, err);
          const el = document.getElementById('section-' + section);
          if (el) el.innerHTML = `<div style="padding:2rem;color:var(--clr-error);text-align:center">⚠ Render error: ${err.message}</div>`;
        });
      }
    } catch(err) {
      console.error('[Admin] sync render error in', section, err);
      const el = document.getElementById('section-' + section);
      if (el) el.innerHTML = `<div style="padding:2rem;color:var(--clr-error);text-align:center">⚠ Render error: ${err.message}</div>`;
    }
  },

  /* ── Shell ──────────────────────────────────────────────── */
  renderShell() {
    const l = this.lang;
    const t = k => this.t(k);

    const sidebarEl = document.getElementById('adminSidebar');
    if (sidebarEl) {
      sidebarEl.innerHTML = `
        <a href="../index.html" class="adm-sidebar__logo" target="_blank" rel="noopener">
          <div class="adm-sidebar__logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <polygon points="12 2 2 7 12 12 22 7"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <div class="adm-sidebar__logo-text">
            <span class="adm-sidebar__logo-name">Balance 3D</span>
            <span class="adm-sidebar__logo-sub">${l==='ar'?'لوحة التحكم':'Admin Panel'}</span>
          </div>
        </a>

        <nav class="adm-nav">
          <div class="adm-nav__group-label">${t('nav.system')}</div>
          ${this._navItem('dashboard',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>')}
          ${this._navItem('analytics',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>')}

          <div class="adm-nav__group-label">${t('nav.catalog')}</div>
          ${this._navItem('products',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>')}
          ${this._navItem('categories',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>')}

          <div class="adm-nav__group-label">${t('nav.commerce')}</div>
          ${this._navItem('orders',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
            this._pendingBadge())}
          ${this._navItem('customers',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>')}
          ${this._navItem('shipping',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>')}
          ${this._navItem('payments',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>')}
          ${this._navItem('reviews',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            this._pendingReplyBadge())}
          ${this._navItem('discounts',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>')}

          <div class="adm-nav__group-label">${t('nav.config')}</div>
          ${this._navItem('settings',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>')}
        </nav>

        <div class="adm-sidebar__footer">
          <div class="adm-sidebar__user" onclick="Admin.confirmLogout()">
            <div class="adm-sidebar__avatar">A</div>
            <div>
              <div class="adm-sidebar__user-name">Admin</div>
              <div class="adm-sidebar__user-role">${l==='ar'?'مسؤول النظام':'System Admin'}</div>
            </div>
            <div class="adm-sidebar__logout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
          </div>
        </div>`;
    }

    const topbarEl = document.getElementById('adminTopbar');
    if (topbarEl) {
      topbarEl.innerHTML = `
        <button class="adm-topbar__menu-btn" onclick="Admin.openSidebar()" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div>
          <div class="adm-topbar__title" id="topbarTitle">${t('nav.' + this.currentSection)}</div>
          <div class="adm-topbar__breadcrumb" id="topbarBreadcrumb">
            <span>${t('nav.' + this.currentSection)}</span>
          </div>
        </div>
        <div class="adm-topbar__spacer"></div>
        <div class="adm-topbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="${t('topbar.search')}" oninput="Admin._globalSearch(this.value)"/>
        </div>
        <div class="adm-topbar__actions">
          <button class="adm-topbar__icon-btn" onclick="Admin.navigate('settings')" title="${l==='ar'?'الإعدادات':'Settings'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
          <button class="adm-topbar__lang" onclick="Admin.toggleLang()" title="${l==='ar'?'Switch to English':'التبديل للعربية'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            ${t('topbar.lang')}
          </button>
        </div>`;
    }

    // Re-wire nav clicks
    document.querySelectorAll('.adm-nav__item').forEach(el => {
      el.classList.toggle('active', el.dataset.section === this.currentSection);
      el.onclick = () => this.navigate(el.dataset.section);
    });
  },

  _navItem(section, icon, badge = '') {
    const isActive = this.currentSection === section;
    return `<div class="adm-nav__item${isActive?' active':''}" data-section="${section}">
      ${icon}
      <span>${this.t('nav.' + section)}</span>
      ${badge ? `<span class="adm-nav__badge">${badge}</span>` : ''}
    </div>`;
  },

  _pendingBadge() {
    return Admin._cachedPending || '';
  },
  _pendingReplyBadge() {
    return Admin._cachedPendingReplies || '';
  },

  async _refreshBadges() {
    try {
      const orders  = AdminDB.getOrders();
      const reviews = AdminDB.getReviews();
      Admin._cachedPending       = orders.filter(o => o.status==='pending').length || '';
      Admin._cachedPendingReplies= reviews.filter(r => !r.reply).length || '';
    } catch(_) {
      Admin._cachedPending = '';
      Admin._cachedPendingReplies = '';
    }
  },

  _globalSearch(q) {
    if (!q) return;
    // Navigate to orders and focus search there
    this.navigate('orders');
    setTimeout(() => {
      const el = document.querySelector('#section-orders .adm-table-search input');
      if (el) { el.value = q; el.dispatchEvent(new Event('input')); }
    }, 80);
  },

  /* ── Mobile sidebar ─────────────────────────────────────── */
  openSidebar() {
    document.getElementById('adminSidebar')?.classList.add('open');
    document.getElementById('admOverlay')?.classList.add('show');
    document.body.style.overflow = 'hidden';
  },
  closeSidebar() {
    document.getElementById('adminSidebar')?.classList.remove('open');
    document.getElementById('admOverlay')?.classList.remove('show');
    document.body.style.overflow = '';
  },

  /* ── Toast ──────────────────────────────────────────────── */
  toast(msg, type = 'success') {
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      info:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    };
    let c = document.querySelector('.adm-toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'adm-toast-container';
      document.body.appendChild(c);
    }
    const t = document.createElement('div');
    t.className = 'adm-toast adm-toast--' + type;
    t.innerHTML = (icons[type] || icons.info) + `<span>${msg}</span>`;
    c.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 280);
    }, 3200);
  },

  /* ── Confirm dialog ─────────────────────────────────────── */
  confirm(msg, onConfirm, dangerLabel) {
    const l = this.lang;
    let d = document.getElementById('admConfirm');
    if (!d) {
      d = document.createElement('div');
      d.className = 'adm-confirm';
      d.id = 'admConfirm';
      document.body.appendChild(d);
    }
    d.innerHTML = `
      <div class="adm-confirm__box">
        <div class="adm-confirm__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div class="adm-confirm__title">${l==='ar'?'تأكيد الإجراء':'Confirm Action'}</div>
        <div class="adm-confirm__msg">${msg}</div>
        <div class="adm-confirm__btns">
          <button class="adm-btn adm-btn--outline" id="admConfirmCancel">
            ${l==='ar'?'إلغاء':'Cancel'}
          </button>
          <button class="adm-btn adm-btn--danger" id="admConfirmOk">
            ${dangerLabel || (l==='ar'?'تأكيد الحذف':'Confirm Delete')}
          </button>
        </div>
      </div>`;
    d.classList.add('show');
    const close = () => d.classList.remove('show');
    document.getElementById('admConfirmCancel').onclick = close;
    document.getElementById('admConfirmOk').onclick = () => { close(); onConfirm(); };
    d.onclick = e => { if (e.target === d) close(); };
  },

  confirmLogout() {
    this.confirm(
      this.t('auth.logoutConfirm'),
      () => this.logout(),
      this.lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'
    );
  },

  logout() {
    if (typeof AuthService !== 'undefined') AuthService.signOut?.();
    sessionStorage.removeItem('b3d_admin_auth');
    window.location.href = 'login.html';
  },

  /* ── Modal helper ───────────────────────────────────────── */
  openModal(title, bodyHtml, onSave, opts = {}) {
    let bd = document.getElementById('admModalBackdrop');
    if (!bd) {
      bd = document.createElement('div');
      bd.className = 'adm-modal-backdrop';
      bd.id = 'admModalBackdrop';
      document.body.appendChild(bd);
    }
    bd.innerHTML = `
      <div class="adm-modal${opts.wide ? ' adm-modal--wide' : ''}" id="admModal">
        <div class="adm-modal__header">
          <div class="adm-modal__title" id="admModalTitle"></div>
          <button class="adm-modal__close" id="admModalClose" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="adm-modal__body" id="admModalBody"></div>
        <div class="adm-modal__footer">
          <button class="adm-btn adm-btn--outline" id="admModalCancel">${this.t('common.cancel')}</button>
          <button class="adm-btn adm-btn--primary" id="admModalSave">${opts.saveLabel || this.t('common.save')}</button>
        </div>
      </div>`;
    document.getElementById('admModalTitle').textContent = title;
    document.getElementById('admModalBody').innerHTML = bodyHtml;
    requestAnimationFrame(() => bd.classList.add('show'));
    const close = () => { bd.classList.remove('show'); };
    document.getElementById('admModalClose').onclick  = close;
    document.getElementById('admModalCancel').onclick = close;
    document.getElementById('admModalSave').onclick   = async () => {
      const result = await onSave();
      if (result !== false) close();
    };
    bd.onclick = e => { if (e.target === bd) close(); };
  },

  closeModal() {
    document.getElementById('admModalBackdrop')?.classList.remove('show');
  },
};

/* ── Explicit global export (ensures cross-script accessibility) ── */
window.Admin = Admin;
