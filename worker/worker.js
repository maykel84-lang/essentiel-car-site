/**
 * Cloudflare Worker — deux routes :
 *   POST /            → crée une session Stripe Checkout (panier → paiement)
 *   GET  /reward      → après paiement : guides PDF cadeaux + code promo UNIQUE
 *
 * Sécurité :
 *  - Les PRIX sont recalculés côté serveur depuis un catalogue de référence
 *    (assets/data/pricing.json). Le navigateur n'envoie que id + variante +
 *    quantité : il ne peut plus fixer aucun prix.
 *  - Le CODE PROMO de fidélité est unique par commande, à usage unique, généré
 *    seulement après un paiement vérifié : impossible à deviner ou partager.
 *
 * Le site est sur GitHub Pages (statique) ; toute la logique serveur vit ici.
 * La clé Stripe reste côté worker (variable STRIPE_SECRET_KEY).
 */

const SITE = 'https://essentielcar.com';
const PRICING_URL = `${SITE}/assets/data/pricing.json`;
const TIER2_THRESHOLD_CENTS = 100 * 100; // 100 €
const FREE_SHIP_CENTS = 4990;            // 49,90 €
const SHIPPING_CENTS = 499;              // 4,99 €
const LOYALTY_PERCENT = 15;              // repli d'affichage si le coupon ne le donne pas

const GUIDES = {
  g1: { title: 'Guide Entretien Auto Essentiel', url: '/assets/pdfs/guide-01-entretien-auto.pdf' },
  g2: { title: '10 Astuces Pro', url: '/assets/pdfs/guide-02-astuces-pro.pdf' },
  g3: { title: 'Calendrier Entretien par Saison', url: '/assets/pdfs/guide-03-calendrier-saison.pdf' },
  g4: { title: 'Guide Detailing Pro', url: '/assets/pdfs/guide-04-detailing-pro.pdf' },
};
const TIER1_GUIDES = ['g1', 'g2'];
const TIER2_GUIDES = ['g1', 'g2', 'g3', 'g4'];

// Caches en mémoire (persistent tant que l'isolate est chaud)
let _catalog = null, _catalogAt = 0;
let _coupon = undefined, _couponAt = 0;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '');

    if (request.method === 'GET' && path === '/reward') {
      return handleReward(url, env);
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    return handleCheckout(request, env);
  }
};

/* ─────────────────────────── Catalogue de prix ─────────────────────────── */

async function loadCatalog() {
  const now = Date.now();
  if (_catalog && (now - _catalogAt) < 300000) return _catalog; // 5 min
  const res = await fetch(PRICING_URL, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!res.ok) throw new Error('catalog unavailable');
  const data = await res.json();
  _catalog = data; _catalogAt = now;
  return data;
}

/* ─────────────────────────────── Checkout ──────────────────────────────── */

