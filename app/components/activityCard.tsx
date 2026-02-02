"use client";
import { MapPin, Star, Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface activity {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: string;
  image: string;
  pricePerNight: string;
  oldPrice?: string;
}
interface ActivityCardProps {
  activity: activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Link href={`/activities/${activity.id}`} className="block h-full">
      <div className="group hover:cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          {activity.image ? (
            <Image
              src={activity.image}
              alt={activity.name}
              fill
              className="object-cover transition-transform duration-500 "
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-600 transition-colors z-10">
            <Heart className="w-3.5 h-3.5" />
          </button>

          <div className="absolute bottom-3 left-3 bg-[#5b21b6] text-white px-3 py-1 rounded-md text-xs font-bold flex gap-2 items-center z-10">
            {activity.oldPrice && (
              <span className="text-gray-300 line-through font-normal opacity-80">
                {activity.oldPrice}
              </span>
            )}
            <span>{activity.pricePerNight}</span>
          </div>
        </div>

        <div className="p-4 flex flex-col grow">
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="capitalize">{activity.location}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
            {activity.name}
          </h3>

          <div className="flex items-center gap-2 text-gray-500 text-xs border-t border-gray-100 pt-3 mt-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>{activity.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
