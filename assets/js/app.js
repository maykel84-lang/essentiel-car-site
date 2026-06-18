/* =========================================================
   ESSENTIEL CAR — Main Application
   GSAP · Lenis · SplitType · Custom Cursor · i18n
   ========================================================= */

/* ── 1. Page Loader ── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('is-loading');
      startAnimations();
    }, 1600);
  });
}

/* ── 2. Lenis Smooth Scroll ── */
let lenis;
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ── 3. Custom Cursor ── */
function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let hovering = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  function animCursor() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  const magnetEls = document.querySelectorAll('[data-magnetic], a, button, .product-card, .category-card, .faq-question');
  magnetEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hovering');
      dot.style.transform = 'translate(-50%,-50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hovering');
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  document.addEventListener('mousedown', () => ring.classList.add('is-clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('is-clicking'));
}

/* ── 4. Hero Canvas — Speed Streaks ── */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    const isRed = Math.random() > 0.85;
    return {
      x:    W + Math.random() * 200,
      y:    Math.random() * H,
      len:  Math.random() * 180 + 40,
      spd:  Math.random() * 9 + 2,
      op:   Math.random() * 0.25 + 0.04,
      w:    Math.random() * 1.4 + 0.3,
      col:  isRed ? '#E0000C' : '#ffffff',
    };
  }

  function reset(p) {
    p.x   = W + Math.random() * 200;
    p.y   = Math.random() * H;
    p.len = Math.random() * 180 + 40;
    p.spd = Math.random() * 9 + 2;
    p.op  = Math.random() * 0.25 + 0.04;
    p.w   = Math.random() * 1.4 + 0.3;
    p.col = Math.random() > 0.85 ? '#E0000C' : '#ffffff';
  }

  function init() {
    resize();
    for (let i = 0; i < 80; i++) {
      const p = mkParticle();
      p.x = Math.random() * W;
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      const grad = ctx.createLinearGradient(p.x - p.len, p.y, p.x, p.y);
      const hex  = Math.floor(p.op * 255).toString(16).padStart(2, '0');
      grad.addColorStop(0, p.col + '00');
      grad.addColorStop(0.6, p.col + hex);
      grad.addColorStop(1, p.col + '00');
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.w;
      ctx.moveTo(p.x - p.len, p.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      p.x -= p.spd;
      if (p.x < -p.len) reset(p);
    });
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', () => { resize(); });
}

/* ── 5. Navbar ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  ScrollTrigger.create({
    start: 80,
    onEnter:      () => nav.classList.add('scrolled'),
    onLeaveBack:  () => nav.classList.remove('scrolled'),
  });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ── 6. Scroll Progress Bar ── */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { scrub: true },
  });
}

/* ── 7. Hero Animations ── */
function initHeroAnim() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  const badge = document.querySelector('.hero-badge');
  const lines = document.querySelectorAll('.hero-title-line');
  const sub   = document.querySelector('.hero-sub');
  const ctas  = document.querySelector('.hero-ctas');
  const trust = document.querySelector('.hero-trust-line');
  const stats = document.querySelector('.hero-stats');

  if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.7 }, 0.1);

  if (lines.length) {
    if (typeof SplitType !== 'undefined') {
      lines.forEach((line, i) => {
        const split = new SplitType(line, { types: 'chars' });
        tl.from(split.chars, {
          opacity: 0,
          y: 60,
          rotateX: -40,
          stagger: 0.025,
          duration: 0.8,
          ease: 'back.out(1.4)',
        }, 0.2 + i * 0.15);
      });
    } else {
      tl.from(lines, { opacity: 0, y: 50, stagger: 0.15, duration: 0.8 }, 0.2);
    }
  }

  if (sub)   tl.to(sub,   { opacity: 1, y: 0, duration: 0.8 }, 0.7);
  if (ctas)  tl.to(ctas,  { opacity: 1, y: 0, duration: 0.7 }, 0.85);
  if (trust) tl.to(trust, { opacity: 1, y: 0, duration: 0.6 }, 1.0);
  if (stats) tl.to(stats, { opacity: 1, y: 0, duration: 0.7 }, 1.1);
}

