import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf-8");

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const toAbsJpg = (relOrAbs) => {
  if (!relOrAbs) return "https://exportvisor.com/og-image.jpg";
  return relOrAbs.startsWith("http") ? relOrAbs : `https://exportvisor.com${relOrAbs}`;
};

const to4kWebp = (relOrAbs) => {
  const abs = toAbsJpg(relOrAbs);
  if (abs.includes("/assets/products/") && abs.endsWith(".jpg")) {
    return abs.replace("/assets/products/", "/assets/products/4k/").replace(/\.jpg$/, ".webp");
  }
  return abs;
};

const toThumbWebp = (relOrAbs) => {
  const abs = toAbsJpg(relOrAbs);
  if (abs.includes("/assets/products/") && abs.endsWith(".jpg")) {
    return abs.replace("/assets/products/", "/assets/products/thumbs/").replace(/\.jpg$/, ".webp");
  }
  return abs;
};

// Mirror of src/utils/productSeoFormat.ts so pre-rendered HTML matches live SPA DOM 1:1
function formatB2BBuyerDescriptor(p) {
  const clean = (p.name || "")
    .replace(/^Article\s+\d+\s*[·-]\s*/i, "")
    .replace(/\s*\(?(Article\s+\d+|WB-\d+|WW-\d+|CR-\d+)\)?\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!/\bleather\b|\bcollection\b|\bdevelopment\b|\bsourcing\b/i.test(clean)) {
    return `${clean} Leather`;
  }
  return clean;
}

function getB2BProductTitle(p) {
  return `${formatB2BBuyerDescriptor(p)} Supplier & Exporter - ExportVisor`;
}

function getB2BProductH1(p) {
  return `${formatB2BBuyerDescriptor(p)} Supplier & Exporter`;
}

function getB2BProductDescription(p) {
  return `Source export-grade ${formatB2BBuyerDescriptor(p)} from Bangladesh. Custom thickness, low MOQ, bulk supply, and fast sample dispatch. Request a quote.`;
}

const KNOWLEDGE_HUB_ARTICLES = [
  {
    title: "Moisture & Hydration Equilibrium in Wet Blue Transit",
    category: "Wet Blue Leather",
    summary: "Maintain target hide moisture strictly between 50% and 60% inside sealed polyethylene liners on ISPM-15 fumigated pallets.",
    links: [
      { id: "wet-blue-chrome-full-grain", label: "Wet Blue Chrome Full Grain Cow & Goat Leather" },
      { id: "wet-white-chrome-free-full-grain", label: "Wet White Chrome-Free Full Grain Cow & Buffalo Leather" },
    ],
  },
  {
    title: "Mold & Biocidal Protection During Ocean Freight",
    category: "Wet Blue Leather",
    summary: "Standardized TCMTB/OIT fungicide wash verification and maritime container desiccant placement from Chattogram Port.",
    links: [
      { id: "wet-blue-chrome-full-grain", label: "Export-Grade Wet Blue Chrome Cowhide Lots" },
    ],
  },
  {
    title: "Crust Leather Atmospheric Conditioning & UV Shielding",
    category: "Crust Leather",
    summary: "Store crust bundles at 50%–65% RH under breathable kraft covers with 48h acclimatization before mechanical milling.",
    links: [
      { id: "crust-article-01-full-grain-chrome", label: "Full Grain Chrome Tanned Crust Cow Leather" },
      { id: "crust-article-08-full-grain-veg", label: "Full Grain Vegetable Tanned Crust Cow & Buffalo Leather" },
    ],
  },
  {
    title: "Finished Aniline, Semi-Aniline & Pull-Up Roll Storage",
    category: "Finished Leather",
    summary: "Roll grain-side-in with acid-free tissue interleaving and stack horizontally under 4 layers to protect topcoat finish.",
    links: [
      { id: "finished-article-01-full-grain-aniline-chrome", label: "Full Grain Aniline Chrome Tanned Cow Leather" },
      { id: "finished-article-02-full-grain-semi-aniline-chrome", label: "Full Grain Semi-Aniline Chrome Cow Leather" },
      { id: "finished-article-03-full-grain-pull-up-chrome", label: "Full Grain Pull-Up Chrome Tanned Cow Leather" },
    ],
  },
];

