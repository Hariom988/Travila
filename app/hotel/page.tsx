"use client";
import { useState, useEffect, useMemo } from "react";
import TourCard from "@/app/components/tourCard";

interface ApiHotel {
  id: string;
  name: string;
  location: string;
  images: string[];
  pricePerNight: string;
}

interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  price: string;
  oldPrice: string;
  rating: number;
  reviews: number;
  days: number;
  isOnSale: boolean;
}

type SortOption = "default" | "price-low" | "price-high" | "rating";

export default function HotelPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/hotels");
        const data = await res.json();

        if (!Array.isArray(data)) {
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
            rating: Math.floor(Math.random() * 2) + 4, // Mock rating 4-5
            reviews: Math.floor(Math.random() * 20) + 1,
            days: 4,
            isOnSale: true,
          };
        });

        setTours(formattedData);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    return tours
      .filter((tour) => {
        const matchesSearch =
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = parseFloat(tour.price) <= maxPrice;
        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low")
          return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === "price-high")
          return parseFloat(b.price) - parseFloat(a.price);
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [tours, searchQuery, sortBy, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available Hotels</h1>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-end">
        {/* Search */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Destination
          </label>
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Price Filter */}
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            className="w-full p-2 border rounded-lg outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">Loading hotels...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTours.length > 0 ? (
            filteredTours
              .slice(0, 12)
              .map((tour) => <TourCard key={tour.id} tour={tour} />)
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
              No hotels match your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
