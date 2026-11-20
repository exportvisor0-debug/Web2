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
    title: "Reliable Leather Exporter Bangladesh | ExportVisor",
    metaDescription:
      "Reliable leather exporter from Bangladesh. Direct Savar tannery supplying wet blue, crust, finished full grain, split suede and shoe lining leather.",
    navLabel: "Home",
  },
  {
    id: "about",
    path: "/about",
    aliases: ["/about-us", "/company"],
    title: "About ExportVisor | Bangladesh Leather Tannery",
    metaDescription:
      "ExportVisor is a direct leather tannery and reliable exporter in Savar, Bangladesh supplying Wet Blue, Crust, Finished, Split and Lining leather.",
    navLabel: "About",
  },
  {
    id: "leather-products",
    path: "/products",
    aliases: ["/leather-products", "/catalogue", "/leather"],
    title: "Bangladesh Leather Catalogue | Wet Blue, Crust, Finished",
    metaDescription:
      "Browse 76 export cow, goat and buffalo leathers from Bangladesh: Wet Blue, Crust, Finished Full Grain, Cow Split Suede and Shoe Lining leather specs.",
    navLabel: "Products",
  },
  {
    id: "commercial-terms",
    path: "/terms",
    aliases: ["/commercial-terms"],
    title: "Commercial Terms and L/C Export Standards | ExportVisor",
    metaDescription:
      "Direct factory-gate pricing, custom MOQ per drum lot, scheduled lead times, SGS inspection rights and secure L/C at Sight or T/T payment terms.",
    navLabel: "Commercial Terms",
  },
  {
    id: "knowledge-hub",
    path: "/knowledge-hub",
    aliases: ["/knowledge", "/guides"],
    title: "Leather Technical Guides and Specs | ExportVisor",
    metaDescription:
      "Practical tannery guides on Wet Blue moisture control, Crust storage humidity, Finished aniline handling, hide grading and warehouse audit checks.",
    navLabel: "Knowledge Hub",
  },
  {
    id: "bangladesh-sourcing",
    path: "/bangladesh-sourcing",
    aliases: ["/bangladesh", "/origin"],
    title: "Why Source Leather from Bangladesh | Savar Tannery Hub",
    metaDescription:
      "Explore Bangladesh leather sourcing advantages: dense indigenous cowhide and Black Bengal goat fibers, Savar CETP tanneries and 0% EU/UK GSP duty.",
    navLabel: "Bangladesh Advantage",
  },
  {
    id: "why-exportvisor",
    path: "/why-us",
    aliases: ["/why-exportvisor"],
    title: "Export and Quality Assurance Standards | ExportVisor BD",
    metaDescription:
      "Factory-gate pricing with LWG-audited Savar tannery oversight, EU REACH chemical testing, caliper thickness checks and Chattogram Sea Port dispatch.",
    navLabel: "Why ExportVisor",
  },
  {
    id: "contact",
    path: "/quote",
    aliases: ["/contact", "/rfq", "/inquiry"],
    title: "Request Leather Quote and Swatch Samples | ExportVisor",
    metaDescription:
      "Submit your leather tech pack, millimeter substance, Pantone swatch and volume for a Savar tannery quote within 24 hours and fast DHL sample dispatch.",
    navLabel: "Request Quote",
  },
  {
    id: "faq",
    path: "/faq",
    aliases: ["/faqs", "/questions"],
    title: "Bangladesh Leather Export FAQ (MOQ, LWG) | ExportVisor",
    metaDescription:
      "Answers for global leather buyers on MOQs, counter-sample lab dips, LWG and REACH compliance, cow and goat grades, L/C payments and ocean shipping.",
    navLabel: "FAQ",
  },
  {
    id: "leather-glossary",
    path: "/glossary",
    aliases: ["/leather-glossary", "/terms-glossary", "/leather-terms"],
    title: "Leather Sourcing Glossary and Terms | ExportVisor",
    metaDescription:
      "Definitive B2B leather glossary defining Wet Blue, Crust, Full Grain, Split leather, temper and caliper standards for footwear and bag importers.",
    navLabel: "Glossary",
  },
];

import { LEATHER_PRODUCTS, LeatherProduct } from "../data/products";
import { getB2BProductTitle, getB2BProductDescription } from "../utils/productSeoFormat";

export function normalizeCanonicalPath(pathname: string): string {
  const clean = pathname.trim().replace(/\/+$/, "");
  return clean || "/";
}

const HUB_PRODUCT_ALIASES: Record<string, string> = {
  "wet-blue-leather": "wet-blue-chrome-full-grain",
  "crust-leather": "crust-full-grain-chrome",
  "finished-leather": "finished-full-grain-aniline-chrome",
  "full-grain-leather": "finished-full-grain-pull-up-chrome",
  "split-leather": "crust-suede-chrome",
  "top-grain-leather": "finished-top-grain-pigmented-chrome",
  "corrected-grain-leather": "finished-corrected-grain-embossed-chrome",
  "aniline-semi-aniline": "finished-full-grain-semi-aniline-chrome",
  "pigmented-leather": "finished-corrected-grain-pigmented-chrome",
  "lining-leather": "goat-lining-leather",
};

export function getProductBySlugOrId(identifier: string): LeatherProduct | undefined {
  const clean = identifier
    .trim()
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/^product\//, "")
    .replace(/^products\//, "")
    .replace(/\/+$/, "");
  const normalizedSlug = HUB_PRODUCT_ALIASES[clean] || clean.replace(/-article-\d+-/i, "-");
  return LEATHER_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === clean ||
      p.id.toLowerCase() === normalizedSlug ||
      (p.slug && (p.slug.toLowerCase() === clean || p.slug.toLowerCase() === normalizedSlug))
  );
}

export function getProductCanonicalUrl(productId: string): string {
  const clean = productId.replace(/-article-\d+-/i, "-");
  const prod = LEATHER_PRODUCTS.find(
    (p) => p.id === productId || p.id === clean || p.slug === productId || p.slug === clean
  );
  const slug = (prod?.slug || prod?.id || clean).replace(/^\/+|\/+$/g, "");
  return `https://exportvisor.com/product/${slug}`;
}

/**
 * Finds a route by pathname (including aliases) or by section ID
 */
export function getRouteByPath(pathname: string): SectionRoute | undefined {
  const normalized = normalizeCanonicalPath(pathname).toLowerCase();

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
          title: getB2BProductTitle(prod),
          metaDescription: getB2BProductDescription(prod),
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
  const cleanPath = normalizeCanonicalPath(path.startsWith("/") ? path : `/${path}`);
  return cleanPath === "/" ? `${base}/` : `${base}${cleanPath}`;
}
