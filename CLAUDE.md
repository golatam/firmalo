@AGENTS.md

# Firmalo.io — Client-side PDF Signing Tool for LATAM

## Project Status

| Milestone | Status |
|-----------|--------|
| Day 1: Next.js + i18n + layout + SEO sections | ✅ Done |
| Day 2: PDF viewer + signature modal + export | ✅ Done |
| Day 3: Mobile polish + edge cases | Pending |
| Day 4: 20 SEO pages (10 ES + 10 PT) | Pending |
| Day 5-6: Analytics + rate limit + legal | Pending |
| Day 7: QA + launch | Pending |

## Architecture

- **Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **PDF:** pdfjs-dist v5 (preview), pdf-lib (export), signature_pad (drawing)
- **i18n:** `[lang]` dynamic segment with SSG, dictionaries in `src/dictionaries/`
- **Key pattern:** SigningTool loaded via `dynamic(ssr: false)` — SEO content renders server-side, tool loads client-side only
- **All PDF processing is 100% client-side** — files never leave the browser

## Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (metadata)
│   ├── [lang]/
│   │   ├── layout.tsx        # Lang layout (header/footer, hreflang)
│   │   └── page.tsx          # Main tool + SEO sections
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Hero.tsx              # Hero section (server)
│   ├── SigningToolLoader.tsx  # Client wrapper for dynamic import
│   ├── SigningTool.tsx        # Orchestrator: upload → sign → export
│   ├── DropZone.tsx           # File drag & drop
│   ├── PdfViewer.tsx          # pdf.js canvas renderer
│   ├── SignatureModal.tsx     # Draw/type/upload signature
│   ├── SignatureOverlay.tsx   # Draggable signature on PDF
│   ├── HowItWorks.tsx        # SEO content
│   ├── Benefits.tsx           # SEO content
│   ├── Security.tsx           # SEO content
│   ├── GeoBlock.tsx           # LATAM country blocks
│   ├── FAQ.tsx                # Accordion FAQ
│   ├── Header.tsx             # Header + lang switcher
│   └── Footer.tsx             # Footer
├── dictionaries/
│   ├── es.json                # Spanish translations
│   └── pt.json                # Portuguese translations
├── lib/
│   ├── i18n.ts                # Locale config
│   ├── dictionaries.ts        # Dictionary loader
│   ├── pdf-worker.ts          # pdf.js worker setup
│   └── pdf-export.ts          # pdf-lib export + download
└── middleware.ts               # Language detection redirect
```

## Domain

- **Domain:** firmalo.io (pending registration)
- **Repo:** github.com/golatam/firmalo
