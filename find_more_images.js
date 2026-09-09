const fs = require('fs');

const brain = 'C:/Users/User/.gemini/antigravity/brain/72bebc98-edf8-481c-9150-f2859adb8cb6/.system_generated/steps';
[264, 266, 268, 270].forEach(step => {
  const p = `${brain}/${step}/content.md`;
  if (!fs.existsSync(p)) return;
  const txt = fs.readFileSync(p, 'utf8');
  const m = txt.match(/https:\/\/[^"'<>\s\)\(]+\.(?:jpg|jpeg|png|webp)/gi) || [];
  const filt = [...new Set(m)].filter(u => !u.includes('logo-og') && !u.includes('favicon'));
  console.log(`STEP ${step}: count ${filt.length}`);
  console.log(filt.slice(0, 5));
});
