"use client";
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export default function WhatsAppButton({
  phoneNumber = "918130069469",
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to know more about your services.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed cursor-pointer bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce"
        aria-label="Open WhatsApp"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 flex items-end md:items-center justify-center p-4 md:p-0"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full md:w-96 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-bottom-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-green-500 cursor-pointer text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle size={24} />
                <h2 className="text-lg font-bold">Chat with us</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 cursor-pointer hover:bg-green-600 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 flex flex-col justify-center">
              <p className="text-gray-700 text-center text-sm md:text-base leading-relaxed">
                We're available on WhatsApp during{" "}
                <span className="font-semibold text-green-600">
                  Mon - Fri, 09:00 - 18:00
                </span>
                . We'd love to hear from you.
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handleOpenWhatsApp}
                className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Open WhatsApp
              </button>
            </div>

            <div className="md:hidden px-6 py-2 text-center">
              <p className="text-xs text-gray-400">Tap outside to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
