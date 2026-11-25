"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getSeoPage, getAlternateSlug, getSeoPagesByLang } from "@/lib/seo-pages";
import { FEATURED_TOOL, TOOL_GROUPS, TOOLS, toolHref, toolsByGroup } from "@/lib/tools";
import { Chevron, LogoMark, ToolIcon } from "./ToolIcon";

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
  onNavigate,
  ...aria
}: {
  href: string;
  pathname: string;
  className: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  "aria-current"?: "page";
  lang?: string;
  hrefLang?: string;
}) {
  if (href === pathname) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={className}
        aria-current={aria["aria-current"]}
      >
        {children}
      </button>
    );
  }
  return (
    <Link href={href} className={className} onClick={onNavigate} {...aria}>
      {children}
    </Link>
  );
}

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const NAV_LINK = `relative inline-flex items-center justify-center gap-1 min-h-[44px] px-2 md:px-3 rounded-lg text-[15px] font-medium whitespace-nowrap text-slate-700 hover:text-primary transition-colors ${FOCUS}`;
const NAV_ON = "text-primary after:content-[''] after:absolute after:left-2 md:after:left-3 after:right-2 md:after:right-3 after:bottom-1.5 after:h-0.5 after:bg-primary after:rounded";
const CTA = `inline-flex items-center justify-center min-h-[44px] px-4 sm:px-5 rounded-[10px] bg-primary text-white text-[15px] font-semibold whitespace-nowrap hover:bg-primary-hover active:bg-primary-dark transition-colors ${FOCUS}`;
const SOON_BADGE =
  "inline-flex items-center h-[22px] px-2 rounded-full bg-slate-100 border border-border text-[11.5px] font-semibold text-text-secondary whitespace-nowrap";
const PANEL =
  "absolute top-full mt-1.5 bg-surface border border-border rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.14)] z-10";

