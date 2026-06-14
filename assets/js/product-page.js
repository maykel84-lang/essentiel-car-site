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

  // Build bundle included products list
  const bundleItems = p.bundleIncludes && typeof PRODUCTS !== 'undefined'
    ? p.bundleIncludes.map(bid => PRODUCTS.find(prod => prod.id === bid)).filter(Boolean)
    : [];

  function buildBundleIncludes() {
    if (!bundleItems.length) return '';
    const title = isFr ? 'Produits inclus dans ce pack' : 'Products included in this pack';
    return `
      <div class="bundle-includes">
        <h3 class="bundle-includes-title">${title}</h3>
        <div class="bundle-includes-grid">
          ${bundleItems.map(bp => {
            const bpData = bp[lang] || bp.fr;
            const hasImg = bp.images && bp.images[0];
            return `
              <div class="bundle-item" data-bundle-id="${bp.id}" onclick="window.location.href='product.html?id=${bp.id}'">
                <div class="bundle-item-img" style="background:radial-gradient(ellipse at 40% 40%,${bp.accentColor} 0%,#111 100%)">
                  ${hasImg
                    ? `<img src="${bp.images[0]}" alt="${bpData.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="bundle-item-icon" style="display:none">${bp.icon}</div>`
                    : `<div class="bundle-item-icon">${bp.icon}</div>`}
                </div>
                <div class="bundle-item-info">
                  <span class="bundle-item-name">${bpData.name}</span>
                  <span class="bundle-item-price">${bp.price.toFixed(2).replace('.', ',')}€</span>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

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

            ${buildBundleIncludes()}

            ${p.variants && p.variants.length ? `
              ${p.isBundle ? (() => {
                const colorVars = p.variants.filter(v => !v.type);
                const colorSummary = colorVars.map(v => {
                  const def = v.options.find(o => o.default) || v.options[0];
                  return `<span class="pack-color-selection" data-variant-label="${v.label}">${v.label} : <strong>${def ? def.display : '—'}</strong></span>`;
                }).join(' &nbsp;·&nbsp; ');
                const base = lang === 'en'
                  ? 'This pack includes products available in multiple colors. Please select your preferences before adding to your cart.'
                  : 'Ce pack contient des produits disponibles en plusieurs couleurs. Veuillez sélectionner votre couleur préférée avant de valider votre panier.';
                return `<div class="pack-variant-note" id="packVariantNote">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <p>${base}${colorSummary ? `<br><span class="pack-color-summary">${colorSummary}</span>` : ''}</p>
                </div>`;
              })() : ''}
              <div class="product-variants">${buildVariants(p.variants, lang)}</div>
            ` : ''}

            <div class="product-ctas">
              <button class="btn btn--primary btn--lg btn--cart" id="addToCartBtn" data-id="${p.id}" data-magnetic>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                ${txt.addCart}
              </button>
              <a href="boutique.html" class="btn btn--secondary btn--lg">${txt.backShop}</a>
            </div>

            <div class="gwp-teaser" id="gwpTeaser">
              <span class="gwp-teaser-emoji">🎁</span>
              <div>
                <div class="gwp-teaser-title">Cadeau surprise offert !</div>
                <div class="gwp-teaser-desc">Achetez 2 articles et recevez un kit ESSENTIEL CAR dans votre colis — microfibre, gants, surprise…</div>
              </div>
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
  initVariants();
}

