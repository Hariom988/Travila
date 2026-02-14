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
import Image from "next/image";

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "all",
    "Travel Tips",
    "Destination Guide",
    "Travel Stories",
    "How-To",
    "Reviews",
  ];

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, selectedCategory, currentPage]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "9",
      });

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/blogs?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-linear-to-br from-slate-50 to-slate-100 py-16 md:py-24">
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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-slate-600">
              No articles found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      {blog.featuredImage ? (
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-blue-200 to-slate-200 flex items-center justify-center">
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

                      <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm hover:gap-1.5 transition-all">
                        Read More
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 disabled:opacity-50 hover:bg-slate-50"
              >
                Previous
              </button>
              <span className="text-slate-600">Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
