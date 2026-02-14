"use client";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function AboutUsPreview() {
  return (
    <section className="w-full py-10 md:py-20 px-4 md:px-8 bg-white relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full -ml-32 -mb-32 opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5 md:space-y-6">
            <div>
              <p className="text-blue-600 font-bold italic mb-1 text-sm md:text-base">
                About Us
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Meet HikinHigh Travels
              </h2>
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                Founded in September 2024,{" "}
                <span className="font-semibold">HikinHigh Travels</span> is a
                dynamic adventure startup specializing in curated trekking
                experiences across India.
              </p>

              <p className="text-gray-600 text-xs md:text-base leading-relaxed hidden sm:block">
                Born from a hiking enthusiast's vision, we deliver transparent
                policies and 100% vetted experiences, promoting sustainable
                tourism in the Himalayas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 md:border-b-0 md:border-t md:pt-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-1.5 text-xl md:text-2xl font-bold text-gray-900">
                  <Users size={20} className="text-blue-600 hidden md:block" />{" "}
                  5
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Experts
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start border-x border-gray-100 md:border-none">
                <div className="flex items-center gap-1.5 text-xl md:text-2xl font-bold text-gray-900">
                  <TrendingUp
                    size={20}
                    className="text-green-600 hidden md:block"
                  />
                  ₹15L
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Monthly Ops
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-1.5 text-xl md:text-2xl font-bold text-gray-900">
                  <Shield size={20} className="text-red-600 hidden md:block" />
                  ₹5L
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Insurance
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                "Professional and certified guides",
                "Eco-friendly sustainable practices",
                "100% vetted and verified experiences",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 shrink-0" size={14} />
                  <span className="text-xs md:text-sm text-gray-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all text-sm shadow-md active:scale-95"
              >
                Discover Our Story
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center aspect-square border border-blue-100">
                  <Globe className="text-blue-600 w-12 h-12" />
                </div>
                <div className="bg-purple-50 rounded-2xl p-8 flex items-center justify-center aspect-square border border-purple-100">
                  <Users className="text-purple-600 w-12 h-12" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-green-50 rounded-2xl p-8 flex items-center justify-center aspect-square border border-green-100">
                  <Shield className="text-green-600 w-12 h-12" />
                </div>
                <div className="bg-orange-50 rounded-2xl p-8 flex items-center justify-center aspect-square border border-orange-100">
                  <TrendingUp className="text-orange-600 w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
