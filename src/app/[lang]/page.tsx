import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Hero } from "@/components/Hero";
import { HomeSeoIntro } from "@/components/HomeSeoIntro";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Security } from "@/components/Security";
import { GeoBlock } from "@/components/GeoBlock";
import { FAQ } from "@/components/FAQ";
import { PopularGuides } from "@/components/PopularGuides";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  // JSON-LD WebApplication (parity with SEO subpages, which the homepage lacked)
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Firmalo",
    url: `https://firmalo.io/${lang}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  // JSON-LD FAQPage built from the homepage FAQ items
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero dict={dict} lang={lang} />
      <HomeSeoIntro lang={lang} />
      <HowItWorks dict={dict} />
      <Benefits dict={dict} />
      <Security dict={dict} />
      <PopularGuides dict={dict} lang={lang} />
      <GeoBlock dict={dict} />
      <FAQ dict={dict} />
    </>
  );
}
