import React, { useState } from "react";
import { Form } from "@remix-run/react";
export default function BookingForm() {
  const [selectedRoom, setSelectedRoom] = useState("standard-queen");

  const rooms = [
    { id: "standard-queen", name: "Standard Queen Room", price: "109" },
    { id: "king-room", name: "King Room", price: "129" },
    { id: "double-queen", name: "Double Queen Room", price: "149" },
    { id: "family-room", name: "Family Room", price: "139" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="font-serif text-3xl text-center mb-8 text-gray-700">
            Book Your Stay
          </h1>

          <Form method="post" className="space-y-6">
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
                      {room.name} - ${room.price}/night
                    </option>
                  ))}
                </select>
              </div>

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
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
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
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
              </div>

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
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
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
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
              </div>

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
                  className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
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
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>

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
                  className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
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
