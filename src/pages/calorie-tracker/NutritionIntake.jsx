import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Utensils,
  Flame,
  Calendar,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

const MEALS = [
  {
    id: 1,
    name: "Morning Tea",
    time: "07:30 AM",
    kcal: 60,
    icon: "☕",
    bg: "#fdf1d3",
  },
  {
    id: 2,
    name: "Breakfast",
    time: "09:00 AM",
    kcal: 320,
    icon: "🌅",
    bg: "#e0eefc",
  },
  {
    id: 3,
    name: "Lunch",
    time: "01:30 PM",
    kcal: 620,
    icon: "☀️",
    bg: "#e4f4e8",
  },
  {
    id: 4,
    name: "Evening Snacks",
    time: "05:00 PM",
    kcal: 180,
    icon: "🍪",
    bg: "#fde3e3",
  },
  {
    id: 5,
    name: "Dinner",
    time: "08:00 PM",
    kcal: 350,
    icon: "🌙",
    bg: "#e0eefc",
  },
  {
    id: 6,
    name: "Other / Drinks",
    time: "--",
    kcal: 120,
    icon: "🥤",
    bg: "#EDE7F6",
  },
];

export default function NutritionIntake() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/calorie-tracker")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Nutrition Intake
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-4 overflow-y-auto">
          {/* Top Summary (Date removed since it's only for Today) */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#e4f4e8] flex items-center justify-center flex-none">
              <Utensils size={24} className="text-[#2e9e48]" />
            </div>
            <div>
              <h2 className="text-[16px] font-extrabold text-[#14284b]">
                Today's Nutrition Intake
              </h2>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                Track today's meals and macros.
              </p>
            </div>
          </div>

          {/* Meals List */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden flex flex-col mt-2">
            <div className="p-3 bg-[#faf8ff] border-b border-[#eaedff]">
              <h3 className="text-[13px] font-extrabold text-[#14284b]">
                Meal-wise Calories
              </h3>
            </div>
            {MEALS.map((meal, i) => (
              <button
                key={meal.id}
                className={`flex items-center gap-3 p-3 text-left active:bg-gray-50 transition ${i !== MEALS.length - 1 ? "border-b border-[#f0f2f8]" : ""}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-none text-[18px]"
                  style={{ backgroundColor: meal.bg }}
                >
                  {meal.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#14284b]">
                    {meal.name}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {meal.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-extrabold text-[#14284b]">
                    {meal.kcal}{" "}
                    <span className="text-[10px] text-gray-500">kcal</span>
                  </p>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>

          {/* Total Macros */}
          <div className="bg-[#e4f4e8] rounded-2xl p-4 border border-[#c8ebd4]">
            <h3 className="text-[14px] font-extrabold text-[#14284b] mb-3">
              Total Nutrition Intake
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm">
                <Flame size={16} className="text-[#ef5350] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-500">Calories</p>
                <p className="text-[14px] font-extrabold text-[#14284b]">
                  1,650
                </p>
                <p className="text-[8px] font-bold text-gray-400">kcal</p>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm">
                <span className="text-[14px] block mx-auto mb-1">🌾</span>
                <p className="text-[10px] font-bold text-gray-500">Carbs</p>
                <p className="text-[14px] font-extrabold text-[#14284b]">210</p>
                <p className="text-[8px] font-bold text-gray-400">g</p>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm">
                <span className="text-[14px] block mx-auto mb-1">🍗</span>
                <p className="text-[10px] font-bold text-gray-500">Protein</p>
                <p className="text-[14px] font-extrabold text-[#14284b]">68</p>
                <p className="text-[8px] font-bold text-gray-400">g</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm">
                <span className="text-[14px] block mx-auto mb-1">🥬</span>
                <p className="text-[10px] font-bold text-gray-500">Fiber</p>
                <p className="text-[14px] font-extrabold text-[#14284b]">24</p>
                <p className="text-[8px] font-bold text-gray-400">g</p>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm">
                <span className="text-[14px] block mx-auto mb-1">💧</span>
                <p className="text-[10px] font-bold text-gray-500">Fat</p>
                <p className="text-[14px] font-extrabold text-[#14284b]">62</p>
                <p className="text-[8px] font-bold text-gray-400">g</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/calorie-tracker/burn")}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            Next : Total Calorie Burn <ChevronRight size={16} />
          </button>
        </main>
      </div>
    </div>
  );
}
