"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  Eye,
  ChevronRight,
  Loader,
} from "lucide-react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const CATEGORIES = [
  "Travel Tips",
  "Destination Guide",
  "Travel Stories",
  "How-To",
  "Reviews",
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchBlogs(currentPage, selectedCategory, searchTerm);
      },
      searchTerm ? 400 : 0,
    );
    return () => clearTimeout(timer);
  }, [currentPage, selectedCategory, searchTerm]);

  const fetchBlogs = async (page: number, category: string, search: string) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "9");
      if (category !== "all") params.set("category", category);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Failed");

      setBlogs(data.data ?? []);
      setPagination(data.pagination ?? null);
    } catch (err) {
      console.error("Blog fetch error:", err);
      setError(true);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Travel Insights & Stories
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our collection of travel guides, tips, and inspiring
              stories from around the world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-xl text-slate-600 mb-4">
              Failed to load articles. Please try again.
            </p>
            <button
              onClick={() =>
                fetchBlogs(currentPage, selectedCategory, searchTerm)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-slate-600">
              {searchTerm || selectedCategory !== "all"
                ? "No articles found. Try adjusting your filters."
                : "No articles published yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <>
            {pagination && (
              <p className="text-slate-500 text-sm mb-6">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {blogs.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {pagination.total}
                </span>{" "}
                articles
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-slate-200 flex items-center justify-center">
                          <span className="text-slate-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                        {blog.excerpt}
                      </p>

                      <div className="space-y-3 border-t border-slate-200 pt-4">
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            {blog.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Eye size={14} />
                          {blog.viewCount} views
                        </div>

                        {blog.tags.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                        Read More
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  Previous
                </button>
                <span className="text-slate-600 px-2">
                  Page {currentPage} of {pagination.pages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(pagination.pages, p + 1))
                  }
                  disabled={currentPage === pagination.pages}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
