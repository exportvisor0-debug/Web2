/**
 * Schema.org Product JSON-LD Structured Data Utilities
 * 
 * Provides production-grade Google Rich Results & Schema.org compliant
 * Product schema markup for each individual product page in ExportVisor.
 */

import { LeatherProduct, LEATHER_PRODUCTS } from "../data/products";
import {
  formatB2BBuyerDescriptor,
  getB2BProductDescription,
  getB2BProductTitle,
} from "./productSeoFormat";

export interface ProductPriceBenchmark {
  low: string;
  high: string;
  offerCount: string;
}

export const PRODUCT_BENCHMARKS: Record<string, ProductPriceBenchmark> = {
  "crust-leather": {
    low: "1.65",
    high: "3.20",
    offerCount: "5000",
  },
  "finished-leather": {
    low: "2.10",
    high: "4.50",
    offerCount: "3000",
  },
  "wet-blue-leather": {
    low: "0.95",
    high: "1.85",
    offerCount: "10000",
  },
  "full-grain-leather": {
    low: "3.20",
    high: "5.80",
    offerCount: "2500",
  },
  "split-leather": {
    low: "0.85",
    high: "1.90",
    offerCount: "8000",
  },
  "top-grain-leather": {
    low: "2.40",
    high: "4.20",
    offerCount: "4000",
  },
  "corrected-grain-leather": {
    low: "1.90",
    high: "3.40",
    offerCount: "4500",
  },
  "aniline-semi-aniline": {
    low: "3.40",
    high: "6.20",
    offerCount: "2000",
  },
  "pigmented-leather": {
    low: "1.80",
    high: "3.10",
    offerCount: "6000",
  },
  "buyer-custom-sourcing": {
    low: "1.75",
    high: "5.50",
    offerCount: "2000",
  },
  "lining-leather": {
    low: "1.60",
    high: "3.10",
    offerCount: "3000",
  },
  "goat-lining-leather": {
    low: "1.65",
    high: "3.10",
    offerCount: "1",
  },
  "cow-lining-leather": {
    low: "1.55",
    high: "2.80",
    offerCount: "1",
  },
};

function getBenchmarkForProduct(product: LeatherProduct): ProductPriceBenchmark {
  if (PRODUCT_BENCHMARKS[product.id]) {
    return PRODUCT_BENCHMARKS[product.id];
  }
  if (product.stage === "Wet Blue") {
    return { low: "0.95", high: "1.95", offerCount: "1" };
  }
  if (product.stage === "Crust") {
    return { low: "1.65", high: "3.40", offerCount: "1" };
  }
  return { low: "2.10", high: "4.80", offerCount: "1" };
}

/**
 * Generates a Schema.org & Google Rich Results compliant Product JSON-LD object
 * prioritizing B2B keywords, brand, category, material, technical specs, and valid inquiry offers.
 */
export function generateProductJsonLd(product: LeatherProduct) {
  const benchmark = getBenchmarkForProduct(product);
  const productUrl = `https://exportvisor.com/product/${product.id}`;
  const sku = `EV-${product.id.toUpperCase()}`;
  const mpn = `BD-LTR-${product.id.toUpperCase()}`;

  const buyerDescriptor = formatB2BBuyerDescriptor(product, false);
  const b2bTitle = getB2BProductTitle(product);
  const b2bDescription = getB2BProductDescription(product);

  // Absolute image URLs required by Google Rich Snippets & Image Search
  const rawImg = product.image || "/og-image.jpg";
  const absJpg = rawImg.startsWith("http") ? rawImg : `https://exportvisor.com${rawImg}`;
  const abs4kWebp =
    rawImg.startsWith("/assets/products/") && rawImg.endsWith(".jpg")
      ? `https://exportvisor.com/assets/products/4k/${rawImg.slice("/assets/products/".length, -4)}.webp`
      : absJpg;
  const images = Array.from(new Set([absJpg, abs4kWebp]));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    url: productUrl,
    name: buyerDescriptor,
    alternateName: b2bTitle,
    description: b2bDescription,
    image: images,
    sku: sku,
    mpn: mpn,
    category: `${product.stage} Leather / ${product.category}`,
    material: `${product.materialType} (${product.animal} · ${product.tanningMethod})`,
    color: product.colorOptions,
    pattern: product.availableFinishes.join(", "),
    countryOfOrigin: {
      "@type": "Country",
      name: "Bangladesh",
    },
    brand: {
      "@type": "Brand",
      name: "ExportVisor",
      logo: "https://exportvisor.com/Logo3_4.png",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": "https://exportvisor.com/#organization",
      name: "ExportVisor Tannery Export Desk & Manufacturing Division",
      url: "https://exportvisor.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Beribadh Road, Sikdar Estate, Chorokghata, Nawabganj",
        addressLocality: "Dhaka",
        postalCode: "1312",
        addressRegion: "Dhaka Division",
        addressCountry: "BD",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Leather Type",
        value: `${product.stage} ${product.grainType} (${product.name})`,
      },
      {
        "@type": "PropertyValue",
        name: "Raw Material",
        value: product.animal,
      },
      {
        "@type": "PropertyValue",
        name: "Tannage",
        value: product.tanningMethod,
      },
      {
        "@type": "PropertyValue",
        name: "Thickness (mm)",
        value: product.thicknessRange || "Custom calibrated (0.8–2.2mm+ per buyer tech pack)",
      },
      {
        "@type": "PropertyValue",
        name: "Average Size (sq. ft.)",
        value: product.sizeMeasurement || "18–26 sq. ft. per full hide",
      },
      {
        "@type": "PropertyValue",
        name: "MOQ",
        value: product.moq,
      },
      {
        "@type": "PropertyValue",
        name: "Sample Availability",
        value: product.availabilityNote || "DHL / FedEx Swatch & Counter-Sample Dispatch",
      },
      {
        "@type": "PropertyValue",
        name: "Lead Time",
        value: product.leadTime,
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: benchmark.low,
      highPrice: benchmark.high,
      offerCount: 1,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: productUrl,
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
      seller: {
        "@type": "Organization",
        name: "ExportVisor",
        url: "https://exportvisor.com",
      },
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "B2B Leather Importers, Footwear Brands, and Upholstery Manufacturers",
    },
  };
}

/**
 * Returns an array of Schema.org Product objects for every product in the catalogue.
 */
export function getAllProductsJsonLd() {
  return LEATHER_PRODUCTS.map((prod) => generateProductJsonLd(prod));
}
