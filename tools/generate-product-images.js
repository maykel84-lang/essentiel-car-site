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
const FONT = 'Oswald, "Liberation Sans", Arial, sans-serif';
const FW = 700; // graisse Oswald Bold

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Découpe le nom en 1 ou 2 lignes équilibrées
function wrapName(name) {
  const words = String(name).trim().split(/\s+/);
  if (words.length <= 1) return [name];
  const full = words.join(' ');
  if (full.length <= 11) return [full];
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

const LS = 6; // letter-spacing

// Mesure la largeur réelle d'une ligne à une taille donnée
async function lineWidth(text, fs) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="400"><text x="10" y="200" font-family='${FONT}' font-weight="${FW}" font-size="${fs}" letter-spacing="${LS}">${esc(text)}</text></svg>`;
  try {
    const { info } = await sharp(Buffer.from(svg)).trim().toBuffer({ resolveWithObject: true });
    return info.width;
  } catch { return 0; }
}

// Le nom du produit, blanc, CENTRÉ dans le cercle rouge — taille ADAPTATIVE
// (réduite juste ce qu'il faut pour que le plus long mot rentre, avec marge).
async function nameSvg(name) {
  const lines = wrapName(name);
  const cx = 690;
  // Largeur utile RÉDUITE pour le haut du cercle rouge (qui se rétrécit vers le
  // haut) : un mot long seul sur sa ligne (ex. « Organisateur ») ne doit pas
  // toucher les bords. On abaisse aussi le bloc pour profiter de la partie large.
  const maxWidth = lines.length > 1 ? 500 : 620;
  let fs2 = lines.length > 1 ? 96 : 116;

  let widest = 0;
  for (const l of lines) widest = Math.max(widest, await lineWidth(l, fs2));
  if (widest > maxWidth) fs2 = Math.max(48, Math.floor(fs2 * maxWidth / widest));

  // Centrage vertical du bloc de texte, abaissé pour rester dans la zone large
  // du cercle rouge (sans faire déborder la 2e ligne hors du canvas).
  const targetCenter = 950;
  const step = fs2 + 12;
  const firstBaseline = Math.round(targetCenter + 0.34 * fs2 - (lines.length - 1) * step / 2);
  const els = lines.map((l, i) => {
    const y = firstBaseline + i * step;
    return `<text x="${cx}" y="${y}" fill="#ffffff" font-family='${FONT}' font-size="${fs2}" font-weight="${FW}" letter-spacing="${LS}" text-anchor="middle">${esc(l)}</text>`;
  }).join('');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${els}</svg>`);
}

// Badge de variante (nom couleur/parfum, en français) — pilule sombre haut-droite
function variantBadgeSvg(label) {
  const s = String(label);
  const fs = s.length > 12 ? 36 : 42;
  const cy = 106, h = fs + 24, rightEdge = 1044;
  const w = Math.round(s.length * fs * 0.52 + 52);
  const x = Math.max(24, rightEdge - w);
  const cx = x + w / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect x="${x}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#1a1a1a"/>
    <text x="${cx}" y="${cy + fs * 0.34}" fill="#ffffff" font-family='${FONT}' font-weight="${FW}" font-size="${fs}" letter-spacing="2" text-anchor="middle">${esc(s)}</text>
  </svg>`);
}

// Analyse les lignes d'une image RGBA (après mise en transparence du blanc) et
// renvoie [top, height] de la bande de contenu la PLUS DENSE = le produit.
// Sert à retirer une étiquette texte détachée (ex. « Black » incrusté par CJ)
// située au-dessus ou en dessous, séparée par un espace blanc.
// Sécurité : si le produit occupe déjà ≥ 60 % du contenu (une seule pièce, ou
// pièces jointes), on ne rogne rien (renvoie l'image entière).
function mainContentBand(data, w, h, ch) {
  const rowCount = new Array(h).fill(0);
  let total = 0;
  for (let y = 0; y < h; y++) {
    let c = 0;
    const base = y * w * ch;
    for (let x = 0; x < w; x++) if (data[base + x * ch + 3] > 12) c++;
    rowCount[y] = c;
    total += c;
  }
  if (total === 0) return [0, h];

  // Segmente en bandes séparées par des trous d'au moins GAP lignes vides
  const GAP = 20, MIN_ROW = 4;
  const bands = [];
  let start = -1, gap = 0;
  for (let y = 0; y < h; y++) {
    if (rowCount[y] > MIN_ROW) { if (start < 0) start = y; gap = 0; }
    else if (start >= 0) { if (++gap >= GAP) { bands.push([start, y - gap]); start = -1; gap = 0; } }
  }
  if (start >= 0) bands.push([start, h - 1]);
  if (bands.length <= 1) return [0, h];

  // Bande la plus dense
  let best = [0, h - 1], bestSum = -1;
  for (const [a, b] of bands) {
    let s = 0; for (let y = a; y <= b; y++) s += rowCount[y];
    if (s > bestSum) { bestSum = s; best = [a, b]; }
  }
  // Si la bande principale ne domine pas nettement, on garde tout (produit multi-pièces)
  if (bestSum < total * 0.6) return [0, h];
  const pad = 6;
  const top = Math.max(0, best[0] - pad);
  const bot = Math.min(h - 1, best[1] + pad);
  return [top, bot - top + 1];
}

// Compose l'image finale à partir d'un buffer de photo produit (ou null = placeholder)
async function buildImage(name, productBuffer, variantLabel) {
  const layers = [{ input: backgroundSvg() }];

  // Photo produit : on rend le fond blanc TRANSPARENT (sinon le rectangle blanc
  // de la photo masque les cercles), puis on rogne et on centre.
  if (productBuffer) {
    const { data, info } = await sharp(productBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const ch = info.channels, w = info.width, h = info.height;
    for (let i = 0; i < data.length; i += ch) {
      if (data[i] > 243 && data[i + 1] > 243 && data[i + 2] > 243) data[i + 3] = 0;
    }

    // Certaines photos CJ ont une étiquette texte en ANGLAIS (« Black », « Grey »…)
    // incrustée sous le produit, séparée par un espace blanc. On garde uniquement
    // la bande verticale la plus « pleine » (le produit) pour effacer l'étiquette.
    const [cropTop, cropH] = mainContentBand(data, w, h, ch);
    let keyed = await sharp(data, { raw: { width: w, height: h, channels: ch } }).png().toBuffer();
    if (cropTop > 0 || cropH < h) {
      keyed = await sharp(keyed).extract({ left: 0, top: cropTop, width: w, height: cropH }).png().toBuffer();
    }
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

  // Badge de variante (couleur/parfum) en haut-droite, si fourni
  if (variantLabel) layers.push({ input: variantBadgeSvg(variantLabel) });

  // Nom dans le cercle rouge
  layers.push({ input: await nameSvg(name) });

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
    for (const u of urls) {
      i++;
      // Une URL peut être une chaîne, ou { url, variant } pour un nom de variante
      const url = typeof u === 'string' ? u : u.url;
      const variant = typeof u === 'string' ? null : (u.variant || null);
      try {
        const buf = await download(url);
        const out = await buildImage(entry.label || entry.name, buf, variant);
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
