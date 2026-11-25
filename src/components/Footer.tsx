import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getSeoPagesByLang } from "@/lib/seo-pages";

const FOOT_LINK =
  "inline-flex items-center min-h-[44px] px-1 rounded hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const seoPages = getSeoPagesByLang(lang);
  const guidesTitle =
    lang === "es" ? "Guías para firmar PDF" : "Guias para assinar PDF";

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {seoPages.length > 0 && (
          <nav
            aria-label={guidesTitle}
            className="pb-8 mb-6 border-b border-border"
          >
            <h2 className="text-sm font-semibold text-text">{guidesTitle}</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {seoPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${lang}/${page.slug}`}
                    className="inline-block py-1 text-sm text-text-secondary hover:text-primary transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {page.heroTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">✍️ Firmalo</span>
            <span className="text-sm text-text-muted">
              — {dict.footer.tagline}
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-text-secondary">
            <Link href="/blog" className={FOOT_LINK}>
              {dict.footer.blog}
            </Link>
            <Link
              href={`/${lang}/privacidad`}
              className={FOOT_LINK}
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={`/${lang}/terminos`}
              className={FOOT_LINK}
            >
              {dict.footer.terms}
            </Link>
            <Link
              href={`/${lang}/contacto`}
              className={FOOT_LINK}
            >
              {dict.footer.contact}
            </Link>
          </nav>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          {dict.footer.copyright.replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}
