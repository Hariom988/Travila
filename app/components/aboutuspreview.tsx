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
    <section className="w-full py-20 px-4 md:px-8 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full -ml-48 -mb-48 opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-blue-600 font-bold italic mb-2">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Meet HikinHigh Travels
              </h2>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in September 2024, HikinHigh Travels Private Limited is a
              dynamic adventure travel startup specializing in curated hiking
              and trekking experiences across India. Operating from Prayagraj
              with a Delhi-registered base, we blend outdoor passion with
              professional service for unforgettable journeys.
            </p>

            <p className="text-gray-600 text-base leading-relaxed">
              Born from a hiking enthusiast's vision, HikinHigh delivers
              transparent policies, fair refunds, and 100% vetted experiences.
              We're committed to empowering adventurers to conquer peaks safely
              while promoting sustainable tourism in the Himalayas and beyond.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Users size={24} className="text-blue-600" />5
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Expert Agents
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <TrendingUp size={24} className="text-green-600" />
                  ₹15L
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Monthly Operations
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Shield size={24} className="text-red-600" />
                  ₹5L
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Insurance Coverage
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="text-green-500 mt-1 shrink-0"
                  size={20}
                />
                <span className="text-gray-700 font-medium">
                  Professional and certified guides
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="text-green-500 mt-1 shrink-0"
                  size={20}
                />
                <span className="text-gray-700 font-medium">
                  Eco-friendly sustainable practices
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="text-green-500 mt-1 shrink-0"
                  size={20}
                />
                <span className="text-gray-700 font-medium">
                  100% vetted and verified experiences
                </span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 mt-6"
            >
              Discover Our Full Story
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-100 rounded-2xl p-8 flex items-center justify-center aspect-square border-2 border-blue-200">
                  <Globe size={48} className="text-blue-600" />
                </div>
                <div className="bg-purple-100 rounded-2xl p-8 flex items-center justify-center aspect-square border-2 border-purple-200">
                  <Users size={48} className="text-purple-600" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-green-100 rounded-2xl p-8 flex items-center justify-center aspect-square border-2 border-green-200">
                  <Shield size={48} className="text-green-600" />
                </div>
                <div className="bg-orange-100 rounded-2xl p-8 flex items-center justify-center aspect-square border-2 border-orange-200">
                  <TrendingUp size={48} className="text-orange-600" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
