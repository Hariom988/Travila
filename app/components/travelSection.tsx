"use client";
import Image from "next/image";
import { ArrowUp, ArrowRight } from "lucide-react";
import image1 from "@/public/assets/travel-section/image1.jpg";
import image2 from "@/public/assets/travel-section/image2.jpg";
import image3 from "@/public/assets/travel-section/image3.jpg";
import image4 from "@/public/assets/travel-section/image4.jpg";

const TravelSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-[#f9f9f9] py-15 sm:py-20 overflow-hidden">
      {/* Main Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN: Images (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-8 items-center lg:items-end">
            {/* Top Left Image */}
            <div className="relative group">
              <div className="w-64 h-48 relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={image1.src}
                  alt="Dubai Beach"
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Left Image (Smaller) */}
            <div className="relative group translate-x-4 lg:translate-x-0 lg:mr-8">
              <div className="w-48 h-36 relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={image2.src}
                  alt="Tropical Resort"
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Content */}
          <div className="col-span-1 lg:col-span-6 text-center flex flex-col items-center justify-center px-4">
            {/* Logo Placeholder */}
            <div className="mb-2">
              <div className="opacity-20 text-5xl font-bold tracking-tighter text-gray-400 select-none">
                Travila
              </div>
              <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mt-1">
                A Travel Agency
              </p>
            </div>

            {/* Purple Handwriting Text */}
            <p className="text-purple-600 font-semibold italic mt-6 mb-2">
              Most Popular Tour
            </p>

            {/* Main Headline */}
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Let's Discover The World <br />
              With Our Excellent Eyes
            </h2>

            {/* --- MOBILE ONLY: 2 Images displayed here --- */}
            <div className="flex lg:hidden gap-4 mb-8 w-full justify-center">
              <div className="w-40 h-32 relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={image1.src}
                  alt="Mobile View 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-40 h-32 relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={image3.src}
                  alt="Mobile View 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Subtext (Hidden on Mobile, Visible on Desktop) */}
            <p className="hidden md:block text-gray-500 text-sm md:text-base max-w-lg leading-relaxed mb-10">
              Whether You're Looking For A Romantic Getaway, a Family-Friendly
              Solo Journey To Explore The World, A Travel Agency Can Provide
              Tailored Itinerary That Exceeds Your Expectations.
            </p>

            {/* CTA Button */}
            <button className="group bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all duration-300">
              TAKE A TOUR
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* RIGHT COLUMN: Images (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-8 items-center lg:items-start">
            {/* Top Right Image */}
            <div className="relative group">
              <div className="w-64 h-48 relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={image3.src}
                  alt="Relaxing on Beach"
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Right Image (Smaller) */}
            <div className="relative group -translate-x-4 lg:translate-x-0 lg:ml-8">
              <div className="w-48 h-36 relative rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={image4.src}
                  alt="Ocean View"
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Top Button */}
      <div className="absolute right-4 bottom-10 md:right-10 md:bottom-20 z-50 flex flex-col items-center gap-2">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default TravelSection;
