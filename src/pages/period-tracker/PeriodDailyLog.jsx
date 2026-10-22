import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Info,
  Save,
  X,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function PeriodDailyLog() {
  const navigate = useNavigate();
  const [isLastDay, setIsLastDay] = useState(false);

  // Period Day Selection States
  const [selectedPeriodDay, setSelectedPeriodDay] = useState("Day 1");
  const [isDayCustom, setIsDayCustom] = useState(false);
  const [customDay, setCustomDay] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [logDayNum, setLogDayNum] = useState(18);

  const [symptoms, setSymptoms] = useState({
    bleeding: "Moderate",
    cramps: "Mild pain",
    backPain: "Mild pain",
    legPain: "No pain",
    breast: "None",
    mood: "Slightly Low",
    other: "",
  });
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSymptomSelect = (key, val) =>
    setSymptoms({ ...symptoms, [key]: val });

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const displayDay =
    isDayCustom && customDay ? `Day ${customDay}` : selectedPeriodDay;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito relative">
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-200">
        <button onClick={() => navigate("/period-tracker")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Daily Log
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-4 overflow-y-auto">
        <p className="text-[12px] text-gray-500 mb-4 font-medium">
          Record your period day, symptoms and how you feel.
        </p>

        {/* DATE SELECTOR */}
        <div
          onClick={() => setShowDatePicker(true)}
          className="bg-white rounded-xl border border-gray-200 p-3.5 flex items-center justify-between mb-3 cursor-pointer active:bg-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-[#e91e63]" />
            </div>
            <div>
              <p className="text-[12px] text-[#1a237e] font-extrabold mb-0.5">
                Select Date
              </p>
              <p className="text-[13px] text-gray-600 font-medium">
                {logDayNum} October 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#1a237e]">
            <Calendar size={18} />
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </div>

        {/* LAST DAY TOGGLE - Fixed Layout */}
        <div className="bg-[#fff8e1] rounded-xl border border-[#ffe082] p-3 mb-3">
          <div className="flex items-start gap-1.5 mb-2">
            <span className="text-[16px] mt-0.5">🏁</span>
            <p className="text-[12px] font-extrabold text-[#1a237e] flex-1 leading-tight">
              Is this the last day of your period?
            </p>
            <Info size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsLastDay(false)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition ${!isLastDay ? "bg-[#e91e63] text-white" : "bg-white text-gray-600 border border-gray-300"}`}
            >
              No
            </button>
            <button
              onClick={() => setIsLastDay(true)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition ${isLastDay ? "bg-[#e91e63] text-white" : "bg-white text-gray-600 border border-gray-300"}`}
            >
              Yes (Last Day)
            </button>
          </div>
        </div>

        {/* SELECT PERIOD DAY */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 mb-3 shadow-sm">
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#e91e63]" />
              <p className="text-[13px] font-extrabold text-[#1a237e]">
                Select Period Day
              </p>
            </div>
            <div className="flex items-start gap-1">
              <Info size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-[9.5px] text-gray-500 font-medium leading-tight">
                Day 1 is the first day of menstrual bleeding (not spotting
                alone).
              </p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {[
              "Day 1",
              "Day 2",
              "Day 3",
              "Day 4",
              "Day 5",
              "Day 6",
              "Day 7",
            ].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedPeriodDay(d);
                  setIsDayCustom(false);
                }}
                className={`px-3.5 py-2 rounded-lg text-[12px] font-bold whitespace-nowrap transition ${selectedPeriodDay === d && !isDayCustom ? "bg-[#e91e63] text-white" : "bg-pink-50 text-[#1a237e]"}`}
              >
                {d}
              </button>
            ))}
            <button
              onClick={() => setIsDayCustom(true)}
              className={`px-3.5 py-2 rounded-lg text-[12px] font-bold whitespace-nowrap transition ${isDayCustom ? "bg-[#e91e63] text-white" : "bg-pink-50 text-[#1a237e]"}`}
            >
              Custom
            </button>
          </div>

          {/* Custom Day Input */}
          {isDayCustom && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                value={customDay}
                onChange={(e) => setCustomDay(e.target.value)}
                placeholder="Enter day (e.g. 8)"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-[#e91e63]"
              />
            </div>
          )}
        </div>

        {/* SYMPTOMS */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 mb-5 shadow-sm">
          <div className="border-b border-pink-100 pb-2 mb-3">
            <h3 className="text-[14px] font-extrabold text-[#1a237e]">
              Symptoms – {displayDay}
            </h3>
            <p className="text-[9px] text-gray-500 font-medium mt-0.5">
              Select the option that best describes you
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <SymptomRow
              icon="🩸"
              label="Bleeding Flow"
              options={[
                "No bleeding",
                "Spotting",
                "Light",
                "Moderate",
                "Heavy",
              ]}
              selected={symptoms.bleeding}
              onSelect={(v) => handleSymptomSelect("bleeding", v)}
            />
            <SymptomRow
              icon="🫄"
              label="Abdominal Cramps"
              options={["No pain", "Mild pain", "Moderate pain", "Severe pain"]}
              selected={symptoms.cramps}
              onSelect={(v) => handleSymptomSelect("cramps", v)}
            />
            <SymptomRow
              icon="🧍"
              label="Back Pain"
              options={["No pain", "Mild pain", "Moderate pain", "Severe pain"]}
              selected={symptoms.backPain}
              onSelect={(v) => handleSymptomSelect("backPain", v)}
            />
            <SymptomRow
              icon="🦵"
              label="Leg Pain"
              options={["No pain", "Mild pain", "Moderate pain", "Severe pain"]}
              selected={symptoms.legPain}
              onSelect={(v) => handleSymptomSelect("legPain", v)}
            />
            <SymptomRow
              icon="👚"
              label="Breast Tenderness"
              options={["None", "Mild", "Moderate", "Severe"]}
              selected={symptoms.breast}
              onSelect={(v) => handleSymptomSelect("breast", v)}
            />
            <SymptomRow
              icon="🙎‍♀️"
              label="Mood Changes"
              options={["Normal", "Slightly Low", "Irritable", "Very Low"]}
              selected={symptoms.mood}
              onSelect={(v) => handleSymptomSelect("mood", v)}
            />

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
                  ...
                </div>
                <div>
                  <p className="text-[12px] font-extrabold text-[#1a237e]">
                    Other Symptoms
                  </p>
                  <p className="text-[9px] text-gray-500 font-medium">
                    (Optional)
                  </p>
                </div>
              </div>
              <input
                type="text"
                value={symptoms.other}
                onChange={(e) => handleSymptomSelect("other", e.target.value)}
                placeholder="e.g. acne, cold, loose motions, etc."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 outline-none focus:border-[#e91e63]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#e91e63] text-white font-extrabold text-[14px] py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 shadow-md mb-6"
        >
          <Save size={18} />{" "}
          {savedStatus ? "Saved Successfully!" : `Save ${displayDay} Log`}
        </button>
      </main>

      {showDatePicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-[#1a237e]">
                October 2026
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
                const isSelected = logDayNum === dayNum;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setLogDayNum(dayNum);
                      setShowDatePicker(false);
                    }}
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

function SymptomRow({ icon, label, options, selected, onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-[12px] flex-shrink-0">
          {icon}
        </div>
        <p className="text-[12.5px] font-extrabold text-[#1a237e]">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 ml-9">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition ${selected === opt ? "bg-[#e91e63] text-white border-[#e91e63]" : "bg-gray-50 text-gray-600 border-gray-200"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
