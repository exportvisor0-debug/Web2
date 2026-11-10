import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { SectionShareButton } from "./SectionShareButton";
import { scrollToSection } from "../utils/router";
import {
  ShieldAlert,
  Droplets,
  Thermometer,
  Package,
  Layers,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Ship,
  Warehouse,
  Wind,
  Sun,
  ShieldCheck,
  Eye,
  FileCheck2,
} from "lucide-react";

type LeatherCategory = "wet-blue" | "crust" | "finished";
type StorageMode = "transit" | "warehouse";

interface LeatherCareProfile {
  id: LeatherCategory;
  name: string;
  nameBn: string;
  badge: string;
  badgeBn: string;
  tagline: string;
  taglineBn: string;
  moistureTarget: string;
  moistureTargetBn: string;
  temperatureTarget: string;
  temperatureTargetBn: string;
  humidityTarget: string;
  humidityTargetBn: string;
  biocideProtection: string;
  biocideProtectionBn: string;
  packagingProtocol: string;
  packagingProtocolBn: string;
  criticalRisk: string;
  criticalRiskBn: string;
  handlingRules: { title: string; titleBn: string; desc: string; descBn: string }[];
  dos: string[];
  dosBn: string[];
  donts: string[];
  dontsBn: string[];
}

const CARE_PROFILES: Record<LeatherCategory, LeatherCareProfile> = {
  "wet-blue": {
    id: "wet-blue",
    name: "Wet Blue Leather",
    nameBn: "ওয়েট ব্লু চামড়া",
    badge: "Semi-Processed Chrome Stage",
    badgeBn: "সেমি-প্রসেসড ক্রোম পর্যায়",
    tagline: "Moisture stabilization & mold suppression for sea-freight containers",
    taglineBn: "সমুদ্রপথে কন্টেইনার শিপিংয়ে আর্দ্রতা নিয়ন্ত্রণ ও ছত্রাক প্রতিরোধ",
    moistureTarget: "50% – 60% Equilibrium",
    moistureTargetBn: "৫০% – ৬০% নির্দিষ্ট আর্দ্রতা",
    temperatureTarget: "15°C – 25°C (< 30°C strictly)",
    temperatureTargetBn: "১৫°C – ২৫°C (সর্বোচ্চ ৩০°C)",
    humidityTarget: "Hermetically sealed liners",
    humidityTargetBn: "বায়ুরোধক পলিথিন লাইনার",
    biocideProtection: "Active TCMTB or OIT fungicide applied in final tannery drum wash",
    biocideProtectionBn: "ফ্যাক্টরি ড্রাম ওয়াশের সময় কার্যকর TCMTB বা OIT ছত্রাকনাশক প্রয়োগ",
    packagingProtocol:
      "Heavy-gauge 100-micron polyethylene crate liners on ISPM-15 heat-treated export wooden pallets, securely strapped.",
    packagingProtocolBn:
      "ISPM-15 সার্টিফাইড হিট-ট্রিটেড কাঠের প্যালেটে ১০০ মাইক্রন ভারী পলিথিন লাইনার দিয়ে সিল ও স্ট্র্যাপ করা।",
    criticalRisk:
      "Desiccation & salt crystallization. If moisture falls below 45%, chromium salts crystallize irreversibly, permanently impairing retanning dye uptake.",
    criticalRiskBn:
      "আর্দ্রতা শুকিয়ে লবণ জমাট বাঁধা। আর্দ্রতা ৪৫%-এর নিচে নেমে গেলে ক্রোম লবণ ক্রিস্টালাইজ হয়ে যায় এবং পরবর্তী রিট্যানিংয়ে রং গ্রহণ ক্ষমতা নষ্ট হয়।",
    handlingRules: [
      {
        title: "Immediate Resealing",
        titleBn: "তাত্ক্ষণিক রিসিলেশন",
        desc: "Never leave opened wet blue crates exposed to ambient factory air. Reseal pallet wrap immediately after inspecting counter-samples.",
        descBn: "খোলা অবস্থায় সাধারণ বাতাসে ফেলে রাখবেন না। নমুনা পরিদর্শনের পরপরই প্যালেট দ্রুত পুনরায় সিল করুন।",
      },
      {
        title: "Thermal Shadowing",
        titleBn: "উষ্ণতা থেকে সুরক্ষা",
        desc: "Keep palletized crates away from boiler rooms, direct sunlight, and container vessel engine bulkheads.",
        descBn: "বয়লার রুম, সরাসরি সূর্যের আলো এবং জাহাজের ইঞ্জিন সংলগ্ন এলাকা থেকে প্যালেট দূরে রাখুন।",
      },
      {
        title: "Stacking Discipline",
        titleBn: "স্ট্যাকিং সীমাবদ্ধতা",
        desc: "Do not stack wet blue pallets more than 2-high during storage to prevent hydraulic fluid squeezing and grain bruising.",
        descBn: "চাপের কারণে পানি বের হওয়া ও দাগ পড়া রোধে গুদামে সর্বোচ্চ ২ প্যালেটের বেশি স্ট্যাক করবেন না।",
      },
    ],
    dos: [
      "Verify container floorboards are bone-dry before loading at Chattogram terminal",
      "Inspect fungicides batch certificate (TCMTB / OIT) matching EU REACH thresholds",
      "Stow in ventilated lower container hold away from direct weather exposure",
    ],
    dosBn: [
      "চট্টগ্রাম পোর্টে কন্টেইনারে উঠানোর পূর্বে মেঝে সম্পূর্ণ শুষ্ক কিনা নিশ্চিত করুন",
      "EU REACH অনুমোদিত অনুমোদিত ছত্রাকনাশক সার্টিফিকেট যাচাই করুন",
      "সরাসরি রোদ বা ঝড়বৃষ্টি এড়াতে জাহাজের লোয়ার ডেকে স্টোয়েজ অনুরোধ করুন",
    ],
    donts: [
      "Never allow wet blue hides to dry out into rigid crust before reaching the beamhouse",
      "Do not store in ambient temperatures exceeding 32°C (accelerates fungal blooms)",
      "Do not use non-treated uncertified wooden pallets that host wood-boring pests",
    ],
    dontsBn: [
      "ট্যানারিতে প্রক্রিয়াজাতকরণের পূর্বে আর্দ্রতা সম্পূর্ণ শুকিয়ে শক্ত হতে দেবেন না",
      "৩২°C-এর বেশি তাপমাত্রায় রাখবেন না (ছত্রাকের সংক্রমণ দ্রুত ছড়ায়)",
      "সার্টিফিকেটহীন কাঁচা কাঠের প্যালেট ব্যবহার করবেন না যা কাঠের পোকা ছড়ায়",
    ],
  },
  "crust": {
    id: "crust",
    name: "Crust Leather",
    nameBn: "ক্রাস্ট চামড়া",
    badge: "Intermediate Retanned State",
    badgeBn: "মধ্যবর্তী রিট্যানড পর্যায়",
    tagline: "Atmospheric buffer & fiber elasticity preservation prior to finishing",
    taglineBn: "ফিনিশিং প্রক্রিয়ার পূর্বে ফাইবারের নমনীয়তা ও সঠিক ভারসাম্য রক্ষা",
    moistureTarget: "12% – 14% Stable Equilibrium",
    moistureTargetBn: "১২% – ১৪% স্থিতিশীল আর্দ্রতা",
    temperatureTarget: "18°C – 24°C (Climate-controlled)",
    temperatureTargetBn: "১৮°C – ২৪°C (নিয়ন্ত্রিত তাপমাত্রা)",
    humidityTarget: "55% – 65% Relative Humidity (RH)",
    humidityTargetBn: "৫৫% – ৬৫% আপেক্ষিক আর্দ্রতা (RH)",
    biocideProtection: "Retannage anti-mildew formulation certified zero-Cr(VI)",
    biocideProtectionBn: "রিট্যানিংয়ে ব্যবহৃত ক্ষতিকর Cr(VI) মুক্ত অ্যান্টি-মিলডিউ ফর্মুলেশন",
    packagingProtocol:
      "Grain-to-grain rolled or folded in protective kraft paper, bundled in waterproof stretch wrap on raised timber skids.",
    packagingProtocolBn:
      "ক্রাফট পেপার দিয়ে রোল বা ভাজ করে ওয়াটারপ্রুফ স্ট্রেচ র্যাপ দিয়ে মোড়ানো কাঠের স্কিডের ওপর স্থাপন।",
    criticalRisk:
      "Atmospheric humidity spikes (>75% RH) induce mold sporulation; extreme dryness (<40% RH) induces grain cracking during subsequent plating or embossing.",
    criticalRiskBn:
      "অতিরিক্ত আর্দ্রতায় (>৭৫% RH) ছত্রাক জন্মায় এবং অতিরিক্ত শুষ্কতায় (<৪০% RH) ফিনিশিং বা এমবসিং করার সময় গ্রেইনে ফাটল ধরে।",
    handlingRules: [
      {
        title: "Sealed Barrier Wrap",
        titleBn: "বায়ুরোধক সুরক্ষা",
        desc: "Maintain shrink-wrapped packaging until the exact production lot enters toggle conditioning and vacuum drying.",
        descBn: "প্রোডাকশন ফ্লোরে ড্রায়ারে নেওয়ার আগ মুহূর্ত পর্যন্ত স্ট্রেচ র্যাপিং অক্ষত রাখুন।",
      },
      {
        title: "Clean Glove Protocol",
        titleBn: "পরিচ্ছন্ন গ্লাভস ব্যবহার",
        desc: "Workers handling crust hides must wear cotton gloves to prevent natural hand oils and sweat from creating dye-repellent stains.",
        descBn: "হাতের ঘাম ও তেলের দাগ যাতে চামড়ায় বসে রং নষ্ট না করে, সেজন্য কটন গ্লাভস পরা বাধ্যতামূলক।",
      },
      {
        title: "Bundle Stacking Limits",
        titleBn: "বান্ডেল স্ট্যাকিং লিমিট",
        desc: "Limit vertical bundle stacks to 10 layers. Over-compression can cause permanent grain indentation along folded creases.",
        descBn: "ভাজের দাগ যাতে স্থায়ী না হয় সেজন্য সর্বোচ্চ ১০ স্তরের বেশি বান্ডেল স্ট্যাক করবেন না।",
      },
    ],
    dos: [
      "Equip storage facilities with calibrated digital thermo-hygrometers",
      "Condition crust hides at room temperature 24 hours before mechanical softening",
      "Use desiccants inside export shipping containers to regulate maritime dew point",
    ],
    dosBn: [
      "গুদামে ক্যালিব্রেটেড ডিজিটাল থার্মো-হাইগ্রোমিটার স্থাপন করে আর্দ্রতা ট্র্যাক করুন",
      "মিলিং বা সফট করার আগে স্বাভাবিক তাপমাত্রায় ২৪ ঘণ্টা রেখে পরিবেশের সাথে খাপ খাওয়ান",
      "সমুদ্রপথে জাহাজে শিশিরবিন্দু জমতে না দিতে কন্টেইনারে সিলিকা জেল বা ডেসিক্যান্ট ব্যবহার করুন",
    ],
    donts: [
      "Never store crust bundles directly onto cold concrete warehouse slabs",
      "Do not position crust pallets adjacent to open factory windows or rain drip lines",
      "Never expose crust leather to halogen work lights within 1 meter (causes localized heat spots)",
    ],
    dontsBn: [
      "কখনই গুদামের স্যাঁতসেঁতে বা ঠান্ডা মেঝের ওপর সরাসরি চামড়া রাখবেন না",
      "খোলা জানালা বা বৃষ্টির পানির সম্ভাব্য ছাঁট আসে এমন স্থানে প্যালেট রাখবেন না",
      "হ্যালোজেন লাইটের খুব কাছে চামড়া রাখবেন না (তাপের কারণে স্থানীয়ভাবে শুকিয়ে যেতে পারে)",
    ],
  },
  "finished": {
    id: "finished",
    name: "Finished Leather",
    nameBn: "ফিনিশড চামড়া",
    badge: "Aniline, Nappa & Embossed Rolls",
    badgeBn: "অ্যানিলিন, নাপ্পা ও এমবসড রোল",
    tagline: "Grain topography, sheen, and color transfer prevention for high-end cutters",
    taglineBn: "গ্রেইন টেক্সচার, উজ্জ্বলতা ও রঙের স্থায়িত্ব নিশ্চিতকরণ",
    moistureTarget: "10% – 12% Controlled Equilibrium",
    moistureTargetBn: "১০% – ১২% সুনিয়ন্ত্রিত আর্দ্রতা",
    temperatureTarget: "20°C – 22°C (Optimal Room Temp)",
    temperatureTargetBn: "২০°C – ২২°C (আদর্শ তাপমাত্রা)",
    humidityTarget: "50% – 60% Relative Humidity (RH)",
    humidityTargetBn: "৫০% – ৬০% আপেক্ষিক আর্দ্রতা (RH)",
    biocideProtection: "Surface finish polymeric biocide film meeting OEKO-TEX & REACH",
    biocideProtectionBn: "OEKO-TEX ও REACH মানদণ্ড অনুযায়ী টপকোট বায়োসাইড প্রলেপ",
    packagingProtocol:
      "Acid-free interleaving tissue between full-grain aniline sides, rolled grain-inward, cased in heavy corrugated export cartons.",
    packagingProtocolBn:
      "অ্যানিলিন চামড়ার প্রতি স্তরে অ্যাসিড-মুক্ত ইন্টারলিভিং টিস্যু, ভেতরে গ্রেইন দিয়ে রোল করা ও ভারী রপ্তানি কার্টনে প্যাক করা।",
    criticalRisk:
      "Finish blocking (adhesion between leather coats) caused by excessive heat during equatorial shipping; dye migration between contrasting colors.",
    criticalRiskBn:
      "গ্রীষ্মমণ্ডলীয় সমুদ্রপথে অতিরিক্ত তাপে ফিনিশ আঠালো হয়ে লেগে যাওয়া (ব্লকিং) এবং হালকা ও গাঢ় রঙের চামড়া সংস্পর্শে এলে রঙ ছড়ানো।",
    handlingRules: [
      {
        title: "Interleaving Protection",
        titleBn: "টিস্যু পেপার সুরক্ষা",
        desc: "Always interleave patent, aniline, and pigmented finishes with protective silicone or acid-free paper to stop thermoplastic tackiness.",
        descBn: "আবহাওয়ার তাপে ফিনিশ যেন একে অপরের সাথে লেগে না যায়, সেজন্য অ্যাসিড-মুক্ত পেপার শিট ব্যবহার করুন।",
      },
      {
        title: "Horizontal Suspended Storage",
        titleBn: "অনুভূমিক হ্যাঙ্গিং স্টোরেজ",
        desc: "Store rolls horizontally on padded cantilever racks or suspended core bars; never stand rolls vertically on their edges.",
        descBn: "রোলগুলো কখনই সোজা খাঁড়া করে দাঁড় করিয়ে রাখবেন না; অনুভূমিক র‍্যাকে অথবা ঝুলিয়ে রাখুন।",
      },
      {
        title: "UV & Light Shielding",
        titleBn: "সূর্যের আলো থেকে সুরক্ষা",
        desc: "Keep aniline and pastel tones shielded from direct sunlight to prevent photochemical fade and grain discoloration.",
        descBn: "অ্যানিলিন ও হালকা রঙের চামড়া সরাসরি রোদ বা ইউভি রশ্মি থেকে সুরক্ষিত অন্ধকারাচ্ছন্ন স্থানে রাখুন।",
      },
    ],
    dos: [
      "Acclimatize imported leather cartons in the cutting room 48 hours prior to clicking",
      "Keep cartons sealed until actual production cutting to maintain factory humidity",
      "Ensure pallets are strapped tightly to prevent carton shifting inside container",
    ],
    dosBn: [
      "জুতা বা পণ্য কাটিংয়ের আগে কাটিং রুমে অন্তত ৪৮ ঘণ্টা রেখে চামড়াকে মানিয়ে নিতে দিন",
      "প্রোডাকশন শুরু হওয়ার আগ পর্যন্ত কার্টন সিল রাখুন যাতে বাইরের আর্দ্রতা প্রবেশ না করে",
      "জাহাজে ঝাঁকুনির হাত থেকে বাঁচাতে কার্টন প্যালেটগুলো শক্ত স্ট্র্যাপ দিয়ে বাঁধুন",
    ],
    donts: [
      "Never stack heavy machinery or metal crates on top of leather roll cartons",
      "Do not fold finished upholstery or garment nappa; always roll grain side inward",
      "Never store contrasting light and dark finished leathers in direct face-to-face contact",
    ],
    dontsBn: [
      "লেদার কার্টনের ওপর কখনই ভারী কোনো যন্ত্রপাতি বা শক্ত বাক্স চাপিয়ে রাখবেন না",
      "ফিনিশড চামড়া ভাঁজ করবেন না, সর্বদা গ্রেইন সাইড ভেতরের দিকে রেখে গোল করে রোল করুন",
      "কখনই হালকা ও গাঢ় রঙের ফিনিশড চামড়া পেপার ছাড়া মুখোমুখি লাগিয়ে রাখবেন না",
    ],
  },
};

