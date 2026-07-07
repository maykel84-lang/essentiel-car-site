/**
 * Cloudflare Pages Function — GET /order-reward?session_id=cs_...
 *
 * Vérifie côté serveur qu'une session Stripe Checkout est bien payée,
 * puis détermine les guides PDF cadeaux dus selon le palier atteint :
 *   - 2 produits différents  → 2 guides (Entretien + Astuces Pro)
 *   - Panier ≥ 100 €          → les 4 guides
 * Renvoie aussi le code promo de fidélité à afficher au client.
 *
 * Aucune donnée sensible n'est exposée : seuls le statut de paiement et la
 * liste des guides gagnés sont renvoyés. La clé Stripe reste côté serveur.
 */

const TIER2_THRESHOLD_CENTS = 100 * 100; // 100 € en centimes

// Code promo de fidélité affiché après commande.
// ⚠️ Ce code doit exister à l'identique dans Stripe (Dashboard → Produits →
// Codes promotionnels), sinon il ne sera pas utilisable par le client.
const LOYALTY_PROMO = { code: 'MERCI15', percent: 15 };

// Catalogue des guides (fichiers présents dans /assets/pdfs/)
const GUIDES = {
  g1: { title: 'Guide Entretien Auto Essentiel', file: '/assets/pdfs/guide-01-entretien-auto.pdf' },
  g2: { title: '10 Astuces Pro', file: '/assets/pdfs/guide-02-astuces-pro.pdf' },
  g3: { title: 'Calendrier Entretien par Saison', file: '/assets/pdfs/guide-03-calendrier-saison.pdf' },
  g4: { title: 'Guide Detailing Pro', file: '/assets/pdfs/guide-04-detailing-pro.pdf' },
};

const TIER1_GUIDES = ['g1', 'g2'];
const TIER2_GUIDES = ['g1', 'g2', 'g3', 'g4'];

export async function onRequestGet(context) {
  const { request, env } = context;

  const key = (env.STRIPE_SECRET_KEY || '').trim();
  if (!key) return json({ error: 'Configuration manquante.' }, 500);

  const sessionId = new URL(request.url).searchParams.get('session_id') || '';
  // Garde-fou : un id de session Stripe commence toujours par "cs_".
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return json({ error: 'Session invalide.' }, 400);
  }

  try {
    const auth = { headers: { Authorization: `Bearer ${key}` } };

    // 1) Récupérer la session et vérifier qu'elle est payée
    const sessionRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      auth
    );
    const session = await sessionRes.json();
    if (!sessionRes.ok) return json({ paid: false }, 200);
    if (session.payment_status !== 'paid') return json({ paid: false }, 200);

    // 2) Récupérer les articles pour compter les produits différents
    const itemsRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=100`,
      auth
    );
    const itemsData = await itemsRes.json();
    const lineItems = (itemsRes.ok && Array.isArray(itemsData.data)) ? itemsData.data : [];

    // Sous-total = somme des articles avant livraison (en centimes)
    const subtotalCents = typeof session.amount_subtotal === 'number'
      ? session.amount_subtotal
      : lineItems.reduce((s, li) => s + (li.amount_subtotal || 0), 0);

    const uniqueProducts = lineItems.length;

    // 3) Déterminer le palier
    let tier = 0;
    if (subtotalCents >= TIER2_THRESHOLD_CENTS) tier = 2;
    else if (uniqueProducts >= 2) tier = 1;

    const ids = tier === 2 ? TIER2_GUIDES : tier === 1 ? TIER1_GUIDES : [];
    const guides = ids.map(id => ({ title: GUIDES[id].title, url: GUIDES[id].file }));

    return json({
      paid: true,
      tier,
      guides,
      promo: tier > 0 ? LOYALTY_PROMO : null,
    }, 200);
  } catch (err) {
    return json({ error: 'Erreur serveur.' }, 500);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
