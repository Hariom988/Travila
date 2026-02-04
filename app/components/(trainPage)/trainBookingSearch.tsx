"use client";

import React, { useState, useRef } from "react";
import {
  ChevronDownIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import {
  PaperAirplaneIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  SunIcon,
  TruckIcon,
  TicketIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

// --- MOCK DATA ---
const CITIES = [
  { code: "NDLS", name: "New Delhi", station: "New Delhi Railway Station" },
  { code: "CNB", name: "Kanpur", station: "Kanpur Central" },
  { code: "BCT", name: "Mumbai", station: "Mumbai Central" },
  { code: "HWH", name: "Kolkata", station: "Howrah Junction" },
  { code: "MAS", name: "Chennai", station: "Chennai Central" },
  { code: "SBC", name: "Bangalore", station: "KSR Bengaluru" },
];

const CLASSES = ["ALL", "1A", "2A", "3A", "SL", "2S"];

type TabType = "book" | "pnr" | "live";

// --- HELPERS ---
const formatDateDisplay = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const weekday = date.toLocaleString("default", { weekday: "short" }); // Short weekday for mobile
  return { day, month, year, weekday };
};

const formatDateForInput = (date: Date) => date.toISOString().split("T")[0];

const RadioTab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 mr-4 md:mr-6 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
      active ? "text-black" : "text-gray-500 hover:text-gray-700"
    }`}
  >
    <div
      className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center border ${
        active ? "border-blue-500 bg-white" : "border-gray-400"
      }`}
    >
      {active && (
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500" />
      )}
    </div>
    <span className={active ? "font-bold" : ""}>{label}</span>
  </button>
);

