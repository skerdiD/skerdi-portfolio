import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[]; // JSON-LD schema object
}

const SEO = ({
  title = "Skerdi Cacaj | Full-Stack Developer",
  description = "Full-Stack Developer building modern web applications with React, Next.js, Node.js, Express.js, PostgreSQL, and modern backend tooling.",
  keywords = "Skerdi Cacaj, Full-Stack Developer, React, Next.js, Express.js, NestJS, Tirana, Albania",
  canonical,
  robots = "index, follow, max-image-preview:large",
  ogType = "website",
  ogImage = "/images/skerdi-profile.png",
  ogUrl,
  schema
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = ogUrl || `${window.location.origin}${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // 2. Helper to set meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    // 3. Set standard meta tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", robots);
    setMetaTag("name", "author", "Skerdi Cacaj");

    // 4. Set OpenGraph meta tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:image", new URL(ogImage, window.location.origin).href);
    setMetaTag("property", "og:image:alt", title);
    setMetaTag("property", "og:site_name", "Skerdi Cacaj Portfolio");

    // 5. Set Twitter Card meta tags
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", new URL(ogImage, window.location.origin).href);
    setMetaTag("name", "twitter:image:alt", title);
    setMetaTag("name", "twitter:card", "summary_large_image");

    // 6. Set Canonical Link
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalElement) {
      canonicalElement.setAttribute("href", canonicalUrl);
    } else {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      canonicalElement.setAttribute("href", canonicalUrl);
      document.head.appendChild(canonicalElement);
    }

    // 7. Inject JSON-LD Schema
    const scriptId = "jsonld-seo";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;

    if (schema) {
      // Ensure context is present
      const formattedSchema = Array.isArray(schema)
        ? schema.map(s => ({ "@context": "https://schema.org", ...s }))
        : { "@context": "https://schema.org", ...schema };

      if (scriptElement) {
        scriptElement.textContent = JSON.stringify(formattedSchema);
      } else {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        scriptElement.textContent = JSON.stringify(formattedSchema);
        document.head.appendChild(scriptElement);
      }
    } else {
      // Remove schema if none provided for this page
      if (scriptElement) {
        scriptElement.remove();
      }
    }

    return () => {
      // Clean up dynamic schema script on unmount
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, currentUrl, robots, ogType, ogImage, schema]);

  return null; // SEO component does not render any visual UI elements
};

export default SEO;