/* ── 8. Scroll Reveal Animations ── */
function initScrollReveal() {
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
  gsap.utils.toArray('[data-reveal-left]').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
  gsap.utils.toArray('[data-reveal-right]').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
  gsap.utils.toArray('[data-reveal-scale]').forEach(el => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 0.9,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Stagger grids — fromTo so children with CSS opacity:0 still animate to visible
  gsap.utils.toArray('[data-stagger]').forEach(parent => {
    const children = parent.children;
    gsap.fromTo(children,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: parent, start: 'top 82%', once: true },
      }
    );
  });

  // Section titles with SplitType
  if (typeof SplitType !== 'undefined') {
    document.querySelectorAll('[data-split]').forEach(el => {
      const split = new SplitType(el, { types: 'words' });
      gsap.from(split.words, {
        opacity: 0,
        y: 40,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
  }
}

/* ── 9. Stats Counter ── */
function initStats() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
    const isFloat = el.dataset.float === 'true';
    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = isFloat
          ? this.targets()[0].val.toFixed(1)
          : Math.round(this.targets()[0].val).toLocaleString('fr-FR');
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/* ── 10. FAQ Accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item only if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Bouton "Voir plus / Voir moins"
  const moreBtn  = document.getElementById('faqMoreBtn');
  const faqExtra = document.getElementById('faqExtra');
  if (moreBtn && faqExtra) {
    const label = moreBtn.querySelector('.faq-more-label');
    moreBtn.addEventListener('click', () => {
      const isOpen = faqExtra.classList.toggle('open');
      moreBtn.classList.toggle('open', isOpen);
      moreBtn.setAttribute('aria-expanded', isOpen);
      faqExtra.setAttribute('aria-hidden', !isOpen);
      label.textContent = isOpen ? 'Voir moins de questions' : 'Voir les 10 autres questions';
    });
  }
}

/* ── 11. Reviews Carousel ── */
function initCarousel() {
  const track   = document.querySelector('.reviews-carousel');
  const btnPrev = document.querySelector('.carousel-prev');
  const btnNext = document.querySelector('.carousel-next');
  const dots    = document.querySelectorAll('.carousel-dot');
  if (!track) return;

  let current = 0;
  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const card = cards[current];
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance
  let autoTimer = setInterval(() => goTo((current + 1) % total), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo((current + 1) % total), 5000);
  });

  // Init first dot
  dots[0]?.classList.add('active');
}

/* ── 12. Products Renderer ── */
function renderBestSellers() {
  const grid = document.getElementById('bestSellersGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;
  const lang  = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key = lang === 'en' ? 'en' : 'fr';
  const bs = PRODUCTS.filter(p => p.badgeType === 'bestseller' && p.category !== 'pack');
  grid.innerHTML = bs.map((p, i) => buildProductCard(p, t_key, i + 1)).join('');
  refreshCursorTargets();
  if (typeof initCountdowns === 'function') initCountdowns();
  if (typeof initStockCounters === 'function') initStockCounters();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;
  const lang  = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key = lang === 'en' ? 'en' : 'fr';

  const featured = PRODUCTS.slice(0, 6);
  grid.innerHTML = featured.map((p, i) => buildProductCard(p, t_key, i + 1)).join('');
  refreshCursorTargets();
  if (typeof initCountdowns === 'function') initCountdowns();
  if (typeof initStockCounters === 'function') initStockCounters();
}

function buildProductCard(p, lang, num) {
  const data  = p[lang] || p.fr;
  const stars = buildStars(p.rating);
  const catLabels = {
    nettoyage: lang === 'en' ? 'Cleaning' : 'Nettoyage',
    securite: lang === 'en' ? 'Safety' : 'Sécurité',
    confort: lang === 'en' ? 'Comfort' : 'Confort',
    technologie: lang === 'en' ? 'Technology' : 'Technologie',
    entretien: lang === 'en' ? 'Maintenance' : 'Entretien',
    pack: lang === 'en' ? 'Exclusive Bundle' : 'Pack Exclusif',
  };
  const ctaText = lang === 'en' ? 'View product' : 'Voir le produit';
  const reviewsText = lang === 'en' ? 'reviews' : 'avis';
  const isHot = p.badgeType === 'bestseller' || p.badgeType === 'popular';
  const stockLabel = lang === 'en' ? 'left in stock' : 'en stock';
  const offerLabel = lang === 'en' ? 'Offer expires in' : 'Offre expire dans';

  const colorGroups = p.variants ? p.variants.filter(v => !v.type) : [];
  const swatchHTML = colorGroups.length ? `
    <div class="card-swatches">
      ${colorGroups.map((g, gi) => `
        ${gi > 0 ? '<span class="card-swatch-sep"></span>' : ''}
        ${g.options.map(o => `<span class="card-swatch-dot${o.transparent ? ' card-swatch-dot--transparent' : ''}" style="${o.transparent ? '' : `background:${o.hex}`}" title="${g.label} : ${o.display}"></span>`).join('')}
      `).join('')}
    </div>` : '';

  return `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}" onclick="goToProduct('${p.id}')">
      <div class="product-card-visual" style="background: radial-gradient(ellipse at 40% 50%, ${p.accentColor} 0%, #111 100%);">
        <div class="product-badge badge--${p.badgeType}">${p.badge}</div>
        ${p.discount ? `<div class="product-discount-badge">-${p.discount}%</div>` : ''}
        ${p.images && p.images[0]
          ? `<img class="product-card-img" src="${p.images[0]}" alt="${data.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="product-card-icon" style="${p.images && p.images[0] ? 'display:none' : ''}">${p.icon}</div>
        <div class="product-card-visual-num">${String(num).padStart(2,'0')}</div>
      </div>
      <div class="product-card-main">
        <div class="product-card-body">
          <p class="product-card-cat">${catLabels[p.category] || p.category}</p>
          <h3 class="product-card-name">${data.name}</h3>
          <p class="product-card-tagline">${data.tagline}</p>
          <div class="product-card-rating">
            <div class="stars">${stars}</div>
            <span class="rating-count">${p.rating} (${p.reviews.toLocaleString()} ${reviewsText})</span>
          </div>
          ${swatchHTML}
        </div>
      </div>
      ${isHot ? `
      <div class="stock-badge" data-stock-id="${p.id}">
        <span class="stock-dot"></span>
        <span>Il reste <span class="stock-num">3</span> ${stockLabel}</span>
      </div>
      <div class="countdown-wrap" data-countdown="${p.id}">
        <span class="countdown-icon">⏱</span>
        <span class="countdown-label">${offerLabel}</span>
        <span class="countdown-timer">--:--:--</span>
      </div>` : ''}
      <div class="product-card-footer">
        <div class="product-card-pricing">
          <span class="price-current" data-eur="${p.price}">${p.price.toFixed(2).replace('.', ',')}€</span>
          ${p.oldPrice ? `<span class="price-old" data-eur="${p.oldPrice}">${p.oldPrice.toFixed(2).replace('.', ',')}€</span>` : ''}
          ${p.discount ? `<span class="price-discount">-${p.discount}%</span>` : ''}
        </div>
        <button class="btn btn--primary product-card-cta btn--sm">
          ${ctaText}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
        </button>
      </div>
    </article>`;
}

function renderBundles() {
  const grid = document.getElementById('packsGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;
  const lang  = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key = lang === 'en' ? 'en' : 'fr';
  const bundles = PRODUCTS.filter(p => p.isBundle);
  if (!bundles.length) return;
  grid.innerHTML = bundles.map((p, i) => buildProductCard(p, t_key, i + 1)).join('');
  refreshCursorTargets();
}

function buildStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<svg class="star${i > rating ? ' star-empty' : ''}" viewBox="0 0 12 12">
      <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6 8.5l-3 1.6.6-3.3L1.2 4.5l3.3-.5z" fill="currentColor"/>
    </svg>`;
  }
  return html;
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

function updateCartCounter() {
  const cart  = JSON.parse(localStorage.getItem('ec_cart') || '[]');
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function refreshCursorTargets() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const ring = document.querySelector('.cursor-ring');
  const dot  = document.querySelector('.cursor-dot');
  if (!ring) return;
  document.querySelectorAll('.product-card, .category-card, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hovering');
      dot && (dot.style.transform = 'translate(-50%,-50%) scale(2)');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hovering');
      dot && (dot.style.transform = 'translate(-50%,-50%) scale(1)');
    });
  });
}

