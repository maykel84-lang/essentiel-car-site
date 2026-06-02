exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const key = (process.env.STRIPE_SECRET_KEY || '').trim();
  if (!key) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Paiement non configuré. Contactez le support.' }),
    };
  }

  const stripe = require('stripe')(key);

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Panier vide' }) };
    }

    const line_items = items
      .filter(item => item.name && item.price > 0 && item.qty > 0)
      .map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: String(item.name).slice(0, 250),
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      }));

    if (line_items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Articles invalides' }) };
    }

    const origin = (event.headers.origin || '').replace(/\/$/, '')
      || (event.headers.referer && event.headers.referer.replace(/\/[^/]*$/, ''))
      || 'https://essentielcar.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart.html`,
      locale: 'fr',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
      billing_address_collection: 'auto',
      customer_creation: 'always',
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err.type, err.code, err.message);
    const msg = err.type === 'StripeAuthenticationError'
      ? 'Clé API Stripe invalide. Vérifiez la configuration.'
      : err.type === 'StripeInvalidRequestError'
        ? `Erreur de requête Stripe : ${err.message}`
        : 'Erreur de paiement. Veuillez réessayer.';
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: msg }),
    };
  }
};
