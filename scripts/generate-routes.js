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

// Product benchmarks and details for rich SEO & Schema.org Product markup
const PRODUCTS = [
  {
    id: "crust-leather",
    name: "Crust Leather",
    title: "Crust Leather Supplier & Exporter Bangladesh | Savar Tannery",
    description: "Source high-grade Cow, Buffalo & Goat Crust Leather from Bangladesh tanneries. Natural milling, drum-dyed or vegetable tanned crust for footwear and leather goods.",
    keywords: "crust leather bangladesh, cow crust leather supplier, drum dyed crust savar, leather tannery bangladesh, wholesale crust leather b2b",
    category: "Intermediate Stage",
    material: "Bovine / Cowhide / Buffalo / Goat based on buyer specification",
    finishes: ["Natural Milling Crust", "Full Chrome Tanned", "Chrome-Free / Vegetable Tanned", "Buffed / Snuffed Surface", "Drum Dyed / Undyed"],
    thickness: "Customized per Buyer Specification (Tailored to required substance / tech pack)",
    colors: "Natural, Beige, Black, Brown, or custom drum-dyed shades",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Container loads or tailored lots)",
    leadTime: "Scheduled per RFQ & batch requirements",
    applications: ["Footwear uppers & linings", "Leather goods & handbags", "Belts & small leather goods", "Furniture upholstery base"],
    overview: "Crust leather represents an intermediate state after tanning, shaving, and re-tanning/fatliquoring, where moisture has been removed. It offers international manufacturers and finishing tanneries maximum flexibility to apply custom colors, waxes, oils, milling, or embossing according to their own seasonal collections.",
    lowPrice: "1.65",
    highPrice: "3.20",
    offerCount: "5000",
  },
  {
    id: "finished-leather",
    name: "Finished Leather",
    title: "Finished Cow Leather Exporter Bangladesh | Factory Sourcing",
    description: "Export-grade finished cowhide leather from Bangladesh. Automated spray finish, milled grain, pull-up, glazed finishes tailored for footwear and upholstery.",
    keywords: "finished leather exporter, bangladesh finished cow leather, aniline leather roll, footwear upper leather wholesale, savar leather finishing",
    category: "Finished Leather",
    material: "Cowhide / Bovine (Full Grain, Top Grain, or Corrected Grain)",
    finishes: ["Smooth Matte Finish", "Semi-Gloss / Glazed", "Milled Pebble Grain", "Pull-Up Oil & Wax", "Water-Resistant Coating"],
    thickness: "Customized per Buyer Specification (Calibrated to buyer target substance)",
    colors: "Full Pantone matching (Black, Cognac, Tan, Navy, Espresso, etc.)",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Subject to color split & finishing requirements)",
    leadTime: "Scheduled per RFQ & production program",
    applications: ["Formal & casual dress shoes", "Athletic & lifestyle footwear", "Luxury luggage & briefcases", "Executive office & automotive upholstery"],
    overview: "Finished leather has undergone the complete cycle of coloration, protective topcoats, mechanical softening, and grain regulation. Sourced from partner tanneries with automated spray lines and roller coating systems, it is tailored for volume buyers requiring dependable physical durability and aesthetic uniformity.",
    lowPrice: "2.10",
    highPrice: "4.50",
    offerCount: "3000",
  },
  {
    id: "wet-blue-leather",
    name: "Wet Blue Leather",
    title: "Wet Blue Leather Hides Exporter Bangladesh | Cow & Goat Hides",
    description: "Export certified chrome tanned Wet Blue Cow, Buffalo and Goat hides from Bangladesh. High substance yield, machine fleshed, container load shipping.",
    keywords: "wet blue cow hides, wet blue leather bangladesh, wet blue export savar, raw hide chrome tanned, wet blue splits supplier",
    category: "Semi-Processed",
    material: "Cow / Buffalo / Goat Wet Blue Hides & Splits",
    finishes: ["Full Substance Unsplit", "Drop Split / Grain Split", "Machine-Fleshed & Trimmed", "Evenly Wringed"],
    thickness: "Substance graded per raw weight category (Light, Medium, Heavy)",
    colors: "Characteristic Chrome Tanned Pale Cyan Blue",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Container loads or tailored lots)",
    leadTime: "Scheduled per RFQ & wet blue inventory sorting",
    applications: ["International re-tanning mills", "Automotive leather processing", "Heavy work boot leather manufacture", "Split suede production"],
    overview: "Wet Blue represents raw hides immediately after unhairing, liming, deliming, bating, pickling, and primary chrome tanning. ExportVisor coordinates with certified local wet blue producers in Bangladesh, assisting international tanners who perform their own proprietary re-tanning, dyeing, and finishing operations.",
    lowPrice: "0.95",
    highPrice: "1.85",
    offerCount: "10000",
  },
  {
    id: "full-grain-leather",
    name: "Full Grain Leather",
    title: "Full Grain Finished Cow Leather Exporter Bangladesh | Premium Grade",
    description: "Export grade authentic Full Grain Cowhide Leather from Bangladesh. Natural unbroken grain pore structure, rich patina, premium footwear and luxury bag grade.",
    keywords: "full grain leather bangladesh, full grain cowhide export, premium leather savar, aniline full grain leather, b2b leather manufacturer",
    category: "Finished Leather",
    material: "First-selection Bangladesh bovine cowhide",
    finishes: ["Natural Aniline Drum Dye", "Light Wax Conditioning", "Slightly Protected Semi-Aniline", "Natural Grain Mill"],
    thickness: "Customized per Buyer Specification (Tailored to required substance / tech pack)",
    colors: "Classic Tan, Saddle Brown, Chestnut, Black, British Tan",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Subject to raw selection sorting)",
    leadTime: "Scheduled per RFQ & raw hide selection availability",
    applications: ["Heritage footwear & work boots", "High-end leather jackets", "Bespoke briefcases & totes", "Architectural leather tiles & luxury sofas"],
    overview: "Full grain leather retains the genuine natural grain of the hide with all original markings, breathability, and natural strength. It develops a rich, distinct patina over time and is favored by prestigious global brands crafting heirloom goods, premium footwear, and high-end upholstery.",
    lowPrice: "3.20",
    highPrice: "5.80",
    offerCount: "2500",
  },
  {
    id: "split-leather",
    name: "Split Leather (Suede & Drop Split)",
    title: "Split Leather & Suede Exporter Bangladesh | Work Glove & Boot Split",
    description: "Wholesale Split Leather, Wet Blue drop splits, and finished cow split suede from Bangladesh. Ideal for work gloves, footwear linings, and industrial accessories.",
    keywords: "split leather bangladesh, cow split suede supplier, drop split wet blue, work glove leather export, savar split leather tannery",
    category: "Intermediate Stage",
    material: "Bangladesh Bovine Drop Split / Wet Blue Split",
    finishes: ["Natural Suede Nap (Buffed)", "Unfinished Wet Blue Drop Split", "Crust Split (Ready to Dye)", "Polyurethane Laminated / Bicast", "Work-Glove Heavy Flesh Split"],
    thickness: "Customized per Buyer Specification (Split according to customer tech pack)",
    colors: "Natural Grey, Golden Tan, Black, Navy, Brown, or custom dyed",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Economical containerload or tailored batches)",
    leadTime: "Scheduled per RFQ & split inventory availability",
    applications: ["Industrial work gloves & safety gear", "Casual suede shoes & boot counters", "Tool bags & heavy aprons", "Footwear linings & tongue reinforcements"],
    overview: "Split leather is created when a thick raw or wet blue bovine hide is split horizontally. The lower cut (corium layer) lacks the natural grain but offers remarkable fibrous density, tear strength, and cost efficiency. It is universally specified for safety boots, work gloves, soft suede jackets, and coated bicast leather.",
    lowPrice: "0.85",
    highPrice: "1.90",
    offerCount: "8000",
  },
  {
    id: "top-grain-leather",
    name: "Top Grain Leather",
    title: "Top Grain Cowhide Leather Supplier Bangladesh | Uniform Finish",
    description: "Export top grain bovine leather from Bangladesh. Lightly buffed for flawless consistency, stain resistance, and high yield in commercial footwear & furniture.",
    keywords: "top grain leather bangladesh, cowhide top grain supplier, commercial leather upholstery, top grain footwear leather, savar tannery",
    category: "Finished Leather",
    material: "Selected Bangladesh cowhide / steer",
    finishes: ["Semi-Pigmented", "Micro-Pigment Glaze", "Silky Matte Topcoat", "Mild Grain Print"],
    thickness: "Customized per Buyer Specification (Calibrated to buyer target substance)",
    colors: "Extensive custom color matching to physical swatches",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Aligned with buyer production run)",
    leadTime: "Scheduled per RFQ & production program",
    applications: ["Commercial contract furniture", "Fashion footwear & sneakers", "Wallets, belts, & tech sleeves", "Hospitality upholstery"],
    overview: "Top grain leather features the upper layer of the hide with minor surface variations smoothed out through micro-buffing and subtle finish coats. It offers an optimal balance between genuine leather luxury and commercial consistency, making it ideal for large-scale footwear and upholstery programs.",
    lowPrice: "2.40",
    highPrice: "4.20",
    offerCount: "4000",
  },
  {
    id: "corrected-grain-leather",
    name: "Corrected Grain Leather",
    title: "Corrected Grain & Embossed Leather Exporter Bangladesh | Saffiano & Haircell",
    description: "Source embossed corrected grain cowhide leather from Savar, Bangladesh. Saffiano, Haircell, and Pebble prints with high abrasion resistance.",
    keywords: "corrected grain leather, saffiano leather bangladesh, embossed cow leather export, pebble grain leather supplier, industrial footwear leather",
    category: "Finished Leather",
    material: "Bangladesh Bovine Hide",
    finishes: ["Saffiano Embossed", "Haircell Print", "Heavy Pebble Print", "Pigmented High-Durability Finish"],
    thickness: "Customized per Buyer Specification (Calibrated per buyer requirement)",
    colors: "Unlimited solid colors, high color fastness",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Based on embossing tooling & volume)",
    leadTime: "Scheduled per RFQ & order specifications",
    applications: ["Institutional and safety footwear", "Uniform belts & accessories", "Heavy duty travel bags", "Commercial seating"],
    overview: "Corrected grain leather undergoes careful surface conditioning, followed by the application of an artificial grain pattern (such as Saffiano, Haircell, or Pebble) via heated hydraulic or continuous embossing rollers. It is engineered for industrial consistency and exceptional yield efficiency.",
    lowPrice: "1.90",
    highPrice: "3.40",
    offerCount: "4500",
  },
  {
    id: "aniline-semi-aniline",
    name: "Aniline & Semi-Aniline Leather",
    title: "Aniline & Semi-Aniline Leather Exporter Bangladesh | Luxury Drum Dyed",
    description: "Premium transparent drum-dyed Aniline and Semi-Aniline leather from Bangladesh. Luxurious natural hand feel, breathability, and rich earthy colors.",
    keywords: "aniline leather bangladesh, semi aniline cowhide, drum dyed leather roll, luxury bag leather supplier, soft hand feel leather export",
    category: "Specialty Finish",
    material: "Top tier selected Bangladesh Cowhide",
    finishes: ["Pure Aniline Natural Hand", "Semi-Aniline Protective Mist", "Warm Wax Burnish", "Soft Hand Milling"],
    thickness: "Customized per Buyer Specification (Calibrated to buyer target substance)",
    colors: "Rich earthy tones: Cognac, Dark Chocolate, Burgundy, Olive, Charcoal",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Subject to raw hide selection availability)",
    leadTime: "Scheduled per RFQ & hide sorting schedule",
    applications: ["Designer luxury furniture", "Handcrafted artisan footwear", "High-end leather jackets", "Fine leather goods"],
    overview: "Aniline leather is dyed exclusively with soluble dyes without covering the surface with opaque topcoats, preserving the organic authenticity and warmth of the hide. Semi-aniline introduces an ultra-thin transparent protective veil to enhance soil resistance while maintaining exceptional tactile softness.",
    lowPrice: "3.40",
    highPrice: "6.20",
    offerCount: "2000",
  },
  {
    id: "pigmented-leather",
    name: "Pigmented & Coated Leather",
    title: "Pigmented Leather Supplier Bangladesh | High Durability & Easy Clean",
    description: "Export-grade pigmented cowhide leather from Bangladesh. Extreme stain resistance, lightfastness, and uniform color matching for contract seating and footwear.",
    keywords: "pigmented leather bangladesh, coated leather supplier, automotive leather upholstery, contract furniture leather, high wear leather export",
    category: "Finished Leather",
    material: "Bovine / Cowhide",
    finishes: ["Full Pigmented Matte", "High Gloss Patent / Glaze", "Polyurethane Protective Shield", "Easy-Clean Soil Resistant"],
    thickness: "Customized per Buyer Specification (Tailored to buyer target substance)",
    colors: "Exact Pantone matching; solid whites, vivid colors, and darks",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Tailored to buyer batch size)",
    leadTime: "Scheduled per RFQ & batch requirements",
    applications: ["Mass production footwear", "Public transportation & commercial seating", "School & hospital furniture", "Protective leather gear"],
    overview: "Pigmented leather is finished with a pigment dispersion and polyurethane or acrylic topcoat that seals the surface. This ensures maximum protection against sunlight, stains, and scuffing, making it the preferred solution for heavy-traffic public spaces, mass-market footwear, and automotive interiors.",
    lowPrice: "1.80",
    highPrice: "3.10",
    offerCount: "6000",
  },
  {
    id: "buyer-custom-sourcing",
    name: "Buyer-Specified Custom Leather",
    title: "Custom Leather Sourcing & Counter Sample Development Bangladesh",
    description: "Bespoke leather development tailored to your exact physical sample, thickness, and color. Counter-samples and lab dip testing from Savar tanneries.",
    keywords: "custom leather sourcing bangladesh, leather counter sample development, oem leather development, bespoke tannery sourcing, savar leather lab dips",
    category: "Specialty Finish",
    material: "Bovine / Buffalo / Goat based on buyer requirement",
    finishes: ["Developed to match physical buyer swatch", "Vegetable / Chrome / Semi-Vegetable hybrid", "Waterproof / Oil-tanned / Crazy Horse", "Custom embossed or printed textures"],
    thickness: "Customized per Buyer Specification (Tailored to required substance / tech pack)",
    colors: "Laboratory color recipe matching to physical swatch or Pantone TCX",
    origin: "Bangladesh",
    moq: "Determined upon RFQ (Subject to custom development scope)",
    leadTime: "Scheduled per RFQ & counter-sample approval",
    applications: ["OEM / ODM footwear collections", "International brand collections", "Industrial safety products", "Architectural and interior projects"],
    overview: "When standard catalogue specifications do not align with your product development requirements, ExportVisor coordinates custom development with suitable tannery partners in Bangladesh. We manage counter-sample development, lab dip approvals, and technical verification to replicate your desired hand feel, temper, and finish.",
    lowPrice: "1.75",
    highPrice: "5.50",
    offerCount: "2000",
  },
];

