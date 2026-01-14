import Navbar from "@/app/components/navBar";
import SearchBar from "@/app/components/searchBar";
import HeroImage from "@/public/assets/hero-image.jpg";
import HeroImage2 from "@/public/assets/hero-image2.jpg";
import TextType from "@/app/components/textType";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* 1. Background Image Wrapper */}
      {/* Using a pseudo-element logic via generic div to ensure full coverage */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Placeholder Image - Replace with your local import
          backgroundImage: `url('${HeroImage.src}')`,
        }}
      ></div>

      <Navbar />

      {/* 2. Hero Content Container */}
      {/* pt-28 ensures content starts below navbar. min-h-screen keeps it full height. */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-4 pt-28 pb-10 md:pt-20">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center max-w-5xl leading-[1.1] mb-8 md:mb-12 drop-shadow-2xl">
          <TextType
            typingSpeed={120}
            pauseDuration={5000}
            text={"Where Every Journey Become An Adventure"}
          />
        </h1>

        {/* Search Bar Wrapper */}
        <div className="w-full flex justify-center">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
