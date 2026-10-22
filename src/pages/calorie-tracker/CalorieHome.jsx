import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Utensils,
  Activity,
  Scale,
  Info,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function CalorieHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Calorie Tracker
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 px-4 pt-6 pb-10 flex flex-col gap-5">
          {/* Top Heading & Illustration */}
          <div className="text-center mb-2">
            <h2 className="text-[20px] font-extrabold text-[#14284b] leading-tight">
              Daily Calorie Balance
            </h2>
            <p className="text-[12px] text-gray-500 mt-1 max-w-[280px] mx-auto">
              Track your food intake, calorie burn and see your daily balance.
            </p>
          </div>

          {/* 3 Main Action Cards */}
          <div className="flex flex-col gap-4">
            {/* 1. Nutrition Intake */}
            <button
              onClick={() => navigate("/calorie-tracker/intake")}
              className="w-full bg-[#e4f4e8] rounded-3xl p-4 flex items-center justify-between active:scale-[0.98] transition border border-[#c8ebd4] shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-none shadow-sm text-[#2e9e48]">
                  <Utensils size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-[15px] font-extrabold text-[#14284b]">
                    Today's Nutrition Intake
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug max-w-[180px]">
                    See calories from meals, carbs, protein, etc.
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#2e9e48]" />
            </button>

            {/* 2. Calorie Burn */}
            <button
              onClick={() => navigate("/calorie-tracker/burn")}
              className="w-full bg-[#e0eefc] rounded-3xl p-4 flex items-center justify-between active:scale-[0.98] transition border border-[#cce0f5] shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-none shadow-sm text-[#2f8cf0]">
                  <Activity size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-[15px] font-extrabold text-[#14284b]">
                    Today's Total Calorie Burn
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug max-w-[180px]">
                    Estimate calories burned via activity & exercise.
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#2f8cf0]" />
            </button>

            {/* 3. Calorie Balance */}
            <button
              onClick={() => navigate("/calorie-tracker/balance")}
              className="w-full bg-[#fde3e3] rounded-3xl p-4 flex items-center justify-between active:scale-[0.98] transition border border-[#fbd4d4] shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-none shadow-sm text-[#ef5350]">
                  <Scale size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-[15px] font-extrabold text-[#14284b]">
                    Today's Calorie Balance
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug max-w-[180px]">
                    Difference between consumed and burned calories.
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#ef5350]" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#f4f5fb] rounded-2xl p-3.5 flex items-start gap-3 mt-4 border border-[#eaedff]">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-none mt-0.5 shadow-sm">
              <Info size={14} className="text-[#0d6b63]" />
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
              All values are estimates based on the information you provide and
              may vary. This feature is for general guidance only.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
