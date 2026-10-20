import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  FileText,
  Building2,
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function Contact() {
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState("platform");

  // Form State
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

  // Short HTML Content
  const platformHtml = `
    <h3 class="text-[14px] font-bold text-[#14284b] mb-2">Welcome to DiabMeta Platform</h3>
    <p>Your complete health-tech companion for tracking metabolic health effortlessly.</p>
    <ul class="list-disc pl-5 mt-3 space-y-1">
      <li>Personalized Health Tracking</li>
      <li>Expert Diet & Activity Plans</li>
      <li>Easy Lab Tests & Consultations</li>
    </ul>
  `;

  const clinicHtml = `
    <h3 class="text-[14px] font-bold text-[#14284b] mb-2">Advanced Metabolic Care</h3>
    <p>State-of-the-art facilities with experienced healthcare professionals.</p>
    <ul class="list-disc pl-5 mt-3 space-y-1">
      <li>Comprehensive Health Checkups</li>
      <li>Specialized Doctor Consultations</li>
      <li>NABL Certified Lab Testing</li>
    </ul>
  `;

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
            <h1 className="font-bold text-gray-900 text-[15px]">About Us</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-10 px-4 pt-4">
          {/* TABS */}
          <div className="flex bg-[#f0f2f8] p-1 rounded-xl mb-5">
            <button
              onClick={() => setActiveTab("platform")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-bold transition ${
                activeTab === "platform"
                  ? "bg-white text-[#005c55] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText size={14} className="flex-shrink-0" />
              <span className="whitespace-nowrap">About DiabMeta Platform</span>
            </button>
            <button
              onClick={() => setActiveTab("clinic")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-bold transition ${
                activeTab === "clinic"
                  ? "bg-white text-[#005c55] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Building2 size={14} className="flex-shrink-0" />
              <span className="whitespace-nowrap">About DiabMeta Clinic</span>
            </button>
          </div>

          {/* TAB CONTENT (HTML RENDER) */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div
              className="text-[12px] text-[#3b4a66] leading-relaxed
                         [&>p]:mb-2 
                         [&_strong]:font-bold [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{
                __html: activeTab === "platform" ? platformHtml : clinicHtml,
              }}
            />
          </div>

          {/* CONTACT FORM */}
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
