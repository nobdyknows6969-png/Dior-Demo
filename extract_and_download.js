const fs = require('fs');
const https = require('https');
const path = require('path');

const steps = [
  { step: 224, name: 'jasmin_des_anges.jpg' },
  { step: 253, name: 'sauvage_extrait.jpg' },
  { step: 256, name: 'rouge_dior_on_stage.jpg' },
  { step: 258, name: 'rouge_dior_on_stage_ink.jpg' },
  { step: 260, name: 'diorshow_5_couleurs.jpg' },
  { step: 262, name: 'rouge_blush.jpg' },
  { step: 264, name: 'lucky_clover_campaign.jpg' },
  { step: 266, name: 'art_of_gifting.jpg' },
  { step: 268, name: 'personalisation_atelier.jpg' },
  { step: 270, name: 'eboutique_advantages.jpg' }
];

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed ${url}: status ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    }).on('error', (e) => {
      console.log(`Error ${url}:`, e.message);
      resolve(false);
    });
  });
}

async function processAll() {
  const brainDir = 'C:/Users/User/.gemini/antigravity/brain/72bebc98-edf8-481c-9150-f2859adb8cb6/.system_generated/steps';
  for (const s of steps) {
    const filePath = path.join(brainDir, String(s.step), 'content.md');
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      continue;
    }
    const txt = fs.readFileSync(filePath, 'utf8');
    let og = txt.match(/property="og:image"\s+content="([^"]+)"/i) ||
             txt.match(/name="twitter:image"\s+content="([^"]+)"/i) ||
             txt.match(/itemprop="image"\s+content="([^"]+)"/i);
    let imgUrl = og ? og[1] : null;

    if (!imgUrl) {
      const allImgs = txt.match(/https:\/\/[^"'<>\s]+\.(?:jpg|jpeg|png|webp)/gi);
      if (allImgs && allImgs.length > 0) {
        imgUrl = allImgs[0];
      }
    }

    if (imgUrl) {
      if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
      console.log(`[Step ${s.step}] Found for ${s.name}: ${imgUrl}`);
      const ok = await download(imgUrl, s.name);
      console.log(`Downloaded ${s.name}:`, ok);
    } else {
      console.log(`[Step ${s.step}] No image found for ${s.name}`);
    }
  }
}

processAll();
