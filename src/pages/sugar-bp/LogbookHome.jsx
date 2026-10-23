import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, History, TrendingUp } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

// Importing your custom images
import bpImg from "../../assets/bp-sugar/bp.png";
import sugarImg from "../../assets/bp-sugar/sugar.png";

export default function LogbookHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Sugar & BP Logbook
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-4">
          {/* Add BP Card */}
          <button
            onClick={() => navigate("/sugar-bp/add-bp")}
            className="w-full rounded-3xl p-4 flex items-center justify-between active:scale-[0.98] transition bg-white border border-[#eaedff] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-4">
              {/* Square container for image */}
              <div className="w-14 h-14 flex items-center justify-center flex-none">
                <img
                  src={bpImg}
                  alt="Blood Pressure"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <h2 className="text-[16px] font-extrabold text-[#14284b]">
                  Add Blood Pressure
                </h2>
                <p className="text-[11.5px] text-gray-500 font-medium mt-1">
                  Record your BP reading
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f4f5fb] flex items-center justify-center flex-none">
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </button>

          {/* Add Sugar Card */}
          <button
            onClick={() => navigate("/sugar-bp/add-sugar")}
            className="w-full rounded-3xl p-4 flex items-center justify-between active:scale-[0.98] transition bg-white border border-[#eaedff] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-4">
              {/* Square container for image */}
              <div className="w-14 h-14 flex items-center justify-center flex-none">
                <img
                  src={sugarImg}
                  alt="Blood Sugar"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <h2 className="text-[16px] font-extrabold text-[#14284b]">
                  Add Blood Sugar
                </h2>
                <p className="text-[11.5px] text-gray-500 font-medium mt-1">
                  Record your sugar reading
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f4f5fb] flex items-center justify-center flex-none">
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </button>

          {/* Bottom Actions */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {/* View History */}
            <button
              onClick={() => navigate("/sugar-bp/history?tab=sugar")}
              className="bg-white rounded-3xl p-4 border border-[#eaedff] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col items-start justify-between min-h-[140px] active:scale-95 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fdf1d3] flex items-center justify-center mb-3">
                <History size={20} className="text-[#d97706]" />
              </div>
              <div>
                <h3 className="text-[13.5px] font-extrabold text-[#14284b]">
                  View History
                </h3>
                <p className="text-[10px] text-gray-500 mt-1 text-left leading-tight">
                  See all past readings
                </p>
              </div>
              <div className="mt-3 w-6 h-6 rounded-full bg-[#f4f5fb] flex items-center justify-center self-end">
                <ChevronRight size={14} className="text-gray-500" />
              </div>
            </button>

            {/* View Trends */}
            <button
              onClick={() => navigate("/sugar-bp/trends?tab=sugar")}
              className="bg-white rounded-3xl p-4 border border-[#eaedff] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col items-start justify-between min-h-[140px] active:scale-95 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e4f4e8] flex items-center justify-center mb-3">
                <TrendingUp size={20} className="text-[#2e9e48]" />
              </div>
              <div>
                <h3 className="text-[13.5px] font-extrabold text-[#14284b]">
                  View Trends
                </h3>
                <p className="text-[10px] text-gray-500 mt-1 text-left leading-tight">
                  Graphs and progress
                </p>
              </div>
              <div className="mt-3 w-6 h-6 rounded-full bg-[#f4f5fb] flex items-center justify-center self-end">
                <ChevronRight size={14} className="text-gray-500" />
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
