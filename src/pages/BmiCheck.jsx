import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Weight,
  Info,
  Calendar,
  Activity,
} from "lucide-react";

// Images
import bmiImg from "../assets/cards/bmi.jpeg";
import diabetesImg from "../assets/cards/diabetes.jpeg";
import scanFoodImg from "../assets/cards/scan-food.jpeg";
import caloriesImg from "../assets/cards/calories.jpeg";
import bookApptImg from "../assets/cards/book-appt.png";

/* ============ BMI CATEGORIES (Asian Indian) ============ */
const BMI_CATEGORIES = {
  underweight: {
    label: "Underweight",
    range: "<18.5",
    rangeLong: "BMI less than 18.5",
    color: "#4059aa",
    bg: "#dce1ff",
  },
  normal: {
    label: "Normal Weight",
    range: "18.5–22.9",
    rangeLong: "BMI 18.5 to 22.9",
    color: "#005c55",
    bg: "#9cf2e8",
  },
  overweight: {
    label: "Overweight",
    range: "23.0–24.9",
    rangeLong: "BMI 23.0 to 24.9",
    color: "#c45d00",
    bg: "#ffe2c2",
  },
  obesity1: {
    label: "Obesity Class I",
    range: "25.0–29.9",
    rangeLong: "BMI 25.0 to 29.9",
    color: "#932265",
    bg: "#ffd8e7",
  },
  obesity2: {
    label: "Obesity Class II",
    range: "30.0–34.9",
    rangeLong: "BMI 30.0 to 34.9",
    color: "#932265",
    bg: "#ffd8e7",
  },
  obesity3: {
    label: "Obesity Class III",
    range: "≥35.0",
    rangeLong: "BMI 35.0 or higher",
    color: "#932265",
    bg: "#ffd8e7",
  },
};

const DISCLAIMER = {
  en: "These are general recommendations. Consult your doctor for personalised advice.",
  hi: "चिकित्सकीय सलाह: ये सामान्य सुझाव हैं। व्यक्तिगत सलाह के लिए अपने डॉक्टर से परामर्श करें।",
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
  const ft = Math.floor(totalIn / 12);
  const inch = Math.round(totalIn - ft * 12);
  return `${ft} ft ${inch} in`;
};

