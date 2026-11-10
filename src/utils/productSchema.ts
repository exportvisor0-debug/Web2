/**
 * Schema.org Product JSON-LD Structured Data Utilities
 * 
 * Provides production-grade Google Rich Results & Schema.org compliant
 * Product schema markup for each individual product page in ExportVisor.
 */

import { LeatherProduct, LEATHER_PRODUCTS } from "../data/products";

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
};

/**
 * Generates an SEO & Schema.org compliant Product JSON-LD object for a single leather product.
 */
export function generateProductJsonLd(product: LeatherProduct) {
  const benchmark = PRODUCT_BENCHMARKS[product.id] || {
    low: "1.80",
    high: "4.50",
    offerCount: "3000",
  };

  const productUrl = `https://exportvisor.com/product/${product.id}`;
  const sku = `EV-${product.id.toUpperCase()}`;
  const mpn = `BD-LTR-${product.id.toUpperCase()}`;

  // Absolute image URLs required by Google Rich Snippets
  const images = [
    "https://exportvisor.com/og-image.jpg",
    "https://exportvisor.com/hero-ship.jpg",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    url: productUrl,
    name: product.name,
    alternateName: product.seoTitle || `${product.name} | ExportVisor Bangladesh`,
    description: product.seoDescription || product.overview || product.shortDescription,
    image: images,
    sku: sku,
    mpn: mpn,
    category: product.category,
    material: product.materialType,
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
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: benchmark.low,
      highPrice: benchmark.high,
      offerCount: benchmark.offerCount,
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
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "Worldwide",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: ["US", "DE", "IT", "FR", "ES", "GB", "CN", "VN", "TR", "JP", "BD"],
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 7,
            maxValue: 14,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 14,
            maxValue: 30,
            unitCode: "DAY",
          },
        },
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
