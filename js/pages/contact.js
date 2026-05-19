/* ============================================================
   Balance 3D — Contact Page JS
   ============================================================ */

const ContactPage = {

  init() {
    this.renderTranslations();
    this.initSubjectPills();
    this.initForm();
  },

  renderTranslations() {
    const lang = App.lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = App.t(key);
      if (text) el.textContent = text;
    });
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  },

  initSubjectPills() {
    document.querySelectorAll('.subject-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.subject-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const subjectInput = document.getElementById('contactSubject');
        if (subjectInput) subjectInput.value = pill.textContent.trim();
      });
    });
  },

  initForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('contactSuccess');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!this.validate(form)) return;

      const btn = form.querySelector('[type="submit"]');
      btn.classList.add('btn--loading');
      btn.disabled = true;

      // Simulate send
      await new Promise(r => setTimeout(r, 1800));

      btn.classList.remove('btn--loading');
      btn.disabled = false;
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });
  },

  validate(form) {
    let valid = true;
    const name = form.querySelector('#contactName');
    const email = form.querySelector('#contactEmail');
    const message = form.querySelector('#contactMessage');

    [name, email, message].forEach(field => {
      if (!field) return;
      const err = document.getElementById(field.id + 'Error');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (err) { err.style.display = 'flex'; err.querySelector('span').textContent = App.t('form.required') || 'Required'; }
        valid = false;
      } else {
        field.classList.remove('error');
        if (err) err.style.display = 'none';
      }
    });

    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      const err = document.getElementById('contactEmailError');
      if (err) { err.style.display = 'flex'; err.querySelector('span').textContent = App.t('form.email.invalid') || 'Invalid email'; }
      valid = false;
    }

    return valid;
  }
};

window.currentPage = ContactPage;
