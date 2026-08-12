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
import { recordExport, minutesUntilReset } from "@/lib/rate-limit";
import { trackEvent, fileSizeBucket } from "@/lib/analytics";

type Step = "upload" | "sign" | "done";

interface PlacedSignature {
  id: string;
  dataUrl: string;
  placement: SignaturePlacement;
}

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
  const [signatures, setSignatures] = useState<PlacedSignature[]>([]);
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
    setSignatures([]);
    setExportError(null);
    setPdfError(null);
    trackEvent("pdf_upload_started", {
      ui_language: lang,
      flow_step: "upload",
      file_size_bucket: fileSizeBucket(f.size),
    });
  }, [lang]);

  const handleSignatureApply = useCallback((dataUrl: string) => {
    setSignatures((prev) => {
      // Stagger signatures placed on the same page so a second/third one
      // doesn't land exactly on top of the previous — still draggable
      // apart either way, this just saves a step.
      const onThisPage = prev.filter((s) => s.placement.page === currentPage).length;
      const offset = Math.min(onThisPage * 8, 24);
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          dataUrl,
          placement: { x: 50 + offset, y: 70 - offset, width: 25, page: currentPage },
        },
      ];
    });
    setShowSignatureModal(false);
    trackEvent("signature_created", { ui_language: lang, flow_step: "signature_modal" });
  }, [lang, currentPage]);

  const handlePlacementChange = useCallback((id: string, p: SignaturePlacement) => {
    setSignatures((prev) => prev.map((s) => (s.id === id ? { ...s, placement: p } : s)));
  }, []);

  const handleRemoveSignature = useCallback((id: string) => {
    setSignatures((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handlePdfError = useCallback((message: string) => {
    setPdfError(message);
  }, []);

  const handleExport = useCallback(async () => {
    if (!file || signatures.length === 0) return;

    setExporting(true);
    setExportError(null);

    if (!recordExport()) {
      const mins = minutesUntilReset();
      setExportError(
        dict.export.rateLimited
          .replace("{max}", "10")
          .replace("{minutes}", String(mins))
      );
      setExporting(false);
      return;
    }

    try {
      const blob = await exportSignedPdf(
        file,
        signatures.map((s) => ({ dataUrl: s.dataUrl, placement: s.placement }))
      );
      const signedName = file.name.replace(/\.pdf$/i, "-firmado.pdf");
      downloadBlob(blob, signedName);
      trackEvent("pdf_signed_downloaded", {
        ui_language: lang,
        flow_step: "export",
        signature_count: signatures.length,
      });
      setStep("done");
    } catch {
      setExportError(dict.export.error);
    } finally {
      setExporting(false);
    }
  }, [file, signatures, dict, lang]);

  const handleReset = useCallback(() => {
    setStep("upload");
    setFile(null);
    setSignatures([]);
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
  const signaturesOnCurrentPage = signatures.filter((s) => s.placement.page === currentPage);
  const otherPageSignatures = signatures.filter((s) => s.placement.page !== currentPage);
  const nearestOtherPage = otherPageSignatures[0]?.placement.page;

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
          <button
            onClick={() => setShowSignatureModal(true)}
            className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 min-h-[44px] bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            {signatures.length === 0 ? dict.signature.title : dict.signature.addAnother}
          </button>

          {signatures.length > 0 && (
            <button
              onClick={handleExport}
              disabled={exporting}
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
        <div className="mb-4 p-3 bg-error/5 text-error text-sm rounded-lg text-center" role="alert">
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

      {/* Signatures on another page banner */}
      {otherPageSignatures.length > 0 && nearestOtherPage != null && (
        <div className="mb-3 flex items-center justify-center gap-2 py-2 px-3 bg-primary-light rounded-lg text-sm text-primary">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{dict.signature.onPage.replace("{page}", String(nearestOtherPage))}</span>
          <button
            onClick={() => setCurrentPage(nearestOtherPage)}
            className="underline underline-offset-2 font-medium"
          >
            {dict.signature.goToPage.replace("{page}", String(nearestOtherPage))}
          </button>
        </div>
      )}

      {/* PDF canvas area with signature overlays */}
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

        {/* One overlay per signature placed on the current page — each
            draggable/removable independently */}
        {signaturesOnCurrentPage.map((sig) => (
          <SignatureOverlay
            key={sig.id}
            signatureDataUrl={sig.dataUrl}
            containerRef={pdfContainerRef}
            onPlacementChange={(p) => handlePlacementChange(sig.id, p)}
            currentPage={currentPage}
            onRemove={() => handleRemoveSignature(sig.id)}
            initialPosition={{ x: sig.placement.x, y: sig.placement.y }}
            initialWidth={sig.placement.width}
          />
        ))}
      </div>

      {/* Hint */}
      {signatures.length > 0 && otherPageSignatures.length === 0 && (
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
