/**
 * Cloudflare Worker — deux routes :
 *   POST /            → crée une session Stripe Checkout (panier → paiement)
 *   GET  /reward      → après paiement, vérifie la session et renvoie les
 *                       guides PDF cadeaux dus + le code promo de fidélité
 *
 * Le site étant hébergé sur GitHub Pages (statique), toute la logique serveur
 * vit ici. La clé Stripe reste côté worker (variable STRIPE_SECRET_KEY).
 */

const TIER2_THRESHOLD_CENTS = 100 * 100; // 100 € en centimes
const LOYALTY_PROMO = { code: 'MERCI15', percent: 15 };

const GUIDES = {
  g1: { title: 'Guide Entretien Auto Essentiel', url: '/assets/pdfs/guide-01-entretien-auto.pdf' },
  g2: { title: '10 Astuces Pro', url: '/assets/pdfs/guide-02-astuces-pro.pdf' },
  g3: { title: 'Calendrier Entretien par Saison', url: '/assets/pdfs/guide-03-calendrier-saison.pdf' },
  g4: { title: 'Guide Detailing Pro', url: '/assets/pdfs/guide-04-detailing-pro.pdf' },
};
const TIER1_GUIDES = ['g1', 'g2'];
const TIER2_GUIDES = ['g1', 'g2', 'g3', 'g4'];

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

    // ── Route cadeaux : GET /reward?session_id=cs_... ──
    if (request.method === 'GET' && path === '/reward') {
      return handleReward(url, env);
    }

    // ── Route paiement : POST / ──
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    return handleCheckout(request, env);
  }
};

async function handleCheckout(request, env) {
  const key = (env.STRIPE_SECRET_KEY || '').trim();
  if (!key) return json({ error: 'Paiement non configuré.' }, 500);

  let items, gwpTier;
  try { ({ items, gwpTier } = await request.json()); }
  catch { return json({ error: 'Requête invalide' }, 400); }

  if (!items || items.length === 0) return json({ error: 'Panier vide' }, 400);
  const validItems = items.filter(i => i.name && i.price > 0 && i.qty > 0);
  if (validItems.length === 0) return json({ error: 'Articles invalides' }, 400);

  const origin = request.headers.get('origin') || 'https://essentielcar.com';
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
  // Palier cadeaux calculé côté client (sous-total avant remise) — mémorisé sur
  // la commande pour livrer EXACTEMENT les guides promis dans le panier.
  const clientTier = [0, 1, 2].includes(gwpTier) ? gwpTier : 0;
  body.append('metadata[gwp_tier]', String(clientTier));
  validItems.forEach((item, i) => {
    body.append(`line_items[${i}][price_data][currency]`, 'eur');
    body.append(`line_items[${i}][price_data][product_data][name]`, String(item.name).slice(0, 250));
    body.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(item.price * 100)));
    body.append(`line_items[${i}][quantity]`, String(item.qty));
    if (item.image) body.append(`line_items[${i}][price_data][product_data][images][]`, item.image);
  });

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    const session = await res.json();
    if (!res.ok) return json({ error: session.error?.message || 'Erreur Stripe' }, 500);
    return json({ url: session.url }, 200);
  } catch {
    return json({ error: 'Erreur de paiement. Veuillez réessayer.' }, 500);
  }
}

async function handleReward(url, env) {
  const key = (env.STRIPE_SECRET_KEY || '').trim();
  if (!key) return json({ error: 'Configuration manquante.' }, 500);

  const sessionId = url.searchParams.get('session_id') || '';
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return json({ error: 'Session invalide.' }, 400);

  try {
    const auth = { headers: { Authorization: `Bearer ${key}` } };

    // 1) Session payée ?
    const sessionRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`, auth
    );
    const session = await sessionRes.json();
    if (!sessionRes.ok || session.payment_status !== 'paid') {
      return json({ paid: false }, 200);
    }

    // 2) Palier promis au client (mémorisé dans la commande) — c'est la
    //    référence : il est calculé sur le sous-total AVANT remise, donc
    //    identique à ce que le client a vu dans son panier.
    const metaTier = parseInt(session.metadata?.gwp_tier ?? '', 10);
    const clientTier = (metaTier === 0 || metaTier === 1 || metaTier === 2) ? metaTier : null;

    // 3) Filet de sécurité : recalcul serveur (sessions anciennes sans palier).
    const itemsRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=100`, auth
    );
    const itemsData = await itemsRes.json();
    const lineItems = (itemsRes.ok && Array.isArray(itemsData.data)) ? itemsData.data : [];
    const subtotalCents = typeof session.amount_subtotal === 'number'
      ? session.amount_subtotal
      : lineItems.reduce((s, li) => s + (li.amount_subtotal || 0), 0);
    let serverTier = 0;
    if (subtotalCents >= TIER2_THRESHOLD_CENTS) serverTier = 2;
    else if (lineItems.length >= 2) serverTier = 1;

    // 4) Le palier client fait autorité (il correspond exactement à la promesse
    //    du panier). Le recalcul serveur ne sert que si l'info est absente
    //    (commandes créées avant cette mise à jour).
    const tier = clientTier !== null ? clientTier : serverTier;

    const ids = tier === 2 ? TIER2_GUIDES : tier === 1 ? TIER1_GUIDES : [];
    const guides = ids.map(id => ({ title: GUIDES[id].title, url: GUIDES[id].url }));

    return json({ paid: true, tier, guides, promo: tier > 0 ? LOYALTY_PROMO : null }, 200);
  } catch {
    return json({ error: 'Erreur serveur.' }, 500);
  }
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
