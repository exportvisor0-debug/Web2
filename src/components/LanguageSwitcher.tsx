import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";
import { trackEvent } from "../utils/analytics";

interface LanguageSwitcherProps {
  className?: string;
  align?: "left" | "right";
  dropUp?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  align = "right",
  dropUp = false,
}) => {
  const { language, setLanguage, options } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = options.find((opt) => opt.code === language) || options[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (code: typeof language) => {
    setLanguage(code);
    setIsOpen(false);
    trackEvent("request_quote_click", { action: "language_switched", language: code });
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-[#181310] hover:bg-stone-200/80 dark:hover:bg-[#251D17] rounded-lg transition-colors cursor-pointer border border-stone-200/80 dark:border-[#C89D43]/30 focus:outline-none focus:ring-1 focus:ring-[#C89D43]"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select website language"
        title="Select language / Sprache wählen / Choisir la langue / Seleccionar idioma"
      >
        <Globe className="w-3.5 h-3.5 text-[#C89D43]" />
        <span className="uppercase font-mono text-[11px] font-bold tracking-wider">
          {currentOption.code}
        </span>
        <span className="hidden sm:inline text-[11px] text-stone-500 dark:text-stone-400">
          {currentOption.flag}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-stone-400 dark:text-stone-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#C89D43]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} ${
            dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } z-50 w-52 max-h-88 overflow-y-auto rounded-xl bg-white/98 dark:bg-[#120E0B]/98 backdrop-blur-xl border border-stone-200 dark:border-[#C89D43]/35 shadow-xl py-1 text-xs divide-y divide-stone-100 dark:divide-stone-800/80 animate-fade-in`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58] flex items-center justify-between">
            <span>Select Language</span>
            <span className="font-mono text-[9px] text-stone-400">11 Languages</span>
          </div>
          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-stone-50 dark:hover:bg-[#1A1410] transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#C89D43]/15 font-bold text-[#181310] dark:text-[#F8F5F0]"
                      : "text-stone-700 dark:text-stone-300"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm" aria-hidden="true">
                      {opt.flag}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs leading-none font-medium">
                        {opt.nativeName}
                      </span>
                      <span className="text-[10px] text-stone-400 leading-none mt-0.5">
                        {opt.name}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C89D43]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
