import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, X } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";
import bgDecor from "../../assets/periodtracker/period-setup-bg.png";

/* ---------- Icons (reference ke style mein, size prop ke saath) ---------- */
const CalendarBadgeIcon = ({ size = 18 }) => (
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
      <rect x="9" y="17.5" width="3" height="3" rx="0.8" />
      <rect x="14.5" y="17.5" width="3" height="3" rx="0.8" />
      <rect x="20" y="17.5" width="3" height="3" rx="0.8" />
      <rect x="9" y="22.5" width="3" height="3" rx="0.8" />
      <rect x="14.5" y="22.5" width="3" height="3" rx="0.8" />
    </g>
  </svg>
);

const DropIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3.5C16 3.5 6.5 14 6.5 19.5a9.5 9.5 0 0 0 19 0C25.5 14 16 3.5 16 3.5Z"
      stroke="#f0245f"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="20" r="2.8" fill="#f0245f" />
  </svg>
);

const CycleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M26 13a10.5 10.5 0 0 0-19-3.5"
      stroke="#f0245f"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M7 4.5v5.5h5.5"
      stroke="#f0245f"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 19a10.5 10.5 0 0 0 19 3.5"
      stroke="#f0245f"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M25 27.5V22h-5.5"
      stroke="#f0245f"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SmallCalendar = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3 10h18M8 3v4M16 3v4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SmallCalendarGrid = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3 10h18M8 3v4M16 3v4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <g fill="currentColor">
      <rect x="7" y="12.5" width="2" height="2" rx="0.5" />
      <rect x="11" y="12.5" width="2" height="2" rx="0.5" />
      <rect x="15" y="12.5" width="2" height="2" rx="0.5" />
      <rect x="7" y="16" width="2" height="2" rx="0.5" />
      <rect x="11" y="16" width="2" height="2" rx="0.5" />
      <rect x="15" y="16" width="2" height="2" rx="0.5" />
    </g>
  </svg>
);

const InfoIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
    <circle cx="17" cy="17" r="16" fill="#1aa1f0" />
    <circle cx="17" cy="9.5" r="2" fill="#fff" />
    <rect x="15" y="13.5" width="4" height="12" rx="2" fill="#fff" />
  </svg>
);

/* Small pink round badge behind the title icon */
const IconBadge = ({ children }) => (
  <div className="w-8 h-8 rounded-full bg-[#ffe1ea] flex items-center justify-center flex-shrink-0">
    {children}
  </div>
);

export default function PeriodSetup() {
  const navigate = useNavigate();

  // Q2 State (Period Duration)
  const [duration, setDuration] = useState(null);

  // Q3 State (Cycle Length)
  const [cycle, setCycle] = useState(null);

  // Date Picker States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedYear, setSelectedYear] = useState(2026);

  const durations = [
    "3 days",
    "4 days",
    "5 days",
    "6 days",
    "7 days",
    "Not sure / Varies",
  ];
  const cycles = [
    "21–24 days",
    "25–27 days",
    "28 days",
    "29–35 days",
    "Irregular / Not sure",
  ];

  const handleDateSelect = (day) => {
    setSelectedDay(day);
    setShowDatePicker(false);
  };

  const radioClass = (active) =>
    `flex items-center gap-2 p-3 rounded-lg border text-[13px] font-bold text-left ${
      active
        ? "border-[#f0245f] bg-[#fff0f5] text-[#f0245f]"
        : "border-[#e3e8f4] bg-white text-[#1a237e]"
    }`;

  const Dot = ({ active }) => (
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
        active ? "border-[#f0245f]" : "border-gray-300"
      }`}
    >
      {active && <div className="w-2 h-2 rounded-full bg-[#f0245f]" />}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fff8fb] flex flex-col font-nunito relative overflow-hidden">
      {/* FIXED HEADER: Left Back, Center Title, Right Logo */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-40">
        <button
          onClick={() => navigate("/period-tracker/lock")}
          className="p-1 w-8"
        >
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>

        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Setup Tracker
        </h1>

        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      {/* Top-right hair decoration (sirf background, layout pe effect nahi) */}
      <img
        src={bgDecor}
        alt=""
        draggable={false}
        className="absolute top-[56px] right-0 w-[200px] pointer-events-none select-none z-0"
      />

      <main className="flex-1 px-4 py-5 overflow-y-auto relative z-10">
        <h1 className="text-[28px] font-black text-[#1a237e] leading-tight mb-1">
          A Step Towards
          <br />
          <span className="text-[#f0245f]">Better Menstrual Health</span>
        </h1>
        <p className="text-[14px] text-gray-600 mb-6">
          Answer 3 quick questions to help track your period.
        </p>

        {/* Q1 */}
        <div className="bg-white/90 rounded-xl border border-[#fadce7] p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <IconBadge>
              <CalendarBadgeIcon size={18} />
            </IconBadge>
            <h3 className="text-[15px] font-extrabold text-[#1a237e]">
              1. When did your last period start?
            </h3>
          </div>
          <div
            onClick={() => setShowDatePicker(true)}
            className="flex items-center justify-between px-3 py-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer active:bg-gray-100"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <SmallCalendar size={16} />
              <span className="text-[13px] font-medium">
                {selectedDay
                  ? `${selectedDay} ${selectedMonth} ${selectedYear}`
                  : "Select first day of last period"}
              </span>
            </div>
            <SmallCalendarGrid size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Q2 */}
        <div className="bg-white/90 rounded-xl border border-[#fadce7] p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <IconBadge>
              <DropIcon size={18} />
            </IconBadge>
            <h3 className="text-[15px] font-extrabold text-[#1a237e]">
              2. How many days does your period usually last?
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={radioClass(duration === d)}
              >
                <Dot active={duration === d} />
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="bg-white/90 rounded-xl border border-[#fadce7] p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <IconBadge>
              <CycleIcon size={18} />
            </IconBadge>
            <h3 className="text-[15px] font-extrabold text-[#1a237e]">
              3. What is your usual menstrual cycle length?
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cycles.map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={radioClass(cycle === c)}
              >
                <Dot active={cycle === c} />
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="bg-[#e4f0fd] rounded-lg p-3 flex items-start gap-2 mb-6">
          <div className="flex-shrink-0 mt-0.5">
            <InfoIcon size={18} />
          </div>
          <p className="text-[11.5px] text-[#1a237e] leading-relaxed font-medium">
            Your cycle length is counted from the first day of one period to the
            first day of the next. You can update these details later.
          </p>
        </div>

        <button
          onClick={() => navigate("/period-tracker")}
          className="w-full bg-[#f0245f] text-white font-extrabold text-[15px] py-4 rounded-full flex items-center justify-center gap-2"
        >
          Continue to My Period Tracker <ArrowRight size={18} />
        </button>
      </main>

      {/* Date picker */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-[#1a237e]">
                {selectedMonth} {selectedYear}
              </h3>
              <button
                onClick={() => setShowDatePicker(false)}
                className="p-1 bg-gray-100 rounded-full"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-[10px] font-bold text-gray-400">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(31)].map((_, i) => {
                const dayNum = i + 1;
                const isSelected = selectedDay === dayNum;
                return (
                  <button
                    key={i}
                    onClick={() => handleDateSelect(dayNum)}
                    className={`h-9 w-9 mx-auto flex items-center justify-center text-xs font-semibold rounded-full transition-colors
                      ${isSelected ? "bg-[#f0245f] text-white" : "text-[#1a237e] active:bg-gray-100"}`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
