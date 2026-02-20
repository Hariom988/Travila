import React from "react";
import HeroImage from "@/public/assets/explore/hero-image.jpg";
import ScrollFloat from "./scrollFoat";

const ExploreSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section
      className="relative w-full h-dvh bg-cover bg-center flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      style={{
        backgroundImage: `url('${HeroImage.src}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
        <p className="text-white text-lg md:text-2xl italic font-medium tracking-wide drop-shadow-md font-serif">
          Next Adventure Destination
        </p>

        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Popular Travel Destinations <br className="hidden md:block" />
          Available Worldwide
        </h1>

        <button
          onClick={scrollToTop}
          className="group mt-4 bg-purple-100 hover:bg-white text-purple-700 px-8 py-3.5 rounded-md font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:cursor-pointer"
        >
          Book your trip Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-linear-to-t from-white via-white/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-[-2%] left-0 w-full z-10 flex justify-center pointer-events-none">
        <ScrollFloat
          animationDuration={1.2}
          ease="power2.out"
          scrollStart="top bottom"
          scrub={false}
          stagger={0.05}
          containerClassName="w-full text-center p-0 m-0 leading-[0.9] md:leading-none"
          textClassName="
    font-black uppercase 
    text-3xl sm:text-5xl md:text-6xl 
    tracking-tighter md:tracking-widest 
    text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] 
    opacity-70
  "
        >
          EXPLORE THE WORLD
        </ScrollFloat>
      </div>
    </section>
  );
};

export default ExploreSection;
