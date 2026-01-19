"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Calendar,
  Users,
  ArrowLeft,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
} from "lucide-react";
import SearchBar from "./searchBar";

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

interface DatePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

const DatePicker = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days: (Date | null)[] = [];
  const startDay = firstDayOfMonth(currentMonth);
  const daysCount = daysInMonth(currentMonth);

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysCount; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return date.toISOString().split("T")[0] === selectedDate;
  };

  const monthYear = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800">{monthYear}</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:cursor-pointer hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:cursor-pointer hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold text-slate-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <button
            key={`day-${idx}`}
            disabled={!day || isDateDisabled(day as Date)}
            onClick={() => day && onSelectDate(day.toISOString().split("T")[0])}
            className={`aspect-square hover:cursor-pointer text-xs font-medium rounded-lg transition-all ${
              !day
                ? "opacity-0"
                : isDateSelected(day as Date)
                  ? "bg-blue-600 text-white font-bold shadow-md"
                  : isDateDisabled(day as Date)
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-700 hover:bg-blue-50"
            }`}
          >
            {day?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={
            tour.image ||
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
          }
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {tour.isOnSale && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Sale
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 mb-1 line-clamp-2">
          {tour.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <MapPin size={14} />
          {tour.location}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-bold text-slate-800">
              {tour.rating}
            </span>
            <span className="text-xs text-slate-500">({tour.reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900">{tour.price}</p>
            <p className="text-xs line-through text-slate-400">
              {tour.oldPrice}
            </p>
          </div>
          <button className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HotelPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("2026-01-25");
  const [checkOut, setCheckOut] = useState("2026-01-28");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);

  const [selectedRangeIdx, setSelectedRangeIdx] = useState<number | null>(null);
  const [minBudget, setMinBudget] = useState<string>("");
  const [maxBudget, setMaxBudget] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Modal states
  const [showCalendarModal, setShowCalendarModal] = useState<
    "in" | "out" | null
  >(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/hotels");

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Map your API response to Tour interface
        const formattedTours: Tour[] = data.map((hotel: any) => ({
          id: hotel.id,
          title: hotel.name,
          location: hotel.location,
          image:
            hotel.images?.[0] ||
            hotel.image ||
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
          price: `₹${Math.round(hotel.pricePerNight)}`,
          oldPrice: `₹${Math.round(hotel.pricePerNight * 1.2)}`,
          rating: hotel.rating || (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
          reviews: hotel.reviews || Math.floor(Math.random() * 500) + 10,
          days: hotel.days || 4,
          isOnSale: hotel.isOnSale || true,
        }));

        setTours(formattedTours);
      } catch (e) {
        console.error("Error fetching hotels:", e);
        setTours([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

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

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const handleCloseCalendarModal = () => {
    setShowCalendarModal(null);
  };

  const handleSelectCheckIn = (date: string) => {
    setCheckIn(date);
    setShowCalendarModal(null);
  };

  const handleSelectCheckOut = (date: string) => {
    setCheckOut(date);
    setShowCalendarModal(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 pb-20">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white px-4 py-3 flex items-center gap-4 sticky top-0 z-40 shadow-sm border-b border-slate-200">
        <ArrowLeft className="text-slate-700 cursor-pointer" size={24} />
        <div>
          <h1 className="font-bold text-base">Hotels</h1>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">
            India
          </p>
        </div>
      </header>

      <div className="max-w-350 mx-auto px-4 lg:px-6 pt-4 lg:pt-8">
        {/* Enhanced Search Form */}
        <SearchBar
          onSearch={(params) => {
            setSearchQuery(params.searchQuery);
            setCheckIn(params.checkIn);
            setCheckOut(params.checkOut);
            setRooms(params.rooms);
            setAdults(params.adults);
          }}
          defaultSearchQuery={searchQuery}
          defaultCheckIn={checkIn}
          defaultCheckOut={checkOut}
          defaultRooms={rooms}
          defaultAdults={adults}
        />

        {/* Price Filter Chips - Desktop */}
        <div className="hidden md:block mb-8 animate-in fade-in">
          <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Price Per Night
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={`price-${idx}`}
                onClick={() =>
                  setSelectedRangeIdx(selectedRangeIdx === idx ? null : idx)
                }
                className={`whitespace-nowrap hover:cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  selectedRangeIdx === idx
                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-32">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <ArrowUpDown size={18} className="text-blue-600" /> Filters &
                Sort
              </h3>

              {/* Sort */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Sort By
                </p>
                <div className="space-y-2">
                  {(
                    [
                      "default",
                      "low-to-high",
                      "high-to-low",
                      "top-rated",
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`w-full hover:cursor-pointer text-left px-4 py-2.5 rounded-lg text-sm transition-all font-medium ${
                        sortBy === opt
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {opt
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </button>
                  ))}
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
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max (₹)"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
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
                className="lg:hidden hover:cursor-pointer flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <ArrowUpDown size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="h-80 bg-white border border-slate-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))
                ) : (
                  <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                    <Search className="mx-auto text-slate-300 mb-4" size={56} />
                    <p className="text-slate-600 font-medium text-lg">
                      No hotels found
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                      Try adjusting your filters or search term
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Calendar Modal - Check In */}
      {showCalendarModal === "in" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-In Date</h2>
              <button
                onClick={handleCloseCalendarModal}
                className="hover:bg-blue-500 p-2 hover:cursor-pointer rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <DatePicker
                selectedDate={checkIn}
                onSelectDate={handleSelectCheckIn}
              />
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal - Check Out */}
      {showCalendarModal === "out" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-orange-600 to-orange-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-Out Date</h2>
              <button
                onClick={handleCloseCalendarModal}
                className="hover:bg-orange-500 hover:cursor-pointer p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <DatePicker
                selectedDate={checkOut}
                onSelectDate={handleSelectCheckOut}
                minDate={checkIn}
              />
            </div>
          </div>
        </div>
      )}

      {/* Guests Modal */}
      {showGuestsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl">
            <div className="bg-linear-to-r from-purple-600 to-purple-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Guests</h2>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="hover:bg-purple-500 hover:cursor-pointer p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-600 mb-4">Rooms</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 border hover:cursor-pointer border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-slate-900 flex-1 text-center">
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="w-10 h-10 border hover:cursor-pointer border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600 mb-4">Adults</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-10 h-10 border hover:cursor-pointer border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-slate-900 flex-1 text-center">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-10 h-10 border hover:cursor-pointer border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="w-full hover:cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Modal - Mobile */}
      {showFiltersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="font-bold text-lg">Filters & Sort</h2>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="hover:bg-blue-500 hover:cursor-pointer p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Sort */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Sort By
                </p>
                <div className="space-y-2">
                  {(
                    [
                      "default",
                      "low-to-high",
                      "high-to-low",
                      "top-rated",
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                      }}
                      className={`w-full hover:cursor-pointer text-left px-4 py-2.5 rounded-lg text-sm transition-all font-medium ${
                        sortBy === opt
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {opt
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Budget Range (₹)
                </p>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                  />
                </div>
              </div>

              {/* Price Chips */}
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Quick Filters
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range, idx) => (
                    <button
                      key={`mobile-price-${idx}`}
                      onClick={() =>
                        setSelectedRangeIdx(
                          selectedRangeIdx === idx ? null : idx
                        )
                      }
                      className={`px-3 hover:cursor-pointer py-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedRangeIdx === idx
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
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
