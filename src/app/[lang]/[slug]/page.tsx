import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getSeoPage, getAllSeoPages, getAlternateSlug } from "@/lib/seo-pages";
import { SeoHero } from "@/components/SeoHero";
import { SeoContent } from "@/components/SeoContent";
import { SeoFaq } from "@/components/SeoFaq";
import { RelatedPages } from "@/components/RelatedPages";
import { Security } from "@/components/Security";

export async function generateStaticParams() {
  return getAllSeoPages().map(({ lang, slug }) => ({ lang, slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const pageData = getSeoPage(lang, slug);
  if (!pageData) return {};

  const BASE_URL = "https://firmalo.io";
  const alternate = getAlternateSlug(lang, slug);

  const languages: Record<string, string> = {
    [lang === "pt" ? "pt-BR" : "es"]: `${BASE_URL}/${lang}/${slug}`,
  };
  if (alternate) {
    const altLangKey = alternate.lang === "pt" ? "pt-BR" : "es";
    languages[altLangKey] = `${BASE_URL}/${alternate.lang}/${alternate.slug}`;
  }

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/${slug}`,
      languages,
    },
    openGraph: {
      title: pageData.heroTitle,
      description: pageData.metaDescription,
      url: `${BASE_URL}/${lang}/${slug}`,
      siteName: "Firmalo",
      locale: lang === "pt" ? "pt_BR" : "es_ES",
      type: "website",
    },
  };
}

export default async function SeoPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const pageData = getSeoPage(lang, slug);
  if (!pageData) notFound();

  const dict = await getDictionary(lang);

  const faqTitle = lang === "es" ? "Preguntas frecuentes" : "Perguntas frequentes";
  const relatedTitle = lang === "es" ? "Páginas relacionadas" : "Páginas relacionadas";

  // JSON-LD WebApplication schema
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Firmalo",
    url: `https://firmalo.io/${lang}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "es" ? "Inicio" : "Início",
        item: `https://firmalo.io/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageData.heroTitle,
        item: `https://firmalo.io/${lang}/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <SeoHero pageData={pageData} dict={dict} lang={lang} />
      <SeoContent sections={pageData.sections} />
      <SeoFaq faq={pageData.faq} title={faqTitle} />
      <RelatedPages
        relatedSlugs={pageData.relatedSlugs}
        lang={lang}
        title={relatedTitle}
      />
      <Security dict={dict} />
    </>
  );
}
