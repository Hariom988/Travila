"use client";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotel" },
    { name: "Activities", href: "/activities" },
    { name: "Trains", href: "/train" },
    { name: "Buses", href: "/bus" },
    { name: "Cabs", href: "/cabs" },
    { name: "Cruise", href: "/cruise" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms And Conditions", href: "/terms-and-conditions" },
    { name: "Refunds Policy", href: "/refund-policy" },
  ];

  return (
    <footer className="w-full bg-[#050014] text-gray-400 font-sans border-t border-[#6300ee]/20">
      <div className="container mx-auto px-5 py-8 md:py-16">
        <div className="flex flex-row justify-between items-center mb-8 border-b border-white/5 pb-6 md:border-0 md:pb-0 md:mb-12">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-[#050014] font-black text-lg">9</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white leading-tight">
                Travila
              </span>
              <span className="text-[7px] tracking-[0.2em] uppercase text-[#6300ee] font-bold">
                Travel Agency
              </span>
            </div>
          </Link>

          <div className="flex gap-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="p-2 rounded-md bg-white/5 hover:bg-[#6300ee] hover:text-white transition-all"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-8 gap-x-4">
          <div className="col-span-2 md:col-span-7">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4 opacity-50">
              Explore Services
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm hover:text-[#6300ee] transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4 opacity-50">
              Policies
            </h3>
            <ul className="space-y-3">
              {policyLinks.map((policy) => (
                <li key={policy.name}>
                  <Link
                    href={policy.href}
                    className="text-xs md:text-sm hover:text-[#6300ee] transition-colors block"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4 opacity-50">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-[#6300ee]" />
                <span className="text-gray-300">9878677770</span>
              </div>
              <div className="flex items-start gap-2 text-xs leading-tight">
                <MapPin className="w-3.5 h-3.5 text-[#6300ee] shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border-t border-white/5 py-5">
        <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] md:text-xs text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400 font-medium">Travila</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
