"use client";

import { useState } from "react";
import {
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
  { value: "500K+", label: "Voyages Booked", emoji: "⚓" },
  { value: "80+", label: "Destinations", emoji: "🌍" },
  { value: "30+", label: "Cruise Lines", emoji: "🚢" },
  { value: "4.9★", label: "Avg. Guest Rating", emoji: "⭐" },
];

const OFFERS = [
  {
    id: 1,
    code: "FIRSTSAIL",
    discount: "Flat ₹5,000 Off",
    desc: "On your first cruise booking",
    color: "from-rose-500 to-pink-600",
    badge: "NEW GUEST",
    expiry: "Limited time",
  },
  {
    id: 2,
    code: "EARLYBIRD",
    discount: "15% Cashback",
    desc: "Book 60+ days in advance",
    color: "from-blue-600 to-cyan-600",
    badge: "EARLY BIRD",
    expiry: "Select sailings",
  },
  {
    id: 3,
    code: "LUXCABIN",
    discount: "Free Upgrade",
    desc: "To balcony cabin on select ships",
    color: "from-amber-500 to-orange-500",
    badge: "CABIN DEAL",
    expiry: "While stocks last",
  },
];

const POPULAR_ROUTES = [
  {
    from: "Mumbai",
    to: "Goa & Lakshadweep",
    duration: "5 Nights",
    price: "22,999",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=400&q=80",
    rating: "4.9",
    tag: "Most Popular",
    tagColor: "bg-orange-500",
    highlight: "Indian Ocean Escape",
    departure: "Every Friday",
  },
  {
    from: "Kochi",
    to: "Maldives",
    duration: "7 Nights",
    price: "49,999",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80",
    rating: "5.0",
    tag: "Luxury Pick",
    tagColor: "bg-purple-600",
    highlight: "Paradise Atoll",
    departure: "Every Saturday",
  },
  {
    from: "Chennai",
    to: "Andaman Islands",
    duration: "4 Nights",
    price: "17,499",
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=400&q=80",
    rating: "4.8",
    tag: "Island Hop",
    tagColor: "bg-teal-500",
    highlight: "Turquoise Waters",
    departure: "Twice weekly",
  },
  {
    from: "Mumbai",
    to: "Dubai",
    duration: "10 Nights",
    price: "89,999",
    image:
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=400&q=80",
    rating: "4.9",
    tag: "International",
    tagColor: "bg-blue-600",
    highlight: "Gulf of Arabia",
    departure: "Monthly",
  },
];

const ONBOARD_FEATURES = [
  {
    icon: "🍽️",
    title: "Fine Dining",
    desc: "Multiple restaurants aboard — from buffets to à la carte with world-class chefs.",
  },
  {
    icon: "🎭",
    title: "Live Entertainment",
    desc: "Broadway-style shows, comedy nights, live bands, and themed parties every evening.",
  },
  {
    icon: "🏊",
    title: "Pool & Spa",
    desc: "Infinity pools, Jacuzzis, and a full-service spa for complete onboard relaxation.",
  },
  {
    icon: "🎰",
    title: "Casino & Lounge",
    desc: "Premium casino floor, cocktail bars, and sky lounges open late into the night.",
  },
  {
    icon: "🧒",
    title: "Kids Club",
    desc: "Dedicated activity zones with trained supervisors — safe fun for little sailors.",
  },
  {
    icon: "🏋️",
    title: "Fitness Centre",
    desc: "State-of-the-art gym with ocean views, yoga classes, and personal training.",
  },
];

const REVIEWS = [
  {
    name: "Rohan & Anjali Desai",
    route: "Mumbai → Goa → Lakshadweep",
    text: "Our honeymoon cruise was absolutely magical. The cabin was stunning, food was exceptional, and the sunsets at sea are something words cannot describe.",
    rating: 5,
    initials: "RD",
    cabinType: "Balcony Suite",
    time: "1 week ago",
  },
  {
    name: "The Krishnamurthy Family",
    route: "Chennai → Andaman",
    text: "Travelled with our two kids and elderly parents — everyone had an amazing time. The kids club kept the children busy while we finally got to relax by the pool!",
    rating: 5,
    initials: "KF",
    cabinType: "Family Cabin",
    time: "2 weeks ago",
  },
  {
    name: "Nisha Patel",
    route: "Kochi → Maldives",
    text: "Solo female traveler — felt completely safe and pampered. The staff went above and beyond. The Maldives snorkeling excursion was the highlight of my year.",
    rating: 5,
    initials: "NP",
    cabinType: "Ocean View",
    time: "3 weeks ago",
  },
];

