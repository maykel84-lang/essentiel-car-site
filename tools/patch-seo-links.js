#!/usr/bin/env node
/**
 * Retroactive SEO internal links patch.
 * Adds a "pour aller plus loin" p section to every article that has 0 <a href links.
 * Run once: node tools/patch-seo-links.js
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../assets/data/blog-posts.json');

const PRODUCT_LINKS = [
  { keywords: ['aspirateur','aspiration','poussière','miettes','intérieur'], name: 'Aspirateur Sans Fil Voiture', url: 'product.html?id=aspirateur-sans-fil', badge: '⭐ BESTSELLER' },
  { keywords: ['brosse','jante','jantes','roue','roues'], name: 'Brosse à Jantes Pro', url: 'product.html?id=brosse-jantes', badge: '' },
  { keywords: ['compresseur','gonflage','pneu','pression','crevaison'], name: 'Compresseur d\'Air Portable', url: 'product.html?id=compresseur-air', badge: '' },
  { keywords: ['dashcam','caméra de bord','boîte noire','enregistreur','vidéo'], name: 'Dashcam 4K Ultra HD', url: 'product.html?id=dashcam-4k', badge: '' },
  { keywords: ['support téléphone','support smartphone','fixation','navigation','gps'], name: 'Support Téléphone Voiture', url: 'product.html?id=support-telephone', badge: '' },
  { keywords: ['polir','polisseuse','polissage','lustrage','carrosserie','rayure'], name: 'Machine à Polir Sans Fil', url: 'product.html?id=machine-polir', badge: '' },
  { keywords: ['lance-mousse','mousse active','mousse','lavage','karcher'], name: 'Lance-Mousse Manuelle', url: 'product.html?id=lance-mousse', badge: '' },
  { keywords: ['tpms','capteur pression','surveillance pression','pneumatique'], name: 'Capteurs TPMS Solaire', url: 'product.html?id=tpms', badge: '' },
  { keywords: ['table volant','tablette volant','bureau voiture'], name: 'Table de Volant Pliable', url: 'product.html?id=table-volant', badge: '' },
  { keywords: ['essuie-glace','rétroviseur','balai','visibilité'], name: 'Essuie-Glace Rétroviseur', url: 'product.html?id=essuie-glace-retros', badge: '' },
  { keywords: ['nettoyage','propre','detailing','microfibre','cuir'], name: 'Lance-Mousse Manuelle', url: 'product.html?id=lance-mousse', badge: '' },
  { keywords: ['sécurité','alarme','protection','kit urgence','démarrage'], name: 'Pack Sécurité & Confort', url: 'product.html?id=pack-securite', badge: '' },
  { keywords: ['entretien','révision','maintenance','huile','filtre'], name: 'Pack Entretien Essentiel', url: 'product.html?id=pack-entretien', badge: '' },
];

const PACK_LINKS = [
  { keywords: ['entretien','révision','maintenance','huile','filtre','vidange'], name: 'Pack Entretien Essentiel', url: 'product.html?id=pack-entretien' },
  { keywords: ['nettoyage','lavage','propre','detailing','microfibre'], name: 'Pack Nettoyage Complet', url: 'product.html?id=pack-nettoyage' },
  { keywords: ['sécurité','alarme','protection','kit urgence','dashcam','tpms'], name: 'Pack Sécurité & Confort', url: 'product.html?id=pack-securite' },
];

function detectProduct(article) {
  const text = (article.title + ' ' + article.excerpt + ' ' + (article.tags || []).join(' ')).toLowerCase();
  for (const p of PRODUCT_LINKS) {
    if (p.keywords.some(k => text.includes(k))) return p;
  }
  return null;
}

function detectPack(article) {
  const text = (article.title + ' ' + article.excerpt + ' ' + (article.tags || []).join(' ')).toLowerCase();
  for (const p of PACK_LINKS) {
    if (p.keywords.some(k => text.includes(k))) return p;
  }
  return null;
}

function buildLinksSection(article, allArticles) {
  const product = detectProduct(article);
  const pack = detectPack(article);

  // Pick 2 cross-articles: neighbors by ID, different from current
  const others = allArticles
    .filter(a => a.id !== article.id)
    .sort((a, b) => Math.abs(a.id - article.id) - Math.abs(b.id - article.id))
    .slice(0, 4);

  // Prefer articles in same category, then closest
  const samecat = others.filter(a => a.category === article.category).slice(0, 2);
  const crossLinks = samecat.length >= 2 ? samecat : [...samecat, ...others.filter(a => a.category !== article.category)].slice(0, 2);

  const a = (href, label) => `<a href="${href}" style="color:#e0000c;font-weight:700">${label}</a>`;

  const parts = [];

  if (product) {
    parts.push(`Découvrez notre ${a(product.url, product.name + (product.badge ? ' ' + product.badge : ''))} disponible dans notre boutique.`);
  }

  if (pack && (!product || pack.url !== product.url)) {
    parts.push(`Profitez aussi du ${a(pack.url, pack.name)} pour un équipement complet.`);
  }

  parts.push(`Explorez toute notre sélection sur la ${a('boutique.html', 'boutique ESSENTIEL CAR')} ou découvrez nos ${a('boutique.html?filter=bestseller', 'best-sellers')}.`);

  if (crossLinks.length > 0) {
    const crossTexts = crossLinks.map(ca => a('blog-article.html?id=' + ca.id, ca.title));
    parts.push(`À lire aussi sur notre blog : ${crossTexts.join(' — ')}.`);
  }

  parts.push(`Retrouvez tous nos conseils auto sur le ${a('blog.html', 'blog ESSENTIEL CAR')}.`);

  return {
    type: 'p',
    text: parts.join(' ')
  };
}

function main() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  const articles = data.articles;

  let patched = 0;
  let skipped = 0;

  for (const article of articles) {
    const sectionsStr = JSON.stringify(article.sections || []);
    if (sectionsStr.includes('<a href=')) {
      skipped++;
      continue;
    }

    const linksSection = buildLinksSection(article, articles);
    if (!article.sections) article.sections = [];
    article.sections.push(linksSection);
    patched++;
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Patched ${patched} articles with internal links (${skipped} already had links, skipped).`);
}

main();
