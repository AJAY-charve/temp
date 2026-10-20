import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, X, ChevronRight } from "lucide-react";

// LOGO
import logo from "../assets/daibmetalogo.jpeg";

// Images
import symptomsImg from "../assets/cards/knowyoursymptoms.png";
import diseaseImg from "../assets/cards/disease.png";
import bmiImg from "../assets/cards/bmi.jpeg";
import diabetesImg from "../assets/cards/diabetes.jpeg";
import heartImg from "../assets/cards/calories.jpeg";

// Added 'desc' for the list UI
const SYMPTOMS = [
  {
    id: "fever",
    name: "Fever",
    desc: "High body temperature, often due to infection.",
    image: diseaseImg,
  },
  {
    id: "headache",
    name: "Headache",
    desc: "Pain in the head or neck area.",
    image: bmiImg,
  },
  {
    id: "fatigue",
    name: "Fatigue",
    desc: "Constant tiredness or lack of energy.",
    image: diabetesImg,
  },
  {
    id: "cough",
    name: "Cough & Cold",
    desc: "Viral infection affecting nose and throat.",
    image: symptomsImg,
  },
  {
    id: "chest-pain",
    name: "Chest Pain",
    desc: "Discomfort or pain in the chest area.",
    image: heartImg,
  },
];

export default function SymptomsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filter symptoms based on search query
  const filteredSymptoms = SYMPTOMS.filter((sym) =>
    sym.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

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
              Know Your Symptoms
            </h1>
            {/* TOP RIGHT LOGO */}
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 px-4 pt-4">
          {/* SEARCH BAR */}
          <div className="flex items-center gap-2 px-3 py-2.5 mb-3 rounded-xl border border-[#eaedff] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search symptoms..."
              className="flex-1 bg-transparent outline-none text-[12px] text-gray-800 placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 active:scale-90"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Description Text */}
          <p className="text-[11.5px] text-gray-500 mb-5 px-1">
            Identify your symptoms and learn what they might indicate.
          </p>

          {/* Symptom List (DiagnosticDetail Style) */}
          {filteredSymptoms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f4f6fb] flex items-center justify-center mb-3">
                <Search size={24} className="text-gray-300" />
              </div>
              <p className="text-[13px] font-bold text-gray-800">
                No symptoms found
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Try searching with a different keyword.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#eaedff] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              {filteredSymptoms.map((symptom, i) => (
                <button
                  key={symptom.id}
                  onClick={() => navigate(`/symptoms/${symptom.id}`)}
                  className={`w-full flex items-center gap-3 p-3 text-left transition active:bg-[#fafbff] ${
                    i !== filteredSymptoms.length - 1
                      ? "border-b border-[#f0f2f8]"
                      : ""
                  }`}
                >
                  {/* Image */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#f4f6fb]">
                    <img
                      src={symptom.image}
                      alt={symptom.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 py-0.5">
                    <h4 className="text-[14.5px] font-bold text-gray-900 leading-tight truncate">
                      {symptom.name}
                    </h4>
                    {/* UPDATED: Font size increased to 12px */}
                    <p className="text-[12px] text-gray-500 leading-tight mt-1 line-clamp-1 truncate">
                      {symptom.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={18}
                    className="text-gray-300 flex-shrink-0"
                  />
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
