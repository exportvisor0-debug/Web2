import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../utils/analytics";

export interface GlossaryTerm {
  id: string;
  term: string;
  termBn: string;
  category: "Stages" | "Grain Tiers" | "Tannage Types" | "Specifications";
  tag: string;
  tagClass: string;
  definition: string;
  definitionBn: string;
  buyerTakeaway: string;
  buyerTakeawayBn: string;
  bestFor: string[];
  productLink?: string; // Links directly to specific catalogue product
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "wet-blue",
    term: "Wet Blue",
    termBn: "ওয়েট ব্লু (Wet Blue)",
    category: "Stages",
    tag: "Primary Stage",
    tagClass: "bg-cyan-50 text-cyan-900 border-cyan-200/80",
    definition:
      "Raw animal hides that have undergone beamhouse cleaning, pickling, and primary chrome tanning. Named for their moist state and characteristic pale cyan blue hue resulting from chromium salts. Wet blue is chemically stable against microbial decay, making it the global standard for international raw trade prior to shaving, re-tanning, and finishing.",
    definitionBn:
      "কাঁচা চামড়া লোমমুক্তকরণ ও প্রাইমারি ক্রোম ট্যানিংয়ের পর যে স্থিতিশীল নীলচে রূপ ধারণ করে তাকে ওয়েট ব্লু বলা হয়। এটি রাসায়নিকভাবে পচনরোধী এবং পরবর্তীতে রী-ট্যানিং, ডাইং ও ফিনিশিংয়ের উপযোগী কাঁচামাল হিসেবে বিশ্বজুড়ে রপ্তানি করা হয়।",
    buyerTakeaway:
      "Ideal for international re-tanning mills and finishing plants looking to apply their proprietary coloration, fatliquoring, and finishing formulas.",
    buyerTakeawayBn:
      "যেসব বিদেশি কারখানা ও ট্যানারি নিজস্ব ফর্মুলায় রী-ট্যানিং, ডাইং এবং ফিনিশিং করতে চায় তাদের জন্য এটি উপযুক্ত।",
    bestFor: ["International Re-tanning", "Automotive Leather Processing", "Split Suede Supply"],
    productLink: "wet-blue-leather",
  },
  {
    id: "crust-leather",
    term: "Crust Leather",
    termBn: "ক্রাস্ট লেদার (Crust Leather)",
    category: "Stages",
    tag: "Intermediate Stage",
    tagClass: "bg-amber-50 text-[#7A5A17] border-amber-200/80",
    definition:
      "Tanned leather that has been shaved to target caliper thickness, neutralized, re-tanned, drum-dyed, and thoroughly conditioned/dried without final protective topcoats. Crust provides complete freedom for manufacturers to apply seasonal pigment sprays, wax burnishing, oil pull-up effects, or mechanical embossing.",
    definitionBn:
      "ট্যানিং ও শেভিংয়ের পর সুনির্দিষ্ট পুরুত্বে ড্রামে রঙ করে শুকিয়ে রাখা চামড়া। এতে কোনো ফাইনাল টপকোট বা ফিনিশিং থাকে না, ফলে বায়ার বা কারখানা তাদের পছন্দমতো রঙ, পলিশ, অয়েল কিংবা এমবসিং করতে পারে।",
    buyerTakeaway:
      "Offers maximum flexibility and shorter lead times for footwear and handbag brands needing rapid custom color adjustments closer to market launch.",
    buyerTakeawayBn:
      "ফুটওয়্যার এবং ফ্যাশন ব্র্যান্ডগুলোর জন্য আদর্শ—কারণ কম সময়ে ও কম ঝুঁকিতে বাজারের চাহিদা অনুযায়ী যেকোনো ফিনিশ দেওয়া যায়।",
    bestFor: ["Footwear Uppers", "Leather Handbags", "Embossed Belts", "Small Leather Goods"],
    productLink: "crust-leather",
  },
  {
    id: "full-grain",
    term: "Full Grain Leather",
    termBn: "ফুল গ্রেইন লেদার (Full Grain)",
    category: "Grain Tiers",
    tag: "Premium Grade Tier",
    tagClass: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
    definition:
      "The undisputed gold standard of leather. Full grain encompasses the outermost epidermal layer where the natural hair follicles, grain density, and original pore structure remain 100% intact without sanding, buffing, or snuffed corrections. It preserves maximum tensile strength, breathability, and develops an enviable, rich vintage patina over years of use.",
    definitionBn:
      "চামড়ার সবচেয়ে দামি ও সর্বোচ্চ মানসম্পন্ন গ্রেড। এতে চামড়ার প্রাকৃতিক লোমকূপ ও উপরের স্তর কোনো প্রকার স্যান্ডিং বা বাফিং ছাড়াই অক্ষত রাখা হয়। এটি অত্যন্ত টেকসই, আরামদায়ক ও সময়ের সাথে সাথে চমৎকার চকচকে প্যাটিনা ধারণ করে।",
    buyerTakeaway:
      "Highest durability and resale prestige. Perfect for heritage bootmakers, luxury bag collections, and high-end artisanal goods.",
    buyerTakeawayBn:
      "সর্বোচ্চ স্থায়িত্ব ও প্রিমিয়াম ভ্যালু। লাক্সারি বুট জুতো, প্রিমিয়াম লেদার ব্যাগ ও রাজকীয় আসবাবের জন্য প্রধান পছন্দ।",
    bestFor: ["Heritage Work Boots", "Luxury Briefcases", "Fine Jackets", "High-End Upholstery"],
    productLink: "full-grain-leather",
  },
  {
    id: "split-leather",
    term: "Split Leather",
    termBn: "স্প্লিট লেদার (Split Leather / Suede)",
    category: "Grain Tiers",
    tag: "High Utility & Suede",
    tagClass: "bg-stone-100 text-stone-800 border-stone-300",
    definition:
      "When a thick bovine hide (often 2.5mm–4.0mm) is passed through a precision horizontal band knife, it is split into an upper grain cut and a bottom cut. This fibrous lower layer is called 'Split Leather'. Possessing uniform density and high tear resistance without a grain epidermis, it is processed into soft suede, durable industrial work gloves, safety footwear, or polyurethane-laminated bicast leather.",
    definitionBn:
      "মোটা চামড়াকে যখন স্প্লিটিং মেশিনে অনুভূমিকভাবে দুই ভাগে কাটা হয়, তখন নিচের আঁশযুক্ত অংশটিকে স্প্লিট লেদার বলা হয়। এটি সোয়েড লেদার, ভারী কাজের গ্লাভস এবং সেফটি বুট তৈরিতে বিশ্বব্যাপী অত্যন্ত জনপ্রিয় ও সাশ্রয়ী।",
    buyerTakeaway:
      "Extremely cost-effective while delivering robust physical tear strength. The primary material choice for safety wear, heavy work gloves, and casual suede footwear.",
    buyerTakeawayBn:
      "অত্যন্ত সাশ্রয়ী মূল্যে সর্বোচ্চ টিয়ার বা ছেঁড়া প্রতিরোধী শক্তি পাওয়া যায়। সেফটি গিয়ার ও সোয়েড জুতোর জন্য নিখুঁত।",
    bestFor: ["Industrial Work Gloves", "Safety Boots & Shoes", "Casual Suede Footwear", "Lining Components"],
    productLink: "split-leather",
  },
  {
    id: "top-grain",
    term: "Top Grain Leather",
    termBn: "টপ গ্রেইন লেদার (Top Grain)",
    category: "Grain Tiers",
    tag: "Commercial Luxury",
    tagClass: "bg-blue-50 text-blue-900 border-blue-200/80",
    definition:
      "The upper layer of the hide that has been very lightly buffed or snuffed to eliminate minor surface flaws, barbed wire scratches, or tick marks, followed by an ultra-thin protective pigmentation and clear topcoat. It offers uniform aesthetics, exceptional cutting yield, and stain resistance while retaining supple flexibility.",
    definitionBn:
      "চামড়ার উপরের স্তর যাতে সামান্য দাগ বা স্ক্র্যাচ দূর করতে হালকা বাফিং করে প্রটেকটিভ কোটিং দেওয়া হয়। এটি দেখতে মসৃণ, কাটিংয়ে অপচয় কম হয় এবং দাগ প্রতিরোধী।",
    buyerTakeaway:
      "The industry benchmark for commercial footwear lines, volume handbag collections, and corporate furniture where surface consistency across large batches is mandatory.",
    buyerTakeawayBn:
      "বাণিজ্যিক ফুটওয়্যার ও আসবাবের প্রধান পছন্দ—কারণ প্রতিটি ব্যাচে রঙের মিল ও সমরূপতা পাওয়া যায়।",
    bestFor: ["Commercial Footwear", "Fashion Handbags", "Office Furniture", "Tech Sleeves & Wallets"],
    productLink: "top-grain-leather",
  },
  {
    id: "substance-caliper",
    term: "Substance / Caliper (mm)",
    termBn: "সাবস্ট্যান্স ও পুরুত্ব (Substance / Caliper)",
    category: "Specifications",
    tag: "Thickness Measurement",
    tagClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    definition:
      "In the international leather trade, 'substance' refers to the calibrated thickness of the hide, measured in millimeters (mm) with a precision dial or electronic micrometer caliper across designated points (butt, shoulder, belly). Typical ranges span from 0.7–0.9mm (soft linings/garments) to 1.1–1.3mm (footwear uppers) up to 2.0mm+ (heavy work boots and belts).",
    definitionBn:
      "চামড়ার পুরুত্ব বা থিকনেসকে আন্তর্জাতিক বাজারে সাবস্ট্যান্স বলা হয়। এটি মিলিমিটারে (মিমি) মাপা হয়—যেমন ০.৮–১.০ মিমি লাইনিংয়ের জন্য এবং ১.২–১.৪ মিমি সাধারণ জুতোর আপারের জন্য নির্ধারিত থাকে।",
    buyerTakeaway:
      "Always declare your target thickness and acceptable tolerance (e.g., 1.2–1.4 mm ±0.1mm) in technical RFQs to ensure precise mechanical shaving.",
    buyerTakeawayBn:
      "RFQ দেওয়ার সময় কাঙ্ক্ষিত পুরুত্ব ও সহনশীলতার মাত্রা (যেমন ±০.১ মিমি) উল্লেখ করা আবশ্যক।",
    bestFor: ["Upper Thickness Planning", "Lining Calibration", "Belt Splitting Accuracy"],
  },
  {
    id: "temper-firmness",
    term: "Temper (Hand Feel)",
    termBn: "টেম্পার বা হ্যান্ড ফিল (Temper)",
    category: "Specifications",
    tag: "Flexibility & Feel",
    tagClass: "bg-amber-50 text-amber-900 border-amber-200/80",
    definition:
      "Temper describes the physical pliability, stiffness, bounce, and softness of the leather when handled. Categorized broadly as Soft (garments, gloves, drapeable bags), Semi-Soft (sneakers, casual loafers), Medium-Firm (structured dress shoes, luggage), and Firm (heavy saddlery, belts, knife sheaths). Controlled during fatliquoring and dry milling.",
    definitionBn:
      "চামড়া হাত দিয়ে ধরলে কতটা নরম বা শক্ত অনুভূত হয় তাকে টেম্পার বলে। যেমন—পোশাকের চামড়া নরম (Soft) হয়, আর বেল্ট বা স্ট্রাকচার্ড ব্যাগের চামড়া তুলনামূলক শক্ত (Firm) হয়।",
    buyerTakeaway:
      "Specify both target temper and final product application so tanneries can dial in the appropriate synthetic and natural fatliquor ratios in drum processing.",
    buyerTakeawayBn:
      "আপনার পণ্যের ধরন অনুযায়ী সফট, মিডিয়াম কিংবা ফার্ম টেম্পার স্পষ্ট করে জানাতে হয়।",
    bestFor: ["Garment Draping", "Shoe Vamp Flexibility", "Structured Handbag Rigidity"],
  },
  {
    id: "vegetable-vs-chrome",
    term: "Vegetable vs. Chrome Tanning",
    termBn: "ভেজিটেবল বনাম ক্রোম ট্যানিং (Veg vs Chrome)",
    category: "Tannage Types",
    tag: "Tannage Chemistry",
    tagClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    definition:
      "Chrome Tanning uses basic chromium sulfate salts, producing 85%+ of global leather due to its rapid drum cycle (1–2 days), remarkable water resistance, thermal stability, and soft hand. Vegetable Tanning utilizes organic plant polyphenols extracted from mimosa, chestnut, or quebracho bark, yielding firmer, biodegradable leather that molds with time and patinas deeply.",
    definitionBn:
      "ক্রোম ট্যানিংয়ে ক্রোমিয়াম সল্ট ব্যবহার করা হয়, যা চামড়াকে নরম, নমনীয় এবং জলরোধী করে। অন্যদিকে ভেজিটেবল ট্যানিংয়ে উদ্ভিজ্জ নির্যাস (গাছের বাকল) ব্যবহার করা হয়, যা পরিবেশবান্ধব এবং ঐতিহ্যবাহী শক্ত চামড়া তৈরি করে।",
    buyerTakeaway:
      "Choose chrome for soft footwear, jackets, and water resistance; choose vegetable tanning for classic belts, tooling leather, watch straps, and eco-heritage lines.",
    buyerTakeawayBn:
      "নরম জুতোর জন্য ক্রোম ট্যানিং এবং প্রিমিয়াম বেল্ট বা পরিবেশবান্ধব পণ্যের জন্য ভেজ-ট্যান বেছে নিন।",
    bestFor: ["Eco-Conscious Collections", "Artisanal Belts", "High-Performance Footwear"],
  },
  {
    id: "aniline-vs-pigmented",
    term: "Aniline vs. Pigmented Finishing",
    termBn: "অ্যানিলিন বনাম পিগমেন্টেড ফিনিশ",
    category: "Grain Tiers",
    tag: "Finishing Chemistry",
    tagClass: "bg-indigo-50 text-indigo-900 border-indigo-200/80",
    definition:
      "Aniline leather is drum-dyed exclusively with transparent organic dyes with zero opaque pigment covering the surface, showcasing the authentic pores and skin characteristics. Pigmented leather applies an opaque mineral pigment dispersion and a polymeric polyurethane/acrylic clear coat, ensuring 100% color consistency and stain protection.",
    definitionBn:
      "অ্যানিলিন চামড়ায় স্বচ্ছ ডাইং করা হয় ফলে কোনো আসল টেক্সচার ঢাকা পড়ে না। আর পিগমেন্টেড চামড়ায় বিশেষ পলিমার রঙের স্তর থাকে যা সহজে ময়লা হতে দেয় না ও স্ক্র্যাচ থেকে রক্ষা করে।",
    buyerTakeaway:
      "Aniline offers the pinnacle of natural luxury for high-end boutique goods; Pigmented is the gold standard for high-traffic contract upholstery and uniform footwear.",
    buyerTakeawayBn:
      "লাক্সারি বুটিক পণ্যের জন্য অ্যানিলিন এবং দীর্ঘস্থায়ী ব্যবহার্য বাণিজ্যিক জুতোর জন্য পিগমেন্টেড নির্বাচন করুন।",
    bestFor: ["Luxury Furniture", "Automotive Interiors", "Easy-Clean Footwear"],
  },
  {
    id: "pre-shipment-inspection",
    term: "Pre-Shipment Inspection",
    termBn: "প্রি-শিপমেন্ট কোয়ালিটি ইন্সপেকশন",
    category: "Specifications",
    tag: "Quality Control",
    tagClass: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
    definition:
      "Physical hide-by-hide quality inspection conducted at the tannery floor prior to container loading. ExportVisor coordinates calibration checks on substance thickness, tensile strength, color crocking, and surface cleanliness to ensure buyer specifications are strictly met.",
    definitionBn:
      "কন্টেইনারে লোড করার পূর্বে ট্যানারিতে সরাসরি প্রতিটি চামড়ার ফিজিক্যাল কোয়ালিটি পরীক্ষা। চামড়ার পুরুত্ব (ক্যালিপার), রঙের স্থায়িত্ব ও সারফেস ফিনিশ বায়ারের রিকোয়ারমেন্ট অনুযায়ী নিখুঁত রাখা নিশ্চিত করা হয়।",
    buyerTakeaway:
      "Provides verified physical assurance that your export leather batch complies with required thickness, temper, and finish before port dispatch.",
    buyerTakeawayBn:
      "জাহাজে পণ্য লোড হওয়ার পূর্বেই পণ্যের কোয়ালিটি নিশ্চিত করার সবচেয়ে নির্ভরযোগ্য পদ্ধতি।",
    bestFor: ["Pre-Shipment Verification", "Container Stuffing Approval", "Buyer Brand Protection"],
  },
];