export default function TrainSearchWidget() {
  const [activeTab, setActiveTab] = useState<TabType>("book");
  const [fromCity, setFromCity] = useState(CITIES[0]);
  const [toCity, setToCity] = useState(CITIES[1]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [travelDate, setTravelDate] = useState<Date>(tomorrow);
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [pnr, setPnr] = useState("");
  const [trainNum, setTrainNum] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);
  const { day, month, year, weekday } = formatDateDisplay(travelDate);

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      if ("showPicker" in dateInputRef.current) {
        try {
          (dateInputRef.current as any).showPicker();
        } catch (e) {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current;
        dateInputRef.current;
      }
    }
  };

  return (
    // Changed: min-h removed, pb-reduced
    <div className="w-full bg-linear-to-b from-gray-900 to-gray-700 flex flex-col items-center pt-4 md:pt-8 pb-12 px-3 md:px-6 font-sans">
      {/* MAIN CARD */}
      <div className="bg-white w-full max-w-full rounded-xl shadow-2xl relative pb-8">
        {/* TABS (Scrollable on small screens) */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 overflow-x-auto">
          <div className="flex cursor-pointer gap-y-3 min-w-max">
            <RadioTab
              label="Book Train Tickets"
              active={activeTab === "book"}
              onClick={() => setActiveTab("book")}
            />
            <RadioTab
              label="Check PNR Status"
              active={activeTab === "pnr"}
              onClick={() => setActiveTab("pnr")}
            />
            <RadioTab
              label="Live Train Status"
              active={activeTab === "live"}
              onClick={() => setActiveTab("live")}
            />
          </div>
        </div>

        {/* INPUTS BODY */}
        <div className="p-0">
          {activeTab === "book" && (
            // Changed: grid-cols-2 for mobile to allow side-by-side date/class
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-gray-200">
              {/* FROM - Full Width on Mobile */}
              <div className="col-span-2 md:col-span-1 p-3 md:p-5 hover:bg-blue-50 relative border-b md:border-b-0 border-gray-200">
                <label
                  htmlFor="#select"
                  className="text-[10px] md:text-xs font-bold text-gray-500 uppercase"
                >
                  From
                  <div className="relative cursor-pointer">
                    <select
                      id="select"
                      value={fromCity.code}
                      onChange={(e) =>
                        setFromCity(
                          CITIES.find((c) => c.code === e.target.value) ||
                            CITIES[0],
                        )
                      }
                      className="w-full cursor-pointer text-xl md:text-3xl font-black text-black bg-transparent border-none p-0 focus:ring-0 appearance-none truncate pr-4"
                    >
                      {CITIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {fromCity.station}
                </p>

                {/* Swap Icon - Floating Right on Mobile */}
                <div
                  onClick={handleSwap}
                  className="absolute right-4 bottom-2 md:top-1/2 md:-translate-y-1/2 md:-right-3 z-30 w-8 h-8 md:w-7 md:h-7 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-blue-600"
                >
                  <ArrowsRightLeftIcon className="h-4 w-4 rotate-90 md:rotate-0" />
                </div>
              </div>

              {/* TO - Full Width on Mobile */}
              <div className="col-span-2 md:col-span-1 p-3 md:p-5 hover:bg-blue-50 border-b md:border-b-0 border-gray-200">
                <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">
                  To
                </label>
                <div className="relative">
                  <select
                    value={toCity.code}
                    onChange={(e) =>
                      setToCity(
                        CITIES.find((c) => c.code === e.target.value) ||
                          CITIES[1],
                      )
                    }
                    className="w-full cursor-pointer text-xl md:text-3xl font-black text-black bg-transparent border-none p-0 focus:ring-0 appearance-none truncate pr-4"
                  >
                    {CITIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {toCity.station}
                </p>
              </div>

              {/* DATE - Half Width on Mobile */}
              <div
                className="col-span-1 cursor-pointer p-3 md:p-5 hover:bg-blue-50 relative border-r border-gray-200 md:border-none"
                onClick={triggerDatePicker}
              >
                <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                  Date <ChevronDownIcon className="h-3 w-3 text-blue-500" />
                </label>
                <div className="flex  flex-col md:flex-row md:items-baseline">
                  <div className="flex items-baseline">
                    <span className="text-xl md:text-3xl font-black text-black mr-1">
                      {day}
                    </span>
                    <span className="text-sm md:text-xl font-medium text-black">
                      {month}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-sm text-gray-600 md:ml-1">
                    {weekday}
                  </span>
                </div>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={formatDateForInput(travelDate)}
                  min={formatDateForInput(new Date())}
                  onChange={(e) =>
                    e.target.value && setTravelDate(new Date(e.target.value))
                  }
                  className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-20"
                />
              </div>

              {/* CLASS - Half Width on Mobile */}
              <div className="col-span-1 p-3 md:p-5 hover:bg-blue-50 relative">
                <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                  Class <ChevronDownIcon className="h-3 w-3 text-blue-500" />
                </label>
                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full cursor-pointer text-xl md:text-3xl font-black text-black bg-transparent border-none p-0 focus:ring-0 appearance-none"
                  >
                    {CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] md:text-sm text-gray-600 mt-1">
                  All Class
                </p>
              </div>
            </div>
          )}

          {/* PNR & LIVE VIEWS - Compacted */}
          {activeTab !== "book" && (
            <div className="p-6  md:p-12">
              {activeTab === "pnr" ? (
                <>
                  <label className="block cursor-pointer text-sm font-medium text-gray-700 mb-2">
                    PNR Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 10 digit PNR"
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value)}
                    maxLength={10}
                    className="w-full cursor-pointer text-2xl md:text-4xl font-bold border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 bg-transparent"
                  />
                </>
              ) : (
                <div className="grid cursor-pointer grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs text-gray-500 block">
                      Train Number
                    </label>
                    <input
                      type="text"
                      placeholder="Train No."
                      value={trainNum}
                      onChange={(e) => setTrainNum(e.target.value)}
                      className="w-full text-xl font-bold bg-transparent border-b border-gray-200 py-1 focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">
                      Station
                    </label>
                    <p className="text-xl font-bold text-gray-300">Select</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">Date</label>
                    <p className="text-xl font-bold text-gray-300">Today</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FLOATING BUTTON */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 z-40 w-full flex justify-center">
          <button
            onClick={() =>
              alert("Call this 9343434443 number for quick help/ Quotation")
            }
            className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg md:text-xl py-3 px-10 md:px-16 rounded-full shadow-lg uppercase tracking-wide whitespace-nowrap"
          >
            {activeTab === "book" ? "Search" : "Check Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