export const LeatherMaintenanceCare: React.FC<{ onRequestQuote?: (topic: string) => void }> = ({
  onRequestQuote,
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<LeatherCategory>("wet-blue");
  const [storageMode, setStorageMode] = useState<StorageMode>("transit");

  const currentProfile = CARE_PROFILES[selectedCategory];

  return (
    <section
      id="leather-care"
      className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200/90 dark:border-stone-800/80 transition-colors duration-200 relative overflow-hidden"
    >
      {/* Subtle ambient luxury backdrop glow */}
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-[#D6AC4B]/10 dark:bg-[#D6AC4B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-[#C89D43]/10 dark:bg-[#C89D43]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Fade-In-Up Animation */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>
                  {language === "bn"
                    ? "টেকনিক্যাল সংরক্ষণ ও শিপিং প্রোটোকল"
                    : "Technical Preservation & Transit Protocol"}
                </span>
              </div>
              <SectionShareButton
                path="/#leather-care"
                sectionName={
                  language === "bn"
                    ? "লেদার সংরক্ষণ ও হ্যান্ডলিং নির্দেশিকা"
                    : "Leather Maintenance & Care Guide"
                }
              />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#F8F5F0] leading-tight text-balance">
              {language === "bn" ? (
                <>
                  লেদার রক্ষণাবেক্ষণ, হ্যান্ডলিং ও{" "}
                  <span className="text-gold-gradient">সংরক্ষণ নির্দেশিকা</span>
                </>
              ) : (
                <>
                  Leather Maintenance, Handling &{" "}
                  <span className="text-gold-gradient">Preservation Protocol</span>
                </>
              )}
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed text-pretty">
              {language === "bn"
                ? "আন্তর্জাতিক আমদানিকারক, জুতা প্রস্তুতকারক এবং লজিস্টিকস পার্টনারদের জন্য ওয়েট ব্লু, ক্রাস্ট এবং ফিনিশড চামড়ার শিপিং ও দীর্ঘমেয়াদী গুদামজাতকরণের বৈজ্ঞানিক নির্দেশিকা।"
                : "Essential handling, climate control, and warehouse preservation benchmarks for international buyers, footwear manufacturers, and logistics partners handling Bangladesh wet blue, crust, and finished hides."}
            </p>
          </div>

          {/* Quick link bridge to Knowledge Hub */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scrollToSection("knowledge-hub", true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#1A1410] hover:bg-stone-50 dark:hover:bg-[#251D17] border border-stone-300 dark:border-[#C89D43]/30 rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C89D43]" />
              <span>
                {language === "bn" ? "নলেজ হাব গাইড দেখুন" : "Explore Knowledge Hub"}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C89D43] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* LEATHER CATEGORY SELECTOR TABS (Wet Blue vs Crust vs Finished) */}
        {/* ============================================================== */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 rounded-xl mb-8 max-w-fit">
          {(["wet-blue", "crust", "finished"] as LeatherCategory[]).map((cat) => {
            const prof = CARE_PROFILES[cat];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-sm"
                    : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
                }`}
              >
                {cat === "wet-blue" && <Droplets className="w-3.5 h-3.5 text-white dark:text-[#15120E]" />}
                {cat === "crust" && <Layers className="w-3.5 h-3.5 text-white dark:text-[#15120E]" />}
                {cat === "finished" && <CheckCircle2 className="w-3.5 h-3.5 text-white dark:text-[#15120E]" />}
                <span>{language === "bn" ? prof.nameBn : prof.name}</span>
                <span className="hidden sm:inline text-[10px] opacity-85 font-normal">
                  ({language === "bn" ? prof.badgeBn : prof.badge})
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* ACTIVE PROFILE SHOWCASE CARD */}
        {/* ============================================================== */}
        <div className="bg-white dark:bg-[#120E0B] rounded-2xl border border-stone-200/90 dark:border-[#C89D43]/30 shadow-xl overflow-hidden mb-12 transition-colors duration-200">
          
          {/* Header strip inside card */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-50/70 via-white to-stone-50/70 dark:from-[#181310] dark:via-[#15100C] dark:to-[#181310] border-b border-stone-200/90 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#C89D43] bg-[#C89D43]/10 px-2.5 py-0.5 rounded-full border border-[#C89D43]/20">
                  {language === "bn" ? currentProfile.badgeBn : currentProfile.badge}
                </span>
                <span className="text-xs text-stone-400">· Technical Specification</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? currentProfile.nameBn : currentProfile.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                {language === "bn" ? currentProfile.taglineBn : currentProfile.tagline}
              </p>
            </div>

            {/* Critical Risk Warning Alert Pill */}
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-700/50 rounded-xl max-w-md">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                    {language === "bn" ? "প্রধান ঝুঁকি ও প্রতিরোধ:" : "Key Risk & Mitigation:"}
                  </span>
                  <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                    {language === "bn" ? currentProfile.criticalRiskBn : currentProfile.criticalRisk}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Quantitative Technical Preservation Gauges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 dark:divide-stone-800 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#140F0C]">
            <div className="p-5 sm:p-6 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-medium">
                <Droplets className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>{language === "bn" ? "আর্দ্রতা মানদণ্ড" : "Moisture Target"}</span>
              </div>
              <p className="font-mono-data text-base sm:text-lg font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? currentProfile.moistureTargetBn : currentProfile.moistureTarget}
              </p>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                {language === "bn" ? "ক্যালিব্রেটেড আর্দ্রতা ব্যালান্স" : "Target equilibrium index"}
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-medium">
                <Thermometer className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>{language === "bn" ? "তাপমাত্রা সহনশীলতা" : "Storage Temp"}</span>
              </div>
              <p className="font-mono-data text-base sm:text-lg font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? currentProfile.temperatureTargetBn : currentProfile.temperatureTarget}
              </p>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                {language === "bn" ? "থার্মাল হাইড্রোলাইসিস প্রতিরোধ" : "Thermal stability threshold"}
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-medium">
                <Wind className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>{language === "bn" ? "আপেক্ষিক আর্দ্রতা (RH)" : "Relative Humidity (RH)"}</span>
              </div>
              <p className="font-mono-data text-base sm:text-lg font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? currentProfile.humidityTargetBn : currentProfile.humidityTarget}
              </p>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                {language === "bn" ? "ফাঙ্গাল স্পোর নিয়ন্ত্রণ" : "Fungal spore inhibition"}
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-medium">
                <Package className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>{language === "bn" ? "প্যাকেজিং স্ট্যান্ডার্ড" : "Export Packaging"}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#15120E] dark:text-[#FAF6F0] line-clamp-2">
                {language === "bn" ? currentProfile.packagingProtocolBn : currentProfile.packagingProtocol}
              </p>
            </div>
          </div>

          {/* Detailed Handling Rules & Dos/Don'ts */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Specific Handling & Care Rules */}
            <div className="lg:col-span-7 space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C89D43]" />
                <span>{language === "bn" ? "বাধ্যতামূলক পরিচালন বিধি" : "Mandatory Handling & Preservation Rules"}</span>
              </h4>

              <div className="space-y-3.5">
                {currentProfile.handlingRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181310] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-data text-xs font-bold text-[#C89D43]">
                        0{idx + 1}.
                      </span>
                      <h5 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                        {language === "bn" ? rule.titleBn : rule.title}
                      </h5>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-5">
                      {language === "bn" ? rule.descBn : rule.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chemical Bio-Protection Footnote */}
              <div className="p-3.5 bg-stone-50/70 dark:bg-[#15100C] border border-stone-200 dark:border-stone-800/80 rounded-xl flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300">
                <FileCheck2 className="w-4 h-4 text-[#C89D43] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800 dark:text-stone-200">
                    {language === "bn" ? "অ্যান্টি-মিলডিউ ও কেমিক্যাল নিরাপত্তা:" : "Biocide & Chemical Benchmark:"}
                  </strong>{" "}
                  {language === "bn" ? currentProfile.biocideProtectionBn : currentProfile.biocideProtection}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Dos & Don'ts Checklist */}
            <div className="lg:col-span-5 space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {language === "bn" ? "বায়ার চেকলিস্ট (কী করবেন / কী করবেন না)" : "Buyer Operational Dos & Don'ts"}
              </h4>

              {/* Dos Card */}
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === "bn" ? "কী করবেন (Recommended)" : "Do's (Recommended)"}</span>
                </span>
                <ul className="text-xs text-emerald-900/90 dark:text-emerald-200/90 space-y-2">
                  {(language === "bn" ? currentProfile.dosBn : currentProfile.dos).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts Card */}
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>{language === "bn" ? "কী করবেন না (Avoid)" : "Don'ts (Avoid)"}</span>
                </span>
                <ul className="text-xs text-rose-900/90 dark:text-rose-200/90 space-y-2">
                  {(language === "bn" ? currentProfile.dontsBn : currentProfile.donts).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* TRANSIT VS WAREHOUSE STRATEGY DEEP-DIVE DUAL PILLARS */}
        {/* ============================================================== */}
        <div className="mb-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn"
                  ? "শিপিং বনাম দীর্ঘমেয়াদী গুদামজাতকরণ প্রোটোকল"
                  : "Maritime Transit vs. Long-Term Staging Protocol"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                {language === "bn"
                  ? "সমুদ্রপথের ট্রানজিট এবং ফ্যাক্টরি ওয়্যারহাউস স্টোরেজের জন্য পৃথক নিরাপত্তা প্রোটোকল।"
                  : "Differential preservation controls engineered for oceanic container freight and factory warehouse staging."}
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 rounded-lg self-start sm:self-auto">
              <button
                onClick={() => setStorageMode("transit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  storageMode === "transit"
                    ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-2xs"
                    : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
                }`}
              >
                <Ship className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "সমুদ্রপথ শিপিং (Transit)" : "Ocean Transit"}</span>
              </button>

              <button
                onClick={() => setStorageMode("warehouse")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  storageMode === "warehouse"
                    ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-2xs"
                    : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
                }`}
              >
                <Warehouse className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "ওয়্যারহাউস সংরক্ষণ (Warehouse)" : "Warehouse Staging"}</span>
              </button>
            </div>
          </div>

          {/* Protocol Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {storageMode === "transit" ? (
              <>
                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-[#C89D43]/15 text-[#C89D43] flex items-center justify-center font-bold">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "কন্টেইনার রেইন প্রতিরোধ" : "Container Rain Prevention"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "সমুদ্রের তাপমাত্রার তারতম্যে কন্টেইনারের ছাদে যাতে শিশির না জমে, সেজন্য উচ্চ-ক্ষমতাসম্পন্ন ক্যালসিয়াম ক্লোরাইড ডেসিক্যান্ট ব্ল্যাঙ্কেট ঝুলিয়ে দেওয়া হয়।"
                      : "High-capacity calcium chloride desiccant blankets with 250% absorption suspended along ceiling rails to stop condensation dripping onto pallets."}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                    <Ship className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "জাহাজে সুরক্ষিত স্টোয়েজ পজিশন" : "Below-Deck Stowage"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "সরাসরি ক্রান্তীয় রোদ ও জাহাজের ইঞ্জিন রুমের উত্তাপ থেকে রক্ষা করতে আন্ডার-ডেক স্টোয়েজ স্পেস বুকিং নিশ্চিত করা হয়।"
                      : "Booking below-deck stowage away from engine room bulkheads prevents thermal bake and thermoplastic finish adhesion during equatorial crossings."}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "ISPM-15 হিট-ট্রিটেড প্যালেট" : "ISPM-15 Phytosanitary Pallets"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "আন্তর্জাতিক কাস্টমস ও কোয়ারেন্টাইন শর্ত অনুযায়ী হিট-ট্রিটেড প্যালেট নিশ্চিত করে যাতে কাঠে কোনো ছত্রাক বা কীটাণু না থাকে।"
                      : "Certified HT wooden pallets strictly devoid of bark and insect vectors, stamped to clear international customs quarantine in EU and US."}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "ইউএসবি ডেটা লগার ট্র্যাকিং" : "USB Transit Data Loggers"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "সমুদ্রপথের পুরো যাত্রায় তাপমাত্রা ও আর্দ্রতার সার্বক্ষণিক রেকর্ড পেতে ক্রেতার অনুরোধে কন্টেইনারে ইলেকট্রনিক ডেটা লগার সংযুক্ত করা হয়।"
                      : "Optional electronic USB temperature and RH loggers deployed inside pilot crates to verify maritime transit compliance at destination ports."}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-[#C89D43]/15 text-[#C89D43] flex items-center justify-center font-bold">
                    <Warehouse className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "মেঝে ও দেয়াল থেকে দূরত্ব" : "Airflow Pallet Clearance"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "ঠান্ডা আর্দ্রতা রোধে গুদামের মেঝে থেকে অন্তত ১৫ সেমি উঁচুতে এবং দেয়াল থেকে ৫০ সেমি দূরে চামড়া সংরক্ষণ করতে হবে।"
                      : "Maintain at least 15 cm clearance from concrete floors and 50 cm from exterior masonry to prevent capillary moisture migration."}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    <Wind className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "হিউমিডিটি কন্ট্রোল (৫৫%-৬৫%)" : "Climate Control (55%–65% RH)"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "গুদামে আর্দ্রতা ৬৫%-এর ওপরে গেলে ডিহিউমিডিফায়ার ব্যবহার করতে হবে এবং ১৮°C–২৪°C তাপমাত্রা বজায় রাখতে হবে।"
                      : "Deploy industrial dehumidifiers if ambient factory humidity exceeds 65% RH; sustain 18°C–24°C to keep natural fibers supple."}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "FIFO ইনভেন্টরি রোটেশন" : "FIFO Inventory Rotation"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "আগে আসা লট আগে ব্যবহার করুন (First In, First Out), যাতে কোনো চামড়া একটানা ৬ মাসের বেশি চাপে পড়ে না থাকে।"
                      : "Strict First-In, First-Out lot management prevents prolonged compression marks and maintains consistent cutting temper."}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-2.5 shadow-2xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-[#C89D43]/15 text-[#9E731C] dark:text-[#E5BE58] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#15120E] dark:text-[#FAF6F0]">
                    {language === "bn" ? "৪৮ ঘণ্টা কাটিং এক্লিমেটাইজেশন" : "48-Hour Acclimatization"}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {language === "bn"
                      ? "প্যাকেট খোলার পর কাটিং রুমে ৪৮ ঘণ্টা রেখে দিন যাতে চামড়ার ফাইবার স্বাভাবিক বায়ুমণ্ডলীয় ভারসাম্যে পৌঁছায়।"
                      : "Allow unboxed leather rolls to breathe in cutting room conditions for 48 hours prior to clicking to eliminate cutting size variance."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM SOURCING & TECHNICAL KNOWLEDGE STRIP */}
        {/* ============================================================== */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-50/80 via-white to-stone-50/80 dark:from-[#181310] dark:via-[#15100C] dark:to-[#181310] border border-stone-200 dark:border-[#C89D43]/35 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs dark:shadow-xl transition-colors duration-200">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E731C] dark:text-[#E5BE58]">
              <BookOpen className="w-4 h-4 text-[#C89D43] dark:text-[#E5BE58]" />
              <span>
                {language === "bn" ? "নলেজ হাব ও কোয়ালিটি ইন্টিগ্রেশন" : "Knowledge Hub & Quality Integration"}
              </span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#15120E] dark:text-white">
              {language === "bn"
                ? "আপনার গন্তব্য বন্দরের জন্য কাস্টম শিপিং প্যাকেজিং প্রয়োজন?"
                : "Need Custom Transit Packaging for Your Specific Destination Port?"}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {language === "bn"
                ? "আমাদের এক্সপোর্ট ডেস্ক ক্রেতার রুট ও জলবায়ুর ওপর ভিত্তি করে ডেসিক্যান্ট ব্যালান্স, প্যালেট র্যাপিং এবং ভেফার সিল প্রটোকল প্রস্তুত করে দেয়।"
                : "ExportVisor coordinates customized packaging, desiccant volume calculations, and pre-shipment pallet sign-offs for long-haul maritime routes to Europe, the Americas, and Asia."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => scrollToSection("knowledge-hub", true)}
              className="px-4 py-3 text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#1A1410] hover:bg-stone-50 dark:hover:bg-[#251D17] border border-stone-300 dark:border-[#C89D43]/40 rounded-lg transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              {language === "bn" ? "নলেজ হাবে ডিফেক্ট গাইড দেখুন" : "View Defect Guides"}
            </button>

            {onRequestQuote && (
              <button
                onClick={() => onRequestQuote("Custom Transit Preservation Advisory")}
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-gold-subtle hover:shadow-lg"
              >
                {language === "bn" ? "রপ্তানি পরামর্শ চান" : "Consult Tannery Export Desk"}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
