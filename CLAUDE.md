@AGENTS.md

# Firmalo.io — Client-side PDF Signing Tool for LATAM

## Project Status

| Milestone | Status |
|-----------|--------|
| Day 1: Next.js + i18n + layout + SEO sections | ✅ Done |
| Day 2: PDF viewer + signature modal + export | ✅ Done |
| Day 3: Mobile polish + edge cases | ✅ Done |
| Day 4: 20 SEO pages (10 ES + 10 PT) | ✅ Done |
| Wave 1: +8 SEO pages (28 total) + comparison/trust blocks | ✅ Done |
| GSC P0 fixes (hreflang bug, sin-registro landing CTA) | ✅ Done (2026-07-17, PR #1) — see note below |
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
│   │       └── page.tsx      # 28 SEO landing pages (SSG)
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
│   ├── RelatedPages.tsx       # Internal linking between SEO pages (bottom card grid, anchor = heroTitle)
│   ├── ComparisonTable.tsx    # Firmalo-vs-competitor table (used by "alternativa" pages)
│   ├── TrustFacts.tsx         # Privacy/security trust block on SEO pages
│   ├── ToolCtaBlock.tsx       # Inline CTA card, rendered after a given content section
│   ├── GoogleAnalytics.tsx     # GA4 client component (next/script, strategy=lazyOnload — never appears in curl'd/SSR HTML, only after client hydration)
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
│   ├── structured-data.ts     # JSON-LD builders (SoftwareApplication, etc.)
│   └── seo-pages.ts           # SEO page data (28 pages) — validate with `node scripts/validate-seo-pages.mjs`
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
- **SEO Position Tracking:** `seo-tracking/` — weekly GSC data collection
  - **Production (GitHub Actions cron, every Monday 12:00 UTC):** `seo-weekly.yml` calls the reusable `golatam/seo-tracker` workflow (`@main`) with `notifier: telegram` — weekly reports are delivered via **Telegram**, not Slack.
  - **Local/manual scripts (`seo-tracking/scripts/*.mjs`) are a separate, older Slack-based implementation, not what the production cron runs.** They still exist for local testing: `npm run seo:weekly`, `npm run seo:report`, `npm run seo:slack-test`; `weekly-check.mjs` orchestrates sitemaps.list+submit, searchAnalytics.query, urlInspection.index:inspect, plus a Slack Block Kit post via `scripts/notify-slack.mjs`. Migrating these local scripts to Telegram is deferred to the `golatam/seo-tracker` package itself (see bootstrap workspace) rather than duplicated here.
  - `semantic-core.json` — 20 pages, 63 keywords (ES + PT), 4 clusters
  - `scripts/inspect-index.mjs` — URL Inspection per page → `snapshot.indexStatus` (verdict, coverageState, lastCrawlTime, googleCanonical)
  - `scripts/submit-sitemap.mjs` — idempotent sitemap submit; gracefully degrades on 403 `ACCESS_TOKEN_SCOPE_INSUFFICIENT` (current OAuth token is read-only)
  - `backlink-plan.md` — prioritized off-site listing targets (AlternativeTo, Product Hunt, directories, LATAM communities) with ready ES/PT/EN blurbs, to bootstrap crawl paths for "Discovered – never crawled" pages
  - **Indexation note (2026-06-08):** GSC Coverage showed 24 pages "Discovered – currently not indexed" with last-crawl `1970-01-01` (never crawled by Googlebot) — young-domain crawl-priority issue, not a content/technical fault (2 pages indexed fine, all pass technical audit). On-site levers done: landing-page content ~2× (`src/lib/seo-pages.ts`), sitewide footer links (`Footer.tsx`), homepage contextual links + WebApplication/FAQPage JSON-LD (`HomeSeoIntro.tsx`, `[lang]/page.tsx`), stable sitemap `lastmod` (`sitemap.ts`). Remaining levers are external: manual GSC "Request indexing", backlinks, Google's crawl/rank time.
  - **GSC P0 ТЗ status (2026-07-17, based on `/es/firmar-pdf-sin-registro` hreflang-404 defect):** PR #1 merged — fixed language-switcher hreflang bug (`Header.tsx` + `generateMetadata()` in `[slug]/page.tsx` now use `getAlternateSlug()` instead of naive `/es`→`/pt` replace) and turned the page into an action landing page (CTA above the fold + 2 inline CTA blocks). **Still open from the ТЗ:** (1) internal links to `firmar-pdf-sin-registro` exist only as bottom "related pages" cards with the page title as anchor — the ТЗ asked for in-body contextual links with anchor variants "sin registro"/"sin cuenta"/"sin email", not yet done anywhere; `firmar-pdf-sin-marca-de-agua` is still missing even the card-grid link. (2) CTA block missing on `firmar-pdf-sin-imprimir` and `firmar-pdf-privado-sin-subir-archivos` (both now exist post wave-1, PR predates them). (3) GA4/GTM/Consent Mode v2 (ТЗ §3.5) not built. `GoogleAnalytics.tsx` is wired into `[lang]/layout.tsx`, and `NEXT_PUBLIC_GA_ID=G-C5ZMVHWP4Z` **is confirmed set on Railway production** (checked 2026-07-17 via `railway variables`) — so a missing env var doesn't explain the ТЗ's "GA4 not detected" finding. The script uses `next/script` `strategy="lazyOnload"`, which never appears in SSR/curl'd HTML (only injected client-side post-hydration), so a curl-based check would falsely report it missing too. Before building GTM/Consent Mode v2 from §3.5, verify with an actual browser (Network tab or GA4 DebugView) whether `gtag`/`googletagmanager.com` requests fire on firmalo.io — don't trust curl or env-var presence alone either way.
