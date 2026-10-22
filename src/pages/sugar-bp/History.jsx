import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Calendar,
  ChevronDown,
  Check,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

const SUGAR_TYPES = [
  { key: "fasting", label: "Fasting", bg: "#e0eefc" },
  { key: "postBreakfast", label: "Post Breakfast", bg: "#e4f4e8" },
  { key: "beforeLunch", label: "Before Lunch", bg: "#fdf1d3" },
  { key: "postLunch", label: "Post Lunch", bg: "#fde3e3" },
  { key: "beforeDinner", label: "Before Dinner", bg: "#EDE7F6" },
  { key: "postDinner", label: "Post Dinner", bg: "#E0F7FA" },
  { key: "random", label: "Random", bg: "#f5f5f5" },
];

// Mock data with ISO dates for easy filtering
const SUGAR_LOGS = [
  {
    id: 1,
    dateStr: "2026-10-20",
    date: "20 Oct 2026",
    day: "Tue",
    logs: { fasting: 126, postBreakfast: 168, postLunch: 142, postDinner: 118 },
  },
  {
    id: 2,
    dateStr: "2026-10-18",
    date: "18 Oct 2026",
    day: "Sun",
    logs: { fasting: 110, postLunch: 164, beforeDinner: 138 },
  },
  {
    id: 3,
    dateStr: "2026-10-16",
    date: "16 Oct 2026",
    day: "Fri",
    logs: { fasting: 142, postBreakfast: 196, beforeDinner: 158 },
  },
  {
    id: 4,
    dateStr: "2026-09-14",
    date: "14 Sep 2026",
    day: "Wed",
    logs: { fasting: 98, postBreakfast: 134, beforeDinner: 120 },
  },
];

const BP_LOGS = [
  {
    id: 1,
    dateStr: "2026-10-20",
    date: "20 Oct 2026",
    time: "8:15 AM",
    sys: 120,
    dia: 80,
  },
  {
    id: 2,
    dateStr: "2026-10-18",
    date: "18 Oct 2026",
    time: "7:30 AM",
    sys: 118,
    dia: 76,
  },
  {
    id: 3,
    dateStr: "2026-10-16",
    date: "16 Oct 2026",
    time: "7:45 PM",
    sys: 124,
    dia: 82,
  },
  {
    id: 4,
    dateStr: "2026-09-14",
    date: "14 Sep 2026",
    time: "8:20 AM",
    sys: 136,
    dia: 84,
  },
];

const DATE_FILTERS = ["1 Day", "1 Week", "1 Month", "3 Months", "6 Months"];

const getSugarColor = (type, val) => {
  if (!val) return "text-gray-400";
  if (val < 70) return "text-[#ef5350]";
  const isBeforeMeal = ["fasting", "beforeLunch", "beforeDinner"].includes(
    type,
  );
  if (isBeforeMeal) return val <= 130 ? "text-[#2e9e48]" : "text-[#ef5350]";
  return val <= 160 ? "text-[#2e9e48]" : "text-[#ef5350]";
};

