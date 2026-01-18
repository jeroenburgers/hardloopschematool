#!/usr/bin/env node

/**
 * Script to generate favicon files from SVG
 * This creates high-quality PNG and ICO files from the SVG favicon
 *
 * Usage: node scripts/generate-favicons.mjs
 *
 * Requirements: sharp (npm install --save-dev sharp)
 */

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, "..", "public")

// SVG content optimized for favicon
const faviconSVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="4" fill="#EA580C"/>
  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
</svg>`

async function generateFavicons() {
  try {
    // Check if sharp is available
    const sharpModule = await import("sharp").catch(() => null)

    if (!sharpModule) {
      console.log("⚠️  sharp not installed. Installing...")
      console.log("   Run: pnpm add -D sharp")
      console.log("\n📝 For now, using SVG favicon only.")
      console.log("   Modern browsers support SVG favicons natively.")
      return
    }

    const sharp = sharpModule.default || sharpModule

    // Read the SVG
    const svgBuffer = Buffer.from(faviconSVG)

    // Generate different sizes
    const sizes = [
      { size: 16, name: "favicon-16x16.png" },
      { size: 32, name: "favicon-32x32.png" },
      { size: 48, name: "favicon-48x48.png" },
      { size: 180, name: "apple-touch-icon.png" },
      { size: 192, name: "icon-192.png" },
      { size: 512, name: "icon-512.png" },
    ]

    console.log("🎨 Generating favicon files...")

    for (const { size, name } of sizes) {
      await sharp(svgBuffer)
        .resize(size, size, {
          kernel: "lanczos3",
        })
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(path.join(publicDir, name))

      console.log(`   ✓ Generated ${name} (${size}x${size})`)
    }

    // Generate ICO file (32x32 PNG as fallback)
    await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(publicDir, "favicon.ico"))

    console.log("   ✓ Generated favicon.ico (32x32)")
    console.log("\n✅ Favicon generation complete!")
  } catch (error) {
    console.error("❌ Error generating favicons:", error.message)
    console.log("\n📝 Using SVG favicon only (modern browsers support this)")
  }
}

generateFavicons()
