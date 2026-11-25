"use client";

import type { Dictionary } from "@/lib/dictionaries";

export type FieldKind = "signature" | "initials" | "name" | "date" | "text" | "stamp";

const ORDER: FieldKind[] = ["signature", "initials", "name", "date", "text", "stamp"];

const ICONS: Record<FieldKind, string> = {
  signature: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  initials: "M4 20l5-14 5 14M6 15h6M17 8v12M17 4v.01",
  name: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  date: "M8 7V3m8 4V3M5 11h14M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  text: "M4 6h16M12 6v14M9 20h6",
  stamp: "M5 21h14M7 17h10v-3a3 3 0 00-3-3V8a2 2 0 10-4 0v3a3 3 0 00-3 3v3z",
};

// Row of "add to document" buttons: a wrapping grid on desktop, a swipeable row on phones.
export function FieldsPanel({
  dict,
  onPick,
}: {
  dict: Dictionary;
  onPick: (kind: FieldKind) => void;
}) {
  return (
    <div role="group" aria-label={dict.fields.panelTitle} className="mb-4">
      <p className="px-1 mb-2 text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary">
        {dict.fields.panelTitle}
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
        {ORDER.map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => onPick(kind)}
            className={`shrink-0 inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-lg border text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              kind === "signature"
                ? "bg-primary text-white border-primary hover:bg-primary-hover"
                : "bg-surface text-text border-border hover:border-primary/50 hover:text-primary"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS[kind]} />
            </svg>
            {dict.fields[kind].button}
          </button>
        ))}
      </div>
    </div>
  );
}
