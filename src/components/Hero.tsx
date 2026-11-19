import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import { crustLeatherImg } from "../data/products";
import {
  ArrowUpRight,
  Layers,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Globe2,
  Play,
  Pause,
} from "lucide-react";

interface HeroProps {
  onExploreLeather: () => void;
  onRequestQuote: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  mobileImage?: string;
  tag: string;
  tagBn: string;
  caption: string;
  captionBn: string;
  alt: string;
}

const toWebpThumb = (imgPath: string) =>
  imgPath.replace("/assets/products/", "/assets/products/thumbs/").replace(".jpg", ".webp");

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-luxury-leather-rolls",
    image: "/hero-leather.webp",
    mobileImage: "/hero-leather-mobile.webp",
    tag: "Direct Tannery Craft",
    tagBn: "সরাসরি ট্যানারি মান",
    caption: "Full Grain, Semi-Aniline, Nappa & Crust Cowhide · Savar Tanneries",
    captionBn: "ফুল গ্রেইন, সেমি-অ্যানিলিন, নাপ্পা ও ক্রাস্ট কাউহাইড · সাভার ট্যানারি",
    alt: "Full-grain cognac espresso and tan cowhide leather rolls for global B2B export",
  },
  {
    id: "slide-ship-open-sea",
    image: "/hero-ship.webp",
    mobileImage: "/hero-ship-mobile.webp",
    tag: "Maritime Export",
    tagBn: "সমুদ্রপথে রপ্তানি",
    caption: "Chattogram Port (BDCGP) Containerized Freight · 25+ Global Ports",
    captionBn: "চট্টগ্রাম বন্দর (BDCGP) থেকে ২৫+ আন্তর্জাতিক বন্দরে কনটেইনার শিপিং",
    alt: "Commercial ocean container cargo ship carrying Bangladesh leather exports worldwide",
  },
  {
    id: "slide-crust-tannery",
    image: crustLeatherImg,
    mobileImage: toWebpThumb(crustLeatherImg),
    tag: "Crust Collections",
    tagBn: "ক্রাস্ট কালেকশন",
    caption: "Full Grain Chrome & Vegetable Tanned Crust · Custom Caliper & Temper",
    captionBn: "ফুল গ্রেইন ক্রোম ও ভেজিটেবল ট্যানড ক্রাস্ট · কাস্টম পুরুত্ব",
    alt: "Full grain crust bovine leather crafted at Savar Tannery Estate in Bangladesh",
  },
  {
    id: "slide-finished-aniline",
    image: "/hero-finished.webp",
    mobileImage: "/hero-finished-mobile.webp",
    tag: "Finished Aniline",
    tagBn: "ফিনিশড অ্যানিলিন",
    caption: "Drum-Dyed Aniline, Pull-Up & Nappa · Precision Color Matching",
    captionBn: "ড্রাম-ডাইড অ্যানিলিন, পুল-আপ ও নাপ্পা · প্যানটোন কালার ম্যাচিং",
    alt: "Draped cognac mahogany and espresso full-grain aniline cowhide hides on dark obsidian stone",
  },
  {
    id: "slide-wet-blue-hides",
    image: "/hero-wetblue.webp",
    mobileImage: "/hero-wetblue-mobile.webp",
    tag: "Wet Blue & White",
    tagBn: "ওয়েট ব্লু ও হোয়াইট",
    caption: "Grade I–IV Selection · Chrome Tanned & Chrome-Free Wet White Hides",
    captionBn: "গ্রেড I–IV বাছাইকৃত ক্রোম ও ক্রোম-ফ্রি ওয়েট হোয়াইট হাইডস",
    alt: "Stacked precision-trimmed wet blue chrome tanned bovine hides staged for export",
  },
];

