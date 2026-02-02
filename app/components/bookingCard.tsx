"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  ShieldCheck,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Client-only wrapper to prevent hydration errors
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

interface DatePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  label: string;
  color: "green" | "orange";
}

// Helper functions
const formatDateToLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayDate = (): string => {
  return formatDateToLocal(new Date());
};

const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateToLocal(tomorrow);
};

const DatePicker = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  label,
  color,
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days: (Date | null)[] = [];
  const startDay = firstDayOfMonth(currentMonth);
  const daysCount = daysInMonth(currentMonth);

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysCount; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return formatDateToLocal(date) === selectedDate;
  };

  const monthYear = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#1D2939] rounded-xl shadow-2xl p-4 border border-[#344054]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white">{monthYear}</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-[#344054] rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Previous month"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-[#344054] rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Next month"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <button
            key={`day-${idx}`}
            disabled={!day || isDateDisabled(day as Date)}
            onClick={() => day && onSelectDate(formatDateToLocal(day))}
            className={`aspect-square text-xs font-medium rounded-lg transition-all ${
              !day
                ? "opacity-0"
                : isDateSelected(day as Date)
                  ? "bg-blue-600 text-white font-bold shadow-md"
                  : isDateDisabled(day as Date)
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-300 hover:bg-[#344054] hover:text-white"
            }`}
          >
            {day?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

interface BookingCardProps {
  hotelPrice: string;
  hotelName: string;
  hotelId: string;
}

export default function BookingCard({
  hotelPrice,
  hotelName,
  hotelId,
}: BookingCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from localStorage with Try/Catch safety
  const [checkIn, setCheckIn] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.checkIn || getTodayDate();
        } catch {
          return getTodayDate();
        }
      }
    }
    return getTodayDate();
  });

  const [checkOut, setCheckOut] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.checkOut || getTomorrowDate();
        } catch {
          return getTomorrowDate();
        }
      }
    }
    return getTomorrowDate();
  });

  const [rooms, setRooms] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.rooms || 1;
        } catch {
          return 1;
        }
      }
    }
    return 1;
  });

  const [adults, setAdults] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.adults || 2;
        } catch {
          return 2;
        }
      }
    }
    return 2;
  });

  const [showCalendarModal, setShowCalendarModal] = useState<
    "in" | "out" | null
  >(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Sync with localStorage when values change
  useEffect(() => {
    const stored = localStorage.getItem("hotelSearch");
    let currentSearch = {};
    try {
      currentSearch = stored ? JSON.parse(stored) : {};
    } catch {
      currentSearch = {};
    }

    const updatedSearch = {
      ...currentSearch,
      checkIn,
      checkOut,
      rooms,
      adults,
    };

    localStorage.setItem("hotelSearch", JSON.stringify(updatedSearch));
    window.dispatchEvent(new Event("hotelSearchUpdate"));
  }, [checkIn, checkOut, rooms, adults]);

  // Listen for changes from SearchBar
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("hotelSearch");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCheckIn(parsed.checkIn || getTodayDate());
          setCheckOut(parsed.checkOut || getTomorrowDate());
          setRooms(parsed.rooms || 1);
          setAdults(parsed.adults || 2);
        } catch (e) {
          console.error("Error parsing storage update");
        }
      }
    };

    window.addEventListener("hotelSearchUpdate", handleStorageChange);
    return () =>
      window.removeEventListener("hotelSearchUpdate", handleStorageChange);
  }, []);

  // Check for booking success message on mount
  useEffect(() => {
    const bookingSuccess = sessionStorage.getItem("bookingSuccess");
    if (bookingSuccess) {
      try {
        const details = JSON.parse(bookingSuccess);
        setBookingDetails(details);
        setShowSuccessModal(true);
        sessionStorage.removeItem("bookingSuccess");
      } catch (e) {
        console.error("Error parsing booking success");
      }
    }
  }, []);

  // Calculate nights
  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  // Calculate total price
  const pricePerNight = parseFloat(hotelPrice);
  const totalPrice = pricePerNight * nights * rooms;

  const handleReservation = async () => {
    setBookingError(null);
    setIsBooking(true);

    const bookingPayload = {
      hotelId,
      hotelName,
      checkIn,
      checkOut,
      rooms,
      adults,
      totalPrice,
    };

    const handleAuthRedirect = () => {
      sessionStorage.setItem("redirectAfterLogin", pathname);
      sessionStorage.setItem("pendingBooking", JSON.stringify(bookingPayload));
      router.push("/user/auth");
    };

    try {
      const response = await fetch("/api/bookings/hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      // 1. Check if the browser followed a redirect automatically (Standard Middleware behavior)
      if (response.redirected) {
        handleAuthRedirect();
        return;
      }

      // 2. Get text first to safely handle HTML vs JSON
      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch (e) {
        // --- FIX IS HERE ---
        // If JSON parse fails, check if we received HTML.
        // If status is 200 (OK) AND it's HTML, it means we were redirected to the Login Page successfully.
        if (response.ok && responseText.trim().startsWith("<")) {
          console.log("Received HTML login page, redirecting to auth...");
          handleAuthRedirect();
          return;
        }

        // Also check if it's a 401/403 (Auth Error) that returned HTML
        if (response.status === 401 || response.status === 403) {
          handleAuthRedirect();
          return;
        }

        // Otherwise, it's a genuine server error (500 or 404)
        console.error("API Error (Not JSON):", responseText.slice(0, 100));
        throw new Error(
          "Something went wrong with the server. Please try again.",
        );
      }

      // 3. Handle JSON-based errors
      if (!response.ok) {
        if (data.requiresAuth || response.status === 401) {
          handleAuthRedirect();
          return;
        }

        setBookingError(data.error || "Failed to create booking");
        setIsBooking(false);
        return;
      }

      // Success
      setBookingDetails(data.booking);
      setShowSuccessModal(true);
      setIsBooking(false);
    } catch (error: any) {
      console.error("Booking process error:", error);
      setBookingError(error.message || "An error occurred. Please try again.");
      setIsBooking(false);
    }
  };

  return (
    <>
      {/* Booking Card */}
      <div className="sticky top-28 bg-white border border-slate-200 p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <span className="text-4xl font-black text-slate-900">
              ₹{hotelPrice}
            </span>
            <span className="text-slate-400 font-bold text-sm tracking-tighter">
              {" "}
              / night
            </span>
          </div>
          <div className="flex items-center gap-1 text-orange-500 font-black text-sm">
            <svg className="w-4 h-4 fill-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>4.9</span>
          </div>
        </div>

        {bookingError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{bookingError}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {/* Dates Button */}
          <button
            onClick={() => setShowCalendarModal("in")}
            className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:bg-white hover:border-blue-200 transition-all"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Dates
            </span>
            <ClientOnly>
              <span className="text-sm font-bold text-slate-800">
                {new Date(checkIn).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}{" "}
                -{" "}
                {new Date(checkOut).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </ClientOnly>
          </button>

          {/* Guests Button */}
          <button
            onClick={() => setShowGuestsModal(true)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:bg-white hover:border-blue-200 transition-all"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Guests
            </span>
            <span className="text-sm font-bold text-slate-800">
              {adults} Adult{adults > 1 ? "s" : ""}, {rooms} Room
              {rooms > 1 ? "s" : ""}
            </span>
          </button>
        </div>

        {/* Price Breakdown */}
        <ClientOnly>
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">
                ₹{hotelPrice} × {nights} night{nights > 1 ? "s" : ""} × {rooms}{" "}
                room{rooms > 1 ? "s" : ""}
              </span>
              <span className="font-bold text-slate-900">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </ClientOnly>

        {/* Reserve Button */}
        <button
          onClick={handleReservation}
          disabled={isBooking}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
        >
          {isBooking ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            "Reserve Property"
          )}
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

      {/* Success Modal */}
      {showSuccessModal && bookingDetails && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-6 flex items-center justify-center rounded-t-3xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Check size={32} className="text-white" />
              </div>
            </div>
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-slate-600 mb-6">
                Your hotel reservation has been successfully confirmed
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Hotel
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {bookingDetails.hotelName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {bookingDetails.hotelLocation}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Check-in
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {new Date(bookingDetails.checkIn).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Check-out
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {new Date(bookingDetails.checkOut).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl font-black text-blue-600">
                    ₹
                    {parseFloat(bookingDetails.totalPrice).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Booking ID
                  </p>
                  <p className="text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                    {bookingDetails.id}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal - Check In */}
      {showCalendarModal === "in" && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-[#101828] rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#1F2937]">
            <div className="sticky top-0 bg-linear-to-r from-green-600 to-green-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-In Date</h2>
              <button
                onClick={() => setShowCalendarModal(null)}
                className="hover:bg-green-500 p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <DatePicker
                selectedDate={checkIn}
                onSelectDate={(date) => {
                  setCheckIn(date);
                  setShowCalendarModal("out");
                  if (new Date(date) >= new Date(checkOut)) {
                    const newCheckout = new Date(date);
                    newCheckout.setDate(newCheckout.getDate() + 2);
                    setCheckOut(formatDateToLocal(newCheckout));
                  }
                }}
                minDate={getTodayDate()}
                label="Check-In"
                color="green"
              />
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal - Check Out */}
      {showCalendarModal === "out" && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-[#101828] rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#1F2937]">
            <div className="sticky top-0 bg-linear-to-r from-orange-600 to-orange-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Check-Out Date</h2>
              <button
                onClick={() => setShowCalendarModal(null)}
                className="hover:bg-orange-500 p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <DatePicker
                selectedDate={checkOut}
                onSelectDate={(date) => {
                  setCheckOut(date);
                  setShowCalendarModal(null);
                }}
                minDate={checkIn}
                label="Check-Out"
                color="orange"
              />
            </div>
          </div>
        </div>
      )}

      {/* Guests Modal */}
      {showGuestsModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="bg-[#101828] rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl border border-[#1F2937]">
            <div className="bg-linear-to-r from-purple-600 to-purple-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
              <h2 className="font-bold text-lg">Select Guests</h2>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="hover:bg-purple-500 p-2 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-bold text-gray-400 mb-4">Rooms</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-white flex-1 text-center">
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 mb-4">Adults</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-white flex-1 text-center">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-10 h-10 border border-[#344054] rounded-lg hover:bg-[#1D2939] flex items-center justify-center font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowGuestsModal(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