type Menu = "tools" | "guides" | "lang" | "mobile" | null;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Menu>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const [mTools, setMTools] = useState(true);
  const [mGuides, setMGuides] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  // Close any open menu after a navigation.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const key = open as string;
        setOpen(null);
        triggers.current[key]?.focus();
      }
    }
    function onDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function toggle(menu: Exclude<Menu, null>) {
    setOpen((cur) => (cur === menu ? null : menu));
  }
  const close = () => setOpen(null);

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

  const guides = getSeoPagesByLang(lang).slice(0, 8);
  const onBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const homeHref = `/${lang}`;
  const featured = FEATURED_TOOL;
  const featuredHref = toolHref(featured, lang) ?? homeHref;
  const mobileOpen = open === "mobile";

  const trigger = (menu: "tools" | "guides", label: string, on: boolean) => (
    <button
      type="button"
      ref={(el) => {
        triggers.current[menu] = el;
      }}
      onClick={() => toggle(menu)}
      aria-expanded={open === menu}
      aria-controls={`menu-${menu}`}
      className={`${NAV_LINK} ${on || open === menu ? NAV_ON : ""}`}
    >
      {label}
      <Chevron className={`transition-transform ${open === menu ? "rotate-180" : ""}`} />
    </button>
  );

  const toolsPanel = (
      <div id="menu-tools" className={`${PANEL} hidden sm:grid left-4 w-[min(820px,calc(100vw-2rem))] gap-x-6 gap-y-2 p-5 grid-cols-2 lg:grid-cols-[260px_1fr_1fr]`}>
        <Link
          href={featuredHref}
          onClick={close}
          className={`col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col gap-1.5 rounded-xl border border-blue-200 p-[18px] bg-gradient-to-br from-primary-light to-blue-100 text-primary-dark ${FOCUS}`}
        >
          <span className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center">
            <ToolIcon paths={featured.icon} size={24} />
          </span>
          <span className="mt-2.5 text-lg font-extrabold">{featured.name[lang]}</span>
          <span className="text-sm leading-normal text-slate-700">{featured.description[lang]}</span>
          <span className="mt-auto pt-3.5 inline-flex items-center gap-1.5 text-sm font-bold">
            {dict.header.available}
            <Chevron dir="right" size={16} />
          </span>
        </Link>
        {TOOL_GROUPS.map((group) => {
          const items = toolsByGroup(group).filter((t) => t.id !== featured.id);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <div className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary mt-0.5 mb-1.5">
                {dict.tools.groups[group]}
              </div>
              {items.map((tool) => {
                const href = toolHref(tool, lang);
                const inner = (
                  <>
                    <span className="w-9 h-9 rounded-[10px] bg-slate-100 text-text-secondary flex items-center justify-center shrink-0">
                      <ToolIcon paths={tool.icon} />
                    </span>
                    <span className="flex-1 flex flex-col items-start gap-0.5 py-1 text-sm font-semibold text-slate-700">{tool.name[lang]}{!href && <span className={SOON_BADGE}>{dict.tools.soon}</span>}</span>
                  </>
                );
                return href ? (
                  <Link key={tool.id} href={href} onClick={close} className={`flex items-center gap-3 min-h-[52px] px-2 rounded-[10px] hover:bg-primary-light ${FOCUS}`}>
                    {inner}
                  </Link>
                ) : (
                  <div key={tool.id} aria-disabled="true" className="flex items-center gap-3 min-h-[52px] px-2 rounded-[10px]">
                    {inner}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
  );
  const guidesPanel = (
      <div id="menu-guides" className={`${PANEL} hidden sm:block left-4 sm:left-40 w-[min(360px,calc(100vw-2rem))] p-2`}>
        <ul>
          {guides.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${lang}/${page.slug}`}
                onClick={close}
                className={`flex items-center min-h-[44px] px-3 rounded-[10px] text-sm font-medium text-slate-700 hover:bg-primary-light hover:text-primary ${FOCUS}`}
              >
                {page.heroTitle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-border mt-1 pt-1">
          <Link href="/blog" onClick={close} className={`flex items-center min-h-[44px] px-3 rounded-[10px] text-sm font-semibold text-primary hover:bg-primary-light ${FOCUS}`}>
            {dict.header.guidesAll} →
          </Link>
        </div>
      </div>
  );
  const langPanel = (
      <div id="menu-lang" className={`${PANEL} hidden sm:block right-4 w-44 p-1.5`}>
        {locales.map((locale) => (
          <NavItem
            key={locale}
            href={getLocalizedPath(locale)}
            pathname={pathname}
            onNavigate={close}
            lang={locale === "pt" ? "pt-BR" : locale}
            hrefLang={locale === "pt" ? "pt-BR" : locale}
            aria-current={locale === lang ? "page" : undefined}
            className={`flex w-full items-center min-h-[44px] px-3 rounded-[10px] text-sm font-medium text-left hover:bg-primary-light ${FOCUS} ${locale === lang ? "text-primary font-semibold" : "text-slate-700"}`}
          >
            {localeNames[locale]}
          </NavItem>
        ))}
      </div>
  );

  return (
    <header ref={rootRef} className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="relative max-w-5xl mx-auto px-4 h-16 flex items-center gap-1">
        <NavItem
          href={homeHref}
          pathname={pathname}
          onNavigate={close}
          className={`inline-flex shrink-0 items-center gap-2.5 min-h-[44px] mr-1 sm:mr-2 md:mr-6 rounded-lg whitespace-nowrap text-xl font-bold text-primary-dark ${FOCUS}`}
        >
          <LogoMark />
          {dict.header.logo}
        </NavItem>

        {/* Desktop navigation */}
        <nav aria-label={dict.header.mainNav} className="hidden sm:flex items-center gap-1">
          {trigger("tools", dict.header.tools, false)}
          {open === "tools" && toolsPanel}
          {trigger("guides", dict.header.guides, false)}
          {open === "guides" && guidesPanel}
          <NavItem
            href="/blog"
            pathname={pathname}
            onNavigate={close}
            aria-current={onBlog ? "page" : undefined}
            className={`${NAV_LINK} ${onBlog ? NAV_ON : ""}`}
          >
            {dict.header.blog}
          </NavItem>
        </nav>

        <div className="flex-1" />

        {/* Language selector (desktop) */}
        <div className="hidden sm:block">
          <button
            type="button"
            ref={(el) => {
              triggers.current.lang = el;
            }}
            onClick={() => toggle("lang")}
            aria-expanded={open === "lang"}
            aria-controls="menu-lang"
            aria-label={`${dict.header.language}: ${localeNames[lang]}`}
            className={`inline-flex items-center gap-1.5 min-h-[44px] px-2 md:px-3 mr-1 md:mr-2 rounded-full text-[13px] font-semibold text-slate-600 hover:bg-primary-light hover:text-primary transition-colors ${FOCUS}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
            </svg>
            {lang.toUpperCase()}
            <Chevron size={12} className={`transition-transform ${open === "lang" ? "rotate-180" : ""}`} />
          </button>
          {open === "lang" && langPanel}
        </div>

        <NavItem href={featuredHref} pathname={pathname} onNavigate={close} className={CTA}>
          {dict.header.cta}
        </NavItem>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          ref={(el) => {
            triggers.current.mobile = el;
          }}
          onClick={() => toggle("mobile")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? dict.header.closeMenu : dict.header.openMenu}
          className={`sm:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-lg text-slate-700 hover:bg-primary-light ${FOCUS}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="sm:hidden border-t border-border bg-surface max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pb-5 pt-2">
          <div>
            <button
              type="button"
              onClick={() => setMTools((v) => !v)}
              aria-expanded={mTools}
              aria-controls="mobile-tools"
              className={`flex w-full items-center justify-between min-h-[48px] text-base font-semibold text-primary rounded-lg ${FOCUS}`}
            >
              {dict.header.tools}
              <Chevron size={18} className={`transition-transform ${mTools ? "rotate-180" : ""}`} />
            </button>
            {mTools && (
              <ul id="mobile-tools" className="pb-2">
                {TOOLS.map((tool) => {
                  const href = toolHref(tool, lang);
                  return (
                    <li key={tool.id}>
                      {href ? (
                        <Link href={href} onClick={close} className={`flex items-center min-h-[48px] px-3 rounded-lg bg-primary-light text-primary-dark font-semibold ${FOCUS}`}>
                          {tool.name[lang]}
                        </Link>
                      ) : (
                        <div aria-disabled="true" className="flex items-center justify-between gap-2 min-h-[48px] px-3 text-slate-600">
                          <span>{tool.name[lang]}</span>
                          <span className={SOON_BADGE}>{dict.tools.soon}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-border">
            <button
              type="button"
              onClick={() => setMGuides((v) => !v)}
              aria-expanded={mGuides}
              aria-controls="mobile-guides"
              className={`flex w-full items-center justify-between min-h-[48px] text-base font-semibold text-slate-800 rounded-lg ${FOCUS}`}
            >
              {dict.header.guides}
              <Chevron size={18} className={`transition-transform ${mGuides ? "rotate-180" : ""}`} />
            </button>
            {mGuides && (
              <ul id="mobile-guides" className="pb-2">
                {guides.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/${lang}/${page.slug}`} onClick={close} className={`flex items-center min-h-[48px] px-3 rounded-lg text-slate-700 ${FOCUS}`}>
                      {page.heroTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-border">
            <NavItem
              href="/blog"
              pathname={pathname}
              onNavigate={close}
              className={`flex w-full items-center min-h-[48px] text-base font-semibold text-slate-800 rounded-lg ${FOCUS}`}
            >
              {dict.header.blog}
            </NavItem>
          </div>

          <div className="border-t border-border pt-3">
            <div className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary mb-2">
              {dict.header.language}
            </div>
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100">
              {locales.map((locale) => (
                <NavItem
                  key={locale}
                  href={getLocalizedPath(locale)}
                  pathname={pathname}
                  onNavigate={close}
                  lang={locale === "pt" ? "pt-BR" : locale}
                  hrefLang={locale === "pt" ? "pt-BR" : locale}
                  aria-current={locale === lang ? "page" : undefined}
                  className={`flex items-center justify-center min-h-[44px] rounded-lg text-sm font-semibold ${FOCUS} ${locale === lang ? "bg-surface text-primary shadow-sm" : "text-slate-600"}`}
                >
                  {localeNames[locale]}
                </NavItem>
              ))}
            </div>
          </div>

          <NavItem href={featuredHref} pathname={pathname} onNavigate={close} className={`${CTA} w-full mt-4 min-h-[48px] rounded-xl text-base`}>
            {dict.header.cta}
          </NavItem>
          <p className="mt-3 text-center text-[13px] text-text-secondary">{dict.header.mobileNote}</p>
        </div>
      )}
    </header>
  );
}
