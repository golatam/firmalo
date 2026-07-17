import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SeoPageData } from "@/lib/seo-pages";
import { SigningToolLoader } from "./SigningToolLoader";

export function SeoHero({
  pageData,
  dict,
  lang,
}: {
  pageData: SeoPageData;
  dict: Dictionary;
  lang: Locale;
}) {
  const cta = pageData.landingCta;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-primary-light to-surface">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight leading-tight">
          {pageData.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {pageData.heroSubtitle}
        </p>

        {cta && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="#firmar-pdf-tool"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              {cta.primaryLabel}
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              {cta.secondaryLabel}
            </Link>
          </div>
        )}

        {cta && (
          <div id="como-funciona" className="mt-8 grid gap-4 sm:grid-cols-3 text-left">
            {cta.steps.map((step) => (
              <div key={step.title} className="rounded-xl border border-border bg-surface-alt p-4">
                <p className="font-semibold text-text text-sm">{step.title}</p>
                <p className="mt-1 text-xs text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Embedded signing tool */}
        <div id="firmar-pdf-tool" className="mt-10">
          <SigningToolLoader dict={dict} lang={lang} />
        </div>
      </div>
    </section>
  );
}
