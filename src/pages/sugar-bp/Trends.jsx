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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [activeSugarType, setActiveSugarType] = useState("all");

  useEffect(() => {
    setDateFilter("1 Month");
    setStartDate("");
    setEndDate("");
    setShowDropdown(false);
  }, [activeTab]);

  const getFilteredData = (data) => {
    if (startDate || endDate) {
      return data.filter((item) => {
        if (startDate && item.dateStr < startDate) return false;
        if (endDate && item.dateStr > endDate) return false;
        return true;
      });
    }
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

  const linesToRender =
    activeSugarType === "all"
      ? SUGAR_TYPES
      : SUGAR_TYPES.filter((t) => t.id === activeSugarType);

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
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#f4f5fb] rounded-lg text-[12px] font-bold text-[#14284b]"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#0d6b63]" />
                  {startDate || endDate ? "Custom Range" : dateFilter}
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
                        setStartDate("");
                        setEndDate("");
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[12px] font-semibold flex items-center justify-between ${dateFilter === f && !startDate && !endDate ? "bg-[#E0F2F1] text-[#005c55]" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      {f}
                      {dateFilter === f && !startDate && !endDate && (
                        <Check size={14} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#f4f5fb] rounded-lg text-[11px] font-semibold text-gray-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#f4f5fb] rounded-lg text-[11px] font-semibold text-gray-800 outline-none"
                />
              </div>
            </div>
          </div>

          {/* SUGAR CHART SECTION */}
          {activeTab === "sugar" && (
            <div className="flex flex-col gap-4">
              {/* Chart Card */}
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
                      ? "All Sugar Types Trend"
                      : `${SUGAR_TYPES.find((t) => t.id === activeSugarType)?.label} Trend`}
                  </h2>
                </div>

                {/* CHART WRAPPER (No Left Labels now) */}
                <div className="w-full h-[300px]">
                  {currentSugarData.length > 0 ? (
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
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-[12px] font-medium">
                      No data available for this range.
                    </div>
                  )}
                </div>
              </div>

              {/* Selector moved directly above chart */}
              <div className="bg-white rounded-2xl p-3 border border-[#eaedff] shadow-sm">
                <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wide">
                  Select Sugar Type
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveSugarType("all")}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition border ${
                      activeSugarType === "all"
                        ? "bg-[#14284b] border-[#14284b] text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    All Types
                  </button>

                  {SUGAR_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveSugarType(type.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition border ${
                        activeSugarType === type.id
                          ? "bg-gray-50 border-gray-200 shadow-sm"
                          : "bg-white border-transparent text-gray-500 hover:bg-gray-50"
                      }`}
                      style={{
                        color:
                          activeSugarType === type.id ? type.color : undefined,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: type.color,
                          opacity: activeSugarType === type.id ? 1 : 0.4,
                        }}
                      />
                      {type.label}
                    </button>
                  ))}
                </div>
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
                ? `Showing ${activeSugarType === "all" ? "all types" : SUGAR_TYPES.find((t) => t.id === activeSugarType)?.label} trend for ${startDate || endDate ? "Selected Range" : dateFilter}. Tap on buttons above to switch type.`
                : `Showing BP trend for ${startDate || endDate ? "Selected Range" : dateFilter}. Aim to keep BP under 120/80 mmHg.`}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
