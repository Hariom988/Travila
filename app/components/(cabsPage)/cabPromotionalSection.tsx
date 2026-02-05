"use client";

import {
  ArrowRight,
  Navigation,
  Zap,
  CheckCircle2,
  TrendingUp,
  Star,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const POPULAR_ROUTES = [
  {
    from: "Mumbai",
    to: "Pune",
    distance: "148 km",
    time: "3h 15m",
    price: "2,499",
    oldPrice: "3,200",
    image:
      "https://images.unsplash.com/photo-1570160896387-99c15d488941?auto=format&fit=crop&q=80&w=400",
  },
  {
    from: "Delhi",
    to: "Agra",
    distance: "233 km",
    time: "4h 10m",
    price: "3,150",
    oldPrice: "4,000",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400",
  },
  {
    from: "Bangalore",
    to: "Mysore",
    distance: "145 km",
    time: "3h 30m",
    price: "2,100",
    oldPrice: "2,800",
    image:
      "https://images.unsplash.com/photo-1580226689038-07248383842f?auto=format&fit=crop&q=80&w=400",
  },
];

export default function CompactCabPromotional() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-12 px-4 space-y-8 md:space-y-12">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1">
              <TrendingUp size={14} /> Top Destinations
            </div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
              Popular Routes
            </h2>
          </div>
          <button className="text-blue-600 font-bold text-xs md:text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {POPULAR_ROUTES.map((route, idx) => (
            <div
              key={idx}
              className="group flex md:flex-col bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative w-28 md:w-full h-28 md:h-40 shrink-0 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.to}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-[8px] md:text-xs font-bold opacity-90 flex items-center gap-1">
                    <Navigation size={10} /> {route.distance}
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-800 text-sm md:text-base">
                      {route.from}
                    </span>
                    <ArrowRight size={12} className="text-gray-400" />
                    <span className="font-bold text-gray-800 text-sm md:text-base">
                      {route.to}
                    </span>
                  </div>
                  <p className="hidden md:block text-[10px] text-gray-400 mb-3 font-medium">
                    Est. journey time: {route.time}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="leading-tight">
                    <span className="text-[10px] text-gray-400 line-through tracking-tighter">
                      ₹{route.oldPrice}
                    </span>
                    <div className="text-base md:text-xl font-black text-gray-900 leading-none">
                      ₹{route.price}
                    </div>
                  </div>
                  <button className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-600 text-[10px] md:text-sm font-black rounded-lg md:rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-gray-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 text-white">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="max-w-xl space-y-4 md:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">
                Flash Sale
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-black leading-tight italic">
              FLAT 20% OFF <br />
              <span className="text-blue-400 text-lg md:text-3xl not-italic tracking-tight">
                On your first booking
              </span>
            </h2>

            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                <CheckCircle2 size={16} className="text-blue-400" /> Use:{" "}
                <span className="font-black text-white bg-white/10 px-2 py-0.5 rounded">
                  FIRSTCAB20
                </span>
              </div>
              <button className="w-full md:w-auto bg-white text-gray-900 font-black px-6 py-2.5 rounded-full text-xs md:text-sm transition-transform active:scale-95">
                Apply Now
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 w-full max-w-70 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex flex-col items-center text-center space-y-3 relative z-10">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg leading-tight uppercase tracking-tighter">
                  Trusted Service
                </h4>
                <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                  10,000+ Verified Trips Completed
                </p>
              </div>

              <div className="w-full h-px bg-white/10 my-1" />

              <div className="space-y-2 w-full">
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-300">
                  <ShieldCheck size={14} /> 100% Secure Payments
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-300">
                  <MessageCircle size={14} /> WhatsApp Assistance
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white font-black py-2.5 rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
