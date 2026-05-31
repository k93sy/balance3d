/* ============================================================
   Balance 3D — Nav & Footer Layout Injector (v3)
   Routing logic:
     base = ''       → caller is inside pages/ (all siblings)
     base = 'pages/' → caller is at root (index.html)
   ============================================================ */
'use strict';

/* Resolve a sibling page path based on where the caller lives */
function p(name, base) {
  /* name = bare filename like 'products.html' or 'index.html' */
  if (base === 'pages/') {
    /* root caller → prefix with pages/ except for index.html */
    return name === 'index.html' ? 'index.html' : 'pages/' + name;
  }
  /* pages/ caller → siblings are bare, home goes up one level */
  return name === 'index.html' ? '../index.html' : name;
}

const NavHTML = {
  render(base) {
    base = base || '';
    const t = k => App.t(k);
    return `
<nav class="nav" id="mainNav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner">

    <a href="${p('index.html', base)}" class="nav__logo" aria-label="Balance 3D Home">
      <div class="nav__logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 7 12 12 22 7"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      </div>
      <div class="nav__logo-text">
        <span class="nav__logo-name">Balance 3D</span>
        <span class="nav__logo-tagline" data-i18n="nav.tagline">${t('nav.tagline')}</span>
      </div>
    </a>

    <ul class="nav__menu" role="list">
      <li><a href="${p('index.html',    base)}" class="nav__link" data-i18n="nav.home">${t('nav.home')}</a></li>
      <li><a href="${p('products.html', base)}" class="nav__link" data-i18n="nav.products">${t('nav.products')}</a></li>
      <li><a href="${p('custom.html',   base)}" class="nav__link" data-i18n="nav.custom">${t('nav.custom')}</a></li>
      <li><a href="${p('contact.html',  base)}" class="nav__link" data-i18n="nav.contact">${t('nav.contact')}</a></li>
    </ul>

    <div class="nav__actions">
      <button class="lang-toggle" id="langToggle" aria-label="Toggle language">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span class="lang-current">${App.lang === 'ar' ? 'EN' : 'ع'}</span>
      </button>

      <button type="button" class="nav__cart" id="cartBtn" aria-label="${t('nav.cart')}" aria-haspopup="true" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="nav__cart-count" aria-live="polite" style="display:none">0</span>
      </button>

      <a href="${p('login.html', base)}" class="btn btn-outline btn-sm" id="navAuthBtn" data-i18n="nav.login">${t('nav.login')}</a>

      <button class="nav__hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false" aria-controls="navDrawer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>

  </div>
</nav>

<div class="nav__drawer" id="navDrawer" role="dialog" aria-label="Navigation menu" aria-modal="true">
  <div class="nav__drawer-header">
    <a href="${p('index.html', base)}" class="nav__logo">
      <div class="nav__logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 7 12 12 22 7"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      </div>
      <span class="nav__logo-name">Balance 3D</span>
    </a>
    <button class="nav__drawer-close" id="drawerClose" aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>

  <nav class="nav__drawer-menu" aria-label="Mobile navigation">
    <a href="${p('index.html',    base)}" class="nav__drawer-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span data-i18n="nav.home">${t('nav.home')}</span>
    </a>
    <a href="${p('products.html', base)}" class="nav__drawer-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="15" width="7" height="7"/><rect x="15" y="15" width="7" height="7"/></svg>
      <span data-i18n="nav.products">${t('nav.products')}</span>
    </a>
    <a href="${p('custom.html',   base)}" class="nav__drawer-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      <span data-i18n="nav.custom">${t('nav.custom')}</span>
    </a>
    <a href="${p('contact.html',  base)}" class="nav__drawer-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.41 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .66 2.65 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.65.66A2 2 0 0 1 21.5 17z"/></svg>
      <span data-i18n="nav.contact">${t('nav.contact')}</span>
    </a>
  </nav>

  <div class="nav__drawer-footer">
    <a href="${p('login.html',    base)}" class="btn btn-primary"  data-i18n="nav.login">${t('nav.login')}</a>
    <a href="${p('register.html', base)}" class="btn btn-outline"  data-i18n="nav.register">${t('nav.register')}</a>
    <button class="lang-toggle" id="langToggleMobile" style="margin-top:var(--space-2)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span>${App.lang === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  </div>
</div>

<!-- ===================== CART PANEL ===================== -->
<div class="cart-panel" id="cartPanel" role="dialog" aria-modal="true" aria-label="${App.lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}">

  <div class="cart-panel__header">
    <div class="cart-panel__title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <span id="cartPanelTitle">${App.lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}</span>
      <span class="cart-panel__count-badge" id="cartPanelBadge">0</span>
    </div>
    <button type="button" class="cart-panel__close" id="cartPanelClose" aria-label="${App.lang === 'ar' ? 'إغلاق السلة' : 'Close cart'}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>

  <div class="cart-panel__body" id="cartPanelBody">
    <!-- Rendered by CartPanel.render() -->
  </div>

  <div class="cart-panel__footer" id="cartPanelFooter" style="display:none">
    <div class="cart-totals" id="cartTotals">
      <!-- Rendered by CartPanel.render() -->
    </div>
    <button type="button" class="cart-panel__checkout-btn" id="cartCheckoutBtn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
      <span id="cartCheckoutLabel">${App.lang === 'ar' ? 'إتمام الشراء' : 'Checkout'}</span>
    </button>
    <button type="button" class="cart-panel__continue-btn" id="cartContinueBtn">
      <span id="cartContinueLabel">${App.lang === 'ar' ? 'مواصلة التسوق' : 'Continue Shopping'}</span>
    </button>
  </div>

</div>
    `;
  }
};

