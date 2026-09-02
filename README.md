# Clavet Motor Inn

Marketing and booking site for [Clavet Motor Inn](https://www.clavethotel.com) —
motel, café and bar in Clavet, Saskatchewan.

Built with [React Router 7](https://reactrouter.com) (framework mode) and
deployed to Cloudflare Pages.

## Development

```sh
npm install
npm run dev
```

Server-side integrations (Supabase for blog posts, Resend for booking emails)
read their credentials from Cloudflare bindings. For local development, copy
`.dev.vars.example` to `.dev.vars` and fill it in. Without it, every route works
except `/posts`, which needs Supabase.

```sh
npm run typecheck   # react-router typegen && tsc
npm run lint        # eslint (flat config)
npm run build
npm run preview     # build, then serve with wrangler
```

## Deployment

```sh
npm run deploy      # build + wrangler pages deploy
```

## SEO

Business facts live in one place, [`app/data/site.ts`](app/data/site.ts) — name,
address, phone, hours, amenities and the room rate card. Both the rendered pages
and the Schema.org JSON-LD are generated from it, so structured data can't drift
from what's actually on the page (Google treats schema describing absent content
as spam).

- `app/lib/seo.ts` — `buildMeta()` builds title, description, canonical, Open
  Graph and Twitter tags for every route.
- `app/lib/structured-data.ts` — the Schema.org graph: `Hotel`/`LodgingBusiness`
  with per-room `HotelRoom` offers, plus `Restaurant`, `BarOrPub`, `WebSite`,
  `BreadcrumbList` and `FAQPage`.
- `app/routes/robots[.]txt.ts` and `app/routes/sitemap[.]xml.ts` are generated
  at request time from the same constants.

The site-wide JSON-LD graph is rendered directly in `root.tsx`'s `Layout`, not
via a `meta` export: a leaf route's `meta` **replaces** the root's rather than
merging, so anything that must appear on every page belongs in `Layout`.

### After deploying

1. Submit `https://www.clavethotel.com/sitemap.xml` in Google Search Console.
2. Validate a few pages with the
   [Rich Results Test](https://search.google.com/test/rich-results).
3. Keep the Google Business Profile's name, address, phone and hours identical
   to `app/data/site.ts` — inconsistent NAP data hurts local ranking.
