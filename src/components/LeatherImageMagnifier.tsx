import React, { useState, useRef, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, Maximize2, X, Leaf } from "lucide-react";

interface LeatherImageMagnifierProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  aspectRatioClass?: string;
  className?: string;
  category?: string;
  badgeLabel?: string;
  isSustainable?: boolean;
  onClick?: () => void;
  showInstructions?: boolean;
  mode?: "card" | "detail";
}

const ASSET_VERSION = "4k3";

function toFastThumbUrl(src: string): string {
  if (!src.startsWith("/assets/products/") || !src.endsWith(".jpg")) {
    return `${src}?v=${ASSET_VERSION}`;
  }
  const file = src.slice("/assets/products/".length, -4);
  return `/assets/products/thumbs/${file}.webp?v=${ASSET_VERSION}`;
}

function to4kWebpUrl(src: string): string {
  if (!src.startsWith("/assets/products/") || !src.endsWith(".jpg")) {
    return `${src}?v=${ASSET_VERSION}`;
  }
  const file = src.slice("/assets/products/".length, -4);
  return `/assets/products/4k/${file}.webp?v=${ASSET_VERSION}`;
}

function toFallback4kUrl(src: string): string {
  return src.includes("?") ? `${src}&v=${ASSET_VERSION}` : `${src}?v=${ASSET_VERSION}`;
}

