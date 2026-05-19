/* ============================================================
   Balance 3D — Home Page JS
   ============================================================ */

'use strict';

// ============================================================
// HERO TITLE RENDER
// ============================================================
function renderHeroTitle() {
  const el = document.getElementById('heroTitle');
  if (!el) return;
  const l = App.lang;
  if (l === 'ar') {
    el.innerHTML = `${App.t('hero.title.1')} <em>${App.t('hero.title.accent')}</em> ${App.t('hero.title.2')}`;
  } else {
    el.innerHTML = `${App.t('hero.title.1')} <em>${App.t('hero.title.accent')}</em><br>${App.t('hero.title.2')}`;
  }
}

// ============================================================
// HERO 3D CANVAS — animated wireframe cube + particles
// ============================================================
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    const wrap = canvas.parentElement;
    canvas.width  = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- 3D helpers ----
  function project(x, y, z, fov, cx, cy) {
    const scale = fov / (fov + z);
    return { x: cx + x * scale, y: cy + y * scale, s: scale };
  }

  function rotateX(p, a) {
    return { x: p.x, y: p.y * Math.cos(a) - p.z * Math.sin(a), z: p.y * Math.sin(a) + p.z * Math.cos(a) };
  }
  function rotateY(p, a) {
    return { x: p.x * Math.cos(a) + p.z * Math.sin(a), y: p.y, z: -p.x * Math.sin(a) + p.z * Math.cos(a) };
  }

  // Cube vertices
  const size = 110;
  const rawVerts = [
    [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
    [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1]
  ].map(([x,y,z]) => ({ x: x*size, y: y*size, z: z*size }));

  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];

  // Particles
  const particles = Array.from({length: 40}, () => ({
    x: (Math.random()-0.5)*600,
    y: (Math.random()-0.5)*600,
    z: (Math.random()-0.5)*600,
    r: Math.random()*2+0.5,
    speed: Math.random()*0.4+0.1,
    angle: Math.random()*Math.PI*2
  }));

  // Inner smaller cubes
  const innerSizes = [55, 80];
  const innerVerts = innerSizes.map(s =>
    rawVerts.map(v => ({ x: v.x*(s/size), y: v.y*(s/size), z: v.z*(s/size) }))
  );

  let ax = 0.3, ay = 0;

  function draw(t) {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ax = 0.3 + Math.sin(t * 0.0003) * 0.15;
    ay += 0.008;

    const fov = 400, cx = W/2, cy = H/2;

    // Draw particles
    particles.forEach(p => {
      p.angle += p.speed * 0.01;
      const rp = rotateY(rotateX(p, ax), ay + p.angle * 0.1);
      const proj = project(rp.x, rp.y, rp.z, fov, cx, cy);
      const alpha = Math.max(0, Math.min(1, (proj.s - 0.3) * 2)) * 0.4;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, p.r * proj.s, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,194,255,${alpha})`;
      ctx.fill();
    });

    // Draw inner cubes (faint)
    innerVerts.forEach((verts, idx) => {
      const opacity = 0.06 + idx * 0.04;
      const rotated = verts.map(v => rotateY(rotateX(v, ax), ay));
      const projected = rotated.map(v => project(v.x, v.y, v.z, fov, cx, cy));

      edges.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(0,194,255,${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    });

    // Draw main cube
    const rotated = rawVerts.map(v => rotateY(rotateX(v, ax), ay));
    const projected = rotated.map(v => project(v.x, v.y, v.z, fov, cx, cy));

    edges.forEach(([a, b]) => {
      const pa = projected[a], pb = projected[b];
      const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
      grad.addColorStop(0, 'rgba(0,194,255,0.7)');
      grad.addColorStop(1, 'rgba(10,10,15,0.3)');
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Glow at vertices
    projected.forEach(p => {
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 5*p.s);
      grd.addColorStop(0, 'rgba(0,194,255,0.9)');
      grd.addColorStop(1, 'rgba(0,194,255,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5*p.s, 0, Math.PI*2);
      ctx.fillStyle = grd;
      ctx.fill();
    });

    // Center glow
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
    cg.addColorStop(0, 'rgba(0,194,255,0.05)');
    cg.addColorStop(1, 'rgba(0,194,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 80, 0, Math.PI*2);
    ctx.fillStyle = cg;
    ctx.fill();

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

// ============================================================
// HOME PRODUCTS GRID
// ============================================================
async function renderHomeProducts() {
  const grid = document.getElementById('homeProductsGrid');
  if (!grid) return;

  // Always read the live store (picks up admin edits instantly)
  if (typeof ProductStore !== 'undefined') {
    try { PRODUCTS = await ProductStore.getAll(); } catch(_) {}
  }

  // Show first 4 active products
  const featured = PRODUCTS.filter(p => p.status !== 'draft').slice(0, 4);
  const l = App.lang;

  grid.innerHTML = featured.map((p, i) => {
    const badgeMap = {
      popular:    `<span class="badge badge-accent" data-i18n="product.popular">${App.t('product.popular')}</span>`,
      new:        `<span class="badge badge-success" data-i18n="product.new">${App.t('product.new')}</span>`,
      sale:       `<span class="badge badge-warm" data-i18n="product.sale">${App.t('product.sale')}</span>`,
      trending:   `<span class="badge badge-accent">${l === 'ar' ? 'رائج' : 'Trending'}</span>`,
      bestseller: `<span class="badge badge-warm">${l === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller'}</span>`,
    };
    const badge  = p.badge ? (badgeMap[p.badge] || '') : '';
    const imgSrc = getProductPlaceholderSvg(p);

    return `
      <div class="card product-card reveal reveal-delay-${i + 1}">
        <div class="product-card__image">
          <img src="${imgSrc}" alt="${(p.title?.[l] || '').replace(/"/g,'&quot;')}" loading="lazy"/>
          ${badge ? `<div class="product-card__badge">${badge}</div>` : ''}
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${p.category?.[l] || ''}</span>
          <h3 class="product-card__title">${p.title?.[l] || ''}</h3>
          <p class="product-card__desc">${p.desc?.[l] || ''}</p>
          <div class="product-card__footer">
            <div class="product-card__price">
              ${p.price} <span data-i18n="product.sar">${App.t('product.sar')}</span>
            </div>
            <button class="btn btn-primary btn-sm" data-pid="${p.id}"
                    onclick="App.addToCart(typeof ProductStore!=='undefined' ? ProductStore.getById(this.dataset.pid) : PRODUCTS.find(x=>x.id===this.dataset.pid))">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span data-i18n="product.add">${App.t('product.add')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  Reveal.refresh();
}

// ============================================================
// CTA CHECKLIST
// ============================================================
function renderCtaChecklist() {
  const el = document.getElementById('ctaChecklist');
  if (!el) return;
  const l = App.lang;
  const items = l === 'ar' ? [
    'ارفع ملف STL أو OBJ أو STP',
    'اختر من أكثر من ١٥ مادة',
    'استلم عرض سعرك خلال ساعات',
    'توصيل سريع لجميع أنحاء السعودية',
    'ضمان الجودة على كل طلب',
  ] : [
    'Upload STL, OBJ, or STP files',
    'Choose from 15+ materials',
    'Get a quote within hours',
    'Fast delivery across Saudi Arabia',
    'Quality guarantee on every order',
  ];

  el.innerHTML = items.map(item => `
    <div class="cta-check-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      ${item}
    </div>
  `).join('');
}

// ============================================================
// TESTIMONIALS
// ============================================================
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  const l = App.lang;

  const testimonials = l === 'ar' ? [
    { name: 'محمد الغامدي', role: 'مهندس تصميم', text: 'جودة استثنائية وتسليم في الوقت المحدد. أفضل متجر طباعة ثلاثية الأبعاد في الرياض بدون منازع.', rating: 5, initial: 'م' },
    { name: 'سارة العتيبي', role: 'مصممة جرافيك', text: 'طلبت نماذج مخصصة لمشروعي وكانت النتيجة مذهلة. الفريق محترف جداً والتواصل سهل.', rating: 5, initial: 'س' },
    { name: 'أحمد القحطاني', role: 'صاحب متجر', text: 'سرعة التسليم ودقة الطباعة فاقت توقعاتي. سأكون عميلاً دائماً بكل تأكيد.', rating: 5, initial: 'أ' },
  ] : [
    { name: 'Mohammed Al-Ghamdi', role: 'Design Engineer', text: 'Exceptional quality and on-time delivery. The best 3D printing store in Riyadh, hands down. Will order again.', rating: 5, initial: 'M' },
    { name: 'Sarah Al-Otaibi', role: 'Graphic Designer', text: 'Ordered custom models for my project and the result was stunning. The team is very professional and easy to communicate with.', rating: 5, initial: 'S' },
    { name: 'Ahmed Al-Qahtani', role: 'Business Owner', text: 'Delivery speed and print accuracy exceeded my expectations. I will definitely be a returning customer.', rating: 5, initial: 'A' },
  ];

  grid.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-card reveal reveal-delay-${i+1}">
      <div class="testimonial-stars">
        ${Array(t.rating).fill(`<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initial}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  Reveal.refresh();
}

