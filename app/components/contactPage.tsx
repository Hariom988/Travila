"use client";
import { useState } from "react";
import {
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setFormStatus({ type: "success", message: "Message sent successfully!" });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setFormStatus({ type: null, message: "" }), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-6 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 h-full">
            <div className="bg-white rounded-[20px] border border-slate-100 p-8 md:p-10 shadow-sm flex flex-col h-full">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all"
                  />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-size-[1.25em_1.25em] bg-position-[right_1rem_center] bg-no-repeat"
                  >
                    <option value="">Subject</option>
                    <option value="booking">Booking</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-400 bg-slate-50/30 outline-none text-slate-600 transition-all resize-none flex-1 mb-8"
                />

                <button
                  disabled={isSubmitting}
                  className="w-full md:w-45 py-4 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
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
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Weekdays</span>
                  <span className="font-bold text-[#0F172A]">8 AM - 6 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Saturday</span>
                  <span className="font-bold text-[#0F172A]">9 AM - 5 PM</span>
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

            <div className="rounded-[20px] overflow-hidden border border-slate-100 min-h-55 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56092.516073928455!2d77.27210433305079!3d28.51619823620842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce65f77cae949%3A0x7c768dbb3f78e57!2sBadarpur%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1770118041625!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
