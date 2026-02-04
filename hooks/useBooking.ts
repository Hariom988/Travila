// hooks/useBooking.ts
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

export interface BookingData {
  hotelId?: string;
  activityId?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  people?: number;
  totalPrice: string;
}

export function useBooking() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/verify');
      const isAuth = response.ok;
      setIsAuthenticated(isAuth);
      return isAuth;
    } catch {
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const requireAuth = useCallback(async (): Promise<boolean> => {
    const isAuth = await checkAuth();
    if (!isAuth) {
      router.push('/user/auth');
      return false;
    }
    return true;
  }, [checkAuth, router]);

  const createHotelBooking = useCallback(
    async (bookingData: BookingData) => {
      const isAuth = await requireAuth();
      if (!isAuth) return null;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/bookings/hotel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Booking failed');
        }

        return data.booking;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [requireAuth]
  );

  const createActivityBooking = useCallback(
    async (bookingData: BookingData) => {
      const isAuth = await requireAuth();
      if (!isAuth) return null;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/bookings/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Booking failed');
        }

        return data.booking;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [requireAuth]
  );

  return {
    isAuthenticated,
    isLoading,
    error,
    checkAuth,
    requireAuth,
    createHotelBooking,
    createActivityBooking,
  };
}