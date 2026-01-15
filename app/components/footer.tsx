"use client";

import Link from "next/link";
import Image from "next/image";
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
    <footer className="relative w-full bg-[#050014] text-gray-400 overflow-hidden font-sans border-t-4 border-[#6300ee]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-5 pt-12 pb-8 md:pt-20 md:pb-12 relative z-20">
        {/* 
           GRID LAYOUT EXPLAINED:
           - grid-cols-2: On Mobile, we create a 2-column layout.
           - lg:grid-cols-4: On Desktop, we switch to 4 columns.
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-8">
          {/* SECTION 1: Brand & Newsletter 
             - Mobile: col-span-2 (Full Width) 
             - Desktop: col-span-1 (1/4 Width)
          */}
          <div className="col-span-2 lg:col-span-1 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <span className="text-[#050014] font-bold text-xl">9</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-none">
                  Travox
                </h2>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
                  A Travel Agency
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              It Is A Long Established Fact That A Reader Will Be Distracted By
              The Readable Content.
            </p>

            {/* Newsletter Input */}
            <form className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full h-11 px-4 text-sm text-gray-900 bg-white rounded-l-md outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="h-11 px-4 bg-[#6300ee] hover:bg-[#5000cc] text-white rounded-r-md transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#6300ee] flex items-center justify-center text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION 2: Quick Links 
             - Mobile: col-span-1 (Half Width) - Sits next to Utility Pages
          */}
          <div className="col-span-1 lg:pl-8">
            <h3 className="text-white text-lg font-bold mb-4 lg:mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Blogs", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm hover:text-[#6300ee] hover:pl-2 transition-all duration-300 block"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SECTION 3: Utility Pages
             - Mobile: col-span-1 (Half Width) - Sits next to Quick Links
          */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-bold mb-4 lg:mb-6">
              Utility Pages
            </h3>
            <ul className="space-y-3">
              {["Team", "Shop", "Cart", "Wishlist", "Faq"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm hover:text-[#6300ee] hover:pl-2 transition-all duration-300 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4: Information
             - Mobile: col-span-2 (Full Width) - Because addresses need space
             - Desktop: col-span-1
          */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4 lg:mb-6">
              Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6300ee] shrink-0 mt-0.5" />
                <span className="text-sm">New Delhi, Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#6300ee] shrink-0" />
                <span className="text-sm">+91 7856839450</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#6300ee] shrink-0 mt-0.5" />
                <span className="text-sm">
                  Mon – Sat: 8 Am – 5 Pm
                  <br />
                  Sunday: CLOSED
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="relative z-20 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 py-5 text-center">
          <p className="text-xs md:text-sm text-gray-500">
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
