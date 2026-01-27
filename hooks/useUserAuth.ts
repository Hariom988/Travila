import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export interface UserData {
id: string;
name: string | null;
email: string;
phone?: string | null;
role: string;
}
export function useUserAuth() {
const router = useRouter();
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [user, setUser] = useState<UserData | null>(null);
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
    }
  } catch (error) {
    console.error('User auth check error:', error);
    setIsAuthenticated(false);
  } finally {
    setIsLoading(false);
  }
};

verifyAuth();
}, []);
const logout = async () => {
try {
await fetch('/api/auth/user/logout', {
method: 'POST',
});
} catch (error) {
console.error('Logout error:', error);
} finally {
setIsAuthenticated(false);
setUser(null);
router.push('/user/auth');
}
};
return { isAuthenticated, isLoading, user, logout };
}