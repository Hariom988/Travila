"use client";

import React, { useState } from "react";
import {
  ClipboardDocumentIcon,
  MapIcon,
  CurrencyRupeeIcon,
  CakeIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const SERVICES = [
  {
    title: "Food",
    desc: "Order Meal",
    icon: CakeIcon,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "Refund",
    desc: "Calculator",
    icon: CurrencyRupeeIcon,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Map",
    desc: "Route Info",
    icon: MapIcon,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Secure",
    desc: "Guarantee",
    icon: ShieldCheckIcon,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const OFFERS = [
  { code: "TRAINBEST", title: "₹100 OFF", desc: "First booking", bank: "UPI" },
  { code: "HDFCSUPER", title: "15% OFF", desc: "HDFC Cards", bank: "HDFC" },
  { code: "CREDDEAL", title: "No Fees", desc: "Pay via CRED", bank: "CRED" },
];

export default function TrainDashboard() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-290 mx-auto px-3 md:px-0 mt-5 mb-10 font-sans">
      <div className="mb-8">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
          Train Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="bg-white cursor-pointer p-3 md:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${s.bg} flex items-center justify-center mb-2 md:mb-4`}
              >
                <s.icon className={`h-5 w-5 md:h-6 md:w-6 ${s.color}`} />
              </div>
              <h3 className="font-bold text-gray-800 text-sm md:text-lg">
                {s.title}
              </h3>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Offers
          </h2>
          <StarIcon className="h-5 w-5 text-yellow-400" />
        </div>

        <div className=" flex cursor-pointer md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {OFFERS.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white min-w-65 md:min-w-0 rounded-xl border border-gray-200 shadow-sm snap-center flex flex-col"
            >
              <div className="p-4 flex-1">
                <div className="flex justify-between mb-2">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {offer.bank}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-800">
                  {offer.title}
                </h3>
                <p className="text-xs text-gray-500">{offer.desc}</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-dashed border-gray-300 rounded-b-xl flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-500">Code</p>
                  <p className="font-mono text-sm font-bold">{offer.code}</p>
                </div>
                <button
                  onClick={() => copy(offer.code)}
                  className="text-blue-600 cursor-pointer text-xs font-bold uppercase"
                >
                  {copied === offer.code ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between border border-blue-100">
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IRCTC_Logo.svg/1200px-IRCTC_Logo.svg.png"
            alt="IRCTC"
            className="h-8 md:h-12 opacity-80"
          />
          <div>
            <h3 className="text-sm md:text-lg font-bold text-gray-800">
              IRCTC Partner
            </h3>
            <p className="text-[10px] md:text-sm text-gray-600">
              Authorized Booking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
