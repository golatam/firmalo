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
| SEO optimization plan (www redirect, watermark content, PT links, GA4 events) | ✅ Done (2026-08-12) — see `docs/TZ-seo-optimization-plan-2026-08-12.md` |
| Signing tool: crash fix (same-URL Link mid-session) + signature caching + multi-signature | ✅ Done (2026-08-12) |

## SEO position data — Topvisor direct, not seo-tracker

**CRITICAL — `golatam/seo-tracker` is deprecated as of 2026-08-12 (confirmed by Kirill).** Don't use it, don't trust its `STATUS.md`/descriptors as current truth, and don't expect it to auto-open GitHub issues anymore — the `seo-tz` issue-queue rule that used to live here is gone; there is no automated alert channel right now. Getting a fresh position read is a manual step: Kirill runs the paid check via the Topvisor UI himself, then Claude Code pulls the resulting data directly via the Topvisor API — see skill `~/.claude/skills/topvisor-api/SKILL.md` (credentials, endpoints, and a critical `depth`-vs-`--` gotcha that caused a false "data is broken" diagnosis on 2026-08-12). Project ID `29754841` (`firmalo.io`, 80 keywords, 19 LATAM+ES regions). For an SEO plan/analysis, loop in Hermes/Clavito via skill `ask-clavito-seo` — see `docs/TZ-seo-optimization-plan-2026-08-12.md` for the first cycle of this (real position trends + a P0-P3 plan).

## Architecture

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **PDF:** pdfjs-dist v5 (preview), pdf-lib (export), signature_pad (drawing)
- **i18n:** `[lang]` dynamic segment with SSG, dictionaries in `src/dictionaries/`
- **Key pattern:** SigningTool loaded via `dynamic(ssr: false)` — SEO content renders server-side, tool loads client-side only
- **All PDF processing is 100% client-side** — files never leave the browser
- **Signatures:** `SigningTool` holds `signatures: PlacedSignature[]` (id/dataUrl/placement), not a single value — multiple independent signatures per document are supported (each own drag/resize/remove). The last-used signature is cached in `localStorage` (`signature-storage.ts`) so it doesn't need redrawing — deliberately **not** a user-account system: accounts would contradict the "sin registro"/"sem cadastro" positioning that's the headline argument on dozens of SEO pages, and there's no backend to support it. Don't reintroduce a single-signature scalar or propose accounts without surfacing that tension first.

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
│   ├── pdf-export.ts          # pdf-lib export + download — exportSignedPdf() takes SignatureToPlace[], draws each
│   ├── rate-limit.ts          # Client-side export rate limiting (localStorage)
│   ├── signature-storage.ts   # Locally-cached last-used signature (localStorage, no account — see note below)
│   ├── analytics.ts           # GA4 product events (pdf_upload_started/signature_created/pdf_signed_downloaded), no PII
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

