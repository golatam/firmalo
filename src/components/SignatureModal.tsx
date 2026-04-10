"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SignaturePad from "signature_pad";
import type { Dictionary } from "@/lib/dictionaries";

type Tab = "draw" | "type" | "upload";

interface SignatureModalProps {
  dict: Dictionary;
  onApply: (dataUrl: string) => void;
  onClose: () => void;
}

// Signature fonts for "type" mode
const SIGNATURE_FONTS = [
  "'Dancing Script', cursive",
  "'Caveat', cursive",
  "'Sacramento', cursive",
  "'Great Vibes', cursive",
];

export function SignatureModal({ dict, onApply, onClose }: SignatureModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("draw");
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState(SIGNATURE_FONTS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sigPadRef = useRef<SignaturePad | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize signature pad
  useEffect(() => {
    if (activeTab === "draw" && canvasRef.current && !sigPadRef.current) {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      sigPadRef.current = new SignaturePad(canvas, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        penColor: "#1e293b",
        minWidth: 1.5,
        maxWidth: 3,
      });
    }

    return () => {
      if (activeTab !== "draw" && sigPadRef.current) {
        sigPadRef.current.off();
        sigPadRef.current = null;
      }
    };
  }, [activeTab]);

  // Resize canvas when tab switches back to draw
  useEffect(() => {
    if (activeTab === "draw" && sigPadRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
        sigPadRef.current.clear();
      }
    }
  }, [activeTab]);

  const handleClear = useCallback(() => {
    if (activeTab === "draw" && sigPadRef.current) {
      sigPadRef.current.clear();
    } else if (activeTab === "type") {
      setTypedName("");
    } else if (activeTab === "upload") {
      setUploadedImage(null);
    }
  }, [activeTab]);

  const handleApply = useCallback(() => {
    let dataUrl: string | null = null;

    if (activeTab === "draw" && sigPadRef.current) {
      if (sigPadRef.current.isEmpty()) return;
      dataUrl = sigPadRef.current.toDataURL("image/png");
    } else if (activeTab === "type" && typedName.trim()) {
      // Render typed name to canvas
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 600;
      tempCanvas.height = 200;
      const ctx = tempCanvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, 600, 200);
      ctx.font = `64px ${selectedFont}`;
      ctx.fillStyle = "#1e293b";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(typedName.trim(), 300, 100);

      dataUrl = tempCanvas.toDataURL("image/png");
    } else if (activeTab === "upload" && uploadedImage) {
      dataUrl = uploadedImage;
    }

    if (dataUrl) {
      onApply(dataUrl);
    }
  }, [activeTab, typedName, selectedFont, uploadedImage, onApply]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: "draw", label: dict.signature.tabs.draw },
    { key: "type", label: dict.signature.tabs.type },
    { key: "upload", label: dict.signature.tabs.upload },
  ];

  const canApply =
    (activeTab === "draw" && sigPadRef.current && !sigPadRef.current?.isEmpty()) ||
    (activeTab === "type" && typedName.trim().length > 0) ||
    (activeTab === "upload" && uploadedImage !== null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text">
            {dict.signature.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-alt transition-colors"
          >
            <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "draw" && (
            <div className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="w-full touch-none"
                style={{ height: "200px" }}
              />
            </div>
          )}

          {activeTab === "type" && (
            <div className="space-y-4">
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder={dict.signature.placeholder}
                className="w-full px-4 py-3 border border-border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                autoFocus
              />

              {/* Font preview */}
              {typedName && (
                <div className="grid grid-cols-2 gap-2">
                  {SIGNATURE_FONTS.map((font) => (
                    <button
                      key={font}
                      onClick={() => setSelectedFont(font)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        selectedFont === font
                          ? "border-primary bg-primary-light"
                          : "border-border hover:border-border-hover"
                      }`}
                    >
                      <span
                        style={{ fontFamily: font, fontSize: "24px" }}
                        className="text-text"
                      >
                        {typedName}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "upload" && (
            <div>
              {uploadedImage ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-white border border-border rounded-xl">
                    <img
                      src={uploadedImage}
                      alt="Signature"
                      className="max-h-32 object-contain"
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-8 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary-light/30 transition-all text-center"
                >
                  <svg className="w-8 h-8 mx-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-text-secondary">
                    PNG, JPG
                  </p>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-surface-alt">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text transition-colors"
          >
            {dict.signature.clear}
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {dict.signature.apply}
          </button>
        </div>
      </div>
    </div>
  );
}
