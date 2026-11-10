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
    },
    {
      title: t.whyUs.reason2Title,
      desc: t.whyUs.reason2Desc,
      icon: Building2,
      color: "bg-amber-500/10 text-[#C89D43] border border-[#C89D43]/30",
    },
    {
      title: t.whyUs.reason3Title,
      desc: t.whyUs.reason3Desc,
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-600 border border-blue-500/25",
    },
    {
      title: t.whyUs.reason4Title,
      desc: t.whyUs.reason4Desc,
      icon: FileCheck,
      color: "bg-rose-500/10 text-rose-600 border border-rose-500/25",
    },
    {
      title: language === "bn" ? "বস্তুনিষ্ঠ পরিদর্শন সমন্বয়" : "Objective Inspection Coordination",
      desc: language === "bn"
        ? "কনটেইনার স্টাফিংয়ের পূর্বে চামড়ার আয়তন, কালার ফাস্টনেস, টেনসাইল শক্তি ও ত্রুটি নিরীক্ষণে নিরপেক্ষ কোয়ালিটি কন্ট্রোল।"
        : "Coordination of multi-point inspections—measuring hide area, crocking fastness, tensile tolerance, and grain defects before container stuffing.",
      icon: Eye,
      color: "bg-purple-500/10 text-purple-600 border border-purple-500/25",
    },
    {
      title: language === "bn" ? "দীর্ঘমেয়াদী সোর্সিং ধারাবাহিকতা" : "Long-Term Sourcing Continuity",
      desc: language === "bn"
        ? "এককালীন ব্যবসার বদলে দীর্ঘমেয়াদী আন্তর্জাতিক অংশীদারিত্ব স্থাপন এবং সিজন টু সিজন ধারাবাহিক মানের নিশ্চয়তা।"
        : "We aim for ongoing buyer partnerships rather than one-off trades, ensuring consistent batch-to-batch leather quality season after season.",
      icon: HeartHandshake,
      color: "bg-teal-500/10 text-teal-600 border border-teal-500/25",
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
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider">
              {t.whyUs.kicker}
            </div>
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
          {reasons.map((item, idx) => {
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
                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
                  <span className="font-mono font-medium">
                    {language === "bn" ? `সুবিধা ০${idx + 1}` : `Advantage 0${idx + 1}`}
                  </span>
                  <span className="text-[#C89D43] font-bold">
                    {language === "bn" ? "যাচাইকৃত নির্ভরতা" : "Verified Reliability"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
