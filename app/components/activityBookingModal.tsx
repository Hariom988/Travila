"use client";
import { useState } from "react";
import {
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Users,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ActivityBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: string;
  activityName: string;
  activityPrice: string;
  activityDuration: string;
  selectedDate: string;
  people: number;
}

interface BookingState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ActivityBookingModal({
  isOpen,
  onClose,
  activityId,
  activityName,
  activityPrice,
  activityDuration,
  selectedDate,
  people,
}: ActivityBookingModalProps) {
  const router = useRouter();
  const [bookingState, setBookingState] = useState<BookingState>({
    status: "idle",
    message: "",
  });

  const pricePerPerson = parseFloat(activityPrice);
  const totalPrice = pricePerPerson * people;

  const handleBooking = async () => {
    setBookingState({
      status: "loading",
      message: "Processing your booking...",
    });

    try {
      const response = await fetch("/api/bookings/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId,
          date: selectedDate,
          people,
          totalPrice: totalPrice.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/user/auth");
          return;
        }
        throw new Error(data.error || "Booking failed");
      }

      setBookingState({
        status: "success",
        message: `Activity booking confirmed! Booking ID: ${data.booking.id}`,
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
        <div className="sticky top-0 bg-linear-to-r from-purple-600 to-purple-700 text-white p-4 lg:p-6 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
          <h2 className="font-bold text-lg">Confirm Activity Booking</h2>
          <button
            onClick={onClose}
            disabled={
              bookingState.status === "loading" ||
              bookingState.status === "success"
            }
            className="hover:bg-purple-500 p-2 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
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
              <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                <h3 className="font-bold text-gray-900">{activityName}</h3>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <div className="flex justify-between flex-1">
                      <span>Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Users className="w-4 h-4 text-purple-600" />
                    <div className="flex justify-between flex-1">
                      <span>Participants:</span>
                      <span className="font-medium text-gray-900">
                        {people} person{people > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span>Duration:</span>
                    <span className="font-medium text-gray-900">
                      {activityDuration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>
                    ₹{activityPrice} × {people} person{people > 1 ? "s" : ""}
                  </span>
                  <span className="font-medium">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total Amount:</span>
                  <span className="text-purple-600">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-xs text-gray-600 space-y-1">
                <p>✓ Instant confirmation</p>
                <p>✓ Free cancellation up to 24 hours before activity</p>
                <p>✓ Professional guides included</p>
                <p>✓ All safety equipment provided</p>
              </div>

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
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
