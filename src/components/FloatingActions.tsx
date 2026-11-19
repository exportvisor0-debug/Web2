import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { ArrowUpRight, X } from "lucide-react";

interface FloatingActionsProps {
  onRequestQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onRequestQuote,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating actions after scrolling past the hero
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick contact and export inquiry options"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* WhatsApp Tooltip */}
      {showTooltip && (
        <div className="pointer-events-auto bg-white dark:bg-[#181310] text-stone-900 dark:text-white p-3 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 text-xs max-w-xs animate-fade-in relative mb-1">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-200 dark:border-white/10">
            <span className="font-bold text-[#9E731C] dark:text-[#E5BE58] text-[11px] uppercase tracking-wider font-mono">
              Tannery Export Desk
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-white cursor-pointer"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
            Direct factory desk in Savar, Dhaka: WhatsApp our specialists for immediate specification review and direct factory FOB/CIF pricing.
          </p>
          <div className="mt-2 text-[10px] text-stone-400 font-mono">
            {siteConfig.contact.whatsappFormatted}
          </div>
          <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white dark:bg-[#181310] rotate-45 border-r border-b border-stone-200 dark:border-stone-800" />
        </div>
      )}

      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Floating Quick Quote Button */}
        <button
          onClick={() => {
            trackEvent("request_quote_click", { location: "floating_action" });
            onRequestQuote();
          }}
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] text-stone-950 text-xs font-bold rounded-full shadow-gold-subtle hover:shadow-gold-glow transition-all cursor-pointer"
        >
          <span>Request Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-950" />
        </button>

        {/* Deep Rich Emerald Green Floating WhatsApp Button (Eye-Catchy, Non-Black Dark Green) */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
          className="w-12 h-12 bg-gradient-to-br from-[#0F7A3E] via-[#0B6131] to-[#064522] hover:from-[#138E49] hover:to-[#08552B] border-2 border-[#34D399]/80 ring-2 ring-white/90 dark:ring-[#10B981]/35 text-white rounded-full flex items-center justify-center shadow-lg shadow-[#064522]/50 hover:shadow-xl hover:shadow-[#0B6131]/65 transition-all transform hover:scale-105 group relative cursor-pointer"
          aria-label="WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            fill="#FFFFFF"
            style={{ color: "#FFFFFF" }}
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.391c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.016-1.297-4.984-4.344-5.141-4.547-.141-.203-1.219-1.625-1.219-3.094 0-1.469.766-2.188 1.047-2.484.266-.297.594-.375.797-.375.203 0 .391.016.563.016.188 0 .438-.078.672.5.25.594.844 2.063.922 2.219.078.141.125.313.031.516-.094.203-.141.328-.281.5-.141.172-.297.375-.422.516-.141.141-.297.297-.125.578.172.297.766 1.266 1.641 2.047 1.125 1 2.078 1.313 2.375 1.453.297.141.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.141.266.094 1.719.813 2.016.953.297.156.484.234.563.359.078.141.078.797-.172 1.5z" />
          </svg>
          <span className="sr-only">WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
