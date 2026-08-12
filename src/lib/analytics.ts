declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number>;

function deviceCategory(): string {
  if (typeof window === "undefined") return "unknown";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

/** Fire a GA4 product event. No-ops if gtag hasn't loaded yet (lazyOnload). */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    device_category: deviceCategory(),
    source_page: window.location.pathname,
    ...params,
  });
}

/** Coarse size bucket — never send the exact byte count or file name. */
export function fileSizeBucket(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return "<1MB";
  if (mb < 5) return "1-5MB";
  if (mb < 20) return "5-20MB";
  return ">20MB";
}
