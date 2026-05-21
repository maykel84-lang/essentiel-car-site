/* =========================================================
   ESSENTIEL CAR — Features Module
   Countdown · Stock · Currency · Upsell · Chatbot
   ========================================================= */

/* ── Currency Converter ── */
const CURRENCIES = {
  EUR: { symbol: '€', rate: 1,    label: 'EUR €' },
  USD: { symbol: '$', rate: 1.08, label: 'USD $' },
  GBP: { symbol: '£', rate: 0.86, label: 'GBP £' },
  MAD: { symbol: 'DH',rate: 10.8, label: 'MAD DH' },
  CAD: { symbol: 'C$',rate: 1.47, label: 'CAD C$' },
  CHF: { symbol: '₣', rate: 0.97, label: 'CHF ₣' },
  DZD: { symbol: 'DA',rate: 145,  label: 'DZD DA' },
  TND: { symbol: 'DT',rate: 3.32, label: 'TND DT' },
};

let currentCurrency = localStorage.getItem('ec_currency') || 'EUR';

function convertPrice(eurPrice) {
  const c = CURRENCIES[currentCurrency] || CURRENCIES.EUR;
  const converted = eurPrice * c.rate;
  const formatted = converted < 100
    ? converted.toFixed(2).replace('.', ',')
    : Math.round(converted).toLocaleString('fr-FR');
  return `${formatted}${c.symbol}`;
}

function setCurrency(code) {
  if (!CURRENCIES[code]) return;
  currentCurrency = code;
  localStorage.setItem('ec_currency', code);
  updateAllPrices();
  document.querySelectorAll('.currency-option').forEach(b =>
    b.classList.toggle('active', b.dataset.currency === code)
  );
  const mainBtn = document.querySelector('.currency-btn-main span');
  if (mainBtn) mainBtn.textContent = CURRENCIES[code].label;
  // Close dropdown
  document.querySelectorAll('.currency-selector').forEach(s => s.classList.remove('open'));
}

function updateAllPrices() {
  document.querySelectorAll('.price-current[data-eur]').forEach(el => {
    el.textContent = convertPrice(parseFloat(el.dataset.eur));
  });
  document.querySelectorAll('.price-old[data-eur]').forEach(el => {
    el.textContent = convertPrice(parseFloat(el.dataset.eur));
  });
}

