import type { Dictionary } from "@/lib/dictionaries";

const stepIcons = [
  // Upload
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>,
  // Sign
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>,
  // Download
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>,
];

export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-text">
          {dict.howItWorks.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {dict.howItWorks.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary">
                  {stepIcons[i]}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
