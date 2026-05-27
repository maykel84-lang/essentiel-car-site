/* =========================================================
   ESSENTIEL CAR — Product Page
   Reads ?id= from URL, finds product in PRODUCTS, renders page.
   ========================================================= */

function initProductPage() {
  if (!document.getElementById('productMain')) return;

  const params  = new URLSearchParams(window.location.search);
  const id      = params.get('id');

  if (!id || typeof PRODUCTS === 'undefined') {
    window.location.href = 'boutique.html';
    return;
  }

  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    window.location.href = 'boutique.html';
    return;
  }

  renderProduct(product);
  document.addEventListener('langchange', () => renderProduct(product));
}

/* ── Render the full page content ── */
function renderProduct(p) {
  const lang  = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const data  = p[lang] || p.fr;
  const isFr  = lang === 'fr';

  document.title = `${data.name} — ESSENTIEL CAR`;

  const catLabels = {
    nettoyage:   isFr ? 'Nettoyage'  : 'Cleaning',
    securite:    isFr ? 'Sécurité'   : 'Safety',
    confort:     isFr ? 'Confort'    : 'Comfort',
    technologie: isFr ? 'Technologie': 'Technology',
    entretien:   isFr ? 'Entretien'  : 'Maintenance',
  };

  const priceStr    = p.price.toFixed(2).replace('.', ',');
  const oldStr      = p.oldPrice.toFixed(2).replace('.', ',');
  const saving      = (p.oldPrice - p.price).toFixed(2).replace('.', ',');
  const productIdx  = typeof PRODUCTS !== 'undefined' ? PRODUCTS.indexOf(p) + 1 : 1;

  const txt = {
    home:       isFr ? 'Accueil'            : 'Home',
    shop:       isFr ? 'Boutique'           : 'Shop',
    addCart:    isFr ? 'Ajouter au panier'  : 'Add to cart',
    backShop:   isFr ? 'Retour boutique'    : 'Back to shop',
    reviews:    isFr ? 'avis vérifiés'      : 'verified reviews',
    savings:    isFr ? `Économisez ${saving}€` : `Save €${saving}`,
    stock:      isFr ? '✓ En stock — Expédié sous 24h' : '✓ In stock — Ships within 24h',
    freeShip:   isFr ? 'Livraison offerte'  : 'Free shipping',
    freeShipS:  isFr ? 'Dès 49€ d\'achat'  : 'From €49.99',
    returns:    isFr ? 'Retours 30j'        : '30-day returns',
    returnsS:   isFr ? 'Satisfait ou remb.' : 'Money-back guarantee',
    secure:     isFr ? 'Paiement sécurisé'  : 'Secure payment',
    secureS:    isFr ? 'CB, PayPal'         : 'Card, PayPal',
    specs:      isFr ? 'Caractéristiques'   : 'Specifications',
    revTitle:   isFr ? 'Avis clients'       : 'Customer reviews',
    related:    isFr ? 'Vous aimerez aussi' : 'You might also like',
    verified:   isFr ? 'Achat vérifié'      : 'Verified purchase',
    ctaTitle:   isFr ? 'ÉQUIPEZ\nVOTRE VOITURE' : 'EQUIP\nYOUR CAR',
    ctaSub:     isFr ? 'Plus de 50 accessoires auto premium. Livraison rapide.' : 'Over 50 premium accessories. Fast shipping.',
    ctaBtn:     isFr ? 'Voir tous les produits' : 'View all products',
  };

  const specIcons = [
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  ];

  const container = document.getElementById('productMain');
  if (!container) return;

  container.innerHTML = `
    <!-- Breadcrumb -->
    <div class="product-breadcrumb">
      <div class="container">
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="index.html">${txt.home}</a>
          <span aria-hidden="true">›</span>
          <a href="boutique.html">${txt.shop}</a>
          <span aria-hidden="true">›</span>
          <span class="breadcrumb-current">${data.name}</span>
        </nav>
      </div>
    </div>

    <!-- Product Hero Section -->
    <section class="product-section-wrap">
      <div class="container">
        <div class="product-section">

          <!-- Left: Visual -->
          <div class="product-visual-col">
            <div class="product-visual-card${p.images && p.images.length ? ' product-visual-card--image' : ''}" style="background: radial-gradient(ellipse at 40% 40%, ${p.accentColor} 0%, #111 100%);">
              <div class="product-badge badge--${p.badgeType} product-visual-badge">${p.badge}</div>
              ${p.images && p.images.length ? `
              <div class="product-main-img-wrap">
                <img class="product-main-img" src="${p.images[0]}" alt="${data.name}" loading="eager" onerror="this.parentElement.parentElement.classList.remove('product-visual-card--image');this.parentElement.style.display='none';this.parentElement.parentElement.querySelector('.product-visual-fallback').style.display='flex'">
              </div>
              ${p.images.length > 1 ? `<div class="product-img-thumbs" id="productThumbs">${p.images.map((src, i) => `<button class="product-thumb${i === 0 ? ' active' : ''}" data-src="${src}" aria-label="${data.name} photo ${i+1}"><img src="${src}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
              <div class="product-visual-fallback" style="display:none;width:55%;position:relative;z-index:1">${p.icon}</div>
              ` : `
              <div class="product-visual-icon">${p.icon}</div>
              <div class="product-visual-number">${String(productIdx).padStart(2,'0')}</div>
              `}
            </div>

            <!-- Trust mini -->
            <div class="product-mini-trust">
              <div class="mini-trust-item">
                <svg class="mini-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8l5 2v4h-5M1 16l2 4h11l2-4"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span class="mini-trust-label">${txt.freeShip}</span>
                <span class="mini-trust-sub">${txt.freeShipS}</span>
              </div>
              <div class="mini-trust-item">
                <svg class="mini-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                <span class="mini-trust-label">${txt.returns}</span>
                <span class="mini-trust-sub">${txt.returnsS}</span>
              </div>
              <div class="mini-trust-item">
                <svg class="mini-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span class="mini-trust-label">${txt.secure}</span>
                <span class="mini-trust-sub">${txt.secureS}</span>
              </div>
            </div>
          </div>

          <!-- Right: Info -->
          <div class="product-info-col">
            <div class="product-category-tag">
              <span class="product-cat-dot"></span>
              ${catLabels[p.category] || p.category}
            </div>

            <h1 class="product-name">${data.name}</h1>
            <p class="product-tagline">${data.tagline}</p>

            <div class="product-rating-row">
              <div class="stars">${buildStars(p.rating)}</div>
              <span class="product-rating-value">${p.rating}</span>
              <span class="product-rating-count">(${p.reviews.toLocaleString()} ${txt.reviews})</span>
            </div>

            <div class="product-price-block">
              <div class="product-price-left">
                <span class="product-price-old">${oldStr}€</span>
                <span class="product-price-main">${priceStr}€</span>
              </div>
              <div class="product-price-right">
                <span class="product-price-savings">-${p.discount}%</span>
                <span class="product-price-saving-text">${txt.savings}</span>
              </div>
            </div>

            <p class="product-stock">${txt.stock}</p>

            <div class="product-features">
              ${data.features.map(f => `<span class="feature-pill">${f}</span>`).join('')}
            </div>

            <p class="product-desc">${data.desc}</p>

            <div class="product-ctas">
              <button class="btn btn--primary btn--lg btn--cart" id="addToCartBtn" data-id="${p.id}" data-magnetic>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                ${txt.addCart}
              </button>
              <a href="boutique.html" class="btn btn--secondary btn--lg">${txt.backShop}</a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Specs Section -->
    <section class="specs-section">
      <div class="container">
        <div class="section-eyebrow" data-reveal>
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">${txt.specs}</span>
        </div>
        <div class="specs-grid" data-stagger>
          ${data.features.map((f, i) => `
            <div class="spec-card">
              <div class="spec-card-icon">${specIcons[i % specIcons.length]}</div>
              <div class="spec-card-label">${f}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="product-reviews-section">
      <div class="container">
        <div class="section-eyebrow" data-reveal>
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">${txt.revTitle}</span>
        </div>
        <div class="product-reviews-grid" data-stagger>
          ${buildProductReviews(p, lang, txt.verified)}
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="related-section">
      <div class="container">
        <div class="section-eyebrow" data-reveal>
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">${txt.related}</span>
        </div>
        <div class="related-grid" data-stagger>
          ${buildRelatedProducts(p, lang)}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-bg-effects" aria-hidden="true"><div class="cta-glow"></div></div>
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title" style="white-space:pre-line">${txt.ctaTitle}</h2>
          <p class="cta-sub" data-reveal>${txt.ctaSub}</p>
          <div class="cta-btns" data-reveal>
            <a href="boutique.html" class="btn btn--primary btn--lg" data-magnetic>
              ${txt.ctaBtn}
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 7.5h13M7.5 1l6.5 6.5-6.5 6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Wire up add-to-cart
  const btn = document.getElementById('addToCartBtn');
  if (btn) btn.addEventListener('click', () => handleAddToCart(p, data, isFr));

  // GSAP entrance animations
  if (typeof gsap !== 'undefined') {
    gsap.from('.product-visual-card', { opacity: 0, x: -50, duration: 1, ease: 'power3.out', delay: 0.15 });
    gsap.from('.product-mini-trust', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.5 });
    const infoEls = document.querySelectorAll('.product-info-col > *');
    gsap.from(infoEls, { opacity: 0, y: 24, stagger: 0.07, duration: 0.7, ease: 'power3.out', delay: 0.25 });
    if (typeof ScrollTrigger !== 'undefined') {
      initScrollReveal();
    }
  }

  refreshCursorTargets();
  updateCartCounter();
  initProductLightbox();
  initProductThumbs();
}

