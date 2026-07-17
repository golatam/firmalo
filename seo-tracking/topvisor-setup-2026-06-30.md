# Firmalo Topvisor setup — 2026-06-30

## Project

- Topvisor project: `Firmalo`
- URL: `firmalo.app`
- Project ID: `29516939`
- Keywords imported: `80`
- Import groups: `17`

## Tracking split

- `rank-tracker-import-2026-06-30.csv` — trimmed KPI set for active tracking.
- `semantic-core-backlog-2026-06-30.csv` — backlog, not rejected keywords.
- Backlog returns to tracking after 1–2 weekly snapshots show demand/positions/CTR opportunities.

## Searchers / regions

Added Google desktop, depth `1` (Top 10). Checker was **not** launched.

Regions:

| Country | Code | Lang | Topvisor region index |
|---|---:|---:|---:|
| Spain | ES | es | 1348 |
| Brazil | BR | pt | 667703 |
| Mexico | MX | es | 6690 |
| Colombia | CO | es | 6735 |
| Argentina | AR | es | 6727 |
| Chile | CL | es | 6731 |
| Peru | PE | es | 6733 |
| Paraguay | PY | es | 6732 |
| Uruguay | UY | es | 6737 |
| Ecuador | EC | es | 6730 |
| Bolivia | BO | es | 6729 |
| Dominican Republic | DO | es | 669005 |
| Costa Rica | CR | es | 675796 |
| Panama | PA | es | 709588 |
| Guatemala | GT | es | 709587 |
| El Salvador | SV | es | 709585 |
| Honduras | HN | es | 709586 |
| Nicaragua | NI | es | 6736 |
| Venezuela | VE | es | 6734 |

## Cost guardrail

Do not call `edit/positions_2/checker/go` without explicit approval: that starts paid position checks.
