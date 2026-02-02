// SearchBar.tsx
"use client";
import { useState, useEffect } from "react";
import { Search, Calendar, Users, MapPin, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DatePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

interface SearchBarProps {
  onSearch?: (searchParams: SearchParams) => void;
  defaultSearchQuery?: string;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultRooms?: number;
  defaultAdults?: number;
  instantSearch?: boolean; // New prop for instant search on hotel page
}

export interface SearchParams {
  searchQuery: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
}

// Helper function to format date to YYYY-MM-DD in local timezone
const formatDateToLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to get today's date in local timezone
const getTodayDate = (): string => {
  return formatDateToLocal(new Date());
};

// Helper function to get tomorrow's date in local timezone
const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  return formatDateToLocal(tomorrow);
};

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
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return formatDateToLocal(date) === selectedDate;
  };

  const monthYear = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#1D2939] rounded-xl shadow-2xl p-4 border border-[#344054]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white">{monthYear}</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-[#344054] rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Previous month"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-[#344054] rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Next month"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold text-gray-500 py-2"
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
            onClick={() => day && onSelectDate(formatDateToLocal(day))}
            className={`aspect-square text-xs font-medium rounded-lg transition-all ${
              !day
                ? "opacity-0"
                : isDateSelected(day as Date)
                  ? "bg-blue-600 text-white font-bold shadow-md"
                  : isDateDisabled(day as Date)
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-300 hover:bg-[#344054] hover:text-white"
            }`}
          >
            {day?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function SearchBar({
  onSearch,
  defaultSearchQuery = "",
  defaultCheckIn = getTodayDate(),
  defaultCheckOut = getTomorrowDate(),
  defaultRooms = 1,
  defaultAdults = 2,
  instantSearch = false,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from localStorage or defaults
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.searchQuery || defaultSearchQuery;
      }
    }
    return searchParams.get("search") || defaultSearchQuery;
  });

  const [checkIn, setCheckIn] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.checkIn || defaultCheckIn;
      }
    }
    return searchParams.get("checkIn") || defaultCheckIn;
  });

  const [checkOut, setCheckOut] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.checkOut || defaultCheckOut;
      }
    }
    return searchParams.get("checkOut") || defaultCheckOut;
  });

  const [rooms, setRooms] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.rooms || defaultRooms;
      }
    }
    return Number(searchParams.get("rooms")) || defaultRooms;
  });

  const [adults, setAdults] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.adults || defaultAdults;
      }
    }
    return Number(searchParams.get("adults")) || defaultAdults;
  });

  const [showCalendarModal, setShowCalendarModal] = useState<
    "in" | "out" | null
  >(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  // Save to localStorage whenever search params change
  useEffect(() => {
    const searchData = {
      searchQuery,
      checkIn,
      checkOut,
      rooms,
      adults,
    };
    localStorage.setItem("hotelSearch", JSON.stringify(searchData));
    // Dispatch event to notify other components (like BookingCard)
    window.dispatchEvent(new Event("hotelSearchUpdate"));
  }, [searchQuery, checkIn, checkOut, rooms, adults]);

  // Listen for changes from BookingCard
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCheckIn(parsed.checkIn || defaultCheckIn);
        setCheckOut(parsed.checkOut || defaultCheckOut);
        setRooms(parsed.rooms || defaultRooms);
        setAdults(parsed.adults || defaultAdults);
        // Don't update searchQuery from storage to avoid clearing user's typing
      }
    };

    window.addEventListener("hotelSearchUpdate", handleStorageChange);
    return () =>
      window.removeEventListener("hotelSearchUpdate", handleStorageChange);
  }, [defaultCheckIn, defaultCheckOut, defaultRooms, defaultAdults]);

  // Instant search effect (only on hotel page)
  useEffect(() => {
    if (instantSearch && onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch({
          searchQuery,
          checkIn,
          checkOut,
          rooms,
          adults,
        });
      }, 300); // Debounce for 300ms

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, checkIn, checkOut, rooms, adults, instantSearch, onSearch]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        searchQuery,
        checkIn,
        checkOut,
        rooms,
        adults,
      });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (instantSearch && onSearch) {
      onSearch({
        searchQuery: "",
        checkIn,
        checkOut,
        rooms,
        adults,
      });
    }
  };

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <>
      {/* Enhanced Search Form - Dark Theme */}
      <div className="bg-[#101828] rounded-2xl shadow-2xl border border-[#1F2937] p-3 lg:p-2 mb-8 md:sticky top-20 lg:top-0 md:z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          {/* Destination */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 p-3 lg:px-5 bg-[#1D2939] lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-[#344054]">
              <MapPin size={20} className="text-blue-500 shrink-0" />
              <div className="flex-1 relative">
                <p className="text-[9px] uppercase font-bold text-blue-400 hidden lg:block">
                  Destination
                </p>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm lg:text-base outline-none text-white placeholder:text-gray-500"
                  placeholder="Where to?"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-[#344054] rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-2">
            {/* Check In */}
            <button
              onClick={() => setShowCalendarModal("in")}
              className="flex items-center gap-2 p-3 lg:px-5 bg-[#1D2939] lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-[#344054] hover:border-green-500 transition-colors"
            >
              <Calendar size={18} className="text-green-500 shrink-0" />
              <div className="flex-1 text-left hidden lg:block">
                <p className="text-[9px] uppercase font-bold text-green-400">
                  Check-In
                </p>
                <p className="text-sm font-bold text-white">
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="lg:hidden">
                <p className="text-xs font-bold text-white">
                  {new Date(checkIn).getDate()}
                </p>
                <p className="text-[8px] text-gray-400">
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </p>
              </div>
            </button>

            {/* Check Out */}
            <button
              onClick={() => setShowCalendarModal("out")}
              className="flex items-center gap-2 p-3 lg:px-5 bg-[#1D2939] lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-[#344054] hover:border-orange-500 transition-colors"
            >
              <Calendar size={18} className="text-orange-500 shrink-0" />
              <div className="flex-1 text-left hidden lg:block">
                <p className="text-[9px] uppercase font-bold text-orange-400">
                  Check-Out
                </p>
                <p className="text-sm font-bold text-white">
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="lg:hidden">
                <p className="text-xs font-bold text-white">
                  {new Date(checkOut).getDate()}
                </p>
                <p className="text-[8px] text-gray-400">
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </p>
              </div>
            </button>

            {/* Guests */}
            <button
              onClick={() => setShowGuestsModal(true)}
              className="flex items-center gap-2 p-3 lg:px-5 bg-[#1D2939] lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-[#344054] hover:border-purple-500 transition-colors"
            >
              <Users size={18} className="text-purple-500 shrink-0" />
              <div className="flex-1 text-left hidden lg:block">
                <p className="text-[9px] uppercase font-bold text-purple-400">
                  Guests
                </p>
                <p className="text-sm font-bold text-white">
                  {rooms} Room, {adults} Adult
                </p>
              </div>
              <div className="lg:hidden text-left">
                <p className="text-xs font-bold text-white">
                  {rooms}R {adults}A
                </p>
                <p className="text-[8px] text-gray-400">{nights}N</p>
              </div>
            </button>
          </div>

          {/* Search Button */}
          {!instantSearch && (
            <div className="lg:col-span-2">
              <button
                onClick={handleSearch}
                className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 lg:py-0 rounded-xl lg:rounded-none shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm lg:text-base"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Modal - Check In */}
      {showCalendarModal === "in" && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-[#101828] rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#1F2937]">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-In Date</h2>
              <button
                onClick={() => setShowCalendarModal(null)}
                className="hover:bg-green-500 p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <DatePicker
                selectedDate={checkIn}
                onSelectDate={(date) => {
                  setCheckIn(date);
                  setShowCalendarModal(null);
                  // Auto-adjust checkout if it's before new checkin
                  if (new Date(date) >= new Date(checkOut)) {
                    const newCheckout = new Date(date);
                    newCheckout.setDate(newCheckout.getDate() + 2);
                    setCheckOut(formatDateToLocal(newCheckout));
                  }
                }}
                minDate={getTodayDate()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal - Check Out */}
      {showCalendarModal === "out" && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-[#101828] rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#1F2937]">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-Out Date</h2>
              <button
                onClick={() => setShowCalendarModal(null)}
                className="hover:bg-orange-500 p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <DatePicker
                selectedDate={checkOut}
                onSelectDate={(date) => {
                  setCheckOut(date);
                  setShowCalendarModal(null);
                }}
                minDate={checkIn}
              />
            </div>
          </div>
        </div>
      )}

      {/* Guests Modal */}
      {showGuestsModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-[#101828] rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl border border-[#1F2937]">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Guests</h2>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="hover:bg-purple-500 p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-bold text-gray-400 mb-4">Rooms</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-white flex-1 text-center">
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 mb-4">Adults</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-white flex-1 text-center">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
