"use client";
import { useState, useEffect, Activity } from "react";
import ActivityCard from "./activityCard";

interface ApiActivity {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: string;
  image: string;
  oldPrice?: string;
  pricePerNight: string;
  images: string[];
  facilities: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface activity {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: string;
  image: string;
  oldPrice?: string;
  pricePerNight: string;
  images: string[];
  facilities: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

const TourPackages = () => {
  const [activity, setActivity] = useState<activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/activity-management");

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data);
          setActivity([]);
          return;
        }

        const formattedData: activity[] = data.map((item: ApiActivity) => {
          const priceNum = parseFloat(item.pricePerNight) || 0;
          return {
            id: item.id,
            name: item.name,
            location: item.location,
            description: item.description,
            duration: item.duration,
            image:
              Array.isArray(item.images) && item.images.length > 0
                ? item.images[0]
                : "",
            oldPrice: (priceNum * 1.2).toFixed(2),
            pricePerNight: item.pricePerNight,
            images: item.images,
            facilities: item.facilities,
            available: item.available,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });

        setActivity(formattedData);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setActivity([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
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
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-87 bg-gray-100 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activity.length > 0 ? (
              activity
                .slice(0, 8)
                .map((tour) => <ActivityCard key={tour.id} activity={tour} />)
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No tours available at the moment.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TourPackages;
