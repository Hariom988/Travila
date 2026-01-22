"use client";
import { useState } from "react";
import { Phone, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotel" },
    { name: "Pages", href: "/pages" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`${
        isHomePage ? "absolute" : "relative bg-gray-900"
      } top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-6 w-full text-white`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50 relative">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
            9
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight leading-none">
              Travila
            </span>
            <span className="text-[8px] md:text-[10px] font-normal tracking-wide uppercase opacity-80">
              A Travel Agency
            </span>
          </div>
        </Link>

        {/* --- Desktop Menu --- */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 hover:text-purple-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* --- Desktop Right Actions --- */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-xs text-left">
              <p className="text-gray-300">Call Us:</p>
              <p className="font-semibold text-white">9878677770</p>
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4" />
            Login
          </button>
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <button
          className="lg:hidden z-50 relative p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      <div
        className={`fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-xl font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-purple-400"
            >
              {item.name}
            </Link>
          ))}
          <hr className="w-20 border-gray-700" />
          <p className="text-lg">9878677770</p>
          <button className="bg-purple-600 px-8 py-3 rounded-full mt-4">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
