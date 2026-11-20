import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import {
  X,
  Send,
  CheckCircle2,
  MessageSquareText,
  Mail,
  Copy,
  Check,
  AlertCircle,
  Calendar,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck2,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "1d674072-889f-4929-8824-dac6d3190280";

interface RequestConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const RequestConsultationModal: React.FC<RequestConsultationModalProps> = ({
  isOpen,
  onClose,
  initialTopic = "Direct Tannery Pricing & Volume MOQ",
}) => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    country: "",
    email: "",
    phone: "",
    topic: initialTopic,
    estimatedVolume: "",
    preferredChannel: "WhatsApp Direct",
    specNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setFormData((prev) => ({ ...prev, topic: initialTopic }));
    }
  }, [initialTopic]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildSummaryText = () => {
    return `*ExportVisor Direct Tannery Export Consultation*
----------------------------------------
👤 *Contact:* ${formData.fullName}
🏢 *Company:* ${formData.companyName} (${formData.country})
📧 *Email:* ${formData.email}
📱 *Phone/WhatsApp:* ${formData.phone}
🎯 *Topic:* ${formData.topic}
📦 *Estimated Volume:* ${formData.estimatedVolume || "To be discussed"}
💬 *Preferred Channel:* ${formData.preferredChannel}
📝 *Specification Notes:*
${formData.specNotes || "Direct consultation requested."}
----------------------------------------
ExportVisor Leather Export Team · Savar, Dhaka`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.companyName.trim()) {
      setErrorMsg(
        language === "bn"
          ? "অনুগ্রহ করে আপনার নাম, কোম্পানির নাম ও ইমেইল ঠিকানা প্রদান করুন।"
          : "Please provide your full name, company name, and business email."
      );
      return;
    }

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
          subject: `New ExportVisor Consultation Request: ${formData.companyName} — ${formData.topic}`,
          from_name: "ExportVisor Export Team",
          replyto: formData.email,
          name: formData.fullName,
          company_name: formData.companyName,
          email: formData.email,
          country: formData.country || "Not specified",
          phone_whatsapp: formData.phone || "Not specified",
          product_category: formData.topic,
          quantity_moq: formData.estimatedVolume || "To be discussed",
          message: formData.specNotes || "Direct tannery export consultation requested.",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed. Please try again.");
      }

      setSubmittedSummary(summarySnapshot);
      setFormData({
        fullName: "",
        companyName: "",
        country: "",
        email: "",
        phone: "",
        topic: initialTopic,
        estimatedVolume: "",
        preferredChannel: "WhatsApp Direct",
        specNotes: "",
      });
      setSubmitted(true);

      trackEvent("consultation_form_submit", {
        topic: formData.topic,
        company: formData.companyName,
        country: formData.country,
      });
    } catch (err) {
      const msg =
        err instanceof Error && err.message && !err.message.includes("fetch")
          ? err.message
          : language === "bn"
            ? "নেটওয়ার্ক সমস্যার কারণে অনুরোধ পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
            : "Unable to send your consultation request due to a network error. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(submittedSummary || buildSummaryText());
    setCopied(true);
    trackEvent("share_link_copied", { type: "consultation_summary" });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(submittedSummary || buildSummaryText());
    const digits = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "") || "8801355976619";
    const url = `https://api.whatsapp.com/send?phone=${digits}&text=${text}`;
    trackEvent("whatsapp_click", { location: "consultation_modal_success" });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const consultationTopics = [
    "Direct Factory Pricing & Volume MOQ",
    "Pre-Shipment Quality Inspection & Testing",
    "Physical Leather Samples / Counter-Swatches",
    "Wet Blue / Crust Bulk Container Shipment",
    "Custom Leather Production (Thickness, Temper, Finish)",
    "Port Logistics & Shipping Transit Times",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#120E0B] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-gradient-to-r dark:from-[#181310] dark:via-[#241C15] dark:to-[#181310] text-stone-900 dark:text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C89D43]/15 dark:bg-[#C89D43]/20 border border-[#C89D43]/30 dark:border-[#C89D43]/40 flex items-center justify-center text-[#7A5A17] dark:text-[#E5BE58]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[#15120E] dark:text-white font-display sm:text-base">
                  {language === "bn" ? "ট্যানারি এক্সপোর্ট কনসালটেশন" : "Tannery Export Consultation"}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-mono font-semibold border border-stone-200 dark:border-stone-700">
                  Direct Leather Exporter
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-300 mt-0.5">
                {language === "bn"
                  ? "সাভারের চামড়া রপ্তানি ও টেকনিক্যাল টিমের সাথে সরাসরি পরামর্শ"
                  : "Direct technical review with our leather export team in Savar, Dhaka"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {submitted ? (
            /* Success Confirmation State */
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ring-glow pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/40 flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <h3 className="font-display text-2xl font-bold text-[#15120E] dark:text-white">
                  {language === "bn"
                    ? "কনসালটেশন অনুরোধ পাঠানো হয়েছে!"
                    : "Thank You! Your Request Has Been Sent"}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {language === "bn"
                    ? "ধন্যবাদ! আমাদের এক্সপোর্ট টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।"
                    : "Thank you! Your quote request has been sent. Our export team will contact you within 24 hours."}
                </p>
              </div>

              {/* Fast-Track Immediate Transmit Panel */}
              <div className="p-4.5 bg-stone-50 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded-xl text-left space-y-3.5 max-w-lg mx-auto shadow-2xs">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58] uppercase tracking-wider text-[11px]">
                    {language === "bn" ? "তাৎক্ষণিক সংযোগ" : "Fast-Track Option"}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">
                          {language === "bn" ? "কপি হয়েছে" : "Copied"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>{language === "bn" ? "সারাংশ কপি করুন" : "Copy Summary"}</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>{language === "bn" ? "হোয়াটসঅ্যাপে দ্রুত চ্যাট করুন" : "Fast-Track on WhatsApp"}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  {language === "bn" ? "উইন্ডো বন্ধ করুন" : "Close Window"}
                </button>
              </div>
            </div>
          ) : (
            /* Primary Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Consultation Topic Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === "bn" ? "পরামর্শের প্রধান বিষয় *" : "Primary Consultation Focus *"}
                </label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43] font-medium"
                >
                  {consultationTopics.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2-Column: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "আপনার নাম *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "কোম্পানির নাম *" : "Company Name *"}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Footwear Ltd"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
              </div>

              {/* 2-Column: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "কর্পোরেট ইমেইল *" : "Corporate Email *"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="buyer@company.com"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "ফোন / হোয়াটসঅ্যাপ (কান্ট্রি কোড সহ)" : "Phone / WhatsApp (with country code)"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
              </div>

              {/* 2-Column: Country & Estimated Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "গন্তব্য দেশ" : "Country / Region"}
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. Germany, Italy, Japan..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "আনুমানিক অর্ডারের পরিমাণ" : "Estimated Order Volume"}
                  </label>
                  <input
                    type="text"
                    name="estimatedVolume"
                    value={formData.estimatedVolume}
                    onChange={handleChange}
                    placeholder="e.g. 5,000 sq.ft or 1 x 20ft FCL"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
              </div>

              {/* Notes / Technical Specs */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {language === "bn"
                    ? "নির্দিষ্ট প্রযুক্তিগত চাহিদা বা প্রশ্ন (ঐচ্ছিক)"
                    : "Technical Specifications & Inquiries (Optional)"}
                </label>
                <textarea
                  name="specNotes"
                  rows={3}
                  value={formData.specNotes}
                  onChange={handleChange}
                  placeholder={
                    language === "bn"
                      ? "পুরুত্ব (যেমন ১.২-১.৪ মিমি), ফিনিশ, কালার বা যেকোনো বিশেষ প্রশ্ন এখানে লিখুন..."
                      : "Describe target caliper (e.g. 1.2-1.4mm), desired temper, end-application (footwear/leather goods), or timeline requirements..."
                  }
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#181310] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43] resize-none"
                />
              </div>

              {/* Trust Indicators Strip */}
              <div className="p-3 bg-[#FAF8F5] dark:bg-[#181310] rounded-xl border border-stone-200/80 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300 flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C89D43]" />
                  <span>{language === "bn" ? "১০০% নিরাপদ বাণিজ্যিক গোপনীয়তা" : "Strict Commercial Confidentiality"}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === "bn" ? "২৪ ঘণ্টার মধ্যে প্রতিক্রিয়া" : "24h Response Guaranteed"}</span>
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-1 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  {language === "bn" ? "বাতিল" : "Cancel"}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-all shadow-gold-subtle hover:shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-[#15120E] animate-spin" />
                      <span>{language === "bn" ? "পাঠানো হচ্ছে..." : "Sending..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{language === "bn" ? "কনসালটেশন অনুরোধ জমা দিন" : "Submit Consultation Request"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#15120E]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
