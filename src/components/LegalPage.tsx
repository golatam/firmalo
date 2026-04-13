import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalPageProps {
  lang: Locale;
  title: string;
  intro: string;
  lastUpdated: string;
  backHome: string;
  sections: LegalSection[];
}

export function LegalPage({ lang, title, intro, lastUpdated, backHome, sections }: LegalPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors mb-8"
      >
        &larr; {backHome}
      </Link>

      <h1 className="text-3xl font-bold text-text mb-2">{title}</h1>
      <p className="text-sm text-text-muted mb-8">{lastUpdated}</p>
      <p className="text-text-secondary mb-8 leading-relaxed">{intro}</p>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold text-text mb-3">{section.title}</h2>
            <p className="text-text-secondary leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
