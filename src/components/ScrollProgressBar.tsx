import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { scrollToSection } from "../utils/router";

interface SectionMilestone {
  id: string;
  en: string;
  bn: string;
}

const SECTIONS: SectionMilestone[] = [
  { id: "hero", en: "Overview", bn: "পরিচিতি" },
  { id: "leather-products", en: "Leather Catalogue", bn: "লেদার ক্যাটালগ" },
  { id: "leather-glossary", en: "Leather Glossary", bn: "লেদার পরিভাষা" },
  { id: "about", en: "Tannery Operations", bn: "ট্যানারি কার্যক্রম" },
  { id: "commercial-terms", en: "Commercial Terms", bn: "বাণিজ্যিক শর্তাবলী" },
  { id: "leather-care", en: "Care & Storage", bn: "রক্ষণাবেক্ষণ ও সংরক্ষণ" },
  { id: "knowledge-hub", en: "Knowledge Hub", bn: "নলেজ হাব" },
  { id: "bangladesh-sourcing", en: "Bangladesh Advantage", bn: "বাংলাদেশ অ্যাডভান্টেজ" },
  { id: "why-exportvisor", en: "Why ExportVisor", bn: "কেন এক্সপোর্টভাইজর" },
  { id: "contact", en: "Request a Quote", bn: "কোটেশন ও যোগাযোগ" },
  { id: "faq", en: "FAQ", bn: "সাধারণ জিজ্ঞাসা" },
];

export const ScrollProgressBar: React.FC = () => {
  const { language } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionMilestone>(SECTIONS[0]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        const clampedProgress = Math.min(100, Math.max(0, progress));
        setScrollProgress(clampedProgress);

        // Detect current section in view
        const scrollPosition = scrollTop + 160;
        let currentSec = SECTIONS[0];

        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              currentSec = SECTIONS[i];
              break;
            }
          }
        }
        setActiveSection(currentSec);

        // Trigger active scrolling indicator
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 1600);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const targetScroll = clickPercent * (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const showBadge = (isScrolling || isHovered) && scrollProgress > 2;

  const currentLabel = language === "bn" ? activeSection.bn : activeSection.en;
  const progressPercentText = `${Math.round(scrollProgress)}%`;

  return (
    <>
      {/* Topmost Fixed Progress Bar Track */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] sm:h-[3.5px] bg-stone-200/40 backdrop-blur-xs cursor-pointer group select-none"
        onClick={handleBarClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      >
        {/* Animated Gold Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-[#B88934] via-[#D6AC4B] to-[#F3CF72] transition-[width] duration-100 ease-out relative shadow-[0_0_8px_rgba(200,157,67,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Subtle glowing trailing spark at the tip */}
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/70 shadow-[0_0_6px_#FFE082]" />
        </div>
      </div>

      {/* Floating Micro Section Indicator (Non-intrusive HUD) */}
      <aside
        aria-label="Section Reading Progress Indicator"
        className={`fixed top-3 sm:top-3.5 right-3 sm:right-6 z-50 pointer-events-none transition-all duration-300 transform ${
          showBadge
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-1.5 scale-95 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection(activeSection.id, true)}
          className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 bg-white/95 dark:bg-[#181310]/95 hover:bg-stone-50 dark:hover:bg-[#181310] text-stone-800 dark:text-stone-200 rounded-full border border-stone-300 dark:border-[#C89D43]/40 shadow-lg backdrop-blur-md cursor-pointer transition-all hover:border-[#C89D43] group"
          title={`Currently reading: ${currentLabel}. Click to jump to section.`}
        >
          {/* Small static location dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#C89D43] shrink-0" />

          <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white truncate max-w-[140px] sm:max-w-[200px]">
            {currentLabel}
          </span>

          <span className="text-[10px] font-mono font-bold text-[#7A5A17] dark:text-[#E5BE58] pl-1 border-l border-stone-200 dark:border-stone-700">
            {progressPercentText}
          </span>
        </button>
      </aside>
    </>
  );
};