export const LeatherImageMagnifier: React.FC<LeatherImageMagnifierProps> = ({
  src,
  alt,
  zoomLevel = 3,
  aspectRatioClass = "aspect-[4/3]",
  className = "",
  isSustainable,
  onClick,
  showInstructions = true,
  mode = "card",
}) => {
  const [loupeActive, setLoupeActive] = useState(false);
  const [activeZoom, setActiveZoom] = useState<number>(mode === "detail" ? 1 : zoomLevel);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsZoom, setFsZoom] = useState<number>(1);
  const [fsPan, setFsPan] = useState({ x: 50, y: 50 });
  const [prefer4k, setPrefer4k] = useState<boolean>(mode === "detail");
  const [fallbackTier, setFallbackTier] = useState<0 | 1 | 2>(0);
  const [panPos, setPanPos] = useState({ x: 50, y: 50 });
  const [cursorPx, setCursorPx] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fsContainerRef = useRef<HTMLDivElement>(null);
  const preloaded4kRef = useRef<boolean>(false);

  useEffect(() => {
    setFallbackTier(0);
    setPrefer4k(mode === "detail");
    preloaded4kRef.current = false;
  }, [src, mode]);

  const preload4k = useCallback(() => {
    if (preloaded4kRef.current) return;
    preloaded4kRef.current = true;
    const img = new window.Image();
    img.src = to4kWebpUrl(src);
  }, [src]);

  useEffect(() => {
    if (!isFullscreen) {
      setFsZoom(1);
      setFsPan({ x: 50, y: 50 });
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullscreen]);

  const effectiveZoom =
    mode === "detail" ? activeZoom : loupeActive ? zoomLevel : 1;

  const isZoomed = effectiveZoom > 1;
  const imgError = fallbackTier >= 2;
  const displaySrc =
    fallbackTier === 1
      ? toFallback4kUrl(src)
      : prefer4k || isZoomed || isFullscreen
      ? to4kWebpUrl(src)
      : toFastThumbUrl(src);

  const fullscreenSrc =
    fallbackTier >= 1 ? toFallback4kUrl(src) : to4kWebpUrl(src);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    setPanPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
    setCursorPx({ x, y });
  }, []);

  const updateFsPointer = useCallback((clientX: number, clientY: number) => {
    if (!fsContainerRef.current) return;
    const rect = fsContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    setFsPan({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      updatePointer(e.clientX, e.clientY);
    },
    [isZoomed, updatePointer]
  );

  const handleMouseLeave = useCallback(() => {
    if (mode === "card" && loupeActive) {
      setLoupeActive(false);
    }
    setPanPos({ x: 50, y: 50 });
  }, [mode, loupeActive]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isZoomed || !e.touches[0]) return;
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    },
    [isZoomed, updatePointer]
  );

  const handleToggleCardLoupe = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPrefer4k(true);
    if (!loupeActive && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      setPanPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
      setCursorPx({ x, y });
    }
    setLoupeActive((prev) => !prev);
  };

  const handleOpenFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPrefer4k(true);
    setIsFullscreen(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={preload4k}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onClick={onClick}
        className={`relative ${aspectRatioClass} bg-stone-100 dark:bg-stone-900 overflow-hidden select-none group/lens ${
          isZoomed ? "cursor-crosshair" : onClick ? "cursor-pointer" : "cursor-default"
        } ${className}`}
        aria-label={`${alt} - ${mode === "detail" ? "Select zoom level to inspect 4K grain" : "Click to inspect full technical details"}`}
      >
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800 p-4 text-center">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 line-clamp-2">
              {alt}
            </span>
          </div>
        ) : (
          <img
            src={displaySrc}
            alt={alt}
            onError={() => setFallbackTier((prev) => (prev < 2 ? ((prev + 1) as 0 | 1 | 2) : 2))}
            className={`w-full h-full object-cover object-center will-change-transform ${
              !isZoomed && mode === "card"
                ? "group-hover/lens:scale-[1.03] transition-transform duration-300 ease-out"
                : ""
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${panPos.x}% ${panPos.y}%`,
                    transform: `scale(${effectiveZoom})`,
                    transition: "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }
                : undefined
            }
            loading={mode === "detail" ? "eager" : "lazy"}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Single Subtle Eco Marker (Top-Left, only when LWG/Eco certified) */}
        {isSustainable && !isZoomed && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-emerald-300 text-[10px] font-semibold tracking-wide">
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>Eco / LWG</span>
          </div>
        )}

        {/* Active Loupe Crosshair Reticle (Desktop when zoomed) */}
        {isZoomed && (
          <div
            className="absolute pointer-events-none z-10 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E5BE58]/80 shadow-[0_0_16px_rgba(200,157,67,0.4)] hidden md:block"
            style={{
              left: `${cursorPx.x}px`,
              top: `${cursorPx.y}px`,
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#E5BE58]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#E5BE58]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-[#E5BE58]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-[#E5BE58]" />
          </div>
        )}

        {/* Card Mode Controls: Unobtrusive Bottom-Right Zoom & Fullscreen Buttons */}
        {mode === "card" && showInstructions && (
          <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover/lens:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={handleToggleCardLoupe}
              title={loupeActive ? "Reset Zoom (1x)" : `Inspect 4K Grain (${zoomLevel}x)`}
              aria-label={loupeActive ? "Reset grain zoom" : "Inspect 4K leather grain zoom"}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold backdrop-blur-md border transition-colors cursor-pointer shadow-sm ${
                loupeActive
                  ? "bg-[#C89D43] text-[#15120E] border-[#E5BE58]"
                  : "bg-black/75 text-white border-white/20 hover:bg-black/90"
              }`}
            >
              {loupeActive ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span>1x</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-[#E5BE58]" />
                  <span>{zoomLevel}x</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenFullscreen}
              title="Open 4K Full Screen View"
              aria-label="Open 4K full screen leather swatch view"
              className="p-1.5 rounded-lg bg-black/75 text-white border border-white/20 hover:bg-black/90 backdrop-blur-md transition-colors cursor-pointer shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#E5BE58]" />
            </button>
          </div>
        )}

        {/* Detail Mode Controls: Clear 1x / 2x / 3x / 4x Zoom Selector + 4K View */}
        {mode === "detail" && (
          <div
            className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15">
              {[1, 2, 3, 4].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setActiveZoom(lvl);
                    if (lvl === 1) setPanPos({ x: 50, y: 50 });
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                    activeZoom === lvl
                      ? "bg-[#C89D43] text-[#15120E]"
                      : "text-stone-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {lvl}x
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleOpenFullscreen}
              title="Expand Full Screen 4K"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#E5BE58]" />
              <span>4K View</span>
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen 4K Lightbox Modal with Interactive Zoom & Pan */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-black/94 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setIsFullscreen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} 4K preview`}
        >
          <div
            className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 mb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2 py-0.5 rounded bg-[#C89D43] text-[#15120E] text-[10px] font-mono font-extrabold tracking-wider shrink-0">
                4K UHD
              </span>
              <span className="text-sm sm:text-base font-medium truncate pr-2">
                {alt}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/10 border border-white/15">
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setFsZoom(lvl);
                      if (lvl === 1) setFsPan({ x: 50, y: 50 });
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                      fsZoom === lvl
                        ? "bg-[#C89D43] text-[#15120E]"
                        : "text-stone-200 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    {lvl}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close 4K view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={fsContainerRef}
            onMouseMove={(e) => {
              if (fsZoom > 1) updateFsPointer(e.clientX, e.clientY);
            }}
            onTouchMove={(e) => {
              if (fsZoom > 1 && e.touches[0]) {
                updateFsPointer(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (fsZoom === 1) {
                updateFsPointer(e.clientX, e.clientY);
                setFsZoom(3);
              } else {
                setFsZoom(1);
                setFsPan({ x: 50, y: 50 });
              }
            }}
            className={`relative max-w-6xl w-full aspect-[4/3] max-h-[82vh] rounded-xl overflow-hidden bg-stone-950 border border-white/15 shadow-2xl select-none ${
              fsZoom > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            <img
              src={fullscreenSrc}
              alt={alt}
              onError={() => setFallbackTier((prev) => (prev < 2 ? 1 : 2))}
              className="w-full h-full object-contain will-change-transform"
              style={
                fsZoom > 1
                  ? {
                      transformOrigin: `${fsPan.x}% ${fsPan.y}%`,
                      transform: `scale(${fsZoom})`,
                      transition: "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }
                  : undefined
              }
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="mt-2.5 text-xs text-stone-400">
            Click photo or select 1x–4x to inspect 4K leather pores and grain · Move cursor to pan
          </p>
        </div>
      )}
    </>
  );
};
