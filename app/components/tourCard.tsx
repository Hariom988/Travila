import { MapPin, Star, Clock, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

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
interface TourCardProps {
  tour: Tour;
}

import React from "react";

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
      <div className="p-4 flex flex-col grow">
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

export default TourCard;
