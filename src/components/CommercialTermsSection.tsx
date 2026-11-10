import React from "react";
import { motion } from "motion/react";
import {
  Scale,
  Clock,
  CreditCard,
  Layers,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Truck,
  FileCheck2,
  MapPin,
  ArrowUpRight,
  Plane,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SectionShareButton } from "./SectionShareButton";
import { trackEvent } from "../utils/analytics";

interface CommercialTermsSectionProps {
  onRequestQuote?: (prefill?: string) => void;
}

export const CommercialTermsSection: React.FC<CommercialTermsSectionProps> = ({
  onRequestQuote,
}) => {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  const handleAction = (topic: string) => {
    trackEvent("commercial_safeguard_click", { topic });
    if (onRequestQuote) {
      onRequestQuote(topic);
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buyerSafeguards = [
    {
      id: "factory-visit",
      icon: Building2,
      title: isBn ? "অন-সাইট ট্যানারি ভিজিট ও ফ্যাক্টরি অডিট" : "On-Site Tannery Visit & Factory Audit Welcome",
      badge: isBn ? "সরাসরি ভিজিট" : "Open Factory Gate",
      badgeClass: "bg-amber-500/10 text-[#8C6214] dark:text-[#E5BE58] border-[#C89D43]/30",
      description: isBn
        ? "বিদেশি বায়ার, টেকনিক্যাল অডিটর এবং বায়িং হাউজ প্রতিনিধিদের সাভার ট্যানারি এস্টেটের ফ্যাক্টরি ফ্লোরে ড্রাম প্রসেসিং ও ফিনিশিং লাইন সরাসরি পরিদর্শনে স্বাগত জানাই। বিজনেস ভিসার জন্য অফিসিয়াল ইনভাইটেশন লেটার এবং বিমানবন্দর থেকে ফ্যাক্টরি এসকর্ট সুবিধা প্রদান করা হয়।"
        : "International buyers, technical auditors, and buying agency delegates are warmly welcomed to inspect our partner drum lines, crust drying sheds, and finishing plants at the Savar Tannery Industrial Estate, Dhaka. Formal visa invitation letters and airport/hotel transport coordination are provided.",
      cta: isBn ? "ট্যানারি ভিজিট শিডিউল করুন" : "Schedule Factory Visit",
    },
    {
      id: "safe-banking",
      icon: ShieldCheck,
      title: isBn ? "নিরাপদ আন্তর্জাতিক ব্যাংকিং (L/C & T/T)" : "Safe International Banking (Irrevocable L/C & T/T)",
      badge: isBn ? "১০০% নিরাপদ ব্যাংকিং" : "UCP 600 Compliant",
      badgeClass: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
      description: isBn
        ? "বাংলাদেশ ব্যাংক ও আন্তর্জাতিক ব্যাংকিং নীতিমালা (UCP 600) অনুসারে শুধুমাত্র অনুমোদিত আন্তর্জাতিক বাণিজ্যিক ব্যাংক (Standard Chartered, HSBC, Eastern Bank, City Bank)-এর মাধ্যমে ১০০% অপ্রত্যাহারযোগ্য L/C at sight বা বৈধ B/L কপির বিপরীতে T/T পেমেন্ট গ্রহণ করা হয়। কোনো অননুমোদিত পেমেন্ট চ্যানেল ব্যবহার করা হয় না।"
        : "All trade transactions comply strictly with Bangladesh Bank Foreign Exchange Guidelines and ICC UCP 600 banking standards. Payments are processed exclusively via Irrevocable Letter of Credit (L/C at Sight) or confirmed Telegraphic Transfer (T/T) against genuine maritime Bills of Lading from tier-1 shipping lines (Maersk, MSC, CMA CGM).",
      cta: isBn ? "ব্যাংকিং শর্তাবলী জানুন" : "Review Banking Procedures",
    },
    {
      id: "third-party-testing",
      icon: FileCheck2,
      title: isBn ? "আন্তর্জাতিক তৃতীয় পক্ষ ল্যাব টেস্টিং (SGS / Intertek)" : "Nominated 3rd-Party Lab Inspection Right",
      badge: isBn ? "জিরো রিস্ক গ্যারান্টি" : "SGS / Intertek / BV",
      badgeClass: "bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/30",
      description: isBn
        ? "বায়ারদের চুক্তিভিত্তিক সম্পূর্ণ অধিকার রয়েছে কন্টেইনারে লোড করার পূর্বে SGS, Intertek, Bureau Veritas বা TÜV SÜD এর মতো আন্তর্জাতিক স্বাধীন ইন্সপেকশন এজেন্সি নিয়োগ করে ফ্লোরে ফিজিক্যাল টেস্ট এবং কেমিক্যাল টেস্টিং (REACH, Cr-VI < 3ppm, Azo-free) সম্পন্ন করার।"
        : "Buyers hold the explicit contractual right to nominate independent international inspection agencies (SGS, Intertek, Bureau Veritas, or TÜV SÜD) to inspect finished batches, pull random hide samples, and conduct verified chemical/physical testing on the factory floor prior to container dispatch.",
      cta: isBn ? "কোয়ালিটি স্ট্যান্ডার্ড দেখুন" : "View Testing Protocols",
    },
    {
      id: "sample-tracking",
      icon: Truck,
      title: isBn ? "DHL / FedEx এয়ার ট্র্যাকিং সহ ফিজিক্যাল কাউন্টার স্যাম্পল" : "Courier-Tracked Counter-Sample Dispatch",
      badge: isBn ? "দ্রুত এয়ার কুরিয়ার" : "DHL / FedEx Express",
      badgeClass: "bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/30",
      description: isBn
        ? "বাল্ক প্রোডাকশনে যাওয়ার পূর্বে আপনার প্যান্টন কালার বা ফিজিক্যাল সোয়াচ অনুসারে ল্যাব-ডিপ এবং ফুল-হাইড কাউন্টার স্যাম্পল প্রস্তুত করে আন্তর্জাতিক DHL Express বা FedEx এয়ার কুরিয়ারের মাধ্যমে সরাসরি আপনার অফিসে ট্র্যাকিং নম্বর সহ পাঠানো হয়।"
        : "Before bulk drum loading begins, master color lab dips and physical full-hide counter-samples are custom tanned, finished, and dispatched via DHL Express, FedEx, or Aramex with authentic real-time Air Waybill (AWB) tracking directly to your overseas headquarters.",
      cta: isBn ? "কাউন্টার স্যাম্পল চান" : "Request Sample Dispatch",
    },
  ];

  return (
    <section id="commercial-terms" className="py-16 sm:py-22 bg-white dark:bg-[#0B0806] border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider">
              {t.commercial.kicker}
            </span>
            <SectionShareButton path="/terms" sectionName={t.commercial.kicker} />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#15120E] dark:text-[#FAF6F0] mt-1 text-balance">
            {t.commercial.title} <span className="text-gold-gradient">{t.commercial.subtitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed text-pretty">
            {isBn
              ? "সরাসরি ফ্যাক্টরি-গেট রপ্তানি, স্বচ্ছ ব্যাংকিং এবং আন্তর্জাতিক বায়ারদের জন্য নিশ্চিত প্রাতিষ্ঠানিক নিরাপত্তা ফ্রেমওয়ার্ক।"
              : "Direct factory-floor pricing, authentic export banking, and verified manufacturing safeguards tailored for international footwear and leather goods importers."}
          </p>
        </motion.div>

        {/* 4 Core Commercial Benchmarks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          
          {/* Card 1: MOQ */}
          <div className="p-5 sm:p-6 bg-[#FAF8F5] dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 hover:border-[#C89D43]/60 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                {isBn ? "নমনীয় MOQ" : "Flexible MOQ"}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
              {t.commercial.moqTitle}
            </span>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#15120E] dark:text-[#FAF6F0] mt-1">
              {isBn ? "RFQ অনুযায়ী মূল্যায়িত" : "Evaluated per RFQ"}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
              {t.commercial.moqDesc}
            </p>
          </div>

          {/* Card 2: Quotation */}
          <div className="p-5 sm:p-6 bg-[#FAF8F5] dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 hover:border-[#C89D43]/60 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-[#C89D43] border border-[#C89D43]/30 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#7A5A17] dark:text-[#E5BE58] border border-amber-200 dark:border-amber-800 font-semibold">
                {isBn ? "সরাসরি মিল FOB/CIF" : "Direct Factory Gate"}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
              {t.commercial.pricingTitle}
            </span>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#15120E] dark:text-[#FAF6F0] mt-1">
              {isBn ? "কোটেশন ভিত্তিক রেট" : "Quoted upon RFQ"}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
              {t.commercial.pricingDesc}
            </p>
          </div>

          {/* Card 3: Lead Time */}
          <div className="p-5 sm:p-6 bg-[#FAF8F5] dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 hover:border-[#C89D43]/60 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 border border-blue-500/25 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold">
                {isBn ? "শিডিউলড ব্যাচ" : "Scheduled Batches"}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
              {t.commercial.leadTimeTitle}
            </span>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#15120E] dark:text-[#FAF6F0] mt-1">
              {isBn ? "প্রোগ্রাম অনুসারে" : "Targeted Program"}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
              {t.commercial.leadTimeDesc}
            </p>
          </div>

          {/* Card 4: Payment Terms */}
          <div className="p-5 sm:p-6 bg-[#FAF8F5] dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 hover:border-[#C89D43]/60 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 border border-purple-500/25 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold">
                {isBn ? "বাণিজ্যিক নিরাপত্তা" : "Trade Security"}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
              {t.commercial.paymentTitle}
            </span>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#15120E] dark:text-[#FAF6F0] mt-1">
              100% L/C at Sight / T/T
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
              {t.commercial.paymentDesc}
            </p>
          </div>

        </div>

        {/* HIGH-CREDIBILITY BUYER SAFEGUARDS & ANTI-FRAUD VERIFICATION CENTER */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-white dark:from-[#15100B] dark:to-[#0D0907] border border-[#DED4BD] dark:border-[#2C2117] shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D2] dark:border-stone-800">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8C6214] dark:text-[#E5BE58] flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#C89D43]" />
                <span>{isBn ? "বায়ার নিরাপত্তা ও স্বচ্ছতা ফ্রেমওয়ার্ক" : "Tannery Buyer Safeguards & Direct Factory Standards"}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#15120E] dark:text-white">
                {isBn ? "জিরো-ফ্রড বাণিজ্য নিশ্চয়তা ও সরাসরি ট্যানারি ক্রেডিবিলিটি" : "Verified Trade Standards: Complete Transparency for Global Importers"}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                Savar Tannery Industrial Estate · Dhaka
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6">
            {buyerSafeguards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-white dark:bg-[#1A140F] border border-stone-200/90 dark:border-stone-800 hover:border-[#C89D43]/60 transition-colors flex flex-col justify-between space-y-3.5 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF4E2] dark:bg-[#251C14] text-[#8C6214] dark:text-[#F3CE6D] border border-[#C89D43]/30 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-[#15120E] dark:text-white leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleAction(`${item.title} (${item.id})`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6214] dark:text-[#F3CE6D] hover:text-[#5B3E0A] dark:hover:text-white transition-colors cursor-pointer group"
                    >
                      <span>{item.cta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D43] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <span className="text-[10px] font-mono text-stone-400">
                      Standard Trade Policy
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Address & Trade Identity Strip */}
          <div className="mt-6 pt-5 border-t border-[#EAE3D2] dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-[#C89D43] shrink-0" />
              <span><strong>Corporate Desk:</strong> Sikdar Estate, Beribadh Road, Nawabganj, Dhaka-1312</span>
              <span className="hidden sm:inline">·</span>
              <span><strong>Production Base:</strong> Savar Tannery Industrial Estate, Hemayetpur, Dhaka</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://maps.app.goo.gl/F9aseXrAYr9og3PT9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#8C6214] dark:text-[#F3CE6D] hover:underline flex items-center gap-1"
              >
                <span>Google Maps Verified</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
