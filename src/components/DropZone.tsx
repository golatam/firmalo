"use client";

import { useState, useCallback, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

interface DropZoneProps {
  dict: Dictionary;
  lang: Locale;
  onFileAccepted?: (file: File) => void;
}

export function DropZone({ dict, lang, onFileAccepted }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.type !== "application/pdf") {
        return dict.dropzone.error.invalidType;
      }
      if (file.size > MAX_FILE_SIZE) {
        return dict.dropzone.error.tooLarge;
      }
      return null;
    },
    [dict]
  );

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setFileName(file.name);
      onFileAccepted?.(file);
    },
    [validateFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="relative">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12
          transition-all duration-200 ease-in-out
          ${
            isDragging
              ? "border-primary bg-primary-light scale-[1.02]"
              : error
                ? "border-error/50 bg-red-50"
                : fileName
                  ? "border-success bg-green-50"
                  : "border-border-hover bg-white hover:border-primary hover:bg-primary-light/50"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Icon */}
        <div className="flex flex-col items-center gap-4">
          {fileName ? (
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-success"
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
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          )}

          {/* Text */}
          <div>
            {isDragging ? (
              <p className="text-lg font-semibold text-primary">
                {dict.dropzone.dragging}
              </p>
            ) : fileName ? (
              <div>
                <p className="text-lg font-semibold text-success">{fileName}</p>
                <p className="text-sm text-text-secondary mt-1">
                  {dict.cta.primary} →
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-text">
                  {dict.dropzone.title}
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  {dict.dropzone.or}{" "}
                  <span className="text-primary font-medium underline underline-offset-2">
                    {dict.dropzone.button.toLowerCase()}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Hint */}
          {!fileName && (
            <p className="text-xs text-text-muted">{dict.dropzone.hint}</p>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-error">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
