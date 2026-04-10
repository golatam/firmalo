import Link from "next/link";
import { getSeoPage } from "@/lib/seo-pages";

export function RelatedPages({
  relatedSlugs,
  lang,
  title,
}: {
  relatedSlugs: string[];
  lang: string;
  title: string;
}) {
  const pages = relatedSlugs
    .map((slug) => getSeoPage(lang, slug))
    .filter(Boolean);

  if (pages.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-surface">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-text">
          {title}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page!.slug}
              href={`/${lang}/${page!.slug}`}
              className="block p-5 bg-surface-alt border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                {page!.heroTitle}
              </h3>
              <p className="mt-2 text-xs text-text-muted line-clamp-2">
                {page!.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
