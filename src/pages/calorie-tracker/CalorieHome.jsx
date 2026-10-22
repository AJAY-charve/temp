import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Utensils,
  Activity,
  Scale,
  Info,
  History,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function CalorieHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Today's Nutrition Intake",
      desc: "See calories from meals, carbs, protein, etc.",
      icon: <Utensils size={28} />,
      color: "#2e9e48",
      bg: "#e4f4e8",
      border: "#c8ebd4",
      path: "/calorie-tracker/intake",
    },
    {
      title: "Today's Total Calorie Burn",
      desc: "Estimate calories burned via activity & exercise.",
      icon: <Activity size={28} />,
      color: "#2f8cf0",
      bg: "#e0eefc",
      border: "#cce0f5",
      path: "/calorie-tracker/burn",
    },
    {
      title: "Today's Calorie Balance",
      desc: "Difference between consumed and burned calories.",
      icon: <Scale size={28} />,
      color: "#ef5350",
      bg: "#fde3e3",
      border: "#fbd4d4",
      path: "/calorie-tracker/balance",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
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

        <main className="flex-1 px-4 pt-6 pb-10 flex flex-col gap-5 overflow-y-auto">
          {/* Top Heading */}
          <div className="text-center mb-2">
            <h2 className="text-[22px] font-black text-[#14284b] leading-tight">
              Daily Calorie Balance
            </h2>
            <p className="text-[12px] text-gray-500 mt-1 max-w-[280px] mx-auto font-medium">
              Track your food intake, calorie burn and see your daily balance.
            </p>
          </div>

          {/* Action Cards */}
          <div className="flex flex-col gap-3.5">
            {cards.map((card, idx) => (
              <button
                key={idx}
                onClick={() => navigate(card.path)}
                className="w-full rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition shadow-sm border"
                style={{ backgroundColor: card.bg, borderColor: card.border }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-none shadow-sm"
                    style={{ color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-[15px] font-extrabold text-[#14284b]">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-gray-600 mt-1 leading-snug max-w-[180px] font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: card.color }} />
              </button>
            ))}
          </div>

          {/* History Button */}
          <button
            onClick={() => navigate("/calorie-tracker/history")}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition border border-[#eaedff] shadow-sm mt-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f4f5fb] text-[#14284b] flex items-center justify-center flex-none">
                <History size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-[14px] font-extrabold text-[#14284b]">
                  Calorie History
                </h3>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                  View past records & trends
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Disclaimer */}
          <div className="bg-[#f4f5fb] rounded-xl p-3.5 flex items-start gap-3 mt-4 border border-[#eaedff]">
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
