/* ============================================================
   Balance 3D — Account Page  (account.js)
   ============================================================ */
'use strict';

/* ── localStorage keys ── */
const LS_ORDERS      = 'b3d_orders';
const LS_ADDRESSES   = 'b3d_addresses';
const LS_SAVED_CARDS = 'b3d_saved_cards';
const LS_NOTIF       = 'b3d_notif_prefs';

/* ── Bilingual text ── */
const TX = {
  ar: {
    profileHeading:    'معلومات الحساب',
    profileSub:        'تحديث اسمك ومعلومات التواصل',
    secHeading:        'الأمان وكلمة المرور',
    secSub:            'تغيير كلمة المرور والحفاظ على أمان حسابك',
    ordersHeading:     'طلباتي',
    ordersSub:         'عرض وتتبع جميع طلباتك',
    addrHeading:       'عناويني المحفوظة',
    addrSub:           'إدارة عناوين التوصيل الخاصة بك',
    pmtHeading:        'طرق الدفع',
    pmtSub:            'طرق الدفع التي استخدمتها في طلباتك',
    settingsHeading:   'الإعدادات',
    settingsSub:       'تفضيلات اللغة وإعدادات التطبيق',

    cardTitlePersonal: 'المعلومات الشخصية',
    cardDescPersonal:  'اسمك كما سيظهر على طلباتك',
    cardTitleAccount:  'معلومات الحساب',
    cardTitlePassword: 'تغيير كلمة المرور',
    cardDescPassword:  'اختر كلمة مرور قوية لا تستخدمها في مواقع أخرى',
    cardTitleOrders:   'سجل الطلبات',
    cardTitleAddresses:'قائمة العناوين',
    cardTitlePayments: 'وسائل الدفع',
    cardTitleLang:     'اللغة',
    cardTitleNotif:    'الإشعارات',
    cardTitleDanger:   'منطقة الخطر',

    lblFirstName:   'الاسم الأول',
    lblLastName:    'اسم العائلة',
    lblEmail:       'البريد الإلكتروني',
    hintEmail:      'لا يمكن تغيير البريد الإلكتروني من هنا',
    lblPhone:       'رقم الجوال',
    lblAccountId:   'معرّف الحساب',
    lblMemberSince: 'عضو منذ',
    lblRole:        'نوع الحساب',
    roleCustomer:   'عميل',
    roleAdmin:      'مدير',

    lblCurrPass:    'كلمة المرور الحالية',
    lblNewPass:     'كلمة المرور الجديدة',
    lblConfPass:    'تأكيد كلمة المرور',

    lblAddrLabel:    'اسم العنوان',
    lblAddrCity:     'المدينة',
    lblAddrDistrict: 'الحي',
    lblAddrStreet:   'عنوان الشارع',
    lblAddrPhone:    'رقم الجوال',
    lblAddrDefault:  'تعيين كعنوان افتراضي',

    lblLangPref:    'لغة الواجهة',
    descLangPref:   'اختر لغة عرض المتجر',
    lblOrderNotif:  'إشعارات الطلبات',
    descOrderNotif: 'تلقّي تحديثات حالة طلباتك',
    lblPromoNotif:  'العروض والتخفيضات',
    descPromoNotif: 'تلقّي إشعارات العروض الحصرية',
    lblDeleteAccount: 'حذف الحساب',
    descDeleteAccount:'سيتم حذف جميع بياناتك بشكل نهائي',

    navProfile:    'معلومات الحساب',
    navSecurity:   'كلمة المرور',
    navOrders:     'طلباتي',
    navAddresses:  'عناويني',
    navPayments:   'طرق الدفع',
    navSettings:   'الإعدادات',
    navLogout:     'تسجيل الخروج',

    btnSaveProfile: 'حفظ التغييرات',
    btnSavePass:    'تحديث كلمة المرور',
    btnAddAddress:  'إضافة عنوان',
    btnAddrSave:    'حفظ',
    btnDeleteAccount: 'حذف حسابي',
    shopNow:        'تسوق الآن',

    addrModalAdd:   'إضافة عنوان جديد',
    addrModalEdit:  'تعديل العنوان',
    addrDefault:    'افتراضي',
    btnSetDefault:  'تعيين كافتراضي',
    btnEdit:        'تعديل',
    btnDelete:      'حذف',
    cancel:         'إلغاء',

    emptyOrdersTitle: 'لا توجد طلبات بعد',
    emptyOrdersDesc:  'طلباتك ستظهر هنا بعد إتمام أول عملية شراء',
    emptyAddrTitle:   'لا توجد عناوين محفوظة',
    emptyAddrDesc:    'أضف عنوانك الأول لتسريع عملية الشراء',
    emptyPmtTitle:    'لا توجد معاملات مسجلة',
    emptyPmtDesc:     'طرق الدفع المستخدمة في طلباتك ستظهر هنا',
    pmtInfoMsg:       'يتم الدفع بشكل آمن عبر بوابة Moyasar. لا يتم تخزين بيانات البطاقة لدينا.',

    errFirstName:  'مطلوب',
    errEmail:      'بريد إلكتروني غير صالح',
    errCurrPass:   'مطلوب',
    errNewPass:    '6 أحرف على الأقل',
    errConfPass:   'كلمتا المرور غير متطابقتين',
    errAddrLabel:  'مطلوب',
    errAddrCity:   'مطلوب',
    errAddrStreet: 'مطلوب',

    strengthWeak:  'ضعيفة',
    strengthFair:  'مقبولة',
    strengthGood:  'جيدة',
    strengthStrong:'قوية',

    savedOk:       'تم الحفظ بنجاح',
    passChanged:   'تم تغيير كلمة المرور',
    passMismatch:  'كلمتا المرور غير متطابقتين',
    passWrong:     'كلمة المرور الحالية غير صحيحة',
    passWeak:      'كلمة المرور ضعيفة جداً (6 أحرف على الأقل)',
    genericError:  'حدث خطأ، يرجى المحاولة مرة أخرى',

    confirmDelete: 'هل أنت متأكد من حذف هذا العنوان؟',
    confirmDeleteAccount: 'هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.',

    statusPending:    'معلّق',
    statusProcessing: 'قيد المعالجة',
    statusShipped:    'تم الشحن',
    statusDelivered:  'تم التسليم',
    statusCancelled:  'ملغي',
    statusPaid:       'مدفوع',

    pmtCredit:  'بطاقة ائتمانية',
    pmtMada:    'مدى',
    pmtStc:     'STC Pay',
    pmtApple:   'Apple Pay',
    pmtCash:    'الدفع عند الاستلام',

    btnAddCard:      'إضافة بطاقة جديدة',
    btnCardSave:     'حفظ البطاقة',
    cardModalTitle:  'إضافة بطاقة جديدة',
    lblCardNum:      'رقم البطاقة',
    lblCardHolder:   'اسم حامل البطاقة',
    lblCardExpiry:   'تاريخ الانتهاء',
    lblCardCvv:      'رمز CVV',
    lblCardDefault:  'جعل هذه البطاقة الافتراضية',
    errCardNum:      'رقم بطاقة غير صالح',
    errCardHolder:   'مطلوب',
    errCardExpiry:   'تاريخ غير صالح (MM/YY)',
    errCardCvv:      'رمز CVV غير صالح',
    cardSavedOk:     'تم حفظ البطاقة بنجاح',
    confirmDelCard:  'هل أنت متأكد من حذف هذه البطاقة؟',
    defaultBadge:    'افتراضية',
    btnSetCardDefault: 'تعيين كافتراضية',
    savedCards:      'البطاقات المحفوظة',
    orderHistory:    'سجل طرق الدفع',
    btnConfirmYes:   'تأكيد',

    orderItems: n => n === 1 ? 'منتج واحد' : `${n} منتجات`,
    sar: 'ر.س',
  },
  en: {
    profileHeading:    'Account Information',
    profileSub:        'Update your name and contact details',
    secHeading:        'Security & Password',
    secSub:            'Change your password and keep your account safe',
    ordersHeading:     'My Orders',
    ordersSub:         'View and track all your orders',
    addrHeading:       'Saved Addresses',
    addrSub:           'Manage your delivery addresses',
    pmtHeading:        'Payment Methods',
    pmtSub:            'Payment methods used in your orders',
    settingsHeading:   'Settings',
    settingsSub:       'Language preferences and app settings',

    cardTitlePersonal: 'Personal Information',
    cardDescPersonal:  'Your name as it appears on your orders',
    cardTitleAccount:  'Account Details',
    cardTitlePassword: 'Change Password',
    cardDescPassword:  'Choose a strong password not used on other sites',
    cardTitleOrders:   'Order History',
    cardTitleAddresses:'Address List',
    cardTitlePayments: 'Payment Methods',
    cardTitleLang:     'Language',
    cardTitleNotif:    'Notifications',
    cardTitleDanger:   'Danger Zone',

    lblFirstName:   'First Name',
    lblLastName:    'Last Name',
    lblEmail:       'Email Address',
    hintEmail:      'Email cannot be changed here',
    lblPhone:       'Phone Number',
    lblAccountId:   'Account ID',
    lblMemberSince: 'Member Since',
    lblRole:        'Account Type',
    roleCustomer:   'Customer',
    roleAdmin:      'Admin',

    lblCurrPass:    'Current Password',
    lblNewPass:     'New Password',
    lblConfPass:    'Confirm Password',

    lblAddrLabel:    'Address Name',
    lblAddrCity:     'City',
    lblAddrDistrict: 'District',
    lblAddrStreet:   'Street Address',
    lblAddrPhone:    'Phone Number',
    lblAddrDefault:  'Set as default address',

    lblLangPref:    'Interface Language',
    descLangPref:   'Choose the store display language',
    lblOrderNotif:  'Order Notifications',
    descOrderNotif: 'Receive updates on your order status',
    lblPromoNotif:  'Offers & Discounts',
    descPromoNotif: 'Receive exclusive offer notifications',
    lblDeleteAccount: 'Delete Account',
    descDeleteAccount:'All your data will be permanently deleted',

    navProfile:    'Account Info',
    navSecurity:   'Password',
    navOrders:     'My Orders',
    navAddresses:  'Addresses',
    navPayments:   'Payments',
    navSettings:   'Settings',
    navLogout:     'Sign Out',

    btnSaveProfile: 'Save Changes',
    btnSavePass:    'Update Password',
    btnAddAddress:  'Add Address',
    btnAddrSave:    'Save',
    btnDeleteAccount: 'Delete Account',
    shopNow:        'Shop Now',

    addrModalAdd:   'Add New Address',
    addrModalEdit:  'Edit Address',
    addrDefault:    'Default',
    btnSetDefault:  'Set Default',
    btnEdit:        'Edit',
    btnDelete:      'Delete',
    cancel:         'Cancel',

    emptyOrdersTitle: 'No orders yet',
    emptyOrdersDesc:  'Your orders will appear here after your first purchase',
    emptyAddrTitle:   'No saved addresses',
    emptyAddrDesc:    'Add your first address to speed up checkout',
    emptyPmtTitle:    'No transactions recorded',
    emptyPmtDesc:     'Payment methods used in your orders will appear here',
    pmtInfoMsg:       'Payments are processed securely via Moyasar. We do not store card data.',

    errFirstName:  'Required',
    errEmail:      'Invalid email address',
    errCurrPass:   'Required',
    errNewPass:    'At least 6 characters',
    errConfPass:   'Passwords do not match',
    errAddrLabel:  'Required',
    errAddrCity:   'Required',
    errAddrStreet: 'Required',

    strengthWeak:  'Weak',
    strengthFair:  'Fair',
    strengthGood:  'Good',
    strengthStrong:'Strong',

    savedOk:       'Saved successfully',
    passChanged:   'Password updated',
    passMismatch:  'Passwords do not match',
    passWrong:     'Current password is incorrect',
    passWeak:      'Password too weak (min 6 characters)',
    genericError:  'Something went wrong, please try again',

    confirmDelete: 'Are you sure you want to delete this address?',
    confirmDeleteAccount: 'Are you sure you want to delete your account? This action cannot be undone.',

    statusPending:    'Pending',
    statusProcessing: 'Processing',
    statusShipped:    'Shipped',
    statusDelivered:  'Delivered',
    statusCancelled:  'Cancelled',
    statusPaid:       'Paid',

    pmtCredit:  'Credit Card',
    pmtMada:    'Mada',
    pmtStc:     'STC Pay',
    pmtApple:   'Apple Pay',
    pmtCash:    'Cash on Delivery',

    btnAddCard:      'Add New Card',
    btnCardSave:     'Save Card',
    cardModalTitle:  'Add New Card',
    lblCardNum:      'Card Number',
    lblCardHolder:   'Cardholder Name',
    lblCardExpiry:   'Expiry Date',
    lblCardCvv:      'CVV Code',
    lblCardDefault:  'Set as default card',
    errCardNum:      'Invalid card number',
    errCardHolder:   'Required',
    errCardExpiry:   'Invalid date (MM/YY)',
    errCardCvv:      'Invalid CVV',
    cardSavedOk:     'Card saved successfully',
    confirmDelCard:  'Are you sure you want to delete this card?',
    defaultBadge:    'Default',
    btnSetCardDefault: 'Set Default',
    savedCards:      'Saved Cards',
    orderHistory:    'Payment History',
    btnConfirmYes:   'Confirm',

    orderItems: n => n === 1 ? '1 item' : `${n} items`,
    sar: 'SAR',
  },
};

