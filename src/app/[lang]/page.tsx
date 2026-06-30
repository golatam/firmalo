import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Hero } from "@/components/Hero";
import { HomeSeoIntro } from "@/components/HomeSeoIntro";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Security } from "@/components/Security";
import { TrustFacts } from "@/components/TrustFacts";
import { GeoBlock } from "@/components/GeoBlock";
import { FAQ } from "@/components/FAQ";
import { PopularGuides } from "@/components/PopularGuides";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd(lang)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero dict={dict} lang={lang} />
      <HomeSeoIntro lang={lang} />
      <HowItWorks dict={dict} />
      <Benefits dict={dict} />
      <TrustFacts lang={lang} />
      <Security dict={dict} />
      <PopularGuides dict={dict} lang={lang} />
      <GeoBlock dict={dict} />
      <FAQ dict={dict} />
    </>
  );
}
