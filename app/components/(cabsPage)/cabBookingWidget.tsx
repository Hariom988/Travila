"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeftRight,
  Calendar as CalIcon,
  Clock,
  ChevronDown,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TripType = "one-way" | "airport" | "hourly";

const CITIES = [
  { name: "Mumbai", sub: "MH" },
  { name: "Delhi", sub: "DL" },
  { name: "Bangalore", sub: "KA" },
  { name: "Pune", sub: "MH" },
  { name: "Hyderabad", sub: "TS" },
];

const TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];
const PACKAGES = ["1 hr 10 km", "2 hr 20 km", "4 hr 40 km", "8 hr 80 km"];

export default function CompactCabBooking() {
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [fromCity, setFromCity] = useState(CITIES[0]);
  const [toCity, setToCity] = useState(CITIES[3]);
  const [departureDate, setDepartureDate] = useState(new Date(2026, 1, 6));
  const [pickupTime, setPickupTime] = useState("10:00 AM");
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const swapCities = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto p-3 sm:p-4 font-sans select-none"
      ref={dropdownRef}
    >
      <div className="bg-white rounded-2xl shadow-xl relative border border-gray-100 overflow-visible">
        <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 px-4 sm:px-6 py-3 border-b border-gray-100 items-center bg-gray-50/50 rounded-t-2xl whitespace-nowrap">
          {[
            { id: "one-way", label: "One-Way" },
            { id: "airport", label: "Airport" },
            { id: "hourly", label: "Hourly", badge: "new" },
          ].map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              <input
                type="radio"
                name="tripType"
                className="w-4 h-4 accent-blue-600 cursor-pointer"
                checked={tripType === type.id}
                onChange={() => {
                  setTripType(type.id as TripType);
                  setActiveDropdown(null);
                }}
              />
              <span
                className={`text-xs sm:text-sm font-bold ${tripType === type.id ? "text-gray-900" : "text-gray-500"}`}
              >
                {type.label}
              </span>
              {type.badge && (
                <span className="bg-purple-100 text-purple-600 text-[9px] font-black px-1 rounded uppercase">
                  {type.badge}
                </span>
              )}
            </label>
          ))}
          <div className="ml-auto hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Online Booking
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col sm:flex-row flex-2 border-b md:border-b-0 md:border-r border-gray-100 relative">
            <div
              className="flex-1 p-3 sm:p-4 cursor-pointer hover:bg-blue-50 relative border-b sm:border-b-0 sm:border-r border-gray-50"
              onClick={() => setActiveDropdown("from")}
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                {tripType === "hourly" ? "Pickup" : "From"}
              </p>
              <h3 className="text-lg sm:text-xl font-black text-gray-800 leading-tight">
                {fromCity.name}
              </h3>
              <p className="text-[10px] text-gray-400 truncate">
                {fromCity.sub}
              </p>
              {activeDropdown === "from" && (
                <CityDropdown
                  onSelect={(c) => {
                    setFromCity(c);
                    setActiveDropdown(null);
                  }}
                />
              )}
            </div>

            {tripType !== "hourly" && (
              <button
                onClick={swapCities}
                className="absolute cursor-pointer w-8 h-8 right-4 top-[50%] -translate-y-[50%] sm:left-[50%] sm:-translate-x-[50%] z-20 bg-white border border-gray-200 shadow-md p-1.5 rounded-full text-blue-500 hover:scale-110 active:rotate-180 transition-all"
              >
                <ArrowLeftRight size={15} className="sm:w-4 sm:h-4" />
              </button>
            )}

            <div
              className="flex-1 p-3 sm:p-4 cursor-pointer hover:bg-blue-50"
              onClick={() => tripType !== "hourly" && setActiveDropdown("to")}
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                {tripType === "airport" ? "Drop" : "To"}
              </p>
              <h3 className="text-lg sm:text-xl font-black text-gray-800 leading-tight">
                {tripType === "hourly" ? "Local Rental" : toCity.name}
              </h3>
              <p className="text-[10px] text-gray-400">
                {tripType === "hourly" ? "Flexible" : toCity.sub}
              </p>
              {activeDropdown === "to" && (
                <CityDropdown
                  onSelect={(c) => {
                    setToCity(c);
                    setActiveDropdown(null);
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-row flex-[1.5]">
            {/* DATE */}
            <div
              className="flex-1 p-3 sm:p-4 cursor-pointer hover:bg-blue-50 border-r border-gray-100 relative"
              onClick={() => setActiveDropdown("calendar")}
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                Departure
              </p>
              <h3 className="text-lg sm:text-xl font-black text-gray-800 leading-tight">
                {departureDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </h3>
              <p className="text-[10px] text-gray-400">
                {departureDate.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              {activeDropdown === "calendar" && (
                <PremiumCalendar
                  selectedDate={departureDate}
                  onSelect={(d) => {
                    setDepartureDate(d);
                    setActiveDropdown("time");
                  }}
                />
              )}
            </div>

            <div
              className="flex-1 p-3 sm:p-4 cursor-pointer hover:bg-blue-50 relative"
              onClick={() =>
                setActiveDropdown(tripType === "hourly" ? "package" : "time")
              }
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                {tripType === "hourly" ? "Pkg" : "Time"}
              </p>
              <h3 className="text-lg sm:text-xl font-black text-gray-800 leading-tight">
                {tripType === "hourly" ? selectedPackage : pickupTime}
              </h3>
              <p className="text-[10px] text-gray-400 truncate">Approximate</p>

              {activeDropdown === "time" && (
                <TimeGrid
                  selected={pickupTime}
                  onSelect={(t) => {
                    setPickupTime(t);
                    setActiveDropdown(null);
                  }}
                />
              )}
              {activeDropdown === "package" && (
                <div className="absolute top-full right-0 mt-2 w-48 sm:w-64 bg-white shadow-2xl rounded-xl z-50 p-2 border border-gray-100">
                  {PACKAGES.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setSelectedPackage(p);
                        setActiveDropdown(null);
                      }}
                      className="w-full cursor-pointer p-2.5 text-left hover:bg-blue-50 font-bold text-xs rounded-lg transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-full flex justify-center px-6">
          <button className="bg-linear-to-r from-blue-500 to-blue-700  text-white font-black text-xl sm:text-2xl px-10 sm:px-16 py-3 rounded-full shadow-lg cursor-pointer transition-all uppercase tracking-tighter w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function CityDropdown({
  onSelect,
}: {
  onSelect: (c: (typeof CITIES)[0]) => void;
}) {
  return (
    <div
      className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-white shadow-2xl rounded-xl z-60 p-3 border border-gray-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2 border rounded-lg px-2 py-1.5 mb-3 bg-gray-50">
        <Search size={14} className="text-gray-400" />
        <input
          autoFocus
          placeholder="Search city"
          className="bg-transparent outline-none w-full text-xs font-bold"
        />
      </div>
      <div className="max-h-48 overflow-y-auto">
        {CITIES.map((city) => (
          <div
            key={city.name}
            onClick={() => onSelect(city)}
            className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded-lg"
          >
            <MapPin size={14} className="text-gray-300" />
            <div className="leading-tight">
              <p className="font-bold text-gray-800 text-sm">{city.name}</p>
              <p className="text-[10px] text-gray-400">{city.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PremiumCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date;
  onSelect: (d: Date) => void;
}) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  return (
    <div
      className="absolute top-full left-[-50%] sm:left-0 mt-2 w-70 sm:w-80 bg-white shadow-2xl rounded-xl z-60 p-4 border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-black text-gray-900 text-sm sm:text-base">
          Feb 2026
        </h4>
        <div className="flex gap-1">
          <button className="p-1 cursor-pointer hover:bg-gray-100 rounded-full">
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 cursor-pointer hover:bg-gray-100 rounded-full">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-300 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onSelect(new Date(2026, 1, day))}
            className={`h-7 w-7 cursor-pointer sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${day === selectedDate.getDate() ? "bg-blue-600 text-white shadow-md" : "hover:bg-blue-50 text-gray-700"}`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function TimeGrid({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div
      className="absolute top-full right-0 mt-2 w-48 sm:w-64 bg-white shadow-2xl rounded-xl z-60 p-3 border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-[9px] font-black text-gray-400 uppercase mb-3">
        Select Slot
      </p>
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
        {TIMES.map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`py-2 cursor-pointer rounded-lg text-[10px] sm:text-xs font-black border transition-all
              ${selected === time ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-600 border-transparent hover:border-blue-200"}`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
