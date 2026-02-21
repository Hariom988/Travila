"use client";

import { useState } from "react";
import {
  MapPinIcon,
  ClockIcon,
  StarIcon,
  ChevronRightIcon,
  GiftIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FireIcon, BoltIcon, SparklesIcon } from "@heroicons/react/24/solid";

const STATS = [
  { value: "1M+", label: "Happy Riders", emoji: "😊" },
  { value: "250+", label: "Cities Covered", emoji: "🏙️" },
  { value: "15K+", label: "Verified Drivers", emoji: "🧑‍✈️" },
  { value: "4.8★", label: "Average Rating", emoji: "⭐" },
];

const POPULAR_ROUTES = [
  {
    from: "Delhi",
    to: "Agra",
    price: "2,499",
    duration: "4h",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80",
    rating: "4.9",
    cabs: "Sedan / SUV",
    highlight: "Taj Mahal Trip",
  },
  {
    from: "Mumbai",
    to: "Pune",
    price: "1,499",
    duration: "3h",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=400&q=80",
    rating: "4.8",
    cabs: "Hatchback / Sedan",
    highlight: "Expressway Route",
  },
  {
    from: "Bangalore",
    to: "Mysore",
    price: "1,799",
    duration: "3.5h",
    image:
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=400&q=80",
    rating: "4.7",
    cabs: "Sedan / SUV",
    highlight: "Royal Heritage",
  },
  {
    from: "Chennai",
    to: "Pondicherry",
    price: "1,999",
    duration: "3h",
    image:
      "https://images.unsplash.com/photo-1607650424823-d4a9b52fe0c7?auto=format&fit=crop&w=400&q=80",
    rating: "4.8",
    cabs: "Hatchback / Sedan",
    highlight: "Coastal Drive",
  },
];

const OFFERS = [
  {
    id: 1,
    code: "FIRSTRIDE",
    discount: "Flat ₹300 Off",
    desc: "On your first cab booking",
    color: "from-rose-500 to-pink-500",
    badge: "NEW USER",
    expiry: "Limited time",
  },
  {
    id: 2,
    code: "OUTSTATION20",
    discount: "20% Cashback",
    desc: "On all outstation trips",
    color: "from-blue-600 to-indigo-600",
    badge: "HOT DEAL",
    expiry: "Ends 28 Feb",
  },
  {
    id: 3,
    code: "AIRPORTCAB",
    discount: "₹150 Off",
    desc: "On airport pickup & drop",
    color: "from-emerald-500 to-teal-500",
    badge: "AIRPORT",
    expiry: "Always on",
  },
];

const AMENITIES = [
  {
    icon: "❄️",
    title: "Air Conditioned",
    desc: "All cabs come with working AC as standard — no surprises on hot days.",
  },
  {
    icon: "📍",
    title: "Live GPS Tracking",
    desc: "Share your real-time trip link with family for complete peace of mind.",
  },
  {
    icon: "🔌",
    title: "USB Charging",
    desc: "Stay charged throughout the journey with in-car USB power outlets.",
  },
  {
    icon: "💼",
    title: "Boot Space",
    desc: "Generous luggage capacity across all cab categories — ideal for trips.",
  },
  {
    icon: "🧼",
    title: "Sanitized Cabs",
    desc: "Every cab is cleaned and sanitized before your pickup — guaranteed.",
  },
  {
    icon: "🎵",
    title: "Music System",
    desc: "Enjoy your playlist via Bluetooth or built-in aux — your ride, your vibe.",
  },
];

const REVIEWS = [
  {
    name: "Priya Nair",
    route: "Bangalore → Coorg",
    text: "Driver was on time, car was spotless, and the journey was super smooth. Will definitely book again for my next hill station trip.",
    rating: 5,
    initials: "PN",
    cabType: "SUV",
    time: "3 days ago",
  },
  {
    name: "Arjun Mehta",
    route: "Delhi → Jaipur",
    text: "Best outstation cab experience. The driver knew all the pit stops and even helped with luggage. Great value for money.",
    rating: 5,
    initials: "AM",
    cabType: "Sedan",
    time: "1 week ago",
  },
  {
    name: "Sunita Iyer",
    route: "Mumbai Airport",
    text: "Booked an airport cab at 3am — driver was waiting at arrivals. AC was perfect. 10/10 for professionalism.",
    rating: 5,
    initials: "SI",
    cabType: "Hatchback",
    time: "2 weeks ago",
  },
];

