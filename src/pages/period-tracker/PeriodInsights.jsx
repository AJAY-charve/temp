import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Heart,
  Activity,
  Smile,
  Footprints,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

/* ---------- Icons (reference ke style mein) ---------- */
const CalendarDotsIcon = ({ size = 16 }) => (
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

const CalendarHeartIcon = ({ size = 16 }) => (
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
    <path
      d="M16 25s-5-3.1-5-6.6a2.9 2.9 0 0 1 5-1.9 2.9 2.9 0 0 1 5 1.9c0 3.5-5 6.6-5 6.6Z"
      fill="#f0245f"
    />
  </svg>
);

const DropIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3C16 3 6 14 6 20a10 10 0 0 0 20 0C26 14 16 3 16 3Z"
      fill="#f0245f"
    />
    <path d="M11.5 21.5a5 5 0 0 0 7.5 4.2 6 6 0 0 1-7.5-4.2Z" fill="#ffd1df" />
  </svg>
);

const PulseIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M2.5 16.5h6l3-8 5 16 4-12 2 4h7"
      stroke="#f0245f"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClipboardIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect
      x="5.5"
      y="5"
      width="21"
      height="24"
      rx="4"
      stroke="#f0245f"
      strokeWidth="2.6"
    />
    <rect x="11" y="2.5" width="10" height="6" rx="2" fill="#f0245f" />
    <path
      d="M10.5 15h11M10.5 20h11M10.5 25h6"
      stroke="#f0245f"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const HistoryIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M5.5 16a10.5 10.5 0 1 0 3.3-7.6"
      stroke="#f0245f"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M5 4.5v6h6"
      stroke="#f0245f"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 10v6.5l4 2.5"
      stroke="#f0245f"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Round pink badge */
const Badge = ({ children, size = "w-8 h-8" }) => (
  <div
    className={`${size} rounded-full bg-[#ffe1ea] flex items-center justify-center flex-shrink-0`}
  >
    {children}
  </div>
);

