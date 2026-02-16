"use client";
import { useState } from "react";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "10 Essential Items for Your First Himalayan Trek",
    excerpt:
      "Packing for the Himalayas can be daunting. From moisture-wicking layers to the right pair of boots, here is our expert gear list.",
    category: "Trekking Tips",
    date: "Feb 12, 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Safety First: How We Ensure High-Altitude Security",
    excerpt:
      "At HikinHigh, your safety is our ₹5 Lakh insurance-backed priority. Learn about our certified guides and protocols.",
    category: "Safety",
    date: "Feb 10, 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Roopkund: The Mystery Lake",
    excerpt:
      "Explore the legend of the skeleton lake. This guide covers the best time to visit and difficulty levels for 2026.",
    category: "Guides",
    date: "Feb 05, 2026",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1601425246588-3188f46081e2?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Sustainable Tourism: Protecting the Himalayas",
    excerpt:
      "Discover how HikinHigh promotes eco-friendly practices and minimizes carbon footprints on every trek.",
    category: "Eco",
    date: "Jan 28, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600",
  },
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Trekking Tips", "Guides", "Safety", "Eco"];

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <section className="py-12 px-4 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Adventure Journal
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm md:text-base">
            Expert trekking advice, safety protocols, and stories from the field
            by
            <span className="font-semibold text-slate-900">
              {" "}
              HikinHigh Travels.
            </span>
          </p>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-row md:flex-col bg-white border border-slate-100 md:border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-24 w-24 shrink-0 md:h-48 md:w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full  transition-transform duration-500"
                />
              </div>

              <div className="p-3 md:p-6 flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 md:mb-3">
                  {post.category}
                  <span className="text-slate-300 md:inline hidden">•</span>
                  <span className="text-slate-400 md:flex hidden items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" /> {post.readTime} read
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

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No articles found in this category.
          </div>
        )}
      </main>

      <footer className=" py-12 border-t border-slate-100 text-center bg-slate-50">
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
