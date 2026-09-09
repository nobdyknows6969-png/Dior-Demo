const fs = require('fs');

const images = [
  {
    name: 'dior_jasmin_des_anges.jpg',
    url: 'https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dwd398d3c5/Y0000268/Y0000268_E000001785_E01_GHC.jpg'
  },
  {
    name: 'dior_sauvage_extrait.jpg',
    url: 'https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dw3ea352d1/Y0000281/Y0000281_E000001620_E01_GHC.jpg'
  },
  {
    name: 'dior_rouge_on_stage.jpg',
    url: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dweabb4cf5/Y0000265/Y0000265_E000000796_E01_RHC.jpg'
  },
  {
    name: 'dior_rouge_on_stage_ink.png',
    url: 'https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dw56fb4c9e/Y0000242/Y0000242_E000001646_E01_GHC.png'
  },
  {
    name: 'dior_diorshow_5_couleurs.jpg',
    url: 'https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dw34b2eccf/Y0000255/Y0000255_E000001849_E01_GHC.jpg'
  },
  {
    name: 'dior_rouge_blush.jpg',
    url: 'https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dwf32eaf14/Y0000256/Y0000256_E000001856_E01_GHC.jpg'
  },
  {
    name: 'dior_lucky_clover.jpg',
    url: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw670cd1a3/images/beauty/02-MAKEUP/2026/FALL-LOOK/LP/A26_LOOK_ERETAIL_M229_FALL_26_M03J_DEVA_GREEN_CLOVER_RHABILLAGE_3200x1800_V2.jpg'
  },
  {
    name: 'dior_art_of_gifting.jpg',
    url: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw7f488864/images/beauty/04-TRIAXE/2026/AOG-2026/AOG_25_P01D_Hero_Couture_AOG_range_4_109_NEW_SW_F39_3200x1800.jpg'
  },
  {
    name: 'dior_personalisation.jpg',
    url: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw15ff6327/images/beauty/04-TRIAXE/2026/PERSO-2026/Hero__5___108_3200x1800.jpg'
  },
  {
    name: 'dior_samples.jpg',
    url: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dwab09b7c8/images/beauty/06-SERVICE/5-EBOUTIQUE-ADVANTAGES/G023_MCD_AOG_21_P05D_ECHANTILLONS_3000_3000.jpg'
  },
  {
    name: 'dior_packaging.jpg',
    url: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw6059e5fe/images/beauty/06-SERVICE/5-EBOUTIQUE-ADVANTAGES/AOG_Generique_HandBox_3000x3000.jpg'
  }
];

async function downloadAll() {
  for (const img of images) {
    try {
      const res = await fetch(img.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.dior.com/'
        }
      });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(img.name, buf);
        console.log(`Saved ${img.name} (${buf.length} bytes)`);
      } else {
        console.log(`Failed ${img.name}: ${res.status}`);
      }
    } catch (e) {
      console.log(`Error ${img.name}:`, e.message);
    }
  }
}

downloadAll();
