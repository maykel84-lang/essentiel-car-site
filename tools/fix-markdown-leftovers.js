#!/usr/bin/env node
/**
 * One-time cleanup: many blog articles imported from Shopify kept raw Markdown
 * syntax (**bold**, ### headers, - bullets, [text](url) links, | tables |, > quotes)
 * inside plain-text sections. blog-article.html injects section text directly via
 * innerHTML with no Markdown parser, so readers were seeing literal asterisks,
 * hashes and pipes instead of formatted content. This also remaps legacy
 * essentielcar.com/products|collections links (the abandoned Shopify store) to the
 * equivalent pages on this static site.
 * Run once: node tools/fix-markdown-leftovers.js
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../assets/data/blog-posts.json');

const LINK_MAP = {
  'https://www.essentielcar.com/products/aspirateur-sans-fil': 'product.html?id=aspirateur-sans-fil',
  'https://www.essentielcar.com/products/compresseur-air-sans-fil': 'product.html?id=compresseur-air',
  'https://www.essentielcar.com/products/dashcam-haute-definition': 'product.html?id=dashcam-4k',
  'https://www.essentielcar.com/products/machine-polir-sans-fil': 'product.html?id=machine-polir',
  'https://www.essentielcar.com/products/tpms-surveillance-pneus': 'product.html?id=tpms',
  'https://www.essentielcar.com/products/brosse-jantes-professionnelle-nettoyage-auto': 'product.html?id=brosse-jantes',
  'https://www.essentielcar.com/collections/frontpage': 'boutique.html',
  'https://www.essentielcar.com/collections': 'boutique.html',
  'https://www.essentielcar.com/collections/packs-economies-et-performance': 'boutique.html?filter=pack',
  'https://www.essentielcar.com/collections/securite': 'boutique.html?filter=securite',
  'https://www.essentielcar.com/collections/sécurité': 'boutique.html?filter=securite',
  'https://www.essentielcar.com/collections/confort': 'boutique.html?filter=confort',
  'https://www.essentielcar.com/collections/grand-nettoyage-printemps': 'boutique.html?filter=nettoyage',
  'https://www.essentielcar.com/collections/ete-confort-et-fraicheur': 'boutique.html?filter=confort',
  'https://www.essentielcar.com/collections/été-confort-et-fraicheur': 'boutique.html?filter=confort',
  'https://www.essentielcar.com/collections/automne-preparation-hivernale': 'boutique.html?filter=entretien',
  'https://www.essentielcar.com/collections/automne-préparation-hivernale': 'boutique.html?filter=entretien',
  'https://www.essentielcar.com/collections/%E2%9D%84%EF%B8%8Fhiver-securite-grand-froid': 'boutique.html?filter=securite',
  'https://www.essentielcar.com/collections/%E2%9D%84%EF%B8%8Fhiver-sécurité-grand-froid': 'boutique.html?filter=securite',
};

function mapUrl(url) {
  if (LINK_MAP[url]) return LINK_MAP[url];
  if (/essentielcar\.com\/(products|collections)/i.test(url)) return 'boutique.html';
  return url;
}

const BARE_PRODUCT_LABELS = {
  'aspirateur-sans-fil': 'Aspirateur Sans Fil Voiture',
  'compresseur-air-sans-fil': "Compresseur d'Air Sans Fil",
  'dashcam-haute-definition': 'Dashcam Full HD 1080P Double Objectif',
  'machine-polir-sans-fil': 'Machine à Polir Sans Fil',
  'tpms-surveillance-pneus': 'TPMS Surveillance Pneus',
  'brosse-jantes-professionnelle-nettoyage-auto': 'Brosse à Jantes Pro',
};

function fixBareUrls(str) {
  // Orphaned plain-text URLs left over from a broken Shopify import (no [label](url)
  // wrapper, no <a href> wrapper) - turn them into a real link using a known label.
  return str.replace(/(^|[^"(])https:\/\/www\.essentielcar\.com\/products\/([a-z0-9-]+)(?=$|[^")])/g, (m, prefix, slug) => {
    const label = BARE_PRODUCT_LABELS[slug];
    if (!label) return m;
    const mapped = mapUrl('https://www.essentielcar.com/products/' + slug);
    return prefix + `Découvrez notre <a href="${mapped}" style="color:#e0000c;font-weight:700">${label}</a>`;
  });
}

function isTableSeparator(line) {
  const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
  return cells.length > 1 && cells.every(c => /^[\s:-]+$/.test(c));
}

function isTableRow(line) {
  const t = line.trim();
  return t.startsWith('|') && t.endsWith('|') && t.split('|').length > 3;
}

function inlineFormat(str) {
  // links [label](url)
  str = str.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, label, url) =>
    `<a href="${mapUrl(url)}" style="color:#e0000c;font-weight:700">${label}</a>`
  );
  // existing HTML anchors to the legacy store
  str = str.replace(/<a href="(https?:\/\/(?:www\.)?essentielcar\.com\/[^"]*)"/g, (m, url) =>
    `<a href="${mapUrl(url)}"`
  );
  // bold
  str = str.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  // italics (single star left after bold extraction)
  str = str.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  return str;
}

function convertText(text) {
  if (!text) return text;
  text = fixBareUrls(text);
  const lines = text.split('\n');
  const out = [];
  for (const raw of lines) {
    const line = raw;
    if (isTableSeparator(line)) continue;
    if (isTableRow(line)) {
      const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()).filter(Boolean);
      out.push(inlineFormat(cells.join(' — ')));
      continue;
    }
    let m = line.match(/^#{1,4}\s+(.+)$/);
    if (m) { out.push('<strong>' + inlineFormat(m[1]) + '</strong>'); continue; }
    m = line.match(/^-\s+(.+)$/);
    if (m) { out.push('• ' + inlineFormat(m[1])); continue; }
    m = line.match(/^>\s+(.+)$/);
    if (m) { out.push('<em>' + inlineFormat(m[1]) + '</em>'); continue; }
    out.push(inlineFormat(line));
  }
  return out.filter(l => l.trim() !== '').join('<br>');
}

function processSection(s) {
  if (s.type === 'ul' && Array.isArray(s.items)) {
    s.items = s.items.map(convertText);
    return s;
  }
  if (typeof s.text !== 'string') return s;
  const trimmed = s.text.trim();
  const soloHeader = trimmed.match(/^#{1,4}\s+(.+)$/);
  if (soloHeader && !trimmed.slice(soloHeader[0].length).includes('\n') && trimmed.indexOf('\n') === -1 && s.type === 'p') {
    s.type = 'h2';
    s.text = inlineFormat(soloHeader[1].replace(/\s*https:\/\/www\.essentielcar\.com\/\S+$/, ''));
    return s;
  }
  s.text = convertText(s.text);
  return s;
}

function main() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);

  let sectionsTouched = 0;
  for (const article of data.articles) {
    article.sections = (article.sections || []).map(s => {
      const before = JSON.stringify(s);
      const after = processSection(s);
      if (JSON.stringify(after) !== before) sectionsTouched++;
      return after;
    });
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Done. ${sectionsTouched} sections modified across ${data.articles.length} articles.`);
}

main();
