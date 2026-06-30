# Firmalo tracking vs backlog — 2026-06-30

## Verdict

Делаем как в Go Latam: `semantic-core` — это полная карта спроса и SEO backlog, а rank tracker — отдельный trimmed/high-signal набор. Backlog keywords не удаляются и не считаются потерянными: к этому документу и backlog CSV нужно возвращаться после первых съёмов позиций и при планировании новых волн страниц.

## Source artifacts

- Full draft core: `seo-tracking/semantic-core.expanded-2026-06-30.json`
- Full draft CSV: `seo-tracking/semantic-core.expanded-2026-06-30.csv`
- Expansion report: `seo-tracking/semantic-core-expansion-2026-06-30.md`
- Recommended tracker import: `seo-tracking/rank-tracker-import-2026-06-30.csv`
- Backlog keywords: `seo-tracking/semantic-core-backlog-2026-06-30.csv`

## Counts

- Pages in full draft core: `36`
- Keywords in full draft core: `263`
- Recommended tracking keywords: `80`
- Backlog keywords kept for future work: `183`
- Wave 1 pages: `8`

## Policy: core vs tracker

- `semantic-core.expanded-2026-06-30.json` / future `semantic-core.json` = полная карта спроса: copy guidance, H2/H3, FAQ, internal linking, content briefs, будущие страницы.
- `rank-tracker-import-2026-06-30.csv` = чистый набор для мониторинга: existing baseline + Wave 1 high-intent + маленькая выборка commercial Wave 2.
- `semantic-core-backlog-2026-06-30.csv` = не мусор и не rejected list. Это очередь возврата: long-tail, variants, future waves, copy/FAQ/internal-link hints.
- Не импортируем весь core в rank tracker: это создаёт шум, расход и ложные KPI.
- Не удаляем backlog keywords из core только потому, что они не трекаются сейчас.

## Current tracking set criteria

1. Preserve existing `tracked: true` baseline from the current core.
2. Add high-priority Wave 1 keywords for newly published pages:
   - `/es/firmar-pdf-sin-imprimir`
   - `/pt/assinar-pdf-sem-imprimir`
   - `/es/firmar-pdf-privado-sin-subir-archivos`
   - `/pt/assinar-pdf-privado-sem-upload`
   - `/es/firmar-contrato-trabajo-pdf`
   - `/pt/assinar-contrato-trabalho-pdf`
   - `/es/firmar-autorizacion-pdf`
   - `/pt/assinar-autorizacao-pdf`
3. Add only representative commercial samples from Wave 2 competitor pages, not every variant.
4. Keep broad head terms like `firmar pdf` / `assinar pdf` in the core, but do not treat them as the main early KPI.

## Backlog return loop

After 1–2 weekly position snapshots:

1. Open this file first, then `semantic-core-backlog-2026-06-30.csv`.
2. Check actual ranking URLs from GSC/rank tracker.
3. Promote backlog keywords when:
   - a new page starts ranking without being tracked;
   - impressions appear in GSC for a backlog phrase;
   - a Wave 2/3 page is published;
   - SERP confirms a better canonical target than the current mapping.
4. If a backlog keyword is promoted, update the core and create a new dated tracker import file. Do not overwrite this historical file.

## Deferred waves

- Wave 2: competitor/comparison pages (`iLovePDF`, `Adobe Acrobat`, `PDF24`) — commercial intent, should be published after Wave 1 has indexation/baseline.
- Wave 3: authority / AI-search pages (`firma electrónica simple`, `assinatura eletrônica simples`) — useful for citations and topical authority, not first tracking priority.

## Anti-cannibalization rule

Every keyword has one canonical target. If two pages can answer the same query, keep one in tracking and leave the other variant in backlog until GSC/ranking URL data says otherwise.
