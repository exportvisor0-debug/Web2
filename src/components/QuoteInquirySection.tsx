import React, { useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import {
  Send,
  CheckCircle2,
  MessageSquareText,
  Mail,
  Copy,
  Check,
  AlertCircle,
  Paperclip,
  UploadCloud,
  MapPin,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";

interface QuoteInquirySectionProps {
  prefilledProduct?: string;
  onClearPrefill?: () => void;
}

export const QuoteInquirySection: React.FC<QuoteInquirySectionProps> = ({
  prefilledProduct = "",
  onClearPrefill,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    country: "",
    email: "",
    phone: "",
    product: prefilledProduct || "Crust Leather",
    quantity: "",
    leatherType: "Bovine / Cowhide",
    thickness: "1.2 - 1.4 mm",
    color: "Natural / Tan",
    finish: "Milling Crust / Natural",
    application: "Footwear Uppers",
    targetPrice: "",
    message: "",
  });

  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Update product if prefilled prop changes
  React.useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newFiles.push(e.target.files[i].name);
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const buildSummaryText = () => {
    return `*ExportVisor Direct Tannery Export RFQ*
---------------------------------------
• Full Name: ${formData.fullName}
• Company: ${formData.companyName}
• Country: ${formData.country}
• Business Email: ${formData.email}
• WhatsApp / Phone: ${formData.phone}
• Product: ${formData.product}
• Required Quantity: ${formData.quantity}
• Leather Type: ${formData.leatherType}
• Thickness: ${formData.thickness}
• Color: ${formData.color}
• Finish: ${formData.finish}
• Intended Application: ${formData.application}
• Target Price (USD): ${formData.targetPrice || "Negotiable / Based on quotation"}
• Additional Specifications: ${formData.message || "None specified"}
• Attachments: ${files.length > 0 ? files.join(", ") : "None"}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.companyName || !formData.email || !formData.country) {
      setErrorMsg("Please complete all required fields (Name, Company, Country, and Business Email).");
      return;
    }

    setErrorMsg("");
    setSubmitted(true);

    trackEvent("inquiry_form_submit", {
      product: formData.product,
      company: formData.companyName,
      country: formData.country,
      quantity: formData.quantity,
    });
  };

  const handleSendViaWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "inquiry_submit_action" });
    const encodedText = encodeURIComponent(buildSummaryText());
    window.open(`https://wa.me/8801355976619?text=${encodedText}`, "_blank");
  };

  const handleSendViaEmail = () => {
    trackEvent("email_click", { location: "inquiry_submit_action" });
    const subject = encodeURIComponent(
      `Leather Sourcing Inquiry: ${formData.product} - ${formData.companyName} (${formData.country})`
    );
    const body = encodeURIComponent(buildSummaryText());
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(buildSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-[#0B0806] border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
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
              {t.inquiry.kicker}
            </div>
            <SectionShareButton path="/quote" sectionName={t.inquiry.kicker} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#FAF6F0] leading-tight mt-1">
            {t.inquiry.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.inquiry.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Sourcing Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4 space-y-6"
          >
            
            <div className="p-6 bg-white dark:bg-[#120E0B] border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-5 shadow-2xs">
              <h3 className="font-display text-xl font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? "সরাসরি যোগাযোগ মাধ্যম" : "Direct Contact Channels"}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {language === "bn"
                  ? "তাৎক্ষণিক টেকনিক্যাল পরামর্শ প্রয়োজন? সরাসরি হোয়াটসঅ্যাপ বা ইমেইলে আমাদের সাথে যোগাযোগ করুন।"
                  : "Prefer immediate technical consultation? Connect directly with our team via WhatsApp or email."}
              </p>

              <div className="space-y-4 pt-1">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "inquiry_sidebar" })}
                  className="flex items-center gap-3 p-3.5 bg-stone-50/70 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded-xl hover:border-emerald-500 transition-colors group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquareText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 block">
                      WhatsApp Commercial Desk
                    </span>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {siteConfig.contact.whatsappFormatted}
                    </span>
                  </div>
                </a>

                <a
                  href={siteConfig.contact.emailUrl}
                  onClick={() => trackEvent("email_click", { location: "inquiry_sidebar" })}
                  className="flex items-center gap-3 p-3.5 bg-stone-50/70 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded-xl hover:border-[#C89D43] transition-colors group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-[#C89D43] border border-[#C89D43]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 block">
                      Official Inquiries Email
                    </span>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C89D43]">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>

                {/* Office Location on Google Maps */}
                <a
                  href={siteConfig.company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("phone_click", { location: "office_map_sidebar" })}
                  className="flex items-start gap-3 p-3.5 bg-stone-50/70 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded-xl hover:border-[#C89D43] transition-colors group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 block">
                        Registered Office & Sourcing Hub
                      </span>
                      <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-[#C89D43] shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C89D43] block mt-0.5 leading-snug">
                      {siteConfig.company.address}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A5A17] dark:text-[#E5BE58] mt-1 group-hover:underline">
                      <Navigation className="w-3 h-3 text-[#C89D43]" />
                      <span>Open in Google Maps</span>
                    </span>
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Operating Timezone:</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Dhaka, Bangladesh (GMT+6)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Standard Response:</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Sourcing Parameters Reminder */}
            <div className="p-5 border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-3 bg-white dark:bg-[#120E0B] shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58] block">
                RFQ Sourcing Guidelines
              </span>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C89D43] font-bold">•</span>
                  <span><strong>MOQ & Volumes:</strong> Tailored to your RFQ and tannery drum capacity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C89D43] font-bold">•</span>
                  <span><strong>Quotation:</strong> Formulated based on grade, substance, finish & lot size.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C89D43] font-bold">•</span>
                  <span><strong>Payment:</strong> International LC at sight or TT.</span>
                </li>
              </ul>
            </div>

          </motion.div>

          {/* Right Column: Inquiry Form / Confirmation State */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="p-6 sm:p-8 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs">
              
              {submitted ? (
                /* Success Confirmation State with subtle animated checkmark */
                <div className="space-y-6 text-center py-6 sm:py-10 animate-fade-in">
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    {/* Expanding pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ring-glow pointer-events-none" />
                    
                    {/* Circle Container */}
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/40 flex items-center justify-center shadow-xs animate-circle-scale">
                      <svg
                        viewBox="0 0 48 48"
                        className="w-8 h-8 text-emerald-600"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeOpacity="0.2"
                        />
                        <path
                          d="M14 24.5 L21 31.5 L34 17.5"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-checkmark-draw"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="max-w-lg mx-auto">
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#181310]">
                      Inquiry Received Successfully
                    </h3>
                    <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                      Thank you for contacting ExportVisor. Your inquiry has been received. Our team will review your requirements and get back to you with commercial feasibility and indicative terms.
                    </p>
                  </div>

                  {/* Immediate Dispatch Action Buttons */}
                  <div className="p-4 bg-white border border-stone-200 rounded-lg max-w-xl mx-auto text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                        Accelerate Your Response
                      </span>
                      <button
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied to clipboard" : "Copy Inquiry"}</span>
                      </button>
                    </div>

                    <p className="text-xs text-stone-500">
                      You can instantly transmit this inquiry directly to our desk on WhatsApp or launch your mail client:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={handleSendViaWhatsApp}
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                      >
                        <MessageSquareText className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </button>

                      <button
                        onClick={handleSendViaEmail}
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-300 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Open in Email Client</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-800 underline cursor-pointer"
                    >
                      Submit another inquiry or edit details
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {prefilledProduct && (
                    <div className="p-3 bg-stone-100 border border-stone-200 rounded-md flex items-center justify-between text-xs">
                      <span>
                        Inquiring for: <strong>{prefilledProduct}</strong>
                      </span>
                      {onClearPrefill && (
                        <button
                          type="button"
                          onClick={onClearPrefill}
                          className="text-[#C89D43] hover:underline font-semibold cursor-pointer"
                        >
                          Change product
                        </button>
                      )}
                    </div>
                  )}

                  {/* Section 1: Contact Information */}
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-stone-400 block mb-3">
                      {language === "bn" ? "১. কোম্পানি ও যোগাযোগের বিবরণ" : "1. Company & Contact Details"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.inquiry.nameLabel} *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t.inquiry.namePlaceholder}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.inquiry.companyLabel} *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={t.inquiry.companyPlaceholder}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {language === "bn" ? "দেশ / অঞ্চল *" : "Country / Region *"}
                        </label>
                        <input
                          type="text"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          placeholder={language === "bn" ? "উদাঃ ইতালি, জার্মানি, যুক্তরাষ্ট্র, জাপান..." : "e.g. Italy, Germany, USA, Japan..."}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.inquiry.emailLabel} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.inquiry.emailPlaceholder}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.inquiry.phoneLabel}
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.inquiry.phonePlaceholder}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Leather Specification */}
                  <div className="pt-2 border-t border-stone-200">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-stone-400 block mb-3">
                      {language === "bn" ? "২. চামড়ার স্পেসিফিকেশন ও প্রয়োজনীয়তা" : "2. Leather Requirements"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.inquiry.leatherTypeLabel}
                        </label>
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        >
                          <option value="Crust Leather">{language === "bn" ? "ক্রাস্ট লেদার (Crust Leather)" : "Crust Leather"}</option>
                          <option value="Finished Leather">{language === "bn" ? "ফিনিশড লেদার (Finished Leather)" : "Finished Leather"}</option>
                          <option value="Wet Blue Leather">{language === "bn" ? "ওয়েট ব্লু লেদার (Wet Blue Leather)" : "Wet Blue Leather"}</option>
                          <option value="Full Grain Leather">{language === "bn" ? "ফুল গ্রেইন লেদার (Full Grain)" : "Full Grain Leather"}</option>
                          <option value="Top Grain Leather">{language === "bn" ? "টপ গ্রেইন লেদার (Top Grain)" : "Top Grain Leather"}</option>
                          <option value="Corrected Grain Leather">{language === "bn" ? "কারেক্টেড গ্রেইন লেদার" : "Corrected Grain Leather"}</option>
                          <option value="Aniline & Semi-Aniline">{language === "bn" ? "অ্যানিলিন ও সেমি-অ্যানিলিন" : "Aniline & Semi-Aniline"}</option>
                          <option value="Pigmented Leather">{language === "bn" ? "পিগমেন্টেড লেদার" : "Pigmented Leather"}</option>
                          <option value="Buyer-Specified Custom Leather">{language === "bn" ? "বায়ার-নির্দিষ্ট কাস্টম চামড়া" : "Buyer-Specified Custom Leather"}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.inquiry.quantityLabel}
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder={t.inquiry.quantityPlaceholder}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {language === "bn" ? "কাঙ্ক্ষিত পুরুত্ব (Thickness)" : "Target Thickness"}
                        </label>
                        <input
                          type="text"
                          name="thickness"
                          value={formData.thickness}
                          onChange={handleChange}
                          placeholder="e.g. 1.1 - 1.3 mm"
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {language === "bn" ? "পছন্দের রঙ / শেড" : "Preferred Color / Shade"}
                        </label>
                        <input
                          type="text"
                          name="color"
                          value={formData.color}
                          onChange={handleChange}
                          placeholder="e.g. Tan, Black, Cognac, or Swatch"
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {language === "bn" ? "ফিনিশিং / সারফেস ধরন" : "Finish / Surface Type"}
                        </label>
                        <input
                          type="text"
                          name="finish"
                          value={formData.finish}
                          onChange={handleChange}
                          placeholder="e.g. Smooth, Pull-up, Milled, Matte"
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {language === "bn" ? "টার্গেট মূল্য (USD/বর্গফুট)" : "Target Price (USD/sq ft)"}
                        </label>
                        <input
                          type="text"
                          name="targetPrice"
                          value={formData.targetPrice}
                          onChange={handleChange}
                          placeholder={language === "bn" ? "ঐচ্ছিক (উদাঃ $১.০৫)" : "Optional (e.g. $1.05)"}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Section 3: Intended Application & Tech Pack Notes */}
                  <div className="pt-2 border-t border-stone-200 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        {language === "bn" ? "ব্যবহারের ক্ষেত্র (Application)" : "Intended Application"}
                      </label>
                      <input
                        type="text"
                        name="application"
                        value={formData.application}
                        onChange={handleChange}
                        placeholder={language === "bn" ? "উদাঃ জুতা (Footwear), ব্যাগ, লেদার গুডস, আসবাবপত্র..." : "e.g. Footwear Uppers, Handbags, Small Leather Goods, Furniture Upholstery..."}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        {t.inquiry.detailsLabel}
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.inquiry.detailsPlaceholder}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                      />
                    </div>

                    {/* File Attachment Simulation */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        {language === "bn" ? "রেফারেন্স টেক প্যাক / সোয়াচ ফটো (ঐচ্ছিক)" : "Reference Tech Pack / Swatch Photo (Optional)"}
                      </label>
                      <div className="border border-dashed border-stone-300 rounded-md p-3 bg-white text-center hover:bg-stone-50 transition-colors relative cursor-pointer">
                        <input
                          type="file"
                          multiple
                          onChange={handleSimulatedFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
                          <UploadCloud className="w-4 h-4 text-[#C89D43]" />
                          <span>
                            {language === "bn"
                              ? "স্পেসিফিকেশন ফাইল বা ছবি সংযুক্ত করতে ক্লিক করুন (PDF, PNG, JPG)"
                              : "Click to attach specifications or photos (PDF, PNG, JPG)"}
                          </span>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-stone-600">
                          {files.map((file, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-stone-200/80 px-2 py-0.5 rounded"
                            >
                              <Paperclip className="w-3 h-3 text-stone-500" />
                              <span>{file}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.015, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-xl transition-all shadow-gold-subtle hover:shadow-gold-glow cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#15120E]" />
                      <span>{t.inquiry.submitBtn}</span>
                    </motion.button>
                    <p className="text-center text-[11px] text-stone-500 mt-2">
                      {language === "bn"
                        ? "অনুসন্ধান সম্পূর্ণ গোপনীয়তার সাথে পরিচালনা করা হয়। টেকনিক্যাল পর্যালোচনার পর বাণিজ্যিক শর্তাবলী নিশ্চিত করা হয়।"
                        : "Inquiries are handled strictly confidentially. Commercial terms confirmed upon technical review."}
                    </p>
                  </div>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
