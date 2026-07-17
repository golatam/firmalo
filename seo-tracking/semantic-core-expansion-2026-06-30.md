# Firmalo semantic core expansion — 2026-06-30

## Verdict

Старое ядро расширено как draft: не перетирал production `seo-tracking/semantic-core.json`. Главный рост — не в ещё большем количестве общих `firmar pdf`, а в low/mid-tail страницах: `sin imprimir`, privacy/no-upload, use-case documents, competitor alternatives.

## Files

- JSON draft: `seo-tracking/semantic-core.expanded-2026-06-30.json`
- CSV flat: `seo-tracking/semantic-core.expanded-2026-06-30.csv`

## Counts

- Pages: 36 total = 20 existing expanded + 16 candidate new pages
- Keywords: 263 total; 61 existing tracked; 111 high-priority
- By category: competitor: 46, core: 68, feature: 83, legal-info: 8, privacy: 10, usecase: 48

## Evidence used

- GSC: бренд `firmalo` уже даёт клики; non-brand есть, но позиции в основном 40–70. Быстрые победы — long-tail страницы и CTR/indexation.
- Existing tracker: 61 keyword, 0 TOP-10, 6 TOP-100; core ES/PT улучшается, но страдает от широких SERPов.
- SERP samples: ES выдача забита iLovePDF, Smallpdf, PDF24, Adobe, HavenPDF, CreateMySignature, MaxAI; PT — TextInPDF, PDF7, LuraPDF, PDFGenie, DuneTools, PDFGem.

## Priority implementation waves

### Wave 1 — максимум шансов на переходы без большого контента
- `/es/firmar-pdf-sin-imprimir` — Firmar PDF sin imprimir; primary: `firmar pdf sin imprimir`; why: SERP/web evidence shows “sin imprimir” as explicit pain; direct conversion intent.
- `/pt/assinar-pdf-sem-imprimir` — Assinar PDF sem imprimir; primary: `assinar pdf sem imprimir`; why: Same pain in PT-BR: no printer/scanner, mobile signing.
- `/es/firmar-pdf-privado-sin-subir-archivos` — Firmar PDF privado sin subir archivos; primary: `firmar pdf sin subir archivos`; why: Firmalo has strong differentiator: local browser processing. Useful against cloud competitors and AI snippets.
- `/pt/assinar-pdf-privado-sem-upload` — Assinar PDF privado sem upload; primary: `assinar pdf sem upload`; why: PT SERP competitors use “sem upload”; make it an owned privacy page.
- `/es/firmar-contrato-trabajo-pdf` — Firmar contrato de trabajo PDF; primary: `firmar contrato de trabajo pdf`; why: High-intent contract use case; natural sibling of rental page.
- `/pt/assinar-contrato-trabalho-pdf` — Assinar contrato de trabalho PDF; primary: `assinar contrato de trabalho pdf`; why: Brazil high-intent employment contract use case.
- `/es/firmar-autorizacion-pdf` — Firmar autorización PDF; primary: `firmar autorización pdf`; why: Everyday doc type; likely low competition and conversion-friendly.
- `/pt/assinar-autorizacao-pdf` — Assinar autorização PDF; primary: `assinar autorização pdf`; why: Everyday doc type in PT-BR.

### Wave 2 — commercial competitor pages
- `/es/alternativa-ilovepdf-firmar-pdf` — Alternativa a iLovePDF para firmar PDF; primary: `alternativa a ilovepdf para firmar pdf`
- `/pt/alternativa-ilovepdf-assinar-pdf` — Alternativa ao iLovePDF para assinar PDF; primary: `alternativa ao ilovepdf para assinar pdf`
- `/es/alternativa-adobe-acrobat-firmar-pdf` — Alternativa a Adobe Acrobat para firmar PDF; primary: `alternativa a adobe acrobat para firmar pdf`
- `/pt/alternativa-adobe-acrobat-assinar-pdf` — Alternativa ao Adobe Acrobat para assinar PDF; primary: `alternativa ao adobe acrobat para assinar pdf`
- `/es/alternativa-pdf24-firmar-pdf` — Alternativa a PDF24 para firmar PDF; primary: `alternativa a pdf24 para firmar pdf`
- `/pt/alternativa-pdf24-assinar-pdf` — Alternativa ao PDF24 para assinar PDF; primary: `alternativa ao pdf24 para assinar pdf`