// Section Pages across sitemap and routing
const SECTION_ROUTES = [
  {
    path: "about",
    title: "About ExportVisor | Tannery Export Desk & Manufacturing Operations",
    description: "ExportVisor operates as the dedicated international export desk for premier leather tanneries in Savar, Dhaka, handling direct factory gate exports, pre-shipment quality inspection, and maritime shipping.",
    heading: "ExportVisor Direct Tannery Export Desk",
    lead: "Connecting global leather buyers and footwear brands directly with certified, export-grade tanneries in Savar, Dhaka.",
  },
  {
    path: "products",
    title: "Leather Sourcing Catalogue | Wet Blue, Crust & Finished Leather | ExportVisor",
    description: "Source export-grade genuine leather from Bangladesh: Full Grain, Top Grain, Corrected Grain, Drum Dyed Crust, and Wet Blue bovine and goat hides tailored to buyer specifications.",
    heading: "Export Leather Products & Specifications Catalogue",
    lead: "Explore our export-ready intermediate, finished, and specialty leather selections sourced from vetted Savar tanneries.",
  },
  {
    path: "leather-products",
    title: "Leather Sourcing Catalogue | Wet Blue, Crust & Finished Leather | ExportVisor",
    description: "Source export-grade genuine leather from Bangladesh: Full Grain, Top Grain, Corrected Grain, Drum Dyed Crust, and Wet Blue bovine and goat hides tailored to buyer specifications.",
    heading: "Leather Products & Sourcing Desk",
    lead: "Direct factory pricing, pre-shipment quality inspection, and international maritime shipping from Chittagong.",
  },
  {
    path: "glossary",
    title: "Leather Sourcing Glossary & Industry Terminology | ExportVisor",
    description: "Definitive guide defining Wet Blue, Crust Leather, Full Grain, Split Leather, Temper, and Caliper standards for international footwear and leather goods buyers.",
    heading: "Comprehensive Leather Sourcing Glossary",
    lead: "Clear technical definitions of international tannery and leather manufacturing terminology for global importers.",
  },
  {
    path: "terms",
    title: "Commercial Terms & Standards | ExportVisor",
    description: "Transparent RFQ-driven commercial terms: direct factory-floor pricing, custom MOQ evaluation, scheduled production lead times, and secure international payment terms (LC/TT).",
    heading: "Commercial Terms & Export Standards",
    lead: "Factual, RFQ-driven commercial clarity: container minimums, payment mechanisms, sample dispatches, and shipping terms.",
  },
  {
    path: "knowledge-hub",
    title: "Leather Knowledge Hub & Technical Specifications | ExportVisor",
    description: "Technical sourcing guides comparing Wet Blue, Crust, and Finished leather characteristics, grain integrity, substance tolerances, and testing parameters for global buyers.",
    heading: "Technical Leather Knowledge Hub",
    lead: "Engineering guides comparing tensile yield, elongation, temper, drum dying recipes, and international compliance.",
  },
  {
    path: "bangladesh-sourcing",
    title: "Why Source Leather from Bangladesh | Tannery Ecosystem | ExportVisor",
    description: "Discover the competitive advantages of sourcing leather from Bangladesh: indigenous raw material quality, centralized Savar Tannery Industrial Estate, and 0% import duty benefits.",
    heading: "Why Source Leather from Bangladesh?",
    lead: "Unique indigenous cowhide fiber density, competitive direct factory pricing, and world-class CETP-equipped eco estate.",
  },
  {
    path: "why-us",
    title: "Why Partner with ExportVisor | Direct Factory Export Desk",
    description: "Direct factory-gate pricing, verified tannery floor oversight in Savar, technical specification matching, transparent trade terms, and 100% pre-shipment inspection for global buyers.",
    heading: "Why Partner with ExportVisor?",
    lead: "Direct factory gate exports from Savar tanneries with zero middleman markup, rigorous technical quality oversight, and verified maritime container dispatch.",
  },
  {
    path: "quote",
    title: "Request a Leather Quotation & Direct Sourcing Desk | ExportVisor",
    description: "Submit your technical leather tech pack, target thickness, color swatches, or volume requirements for rapid tannery matching, feasibility analysis, and direct pricing.",
    heading: "Request a Direct Factory Quotation",
    lead: "Submit your leather tech pack, target substance, color swatches, and container volume requirements for verified tannery quotation.",
  },
  {
    path: "contact",
    title: "Direct Sourcing Desk & Contact | ExportVisor",
    description: "Submit your technical leather tech pack, target thickness, color swatches, or volume requirements for rapid tannery matching, feasibility analysis, and direct pricing.",
    heading: "Contact ExportVisor Sourcing Desk",
    lead: "Reach our procurement desk in Dhaka for tannery appointments, master swatch matching, and L/C trade inquiries.",
  },
  {
    path: "faq",
    title: "Frequently Asked Questions (FAQ) | ExportVisor Leather Sourcing",
    description: "Factual answers regarding MOQs, sample development, production lead times, international payment terms (LC/TT), and third-party inspection arrangements.",
    heading: "Frequently Asked Procurement Questions",
    lead: "Factual answers on MOQs, counter-sample lab dips, production timelines, international L/C payment, and third-party QA.",
  },
];

