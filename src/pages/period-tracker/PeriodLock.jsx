import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
  ShieldCheck,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function PeriodLock() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito relative overflow-hidden">
      {/* Pink Background Blush */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffe4ed] rounded-full blur-3xl opacity-60"></div>

      {/* FIXED HEADER: Left Back, Center Title, Right Logo */}
      <header className="px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100 relative z-10">
        <button onClick={() => navigate("/home")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>

        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Period Tracker
        </h1>

        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-10 relative z-10">
        {/* Illustration equivalent (using emojis/shapes for clean look) */}
        <div className="relative w-40 h-32 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#ffe4ed] rounded-full blur-xl opacity-50 w-32 h-24 mx-auto top-4"></div>
          <div className="relative z-10 flex items-end">
            <span className="text-5xl">👩🏻</span>
            <div className="bg-white rounded-lg p-1 shadow-sm border border-pink-200 -ml-2 mb-1 flex flex-col items-center">
              <div className="flex gap-1 mb-1">
                <div className="w-1 h-2 bg-[#e91e63] rounded-full"></div>
                <div className="w-1 h-2 bg-[#e91e63] rounded-full"></div>
                <div className="w-1 h-2 bg-[#e91e63] rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-pink-200 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-pink-200 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-[#e91e63] rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-pink-200 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-[22px] font-black text-[#1a237e] text-center mb-10 w-full">
          Protect Your Period Tracker
        </h1>

        <div className="w-full space-y-4 mb-10 px-2">
          <button
            onClick={() => navigate("/period-tracker/setup")}
            className="w-full bg-[#fff0f5] border border-[#fce4ec] rounded-xl p-4 flex items-center justify-between active:bg-pink-100 transition"
          >
            <div className="flex items-center gap-3">
              <Lock size={22} className="text-[#e91e63]" fill="#e91e63" />
              <span className="text-[14px] font-extrabold text-[#1a237e]">
                Set 4-Digit PIN
              </span>
            </div>
            <ChevronRight size={20} className="text-[#e91e63]" />
          </button>

          <button
            onClick={() => navigate("/period-tracker/setup")}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between active:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <Unlock
                size={22}
                className="text-[#64748b]"
                fill="currentColor"
              />
              <span className="text-[14px] font-extrabold text-[#1a237e]">
                Continue Without PIN
              </span>
            </div>
            <ChevronRight size={20} className="text-[#94a3b8]" />
          </button>
        </div>

        <div className="w-full bg-[#e3f2fd] rounded-xl p-4 flex items-center gap-3 mt-auto mb-6">
          <ShieldCheck
            size={24}
            className="text-[#2196F3] flex-shrink-0"
            fill="#2196F3"
          />
          <p className="text-[12px] text-[#1a237e] font-medium leading-relaxed">
            We respect your privacy. Your period data is encrypted and stored
            only on this device.
          </p>
        </div>
      </main>
    </div>
  );
}
