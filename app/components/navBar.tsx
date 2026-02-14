"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/hikinhighlogo.webp";

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
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/user/logout", { method: "POST" });
    } catch (error) {
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

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`${isHomePage ? "absolute" : "relative bg-slate-950"} top-0 left-0 right-0 z-[100] px-4 py-4 md:px-8 md:py-6 w-full text-white`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 z-50 relative shrink-0"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 relative flex items-center justify-center  rounded-lg p-1 ">
            <img
              src={logo.src}
              alt="HikinHigh Logo"
              className="w-full h-full rounded-2xl object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-tight leading-none text-white">
              HikinHigh
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {allLinks.map((item) => (
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
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
            <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-[10px] md:text-xs text-left">
              <p className="text-gray-400">Call Us:</p>
              <Link
                href="tel:+918130069469"
                className="font-semibold text-white block hover:text-blue-400"
              >
                +91 8130069469 🇮🇳
              </Link>
              <Link
                href="tel:+17863868934"
                className="font-semibold text-white block hover:text-blue-400"
              >
                +1 7863868934 🇺🇸 🇨🇦
              </Link>
            </div>
          </div>

          {!isLoading && user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex cursor-pointer items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold ring-2 ring-white/20">
                  {getInitials(user.name)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-white">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-slate-400">{user.role}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute right-0 mt-2 w-72 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden transition-all duration-200 z-[110] ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 invisible"
                }`}
              >
                <div className="px-4 py-4 z-50 border-b border-slate-800 bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                      {getInitials(user.name)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-white truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    href="/user/bookings"
                    className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-slate-800 rounded-lg transition-colors text-sm text-slate-300 hover:text-white"
                  >
                    <CalendarDays size={18} className="text-blue-400" />
                    My Bookings
                  </Link>
                </div>
                <div className="border-t border-slate-800 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer px-3 py-2.5 flex items-center gap-3 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300 font-medium text-sm"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : !isLoading ? (
            <Link
              href="/user/auth"
              className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-lg"
            >
              <User size={16} /> Login
            </Link>
          ) : (
            <div className="w-32 h-10 bg-slate-800 rounded-lg animate-pulse"></div>
          )}
        </div>

        <button
          className="md:hidden cursor-pointer z-50 relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] top-0 left-0"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 right-0 bottom-0 z-[120] flex flex-col max-h-screen overflow-y-auto bg-slate-950">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center  rounded-lg p-1">
                  <img
                    src={logo.src}
                    alt="Logo"
                    className="w-full rounded-2xl  h-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-white">HikinHigh</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-8">
              {!isLoading && user && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold border-2 border-white/10">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-base font-bold text-white truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/user/bookings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-400 font-medium text-sm mb-3"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} />
                      My Bookings
                    </div>
                    <ChevronDown size={16} className="-rotate-90" />
                  </Link>
                </div>
              )}

              {navCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 px-2">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {category.links.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                          isActive(item.href)
                            ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20"
                            : "bg-slate-900/50 text-slate-300 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-800 pt-6">
                <div className="flex items-center gap-4 px-4 py-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="bg-blue-600/20 p-2.5 rounded-full">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-slate-400">Customer Support</p>
                    <Link
                      href="tel:+918130069469"
                      className="font-semibold text-white text-sm"
                    >
                      +91 8130069469 🇮🇳
                    </Link>
                    <Link
                      href="tel:+17863868934"
                      className="font-semibold text-white text-sm"
                    >
                      +1 7863868934 🇺🇸 🇨🇦
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 sticky bottom-0">
              {!isLoading && user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-4 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors text-red-400 font-bold text-sm border border-red-500/20"
                >
                  <LogOut size={18} /> Logout
                </button>
              ) : !isLoading ? (
                <Link
                  href="/user/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-4 py-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-bold text-sm shadow-xl"
                >
                  <User size={18} /> Sign In
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
