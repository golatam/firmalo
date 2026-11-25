"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getSeoPage, getAlternateSlug } from "@/lib/seo-pages";

// A Link to the page the user is already on still runs Next's client-side
// transition (new RSC payload, new `dict` reference) even with
// preventDefault on the click — it doesn't just no-op. On the homepage that
// retriggers PdfViewer's load effect mid-session and can crash it (race on
// pdf.js's page.render() against the in-flight one). Render a plain
// scroll-to-top button instead of a Link whenever the target is the current
// URL, so no navigation is attempted at all.
function NavItem({
  href,
  pathname,
  className,
  children,
}: {
  href: string;
  pathname: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href === pathname) {
    return (
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Shared look for every control in the header: same height (44px tap target),
// radius, text size, padding and hover/focus-visible/active states.
const NAV_BASE =
  "inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const NAV_FILLED = `${NAV_BASE} bg-primary text-white hover:bg-primary-hover active:bg-primary-dark`;
const NAV_GHOST = `${NAV_BASE} text-text-secondary hover:bg-primary-light hover:text-primary active:bg-border`;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();

  function getLocalizedPath(targetLang: Locale) {
    if (targetLang === lang) return pathname;

    // /blog has no per-language twin: send the switcher to the target home page.
    if (pathname === "/blog" || pathname.startsWith("/blog/")) return `/${targetLang}`;

    const segments = pathname.split("/");
    const slug = segments[2];

    // SEO landing pages ([lang]/[slug]) have distinct per-language slugs —
    // never assume the target-language slug is the same string, or the
    // switch links to a 404 (e.g. /es/firmar-pdf-sin-registro has no
    // /pt/firmar-pdf-sin-registro; the real pair is /pt/assinar-pdf-sem-cadastro).
    if (slug && getSeoPage(lang, slug)) {
      const alternate = getAlternateSlug(lang, slug);
      return alternate ? `/${alternate.lang}/${alternate.slug}` : `/${targetLang}`;
    }

    segments[1] = targetLang;
    return segments.join("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <NavItem href={`/${lang}`} pathname={pathname} className="inline-flex shrink-0 items-center min-h-[44px] rounded-lg whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <span className="text-xl font-bold text-primary">✍️ Firmalo</span>
        </NavItem>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {locales.map((locale) => (
              <NavItem
                key={locale}
                href={getLocalizedPath(locale)}
                pathname={pathname}
                className={locale === lang ? NAV_FILLED : NAV_GHOST}
              >
                {localeFlags[locale]} <span className="hidden sm:inline">{localeNames[locale]}</span>
              </NavItem>
            ))}
          </div>

          <NavItem
            href="/blog"
            pathname={pathname}
            className={NAV_GHOST}
          >
            {dict.header.blog}
          </NavItem>

          {/* CTA button */}
          <NavItem
            href={`/${lang}`}
            pathname={pathname}
            className={`max-sm:hidden ${NAV_FILLED}`}
          >
            {dict.header.cta}
          </NavItem>
        </div>
      </div>
    </header>
  );
}
