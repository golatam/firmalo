"use client";

import { useState, useCallback, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { DropZone } from "./DropZone";
import { PdfViewer } from "./PdfViewer";
import { SignatureModal } from "./SignatureModal";
import {
  SignatureOverlay,
  type SignaturePlacement,
} from "./SignatureOverlay";
import { exportSignedPdf, downloadBlob } from "@/lib/pdf-export";

type Step = "upload" | "sign" | "done";

export function SigningTool({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [placement, setPlacement] = useState<SignaturePlacement | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const handleFileAccepted = useCallback((f: File) => {
    setFile(f);
    setStep("sign");
    setCurrentPage(1);
    setSignatureDataUrl(null);
    setPlacement(null);
    setExportError(null);
  }, []);

  const handleSignatureApply = useCallback((dataUrl: string) => {
    setSignatureDataUrl(dataUrl);
    setShowSignatureModal(false);
  }, []);

  const handleRemoveSignature = useCallback(() => {
    setSignatureDataUrl(null);
    setPlacement(null);
  }, []);

  const handleExport = useCallback(async () => {
    if (!file || !signatureDataUrl || !placement) return;

    setExporting(true);
    setExportError(null);

    try {
      const blob = await exportSignedPdf(file, signatureDataUrl, placement);
      const signedName = file.name.replace(/\.pdf$/i, "-firmado.pdf");
      downloadBlob(blob, signedName);
      setStep("done");
    } catch {
      setExportError(dict.export.error);
    } finally {
      setExporting(false);
    }
  }, [file, signatureDataUrl, placement, dict]);

  const handleReset = useCallback(() => {
    setStep("upload");
    setFile(null);
    setSignatureDataUrl(null);
    setPlacement(null);
    setCurrentPage(1);
    setPageCount(0);
    setExportError(null);
  }, []);

  // --- Upload step ---
  if (step === "upload") {
    return <DropZone dict={dict} lang={lang} onFileAccepted={handleFileAccepted} />;
  }

  // --- Done step ---
  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-text">{dict.export.success}</p>
        <button
          onClick={handleReset}
          className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          {dict.cta.secondary}
        </button>
      </div>
    );
  }

  // --- Sign step ---
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-text hover:bg-surface-alt rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {dict.dropzone.button}
          </button>

          <span className="text-xs text-text-muted truncate max-w-[200px]">
            {file?.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!signatureDataUrl ? (
            <button
              onClick={() => setShowSignatureModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {dict.signature.title}
            </button>
          ) : (
            <button
              onClick={handleExport}
              disabled={exporting || !placement}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-success text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {exporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {dict.export.processing}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {dict.export.button}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {exportError && (
        <div className="mb-4 p-3 bg-red-50 text-error text-sm rounded-lg text-center">
          {exportError}
        </div>
      )}

      {/* PDF canvas area with signature overlay */}
      <div ref={pdfContainerRef} className="relative">
        {file && (
          <PdfViewer
            file={file}
            dict={dict}
            currentPage={currentPage}
            onPageCount={setPageCount}
            onPageChange={setCurrentPage}
            containerRef={pdfContainerRef}
          />
        )}

        {/* Signature overlay on top of PDF */}
        {signatureDataUrl && (
          <SignatureOverlay
            signatureDataUrl={signatureDataUrl}
            containerRef={pdfContainerRef}
            onPlacementChange={setPlacement}
            currentPage={currentPage}
            onRemove={handleRemoveSignature}
          />
        )}
      </div>

      {/* Hint */}
      {signatureDataUrl && (
        <p className="text-center text-xs text-text-muted mt-3">
          {dict.signature.dragHint}
        </p>
      )}

      {/* Signature modal */}
      {showSignatureModal && (
        <SignatureModal
          dict={dict}
          onApply={handleSignatureApply}
          onClose={() => setShowSignatureModal(false)}
        />
      )}
    </div>
  );
}
