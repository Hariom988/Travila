"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  MapPin,
  TrendingUp,
  Search,
  Loader,
  Mountain,
  Map,
  Shield,
  Camera,
  Compass,
  BookOpen,
  Eye,
  Calendar,
  Flame,
  Star,
} from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  featuredImage: string;
  slug: string;
  tags: string[];
  author: string;
  viewCount: number;
  content: string;
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  "Trekking Tips": <Mountain size={20} />,
  Destinations: <Map size={20} />,
  Safety: <Shield size={20} />,
  Photography: <Camera size={20} />,
  Planning: <Compass size={20} />,
};

const QUICK_TIPS = [
  {
    icon: "🏔️",
    tip: "Always acclimatise properly above 3,000m — rushing altitude gains causes AMS.",
  },
  {
    icon: "🎒",
    tip: "Pack layers, not just a heavy jacket. Temperature swings of 20°C are normal on Himalayan trails.",
  },
  {
    icon: "💧",
    tip: "Drink 3–4 litres of water daily at altitude, even if you don't feel thirsty.",
  },
  {
    icon: "🗺️",
    tip: "Download offline maps before you trek — mobile data is non-existent on most trails.",
  },
  {
    icon: "🥾",
    tip: "Break in new trekking boots at least 3 weeks before your trip. Blisters ruin expeditions.",
  },
  {
    icon: "📋",
    tip: "Register with the local forest department before every trek — it's the law and saves lives.",
  },
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/blogs/categories");
        const data = await res.json();
        if (data.success && data.categories?.length > 0) {
          setCategories(["All", ...data.categories]);
        }
      } catch {}
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchBlogs();
      },
      searchTerm ? 400 : 0,
    );
    return () => clearTimeout(timer);
  }, [activeCategory, currentPage, searchTerm]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      params.set("page", currentPage.toString());
      params.set("limit", "9");
      if (activeCategory !== "All") params.set("category", activeCategory);
      if (searchTerm.trim()) params.set("search", searchTerm.trim());

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Failed");

      const list: BlogPost[] = Array.isArray(data.data) ? data.data : [];
      setBlogs(list);
      setTotalPages(data.pagination?.pages ?? 1);
      setTotal(data.pagination?.total ?? 0);

      if (categories.length <= 1 && list.length > 0) {
        const cats = Array.from(
          new Set(list.map((b) => b.category).filter(Boolean)),
        ) as string[];
        setCategories(["All", ...cats]);
      }
    } catch {
      setError(true);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    if (!content) return 1;
    return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
  };
  const featured = blogs[0];
  const rest = blogs.slice(1);
  const totalViews = blogs.reduce((a, b) => a + (b.viewCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#f8f9f6] text-slate-800 font-sans">
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-150 h-150 bg-emerald-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-100 h-100 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
                <BookOpen size={12} /> Adventure Journal
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] mb-4">
                Expert Trails,
                <br />
                <span className="text-emerald-400">Real Stories.</span>
              </h1>
              <p className="text-slate-400 text-base max-w-lg leading-relaxed">
                Trekking advice, destination guides, safety protocols and
                stories straight from the field by{" "}
                <span className="text-white font-semibold">
                  HikinHigh Travels.
                </span>
              </p>
            </div>

            <div className="flex gap-6 md:gap-8 shrink-0">
              {[
                { label: "Articles", value: total || blogs.length },
                {
                  label: "Topics",
                  value: categories.length > 1 ? categories.length - 1 : "—",
                },
                {
                  label: "Total Reads",
                  value:
                    totalViews > 999
                      ? `${(totalViews / 1000).toFixed(1)}k`
                      : totalViews || "—",
                },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <div className="relative max-w-md w-full">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/60 focus:bg-white/15 transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-4">Failed to load articles.</p>
            <button
              onClick={fetchBlogs}
              className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-700 transition"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            {searchTerm || activeCategory !== "All"
              ? "No articles found. Try adjusting your search or category."
              : "No articles published yet. Check back soon!"}
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <Flame size={16} className="text-orange-500" />
                  <span className="text-sm font-black text-slate-700 uppercase tracking-widest">
                    Featured
                  </span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-64 md:h-auto min-h-70 overflow-hidden bg-slate-100">
                    {featured.featuredImage ? (
                      <img
                        src={featured.featuredImage}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-emerald-100 to-slate-200 flex items-center justify-center">
                        <Mountain className="w-16 h-16 text-slate-300" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Star
                        size={13}
                        className="text-amber-400 fill-amber-400"
                      />
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                        Editor's Pick
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-slate-500 leading-relaxed text-sm mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(featured.createdAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {estimateReadTime(featured.content)} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye size={12} />
                        {featured.viewCount?.toLocaleString()}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:gap-3 transition-all">
                      Read Full Article <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {rest.length > 0 && (
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-5">
                {rest.length} more article{rest.length !== 1 ? "s" : ""}
              </p>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-row md:flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-24 w-24 shrink-0 md:h-48 md:w-full overflow-hidden bg-slate-100">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-emerald-50 to-slate-200 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                      <span className="absolute top-2 left-2 hidden md:block bg-white/90 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-3 md:p-5 flex flex-col justify-center flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 md:mb-2">
                        {post.category}
                        <span className="text-slate-300 md:inline hidden">
                          •
                        </span>
                        <span className="text-slate-400 md:flex hidden items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" />{" "}
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h2 className="text-sm md:text-lg font-bold text-slate-900 leading-tight mb-1 md:mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-xs md:text-sm line-clamp-1 md:line-clamp-2 mb-0 md:mb-4">
                        {post.excerpt}
                      </p>
                      <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-600 mt-auto">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex md:hidden items-center pr-4 text-slate-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8 mb-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 transition"
                >
                  Previous
                </button>
                <span className="text-slate-500 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        <section className="mt-8 mb-16">
          <div className="flex items-center gap-3 mb-7">
            <Compass size={20} className="text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Browse by Topic
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(categories.length > 1
              ? categories.slice(1)
              : [
                  "Trekking Tips",
                  "Destinations",
                  "Safety",
                  "Photography",
                  "Planning",
                ]
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  handleCategoryChange(cat);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md transition-all duration-300 text-center cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
                  {TOPIC_ICONS[cat] || <BookOpen size={20} />}
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 leading-tight transition-colors">
                  {cat}
                </span>
                <span className="text-xs text-slate-400">
                  {blogs.filter((b) => b.category === cat).length} articles
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-emerald-600" />
              <h2 className="text-2xl font-black text-slate-900">
                Trekker's Quick Tips
              </h2>
            </div>
            <Link
              href="/contact"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Ask an expert <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_TIPS.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <span className="inline-block text-emerald-600 text-xs font-black uppercase tracking-widest mb-4">
                Why Read Adventure Journal
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-5">
                Written by guides,
                <br />
                not just writers.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 text-sm">
                Every article is reviewed by an active HikinHigh field guide. We
                don't publish armchair trekking advice — our team has first-hand
                experience on every trail we write about.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "✅",
                    text: "Field-tested by certified Himalayan guides",
                  },
                  {
                    icon: "🔄",
                    text: "Updated seasonally with current trail conditions",
                  },
                  {
                    icon: "📍",
                    text: "GPS coordinates and campsite details included",
                  },
                  {
                    icon: "🛡️",
                    text: "Safety protocols verified by wilderness medics",
                  },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <span className="text-base">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden md:block bg-slate-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80"
                alt="Trekking guide"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    Currently Trending
                  </p>
                  <p className="font-bold leading-snug">
                    Roopkund Lake Trek — The Complete 2026 Guide
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/60 mt-2">
                    <span>8 min read</span>
                    <span>·</span>
                    <span>2.8k views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 relative rounded-3xl overflow-hidden bg-slate-900">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl translate-y-1/2" />
          </div>
          <div className="relative z-10 p-8 md:p-14 text-center">
            <span className="inline-block bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Newsletter
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              Get trek guides in your inbox
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Monthly dispatches with new route guides, gear reviews, safety
              updates, and exclusive early-bird offers from HikinHigh Travels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/60 transition-all"
              />
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="text-slate-600 text-xs mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            {
              icon: <Mountain size={24} />,
              title: "Trek Packages",
              desc: "Guided Himalayan expeditions with certified leaders, all permits included.",
              href: "/activities",
              color: "from-emerald-600 to-emerald-800",
              cta: "Explore Treks",
            },
            {
              icon: <Map size={24} />,
              title: "Mountain Hotels",
              desc: "Handpicked stays near major trailheads across Uttarakhand and Himachal.",
              href: "/hotel",
              color: "from-slate-700 to-slate-900",
              cta: "Find Stays",
            },
            {
              icon: <Shield size={24} />,
              title: "Talk to a Guide",
              desc: "Got questions? Our field guides answer route, gear and safety queries.",
              href: "/contact",
              color: "from-blue-700 to-slate-900",
              cta: "Get in Touch",
            },
          ].map(({ icon, title, desc, href, color, cta }) => (
            <Link
              key={title}
              href={href}
              className={`group relative rounded-2xl p-7 bg-linear-to-br ${color} text-white overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  {icon}
                </div>
                <h3 className="text-lg font-black mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {desc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                  {cta} <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </section>

        <div className="text-center text-slate-400 text-xs border-t border-slate-200 pt-10 pb-4">
          <div className="flex items-center justify-center gap-2 mb-3 opacity-30">
            <MapPin className="w-5 h-5" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-slate-500 text-sm mb-1 font-semibold">
            A HikinHigh Travels Private Limited Publication
          </p>
          <Link
            href="http://www.hikinhigh.com"
            className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
          >
            www.hikinhigh.com
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
