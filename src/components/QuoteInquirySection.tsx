import React, { useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import {
  LEATHER_FORM_OPTION_GROUPS,
  ALL_LEATHER_FORM_VALUES,
} from "../data/leatherFormOptions";
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
  Loader2,
} from "lucide-react";
import { SectionShareButton } from "./SectionShareButton";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "1d674072-889f-4929-8824-dac6d3190280";

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
    product: prefilledProduct || "Crust Chrome Tanned Cow & Goat Leather (Full / Top / Corrected)",
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState("");
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
    return `*ExportVisor Direct Leather Export RFQ*
---------------------------------------
• Full Name: ${formData.fullName}
• Company: ${formData.companyName}
• Country: ${formData.country}
• Business Email: ${formData.email}
• WhatsApp / Phone: ${formData.phone || "Not specified"}
• Product Category: ${formData.product}
• Quantity / MOQ: ${formData.quantity || "To be discussed"}
• Leather Type: ${formData.leatherType}
• Thickness: ${formData.thickness}
• Color: ${formData.color}
• Finish: ${formData.finish}
• Intended Application: ${formData.application}
• Target Price (USD): ${formData.targetPrice || "Negotiable / Based on quotation"}
• Message / Specifications: ${formData.message || "None specified"}
• Attachments: ${files.length > 0 ? files.join(", ") : "None"}`;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      companyName: "",
      country: "",
      email: "",
      phone: "",
      product: prefilledProduct || "Crust Chrome Tanned Cow & Goat Leather (Full / Top / Corrected)",
      quantity: "",
      leatherType: "Bovine / Cowhide",
      thickness: "1.2 - 1.4 mm",
      color: "Natural / Tan",
      finish: "Milling Crust / Natural",
      application: "Footwear Uppers",
      targetPrice: "",
      message: "",
    });
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.country.trim()) {
      setErrorMsg(
        language === "bn"
          ? "অনুগ্রহ করে নাম, কোম্পানির নাম, দেশ ও ইমেইল ঠিকানা পূরণ করুন।"
          : "Please complete all required fields (Name, Company, Country, and Business Email)."
      );
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const summarySnapshot = buildSummaryText();

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New ExportVisor Quote Request: ${formData.product} — ${formData.companyName} (${formData.country})`,
          from_name: "ExportVisor Export Team",
          replyto: formData.email,
          name: formData.fullName,
          company_name: formData.companyName,
          email: formData.email,
          country: formData.country,
          phone_whatsapp: formData.phone || "Not specified",
          product_category: formData.product,
          quantity_moq: formData.quantity || "To be discussed",
          leather_type: formData.leatherType,
          thickness: formData.thickness,
          color: formData.color,
          finish: formData.finish,
          intended_application: formData.application,
          target_price_usd: formData.targetPrice || "Negotiable",
          attachments_selected: files.length > 0 ? files.join(", ") : "None",
          message: formData.message || "Requesting quotation and counter-sample details.",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed. Please try again.");
      }

      setSubmittedSummary(summarySnapshot);
      resetForm();
      setSubmitted(true);

      trackEvent("inquiry_form_submit", {
        product: formData.product,
        company: formData.companyName,
        country: formData.country,
        quantity: formData.quantity,
      });
    } catch (err) {
      const msg =
        err instanceof Error && err.message && !err.message.includes("fetch")
          ? err.message
          : language === "bn"
            ? "নেটওয়ার্ক সমস্যার কারণে অনুরোধ পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।"
            : "Unable to send your quote request due to a network issue. Please try again or reach us directly on WhatsApp.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "inquiry_submit_action" });
    const encodedText = encodeURIComponent(submittedSummary || buildSummaryText());
    const digits = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "") || "8801355976619";
    window.open(`https://api.whatsapp.com/send?phone=${digits}&text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(submittedSummary || buildSummaryText());
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
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="w-5 h-[2px] bg-[#C89D43] shrink-0" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#7A5A17] dark:text-[#E5BE58]">
              {t.inquiry.kicker}
            </span>
            <SectionShareButton path="/quote" sectionName={t.inquiry.kicker} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#15120E] dark:text-[#FAF6F0] leading-tight mt-1">
            {t.inquiry.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.inquiry.subtitle}
          </p>
        </motion.div>

        {/* Zero-Risk Buyer Order Workflow */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#140F0B] border border-[#EAE3D2] dark:border-stone-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#C89D43]/20 text-[#8C6214] dark:text-[#E5BE58] font-mono text-xs font-bold flex items-center justify-center shrink-0">01</span>
            <div>
              <div className="text-xs font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? "২৪ ঘণ্টার মধ্যে সরাসরি ফ্যাক্টরি কোটেশন" : "24h Direct Exporter Quotation"}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                {language === "bn"
                  ? "বিনা বাধ্যবাধকতায় FOB/CIF দর এবং উৎপাদন শিডিউল পান।"
                  : "Non-binding FOB Chattogram or CIF factory pricing within 24 hours."}
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#140F0B] border border-[#EAE3D2] dark:border-stone-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#C89D43]/20 text-[#8C6214] dark:text-[#E5BE58] font-mono text-xs font-bold flex items-center justify-center shrink-0">02</span>
            <div>
              <div className="text-xs font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? "আগে সোয়াচ স্যাম্পল দেখুন (DHL/FedEx)" : "Physical Swatch Approval First"}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                {language === "bn"
                  ? "বাল্ক অর্ডারের পূর্বে কুরিয়ারে ফিজিক্যাল স্যাম্পল ও ল্যাব-ডিপ যাচাই করুন।"
                  : "Verify thickness, color & grain pull on physical hides before booking bulk."}
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#140F0B] border border-[#EAE3D2] dark:border-stone-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#C89D43]/20 text-[#8C6214] dark:text-[#E5BE58] font-mono text-xs font-bold flex items-center justify-center shrink-0">03</span>
            <div>
              <div className="text-xs font-bold text-[#15120E] dark:text-[#FAF6F0]">
                {language === "bn" ? "L/C পেমেন্ট ও SGS/Intertek পরিদর্শন" : "L/C Protection & SGS/Intertek QC"}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                {language === "bn"
                  ? "ব্যাংকিং L/C সুরক্ষা ও তৃতীয় পক্ষের ইন্সপেকশন সুবিধা।"
                  : "Irrevocable LC at Sight and 3rd-party SGS pre-shipment audit supported."}
              </p>
            </div>
          </div>
        </div>

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
                      WhatsApp Direct Export
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
                      Official Export Email
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
                        Registered Export Office
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

            {/* Export Quotation Guidelines */}
            <div className="p-5 border border-stone-200/90 dark:border-stone-800 rounded-xl space-y-3 bg-white dark:bg-[#120E0B] shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58] block">
                Export Quotation Guidelines
              </span>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C89D43] font-bold">•</span>
                  <span><strong>MOQ &amp; Volumes:</strong> Tailored to your RFQ and production drum batch sizes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C89D43] font-bold">•</span>
                  <span><strong>Quotation:</strong> Formulated based on grade, substance, finish &amp; lot size.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C89D43] font-bold">•</span>
                  <span><strong>Payment:</strong> International L/C at Sight or T/T.</span>
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
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#181310] dark:text-white">
                      {language === "bn" ? "কোটেশন অনুরোধ সফলভাবে পাঠানো হয়েছে" : "Quote Request Sent Successfully"}
                    </h3>
                    <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {language === "bn"
                        ? "ধন্যবাদ! আপনার কোটেশন অনুরোধ পাঠানো হয়েছে। আমাদের এক্সপোর্ট টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।"
                        : "Thank you! Your quote request has been sent. Our export team will contact you within 24 hours."}
                    </p>
                  </div>

                  {/* Optional Quick Actions */}
                  <div className="p-4 bg-white dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded-lg max-w-xl mx-auto text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-700 dark:text-stone-200 uppercase tracking-wider">
                        {language === "bn" ? "তাৎক্ষণিক সংযোগ (ঐচ্ছিক)" : "Fast-Track Follow-Up (Optional)"}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied to clipboard" : "Copy Inquiry"}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-md text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <MessageSquareText className="w-4 h-4" />
                      <span>{language === "bn" ? "হোয়াটসঅ্যাপে দ্রুত চ্যাট করুন" : "Fast-Track via WhatsApp"}</span>
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-[#9E731C] dark:text-[#E5BE58] hover:underline cursor-pointer"
                    >
                      {language === "bn" ? "আরেকটি কোটেশন অনুরোধ পাঠান" : "Send another quote request"}
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMsg && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-md text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {prefilledProduct && (
                    <div className="p-3 bg-stone-100 dark:bg-[#1A140F] border border-stone-200 dark:border-stone-800 rounded-md flex items-center justify-between text-xs text-stone-800 dark:text-stone-200">
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
                    <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
                      {language === "bn" ? "১. কোম্পানি ও যোগাযোগের বিবরণ" : "1. Company & Contact Details"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {t.inquiry.nameLabel} *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t.inquiry.namePlaceholder}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {t.inquiry.companyLabel} *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={t.inquiry.companyPlaceholder}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {language === "bn" ? "দেশ / অঞ্চল *" : "Country / Region *"}
                        </label>
                        <input
                          type="text"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          placeholder={language === "bn" ? "উদাঃ ইতালি, জার্মানি, যুক্তরাষ্ট্র, জাপান..." : "e.g. Italy, Germany, USA, Japan..."}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {t.inquiry.emailLabel} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.inquiry.emailPlaceholder}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {t.inquiry.phoneLabel}
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.inquiry.phonePlaceholder}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Leather Specification */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
                      {language === "bn" ? "২. চামড়ার স্পেসিফিকেশন ও প্রয়োজনীয়তা" : "2. Leather Requirements"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="sm:col-span-2 lg:col-span-2">
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {t.inquiry.leatherTypeLabel}
                        </label>
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        >
                          {formData.product && !ALL_LEATHER_FORM_VALUES.includes(formData.product) && (
                            <option value={formData.product}>{formData.product}</option>
                          )}
                          {LEATHER_FORM_OPTION_GROUPS.map((group) => (
                            <optgroup
                              key={group.groupLabelEn}
                              label={language === "bn" ? group.groupLabelBn : group.groupLabelEn}
                            >
                              {group.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {language === "bn" ? opt.labelBn : opt.labelEn}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {t.inquiry.quantityLabel}
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder={t.inquiry.quantityPlaceholder}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {language === "bn" ? "কাঙ্ক্ষিত পুরুত্ব (Thickness)" : "Target Thickness"}
                        </label>
                        <input
                          type="text"
                          name="thickness"
                          value={formData.thickness}
                          onChange={handleChange}
                          placeholder="e.g. 1.1 - 1.3 mm"
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {language === "bn" ? "পছন্দের রঙ / শেড" : "Preferred Color / Shade"}
                        </label>
                        <input
                          type="text"
                          name="color"
                          value={formData.color}
                          onChange={handleChange}
                          placeholder="e.g. Tan, Black, Cognac, or Swatch"
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {language === "bn" ? "ফিনিশিং / সারফেস ধরন" : "Finish / Surface Type"}
                        </label>
                        <input
                          type="text"
                          name="finish"
                          value={formData.finish}
                          onChange={handleChange}
                          placeholder="e.g. Smooth, Pull-up, Milled, Matte"
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {language === "bn" ? "ব্যবহারের ক্ষেত্র (Application)" : "Intended Application"}
                        </label>
                        <input
                          type="text"
                          name="application"
                          value={formData.application}
                          onChange={handleChange}
                          placeholder={language === "bn" ? "উদাঃ জুতা (Footwear), ব্যাগ, লেদার গুডস, আসবাবপত্র..." : "e.g. Footwear Uppers, Handbags, Leather Goods, Furniture..."}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                          {language === "bn" ? "টার্গেট মূল্য (USD/বর্গফুট)" : "Target Price (USD / sq ft)"}
                        </label>
                        <input
                          type="text"
                          name="targetPrice"
                          value={formData.targetPrice}
                          onChange={handleChange}
                          placeholder={language === "bn" ? "ঐচ্ছিক (উদাঃ $১.০৫)" : "Optional (e.g. $1.45)"}
                          className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Section 3: Technical Notes & Files */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-4">

                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {t.inquiry.detailsLabel}
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.inquiry.detailsPlaceholder}
                        className="w-full px-3 py-2.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                      />
                    </div>

                    {/* File Attachment Simulation */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        {language === "bn" ? "রেফারেন্স টেক প্যাক / সোয়াচ ফটো (ঐচ্ছিক)" : "Reference Tech Pack / Swatch Photo (Optional)"}
                      </label>
                      <div className="border border-dashed border-stone-300 dark:border-stone-700 rounded-md p-3 bg-white dark:bg-[#1A140F] text-center hover:bg-stone-50 dark:hover:bg-[#221A14] transition-colors relative cursor-pointer">
                        <input
                          type="file"
                          multiple
                          onChange={handleSimulatedFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                          <UploadCloud className="w-4 h-4 text-[#C89D43]" />
                          <span>
                            {language === "bn"
                              ? "স্পেসিফিকেশন ফাইল বা ছবি সংযুক্ত করতে ক্লিক করুন (PDF, PNG, JPG)"
                              : "Click to attach specifications or photos (PDF, PNG, JPG)"}
                          </span>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-stone-600 dark:text-stone-300">
                          {files.map((file, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-stone-200/80 dark:bg-stone-800 px-2 py-0.5 rounded"
                            >
                              <Paperclip className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                              <span>{file}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button with Sending Spinner State */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={isSubmitting ? undefined : { scale: 1.015, translateY: -1 }}
                      whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 min-h-[48px] text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-xl transition-all shadow-gold-subtle hover:shadow-gold-glow cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 text-[#15120E] animate-spin" />
                          <span>{language === "bn" ? "পাঠানো হচ্ছে..." : "Sending..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#15120E]" />
                          <span>{t.inquiry.submitBtn}</span>
                        </>
                      )}
                    </motion.button>
                    <p className="text-center text-[11px] text-stone-500 dark:text-stone-400 mt-2">
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
