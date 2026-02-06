"use client";

import React, { useState } from "react";
import {
  Ship,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  ShieldCheck,
  Compass,
  Anchor,
  CheckCircle2,
} from "lucide-react";

interface CruiseDeal {
  id: number;
  title: string;
  line: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  tags: string[];
}

const CRUISE_DEALS: CruiseDeal[] = [
  {
    id: 1,
    title: "Singapore & Thailand Special",
    line: "Royal Caribbean",
    duration: "4 Nights / 5 Days",
    price: "₹45,500",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800",
    tags: ["Best Seller"],
  },
  {
    id: 2,
    title: "Greek Islands Odyssey",
    line: "MSC Cruises",
    duration: "7 Nights / 8 Days",
    price: "₹1,12,000",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=800",
    tags: ["Luxury"],
  },
  {
    id: 3,
    title: "Bahamas Escape",
    line: "Norwegian Line",
    duration: "3 Nights / 4 Days",
    price: "₹38,900",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1500021804447-2ca2eaaaabeb?auto=format&fit=crop&q=80&w=800",
    tags: ["Weekend"],
  },
];

const Cruise: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <section className="relative h-70 md:h-125 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=1600"
            alt="Cruise Background"
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-7xl font-black mb-30 tracking-tight">
            CRUISE
          </h1>
        </div>
      </section>

      <section className="relative -mt-20 md:-mt-55 z-20 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-5 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-blue-100 p-1.5 rounded-lg">
              <Ship className="text-blue-600 w-5 h-5" />
            </div>
            <h2 className="text-base md:text-xl font-bold text-gray-800">
              Book Your Cruise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-blue-50 transition-colors">
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                <MapPin size={12} /> Destination{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full bg-transparent text-lg md:text-2xl font-black text-gray-800 focus:outline-none appearance-none cursor-pointer"
                onChange={(e) => setSelectedDest(e.target.value)}
              >
                <option value="">Select</option>
                <option value="singapore">Singapore</option>
                <option value="dubai">Dubai</option>
                <option value="europe">Europe</option>
              </select>
            </div>

            <div className="p-4 hover:bg-blue-50 transition-colors">
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                <Calendar size={12} /> Travel Month
              </label>
              <select className="w-full bg-transparent text-lg md:text-2xl font-black text-gray-800 focus:outline-none appearance-none cursor-pointer">
                <option value="">Any Month</option>
                <option value="mar-24">March 2024</option>
                <option value="apr-24">April 2024</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center -mb-10 md:-mb-14 mt-6">
            <button className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 text-white px-8 md:px-16 py-3 md:py-4 rounded-full text-lg md:text-2xl font-bold shadow-lg active:scale-95 transition-all uppercase">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="pt-16 md:pt-24 pb-12 max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 leading-tight">
              Handpicked Deals
            </h2>
            <p className="text-xs md:text-base text-gray-500">
              Top-rated cruise lines
            </p>
          </div>
          <button className="text-blue-600 cursor-pointer text-sm font-bold flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {CRUISE_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="min-w-70 md:min-w-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 snap-start"
            >
              <div className="relative h-40 md:h-56">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  {deal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="flex items-center gap-1 mb-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-bold text-gray-500">
                    {deal.rating}
                  </span>
                </div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                  {deal.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {deal.line} • {deal.duration}
                </p>

                <div className="flex items-center justify-between border-t pt-3">
                  <div>
                    <span className="text-[10px] text-gray-400 block leading-none">
                      From
                    </span>
                    <span className="text-lg md:text-2xl font-black text-blue-700">
                      {deal.price}
                    </span>
                  </div>
                  <button className="cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded-lg font-bold text-xs">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-900 py-12 md:py-20 text-white rounded-4xl md:rounded-none mx-2 md:mx-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black mb-3">
              Why Sail With Us?
            </h2>
            <div className="w-12 h-1 bg-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard
              icon={
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              }
              title="Safe Travels"
              desc="24/7 support at sea."
            />
            <FeatureCard
              icon={<Compass className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />}
              title="Expert Help"
              desc="Guided by pros."
            />
            <FeatureCard
              icon={<Anchor className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />}
              title="Best Prices"
              desc="Price match guarantee."
            />
            <FeatureCard
              icon={
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              }
              title="Easy Booking"
              desc="No hidden fees."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
    <div className="flex justify-center mb-3">{icon}</div>
    <h3 className="text-xs md:text-lg font-bold mb-1">{title}</h3>
    <p className="text-blue-100/60 text-[10px] md:text-sm leading-tight">
      {desc}
    </p>
  </div>
);

export default Cruise;
