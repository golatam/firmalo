import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getArticles } from "@/lib/seo-factory";

// Render per request, never at build time: the build has no API key, so a
// prerendered list would ship empty after every deploy. API calls stay cheap
// because the fetch itself is cached for 300s (see seo-factory.ts).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guías y consejos para firmar PDF online, sin registro y sin subir tus archivos.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const articles = await getArticles();

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Blog</h1>

        {articles.length === 0 ? (
          <p className="mt-8 text-text-secondary">Pronto publicaremos nuevas guías.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="block bg-surface-alt border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                {a.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.cover.url}
                    alt={a.cover.alt}
                    width={a.cover.width}
                    height={a.cover.height}
                    loading="lazy"
                    className="w-full h-auto aspect-[3/2] object-cover"
                  />
                )}
                <div className="p-5">
                  <h2 className="font-semibold text-text group-hover:text-primary transition-colors line-clamp-3">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-muted line-clamp-3">{a.meta}</p>
                  <time dateTime={a.published_at} className="mt-3 block text-xs text-text-muted">
                    {formatDate(a.published_at)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
