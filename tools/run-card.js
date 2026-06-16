#!/usr/bin/env node
/**
 * Appelé par GitHub Actions après generate-article.js.
 * Lit /tmp/article_data.json et génère assets/images/blog/[slug].png
 * Si l'image existe déjà (uploadée manuellement), elle est conservée.
 */
const fs = require('fs');
const path = require('path');
const { generateCard } = require('./generate-card');

const article = JSON.parse(fs.readFileSync('/tmp/article_data.json', 'utf8'));
const outputPath = path.join(__dirname, '../assets/images/blog/', article.slug + '.png');
article.image = 'assets/images/blog/' + article.slug + '.png';

// Ne jamais écraser une image uploadée manuellement
if (fs.existsSync(outputPath)) {
  console.log('Image personnalisée conservée : ' + article.image);
  process.exit(0);
}

generateCard(article, outputPath)
  .then(function() {
    console.log('Card générée : ' + article.image);
  })
  .catch(function(err) {
    console.error('Card generation failed: ' + err.message);
    process.exit(1);
  });
