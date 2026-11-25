// Turns text fields (name, date, free text) and uploaded stamps into PNG data URLs,
// so the existing overlay + pdf-lib export path (images only) works unchanged and
// accented characters (ñ, á, ç, ã) never depend on an embedded PDF font.

const TEXT_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function renderTextToPng(text: string, color = "#1e293b"): string {
  const value = text.trim();
  const scale = 3; // crisp when the field is enlarged
  const fontSize = 28 * scale;
  const pad = 8 * scale;

  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) throw new Error("CANVAS_UNAVAILABLE");
  measure.font = `${fontSize}px ${TEXT_FONT}`;
  const width = Math.ceil(measure.measureText(value).width) + pad * 2;
  const height = Math.ceil(fontSize * 1.4) + pad * 2;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("CANVAS_UNAVAILABLE");
  ctx.font = `${fontSize}px ${TEXT_FONT}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(value, pad, height / 2);
  return canvas.toDataURL("image/png");
}

// PNG/JPG/SVG/WebP -> PNG data URL (pdf-lib only embeds PNG and JPG).
export function fileToPng(file: File, maxSide = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        // SVGs without intrinsic size report 0: fall back to a sane box.
        const w = img.naturalWidth || 400;
        const h = img.naturalHeight || 400;
        const ratio = Math.min(1, maxSide / Math.max(w, h));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(w * ratio);
        canvas.height = Math.round(h * ratio);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("CANVAS_UNAVAILABLE");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("IMAGE_LOAD_FAILED"));
    };
    img.src = url;
  });
}

export function todayText(lang: "es" | "pt"): string {
  return new Date().toLocaleDateString(lang === "pt" ? "pt-BR" : "es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
