# Firmalo progress

## 2026-06-30

- Recalled previous SEO/indexation plan and current GSC state for `firmalo.io`.
- Kept the local `robots.ts` fix: Google must not be blocked from `/_next/` CSS/JS assets.
- Added shared structured data helper: `src/lib/structured-data.ts`.
- Replaced duplicated WebApplication JSON-LD on home/SEO pages with richer SoftwareApplication/WebApplication JSON-LD.
- Added visible `TrustFacts` block for extractable product facts: free, no signup, no watermark, local browser processing, mobile/desktop, ES/PT.
- Added `ComparisonTable` rendering and comparison data for SmallPDF/DocuSign alternative pages.
- Added static `public/llms.txt` with product facts, sitemap, and key ES/PT URLs.
- Updated sitemap content date to `2026-06-30` because landing-page content changed.
- Created `STATUS.md` for current state and manual next steps.

## 2026-06-29

- SEO/indexation audit identified no fatal `noindex`/canonical/sitemap issue.
- Main diagnosis: young low-authority domain with weak external crawl paths; most pages are discovered but not crawled/indexed.
- Found concrete technical issue: live `robots.txt` blocked `/_next/` assets.
- Local fixes prepared: robots asset access, ESLint cleanup, React warning cleanup.
- Audit saved as `2026-06-29_seo-audit-indexation.md`.
