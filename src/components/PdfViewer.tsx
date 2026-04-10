"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "@/lib/pdf-worker";
import { getDocument, type PDFDocumentProxy } from "pdfjs-dist";
import type { Dictionary } from "@/lib/dictionaries";

interface PdfViewerProps {
  file: File;
  dict: Dictionary;
  currentPage: number;
  onPageCount: (count: number) => void;
  onPageChange: (page: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function PdfViewer({
  file,
  dict,
  currentPage,
  onPageCount,
  onPageChange,
  containerRef,
}: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [scale, setScale] = useState(1);

  // Load PDF document
  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      const arrayBuffer = await file.arrayBuffer();
      const doc = await getDocument({ data: arrayBuffer }).promise;
      if (cancelled) {
        doc.destroy();
        return;
      }
      setPdfDoc(doc);
      setPageCount(doc.numPages);
      onPageCount(doc.numPages);
    }

    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [file, onPageCount]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;
    setRendering(true);

    const page = await pdfDoc.getPage(currentPage);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate scale to fit container width
    const containerWidth = containerRef.current.clientWidth;
    const viewport = page.getViewport({ scale: 1 });
    const fitScale = Math.min((containerWidth - 32) / viewport.width, 2);
    setScale(fitScale);

    const scaledViewport = page.getViewport({ scale: fitScale });
    const dpr = window.devicePixelRatio || 1;

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

    setRendering(false);
  }, [pdfDoc, currentPage, containerRef]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Re-render on resize
  useEffect(() => {
    const handleResize = () => renderPage();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderPage]);

  return (
    <div className="flex flex-col items-center">
      {/* Page navigation */}
      {pageCount > 1 && (
        <div className="flex items-center gap-3 mb-4 px-4 py-2 bg-surface-alt rounded-lg border border-border">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-1 rounded hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
            className="p-1 rounded hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
