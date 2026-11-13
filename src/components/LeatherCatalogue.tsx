import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LEATHER_PRODUCTS, LeatherProduct } from "../data/products";
import { trackEvent } from "../utils/analytics";
import {
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  Info,
  ShieldCheck,
  Leaf,
  Link2,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Layers,
  ChevronDown,
  Gauge,
  Compass,
  X,
  LayoutGrid,
  List,
} from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";
import { useLanguage } from "../context/LanguageContext";
import { LeatherImageMagnifier } from "./LeatherImageMagnifier";

interface LeatherCatalogueProps {
  onSelectProduct: (product: LeatherProduct) => void;
  onRequestQuote: (prefillProduct: string) => void;
}

type StageFilter = "All" | "Finished" | "Crust" | "Wet Blue";

const ITEMS_PER_PAGE = 12;

export const LeatherCatalogue: React.FC<LeatherCatalogueProps> = ({
  onSelectProduct,
  onRequestQuote,
}) => {
  const { language, t } = useLanguage();
  const isBn = language === "bn";

  // Filter States
  const [selectedStage, setSelectedStage] = useState<StageFilter>("Crust");
  const [selectedTanning, setSelectedTanning] = useState<string>("All");
  const [selectedGrain, setSelectedGrain] = useState<string>("All");
  const [selectedAnimal, setSelectedAnimal] = useState<string>("All");
  const [selectedApplication, setSelectedApplication] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlySustainable, setOnlySustainable] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedStage,
    selectedTanning,
    selectedGrain,
    selectedAnimal,
    selectedApplication,
    searchQuery,
    onlySustainable,
  ]);

  const handleCopyProductLink = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const url = `https://exportvisor.com/product/${productId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(productId);
    trackEvent("copy_product_link_card", { product_id: productId });
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stage counts for badges
  const stageCounts = useMemo(() => {
    return {
      All: LEATHER_PRODUCTS.length,
      Finished: LEATHER_PRODUCTS.filter((p) => p.stage === "Finished").length,
      Crust: LEATHER_PRODUCTS.filter((p) => p.stage === "Crust").length,
      "Wet Blue": LEATHER_PRODUCTS.filter((p) => p.stage === "Wet Blue").length,
    };
  }, []);

  // Filter options
  const tanningOptions = [
    "All",
    "Chrome Tanned",
    "Vegetable Tanned",
    "Semi-Chrome",
    "Semi-Veg",
    "Chrome Free",
    "Combination Tanned",
    "Oil Tanned",
  ];

  const grainOptions = [
    "All",
    "Full Grain",
    "Top Grain",
    "Corrected Grain",
    "Split",
    "Suede",
    "Nubuck",
    "Embossed",
  ];

  const animalOptions = ["All", "Cow", "Goat", "Cow & Buffalo"];

  const applicationChips = [
    "All",
    "Footwear",
    "Bags & Luggage",
    "Upholstery",
    "Small Leather Goods",
    "Garments & Gloves",
    "Belts",
  ];

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return LEATHER_PRODUCTS.filter((product) => {
      const matchesStage =
        selectedStage === "All" || product.stage === selectedStage;

      const matchesTanning =
        selectedTanning === "All" ||
        product.tanningMethod.toLowerCase().includes(selectedTanning.toLowerCase()) ||
        (selectedTanning === "Chrome Free" &&
          product.tanningMethod.toLowerCase().includes("chrome free"));

      const matchesGrain =
        selectedGrain === "All" ||
        product.grainType.toLowerCase().includes(selectedGrain.toLowerCase());

      const matchesAnimal =
        selectedAnimal === "All" ||
        product.animal.toLowerCase().includes(selectedAnimal.toLowerCase());

      const matchesApplication =
        selectedApplication === "All" ||
        product.applications.some((app) =>
          app.toLowerCase().includes(selectedApplication.toLowerCase())
        );

      const matchesSustainable = onlySustainable ? Boolean(product.isSustainable) : true;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        product.name.toLowerCase().includes(q) ||
        (product.articleNumber && product.articleNumber.toLowerCase().includes(q)) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.tanningMethod.toLowerCase().includes(q) ||
        product.grainType.toLowerCase().includes(q) ||
        product.applications.some((app) => app.toLowerCase().includes(q));

      return (
        matchesStage &&
        matchesTanning &&
        matchesGrain &&
        matchesAnimal &&
        matchesApplication &&
        matchesSustainable &&
        matchesSearch
      );
    });
  }, [
    selectedStage,
    selectedTanning,
    selectedGrain,
    selectedAnimal,
    selectedApplication,
    onlySustainable,
    searchQuery,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const activeFilterCount =
    (selectedTanning !== "All" ? 1 : 0) +
    (selectedGrain !== "All" ? 1 : 0) +
    (selectedAnimal !== "All" ? 1 : 0) +
    (selectedApplication !== "All" ? 1 : 0) +
    (onlySustainable ? 1 : 0);

  const hasActiveFilters =
    activeFilterCount > 0 ||
    selectedStage !== "Crust" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedStage("Crust");
    setSelectedTanning("All");
    setSelectedGrain("All");
    setSelectedAnimal("All");
    setSelectedApplication("All");
    setOnlySustainable(false);
    setSearchQuery("");
  };

  return (
    <section
      id="leather-products"
      className="py-16 sm:py-24 bg-[#FCFBF8] dark:bg-[#0B0806] border-b border-[#EAE3D2] dark:border-stone-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-[#EAE3D2] dark:border-stone-800/80 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E0] dark:bg-[#C89D43]/20 text-[#8C6214] dark:text-[#F3CE6D] border border-[#C89D43]/40 text-xs font-bold uppercase tracking-wider font-mono">
                <Compass className="w-3.5 h-3.5 text-[#C89D43]" />
                {t.catalogue.kicker}
              </span>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                · 74 Official Verified Articles
              </span>
              <SectionShareButton path="/products" sectionName={t.catalogue.kicker} />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1712] dark:text-[#FAF6F0] leading-tight">
              {t.catalogue.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {t.catalogue.subtitle}
            </p>
          </div>

          {/* Sourcing Transparency Note */}
          <div className="p-4 bg-white dark:bg-[#140F0B] border border-[#D6AC4B]/40 dark:border-[#C89D43]/30 rounded-xl max-w-md text-xs text-stone-600 dark:text-stone-300 shadow-sm">
            <div className="flex items-center gap-1.5 font-bold text-[#1C1712] dark:text-[#FAF6F0] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C89D43]" />
              <span className="text-xs uppercase tracking-wide font-mono text-[#8C6214] dark:text-[#E5BE58]">
                {t.catalogue.sourcingNoteTitle}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
              {t.catalogue.sourcingNote}
            </p>
            <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px]">
              <span className="text-[#8C6214] dark:text-[#F3CE6D] font-bold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-[#C89D43]" />
                {isBn ? "থিকনেস: বায়ারের টেক প্যাক অনুযায়ী নিখুঁত শেভিং" : "Thickness: Customized strictly to buyer tech pack"}
              </span>
              <span className="text-stone-400 font-mono">Savar, Dhaka</span>
            </div>
          </div>
        </motion.div>

        {/* 1. LUXURY ATELIER STAGE NAVIGATION TABS */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase font-bold tracking-wider text-[#8C6214] dark:text-[#E5BE58] flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-[#C89D43]" />
              <span>{isBn ? "প্রোডাকশন পর্যায় নির্বাচন করুন (ক্লিক করে দেখুন)" : "Select Production Stage"}</span>
            </div>
            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 hidden sm:inline">
              Direct Production Stage Filter
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 p-2 bg-[#F6F2E8]/80 dark:bg-[#15100B] border border-[#E5DBBE] dark:border-[#2C2117] rounded-2xl">
            
            {/* 1. Crust Leather Tab */}
            <button
              type="button"
              onClick={() => setSelectedStage("Crust")}
              className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                selectedStage === "Crust"
                  ? "bg-white dark:bg-[#231A12] text-[#1A140E] dark:text-[#FAF6F0] border border-[#C89D43] shadow-[0_6px_22px_-4px_rgba(200,157,67,0.28)] ring-1 ring-[#C89D43]/30"
                  : "bg-white/60 dark:bg-[#16100C]/70 text-stone-700 dark:text-stone-300 border border-transparent hover:bg-white dark:hover:bg-[#1C150F] hover:border-[#D6AC4B]/40"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider font-mono ${
                  selectedStage === "Crust" ? "text-[#8C6214] dark:text-[#F3CE6D]" : "text-stone-600 dark:text-stone-400"
                }`}>
                  {isBn ? "ক্রাস্ট লেদার" : "Crust Leather"}
                </span>
                <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                  selectedStage === "Crust"
                    ? "bg-[#FAF3E0] dark:bg-[#C89D43]/25 text-[#8C6214] dark:text-[#F3CE6D] border border-[#C89D43]/50"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                }`}>
                  {stageCounts.Crust} Articles
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#1C1712] dark:text-white truncate">Chrome & Veg Crust, Drum Dyed</div>
              <p className="text-[10px] sm:text-[11px] mt-1 text-stone-500 dark:text-stone-400 line-clamp-1">
                Semi-finished substrate for finishing tanneries
              </p>
              {selectedStage === "Crust" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#C89D43]" />
              )}
            </button>

            {/* 2. Finished Leather Tab */}
            <button
              type="button"
              onClick={() => setSelectedStage("Finished")}
              className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                selectedStage === "Finished"
                  ? "bg-white dark:bg-[#231A12] text-[#1A140E] dark:text-[#FAF6F0] border border-[#C89D43] shadow-[0_6px_22px_-4px_rgba(200,157,67,0.28)] ring-1 ring-[#C89D43]/30"
                  : "bg-white/60 dark:bg-[#16100C]/70 text-stone-700 dark:text-stone-300 border border-transparent hover:bg-white dark:hover:bg-[#1C150F] hover:border-[#D6AC4B]/40"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider font-mono ${
                  selectedStage === "Finished" ? "text-[#8C6214] dark:text-[#F3CE6D]" : "text-stone-600 dark:text-stone-400"
                }`}>
                  {isBn ? "ফিনিশড লেদার" : "Finished Leather"}
                </span>
                <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                  selectedStage === "Finished"
                    ? "bg-[#FAF3E0] dark:bg-[#C89D43]/25 text-[#8C6214] dark:text-[#F3CE6D] border border-[#C89D43]/50"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                }`}>
                  {stageCounts.Finished} Articles
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#1C1712] dark:text-white truncate">Full Aniline, Pull-Up, Nappa</div>
              <p className="text-[10px] sm:text-[11px] mt-1 text-stone-500 dark:text-stone-400 line-clamp-1">
                Luxury shoes, bags, garments & upholstery
              </p>
              {selectedStage === "Finished" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#C89D43]" />
              )}
            </button>

            {/* 3. Wet Blue & Wet White Tab */}
            <button
              type="button"
              onClick={() => setSelectedStage("Wet Blue")}
              className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                selectedStage === "Wet Blue"
                  ? "bg-white dark:bg-[#231A12] text-[#1A140E] dark:text-[#FAF6F0] border border-[#C89D43] shadow-[0_6px_22px_-4px_rgba(200,157,67,0.28)] ring-1 ring-[#C89D43]/30"
                  : "bg-white/60 dark:bg-[#16100C]/70 text-stone-700 dark:text-stone-300 border border-transparent hover:bg-white dark:hover:bg-[#1C150F] hover:border-[#D6AC4B]/40"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider font-mono ${
                  selectedStage === "Wet Blue" ? "text-[#8C6214] dark:text-[#F3CE6D]" : "text-stone-600 dark:text-stone-400"
                }`}>
                  {isBn ? "ওয়েট ব্লু ও ওয়েট হোয়াইট" : "Wet Blue & Wet White"}
                </span>
                <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                  selectedStage === "Wet Blue"
                    ? "bg-[#FAF3E0] dark:bg-[#C89D43]/25 text-[#8C6214] dark:text-[#F3CE6D] border border-[#C89D43]/50"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                }`}>
                  {stageCounts["Wet Blue"]} Articles
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#1C1712] dark:text-white truncate">Full Grain Bovine & Splits</div>
              <p className="text-[10px] sm:text-[11px] mt-1 text-stone-500 dark:text-stone-400 line-clamp-1">
                Raw chrome tanned hides & chrome-free wet white
              </p>
              {selectedStage === "Wet Blue" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#C89D43]" />
              )}
            </button>

            {/* 4. All Collections Tab */}
            <button
              type="button"
              onClick={() => setSelectedStage("All")}
              className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                selectedStage === "All"
                  ? "bg-white dark:bg-[#231A12] text-[#1A140E] dark:text-[#FAF6F0] border border-[#C89D43] shadow-[0_6px_22px_-4px_rgba(200,157,67,0.28)] ring-1 ring-[#C89D43]/30"
                  : "bg-white/60 dark:bg-[#16100C]/70 text-stone-700 dark:text-stone-300 border border-transparent hover:bg-white dark:hover:bg-[#1C150F] hover:border-[#D6AC4B]/40"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider font-mono ${
                  selectedStage === "All" ? "text-[#8C6214] dark:text-[#F3CE6D]" : "text-stone-600 dark:text-stone-400"
                }`}>
                  {isBn ? "সকল আর্টিকেল" : "All Collections"}
                </span>
                <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                  selectedStage === "All"
                    ? "bg-[#FAF3E0] dark:bg-[#C89D43]/25 text-[#8C6214] dark:text-[#F3CE6D] border border-[#C89D43]/50"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                }`}>
                  {stageCounts.All} Total
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#1C1712] dark:text-white truncate">Full Tannery Export Portfolio</div>
              <p className="text-[10px] sm:text-[11px] mt-1 text-stone-500 dark:text-stone-400 line-clamp-1">
                Complete Savar collection & bespoke formulations
              </p>
              {selectedStage === "All" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#C89D43]" />
              )}
            </button>

          </div>
        </div>

        {/* 2. EXECUTIVE SEARCH & FILTER CONSOLE */}
        <div className="bg-white dark:bg-[#140F0B] border border-[#E5DBBE] dark:border-stone-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm transition-colors">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            
            {/* High-Precision Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E731C] dark:text-[#E5BE58]" />
              <input
                type="text"
                placeholder={
                  isBn
                    ? "আর্টিকেল নম্বর (ART-01, CR-05), চামড়ার ধরন, জুতা, সোফা দিয়ে খুঁজুন..."
                    : "Search by article number (e.g. ART-01, CR-05, WB-01), name, grain, shoe, bag..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 sm:pr-24 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] dark:bg-[#1A140F] border border-[#DED4BD] dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C89D43]/30 focus:border-[#C89D43] text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 sm:right-12 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-white cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-[#8C6214] dark:text-[#E5BE58] pointer-events-none hidden sm:inline">
                {filteredProducts.length} Results
              </span>
            </div>

            {/* Quick Filter Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              
              {/* Sustainable Filter Toggle */}
              <button
                type="button"
                onClick={() => setOnlySustainable(!onlySustainable)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border cursor-pointer transition-all whitespace-nowrap ${
                  onlySustainable
                    ? "bg-[#FAF4E2] text-[#8C6214] border-[#C89D43] shadow-xs font-bold dark:bg-[#C89D43]/20 dark:text-[#F3CE6D]"
                    : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-700 dark:text-stone-300 border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43]/70"
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>LWG / Eco</span>
              </button>

              {/* Detailed Filters Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border cursor-pointer transition-all whitespace-nowrap ${
                  showAdvancedFilters || selectedTanning !== "All" || selectedApplication !== "All"
                    ? "bg-[#FAF4E2] dark:bg-[#C89D43]/20 text-[#8C6214] dark:text-[#F3CE6D] border-[#C89D43] shadow-xs font-bold"
                    : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-700 dark:text-stone-300 border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43]/70"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C89D43]" />
                <span>{isBn ? "আরও ফিল্টার" : "More Filters"}</span>
                {(selectedTanning !== "All" || selectedApplication !== "All") && (
                  <span className="w-4 h-4 rounded-full bg-[#C89D43] text-[#15120E] text-[10px] font-bold flex items-center justify-center font-mono">
                    {(selectedTanning !== "All" ? 1 : 0) + (selectedApplication !== "All" ? 1 : 0)}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvancedFilters ? "rotate-180" : ""}`} />
              </button>

              {/* Grid / List View Switcher */}
              <div className="inline-flex items-center p-1 bg-[#FAF8F5] dark:bg-[#1A140F] border border-[#DED4BD] dark:border-stone-700 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title={isBn ? "গ্রিড ভিউ" : "Gallery Grid View"}
                  aria-label="Gallery Grid View"
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#C89D43] text-[#15120E] shadow-2xs"
                      : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  title={isBn ? "তালিকা ভিউ" : "Quick Spec List View"}
                  aria-label="Quick Spec List View"
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                    viewMode === "list"
                      ? "bg-[#C89D43] text-[#15120E] shadow-2xs"
                      : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reset Filter Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8C6214] dark:text-[#F3CE6D] hover:bg-[#FAF4E2] dark:hover:bg-[#1C150F] rounded-xl border border-transparent hover:border-[#C89D43]/30 cursor-pointer transition-all whitespace-nowrap"
                  title="Reset all filters to default"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#C89D43]" />
                  <span>{isBn ? "রিসেট" : "Reset"}</span>
                </button>
              )}

            </div>

          </div>

          {/* Always-Visible 1-Tap Quick Filters (Animal & Popular Grain) */}
          <div className="mt-3.5 pt-3.5 border-t border-[#EAE3D2]/70 dark:border-stone-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-1">
                {isBn ? "চামড়ার ধরন:" : "Hide:"}
              </span>
              {animalOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedAnimal(opt)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedAnimal === opt
                      ? "bg-[#1C1712] dark:bg-[#C89D43] text-white dark:text-[#15120E] font-semibold"
                      : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-600 dark:text-stone-300 border border-[#E5DBBE] dark:border-stone-700 hover:border-[#C89D43]"
                  }`}
                >
                  {opt === "All" ? (isBn ? "সবগুলো" : "All Hides") : opt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-1">
                {isBn ? "গ্রেইন:" : "Grain:"}
              </span>
              {["All", "Full Grain", "Top Grain", "Nubuck", "Suede", "Split"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedGrain(opt)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedGrain === opt
                      ? "bg-[#1C1712] dark:bg-[#C89D43] text-white dark:text-[#15120E] font-semibold"
                      : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-600 dark:text-stone-300 border border-[#E5DBBE] dark:border-stone-700 hover:border-[#C89D43]"
                  }`}
                >
                  {opt === "All" ? (isBn ? "সব গ্রেইন" : "All Grains") : opt}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Multi-Faceted Filter Strips (Interactive Chips in Brand Colors) */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden pt-4 mt-4 border-t border-[#EAE3D2] dark:border-stone-800 space-y-4"
              >
                
                {/* 1. Tanning Method Row */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C6214] dark:text-[#E5BE58] mb-2 font-mono flex items-center gap-1.5">
                    <span>Tanning Chemistry</span>
                    <span className="text-stone-400 font-normal">· ট্যানিং মেথড</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tanningOptions.map((opt) => {
                      const isSelected = selectedTanning === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedTanning(opt)}
                          className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-[#15120E] font-bold shadow-xs"
                              : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-700 dark:text-stone-300 border border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43]/60"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Grain Architecture Row */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C6214] dark:text-[#E5BE58] mb-2 font-mono flex items-center gap-1.5">
                    <span>Grain Architecture</span>
                    <span className="text-stone-400 font-normal">· গ্রেইন গঠন</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {grainOptions.map((opt) => {
                      const isSelected = selectedGrain === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedGrain(opt)}
                          className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-[#15120E] font-bold shadow-xs"
                              : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-700 dark:text-stone-300 border border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43]/60"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Animal Substrate & End-Use Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  
                  {/* Animal Species */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C6214] dark:text-[#E5BE58] mb-2 font-mono flex items-center gap-1.5">
                      <span>Animal Species</span>
                      <span className="text-stone-400 font-normal">· প্রাণী উৎস</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {animalOptions.map((opt) => {
                        const isSelected = selectedAnimal === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedAnimal(opt)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-[#15120E] font-bold shadow-xs"
                                : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-700 dark:text-stone-300 border border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43]/60"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Application */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C6214] dark:text-[#E5BE58] mb-2 font-mono flex items-center gap-1.5">
                      <span>Manufacturing Application</span>
                      <span className="text-stone-400 font-normal">· ব্যবহার</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {applicationChips.map((chip) => {
                        const isSelected = selectedApplication === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setSelectedApplication(chip)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-[#15120E] font-bold shadow-xs"
                                : "bg-[#FAF8F5] dark:bg-[#1A140F] text-stone-700 dark:text-stone-300 border border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43]/60"
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Summary Bar */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#EAE3D2] dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {isBn ? (
                <span>
                  দেখাচ্ছে: <strong className="text-[#1C1712] dark:text-[#FAF6F0] font-mono tabular-nums">{filteredProducts.length}</strong> টি আর্টিকেল
                  {selectedStage !== "All" && ` (${selectedStage})`}
                </span>
              ) : (
                <span>
                  Showing <strong className="text-[#1C1712] dark:text-[#FAF6F0] font-mono tabular-nums">{filteredProducts.length}</strong> articles
                  {selectedStage !== "All" && ` in ${selectedStage}`}
                </span>
              )}

              {selectedTanning !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedTanning("All")}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF3E0] dark:bg-[#C89D43]/20 text-[#8C6214] dark:text-[#F3CE6D] text-[11px] font-medium cursor-pointer"
                >
                  <span>{selectedTanning}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedApplication !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedApplication("All")}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF3E0] dark:bg-[#C89D43]/20 text-[#8C6214] dark:text-[#F3CE6D] text-[11px] font-medium cursor-pointer"
                >
                  <span>{selectedApplication}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="text-[11px] font-medium text-[#8C6214] dark:text-[#F3CE6D] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#C89D43] shrink-0" />
              <span>
                {isBn
                  ? "ছবির নিচে জুম বা ফুল HD আইকনে ক্লিক করে গ্রেইন দেখুন অথবা ডিটেইলসে ক্লিক করুন"
                  : "Click any photo for specs, or use the Zoom / Full HD icons on hover"}
              </span>
            </div>
          </div>

        </div>

        {/* 3. PRODUCT CARDS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#140F0B] border border-[#E5DBBE] dark:border-stone-800 rounded-2xl p-8">
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              {isBn ? "আপনার ফিল্টারের সাথে মিলে এমন কোনো লেদার পাওয়া যায়নি।" : "No leather articles match your current filter parameters."}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-3 text-xs font-semibold text-[#8C6214] dark:text-[#E5BE58] hover:underline cursor-pointer"
            >
              {isBn ? "সকল ফিল্টার রিসেট করুন" : "Reset all filters"}
            </button>
          </div>
        ) : (
          <div>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-[#130E0A] border border-[#E8DFC8] dark:border-stone-800/90 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#C89D43] hover:shadow-[0_14px_32px_-6px_rgba(200,157,67,0.2)] group hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Unobstructed High-Resolution 4:3 Leather Photo */}
                      <LeatherImageMagnifier
                        src={product.image}
                        alt={`${product.name} hide sample`}
                        mode="card"
                        zoomLevel={3}
                        aspectRatioClass="aspect-[4/3]"
                        isSustainable={product.isSustainable}
                        onClick={() => {
                          trackEvent("product_detail_view", { product_id: product.id });
                          onSelectProduct(product);
                        }}
                      />

                      {/* Clean Card Content */}
                      <div className="p-5 sm:p-6 space-y-3">
                        {/* Quiet Single-Line Metadata */}
                        <div className="flex items-center justify-between text-xs gap-2 text-stone-500 dark:text-stone-400">
                          <span className="font-mono font-bold text-[#8C6214] dark:text-[#E5BE58]">
                            {product.articleNumber || product.id}
                          </span>
                          <span className="truncate">
                            {product.animal} · {product.tanningMethod}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1712] dark:text-[#FAF6F0] group-hover:text-[#9E731C] dark:group-hover:text-[#E5BE58] transition-colors leading-snug">
                            <a
                              href={`/product/${product.id}`}
                              title={`${product.name} - Bangladesh Leather Export`}
                              aria-label={`View technical specifications for ${product.name}`}
                              onClick={(e) => {
                                e.preventDefault();
                                trackEvent("product_detail_view", { product_id: product.id });
                                onSelectProduct(product);
                              }}
                              className="hover:underline"
                            >
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1.5 text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </div>

                        {/* Clean Hairline Specification Rows */}
                        <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-stone-400 dark:text-stone-500">Grain & Stage</span>
                            <span className="font-medium text-stone-800 dark:text-stone-200 text-right">
                              {product.grainType} · {product.stage}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-stone-400 dark:text-stone-500">Thickness</span>
                            <span className="font-semibold text-[#8C6214] dark:text-[#F3CE6D] text-right truncate">
                              {isBn ? "টেক প্যাক অনুযায়ী কাস্টম" : "Custom per Tech Pack"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-stone-400 dark:text-stone-500 shrink-0">Use</span>
                            <span className="text-right truncate font-medium">
                              {product.applications.slice(0, 2).join(" · ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spacious Touch-Friendly Card Footer */}
                    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#EAE3D2]/70 dark:border-stone-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            trackEvent("product_detail_view", { product_id: product.id });
                            onSelectProduct(product);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-stone-800 hover:bg-[#FAF4E2] dark:hover:bg-[#201913] text-xs font-bold text-stone-800 dark:text-stone-200 hover:text-[#8C6214] dark:hover:text-[#F3CE6D] border border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43] cursor-pointer transition-all whitespace-nowrap"
                        >
                          <span>{isBn ? "বিস্তারিত" : "View Specs"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D43]" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopyProductLink(e, product.id)}
                          title={`Copy direct link: /product/${product.id}`}
                          className="p-2.5 rounded-xl text-stone-400 dark:text-stone-500 hover:text-[#C89D43] hover:bg-[#FAF4E2] dark:hover:bg-stone-800 transition-colors cursor-pointer"
                          aria-label={`Copy link for ${product.name}`}
                        >
                          {copiedId === product.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Link2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("request_quote_click", {
                            location: "product_card",
                            product_name: product.name,
                          });
                          onRequestQuote(`${product.name} (${product.articleNumber || product.id})`);
                        }}
                        className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-[#15120E] bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#B8892E] hover:from-[#FFF0A5] hover:to-[#D6AC4B] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap group/btn flex-1 sm:flex-initial"
                      >
                        <span>{t.catalogue.requestQuote}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#15120E] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-[#130E0A] border border-[#E8DFC8] dark:border-stone-800/90 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 hover:border-[#C89D43] transition-colors"
                  >
                    <div className="w-full sm:w-44 shrink-0 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
                      <LeatherImageMagnifier
                        src={product.image}
                        alt={`${product.name} hide sample`}
                        mode="card"
                        zoomLevel={3}
                        aspectRatioClass="aspect-[4/3]"
                        isSustainable={product.isSustainable}
                        onClick={() => {
                          trackEvent("product_detail_view", { product_id: product.id });
                          onSelectProduct(product);
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 flex-wrap">
                        <span className="font-mono font-bold text-[#8C6214] dark:text-[#E5BE58]">
                          {product.articleNumber || product.id}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{product.stage}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.animal}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.grainType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.tanningMethod}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#1C1712] dark:text-[#FAF6F0]">
                        <a
                          href={`/product/${product.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent("product_detail_view", { product_id: product.id });
                            onSelectProduct(product);
                          }}
                          className="hover:text-[#9E731C] dark:hover:text-[#E5BE58] hover:underline"
                        >
                          {product.name}
                        </a>
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {product.applications.slice(0, 3).join(" · ")}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("request_quote_click", {
                            location: "product_list",
                            product_name: product.name,
                          });
                          onRequestQuote(`${product.name} (${product.articleNumber || product.id})`);
                        }}
                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-[#15120E] bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#B8892E] rounded-xl cursor-pointer whitespace-nowrap"
                      >
                        <span>{t.catalogue.requestQuote}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("product_detail_view", { product_id: product.id });
                          onSelectProduct(product);
                        }}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-200 border border-[#DED4BD] dark:border-stone-700 hover:border-[#C89D43] cursor-pointer whitespace-nowrap"
                      >
                        <span>{isBn ? "বিস্তারিত" : "View Specs"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D43]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#EAE3D2] dark:border-stone-800">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  {isBn ? (
                    <span>
                      পৃষ্ঠা <strong className="text-[#1C1712] dark:text-[#FAF6F0]">{currentPage}</strong> / {totalPages} (মোট {filteredProducts.length} আর্টিকেল)
                    </span>
                  ) : (
                    <span>
                      Page <strong className="text-[#1C1712] dark:text-[#FAF6F0]">{currentPage}</strong> of {totalPages} · Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} articles
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(1, prev - 1));
                      document.getElementById("leather-products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-[#DED4BD] dark:border-stone-700 bg-white dark:bg-[#140F0B] text-stone-700 dark:text-stone-300 hover:bg-[#FAF4E2] dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => {
                            setCurrentPage(pageNum);
                            document.getElementById("leather-products")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-[#15120E] shadow-sm font-bold"
                              : "border border-[#DED4BD] dark:border-stone-700 bg-white dark:bg-[#140F0B] text-stone-700 dark:text-stone-300 hover:bg-[#FAF4E2] dark:hover:bg-stone-800"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return (
                        <span key={pageNum} className="text-stone-400 px-1 text-xs">
                          …
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                      document.getElementById("leather-products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-[#DED4BD] dark:border-stone-700 bg-white dark:bg-[#140F0B] text-stone-700 dark:text-stone-300 hover:bg-[#FAF4E2] dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Sourcing Footer CTA inside Catalogue */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#FAF6ED] via-white to-[#FAF6ED] dark:from-[#1A140F] dark:via-[#140F0B] dark:to-[#1A140F] text-stone-900 dark:text-white border border-[#D6AC4B]/40 dark:border-[#C89D43]/35 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="text-[11px] font-mono text-[#8C6214] dark:text-[#E5BE58] uppercase tracking-wider mb-1 font-bold">
              Custom Leather Formulation & Physical Swatch Matching
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1C1712] dark:text-white">
              {t.catalogue.customPromptTitle}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-xl leading-relaxed">
              {t.catalogue.customPromptDesc}
            </p>
          </div>
          <button
            onClick={() => onRequestQuote("Custom Leather Sourcing / Counter Sampling")}
            className="px-6 py-3.5 text-xs font-bold bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#B8892E] hover:from-[#FFF0A5] hover:to-[#D6AC4B] text-[#15120E] rounded-xl whitespace-nowrap cursor-pointer transition-all shadow-sm hover:shadow-lg"
          >
            {t.catalogue.customPromptCta}
          </button>
        </div>

      </div>
    </section>
  );
};
