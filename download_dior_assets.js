const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [
  { name: 'jasmin_des_anges.jpg', url: 'https://www.dior.com/en_int/beauty/products/jasmin-des-anges-esprit-de-parfum-Y0000268.html' },
  { name: 'sauvage_extrait.jpg', url: 'https://www.dior.com/en_int/beauty/products/sauvage-extrait-Y0000281.html' },
  { name: 'rouge_dior_on_stage.jpg', url: 'https://www.dior.com/en_int/beauty/products/rouge-dior-on-stage-Y0000265.html' },
  { name: 'rouge_dior_on_stage_ink.jpg', url: 'https://www.dior.com/en_int/beauty/products/rouge-dior-on-stage-ink-Y0000242.html' },
  { name: 'diorshow_5_couleurs.jpg', url: 'https://www.dior.com/en_int/beauty/products/diorshow-5-couleurs---limited-edition-E000001849.html' },
  { name: 'rouge_blush.jpg', url: 'https://www.dior.com/en_int/beauty/products/rouge-blush---limited-edition-E000001856.html' },
  { name: 'lucky_clover.jpg', url: 'https://www.dior.com/en_int/beauty/dlp-makeup-lucky-clover-collection.html' },
  { name: 'art_of_gifting.jpg', url: 'https://www.dior.com/en_int/beauty/page/art-of-gifting.html' },
  { name: 'personalisation.jpg', url: 'https://www.dior.com/en_int/beauty/page/the-personalization-atelier.html' },
  { name: 'eboutique_advantages.jpg', url: 'https://www.dior.com/en_int/beauty/services/dlp-eboutique-advantages.html' }
];

async function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    }).on('error', () => resolve(false));
  });
}

async function run() {
  for (const t of targets) {
    console.log('Fetching', t.url);
    const html = await fetchUrl(t.url);
    const og = html.match(/property="og:image"\s+content="([^"]+)"/i) || html.match(/name="twitter:image"\s+content="([^"]+)"/i);
    if (og && og[1]) {
      let imgUrl = og[1];
      if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
      console.log('Found image for', t.name, ':', imgUrl);
      await downloadFile(imgUrl, t.name);
      console.log('Saved', t.name);
    } else {
      console.log('No OG image found for', t.name);
    }
  }
}

run();
