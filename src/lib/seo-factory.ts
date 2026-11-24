// Client for the SEO Factory read-only articles API (https://seo.golatam.group).
// Articles are rendered server-side with ISR (revalidate = 300s, same as the API's
// Cache-Control max-age). The API key is read only from SEO_FACTORY_API_KEY.

const API_BASE = process.env.SEO_FACTORY_API_URL ?? "https://seo.golatam.group"; // override only for local mocks
export const BLOG_REVALIDATE = 300;
export const SITE_URL = "https://firmalo.io";

export type Cover = {
  url: string;
  alt: string;
  width: number;
  height: number;
  credit: { name: string; url: string; source: string } | null;
};

export type ArticleSummary = {
  slug: string;
  title: string;
  meta: string;
  published_at: string;
  updated_at: string;
  cover: Cover | null;
};

export type Article = ArticleSummary & {
  body_html: string;
  body_md: string;
  schema_json: Record<string, unknown> | null;
  toc: { level: number; text: string; id: string }[] | null;
  faq: { q: string; a: string }[] | null;
  sources: { id: string; url: string; title: string }[] | null;
  author: {
    name: string;
    url?: string;
    linkedin?: string;
    photo?: string;
  } | null;
};

export function articleUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

class SeoFactoryError extends Error {}

function getKey(): string | null {
  const key = process.env.SEO_FACTORY_API_KEY;
  if (!key) {
    console.warn("[seo-factory] SEO_FACTORY_API_KEY is not set — blog renders without API articles");
    return null;
  }
  return key;
}

const isBuild = () => process.env.NEXT_PHASE === "phase-production-build";

// Returns null when the article doesn't exist (404) or when there is no usable
// answer and failing softly is acceptable. Throws on 401 always; on 5xx/network
// errors it throws at runtime (so ISR keeps serving the last good page instead
// of caching an empty one) and only warns during `next build`.
async function api<T>(path: string): Promise<T | null> {
  const key = getKey();
  if (!key) return null;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: BLOG_REVALIDATE },
    });
  } catch (e) {
    return softFail(`network error on ${path}: ${(e as Error).message}`);
  }

  if (res.status === 404) return null;
  if (res.status === 401) {
    throw new SeoFactoryError("[seo-factory] 401 unauthorized — check SEO_FACTORY_API_KEY (it may have been rotated)");
  }
  if (!res.ok) return softFail(`HTTP ${res.status} on ${path}`);

  return (await res.json()) as T;
}

function softFail(msg: string): null {
  if (isBuild()) {
    console.warn(`[seo-factory] ${msg} — building without API articles`);
    return null;
  }
  throw new SeoFactoryError(`[seo-factory] ${msg}`);
}

// Handshake: lets the owner see in the SEO Factory panel that the site is alive.
// Once per process; failure behaves like an unavailable API.
let handshake: Promise<void> | null = null;
function ensureHandshake(): Promise<void> {
  const key = process.env.SEO_FACTORY_API_KEY;
  if (!key) return Promise.resolve();
  handshake ??= fetch(`${API_BASE}/v1/health`, {
    headers: { Authorization: `Bearer ${key}`, "X-SEO-Factory-Client": "nextjs/1" },
    cache: "no-store",
  })
    .then((res) => {
      if (res.status === 401) throw new SeoFactoryError("[seo-factory] 401 unauthorized on handshake");
      if (!res.ok) console.warn(`[seo-factory] handshake HTTP ${res.status}`);
    })
    .catch((e) => {
      if (e instanceof SeoFactoryError) throw e;
      console.warn(`[seo-factory] handshake failed: ${(e as Error).message}`);
    });
  return handshake;
}

export async function getArticles(): Promise<ArticleSummary[]> {
  await ensureHandshake();
  const all: ArticleSummary[] = [];
  let total = Infinity;
  for (let page = 1; all.length < total; page++) {
    const data = await api<{ items: ArticleSummary[]; total: number }>(`/v1/articles?page=${page}`);
    if (!data || data.items.length === 0) break;
    all.push(...data.items);
    total = data.total;
  }
  return all.sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export async function getArticle(slug: string): Promise<Article | null> {
  // Slugs go into a URL path: reject anything that is not a plain slug.
  if (!/^[\p{L}\p{N}-]+$/u.test(slug)) return null;
  await ensureHandshake();
  return api<Article>(`/v1/articles/${encodeURIComponent(slug)}`);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}
