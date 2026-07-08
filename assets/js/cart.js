/* =========================================================
   ESSENTIEL CAR — Cart Page (localStorage)
   ========================================================= */

function initCartPage() {
  if (!document.getElementById('cartItemsList')) return;
  renderCart();
  document.addEventListener('langchange', renderCart);
}

function getCart() {
  return JSON.parse(localStorage.getItem('ec_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('ec_cart', JSON.stringify(cart));
  updateCartCounter();
}

function renderCart() {
  const cart   = getCart();
  const lang   = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const isFr   = lang === 'fr';
  const t_key  = isFr ? 'fr' : 'en';

  const listEl    = document.getElementById('cartItemsList');
  const summaryEl = document.getElementById('cartSummaryCard');
  const headingEl = document.getElementById('cartHeading');

  if (headingEl) headingEl.textContent = isFr ? 'Votre panier' : 'Your cart';

  if (!listEl || !summaryEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = renderEmptyCart(isFr);
    summaryEl.innerHTML = '';
    return;
  }

  // Build enriched items
  const items = cart.map(item => {
    const product = typeof PRODUCTS !== 'undefined'
      ? PRODUCTS.find(p => p.id === item.id)
      : null;
    return { ...item, product };
  }).filter(item => item.product);

  if (items.length === 0) {
    listEl.innerHTML = renderEmptyCart(isFr);
    summaryEl.innerHTML = '';
    return;
  }

  // Render items list
  listEl.innerHTML = `
    <div class="cart-items-header">
      <span class="cart-items-count">${items.length} ${isFr ? (items.length > 1 ? 'articles' : 'article') : (items.length > 1 ? 'items' : 'item')}</span>
      <button class="cart-clear-btn" onclick="clearCart()">${isFr ? 'Vider le panier' : 'Clear cart'}</button>
    </div>
    <div class="cart-items-list">
      ${items.map(item => renderCartItem(item, t_key, isFr)).join('')}
    </div>
  `;

  // Calculate totals
  const subtotal  = items.reduce((s, item) => s + (item.variantPrice ?? item.product.price) * item.qty, 0);
  const savings   = items.reduce((s, item) => {
    const price    = item.variantPrice    ?? item.product.price;
    const oldPrice = item.variantOldPrice ?? item.product.oldPrice;
    if (!oldPrice || oldPrice <= price) return s;
    return s + (oldPrice - price) * item.qty;
  }, 0);

  // Bestseller -50% on cheapest bestseller unit
  const bsUnits = [];
  items.forEach(item => {
    if (item.product.badgeType !== 'bestseller') return;
    const unitPrice = item.variantPrice ?? item.product.price;
    for (let i = 0; i < item.qty; i++) bsUnits.push(unitPrice);
  });
  bsUnits.sort((a, b) => a - b);
  const bsDiscount = bsUnits.length >= 2 ? bsUnits[0] * 0.5 : 0;

  const shipping  = subtotal >= 49.90 ? 0 : 4.99;
  const total     = subtotal - bsDiscount + shipping;

  const fmtPrice = (v) => v.toFixed(2).replace('.', ',') + '€';

  const cartIds = items.map(i => i.product.id);
  const smartBlock = (bsDiscount > 0 && shipping > 0)
    ? renderSmartSuggestions(subtotal, cartIds, isFr)
    : '';

  summaryEl.innerHTML = `
    ${smartBlock}
    <h2 class="cart-summary-title">${isFr ? 'Récapitulatif' : 'Order summary'}</h2>

    <div class="cart-summary-lines">
      <div class="cart-summary-line">
        <span>${isFr ? 'Sous-total' : 'Subtotal'}</span>
        <span>${fmtPrice(subtotal)}</span>
      </div>
      <div class="cart-summary-line cart-summary-savings">
        <span>${isFr ? 'Économies' : 'Savings'}</span>
        <span class="savings-amount">-${fmtPrice(savings)}</span>
      </div>
      ${bsDiscount > 0 ? `
      <div class="cart-summary-line cart-summary-bs-discount">
        <span>🎁 ${isFr ? '2ème Best Seller -50%' : '2nd Best Seller -50%'}</span>
        <span class="savings-amount">-${fmtPrice(bsDiscount)}</span>
      </div>` : (bsUnits.length === 1 ? `
      <div class="cart-summary-bs-hint">
        ${isFr ? 'Ajoutez 1 Best Seller de plus pour −50% !' : 'Add 1 more Best Seller for −50%!'}
      </div>` : '')}
      <div class="cart-summary-line">
        <span>${isFr ? 'Livraison' : 'Shipping'}</span>
        <span class="${shipping === 0 ? 'shipping-free' : ''}">${shipping === 0 ? (isFr ? 'Gratuite' : 'Free') : fmtPrice(shipping)}</span>
      </div>
      ${subtotal < 49.90 && subtotal > 0 ? `
      <div class="cart-free-shipping-notice">
        <div class="cart-free-shipping-bar">
          <div class="cart-free-shipping-fill" style="width:${Math.min(100, (subtotal/49.90)*100).toFixed(0)}%"></div>
        </div>
        <p>${isFr ? `Plus que ${fmtPrice(49.90 - subtotal)} sur le sous-total pour la livraison gratuite !` : `Only ${fmtPrice(49.90 - subtotal)} more in subtotal for free shipping!`}</p>
      </div>` : ''}
    </div>

    <div class="cart-summary-total">
      <span>${isFr ? 'Total' : 'Total'}</span>
      <span>${fmtPrice(total)}</span>
    </div>

    <button class="btn btn--primary btn--lg cart-checkout-btn" onclick="handleCheckout()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      ${isFr ? 'Commander — ' + fmtPrice(total) : 'Checkout — ' + fmtPrice(total)}
    </button>

    <div class="cart-payment-logos">
      <!-- Visa -->
      <span class="pay-logo pay-logo--visa" aria-label="Visa">
        <svg viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="13">
          <rect width="50" height="16" rx="3" fill="#1A1F71"/>
          <text x="5" y="12" font-family="Arial" font-size="10" font-weight="bold" font-style="italic" fill="white" letter-spacing="0.5">VISA</text>
        </svg>
      </span>
      <!-- Mastercard -->
      <span class="pay-logo pay-logo--mc" aria-label="Mastercard">
        <svg viewBox="0 0 50 32" width="34" height="22" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="32" rx="4" fill="#252525"/>
          <circle cx="19" cy="16" r="10" fill="#EB001B"/>
          <circle cx="31" cy="16" r="10" fill="#F79E1B"/>
          <path d="M25 8.27a10 10 0 0 1 0 15.46A10 10 0 0 1 25 8.27z" fill="#FF5F00"/>
        </svg>
      </span>
      <!-- CB -->
      <span class="pay-logo pay-logo--cb" aria-label="Carte Bancaire">
        <svg viewBox="0 0 50 32" width="34" height="22" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="32" rx="4" fill="#0066CC"/>
          <text x="8" y="21" font-family="Arial" font-size="13" font-weight="bold" fill="white">CB</text>
        </svg>
      </span>
      <!-- Apple Pay -->
      <span class="pay-logo pay-logo--apple" aria-label="Apple Pay">
        <svg viewBox="0 0 60 32" width="46" height="22" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="32" rx="4" fill="#000"/>
          <text x="7" y="22" font-family="-apple-system, Arial" font-size="11" fill="white"> Pay</text>
          <path d="M10 10.5c.6-.7.9-1.6.8-2.5-.8.1-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9 0 1.8-.4 2.3-1.1zm.8 1.3c-1.3-.1-2.4.7-3 .7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.8-3.1 1.9-1.3 2.3-.3 5.7 1 7.5.6.9 1.4 1.9 2.4 1.8.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-.9 2.4-1.8.7-1 1-2 1-2.1 0 0-2-.8-2-3 0-1.9 1.6-2.8 1.6-2.8-.9-1.3-2.3-1.5-2.6-1.5z" fill="white" transform="translate(2, 1) scale(0.85)"/>
        </svg>
      </span>
      <!-- Google Pay -->
      <span class="pay-logo pay-logo--gpay" aria-label="Google Pay">
        <svg viewBox="0 0 60 32" width="46" height="22" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="32" rx="4" fill="white" stroke="#e0e0e0" stroke-width="1"/>
          <text x="8" y="22" font-family="Arial" font-size="11" font-weight="500" fill="#3c4043"><tspan fill="#4285F4">G</tspan><tspan fill="#3c4043">oogle </tspan><tspan fill="#3c4043">Pay</tspan></text>
        </svg>
      </span>
    </div>

    <p class="cart-secure-note">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      ${isFr ? 'Paiement 100% sécurisé · SSL · Chiffrement 3D Secure' : '100% secure payment · SSL · 3D Secure encryption'}
    </p>

    ${renderInCartBestsellerScroll(cartIds, isFr)}

    <a href="boutique.html" class="cart-continue-link">
      ← ${isFr ? 'Continuer mes achats' : 'Continue shopping'}
    </a>
  `;

  // Animate items
  if (typeof gsap !== 'undefined') {
    gsap.from('.cart-item', { opacity: 0, y: 20, stagger: 0.07, duration: 0.5, ease: 'power3.out' });
    gsap.from('.cart-summary-card', { opacity: 0, x: 30, duration: 0.7, ease: 'power3.out', delay: 0.2 });
  }
}

function buildVariantLine(item) {
  if (item.variantsDisplay) return `<p class="cart-item-variant">${item.variantsDisplay}</p>`;
  const parts = [];
  if (item.variantLabel) parts.push(item.variantLabel);
  if (item.colorLabel)   parts.push(item.colorLabel);
  return parts.length > 0 ? `<p class="cart-item-variant">${parts.join(' · ')}</p>` : '';
}

function renderCartItem(item, t_key, isFr) {
  const p    = item.product;
  const data = p[t_key] || p.fr;
  const price    = item.variantPrice    ?? p.price;
  const oldPrice = item.variantOldPrice ?? p.oldPrice;
  const hasDiscount = oldPrice && oldPrice > price;
  const priceStr    = price.toFixed(2).replace('.', ',');
  const oldStr      = hasDiscount ? oldPrice.toFixed(2).replace('.', ',') : null;
  const lineTotal   = (price * item.qty).toFixed(2).replace('.', ',');

  return `
    <div class="cart-item" data-id="${p.id}">
      <div class="cart-item-visual" style="background: radial-gradient(ellipse at 40% 40%, ${p.accentColor} 0%, #111 100%);">
        ${p.images && p.images[0]
          ? `<img class="cart-item-img" src="${p.images[0]}" alt="${data.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="cart-item-icon" style="${p.images && p.images[0] ? 'display:none' : ''}">${p.icon}</div>
        <a href="product.html?id=${p.id}" class="cart-item-visual-link" aria-label="${data.name}"></a>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <div>
            <p class="cart-item-cat">${isFr ? getCatLabel(p.category, true) : getCatLabel(p.category, false)}</p>
            <a href="product.html?id=${p.id}" class="cart-item-name">${data.name}</a>
            ${buildVariantLine(item)}
            <p class="cart-item-tagline">${data.tagline}</p>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.cartKey || p.id}')" aria-label="${isFr ? 'Supprimer' : 'Remove'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="cart-item-bottom">
          <div class="cart-item-pricing">
            <span class="cart-item-price">${priceStr}€</span>
            ${hasDiscount ? `<span class="cart-item-old">${oldStr}€</span><span class="cart-item-discount">-${Math.round((1 - price / oldPrice) * 100)}%</span>` : ''}
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty('${item.cartKey || p.id}', -1)" aria-label="${isFr ? 'Diminuer' : 'Decrease'}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.cartKey || p.id}', 1)" aria-label="${isFr ? 'Augmenter' : 'Increase'}">+</button>
          </div>
          <span class="cart-item-total">${lineTotal}€</span>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyCart(isFr) {
  return `
    <div class="cart-empty">
      <div class="cart-empty-icon">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M10 10L16 10 24 44 48 44"/>
          <path d="M16 10L22 36 48 36 54 16 16 16"/>
          <circle cx="26" cy="52" r="4"/>
          <circle cx="44" cy="52" r="4"/>
        </svg>
      </div>
      <h2 class="cart-empty-title">${isFr ? 'Votre panier est vide' : 'Your cart is empty'}</h2>
      <p class="cart-empty-sub">${isFr ? 'Découvrez nos accessoires automobile premium.' : 'Discover our premium car accessories.'}</p>
      <a href="boutique.html" class="btn btn--primary btn--lg">
        ${isFr ? 'Voir la boutique' : 'Browse the shop'}
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 7.5h13M7.5 1l6.5 6.5-6.5 6.5"/></svg>
      </a>
    </div>
  `;
}

function getCatLabel(cat, isFr) {
  const labels = {
    nettoyage:   isFr ? 'Nettoyage'   : 'Cleaning',
    securite:    isFr ? 'Sécurité'    : 'Safety',
    confort:     isFr ? 'Confort'     : 'Comfort',
    technologie: isFr ? 'Technologie' : 'Technology',
    entretien:   isFr ? 'Entretien'   : 'Maintenance',
  };
  return labels[cat] || cat;
}

function updateQty(cartKey, delta) {
  const cart = getCart();
  const item = cart.find(i => (i.cartKey || i.id) === cartKey);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  if (item.qty < 1) {
    removeFromCart(cartKey);
    return;
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(cartKey) {
  const cart = getCart().filter(i => (i.cartKey || i.id) !== cartKey);
  saveCart(cart);

  // Animate out
  const el = document.querySelector(`.cart-item[data-id="${cartKey}"]`);
  if (el && typeof gsap !== 'undefined') {
    gsap.to(el, {
      opacity: 0, x: -30, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0,
      duration: 0.35, ease: 'power3.in',
      onComplete: renderCart,
    });
  } else {
    renderCart();
  }
}

function clearCart() {
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const isFr = lang === 'fr';
  const msg  = isFr ? 'Vider le panier ?' : 'Clear cart?';
  if (!confirm(msg)) return;
  saveCart([]);
  renderCart();
}

function renderInCartBestsellerScroll(cartIds, isFr) {
  if (typeof PRODUCTS === 'undefined') return '';
  const products = PRODUCTS
    .filter(p => p.badgeType === 'bestseller' && !cartIds.includes(p.id))
    .slice(0, 6);
  if (products.length === 0) return '';
  const fmt = v => v.toFixed(2).replace('.', ',') + '€';
  return `
    <div class="cart-bs-scroll-section">
      <p class="cart-bs-scroll-title">${isFr ? '⭐ Complétez votre panier' : '⭐ Complete your cart'}</p>
      <div class="cart-bs-scroll-track">
        ${products.map(p => {
          const d = p[isFr ? 'fr' : 'en'] || p.fr;
          return `<div class="cart-bs-scroll-card">
            <a href="product.html?id=${p.id}" class="cart-bs-scroll-img-link">
              <div class="cart-bs-scroll-img" style="background:radial-gradient(ellipse at 40% 40%,${p.accentColor} 0%,#111 100%)">
                ${p.images?.[0]
                  ? `<img src="${p.images[0]}" alt="${d.name}" loading="lazy">`
                  : `<span>${p.icon}</span>`}
              </div>
            </a>
            <p class="cart-bs-scroll-name">${d.name}</p>
            <p class="cart-bs-scroll-price">${fmt(p.price)}</p>
            <button class="btn btn--primary cart-bs-scroll-add" onclick="addBsToCart('${p.id}')">${isFr ? '+ Ajouter' : '+ Add'}</button>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function addBsToCart(productId) {
  const p = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(pr => pr.id === productId) : null;
  if (!p) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty++; } else { cart.push({ id: productId, qty: 1 }); }
  saveCart(cart);
  renderCart();
}

function renderSmartSuggestions(subtotal, cartIds, isFr) {
  if (typeof PRODUCTS === 'undefined') return '';
  const gap = 49.90 - subtotal;
  const fmt = v => v.toFixed(2).replace('.', ',') + '€';
  const suggestions = PRODUCTS
    .filter(p => p.badgeType === 'bestseller' && !cartIds.includes(p.id) && p.price >= gap)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);
  const warnText = isFr
    ? `⚠️ Sans ajout : frais de livraison 🚚 <strong>+4,99€</strong> — il manque <strong>${fmt(gap)}</strong> au sous-total.`
    : `⚠️ Without addition: delivery 🚚 <strong>+€4.99</strong> — missing <strong>${fmt(gap)}</strong> to the subtotal.`;
  if (suggestions.length === 0) {
    return `<div class="cart-smart-warning-only"><p>${warnText}</p></div>`;
  }
  return `
    <div class="cart-smart-suggestions">
      <div class="cart-smart-header">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <p>${isFr ? 'Cumulez <strong>−50%</strong> + <strong>livraison offerte</strong> en ajoutant&nbsp;:' : 'Combine <strong>−50%</strong> + <strong>free shipping</strong> by adding:'}</p>
      </div>
      <div class="cart-smart-list">
        ${suggestions.map(p => {
          const d = p[isFr ? 'fr' : 'en'] || p.fr;
          return `<div class="cart-smart-item">
            <div class="cart-smart-visual" style="background:radial-gradient(ellipse at 40% 40%,${p.accentColor} 0%,#111 100%)">
              ${p.images?.[0] ? `<img src="${p.images[0]}" alt="${d.name}" loading="lazy">` : `<span>${p.icon}</span>`}
            </div>
            <div class="cart-smart-info">
              <p class="cart-smart-name">${d.name}</p>
              <p class="cart-smart-price">${fmt(p.price)}</p>
            </div>
            <button class="btn btn--primary cart-smart-add" onclick="addBsToCart('${p.id}')">${isFr ? '+ Ajouter' : '+ Add'}</button>
          </div>`;
        }).join('')}
      </div>
      <p class="cart-smart-or">${warnText}</p>
    </div>`;
}

async function handleCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;

  const lang  = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const isFr  = lang === 'fr';

  const items = cart.map(item => {
    const product = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(p => p.id === item.id) : null;
    if (!product) return null;
    const data = product[isFr ? 'fr' : 'en'] || product.fr;
    const variantParts = [];
    if (item.variantLabel)    variantParts.push(item.variantLabel);
    if (item.variantsDisplay)  variantParts.push(item.variantsDisplay);
    else if (item.colorLabel)  variantParts.push(item.colorLabel);
    return {
      id:    product.id,
      isBs:  product.badgeType === 'bestseller',
      name:  variantParts.length > 0 ? `${data.name} — ${variantParts.join(' · ')}` : data.name,
      price: item.variantPrice ?? product.price,
      qty:   item.qty,
      image: product.images && product.images[0]
        ? window.location.origin + '/' + product.images[0]
        : null,
    };
  }).filter(Boolean);

  // Apply bestseller -50% on cheapest bestseller unit
  const bsEntries = [];
  items.forEach((item, idx) => {
    if (!item.isBs) return;
    for (let i = 0; i < item.qty; i++) bsEntries.push({ idx, price: item.price });
  });
  bsEntries.sort((a, b) => a.price - b.price);
  if (bsEntries.length >= 2) {
    const { idx, price } = bsEntries[0];
    const target = items[idx];
    if (target.qty > 1) {
      target.qty -= 1;
      items.push({ name: target.name + (isFr ? ' (−50%)' : ' (−50%)'), price: price * 0.5, qty: 1, image: target.image });
    } else {
      target.price = price * 0.5;
      target.name += ' (−50%)';
    }
  }

  // Add shipping based on PRE-discount subtotal (consistent with cart display)
  const preDiscountSubtotal = cart.reduce((s, item) => {
    const product = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(p => p.id === item.id) : null;
    if (!product) return s;
    return s + (item.variantPrice ?? product.price) * item.qty;
  }, 0);
  if (preDiscountSubtotal < 49.90) {
    items.push({ name: isFr ? 'Frais de livraison' : 'Shipping', price: 4.99, qty: 1, image: null });
  }

  const btn = document.querySelector('.cart-checkout-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span style="opacity:.7">${isFr ? 'Redirection vers le paiement…' : 'Redirecting to payment…'}</span>`;
  }

  try {
    const res = await fetch('https://create-checkout.essentielcar.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error(isFr
        ? 'Erreur temporaire du serveur de paiement. Veuillez réessayer dans quelques instants.'
        : 'Temporary payment server error. Please try again in a moment.');
    }
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || (isFr ? 'Erreur paiement. Veuillez réessayer.' : 'Payment error. Please try again.'));
    }
  } catch (err) {
    console.error('Checkout error:', err);
    renderCart();
    const msg = (err.message && err.message !== 'Failed to fetch')
      ? err.message
      : (isFr ? 'Erreur lors de la connexion au paiement. Veuillez réessayer.' : 'Could not connect to payment. Please try again.');
    alert(msg);
  }
}
