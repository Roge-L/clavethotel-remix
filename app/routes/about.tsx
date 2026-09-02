import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { AMENITIES, BUSINESS } from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { breadcrumbs, faqPage } from "~/lib/structured-data";

const FAQS = [
  {
    question: "How far is Clavet Motor Inn from Saskatoon?",
    answer:
      "About 15 minutes. Clavet sits just off Highway 16 southeast of Saskatoon, so the drive to the city is short and straightforward.",
  },
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in is after 3:00 PM and check-out is before 11:00 AM. A $200 refundable damage deposit is collected at check-in.",
  },
  {
    question: "How do I make a reservation?",
    answer: `Reservations are taken by phone at ${BUSINESS.telephoneDisplay}. Our front desk is open Monday to Saturday, 11:00 AM to 11:00 PM.`,
  },
  {
    question: "Is there food and drink on site?",
    answer:
      "Yes. Clavet Café serves Chinese and Western dishes weekdays from 11:00 AM to 8:00 PM, and the bar — with VLTs, a pool table and an outdoor patio — is open Monday to Saturday. There is also a liquor store on site.",
  },
  {
    question: "Are the rooms non-smoking?",
    answer:
      "All rooms are strictly non-smoking. Smoking in a room results in a $250 cleaning fee.",
  },
];

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "About Us",
    description:
      "Clavet Motor Inn is a family-run motel, café, bar and liquor store in the village of Clavet, Saskatchewan — the local hub, 15 minutes from Saskatoon.",
    pathname: location.pathname,
  }),
  { "script:ld+json": breadcrumbs([{ name: "About Us", path: "/about" }]) },
  { "script:ld+json": faqPage(FAQS) },
];

export default function About() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl text-slate-900 md:text-5xl">
            About Clavet Motor Inn
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {BUSINESS.tagline}
          </p>
        </header>

        <div className="space-y-6 text-lg leading-relaxed text-slate-700">
          <p>
            Clavet Motor Inn sits on Main Street in the village of Clavet,
            Saskatchewan — a short 15-minute drive southeast of Saskatoon along
            Highway 16. We&apos;re a small, family-run operation, and for a lot
            of people passing through this stretch of prairie we&apos;re the
            only place to stay, eat and unwind for miles.
          </p>
          <p>
            That means we wear a few hats. Under one roof you&apos;ll find the
            motel, Clavet Café serving Chinese and Western comfort food, a bar
            with VLTs and a full-sized pool table, an outdoor patio for warm
            evenings, and the village liquor store. Guests, farm crews, work
            crews and neighbours all end up in the same room — which is
            exactly how we like it.
          </p>
          <p>
            The rooms are simple and honest: clean, comfortable, non-smoking,
            with free high-speed WiFi and free parking right outside the door.
            No resort fees, no surprises. Whether you&apos;re here for work,
            visiting family, or just breaking up a long drive, we&apos;ll look
            after you.
          </p>
        </div>

        <section className="mt-12 rounded-lg bg-gray-50 p-8">
          <h2 className="font-serif text-2xl text-slate-900">
            What you&apos;ll find here
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
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl text-slate-900">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-slate-200 p-6"
              >
                <dt className="font-medium text-slate-900">{faq.question}</dt>
                <dd className="mt-2 text-slate-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/rooms"
            className="rounded-md bg-slate-900 px-8 py-3 text-white transition-colors hover:bg-slate-800"
          >
            See rooms &amp; rates
          </Link>
          <Link
            to="/contact"
            className="rounded-md border border-slate-300 px-8 py-3 text-slate-900 transition-colors hover:bg-slate-50"
          >
            Find us
          </Link>
        </div>
      </div>
    </div>
  );
}
