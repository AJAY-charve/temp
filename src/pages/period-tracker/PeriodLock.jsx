import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";
import illustration from "../../assets/periodtracker/period-illustration.png";

/* ---------- Custom icons ---------- */
const LockIcon = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M9.5 14V10.5a6.5 6.5 0 0 1 13 0V14"
      stroke="#e8305f"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect x="5" y="13" width="22" height="16" rx="3.5" fill="#e8305f" />
    <circle cx="16" cy="20" r="2.2" fill="#fff" />
    <rect x="15" y="21" width="2" height="4.5" rx="1" fill="#fff" />
  </svg>
);

const UnlockIcon = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M17.5 14V9.5a5.5 5.5 0 0 1 11 0V12"
      stroke="#64748b"
      strokeWidth="3"
      strokeLinecap="round"
      transform="translate(-4 -2)"
    />
    <rect x="3" y="13" width="22" height="16" rx="3.5" fill="#64748b" />
    <circle cx="14" cy="20" r="2.2" fill="#fff" />
    <rect x="13" y="21" width="2" height="4.5" rx="1" fill="#fff" />
  </svg>
);

const ShieldCheckIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
    <path
      d="M20 2 4 8v13c0 10 7 18 16 21 9-3 16-11 16-21V8L20 2Z"
      fill="#1e88e5"
    />
    <path
      d="m12.5 22 5.5 5.5L28 16.5"
      stroke="#fff"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PeriodLock() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-nunito relative overflow-hidden">
      {/* FIXED HEADER: Left Back, Center Title, Right Logo */}
      <header className="px-4 py-4 flex items-center justify-between bg-white relative z-10">
        <button onClick={() => navigate("/home")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>

        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Period Tracker
        </h1>

        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      {/* soft pink fade under header */}
      <div className="h-6 bg-gradient-to-b from-[#fff1f6] to-transparent -mt-0.5" />

      <main className="flex-1 flex flex-col items-center px-5 pt-6 relative z-10">
        {/* Illustration */}
        <img
          src={illustration}
          alt="Period Tracker"
          className="w-[270px] h-auto mb-5 select-none"
          draggable={false}
        />

        <h2 className="text-[24px] font-extrabold text-[#1a1f6b] text-center mb-12 w-full leading-tight">
          Protect Your Period Tracker
        </h2>

        <div className="w-full max-w-[320px] space-y-4">
          {/* Set PIN */}
          <button
            onClick={() => navigate("/period-tracker/setup")}
            className="w-full bg-[#fff0f5] border border-[#fadce7] rounded-xl px-5 py-4 flex items-center justify-between active:bg-pink-100 transition"
          >
            <div className="flex items-center gap-4">
              <LockIcon />
              <span className="text-[15px] font-bold text-[#1a1f6b]">
                Set 4-Digit PIN
              </span>
            </div>
            <ChevronRight
              size={22}
              className="text-[#e8305f]"
              strokeWidth={2.5}
            />
          </button>

          {/* Continue Without PIN */}
          <button
            onClick={() => navigate("/period-tracker/setup")}
            className="w-full bg-white border border-[#e3e8f2] rounded-xl px-5 py-4 flex items-center justify-between active:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <UnlockIcon />
              <span className="text-[15px] font-bold text-[#1a1f6b]">
                Continue Without PIN
              </span>
            </div>
            <ChevronRight
              size={22}
              className="text-[#64748b]"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Privacy note */}
        <div className="w-full bg-[#e8f3fd] rounded-xl px-5 py-4 flex items-center gap-4 mt-auto mb-8">
          <div className="flex-shrink-0">
            <ShieldCheckIcon size={34} />
          </div>
          <p className="text-[13px] text-[#1a1f6b] font-normal leading-relaxed">
            We respect your privacy. Your period data is encrypted and stored
            only on this device.
          </p>
        </div>
      </main>
    </div>
  );
}
