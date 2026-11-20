import React from "react";
import { motion } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { CheckCircle2, Shield, Eye, FileSpreadsheet, Anchor, ArrowRight } from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";
import { useLanguage } from "../context/LanguageContext";

interface AboutSectionProps {
  onRequestQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onRequestQuote,
}) => {
  const { t, language } = useLanguage();

  const corePillars = [
    {
      title: t.about.point1Title,
      description: t.about.point1Desc,
      icon: CheckCircle2,
      color: "bg-amber-500/10 text-[#C89D43] border border-[#C89D43]/30",
    },
    {
      title: t.about.point2Title,
      description: t.about.point2Desc,
      icon: FileSpreadsheet,
      color: "bg-blue-500/10 text-blue-600 border border-blue-500/25",
    },
    {
      title: t.about.point3Title,
      description: t.about.point3Desc,
      icon: Eye,
      color: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25",
    },
    {
      title: t.about.point4Title,
      description: t.about.point4Desc,
      icon: Shield,
      color: "bg-purple-500/10 text-purple-600 border border-purple-500/25",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };

  return (
    <section id="about" className="py-16 sm:py-22 bg-white dark:bg-[#0B0806] border-b border-stone-200/90 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Fade-In-Up Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-5 h-[2px] bg-[#C89D43] shrink-0" aria-hidden="true" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#7A5A17] dark:text-[#E5BE58]">
                {t.about.kicker}
              </span>
            </div>
            <SectionShareButton path="/about" sectionName={t.about.kicker} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#F8F5F0] leading-tight text-balance">
            {t.about.title}{" "}
            <span className="text-gold-gradient">{t.about.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed text-pretty">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Narrative & Value Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Context: The Sourcing Reality */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            {/* On the ground partner box */}
            <div className="p-6 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-[#C89D43]/30 rounded-xl shadow-2xs transition-colors duration-200">
              <h3 className="font-display text-2xl font-bold text-[#15120E] dark:text-[#FAF6F0] mb-3">
                {language === "bn"
                  ? "আন্তর্জাতিক ক্রেতারা কেন সরাসরি এক্সপোর্টভাইজর বেছে নেন"
                  : "Why Global Importers Choose ExportVisor Directly"}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {language === "bn"
                  ? "আন্তর্জাতিক চামড়া আমদানিতে মধ্যস্বত্বভোগীর কারণে দাম বেড়ে যায়, গ্রেডিংয়ে তারতম্য ঘটে এবং স্পেসিফিকেশন বুঝতে ভুল হয়।"
                  : "Ordering directly from ExportVisor eliminates broker markups, inconsistent selection grading, and ambiguous technical communication."}
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {language === "bn"
                  ? "বাংলাদেশের সাভারে অবস্থিত নির্ভরযোগ্য চামড়া রপ্তানিকারক ও সরবরাহকারী হিসেবে আমরা ওয়েট ব্লু, ক্রাস্ট, ফিনিশড ফুল গ্রেইন, স্প্লিট ও শু লাইনিং চামড়া সরাসরি ফ্যাক্টরি দরে বিশ্বব্যাপী সরবরাহ করি।"
                  : "Operating as a reliable leather exporter and leather supplier from Bangladesh in Savar, Dhaka, ExportVisor manufactures and exports wet blue cow & goat hides, drum-dyed crust, finished full grain leather, cow split suede, and breathable shoe lining leather at factory-gate pricing."}
              </p>
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-medium text-stone-600 dark:text-stone-300">
                  {language === "bn" ? "সরাসরি চামড়া রপ্তানিকারক" : "Direct B2B Leather Exporter"}
                </span>
                <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58] px-2 py-0.5 rounded bg-[#C89D43]/15 border border-[#C89D43]/25 text-right">
                  {language === "bn" ? "ওয়েট ব্লু · ক্রাস্ট · ফিনিশড · স্প্লিট · লাইনিং" : "Wet Blue · Crust · Finished · Split · Lining"}
                </span>
              </div>
            </div>

            <div className="p-6 border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-4 bg-white dark:bg-[#120E0B] shadow-2xs transition-colors duration-200">
              <h4 className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                {language === "bn" ? "আমাদের মূল পরিচালন নীতিমালা" : "Our Operating Principles"}
              </h4>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#C89D43]/20 text-[#C89D43] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-stone-800 dark:text-stone-200">
                      {language === "bn" ? "বায়ার-স্পেসিফিক উৎপাদন:" : "Built to Tech Pack:"}
                    </strong>{" "}
                    {language === "bn"
                      ? "আপনার নির্দিষ্ট পুরুত্ব, গ্রেডিং এবং মানদণ্ড অনুযায়ী প্রতিটি ব্যাচ প্রস্তুত ও রপ্তানি করা হয়।"
                      : "Every hide batch is produced, gauged, and graded strictly to your tolerance standards."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#C89D43]/20 text-[#C89D43] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-stone-800 dark:text-stone-200">
                      {language === "bn" ? "সঠিক তথ্য ও বাস্তবতা:" : "Zero Exaggeration:"}
                    </strong>{" "}
                    {language === "bn"
                      ? "উৎপাদন সক্ষমতা, কাঁচামালের প্রাপ্যতা ও সুনির্দিষ্ট ডেলিভারি সময়সূচির বাস্তবসম্মত প্রতিশ্রুতি।"
                      : "Factual reporting on production capacity, lead times, and raw hide availability."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#C89D43]/20 text-[#C89D43] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-stone-800 dark:text-stone-200">
                      {language === "bn" ? "বাণিজ্যিক স্বচ্ছতা:" : "Commercial Clarity:"}
                    </strong>{" "}
                    {language === "bn"
                      ? "সরাসরি ফ্যাক্টরি মূল্য প্রস্তাবনা এবং নিশ্চিত সিলেকশন ফলনের স্পষ্ট কোটেশন।"
                      : "Transparent factory quotations based on live raw-hide benchmarks and confirmed grade yields."}
                  </span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={onRequestQuote}
                  className="inline-flex items-center text-xs font-bold text-[#C89D43] hover:text-[#A67C24] dark:hover:text-[#E5BE58] transition-colors cursor-pointer group"
                >
                  <span>{t.about.btnQuote}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Operational Pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-4">
              {language === "bn" ? "প্রতিটি রপ্তানি অর্ডার যেভাবে সম্পন্ন করি" : "How We Deliver Every Export Order"}
            </h3>

            <div className="space-y-3">
              {corePillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    variants={fadeInUp}
                    whileHover={{ x: 6, borderColor: "rgba(200, 157, 67, 0.6)" }}
                    transition={{ duration: 0.2 }}
                    className="p-5 border border-stone-200/90 dark:border-stone-800/80 hover:border-[#C89D43]/50 dark:hover:border-[#C89D43]/60 rounded-xl transition-all duration-200 bg-white dark:bg-[#120E0B] shadow-2xs hover:shadow-md group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${pillar.color} flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 shadow-2xs`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-[#C89D43] transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                {language === "bn"
                  ? "আমাদের বাংলাদেশ টিমের সাথে স্পেসিফিকেশন পর্যালোচনা করতে চান?"
                  : "Ready to review specifications with our Bangladesh team?"}
              </span>
              <button
                onClick={onRequestQuote}
                className="text-xs font-bold text-[#C89D43] hover:text-[#A67C24] dark:hover:text-[#E5BE58] underline underline-offset-4 transition-colors cursor-pointer"
              >
                {language === "bn" ? "আপনার রিকোয়ারমেন্ট পাঠান →" : "Submit Your Requirements →"}
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