export default function CruiseDiscovery() {
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
                Cruise Deals & Offers
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                Exclusive savings on your next voyage
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
                      className="text-[10px] cursor-pointer font-black bg-white text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-100  transition-all"
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
                Trending Cruise Voyages
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                Top routes from Indian ports — stunning destinations await
              </p>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {POPULAR_ROUTES.map((route, i) => (
              <div
                key={i}
                className="snap-start flex-none w-64 md:w-auto bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover  transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <p className="text-white font-black text-sm leading-tight">
                      {route.from}
                    </p>
                    <p className="text-white/70 text-[10px] font-medium">
                      → {route.to}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <StarIcon className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    {route.rating}
                  </div>
                  <div
                    className={`absolute top-2 left-2 ${route.tagColor} text-white text-[9px] font-black px-2 py-0.5 rounded-full`}
                  >
                    {route.tag}
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  <p className="text-[10px] font-bold text-blue-500 mb-1">
                    {route.highlight}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                        🌙 {route.duration}
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 text-right">
                        From
                      </p>
                      <p className="text-sm font-black text-blue-600">
                        ₹{route.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {route.departure}
                    </span>
                    <button className="text-[10px] font-black text-blue-600 flex items-center gap-0.5 hover:underline">
                      View <ChevronRightIcon className="w-3 h-3" />
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
              Life Onboard
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              Your ship is your destination — world-class amenities at sea
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {ONBOARD_FEATURES.map((feat, i) => (
              <div
                key={i}
                className="flex gap-3 bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
              >
                <span className="text-2xl md:text-3xl shrink-0  transition-transform">
                  {feat.icon}
                </span>
                <div>
                  <h4 className="font-black text-gray-800 text-xs md:text-sm mb-0.5">
                    {feat.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
                    {feat.desc}
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
                What Our Guests Say
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                Verified reviews from real voyagers
              </p>
            </div>
            <div className="hidden md:flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5">
              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-black text-gray-800">4.9</span>
              <span className="text-xs text-gray-500">/ 5 (500K+ trips)</span>
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
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-black shadow-sm">
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
                  <span className="text-[9px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">
                    {r.cabinType}
                  </span>
                  <span className="text-[9px] text-gray-400 flex items-center gap-1">
                    <CheckBadgeIcon className="w-3 h-3 text-green-500" />{" "}
                    Verified Voyage
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-8">
          <h2 className="text-base md:text-xl font-black text-gray-900 text-center mb-5">
            Why Thousands Sail With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <CheckBadgeIcon className="w-6 h-6 text-green-500" />,
                title: "Certified Cruise Lines Only",
                desc: "We partner exclusively with internationally certified cruise operators that meet global maritime safety standards.",
                bg: "bg-green-50",
              },
              {
                icon: (
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
                ),
                title: "Flexible Cancellation",
                desc: "Cancel up to 30 days before departure for a full refund. Trip protection plans available at checkout.",
                bg: "bg-blue-50",
              },
              {
                icon: <SparklesIcon className="w-6 h-6 text-yellow-500" />,
                title: "Voyage Rewards",
                desc: "Earn points on every booking. Unlock cabin upgrades, onboard credits, and priority boarding.",
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

        <section className="bg-linear-to-r from-teal-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white text-center relative overflow-hidden shadow-xl shadow-teal-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-[11px] font-black tracking-widest uppercase mb-4">
              <BoltIcon className="w-3 h-3 text-yellow-300" />
              Limited Cabins Available
            </div>
            <h2 className="text-2xl md:text-4xl font-black leading-tight mb-2">
              Your Dream Voyage Awaits
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-md mx-auto mb-6">
              Pristine seas, stunning sunsets, and world-class hospitality. Book
              your cruise today from just ₹17,499.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto cursor-pointer bg-white text-teal-700 font-black px-6 py-3 rounded-xl text-sm hover:bg-teal-50 transition-colors  shadow-md">
                Explore Cruises
              </button>
              <button className="w-full sm:w-auto cursor-pointer border-2 border-white/40 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <PhoneIcon className="w-4 h-4" /> Speak to a Cruise Expert
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
