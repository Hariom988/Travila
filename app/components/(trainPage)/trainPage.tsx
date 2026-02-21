"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Clock,
  ArrowLeftRight,
  Search,
  Star,
  Shield,
  Wifi,
  Coffee,
  Utensils,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Users,
  Zap,
  ArrowRight,
  Luggage,
  Phone,
  RefreshCw,
  TrendingUp,
  Award,
  HeadphonesIcon,
  CreditCard,
  ChevronLeft,
} from "lucide-react";
import TrainBookingSearch from "./trainBookingSearch";
const CITIES = [
  "New York (NYP)",
  "Los Angeles (LAX)",
  "Chicago (CHI)",
  "Houston (HOU)",
  "Washington DC (WAS)",
  "Boston (BOS)",
  "Philadelphia (PHL)",
  "Seattle (SEA)",
  "San Francisco (SFO)",
  "Miami (MIA)",
  "Denver (DEN)",
  "Atlanta (ATL)",
];

const TRAIN_RESULTS = [
  {
    id: 1,
    name: "Acela Express",
    number: "ACE 2151",
    from: "New York Penn",
    to: "Washington DC",
    departure: "06:10",
    arrival: "09:45",
    duration: "3h 35m",
    classes: [
      { label: "Business", seats: 24, price: 89 },
      { label: "First Class", seats: 8, price: 149 },
    ],
    amenities: ["wifi", "dining", "power"],
    rating: 4.8,
    reviews: 2140,
    onTime: 94,
    type: "High Speed",
    typeColor: "bg-blue-600",
  },
  {
    id: 2,
    name: "Northeast Regional",
    number: "REG 171",
    from: "New York Penn",
    to: "Washington DC",
    departure: "07:35",
    arrival: "11:30",
    duration: "3h 55m",
    classes: [
      { label: "Coach", seats: 62, price: 49 },
      { label: "Business", seats: 18, price: 79 },
    ],
    amenities: ["wifi", "power"],
    rating: 4.4,
    reviews: 1830,
    onTime: 88,
    type: "Regional",
    typeColor: "bg-slate-600",
  },
  {
    id: 3,
    name: "Capitol Limited",
    number: "CAP 029",
    from: "Chicago Union",
    to: "Washington DC",
    departure: "22:05",
    arrival: "18:40",
    duration: "20h 35m",
    classes: [
      { label: "Coach", seats: 40, price: 69 },
      { label: "Roomette", seats: 14, price: 189 },
      { label: "Bedroom Suite", seats: 4, price: 349 },
    ],
    amenities: ["wifi", "dining", "power", "lounge"],
    rating: 4.7,
    reviews: 980,
    onTime: 91,
    type: "Overnight",
    typeColor: "bg-indigo-600",
  },
];

const POPULAR_ROUTES = [
  {
    from: "New York",
    to: "Washington DC",
    price: 49,
    duration: "3h 35m",
    img: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=400&h=260&fit=crop",
  },
  {
    from: "Chicago",
    to: "New Orleans",
    price: 79,
    duration: "19h 10m",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=260&fit=crop",
  },
  {
    from: "Los Angeles",
    to: "San Francisco",
    price: 39,
    duration: "9h 10m",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=260&fit=crop",
  },
  {
    from: "Boston",
    to: "New York",
    price: 35,
    duration: "4h 5m",
    img: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=400&h=260&fit=crop",
  },
];

