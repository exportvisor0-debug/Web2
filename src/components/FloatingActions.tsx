import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { MessageSquareText, ArrowUpRight, X } from "lucide-react";

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
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] text-[#15120E] text-xs font-bold rounded-full shadow-gold-subtle hover:shadow-gold-glow transition-all cursor-pointer"
        >
          <span>Request Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#15120E]" />
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group relative cursor-pointer"
          aria-label="Chat with ExportVisor Tannery Export Desk on WhatsApp"
        >
          <MessageSquareText className="w-6 h-6" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
