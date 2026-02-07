"use client";
import { useRef } from "react";

const DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    tours: "1 Tour",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rome",
    tours: "1 Tour",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "New York City",
    tours: "2 Tours",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e6653cb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Tokyo",
    tours: "2 Tours",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "London",
    tours: "3 Tours",
    image:
      "https://images.unsplash.com/photo-1513635269975-59693e2d8400?q=80&w=600&auto=format&fit=crop",
  },
];

const LocationSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slide = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-5 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          {/* Titles */}
          <div>
            <p className="text-purple-600 text-lg italic font-medium tracking-wide font-serif mb-2">
              Next Adventure Destination
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight max-w-xl">
              Popular Travel Destinations Available Worldwide
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => slide("left")}
              className="w-12 hover:cursor-pointer h-12 flex items-center justify-center bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-800 rounded-full transition-all duration-300 shadow-sm"
              aria-label="Slide Left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => slide("right")}
              className="w-12 h-12 hover:cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-800 rounded-full transition-all duration-300 shadow-sm"
              aria-label="Slide Right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {DESTINATIONS.map((card) => (
            <div
              key={card.id}
              className="relative min-w-62 md:min-w-70 h-95 md:h-75 rounded-2xl overflow-hidden snap-start shadow-lg group cursor-pointer"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-700 "
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-3 border border-white/30 rounded-xl pointer-events-none" />

              <div className="absolute bottom-6 w-full px-6 flex flex-col items-center">
                <span className="bg-[#7c3aed] text-white text-xs font-bold px-4 py-1.5 rounded-sm mb-3 shadow-md">
                  {card.tours}
                </span>
                <h3 className="text-white text-2xl font-bold tracking-wide">
                  {card.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
