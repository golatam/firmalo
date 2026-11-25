"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { fileToPng, renderTextToPng, todayText } from "@/lib/field-image";

export type TextFieldKind = "name" | "date" | "text" | "stamp";

export function FieldModal({
  kind,
  dict,
  lang,
  onApply,
  onClose,
}: {
  kind: TextFieldKind;
  dict: Dictionary;
  lang: Locale;
  onApply: (dataUrl: string) => void;
  onClose: () => void;
}) {
  const f = dict.fields;
  const [value, setValue] = useState(kind === "date" ? todayText(lang) : "");
  const [stamp, setStamp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (kind !== "stamp") inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [kind, onClose]);

  const title = f[kind].title;
  const canApply = kind === "stamp" ? stamp !== null : value.trim().length > 0;

  const apply = () => {
    if (!canApply) return;
    try {
      onApply(kind === "stamp" ? stamp! : renderTextToPng(value));
    } catch {
      setError(f.error);
    }
  };

  const onStampFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      setStamp(await fileToPng(file));
    } catch {
      setStamp(null);
      setError(f.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[95vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <button
            onClick={onClose}
            aria-label={f.close}
            className="p-2 -m-1 rounded-lg hover:bg-surface-alt transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {kind === "stamp" ? (
            <div>
              <label className="flex flex-col items-center justify-center gap-2 min-h-[140px] border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors p-4 text-center focus-within:outline-2 focus-within:outline-primary">
                {stamp ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={stamp} alt="" className="max-h-32 w-auto" />
                ) : (
                  <span className="text-sm text-text-secondary">{f.stamp.hint}</span>
                )}
                <span className="text-sm font-medium text-primary">{stamp ? f.stamp.change : f.stamp.choose}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={onStampFile}
                  className="sr-only"
                />
              </label>
            </div>
          ) : (
            <div>
              <label htmlFor="field-value" className="block text-sm font-medium text-text mb-1.5">
                {f[kind].label}
              </label>
              <input
                id="field-value"
                ref={inputRef}
                type="text"
                value={value}
                maxLength={120}
                autoComplete={kind === "name" ? "name" : "off"}
                placeholder={f[kind].placeholder}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && apply()}
                className="w-full min-h-[48px] px-3 rounded-lg border border-border text-base text-text focus:outline-2 focus:outline-primary"
              />
              {value.trim() && (
                <p className="mt-3 px-3 py-2 rounded-lg bg-surface-alt text-[15px] text-text break-words" aria-hidden="true">
                  {value}
                </p>
              )}
            </div>
          )}
          {error && (
            <p role="alert" className="mt-3 text-sm text-error">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-surface-alt">
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[44px] text-sm text-text-secondary hover:text-text transition-colors"
          >
            {f.cancel}
          </button>
          <button
            onClick={apply}
            disabled={!canApply}
            className="px-6 py-2.5 min-h-[44px] bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {f.add}
          </button>
        </div>
      </div>
    </div>
  );
}
