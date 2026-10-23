import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Clock,
  Bell,
  X,
  Check,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

/* ---------- Icons (reference ke style mein) ---------- */
const CalendarDotsIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <rect
      x="4"
      y="7"
      width="24"
      height="21"
      rx="4"
      stroke="currentColor"
      strokeWidth="2.8"
    />
    <path d="M4 14h24" stroke="currentColor" strokeWidth="2.8" />
    <path
      d="M10 3.5v6M22 3.5v6"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <g fill="currentColor">
      <rect x="9" y="17.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="14.4" y="17.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="19.8" y="17.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="9" y="22.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="14.4" y="22.5" width="3.2" height="3.2" rx="0.9" />
    </g>
  </svg>
);

const NotePencilIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M17 4.5H9a3.5 3.5 0 0 0-3.5 3.5v16A3.5 3.5 0 0 0 9 27.5h9"
      stroke="#f0245f"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M17 4.5 24 11.500h-4.500a2.500 2.500 0 0 1-2.500-2.500V4.500Z"
      stroke="#f0245f"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M10.500 14.500h6M10.500 19.500h4.500"
      stroke="#f0245f"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="m26 17.500-8 8-3.500.8.800-3.500 8-8a1.800 1.800 0 0 1 2.600 0l.1.1a1.800 1.800 0 0 1 0 2.600Z"
      fill="#f0245f"
    />
  </svg>
);

const CalendarAlertIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect
      x="3.500"
      y="6.500"
      width="23"
      height="21"
      rx="4"
      stroke="#f0245f"
      strokeWidth="2.6"
    />
    <path d="M3.500 13.500h23" stroke="#f0245f" strokeWidth="2.6" />
    <path
      d="M9.500 3v6M20.500 3v6"
      stroke="#f0245f"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <g fill="#f0245f">
      <rect x="8" y="17" width="3" height="3" rx="0.8" />
      <rect x="13.500" y="17" width="3" height="3" rx="0.8" />
      <rect x="8" y="22" width="3" height="3" rx="0.8" />
    </g>
    <circle
      cx="25"
      cy="24.500"
      r="6"
      fill="#f0245f"
      stroke="#ffe1ea"
      strokeWidth="1.500"
    />
    <rect x="24" y="20.500" width="2" height="5" rx="1" fill="#fff" />
    <circle cx="25" cy="27.500" r="1.100" fill="#fff" />
  </svg>
);

const InfoIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 34"
    fill="none"
    className="flex-shrink-0"
  >
    <circle cx="17" cy="17" r="16" fill="#1aa1f0" />
    <circle cx="17" cy="9.500" r="2" fill="#fff" />
    <rect x="15" y="13.500" width="4" height="12" rx="2" fill="#fff" />
  </svg>
);

