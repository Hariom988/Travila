// hooks/useBookingCancel.ts
import { useState, useCallback } from 'react';

interface CancelResponse {
  success: boolean;
  message: string;
  booking: {
    id: string;
    status: string;
    refundAmount: string;
    cancelledAt: string;
  };
}

export function useBookingCancel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelHotelBooking = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/hotel/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      const data: CancelResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel booking');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelActivityBooking = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/activity/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      const data: CancelResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel booking');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    cancelHotelBooking,
    cancelActivityBooking,
    clearError: () => setError(null),
  };
}