import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">Contact Us</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-10 px-4 pt-4">
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-gray-900">
              Get in touch
            </h2>
            <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed">
              Have a question or need help? Reach out to us and our team will
              get back to you shortly.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <a
              href="tel:+919876543210"
              className="bg-white rounded-2xl border border-[#eaedff] p-3 flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[11.5px] font-bold text-gray-900">Call Us</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  +91 98765 43210
                </p>
              </div>
            </a>

            <a
              href="mailto:support@diabmeta.com"
              className="bg-white rounded-2xl border border-[#eaedff] p-3 flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[11.5px] font-bold text-gray-900">
                  Email Us
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  support@diabmeta.com
                </p>
              </div>
            </a>
          </div>

          {/* Details List (Address & Working Hours) */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-4 mb-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-none text-gray-600 mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-900">
                  Clinic Address
                </p>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  123 Health Avenue, Sector 18,
                  <br />
                  Noida, UP 201301
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#f0f2f8]"></div>

            {/* Working Hours (ALL DAYS) */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-none text-gray-600 mt-0.5">
                <Clock size={16} />
              </div>
              <div className="w-full">
                <p className="text-[12px] font-bold text-gray-900 mb-2">
                  Working Hours
                </p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Monday</span>
                    <span className="font-bold text-gray-800">
                      10:00 AM - 1:00 PM, 6:00 PM - 11:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Tuesday</span>
                    <span className="font-bold text-gray-800">
                      10:00 AM - 1:00 PM, 6:00 PM - 11:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Wednesday</span>
                    <span className="font-bold text-gray-800">
                      10:00 AM - 1:00 PM, 6:00 PM - 11:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Thursday</span>
                    <span className="font-bold text-gray-800">
                      10:00 AM - 1:00 PM, 6:00 PM - 11:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Friday</span>
                    <span className="font-bold text-gray-800">
                      10:00 AM - 1:00 PM, 6:00 PM - 11:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Saturday</span>
                    <span className="font-bold text-gray-800">
                      9:00 AM - 1:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-medium">Sunday</span>
                    <span className="font-bold text-red-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <h3 className="text-[13px] font-bold text-gray-900 mb-3">
              Send a message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[12px] text-gray-800 placeholder-gray-400 transition"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[12px] text-gray-800 placeholder-gray-400 transition"
                required
              />

              <textarea
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[12px] text-gray-800 placeholder-gray-400 transition resize-none h-28"
                required
              ></textarea>

              {submitted ? (
                <div className="w-full bg-[#E0F2F1] text-[#005c55] font-bold text-[12px] py-3.5 rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Message Sent Successfully
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#0d6b63] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2 text-[12.5px]"
                >
                  <Send size={16} /> Send Message
                </button>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
