import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleUrl, formatDate, getArticle } from "@/lib/seo-factory";

export const revalidate = 300; // must be a literal (same as BLOG_REVALIDATE)
// Articles appear after build: render on demand, then cache (ISR).
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.meta,
    alternates: { canonical: articleUrl(a.slug) },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.meta,
      url: articleUrl(a.slug),
      publishedTime: a.published_at,
      modifiedTime: a.updated_at,
      ...(a.cover && { images: [{ url: a.cover.url, width: a.cover.width, height: a.cover.height, alt: a.cover.alt }] }),
    },
    twitter: { card: "summary_large_image", ...(a.cover && { images: [a.cover.url] }) },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  const toc = a.toc?.filter((t) => t.level <= 3) ?? [];

  return (
    <article className="py-10 sm:py-14">
      {a.schema_json && (
        <script
          type="application/ld+json"
          // JSON-LD from the trusted API; "<" escaped so it can't close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(a.schema_json).replace(/</g, "\\u003c") }}
        />
      )}
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">{a.title}</h1>

        <p className="mt-4 text-sm text-text-muted">
          {a.author && <span>{a.author.name} · </span>}
          <time dateTime={a.published_at}>{formatDate(a.published_at)}</time>
          {a.updated_at.slice(0, 10) !== a.published_at.slice(0, 10) && (
            <>
              {" "}· Actualizado: <time dateTime={a.updated_at}>{formatDate(a.updated_at)}</time>
            </>
          )}
        </p>

        {a.cover && (
          <figure className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.cover.url}
              alt={a.cover.alt}
              width={a.cover.width}
              height={a.cover.height}
              className="w-full h-auto rounded-xl border border-border"
            />
            {a.cover.credit && (
              <figcaption className="mt-2 text-xs text-text-muted">
                Foto:{" "}
                <a href={a.cover.credit.url} target="_blank" rel="noopener" className="underline">
                  {a.cover.credit.name}
                </a>
                , {a.cover.credit.source}
              </figcaption>
            )}
          </figure>
        )}

        {toc.length > 0 && (
          <nav aria-label="Contenido" className="mt-8 p-5 bg-surface-alt border border-border rounded-xl">
            <p className="font-semibold text-text">Contenido</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {toc.map((t) => (
                <li key={t.id} className={t.level === 3 ? "ml-4" : ""}>
                  <a href={`#${t.id}`} className="text-primary hover:underline">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div
          className="mt-8 text-text leading-relaxed [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5 [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:h-auto [&_table]:w-full [&_table]:mt-4 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_td]:border [&_td]:border-border [&_td]:p-2 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:mt-4"
          // body_html is sanitized by SEO Factory (trusted, per integration contract).
          dangerouslySetInnerHTML={{ __html: a.body_html }}
        />

        {a.faq && a.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-text">Preguntas frecuentes</h2>
            <div className="mt-4 space-y-4">
              {a.faq.map((f) => (
                <div key={f.q} className="p-5 bg-surface-alt border border-border rounded-xl">
                  <h3 className="font-semibold text-text">{f.q}</h3>
                  <p className="mt-2 text-text-secondary">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {a.sources && a.sources.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-text">Fuentes</h2>
            <ul className="mt-3 space-y-1.5 text-sm list-disc pl-6">
              {a.sources.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="nofollow noopener" className="text-primary hover:underline">
                    {s.title || s.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {a.author && (
          <aside className="mt-12 flex items-center gap-4 p-5 border border-border rounded-xl">
            {a.author.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.author.photo} alt={a.author.name} width={56} height={56} className="rounded-full" />
            )}
            <div className="text-sm">
              <p className="font-semibold text-text">{a.author.name}</p>
              <p className="mt-1 space-x-3">
                {a.author.url && (
                  <a href={a.author.url} rel="noopener" className="text-primary hover:underline">
                    Web
                  </a>
                )}
                {a.author.linkedin && (
                  <a href={a.author.linkedin} rel="noopener" className="text-primary hover:underline">
                    LinkedIn
                  </a>
                )}
              </p>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
