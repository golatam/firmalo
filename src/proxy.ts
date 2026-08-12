import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

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

  // Detect preferred language from Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.includes("pt") ? "pt" : defaultLocale;

  // Redirect to localized path (308 = permanent, so Google caches the redirect
  // and stops re-crawling the source URL)
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname}`;
  return NextResponse.redirect(url, { status: 308 });
}

export const config = {
  // Only _next build assets are excluded — the www->apex host check above
  // must run on robots.txt/sitemap.xml/favicon.ico too, not just page
  // routes; the locale logic below still skips those via pathname checks.
  matcher: ["/((?!_next).*)"],
};
