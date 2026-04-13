"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface SignaturePlacement {
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  width: number; // percentage of container width
  page: number;
}

interface SignatureOverlayProps {
  signatureDataUrl: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPlacementChange: (placement: SignaturePlacement) => void;
  currentPage: number;
  onRemove: () => void;
}

export function SignatureOverlay({
  signatureDataUrl,
  containerRef,
  onPlacementChange,
  currentPage,
  onRemove,
}: SignatureOverlayProps) {
  const [position, setPosition] = useState({ x: 50, y: 70 }); // default: center-bottom
  const [width, setWidth] = useState(25); // 25% of container
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const resizeStart = useRef({ clientX: 0, startWidth: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  // Report placement changes
  useEffect(() => {
    onPlacementChange({
      x: position.x,
      y: position.y,
      width,
      page: currentPage,
    });
  }, [position, width, currentPage, onPlacementChange]);

  const getRelativePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      };
    },
    [containerRef]
  );

  // --- Drag handlers ---
  const handleDragStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(true);
      dragStart.current = {
        x: clientX,
        y: clientY,
        posX: position.x,
        posY: position.y,
      };
    },
    [position]
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((clientX - dragStart.current.x) / rect.width) * 100;
      const dy = ((clientY - dragStart.current.y) / rect.height) * 100;
      setPosition({
        x: Math.max(0, Math.min(100, dragStart.current.posX + dx)),
        y: Math.max(0, Math.min(100, dragStart.current.posY + dy)),
      });
    },
    [isDragging, containerRef]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // --- Resize handlers ---
  const handleResizeStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setIsResizing(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      resizeStart.current = { clientX, startWidth: width };
    },
    [width]
  );

  const handleResizeMove = useCallback(
    (clientX: number) => {
      if (!isResizing || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((clientX - resizeStart.current.clientX) / rect.width) * 100;
      setWidth(Math.max(10, Math.min(60, resizeStart.current.startWidth + dx)));
    },
    [isResizing, containerRef]
  );

  // --- Global mouse/touch events ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDragMove(e.clientX, e.clientY);
      if (isResizing) handleResizeMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
      if (isResizing) {
        e.preventDefault();
        handleResizeMove(e.touches[0].clientX);
      }
    };
    const handleEnd = () => handleDragEnd();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, isResizing, handleDragMove, handleDragEnd, handleResizeMove]);

  return (
    <div
      ref={overlayRef}
      className={`absolute select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${width}%`,
        transform: `translate(-50%, -50%)${isDragging ? " scale(1.03)" : ""}`,
        transition: isDragging ? "none" : "transform 0.15s ease",
        touchAction: "none",
        zIndex: 20,
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        handleDragStart(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      {/* Signature image with border */}
      <div
        className={`relative border-2 rounded-lg p-1 transition-colors ${
          isDragging || isResizing
            ? "border-primary bg-primary-light/30"
            : "border-primary/50 hover:border-primary bg-white/30"
        }`}
      >
        <img
          src={signatureDataUrl}
          alt="Signature"
          className="w-full h-auto pointer-events-none"
          draggable={false}
        />

        {/* Remove button — larger on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove signature"
          className="absolute -top-3.5 -right-3.5 sm:-top-2.5 sm:-right-2.5 w-8 h-8 sm:w-6 sm:h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Resize handle — larger on mobile */}
        <div
          role="slider"
          aria-label="Resize signature"
          className="absolute -bottom-2.5 -right-2.5 sm:-bottom-1.5 sm:-right-1.5 w-8 h-8 sm:w-5 sm:h-5 bg-primary rounded-full cursor-se-resize flex items-center justify-center shadow-sm"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        >
          <svg className="w-3.5 h-3.5 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 20L20 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
