"use client";
import React, { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LayoutDashboard,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authenticateAdmin } from "./action";

const Page = () => {
  const router = useRouter();
  const [currentYear] = useState(new Date().getFullYear());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await authenticateAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
              <LayoutDashboard size={32} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              AdminPortal
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Manage your <br /> platform with <br />
            <span className="text-indigo-200">total control.</span>
          </h1>
          <p className="text-indigo-100 text-lg max-w-md">
            The all-in-one workspace for administrators to monitor performance,
            manage users, and control system settings.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-indigo-200">
          <p>{currentYear}</p>
          <span>•</span>
          <p>Privacy Policy</p>
        </div>

        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* RIGHT SIDE - YOUR ORIGINAL DESIGN */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">
              AdminPortal
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-slate-500">
              Please enter your admin credentials
            </p>
          </div>

          {/* New Error Alert (Matches your theme) */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email" // Added for Backend
                    type="email"
                    required
                    className="block text-black w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    name="password" // Added for Backend
                    type={showPassword ? "text" : "password"}
                    required
                    className="block text-black w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
