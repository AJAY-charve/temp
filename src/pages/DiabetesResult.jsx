import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

import { PLAN_ART } from "./BmiCheck"; // <-- IMPORTED SVG ART FROM BMI PAGE

const NAVY = "#14284b";

/* ============ RISK LEVELS ============ */
const RISK = {
  low: {
    label: "Low Risk",
    hi: "कम जोखिम",
    range: "0 – 29",
    color: "#2e9e3a",
    cardBg: "linear-gradient(135deg,#e9f7eb,#dbf1de)",
    pillBg: "#c9ebd0",
    boxBg: "#e6f6e9",
    tint: "#e6f6e9",
    Icon: CheckCircle2,
    alert: {
      title: "You are at lower risk of type 2 diabetes.",
      body: "A low score does not completely rule out diabetes. Keep up a healthy lifestyle.",
      hi: "आपका Type 2 Diabetes का जोखिम कम है। लेकिन कम स्कोर का मतलब यह नहीं कि Diabetes नहीं हो सकती। स्वस्थ Lifestyle बनाए रखें।",
    },
  },
  moderate: {
    label: "Moderate Risk",
    hi: "मध्यम जोखिम",
    range: "30 – 59",
    color: "#ec8a00",
    cardBg: "linear-gradient(135deg,#fff4de,#ffe9c2)",
    pillBg: "#fddfa6",
    boxBg: "#fff2dc",
    tint: "#fff3df",
    Icon: AlertTriangle,
    alert: {
      title: "You have some risk factors for type 2 diabetes.",
      body: "Consider blood sugar screening and take steps to improve your lifestyle.",
      hi: "आपको Type 2 Diabetes का कुछ जोखिम है। Blood Sugar की जाँच करवाने पर विचार करें और अपनी Lifestyle में सुधार करें।",
    },
  },
  high: {
    label: "High Risk",
    hi: "उच्च जोखिम",
    range: "60 – 100",
    color: "#e11d1d",
    cardBg: "linear-gradient(135deg,#fdeaea,#fbdcdc)",
    pillBg: "#f9cfcf",
    boxBg: "#fde8e8",
    tint: "#fde8e8",
    Icon: AlertTriangle,
    alert: {
      title: "You are at increased risk of developing type 2 diabetes.",
      body: "Consider getting a blood test (Fasting Blood Sugar or HbA1c) and discuss with a doctor.",
      hi: "आपको टाइप 2 डायबिटीज होने का जोखिम अधिक है। ब्लड शुगर या HbA1c की जाँच करवाएं और डॉक्टर से सलाह लें।",
    },
  },
};

const getLevel = (score) =>
  score >= 60 ? "high" : score >= 30 ? "moderate" : "low";

/* ============ WHAT YOU CAN DO (Chart Data) ============ */
export const PLAN = {
  low: {
    diet: {
      en: "Eat a balanced diet with vegetables, fruits, whole grains and adequate protein.",
      hi: "संतुलित आहार लें। भोजन में हरी सब्जियां, फल, साबुत अनाज और पर्याप्त Protein शामिल करें।",
    },
    activity: {
      en: "Maintain at least 150 minutes of moderate physical activity per week.",
      hi: "हर सप्ताह कम से कम 150 मिनट Moderate Physical Activity करें।",
    },
    advice: {
      en: "Maintain a healthy weight, avoid tobacco and follow age-appropriate screening recommendations.",
      hi: "Healthy Weight बनाए रखें, Tobacco से बचें और उम्र के अनुसार आवश्यक Health Screening करवाएं।",
    },
  },
  moderate: {
    diet: {
      en: "Reduce sugary drinks, refined carbohydrates and excess calories. Increase fibre-rich foods.",
      hi: "मीठे पेय, Refined Carbohydrates और अधिक Calories से बचें। Fibre युक्त भोजन बढ़ाएं।",
    },
    activity: {
      en: "Aim for at least 150 minutes of moderate exercise weekly and reduce prolonged sitting.",
      hi: "सप्ताह में कम से कम 150 मिनट Exercise करें और लगातार लंबे समय तक बैठने से बचें।",
    },
    advice: {
      en: "Manage weight and waist circumference. Consider blood glucose screening, especially if other risk factors are present.",
      hi: "वजन और पेट की चर्बी नियंत्रित करें। अन्य Risk Factors होने पर Blood Sugar की जाँच करवाएं।",
    },
  },
  high: {
    diet: {
      en: "Follow a balanced, calorie-appropriate diet. Seek personalised dietary advice if overweight or obese.",
      hi: "संतुलित Diet लें और ज़रूरत के अनुसार Calories नियंत्रित करें। वजन अधिक होने पर Dietitian की सलाह लें।",
    },
    activity: {
      en: "Gradually build up to at least 150 minutes of moderate exercise weekly, according to your fitness and medical condition.",
      hi: "अपनी शारीरिक क्षमता और स्वास्थ्य के अनुसार धीरे-धीरे Exercise बढ़ाएं। सप्ताह में 150 मिनट Moderate Activity का लक्ष्य रखें।",
    },
    advice: {
      en: "Arrange blood glucose or HbA1c testing and consult a doctor. Address excess weight, inactivity and other metabolic risk factors.",
      hi: "Blood Sugar या HbA1c की जाँच करवाएं और Doctor से सलाह लें। वजन, Physical Activity और अन्य Risk Factors पर ध्यान दें।",
    },
  },
};

