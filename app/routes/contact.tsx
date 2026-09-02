import type { MetaFunction } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, CAFE_HOURS, INN_HOURS } from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { breadcrumbs } from "~/lib/structured-data";

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "Contact & Directions",
    description: `Clavet Motor Inn is at ${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} — 15 minutes east of Saskatoon. Call ${BUSINESS.telephoneDisplay} or email ${BUSINESS.email}.`,
    pathname: location.pathname,
  }),
  {
    "script:ld+json": breadcrumbs([
      { name: "Contact & Directions", path: "/contact" },
    ]),
  },
];

function hoursLabel(days: readonly string[]) {
  if (days.length === 1) return days[0];
  return `${days[0]} – ${days[days.length - 1]}`;
}

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`;

export default function Contact() {
  return (
    <div className="bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl text-slate-900 md:text-5xl">
            Contact &amp; Directions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We&apos;re on Main Street in Clavet, about 15 minutes east of
            Saskatoon on Highway 16. Reservations are taken by phone.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="font-serif text-2xl text-slate-900">Get in touch</h2>
            <ul className="mt-6 space-y-5 text-slate-700">
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 shrink-0 text-slate-400" />
                <a
                  href={`tel:${BUSINESS.telephone}`}
                  className="hover:underline"
                >
                  {BUSINESS.telephoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-1 shrink-0 text-slate-400" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:underline"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0 text-slate-400" />
                <address className="not-italic">
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.locality}, {BUSINESS.address.region}{" "}
                  {BUSINESS.address.postalCode}
                  <br />
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </address>
              </li>
            </ul>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="font-serif text-2xl text-slate-900">Hours</h2>
            <div className="mt-6 space-y-6 text-slate-700">
              <div>
                <p className="font-medium text-slate-900">
                  Front desk, bar &amp; liquor store
                </p>
                {INN_HOURS.map((h) => (
                  <p key={h.opens}>
                    {hoursLabel(h.days)}: {h.opens} – {h.closes}
                  </p>
                ))}
                <p className="text-slate-500">Sunday: closed</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Clavet Café</p>
                {CAFE_HOURS.map((h) => (
                  <p key={h.opens}>
                    {hoursLabel(h.days)}: {h.opens} – {h.closes}
                  </p>
                ))}
                <p className="text-slate-500">Weekends: closed</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg shadow-lg">
          <iframe
            title="Map showing Clavet Motor Inn on Main Street, Clavet, Saskatchewan"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              BUSINESS.geo.longitude - 0.01
            },${BUSINESS.geo.latitude - 0.006},${
              BUSINESS.geo.longitude + 0.01
            },${BUSINESS.geo.latitude + 0.006}&layer=mapnik&marker=${
              BUSINESS.geo.latitude
            },${BUSINESS.geo.longitude}`}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