const TRAIN_CLASSES = [
  {
    name: "Coach",
    desc: "Comfortable reclining seats with generous legroom. Great value for daytime travel.",
    features: [
      "Reclining seats",
      "Fold-down tray",
      "USB charging",
      "Overhead storage",
    ],
    from: "$29",
    border: "border-slate-200",
    badge: "Best Value",
    badgeColor: "bg-slate-100 text-slate-700",
  },
  {
    name: "Business Class",
    desc: "Premium seats with extra width, dedicated overhead bins, and priority boarding.",
    features: [
      "Wide leather seats",
      "More legroom",
      "Priority boarding",
      "At-seat service",
    ],
    from: "$79",
    border: "border-blue-300",
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "First Class / Roomette",
    desc: "Your own private room with fold-down beds, picture windows, and all meals included.",
    features: [
      "Private room",
      "Fold-down bed",
      "All meals included",
      "Panoramic windows",
    ],
    from: "$149",
    border: "border-amber-300",
    badge: "Premium",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

const TRAVEL_TIPS = [
  {
    icon: Clock,
    title: "Book Early, Save More",
    desc: "Fares drop up to 40% when booked 2–3 weeks in advance. Set a price alert.",
  },
  {
    icon: Clock,
    title: "Off-Peak Advantage",
    desc: "Travelling Tue–Thu saves $20–$50 vs peak Friday/Sunday fares.",
  },
  {
    icon: Luggage,
    title: "Luggage Policy",
    desc: "2 carry-on bags plus 2 personal items free. Oversized bags: $20 at the station.",
  },
  {
    icon: RefreshCw,
    title: "Flexible Cancellation",
    desc: "Cancel up to 24 hrs before for a full refund. After 24 hrs: travel credit for 12 months.",
  },
];

const WHY_TRAIN = [
  {
    icon: Shield,
    title: "Safest Way to Travel",
    desc: "Trains have 18× lower fatality risk than road travel.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "City Centre to City Centre",
    desc: "No distant airports or security lines — trains stop in the heart of the city.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Wifi,
    title: "Stay Connected",
    desc: "Free high-speed Wi-Fi on all Acela and most Regional services.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Coffee,
    title: "Onboard Dining",
    desc: "From café cars to full dining cars — proper meals at 150 mph.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Room to Move",
    desc: "Stretch your legs, walk to the dining car, and breathe freely.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    desc: "No hidden fees or fuel surcharges. The price you see is the price you pay.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: Date;
  onSelect: (d: Date) => void;
}) {
  const [view, setView] = useState(
    new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div
      className="absolute left-0 top-[calc(100%+12px)] z-9999 w-75 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          className="cursor-pointer rounded-lg p-1.5 hover:bg-slate-100"
          onClick={(e) => {
            e.stopPropagation();
            setView(new Date(year, month - 1, 1));
          }}
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-sm font-bold text-slate-800">
          {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          className="cursor-pointer rounded-lg p-1.5 hover:bg-slate-100"
          onClick={(e) => {
            e.stopPropagation();
            setView(new Date(year, month + 1, 1));
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {DAY_HEADERS.map((label, idx) => (
          <div
            key={idx}
            className="text-center text-[10px] font-bold text-slate-400"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = new Date(year, month, i + 1);
          const isPast = day < today;
          const isSelected = day.toDateString() === selected.toDateString();
          return (
            <button
              key={`day-${i}`}
              disabled={isPast}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(day);
              }}
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all
                ${
                  isPast
                    ? "cursor-not-allowed text-slate-300"
                    : isSelected
                      ? "cursor-pointer bg-blue-600 text-white shadow"
                      : "cursor-pointer text-slate-700 hover:bg-blue-50"
                }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrainSearchWidget() {
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[3]);
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [active, setActive] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setActive(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const swap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const filtered = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const openCity = (panel: "from" | "to") => {
    setCitySearch("");
    setActive(active === panel ? null : panel);
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto max-w-5xl rounded-3xl border border-slate-100 bg-white shadow-2xl"
    >
      <div className="flex gap-1 px-5 pt-4 pb-2">
        {(["one-way", "round-trip"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTripType(t)}
            className={`cursor-pointer rounded-xl px-4 py-1.5 text-sm font-bold transition-all
              ${tripType === t ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"}`}
          >
            {t === "one-way" ? "One Way" : "Round Trip"}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-stretch px-4 pb-4">
        <div
          className="relative flex-[1.2] min-w-0 cursor-pointer rounded-2xl p-4 transition hover:bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100"
          onClick={() => openCity("from")}
        >
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            From
          </p>
          <p className="truncate text-xl font-extrabold leading-tight text-slate-900">
            {from.split("(")[0].trim()}
          </p>
          <p className="text-xs font-medium text-slate-400">
            {from.match(/\(([^)]+)\)/)?.[1]}
          </p>

          {active === "from" && (
            <div
              className="absolute left-0 top-[calc(100%+12px)] z-9999 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 border-b border-slate-100">
                <Search size={16} className="shrink-0 text-slate-400" />
                <input
                  autoFocus
                  placeholder="Search station…"
                  className="w-full bg-transparent text-sm font-semibold outline-none text-slate-800"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filtered.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFrom(c);
                      setActive(null);
                    }}
                  >
                    <MapPin size={14} className="shrink-0 text-slate-300" />
                    <span className="text-sm font-semibold text-slate-700">
                      {c}
                    </span>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-400 font-medium">
                    No stations found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex shrink-0 items-center justify-center px-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              swap();
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm transition hover:bg-blue-50 hover:scale-110 active:scale-95"
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>

        <div
          className="relative flex-[1.2] min-w-0 cursor-pointer rounded-2xl p-4 transition hover:bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100"
          onClick={() => openCity("to")}
        >
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            To
          </p>
          <p className="truncate text-xl font-extrabold leading-tight text-slate-900">
            {to.split("(")[0].trim()}
          </p>
          <p className="text-xs font-medium text-slate-400">
            {to.match(/\(([^)]+)\)/)?.[1]}
          </p>

          {active === "to" && (
            <div
              className="absolute left-0 md:left-auto md:right-0 top-[calc(100%+12px)] z-9999 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 border-b border-slate-100">
                <Search size={16} className="shrink-0 text-slate-400" />
                <input
                  autoFocus
                  placeholder="Search station…"
                  className="w-full bg-transparent text-sm font-semibold outline-none text-slate-800"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filtered.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTo(c);
                      setActive(null);
                    }}
                  >
                    <MapPin size={14} className="shrink-0 text-slate-300" />
                    <span className="text-sm font-semibold text-slate-700">
                      {c}
                    </span>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-400 font-medium">
                    No stations found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className="relative flex-1 min-w-0 cursor-pointer rounded-2xl p-4 transition hover:bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100"
          onClick={() => setActive(active === "date" ? null : "date")}
        >
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Departure
          </p>
          <p className="text-xl font-extrabold leading-tight text-slate-900">
            {date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </p>
          <p className="text-xs font-medium text-slate-400">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              weekday: "long",
            })}
          </p>
          {active === "date" && (
            <MiniCalendar
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setActive(null);
              }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0 rounded-2xl p-4 border-b md:border-b-0 md:border-r border-slate-100">
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Passengers
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              −
            </button>
            <span className="w-4 text-center text-xl font-extrabold text-slate-900">
              {passengers}
            </span>
            <button
              onClick={() => setPassengers((p) => Math.min(8, p + 1))}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex items-center p-3">
          <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95">
            <Search size={18} /> Search
          </button>
        </div>
      </div>
    </div>
  );
}

function TrainResultCard({ train }: { train: (typeof TRAIN_RESULTS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedClass, setSelectedClass] = useState(0);

  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi size={13} className="text-slate-400" />,
    dining: <Utensils size={13} className="text-slate-400" />,
    power: <Zap size={13} className="text-slate-400" />,
    lounge: <Coffee size={13} className="text-slate-400" />,
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="md:w-1/4">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span
                className={`${train.typeColor} rounded-full px-2 py-0.5 text-[10px] font-black uppercase text-white`}
              >
                {train.type}
              </span>
              <span className="flex items-center gap-1">
                <Star size={11} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[11px] font-bold text-slate-600">
                  {train.rating}
                </span>
              </span>
            </div>
            <p className="text-base font-extrabold leading-tight text-slate-900">
              {train.name}
            </p>
            <p className="text-xs font-medium text-slate-400">{train.number}</p>
            <p className="mt-1 text-[10px] font-bold text-emerald-600">
              On-time: {train.onTime}%
            </p>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <div className="text-center">
              <p className="text-2xl font-black leading-none text-slate-900">
                {train.departure}
              </p>
              <p className="mt-0.5 max-w-20 truncate text-[10px] font-medium text-slate-400">
                {train.from}
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <p className="text-[10px] font-bold text-slate-400">
                {train.duration}
              </p>
              <div className="relative my-1 h-px w-full bg-slate-200">
                <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400" />
                <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-600" />
              </div>
              <div className="flex gap-2">
                {train.amenities.map((a) => (
                  <span key={a}>{amenityIcons[a]}</span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black leading-none text-slate-900">
                {train.arrival}
              </p>
              <p className="mt-0.5 max-w-20 truncate text-[10px] font-medium text-slate-400">
                {train.to}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 md:w-1/4 md:flex-col md:items-end md:justify-center">
            <div className="text-right">
              <p className="text-[10px] font-medium text-slate-400">from</p>
              <p className="text-2xl font-black leading-none text-blue-600">
                ${train.classes[0].price}
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Select{" "}
              <ChevronDown
                size={14}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 p-4 md:p-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Choose Your Class
          </p>
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {train.classes.map((cls, i) => (
              <button
                key={i}
                onClick={() => setSelectedClass(i)}
                className={`cursor-pointer rounded-xl border-2 p-4 text-left transition-all ${selectedClass === i ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-200"}`}
              >
                <p className="text-sm font-bold text-slate-900">{cls.label}</p>
                <p className="text-lg font-extrabold text-blue-600">
                  ${cls.price}
                </p>
                <p className="text-[10px] font-medium text-slate-400">
                  {cls.seats} seats left
                </p>
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setExpanded(false)}
              className="cursor-pointer px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">
              Book for ${train.classes[selectedClass].price}{" "}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsBanner() {
  return (
    <div className="bg-slate-900 px-4 py-8 md:py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 text-center text-white md:grid-cols-6">
        {[
          { val: "500+", lbl: "Train Routes" },
          { val: "2M+", lbl: "Happy Passengers" },
          { val: "94%", lbl: "On-Time Rate" },
          { val: "$29", lbl: "Fares Start From" },
          { val: "4.8★", lbl: "Avg Rating" },
          { val: "24/7", lbl: "Support" },
        ].map((s, i) => (
          <div key={i}>
            <p className="text-xl font-extrabold text-blue-400 md:text-3xl">
              {s.val}
            </p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400 md:text-xs">
              {s.lbl}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopularRoutes() {
  return (
    <section className="bg-slate-50 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-bold italic text-blue-600">
              Top Picks
            </p>
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              Popular Routes
            </h2>
          </div>
          <button className="flex cursor-pointer items-center gap-1 text-sm font-bold text-blue-600 hover:underline">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {POPULAR_ROUTES.map((r, i) => (
            <div
              key={i}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:shadow-lg"
            >
              <div className="relative h-36 overflow-hidden md:h-44">
                <img
                  src={r.img}
                  alt={r.to}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white">
                  <p className="text-[10px] font-bold opacity-80">from</p>
                  <p className="text-xl font-extrabold leading-none">
                    ${r.price}
                  </p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                  <span>{r.from}</span>
                  <ArrowRight size={12} className="text-slate-400" />
                  <span>{r.to}</span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                  <Clock size={10} />
                  {r.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassGuide() {
  return (
    <section className="bg-white px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-1 text-sm font-bold italic text-blue-600">
            Know Before You Book
          </p>
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 md:text-4xl">
            Travel Classes Explained
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500 md:text-base">
            Coach to Bedroom Suites — find the class that fits your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {TRAIN_CLASSES.map((cls, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 ${cls.border} p-5 transition-all hover:shadow-md md:p-7`}
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-lg font-extrabold text-slate-900 md:text-xl">
                  {cls.name}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${cls.badgeColor}`}
                >
                  {cls.badge}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                {cls.desc}
              </p>
              <ul className="mb-5 space-y-2">
                {cls.features.map((f, fi) => (
                  <li
                    key={fi}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle
                      size={14}
                      className="shrink-0 text-emerald-500"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[10px] text-slate-400">Starting from</p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    {cls.from}
                  </p>
                </div>
                <button className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyTrain() {
  return (
    <section className="bg-slate-50 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-1 text-sm font-bold italic text-blue-600">
            The Smarter Choice
          </p>
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 md:text-4xl">
            Why Travel by Train?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {WHY_TRAIN.map((w, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:shadow-sm"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${w.bg}`}
              >
                <w.icon size={20} className={w.color} />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-bold text-slate-900 md:text-base">
                  {w.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 md:text-sm">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TravelTips() {
  return (
    <section className="bg-blue-600 px-4 py-10 text-white md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 text-center">
          <p className="mb-1 text-sm font-bold italic text-blue-200">
            Pro Traveller Advice
          </p>
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Smart Booking Tips
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {TRAVEL_TIPS.map((tip, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 transition-all hover:bg-white/15 md:p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <tip.icon size={18} className="text-white" />
              </div>
              <h4 className="mb-1.5 text-sm font-bold text-white">
                {tip.title}
              </h4>
              <p className="text-xs leading-relaxed text-blue-100">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HelpSection() {
  return (
    <section className="bg-white px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold italic text-blue-600">
              We&apos;re Here for You
            </p>
            <h2 className="mb-4 text-2xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Need Help with Your Booking?
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600 md:text-base">
              Our rail travel experts are available round the clock to help you
              plan the perfect journey.
            </p>
            <div className="space-y-3">
              {[
                { icon: Phone, label: "1-800-RAIL-USA (24/7)" },
                { icon: HeadphonesIcon, label: "Live Chat — App & Website" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="group flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <c.icon size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                desc: "Bank-grade encryption on all transactions.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: RefreshCw,
                title: "Easy Refunds",
                desc: "Full refund or travel credit, no hassle.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                icon: Award,
                title: "Loyalty Rewards",
                desc: "Earn points on every ticket, redeem for free rides.",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                icon: Users,
                title: "Group Bookings",
                desc: "10+ travellers? Call us for exclusive group discounts.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-slate-100 p-4 transition-all hover:shadow-sm ${card.bg}`}
              >
                <card.icon size={22} className={`mb-2 ${card.color}`} />
                <h4 className="mb-1 text-sm font-bold text-slate-900">
                  {card.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-500">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-slate-50 px-4 py-10 md:py-16">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-slate-900 text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=400&fit=crop"
            alt="Train"
            className="h-full w-full object-cover opacity-15"
          />
        </div>
        <div className="relative z-10 px-6 py-12 text-white md:px-12 md:py-16">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-400">
            Limited Time Offer
          </p>
          <h2 className="mb-3 text-2xl font-extrabold leading-tight md:text-4xl">
            Save Up to 40% on Early Bird Tickets
          </h2>
          <p className="mx-auto mb-7 max-w-lg text-sm text-slate-400 md:text-base">
            Book 14+ days ahead and unlock our best fares on Acela, Regional,
            and Long-Distance routes.
          </p>
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:bg-blue-700 active:scale-95">
            Search Trains Now <ArrowRight size={18} />
          </button>
          <p className="mt-4 text-xs text-slate-500">
            ✓ No booking fees · ✓ Free seat selection · ✓ Instant e-ticket
          </p>
        </div>
      </div>
    </section>
  );
}

export default function TrainPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&h=600&fit=crop"
            alt="Train"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-8 md:pt-24">
          <span className="mb-4 inline-block rounded-full bg-blue-600/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Rail Travel Across America
          </span>
          <h1 className="mb-3 text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Travel Smarter.
            <br />
            <span className="text-blue-400">Travel by Train.</span>
          </h1>
          <p className="mb-8 max-w-xl text-sm text-slate-300 md:text-lg">
            500+ routes, fares from $29, city-centre to city-centre. No traffic.
            No stress.
          </p>
        </div>
        <TrainBookingSearch />
      </section>

      <StatsBanner />

      <section className="bg-white px-4 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-bold italic text-blue-600">
                Sample Results
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                <span className="text-blue-600">3</span> Trains Found
                <span className="ml-2 text-base font-normal text-slate-400">
                  · New York → Washington DC
                </span>
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {TRAIN_RESULTS.map((t) => (
              <TrainResultCard key={t.id} train={t} />
            ))}
          </div>
        </div>
      </section>

      <PopularRoutes />
      <ClassGuide />
      <WhyTrain />
      <TravelTips />
      <HelpSection />
      <CTABanner />
    </div>
  );
}
