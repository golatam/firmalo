import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale === "pt" ? "pt-BR" : locale] = `/${locale}`;
  }

  return {
    title: dict.hero.title,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...alternates,
        "x-default": "/es",
      },
    },
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
      verification: {
        google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      },
    }),
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang === "pt" ? "pt-BR" : "es"} className={`h-full antialiased ${inter.className}`}>
      <head />

      <body className="min-h-full flex flex-col bg-surface text-text">
        <GoogleAnalytics />
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
