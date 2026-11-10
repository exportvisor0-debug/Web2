import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Award,
  ShieldCheck,
  Leaf,
  ClipboardCheck,
  Ship,
  Info,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface CompliancePillar {
  id: string;
  icon: React.ElementType;
  title: string;
  subtext: string;
  badge: string;
  details: string;
  standards: string[];
  iconBg: string;
  iconColor: string;
  badgeClass: string;
}

const COMPLIANCE_PILLARS: CompliancePillar[] = [
  {
    id: "lwg-certified-network",
    icon: Award,
    title: "LWG-Certified Tannery Network",
    subtext: "Leather Working Group Audited Partner Mills",
    badge: "LWG Audited",
    iconBg: "bg-amber-500/10 border-amber-500/30",
    iconColor: "text-[#C89D43]",
    badgeClass: "bg-amber-50 text-[#7A5A17] border-amber-200/80",
    details:
      "We partner directly with Leather Working Group (LWG) audited and certified tanneries in Bangladesh. Our partner mills comply with rigorous global environmental audit standards, raw hide traceability, advanced wastewater management (CETP), energy efficiency, and restricted chemical protocols.",
    standards: [
      "LWG Protocol Audited Facilities",
      "Traceable Raw Hide Origins",
      "Energy & Water Consumption Audits",
      "Tier-1 Footwear Brand Compliance",
    ],
  },
  {
    id: "reach-compliance",
    icon: ShieldCheck,
    title: "REACH & Chemical Safety",
    subtext: "Azo-Free & Hexavalent Chromium Restricted",
    badge: "EU / Global Compliant",
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    iconColor: "text-emerald-600",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    details:
      "All export leathers can be formulated to comply with European Union REACH Annex XVII thresholds, ensuring SVHC compliance, zero harmful aromatic amines, and verified chrome-free or low-free-formaldehyde formulations.",
    standards: ["EU REACH Annex XVII", "Azo-Free Dyes", "Cr(VI) Non-Detectable (<3ppm)"],
  },
  {
    id: "cetp-eco",
    icon: Leaf,
    title: "CETP Environmental Compliance",
    subtext: "Savar Effluent Treatment Plant Connected",
    badge: "Eco-Compliant",
    iconBg: "bg-teal-500/10 border-teal-500/30",
    iconColor: "text-teal-600",
    badgeClass: "bg-teal-50 text-teal-800 border-teal-200/80",
    details:
      "Partner mills operate within the Savar Tannery Industrial Estate connected to the Central Effluent Treatment Plant (CETP), with dedicated biological stages and chromium recovery recycling.",
    standards: ["Savar CETP Connected", "Waterborne Wet White Options", "Solid Waste Management"],
  },
  {
    id: "pre-shipment-inspection",
    icon: ClipboardCheck,
    title: "100% Pre-Shipment Inspection",
    subtext: "Piece-by-Piece Calibration & Grading",
    badge: "Strict QA Check",
    iconBg: "bg-purple-500/10 border-purple-500/30",
    iconColor: "text-purple-600",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200/80",
    details:
      "Every batch is physically inspected by ExportVisor technical inspectors at the tannery staging floor. We calibrate substance (thickness tolerance ±0.1mm), evaluate temper, check grain pull, and verify export packing.",
    standards: ["Thickness Calibration (±0.1mm)", "Crocking & Rub Fastness", "Grain Pull & Flex Testing"],
  },
  {
    id: "global-logistics",
    icon: Ship,
    title: "Global Logistics Partner",
    subtext: "FOB Chattogram / CIF Worldwide Sea & Air",
    badge: "25+ Global Ports",
    iconBg: "bg-blue-500/10 border-blue-500/30",
    iconColor: "text-blue-600",
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200/80",
    details:
      "Seamless maritime container shipping (20ft & 40ft dry/reefer) coordinated via Chattogram Port with tier-1 international shipping lines (Maersk, MSC, CMA CGM, Hapag-Lloyd) with full Phytosanitary and Chamber certificates.",
    standards: ["Chattogram Port Export Clearance", "Standard LC at Sight / TT", "Bill of Lading & Origin Docs"],
  },
];

