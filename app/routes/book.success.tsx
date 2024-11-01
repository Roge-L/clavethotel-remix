import { Link } from "@remix-run/react";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="font-serif text-3xl mb-4">Booking Request Received</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your booking request. Our management team will review
            your request and contact you shortly.
          </p>
          <Link
            to="/"
            className="inline-block bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