/* ── Build product reviews ── */
function buildProductReviews(p, lang, verifiedText) {
  if (typeof REVIEWS === 'undefined') return '';
  const t_key = lang === 'en' ? 'en' : 'fr';

  let list = REVIEWS.filter(r => r.product === p.fr.name || r.product === (p.en && p.en.name));
  if (list.length < 2) {
    const others = REVIEWS.filter(r => r.product !== p.fr.name);
    list = [...list, ...others.slice(0, 3 - list.length)];
  }

  return list.slice(0, 3).map(r => {
    const d    = r[t_key] || r.fr;
    const init = r.name.split(' ').map(n => n[0]).join('');
    return `
      <div class="product-review-card">
        <div class="review-stars">${buildStars(r.rating)}</div>
        <p class="review-text">"${d.text}"</p>
        <div class="review-meta">
          <div class="review-avatar">${init}</div>
          <div>
            <p class="review-name">${r.name} <span style="color:var(--gray-2);font-weight:400">· ${r.city}</span></p>
            <p style="font-size:0.75rem;color:var(--gray-1);font-family:var(--font-body);margin-top:0.15rem">${r.product}</p>
          </div>
          <div class="review-verified"><div class="verified-dot"></div>${verifiedText}</div>
        </div>
      </div>`;
  }).join('');
}

