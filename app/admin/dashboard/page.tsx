"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      console.log("Logging out...");
      const response = await fetch("/api/auth/admin-logout", {
        method: "POST",
      });

      if (response.ok) {
        console.log("Logout successful");
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show loading state while verifying auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated (handled by useAuth hook)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AdminPortal</h1>
              <p className="text-sm text-slate-500">Welcome, {user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <LayoutDashboard className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Active Hotels
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <LayoutDashboard className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">$0</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <LayoutDashboard className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mt-12 bg-linear-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-indigo-100">
            You're logged in as{" "}
            <span className="font-semibold">{user?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
