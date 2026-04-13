import type { SignaturePlacement } from "@/components/SignatureOverlay";

export async function exportSignedPdf(
  originalFile: File,
  signatureDataUrl: string,
  placement: SignaturePlacement
): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const arrayBuffer = await originalFile.arrayBuffer();

  // Load original PDF — ignores encryption flag so visually-encrypted
  // (but not truly locked) files still work
  let pdfDoc: Awaited<ReturnType<typeof PDFDocument.load>>;
  try {
    pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  } catch {
    throw new Error("PDF_LOAD_FAILED");
  }

  // Get the target page (0-indexed)
  const pages = pdfDoc.getPages();
  const pageIndex = placement.page - 1;
  if (pageIndex < 0 || pageIndex >= pages.length) {
    throw new Error("Invalid page number");
  }
  const page = pages[pageIndex];
  const { width: pageWidth, height: pageHeight } = page.getSize();

  // Decode the signature image
  let signatureImage;
  if (signatureDataUrl.startsWith("data:image/png")) {
    const base64 = signatureDataUrl.split(",")[1];
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    signatureImage = await pdfDoc.embedPng(bytes);
  } else {
    const base64 = signatureDataUrl.split(",")[1];
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    signatureImage = await pdfDoc.embedJpg(bytes);
  }

  // Calculate dimensions in PDF coordinate space
  // placement.x/y are percentages (0-100) from top-left
  // PDF coordinates start from bottom-left
  const sigWidthPdf = (placement.width / 100) * pageWidth;
  const aspectRatio = signatureImage.height / signatureImage.width;
  const sigHeightPdf = sigWidthPdf * aspectRatio;

  const sigX = (placement.x / 100) * pageWidth - sigWidthPdf / 2;
  // Flip Y: placement.y is from top, PDF is from bottom
  const sigY = pageHeight - (placement.y / 100) * pageHeight - sigHeightPdf / 2;

  // Draw signature on the page
  page.drawImage(signatureImage, {
    x: Math.max(0, sigX),
    y: Math.max(0, sigY),
    width: sigWidthPdf,
    height: sigHeightPdf,
  });

  // Save the modified PDF
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
