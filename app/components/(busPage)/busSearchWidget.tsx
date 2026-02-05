"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

type City = {
  name: string;
  state: string;
};

const POPULAR_CITIES: City[] = [
  { name: "Delhi", state: "Delhi" },
  { name: "Kanpur", state: "Uttar Pradesh" },
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Bangalore", state: "Karnataka" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Lucknow", state: "Uttar Pradesh" },
];

const getDayName = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "long" });

const getMonthYear = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

const normalizeDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const CustomCalendar = ({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date;
  onSelect: (d: Date) => void;
}) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const today = normalizeDate(new Date());
  const selected = normalizeDate(selectedDate);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(year, month + 1, 1));
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1),
  );

  return (
    <div
      className="p-3 w-70 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-gray-800 text-sm sm:text-base">
          {viewDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={handlePrevMonth}
            disabled={
              viewDate < new Date(today.getFullYear(), today.getMonth(), 1)
            }
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-500 disabled:opacity-20"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-full text-blue-600"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold text-gray-400"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptySlots.map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}
        {days.map((date, idx) => {
          const normDate = normalizeDate(date);
          const isPast = normDate < today;
          const isSelected = normDate.getTime() === selected.getTime();

          return (
            <button
              key={idx}
              disabled={isPast}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(date);
              }}
              className={`
                h-7 w-7 sm:h-8 sm:w-8 flex cursor-pointer items-center justify-center text-xs sm:text-sm rounded-full transition-all mx-auto
                ${isPast ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
                ${isSelected ? "bg-blue-600 text-white font-bold shadow-md" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function BusSearchWidget() {
  const [fromCity, setFromCity] = useState<City>(POPULAR_CITIES[0]);
  const [toCity, setToCity] = useState<City>(POPULAR_CITIES[1]);
  const [travelDate, setTravelDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setActiveTab(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (city: City, type: "from" | "to") => {
    if (type === "from") setFromCity(city);
    else setToCity(city);
    setActiveTab(null);
    setSearchTerm("");
  };

  const swapCities = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const filteredCities = POPULAR_CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full flex flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-10 font-sans">
      <div
        ref={widgetRef}
        className="relative border-2 border-gray-200 w-full max-w-5xl bg-white rounded-2xl shadow-xl z-20"
      >
        <div className="absolute -top-3 left-4 sm:left-6 bg-blue-600 text-white px-3 py-0.5 rounded-full shadow-lg z-30">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
            Bus Ticket Booking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div
            className={`md:col-span-2 relative px-4 py-3 sm:px-6 sm:py-5 cursor-pointer transition-colors hover:bg-slate-50 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl ${activeTab === "from" ? "bg-blue-50/50" : ""}`}
            onClick={() => {
              setActiveTab("from");
              setSearchTerm("");
            }}
          >
            <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight">
              From
            </label>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate leading-tight mt-0.5 sm:mt-1">
              {fromCity.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {fromCity.state}
            </p>

            {activeTab === "from" && (
              <div className="absolute top-full left-0 w-full md:w-80 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  <input
                    autoFocus
                    placeholder="Enter source city"
                    className="w-full bg-transparent text-sm outline-none text-gray-700 font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredCities.map((city, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCitySelect(city, "from");
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer group"
                    >
                      <MapPinIcon className="h-4 w-4 text-gray-300 group-hover:text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {city.name}, {city.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={swapCities}
            className="absolute cursor-pointer left-1/2 md:left-[39.5%] top-18 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white p-1.5 sm:p-2 rounded-full border border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all group"
          >
            <ArrowsRightLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 group-active:rotate-180 transition-transform duration-300" />
          </button>

          <div
            className={`md:col-span-2 relative px-4 py-3 sm:px-6 sm:py-5 cursor-pointer transition-colors hover:bg-slate-50 ${activeTab === "to" ? "bg-blue-50/50" : ""}`}
            onClick={() => {
              setActiveTab("to");
              setSearchTerm("");
            }}
          >
            <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight">
              To
            </label>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate leading-tight mt-0.5 sm:mt-1">
              {toCity.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {toCity.state}
            </p>

            {activeTab === "to" && (
              <div className="absolute top-full left-0 w-full md:w-80 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  <input
                    autoFocus
                    placeholder="Enter destination city"
                    className="w-full bg-transparent text-sm outline-none text-gray-700 font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredCities.map((city, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCitySelect(city, "to");
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer group"
                    >
                      <MapPinIcon className="h-4 w-4 text-gray-300 group-hover:text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {city.name}, {city.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className={`md:col-span-1 relative px-4 py-3 sm:px-6 sm:py-5 cursor-pointer transition-colors hover:bg-slate-50 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl ${activeTab === "date" ? "bg-blue-50/50" : ""}`}
            onClick={() => setActiveTab(activeTab === "date" ? null : "date")}
          >
            <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
              Date <ChevronDownIcon className="h-3 w-3" />
            </label>
            <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
              <p className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {travelDate.getDate()}
              </p>
              <div className="flex flex-col">
                <p className="text-[10px] sm:text-xs font-bold text-gray-800 uppercase">
                  {getMonthYear(travelDate).split(" ")[0]}
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">
                  '{getMonthYear(travelDate).split(" ")[1].slice(-2)}
                </p>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-blue-600 mt-0.5 sm:mt-1">
              {getDayName(travelDate)}
            </p>

            {activeTab === "date" && (
              <div
                className="absolute top-full right-0 md:-right-4 mt-1 z-50 flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <CustomCalendar
                  selectedDate={travelDate}
                  onSelect={(d) => {
                    setTravelDate(d);
                    setActiveTab(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="absolute  left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto flex justify-center">
          <button
            onClick={() =>
              alert(`Searching buses from ${fromCity.name} to ${toCity.name}`)
            }
            className="w-full sm:w-auto bg-blue-700 cursor-pointer hover:bg-blue-800 text-white font-black text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-16 rounded-xl transition-all active:scale-95 uppercase tracking-tighter shadow-xl"
          >
            Search Buses
          </button>
        </div>
      </div>
    </div>
  );
}