/* ── Build variant selector ── */
function buildVariants(variants, lang) {
  return variants.map(v => {
    if (v.type === 'qty') {
      return `
        <div class="variant-group">
          <p class="variant-label">${v.label} : <strong class="variant-selected-label"></strong></p>
          <div class="variant-options">
            ${v.options.map((opt, i) => `
              <button class="variant-qty${(opt.default || i === 0) ? ' active' : ''}"
                data-value="${opt.value}"
                data-label="${opt.display}"
                data-price="${opt.price}"
                data-oldprice="${opt.oldPrice}"
                title="${opt.display}">
                <span class="qty-label">${opt.display}</span>
                <span class="qty-price">${opt.price.toFixed(2).replace('.', ',')}€</span>
                ${opt.badge ? `<span class="qty-badge">${opt.badge}</span>` : ''}
              </button>`).join('')}
          </div>
        </div>`;
    }
    const randomLabel = lang === 'en' ? 'Pick for me' : 'Choisir pour moi';
    return `
      <div class="variant-group">
        <div class="variant-label-row">
          <p class="variant-label">${v.label} : <strong class="variant-selected-label"></strong></p>
          <button class="variant-random-btn" type="button" title="${randomLabel}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            ${randomLabel}
          </button>
        </div>
        <div class="variant-options">
          ${v.options.map((opt, i) => `
            <button class="variant-swatch${i === 0 ? ' active' : ''}${opt.outOfStock ? ' out-of-stock' : ''}"
              data-value="${opt.value}"
              data-label="${opt.display}"
              style="--swatch-color:${opt.hex}"
              ${opt.transparent ? 'data-transparent="true"' : ''}
              ${opt.imageIndex !== undefined ? `data-imgindex="${opt.imageIndex}"` : ''}
              ${opt.outOfStock ? 'disabled title="Rupture de stock"' : `title="${opt.display}"`}>
              <span class="swatch-color${opt.transparent ? ' swatch-color--transparent' : ''}"></span>
              <span class="swatch-name">${opt.display}${opt.outOfStock ? ' <em style="font-size:0.7em;opacity:0.6">(Rupture)</em>' : ''}</span>
            </button>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function switchImageByIndex(idx) {
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainImg = document.querySelector('.product-main-img');
  if (!thumbs[idx] || !mainImg) return;
  const src = thumbs[idx].dataset.src;
  if (!src || mainImg.src.endsWith(src)) return;
  thumbs.forEach(t => t.classList.remove('active'));
  thumbs[idx].classList.add('active');
  mainImg.style.transition = 'opacity 0.2s ease';
  mainImg.style.opacity = '0';
  setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 200);
}

function initVariants() {
  const container = document.querySelector('.product-variants');
  if (!container) return;

  // Set initial labels, price and image on load
  container.querySelectorAll('.variant-group').forEach(group => {
    const activeBtn = group.querySelector('.variant-swatch.active, .variant-qty.active');
    if (!activeBtn) return;
    group.querySelector('.variant-selected-label').textContent = activeBtn.dataset.label;
    if (activeBtn.dataset.price) updateProductPrice(parseFloat(activeBtn.dataset.price), parseFloat(activeBtn.dataset.oldprice));
    if (activeBtn.dataset.imgindex !== undefined) switchImageByIndex(parseInt(activeBtn.dataset.imgindex, 10));
  });

  container.addEventListener('click', e => {
    const randBtn = e.target.closest('.variant-random-btn');
    if (randBtn) {
      const group = randBtn.closest('.variant-group');
      const swatches = [...group.querySelectorAll('.variant-swatch, .variant-qty')];
      if (!swatches.length) return;
      const pick = swatches[Math.floor(Math.random() * swatches.length)];
      pick.click();
      pick.classList.remove('swatch-picked');
      void pick.offsetWidth;
      pick.classList.add('swatch-picked');
      setTimeout(() => pick.classList.remove('swatch-picked'), 600);
      return;
    }

    const btn = e.target.closest('.variant-swatch, .variant-qty');
    if (!btn) return;
    const group = btn.closest('.variant-group');
    group.querySelectorAll('.variant-swatch, .variant-qty').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    group.querySelector('.variant-selected-label').textContent = btn.dataset.label;
    if (btn.dataset.price) updateProductPrice(parseFloat(btn.dataset.price), parseFloat(btn.dataset.oldprice));
    if (btn.dataset.imgindex !== undefined) switchImageByIndex(parseInt(btn.dataset.imgindex, 10));

    // Update pack color note and bundle-item thumbnail
    const variantLabel = group.querySelector('.variant-label');
    if (variantLabel) {
      const labelText = variantLabel.textContent.split(':')[0].trim();
      // Update pack-color-selection span in the note
      const noteSpan = document.querySelector(`.pack-color-selection[data-variant-label="${labelText}"]`);
      if (noteSpan) noteSpan.innerHTML = `${labelText} : <strong>${btn.dataset.label}</strong>`;
      // Update bundle-item thumbnail that matches this variant's productId
      const variantGroupEl = group;
      const allVariantGroups = document.querySelectorAll('.variant-group');
      allVariantGroups.forEach(vg => {
        const lbl = vg.querySelector('.variant-label');
        if (!lbl || lbl.textContent.split(':')[0].trim() !== labelText) return;
        // Find the productId from the active button's group via data attribute
      });
      // Update bundle-item image using pack images array
      if (btn.dataset.imgindex !== undefined && typeof p !== 'undefined' && p.images) {
        const imgIndex = parseInt(btn.dataset.imgindex, 10);
        const newSrc = p.images[imgIndex];
        if (newSrc) {
          // Find bundle item whose product images contain this path
          document.querySelectorAll('.bundle-item[data-bundle-id]').forEach(bundleEl => {
            const bundleImg = bundleEl.querySelector('.bundle-item-img img');
            if (!bundleImg) return;
            const bundleId = bundleEl.dataset.bundleId;
            const bprod = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(x => x.id === bundleId) : null;
            if (!bprod) return;
            // Check if the pack image path is a product image for this bundle item
            if (bprod.images && bprod.images.some(img => newSrc.endsWith(img.split('/').pop()))) {
              bundleImg.src = newSrc;
              bundleImg.style.display = '';
              const fallbackIcon = bundleEl.querySelector('.bundle-item-icon');
              if (fallbackIcon) fallbackIcon.style.display = 'none';
            }
          });
        }
      }
    }
  });
}

function updateProductPrice(price, oldPrice) {
  const mainEl  = document.querySelector('.product-price-main');
  const oldEl   = document.querySelector('.product-price-old');
  const saveEl  = document.querySelector('.product-price-savings');
  const saveTxt = document.querySelector('.product-price-saving-text');
  if (!mainEl) return;
  mainEl.textContent = price.toFixed(2).replace('.', ',') + '€';
  if (oldEl && oldPrice)  oldEl.textContent  = oldPrice.toFixed(2).replace('.', ',') + '€';
  if (saveEl && oldPrice) {
    const disc = Math.round((1 - price / oldPrice) * 100);
    saveEl.textContent = `-${disc}%`;
  }
  if (saveTxt && oldPrice) {
    const saved = (oldPrice - price).toFixed(2).replace('.', ',');
    saveTxt.textContent = `Économisez ${saved}€`;
  }
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
  const cart = JSON.parse(localStorage.getItem('ec_cart') || '[]');

  // Read active qty variant (Lot de 3, À l'unité…)
  const activeQty = document.querySelector('.variant-qty.active');
  const variantPrice    = activeQty ? parseFloat(activeQty.dataset.price)    : null;
  const variantOldPrice = activeQty ? parseFloat(activeQty.dataset.oldprice) : null;
  const variantLabel    = activeQty ? activeQty.dataset.label                : null;
  const variantValue    = activeQty ? activeQty.dataset.value                : null;

  // Collect ALL active color swatch groups (handles packs with multiple variant groups)
  const selectedVariants = [];
  document.querySelectorAll('.variant-group').forEach(group => {
    const activeSwatch = group.querySelector('.variant-swatch.active');
    if (!activeSwatch) return;
    const labelEl = group.querySelector('.variant-label');
    const groupLabel = labelEl ? labelEl.textContent.split(':')[0].trim() : '';
    selectedVariants.push({ label: groupLabel, value: activeSwatch.dataset.label, color: activeSwatch.dataset.value });
  });
  const variantsDisplay = selectedVariants.length > 0
    ? selectedVariants.map(v => `${v.label} : ${v.value}`).join(' · ')
    : null;
  // Backward-compat for single-color products
  const colorLabel = selectedVariants.length === 1 ? selectedVariants[0].value : null;
  const colorValue = selectedVariants.length === 1 ? selectedVariants[0].color : null;

  // Use variant-aware cart key (qty variant takes priority; fall back to color key for packs)
  const colorKey = selectedVariants.map(v => v.color).join('_');
  const cartKey = variantValue
    ? `${product.id}__${variantValue}`
    : colorKey ? `${product.id}__${colorKey}` : product.id;

  // Remove any stale entry for the same product (different variant or legacy entry without cartKey)
  // This prevents showing both "À l'unité" and "Lot de 3" simultaneously in cart
  const staleIdx = cart.findIndex(item =>
    item.id === product.id && (item.cartKey || item.id) !== cartKey
  );
  if (staleIdx !== -1) cart.splice(staleIdx, 1);

  const existing = cart.find(item => (item.cartKey || item.id) === cartKey);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
    existing.cartKey = cartKey;
    if (variantPrice !== null)         existing.variantPrice      = variantPrice;
    if (variantOldPrice !== null)      existing.variantOldPrice   = variantOldPrice;
    if (variantLabel)                  existing.variantLabel      = variantLabel;
    if (variantValue)                  existing.variantValue      = variantValue;
    if (variantsDisplay)               existing.variantsDisplay   = variantsDisplay;
    if (selectedVariants.length > 0)   existing.selectedVariants  = selectedVariants;
    if (colorLabel)                    existing.colorLabel        = colorLabel;
    if (colorValue)                    existing.colorValue        = colorValue;
  } else {
    const entry = { id: product.id, cartKey, qty: 1 };
    if (variantPrice !== null)         entry.variantPrice      = variantPrice;
    if (variantOldPrice !== null)      entry.variantOldPrice   = variantOldPrice;
    if (variantLabel)                  entry.variantLabel      = variantLabel;
    if (variantValue)                  entry.variantValue      = variantValue;
    if (variantsDisplay)               entry.variantsDisplay   = variantsDisplay;
    if (selectedVariants.length > 0)   entry.selectedVariants  = selectedVariants;
    if (colorLabel)                    entry.colorLabel        = colorLabel;
    if (colorValue)                    entry.colorValue        = colorValue;
    cart.push(entry);
  }

  localStorage.setItem('ec_cart', JSON.stringify(cart));
  updateCartCounter();
  showCartToast(data.name, isFr);

  // GWP: detect if threshold just crossed (2 items)
  const newTotal = cart.reduce((s, i) => s + (i.qty || 1), 0);
  if (newTotal >= 2) {
    setTimeout(() => showGiftUnlockedToast(), 900);
  }

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
    lbSetActiveThumb(btn, container);
    lbCrossfadeMain(mainImg, src);
  });
}

