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
    title: `${dict.legal.privacy.title} — Firmalo`,
    description: dict.legal.privacy.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/privacidad`,
      languages: {
        es: `${BASE_URL}/es/privacidad`,
        "pt-BR": `${BASE_URL}/pt/privacidad`,
      },
    },
  };
}

export default async function PrivacyPage({
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
      title={dict.legal.privacy.title}
      intro={dict.legal.privacy.intro}
      lastUpdated={dict.legal.lastUpdated}
      backHome={dict.legal.backHome}
      sections={dict.legal.privacy.sections}
    />
  );
}
