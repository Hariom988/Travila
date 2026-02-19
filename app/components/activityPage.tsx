"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ArrowLeft,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Headphones,
  CreditCard,
  MapPin,
  Star,
  TrendingUp,
  Award,
  Clock,
  Users,
  ThumbsUp,
  Globe,
  Zap,
  Camera,
  Mountain,
  Waves,
} from "lucide-react";
import SearchBar from "./searchBar";
import ActivityCard from "./activityCard";

interface activity {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: string;
  image: string;
  pricePerNight: string;
  oldPrice?: string;
}

type SortOption = "high-to-low" | "low-to-high" | "default";

const ITEMS_PER_PAGE = 12;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-10 h-10 cursor-pointer rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-purple-400 hover:text-purple-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
      >
        <ChevronLeft size={18} />
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-10 text-center text-slate-400 font-bold select-none"
          >
            …
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 cursor-pointer rounded-xl text-sm font-bold transition-all shadow-sm ${
              currentPage === page
                ? "bg-purple-600 text-white border border-purple-600 shadow-purple-200 shadow-md "
                : "bg-white border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-600"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-10 h-10 cursor-pointer rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-purple-400 hover:text-purple-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

const WhyBookWithUs = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Booking",
      desc: "Your payments and personal data are protected with bank-level encryption.",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      desc: "Our activity experts are available round the clock to assist you anytime.",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Best Price Guarantee",
      desc: "Find a lower price? We'll match it — no questions asked.",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      icon: <ThumbsUp className="w-6 h-6" />,
      title: "Free Cancellation",
      desc: "Plans change — cancel up to 24 hours before activity, completely free.",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
  ];

  return (
    <section className="mt-16">
      <div className="text-center mb-10">
        <p className="text-purple-600 font-bold italic text-sm mb-1">
          Trusted by 50,000+ Adventurers
        </p>
        <h2 className="text-3xl font-black text-slate-900">
          Why Book With HikinHigh?
        </h2>
        <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">
          We handpick the best experiences, ensure your safety, and make every
          adventure seamless from booking to finish.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div
              className={`w-12 h-12 rounded-xl ${f.bg} ${f.text} flex items-center justify-center mb-4  transition-transform`}
            >
              {f.icon}
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsBar = () => (
  <section className="mt-16 bg-linear-to-r from-purple-600 to-purple-700 rounded-3xl p-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
      {[
        {
          icon: <Zap className="w-6 h-6" />,
          value: "300+",
          label: "Activities Listed",
        },
        {
          icon: <Users className="w-6 h-6" />,
          value: "50K+",
          label: "Happy Adventurers",
        },
        {
          icon: <Star className="w-6 h-6" />,
          value: "4.9★",
          label: "Average Rating",
        },
        {
          icon: <Award className="w-6 h-6" />,
          value: "8+",
          label: "Years of Trust",
        },
      ].map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            {s.icon}
          </div>
          <p className="text-3xl font-black">{s.value}</p>
          <p className="text-purple-100 text-sm font-semibold">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const PopularCategories = () => {
  const categories = [
    {
      name: "Trekking",
      count: "45+ Activities",
      img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      icon: <Mountain className="w-5 h-5" />,
    },
    {
      name: "Water Sports",
      count: "38+ Activities",
      img: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&h=300&fit=crop",
      icon: <Waves className="w-5 h-5" />,
    },
    {
      name: "Photography",
      count: "22+ Activities",
      img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=300&fit=crop",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      name: "Adventure",
      count: "60+ Activities",
      img: "https://images.unsplash.com/photo-1551649001-7a2482d98d05?w=400&h=300&fit=crop",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Cultural Tours",
      count: "33+ Activities",
      img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      name: "Camping",
      count: "27+ Activities",
      img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <section className="mt-16">
      <div className="text-center mb-10">
        <p className="text-purple-600 font-bold italic text-sm mb-1">
          Browse by Category
        </p>
        <h2 className="text-3xl font-black text-slate-900">
          Popular Activity Types
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Find the perfect adventure that matches your vibe.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((c, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-44"
          >
            <img
              src={c.img}
              alt={c.name}
              className="w-full h-full object-cover  transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <p className="text-white font-black text-base leading-tight">
                {c.name}
              </p>
              <p className="text-white/70 text-[10px] font-semibold">
                {c.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ActivityTips = () => {
  const tips = [
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      title: "Book in Advance",
      desc: "Popular activities fill up fast — booking early secures your spot and the best rates.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      title: "Weekday Advantage",
      desc: "Mid-week activities are less crowded and often 15–25% cheaper than weekends.",
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: "Check Safety Ratings",
      desc: "All listed activities are vetted. Look for certified guides and equipment standards.",
    },
    {
      icon: <Star className="w-5 h-5 text-orange-500" />,
      title: "Read Recent Reviews",
      desc: "Focus on reviews from the last 3 months for the most accurate experience.",
    },
  ];

  return (
    <section className="mt-16 mb-8">
      <div className="text-center mb-10">
        <p className="text-purple-600 font-bold italic text-sm mb-1">
          Pro Adventurer Advice
        </p>
        <h2 className="text-3xl font-black text-slate-900">
          Smart Booking Tips
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              {tip.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">{tip.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FilterSidebarContent = ({
  sortBy,
  setSortBy,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
}: {
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
  minBudget: string;
  setMinBudget: (v: string) => void;
  maxBudget: string;
  setMaxBudget: (v: string) => void;
}) => (
  <>
    <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
      <ArrowUpDown size={18} className="text-purple-600" /> Filters & Sort
    </h3>
    <div className="mb-6">
      <p className="text-xs font-bold text-slate-500 uppercase mb-3">Sort By</p>
      <div className="space-y-2">
        {(["default", "low-to-high", "high-to-low"] as SortOption[]).map(
          (opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={`w-full cursor-pointer text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                sortBy === opt
                  ? "bg-purple-100 text-purple-700 border border-purple-300"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {opt.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ),
        )}
      </div>
    </div>
    <div className="border-t border-slate-200 pt-6">
      <p className="text-xs font-bold text-slate-500 uppercase mb-3">
        Budget Range
      </p>
      <div className="space-y-3">
        <input
          type="number"
          placeholder="Min ($)"
          className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max ($)"
          className="w-full bg-slate-50 border border-slate-200 p-3 text-sm rounded-lg"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
      </div>
    </div>
  </>
);

function ActivityPageContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) return JSON.parse(stored).searchQuery || "";
    }
    return searchParams.get("search") || "";
  });

  const [checkIn, setCheckIn] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) return JSON.parse(stored).checkIn || "";
    }
    return searchParams.get("checkIn") || "";
  });

  const [checkOut, setCheckOut] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) return JSON.parse(stored).checkOut || "";
    }
    return searchParams.get("checkOut") || "";
  });

  const [rooms, setRooms] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) return JSON.parse(stored).rooms || 1;
    }
    return Number(searchParams.get("rooms")) || 1;
  });

  const [adults, setAdults] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) return JSON.parse(stored).adults || 2;
    }
    return Number(searchParams.get("adults")) || 2;
  });

  const [tours, setTours] = useState<activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("/api/activity-management");
        if (!response.ok) console.log(`API error: ${response.status}`);
        const data = await response.json();
        const formattedTours: activity[] = data.map((hotel: any) => ({
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          description: hotel.description || "",
          duration: hotel.duration || "4 Hours",
          image:
            hotel.images?.[0] ||
            hotel.image ||
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
          pricePerNight: `$${Math.round(hotel.pricePerPerson)}`,
          oldPrice: `$${Math.round(hotel.pricePerPerson * 1.2)}`,
        }));
        setTours(formattedTours);
      } catch (e) {
        console.error("Error fetching activities:", e);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleSearch = (params: {
    searchQuery: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
  }) => {
    setSearchQuery(params.searchQuery);
    setCheckIn(params.checkIn);
    setCheckOut(params.checkOut);
    setRooms(params.rooms);
    setAdults(params.adults);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleMinBudgetChange = (value: string) => {
    setMinBudget(value);
    setCurrentPage(1);
  };

  const handleMaxBudgetChange = (value: string) => {
    setMaxBudget(value);
    setCurrentPage(1);
  };

  const filteredTours = useMemo(() => {
    return tours
      .filter((activity) => {
        const price = parseFloat(activity.pricePerNight.replace("$", ""));
        const matchesSearch =
          activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMin = minBudget === "" || price >= parseFloat(minBudget);
        const matchesMax = maxBudget === "" || price <= parseFloat(maxBudget);
        return matchesSearch && matchesMin && matchesMax;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.pricePerNight.replace("$", ""));
        const priceB = parseFloat(b.pricePerNight.replace("$", ""));
        if (sortBy === "low-to-high") return priceA - priceB;
        if (sortBy === "high-to-low") return priceB - priceA;
        return 0;
      });
  }, [tours, searchQuery, minBudget, maxBudget, sortBy]);

  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);

  const safePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedTours = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredTours.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTours, safePage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-purple-50 pb-20">
      <header className="lg:hidden bg-white px-4 py-3 flex items-center gap-4 sticky top-0 z-40 shadow-sm border-b border-slate-200">
        <ArrowLeft className="text-slate-700 cursor-pointer" size={24} />
        <div>
          <h1 className="font-bold text-base">Activities</h1>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">
            India
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 lg:pt-8">
        <SearchBar
          onSearch={handleSearch}
          defaultSearchQuery={searchQuery}
          defaultCheckIn={checkIn}
          defaultCheckOut={checkOut}
          defaultRooms={rooms}
          defaultAdults={adults}
          instantSearch={true}
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          <aside className="hidden lg:block w-80 shrink-0 sticky top-32 self-start">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <FilterSidebarContent
                sortBy={sortBy}
                setSortBy={handleSortChange}
                minBudget={minBudget}
                setMinBudget={handleMinBudgetChange}
                maxBudget={maxBudget}
                setMaxBudget={handleMaxBudgetChange}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0 w-full max-w-4xl mx-auto lg:max-w-none lg:mx-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <h2 className="font-bold text-lg lg:text-xl text-slate-900">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    <span className="text-purple-600">
                      {filteredTours.length}
                    </span>{" "}
                    Activities Found
                    {totalPages > 1 && (
                      <span className="text-slate-400 text-sm font-normal ml-2">
                        — Page {safePage} of {totalPages}
                      </span>
                    )}
                  </>
                )}
              </h2>
              <button
                onClick={() => setShowFiltersModal(true)}
                className="lg:hidden cursor-pointer flex items-center gap-2 text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-lg"
              >
                <ArrowUpDown size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-white border border-slate-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : paginatedTours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedTours.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="py-20 bg-white rounded-2xl border border-dashed text-center">
                <Search className="mx-auto text-slate-300 mb-4" size={56} />
                <p className="text-slate-600 font-medium">
                  No activities found matching your criteria
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {filteredTours.length > 0 && totalPages > 1 && (
              <p className="text-center text-xs text-slate-400 mt-3">
                Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(safePage * ITEMS_PER_PAGE, filteredTours.length)} of{" "}
                {filteredTours.length} activities
              </p>
            )}
          </div>
        </div>

        <WhyBookWithUs />
        <StatsBar />
        <PopularCategories />
        <ActivityTips />
      </div>

      {showFiltersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl lg:rounded-2xl w-full lg:w-96 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-3xl">
              <h3 className="font-bold text-lg">Filters & Sort</h3>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="p-2 cursor-pointer hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <FilterSidebarContent
                sortBy={sortBy}
                setSortBy={handleSortChange}
                minBudget={minBudget}
                setMinBudget={handleMinBudgetChange}
                maxBudget={maxBudget}
                setMaxBudget={handleMaxBudgetChange}
              />
              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-full cursor-pointer bg-purple-500 hover:bg-purple-500 text-white font-bold py-3 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HotelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading Activities...
        </div>
      }
    >
      <ActivityPageContent />
    </Suspense>
  );
}