/* Round pink badge */
const Badge = ({ children }) => (
  <div className="w-8 h-8 rounded-full bg-[#ffe1ea] flex items-center justify-center flex-shrink-0">
    {children}
  </div>
);

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
    setTempHour(h.padStart(2, "0"));
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
    <div className="min-h-screen bg-gradient-to-b from-[#fff4f8] via-[#fff8fb] to-[#fff4f8] flex flex-col font-nunito relative">
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
        <div className="bg-white rounded-xl border border-[#fadce7] p-3.5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge>
                <CalendarDotsIcon size={16} className="text-[#f0245f]" />
              </Badge>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-[12.5px] font-extrabold text-[#1a1f9c] leading-tight">
                  1. Upcoming Period Reminder
                </h3>
                <p className="text-[9.5px] text-[#6b7390] font-medium leading-tight mt-0.5">
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
            <div className="bg-[#fff0f5] rounded-lg p-2.5 border border-[#fbe1ea] mt-2">
              <p className="text-[10.5px] font-extrabold text-[#1a1f9c] mb-2">
                Remind me{" "}
                <span className="font-medium text-[#6b7390]">
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
                  <RadioChip
                    key={d}
                    active={upcomingDays === d}
                    onClick={() => setUpcomingDays(d)}
                    label={d.replace(" ", "\n")}
                    multiline
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <TimeField
                  value={upcomingTime}
                  onClick={() => openTimePicker("upcoming", upcomingTime)}
                />
                <div className="bg-[#e4f0fd] rounded-md p-2 flex items-start gap-1.5">
                  <CalendarDotsIcon
                    size={14}
                    className="text-[#1a237e] flex-shrink-0 mt-0.5"
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
        <div className="bg-white rounded-xl border border-[#fadce7] p-3.5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge>
                <NotePencilIcon size={16} />
              </Badge>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-[12.5px] font-extrabold text-[#1a1f9c] leading-tight">
                  2. Period Log Reminder
                </h3>
                <p className="text-[9.5px] text-[#6b7390] font-medium leading-tight mt-0.5">
                  Get a daily reminder at night to record your bleeding and
                  symptoms while your period is ongoing.
                </p>
              </div>
            </div>
            <ToggleSwitch checked={logToggle} onChange={setLogToggle} />
          </div>

          {logToggle && (
            <div className="bg-[#fff0f5] rounded-lg p-2.5 border border-[#fbe1ea] mt-2">
              <div className="flex flex-col gap-2">
                <TimeField
                  value={logTime}
                  onClick={() => openTimePicker("log", logTime)}
                />
                <div className="bg-[#e4f0fd] rounded-md p-2 flex items-start gap-1.5">
                  <Bell
                    size={14}
                    className="text-[#1a237e] flex-shrink-0 mt-0.5"
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
        <div className="bg-white rounded-xl border border-[#fadce7] p-3.5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge>
                <CalendarAlertIcon size={18} />
              </Badge>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-[12.5px] font-extrabold text-[#1a1f9c] leading-tight">
                  3. Missed Period Reminder
                </h3>
                <p className="text-[9.5px] text-[#6b7390] font-medium leading-tight mt-0.5">
                  Get a reminder if your period has not started after your
                  expected date.
                </p>
              </div>
            </div>
            <ToggleSwitch checked={missedToggle} onChange={setMissedToggle} />
          </div>

          {missedToggle && (
            <div className="bg-[#fff0f5] rounded-lg p-2.5 border border-[#fbe1ea] mt-2">
              <p className="text-[10.5px] font-extrabold text-[#1a1f9c] mb-2">
                Remind me after{" "}
                <span className="font-medium text-[#6b7390]">
                  my expected period is delayed by:
                </span>
              </p>

              <div className="grid grid-cols-5 gap-1 mb-3">
                {["1 day", "2 days", "3 days", "5 days", "7 days"].map((d) => (
                  <RadioChip
                    key={d}
                    active={missedDays === d}
                    onClick={() => setMissedDays(d)}
                    label={d}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <TimeField
                  value={missedTime}
                  onClick={() => openTimePicker("missed", missedTime)}
                />
                <div className="bg-[#e4f0fd] rounded-md p-2 flex items-start gap-1.5">
                  <CalendarDotsIcon
                    size={14}
                    className="text-[#1a237e] flex-shrink-0 mt-0.5"
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

        <button className="w-full bg-[#f0245f] text-white font-extrabold text-[14px] py-3.5 rounded-full flex items-center justify-center gap-2 active:scale-95 shadow-[0_6px_16px_rgba(240,36,95,0.3)] mt-2">
          Save Reminder Settings <ArrowRight size={18} />
        </button>

        <div className="bg-[#e4f0fd] rounded-lg p-2.5 flex items-start gap-2">
          <div className="mt-0.5">
            <InfoIcon size={18} />
          </div>
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
                      className={`w-12 h-8 flex items-center justify-center rounded-lg font-bold text-sm snap-center ${
                        tempHour === h
                          ? "bg-[#fde1ea] text-[#f0245f]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
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
                      className={`w-12 h-8 flex items-center justify-center rounded-lg font-bold text-sm snap-center ${
                        tempMinute === m
                          ? "bg-[#fde1ea] text-[#f0245f]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
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
                      className={`w-12 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${
                        tempAmPm === ap
                          ? "bg-[#fde1ea] text-[#f0245f]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {ap}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={confirmTime}
              className="w-full bg-[#f0245f] text-white font-bold text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <Check size={18} /> Confirm Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Small reusable pieces ---------- */
function RadioChip({ active, onClick, label, multiline = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition ${
        active
          ? "border-[#f0245f] bg-[#fde8f0] text-[#f0245f]"
          : "border-[#e3e8f4] bg-white text-[#4b5575]"
      }`}
    >
      <div
        className={`w-3 h-3 rounded-full border flex items-center justify-center mb-1 ${
          active ? "border-[#f0245f]" : "border-gray-400"
        }`}
      >
        {active && <div className="w-1.5 h-1.5 rounded-full bg-[#f0245f]" />}
      </div>
      <span
        className={`text-[8.5px] font-bold text-center leading-tight ${
          multiline ? "whitespace-pre-wrap" : "whitespace-nowrap"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function TimeField({ value, onClick }) {
  return (
    <div>
      <p className="text-[9.5px] font-bold text-[#1a1f9c] mb-1">
        Reminder time
      </p>
      <div
        onClick={onClick}
        className="bg-white border border-[#e3e8f4] rounded-md p-2 flex items-center justify-between cursor-pointer active:bg-gray-50"
      >
        <div className="flex items-center gap-1.5 text-[#1a237e] text-[11px] font-bold">
          <Clock size={14} className="text-[#6b7390]" /> {value} (Recommended)
        </div>
        <ChevronDown size={14} className="text-[#6b7390]" />
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${
        checked ? "bg-[#f0245f]" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
