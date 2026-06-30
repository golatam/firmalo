# Firmalo status

Last updated: 2026-06-30

## Current state

- Production domain: `https://firmalo.io`.
- App: Next.js 16 App Router, SSG, ES/PT pages for browser-side PDF signing.
- Core product flow works locally: upload PDF → create signature → place signature → export signed PDF in browser.
- SEO landing pages: 20 commercial/long-tail pages (10 ES + 10 PT), plus home/legal/contact pages.
- GSC sees the site, but broad indexing is still weak: June 2026 performance is mostly `/es`, `/pt`, and one ES long-tail page.

## Done locally

- `robots.txt` source no longer blocks `/_next/`; only `/api/` remains disallowed.
- Lint cleanup for vendored PDF worker and small React warnings.
- Shared SoftwareApplication/WebApplication JSON-LD helper for home + SEO pages.
- Visible trust/product-facts block on home + SEO pages.
- Comparison tables for SmallPDF/DocuSign alternative pages.
- Static `/llms.txt` with product facts and priority ES/PT URLs.
- SEO audit recorded in `2026-06-29_seo-audit-indexation.md`.

## Verification target

Before release, run:

```bash
npm run lint
npm run build
npm run seo:report
```

After deploy, verify:

```bash
curl -s https://firmalo.io/robots.txt
curl -s https://firmalo.io/llms.txt
curl -s https://firmalo.io/sitemap.xml
```

## External/manual remaining work

- Deploy current code to the real Firmalo Railway project (`firmalo`, workspace `Go Latam`). Do not deploy while Railway CLI points to Hermes.
- In GSC URL Inspection, manually request indexing for priority URLs:
  - `https://firmalo.io/es/firmar-pdf-online-gratis`
  - `https://firmalo.io/pt/assinar-pdf-online-gratis`
  - `https://firmalo.io/es/firmar-pdf-sin-registro`
  - `https://firmalo.io/pt/assinar-pdf-sem-cadastro`
  - `https://firmalo.io/es/alternativa-smallpdf-firmar-pdf`
- Create first external crawl paths/listings: AlternativeTo, Product Hunt, SaaSHub/free tool directory.
- Add `sameAs` schema only after real public profiles/listings exist.
