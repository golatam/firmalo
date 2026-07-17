# Firmalo SEO/indexation audit — 2026-06-29

## Summary

Current technical indexability is mostly healthy: production pages return 200, have canonical URLs, meta robots `index, follow`, hreflang, HTML content, JSON-LD, and sitemap coverage.

The indexation bottleneck is primarily **crawl priority / authority for a young low-link domain**, not a hard `noindex`/404/canonical bug. One real technical issue was found and fixed locally: `robots.txt` blocked `/_next/`, which can prevent Google from fetching Next.js JS/CSS assets for rendering.

## Evidence checked

- Repository: `golatam/firmalo`, local path `/data/projects/firmalo`.
- Production domain: `https://firmalo.io`.
- Production `robots.txt`: 200, sitemap declared, but currently contains `Disallow: /_next/` in live deploy.
- Production `sitemap.xml`: 200, 28 URLs.
- Production sample pages checked:
  - `/es`
  - `/pt`
  - `/es/firmar-pdf-online-gratis`
  - `/es/firmar-pdf-sin-registro`
  - `/es/firmar-pdf-sin-marca-de-agua`
  - `/pt/assinar-pdf-sem-marca-dagua`
- All sampled pages return 200, canonical self-reference, `index, follow`, hreflang, H1, internal links, JSON-LD.
- Local build: `npm run build` passes, generates 34 static routes.
- Local lint after cleanup: `npm run lint` exits 0 with 7 warnings.

## GSC snapshot diagnosis

Latest available snapshot: `seo-tracking/snapshots/2026-06-22.json`.

Index-status trend:

| Date | Submitted/indexed | Discovered not indexed | Crawled not indexed | Unknown to Google |
|---|---:|---:|---:|---:|
| 2026-04-20 | 0 | 0 | 0 | 20 |
| 2026-05-20 | 2 | 18 | 0 | 0 |
| 2026-06-08 | 2 | 16 | 0 | 2 |
| 2026-06-15 | 1 | 14 | 1 | 4 |
| 2026-06-22 | 1 | 12 | 1 | 6 |

Latest URL-level state:

- Indexed SEO page: `/pt/assinar-pdf-sem-marca-dagua`.
- Crawled but not indexed: `/es/firmar-pdf-sin-marca-de-agua`.
- Most other SEO pages: `Discovered - currently not indexed` or `URL is unknown to Google`.
- Search performance exists mainly for `/es/` and `/pt/`, positions around 42–61 for core terms.

Interpretation: Google knows some URLs but is not spending crawl/index budget broadly. This matches a young-domain + low-authority pattern.

## Critical issue fixed locally

### `robots.txt` blocked Next.js assets

Before:

```txt
Disallow: /api/
Disallow: /_next/
```

After local change in `src/app/robots.ts`:

```ts
disallow: ["/api/"]
```

Why it matters: Google explicitly needs access to JS/CSS/images to render pages. The SEO text is server-rendered, so this is not the only cause, but blocking `/_next/` is still a bad crawl/render signal and should be deployed.

## Other fixes made while verifying

- `eslint.config.mjs`: excluded bundled `public/pdf.worker.min.mjs` from lint, because vendored minified worker was polluting ESLint output with thousands of irrelevant warnings/errors.
- `src/components/DropZone.tsx`: fixed missing hook dependency and unused prop.
- `src/components/HomeSeoIntro.tsx`: escaped Portuguese apostrophe for JSX lint.

## On-page / schema audit

Good:

- 20 SEO landing pages exist: 10 ES + 10 PT.
- Pages are SSG via `generateStaticParams` and `dynamicParams = false`.
- Metadata per page includes title, description, canonical, hreflang, OG.
- Home pages have WebApplication + FAQPage JSON-LD.
- SEO pages have WebApplication + BreadcrumbList + FAQPage JSON-LD.
- Footer links all SEO pages sitewide.
- Sitemap includes home, SEO pages, and legal/contact pages.
- `lastmod` is stable, not `new Date()` per request.

Risks / improvements:

