const fs = require('fs');

const steps = [
  { step: 224, name: 'Jasmin des Anges' },
  { step: 253, name: 'Sauvage Extrait' },
  { step: 256, name: 'Rouge Dior On Stage' },
  { step: 258, name: 'Rouge Dior On Stage Ink' },
  { step: 260, name: 'Diorshow 5 Couleurs' },
  { step: 262, name: 'Rouge Blush' },
  { step: 264, name: 'Lucky Clover' },
  { step: 266, name: 'Art of Gifting' },
  { step: 268, name: 'Personalisation Atelier' },
  { step: 270, name: 'EBoutique Advantages' }
];

const brainDir = 'C:/Users/User/.gemini/antigravity/brain/72bebc98-edf8-481c-9150-f2859adb8cb6/.system_generated/steps';

for (const s of steps) {
  const filePath = `${brainDir}/${s.step}/content.md`;
  if (!fs.existsSync(filePath)) continue;
  const txt = fs.readFileSync(filePath, 'utf8');
  
  // Find all images on demandware or dior
  const matches = txt.match(/https:\/\/[^"'<>\s\)\(]+\.(?:jpg|jpeg|png|webp)/gi) || [];
  // Filter for product / content images (not logos/icons)
  const filtered = matches.filter(url => 
    !url.includes('favicon') && 
    !url.includes('logo-og') &&
    (url.includes('Sites-master_dior') || url.includes('Library-Sites') || url.includes('beauty'))
  );
  const uniq = [...new Set(filtered)];
  console.log(`=== ${s.name} (Step ${s.step}) ===`);
  console.log(uniq.slice(0, 3));
}
