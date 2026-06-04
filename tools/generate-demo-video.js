#!/usr/bin/env node
/**
 * Génère des vidéos démo produits via Pollo.ai (Kling AI)
 * Usage: POLLO_API_KEY=xxx PRODUCT=dashcam node tools/generate-demo-video.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.POLLO_API_KEY;
const PRODUCT = process.env.PRODUCT || 'all';
const OUTPUT_DIR = path.join(__dirname, '../assets/videos/demo');

if (!API_KEY) { console.error('ERROR: POLLO_API_KEY manquante'); process.exit(1); }
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Prompts par produit — style cinématique sombre, DA ESSENTIEL CAR
const PRODUCTS = {
  'dashcam': {
    file: 'dashcam-demo.mp4',
    label: 'DASHCAM 4K',
    caption: 'Chaque trajet filmé en Ultra HD',
    prompt: 'Close-up of a 4K dashcam mounted on car windshield, night city driving, bright headlights, cinematic dark moody atmosphere, red accent lighting, ultra HD recording indicator glowing, professional automotive product video, dramatic slow motion',
    negative: 'cartoon, animation, text overlay, watermark, blurry',
  },
  'machine-polir': {
    file: 'machine-polir-demo.mp4',
    label: 'MACHINE À POLIR',
    caption: 'Rayures effacées, carrosserie comme neuve',
    prompt: 'Cordless orbital polisher working on black car hood, removing scratches, white foam polish swirling, dramatic dark studio lighting, red sparks of reflection, professional detailing, cinematic close-up slow motion, premium automotive',
    negative: 'cartoon, animation, text overlay, watermark',
  },
  'lance-mousse': {
    file: 'lance-mousse-demo.mp4',
    label: 'LANCE-MOUSSE',
    caption: 'Mousse active — carrosserie éclatante en 2 min',
    prompt: 'Foam cannon spraying thick white foam on dark red sports car, dramatic side lighting, foam cascading down glossy hood, cinematic slow motion, dark moody background, professional car wash detailing, premium product demonstration',
    negative: 'cartoon, animation, text overlay, watermark',
  },
  'compresseur': {
    file: 'compresseur-demo.mp4',
    label: 'COMPRESSEUR',
    caption: 'Pneu gonflé à la bonne pression en 60 sec',
    prompt: 'Portable tire inflator attached to car tire on dark road, digital pressure display glowing red, dramatic night lighting, tire inflating with air rushing in, cinematic close-up, professional automotive product video',
    negative: 'cartoon, animation, text overlay, watermark',
  },
  'brosse-jantes': {
    file: 'brosse-jantes-demo.mp4',
    label: 'BROSSE À JANTES',
    caption: 'Jantes brillantes, crasse éliminée sans effort',
    prompt: 'Detail brush cleaning black alloy wheel rim, removing brake dust, soapy water, dramatic studio lighting, cinematic slow motion close-up, dark background, red accent lighting reflection on clean rim, premium automotive detailing',
    negative: 'cartoon, animation, text overlay, watermark',
  },
  'tpms': {
    file: 'tpms-demo.mp4',
    label: 'CAPTEURS TPMS',
    caption: 'Pression surveillée en temps réel, 0 surprise',
    prompt: 'TPMS tire pressure sensor display on car dashboard showing live PSI readings, night driving, digital red numbers glowing, cinematic interior car shot, dramatic dark lighting, modern automotive technology, slow motion',
    negative: 'cartoon, animation, text overlay, watermark',
  },
  'support-telephone': {
    file: 'support-tel-demo.mp4',
    label: 'SUPPORT TÉLÉPHONE',
    caption: 'Navigation mains libres, fixation magnétique',
    prompt: 'Magnetic phone mount on car dashboard holding smartphone with GPS navigation, night city driving, phone screen glowing with map, cinematic interior shot, dark moody atmosphere, red ambient lighting, smooth driving motion',
    negative: 'cartoon, animation, text overlay, watermark',
  },
};

function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.pollo.ai',
      path: '/v1' + endpoint,
      method,
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };

    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch(e) { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? require('https') : require('http');
    const file = fs.createWriteStream(dest);
    proto.get(url, res => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function waitForVideo(taskId, maxWait = 300000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    await new Promise(r => setTimeout(r, 8000));
    const res = await apiRequest('GET', '/videos/kling/' + taskId);
    console.log('  Status:', res.body?.data?.task_status || res.body?.status || JSON.stringify(res.body).slice(0, 100));

    const status = res.body?.data?.task_status || res.body?.status;
    if (status === 'succeed' || status === 'completed' || status === 'success') {
      const works = res.body?.data?.task_result?.videos || res.body?.data?.works || [];
      const videoUrl = works[0]?.url || works[0]?.resource || res.body?.data?.url;
      if (videoUrl) return videoUrl;
    }
    if (status === 'failed' || status === 'error') throw new Error('Generation failed: ' + JSON.stringify(res.body));
  }
  throw new Error('Timeout waiting for video generation');
}

async function generateVideo(key, product) {
  console.log('\n🎬 Génération: ' + product.label);

  const createRes = await apiRequest('POST', '/videos/kling/text-to-video', {
    model_name: 'kling-v1-6',
    prompt: product.prompt,
    negative_prompt: product.negative,
    cfg_scale: 0.5,
    mode: 'std',
    aspect_ratio: '16:9',
    duration: '5',
  });

  console.log('  Réponse création:', JSON.stringify(createRes.body).slice(0, 200));

  const taskId = createRes.body?.data?.task_id || createRes.body?.task_id || createRes.body?.id;
  if (!taskId) throw new Error('Pas de task_id dans la réponse: ' + JSON.stringify(createRes.body));

  console.log('  Task ID:', taskId);
  const videoUrl = await waitForVideo(taskId);
  console.log('  URL vidéo:', videoUrl);

  const dest = path.join(OUTPUT_DIR, product.file);
  await downloadFile(videoUrl, dest);
  console.log('  ✅ Sauvegardé:', dest);
  return dest;
}

async function main() {
  const toGenerate = PRODUCT === 'all'
    ? Object.keys(PRODUCTS)
    : PRODUCT.split(',').map(p => p.trim()).filter(p => PRODUCTS[p]);

  if (toGenerate.length === 0) {
    console.error('Produits inconnus. Disponibles:', Object.keys(PRODUCTS).join(', '));
    process.exit(1);
  }

  console.log('Produits à générer:', toGenerate.join(', '));
  const results = [];

  for (const key of toGenerate) {
    try {
      const dest = await generateVideo(key, PRODUCTS[key]);
      results.push({ key, file: PRODUCTS[key].file, success: true });
    } catch(err) {
      console.error('  ❌ Erreur pour ' + key + ':', err.message);
      results.push({ key, success: false, error: err.message });
    }
    if (toGenerate.indexOf(key) < toGenerate.length - 1) {
      console.log('  Pause 5s avant prochain...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n=== RÉSUMÉ ===');
  results.forEach(r => console.log((r.success ? '✅' : '❌') + ' ' + r.key + (r.error ? ' — ' + r.error : '')));

  const failed = results.filter(r => !r.success);
  if (failed.length > 0 && failed.length === results.length) process.exit(1);
}

main().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
