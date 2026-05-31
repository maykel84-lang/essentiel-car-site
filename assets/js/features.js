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
  // Fin de conversation
  { pattern: /au.?revoir|bye|bonne journée|bonne soirée|à bientôt|ciao|tchao|bonne route/i,
    reply: () => "Au revoir ! 👋 Merci de votre visite sur <strong>ESSENTIEL CAR</strong>. Bonne route et à très bientôt ! 🚗" },
  { pattern: /^(merci+|thanks?|thank you|super|parfait|nickel|génial|top|cool|ok merci|d'accord merci|avec plaisir)[\s!]*$/i,
    reply: () => "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions. <a href='boutique.html' style='color:var(--red)'>Découvrez notre boutique →</a>" },
  { pattern: /^(ok|oui|non|vu|yes|no|okay|d'accord|compris|entendu|c'est bon)[\s!.]*$/i,
    reply: () => "Parfait ! 👍 Autre chose pour vous ? Je peux vous parler de nos produits, promotions, livraisons ou retours." },

  // Salutations
  { pattern: /bonjour|salut|hello|hi\b|hey\b|bonsoir|coucou/i,
    reply: () => "Bonjour ! 😊 Je suis l'assistant <strong>ESSENTIEL CAR</strong>.<br><br>Comment puis-je vous aider ?<br>• 🔥 Nos <strong>Best Sellers</strong><br>• 📦 Nos <strong>Packs économiques</strong><br>• 🚚 <strong>Livraison & retours</strong><br>• 💥 <strong>Promotions en cours</strong>" },

  // Livraison
  { pattern: /livraison|délai|expéd|envoi|shipping|delivery|combien de temps|quand.*recev/i,
    reply: () => "🚚 Expédition sous <strong>24h ouvrées</strong>, livraison en <strong>3–7 jours ouvrés</strong> en France.<br><br>📧 Un email de suivi vous est envoyé dès l'expédition.<br>🎁 Livraison <strong>gratuite dès 50€</strong> d'achat.<br><br><a href='politique-expedition.html' style='color:var(--red)'>→ Politique d'expédition complète</a>" },

  // Suivi commande
  { pattern: /suivi|tracking|colis|où est ma|order status|numéro de commande/i,
    reply: () => `📦 Suivez votre colis en temps réel sur notre <a href='tracking.html' style='color:var(--red)'><strong>page de suivi →</strong></a><br>Munissez-vous de votre numéro de commande et de votre email.` },

  // Retours
  { pattern: /retour|rembours|échange|return|refund|annuler|insatisfait|déçu|ne convient pas/i,
    reply: () => `↩️ Vous avez <strong>30 jours</strong> pour retourner votre commande.<br><br>📋 Procédure : email à <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a> avec votre numéro de commande.<br>⚠️ <strong>Frais de retour à votre charge</strong> (sauf article défectueux ou erreur de notre part).<br>💰 Remboursement sous <strong>5 à 10 jours ouvrés</strong> après réception.<br><br><a href='politique-remboursement.html' style='color:var(--red)'>→ Politique de remboursement complète</a>` },

  // Promos
  { pattern: /promo|réduction|remise|code|coupon|solde|discount|offre spéciale|moins cher|économiser/i,
    reply: () => `💥 <strong>Offre exclusive :</strong> achetez 2 Best Sellers → <strong>-50% sur le 2ème article</strong>, appliqué automatiquement en caisse !<br><br>🏆 <a href='product.html?id=dashcam-4k' style='color:var(--red)'>Dashcam 4K</a> · <a href='product.html?id=aspirateur-sans-fil' style='color:var(--red)'>Aspirateur</a> · <a href='product.html?id=support-telephone' style='color:var(--red)'>Kit Mains Libres</a>` },

  // Best Sellers
  { pattern: /best.?seller|plus vendu|meilleur|recommand|top produit|coup de cœur/i,
    reply: () => `⭐ Nos <strong>3 Best Sellers</strong> :<br><br>📹 <a href='product.html?id=dashcam-4k' style='color:var(--red)'><strong>Dashcam 4K Ultra HD</strong></a> — 89,90€<br>📱 <a href='product.html?id=support-telephone' style='color:var(--red)'><strong>Kit Mains Libres 360°</strong></a> — 27,90€<br>🔋 <a href='product.html?id=aspirateur-sans-fil' style='color:var(--red)'><strong>Aspirateur Sans Fil</strong></a> — 49,90€<br><br>💡 Achetez-en 2 → <strong>-50% sur le 2ème !</strong>` },

  // Aspirateur
  { pattern: /aspirateur|vacuum|aspir/i,
    reply: () => `🔋 <strong>Aspirateur Sans Fil Voiture</strong> — <strong>49,90€</strong><br>✔ Moteur 120W · 30 min d'autonomie · Filtre HEPA<br>✔ Parfait pour l'habitacle · ⭐ Best Seller<br><br><a href='product.html?id=aspirateur-sans-fil' style='color:var(--red)'>→ Voir & commander</a>` },

  // Dashcam
  { pattern: /dashcam|caméra.?bord|cam.?bord|enregistreur|dash.?cam/i,
    reply: () => `📹 <strong>Dashcam 4K Ultra HD</strong> — <strong>89,90€</strong><br>✔ Résolution 4K · Vision nocturne · GPS intégré · 170°<br>✔ ⭐ Best Seller<br><br><a href='product.html?id=dashcam-4k' style='color:var(--red)'>→ Voir & commander</a>` },

  // Compresseur
  { pattern: /compresseur|gonfleur|gonfl|pompe.?air/i,
    reply: () => `🔧 <strong>Compresseur d'Air Sans Fil</strong> — <strong>54,90€</strong><br>✔ Gonflage en 3 min · Batterie rechargeable · Arrêt auto<br><br><a href='product.html?id=compresseur-air' style='color:var(--red)'>→ Voir & commander</a>` },

  // Kit mains libres
  { pattern: /mains.?libres|kit mains|support.?tel|porte.?tel|téléphone voiture|smartphone voiture/i,
    reply: () => `📱 <strong>Kit Mains Libres 360°</strong> — <strong>27,90€</strong><br>✔ Rotation 360° · Compatible tous smartphones · ⭐ Best Seller<br><br><a href='product.html?id=support-telephone' style='color:var(--red)'>→ Voir & commander</a>` },

  // Machine à polir
  { pattern: /polir|polisseuse|lustrer|carrosserie|polish/i,
    reply: () => `✨ <strong>Machine à Polir Sans Fil</strong> — <strong>79,90€</strong><br>✔ Professionnelle · Sans fil · Vitesse variable<br><br><a href='product.html?id=machine-polir' style='color:var(--red)'>→ Voir le produit</a>` },

  // Lance mousse
  { pattern: /mousse|foam|pulvérisateur|lance.?mousse|nettoyant voiture/i,
    reply: () => `🫧 <strong>Pulvérisateur de Mousse</strong> — <strong>44,90€</strong><br>✔ Mousse épaisse · Nettoyage carrosserie pro<br><br><a href='product.html?id=lance-mousse' style='color:var(--red)'>→ Voir le produit</a>` },

  // TPMS
  { pattern: /tpms|pression.?pneu|surveillance.?pneu|capteur.?pneu/i,
    reply: () => `🔵 <strong>TPMS Surveillance Pneus</strong> — <strong>49,90€</strong><br>✔ Surveillance temps réel · Alerte sous-gonflage · Sécurité max<br><br><a href='product.html?id=tpms' style='color:var(--red)'>→ Voir le produit</a>` },

  // Table volant
  { pattern: /table.?volant|plateau.?volant|manger.?voiture|travailler.?voiture/i,
    reply: () => `🍽️ <strong>Table à Manger Volant</strong> — <strong>24,90€</strong><br>✔ Repas & travail en voiture · Fixation sur le volant<br><br><a href='product.html?id=table-volant' style='color:var(--red)'>→ Voir le produit</a>` },

  // Essuie-glace
  { pattern: /essuie.?glace|balai.?glace|rétroviseur.?pluie|wipers?/i,
    reply: () => `🌧️ <strong>Essuie-Glace Rétroviseur Portable</strong> — <strong>19,90€</strong><br>✔ Vision claire sous la pluie · Adapté rétroviseurs<br><br><a href='product.html?id=essuie-glace-retros' style='color:var(--red)'>→ Voir le produit</a>` },

  // Brosse jantes
  { pattern: /brosse|jante|roue|nettoyage.?roue/i,
    reply: () => `🔵 <strong>Brosse à Jantes Pro</strong> — <strong>12,90€</strong> · Lot de 3 à 24,90€<br>✔ Nettoyage en profondeur · Toutes tailles<br><br><a href='product.html?id=brosse-jantes' style='color:var(--red)'>→ Voir le produit</a>` },

  // Packs / bundles
  { pattern: /pack|bundle|kit.?complet|ensemble|combinaison|économies/i,
    reply: () => `📦 Nos <strong>Packs économiques</strong> (jusqu'à -20%) :<br><br>🔧 <a href='product.html?id=pack-entretien' style='color:var(--red)'><strong>Pack Entretien</strong></a> — 64,90€<br>🧼 <a href='product.html?id=pack-nettoyage' style='color:var(--red)'><strong>Pack Nettoyage Complet</strong></a> — 159,90€<br>🛡️ <a href='product.html?id=pack-securite' style='color:var(--red)'><strong>Pack Sécurité & Confort</strong></a> — 134,90€<br><br>💡 Les packs = les meilleures économies !` },

  // Paiement
  { pattern: /paiement|visa|paypal|mastercard|apple.?pay|google.?pay|payer|carte.?bancaire|payment/i,
    reply: () => "💳 Modes de paiement acceptés :<br>• Visa, Mastercard, American Express<br>• PayPal<br>• Apple Pay & Google Pay<br><br>🔒 Transactions sécurisées <strong>SSL 256 bits</strong>, certifié PCI-DSS.<br>Vos données bancaires ne sont jamais stockées." },

  // Garantie
  { pattern: /garantie|warranty|défaut|cassé|abîmé|en panne|problème produit/i,
    reply: () => "🛡️ Tous nos produits sont couverts par une <strong>garantie 2 ans</strong>.<br>En cas de défaut : remplacement ou remboursement intégral.<br>Contactez <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a>" },

  // Contact
  { pattern: /contact|email|mail|service client|aide|parler|humain|conseiller|joindre/i,
    reply: () => "📧 <a href='mailto:contact@essentielcar.com' style='color:var(--red)'><strong>contact@essentielcar.com</strong></a><br>⏱ Réponse garantie sous <strong>2h</strong> en jours ouvrés (lun–ven, 9h–18h)." },

  // Prix / tarifs
  { pattern: /prix|combien|coût|tarif|cost|price/i,
    reply: () => `💰 Nos prix vont de <strong>12,90€ à 159,90€</strong>.<br><br>🔥 Best Sellers : Dashcam 89,90€ · Aspirateur 49,90€ · Kit Mains Libres 27,90€<br><br>💥 Achetez 2 Best Sellers = <strong>-50% sur le 2ème !</strong><br><a href='boutique.html' style='color:var(--red)'>→ Voir tous les prix</a>` },

  // Frais de livraison
  { pattern: /frais.*(livraison|envoi|port)|livraison.*(gratuit|payant|prix)/i,
    reply: () => "🚚 Livraison <strong>gratuite dès 50€</strong> d'achat.<br>En dessous de 50€, les frais sont indiqués clairement en caisse." },

  // Confiance / sécurité
  { pattern: /sécurité|confiance|fiable|sérieux|légit|arnaque/i,
    reply: () => "🔒 ESSENTIEL CAR est une enseigne française sérieuse.<br>✔ Paiement SSL 256 bits · Garantie 2 ans · Retours 30 jours<br>✔ Société BIASS VTC SERVICE enregistrée en France.<br><a href='mentions-legales.html' style='color:var(--red)'>→ Mentions légales</a>" },

  // Boutique
  { pattern: /boutique|magasin|shop|voir tout|catalogue|tous.?produit/i,
    reply: () => `🛍️ <a href='boutique.html' style='color:var(--red)'><strong>→ Accéder à la boutique</strong></a><br><br>Filtrez par catégorie : <strong>Nettoyage</strong> · <strong>Sécurité</strong> · <strong>Confort</strong> · <strong>Entretien</strong>` },

  // Cadeau
  { pattern: /cadeau|gift|offrir|anniversaire|noël|fête/i,
    reply: () => `🎁 Vous cherchez un cadeau pour un passionné d'automobile ?<br><br>Nos suggestions :<br>📹 <a href='product.html?id=dashcam-4k' style='color:var(--red)'>Dashcam 4K</a> — 89,90€<br>📱 <a href='product.html?id=support-telephone' style='color:var(--red)'>Kit Mains Libres 360°</a> — 27,90€<br>🔧 <a href='product.html?id=pack-entretien' style='color:var(--red)'>Pack Entretien</a> — 64,90€` },

  // Pneu
  { pattern: /pneu|gonflage|pression.?air|tire/i,
    reply: () => `🔵 Pour vos pneus, deux produits :<br><br>🔧 <a href='product.html?id=compresseur-air' style='color:var(--red)'><strong>Compresseur d'Air Sans Fil</strong></a> — 54,90€ (gonflage rapide)<br>📡 <a href='product.html?id=tpms' style='color:var(--red)'><strong>TPMS Surveillance Pneus</strong></a> — 49,90€ (alerte pression)` },

  // CGV / Conditions de vente
  { pattern: /cgv|conditions.?générales|conditions.?de.?vente|mentions.?contract|accord.?achat/i,
    reply: () => `📄 Nos <strong>Conditions Générales de Vente</strong> couvrent :<br>• Prix TTC, commande & paiement<br>• Livraison & suivi<br>• Retours & remboursements<br>• Garanties 2 ans<br><br><a href='cgv.html' style='color:var(--red)'>→ Lire les CGV complètes</a>` },

  // Droit de rétractation légal
  { pattern: /rétractation|délai.?légal|14.?jour|droit.?légal|code.?consommation/i,
    reply: () => `⚖️ <strong>Droit de rétractation légal : 14 jours</strong><br>Conformément à la loi (art. L221-18 Code de la Consommation), vous pouvez vous rétracter <strong>sans motif</strong> dans les 14 jours suivant la réception.<br><br>📧 Email : <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a><br>⚠️ Frais de retour à votre charge.<br><br><a href='cgv.html' style='color:var(--red)'>→ Voir les CGV</a>` },

  // Mentions légales / confidentialité / RGPD
  { pattern: /mentions.?légales|confidentialité|rgpd|données.?personnelles|vie.?privée|privacy/i,
    reply: () => `🔐 Nous respectons votre vie privée :<br>• <a href='mentions-legales.html' style='color:var(--red)'>Mentions légales</a> — société BIASS VTC SERVICE<br>• <a href='confidentialite.html' style='color:var(--red)'>Politique de confidentialité</a> — RGPD<br>• <a href='cookies.html' style='color:var(--red)'>Politique cookies</a><br><br>Nous ne revendons jamais vos données.` },

  // Cookies
  { pattern: /cookie|traceur|tracking|pistage|localStorage/i,
    reply: () => `🍪 <strong>Cookies & vie privée</strong><br>Nous n'utilisons que des cookies <strong>fonctionnels essentiels</strong> (ex : panier) — aucun cookie de tracking publicitaire ni de profilage.<br><br><a href='cookies.html' style='color:var(--red)'>→ Politique cookies complète</a>` },

  // Comment commander
  { pattern: /comment.?(commander|passer commande|acheter|procéder)|je.?(veux|voudrais|souhaite).?(commander|acheter|passer)/i,
    reply: () => `🛒 Commander en 4 étapes simples :<br>1. Choisissez vos produits et <strong>ajoutez au panier</strong><br>2. Vérifiez votre récapitulatif<br>3. Saisissez votre <strong>adresse de livraison</strong><br>4. Choisissez votre moyen de paiement et <strong>validez</strong> ✅<br><br>Un email de confirmation est envoyé immédiatement.<br><a href='boutique.html' style='color:var(--red)'>→ Commencer vos achats</a>` },

  // Colis endommagé / manquant
  { pattern: /endommagé|cassé.?(livraison|colis)|manquant|incomplet|pas reçu|colis.?(abîmé|manque|perdu)/i,
    reply: () => `😟 Colis endommagé ou incomplet ?<br><br>📧 Contactez-nous dans les <strong>48h</strong> à <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a> avec :<br>• Votre numéro de commande<br>• Photos du colis et du contenu<br><br>Nous trouvons une solution rapide — remplacement ou remboursement, frais à notre charge. 💪` },

  // Litige / médiation / réclamation
  { pattern: /litige|médiation|réclamation|plainte|tribunal|conflit|dispute/i,
    reply: () => `⚖️ En cas de litige, nous privilégions le dialogue :<br><br>📧 Contactez-nous d'abord : <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a><br><br>Si aucun accord amiable, vous pouvez recourir à la <strong>médiation de la consommation</strong> (gratuite, ordonnance 2015-1033).<br><a href='cgv.html' style='color:var(--red)'>→ Voir les CGV</a>` },

  // FAQ
  { pattern: /faq|questions.?fréquentes|aide.?générale|j'ai.?une.?question/i,
    reply: () => `❓ Retrouvez toutes nos réponses dans la <a href='index.html#faq' style='color:var(--red)'><strong>FAQ →</strong></a><br><br>Ou posez-moi votre question directement, je suis là pour vous aider ! 😊` },
];

