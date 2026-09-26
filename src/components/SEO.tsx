import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { portfolio } from "@/data/portfolio";

type Schema = Record<string, unknown>;

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  schema?: Schema | Schema[];
};

const SEO = ({
  title = `${portfolio.personal.name} — ${portfolio.personal.role}`,
  description = portfolio.personal.summary,
  canonical,
  schema,
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = canonical ?? `${portfolio.personal.siteUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        const match = selector.match(/\[(name|property)="(.+)"\]/);
        if (match) element.setAttribute(match[1], match[2]);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="author"]', "content", portfolio.personal.name);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", currentUrl);
    setMeta('meta[property="og:site_name"]', "content", `${portfolio.personal.name} Portfolio`);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    const id = "portfolio-jsonld";
    document.getElementById(id)?.remove();
    if (schema) {
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": Array.isArray(schema) ? schema : [schema] });
      document.head.appendChild(script);
    }

    return () => document.getElementById(id)?.remove();
  }, [currentUrl, description, schema, title]);

  return null;
};

export default SEO;
