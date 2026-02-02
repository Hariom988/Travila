"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Users,
  Award,
  MapPin,
  Heart,
  Shield,
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
  Quote,
} from "lucide-react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const stats = [
    { icon: Globe, label: "Countries Covered", value: "150+" },
    { icon: Users, label: "Happy Travelers", value: "500K+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: MapPin, label: "Destinations", value: "2000+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description:
        "We believe travel transforms lives. Every journey we craft is infused with our love for exploration and discovery.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your safety is paramount. We partner only with verified hotels and maintain strict quality standards.",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "Cutting-edge technology meets timeless hospitality. We constantly evolve to serve you better.",
    },
    {
      icon: Target,
      title: "Customer Focus",
      description:
        "You're at the heart of everything we do. Your dream vacation is our mission to deliver.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "20+ years in hospitality industry",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Expert in customer experience",
    },
    {
      name: "Amit Patel",
      role: "Technology Lead",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "Building the future of travel tech",
    },
    {
      name: "Sneha Reddy",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Connecting travelers worldwide",
    },
  ];

  const milestones = [
    { year: "2018", event: "Travila Founded in Delhi" },
    { year: "2019", event: "Reached 10,000 Customers" },
    { year: "2021", event: "Expanded to 50+ Countries" },
    { year: "2023", event: "Won Best Travel Platform Award" },
    { year: "2025", event: "500K+ Happy Travelers" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-linear(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCAzLjk5LTRDNDIuMiAzMCA0NCAzMS43OSA0NCAzNGMwIDIuMjEtMS44IDQtNC4wMSA0LTIuMiAwLTMuOTktMS43OS0zLjk5LTR6bTAgMjBjMC0yLjIxIDEuNzktNCAzLjk5LTRDNDIuMiA1MCA0NCA1MS43OSA0NCA1NGMwIDIuMjEtMS44IDQtNC4wMSA0LTIuMiAwLTMuOTktMS43OS0zLjk5LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgMy45OS00QzI2LjIgMzAgMjggMzEuNzkgMjggMzRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00em0wIDIwYzAtMi4yMSAxLjc5LTQgMy45OS00QzI2LjIgNTAgMjggNTEuNzkgMjggNTRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00ek00IDM0YzAtMi4yMSAxLjc5LTQgMy45OS00QzEwLjIgMzAgMTIgMzEuNzkgMTIgMzRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00em0wIDIwYzAtMi4yMSAxLjc5LTQgMy45OS00QzEwLjIgNTAgMTIgNTEuNzkgMTIgNTRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00ek01MiAzNGMwLTIuMjEgMS43OS00IDMuOTktNEM1OC4yIDMwIDYwIDMxLjc5IDYwIDM0YzAgMi4yMS0xLjggNC00LjAxIDQtMi4yIDAtMy45OS0xLjc5LTMuOTktNHptMCAyMGMwLTIuMjEgMS43OS00IDMuOTktNEM1OC4yIDUwIDYwIDUxLjc5IDYwIDU0YzAgMi4yMS0xLjggNC00LjAxIDQtMi4yIDAtMy45OS0xLjc5LTMuOTktNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-xs sm:text-sm font-medium text-purple-300">
              Est. 2018
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-purple-600">
              We Make Travel
            </span>
            <br />
            <span className="text-white">Dreams Come True</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-12 px-4 leading-relaxed">
            Since 2018, we've been crafting unforgettable journeys for travelers
            worldwide. Our passion is turning your wanderlust into reality.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:bg-slate-800/70 transition-all group"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mb-8 sm:mb-12 justify-center">
            {["mission", "vision", "values"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-25 sm:min-w-0 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-12">
            {activeTab === "mission" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Target className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-white">
                      Our Mission
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                      To democratize travel by making extraordinary experiences
                      accessible to everyone. We believe every person deserves
                      to explore the world, create memories, and discover new
                      cultures without barriers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-white">
                      Our Vision
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                      To become the world's most trusted travel companion,
                      connecting millions of travelers to their dream
                      destinations through innovation, personalization, and
                      unwavering commitment to excellence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-8 text-white text-center">
                  What We Stand For
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {values.map((value, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-slate-900/70 transition-all group"
                    >
                      <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white">
                        {value.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-xs sm:text-sm font-medium text-purple-300">
                Meet The Team
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
              The People Behind Travila
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Passionate professionals dedicated to making your travel dreams a
              reality
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:bg-slate-800/50 transition-all hover:scale-105"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover border-4 border-purple-500/30 group-hover:border-purple-500 transition-all"
                  />
                  <div className="absolute inset-0 rounded-full bg-linear-to-tr from-purple-600/20 to-transparent"></div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-purple-400 mb-2 text-center font-medium">
                  {member.role}
                </p>
                <p className="text-[9px] sm:text-xs text-slate-500 text-center leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
              Our Journey
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Key milestones in our story
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-3 sm:gap-6 items-start group">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600 flex items-center justify-center font-black text-xs sm:text-sm text-white group-hover:scale-110 transition-transform">
                    {milestone.year}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-0.5 h-12 sm:h-16 bg-slate-700 mt-2"></div>
                  )}
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-6 flex-1 group-hover:bg-slate-800/50 transition-all">
                  <p className="text-sm sm:text-base text-white font-semibold">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-linear-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center">
            <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg md:text-2xl text-white font-medium mb-4 sm:mb-6 leading-relaxed italic px-2">
              "Travila transformed how we travel. From booking to check-out,
              every detail was perfect. They truly care about creating memorable
              experiences."
            </p>
            <div className="flex items-center justify-center gap-3">
              <Image
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="Customer"
                width={48}
                height={48}
                className="rounded-full border-2 border-purple-500"
              />
              <div className="text-left">
                <p className="font-bold text-white text-sm sm:text-base">
                  Anjali Verma
                </p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Travel Enthusiast
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 sm:mb-8">
            Join thousands of happy travelers and discover your next adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-purple-500/50 hover:scale-105">
              Explore Hotels
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all border border-slate-600">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
