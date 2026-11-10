/**
 * ExportVisor - Central Configuration File
 * 
 * Update your company contacts, links, analytics IDs, and commercial parameters here.
 * All components across the application pull directly from this single source of truth.
 */

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    shortDescription: string;
    fullDescription: string;
    origin: string;
    hqLocation: string;
    address: string;
    mapsUrl: string;
  };
  contact: {
    email: string;
    emailUrl: string;
    whatsappNumber: string;
    whatsappFormatted: string;
    whatsappUrl: string;
    phone: string;
  };
  social: {
    linkedinUrl: string;
    facebookUrl: string;
    instagramUrl: string;
  };
  commercial: {
    moqText: string;
    pricingText: string;
    leadTimeText: string;
    paymentTermsText: string;
    samplePolicy: string;
  };
  analytics: {
    gaMeasurementId: string;
  };
  formEndpoint: {
    // If you wish to use Formspree, Web3Forms, or custom webhook:
    apiUrl: string;
    fallbackToDirectContact: boolean;
  };
}

// Safe process.env accessor that seamlessly works across Vite, Vercel, Node, and browser builds
const getEnv = (key: string, fallback: string = ""): string => {
  if (typeof process !== "undefined" && process?.env && process.env[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

const siteUrl = getEnv("VITE_SITE_URL", "https://exportvisor.com");
const contactEmail = getEnv("VITE_CONTACT_EMAIL", "info@exportvisor.com");
const whatsappNumber = getEnv("VITE_WHATSAPP_NUMBER", "+8801355976619");
const phoneFormatted = getEnv("VITE_PHONE_NUMBER", "+880 1355-976619");
const gaId = getEnv("VITE_GA_MEASUREMENT_ID", "G-EXPORTVISOR_GA4");
const formApiUrl = getEnv("VITE_FORM_API_URL", "");
const googleMapsUrl = getEnv("VITE_GOOGLE_MAPS_URL", "https://maps.app.goo.gl/F9aseXrAYr9og3PT9");
const linkedinUrl = getEnv("VITE_LINKEDIN_URL", "https://www.linkedin.com/company/leather-exporter/home/");
const facebookUrl = getEnv("VITE_FACEBOOK_URL", "https://www.facebook.com/leatherexporters");
const instagramUrl = getEnv("VITE_INSTAGRAM_URL", "https://www.instagram.com/exportvisor");

const whatsappDigits = whatsappNumber.replace(/[^0-9]/g, "") || "8801355976619";
const whatsappUrl = `https://wa.me/${whatsappDigits}?text=Hello%20ExportVisor%20Team%2C%20I%20am%20interested%20in%20sourcing%20leather%20from%20Bangladesh.%20Could%20we%20discuss%20specifications%20and%20quotation%3F`;
const emailUrl = `mailto:${contactEmail}?subject=ExportVisor%20Leather%20Sourcing%20Inquiry`;

export const siteConfig: SiteConfig = {
  company: {
    name: "ExportVisor",
    tagline: "Go Global with ExportVisor",
    shortDescription:
      "Direct Tannery Export Desk & Manufacturing Operations in Dhaka, Bangladesh. Primary factory exports of wet blue, crust, and finished leather from Savar tanneries.",
    fullDescription:
      "ExportVisor operates as the dedicated international export division for manufacturing tanneries in Savar, Dhaka, Bangladesh. We handle direct global exports of certified wet blue, crust, and finished bovine leather with direct factory gate pricing, technical drum production oversight, pre-shipment quality inspection, and maritime container shipping.",
    origin: "Dhaka, Bangladesh",
    hqLocation: "Dhaka, Bangladesh",
    address: "Beribadh Road, Sikdar Estate, Chorokghata, Nawabganj, Dhaka - 1312, Bangladesh",
    mapsUrl: googleMapsUrl,
  },
  contact: {
    email: contactEmail,
    emailUrl: emailUrl,
    whatsappNumber: whatsappNumber,
    whatsappFormatted: phoneFormatted,
    whatsappUrl: whatsappUrl,
    phone: phoneFormatted,
  },
  social: {
    linkedinUrl: linkedinUrl,
    facebookUrl: facebookUrl,
    instagramUrl: instagramUrl,
  },
  commercial: {
    moqText: "Determined per RFQ (Subject to leather type, grade selection, and tannery confirmation)",
    pricingText:
      "Quoted on Request for Quotation (RFQ), determined by leather grade, substance, finish complexity, volume, and technical specifications.",
    leadTimeText:
      "Scheduled upon RFQ review and proforma confirmation, based on production cycles and batch requirements.",
    paymentTermsText: "Letter of Credit (LC) / Telegraphic Transfer (TT)",
    samplePolicy: "Available upon buyer request and technical specification review.",
  },
  analytics: {
    gaMeasurementId: gaId,
  },
  formEndpoint: {
    apiUrl: formApiUrl,
    fallbackToDirectContact: true,
  },
};
