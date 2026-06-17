export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const key = (env.STRIPE_SECRET_KEY || '').trim();
    if (!key) return json({ error: 'Paiement non configuré.' }, 500);

    let items;
    try { ({ items } = await request.json()); }
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
    ['FR', 'BE', 'CH', 'LU', 'MC'].forEach(c =>
      body.append('shipping_address_collection[allowed_countries][]', c)
    );
    body.append('success_url', `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`);
    body.append('cancel_url', `${origin}/cart.html`);
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
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
