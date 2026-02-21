"use client";
import {
  MapPin,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  Calendar,
  Globe,
  Mountain,
  Heart,
  Award,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Leaf,
  Target,
  Compass,
  Camera,
  Zap,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const stats = [
  {
    icon: Users,
    value: "5",
    label: "Expert Agents",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    value: "₹15L",
    label: "Monthly Operations",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    value: "₹5L",
    label: "Insurance Coverage",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Mountain,
    value: "50+",
    label: "Trek Routes",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const values = [
  {
    icon: Leaf,
    title: "Eco-Friendly Approach",
    desc: "We are committed to sustainable tourism, ensuring that every trek we lead leaves the mountains as pristine as we found them. From waste management to responsible camping, we lead by example.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Shield,
    title: "Safety First, Always",
    desc: "All our guides are certified in first aid and wilderness rescue. We carry complete emergency gear, maintain satellite communication, and conduct thorough risk assessments before every expedition.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Heart,
    title: "Community-Driven",
    desc: "We actively support local communities along our trekking routes by hiring local porters and guides, sourcing food locally, and contributing to village development programs.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Target,
    title: "Personalised Experiences",
    desc: "We believe one size never fits all. Every group gets a customised itinerary based on fitness level, interests, and aspirations. Your perfect trek is our mission.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const treks = [
  {
    name: "Roopkund Trek",
    region: "Uttarakhand",
    difficulty: "Challenging",
    duration: "8 Days",
    altitude: "5,029m",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    badge: "Most Popular",
    badgeColor: "bg-blue-600",
  },
  {
    name: "Kedarkantha Trek",
    region: "Uttarakhand",
    difficulty: "Easy-Moderate",
    duration: "6 Days",
    altitude: "3,800m",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    badge: "Beginner Friendly",
    badgeColor: "bg-emerald-600",
  },
  {
    name: "Chopta Trek",
    region: "Himachal Pradesh",
    difficulty: "Moderate",
    duration: "5 Days",
    altitude: "4,100m",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    badge: "Scenic Route",
    badgeColor: "bg-purple-600",
  },
];

const faqs = [
  {
    q: "Do I need prior trekking experience to join HikinHigh?",
    a: "Not at all! We offer treks for all experience levels — from beginner-friendly trails in Uttarakhand to challenging high-altitude expeditions. Our team will guide you through fitness preparation and gear requirements before you start.",
  },
  {
    q: "What is included in a HikinHigh trek package?",
    a: "Our packages include certified guides, accommodation along the route (tents or guesthouses), all meals during the trek, first aid and emergency support, permits, and pre-trek briefing sessions. Flights/trains to the base camp are separate.",
  },
  {
    q: "Is travel insurance mandatory?",
    a: "We strongly recommend comprehensive travel and medical insurance. We provide ₹5 Lakh coverage per participant through our group insurance, but personal insurance covering high-altitude evacuation is advisable for added peace of mind.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made 30+ days in advance receive a full refund. 15–30 days in advance receive a 70% refund. Within 15 days, we offer a credit note valid for 12 months. No-shows are non-refundable.",
  },
  {
    q: "Can HikinHigh organise corporate team-building treks?",
    a: "Absolutely! We have specialised corporate packages designed to build team spirit, communication, and resilience. These include custom routes, team activities, and debrief sessions. Contact us for tailored proposals.",
  },
];

const team = [
  {
    name: "Arjun Mehta",
    role: "Head Guide & Co-Founder",
    exp: "12 years in Himalayan trekking",
    cert: "Wilderness First Responder",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Priya Nair",
    role: "Operations Lead",
    exp: "8 years in adventure tourism",
    cert: "IATA Certified Travel Professional",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
  {
    name: "Vikram Singh",
    role: "Safety & Equipment Expert",
    exp: "10 years mountaineering",
    cert: "UIAA Mountain Guide",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
  },
];

const timeline = [
  {
    year: "Sep 2024",
    title: "HikinHigh Founded",
    desc: "Registered in Delhi with a vision to democratise Himalayan trekking for every Indian.",
  },
  {
    year: "Nov 2024",
    title: "First Group Trek",
    desc: "Successfully led our inaugural Kedarkantha winter trek with 12 participants.",
  },
  {
    year: "Jan 2025",
    title: "Insurance Partnership",
    desc: "Signed ₹5 Lakh group insurance coverage for all participants, raising safety standards.",
  },
  {
    year: "Mar 2025",
    title: "Corporate Packages Launched",
    desc: "Partnered with 5 companies for team-building treks in Uttarakhand.",
  },
  {
    year: "2025",
    title: "Growing Strong",
    desc: "Expanding to 50+ curated routes across India with a passionate growing team.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${open ? "border-blue-200 bg-blue-50/40" : "border-slate-200 bg-white"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 cursor-pointer"
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-blue-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-blue-100">
          <p className="pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=700&fit=crop"
            alt="Himalayas"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-blue-600/80 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Est. September 2024 · Delhi, India
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              HikinHigh Travels
              <span className="block text-blue-400">Private Limited</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              We are a passionate team of adventure specialists on a mission to
              make the Himalayas accessible, safe, and unforgettable for every
              explorer — from first-time hikers to seasoned mountaineers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="http://www.hikinhigh.com"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm"
              >
                Explore Treks <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+918130069469"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm border border-white/20"
              >
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center md:items-start gap-2 p-4 rounded-2xl ${s.bg} border border-transparent`}
              >
                <div className={`p-2 rounded-xl bg-white shadow-sm`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <p className={`text-2xl md:text-3xl font-extrabold ${s.color}`}>
                  {s.value}
                </p>
                <p className="text-xs md:text-sm text-slate-500 font-medium text-center md:text-left">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-blue-600 font-bold italic text-sm mb-2">
                Our Story
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                Born from a Passion for
                <br className="hidden md:block" /> the Mountains
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
                HikinHigh Travels was founded in September 2024 by a group of
                Himalayan trekking enthusiasts who believed that the mountains
                should be experienced by everyone — not just elite adventurers.
                Operating from Najafgarh with a Delhi-registered base, we
                combine outdoor passion with professional, transparent, and
                safety-first service.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
                What started as weekend group treks among friends quickly grew
                into a full-fledged adventure travel startup. Within our first
                year, we have led hundreds of trekkers across routes in
                Uttarakhand, Himachal Pradesh, and beyond — each journey
                meticulously planned and guided.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Transparent pricing with no hidden charges",
                  "100% vetted, locally-experienced guides",
                  "Fair cancellation and refund policies",
                  "Dedicated pre-trek support and briefing",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      className="text-emerald-500 shrink-0"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop"
                alt="Trekking"
                className="rounded-2xl object-cover w-full h-44 md:h-64 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"
                alt="Mountains"
                className="rounded-2xl object-cover w-full h-44 md:h-64 shadow-md mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop"
                alt="Peaks"
                className="rounded-2xl object-cover w-full h-36 md:h-48 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400&h=300&fit=crop"
                alt="Team"
                className="rounded-2xl object-cover w-full h-36 md:h-48 shadow-md mt-3"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-blue-600 font-bold italic text-sm mb-2">
              Why We Exist
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3">
              Our Mission & Core Values
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
              Everything we do is driven by four pillars that define the
              HikinHigh experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className={`p-5 md:p-7 rounded-2xl border ${v.border} ${v.bg} group hover:shadow-md transition-all`}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4`}
                >
                  <v.icon size={22} className={v.color} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-blue-600 font-bold italic text-sm mb-1">
                Explore Routes
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Our Signature Treks
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:underline"
            >
              View All Treks <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {treks.map((t, i) => (
              <div
                key={i}
                className="bg-white cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group"
              >
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full cursor-pointer object-cover  transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 ${t.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}
                  >
                    {t.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1 text-base">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin size={10} /> {t.region}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: t.difficulty,
                        color: "bg-slate-100 text-slate-600",
                      },
                      { label: t.duration, color: "bg-blue-50 text-blue-700" },
                      {
                        label: `↑ ${t.altitude}`,
                        color: "bg-orange-50 text-orange-700",
                      },
                    ].map((tag, ti) => (
                      <span
                        key={ti}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-blue-600 font-bold italic text-sm mb-2">
              Our Services
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3">
              Everything We Offer
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
              From beginner trails to corporate expeditions — we curate every
              detail so you just show up and enjoy.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Mountain,
                title: "Himalayan Classic Treks",
                desc: "Roopkund, Everest Base Camp prep, Valley of Flowers — expertly guided with full safety support.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Compass,
                title: "Beginner Trails",
                desc: "Friendly trails in Uttarakhand and Himachal designed for first-timers with zero prior experience.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                icon: Users,
                title: "Corporate Team Treks",
                desc: "Custom team-building expeditions to foster leadership, trust, and communication in the wild.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: Camera,
                title: "Photography Treks",
                desc: "Specially paced itineraries for photographers and content creators wanting the best Himalayan shots.",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                icon: Globe,
                title: "Weekend Getaways",
                desc: "Short 2–3 day treks from Delhi/Mumbai for those who can't take long leaves but need a break.",
                color: "text-rose-600",
                bg: "bg-rose-50",
              },
              {
                icon: Zap,
                title: "Custom Private Tours",
                desc: "Fully personalised itineraries for families, couples, and solo travellers — your pace, your route.",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all bg-white"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}
                >
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-blue-600 font-bold italic text-sm mb-2">
              Our Journey
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              Milestones So Far
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-blue-100 md:-translate-x-px" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow md:-translate-x-1.5 top-1.5" />
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}
                  >
                    <span className="inline-block text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest mb-1">
                      {item.year}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center">
            <div className="md:col-span-2">
              <p className="text-blue-200 font-semibold text-sm mb-2 uppercase tracking-widest">
                Trusted & Certified
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
                Your Safety is Our
                <br className="hidden md:block" /> Top Priority
              </h2>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                All our guides hold internationally recognised certifications.
                We carry complete emergency kits, satellite phones, and maintain
                end-to-end communication protocols on every trek.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: Award, label: "UIAA Certified Guides" },
                  { icon: Shield, label: "₹5L Group Insurance" },
                  { icon: Phone, label: "24/7 Emergency Line" },
                  { icon: CheckCircle, label: "First Aid Trained" },
                  { icon: Leaf, label: "Eco-Certified Routes" },
                  { icon: Star, label: "4.9★ Avg Rating" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/20"
                  >
                    <item.icon size={14} className="text-blue-200 shrink-0" />
                    <span className="text-xs font-semibold text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                <p className="text-3xl md:text-4xl font-black">500+</p>
                <p className="text-blue-200 text-sm font-medium mt-1">
                  Happy Trekkers & Counting
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                <p className="text-3xl md:text-4xl font-black">0</p>
                <p className="text-blue-200 text-sm font-medium mt-1">
                  Safety Incidents to Date
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-blue-600 font-bold italic text-sm mb-2">
              Got Questions?
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-blue-600 font-bold italic text-sm mb-2">
                Get in Touch
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                Ready to Plan Your
                <br /> Next Adventure?
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                Whether you have a question about our packages, want a custom
                itinerary, or just want to know more — our team is here for you.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: Phone,
                    label: "+91 81300 69469",
                    href: "tel:+918130069469",
                  },
                  {
                    icon: Mail,
                    label: "booking@hikinhigh.com",
                    href: "mailto:booking@hikinhigh.com",
                  },
                  {
                    icon: Clock,
                    label: "Mon–Sat, 9:00 AM – 7:00 PM IST",
                    href: "#",
                  },
                  {
                    icon: MapPin,
                    label: "Najafgarh, India · Registered in Delhi",
                    href: "#",
                  },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <c.icon size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-7 md:p-10 text-white">
              <h3 className="font-extrabold text-xl md:text-2xl mb-2">
                Book a Free Consultation
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Tell us about your dream trek and we'll craft a personalised
                plan for you.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                />
                <textarea
                  rows={3}
                  placeholder="Tell us about your dream trek..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <Link
              href="http://www.hikinhigh.com"
              className="text-lg font-extrabold text-blue-600 hover:underline"
            >
              www.hikinhigh.com
            </Link>
            <p className="text-xs text-slate-400 mt-0.5">
              HikinHigh Travels Private Limited · Delhi, India
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Calendar size={13} />
            <span>Last updated: February 7, 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
