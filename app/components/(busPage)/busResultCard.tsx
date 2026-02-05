"use client";

import React, { useState } from "react";
import {
  WifiIcon,
  TvIcon,
  Battery50Icon, // For charging point
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
  switch (type) {
    case "wifi":
      return <WifiIcon className="h-4 w-4 text-gray-400" title="Free WiFi" />;
    case "tv":
      return <TvIcon className="h-4 w-4 text-gray-400" title="Entertainment" />;
    case "charging":
      return (
        <Battery50Icon
          className="h-4 w-4 text-gray-400"
          title="Charging Point"
        />
      );
    default:
      return <ShieldCheckIcon className="h-4 w-4 text-gray-400" />;
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
    <div className="bg-slate-50 p-6 rounded-b-xl border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* Seat Layout Map */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 text-center">
            Lower Deck
          </p>
          <div className="grid grid-cols-4 gap-3">
            {rows.map((row) => (
              <React.Fragment key={row}>
                {["A", "B", "C", "D"].map((col, idx) => {
                  const id = `${row}${col}`;
                  const isGap = idx === 2; // Create an aisle
                  return (
                    <React.Fragment key={id}>
                      {isGap && <div className="w-4" />}
                      <button
                        onClick={() => toggleSeat(id)}
                        className={`w-8 h-8 cursor-pointer rounded-md border-2 transition-all flex items-center justify-center text-[10px] font-bold
                          ${
                            selectedSeats.includes(id)
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-110"
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

        {/* Legend & Summary */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <div className="w-4 h-4 rounded border-2 border-gray-200 bg-white" />{" "}
              Available
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <div className="w-4 h-4 rounded border-2 border-gray-300 bg-gray-300" />{" "}
              Booked
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-600" />{" "}
              Selected
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h4 className="text-sm font-bold text-gray-800 mb-2">
              Selected Seats
            </h4>
            <div className="flex flex-wrap gap-2 mb-4 min-h-8">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No seats selected
                </p>
              )}
            </div>
            <button
              disabled={selectedSeats.length === 0}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 rounded-lg text-sm font-bold transition-all"
            >
              Continue to Payment
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
    <div className="max-w-11/12 mx-auto w-full space-y-4 px-4 py-8  min-h-screen">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-black text-gray-900">
          Found {BUS_RESULTS.length} Buses
        </h2>
        <div className="flex gap-2">
          <span className="text-xs font-bold text-gray-400">Sort by:</span>
          <button className="text-xs cursor-pointer font-bold text-blue-600 underline">
            Cheapest
          </button>
        </div>
      </div>

      {BUS_RESULTS.map((bus) => (
        <div
          key={bus.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
        >
          {/* Main Card Content */}
          <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Operator Info */}
            <div className="space-y-1">
              <h3 className="font-black text-lg text-gray-900 leading-tight">
                {bus.operator}
              </h3>
              <p className="text-xs text-gray-500 font-medium">{bus.type}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                  <StarIcon className="h-3 w-3" /> {bus.rating}
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  {bus.reviews} reviews
                </span>
              </div>
            </div>

            {/* Timing */}
            <div className="md:col-span-2 flex items-center justify-between px-4">
              <div className="text-center">
                <p className="text-xl font-black text-gray-900">
                  {bus.departure}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Pickup
                </p>
              </div>

              <div className="flex flex-col items-center flex-1 px-4">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                  {bus.duration}
                </p>
                <div className="w-full h-px bg-gray-200 relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl font-black text-gray-900">
                  {bus.arrival}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Drop
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="text-right space-y-3">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Starts from
                </p>
                <p className="text-2xl font-black text-gray-900">
                  ₹{bus.price}
                </p>
              </div>
              <button
                onClick={() =>
                  setExpandedId(expandedId === bus.id ? null : bus.id)
                }
                className={`w-full py-2.5 cursor-pointer px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2
                  ${expandedId === bus.id ? "bg-slate-900 text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"}`}
              >
                {expandedId === bus.id ? "Close" : "Select Seats"}
                {expandedId === bus.id ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
              <p className="text-[10px] text-red-500 font-bold italic">
                {bus.seatsAvailable} seats left!
              </p>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-gray-50/50 px-6 py-2 border-t border-gray-100 flex items-center justify-between">
            <div className="flex gap-4">
              {bus.amenities.map((a) => (
                <AmenityIcon key={a} type={a} />
              ))}
            </div>
            <button className="text-[10px] cursor-pointer font-bold text-blue-600 uppercase flex items-center gap-1 hover:underline">
              <InformationCircleIcon className="h-3 w-3" /> Policy & Info
            </button>
          </div>

          {/* Expandable Selection Area */}
          {expandedId === bus.id && <SeatSelector />}
        </div>
      ))}
    </div>
  );
}
