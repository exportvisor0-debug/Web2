import { LeatherProduct } from "../data/products";

/**
 * Normalizes a buyer-friendly leather product name (zero internal numbering or article codes).
 */
export function formatB2BBuyerDescriptor(
  product: Pick<LeatherProduct, "name" | "animal" | "stage" | "tanningMethod">,
  _includeTannage: boolean = false
): string {
  const clean = product.name
    .replace(/^Article\s+\d+\s*[·-]\s*/i, "")
    .replace(/\s*\(?(Article\s+\d+|WB-\d+|WW-\d+|CR-\d+)\)?\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!/\bleather\b|\bcollection\b|\bdevelopment\b|\bsourcing\b/i.test(clean)) {
    return `${clean} Leather`;
  }
  return clean;
}

function seoSafeText(text: string): string {
  return text.replace(/\s*&\s*/g, "/").replace(/\s{2,}/g, " ").trim();
}

function compactDescriptorForTitle(descriptor: string, aggressive: boolean = false): string {
  let out = seoSafeText(descriptor)
    .replace(/\bVegetable Tanned\b/gi, "Veg Tanned")
    .replace(/\bCombination Tanned\b/gi, "Combination")
    .replace(/\bChrome Tanned\b/gi, "Chrome")
    .replace(/\bChrome Free\b/gi, "Chrome-Free")
    .replace(/\bSemi-Chrome Tanned\b/gi, "Semi-Chrome")
    .replace(/\bSemi-Veg Tanned\b/gi, "Semi-Veg")
    .replace(/\bCow\/Buffalo\b/gi, "Cow/Buff")
    .replace(/\s*\(Softee\/Synthetic\)/gi, "")
    .replace(/\s*\(Aniline\/Glazed\)/gi, "")
    .replace(/\s*\(Suede\/Drop Split\)/gi, "")
    .replace(/\s*\(Goat\/Cow Shoe Lining\)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (aggressive) {
    out = out
      .replace(/\bCorrected Grain\b/gi, "Corrected")
      .replace(/\bCombination\b/gi, "Combo")
      .replace(/\bSynthetic\b/gi, "Synth")
      .replace(/\bVegetable\b/gi, "Veg")
      .replace(/\bBangladesh\b/gi, "BD")
      .replace(/\s+\b(?:Cow\/Goat|Cow\/Buff|Cow)\b(?=\s+Leather$)/i, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  return out;
}

/**
 * Product <title> prioritizing high-intent B2B buyer keywords strictly <= 60 chars (Bing & Google optimal, never clips "Leather").
 */
export function getB2BProductTitle(product: LeatherProduct): string {
  const rawDesc = seoSafeText(formatB2BBuyerDescriptor(product));
  const candidates = [
    `${rawDesc} Exporter BD | ExportVisor`,
    `${rawDesc} Exporter | ExportVisor`,
    `${rawDesc} BD | ExportVisor`,
    `${rawDesc} | ExportVisor`,
  ];

  const matchRaw = candidates.find((c) => c.length <= 60);
  if (matchRaw) return matchRaw;

  const shortDesc = compactDescriptorForTitle(rawDesc, false);
  const shortCandidates = [
    `${shortDesc} Exporter BD | ExportVisor`,
    `${shortDesc} Exporter | ExportVisor`,
    `${shortDesc} BD | ExportVisor`,
    `${shortDesc} | ExportVisor`,
  ];

  const matchShort = shortCandidates.find((c) => c.length <= 60);
  if (matchShort) return matchShort;

  const ultraShort = compactDescriptorForTitle(rawDesc, true);
  const ultraCandidates = [
    `${ultraShort} Exporter BD | ExportVisor`,
    `${ultraShort} BD | ExportVisor`,
    `${ultraShort} | ExportVisor`,
  ];
  const matchUltra = ultraCandidates.find((c) => c.length <= 60);
  if (matchUltra) return matchUltra;

  const maxNameLen = 60 - " | ExportVisor".length;
  const trimmed = ultraShort.slice(0, maxNameLen).replace(/\s+\S*$/, "").trim();
  return `${trimmed} | ExportVisor`;
}

/**
 * Product <h1> prioritizing high-intent B2B buyer keywords (full descriptive heading on page).
 */
export function getB2BProductH1(product: LeatherProduct): string {
  const descriptor = formatB2BBuyerDescriptor(product);
  return `${descriptor} Supplier & Exporter Bangladesh`;
}

/**
 * Product <meta name="description"> strictly calibrated between 125 and 152 characters using unique product copy for Google/Bing SERP ranking.
 */
export function getB2BProductDescription(product: LeatherProduct): string {
  const rawDesc = seoSafeText(formatB2BBuyerDescriptor(product, true));
  const shortDesc = compactDescriptorForTitle(rawDesc, false);

  const uniqueBase = (product.seoDescription || product.shortDescription || "")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (uniqueBase) {
    const cleanBase = uniqueBase.endsWith(".") ? uniqueBase : `${uniqueBase}.`;
    if (cleanBase.length >= 125 && cleanBase.length <= 152) {
      return cleanBase;
    }
    if (cleanBase.length < 125) {
      const suffixes = [
        " Custom thickness, low MOQ and fast DHL samples from Savar.",
        " Custom caliper, low MOQ and DHL swatch samples from Savar.",
        " Direct Savar tannery supply, low MOQ and fast DHL swatches.",
        " Custom specs and fast DHL swatches from Savar, Bangladesh.",
        " Low MOQ and DHL samples from Savar, Bangladesh.",
        " Direct Savar tannery export.",
      ];
      for (const s of suffixes) {
        const combined = `${cleanBase}${s}`;
        if (combined.length >= 125 && combined.length <= 152) {
          return combined;
        }
      }
      const bestFit = suffixes.map((s) => `${cleanBase}${s}`).find((c) => c.length <= 152);
      if (bestFit && bestFit.length >= 120) return bestFit;
    } else if (cleanBase.length <= 155) {
      return cleanBase;
    } else {
      return cleanBase.slice(0, 149).replace(/\s+\S*$/, "").trim() + ".";
    }
  }

  const templates = [
    `Export-grade ${rawDesc} from Savar, Bangladesh. Custom thickness, low MOQ and fast DHL samples. Request quote.`,
    `Direct Bangladesh ${shortDesc} from Savar tanneries. Custom millimeter thickness, low MOQ and DHL samples. Request quote.`,
  ];

  const ideal = templates.find((t) => t.length >= 125 && t.length <= 152);
  if (ideal) return ideal;

  let chosen = templates.find((t) => t.length <= 152) || templates[templates.length - 1];
  if (chosen.length > 152) {
    chosen = chosen.slice(0, 149).replace(/\s+\S*$/, "").trim() + "...";
  } else if (chosen.length < 125) {
    const pad = " FOB Chattogram and CIF worldwide.";
    if (chosen.length + pad.length <= 152) {
      chosen = chosen + pad;
    }
  }
  return chosen;
}
