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
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-primary-light to-surface">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight leading-tight">
          {pageData.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {pageData.heroSubtitle}
        </p>

        {/* Embedded signing tool */}
        <div className="mt-10">
          <SigningToolLoader dict={dict} lang={lang} />
        </div>
      </div>
    </section>
  );
}
