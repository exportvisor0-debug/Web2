import React, { useState, useRef, useCallback } from "react";
import { ZoomIn, Leaf } from "lucide-react";

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
}

export const LeatherImageMagnifier: React.FC<LeatherImageMagnifierProps> = ({
  src,
  alt,
  zoomLevel = 2.4,
  aspectRatioClass = "aspect-[4/3]",
  className = "",
  category,
  badgeLabel,
  isSustainable,
  onClick,
  showInstructions = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [cursorPx, setCursorPx] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setMousePos({ x: xPercent, y: yPercent });
    setCursorPx({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setIsHovered(true);
    setMousePos({ x: xPercent, y: yPercent });
    setCursorPx({ x, y });
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      className={`relative ${aspectRatioClass} bg-stone-100 dark:bg-stone-900 overflow-hidden cursor-crosshair select-none group/lens ${className}`}
      aria-label={`${alt} - Hover or touch to magnify leather grain details`}
    >
      {/* High-Resolution Leather Image with Micro-Fidelity Coordinate Scaling */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center will-change-transform"
        style={{
          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
          transform: isHovered ? `scale(${zoomLevel})` : "scale(1)",
          transition: isHovered
            ? "transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)"
            : "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Bottom Scrim for badges & category label */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-35" : "opacity-100"
        }`}
      />

      {/* Eco / LWG Sustainability Tag */}
      {isSustainable && (
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold tracking-wide shadow-xs">
          <Leaf className="w-3 h-3 text-emerald-400" />
          <span className="hidden xs:inline">LWG & Eco-Compliant</span>
          <span className="xs:hidden">Eco</span>
        </div>
      )}

      {/* Default Idle State: "Inspect Grain" Kicker */}
      {showInstructions && (
        <div
          className={`absolute top-2.5 right-2.5 z-20 pointer-events-none transition-all duration-300 ${
            isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md text-[#E5BE58] border border-[#C89D43]/50 text-[10px] font-medium shadow-md">
            <ZoomIn className="w-3 h-3 text-[#E5BE58]" />
            <span className="tracking-wide">Inspect Grain ({zoomLevel}x)</span>
          </div>
        </div>
      )}

      {/* Active Magnification Loupe Badge */}
      <div
        className={`absolute top-2.5 right-2.5 z-20 pointer-events-none transition-all duration-200 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#15120E]/90 backdrop-blur-md text-[#E5BE58] border border-[#C89D43]/60 text-[10px] font-mono font-medium shadow-gold-subtle">
          <ZoomIn className="w-3 h-3 text-[#E5BE58]" />
          <span>GRAIN LOUPE · {zoomLevel}x</span>
        </div>
      </div>

      {/* Floating Magnifier Crosshair / Aperture Reticle following cursor */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-10 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C89D43]/70 shadow-[0_0_15px_rgba(200,157,67,0.4)] hidden md:block"
          style={{
            left: `${cursorPx.x}px`,
            top: `${cursorPx.y}px`,
          }}
        >
          {/* Crosshair ticks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#E5BE58]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#E5BE58]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-[#E5BE58]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-[#E5BE58]" />
        </div>
      )}

      {/* Bottom Category and Badge Label Strip */}
      <div
        className={`absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between text-xs text-white pointer-events-none transition-opacity duration-200 ${
          isHovered ? "opacity-25" : "opacity-100"
        }`}
      >
        {category && <span className="font-medium tracking-wide drop-shadow-sm">{category}</span>}
        {badgeLabel && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5BE58] px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-[#C89D43]/40">
            {badgeLabel}
          </span>
        )}
      </div>
    </div>
  );
};
