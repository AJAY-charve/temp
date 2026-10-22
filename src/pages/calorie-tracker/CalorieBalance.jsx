import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Info,
  Utensils,
  Activity,
  Scale,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function CalorieBalance() {
  const navigate = useNavigate();

  // Hardcoded values for demo (In real app, these come from Intake & Burn pages)
  const intake = 1650;
  const burn = 2260;
  const balance = intake - burn; // -610 (Deficit)

  const isDeficit = balance < 0;
  const absBalance = Math.abs(balance);

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
              Calorie Balance
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-5">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#fde3e3] rounded-2xl p-3.5 border border-[#fbd4d4]">
              <p className="text-[11px] font-bold text-[#14284b]">
                Total Intake
              </p>
              <p className="text-[9px] text-gray-500 mb-2">Consumed today</p>
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-black text-[#ef5350]">
                  {intake} <span className="text-[10px]">kcal</span>
                </p>
                <Utensils size={20} className="text-[#ef5350]/50" />
              </div>
            </div>

            <div className="bg-[#e0eefc] rounded-2xl p-3.5 border border-[#cce0f5]">
              <p className="text-[11px] font-bold text-[#14284b]">Total Burn</p>
              <p className="text-[9px] text-gray-500 mb-2">Burned today</p>
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-black text-[#2f8cf0]">
                  {burn} <span className="text-[10px]">kcal</span>
                </p>
                <Activity size={20} className="text-[#2f8cf0]/50" />
              </div>
            </div>
          </div>

          {/* Gauge Chart Area */}
          <div className="bg-[#e4f4e8] rounded-3xl p-5 border border-[#c8ebd4] flex flex-col items-center relative overflow-hidden">
            <h2 className="text-[15px] font-extrabold text-[#14284b] mb-1">
              Today's Balance
            </h2>
            <p className="text-[11px] text-gray-600 mb-6">
              Calories consumed - Calories burned
            </p>

            {/* SVG Gauge */}
            <div className="relative w-64 h-32 mb-4">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Background Arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Left (Green) - Deficit */}
                <path
                  d="M 20 100 A 80 80 0 0 1 60 26"
                  fill="none"
                  stroke="#2e9e48"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Right (Red) - Surplus */}
                <path
                  d="M 140 26 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#ef5350"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Needle - mock position (left leaning) */}
                <line
                  x1="100"
                  y1="100"
                  x2="50"
                  y2="50"
                  stroke="#14284b"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="8" fill="#14284b" />
              </svg>

              {/* Labels */}
              <span className="absolute bottom-0 left-0 text-[9px] font-bold text-gray-500 -ml-2">
                -1000
                <br />
                <span className="text-[7px]">Deficit</span>
              </span>
              <span className="absolute bottom-0 right-0 text-[9px] font-bold text-gray-500 -mr-2 text-right">
                +1000
                <br />
                <span className="text-[7px]">Surplus</span>
              </span>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-500">
                0<br />
                <span className="text-[7px]">Balanced</span>
              </span>
            </div>

            {/* Result Pill */}
            <div className="bg-white rounded-2xl p-4 w-full shadow-sm text-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-2 ${isDeficit ? "bg-[#e4f4e8] text-[#2e9e48]" : "bg-[#fde3e3] text-[#ef5350]"}`}
              >
                Calorie {isDeficit ? "Deficit" : "Surplus"}
              </span>
              <p
                className={`text-[36px] font-black leading-none ${isDeficit ? "text-[#2e9e48]" : "text-[#ef5350]"}`}
              >
                {isDeficit ? "-" : "+"}
                {absBalance}{" "}
                <span className="text-[14px] font-extrabold">kcal</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-2 px-4 leading-snug">
                You {isDeficit ? "burned" : "consumed"} {absBalance} more
                calories than you {isDeficit ? "consumed" : "burned"} today.
              </p>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e4f4e8] flex items-center justify-center flex-none">
              <Scale size={20} className="text-[#2e9e48]" />
            </div>
            <div>
              <p className="text-[12px] font-extrabold text-[#14284b]">
                What does this mean?
              </p>
              <p className="text-[10px] text-gray-500 leading-snug mt-1">
                A calorie deficit may help in gradual weight loss if maintained
                over time, along with a balanced diet and regular physical
                activity.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#f4f5fb] rounded-2xl p-3.5 flex items-start gap-3 border border-[#eaedff]">
            <Info size={16} className="text-[#0d6b63] flex-none mt-0.5" />
            <p className="text-[9.5px] text-gray-500 leading-relaxed font-medium">
              All values are estimates based on the information you provide and
              may vary. This feature is for general guidance only.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
