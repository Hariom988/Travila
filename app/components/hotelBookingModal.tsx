// app/components/hotelBookingModal.tsx
"use client";
import { useState } from "react";
import { X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HotelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelId: string;
  hotelName: string;
  hotelPrice: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  rooms: number;
}

interface BookingState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function HotelBookingModal({
  isOpen,
  onClose,
  hotelId,
  hotelName,
  hotelPrice,
  checkInDate,
  checkOutDate,
  nights,
  rooms,
}: HotelBookingModalProps) {
  const router = useRouter();
  const [bookingState, setBookingState] = useState<BookingState>({
    status: "idle",
    message: "",
  });

  const pricePerNight = parseFloat(hotelPrice);
  const totalPrice = pricePerNight * nights * rooms;

  const handleBooking = async () => {
    setBookingState({
      status: "loading",
      message: "Processing your booking...",
    });

    try {
      const response = await fetch("/api/bookings/hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId,
          startDate: checkInDate,
          endDate: checkOutDate,
          totalPrice: totalPrice.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated - redirect to login
          router.push("/user/auth");
          return;
        }
        throw new Error(data.error || "Booking failed");
      }

      setBookingState({
        status: "success",
        message: `Booking confirmed! Your reservation ID: ${data.booking.id}`,
      });

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setBookingState({ status: "idle", message: "" });
      }, 3000);
    } catch (error) {
      setBookingState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create booking",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end lg:items-center justify-center p-4">
      <div className="bg-white rounded-3xl lg:rounded-2xl w-full lg:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
          <h2 className="font-bold text-lg">Confirm Booking</h2>
          <button
            onClick={onClose}
            disabled={
              bookingState.status === "loading" ||
              bookingState.status === "success"
            }
            className="hover:bg-blue-500 p-2 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Messages */}
          {bookingState.status === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{bookingState.message}</p>
            </div>
          )}

          {bookingState.status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{bookingState.message}</p>
            </div>
          )}

          {bookingState.status !== "success" && (
            <>
              {/* Hotel Info */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                <h3 className="font-bold text-gray-900">{hotelName}</h3>

                {/* Booking Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(checkInDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(checkOutDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span>Nights:</span>
                    <span className="font-medium text-gray-900">{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms:</span>
                    <span className="font-medium text-gray-900">{rooms}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-blue-50 p-4 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>
                    ₹{hotelPrice} × {nights} nights × {rooms} rooms
                  </span>
                  <span className="font-medium">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-slate-50 p-3 rounded-lg text-xs text-gray-600 space-y-1">
                <p>✓ Free cancellation up to 48 hours before check-in</p>
                <p>✓ Instant confirmation</p>
                <p>✓ Secure payment</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={onClose}
                  disabled={bookingState.status === "loading"}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={bookingState.status === "loading"}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {bookingState.status === "loading" && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {bookingState.status === "loading"
                    ? "Processing..."
                    : "Confirm Booking"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