const DEFAULT_REPLIES = [
  () => `Je peux vous renseigner sur :<br>• 🚚 <strong>Livraison</strong> & <strong>retours</strong><br>• 💥 <strong>Promotions</strong> & <strong>Best Sellers</strong><br>• 📦 <strong>Packs</strong> & <strong>produits</strong><br>• 💳 <strong>Paiement</strong> & <strong>garantie</strong><br>• 📄 <strong>CGV</strong> · <strong>Cookies</strong> · <strong>RGPD</strong><br><br>Tapez votre question !`,
  () => `Je n'ai pas bien compris 😅 Essayez :<br>"<strong>livraison</strong>" · "<strong>retour</strong>" · "<strong>cgv</strong>" · "<strong>pack</strong>" · "<strong>dashcam</strong>"<br><br>Ou contactez-nous : <a href='mailto:contact@essentielcar.com' style='color:var(--red)'>contact@essentielcar.com</a>`,
  () => `Reformulez votre question 😊 ou visitez directement <a href='boutique.html' style='color:var(--red)'>notre boutique</a> — et consultez nos <a href='cgv.html' style='color:var(--red)'>CGV</a> pour toutes les informations légales.`,
];
let _defaultIdx = 0;

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
      if (match) {
        _defaultIdx = 0;
        typingEl.innerHTML = match.reply();
      } else {
        typingEl.innerHTML = DEFAULT_REPLIES[_defaultIdx % DEFAULT_REPLIES.length]();
        _defaultIdx++;
      }
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