export default function History() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialTab = query.get("tab") || "sugar";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filter States
  const [dateFilter, setDateFilter] = useState("1 Month");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Reset filters when tab changes
  useEffect(() => {
    setDateFilter("1 Month");
    setStartDate("");
    setEndDate("");
    setShowDateFilter(false);
  }, [activeTab]);

  // Filter Logic
  const filterData = (data) => {
    // If custom range is selected, use it
    if (startDate || endDate) {
      return data.filter((item) => {
        if (startDate && item.dateStr < startDate) return false;
        if (endDate && item.dateStr > endDate) return false;
        return true;
      });
    }

    // Quick filters
    const today = new Date("2026-10-20"); // Mock "today" for demo
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

  const filteredSugarLogs = filterData(SUGAR_LOGS);
  const filteredBpLogs = filterData(BP_LOGS);

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
              Logbook History
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
              Sugar Logs
            </button>
            <button
              onClick={() => setActiveTab("bp")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${activeTab === "bp" ? "bg-[#2f8cf0] text-white shadow-sm" : "bg-[#f4f5fb] text-gray-500"}`}
            >
              BP Logs
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4">
          {/* FILTERS SECTION */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-3 shadow-sm flex flex-col gap-3 z-20">
            <div className="relative">
              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#f4f5fb] rounded-lg text-[12px] font-bold text-[#14284b]"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#0d6b63]" />
                  {startDate || endDate ? "Custom Range" : dateFilter}
                </div>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${showDateFilter ? "rotate-180" : ""}`}
                />
              </button>
              {showDateFilter && (
                <div className="absolute top-full mt-1 w-full bg-white border border-[#eaedff] rounded-lg shadow-lg z-50 overflow-hidden">
                  {DATE_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setDateFilter(f);
                        setStartDate("");
                        setEndDate("");
                        setShowDateFilter(false);
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

          {/* SUGAR TABLE */}
          {activeTab === "sugar" && (
            <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[700px]">
                  <div className="flex bg-[#faf8ff] border-b border-[#eaedff] p-2">
                    <div className="w-24 flex-none px-1 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      Date
                    </div>
                    {SUGAR_TYPES.map((t) => (
                      <div
                        key={t.key}
                        className="flex-1 px-1 text-center text-[9px] font-bold text-gray-500 uppercase tracking-wide leading-tight"
                      >
                        {t.label}
                      </div>
                    ))}
                    <div className="w-16 flex-none text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      Action
                    </div>
                  </div>

                  {filteredSugarLogs.length > 0 ? (
                    filteredSugarLogs.map((row) => (
                      <div
                        key={row.id}
                        className="flex border-b border-[#f0f2f8] last:border-0 p-2 items-center"
                      >
                        <div className="w-24 flex-none px-1">
                          <p className="text-[12px] font-bold text-[#14284b]">
                            {row.date}
                          </p>
                          <p className="text-[10px] text-gray-400">{row.day}</p>
                        </div>
                        {SUGAR_TYPES.map((t) => {
                          const val = row.logs[t.key];
                          const color = getSugarColor(t.key, val);
                          return (
                            <div
                              key={t.key}
                              className="flex-1 px-1 flex flex-col items-center justify-center"
                            >
                              {val ? (
                                <div
                                  className="w-full rounded-lg py-1.5 flex flex-col items-center"
                                  style={{ backgroundColor: t.bg }}
                                >
                                  <span
                                    className={`text-[13px] font-black ${color}`}
                                  >
                                    {val}
                                  </span>
                                  <span className="text-[7px] text-gray-500 font-bold mt-0.5">
                                    mg/dL
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[14px] text-gray-300">
                                  —
                                </span>
                              )}
                            </div>
                          );
                        })}
                        <div className="w-16 flex-none flex items-center justify-center gap-2">
                          <button className="text-[#2f8cf0] active:scale-90">
                            <Edit3 size={16} />
                          </button>
                          <button className="text-[#ef5350] active:scale-90">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500 text-[12px] font-medium">
                      No logs found for this date range.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* BP LIST */}
          {activeTab === "bp" && (
            <div className="flex flex-col gap-3">
              {filteredBpLogs.length > 0 ? (
                filteredBpLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white rounded-2xl p-3.5 border border-[#eaedff] shadow-sm flex items-center gap-3"
                  >
                    <div className="w-[85px] flex-none border-r border-gray-100 pr-2">
                      <p className="text-[12px] font-bold text-[#14284b]">
                        {log.date}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {log.time}
                      </p>
                    </div>

                    <div className="flex-1 flex items-center gap-3 pl-1">
                      <div>
                        <p className="text-[9px] font-bold text-[#2f8cf0] mb-1">
                          BP
                        </p>
                        <div className="bg-[#e0eefc] px-3 py-1 rounded-lg flex items-baseline gap-1">
                          <p className="text-[16px] font-black text-[#14284b] leading-none">
                            {log.sys}
                          </p>
                          <p className="text-[16px] font-black text-[#14284b] leading-none">
                            / {log.dia}
                          </p>
                        </div>
                      </div>
                      <p className="text-[9px] text-gray-500 font-bold mt-3">
                        mmHg
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 border-l border-gray-100 pl-3">
                      <button className="text-[#2f8cf0] active:scale-90">
                        <Edit3 size={16} />
                      </button>
                      <button className="text-[#ef5350] active:scale-90">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-[#eaedff] p-6 text-center text-gray-500 text-[12px] font-medium">
                  No BP logs found for this date range.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
