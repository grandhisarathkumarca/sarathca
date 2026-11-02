// Generates optimised, responsive copies of the supplied proprietor portrait.
// The original file in the project root is never modified.
// Run with: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "WhatsApp Image 2026-10-14 at 9.17.16 AM.jpeg";
const OUT_DIR = "public/images";
const WIDTHS = [480, 800, 1000];

await mkdir(OUT_DIR, { recursive: true });

for (const width of WIDTHS) {
  const base = sharp(SOURCE).rotate().resize({ width, withoutEnlargement: true });
  await base.clone().avif({ quality: 55 }).toFile(`${OUT_DIR}/grandhi-sarath-kumar-${width}.avif`);
  await base.clone().webp({ quality: 74 }).toFile(`${OUT_DIR}/grandhi-sarath-kumar-${width}.webp`);
}
// JPEG fallback (also used for vCard photo-free sharing previews)
await sharp(SOURCE).rotate().resize({ width: 800 }).jpeg({ quality: 78, mozjpeg: true })
  .toFile(`${OUT_DIR}/grandhi-sarath-kumar-800.jpg`);

const meta = await sharp(SOURCE).metadata();
console.log(`Source ${meta.width}x${meta.height}. Wrote ${WIDTHS.length * 2 + 1} files to ${OUT_DIR}.`);