const ACTIVITY_LABEL = {
  none: {
    en: "No regular physical activity",
    hi: "कोई नियमित शारीरिक गतिविधि नहीं",
  },
  mild: { en: "Mild physical activity", hi: "हल्की शारीरिक गतिविधि" },
  moderate: {
    en: "Moderate or vigorous activity",
    hi: "मध्यम या अधिक शारीरिक गतिविधि",
  },
  vigorous: {
    en: "Moderate or vigorous activity",
    hi: "मध्यम या अधिक शारीरिक गतिविधि",
  },
};

const FAMILY_LABEL = {
  none: {
    en: "No parent has diabetes",
    hi: "माता-पिता में से किसी को Diabetes नहीं है",
  },
  one: {
    en: "One parent has diabetes",
    hi: "माता-पिता में से किसी एक को Diabetes है",
  },
  both: {
    en: "Both parents have diabetes",
    hi: "दोनों माता-पिता को Diabetes है",
  },
};

export default function DiabetesResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnswers, setShowAnswers] = useState(false);

  // Assessment page se aata hai; direct khola to demo 65
  const score = location.state?.score ?? 65;
  const answers = location.state?.answers ?? null;

  const level = getLevel(score);
  const R = RISK[level];
  const pos = Math.min(Math.max(score, 3), 97);

  return (
    <div
      className="min-h-screen bg-white flex justify-center"
      style={{
        fontFamily: "'Nunito','Noto Sans Devanagari',system-ui,sans-serif",
      }}
    >
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-white">
          <div className="h-14 px-3 flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="w-9 h-9 flex items-center justify-center active:scale-95"
              style={{ color: NAVY }}
            >
              <ArrowLeft size={22} strokeWidth={2.4} />
            </button>
            <h1 className="font-extrabold text-[17px]" style={{ color: NAVY }}>
              Your Diabetes Risk Result
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
        <main className="flex-1 px-4 pb-10 pt-1">
          {/* SCORE CARD */}
          <div
            className="rounded-[22px] px-4 pt-4 pb-4 mb-3.5"
            style={{ background: R.cardBg }}
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2
                  className="text-[20px] font-extrabold leading-[1.1]"
                  style={{ color: NAVY }}
                >
                  Your Diabetes
                  <br />
                  Risk Score
                </h2>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span
                    className="text-[60px] leading-none font-black"
                    style={{ color: R.color }}
                  >
                    {score}
                  </span>
                  <span className="text-[22px] text-gray-500 font-medium">
                    / 100
                  </span>
                </div>
              </div>

              <div
                className="rounded-[26px] px-4 py-3 text-center mt-1"
                style={{ backgroundColor: R.pillBg }}
              >
                <p
                  className="text-[21px] font-black leading-tight whitespace-nowrap"
                  style={{ color: R.color }}
                >
                  {R.label}
                </p>
                <p
                  className="text-[14px] font-bold leading-tight mt-0.5"
                  style={{ color: R.color }}
                >
                  {R.hi}
                </p>
              </div>
            </div>

            {/* BAR */}
            <div className="relative mt-3 pt-5">
              <div
                className="absolute top-0 z-10 flex flex-col items-center"
                style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              >
                <span
                  className="w-0 h-0 border-x-[7px] border-x-transparent border-t-[9px]"
                  style={{ borderTopColor: NAVY }}
                />
                <span
                  className="w-[22px] h-[22px] rounded-full bg-white border-[5px] -mt-0.5 shadow"
                  style={{ borderColor: R.color }}
                />
              </div>

              <div
                className="h-[20px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg,#17b84b 0%,#7fc241 29%,#ffb300 30%,#ff9800 59%,#e53935 60%,#d50000 100%)",
                }}
              />

              <div className="relative h-5 mt-1.5 text-[12px] text-gray-600 font-medium">
                <span className="absolute left-0">0</span>
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: "30%" }}
                >
                  30
                </span>
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: "60%" }}
                >
                  60
                </span>
                <span className="absolute right-0">100</span>
              </div>

              <div
                className="grid text-center"
                style={{ gridTemplateColumns: "30fr 30fr 40fr" }}
              >
                <div className="px-1">
                  <p
                    className="text-[12.5px] font-extrabold"
                    style={{ color: NAVY }}
                  >
                    Low Risk
                  </p>
                  <p className="text-[12px] font-bold text-[#1fa24a]">
                    कम जोखिम
                  </p>
                </div>
                <div className="px-1 border-l border-black/10">
                  <p
                    className="text-[12.5px] font-extrabold"
                    style={{ color: NAVY }}
                  >
                    Moderate Risk
                  </p>
                  <p className="text-[12px] font-bold text-[#f08c00]">
                    मध्यम जोखिम
                  </p>
                </div>
                <div className="px-1 border-l border-black/10">
                  <p
                    className="text-[12.5px] font-extrabold"
                    style={{ color: NAVY }}
                  >
                    High Risk
                  </p>
                  <p className="text-[12px] font-bold text-[#e11d1d]">
                    उच्च जोखिम
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ALERT BOX */}
          <div
            className="rounded-2xl p-4 mb-3.5 flex items-start gap-3.5"
            style={{ backgroundColor: R.boxBg }}
          >
            <R.Icon
              size={38}
              strokeWidth={2}
              className="flex-shrink-0 mt-0.5"
              style={{ color: R.color }}
            />
            <div>
              <p
                className="text-[14.5px] font-extrabold leading-snug"
                style={{ color: R.color }}
              >
                {R.alert.title}
              </p>
              <p className="text-[12.5px] text-gray-600 mt-1 leading-snug">
                {R.alert.body}
              </p>
              <p
                className="text-[13px] mt-1.5 leading-snug font-semibold"
                style={{ color: "#1f2937" }}
              >
                {R.alert.hi}
              </p>
            </div>
          </div>

          {/* YOUR ANSWERS */}
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="w-full rounded-[20px] px-4 py-4 flex items-center justify-between mb-3 active:scale-[0.99] transition"
            style={{ backgroundColor: "#eaf3fd" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-[62px] h-[62px] rounded-full bg-[#d6e7fb] flex items-center justify-center">
                <AnswersIcon />
              </div>
              <span
                className="text-[21px] font-extrabold"
                style={{ color: NAVY }}
              >
                Your Answers
              </span>
            </div>
            <ChevronRight
              size={28}
              strokeWidth={2.6}
              className={`text-[#1976f2] transition-transform ${showAnswers ? "rotate-90" : ""}`}
            />
          </button>

          {/* Expandable Answers */}
          {showAnswers && (
            <div className="mb-5 animate-[dmFade_0.3s_ease]">
              <AnswersSheet answers={answers} score={score} R={R} />
            </div>
          )}

          {/* WHAT YOU CAN DO */}
          <div className="mb-5">
            <h3
              className="text-[17px] font-extrabold mb-3 px-1"
              style={{ color: NAVY }}
            >
              What You Can Do
            </h3>
            <div className="flex flex-col gap-2.5">
              <PlanCard
                title="Diet Plan"
                hi="आहार योजना"
                Art={PLAN_ART.diet}
                color="#2e9e48"
                bg="#e4f4e8"
                onClick={() => navigate(`/diabetes/health-plan/${level}/diet`)}
              />
              <PlanCard
                title="Physical Activity"
                hi="शारीरिक गतिविधि"
                Art={PLAN_ART.activity}
                color="#2f8cf0"
                bg="#e0eefc"
                onClick={() =>
                  navigate(`/diabetes/health-plan/${level}/activity`)
                }
              />
              <PlanCard
                title="Other Advice"
                hi="अन्य सुझाव"
                Art={PLAN_ART.advice}
                color="#ea8a10"
                bg="#fdf1d3"
                onClick={() =>
                  navigate(`/diabetes/health-plan/${level}/advice`)
                }
              />
            </div>
          </div>

          {/* ABOUT THIS SCORE */}
          <div className="border-t border-gray-200 pt-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e3f0fd] flex items-center justify-center flex-shrink-0">
              <Info size={18} strokeWidth={2.4} className="text-[#1976f2]" />
            </div>
            <div>
              <h4
                className="text-[15px] font-extrabold"
                style={{ color: NAVY }}
              >
                About This Score
              </h4>
              <p className="text-[11.5px] text-gray-600 leading-snug mt-1">
                Your diabetes risk is calculated using the Indian Diabetes Risk
                Score (MDRF-IDRS), based on age, waist circumference, physical
                activity and family history.
              </p>
              <p className="text-[11.5px] text-gray-600 leading-snug mt-1">
                The score ranges from 0–100 and indicates low, moderate or high
                risk. It is a screening tool, not a diagnostic test, and cannot
                confirm or rule out diabetes. Blood tests may still be needed.
              </p>
            </div>
          </div>
        </main>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;700&display=swap');
          @keyframes dmFade {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ============ YOUR ANSWERS SHEET ============ */
function AnswersSheet({ answers, score, R }) {
  if (!answers) {
    return (
      <p className="text-[13px] text-gray-600 py-6 text-center bg-gray-50 rounded-xl">
        Answers are not available. Please retake the assessment.
      </p>
    );
  }
  const { age, waist, waistUnit, activity, family, pts } = answers;

  const rows = [
    { q: "Age", hi: "उम्र", a: `${age} years`, p: pts.age },
    {
      q: "Waist circumference",
      hi: "कमर का माप",
      a: `${waist} ${waistUnit}`,
      p: pts.waist,
    },
    {
      q: "Physical activity",
      hi: "शारीरिक गतिविधि",
      a: ACTIVITY_LABEL[activity]?.en,
      sub: ACTIVITY_LABEL[activity]?.hi,
      p: pts.activity,
    },
    {
      q: "Family history",
      hi: "पारिवारिक इतिहास",
      a: FAMILY_LABEL[family]?.en,
      sub: FAMILY_LABEL[family]?.hi,
      p: pts.family,
    },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <div
          key={r.q}
          className="flex items-center justify-between gap-3 rounded-2xl border border-[#e3ecf7] bg-[#f7faff] px-3.5 py-3"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-500">
              {r.q} · {r.hi}
            </p>
            <p
              className="text-[14px] font-extrabold leading-snug mt-0.5"
              style={{ color: NAVY }}
            >
              {r.a}
            </p>
            {r.sub && (
              <p className="text-[12px] text-gray-600 leading-snug">{r.sub}</p>
            )}
          </div>
          <span
            className="flex-none text-[13px] font-black px-2.5 py-1 rounded-full text-white"
            style={{
              backgroundColor:
                r.p === 0 ? "#2e9e3a" : r.p <= 10 ? "#ec8a00" : "#e11d1d",
            }}
          >
            +{r.p}
          </span>
        </div>
      ))}
      <div
        className="flex items-center justify-between rounded-2xl px-4 py-3 mt-1"
        style={{ backgroundColor: R.boxBg }}
      >
        <span className="text-[14px] font-extrabold" style={{ color: NAVY }}>
          Total score · कुल स्कोर
        </span>
        <span className="text-[20px] font-black" style={{ color: R.color }}>
          {score}
          <span className="text-[13px] text-gray-500 font-semibold">
            {" "}
            / 100
          </span>
        </span>
      </div>
    </div>
  );
}

/* ============ PLAN CARD (UPDATED TO USE SVG ART) ============ */
function PlanCard({ title, hi, Art, color, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl active:scale-[0.99] transition border border-white/50 shadow-sm"
      style={{ backgroundColor: bg }}
    >
      <div className="w-[46px] h-[46px] rounded-xl bg-white flex items-center justify-center flex-none overflow-hidden p-1 shadow-sm">
        <Art />
      </div>
      <div className="flex-1 text-left">
        <p
          className="text-[15px] font-extrabold leading-tight"
          style={{ color: NAVY }}
        >
          {title}
        </p>
        <p className="text-[13px] font-semibold text-gray-600 leading-tight mt-0.5">
          {hi}
        </p>
      </div>
      <ChevronRight size={20} strokeWidth={2.8} style={{ color }} />
    </button>
  );
}

/* ============ SVG ICONS ============ */
function AnswersIcon() {
  return (
    <svg width="38" height="42" viewBox="0 0 38 42" fill="none">
      <rect
        x="3"
        y="6"
        width="32"
        height="34"
        rx="5"
        fill="#fff"
        stroke="#1976f2"
        strokeWidth="3"
      />
      <rect x="12" y="1.5" width="14" height="8" rx="3" fill="#1976f2" />
      <circle cx="11" cy="17" r="3.2" fill="#1976f2" />
      <circle cx="11" cy="26" r="3.2" fill="#1976f2" />
      <path
        d="M9.6 17 L10.7 18.2 L12.6 15.9"
        stroke="#fff"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 26 L10.7 27.2 L12.6 24.9"
        stroke="#fff"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="18" y="15.5" width="12" height="2.6" rx="1.3" fill="#bcd6f6" />
      <rect x="18" y="24.5" width="12" height="2.6" rx="1.3" fill="#bcd6f6" />
      <rect x="20" y="31" width="3" height="5" rx="1" fill="#1976f2" />
      <rect x="25" y="28" width="3" height="8" rx="1" fill="#1976f2" />
      <rect x="30" y="25.5" width="3" height="10.5" rx="1" fill="#1976f2" />
    </svg>
  );
}
