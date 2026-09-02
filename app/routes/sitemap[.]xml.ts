import type { LoaderFunctionArgs } from "react-router";
import { SITE_URL } from "~/data/site";
import { getPosts } from "~/models/post.server";

type SitemapEntry = {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
};

const STATIC_PAGES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/rooms", changefreq: "weekly", priority: "0.9" },
  { path: "/book", changefreq: "weekly", priority: "0.9" },
  { path: "/dining", changefreq: "weekly", priority: "0.8" },
  { path: "/events", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/posts", changefreq: "weekly", priority: "0.5" },
];

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

function urlEntry({ path, changefreq, priority, lastmod }: SitemapEntry) {
  return [
    "  <url>",
    `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function loader({ context }: LoaderFunctionArgs) {
  const entries = [...STATIC_PAGES];

  // Blog posts are optional: a Supabase outage shouldn't take down the sitemap.
  try {
    const posts = await getPosts(context);
    for (const post of posts) {
      entries.push({
        path: `/posts/${post.slug}`,
        changefreq: "monthly",
        priority: "0.5",
        lastmod: (post.updated_date ?? post.published_date ?? "").slice(0, 10) || undefined,
      });
    }
  } catch (error) {
    console.error("sitemap: could not load posts", error);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlEntry),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