async function handleCheckout(request, env) {
  const key = (env.STRIPE_SECRET_KEY || '').trim();
  if (!key) return json({ error: 'Paiement non configuré.' }, 500);

  let payload;
  try { payload = await request.json(); }
  catch { return json({ error: 'Requête invalide' }, 400); }

  const rawItems = Array.isArray(payload?.items) ? payload.items : [];
  if (rawItems.length === 0) return json({ error: 'Panier vide' }, 400);

  let catalog;
  try { catalog = await loadCatalog(); }
  catch { return json({ error: 'Service momentanément indisponible. Réessayez.' }, 503); }

  // 1) Reconstruire les lignes à partir du CATALOGUE (prix de confiance).
  //    Le prix envoyé par le navigateur est ignoré.
  const lines = [];
  const seenIds = new Set();
  let preDiscountCents = 0;

  for (const it of rawItems) {
    const id = String(it?.id ?? '');
    const prod = catalog[id];
    if (!prod) continue; // produit inconnu → ignoré (anti-injection)

    let qty = Math.floor(Number(it?.qty));
    if (!Number.isFinite(qty) || qty < 1) qty = 1;
    if (qty > 99) qty = 99;

    const variantVal = it?.variant != null ? String(it.variant) : null;
    let unitCents = Math.round(prod.price * 100);
    if (variantVal && prod.variants && prod.variants[variantVal]) {
      unitCents = Math.round(prod.variants[variantVal].price * 100);
    }

    // Nom = nom RÉEL du catalogue + libellé d'affichage du client (variante/
    // couleur), assaini. Ce libellé est cosmétique : il n'a aucun effet sur le
    // prix (déjà fixé ci-dessus depuis le catalogue).
    const label = String(it?.label ?? '').replace(/[^\p{L}\p{N}\s.,·\/&()+'’-]/gu, '').trim().slice(0, 80);
    let name = prod.name;
    if (label) name = `${prod.name} — ${label}`;
    else if (variantVal && prod.variants && prod.variants[variantVal]) {
      name = `${prod.name} — ${prod.variants[variantVal].display}`;
    }

    lines.push({ id, name, unitCents, qty, image: prod.image, bs: !!prod.bs });
    seenIds.add(id);
    preDiscountCents += unitCents * qty;
  }

  if (lines.length === 0) return json({ error: 'Articles invalides' }, 400);

  // 2) Palier cadeaux — calculé côté SERVEUR sur le sous-total avant remise.
  let tier = 0;
  if (preDiscountCents >= TIER2_THRESHOLD_CENTS) tier = 2;
  else if (seenIds.size >= 2) tier = 1;

  // 3) Remise Best Seller -50% sur l'unité la moins chère (dès 2 unités BS).
  const bsUnits = lines.filter(l => l.bs).reduce((s, l) => s + l.qty, 0);
  if (bsUnits >= 2) {
    let target = null;
    for (const l of lines) if (l.bs && (!target || l.unitCents < target.unitCents)) target = l;
    if (target) {
      const half = Math.round(target.unitCents * 0.5);
      if (target.qty > 1) {
        target.qty -= 1;
        lines.push({ id: target.id, name: `${target.name} (−50%)`, unitCents: half, qty: 1, image: target.image, bs: false });
      } else {
        target.unitCents = half;
        target.name = `${target.name} (−50%)`;
      }
    }
  }

  // 4) Frais de livraison selon le sous-total AVANT remise (cohérent panier).
  if (preDiscountCents < FREE_SHIP_CENTS) {
    lines.push({ id: '_shipping', name: 'Frais de livraison', unitCents: SHIPPING_CENTS, qty: 1, image: null, bs: false });
  }

  // 5) Construire la session Stripe.
  const origin = request.headers.get('origin') || SITE;
  const body = new URLSearchParams();
  body.append('mode', 'payment');
  body.append('payment_method_types[]', 'card');
  body.append('locale', 'fr');
  body.append('billing_address_collection', 'auto');
  body.append('customer_creation', 'always');
  body.append('allow_promotion_codes', 'true');
  ['FR', 'BE', 'CH', 'LU', 'MC'].forEach(c =>
    body.append('shipping_address_collection[allowed_countries][]', c)
  );
  body.append('success_url', `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`);
  body.append('cancel_url', `${origin}/cart.html`);
  body.append('metadata[gwp_tier]', String(tier));

  lines.forEach((l, i) => {
    body.append(`line_items[${i}][price_data][currency]`, 'eur');
    body.append(`line_items[${i}][price_data][product_data][name]`, String(l.name).slice(0, 250));
    body.append(`line_items[${i}][price_data][unit_amount]`, String(l.unitCents));
    body.append(`line_items[${i}][quantity]`, String(l.qty));
    if (l.image) body.append(`line_items[${i}][price_data][product_data][images][]`, `${SITE}/${l.image}`);
  });

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const session = await res.json();
    if (!res.ok) return json({ error: session.error?.message || 'Erreur Stripe' }, 500);
    return json({ url: session.url }, 200);
  } catch {
    return json({ error: 'Erreur de paiement. Veuillez réessayer.' }, 500);
  }
}

/* ──────────────────────── Récompense (guides + code) ───────────────────── */

async function handleReward(url, env) {
  const key = (env.STRIPE_SECRET_KEY || '').trim();
  if (!key) return json({ error: 'Configuration manquante.' }, 500);

  const sessionId = url.searchParams.get('session_id') || '';
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return json({ error: 'Session invalide.' }, 400);

  try {
    const auth = { headers: { Authorization: `Bearer ${key}` } };

    // 1) Paiement vérifié ?
    const sessionRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, auth);
    const session = await sessionRes.json();
    if (!sessionRes.ok || session.payment_status !== 'paid') {
      return json({ paid: false }, 200);
    }

    // 2) Palier (mémorisé à la commande, calculé côté serveur).
    const metaTier = parseInt(session.metadata?.gwp_tier ?? '', 10);
    const tier = (metaTier === 1 || metaTier === 2) ? metaTier : 0;

    const ids = tier === 2 ? TIER2_GUIDES : tier === 1 ? TIER1_GUIDES : [];
    const guides = ids.map(id => ({ title: GUIDES[id].title, url: GUIDES[id].url }));

    // 3) Code promo UNIQUE par acheteur (usage unique). Best-effort.
    let promo = null;
    if (tier > 0) {
      try { promo = await getOrCreatePromoCode(sessionId, key); } catch { promo = null; }
    }

    return json({ paid: true, tier, guides, promo }, 200);
  } catch {
    return json({ error: 'Erreur serveur.' }, 500);
  }
}

// Trouve le coupon de fidélité (-15%) créé dans le dashboard Stripe.
async function findLoyaltyCoupon(key) {
  const now = Date.now();
  if (_coupon !== undefined && (now - _couponAt) < 600000) return _coupon; // 10 min
  const res = await fetch('https://api.stripe.com/v1/coupons?limit=100', {
    headers: { Authorization: `Bearer ${key}` },
  });
  const data = await res.json();
  let found = null;
  if (res.ok && Array.isArray(data.data)) {
    const c = data.data.find(c => c.percent_off === LOYALTY_PERCENT && c.valid !== false)
           || data.data.find(c => typeof c.percent_off === 'number' && c.valid !== false);
    if (c) found = { id: c.id, percent: c.percent_off };
  }
  _coupon = found; _couponAt = now;
  return found;
}

// Génère (ou retrouve) le code promo unique lié à cette commande.
async function getOrCreatePromoCode(sessionId, key) {
  const coupon = await findLoyaltyCoupon(key);
  if (!coupon) return null;

  // Code déterministe dérivé de la session (unique et non devinable de l'extérieur).
  const code = 'EC' + sessionId.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(-10);

  // Tentative de création (usage unique, lié à la session).
  const body = new URLSearchParams();
  body.append('coupon', coupon.id);
  body.append('code', code);
  body.append('max_redemptions', '1');
  body.append('metadata[session_id]', sessionId);
  const createRes = await fetch('https://api.stripe.com/v1/promotion_codes', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (createRes.ok) {
    const pc = await createRes.json();
    return { code: pc.code, percent: coupon.percent };
  }

  // Déjà créé (rechargement de la page) → on le retrouve.
  const listRes = await fetch(
    `https://api.stripe.com/v1/promotion_codes?code=${encodeURIComponent(code)}&limit=1`,
    { headers: { Authorization: `Bearer ${key}` } }
  );
  const list = await listRes.json();
  if (listRes.ok && Array.isArray(list.data) && list.data[0]) {
    return { code: list.data[0].code, percent: coupon.percent };
  }
  return null;
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  });
}
