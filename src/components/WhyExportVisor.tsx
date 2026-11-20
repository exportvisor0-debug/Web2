import React from "react";
import { motion } from "motion/react";
import {
  Compass,
  MessageSquare,
  Building2,
  FileCheck,
  HeartHandshake,
  Eye,
} from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";
import { useLanguage } from "../context/LanguageContext";

export const WhyExportVisor: React.FC = () => {
  const { t, language } = useLanguage();

  const reasons = [
    {
      title: t.whyUs.reason1Title,
      desc: t.whyUs.reason1Desc,
      icon: Compass,
      color: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25",
      metaLeft: language === "bn" ? "ফ্যাক্টরি-গেট মূল্য" : "Direct Factory Pricing",
      metaRight: language === "bn" ? "কোনো মধ্যস্থতাকারী নেই" : "Zero Broker Markup",
    },
    {
      title: t.whyUs.reason2Title,
      desc: t.whyUs.reason2Desc,
      icon: Building2,
      color: "bg-amber-500/10 text-[#C89D43] border border-[#C89D43]/30",
      metaLeft: language === "bn" ? "সাভার ট্যানারি এস্টেট" : "Savar Industrial Estate",
      metaRight: language === "bn" ? "দৈনিক ফ্লোর তদারকি" : "Daily Floor Presence",
    },
    {
      title: t.whyUs.reason3Title,
      desc: t.whyUs.reason3Desc,
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-600 border border-blue-500/25",
      metaLeft: language === "bn" ? "আইএসও ও সাতরা টেস্টেড" : "ISO & SATRA Tested",
      metaRight: language === "bn" ? "±০.১ মিমি নির্ভুলতা" : "±0.1mm Calibrated",
    },
    {
      title: t.whyUs.reason4Title,
      desc: t.whyUs.reason4Desc,
      icon: FileCheck,
      color: "bg-rose-500/10 text-rose-600 border border-rose-500/25",
      metaLeft: language === "bn" ? "UCP 600 বাণিজ্য সুরক্ষা" : "UCP 600 Trade Terms",
      metaRight: language === "bn" ? "L/C ও T/T ব্যাংকিং" : "FOB Chattogram / CIF",
    },
    {
      title: language === "bn" ? "কঠোর প্রি-শিপমেন্ট মান নিয়ন্ত্রণ" : "Piece-by-Piece Pre-Shipment QC",
      desc: language === "bn"
        ? "কনটেইনার স্টাফিংয়ের পূর্বে চামড়ার আয়তন, কালার ফাস্টনেস, টেনসাইল শক্তি ও ত্রুটি নিরীক্ষণে সম্পূর্ণ কোয়ালিটি কন্ট্রোল।"
        : "Comprehensive multi-point inspection—measuring hide area, crocking fastness, tensile tolerance, and grain defects before container loading.",
      icon: Eye,
      color: "bg-purple-500/10 text-purple-600 border border-purple-500/25",
      metaLeft: language === "bn" ? "প্রি-স্টাফিং ইন্সপেকশন" : "Pre-Stuffing QC",
      metaRight: language === "bn" ? "প্রতিটি পিস যাচাইকৃত" : "Hide-by-Hide Audit",
    },
    {
      title: language === "bn" ? "দীর্ঘমেয়াদী সাপ্লাই ধারাবাহিকতা" : "Long-Term Supply Continuity",
      desc: language === "bn"
        ? "এককালীন ব্যবসার বদলে দীর্ঘমেয়াদী বাণিজ্যিক সম্পর্ক স্থাপন এবং সিজন টু সিজন ধারাবাহিক মানের নিশ্চয়তা।"
        : "Built for repeat seasonal programs rather than one-off orders, ensuring consistent batch-to-batch leather quality and shade stability.",
      icon: HeartHandshake,
      color: "bg-teal-500/10 text-teal-600 border border-teal-500/25",
      metaLeft: language === "bn" ? "ধারাবাহিক সাপ্লাই" : "Repeat Dye Lots",
      metaRight: language === "bn" ? "সিজন টু সিজন ম্যাচিং" : "Pantone Continuity",
    },
  ];

  return (
    <section id="why-exportvisor" className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Fade-In-Up Animation */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="w-5 h-[2px] bg-[#C89D43] shrink-0" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#7A5A17] dark:text-[#E5BE58]">
              {t.whyUs.kicker}
            </span>
            <SectionShareButton path="/why-us" sectionName={t.whyUs.kicker} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#FAF6F0] leading-tight mt-1">
            {t.whyUs.title} <span className="text-gold-gradient">{t.whyUs.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        {/* 6 Grid Cards with Motion Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                whileHover={{ y: -5, borderColor: "rgba(200, 157, 67, 0.65)" }}
                className="p-6 sm:p-7 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className={`w-11 h-11 rounded-lg ${item.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-2xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-[#C89D43] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-mono font-medium">
                    {item.metaLeft}
                  </span>
                  <span className="text-[#9E731C] dark:text-[#E5BE58] font-bold">
                    {item.metaRight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Export & Quality Assurance Panel */}
        <div
          id="export-quality-assurance"
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#120E0B] border border-[#D6AC4B]/35 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#EAE3D2] dark:border-stone-800">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#8C6214] dark:text-[#E5BE58]">
                {language === "bn" ? "কমপ্লায়েন্স ও রপ্তানি মানদণ্ড" : "Verified Tannery Protocols"}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#15120E] dark:text-[#FAF6F0] mt-1">
                {language === "bn" ? "Export & Quality Assurance (রপ্তানি ও মান নিয়ন্ত্রণ)" : "Export & Quality Assurance"}
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-600 dark:text-stone-300 px-3 py-1 rounded-lg bg-white dark:bg-[#1A140F] border border-[#DED4BD] dark:border-stone-700 self-start md:self-center">
              LWG Audited · EU REACH · ISO Testing
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {language === "bn"
              ? "বাংলাদেশ থেকে নির্ভরযোগ্য চামড়া রপ্তানিকারক ও সরবরাহকারী হিসেবে এক্সপোর্টভাইজর সাভার ট্যানারি এস্টেটে এলডব্লিউজি (LWG) ও রিচ (REACH) মানদণ্ড মেনে প্রতিটি চালানের মান নিশ্চিত করে।"
              : "As a reliable leather exporter and supplier from Bangladesh, ExportVisor enforces strict pre-shipment verification across all five export categories: our wet blue tannery and wet blue manufacturer hides (cow and goat), drum-dyed crust leather runs, finished full grain leather, suede split leather manufacturer lots, and breathable cow & goat shoe lining leather. Every container from Chittagong Sea Port carries piece-by-piece electronic caliper gauging (±0.1mm), Cr(VI) < 3ppm safety compliance, and optional SGS/Intertek certification."}
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#17120E] border border-stone-200 dark:border-stone-800">
              <strong className="block text-[#15120E] dark:text-white mb-1">Wet Blue &amp; Crust QC</strong>
              <span className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Boiling stability, 50–60% transit moisture lock, biocide mold defense &amp; uniform shaving.
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#17120E] border border-stone-200 dark:border-stone-800">
              <strong className="block text-[#15120E] dark:text-white mb-1">Finished Full Grain QA</strong>
              <span className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Pantone ΔE shade matching, Crockmeter dry/wet rub tests &amp; grain flex durability.
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#17120E] border border-stone-200 dark:border-stone-800">
              <strong className="block text-[#15120E] dark:text-white mb-1">Split &amp; Lining Checks</strong>
              <span className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Stitch-tear strength, uniform split nap, perspiration fastness &amp; breathability verification.
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#17120E] border border-stone-200 dark:border-stone-800">
              <strong className="block text-[#15120E] dark:text-white mb-1">Export &amp; GSP Compliance</strong>
              <span className="text-stone-600 dark:text-stone-400 leading-relaxed">
                ISPM-15 pallets, GSP Certificate of Origin, Phytosanitary &amp; UCP 600 L/C trade docs.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