### Wave 3 — authority / AI-answer hubs
- `/es/firma-electronica-simple` — Firma electrónica simple: qué es y cuándo sirve; primary: `firma electrónica simple`
- `/pt/assinatura-eletronica-simples` — Assinatura eletrônica simples: o que é e quando serve; primary: `assinatura eletrônica simples`

## Existing page refresh notes

- `/es` and `/pt` homepage currently receive broad GSC impressions; keep homepage as broad converter, but push exact-match long-tail to landing pages through internal links.
- Add exact variants with accents and local wording: `añadir/agregar/insertar/poner`, `gratis/grátis`, `sin marca de agua/sem marca d’água`, `sin imprimir/sem imprimir`.
- Competitor pages should be honest comparison tables: no fake claims, focus on no signup/no watermark/no upload/browser-local.

## Cannibalization guard

Exact duplicates removed in the draft: `sin subir archivos` owned by privacy page, `sin imprimir/sem imprimir` owned by no-print pages, language-neutral competitor keywords owned by ES pages unless PT wording includes `ao`.

## Tracking policy

- Do not track all expanded keywords weekly immediately; pick 80–100 max: all high-priority + one medium per candidate page.
- Keep production `semantic-core.json` unchanged until URL list and first implementation wave are accepted.

## Top 25 tracking additions
- firmar pdf → `/es/firmar-pdf-online-gratis` (core)
- firmar pdf gratis online → `/es/firmar-pdf-online-gratis` (core)
- firma pdf gratis → `/es/firmar-pdf-online-gratis` (core)
- firmador de pdf gratis → `/es/firmar-pdf-online-gratis` (core)
- firmador pdf online → `/es/firmar-pdf-online-gratis` (core)
- firmar documento online gratis → `/es/firmar-pdf-online-gratis` (core)
- firmar documento pdf online gratis → `/es/firmar-pdf-online-gratis` (core)
- firmar pdf sin cuenta → `/es/firmar-pdf-sin-registro` (core)
- firmar documento sin registro → `/es/firmar-pdf-sin-registro` (core)
- firma pdf sin marca de agua gratis → `/es/firmar-pdf-sin-marca-de-agua` (core)
- añadir firma a pdf → `/es/anadir-firma-a-pdf` (feature)
- agregar firma a pdf → `/es/anadir-firma-a-pdf` (feature)
- insertar firma en pdf → `/es/anadir-firma-a-pdf` (feature)
- poner firma en un pdf → `/es/anadir-firma-a-pdf` (feature)
- como poner firma en pdf → `/es/anadir-firma-a-pdf` (feature)
- crear firma digital online gratis → `/es/crear-firma-online` (feature)
- hacer firma digital online gratis → `/es/crear-firma-online` (feature)
- firmar pdf en iphone → `/es/firmar-pdf-desde-celular` (feature)
- firmar pdf en android → `/es/firmar-pdf-desde-celular` (feature)
- firmar documento desde celular → `/es/firmar-pdf-desde-celular` (feature)
- firmar pdf sin app → `/es/firmar-pdf-desde-celular` (feature)
- firmar contrato de alquiler pdf → `/es/firmar-contrato-alquiler-pdf` (usecase)
- firmar contrato de arriendo pdf → `/es/firmar-contrato-alquiler-pdf` (usecase)
- firmar contrato arrendamiento pdf → `/es/firmar-contrato-alquiler-pdf` (usecase)
- alternativa a smallpdf para firmar pdf → `/es/alternativa-smallpdf-firmar-pdf` (competitor)
