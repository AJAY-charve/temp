import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Bell,
  Info,
  X,
  Check,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function PeriodReminders() {
  const navigate = useNavigate();

  const [upcomingToggle, setUpcomingToggle] = useState(true);
  const [upcomingDays, setUpcomingDays] = useState("7 days before");
  const [upcomingTime, setUpcomingTime] = useState("9:00 AM");

  const [logToggle, setLogToggle] = useState(true);
  const [logTime, setLogTime] = useState("10:00 PM");

  const [missedToggle, setMissedToggle] = useState(true);
  const [missedDays, setMissedDays] = useState("2 days");
  const [missedTime, setMissedTime] = useState("9:00 AM");

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentPickerTarget, setCurrentPickerTarget] = useState(null);
  const [tempHour, setTempHour] = useState("09");
  const [tempMinute, setTempMinute] = useState("00");
  const [tempAmPm, setTempAmPm] = useState("AM");

  const openTimePicker = (target, currentTime) => {
    const [time, ampm] = currentTime.split(" ");
    const [h, m] = time.split(":");
    setTempHour(h);
    setTempMinute(m);
    setTempAmPm(ampm);
    setCurrentPickerTarget(target);
    setShowTimePicker(true);
  };

  const confirmTime = () => {
    const newTime = `${tempHour}:${tempMinute} ${tempAmPm}`;
    if (currentPickerTarget === "upcoming") setUpcomingTime(newTime);
    if (currentPickerTarget === "log") setLogTime(newTime);
    if (currentPickerTarget === "missed") setMissedTime(newTime);
    setShowTimePicker(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito relative">
      {/* COMPACT HEADER */}
      <header className="px-3 py-3 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-40">
        <button
          onClick={() => navigate("/period-tracker")}
          className="p-1 w-8 flex-shrink-0"
        >
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <div className="flex-1 text-center px-1">
          <h1 className="text-[16px] font-black text-[#1a237e] leading-tight">
            Reminders
          </h1>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">
            Stay on track, never miss an update.
          </p>
        </div>
        <img
          src={logo}
          alt="DiabMeta"
          className="h-7 object-contain w-14 flex-shrink-0"
        />
      </header>

      <main className="flex-1 px-3 py-4 overflow-y-auto space-y-3 pb-8">
        {/* 1. UPCOMING */}
        <div className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <Calendar size={16} className="text-[#e91e63]" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-[12.5px] font-extrabold text-[#1a237e] leading-tight">
                  1. Upcoming Period Reminder
                </h3>
                <p className="text-[9.5px] text-gray-500 font-medium leading-tight mt-0.5">
                  Get a reminder before your expected period.
                </p>
              </div>
            </div>
            <ToggleSwitch
              checked={upcomingToggle}
              onChange={setUpcomingToggle}
            />
          </div>

          {upcomingToggle && (
            <div className="bg-[#fdf2f6] rounded-lg p-2.5 border border-pink-100 mt-2">
              <p className="text-[10.5px] font-extrabold text-[#1a237e] mb-2">
                Remind me{" "}
                <span className="font-medium text-gray-600">
                  before expected period:
                </span>
              </p>

              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {[
                  "1 day before",
                  "2 days before",
                  "3 days before",
                  "7 days before",
                ].map((d) => (
                  <button
                    key={d}
                    onClick={() => setUpcomingDays(d)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition ${
                      upcomingDays === d
                        ? "border-[#e91e63] bg-white text-[#e91e63]"
                        : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border flex items-center justify-center mb-1 ${upcomingDays === d ? "border-[#e91e63]" : "border-gray-300"}`}
                    >
                      {upcomingDays === d && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e91e63]" />
                      )}
                    </div>
                    <span className="text-[8.5px] font-bold text-center leading-tight whitespace-pre-wrap">
                      {d.replace(" ", "\n")}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[9.5px] font-bold text-[#1a237e] mb-1">
                    Reminder time
                  </p>
                  <div
                    onClick={() => openTimePicker("upcoming", upcomingTime)}
                    className="bg-white border border-gray-200 rounded-md p-2 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-gray-600 text-[11px] font-bold">
                      <Clock size={14} className="text-gray-400" />{" "}
                      {upcomingTime} (Recommended)
                    </div>
                    <ChevronRight
                      size={14}
                      className="rotate-90 text-gray-400"
                    />
                  </div>
                </div>
                <div className="bg-[#e3f2fd] rounded-md p-2 flex items-start gap-1.5">
                  <Calendar
                    size={14}
                    className="text-[#2196F3] flex-shrink-0 mt-0.5"
                  />
                  <p className="text-[9.5px] text-[#1a237e] font-medium leading-tight">
                    You will get a reminder <b>{upcomingDays}</b> your expected
                    period at {upcomingTime}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. PERIOD LOG */}
        <div className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <span className="text-[14px]">📝</span>
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-[12.5px] font-extrabold text-[#1a237e] leading-tight">
                  2. Period Log Reminder
                </h3>
                <p className="text-[9.5px] text-gray-500 font-medium leading-tight mt-0.5">
                  Get a daily reminder at night to record your bleeding and
                  symptoms while your period is ongoing.
                </p>
              </div>
            </div>
            <ToggleSwitch checked={logToggle} onChange={setLogToggle} />
          </div>

          {logToggle && (
            <div className="bg-[#fdf2f6] rounded-lg p-2.5 border border-pink-100 mt-2">
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[9.5px] font-bold text-[#1a237e] mb-1">
                    Reminder time
                  </p>
                  <div
                    onClick={() => openTimePicker("log", logTime)}
                    className="bg-white border border-gray-200 rounded-md p-2 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-gray-600 text-[11px] font-bold">
                      <Clock size={14} className="text-gray-400" /> {logTime}{" "}
                      (Recommended)
                    </div>
                    <ChevronRight
                      size={14}
                      className="rotate-90 text-gray-400"
                    />
                  </div>
                </div>
                <div className="bg-[#e3f2fd] rounded-md p-2 flex items-start gap-1.5">
                  <Bell
                    size={14}
                    className="text-[#2196F3] flex-shrink-0 mt-0.5"
                  />
                  <p className="text-[9.5px] text-[#1a237e] font-medium leading-tight">
                    You will get this reminder every night at <b>{logTime}</b>{" "}
                    during your period until you mark it as ended.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. MISSED */}
        <div className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 relative">
                <Calendar size={16} className="text-[#e91e63]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#e91e63] rounded-full border border-white flex items-center justify-center text-white text-[6px] font-bold">
                  !
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-[12.5px] font-extrabold text-[#1a237e] leading-tight">
                  3. Missed Period Reminder
                </h3>
                <p className="text-[9.5px] text-gray-500 font-medium leading-tight mt-0.5">
                  Get a reminder if your period has not started after your
                  expected date.
                </p>
              </div>
            </div>
            <ToggleSwitch checked={missedToggle} onChange={setMissedToggle} />
          </div>

          {missedToggle && (
            <div className="bg-[#fdf2f6] rounded-lg p-2.5 border border-pink-100 mt-2">
              <p className="text-[10.5px] font-extrabold text-[#1a237e] mb-2">
                Remind me after{" "}
                <span className="font-medium text-gray-600">
                  my expected period is delayed by:
                </span>
              </p>

              <div className="grid grid-cols-5 gap-1 mb-3">
                {["1 day", "2 days", "3 days", "5 days", "7 days"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setMissedDays(d)}
                    className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg border transition ${
                      missedDays === d
                        ? "border-[#e91e63] bg-white text-[#e91e63]"
                        : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border flex items-center justify-center mb-1 ${missedDays === d ? "border-[#e91e63]" : "border-gray-300"}`}
                    >
                      {missedDays === d && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e91e63]" />
                      )}
                    </div>
                    <span className="text-[8.5px] font-bold text-center leading-tight whitespace-nowrap">
                      {d}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[9.5px] font-bold text-[#1a237e] mb-1">
                    Reminder time
                  </p>
                  <div
                    onClick={() => openTimePicker("missed", missedTime)}
                    className="bg-white border border-gray-200 rounded-md p-2 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-gray-600 text-[11px] font-bold">
                      <Clock size={14} className="text-gray-400" /> {missedTime}{" "}
                      (Recommended)
                    </div>
                    <ChevronRight
                      size={14}
                      className="rotate-90 text-gray-400"
                    />
                  </div>
                </div>
                <div className="bg-[#e3f2fd] rounded-md p-2 flex items-start gap-1.5">
                  <Calendar
                    size={14}
                    className="text-[#2196F3] flex-shrink-0 mt-0.5"
                  />
                  <p className="text-[9.5px] text-[#1a237e] font-medium leading-tight">
                    You will get a reminder <b>{missedDays}</b> after your
                    expected period date at {missedTime}, if no new period has
                    been recorded.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="w-full bg-[#e91e63] text-white font-extrabold text-[14px] py-3.5 rounded-full flex items-center justify-center gap-2 active:scale-95 shadow-md mt-2">
          Save Reminder Settings <ChevronRight size={18} />
        </button>

        <div className="bg-[#e3f2fd] rounded-lg p-2.5 flex items-start gap-2">
          <Info size={16} className="text-[#2196F3] flex-shrink-0 mt-0.5" />
          <p className="text-[9.5px] text-[#1a237e] leading-tight font-medium">
            These reminders are based on the information you record. Predicted
            dates are estimates, not diagnoses. Please consult a doctor if you
            have any concerns.
          </p>
        </div>
      </main>

      {/* CUSTOM TIME PICKER MODAL */}
      {showTimePicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#1a237e]">
                Select Reminder Time
              </h3>
              <button
                onClick={() => setShowTimePicker(false)}
                className="p-1 bg-gray-100 rounded-full"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold mb-2">
                  Hour
                </span>
                <div className="flex flex-col gap-2 h-32 overflow-y-auto scrollbar-hide snap-y">
                  {[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ].map((h) => (
                    <button
                      key={h}
                      onClick={() => setTempHour(h)}
                      className={`w-12 h-8 flex items-center justify-center rounded-lg font-bold text-sm snap-center ${tempHour === h ? "bg-pink-100 text-[#e91e63]" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-2xl font-black text-gray-300 pb-6">:</span>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold mb-2">
                  Minute
                </span>
                <div className="flex flex-col gap-2 h-32 overflow-y-auto scrollbar-hide snap-y">
                  {["00", "15", "30", "45"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTempMinute(m)}
                      className={`w-12 h-8 flex items-center justify-center rounded-lg font-bold text-sm snap-center ${tempMinute === m ? "bg-pink-100 text-[#e91e63]" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold mb-2">
                  AM/PM
                </span>
                <div className="flex flex-col gap-2 h-32">
                  {["AM", "PM"].map((ap) => (
                    <button
                      key={ap}
                      onClick={() => setTempAmPm(ap)}
                      className={`w-12 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${tempAmPm === ap ? "bg-pink-100 text-[#e91e63]" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      {ap}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={confirmTime}
              className="w-full bg-[#e91e63] text-white font-bold text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <Check size={18} /> Confirm Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${checked ? "bg-[#e91e63]" : "bg-gray-300"}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}
