import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  AMENITIES,
  BUSINESS,
  CHECK_IN_TIME,
  CHECK_OUT_TIME,
  HIGHEST_RATE,
  LOWEST_RATE,
  ROOMS,
  formatRate,
} from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { breadcrumbs } from "~/lib/structured-data";

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "Rooms & Rates",
    description: `Four room types from ${formatRate(
      LOWEST_RATE
    )} to ${formatRate(
      HIGHEST_RATE
    )} per night plus tax: queen, double queen, king and kitchen suite. All non-smoking, free WiFi and parking.`,
    pathname: location.pathname,
  }),
  { "script:ld+json": breadcrumbs([{ name: "Rooms & Rates", path: "/rooms" }]) },
];

export default function Rooms() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl text-slate-900 md:text-5xl">
            Rooms &amp; Rates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Every room is non-smoking and comes with free high-speed WiFi and
            free parking at the door. Rates are per night and exclude GST/PST.
          </p>
        </header>

        <div className="space-y-8">
          {ROOMS.map((room) => (
            <article
              key={room.slug}
              id={room.slug}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row"
            >
              <div className="md:w-2/5">
                <img
                  src={room.image}
                  alt={room.imageAlt}
                  width={1600}
                  height={1066}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover md:h-full"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-8">
                <h2 className="font-serif text-2xl text-slate-900">
                  {room.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {room.beds} · Sleeps {room.occupancy}
                </p>
                <p className="mt-4 text-slate-700">{room.description}</p>
                <p className="mt-4 text-xl font-medium text-slate-900">
                  {formatRate(room.price)}{" "}
                  <span className="text-base font-normal text-slate-500">
                    per night + tax
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-8">
          <h2 className="font-serif text-2xl text-slate-900">
            What&apos;s included
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-slate-700 sm:grid-cols-2 md:grid-cols-3">
            {AMENITIES.map((amenity) => (
              <li key={amenity} className="flex items-start gap-2">
                <span aria-hidden="true" className="text-slate-400">
                  •
                </span>
                {amenity}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600">
            Check-in from {CHECK_IN_TIME}, check-out by {CHECK_OUT_TIME}. A $200
            refundable damage deposit is collected at check-in.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            to="/book"
            className="inline-block rounded-md bg-slate-900 px-8 py-3 text-white transition-colors hover:bg-slate-800"
          >
            Book a room — {BUSINESS.telephoneDisplay}
          </Link>
        </div>
      </div>
    </div>
  );
}
