/**
 * Génère assets/data/pricing.json — le CATALOGUE DE PRIX DE RÉFÉRENCE.
 *
 * Ce fichier est la seule source de vérité des prix côté serveur (worker).
 * Il empêche toute manipulation de prix par le navigateur : le worker
 * recalcule chaque prix à partir d'ici, il ne fait plus confiance au client.
 *
 * ⚠️ À relancer après CHAQUE modification de prix dans assets/js/products.js :
 *      node tools/generate-pricing.js
 */

const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'assets/js/products.js'), 'utf8');

let PRODUCTS;
try {
  // products.js définit `const PRODUCTS = [...]` (données pures + chaînes SVG).
  // On l'exécute dans une fonction avec des globals bidons, puis on récupère PRODUCTS.
  PRODUCTS = new Function(
    'window', 'document', 'navigator',
    src + '\n;return typeof PRODUCTS !== "undefined" ? PRODUCTS : [];'
  )({}, {}, {});
} catch (e) {
  console.error('Échec de lecture de products.js :', e.message);
  process.exit(1);
}

const catalog = {};
for (const p of PRODUCTS) {
  // On ne garde que les vrais produits (id + prix numérique). Les catégories
  // (pas de prix) sont ignorées automatiquement.
  if (!p || typeof p.id !== 'string' || typeof p.price !== 'number') continue;

  const variants = {};
  if (Array.isArray(p.variants)) {
    for (const group of p.variants) {
      if (!group || !Array.isArray(group.options)) continue;
      for (const opt of group.options) {
        if (opt && typeof opt.price === 'number') {
          variants[String(opt.value)] = {
            price: opt.price,
            display: opt.display || String(opt.value),
          };
        }
      }
    }
  }

  catalog[p.id] = {
    name: (p.fr && p.fr.name) || p.id,
    image: (Array.isArray(p.images) && p.images[0]) || null,
    bs: p.badgeType === 'bestseller',
    price: p.price,
    variants,
  };
}

const outPath = path.join(__dirname, '..', 'assets/data/pricing.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`✓ ${Object.keys(catalog).length} produits écrits dans assets/data/pricing.json`);
