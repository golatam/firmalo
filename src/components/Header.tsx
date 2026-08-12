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

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();

  function getLocalizedPath(targetLang: Locale) {
    if (targetLang === lang) return pathname;

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
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavItem href={`/${lang}`} pathname={pathname} className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">✍️ Firmalo</span>
        </NavItem>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm">
            {locales.map((locale) => (
              <NavItem
                key={locale}
                href={getLocalizedPath(locale)}
                pathname={pathname}
                className={`px-2 py-1 min-h-[44px] flex items-center rounded-md transition-colors ${
                  locale === lang
                    ? "bg-primary text-white font-medium"
                    : "text-text-secondary hover:bg-primary-light"
                }`}
              >
                {localeFlags[locale]} <span className="hidden sm:inline ml-1">{localeNames[locale]}</span>
              </NavItem>
            ))}
          </div>

          {/* CTA button */}
          <NavItem
            href={`/${lang}`}
            pathname={pathname}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            {dict.header.cta}
          </NavItem>
        </div>
      </div>
    </header>
  );
}
