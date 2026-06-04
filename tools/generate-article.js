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

const CATEGORIES = ['Nettoyage', 'Securite', 'Carrosserie', 'Confort', 'High-Tech', 'Entretien'];

const manualCategory = (process.env.MANUAL_CATEGORY && process.env.MANUAL_CATEGORY !== 'Auto')
  ? process.env.MANUAL_CATEGORY
  : CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

const topicInstruction = process.env.MANUAL_TOPIC
  ? 'Le sujet impose est : "' + process.env.MANUAL_TOPIC + '".'
  : 'Choisis un sujet pertinent et SEO dans la categorie "' + manualCategory + '" pour des accessoires auto en France.';

const existingList = existingTitles.slice(0, 20).join('\n- ');

// 5 articles récents pour liens croisés (slug + titre)
const recentArticles = blogData.articles.slice(0, 5).map(function(a) {
  return '"' + a.title + '" → article.html?slug=' + a.slug;
}).join('\n- ');

// Catalogue produits avec URLs pour le maillage interne
var PRODUCT_LINKS = [
  { keywords: ['aspirateur','aspiration'],        name: 'Aspirateur Sans Fil Voiture', url: 'product.html?id=aspirateur-sans-fil', badge: 'BESTSELLER' },
  { keywords: ['brosse','jante','jantes'],         name: 'Brosse à Jantes Pro',          url: 'product.html?id=brosse-jantes',       badge: '' },
  { keywords: ['compresseur','gonflage','pneu','pression'], name: 'Compresseur d\'Air Portable', url: 'product.html?id=compresseur-air', badge: '' },
  { keywords: ['dashcam','caméra de bord','boîte noire','enregistreur'], name: 'Dashcam 4K Ultra HD', url: 'product.html?id=dashcam-4k', badge: '' },
  { keywords: ['support téléphone','support smartphone','fixation'],     name: 'Support Téléphone Voiture', url: 'product.html?id=support-telephone', badge: '' },
  { keywords: ['machine à polir','polisseuse','polissage'],              name: 'Machine à Polir Sans Fil', url: 'product.html?id=machine-polir', badge: '' },
  { keywords: ['lance-mousse','mousse active','mousse','lavage'],        name: 'Lance-Mousse Manuelle', url: 'product.html?id=lance-mousse', badge: '' },
  { keywords: ['tpms','capteur pression','surveillance pression'],       name: 'Capteurs TPMS Solaire', url: 'product.html?id=tpms', badge: '' },
  { keywords: ['table volant','tablette volant'],  name: 'Table de Volant Pliable',     url: 'product.html?id=table-volant',        badge: '' },
  { keywords: ['essuie-glace','rétroviseur','balai'], name: 'Essuie-Glace Rétroviseur', url: 'product.html?id=essuie-glace-retros', badge: '' },
  { keywords: ['pack entretien','entretien complet'], name: 'Pack Entretien Essentiel', url: 'product.html?id=pack-entretien', badge: 'PACK' },
  { keywords: ['pack nettoyage','nettoyage complet'], name: 'Pack Nettoyage Complet',   url: 'product.html?id=pack-nettoyage', badge: 'PACK' },
  { keywords: ['pack sécurité','sécurité confort'],   name: 'Pack Sécurité & Confort',  url: 'product.html?id=pack-securite',  badge: 'PACK' },
];

// Déterminer le produit principal de l'article pour les liens
var articleTitleLower = (process.env.MANUAL_TOPIC || manualCategory).toLowerCase();
var mainProductLink = '';
var relatedPackLink = '';
for (var _pi = 0; _pi < PRODUCT_LINKS.length; _pi++) {
  var _p = PRODUCT_LINKS[_pi];
  if (_p.keywords.some(function(k) { return articleTitleLower.indexOf(k) !== -1; })) {
    if (!mainProductLink && _p.badge !== 'PACK') mainProductLink = _p.url + ' (' + _p.name + ')';
    if (!relatedPackLink && _p.badge === 'PACK') relatedPackLink = _p.url + ' (' + _p.name + ')';
  }
}
if (!mainProductLink) mainProductLink = 'boutique.html (boutique complète)';
if (!relatedPackLink) relatedPackLink = 'boutique.html?filter=bestseller (nos best-sellers)';