/* ── 13. Reviews Renderer ── */
function renderReviews() {
  const carousel = document.querySelector('.reviews-carousel');
  if (!carousel || typeof REVIEWS === 'undefined') return;
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key = lang === 'en' ? 'en' : 'fr';
  const verifiedText = lang === 'en' ? 'Verified' : 'Vérifié';

  carousel.innerHTML = REVIEWS.map((r, idx) => {
    const data  = r[t_key] || r.fr;
    const stars = buildStars(r.rating);
    const initials = r.name.split(' ').map(n => n[0]).join('');
    const avatarColors = ['#c0392b','#16a085','#8e44ad','#2980b9','#d35400','#27ae60'];
    const avatarBg = avatarColors[idx % avatarColors.length];
    const photosArr = r.photos || (r.photo ? [r.photo] : []);
    const photosJson = photosArr.length > 0 ? JSON.stringify(photosArr.slice(0,3)).replace(/'/g, '&#39;') : '[]';
    const photoHtml = photosArr.length > 0
      ? `<div class="review-photos review-photos--${Math.min(photosArr.length, 3)}">
          ${photosArr.slice(0, 3).map((p, i) => `<img class="review-photo-item" src="${p}" alt="" loading="lazy" data-photos='${photosJson}' data-idx="${i}">`).join('')}
        </div>`
      : '';
    return `
      <article class="review-card">
        ${photoHtml}
        <div class="review-stars">${stars}</div>
        <p class="review-text">${data.text}</p>
        <div class="review-meta">
          <div class="review-avatar" style="background:${avatarBg}">${initials}</div>
          <div>
            <p class="review-name">${r.name} <span style="color:var(--gray-2);font-weight:400">· ${r.city}</span></p>
            <p class="review-product">${r.product}</p>
          </div>
          <div class="review-verified">
            <div class="verified-dot"></div>
            ${verifiedText}
          </div>
        </div>
      </article>`;
  }).join('');

  // Duplicate for infinite scroll feel
  carousel.innerHTML += carousel.innerHTML;
  initCarousel();
}

/* ── 13b. Review Lightbox ── */
(function() {
  var lb = null, photos = [], idx = 0;
  function build() {
    if (lb) return;
    lb = document.createElement('div');
    lb.id = 'review-lightbox';
    lb.className = 'rlb-overlay';
    lb.innerHTML = '<button class="rlb-close">&#x2715;</button><button class="rlb-prev">&#8249;</button><img class="rlb-img" src="" alt=""><div class="rlb-counter"></div><button class="rlb-next">&#8250;</button>';
    document.body.appendChild(lb);
    lb.querySelector('.rlb-close').onclick = close;
    lb.querySelector('.rlb-prev').onclick = function(e) { e.stopPropagation(); idx = (idx - 1 + photos.length) % photos.length; show(); };
    lb.querySelector('.rlb-next').onclick = function(e) { e.stopPropagation(); idx = (idx + 1) % photos.length; show(); };
    lb.onclick = function(e) { if (e.target === lb) close(); };
  }
  function show() {
    lb.querySelector('.rlb-img').src = photos[idx];
    lb.querySelector('.rlb-counter').textContent = photos.length > 1 ? (idx + 1) + ' / ' + photos.length : '';
    lb.querySelector('.rlb-prev').style.display = photos.length > 1 ? '' : 'none';
    lb.querySelector('.rlb-next').style.display = photos.length > 1 ? '' : 'none';
  }
  function open(p, i) { build(); photos = p; idx = i || 0; show(); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function close() { if (lb) lb.classList.remove('is-open'); document.body.style.overflow = ''; }
  document.addEventListener('keydown', function(e) {
    if (!lb || !lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') { idx = (idx - 1 + photos.length) % photos.length; show(); }
    if (e.key === 'ArrowRight') { idx = (idx + 1) % photos.length; show(); }
  });
  document.addEventListener('click', function(e) {
    var img = e.target;
    if (!img || !img.classList || !img.classList.contains('review-photo-item')) return;
    var raw = img.getAttribute('data-photos');
    var i = parseInt(img.getAttribute('data-idx') || '0');
    try { var p = raw ? JSON.parse(raw) : []; open(p.length ? p : [img.src], i); } catch(err) { open([img.src], 0); }
  });
})();

/* ── 14. Categories Renderer ── */
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid || typeof CATEGORIES === 'undefined') return;
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key = lang === 'en' ? 'en' : 'fr';
  const ctaText = lang === 'en' ? 'View' : 'Voir';
  const pText   = lang === 'en' ? 'products' : 'produits';

  grid.innerHTML = CATEGORIES.map(c => {
    const data = c[t_key] || c.fr;
    return `
      <div class="category-card" onclick="filterBoutique('${c.id}')">
        ${c.coverImg ? `<div class="cat-cover"><img src="${c.coverImg}" alt="${data.name}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>` : ''}
        <div class="cat-body">
          <div class="cat-icon">${c.icon}</div>
          <p class="cat-name">${data.name}</p>
          <p class="cat-count">${data.count} ${pText}</p>
          <svg class="cat-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h14M10 3l7 7-7 7"/></svg>
        </div>
      </div>`;
  }).join('');
}

function filterBoutique(cat) {
  sessionStorage.setItem('ec_filter', cat);
  window.location.href = 'boutique.html';
}

/* ── 15. Problems Renderer ── */
function renderProblems() {
  const grid = document.getElementById('problemsGrid');
  if (!grid || typeof PROBLEMS === 'undefined') return;
  const lang   = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key  = lang === 'en' ? 'en' : 'fr';
  const pLbl   = lang === 'en' ? 'Problem'  : 'Problème';
  const sLbl   = lang === 'en' ? 'Solution' : 'Solution';
  const rLbl   = lang === 'en' ? 'Result'   : 'Résultat';

  grid.innerHTML = PROBLEMS.map(p => {
    const data = p[t_key] || p.fr;
    return `
      <div class="problem-card" data-reveal>
        <div class="problem-icon">${p.icon}</div>
        <p class="problem-tag">${pLbl}</p>
        <p class="problem-text">${data.problem}</p>
        <p class="solution-tag">${sLbl}</p>
        <p class="solution-text">${data.solution}</p>
        <div class="result-wrap">
          <svg class="result-arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 7h12M7 1l6 6-6 6"/></svg>
          <span>${data.result}</span>
        </div>
      </div>`;
  }).join('');
}

/* ── 16. Boutique Page ── */
function initBoutique() {
  const grid = document.getElementById('boutiqueGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t_key = lang === 'en' ? 'en' : 'fr';

  grid.innerHTML = PRODUCTS.map((p, i) => buildProductCard(p, t_key, i + 1)).join('');
  if (typeof initCountdowns === 'function') initCountdowns();
  if (typeof initStockCounters === 'function') initStockCounters();

  // Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('#boutiqueGrid .product-card').forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        card.style.opacity = show ? '1' : '0';
      });
    });
  });

  // Pre-filter from homepage (sessionStorage or URL param)
  const urlFilter = new URLSearchParams(window.location.search).get('filter');
  const savedFilter = urlFilter || sessionStorage.getItem('ec_filter');
  if (savedFilter) {
    const btn = document.querySelector(`.filter-btn[data-filter="${savedFilter}"]`);
    if (btn) { btn.click(); sessionStorage.removeItem('ec_filter'); }
  }

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      const cards = [...document.querySelectorAll('#boutiqueGrid .product-card')];
      const sorted = cards.sort((a, b) => {
        const pa = PRODUCTS.find(p => p.id === a.dataset.id);
        const pb = PRODUCTS.find(p => p.id === b.dataset.id);
        if (!pa || !pb) return 0;
        if (val === 'price_asc')  return pa.price - pb.price;
        if (val === 'price_desc') return pb.price - pa.price;
        if (val === 'rating')     return pb.rating - pa.rating;
        return pb.reviews - pa.reviews; // popular
      });
      sorted.forEach(c => grid.appendChild(c));
    });
  }

  gsap.from('#boutiqueGrid .product-card', {
    opacity: 0, y: 30,
    stagger: 0.07,
    duration: 0.6,
    ease: 'power3.out',
  });
}

/* ── 17. Back to Top ── */
function initBackTop() {
  const btn = document.querySelector('.back-top');
  if (!btn) return;
  ScrollTrigger.create({
    start: 500,
    onEnter:     () => btn.classList.add('visible'),
    onLeaveBack: () => btn.classList.remove('visible'),
  });
  btn.addEventListener('click', () => {
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── 18b. UGC Videos — lecture YouTube en modal au clic ── */
function initUGCVideos() {
  document.querySelectorAll('.ugc-card[data-youtube]').forEach(card => {
    card.addEventListener('click', () => openYTModal(card.dataset.youtube));
  });
  upgradeYTThumbs();
}

function upgradeYTThumbs() {
  document.querySelectorAll('.ugc-thumb-img[src*="youtube.com"]').forEach(img => {
    const vid = img.closest('[data-youtube]')?.dataset.youtube;
    if (!vid) return;
    const sizes = ['maxresdefault', 'sddefault', 'hqdefault'];
    let idx = 0;
    function trySize() {
      if (idx >= sizes.length) return;
      const probe = new Image();
      const size = sizes[idx++];
      probe.onload = function() {
        if (this.naturalWidth > 120) {
          img.src = `https://img.youtube.com/vi/${vid}/${size}.jpg`;
        } else {
          trySize();
        }
      };
      probe.onerror = trySize;
      probe.src = `https://img.youtube.com/vi/${vid}/${size}.jpg`;
    }
    trySize();
  });
}

