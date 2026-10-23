import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Info,
  Calendar,
  ChevronDown,
  Check,
  Activity,
  SlidersHorizontal,
  AlertCircle,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import logo from "../../assets/daibmetalogo.jpeg";

const DATE_FILTERS = ["1 Day", "1 Week", "1 Month", "3 Months", "6 Months"];

const SUGAR_TYPES = [
  { id: "fasting", label: "Fasting", color: "#ef5350" },
  { id: "postBreakfast", label: "Post Breakfast", color: "#f97316" },
  { id: "beforeLunch", label: "Before Lunch", color: "#eab308" },
  { id: "postLunch", label: "Post Lunch", color: "#2e9e48" },
  { id: "beforeDinner", label: "Before Dinner", color: "#14b8a6" },
  { id: "postDinner", label: "Post Dinner", color: "#3b82f6" },
  { id: "random", label: "Random", color: "#8b5cf6" },
];

const TYPE_FILTERS = [
  { id: "all", label: "All Types" },
  { id: "fasting", label: "Fasting (Before Breakfast)" },
  { id: "postBreakfast", label: "Post Breakfast (2 hr)" },
  { id: "beforeLunch", label: "Before Lunch" },
  { id: "postLunch", label: "Post Lunch (2 hr)" },
  { id: "beforeDinner", label: "Before Dinner" },
  { id: "postDinner", label: "Post Dinner (2 hr)" },
  { id: "random", label: "Random" },
];

const LEVEL_FILTERS = [
  { id: "all", label: "All Levels" },
  { id: "normal", label: "Normal" },
  { id: "outOfRange", label: "Out of Range" },
  { id: "hypo", label: "Hypoglycemia (<70)" },
];

const SUGAR_DATA = [
  {
    dateStr: "2026-10-20",
    displayDate: "20 Oct",
    fasting: 120,
    postBreakfast: 160,
    beforeLunch: 130,
    postLunch: 150,
    beforeDinner: 135,
    postDinner: 145,
    random: 140,
  },
  {
    dateStr: "2026-10-19",
    displayDate: "19 Oct",
    fasting: 125,
    postBreakfast: 170,
    beforeLunch: 135,
    postLunch: 155,
    beforeDinner: 140,
    postDinner: 150,
    random: 145,
  },
  {
    dateStr: "2026-10-18",
    displayDate: "18 Oct",
    fasting: 118,
    postBreakfast: 165,
    beforeLunch: 128,
    postLunch: 145,
    beforeDinner: 130,
    postDinner: 140,
    random: 135,
  },
  {
    dateStr: "2026-10-15",
    displayDate: "15 Oct",
    fasting: 122,
    postBreakfast: 175,
    beforeLunch: 132,
    postLunch: 160,
    beforeDinner: 142,
    postDinner: 155,
    random: 148,
  },
  {
    dateStr: "2026-10-10",
    displayDate: "10 Oct",
    fasting: 130,
    postBreakfast: 170,
    beforeLunch: 135,
    postLunch: 150,
    beforeDinner: 130,
    postDinner: 140,
    random: 145,
  },
  {
    dateStr: "2026-09-20",
    displayDate: "20 Sep",
    fasting: 125,
    postBreakfast: 165,
    beforeLunch: 140,
    postLunch: 145,
    beforeDinner: 135,
    postDinner: 135,
    random: 140,
  },
];

