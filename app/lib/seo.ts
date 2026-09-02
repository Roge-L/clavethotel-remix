import type { MetaDescriptor } from "react-router";
import { BUSINESS, SITE_URL } from "~/data/site";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export type SeoInput = {
  title: string;
  description: string;
  /** Path only, e.g. `/dining`. Leading slash required. */
  pathname: string;
  image?: string;
  /** `website` for landing pages, `article` for blog posts. */
  type?: "website" | "article";
  /** Set on pages that shouldn't be indexed (thank-you pages, etc). */
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function canonicalUrl(pathname: string): string {
  // Trailing slashes create duplicate URLs; the root is the one exception.
  const clean =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return `${SITE_URL}${clean}`;
}

/**
 * Builds the full head for a page: title, description, canonical, Open Graph
 * and Twitter cards. Every route uses this so no page can quietly ship without
 * a canonical or a share card.
 */
export function buildMeta({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
}: SeoInput): MetaDescriptor[] {
  const url = canonicalUrl(pathname);
  const fullTitle =
    title === BUSINESS.name ? title : `${title} | ${BUSINESS.name}`;

  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },

    { property: "og:site_name", content: BUSINESS.name },
    { property: "og:type", content: type },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${BUSINESS.name}, ${BUSINESS.address.locality}, ${BUSINESS.address.regionName}` },
    { property: "og:locale", content: "en_CA" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (publishedTime) {
    tags.push({ property: "article:published_time", content: publishedTime });
  }
  if (modifiedTime) {
    tags.push({ property: "article:modified_time", content: modifiedTime });
  }
  if (noIndex) {
    tags.push({ name: "robots", content: "noindex, follow" });
  }

  return tags;
}

/** Renders a JSON-LD block. React escapes the string, so it is injection-safe. */
export function jsonLdScript(data: unknown): MetaDescriptor {
  return {
    "script:ld+json": data as Record<string, unknown>,
  } as MetaDescriptor;
}
