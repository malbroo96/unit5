import React from "react";

export default function Form() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-100 via-rose-100 to-green-100">
      <div className="bg-white/90 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-green-200">
        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Enter Your Details 🌿
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            placeholder="Name"
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-500"
          />

          <input
            placeholder="Email ID"
            type="email"
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-500"
          />

          <input
            placeholder="Mobile"
            type="tel"
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-500"
          />

          <input
            placeholder="Age"
            type="number"
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-500"
          />

          <input
            placeholder="Weight (kg)"
            type="number"
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-500"
          />

          <input
            placeholder="Height (cm)"
            type="number"
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-500"
          />

          <select
            onChange={(e) => console.log(e.target.value)}
            className="px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700 bg-white/80"
          >
            <option value="">Set your Goal</option>
            <option value="lose weight">Lose Weight</option>
            <option value="gain weight">Gain Weight</option>
            <option value="maintain weight">Maintain Weight</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
