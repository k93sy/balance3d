/* ============================================================
   Balance 3D — Custom Page JS
   ============================================================ */

const CustomPage = {

  init() {
    this.renderTranslations();
    this.initDropzone();
    this.initMaterialSelector();
    this.initFaq();
    this.initPriceEstimator();
  },

  renderTranslations() {
    const lang = App.lang;
    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = App.t(key);
      if (text) el.textContent = text;
    });
    // Update HTML lang/dir
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  },

  initDropzone() {
    const zone = document.getElementById('dropzone');
    const input = document.getElementById('fileInput');
    const selected = document.getElementById('fileSelected');
    const selectedName = document.getElementById('selectedFileName');
    if (!zone || !input) return;

    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (e.dataTransfer.files.length) {
        this.handleFile(e.dataTransfer.files[0], selected, selectedName);
      }
    });
    input.addEventListener('change', () => {
      if (input.files.length) {
        this.handleFile(input.files[0], selected, selectedName);
      }
    });
  },

  handleFile(file, selected, selectedName) {
    const maxMB = 50;
    if (file.size > maxMB * 1024 * 1024) {
      App.toast(App.t('custom.file.toobig') || 'File too large (max 50 MB)', 'error');
      return;
    }
    const allowed = ['.stl', '.obj', '.step', '.stp', '.3mf', '.iges', '.igs'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) {
      App.toast(App.t('custom.file.invalid') || 'Invalid file type', 'error');
      return;
    }
    if (selectedName) selectedName.textContent = file.name;
    if (selected) selected.classList.add('show');
    this.updatePriceEstimate();
    App.toast(App.t('custom.file.uploaded') || `File "${file.name}" ready`, 'success');
  },

  initMaterialSelector() {
    document.querySelectorAll('.material-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.material-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        this.updatePriceEstimate();
      });
    });
  },

  prices: { pla: 35, abs: 45, petg: 50, resin: 80, nylon: 95, tpu: 60 },

  initPriceEstimator() {
    const qtyInput = document.getElementById('quoteQty');
    if (qtyInput) qtyInput.addEventListener('input', () => this.updatePriceEstimate());
  },

  updatePriceEstimate() {
    const selected = document.querySelector('.material-option.selected');
    const material = selected ? selected.getAttribute('data-material') : 'pla';
    const qty = parseInt(document.getElementById('quoteQty')?.value || 1, 10);
    const basePrice = this.prices[material] || 35;
    const total = basePrice * qty;
    const el = document.getElementById('priceEstimate');
    if (el) {
      const symbol = App.lang === 'ar' ? 'ر.س' : 'SAR';
      el.textContent = `${symbol} ${total}`;
    }
  },

  initFaq() {
    document.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    });
  }
};

window.currentPage = CustomPage;
