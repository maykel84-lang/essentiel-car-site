#!/usr/bin/env node
/**
 * ESSENTIEL CAR — Générateur de visuels de blog (SVG → PNG 1200×630)
 * Appelé par generate-article.js après création de l'article.
 * Respecte la DA : fond noir, rouge #CC0000, blanc, typographie bold.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function escXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Split title into max 2 lines of ~28 chars each
function wrapTitle(title, maxLen) {
  if (title.length <= maxLen) return [title, ''];
  const words = title.split(' ');
  let line1 = '';
  let line2 = '';
  for (const w of words) {
    const candidate = line1 ? line1 + ' ' + w : w;
    if (candidate.length <= maxLen) {
      line1 = candidate;
    } else {
      line2 = line2 ? line2 + ' ' + w : w;
    }
  }
  // If line2 is too long, truncate
  if (line2.length > maxLen + 4) line2 = line2.substring(0, maxLen + 1) + '…';
  return [line1, line2];
}

// Extract up to 3 key points from article sections
function extractPoints(sections, tags) {
  const pts = [];
  if (sections) {
    for (const sec of sections) {
      if (sec.type === 'ul' && sec.items) {
        for (const item of sec.items.slice(0, 3)) {
          const clean = String(item).replace(/[*_]/g, '').trim();
          pts.push(clean.length > 42 ? clean.substring(0, 41) + '…' : clean);
        }
        break;
      }
    }
  }
  // Fallback to tags
  if (pts.length === 0 && tags) {
    tags.slice(0, 3).forEach(t => pts.push(String(t)));
  }
  return pts.slice(0, 3);
}

const CATEGORY_FR = {
  Nettoyage: 'NETTOYAGE',
  Securite: 'SÉCURITÉ',
  Carrosserie: 'CARROSSERIE',
  Confort: 'CONFORT',
  'High-Tech': 'HIGH-TECH',
  Entretien: 'ENTRETIEN'
};

function buildSVG(article) {
  const { title, category, excerpt, tags, sections } = article;

  const [line1, line2] = wrapTitle(title, 26);
  const hasLine2 = line2.length > 0;
  const points = extractPoints(sections, tags);
  const catLabel = CATEGORY_FR[category] || (category || 'AUTO').toUpperCase();
  const excerptShort = escXml((excerpt || '').substring(0, 68)) + (excerpt && excerpt.length > 68 ? '…' : '');

  // Dynamic Y layout
  const titleY1 = hasLine2 ? 248 : 278;
  const titleY2 = titleY1 + 76;
  const accentLineY = (hasLine2 ? titleY2 : titleY1) + 22;
  const excerptY = accentLineY + 52;
  const pointsStartY = excerptY + 72;

  const pointRows = points.map((pt, i) => {
    const py = pointsStartY + i * 54;
    return `
    <rect x="55" y="${py - 24}" width="34" height="34" rx="4" fill="#CC0000"/>
    <text x="72" y="${py - 1}" fill="white" font-family="Arial Black,Impact,sans-serif" font-size="18" font-weight="900" text-anchor="middle">${i + 1}</text>
    <text x="102" y="${py - 1}" fill="#e0e0e0" font-family="Arial,Helvetica,sans-serif" font-size="20">${escXml(pt)}</text>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#080808"/>
    <stop offset="70%" stop-color="#120000"/>
    <stop offset="100%" stop-color="#1a0000"/>
  </linearGradient>
  <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#CC0000"/>
    <stop offset="100%" stop-color="#880000"/>
  </linearGradient>
</defs>

<!-- Fond -->
<rect width="1200" height="630" fill="url(#bg)"/>

<!-- Panneaux décoratifs coin -->
<polygon points="1200,0 1200,220 980,0" fill="#CC0000" opacity="0.07"/>
<polygon points="0,630 220,630 0,410" fill="#CC0000" opacity="0.07"/>

<!-- Barre gauche rouge -->
<rect x="0" y="0" width="9" height="630" fill="url(#rg)"/>
<!-- Liseré haut -->
<rect x="9" y="0" width="1191" height="2" fill="#CC0000" opacity="0.4"/>

<!-- LOGO haut gauche -->
<text x="55" y="68" fill="white" font-family="Arial Black,Impact,sans-serif" font-size="24" font-weight="900" letter-spacing="3">ESSENTIEL</text>
<text x="55" y="94" fill="#CC0000" font-family="Arial Black,Impact,sans-serif" font-size="24" font-weight="900" letter-spacing="3">CAR</text>

<!-- Séparateur vertical -->
<rect x="222" y="46" width="2" height="58" fill="#CC0000" opacity="0.55"/>

<!-- Badge catégorie -->
<rect x="238" y="48" width="190" height="40" rx="3" fill="#CC0000"/>
<text x="333" y="74" fill="white" font-family="Arial Black,Impact,sans-serif" font-size="17" font-weight="900" text-anchor="middle" letter-spacing="1">${catLabel}</text>

<!-- Titre ligne 1 — blanc bold italic -->
<text x="55" y="${titleY1}" fill="white" font-family="Arial Black,Impact,sans-serif" font-size="60" font-weight="900" font-style="italic">${escXml(line1)}</text>
${hasLine2 ? `<!-- Titre ligne 2 — rouge bold italic -->
<text x="55" y="${titleY2}" fill="#CC0000" font-family="Arial Black,Impact,sans-serif" font-size="60" font-weight="900" font-style="italic">${escXml(line2)}</text>` : ''}

<!-- Ligne accent rouge sous titre -->
<rect x="55" y="${accentLineY}" width="530" height="5" fill="url(#rg)"/>
<rect x="593" y="${accentLineY}" width="18" height="5" fill="#CC0000" opacity="0.4"/>
<rect x="619" y="${accentLineY}" width="10" height="5" fill="#CC0000" opacity="0.2"/>

<!-- Sous-titre / excerpt -->
<text x="55" y="${excerptY}" fill="#959595" font-family="Arial,Helvetica,sans-serif" font-size="21">${excerptShort}</text>

<!-- Points clés -->
${pointRows}

<!-- Barre rouge bas -->
<rect x="0" y="568" width="1200" height="62" fill="url(#rg)"/>

<!-- Texte barre bas -->
<text x="55" y="607" fill="white" font-family="Arial Black,Impact,sans-serif" font-size="21" font-weight="900" letter-spacing="2">ESSENTIEL CAR</text>
<text x="600" y="607" fill="rgba(255,255,255,0.88)" font-family="Arial,Helvetica,sans-serif" font-size="19" text-anchor="middle">Rapide. Efficace. Impeccable.</text>
<text x="1148" y="607" fill="rgba(255,255,255,0.65)" font-family="Arial,Helvetica,sans-serif" font-size="17" text-anchor="end">essentielcar.com</text>

<!-- Losange décoratif bas droite -->
<polygon points="1165,568 1200,568 1200,603" fill="rgba(0,0,0,0.25)"/>
</svg>`;
}

async function generateCard(article, outputPath) {
  const svg = buildSVG(article);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outputPath);

  console.log('Card PNG generated: ' + outputPath);
}

module.exports = { generateCard };
