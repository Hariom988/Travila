"use client";
import {
  InformationCircleIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ClockIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

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
  },
  {
    title: "Semi-Sleeper",
    description: "Comfortable for 5-8 hour journeys.",
    features: [
      "Reclining Seats",
      "Calf Support",
      "Extra Legroom",
      "USB Charging",
    ],
    level: "Popular",
    color: "bg-blue-600",
  },
  {
    title: "Standard Seater",
    description: "Economical for short day-trips.",
    features: ["2+2 Layout", "Push-back Seats", "Standard AC", "Window Views"],
    level: "Budget",
    color: "bg-slate-700",
  },
];

const TRAVEL_TIPS = [
  {
    icon: <ClockIcon className="h-5 w-5 text-orange-500" />,
    title: "Boarding Time",
    info: "Arrive 15 mins before.",
  },
  {
    icon: <BriefcaseIcon className="h-5 w-5 text-blue-500" />,
    title: "Luggage Policy",
    info: "Limit is 15kg/person.",
  },
  {
    icon: <NoSymbolIcon className="h-5 w-5 text-red-500" />,
    title: "Cancellation",
    info: "100% refund (24h prior).",
  },
];

export default function BusTravelInfo() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10 md:space-y-16 bg-white overflow-hidden">
      <div className="text-left md:text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
          New to Bus Travel? <br className="md:hidden" />
          <span className="text-blue-600 md:text-gray-900">
            Here’s the guide.
          </span>
        </h2>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
          Pick the right bus for your journey with our quick comparison guide.
        </p>
      </div>

      <div className="relative">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {BUS_CLASSES.map((bus, idx) => (
            <div
              key={idx}
              className="shrink-0 w-70 md:w-auto snap-center group cursor-pointer relative bg-white rounded-2xl p-5 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div
                className={`inline-block px-2.5 py-0.5 rounded-full ${bus.color} text-white text-[9px] font-black uppercase tracking-widest mb-3`}
              >
                {bus.level}
              </div>

              <h3 className="text-lg md:text-xl font-black text-gray-900 mb-1">
                {bus.title}
              </h3>
              <p className="text-xs text-gray-500 mb-4 font-medium leading-tight">
                {bus.description}
              </p>

              <ul className="space-y-2.5">
                {bus.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs font-bold text-gray-700"
                  >
                    <CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                  Class Details{" "}
                  <InformationCircleIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="lg:w-1/3 text-white space-y-3">
            <h2 className="text-xl md:text-3xl font-black leading-tight">
              Travel smart
            </h2>
            <p className="text-blue-200 text-xs md:text-sm font-medium">
              Small details for a better journey experience.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-green-400 font-bold text-[10px] md:text-xs">
              <ShieldCheckIcon className="h-4 w-4" />
              <span>Insurance Included</span>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TRAVEL_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white/5 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 backdrop-blur-lg border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="bg-white p-1.5 rounded-lg shrink-0 sm:mb-3 shadow-md">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="text-white text-xs md:text-sm font-black mb-0.5 tracking-tight">
                    {tip.title}
                  </h4>
                  <p className="text-blue-100/60 text-[10px] md:text-xs font-medium leading-snug">
                    {tip.info}
                  </p>
                </div>
              </div>
            ))}
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
