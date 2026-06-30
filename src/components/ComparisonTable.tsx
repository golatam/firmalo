import type { Locale } from "@/lib/i18n";
import type { SeoPageData } from "@/lib/seo-pages";

// Visible head-to-head table for the "alternativa a SmallPDF / DocuSign" pages.
// Strengthens the comparison angle (free/private vs paid/cloud) with a scannable
// structure that complements the prose sections. Data lives on the page in
// seo-pages.ts (`comparison`); this component only renders it.

export function ComparisonTable({
  comparison,
  lang,
}: {
  comparison: NonNullable<SeoPageData["comparison"]>;
  lang: Locale;
}) {
  const featureLabel = lang === "es" ? "Característica" : "Recurso";

  return (
    <section className="py-12 sm:py-16 bg-surface-alt">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text">
          Firmalo vs {comparison.competitor}
        </h2>
        {comparison.caption && (
          <p className="mt-3 text-text-secondary leading-relaxed">
            {comparison.caption}
          </p>
        )}
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface">
                <th className="p-3 font-semibold text-text">{featureLabel}</th>
                <th className="p-3 font-semibold text-primary">Firmalo</th>
                <th className="p-3 font-semibold text-text-secondary">
                  {comparison.competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <tr key={i} className="border-t border-border bg-surface">
                  <td className="p-3 font-medium text-text">{row.feature}</td>
                  <td className="p-3 text-text">{row.firmalo}</td>
                  <td className="p-3 text-text-secondary">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
