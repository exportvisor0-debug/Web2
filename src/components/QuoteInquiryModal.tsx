import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import {
  LEATHER_FORM_OPTION_GROUPS,
  ALL_LEATHER_FORM_VALUES,
} from "../data/leatherFormOptions";
import {
  X,
  Send,
  MessageSquareText,
  Copy,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "1d674072-889f-4929-8824-dac6d3190280";

interface QuoteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
}

export const QuoteInquiryModal: React.FC<QuoteInquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledProduct = "",
}) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    country: "",
    email: "",
    phone: "",
    product: prefilledProduct || "Crust Chrome Tanned Cow & Goat Leather (Full / Top / Corrected)",
    quantity: "",
    thickness: "1.2 - 1.4 mm",
    color: "Natural / Tan",
    targetPrice: "",
    application: "Footwear Uppers",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildSummaryText = () => {
    return `*ExportVisor Direct Leather Export RFQ*
---------------------------------------
• Full Name: ${formData.fullName}
• Company: ${formData.companyName}
• Country: ${formData.country}
• Business Email: ${formData.email}
• WhatsApp: ${formData.phone || "Not specified"}
• Product Category: ${formData.product}
• Quantity / MOQ: ${formData.quantity || "To be discussed"}
• Thickness: ${formData.thickness}
• Color: ${formData.color}
• Target Price (USD): ${formData.targetPrice || "Negotiable"}
• Application: ${formData.application}
• Message: ${formData.message || "Please provide quotation and specifications."}`;
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
      thickness: "1.2 - 1.4 mm",
      color: "Natural / Tan",
      targetPrice: "",
      application: "Footwear Uppers",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.country.trim()) {
      setErrorMsg("Please complete all required fields (Name, Company, Country, Email).");
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
          subject: `New ExportVisor Modal Quote Request: ${formData.product} — ${formData.companyName} (${formData.country})`,
          from_name: "ExportVisor Quick Quote Modal",
          replyto: formData.email,
          name: formData.fullName,
          company_name: formData.companyName,
          email: formData.email,
          country: formData.country,
          phone_whatsapp: formData.phone || "Not specified",
          product_category: formData.product,
          quantity_moq: formData.quantity || "To be discussed",
          thickness: formData.thickness,
          color: formData.color,
          target_price_usd: formData.targetPrice || "Negotiable",
          intended_application: formData.application,
          message: formData.message || "Requesting quotation and specifications.",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send quote request. Please try again.");
      }

      setSubmittedSummary(summarySnapshot);
      resetForm();
      setSubmitted(true);

      trackEvent("inquiry_form_submit", {
        product: formData.product,
        company: formData.companyName,
        country: formData.country,
        source: "modal",
      });
    } catch (err) {
      const msg =
        err instanceof Error && err.message && !err.message.includes("fetch")
          ? err.message
          : "Unable to send your quote request due to a network issue. Please try again or contact us on WhatsApp.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "modal_submit" });
    const encoded = encodeURIComponent(submittedSummary || buildSummaryText());
    const digits = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "") || "8801355976619";
    window.open(`https://api.whatsapp.com/send?phone=${digits}&text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(submittedSummary || buildSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#120E0B] rounded-lg shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181310]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C89D43]">
              Direct Bangladesh Leather Exporter
            </span>
            <h3 className="font-display text-xl font-bold text-[#15120E] dark:text-white">
              Request a Leather <span className="text-gold-gradient">Quotation</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ring-glow pointer-events-none" />
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500/40 flex items-center justify-center shadow-xs animate-circle-scale">
                  <svg
                    viewBox="0 0 48 48"
                    className="w-7 h-7 text-emerald-600"
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
              <h4 className="font-display text-2xl font-semibold text-[#181310] dark:text-white">
                Quote Request Sent Successfully
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-md mx-auto">
                Thank you! Your quote request has been sent. Our export team will contact you within 24 hours.
              </p>

              <div className="p-4 bg-stone-50 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded-lg text-left space-y-3 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-100">Optional Fast-Track</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy details"}</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>Fast-Track on WhatsApp</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#9E731C] dark:text-[#E5BE58] hover:underline cursor-pointer"
                >
                  Send another request
                </button>
                <span className="text-stone-300 dark:text-stone-700">|</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white underline cursor-pointer"
                >
                  Close this window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="e.g. Acme Footwear"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="e.g. Germany"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="buyer@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="+49 123 456789"
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
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="Optional (e.g. $1.45)"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {language === "bn" ? "টার্গেট চামড়ার ধরন (Target Leather Type)" : "Target Leather Type"}
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
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
                    Quantity / MOQ (sq ft)
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 5,000 sq ft"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Target Substance / Thickness
                  </label>
                  <input
                    type="text"
                    name="thickness"
                    value={formData.thickness}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Message & Testing Tolerances
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify destination port, temper preference, or color requirements..."
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1A140F] text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg shadow-gold-subtle cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-65 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-[#15120E] animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#15120E]" />
                      <span>Send Quote Request</span>
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
