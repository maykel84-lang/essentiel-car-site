/**
 * ESSENTIEL CAR — Import articles blog Shopify → blog-posts.json
 *
 * Usage :
 *   node tools/shopify-import.js <SHOP_DOMAIN> <ACCESS_TOKEN>
 *
 * Exemple :
 *   node tools/shopify-import.js essentiel-car.myshopify.com shpat_XXXXXXXXXXXX
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const [,, shopDomain, accessToken] = process.argv;

if (!shopDomain || !accessToken) {
  console.error('Usage: node tools/shopify-import.js <SHOP_DOMAIN> <ACCESS_TOKEN>');
  console.error('Ex:    node tools/shopify-import.js essentiel-car.myshopify.com shpat_xxx');
  process.exit(1);
}

function get(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: shopDomain,
      path: urlPath,
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ body: JSON.parse(data), headers: res.headers }); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// Slugify French text
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

// Strip HTML tags
function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Estimate read time (words per minute = 200)
function readTime(text) {
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

// Parse Shopify article body into our sections format
function parseSections(bodyHtml, excerpt) {
  const text = stripHtml(bodyHtml);
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 30);

  if (paragraphs.length === 0) {
    return [{ type: 'intro', text: excerpt || text.substring(0, 200) }];
  }

  const sections = [];

  // First paragraph → intro
  sections.push({ type: 'intro', text: paragraphs[0].trim() });

  // Remaining paragraphs → alternate h2 + p
  const titles = ['En détail', 'Ce qu\'il faut savoir', 'Les points clés', 'Notre analyse', 'Conclusion'];
  let titleIdx = 0;

  for (let i = 1; i < paragraphs.length; i++) {
    const para = paragraphs[i].trim();
    if (para.length < 20) continue;

    // Every other section gets a h2
    if (i % 2 === 1 && titleIdx < titles.length) {
      sections.push({ type: 'h2', text: titles[titleIdx++] });
    }

    sections.push({ type: 'p', text: para });
  }

  // Last section → conclusion style if it contains "boutique", "commander", etc.
  const lastSection = sections[sections.length - 1];
  if (lastSection && lastSection.type === 'p' &&
      /boutique|commander|découvrir|retrouver|essentiel/i.test(lastSection.text)) {
    lastSection.type = 'conclusion';
  }

  return sections;
}

// Detect category from tags and title
function detectCategory(tags, title) {
  const text = (tags.join(' ') + ' ' + title).toLowerCase();
  if (/nettoy|lav|propre|polish|brillan|cire|céramique|détail/i.test(text)) return 'Nettoyage';
  if (/sécurit|dashcam|caméra|radar|alerte|accident|freinage/i.test(text)) return 'Sécurité';
  if (/carross|peinture|rayure|bosselure|pare-choc|aile/i.test(text)) return 'Carrosserie';
  if (/confort|siège|coussin|chauffant|tapis|coffre|rangement/i.test(text)) return 'Confort';
  if (/tech|gps|bluetooth|usb|charg|écran|affich|connecté/i.test(text)) return 'High-Tech';
  if (/entretien|révision|huile|filtre|pneu|batterie|frein/i.test(text)) return 'Entretien';
  return 'Entretien';
}

// Detect emoji from category and tags
function detectEmoji(category, tags) {
  const emojis = {
    'Nettoyage': ['🚗', '✨', '🧽', '💧', '🪣'],
    'Sécurité': ['🛡️', '📷', '⚠️', '🔒', '🚨'],
    'Carrosserie': ['🎨', '✨', '🔧', '💎', '🛠️'],
    'Confort': ['🪑', '🏠', '❄️', '🌡️', '📦'],
    'High-Tech': ['📱', '📡', '🔌', '💻', '📲'],
    'Entretien': ['🔧', '⚙️', '🔩', '🛠️', '⚡']
  };
  const list = emojis[category] || ['🚗'];
  return list[Math.floor(Math.random() * list.length)];
}

async function fetchAllArticles() {
  // Step 1: Get all blogs
  console.log('📚 Récupération des blogs...');
  const blogsRes = await get('/admin/api/2024-01/blogs.json');
  const blogs = blogsRes.body.blogs;

  if (!blogs || blogs.length === 0) {
    console.error('Aucun blog trouvé sur cette boutique.');
    process.exit(1);
  }

  console.log(`✅ ${blogs.length} blog(s) trouvé(s) :`);
  blogs.forEach(b => console.log(`   - "${b.title}" (id: ${b.id})`));

  // Step 2: Fetch articles from all blogs with pagination
  let allShopifyArticles = [];

  for (const blog of blogs) {
    console.log(`\n📄 Récupération des articles du blog "${blog.title}"...`);
    let page = 1;
    let pageInfo = null;
    let hasMore = true;

    while (hasMore) {
      let urlPath = `/admin/api/2024-01/blogs/${blog.id}/articles.json?limit=50&status=active`;
      if (pageInfo) urlPath += `&page_info=${pageInfo}`;

      const res = await get(urlPath);
      const articles = res.body.articles || [];
      allShopifyArticles = allShopifyArticles.concat(articles);

      // Check for next page via Link header
      const linkHeader = res.headers.link || '';
      const nextMatch = linkHeader.match(/<[^>]*page_info=([^&>]+)[^>]*>;\s*rel="next"/);
      if (nextMatch) {
        pageInfo = nextMatch[1];
        page++;
        console.log(`   Page ${page}... (${allShopifyArticles.length} articles récupérés)`);
        await new Promise(r => setTimeout(r, 500)); // Rate limit
      } else {
        hasMore = false;
      }
    }
  }

  console.log(`\n✅ ${allShopifyArticles.length} articles récupérés au total`);
  return allShopifyArticles;
}

async function main() {
  console.log('🚀 Import Shopify → ESSENTIEL CAR Blog');
  console.log('=====================================');
  console.log(`Boutique : ${shopDomain}\n`);

  const shopifyArticles = await fetchAllArticles();

  // Load existing blog data
  const blogDataPath = path.join(__dirname, '../assets/data/blog-posts.json');
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  const existingSlugs = new Set(blogData.articles.map(a => a.slug));

  // Convert Shopify articles to our format
  const converted = [];
  let skipped = 0;

  for (const sa of shopifyArticles) {
    const slug = sa.handle || slugify(sa.title);

    // Skip duplicates
    if (existingSlugs.has(slug)) {
      skipped++;
      continue;
    }

    const tags = sa.tags ? sa.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const category = detectCategory(tags, sa.title);
    const bodyText = stripHtml(sa.body_html || '');
    const excerpt = sa.excerpt || bodyText.substring(0, 150).trim() + '...';
    const sections = parseSections(sa.body_html || '', excerpt);

    const article = {
      id: blogData.articles.length + converted.length + 1,
      slug,
      title: sa.title,
      excerpt,
      category,
      emoji: detectEmoji(category, tags),
      date: sa.published_at ? sa.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
      readTime: readTime(bodyText),
      tags: tags.slice(0, 6),
      sections,
      shopifyId: sa.id
    };

    converted.push(article);
    existingSlugs.add(slug);
  }

  console.log(`\n📊 Résultat :`);
  console.log(`   Articles Shopify trouvés : ${shopifyArticles.length}`);
  console.log(`   Articles importés        : ${converted.length}`);
  console.log(`   Déjà existants (ignorés) : ${skipped}`);

  if (converted.length === 0) {
    console.log('\nAucun nouvel article à importer.');
    return;
  }

  // Prepend imported articles (sorted by date, newest first)
  converted.sort((a, b) => new Date(b.date) - new Date(a.date));
  blogData.articles = [...converted, ...blogData.articles];
  blogData.meta.lastUpdated = new Date().toISOString().split('T')[0];
  blogData.meta.totalArticles = blogData.articles.length;

  // Write updated JSON
  fs.writeFileSync(blogDataPath, JSON.stringify(blogData, null, 2), 'utf8');

  console.log(`\n✅ blog-posts.json mis à jour : ${blogData.articles.length} articles au total`);
  console.log('\n📋 Articles importés :');
  converted.slice(0, 10).forEach(a => console.log(`   [${a.category}] ${a.title}`));
  if (converted.length > 10) console.log(`   ... et ${converted.length - 10} autres`);

  console.log('\n🎯 Prochaine étape : commiter et pusher');
  console.log('   git add assets/data/blog-posts.json');
  console.log('   git commit -m "Blog: import ' + converted.length + ' articles depuis Shopify"');
  console.log('   git push origin main');
}

main().catch(err => {
  console.error('\n❌ Erreur :', err.message);
  if (err.message.includes('401') || err.message.includes('403')) {
    console.error('   → Vérifiez votre token d\'accès Shopify');
  }
  process.exit(1);
});
