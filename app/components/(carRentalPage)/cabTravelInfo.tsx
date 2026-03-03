"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";

const CAB_TYPES = [
  {
    id: "hatchback",
    name: "Hatchback",
    tag: "Budget Ride",
    tagColor: "bg-green-100 text-green-700",
    price: "₹12/km",
    base: "₹299",
    seats: 4,
    bags: 2,
    accentColor: "border-green-200 bg-green-50",
    headerColor: "bg-green-500",
    idealFor: "City rides & short trips",
    features: ["AC", "GPS Tracked", "Music System", "USB Charging"],
    bestFor: "Solo, couple, or budget-conscious travel up to 150 km",
    minKm: "—",
    waitTime: "30 min free",
    example: "Gurgaon → Delhi Airport",
  },
  {
    id: "sedan",
    name: "Sedan",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-700",
    price: "₹14/km",
    base: "₹399",
    seats: 4,
    bags: 3,
    accentColor: "border-blue-200 bg-blue-50",
    headerColor: "bg-blue-600",
    idealFor: "Outstation & daily commutes",
    features: ["AC", "GPS Tracked", "Phone Mount", "Reclining Seats"],
    bestFor: "Business travel or comfortable outstation rides up to 500 km",
    minKm: "200 km",
    waitTime: "45 min free",
    example: "Delhi → Agra (200 km+)",
  },
  {
    id: "suv",
    name: "SUV / Innova",
    tag: "Group Travel",
    tagColor: "bg-purple-100 text-purple-700",
    price: "₹18/km",
    base: "₹599",
    seats: 7,
    bags: 6,
    accentColor: "border-purple-200 bg-purple-50",
    headerColor: "bg-purple-600",
    idealFor: "Families, hill stations & long tours",
    features: ["AC", "Captain Seats", "Extra Boot Space", "Panoramic View"],
    bestFor: "Group travel, airport transfers for families, or mountain routes",
    minKm: "300 km",
    waitTime: "60 min free",
    example: "Mumbai → Lonavala (Family Trip)",
  },
];

const SAFETY_POINTS = [
  "Real-time GPS tracking shared via WhatsApp",
  "24/7 driver behavior monitoring system",
  "Emergency SOS button inside the app",
  "Aadhaar-verified driver identity",
  "Dedicated women safety helpline",
  "Cab & driver photo shared before pickup",
];

const BOOKING_TIPS = [
  {
    icon: "📅",
    tip: "Book at least 2–4 hours in advance for outstation trips to get the best fare.",
  },
  {
    icon: "🕐",
    tip: "Avoid peak hours (8–10am, 6–9pm) for city rides — prices can surge 1.5x.",
  },
  {
    icon: "🌙",
    tip: "Night outstation rides (departure after 9pm) are often 10–15% cheaper.",
  },
  {
    icon: "🛣️",
    tip: "For 300+ km trips, always choose Sedan or SUV for driver comfort & safety.",
  },
];

const POLICIES = [
  {
    icon: <ClockIcon className="w-5 h-5 text-blue-500" />,
    title: "Driver Arrival Time",
    bg: "bg-blue-50 border-blue-100",
    points: [
      "Driver will arrive 10 mins before your scheduled pickup time",
      "You will receive driver name, photo & cab number 30 mins prior",
      "Wait time included: 30 min (Hatchback), 45 min (Sedan), 60 min (SUV)",
      "Driver will call you on arrival — ensure your number is reachable",
    ],
  },
  {
    icon: <BriefcaseIcon className="w-5 h-5 text-emerald-500" />,
    title: "Luggage & Passengers",
    bg: "bg-emerald-50 border-emerald-100",
    points: [
      "Hatchback: 2 medium bags; Sedan: 3 bags; SUV: 5–6 bags",
      "Passengers must not exceed the cab's official seating capacity",
      "Pets allowed only in carriers with prior booking note",
      "Oversized luggage (cycles, surf boards) must be disclosed at booking",
    ],
  },
  {
    icon: <CurrencyRupeeIcon className="w-5 h-5 text-rose-500" />,
    title: "Fare & Cancellation",
    bg: "bg-rose-50 border-rose-100",
    points: [
      "Free cancellation up to 1 hour before scheduled pickup",
      "50% cancellation fee applies within 30 min of pickup",
      "Tolls, parking, and state taxes are charged at actuals on outstation trips",
      "Refunds are processed within 3–5 business days to original payment",
    ],
  },
];