// Primary category hub pages (each paired with an actual verified product image)
const HUB_PRODUCTS = [
  {
    id: "crust-leather",
    articleNumber: "Crust Collection",
    name: "Crust Leather",
    title: "Crust Leather Supplier & Exporter Bangladesh | Savar Tannery",
    description:
      "Source high-grade Cow, Buffalo & Goat Crust Leather from Bangladesh tanneries. Natural milling, drum-dyed or vegetable tanned crust for footwear and leather goods.",
    keywords:
      "crust leather bangladesh, cow crust leather supplier, drum dyed crust savar, leather tannery bangladesh, wholesale crust leather b2b",
    category: "Intermediate Stage",
    stage: "Crust",
    animal: "Cow, Buffalo & Goat",
    tanningMethod: "Chrome, Vegetable & Semi-Chrome",
    grainType: "Full Grain / Top Grain / Corrected",
    material: "Bovine / Cowhide / Buffalo / Goat based on buyer specification",
    finishes: [
      "Natural Milling Crust",
      "Full Chrome Tanned",
      "Chrome-Free / Vegetable Tanned",
      "Buffed / Snuffed Surface",
      "Drum Dyed / Undyed",
    ],
    thickness: "Customized per Buyer Specification (Tailored to required substance / tech pack)",
    colors: "Natural, Beige, Black, Brown, or custom drum-dyed shades",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Container loads or tailored lots)",
    leadTime: "Scheduled per RFQ & batch requirements",
    applications: [
      "Footwear uppers & linings",
      "Leather goods & handbags",
      "Belts & small leather goods",
      "Furniture upholstery base",
    ],
    overview:
      "Crust leather represents an intermediate state after tanning, shaving, and re-tanning/fatliquoring, where moisture has been removed. It offers international manufacturers and finishing tanneries maximum flexibility to apply custom colors, waxes, oils, milling, or embossing according to their own seasonal collections.",
    lowPrice: "1.65",
    highPrice: "3.20",
    offerCount: "5000",
    image: "/assets/products/crust-article-01-full-grain-chrome.jpg",
  },
  {
    id: "finished-leather",
    articleNumber: "Finished Collection",
    name: "Finished Leather",
    title: "Finished Cow Leather Exporter Bangladesh | Factory Sourcing",
    description:
      "Export-grade finished cowhide leather from Bangladesh. Automated spray finish, milled grain, pull-up, glazed finishes tailored for footwear and upholstery.",
    keywords:
      "finished leather exporter, bangladesh finished cow leather, aniline leather roll, footwear upper leather wholesale, savar leather finishing",
    category: "Finished Leather",
    stage: "Finished",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome, Veg & Combination",
    grainType: "Full Grain / Top Grain / Corrected",
    material: "Cowhide / Bovine (Full Grain, Top Grain, or Corrected Grain)",
    finishes: [
      "Smooth Matte Finish",
      "Semi-Gloss / Glazed",
      "Milled Pebble Grain",
      "Pull-Up Oil & Wax",
      "Water-Resistant Coating",
    ],
    thickness: "Customized per Buyer Specification (Calibrated to buyer target substance)",
    colors: "Full Pantone matching (Black, Cognac, Tan, Navy, Espresso, etc.)",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Subject to color split & finishing requirements)",
    leadTime: "Scheduled per RFQ & production program",
    applications: [
      "Formal & casual dress shoes",
      "Athletic & lifestyle footwear",
      "Luxury luggage & briefcases",
      "Executive office & automotive upholstery",
    ],
    overview:
      "Finished leather has undergone the complete cycle of coloration, protective topcoats, mechanical softening, and grain regulation. Sourced from partner tanneries with automated spray lines and roller coating systems, it is tailored for volume buyers requiring dependable physical durability and aesthetic uniformity.",
    lowPrice: "2.10",
    highPrice: "4.50",
    offerCount: "3000",
    image: "/assets/products/finished-article-01-full-grain-aniline-chrome.jpg",
  },
  {
    id: "wet-blue-leather",
    articleNumber: "Wet Blue Collection",
    name: "Wet Blue Leather",
    title: "Wet Blue Leather Hides Exporter Bangladesh | Cow & Goat Hides",
    description:
      "Export certified chrome tanned Wet Blue Cow, Buffalo and Goat hides from Bangladesh. High substance yield, machine fleshed, container load shipping.",
    keywords:
      "wet blue cow hides, wet blue leather bangladesh, wet blue export savar, raw hide chrome tanned, wet blue splits supplier",
    category: "Semi-Processed",
    stage: "Wet Blue",
    animal: "Cow, Buffalo & Goat",
    tanningMethod: "Chrome Tanned & Chrome-Free Wet White",
    grainType: "Full Substance & Splits",
    material: "Cow / Buffalo / Goat Wet Blue Hides & Splits",
    finishes: [
      "Full Substance Unsplit",
      "Drop Split / Grain Split",
      "Machine-Fleshed & Trimmed",
      "Evenly Wringed",
    ],
    thickness: "Substance graded per raw weight category (Light, Medium, Heavy)",
    colors: "Characteristic Chrome Tanned Pale Cyan Blue",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Container loads or tailored lots)",
    leadTime: "Scheduled per RFQ & wet blue inventory sorting",
    applications: [
      "International re-tanning mills",
      "Automotive leather processing",
      "Heavy work boot leather manufacture",
      "Split suede production",
    ],
    overview:
      "Wet Blue represents raw hides immediately after unhairing, liming, deliming, bating, pickling, and primary chrome tanning. ExportVisor coordinates with certified local wet blue producers in Bangladesh, assisting international tanners who perform their own proprietary re-tanning, dyeing, and finishing operations.",
    lowPrice: "0.95",
    highPrice: "1.85",
    offerCount: "10000",
    image: "/assets/products/wet-blue-chrome-full-grain.jpg",
  },
  {
    id: "full-grain-leather",
    articleNumber: "Full Grain Collection",
    name: "Full Grain Leather",
    title: "Full Grain Finished Cow Leather Exporter Bangladesh | Premium Grade",
    description:
      "Export grade authentic Full Grain Cowhide Leather from Bangladesh. Natural unbroken grain pore structure, rich patina, premium footwear and luxury bag grade.",
    keywords:
      "full grain leather bangladesh, full grain cowhide export, premium leather savar, aniline full grain leather, b2b leather manufacturer",
    category: "Finished Leather",
    stage: "Finished",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome & Vegetable Tanned",
    grainType: "Full Grain",
    material: "First-selection Bangladesh bovine cowhide",
    finishes: [
      "Natural Aniline Drum Dye",
      "Light Wax Conditioning",
      "Slightly Protected Semi-Aniline",
      "Natural Grain Mill",
    ],
    thickness: "Customized per Buyer Specification (Tailored to required substance / tech pack)",
    colors: "Classic Tan, Saddle Brown, Chestnut, Black, British Tan",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Subject to raw selection sorting)",
    leadTime: "Scheduled per RFQ & raw hide selection availability",
    applications: [
      "Heritage footwear & work boots",
      "High-end leather jackets",
      "Bespoke briefcases & totes",
      "Architectural leather tiles & luxury sofas",
    ],
    overview:
      "Full grain leather retains the genuine natural grain of the hide with all original markings, breathability, and natural strength. It develops a rich, distinct patina over time and is favored by prestigious global brands crafting heirloom goods, premium footwear, and high-end upholstery.",
    lowPrice: "3.20",
    highPrice: "5.80",
    offerCount: "2500",
    image: "/assets/products/finished-article-03-full-grain-pull-up-chrome.jpg",
  },
  {
    id: "split-leather",
    articleNumber: "Split & Suede Collection",
    name: "Split Leather (Suede & Drop Split)",
    title: "Split Leather & Suede Exporter Bangladesh | Work Glove & Boot Split",
    description:
      "Wholesale Split Leather, Wet Blue drop splits, and finished cow split suede from Bangladesh. Ideal for work gloves, footwear linings, and industrial accessories.",
    keywords:
      "split leather bangladesh, cow split suede supplier, drop split wet blue, work glove leather export, savar split leather tannery",
    category: "Intermediate Stage",
    stage: "Crust",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome Tanned",
    grainType: "Split / Suede",
    material: "Bangladesh Bovine Drop Split / Wet Blue Split",
    finishes: [
      "Natural Suede Nap (Buffed)",
      "Unfinished Wet Blue Drop Split",
      "Crust Split (Ready to Dye)",
      "Polyurethane Laminated / Bicast",
      "Work-Glove Heavy Flesh Split",
    ],
    thickness: "Customized per Buyer Specification (Split according to customer tech pack)",
    colors: "Natural Grey, Golden Tan, Black, Navy, Brown, or custom dyed",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Economical containerload or tailored batches)",
    leadTime: "Scheduled per RFQ & split inventory availability",
    applications: [
      "Industrial work gloves & safety gear",
      "Casual suede shoes & boot counters",
      "Tool bags & heavy aprons",
      "Footwear linings & tongue reinforcements",
    ],
    overview:
      "Split leather is created when a thick raw or wet blue bovine hide is split horizontally. The lower cut (corium layer) lacks the natural grain but offers remarkable fibrous density, tear strength, and cost efficiency. It is universally specified for safety boots, work gloves, soft suede jackets, and coated bicast leather.",
    lowPrice: "0.85",
    highPrice: "1.90",
    offerCount: "8000",
    image: "/assets/products/crust-article-05-suede-chrome.jpg",
  },
  {
    id: "top-grain-leather",
    articleNumber: "Top Grain Collection",
    name: "Top Grain Leather",
    title: "Top Grain Cowhide Leather Supplier Bangladesh | Uniform Finish",
    description:
      "Export top grain bovine leather from Bangladesh. Lightly buffed for flawless consistency, stain resistance, and high yield in commercial footwear & furniture.",
    keywords:
      "top grain leather bangladesh, cowhide top grain supplier, commercial leather upholstery, top grain footwear leather, savar tannery",
    category: "Finished Leather",
    stage: "Finished",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome Tanned",
    grainType: "Top Grain",
    material: "Selected Bangladesh cowhide / steer",
    finishes: [
      "Semi-Pigmented",
      "Micro-Pigment Glaze",
      "Silky Matte Topcoat",
      "Mild Grain Print",
    ],
    thickness: "Customized per Buyer Specification (Calibrated to buyer target substance)",
    colors: "Extensive custom color matching to physical swatches",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Aligned with buyer production run)",
    leadTime: "Scheduled per RFQ & production program",
    applications: [
      "Commercial contract furniture",
      "Fashion footwear & sneakers",
      "Wallets, belts, & tech sleeves",
      "Hospitality upholstery",
    ],
    overview:
      "Top grain leather features the upper layer of the hide with minor surface variations smoothed out through micro-buffing and subtle finish coats. It offers an optimal balance between genuine leather luxury and commercial consistency, making it ideal for large-scale footwear and upholstery programs.",
    lowPrice: "2.40",
    highPrice: "4.20",
    offerCount: "4000",
    image: "/assets/products/finished-article-08-top-grain-pigmented-chrome.jpg",
  },
  {
    id: "corrected-grain-leather",
    articleNumber: "Corrected Grain Collection",
    name: "Corrected Grain Leather",
    title: "Corrected Grain & Embossed Leather Exporter Bangladesh | Saffiano & Haircell",
    description:
      "Source embossed corrected grain cowhide leather from Savar, Bangladesh. Saffiano, Haircell, and Pebble prints with high abrasion resistance.",
    keywords:
      "corrected grain leather, saffiano leather bangladesh, embossed cow leather export, pebble grain leather supplier, industrial footwear leather",
    category: "Finished Leather",
    stage: "Finished",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome Tanned",
    grainType: "Corrected Grain",
    material: "Bangladesh Bovine Hide",
    finishes: [
      "Saffiano Embossed",
      "Haircell Print",
      "Heavy Pebble Print",
      "Pigmented High-Durability Finish",
    ],
    thickness: "Customized per Buyer Specification (Calibrated per buyer requirement)",
    colors: "Unlimited solid colors, high color fastness",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Based on embossing tooling & volume)",
    leadTime: "Scheduled per RFQ & order specifications",
    applications: [
      "Institutional and safety footwear",
      "Uniform belts & accessories",
      "Heavy duty travel bags",
      "Commercial seating",
    ],
    overview:
      "Corrected grain leather undergoes careful surface conditioning, followed by the application of an artificial grain pattern (such as Saffiano, Haircell, or Pebble) via heated hydraulic or continuous embossing rollers. It is engineered for industrial consistency and exceptional yield efficiency.",
    lowPrice: "1.90",
    highPrice: "3.40",
    offerCount: "4500",
    image: "/assets/products/finished-article-12-corrected-grain-embossed-chrome.jpg",
  },
  {
    id: "aniline-semi-aniline",
    articleNumber: "Aniline Collection",
    name: "Aniline & Semi-Aniline Leather",
    title: "Aniline & Semi-Aniline Leather Exporter Bangladesh | Luxury Drum Dyed",
    description:
      "Premium transparent drum-dyed Aniline and Semi-Aniline leather from Bangladesh. Luxurious natural hand feel, breathability, and rich earthy colors.",
    keywords:
      "aniline leather bangladesh, semi aniline cowhide, drum dyed leather roll, luxury bag leather supplier, soft hand feel leather export",
    category: "Specialty Finish",
    stage: "Finished",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome & Veg Tanned",
    grainType: "Full Grain",
    material: "Top tier selected Bangladesh Cowhide",
    finishes: [
      "Pure Aniline Natural Hand",
      "Semi-Aniline Protective Mist",
      "Warm Wax Burnish",
      "Soft Hand Milling",
    ],
    thickness: "Customized per Buyer Specification (Calibrated to buyer target substance)",
    colors: "Rich earthy tones: Cognac, Dark Chocolate, Burgundy, Olive, Charcoal",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Subject to raw hide selection availability)",
    leadTime: "Scheduled per RFQ & hide sorting schedule",
    applications: [
      "Designer luxury furniture",
      "Handcrafted artisan footwear",
      "High-end leather jackets",
      "Fine leather goods",
    ],
    overview:
      "Aniline leather is dyed exclusively with soluble dyes without covering the surface with opaque topcoats, preserving the organic authenticity and warmth of the hide. Semi-aniline introduces an ultra-thin transparent protective veil to enhance soil resistance while maintaining exceptional tactile softness.",
    lowPrice: "3.40",
    highPrice: "6.20",
    offerCount: "2000",
    image: "/assets/products/finished-article-02-full-grain-semi-aniline-chrome.jpg",
  },
  {
    id: "pigmented-leather",
    articleNumber: "Pigmented Collection",
    name: "Pigmented & Coated Leather",
    title: "Pigmented Leather Supplier Bangladesh | High Durability & Easy Clean",
    description:
      "Export-grade pigmented cowhide leather from Bangladesh. Extreme stain resistance, lightfastness, and uniform color matching for contract seating and footwear.",
    keywords:
      "pigmented leather bangladesh, coated leather supplier, automotive leather upholstery, contract furniture leather, high wear leather export",
    category: "Finished Leather",
    stage: "Finished",
    animal: "Cow / Bovine",
    tanningMethod: "Chrome Tanned",
    grainType: "Corrected & Top Grain",
    material: "Bovine / Cowhide",
    finishes: [
      "Full Pigmented Matte",
      "High Gloss Patent / Glaze",
      "Polyurethane Protective Shield",
      "Easy-Clean Soil Resistant",
    ],
    thickness: "Customized per Buyer Specification (Tailored to buyer target substance)",
    colors: "Exact Pantone matching; solid whites, vivid colors, and darks",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Tailored to buyer batch size)",
    leadTime: "Scheduled per RFQ & batch requirements",
    applications: [
      "Mass production footwear",
      "Public transportation & commercial seating",
      "School & hospital furniture",
      "Protective leather gear",
    ],
    overview:
      "Pigmented leather is finished with a pigment dispersion and polyurethane or acrylic topcoat that seals the surface. This ensures maximum protection against sunlight, stains, and scuffing, making it the preferred solution for heavy-traffic public spaces, mass-market footwear, and automotive interiors.",
    lowPrice: "1.80",
    highPrice: "3.10",
    offerCount: "6000",
    image: "/assets/products/finished-article-11-corrected-grain-pigmented-chrome.jpg",
  },
  {
    id: "buyer-custom-sourcing",
    articleNumber: "Custom Specification",
    name: "Buyer-Specified Custom Leather",
    title: "Custom Leather Sourcing & Counter Sample Development Bangladesh",
    description:
      "Bespoke leather development tailored to your exact physical sample, thickness, and color. Counter-samples and lab dip testing from Savar tanneries.",
    keywords:
      "custom leather sourcing bangladesh, leather counter sample development, oem leather development, bespoke tannery sourcing, savar leather lab dips",
    category: "Specialty Finish",
    stage: "Finished",
    animal: "Cow, Buffalo & Goat",
    tanningMethod: "Custom per Tech Pack",
    grainType: "Custom Swatch Match",
    material: "Bovine / Buffalo / Goat based on buyer requirement",
    finishes: [
      "Developed to match physical buyer swatch",
      "Vegetable / Chrome / Semi-Vegetable hybrid",
      "Waterproof / Oil-tanned / Crazy Horse",
      "Custom embossed or printed textures",
    ],
    thickness: "Customized per Buyer Specification (Tailored to required substance / tech pack)",
    colors: "Laboratory color recipe matching to physical swatch or Pantone TCX",
    origin: "Savar Tannery Industrial Estate, Bangladesh",
    moq: "Determined upon RFQ (Subject to custom development scope)",
    leadTime: "Scheduled per RFQ & counter-sample approval",
    applications: [
      "OEM / ODM footwear collections",
      "International brand collections",
      "Industrial safety products",
      "Architectural and interior projects",
    ],
    overview:
      "When standard catalogue specifications do not align with your product development requirements, ExportVisor coordinates custom development with suitable tannery partners in Bangladesh. We manage counter-sample development, lab dip approvals, and technical verification to replicate your desired hand feel, temper, and finish.",
    lowPrice: "1.75",
    highPrice: "5.50",
    offerCount: "2000",
    image: "/assets/products/bespoke-custom-leather-development.jpg",
  },
];

