import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Flame,
  Info,
  BookmarkPlus,
  Check,
  HelpCircle,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const NAVY = "#14284b";

const MEAL_TYPES = [
  { id: "tea", label: "Tea / Coffee", icon: "☕" },
  { id: "breakfast", label: "Breakfast", icon: "🌅" },
  { id: "lunch", label: "Lunch", icon: "☀️" },
  { id: "dinner", label: "Dinner", icon: "🌙" },
  { id: "snacks", label: "Snacks", icon: "🍪" },
  { id: "drinks", label: "Drinks", icon: "🥤" },
  { id: "fruits", label: "Fruits", icon: "🍎" },
  { id: "other", label: "Other", icon: "•••" },
];

const currentMeal = {
  totalCal: 620,
  macros: { protein: 19, fat: 20, fiber: 12, carbs: 90 },
};

export default function ScanResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;

  const [selectedMealType, setSelectedMealType] = useState("lunch");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (saved) return;
    setSaved(true);
    setTimeout(() => {
      navigate("/scan-food/saved");
    }, 1000);
  };

  return (
    <div className="min-h-[100dvh] flex justify-center bg-[#faf8ff]">
      <div className="w-full max-w-md min-h-[100dvh] flex flex-col">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/scan-food")}
              className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95"
              style={{ color: NAVY }}
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="text-center">
              <h1
                className="font-extrabold text-[16px]"
                style={{ color: NAVY }}
              >
                Scan Result
              </h1>
            </div>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4">
          {/* HEADER INFO */}
          <div>
            <h2 className="text-[20px] font-extrabold text-[#14284b]">
              Scan Your Meal
            </h2>
            <p className="text-[12px] text-gray-500 mt-1">
              Your meal has been analysed
            </p>
          </div>

          {/* IMAGE PREVIEW */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <img
              src={image || "https://via.placeholder.com/400x200?text=No+Image"}
              alt="Meal"
              className="w-full h-[200px] object-cover"
            />
          </div>

          {/* TOTAL CALORIES */}
          <div className="bg-[#e8f5e9] rounded-2xl p-4 text-center border border-[#c8e6c9]">
            <p className="text-[13px] font-bold text-[#14284b] mb-1">
              Total Calories
            </p>
            <div className="flex items-center justify-center gap-1">
              <Flame size={28} className="text-[#e53935]" fill="#e53935" />
              <span className="text-[32px] font-black text-[#14284b] leading-none">
                {currentMeal.totalCal}
              </span>
              <span className="text-[16px] font-bold text-[#14284b] mt-2">
                kcal
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 flex items-center justify-center gap-1">
              Approximate Values <Info size={12} />
            </p>
          </div>

          {/* MACROS GRID */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#fde3e3] rounded-xl p-2 flex flex-col items-center text-center">
              <span className="text-[#ef5350] text-[10px] font-bold mb-1">
                Protein
              </span>
              <span className="text-[16px] font-black text-[#14284b]">
                {currentMeal.macros.protein}g
              </span>
            </div>
            <div className="bg-[#fff4cc] rounded-xl p-2 flex flex-col items-center text-center">
              <span className="text-[#f5a623] text-[10px] font-bold mb-1">
                Fat
              </span>
              <span className="text-[16px] font-black text-[#14284b]">
                {currentMeal.macros.fat}g
              </span>
            </div>
            <div className="bg-[#e6f6e4] rounded-xl p-2 flex flex-col items-center text-center">
              <span className="text-[#4caf50] text-[10px] font-bold mb-1">
                Fiber
              </span>
              <span className="text-[16px] font-black text-[#14284b]">
                {currentMeal.macros.fiber}g
              </span>
            </div>
            <div className="bg-[#e0eefc] rounded-xl p-2 flex flex-col items-center text-center">
              <span className="text-[#2f8cf0] text-[10px] font-bold mb-1">
                Carbs
              </span>
              <span className="text-[16px] font-black text-[#14284b]">
                {currentMeal.macros.carbs}g
              </span>
            </div>
          </div>

          {/* SAVE AS */}
          <div>
            <h3 className="text-[15px] font-extrabold text-[#14284b] mb-0.5">
              Save As
            </h3>
            <p className="text-[11px] text-gray-500 mb-3">
              Select the type of meal to save this entry.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {MEAL_TYPES.map((m) => {
                const active = selectedMealType === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMealType(m.id)}
                    className={`relative flex flex-col items-center justify-center py-3 rounded-xl border transition ${
                      active
                        ? "border-[#0d6b63] bg-[#e8f5e9]"
                        : "border-[#eaedff] bg-white"
                    }`}
                  >
                    <span className="text-[20px] mb-1">{m.icon}</span>
                    <span
                      className={`text-[9.5px] font-bold text-center leading-tight ${active ? "text-[#0d6b63]" : "text-gray-600"}`}
                    >
                      {m.label}
                    </span>
                    {active && (
                      <div className="absolute top-1 right-1 bg-[#0d6b63] rounded-full p-0.5">
                        <Check
                          size={8}
                          className="text-white"
                          strokeWidth={4}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate("/scan-food")}
              className="flex-1 bg-white border-2 border-[#eaedff] text-gray-700 font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Rescan
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex-[1.5] bg-[#0d6b63] text-white font-bold text-[14px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2"
            >
              <BookmarkPlus size={18} />
              {saved ? "Saved!" : `Save`}
            </button>
          </div>

          {/* BOTTOM BANNER */}
          <div className="bg-[#e3f2fd] rounded-xl p-3 flex items-start gap-3 border border-[#bbdefb] mt-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-none">
              <span className="text-[16px]">📊</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-[#1565c0] font-medium leading-snug">
                Track your total daily calories and nutrients using the{" "}
                <strong>Daily Calorie Balance</strong> feature in this app.
              </p>
            </div>
            <ChevronDown size={16} className="text-[#1565c0] -rotate-90 mt-1" />
          </div>

          {/* DISCLAIMER */}
          <div className="bg-[#f4f6fb] rounded-xl p-3 flex items-start gap-2.5 border border-gray-200 mt-2">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-none mt-0.5 border border-gray-300">
              <Info size={12} className="text-gray-600" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-800">Disclaimer</p>
              <p className="text-[10px] text-gray-500 leading-snug mt-0.5">
                AI-generated nutritional estimates. Actual values may vary based
                on portion size, ingredients and preparation. Not a substitute
                for professional dietary advice.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
