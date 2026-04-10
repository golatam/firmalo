import type { SeoPageData } from "@/lib/seo-pages";

export function SeoContent({
  sections,
}: {
  sections: SeoPageData["sections"];
}) {
  return (
    <article className="py-12 sm:py-16 bg-surface">
      <div className="max-w-3xl mx-auto px-4 space-y-12">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl sm:text-2xl font-bold text-text">
              {section.title}
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              {section.content}
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
        ))}
      </div>
    </article>
  );
}
