import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ArrowRight,
  ShieldCheck,
  X,
  AlertCircle,
} from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

// Real images
import bmiImg from "../assets/cards/bmi.jpeg";
import bloodTestImg from "../assets/cards/blood-test.png";
import ecgImg from "../assets/cards/ecg.png";
import xrayImg from "../assets/cards/xray.png";
import supplementsImg from "../assets/cards/supplements.png";
import devicesImg from "../assets/cards/devices.png";

/* ============ SERVICE DATA ============ */
const servicesData = {
  "blood-test": {
    title: "Blood & Pathology",
    desc: "HbA1c, Fasting, Lipid & Renal",
    image: bloodTestImg,
    color: "#9cf2e8",
    colorDark: "#005c55",
    items: [
      {
        id: 1,
        name: "HbA1c (Glycated Hemoglobin)",
        detail: "3-month average blood sugar",
        mrp: 500,
        price: 350,
      },
      {
        id: 2,
        name: "Fasting Blood Sugar (FBS)",
        detail: "8–12 hrs fasting required",
        mrp: 150,
        price: 100,
      },
      {
        id: 3,
        name: "Post Prandial (PPBS)",
        detail: "2 hrs after meal",
        mrp: 180,
        price: 120,
      },
      {
        id: 4,
        name: "Lipid Profile",
        detail: "Cholesterol, HDL, LDL, TG",
        mrp: 700,
        price: 500,
      },
      {
        id: 5,
        name: "Kidney Function Test (KFT)",
        detail: "Urea, Creatinine, Uric acid",
        mrp: 900,
        price: 650,
      },
      {
        id: 6,
        name: "Liver Function Test (LFT)",
        detail: "SGPT, SGOT, Bilirubin",
        mrp: 950,
        price: 700,
      },
      {
        id: 7,
        name: "Complete Blood Count (CBC)",
        detail: "RBC, WBC, Platelets, Hb",
        mrp: 400,
        price: 300,
      },
      {
        id: 8,
        name: "Thyroid Profile (T3, T4, TSH)",
        detail: "Thyroid hormone levels",
        mrp: 750,
        price: 550,
      },
    ],
  },
  ecg: {
    title: "ECG Testing",
    desc: "12–Lead Clinical ECG",
    image: ecgImg,
    color: "#dce1ff",
    colorDark: "#4059aa",
    items: [
      {
        id: 1,
        name: "12-Lead ECG",
        detail: "Heart rhythm & electrical activity",
        mrp: 550,
        price: 400,
      },
      {
        id: 2,
        name: "2D Echocardiography",
        detail: "Heart structure & valves",
        mrp: 2000,
        price: 1500,
      },
      {
        id: 3,
        name: "TMT (Treadmill Test)",
        detail: "Stress test for heart",
        mrp: 2500,
        price: 2000,
      },
      {
        id: 4,
        name: "Holter Monitoring (24 hr)",
        detail: "24-hour ECG monitoring",
        mrp: 4500,
        price: 3500,
      },
    ],
  },
  xray: {
    title: "USG / X-Ray / CT",
    desc: "Radiology partner slots",
    image: xrayImg,
    color: "#ffd8e7",
    colorDark: "#932265",
    items: [
      {
        id: 1,
        name: "Chest X-Ray (PA view)",
        detail: "Lungs & heart shadow",
        mrp: 400,
        price: 300,
      },
      {
        id: 2,
        name: "Abdominal Ultrasound",
        detail: "Liver, kidney, gall bladder",
        mrp: 1100,
        price: 800,
      },
      {
        id: 3,
        name: "Whole Abdomen USG",
        detail: "Complete abdomen scan",
        mrp: 1600,
        price: 1200,
      },
      {
        id: 4,
        name: "CT Scan (Brain)",
        detail: "Brain structure & lesions",
        mrp: 4500,
        price: 3500,
      },
      {
        id: 5,
        name: "CT Scan (Chest)",
        detail: "Lung & chest detailed scan",
        mrp: 5200,
        price: 4000,
      },
    ],
  },
  supplements: {
    title: "Supplements",
    desc: "Vitamins & metabolic aids",
    image: supplementsImg,
    color: "#E0F7FA",
    colorDark: "#0097A7",
    items: [
      {
        id: 1,
        name: "Vitamin D3 (60k IU)",
        detail: "Weekly - bone health",
        mrp: 350,
        price: 250,
      },
      {
        id: 2,
        name: "Vitamin B12 Complex",
        detail: "Nerve & energy support",
        mrp: 600,
        price: 450,
      },
      {
        id: 3,
        name: "Omega-3 Fish Oil",
        detail: "Heart & brain health",
        mrp: 850,
        price: 650,
      },
      {
        id: 4,
        name: "Multivitamin Tablets",
        detail: "Daily essential nutrients",
        mrp: 550,
        price: 400,
      },
      {
        id: 5,
        name: "Calcium + Magnesium",
        detail: "Bone & muscle support",
        mrp: 480,
        price: 350,
      },
      {
        id: 6,
        name: "Iron + Folic Acid",
        detail: "Anemia prevention",
        mrp: 380,
        price: 280,
      },
    ],
  },
  devices: {
    title: "Medical Devices",
    desc: "CGM, strips & BP meters",
    image: devicesImg,
    color: "#E8EAF6",
    colorDark: "#5C6BC0",
    items: [
      {
        id: 1,
        name: "Glucometer + 25 Strips",
        detail: "Home blood sugar testing",
        mrp: 1800,
        price: 1200,
      },
      {
        id: 2,
        name: "CGM Sensor (14 days)",
        detail: "Continuous glucose monitor",
        mrp: 5500,
        price: 4500,
      },
      {
        id: 3,
        name: "BP Monitor (Digital)",
        detail: "Home BP monitoring",
        mrp: 2500,
        price: 1800,
      },
      {
        id: 4,
        name: "Pulse Oximeter",
        detail: "SpO2 & pulse check",
        mrp: 1300,
        price: 900,
      },
      {
        id: 5,
        name: "Thermometer (Digital)",
        detail: "Body temperature",
        mrp: 400,
        price: 250,
      },
      {
        id: 6,
        name: "Weighing Scale (Digital)",
        detail: "Body weight tracking",
        mrp: 1900,
        price: 1300,
      },
    ],
  },
};

