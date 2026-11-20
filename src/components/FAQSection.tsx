import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { ChevronDown } from "lucide-react";
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
        ? "বাল্ক লেদার এক্সপোর্টের জন্য আন্তর্জাতিক পেমেন্ট টার্মস ও প্রোডাকশন লিড টাইম কী?"
        : "What international payment terms and production lead times apply to bulk leather exports?",
      a: language === "bn"
        ? "আইসিসি ইউসিপি ৬০০ (ICC UCP 600) নিয়ম অনুযায়ী ১০০% ইরিভোকেবল এল/সি অ্যাট সাইট (L/C at Sight) অথবা ভেরিফায়েড বিলের বিপরীতে টি/টি (T/T) পেমেন্ট গ্রহণ করা হয়। ওয়েট ব্লু ও ক্রাস্ট লেদার ১৫–২৫ দিন এবং ফিনিশড, স্প্লিট ও লাইনিং লেদার ২৫–৩৫ দিনের মধ্যে শিপমেন্টের জন্য প্রস্তুত হয়।"
        : "We process payments safely under ICC UCP 600 banking rules through Irrevocable Letter of Credit (100% L/C at Sight) or Telegraphic Transfer (T/T deposit with balance against verified Bill of Lading documents). Typical production lead times are 15–25 days for Wet Blue and Crust lots and 25–35 days for Finished, Split, and Shoe Lining programs.",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <div className="inline-flex items-center gap-2.5 mb-2">
            <span className="w-5 h-[2px] bg-[#C89D43] shrink-0" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#7A5A17] dark:text-[#E5BE58]">
              {t.faq.kicker}
            </span>
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
                  <h3 className="text-sm sm:text-base font-semibold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-[#C89D43] transition-colors pr-4">
                    {faq.q}
                  </h3>
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

        {/* Direct B2B Conversion Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF6F0] dark:bg-[#17120E] px-5 py-4">
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 text-center sm:text-left">
            Need a custom tannery specification sheet, physical leather swatch, or FOB/CIF container quote from Bangladesh?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <a
              href="/products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products");
              }}
              className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1F1813] text-xs font-semibold text-stone-800 dark:text-stone-200 hover:border-[#C89D43] transition-colors"
            >
              Browse 5 Leather Categories
            </a>
            <a
              href="/quote"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("inquiry");
              }}
              className="px-4 py-2 rounded-lg bg-[#C89D43] hover:bg-[#B48C38] text-xs font-bold text-stone-950 transition-colors"
            >
              Request Sample / Get Quote
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
