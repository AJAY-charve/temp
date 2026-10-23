import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  Info,
  Flag,
  Zap,
  Activity,
  Footprints,
  Heart,
  Smile,
  MoreHorizontal,
  X,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

/* ---------- Icons (reference ke style mein) ---------- */
const CalendarDotsIcon = ({ size = 18 }) => (
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

const CalendarGridIcon = ({ size = 18, className = "" }) => (
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

const DropIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3C16 3 6 14 6 20a10 10 0 0 0 20 0C26 14 16 3 16 3Z"
      fill="#f0245f"
    />
    <path d="M11.5 21.5a5 5 0 0 0 7.5 4.2 6 6 0 0 1-7.5-4.2Z" fill="#ffd1df" />
  </svg>
);

const ClipboardListIcon = ({ size = 18 }) => (
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
    <circle cx="11.5" cy="15.5" r="1.4" fill="#f0245f" />
    <circle cx="11.5" cy="21" r="1.4" fill="#f0245f" />
    <path
      d="M15.5 15.5h6M15.5 21h6"
      stroke="#f0245f"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const SaveIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 3h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
      fill="#fff"
    />
    <rect x="7" y="3" width="8" height="5" rx="1" fill="#f0245f" />
    <circle cx="12" cy="14.5" r="3" fill="#f0245f" />
  </svg>
);

/* Round pink badge */
const Badge = ({ children, size = "w-7 h-7" }) => (
  <div
    className={`${size} rounded-full bg-[#ffe1ea] flex items-center justify-center flex-shrink-0`}
  >
    {children}
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-b from-[#fff4f8] via-[#fff8fb] to-[#fff4f8] flex flex-col font-nunito relative">
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
        <p className="text-[12px] text-[#6b7390] mb-4 font-medium">
          Record your period day, symptoms and how you feel.
        </p>

        {/* DATE SELECTOR */}
        <div
          onClick={() => setShowDatePicker(true)}
          className="bg-white rounded-xl border border-[#fadce7] p-3.5 flex items-center justify-between mb-3 cursor-pointer active:bg-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Badge size="w-10 h-10">
              <CalendarDotsIcon size={20} />
            </Badge>
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
            <CalendarGridIcon size={18} />
            <ChevronDown size={18} />
          </div>
        </div>

        {/* LAST DAY TOGGLE */}
        <div className="bg-[#fffaf0] rounded-xl border border-[#fde9c4] p-3 mb-3">
          <div className="flex items-start gap-2 mb-2">
            <Badge>
              <Flag size={14} className="text-[#f0245f]" fill="#f0245f" />
            </Badge>
            <p className="text-[12px] font-extrabold text-[#1a237e] flex-1 leading-tight mt-1">
              Is this the last day of your period?
            </p>
            <Info size={14} className="text-[#8b93a8] mt-1 flex-shrink-0" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsLastDay(false)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition ${
                !isLastDay
                  ? "bg-[#f0245f] text-white"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              No
            </button>
            <button
              onClick={() => setIsLastDay(true)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition ${
                isLastDay
                  ? "bg-[#f0245f] text-white"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              Yes (Last Day)
            </button>
          </div>
        </div>

        {/* SELECT PERIOD DAY */}
        <div className="bg-white rounded-xl border border-[#fadce7] p-3.5 mb-3 shadow-sm">
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex items-center gap-2">
              <Badge>
                <CalendarDotsIcon size={15} />
              </Badge>
              <p className="text-[13px] font-extrabold text-[#1a237e]">
                Select Period Day
              </p>
            </div>
            <div className="flex items-start gap-1">
              <Info size={12} className="text-[#8b93a8] mt-0.5 flex-shrink-0" />
              <p className="text-[9.5px] text-[#6b7390] font-medium leading-tight">
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
                className={`px-3.5 py-2 rounded-lg text-[12px] font-bold whitespace-nowrap transition ${
                  selectedPeriodDay === d && !isDayCustom
                    ? "bg-[#f0245f] text-white shadow-[0_3px_8px_rgba(240,36,95,0.3)]"
                    : "bg-[#fde8f0] text-[#1a237e]"
                }`}
              >
                {d}
              </button>
            ))}
            <button
              onClick={() => setIsDayCustom(true)}
              className={`px-3.5 py-2 rounded-lg text-[12px] font-bold whitespace-nowrap transition ${
                isDayCustom
                  ? "bg-[#f0245f] text-white shadow-[0_3px_8px_rgba(240,36,95,0.3)]"
                  : "bg-[#fde8f0] text-[#1a237e]"
              }`}
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
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-[#f0245f]"
              />
            </div>
          )}
        </div>

        {/* SYMPTOMS */}
        <div className="bg-white rounded-xl border border-[#fadce7] p-3.5 mb-5 shadow-sm">
          <div className="border-b border-pink-100 pb-2 mb-3 flex items-center gap-2">
            <Badge>
              <ClipboardListIcon size={15} />
            </Badge>
            <div>
              <h3 className="text-[14px] font-extrabold text-[#1a237e]">
                Symptoms – {displayDay}
              </h3>
              <p className="text-[9px] text-[#6b7390] font-medium mt-0.5">
                Select the option that best describes you
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SymptomRow
              icon={<DropIcon size={14} />}
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
              icon={<Zap size={14} className="text-[#f0245f]" fill="#f0245f" />}
              label="Abdominal Cramps"
              options={["No pain", "Mild pain", "Moderate pain", "Severe pain"]}
              selected={symptoms.cramps}
              onSelect={(v) => handleSymptomSelect("cramps", v)}
            />
            <SymptomRow
              icon={<Activity size={14} className="text-[#f0245f]" />}
              label="Back Pain"
              options={["No pain", "Mild pain", "Moderate pain", "Severe pain"]}
              selected={symptoms.backPain}
              onSelect={(v) => handleSymptomSelect("backPain", v)}
            />
            <SymptomRow
              icon={<Footprints size={14} className="text-[#f0245f]" />}
              label="Leg Pain"
              options={["No pain", "Mild pain", "Moderate pain", "Severe pain"]}
              selected={symptoms.legPain}
              onSelect={(v) => handleSymptomSelect("legPain", v)}
            />
            <SymptomRow
              icon={
                <Heart size={14} className="text-[#f0245f]" fill="#f0245f" />
              }
              label="Breast Tenderness"
              options={["None", "Mild", "Moderate", "Severe"]}
              selected={symptoms.breast}
              onSelect={(v) => handleSymptomSelect("breast", v)}
            />
            <SymptomRow
              icon={<Smile size={14} className="text-[#f0245f]" />}
              label="Mood Changes"
              options={["Normal", "Slightly Low", "Irritable", "Very Low"]}
              selected={symptoms.mood}
              onSelect={(v) => handleSymptomSelect("mood", v)}
            />

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eef0f6] flex items-center justify-center flex-shrink-0">
                  <MoreHorizontal size={16} className="text-[#1a237e]" />
                </div>
                <div>
                  <p className="text-[12px] font-extrabold text-[#1a237e]">
                    Other Symptoms
                  </p>
                  <p className="text-[9px] text-[#6b7390] font-medium">
                    (Optional)
                  </p>
                </div>
              </div>
              <input
                type="text"
                value={symptoms.other}
                onChange={(e) => handleSymptomSelect("other", e.target.value)}
                placeholder="e.g. acne, cold, loose motions, etc."
                className="w-full bg-white border border-[#e3e8f4] rounded-lg px-3 py-2.5 text-[12px] text-gray-700 outline-none focus:border-[#f0245f] placeholder:text-[#a8afc4]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#f0245f] text-white font-extrabold text-[14px] py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 shadow-[0_6px_16px_rgba(240,36,95,0.3)] mb-6"
        >
          <SaveIcon size={20} />
          {savedStatus ? "Saved Successfully!" : `Save ${displayDay} Log`}
        </button>
      </main>

      {/* Date picker */}
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

function SymptomRow({ icon, label, options, selected, onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[#ffe1ea] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <p className="text-[12.5px] font-extrabold text-[#1a237e]">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 ml-9">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition ${
              selected === opt
                ? "bg-[#f0245f] text-white border-[#f0245f]"
                : "bg-[#f4f6fb] text-[#4b5575] border-[#e3e8f4]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