// ============================================================
// MARQUEE UPDATE
// ============================================================
function updateMarquee() {
  const label = document.getElementById('marqueeLabel');
  if (label) {
    label.textContent = App.lang === 'ar'
      ? 'موثوق به من قبل المحترفين في جميع أنحاء المملكة'
      : 'Trusted by professionals across Saudi Arabia';
  }
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const items = App.lang === 'ar'
      ? ['طباعة FDM','طباعة الراتنج','تصميم ثلاثي الأبعاد','نماذج أولية','تصاميم مخصصة','توصيل سريع']
      : ['FDM Printing','Resin Printing','3D Design','Prototyping','Custom Models','Fast Delivery'];
    const doubled = [...items, ...items];
    track.innerHTML = doubled.map(i => `<span class="marquee-item">${i}</span>`).join('');
  }
}

// ============================================================
// PAGE RENDER (called on lang change)
// ============================================================
window.currentPage = {
  render() {
    renderHeroTitle();
    renderHomeProducts().catch(e => console.error('[Home]', e));
    renderCtaChecklist();
    renderTestimonials();
    updateMarquee();
    Reveal.refresh();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderHeroTitle();
  initHeroCanvas();
  renderHomeProducts();
  renderCtaChecklist();
  renderTestimonials();
  updateMarquee();
});
