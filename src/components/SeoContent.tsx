import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { SeoPageData } from "@/lib/seo-pages";
import { ToolCtaBlock } from "./ToolCtaBlock";

function renderContent(
  content: string,
  links: { text: string; slug: string }[] | undefined,
  lang: string
) {
  if (!links || links.length === 0) return content;

  // Apply each link to the first occurrence of its anchor text only.
  let remaining = content;
  const parts: (string | ReactNode)[] = [];
  for (const { text, slug } of links) {
    const idx = remaining.indexOf(text);
    if (idx === -1) continue;
    parts.push(remaining.slice(0, idx));
    parts.push(
      <Link
        key={slug}
        href={`/${lang}/${slug}`}
        className="text-primary underline underline-offset-2 hover:no-underline"
      >
        {text}
      </Link>
    );
    remaining = remaining.slice(idx + text.length);
  }
  parts.push(remaining);
  return parts;
}

export function SeoContent({
  sections,
  ctaBlocks,
  lang,
}: {
  sections: SeoPageData["sections"];
  ctaBlocks?: SeoPageData["ctaBlocks"];
  lang: string;
}) {
  return (
    <article className="py-12 sm:py-16 bg-surface">
      <div className="max-w-3xl mx-auto px-4 space-y-12">
        {sections.map((section, i) => (
          <Fragment key={i}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-text">
                {section.title}
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                {renderContent(section.content, section.links, lang)}
              </p>
              {section.bulletPoints && (
                <ul className="mt-4 space-y-2">
                  {section.bulletPoints.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-text-secondary"
                    >
                      <svg
                        className="w-5 h-5 text-primary shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            {ctaBlocks
              ?.filter((cta) => cta.afterSectionIndex === i)
              .map((cta, k) => (
                <ToolCtaBlock
                  key={`cta-${i}-${k}`}
                  heading={cta.heading}
                  body={cta.body}
                  label={cta.label}
                />
              ))}
          </Fragment>
        ))}
      </div>
    </article>
  );
}
