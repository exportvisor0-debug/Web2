import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "../context/ThemeContext";
import {
  Menu,
  X,
  ArrowUpRight,
  MessageSquareText,
  Mail,
  Phone,
  Globe,
  Check,
  ChevronDown,
  Layers,
  ShieldCheck,
  BookOpen,
  FileText,
  Award,
  FileSpreadsheet,
} from "lucide-react";
import { navigateTo, scrollToSection } from "../utils/router";

interface HeaderProps {
  onRequestQuote: (prefillProduct?: string) => void;
  onOpenCompanyProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRequestQuote,
  onOpenCompanyProfile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leatherDropdownOpen, setLeatherDropdownOpen] = useState(false);
  const [mobileLeatherOpen, setMobileLeatherOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { t, language, setLanguage, options } = useLanguage();
  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/assets/branding/logo-white.png" : "/Logo3_4.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLeatherDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLeatherDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setLeatherDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setLeatherDropdownOpen(false);
    }, 150);
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setLeatherDropdownOpen(false);
    if (path.startsWith("/#") || path.startsWith("#")) {
      const sectionId = path.replace(/^\/?#/, "");
      scrollToSection(sectionId, true);
    } else {
      navigateTo(path, true);
    }
  };

  // Structured 8-item mega suite under "Leather & Sourcing"
  const leatherSubMenu = [
    {
      id: "products",
      path: "/products",
      icon: Layers,
      title: language === "bn" ? "চামড়া পণ্য ক্যাটালগ" : "Product Catalogue",
      badge: language === "bn" ? "সাভার কালেকশন" : "Savar Hides",
      desc:
        language === "bn"
          ? "ফিনিশড, ক্রাস্ট ও ওয়েট ব্লু গরুর ও ছাগলের চামড়া"
          : "Cow, buffalo & goat in finished, crust and wet blue",
    },
    {
      id: "care",
      path: "/#leather-care",
      icon: ShieldCheck,
      title: language === "bn" ? "রক্ষণাবেক্ষণ ও শিপিং গাইড" : "Moisture & Transit Care",
      badge: language === "bn" ? "সংরক্ষণ" : "Preservation",
      desc:
        language === "bn"
          ? "সমুদ্রপথে কন্টেইনার আর্দ্রতা নিয়ন্ত্রণ ও গুদামজাতকরণ"
          : "Sea freight container humidity & warehouse storage rules",
    },
    {
      id: "knowledge",
      path: "/knowledge-hub",
      icon: BookOpen,
      title: language === "bn" ? "টেকনিক্যাল নলেজ হাব" : "Technical Knowledge Hub",
      badge: language === "bn" ? "কমপ্লায়েন্স" : "REACH & Specs",
      desc:
        language === "bn"
          ? "রাসায়নিক প্যারামিটার, ছত্রাকনাশক ও ফাইবার আর্দ্রতা"
          : "Chemical benchmarks, biocide wash & hydration advisory",
    },
    {
      id: "glossary",
      path: "/glossary",
      icon: FileText,
      title: language === "bn" ? "লেদার গাইড ও পরিভাষা" : "Industry Glossary",
      badge: language === "bn" ? "শব্দকোষ" : "Terminology",
      desc:
        language === "bn"
          ? "ওয়েট ব্লু, ক্রাস্ট, স্প্লিট ও টেম্পার সংক্রান্ত ব্যাখ্যা"
          : "Essential guide to wet blue, split, temper & substance",
    },
    {
      id: "grading",
      path: "/#grading-guide",
      icon: Award,
      title: language === "bn" ? "ভিজ্যুয়াল গ্রেডিং নির্দেশিকা" : "Visual Grading Guide",
      badge: language === "bn" ? "টেবিল ১-৪" : "Table I–IV",
      desc:
        language === "bn"
          ? "ইতালীয় সেল্টা, আমেরিকান এলআইএ ও কাটিং ফলন মানদণ্ড"
          : "Italian Scelta, American LIA & cutting yield benchmarks",
    },
    {
      id: "terms",
      path: "/terms",
      icon: FileSpreadsheet,
      title: language === "bn" ? "বাণিজ্যিক শর্তাবলী ও ইনকোটর্মস" : "Commercial Terms & RFQ",
      badge: language === "bn" ? "ইনকোটর্মস" : "Incoterms & MOQ",
      desc:
        language === "bn"
          ? "এফওবি চট্টগ্রাম, সিএফআর ও এলসি ৯০ দিনের শর্তাবলী"
          : "FOB Chittagong, CFR, LC 90-day benchmarks & lead times",
    },
  ];

  const currentOption = options.find((opt) => opt.code === language) || options[0];

  return (
    <>
      {/* ExportVisor Signature Brand Gradient Hairline Strip matching Logo */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#B3861F] via-[#F5D275] to-[#C89D43] z-50 relative shrink-0" />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 dark:bg-[#0B0806]/95 backdrop-blur-md ${
          isScrolled
            ? "border-b border-[#C89D43]/25 dark:border-stone-800/90 shadow-xs py-2.5 sm:py-3"
            : "border-b border-[#C89D43]/15 dark:border-stone-800/60 py-3 sm:py-3.5 shadow-2xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-4">
            
            {/* Zone 1: Brand Logo */}
            <a
              href="/"
              className="flex items-center group py-0.5 shrink-0 max-w-[130px] sm:max-w-[190px]"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/", true);
              }}
              title="ExportVisor - Go Global with ExportVisor"
            >
              <img
                src={logoSrc}
                alt="ExportVisor - Bangladesh Leather Sourcing & Export"
                className="h-7 sm:h-9 md:h-10 w-auto max-w-[125px] sm:max-w-[190px] object-contain transition-transform duration-200 group-hover:scale-102"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    theme === "dark" ? "/assets/branding/logo-white.png" : "/Logo3_4.png";
                }}
              />
            </a>

            {/* Zone 2: Streamlined Desktop Navigation (Never breaks or wraps across ALL 11 languages) */}
            <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4 2xl:gap-5 text-xs xl:text-sm font-medium text-stone-700 dark:text-stone-300 shrink">
              
              {/* 1. About Link */}
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/about");
                }}
                className="whitespace-nowrap transition-colors hover:text-[#C89D43] py-1 font-semibold"
              >
                {t.nav.about}
              </a>

              {/* 2. Leather & Technical Hub - EYE-CATCHING DROPDOWN SUBMENU */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnterDropdown}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => setLeatherDropdownOpen(!leatherDropdownOpen)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap py-1 font-semibold transition-colors cursor-pointer group ${
                    leatherDropdownOpen
                      ? "text-[#C89D43]"
                      : "hover:text-[#C89D43] text-stone-700 dark:text-stone-300"
                  }`}
                  aria-expanded={leatherDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{t.nav.leather}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#C89D43] transition-transform duration-200 ${
                      leatherDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Flyout */}
                {leatherDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[640px] xl:w-[700px] animate-in fade-in-0 zoom-in-95 duration-150">
                    <div className="bg-white/98 dark:bg-[#120E0B]/98 backdrop-blur-xl border border-stone-200 dark:border-[#C89D43]/40 rounded-2xl shadow-2xl p-4 space-y-2.5">
                      
                      {/* Dropdown Header Strip */}
                      <div className="px-3 py-1.5 flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-[#181310]/70 rounded-xl">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#C89D43]" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A5A17] dark:text-[#E5BE58] font-bold">
                            {language === "bn"
                              ? "সাভার ট্যানারি হাব ও এক্সপোর্ট স্যুট"
                              : "Tannery Collections & Export Suite"}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                          {language === "bn" ? "সাভার, ঢাকা · ৫টি রিসোর্স" : "Savar, Dhaka · 5 Modules"}
                        </span>
                      </div>

                      {/* 2-Column Grid of 5 Modules */}
                      <div className="grid grid-cols-2 gap-2">
                        {leatherSubMenu.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <a
                              key={item.id}
                              href={item.path}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.path);
                              }}
                              className="group p-2.5 rounded-xl border border-stone-200/50 dark:border-stone-800/60 hover:border-[#C89D43]/50 hover:bg-stone-50 dark:hover:bg-[#181310] transition-all flex items-start gap-2.5 cursor-pointer bg-white/50 dark:bg-[#15100C]/50"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#C89D43]/15 text-[#C89D43] group-hover:bg-[#C89D43] group-hover:text-white dark:group-hover:text-[#120E0B] flex items-center justify-center shrink-0 mt-0.5 transition-all shadow-2xs">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C89D43] transition-colors truncate">
                                    {item.title}
                                  </span>
                                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 shrink-0 font-medium">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      {/* Dropdown Bottom Assistance Bar */}
                      <div className="pt-2 px-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                        <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                          {language === "bn"
                            ? "কাস্টম স্যাম্পল বা টেকনিক্যাল স্পেসিফিকেশন দরকার?"
                            : "Need custom specifications or counter samples?"}
                        </span>
                        <button
                          onClick={() => {
                            setLeatherDropdownOpen(false);
                            onRequestQuote("Custom Tannery Tech Pack Formulation");
                          }}
                          className="font-bold text-[#C89D43] hover:text-[#A67C24] dark:hover:text-[#E5BE58] inline-flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <span>{language === "bn" ? "কোটেশন পাঠান →" : "Request Quote →"}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Company Profile PDF Button */}
              <button
                onClick={onOpenCompanyProfile}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-[#C89D43] dark:hover:text-[#E5BE58] bg-stone-100/70 dark:bg-stone-800/50 hover:bg-[#C89D43]/10 border border-stone-200/80 dark:border-stone-700/60 transition-all cursor-pointer whitespace-nowrap"
                title="View and download ExportVisor Company Profile PDF"
              >
                <span>{t.nav.companyProfile}</span>
                <span className="text-[9px] font-mono uppercase font-bold px-1 rounded bg-[#C89D43]/20 text-[#7A5A17] dark:text-[#E5BE58]">
                  PDF
                </span>
              </button>
            </nav>

            {/* Zone 3: Desktop & Tablet Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0">
              
              {/* Theme Switcher - Light / Dark Mode Toggle */}
              <ThemeSwitcher />

              {/* Language Switcher - visible on tablet & desktop */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* WhatsApp Quick Link (Responsive visibility) */}
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { location: "header_quick_action" })
                }
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/80 dark:border-emerald-800/50 rounded-md transition-colors shadow-2xs"
                title="Connect directly on WhatsApp"
              >
                <MessageSquareText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="whitespace-nowrap hidden 2xl:inline">{t.nav.whatsApp}</span>
              </a>

              {/* Primary Request a Quote Button */}
              <button
                onClick={() => {
                  trackEvent("request_quote_click", { location: "header" });
                  onRequestQuote();
                }}
                className="hidden sm:inline-flex items-center justify-center px-3 sm:px-3.5 py-2 text-xs font-bold tracking-wide text-[#15120E] dark:text-white bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] dark:from-[#181310] dark:to-[#261E17] dark:hover:from-[#261E17] dark:hover:to-[#382C22] border border-[#C89D43]/50 rounded-md transition-all duration-150 shadow-gold-subtle hover:shadow-md cursor-pointer whitespace-nowrap group"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#15120E] dark:text-[#E5BE58] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Mobile Quick Flag Indicator (<640px) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="sm:hidden flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md"
                aria-label="Open language selection"
              >
                <span className="text-sm">{currentOption.flag}</span>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-600 dark:text-stone-300">
                  {currentOption.code}
                </span>
              </button>

              {/* Mobile Menu Hamburger Toggle (Visible on < lg, i.e. <1024px) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white lg:hidden focus:outline-none rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (100% responsive for all mobile & tablet screens) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white dark:bg-[#0B0806] animate-in fade-in-0 duration-150">
          
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#120E0B]">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="ExportVisor Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    theme === "dark" ? "/assets/branding/logo-white.png" : "/Logo3_4.png";
                }}
              />
              <ThemeSwitcher />
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 px-4 py-5 overflow-y-auto space-y-5">
            
            {/* Quick Actions (Request a Quote + WhatsApp) */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-lg text-xs font-bold bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-[#15120E] border border-[#C89D43]/60 shadow-xs cursor-pointer active:scale-98 transition-transform"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#15120E]" />
              </button>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("whatsapp_click", { location: "mobile_drawer" });
                }}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-98 transition-transform"
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>{t.nav.whatsApp}</span>
              </a>
            </div>

            {/* Language Selector Grid inside Drawer */}
            <div className="p-3.5 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C89D43]" />
                  Language / ভাষা / Sprache
                </span>
                <span className="text-xs font-semibold text-[#7A5A17] dark:text-[#E5BE58]">
                  {currentOption.nativeName}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {options.map((opt) => {
                  const isSelected = opt.code === language;
                  return (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        trackEvent("request_quote_click", {
                          action: "language_switched_mobile",
                          language: opt.code,
                        });
                      }}
                      className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#C89D43] text-stone-950 font-bold shadow-xs border border-[#C89D43]"
                          : "bg-stone-50 dark:bg-[#181310] hover:bg-stone-100 dark:hover:bg-[#221C16] text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm shrink-0">{opt.flag}</span>
                        <span className="truncate text-[11px] leading-tight font-medium">
                          {opt.nativeName}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-3 h-3 text-stone-950 shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold mb-2">
                Navigation
              </p>

              <div className="space-y-2">
                
                {/* 1. About Link */}
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("/about");
                  }}
                  className="p-3 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-[#C89D43] flex items-center justify-between shadow-2xs"
                >
                  <span>{t.nav.about}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400" />
                </a>

                {/* 2. Tannery Collections & Technical Suite (Accordion Group) */}
                <div className="bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setMobileLeatherOpen(!mobileLeatherOpen)}
                    className="w-full p-3 flex items-center justify-between text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-[#C89D43] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#C89D43]" />
                      <span>{t.nav.leather}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C89D43] transition-transform duration-200 ${
                        mobileLeatherOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileLeatherOpen && (
                    <div className="p-2 pt-0 space-y-1.5 border-t border-stone-100 dark:border-stone-800/80">
                      {leatherSubMenu.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <a
                            key={item.id}
                            href={item.path}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.path);
                            }}
                            className="p-2.5 rounded-lg bg-stone-50 dark:bg-[#181310] hover:bg-stone-100 dark:hover:bg-[#221C16] border border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-md bg-[#C89D43]/15 text-[#C89D43] flex items-center justify-center shrink-0">
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block truncate">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white dark:bg-[#120E0B] text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 shrink-0">
                              {item.badge}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Company Profile PDF */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCompanyProfile();
                  }}
                  className="w-full p-3 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-[#C89D43] flex items-center justify-between shadow-2xs cursor-pointer text-left"
                >
                  <span>{t.nav.companyProfile}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58]">
                    PDF
                  </span>
                </button>

              </div>
            </div>

            {/* Contact & Office info footer */}
            <div className="p-3.5 bg-stone-100/90 dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl text-xs space-y-2 text-stone-700 dark:text-stone-300">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 hover:text-[#C89D43]"
              >
                <Mail className="w-4 h-4 text-[#C89D43] shrink-0" />
                <span className="truncate">{siteConfig.contact.email}</span>
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{siteConfig.contact.whatsappFormatted}</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
