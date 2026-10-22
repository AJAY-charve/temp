import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BarChart2,
  Droplet,
  Activity,
  Calendar,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

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
    { day: "Day 1", value: 3 },
    { day: "Day 2", value: 4 },
    { day: "Day 3", value: 3 },
    { day: "Day 4", value: 2 },
    { day: "Day 5", value: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito">
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
        {/* OVERVIEW */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-black text-[#1a237e]">
              Your Cycle Overview
            </h2>
            <button className="flex items-center gap-1 text-[11px] font-bold text-[#1a237e] bg-[#f4f6fb] px-3 py-1.5 rounded-full border border-gray-200">
              Last 6 cycles <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#fcfcfd] rounded-xl border border-gray-100 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                  <Calendar size={16} className="text-[#e91e63]" />
                </div>
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

            <div className="bg-[#fcfcfd] rounded-xl border border-gray-100 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                  <Droplet
                    size={16}
                    className="text-[#e91e63]"
                    fill="#e91e63"
                  />
                </div>
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

            <div className="bg-[#fcfcfd] rounded-xl border border-gray-100 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                  <Activity size={16} className="text-[#e91e63]" />
                </div>
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

            <div className="bg-[#fcfcfd] rounded-xl border border-gray-100 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                  <Calendar size={16} className="text-[#e91e63]" />
                </div>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">
                  Last Period
                </span>
              </div>
              <p className="text-lg font-black text-[#1a237e] ml-1 mt-1">
                11 Oct 2026
              </p>
            </div>
          </div>

          <div className="bg-[#fdf2f6] rounded-xl p-3 flex items-center gap-3 border border-pink-100">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-xl">🤰</span>
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
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-[#e91e63]" />
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
                    fill="rgba(233, 30, 99, 0.1)"
                  />
                  <path
                    d="M 8 80 L 25 60 L 42 70 L 58 40 L 75 50 L 92 70"
                    fill="none"
                    stroke="#e91e63"
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
                          className="w-2 h-2 rounded-full bg-white border-2 border-[#e91e63] absolute z-10"
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
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] text-gray-400 font-bold w-12 text-center"
              style={{ marginLeft: "-24px" }}
            >
              Cycle Length (days)
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Droplet size={16} className="text-[#e91e63]" fill="#e91e63" />
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
                        className="w-full bg-[#e91e63] rounded-t-md"
                        style={{ height: `${heightPercent * 0.8}px` }}
                      ></div>
                      <span className="text-[9px] text-gray-500 font-bold absolute -bottom-6">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] text-gray-400 font-bold w-12 text-center"
              style={{ marginLeft: "-24px" }}
            >
              Flow Level
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 bg-pink-50/50 p-2 rounded-lg">
              <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>0 = No
                bleeding
              </span>
              <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-200"></div>1 =
                Spotting
              </span>
              <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-300"></div>2 =
                Light
              </span>
              <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#e91e63]/60"></div>3 =
                Moderate
              </span>
              <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#e91e63]"></div>4 =
                Heavy
              </span>
            </div>
          </div>
        </div>

        {/* COMMON SYMPTOMS */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-pink-50 flex items-center justify-center">
              <span className="text-[12px]">📋</span>
            </div>
            <h3 className="text-sm font-black text-[#1a237e]">
              Common Symptoms
            </h3>
          </div>
          <p className="text-[11px] text-gray-500 font-medium mb-4">
            Number of days with symptoms (last 6 cycles)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <SymptomBar
              icon="🫄"
              label="Abdominal Cramps"
              val="4 days"
              width="w-[70%]"
            />
            <SymptomBar
              icon="👚"
              label="Breast Tenderness"
              val="3 days"
              width="w-[50%]"
            />
            <SymptomBar
              icon="🧍"
              label="Back Pain"
              val="3 days"
              width="w-[50%]"
            />
            <SymptomBar
              icon="🙎‍♀️"
              label="Mood Changes"
              val="2 days"
              width="w-[30%]"
            />
            <SymptomBar
              icon="🦵"
              label="Leg Pain"
              val="2 days"
              width="w-[30%]"
            />
          </div>
        </div>

        {/* PREVIOUS RECORDS */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center">
                <Calendar size={14} className="text-[#e91e63]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#1a237e]">
                  Previous Period Records
                </h3>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                  Your last 6 recorded periods
                </p>
              </div>
            </div>
            <button className="text-[11px] font-bold text-[#e91e63] flex items-center gap-1">
              View All Records <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-[#f4f6fb] text-[#1a237e] font-bold border-b border-gray-200">
                  <th className="py-2.5 px-3 font-bold rounded-tl-lg">
                    Period Start Date
                  </th>
                  <th className="py-2.5 px-3 font-bold">Period End Date</th>
                  <th className="py-2.5 px-3 font-bold text-center">
                    Duration (days)
                  </th>
                  <th className="py-2.5 px-3 font-bold text-center rounded-tr-lg">
                    Cycle Length (days)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="py-3 px-3 font-medium text-[#1a237e]">
                    11 Oct 2026
                  </td>
                  <td className="py-3 px-3 text-gray-600">15 Oct 2026</td>
                  <td className="py-3 px-3 text-center text-gray-600">5</td>
                  <td className="py-3 px-3 text-center text-gray-600">28</td>
                </tr>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="py-3 px-3 font-medium text-[#1a237e]">
                    13 Sep 2026
                  </td>
                  <td className="py-3 px-3 text-gray-600">17 Sep 2026</td>
                  <td className="py-3 px-3 text-center text-gray-600">5</td>
                  <td className="py-3 px-3 text-center text-gray-600">30</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-3 font-medium text-[#1a237e]">
                    14 Aug 2026
                  </td>
                  <td className="py-3 px-3 text-gray-600">18 Aug 2026</td>
                  <td className="py-3 px-3 text-center text-gray-600">5</td>
                  <td className="py-3 px-3 text-center text-gray-600">31</td>
                </tr>
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
      <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 text-sm">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-[#1a237e] w-[105px] truncate">
        {label}
      </span>
      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className={`bg-[#e91e63] h-full rounded-full ${width}`}></div>
      </div>
      <span className="text-[10px] font-semibold text-gray-500 w-10 text-right">
        {val}
      </span>
    </div>
  );
}
