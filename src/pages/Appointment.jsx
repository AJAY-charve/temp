import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

// Naya Reusable Modal import kiya
import PatientModal from "../components/PatientModal";

/* ============ DOCTORS DATA ============ */
const doctors = [
  {
    id: 1,
    name: "Dr. Sharma",
    specialty: "Endocrinologist",
    degree: "MBBS, MD",
    color: "#9cf2e8",
    colorDark: "#005c55",
    initials: "DS",
  },
  {
    id: 2,
    name: "Dr. Patel",
    specialty: "Diabetologist",
    degree: "MBBS, DM",
    color: "#dce1ff",
    colorDark: "#4059aa",
    initials: "DP",
  },
  {
    id: 3,
    name: "Dr. Mehta",
    specialty: "Cardiologist",
    degree: "MBBS, MD, DM",
    color: "#ffd8e7",
    colorDark: "#932265",
    initials: "DM",
  },
  {
    id: 4,
    name: "Dr. Iyer",
    specialty: "Dietician",
    degree: "BSc, MSc Nutrition",
    color: "#9cf2e8",
    colorDark: "#005c55",
    initials: "DI",
  },
  {
    id: 5,
    name: "Dr. Khan",
    specialty: "Physician",
    degree: "MBBS, MD",
    color: "#dce1ff",
    colorDark: "#4059aa",
    initials: "DK",
  },
  {
    id: 6,
    name: "Dr. Reddy",
    specialty: "Nephrologist",
    degree: "MBBS, DM",
    color: "#ffd8e7",
    colorDark: "#932265",
    initials: "DR",
  },
];

