import type { MetaFunction } from "@remix-run/cloudflare";
import { Phone } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Your Stay - Clavet Motor Inn" },
    {
      name: "description",
      content:
        "Book your stay at Clavet Motor Inn. Clean, comfortable rooms at reasonable rates.",
    },
  ];
};

export default function Book() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="font-serif text-3xl text-center mb-8 text-gray-700">
            Book Your Stay
          </h1>

          {/* Room Types and Rates */}
          <div className="mb-8">
            <h2 className="font-medium text-slate-900 mb-4 text-xl">
              Our Rooms
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">
                  Standard Queen Room
                </h3>
                <p className="text-slate-600 mt-1">
                  Starting at $89.99/night + tax
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">
                  Double Queen Room
                </h3>
                <p className="text-slate-600 mt-1">
                  Starting at $99.99/night + tax
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">King Room</h3>
                <p className="text-slate-600 mt-1">
                  Starting at $109.99/night + tax
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">Kitchen Suite</h3>
                <p className="text-slate-600 mt-1">
                  Starting at $119.99/night + tax
                </p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="mb-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h2 className="font-medium text-slate-900 mb-4">
              Important Information
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Check-in time: After 3:00 PM
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Check-out time: Before 11:00 AM
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>A $200 refundable
                damage deposit is required at check-in
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                All prices are subject to applicable taxes (GST/PST)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Strictly no smoking in rooms - violations subject to $250
                cleaning fee
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Valid government-issued ID and credit card required at check-in
              </li>
            </ul>
          </div>

          {/* Call to Book Section */}
          <div className="text-center">
            <h2 className="text-xl font-medium text-slate-900 mb-4">
              Ready to Book?
            </h2>
            <p className="text-slate-600 mb-6">
              Call us directly to make your reservation. Our friendly staff is
              ready to assist you.
            </p>
            <a
              href="tel:1-306-242-2848"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-md hover:bg-slate-800 transition-colors"
            >
              <Phone size={20} />
              Call to Book: 1-306-242-2848
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
