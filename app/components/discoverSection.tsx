"use client";
import Image from "next/image";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";
// Replace with your actual asset imports
import image1 from "@/public/assets/discover-section/image1.jpg"; // Couple Image
import image2 from "@/public/assets/discover-section/image2.jpg"; // Aerial Beach Image

const DiscoverSection = () => {
  return (
    <section className="relative w-full py-12 px-4 lg:px-10 lg:py-10 overflow-hidden bg-white">
      {/* 1. LEFT BACKGROUND WATERMARK (Map) */}
      <div className="absolute top-0 left-0 w-[40%] h-full z-0 hidden lg:block opacity-30 pointer-events-none">
        <div className="w-full h-full bg-linear-to-r from-gray-100 to-transparent mask-image-map"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* --- LEFT COLUMN: TEXT CONTENT --- */}
          <div className="flex flex-col items-start text-left max-w-xl z-20">
            <p className="text-[#6300ee] font-bold italic text-lg mb-3 tracking-wide">
              Dream Your Next Trip
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1a1a1a] leading-[1.1] mb-6 lg:mb-8">
              Discover When Even <br className="hidden md:block" />
              You Want To Go
            </h2>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 lg:mb-10 pr-0 lg:pr-4">
              Are You Tired Of The Typical Tourist Destinations And Looking To
              Step Out Of Your Comfort Zone? Adventure Travel May Be The Perfect
              Solution For You! Here Are Four.
            </p>

            {/* Features List */}
            <div className="flex flex-col gap-6 lg:gap-8 mb-10 lg:mb-12 w-full">
              <div className="flex items-start gap-4 lg:gap-5">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Globe className="w-7 h-7 lg:w-8 lg:h-8 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Best Travel Agency
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                    Are you tired of the typical tourist Destinations and
                    looking step out of your comfort.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:gap-5">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 lg:w-8 lg:h-8 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Secure Journey With Us
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                    Are you tired of the typical tourist destination and looking
                    step out of your comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-[#6300ee] hover:bg-[#5000cc] hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center">
              BOOK YOUR TRIP
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* --- RIGHT COLUMN: IMAGES --- */}
          {/* UPDATED: Added 'hidden lg:flex' so this entire block vanishes on mobile */}
          <div className="hidden lg:flex relative w-full h-120 items-center justify-end">
            {/* Compass */}
            <div className="absolute top-10 -left-10 w-32 h-32 z-0 opacity-40 animate-spin-slow">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-gray-400 fill-none stroke-current stroke-[1.5]"
              >
                <circle cx="50" cy="50" r="45" />
                <path d="M50 5 L50 95 M5 50 L95 50 M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
              </svg>
            </div>

            {/* Vertical Text */}
            <div className="absolute top-1/2 -translate-y-1/2 hidden xl:block z-0 select-none pointer-events-none">
              <h2
                className="text-[100px] font-bold tracking-[0.2em] leading-none uppercase"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  WebkitTextStroke: "2px #e5e7eb",
                  color: "transparent",
                }}
              >
                TRAVEL
              </h2>
            </div>

            {/* IMAGE WRAPPER */}
            <div className="relative w-105 h-122 z-10 mr-16">
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[85%] h-full rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
                <Image
                  src={image2}
                  alt="Aerial Beach View"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              {/* Overlay Image */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-60 h-60 rounded-4xl border-12 border-white overflow-hidden shadow-2xl z-20">
                <Image
                  src={image1}
                  alt="Couple Traveling"
                  fill
                  className="object-cover"
                  sizes="260px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DiscoverSection;