/* ── Lightbox with full navigation (arrows, keyboard, swipe) ── */
let _lbImages = [];
let _lbIndex  = 0;

function initProductLightbox() {
  const wrap = document.querySelector('.product-main-img-wrap');
  if (!wrap) return;
  wrap.addEventListener('click', () => {
    const mainImg = document.querySelector('.product-main-img');
    if (!mainImg) return;
    const thumbs = Array.from(document.querySelectorAll('.product-thumb'));
    const images = thumbs.length ? thumbs.map(t => t.dataset.src) : [mainImg.src];
    const idx    = thumbs.findIndex(t => t.classList.contains('active'));
    openLightbox(images, Math.max(0, idx), mainImg.alt);
  });
}

function openLightbox(images, startIndex, alt) {
  _lbImages = images;
  _lbIndex  = startIndex || 0;

  let lb = document.getElementById('productLightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'productLightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Fermer">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="14" height="14"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
      </button>
      <button class="lightbox-nav lightbox-nav--prev" aria-label="Image précédente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img src="" alt="" draggable="false">
      <button class="lightbox-nav lightbox-nav--next" aria-label="Image suivante">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="lightbox-counter"></div>`;
    document.body.appendChild(lb);

    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.closest('.lightbox-close')) closeLightbox();
    });
    lb.querySelector('.lightbox-nav--prev').addEventListener('click', e => { e.stopPropagation(); lbNavigate(-1); });
    lb.querySelector('.lightbox-nav--next').addEventListener('click', e => { e.stopPropagation(); lbNavigate(1); });

    // Touch swipe
    let _tx = 0;
    lb.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   e => { const dx = e.changedTouches[0].clientX - _tx; if (Math.abs(dx) > 45) lbNavigate(dx < 0 ? 1 : -1); });

    document.addEventListener('keydown', lbKeyHandler);
  }

  lbSetImage(_lbIndex, true);
  lb.classList.add('lightbox--open');
}

function lbSetImage(index, instant) {
  const lb = document.getElementById('productLightbox');
  if (!lb) return;
  _lbIndex = (index + _lbImages.length) % _lbImages.length;
  const img = lb.querySelector('img');

  if (instant) {
    img.src = _lbImages[_lbIndex];
  } else {
    img.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    img.style.opacity = '0';
    img.style.transform = 'scale(0.96)';
    setTimeout(() => {
      img.src = _lbImages[_lbIndex];
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 150);
  }

  // Counter
  const counter = lb.querySelector('.lightbox-counter');
  const hasMany = _lbImages.length > 1;
  counter.textContent = hasMany ? `${_lbIndex + 1} / ${_lbImages.length}` : '';
  lb.querySelector('.lightbox-nav--prev').style.display = hasMany ? '' : 'none';
  lb.querySelector('.lightbox-nav--next').style.display = hasMany ? '' : 'none';

  // Sync thumbnail strip + main image
  const thumbs = document.querySelectorAll('.product-thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === _lbIndex));
  const mainImg = document.querySelector('.product-main-img');
  if (mainImg) lbCrossfadeMain(mainImg, _lbImages[_lbIndex]);
}

function lbNavigate(dir) { lbSetImage(_lbIndex + dir); }

function lbKeyHandler(e) {
  const lb = document.getElementById('productLightbox');
  if (!lb || !lb.classList.contains('lightbox--open')) return;
  if (e.key === 'Escape')      { closeLightbox(); }
  if (e.key === 'ArrowLeft')   { lbNavigate(-1); }
  if (e.key === 'ArrowRight')  { lbNavigate(1); }
}

function closeLightbox() {
  const lb = document.getElementById('productLightbox');
  if (!lb) return;
  lb.classList.remove('lightbox--open');
  document.removeEventListener('keydown', lbKeyHandler);
  setTimeout(() => lb.remove(), 260);
  _lbImages = []; _lbIndex = 0;
}

function lbCrossfadeMain(mainImg, src) {
  if (mainImg.src.endsWith(src) || mainImg.src === src) return;
  mainImg.style.transition = 'opacity 0.18s ease';
  mainImg.style.opacity = '0';
  setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 180);
}

function lbSetActiveThumb(btn, container) {
  container.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
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

/* ── GWP toast ── */
function showGiftUnlockedToast() {
  let toast = document.getElementById('giftToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'giftToast';
    toast.className = 'gift-toast';
    toast.innerHTML = `<span class="gift-toast-icon">🎁</span><div class="gift-toast-text">Cadeau surprise débloqué !<span class="gift-toast-sub">Votre kit ESSENTIEL CAR vous attend dans le colis 🎉</span></div>`;
    document.body.appendChild(toast);
  }
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
}
