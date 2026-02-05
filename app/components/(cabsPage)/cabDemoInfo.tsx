"use client";
import {
  Users,
  Briefcase,
  ShieldCheck,
  Clock,
  Tag,
  MapPin,
  Car,
  ChevronRight,
  Star,
  Search,
  CheckCircle,
  Headphones,
} from "lucide-react";

const FLEET_CATEGORIES = [
  {
    id: "hatchback",
    name: "Hatchback",
    description: "Economical for small groups",
    seats: 4,
    bags: 2,
    pricePerKm: "₹12/km",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400",
    color: "bg-green-500",
  },
  {
    id: "sedan",
    name: "Sedan",
    description: "Extra legroom & luggage space",
    seats: 4,
    bags: 3,
    pricePerKm: "₹14/km",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=400",
    color: "bg-blue-500",
  },
  {
    id: "suv",
    name: "SUV",
    description: "Perfect for family vacations",
    seats: 6,
    bags: 5,
    pricePerKm: "₹18/km",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
    color: "bg-purple-500",
  },
];

const BENEFITS = [
  {
    icon: <ShieldCheck size={18} className="text-green-600" />,
    title: "Verified Drivers",
  },
  {
    icon: <Clock size={18} className="text-blue-600" />,
    title: "Zero Cancellations",
  },
  {
    icon: <Tag size={18} className="text-orange-600" />,
    title: "Fixed Pricing",
  },
  { icon: <Car size={18} className="text-purple-600" />, title: "Clean Cars" },
];

export default function CompactCabDemoInfo() {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 md:py-14 px-4 space-y-8 md:space-y-16">
      <section>
        <div className="mb-6">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
            Our Premium Fleet
          </h2>
          <p className="text-[10px] md:text-base text-gray-500 font-medium mt-1 uppercase tracking-wider">
            Best-in-class comfort for every budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          {FLEET_CATEGORIES.map((fleet) => (
            <div
              key={fleet.id}
              className="flex  cursor-pointer md:flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative w-32 md:w-full h-28 md:h-48 shrink-0 overflow-hidden">
                <img
                  src={fleet.image}
                  alt={fleet.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-2 left-2 ${fleet.color} text-white text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest`}
                >
                  {fleet.pricePerKm}
                </div>
              </div>

              <div className="p-3 md:p-6 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base md:text-2xl font-black text-gray-800 truncate">
                      {fleet.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star
                        size={10}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-[10px] font-bold text-gray-600">
                        4.8
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-sm text-gray-500 mb-2 md:mb-4 line-clamp-1">
                    {fleet.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4 border-t border-gray-50 pt-2 md:pt-4">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                    <Users size={12} /> {fleet.seats}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                    <Briefcase size={12} /> {fleet.bags}
                  </span>
                  <button className="ml-auto  cursor-pointer text-blue-600 font-bold text-[10px] md:text-xs flex items-center gap-0.5">
                    Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-4xl md:rounded-[3rem] p-5 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
              Book in <span className="text-blue-600">3 Easy Steps</span>
            </h2>

            <div className="space-y-3 md:space-y-4">
              {[
                {
                  icon: <Search size={18} className="text-blue-500" />,
                  title: "Search Route",
                  desc: "Select from over 250+ intercity destinations.",
                },
                {
                  icon: <CheckCircle size={18} className="text-green-500" />,
                  title: "Select Cab",
                  desc: "Choose Hatchback, Sedan or SUV as per your need.",
                },
                {
                  icon: <MapPin size={18} className="text-purple-500" />,
                  title: "Enjoy Journey",
                  desc: "Doorstep pickup and verified professional drivers.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 bg-white/60 p-3 rounded-xl border border-white/50"
                >
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs md:text-sm">
                      {step.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-gray-50 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                <Headphones size={24} className="text-white md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-2">
                Need Booking Help?
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-6 max-w-62">
                Our experts are available 24/7 to help you plan your journey.
              </p>
              <button className="bg-gray-900 cursor-pointer text-white font-black px-6 md:px-10 py-2.5 md:py-3.5 rounded-full text-xs md:text-sm transition-transform active:scale-95 shadow-lg">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 pt-8">
        {[
          { label: "Happy Users", value: "1M+" },
          { label: "Cities Covered", value: "250+" },
          { label: "Safe Kms", value: "50M+" },
          { label: "Expert Drivers", value: "15K+" },
        ].map((stat, i) => (
          <div key={i} className="text-center group">
            <h3 className="text-xl md:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
              {stat.value}
            </h3>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
