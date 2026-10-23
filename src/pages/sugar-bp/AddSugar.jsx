import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ChevronDown } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

// Importing your custom Sugar image
import sugarImg from "../../assets/bp-sugar/sugar.png";

const SUGAR_TYPES = [
  { id: "fasting", label: "Fasting (Before Breakfast)" },
  { id: "postBreakfast", label: "Post Breakfast (2 hr)" },
  { id: "beforeLunch", label: "Before Lunch" },
  { id: "postLunch", label: "Post Lunch (2 hr)" },
  { id: "beforeDinner", label: "Before Dinner" },
  { id: "postDinner", label: "Post Dinner (2 hr)" },
  { id: "random", label: "Random" },
];

export default function AddSugar() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [type, setType] = useState("fasting");

  // Date & Time State
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("08:00");
  const [notes, setNotes] = useState("");

  // Refs for Native Pickers
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // Helper to format Date (YYYY-MM-DD to "20 Oct 2026")
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Helper to format Time (HH:mm to "08:00 AM")
  const formatTime = (timeStr) => {
    const [h, m] = timeStr.split(":");
    const hr = parseInt(h);
    const ampm = hr >= 12 ? "PM" : "AM";
    const formattedHr = hr % 12 || 12;
    return `${formattedHr.toString().padStart(2, "0")}:${m} ${ampm}`;
  };

  const getStatus = () => {
    const val = Number(value);
    if (!val) return { text: "", color: "text-gray-400" };

    const isBeforeMeal = ["fasting", "beforeLunch", "beforeDinner"].includes(
      type,
    );

    if (val < 70) return { text: "Hypoglycemia (Low)", color: "text-red-500" };

    if (isBeforeMeal) {
      if (val <= 130) return { text: "Normal", color: "text-[#2e9e48]" };
      return { text: "High", color: "text-[#ef5350]" };
    } else {
      if (val <= 160) return { text: "Normal", color: "text-[#2e9e48]" };
      return { text: "High", color: "text-[#ef5350]" };
    }
  };

  const status = getStatus();

  const handleSave = () => {
    if (!value) return alert("Please enter sugar value");
    navigate("/sugar-bp");
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Add Blood Sugar
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-5">
          {/* Banner with custom image */}
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-[#eaedff] shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center flex-none">
              <img
                src={sugarImg}
                alt="Blood Sugar"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-[15px] font-extrabold text-[#14284b]">
                Enter your Blood Sugar
              </h2>
              <p className="text-[11px] text-gray-500 mt-1">
                Measure and enter the reading below.
              </p>
            </div>
          </div>

          {/* Sugar Value Input */}
          <div>
            <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
              Blood Sugar (mg/dL)
            </label>
            <div className="flex items-center px-4 py-3.5 rounded-xl border border-[#eaedff] bg-white focus-within:border-[#0d6b63] transition shadow-sm">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 98"
                className="flex-1 bg-transparent outline-none text-[22px] font-extrabold text-[#14284b] placeholder-gray-300"
              />
              <span className="text-[13px] font-semibold text-gray-500">
                mg/dL
              </span>
            </div>
            {value && (
              <p className={`text-[12px] font-bold mt-1.5 ${status.color}`}>
                Status: {status.text}
              </p>
            )}
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
              When did you check?
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[#eaedff] bg-white outline-none text-[13px] font-semibold text-gray-800 appearance-none shadow-sm cursor-pointer hover:border-[#0d6b63] transition"
              >
                {SUGAR_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* Date & Time (Custom UI) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date Picker */}
            <div>
              <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
                Date
              </label>
              <div
                onClick={() => {
                  try {
                    dateInputRef.current?.showPicker();
                  } catch {
                    dateInputRef.current?.click();
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-3.5 rounded-xl border border-[#eaedff] bg-white shadow-sm cursor-pointer hover:border-[#0d6b63] transition"
              >
                <Calendar size={16} className="text-gray-400" />
                <span className="text-[13px] font-semibold text-gray-800 flex-1 truncate">
                  {formatDate(date)}
                </span>
              </div>
              <input
                type="date"
                ref={dateInputRef}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute opacity-0 pointer-events-none w-0 h-0"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
                Time
              </label>
              <div
                onClick={() => {
                  try {
                    timeInputRef.current?.showPicker();
                  } catch {
                    timeInputRef.current?.click();
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-3.5 rounded-xl border border-[#eaedff] bg-white shadow-sm cursor-pointer hover:border-[#0d6b63] transition"
              >
                <Clock size={16} className="text-gray-400" />
                <span className="text-[13px] font-semibold text-gray-800 flex-1 truncate">
                  {formatTime(time)}
                </span>
              </div>
              <input
                type="time"
                ref={timeInputRef}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="absolute opacity-0 pointer-events-none w-0 h-0"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g. Feeling well, after exercise, etc."
              className="w-full px-4 py-3 rounded-xl border border-[#eaedff] bg-white outline-none text-[13px] text-gray-800 resize-none h-24 shadow-sm focus:border-[#0d6b63] transition"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-4 rounded-xl active:scale-[0.98] transition shadow-lg mt-2 hover:bg-[#0a5750]"
          >
            Save Reading
          </button>
        </main>
      </div>
    </div>
  );
}
