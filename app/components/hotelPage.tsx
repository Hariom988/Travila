"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysCount; i++)
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));

  const handlePrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  const handleNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  const isDateDisabled = (date: Date): boolean =>
    (minDate && date < new Date(minDate)) ||
    (maxDate && date > new Date(maxDate)) ||
    false;
  const isDateSelected = (date: Date): boolean =>
    date.toISOString().split("T")[0] === selectedDate;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:cursor-pointer hover:bg-slate-100 rounded-lg"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:cursor-pointer hover:bg-slate-100 rounded-lg"
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

function HotelPageContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") || "2026-01-25",
  );
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") || "2026-01-28",
  );
  const [rooms, setRooms] = useState(Number(searchParams.get("rooms")) || 1);
  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 2);

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRangeIdx, setSelectedRangeIdx] = useState<number | null>(null);
  const [minBudget, setMinBudget] = useState<string>("");
  const [maxBudget, setMaxBudget] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const [showCalendarModal, setShowCalendarModal] = useState<
    "in" | "out" | null
  >(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

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
        setTours([]);
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
                      No hotels found in this location
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {showCalendarModal === "in" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full lg:w-96 overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex justify-between">
              <h2 className="font-bold">Select Check-In</h2>
              <X
                className="cursor-pointer"
                onClick={() => setShowCalendarModal(null)}
              />
            </div>
            <div className="p-4">
              <DatePicker
                selectedDate={checkIn}
                onSelectDate={(d) => {
                  setCheckIn(d);
                  setShowCalendarModal(null);
                }}
              />
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
