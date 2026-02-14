import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Info,
  Sparkles,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import BookingCard from "@/app/components/bookingCard";
import ImageGallery from "@/app/components/imageGallery"; // ← IMPORT HERE

interface PageProps {
  params: Promise<{ id: string }>;
}
const formatDescription = (text: string) => {
  if (!text) return null;

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  return (
    <div className="space-y-3">
      {lines.map((line, index) => (
        <div key={index} className="flex gap-3">
          <div className="shrink-0 w-2 h-2 rounded-full bg-purple-600 mt-2" />

          <p className="text-slate-600 leading-relaxed">{line}</p>
        </div>
      ))}
    </div>
  );
};
async function getActivityData(id: string) {
  try {
    const activity = await prisma.activity.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        pricePerPerson: true,
        duration: true,
        images: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!activity) return null;

    return {
      ...activity,
      pricePerPerson: activity.pricePerPerson.toString(),
    };
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const activity = await getActivityData(id);

  if (!activity) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/activities"
            className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-all group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold uppercase tracking-tight">
              Explore Activities
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Activity ID:
            </span>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {id.slice(0, 8)}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-tighter flex items-center gap-1">
                  <Sparkles size={10} /> Popular Activity
                </span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-tighter flex items-center gap-1">
                  <CheckCircle2 size={10} /> Instant Booking
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {activity.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={18} className="text-purple-600 shrink-0" />
                <span className="text-sm font-semibold tracking-wide capitalize underline decoration-purple-200 underline-offset-4">
                  {activity.location}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 pt-2">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-purple-600" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-purple-600" />
                  <span>Professional Guides</span>
                </div>
              </div>
            </section>

            <ImageGallery
              images={activity.images || []}
              title={activity.name}
              featured={true}
            />
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Info size={20} className="text-purple-600" /> About Activity
              </h2>
              <div className="text-base md:text-lg font-medium">
                {activity.description ? (
                  formatDescription(activity.description)
                ) : (
                  <p className="text-slate-600">No description available</p>
                )}
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-purple-600" /> What's
                Included
              </h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Professional and experienced guides</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                  <span>All necessary safety equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Insurance coverage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Refreshments and snacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-500 shrink-0 mt-0.5"
                  />
                  <span>Professional photos (on request)</span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100">
                  <h4 className="font-bold text-slate-900 mb-2">
                    Expert Guides
                  </h4>
                  <p className="text-sm text-slate-600">
                    Knowledgeable and friendly professionals
                  </p>
                </div>
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-slate-900 mb-2">
                    Safety First
                  </h4>
                  <p className="text-sm text-slate-600">
                    Top-notch equipment and protocols
                  </p>
                </div>
                <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-slate-900 mb-2">
                    Small Groups
                  </h4>
                  <p className="text-sm text-slate-600">
                    Maximum 15 people for personalized experience
                  </p>
                </div>
                <div className="bg-linear-to-br from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-slate-900 mb-2">
                    Flexible Timing
                  </h4>
                  <p className="text-sm text-slate-600">
                    Multiple sessions throughout the day
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <BookingCard
              type="activity"
              activityId={activity.id}
              activityName={activity.name}
              activityPrice={activity.pricePerPerson}
              activityDuration={activity.duration}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
