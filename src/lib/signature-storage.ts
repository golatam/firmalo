const KEY = "firmalo:savedSignature";

/** Persist the last-used signature locally so the user doesn't redraw it every visit. No account, no server — stays on this device. */
export function saveSignature(dataUrl: string) {
  try {
    localStorage.setItem(KEY, dataUrl);
  } catch {
    // Private browsing / storage disabled — not a hard failure, just skip caching.
  }
}

export function getSavedSignature(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearSavedSignature() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
