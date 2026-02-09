"use client";
import {
  MapPin,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  Calendar,
  Globe,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            HikinHigh Travels Private Limited
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 max-w-4xl">
            HikinHigh Travels Private Limited is a dynamic adventure travel
            startup founded in September 2024, specializing in curated hiking
            and trekking experiences across India. Operating from Prayagraj with
            a Delhi-registered base, we blend outdoor passion with professional
            service for unforgettable journeys.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <Users className="w-8 h-8 text-slate-900 mb-4" />
              <div className="text-2xl font-bold text-slate-900">5 Agents</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">
                Lean Team
              </div>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <TrendingUp className="w-8 h-8 text-slate-900 mb-4" />
              <div className="text-2xl font-bold text-slate-900">₹15 Lakh</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">
                Monthly Operations
              </div>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <Shield className="w-8 h-8 text-slate-900 mb-4" />
              <div className="text-2xl font-bold text-slate-900">₹5 Lakhs</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">
                Insurance Coverage
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900">
              <Globe className="w-6 h-6" /> Our Mission
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Empowering adventurers to conquer peaks safely while promoting
              sustainable tourism in the Himalayas and beyond. We prioritize
              certified guides, eco-friendly practices, and customer safety.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900">
              <CheckCircle className="w-6 h-6" /> Our Commitment
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Born from a hiking enthusiast’s vision, HikinHigh delivers
              transparent policies, fair refunds, and 100% vetted experiences.
              Active since 2024, we’re growing responsibly while maintaining
              Delhi roots.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 text-center">
            What We Offer
          </h2>
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <p className="text-slate-700 mb-6 font-medium">
              Premium group/private treks, weekend getaways, and customized
              adventure packages complete with gear, insurance, and expert
              support.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Himalayan Classics
                </h3>
                <p className="text-sm text-slate-600">
                  Roopkund, Everest Base Camp prep
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Beginner Trails
                </h3>
                <p className="text-sm text-slate-600">
                  Friendly trails in Uttarakhand, Himachal
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Corporate
                </h3>
                <p className="text-sm text-slate-600">
                  Corporate team-building hikes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
            Join thousands reaching new heights.
          </h2>
          <Link
            href="http://www.hikinhigh.com"
            className="text-xl font-bold text-blue-600 hover:underline"
          >
            www.hikinhigh.com
          </Link>
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last updated: February 7, 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
