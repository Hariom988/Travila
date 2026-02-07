"use client";

import { useState } from "react";
import {
  TicketIcon,
  ArrowRightIcon,
  GiftIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const POPULAR_ROUTES = [
  {
    from: "Delhi",
    to: "Manali",
    price: "799",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=300&q=80",
  },
  {
    from: "Mumbai",
    to: "Goa",
    price: "950",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&q=80",
  },
  {
    from: "Bangalore",
    to: "Hyderabad",
    price: "600",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=300&q=80",
  },
  {
    from: "Pune",
    to: "Mahabaleshwar",
    price: "450",
    image:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=300&q=80",
  },
];

const OFFERS = [
  {
    id: 1,
    code: "FIRSTBUS",
    discount: "Flat ₹200 Off",
    desc: "On your first booking",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    code: "FESTIVE30",
    discount: "30% Cashback",
    desc: "Valid on luxury sleeper",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    code: "ZINGGO",
    discount: "Up to ₹500 Off",
    desc: "Valid on Zingbus routes",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function BusDiscovery() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-16 space-y-10 md:space-y-16 bg-white overflow-hidden">
      <div>
        <div className="flex items-center gap-2 mb-5 md:mb-8">
          <div className="p-1.5 md:p-2 bg-pink-100 rounded-lg">
            <GiftIcon className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Best Offers
          </h2>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {OFFERS.map((offer) => (
            <div
              key={offer.id}
              className={`relative shrink-0 w-65 md:w-auto snap-center cursor-pointer overflow-hidden group rounded-2xl p-5 md:p-6 bg-linear-to-br ${offer.color} text-white shadow-lg transition-transform hover:-translate-y-1`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-black mb-1">
                    {offer.discount}
                  </h3>
                  <p className="text-xs md:text-sm opacity-90 font-medium">
                    {offer.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-white/30">
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
                    {copiedCode === offer.code ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20" />
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
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              Popular Routes
            </h2>
          </div>
          <button className="text-[10px] md:text-sm font-bold text-blue-600 hover:underline uppercase tracking-wider">
            View All
          </button>
        </div>

        <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {POPULAR_ROUTES.map((route, idx) => (
            <div
              key={idx}
              className="shrink-0 w-40 md:w-auto snap-start group cursor-pointer"
            >
              <div className="relative h-32 md:h-48 mb-3 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={route.image}
                  alt={route.to}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-80">
                    From
                  </p>
                  <p className="text-sm md:text-lg font-black">
                    ₹{route.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13px] md:text-base text-gray-800">
                    {route.from}
                  </span>
                  <ArrowRightIcon className="h-2.5 w-2.5 text-blue-500 stroke-[3px]" />
                  <span className="font-bold text-[13px] md:text-base text-gray-800">
                    {route.to}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {[
          {
            icon: CheckBadgeIcon,
            title: "Verified Operators",
            sub: "2500+ bus partners",
            color: "text-blue-600",
          },
          {
            icon: TicketIcon,
            title: "Easy Refunds",
            sub: "Instant wallet credits",
            color: "text-green-600",
          },
          {
            icon: GiftIcon,
            title: "Exclusive Rewards",
            sub: "Points on every trip",
            color: "text-orange-500",
          },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 md:gap-4">
            <div
              className={`bg-white p-2.5 md:p-3 rounded-full shadow-sm ${item.color}`}
            >
              <item.icon className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <div>
              <p className="font-black text-sm md:text-base text-gray-900 leading-tight">
                {item.title}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
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
