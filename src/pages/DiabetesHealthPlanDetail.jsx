import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, Info } from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

import { PLAN as DIABETES_PLAN } from "./DiabetesResult";
import { PLAN_ART } from "./BmiCheck"; // <-- reuse same SVG art

const NAVY = "#14284b";

/* ============ RISK LEVEL THEMES ============ */
const RISK_THEME = {
  low: {
    label: "LOW RISK",
    range: "0 - 29",
    cardBg: "linear-gradient(135deg,#e9f7eb,#dbf1de)",
    colorDark: "#2e9e3a",
    pill: "linear-gradient(180deg,#4fbf5a,#2e8f3a)",
  },
  moderate: {
    label: "MODERATE RISK",
    range: "30 - 59",
    cardBg: "linear-gradient(135deg,#fff4de,#ffe9c2)",
    colorDark: "#ec8a00",
    pill: "linear-gradient(180deg,#f9c23f,#dd9c00)",
  },
  high: {
    label: "HIGH RISK",
    range: "60 - 100",
    cardBg: "linear-gradient(135deg,#fdeaea,#fbdcdc)",
    colorDark: "#e11d1d",
    pill: "linear-gradient(180deg,#f2504a,#d12a24)",
  },
};

/* ============ PLAN TYPE CONFIG ============ */
const PLAN_TYPES = {
  diet: { title: "Diet Plan", colorDark: "#2e8f3a" },
  activity: { title: "Physical Activity", colorDark: "#2f8cf0" },
  advice: { title: "Other Advice", colorDark: "#ea8a10" },
};

export default function DiabetesHealthPlanDetail() {
  const { level, planType } = useParams();
  const navigate = useNavigate();

  const theme = RISK_THEME[level];
  const plan = PLAN_TYPES[planType];
  const data = DIABETES_PLAN[level]?.[planType];
  const Art = PLAN_ART[planType]; // <-- same SVG art as BMI plan

  if (!theme || !plan || !data || !Art) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">Plan not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-[13px] font-semibold text-blue-600 underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // BUTTON TEXT LOGIC: Diet me Dietitian, baaki me Diabetologist
  const btnText =
    planType === "diet" ? "Consult a Dietitian" : "Consult a Diabetologist";

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        background:
          "linear-gradient(180deg,#e7f1fc 0%,#f2f7fd 45%,#fafcff 100%)",
        fontFamily: "'Nunito','Noto Sans Devanagari',system-ui,sans-serif",
      }}
    >
      <div className="w-full max-w-md min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header
          className="sticky top-0 z-40"
          style={{
            background: "rgba(231,241,252,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95"
              style={{ color: NAVY }}
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="font-extrabold text-[17px]" style={{ color: NAVY }}>
              {plan.title}
            </h1>

            {/* TOP RIGHT LOGO */}
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 px-4 pt-3">
          {/* HERO CARD — now with SVG art like BMI */}
          <div
            className="rounded-[20px] p-4 mb-3.5 flex items-center gap-3.5"
            style={{ background: theme.cardBg }}
          >
            <div className="w-[72px] h-[72px] rounded-2xl bg-white/90 p-1.5 flex-none shadow-sm overflow-hidden flex items-end">
              <Art />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-[19px] font-black leading-tight"
                style={{ color: NAVY }}
              >
                {plan.title}
              </h2>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span
                  className="text-[9.5px] font-black text-white px-2.5 py-1 rounded-md tracking-wide whitespace-nowrap shadow-sm"
                  style={{ background: theme.pill }}
                >
                  {theme.label}
                </span>
                <span className="text-[10px] text-gray-600 font-semibold">
                  Score {theme.range}
                </span>
              </div>
            </div>
          </div>

          {/* ENGLISH SECTION */}
          <PlanList
            badge="EN"
            title="English"
            item={data.en}
            color={plan.colorDark}
          />

          {/* HINDI SECTION */}
          <PlanList
            badge="हि"
            title="हिंदी"
            item={data.hi}
            color={plan.colorDark}
          />

          {/* Disclaimer */}
          <div className="bg-[#e6f0fb] border border-[#d3e4f7] rounded-2xl p-3.5 mb-4 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#2f80ed] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={14} strokeWidth={2.6} className="text-white" />
            </div>
            <div className="text-[10px] text-[#3b4a66] leading-relaxed font-medium">
              <p>
                <span className="font-extrabold">Disclaimer:</span> These are
                general recommendations. Consult your doctor for personalised
                advice.
              </p>
              <p className="mt-1.5">
                चिकित्सकीय सलाह: ये सामान्य सुझाव हैं। व्यक्तिगत सलाह के लिए
                अपने डॉक्टर से परामर्श करें।
              </p>
            </div>
          </div>

          {/* Dynamic Button (Hidden for Low Risk) */}
          {level !== "low" && (
            <button
              onClick={() => navigate("/appointment")}
              className="w-full bg-white border-2 border-[#0d6b63] text-[#0d6b63] font-bold py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              {btnText} <ArrowRight size={16} />
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

/* ============ LIST CARD ============ */
function PlanList({ badge, title, item, color }) {
  return (
    <div className="bg-white rounded-[20px] border border-[#e3ecf7] shadow-[0_2px_10px_rgba(30,64,120,0.06)] p-4 mb-3.5">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {badge}
        </div>
        <h3 className="text-[13px] font-extrabold" style={{ color: NAVY }}>
          {title}
        </h3>
      </div>
      <div className="flex items-start gap-2.5">
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: color }}
        >
          <Check size={10} className="text-white" strokeWidth={3} />
        </span>
        <span className="text-[12.5px] text-[#3b4a66] leading-snug font-medium">
          {item}
        </span>
      </div>
    </div>
  );
}
