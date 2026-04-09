import type { Dictionary } from "@/lib/dictionaries";

export function GeoBlock({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 sm:py-20 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-text">
          {dict.geo.title}
        </h2>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {dict.geo.countries.map((country) => (
            <div
              key={country.name}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
            >
              <span className="text-3xl">{country.flag}</span>
              <span className="text-sm font-medium text-text">
                {country.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {dict.geo.description.replace(
            "{country}",
            dict.geo.countries[0]?.name || ""
          )}
        </p>
      </div>
    </section>
  );
}