const FooterHTML = {

  /* Read footer-related settings from localStorage (same key as admin panel) */
  _getSettings() {
    try {
      const raw = localStorage.getItem('b3d_admin_settings');
      const stored = raw ? JSON.parse(raw) : {};
      /* Merge with defaults so missing keys always have fallback values */
      return Object.assign({
        contactAddress:  'الرياض، المملكة العربية السعودية',
        addressDetail:   'حي التقنية، طريق الملك فهد',
        contactPhone:    '+966 55 123 4567',
        contactEmail:    'hello@balance3d.sa',
        workingHours:    'السبت – الخميس، 9 ص – 6 م',
        socialWhatsapp:  '',
        socialInstagram: '',
        socialX:         '',
        socialLinkedin:  '',
        socialSnapchat:  '',
        socialTiktok:    '',
        socialYoutube:   '',
        showWhatsapp:    true,
        showInstagram:   true,
        showX:           true,
        showLinkedin:    true,
        showSnapchat:    false,
        showTiktok:      false,
        showYoutube:     false,
      }, stored);
    } catch(e) {
      return {
        contactAddress:  'الرياض، المملكة العربية السعودية',
        addressDetail:   'حي التقنية، طريق الملك فهد',
        contactPhone:    '+966 55 123 4567',
        contactEmail:    'hello@balance3d.sa',
        workingHours:    'السبت – الخميس، 9 ص – 6 م',
      };
    }
  },

  /* Build social links HTML — only renders platforms that are enabled and have a URL */
  _buildSocialLinks(s) {
    const icons = {
      whatsapp: {
        label: 'WhatsApp',
        url: s.socialWhatsapp,
        show: s.showWhatsapp,
        svg: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`
      },
      instagram: {
        label: 'Instagram',
        url: s.socialInstagram,
        show: s.showInstagram,
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
      },
      x: {
        label: 'X / Twitter',
        url: s.socialX,
        show: s.showX,
        svg: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
      },
      linkedin: {
        label: 'LinkedIn',
        url: s.socialLinkedin,
        show: s.showLinkedin,
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
      },
      snapchat: {
        label: 'Snapchat',
        url: s.socialSnapchat,
        show: s.showSnapchat,
        svg: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.165-.015h-.105c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/></svg>`
      },
      tiktok: {
        label: 'TikTok',
        url: s.socialTiktok,
        show: s.showTiktok,
        svg: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.6a8.17 8.17 0 0 0 4.78 1.52V6.69a4.85 4.85 0 0 1-1.01-.0z"/></svg>`
      },
      youtube: {
        label: 'YouTube',
        url: s.socialYoutube,
        show: s.showYoutube,
        svg: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
      },
    };

    return Object.values(icons)
      .filter(i => i.show && i.url && i.url.trim())
      .map(i => `<a href="${i.url.trim()}" class="footer__social-link" aria-label="${i.label}" target="_blank" rel="noopener noreferrer">${i.svg}</a>`)
      .join('');
  },

  render(base) {
    base = base || '';
    const l = App.lang;
    const t = k => App.t(k);
    const s = this._getSettings();
    const year = new Date().getFullYear();
    const socialLinks = this._buildSocialLinks(s);

    const address = s.contactAddress || (l === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia');
    const phone   = s.contactPhone   || '+966 55 123 4567';
    const email   = s.contactEmail   || 'hello@balance3d.sa';

    return `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">

      <div class="footer__brand">
        <a href="${p('index.html', base)}" class="footer__logo" aria-label="Balance 3D">
          <div class="footer__logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <span class="footer__logo-name">Balance 3D</span>
        </a>
        <p class="footer__desc">${t('footer.desc')}</p>
        ${socialLinks ? `<div class="footer__social">${socialLinks}</div>` : ''}
      </div>

      <div>
        <h6 class="footer__col-title">${t('footer.quick')}</h6>
        <ul class="footer__links">
          <li><a href="${p('index.html',    base)}" class="footer__link">${t('nav.home')}</a></li>
          <li><a href="${p('products.html', base)}" class="footer__link">${t('nav.products')}</a></li>
          <li><a href="${p('custom.html',   base)}" class="footer__link">${t('nav.custom')}</a></li>
          <li><a href="${p('contact.html',  base)}" class="footer__link">${t('nav.contact')}</a></li>
        </ul>
      </div>

      <div>
        <h6 class="footer__col-title">${t('footer.services')}</h6>
        <ul class="footer__links">
          <li><a href="${p('custom.html', base)}" class="footer__link">${l==='ar'?'طباعة FDM':'FDM Printing'}</a></li>
          <li><a href="${p('custom.html', base)}" class="footer__link">${l==='ar'?'طباعة الراتنج':'Resin Printing'}</a></li>
          <li><a href="${p('custom.html', base)}" class="footer__link">${l==='ar'?'تصميم ثلاثي الأبعاد':'3D Design'}</a></li>
          <li><a href="${p('custom.html', base)}" class="footer__link">${l==='ar'?'نماذج أولية':'Prototyping'}</a></li>
        </ul>
      </div>

      <div>
        <h6 class="footer__col-title">${t('footer.contact')}</h6>
        <div class="footer__contact-item">
          <div class="footer__contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="footer__contact-text">
            <strong>${l==='ar'?'العنوان':'Address'}</strong>
            ${address}
          </div>
        </div>
        <div class="footer__contact-item">
          <div class="footer__contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.41 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.65.66A2 2 0 0 1 22 17.92z"/></svg>
          </div>
          <div class="footer__contact-text">
            <strong>${l==='ar'?'الهاتف':'Phone'}</strong>
            <span dir="ltr">${phone}</span>
          </div>
        </div>
        <div class="footer__contact-item">
          <div class="footer__contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="footer__contact-text">
            <strong>Email</strong>
            <a href="mailto:${email}" style="color:inherit">${email}</a>
          </div>
        </div>
      </div>

    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">© ${year} Balance 3D. ${l==='ar'?'جميع الحقوق محفوظة.':'All rights reserved.'}</p>
      <div class="footer__bottom-links">
        <a href="#" class="footer__bottom-link">${t('footer.privacy')}</a>
        <a href="#" class="footer__bottom-link">${t('footer.terms')}</a>
      </div>
    </div>
  </div>
</footer>
    `;
  }
};

/* ---- Public: inject nav + footer ---- */
function injectLayout(base) {
  base = base || App._layoutBase || '';
  App._layoutBase = base;

  const navMount = document.getElementById('navMount');
  if (navMount) navMount.innerHTML = NavHTML.render(base);

  const footerMount = document.getElementById('footerMount');
  if (footerMount) footerMount.innerHTML = FooterHTML.render(base);
}

/* ---- Auto-init ---- */
document.addEventListener('DOMContentLoaded', () => {
  injectLayout(App._layoutBase || '');
  App.applyLang(App.lang, false);
  Nav.init();
  App.updateCartBadge();

  // Mobile lang toggle
  const mobileLang = document.getElementById('langToggleMobile');
  if (mobileLang) {
    mobileLang.addEventListener('click', () => {
      Nav.closeDrawer();
      App.toggleLang();
    });
  }

  // Initialise account menu
  AccountMenu.init();
});

/* ============================================================
   AccountMenu — slide-in panel (logged-in) or login/register
   buttons (guest). Same RTL-safe pattern as CartPanel.
   ============================================================ */
const AccountMenu = {
  _panel:   null,
  _overlay: null,
  _user:    null,

  /* Called on every page load and after every injectLayout() */
  async init() {
    if (typeof AuthService === 'undefined') return;

    // Resolve button in nav (created fresh by injectLayout each time)
    const btn = document.getElementById('navAuthBtn');
    if (!btn) return;

    // Check session
    let session = null;
    try { session = await AuthService.getSession(); } catch (_) {}

    if (session) {
      // Fetch user profile
      try { this._user = await AuthService.getUser(); } catch (_) {}
      this._renderLoggedInBtn(btn);
    } else {
      this._user = null;
      this._renderGuestBtn(btn);
    }
  },

  /* Logged-in: show avatar initial + first name */
  _renderLoggedInBtn(btn) {
    const lang  = App.lang;
    const user  = this._user;
    const first = user?.firstName || user?.first_name ||
                  (user?.nameEn || user?.name_en || '').split(' ')[0] ||
                  (user?.email || '').split('@')[0] || '';
    const initial = first.charAt(0).toUpperCase() || '?';

    // Replace <a> with a <button> that opens the menu
    const newBtn = document.createElement('button');
    newBtn.type      = 'button';
    newBtn.id        = 'navAuthBtn';
    newBtn.className = 'nav__account-btn';
    newBtn.setAttribute('aria-label', lang === 'ar' ? 'حساب المستخدم' : 'Account');
    newBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span>${first || initial}</span>`;
    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.open();
    });
    btn.replaceWith(newBtn);
  },

  /* Guest: keep the Login link as-is */
  _renderGuestBtn(btn) {
    const lang = App.lang;
    // Ensure it navigates to login, no other behaviour
    if (btn.tagName === 'A') {
      btn.textContent = lang === 'ar' ? 'تسجيل الدخول' : 'Login';
    }
  },

  /* Open the panel */
  open() {
    this._ensurePanel();
    this._panel.classList.add('open');

    // Overlay
    if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    this._overlay = document.createElement('div');
    this._overlay.className = 'overlay';
    this._overlay.setAttribute('aria-hidden', 'true');
    this._overlay.addEventListener('click', () => this.close());
    document.body.appendChild(this._overlay);
    document.body.style.overflow = 'hidden';

    // Close button
    document.getElementById('accountMenuClose')
      ?.addEventListener('click', () => this.close());

    // Escape key
    this._onKey = (e) => { if (e.key === 'Escape') this.close(); };
    document.addEventListener('keydown', this._onKey);
  },

  /* Close the panel */
  close() {
    this._panel?.classList.remove('open');
    if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    document.body.style.overflow = '';
    if (this._onKey) { document.removeEventListener('keydown', this._onKey); this._onKey = null; }
  },

  /* Build (or rebuild) the panel DOM */
  _ensurePanel() {
    // Remove stale panel if present
    document.getElementById('accountMenuPanel')?.remove();

    const l     = App.lang;
    const isAr  = l === 'ar';
    const user  = this._user;
    const first = user?.firstName || user?.first_name ||
                  (user?.nameEn || user?.name_en || '').split(' ')[0] ||
                  (user?.email || '').split('@')[0] || '';
    const last  = user?.lastName  || user?.last_name  ||
                  (user?.nameEn || user?.name_en || '').split(' ').slice(1).join(' ') || '';
    const fullName  = first + (last ? ' ' + last : '');
    const email     = user?.email || '';
    const initial   = first.charAt(0).toUpperCase() || '?';

    const TX = {
      ar: {
        account:'معلومات الحساب', orders:'طلباتي', payments:'طرق الدفع',
        addresses:'عناويني المحفوظة', tracking:'تتبع الطلبات',
        settings:'الإعدادات', logout:'تسجيل الخروج',
        sectionAccount:'الحساب', sectionMore:'المزيد',
        login:'تسجيل الدخول', register:'إنشاء حساب',
        guestMsg:'سجّل دخولك لعرض طلباتك وتفاصيل حسابك',
      },
      en: {
        account:'Account Information', orders:'My Orders', payments:'Payment Methods',
        addresses:'Saved Addresses', tracking:'Order Tracking',
        settings:'Settings', logout:'Sign Out',
        sectionAccount:'Account', sectionMore:'More',
        login:'Sign In', register:'Create Account',
        guestMsg:'Sign in to view your orders and account details',
      },
    };
    const t = k => (TX[l]||TX.en)[k]||(TX.en)[k]||k;

    const icon = (path) =>
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${path}</svg>`;

    const panel = document.createElement('div');
    panel.className  = 'account-menu';
    panel.id         = 'accountMenuPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', isAr ? 'قائمة الحساب' : 'Account menu');

    const base = App._layoutBase || '';
    // Path helper: works from root or pages/
    const href = (page) => base === 'pages/' ? `pages/${page}` : page;

    panel.innerHTML = `
      <!-- Header -->
      <div class="account-menu__header">
        <div class="account-menu__user">
          <div class="account-menu__avatar">${initial}</div>
          <div style="min-width:0">
            <div class="account-menu__name">${fullName || email}</div>
            <div class="account-menu__email">${email}</div>
          </div>
        </div>
        <button class="account-menu__close" id="accountMenuClose"
                aria-label="${isAr ? 'إغلاق' : 'Close'}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="account-menu__nav">
        <div class="account-menu__section-label">${t('sectionAccount')}</div>

        <a href="${href('account.html')}#profile" class="account-menu__item" onclick="AccountMenu.close()">
          ${icon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>')}
          <span>${t('account')}</span>
        </a>

        <a href="${href('account.html')}#orders" class="account-menu__item" onclick="AccountMenu.close()">
          ${icon('<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>')}
          <span>${t('orders')}</span>
        </a>

        <a href="${href('account.html')}#orders" class="account-menu__item" onclick="AccountMenu.close()">
          ${icon('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>')}
          <span>${t('tracking')}</span>
        </a>

        <div class="account-menu__divider"></div>
        <div class="account-menu__section-label">${t('sectionMore')}</div>

        <a href="${href('account.html')}#addresses" class="account-menu__item" onclick="AccountMenu.close()">
          ${icon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>')}
          <span>${t('addresses')}</span>
        </a>

        <a href="${href('account.html')}#payments" class="account-menu__item" onclick="AccountMenu.close()">
          ${icon('<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>')}
          <span>${t('payments')}</span>
        </a>

        <a href="${href('account.html')}#settings" class="account-menu__item" onclick="AccountMenu.close()">
          ${icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>')}
          <span>${t('settings')}</span>
        </a>

        <div class="account-menu__divider"></div>

        <button class="account-menu__item account-menu__item--danger" id="accountLogoutBtn">
          ${icon('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>')}
          <span>${t('logout')}</span>
        </button>
      </nav>`;

    document.body.appendChild(panel);
    this._panel = panel;

    // Wire logout
    document.getElementById('accountLogoutBtn')?.addEventListener('click', async () => {
      this.close();
      if (typeof AuthService !== 'undefined') {
        await AuthService.signOut();
      }
      // Redirect to login
      const base2 = App._layoutBase || '';
      window.location.href = base2 === 'pages/' ? 'pages/login.html' : 'login.html';
    });
  },

  /* Called by App.applyLang so direction change doesn't leave stale panel */
  onLangChange() {
    const panel = document.getElementById('accountMenuPanel');
    if (panel) {
      panel.classList.add('account-menu--instant');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        panel.classList.remove('account-menu--instant');
      }));
    }
    // Re-init to rebuild button label in new language
    this.init();
  },
};

/* Expose globally so onclick="AccountMenu.close()" in menu items works */
if (typeof window !== 'undefined') window.AccountMenu = AccountMenu;