/* ── Helpers ── */
const $  = id => document.getElementById(id);
const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };

let _lang = 'ar';
let _user = null;
const t = k => (TX[_lang]||TX.ar)[k] || (TX.en)[k] || k;

/* ── Addresses store ── */
const AddressStore = {
  all() {
    try { return JSON.parse(localStorage.getItem(LS_ADDRESSES) || '[]'); } catch { return []; }
  },
  save(list) {
    localStorage.setItem(LS_ADDRESSES, JSON.stringify(list));
  },
  add(addr) {
    const list = this.all();
    if (addr.isDefault) list.forEach(a => a.isDefault = false);
    list.push({ ...addr, id: 'addr-' + Date.now() });
    this.save(list);
  },
  update(id, addr) {
    const list = this.all();
    if (addr.isDefault) list.forEach(a => a.isDefault = false);
    const idx = list.findIndex(a => a.id === id);
    if (idx >= 0) list[idx] = { ...list[idx], ...addr };
    this.save(list);
  },
  remove(id) {
    this.save(this.all().filter(a => a.id !== id));
  },
  setDefault(id) {
    const list = this.all().map(a => ({ ...a, isDefault: a.id === id }));
    this.save(list);
  },
};

/* ── Orders store ── */
const OrderStore = {
  all() {
    try { return JSON.parse(localStorage.getItem(LS_ORDERS) || '[]'); } catch { return []; }
  },
  forUser(email) {
    const all = this.all();
    if (!email) return all;
    return all.filter(o => !o.customer_email || o.customer_email === email);
  },
};

