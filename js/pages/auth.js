/* ============================================================
   Balance 3D — Auth Page JS
   ============================================================ */

'use strict';

const AuthPage = {
  mode: 'login',

  init(mode) {
    this.mode = mode;
    this.updateVisualPanel();
    this.updateFormLabels();
    this.bindFormEvents();
  },

  updateVisualPanel() {
    const l = App.lang;
    const headingEl = document.getElementById('authVisualHeading');
    const descEl    = document.getElementById('authVisualDesc');
    const featEl    = document.getElementById('authVisualFeatures');

    if (headingEl) headingEl.textContent = App.t(`auth.visual.heading.${this.mode}`);

    if (descEl) {
      const descs = {
        login: {
          ar: 'سجّل دخولك للوصول إلى طلباتك، تتبع شحناتك، وإدارة تصاميمك المخصصة.',
          en: 'Sign in to access your orders, track shipments, and manage your custom designs.'
        },
        register: {
          ar: 'أنشئ حسابك المجاني وابدأ رحلتك في عالم الطباعة ثلاثية الأبعاد.',
          en: 'Create your free account and start your 3D printing journey today.'
        },
        admin: {
          ar: 'بوابة الإدارة الآمنة — للموظفين المصرح لهم فقط.',
          en: 'Secure admin portal — authorized staff only.'
        }
      };
      descEl.textContent = descs[this.mode]?.[l] || descs[this.mode]?.en || '';
    }

    if (featEl) {
      const features = {
        login: {
          ar: ['تتبع طلباتك في الوقت الفعلي', 'الوصول إلى سجل الطلبات', 'إدارة تصاميمك المخصصة', 'عروض حصرية للأعضاء'],
          en: ['Track your orders in real time', 'Access order history', 'Manage custom designs', 'Exclusive member offers']
        },
        register: {
          ar: ['حساب مجاني تماماً', 'تتبع الطلبات والشحن', 'حفظ التصاميم المخصصة', 'دعم العملاء على مدار الساعة'],
          en: ['Completely free account', 'Order & shipment tracking', 'Save custom designs', '24/7 customer support']
        },
        admin: {
          ar: ['إدارة المنتجات والمخزون', 'عرض وإدارة الطلبات', 'إدارة العملاء', 'تقارير الأداء والمبيعات'],
          en: ['Manage products & inventory', 'View & manage orders', 'Customer management', 'Performance & sales reports']
        }
      };

      const list = features[this.mode]?.[l] || features[this.mode]?.en || [];
      featEl.innerHTML = list.map(item => `
        <div class="auth-visual__feature">
          <div class="auth-visual__feature-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          ${item}
        </div>
      `).join('');
    }
  },

  updateFormLabels() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const val = App.t(key);
      if (attr) el.setAttribute(attr, val);
      else el.textContent = val;
    });

    // Update lang toggle
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.querySelector('.lang-current').textContent = App.lang === 'ar' ? 'EN' : 'ع';
    }
  },

  bindFormEvents() {
    // Password toggle
    const togglePw = document.getElementById('togglePw');
    const pwField  = document.getElementById('password');
    if (togglePw && pwField) {
      togglePw.addEventListener('click', () => {
        const isHidden = pwField.type === 'password';
        pwField.type = isHidden ? 'text' : 'password';
        togglePw.innerHTML = isHidden
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
               <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
               <line x1="1" y1="1" x2="23" y2="23"/>
             </svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
             </svg>`;
      });
    }

    // Form submission
    const loginForm    = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const adminForm    = document.getElementById('adminForm');

    if (loginForm) loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLoginSubmit();
    });
    if (registerForm) registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleRegisterSubmit();
    });
    if (adminForm) adminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAdminSubmit();
    });
  },

  setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span>`;
    } else {
      btn.disabled = false;
      btn.querySelector('span')?.remove();
    }
  },

  showError(fieldId, msg) {
    const err = document.getElementById(fieldId + 'Error');
    const errMsg = document.getElementById(fieldId + 'ErrorMsg');
    const input  = document.getElementById(fieldId);
    if (err) err.style.display = 'flex';
    if (errMsg) errMsg.textContent = msg;
    if (input) input.style.borderColor = 'var(--clr-error)';
  },

  clearErrors() {
    document.querySelectorAll('.form-error').forEach(e => e.style.display = 'none');
    document.querySelectorAll('.form-input').forEach(i => i.style.borderColor = '');
  },

  handleLoginSubmit() {
    this.clearErrors();
    const email = document.getElementById('email')?.value?.trim();
    const password = document.getElementById('password')?.value;
    const l = App.lang;
    let valid = true;

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.showError('email', l==='ar'?'يرجى إدخال بريد إلكتروني صحيح':'Please enter a valid email');
      valid = false;
    }
    if (!password || password.length < 6) {
      this.showError('password', l==='ar'?'كلمة المرور يجب أن تكون ٦ أحرف على الأقل':'Password must be at least 6 characters');
      valid = false;
    }
    if (!valid) return;

    // Simulate login
    const btn = document.getElementById('loginBtn');
    if (btn) {
      btn.disabled = true;
      const origContent = btn.innerHTML;
      btn.innerHTML = `<span class="spinner" style="border-color:rgba(255,255,255,0.3);border-top-color:white"></span>`;
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = origContent;
        Toast.show(l==='ar'?'تم تسجيل الدخول بنجاح ✓':'Logged in successfully ✓', 'success');
        setTimeout(() => { window.location.href = '../index.html'; }, 900);
      }, 1200);
    }
  },

  handleRegisterSubmit() {
    this.clearErrors();
    const l = App.lang;
    const email    = document.getElementById('regEmail')?.value?.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirm  = document.getElementById('regConfirm')?.value;
    let valid = true;

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.showError('regEmail', l==='ar'?'يرجى إدخال بريد إلكتروني صحيح':'Please enter a valid email');
      valid = false;
    }
    if (!password || password.length < 8) {
      this.showError('regPassword', l==='ar'?'كلمة المرور يجب أن تكون ٨ أحرف على الأقل':'Password must be at least 8 characters');
      valid = false;
    }
    if (password !== confirm) {
      this.showError('regConfirm', l==='ar'?'كلمتا المرور غير متطابقتين':'Passwords do not match');
      valid = false;
    }
    if (!valid) return;

    const btn = document.getElementById('registerBtn');
    if (btn) {
      btn.disabled = true;
      const orig = btn.innerHTML;
      btn.innerHTML = `<span class="spinner" style="border-color:rgba(255,255,255,0.3);border-top-color:white"></span>`;
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        Toast.show(l==='ar'?'تم إنشاء الحساب بنجاح ✓':'Account created successfully ✓', 'success');
        setTimeout(() => { window.location.href = '../index.html'; }, 900);
      }, 1400);
    }
  },

  handleAdminSubmit() {
    const l = App.lang;
    const btn = document.getElementById('adminBtn');
    if (btn) {
      btn.disabled = true;
      const orig = btn.innerHTML;
      btn.innerHTML = `<span class="spinner" style="border-color:rgba(255,255,255,0.3);border-top-color:white"></span>`;
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        Toast.show(l==='ar'?'خطأ: بيانات الدخول غير صحيحة':'Error: Invalid credentials', 'error');
      }, 1000);
    }
  }
};

// Init toast (auth pages don't load full layout.js)
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  // Update lang toggle initial state
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.querySelector('.lang-current').textContent = App.lang === 'ar' ? 'EN' : 'ع';
  }
});
