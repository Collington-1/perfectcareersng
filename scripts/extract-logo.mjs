// One-off asset pipeline: derive clean logo files for /public from the
// founder's real brand artwork on disk. Not part of the app build.
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const SRC_DIR = "C:/Users/USER/Desktop/PerfectCareersNG";
const OUT_DIR = path.join(process.cwd(), "public", "brand");

fs.mkdirSync(OUT_DIR, { recursive: true });

const MAIN = path.join(SRC_DIR, "Main-PerfectCareersLogo.png");

async function makePrimary() {
  // Trim the flat white margin so the lockup is tightly cropped, keep as-is
  // (purple mark + orange tie + purple/orange wordmark) for light backgrounds.
  await sharp(MAIN)
    .trim({ background: "#ffffff", threshold: 10 })
    .png()
    .toFile(path.join(OUT_DIR, "logo-primary.png"));
}

async function makeReversed() {
  // Derive an all-white, transparent-background version for dark sections
  // (footer, purple hero overlays) by color-keying the source ink against
  // its white background: alpha = 255 - min(r,g,b), RGB forced to white.
  // This mirrors the founder's own reversed lockup (Rep-PerfectCareersLogo.png)
  // instead of inventing new artwork.
  const trimmed = sharp(MAIN).trim({ background: "#ffffff", threshold: 10 });
  const { data, info } = await trimmed
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const raw = 255 - Math.min(r, g, b);
    // Push solid ink to fully opaque white while keeping a thin antialiased
    // fringe at edges (small raw values) instead of a hard jagged cutout.
    const inkAlpha = Math.min(255, Math.round(raw * 6));

    out[i * 4] = 255;
    out[i * 4 + 1] = 255;
    out[i * 4 + 2] = 255;
    out[i * 4 + 3] = inkAlpha;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(OUT_DIR, "logo-reversed.png"));
}

async function makeFavicon() {
  // Square icon-only crop (top ~62% of the trimmed primary, which is just
  // the circular mark before the wordmark begins) resized down for favicon use.
  const trimmedPath = path.join(OUT_DIR, "logo-primary.png");
  const meta = await sharp(trimmedPath).metadata();
  const markHeight = Math.round(meta.height * 0.72); // exclude the wordmark row below the mark

  await sharp(trimmedPath)
    .extract({ left: 0, top: 0, width: meta.width, height: markHeight })
    .resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_DIR, "icon-mark.png"));
}

await makePrimary();
await makeReversed();
await makeFavicon();

console.log("Logo assets written to", OUT_DIR);
