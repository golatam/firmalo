import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { articleUrl, getArticles } from "@/lib/seo-factory";

const BASE_URL = "https://firmalo.io";

// Stable, accurate <lastmod> dates. Using `new Date()` made every URL claim it
// was modified at build time (down to the millisecond, changing on every fetch),
// which Google treats as an untrustworthy signal and ignores. Bump SEO_CONTENT_DATE
// whenever landing-page content is meaningfully updated.
const SEO_CONTENT_DATE = new Date("2026-06-30"); // trust facts + comparison blocks + llms.txt
const LEGAL_PAGE_DATE = new Date("2026-04-13"); // legal pages rarely change

// SEO pages per locale
const seoPages: Record<string, string[]> = {
  es: [
    "",
    "firmar-pdf-online-gratis",
    "firmar-pdf-sin-registro",
    "firmar-pdf-sin-marca-de-agua",
    "anadir-firma-a-pdf",
    "crear-firma-online",
    "firmar-pdf-desde-celular",
    "firmar-contrato-alquiler-pdf",
    "firmar-pdf-para-visa",
    "alternativa-smallpdf-firmar-pdf",
    "alternativa-docusign-gratis",
  ],
  pt: [
    "",
    "assinar-pdf-online-gratis",
    "assinar-pdf-sem-cadastro",
    "assinar-pdf-sem-marca-dagua",
    "adicionar-assinatura-no-pdf",
    "criar-assinatura-online",
    "assinar-pdf-no-celular",
    "assinar-contrato-pdf-online",
    "assinar-pdf-para-visto",
    "alternativa-smallpdf-assinar-pdf",
    "alternativa-docusign-gratis",
  ],
};

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Blog: index + SEO Factory articles (lastmod = updated_at).
  const articles = await getArticles();
  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: articles[0] ? new Date(articles[0].updated_at) : SEO_CONTENT_DATE,
    changeFrequency: "weekly",
    priority: 0.6,
  });
  for (const a of articles) {
    entries.push({
      url: articleUrl(a.slug),
      lastModified: new Date(a.updated_at),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const locale of locales) {
    const pages = seoPages[locale] || [];
    for (const page of pages) {
      const path = page ? `/${locale}/${page}` : `/${locale}`;

      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const altPages = seoPages[altLocale] || [];
        const pageIndex = pages.indexOf(page);
        const altPage = altPages[pageIndex];
        if (altPage !== undefined) {
          const langKey = altLocale === "pt" ? "pt-BR" : altLocale;
          alternates[langKey] = `${BASE_URL}${altPage ? `/${altLocale}/${altPage}` : `/${altLocale}`}`;
        }
      }
      // x-default → Spanish version (project-wide fallback for unmatched locales)
      const esPages = seoPages.es || [];
      const esPage = esPages[pages.indexOf(page)];
      if (esPage !== undefined) {
        alternates["x-default"] = `${BASE_URL}${esPage ? `/es/${esPage}` : `/es`}`;
      }

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: SEO_CONTENT_DATE,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // Legal pages
  const legalPages = ["privacidad", "terminos", "contacto"];
  for (const locale of locales) {
    for (const page of legalPages) {
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const langKey = altLocale === "pt" ? "pt-BR" : altLocale;
        alternates[langKey] = `${BASE_URL}/${altLocale}/${page}`;
      }
      alternates["x-default"] = `${BASE_URL}/es/${page}`;
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: LEGAL_PAGE_DATE,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
