"use client";
import SearchBar from "@/app/components/searchBar";
import HeroImage from "@/public/assets/hero-image.jpg";
import TextType from "@/app/components/textType";
import TravelSection from "./travelSection";
import TourPackages from "./tourPackageCard";
import DiscoverSection from "./discoverSection";
import ExploreSection from "./exploreSection";
import LocationSection from "./locationSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearch = (params: {
    searchQuery: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
  }) => {
    router.push(
      `/hotel?search=${params.searchQuery}&checkIn=${params.checkIn}&checkOut=${params.checkOut}&rooms=${params.rooms}&adults=${params.adults}`,
    );
  };

  return (
    <main className="w-full flex flex-col">
      <section className="relative min-h-screen flex flex-col">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${HeroImage.src}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
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
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <TravelSection />
      <TourPackages />
      <ExploreSection />
      <LocationSection />
      <DiscoverSection />
    </main>
  );
}
