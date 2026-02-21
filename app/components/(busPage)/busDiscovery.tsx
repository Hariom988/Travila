"use client";

import { useState } from "react";
import {
  TicketIcon,
  ArrowRightIcon,
  GiftIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { FireIcon, BoltIcon } from "@heroicons/react/24/solid";

const POPULAR_ROUTES = [
  {
    from: "Delhi",
    to: "Manali",
    price: "799",
    duration: "14h",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80",
    rating: "4.8",
    departures: "12 daily",
    highlight: "Scenic Mountain Route",
  },
  {
    from: "Mumbai",
    to: "Goa",
    price: "950",
    duration: "10h",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80",
    rating: "4.7",
    departures: "18 daily",
    highlight: "Beach Destination",
  },
  {
    from: "Bangalore",
    to: "Hyderabad",
    price: "600",
    duration: "10h",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80",
    rating: "4.6",
    departures: "22 daily",
    highlight: "Tech Corridor",
  },
  {
    from: "Pune",
    to: "Mahabaleshwar",
    price: "450",
    duration: "3h",
    image:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=400&q=80",
    rating: "4.9",
    departures: "8 daily",
    highlight: "Weekend Escape",
  },
];

const OFFERS = [
  {
    id: 1,
    code: "FIRSTBUS",
    discount: "Flat ₹200 Off",
    desc: "On your first booking",
    color: "from-rose-500 to-pink-500",
    badge: "NEW USER",
    expiry: "Limited time",
  },
  {
    id: 2,
    code: "FESTIVE30",
    discount: "30% Cashback",
    desc: "Valid on luxury sleeper",
    color: "from-blue-600 to-indigo-600",
    badge: "HOT DEAL",
    expiry: "Ends Sunday",
  },
  {
    id: 3,
    code: "ZINGGO",
    discount: "Up to ₹500 Off",
    desc: "Valid on Zingbus routes",
    color: "from-emerald-500 to-teal-600",
    badge: "POPULAR",
    expiry: "While stocks last",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    route: "Delhi → Manali",
    text: "Spotless bus, arrived on time! The driver was professional and the AC was perfect. Will definitely book again.",
    rating: 5,
    avatar: "PS",
    date: "2 days ago",
  },
  {
    name: "Rahul Verma",
    route: "Mumbai → Goa",
    text: "Super comfortable sleeper bus. Charging points worked, blankets were clean. Great value for money!",
    rating: 5,
    avatar: "RV",
    date: "1 week ago",
  },
  {
    name: "Ananya Krishnan",
    route: "Bangalore → Hyderabad",
    text: "Smooth booking, clear seat map. The bus was exactly as shown in photos. Highly recommend the Volvo service.",
    rating: 4,
    avatar: "AK",
    date: "3 days ago",
  },
];

const AMENITIES_GUIDE = [
  {
    emoji: "🛋️",
    title: "Sleeper Berths",
    desc: "Fully flat beds with privacy curtains on overnight routes",
  },
  {
    emoji: "❄️",
    title: "Climate Control",
    desc: "Individual AC vents to set your preferred temperature",
  },
  {
    emoji: "🔌",
    title: "Charging Points",
    desc: "USB & universal charging ports at every seat",
  },
  {
    emoji: "📶",
    title: "Free WiFi",
    desc: "High-speed internet on premium intercity routes",
  },
  {
    emoji: "🎬",
    title: "Entertainment",
    desc: "Personal screens with movies and music on select buses",
  },
  {
    emoji: "🧊",
    title: "Mini Fridge",
    desc: "Chilled water bottles provided on luxury services",
  },
];

const STATS = [
  { value: "2,500+", label: "Verified Operators", icon: "🚌" },
  { value: "15,000+", label: "Daily Routes", icon: "🛣️" },
  { value: "2M+", label: "Happy Travelers", icon: "😊" },
  { value: "4.6★", label: "Average Rating", icon: "⭐" },
];

export default function BusDiscovery() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 md:gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <span className="text-xl md:text-2xl">{stat.icon}</span>
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

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-14 space-y-10 md:space-y-16">
        <div>
          <div className="flex items-center gap-2 mb-5 md:mb-8">
            <div className="p-1.5 md:p-2 bg-pink-100 rounded-lg">
              <GiftIcon className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Best Offers
              </h2>
              <p className="text-xs text-gray-500 hidden md:block">
                Exclusive deals to make your journey pocket-friendly
              </p>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className={`relative shrink-0 w-64 md:w-auto snap-center overflow-hidden rounded-2xl p-5 md:p-6 bg-linear-to-br ${offer.color} text-white shadow-lg hover:-translate-y-1 transition-transform`}
              >
                <div className="absolute top-3 right-3 bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {offer.badge}
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">
                      {offer.expiry}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-black mb-1">
                      {offer.discount}
                    </h3>
                    <p className="text-xs md:text-sm opacity-90 font-medium">
                      {offer.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-white/30">
                    <span className="font-mono font-bold text-base md:text-lg px-2">
                      {offer.code}
                    </span>
                    <button
                      onClick={() => copyToClipboard(offer.code)}
                      className="bg-white cursor-pointer text-gray-900 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCode === offer.code ? (
                        <CheckBadgeIcon className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <ClipboardDocumentCheckIcon className="h-3.5 w-3.5" />
                      )}
                      {copiedCode === offer.code ? "COPIED!" : "COPY"}
                    </button>
                  </div>
                </div>
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-5 md:mb-8">
            <div className="flex items-center gap-2">
              <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
                <TicketIcon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                  Popular Routes
                </h2>
                <p className="text-xs text-gray-500 hidden md:block">
                  Most booked routes across India
                </p>
              </div>
            </div>
            <button className="text-[10px] md:text-sm font-bold text-blue-600 hover:underline uppercase tracking-wider flex items-center gap-1">
              View All <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-5 overflow-x-auto pb-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {POPULAR_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="shrink-0 w-52 md:w-auto snap-start group cursor-pointer"
              >
                <div className="relative h-36 md:h-44 mb-3 overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={route.image}
                    alt={route.to}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-80">
                      From
                    </p>
                    <p className="text-base md:text-lg font-black">
                      ₹{route.price}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <StarIcon className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
                    {route.rating}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm md:text-base text-gray-800">
                      {route.from}
                    </span>
                    <ArrowRightIcon className="h-2.5 w-2.5 text-blue-500 stroke-[3px]" />
                    <span className="font-bold text-sm md:text-base text-gray-800">
                      {route.to}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" /> {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="h-3 w-3" /> {route.departures}
                    </span>
                  </div>
                  <span className="inline-block bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {route.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-5 md:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              What's Onboard?
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Premium amenities across our verified bus fleet
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {AMENITIES_GUIDE.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
              >
                <span className="text-xl md:text-2xl shrink-0">
                  {item.emoji}
                </span>
                <div>
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                    {item.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed mt-0.5 hidden md:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5 md:mb-7">
            <FireIcon className="h-5 w-5 text-orange-500" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Traveler Reviews
              </h2>
              <p className="text-xs text-gray-500 hidden md:block">
                Real experiences from verified passengers
              </p>
            </div>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-3 md:pb-0 snap-x scrollbar-hide">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-72 md:w-auto snap-start bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{t.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, s) => (
                      <StarIcon
                        key={s}
                        className="h-3 w-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed italic">
                  "{t.text}"
                </p>
                <p className="text-[10px] text-gray-400 mt-3">{t.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 shadow-sm">
          <h3 className="text-sm md:text-base font-black text-gray-500 uppercase tracking-widest mb-5 text-center">
            Why Travelers Trust Us
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: CheckBadgeIcon,
                title: "Verified Operators",
                sub: "2500+ background-checked partners",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: TicketIcon,
                title: "Easy Refunds",
                sub: "Instant wallet credits, no questions asked",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: GiftIcon,
                title: "Exclusive Rewards",
                sub: "Earn points on every trip, redeem for discounts",
                color: "text-orange-500",
                bg: "bg-orange-50",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 md:gap-4">
                <div
                  className={`p-3 rounded-xl ${item.bg} ${item.color} shrink-0`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-sm md:text-base text-gray-900 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-400 font-medium mt-0.5">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white text-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold mb-3">
              <BoltIcon className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300" />
              Limited seats available
            </div>
            <h2 className="text-xl md:text-3xl font-black mb-2">
              Book Your Next Journey Today
            </h2>
            <p className="text-blue-100 text-sm md:text-base mb-5 max-w-md mx-auto">
              Over 15,000 buses across India. Real-time seat availability,
              instant confirmation.
            </p>
            <button className="bg-white text-blue-700 font-black px-6 md:px-10 py-3 rounded-full text-sm md:text-base hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
              Search Buses Now
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>
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
    </section>
  );
}
