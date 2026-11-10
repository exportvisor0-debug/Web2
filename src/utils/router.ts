import { useEffect, useCallback } from "react";
import {
  SECTION_ROUTES,
  getRouteByPath,
  getRouteById,
  getProductBySlugOrId,
} from "../config/routes";
import { LeatherProduct, LEATHER_PRODUCTS } from "../data/products";
import { generateProductJsonLd } from "./productSchema";

export function scrollToSection(sectionId: string, smooth: boolean = true) {
  const elem = document.getElementById(sectionId);
  if (elem) {
    // Add header height offset
    const yOffset = -72;
    const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: smooth ? "smooth" : "auto",
    });
    return true;
  }
  return false;
}

export function syncRouteSeo(route: { title: string; metaDescription?: string; path: string }) {
  document.title = route.title;
  if (route.metaDescription) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", route.metaDescription);
    }
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", route.title);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", route.metaDescription);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://exportvisor.com${route.path}`);
  }
}

export function syncProductSeo(product: LeatherProduct | null) {
  if (product) {
    const title = product.seoTitle || `${product.name} | ExportVisor Bangladesh`;
    const desc = product.seoDescription || product.shortDescription;
    const url = `https://exportvisor.com/product/${product.id}`;

    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    // Meta keywords
    if (product.seoKeywords && product.seoKeywords.length > 0) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement("meta");
        metaKw.setAttribute("name", "keywords");
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute("content", product.seoKeywords.join(", "));
    }

    // OpenGraph
    const setOgTag = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setOgTag("og:title", title);
    setOgTag("og:description", desc);
    setOgTag("og:url", url);
    setOgTag("og:type", "product");
    if (product.image) {
      setOgTag("og:image", product.image);
    }

    // Canonical URL update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Product Schema JSON-LD
    let script = document.getElementById("product-schema-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "product-schema-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(generateProductJsonLd(product));
  } else {
    // Reset to default
    document.title = "ExportVisor | Bangladesh Leather Sourcing & Export Partner";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://exportvisor.com/");
    }
    const script = document.getElementById("product-schema-jsonld");
    if (script) {
      script.remove();
    }
  }
}

export function navigateTo(path: string, smooth: boolean = true) {
  const route = getRouteByPath(path);
  if (route) {
    if (window.location.pathname !== route.path) {
      window.history.pushState(null, "", route.path);
    }
    syncRouteSeo(route);
    scrollToSection(route.id, smooth);
  } else if (path.startsWith("#")) {
    const id = path.substring(1);
    const r = getRouteById(id);
    if (r) {
      if (window.location.pathname !== r.path) {
        window.history.pushState(null, "", r.path);
      }
      syncRouteSeo(r);
    }
    scrollToSection(id, smooth);
  } else {
    // Fallback
    window.history.pushState(null, "", path);
  }
}

/**
 * Custom React hook that handles:
 * 1. Initial route resolution on page load (including /product/:slug)
 * 2. URL synchronization as user scrolls through sections
 * 3. Popstate (Back/Forward buttons) support
 */
export function useSectionRouter(onSelectProductByRoute?: (product: LeatherProduct | null) => void) {
  const handleInitialRoute = useCallback(() => {
    // 1. Check if we arrived via SPA redirect from 404.html
    let redirectPath = sessionStorage.getItem("spa_redirect");
    if (redirectPath) {
      sessionStorage.removeItem("spa_redirect");
      window.history.replaceState(null, "", redirectPath);
    } else if (window.location.search && window.location.search.startsWith("?")) {
      const queryParam = window.location.search.substring(1).split("&")[0];
      if (queryParam.startsWith("/")) {
        redirectPath = queryParam;
        window.history.replaceState(null, "", redirectPath);
      }
    }

    // 2. Check query string for ?product=...
    const urlParams = new URLSearchParams(window.location.search);
    const productQuery = urlParams.get("product");
    if (productQuery) {
      const prod = getProductBySlugOrId(productQuery);
      if (prod && onSelectProductByRoute) {
        onSelectProductByRoute(prod);
        syncProductSeo(prod);
        setTimeout(() => {
          scrollToSection("leather-products", false);
        }, 150);
        return;
      }
    }

    // 3. Check path or hash
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    // Check individual product path e.g. /product/:slug
    if (pathname.startsWith("/product/") || pathname.startsWith("/products/")) {
      const slug = pathname.split("/")[2];
      if (slug) {
        const prod = getProductBySlugOrId(slug);
        if (prod && onSelectProductByRoute) {
          onSelectProductByRoute(prod);
          syncProductSeo(prod);
          setTimeout(() => {
            scrollToSection("leather-products", false);
          }, 150);
          return;
        }
      }
    }

    let targetRoute = getRouteByPath(pathname);
    if (!targetRoute && hash) {
      targetRoute = getRouteById(hash.replace(/^#/, ""));
    }

    if (targetRoute && targetRoute.id !== "hero") {
      // Delay slightly for initial render/images
      setTimeout(() => {
        scrollToSection(targetRoute.id, false);
        document.title = targetRoute.title;
      }, 100);
    }
  }, [onSelectProductByRoute]);

  useEffect(() => {
    handleInitialRoute();

    // Listen to Back / Forward navigation
    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith("/product/")) {
        const slug = pathname.split("/")[2];
        const prod = getProductBySlugOrId(slug);
        if (prod && onSelectProductByRoute) {
          onSelectProductByRoute(prod);
          syncProductSeo(prod);
          return;
        }
      } else {
        if (onSelectProductByRoute) {
          onSelectProductByRoute(null);
          syncProductSeo(null);
        }
      }

      const route = getRouteByPath(pathname);
      if (route) {
        document.title = route.title;
        scrollToSection(route.id, true);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Scroll spy using IntersectionObserver
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -40% 0px", // Trigger when section is in the middle of the viewport
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Don't override if a product modal is active with a /product/ URL
          if (window.location.pathname.startsWith("/product/")) return;

          const route = getRouteById(sectionId);
          if (route) {
            // Update URL without adding redundant history stack entries
            if (window.location.pathname !== route.path) {
              window.history.replaceState(null, "", route.path);
              syncRouteSeo(route);
            }
          }
        }
      });
    }, observerOptions);

    // Observe each section
    SECTION_ROUTES.forEach((route) => {
      const elem = document.getElementById(route.id);
      if (elem) {
        observer.observe(elem);
      }
    });

    return () => {
      window.removeEventListener("popstate", handlePopState);
      observer.disconnect();
    };
  }, [handleInitialRoute, onSelectProductByRoute]);

  return { navigateTo, scrollToSection };
}

