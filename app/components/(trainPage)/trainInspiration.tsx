"use client";

import React from "react";
import {
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

const POPULAR_ROUTES = [
  {
    id: 1,
    from: "Delhi",
    to: "Varanasi",
    train: "Vande Bharat Exp",
    time: "8h 00m",
    price: "₹1,750",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop", // Varanasi
    tag: "Fastest",
    color: "bg-blue-600",
  },
  {
    id: 2,
    from: "Mumbai",
    to: "Goa",
    train: "Tejas Express",
    time: "8h 50m",
    price: "₹1,500",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop", // Goa
    tag: "Scenic",
    color: "bg-green-600",
  },
  {
    id: 3,
    from: "Bangalore",
    to: "Mysore",
    train: "Shatabdi Exp",
    time: "2h 00m",
    price: "₹450",
    image:
      "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=800&auto=format&fit=crop", // Mysore
    tag: "Weekend",
    color: "bg-orange-500",
  },
  {
    id: 4,
    from: "Kolkata",
    to: "Darjeeling",
    train: "Himalayan Rail",
    time: "12h 30m",
    price: "₹800",
    image:
      "https://images.unsplash.com/photo-1544634076-a90160daae49?q=80&w=800&auto=format&fit=crop", // Mountains
    tag: "Heritage",
    color: "bg-purple-600",
  },
];

export default function TrainInspiration() {
  return (
    <div className="w-full max-w-full mx-auto px-3 py-10 md:px-0 mb-2 font-sans">
      {/* Header */}
      <div className="flex px-10 items-center justify-between mb-4 ">
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Trending Journeys
          </h2>
          <FireIcon className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
        </div>
        <button className="text-xs md:text-sm text-blue-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      {/* Cards Container - Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="flex px-10 md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {POPULAR_ROUTES.map((route) => (
          <div
            key={route.id}
            className="group min-w-60 md:min-w-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 snap-center cursor-pointer"
          >
            {/* Image Section */}
            <div className="relative h-32 md:h-40 overflow-hidden">
              <img
                src={route.image}
                alt={route.to}
                className="w-full h-full object-cover  transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              {/* Badge */}
              <span
                className={`absolute top-2 left-2 ${route.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm`}
              >
                {route.tag}
              </span>

              {/* Price Overlay */}
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                <p className="text-xs font-bold text-gray-800">
                  from {route.price}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-800 text-sm truncate">
                  {route.from} <span className="text-gray-400">→</span>{" "}
                  {route.to}
                </h3>
              </div>

              <p className="text-xs text-gray-500 mb-3 truncate">
                {route.train}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-500">
                  <ClockIcon className="h-3 w-3" />
                  <span className="text-[10px] font-medium">{route.time}</span>
                </div>

                <div className="flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span className="text-[10px] font-bold uppercase">Book</span>
                  <ArrowRightIcon className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
