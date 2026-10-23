import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Info, ArrowRight } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

import bgWoman from "../../assets/periodtracker/bg-woman.png";
import imgKnowPeriod from "../../assets/periodtracker/know-period.png";
import imgPainRelief from "../../assets/periodtracker/pain-relief.png";
import imgHygiene from "../../assets/periodtracker/hygiene.png";
import imgFood from "../../assets/periodtracker/food.png";
import imgWarning from "../../assets/periodtracker/warning.png";
import imgMyths from "../../assets/periodtracker/myths.png";
import imgDoctor from "../../assets/periodtracker/doctor.png";

/* ---------- Theme (client image se) ---------- */
const NAVY = "#1a1f6b";
const SUB = "#5b62a3";
const PINK = "#e91e63";
const CARD_BORDER = "#f6e4ec";

/* Calendar icon for Book Appointment button */
const CalendarDotsIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="4" y="6" width="24" height="22" rx="4" fill="#fff" />
    <path
      d="M10 3v6M22 3v6"
      stroke="#fff"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <g fill="#d81b60">
      <rect x="9" y="14" width="3.2" height="3.2" rx="0.9" />
      <rect x="14.4" y="14" width="3.2" height="3.2" rx="0.9" />
      <rect x="19.8" y="14" width="3.2" height="3.2" rx="0.9" />
      <rect x="9" y="19.5" width="3.2" height="3.2" rx="0.9" />
      <rect x="14.4" y="19.5" width="3.2" height="3.2" rx="0.9" />
    </g>
  </svg>
);

export default function PeriodHealthGuide() {
  const navigate = useNavigate();

  // ID add ki hai taaki URL ke through detail page par bhej sakein
  const guideItems = [
    {
      id: "know-period",
      img: imgKnowPeriod,
      title: "Know About Menstrual Period",
      sub: "What’s normal?",
    },
    {
      id: "pain-relief",
      img: imgPainRelief,
      title: "Period Pain Relief",
      sub: "Cramps & self-care tips",
    },
    {
      id: "hygiene",
      img: imgHygiene,
      title: "Period Hygiene",
      sub: "Safe hygiene tips",
    },
    {
      id: "food",
      img: imgFood,
      title: "Food & Lifestyle",
      sub: "Nutrition & activity tips",
    },
    {
      id: "warning",
      img: imgWarning,
      title: "Warning Signs",
      sub: "When to see a doctor",
    },
    {
      id: "myths",
      img: imgMyths,
      title: "Myths vs Facts",
      sub: "Common period myths",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fde8f1] via-[#fff5f9] to-[#fff9fc] flex flex-col font-nunito relative overflow-hidden">
      {/* Faded woman silhouette (top right) */}
      <img
        src={bgWoman}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute top-0 right-0 w-[260px] h-auto pointer-events-none select-none"
      />

      {/* FIXED HEADER: Left Back, Center Title, Right Logo */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100 relative z-10 sticky top-0">
        <button onClick={() => navigate("/period-tracker")} className="p-1 w-8">
          <ChevronLeft size={24} style={{ color: NAVY }} />
        </button>

        <h1
          className="text-[17px] font-black flex-1 text-center"
          style={{ color: NAVY }}
        >
          Health Guide
        </h1>

        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-5 overflow-y-auto relative z-10">
        <h1
          className="text-[28px] leading-tight font-black mb-2"
          style={{ color: NAVY }}
        >
          Period Health Guide
        </h1>
        <p className="text-[13px] mb-6 font-medium" style={{ color: SUB }}>
          Understand your periods and take better care of your menstrual health.
        </p>

        {/* GUIDE CARDS (original vertical layout) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {guideItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                navigate(`/period-tracker/health-guide/${item.id}`)
              }
              className="bg-white rounded-2xl border p-4 flex flex-col items-center text-center h-[150px] justify-center relative shadow-[0_2px_10px_rgba(233,30,99,0.07)] active:scale-95 transition"
              style={{ borderColor: CARD_BORDER }}
            >
              <img
                src={item.img}
                alt={item.title}
                draggable={false}
                className="w-16 h-16 object-contain mb-2 select-none"
              />
              <h3
                className="text-[12px] font-extrabold leading-tight mb-1"
                style={{ color: NAVY }}
              >
                {item.title}
              </h3>
              <p
                className="text-[10px] font-medium leading-tight"
                style={{ color: SUB }}
              >
                {item.sub}
              </p>
              <ChevronRight
                size={16}
                strokeWidth={2.8}
                className="absolute bottom-3 right-3"
                style={{ color: PINK }}
              />
            </button>
          ))}
        </div>

        {/* CONSULT A GYNECOLOGIST (original centered layout) */}
        <div
          className="bg-gradient-to-br from-[#fff0f6] to-[#fde8f1] rounded-2xl border p-5 flex flex-col items-center text-center mb-6 relative overflow-hidden"
          style={{ borderColor: "#f8d9e5" }}
        >
          <div className="flex items-center justify-center mb-4">
            <img
              src={imgDoctor}
              alt="Gynecologist"
              draggable={false}
              className="w-20 h-20 object-contain mr-4 select-none"
            />
            <div className="text-left">
              <h2
                className="text-[18px] font-black leading-tight"
                style={{ color: NAVY }}
              >
                Consult a Gynecologist
              </h2>
              <p
                className="text-[11px] font-medium mt-1 leading-snug"
                style={{ color: SUB }}
              >
                Expert advice for menstrual and women’s health concerns.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/appointment")}
            className="w-full bg-gradient-to-r from-[#e0185f] to-[#d81b60] text-white font-bold text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(216,27,96,0.3)]"
          >
            <CalendarDotsIcon size={18} /> Book Appointment{" "}
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>

          <p className="text-[10px] font-medium mt-2" style={{ color: SUB }}>
            Consultation services are currently available only in Indore, MP.
          </p>
        </div>

        {/* IMPORTANT NOTE */}
        <div
          className="bg-[#fff3f8] rounded-2xl border p-4 flex items-start gap-3"
          style={{ borderColor: "#f8d9e5" }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#fde0ec]">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: PINK }}
            >
              <Info size={14} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <div
            className="text-[11px] leading-relaxed font-medium"
            style={{ color: SUB }}
          >
            <p className="font-extrabold mb-1" style={{ color: PINK }}>
              Important
            </p>
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
