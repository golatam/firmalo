@AGENTS.md

# Firmalo.io — Client-side PDF Signing Tool for LATAM

## Project Status

| Milestone | Status |
|-----------|--------|
| Day 1: Next.js + i18n + layout + SEO sections | ✅ Done |
| Day 2: PDF viewer + signature modal + export | ✅ Done |
| Day 3: Mobile polish + edge cases | ✅ Done |
| Day 4: 20 SEO pages (10 ES + 10 PT) | ✅ Done |
| Day 5: GA4 + Search Console + SEO position tracking | ✅ Done |
| Day 6: Rate limit + legal pages | ✅ Done |
| Day 7: QA + launch | ✅ Done |

## Architecture

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **PDF:** pdfjs-dist v5 (preview), pdf-lib (export), signature_pad (drawing)
- **i18n:** `[lang]` dynamic segment with SSG, dictionaries in `src/dictionaries/`
- **Key pattern:** SigningTool loaded via `dynamic(ssr: false)` — SEO content renders server-side, tool loads client-side only
- **All PDF processing is 100% client-side** — files never leave the browser

## Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (metadata)
│   ├── icon.svg              # Favicon (SVG)
│   ├── globals.css           # Theme tokens, utility classes
│   ├── [lang]/
│   │   ├── layout.tsx        # Lang layout (header/footer, hreflang)
│   │   ├── page.tsx          # Main tool + SEO sections
│   │   └── [slug]/
│   │       └── page.tsx      # 20 SEO landing pages (SSG)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Hero.tsx              # Hero section (server)
│   ├── SigningToolLoader.tsx  # Client wrapper for dynamic import
│   ├── SigningTool.tsx        # Orchestrator: upload → sign → export
│   ├── DropZone.tsx           # File drag & drop
│   ├── PdfViewer.tsx          # pdf.js canvas renderer (loading/error/debounce)
│   ├── SignatureModal.tsx     # Draw/type/upload signature (mobile-optimized)
│   ├── SignatureOverlay.tsx   # Draggable signature on PDF (touch-friendly)
│   ├── HowItWorks.tsx        # SEO content
│   ├── Benefits.tsx           # SEO content
│   ├── Security.tsx           # SEO content
│   ├── GeoBlock.tsx           # LATAM country blocks
│   ├── FAQ.tsx                # Accordion FAQ
│   ├── PopularGuides.tsx      # Internal links to SEO pages
│   ├── SeoHero.tsx            # SEO page hero with embedded tool
│   ├── SeoContent.tsx         # SEO page content sections
│   ├── SeoFaq.tsx             # SEO page FAQ with JSON-LD
│   ├── RelatedPages.tsx       # Internal linking between SEO pages
│   ├── GoogleAnalytics.tsx     # GA4 client component (next/script)
│   ├── Header.tsx             # Header + lang switcher
│   └── Footer.tsx             # Footer
├── dictionaries/
│   ├── es.json                # Spanish translations
│   └── pt.json                # Portuguese translations
├── lib/
│   ├── i18n.ts                # Locale config
│   ├── dictionaries.ts        # Dictionary loader
│   ├── pdf-worker.ts          # pdf.js worker setup
│   ├── pdf-export.ts          # pdf-lib export + download
│   ├── rate-limit.ts          # Client-side export rate limiting (localStorage)
│   └── seo-pages.ts           # SEO page data (20 pages, 10 ES + 10 PT)
└── proxy.ts                    # Language detection redirect (Next.js 16 proxy)
```

## Hosting & Domain

- **Domain:** firmalo.io (Namecheap, DNS → Railway)
- **Hosting:** Railway (project: firmalo, workspace: Go Latam!)
- **Production URL:** https://firmalo.io
- **Railway URL:** https://firmalo-production.up.railway.app
- **Deploy:** `railway up` from repo root (auto-detects Next.js)
- **Repo:** github.com/golatam/firmalo

## Analytics & SEO Tracking

- **GA4:** `G-C5ZMVHWP4Z` via `GoogleAnalytics` component + `NEXT_PUBLIC_GA_ID` env var
- **Google Search Console:** domain property `firmalo.io`, verified via DNS
- **SEO Position Tracking:** `seo-tracking/` — weekly GSC data collection + Slack reports
  - `semantic-core.json` — 20 pages, 63 keywords (ES + PT), 4 clusters
  - GitHub Actions: every Monday 12:00 UTC → snapshot → Slack report
  - Commands: `npm run seo:weekly`, `npm run seo:report`, `npm run seo:slack-test`
  - `weekly-check.mjs` orchestrates four API calls: sitemaps.list+submit, searchAnalytics.query, urlInspection.index:inspect, plus Slack Block Kit post
  - `scripts/inspect-index.mjs` — URL Inspection per page → `snapshot.indexStatus` (verdict, coverageState, lastCrawlTime, googleCanonical)
  - `scripts/submit-sitemap.mjs` — idempotent sitemap submit; gracefully degrades on 403 `ACCESS_TOKEN_SCOPE_INSUFFICIENT` (current OAuth token is read-only)
  - `scripts/notify-slack.mjs` includes an Indexation section (PASS / NEUTRAL / FAIL / Unknown to Google + sitemap status)
