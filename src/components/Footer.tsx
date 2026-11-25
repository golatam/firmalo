import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { locales, localeNames } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getSeoPagesByLang } from "@/lib/seo-pages";
import { TOOLS, toolHref } from "@/lib/tools";
import { LogoMark } from "./ToolIcon";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const FOOT_LINK = `inline-flex items-center min-h-[44px] rounded text-[15px] text-slate-700 hover:text-primary transition-colors ${FOCUS}`;
const H4 = "text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary mb-2";

// The "Guías y blog" column shows a stable handful of the most useful SEO landing
// pages (sin registro / sin marca de agua / añadir firma / crear firma, or PT twins).
// The full list of landing pages stays linked sitewide in the block below the
// columns: those footer links are a deliberate indexation lever (see CLAUDE.md).
const GUIDE_INDEXES = [1, 2, 3, 4];

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const seoPages = getSeoPagesByLang(lang);
  const guides = GUIDE_INDEXES.map((i) => seoPages[i]).filter(Boolean);
  const homeHref = `/${lang}`;
  const soonTools = TOOLS.filter((t) => !toolHref(t, lang));

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Link href={homeHref} className={`inline-flex items-center gap-2.5 min-h-[44px] rounded-lg text-xl font-bold text-primary-dark ${FOCUS}`}>
              <LogoMark />
              {dict.header.logo}
            </Link>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-slate-600">{dict.footer.product}</p>
            <Link
              href={homeHref}
              className={`mt-4 inline-flex items-center justify-center min-h-[48px] w-full sm:w-auto px-5 rounded-xl bg-primary text-white text-base font-semibold hover:bg-primary-hover transition-colors ${FOCUS}`}
            >
              {dict.header.cta}
            </Link>
          </div>

          <nav aria-label={dict.footer.toolsTitle}>
            <h2 className={H4}>{dict.footer.toolsTitle}</h2>
            <ul>
              {TOOLS.filter((t) => toolHref(t, lang)).map((tool) => (
                <li key={tool.id}>
                  <Link href={toolHref(tool, lang)!} className={`${FOOT_LINK} !text-primary-dark font-semibold`}>
                    {tool.name[lang]}
                  </Link>
                </li>
              ))}
              {soonTools.length > 0 && (
                <li className="pt-2 pb-1 text-xs font-semibold text-text-secondary">{dict.tools.soon}</li>
              )}
              {soonTools.map((tool) => (
                <li key={tool.id} className="min-h-[36px] flex items-center text-[15px] text-slate-500">
                  {tool.name[lang]}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.guidesTitle}>
            <h2 className={H4}>{dict.footer.guidesTitle}</h2>
            <ul>
              <li>
                <Link href="/blog" className={FOOT_LINK}>{dict.footer.blog}</Link>
              </li>
              {guides.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${lang}/${page.slug}`} className={FOOT_LINK}>{page.heroTitle}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.legalTitle}>
            <h2 className={H4}>{dict.footer.legalTitle}</h2>
            <ul>
              <li><Link href={`/${lang}/privacidad`} className={FOOT_LINK}>{dict.footer.privacy}</Link></li>
              <li><Link href={`/${lang}/terminos`} className={FOOT_LINK}>{dict.footer.terms}</Link></li>
              <li><Link href={`/${lang}/contacto`} className={FOOT_LINK}>{dict.footer.contact}</Link></li>
            </ul>
            <h2 className={`${H4} mt-4`}>{dict.footer.languageTitle}</h2>
            <p className="flex flex-wrap gap-x-2 text-[15px] text-slate-500">
              {locales.map((l, i) => (
                <span key={l} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {l === lang ? (
                    <span className="font-semibold text-primary-dark" aria-current="true">{localeNames[l]}</span>
                  ) : (
                    <Link href={`/${l}`} hrefLang={l === "pt" ? "pt-BR" : l} className={`inline-flex items-center min-h-[44px] text-primary hover:underline ${FOCUS}`}>
                      {localeNames[l]}
                    </Link>
                  )}
                </span>
              ))}
            </p>
          </nav>
        </div>

        {seoPages.length > 0 && (
          <nav aria-label={dict.footer.allGuidesTitle} className="mt-8 pt-6 border-t border-border">
            <h2 className={H4}>{dict.footer.allGuidesTitle}</h2>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {seoPages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${lang}/${page.slug}`} className={`inline-flex items-center min-h-[36px] rounded text-sm text-text-secondary hover:text-primary transition-colors ${FOCUS}`}>
                    {page.heroTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p className="mt-8 pt-5 border-t border-border text-[13px] leading-normal text-text-secondary">
          {dict.footer.copyright.replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}