console.log("Starting Static Multi-Page Generation (SSG) for ExportVisor on GitHub Pages...");

let generatedCount = 0;

function generateHtmlForRoute({
  path: routePath,
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage = "https://exportvisor.com/og-image.jpg",
  jsonLd,
  prerenderedHtml = "",
}) {
  let html = baseHtml
    // Title
    .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
    .replace(/<meta name="title" content=".*?" \/>/gi, `<meta name="title" content="${title}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/gi, `<meta name="twitter:title" content="${title}" />`)
    // Description
    .replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/gi, `<meta name="twitter:description" content="${description}" />`)
    // Canonical & URL
    .replace(/<link rel="canonical" href=".*?" \/>/gi, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/gi, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:url" content=".*?" \/>/gi, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    // Type
    .replace(/<meta property="og:type" content=".*?" \/>/gi, `<meta property="og:type" content="${ogType}" />`)
    // Image
    .replace(/<meta property="og:image" content=".*?" \/>/gi, `<meta property="og:image" content="${ogImage}" />`)
    .replace(/<meta property="og:image:secure_url" content=".*?" \/>/gi, `<meta property="og:image:secure_url" content="${ogImage}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/gi, `<meta name="twitter:image" content="${ogImage}" />`);

  if (keywords) {
    if (html.includes('meta name="keywords"')) {
      html = html.replace(/<meta name="keywords" content=".*?" \/>/gi, `<meta name="keywords" content="${keywords}" />`);
    } else {
      html = html.replace('</head>', `  <meta name="keywords" content="${keywords}" />\n  </head>`);
    }
  }

  // Inject route-specific JSON-LD if provided
  if (jsonLd) {
    const jsonLdString = typeof jsonLd === "string" ? jsonLd : JSON.stringify(jsonLd, null, 2);
    // Prepend route JSON-LD right before </head>
    html = html.replace('</head>', `  <script type="application/ld+json" id="route-schema-jsonld">\n${jsonLdString}\n  </script>\n  </head>`);
  }

  // Pre-render semantic body content into <div id="root"> for Googlebot & initial render
  if (prerenderedHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedHtml}</div>`);
  }

  return html;
}

// 1. Generate All Section Pages
SECTION_ROUTES.forEach((route) => {
  const canonicalUrl = `https://exportvisor.com/${route.path}`;
  
  const prerenderedHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.25rem;">
      <nav style="font-size: 0.875rem; margin-bottom: 1.5rem; color: #78716c;">
        <a href="/" style="color: #c89d43; text-decoration: none; font-weight: 600;">Home</a> &gt; 
        <span style="color: #1c1917; font-weight: 500;">${route.heading}</span>
      </nav>
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: 800; color: #1c1917; margin-bottom: 0.75rem; letter-spacing: -0.025em;">${route.heading}</h1>
        <p style="font-size: 1.2rem; color: #57534e; line-height: 1.6; max-width: 850px;">${route.lead}</p>
      </header>
      <div style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px; padding: 2rem; margin-bottom: 2.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <p style="font-size: 1.05rem; line-height: 1.7; color: #44403c;">${route.description}</p>
        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #f5f5f4; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="/products" style="display: inline-block; background: #c89d43; color: #000; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none;">View Leather Catalogue</a>
          <a href="/quote" style="display: inline-block; background: #1c1917; color: #fff; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none;">Request Tannery Quote</a>
        </div>
      </div>
    </div>
  `;

  const html = generateHtmlForRoute({
    path: route.path,
    title: route.title,
    description: route.description,
    canonicalUrl,
    prerenderedHtml,
  });

  // Write to dist/<route>/index.html
  const distTargetDir = path.join(distDir, route.path);
  fs.mkdirSync(distTargetDir, { recursive: true });
  fs.writeFileSync(path.join(distTargetDir, "index.html"), html, "utf-8");

  // Also write to root/<route>/index.html so root-based GitHub Pages hosts never 404
  const rootTargetDir = path.join(rootDir, route.path);
  fs.mkdirSync(rootTargetDir, { recursive: true });
  fs.writeFileSync(path.join(rootTargetDir, "index.html"), html, "utf-8");

  console.log(`✓ Generated Section: /${route.path}/index.html`);
  generatedCount++;
});

// 2. Generate All Individual Product Pages (incorporating all 74 articles from products.ts)
let allProductsToGenerate = [...PRODUCTS];
try {
  const tsContent = fs.readFileSync(path.join(rootDir, "src/data/products.ts"), "utf-8");
  const match = tsContent.match(/export const LEATHER_PRODUCTS: LeatherProduct\[\] = (\[[\s\S]*?\]);\s*$/);
  if (match) {
    const rawList = JSON.parse(match[1]);
    rawList.forEach((p) => {
      const existingIdx = allProductsToGenerate.findIndex((e) => e.id === p.id);
      const articleItem = {
        id: p.id,
        name: p.name,
        title: p.seoTitle || `${p.name} Exporter Bangladesh | Savar Tannery`,
        description: p.seoDescription || p.shortDescription,
        keywords: (p.seoKeywords && p.seoKeywords.join(", ")) || `${p.name}, bangladesh leather, savar tannery`,
        category: p.category,
        material: p.materialType || `${p.animal} (${p.tanningMethod})`,
        finishes: p.availableFinishes || [p.finishType],
        thickness: p.thicknessRange || "Customized per Buyer Specification (Tailored to buyer target substance)",
        colors: p.colorOptions || "Full Pantone matching per buyer requirement",
        origin: p.origin || "Bangladesh",
        moq: p.moq || "Determined upon RFQ",
        leadTime: p.leadTime || "Scheduled per RFQ & batch requirements",
        applications: p.applications || ["Footwear", "Leather Goods"],
        overview: p.overview || p.shortDescription,
        lowPrice: "1.50",
        highPrice: "4.50",
        offerCount: "3000",
        image: p.image.startsWith("http") ? p.image : `https://exportvisor.com${p.image}`,
      };
      if (existingIdx >= 0) {
        allProductsToGenerate[existingIdx] = { ...allProductsToGenerate[existingIdx], image: articleItem.image };
      } else {
        allProductsToGenerate.push(articleItem);
      }
    });
  }
} catch (e) {
  console.error("Could not parse products.ts, falling back to basic PRODUCTS array:", e);
}