const BP_DATA = [
  { dateStr: "2026-10-20", displayDate: "20 Oct", sys: 120, dia: 80 },
  { dateStr: "2026-10-19", displayDate: "19 Oct", sys: 118, dia: 78 },
  { dateStr: "2026-10-18", displayDate: "18 Oct", sys: 125, dia: 82 },
  { dateStr: "2026-10-15", displayDate: "15 Oct", sys: 115, dia: 75 },
  { dateStr: "2026-10-10", displayDate: "10 Oct", sys: 130, dia: 85 },
  { dateStr: "2026-09-20", displayDate: "20 Sep", sys: 122, dia: 81 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[120px] max-h-[200px] overflow-y-auto">
        <p className="text-[11px] font-black text-gray-800 mb-1 border-b border-gray-100 pb-1">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 mt-1"
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[9px] font-bold text-gray-500">
                {entry.name}
              </span>
            </div>
            <span
              className="text-[11px] font-black"
              style={{ color: entry.color }}
            >
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Trends() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("sugar");
  const [dateFilter, setDateFilter] = useState("1 Month");
  const [showDropdown, setShowDropdown] = useState(false);

  // Sugar Filters
  const [activeSugarType, setActiveSugarType] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);

  useEffect(() => {
    setDateFilter("1 Month");
    setShowDropdown(false);
    setActiveSugarType("all");
    setLevelFilter("all");
    setShowTypeDropdown(false);
    setShowLevelDropdown(false);
  }, [activeTab]);

  const getFilteredData = (data) => {
    const today = new Date("2026-10-20");
    let filterDays = 30;
    if (dateFilter === "1 Day") filterDays = 1;
    if (dateFilter === "1 Week") filterDays = 7;
    if (dateFilter === "1 Month") filterDays = 30;
    if (dateFilter === "3 Months") filterDays = 90;
    if (dateFilter === "6 Months") filterDays = 180;
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - filterDays);
    return data.filter((item) => new Date(item.dateStr) >= cutoff);
  };

  const currentSugarData = getFilteredData(SUGAR_DATA);
  const currentBpData = getFilteredData(BP_DATA);

  // Check if any type/level filter is active
  const hasActiveFilter = activeSugarType !== "all" || levelFilter !== "all";

  const clearFilters = () => {
    setActiveSugarType("all");
    setLevelFilter("all");
  };

  // Helper to check if a value matches a specific level
  const matchesLevel = (type, val, level) => {
    if (level === "all") return true;
    const isBeforeMeal = ["fasting", "beforeLunch", "beforeDinner"].includes(
      type,
    );

    if (level === "hypo") return val < 70;
    if (level === "normal") {
      return isBeforeMeal ? val >= 80 && val <= 130 : val >= 80 && val <= 160;
    }
    if (level === "outOfRange") {
      if (val < 80 || val < 70) return true;
      return isBeforeMeal ? val > 130 : val > 160;
    }
    return true;
  };

  // Filter which sugar types (lines) to render based on Type & Level
  const linesToRender = SUGAR_TYPES.filter((type) => {
    // 1. Filter by Type
    if (activeSugarType !== "all" && activeSugarType !== type.id) return false;

    // 2. Filter by Level (checks if ANY value in the chart matches the level)
    if (levelFilter !== "all") {
      const hasMatchingValue = currentSugarData.some((row) => {
        const val = row[type.id];
        return val !== undefined && matchesLevel(type.id, val, levelFilter);
      });
      if (!hasMatchingValue) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
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

          <div className="flex px-4 pb-3 gap-2">
            <button
              onClick={() => setActiveTab("sugar")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${activeTab === "sugar" ? "bg-[#ef5350] text-white shadow-sm" : "bg-[#f4f5fb] text-gray-500"}`}
            >
              Sugar Trend
            </button>
            <button
              onClick={() => setActiveTab("bp")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${activeTab === "bp" ? "bg-[#2f8cf0] text-white shadow-sm" : "bg-[#f4f5fb] text-gray-500"}`}
            >
              BP Trend
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4 overflow-y-auto">
          {/* FILTERS */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-3 shadow-sm flex flex-col gap-3 relative z-30">
            {/* Date Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setShowTypeDropdown(false);
                  setShowLevelDropdown(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#f4f5fb] rounded-lg text-[12px] font-bold text-[#14284b]"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#0d6b63]" />
                  {dateFilter}
                </div>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-[#eaedff] rounded-lg shadow-lg z-50 overflow-hidden">
                  {DATE_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setDateFilter(f);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[12px] font-semibold flex items-center justify-between ${dateFilter === f ? "bg-[#E0F2F1] text-[#005c55]" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      {f}
                      {dateFilter === f && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type & Level Filters (Only for Sugar Tab) */}
            {activeTab === "sugar" && (
              <div className="grid grid-cols-2 gap-2">
                {/* Type Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowTypeDropdown(!showTypeDropdown);
                      setShowDropdown(false);
                      setShowLevelDropdown(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2.5 bg-[#f4f5fb] rounded-lg text-[10px] font-bold text-[#14284b]"
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <SlidersHorizontal
                        size={12}
                        className="text-[#0d6b63] flex-none"
                      />
                      <span className="truncate">
                        {TYPE_FILTERS.find((t) => t.id === activeSugarType)
                          ?.label || "All Types"}
                      </span>
                    </div>
                    <ChevronDown
                      size={12}
                      className={`flex-none transition-transform ${showTypeDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showTypeDropdown && (
                    <div className="absolute top-full mt-1 w-full min-w-[170px] bg-white border border-[#eaedff] rounded-lg shadow-lg z-50 overflow-hidden">
                      {TYPE_FILTERS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setActiveSugarType(t.id);
                            setShowTypeDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[10.5px] font-semibold flex items-center justify-between gap-2 ${activeSugarType === t.id ? "bg-[#E0F2F1] text-[#005c55]" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          <span className="leading-tight">{t.label}</span>
                          {activeSugarType === t.id && (
                            <Check size={12} className="flex-none" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Level Filter */}
                <div className="relative flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setShowLevelDropdown(!showLevelDropdown);
                      setShowDropdown(false);
                      setShowTypeDropdown(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2.5 bg-[#f4f5fb] rounded-lg text-[10px] font-bold text-[#14284b]"
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <AlertCircle
                        size={12}
                        className="text-[#ef5350] flex-none"
                      />
                      <span className="truncate">
                        {LEVEL_FILTERS.find((l) => l.id === levelFilter)
                          ?.label || "All Levels"}
                      </span>
                    </div>
                    <ChevronDown
                      size={12}
                      className={`flex-none transition-transform ${showLevelDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* CLEAR FILTER X ICON (Clears both Type & Level) */}
                  {hasActiveFilter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFilters();
                      }}
                      className="flex-none w-5 h-5 rounded-full bg-[#fde3e3] flex items-center justify-center active:scale-90 transition"
                    >
                      <X size={11} className="text-[#ef5350]" />
                    </button>
                  )}

                  {showLevelDropdown && (
                    <div className="absolute top-full right-0 mt-1 w-full min-w-[150px] bg-white border border-[#eaedff] rounded-lg shadow-lg z-50 overflow-hidden">
                      {LEVEL_FILTERS.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => {
                            setLevelFilter(l.id);
                            setShowLevelDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[10.5px] font-semibold flex items-center justify-between gap-2 ${levelFilter === l.id ? "bg-[#E0F2F1] text-[#005c55]" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          <span className="leading-tight">{l.label}</span>
                          {levelFilter === l.id && (
                            <Check size={12} className="flex-none" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SUGAR CHART SECTION */}
          {activeTab === "sugar" && (
            <div className="bg-white rounded-2xl p-3 border border-[#eaedff] shadow-sm flex flex-col w-full">
              <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                <TrendingUp
                  size={18}
                  style={{
                    color:
                      activeSugarType === "all"
                        ? "#14284b"
                        : SUGAR_TYPES.find((t) => t.id === activeSugarType)
                            ?.color,
                  }}
                />
                <h2 className="text-[14px] font-extrabold text-[#14284b]">
                  {activeSugarType === "all"
                    ? "Sugar Types Trend"
                    : `${SUGAR_TYPES.find((t) => t.id === activeSugarType)?.label} Trend`}
                  {levelFilter !== "all" && (
                    <span className="text-[11px] font-bold text-gray-500 ml-1">
                      ({LEVEL_FILTERS.find((l) => l.id === levelFilter)?.label})
                    </span>
                  )}
                </h2>
              </div>

              {/* CHART WRAPPER */}
              <div className="w-full h-[300px]">
                {currentSugarData.length > 0 && linesToRender.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currentSugarData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis
                        dataKey="displayDate"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fill: "#9ca3af",
                          fontWeight: 600,
                        }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fill: "#9ca3af",
                          fontWeight: 600,
                        }}
                        domain={["dataMin - 10", "dataMax + 20"]}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />

                      {linesToRender.map((type) => (
                        <Line
                          key={type.id}
                          type="monotone"
                          dataKey={type.id}
                          name={type.label}
                          stroke={type.color}
                          strokeWidth={activeSugarType === "all" ? 2.5 : 3.5}
                          dot={{
                            r: activeSugarType === "all" ? 3 : 4,
                            strokeWidth: activeSugarType === "all" ? 1.5 : 2,
                            fill: "#fff",
                          }}
                          activeDot={{ r: 6 }}
                          animationDuration={800}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-[12px] font-medium text-center px-4">
                    <AlertCircle size={24} className="text-gray-300 mb-2" />
                    No data available for this combination.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BP CHART SECTION */}
          {activeTab === "bp" && (
            <div className="bg-white rounded-2xl p-3 border border-[#eaedff] shadow-sm flex flex-col w-full">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <Activity size={18} className="text-[#2f8cf0]" />
                <h2 className="text-[14px] font-extrabold text-[#14284b]">
                  Blood Pressure Trend
                </h2>
              </div>

              <div className="w-full h-[300px]">
                {currentBpData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currentBpData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis
                        dataKey="displayDate"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fill: "#9ca3af",
                          fontWeight: 600,
                        }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fill: "#9ca3af",
                          fontWeight: 600,
                        }}
                        domain={["dataMin - 10", "dataMax + 20"]}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />

                      <Line
                        type="monotone"
                        dataKey="sys"
                        name="Systolic"
                        stroke="#2f8cf0"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="dia"
                        name="Diastolic"
                        stroke="#0d6b63"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-[12px] font-medium">
                    No data available for this range.
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-2 border-t border-gray-100 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2f8cf0]" />
                  <span className="text-[11px] font-bold text-gray-600">
                    Systolic
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0d6b63]" />
                  <span className="text-[11px] font-bold text-gray-600">
                    Diastolic
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div
            className={`rounded-xl p-3 flex items-start gap-2 mt-2 ${activeTab === "sugar" ? "bg-[#fde3e3]" : "bg-[#e0eefc]"}`}
          >
            <Info
              size={16}
              className={`mt-0.5 flex-shrink-0 ${activeTab === "sugar" ? "text-[#ef5350]" : "text-[#2f8cf0]"}`}
            />
            <p
              className={`text-[11px] font-medium leading-snug ${activeTab === "sugar" ? "text-[#ef5350]" : "text-[#2f8cf0]"}`}
            >
              {activeTab === "sugar"
                ? `Showing ${activeSugarType === "all" ? "all types" : SUGAR_TYPES.find((t) => t.id === activeSugarType)?.label}${levelFilter !== "all" ? ` (${LEVEL_FILTERS.find((l) => l.id === levelFilter)?.label})` : ""} trend for ${dateFilter}. Use the filters above to switch.`
                : `Showing BP trend for ${dateFilter}. Aim to keep BP under 120/80 mmHg.`}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