// Canonical Section Pages (Zero duplicate aliases; aliases handled by 301 redirects in vercel.json)
const SECTION_ROUTES = [
  {
    path: "about",
    title: "About ExportVisor | Tannery Export Desk & Manufacturing Operations",
    description:
      "ExportVisor operates as the dedicated international export desk for premier leather tanneries in Savar, Dhaka, handling direct factory gate exports, pre-shipment quality inspection, and maritime shipping.",
    heading: "ExportVisor Direct Tannery Export Desk",
    lead: "Connecting global leather buyers and footwear brands directly with certified, export-grade tanneries in Savar, Dhaka.",
  },
  {
    path: "products",
    title: "Leather Sourcing Catalogue | Wet Blue, Crust & Finished Leather | ExportVisor",
    description:
      "Source export-grade genuine leather from Bangladesh: Full Grain, Top Grain, Corrected Grain, Drum Dyed Crust, and Wet Blue bovine and goat hides tailored to buyer specifications.",
    heading: "Export Leather Products & Specifications Catalogue",
    lead: "Explore all verified Wet Blue, Crust, and Finished leather articles sourced from LWG-audited tanneries in Savar, Dhaka.",
  },
  {
    path: "glossary",
    title: "Leather Sourcing Glossary & Industry Terminology | ExportVisor",
    description:
      "Definitive guide defining Wet Blue, Crust Leather, Full Grain, Split Leather, Temper, and Caliper standards for international footwear and leather goods buyers.",
    heading: "Comprehensive Leather Sourcing Glossary",
    lead: "Clear technical definitions of international tannery and leather manufacturing terminology for global importers.",
  },
  {
    path: "terms",
    title: "Commercial Terms & Export Standards | ExportVisor",
    description:
      "Transparent RFQ-driven commercial terms: direct factory-floor pricing, custom MOQ evaluation, scheduled production lead times, and secure international payment terms (LC/TT).",
    heading: "Commercial Terms & Export Standards",
    lead: "Factual, RFQ-driven commercial clarity: container minimums, L/C & T/T payment safeguards, sample dispatches, and FOB/CIF shipping terms.",
  },
  {
    path: "knowledge-hub",
    title: "Leather Knowledge Hub & Technical Specifications | ExportVisor",
    description:
      "Technical sourcing guides comparing Wet Blue, Crust, and Finished leather characteristics, grain integrity, substance tolerances, and testing parameters for global buyers.",
    heading: "Technical Leather Knowledge Hub",
    lead: "Engineering guides comparing tensile yield, elongation, temper, drum dyeing recipes, and EU REACH compliance.",
  },
  {
    path: "bangladesh-sourcing",
    title: "Why Source Leather from Bangladesh | Savar Tannery Ecosystem",
    description:
      "Discover the competitive advantages of sourcing leather from Bangladesh: indigenous raw material fiber density, centralized Savar Tannery Industrial Estate, and GSP duty benefits.",
    heading: "Why Source Leather from Bangladesh?",
    lead: "Unique indigenous cowhide fiber density, competitive direct factory pricing, and centralized CETP eco infrastructure in Savar.",
  },
  {
    path: "why-us",
    title: "Why Partner with ExportVisor | Direct Factory Export Desk",
    description:
      "Direct factory-gate pricing, verified tannery floor oversight in Savar, technical specification matching, transparent trade terms, and 100% pre-shipment inspection for global buyers.",
    heading: "Why Partner with ExportVisor?",
    lead: "Direct factory gate exports from Savar tanneries with zero middleman markup, rigorous quality oversight, and verified container dispatch.",
  },
  {
    path: "quote",
    title: "Request a Leather Quotation & Direct Sourcing Desk | ExportVisor",
    description:
      "Submit your technical leather tech pack, target thickness, color swatches, or volume requirements for rapid tannery matching, feasibility analysis, and direct pricing.",
    heading: "Request a Direct Factory Quotation",
    lead: "Submit your leather tech pack, target substance, Pantone swatches, and volume requirements for verified Savar tannery quotation within 24 hours.",
  },
  {
    path: "faq",
    title: "Frequently Asked Questions (FAQ) | ExportVisor Leather Sourcing",
    description:
      "Factual answers regarding MOQs, sample development, production lead times, international payment terms (LC/TT), and third-party SGS/Intertek inspection arrangements.",
    heading: "Frequently Asked Procurement Questions",
    lead: "Factual answers on MOQs, counter-sample lab dips, production timelines, international L/C payment, and third-party QA.",
  },
];