interface LeatherGlossarySectionProps {
  onSelectProduct?: (productId: string) => void;
  onRequestQuote?: (termName: string) => void;
}

export const LeatherGlossarySection: React.FC<LeatherGlossarySectionProps> = ({
  onSelectProduct,
  onRequestQuote,
}) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Stages", "Grain Tiers", "Tannage Types", "Specifications"];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesCategory =
        activeCategory === "All" || term.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        term.term.toLowerCase().includes(q) ||
        term.termBn.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.bestFor.some((item) => item.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedTerms = showAll ? filteredTerms : filteredTerms.slice(0, 2);

  return (
    <section
      id="leather-glossary"
      className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200/90 dark:border-stone-800/80 relative transition-colors duration-200"
      aria-label="Leather Industry Terms Glossary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Fade-In-Up Animation */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 dark:border-stone-800 gap-6"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>
                  {language === "bn" ? "লেদার গাইড ও পরিভাষা" : "Leather Sourcing Glossary"}
                </span>
              </div>
              <SectionShareButton
                path="/glossary"
                sectionName="Leather Glossary & Industry Terminology"
              />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#FAF6F0] leading-tight">
              {language === "bn"
                ? "আন্তর্জাতিক লেদার ট্রেড পরিভাষা নির্দেশিকা"
                : "Demystifying Leather: Terms Every Buyer Must Know"}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              {language === "bn"
                ? "ওয়েট ব্লু, ক্রাস্ট, ফুল গ্রেইন ও স্প্লিট লেদারের মতো গুরুত্বপূর্ণ বৈশ্বিক পরিভাষাগুলোর সহজ ও প্রাতিষ্ঠানিক ব্যাখ্যা—যাতে নন-এক্সপার্ট ও আন্তর্জাতিক বায়াররা আত্মবিশ্বাসের সাথে সঠিক স্পেসিফিকেশন নির্বাচন করতে পারেন।"
                : "A definitive reference guide defining essential tannery terminology—from 'Wet Blue' and 'Crust' to 'Full Grain' and 'Split Leather'—designed to empower global brand managers and procurement specialists."}
            </p>
          </div>

          {/* Quick Help Card */}
          <div className="p-4 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-[#C89D43]/30 rounded-xl max-w-sm text-xs text-stone-700 dark:text-stone-300 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-[#15120E] dark:text-[#FAF6F0] mb-1">
              <HelpCircle className="w-4 h-4 text-[#C89D43]" />
              <span>
                {language === "bn" ? "টেকনিক্যাল টিম সহায়তা" : "Need Spec Guidance?"}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
              {language === "bn"
                ? "আপনার কাঙ্ক্ষিত পণ্যের জন্য কোন সাবস্ট্যান্স ও গ্রেড উপযুক্ত তা নিশ্চিত না হলে আমাদের সাভার এক্সপোর্ট ডেস্কের সাথে কথা বলুন।"
                : "Unsure which substance, temper, or tannage fits your footwear or accessories tech pack? Our Savar engineering desk is ready to advise."}
            </p>
          </div>
        </motion.div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          
          {/* Segmented Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-700">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAll(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs border border-[#C89D43]"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
                  }`}
                >
                  {cat === "All"
                    ? language === "bn"
                      ? "সব পরিভাষা"
                      : "All Terms"
                    : cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              placeholder={
                language === "bn"
                  ? "খুঁজুন (যেমন: wet blue, crust, split...)"
                  : "Search terms (e.g., wet blue, split, temper)..."
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#120E0B] border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89D43]/40 focus:border-[#C89D43] text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 shadow-2xs"
            />
          </div>

        </div>

        {/* Glossary Grid */}
        {filteredTerms.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F5] dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl p-8">
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              No glossary terms match your search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setShowAll(false);
              }}
              className="mt-3 text-xs font-semibold text-[#C89D43] hover:underline cursor-pointer"
            >
              Reset search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {displayedTerms.map((term) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, borderColor: "rgba(200, 157, 67, 0.6)" }}
                className="bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all duration-200 group relative cursor-pointer"
              >
                <div>
                  {/* Top Bar with Category & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                      {term.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${term.tagClass} font-semibold`}
                    >
                      {term.tag}
                    </span>
                  </div>

                  {/* Term Title */}
                  <h3 className="font-display text-2xl font-bold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-[#C89D43] transition-colors leading-tight">
                    {language === "bn" ? term.termBn : term.term}
                  </h3>

                  {/* Definition */}
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed text-pretty">
                    {language === "bn" ? term.definitionBn : term.definition}
                  </p>

                  {/* Buyer Procurement Takeaway */}
                  <div className="mt-4 p-3 bg-stone-50 dark:bg-[#181310] border-l-2 border-[#C89D43] rounded-r-lg text-xs">
                    <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58] block mb-0.5">
                      {language === "bn" ? "বায়ার গাইডলাইন:" : "Buyer Takeaway:"}
                    </span>
                    <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {language === "bn" ? term.buyerTakeawayBn : term.buyerTakeaway}
                    </span>
                  </div>

                  {/* Typical Applications Tags */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5">
                      {language === "bn" ? "প্রচলিত ব্যবহার ক্ষেত্র" : "Common Applications"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {term.bestFor.map((app, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#C89D43]" />
                          <span>{app}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  {term.productLink ? (
                    <button
                      onClick={() => {
                        trackEvent("glossary_catalogue_click", { term_id: term.id });
                        if (onSelectProduct) {
                          onSelectProduct(term.productLink!);
                        }
                      }}
                      className="inline-flex items-center gap-1 font-bold text-[#7A5A17] dark:text-[#E5BE58] hover:text-[#C89D43] transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>
                        {language === "bn"
                          ? "ক্যাটালগে এই চামড়া দেখুন"
                          : "View in Catalogue"}
                      </span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-stone-400 dark:text-stone-500 text-[11px]">
                      {language === "bn" ? "টেকনিক্যাল প্যারামিটার" : "Technical Specification Standard"}
                    </span>
                  )}

                  <button
                    onClick={() => {
                      trackEvent("glossary_inquiry_click", { term: term.term });
                      if (onRequestQuote) {
                        onRequestQuote(term.term);
                      }
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300 hover:text-[#15120E] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>
                      {language === "bn" ? "কোটেশন রিকোয়েস্ট" : "Inquire Spec"}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D43]" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* View All / Show Less Expandable Action */}
        {filteredTerms.length > 2 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#1A1410] hover:bg-stone-50 dark:hover:bg-[#251D17] border border-[#C89D43] shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <span>
                {showAll
                  ? (language === "bn" ? "সংক্ষিপ্ত করুন" : "Show Less")
                  : (language === "bn"
                      ? `সবগুলো টার্ম দেখুন (${filteredTerms.length}টি)`
                      : `View All Terms (${filteredTerms.length} Definitions)`)}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-[#C89D43] group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#C89D43] group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-lg font-bold text-[#15120E] dark:text-white">
              {language === "bn"
                ? "আপনার স্পেসিফিকেশন অনুযায়ী স্যাম্পল চান?"
                : "Need physical counter-samples matched to your exact tech pack?"}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xl">
              {language === "bn"
                ? "আমাদের ল্যাবে সোয়াচ কালার, সাবস্ট্যান্স ও টেম্পার মিলিয়ে দ্রুত ট্রায়াল কাট ও কুরিয়ার শিপমেন্টের সুবিধা রয়েছে।"
                : "Submit your target substance, temper, and master color swatch for rapid lab-dip development and international air express couriering."}
            </p>
          </div>
          <button
            onClick={() => {
              if (onRequestQuote) {
                onRequestQuote("Custom Spec Inquiry");
              }
            }}
            className="px-5 py-2.5 text-xs font-bold text-white dark:text-[#15120E] bg-[#15120E] dark:bg-[#D6AC4B] hover:bg-[#251F19] dark:hover:bg-[#E5BE58] rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            {language === "bn" ? "স্পেসিফিকেশন আলোচনা করুন" : "Discuss Tech Pack"}
          </button>
        </div>

      </div>
    </section>
  );
};