/* ============ DATES GENERATOR ============ */
const generateDates = () => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const list = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    list.push({
      day: dayNames[d.getDay()],
      date: String(d.getDate()),
      month: monthNames[d.getMonth()],
      year: d.getFullYear(),
      full: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`,
    });
  }
  return list;
};

const allDates = generateDates();
const WEEKS = Math.ceil(allDates.length / 7);

const slots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

const specialties = [
  "All",
  "Endocrine",
  "Diabetes",
  "Cardio",
  "Diet",
  "Physician",
  "Nephro",
];

export default function Appointment() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("All");

  const otherDoctors = doctors.filter((d) => d.id !== selectedDoctor?.id);

  const weekStart = currentWeek * 7;
  const weekDates = allDates.slice(weekStart, weekStart + 7);

  const changeWeek = (dir) => {
    const next = currentWeek + dir;
    if (next < 0 || next >= WEEKS) return;
    setCurrentWeek(next);
  };

  const filteredDoctors = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchChip =
      activeChip === "All" ||
      d.specialty.toLowerCase().includes(activeChip.toLowerCase());
    return matchSearch && matchChip;
  });

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col relative">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => {
                if (selectedDoctor) {
                  setSelectedDoctor(null);
                  setSelectedSlot(null);
                } else {
                  navigate(-1);
                }
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Book Appointment
            </h1>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#005c55] transition">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 overflow-y-auto">
          {selectedDoctor ? (
            <div className="px-4 pt-4">
              <div className="bg-white rounded-3xl border border-[#eaedff] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-5 flex flex-col items-center text-center mb-5">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-3 shadow-lg"
                  style={{
                    backgroundColor: selectedDoctor.color,
                    color: selectedDoctor.colorDark,
                  }}
                >
                  <span className="text-[32px] font-black">
                    {selectedDoctor.initials}
                  </span>
                </div>
                <h2 className="text-[18px] font-bold text-gray-900">
                  {selectedDoctor.name}
                </h2>
                <p className="text-[12px] text-[#005c55] font-semibold mt-0.5">
                  {selectedDoctor.specialty}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  {selectedDoctor.degree}
                </p>
              </div>

              <h3 className="text-[12px] font-bold text-gray-700 mb-2">
                Switch Doctor
              </h3>
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2 mb-5 -mx-4 px-4">
                {otherDoctors.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDoctor(d);
                      setSelectedSlot(null);
                    }}
                    className="flex-shrink-0 flex flex-col items-center gap-1 active:scale-95 transition"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold"
                      style={{ backgroundColor: d.color, color: d.colorDark }}
                    >
                      {d.initials}
                    </div>
                    <span className="text-[9px] font-semibold text-gray-600 truncate w-14 text-center">
                      {d.name.replace("Dr. ", "")}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold text-gray-900">
                  Select Date
                </h3>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => changeWeek(-1)}
                    disabled={currentWeek === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#eaedff] text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-[10px] font-bold text-gray-500 min-w-[42px] text-center">
                    Week {currentWeek + 1}
                  </span>
                  <button
                    onClick={() => changeWeek(1)}
                    disabled={currentWeek === WEEKS - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#eaedff] text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-5 -mx-4 px-4 snap-x snap-mandatory">
                {weekDates.map((d, i) => {
                  const absIndex = weekStart + i;
                  const isSelected = selectedDate === absIndex;
                  return (
                    <button
                      key={absIndex}
                      onClick={() => setSelectedDate(absIndex)}
                      className={`flex-shrink-0 w-[58px] py-2.5 rounded-xl flex flex-col items-center gap-0.5 snap-start transition ${isSelected ? "bg-[#005c55] text-white shadow-lg shadow-[#005c55]/25" : "bg-white border border-[#eaedff] text-gray-700 hover:border-[#005c55]/30"}`}
                    >
                      <span className="text-[10px] font-semibold opacity-80">
                        {d.day}
                      </span>
                      <span className="text-[16px] font-bold">{d.date}</span>
                      <span className="text-[8px] opacity-60">{d.month}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-[#9cf2e8]/30 border border-[#005c55]/15 rounded-xl px-3 py-2.5 mb-5 flex items-center gap-2">
                <CalendarIcon size={14} className="text-[#005c55]" />
                <span className="text-[12px] font-semibold text-[#005c55]">
                  {allDates[selectedDate].full}
                </span>
              </div>

              <h3 className="text-[13px] font-bold text-gray-900 mb-2">
                Available Slots
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSlot(s)}
                    className={`py-2.5 rounded-xl text-[11px] font-bold transition ${selectedSlot === s ? "bg-[#005c55] text-white shadow-md shadow-[#005c55]/25" : "bg-white border border-[#eaedff] text-gray-700 hover:border-[#005c55]/30"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                disabled={!selectedSlot}
                className="w-full bg-[#005c55] text-white font-bold py-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition shadow-lg shadow-[#005c55]/25"
              >
                {selectedSlot
                  ? `Book for ${selectedSlot}`
                  : "Select a Time Slot"}
              </button>
            </div>
          ) : (
            <div className="px-4 pt-5">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                Our Doctors
              </h2>
              <p className="text-[12px] text-gray-500 mb-4">
                Choose a specialist to book
              </p>

              <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-white border border-[#eaedff] shadow-[0_2px_8px_rgba(15,23,42,0.04)] mb-3">
                <Search size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor or specialty..."
                  className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-3 mb-3">
                {specialties.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveChip(s)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition ${activeChip === s ? "bg-[#005c55] text-white shadow-md shadow-[#005c55]/25" : "bg-white border border-[#eaedff] text-gray-600 hover:border-[#005c55]/30"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {filteredDoctors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#eaedff] p-6 text-center mb-6">
                  <p className="text-[13px] font-semibold text-gray-700">
                    No doctors found
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Try a different search or specialty
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-x-3 gap-y-5 mb-6">
                  {filteredDoctors.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setSelectedDoctor(d);
                        setSelectedSlot(null);
                        setSelectedDate(0);
                        setCurrentWeek(0);
                      }}
                      className="flex flex-col items-center gap-2 active:scale-95 transition"
                    >
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.08)] border-2 border-white relative"
                        style={{ backgroundColor: d.color, color: d.colorDark }}
                      >
                        <span className="text-[22px] font-black">
                          {d.initials}
                        </span>
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      </div>
                      <div className="text-center">
                        <p className="text-[11px] font-bold text-gray-900 leading-tight">
                          {d.name.replace("Dr. ", "")}
                        </p>
                        <p className="text-[9px] text-[#005c55] font-semibold mt-0.5">
                          {d.specialty}
                        </p>
                        <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">
                          {d.degree}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* REUSABLE MODAL */}
        {showModal && (
          <PatientModal
            title="Patient Details"
            subtitle={`${selectedDoctor.name} · ${allDates[selectedDate].full} · ${selectedSlot}`}
            confirmText="Confirm Booking"
            onClose={() => setShowModal(false)}
            onConfirm={(data) => {
              console.log("Booked data:", data);
              // Yaha API call ya navigation kar sakte ho
            }}
          />
        )}
      </div>
    </div>
  );
}
