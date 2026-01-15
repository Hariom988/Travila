"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Star, Clock, Heart, ArrowRight } from "lucide-react";

interface ApiHotel {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: string;
  images: string[];
  facilities: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  price: string;
  oldPrice?: string;
  rating: number;
  reviews: number;
  days: number;
  isOnSale: boolean;
}

const TourPackages = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // FETCH DATA
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/hotels");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data);
          setTours([]);
          return;
        }

        const formattedData: Tour[] = data.map((item: ApiHotel) => {
          const priceNum = parseFloat(item.pricePerNight) || 0;
          return {
            id: item.id,
            title: item.name,
            location: item.location,
            image:
              Array.isArray(item.images) && item.images.length > 0
                ? item.images[0]
                : "",
            price: item.pricePerNight,
            oldPrice: (priceNum * 1.2).toFixed(2),
            rating: 5,
            reviews: Math.floor(Math.random() * 20) + 1,
            days: 4,
            isOnSale: true,
          };
        });

        setTours(formattedData);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <p className="text-purple-600 font-bold italic mb-2">
              Most Popular Tour Packages
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              Our Popular Tours
            </h2>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[350px] bg-gray-100 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* TOUR CARDS GRID */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.length > 0 ? (
              tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No tours available at the moment.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none w-80 h-80 z-0">
        <div className="relative w-full h-full">
          {/* <Image
            src="https://cdn-icons-png.flaticon.com/512/3028/3028563.png" // Placeholder
            alt="Palm tree decoration"
            fill
            className="object-contain object-bottom-right"
          /> */}
        </div>
      </div>
    </section>
  );
};

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="group hover:cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-500 "
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Sale Badge */}
        {tour.isOnSale && (
          <div className="absolute top-4 left-0 bg-[#ff6b35] text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-md z-10 uppercase tracking-wide">
            Sale Offer
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-600 transition-colors z-10">
          <Heart className="w-3.5 h-3.5" />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-[#5b21b6] text-white px-3 py-1 rounded-md text-xs font-bold flex gap-2 items-center z-10">
          {tour.oldPrice && (
            <span className="text-gray-300 line-through font-normal opacity-80">
              ${tour.oldPrice}
            </span>
          )}
          <span>${tour.price}</span>
        </div>
      </div>

      {/* 
         CONTENT AREA: 
         Reduced padding from p-6 to p-4 
      */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span className="capitalize">{tour.location}</span>
        </div>

        {/* Title: Reduced text size to text-lg */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
          {tour.title}
        </h3>

        {/* Rating: Reduced bottom margin */}
        <div className="flex items-center gap-1 mb-3 mt-auto">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < tour.rating
                  ? "fill-orange-400 text-orange-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">
            ({tour.reviews} Reviews)
          </span>
        </div>

        {/* Footer: Reduced top padding */}
        <div className="flex items-center gap-2 text-gray-500 text-xs border-t border-gray-100 pt-3 mt-auto">
          <Clock className="w-3.5 h-3.5" />
          <span>{tour.days} Days</span>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;
