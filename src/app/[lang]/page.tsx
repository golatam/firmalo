import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Security } from "@/components/Security";
import { GeoBlock } from "@/components/GeoBlock";
import { FAQ } from "@/components/FAQ";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict} lang={lang} />
      <HowItWorks dict={dict} />
      <Benefits dict={dict} />
      <Security dict={dict} />
      <GeoBlock dict={dict} />
      <FAQ dict={dict} />
    </>
  );
}