/* ── Build related products ── */
function buildRelatedProducts(currentProduct, lang) {
  if (typeof PRODUCTS === 'undefined') return '';
  const t_key  = lang === 'en' ? 'en' : 'fr';
  const others = PRODUCTS.filter(p => p.id !== currentProduct.id);
  const same   = others.filter(p => p.category === currentProduct.category);
  const diff   = others.filter(p => p.category !== currentProduct.category);
  const related = [...same, ...diff].slice(0, 3);
  return related.map((p, i) => buildProductCard(p, t_key, i + 1)).join('');
}

/* ── Cart logic ── */
function handleAddToCart(product, data, isFr) {
  const cart     = JSON.parse(localStorage.getItem('ec_cart') || '[]');
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }
  localStorage.setItem('ec_cart', JSON.stringify(cart));
  updateCartCounter();
  showCartToast(data.name, isFr);

  // Upsell popup — show after short delay
  setTimeout(() => {
    if (typeof openUpsellPopup === 'function') openUpsellPopup(product.id);
  }, 1500);

  // Button feedback
  const btn = document.getElementById('addToCartBtn');
  if (btn) {
    btn.classList.add('btn--success');
    btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove('btn--success');
      btn.disabled = false;
    }, 2000);
  }
}

/* ── Thumbnails — Amazon-style ── */
function initProductThumbs() {
  const container = document.getElementById('productThumbs');
  if (!container) return;
  const mainImg = document.querySelector('.product-main-img');
  if (!mainImg) return;

  container.addEventListener('click', function(e) {
    const btn = e.target.closest('.product-thumb');
    if (!btn) return;
    const src = btn.dataset.src;
    if (!src) return;

    // Crossfade main image
    mainImg.style.transition = 'opacity 0.18s ease';
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = '1';
    }, 180);

    // Active state
    container.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  });
}

/* ── Lightbox zoom ── */
function initProductLightbox() {
  const wrap = document.querySelector('.product-main-img-wrap');
  if (!wrap) return;
  wrap.addEventListener('click', () => {
    const mainImg = document.querySelector('.product-main-img');
    if (!mainImg) return;
    openLightbox(mainImg.src, mainImg.alt);
  });
}

function openLightbox(src, alt) {
  if (document.getElementById('productLightbox')) {
    const lb = document.getElementById('productLightbox');
    lb.querySelector('img').src = src;
    lb.querySelector('img').alt = alt || '';
    lb.classList.add('lightbox--open');
    return;
  }
  const lb = document.createElement('div');
  lb.id = 'productLightbox';
  lb.className = 'lightbox lightbox--open';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="14" height="14"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
    </button>
    <img src="${src}" alt="${alt || ''}" draggable="false">`;
  document.body.appendChild(lb);
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox-close')) closeLightbox(); });
  document.addEventListener('keydown', function lbKey(e) {
    if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', lbKey); }
  });
}

function closeLightbox() {
  const lb = document.getElementById('productLightbox');
  if (lb) { lb.classList.remove('lightbox--open'); setTimeout(() => lb.remove(), 260); }
}

function showCartToast(name, isFr) {
  let toast = document.getElementById('cartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cartToast';
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg class="cart-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <div>
      <div class="cart-toast-text">${isFr ? 'Ajouté au panier !' : 'Added to cart!'}</div>
      <div class="cart-toast-sub">${name}</div>
    </div>
    <a href="cart.html" class="cart-toast-link">${isFr ? 'Voir le panier' : 'View cart'} →</a>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}
