"use client";

import React, { useState } from "react";
import { Coffee, Music, Utensils, Waves, Zap } from "lucide-react";

interface CabinCategory {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const CABINS: CabinCategory[] = [
  {
    id: "suite",
    title: "The Royal Suite",
    description:
      "Ultimate luxury with private balconies and 24/7 butler service.",
    features: ["Private Jacuzzi", "Priority Boarding", "Premium Mini-bar"],
    image:
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "balcony",
    title: "Ocean Balcony",
    description:
      "Wake up to fresh sea breeze every morning with a private view.",
    features: ["Private Veranda", "King-size Bed", "Sitting Area"],
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "interior",
    title: "Cosy Interior",
    description: "Great value comfort near the ship's main entertainment hubs.",
    features: ["Ambient Lighting", "En-suite Bath", "Climate Control"],
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
  },
];

const AMENITIES = [
  { icon: <Utensils size={20} />, label: "Fine Dining", desc: "Chef specials" },
  { icon: <Music size={20} />, label: "Live Shows", desc: "Theater" },
];

const CruiseExperience: React.FC = () => {
  const [activeCabin, setActiveCabin] = useState(CABINS[0]);

  return (
    <div className="bg-white py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-blue-600 font-bold tracking-widest md:tracking-[0.2em] uppercase text-[10px] md:text-sm">
            Luxury Accommodations
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mt-2">
            Home at Sea
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start mb-20 md:mb-32">
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 snap-x">
            {CABINS.map((cabin) => (
              <button
                key={cabin.id}
                onClick={() => setActiveCabin(cabin)}
                className={`shrink-0 cursor-pointer lg:w-full text-left p-4 lg:p-6 rounded-xl md:rounded-2xl transition-all border-2 snap-start ${
                  activeCabin.id === cabin.id
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-100 lg:border-transparent text-gray-500 bg-gray-50 lg:bg-transparent"
                }`}
              >
                <h3
                  className={`text-sm md:text-xl font-bold whitespace-nowrap ${activeCabin.id === cabin.id ? "text-blue-700" : ""}`}
                >
                  {cabin.title}
                </h3>
                <p className="hidden lg:block text-sm mt-1 line-clamp-1">
                  {cabin.description}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl md:rounded-4xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row min-h-100">
              <div className="md:w-3/5 h-48 md:h-auto">
                <img
                  src={activeCabin.image}
                  alt={activeCabin.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center">
                <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 md:mb-4">
                  {activeCabin.title}
                </h4>
                <p className="text-slate-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                  {activeCabin.description}
                </p>
                <ul className="grid grid-cols-1 gap-2 md:space-y-3">
                  {activeCabin.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[13px] md:text-sm font-medium text-slate-700"
                    >
                      <Zap size={14} className="text-blue-500 shrink-0" />{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white flex flex-col justify-center">
            <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">
              Onboard Fun
            </h3>
            <p className="text-slate-400 text-xs md:text-base mb-4 md:mb-6">
              From sunrise yoga to midnight parties.
            </p>
            <button className="w-fit cursor-pointer text-sm border-b-2 border-blue-500 pb-1 font-bold">
              Explore All
            </button>
          </div>

          {AMENITIES.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-5 md:p-8 rounded-2xl border border-gray-100"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-4 md:mb-6">
                {item.icon}
              </div>
              <h4 className="text-sm md:text-xl font-bold text-slate-800 mb-1">
                {item.label}
              </h4>
              <p className="text-slate-500 text-[10px] md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CruiseExperience;
