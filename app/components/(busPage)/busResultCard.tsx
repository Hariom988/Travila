"use client";

import React, { useState } from "react";
import {
  WifiIcon,
  TvIcon,
  Battery50Icon,
  ShieldCheckIcon,
  StarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const BUS_RESULTS = [
  {
    id: 1,
    operator: "Intercity SmartBus",
    type: "AC Sleeper (2+1)",
    rating: 4.8,
    reviews: 1240,
    departure: "21:30",
    arrival: "05:45",
    duration: "08h 15m",
    price: 1250,
    seatsAvailable: 12,
    amenities: ["wifi", "charging", "tv", "water"],
  },
  {
    id: 2,
    operator: "Zingbus Plus",
    type: "Premium AC Seater",
    rating: 4.5,
    reviews: 850,
    departure: "22:00",
    arrival: "07:15",
    duration: "09h 15m",
    price: 899,
    seatsAvailable: 4,
    amenities: ["charging", "water", "blanket"],
  },
];

const AmenityIcon = ({ type }: { type: string }) => {
  const props = { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" };
  switch (type) {
    case "wifi":
      return <WifiIcon {...props} />;
    case "tv":
      return <TvIcon {...props} />;
    case "charging":
      return <Battery50Icon {...props} />;
    default:
      return <ShieldCheckIcon {...props} />;
  }
};

const SeatSelector = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const rows = [1, 2, 3, 4, 5, 6];

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-slate-50 p-3 sm:p-6 rounded-b-xl border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200 w-fit">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 text-center">
            Lower Deck
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {rows.map((row) => (
              <React.Fragment key={row}>
                {["A", "B", "C", "D"].map((col, idx) => {
                  const id = `${row}${col}`;
                  const isGap = idx === 2;
                  return (
                    <React.Fragment key={id}>
                      {isGap && <div className="w-2 sm:w-4" />}
                      <button
                        onClick={() => toggleSeat(id)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer rounded-md border-2 transition-all flex items-center justify-center text-[9px] sm:text-[10px] font-bold
                          ${
                            selectedSeats.includes(id)
                              ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105"
                              : "bg-white border-gray-200 text-gray-400 hover:border-blue-300"
                          }`}
                      >
                        {id}
                      </button>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {[
              { label: "Available", color: "bg-white border-gray-200" },
              { label: "Booked", color: "bg-gray-300 border-gray-300" },
              { label: "Selected", color: "bg-blue-600 border-blue-600" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-gray-600"
              >
                <div className={`w-3 h-3 rounded border ${item.color}`} />{" "}
                {item.label}
              </div>
            ))}
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200">
            <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-2">
              Selected ({selectedSeats.length})
            </h4>
            <div className="flex flex-wrap gap-1 mb-3 min-h-6">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-blue-100"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-[10px] text-gray-400 italic">
                  Select seats to proceed
                </p>
              )}
            </div>
            <button
              disabled={selectedSeats.length === 0}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-lg shadow-blue-500/10"
            >
              Confirm Seats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BusResultCard() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl  mx-auto w-full space-y-3 px-3 py-20 sm:px-4 sm:py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 leading-none">
          {BUS_RESULTS.length} Buses found
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Sort:
          </span>
          <button className="text-[10px] cursor-pointer font-bold text-blue-600 uppercase underline">
            Cheapest
          </button>
        </div>
      </div>

      {BUS_RESULTS.map((bus) => (
        <div
          key={bus.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all"
        >
          <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex justify-between items-start md:block md:w-1/4">
              <div className="space-y-0.5">
                <h3 className="font-black text-base sm:text-lg text-gray-900 leading-tight">
                  {bus.operator}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                  {bus.type}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
                    <StarIcon className="h-2.5 w-2.5" /> {bus.rating}
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                    {bus.reviews} reviews
                  </span>
                </div>
              </div>
              <div className="md:hidden text-right">
                <p className="text-[9px] font-bold text-gray-400 uppercase">
                  Starts from
                </p>
                <p className="text-lg font-black text-gray-900">${bus.price}</p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-between px-2 sm:px-4 py-2 sm:py-0 bg-gray-50 sm:bg-transparent rounded-lg">
              <div className="text-center">
                <p className="text-base sm:text-xl font-black text-gray-900">
                  {bus.departure}
                </p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                  Pickup
                </p>
              </div>

              <div className="flex flex-col items-center px-4 flex-1 max-w-30">
                <p className="text-[9px] font-bold text-gray-400 mb-1">
                  {bus.duration}
                </p>
                <div className="w-full h-px bg-gray-300 relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-base sm:text-xl font-black text-gray-900">
                  {bus.arrival}
                </p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                  Drop
                </p>
              </div>
            </div>

            <div className="md:w-1/4 flex items-center md:flex-col justify-between md:justify-end gap-3">
              <div className="hidden md:block text-right w-full">
                <p className="text-[9px] font-bold text-gray-400 uppercase">
                  Starts from
                </p>
                <p className="text-2xl font-black text-gray-900">
                  ${bus.price}
                </p>
              </div>

              <div className="w-full space-y-1">
                <button
                  onClick={() =>
                    setExpandedId(expandedId === bus.id ? null : bus.id)
                  }
                  className={`w-full py-2 sm:py-2.5 cursor-pointer px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2
                    ${expandedId === bus.id ? "bg-slate-900 text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"}`}
                >
                  {expandedId === bus.id ? "Close" : "Select Seats"}
                  {expandedId === bus.id ? (
                    <ChevronUpIcon className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDownIcon className="h-3.5 w-3.5" />
                  )}
                </button>
                <p className="text-[9px] text-center text-red-500 font-bold italic">
                  {bus.seatsAvailable} seats left!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/50 px-4 sm:px-6 py-2 border-t border-gray-100 flex items-center justify-between">
            <div className="flex gap-3 sm:gap-4">
              {bus.amenities.map((a) => (
                <AmenityIcon key={a} type={a} />
              ))}
            </div>
            <button className="text-[9px] cursor-pointer font-bold text-blue-600 uppercase flex items-center gap-1 hover:underline">
              <InformationCircleIcon className="h-3 w-3" /> Info
            </button>
          </div>

          {expandedId === bus.id && <SeatSelector />}
        </div>
      ))}
    </div>
  );
}
