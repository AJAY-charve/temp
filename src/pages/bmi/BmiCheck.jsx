import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Weight,
  Info,
  Calendar,
  Activity,
  Gauge,
  ChevronRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";

// LOGO IMPORT (Path Updated)
import logo from "../../assets/daibmetalogo.jpeg";

// Banner (input view)
import bmiImg from "../../assets/cards/bmi.jpeg";

// Top result card images
import imgUnderweight from "../../assets/bmi/underweight.png";
import imgNormal from "../../assets/bmi/normal.png";
import imgOverweight from "../../assets/bmi/overweight.png";

const NAVY = "#14284b";

/* ============ CATEGORY COLORS ============ */
export const BMI_THEME = {
  underweight: {
    label: "UNDERWEIGHT",
    rangeLong: "BMI less than 18.5",
    solid: "#1e88e5",
    pill: "linear-gradient(180deg,#34a0ff,#1670d8)",
    cardBg: "linear-gradient(135deg,#e6f3fe,#d3e8fb)",
  },
  normal: {
    label: "NORMAL WEIGHT",
    rangeLong: "BMI 18.5 to 22.9",
    solid: "#2e9e3a",
    pill: "linear-gradient(180deg,#4fbf5a,#2e8f3a)",
    cardBg: "linear-gradient(135deg,#e6f6e8,#d3eed7)",
  },
  overweight: {
    label: "OVERWEIGHT",
    rangeLong: "BMI 23.0 to 24.9",
    solid: "#dd9c00",
    pill: "linear-gradient(180deg,#f9c23f,#dd9c00)",
    cardBg: "linear-gradient(135deg,#fff4d6,#ffe8b8)",
  },
  obesity1: {
    label: "OBESITY CLASS I",
    rangeLong: "BMI 25.0 to 29.9",
    solid: "#ea7410",
    pill: "linear-gradient(180deg,#fb9d3f,#ea7410)",
    cardBg: "linear-gradient(135deg,#ffeadb,#ffdcc2)",
  },
  obesity2: {
    label: "OBESITY CLASS II",
    rangeLong: "BMI 30.0 to 34.9",
    solid: "#d12a24",
    pill: "linear-gradient(180deg,#f2504a,#d12a24)",
    cardBg: "linear-gradient(135deg,#fdecde,#fbdcc3)",
  },
  obesity3: {
    label: "OBESITY CLASS III",
    rangeLong: "BMI 35.0 or higher",
    solid: "#9a1a1a",
    pill: "linear-gradient(180deg,#d32f2f,#9a1a1a)",
    cardBg: "linear-gradient(135deg,#fde6e0,#fbd2c9)",
  },
};

/* ============ HINDI MESSAGES ============ */
const MSG_LOSE = {
  title: "धीरे-धीरे वजन कम करें।",
  body: "स्वस्थ आहार, नियमित व्यायाम और जीवनशैली में बदलाव से आप सुरक्षित रूप से वजन कम कर सकते हैं और भविष्य में होने वाली बीमारियों के जोखिम को कम कर सकते हैं।",
};

/* ============ BMI CATEGORIES ============ */
const BMI_CATEGORIES = {
  underweight: {
    img: imgUnderweight,
    msg: {
      title: "पौष्टिक आहार से वजन बढ़ाएं।",
      body: "संतुलित और पौष्टिक आहार, प्रोटीन युक्त भोजन और हल्के व्यायाम से आप सुरक्षित रूप से अपना वजन बढ़ा सकते हैं और कमजोरी से बच सकते हैं।",
    },
  },
  normal: {
    img: imgNormal,
    msg: {
      title: "अपना वजन संतुलित बनाए रखें।",
      body: "स्वस्थ आहार, नियमित व्यायाम और अच्छी जीवनशैली से आप अपना वजन सामान्य बनाए रख सकते हैं और भविष्य में होने वाली बीमारियों के जोखिम को कम कर सकते हैं।",
    },
  },
  overweight: {
    img: imgOverweight,
    msg: MSG_LOSE,
  },
  obesity1: {
    img: imgOverweight,
    msg: MSG_LOSE,
  },
  obesity2: {
    img: imgOverweight,
    msg: MSG_LOSE,
  },
  obesity3: {
    img: imgOverweight,
    msg: MSG_LOSE,
  },
};

