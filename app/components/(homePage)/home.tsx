"use client";
import SearchBar from "@/app/components/searchBar";
import HeroImage from "@/public/assets/hero-image.webp";
import TravelSection from "./travelSection";
import TourPackages from "./tourPackageCard";
import DiscoverSection from "./discoverSection";
import ExploreSection from "./exploreSection";
import LocationSection from "./locationSection";
import WhatsAppButton from "./whatsAppButton";
import { useRouter } from "next/navigation";
import { SignUpPromoBanner } from "./signupPromoBanner";
import Image from "next/image";
import TestimonialsSection from "./testimonialssection";
import AboutUsPreview from "./aboutuspreview";
import {
  Mountain,
  Shield,
  Clock,
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  MapPin,
  Leaf,
  Award,
  HeartHandshake,
  Compass,
  Phone,
  Instagram,
  Youtube,
  Camera,
  Zap,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

function WhyHikinHighSection() {
  const features = [
    {
      icon: Shield,
      title: "Safety-First Approach",
      desc: "Certified guides, ₹5L insurance cover, satellite comms, and zero-incident record across all our treks.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Leaf,
      title: "Sustainable Adventure",
      desc: "Leave-no-trace principles, local guide employment, and eco-certified routes to protect the mountains we love.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: HeartHandshake,
      title: "Community Impact",
      desc: "Every booking supports local Himalayan communities — from porters to homestay families and village schools.",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      icon: Award,
      title: "Expert-Curated Routes",
      desc: "50+ handpicked trails across Uttarakhand, Himachal & beyond — each tested and refined by our senior guides.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      desc: "Weekend getaways to extended expeditions — we fit the mountains into your schedule, not the other way around.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Users,
      title: "Small Group Experience",
      desc: "Intimate groups of 8–15 people ensure personalised attention, better logistics, and a stronger community vibe.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-blue-600 font-bold italic text-sm mb-1">
            Why Adventurers Choose Us
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
            The HikinHigh Difference
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            We don't just book treks — we craft transformative mountain
            experiences that stay with you forever.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group flex gap-4 p-5 md:p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all bg-white"
            >
              <div
                className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center shrink-0  transition-transform`}
              >
                <f.icon size={22} className={f.color} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  const stats = [
    { value: "500+", label: "Happy Trekkers" },
    { value: "50+", label: "Curated Routes" },
    { value: "4.9★", label: "Avg Rating" },
    { value: "0", label: "Safety Incidents" },
    { value: "₹5L", label: "Insurance Cover" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section className="bg-slate-900 py-8 md:py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 text-center text-white">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className="text-xl md:text-3xl font-extrabold text-blue-400">
                {s.value}
              </p>
              <p className="text-slate-400 text-[10px] md:text-xs font-medium mt-0.5 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function TrekCategories() {
  const categories = [
    {
      name: "Winter Treks",
      desc: "Snow-laden trails through frozen landscapes.",
      img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=350&fit=crop",
      count: "12 Routes",
    },
    {
      name: "Himalayan Classics",
      desc: "Iconic high-altitude adventures for the seasoned trekker.",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=350&fit=crop",
      count: "18 Routes",
    },
    {
      name: "Beginner Trails",
      desc: "Perfect for first-timers — safe, scenic, and memorable.",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop",
      count: "10 Routes",
    },
    {
      name: "Weekend Escapes",
      desc: "2–3 day treks for the busy professional who needs a reset.",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=350&fit=crop",
      count: "15 Routes",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 md:mb-10">
          <div>
            <p className="text-blue-600 font-bold italic text-sm mb-1">
              Find Your Trail
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm hover:underline"
          >
            All Treks <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-48 md:h-64"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover  transition-transform duration-500"
              />

              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                  {cat.count}
                </span>
                <h3 className="text-white font-extrabold text-sm md:text-lg leading-tight mb-0.5">
                  {cat.name}
                </h3>
                <p className="text-white/70 text-[10px] md:text-xs leading-tight hidden md:block">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Choose Your Trek",
      desc: "Browse 50+ handpicked routes filtered by difficulty, duration, and budget. Not sure? Our team will suggest the perfect match.",
    },
    {
      num: "02",
      icon: CheckCircle,
      title: "Book & Prepare",
      desc: "Easy online booking, instant confirmation, and a complete pre-trek kit with packing lists, fitness guides, and itinerary details.",
    },
    {
      num: "03",
      icon: Mountain,
      title: "Trek with Confidence",
      desc: "Arrive at base camp and leave the rest to us. Expert guides, all logistics handled, meals included — just you and the mountains.",
    },
    {
      num: "04",
      icon: Camera,
      title: "Cherish the Memories",
      desc: "Return with stunning photos, new friendships, and a sense of achievement that lasts a lifetime. And then book your next one!",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-blue-600 font-bold italic text-sm mb-1">
            Simple Process
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2">
            How It Works
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
            From dreaming to doing — we've made trekking your Himalayan dream as
            easy as four steps.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative cursor-pointer bg-slate-50 rounded-2xl p-5 md:p-7 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors">
                  {step.num}
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                  <step.icon size={18} className="text-white" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                {step.desc}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 z-10">
                  <ArrowRight size={18} className="text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreviewSection() {
  const posts = [
    {
      title: "10 Essential Items Every First-Time Himalayan Trekker Must Carry",
      excerpt:
        "From the right layering system to trekking poles — here's the definitive packing list that our guides swear by.",
      category: "Gear Guide",
      img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
      readTime: "5 min read",
      catColor: "bg-blue-100 text-blue-700",
    },
    {
      title: "Kedarkantha in Winter: A Complete 2025 Trekker's Guide",
      excerpt:
        "Blankets of snow, frozen campsites, and sunrise views that will leave you speechless. Here's everything you need to know.",
      category: "Trek Guide",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      readTime: "8 min read",
      catColor: "bg-emerald-100 text-emerald-700",
    },
    {
      title:
        "How to Build Trek Fitness in 8 Weeks: A Training Plan for Beginners",
      excerpt:
        "You don't need to be an athlete to trek the Himalayas. Follow this science-backed plan and you'll be ready in two months.",
      category: "Fitness",
      img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=500&h=300&fit=crop",
      readTime: "6 min read",
      catColor: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 md:mb-10">
          <div>
            <p className="text-blue-600 font-bold italic text-sm mb-1">
              Knowledge Base
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              From the HikinHigh Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm hover:underline"
          >
            All Articles <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover  transition-transform duration-500"
                />
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${post.catColor}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProofStrip() {
  const reviews = [
    {
      name: "Amit S.",
      loc: "Delhi",
      stars: 5,
      text: "HikinHigh made my first Himalayan trek stress-free and magical. The team was incredible!",
    },
    {
      name: "Megha R.",
      loc: "Bangalore",
      stars: 5,
      text: "Best money spent in 2024. The guides were knowledgeable, funny, and kept us safe the entire time.",
    },
    {
      name: "Tom K.",
      loc: "London, UK",
      stars: 5,
      text: "Roopkund Trek with HikinHigh was the highlight of my India trip. Flawlessly organised.",
    },
    {
      name: "Sneha P.",
      loc: "Mumbai",
      stars: 5,
      text: "Solo female traveller here — felt completely safe and part of the family from day one.",
    },
  ];

  return (
    <section className="py-10 md:py-14 px-4 bg-blue-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-blue-200 font-bold italic text-sm mb-1">
            Real Reviews
          </p>
          <h2 className="text-xl md:text-3xl font-extrabold text-white">
            What Our Trekkers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-2xl p-4 md:p-5 backdrop-blur-sm"
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star
                    key={s}
                    size={12}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-white/90 text-xs md:text-sm leading-relaxed mb-3 italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-white font-bold text-xs">{r.name}</p>
                  <p className="text-blue-200 text-[10px]">{r.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=500&fit=crop"
              alt="Mountains"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 p-8 md:p-14 text-center text-white">
            <p className="text-blue-400 font-bold italic text-sm mb-2 uppercase tracking-widest">
              Limited Spots Per Batch
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">
              Your Himalayan Adventure
              <br className="hidden md:block" /> Starts Here
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base mb-7">
              Don't wait for the "perfect time" — join hundreds of trekkers
              who've already taken the first step. The mountains are calling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Browse All Treks <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+918130069469"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm border border-white/20"
              >
                <Phone size={16} /> Talk to an Expert
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-6">
              ✓ Free cancellation up to 30 days · ✓ Instant confirmation · ✓ No
              hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLinks() {
  return (
    <section className="py-8 md:py-10 px-4 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-blue-600 font-bold italic text-sm mb-1">
            Follow Our Adventures
          </p>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
            @HikinHighTravels
          </h3>
          <p className="text-slate-500 text-xs md:text-sm">
            Stunning mountain content, packing tips & trek updates daily
          </p>
        </div>
        <div className="flex gap-3">
          {[
            {
              icon: Instagram,
              label: "Instagram",
              color:
                "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100",
            },
            {
              icon: Youtube,
              label: "YouTube",
              color: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100",
            },
            {
              icon: Camera,
              label: "Stories",
              color:
                "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
            },
          ].map((s, i) => (
            <a
              key={i}
              href="#"
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border transition-all ${s.color}`}
            >
              <s.icon size={20} />
              <span className="text-[10px] font-bold">{s.label}</span>
            </a>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=150&h=150&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150&h=150&fit=crop",
          ].map((img, i) => (
            <div
              key={i}
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-white shadow-sm"
            >
              <img
                src={img}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const router = useRouter();

  const handleSearch = (params: {
    searchQuery: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
  }) => {
    router.push(
      `/hotel?search=${params.searchQuery}&checkIn=${params.checkIn}&checkOut=${params.checkOut}&rooms=${params.rooms}&adults=${params.adults}`,
    );
  };

  return (
    <>
      <SignUpPromoBanner />
      <WhatsAppButton phoneNumber="918130069469" />
      <main className="w-full flex flex-col">
        <section className="relative min-h-screen flex flex-col">
          <div className="absolute inset-0 z-0">
            <Image
              src={HeroImage}
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center grow w-full px-4 pt-28 pb-10 md:pt-20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center md:max-w-5xl max-w-4xl leading-[1.1] mb-8 md:mb-12 drop-shadow-2xl">
              Where Every Journey Becomes An Adventure
            </h1>
            <div className="w-full flex justify-center">
              <SearchBar onSearch={handleSearch} instantSearch={false} />
            </div>
          </div>
        </section>

        <TravelSection />
        <StatsBanner />
        <TourPackages />
        <TrekCategories />
        <WhyHikinHighSection />
        <HowItWorks />
        <AboutUsPreview />
        <TestimonialsSection />
        <SocialProofStrip />
        <BlogPreviewSection />
        <CTASection />
        <ExploreSection />
        <LocationSection />
        <DiscoverSection />
        <SocialLinks />
      </main>
    </>
  );
}
