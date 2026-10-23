import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Flame,
  Activity,
  Footprints,
  Info,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

const INTENSITY_OPTIONS = [
  {
    val: "2.5",
    label: "Light",
    color: "text-[#2e9e48]",
    bg: "bg-[#e4f4e8]",
    border: "border-[#2e9e48]/30",
    desc: "Easy breathing, can talk comfortably",
  },
  {
    val: "4.0",
    label: "Moderate",
    color: "text-[#2f8cf0]",
    bg: "bg-[#e0eefc]",
    border: "border-[#2f8cf0]/30",
    desc: "Faster breathing, can still talk",
  },
  {
    val: "7.0",
    label: "Intense",
    color: "text-[#ef5350]",
    bg: "bg-[#fde3e3]",
    border: "border-[#ef5350]/30",
    desc: "Breathing hard, difficult to talk",
  },
];

export default function CalorieBurn() {
  const navigate = useNavigate();

  // All states start empty / unselected
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");

  // Parse values safely, defaulting to 0
  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseFloat(age) || 0;
  const act = parseFloat(activity) || 0;
  const dur = parseFloat(duration) || 0;
  const met = parseFloat(intensity) || 0;

  // Only calculate BMR if we have weight, height, age, and sex
  const isBasicInfoFilled = w > 0 && h > 0 && a > 0 && sex !== "";

  const bmr = isBasicInfoFilled
    ? sex === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161
    : 0;

  const activityCal = bmr > 0 && act > 0 ? bmr * (act - 1) : 0;
  const exerciseCal =
    met > 0 && w > 0 && dur > 0 ? (met - 1) * w * (dur / 60) : 0;

  // Only show total if basic info is filled, otherwise 0
  const totalBurn = isBasicInfoFilled ? bmr + activityCal + exerciseCal : 0;

  // For the button validation (require basic info at least)
  const isReadyForNext = isBasicInfoFilled;

  // Get selected intensity description
  const selectedIntensityObj = INTENSITY_OPTIONS.find(
    (opt) => opt.val === intensity,
  );

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/calorie-tracker")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Calorie Burn
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-4 overflow-y-auto">
          {/* 1. Basic Info */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <h2 className="text-[13.5px] font-extrabold text-[#14284b] mb-3">
              1. Basic Information
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  Age (yrs)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#eaedff] bg-[#faf8ff] text-[13px] font-bold outline-none focus:border-[#0d6b63] placeholder-gray-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  Sex
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSex("male")}
                    className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold border transition ${sex === "male" ? "bg-[#e0eefc] border-[#2f8cf0]/30 text-[#2f8cf0]" : "bg-[#faf8ff] border-[#eaedff] text-gray-500"}`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setSex("female")}
                    className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold border transition ${sex === "female" ? "bg-[#fde3e3] border-[#ef5350]/30 text-[#ef5350]" : "bg-[#faf8ff] border-[#eaedff] text-gray-500"}`}
                  >
                    Female
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#eaedff] bg-[#faf8ff] text-[13px] font-bold outline-none focus:border-[#0d6b63] placeholder-gray-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 170"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#eaedff] bg-[#faf8ff] text-[13px] font-bold outline-none focus:border-[#0d6b63] placeholder-gray-300 transition"
                />
              </div>
            </div>
          </div>

          {/* 2. Activity */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <h2 className="text-[13.5px] font-extrabold text-[#14284b] mb-3">
              2. Today's Daily Activity
            </h2>
            <div className="flex flex-col gap-2">
              {[
                {
                  val: "1.20",
                  label: "Mostly sitting",
                  desc: "Office work, TV, minimal movement",
                },
                {
                  val: "1.30",
                  label: "Light activity",
                  desc: "Household work, light walking",
                },
                {
                  val: "1.40",
                  label: "Moderate activity",
                  desc: "Frequent walking, active job",
                },
                {
                  val: "1.50",
                  label: "High activity",
                  desc: "Physically demanding work",
                },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setActivity(opt.val)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition ${
                    activity === opt.val
                      ? "bg-[#e4f4e8] border-[#2e9e48]/30"
                      : "bg-[#faf8ff] border-[#eaedff] hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-none transition ${
                      activity === opt.val
                        ? "border-[#2e9e48]"
                        : "border-gray-300"
                    }`}
                  >
                    {activity === opt.val && (
                      <div className="w-2 h-2 rounded-full bg-[#2e9e48]" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-[12px] font-bold ${activity === opt.val ? "text-[#2e9e48]" : "text-[#14284b]"}`}
                    >
                      {opt.label}
                    </p>
                    <p className="text-[9px] text-gray-500 font-medium">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Exercise */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <h2 className="text-[13.5px] font-extrabold text-[#14284b] mb-3">
              3. Today's Exercise (Optional)
            </h2>
            <label className="text-[11px] font-bold text-gray-700 mb-1.5 block">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration"
              className="w-full px-3 py-2.5 rounded-lg border border-[#eaedff] bg-[#faf8ff] text-[13px] font-bold outline-none focus:border-[#0d6b63] mb-4 placeholder-gray-300 transition"
            />

            <label className="text-[11px] font-bold text-gray-700 mb-1.5 block">
              Intensity (MET)
            </label>
            <div className="flex gap-2">
              {INTENSITY_OPTIONS.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setIntensity(opt.val)}
                  className={`flex-1 py-2.5 rounded-lg text-[11px] font-bold border transition ${
                    intensity === opt.val
                      ? `${opt.bg} ${opt.border} ${opt.color}`
                      : "bg-[#faf8ff] border-[#eaedff] text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Dynamic Info for Intensity */}
            <div
              className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${intensity ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {selectedIntensityObj && (
                <div
                  className={`flex items-start gap-2 p-2.5 rounded-lg border ${selectedIntensityObj.bg} ${selectedIntensityObj.border}`}
                >
                  <Info
                    size={14}
                    className={`mt-0.5 flex-none ${selectedIntensityObj.color}`}
                  />
                  <p
                    className={`text-[10.5px] font-semibold leading-snug ${selectedIntensityObj.color}`}
                  >
                    {selectedIntensityObj.desc}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Total Burn Result */}
          <div className="bg-[#f4f5fb] rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-extrabold text-[#14284b]">
                Estimated Total Burn
              </h3>
              <HelpCircle size={14} className="text-gray-400" />
            </div>

            <div className="flex items-center gap-2 text-center">
              <div
                className={`flex-1 bg-white p-2 rounded-xl border border-[#eaedff] shadow-sm transition-opacity ${isBasicInfoFilled ? "opacity-100" : "opacity-50"}`}
              >
                <Flame size={16} className="text-[#ef5350] mx-auto mb-1" />
                <p className="text-[9px] font-bold text-gray-500">Resting</p>
                <p className="text-[13px] font-extrabold text-[#14284b]">
                  {Math.round(bmr)}
                </p>
              </div>
              <span className="text-gray-400 font-bold">+</span>
              <div
                className={`flex-1 bg-white p-2 rounded-xl border border-[#eaedff] shadow-sm transition-opacity ${isBasicInfoFilled && act > 0 ? "opacity-100" : "opacity-50"}`}
              >
                <Activity size={16} className="text-[#2e9e48] mx-auto mb-1" />
                <p className="text-[9px] font-bold text-gray-500">Activity</p>
                <p className="text-[13px] font-extrabold text-[#14284b]">
                  {Math.round(activityCal)}
                </p>
              </div>
              <span className="text-gray-400 font-bold">+</span>
              <div
                className={`flex-1 bg-white p-2 rounded-xl border border-[#eaedff] shadow-sm transition-opacity ${exerciseCal > 0 ? "opacity-100" : "opacity-50"}`}
              >
                <Footprints size={16} className="text-[#f5a623] mx-auto mb-1" />
                <p className="text-[9px] font-bold text-gray-500">Exercise</p>
                <p className="text-[13px] font-extrabold text-[#14284b]">
                  {Math.round(exerciseCal)}
                </p>
              </div>
            </div>

            <div className="mt-3 bg-[#fde3e3] rounded-xl p-3 flex items-center justify-between border border-[#ef5350]/20">
              <p className="text-[12px] font-extrabold text-[#14284b]">
                Total Burn
              </p>
              <p className="text-[18px] font-black text-[#ef5350]">
                {Math.round(totalBurn)}{" "}
                <span className="text-[10px]">kcal</span>
              </p>
            </div>
            {!isBasicInfoFilled && (
              <p className="text-[10px] text-center text-gray-500 mt-2 font-medium">
                Fill age, sex, weight, and height to calculate.
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/calorie-tracker/balance")}
            disabled={!isReadyForNext}
            className={`w-full font-bold text-[14px] py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-2 ${
              isReadyForNext
                ? "bg-[#0d6b63] text-white active:scale-[0.98] shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next : Calorie Balance <ChevronRight size={16} />
          </button>
        </main>
      </div>
    </div>
  );
}