// Map article keywords → exact English product name for imagePrompt
var PRODUCT_MAP = [
  { keywords: ['dashcam', 'dash cam', 'camera de bord', 'boite noire'], en: 'dual 4K dashcam car camera' },
  { keywords: ['lance-mousse', 'lance mousse', 'mousse active', 'foam cannon', 'pulverisateur'], en: 'foam cannon spray bottle car wash' },
  { keywords: ['aspirateur'], en: 'cordless car vacuum cleaner handheld' },
  { keywords: ['brosse', 'jante', 'jantes'], en: 'car wheel rim cleaning brush kit' },
  { keywords: ['machine a polir', 'polisseuse', 'polish', 'polissage'], en: 'cordless car polisher orbital machine' },
  { keywords: ['compresseur', 'gonflage', 'pneu', 'pression'], en: 'portable car tire inflator compressor digital display' },
  { keywords: ['tpms', 'capteur pression', 'surveillance pression'], en: 'TPMS tire pressure monitoring system sensors display' },
  { keywords: ['support telephone', 'support telephone', 'support smartphone'], en: 'magnetic car phone holder mount dashboard' },
  { keywords: ['table volant', 'tablette volant', 'plateau volant'], en: 'steering wheel desk tray laptop table car' },
  { keywords: ['filtre habitacle', 'filtre air', 'filtre cabine'], en: 'car cabin air filter HEPA replacement automotive' },
  { keywords: ['essuie-glace', 'essuie glace', 'retroviseur', 'balai'], en: 'car wiper blade rearview mirror telescopic' }
];

function detectProduct(title) {
  var lower = title.toLowerCase();
  for (var i = 0; i < PRODUCT_MAP.length; i++) {
    for (var j = 0; j < PRODUCT_MAP[i].keywords.length; j++) {
      if (lower.indexOf(PRODUCT_MAP[i].keywords[j]) !== -1) {
        return PRODUCT_MAP[i].en;
      }
    }
  }
  return null;
}

// Brand DA: dark/black background, red (#CC0000) + white accents, professional automotive studio photography
var DA_STYLE = 'dramatic dark studio background, bold red and white color accents, professional automotive product photography, premium brand identity, sharp focus, cinematic lighting, black background';

