import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const WWW_HOST = "www.firmalo.io";
const APEX_HOST = "firmalo.io";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonicalize www -> apex first, before locale logic, so a www request
  // never gets a second redirect stacked on top (single 308, any path).
  // www.firmalo.io currently serves full 200 responses directly (only
  // saved from duplicate indexing by canonical tags) — this is the actual
  // fix for that, not just a redirect-chain nitpick.
  const host = request.headers.get("host");
  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = APEX_HOST;
    url.port = "";
    return NextResponse.redirect(url, { status: 308 });
  }

  // The blog lives at /blog/{slug} without a locale segment (SEO Factory URL template).
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return;

  // Check if path already starts with a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (hasLocale) return;

  // Skip static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const preferred = pickLocale(request.headers.get("accept-language") || "");

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;

  // The root redirect depends on the visitor's language, so it must be
  // temporary and uncacheable: a cached 308 "/" -> "/pt" would stick in the
  // browser and keep sending a visitor to Portuguese for good.
  if (pathname === "/") {
    const res = NextResponse.redirect(url, { status: 307 });
    res.headers.set("Cache-Control", "no-store");
    res.headers.append("Vary", "Accept-Language");
    return res;
  }

  // Other locale-less paths (old URLs): 308 = permanent, so Google caches the
  // redirect and stops re-crawling the source URL.
  const res = NextResponse.redirect(url, { status: 308 });
  res.headers.append("Vary", "Accept-Language");
  return res;
}

// Pick the supported language with the highest q-weight from Accept-Language;
// fall back to the default. (A plain includes("pt") matched "pt;q=0.1" too.)
function pickLocale(header: string): Locale {
  let best: Locale = defaultLocale;
  let bestQ = -1;
  for (const part of header.split(",")) {
    const [tag, ...params] = part.trim().split(";");
    const primary = tag.trim().toLowerCase().split("-")[0];
    const locale = locales.find((l) => l === primary);
    if (!locale) continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1;
    // Strictly greater: on a tie the earlier-listed language wins.
    if (!Number.isNaN(q) && q > bestQ) {
      best = locale;
      bestQ = q;
    }
  }
  return best;
}

export const config = {
  // Only _next build assets are excluded — the www->apex host check above
  // must run on robots.txt/sitemap.xml/favicon.ico too, not just page
  // routes; the locale logic below still skips those via pathname checks.
  matcher: ["/((?!_next).*)"],
};