/* ============ "WHERE DO YOU STAND" BAR ============ */
const SEGMENTS = [
  {
    key: "underweight",
    range: "< 18.5",
    name: ["Underweight"],
    color: "#1e90ff",
    text: "#1e88e5",
    lo: 12,
    hi: 18.5,
  },
  {
    key: "normal",
    range: "18.5 – 22.9",
    name: ["Normal", "weight"],
    color: "#3fae49",
    text: "#2e9e3a",
    lo: 18.5,
    hi: 22.9,
  },
  {
    key: "overweight",
    range: "23.0 – 24.9",
    name: ["Overweight"],
    color: "#f6b92b",
    text: "#d99a00",
    lo: 22.9,
    hi: 24.9,
  },
  {
    key: "obesity1",
    range: "25.0 – 29.9",
    name: ["Obesity", "Class I"],
    color: "#f58220",
    text: "#ee7410",
    lo: 24.9,
    hi: 29.9,
  },
  {
    key: "obesity2",
    range: "30.0 – 34.9",
    name: ["Obesity", "Class II"],
    color: "#e53935",
    text: "#e53935",
    lo: 29.9,
    hi: 34.9,
  },
  {
    key: "obesity3",
    range: "≥ 35.0",
    name: ["Obesity", "Class III"],
    color: "#b71c1c",
    text: "#b71c1c",
    lo: 34.9,
    hi: 45,
  },
];

const getMarkerPos = (bmi, catKey) => {
  const idx = SEGMENTS.findIndex((s) => s.key === catKey);
  const s = SEGMENTS[idx];
  const frac = Math.min(Math.max((bmi - s.lo) / (s.hi - s.lo), 0), 1);
  return Math.min(Math.max(((idx + frac) / 6) * 100, 4), 96);
};

/* ============ HELPERS ============ */
const getCategory = (bmi) => {
  if (bmi < 18.5) return "underweight";
  if (bmi <= 22.9) return "normal";
  if (bmi <= 24.9) return "overweight";
  if (bmi <= 29.9) return "obesity1";
  if (bmi <= 34.9) return "obesity2";
  return "obesity3";
};

const calcIdealWeightRange = (heightCm) => {
  const h = heightCm / 100;
  const min = (18.5 * h * h).toFixed(1);
  const max = (22.9 * h * h).toFixed(1);
  return { min, max };
};

const formatFtIn = (cm) => {
  const totalIn = cm / 2.54;
  let ft = Math.floor(totalIn / 12);
  let inch = Math.round(totalIn - ft * 12);
  if (inch === 12) {
    ft += 1;
    inch = 0;
  }
  return `${ft} ft ${inch} in`;
};

/* Result ko history state se rebuild karte hain */
const buildResult = ({ bmiNum, weight, heightCm }) => {
  const catKey = getCategory(bmiNum);
  const ideal = calcIdealWeightRange(heightCm);
  return {
    bmi: bmiNum.toFixed(1),
    bmiNum,
    catKey,
    ...BMI_THEME[catKey],
    ...BMI_CATEGORIES[catKey],
    idealMin: ideal.min,
    idealMax: ideal.max,
    heightCm,
    weight,
  };
};

