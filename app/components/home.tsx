import Navbar from "@/app/components/navBar";
import SearchBar from "@/app/components/searchBar";
import HeroImage from "@/public/assets/hero-image.jpg";
import TextType from "@/app/components/textType";
import TravelSection from "./travelSection";
import TourPackages from "./tourPackageCard";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      {/* 
        HERO SECTION WRAPPER 
        min-h-screen ensures it takes up the full viewport height.
        relative ensures the background stays within this section.
      */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Image - Applied only to this section */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${HeroImage.src}')`,
          }}
        >
          {/* Optional Overlay to make text pop if needed, otherwise remove */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center grow w-full px-4 pt-28 pb-10 md:pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center max-w-5xl leading-[1.1] mb-8 md:mb-12 drop-shadow-2xl">
            <TextType
              typingSpeed={120}
              pauseDuration={5000}
              text={"Where Every Journey Become An Adventure"}
            />
          </h1>
          <div className="w-full flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <TravelSection />
      <TourPackages />
    </main>
  );
}
