export interface SectionRoute {
  id: string; // DOM section element ID
  path: string; // Primary canonical path (e.g. /products)
  aliases?: string[]; // Alternative paths that redirect or map to this section
  title: string;
  metaDescription: string;
  navLabel: string;
}

export const SECTION_ROUTES: SectionRoute[] = [
  {
    id: "hero",
    path: "/",
    title: "ExportVisor | Bangladesh Leather Sourcing & Export Partner",
    metaDescription:
      "ExportVisor connects international footwear brands, leather goods manufacturers, and global buyers directly with vetted tanneries in Bangladesh. Direct tannery pricing, pre-shipment quality inspection, and export logistics.",
    navLabel: "Home",
  },
  {
    id: "about",
    path: "/about",
    aliases: ["/about-us", "/company"],
    title: "About ExportVisor | Tannery Export Desk & Manufacturing Operations",
    metaDescription:
      "ExportVisor operates as the dedicated international export desk for premier leather tanneries in Savar, Dhaka, handling direct factory gate exports, pre-shipment quality inspection, and maritime shipping.",
    navLabel: "About",
  },
  {
    id: "leather-products",
    path: "/products",
    aliases: ["/leather-products", "/catalogue", "/leather"],
    title: "Leather Sourcing Catalogue | Wet Blue, Crust & Finished Leather",
    metaDescription:
      "Source certified genuine leather from Bangladesh: Full Grain, Top Grain, Corrected Grain, Drum Dyed Crust, and Wet Blue bovine and goat hides tailored to buyer specifications.",
    navLabel: "Products",
  },
  {
    id: "commercial-terms",
    path: "/terms",
    aliases: ["/commercial-terms"],
    title: "Commercial Terms & Standards | ExportVisor",
    metaDescription:
      "Transparent RFQ-driven commercial terms: direct factory-floor pricing, custom MOQ evaluation, scheduled production lead times, and secure international payment terms (LC/TT).",
    navLabel: "Commercial Terms",
  },
  {
    id: "knowledge-hub",
    path: "/knowledge-hub",
    aliases: ["/knowledge", "/guides"],
    title: "Leather Knowledge Hub & Technical Specifications | ExportVisor",
    metaDescription:
      "Technical sourcing guides comparing Wet Blue, Crust, and Finished leather characteristics, grain integrity, substance tolerances, and testing parameters for global buyers.",
    navLabel: "Knowledge Hub",
  },
  {
    id: "bangladesh-sourcing",
    path: "/bangladesh-sourcing",
    aliases: ["/bangladesh", "/origin"],
    title: "Why Source Leather from Bangladesh | Tannery Ecosystem",
    metaDescription:
      "Discover the competitive advantages of sourcing leather from Bangladesh: indigenous raw material quality, centralized Savar Tannery Industrial Estate, and 0% import duty benefits.",
    navLabel: "Bangladesh Advantage",
  },
  {
    id: "why-exportvisor",
    path: "/why-us",
    aliases: ["/why-exportvisor"],
    title: "Why Partner with ExportVisor | Direct Tannery Export Desk",
    metaDescription:
      "Direct factory-gate pricing, verified tannery floor oversight in Savar, technical specification matching, transparent trade terms, and 100% pre-shipment inspection for global buyers.",
    navLabel: "Why ExportVisor",
  },
  {
    id: "contact",
    path: "/quote",
    aliases: ["/contact", "/rfq", "/inquiry"],
    title: "Request a Leather Quotation & Direct Tannery Export Desk | ExportVisor",
    metaDescription:
      "Submit your technical leather tech pack, target thickness, color swatches, or volume requirements for rapid tannery matching, feasibility analysis, and direct pricing.",
    navLabel: "Request Quote",
  },
  {
    id: "faq",
    path: "/faq",
    aliases: ["/faqs", "/questions"],
    title: "Frequently Asked Questions (FAQ) | ExportVisor Tannery Export Desk",
    metaDescription:
      "Factual answers regarding MOQs, sample development, production lead times, international payment terms (LC/TT), and pre-shipment quality inspection.",
    navLabel: "FAQ",
  },
  {
    id: "leather-glossary",
    path: "/glossary",
    aliases: ["/leather-glossary", "/terms-glossary", "/leather-terms"],
    title: "Leather Industry Glossary & Technical Terminology | ExportVisor",
    metaDescription:
      "Definitive guide defining Wet Blue, Crust Leather, Full Grain, Split Leather, Temper, and Caliper standards for international footwear and leather goods buyers.",
    navLabel: "Glossary",
  },
];

import { LEATHER_PRODUCTS, LeatherProduct } from "../data/products";

export function getProductBySlugOrId(identifier: string): LeatherProduct | undefined {
  const clean = identifier.trim().toLowerCase().replace(/^\/+/, "").replace(/^product\//, "").replace(/^products\//, "").replace(/\/+$/, "");
  return LEATHER_PRODUCTS.find(
    (p) => p.id.toLowerCase() === clean || (p.slug && p.slug.toLowerCase() === clean)
  );
}

export function getProductCanonicalUrl(productId: string): string {
  const prod = LEATHER_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
  const slug = prod?.slug || prod?.id || productId;
  return `https://exportvisor.com/product/${slug}`;
}

/**
 * Finds a route by pathname (including aliases) or by section ID
 */
export function getRouteByPath(pathname: string): SectionRoute | undefined {
  const normalized = pathname.trim().toLowerCase().replace(/\/+$/, "") || "/";
  
  // Check if it's an individual product route: e.g. /product/:slug or /products/:slug
  if (normalized.startsWith("/product/") || normalized.startsWith("/products/")) {
    const parts = normalized.split("/");
    const slug = parts[2];
    if (slug) {
      const prod = getProductBySlugOrId(slug);
      if (prod) {
        return {
          id: "leather-products",
          path: `/product/${prod.id}`,
          title: prod.seoTitle || `${prod.name} | ExportVisor Leather Sourcing`,
          metaDescription: prod.seoDescription || prod.shortDescription,
          navLabel: prod.name,
        };
      }
    }
  }

  return SECTION_ROUTES.find(
    (r) =>
      r.path.toLowerCase() === normalized ||
      (r.aliases && r.aliases.map((a) => a.toLowerCase()).includes(normalized))
  );
}

export function getRouteById(id: string): SectionRoute | undefined {
  return SECTION_ROUTES.find((r) => r.id === id);
}

export function getFullUrl(path: string): string {
  const base = "https://exportvisor.com";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath === "/" ? base : `${base}${cleanPath}`;
}