const FAQS = [
  {
    q: "What documents should I carry for outstation travel?",
    a: "As a passenger, you don't need to carry any special documents. However, for travel to certain state borders, your driver will have the required permits. We recommend keeping your Aadhaar or any photo ID during travel as a general practice.",
  },
  {
    q: "How early should I be ready for my cab pickup?",
    a: "Be ready 5–10 minutes before your scheduled pickup time. You'll receive driver details 30 minutes before arrival. If the driver is running late due to traffic, you'll receive a real-time notification via the app and SMS.",
  },
  {
    q: "Can I make multiple stops during an outstation trip?",
    a: "Yes! You can request a stop for fuel, food, or sightseeing. Waiting charges apply at ₹150/hour after the free wait time included in your cab type. For planned multi-stop sightseeing tours, check our 'Day Packages' during booking.",
  },
  {
    q: "What if I need to extend my trip or change the route mid-way?",
    a: "You can request a route change or trip extension directly with your driver. Additional kms and time will be billed at the standard per-km rate for your cab type. Payments for extensions can be made in cash or via the app.",
  },
  {
    q: "Is my booking confirmed instantly, or does it need approval?",
    a: "All bookings are confirmed instantly. You'll receive a booking confirmation, driver details, and a live tracking link via SMS and WhatsApp within 60 seconds of booking. If a driver isn't available, you'll be notified within 5 minutes.",
  },
  {
    q: "Are there any hidden charges I should know about?",
    a: "We believe in complete transparency. The base fare and per-km rate are shown upfront. Extras that apply on outstation trips: toll charges, state taxes, and parking — all at actuals. Night charges (11pm–5am) may apply on some routes and are disclosed at booking.",
  },
];

export default function CabTravelInfo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-14 space-y-10 md:space-y-16">
        <section>
          <div className="mb-5">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
              Cab Types Explained
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              Choose the right cab for your trip type and group size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {CAB_TYPES.map((cab) => (
              <div
                key={cab.id}
                className={`bg-white rounded-2xl md:rounded-3xl border-2 ${cab.accentColor} overflow-hidden shadow-sm hover:shadow-lg transition-all`}
              >
                <div className={`${cab.headerColor} px-4 md:px-5 py-3 md:py-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-black text-base md:text-lg">
                      {cab.name}
                    </h3>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white`}
                    >
                      {cab.tag}
                    </span>
                  </div>
                  <p className="text-white/80 text-[10px] mt-0.5">
                    {cab.idealFor}
                  </p>
                </div>
                <div className="flex items-center justify-around border-b border-gray-100 py-3 md:py-4 px-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Per KM
                    </p>
                    <p className="text-base font-black text-gray-900">
                      {cab.price}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Base Fare
                    </p>
                    <p className="text-base font-black text-gray-900">
                      {cab.base}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Min KM
                    </p>
                    <p className="text-base font-black text-gray-900">
                      {cab.minKm}
                    </p>
                  </div>
                </div>

                <div className="p-4 md:p-5 space-y-3">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      <UserGroupIcon className="w-3 h-3" /> {cab.seats} Seats
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      <BriefcaseIcon className="w-3 h-3" /> {cab.bags} Bags
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      ⏱ {cab.waitTime}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1.5">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cab.features.map((f, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1">
                      Best For
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {cab.bestFor}
                    </p>
                    <p className="text-[10px] text-blue-500 font-bold mt-1.5">
                      e.g. {cab.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="bg-slate-900 text-white rounded-2xl md:rounded-3xl p-5 md:p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-white/10 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black">
                    Passenger Safety
                  </h3>
                  <p className="text-xs text-gray-400">Built-in, every trip</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {SAFETY_POINTS.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <p className="text-[11px] md:text-xs text-gray-300 leading-snug">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl md:rounded-3xl p-5 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BoltIcon className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-gray-900">
                  Smart Booking Tips
                </h3>
                <p className="text-xs text-gray-500">
                  Get the best deal, every time
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {BOOKING_TIPS.map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-white rounded-xl p-3 border border-amber-100 shadow-sm"
                >
                  <span className="text-xl shrink-0">{tip.icon}</span>
                  <p className="text-[11px] md:text-xs text-gray-700 leading-relaxed">
                    {tip.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section>
          <div className="mb-5">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
              Booking Policies
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              Everything you need to know before your trip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {POLICIES.map((policy, i) => (
              <div
                key={i}
                className={`${policy.bg} rounded-2xl border p-4 md:p-6 shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    {policy.icon}
                  </div>
                  <h3 className="font-black text-gray-800 text-sm md:text-base">
                    {policy.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {policy.points.map((pt, j) => (
                    <li key={j} className="flex gap-2 items-start">
                      <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-white flex items-center justify-center text-[8px] font-black text-gray-500 border border-gray-200">
                        {j + 1}
                      </span>
                      <p className="text-[11px] md:text-xs text-gray-700 leading-relaxed">
                        {pt}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              Quick answers to your cab booking queries
            </p>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-gray-800 text-xs md:text-sm pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-50">
                    <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <ChatBubbleLeftRightIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-base md:text-xl font-black text-gray-900 mb-1">
                Still Have Questions?
              </h3>
              <p className="text-xs md:text-sm text-gray-500 max-w-md">
                Our 24/7 support team is ready to help with bookings, route
                planning, driver issues, or anything else. No robots — real
                humans.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button className="flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white font-black px-5 py-2.5 rounded-xl text-xs md:text-sm hover:bg-blue-700 transition-colors active:scale-95 shadow-md">
                <PhoneIcon className="w-4 h-4" />
                Call Support
              </button>
              <button className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm hover:bg-gray-200 transition-colors">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                Live Chat
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
