#!/usr/bin/env node
/**
 * ESSENTIEL CAR — Générateur d'articles de blog via Claude API
 * Appelé par GitHub Actions (.github/workflows/generate-blog.yml)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BLOG_DATA_PATH = path.join(__dirname, '../assets/data/blog-posts.json');

const blogData = JSON.parse(fs.readFileSync(BLOG_DATA_PATH, 'utf8'));
const existingSlugs = blogData.articles.map(a => a.slug);
const existingTitles = blogData.articles.map(a => a.title.toLowerCase());
const existingImages = new Set(blogData.articles.map(a => a.image).filter(Boolean));

const CATEGORIES = ['Nettoyage', 'Securite', 'Carrosserie', 'Confort', 'High-Tech', 'Entretien'];

const manualCategory = (process.env.MANUAL_CATEGORY && process.env.MANUAL_CATEGORY !== 'Auto')
  ? process.env.MANUAL_CATEGORY
  : CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

const topicInstruction = process.env.MANUAL_TOPIC
  ? 'Le sujet impose est : "' + process.env.MANUAL_TOPIC + '".'
  : 'Choisis un sujet pertinent et SEO dans la categorie "' + manualCategory + '" pour des accessoires auto en France.';

const existingList = existingTitles.slice(0, 20).join('\n- ');

const prompt = [
  'Tu es un expert en accessoires automobiles et SEO francais.',
  'Genere un article de blog complet pour le site ESSENTIEL CAR.',
  '',
  topicInstruction,
  '',
  'Articles existants a ne PAS dupliquer :',
  '- ' + existingList,
  '',
  'REPONDS UNIQUEMENT avec un objet JSON valide, sans markdown.',
  '',
  'Format JSON :',
  '{',
  '  "slug": "slug-url-seo-4-6-mots",',
  '  "title": "Titre SEO 60 chars max",',
  '  "excerpt": "Description 150 chars avec mot-cle",',
  '  "category": "' + manualCategory + '",',
  '  "emoji": "emoji",',
  '  "readTime": 5,',
  '  "tags": ["tag1","tag2","tag3"],',
  '  "sections": [',
  '    {"type":"intro","text":"Introduction 2-3 phrases"},',
  '    {"type":"h2","text":"Titre section 1"},',
  '    {"type":"p","text":"Paragraphe 60-100 mots"},',
  '    {"type":"h2","text":"Titre section 2"},',
  '    {"type":"p","text":"Paragraphe"},',
  '    {"type":"ul","items":["Point 1","Point 2","Point 3","Point 4"]},',
  '    {"type":"h2","text":"Titre section 3"},',
  '    {"type":"p","text":"Paragraphe"},',
  '    {"type":"tip","text":"Conseil pratique 1-2 phrases"},',
  '    {"type":"conclusion","text":"Conclusion avec appel boutique ESSENTIEL CAR"}',
  '  ]',
  '}',
  '',
  'Regles : 500-800 mots, SEO longue traine francais, conclusion cite la boutique ESSENTIEL CAR.'
].join('\n');

function callClaude(promptText) {
  return new Promise(function(resolve, reject) {
    var body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: promptText }]
    });

    var options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    var req = https.request(options, function(res) {
      var data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() {
        try {
          var parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(parsed.error.message));
          } else {
            resolve(parsed.content[0].text);
          }
        } catch(e) { reject(e); }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function extractJSON(text) {
  try { return JSON.parse(text.trim()); } catch(e) {}
  var match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) { try { return JSON.parse(match[1].trim()); } catch(e) {} }
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) { try { return JSON.parse(jsonMatch[0]); } catch(e) {} }
  throw new Error('No valid JSON found in Claude response');
}

// ─── Extended image pool per category ───────────────────────────────────────
// Each category has 12+ unique CDN images. The script picks the first
// image in the pool that has NOT already been used by any existing article.
// If the entire pool is exhausted, it rotates (least-recently-used first).
var CDN = 'https://cdn.shopify.com/s/files/1/0916/3879/2484/articles/';

var CATEGORY_IMAGE_POOLS = {
  'Nettoyage': [
    CDN + 'essentielcar-pack-nettoyage-aspirateur-mousse-brosse-polisseuse-1080_jpg.png?v=1762868819',
    CDN + 'essentielcar-pulverisateur-mousse-active-guide-1080_png.png?v=1762532043',
    CDN + 'essentielcar-pulverisateur-mousse-guide-application-1080_png.png?v=1762580046',
    CDN + 'essentielcar-pulverisateur-mousse-routine-checklist-1080_png.png?v=1762585551',
    CDN + 'essentielcar-pulverisateur-mousse-zones-sensibles-1080_png.png?v=1762583592',
    CDN + 'essentielcar-pulverisateur-mousse-depannage-1080_png.png?v=1762584852',
    CDN + 'essentielcar-prelavage-vs-contact-comparatif-1080_png.png?v=1762582127',
    CDN + 'essentielcar-brosse-jantes-usage-reel-1080_png.png?v=1762591491',
    CDN + 'aspirateur-voiture-nettoyage-15-minutes_c04d7669-4be7-4a20-9984-5f984f1b5015.png?v=1762485890',
    CDN + 'aspirateur-voiture-top-5-avantages.png?v=1762436613',
    CDN + 'aspirateur-voiture-sans-fil-guide-complet-2025.png?v=1762433108',
    CDN + 'essuie-glace-retroviseur-golden-hour-1080_png.png?v=1762670001',
    CDN + 'essentielcar-table-volant-hygiene-lingette-1080_png.png?v=1762867751',
    CDN + 'essentielcar-table-volant-petit-dejeuner-1080_png.png?v=1762868087',
    CDN + 'essentielcar-table-volant-setup-travail-1080_png.png?v=1762867650'
  ],
  'Entretien': [
    CDN + 'essentielcar-pack-compresseur-table-volant-lifestyle-1080_png.png?v=1762868733',
    CDN + 'essentielcar-table-volant-coucher-soleil-salade-fruits-eau-1080_jpg.png?v=1762868241',
    CDN + 'essentielcar-table-volant-blanche-nuit-centree-1080_png.png?v=1762867866',
    CDN + 'essentielcar-table-volant-bureau-voiture-1080_png.png?v=1762867331',
    CDN + 'essentielcar-essuie-glace-retroviseur-rose-action-1080_png.png?v=1762680773',
    CDN + 'essentielcar-essuie-glace-retroviseur-comparatif-methodes-1080_png.png?v=1762674071',
    CDN + 'essentielcar-essuie-glace-retroviseur-scenarios-1080_png.png?v=1762673587',
    CDN + 'essentielcar-essuie-glace-retroviseur-avant-apres-1080_png.png?v=1762668398',
    CDN + 'essentielcar-essuie-glace-retroviseur-telescopique-usage-1080_png.png?v=1762660695',
    CDN + 'essentielcar-jantes-sechage-protection-1080_png.png?v=1762599104',
    CDN + 'essentielcar-brosse-vs-pinceaux-vs-gant-1080_png.png?v=1762600917',
    CDN + 'compresseur-gonflage-matelas-4k.png?v=1760485248',
    CDN + 'compresseur-dair-essentielcar-noir-guide-dachat.png?v=1760546447',
    CDN + 'compresseur-dair-essentielcar-test-et-avis.png?v=1760621928',
    CDN + 'entretien-machine-polir-guide-maintenance.png?v=1761174613'
  ],
  'Securite': [
    CDN + 'essentielcar-pack-securite-confort-coffre-jour-1080_jpg.png?v=1762868936',
    CDN + 'dashcam-guide-complet-2025.png?v=1761361501',
    CDN + 'dashcam-top-5-raisons.png?v=1761364371',
    CDN + 'dashcam-comment-choisir-guide-achat.png?v=1761369413',
    CDN + 'dashcam-protection-juridique.png?v=1761371270',
    CDN + 'dashcam-vs-cam-ra-recul-comparatif.png?v=1761372149',
    CDN + 'dashcam-installation-et-entretien.png?v=1761373932',
    CDN + 'dashcam-avis-et-test-complet.png?v=1761376810',
    CDN + 'image-lifestyle-voiture-intelligente-sur-route-avec-l-ments-tech_33db1839-a4ef-4fae-87bb-d9e362ca08a4.png?v=1759417991',
    CDN + 'tpms-guide-complet-2025.png?v=1762077186',
    CDN + 'tpms-top-5-avantages.png?v=1762075007',
    CDN + 'tpms-comment-choisir.png?v=1762072940',
    CDN + 'tpms-conomies-carburant-s-curit.png?v=1762071043',
    CDN + 'tpms-externe-vs-interne-comparatif.png?v=1762069778',
    CDN + 'tpms-avis-et-test-complet-performances.png?v=1762681136'
  ],
  'Carrosserie': [
    CDN + 'essentielcar-brosse-jantes-routine-checklist-1080_png.png?v=1762602476',
    CDN + 'essentielcar-brosse-jantes-type-surface-1080_png.png?v=1762594039',
    CDN + 'essentielcar-brosse-jantes-routine-hiver-1080_png.png?v=1762595403',
    CDN + 'essentielcar-brosse-jantes-interieur-angles-1080_png.png?v=1762598046',
    CDN + 'machine-polir-vs-polissage-manuel-comparatif-avec-produit-original.png?v=1761170490',
    CDN + 'r-sultat-professionnel-polissage-voiture-brillance-miroir.png?v=1760668153',
    CDN + 'machine-polir-sans-fil-essentielcar-produit-original.png?v=1760643240',
    CDN + 'machine-polir-test-complet-r-sultats-avant-apr-s_c8e5d40e-9e77-4615-9f9b-972d8702e949.png?v=1761176126',
    CDN + 'essentielcar-pulverisateur-mousse-ratios-corriges-1080_png_caecc5db-be4e-4cf0-956c-d1f810b2cdb7.png?v=1762540630',
    CDN + 'aspirateur-essentielcar-avis-et-test-complet.png?v=1762491405',
    CDN + 'polissage-voiture-en-30-minutes-avec-machine-polir.png?v=1761173540',
    CDN + 'essentielcar-pack-nettoyage-aspirateur-mousse-brosse-polisseuse-1080_jpg.png?v=1762868819'
  ],
  'Confort': [
    CDN + 'essentielcar-support-telephone-rotule-360_png.png?v=1762511243',
    CDN + 'essentielcar-support-telephone-choix-aerateur-parebrise_png.png?v=1762514398',
    CDN + 'essentielcar-support-telephone-360-position-securite-1080_png.png?v=1762520401',
    CDN + 'essentielcar-support-telephone-360-installation-3-min-1080_png.png?v=1762520800',
    CDN + 'essentielcar-support-telephone-360-magnetique-vs-pince-1080_png.png?v=1762524708',
    CDN + 'essentielcar-support-telephone-placements-legaux-erreurs-1080_png.png?v=1762527029',
    CDN + 'essentielcar-support-telephone-360-entretien-ventouse-pads-rotule-1080_png.png?v=1762522163',
    CDN + 'essentielcar-pack-compresseur-table-volant-lifestyle-1080_png.png?v=1762868733',
    CDN + 'essentielcar-table-volant-coucher-soleil-salade-fruits-eau-1080_jpg.png?v=1762868241',
    CDN + 'essentielcar-table-volant-blanche-nuit-centree-1080_png.png?v=1762867866',
    CDN + 'essentielcar-table-volant-bureau-voiture-1080_png.png?v=1762867331',
    CDN + 'essentielcar-pack-securite-confort-coffre-jour-1080_jpg.png?v=1762868936'
  ],
  'High-Tech': [
    CDN + 'essentielcar-brosse-jantes-interieur-angles-1080_png.png?v=1762598046',
    CDN + 'polissage-voiture-en-30-minutes-avec-machine-polir.png?v=1761173540',
    CDN + 'tpms-guide-complet-2025.png?v=1762077186',
    CDN + 'tpms-top-5-avantages.png?v=1762075007',
    CDN + 'tpms-comment-choisir.png?v=1762072940',
    CDN + 'dashcam-guide-complet-2025.png?v=1761361501',
    CDN + 'dashcam-top-5-raisons.png?v=1761364371',
    CDN + 'dashcam-protection-juridique.png?v=1761371272',
    CDN + 'essentielcar-support-telephone-rotule-360_png.png?v=1762511243',
    CDN + 'essentielcar-support-telephone-choix-aerateur-parebrise_png.png?v=1762514398',
    CDN + 'essentielcar-support-telephone-360-magnetique-vs-pince-1080_png.png?v=1762524708',
    CDN + 'image-lifestyle-voiture-intelligente-sur-route-avec-l-ments-tech_33db1839-a4ef-4fae-87bb-d9e362ca08a4.png?v=1759417991'
  ]
};

function pickImage(category, usedImagesSet) {
  var pool = CATEGORY_IMAGE_POOLS[category] || CATEGORY_IMAGE_POOLS['Entretien'];
  // First pass: find an image not yet used by ANY article
  for (var i = 0; i < pool.length; i++) {
    if (!usedImagesSet.has(pool[i])) {
      return pool[i];
    }
  }
  // All pool images are used — rotate: pick based on count of articles in this category
  var catCount = blogData.articles.filter(function(a) { return a.category === category; }).length;
  return pool[catCount % pool.length];
}

callClaude(prompt).then(function(rawText) {
  console.log('Claude response received, parsing...');

  var articleData = extractJSON(rawText);

  if (!articleData.slug || !articleData.title || !articleData.sections) {
    throw new Error('Missing required fields: slug, title or sections');
  }

  // Ensure unique slug
  var slug = articleData.slug;
  var counter = 2;
  while (existingSlugs.indexOf(slug) !== -1) {
    slug = articleData.slug + '-' + counter;
    counter++;
  }
  articleData.slug = slug;

  // Assign unique image — never reuse an image already in the blog
  var cat = articleData.category || manualCategory;
  articleData.image = pickImage(cat, existingImages);

  var today = new Date().toISOString().split('T')[0];
  articleData.id = blogData.articles.length + 1;
  articleData.date = today;

  blogData.articles.unshift(articleData);
  blogData.meta.lastUpdated = today;
  blogData.meta.totalArticles = blogData.articles.length;
  blogData.meta.autoGenerated = true;

  fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(blogData, null, 2), 'utf8');
  fs.writeFileSync('/tmp/article_title.txt', articleData.title, 'utf8');

  console.log('SUCCESS: ' + articleData.title);
  console.log('Slug: ' + articleData.slug);
  console.log('Image: ' + articleData.image);
  console.log('Total articles: ' + blogData.articles.length);

}).catch(function(err) {
  console.error('ERROR: ' + err.message);
  process.exit(1);
});
