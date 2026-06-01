const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Panier vide' }) };
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const origin = event.headers.origin
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
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur de paiement. Veuillez réessayer.' }),
    };
  }
};
