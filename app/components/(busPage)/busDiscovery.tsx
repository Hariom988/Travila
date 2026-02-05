"use client";

import React, { useState } from "react";
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
    desc: "Valid on luxury sleeper buses",
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
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-16 bg-white">
      {/* SECTION 1: PROMO OFFERS CAROUSEL */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-pink-100 rounded-lg">
            <GiftIcon className="h-6 w-6 text-pink-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Best Offers for You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <div
              key={offer.id}
              className={`relative cursor-pointer overflow-hidden group rounded-2xl p-6 bg-linear-to-br ${offer.color} text-white shadow-lg transition-transform hover:-translate-y-1`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-1">{offer.discount}</h3>
                  <p className="text-sm opacity-90 font-medium">{offer.desc}</p>
                </div>

                <div className="mt-6  flex items-center justify-between bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                  <span className="font-mono font-bold text-lg px-2">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => copyToClipboard(offer.code)}
                    className="bg-white cursor-pointer text-gray-900 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    {copiedCode === offer.code ? (
                      <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ClipboardDocumentCheckIcon className="h-4 w-4" />
                    )}
                    {copiedCode === offer.code ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: POPULAR ROUTES */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TicketIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Popular Bus Routes
            </h2>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:underline">
            View All Routes
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_ROUTES.map((route, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-48 mb-4 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={route.image}
                  alt={route.to}
                  className="w-full h-full object-cover transition-transform duration-500 "
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    Starting From
                  </p>
                  <p className="text-lg font-black">₹{route.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{route.from}</span>
                  <ArrowRightIcon className="h-3 w-3 text-blue-500 stroke-[3px]" />
                  <span className="font-bold text-gray-800">{route.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TRUST BAR */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-wrap justify-center md:justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
            <CheckBadgeIcon className="h-8 w-8" />
          </div>
          <div>
            <p className="font-black text-gray-900 leading-tight">
              Verified Operators
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Over 2500+ bus partners
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-green-600">
            <TicketIcon className="h-8 w-8" />
          </div>
          <div>
            <p className="font-black text-gray-900 leading-tight">
              Easy Cancellations
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Instant refunds to wallet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-orange-500">
            <GiftIcon className="h-8 w-8" />
          </div>
          <div>
            <p className="font-black text-gray-900 leading-tight">
              Exclusive Rewards
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Earn points on every trip
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