export default function BmiCheck() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ weight: "", age: "", sex: "male" });
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");

  const saved = location.state?.bmi;
  const result = saved ? buildResult(saved) : null;

  const update = (k, v) => setForm({ ...form, [k]: v });

  const getHeightInCm = () => {
    if (heightUnit === "cm") return parseFloat(heightCm);
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    if (!ft && !inch) return 0;
    return (ft * 12 + inch) * 2.54;
  };

  const finalHeightCm = getHeightInCm();
  const isHeightValid = finalHeightCm > 0;
  const canCalculate =
    isHeightValid && form.weight > 0 && form.age > 0 && form.sex;

  const calculate = () => {
    const h = finalHeightCm / 100;
    const w = parseFloat(form.weight);
    const bmi = w / (h * h);
    navigate(location.pathname + location.search, {
      state: {
        bmi: { bmiNum: bmi, weight: form.weight, heightCm: finalHeightCm },
      },
    });
  };

  const backFromResult = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else
      navigate(location.pathname + location.search, {
        replace: true,
        state: null,
      });
  };

  const activeSeg = result
    ? SEGMENTS.find((s) => s.key === result.catKey)
    : null;

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        background: result
          ? "linear-gradient(180deg,#e7f1fc 0%,#f2f7fd 45%,#fafcff 100%)"
          : "#faf8ff",
        fontFamily: result
          ? "'Nunito','Noto Sans Devanagari',system-ui,sans-serif"
          : undefined,
      }}
    >
      <div className="w-full max-w-md min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header
          className={
            result
              ? "sticky top-0 z-40"
              : "sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100"
          }
          style={
            result
              ? {
                  background: "rgba(231,241,252,0.9)",
                  backdropFilter: "blur(12px)",
                }
              : undefined
          }
        >
          {result ? (
            <div className="h-14 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={backFromResult}
                  className="w-8 h-8 flex items-center justify-center rounded-full active:scale-95"
                  style={{ color: NAVY }}
                >
                  <ArrowLeft size={22} strokeWidth={2.5} />
                </button>
                <h1
                  className="font-extrabold text-[17px]"
                  style={{ color: NAVY }}
                >
                  Your BMI Result
                </h1>
              </div>
              {/* TOP RIGHT LOGO IN RESULT */}
              <img
                src={logo}
                alt="DiabMeta"
                className="h-8 w-auto object-contain"
              />
            </div>
          ) : (
            <div className="h-14 px-4 flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="font-bold text-gray-900 text-[15px]">
                BMI Calculator
              </h1>
              {/* TOP RIGHT LOGO IN INPUT */}
              <img
                src={logo}
                alt="DiabMeta"
                className="h-9 w-auto object-contain"
              />
            </div>
          )}
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 px-4 pt-4">
          {!result ? (
            /* ========== INPUT VIEW ========== */
            <>
              <div className="w-full h-[140px] rounded-2xl overflow-hidden mb-4 border border-[#eaedff] shadow-sm">
                <img
                  src={bmiImg}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-[0_2px_12px_rgba(15,23,42,0.04)] mb-4">
                <label className="text-[12px] font-semibold text-gray-700">
                  Age (years)
                </label>
                <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                  <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="Enter Age"
                    className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                  />
                </div>

                <label className="text-[12px] font-semibold text-gray-700">
                  Sex
                </label>
                <div className="mt-1.5 mb-3 grid grid-cols-2 gap-2">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => update("sex", g)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold capitalize transition border ${
                        form.sex === g
                          ? "bg-[#9cf2e8]/40 text-[#005c55] border-[#005c55]"
                          : "bg-[#f4f5fb] text-gray-600 border-[#eaedff]"
                      }`}
                    >
                      <span className="text-[16px]">
                        {g === "male" ? "♂" : "♀"}
                      </span>
                      {g}
                    </button>
                  ))}
                </div>

                <label className="text-[12px] font-semibold text-gray-700">
                  Weight (kg)
                </label>
                <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                  <Weight size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    placeholder="Enter Weight"
                    className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                  />
                  <span className="text-[12px] font-medium text-gray-400">
                    kg
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12px] font-semibold text-gray-700">
                    Height
                  </label>
                  <div className="bg-[#eef1f8] rounded-lg p-0.5 flex gap-0.5">
                    <button
                      type="button"
                      onClick={() => setHeightUnit("cm")}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition ${
                        heightUnit === "cm"
                          ? "bg-white text-[#005c55] shadow-sm"
                          : "text-gray-500"
                      }`}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeightUnit("ftin")}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition ${
                        heightUnit === "ftin"
                          ? "bg-white text-[#005c55] shadow-sm"
                          : "text-gray-500"
                      }`}
                    >
                      ft + in
                    </button>
                  </div>
                </div>

                {heightUnit === "cm" ? (
                  <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                    <Activity
                      size={16}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="Enter Height"
                      className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                    />
                    <span className="text-[12px] font-medium text-gray-400">
                      cm
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb]">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px]"
                      />
                      <span className="text-[11px] font-medium text-gray-400">
                        ft
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb]">
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="2"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px]"
                      />
                      <span className="text-[11px] font-medium text-gray-400">
                        in
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={calculate}
                disabled={!canCalculate}
                className="w-full bg-[#0d6b63] text-white font-bold py-3.5 rounded-xl disabled:opacity-40 active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2"
              >
                Calculate BMI <ArrowRight size={16} />
              </button>
            </>
          ) : (
            /* ========== RESULT VIEW ========== */
            <div
              style={{ animation: "fadeIn 0.35s ease" }}
              className="flex flex-col gap-3.5"
            >
              {/* 1. TOP CARD */}
              <div
                className="relative overflow-hidden rounded-[22px] min-h-[178px]"
                style={{ background: result.cardBg }}
              >
                <div className="relative z-10 w-[58%] pl-5 pt-4 pb-4">
                  <p
                    className="text-[17px] font-extrabold leading-none"
                    style={{ color: NAVY }}
                  >
                    Your BMI is
                  </p>
                  <p
                    className="text-[64px] font-black leading-[1] mt-1.5 mb-2.5"
                    style={{ color: NAVY }}
                  >
                    {result.bmi}
                  </p>
                  <span
                    className="inline-block text-[13.5px] font-black text-white tracking-wide px-4 py-1.5 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.18)] whitespace-nowrap"
                    style={{ background: result.pill }}
                  >
                    {result.label}
                  </span>
                  <p className="text-[10.5px] text-gray-600 font-medium mt-2.5 leading-snug">
                    ({result.rangeLong} for Asian population)
                  </p>
                </div>

                <Sparkles
                  size={24}
                  strokeWidth={2.4}
                  className="absolute right-[8%] top-[18%] z-10 text-[#f58a2b]"
                />

                <img
                  src={result.img}
                  alt="BMI Result"
                  className="absolute right-0 bottom-0 h-full w-[46%] object-contain object-bottom"
                />
              </div>

              {/* 2. WHERE DO YOU STAND */}
              <div className="bg-white rounded-[20px] border border-[#e3ecf7] shadow-[0_2px_10px_rgba(30,64,120,0.06)] px-3.5 pt-3.5 pb-3">
                <h3 className="text-[17px] font-extrabold text-[#2e9e3a] mb-2">
                  Where do you stand ?
                </h3>

                <div className="relative pt-8">
                  <div
                    className="absolute top-0 z-10 flex flex-col items-center"
                    style={{
                      left: `${getMarkerPos(result.bmiNum, result.catKey)}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span
                      className="text-[13px] font-black leading-none"
                      style={{ color: activeSeg.color }}
                    >
                      {result.bmi}
                    </span>
                    <span
                      className="mt-1 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px]"
                      style={{ borderTopColor: activeSeg.color }}
                    />
                  </div>

                  <div className="flex h-[22px] rounded-full overflow-hidden">
                    {SEGMENTS.map((s) => (
                      <div
                        key={s.key}
                        className="flex-1 flex items-center justify-center text-[8.5px] font-extrabold text-white whitespace-nowrap tracking-tight"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.range}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-6 mt-1.5 text-center">
                  {SEGMENTS.map((s) => (
                    <p
                      key={s.key}
                      className={`text-[9px] leading-[1.2] ${s.key === result.catKey ? "font-black" : "font-bold"}`}
                      style={{ color: s.text }}
                    >
                      {s.name.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>

              {/* 3. WEIGHT + IDEAL RANGE */}
              <div className="bg-white rounded-[20px] border border-[#e3ecf7] shadow-[0_2px_10px_rgba(30,64,120,0.06)] px-3 py-3 flex items-center">
                <div className="flex items-center gap-2.5 flex-none">
                  <div
                    className="w-[46px] h-[46px] rounded-2xl flex items-center justify-center flex-none"
                    style={{
                      background: "linear-gradient(180deg,#ff9a3c,#f2740f)",
                    }}
                  >
                    <Weight size={25} strokeWidth={2} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10.5px] font-semibold text-gray-500 leading-none">
                      Your weight
                    </p>
                    <p
                      className="text-[26px] font-black leading-none mt-1.5"
                      style={{ color: NAVY }}
                    >
                      {result.weight}
                      <span className="text-[13px] font-extrabold ml-1">
                        kg
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-px self-stretch bg-[#e3eaf3] mx-3" />

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-none"
                    style={{
                      background: "linear-gradient(180deg,#3aa04a,#1f7a31)",
                    }}
                  >
                    <Gauge size={24} strokeWidth={2.2} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[10.5px] font-extrabold leading-none whitespace-nowrap"
                      style={{ color: NAVY }}
                    >
                      Your ideal weight range
                    </p>
                    <p className="text-[16px] font-black text-[#2e9e3a] leading-none mt-1.5 whitespace-nowrap">
                      {result.idealMin} – {result.idealMax} kg
                    </p>
                    <p className="text-[9.5px] text-gray-500 font-medium mt-1 whitespace-nowrap">
                      for your height ({formatFtIn(result.heightCm)})
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. PERSONALISED GUIDANCE */}
              <h3
                className="text-[17px] font-extrabold mt-1.5 px-0.5"
                style={{ color: NAVY }}
              >
                Get personalised guidance
              </h3>

              <div className="grid grid-cols-4 gap-2">
                <GuidanceCard
                  Art={DietArt}
                  title={["Diet Plan"]}
                  bg="#e4f4e8"
                  color="#2e9e48"
                  onClick={() => navigate(`/health-plan/${result.catKey}/diet`)}
                />
                <GuidanceCard
                  Art={ActivityArt}
                  title={["Physical", "Activity"]}
                  bg="#e0eefc"
                  color="#2f8cf0"
                  onClick={() =>
                    navigate(`/health-plan/${result.catKey}/activity`)
                  }
                />
                <GuidanceCard
                  Art={AdviceArt}
                  title={["Other", "Advice"]}
                  bg="#fdf1d3"
                  color="#f5a623"
                  onClick={() =>
                    navigate(`/health-plan/${result.catKey}/advice`)
                  }
                />
                <GuidanceCard
                  Art={DoctorArt}
                  title={["Consult", "a Doctor"]}
                  bg="#fde3e3"
                  color="#ef5350"
                  onClick={() => navigate("/appointment")}
                />
              </div>

              {/* 5. HINDI MESSAGE */}
              <div className="bg-[#fdefd2] rounded-[18px] p-3.5 flex items-start gap-3 border border-[#f6d99b]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#f5a524] flex items-center justify-center flex-none">
                  <MessageCircle
                    size={20}
                    strokeWidth={2.4}
                    className="text-white"
                  />
                </div>
                <div>
                  <h4
                    className="text-[14.5px] font-extrabold leading-tight"
                    style={{ color: NAVY }}
                  >
                    {result.msg.title}
                  </h4>
                  <p className="text-[10.5px] text-[#3b4a66] leading-[1.5] mt-1 font-medium">
                    {result.msg.body}
                  </p>
                </div>
              </div>

              {/* 6. DISCLAIMER */}
              <div className="bg-[#e6f0fb] rounded-[16px] p-3 flex items-start gap-2.5 border border-[#d3e4f7]">
                <div className="w-6 h-6 rounded-full bg-[#2f80ed] flex items-center justify-center flex-none mt-0.5">
                  <Info size={14} strokeWidth={2.6} className="text-white" />
                </div>
                <div className="text-[10px] text-[#3b4a66] leading-[1.45] font-medium">
                  <p>
                    Ideal weight range is calculated for Asian Indian adults
                    with a BMI of 18.5–22.9.
                  </p>
                  <p>
                    BMI is a screening tool and does not directly measure body
                    fat or overall health. Other health parameters should also
                    be considered.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Noto+Sans+Devanagari:wght@500;700&display=swap');
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ============ GUIDANCE CARD ============ */
function GuidanceCard({ Art, title, bg, color, onClick }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <button
      onClick={onClick}
      className="relative aspect-[10/13] rounded-2xl overflow-hidden text-left active:scale-95 transition border border-white/70 shadow-[0_2px_8px_rgba(30,64,120,0.08)]"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-x-1.5 top-2 h-[52%] overflow-hidden flex items-end justify-center">
        <Art />
      </div>
      <p
        className="absolute left-2 bottom-2.5 text-[10px] font-extrabold leading-[1.15] whitespace-nowrap"
        style={{ color: NAVY }}
      >
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </p>
      <span
        className="absolute bottom-2 right-1.5 w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-sm"
        style={{ backgroundColor: color }}
      >
        <ChevronRight size={14} strokeWidth={3.2} className="text-white" />
      </span>
    </button>
  );
}

/* ============ SVG ILLUSTRATIONS ============ */
const artProps = {
  viewBox: "0 0 100 80",
  className: "w-full h-full",
  preserveAspectRatio: "xMidYMax meet",
  xmlns: "http://www.w3.org/2000/svg",
};

export function DietArt() {
  return (
    <svg {...artProps}>
      <ellipse cx="50" cy="56" rx="45" ry="22" fill="#cfcfcf" />
      <ellipse
        cx="50"
        cy="52"
        rx="45"
        ry="22"
        fill="#fff"
        stroke="#d6d6d6"
        strokeWidth="1"
      />
      <ellipse cx="50" cy="52" rx="35" ry="16" fill="#f3f3f3" />
      <ellipse cx="26" cy="38" rx="13" ry="8" fill="#4caf50" />
      <ellipse cx="44" cy="31" rx="13" ry="7.5" fill="#2e8b3a" />
      <ellipse cx="66" cy="32" rx="14" ry="8" fill="#66bb6a" />
      <ellipse cx="80" cy="42" rx="10" ry="7" fill="#43a047" />
      <ellipse cx="34" cy="34" rx="8" ry="5" fill="#7cc576" />
      <circle cx="19" cy="46" r="5" fill="#e53935" />
      <circle cx="73" cy="27" r="4.5" fill="#ef5350" />
      <circle cx="86" cy="48" r="4" fill="#e53935" />
      <rect
        x="50"
        y="24"
        width="9"
        height="5"
        rx="2"
        fill="#fdd835"
        transform="rotate(-15 54 26)"
      />
      <rect
        x="28"
        y="26"
        width="8"
        height="5"
        rx="2"
        fill="#fbc02d"
        transform="rotate(20 32 28)"
      />
      <circle cx="58" cy="30" r="2.5" fill="#c62828" />
      <g fill="#c5e1a5" stroke="#7cb342" strokeWidth="1.2">
        <circle cx="17" cy="57" r="5.5" />
        <circle cx="27" cy="64" r="5.5" />
        <circle cx="38" cy="67" r="5" />
      </g>
      <g fill="#e6f3cf">
        <circle cx="17" cy="57" r="2.8" />
        <circle cx="27" cy="64" r="2.8" />
        <circle cx="38" cy="67" r="2.6" />
      </g>
      <g transform="rotate(-18 56 52)">
        <ellipse cx="56" cy="52" rx="25" ry="13" fill="#e2a95b" />
        <ellipse cx="54" cy="49" rx="20" ry="8" fill="#f2c987" />
        <g stroke="#b9772c" strokeWidth="1.6" strokeLinecap="round">
          <path d="M42 46 L48 56" />
          <path d="M50 44 L56 56" />
          <path d="M58 44 L64 56" />
          <path d="M66 46 L71 55" />
        </g>
      </g>
      <ellipse cx="78" cy="60" rx="7" ry="4" fill="#66bb6a" />
      <ellipse cx="68" cy="66" rx="5" ry="3" fill="#43a047" />
    </svg>
  );
}

export function ActivityArt() {
  return (
    <svg {...artProps}>
      <path d="M26 22 Q6 28 12 54 Q20 44 30 34 Z" fill="#6b3a22" />
      <path d="M14 80 Q14 50 40 46 Q64 50 66 80 Z" fill="#26a6dc" />
      <rect x="35" y="34" width="10" height="12" rx="4" fill="#f0b088" />
      <path
        d="M30 47 Q40 58 50 47 Q45 44 40 44 Q35 44 30 47 Z"
        fill="#f0b088"
      />
      <ellipse cx="40" cy="22" rx="12.5" ry="14.5" fill="#f4b998" />
      <path
        d="M26 24 Q26 4 42 6 Q56 8 54 24 Q50 14 40 15 Q31 16 29 28 Z"
        fill="#5a2e1a"
      />
      <path
        d="M45 26 Q48 28 46 30"
        stroke="#d98f6b"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M38 31 Q42 33 46 31"
        stroke="#c4564b"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 54 L74 62"
        stroke="#f0b088"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M74 62 L82 40"
        stroke="#f0b088"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g transform="rotate(25 86 30)">
        <rect x="84.5" y="20" width="3" height="20" rx="1.5" fill="#1d6fb8" />
        <rect x="80" y="16" width="12" height="7" rx="3" fill="#2f94e0" />
        <rect x="80" y="37" width="12" height="7" rx="3" fill="#2f94e0" />
      </g>
      <circle cx="83" cy="38" r="4.5" fill="#f0b088" />
    </svg>
  );
}

export function AdviceArt() {
  return (
    <svg {...artProps}>
      <rect x="27" y="10" width="46" height="66" rx="5" fill="#e68a2e" />
      <rect x="32" y="17" width="36" height="55" rx="2.5" fill="#fff8ec" />
      <rect x="38" y="6" width="24" height="12" rx="3.5" fill="#2c5f9e" />
      <circle cx="50" cy="10" r="2.6" fill="#fff" />
      {[
        { y: 30, c: "#2e9e48" },
        { y: 46, c: "#f5a623" },
        { y: 62, c: "#2e9e48" },
      ].map((r) => (
        <g key={r.y}>
          <circle cx="40" cy={r.y} r="4.6" fill={r.c} />
          <path
            d={`M37.6 ${r.y} L39.4 ${r.y + 1.8} L42.6 ${r.y - 2}`}
            stroke="#fff"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="48"
            y={r.y - 3.5}
            width="15"
            height="2.8"
            rx="1.4"
            fill="#b8b8b8"
          />
          <rect
            x="48"
            y={r.y + 1}
            width="11"
            height="2.8"
            rx="1.4"
            fill="#cfcfcf"
          />
        </g>
      ))}
    </svg>
  );
}

export function DoctorArt() {
  return (
    <svg {...artProps}>
      <path
        d="M12 80 Q14 50 40 46 L50 62 L60 46 Q86 50 88 80 Z"
        fill="#fff"
        stroke="#dce3ee"
        strokeWidth="1"
      />
      <path d="M40 46 L50 64 L60 46 L56 44 L50 50 L44 44 Z" fill="#6d9bd6" />
      <path d="M48.5 52 L51.5 52 L53 66 L50 71 L47 66 Z" fill="#2f5fa8" />
      <rect x="44" y="36" width="12" height="10" rx="4" fill="#e3a07a" />
      <ellipse cx="50" cy="24" rx="13" ry="15" fill="#e8a982" />
      <path
        d="M36 24 Q34 4 50 5 Q66 4 64 24 Q61 13 50 13 Q39 13 36 24 Z"
        fill="#1f1a17"
      />
      <g fill="none" stroke="#222" strokeWidth="1.5">
        <rect x="38.5" y="22" width="9" height="7" rx="2.5" />
        <rect x="52.5" y="22" width="9" height="7" rx="2.5" />
        <path d="M47.5 25 L52.5 25" />
      </g>
      <path
        d="M45 34 Q50 37 55 34"
        stroke="#b5544a"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 47 Q31 66 43 72"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 47 Q69 66 57 72"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="63"
        cy="70"
        r="3.4"
        fill="#555"
        stroke="#333"
        strokeWidth="1"
      />
    </svg>
  );
}

export const PLAN_ART = {
  diet: DietArt,
  activity: ActivityArt,
  advice: AdviceArt,
};
