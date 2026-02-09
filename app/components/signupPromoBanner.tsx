"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function SignUpPromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoading || isLoggedIn) return;

    const sessionClosed = sessionStorage.getItem(
      "signup-banner-closed-session",
    );

    if (!sessionClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isLoggedIn]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("signup-banner-closed-session", "true");
  };

  if (isLoading || isLoggedIn || !isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-60 bg-gray-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 w-[90%] max-w-sm animate-in fade-in zoom-in duration-300">
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 " />
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 transform rotate-3">
              <Sparkles className="text-blue-600 w-7 h-7" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Unlock More with HikinHigh
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Join our community for exclusive travel deals, priority booking,
              and 24/7 support.
            </p>

            <div className="w-full space-y-3 mb-8">
              {[
                "Instant booking confirmation",
                "Priority customer support",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-left">
                  <div className="shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="text-green-600 w-3 h-3 stroke-3" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full space-y-3">
              <Link
                href="/user/auth"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200"
              >
                Sign Up Now
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={handleClose}
                className="text-gray-400 cursor-pointer hover:text-gray-600 text-xs font-semibold py-1 transition-colors"
              >
                Maybe later, I'll browse first
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-50 w-full">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                ✓ Free forever • ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
