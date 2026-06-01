#!/usr/bin/env node
/**
 * ESSENTIEL CAR — Générateur de sitemap.xml
 * Appelé automatiquement après chaque ajout d'article
 */

const fs = require('fs');
const path = require('path');

const BASE = 'https://essentielcar.com';
const BLOG_DATA = path.join(__dirname, '../assets/data/blog-posts.json');
const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');

const d = JSON.parse(fs.readFileSync(BLOG_DATA, 'utf8'));
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: BASE + '/', priority: '1.0', changefreq: 'weekly' },
  { url: BASE + '/boutique.html', priority: '0.9', changefreq: 'weekly' },
  { url: BASE + '/blog.html', priority: '0.9', changefreq: 'daily' },
  { url: BASE + '/contact.html', priority: '0.6', changefreq: 'monthly' },
  { url: BASE + '/cgv.html', priority: '0.3', changefreq: 'monthly' },
  { url: BASE + '/mentions-legales.html', priority: '0.3', changefreq: 'monthly' },
  { url: BASE + '/confidentialite.html', priority: '0.3', changefreq: 'monthly' },
  { url: BASE + '/politique-expedition.html', priority: '0.3', changefreq: 'monthly' },
  { url: BASE + '/politique-remboursement.html', priority: '0.3', changefreq: 'monthly' },
];

const articleUrls = d.articles.map(a => ({
  url: BASE + '/blog-article.html?slug=' + a.slug,
  lastmod: a.date,
  priority: '0.7',
  changefreq: 'monthly'
}));

const allUrls = [
  ...staticPages.map(p => ({ ...p, lastmod: today })),
  ...articleUrls
];

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  allUrls.map(u =>
    '  <url>\n' +
    '    <loc>' + u.url + '</loc>\n' +
    '    <lastmod>' + u.lastmod + '</lastmod>\n' +
    '    <changefreq>' + u.changefreq + '</changefreq>\n' +
    '    <priority>' + u.priority + '</priority>\n' +
    '  </url>'
  ).join('\n') +
  '\n</urlset>';

fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
console.log('Sitemap updated: ' + allUrls.length + ' URLs (' + d.articles.length + ' articles)');