- **GA4:** `G-C5ZMVHWP4Z` via `GoogleAnalytics` component + `NEXT_PUBLIC_GA_ID` env var. Product events (`pdf_upload_started`/`signature_created`/`pdf_signed_downloaded`) added 2026-08-12, see `analytics.ts`.
- **Google Search Console:** domain property `firmalo.io`, verified via DNS
- **SEO position data:** see "SEO position data — Topvisor direct, not seo-tracker" above — that's the current, authoritative source. Everything below this point describes the now-defunct `golatam/seo-tracker` GitHub Actions pipeline; kept for history, not current truth.
- **SEO Position Tracking (superseded, historical):** `seo-tracking/` — weekly GSC data collection
  - **Production (GitHub Actions cron, every Monday 12:00 UTC):** `seo-weekly.yml` calls the reusable `golatam/seo-tracker` workflow, pinned to commit `@ea69f34` (not `@main`, since 2026-08-03) with `notifier: telegram` — weekly reports are delivered via **Telegram**, not Slack. Pin reason: seo-tracker's `main` is about to default `RANK_SOURCE` to `topvisor`, and firmalo has no Topvisor secrets — tracking `@main` would silently break this cron. Un-pin once seo-tracker exposes an explicit `rank_source` input, or firmalo gets its own Topvisor project.
  - **Local rollback copies were deleted 2026-08-03** after three months of stable package-driven cron runs. `weekly-check.mjs`, `fetch-gsc.mjs`, `inspect-index.mjs`, `submit-sitemap.mjs`, `notify-slack.mjs` and `env.mjs` are gone — they were an older Slack-based duplicate of what the package already does, and had drifted from it. Recover via `git log -- seo-tracking/scripts` if ever needed. To run the pipeline off-schedule: `gh workflow run seo-weekly.yml -R golatam/firmalo`.
  - **What remains local:** `scripts/report.mjs` (`npm run seo:report` — console comparison over `snapshots/`) and `config.mjs` (thresholds it imports). Both are outside the weekly pipeline.
  - `semantic-core.json` — 20 pages, 63 keywords (ES + PT), 4 clusters
  - **Indexation + sitemap submit** (URL Inspection per page → `snapshot.indexStatus`; idempotent sitemaps.submit degrading gracefully on 403 `ACCESS_TOKEN_SCOPE_INSUFFICIENT`) now run inside the `golatam/seo-tracker` package, not from this repo
  - `backlink-plan.md` — prioritized off-site listing targets (AlternativeTo, Product Hunt, directories, LATAM communities) with ready ES/PT/EN blurbs, to bootstrap crawl paths for "Discovered – never crawled" pages
  - **Indexation note (2026-06-08):** GSC Coverage showed 24 pages "Discovered – currently not indexed" with last-crawl `1970-01-01` (never crawled by Googlebot) — young-domain crawl-priority issue, not a content/technical fault (2 pages indexed fine, all pass technical audit). On-site levers done: landing-page content ~2× (`src/lib/seo-pages.ts`), sitewide footer links (`Footer.tsx`), homepage contextual links + WebApplication/FAQPage JSON-LD (`HomeSeoIntro.tsx`, `[lang]/page.tsx`), stable sitemap `lastmod` (`sitemap.ts`). Remaining levers are external: manual GSC "Request indexing", backlinks, Google's crawl/rank time.
  - **GSC P0 ТЗ status (2026-07-17, based on `/es/firmar-pdf-sin-registro` hreflang-404 defect):** ✅ Closed 2026-09-02. PR #1 merged — fixed language-switcher hreflang bug (`Header.tsx` + `generateMetadata()` in `[slug]/page.tsx` now use `getAlternateSlug()` instead of naive `/es`→`/pt` replace) and turned the page into an action landing page (CTA above the fold + 2 inline CTA blocks). Remaining tail closed 2026-09-02, verified with Hermes/Clavito (`ask-clavito-seo`) and live in production: (1) `SeoPageData.sections[].links?: {text, slug}[]` (`seo-pages.ts`) + inline-link rendering in `SeoContent.tsx` — 3 ES contextual links to `firmar-pdf-sin-registro` (anchors "sin cuenta"/"sin registro"/"sin email", from `firmar-pdf-online-gratis`/`anadir-firma-a-pdf`/`crear-firma-online`) and 3 PT to `assinar-pdf-sem-cadastro` (anchors "sem conta"/"sem cadastro"/"sem e-mail"); `firmar-pdf-sin-marca-de-agua`/`assinar-pdf-sem-marca-dagua` already had card-grid links (that part of the ТЗ note was stale). (2) CTA blocks added to `firmar-pdf-sin-imprimir`, `firmar-pdf-privado-sin-subir-archivos`, `assinar-pdf-sem-imprimir`, `assinar-pdf-privado-sem-upload`. (3) GA4/Consent Mode v2 (ТЗ §3.5): GA4 firing **confirmed live** via real-browser check (`dev-browser` against `https://firmalo.io/es/`) — `gtag` defined, `dataLayer` populated, an actual `page_view` hit went to `region1.google-analytics.com/g/collect` with `G-C5ZMVHWP4Z`. The ТЗ's original "GA4 not detected" finding was a curl-based false negative (confirms the `lazyOnload` blind spot noted below). **Consent Mode v2 / cookie banner deliberately deferred** (Kirill's call, 2026-09-02) — not a priority for LATAM traffic even though the ES segment nominally includes Spain/EU; revisit if EU traffic share or legal risk changes.
