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

const Page = () => {
  const router = useRouter();
  const [currentYear] = useState(new Date().getFullYear());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Form submitted");

      // Validate inputs on client side first
      if (!email.trim() || !password.trim()) {
        console.log("Empty fields");
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        console.log("Password too short");
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      console.log("Sending login request...");

      // Make API request
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        console.log("Login failed:", data.error);
        setError(data.error || "Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Success: redirect to dashboard
      if (data.success) {
        console.log("Login successful, redirecting...");
        // Store user info in a secure way (optional, token is in httpOnly cookie)
        sessionStorage.setItem("adminUser", JSON.stringify(data.user));

        // Redirect immediately
        console.log("Pushing to dashboard...");
        router.push("/admin/dashboard");
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50">
      {/* Left Side: Hero Section */}
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

        {/* Decorative Background Circles */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
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

          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="block text-black w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="block text-black w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                disabled={isLoading}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer disabled:opacity-50"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-700 cursor-pointer"
              >
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
