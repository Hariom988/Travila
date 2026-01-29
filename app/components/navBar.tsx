"use client";
import { useState, useEffect } from "react";
import { Phone, User, Menu, X, LogOut } from "lucide-react";
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotel" },
  ];

  // Check if user is authenticated on component mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify");

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
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
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/user/logout", {
        method: "POST",
      });
      setUser(null);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get initials from user name for avatar
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

          {/* User Profile or Login Button */}
          {!isLoading && user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-sm font-bold">
                  {getInitials(user.name)}
                </div>
                {/* User Name */}
                <span className="text-sm font-medium">
                  {user.name || user.email}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transition-all duration-200 ${
                  isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/user/auth"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          )}
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

          {/* Mobile User Section */}
          {!isLoading && user ? (
            <div className="flex flex-col items-center gap-4 w-full px-8 mt-4">
              {/* User Avatar and Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-lg font-bold">
                  {getInitials(user.name)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{user.name || "User"}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/user/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-purple-600 px-8 py-3 rounded-full mt-4"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
