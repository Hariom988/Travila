// hooks/useAuth.ts
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  return { isAuthenticated, isLoading, user };
}