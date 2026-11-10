import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import {
  heroLeatherImg,
  heroExportImg,
  crustLeatherImg,
  finishedAnilineImg,
  wetBlueImg,
  exportShippingImg,
  containerCargoShipImg,
  cargoShipVesselImg,
  portGantryLoadingImg,
} from "../data/products";
import {
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Globe2,
  FileText,
  CheckCircle2,
  Ship,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
  Award,
  Play,
  Pause,
  Anchor,
} from "lucide-react";

interface HeroProps {
  onExploreLeather: () => void;
  onRequestQuote: () => void;
  onOpenCompanyProfile?: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  tag: string;
  tagBn: string;
  caption: string;
  captionBn: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-ship-open-sea",
    image: "/hero-ship.jpg",
    tag: "Ocean Container Freight",
    tagBn: "মহাসাগরীয় কনটেইনার ফ্রেইট",
    caption: "Deep Sea Ocean Container Cargo Shipping · Direct Sailings to 25+ Global Ports",
    captionBn: "গভীর সমুদ্রে মালবাহী কনটেইনার কার্গো শিপিং · ২৫+ আন্তর্জাতিক বন্দরে সরাসরি জাহাজীকরণ",
    alt: "Commercial container cargo ship loaded with freight containers for maritime leather export",
  },
  {
    id: "slide-port-gantry",
    image: portGantryLoadingImg,
    tag: "Port Terminal Logistics",
    tagBn: "পোর্ট টার্মিনাল অপারেশন",
    caption: "Chattogram Port (BDCGP) Container Terminal · Automated Gantry Vessel Loading",
    captionBn: "চট্টগ্রাম বন্দর (BDCGP) কনটেইনার টার্মিনাল · স্বয়ংক্রিয় গ্যান্ট্রি ক্রেন লোডিং",
    alt: "International seaport container terminal with heavy gantry cranes loading export container ship",
  },
  {
    id: "slide-inspection",
    image: heroLeatherImg,
    tag: "LWG Tannery Floor",
    tagBn: "LWG ট্যানারি ফ্লোর",
    caption: "LWG-Audited Tannery Quality Inspection & Grain Substance Calibration · Savar, Dhaka",
    captionBn: "LWG অডিটেড ট্যানারি কোয়ালিটি পরিদর্শন ও গ্রেইন সাবস্ট্যান্স ক্যালিব্রেশন · সাভার",
    alt: "ExportVisor artisan leather inspection and thickness calibration in Savar, Bangladesh",
  },
  {
    id: "slide-port-vessel",
    image: cargoShipVesselImg,
    tag: "Maritime Shipping Lanes",
    tagBn: "আন্তর্জাতিক সমুদ্রপথ",
    caption: "Maritime Container Dispatch · FCL Full Container Loads & LCL Consolidation",
    captionBn: "সমুদ্রপথে কনটেইনার প্রেরণ · FCL ফুল কনটেইনার ও LCL কনসলিডেশন",
    alt: "Ocean container vessel underway with international export shipping containers",
  },
  {
    id: "slide-finished-aniline",
    image: finishedAnilineImg,
    tag: "Finished Leather Export",
    tagBn: "ফিনিশড লেদার রপ্তানি",
    caption: "Export-Grade Aniline & Full Grain Leather · Formulated for Global Brand Collections",
    captionBn: "রপ্তানি মানসম্পন্ন অ্যানিলিন ও ফুল গ্রেইন লেদার · গ্লোবাল ব্র্যান্ড কালেকশন",
    alt: "Premium aniline finished leather rolls in rich earthy tones",
  },
  {
    id: "slide-export-terminal",
    image: exportShippingImg,
    tag: "Seaworthy Staging",
    tagBn: "সি-ওয়ার্থি স্টেজিং",
    caption: "ISPM-15 Certified Wooden Pallet Packaging & Moisture-Barrier Container Stuffing",
    captionBn: "ISPM-15 সার্টিফাইড কাঠের প্যালেটে প্যাকিং ও কনটেইনার সুরক্ষিত স্টাফিং",
    alt: "Maritime cargo container terminal with export containers ready for dispatch",
  },
];

