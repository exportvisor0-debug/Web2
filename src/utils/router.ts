import { useEffect, useCallback } from "react";
import {
  SECTION_ROUTES,
  getRouteByPath,
  getRouteById,
  getProductBySlugOrId,
  normalizeCanonicalPath,
} from "../config/routes";
import { LeatherProduct } from "../data/products";
import { generateProductJsonLd } from "./productSchema";
import { getB2BProductTitle, getB2BProductDescription } from "./productSeoFormat";

export function scrollToSection(sectionId: string, smooth: boolean = true, retries: number = 25) {
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

  // Retry cleanly while Suspense lazy sections finish hydrating on deep-link reloads
  if (retries > 0 && typeof window !== "undefined") {
    window.setTimeout(() => {
      scrollToSection(sectionId, smooth, retries - 1);
    }, 80);
  }
  return false;
}

function ensureCanonicalElement(): HTMLLinkElement {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  return canonical;
}

export function syncRouteSeo(route: { title: string; metaDescription?: string; path: string }) {
  const cleanPath = normalizeCanonicalPath(route.path);
  const canonicalUrl =
    cleanPath === "/" ? "https://exportvisor.com/" : `https://exportvisor.com${cleanPath}`;

  document.title = route.title;
  const metaTitle = document.querySelector('meta[name="title"]');
  if (metaTitle) metaTitle.setAttribute("content", route.title);

  const canonical = ensureCanonicalElement();
  canonical.setAttribute("href", canonicalUrl);

  if (route.metaDescription) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", route.metaDescription);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", route.metaDescription);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", route.metaDescription);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", route.title);
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", route.title);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);
  const twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) twitterUrl.setAttribute("content", canonicalUrl);
  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute("content", "website");
}

export function syncProductSeo(product: LeatherProduct | null) {
  if (product) {
    const title = getB2BProductTitle(product);
    const desc = getB2BProductDescription(product);
    const url = `https://exportvisor.com/product/${product.id}`;

    document.title = title;
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute("content", title);

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", desc);

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

    // OpenGraph & Twitter
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
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute("content", url);

    if (product.image) {
      const absImg = product.image.startsWith("http")
        ? product.image
        : `https://exportvisor.com${product.image}`;
      setOgTag("og:image", absImg);
      setOgTag("og:image:secure_url", absImg);
      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute("content", absImg);
    }

    // Self-referencing Canonical URL (never trailing slash)
    const canonical = ensureCanonicalElement();
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
    const activeRoute =
      getRouteByPath(window.location.pathname) ||
      SECTION_ROUTES[0];
    syncRouteSeo({
      title: activeRoute.title,
      metaDescription: activeRoute.metaDescription,
      path: activeRoute.path.startsWith("/product/") ? "/products" : activeRoute.path,
    });
    const script = document.getElementById("product-schema-jsonld");
    if (script) {
      script.remove();
    }
  }
}

export function navigateTo(path: string, smooth: boolean = true) {
  const cleanTarget = normalizeCanonicalPath(path);
  const route = getRouteByPath(cleanTarget);
  if (route) {
    const routePath = normalizeCanonicalPath(route.path);
    if (window.location.pathname !== routePath) {
      window.history.pushState(null, "", routePath);
    }
    syncRouteSeo({ ...route, path: routePath });
    scrollToSection(route.id, smooth);
  } else if (path.startsWith("#")) {
    const id = path.substring(1);
    const r = getRouteById(id);
    if (r) {
      const routePath = normalizeCanonicalPath(r.path);
      if (window.location.pathname !== routePath) {
        window.history.pushState(null, "", routePath);
      }
      syncRouteSeo({ ...r, path: routePath });
    }
    scrollToSection(id, smooth);
  } else {
    window.history.pushState(null, "", cleanTarget);
  }
}

/**
 * Custom React hook that handles:
 * 1. Initial route resolution on page load (including /product/:slug)
 * 2. Strict trailing-slash stripping + self-referencing <link rel="canonical">
 * 3. URL synchronization as user scrolls through sections
 * 4. Popstate (Back/Forward buttons) support
 */
export function useSectionRouter(onSelectProductByRoute?: (product: LeatherProduct | null) => void) {
  const handleInitialRoute = useCallback(() => {
    // 1. Check if we arrived via SPA redirect from 404.html
    let redirectPath = sessionStorage.getItem("spa_redirect");
    if (redirectPath) {
      sessionStorage.removeItem("spa_redirect");
      window.history.replaceState(null, "", normalizeCanonicalPath(redirectPath));
    } else if (window.location.search && window.location.search.startsWith("?")) {
      const queryParam = window.location.search.substring(1).split("&")[0];
      if (queryParam.startsWith("/")) {
        redirectPath = normalizeCanonicalPath(queryParam);
        window.history.replaceState(null, "", redirectPath);
      }
    }

    // 2. Enforce strict non-trailing-slash pathname on non-root URLs
    const rawPathname = window.location.pathname;
    const pathname = normalizeCanonicalPath(rawPathname);
    if (rawPathname !== pathname) {
      window.history.replaceState(null, "", `${pathname}${window.location.search}${window.location.hash}`);
    }

    // 3. Check query string for ?product=...
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

    // 4. Check individual product path e.g. /product/:slug
    const hash = window.location.hash;
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

    // 5. Resolve section route & always stamp self-referencing <link rel="canonical">
    let targetRoute = getRouteByPath(pathname);
    if (!targetRoute && hash) {
      targetRoute = getRouteById(hash.replace(/^#/, ""));
    }

    if (targetRoute) {
      syncRouteSeo(targetRoute);
      if (targetRoute.id !== "hero") {
        setTimeout(() => {
          scrollToSection(targetRoute.id, false);
        }, 100);
      }
    } else {
      syncRouteSeo(SECTION_ROUTES[0]);
    }
  }, [onSelectProductByRoute]);

  useEffect(() => {
    handleInitialRoute();

    // Listen to Back / Forward navigation
    const handlePopState = () => {
      const pathname = normalizeCanonicalPath(window.location.pathname);
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
        syncRouteSeo(route);
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
      // Only update URL via scroll-spy after the user actually scrolls down
      if (window.scrollY < 160) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Don't override if a product modal is active with a /product/ URL
          if (window.location.pathname.startsWith("/product/")) return;

          const route = getRouteById(sectionId);
          if (route) {
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

