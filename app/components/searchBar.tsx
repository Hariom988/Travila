"use client";
import React, { useState } from "react";
import { Search, MapPin, Calendar, User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [location, setLocation] = useState("Select location");
  const [guests, setGuests] = useState(1);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearch = () => {
    // 1. Construct Query Params
    const params = new URLSearchParams({
      location: location === "Select location" ? "" : location,
      guests: guests.toString(),
    });

    // 2. Routing: Push to a search page (e.g., /search?location=Paris&guests=2)
    console.log("Searching for:", params.toString());
    router.push(`/search?${params.toString()}`);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="bg-white rounded-4xl  p-4 md:p-3 shadow-2xl w-full max-w-85 md:max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-0 relative z-30">
      {/* --- Location Input --- */}
      <div className="relative w-full lg:w-[28%] px-2 lg:px-6 lg:border-r border-gray-200">
        <label className="block text-gray-500 text-[10px] md:text-xs font-medium mb-1 uppercase tracking-wider">
          Location
        </label>
        <button
          onClick={() => toggleDropdown("location")}
          className="flex items-center gap-3 w-full text-left"
        >
          <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
          <div className="flex-1 truncate">
            <span
              className={`font-bold text-sm md:text-base ${
                location === "Select location"
                  ? "text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {location}
            </span>
          </div>
          <ChevronDown className="w-3 h-3 text-purple-600" />
        </button>

        {/* Simulated Dropdown */}
        {activeDropdown === "location" && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2">
            {["Delhi", "Mumbai", "Pune", "Goa"].map((loc) => (
              <div
                key={loc}
                onClick={() => {
                  setLocation(loc);
                  setActiveDropdown(null);
                }}
                className="p-2 hover:bg-purple-50 rounded cursor-pointer text-sm text-gray-700"
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Check In --- */}
      <div className="w-full lg:w-[20%] px-2 lg:px-6 lg:border-r border-gray-200">
        <label className="block text-gray-500 text-[10px] md:text-xs font-medium mb-1 uppercase tracking-wider">
          Check In
        </label>
        <div className="flex items-center gap-3 cursor-pointer group">
          <Calendar className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
          <span className="font-bold text-sm md:text-base text-gray-800">
            12 Oct
          </span>
          <ChevronDown className="w-3 h-3 ml-auto lg:ml-2 text-purple-600" />
        </div>
      </div>

      {/* --- Check Out --- */}
      <div className="w-full lg:w-[20%] px-2 lg:px-6 lg:border-r border-gray-200">
        <label className="block text-gray-500 text-[10px] md:text-xs font-medium mb-1 uppercase tracking-wider">
          Check Out
        </label>
        <div className="flex items-center gap-3 cursor-pointer group">
          <Calendar className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
          <span className="font-bold text-sm md:text-base text-gray-800">
            15 Oct
          </span>
          <ChevronDown className="w-3 h-3 ml-auto lg:ml-2 text-purple-600" />
        </div>
      </div>

      {/* --- Guest Input --- */}
      <div className="relative w-full lg:w-[22%] px-2 lg:px-6">
        <label className="block text-gray-500 text-[10px] md:text-xs font-medium mb-1 uppercase tracking-wider">
          Guest
        </label>
        <button
          onClick={() => toggleDropdown("guest")}
          className="flex hover:cursor-pointer items-center gap-3 w-full text-left"
        >
          <User className="w-5 h-5 text-gray-800 shrink-0" />
          <span className="font-bold text-sm md:text-base text-gray-800 flex-1">
            {guests} Guest{guests > 1 ? "s" : ""}
          </span>
          <ChevronDown className="w-3 h-3 text-purple-600" />
        </button>

        {/* Simulated Dropdown for Guests */}
        {activeDropdown === "guest" && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100">
            <div className="flex justify-between items-center p-2">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 hover:cursor-pointer h-8 rounded-full bg-gray-900 hover:bg-gray-950"
              >
                -
              </button>
              <span className="font-bold text-gray-900">{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="w-8 h-8 rounded-full bg-gray-900 hover:cursor-pointer hover:bg-gray-950"
              >
                +
              </button>
            </div>
            <div
              onClick={() => setActiveDropdown(null)}
              className="text-center text-xs text-purple-600 cursor-pointer mt-2 font-bold"
            >
              Done
            </div>
          </div>
        )}
      </div>

      {/* --- Search Button --- */}
      <div className="w-full lg:w-auto p-1">
        <button
          onClick={handleSearch}
          className="w-full hover:cursor-pointer lg:w-auto bg-[#632df1] hover:bg-[#5022c7] active:scale-95 transition-all duration-200 text-white rounded-xl lg:rounded-full px-8 py-3 md:py-4 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-purple-900/20"
        >
          Search
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