/* ── Saved cards store ── */
const CardStore = {
  all() {
    try { return JSON.parse(localStorage.getItem(LS_SAVED_CARDS) || '[]'); } catch { return []; }
  },
  save(list) {
    localStorage.setItem(LS_SAVED_CARDS, JSON.stringify(list));
  },
  add(card) {
    const list = this.all();
    if (card.isDefault) list.forEach(c => c.isDefault = false);
    list.push({ ...card, id: 'card-' + Date.now(), savedAt: new Date().toISOString() });
    this.save(list);
  },
  remove(id) {
    this.save(this.all().filter(c => c.id !== id));
  },
  setDefault(id) {
    this.save(this.all().map(c => ({ ...c, isDefault: c.id === id })));
  },
};

/* ── Main AccountPage object ── */
const AccountPage = {

  async init() {
    _lang = (typeof App !== 'undefined' ? App.lang : null) ||
            localStorage.getItem('b3d_lang') || 'ar';

    // Auth guard
    if (typeof AuthService !== 'undefined') {
      const session = await AuthService.getSession();
      if (!session) {
        window.location.href = 'login.html?next=account.html';
        return;
      }
      try { _user = await AuthService.getUser(); } catch (_) {}
    }

    this._applyLang();
    this._populateSidebar();
    this._initNav();
    this._initProfileForm();
    this._initPasswordForm();
    this._initAddressModal();
    this._initCardModal();
    this._initSettings();
    this._initLogout();

    // Navigate to section from URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && $('section-' + hash)) {
      this._showSection(hash);
    }

    // Lazy-load data sections on first activation
    this._loadOrders();
    this._loadAddresses();
    this._loadPayments();

    // Register as the current page so App.applyLang() re-renders us on language change
    window.currentPage = {
      render: () => {
        _lang = (typeof App !== 'undefined' ? App.lang : null) ||
                localStorage.getItem('b3d_lang') || _lang;
        AccountPage._applyLang();
        AccountPage._loadOrders();
        AccountPage._loadAddresses();
        AccountPage._loadPayments();
      },
    };
  },

  /* ── Apply all bilingual text to the page ── */
  _applyLang() {
    const ids = [
      'profileHeading','profileSub','secHeading','secSub',
      'ordersHeading','ordersSub','addrHeading','addrSub',
      'pmtHeading','pmtSub','settingsHeading','settingsSub',
      'cardTitlePersonal','cardDescPersonal','cardTitleAccount',
      'cardTitlePassword','cardDescPassword','cardTitleOrders',
      'cardTitleAddresses','cardTitlePayments','cardTitleLang',
      'cardTitleNotif','cardTitleDanger',
      'lblFirstName','lblLastName','lblEmail','hintEmail','lblPhone',
      'lblAccountId','lblMemberSince','lblRole',
      'lblCurrPass','lblNewPass','lblConfPass',
      'lblAddrLabel','lblAddrCity','lblAddrDistrict','lblAddrStreet','lblAddrPhone','lblAddrDefault',
      'lblLangPref','descLangPref','lblOrderNotif','descOrderNotif',
      'lblPromoNotif','descPromoNotif','lblDeleteAccount','descDeleteAccount',
      'errFirstName','errEmail','errCurrPass','errNewPass','errConfPass',
      'errAddrLabel','errAddrCity','errAddrStreet',
      'pmtInfoMsg',
      // Card modal labels & errors
      'lblCardNum','lblCardHolder','lblCardExpiry','lblCardCvv','lblCardDefault',
      'errCardNum','errCardHolder','errCardExpiry','errCardCvv',
    ];

    ids.forEach(id => setText(id, t(id)));

    setText('navLabelProfile',   t('navProfile'));
    setText('navLabelSecurity',  t('navSecurity'));
    setText('navLabelOrders',    t('navOrders'));
    setText('navLabelAddresses', t('navAddresses'));
    setText('navLabelPayments',  t('navPayments'));
    setText('navLabelSettings',  t('navSettings'));
    setText('navLabelLogout',    t('navLogout'));

    setText('btnSaveProfile', t('btnSaveProfile'));
    setText('btnSavePass',    t('btnSavePass'));
    setText('btnAddAddress',  t('btnAddAddress'));
    setText('btnAddrSave',    t('btnAddrSave'));
    setText('btnAddCard',     t('btnAddCard'));
    setText('btnCardSave',    t('btnCardSave'));
    setText('btnDeleteAccount',t('btnDeleteAccount'));
    setText('shopNowBtn',     t('shopNow'));
    setText('emptyOrdersTitle',t('emptyOrdersTitle'));
    setText('emptyOrdersDesc', t('emptyOrdersDesc'));

    // Direction
    document.documentElement.lang = _lang;
    document.documentElement.dir  = _lang === 'ar' ? 'rtl' : 'ltr';
  },

  /* ── Populate sidebar with user info ── */
  _populateSidebar() {
    const user = _user || {};
    const first = user.firstName || user.first_name ||
                  (user.nameEn || user.name_en || '').split(' ')[0] ||
                  (user.email || '').split('@')[0] || '?';
    const last  = user.lastName  || user.last_name  ||
                  (user.nameEn || user.name_en || '').split(' ').slice(1).join(' ') || '';
    const email = user.email || '';
    const initial = first.charAt(0).toUpperCase();

    setText('sidebarAvatar', initial || '?');
    setText('sidebarName',   first + (last ? ' ' + last : '') || email);
    setText('sidebarEmail',  email);

    // Populate profile form
    const fFirst = $('inpFirstName');
    const fLast  = $('inpLastName');
    const fEmail = $('inpEmail');
    const fPhone = $('inpPhone');

    if (fFirst) fFirst.value = user.firstName || user.first_name || (user.nameEn || user.name_en || '').split(' ')[0] || '';
    if (fLast)  fLast.value  = user.lastName  || user.last_name  || (user.nameEn || user.name_en || '').split(' ').slice(1).join(' ') || '';
    if (fEmail) { fEmail.value = email; fEmail.disabled = true; }
    if (fPhone) fPhone.value = user.phone || user.phone_number || '';

    // Account info cards
    setText('valAccountId',   user.id || '—');
    const created = user.createdAt || user.created_at;
    setText('valMemberSince', created ? new Date(created).toLocaleDateString(_lang === 'ar' ? 'ar-SA' : 'en-GB') : '—');
    setText('valRole', user.role === 'admin' ? t('roleAdmin') : t('roleCustomer'));
  },

  /* ── Sidebar navigation ── */
  _initNav() {
    document.querySelectorAll('.account-nav-item[data-section]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._showSection(btn.dataset.section);
        window.history.replaceState(null, '', '#' + btn.dataset.section);
      });
    });
  },

  _showSection(name) {
    // Deactivate all
    document.querySelectorAll('.account-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.account-nav-item[data-section]').forEach(b => b.classList.remove('active'));

    // Activate target
    const section = $('section-' + name);
    if (section) section.classList.add('active');

    const btn = document.querySelector(`.account-nav-item[data-section="${name}"]`);
    if (btn) btn.classList.add('active');

    // Scroll to top on mobile
    if (window.innerWidth <= 900) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  /* ── Profile form ── */
  _initProfileForm() {
    const form = $('profileForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!this._validateProfile()) return;

      const btn = $('saveProfileBtn');
      btn.setAttribute('data-loading', '1');

      const firstName = $('inpFirstName').value.trim();
      const lastName  = $('inpLastName').value.trim();
      const phone     = $('inpPhone').value.trim();

      let ok = true, msg = '';

      if (typeof AuthService !== 'undefined') {
        const res = await AuthService.updateProfile({
          nameEn: firstName + (lastName ? ' ' + lastName : ''),
          nameAr: firstName + (lastName ? ' ' + lastName : ''),
          firstName, lastName, phone,
        });
        ok  = res.ok;
        msg = res.error || t('savedOk');
      } else {
        // Demo: update localStorage directly
        const stored = JSON.parse(localStorage.getItem('b3d_user') || '{}');
        localStorage.setItem('b3d_user', JSON.stringify({
          ...stored, firstName, lastName,
          nameEn: firstName + (lastName ? ' ' + lastName : ''),
          phone,
        }));
        msg = t('savedOk');
      }

      btn.removeAttribute('data-loading');
      this._showAlert('profileAlert', ok ? 'success' : 'error', msg || t('savedOk'));

      if (ok) {
        setText('sidebarAvatar', firstName.charAt(0).toUpperCase() || '?');
        setText('sidebarName', firstName + (lastName ? ' ' + lastName : ''));
      }
    });
  },

  _validateProfile() {
    const firstField = $('fieldFirstName');
    const emailField = $('fieldEmail');
    let valid = true;

    const first = $('inpFirstName').value.trim();
    if (!first) {
      firstField.classList.add('has-error');
      valid = false;
    } else {
      firstField.classList.remove('has-error');
    }

    return valid;
  },

  /* ── Password form ── */
  _initPasswordForm() {
    const form = $('passwordForm');
    if (!form) return;

    // Toggle visibility buttons
    document.querySelectorAll('.acc-pass-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const inp = $(btn.dataset.target);
        if (!inp) return;
        inp.type = inp.type === 'password' ? 'text' : 'password';
      });
    });

    // Password strength meter
    const newPass = $('inpNewPass');
    if (newPass) {
      newPass.addEventListener('input', () => {
        this._updateStrength(newPass.value);
      });
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!this._validatePassword()) return;

      const btn = $('savePassBtn');
      btn.setAttribute('data-loading', '1');

      const currPass = $('inpCurrPass').value;
      const newPass  = $('inpNewPass').value;

      let ok = true, msg = '';

      if (typeof AuthService !== 'undefined') {
        // Verify current password by re-signing in
        const email = _user?.email;
        if (email) {
          const check = await AuthService.signInEmail(email, currPass);
          if (!check.ok) {
            btn.removeAttribute('data-loading');
            this._showAlert('secAlert', 'error', t('passWrong'));
            $('fieldCurrPass').classList.add('has-error');
            return;
          }
        }
        const res = await AuthService.updatePassword(newPass);
        ok  = res.ok;
        msg = res.error || t('passChanged');
      } else {
        // Demo mode: update in local users store
        const users = JSON.parse(localStorage.getItem('b3d_local_users') || '[]');
        const email = _user?.email;
        const idx   = users.findIndex(u => u.email === email && u.password === currPass);
        if (idx < 0) {
          btn.removeAttribute('data-loading');
          this._showAlert('secAlert', 'error', t('passWrong'));
          return;
        }
        users[idx].password = newPass;
        localStorage.setItem('b3d_local_users', JSON.stringify(users));
        msg = t('passChanged');
      }

      btn.removeAttribute('data-loading');
      this._showAlert('secAlert', ok ? 'success' : 'error', msg);
      if (ok) form.reset();
    });
  },

  _validatePassword() {
    const currF = $('fieldCurrPass');
    const newF  = $('fieldNewPass');
    const confF = $('fieldConfPass');
    let valid = true;

    currF.classList.remove('has-error');
    newF.classList.remove('has-error');
    confF.classList.remove('has-error');

    const curr = $('inpCurrPass').value;
    const nw   = $('inpNewPass').value;
    const conf = $('inpConfPass').value;

    if (!curr) { currF.classList.add('has-error'); valid = false; }
    if (!nw || nw.length < 6) { newF.classList.add('has-error'); valid = false; }
    if (nw !== conf) { confF.classList.add('has-error'); valid = false; }

    return valid;
  },

  _updateStrength(pass) {
    const fill  = $('strengthFill');
    const label = $('strengthLabel');
    if (!fill || !label) return;

    let score = 0;
    if (pass.length >= 6)  score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;

    fill.setAttribute('data-level', score || '');

    const labels = ['', t('strengthWeak'), t('strengthFair'), t('strengthGood'), t('strengthStrong')];
    label.textContent = pass ? labels[score] || labels[1] : '';
  },

  /* ── Orders ── */
  _loadOrders() {
    const body = $('ordersBody');
    if (!body) return;

    const email  = _user?.email;
    const orders = OrderStore.forUser(email);

    if (!orders.length) {
      body.innerHTML = `
        <div class="acc-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
          <div class="acc-empty__title">${t('emptyOrdersTitle')}</div>
          <div class="acc-empty__desc">${t('emptyOrdersDesc')}</div>
          <a href="products.html" class="acc-btn acc-btn--primary">${t('shopNow')}</a>
        </div>`;
      return;
    }

    const sorted = [...orders].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    body.innerHTML = `<div class="order-list">${sorted.map(o => this._orderCard(o)).join('')}</div>`;
  },

  _orderCard(o) {
    /* ── tiny HTML escaper (avoids XSS from stored strings) ── */
    const _e = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

    const status    = o.status || 'pending';
    const pmtStatus = o.payment_status || '';
    const pmtMethod = o.payment_method || '';
    const date      = o.created_at ? new Date(o.created_at).toLocaleDateString(_lang === 'ar' ? 'ar-SA' : 'en-GB') : '—';
    const amount    = typeof o.amount === 'number' ? o.amount.toFixed(2) : (o.amount || '—');

    /* ── Status badge ── */
    const statusMap = {
      pending:    { cls: 'pending',    label: t('statusPending') },
      processing: { cls: 'processing', label: t('statusProcessing') },
      shipped:    { cls: 'shipped',    label: t('statusShipped') },
      delivered:  { cls: 'delivered',  label: t('statusDelivered') },
      cancelled:  { cls: 'cancelled',  label: t('statusCancelled') },
    };
    const s = statusMap[status] || statusMap.pending;

    const pmtBadge = pmtStatus === 'paid'
      ? `<span class="order-status order-status--paid">${t('statusPaid')}</span>`
      : '';

    /* ── Payment method label ── */
    const pmtNames = {
      credit_card: t('pmtCredit'),
      mada:        t('pmtMada'),
      stc_pay:     t('pmtStc'),
      apple_pay:   t('pmtApple'),
      cash:        t('pmtCash'),
    };
    const pmtLabel = pmtNames[pmtMethod] || '';

    /* ── Items list ── */
    const rawItems = Array.isArray(o.items) ? o.items : [];
    let itemsHtml = '';
    if (rawItems.length) {
      const visible = rawItems.slice(0, 3);
      const extra   = rawItems.length - visible.length;
      itemsHtml = `<div class="order-card__items-list">
        ${visible.map(item => {
          const name  = _lang === 'ar'
            ? (item.nameAr || item.name || item.nameEn || '')
            : (item.nameEn || item.name || item.nameAr || '');
          const qty   = item.qty || item.quantity || 1;
          const price = typeof item.price === 'number' ? item.price
                      : (typeof item.unitPrice === 'number' ? item.unitPrice : 0);
          const img   = item.image || item.imageUrl || '';
          const imgEl = img
            ? `<img class="order-item-img" src="${_e(img)}" alt="" loading="lazy" onerror="this.style.display='none'">`
            : `<div class="order-item-img order-item-img--placeholder"></div>`;
          return `<div class="order-item-row">
            ${imgEl}
            <div class="order-item-name">${_e(name)}</div>
            <div class="order-item-qty">×${qty}</div>
            <div class="order-item-price">${(price * qty).toFixed(0)} ${t('sar')}</div>
          </div>`;
        }).join('')}
        ${extra > 0 ? `<div class="order-item-row order-item-more">${_lang === 'ar' ? `+${extra} منتجات أخرى` : `+${extra} more items`}</div>` : ''}
      </div>`;
    } else {
      /* Fallback for legacy orders stored without items array */
      const count = typeof o.items === 'number' ? o.items : 1;
      itemsHtml = `<div class="order-card__body">
        <div class="order-card__items">${t('orderItems')(count)}</div>
        <div class="order-card__amount">${amount} ${t('sar')}</div>
      </div>`;
    }

    /* ── Delivery address summary ── */
    const da = o.delivery_address || null;
    let addrLine = '';
    if (da) {
      addrLine = [da.street, da.district, da.city].filter(Boolean).join('، ');
    } else if (o.address) {
      addrLine = o.address;
    }
    const addrHtml = addrLine ? `
      <div class="order-card__addr">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>${_e(addrLine)}</span>
      </div>` : '';

    /* ── 4-step tracking progress bar (hidden when cancelled) ── */
    let trackHtml = '';
    if (status !== 'cancelled') {
      const steps = ['pending', 'processing', 'shipped', 'delivered'];
      const stepLabels = {
        pending:    t('statusPending'),
        processing: t('statusProcessing'),
        shipped:    t('statusShipped'),
        delivered:  t('statusDelivered'),
      };
      const currentIdx = steps.indexOf(status);
      trackHtml = `<div class="order-card__track">
        <div class="order-track-steps">
          ${steps.map((step, i) => {
            const done    = i < currentIdx;
            const current = i === currentIdx;
            return `<div class="order-track-step${done ? ' done' : ''}${current ? ' active' : ''}">
              <div class="order-track-dot"></div>
              <div class="order-track-lbl">${stepLabels[step]}</div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }

    /* ── Discount badge ── */
    const discountBadge = o.discount_code
      ? `<div class="order-card__discount">
           <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
             <polyline points="9 11 12 14 22 4"/>
             <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
           </svg>
           <span class="order-discount-tag">${_e(o.discount_code)}</span>
           <span style="color:#059669;font-size:.75rem;font-weight:600">
             ${_lang === 'ar' ? 'وفّرت' : 'Saved'} ${(o.discount_amount || 0).toFixed(0)} ${t('sar')}
           </span>
         </div>`
      : '';

    /* ── Footer: payment method + total ── */
    const footerHtml = rawItems.length ? `
      <div class="order-card__footer">
        ${pmtLabel ? `<div class="order-card__pmt">${_e(pmtLabel)}</div>` : ''}
        <div class="order-card__total">${amount} ${t('sar')}</div>
      </div>` : '';

    return `
      <div class="order-card">
        <div class="order-card__head">
          <div>
            <div class="order-card__id">${_e(o.id || '—')}</div>
            <div class="order-card__date">${date}</div>
          </div>
          <div style="display:flex;gap:var(--space-2);align-items:center">
            <span class="order-status order-status--${s.cls}">${s.label}</span>
            ${pmtBadge}
          </div>
        </div>
        ${itemsHtml}
        ${addrHtml}
        ${trackHtml}
        ${discountBadge}
        ${footerHtml}
      </div>`;
  },

  /* ── Addresses ── */
  _initAddressModal() {
    const addBtn  = $('addAddressBtn');
    const modal   = $('addrModal');
    const closeBtn = $('addrModalClose');
    const cancelBtn = $('addrModalCancel');
    const saveBtn  = $('addrModalSave');

    if (!modal) return;

    const openModal = (addr = null) => {
      const isEdit = !!addr;
      setText('addrModalTitle', isEdit ? t('addrModalEdit') : t('addrModalAdd'));
      setText('btnAddrSave', t('btnAddrSave'));

      $('addrEditId').value          = addr?.id || '';
      $('inpAddrLabel').value        = addr?.label || '';
      $('inpAddrCity').value         = addr?.city || '';
      $('inpAddrDistrict').value     = addr?.district || '';
      $('inpAddrStreet').value       = addr?.street || '';
      $('inpAddrPhone').value        = addr?.phone || '';
      $('inpAddrDefault').checked    = addr?.isDefault || false;

      // Clear errors
      ['fieldAddrLabel','fieldAddrCity','fieldAddrStreet'].forEach(id =>
        $(id)?.classList.remove('has-error'));

      modal.classList.add('open');
      $('inpAddrLabel').focus();
    };

    const closeModal = () => modal.classList.remove('open');

    if (addBtn) addBtn.addEventListener('click', () => openModal());
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    saveBtn?.addEventListener('click', () => {
      const labelF  = $('fieldAddrLabel');
      const cityF   = $('fieldAddrCity');
      const streetF = $('fieldAddrStreet');
      labelF.classList.remove('has-error');
      cityF.classList.remove('has-error');
      streetF.classList.remove('has-error');

      const label   = $('inpAddrLabel').value.trim();
      const city    = $('inpAddrCity').value.trim();
      const street  = $('inpAddrStreet').value.trim();

      let valid = true;
      if (!label)  { labelF.classList.add('has-error');  valid = false; }
      if (!city)   { cityF.classList.add('has-error');   valid = false; }
      if (!street) { streetF.classList.add('has-error'); valid = false; }
      if (!valid) return;

      const addr = {
        label,
        city,
        district:  $('inpAddrDistrict').value.trim(),
        street,
        phone:     $('inpAddrPhone').value.trim(),
        isDefault: $('inpAddrDefault').checked,
      };

      const editId = $('addrEditId').value;
      if (editId) {
        AddressStore.update(editId, addr);
      } else {
        AddressStore.add(addr);
      }

      closeModal();
      this._loadAddresses();
    });

    // Expose open for edit buttons rendered later
    this._openAddrModal = openModal;
  },

  _loadAddresses() {
    const grid = $('addressGrid');
    if (!grid) return;

    const list = AddressStore.all();

    if (!list.length) {
      grid.innerHTML = `
        <button class="address-add-card" id="addAddrEmptyBtn" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>${t('btnAddAddress')}</span>
        </button>`;
      $('addAddrEmptyBtn')?.addEventListener('click', () => this._openAddrModal?.());
      return;
    }

    grid.innerHTML = list.map(addr => `
      <div class="address-card ${addr.isDefault ? 'default' : ''}">
        <div class="address-card__label">
          ${addr.label}
          ${addr.isDefault ? `<span class="address-card__badge">${t('addrDefault')}</span>` : ''}
        </div>
        <div class="address-card__line">${[addr.street, addr.district, addr.city].filter(Boolean).join('، ')}</div>
        ${addr.phone ? `<div class="address-card__line" dir="ltr">${addr.phone}</div>` : ''}
        <div class="address-card__actions">
          <button class="acc-btn acc-btn--outline acc-btn--sm" data-edit-addr="${addr.id}" type="button">${t('btnEdit')}</button>
          ${!addr.isDefault ? `<button class="acc-btn acc-btn--outline acc-btn--sm" data-default-addr="${addr.id}" type="button">${t('btnSetDefault')}</button>` : ''}
          <button class="acc-btn acc-btn--danger acc-btn--sm" data-del-addr="${addr.id}" type="button">${t('btnDelete')}</button>
        </div>
      </div>`).join('') +
      `<button class="address-add-card" id="addAddrCardBtn" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>${t('btnAddAddress')}</span>
      </button>`;

    // Wire up buttons
    $('addAddrCardBtn')?.addEventListener('click', () => this._openAddrModal?.());

    grid.querySelectorAll('[data-edit-addr]').forEach(btn => {
      const addr = list.find(a => a.id === btn.dataset.editAddr);
      if (addr) btn.addEventListener('click', () => this._openAddrModal?.(addr));
    });

    grid.querySelectorAll('[data-default-addr]').forEach(btn => {
      btn.addEventListener('click', () => {
        AddressStore.setDefault(btn.dataset.defaultAddr);
        this._loadAddresses();
      });
    });

    grid.querySelectorAll('[data-del-addr]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm(t('confirmDelete'))) return;
        AddressStore.remove(btn.dataset.delAddr);
        this._loadAddresses();
      });
    });
  },

  /* ── Payments ── */
  _loadPayments() {
    const body = $('paymentsBody');
    if (!body) return;

    const savedCards = CardStore.all();

    /* ── Payment method icons ── */
    const pmtIcons = {
      credit_card: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 471" width="100%" height="100%" role="img" aria-label="Visa"><rect width="750" height="471" rx="40" fill="#1A1F71"/><text x="375" y="330" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-style="italic" font-size="260" fill="white" text-anchor="middle">VISA</text></svg>`,
      mada:        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 24" width="100%" height="100%" role="img" aria-label="Mada"><rect width="52" height="24" rx="5" fill="#00847C"/><text x="26" y="12.5" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="11" fill="white" letter-spacing="0.8">mada</text></svg>`,
      stc_pay:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 28" width="100%" height="100%" role="img" aria-label="STC Pay"><rect width="74" height="28" rx="5" fill="#6A1F8E"/><text x="37" y="14.5" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="11" fill="white" letter-spacing="0.5">STC Pay</text></svg>`,
      apple_pay:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 28" width="100%" height="100%" role="img" aria-label="Apple Pay"><rect width="80" height="28" rx="5" fill="#000"/><path fill="white" d="M15.7 6.2 C16.4 5.3 16.3 4.3 16.3 4.3 C16.3 4.3 15.4 4.4 14.7 5 C14.1 5.5 13.7 6.3 13.9 6.9 C14.7 7 15.4 6.6 15.7 6.2 Z"/><path fill="white" d="M17.5 8.3 C16.5 8.3 15.7 9 15.1 9 C14.5 9 13.7 8.4 12.8 8.4 C11.6 8.4 10.5 9.1 9.9 10.2 C8.7 12.4 9.5 15.7 10.7 17.5 C11.3 18.4 12 19.3 12.9 19.3 C13.7 19.3 14 18.8 15 18.8 C16 18.8 16.3 19.3 17.1 19.3 C18 19.3 18.7 18.4 19.2 17.5 C19.6 16.9 19.8 16.4 20 15.7 C19.1 15.3 18.3 14.4 18.3 13.2 C18.3 12 19 11.1 20 10.5 C19.4 9.6 18.5 8.9 17.5 8.3 Z"/><text x="44" y="14.5" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="10" fill="white" letter-spacing="0.2">Apple Pay</text></svg>`,
      cash:        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" role="img" aria-label="Cash on Delivery" fill="none" stroke="#00847C" stroke-width="2" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>`,
    };

    let html = '';

    // ── Trash icon SVG (Heroicons outline) ──
    const trashIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>`;

    // ── Saved cards section ──
    if (savedCards.length) {
      html += `<div class="pmt-section-title">${t('savedCards')}</div>
        <div class="payment-method-list">
          ${savedCards.map(card => {
            const brandSvg = this._cardBrandSvg(card.brand);
            const date = card.savedAt ? new Date(card.savedAt).toLocaleDateString(_lang === 'ar' ? 'ar-SA' : 'en-GB') : '';
            return `
              <div class="payment-method-card ${card.isDefault ? 'is-default' : ''}">
                <div class="payment-method-card__icon">${brandSvg}</div>
                <div class="payment-method-card__info">
                  <div class="payment-method-card__name">
                    ${card.brand === 'mada' ? t('pmtMada') : card.brand === 'mastercard' ? 'Mastercard' : t('pmtCredit')}
                    ${card.isDefault ? `<span class="payment-method-card__badge">${t('defaultBadge')}</span>` : ''}
                  </div>
                  <div class="payment-method-card__detail" dir="ltr">&bull;&bull;&bull;&bull; ${card.last4}</div>
                  ${card.expiry ? `<div class="payment-method-card__detail">${_lang === 'ar' ? 'تنتهي' : 'Expires'}: ${card.expiry}</div>` : ''}
                </div>
                <div class="payment-method-card__actions">
                  ${!card.isDefault ? `<button class="acc-btn acc-btn--outline acc-btn--sm" data-card-default="${card.id}" type="button">${t('btnSetCardDefault')}</button>` : ''}
                  <button class="pmt-del-btn" data-card-del="${card.id}"
                          type="button" aria-label="${t('btnDelete')}">${trashIcon}</button>
                </div>
                <div class="pmt-confirm-bar" hidden
                     data-card-id="${card.id}" data-was-default="${card.isDefault}">
                  <span class="pmt-confirm-bar__msg">${t('confirmDelCard')}</span>
                  <div class="pmt-confirm-bar__btns">
                    <button class="acc-btn acc-btn--danger acc-btn--sm pmt-confirm-yes"
                            type="button">${t('btnConfirmYes')}</button>
                    <button class="acc-btn acc-btn--outline acc-btn--sm pmt-confirm-no"
                            type="button">${t('cancel')}</button>
                  </div>
                </div>
              </div>`;
          }).join('')}
        </div>`;
    }

    // ── Order payment history section ──
    const email  = _user?.email;
    const orders = OrderStore.forUser(email).filter(o => o.payment_method || o.payment_status === 'paid');
    const seen   = new Set();
    const unique = orders.filter(o => {
      const key = o.payment_method || 'credit_card';
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (unique.length) {
      const pmtNames = {
        credit_card: t('pmtCredit'),
        mada:        t('pmtMada'),
        stc_pay:     t('pmtStc'),
        apple_pay:   t('pmtApple'),
        cash:        t('pmtCash'),
      };
      html += `${savedCards.length ? `<div class="pmt-section-title pmt-list--spaced">${t('orderHistory')}</div>` : ''}
        <div class="payment-method-list">
          ${unique.map(o => {
            const method = o.payment_method || 'credit_card';
            const icon   = pmtIcons[method] || pmtIcons.credit_card;
            const name   = pmtNames[method] || t('pmtCredit');
            const date   = o.created_at ? new Date(o.created_at).toLocaleDateString(_lang === 'ar' ? 'ar-SA' : 'en-GB') : '';
            return `
              <div class="payment-method-card">
                <div class="payment-method-card__icon">${icon}</div>
                <div class="payment-method-card__info">
                  <div class="payment-method-card__name">${name}</div>
                  ${date ? `<div class="payment-method-card__detail">${_lang === 'ar' ? 'آخر استخدام' : 'Last used'}: ${date}</div>` : ''}
                </div>
              </div>`;
          }).join('')}
        </div>`;
    }

    if (!html) {
      html = `
        <div class="acc-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          <div class="acc-empty__title">${t('emptyPmtTitle')}</div>
          <div class="acc-empty__desc">${t('emptyPmtDesc')}</div>
        </div>`;
    }

    body.innerHTML = html;

    // Wire card action buttons
    body.querySelectorAll('[data-card-default]').forEach(btn => {
      btn.addEventListener('click', () => {
        CardStore.setDefault(btn.dataset.cardDefault);
        this._loadPayments();
      });
    });

    // Trash button → reveal inline confirmation bar
    body.querySelectorAll('[data-card-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        const bar = btn.closest('.payment-method-card')?.querySelector('.pmt-confirm-bar');
        if (bar) bar.hidden = false;
      });
    });

    // Confirm deletion: remove card, auto-promote default if needed, re-render
    body.querySelectorAll('.pmt-confirm-yes').forEach(btn => {
      btn.addEventListener('click', () => {
        const bar = btn.closest('.pmt-confirm-bar');
        const cardId    = bar?.dataset.cardId;
        const wasDefault = bar?.dataset.wasDefault === 'true';
        if (!cardId) return;
        CardStore.remove(cardId);
        if (wasDefault) {
          const remaining = CardStore.all();
          if (remaining.length > 0) CardStore.setDefault(remaining[0].id);
        }
        this._loadPayments();
      });
    });

    // Cancel: hide the confirmation bar, no data change
    body.querySelectorAll('.pmt-confirm-no').forEach(btn => {
      btn.addEventListener('click', () => {
        const bar = btn.closest('.pmt-confirm-bar');
        if (bar) bar.hidden = true;
      });
    });
  },

  _detectCardBrand(num) {
    const n = num.replace(/\s/g, '');
    if (/^968/.test(n))                 return 'mada';
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard';
    if (/^4/.test(n))                   return 'visa';
    return 'unknown';
  },

  _cardBrandSvg(brand) {
    if (brand === 'mada') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 24" width="100%" height="100%" role="img" aria-label="Mada"><rect width="52" height="24" rx="5" fill="#00847C"/><text x="26" y="12.5" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="11" fill="white" letter-spacing="0.8">mada</text></svg>`;
    }
    if (brand === 'mastercard') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="100%" height="100%" role="img" aria-label="Mastercard"><rect width="38" height="24" rx="4" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 471" width="100%" height="100%" role="img" aria-label="Visa"><rect width="750" height="471" rx="40" fill="#1A1F71"/><text x="375" y="330" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-style="italic" font-size="260" fill="white" text-anchor="middle">VISA</text></svg>`;
  },

  /* ── Card modal ── */
  _initCardModal() {
    const modal     = $('cardModal');
    if (!modal) return;
    const addBtn    = $('addCardBtn');
    const closeBtn  = $('cardModalClose');
    const cancelBtn = $('cardModalCancel');
    const saveBtn   = $('cardModalSave');
    const numInp    = $('inpCardNum');
    const alertBox  = $('paymentsAlert');

    const openModal = () => {
      $('cardForm')?.reset();
      ['fieldCardNum','fieldCardHolder','fieldCardExpiry','fieldCardCvv'].forEach(id =>
        $(id)?.classList.remove('has-error'));
      if (numInp) numInp.value = '';
      const preview = $('cardBrandPreview');
      if (preview) preview.innerHTML = '';
      modal.classList.add('open');
      numInp?.focus();
    };

    const closeModal = () => modal.classList.remove('open');

    addBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

    // Live card number formatting + brand preview
    numInp?.addEventListener('input', () => {
      const raw    = numInp.value.replace(/\D/g, '').slice(0, 16);
      numInp.value = raw.replace(/(.{4})/g, '$1 ').trim();
      const brand  = this._detectCardBrand(raw);
      const preview = $('cardBrandPreview');
      if (preview) preview.innerHTML = brand !== 'unknown' ? this._cardBrandSvg(brand) : '';
    });

    // Expiry auto-format: insert '/' after MM as user types
    const expInp = $('inpCardExpiry');
    expInp?.addEventListener('input', e => {
      const isBackspace = e.inputType === 'deleteContentBackward';
      let v = expInp.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 2 && !isBackspace) {
        v = v.slice(0, 2) + '/' + v.slice(2);
      }
      expInp.value = v;
    });

    // Save
    saveBtn?.addEventListener('click', () => {
      const numF    = $('fieldCardNum');
      const holderF = $('fieldCardHolder');
      const expF    = $('fieldCardExpiry');
      const cvvF    = $('fieldCardCvv');
      [numF, holderF, expF, cvvF].forEach(f => f?.classList.remove('has-error'));

      const rawNum  = ($('inpCardNum')?.value || '').replace(/\s/g, '');
      const holder  = ($('inpCardHolder')?.value || '').trim();
      const expiry  = ($('inpCardExpiry')?.value || '').trim();
      const cvv     = ($('inpCardCvv')?.value || '').trim();
      const isDefault = $('inpCardDefault')?.checked || false;

      let valid = true;
      if (rawNum.length < 13 || rawNum.length > 19 || !/^\d+$/.test(rawNum)) {
        numF?.classList.add('has-error'); valid = false;
      }
      if (!holder) { holderF?.classList.add('has-error'); valid = false; }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) { expF?.classList.add('has-error'); valid = false; }
      if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
        cvvF?.classList.add('has-error'); valid = false;
      }
      if (!valid) return;

      CardStore.add({
        brand:     this._detectCardBrand(rawNum),
        last4:     rawNum.slice(-4),
        expiry,
        holder,
        isDefault,
      });

      closeModal();
      this._loadPayments();
      if (alertBox) this._showAlert('paymentsAlert', 'success', t('cardSavedOk'));
    });
  },

  /* ── Settings ── */
  _initSettings() {
    // Language options
    document.querySelectorAll('.lang-option').forEach(btn => {
      const lng = btn.dataset.lang;
      if (lng === _lang) btn.classList.add('selected');

      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        if (typeof App !== 'undefined') {
          App.applyLang(lng, true);
          // Sync local _lang and re-render the account page immediately —
          // App.applyLang calls window.currentPage.render() but we also do it
          // here explicitly so the Settings section itself updates in-place.
          _lang = lng;
          AccountPage._applyLang();
          AccountPage._loadOrders();
          AccountPage._loadAddresses();
          AccountPage._loadPayments();
        } else {
          localStorage.setItem('b3d_lang', lng);
          window.location.reload();
        }
      });
    });

    // Notification toggles — persist in localStorage
    const prefs = JSON.parse(localStorage.getItem(LS_NOTIF) || '{"orders":true,"promos":false}');
    const tOrders = $('toggleOrderNotif');
    const tPromos = $('togglePromoNotif');
    if (tOrders) tOrders.checked = !!prefs.orders;
    if (tPromos) tPromos.checked = !!prefs.promos;

    const saveNotif = () => {
      localStorage.setItem(LS_NOTIF, JSON.stringify({
        orders: tOrders?.checked ?? true,
        promos: tPromos?.checked ?? false,
      }));
    };
    tOrders?.addEventListener('change', saveNotif);
    tPromos?.addEventListener('change', saveNotif);

    // Delete account
    $('deleteAccountBtn')?.addEventListener('click', async () => {
      if (!confirm(t('confirmDeleteAccount'))) return;
      // Clear all local data
      ['b3d_session','b3d_user','b3d_local_users','b3d_orders',
       'b3d_addresses','b3d_cart','b3d_notif_prefs'].forEach(k => localStorage.removeItem(k));
      if (typeof AuthService !== 'undefined') {
        await AuthService.signOut();
      }
      window.location.href = 'login.html';
    });
  },

  /* ── Logout ── */
  _initLogout() {
    $('logoutBtn')?.addEventListener('click', async () => {
      if (typeof AuthService !== 'undefined') {
        await AuthService.signOut();
      } else {
        localStorage.removeItem('b3d_session');
        localStorage.removeItem('b3d_user');
      }
      window.location.href = 'login.html';
    });
  },

  /* ── Show alert inside a container ── */
  _showAlert(containerId, type, message) {
    const container = $(containerId);
    if (!container) return;
    const icons = {
      success: '<polyline points="20 6 9 17 4 12"/>',
      error:   '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
      info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    };
    container.style.display = 'block';
    container.innerHTML = `
      <div class="acc-alert acc-alert--${type}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          ${icons[type] || icons.info}
        </svg>
        <span>${message}</span>
      </div>`;
    // Auto-hide success alerts
    if (type === 'success') {
      setTimeout(() => {
        container.style.display = 'none';
      }, 4000);
    }
  },
};

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  AccountPage.init();
});
