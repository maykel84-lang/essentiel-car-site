#!/usr/bin/env node
/**
 * ESSENTIEL CAR — Générateur d'images produits 1080×1080
 * Style : fond blanc + cercle crème (haut-droit) + cercle rouge (bas) + logo
 *         (haut-gauche) + photo produit réelle centrée + nom en blanc dans le
 *         cercle rouge. Reproduit le gabarit des fiches existantes.
 *
 * Entrée : assets/data/product-images-map.json
 *   [{ "id": "tracker-gps", "name": "Traceur GPS", "urls": ["https://cf.cj..."] }, ...]
 *
 * Sortie : assets/images/products/<id>-1.jpg.png (+ -2, -3 si plusieurs URLs)
 *
 * Doit tourner là où internet est ouvert (GitHub Actions), car le téléchargement
 * des images CJ est bloqué dans l'environnement de développement.
 *
 * Usage : node tools/generate-product-images.js [id1 id2 ...]  (vide = tous)
 */

const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

const W = 1080, H = 1080;
const CREAM = '#f5eee6';
const RED = '#cf001e';
const OUT_DIR = path.join(__dirname, '../assets/images/products');
const FONT = 'Anton, "Ubuntu Condensed", Impact, sans-serif';

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Découpe le nom en 1 ou 2 lignes équilibrées
function wrapName(name) {
  const words = String(name).trim().split(/\s+/);
  if (words.length <= 1) return [name];
  const full = words.join(' ');
  if (full.length <= 14) return [full];
  let best = null, bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
    const diff = Math.abs(a.length - b.length);
    if (Math.max(a.length, b.length) <= 18 && diff < bestDiff) { best = [a, b]; bestDiff = diff; }
  }
  return best || [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')];
}

// Télécharge une image (retire le resize CJ pour avoir la pleine résolution)
function download(url) {
  const clean = url.split('?')[0];
  return new Promise((resolve, reject) => {
    https.get(clean, res => {
      if (res.statusCode >= 300 && res.headers.location) return resolve(download(res.headers.location));
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode + ' ' + clean));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Roue de marque (fichier réel, fond transparent)
const LOGO_PATH = path.join(__dirname, '../assets/images/logo-wheel.png');

// Le fond (blanc + cercles), en SVG rasterisé
function backgroundSvg() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#ffffff"/>
    <circle cx="1015" cy="130" r="430" fill="${CREAM}"/>
    <circle cx="690" cy="1185" r="445" fill="${RED}"/>
  </svg>`);
}

// Le nom du produit, blanc, centré dans le cercle rouge
function nameSvg(name) {
  const lines = wrapName(name);
  const fs2 = lines.length > 1 ? 88 : 100;
  const cx = 690;
  const startY = lines.length > 1 ? 905 : 955;
  const els = lines.map((l, i) =>
    `<text x="${cx}" y="${startY + i * (fs2 + 8)}" fill="#ffffff" font-family='${FONT}' font-size="${fs2}" font-weight="800" text-anchor="middle">${esc(l)}</text>`
  ).join('');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${els}</svg>`);
}

// Compose l'image finale à partir d'un buffer de photo produit (ou null = placeholder)
async function buildImage(name, productBuffer) {
  const layers = [{ input: backgroundSvg() }];

  // Photo produit : on rend le fond blanc TRANSPARENT (sinon le rectangle blanc
  // de la photo masque les cercles), puis on rogne et on centre.
  if (productBuffer) {
    const { data, info } = await sharp(productBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += info.channels) {
      if (data[i] > 243 && data[i + 1] > 243 && data[i + 2] > 243) data[i + 3] = 0;
    }
    const keyed = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).png().toBuffer();
    const prod = await sharp(keyed)
      .trim()
      .resize({ width: 620, height: 580, fit: 'inside', withoutEnlargement: false })
      .toBuffer();
    const meta = await sharp(prod).metadata();
    const left = Math.round((W - meta.width) / 2);
    const top = Math.round(420 - meta.height / 2);
    layers.push({ input: prod, left: Math.max(0, left), top: Math.max(30, top) });
  } else {
    // Placeholder pour l'aperçu de gabarit
    layers.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect x="330" y="200" width="420" height="440" rx="24" fill="#e9e9e9" stroke="#cccccc" stroke-width="3" stroke-dasharray="14 10"/>
      <text x="540" y="430" fill="#9a9a9a" font-family='${FONT}' font-size="34" font-weight="700" text-anchor="middle">PHOTO PRODUIT</text>
    </svg>`) });
  }

  // Roue de marque, haut-gauche
  const logo = await sharp(LOGO_PATH).resize({ width: 172 }).toBuffer();
  layers.push({ input: logo, left: 52, top: 56 });

  // Nom dans le cercle rouge
  layers.push({ input: nameSvg(name) });

  return sharp({ create: { width: W, height: H, channels: 4, background: '#ffffff' } })
    .composite(layers)
    .png()
    .toBuffer();
}

async function main() {
  const only = process.argv.slice(2);
  const mapPath = path.join(__dirname, '../assets/data/product-images-map.json');
  if (!fs.existsSync(mapPath)) { console.error('Mapping introuvable : ' + mapPath); process.exit(1); }
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const entry of map) {
    if (only.length && !only.includes(entry.id)) continue;
    const urls = (entry.urls || []).filter(Boolean);
    if (!urls.length) { console.log('⏭  ' + entry.id + ' : aucune URL, ignoré'); continue; }
    let i = 0;
    for (const url of urls) {
      i++;
      try {
        const buf = await download(url);
        const out = await buildImage(entry.label || entry.name, buf);
        const outPath = path.join(OUT_DIR, `${entry.id}-${i}.jpg.png`);
        fs.writeFileSync(outPath, out);
        console.log('✓ ' + path.relative(path.join(__dirname, '..'), outPath));
      } catch (e) {
        console.error('✗ ' + entry.id + ' img ' + i + ' : ' + e.message);
      }
    }
  }
  console.log('Terminé.');
}

module.exports = { buildImage };
if (require.main === module) main();
