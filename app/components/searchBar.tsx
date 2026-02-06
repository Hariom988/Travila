"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Users,
  MapPin,
  X,
  ChevronDownIcon,
} from "lucide-react";
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
  instantSearch?: boolean;
}

export interface SearchParams {
  searchQuery: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
}

const formatDateToLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayDate = (): string => {
  return formatDateToLocal(new Date());
};

const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  return formatDateToLocal(tomorrow);
};

const formatDateForDisplay = (
  dateString: string,
): { day: string; month: string } => {
  try {
    const date = new Date(dateString + "T00:00:00");
    if (isNaN(date.getTime())) {
      return { day: "00", month: "---" };
    }
    const day = String(date.getDate()).padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    return { day, month };
  } catch (error) {
    return { day: "00", month: "---" };
  }
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
    <div className="bg-white rounded-2xl p-4 select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base">
          {monthYear}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-500 disabled:opacity-20"
            aria-label="Previous month"
          >
            <svg
              width="20"
              height="20"
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
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-full text-blue-600"
            aria-label="Next month"
          >
            <svg
              width="20"
              height="20"
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

      <div className="grid grid-cols-7 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold text-gray-400"
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
            className={`h-8 w-8 cursor-pointer flex items-center justify-center text-xs sm:text-sm rounded-full transition-all mx-auto ${
              !day
                ? "opacity-0"
                : isDateSelected(day as Date)
                  ? "bg-blue-600 text-white font-bold shadow-md"
                  : isDateDisabled(day as Date)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [rooms, setRooms] = useState(defaultRooms);
  const [adults, setAdults] = useState(defaultAdults);

  const [showCalendarModal, setShowCalendarModal] = useState<
    "in" | "out" | null
  >(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("hotelSearch");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSearchQuery(parsed.searchQuery || defaultSearchQuery);
        setCheckIn(parsed.checkIn || defaultCheckIn);
        setCheckOut(parsed.checkOut || defaultCheckOut);
        setRooms(parsed.rooms || defaultRooms);
        setAdults(parsed.adults || defaultAdults);
      } catch (e) {
        console.error("Error parsing stored search:", e);
      }
    } else {
      const urlSearch = searchParams.get("search");
      const urlCheckIn = searchParams.get("checkIn");
      const urlCheckOut = searchParams.get("checkOut");
      const urlRooms = searchParams.get("rooms");
      const urlAdults = searchParams.get("adults");

      if (urlSearch) setSearchQuery(urlSearch);
      if (urlCheckIn) setCheckIn(urlCheckIn);
      if (urlCheckOut) setCheckOut(urlCheckOut);
      if (urlRooms) setRooms(Number(urlRooms));
      if (urlAdults) setAdults(Number(urlAdults));
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const searchData = { searchQuery, checkIn, checkOut, rooms, adults };
    localStorage.setItem("hotelSearch", JSON.stringify(searchData));
    window.dispatchEvent(new Event("hotelSearchUpdate"));
  }, [searchQuery, checkIn, checkOut, rooms, adults, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleStorageChange = () => {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCheckIn(parsed.checkIn || defaultCheckIn);
          setCheckOut(parsed.checkOut || defaultCheckOut);
          setRooms(parsed.rooms || defaultRooms);
          setAdults(parsed.adults || defaultAdults);
        } catch (e) {
          console.error("Error parsing storage update:", e);
        }
      }
    };
    window.addEventListener("hotelSearchUpdate", handleStorageChange);
    return () =>
      window.removeEventListener("hotelSearchUpdate", handleStorageChange);
  }, [defaultCheckIn, defaultCheckOut, defaultRooms, defaultAdults, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (instantSearch && onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch({ searchQuery, checkIn, checkOut, rooms, adults });
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [
    searchQuery,
    checkIn,
    checkOut,
    rooms,
    adults,
    instantSearch,
    onSearch,
    mounted,
  ]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ searchQuery, checkIn, checkOut, rooms, adults });
    }
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery("");
    if (instantSearch && onSearch) {
      onSearch({ searchQuery: "", checkIn, checkOut, rooms, adults });
    }
  };

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const checkInDisplay = formatDateForDisplay(checkIn);
  const checkOutDisplay = formatDateForDisplay(checkOut);

  return (
    <div className="w-full flex flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-5 font-sans">
      <div className="relative border-2 border-gray-200 w-full max-w-6xl bg-white rounded-2xl shadow-xl z-20 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          <div className="lg:col-span-4 relative px-4 py-3 sm:px-6 sm:py-5 cursor-pointer transition-colors hover:bg-slate-50 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-500 shrink-0" />
              <div className="flex-1 relative">
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                  Destination
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent font-bold text-lg sm:text-xl outline-none text-gray-900 placeholder:text-gray-300"
                    placeholder="Where to?"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="p-1 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-3 divide-x divide-gray-100">
            <button
              onClick={() => setShowCalendarModal("in")}
              className="px-4 cursor-pointer py-3 sm:px-6 sm:py-5 text-left transition-colors hover:bg-slate-50 flex flex-col justify-center"
            >
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
                Check-In <ChevronDownIcon className="h-3 w-3" />
              </label>
              <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                <p className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                  {checkInDisplay.day}
                </p>
                <div className="flex flex-col">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-800 uppercase">
                    {checkInDisplay.month}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">
                    '{checkIn.split("-")[0].slice(-2)}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setShowCalendarModal("out")}
              className="px-4 cursor-pointer py-3 sm:px-6 sm:py-5 text-left transition-colors hover:bg-slate-50 flex flex-col justify-center"
            >
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
                Check-Out <ChevronDownIcon className="h-3 w-3" />
              </label>
              <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                <p className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                  {checkOutDisplay.day}
                </p>
                <div className="flex flex-col">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-800 uppercase">
                    {checkOutDisplay.month}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">
                    '{checkOut.split("-")[0].slice(-2)}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setShowGuestsModal(true)}
              className="px-4 cursor-pointer py-3 sm:px-6 sm:py-5 text-left transition-colors hover:bg-slate-50 flex flex-col justify-center"
            >
              <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                Guests
              </label>
              <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                {rooms}R, {adults}A
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-blue-600 mt-0.5">
                {nights} Night{nights > 1 ? "s" : ""}
              </p>
            </button>
          </div>

          <div className="lg:col-span-2 p-2 sm:p-3 flex items-center justify-center">
            <button
              onClick={handleSearch}
              className="w-full h-full cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-black py-3 lg:py-0 rounded-xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 uppercase tracking-tighter text-sm sm:text-base"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-200 overflow-hidden">
            <div
              className={`p-4 text-white flex items-center justify-between ${showCalendarModal === "in" ? "bg-blue-600" : "bg-orange-600"}`}
            >
              <h2 className="font-bold">
                Select {showCalendarModal === "in" ? "Check-In" : "Check-Out"}{" "}
                Date
              </h2>
              <button
                onClick={() => setShowCalendarModal(null)}
                className="p-1 cursor-pointer hover:bg-white/20 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <DatePicker
                selectedDate={showCalendarModal === "in" ? checkIn : checkOut}
                minDate={showCalendarModal === "in" ? getTodayDate() : checkIn}
                onSelectDate={(date) => {
                  if (showCalendarModal === "in") {
                    setCheckIn(date);
                    if (new Date(date) >= new Date(checkOut)) {
                      const newCheckout = new Date(date);
                      newCheckout.setDate(newCheckout.getDate() + 2);
                      setCheckOut(formatDateToLocal(newCheckout));
                    }
                  } else {
                    setCheckOut(date);
                  }
                  setShowCalendarModal(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showGuestsModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
              <h2 className="font-bold">Select Guests</h2>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="p-1 cursor-pointer hover:bg-white/20 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {[
                { label: "Rooms", val: rooms, set: setRooms, min: 1 },
                { label: "Adults", val: adults, set: setAdults, min: 1 },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-3">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => item.set(Math.max(item.min, item.val - 1))}
                      className="w-10 h-10 cursor-pointer border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-2xl font-black text-gray-900 flex-1 text-center">
                      {item.val}
                    </span>
                    <button
                      onClick={() => item.set(item.val + 1)}
                      className="w-10 h-10 cursor-pointer border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowGuestsModal(false)}
                className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-black py-3 rounded-xl transition-all shadow-md"
              >
                APPLY GUESTS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
