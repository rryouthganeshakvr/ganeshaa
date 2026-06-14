#!/usr/bin/env node
/**
 * sync-gallery.mjs
 * Keeps src/content/gallery.ts in sync with public/images/:
 *   • Prepends newly added images to the top (so they appear first)
 *   • Removes entries whose image file has been deleted (prevents blank tiles)
 *
 * Run manually:  npm run gallery:sync
 * Runs automatically before:  npm run dev  and  npm run build
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT      = join(__dirname, '..')
const IMAGE_DIR = join(ROOT, 'public', 'images')
const GALLERY   = join(ROOT, 'src', 'content', 'gallery.ts')

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.heic'])

const GRADIENTS = [
  'from-amber-900 via-orange-800 to-yellow-900',
  'from-yellow-900 via-amber-800 to-orange-900',
  'from-orange-900 via-red-900 to-amber-800',
  'from-amber-800 via-yellow-900 to-orange-800',
  'from-red-900 via-orange-900 to-yellow-800',
  'from-yellow-800 via-amber-900 to-orange-800',
  'from-purple-900 via-indigo-800 to-blue-900',
  'from-pink-900 via-rose-800 to-orange-900',
  'from-teal-900 via-emerald-800 to-green-900',
  'from-indigo-900 via-violet-800 to-purple-900',
]

const PLACEHOLDERS = ['🛕', '🙏', '🌸', '✨', '🪔', '🎊', '🌺', '⭐', '🎉', '🔱', '🌟', '🏆']

function toTitle(filename) {
  const raw = basename(filename, extname(filename))
  if (/^\d+$/.test(raw) || raw.length <= 3) return 'Festival Moment'
  return raw.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// ── Read current state ────────────────────────────────────────────────────────

const allImages    = readdirSync(IMAGE_DIR).filter(f => EXTS.has(extname(f).toLowerCase()))
const allImageSet  = new Set(allImages)
let   content      = readFileSync(GALLERY, 'utf-8')

// All /images/… srcs currently in gallery.ts
const trackedSrcs = [...content.matchAll(/src:\s*['"]([^'"]+)['"]/g)].map(m => m[1])

// ── 1. Remove orphaned entries (file deleted) ─────────────────────────────────

const orphaned = trackedSrcs.filter(src => {
  if (!src.startsWith('/images/')) return false   // skip external / non-image srcs
  return !allImageSet.has(src.replace('/images/', ''))
})

if (orphaned.length > 0) {
  for (const src of orphaned) {
    const escaped = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Match the full item block: leading newline + "    {" ... "    },"
    const blockRe = new RegExp(
      `\\n    \\{[\\s\\S]*?src:\\s*['"]${escaped}['"][\\s\\S]*?    \\},`,
      ''
    )
    content = content.replace(blockRe, '')
  }
  console.log(`[gallery-sync] 🗑  Removed ${orphaned.length} deleted image(s): ${orphaned.join(', ')}`)
}

// ── 2. Prepend new images ────────────────────────────────────────────────────

// Re-read tracked srcs after removals
const trackedAfterRemove = new Set(
  [...content.matchAll(/src:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
)
const newFiles = allImages.filter(f => !trackedAfterRemove.has(`/images/${f}`))

if (newFiles.length > 0) {
  const existingIds = [...content.matchAll(/\bid:\s*(\d+)/g)].map(m => parseInt(m[1]))
  let nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1

  const newBlocks = newFiles.map((filename, i) => {
    const id          = nextId + i
    const gradient    = GRADIENTS[id % GRADIENTS.length]
    const placeholder = PLACEHOLDERS[id % PLACEHOLDERS.length]
    return (
      `    {\n` +
      `      id: ${id},\n` +
      `      title: '${toTitle(filename)}',\n` +
      `      category: 'Festival',\n` +
      `      aspect: 'wide',\n` +
      `      src: '/images/${filename}',\n` +
      `      gradient: '${gradient}',\n` +
      `      placeholder: '${placeholder}',\n` +
      `    },`
    )
  }).join('\n')

  content = content.replace(/(items:\s*\[)/, `$1\n${newBlocks}`)
  console.log(`[gallery-sync] ✓  Prepended ${newFiles.length} new image(s): ${newFiles.join(', ')}`)
}

// ── 3. Write back (only if changed) ─────────────────────────────────────────

const original = readFileSync(GALLERY, 'utf-8')
if (content === original && orphaned.length === 0 && newFiles.length === 0) {
  console.log('[gallery-sync] ✓  No changes — gallery is up to date.')
  process.exit(0)
}

writeFileSync(GALLERY, content)

if (orphaned.length === 0 && newFiles.length === 0) {
  console.log('[gallery-sync] ✓  No changes — gallery is up to date.')
}
