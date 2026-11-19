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

/**
 * Product <title> prioritizing high-intent B2B buyer keywords (clean buyer name only)
 * Example: "Full Grain Semi-Aniline Chrome Cow Leather Supplier & Exporter - ExportVisor"
 */
export function getB2BProductTitle(product: LeatherProduct): string {
  const descriptor = formatB2BBuyerDescriptor(product);
  return `${descriptor} Supplier & Exporter - ExportVisor`;
}

/**
 * Product <h1> prioritizing high-intent B2B buyer keywords (clean buyer name only)
 * Example: "Full Grain Semi-Aniline Chrome Cow Leather Supplier & Exporter"
 */
export function getB2BProductH1(product: LeatherProduct): string {
  const descriptor = formatB2BBuyerDescriptor(product);
  return `${descriptor} Supplier & Exporter`;
}

/**
 * Product <meta name="description"> prioritizing B2B export sourcing, custom thickness, low MOQ & fast samples
 */
export function getB2BProductDescription(product: LeatherProduct): string {
  const descriptor = formatB2BBuyerDescriptor(product, true);
  return `Source export-grade ${descriptor} from Bangladesh. Custom thickness, low MOQ, bulk supply, and fast sample dispatch. Request a quote.`;
}
