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
}

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

      setBlogs(data.data ?? []);
      setTotalPages(data.pagination?.pages ?? 1);
      setTotal(data.pagination?.total ?? 0);

      if (categories.length <= 1 && data.data?.length > 0) {
        const cats = [
          "All",
          ...(Array.from(
            new Set(data.data.map((b: BlogPost) => b.category)),
          ) as string[]),
        ];
        setCategories(cats);
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

  const filteredPosts = blogs;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <section className="py-12 px-4 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Adventure Journal
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm md:text-base mb-6">
            Expert trekking advice, safety protocols, and stories from the field
            by
            <span className="font-semibold text-slate-900">
              {" "}
              HikinHigh Travels.
            </span>
          </p>

          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap cursor-pointer px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!loading && total > 0 && (
          <p className="text-slate-400 text-xs mb-4">
            Showing {filteredPosts.length} of {total} articles
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
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
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            {searchTerm || activeCategory !== "All"
              ? "No articles found. Try adjusting your search or category."
              : "No articles published yet. Check back soon!"}
          </div>
        ) : (
          <>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-row md:flex-col bg-white border border-slate-100 md:border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-24 w-24 shrink-0 md:h-48 md:w-full overflow-hidden bg-slate-100">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-200 to-slate-200 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-6 flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 md:mb-3">
                      {post.category}
                      <span className="text-slate-300 md:inline hidden">•</span>
                      <span className="text-slate-400 md:flex hidden items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />{" "}
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    <h2 className="text-sm md:text-xl font-bold text-slate-900 leading-tight mb-1 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-slate-500 text-xs md:text-sm line-clamp-1 md:line-clamp-3 mb-0 md:mb-4">
                      {post.excerpt}
                    </p>

                    <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-900 mt-auto">
                      Read More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex md:hidden items-center pr-4 text-slate-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
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
      </main>

      <footer className="py-12 border-t border-slate-100 text-center bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 mb-6 opacity-20">
            <MapPin className="w-6 h-6" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-slate-500 text-sm mb-2">
            A HikinHigh Travels Private Limited Publication
          </p>
          <Link
            href="http://www.hikinhigh.com"
            className="text-lg font-bold text-blue-600 hover:underline"
          >
            www.hikinhigh.com
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
