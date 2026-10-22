import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Check,
  Utensils,
  Flame,
  Activity,
  Scale,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

// Mock History Data
const HISTORY_DATA = [
  {
    id: 1,
    dateStr: "2026-10-20",
    displayDate: "20 Oct 2026",
    intake: 1650,
    burn: 2260,
    balance: -610,
    macros: { carbs: 210, protein: 68, fiber: 24, fat: 62 },
  },
  {
    id: 2,
    dateStr: "2026-10-19",
    displayDate: "19 Oct 2026",
    intake: 1800,
    burn: 2100,
    balance: -300,
    macros: { carbs: 230, protein: 70, fiber: 20, fat: 65 },
  },
  {
    id: 3,
    dateStr: "2026-10-18",
    displayDate: "18 Oct 2026",
    intake: 1500,
    burn: 2300,
    balance: -800,
    macros: { carbs: 180, protein: 60, fiber: 28, fat: 55 },
  },
  {
    id: 4,
    dateStr: "2026-10-15",
    displayDate: "15 Oct 2026",
    intake: 2000,
    burn: 2200,
    balance: -200,
    macros: { carbs: 250, protein: 80, fiber: 22, fat: 70 },
  },
  {
    id: 5,
    dateStr: "2026-10-10",
    displayDate: "10 Oct 2026",
    intake: 1900,
    burn: 1900,
    balance: 0,
    macros: { carbs: 240, protein: 75, fiber: 25, fat: 68 },
  },
  {
    id: 6,
    dateStr: "2026-09-20",
    displayDate: "20 Sep 2026",
    intake: 1700,
    burn: 2400,
    balance: -700,
    macros: { carbs: 200, protein: 72, fiber: 26, fat: 60 },
  },
];

const DATE_FILTERS = [
  "1 Day",
  "1 Week",
  "1 Month",
  "3 Months",
  "6 Months",
  "This Year",
];

export default function CalorieHistory() {
  const navigate = useNavigate();

  const [dateFilter, setDateFilter] = useState("1 Month");
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter Logic
  const getFilteredData = () => {
    if (startDate || endDate) {
      return HISTORY_DATA.filter((item) => {
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
    if (dateFilter === "This Year") filterDays = 365;

    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - filterDays);

    return HISTORY_DATA.filter((item) => new Date(item.dateStr) >= cutoff);
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/calorie-tracker")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Calorie History
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4 overflow-y-auto">
          {/* FILTERS SECTION */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-3 shadow-sm flex flex-col gap-3 z-30">
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

          {/* List */}
          <div className="flex flex-col gap-3">
            {filteredData.length > 0 ? (
              filteredData.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl border border-[#eaedff] p-3.5 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
                    <h3 className="text-[13px] font-extrabold text-[#14284b]">
                      {log.displayDate}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${log.balance < 0 ? "bg-[#e4f4e8] text-[#2e9e48]" : log.balance > 0 ? "bg-[#fde3e3] text-[#ef5350]" : "bg-gray-100 text-gray-500"}`}
                    >
                      {log.balance < 0
                        ? "Deficit"
                        : log.balance > 0
                          ? "Surplus"
                          : "Balanced"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-[#fde3e3] rounded-lg p-2 text-center">
                      <p className="text-[9px] font-bold text-gray-500 mb-0.5">
                        Intake
                      </p>
                      <p className="text-[13px] font-black text-[#ef5350]">
                        {log.intake}
                      </p>
                    </div>
                    <div className="bg-[#e0eefc] rounded-lg p-2 text-center">
                      <p className="text-[9px] font-bold text-gray-500 mb-0.5">
                        Burn
                      </p>
                      <p className="text-[13px] font-black text-[#2f8cf0]">
                        {log.burn}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-2 text-center ${log.balance < 0 ? "bg-[#e4f4e8]" : "bg-[#fde3e3]"}`}
                    >
                      <p className="text-[9px] font-bold text-gray-500 mb-0.5">
                        Balance
                      </p>
                      <p
                        className={`text-[13px] font-black ${log.balance < 0 ? "text-[#2e9e48]" : "text-[#ef5350]"}`}
                      >
                        {log.balance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[9px] text-gray-500 font-medium">
                    <span>
                      Carbs:{" "}
                      <b className="text-gray-700">{log.macros.carbs}g</b>
                    </span>
                    <span>
                      Protein:{" "}
                      <b className="text-gray-700">{log.macros.protein}g</b>
                    </span>
                    <span>
                      Fat: <b className="text-gray-700">{log.macros.fat}g</b>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-6 text-center text-gray-500 text-[12px] font-medium">
                No history found for this date range.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
