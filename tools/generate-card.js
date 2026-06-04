#!/usr/bin/env node
/**
 * ESSENTIEL CAR — Générateur de visuels de blog 1080×1080
 * Style : photo IA de fond, dégradé gauche, logo, titre blanc+rouge, 3 icônes bas
 */

const sharp = require('sharp');
const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const LOGO_PATH = path.join(__dirname, '../assets/images/ESSENTIEL CAR logo transparent.png');
const W = 1080, H = 1080;

// ─── Utilitaires ──────────────────────────────────────────────────────────────

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Coupe un texte en lignes de maxLen caractères max
function wrap(text, maxLen) {
  if (!text) return [];
  if (text.length <= maxLen) return [text];
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const candidate = line ? line + ' ' + w : w;
    if (candidate.length <= maxLen) { line = candidate; }
    else { if (line) lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}

// Sépare le titre : avant ":" = blanc, après ":" = rouge
// Sans ":" → split au milieu
function splitTitle(title) {
  const idx = title.indexOf(':');
  if (idx !== -1) {
    return [title.substring(0, idx).trim(), title.substring(idx + 1).trim()];
  }
  const words = title.split(' ');
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

// ─── Icônes SVG (viewBox 24×24) ────────────────────────────────────────────────

const ICONS = {
  dashcam:  { d: 'M18 8h-1l-1.17-2H8.17L7 8H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z' },
  shield:   { d: 'M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 16c-3.66-1.16-6-4.91-6-8.33V7.33L12 5l6 2.33V9.67c0 3.42-2.34 7.17-6 8.33z' },
  wrench:   { d: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
  water:    { d: 'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z' },
  filter:   { d: 'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z' },
  clock:    { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z' },
  check:    { d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
  star:     { d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
  brush:    { d: 'M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z' },
  bolt:     { d: 'M7 2v11h3v9l7-12h-4l4-8z' },
  car:      { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z' },
};

const ICON_RULES = [
  [['dashcam','caméra','vidéo','enregistr','boîte noire'],   'dashcam'],
  [['sécurité','protect','securit','alarme'],                'shield'],
  [['entretien','réparat','mainten','mécanique'],            'wrench'],
  [['filtre','air','habitacle','purif'],                     'filter'],
  [['nettoy','mousse','lavage','dégraiss','propre','laver'],  'water'],
  [['poliss','brillan','cire','scratch','rayure'],           'brush'],
  [['rapide','minute','express','vite','temps'],             'clock'],
  [['guide','qualité','conseil','astuce','choisir'],         'check'],
  [['premium','pro','professionnel','expert'],               'star'],
  [['efficac','puissant','charge','énergie','batterie'],     'bolt'],
];

function pickIcons(article) {
  const text = (article.title + ' ' + (article.tags || []).join(' ')).toLowerCase();
  const picked = [];
  for (const [kws, icon] of ICON_RULES) {
    if (kws.some(k => text.includes(k)) && !picked.includes(icon)) picked.push(icon);
    if (picked.length >= 3) break;
  }
  // Compléter avec des icônes par catégorie
  const catFallback = { Nettoyage:'water', Securite:'shield', Carrosserie:'brush', Confort:'star', 'High-Tech':'dashcam', Entretien:'wrench' };
  const fb = catFallback[article.category] || 'check';
  if (!picked.includes(fb)) picked.push(fb);
  while (picked.length < 3) picked.push(['car','bolt','clock'][picked.length - 1] || 'car');
  return picked.slice(0, 3);
}

// ─── Prompt image de fond ──────────────────────────────────────────────────────

const PRODUCT_PROMPTS = [
  [['dashcam','caméra de bord','boîte noire'],                     'dual 4K dashcam mounted on windshield inside car cockpit night driving'],
  [['lance-mousse','mousse active','pulvérisateur'],               'foam cannon car wash spray soap foam on black car detail'],
  [['aspirateur'],                                                  'cordless car vacuum cleaner handheld interior car detailing'],
  [['brosse','jante'],                                              'car wheel rim cleaning brush foam dark background'],
  [['machine à polir','polisseuse','polissage'],                    'orbital car polisher buffing paint surface gloss'],
  [['compresseur','gonflage'],                                      'portable tire inflator digital compressor car wheel'],
  [['tpms','capteur pression'],                                     'TPMS wireless tire pressure sensor car wheel monitoring'],
  [['support téléphone'],                                           'magnetic phone holder mount car dashboard interior'],
  [['table volant','tablette volant'],                              'steering wheel desk tray laptop working car interior'],
  [['filtre habitacle','filtre air'],                               'car cabin air filter replacement mechanic hands engine'],
  [['essuie-glace','rétroviseur'],                                  'car wiper blade windshield cleaning close up'],
  [['pare-chocs'],                                                   'car front bumper glossy black sporty automotive close up'],
  [['pneu sous-gonflé','pression pneu'],                            'flat tire low pressure car wheel close up road'],
  [['rayure','carrosserie','scratch'],                              'car paint scratch repair polishing body work'],
  [['cire','sealant','céramique','protection carrosserie'],         'car wax ceramic coating application gloss paint protection'],
];

function buildPrompt(article) {
  const t = article.title.toLowerCase();
  for (const [kws, p] of PRODUCT_PROMPTS) {
    if (kws.some(k => t.includes(k))) {
      return p + ', dramatic dark moody automotive photography, cinematic lighting, high contrast';
    }
  }
  return article.title + ', automotive car, dramatic dark moody cinematic photography, high contrast';
}

// ─── Téléchargement ────────────────────────────────────────────────────────────

function downloadBuffer(url, attempt) {
  attempt = attempt || 0;
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: 60000 }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location, attempt).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', err => {
      if (attempt < 2) {
        console.warn('Retry ' + (attempt + 1) + '...');
        setTimeout(() => downloadBuffer(url, attempt + 1).then(resolve).catch(reject), 4000);
      } else reject(err);
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ─── Génération de la carte ───────────────────────────────────────────────────

async function generateCard(article, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. Image de fond via Pollinations.ai
  const prompt = buildPrompt(article);
  const bgUrl  = 'https://image.pollinations.ai/prompt/'
    + encodeURIComponent(prompt)
    + '?width=' + W + '&height=' + H + '&nologo=true&model=flux&seed=' + (article.id || 42);

  console.log('Background prompt: ' + prompt.substring(0, 70) + '...');

  let bgBuf;
  try {
    bgBuf = await downloadBuffer(bgUrl);
    await sharp(bgBuf).metadata(); // valider que c'est bien une image
  } catch (e) {
    console.warn('Image de fond indisponible (' + e.message + ') — fond sombre utilisé');
    bgBuf = await sharp({ create: { width: W, height: H, channels: 3, background: { r:12, g:4, b:4 } } }).jpeg().toBuffer();
  }

  const bg = await sharp(bgBuf).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer();

  // 2. Logo (rognage auto des bords transparents + redimensionnement)
  const logoBuf  = await sharp(LOGO_PATH).trim({ threshold: 10 }).resize(null, 100, { fit: 'inside' }).png().toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();

  // 3. Découpe du titre blanc / rouge
  const [whitePart, redPart] = splitTitle(article.title);
  const W_LINES = wrap(whitePart, 17);
  const R_LINES = wrap(redPart,   17);
  const totalLines = W_LINES.length + R_LINES.length;
  const FS = totalLines <= 2 ? 88 : totalLines === 3 ? 80 : 72;
  const LINE_H = FS + 16;

  let y = Math.max(320, H / 2 - ((totalLines * LINE_H) / 2));
  const titleEls = [];

  for (const line of W_LINES) {
    titleEls.push(`<text x="68" y="${y}" fill="white" font-family="Impact,Ubuntu Bold,Liberation Sans,Arial Black,sans-serif" font-size="${FS}" font-weight="900">${esc(line)}</text>`);
    y += LINE_H;
  }
  for (const line of R_LINES) {
    titleEls.push(`<text x="68" y="${y}" fill="#CC0000" font-family="Impact,Ubuntu Bold,Liberation Sans,Arial Black,sans-serif" font-size="${FS}" font-weight="900" font-style="italic">${esc(line)}</text>`);
    y += LINE_H;
  }

  const subY = y + 28;
  const excerptText = esc((article.excerpt || '').substring(0, 50)) + '…';

  // 4. Icônes bas de page
  const iconKeys  = pickIcons(article);
  const tagLabels = (article.tags || []).slice(0, 3);
  const ICON_R    = 44;
  const ICON_SPACING = 230;
  const ICON_Y    = H - 190;
  const iconsSvg  = iconKeys.map((key, i) => {
    const cx = 68 + ICON_R + i * ICON_SPACING;
    const d  = (ICONS[key] || ICONS.car).d;
    const label = tagLabels[i] || key;
    return `
<circle cx="${cx}" cy="${ICON_Y}" r="${ICON_R}" fill="rgba(0,0,0,0.55)" stroke="#CC0000" stroke-width="2.5"/>
<g transform="translate(${cx - 18},${ICON_Y - 18}) scale(1.5)"><path d="${d}" fill="white"/></g>
<text x="${68 + i * ICON_SPACING}" y="${ICON_Y + ICON_R + 38}" fill="white" font-family="Liberation Sans,Ubuntu,Arial,sans-serif" font-size="24" font-weight="bold">${esc(label.substring(0, 20))}</text>`;
  }).join('');

  // 5. SVG overlay (gradient + texte + icônes)
  const overlay = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="gl" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
    <stop offset="0%"   stop-color="black" stop-opacity="0.92"/>
    <stop offset="52%"  stop-color="black" stop-opacity="0.68"/>
    <stop offset="72%"  stop-color="black" stop-opacity="0.22"/>
    <stop offset="100%" stop-color="black" stop-opacity="0.0"/>
  </linearGradient>
  <linearGradient id="gb" gradientUnits="userSpaceOnUse" x1="0" y1="${H * 0.72}" x2="0" y2="${H}">
    <stop offset="0%"   stop-color="black" stop-opacity="0"/>
    <stop offset="100%" stop-color="black" stop-opacity="0.88"/>
  </linearGradient>
</defs>

<!-- Dégradé gauche (lisibilité texte) -->
<rect width="${W}" height="${H}" fill="url(#gl)"/>
<!-- Dégradé bas (lisibilité icônes) -->
<rect width="${W}" height="${H}" fill="url(#gb)"/>

<!-- Accent rouge vertical gauche -->
<rect x="0" y="0" width="5" height="${H}" fill="#CC0000" opacity="0.75"/>

<!-- Titre -->
${titleEls.join('\n')}

<!-- Sous-titre -->
<text x="68" y="${subY}" fill="#aaaaaa" font-family="Liberation Sans,Ubuntu,Arial,sans-serif" font-size="28">${excerptText}</text>

<!-- Icônes -->
${iconsSvg}
</svg>`;

  // 6. Composition finale : fond + overlay SVG + logo
  await sharp(bg)
    .composite([
      { input: Buffer.from(overlay), top: 0, left: 0 },
      { input: logoBuf, top: 38, left: 50 },
    ])
    .png({ compressionLevel: 8 })
    .toFile(outputPath);

  console.log('✓ Card PNG: ' + outputPath);
}

module.exports = { generateCard, buildPrompt };