1. **Authority/entity is thin.** Brand has minimal external corroboration. Add Organization/SoftwareApplication schema with `sameAs` only after real profiles/listings exist.
2. **Legal/contact pages are indexed in sitemap.** This is acceptable, but they are low-value. Keep if they build trust; do not expect them to help keyword indexing.
3. **Content overlap.** Several pages are close variants around “free/no signup/no watermark”. This is fine for long-tail, but Google may choose only a few until authority grows.
4. **No visible proof/reviews/usage signals.** Add trust blocks: “100% in-browser”, “no upload”, supported devices, maybe a lightweight comparison table vs SmallPDF/DocuSign.

## Backlink / authority audit

No paid backlink database was available in this run. Existing project plan is correct: prioritize 3–5 real topical references instead of many weak links.

Highest ROI targets:

1. AlternativeTo — list as SmallPDF/DocuSign alternative.
2. Product Hunt — launch angle: free/private/client-side PDF signing for LATAM.
3. SaaSHub / free tool directories — PDF tools / e-signature category.
4. G2/Capterra free listing if accepted.
5. Contextual LATAM mentions: Reddit/Quora/forum answers only where the tool directly solves “firmar PDF gratis / assinar PDF gratis”.

Goal: external crawl paths to `/es`, `/pt`, and top SEO pages. This should move URLs from `Discovered` to real crawl dates.

## GEO/AIEO audit

Current pages are extractable: clear H1, FAQ, direct answers, JSON-LD. Missing AI-citation signals are mostly authority/entity-side:

- Add `/llms.txt` only as a navigation aid, not as a ranking trick.
- Add concise “What is Firmalo?” and “How it works” answer blocks.
- Add visible product facts: free, no signup, no watermark, files never leave device, ES/PT support.
- Add external profiles/listings, then mirror them in Organization/SoftwareApplication schema.

## Priority plan

### P0 — deploy now

1. Deploy `robots.ts` fix so live `robots.txt` no longer blocks `/_next/`.
2. In GSC after deploy: request validation / recrawl for `robots.txt`, `/sitemap.xml`, `/es/firmar-pdf-online-gratis`, `/pt/assinar-pdf-online-gratis`.
3. Submit sitemap again if OAuth scope allows; otherwise manual in GSC.

### P1 — this week

1. Execute backlink-plan first 3 placements: AlternativeTo, Product Hunt, SaaSHub/tool directory.
2. Add 1–2 real external profile URLs, then add `sameAs` to schema.
3. Request indexing manually for 5 pages, not all 28 at once:
   - `/es/firmar-pdf-online-gratis`
   - `/pt/assinar-pdf-online-gratis`
   - `/es/firmar-pdf-sin-registro`
   - `/pt/assinar-pdf-sem-cadastro`
   - `/es/alternativa-smallpdf-firmar-pdf`

### P2 — implemented locally on 2026-06-30

1. Added visible trust/product-facts block to home and SEO pages: free, no signup, no watermark, browser-local processing, mobile/desktop, ES/PT.
2. Added comparison tables to SmallPDF/DocuSign alternative pages.
3. Added shared `SoftwareApplication`/`WebApplication` JSON-LD with `applicationCategory`, `operatingSystem`, `offers`, `inLanguage`, `availableLanguage`, `isAccessibleForFree`, and `featureList`.
4. Added `/llms.txt` pointing to main ES/PT pages, sitemap, and product facts.
5. Updated sitemap `lastmod` for SEO pages to `2026-06-30` because the landing-page content changed.

## Verification output

- `npm ci`: success, 376 packages installed; npm reports 5 vulnerabilities (1 low, 3 moderate, 1 high).
- `npm run lint`: success with 7 warnings.
- `npm run build`: success; 34 static routes generated.
- `npm run seo:report`: latest trend shows average position 55.2 → 54.3, mostly `/es/` and `/pt/` ranking data.
- 2026-06-30 local server check: `/robots.txt` has no `Disallow: /_next/`; `/llms.txt` returns the new product facts; `/sitemap.xml` has `lastmod` 2026-06-30; alternative pages contain `SoftwareApplication`, `featureList`, trust facts, and comparison table.
- 2026-06-30 live check before deploy: production still has old `Disallow: /_next/`, old sitemap `lastmod` 2026-06-08, and `/llms.txt` returns 500. Deploy is still required.

## Bottom line

There is no evidence that only 3 pages index because of a single fatal SEO bug. The main issue is crawl/index priority. I fixed the one concrete technical blocker (`/_next/` disallow) locally; after deploy the next lever is external authority/crawl paths plus targeted GSC requests.
