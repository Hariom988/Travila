// hooks/useAdminBooking.ts
import { useState, useCallback } from 'react';

interface BookingStatusResponse {
  success: boolean;
  message: string;
  booking: {
    id: string;
    bookingType: 'HOTEL' | 'ACTIVITY';
    status: string;
    totalPrice: string;
    updatedAt: string;
  };
}

export function useAdminBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBookingStatus = useCallback(
    async (bookingId: string, newStatus: 'CONFIRMED' | 'CANCELLED' | 'PENDING') => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/admin/booking/${bookingId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        const data: BookingStatusResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update booking status');
        }

        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    updateBookingStatus,
    clearError: () => setError(null),
  };
}