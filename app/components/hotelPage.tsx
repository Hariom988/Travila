"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowLeft, ArrowUpDown, X } from "lucide-react";
import SearchBar from "./searchBar";
import TourCard from "./tourCard";

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

type SortOption = "high-to-low" | "low-to-high" | "top-rated" | "default";

const PRICE_RANGES = [
  { label: "₹0-₹1500", min: 0, max: 1500 },
  { label: "₹1500-₹2500", min: 1500, max: 2500 },
  { label: "₹2500-₹5000", min: 2500, max: 5000 },
  { label: "₹5000-₹7500", min: 5000, max: 7500 },
  { label: "₹7500+", min: 7500, max: 100000 },
];

function HotelPageContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.searchQuery || "";
      }
    }
    return searchParams.get("search") || "";
  });

  const [checkIn, setCheckIn] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.checkIn || "";
      }
    }
    return searchParams.get("checkIn") || "";
  });

  const [checkOut, setCheckOut] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.checkOut || "";
      }
    }
    return searchParams.get("checkOut") || "";
  });

  const [rooms, setRooms] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.rooms || 1;
      }
    }
    return Number(searchParams.get("rooms")) || 1;
  });

  const [adults, setAdults] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.adults || 2;
      }
    }
    return Number(searchParams.get("adults")) || 2;
  });

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRangeIdx, setSelectedRangeIdx] = useState<number | null>(null);
  const [minBudget, setMinBudget] = useState<string>("");
  const [maxBudget, setMaxBudget] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("/api/hotels");
        if (!response.ok) console.log(`API error: ${response.status}`);
        const data = await response.json();
        const formattedTours: Tour[] = data.map((hotel: any) => ({
          id: hotel.id,
          title: hotel.name,
          location: hotel.location,
          image:
            hotel.images?.[0] ||
            hotel.image ||
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
          price: `${Math.round(hotel.pricePerNight)}`,
          oldPrice: `${Math.round(hotel.pricePerNight * 1.2)}`,
          rating: hotel.rating || (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
          reviews: hotel.reviews || Math.floor(Math.random() * 500) + 10,
          days: hotel.days || 4,
          isOnSale: hotel.isOnSale || true,
        }));
        setTours(formattedTours);
      } catch (e) {
        console.error("Error fetching hotels:", e);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleSearch = (params: {
    searchQuery: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
  }) => {
    setSearchQuery(params.searchQuery);
    setCheckIn(params.checkIn);
    setCheckOut(params.checkOut);
    setRooms(params.rooms);
    setAdults(params.adults);
  };

  const filteredTours = useMemo(() => {
    return tours
      .filter((tour) => {
        const price = parseFloat(tour.price.replace("₹", ""));
        const matchesSearch =
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchQuery.toLowerCase());

        const range =
          selectedRangeIdx !== null ? PRICE_RANGES[selectedRangeIdx] : null;
        const matchesRange =
          !range || (price >= range.min && price <= range.max);
        const matchesMin = minBudget === "" || price >= parseFloat(minBudget);
        const matchesMax = maxBudget === "" || price <= parseFloat(maxBudget);

        return matchesSearch && matchesRange && matchesMin && matchesMax;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.price.replace("₹", ""));
        const priceB = parseFloat(b.price.replace("₹", ""));
        if (sortBy === "low-to-high") return priceA - priceB;
        if (sortBy === "high-to-low") return priceB - priceA;
        if (sortBy === "top-rated") return b.rating - a.rating;
        return 0;
      });
  }, [tours, searchQuery, selectedRangeIdx, minBudget, maxBudget, sortBy]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 pb-20">
      <header className="lg:hidden bg-white px-4 py-3 flex items-center gap-4 sticky top-0 z-40 shadow-sm border-b border-slate-200">
        <ArrowLeft className="text-slate-700 cursor-pointer" size={24} />
        <div>
          <h1 className="font-bold text-base">Hotels</h1>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">
            India
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 lg:pt-8">
        <SearchBar
          onSearch={handleSearch}
          defaultSearchQuery={searchQuery}
          defaultCheckIn={checkIn}
          defaultCheckOut={checkOut}
          defaultRooms={rooms}
          defaultAdults={adults}
          instantSearch={true}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-32">
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <ArrowUpDown size={18} className="text-blue-600" /> Filters &
                Sort
              </h3>
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Sort By
                </p>
                <div className="space-y-2">
                  {["default", "low-to-high", "high-to-low", "top-rated"].map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => setSortBy(opt as any)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${sortBy === opt ? "bg-blue-100 text-blue-700 border border-blue-300" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {opt
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Budget Range
                </p>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min (₹)"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max (₹)"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg lg:text-xl text-slate-900">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    <span className="text-blue-600">
                      {filteredTours.length}
                    </span>{" "}
                    Hotels Found
                  </>
                )}
              </h2>
              <button
                onClick={() => setShowFiltersModal(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg"
              >
                <ArrowUpDown size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-white border border-slate-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))
                ) : (
                  <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed text-center">
                    <Search className="mx-auto text-slate-300 mb-4" size={56} />
                    <p className="text-slate-600 font-medium">
                      No hotels found matching your criteria
                    </p>
                    <p className="text-slate-400 text-sm mt-2">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {showFiltersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl lg:rounded-2xl w-full lg:w-96 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-3xl">
              <h3 className="font-bold text-lg">Filters & Sort</h3>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Sort By
                </p>
                <div className="space-y-2">
                  {["default", "low-to-high", "high-to-low", "top-rated"].map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt as any);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${sortBy === opt ? "bg-blue-100 text-blue-700 border border-blue-300" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {opt
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Budget Range
                </p>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min (₹)"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max (₹)"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HotelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading Hotels...
        </div>
      }
    >
      <HotelPageContent />
    </Suspense>
  );
}
