"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  const [signaturePage, setSignaturePage] = useState<number>(1);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Prevent overscroll/pull-to-refresh when signing
  useEffect(() => {
    if (step === "sign") {
      document.body.classList.add("signing-active");
      return () => document.body.classList.remove("signing-active");
    }
  }, [step]);

  const handleFileAccepted = useCallback((f: File) => {
    setFile(f);
    setStep("sign");
    setCurrentPage(1);
    setSignatureDataUrl(null);
    setPlacement(null);
    setExportError(null);
    setPdfError(null);
  }, []);

  const handleSignatureApply = useCallback((dataUrl: string) => {
    setSignatureDataUrl(dataUrl);
    setShowSignatureModal(false);
  }, []);

  const handlePlacementChange = useCallback((p: SignaturePlacement) => {
    setPlacement(p);
    setSignaturePage(p.page);
  }, []);

  const handleRemoveSignature = useCallback(() => {
    setSignatureDataUrl(null);
    setPlacement(null);
  }, []);

  const handlePdfError = useCallback((message: string) => {
    setPdfError(message);
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
    setPdfError(null);
  }, []);

  // --- Upload step ---
  if (step === "upload") {
    return <DropZone dict={dict} lang={lang} onFileAccepted={handleFileAccepted} />;
  }

  // --- Done step ---
  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto text-center py-8 px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-text">{dict.export.success}</p>
        <button
          onClick={handleReset}
          className="mt-6 px-6 py-2.5 min-h-[44px] bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          {dict.cta.secondary}
        </button>
      </div>
    );
  }

  // --- Sign step ---
  const showOverlay = signatureDataUrl && (!placement || signaturePage === currentPage);
  const signatureOnOtherPage = signatureDataUrl && placement && signaturePage !== currentPage;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Toolbar — stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 mb-4 px-1">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-sm text-text-secondary hover:text-text hover:bg-surface-alt rounded-lg transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">{dict.dropzone.button}</span>
          </button>

          <span className="text-xs text-text-muted truncate min-w-0">
            {file?.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!signatureDataUrl ? (
            <button
              onClick={() => setShowSignatureModal(true)}
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 min-h-[44px] bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
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
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 min-h-[44px] bg-success text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
      {(exportError || pdfError) && (
        <div className="mb-4 p-3 bg-red-50 text-error text-sm rounded-lg text-center">
          {exportError || pdfError}
          {pdfError && (
            <button
              onClick={handleReset}
              className="block mx-auto mt-2 text-xs underline underline-offset-2 text-text-secondary hover:text-text"
            >
              {dict.dropzone.button}
            </button>
          )}
        </div>
      )}

      {/* Signature on another page banner */}
      {signatureOnOtherPage && (
        <div className="mb-3 flex items-center justify-center gap-2 py-2 px-3 bg-primary-light rounded-lg text-sm text-primary">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{dict.signature.onPage.replace("{page}", String(signaturePage))}</span>
          <button
            onClick={() => setCurrentPage(signaturePage)}
            className="underline underline-offset-2 font-medium"
          >
            {dict.signature.goToPage.replace("{page}", String(signaturePage))}
          </button>
        </div>
      )}

      {/* PDF canvas area with signature overlay */}
      <div ref={pdfContainerRef} className="relative overflow-hidden">
        {file && (
          <PdfViewer
            file={file}
            dict={dict}
            currentPage={currentPage}
            onPageCount={setPageCount}
            onPageChange={setCurrentPage}
            containerRef={pdfContainerRef}
            onError={handlePdfError}
          />
        )}

        {/* Signature overlay — only on the page where it was placed */}
        {showOverlay && (
          <SignatureOverlay
            signatureDataUrl={signatureDataUrl}
            containerRef={pdfContainerRef}
            onPlacementChange={handlePlacementChange}
            currentPage={currentPage}
            onRemove={handleRemoveSignature}
          />
        )}
      </div>

      {/* Hint */}
      {signatureDataUrl && !signatureOnOtherPage && (
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
