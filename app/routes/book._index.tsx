import type { MetaFunction } from "react-router";
import { Phone } from "lucide-react";
import {
  BUSINESS,
  HIGHEST_RATE,
  LOWEST_RATE,
  ROOMS,
  formatRate,
} from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { breadcrumbs } from "~/lib/structured-data";

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "Book Your Stay",
    description: `Reserve a room at Clavet Motor Inn, 15 minutes from Saskatoon. Rates from ${formatRate(
      LOWEST_RATE
    )} to ${formatRate(HIGHEST_RATE)} per night plus tax. Call ${
      BUSINESS.telephoneDisplay
    } to book.`,
    pathname: location.pathname,
  }),
  { "script:ld+json": breadcrumbs([{ name: "Book Your Stay", path: "/book" }]) },
];

const POLICIES = [
  "Check-in time: After 3:00 PM",
  "Check-out time: Before 11:00 AM",
  "A $200 refundable damage deposit is required at check-in",
  "All prices are subject to applicable taxes (GST/PST)",
  "Strictly no smoking in rooms — violations subject to a $250 cleaning fee",
  "Valid government-issued ID and credit card required at check-in",
];

export default function Book() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-center font-serif text-3xl text-slate-900">
            Book Your Stay
          </h1>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-medium text-slate-900">
              Our Rooms
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {ROOMS.map((room) => (
                <div
                  key={room.slug}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-medium text-slate-800">{room.name}</h3>
                  <p className="mt-1 text-slate-600">
                    Starting at {formatRate(room.price)}/night + tax
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 font-medium text-slate-900">
              Important Information
            </h2>
            <ul className="space-y-3 text-slate-700">
              {POLICIES.map((policy) => (
                <li key={policy} className="flex items-start">
                  <span aria-hidden="true" className="mr-2 text-red-500">
                    •
                  </span>
                  {policy}
                </li>
              ))}
            </ul>
          </section>

          <div className="text-center">
            <h2 className="mb-4 text-xl font-medium text-slate-900">
              Ready to Book?
            </h2>
            <p className="mb-6 text-slate-600">
              Call us directly to make your reservation. Our friendly staff is
              ready to assist you.
            </p>
            <a
              href={`tel:${BUSINESS.telephone}`}
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-8 py-3 text-white transition-colors hover:bg-slate-800"
            >
              <Phone size={20} aria-hidden="true" />
              Call to Book: {BUSINESS.telephoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
