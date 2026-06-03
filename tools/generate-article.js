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
  '  "imagePrompt": "Short English description for AI image generation, 10-15 words, photo-realistic automotive product on dark studio background",',
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
  'Regles : 500-800 mots, SEO longue traine francais, conclusion cite la boutique ESSENTIEL CAR.',
  'Pour imagePrompt : courte description anglaise precise du sujet de l\'article, style photo-realiste, fond studio sombre, ex: "car foam cannon spray gun professional car wash dark background"'
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

function buildPollinationsUrl(imagePrompt, seed) {
  var encoded = encodeURIComponent(imagePrompt);
  return 'https://image.pollinations.ai/prompt/' + encoded
    + '?width=1200&height=630&nologo=true&model=flux&seed=' + seed;
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

  var today = new Date().toISOString().split('T')[0];
  var newId = blogData.articles.length + 1;
  articleData.id = newId;
  articleData.date = today;

  // Build AI image URL from Claude-generated prompt; seed = article ID for reproducibility
  var imagePrompt = articleData.imagePrompt
    || (articleData.title + ' car accessory automotive product professional studio dark background');
  articleData.image = buildPollinationsUrl(imagePrompt, newId);

  // Remove imagePrompt from stored data (it's only needed to build the URL)
  delete articleData.imagePrompt;

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
