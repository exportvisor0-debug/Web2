import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";
import { useLanguage } from "../context/LanguageContext";

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const localizedFaqs = [
    {
      q: t.faq.q1,
      a: t.faq.a1,
    },
    {
      q: t.faq.q2,
      a: t.faq.a2,
    },
    {
      q: t.faq.q3,
      a: t.faq.a3,
    },
    {
      q: t.faq.q4,
      a: t.faq.a4,
    },
    {
      q: t.faq.q5,
      a: t.faq.a5,
    },
    {
      q: t.faq.q6,
      a: t.faq.a6,
    },
    {
      q: language === "bn"
        ? "বায়াররা কি নির্দিষ্ট চামড়ার স্পেসিফিকেশন ও কাস্টম কালার দিতে পারেন?"
        : "Can buyers request specific custom leather specifications and colors?",
      a: language === "bn"
        ? "হ্যাঁ। বায়ারের সুনির্দিষ্ট টেকনিক্যাল স্পেসিফিকেশন অনুযায়ী চামড়া সোর্সিং আমাদের মূল কাজ। বায়াররা নির্ধারিত পুরুত্ব (উদাঃ ১.১–১.৩ মিমি), টেম্পার, গ্রেইন প্যাটার্ন এবং প্যানটোন কোড বা কাটিং পাঠালে আমরা নমুনা প্রস্তুত করি।"
        : "Yes. Sourcing to exact buyer specifications is our core business. Buyers can provide target thickness (e.g. 1.1–1.3 mm, 1.4–1.6 mm), temper (soft, medium, firm), grain pattern, and master Pantone references or physical cuttings. We coordinate counter-sample development with matching local tanneries.",
    },
    {
      q: language === "bn"
        ? "উৎপাদনের সাধারণ লিড টাইম কতদিন?"
        : "What is the typical production lead time?",
      a: language === "bn"
        ? "অর্ডারের পরিধি, ড্রাম সাইজ ও ল্যাব-ডিপ অনুমোদনের ওপর ভিত্তি করে সাধারণত ক্রাস্ট ও ওয়েট ব্লুর ক্ষেত্রে ১৫–২৫ দিন এবং ফিনিশড চামড়ার ক্ষেত্রে ২৫–৩৫ দিনের মধ্যে উৎপাদন সম্পন্ন হয়।"
        : "Production lead times depend on the RFQ specifics—such as whether raw hides are in stock or require fresh sorting, beamhouse drum cycles, lab dip/counter-sample approvals, and overall order yardage. A realistic delivery schedule is provided with your quotation.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#C89D43]" />
              <span>{t.faq.kicker}</span>
            </div>
            <SectionShareButton path="/faq" sectionName={t.faq.kicker} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#FAF6F0] leading-tight mt-1">
            {t.faq.title} <span className="text-gold-gradient">{t.faq.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </motion.div>

        {/* Accordion List with Motion */}
        <div className="divide-y divide-stone-200 dark:divide-stone-800 border-t border-b border-stone-200 dark:border-stone-800">
          {localizedFaqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="py-4"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left py-2 focus:outline-none cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-[#C89D43] transition-colors pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isOpen ? "bg-[#C89D43]/15 text-[#C89D43]" : "bg-stone-100 dark:bg-stone-800 text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100"}`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-1 pr-6 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
