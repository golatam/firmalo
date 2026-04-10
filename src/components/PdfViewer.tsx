"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "@/lib/pdf-worker";
import { getDocument, type PDFDocumentProxy } from "pdfjs-dist";
import type { Dictionary } from "@/lib/dictionaries";

const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024; // 10 MB

interface PdfViewerProps {
  file: File;
  dict: Dictionary;
  currentPage: number;
  onPageCount: (count: number) => void;
  onPageChange: (page: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onError?: (message: string) => void;
}

export function PdfViewer({
  file,
  dict,
  currentPage,
  onPageCount,
  onPageChange,
  containerRef,
  onError,
}: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);

  // Load PDF document
  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      setLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const doc = await getDocument({ data: arrayBuffer }).promise;
        if (cancelled) {
          doc.destroy();
          return;
        }
        setPdfDoc(doc);
        setPageCount(doc.numPages);
        onPageCount(doc.numPages);
      } catch {
        if (!cancelled) {
          onError?.(dict.dropzone.error.corrupted);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [file, onPageCount, onError, dict]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;
    setRendering(true);

    try {
      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate scale to fit container width
      const containerWidth = containerRef.current.clientWidth;
      const viewport = page.getViewport({ scale: 1 });
      const fitScale = Math.min((containerWidth - 32) / viewport.width, 2);

      const scaledViewport = page.getViewport({ scale: fitScale });
      // Lower DPR for large files to save memory on mobile
      const dpr = file.size > LARGE_FILE_THRESHOLD ? 1 : (window.devicePixelRatio || 1);

      canvas.width = scaledViewport.width * dpr;
      canvas.height = scaledViewport.height * dpr;
      canvas.style.width = `${scaledViewport.width}px`;
      canvas.style.height = `${scaledViewport.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      await page.render({
        canvasContext: ctx,
        viewport: scaledViewport,
        canvas: canvas,
      }).promise;
    } catch {
      onError?.(dict.dropzone.error.corrupted);
    } finally {
      setRendering(false);
    }
  }, [pdfDoc, currentPage, containerRef, file.size, onError, dict]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Re-render on resize (debounced)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(renderPage, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [renderPage]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[600px] aspect-[210/297] bg-surface-alt rounded-lg animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Page navigation */}
      {pageCount > 1 && (
        <div className="flex items-center gap-3 mb-4 px-4 py-2 bg-surface-alt rounded-lg border border-border">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-text tabular-nums">
            {currentPage} / {pageCount}
          </span>
          <button
            onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage >= pageCount}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* PDF canvas */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="block" />
        {rendering && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
