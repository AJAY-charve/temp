import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  ArrowRight,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function PeriodHealthGuide() {
  const navigate = useNavigate();

  // ID add ki hai taaki URL ke through detail page par bhej sakein
  const guideItems = [
    {
      id: "know-period",
      icon: "📅",
      title: "Know About Menstrual Period",
      sub: "What’s normal?",
    },
    {
      id: "pain-relief",
      icon: "🤕",
      title: "Period Pain Relief",
      sub: "Cramps & self-care tips",
    },
    {
      id: "hygiene",
      icon: "🩸",
      title: "Period Hygiene",
      sub: "Safe hygiene tips",
    },
    {
      id: "food",
      icon: "🥗",
      title: "Food & Lifestyle",
      sub: "Nutrition & activity tips",
    },
    {
      id: "warning",
      icon: "⚠️",
      title: "Warning Signs",
      sub: "When to see a doctor",
    },
    {
      id: "myths",
      icon: "🧠",
      title: "Myths vs Facts",
      sub: "Common period myths",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito relative overflow-hidden">
      {/* Background Blush */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffe4ed] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* FIXED HEADER: Left Back, Center Title, Right Logo */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100 relative z-10 sticky top-0">
        <button onClick={() => navigate("/period-tracker")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>

        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Health Guide
        </h1>

        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-5 overflow-y-auto relative z-10">
        <h1 className="text-[28px] leading-tight font-black text-[#1a237e] mb-2">
          Period Health Guide
        </h1>
        <p className="text-[13px] text-gray-600 mb-6 font-medium">
          Understand your periods and take better care of your menstrual health.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {guideItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                navigate(`/period-tracker/health-guide/${item.id}`)
              }
              className="bg-white rounded-2xl border border-pink-50 p-4 flex flex-col items-center text-center h-[140px] justify-center relative shadow-sm active:scale-95 transition"
            >
              <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-2xl mb-2">
                {item.icon}
              </div>
              <h3 className="text-[12px] font-extrabold text-[#1a237e] leading-tight mb-1">
                {item.title}
              </h3>
              <p className="text-[10px] text-gray-500 font-medium leading-tight">
                {item.sub}
              </p>
              <ChevronRight
                size={16}
                className="absolute bottom-3 right-3 text-[#e91e63]"
              />
            </button>
          ))}
        </div>

        <div className="bg-[#fdf2f6] rounded-2xl border border-pink-100 p-5 flex flex-col items-center text-center mb-6 relative overflow-hidden">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
              <span className="text-3xl">👩‍⚕️</span>
            </div>
            <div className="text-left">
              <h2 className="text-[18px] font-black text-[#1a237e] leading-tight">
                Consult a Gynecologist
              </h2>
              <p className="text-[11px] text-gray-600 font-medium mt-1 leading-snug">
                Expert advice for menstrual and women’s health concerns.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/appointment")}
            className="w-full bg-[#e91e63] text-white font-bold text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md"
          >
            <Calendar size={18} /> Book Appointment <ArrowRight size={18} />
          </button>

          <p className="text-[10px] text-gray-500 font-medium mt-2">
            Consultation services are currently available only in Indore, MP.
          </p>
        </div>

        <div className="bg-[#fdf2f6] rounded-2xl border border-pink-100 p-4 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#e91e63] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={14} className="text-white" />
          </div>
          <div className="text-[11px] text-gray-600 leading-relaxed font-medium">
            <p className="font-extrabold text-[#e91e63] mb-1">Important</p>
            <p>
              Before following any advice given in this section, please consult
              a qualified doctor. This information is for general awareness only
              and does not replace professional medical advice, diagnosis or
              treatment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
