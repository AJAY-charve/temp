import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

// LOGO IMPORT (Path Updated)
import logo from "../../assets/daibmetalogo.jpeg";

// Step images (Path Updated)
import imgAge from "../../assets/diabetes/step1_age.png";
import imgWaist from "../../assets/diabetes/step2_waist.png";
import imgActivity from "../../assets/diabetes/step3_activity.png";
import imgFamily from "../../assets/diabetes/step4_family.png";

/* ============ DIABMETA THEME ============ */
const PRIMARY = "#005c55";
const BUTTON = "#0d6b63";
const LIGHT = "#E0F2F1";
const BG = "#faf8ff";
const BORDER = "#eaedff";

/* ============ IDRS SCORING ============ */
const agePoints = (age) => (age < 35 ? 0 : age <= 49 ? 20 : 30);

const waistPoints = (cm) => {
  if (cm < 90) return 0;
  if (cm < 100) return 10;
  return 20;
};

const activityPoints = (a) =>
  ({ vigorous: 0, moderate: 10, mild: 20, none: 30 })[a] ?? 0;

const familyPoints = (f) => ({ none: 0, one: 10, both: 20 })[f] ?? 0;

export default function DiabetesAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [age, setAge] = useState("");
  const [waist, setWaist] = useState("");
  const [waistUnit, setWaistUnit] = useState("cm");
  const [showHow, setShowHow] = useState(false);
  const [activity, setActivity] = useState("");
  const [family, setFamily] = useState("");

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    const a = parseFloat(age);
    const w = parseFloat(waist);
    const wCm = waistUnit === "cm" ? w : w * 2.54;

    const pts = {
      age: agePoints(a),
      waist: waistPoints(wCm),
      activity: activityPoints(activity),
      family: familyPoints(family),
    };
    const score = pts.age + pts.waist + pts.activity + pts.family;

    navigate("/diabetes/result", {
      state: {
        score,
        answers: { age: a, waist: w, waistUnit, activity, family, pts },
      },
    });
  };

  const canProceed = () => {
    if (step === 1) return Number(age) > 0;
    if (step === 2) return Number(waist) > 0;
    if (step === 3) return activity !== "";
    if (step === 4) return family !== "";
    return false;
  };

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        backgroundColor: BG,
        fontFamily: "'Nunito','Noto Sans Devanagari',system-ui,sans-serif",
      }}
    >
      <div
        className="w-full max-w-md min-h-screen flex flex-col"
        style={{ backgroundColor: BG }}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-40" style={{ backgroundColor: BG }}>
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
                className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95 flex-shrink-0"
                style={{ color: PRIMARY }}
              >
                <ChevronLeft size={26} strokeWidth={2.4} />
              </button>
              <div className="min-w-0">
                <h1
                  className="font-extrabold text-[18px] leading-tight truncate"
                  style={{ color: PRIMARY }}
                >
                  Diabetes Risk
                </h1>
                <p className="text-[11px] text-gray-500 font-medium leading-tight truncate">
                  Assessment
                </p>
              </div>
            </div>

            {/* TOP RIGHT LOGO */}
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain flex-shrink-0"
            />
          </div>
        </header>

        {/* STEPPER */}
        <div className="px-5 pt-1 pb-4 flex items-center">
          {[1, 2, 3, 4].map((s, i) => (
            <Fragment key={s}>
              {i > 0 && (
                <div
                  className="h-[3px] flex-1 rounded-full"
                  style={{ backgroundColor: step >= s ? BUTTON : "#d9e3f1" }}
                />
              )}
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-extrabold flex-none"
                style={
                  step >= s
                    ? { backgroundColor: BUTTON, color: "#fff" }
                    : { backgroundColor: LIGHT, color: "#6b7a90" }
                }
              >
                {step > s ? <Check size={15} strokeWidth={3.4} /> : s}
              </div>
            </Fragment>
          ))}
        </div>

        {/* MAIN */}
        <main className="flex-1 px-4 pb-28">
          {/* ===== STEP 1 : AGE ===== */}
          {step === 1 && (
            <div style={{ animation: "dmFade 0.3s ease" }}>
              <StepPanel
                n="1."
                title="Your Age"
                hi="आपकी उम्र"
                img={imgAge}
                alt="Age"
                h={290}
              />
              <p
                className="mt-5 text-[17px] font-extrabold"
                style={{ color: PRIMARY }}
              >
                Enter your age
              </p>
              <p className="text-[14px] mb-2.5" style={{ color: PRIMARY }}>
                अपनी उम्र दर्ज करें
              </p>
              <div
                className="flex items-stretch rounded-xl bg-white overflow-hidden border"
                style={{ borderColor: BORDER }}
              >
                <input
                  type="number"
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years (e.g. 25)"
                  className="flex-1 min-w-0 px-4 py-3.5 bg-transparent outline-none text-[15px] font-semibold text-gray-800 placeholder-gray-400 placeholder:font-medium"
                />
                <span
                  className="px-4 flex items-center text-[14px] text-gray-600 border-l"
                  style={{ borderColor: BORDER }}
                >
                  years
                </span>
              </div>
              <div
                className="mt-4 rounded-xl p-3 flex items-start gap-3"
                style={{ backgroundColor: LIGHT }}
              >
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-none"
                  style={{ backgroundColor: "#c9ece7" }}
                >
                  <Lightbulb
                    size={18}
                    strokeWidth={2.2}
                    style={{ color: BUTTON }}
                  />
                </div>
                <p
                  className="text-[13px] leading-snug"
                  style={{ color: PRIMARY }}
                >
                  Age is an important factor in diabetes risk.
                  <br />
                  उम्र, Diabetes के जोखिम का एक महत्वपूर्ण कारक है।
                </p>
              </div>
            </div>
          )}

          {/* ===== STEP 2 : WAIST ===== */}
          {step === 2 && (
            <div style={{ animation: "dmFade 0.3s ease" }}>
              <StepPanel
                n="2."
                title="Your Waist Circumference"
                hi="कमर का माप"
                img={imgWaist}
                alt="Waist"
                h={230}
              />

              <div className="mt-4">
                <span
                  className="text-[13px] font-extrabold mr-1"
                  style={{ color: PRIMARY }}
                >
                  Enter Your Waist Circumference
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { v: "cm", t: "Centimetres (cm)" },
                  { v: "in", t: "Inches (in)" },
                ].map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setWaistUnit(o.v)}
                    className="py-3 rounded-full text-[14px] font-bold transition"
                    style={
                      waistUnit === o.v
                        ? { backgroundColor: BUTTON, color: "#fff" }
                        : { backgroundColor: LIGHT, color: PRIMARY }
                    }
                  >
                    {o.t}
                  </button>
                ))}
              </div>

              <div
                className="mt-3 flex items-stretch rounded-xl bg-white overflow-hidden border"
                style={{ borderColor: BORDER }}
              >
                <input
                  type="number"
                  inputMode="decimal"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="Enter waist circumference"
                  className="flex-1 min-w-0 px-4 py-3.5 bg-transparent outline-none text-[14px] font-semibold text-gray-800 placeholder-gray-400 placeholder:font-medium"
                />
                <span
                  className="px-4 flex items-center text-[14px] text-gray-600 border-l"
                  style={{ borderColor: BORDER }}
                >
                  {waistUnit}
                </span>
              </div>

              <button
                onClick={() => setShowHow(!showHow)}
                className="mt-3 w-full flex items-center gap-3 rounded-xl p-2.5 text-left border"
                style={{ backgroundColor: "#f6fbfa", borderColor: BORDER }}
              >
                <div className="w-[62px] h-[46px] rounded-lg bg-white overflow-hidden flex-none">
                  <TapeThumb />
                </div>
                <div className="flex-1">
                  <p
                    className="text-[15px] font-extrabold leading-tight"
                    style={{ color: PRIMARY }}
                  >
                    How to measure?
                  </p>
                  <p
                    className="text-[14px] leading-tight"
                    style={{ color: PRIMARY }}
                  >
                    कैसे मापें?
                  </p>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-gray-500 transition-transform ${showHow ? "rotate-90" : ""}`}
                />
              </button>

              {showHow && (
                <div
                  className="mt-2 rounded-xl p-3 text-[12px] leading-snug"
                  style={{ backgroundColor: LIGHT, color: PRIMARY }}
                >
                  <ol className="list-decimal list-inside space-y-1 mb-2">
                    <li>
                      Stand straight and relax your stomach. / सीधे खड़े हों और
                      पेट को ढीला रखें।
                    </li>
                    <li>
                      Wrap the tape around your waist at the navel level. / नाभि
                      के स्तर पर टेप लपेटें।
                    </li>
                    <li>
                      Breathe out normally and read the number. / सामान्य रूप से
                      सांस छोड़ें और माप पढ़ें।
                    </li>
                  </ol>
                  <p className="pt-2 border-t border-[#c9ece7] font-medium">
                    Measure your waist at the level of navel, after breathing
                    out normally.
                    <br />
                    नाभि के स्तर पर, सामान्य रूप से सांस छोड़ने के बाद कमर का
                    माप लें।
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 3 : ACTIVITY ===== */}
          {step === 3 && (
            <div style={{ animation: "dmFade 0.3s ease" }}>
              <StepPanel
                n="3."
                title="Your Physical Activity"
                hi="आपकी शारीरिक गतिविधि"
                img={imgActivity}
                alt="Activity"
                h={250}
              />
              <div className="mt-3 flex flex-col gap-2.5">
                <ChoiceCard
                  Icon={SeatedIcon}
                  title="No regular physical activity"
                  sub="कोई नियमित शारीरिक गतिविधि नहीं"
                  val="none"
                  selected={activity}
                  onSelect={setActivity}
                />
                <ChoiceCard
                  Icon={WalkIcon}
                  title="Mild physical activity"
                  sub="हल्की शारीरिक गतिविधि"
                  val="mild"
                  selected={activity}
                  onSelect={setActivity}
                />
                <ChoiceCard
                  Icon={RunIcon}
                  title="Moderate or vigorous activity"
                  sub="मध्यम या अधिक शारीरिक गतिविधि"
                  val="moderate"
                  selected={activity}
                  onSelect={setActivity}
                />
              </div>
            </div>
          )}

          {/* ===== STEP 4 : FAMILY ===== */}
          {step === 4 && (
            <div style={{ animation: "dmFade 0.3s ease" }}>
              <StepPanel
                n="4."
                title="Family History of Diabetes"
                hi="परिवार में Diabetes का इतिहास"
                img={imgFamily}
                alt="Family"
                h={230}
              />
              <div className="mt-3 flex flex-col gap-2.5">
                <ChoiceCard
                  Icon={UserIcon}
                  title="No parent has diabetes"
                  sub="माता-पिता में से किसी को Diabetes नहीं है"
                  val="none"
                  selected={family}
                  onSelect={setFamily}
                />
                <ChoiceCard
                  Icon={UsersIcon}
                  title="One parent has diabetes"
                  sub="माता-पिता में से किसी एक को Diabetes है"
                  val="one"
                  selected={family}
                  onSelect={setFamily}
                />
                <ChoiceCard
                  Icon={FamilyIcon}
                  title="Both parents have diabetes"
                  sub="दोनों माता-पिता को Diabetes है"
                  val="both"
                  selected={family}
                  onSelect={setFamily}
                />
              </div>
            </div>
          )}
        </main>

        {/* BOTTOM BUTTON */}
        <div
          className="fixed bottom-0 inset-x-0 backdrop-blur px-4 pt-3 pb-4"
          style={{ backgroundColor: "rgba(250,248,255,0.95)" }}
        >
          <div className="max-w-md mx-auto">
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-[54px] rounded-2xl text-white font-extrabold text-[18px] flex items-center justify-center gap-2.5 transition active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed"
              style={{
                background:
                  step === 4
                    ? "linear-gradient(180deg,#129186,#0d6b63)"
                    : `linear-gradient(180deg,#0d6b63,#005c55)`,
                boxShadow:
                  step === 4
                    ? "0 6px 16px rgba(13,107,99,0.32)"
                    : "0 6px 16px rgba(0,92,85,0.28)",
              }}
            >
              {step === 4 ? "Calculate Your Risk" : "Next"}
              <ArrowRight size={22} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;700&display=swap');
          @keyframes dmFade {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ============ HELPER COMPONENTS ============ */
function StepPanel({ n, title, hi, img, alt, h }) {
  return (
    <div
      className="rounded-[22px] p-4"
      style={{ background: "linear-gradient(180deg,#e6f4f2,#f0faf8)" }}
    >
      <h2
        className="text-[26px] font-extrabold leading-[1.08]"
        style={{ color: PRIMARY }}
      >
        <span className="font-semibold mr-2">{n}</span>
        {title}
      </h2>
      <p className="text-[17px] mt-1 mb-3" style={{ color: PRIMARY }}>
        {hi}
      </p>
      <div className="w-full rounded-xl overflow-hidden" style={{ height: h }}>
        <img
          src={img}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

function ChoiceCard({ Icon, title, sub, val, selected, onSelect }) {
  const isSel = selected === val;
  return (
    <button
      onClick={() => onSelect(val)}
      className="flex items-center gap-3 px-3 py-3 rounded-xl border-2 transition text-left active:scale-[0.99]"
      style={
        isSel
          ? { borderColor: BUTTON, backgroundColor: LIGHT }
          : { borderColor: BORDER, backgroundColor: "#fff" }
      }
    >
      <span
        className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center flex-none"
        style={{ borderColor: isSel ? BUTTON : "#c3cddb" }}
      >
        {isSel && (
          <span
            className="w-[11px] h-[11px] rounded-full"
            style={{ backgroundColor: BUTTON }}
          />
        )}
      </span>
      <span className="w-[46px] h-[46px] flex items-center justify-center flex-none">
        <Icon />
      </span>
      <span className="min-w-0">
        <span
          className="block text-[14px] font-extrabold leading-tight"
          style={{ color: PRIMARY }}
        >
          {title}
        </span>
        <span
          className="block text-[12.5px] leading-tight mt-0.5"
          style={{ color: "#3b4a66" }}
        >
          {sub}
        </span>
      </span>
    </button>
  );
}

/* ============ SVG ICONS ============ */
const IC = "#0d6b63";

function TapeThumb() {
  return (
    <svg viewBox="0 0 62 46" className="w-full h-full">
      <rect width="62" height="46" fill="#f0faf8" />
      <path
        d="M14 0 H48 Q52 14 50 30 L50 46 H12 L12 30 Q10 14 14 0Z"
        fill="#f1c8a2"
      />
      <circle cx="31" cy="25" r="1.6" fill="#d9a67c" />
      <path d="M12 36 H50 V46 H12Z" fill="#cfd6e0" />
      <path d="M10 22 Q31 28 52 22 L52 28 Q31 34 10 28Z" fill="#9cf2e8" />
      <g stroke="#0d6b63" strokeWidth="0.7">
        <path d="M16 24.4 V26.6" />
        <path d="M22 25.4 V27.6" />
        <path d="M28 26 V28.2" />
        <path d="M34 26 V28.2" />
        <path d="M40 25.4 V27.6" />
        <path d="M46 24.4 V26.6" />
      </g>
    </svg>
  );
}

const strokeProps = {
  fill: "none",
  stroke: IC,
  strokeWidth: 4.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function SeatedIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48">
      <circle cx="20" cy="9" r="4.6" fill={IC} />
      <g {...strokeProps}>
        <path d="M19 16 L19 29" />
        <path d="M19 29 L33 29 L33 42" />
        <path d="M19 19 L29 24" />
        <path d="M11 14 L11 36" strokeWidth="3.2" />
        <path d="M11 36 L27 36" strokeWidth="3.2" />
      </g>
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48">
      <circle cx="26" cy="8" r="4.6" fill={IC} />
      <g {...strokeProps}>
        <path d="M26 15 L24 28" />
        <path d="M26 18 L19 25" />
        <path d="M26 18 L32 25" />
        <path d="M24 28 L18 42" />
        <path d="M24 28 L30 36 L29 43" />
      </g>
    </svg>
  );
}

function RunIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48">
      <circle cx="31" cy="8" r="4.6" fill={IC} />
      <g {...strokeProps}>
        <path d="M29 15 L22 27" />
        <path d="M27 18 L36 22" />
        <path d="M27 18 L17 19" />
        <path d="M22 27 L31 33 L28 43" />
        <path d="M22 27 L14 34 L7 31" />
      </g>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48">
      <circle cx="24" cy="14" r="8" fill={IC} />
      <path d="M8 43 Q8 26 24 26 Q40 26 40 43Z" fill={IC} />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="46" height="42" viewBox="0 0 52 48">
      <circle cx="19" cy="15" r="7.5" fill={IC} />
      <path d="M4 42 Q4 26 19 26 Q33 26 34 42Z" fill={IC} />
      <circle cx="36" cy="16" r="6.5" fill="#3fafa4" />
      <path d="M26 42 Q26 27 37 27 Q49 28 49 42Z" fill="#3fafa4" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg width="48" height="44" viewBox="0 0 54 48">
      <circle cx="14" cy="13" r="6.5" fill={IC} />
      <path d="M2 36 Q2 22 14 22 Q25 22 26 36Z" fill={IC} />
      <circle cx="40" cy="13" r="6.5" fill={IC} />
      <path d="M28 36 Q28 22 40 22 Q52 22 52 36Z" fill={IC} />
      <circle cx="27" cy="26" r="5.5" fill="#3fafa4" />
      <path d="M17 44 Q17 32 27 32 Q37 32 37 44Z" fill="#3fafa4" />
    </svg>
  );
}
