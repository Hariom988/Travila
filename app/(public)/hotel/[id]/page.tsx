import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Wifi,
  Waves,
  Coffee,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getHotelData(id: string) {
  try {
    // Direct database call instead of HTTP fetch
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        pricePerNight: true,
        available: true,
        facilities: true,
        images: true,
        createdAt: true,
      },
    });

    if (!hotel) return null;

    // Convert Decimal to string for serialization
    return {
      ...hotel,
      pricePerNight: hotel.pricePerNight.toString(),
    };
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return null;
  }
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelData(id);

  if (!hotel) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Sticky Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/hotel"
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold uppercase tracking-tight">
              Explore Hotels
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Property ID:
            </span>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {id.slice(0, 8)}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side: Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Badge Section */}
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-tighter flex items-center gap-1">
                  <Sparkles size={10} /> Rare Find
                </span>
                {hotel.available && (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-tighter flex items-center gap-1">
                    <CheckCircle2 size={10} /> Instant Booking
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                <span className="text-sm font-semibold tracking-wide capitalize underline decoration-blue-200 underline-offset-4">
                  {hotel.location}
                </span>
              </div>
            </section>

            {/* Main Image Gallery */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group">
              <Image
                src={hotel.images?.[0] || "/placeholder-hotel.jpg"}
                alt={hotel.name}
                fill
                className="object-cover transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Description Section */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-600" /> About Property
              </h2>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                {hotel.description}
              </p>
            </section>

            {/* Facilities Section */}
            <section className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Premium Facilities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hotel.facilities?.map((facility: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col items-center gap-3 text-center hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {getIcon(facility)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                      {facility}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: Booking Card (4 Columns) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-slate-200 p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
              <div className="flex justify-between items-baseline mb-8">
                <div>
                  <span className="text-4xl font-black text-slate-900">
                    ₹{hotel.pricePerNight}
                  </span>
                  <span className="text-slate-400 font-bold text-sm tracking-tighter">
                    {" "}
                    / night
                  </span>
                </div>
                <div className="flex items-center gap-1 text-orange-500 font-black text-sm">
                  <Star size={16} className="fill-orange-500" />
                  <span>4.9</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:bg-white hover:border-blue-200 transition-all">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Dates
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    Select Dates
                  </span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:bg-white hover:border-blue-200 transition-all">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Guests
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    2 Adults, 1 Room
                  </span>
                </button>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3">
                Reserve Property
              </button>

              <div className="mt-8 pt-8 border-t border-dashed border-slate-200 space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span className="text-xs font-bold leading-tight">
                    Secure Payment & Best Price Policy
                  </span>
                </div>
                <p className="text-[10px] text-center text-slate-400 font-medium">
                  Free cancellation up to 48 hours before check-in
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function getIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("wifi")) return <Wifi size={20} />;
  if (n.includes("pool") || n.includes("beach")) return <Waves size={20} />;
  if (n.includes("spa")) return <Sparkles size={20} />;
  return <Coffee size={20} />;
}