export default function BmiCheck() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    weight: "",
    age: "",
    sex: "male",
  });
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [result, setResult] = useState(null);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const getHeightInCm = () => {
    if (heightUnit === "cm") {
      return parseFloat(heightCm);
    }
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
    const catKey = getCategory(bmi);
    const cat = BMI_CATEGORIES[catKey];
    const ideal = calcIdealWeightRange(finalHeightCm);

    setResult({
      bmi: bmi.toFixed(1),
      bmiNum: bmi,
      catKey,
      ...cat,
      idealMin: ideal.min,
      idealMax: ideal.max,
      heightCm: finalHeightCm,
    });
  };

  const reset = () => {
    setForm({ weight: "", age: "", sex: "male" });
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              {result ? "Your BMI Result" : "BMI Calculator"}
            </h1>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 px-4 pt-4">
          {!result ? (
            /* ========== INPUT VIEW ========== */
            <>
              <div className="bg-gradient-to-br from-[#e8f8f1] to-[#eef6f9] rounded-2xl p-4 mb-4 flex items-center justify-between overflow-hidden">
                <div className="flex-1 pr-3">
                  <h2 className="text-[20px] font-black text-gray-900 leading-tight">
                    Check your{" "}
                    <span className="text-[#005c55]">Obesity level</span>
                  </h2>
                  <p className="text-[11px] text-gray-600 mt-2 leading-snug">
                    Enter your details to calculate your BMI
                  </p>
                </div>
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                  <img
                    src={bmiImg}
                    alt="BMI"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                      />
                      <span className="text-[11px] font-medium text-gray-400">
                        ft
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="2"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
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
                className="w-full bg-[#005c55] text-white font-bold py-3.5 rounded-xl disabled:opacity-40 active:scale-[0.98] transition shadow-lg shadow-[#005c55]/20 flex items-center justify-center gap-2"
              >
                Calculate BMI <ArrowRight size={16} />
              </button>
            </>
          ) : (
            /* ========== RESULT VIEW ========== */
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <div className="bg-gradient-to-br from-[#e8f8f1] to-[#eef6f9] rounded-2xl p-4 mb-4 flex items-center justify-between overflow-hidden">
                <div className="flex-1 pr-3">
                  <p className="text-[11px] font-semibold text-gray-600">
                    Your BMI is
                  </p>
                  <p className="text-[40px] font-black text-[#005c55] leading-none mt-0.5">
                    {result.bmi}
                  </p>
                  <span
                    className="inline-block text-[10px] font-bold text-white px-2 py-1 rounded mt-1.5"
                    style={{ backgroundColor: result.color }}
                  >
                    {result.label.toUpperCase()}
                  </span>
                  <p className="text-[10px] text-gray-500 mt-1.5">
                    ({result.rangeLong} for Asian population)
                  </p>
                </div>
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                  <img
                    src={bmiImg}
                    alt="Result"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#eaedff] mb-4">
                <h3 className="text-[13px] font-bold text-gray-900 mb-3">
                  Where do you stand?
                </h3>

                <div className="relative mb-2">
                  <div
                    className="absolute -top-1 z-10 flex flex-col items-center"
                    style={{
                      left: `${Math.min(
                        Math.max((result.bmiNum / 40) * 100, 2),
                        98,
                      )}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span className="text-[10px] font-bold text-white bg-[#005c55] px-1.5 py-0.5 rounded">
                      {result.bmi}
                    </span>
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "6px solid #005c55",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex h-2 rounded-full overflow-hidden mb-2">
                  <div className="flex-1 bg-[#dce1ff]" />
                  <div className="flex-1 bg-[#9cf2e8]" />
                  <div className="flex-1 bg-[#ffe2c2]" />
                  <div className="flex-1 bg-[#ffd8e7]" />
                  <div className="flex-1 bg-[#ffc4d6]" />
                  <div className="flex-1 bg-[#ff8fb0]" />
                </div>

                <div className="grid grid-cols-6 gap-0.5 mb-4">
                  <ScaleLabel label="< 18.5" sub="Under" color="#4059aa" />
                  <ScaleLabel label="18.5–22.9" sub="Normal" color="#005c55" />
                  <ScaleLabel label="23.0–24.9" sub="Over" color="#c45d00" />
                  <ScaleLabel label="25.0–29.9" sub="Class I" color="#932265" />
                  <ScaleLabel
                    label="30.0–34.9"
                    sub="Class II"
                    color="#932265"
                  />
                  <ScaleLabel label="≥ 35.0" sub="Class III" color="#932265" />
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <div className="bg-[#fef4e8] rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-gray-600">
                      Your weight
                    </p>
                    <p className="text-[16px] font-black text-gray-900 mt-1">
                      {form.weight}{" "}
                      <span className="text-[11px] font-bold text-gray-500">
                        kg
                      </span>
                    </p>
                  </div>
                  <div className="bg-[#e8f8f1] rounded-xl p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#005c55] flex items-center justify-center flex-shrink-0">
                      <RefreshCw size={14} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-gray-600">
                        Ideal weight range
                      </p>
                      <p className="text-[12px] font-black text-[#005c55] mt-0.5 leading-tight">
                        {result.idealMin} – {result.idealMax} kg
                      </p>
                      <p className="text-[9px] text-gray-500 mt-0.5">
                        for height ({formatFtIn(result.heightCm)})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-[13px] font-bold text-gray-900 mb-2 mt-2">
                Get personalised guidance
              </h3>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <GuidanceCard
                  image={scanFoodImg}
                  title="Diet Plan"
                  color="#e8f8f1"
                  onClick={() => navigate(`/health-plan/${result.catKey}/diet`)}
                />
                <GuidanceCard
                  image={caloriesImg}
                  title="Physical Activity"
                  color="#e8efff"
                  onClick={() =>
                    navigate(`/health-plan/${result.catKey}/activity`)
                  }
                />
                <GuidanceCard
                  image={diabetesImg}
                  title="Other Advice"
                  color="#fff8e1"
                  onClick={() =>
                    navigate(`/health-plan/${result.catKey}/advice`)
                  }
                />
                <GuidanceCard
                  image={bookApptImg}
                  title="Consult a Doctor"
                  color="#ffeef3"
                  onClick={() => navigate("/appointment")}
                />
              </div>

              {/* Disclaimer */}
              <div className="bg-[#eef6f9] rounded-2xl p-3.5 mb-4 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#005c55] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info size={13} className="text-white" />
                </div>
                <div className="text-[10px] text-gray-700 leading-relaxed">
                  <p>
                    <span className="font-bold">Disclaimer:</span>{" "}
                    {DISCLAIMER.en}
                  </p>
                  <p className="mt-1.5">{DISCLAIMER.hi}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={reset}
                  className="w-full bg-[#005c55] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-[#005c55]/20"
                >
                  <RefreshCw size={16} />
                  Calculate Again
                </button>
                <button
                  onClick={() => navigate("/appointment")}
                  className="w-full border border-[#005c55] text-[#005c55] font-bold py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2 hover:bg-[#e8f3f1]"
                >
                  Book Doctor Consult <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </main>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ============ HELPER COMPONENTS ============ */

function ScaleLabel({ label, sub, color }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[7.5px] font-bold" style={{ color }}>
        {label}
      </span>
      <span className="text-[7px] text-gray-500 mt-0.5">{sub}</span>
    </div>
  );
}

function GuidanceCard({ image, title, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#eaedff] p-2.5 flex flex-col items-center text-center active:scale-[0.97] transition"
    >
      <div
        className="w-full h-16 rounded-xl flex items-center justify-center mb-2 overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <p className="text-[11px] font-bold text-gray-900">{title}</p>
    </button>
  );
}