export const TrustComplianceStrip: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPillar, setSelectedPillar] = useState<CompliancePillar | null>(null);

  const getPillarTitle = (pillar: CompliancePillar) => {
    if (language !== "bn") return pillar.title;
    switch (pillar.id) {
      case "lwg-certified-network":
        return "LWG সার্টিফাইড ট্যানারি নেটওয়ার্ক";
      case "reach-compliance":
        return "REACH ও রাসায়নিক নিরাপত্তা";
      case "cetp-eco":
        return "সাভার CETP পরিবেশগত মানদণ্ড";
      case "pre-shipment-inspection":
        return "১০০% প্রি-শিপমেন্ট পরিদর্শন";
      case "global-logistics":
        return "বৈশ্বিক লজিস্টিকস নেটওয়ার্ক";
      default:
        return pillar.title;
    }
  };

  const getPillarSubtext = (pillar: CompliancePillar) => {
    if (language !== "bn") return pillar.subtext;
    switch (pillar.id) {
      case "lwg-certified-network":
        return "লেদার ওয়ার্কিং গ্রুপ অডিটেড পার্টনার ট্যানারিসমূহ";
      case "reach-compliance":
        return "অ্যাজো-ফ্রি ও ক্রোমিয়াম(VI) নিয়ন্ত্রিত";
      case "cetp-eco":
        return "সাভার কেন্দ্রীয় বর্জ্য পরিশোধনাগার সংযুক্ত";
      case "pre-shipment-inspection":
        return "প্রতিটি টুকরো ক্যালিব্রেশন ও গ্রেডিং";
      case "global-logistics":
        return "FOB চট্টগ্রাম / CIF বিশ্বব্যাপী সমুদ্র ও আকাশপথ";
      default:
        return pillar.subtext;
    }
  };

  const getPillarBadge = (pillar: CompliancePillar) => {
    if (language !== "bn") return pillar.badge;
    switch (pillar.id) {
      case "lwg-certified-network":
        return "LWG অডিটেড";
      case "reach-compliance":
        return "EU / বৈশ্বিক মানসম্মত";
      case "cetp-eco":
        return "পরিবেশবান্ধব";
      case "pre-shipment-inspection":
        return "কঠোর QA মানদণ্ড";
      case "global-logistics":
        return "২৫+ আন্তর্জাতিক বন্দর";
      default:
        return pillar.badge;
    }
  };

  return (
    <>
      <section
        aria-label="Trust and Compliance Verification Strip"
        className="relative bg-[#FAF8F5] dark:bg-[#110D0A] border-b border-[#C89D43]/20 dark:border-stone-800/80 shadow-2xs z-20 py-4 sm:py-5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Micro-label */}
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
            <span className="font-bold text-[#7A5A17] dark:text-[#F5D275] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C89D43]" />
              {language === "bn"
                ? "B2B বিশ্বাস ও প্রাতিষ্ঠানিক কমপ্লায়েন্স ফ্রেমওয়ার্ক"
                : "B2B Trust & Institutional Compliance Framework"}
            </span>
            <span className="hidden md:inline-block text-stone-500 dark:text-stone-400 font-medium">
              {language === "bn"
                ? "যাচাইকৃত ট্যানারি অংশীদারিত্ব · আন্তর্জাতিক টেস্টিং মানদণ্ড"
                : "Verified Tannery Partnerships · International Testing Standards"}
            </span>
          </div>

          {/* Pillars Grid with Motion Stagger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.05 },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4"
          >
            {COMPLIANCE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.button
                  key={pillar.id}
                  type="button"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPillar(pillar)}
                  className="group flex flex-col text-left p-2.5 sm:p-3.5 bg-white dark:bg-[#181310] hover:bg-[#FAF8F5] dark:hover:bg-[#201A15] border border-[#C89D43]/20 dark:border-stone-800 hover:border-[#C89D43] dark:hover:border-[#C89D43]/80 rounded-xl transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C89D43]/40"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${pillar.iconBg} ${pillar.iconColor} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs shrink-0`}>
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full border ${pillar.badgeClass} font-semibold dark:bg-[#251D16] dark:text-[#F5D275] dark:border-[#C89D43]/30 truncate max-w-[85px] sm:max-w-none`}>
                      {getPillarBadge(pillar)}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#15120E] dark:text-[#F3EFEA] group-hover:text-[#C89D43] transition-colors leading-tight line-clamp-1">
                    {getPillarTitle(pillar)}
                  </h3>
                  
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug mt-1 line-clamp-2">
                    {getPillarSubtext(pillar)}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-semibold text-stone-500 dark:text-stone-400 group-hover:text-[#7A5A17] dark:group-hover:text-[#F5D275]">
                    <span>{language === "bn" ? "মানদণ্ড দেখুন" : "View criteria"}</span>
                    <ChevronRight className="w-3 h-3 text-[#C89D43] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* Compliance Criteria Modal */}
      {selectedPillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pillar-title"
        >
          <div className="bg-white dark:bg-[#15110E] rounded-lg border border-stone-200 dark:border-stone-800 shadow-xl max-w-lg w-full p-6 space-y-4 text-stone-900 dark:text-[#F3EFEA]">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${selectedPillar.iconBg} ${selectedPillar.iconColor} border flex items-center justify-center shadow-xs`}>
                  <selectedPillar.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#946E1E] dark:text-[#E5BE58] font-bold block">
                    {selectedPillar.badge}
                  </span>
                  <h4 id="pillar-title" className="font-display text-xl font-bold text-[#181310] dark:text-white leading-tight">
                    {selectedPillar.title}
                  </h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPillar(null)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-semibold p-1 cursor-pointer"
                aria-label="Close compliance details"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {selectedPillar.details}
            </p>

            <div className="bg-[#FAF8F5] dark:bg-[#1C1612] p-3.5 rounded-lg border border-[#C89D43]/20 dark:border-[#C89D43]/30 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58] block">
                Applicable Technical Benchmarks
              </span>
              <ul className="grid grid-cols-1 gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                {selectedPillar.standards.map((std, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C89D43]" />
                    <span className="font-medium">{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
              <span className="text-[11px] text-stone-600 dark:text-stone-400">
                Formal test certificates issued per export batch
              </span>
              <button
                type="button"
                onClick={() => setSelectedPillar(null)}
                className="px-4 py-2 text-xs font-bold text-stone-950 bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-md transition-all shadow-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
