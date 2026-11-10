import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { navigateTo } from "../utils/router";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  ArrowUpRight,
  Shield,
  FileText,
} from "lucide-react";

interface FooterProps {
  onOpenCompanyProfile: () => void;
  onRequestQuote: (productName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCompanyProfile,
  onRequestQuote,
}) => {
  const { t, language } = useLanguage();
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  // Footer is intentionally permanent luxury dark obsidian anchor with white brand logo
  const logoSrc = "/assets/branding/logo-white.png";

  return (
    <footer className="bg-[#0E0B09] text-stone-300 pt-16 pb-12 border-t border-[#C89D43]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Sourcing Statement (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center py-1">
              <img
                src={logoSrc}
                alt="ExportVisor - Go Global With ExportVisor"
                className="h-9 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/Logo3_4.png";
                }}
              />
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 text-xs text-stone-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C89D43] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={siteConfig.company.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View ExportVisor office location on Google Maps"
                    className="hover:text-white transition-colors block leading-relaxed"
                  >
                    <span>{siteConfig.company.address}</span>
                    <span className="text-[11px] text-[#E5BE58] hover:underline font-semibold block mt-0.5">
                      {t.footer.openInMaps} ↗
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C89D43] shrink-0" />
                <a
                  href={siteConfig.contact.emailUrl}
                  onClick={() => trackEvent("email_click", { location: "footer" })}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C89D43] shrink-0" />
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "footer" })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {siteConfig.contact.whatsappFormatted}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click")}
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors border border-white/15"
                aria-label="ExportVisor LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("facebook_click")}
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors border border-white/15"
                aria-label="ExportVisor Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("instagram_click")}
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors border border-white/15"
                aria-label="ExportVisor Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Leather Scope (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              {t.footer.categories}
            </h4>
            <ul className="text-xs text-stone-300 space-y-2">
              <li>
                <button
                  onClick={() => onRequestQuote("Crust Leather")}
                  className="hover:text-[#E5BE58] transition-colors text-left cursor-pointer"
                >
                  {language === "bn" ? "ক্রাস্ট লেদার (ন্যাচারাল ও মিলিং)" : "Crust Leather (Natural & Milling)"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Finished Leather")}
                  className="hover:text-[#E5BE58] transition-colors text-left cursor-pointer"
                >
                  {language === "bn" ? "ফিনিশড লেদার (ফুল ও টপ গ্রেইন)" : "Finished Leather (Full / Top Grain)"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Wet Blue Leather")}
                  className="hover:text-[#E5BE58] transition-colors text-left cursor-pointer"
                >
                  {language === "bn" ? "ওয়েট ব্লু ক্রোম ট্যানড হাইডস" : "Wet Blue Chrome Tanned Hides"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Aniline & Semi-Aniline")}
                  className="hover:text-[#E5BE58] transition-colors text-left cursor-pointer"
                >
                  {language === "bn" ? "অ্যানিলিন ও সেমি-অ্যানিলিন লেদার" : "Aniline & Semi-Aniline Leather"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Corrected Grain Leather")}
                  className="hover:text-[#E5BE58] transition-colors text-left cursor-pointer"
                >
                  {language === "bn" ? "কারেক্টেড গ্রেইন ও এমবসিং" : "Corrected Grain & Embossed"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Custom Sourcing")}
                  className="hover:text-[#E5BE58] transition-colors text-left cursor-pointer"
                >
                  {language === "bn" ? "বায়ার কাস্টম স্পেসিফিকেশন" : "Buyer Custom Specification"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Process (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="text-xs text-stone-300 space-y-2">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/about", true);
                  }}
                  className="hover:text-[#E5BE58] transition-colors"
                >
                  {language === "bn" ? "আমাদের পরিচিতি" : "About ExportVisor"}
                </a>
              </li>
              <li>
                <a
                  href="/knowledge-hub"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/knowledge-hub", true);
                  }}
                  className="hover:text-[#C89D43] dark:hover:text-white transition-colors"
                >
                  Leather Knowledge Hub
                </a>
              </li>
              <li>
                <a
                  href="/bangladesh-sourcing"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/bangladesh-sourcing", true);
                  }}
                  className="hover:text-[#C89D43] dark:hover:text-white transition-colors"
                >
                  Bangladesh Tannery Hub
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCompanyProfile}
                  className="hover:text-[#C89D43] dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  Company Profile (PDF)
                </button>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/faq", true);
                  }}
                  className="hover:text-[#C89D43] dark:hover:text-white transition-colors"
                >
                  Tannery & Export FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Commercial Terms & CTA (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Commercial Terms
            </h4>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs space-y-1.5 text-stone-300">
              <div>
                <span className="text-stone-400">Order MOQ:</span>{" "}
                <strong className="text-white">Determined per RFQ</strong>
              </div>
              <div>
                <span className="text-stone-400">Quotation:</span>{" "}
                <strong className="text-white">Formulated per RFQ</strong>
              </div>
              <div>
                <span className="text-stone-400">Payment:</span>{" "}
                <strong className="text-white">LC / TT</strong>
              </div>
              <div className="pt-1 text-[11px] text-stone-400 italic">
                All pricing and schedules depend on RFQ specifications and volume.
              </div>
            </div>

            <button
              onClick={() => onRequestQuote()}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-all shadow-gold-subtle hover:shadow-gold-glow cursor-pointer"
            >
              <span>Submit Tannery Export RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#15120E]" />
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} ExportVisor. {t.footer.allRightsReserved}</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <ThemeSwitcher showLabel={true} />
            <button
              onClick={() => setLegalModal("privacy")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </button>
            <button
              onClick={() => setLegalModal("terms")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === "bn" ? "বাণিজ্যিক রপ্তানি শর্তাবলী" : "Export Trade & Commercial Terms"}
            </button>
            <a
              href={siteConfig.company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C89D43] transition-colors flex items-center gap-1 text-[11px]"
            >
              <MapPin className="w-3 h-3 text-[#C89D43]" />
              <span>{language === "bn" ? "ঢাকা, বাংলাদেশ (গুগল ম্যাপস)" : "Dhaka, Bangladesh (Google Maps)"}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Privacy Policy / Terms Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-white dark:bg-[#15100C] text-stone-800 dark:text-stone-200 rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl border border-stone-200 dark:border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-4">
              <h3 className="font-display text-xl font-semibold text-[#181310] dark:text-white">
                {legalModal === "privacy" ? "Privacy Policy" : "Export Trade & Commercial Terms"}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
              {legalModal === "privacy" ? (
                <>
                  <p>
                    <strong>ExportVisor</strong> respects the confidential commercial information and technical specifications submitted by international buyers.
                  </p>
                  <p>
                    All contact details, company information, target price points, and custom leather requirements provided through this website are used strictly for technical feasibility reviews, counter-sample coordination, and quotation formulation.
                  </p>
                  <p>
                    We do not sell, rent, or disclose proprietary buyer tech packs or trade secrets to unauthorized third parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>ExportVisor</strong> operates as the dedicated international export desk and manufacturing partner for premier leather tanneries in Savar, Dhaka, Bangladesh.
                  </p>
                  <p>
                    All commercial terms, batch minimums, and pricing quotations are non-binding until formalized through an official proforma invoice following technical RFQ review. Delivery schedules, exact specifications, and payment conditions are governed exclusively by definitive trade contracts agreed between the parties.
                  </p>
                  <p>
                    We do not own shipping lines or private customs authorities; logistics timelines remain subject to international maritime conditions.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 text-xs font-semibold bg-[#181310] dark:bg-[#C89D43] text-white dark:text-[#120E0B] rounded hover:bg-[#2C211B] dark:hover:bg-[#D6AC4B] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
