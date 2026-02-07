"use client";
import { useEffect, useState } from "react";
import { X, Shield } from "lucide-react";

interface SecurityBannerProps {
  autoHideDelay?: number;
  onClose?: () => void;
}

const SecurityBanner = ({
  autoHideDelay = 10000,
  onClose,
}: SecurityBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, autoHideDelay);

    return () => clearTimeout(timer);
  }, [isVisible, autoHideDelay, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="w-full px-3 py-2 sm:px-4 sm:py-2.5 font-sans">
      <div className="relative max-w-6xl mx-auto bg-linear-to-r from-blue-50 to-blue-50/50 border border-blue-200/60 rounded-lg shadow-sm overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="shrink-0 text-blue-600">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Your data is secure with us
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 leading-tight hidden xs:block">
                Enterprise-grade encryption & privacy protection
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded transition-all duration-200 active:scale-95"
            aria-label="Close security banner"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityBanner;
