/* ============================================================
   Balance 3D — Contact Page JS
   ============================================================ */

const ContactPage = {

  /* ── SVG icon strings shared with layout.js ── */
  _SOCIAL_ICONS: {
    whatsapp: {
      label: 'WhatsApp',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`
    },
    instagram: {
      label: 'Instagram',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
    },
    x: {
      label: 'X / Twitter',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    linkedin: {
      label: 'LinkedIn',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
    },
    snapchat: {
      label: 'Snapchat',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.165-.015h-.105c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/></svg>`
    },
    tiktok: {
      label: 'TikTok',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.6a8.17 8.17 0 0 0 4.78 1.52V6.69a4.85 4.85 0 0 1-1.01-.0z"/></svg>`
    },
    youtube: {
      label: 'YouTube',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
    },
  },

  /* ── Read settings from the same localStorage key as the admin panel ── */
  _getSettings() {
    try {
      const raw = localStorage.getItem('b3d_admin_settings');
      const stored = raw ? JSON.parse(raw) : {};
      return Object.assign({
        contactAddress:  'الرياض، المملكة العربية السعودية',
        addressDetail:   'حي التقنية، طريق الملك فهد',
        contactPhone:    '+966 55 123 4567',
        contactEmail:    'hello@balance3d.sa',
        workingHours:    'السبت – الخميس، 9 ص – 6 م',
        socialWhatsapp:  '', socialInstagram: '', socialX:        '',
        socialLinkedin:  '', socialSnapchat:  '', socialTiktok:   '', socialYoutube: '',
        showWhatsapp: true, showInstagram: true, showX:       true,
        showLinkedin: true, showSnapchat: false, showTiktok: false, showYoutube: false,
      }, stored);
    } catch(e) {
      return {
        contactAddress: 'الرياض، المملكة العربية السعودية',
        addressDetail:  'حي التقنية، طريق الملك فهد',
        contactPhone:   '+966 55 123 4567',
        contactEmail:   'hello@balance3d.sa',
        workingHours:   'السبت – الخميس، 9 ص – 6 م',
      };
    }
  },

  /* ── Populate all dynamic fields from settings ── */
  loadDynamicSettings() {
    const s = this._getSettings();

    /* Phone */
    const phoneEl = document.getElementById('cPhoneValue');
    if (phoneEl) phoneEl.textContent = s.contactPhone;

    const phoneNoteEl = document.getElementById('cPhoneNote');
    if (phoneNoteEl) phoneNoteEl.textContent = s.workingHours;

    /* Email */
    const emailEl = document.getElementById('cEmailValue');
    if (emailEl) {
      emailEl.textContent = s.contactEmail;
      emailEl.href = 'mailto:' + s.contactEmail;
    }

    /* Address */
    const locEl = document.getElementById('cLocationValue');
    if (locEl) locEl.textContent = s.contactAddress;

    const locNoteEl = document.getElementById('cLocationNote');
    if (locNoteEl) locNoteEl.textContent = s.addressDetail;

    /* Working hours box */
    const hoursEl = document.getElementById('cWorkingHours');
    if (hoursEl) {
      hoursEl.innerHTML = `
        <div class="contact-hours__row" style="border-bottom:none">
          <span class="contact-hours__time" style="color:white">${s.workingHours}</span>
        </div>`;
    }

    /* Map text */
    const mapEl = document.getElementById('cMapText');
    if (mapEl) {
      mapEl.textContent = s.contactAddress + (s.addressDetail ? ' — ' + s.addressDetail : '');
    }

    /* Social links */
    this._renderSocialLinks(s);
  },

  _renderSocialLinks(s) {
    const container = document.getElementById('cSocialLinks');
    const section   = document.getElementById('contactSocialSection');
    if (!container) return;

    /* Map: key → { urlKey, showKey } */
    const platforms = [
      { key: 'whatsapp',  url: s.socialWhatsapp,  show: s.showWhatsapp  },
      { key: 'instagram', url: s.socialInstagram, show: s.showInstagram },
      { key: 'x',         url: s.socialX,          show: s.showX         },
      { key: 'linkedin',  url: s.socialLinkedin,  show: s.showLinkedin  },
      { key: 'snapchat',  url: s.socialSnapchat,  show: s.showSnapchat  },
      { key: 'tiktok',    url: s.socialTiktok,    show: s.showTiktok    },
      { key: 'youtube',   url: s.socialYoutube,   show: s.showYoutube   },
    ];

    const html = platforms
      .filter(p => p.show !== false && p.url && p.url.trim())
      .map(p => {
        const icon = this._SOCIAL_ICONS[p.key];
        return `<a href="${p.url.trim()}" class="contact-social__link" aria-label="${icon.label}" target="_blank" rel="noopener noreferrer">${icon.svg}</a>`;
      })
      .join('');

    container.innerHTML = html;

    /* Hide the whole section if no links are configured */
    if (section) section.style.display = html ? '' : 'none';
  },

  init() {
    this.loadDynamicSettings();
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