allProductsToGenerate.forEach((product) => {
  const primaryPath = `product/${product.id}`;
  const canonicalUrl = `https://exportvisor.com/${primaryPath}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    url: canonicalUrl,
    name: product.name,
    alternateName: product.title,
    description: product.description,
    image: [
      "https://exportvisor.com/og-image.jpg",
      "https://exportvisor.com/hero-ship.jpg"
    ],
    sku: `EV-${product.id.toUpperCase()}`,
    mpn: `BD-LTR-${product.id.toUpperCase()}`,
    category: product.category,
    material: product.material,
    color: product.colors,
    pattern: product.finishes.join(", "),
    countryOfOrigin: {
      "@type": "Country",
      name: "Bangladesh"
    },
    brand: {
      "@type": "Brand",
      name: "ExportVisor",
      logo: "https://exportvisor.com/Logo3_4.png"
    },
    manufacturer: {
      "@type": "Organization",
      "@id": "https://exportvisor.com/#organization",
      name: "ExportVisor Tannery Export Desk & Manufacturing Operations",
      url: "https://exportvisor.com"
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: product.lowPrice,
      highPrice: product.highPrice,
      offerCount: product.offerCount,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: canonicalUrl,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        unitText: "SQFT"
      },
      seller: {
        "@type": "Organization",
        name: "ExportVisor",
        url: "https://exportvisor.com"
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "Worldwide",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: ["US", "DE", "IT", "FR", "ES", "GB", "CN", "VN", "TR", "JP", "BD"]
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 7,
            maxValue: 14,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 14,
            maxValue: 30,
            unitCode: "DAY"
          }
        }
      }
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "B2B Leather Importers, Footwear Brands, and Upholstery Manufacturers"
    }
  };

  const prerenderedHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.25rem;">
      <nav style="font-size: 0.875rem; margin-bottom: 1.5rem; color: #78716c;">
        <a href="/" style="color: #c89d43; text-decoration: none; font-weight: 600;">Home</a> &gt; 
        <a href="/products" style="color: #c89d43; text-decoration: none; font-weight: 600;">Leather Products</a> &gt; 
        <span style="color: #1c1917; font-weight: 500;">${product.name}</span>
      </nav>
      <article>
        <header style="margin-bottom: 2rem;">
          <span style="display: inline-block; padding: 0.35rem 0.85rem; background: #fef3c7; color: #92400e; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; border-radius: 6px; margin-bottom: 0.75rem; letter-spacing: 0.05em;">${product.category} · Origin: ${product.origin}</span>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0; color: #1c1917; letter-spacing: -0.025em;">${product.name}</h1>
          <p style="font-size: 1.15rem; color: #57534e; line-height: 1.65; max-width: 900px;">${product.overview}</p>
        </header>

        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.75rem; margin-bottom: 2.5rem; background: #fafaf9; padding: 2rem; border-radius: 12px; border: 1px solid #e7e5e4;">
          <div>
            <h2 style="font-size: 1.1rem; font-weight: 700; color: #855d14; margin-bottom: 1rem; border-bottom: 2px solid #e7e5e4; padding-bottom: 0.5rem;">Technical Specifications</h2>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.95rem; color: #292524;">
              <li><strong>Raw Material:</strong> ${product.material}</li>
              <li><strong>Thickness Range:</strong> ${product.thickness}</li>
              <li><strong>Indicative B2B Price:</strong> $${product.lowPrice} - $${product.highPrice} USD / SQFT (RFQ Based)</li>
              <li><strong>Available Colors:</strong> ${product.colors}</li>
              <li><strong>Minimum Order Quantity (MOQ):</strong> ${product.moq}</li>
              <li><strong>Production Lead Time:</strong> ${product.leadTime}</li>
            </ul>
          </div>
          <div>
            <h2 style="font-size: 1.1rem; font-weight: 700; color: #855d14; margin-bottom: 1rem; border-bottom: 2px solid #e7e5e4; padding-bottom: 0.5rem;">Finishing & Quality Assurance</h2>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.95rem; color: #292524;">
              <li><strong>Available Finishes:</strong> ${product.finishes.join(", ")}</li>
              <li><strong>Quality Inspection:</strong> Independent pre-shipment quality inspection by ExportVisor</li>
              <li><strong>Substance Caliper:</strong> Electronic 6-point micrometer calibration</li>
              <li><strong>Export Port:</strong> Chittagong Sea Port (BDCGP) & Dhaka Air Cargo</li>
              <li><strong>Payment Terms:</strong> Irrevocable Letter of Credit (L/C) or T/T Deposit</li>
            </ul>
          </div>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.35rem; font-weight: 700; color: #1c1917; margin-bottom: 1rem;">Primary Manufacturing Applications</h2>
          <ul style="padding-left: 1.5rem; line-height: 1.9; color: #44403c; font-size: 1rem;">
            ${product.applications.map(app => `<li>${app}</li>`).join("")}
          </ul>
        </section>

        <section style="background: linear-gradient(135deg, #1c1917 0%, #292524 100%); color: #fff; padding: 2.25rem; border-radius: 12px; text-align: center; border: 1px solid #44403c;">
          <h3 style="font-size: 1.5rem; color: #e5be58; margin-bottom: 0.75rem; font-weight: 700;">Request Sourcing Feasibility & Quote for ${product.name}</h3>
          <p style="color: #d6d3d1; margin-bottom: 1.5rem; font-size: 1rem; max-width: 650px; margin-left: auto; margin-right: auto;">Connect directly with vetted Savar tanneries with verified pre-shipment quality control, master swatch matching, and reliable container dispatch.</p>
          <a href="/quote?product=${product.id}" style="display: inline-block; background: #c89d43; color: #000; padding: 0.85rem 2rem; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 1rem;">Request Direct Tannery Quotation</a>
        </section>
      </article>
    </div>
  `;

  const html = generateHtmlForRoute({
    path: primaryPath,
    title: product.title,
    description: product.description,
    keywords: product.keywords,
    canonicalUrl,
    ogType: "product",
    ogImage: "https://exportvisor.com/og-image.jpg",
    jsonLd: productJsonLd,
    prerenderedHtml,
  });

  // 1. Write to dist/product/<id>/index.html
  const distPrimaryDir = path.join(distDir, "product", product.id);
  fs.mkdirSync(distPrimaryDir, { recursive: true });
  fs.writeFileSync(path.join(distPrimaryDir, "index.html"), html, "utf-8");

  // Also write to dist/products/<id>/index.html alias
  const distAliasDir = path.join(distDir, "products", product.id);
  fs.mkdirSync(distAliasDir, { recursive: true });
  fs.writeFileSync(path.join(distAliasDir, "index.html"), html, "utf-8");

  // 2. Also write to root/product/<id>/index.html
  const rootPrimaryDir = path.join(rootDir, "product", product.id);
  fs.mkdirSync(rootPrimaryDir, { recursive: true });
  fs.writeFileSync(path.join(rootPrimaryDir, "index.html"), html, "utf-8");

  // Also write to root/products/<id>/index.html alias
  const rootAliasDir = path.join(rootDir, "products", product.id);
  fs.mkdirSync(rootAliasDir, { recursive: true });
  fs.writeFileSync(path.join(rootAliasDir, "index.html"), html, "utf-8");

  console.log(`✓ Generated Product: /product/${product.id}/index.html`);
  generatedCount++;
});

