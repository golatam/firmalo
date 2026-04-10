import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getSeoPagesByLang } from "@/lib/seo-pages";

// Show only the most impactful pages on the homepage (6 max)
const FEATURED_ES = [
  "firmar-pdf-online-gratis",
  "firmar-pdf-sin-registro",
  "firmar-pdf-desde-celular",
  "firmar-contrato-alquiler-pdf",
  "alternativa-smallpdf-firmar-pdf",
  "alternativa-docusign-gratis",
];

const FEATURED_PT = [
  "assinar-pdf-online-gratis",
  "assinar-pdf-sem-cadastro",
  "assinar-pdf-no-celular",
  "assinar-contrato-pdf-online",
  "alternativa-smallpdf-assinar-pdf",
  "alternativa-docusign-gratis",
];

export function PopularGuides({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const featuredSlugs = lang === "es" ? FEATURED_ES : FEATURED_PT;
  const allPages = getSeoPagesByLang(lang);
  const featured = featuredSlugs
    .map((slug) => allPages.find((p) => p.slug === slug))
    .filter(Boolean);

  const title = lang === "es" ? "Guías populares" : "Guias populares";

  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-text">
          {title}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((page) => (
            <Link
              key={page!.slug}
              href={`/${lang}/${page!.slug}`}
              className="block p-5 bg-surface-alt border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                {page!.heroTitle}
              </h3>
              <p className="mt-2 text-xs text-text-muted line-clamp-2">
                {page!.heroSubtitle}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-primary">
                {dict.cta.primary} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
