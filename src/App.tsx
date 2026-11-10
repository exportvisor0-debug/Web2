import React, { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { Hero } from "./components/Hero";
import { TrustComplianceStrip } from "./components/TrustComplianceStrip";
import { AboutSection } from "./components/AboutSection";
import { LeatherCatalogue } from "./components/LeatherCatalogue";
import { LeatherGlossarySection } from "./components/LeatherGlossarySection";
import { CommercialTermsSection } from "./components/CommercialTermsSection";
import { LeatherMaintenanceCare } from "./components/LeatherMaintenanceCare";
import { LeatherKnowledgeHub } from "./components/LeatherKnowledgeHub";
import { BangladeshAdvantage } from "./components/BangladeshAdvantage";
import { WhyExportVisor } from "./components/WhyExportVisor";
import { QuoteInquirySection } from "./components/QuoteInquirySection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CompanyProfileModal } from "./components/CompanyProfileModal";
import { QuoteInquiryModal } from "./components/QuoteInquiryModal";
import { RequestConsultationModal } from "./components/RequestConsultationModal";
import { FloatingActions } from "./components/FloatingActions";
import { LeatherProduct, LEATHER_PRODUCTS } from "./data/products";
import { useSectionRouter, navigateTo, syncProductSeo } from "./utils/router";

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<LeatherProduct | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<string>("");
  const [isCompanyProfileOpen, setIsCompanyProfileOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState("Direct Tannery Pricing & Volume MOQ");

  // Initialize section routing & scroll synchronization with product deep-linking
  useSectionRouter((prod) => setSelectedProduct(prod));

  const handleSelectProduct = (prod: LeatherProduct) => {
    setSelectedProduct(prod);
    syncProductSeo(prod);
    window.history.pushState(null, "", `/product/${prod.id}`);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    syncProductSeo(null);
    if (window.location.pathname.startsWith("/product/")) {
      window.history.pushState(null, "", "/products");
    }
  };

  const handleOpenQuoteModal = (productName?: string) => {
    if (productName) {
      setQuotePrefill(productName);
    }
    setIsQuoteModalOpen(true);
  };

  const handleOpenConsultationModal = (topic?: string) => {
    if (topic) {
      setConsultationTopic(topic);
    }
    setIsConsultationModalOpen(true);
  };

  const handleScrollToQuoteSection = (productName?: string) => {
    if (productName) {
      setQuotePrefill(productName);
    }
    navigateTo("/quote", true);
  };

  const handleExploreLeather = () => {
    navigateTo("/products", true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0806] text-stone-900 dark:text-[#F3EEEA] flex flex-col font-sans selection:bg-[#C89D43]/25 selection:text-[#7A5A17] dark:selection:text-[#E5BE58] overflow-x-clip w-full transition-colors duration-200">
      
      {/* 0. Topmost Non-Intrusive Scroll Reading Progress Bar & Section Indicator */}
      <ScrollProgressBar />

      {/* 1. Header (Sticky Top Bar with 3-Zone Contract + Multilingual Language Switcher) */}
      <Header
        onRequestQuote={() => handleOpenQuoteModal()}
        onOpenCompanyProfile={() => setIsCompanyProfileOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Background Slider */}
        <Hero
          onExploreLeather={handleExploreLeather}
          onRequestQuote={() => handleOpenQuoteModal()}
          onOpenCompanyProfile={() => setIsCompanyProfileOpen(true)}
        />

        {/* 2.1 Trust & Compliance Strip */}
        <TrustComplianceStrip />

        {/* 3. Leather Product Catalogue (Prominently near top so buyers don't have to scroll down far) */}
        <LeatherCatalogue
          onSelectProduct={handleSelectProduct}
          onRequestQuote={(prodName) => handleScrollToQuoteSection(prodName)}
        />

        {/* 3.1 Leather Glossary Section: Industry terms for non-expert buyers */}
        <LeatherGlossarySection
          onSelectProduct={(productId) => {
            const found = LEATHER_PRODUCTS.find((p) => p.id === productId);
            if (found) {
              handleSelectProduct(found);
            }
          }}
          onRequestQuote={(termName) => handleScrollToQuoteSection(termName)}
        />

        {/* 4. About ExportVisor */}
        <AboutSection
          onOpenProfile={() => setIsCompanyProfileOpen(true)}
          onRequestQuote={() => handleScrollToQuoteSection()}
        />

        {/* 5. Confirmed Commercial Benchmarks & Terms (RFQ-Driven) */}
        <CommercialTermsSection onRequestQuote={(topic) => handleScrollToQuoteSection(topic)} />

        {/* 6. Leather Maintenance, Handling & Storage Guide */}
        <LeatherMaintenanceCare
          onRequestQuote={(context) => handleScrollToQuoteSection(context)}
        />

        {/* 8. Leather Knowledge Hub (Wet Blue vs Finished Technical Advisory) */}
        <LeatherKnowledgeHub
          onRequestQuote={(prefill) => handleScrollToQuoteSection(prefill)}
        />

        {/* 9. Source Leather from Bangladesh (Ecosystem) */}
        <BangladeshAdvantage />

        {/* 12. Why Partner with ExportVisor */}
        <WhyExportVisor />

        {/* 12. Request a Quote / Inquiry Form (Primary Lead Generation) */}
        <QuoteInquirySection
          prefilledProduct={quotePrefill}
          onClearPrefill={() => setQuotePrefill("")}
        />

        {/* 13. B2B Commercial FAQ */}
        <FAQSection />
      </main>

      {/* 14. Corporate Footer */}
      <Footer
        onOpenCompanyProfile={() => setIsCompanyProfileOpen(true)}
        onRequestQuote={(productName) => handleScrollToQuoteSection(productName)}
      />

      {/* Floating Actions (WhatsApp & Quick Quote) */}
      <FloatingActions
        onRequestQuote={() => handleOpenQuoteModal()}
      />

      {/* High-Intent Request a Consultation Modal */}
      <RequestConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialTopic={consultationTopic}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProductModal}
        onRequestQuote={(productName) => {
          handleCloseProductModal();
          handleScrollToQuoteSection(productName);
        }}
      />

      {/* Company Profile Modal */}
      <CompanyProfileModal
        isOpen={isCompanyProfileOpen}
        onClose={() => setIsCompanyProfileOpen(false)}
        onRequestQuote={() => {
          setIsCompanyProfileOpen(false);
          handleScrollToQuoteSection();
        }}
      />

      {/* Quick Quote Modal */}
      <QuoteInquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        prefilledProduct={quotePrefill}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
