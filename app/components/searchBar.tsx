// SearchBar.tsx
"use client";
import { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface DatePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}
interface SearchBarProps {
  onSearch?: (searchParams: {
    searchQuery: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
  }) => void;
  defaultSearchQuery?: string;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultRooms?: number;
  defaultAdults?: number;
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
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
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
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
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
            className={`aspect-square text-xs font-medium rounded-lg transition-all ${
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
export default function SearchBar({
  onSearch,
  defaultSearchQuery = "",
  defaultCheckIn = "2026-01-30",
  defaultCheckOut = "2026-02-01",
  defaultRooms = 1,
  defaultAdults = 2,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [rooms, setRooms] = useState(defaultRooms);
  const [adults, setAdults] = useState(defaultAdults);

  const [showCalendarModal, setShowCalendarModal] = useState<
    "in" | "out" | null
  >(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);

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

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <>
      {/* Enhanced Search Form */}
      <div className="bg-white rounded-2xl shadow-lg lg:shadow-xl border border-slate-100 p-3 lg:p-2 mb-8 md:sticky top-20 lg:top-0 md:z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          {/* Destination */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 p-3 lg:px-5 bg-linear-to-r from-blue-50 to-blue-50 lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-blue-200">
              <MapPin size={20} className="text-blue-600 shrink-0" />
              <div className="flex-1">
                <p className="text-[9px] uppercase font-bold text-blue-600 hidden lg:block">
                  Destination
                </p>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm lg:text-base outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="Where to?"
                />
              </div>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-2">
            {/* Check In */}
            <button
              onClick={() => setShowCalendarModal("in")}
              className="flex items-center gap-2 p-3 lg:px-5 bg-linear-to-r from-green-50 to-green-50 lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-green-200 hover:border-green-300 transition-colors"
            >
              <Calendar size={18} className="text-green-600 shrink-0" />
              <div className="flex-1 text-left hidden lg:block">
                <p className="text-[9px] uppercase font-bold text-green-600">
                  Check-In
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="lg:hidden">
                <p className="text-xs font-bold text-slate-900">
                  {new Date(checkIn).getDate()}
                </p>
                <p className="text-[8px] text-slate-500">
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </p>
              </div>
            </button>

            {/* Check Out */}
            <button
              onClick={() => setShowCalendarModal("out")}
              className="flex items-center gap-2 p-3 lg:px-5 bg-linear-to-r from-orange-50 to-orange-50 lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-orange-200 hover:border-orange-300 transition-colors"
            >
              <Calendar size={18} className="text-orange-600 shrink-0" />
              <div className="flex-1 text-left hidden lg:block">
                <p className="text-[9px] uppercase font-bold text-orange-600">
                  Check-Out
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="lg:hidden">
                <p className="text-xs font-bold text-slate-900">
                  {new Date(checkOut).getDate()}
                </p>
                <p className="text-[8px] text-slate-500">
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </p>
              </div>
            </button>

            {/* Guests */}
            <button
              onClick={() => setShowGuestsModal(true)}
              className="flex items-center gap-2 p-3 lg:px-5 bg-linear-to-r from-purple-50 to-purple-50 lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-purple-200 hover:border-purple-300 transition-colors"
            >
              <Users size={18} className="text-purple-600 shrink-0" />
              <div className="flex-1 text-left hidden lg:block">
                <p className="text-[9px] uppercase font-bold text-purple-600">
                  Guests
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {rooms} Room, {adults} Adult
                </p>
              </div>
              <div className="lg:hidden text-left">
                <p className="text-xs font-bold text-slate-900">
                  {rooms}R {adults}A
                </p>
                <p className="text-[8px] text-slate-500">{nights}N</p>
              </div>
            </button>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full h-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 lg:py-0 rounded-xl lg:rounded-none shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm lg:text-base"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Modal - Check In */}
      {showCalendarModal === "in" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-In Date</h2>
              <button
                onClick={() => setShowCalendarModal(null)}
                className="hover:bg-blue-500 p-2 rounded-lg transition-colors"
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
                }}
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl">
            <div className="bg-linear-to-r from-purple-600 to-purple-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
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
                <p className="text-sm font-bold text-slate-600 mb-4">Rooms</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-slate-900 flex-1 text-center">
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
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
                    className="w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-slate-900 flex-1 text-center">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold"
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
