import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

/* ---------- Icons (reference ke style mein) ---------- */
const CalendarDotsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect
      x="4"
      y="7"
      width="24"
      height="21"
      rx="4"
      stroke="#f0245f"
      strokeWidth="2.8"
    />
    <path d="M4 14h24" stroke="#f0245f" strokeWidth="2.8" />
    <path
      d="M10 3.5v6M22 3.5v6"
      stroke="#f0245f"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <g fill="#f0245f">
      <rect x="9" y="17.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="14.4" y="17.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="19.8" y="17.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="9" y="22.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="14.4" y="22.5" width="3.2" height="3.2" rx="0.9" />
    </g>
  </svg>
);

const DropFilledIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3C16 3 6 14 6 20a10 10 0 0 0 20 0C26 14 16 3 16 3Z"
      fill="#f0245f"
    />
    <path d="M11.5 21.5a5 5 0 0 0 7.5 4.2 6 6 0 0 1-7.5-4.2Z" fill="#ffd1df" />
  </svg>
);

const BarsIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="4" y="16" width="6.5" height="12" rx="1.8" fill="#16a34a" />
    <rect x="12.7" y="9" width="6.5" height="19" rx="1.8" fill="#16a34a" />
    <rect x="21.5" y="3" width="6.5" height="25" rx="1.8" fill="#16a34a" />
  </svg>
);

const BellIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3.5a2 2 0 0 1 2 2v.7c4 1 6.5 4.4 6.5 8.8v4.5l2.3 3.3c.5.8 0 1.7-.9 1.7H6.1c-.9 0-1.4-.9-.9-1.7l2.3-3.3V15c0-4.4 2.5-7.8 6.5-8.8v-.7a2 2 0 0 1 2-2Z"
      fill="#f59e0b"
    />
    <path d="M12.5 27.5h7a3.5 3.5 0 0 1-7 0Z" fill="#f59e0b" />
  </svg>
);

const BookHeartIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M3.5 7.5c4-1.2 8.2-.8 12.5 1.8 4.300-2.600 8.500-3 12.500-1.800V24c-4-1.200-8.200-.8-12.500 1.800C11.700 23.200 7.500 22.800 3.500 24V7.500Z"
      fill="#9333ea"
    />
    <path
      d="M16 20.500s-4.500-2.800-4.500-6a2.600 2.600 0 0 1 4.500-1.700 2.600 2.600 0 0 1 4.500 1.700c0 3.200-4.500 6-4.500 6Z"
      fill="#fff"
    />
  </svg>
);

