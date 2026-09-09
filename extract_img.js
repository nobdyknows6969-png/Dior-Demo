const fs = require('fs');

const path = 'C:/Users/User/.gemini/antigravity/brain/72bebc98-edf8-481c-9150-f2859adb8cb6/.system_generated/steps/224/content.md';
if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  const og = content.match(/property="og:image"\s+content="([^"]+)"/i);
  console.log('OG:', og ? og[1] : 'null');
  
  // Also find dior cdn images
  const matches = content.match(/https:\/\/[^"']*(?:beauty|products)[^"']*\.(?:jpg|jpeg|png|webp)/gi);
  if (matches) {
    const uniq = [...new Set(matches)];
    console.log('Matches count:', uniq.length);
    console.log('Top matches:', uniq.slice(0, 10));
  }
} else {
  console.log('File does not exist');
}
