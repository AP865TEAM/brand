import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// Lay out original artwork without redrawing or cropping it; rasterize for the web.
const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || 'sharp');
const sourceNumbers = [1, 2, 3, 4, 5, 6, 7, 9, 10, 13];
const assets = new URL('../public/applications/', import.meta.url);
const tiles = sourceNumbers.map((number, index) => {
  const label = String(number).padStart(2, '0');
  const data = readFileSync(new URL(`shopping-bags-${label}.png`, assets)).toString('base64');
  const x = 60 + (index % 5) * 620;
  const y = 80 + Math.floor(index / 5) * 980;
  return `<image x="${x}" y="${y}" width="600" height="900" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${data}"/>
  <text x="${x + 300}" y="${y + 942}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#3D281C">${label}</text>`;
});
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3200" height="2100" viewBox="0 0 3200 2100">
<title>Shopping Bags — Other Proposals</title>
<desc>Original proposals 01, 02, 03, 04, 05, 06, 07, 09, 10 and 13, in reading order.</desc>
<rect width="3200" height="2100" fill="#F7F2E6"/>
${tiles.join('\n')}
</svg>\n`;
const output = new URL('shopping-bags-collection.jpg', assets);
await sharp(Buffer.from(svg)).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(fileURLToPath(output));
console.log(fileURLToPath(output));
