import Link from "next/link";
import React from "react";

export default function AutoBookingPage() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-300 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-lime-700 mb-6">
          Auto Booking
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">
              Pickup Location
            </label>
            <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">
              Drop Location
            </label>
            <input
              type="text"
              placeholder="Enter drop location"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-300">
              Booking Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-500"
            />
          </div>

          <Link href="/overauto">
            <button
              type="submit"
              className="w-full bg-lime-600 text-white py-2 rounded-md hover:bg-lime-700 transition"
            >
              Confirm Booking
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