function initCurrencySelector() {
  document.querySelectorAll('.currency-selector').forEach(sel => {
    const btn = sel.querySelector('.currency-btn-main');
    const dropdown = sel.querySelector('.currency-dropdown');
    if (!btn || !dropdown) return;

    // Build options
    dropdown.innerHTML = Object.entries(CURRENCIES).map(([code, c]) =>
      `<div class="currency-option${code === currentCurrency ? ' active' : ''}" data-currency="${code}" onclick="setCurrency('${code}')">${c.label}</div>`
    ).join('');

    // Set initial label
    const lbl = btn.querySelector('span');
    if (lbl) lbl.textContent = CURRENCIES[currentCurrency]?.label || 'EUR €';

    btn.addEventListener('click', e => {
      e.stopPropagation();
      sel.classList.toggle('open');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.currency-selector')) {
      document.querySelectorAll('.currency-selector').forEach(s => s.classList.remove('open'));
    }
    if (!e.target.closest('#navLang')) {
      const navLang = document.getElementById('navLang');
      if (navLang) navLang.classList.remove('open');
    }
  });

  // Apply saved currency to existing price elements
  if (currentCurrency !== 'EUR') updateAllPrices();
}

/* ── Countdown Timers ── */
function initCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const key = `ec_cd_${el.dataset.countdown}`;
    let end = parseInt(sessionStorage.getItem(key) || 0);

    if (!end || Date.now() > end) {
      // Random 1h45m – 4h30m
      end = Date.now() + (6300 + Math.random() * 9900) * 1000;
      sessionStorage.setItem(key, end);
    }

    const timerEl = el.querySelector('.countdown-timer');
    if (!timerEl) return;

    function tick() {
      let diff = end - Date.now();
      if (diff <= 0) {
        end = Date.now() + (6300 + Math.random() * 9900) * 1000;
        sessionStorage.setItem(key, end);
        diff = end - Date.now();
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      timerEl.textContent =
        `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    tick();
    setInterval(tick, 1000);
  });
}

/* ── Stock Fictif ── */
function initStockCounters() {
  document.querySelectorAll('[data-stock-id]').forEach(el => {
    const id = el.dataset.stockId;
    const key = `ec_stock_${id}`;
    let stock = parseInt(sessionStorage.getItem(key));

    if (isNaN(stock)) {
      stock = Math.floor(Math.random() * 5) + 2; // 2–6
      sessionStorage.setItem(key, stock);
    }

    const numEl = el.querySelector('.stock-num');
    if (numEl) numEl.textContent = stock;

    function maybeDecrease() {
      const cur = parseInt(sessionStorage.getItem(key));
      if (cur > 1 && Math.random() < 0.35) {
        const next = cur - 1;
        sessionStorage.setItem(key, next);
        if (numEl) {
          numEl.textContent = next;
          numEl.classList.add('stock-pulse');
          setTimeout(() => numEl.classList.remove('stock-pulse'), 500);
        }
      }
      setTimeout(maybeDecrease, 35000 + Math.random() * 55000);
    }
    setTimeout(maybeDecrease, 20000 + Math.random() * 40000);
  });
}

/* ── Upsell Popup ── */
function openUpsellPopup(productId) {
  const overlay = document.getElementById('upsellOverlay');
  if (!overlay || typeof PRODUCTS === 'undefined') return;

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const t = lang === 'en' ? 'en' : 'fr';
  const current = PRODUCTS.find(p => p.id === productId);
  if (!current) return;

  // Get 2 related products (prefer same category, else any)
  let related = PRODUCTS.filter(p => p.id !== productId && p.category === current.category).slice(0, 2);
  if (related.length < 2) {
    related = related.concat(PRODUCTS.filter(p => p.id !== productId && !related.includes(p)).slice(0, 2 - related.length));
  }

  const grid = overlay.querySelector('.upsell-grid');
  if (grid) {
    grid.innerHTML = related.map(p => {
      const d = p[t] || p.fr;
      return `
        <div class="upsell-product" onclick="addToCartQuick('${p.id}')">
          ${p.images?.[0] ? `<img class="upsell-img" src="${p.images[0]}" alt="${d.name}" onerror="this.style.display='none'">` : `<div class="upsell-icon" style="height:80px;display:flex;align-items:center;justify-content:center">${p.icon}</div>`}
          <p class="upsell-name">${d.name}</p>
          <p class="upsell-price">${convertPrice(p.price)}</p>
          <button class="btn btn--primary btn--sm" style="width:100%">${t === 'en' ? 'Add to cart' : 'Ajouter au panier'}</button>
        </div>`;
    }).join('');
  }

  overlay.classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeUpsellPopup() {
  const overlay = document.getElementById('upsellOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

function addToCartQuick(productId) {
  const p = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(x => x.id === productId) : null;
  if (!p) { closeUpsellPopup(); return; }
  const cart = JSON.parse(localStorage.getItem('ec_cart') || '[]');
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty = (existing.qty || 1) + 1; }
  else { cart.push({ id: productId, qty: 1 }); }
  localStorage.setItem('ec_cart', JSON.stringify(cart));
  if (typeof updateCartCounter === 'function') updateCartCounter();
  closeUpsellPopup();
  // Show quick toast
  showToast(typeof currentLang !== 'undefined' && currentLang === 'en' ? 'Added to cart!' : 'Ajouté au panier !');
}

function showToast(msg) {
  let toast = document.getElementById('ec-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ec-toast';
    toast.style.cssText = `position:fixed;bottom:5rem;left:50%;transform:translateX(-50%) translateY(10px);background:#1a1a1a;color:white;padding:0.75rem 1.5rem;border-radius:999px;font-size:0.85rem;z-index:9999;border:1px solid rgba(255,255,255,0.1);opacity:0;transition:all 0.3s;pointer-events:none`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2500);
}

/* ── Chatbot ── */
const CHAT_REPLIES = [
  { pattern: /livraison|délai|expéd|envoi|shipping|delivery/i,
    reply: () => "🚚 Expédition sous <strong>24h ouvrées</strong>, livraison <strong>3–7 jours</strong> en France. Un email de suivi vous est envoyé dès l'expédition." },
  { pattern: /suivi|commande|tracking|colis|order|track/i,
    reply: () => `📦 Suivez votre commande sur notre <a href='tracking.html' style='color:var(--red)'>page de suivi</a>. Entrez votre numéro de commande + email.` },
  { pattern: /retour|rembours|échange|satisfait|return|refund/i,
    reply: () => "↩️ Retours gratuits sous <strong>30 jours</strong>. Contactez-nous à <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a>." },
  { pattern: /promo|réduction|remise|code|coupon|solde|discount/i,
    reply: () => "💥 Bestsellers à <strong>-37%</strong> en ce moment ! Code <strong>ESSCAR10</strong> pour -10% supplémentaires sur votre commande." },
  { pattern: /aspirateur|vacuum|aspirat/i,
    reply: () => `🔋 <strong>Aspirateur Sans Fil</strong> — 49,90€ (-37%). Moteur 120W, batterie 30 min, filtre HEPA. <a href='product.html?id=aspirateur-sans-fil' style='color:var(--red)'>Voir le produit →</a>` },
  { pattern: /dashcam|caméra|camera/i,
    reply: () => `📹 <strong>Dashcam 4K Ultra HD</strong> — 79,90€. Vision nocturne, GPS, 170° grand-angle. <a href='product.html?id=dashcam-4k' style='color:var(--red)'>Voir le produit →</a>` },
  { pattern: /compresseur|pneu|gonf|tire|pump/i,
    reply: () => `🔧 <strong>Compresseur d'Air Sans Fil</strong> — 59,90€. Gonflage en 3 min, batterie rechargeable. <a href='product.html?id=compresseur-air' style='color:var(--red)'>Voir le produit →</a>` },
  { pattern: /paiement|visa|paypal|mastercard|payer|payment/i,
    reply: () => "💳 Visa, Mastercard, Amex, PayPal, Apple Pay. Toutes les transactions sont sécurisées par cryptage <strong>SSL 256 bits</strong>." },
  { pattern: /contact|email|mail|service|aide|help/i,
    reply: () => "📧 <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a> — réponse garantie sous <strong>2h</strong> en jours ouvrés." },
  { pattern: /bonjour|salut|hello|hi|hey|bonsoir/i,
    reply: () => "Bonjour ! 😊 Comment puis-je vous aider ? Posez-moi vos questions sur les produits, la livraison, les retours ou le paiement." },
  { pattern: /produit|product|article|catalogue/i,
    reply: () => `🛍️ Découvrez notre catalogue complet sur <a href='boutique.html' style='color:var(--red)'>la boutique</a>. Des accessoires auto premium, testés et sélectionnés.` },
  { pattern: /garantie|warranty|durée/i,
    reply: () => "🛡️ Tous nos produits bénéficient d'une <strong>garantie 2 ans</strong>. En cas de défaut, remplacement ou remboursement intégral." },
];

const DEFAULT_REPLY = () => `Je peux vous renseigner sur :<br>
• 📦 <strong>Livraison & suivi</strong><br>
• ↩️ <strong>Retours & remboursements</strong><br>
• 💥 <strong>Promotions en cours</strong><br>
• 🛍️ <strong>Nos produits</strong><br>
• 💳 <strong>Paiement sécurisé</strong>`;

function initChatbot() {
  const bubble  = document.getElementById('chatbotBubble');
  const win     = document.getElementById('chatbotWindow');
  const closeBtn= document.getElementById('chatbotClose');
  const input   = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const msgs    = document.getElementById('chatbotMessages');
  if (!bubble || !win) return;

  let opened = false;

  bubble.addEventListener('click', () => {
    win.classList.add('open');
    bubble.classList.add('hidden');
    if (!opened) {
      opened = true;
      setTimeout(() => addBot("Bonjour ! 👋 Je suis l'assistant <strong>ESSENTIEL CAR</strong>. Comment puis-je vous aider ?"), 300);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', () => {
    win.classList.remove('open');
    bubble.classList.remove('hidden');
  });

  function send() {
    if (!input) return;
    const txt = input.value.trim();
    if (!txt) return;
    addUser(txt);
    input.value = '';
    const typingEl = addBot('…', true);
    setTimeout(() => {
      const match = CHAT_REPLIES.find(r => r.pattern.test(txt));
      typingEl.innerHTML = match ? match.reply() : DEFAULT_REPLY();
    }, 700 + Math.random() * 400);
  }

  if (sendBtn) sendBtn.addEventListener('click', send);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

  function addBot(html, typing = false) {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot';
    el.innerHTML = html;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function addUser(txt) {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--user';
    el.textContent = txt;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }
}

/* ── Language Nav Dropdown ── */
function toggleLangDropdown() {
  const navLang = document.getElementById('navLang');
  if (navLang) navLang.classList.toggle('open');
}

function setLangFromNav(lang) {
  if (typeof setLang === 'function') setLang(lang);
  const flags = { fr:'🇫🇷 FR', en:'🇬🇧 EN', es:'🇪🇸 ES', ar:'🇸🇦 AR', it:'🇮🇹 IT', pt:'🇵🇹 PT', de:'🇩🇪 DE', nl:'🇳🇱 NL' };
  const btn = document.getElementById('navLangBtn');
  if (btn) btn.textContent = (flags[lang] || lang.toUpperCase()) + ' ▾';
  document.querySelectorAll('.lang-option[data-lang]').forEach(el =>
    el.classList.toggle('active', el.dataset.lang === lang)
  );
  const dd = document.getElementById('navLang');
  if (dd) dd.classList.remove('open');
}

/* ── Init all features ── */
function initFeatures() {
  initCurrencySelector();
  initCountdowns();
  initStockCounters();
  initChatbot();

  // Upsell popup close handlers
  const overlay = document.getElementById('upsellOverlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeUpsellPopup();
    });
    const closeBtn = overlay.querySelector('.upsell-close');
    if (closeBtn) closeBtn.addEventListener('click', closeUpsellPopup);
  }
}

document.addEventListener('DOMContentLoaded', initFeatures);
