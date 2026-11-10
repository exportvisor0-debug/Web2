import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Factory, Shield, Layers } from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";
import { useLanguage } from "../context/LanguageContext";

export const BangladeshAdvantage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="bangladesh-sourcing" className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 text-xs font-bold uppercase tracking-wider">
              {t.bangladesh.kicker}
            </div>
            <SectionShareButton path="/bangladesh-sourcing" sectionName={t.bangladesh.kicker} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#FAF6F0] leading-tight mt-1">
            {t.bangladesh.title} <span className="text-gold-gradient">{t.bangladesh.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.bangladesh.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Ecosystem Facts & Strategic Map/Hub Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Sourcing Realities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? "বাংলাদেশ লেদার সোর্সিং সুবিধা" : "The Bangladesh Sourcing Advantage"}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {language === "bn"
                  ? "আন্তর্জাতিক ফুটওয়্যার ও চামড়াজাত পণ্য প্রস্তুতকারকদের জন্য বাংলাদেশ বিশ্বমানের কাঁচামাল ও শুল্কমুক্ত বাণিজ্যিক সুবিধা প্রদান করে সরাসরি ট্যানারি পার্টনারশিপের মাধ্যমে:"
                  : "For international footwear manufacturers, leather goods producers, and raw leather re-tanners, Bangladesh offers distinct advantages when partnering directly with an established tannery export desk:"}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xs hover:border-[#C89D43]/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-[#C89D43] border border-[#C89D43]/30 flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 shadow-xs">
                      <Factory className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-[#C89D43] transition-colors">
                        {t.bangladesh.benefit2Title}
                      </h4>
                      <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {t.bangladesh.benefit2Desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xs hover:border-emerald-500/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 shadow-xs">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {t.bangladesh.benefit1Title}
                      </h4>
                      <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {t.bangladesh.benefit1Desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xs hover:border-blue-500/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 border border-blue-500/25 flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 shadow-xs">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#15120E] dark:text-[#FAF6F0] group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        {t.bangladesh.benefit3Title}
                      </h4>
                      <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {t.bangladesh.benefit3Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FBF8F1] dark:bg-[#181310] border border-[#C89D43]/30 rounded-xl text-xs text-stone-700 dark:text-stone-300 shadow-2xs">
              <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58]">
                {language === "bn" ? "আমাদের প্রতিশ্রুতি:" : "Our Commitment:"}
              </span>{" "}
              {language === "bn"
                ? "এক্সপোর্টভাইজর বায়ারের স্বার্থে সরাসরি ফ্যাক্টরির সাথে স্বচ্ছ যোগাযোগ, কঠোর মান নিয়ন্ত্রণ এবং ঝামেলাহীন শিপিং নিশ্চিত করে।"
                : "ExportVisor does not replace the tannery; we make the tannery accessible, accountable, and transparent to international buyers with strict quality oversight."}
            </div>
          </motion.div>

          {/* Right Column: Bangladesh Map & Sourcing Hub Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 bg-white dark:bg-gradient-to-b dark:from-[#15120E] dark:via-[#221C16] dark:to-[#15120E] text-stone-900 dark:text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg dark:shadow-xl border border-stone-200 dark:border-[#C89D43]/35 relative overflow-hidden transition-colors duration-200"
          >
            {/* Ambient luxury glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C89D43]/5 dark:from-[#C89D43]/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#9E731C] dark:text-[#E5BE58] font-bold">
                  Sourcing Hub Profile
                </span>
                <span className="font-mono-data text-xs text-[#7A5A17] dark:text-[#E5BE58] font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-white/10">
                  Dhaka / Savar
                </span>
              </div>

              <div>
                <h4 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#15120E] dark:text-white">
                  Industrial Leather Axis
                </h4>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  Located strategically in the South Asian manufacturing corridor with direct maritime access to global trade lanes.
                </p>
              </div>

              {/* Schematic Map Representation */}
              <div className="p-4 bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200 dark:border-white/10">
                  <span className="text-stone-500 dark:text-stone-400">Primary Tannery Cluster</span>
                  <span className="font-bold text-stone-900 dark:text-white">Savar Industrial Estate</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200 dark:border-white/10">
                  <span className="text-stone-500 dark:text-stone-400">Audit & Compliance</span>
                  <span className="font-bold text-[#9E731C] dark:text-[#E5BE58]">LWG-Audited Network</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200 dark:border-white/10">
                  <span className="text-stone-500 dark:text-stone-400">Primary Sea Freight Port</span>
                  <span className="font-bold text-stone-900 dark:text-white">Chittagong Port (CTG)</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200 dark:border-white/10">
                  <span className="text-stone-500 dark:text-stone-400">Air Cargo Hub</span>
                  <span className="font-bold text-stone-900 dark:text-white">Dhaka Airport (DAC)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400">Typical Lead Time</span>
                  <span className="font-bold text-[#9E731C] dark:text-[#E5BE58]">15–20 Days</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C89D43] dark:text-[#E5BE58] shrink-0" />
                  <span>Direct tannery coordination in Dhaka & Savar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C89D43] dark:text-[#E5BE58] shrink-0" />
                  <span>Full container load (FCL) & LCL consolidation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C89D43] dark:text-[#E5BE58] shrink-0" />
                  <span>Multi-country export documentation & GSP/COO support</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>Timezone: GMT+6</span>
              <span className="text-[#9E731C] dark:text-[#E5BE58] font-bold">ExportVisor Field Presence</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
