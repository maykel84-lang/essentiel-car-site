#!/usr/bin/env node
/**
 * Expand short articles to 1500-2500 words.
 * Usage (via GitHub Actions): ARTICLE_IDS="95,96,97,98" node tools/expand-article.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BLOG_DATA_PATH = path.join(__dirname, '../assets/data/blog-posts.json');

const PRODUCT_LINKS = [
  { keywords: ['aspirateur','aspiration','poussière','miettes'], name: 'Aspirateur Sans Fil Voiture', url: 'product.html?id=aspirateur-sans-fil' },
  { keywords: ['brosse','jante','jantes','roue'], name: 'Brosse à Jantes Pro', url: 'product.html?id=brosse-jantes' },
  { keywords: ['compresseur','gonflage','pneu','pression','crevaison'], name: 'Compresseur d\'Air Portable', url: 'product.html?id=compresseur-air' },
  { keywords: ['dashcam','caméra de bord','boîte noire','enregistreur','vidéo'], name: 'Dashcam 4K Ultra HD', url: 'product.html?id=dashcam-4k' },
  { keywords: ['support téléphone','support smartphone','fixation','navigation'], name: 'Support Téléphone Voiture', url: 'product.html?id=support-telephone' },
  { keywords: ['polir','polisseuse','polissage','lustrage','carrosserie','rayure'], name: 'Machine à Polir Sans Fil', url: 'product.html?id=machine-polir' },
  { keywords: ['lance-mousse','mousse active','mousse','lavage'], name: 'Lance-Mousse Manuelle', url: 'product.html?id=lance-mousse' },
  { keywords: ['tpms','capteur pression','surveillance pression'], name: 'Capteurs TPMS Solaire', url: 'product.html?id=tpms' },
  { keywords: ['table volant','tablette volant'], name: 'Table de Volant Pliable', url: 'product.html?id=table-volant' },
  { keywords: ['essuie-glace','rétroviseur','balai','visibilité'], name: 'Essuie-Glace Rétroviseur', url: 'product.html?id=essuie-glace-retros' },
  { keywords: ['nettoyage','propre','detailing','microfibre','cuir','tissu'], name: 'Lance-Mousse Manuelle', url: 'product.html?id=lance-mousse' },
  { keywords: ['sécurité','alarme','protection','kit urgence'], name: 'Pack Sécurité & Confort', url: 'product.html?id=pack-securite' },
  { keywords: ['entretien','révision','maintenance','filtre','huile'], name: 'Pack Entretien Essentiel', url: 'product.html?id=pack-entretien' },
  { keywords: ['pare-chocs','carrosserie','protection'], name: 'Pack Entretien Essentiel', url: 'product.html?id=pack-entretien' },
];

function detectProduct(article) {
  var text = (article.title + ' ' + article.excerpt + ' ' + (article.tags || []).join(' ')).toLowerCase();
  for (var i = 0; i < PRODUCT_LINKS.length; i++) {
    var p = PRODUCT_LINKS[i];
    if (p.keywords.some(function(k) { return text.indexOf(k) !== -1; })) return p;
  }
  return { name: 'boutique ESSENTIEL CAR', url: 'boutique.html' };
}

function callClaude(promptText) {
  return new Promise(function(resolve, reject) {
    var body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 5000,
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
          if (parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed.content[0].text);
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
  throw new Error('No valid JSON found in response');
}

function buildPrompt(article, allArticles) {
  var product = detectProduct(article);

  // Pick 2 cross-articles (same category preferred)
  var others = allArticles
    .filter(function(a) { return a.id !== article.id; })
    .sort(function(a, b) { return Math.abs(a.id - article.id) - Math.abs(b.id - article.id); });
  var samecat = others.filter(function(a) { return a.category === article.category; }).slice(0, 2);
  var crossLinks = samecat.length >= 2 ? samecat : samecat.concat(others.filter(function(a) { return a.category !== article.category; })).slice(0, 2);
  var crossStr = crossLinks.map(function(a) {
    return '"' + a.title + '" → <a href="blog-article.html?id=' + a.id + '" style="color:#e0000c;font-weight:700">' + a.title + '</a>';
  }).join('\n- ');

  return [
    'Tu es un expert SEO et rédacteur spécialisé en accessoires automobiles.',
    'Tu dois RÉÉCRIRE et ENRICHIR cet article de blog existant pour atteindre 1500-2500 mots.',
    '',
    'Article à enrichir :',
    '- Titre : ' + article.title,
    '- Catégorie : ' + article.category,
    '- Résumé : ' + article.excerpt,
    '- Tags : ' + (article.tags || []).join(', '),
    '',
    'CONTRAINTES IMPORTANTES :',
    '- Garder exactement le même sujet et angle éditorial',
    '- NE PAS changer le slug, le titre, la catégorie, les tags, l\'emoji, ni l\'image',
    '- Longueur cible : 1500 à 2500 mots (OBLIGATOIRE)',
    '- Structure : 6 à 8 sections h2 avec paragraphes de 150-250 mots chacun',
    '- Chaque paragraphe doit apporter une vraie valeur ajoutée, des chiffres, des conseils pratiques',
    '',
    'MAILLAGE INTERNE OBLIGATOIRE (minimum 5 liens dans les sections) :',
    '- Produit principal : <a href="' + product.url + '" style="color:#e0000c;font-weight:700">' + product.name + '</a>',
    '- Boutique : <a href="boutique.html" style="color:#e0000c;font-weight:700">boutique ESSENTIEL CAR</a>',
    '- Best-sellers : <a href="boutique.html?filter=bestseller" style="color:#e0000c;font-weight:700">best-sellers</a>',
    '- Blog : <a href="blog.html" style="color:#e0000c;font-weight:700">blog auto ESSENTIEL CAR</a>',
    '- Articles croisés à intégrer naturellement :',
    '- ' + crossStr,
    '',
    'REPONDS UNIQUEMENT avec un objet JSON valide contenant UNIQUEMENT le champ "sections".',
    'Format : {"sections": [...]}',
    '',
    'Structure sections recommandée :',
    '[',
    '  {"type":"intro","text":"3-4 phrases percutantes avec 1 lien produit intégré naturellement"},',
    '  {"type":"h2","text":"Titre section 1 avec mot-clé"},',
    '  {"type":"p","text":"Paragraphe 150-250 mots avec faits, chiffres, conseils concrets"},',
    '  {"type":"h2","text":"Titre section 2"},',
    '  {"type":"p","text":"Paragraphe 150-250 mots avec lien boutique intégré"},',
    '  {"type":"h2","text":"Titre section 3"},',
    '  {"type":"ul","items":["Point 1 détaillé (20+ mots)","Point 2 détaillé","Point 3","Point 4","Point 5 avec lien"]},',
    '  {"type":"h2","text":"Titre section 4"},',
    '  {"type":"p","text":"Paragraphe 150-250 mots"},',
    '  {"type":"h2","text":"Titre section 5"},',
    '  {"type":"p","text":"Paragraphe 150-250 mots avec lien article croisé"},',
    '  {"type":"h2","text":"Titre section 6"},',
    '  {"type":"p","text":"Paragraphe 150-250 mots"},',
    '  {"type":"tip","text":"Conseil expert 80-120 mots avec lien best-sellers"},',
    '  {"type":"conclusion","text":"4-5 phrases : récap + CTA + liens vers produit, boutique, blog"}',
    ']'
  ].join('\n');
}

async function expandArticle(article, allArticles) {
  console.log('Expanding article id=' + article.id + ': ' + article.title);
  var prompt = buildPrompt(article, allArticles);
  var rawText = await callClaude(prompt);
  var result = extractJSON(rawText);

  if (!result.sections || !Array.isArray(result.sections)) {
    throw new Error('Invalid response: missing sections array');
  }

  // Count words
  var wordCount = 0;
  result.sections.forEach(function(s) {
    var text = s.text || '';
    var items = (s.items || []).join(' ');
    wordCount += (text + ' ' + items).split(/\s+/).filter(Boolean).length;
  });
  console.log('  → ' + result.sections.length + ' sections, ~' + wordCount + ' mots');

  return result.sections;
}

async function main() {
  var idsEnv = process.env.ARTICLE_IDS || '';
  if (!idsEnv) {
    console.error('ERROR: ARTICLE_IDS env var required (e.g. "95,96,97,98")');
    process.exit(1);
  }

  var ids = idsEnv.split(',').map(function(s) { return parseInt(s.trim(), 10); }).filter(Boolean);
  console.log('Articles to expand: ' + ids.join(', '));

  var blogData = JSON.parse(fs.readFileSync(BLOG_DATA_PATH, 'utf8'));
  var articles = blogData.articles;

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var articleIndex = articles.findIndex(function(a) { return a.id === id; });
    if (articleIndex === -1) {
      console.warn('WARNING: Article id=' + id + ' not found, skipping');
      continue;
    }

    var article = articles[articleIndex];
    try {
      var newSections = await expandArticle(article, articles);
      articles[articleIndex].sections = newSections;
      console.log('  ✅ Article id=' + id + ' expanded successfully');
    } catch(err) {
      console.error('  ❌ Failed to expand article id=' + id + ': ' + err.message);
    }

    // Small delay between API calls
    if (i < ids.length - 1) {
      await new Promise(function(r) { setTimeout(r, 2000); });
    }
  }

  blogData.meta.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(blogData, null, 2), 'utf8');
  console.log('✅ blog-posts.json updated successfully');
}

main().catch(function(err) {
  console.error('FATAL: ' + err.message);
  process.exit(1);
});
