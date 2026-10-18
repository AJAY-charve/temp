import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Clock,
  User,
  Award,
  MapPin,
} from "lucide-react";

import PatientModal from "../components/PatientModal";
import logo from "../assets/daibmetalogo.jpeg";

/* ============ DOCTORS DATA ============ */
const doctors = [
  {
    id: 1,
    name: "Dr. Rakesh Gupta",
    specialty: "General Physician",
    image: null,
    bg: "#ebf8fb",
    details: [
      { icon: GraduationCap, label: "Qualifications", value: "MBBS, MD" },
      { icon: Briefcase, label: "Experience", value: "12+ Years" },
      { icon: Clock, label: "Timings", value: "10:00 AM - 05:00 PM" },
      { icon: Award, label: "Achievements", value: "Gold Medalist" },
      { icon: MapPin, label: "Hospital", value: "Apollo Clinic, Indore" },
    ],
  },
  {
    id: 2,
    name: "Dr. Neha Sharma",
    specialty: "Dietician",
    image: null,
    bg: "#fff8e1",
    details: [
      {
        icon: GraduationCap,
        label: "Qualifications",
        value: "BSc, MSc Nutrition",
      },
      { icon: Briefcase, label: "Experience", value: "8+ Years" },
      { icon: Clock, label: "Timings", value: "09:00 AM - 02:00 PM" },
      { icon: Award, label: "Achievements", value: "Certified Nutritionist" },
      { icon: MapPin, label: "Hospital", value: "Health Hub, Indore" },
    ],
  },
  {
    id: 3,
    name: "Dr. Pooja Mehta",
    specialty: "Dermatologist",
    image: null,
    bg: "#ffebee",
    details: [
      { icon: GraduationCap, label: "Qualifications", value: "MBBS, MD" },
      { icon: Briefcase, label: "Experience", value: "10+ Years" },
      { icon: Clock, label: "Timings", value: "11:00 AM - 06:00 PM" },
      { icon: Award, label: "Achievements", value: "Skin Specialist" },
      { icon: MapPin, label: "Hospital", value: "Skin Care Center" },
    ],
  },
  {
    id: 4,
    name: "Dr. Arjun Verma",
    specialty: "Physiotherapist",
    image: null,
    bg: "#e8f5e9",
    details: [
      { icon: GraduationCap, label: "Qualifications", value: "BPT, MPT" },
      { icon: Briefcase, label: "Experience", value: "5+ Years" },
      { icon: Clock, label: "Timings", value: "08:00 AM - 01:00 PM" },
      { icon: Award, label: "Achievements", value: "Sports Rehab Expert" },
      { icon: MapPin, label: "Hospital", value: "Physio Care, Indore" },
    ],
  },
  {
    id: 5,
    name: "Dr. Shalini Desai",
    specialty: "Gynecologist",
    image: null,
    bg: "#f3e5f5",
    details: [
      { icon: GraduationCap, label: "Qualifications", value: "MBBS, DGO" },
      { icon: Briefcase, label: "Experience", value: "15+ Years" },
      { icon: Clock, label: "Timings", value: "10:00 AM - 04:00 PM" },
      { icon: Award, label: "Achievements", value: "Women's Health Expert" },
      { icon: MapPin, label: "Hospital", value: "City Maternity, Indore" },
    ],
  },
];

/* ============ DATES & SLOTS ============ */
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

