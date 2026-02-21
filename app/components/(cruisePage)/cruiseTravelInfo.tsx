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
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";

const CABIN_TYPES = [
  {
    id: "interior",
    name: "Interior Cabin",
    tag: "Budget Pick",
    tagColor: "bg-slate-500",
    price: "₹17,499",
    perNight: "₹3,499/night",
    emoji: "🛏️",
    idealFor: "Solo & budget travelers",
    features: [
      "Twin / Queen Bed",
      "En-suite Bathroom",
      "TV & Phone",
      "Climate Control",
    ],
    bestFor:
      "Travelers who plan to be out and about — dining, shows, ports — and just need a comfortable bed.",
    maxGuests: 2,
    color: "border-slate-200 bg-slate-50",
    headerColor: "bg-slate-700",
    level: "Budget",
  },
  {
    id: "oceanview",
    name: "Ocean View Cabin",
    tag: "Most Popular",
    tagColor: "bg-blue-500",
    price: "₹27,999",
    perNight: "₹5,599/night",
    emoji: "🌊",
    idealFor: "Couples & first-timers",
    features: [
      "Porthole / Picture Window",
      "Queen Bed",
      "Lounge Area",
      "Premium Toiletries",
    ],
    bestFor:
      "Wake up to ocean views every morning — ideal for those wanting the classic cruise experience at great value.",
    maxGuests: 2,
    color: "border-blue-200 bg-blue-50",
    headerColor: "bg-blue-600",
    level: "Classic",
  },
  {
    id: "balcony",
    name: "Balcony Suite",
    tag: "Best Experience",
    tagColor: "bg-teal-500",
    price: "₹44,999",
    perNight: "₹8,999/night",
    emoji: "🏖️",
    idealFor: "Honeymoons & special occasions",
    features: [
      "Private Balcony",
      "King Bed",
      "Sitting Area",
      "Priority Boarding",
    ],
    bestFor:
      "Step out to your private balcony for sunrise coffee or sunset cocktails. The ultimate cruise indulgence.",
    maxGuests: 3,
    color: "border-teal-200 bg-teal-50",
    headerColor: "bg-teal-600",
    level: "Premium",
  },
  {
    id: "suite",
    name: "Grand Suite",
    tag: "Luxury",
    tagColor: "bg-amber-500",
    price: "₹89,999",
    perNight: "₹17,999/night",
    emoji: "👑",
    idealFor: "Luxury seekers & families",
    features: [
      "Separate Living Room",
      "Butler Service",
      "Jacuzzi on Balcony",
      "VIP Shore Excursions",
    ],
    bestFor:
      "An entire home at sea — butler service, exclusive dining, and curated shore experiences included.",
    maxGuests: 4,
    color: "border-amber-200 bg-amber-50",
    headerColor: "bg-amber-600",
    level: "Ultra Luxury",
  },
];

const SAFETY_POINTS = [
  "All ships hold international maritime safety (SOLAS) certification",
  "Coast guard-approved life-saving equipment on all vessels",
  "Mandatory lifeboat drill for all passengers before departure",
  "24/7 onboard medical center with licensed doctors",
  "Real-time vessel tracking shared with port authorities",
  "Emergency evacuation protocols tested every 6 months",
];

const BOOKING_TIPS = [
  {
    icon: "📅",
    title: "Book 60+ Days in Advance",
    desc: "Early bookings get the best cabin categories and up to 20% off base fares.",
  },
  {
    icon: "🍽️",
    title: "Check Meal Plan Options",
    desc: "An 'All Inclusive' package often works out cheaper than paying per meal onboard.",
  },
  {
    icon: "🏝️",
    title: "Pre-book Shore Excursions",
    desc: "Popular port activities sell out fast. Secure your snorkeling, city tours & island hops early.",
  },
  {
    icon: "💳",
    title: "Onboard Credit Deals",
    desc: "Many sailings offer free onboard credit (₹3,000–₹10,000) for bookings during flash sales.",
  },
];

const POLICIES = [
  {
    icon: <ClockIcon className="w-5 h-5 text-blue-500" />,
    title: "Check-in & Boarding",
    bg: "bg-blue-50 border-blue-100",
    points: [
      "Check-in opens 3 hours before departure — arrive early to avoid queues",
      "Mandatory muster drill (emergency procedure briefing) before sailing",
      "You'll receive a cabin key card and onboard account at check-in",
      "Boarding closes 90 minutes before scheduled departure time",
    ],
  },
  {
    icon: <BriefcaseIcon className="w-5 h-5 text-emerald-500" />,
    title: "Baggage & Allowance",
    bg: "bg-emerald-50 border-emerald-100",
    points: [
      "2 checked bags (20 kg each) and 1 cabin bag included",
      "Excess or overweight luggage charged at ₹500/kg",
      "Valuable items (jewellery, electronics) should use in-cabin safe",
      "Prohibited items: irons, candles, alcohol from shore, weapons",
    ],
  },
  {
    icon: <CurrencyRupeeIcon className="w-5 h-5 text-rose-500" />,
    title: "Cancellations & Refunds",
    bg: "bg-rose-50 border-rose-100",
    points: [
      "Full refund if cancelled 30+ days before departure",
      "50% refund for cancellations 15–29 days before sailing",
      "No refund within 14 days — travel insurance strongly recommended",
      "Refunds processed within 7–10 business days to original payment",
    ],
  },
];