const AMBIENT_GOLD_PARTICLES = [
  { left: 14, size: 3, delay: 0, duration: 8.5, drift: 18, opacity: 0.65, color: "#F5D275" },
  { left: 26, size: 2, delay: 2.2, duration: 11, drift: -14, opacity: 0.5, color: "#E5BE58" },
  { left: 42, size: 3.5, delay: 1, duration: 7.5, drift: 22, opacity: 0.7, color: "#D6AC4B" },
  { left: 58, size: 2.5, delay: 3.4, duration: 9.5, drift: -18, opacity: 0.55, color: "#C89D43" },
  { left: 74, size: 4, delay: 0.7, duration: 10, drift: 16, opacity: 0.65, color: "#F5D275" },
  { left: 86, size: 2, delay: 4.1, duration: 9, drift: -12, opacity: 0.45, color: "#E5BE58" },
  { left: 32, size: 3, delay: 4.8, duration: 12, drift: 14, opacity: 0.6, color: "#D4A72C" },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreLeather,
  onRequestQuote,
  onOpenCompanyProfile,
}) => {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Preload all slider images on initial mount for instant, flicker-free crossfades
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Background slider autoplay with clean cleanup
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Stagger animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-3 pb-4 sm:pt-4 sm:pb-6 lg:pt-10 lg:pb-16 border-b border-[#C89D43]/35 bg-[#070503] text-white transition-colors duration-200">
      {/* High-Performance Photographic Background Hero Slider with Maritime Export Imagery */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={HERO_SLIDES[currentSlide].id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              animate={{
                scale: [1, 1.06, 1.01],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].alt}
              className="w-full h-full object-cover object-[70%_25%] sm:object-[65%_30%] md:object-center"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              decoding={currentSlide === 0 ? "sync" : "async"}
              // @ts-ignore
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* ExportVisor Signature Dark-Gold Brand Blend Scrim (Vibrant photographic visibility blended with luxury dark-gold aura) */}
        {/* Layer 1: Horizontal Vignette keeping typography readable on the left while letting right-side export imagery shine vividly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080503]/85 via-[#120B05]/50 to-[#181006]/20 pointer-events-none" />
        
        {/* Layer 2: Vertical Ambient Depth with dark-gold gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080503]/90 via-[#1A1207]/25 to-[#080503]/35 pointer-events-none" />
        
        {/* Layer 3: ExportVisor Brand Signature Dark Gold Radiance Blends */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,167,44,0.25)_0%,rgba(200,157,67,0.12)_35%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,157,67,0.22)_0%,rgba(168,124,36,0.08)_45%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,190,88,0.08)_0%,transparent_60%)] pointer-events-none" />

        {/* Layer 4: Eye-Catching Luxury Technical Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,157,67,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,157,67,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] pointer-events-none" />

        {/* Eye-Catching Floating Gold Bokeh Embers */}
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
          {AMBIENT_GOLD_PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{
                y: "-15%",
                opacity: [0, p.opacity, p.opacity * 0.85, 0],
                x: [0, p.drift, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Animated Radiant ExportVisor Gold Ambient Auroras & Light Sweeps */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.22, 0.40, 0.22],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-8 w-[460px] h-[460px] bg-[#D6AC4B]/30 rounded-full blur-[95px] pointer-events-none z-1"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.18, 0.35, 0.18],
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-[#C89D43]/28 rounded-full blur-[85px] pointer-events-none z-1"
      />

      {/* Radiant Diagonal Shimmering Gold Light Ray Beam */}
      <motion.div
        animate={{
          opacity: [0.10, 0.28, 0.10],
          rotate: [-25, -20, -25],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 right-1/4 w-[550px] h-[450px] bg-gradient-to-b from-[#E5BE58]/25 via-[#C89D43]/15 to-transparent blur-3xl pointer-events-none z-1 transform -rotate-25"
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-3 sm:space-y-4 lg:space-y-6"
        >
          {/* LWG-Certified Tannery Network Kicker Badge */}
          <motion.div variants={itemVariants} className="flex items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 text-[#E5BE58] text-[10px] sm:text-xs font-semibold tracking-wide border border-[#C89D43]/60 shadow-lg backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-[#E5BE58]" />
              <span className="text-[10px] sm:text-xs font-semibold text-white tracking-wide">
                {language === "bn"
                  ? "LWG সার্টিফাইড ট্যানারি নেটওয়ার্ক · সাভার, ঢাকা"
                  : "LWG-Certified Tannery Network · Savar Leather Estate"}
              </span>
            </div>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.16] text-balance drop-shadow-md"
          >
            {t.hero.headline}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="font-body text-xs sm:text-sm lg:text-lg text-stone-200 leading-snug sm:leading-relaxed max-w-3xl text-pretty"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* Streamlined, Eye-Catchy Action Group */}
          <motion.div variants={itemVariants} className="pt-1 sm:pt-2 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 flex-wrap">
              {/* Primary Action: Request Commercial Quote with ExportVisor Gold Gradient */}
              <motion.button
                whileHover={{ scale: 1.025, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent("request_quote_click", { location: "hero_primary" });
                  onRequestQuote();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide text-[#15120E] rounded-lg shadow-lg shadow-[#C89D43]/35 hover:shadow-xl hover:shadow-[#D6AC4B]/50 transition-all cursor-pointer group w-full sm:w-auto"
                style={{
                  background: "linear-gradient(135deg, #F5D275 0%, #D6AC4B 50%, #B8892E 100%)",
                }}
              >
                <span>{t.hero.requestQuote}</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15120E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>

              {/* Secondary Pair: Clean responsive row */}
              <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
                {/* Explore Products */}
                <motion.button
                  whileHover={{ scale: 1.025, translateY: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    trackEvent("product_detail_view", { source: "hero_explore_primary" });
                    onExploreLeather();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-black/75 hover:bg-[#1A140F] rounded-lg shadow-xs hover:shadow-md border border-[#C89D43]/60 hover:border-[#E5BE58] transition-all cursor-pointer group backdrop-blur-xs whitespace-nowrap"
                >
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5BE58] transition-transform group-hover:rotate-6" />
                  <span>{t.hero.exploreCatalogue}</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform hidden sm:inline" />
                </motion.button>

                {/* Direct WhatsApp Desk */}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "hero_direct" })}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3.5 text-xs font-semibold tracking-wide text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/50 rounded-lg transition-all shadow-xs backdrop-blur-xs whitespace-nowrap"
                  title="Direct WhatsApp Communication"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span>{language === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp"}</span>
                </a>
              </div>

              {/* Company Profile (Deck) */}
              {onOpenCompanyProfile && (
                <button
                  onClick={() => {
                    trackEvent("company_profile_view", { location: "hero_quick" });
                    onOpenCompanyProfile();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs font-semibold text-stone-300 hover:text-[#E5BE58] bg-black/40 hover:bg-black/60 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E5BE58]" />
                  <span>{language === "bn" ? "কোম্পানি ডেক" : "Company Deck"}</span>
                </button>
              )}
            </div>

            {/* Clean Trust Verification Ribbon */}
            <div className="pt-1.5 flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-stone-200 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5BE58] shrink-0" />
                <span>
                  {language === "bn"
                    ? "LWG অডিটেড নেটওয়ার্ক"
                    : "LWG-Audited Network"}
                </span>
              </div>
              <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {language === "bn"
                    ? "১০০% প্রি-শিপমেন্ট QA"
                    : "100% Pre-Shipment Inspection QA"}
                </span>
              </div>
              <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>
                  {language === "bn"
                    ? "চট্টগ্রাম পোর্ট শিপিং · ২৫+ বন্দর"
                    : "FOB Chattogram · CIF 25+ Global Ports"}
                </span>
              </div>
              <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#E5BE58] shrink-0" />
                <span>Savar Tannery Estate, Dhaka</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile-only minimal slide indicator: clean, unobtrusive without clutter */}
        <div className="flex sm:hidden justify-center items-center gap-1.5 pt-3">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? "w-6 bg-[#E5BE58] shadow-[0_0_8px_rgba(229,190,88,0.6)]"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Ambient Hero Background Slider Control Bar (Tablet & Desktop only) */}
        <div className="hidden sm:flex mt-6 lg:mt-8 pt-3 sm:pt-4 border-t border-[#C89D43]/25 flex-wrap items-center justify-between gap-2.5 text-xs text-stone-300">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/80 border border-[#C89D43]/50 text-[#E5BE58] font-bold shadow-2xs shrink-0">
              <Ship className="w-3 h-3 text-[#E5BE58]" />
              <span>{language === "bn" ? HERO_SLIDES[currentSlide].tagBn : HERO_SLIDES[currentSlide].tag}</span>
            </span>
            <span className="text-[11px] font-mono text-stone-300 font-semibold truncate max-w-xs sm:max-w-md">
              {language === "bn" ? HERO_SLIDES[currentSlide].captionBn : HERO_SLIDES[currentSlide].caption}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#C89D43]/40 shadow-xs text-stone-200">
            <span className="text-[11px] font-mono font-bold text-[#E5BE58] pr-1">
              0{currentSlide + 1} <span className="text-stone-500 font-normal">/ 0{HERO_SLIDES.length}</span>
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              aria-label="Previous background slide"
              className="p-1 rounded hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Sleek Animated Linear Segments */}
            <div className="flex items-center gap-1.5 px-1">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
                  title={slide.tag}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden relative ${
                    currentSlide === idx
                      ? "w-8 bg-black/70 border border-[#C89D43]/60 shadow-[0_0_10px_rgba(200,157,67,0.5)]"
                      : "w-3 bg-white/25 hover:bg-white/50"
                  }`}
                >
                  {currentSlide === idx && (
                    <motion.div
                      key={`progress-${idx}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isAutoPlaying ? 7 : 0.3, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-[#F5D275] via-[#D6AC4B] to-[#C89D43] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              aria-label="Next background slide"
              className="p-1 rounded hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause background slider" : "Play background slider"}
              className="p-1 rounded hover:bg-white/10 text-stone-300 hover:text-white transition-colors ml-0.5 cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3 h-3 text-[#E5BE58]" /> : <Play className="w-3 h-3 text-stone-300" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
