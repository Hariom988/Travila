"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 7856839450", "+91 9878677770"],
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@travila.com", "info@travila.com"],
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Connaught Place", "New Delhi, 110001"],
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 8 AM – 5 PM", "Sunday: CLOSED"],
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: "Thank you! We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setFormStatus({ type: null, message: "" }), 5000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <section className="relative py-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.05),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#0F172A] tracking-tight">
            Get In <span className="text-slate-500">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="bg-white border cursor-pointer border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group text-center flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                >
                  <info.icon size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p
                    key={i}
                    className="text-xs md:text-sm text-slate-500 font-medium"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 h-full">
              <div className="bg-white rounded-[20px] border border-slate-100 p-8 md:p-10 shadow-sm flex flex-col h-full">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
                  Send a Message
                </h2>

                {formStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${formStatus.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <p className="text-sm font-semibold">
                      {formStatus.message}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all text-sm"
                    />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-size-[1.25em_1.25em] bg-position-[right_1rem_center] bg-no-repeat text-sm"
                    >
                      <option value="">Subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all resize-none flex-1 mb-8 text-sm"
                  />
                  <button
                    disabled={isSubmitting}
                    className="w-full md:w-45 py-4 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 h-full">
              <div className="p-8 bg-[#0F172A] rounded-[20px] text-white flex items-center gap-5 shadow-lg">
                <div className="p-3 border border-slate-700 rounded-full">
                  <MessageCircle size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Live Support</h3>
                  <p className="text-sm text-slate-400">
                    Response time: ~2 hours
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[20px] shadow-sm flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                  Availability
                </h3>
                <div className="space-y-4 mb-auto">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Weekdays</span>
                    <span className="font-bold text-[#0F172A]">
                      8 AM - 6 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Saturday</span>
                    <span className="font-bold text-[#0F172A]">
                      9 AM - 5 PM
                    </span>
                  </div>
                </div>
                <div className="pt-8 flex gap-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-slate-50 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-all flex items-center justify-center border border-slate-100"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] overflow-hidden border border-slate-100 min-h-55 shadow-sm flex-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.5575239061236!2d77.0006853113029!3d28.586992186045496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d100ef8bfb055%3A0x97c7f2a44a784c95!2sH2P3%2BQ8R%2C%20Deenpur%2C%20Shyam%20Vihar%20-%20II%2C%20Najafgarh%2C%20Delhi!5e1!3m2!1sen!2sin!4v1770637329313!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Quick answers to common questions about your journey.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How do I make a booking?",
                a: "Search for your destination, select your trek, and complete the booking process. It takes under 5 minutes.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, UPI, net banking, and digital wallets.",
              },
              {
                q: "Can I cancel my booking?",
                a: "Yes, cancellations up to 48 hours before the trip are eligible for a full refund per policy.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-slate-50/50 transition-all font-bold text-slate-800">
                  {faq.q}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed font-medium">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
