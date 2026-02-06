// app/components/navBar.tsx - WITH MY BOOKINGS BUTTON
"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  User,
  Menu,
  X,
  LogOut,
  Home,
  Hotel,
  Activity,
  Train,
  Bus,
  Anchor,
  Info,
  Mail,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  phone?: string | null;
  role: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";

  // Navigation links grouped by category
  const navCategories = [
    {
      title: "Discover",
      links: [
        { name: "Home", href: "/" },
        { name: "Hotels", href: "/hotel" },
        { name: "Activities", href: "/activities" },
      ],
    },
    {
      title: "Transportation",
      links: [
        { name: "Trains", href: "/train" },
        { name: "Buses", href: "/bus" },
        { name: "Cabs", href: "/cabs" },
      ],
    },
    {
      title: "Experiences",
      links: [
        { name: "Cruise", href: "/cruise" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  // Flatten all links for desktop view
  const allLinks = navCategories.flatMap((cat) => cat.links);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/verify");

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/user/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav
      className={`${
        isHomePage ? "absolute" : "relative bg-gray-900"
      } top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-6 w-full text-white`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 z-50 relative shrink-0"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl hover:bg-white/30 transition-colors">
            9
          </div>
          <div className="flex flex-col ">
            <span className="text-lg md:text-xl font-bold tracking-tight leading-none">
              Travila
            </span>
            <span className="text-[7px] md:text-[9px] font-normal tracking-wide uppercase opacity-80">
              A Travel Agency
            </span>
          </div>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden lg:flex items-center gap-1">
          {allLinks.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-white/20 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* --- Right Section: Contact + User Profile --- */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Contact Info */}
          <div className="flex items-center gap-3 border-r border-gray-700 pr-6">
            <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-xs text-left">
              <p className="text-gray-400">Call Us:</p>
              <p className="font-semibold text-white">9878677770</p>
            </div>
          </div>

          {/* User Profile or Login Button */}
          {!isLoading && user ? (
            <>
              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center text-sm font-bold ring-2 ring-white/20">
                    {getInitials(user.name)}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-white">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className={`absolute right-0 mt-2 w-80 bg-linear-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden transition-all duration-200 ${
                    isDropdownOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  {/* User Info Section */}
                  <div className="px-4 py-4 border-b border-gray-700 bg-linear-to-r from-purple-900/20 to-blue-900/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg font-bold">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        {user.phone && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {user.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full font-medium">
                      {user.role === "ADMIN" ? "🔐 Admin" : "👤 User"}
                    </span>
                  </div>

                  {/* Quick Links */}
                  <div className="px-3 py-2 space-y-1">
                    <Link
                      href="/user/bookings"
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300 hover:text-white"
                    >
                      <BookOpen size={16} />
                      My Bookings
                    </Link>
                    <Link
                      href="/user/profile"
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300 hover:text-white"
                    >
                      <User size={16} />
                      View Profile
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-gray-700 p-3">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2.5 flex items-center justify-center gap-2 hover:bg-red-600/20 rounded-lg transition-colors text-red-400 hover:text-red-300 font-medium text-sm"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : !isLoading ? (
            <Link
              href="/user/auth"
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl"
            >
              <User size={16} />
              Login
            </Link>
          ) : (
            <div className="w-32 h-10 bg-gray-700/50 rounded-lg animate-pulse"></div>
          )}
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <button
          className="md:hidden z-50 relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 top-0 left-0"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex flex-col max-h-screen overflow-y-auto bg-linear-to-b from-gray-900 via-gray-900 to-gray-950">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-gray-900/95 backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                  9
                </div>
                <span className="text-lg font-bold">Travila</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Categories */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* User Section (if logged in) */}
              {!isLoading && user && (
                <div className="bg-linear-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg font-bold">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full font-medium">
                    {user.role === "ADMIN" ? "🔐 Admin" : "👤 User"}
                  </span>
                </div>
              )}

              {/* My Bookings Button - Mobile */}
              {!isLoading && user && (
                <Link
                  href="/user/bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <BookOpen size={18} />
                  My Bookings
                </Link>
              )}

              {/* Category Navigation */}
              {navCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-2">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.links.map((item) => {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive(item.href)
                              ? "bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Contact Info */}
              <div className="border-t border-gray-800 pt-6">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Call Us</p>
                    <p className="text-sm font-semibold">9878677770</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Auth Section */}
            <div className="border-t border-gray-800 p-4 space-y-3 bg-gray-900/95 backdrop-blur sticky bottom-0">
              {!isLoading && user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 hover:bg-red-600/20 rounded-lg transition-colors text-red-400 hover:text-red-300 font-semibold text-sm border border-red-600/30"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : !isLoading ? (
                <Link
                  href="/user/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold text-sm shadow-lg"
                >
                  <User size={18} />
                  Sign In
                </Link>
              ) : null}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
