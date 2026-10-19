import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";

// LOGO
import logo from "../assets/daibmetalogo.jpeg";

// Images
import symptomsImg from "../assets/cards/knowyoursymptoms.png";
import diseaseImg from "../assets/cards/disease.png";
import bmiImg from "../assets/cards/bmi.jpeg";
import diabetesImg from "../assets/cards/diabetes.jpeg";
import heartImg from "../assets/cards/calories.jpeg";

const SYMPTOMS = [
  { id: "fever", name: "Fever", image: diseaseImg },
  { id: "headache", name: "Headache", image: bmiImg },
  { id: "fatigue", name: "Fatigue", image: diabetesImg },
  { id: "cough", name: "Cough & Cold", image: symptomsImg },
  { id: "chest-pain", name: "Chest Pain", image: heartImg },
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
          {/* SEARCH BAR (Now at the top) */}
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

          {/* Description Text (Moved below search bar) */}
          <p className="text-[11.5px] text-gray-500 mb-5 px-1">
            Identify your symptoms and learn what they might indicate.
          </p>

          {/* Card Grid — only Image & Name */}
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
            <div className="grid grid-cols-2 gap-3">
              {filteredSymptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => navigate(`/symptoms/${symptom.id}`)}
                  className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden active:scale-[0.96] transition"
                >
                  {/* Image Area */}
                  <div className="w-full aspect-square bg-[#f4f6fb]">
                    <img
                      src={symptom.image}
                      alt={symptom.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name Area */}
                  <div className="p-2.5 flex items-center justify-center text-center bg-white">
                    <h3 className="text-[12px] font-bold text-gray-900 leading-tight line-clamp-2">
                      {symptom.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
