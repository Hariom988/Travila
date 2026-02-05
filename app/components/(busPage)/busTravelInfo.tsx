"use client";

import React from "react";
import {
  InformationCircleIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ClockIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// --- DEMO DATA ---
const BUS_CLASSES = [
  {
    title: "AC Sleeper",
    description: "Best for overnight long-distance travel.",
    features: [
      "Flat Bed (1+2)",
      "Pillow & Blanket",
      "Privacy Curtains",
      "Reading Light",
    ],
    level: "Premium",
    color: "bg-purple-600",
  },
  {
    title: "Semi-Sleeper",
    description: "Comfortable for 5-8 hour journeys.",
    features: [
      "Reclining Seats",
      "Calf Support",
      "Extra Legroom",
      "USB Charging",
    ],
    level: "Popular",
    color: "bg-blue-600",
  },
  {
    title: "Standard Seater",
    description: "Economical for short day-trips.",
    features: ["2+2 Layout", "Push-back Seats", "Standard AC", "Window Views"],
    level: "Budget",
    color: "bg-slate-700",
  },
];

const TRAVEL_TIPS = [
  {
    icon: <ClockIcon className="h-6 w-6 text-orange-500" />,
    title: "Boarding Time",
    info: "Arrive at your boarding point at least 15 minutes before departure.",
  },
  {
    icon: <BriefcaseIcon className="h-6 w-6 text-blue-500" />,
    title: "Luggage Policy",
    info: "Standard limit is 15kg per person. Large items may require extra fee.",
  },
  {
    icon: <NoSymbolIcon className="h-6 w-6 text-red-500" />,
    title: "Cancellation",
    info: "Get 100% refund if cancelled 24 hours before the trip starts.",
  },
];

export default function BusTravelInfo() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
          New to Bus Travel? Here’s everything you need to know.
        </h2>
        <p className="text-gray-500 font-medium">
          Whether it's your first time or you're a frequent traveler, our guide
          helps you pick the right bus for your journey.
        </p>
      </div>

      {/* 2. BUS CLASS COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BUS_CLASSES.map((bus, idx) => (
          <div
            key={idx}
            className="group cursor-pointer relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Class Badge */}
            <div
              className={`inline-block px-3 py-1 rounded-full ${bus.color} text-white text-[10px] font-black uppercase tracking-widest mb-4`}
            >
              {bus.level}
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-2">
              {bus.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
              {bus.description}
            </p>

            <ul className="space-y-3">
              {bus.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-gray-700"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  {feat}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                Learn more about this class{" "}
                <InformationCircleIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ESSENTIAL TRAVEL TIPS (Bento Box Style) */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3 text-white space-y-4">
            <h2 className="text-3xl font-black leading-tight">
              Travel smart with our essential tips
            </h2>
            <p className="text-blue-200 text-sm font-medium">
              Small things that make a big difference for your journey
              experience.
            </p>
            <div className="pt-4 flex items-center gap-3 text-green-400 font-bold text-sm">
              <ShieldCheckIcon className="h-6 w-6" />
              <span>Travel Insurance Included</span>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRAVEL_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white/5 cursor-pointer  backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="bg-white p-2 rounded-lg inline-block mb-4 shadow-lg">
                  {tip.icon}
                </div>
                <h4 className="text-white font-black mb-2 tracking-tight">
                  {tip.title}
                </h4>
                <p className="text-blue-100/60 text-xs font-medium leading-relaxed">
                  {tip.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