function openYTModal(videoId) {
  const overlay = document.createElement('div');
  overlay.className = 'yt-modal-overlay';
  overlay.innerHTML = `
    <div class="yt-modal-inner">
      <button class="yt-modal-close" aria-label="Fermer">✕</button>
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1"
              allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>`;

  const close = () => overlay.remove();
  overlay.querySelector('.yt-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  function onKey(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  }
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('remove', () => document.removeEventListener('keydown', onKey));

  document.body.appendChild(overlay);
}

/* ── 18. Footer Curtain Reveal ── */
function initFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const items = footer.querySelectorAll('.footer-brand, .footer-col, .footer-bottom');
  gsap.from(items, {
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: footer,
      start: 'top 90%',
      once: true,
    },
  });
}

/* ── 19. Hero Video ── */
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  video.src = isMobile
    ? 'assets/videos/hero-mobile.mp4'
    : 'assets/videos/hero-desktop.mp4';
  video.load();
  video.play().catch(() => {});
}

/* ── 20. Trust Bar duplication ── */
function initTrustBar() {
  const track = document.querySelector('.trust-track');
  if (!track) return;
  const inner = track.innerHTML;
  track.innerHTML = inner + inner; // Duplicate for seamless loop
}

/* ── Start everything ── */
function startAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  initLenis();
  initCursor();
  initHeroVideo();
  initHeroCanvas();
  initNavbar();
  initScrollProgress();
  initHeroAnim();
  initScrollReveal();
  initStats();
  initFAQ();
  initFooter();
  initBackTop();
  initTrustBar();
  initUGCVideos();

  // Render dynamic content
  renderProducts();
  renderBestSellers();
  renderBundles();
  renderReviews();
  renderCategories();
  renderProblems();

  // Boutique page
  if (document.getElementById('boutiqueGrid')) initBoutique();

  // Product page
  if (document.getElementById('productMain')) {
    if (typeof initProductPage === 'function') initProductPage();
  }

  // Cart page
  if (document.getElementById('cartItemsList')) {
    if (typeof initCartPage === 'function') initCartPage();
  }

  initCartPanel();
  updateCartCounter();
  ScrollTrigger.refresh();
}

