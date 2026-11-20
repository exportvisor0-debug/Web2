import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SupportedLanguage,
  TRANSLATIONS,
  LANGUAGE_OPTIONS,
  LanguageOption,
  TranslationDictionary,
} from "../i18n/translations";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  options: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronously initialize language from localStorage or URL param to prevent reload flicker
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window === "undefined") return "en";
    try {
      // 1. Prioritize explicit URL param ?lang=xx
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang") as SupportedLanguage;
      if (urlLang && TRANSLATIONS[urlLang]) {
        localStorage.setItem("exportvisor_lang", urlLang);
        return urlLang;
      }

      // 2. Read persisted language preference from localStorage
      const saved = localStorage.getItem("exportvisor_lang") as SupportedLanguage;
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // Fallback in restricted or private browsing mode
    }
    return "en";
  });

  // Cross-tab synchronization: keep language in sync across multiple tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "exportvisor_lang" && e.newValue && TRANSLATIONS[e.newValue as SupportedLanguage]) {
        setLanguageState(e.newValue as SupportedLanguage);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Only apply homepage hero SEO when active route is "/" so deep links & /product/:slug SEO stay intact
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
    if (currentPath !== "/") {
      return;
    }

    const activeT = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (activeT && activeT.hero) {
      const homeTitle =
        language === "en"
          ? "Reliable Leather Exporter Bangladesh | ExportVisor"
          : `${activeT.hero.headline} | ExportVisor`;
      const homeDesc =
        language === "en"
          ? "Reliable leather exporter from Bangladesh. Direct Savar tannery supplying wet blue, crust, finished full grain, split suede and shoe lining leather."
          : activeT.hero.subheadline;

      document.title = homeTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", homeDesc);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", homeTitle);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", homeDesc);
      }
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("exportvisor_lang", lang);
      const url = new URL(window.location.href);
      if (lang === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", lang);
      }
      window.history.replaceState(null, "", url.toString());
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, options: LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
