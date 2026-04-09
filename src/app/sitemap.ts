import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://firmalo.io";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

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

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
