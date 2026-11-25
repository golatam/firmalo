import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { FEATURED_TOOL, TOOLS, toolHref } from "@/lib/tools";
import { Chevron, ToolIcon } from "./ToolIcon";

const SOON_BADGE =
  "inline-flex items-center h-[22px] px-2 rounded-full bg-slate-100 border border-border text-[11.5px] font-semibold text-text-secondary whitespace-nowrap";

export function ToolsGrid({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  // Featured card + the first four other tools (fills the 4-column layout; the
  // full list lives in the header menu and footer).
  const others = TOOLS.filter((t) => t.id !== FEATURED_TOOL.id).slice(0, 4);
  const featHref = toolHref(FEATURED_TOOL, lang) ?? `/${lang}`;

  return (
    <section className="py-10 sm:py-14" aria-labelledby="tools-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-xs font-semibold tracking-[0.06em] uppercase text-primary">{dict.tools.tag}</div>
        <h2 id="tools-heading" className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-text">
          {dict.tools.title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{dict.tools.subtitle}</p>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <Link
            href={featHref}
            className="sm:col-span-2 lg:row-span-2 flex flex-col rounded-[20px] p-6 sm:p-8 text-white bg-gradient-to-br from-primary to-primary-dark shadow-[0_20px_40px_-24px_rgba(37,99,235,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <ToolIcon paths={FEATURED_TOOL.icon} size={26} />
            </span>
            <span className="mt-5 text-2xl font-extrabold">{FEATURED_TOOL.name[lang]}</span>
            <span className="mt-2 text-base leading-relaxed text-blue-100">{FEATURED_TOOL.description[lang]}</span>
            <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-bold">
              {dict.tools.available}
              <Chevron dir="right" size={16} />
            </span>
          </Link>

          {others.map((tool) => {
            const href = toolHref(tool, lang);
            const body = (
              <>
                <span className="flex items-start justify-between gap-2">
                  <span className="w-11 h-11 rounded-xl bg-slate-100 text-text-secondary flex items-center justify-center">
                    <ToolIcon paths={tool.icon} size={20} />
                  </span>
                  {!href && <span className={SOON_BADGE}>{dict.tools.soon}</span>}
                </span>
                <span className="mt-4 text-[17px] font-bold text-slate-700">{tool.name[lang]}</span>
                <span className="mt-1 text-sm leading-normal text-slate-600">{tool.description[lang]}</span>
              </>
            );
            const cls = "flex flex-col rounded-2xl border border-border bg-surface-alt p-5";
            return href ? (
              <Link key={tool.id} href={href} className={`${cls} hover:border-border-hover`}>
                {body}
              </Link>
            ) : (
              <div key={tool.id} aria-disabled="true" className={cls}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
