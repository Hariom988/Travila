"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle2,
  AlertCircle,
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
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@travila.com", "info@travila.com"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Connaught Place", "New Delhi, Delhi 110001, India"],
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 8 AM – 5 PM", "Sunday: CLOSED"],
      color: "from-green-500 to-green-600",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    setTimeout(() => {
      setFormStatus({
        type: "success",
        message:
          "Thank you for contacting us! We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
      }, 5000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-linear(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCAzLjk5LTRDNDIuMiAzMCA0NCAzMS43OSA0NCAzNGMwIDIuMjEtMS44IDQtNC4wMSA0LTIuMiAwLTMuOTktMS43OS0zLjk5LTR6bTAgMjBjMC0yLjIxIDEuNzktNCAzLjk5LTRDNDIuMiA1MCA0NCA1MS43OSA0NCA1NGMwIDIuMjEtMS44IDQtNC4wMSA0LTIuMiAwLTMuOTktMS43OS0zLjk5LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgMy45OS00QzI2LjIgMzAgMjggMzEuNzkgMjggMzRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00em0wIDIwYzAtMi4yMSAxLjc5LTQgMy45OS00QzI2LjIgNTAgMjggNTEuNzkgMjggNTRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00ek00IDM0YzAtMi4yMSAxLjc5LTQgMy45OS00QzEwLjIgMzAgMTIgMzEuNzkgMTIgMzRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00em0wIDIwYzAtMi4yMSAxLjc5LTQgMy45OS00QzEwLjIgNTAgMTIgNTEuNzkgMTIgNTRjMCAyLjIxLTEuOCA0LTQuMDEgNC0yLjIgMC0zLjk5LTEuNzktMy45OS00ek01MiAzNGMwLTIuMjEgMS43OS00IDMuOTktNEM1OC4yIDMwIDYwIDMxLjc5IDYwIDM0YzAgMi4yMS0xLjggNC00LjAxIDQtMi4yIDAtMy45OS0xLjc5LTMuOTktNHptMCAyMGMwLTIuMjEgMS43OS00IDMuOTktNEM1OC4yIDUwIDYwIDUxLjc5IDYwIDU0YzAgMi4yMS0xLjggNC00LjAxIDQtMi4yIDAtMy45OS0xLjc5LTMuOTktNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-tr from-purple-200 via-purple-400 to-purple-200">
              Get In Touch
            </span>
            <br />
            <span className="text-white">With Travila</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto px-4">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="group cursor-pointer bg-slate-800/30 flex flex-col justify-center items-center backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-slate-800/50 transition-all hover:scale-102"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br ${info.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p
                    key={i}
                    className="text-[10px] sm:text-xs md:text-sm text-slate-400 leading-relaxed"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-12">
            <div className="lg:col-span-3">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </p>
                </div>

                {formStatus.type === "success" && (
                  <div className="mb-6 p-3 sm:p-4 bg-green-600/20 border border-green-500/30 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-green-300">
                      {formStatus.message}
                    </p>
                  </div>
                )}

                {formStatus.type === "error" && (
                  <div className="mb-6 p-3 sm:p-4 bg-red-600/20 border border-red-500/30 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-red-300">
                      {formStatus.message}
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs sm:text-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs sm:text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs sm:text-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs sm:text-sm"
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-xs sm:text-sm"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-r bg-purple-700 hover:bg-purple-800  text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all disabled:opacity-50 cursor-pointer  flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-linear-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Quick Response Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 sm:mb-4">
                  We typically respond within 2-4 hours during business hours.
                  For urgent matters, please call us directly.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-slate-400">
                    Average response time: 3 hours
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Follow Us
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">
                  Stay connected with us on social media
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      aria-label={social.label}
                      className="aspect-square bg-slate-900/50 border border-slate-700 rounded-xl hover:bg-slate-900 hover:border-purple-500 transition-all flex items-center justify-center group"
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-slate-400">Monday - Friday</span>
                    <span className="text-white font-medium">8 AM - 6 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-white font-medium">9 AM - 5 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-red-400 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="aspect-video bg-slate-900/50 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56092.516073928455!2d77.27210433305079!3d28.51619823620842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce65f77cae949%3A0x7c768dbb3f78e57!2sBadarpur%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1770118041625!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-8 sm:space-y-4">
            {[
              {
                q: "How do I make a booking?",
                a: "Simply search for your destination, select your preferred hotel, choose dates, and complete the booking process. It takes less than 5 minutes!",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, UPI, net banking, and popular digital wallets.",
              },
              {
                q: "Can I cancel or modify my booking?",
                a: "Yes, you can cancel or modify your booking up to 48 hours before check-in for a full refund. Some properties may have different policies.",
              },
              {
                q: "Do you offer customer support?",
                a: "Absolutely! Our customer support team is available Mon-Sat, 8 AM - 5 PM. You can reach us via phone, email, or live chat.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group  bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <summary className="px-4 p-2 sm:px-6 py-3 sm:py-4 cursor-pointer list-none flex items-center justify-between hover:bg-slate-800/50 transition-all">
                  <span className="text-xs sm:text-sm md:text-base font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <span className="text-purple-400 group-open:rotate-180 transition-transform shrink-0">
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
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
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