// Merge all 83 canonical product entries (10 hub categories + 73 catalogue articles)
let allProductsToGenerate = [...HUB_PRODUCTS];
try {
  const tsContent = fs.readFileSync(path.join(rootDir, "src/data/products.ts"), "utf-8");
  const match = tsContent.match(/export const LEATHER_PRODUCTS: LeatherProduct\[\] = (\[[\s\S]*?\]);\s*$/);
  if (match) {
    const rawList = JSON.parse(match[1]);
    rawList.forEach((p) => {
      const existingIdx = allProductsToGenerate.findIndex((e) => e.id === p.id);
      const articleItem = {
        id: p.id,
        articleNumber: p.articleNumber || `${p.stage || "Export"} · ${p.grainType || "Leather"}`,
        name: p.name,
        b2bDescriptor: formatB2BBuyerDescriptor(p),
        title: getB2BProductTitle(p),
        h1: getB2BProductH1(p),
        description: getB2BProductDescription(p),
        keywords:
          (p.seoKeywords && p.seoKeywords.join(", ")) ||
          `${p.name}, ${p.stage} leather, ${p.animal} leather bangladesh, savar tannery`,
        category: p.category || `${p.stage} Leather`,
        stage: p.stage || "Leather",
        animal: p.animal || "Cow / Bovine",
        tanningMethod: p.tanningMethod || "Tanned",
        grainType: p.grainType || "Selected Grain",
        material: p.materialType || `${p.animal} (${p.tanningMethod})`,
        finishes: p.availableFinishes || [p.finishType || "Standard Export Finish"],
        thickness:
          p.thicknessRange ||
          "Custom Calibrated (0.8–1.0mm, 1.1–1.3mm, 1.4–1.6mm, 1.8–2.2mm+) per buyer tech pack",
        sizeMeasurement: p.sizeMeasurement || "18–26 sq. ft. per full hide",
        availabilityNote:
          p.availabilityNote || "Available — DHL / FedEx counter-samples & swatches (5–7 days)",
        colors: p.colorOptions || "Full Pantone matching per buyer requirement",
        origin: p.origin || "Savar Tannery Industrial Estate, Bangladesh",
        moq: p.moq || "Determined upon RFQ (Tailored trial or container loads)",
        leadTime: p.leadTime || "Scheduled per RFQ & batch requirements",
        applications: p.applications || ["Footwear", "Leather Goods"],
        overview: p.overview || p.shortDescription,
        shortDescription: p.shortDescription || p.overview,
        qualityInspection:
          p.qualityInspection || "100% Piece-by-Piece Electronic Gauge & Visual Inspection",
        lowPrice: p.stage === "Wet Blue" ? "0.95" : p.stage === "Crust" ? "1.65" : "2.10",
        highPrice: p.stage === "Wet Blue" ? "1.95" : p.stage === "Crust" ? "3.40" : "5.20",
        offerCount: "1",
        image: p.image || "/assets/products/crust-article-01-full-grain-chrome.jpg",
      };
      if (existingIdx >= 0) {
        allProductsToGenerate[existingIdx] = {
          ...allProductsToGenerate[existingIdx],
          ...articleItem,
          image: p.image || allProductsToGenerate[existingIdx].image,
        };
      } else {
        allProductsToGenerate.push(articleItem);
      }
    });
  }
} catch (e) {
  console.error("Could not parse products.ts, falling back to hub products:", e);
}

