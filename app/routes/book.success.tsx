import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { buildMeta } from "~/lib/seo";

export const meta: MetaFunction = ({ location }) =>
  buildMeta({
    title: "Booking Request Received",
    description:
      "Thank you for your booking request at Clavet Motor Inn. Our team will be in touch shortly.",
    pathname: location.pathname,
    // A confirmation page has no standalone search value and would only
    // compete with /book for the same queries.
    noIndex: true,
  });

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 font-serif text-3xl">Booking Request Received</h1>
          <p className="mb-6 text-gray-600">
            Thank you for your booking request. Our management team will review
            your request and contact you shortly.
          </p>
          <Link
            to="/"
            className="inline-block rounded-md bg-slate-900 px-6 py-2 text-white transition-colors hover:bg-slate-800"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
