import React, { useState } from "react";
import { LeatherProduct } from "../data/products";
import { trackEvent } from "../utils/analytics";
import { useLanguage } from "../context/LanguageContext";
import { LeatherImageMagnifier } from "./LeatherImageMagnifier";
import { generateProductJsonLd } from "../utils/productSchema";
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  Package,
  Layers,
  Clock,
  Coins,
  CheckCircle2,
  FileText,
  MessageSquareText,
  Leaf,
  Share2,
  Copy,
  Check,
  Tag,
  Briefcase,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

interface ProductDetailModalProps {
  product: LeatherProduct | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

type ModalTab = "specs" | "applications" | "quality" | "commercial";

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ModalTab>("specs");
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const productUrl = `https://exportvisor.com/product/${product.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopiedLink(true);
    trackEvent("copy_product_link", { product_id: product.id });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const isBn = language === "bn";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* Product-Specific JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductJsonLd(product)) }}
      />

      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#120E0B] rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#15100C]">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {product.articleNumber && (
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#C89D43]/15 text-[#7A5A17] dark:text-[#E5BE58] border border-[#C89D43]/30 font-bold">
                {product.articleNumber}
              </span>
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-[#C89D43]">
              {product.stage} Leather
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
              {product.animal} ({product.grainType})
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-stone-300 dark:text-stone-700">·</span>
            <button
              onClick={handleCopyLink}
              title="Copy direct product link for sharing"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{isBn ? "লিংক কপি হয়েছে!" : "Link Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-stone-400" />
                  <span>/product/{product.id}</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6 bg-white dark:bg-[#120E0B]">
          
          {/* Top Overview Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">
            
            {/* Image Preview with Grain Magnifier */}
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md bg-stone-100 dark:bg-stone-900">
              <LeatherImageMagnifier
                src={product.image}
                alt={`${product.name} hide sample`}
                zoomLevel={2.6}
                aspectRatioClass="aspect-[4/3]"
                isSustainable={product.isSustainable}
                category={product.stage}
                badgeLabel={product.articleNumber}
              />
            </div>

            {/* Title & Core Overview */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58]">
                    {product.tanningMethod}
                  </span>
                  {product.badgeLabel && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 font-semibold">
                      {product.badgeLabel}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#181310] dark:text-[#FAF6F0] tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {product.overview}
                </p>
              </div>

              {/* Eco-Compliant Sourcing Callout */}
              {product.isSustainable && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-lg flex items-start gap-2 text-xs text-emerald-900 dark:text-emerald-200">
                  <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-950 dark:text-emerald-100 font-semibold">
                      {isBn ? "পরিবেশবান্ধব ও টেকসই ট্যানিং সুবিধা" : "Sustainable & Eco-Compliant Sourcing Available"}
                    </strong>
                    <span className="text-emerald-800 dark:text-emerald-300 leading-relaxed block mt-0.5 text-[11px]">
                      {product.sustainabilityNote} · Aligned with Savar CETP effluent standards & REACH.
                    </span>
                  </div>
                </div>
              )}

              {/* Thickness Highlight Callout */}
              <div className="p-3 bg-gradient-to-r from-[#FAF6ED] to-white dark:from-[#181410] dark:to-[#120E0B] border border-[#C89D43]/35 rounded-lg flex items-start gap-2.5">
                <SlidersHorizontal className="w-4 h-4 text-[#C89D43] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58] block">
                    {isBn ? "থিকনেস ও সাবস্ট্যান্স (ক্রেতার চাহিদা অনুযায়ী কাস্টমাইজড)" : "Thickness & Substance: Tailored to Buyer Specification"}
                  </span>
                  <p className="text-stone-600 dark:text-stone-300 text-[11px] mt-0.5 leading-relaxed">
                    {isBn
                      ? "ফিক্সড বা নির্দিষ্ট কোনো সীমাবদ্ধতা নেই। আপনার টেক প্যাক বা পণ্যের ব্যবহার অনুযায়ী (০.৮-১.০ মিমি, ১.১-১.৩ মিমি, ১.৩-১.৫ মিমি ইত্যাদি) সুনির্দিষ্ট সাবস্ট্যান্সে স্প্লিট ও শেভ করে ডেলিভারি দেওয়া হয়।"
                      : "We do not enforce fixed millimeter limits. Every batch is calibrated and shaved to your precise tech pack requirements (e.g., 0.8–1.0mm, 1.1–1.3mm, 1.3–1.5mm, 1.6–1.8mm+) with uniform gauge control across hides."}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Navigation Tabs */}
          <div className="border-b border-stone-200 dark:border-stone-800">
            <nav className="flex space-x-1.5 sm:space-x-4 overflow-x-auto pb-px -mx-1 px-1 no-scrollbar" aria-label="Product Tabs">
              <button
                onClick={() => setActiveTab("specs")}
                className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === "specs"
                    ? "border-[#C89D43] text-[#7A5A17] dark:text-[#E5BE58]"
                    : "border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                }`}
              >
                {isBn ? "টেকনিক্যাল স্পেসিফিকেশন" : "Technical Specs"}
              </button>

              <button
                onClick={() => setActiveTab("applications")}
                className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === "applications"
                    ? "border-[#C89D43] text-[#7A5A17] dark:text-[#E5BE58]"
                    : "border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                }`}
              >
                {isBn ? "ব্যবহার ও প্রয়োগক্ষেত্র" : "Applications & End-Use"}
              </button>

              <button
                onClick={() => setActiveTab("quality")}
                className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === "quality"
                    ? "border-[#C89D43] text-[#7A5A17] dark:text-[#E5BE58]"
                    : "border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                }`}
              >
                {isBn ? "কোয়ালিটি ও ইন্সপেকশন" : "Quality & Inspection"}
              </button>

              <button
                onClick={() => setActiveTab("commercial")}
                className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === "commercial"
                    ? "border-[#C89D43] text-[#7A5A17] dark:text-[#E5BE58]"
                    : "border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                }`}
              >
                {isBn ? "বাণিজ্যিক শর্তাবলী ও RFQ" : "Commercial Terms & RFQ"}
              </button>
            </nav>
          </div>

          {/* TAB 1: Technical Specifications */}
          {activeTab === "specs" && (
            <div className="border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden animate-fade-in">
              <div className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "ম্যাটেরিয়াল ও অ্যানিমেল টাইপ" : "Material & Animal Type"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100 font-semibold">
                    {product.materialType} ({product.animal})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40 bg-amber-50/30 dark:bg-amber-950/10">
                  <span className="font-semibold text-[#7A5A17] dark:text-[#E5BE58]">
                    {isBn ? "পুরুত্ব / থিকনেস" : "Thickness Range"}
                  </span>
                  <div className="sm:col-span-2">
                    <span className="text-stone-900 dark:text-stone-100 font-bold block">
                      {isBn ? "বায়ারের চাহিদা অনুযায়ী কাস্টমাইজড" : "Customized per Buyer Specification"}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      {isBn
                        ? "আপনার প্রয়োজনীয় সাবস্ট্যান্স ও টেক প্যাক অনুসারে প্রতিটি হাইড নিখুঁতভাবে শেভ ও গ্রেড করা হয়।"
                        : "Tailored to buyer target substance (0.8–1.0mm, 1.1–1.3mm, 1.3–1.5mm, 1.6–1.8mm+) per purchase order."}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "ট্যানিং ও প্রসেসিং পদ্ধতি" : "Tanning Chemistry"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">
                    {product.tanningMethod} ({product.stage} Stage)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "গ্রেইন টাইপ ও সারফেস স্ট্রাকচার" : "Grain Architecture"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">
                    {product.grainType}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "উপলব্ধ ফিনিশসমূহ" : "Available Finishes"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">
                    {product.availableFinishes.join(" · ")}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "রঙের বৈচিত্র্য ও ডাইং" : "Color Options"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">
                    {product.colorOptions} (Pantone Matching & Custom Swatches)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "সাইজ ও এরিয়া মেজারমেন্ট" : "Size & Area Measurement"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">
                    {product.sizeMeasurement}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isBn ? "উৎপাদন উৎস" : "Sourcing Origin"}
                  </span>
                  <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">
                    {product.origin} · Savar Industrial Tannery Zone, Dhaka
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Applications & End-Use */}
          {activeTab === "applications" && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-stone-50 dark:bg-[#15100C] border border-stone-200 dark:border-stone-800 rounded-lg">
                <h4 className="font-semibold text-xs text-stone-900 dark:text-white uppercase tracking-wider mb-2">
                  {isBn ? "প্রস্তাবিত প্রয়োগক্ষেত্র ও পণ্য ক্যাটাগরি" : "Target Manufacturing Applications"}
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D43]" />
                      <span>{app}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-[#15100C] border border-stone-200 dark:border-stone-800 rounded-lg text-xs space-y-2">
                <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58] uppercase tracking-wider block text-[10px]">
                  {isBn ? "ফিনিশিং ও মেকানিক্যাল বিহেভিয়ার গাইড" : "Finishing & Mechanical Behavior Guide"}
                </span>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {product.buyerRequirementsNote}
                </p>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Substrate State: <strong>{product.stage}</strong></span>
                  <span>Category: <strong>{product.category}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Quality & Inspection */}
          {activeTab === "quality" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/70 dark:bg-[#15100C]">
                  <div className="flex items-center gap-2 mb-2 text-stone-900 dark:text-[#FAF6F0] font-bold text-xs">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span>{isBn ? "প্রি-শিপমেন্ট কোয়ালিটি ইন্সপেকশন" : "Pre-Shipment Quality Protocol"}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {product.qualityInspection}
                  </p>
                  <ul className="mt-3 text-[11px] text-stone-500 dark:text-stone-400 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Hide-by-hide gauge & caliper calibration check</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Moisture equilibrium testing (12–14% target)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Dry/wet rub fastness and grain crack verification</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/70 dark:bg-[#15100C]">
                  <div className="flex items-center gap-2 mb-2 text-stone-900 dark:text-[#FAF6F0] font-bold text-xs">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <span>{isBn ? "রপ্তানি প্যাকেজিং ও শিপিং" : "Export Packaging & Shipping"}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {product.packagingShipping}
                  </p>
                  <ul className="mt-3 text-[11px] text-stone-500 dark:text-stone-400 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>Moisture barrier polyethylene wrap + heavy craft paper</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>ISPM-15 heat-treated fumigated wooden export pallets</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>FCL / LCL consolidation from Chittagong seaport or DAC airport</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Commercial Terms & RFQ */}
          {activeTab === "commercial" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 dark:bg-[#15100C] border border-stone-200 dark:border-stone-800 rounded-lg">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                    MOQ Evaluation
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#181310] dark:text-[#FAF6F0] block mt-0.5">
                    {product.moq}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                    Lead Time
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#181310] dark:text-[#FAF6F0] block mt-0.5">
                    {product.leadTime}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                    Pricing Basis
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#7A5A17] dark:text-[#E5BE58] block mt-0.5">
                    {product.indicativePrice}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                    Origin Port
                  </span>
                  <span className="text-xs font-semibold text-[#181310] dark:text-[#FAF6F0] block mt-0.5">
                    FOB Chittagong / CFR
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-[#15100C] border border-[#C89D43]/30 rounded-lg text-xs space-y-2">
                <span className="font-bold text-[#7A5A17] dark:text-[#E5BE58] uppercase tracking-wider block text-[10px]">
                  {isBn ? "স্যাম্পল ডেভেলপমেন্ট ও কাউন্টার স্যাম্পলিং" : "Sample Swatch & Lab Dip Approval"}
                </span>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {isBn
                    ? "বাল্ক প্রোডাকশনের পূর্বে আমরা ক্রেতার কালার সোয়াচ, টেক প্যাক বা ফিজিক্যাল স্যাম্পলের উপর ভিত্তি করে কাউন্টার-স্যাম্পল প্রস্তুত করি এবং ডিএইচএল/ফেডেক্স কুরিয়ারে সরাসরি আপনার অফিসে পাঠানো হয়।"
                    : "Before starting bulk drum runs, ExportVisor coordinates counter-sampling and lab dip approvals based on your physical master swatches. Samples are dispatched via DHL/FedEx for buyer approval."}
                </p>
                <p className="text-[11px] text-[#C89D43] font-semibold pt-1">
                  Availability: {product.availabilityNote}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#15100C] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left">
            Article: <strong className="text-stone-800 dark:text-stone-200">{product.name}</strong>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy direct product URL"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                    {isBn ? "কপি হয়েছে" : "Copied"}
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#C89D43] dark:text-[#E5BE58]" />
                  <span>{isBn ? "লিংক শেয়ার" : "Share"}</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/8801355976619?text=Hello%20ExportVisor%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(
                product.name
              )}%20(${product.articleNumber || product.id}).%20Please%20advise%20pricing%20and%20sample%20availability.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", {
                  product_name: product.name,
                  location: "product_modal",
                })
              }
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isBn ? "হোয়াটসঅ্যাপ" : "WhatsApp"}</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onRequestQuote(`${product.name} (${product.articleNumber || product.id})`);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs font-bold text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-all shadow-gold-subtle cursor-pointer whitespace-nowrap"
            >
              <span>{isBn ? "কোটেশন রিকোয়েস্ট করুন" : "Request RFQ Quote"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#15120E]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
