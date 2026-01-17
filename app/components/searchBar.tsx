"use client";
import React, { useState, forwardRef } from "react";
import { Search, MapPin, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
}

const CustomDateInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholder }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      type="button"
      className="w-full h-14 bg-[#f2f2f2] hover:bg-white transition-colors rounded-lg px-4 flex items-center justify-between cursor-pointer group text-left"
    >
      <span
        className={`text-base font-medium ${
          value ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {value || placeholder}
      </span>
      <Calendar className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
    </button>
  )
);

// --- MAIN COMPONENT ---
export default function SearchBar() {
  const router = useRouter();

  // --- State ---
  const [location, setLocation] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Date State
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  // --- Handlers ---
  const handleSearch = () => {
    // Helper to format date as YYYY-MM-DD
    const formatDate = (date: Date | null) => {
      if (!date) return "";
      const offset = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
      return adjustedDate.toISOString().split("T")[0];
    };

    const params = new URLSearchParams({
      location: location,
      checkIn: formatDate(checkInDate),
      checkOut: formatDate(checkOutDate),
      guests: guests.toString(),
    });

    console.log("Searching for:", params.toString());
    // Navigate to /search page
    router.push(`/search?${params.toString()}`);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 z-30 relative">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-end gap-4 shadow-xl">
        {/* --- 1. Destinations Input --- */}
        <div className="w-full lg:flex-2 relative">
          <label className="block text-white text-base font-medium mb-3 ml-1">
            Destinations:
          </label>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("location")}
              className="w-full h-14 bg-[#f2f2f2] hover:bg-white transition-colors rounded-lg px-4 flex items-center justify-between text-left group"
            >
              <span
                className={`text-base font-medium truncate ${
                  location ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {location || "Where are you going . . ."}
              </span>
              <MapPin className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>

            {activeDropdown === "location" && (
              <div className="absolute top-16 left-0 w-full bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                {["Paris", "Rome", "New York", "Tokyo", "London", "Bali"].map(
                  (loc) => (
                    <div
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setActiveDropdown(null);
                      }}
                      className="p-3 hover:bg-purple-50 rounded-md cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-purple-600" />
                      {loc}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- 2. Check In (Functional) --- */}
        <div className="w-full lg:flex-1 relative">
          <label className="block text-white text-base font-medium mb-3 ml-1">
            Check In:
          </label>
          <div className="w-full">
            <DatePicker
              selected={checkInDate}
              onChange={(date: React.SetStateAction<Date | null>) => {
                setCheckInDate(date);
                if (checkOutDate && date && date > checkOutDate) {
                  setCheckOutDate(null);
                }
              }}
              minDate={new Date()}
              customInput={<CustomDateInput placeholder="Add Date" />}
              dateFormat="dd/MM   "
              wrapperClassName="w-full"
            />
          </div>
        </div>

        {/* --- 3. Check Out (Functional) --- */}
        <div className="w-full lg:flex-1 relative">
          <label className="block text-white text-base font-medium mb-3 ml-1">
            Check Out:
          </label>
          <div className="w-full">
            <DatePicker
              selected={checkOutDate}
              onChange={(date: React.SetStateAction<Date | null>) =>
                setCheckOutDate(date)
              }
              minDate={checkInDate || new Date()}
              disabled={!checkInDate}
              customInput={<CustomDateInput placeholder="Add Date" />}
              dateFormat="dd/MM"
              wrapperClassName="w-full"
            />
          </div>
        </div>

        {/* --- 4. Guest Input --- */}
        <div className="w-full lg:flex-1 relative">
          <label className="block text-white text-base font-medium mb-3 ml-1">
            Guest:
          </label>
          <button
            onClick={() => toggleDropdown("guest")}
            className="w-full h-14 bg-[#f2f2f2] hover:bg-white transition-colors rounded-lg px-4 flex items-center justify-between text-left group"
          >
            <span
              className={`font-medium text-base truncate ${
                guests > 0 ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {guests > 0
                ? `${guests} Guest${guests > 1 ? "s" : ""}`
                : "+ Add Guests"}
            </span>
            <User className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          </button>

          {activeDropdown === "guest" && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-100 min-w-50 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-bold">Adults</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(0, guests - 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-gray-900 w-4 text-center">
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setActiveDropdown(null)}
                className="w-full py-2 bg-purple-600 text-white rounded-md text-sm font-bold hover:bg-purple-700"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* --- 5. Search Button --- */}
        <div className="w-full lg:w-auto mt-2 lg:mt-0">
          <button
            onClick={handleSearch}
            className="w-full h-14 bg-[#6200EA] hover:bg-[#5000ca] active:scale-95 transition-all duration-200 text-white rounded-lg px-8 flex items-center justify-center gap-2 font-bold text-base shadow-lg"
          >
            Search
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- DatePicker Global Styles --- */}
      <style jsx global>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker {
          font-family: inherit;
          border: none;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
        }
        .react-datepicker__header {
          background-color: white;
          border-bottom: 1px solid #f3f4f6;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #6200ea !important;
          color: white !important;
          border-radius: 50%;
        }
        .react-datepicker__day:hover {
          border-radius: 50%;
          background-color: #f3f4f6;
        }
        .react-datepicker__day--today {
          font-weight: bold;
          color: #6200ea;
        }
      `}</style>
    </div>
  );
}
