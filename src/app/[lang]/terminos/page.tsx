import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { LegalPage } from "@/components/LegalPage";

const BASE_URL = "https://firmalo.io";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: `${dict.legal.terms.title} — Firmalo`,
    description: dict.legal.terms.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/terminos`,
      languages: {
        es: `${BASE_URL}/es/terminos`,
        "pt-BR": `${BASE_URL}/pt/terminos`,
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <LegalPage
      lang={lang}
      title={dict.legal.terms.title}
      intro={dict.legal.terms.intro}
      lastUpdated={dict.legal.lastUpdated}
      backHome={dict.legal.backHome}
      sections={dict.legal.terms.sections}
    />
  );
}