export default function Appointment() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const weekStart = currentWeek * 7;
  const weekDates = allDates.slice(weekStart, weekStart + 7);

  const changeWeek = (dir) => {
    const next = currentWeek + dir;
    if (next < 0 || next >= WEEKS) return;
    setCurrentWeek(next);
  };

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
              className="w-9 h-9 flex items-center justify-center text-gray-700 active:scale-95 transition"
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-7 w-auto object-contain"
            />
            <button className="w-9 h-9 flex items-center justify-center text-gray-700 active:scale-95 transition">
              <Bell size={20} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-28 overflow-y-auto">
          {selectedDoctor ? (
            /* ===== SELECTED DOCTOR VIEW ===== */
            <div className="px-4 pt-4">
              {/* DOCTOR PROFILE CARD */}
              <div className="bg-[#f8fbff] rounded-2xl p-4 flex gap-4 mb-6 border border-[#e6f0fa]">
                {/* COLUMN 1: Badi Image (Vertically Centered) */}
                <div className="w-[140px] flex-shrink-0 flex items-center justify-center">
                  <div
                    className="w-[130px] h-[180px] rounded-xl overflow-hidden border border-white shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: selectedDoctor.bg }}
                  >
                    {selectedDoctor.image ? (
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={64} className="text-gray-400 opacity-40" />
                    )}
                  </div>
                </div>

                {/* COLUMN 2: Name, Specialty, Details */}
                <div className="flex-1 flex flex-col justify-center py-1">
                  <h2 className="text-[15px] font-extrabold text-[#1a2b4c] leading-tight">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-[11px] text-[#4059aa] font-semibold mb-2.5">
                    {selectedDoctor.specialty}
                  </p>

                  {/* Details List (5 items) */}
                  <div className="flex flex-col gap-2">
                    {selectedDoctor.details.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <item.icon
                          size={13}
                          className="text-[#4059aa] flex-shrink-0 mt-0.5"
                        />
                        <div className="flex flex-col">
                          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider leading-tight">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-gray-800 font-semibold leading-tight mt-0.5">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold text-gray-900">
                  Select Date
                </h3>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => changeWeek(-1)}
                    disabled={currentWeek === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#eaedff] text-gray-700 disabled:opacity-30 active:scale-95 transition"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-[10px] font-bold text-gray-500 min-w-[42px] text-center">
                    Week {currentWeek + 1}
                  </span>
                  <button
                    onClick={() => changeWeek(1)}
                    disabled={currentWeek === WEEKS - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#eaedff] text-gray-700 disabled:opacity-30 active:scale-95 transition"
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

              {/* Slots */}
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
            /* ===== DOCTOR LIST VIEW ===== */
            <div className="px-4 pt-3 pb-4">
              <div className="text-center mb-6">
                <h2 className="text-[19px] font-bold text-[#0f172a] mb-1">
                  Schedule a Doctor's Consultation
                </h2>
                <p className="text-[12px] text-gray-500">
                  Choose a doctor to book your appointment
                </p>
              </div>

              <div className="grid grid-cols-3 gap-x-2.5 gap-y-4">
                {doctors.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDoctor(d);
                      setSelectedSlot(null);
                      setSelectedDate(0);
                      setCurrentWeek(0);
                    }}
                    className="flex flex-col bg-white rounded-md overflow-hidden border border-[#eaedff] shadow-sm active:scale-95 transition text-left"
                  >
                    <div
                      className="w-full h-[80px] relative flex items-center justify-center"
                      style={{ backgroundColor: d.bg }}
                    >
                      <User size={30} className="text-gray-400 opacity-40" />
                    </div>

                    <div className="p-2 border-t border-gray-50">
                      <p className="text-[10px] font-bold text-[#0f172a] leading-tight truncate">
                        {d.name}
                      </p>
                      <p className="text-[8px] text-[#005c55] font-semibold mt-0.5 leading-tight truncate">
                        {d.specialty}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* LOCATION BANNER */}
        {!selectedDoctor && (
          <div className="fixed bottom-4 inset-x-0 z-40 px-4 w-full max-w-md mx-auto">
            <div className="bg-[#fffcf5] border border-[#f5eedc] rounded-xl px-3 py-3 flex items-center gap-2 shadow-sm">
              <AlertCircle size={16} className="text-[#c99a45] flex-shrink-0" />
              <p className="text-[10px] text-[#8f794a] leading-snug font-medium">
                Doctor consultation services are currently available only Indore
                (MP).
              </p>
            </div>
          </div>
        )}

        {/* REUSABLE MODAL */}
        {showModal && (
          <PatientModal
            title="Patient Details"
            subtitle={`${selectedDoctor.name} · ${allDates[selectedDate].full} · ${selectedSlot}`}
            confirmText="Confirm Booking"
            onClose={() => setShowModal(false)}
            onConfirm={(data) => {
              console.log("Booked data:", data);
            }}
          />
        )}
      </div>
    </div>
  );
}