// Normalize HUB_PRODUCTS so every generated hub page also follows B2B title/H1/description & clean offer structure
allProductsToGenerate = allProductsToGenerate.map((item) => ({
  ...item,
  b2bDescriptor: item.b2bDescriptor || formatB2BBuyerDescriptor(item),
  title: item.h1 ? item.title : getB2BProductTitle(item),
  h1: item.h1 || getB2BProductH1(item),
  description: item.h1 ? item.description : getB2BProductDescription(item),
  sizeMeasurement: item.sizeMeasurement || "18–26 sq. ft. per full hide",
  availabilityNote:
    item.availabilityNote || "Available — DHL / FedEx counter-samples & swatches (5–7 days)",
  offerCount: "1",
}));

function generateHtmlForRoute({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage = "https://exportvisor.com/og-image.jpg",
  jsonLd,
  prerenderedHtml = "",
}) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeUrl = escapeHtml(canonicalUrl);
  const safeImg = escapeHtml(ogImage);

  let html = baseHtml
    .replace(/<title>.*?<\/title>/gi, `<title>${safeTitle}</title>`)
    .replace(/<meta name="title" content=".*?" \/>/gi, `<meta name="title" content="${safeTitle}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${safeTitle}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/gi, `<meta name="twitter:title" content="${safeTitle}" />`)
    .replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${safeDesc}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${safeDesc}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/gi, `<meta name="twitter:description" content="${safeDesc}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/gi, `<link rel="canonical" href="${safeUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/gi, `<meta property="og:url" content="${safeUrl}" />`)
    .replace(/<meta name="twitter:url" content=".*?" \/>/gi, `<meta name="twitter:url" content="${safeUrl}" />`)
    .replace(/<meta property="og:type" content=".*?" \/>/gi, `<meta property="og:type" content="${ogType}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/gi, `<meta property="og:image" content="${safeImg}" />`)
    .replace(/<meta property="og:image:secure_url" content=".*?" \/>/gi, `<meta property="og:image:secure_url" content="${safeImg}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/gi, `<meta name="twitter:image" content="${safeImg}" />`);

  if (keywords) {
    const safeKw = escapeHtml(keywords);
    if (html.includes('meta name="keywords"')) {
      html = html.replace(/<meta name="keywords" content=".*?" \/>/gi, `<meta name="keywords" content="${safeKw}" />`);
    } else {
      html = html.replace("</head>", `  <meta name="keywords" content="${safeKw}" />\n  </head>`);
    }
  }

  if (jsonLd) {
    const jsonLdString = typeof jsonLd === "string" ? jsonLd : JSON.stringify(jsonLd);
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json" id="route-schema-jsonld">${jsonLdString}</script>\n  </head>`
    );
  }

  if (prerenderedHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedHtml}</div>`);
  }

  return html;
}

// Reusable semantic product directory HTML for crawlers on / and /products
function buildProductDirectoryHtml(limit = allProductsToGenerate.length) {
  return allProductsToGenerate
    .slice(0, limit)
    .map((p) => {
      const thumbUrl = toThumbWebp(p.image);
      return `<article style="border:1px solid #e7e5e4;border-radius:12px;overflow:hidden;background:#fff;">
        <a href="/product/${escapeHtml(p.id)}" style="text-decoration:none;color:inherit;display:block;">
          <img src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(p.name)} — ${escapeHtml(p.tanningMethod || p.category)} Leather Bangladesh" width="480" height="360" loading="lazy" style="width:100%;height:auto;display:block;object-fit:cover;" />
          <div style="padding:14px;">
            <div style="font-size:12px;color:#8c6214;font-weight:700;">${escapeHtml(p.articleNumber || p.id)} · ${escapeHtml(p.stage || p.category)}</div>
            <h3 style="font-size:16px;font-weight:700;margin:6px 0;color:#1c1712;">${escapeHtml(p.name)}</h3>
            <p style="font-size:13px;color:#57534e;margin:0;line-height:1.5;">${escapeHtml(p.description)}</p>
          </div>
        </a>
      </article>`;
    })
    .join("\n");
}

console.log(`Starting Static Multi-Page SEO Generation for Vercel (${allProductsToGenerate.length} products)...`);

let generatedCount = 0;

// 0. Enrich dist/index.html with complete semantic crawlable HTML + full 83-product catalogue index for Googlebot/Bingbot
const homepageCatalogueHtml = `
<div style="font-family:system-ui,-apple-system,sans-serif;max-width:1200px;margin:0 auto;padding:24px;color:#1c1712;">
  <header style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e7e5e4;padding-bottom:16px;margin-bottom:24px;">
    <a href="/" style="font-size:22px;font-weight:800;color:#1c1712;text-decoration:none;">ExportVisor</a>
    <nav style="display:flex;gap:16px;flex-wrap:wrap;font-size:14px;">
      <a href="/about">About</a>
      <a href="/products">Leather Catalogue</a>
      <a href="/terms">Commercial Terms</a>
      <a href="/knowledge-hub">Knowledge Hub</a>
      <a href="/glossary">Glossary</a>
      <a href="/bangladesh-sourcing">Bangladesh Advantage</a>
      <a href="/quote">Request Sample / Get Quote</a>
      <a href="/faq">FAQ</a>
    </nav>
  </header>
  <main>
    <section style="margin-bottom:32px;">
      <h1 style="font-size:36px;font-weight:800;margin:0 0 12px;">Your Trusted Leather Sourcing Partner from Bangladesh</h1>
      <p style="font-size:18px;color:#44403c;line-height:1.6;">Direct B2B Tannery Export Desk in Savar, Dhaka. Supplying certified Wet Blue, Crust, and Finished Cowhide, Goat, and Buffalo leather with 100% pre-shipment quality inspection and global maritime shipping from Chattogram Sea Port (BDCGP).</p>
      <div style="margin-top:16px;display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/quote" style="background:#c89d43;color:#0c0a09;font-weight:700;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;">Request Sample / Get Quote</a>
        <a href="/products" style="border:1px solid #d6d3d1;color:#1c1712;font-weight:600;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;">Explore Leather Catalogue</a>
      </div>
    </section>
    <section>
      <h2 style="font-size:26px;font-weight:700;margin-bottom:16px;">Complete Bangladesh Leather Export Catalogue (${allProductsToGenerate.length} Articles)</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">
        ${buildProductDirectoryHtml()}
      </div>
    </section>
  </main>
