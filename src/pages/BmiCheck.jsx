import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Ruler,
  Weight,
  User,
  Calendar,
  ArrowRight,
  Activity,
  Check,
  RefreshCw,
  Heart,
} from "lucide-react";

export default function BmiCheck() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    height: "",
    weight: "",
    age: "",
    sex: "male",
  });
  const [result, setResult] = useState(null);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const canCalculate =
    form.height > 0 && form.weight > 0 && form.age > 0 && form.sex;

  const calculate = () => {
    const h = parseFloat(form.height) / 100; // cm → m
    const w = parseFloat(form.weight);
    const bmi = w / (h * h);

    let category = "";
    let color = "";
    let bg = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "#4059aa";
      bg = "#dce1ff";
      advice =
        "You're below the healthy range. Include protein-rich foods and consult a dietician.";
    } else if (bmi < 25) {
      category = "Normal";
      color = "#005c55";
      bg = "#9cf2e8";
      advice =
        "Great! You're in the healthy range. Keep up balanced diet and regular activity.";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "#c45d00";
      bg = "#ffe2c2";
      advice =
        "Slightly above healthy range. Focus on portion control and 30 min daily walks.";
    } else {
      category = "Obese";
      color = "#932265";
      bg = "#ffd8e7";
      advice = "BMI in obese range. Consult a doctor for a personalised plan.";
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      bg,
      advice,
    });
  };

  const reset = () => {
    setForm({ height: "", weight: "", age: "", sex: "male" });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col">
        {/* ============ TOP BAR ============ */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              BMI Calculator
            </h1>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* ============ MAIN ============ */}
        <main className="flex-1 pb-8 px-4 pt-5">
          {!result ? (
            <>
              {/* Hero */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#9cf2e8] flex items-center justify-center text-[#005c55] mb-3">
                  <Activity size={28} />
                </div>
                <h2 className="text-[20px] font-bold text-gray-900">
                  Check Your BMI
                </h2>
                <p className="text-[12px] text-gray-500 mt-1">
                  Know your body mass index in seconds
                </p>
              </div>

              {/* Form card */}
              <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-[0_2px_12px_rgba(15,23,42,0.04)] mb-4">
                {/* Height */}
                <label className="text-[12px] font-semibold text-gray-700">
                  Height (cm)
                </label>
                <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                  <Ruler size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="number"
                    value={form.height}
                    onChange={(e) => update("height", e.target.value)}
                    placeholder="e.g. 170"
                    className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                  />
                  <span className="text-[12px] font-medium text-gray-400">
                    cm
                  </span>
                </div>

                {/* Weight */}
                <label className="text-[12px] font-semibold text-gray-700">
                  Weight (kg)
                </label>
                <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                  <Weight size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    placeholder="e.g. 72"
                    className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                  />
                  <span className="text-[12px] font-medium text-gray-400">
                    kg
                  </span>
                </div>

                {/* Age + Sex */}
                <div className="grid grid-cols-[1fr_1.6fr] gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-gray-700">
                      Age
                    </label>
                    <div className="mt-1.5 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                      <Calendar
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <input
                        type="number"
                        value={form.age}
                        onChange={(e) => update("age", e.target.value)}
                        placeholder="32"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-gray-700">
                      Sex
                    </label>
                    <div className="mt-1.5 bg-[#eef1f8] rounded-xl p-1 flex gap-1">
                      {["male", "female", "other"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => update("sex", g)}
                          className={`flex-1 py-2 rounded-lg text-[11px] font-semibold capitalize transition ${
                            form.sex === g
                              ? "bg-white text-[#005c55] shadow-sm"
                              : "text-gray-500"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculate button */}
              <button
                onClick={calculate}
                disabled={!canCalculate}
                className="w-full bg-[#005c55] text-white font-bold py-3.5 rounded-xl disabled:opacity-40 active:scale-[0.98] transition shadow-lg shadow-[#005c55]/20 flex items-center justify-center gap-2"
              >
                Calculate BMI <ArrowRight size={16} />
              </button>

              {/* Info row */}
              <div className="mt-5 bg-white rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#dce1ff] flex items-center justify-center text-[#4059aa] flex-shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-900">
                    Why BMI matters?
                  </p>
                  <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                    BMI helps screen for weight categories that may lead to
                    health problems like diabetes and heart disease.
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* ============ RESULT VIEW ============ */
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              {/* Result circle card */}
              <div className="bg-white rounded-3xl border border-[#eaedff] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6 flex flex-col items-center text-center mb-5">
                <div
                  className="w-40 h-40 rounded-full flex flex-col items-center justify-center mb-4"
                  style={{ backgroundColor: result.bg, color: result.color }}
                >
                  <p className="text-[12px] font-semibold opacity-80">
                    Your BMI
                  </p>
                  <p className="text-[44px] font-black leading-none mt-1">
                    {result.bmi}
                  </p>
                  <p className="text-[12px] font-bold mt-1 uppercase tracking-wide">
                    {result.category}
                  </p>
                </div>

                <h2 className="text-[18px] font-bold text-gray-900">
                  {result.category === "Normal"
                    ? "Great! You're Healthy 🎉"
                    : `You're ${result.category}`}
                </h2>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed px-2">
                  {result.advice}
                </p>
              </div>

              {/* BMI scale */}
              <div className="bg-white rounded-2xl p-4 border border-[#eaedff] mb-5">
                <h3 className="text-[12px] font-bold text-gray-900 mb-3">
                  BMI Range
                </h3>

                <div className="flex h-2.5 rounded-full overflow-hidden mb-3">
                  <div className="flex-1 bg-[#dce1ff]" />
                  <div className="flex-1 bg-[#9cf2e8]" />
                  <div className="flex-1 bg-[#ffe2c2]" />
                  <div className="flex-1 bg-[#ffd8e7]" />
                </div>

                <div className="grid grid-cols-4 gap-1">
                  <ScaleItem label="Under" value="<18.5" color="#4059aa" />
                  <ScaleItem label="Normal" value="18.5-24.9" color="#005c55" />
                  <ScaleItem label="Over" value="25-29.9" color="#c45d00" />
                  <ScaleItem label="Obese" value="30+" color="#932265" />
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

function ScaleItem({ label, value, color }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[9px] font-bold" style={{ color }}>
        {label}
      </span>
      <span className="text-[8px] text-gray-500">{value}</span>
    </div>
  );
}
