import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Droplets,
  ShieldAlert,
  Sun,
  Warehouse,
  Thermometer,
  Layers,
  FileCheck2,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { scrollToSection } from "../utils/router";
import { LeatherGradingGuide } from "./LeatherGradingGuide";
import { SectionShareButton } from "./SectionShareButton";

interface LeatherKnowledgeHubProps {
  onRequestQuote: (prefill?: string) => void;
}

export const LeatherKnowledgeHub: React.FC<LeatherKnowledgeHubProps> = ({
  onRequestQuote,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "wet-blue" | "crust" | "finished" | "receiving">("all");
  const [showAll, setShowAll] = useState<boolean>(false);

  const knowledgeItems = [
    {
      id: "wb-moisture",
      category: "wet-blue",
      categoryLabel: "Wet Blue Leather",
      title: "Moisture & Hydration Equilibrium",
      subtitle: "Preventing fiber desiccation during ocean transit",
      icon: Droplets,
      tips: [
        "Maintain target hide moisture content strictly between 50% and 60% within sealed polyethylene crate liners.",
        "Avoid prolonged storage in temperatures exceeding 30°C (86°F), which accelerates chemical evaporation and fiber shrinkage.",
        "Ensure wooden export pallets are certified ISPM-15 heat-treated to eliminate fungal spores and wood parasites.",
      ],
      technicalNote:
        "Severe moisture loss in wet blue causes irreversible chromium salt crystallization, impairing re-tanning dye uptake.",
    },
    {
      id: "wb-biocide",
      category: "wet-blue",
      categoryLabel: "Wet Blue Leather",
      title: "Mold & Biocidal Protection",
      subtitle: "Preserving chrome-tanned hides during sea freight",
      icon: ShieldAlert,
      tips: [
        "Verify standard bactericide/fungicide dosage (e.g. TCMTB or OIT formulations) applied during the final beamhouse wash.",
        "Monitor maritime container dew point; ensure desiccant bags are positioned above pallet wraps to absorb ceiling condensation.",
        "Inspect container door seals for watertight integrity before loading at Chittagong Port terminals.",
      ],
      technicalNote:
        "ExportVisor coordinates with tanneries to ensure standardized active biocidal concentrations for long-haul routes.",
    },
    {
      id: "crust-climate",
      category: "crust",
      categoryLabel: "Crust Leather",
      title: "Atmospheric Conditioning & Humidity",
      subtitle: "Maintaining fiber suppleness before final finishing",
      icon: Warehouse,
      tips: [
        "Store crust bundles in climate-controlled warehouses with 50%–65% Relative Humidity (RH) and ambient temperatures under 25°C.",
        "Allow minimum 48 hours ambient acclimatization in your workshop before mechanical staking or dry milling operations.",
        "Never place crust pallets directly against cold exterior concrete walls or damp floor slabs.",
      ],
      technicalNote:
        "Sub-40% humidity causes vegetable and milling crust to stiffen, increasing risk of micro-fractures along belly edges.",
    },
    {
      id: "crust-oxidation",
      category: "crust",
      categoryLabel: "Crust Leather",
      title: "UV Shielding & Light Oxidation",
      subtitle: "Protecting undyed surfaces against color shifts",
      icon: Sun,
      tips: [
        "Shield crust hides from direct ultraviolet (UV) sunlight and high-output industrial fluorescent light tubes.",
        "Use opaque, breathable kraft paper covers over stacked hides to prevent premature tanning oil photo-oxidation.",
        "Keep crust batches segregated by tannage type (vegetable vs. chrome) to avoid cross-contamination of natural oils.",
      ],
      technicalNote:
        "Vegetable-tanned crust is particularly sensitive to ambient light, which naturally darkens exposed borders.",
    },
    {
      id: "finished-handling",
      category: "finished",
      categoryLabel: "Finished Leather",
      title: "Roll Geometry & Surface Storage",
      subtitle: "Preserving grain embossing and topcoat uniformity",
      icon: Layers,
      tips: [
        "Always roll finished leather grain-side-in with protective acid-free paper interleaving between hides.",
        "Store rolled hides horizontally on cantilevered pipe racking rather than standing rolls on end to prevent edge curling.",
        "Avoid stacking rolls more than 4 layers high to prevent pressure creases across aniline and smooth calf finishes.",
      ],
      technicalNote:
        "High compression stacking on delicate pull-up and patent finishes can transfer surface oils or cause contact gloss variations.",
    },
    {
      id: "finished-care",
      category: "finished",
      categoryLabel: "Finished Leather",
      title: "Aniline vs. Pigmented Maintenance",
      subtitle: "Differential warehouse handling standards",
      icon: ShieldCheck,
      tips: [
        "Handle pure aniline and semi-aniline hides with clean lint-free cotton gloves to prevent skin oil absorption.",
        "For pigmented and corrected grain leathers, clean surfaces using only damp microfiber cloths with neutral pH balance.",
        "Never expose finished hides to solvent fumes, silicone aerosols, or open heat vents in the cutting room.",
      ],
      technicalNote:
        "Pigmented topcoats offer high rub fastness, whereas aniline leathers breathe naturally but remain porous to liquids.",
    },
    {
      id: "receiving-protocol",
      category: "receiving",
      categoryLabel: "Receiving Protocol",
      title: "Buyer Warehouse Inbound Checklist",
      subtitle: "Step-by-step verification upon container de-stuffing",
      icon: FileCheck2,
      tips: [
        "Audit tamper-evident container bolt seal numbers against the original shipping Bill of Lading (B/L).",
        "Inspect pallet moisture barrier wraps for condensation, punctures, or transit vibration damage before unstrapping.",
        "Randomly sample 5% of bundles for calibrated dial gauge thickness checks and color consistency under D65 lighting.",
        "Record batch numbers and tannery stamp markings for complete supply chain traceability back to Bangladesh.",
      ],
      technicalNote:
        "ExportVisor retains master cutting swatches from every dispatched batch for comparison with inbound buyer audits.",
    },
  ];

  const filteredItems = knowledgeItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setShowAll(false);
  };

  return (
    <section id="knowledge-hub" className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200/90 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Fade-In-Up Animation */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200/80 dark:border-stone-800/80 gap-6"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>{t.knowledgeHub.kicker}</span>
              </div>
              <SectionShareButton path="/knowledge-hub" sectionName={t.knowledgeHub.kicker} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#F8F5F0] leading-tight mt-1">
              {t.knowledgeHub.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {t.knowledgeHub.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Bridge to Leather Maintenance & Care Guide */}
            <a
              href="#leather-care"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("leather-care", true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-[#1A1410] hover:bg-stone-200 dark:hover:bg-[#251D17] border border-stone-300 dark:border-[#C89D43]/30 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C89D43]" />
              <span>{language === "bn" ? "রক্ষণাবেক্ষণ ও শিপিং গাইড" : "Care & Storage Guide"}</span>
            </a>

            <a
              href="#grading-guide"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-[#1A1410] hover:bg-stone-200 dark:hover:bg-[#251D17] border border-stone-300 dark:border-[#C89D43]/30 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C89D43]" />
              <span>{language === "bn" ? "গ্রেডিং নির্দেশিকা" : "Grading Guide"}</span>
            </a>

            <button
              onClick={() => onRequestQuote("Technical Sourcing Advisory")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-colors shadow-gold-subtle cursor-pointer whitespace-nowrap"
            >
              <span>{t.knowledgeHub.consultationCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#15120E]" />
            </button>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 rounded-lg mb-8 max-w-fit">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            {t.knowledgeHub.allTips}
          </button>
          <button
            onClick={() => handleTabChange("wet-blue")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "wet-blue"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            {t.knowledgeHub.wetBlue}
          </button>
          <button
            onClick={() => handleTabChange("crust")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "crust"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            {t.knowledgeHub.crust}
          </button>
          <button
            onClick={() => handleTabChange("finished")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "finished"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            {t.knowledgeHub.finished}
          </button>
          <button
            onClick={() => handleTabChange("receiving")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "receiving"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            {t.knowledgeHub.receiving}
          </button>
        </div>

        {/* Knowledge Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, borderColor: "rgba(200, 157, 67, 0.6)" }}
                className="bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-[#C89D43]/25 rounded-xl p-6 flex flex-col justify-between transition-all shadow-2xs hover:shadow-md group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A5A17] dark:text-[#E5BE58] bg-[#C89D43]/10 px-2 py-0.5 rounded-full border border-[#C89D43]/20">
                      {item.categoryLabel}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-stone-50 dark:bg-[#181310] border border-[#C89D43]/30 text-[#C89D43] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#15120E] dark:text-[#FAF6F0] leading-snug group-hover:text-[#C89D43] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-4">
                    {item.subtitle}
                  </p>

                  <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2.5">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200/80 dark:border-stone-800">
                  <div className="p-3 bg-stone-50/70 dark:bg-[#181310] border border-stone-200/80 dark:border-stone-800 rounded-lg text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed shadow-2xs">
                    <span className="font-bold text-[#15120E] dark:text-[#FAF6F0]">Technical Context:</span>{" "}
                    {item.technicalNote}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All / Show Less Expandable Action */}
        {filteredItems.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#1A1410] hover:bg-stone-50 dark:hover:bg-[#251D17] border border-[#C89D43] shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <span>
                {showAll
                  ? (language === "bn" ? "সংক্ষিপ্ত করুন" : "Show Less")
                  : (language === "bn"
                      ? `সবগুলো বিষয় দেখুন (${filteredItems.length}টি)`
                      : `View All Topics (${filteredItems.length})`)}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-[#C89D43] group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#C89D43] group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}

        {/* Visual Leather Grading Guide Component */}
        <div id="grading-guide" className="scroll-mt-20">
          <LeatherGradingGuide
            onInquireGrade={(gradeLabel) => onRequestQuote(gradeLabel)}
          />
        </div>

        {/* Bottom Direct Assistance Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-stone-50/80 via-white to-stone-50/80 dark:from-stone-900 dark:via-[#1F1914] dark:to-stone-900 border border-stone-200 dark:border-[#C89D43]/35 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs dark:shadow-xl transition-colors duration-200">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E731C] dark:text-[#E5BE58] font-bold">
              {language === "bn" ? "গ্লোবাল কমপ্লায়েন্স অ্যাডভাইজরি" : "Global Compliance Advisory"}
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#15120E] dark:text-white">
              {t.knowledgeHub.bannerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t.knowledgeHub.bannerDesc}
            </p>
          </div>
          <button
            onClick={() => onRequestQuote("REACH / Chemical Standards Inquiry")}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-gold-subtle hover:shadow-lg"
          >
            {t.knowledgeHub.bannerCta}
          </button>
        </div>

      </div>
    </section>
  );
};
