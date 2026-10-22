import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Calendar, Clock } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function AddBP() {
  const navigate = useNavigate();

  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");

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

  const handleSave = () => {
    if (!systolic || !diastolic) return alert("Please enter BP values");
    navigate("/sugar-bp");
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Add Blood Pressure
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-5">
          {/* Banner */}
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-[#eaedff] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#e0eefc] flex items-center justify-center flex-none">
              <Activity size={24} className="text-[#2f8cf0]" />
            </div>
            <div>
              <h2 className="text-[15px] font-extrabold text-[#14284b]">
                Enter your Blood Pressure
              </h2>
              <p className="text-[11px] text-gray-500 mt-1">
                Measure and enter the reading below.
              </p>
            </div>
          </div>

          {/* Systolic */}
          <div>
            <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
              Systolic BP (Upper Number)
            </label>
            <div className="flex items-center px-4 py-3.5 rounded-xl border border-[#eaedff] bg-white focus-within:border-[#0d6b63] transition shadow-sm">
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                placeholder="e.g. 120"
                className="flex-1 bg-transparent outline-none text-[20px] font-extrabold text-[#14284b] placeholder-gray-300"
              />
              <span className="text-[13px] font-semibold text-gray-500">
                mmHg
              </span>
            </div>
          </div>

          {/* Diastolic */}
          <div>
            <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
              Diastolic BP (Lower Number)
            </label>
            <div className="flex items-center px-4 py-3.5 rounded-xl border border-[#eaedff] bg-white focus-within:border-[#0d6b63] transition shadow-sm">
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                placeholder="e.g. 80"
                className="flex-1 bg-transparent outline-none text-[20px] font-extrabold text-[#14284b] placeholder-gray-300"
              />
              <span className="text-[13px] font-semibold text-gray-500">
                mmHg
              </span>
            </div>
          </div>

          {/* Pulse */}
          <div>
            <label className="text-[12px] font-bold text-gray-700 mb-1.5 block">
              Pulse Rate (Optional)
            </label>
            <div className="flex items-center px-4 py-3 rounded-xl border border-[#eaedff] bg-white focus-within:border-[#0d6b63] transition shadow-sm">
              <input
                type="number"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                placeholder="Enter pulse rate"
                className="flex-1 bg-transparent outline-none text-[15px] font-semibold text-[#14284b] placeholder-gray-300"
              />
              <span className="text-[12px] font-semibold text-gray-500">
                bpm
              </span>
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
              className="w-full px-4 py-3 rounded-xl border border-[#eaedff] bg-white outline-none text-[13px] text-gray-800 resize-none h-24 shadow-sm"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-4 rounded-xl active:scale-[0.98] transition shadow-lg mt-2"
          >
            Save Reading
          </button>
        </main>
      </div>
    </div>
  );
}
