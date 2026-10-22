import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, Calendar, Utensils } from "lucide-react";

const NAVY = "#14284b";

/* ============ STATIC DATA ============ */
const getTodayStr = () => new Date().toISOString().split("T")[0];
const getYesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

const MEALS_DATA = [
  {
    id: 1,
    mealType: "Breakfast",
    date: getTodayStr(),
    time: "9:10 AM",
    totalCal: 350,
    macros: { protein: 12, fat: 8, fiber: 5, carbs: 55 },
  },
  {
    id: 2,
    mealType: "Lunch",
    date: getTodayStr(),
    time: "1:20 PM",
    totalCal: 620,
    macros: { protein: 19, fat: 20, fiber: 12, carbs: 90 },
  },
  {
    id: 3,
    mealType: "Dinner",
    date: getYesterdayStr(),
    time: "8:45 PM",
    totalCal: 480,
    macros: { protein: 22, fat: 15, fiber: 8, carbs: 60 },
  },
  {
    id: 4,
    mealType: "Snacks",
    date: "2026-10-18",
    time: "4:30 PM",
    totalCal: 150,
    macros: { protein: 4, fat: 2, fiber: 3, carbs: 30 },
  },
  {
    id: 5,
    mealType: "Lunch",
    date: "2026-10-17",
    time: "1:15 PM",
    totalCal: 540,
    macros: { protein: 18, fat: 16, fiber: 10, carbs: 75 },
  },
];

export default function SavedMeals() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("today"); // 'today' | 'yesterday' | 'custom'

  const [customDate, setCustomDate] = useState(getTodayStr());
  const dateInputRef = useRef(null);

  const filteredMeals = useMemo(() => {
    let meals = MEALS_DATA;

    if (filterType === "today") {
      meals = meals.filter((m) => m.date === getTodayStr());
    } else if (filterType === "yesterday") {
      meals = meals.filter((m) => m.date === getYesterdayStr());
    } else if (filterType === "custom" && customDate) {
      meals = meals.filter((m) => m.date === customDate);
    }

    return meals.sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`),
    );
  }, [filterType, customDate]);

  const handleDateChange = (e) => {
    setCustomDate(e.target.value);
    setFilterType("custom");
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
            <h1 className="font-extrabold text-[16px]" style={{ color: NAVY }}>
              Saved Meals
            </h1>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4">
          {/* DATE FILTER & PICKER */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setFilterType("today")}
              className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition border ${
                filterType === "today"
                  ? "bg-[#0d6b63] text-white border-[#0d6b63] shadow-sm"
                  : "bg-white text-gray-600 border-[#eaedff]"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilterType("yesterday")}
              className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition border ${
                filterType === "yesterday"
                  ? "bg-[#0d6b63] text-white border-[#0d6b63] shadow-sm"
                  : "bg-white text-gray-600 border-[#eaedff]"
              }`}
            >
              Yesterday
            </button>

            <div className="relative flex-1">
              <button
                onClick={() => {
                  setFilterType("custom");
                  setTimeout(() => {
                    try {
                      dateInputRef.current?.showPicker();
                    } catch {
                      dateInputRef.current?.click();
                    }
                  }, 50);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-bold transition border ${
                  filterType === "custom"
                    ? "bg-[#0d6b63] text-white border-[#0d6b63] shadow-sm"
                    : "bg-white text-gray-600 border-[#eaedff]"
                }`}
              >
                <span className="truncate">
                  {filterType === "custom"
                    ? new Date(customDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })
                    : "Custom"}
                </span>
                <Calendar
                  size={14}
                  className={
                    filterType === "custom" ? "text-white" : "text-gray-400"
                  }
                />
              </button>

              <input
                type="date"
                ref={dateInputRef}
                value={customDate}
                onChange={handleDateChange}
                className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
              />
            </div>
          </div>

          {/* MEALS LIST */}
          {filteredMeals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[#eef1f8] flex items-center justify-center mb-3">
                <Utensils size={28} className="text-gray-400" />
              </div>
              <p className="text-[13px] font-bold text-gray-800">
                No meals found
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                {filterType === "custom"
                  ? `No meals saved on ${new Date(customDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`
                  : "Try a different date filter."}
              </p>
            </div>
          ) : (
            filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl border border-[#e3ebf7] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-bold text-[#0d6b63] bg-[#E0F2F1] px-2.5 py-1 rounded-md">
                    {meal.mealType}
                  </span>
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(meal.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                    , {meal.time}
                  </span>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-[#8b5a2b] bg-[#fdf1dc] px-2 py-0.5 rounded">
                      P {meal.macros.protein}g
                    </span>
                    <span className="text-[11px] font-bold text-[#b58900] bg-[#fff4cc] px-2 py-0.5 rounded">
                      F {meal.macros.fat}g
                    </span>
                    <span className="text-[11px] font-bold text-[#5b8fc7] bg-[#eaf3fb] px-2 py-0.5 rounded">
                      C {meal.macros.carbs}g
                    </span>
                  </div>
                  <p className="text-[18px] font-black" style={{ color: NAVY }}>
                    {meal.totalCal} <span className="text-[12px]">kcal</span>
                  </p>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
