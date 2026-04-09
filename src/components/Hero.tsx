import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { DropZone } from "./DropZone";

export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-primary-light to-surface">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-text tracking-tight">
          {dict.hero.title}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
          {dict.hero.subtitle}
        </p>

        {/* Trust badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          {dict.hero.trustBadge}
        </div>

        {/* Drop zone — the tool IS the hero */}
        <div className="mt-8">
          <DropZone dict={dict} lang={lang} />
        </div>
      </div>
    </section>
  );
}
