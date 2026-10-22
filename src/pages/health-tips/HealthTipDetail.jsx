import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, BookOpen, Info, Clock } from "lucide-react";
import { healthTipsData } from "./HealthTipsData";
import logo from "../../assets/daibmetalogo.jpeg";

export default function HealthTipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the tip based on ID
  const tip = healthTipsData.find((t) => t.id === id) || healthTipsData[0];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito">
      <header className="px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => navigate("/health-tips")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <h1 className="text-base font-black text-[#1a237e] flex-1 text-center">
          Health Tip
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-5 overflow-y-auto pb-10">
        {/* Hero Card */}
        <div className="bg-white rounded-[24px] border border-[#eaedff] p-6 mb-5 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#E0F2F1] flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-[#005c55]" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-extrabold ${tip.tagColor} tracking-wider uppercase bg-gray-50 px-3 py-1 rounded-full`}
            >
              {tip.tag}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
              <Clock size={12} /> {tip.time} read
            </span>
          </div>

          <h1 className="text-[22px] font-black text-[#1a237e] leading-tight mb-2">
            {tip.title}
          </h1>
          <p className="text-[13px] text-gray-500 font-medium">{tip.desc}</p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm mb-6">
          <h2 className="text-[15px] font-bold text-[#1a237e] mb-3">
            About this tip
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
            {tip.content}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#e3f2fd] rounded-xl p-4 flex items-start gap-3">
          <Info size={18} className="text-[#2196F3] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#1a237e] leading-relaxed font-medium">
            These tips are for general awareness. Always consult your doctor
            before making changes to your diet, exercise, or medication routine.
          </p>
        </div>
      </main>
    </div>
  );
}
