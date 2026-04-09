import type { Dictionary } from "@/lib/dictionaries";

export function Security({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text">
                {dict.security.title}
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
                {dict.security.description}
              </p>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dict.security.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-text">
                <svg
                  className="w-4 h-4 text-success flex-shrink-0"
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
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