export default function CabDiscovery() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors"
              >
                <span className="text-xl md:text-2xl">{stat.emoji}</span>
                <div>
                  <p className="text-base md:text-xl font-black text-gray-900 leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-14 space-y-10 md:space-y-16">
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none flex items-center gap-2">
                <GiftIcon className="w-5 h-5 md:w-7 md:h-7 text-rose-500" />
                Cab Offers & Deals
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                Exclusive discounts on every ride
              </p>
            </div>
            <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
              All Offers <ChevronRightIcon className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className={`bg-linear-to-br ${offer.color} rounded-2xl p-4 md:p-5 text-white relative overflow-hidden shadow-md`}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                <div className="relative z-10">
                  <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full tracking-widest uppercase">
                    {offer.badge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mt-2 leading-none">
                    {offer.discount}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm mt-1">
                    {offer.desc}
                  </p>

                  <div className="flex items-center justify-between mt-4 bg-white/20 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/70 font-medium">
                        Code:
                      </span>
                      <span className="text-sm font-black tracking-widest">
                        {offer.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="text-[10px] cursor-pointer font-black bg-white text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
                    >
                      {copiedCode === offer.code ? "✓ Copied" : "COPY"}
                    </button>
                  </div>

                  <p className="text-[10px] text-white/60 mt-2 flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" /> {offer.expiry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none flex items-center gap-2">
                <FireIcon className="w-5 h-5 md:w-7 md:h-7 text-orange-500" />
                Popular Outstation Routes
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                Most booked routes — great pricing, great drivers
              </p>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {POPULAR_ROUTES.map((route, i) => (
              <div
                key={i}
                className="snap-start flex-none w-64 md:w-auto bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <p className="text-white font-black text-sm leading-tight">
                      {route.from}
                      <span className="text-white/70"> → </span>
                      {route.to}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <StarIcon className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    {route.rating}
                  </div>
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                    {route.highlight}
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                        <ClockIcon className="w-3 h-3" /> {route.duration}
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 text-right">
                        Starts at
                      </p>
                      <p className="text-sm font-black text-blue-600">
                        ₹{route.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {route.cabs}
                    </span>
                    <button className="text-[10px] font-black text-blue-600 flex items-center gap-0.5 hover:underline">
                      Book <ChevronRightIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
              Every Cab. Every Ride.
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              Comfort features standard across our entire fleet
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {AMENITIES.map((am, i) => (
              <div
                key={i}
                className="flex gap-3 bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
              >
                <span className="text-2xl md:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {am.icon}
                </span>
                <div>
                  <h4 className="font-black text-gray-800 text-xs md:text-sm mb-0.5">
                    {am.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
                    {am.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
                What Riders Say
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                Verified reviews from real passengers
              </p>
            </div>
            <div className="hidden md:flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5">
              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-black text-gray-800">4.8</span>
              <span className="text-xs text-gray-500">/ 5 (1M+ trips)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                      {r.initials}
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-xs">
                        {r.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{r.route}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(r.rating)].map((_, s) => (
                        <StarIcon
                          key={s}
                          className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-gray-400">{r.time}</span>
                  </div>
                </div>

                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed italic flex-1">
                  "{r.text}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                    {r.cabType}
                  </span>
                  <span className="text-[9px] text-gray-400 flex items-center gap-1">
                    <CheckBadgeIcon className="w-3 h-3 text-green-500" />{" "}
                    Verified Trip
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-8">
          <h2 className="text-base md:text-xl font-black text-gray-900 text-center mb-5">
            Why Thousands Choose Us Daily
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <CheckBadgeIcon className="w-6 h-6 text-green-500" />,
                title: "Verified Drivers Only",
                desc: "Every driver undergoes police verification, background checks, and professional training before their first trip.",
                bg: "bg-green-50",
              },
              {
                icon: (
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
                ),
                title: "Free Cancellation",
                desc: "Cancel up to 1 hour before pickup for a full refund. No questions asked, no deductions.",
                bg: "bg-blue-50",
              },
              {
                icon: <SparklesIcon className="w-6 h-6 text-yellow-500" />,
                title: "Rewards on Every Ride",
                desc: "Earn points on every booking. Redeem for free rides, upgrades, and exclusive discounts.",
                bg: "bg-yellow-50",
              },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} rounded-xl p-4 md:p-5`}>
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-lg p-2 shadow-sm shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white text-center relative overflow-hidden shadow-xl shadow-blue-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-[11px] font-black tracking-widest uppercase mb-4">
              <BoltIcon className="w-3 h-3 text-yellow-300" />
              Book in under 60 Seconds
            </div>
            <h2 className="text-2xl md:text-4xl font-black leading-tight mb-2">
              Your Next Ride Awaits
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-md mx-auto mb-6">
              Safe, affordable, and comfortable cabs across 250+ cities. Book
              now and get your driver confirmed instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto cursor-pointer bg-white text-blue-700 font-black px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors active:scale-95 shadow-md">
                Book a Cab Now
              </button>
              <button className="w-full sm:w-auto cursor-pointer border-2 border-white/40 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <PhoneIcon className="w-4 h-4" /> Call to Book
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