/* ═══════════════════════════════════════════════════════════
   CART PANEL — slide-in drawer accessible on all pages
   ═══════════════════════════════════════════════════════════ */
function initCartPanel() {
  if (document.getElementById('cartPanel')) return;
  const panel = document.createElement('div');
  panel.id = 'cartPanel';
  panel.className = 'cart-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Panier');
  panel.innerHTML = `
    <div class="cart-panel-overlay" id="cartPanelOverlay"></div>
    <div class="cart-panel-drawer">
      <div class="cart-panel-header">
        <h2 class="cart-panel-title">Mon Panier</h2>
        <button class="cart-panel-close" id="cartPanelClose" aria-label="Fermer">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="14" height="14"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
        </button>
      </div>
      <div class="cart-panel-body" id="cartPanelBody"></div>
      <div class="cart-panel-footer" id="cartPanelFooter"></div>
    </div>`;
  document.body.appendChild(panel);
  document.getElementById('cartPanelOverlay').addEventListener('click', closeCartPanel);
  document.getElementById('cartPanelClose').addEventListener('click', closeCartPanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCartPanel(); });
  document.querySelectorAll('.nav-cart-btn').forEach(btn => {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', e => { e.preventDefault(); openCartPanel(); });
  });
}

function openCartPanel() {
  renderCartPanel();
  const panel = document.getElementById('cartPanel');
  if (panel) { panel.classList.add('cart-panel--open'); document.body.classList.add('cart-panel-active'); }
}

