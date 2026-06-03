#!/usr/bin/env node
/**
 * Appelé par GitHub Actions après generate-article.js.
 * Lit /tmp/article_data.json et génère assets/images/blog/[slug].png
 */
const fs = require('fs');
const path = require('path');
const { generateCard } = require('./generate-card');

const article = JSON.parse(fs.readFileSync('/tmp/article_data.json', 'utf8'));
// Always derive output path from slug (article.image may be a URL for old articles)
const outputPath = path.join(__dirname, '../assets/images/blog/', article.slug + '.png');
// Normalise image field to local path
article.image = 'assets/images/blog/' + article.slug + '.png';

generateCard(article, outputPath)
  .then(function() {
    console.log('Card ready: ' + article.image);
  })
  .catch(function(err) {
    console.error('Card generation failed: ' + err.message);
    process.exit(1);
  });
