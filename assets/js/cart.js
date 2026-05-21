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
  const subtotal  = items.reduce((s, item) => s + item.product.price * item.qty, 0);
  const shipping  = subtotal >= 49 ? 0 : 4.99;
  const total     = subtotal + shipping;
  const savings   = items.reduce((s, item) => s + (item.product.oldPrice - item.product.price) * item.qty, 0);

  const fmtPrice = (v) => v.toFixed(2).replace('.', ',') + '€';

  summaryEl.innerHTML = `
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
      <div class="cart-summary-line">
        <span>${isFr ? 'Livraison' : 'Shipping'}</span>
        <span class="${shipping === 0 ? 'shipping-free' : ''}">${shipping === 0 ? (isFr ? 'Gratuite' : 'Free') : fmtPrice(shipping)}</span>
      </div>
      ${subtotal < 49 && subtotal > 0 ? `
      <div class="cart-free-shipping-notice">
        <div class="cart-free-shipping-bar">
          <div class="cart-free-shipping-fill" style="width:${Math.min(100, (subtotal/49)*100).toFixed(0)}%"></div>
        </div>
        <p>${isFr ? `Plus que ${fmtPrice(49 - subtotal)} pour la livraison gratuite !` : `Only ${fmtPrice(49 - subtotal)} away from free shipping!`}</p>
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

    <p class="cart-secure-note">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      ${isFr ? 'Paiement 100% sécurisé · SSL · CB · PayPal' : '100% secure payment · SSL · Card · PayPal'}
    </p>

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

function renderCartItem(item, t_key, isFr) {
  const p    = item.product;
  const data = p[t_key] || p.fr;
  const priceStr    = p.price.toFixed(2).replace('.', ',');
  const oldStr      = p.oldPrice.toFixed(2).replace('.', ',');
  const lineTotal   = (p.price * item.qty).toFixed(2).replace('.', ',');

  return `
    <div class="cart-item" data-id="${p.id}">
      <div class="cart-item-visual" style="background: radial-gradient(ellipse at 40% 40%, ${p.accentColor} 0%, #111 100%);">
        <div class="cart-item-icon">${p.icon}</div>
        <a href="product.html?id=${p.id}" class="cart-item-visual-link" aria-label="${data.name}"></a>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <div>
            <p class="cart-item-cat">${isFr ? getCatLabel(p.category, true) : getCatLabel(p.category, false)}</p>
            <a href="product.html?id=${p.id}" class="cart-item-name">${data.name}</a>
            <p class="cart-item-tagline">${data.tagline}</p>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${p.id}')" aria-label="${isFr ? 'Supprimer' : 'Remove'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="cart-item-bottom">
          <div class="cart-item-pricing">
            <span class="cart-item-price">${priceStr}€</span>
            <span class="cart-item-old">${oldStr}€</span>
            <span class="cart-item-discount">-${p.discount}%</span>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty('${p.id}', -1)" aria-label="${isFr ? 'Diminuer' : 'Decrease'}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${p.id}', 1)" aria-label="${isFr ? 'Augmenter' : 'Increase'}">+</button>
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

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  if (item.qty < 1) {
    removeFromCart(id);
    return;
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);

  // Animate out
  const el = document.querySelector(`.cart-item[data-id="${id}"]`);
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

function handleCheckout() {
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const isFr = lang === 'fr';
  alert(isFr
    ? '🛒 Commande en cours de traitement...\n\nIntégrez un système de paiement (Stripe, PayPal) pour finaliser le checkout.'
    : '🛒 Processing order...\n\nConnect a payment provider (Stripe, PayPal) to complete checkout.'
  );
}
