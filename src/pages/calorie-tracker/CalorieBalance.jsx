import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info, Utensils, Activity, Scale } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

// ---- Gauge geometry (module level, so it is not recreated on every render) ----
const CX = 120;
const CY = 130;
const R = 80;
const THICK = 28;
const MAX_SCALE = 1000;

// angle in degrees: 0 = straight up, -90 = left end, +90 = right end
const polar = (deg, rad) => {
  const t = (deg * Math.PI) / 180;
  return { x: CX + rad * Math.sin(t), y: CY - rad * Math.cos(t) };
};

// arc from angle a1 to a2 (always left -> right, so sweep flag = 1)
const arcPath = (a1, a2, rad) => {
  const s = polar(a1, rad);
  const e = polar(a2, rad);
  return `M ${s.x} ${s.y} A ${rad} ${rad} 0 0 1 ${e.x} ${e.y}`;
};

// Gauge bands. Light bands are drawn first and slightly overlapped by the
// dark bands, so the seam at 45deg is a clean radial cut (follows the arc),
// with no gap. The only gap is the small one at the center.
const SEGMENTS = [
  { a1: -47, a2: -1.5, g1: -45, g2: -1.5, c1: "#9dd5b6", c2: "#e2f2e9" },
  { a1: 1.5, a2: 47, g1: 1.5, g2: 45, c1: "#fde1db", c2: "#f9b2a4" },
  { a1: -90, a2: -45, g1: -90, g2: -45, c1: "#14925a", c2: "#34a872" },
  { a1: 45, a2: 90, g1: 45, g2: 90, c1: "#f58b7a", c2: "#ee5340" },
];