function closeCartPanel() {
  const panel = document.getElementById('cartPanel');
  if (panel) { panel.classList.remove('cart-panel--open'); document.body.classList.remove('cart-panel-active'); }
}

function renderCartPanel() {
  const body = document.getElementById('cartPanelBody');
  const footer = document.getElementById('cartPanelFooter');
  if (!body || !footer) return;
  const cart = JSON.parse(localStorage.getItem('ec_cart') || '[]');
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-panel-empty"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="48" height="48"><path d="M12 4L6 12v28a4 4 0 004 4h28a4 4 0 004-4V12l-6-8z"/><line x1="6" y1="12" x2="42" y2="12"/><path d="M32 20a8 8 0 01-16 0"/></svg><p>Panier vide</p><a href="boutique.html" class="btn btn--primary btn--sm" onclick="closeCartPanel()">Voir la boutique</a></div>`;
    footer.innerHTML = '';
    return;
  }
  const isFr = typeof currentLang === 'undefined' || currentLang !== 'en';
  let subtotal = 0;
  const items = cart.map(item => {
    if (typeof PRODUCTS === 'undefined') return '';
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    const data = isFr ? p.fr : (p.en || p.fr);
    const qty = item.qty || 1;
    const unitPrice = item.variantPrice ?? p.price;
    const linePrice = (unitPrice * qty).toFixed(2).replace('.', ',');
    subtotal += unitPrice * qty;
    const imgSrc = p.images && p.images[0] ? p.images[0] : '';
    const isBs = p.badgeType === 'bestseller';
    const cartKey = item.cartKey || p.id;
    // Show stacked images for qty lot (up to 3 thumbnails)
    const isLot = item.variantValue === 'lot';
    const imgHTML = imgSrc
      ? (isLot
          ? `<div class="cart-panel-lot-imgs">
               <img src="${imgSrc}" alt="${data.name}" loading="lazy" class="cart-panel-lot-img">
               <img src="${imgSrc}" alt="" loading="lazy" class="cart-panel-lot-img">
               <img src="${imgSrc}" alt="" loading="lazy" class="cart-panel-lot-img">
             </div>`
          : `<img src="${imgSrc}" alt="${data.name}" loading="lazy">`)
      : `<span style="font-size:1.6rem">${p.icon}</span>`;
    return `<div class="cart-panel-item" data-cartkey="${cartKey}">
      <div class="cart-panel-item-img">${imgHTML}</div>
      <div class="cart-panel-item-info">
        <p class="cart-panel-item-name">${data.name}${isBs ? ' <span class="cart-bs-tag">BS</span>' : ''}</p>
        ${item.variantsDisplay
          ? `<p class="cart-panel-item-variant">${item.variantsDisplay}</p>`
          : (item.variantLabel || item.colorLabel)
            ? `<p class="cart-panel-item-variant">${[item.variantLabel, item.colorLabel].filter(Boolean).join(' · ')}</p>`
            : ''}
        <p class="cart-panel-item-price">${linePrice}€</p>
        <div class="cart-panel-item-qty">
          <button class="qty-btn" onclick="changePanelQty('${cartKey}',-1)">−</button>
          <span>${qty}</span>
          <button class="qty-btn" onclick="changePanelQty('${cartKey}',1)">+</button>
        </div>
      </div>
      <button class="cart-panel-item-remove" onclick="removePanelItem('${cartKey}')" aria-label="Supprimer">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="13" height="13"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
      </button>
    </div>`;
  }).join('');
  body.innerHTML = items;

  // -50% sur le 2ème article Best Seller (le moins cher)
  const bsUnits = [];
  cart.forEach(item => {
    const p = PRODUCTS && PRODUCTS.find(pr => pr.id === item.id);
    if (!p || p.badgeType !== 'bestseller') return;
    const unitPrice = item.variantPrice ?? p.price;
    for (let i = 0; i < (item.qty || 1); i++) bsUnits.push(unitPrice);
  });
  bsUnits.sort((a, b) => a - b);
  const bsDiscount = bsUnits.length >= 2 ? bsUnits[0] * 0.5 : 0;

  const isFreeShipping = subtotal >= 49.90;
  const shipping = isFreeShipping ? 0 : 4.99;
  const total = subtotal - bsDiscount + shipping;
  const discountLine = bsDiscount > 0
    ? `<div class="cart-panel-discount">
        <span>🎁 2ème Best Seller -50%</span>
        <span class="cart-discount-val">-${bsDiscount.toFixed(2).replace('.', ',')}€</span>
       </div>`
    : (bsUnits.length === 1
        ? `<div class="cart-panel-promo-hint">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
             Ajoutez 1 Best Seller de plus pour -50% !
           </div>`
        : '');
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const uniqueProducts = cart.length;
  const gwpUnlocked = uniqueProducts >= 2;
  const gwpBar = `<div class="gwp-bar${gwpUnlocked ? ' gwp-unlocked' : ''}">
    <div class="gwp-bar-header">${gwpUnlocked ? '🎁 Cadeau débloqué !' : '🎁 Cadeau offert dès 2 produits différents'}</div>
    <div class="gwp-progress-track"><div class="gwp-progress-fill" style="width:${Math.min(100, (uniqueProducts / 2) * 100)}%"></div></div>
    <div class="gwp-bar-sub">${gwpUnlocked
      ? '✓ Code promo -15% + Guide Entretien Auto offerts par e-mail après commande !'
      : uniqueProducts === 0
        ? 'Ajoutez 2 produits différents et recevez un code promo -15% + Guide Auto offerts 🎁'
        : 'Plus qu\'1 produit différent pour débloquer votre code promo -15% + Guide Auto 🎁'
    }</div>
  </div>`;

  footer.innerHTML = `
    ${gwpBar}
    <div class="cart-panel-subtotal"><span>Sous-total</span><span>${subtotal.toFixed(2).replace('.', ',')}€</span></div>
    ${discountLine}
    <div class="cart-panel-shipping${isFreeShipping ? ' cart-panel-shipping--free' : ''}"><span>Livraison</span><span>${isFreeShipping ? 'Gratuite 🎉' : shipping.toFixed(2).replace('.', ',') + '€'}</span></div>
    <div class="cart-panel-total"><span>Total</span><strong>${total.toFixed(2).replace('.', ',')}€</strong></div>
    <a href="cart.html" class="btn btn--primary btn--full" onclick="closeCartPanel()">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="15" height="15"><rect x="3" y="11" width="14" height="8" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      Commander — ${total.toFixed(2).replace('.', ',')}€
    </a>
    <a href="cart.html" class="cart-panel-view-all" onclick="closeCartPanel()">Voir le panier complet →</a>`;
}

