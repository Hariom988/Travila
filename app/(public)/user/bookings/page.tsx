"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Hotel,
  Activity,
  Calendar,
  MapPin,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HotelBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelLocation: string;
  hotelImage: string | null;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
}

interface ActivityBooking {
  id: string;
  activityId: string;
  activityName: string;
  activityLocation: string;
  activityImage: string | null;
  date: string;
  people: number;
  duration: string;
  totalPrice: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
}

type Booking = HotelBooking | ActivityBooking;
type BookingType = "all" | "hotel" | "activity";
type BookingStatus = "all" | "PENDING" | "CONFIRMED" | "CANCELLED";

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<BookingType>("all");
  const [filterStatus, setFilterStatus] = useState<BookingStatus>("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        if (!response.ok) {
          router.push("/user/auth?redirect=/user/bookings");
          return;
        }
        setIsAuthenticated(true);
      } catch {
        router.push("/user/auth?redirect=/user/bookings");
      }
    };

    verifyAuth();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const hotelResponse = await fetch("/api/bookings/hotel");
        const hotelData = hotelResponse.ok ? await hotelResponse.json() : [];

        const activityResponse = await fetch("/api/bookings/activity");
        const activityData = activityResponse.ok
          ? await activityResponse.json()
          : [];

        const allBookings = [...hotelData, ...activityData].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setBookings(allBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  const isHotelBooking = (booking: Booking): booking is HotelBooking => {
    return "hotelId" in booking;
  };

  const filteredBookings = bookings.filter((booking) => {
    let typeMatch = true;
    let statusMatch = true;

    if (filterType !== "all") {
      typeMatch = isHotelBooking(booking)
        ? filterType === "hotel"
        : filterType === "activity";
    }

    if (filterStatus !== "all") {
      statusMatch = booking.status === filterStatus;
    }

    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <AlertCircle size={14} />;
      case "CONFIRMED":
        return <CheckCircle size={14} />;
      case "CANCELLED":
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 pt-20">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600 font-medium text-sm">
                Loading your bookings...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 pb-8">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft size={18} className="text-slate-600" />
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
                My Bookings
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Manage your reservations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 sticky top-14 sm:top-16 z-30">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as BookingType)}
              className="px-2.5 sm:px-3 py-1.5 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Bookings</option>
              <option value="hotel">Hotels</option>
              <option value="activity">Activities</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as BookingStatus)}
              className="px-2.5 sm:px-3 py-1.5 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-600 shrink-0" size={18} />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              {bookings.length === 0 ? "No Bookings Yet" : "No Results Found"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {bookings.length === 0
                ? "Start exploring and book your next adventure!"
                : "Try adjusting your filters"}
            </p>
            {bookings.length === 0 && (
              <Link
                href="/hotel"
                className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Explore Hotels
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => {
              const isHotel = isHotelBooking(booking);
              const nights = isHotel
                ? Math.ceil(
                    (new Date(booking.endDate).getTime() -
                      new Date(booking.startDate).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )
                : null;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="lg:hidden">
                    <div className="p-3">
                      <div className="flex gap-3 mb-3">
                        <div className="shrink-0 w-24 h-24 rounded-lg bg-slate-100 overflow-hidden">
                          {(
                            isHotel ? booking.hotelImage : booking.activityImage
                          ) ? (
                            <Image
                              src={
                                isHotel
                                  ? booking.hotelImage!
                                  : booking.activityImage!
                              }
                              alt={
                                isHotel
                                  ? booking.hotelName
                                  : booking.activityName
                              }
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {isHotel ? (
                                <Hotel size={28} className="text-slate-300" />
                              ) : (
                                <Activity
                                  size={28}
                                  className="text-slate-300"
                                />
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                              {isHotel
                                ? booking.hotelName
                                : booking.activityName}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {isHotel
                                ? booking.hotelLocation
                                : booking.activityLocation}
                            </p>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded w-fit text-xs font-semibold ${getStatusColor(
                                booking.status,
                              )}`}
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status === "PENDING"
                                ? "Pending"
                                : booking.status === "CONFIRMED"
                                  ? "Confirmed"
                                  : "Cancelled"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-2.5 mb-3">
                        <div className="grid grid-cols-3 gap-2">
                          {isHotel ? (
                            <>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  Check-in
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {new Date(
                                    booking.startDate,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  Nights
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {nights}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  Price
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  ₹{booking.totalPrice}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  Date
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {new Date(booking.date).toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric" },
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  People
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {booking.people}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  Price
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  ₹{booking.totalPrice}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <Link
                        href={
                          isHotel
                            ? `/hotel/${booking.hotelId}`
                            : `/activities/${booking.activityId}`
                        }
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Eye size={16} />
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className="hidden lg:grid grid-cols-12 gap-4 p-4">
                    <div className="col-span-2 rounded-lg bg-slate-100 overflow-hidden">
                      {(
                        isHotel ? booking.hotelImage : booking.activityImage
                      ) ? (
                        <Image
                          src={
                            isHotel
                              ? booking.hotelImage!
                              : booking.activityImage!
                          }
                          alt={
                            isHotel ? booking.hotelName : booking.activityName
                          }
                          width={160}
                          height={140}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center min-h-35">
                          {isHotel ? (
                            <Hotel size={36} className="text-slate-300" />
                          ) : (
                            <Activity size={36} className="text-slate-300" />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                              {isHotel
                                ? booking.hotelName
                                : booking.activityName}
                            </h3>
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                              <MapPin size={14} />
                              {isHotel
                                ? booking.hotelLocation
                                : booking.activityLocation}
                            </div>
                          </div>
                          <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                              booking.status,
                            )}`}
                          >
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                          {isHotel ? (
                            <>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  CHECK-IN
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {new Date(
                                    booking.startDate,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  DURATION
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {nights} nights
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  CHECK-OUT
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {new Date(
                                    booking.endDate,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  DATE
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {new Date(booking.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  PARTICIPANTS
                                </p>
                                <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                                  <Users size={14} />
                                  {booking.people} people
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-semibold mb-0.5">
                                  DURATION
                                </p>
                                <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                                  <Clock size={14} />
                                  {booking.duration}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mt-2">
                        Booked{" "}
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="col-span-3 flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-1">
                          Total Price
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          ₹{booking.totalPrice}
                        </p>
                      </div>

                      <Link
                        href={
                          isHotel
                            ? `/hotel/${booking.hotelId}`
                            : `/activities/${booking.activityId}`
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                      >
                        <Eye size={16} />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
