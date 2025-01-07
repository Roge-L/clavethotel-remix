import { useState, FormEvent } from "react";
import { Form } from "@remix-run/react";
import {
  formatPhoneNumber,
  rooms,
  validateForm,
  ValidationErrors,
} from "~/utils/booking";

export default function BookingForm() {
  const [selectedRoom, setSelectedRoom] = useState("standard-queen");
  const [showPolicies, setShowPolicies] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, clear errors and submit the form
    setErrors({});
    e.currentTarget.submit();
  };

  const ErrorMessage = ({ message }: { message?: string }) =>
    message ? <p className="text-red-600 text-sm mt-1">{message}</p> : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="font-serif text-3xl text-center mb-8 text-gray-700">
            Book Your Stay
          </h1>

          {/* Important Booking Information */}
          <div className="mb-8 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h2 className="font-medium text-slate-900 mb-3">
              Important Information
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
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
            </ul>
          </div>

          <Form method="post" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="room"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Room
                </label>
                <select
                  id="room"
                  name="room"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - ${room.price}/night + tax
                    </option>
                  ))}
                </select>
              </div>

              {/* Date inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    required
                    className={`w-full rounded-md shadow-sm p-2 border ${
                      errors.checkIn ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage message={errors.checkIn} />
                  <p className="text-xs text-gray-500 mt-1">
                    Check-in after 3:00 PM
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="checkOut"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    required
                    className={`w-full rounded-md shadow-sm p-2 border ${
                      errors.checkOut ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage message={errors.checkOut} />
                  <p className="text-xs text-gray-500 mt-1">
                    Check-out before 11:00 AM
                  </p>
                </div>
              </div>

              {/* Name inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className={`w-full rounded-md shadow-sm p-2 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage message={errors.firstName} />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className={`w-full rounded-md shadow-sm p-2 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage message={errors.lastName} />
                </div>
              </div>

              {/* Contact inputs */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full rounded-md shadow-sm p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage message={errors.email} />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  onInput={(e) => {
                    e.currentTarget.value = formatPhoneNumber(
                      e.currentTarget.value
                    );
                  }}
                  maxLength={14}
                  required
                  className={`w-full rounded-md shadow-sm p-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage message={errors.phone} />
              </div>

              {/* Special requests */}
              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={3}
                  className={`w-full rounded-md shadow-sm p-2 border ${
                    errors.specialRequests
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Please note that special requests cannot be guaranteed but we will do our best to accommodate them."
                />
                <ErrorMessage message={errors.specialRequests} />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum 500 characters. No links allowed.
                </p>
              </div>

              {/* Policies Toggle */}
              <div className="bg-gray-50 p-4 rounded-md">
                <button
                  type="button"
                  onClick={() => setShowPolicies(!showPolicies)}
                  className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-2"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showPolicies ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  View Booking Policies
                </button>

                {showPolicies && (
                  <div className="mt-4 text-sm text-gray-600 space-y-2">
                    <p>
                      • Damage deposit of $200 will be collected at check-in and
                      refunded upon room inspection
                    </p>
                    <p>• All rates are subject to 11% tax (5% GST + 6% PST)</p>
                    <p>
                      • Strictly no smoking in rooms - $250 cleaning fee for
                      violations
                    </p>
                    <p>
                      • Check-in: After 3:00 PM / Check-out: Before 11:00 AM
                    </p>
                    <p>
                      • Cancellations must be made 24 hours prior to check-in to
                      avoid charges
                    </p>
                    <p>
                      • Valid government-issued ID and credit card required at
                      check-in
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-slate-900 text-white px-8 py-3 rounded-md hover:bg-slate-800 transition-colors"
              >
                Submit Booking Request
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