export default function CalorieBalance() {
  const navigate = useNavigate();

  const intake = 1650;
  const burn = 2260;
  const balance = intake - burn;
  const isDeficit = balance < 0;
  const isBalanced = balance === 0;
  const absBalance = Math.abs(balance);

  // -1000 (left) = -90deg, 0 = 0deg, +1000 (right) = +90deg
  const clampedBalance = Math.max(Math.min(balance, MAX_SCALE), -MAX_SCALE);
  const angle = (clampedBalance / MAX_SCALE) * 90;

  const accentText = isDeficit ? "text-[#2e9e48]" : "text-[#ef5350]";

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/calorie-tracker")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Calorie Balance
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-10 flex flex-col gap-4 overflow-y-auto">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#fde3e3] rounded-2xl p-3.5 border border-[#fbd4d4]">
              <p className="text-[11px] font-bold text-[#14284b]">
                Total Intake
              </p>
              <p className="text-[9px] text-gray-500 mb-2 font-medium">
                Consumed today
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-black text-[#ef5350]">
                  {intake} <span className="text-[10px]">kcal</span>
                </p>
                <Utensils size={20} className="text-[#ef5350]/50" />
              </div>
            </div>
            <div className="bg-[#e0eefc] rounded-2xl p-3.5 border border-[#cce0f5]">
              <p className="text-[11px] font-bold text-[#14284b]">Total Burn</p>
              <p className="text-[9px] text-gray-500 mb-2 font-medium">
                Burned today
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-black text-[#2f8cf0]">
                  {burn} <span className="text-[10px]">kcal</span>
                </p>
                <Activity size={20} className="text-[#2f8cf0]/50" />
              </div>
            </div>
          </div>

          {/* Gauge Chart Area */}
          <div className="bg-[#f0fbf9] rounded-3xl p-5 border border-[#d1ede9] flex flex-col items-center relative overflow-hidden shadow-sm">
            <h2 className="text-[15px] font-extrabold text-[#14284b] mb-1">
              Today's Balance
            </h2>
            <p className="text-[11px] text-gray-500 mb-4 font-medium">
              Calories consumed - Calories burned
            </p>

            {/* Gauge Graphic */}
            <div className="w-full max-w-[300px] mb-5">
              <svg
                viewBox="0 0 240 170"
                className="w-full h-auto"
                role="img"
                aria-label={`Calorie balance gauge showing ${
                  isBalanced ? "" : isDeficit ? "-" : "+"
                }${absBalance} kcal`}
              >
                <defs>
                  {SEGMENTS.map((seg, i) => (
                    <linearGradient
                      key={i}
                      id={`gaugeSeg${i}`}
                      gradientUnits="userSpaceOnUse"
                      x1={polar(seg.g1, R).x}
                      y1="0"
                      x2={polar(seg.g2, R).x}
                      y2="0"
                    >
                      <stop offset="0%" stopColor={seg.c1} />
                      <stop offset="100%" stopColor={seg.c2} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Arc bands */}
                {SEGMENTS.map((seg, i) => (
                  <path
                    key={i}
                    d={arcPath(seg.a1, seg.a2, R)}
                    fill="none"
                    stroke={`url(#gaugeSeg${i})`}
                    strokeWidth={THICK}
                  />
                ))}

                {/* Top label */}
                <text
                  x={CX}
                  y="13"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="#14284b"
                >
                  0
                </text>
                <text
                  x={CX}
                  y="27"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="500"
                  fill="#64809c"
                >
                  Balanced
                </text>

                {/* Left label */}
                <text
                  x={CX - R}
                  y={CY + 25}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="#14284b"
                >
                  -1,000
                </text>
                <text
                  x={CX - R}
                  y={CY + 39}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="500"
                  fill="#64809c"
                >
                  Deficit
                </text>

                {/* Right label */}
                <text
                  x={CX + R}
                  y={CY + 25}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="#14284b"
                >
                  +1,000
                </text>
                <text
                  x={CX + R}
                  y={CY + 39}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="500"
                  fill="#64809c"
                >
                  Surplus
                </text>

                {/* Needle */}
                <g
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <polygon
                    points={`${CX - 6},${CY} ${CX + 6},${CY} ${CX + 1.2},${CY - 74} ${CX - 1.2},${CY - 74}`}
                    fill="#14284b"
                    strokeLinejoin="round"
                  />
                  <circle cx={CX} cy={CY} r="12" fill="#14284b" />
                  <circle cx={CX} cy={CY} r="5" fill="#cfdde8" />
                </g>
              </svg>
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-2xl p-4 w-full shadow-sm text-center border border-[#eaedff] z-10 relative">
              {isBalanced ? (
                <>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-2 bg-gray-100 text-gray-600">
                    Balanced
                  </span>
                  <p className="text-[36px] font-black leading-none text-gray-700">
                    0 <span className="text-[14px] font-extrabold">kcal</span>
                  </p>
                  <p className="text-[11px] text-gray-500 mt-2 px-4 leading-snug font-medium">
                    You consumed the same calories as you burned today.
                  </p>
                </>
              ) : (
                <>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-2 ${
                      isDeficit
                        ? "bg-[#e4f4e8] text-[#2e9e48]"
                        : "bg-[#fde3e3] text-[#ef5350]"
                    }`}
                  >
                    Calorie {isDeficit ? "Deficit" : "Surplus"}
                  </span>
                  <p
                    className={`text-[36px] font-black leading-none ${accentText}`}
                  >
                    {isDeficit ? "-" : "+"}
                    {absBalance}{" "}
                    <span className="text-[14px] font-extrabold">kcal</span>
                  </p>
                  <p className="text-[11px] text-gray-500 mt-2 px-4 leading-snug font-medium">
                    You {isDeficit ? "burned" : "consumed"} {absBalance} more
                    calories than you {isDeficit ? "consumed" : "burned"} today.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e4f4e8] flex items-center justify-center flex-none">
              <Scale size={20} className="text-[#2e9e48]" />
            </div>
            <div>
              <p className="text-[12px] font-extrabold text-[#14284b]">
                What does this mean?
              </p>
              <p className="text-[10px] text-gray-500 leading-snug mt-1 font-medium">
                A calorie deficit may help in gradual weight loss if maintained
                over time, along with a balanced diet and regular physical
                activity.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#f4f5fb] rounded-2xl p-3.5 flex items-start gap-3 border border-[#eaedff]">
            <Info size={16} className="text-[#0d6b63] flex-none mt-0.5" />
            <p className="text-[9.5px] text-gray-500 leading-relaxed font-medium">
              All values are estimates based on the information you provide and
              may vary. This feature is for general guidance only.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
