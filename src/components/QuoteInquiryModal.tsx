import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import {
  X,
  Send,
  CheckCircle2,
  MessageSquareText,
  Mail,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";

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
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    country: "",
    email: "",
    phone: "",
    product: prefilledProduct || "Crust Leather",
    quantity: "",
    thickness: "1.2 - 1.4 mm",
    color: "Natural / Tan",
    application: "Footwear Uppers",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildSummaryText = () => {
    return `*ExportVisor Direct Tannery Export RFQ*
---------------------------------------
• Full Name: ${formData.fullName}
• Company: ${formData.companyName}
• Country: ${formData.country}
• Business Email: ${formData.email}
• WhatsApp: ${formData.phone || "Not specified"}
• Product: ${formData.product}
• Quantity: ${formData.quantity}
• Thickness: ${formData.thickness}
• Color: ${formData.color}
• Application: ${formData.application}
• Message: ${formData.message || "Please provide quotation and specifications."}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.country) {
      setErrorMsg("Please complete all required fields (Name, Company, Country, Email).");
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
    trackEvent("inquiry_form_submit", {
      product: formData.product,
      company: formData.companyName,
      country: formData.country,
      source: "modal",
    });
  };

  const handleSendViaWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "modal_submit" });
    const encoded = encodeURIComponent(buildSummaryText());
    window.open(`https://wa.me/8801355976619?text=${encoded}`, "_blank");
  };

  const handleSendViaEmail = () => {
    trackEvent("email_click", { location: "modal_submit" });
    const subject = encodeURIComponent(`Leather Sourcing Inquiry: ${formData.product} - ${formData.companyName}`);
    const body = encodeURIComponent(buildSummaryText());
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummaryText());
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
              Direct Inquiries Desk
            </span>
            <h3 className="font-display text-xl font-bold text-[#15120E] dark:text-white">
              Request a Leather <span className="text-gold-gradient">Quotation</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
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
              <h4 className="font-display text-2xl font-semibold text-[#181310]">
                Thank you for contacting ExportVisor.
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                Your inquiry has been received. Our team will review your requirements and get back to you with commercial feasibility and indicative terms.
              </p>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-left space-y-3 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">Direct Actions</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy details"}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 text-white rounded text-xs font-semibold"
                  >
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>
                  <button
                    onClick={handleSendViaEmail}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-100 hover:bg-stone-200 dark:bg-[#1F1813] dark:hover:bg-[#2A211A] text-stone-800 dark:text-white border border-stone-300 dark:border-stone-700 rounded text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Close this window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="e.g. Acme Footwear"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="e.g. Germany"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="buyer@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                    placeholder="+49 123 456789"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Leather Type
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  >
                    <option value="Crust Leather">Crust Leather</option>
                    <option value="Finished Leather">Finished Leather</option>
                    <option value="Wet Blue Leather">Wet Blue Leather</option>
                    <option value="Full Grain Leather">Full Grain Leather</option>
                    <option value="Top Grain Leather">Top Grain Leather</option>
                    <option value="Corrected Grain Leather">Corrected Grain Leather</option>
                    <option value="Aniline & Semi-Aniline">Aniline & Semi-Aniline</option>
                    <option value="Custom Sourcing">Custom Tannage Requirement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Quantity (sq ft)
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Target Substance / Thickness
                  </label>
                  <input
                    type="text"
                    name="thickness"
                    value={formData.thickness}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Additional Notes or Testing Tolerances
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify destination port, temper preference, or color requirements..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#C89D43] focus:border-[#C89D43]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-5 text-xs font-bold uppercase tracking-wider text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg shadow-gold-subtle cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#15120E]" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
