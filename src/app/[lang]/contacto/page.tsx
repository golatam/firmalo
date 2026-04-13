import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

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
    title: `${dict.legal.contact.title} — Firmalo`,
    description: dict.legal.contact.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/contacto`,
      languages: {
        es: `${BASE_URL}/es/contacto`,
        "pt-BR": `${BASE_URL}/pt/contacto`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const c = dict.legal.contact;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors mb-8"
      >
        &larr; {dict.legal.backHome}
      </Link>

      <h1 className="text-3xl font-bold text-text mb-4">{c.title}</h1>
      <p className="text-text-secondary mb-8 leading-relaxed">{c.intro}</p>

      <div className="bg-surface-alt border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-text mb-2">{c.emailLabel}</h2>
        <a
          href={`mailto:${c.email}`}
          className="text-primary hover:text-primary-hover text-lg font-medium transition-colors"
        >
          {c.email}
        </a>
        <p className="text-sm text-text-muted mt-2">{c.emailDescription}</p>
        <p className="text-sm text-text-muted mt-1">{c.subjectHint}</p>
      </div>
    </div>
  );
}
