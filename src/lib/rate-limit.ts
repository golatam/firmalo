const STORAGE_KEY = "firmalo_exports";
const MAX_EXPORTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getTimestamps(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

function pruneOld(timestamps: number[]): number[] {
  const cutoff = Date.now() - WINDOW_MS;
  return timestamps.filter((t) => t > cutoff);
}

/** Returns remaining exports in the current window, or 0 if limit reached */
export function exportsRemaining(): number {
  const recent = pruneOld(getTimestamps());
  return Math.max(0, MAX_EXPORTS - recent.length);
}

/** Record an export. Returns false if rate-limited. */
export function recordExport(): boolean {
  const recent = pruneOld(getTimestamps());
  if (recent.length >= MAX_EXPORTS) return false;
  recent.push(Date.now());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  } catch {
    // storage full — allow the export anyway
  }
  return true;
}

/** Minutes until the oldest export in the window expires */
export function minutesUntilReset(): number {
  const recent = pruneOld(getTimestamps());
  if (recent.length === 0) return 0;
  const oldest = Math.min(...recent);
  const resetAt = oldest + WINDOW_MS;
  return Math.max(1, Math.ceil((resetAt - Date.now()) / 60_000));
}
