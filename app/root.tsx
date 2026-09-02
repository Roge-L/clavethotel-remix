import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import { Footer } from "~/components/layout/Footer";
import Navigation from "~/components/layout/Navigation";
import ErrorBoundary from "~/components/ErrorBoundary";
import { BUSINESS } from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { siteGraph } from "~/lib/structured-data";

import "./tailwind.css";

export { ErrorBoundary };

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    // Both families in one request. Playfair Display backs `font-serif`, which
    // the headings rely on; it was previously declared in CSS but never loaded.
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
  },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "manifest", href: "/site.webmanifest" },
];

/**
 * Fallback head for any route that doesn't export its own `meta`. A leaf
 * route's `meta` REPLACES this wholesale rather than merging with it, so
 * anything that must appear on every page belongs in `Layout` below, not here.
 */
export const meta: MetaFunction = ({ location }) =>
  buildMeta({
    title: BUSINESS.name,
    description: BUSINESS.description,
    pathname: location.pathname,
  });

/** JSON-LD is inlined as a string; `<` is escaped so it can't close the tag. */
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <html lang="en-CA">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="author" content={BUSINESS.name} />
        <meta name="geo.region" content="CA-SK" />
        <meta name="geo.placename" content={BUSINESS.address.locality} />
        <meta
          name="geo.position"
          content={`${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`}
        />
        <meta
          name="ICBM"
          content={`${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}`}
        />
        <Meta />
        <Links />
        {/*
          Rendered here rather than via the root `meta` export: route-level
          `meta` replaces the root's, which would drop the business graph from
          every page that defines its own title.
        */}
        <JsonLd data={siteGraph()} />
      </head>
      <body>
        {error ? (
          children
        ) : (
          <>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-3 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
            >
              Skip to main content
            </a>
            <Navigation />
            <main id="main" className={isHomePage ? "" : "pt-20"}>
              {children}
            </main>
            <Footer />
          </>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
