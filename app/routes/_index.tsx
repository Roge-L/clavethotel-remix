import type { LinksFunction, MetaFunction } from "react-router";
import { Link } from "react-router";
import { BUSINESS, LOWEST_RATE, ROOMS, formatRate } from "~/data/site";
import { buildMeta } from "~/lib/seo";

export const meta: MetaFunction = ({ location }) =>
  buildMeta({
    title: `Motel in Clavet, SK — 15 Minutes from Saskatoon`,
    description: `Clean, comfortable rooms from ${formatRate(
      LOWEST_RATE
    )} a night, 15 minutes from Saskatoon. On-site café, bar and liquor store. Call ${
      BUSINESS.telephoneDisplay
    } to book.`,
    pathname: location.pathname,
  });

export const links: LinksFunction = () => [
  // The hero is the LCP element on the home page.
  { rel: "preload", as: "image", href: "/cover.webp", fetchPriority: "high" },
];

const highlights = [
  {
    icon: "📶",
    label: "Free WiFi",
    detail: "High-speed internet in every room",
  },
  { icon: "🚗", label: "15 minutes", detail: "From Saskatoon along Highway 16" },
  { icon: "🍽️", label: "Café & bar", detail: "Chinese and Western, on site" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-screen">
        <img
          src="/cover.webp"
          alt="Clavet Motor Inn at dusk on the Saskatchewan prairie"
          width={1920}
          height={1440}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative flex h-full flex-col items-center justify-center bg-black/45 pt-20">
          <header className="flex flex-col items-center gap-9">
            <div className="animate-fadeInOneSecond flex flex-col items-center text-center text-white">
              <p className="tracking-widest text-xl">WELCOME TO</p>
              <h1 className="font-serif text-6xl md:text-9xl">
                Clavet Motor Inn
              </h1>
              <p className="font-serif text-2xl md:text-4xl">
                {BUSINESS.tagline}
              </p>
            </div>
            <div className="animate-fadeInOneAndAHalfSecond tracking-widest">
              <Link
                to="/book"
                className="mx-auto mt-16 block max-w-7xl bg-white px-20 py-2 text-center text-black transition duration-500 hover:scale-105 hover:bg-slate-50"
              >
                Book Now
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Description */}
      <section className="flex min-h-[600px] justify-center bg-white px-4 py-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 text-left font-serif text-black">
            <h2 className="mb-4 text-3xl">
              A prairie sanctuary in Clavet, where comfort meets convenience.
            </h2>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="border-l-2 border-gray-200 pl-4">
                  <p className="mb-1 flex items-center gap-2 font-semibold">
                    <span aria-hidden="true" className="text-lg">
                      {item.icon}
                    </span>
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xl text-gray-700">
              Whether you&apos;re here for work, visiting family, or just
              passing through, we offer clean, comfortable rooms at reasonable
              rates. Join us at our café and bar to experience true
              Saskatchewan hospitality.
            </p>
          </div>
          <div className="relative w-full md:w-1/3">
            <img
              src="/sunsets-01.webp"
              alt="Sunset over the Saskatchewan prairie near Clavet"
              width={1080}
              height={1347}
              loading="lazy"
              decoding="async"
              className="aspect-[2/3] w-full rounded-lg object-cover shadow-lg"
            />
            <div className="absolute bottom-2 right-2 text-xs text-white opacity-70 transition-opacity hover:opacity-100">
              <a
                href="https://herry.ca/saskatchewan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Photo: Herry Himanshu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="flex flex-col items-center bg-gray-50 px-4 py-20 text-black">
        <h2 className="mb-4 font-serif text-4xl">Our Rooms</h2>
        <p className="mb-12 text-gray-600">
          Rates are per night and exclude GST/PST.
        </p>
        <div className="w-full max-w-6xl">
          <div className="mb-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ROOMS.map((room) => (
              <Link
                key={room.slug}
                to="/rooms"
                className="block overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 hover:scale-105"
              >
                <div className="aspect-video w-full">
                  <img
                    src={room.image}
                    alt={room.imageAlt}
                    width={1600}
                    height={1066}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-sm text-gray-600">
                    Sleeps {room.occupancy}
                  </p>
                  <h3 className="mb-2 font-serif text-xl font-semibold">
                    {room.name}
                  </h3>
                  <p className="mb-2 text-xs text-gray-600">{room.beds}</p>
                  <p className="text-gray-800">
                    from {formatRate(room.price)} per night
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center text-xs text-gray-500">
            Room photography by{" "}
            <a
              href="https://www.johnlyrealestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              John Ly Real Estate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