export default function DiagnosticDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData[slug];

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">
            Service not found
          </p>
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

  const allItems = service.items;

  const handleBookClick = () => setShowConfirm(true);
  const handleConfirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#faf8ff] flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              {service.title}
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
        <main className="flex-1 pb-32">
          {/* Hero card */}
          <div className="px-4 pt-4">
            <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5 flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ backgroundColor: service.color }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-[16px] font-bold text-gray-900 leading-tight">
                  {service.title}
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">{service.desc}</p>
              </div>
            </div>
          </div>

          {/* Rate List — read only */}
          <div className="px-4 mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-gray-900">
                Available Tests / Items
              </h3>
              <span className="text-[10px] font-semibold text-[#005c55] bg-[#9cf2e8]/50 px-2 py-0.5 rounded-full">
                {allItems.length} items
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#eaedff] overflow-hidden">
              {allItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2.5 p-3 ${i !== allItems.length - 1 ? "border-b border-[#f0f2f8]" : ""}`}
                >
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#f4f6fb] flex-shrink-0">
                    <img
                      src={bmiImg}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* UPDATED: Font size increased from 12px to 14.5px */}
                    <h4 className="text-[14.5px] font-bold text-gray-900 leading-tight truncate">
                      {item.name}
                    </h4>
                    {item.detail && (
                      // UPDATED: Font size increased from 9px to 12px
                      <p className="text-[12px] text-gray-500 leading-tight mt-1 truncate">
                        {item.detail}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] text-gray-400 line-through leading-none">
                      ₹{item.mrp}
                    </p>
                    <p className="text-[15px] font-bold text-[#005c55] leading-none mt-0.5">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badge */}
          <div className="px-4 mt-4">
            <div className="bg-white rounded-2xl border border-[#eaedff] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E0F2F1] flex items-center justify-center text-[#005c55] flex-shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-900">
                  Certified & Trusted
                </p>
                <p className="text-[10px] text-gray-500 leading-snug mt-0.5">
                  All tests are NABL & ISO certified. Reports delivered
                  digitally.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* ===== BOOK BAR ===== */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] px-4 py-3">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleBookClick}
              className="w-full bg-[#0d6b63] hover:bg-[#0a564f] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-[#005c55]/25 flex items-center justify-center gap-2 text-[14px]"
            >
              Request to Book <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ===== SIMPLE CONFIRM MODAL ===== */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
            ></div>

            <div
              className="relative bg-white rounded-3xl p-6 max-w-sm w-full text-center"
              style={{ animation: "popIn 0.25s ease" }}
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95"
              >
                <X size={16} />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#9cf2e8] flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={30} className="text-[#005c55]" />
              </div>

              <p className="text-[15px] font-bold text-gray-900 px-2 leading-snug">
                Are you sure, you want to proceed with the booking request for{" "}
                <span className="text-[#005c55]">{service.title}</span>?
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl active:scale-[0.98] transition text-[14px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-[#0d6b63] hover:bg-[#0a564f] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition shadow-md shadow-[#005c55]/25 text-[14px]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== SUCCESS MODAL ===== */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            ></div>

            <div
              className="relative bg-white rounded-3xl p-6 max-w-sm w-full text-center"
              style={{ animation: "popIn 0.3s ease" }}
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95"
              >
                <X size={16} />
              </button>
              <div className="w-20 h-20 rounded-full bg-[#9cf2e8] flex items-center justify-center mx-auto mb-4">
                <div className="w-14 h-14 rounded-full bg-[#005c55] flex items-center justify-center">
                  <Check size={30} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <h3 className="text-[20px] font-bold text-gray-900">
                Booking Confirmed!
              </h3>
              <p className="text-[13px] text-gray-500 mt-2">
                Your booking request has been placed successfully.
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/home");
                }}
                className="w-full mt-6 bg-[#005c55] hover:bg-[#0a564f] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
