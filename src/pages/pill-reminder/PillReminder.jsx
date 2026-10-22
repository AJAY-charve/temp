import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  ChevronRight,
  Pill,
} from "lucide-react";

// LOGO IMPORT (Path Updated)
import logo from "../../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";

// Static Data
const INITIAL_MEDICINES = [
  {
    id: 1,
    name: "Sugar ki Dawai",
    time: "8:00 AM",
    bg: "#e0eefc",
    color: "#2f8cf0",
  },
  {
    id: 2,
    name: "BP ki Dawai",
    time: "2:00 PM",
    bg: "#e4f4e8",
    color: "#2e9e48",
  },
  {
    id: 3,
    name: "Cholesterol ki Dawai",
    time: "9:00 PM",
    bg: "#fdf1d3",
    color: "#ea8a10",
  },
];

export default function PillReminder() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);

  const handleDelete = (id) => {
    if (window.confirm("Remove this medicine?")) {
      setMedicines(medicines.filter((m) => m.id !== id));
    }
  };

  const todayDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Pill Reminder
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN LIST */}
        <main className="flex-1 px-4 pt-4 pb-10">
          {/* Add Medicine Button */}
          <button
            onClick={() => navigate("/pill-reminder/add")}
            className="w-full rounded-2xl p-4 mb-5 flex items-center gap-3 text-left active:scale-[0.99] transition shadow-[0_2px_12px_rgba(15,23,42,0.06)] border border-[#005c55]/20"
            style={{ background: "linear-gradient(135deg,#9cf2e8,#c8f7f1)" }}
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-none shadow-sm">
              <Plus size={24} className="text-[#005c55]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-extrabold text-[#005c55] leading-tight">
                Add Medicine
              </p>
              <p className="text-[10.5px] text-[#005c55]/80 font-medium mt-0.5">
                Set a reminder for your daily pills
              </p>
            </div>
            <ChevronRight size={20} className="text-[#005c55] flex-none" />
          </button>

          {/* Date Header */}
          <div className="flex items-center gap-3 mb-4 px-1">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2F1] flex items-center justify-center flex-none">
              <Calendar size={22} className="text-[#005c55]" />
            </div>
            <div>
              <h2 className="text-[16px] font-extrabold text-[#14284b]">
                Today's Medicines
              </h2>
              <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                {todayDate}
              </p>
            </div>
          </div>

          {/* List of Medicines */}
          <div className="flex flex-col gap-3">
            {medicines.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[14px] font-bold text-gray-800">
                  No medicines added
                </p>
                <p className="text-[12px] text-gray-500 mt-1">
                  Tap 'Add Medicine' to get started.
                </p>
              </div>
            ) : (
              medicines.map((med) => (
                <div
                  key={med.id}
                  className="bg-white rounded-2xl p-3 border border-[#e3ebf7] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3"
                >
                  {/* Icon Area */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-none border border-white/50"
                    style={{ backgroundColor: med.bg }}
                  >
                    <Pill size={24} style={{ color: med.color }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#14284b] truncate">
                      {med.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={14} className="text-[#0d6b63]" />
                      <span className="text-[12px] font-semibold text-[#0d6b63]">
                        {med.time}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-none pl-2 border-l border-gray-100">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E0F2F1] text-[#005c55] active:scale-90">
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(med.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