// Ensure CNAME and .nojekyll exist in dist/
const cnameSource = path.join(rootDir, "CNAME");
const cnameTarget = path.join(distDir, "CNAME");
if (fs.existsSync(cnameSource)) {
  fs.copyFileSync(cnameSource, cnameTarget);
  console.log("✓ Copied CNAME to dist/CNAME");
}

const nojekyllTarget = path.join(distDir, ".nojekyll");
fs.writeFileSync(nojekyllTarget, "# Disable Jekyll processing on GitHub Pages\n", "utf-8");
console.log("✓ Created dist/.nojekyll");

// 3. Generate Complete sitemap.xml containing all sections & all 74 products
const today = new Date().toISOString().split("T")[0];
const sitemapUrls = [
  { loc: "https://exportvisor.com/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://exportvisor.com/about", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/products", changefreq: "weekly", priority: "0.95" },
  { loc: "https://exportvisor.com/glossary", changefreq: "monthly", priority: "0.90" },
  { loc: "https://exportvisor.com/terms", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/knowledge-hub", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/bangladesh-sourcing", changefreq: "monthly", priority: "0.85" },
  { loc: "https://exportvisor.com/why-us", changefreq: "monthly", priority: "0.80" },
  { loc: "https://exportvisor.com/quote", changefreq: "weekly", priority: "0.95" },
  { loc: "https://exportvisor.com/faq", changefreq: "monthly", priority: "0.75" },
];

allProductsToGenerate.forEach((p) => {
  sitemapUrls.push({
    loc: `https://exportvisor.com/product/${p.id}`,
    changefreq: "weekly",
    priority: "0.95",
  });
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf-8");
console.log(`✓ Generated sitemap.xml with ${sitemapUrls.length} verified indexable URLs!`);

console.log(`\n🎉 Successfully generated ${generatedCount} static pages with actual folders & index.html files!`);
console.log("All sitemap and product URLs are now 100% compliant with GitHub Pages static hosting.");
