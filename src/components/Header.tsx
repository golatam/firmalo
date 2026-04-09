"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();

  function getLocalizedPath(targetLang: Locale) {
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">✍️ Firmalo</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={getLocalizedPath(locale)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  locale === lang
                    ? "bg-primary text-white font-medium"
                    : "text-text-secondary hover:bg-primary-light"
                }`}
              >
                {localeFlags[locale]} {localeNames[locale]}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <Link
            href={`/${lang}`}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            {dict.header.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