const FAQS = [
  {
    q: "What documents do I need to board a cruise?",
    a: "For domestic cruises: a valid government-issued photo ID (Aadhaar, Passport, or Voter ID) and your printed or digital e-ticket. For international cruises (e.g., Dubai, Maldives), a valid passport with at least 6 months validity and any required visas are mandatory.",
  },
  {
    q: "Is food and drink included in the cruise price?",
    a: "Most cruise fares include buffet meals and non-alcoholic beverages. À la carte restaurants, alcohol, specialty coffees, and soft drinks may be charged separately. We offer 'All Inclusive' upgrades at checkout that cover most onboard dining and beverages.",
  },
  {
    q: "What should I pack for a cruise?",
    a: "Comfortable casuals for daytime, smart-casual or formal wear for evening dinners (some ships have formal nights), swimwear, sunscreen, and any personal medications. Most ships have dress codes for specialty restaurants — check your sailing's guidelines.",
  },
  {
    q: "Are cruises suitable for elderly passengers or those with disabilities?",
    a: "Yes — modern cruise ships are highly accessible. Most ships offer wheelchair-accessible cabins, elevators between all decks, and special dietary accommodations. Contact us at the time of booking to arrange any specific accessibility requirements.",
  },
  {
    q: "What happens at port stops — do I have to return to the ship?",
    a: "You're free to explore each port independently or book guided shore excursions. However, the ship departs on schedule regardless — if you miss the ship at a port, you must make your own travel arrangements to the next port at your own expense.",
  },
  {
    q: "Is seasickness common, and how do I manage it?",
    a: "Modern large cruise ships have stabilizers that significantly reduce motion. Seasickness varies by route and sea conditions. We recommend OTC motion sickness tablets (consult a doctor), pressure-point wristbands, or staying on upper-middle decks near the center of the ship if prone to motion sickness.",
  },
];

export default function CruiseTravelInfo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-14 space-y-10 md:space-y-16">
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              Which Cabin is Right for You?
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
              From budget-friendly interiors to grand suites — every ocean,
              every budget.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {CABIN_TYPES.map((cabin) => (
              <div
                key={cabin.id}
                className={`shrink-0 w-64 md:w-auto snap-center rounded-2xl md:rounded-3xl border-2 ${cabin.color} overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group`}
              >
                <div className={`${cabin.headerColor} px-4 py-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-black text-sm md:text-base">
                      {cabin.name}
                    </h3>
                    <span className="text-lg">{cabin.emoji}</span>
                  </div>
                  <span className="inline-block mt-1 text-[9px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {cabin.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/60 py-3 px-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Starting from
                    </p>
                    <p className="text-base font-black text-gray-900">
                      {cabin.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Per night
                    </p>
                    <p className="text-xs font-black text-blue-600">
                      {cabin.perNight}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <ul className="space-y-1.5">
                    {cabin.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-700 font-medium"
                      >
                        <CheckCircleIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-bold bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      <UserGroupIcon className="w-2.5 h-2.5" /> Max{" "}
                      {cabin.maxGuests}
                    </span>
                    <span className="text-[9px] font-bold bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      {cabin.level}
                    </span>
                  </div>

                  <div className="bg-white/60 rounded-xl p-2.5">
                    <p className="text-[10px] text-gray-500 leading-snug">
                      {cabin.bestFor}
                    </p>
                  </div>

                  <button className="w-full text-[10px] cursor-pointer font-black text-blue-600 uppercase tracking-wider flex items-center justify-center gap-1.5 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100">
                    View Sailings{" "}
                    <InformationCircleIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="bg-slate-900 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-8 -mt-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-white/10 rounded-lg">
                  <ShieldCheckIcon className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-black">
                    Safety at Sea
                  </h3>
                  <p className="text-xs text-gray-400">
                    International maritime standards, always
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {SAFETY_POINTS.map((point, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="h-3 w-3 text-teal-400" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-300 font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl md:rounded-3xl p-5 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BoltIcon className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base md:text-xl font-black text-gray-900">
                  Smart Cruise Tips
                </h3>
                <p className="text-xs text-gray-500">Sail smarter, save more</p>
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

        <div className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-5 md:mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <NoSymbolIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-black text-gray-900">
                Boarding Rules & Policies
              </h3>
              <p className="text-xs text-gray-500">Know before you sail</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {POLICIES.map((policy, i) => (
              <div
                key={i}
                className={`${policy.bg} border rounded-xl p-4 md:p-5`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-white rounded-lg p-1.5 shadow-sm">
                    {policy.icon}
                  </div>
                  <h4 className="font-black text-gray-800 text-xs md:text-sm">
                    {policy.title}
                  </h4>
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
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5 md:mb-7">
            <QuestionMarkCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-gray-500 hidden md:block">
                Everything you need to know before you sail
              </p>
            </div>
          </div>
          <div className="space-y-2.5 md:space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`bg-white border rounded-xl md:rounded-2xl overflow-hidden transition-all ${openFaq === i ? "border-teal-200 shadow-sm" : "border-gray-100"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 text-left gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800 text-xs md:text-sm">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 text-teal-600 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
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

        <div className="bg-linear-to-r from-teal-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-lg md:text-2xl font-black mb-1">
              Need Help Planning Your Cruise?
            </h3>
            <p className="text-teal-100 text-xs md:text-sm max-w-md">
              Our cruise specialists are available 24/7. Get personalised
              itinerary advice, cabin recommendations, and instant booking
              support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto shrink-0">
            <button className="bg-white text-teal-700 font-black px-5 py-2.5 rounded-xl text-sm hover:bg-teal-50 transition-colors  flex items-center justify-center gap-2">
              <PhoneIcon className="w-4 h-4" /> Call a Cruise Expert
            </button>
            <button className="bg-white/10 border border-white/30 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors  flex items-center justify-center gap-2">
              <ChatBubbleLeftRightIcon className="w-4 h-4" /> Live Chat
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
