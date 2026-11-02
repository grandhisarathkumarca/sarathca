/**
 * Post-build fix for static exports built on Windows.
 *
 * Next.js writes each page's prefetch segment as nested folders on Windows, e.g.
 *   out/about/__next.!KHNpdGUp/about/__PAGE__.txt
 * while the browser requests the dot-joined name
 *   out/about/__next.!KHNpdGUp.about.__PAGE__.txt
 * (which is what macOS/Linux builds produce). Without the flat copy every link prefetch
 * 404s and navigation falls back to full page loads. This copies each nested segment file
 * to its flat name; on macOS/Linux there is nothing to do.
 */
import { copyFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const outDir = join(process.cwd(), "out");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function main() {
  try {
    await stat(outDir);
  } catch {
    return;
  }
  let copied = 0;
  for await (const file of walk(outDir)) {
    const parts = relative(outDir, file).split(sep);
    const at = parts.findIndex((part, i) => i < parts.length - 1 && part.startsWith("__next."));
    if (at === -1) continue;
    const flat = join(outDir, ...parts.slice(0, at), parts.slice(at).join("."));
    await copyFile(file, flat);
    copied++;
  }
  if (copied) console.log(`flatten-export-segments: wrote ${copied} prefetch segment file(s).`);
}

await main();
