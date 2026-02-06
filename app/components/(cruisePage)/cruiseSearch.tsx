"use client";
import React, { useState, useRef, useEffect } from "react";

interface SearchState {
  destination: string;
  travelMonth: string;
}

const destinations = [
  "Singapore",
  "Dubai",
  "Maldives",
  "Europe",
  "Caribbean",
  "India",
  "Bahamas",
];

const months = [
  "February 2024",
  "March 2024",
  "April 2024",
  "May 2024",
  "June 2024",
  "July 2024",
];

const CruiseSearch: React.FC = () => {
  const [search, setSearch] = useState<SearchState>({
    destination: "",
    travelMonth: "",
  });

  const [activeDropdown, setActiveDropdown] = useState<"dest" | "month" | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!search.destination) {
      alert("Please select a destination");
      return;
    }
    console.log("Searching for:", search);
    alert(
      `Searching for Cruises to ${search.destination} in ${search.travelMonth || "any month"}`,
    );
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 py-10 font-sans"
      ref={containerRef}
    >
      <div className="bg-white rounded-xl shadow-2xl relative pb-8">
        <div className="p-6">
          <h2 className="text-[#4a4a4a] text-lg md:text-xl font-medium">
            Book Domestic and International Cruises
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 mx-6 rounded-lg overflow-visible">
          <div
            className={`relative p-4 cursor-pointer hover:bg-blue-50 transition-colors border-b md:border-b-0 md:border-r border-gray-200 ${activeDropdown === "dest" ? "bg-blue-50" : ""}`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "dest" ? null : "dest")
            }
          >
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
              Cruising To <span className="text-red-500">*</span>
            </label>
            <div className="text-2xl font-black text-gray-700 truncate">
              {search.destination || "Select Destination"}
            </div>

            {activeDropdown === "dest" && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white shadow-xl rounded-md z-50 max-h-60 overflow-y-auto border border-gray-100">
                {destinations.map((dest) => (
                  <div
                    key={dest}
                    className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearch({ ...search, destination: dest });
                      setActiveDropdown(null);
                    }}
                  >
                    {dest}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`relative p-4 cursor-pointer hover:bg-blue-50 transition-colors ${activeDropdown === "month" ? "bg-blue-50" : ""}`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "month" ? null : "month")
            }
          >
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
              Travel Month{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="text-2xl font-black text-gray-700 truncate">
              {search.travelMonth || "Select Month"}
            </div>

            {activeDropdown === "month" && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white shadow-xl rounded-md z-50 max-h-60 overflow-y-auto border border-gray-100">
                {months.map((month) => (
                  <div
                    key={month}
                    className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearch({ ...search, travelMonth: month });
                      setActiveDropdown(null);
                    }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 w-full flex justify-center">
          <button
            onClick={handleSearch}
            className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 text-white text-2xl font-bold py-3 px-16 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all uppercase tracking-widest active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CruiseSearch;
