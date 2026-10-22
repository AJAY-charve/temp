import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Flame,
  Activity,
  Footprints,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function CalorieBurn() {
  const navigate = useNavigate();

  const [age, setAge] = useState("35");
  const [sex, setSex] = useState("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState("1.20");
  const [duration, setDuration] = useState("30");
  const [intensity, setIntensity] = useState("4.0");

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseFloat(age) || 0;
  const act = parseFloat(activity) || 1.2;
  const dur = parseFloat(duration) || 0;
  const met = parseFloat(intensity) || 4.0;

  const bmr =
    sex === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
  const activityCal = bmr * (act - 1);
  const exerciseCal = (met - 1) * w * (dur / 60);
  const totalBurn = bmr + activityCal + exerciseCal;

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
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] font-bold outline-none focus:border-[#0d6b63]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block">
                  Sex
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSex("male")}
                    className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold border transition ${sex === "male" ? "bg-[#e0eefc] border-[#2f8cf0] text-[#2f8cf0]" : "bg-gray-50 border-gray-200 text-gray-500"}`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setSex("female")}
                    className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold border transition ${sex === "female" ? "bg-[#fde3e3] border-[#ef5350] text-[#ef5350]" : "bg-gray-50 border-gray-200 text-gray-500"}`}
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
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] font-bold outline-none focus:border-[#0d6b63]"
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
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] font-bold outline-none focus:border-[#0d6b63]"
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
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition ${activity === opt.val ? "bg-[#e4f4e8] border-[#2e9e48]" : "bg-white border-gray-200"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${activity === opt.val ? "border-[#2e9e48]" : "border-gray-300"}`}
                  >
                    {activity === opt.val && (
                      <div className="w-2 h-2 rounded-full bg-[#2e9e48]" />
                    )}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#14284b]">
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
              3. Today's Exercise
            </h2>
            <label className="text-[11px] font-bold text-gray-700 mb-1.5 block">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] font-bold outline-none focus:border-[#0d6b63] mb-3"
            />
            <label className="text-[11px] font-bold text-gray-700 mb-1.5 block">
              Intensity (MET)
            </label>
            <div className="flex gap-2">
              {[
                { val: "2.5", label: "Light" },
                { val: "4.0", label: "Moderate" },
                { val: "7.0", label: "Intense" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setIntensity(opt.val)}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-bold border transition ${intensity === opt.val ? "bg-[#e0eefc] border-[#2f8cf0] text-[#2f8cf0]" : "bg-white border-gray-200 text-gray-500"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Total Burn Result */}
          <div className="bg-[#f4f5fb] rounded-2xl p-4 border border-[#eaedff] shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-extrabold text-[#14284b]">
                Estimated Total Burn
              </h3>
              <HelpCircle size={14} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-2 text-center">
              <div className="flex-1 bg-white p-2 rounded-xl border border-gray-100">
                <Flame size={16} className="text-[#ef5350] mx-auto mb-1" />
                <p className="text-[9px] font-bold text-gray-500">Resting</p>
                <p className="text-[13px] font-extrabold text-[#14284b]">
                  {Math.round(bmr)}
                </p>
              </div>
              <span className="text-gray-400 font-bold">+</span>
              <div className="flex-1 bg-white p-2 rounded-xl border border-gray-100">
                <Activity size={16} className="text-[#2e9e48] mx-auto mb-1" />
                <p className="text-[9px] font-bold text-gray-500">Activity</p>
                <p className="text-[13px] font-extrabold text-[#14284b]">
                  {Math.round(activityCal)}
                </p>
              </div>
              <span className="text-gray-400 font-bold">+</span>
              <div className="flex-1 bg-white p-2 rounded-xl border border-gray-100">
                <Footprints size={16} className="text-[#f5a623] mx-auto mb-1" />
                <p className="text-[9px] font-bold text-gray-500">Exercise</p>
                <p className="text-[13px] font-extrabold text-[#14284b]">
                  {Math.round(exerciseCal)}
                </p>
              </div>
            </div>
            <div className="mt-3 bg-[#fde3e3] rounded-xl p-3 flex items-center justify-between border border-[#fbd4d4]">
              <p className="text-[12px] font-extrabold text-[#14284b]">
                Total Burn
              </p>
              <p className="text-[18px] font-black text-[#ef5350]">
                {Math.round(totalBurn)}{" "}
                <span className="text-[10px]">kcal</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/calorie-tracker/balance")}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            Next : Calorie Balance <ChevronRight size={16} />
          </button>
        </main>
      </div>
    </div>
  );
}
