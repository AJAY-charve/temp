import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Info,
  ChevronDown,
  Check,
  Calendar,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";

const DATE_FILTERS = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 3 Months",
  "Last 6 Months",
  "This Year",
];

// Mock Data for different date filters (To show dynamic chart changes)
const CHART_DATA = {
  "Last 7 Days": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    sugar: [45, 60, 35, 70, 50, 80, 65],
    bp: [55, 60, 58, 62, 50, 65, 59],
  },
  "Last 30 Days": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    sugar: [50, 75, 60, 85],
    bp: [60, 65, 58, 62],
  },
  "Last 3 Months": {
    labels: ["Aug", "Sep", "Oct"],
    sugar: [40, 65, 80],
    bp: [58, 62, 55],
  },
  "Last 6 Months": {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    sugar: [30, 45, 40, 60, 75, 85],
    bp: [50, 55, 58, 60, 62, 55],
  },
  "This Year": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    sugar: [40, 55, 70, 85],
    bp: [55, 60, 65, 58],
  },
};

export default function Trends() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialTab = query.get("tab") || "sugar";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Date Filter States
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get current chart data based on filter
  const currentData = CHART_DATA[dateFilter];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/sugar-bp")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Health Trends
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* TABS */}
          <div className="flex px-4 pb-3 gap-2">
            <button
              onClick={() => setActiveTab("sugar")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${
                activeTab === "sugar"
                  ? "bg-[#ef5350] text-white shadow-sm"
                  : "bg-[#f4f5fb] text-gray-500"
              }`}
            >
              Sugar Trend
            </button>
            <button
              onClick={() => setActiveTab("bp")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${
                activeTab === "bp"
                  ? "bg-[#2f8cf0] text-white shadow-sm"
                  : "bg-[#f4f5fb] text-gray-500"
              }`}
            >
              BP Trend
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4">
          {/* DATE FILTER DROPDOWN */}
          <div className="flex justify-center relative z-20" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#eaedff] shadow-sm text-[12px] font-bold text-[#14284b] active:scale-95 transition"
            >
              <Calendar size={15} className="text-[#0d6b63]" />
              {dateFilter}
              <ChevronDown
                size={15}
                className={`text-gray-400 transition-transform ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDropdown && (
              <div className="absolute top-[110%] w-48 bg-white border border-[#eaedff] rounded-xl shadow-lg z-50 overflow-hidden animate-pop">
                {DATE_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setDateFilter(filter);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-[12px] font-semibold transition flex items-center justify-between ${
                      dateFilter === filter
                        ? "bg-[#E0F2F1] text-[#005c55]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {filter}
                    {dateFilter === filter && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SUGAR TREND CHART */}
          {activeTab === "sugar" && (
            <>
              <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm flex flex-col items-center">
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp size={20} className="text-[#ef5350]" />
                  <h2 className="text-[15px] font-extrabold text-[#14284b]">
                    Blood Sugar Trend
                  </h2>
                </div>

                {/* Chart Area */}
                <div className="w-full h-52 relative flex items-end justify-around px-2 pb-0 border-b-2 border-l-2 border-gray-100">
                  {/* Y Axis */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] font-bold text-gray-400 -ml-6">
                    <span>200</span>
                    <span>150</span>
                    <span>100</span>
                    <span>50</span>
                  </div>

                  {/* Bars (Dynamic based on filter) */}
                  {currentData.sugar.map((height, i) => (
                    <div
                      key={i}
                      className="w-8 bg-[#ef5350] rounded-t-sm transition-all duration-500 ease-in-out relative group"
                      style={{ height: `${height}%` }}
                    >
                      {/* Tooltip on hover (optional) */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        {Math.round((height / 100) * 200)} mg/dL
                      </div>
                    </div>
                  ))}
                </div>

                {/* X Axis */}
                <div className="w-full flex justify-around px-2 mt-2">
                  {currentData.labels.map((label, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold text-gray-400"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#fde3e3] rounded-xl p-3 flex items-start gap-2">
                <Info
                  size={16}
                  className="text-[#ef5350] mt-0.5 flex-shrink-0"
                />
                <p className="text-[11px] text-[#ef5350] font-medium leading-snug">
                  Showing trend for <strong>{dateFilter}</strong>. Your sugar
                  levels are fluctuating. Aim to keep fasting sugar between
                  80-130 mg/dL.
                </p>
              </div>
            </>
          )}

          {/* BP TREND CHART */}
          {activeTab === "bp" && (
            <>
              <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm flex flex-col items-center">
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp size={20} className="text-[#2f8cf0]" />
                  <h2 className="text-[15px] font-extrabold text-[#14284b]">
                    Blood Pressure Trend
                  </h2>
                </div>

                {/* Chart Area */}
                <div className="w-full h-52 relative flex items-end justify-around px-2 pb-0 border-b-2 border-l-2 border-gray-100">
                  {/* Y Axis */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] font-bold text-gray-400 -ml-6">
                    <span>160</span>
                    <span>120</span>
                    <span>80</span>
                    <span>40</span>
                  </div>

                  {/* Bars (Dynamic based on filter) */}
                  {currentData.bp.map((height, i) => (
                    <div
                      key={i}
                      className="w-8 bg-[#2f8cf0] rounded-t-sm transition-all duration-500 ease-in-out relative group"
                      style={{ height: `${height}%` }}
                    >
                      {/* Tooltip on hover (optional) */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        {Math.round((height / 100) * 160)} mmHg
                      </div>
                    </div>
                  ))}
                </div>

                {/* X Axis */}
                <div className="w-full flex justify-around px-2 mt-2">
                  {currentData.labels.map((label, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold text-gray-400"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#e0eefc] rounded-xl p-3 flex items-start gap-2">
                <Info
                  size={16}
                  className="text-[#2f8cf0] mt-0.5 flex-shrink-0"
                />
                <p className="text-[11px] text-[#2f8cf0] font-medium leading-snug">
                  Showing trend for <strong>{dateFilter}</strong>. Your BP is
                  mostly stable. Maintain a low-salt diet to keep it under
                  120/80 mmHg.
                </p>
              </div>
            </>
          )}
        </main>

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-pop { animation: popIn 0.15s ease-out; }
        `}</style>
      </div>
    </div>
  );
}
