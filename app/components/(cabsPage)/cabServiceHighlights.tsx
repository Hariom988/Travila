"use client";

import React from "react";
import {
  ShieldCheck,
  Sparkles,
  MapPinned,
  HeadphonesIcon,
  Star,
  CheckCircle,
  Clock4,
  PhoneCall,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <ShieldCheck size={24} className="text-blue-600 md:w-8 md:h-8" />,
    title: "Safety First",
    desc: "24/7 SOS support & live tracking.",
  },
  {
    icon: <Sparkles size={24} className="text-orange-500 md:w-8 md:h-8" />,
    title: "Hygiene",
    desc: "Sanitized cars for every trip.",
  },
  {
    icon: <MapPinned size={24} className="text-green-600 md:w-8 md:h-8" />,
    title: "Expert Pilots",
    desc: "Trained highway professionals.",
  },
  {
    icon: (
      <HeadphonesIcon size={24} className="text-purple-600 md:w-8 md:h-8" />
    ),
    title: "24/7 Support",
    desc: "Dedicated assistance mid-trip.",
  },
];

export default function CompactCabServiceHighlights() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-16 px-4">
      {/* HEADER SECTION - COMPACT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
            The Experience You <br className="hidden md:block" />
            <span className="text-blue-600">Actually Deserve</span>
          </h2>
          <p className="text-gray-500 mt-2 md:mt-4 text-sm md:text-lg">
            A promise of safety, punctuality, and a stress-free journey.
          </p>
        </div>

        {/* Compact Avatar Stack */}
        <div className="flex items-center gap-3 bg-gray-50 w-fit px-3 py-1.5 rounded-full border border-gray-100">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                className="h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-white object-cover"
                src={`https://i.pravatar.cc/100?u=user${i}`}
                alt="User"
              />
            ))}
          </div>
          <span className="text-[10px] md:text-xs font-bold text-gray-600 tracking-tight">
            Trusted by 10k+ Travelers
          </span>
        </div>
      </div>

      {/* HIGHLIGHTS GRID - 2x2 on Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
        {HIGHLIGHTS.map((item, index) => (
          <div
            key={index}
            className="group p-4 md:p-8 bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 hover:border-blue-100 transition-all"
          >
            <div className="mb-3 md:mb-6 p-2 md:p-4 bg-gray-50 rounded-xl w-fit group-hover:bg-blue-50 transition-colors">
              {item.icon}
            </div>
            <h4 className="text-sm md:text-xl font-black text-gray-800 mb-1 md:mb-3">
              {item.title}
            </h4>
            <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* BOTTOM TRUST BAR - REPLACED APP PART */}
      <div className="mt-8 md:mt-16 p-6 md:p-8 bg-gray-900 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-blue-600/10 skew-x-12 translate-x-16 md:translate-x-32" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-4 md:gap-6 text-center lg:text-left">
            <div className="h-12 w-12 md:h-16 md:w-16 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/40">
              <PhoneCall className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white text-base md:text-xl font-black italic tracking-tight">
                Priority 24/7 Support
              </h3>
              <p className="text-gray-400 text-[10px] md:text-sm">
                Human assistance available for every mile of your trip.
              </p>
            </div>
          </div>

          {/* Stat Badges - Hidden on very small screens or condensed */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-y lg:border-none border-white/10 py-4 lg:py-0">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle size={16} className="text-blue-500" />
              <span className="text-[10px] md:text-sm font-bold tracking-tight">
                Verified Pilots
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Star size={16} className="text-blue-500" />
              <span className="text-[10px] md:text-sm font-bold tracking-tight">
                4.8 Rating
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock4 size={16} className="text-blue-500" />
              <span className="text-[10px] md:text-sm font-bold tracking-tight">
                On-Time Arrival
              </span>
            </div>
          </div>

          <button className="bg-white text-blue-600 font-black px-6 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors text-xs md:text-base whitespace-nowrap">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