export default function PeriodInsights() {
  const navigate = useNavigate();

  const cycleData = [
    { month: "Apr", value: 27 },
    { month: "May", value: 29 },
    { month: "Jun", value: 28 },
    { month: "Jul", value: 31 },
    { month: "Aug", value: 30 },
    { month: "Sep", value: 28 },
  ];

  const bleedingData = [
    { day: "Day 1", value: 3, color: "#f9669a" },
    { day: "Day 2", value: 4, color: "#e63a78" },
    { day: "Day 3", value: 3, color: "#ef4c85" },
    { day: "Day 4", value: 2, color: "#fb8fb5" },
    { day: "Day 5", value: 1, color: "#fdbad2" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff4f8] via-[#fff8fb] to-[#fff4f8] flex flex-col font-nunito">
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-200">
        <button onClick={() => navigate("/period-tracker")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <h1 className="text-base font-black text-[#1a237e] flex-1 text-center">
          Period Insights
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-4 overflow-y-auto space-y-4 pb-10">
        <p className="text-[13px] text-[#6b7390] font-medium -mb-1">
          Understand your cycle patterns and menstrual health.
        </p>

        {/* OVERVIEW */}
        <div className="bg-white rounded-2xl border border-[#fadce7] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-black text-[#1a237e]">
              Your Cycle Overview
            </h2>
            <button className="flex items-center gap-1 text-[11px] font-bold text-[#1a237e] bg-[#f4f6fb] px-3 py-1.5 rounded-full border border-gray-200">
              Last 6 cycles <ChevronDown size={14} className="text-[#1a237e]" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#fffafc] rounded-xl border border-[#fbe6ee] p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Badge>
                  <CalendarDotsIcon size={16} />
                </Badge>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">
                  Average Cycle Length
                </span>
              </div>
              <p className="text-lg font-black text-[#1a237e] ml-1 mt-1">
                28 days
              </p>
              <p className="text-[10px] text-gray-500 font-medium ml-1">
                (Range 26 – 32 days)
              </p>
            </div>

            <div className="bg-[#fffafc] rounded-xl border border-[#fbe6ee] p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Badge>
                  <DropIcon size={16} />
                </Badge>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">
                  Average Period Duration
                </span>
              </div>
              <p className="text-lg font-black text-[#1a237e] ml-1 mt-1">
                5 days
              </p>
              <p className="text-[10px] text-gray-500 font-medium ml-1">
                (Range 4 – 6 days)
              </p>
            </div>

            <div className="bg-[#fffafc] rounded-xl border border-[#fbe6ee] p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Badge>
                  <PulseIcon size={16} />
                </Badge>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">
                  Cycle Regularity
                </span>
              </div>
              <p className="text-lg font-black text-[#1a237e] ml-1 mt-1">
                Consistent
              </p>
              <p className="text-[10px] text-gray-500 font-medium ml-1">
                (Variation ± 3 days)
              </p>
            </div>

            <div className="bg-[#fffafc] rounded-xl border border-[#fbe6ee] p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Badge>
                  <CalendarHeartIcon size={16} />
                </Badge>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">
                  Last Period
                </span>
              </div>
              <p className="text-lg font-black text-[#1a237e] ml-1 mt-1">
                11 Oct 2026
              </p>
            </div>
          </div>

          <div className="bg-[#fde8f0] rounded-xl p-3 flex items-center gap-3 border border-[#f9cadb]">
            <div className="w-12 h-12 rounded-full bg-[#fbc9dc] flex items-center justify-center flex-shrink-0">
              <Zap size={22} className="text-[#f0245f]" fill="#f0245f" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 mb-0.5">
                Most Troublesome Symptom
              </p>
              <p className="text-sm font-black text-[#1a237e] mb-0.5">
                Abdominal Cramps
              </p>
              <p className="text-[10px] text-gray-500 font-medium">
                Most frequently recorded moderate-to-severe symptom
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 gap-4">
          {/* Cycle Length Trends */}
          <div className="bg-white rounded-2xl border border-[#fadce7] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Badge size="w-7 h-7">
                <CalendarDotsIcon size={14} />
              </Badge>
              <h3 className="text-sm font-black text-[#1a237e]">
                Cycle Length Trends
              </h3>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mb-4">
              Length of your last 6 cycles
            </p>

            <div className="relative h-40 flex items-end">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-gray-400 font-bold pb-6">
                <span>40</span>
                <span>35</span>
                <span>30</span>
                <span>25</span>
                <span>20</span>
              </div>

              <div className="ml-8 flex-1 h-full relative border-l border-b border-gray-200 pb-6">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                </div>

                <svg
                  className="absolute inset-0 w-full h-full overflow-visible pb-6"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 8 80 L 25 60 L 42 70 L 58 40 L 75 50 L 92 70 L 92 100 L 8 100 Z"
                    fill="rgba(240, 36, 95, 0.1)"
                  />
                  <path
                    d="M 8 80 L 25 60 L 42 70 L 58 40 L 75 50 L 92 70"
                    fill="none"
                    stroke="#f0245f"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-end justify-between px-1 pb-0">
                  {cycleData.map((d, i) => {
                    const bottomPercent = ((d.value - 20) / 20) * 100;
                    return (
                      <div
                        key={i}
                        className="relative flex flex-col items-center w-6 h-full justify-end pb-1"
                      >
                        <span
                          className="absolute text-[10px] font-black text-[#1a237e]"
                          style={{ bottom: `calc(${bottomPercent}% + 8px)` }}
                        >
                          {d.value}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full bg-white border-2 border-[#f0245f] absolute z-10"
                          style={{ bottom: `calc(${bottomPercent}% - 4px)` }}
                        ></div>
                        <span className="text-[9px] text-gray-500 font-bold absolute -bottom-6">
                          {d.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="text-[9px] text-gray-400 font-bold text-center mt-8">
              Cycle Length (days)
            </p>
          </div>

          {/* Bleeding Pattern */}
          <div className="bg-white rounded-2xl border border-[#fadce7] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Badge size="w-7 h-7">
                <DropIcon size={14} />
              </Badge>
              <h3 className="text-sm font-black text-[#1a237e]">
                Bleeding Pattern
              </h3>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mb-4">
              Average bleeding intensity (Day-wise)
            </p>

            <div className="relative h-40 flex items-end">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-gray-400 font-bold pb-6">
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>0</span>
              </div>

              <div className="ml-8 flex-1 h-full relative border-l border-b border-gray-200 pb-6 flex items-end justify-around px-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                </div>

                {bleedingData.map((d, i) => {
                  const heightPercent = (d.value / 4) * 100;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center z-10 w-8"
                    >
                      <span className="text-[10px] font-black text-[#1a237e] mb-1">
                        {d.value}
                      </span>
                      <div
                        className="w-full rounded-t-md"
                        style={{
                          height: `${heightPercent * 0.8}px`,
                          backgroundColor: d.color,
                        }}
                      ></div>
                      <span className="text-[9px] text-gray-500 font-bold absolute -bottom-6">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-[9px] text-gray-400 font-bold text-center mt-8">
              Flow Level
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-[#fff4f8] p-2 rounded-lg">
              <span className="text-[9px] text-gray-500 font-medium">
                0 = No bleeding
              </span>
              <span className="text-[9px] text-gray-500 font-medium">
                1 = Spotting
              </span>
              <span className="text-[9px] text-gray-500 font-medium">
                2 = Light
              </span>
              <span className="text-[9px] text-gray-500 font-medium">
                3 = Moderate
              </span>
              <span className="text-[9px] text-gray-500 font-medium">
                4 = Heavy
              </span>
            </div>
          </div>
        </div>

        {/* COMMON SYMPTOMS */}
        <div className="bg-white rounded-2xl border border-[#fadce7] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Badge size="w-7 h-7">
              <ClipboardIcon size={14} />
            </Badge>
            <h3 className="text-sm font-black text-[#1a237e]">
              Common Symptoms
            </h3>
          </div>
          <p className="text-[11px] text-gray-500 font-medium mb-4">
            Number of days with symptoms (last 6 cycles)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <SymptomBar
              icon={<Zap size={14} className="text-[#f0245f]" fill="#f0245f" />}
              label="Abdominal Cramps"
              val="4 days"
              width="w-[70%]"
            />
            <SymptomBar
              icon={
                <Heart size={14} className="text-[#f0245f]" fill="#f0245f" />
              }
              label="Breast Tenderness"
              val="3 days"
              width="w-[50%]"
            />
            <SymptomBar
              icon={<Activity size={14} className="text-[#f0245f]" />}
              label="Back Pain"
              val="3 days"
              width="w-[50%]"
            />
            <SymptomBar
              icon={<Smile size={14} className="text-[#f0245f]" />}
              label="Mood Changes"
              val="2 days"
              width="w-[30%]"
            />
            <SymptomBar
              icon={<Footprints size={14} className="text-[#f0245f]" />}
              label="Leg Pain"
              val="2 days"
              width="w-[30%]"
            />
          </div>
        </div>

        {/* PREVIOUS RECORDS */}
        <div className="bg-white rounded-2xl border border-[#fadce7] p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge size="w-7 h-7">
                <HistoryIcon size={14} />
              </Badge>
              <div>
                <h3 className="text-sm font-black text-[#1a237e]">
                  Previous Period Records
                </h3>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                  Your last 6 recorded periods
                </p>
              </div>
            </div>
            <button className="text-[11px] font-bold text-[#f0245f] flex items-center gap-1">
              View All Records <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border border-gray-200">
              <thead>
                <tr className="bg-[#eef3fb] text-[#1a237e] font-bold border-b border-gray-200">
                  <th className="py-2.5 px-3 font-bold border-r border-gray-200">
                    Period Start Date
                  </th>
                  <th className="py-2.5 px-3 font-bold border-r border-gray-200">
                    Period End Date
                  </th>
                  <th className="py-2.5 px-3 font-bold text-center border-r border-gray-200">
                    Duration (days)
                  </th>
                  <th className="py-2.5 px-3 font-bold text-center">
                    Cycle Length (days)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["11 Oct 2026", "15 Oct 2026", "5", "28"],
                  ["13 Sep 2026", "17 Sep 2026", "5", "30"],
                  ["14 Aug 2026", "18 Aug 2026", "5", "31"],
                ].map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 bg-white last:border-b-0"
                  >
                    <td className="py-3 px-3 font-medium text-[#1a237e] border-r border-gray-100">
                      {r[0]}
                    </td>
                    <td className="py-3 px-3 text-gray-600 border-r border-gray-100">
                      {r[1]}
                    </td>
                    <td className="py-3 px-3 text-center text-gray-600 border-r border-gray-100">
                      {r[2]}
                    </td>
                    <td className="py-3 px-3 text-center text-gray-600">
                      {r[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function SymptomBar({ icon, label, val, width }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-[#ffe1ea] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-[#1a237e] w-[105px] truncate">
        {label}
      </span>
      <div className="flex-1 bg-[#e8ebf3] h-2 rounded-full overflow-hidden">
        <div
          className={`bg-gradient-to-r from-[#f0245f] to-[#ff4d8d] h-full rounded-full ${width}`}
        ></div>
      </div>
      <span className="text-[10px] font-semibold text-gray-500 w-10 text-right">
        {val}
      </span>
    </div>
  );
}