export default function PeriodHome() {
  const navigate = useNavigate();

  const calendarDays = [
    { d: 27, prev: true },
    { d: 28, prev: true },
    { d: 29, prev: true },
    { d: 30, prev: true },
    { d: 1 },
    { d: 2 },
    { d: 3 },
    { d: 4 },
    { d: 5 },
    { d: 6 },
    { d: 7 },
    { d: 8 },
    { d: 9 },
    { d: 10 },
    { d: 11, type: "period" },
    { d: 12, type: "period" },
    { d: 13, type: "period" },
    { d: 14, type: "period" },
    { d: 15 },
    { d: 16 },
    { d: 17 },
    { d: 18, type: "today" },
    { d: 19 },
    { d: 20 },
    { d: 21 },
    { d: 22 },
    { d: 23 },
    { d: 24 },
    { d: 25 },
    { d: 26 },
    { d: 27 },
    { d: 28, type: "expected" },
    { d: 29, type: "expected" },
    { d: 30, type: "expected" },
    { d: 31 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff4f8] via-[#fff8fb] to-[#fff4f8] flex flex-col font-nunito">
      {/* HEADER (Logo on Right) */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-40">
        <button
          onClick={() => navigate("/period-tracker/lock")}
          className="p-1 w-8"
        >
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-[17px] font-black text-[#1a237e]">
            My Period Tracker
          </h1>
          <p className="text-[11px] text-gray-500 font-medium">
            Track your cycle, symptoms and stay informed.
          </p>
        </div>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {/* CALENDAR */}
        <div className="bg-white rounded-2xl border border-[#fadce7] p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-black text-[#1a237e]">
              October 2026
            </h2>
            <div className="flex gap-3 text-[#1a237e]">
              <ChevronLeft size={18} className="cursor-pointer" />
              <ChevronRight size={18} className="cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-7 text-center mb-2 border-b border-gray-100 pb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <div
                key={i}
                className="text-[11px] font-semibold text-gray-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center">
            {calendarDays.map((item, idx) => {
              let cls =
                "w-8 h-8 mx-auto flex items-center justify-center text-xs font-semibold rounded-full ";
              if (item.prev) cls += "text-gray-300";
              else if (item.type === "period") cls += "bg-[#ef233c] text-white";
              else if (item.type === "today")
                cls += "bg-[#d6eafc] text-[#1a237e]";
              else if (item.type === "expected")
                cls += "bg-[#fde1ea] text-[#f0245f]";
              else cls += "text-[#1a237e]";
              return (
                <div key={idx} className={cls}>
                  {item.d}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-5 text-[11px] text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef233c]"></span>Period
              days
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#fde1ea]"></span>
              Expected period
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#bfe0fb]"></span>Today
            </div>
          </div>
        </div>

        {/* NEXT PERIOD */}
        <div className="bg-[#fde4ee] rounded-xl border border-[#f9cadb] p-4 flex items-center gap-3 mb-5 shadow-sm relative">
          <div className="w-12 h-12 rounded-full bg-[#fbd0e0] flex items-center justify-center flex-shrink-0">
            <CalendarDotsIcon size={24} />
          </div>
          <div>
            <p className="text-[12px] text-gray-600 font-medium">
              Next expected period
            </p>
            <p className="text-[18px] font-black text-[#1a237e]">
              28 October 2026
            </p>
            <p className="text-[13px] text-[#1a237e] font-bold">In 10 days</p>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">
              Estimated from your previous cycle details.
            </p>
          </div>
          {/* Settings Icon */}
          <button className="absolute top-3 right-3 p-1.5 bg-white/60 rounded-full text-[#1a237e]">
            <Settings size={16} />
          </button>
        </div>

        {/* GRID NAVIGATION */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <NavCard
            title="Period Log"
            sub="Bleeding, symptoms & mood"
            icon={<DropFilledIcon size={20} />}
            bg="bg-[#fddae7]"
            onClick={() => navigate("/period-tracker/daily-log")}
          />
          <NavCard
            title="Cycle Insights"
            sub="Patterns, trends & records"
            icon={<BarsIcon size={20} />}
            bg="bg-[#d8f3e1]"
            onClick={() => navigate("/period-tracker/insights")}
          />
          <NavCard
            title="Reminders"
            sub="Manage period alerts"
            icon={<BellIcon size={20} />}
            bg="bg-[#ffe9c7]"
            onClick={() => navigate("/period-tracker/reminders")}
          />
          <NavCard
            title="Period Health Guide"
            sub="Tips, self-care & when to consult a doctor"
            icon={<BookHeartIcon size={20} />}
            bg="bg-[#eadcfb]"
            onClick={() => navigate("/period-tracker/health-guide")}
          />
        </div>

        {/* Info note */}
        <div className="bg-[#e4f0fd] rounded-xl p-4 flex items-start gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 34 34"
            fill="none"
            className="flex-shrink-0 mt-0.5"
          >
            <circle cx="17" cy="17" r="16" fill="#1aa1f0" />
            <circle cx="17" cy="9.5" r="2" fill="#fff" />
            <rect x="15" y="13.5" width="4" height="12" rx="2" fill="#fff" />
          </svg>
          <p className="text-[11.5px] text-[#1a237e] font-medium leading-relaxed">
            Period predictions are estimates and may vary, especially with
            irregular cycles.
          </p>
        </div>
      </main>
    </div>
  );
}

function NavCard({ title, sub, icon, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#fbe6ee] p-3.5 flex flex-col justify-between text-left h-[110px] shadow-sm active:scale-[0.98] transition"
    >
      <div className="flex items-center justify-between w-full">
        <div
          className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}
        >
          {icon}
        </div>
        <ChevronRight size={18} className="text-[#f0245f]" />
      </div>
      <div className="mt-2">
        <p className="text-[14px] font-extrabold text-[#1a237e] leading-tight">
          {title}
        </p>
        <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">
          {sub}
        </p>
      </div>
    </button>
  );
}