function renderAccentHeadline(headline: string, language: string) {
  if (language === "en" && headline.includes("Leather Sourcing Partner")) {
    const [before, after] = headline.split("Leather Sourcing Partner");
    return (
      <>
        {before}
        <span className="text-hero-gold-gradient">Leather Sourcing Partner</span>
        {after}
      </>
    );
  }

  if (language === "bn" && headline.includes("বিশ্বস্ত চামড়া সোর্সিং")) {
    const [before, after] = headline.split("বিশ্বস্ত চামড়া সোর্সিং");
    return (
      <>
        {before}
        <span className="text-hero-gold-gradient">বিশ্বস্ত চামড়া সোর্সিং</span>
        {after}
      </>
    );
  }

  const words = headline.trim().split(/\s+/);
  if (words.length >= 4) {
    const startIdx = Math.floor(words.length / 3);
    const endIdx = Math.min(words.length, startIdx + 2);
    return (
      <>
        {words.slice(0, startIdx).join(" ")}{" "}
        <span className="text-hero-gold-gradient">
          {words.slice(startIdx, endIdx).join(" ")}
        </span>
        {endIdx < words.length ? ` ${words.slice(endIdx).join(" ")}` : ""}
      </>
    );
  }

  return headline;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreLeather,
  onRequestQuote,
}) => {
  const { t, language } = useLanguage();
  const isBn = language === "bn";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Preload only the NEXT single slide gently so initial page reload stays ultra-fast
  useEffect(() => {
    const nextIdx = (currentSlide + 1) % HERO_SLIDES.length;
    const nextSlide = HERO_SLIDES[nextIdx];
    const timer = window.setTimeout(() => {
      const img = new Image();
      const isCompactViewport = typeof window !== "undefined" && window.innerWidth < 1024;
      img.src =
        isCompactViewport && nextSlide.mobileImage
          ? nextSlide.mobileImage
          : nextSlide.image;
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[480px] sm:min-h-[550px] lg:min-h-[610px] flex flex-col justify-between pt-10 pb-5 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-8 border-b border-[#C89D43]/35 bg-[#070503] text-white"
    >
      {/* Full-Bleed Sharp Photographic Background Slider (0ms initial paint delay) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: currentSlide === 0 ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.mobileImage || activeSlide.image}
              srcSet={
                activeSlide.mobileImage
                  ? `${activeSlide.mobileImage} 900w, ${activeSlide.image} 1600w`
                  : undefined
              }
              sizes="100vw"
              alt={activeSlide.alt}
              className="w-full h-full object-cover object-[78%_35%] sm:object-[70%_45%] md:object-center transition-transform duration-[14000ms] ease-out"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              decoding={currentSlide === 0 ? "sync" : "async"}
              // @ts-ignore
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Precision Directional Scrim: keeps luxury leather & ship sharp and vivid on right while ensuring crystal-clear text contrast on left */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070503]/68 via-[#080604]/78 to-[#070503]/95 sm:bg-gradient-to-r sm:from-[#070503]/95 sm:via-[#070503]/62 sm:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070503]/90 via-transparent to-[#070503]/25 pointer-events-none" />
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,157,67,0.08)_0%,transparent_55%)] pointer-events-none" />
      </div>

      {/* Main Executive Editorial Content — Zero-latency availability */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="max-w-2xl lg:max-w-[46rem] text-left space-y-3 sm:space-y-4">
          {/* Monumental Display Serif Headline with Champagne Gold Gradient Focal Words */}
          <h1 className="font-display text-[30px] sm:text-[46px] lg:text-[58px] font-bold tracking-tight text-white leading-[1.07] text-balance drop-shadow-sm">
            {renderAccentHeadline(t.hero.headline, language)}
          </h1>

          {/* Signature Architectural Champagne Gold Rule */}
          <div className="flex items-center gap-3 pt-0.5" aria-hidden="true">
            <span className="w-16 h-[2px] bg-gradient-to-r from-[#FCE39D] via-[#E5BE58] to-[#C89D43]/40 rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5BE58]/80" />
          </div>

          {/* Crisp Executive Lead Paragraph */}
          <p className="font-body text-[13.5px] sm:text-[16.5px] lg:text-[18px] text-stone-200/95 leading-[1.6] max-w-xl lg:max-w-2xl text-pretty">
            {t.hero.subheadline}
          </p>

          {/* Aligned Primary & Secondary Action Buttons */}
          <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5">
            <motion.button
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                trackEvent("request_quote_click", { location: "hero_primary" });
                onRequestQuote();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 min-h-[48px] sm:min-h-[50px] text-xs sm:text-sm font-bold tracking-wide text-stone-950 rounded-lg shadow-lg shadow-[#C89D43]/25 hover:shadow-[#D6AC4B]/45 transition-all cursor-pointer group whitespace-nowrap shrink-0"
              style={{
                background: "linear-gradient(135deg, #FCE39D 0%, #E5BE58 48%, #C49332 100%)",
              }}
            >
              <span>{t.hero.requestQuote}</span>
              <ArrowUpRight className="w-4 h-4 text-stone-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                trackEvent("product_detail_view", { source: "hero_explore_primary" });
                onExploreLeather();
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 min-h-[50px] text-xs sm:text-sm font-semibold tracking-wide text-white bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-lg border border-[#E5BE58]/55 hover:border-[#FCE39D] transition-all cursor-pointer group whitespace-nowrap shrink-0"
            >
              <Layers className="w-4 h-4 text-[#E5BE58]" />
              <span>{t.hero.exploreCatalogue}</span>
              <ChevronRight className="w-4 h-4 text-stone-300 group-hover:translate-x-0.5 transition-transform hidden sm:inline" />
            </motion.button>
          </div>

          {/* Aligned Secondary Utility & Compliance Row */}
          <div className="pt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-300 border-t border-white/10 max-w-2xl">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "hero_direct" })}
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-semibold transition-colors py-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isBn ? "হোয়াটসঅ্যাপ এক্সপোর্ট ডেস্ক" : "WhatsApp Export Desk"}</span>
            </a>

            <span className="hidden md:inline text-stone-600" aria-hidden="true">|</span>
            <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-stone-300">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5BE58]" />
                <span>LWG & REACH</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#E5BE58]" />
                <span>FOB Chattogram · CIF 25+ Ports</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Bottom Showcase Control Strip */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8 sm:mt-10 pt-4 border-t border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Live Background Scene Caption */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono text-[11px] font-bold text-[#F5D275] tabular-nums shrink-0">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
            <span className="text-stone-600 shrink-0" aria-hidden="true">—</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold shrink-0">
              {isBn ? activeSlide.tagBn : activeSlide.tag}
            </span>
            <span className="hidden lg:inline text-stone-500 shrink-0" aria-hidden="true">·</span>
            <span className="hidden lg:inline text-xs text-stone-300 truncate">
              {isBn ? activeSlide.captionBn : activeSlide.caption}
            </span>
          </div>

          {/* Interactive Slide Chapter Navigation */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`View scene ${idx + 1}: ${slide.tag}`}
                  title={isBn ? slide.tagBn : slide.tag}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${
                    currentSlide === idx
                      ? "w-8 sm:w-10 bg-white/25"
                      : "w-3 sm:w-4 bg-white/20 hover:bg-white/45"
                  }`}
                >
                  {currentSlide === idx && (
                    <motion.div
                      key={`progress-${idx}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isAutoPlaying ? 6.5 : 0.3, ease: "linear" }}
                      className="h-full bg-[#E5BE58] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 pl-2 border-l border-white/15 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                }
                aria-label="Previous background scene"
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                aria-label="Next background scene"
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-label={isAutoPlaying ? "Pause background slideshow" : "Play background slideshow"}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-[#E5BE58]" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-stone-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
