import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ArrowRight,
  Info,
  Calendar,
  Droplet,
  RefreshCcw,
  X,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function PeriodSetup() {
  const navigate = useNavigate();

  // Q2 States (Period Duration)
  const [duration, setDuration] = useState("5 days");
  const [customDuration, setCustomDuration] = useState("");
  const [isDurationCustom, setIsDurationCustom] = useState(false);

  // Q3 States (Cycle Length)
  const [cycle, setCycle] = useState("28 days");
  const [customCycle, setCustomCycle] = useState("");
  const [isCycleCustom, setIsCycleCustom] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito relative">
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

      <main className="flex-1 px-4 py-5 overflow-y-auto">
        <h1 className="text-[28px] font-black text-[#1a237e] leading-tight mb-1">
          A Step Towards
          <br />
          <span className="text-[#e91e63]">Better Menstrual Health</span>
        </h1>
        <p className="text-[14px] text-gray-600 mb-6">
          Answer 3 quick questions to help track your period.
        </p>

        {/* Q1 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-[#e91e63]" />
            <h3 className="text-[15px] font-extrabold text-[#1a237e]">
              1. When did your last period start?
            </h3>
          </div>
          <div
            onClick={() => setShowDatePicker(true)}
            className="flex items-center justify-between px-3 py-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer active:bg-gray-100"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <span className="text-[13px] font-medium">
                {selectedDay
                  ? `${selectedDay} ${selectedMonth} ${selectedYear}`
                  : "Select first day of last period"}
              </span>
            </div>
            <Calendar size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Q2 - With Custom Option */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Droplet size={18} className="text-[#e91e63]" />
            <h3 className="text-[15px] font-extrabold text-[#1a237e]">
              2. How many days does your period usually last?
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDuration(d);
                  setIsDurationCustom(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-lg border text-[13px] font-bold ${
                  duration === d && !isDurationCustom
                    ? "border-[#e91e63] bg-pink-50 text-[#e91e63]"
                    : "border-gray-200 bg-white text-[#1a237e]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${duration === d && !isDurationCustom ? "border-[#e91e63]" : "border-gray-300"}`}
                >
                  {duration === d && !isDurationCustom && (
                    <div className="w-2 h-2 rounded-full bg-[#e91e63]" />
                  )}
                </div>
                {d}
              </button>
            ))}

            {/* Custom Option */}
            <button
              onClick={() => setIsDurationCustom(true)}
              className={`flex items-center gap-2 p-3 rounded-lg border text-[13px] font-bold ${
                isDurationCustom
                  ? "border-[#e91e63] bg-pink-50 text-[#e91e63]"
                  : "border-gray-200 bg-white text-[#1a237e]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${isDurationCustom ? "border-[#e91e63]" : "border-gray-300"}`}
              >
                {isDurationCustom && (
                  <div className="w-2 h-2 rounded-full bg-[#e91e63]" />
                )}
              </div>
              Custom days
            </button>
          </div>

          {/* Custom Input Box for Duration */}
          {isDurationCustom && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                placeholder="Enter days (e.g. 8)"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#e91e63]"
              />
              <span className="text-[12px] font-bold text-gray-500">days</span>
            </div>
          )}
        </div>

        {/* Q3 - With Custom Option */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCcw size={18} className="text-[#e91e63]" />
            <h3 className="text-[15px] font-extrabold text-[#1a237e]">
              3. What is your usual menstrual cycle length?
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cycles.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCycle(c);
                  setIsCycleCustom(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-lg border text-[13px] font-bold ${
                  cycle === c && !isCycleCustom
                    ? "border-[#e91e63] bg-pink-50 text-[#e91e63]"
                    : "border-gray-200 bg-white text-[#1a237e]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${cycle === c && !isCycleCustom ? "border-[#e91e63]" : "border-gray-300"}`}
                >
                  {cycle === c && !isCycleCustom && (
                    <div className="w-2 h-2 rounded-full bg-[#e91e63]" />
                  )}
                </div>
                {c}
              </button>
            ))}

            {/* Custom Option */}
            <button
              onClick={() => setIsCycleCustom(true)}
              className={`flex items-center gap-2 p-3 rounded-lg border text-[13px] font-bold ${
                isCycleCustom
                  ? "border-[#e91e63] bg-pink-50 text-[#e91e63]"
                  : "border-gray-200 bg-white text-[#1a237e]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${isCycleCustom ? "border-[#e91e63]" : "border-gray-300"}`}
              >
                {isCycleCustom && (
                  <div className="w-2 h-2 rounded-full bg-[#e91e63]" />
                )}
              </div>
              Custom days
            </button>
          </div>

          {/* Custom Input Box for Cycle */}
          {isCycleCustom && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                value={customCycle}
                onChange={(e) => setCustomCycle(e.target.value)}
                placeholder="Enter days (e.g. 32)"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#e91e63]"
              />
              <span className="text-[12px] font-bold text-gray-500">days</span>
            </div>
          )}
        </div>

        <div className="bg-[#e3f2fd] rounded-lg p-3 flex items-start gap-2 mb-6">
          <Info size={16} className="text-[#2196F3] flex-shrink-0 mt-0.5" />
          <p className="text-[11.5px] text-[#1a237e] leading-relaxed font-medium">
            Your cycle length is counted from the first day of one period to the
            first day of the next. You can update these details later.
          </p>
        </div>

        <button
          onClick={() => navigate("/period-tracker")}
          className="w-full bg-[#e91e63] text-white font-extrabold text-[15px] py-4 rounded-full flex items-center justify-center gap-2"
        >
          Continue to My Period Tracker <ArrowRight size={18} />
        </button>
      </main>

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
                      ${isSelected ? "bg-[#e91e63] text-white" : "text-[#1a237e] active:bg-gray-100"}`}
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