</div>`;

const enrichedIndexHtml = baseHtml.replace(
  '<div id="root"></div>',
  `<div id="root">${homepageCatalogueHtml}</div>`
);
fs.writeFileSync(indexPath, enrichedIndexHtml, "utf-8");
console.log("✓ Enriched dist/index.html with crawlable homepage & full product links");

// 1. Generate Flat .html Section Pages in dist/ (NO nested index.html folders so Vercel cleanUrls serves 200 OK with ZERO 308 redirects!)
SECTION_ROUTES.forEach((route) => {
  const cleanRoutePath = route.path.replace(/^\/+|\/+$/g, "");
  const canonicalUrl = cleanRoutePath ? `https://exportvisor.com/${cleanRoutePath}` : "https://exportvisor.com/";
  const isProductsPage = cleanRoutePath === "products";
  const isKnowledgeHubPage = cleanRoutePath === "knowledge-hub";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://exportvisor.com/" },
      { "@type": "ListItem", position: 2, name: route.heading, item: canonicalUrl },
    ],
  };

  const prerenderedHtml = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:1200px;margin:0 auto;padding:2.5rem 1.25rem;color:#1c1712;">
      <nav style="font-size:0.875rem;margin-bottom:1.5rem;color:#78716c;">
        <a href="/" style="color:#c89d43;text-decoration:none;font-weight:600;">Home</a> &gt;
        <span style="color:#1c1917;font-weight:500;">${escapeHtml(route.heading)}</span>
      </nav>
      <header style="margin-bottom:2rem;">
        <h1 style="font-size:2.25rem;font-weight:800;color:#1c1917;margin-bottom:0.75rem;">${escapeHtml(route.heading)}</h1>
        <p style="font-size:1.15rem;color:#57534e;line-height:1.6;max-width:850px;">${escapeHtml(route.lead)}</p>
      </header>
      <section style="background:#ffffff;border:1px solid #e7e5e4;border-radius:12px;padding:1.75rem;margin-bottom:2rem;">
        <p style="font-size:1rem;line-height:1.7;color:#44403c;">${escapeHtml(route.description)}</p>
        <div style="margin-top:1.25rem;display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/quote" style="background:#c89d43;color:#0c0a09;font-weight:700;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;">Request Sample / Get Quote</a>
          <a href="/products" style="background:#1c1917;color:#ffffff;font-weight:700;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;">Browse Full Leather Catalogue</a>
        </div>
      </section>
      ${
        isKnowledgeHubPage
          ? `<section style="margin-bottom:2rem;"><h2 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem;">Wet Blue, Crust &amp; Finished Leather Sourcing Guides</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">${KNOWLEDGE_HUB_ARTICLES.map(
              (art) =>
                `<article style="border:1px solid #e7e5e4;border-radius:12px;padding:1.25rem;background:#fff;"><div style="font-size:11px;font-weight:700;color:#8c6214;text-transform:uppercase;">${escapeHtml(art.category)}</div><h3 style="font-size:1.1rem;font-weight:700;margin:6px 0 8px;">${escapeHtml(art.title)}</h3><p style="font-size:0.9rem;color:#44403c;line-height:1.55;margin:0 0 12px;">${escapeHtml(art.summary)}</p><div style="display:flex;flex-direction:column;gap:6px;">${art.links
                  .map(
                    (lnk) =>
                      `<a href="/product/${escapeHtml(lnk.id)}" style="font-size:0.85rem;font-weight:600;color:#8c6214;text-decoration:underline;">${escapeHtml(lnk.label)} →</a>`
                  )
                  .join("")}</div></article>`
            ).join("")}</div></section>`
          : ""
      }
      ${
        isProductsPage
          ? `<section><h2 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem;">All Verified Savar Leather Articles</h2><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">${buildProductDirectoryHtml()}</div></section>`
          : ""
      }
    </div>
  `;

  const html = generateHtmlForRoute({
    title: route.title,
    description: route.description,
    canonicalUrl,
    jsonLd: breadcrumbSchema,
    prerenderedHtml,
  });

  // Flat dist/<route>.html -> served by Vercel cleanUrls at /<route> with HTTP 200 OK & ZERO redirect!
  fs.writeFileSync(path.join(distDir, `${route.path}.html`), html, "utf-8");
  console.log(`✓ Generated flat route: dist/${route.path}.html -> /${route.path}`);
  generatedCount++;
});

// 2. Generate Flat .html Individual Product Pages in dist/product/<id>.html
const distProductDir = path.join(distDir, "product");
fs.mkdirSync(distProductDir, { recursive: true });

allProductsToGenerate.forEach((product, idx) => {
  const primaryPath = `product/${product.id}`;
  const canonicalUrl = `https://exportvisor.com/${primaryPath}`;
  const absJpg = toAbsJpg(product.image);
  const abs4kWebp = to4kWebp(product.image);

  // Pick 6 related articles for strong internal crawl graph
  const related = [1, 2, 3, 4, 5, 6]
    .map((offset) => allProductsToGenerate[(idx + offset) % allProductsToGenerate.length])
    .filter((r) => r && r.id !== product.id);

  const productGraphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://exportvisor.com/" },
          { "@type": "ListItem", position: 2, name: "Leather Catalogue", item: "https://exportvisor.com/products" },
          { "@type": "ListItem", position: 3, name: product.name, item: canonicalUrl },
        ],
      },
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        url: canonicalUrl,
        name: product.b2bDescriptor,
        alternateName: product.title,
        description: product.description,
        image: Array.from(new Set([absJpg, abs4kWebp])),
        sku: `EV-${product.id.toUpperCase()}`,
        mpn: `BD-LTR-${product.id.toUpperCase()}`,
        category: `${product.stage || product.category} Leather`,
        material: `${product.material} (${product.animal} · ${product.tanningMethod || "Standard Tannage"})`,
        color: product.colors,
        pattern: product.finishes.join(", "),
        countryOfOrigin: { "@type": "Country", name: "Bangladesh" },
        brand: {
          "@type": "Brand",
          name: "ExportVisor",
          logo: "https://exportvisor.com/Logo3_4.png",
        },
        manufacturer: {
          "@type": "Organization",
          "@id": "https://exportvisor.com/#organization",
          name: "ExportVisor Tannery Export Desk & Manufacturing Operations",
          url: "https://exportvisor.com",
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Leather Type", value: `${product.stage || product.category} ${product.grainType || ""} — ${product.name}`.trim() },
          { "@type": "PropertyValue", name: "Raw Material", value: product.animal || "Cow / Buffalo" },
          { "@type": "PropertyValue", name: "Tannage", value: product.tanningMethod || "Chrome / Vegetable" },
          { "@type": "PropertyValue", name: "Thickness (mm)", value: product.thickness },
          { "@type": "PropertyValue", name: "Average Size (sq. ft.)", value: product.sizeMeasurement },
          { "@type": "PropertyValue", name: "MOQ", value: product.moq },
          { "@type": "PropertyValue", name: "Sample Availability", value: product.availabilityNote },
          { "@type": "PropertyValue", name: "Lead Time", value: product.leadTime },
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: product.lowPrice,
          highPrice: product.highPrice,
          offerCount: 1,
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          url: canonicalUrl,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "USD",
            unitText: "SQFT",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitCode: "FTK",
            },
          },
          seller: { "@type": "Organization", name: "ExportVisor", url: "https://exportvisor.com" },
        },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "B2B Leather Importers, Footwear Brands, Handbag & Upholstery Manufacturers",
        },
      },
    ],
  };

  const prerenderedHtml = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:1200px;margin:0 auto;padding:2rem 1.25rem;color:#1c1712;">
      <nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1.5rem;color:#78716c;">
        <a href="/" style="color:#c89d43;text-decoration:none;font-weight:600;">Home</a> &gt;
        <a href="/products" style="color:#c89d43;text-decoration:none;font-weight:600;">Leather Catalogue</a> &gt;
        <span style="color:#1c1917;font-weight:600;">${escapeHtml(product.name)}</span>
      </nav>
      <article>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;align-items:start;margin-bottom:2rem;">
          <figure style="margin:0;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden;background:#faf8f5;">
            <img src="${escapeHtml(absJpg)}" alt="${escapeHtml(product.b2bDescriptor)} — Export-Grade Bangladesh Leather" width="1200" height="900" loading="eager" style="width:100%;height:auto;display:block;" />
            <figcaption style="padding:10px 14px;font-size:12px;color:#57534e;background:#fff;border-top:1px solid #e7e5e4;">
              ${escapeHtml(product.b2bDescriptor)} · ${escapeHtml(product.tanningMethod || product.category)} · Origin: ${escapeHtml(product.origin)}
            </figcaption>
          </figure>
          <header>
            <div style="font-size:12px;font-weight:700;color:#8c6214;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">
              ${escapeHtml(product.stage || "Export")} Leather · Savar Tannery, Bangladesh
            </div>
            <h1 style="font-size:2rem;font-weight:800;margin:0 0 12px;color:#1c1712;line-height:1.18;">${escapeHtml(product.h1)}</h1>
            <p style="font-size:1.05rem;color:#44403c;line-height:1.65;margin:0 0 18px;">${escapeHtml(product.overview)}</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a href="/quote?product=${encodeURIComponent(product.name)}" style="background:#c89d43;color:#0c0a09;padding:0.85rem 1.5rem;border-radius:8px;font-weight:700;text-decoration:none;">Request Sample / Get Quote</a>
              <a href="/products" style="background:#faf8f5;color:#1c1712;border:1px solid #d6d3d1;padding:0.85rem 1.5rem;border-radius:8px;font-weight:600;text-decoration:none;">View All Leather Grades</a>
            </div>
          </header>
        </div>

        <section style="margin-bottom:2rem;background:#fafaf9;padding:1.5rem;border-radius:12px;border:1px solid #e7e5e4;overflow-x:auto;">
          <h2 style="font-size:1.15rem;font-weight:700;color:#855d14;margin:0 0 1rem;">B2B Export Technical Specification Table</h2>
          <table style="width:100%;border-collapse:collapse;font-size:0.95rem;text-align:left;background:#fff;border:1px solid #e7e5e4;">
            <thead>
              <tr style="background:#f5f5f4;border-bottom:1px solid #e7e5e4;">
                <th scope="col" style="padding:10px 14px;color:#78716c;width:34%;">Specification Parameter</th>
                <th scope="col" style="padding:10px 14px;color:#1c1712;">Tannery Export Standard</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">Leather Type</th>
                <td style="padding:10px 14px;font-weight:600;">${escapeHtml(product.stage || product.category)} ${escapeHtml(product.grainType || "")} — ${escapeHtml(product.name)}</td>
              </tr>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">Raw Material (Cow/Buff)</th>
                <td style="padding:10px 14px;">${escapeHtml(product.animal || "Cow")} · ${escapeHtml(product.material)}</td>
              </tr>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">Tannage (Chrome/Veg)</th>
                <td style="padding:10px 14px;">${escapeHtml(product.tanningMethod || "Chrome / Vegetable Tanned")}</td>
              </tr>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">Thickness (mm)</th>
                <td style="padding:10px 14px;font-weight:600;">${escapeHtml(product.thickness)}</td>
              </tr>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">Average Size (sq. ft.)</th>
                <td style="padding:10px 14px;">${escapeHtml(product.sizeMeasurement)}</td>
              </tr>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">MOQ</th>
                <td style="padding:10px 14px;">${escapeHtml(product.moq)}</td>
              </tr>
              <tr style="border-bottom:1px solid #e7e5e4;">
                <th scope="row" style="padding:10px 14px;color:#44403c;">Sample Availability</th>
                <td style="padding:10px 14px;color:#065f46;font-weight:600;">${escapeHtml(product.availabilityNote)}</td>
              </tr>
              <tr>
                <th scope="row" style="padding:10px 14px;color:#44403c;">Lead Time</th>
                <td style="padding:10px 14px;">${escapeHtml(product.leadTime)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style="margin-bottom:2rem;">
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.75rem;">Manufacturing Applications &amp; Finishes</h2>
          <p style="font-size:0.95rem;color:#44403c;margin-bottom:0.75rem;"><strong>Available Finishes:</strong> ${escapeHtml(product.finishes.join(", "))} · <strong>Colors:</strong> ${escapeHtml(product.colors)}</p>
          <ul style="padding-left:1.25rem;line-height:1.8;color:#44403c;">
            ${product.applications.map((app) => `<li>${escapeHtml(app)}</li>`).join("")}
          </ul>
        </section>

        <section style="border-top:1px solid #e7e5e4;padding-top:1.5rem;">
          <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;">Related Bangladesh Export Leather Products</h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${related
              .map(
                (r) =>
                  `<a href="/product/${escapeHtml(r.id)}" style="padding:8px 14px;border:1px solid #e7e5e4;border-radius:8px;text-decoration:none;color:#1c1712;font-size:13px;background:#fff;">${escapeHtml(r.b2bDescriptor || r.name)}</a>`
              )
              .join("")}
          </div>
        </section>
      </article>
    </div>
  `;

  const html = generateHtmlForRoute({
    title: product.title,
    description: product.description,
    keywords: product.keywords,
    canonicalUrl,
    ogType: "product",
    ogImage: absJpg,
    jsonLd: productGraphJsonLd,
    prerenderedHtml,
  });

  // Flat dist/product/<id>.html -> Vercel cleanUrls serves /product/<id> directly at HTTP 200 (ZERO redirect!)
  fs.writeFileSync(path.join(distProductDir, `${product.id}.html`), html, "utf-8");
  generatedCount++;
});

console.log(`✓ Generated ${allProductsToGenerate.length} flat product HTML pages in dist/product/*.html`);

// Disable Jekyll on static hosts
fs.writeFileSync(path.join(distDir, ".nojekyll"), "# Disable Jekyll processing\n", "utf-8");

// 3. Generate Complete Image-Rich sitemap.xml for Google, Bing, Yahoo, DuckDuckGo & Yandex
const today = new Date().toISOString().split("T")[0];
const sectionSitemapEntries = [
  { loc: "https://exportvisor.com/", changefreq: "weekly", priority: "1.0", img: "https://exportvisor.com/og-image.jpg", imgTitle: "ExportVisor Bangladesh Leather Export & Tannery Desk" },
  { loc: "https://exportvisor.com/about", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/products", changefreq: "weekly", priority: "0.95", img: "https://exportvisor.com/assets/products/crust-article-01-full-grain-chrome.jpg", imgTitle: "ExportVisor Bangladesh Leather Catalogue" },
  { loc: "https://exportvisor.com/glossary", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/terms", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/knowledge-hub", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/bangladesh-sourcing", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/why-us", changefreq: "monthly", priority: "0.80" },
  { loc: "https://exportvisor.com/quote", changefreq: "weekly", priority: "0.95" },
  { loc: "https://exportvisor.com/faq", changefreq: "monthly", priority: "0.75" },
];

const productSitemapEntries = allProductsToGenerate.map((p) => ({
  loc: `https://exportvisor.com/product/${p.id}`,
  changefreq: "weekly",
  priority: "0.90",
  img: toAbsJpg(p.image),
  imgTitle: `${p.b2bDescriptor || p.name} — Bangladesh Export Leather`,
  imgCaption: p.description,
}));

const allSitemapUrls = [...sectionSitemapEntries, ...productSitemapEntries];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allSitemapUrls
  .map((u) => {
    const imgXml = u.img
      ? `\n    <image:image>\n      <image:loc>${escapeHtml(u.img)}</image:loc>\n      <image:title>${escapeHtml(u.imgTitle || "")}</image:title>${u.imgCaption ? `\n      <image:caption>${escapeHtml(u.imgCaption)}</image:caption>` : ""}\n    </image:image>`
      : "";
    return `  <url>
    <loc>${escapeHtml(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${imgXml}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf-8");
console.log(`✓ Generated Google & Bing Image Sitemap with ${allSitemapUrls.length} canonical URLs!`);
console.log(`\n🎉 Successfully generated ${generatedCount} flat HTML routes with ZERO directory redirects!`);
