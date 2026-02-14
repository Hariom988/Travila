"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  BookOpen,
  X,
} from "lucide-react";
import { useAdminBooking } from "@/hooks/useAdminBooking";

interface Booking {
  id: string;
  bookingType: "HOTEL" | "ACTIVITY";
  itemId: string;
  itemName: string;
  itemLocation: string;
  itemImage: string | null;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  startDate?: string;
  endDate?: string;
  nights?: number;
  rooms?: number;
  date?: string;
  people?: number;
  duration?: string;
  pricePerUnit: string;
  totalPrice: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  paymentId: string | null;
  createdAt: string;
}

interface BookingsSectionProps {
  bookings: Booking[];
  loading: boolean;
  onBookingUpdated: (updatedBooking: Booking) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  bookingFilter: "all" | "hotel" | "activity";
  onBookingFilterChange: (filter: "all" | "hotel" | "activity") => void;
  statusFilter: "all" | "PENDING" | "CONFIRMED" | "CANCELLED";
  onStatusFilterChange: (
    filter: "all" | "PENDING" | "CONFIRMED" | "CANCELLED",
  ) => void;
}

export function BookingsSection({
  bookings,
  loading,
  onBookingUpdated,
  searchTerm,
  onSearchChange,
  bookingFilter,
  onBookingFilterChange,
  statusFilter,
  onStatusFilterChange,
}: BookingsSectionProps) {
  const { isLoading, updateBookingStatus } = useAdminBooking();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    bookingId: string;
    newStatus: "CONFIRMED" | "CANCELLED" | "PENDING";
  } | null>(null);

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: "CONFIRMED" | "CANCELLED" | "PENDING",
  ) => {
    setUpdatingId(bookingId);
    setApiError(null);

    try {
      const response = await updateBookingStatus(bookingId, newStatus);

      if (response.success) {
        const updatedBooking = bookings.find((b) => b.id === bookingId);
        if (updatedBooking) {
          onBookingUpdated({
            ...updatedBooking,
            status: newStatus as any,
          });
        }

        setSuccessMessage(`Booking ${newStatus.toLowerCase()} successfully!`);
        setConfirmModal(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Failed to update booking",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      bookingFilter === "all" ||
      booking.bookingType.toLowerCase() === bookingFilter;

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-900/30 text-yellow-300";
      case "CONFIRMED":
        return "bg-green-900/30 text-green-300";
      case "CANCELLED":
        return "bg-red-900/30 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock size={16} />;
      case "CONFIRMED":
        return <CheckCircle size={16} />;
      case "CANCELLED":
        return <Trash2 size={16} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={bookingFilter}
            onChange={(e) => onBookingFilterChange(e.target.value as any)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="hotel">Hotels</option>
            <option value="activity">Activities</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as any)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3 text-red-300">
          <AlertCircle size={20} />
          <span>{apiError}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3 text-green-300">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-700">
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Dates/Info
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          booking.bookingType === "HOTEL"
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-purple-900/30 text-purple-300"
                        }`}
                      >
                        {booking.bookingType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">
                          {booking.itemName}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {booking.itemLocation}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">
                          {booking.userName}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {booking.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {booking.bookingType === "HOTEL" ? (
                        <div className="text-xs">
                          <p>
                            {booking.startDate &&
                              new Date(booking.startDate).toLocaleDateString()}
                            {" - "}
                            {booking.endDate &&
                              new Date(booking.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400">
                            {booking.nights} nights, {booking.rooms} room(s)
                          </p>
                        </div>
                      ) : (
                        <div className="text-xs">
                          <p>
                            {booking.date &&
                              new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400">
                            {booking.people} people • {booking.duration}
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-bold">
                        ${booking.totalPrice}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {booking.bookingType === "HOTEL"
                          ? `$${booking.pricePerUnit}/night`
                          : `$${booking.pricePerUnit}/person`}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {booking.status === "PENDING" && (
                          <button
                            onClick={() =>
                              setConfirmModal({
                                bookingId: booking.id,
                                newStatus: "CONFIRMED",
                              })
                            }
                            disabled={updatingId === booking.id}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition disabled:opacity-50"
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status === "CONFIRMED" && (
                          <button
                            onClick={() =>
                              setConfirmModal({
                                bookingId: booking.id,
                                newStatus: "CANCELLED",
                              })
                            }
                            disabled={updatingId === booking.id}
                            className="px-3 cursor-pointer py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        )}
                        {booking.status === "CANCELLED" && (
                          <button
                            onClick={() =>
                              setConfirmModal({
                                bookingId: booking.id,
                                newStatus: "CONFIRMED",
                              })
                            }
                            disabled={updatingId === booking.id}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition disabled:opacity-50"
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-center bg-gray-800 rounded-lg">
            <BookOpen className="w-12 h-12 mx-auto text-gray-600 mb-2" />
            <p className="text-gray-400">No bookings found</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition"
                onClick={() =>
                  setExpandedId(expandedId === booking.id ? null : booking.id)
                }
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        booking.bookingType === "HOTEL"
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-purple-900/30 text-purple-300"
                      }`}
                    >
                      {booking.bookingType}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
                  <h3 className="text-white font-medium truncate">
                    {booking.itemName}
                  </h3>
                  <p className="text-gray-400 text-sm">{booking.userName}</p>
                </div>

                <div className="text-right ml-2">
                  <p className="text-white font-bold">${booking.totalPrice}</p>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition mt-1 ${
                      expandedId === booking.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedId === booking.id && (
                <div className="border-t border-gray-700 p-4 space-y-4 bg-gray-750">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase mb-1">
                      Item Details
                    </p>
                    <p className="text-white font-medium">{booking.itemName}</p>
                    <p className="text-gray-400 text-sm">
                      {booking.itemLocation}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase mb-1">
                      Customer
                    </p>
                    <p className="text-white font-medium">{booking.userName}</p>
                    <p className="text-gray-400 text-sm">{booking.userEmail}</p>
                    {booking.userPhone && (
                      <p className="text-gray-400 text-sm">
                        {booking.userPhone}
                      </p>
                    )}
                  </div>

                  {booking.bookingType === "HOTEL" ? (
                    <div>
                      <p className="text-gray-400 text-xs font-semibold uppercase mb-1">
                        Booking Details
                      </p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-400">Check-in:</span>{" "}
                          <span className="text-white">
                            {booking.startDate &&
                              new Date(booking.startDate).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Check-out:</span>{" "}
                          <span className="text-white">
                            {booking.endDate &&
                              new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Duration:</span>{" "}
                          <span className="text-white">
                            {booking.nights} nights
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-xs font-semibold uppercase mb-1">
                        Booking Details
                      </p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-400">Date:</span>{" "}
                          <span className="text-white">
                            {booking.date &&
                              new Date(booking.date).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Participants:</span>{" "}
                          <span className="text-white">{booking.people}</span>
                        </p>
                        <p>
                          <span className="text-gray-400">Duration:</span>{" "}
                          <span className="text-white">{booking.duration}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-600 pt-3">
                    <p className="text-gray-400 text-xs font-semibold uppercase mb-2">
                      Actions
                    </p>
                    <div className="flex gap-2">
                      {booking.status === "PENDING" && (
                        <button
                          onClick={() =>
                            setConfirmModal({
                              bookingId: booking.id,
                              newStatus: "CONFIRMED",
                            })
                          }
                          disabled={updatingId === booking.id}
                          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <button
                          onClick={() =>
                            setConfirmModal({
                              bookingId: booking.id,
                              newStatus: "CANCELLED",
                            })
                          }
                          disabled={updatingId === booking.id}
                          className="flex-1 cursor-pointer px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status === "CANCELLED" && (
                        <button
                          onClick={() =>
                            setConfirmModal({
                              bookingId: booking.id,
                              newStatus: "CONFIRMED",
                            })
                          }
                          disabled={updatingId === booking.id}
                          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-900/30 mx-auto mb-4">
              <AlertCircle className="text-yellow-400" size={24} />
            </div>

            <h3 className="text-lg font-semibold text-white text-center mb-2">
              {confirmModal.newStatus === "CONFIRMED"
                ? "Confirm Booking?"
                : "Cancel Booking?"}
            </h3>

            <p className="text-gray-400 text-sm text-center mb-6">
              {confirmModal.newStatus === "CONFIRMED"
                ? "Are you sure you want to confirm this booking?"
                : "Are you sure you want to cancel this booking?"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                disabled={updatingId === confirmModal.bookingId}
                className="flex-1 cursor-pointer px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(
                    confirmModal.bookingId,
                    confirmModal.newStatus,
                  )
                }
                disabled={updatingId === confirmModal.bookingId}
                className={`flex-1 cursor-pointer px-4 py-2 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 ${
                  confirmModal.newStatus === "CONFIRMED"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {updatingId === confirmModal.bookingId && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {confirmModal.newStatus === "CONFIRMED"
                  ? "Confirm"
                  : "Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
