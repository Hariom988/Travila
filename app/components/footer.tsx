"use client";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#050014] text-gray-400 overflow-hidden font-sans border-t-2 md:border-t-4 border-[#6300ee]">
      <div className="container mx-auto px-4 pt-8 pb-6 md:pt-20 md:pb-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <span className="text-[#050014] font-bold text-lg">9</span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-none">
                  Travila
                </h2>
                <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gray-500">
                  A Travel Agency
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-gray-400 max-w-sm">
              It Is A Long Established Fact That A Reader Will Be Distracted By
              The Readable Content.
            </p>

            <form className="flex w-full max-w-sm shadow-lg">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full h-10 md:h-11 px-3 text-xs md:text-sm text-gray-900 bg-white rounded-l-md outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                className="h-10 md:h-11 px-3 bg-[#6300ee] hover:bg-[#5000cc] text-white rounded-r-md transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex gap-2.5 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-[#6300ee] flex items-center justify-center text-white transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:pl-8">
            <h3 className="text-white text-base md:text-lg font-bold mb-4 md:mb-6">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {["Home", "About Us", "Services", "Blogs", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xs md:text-sm hover:text-[#6300ee] hover:pl-1 transition-all duration-300 block"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white text-base md:text-lg font-bold mb-4 md:mb-6">
              Utility Pages
            </h3>
            <ul className="space-y-2.5">
              {["Team", "Shop", "Cart", "Wishlist", "Faq"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs md:text-sm hover:text-[#6300ee] hover:pl-1 transition-all duration-300 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1 pt-2 md:pt-0">
            <h3 className="text-white text-base md:text-lg font-bold mb-4 md:mb-6 border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
              Information
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#6300ee] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm">
                  New Delhi, Delhi, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6300ee] shrink-0" />
                <span className="text-xs md:text-sm">+91 7856839450</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#6300ee] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm leading-snug">
                  Mon – Sat: 8 Am – 5 Pm
                  <br />
                  Sunday: <span className="text-red-500/80">CLOSED</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative z-20 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-[10px] md:text-sm text-gray-500">
            Copyright © 2026{" "}
            <span className="text-white font-medium">Travila</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