var DA_PRODUCT_EXAMPLES = [
  '"dual 4K dashcam mounted on windshield interior view ' + DA_STYLE + '"',
  '"foam cannon spray bottle producing white foam on black car ' + DA_STYLE + '"',
  '"flat tire on dark asphalt road red danger warning light dramatic ' + DA_STYLE + '"'
].join(', ');

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
  '  "imagePrompt": "VOIR REGLES CI-DESSOUS",',
  '  "tags": ["tag1","tag2","tag3"],',
  '  "sections": [',
  '    {"type":"intro","text":"Introduction 2-3 phrases avec 1 lien produit principal : <a href=\\"' + mainProductLink.split(' ')[0] + '\\" style=\\"color:#e0000c;font-weight:700\\">Voir le produit</a>"},',
  '    {"type":"h2","text":"Titre section 1 — mot-cle principal"},',
  '    {"type":"p","text":"Paragraphe 60-100 mots avec naturellement le mot-cle"},',
  '    {"type":"h2","text":"Titre section 2"},',
  '    {"type":"p","text":"Paragraphe avec lien vers <a href=\\"boutique.html\\" style=\\"color:#e0000c;font-weight:700\\">la boutique ESSENTIEL CAR</a>"},',
  '    {"type":"ul","items":["Point 1 avec benefice concret","Point 2","Point 3 avec lien <a href=\\"' + mainProductLink.split(' ')[0] + '\\" style=\\"color:#e0000c\\">ici</a>","Point 4"]},',
  '    {"type":"h2","text":"Titre section 3"},',
  '    {"type":"p","text":"Paragraphe"},',
  '    {"type":"tip","text":"Conseil pratique + lien vers <a href=\\"boutique.html?filter=bestseller\\" style=\\"color:#e0000c;font-weight:700\\">nos best-sellers</a>"},',
  '    {"type":"conclusion","text":"Conclusion 3-4 phrases : recapitulatif + appel a action avec liens HTML vers le produit, la boutique et 1-2 articles similaires du blog. IMPORTANT : integrer ces liens dans le texte naturellement : <a href=\\"' + mainProductLink.split(' ')[0] + '\\" style=\\"color:#e0000c;font-weight:700\\">voir notre ' + mainProductLink.split('(')[1]?.replace(')', '') + '</a> et <a href=\\"blog.html\\" style=\\"color:#e0000c;font-weight:700\\">tous nos articles</a>."}',
  '  ]',
  '}',
  '',
  'REGLES imagePrompt — TRES IMPORTANT :',
  'imagePrompt est une description en anglais pour generer une image IA qui respecte la charte graphique de la marque ESSENTIEL CAR :',
  '- Style : photo-realisme professionnel, eclairage studio dramatique',
  '- Palette : fond NOIR/sombre, accents ROUGE vif et BLANC',
  '- Composition : produit central bien visible, qualite premium, ombre portee',
  '- Produits references (si l\'article en parle) : foam cannon spray bottle, cordless car vacuum, wheel rim brush, orbital car polisher, portable tire inflator, TPMS sensors, magnetic phone mount, steering wheel desk tray, cabin air filter, telescopic wiper blade, dual 4K dashcam',
  '- Si l\'article traite d\'un de ces produits : INCLURE le nom exact du produit dans le prompt',
  '- Si l\'article traite d\'un sujet general (pneus, entretien, etc.) : decrire la scene avec la meme DA sombre/rouge/blanc',
  '- Toujours terminer par : dramatic dark studio background bold red white accents professional automotive photography',
  '- Longueur : 15-25 mots maximum',
  '- Exemples reussis : ' + DA_PRODUCT_EXAMPLES,
  '',
  '',
  'REGLES MAILLAGE INTERNE — OBLIGATOIRE POUR LE SEO :',
  '1. Chaque article DOIT contenir minimum 3 liens HTML cliquables dans le texte (pas juste mentionnes)',
  '2. Produit principal de cet article : ' + mainProductLink,
  '3. Pack associe : ' + relatedPackLink,
  '4. Boutique : boutique.html | Best-sellers : boutique.html?filter=bestseller',
  '5. Blog : blog.html',
  '6. Articles recents a croiser (choisir 1-2 pertinents) :',
  '- ' + recentArticles,
  '7. Format des liens HTML : <a href="URL" style="color:#e0000c;font-weight:700">texte ancre SEO</a>',
  '8. Les liens doivent etre DANS le texte des sections, integres naturellement',
  '9. Texte ancre : utiliser des mots-cles descriptifs (pas "cliquez ici")',
  '',
  'REGLES LONGUEUR ARTICLE — TRES IMPORTANT :',
  'Longueur cible : 1500 a 2500 mots (EXCELLENT SEO). Minimum absolu : 1200 mots.',
  'Structure recommandee pour atteindre 1500-2500 mots :',
  '- intro : 3-4 phrases (60-80 mots)',
  '- 6 a 8 sections h2 avec paragraphes de 150-250 mots chacun',
  '- 1 liste ul de 5-7 points detailles',
  '- 1 tip approfondi (80-120 mots)',
  '- conclusion : 4-5 phrases avec appels a action et liens (100-150 mots)',
  'Chaque paragraphe DOIT faire minimum 100 mots. Ne pas faire de contenu superficiel.',
  'SEO longue traine francais, maillage interne complet obligatoire.'
].join('\n');

function callClaude(promptText) {
  return new Promise(function(resolve, reject) {
    var body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4500,
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

var BLOG_IMAGES_DIR = path.join(__dirname, '../assets/images/blog');

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

  var today = new Date().toISOString().split('T')[0];
  var newId = blogData.articles.length + 1;
  articleData.id = newId;
  articleData.date = today;

  // Remove imagePrompt field — image is now a local PNG card
  delete articleData.imagePrompt;

  // Image path: local PNG generated by generate-card.js
  var imageName = slug + '.png';
  articleData.image = 'assets/images/blog/' + imageName;

  blogData.articles.unshift(articleData);
  blogData.meta.lastUpdated = today;
  blogData.meta.totalArticles = blogData.articles.length;
  blogData.meta.autoGenerated = true;

  fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(blogData, null, 2), 'utf8');
  fs.writeFileSync('/tmp/article_title.txt', articleData.title, 'utf8');
  // Pass article data to card generator via temp file
  fs.writeFileSync('/tmp/article_data.json', JSON.stringify(articleData), 'utf8');

  console.log('SUCCESS: ' + articleData.title);
  console.log('Slug: ' + articleData.slug);
  console.log('Image: ' + articleData.image);
  console.log('Total articles: ' + blogData.articles.length);

}).catch(function(err) {
  console.error('ERROR: ' + err.message);
  process.exit(1);
});
