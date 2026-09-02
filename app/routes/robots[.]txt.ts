import { SITE_URL } from "~/data/site";

/**
 * Served from the app rather than `public/` so the sitemap URL stays in sync
 * with SITE_URL. Note: if Cloudflare's managed robots.txt is enabled on the
 * zone, its content-signal block is appended to this response.
 */
export function loader() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Thank-you pages carry no standalone value in search results.",
    "Disallow: /book/success",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
