"use client";
import {
  InformationCircleIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ClockIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const BUS_CLASSES = [
  {
    title: "AC Sleeper",
    description: "Best for overnight long-distance travel.",
    features: [
      "Flat Bed (1+2)",
      "Pillow & Blanket",
      "Privacy Curtains",
      "Reading Light",
    ],
    level: "Premium",
    color: "bg-purple-600",
    price: "₹900+",
    ideal: "10h+ journeys",
    emoji: "🛌",
  },
  {
    title: "Semi-Sleeper",
    description: "Comfortable for 5–8 hour journeys.",
    features: [
      "Reclining Seats",
      "Calf Support",
      "Extra Legroom",
      "USB Charging",
    ],
    level: "Popular",
    color: "bg-blue-600",
    price: "₹550+",
    ideal: "5–10h journeys",
    emoji: "💺",
  },
  {
    title: "Standard Seater",
    description: "Economical for short day-trips.",
    features: ["2+2 Layout", "Push-back Seats", "Standard AC", "Window Views"],
    level: "Budget",
    color: "bg-slate-600",
    price: "₹250+",
    ideal: "Under 5h journeys",
    emoji: "🪑",
  },
];

const FAQS = [
  {
    q: "What documents do I need to carry while boarding?",
    a: "You need your e-ticket (SMS or email), a valid government-issued photo ID (Aadhaar, PAN, Passport, or Voter ID), and the QR code for verification. Digital copies are accepted.",
  },
  {
    q: "How early should I arrive at the boarding point?",
    a: "Arrive at least 15–20 minutes before departure. Buses rarely wait beyond 5 minutes of scheduled time. Use the boarding point map in your confirmation email for precise location.",
  },
  {
    q: "Can I cancel or reschedule my ticket?",
    a: "Yes. Cancellation up to 2 hours before departure gets a 75% refund. Between 2–1 hours gets 50%. No refund within 1 hour. Rescheduling (subject to availability) is free up to 6 hours before departure.",
  },
  {
    q: "What is the baggage allowance?",
    a: "Typically 15–20 kg of luggage under the bus (free). Carry-on is limited to a small bag that fits overhead. Extra luggage may incur charges at the driver's discretion.",
  },
  {
    q: "Is there a restroom on the bus?",
    a: "Premium and sleeper buses on routes over 6 hours typically have onboard restrooms. For others, the bus makes scheduled stops every 2–3 hours at highway restaurants/petrol stations.",
  },
  {
    q: "What happens if the bus is significantly delayed?",
    a: "For delays over 3 hours caused by operator issues, you're entitled to a full refund or a free rescheduling. Contact support immediately and document the delay time for claims.",
  },
];

const BOOKING_TIPS = [
  {
    icon: "🎯",
    title: "Book Weekday Departures",
    desc: "Tuesday–Thursday buses are 15–25% cheaper than weekend trips.",
  },
  {
    icon: "⏰",
    title: "Advance Booking Saves Money",
    desc: "Tickets booked 7+ days ahead are typically ₹100–200 cheaper.",
  },
  {
    icon: "🌙",
    title: "Night Buses Save Hotel Costs",
    desc: "An overnight sleeper bus doubles as accommodation — smart for budget travelers.",
  },
  {
    icon: "🪟",
    title: "Choose Your Seat Wisely",
    desc: "Front seats = less bumpy. Middle seats = cooler AC. Right side = sunrise views on most routes.",
  },
];

const SAFETY_FEATURES = [
  { label: "GPS Tracking on all buses", done: true },
  { label: "Background-verified drivers", done: true },
  { label: "Real-time journey monitoring", done: true },
  { label: "Emergency panic button (select buses)", done: true },
  { label: "24/7 customer helpline", done: true },
  { label: "Operator rating system", done: true },
];

export default function BusTravelInfo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-14 space-y-10 md:space-y-16">
        {/* Choose Your Bus Type */}
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              Which Bus is Right for You?
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
              Pick the right bus class for your journey duration and budget.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {BUS_CLASSES.map((bus, idx) => (
              <div
                key={idx}
                className="shrink-0 w-68 md:w-auto snap-center group cursor-pointer relative bg-white rounded-2xl p-5 md:p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:border-blue-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${bus.color} text-white text-[9px] font-black uppercase tracking-widest`}
                  >
                    {bus.level}
                  </div>
                  <span className="text-2xl">{bus.emoji}</span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-1">
                  {bus.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4 font-medium leading-tight">
                  {bus.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {bus.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700"
                    >
                      <CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400">Starting from</p>
                    <p className="font-black text-blue-600 text-lg">
                      {bus.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Best for</p>
                    <p className="text-xs font-bold text-gray-700">
                      {bus.ideal}
                    </p>
                  </div>
                </div>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full text-[10px] cursor-pointer font-black text-blue-600 uppercase tracking-wider flex items-center justify-center gap-1.5 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    See Available Buses{" "}
                    <InformationCircleIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety + Booking Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Safety Features */}
          <div className="bg-slate-900 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-8 -mt-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-white/10 rounded-lg">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-black">
                    Your Safety, Our Priority
                  </h3>
                  <p className="text-xs text-gray-400">
                    Multi-layer safety systems on every booking
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {SAFETY_FEATURES.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-300 font-medium">
                      {feat.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl md:rounded-3xl p-5 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BriefcaseIcon className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base md:text-xl font-black text-gray-900">
                  Smart Booking Tips
                </h3>
                <p className="text-xs text-gray-500">
                  Save more, travel better
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {BOOKING_TIPS.map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-white rounded-xl p-3 border border-amber-100 hover:border-amber-200 transition-colors"
                >
                  <span className="text-lg shrink-0">{tip.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                      {tip.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed mt-0.5">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Rules */}
        <div className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-5 md:mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <NoSymbolIcon className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-black text-gray-900">
                Boarding Rules & Policies
              </h3>
              <p className="text-xs text-gray-500">Know before you go</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                icon: ClockIcon,
                color: "text-orange-500",
                bg: "bg-orange-50",
                title: "Boarding Time",
                info: "Arrive 15 mins before departure. Buses may leave early if all passengers are aboard.",
              },
              {
                icon: BriefcaseIcon,
                color: "text-blue-500",
                bg: "bg-blue-50",
                title: "Luggage Policy",
                info: "15 kg under-bus luggage free. Carry-on must fit overhead bin. No hazardous items.",
              },
              {
                icon: NoSymbolIcon,
                color: "text-red-500",
                bg: "bg-red-50",
                title: "Cancellation",
                info: "100% refund if cancelled 6+ hrs before. 50% between 2–6 hrs. No refund under 2 hrs.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.bg} rounded-xl p-4 border border-transparent hover:border-gray-200 transition-colors`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon
                    className={`h-4 w-4 md:h-5 md:w-5 ${item.color}`}
                  />
                  <h4 className="font-black text-xs md:text-sm text-gray-800">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
                  {item.info}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="flex items-center gap-2 mb-5 md:mb-7">
            <QuestionMarkCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-gray-500 hidden md:block">
                Everything you need to know before boarding
              </p>
            </div>
          </div>
          <div className="space-y-2.5 md:space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`bg-white border rounded-xl md:rounded-2xl overflow-hidden transition-all ${openFaq === i ? "border-blue-200 shadow-sm" : "border-gray-100"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 text-left gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800 text-xs md:text-sm">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 text-blue-600 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-5 pb-4 text-gray-600 text-xs md:text-sm leading-relaxed border-t border-gray-100">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Banner */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-lg md:text-2xl font-black mb-1">
              Need Help with Your Booking?
            </h3>
            <p className="text-blue-100 text-xs md:text-sm max-w-md">
              Our support team is available 24/7. Average response time under 2
              minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto shrink-0">
            <button className="bg-white text-blue-700 font-black px-5 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors active:scale-95 flex items-center justify-center gap-2">
              📞 Call Support
            </button>
            <button className="bg-white/10 border border-white/30 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors active:scale-95 flex items-center justify-center gap-2">
              💬 Live Chat
            </button>
          </div>
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
    </div>
  );
}
