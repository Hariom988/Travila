"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import TourCard from "@/app/components/tourCard";

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

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/hotels");

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

        {/* TOUR CARDS GRID */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.length > 0 ? (
              tours
                .slice(0, 8)
                .map((tour) => <TourCard key={tour.id} tour={tour} />)
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
