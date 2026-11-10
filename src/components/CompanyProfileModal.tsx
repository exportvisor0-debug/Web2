import React from "react";
import { siteConfig } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";
import { X, Printer, Download, Mail, Phone, MapPin, Globe2, ShieldCheck, CheckCircle2 } from "lucide-react";

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
  isOpen,
  onClose,
  onRequestQuote,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    trackEvent("company_profile_view", { action: "print" });
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#120E0B] rounded-lg shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col print:max-h-none print:shadow-none print:border-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181310] print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#C89D43]/15 text-[#7A5A17] dark:bg-stone-800 dark:text-[#E5BE58] flex items-center justify-center font-serif text-xs font-bold border border-[#C89D43]/40">
              EV
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              ExportVisor Corporate Brief & Scope
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-[#1A1410] border border-stone-300 dark:border-stone-700 rounded hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Profile Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-8 bg-white dark:bg-[#120E0B] text-stone-800 dark:text-stone-200 print:bg-white print:text-stone-900">
          
          {/* Header Block */}
          <div className="border-b border-stone-300 dark:border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold tracking-tight text-[#181310] dark:text-white print:text-black">
                  Export<span className="text-[#C89D43]">Visor</span>
                </span>
                <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                  · Corporate Profile
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-500 dark:text-stone-400 space-y-1">
              <p>Origin: Dhaka, Bangladesh</p>
              <p>Email: {siteConfig.contact.email}</p>
              <p>WhatsApp: {siteConfig.contact.whatsappFormatted}</p>
            </div>
          </div>

          {/* Executive Overview */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C89D43]">
              1. Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              ExportVisor operates as the dedicated Tannery Export Desk & Global Export Division for manufacturing tanneries in the Savar Tannery Industrial Estate, Dhaka, Bangladesh. We handle direct international trade, proforma invoicing, drum production supervision, physical counter-sample lab dips, and 100% pre-shipment quality inspection. Overseas footwear manufacturers, luxury leather goods producers, and raw leather re-tanners transact directly at genuine factory-gate pricing—eliminating intermediary markups and ensuring complete technical compliance.
            </p>
          </div>

          {/* Sourcing Scope */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C89D43]">
              2. Sourcing Scope & Product Classifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-stone-50 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded">
                <strong className="block text-stone-900 dark:text-stone-100 mb-1">Wet Blue Leather</strong>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Full substance, grain splits, and drop splits for international re-tanning mills.
                </p>
              </div>
              <div className="p-3 bg-stone-50 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded">
                <strong className="block text-stone-900 dark:text-stone-100 mb-1">Crust Leather</strong>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Chrome-tanned and vegetable-tanned crust, natural milling crust ready for coloration.
                </p>
              </div>
              <div className="p-3 bg-stone-50 dark:bg-[#181310] border border-stone-200 dark:border-stone-800 rounded">
                <strong className="block text-stone-900 dark:text-stone-100 mb-1">Finished Leather</strong>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Full grain, top grain, corrected grain, aniline, semi-aniline, and pigmented leathers.
                </p>
              </div>
            </div>
          </div>

          {/* Commercial Framework */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C89D43]">
              3. Commercial Framework & RFQ Evaluation
            </h2>
            <div className="border border-stone-200 dark:border-stone-800 rounded divide-y divide-stone-200 dark:divide-stone-800 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Minimum Order Quantity (MOQ)</span>
                <span className="sm:col-span-2 text-stone-800 dark:text-stone-200">
                  Determined per RFQ (Tailored to leather type, grade distribution & drum capacity)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Tannery Quotation Basis</span>
                <span className="sm:col-span-2 text-stone-800 dark:text-stone-200">
                  Formulated upon RFQ review (Governed by substance, finish, testing & volume)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Production Lead Time</span>
                <span className="sm:col-span-2 text-stone-800 dark:text-stone-200">
                  Scheduled per RFQ & proforma invoice agreement
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5">
                <span className="font-semibold text-stone-700 dark:text-stone-300">International Payment Terms</span>
                <span className="sm:col-span-2 text-stone-800 dark:text-stone-200">
                  Irrevocable Letter of Credit (LC at sight) or Telegraphic Transfer (TT)
                </span>
              </div>
            </div>
          </div>

          {/* Operational Coordination Workflow */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C89D43]">
              4. Key Buyer Services
            </h2>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside">
              <li>Tannery matching and vetting tailored to product machinery requirements.</li>
              <li>Translation of buyer tech packs, thickness tolerances, and color swatches.</li>
              <li>Counter-sample coordination and courier dispatch.</li>
              <li>On-site quality and inspection coordination prior to packaging.</li>
              <li>Export packaging compliance (heat-treated pallets, moisture barrier wrap).</li>
              <li>Export logistics and documentation (Bill of Lading, COO, Commercial Invoice).</li>
            </ul>
          </div>

          {/* Official Contacts Block */}
          <div className="pt-4 border-t border-stone-300 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">ExportVisor Tannery Export Desk</p>
              <p>Email: {siteConfig.contact.email}</p>
              <p>WhatsApp: {siteConfig.contact.whatsappFormatted}</p>
            </div>
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">Registered Office & Hub</p>
              <p>{siteConfig.company.address}</p>
              <a
                href={siteConfig.company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C89D43] font-semibold hover:underline block mt-0.5 print:hidden"
              >
                View on Google Maps ↗
              </a>
              <p className="text-[11px] text-stone-400 mt-1">© {new Date().getFullYear()} ExportVisor. All rights reserved.</p>
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181310] flex items-center justify-between print:hidden">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            ExportVisor Direct Tannery Export Desk · Savar, Dhaka, Bangladesh
          </span>
          <button
            onClick={() => {
              onClose();
              onRequestQuote();
            }}
            className="px-5 py-2.5 text-xs font-bold text-[#15120E] bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] hover:from-[#E5BE58] hover:to-[#D6AC4B] rounded-lg transition-all shadow-gold-subtle cursor-pointer"
          >
            Submit Tannery Export RFQ
          </button>
        </div>

      </div>
    </div>
  );
};
