// Generates the responsive image variants committed under public/. GitHub
// Pages serves a static export with no image optimizer, so these files are
// pre-built once here and checked in like any other static asset.
//
// Run with `pnpm images`. Safe to re-run: every variant is deterministically
// derived from its source, so re-running just overwrites with the same result.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

/** Pixel-art portrait: nearest-neighbor keeps hard pixel edges crisp at every size. */
const PORTRAIT_SRC = path.join(publicDir, "pixel", "alejandro-pixel-portrait.png");
const PORTRAIT_WIDTHS = [480, 900, 1400];

/** Project preview screenshots: regular photographic downscale (lanczos). */
const PREVIEWS_DIR = path.join(publicDir, "previews");
const PREVIEW_NAMES = ["cataclub", "horno", "yololab"];
const PREVIEW_WIDTH = 900;

async function writeVariant(srcPath, destPath, width, { pixelArt = false } = {}) {
  const resizeOptions = { width };
  if (pixelArt) resizeOptions.kernel = sharp.kernel.nearest;

  const image = sharp(srcPath).resize(resizeOptions).png({ compressionLevel: 9 });
  await image.toFile(destPath);

  const meta = await sharp(destPath).metadata();
  return { path: destPath, width: meta.width, height: meta.height };
}

async function main() {
  const results = [];

  for (const width of PORTRAIT_WIDTHS) {
    const destPath = path.join(
      path.dirname(PORTRAIT_SRC),
      `${path.basename(PORTRAIT_SRC, ".png")}-${width}.png`,
    );
    results.push(await writeVariant(PORTRAIT_SRC, destPath, width, { pixelArt: true }));
  }

  await mkdir(PREVIEWS_DIR, { recursive: true });
  for (const name of PREVIEW_NAMES) {
    const srcPath = path.join(PREVIEWS_DIR, `${name}.png`);
    const destPath = path.join(PREVIEWS_DIR, `${name}-${PREVIEW_WIDTH}.png`);
    results.push(await writeVariant(srcPath, destPath, PREVIEW_WIDTH));
  }

  for (const result of results) {
    console.log(`${path.relative(publicDir, result.path)} — ${result.width}x${result.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