function changePanelQty(cartKey, delta) {
  const cart = JSON.parse(localStorage.getItem('ec_cart') || '[]');
  const item = cart.find(i => (i.cartKey || i.id) === cartKey);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  localStorage.setItem('ec_cart', JSON.stringify(cart));
  updateCartCounter();
  renderCartPanel();
}

function removePanelItem(cartKey) {
  let cart = JSON.parse(localStorage.getItem('ec_cart') || '[]');
  cart = cart.filter(i => (i.cartKey || i.id) !== cartKey);
  localStorage.setItem('ec_cart', JSON.stringify(cart));
  updateCartCounter();
  renderCartPanel();
}

/* ── Comparison table row stagger ── */
function initComparisonTable() {
  const rows = document.querySelectorAll('.comparison-table tbody tr');
  if (!rows.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const idx = [...rows].indexOf(e.target);
      const rowDelay = idx * 0.08;
      e.target.style.animationDelay = `${rowDelay}s`;
      e.target.querySelectorAll('.cmp-svg--check polyline, .cmp-svg--cross line').forEach(el => {
        el.style.animationDelay = `${rowDelay + 0.28}s`;
      });
      e.target.classList.add('cmp-visible');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  rows.forEach(r => obs.observe(r));
}

/* ── DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loader')) {
    initLoader();
  } else {
    document.body.classList.remove('is-loading');
    startAnimations();
  }
  initComparisonTable();
});
