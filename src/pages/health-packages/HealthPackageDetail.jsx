import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ArrowRight,
  ShieldCheck,
  X,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// LOGO IMPORT
import logo from "../../assets/daibmetalogo.jpeg";

// Real images
import bmiImg from "../../assets/cards/bmi.jpeg";

/* ============ HEALTH PACKAGES DATA ============ */
const packagesData = {
  "full-body": {
    title: "Full Body Checkup",
    desc: "Comprehensive 60+ tests",
    image: bmiImg,
    color: "#E0F2F1",
    colorDark: "#005c55",
    totalMrp: 5500,
    totalPrice: 2999,
    items: [
      {
        id: 1,
        name: "Complete Blood Count (CBC)",
        detail: "RBC, WBC, Platelets, Hb",
        mrp: 400,
        price: 300,
        category: "Blood Tests",
      },
      {
        id: 2,
        name: "Fasting Blood Sugar (FBS)",
        detail: "8–12 hrs fasting required",
        mrp: 150,
        price: 100,
        category: "Blood Tests",
      },
      {
        id: 3,
        name: "Lipid Profile",
        detail: "Cholesterol, HDL, LDL, TG",
        mrp: 700,
        price: 500,
        category: "Blood Tests",
      },
      {
        id: 4,
        name: "Liver Function Test (LFT)",
        detail: "SGPT, SGOT, Bilirubin",
        mrp: 950,
        price: 700,
        category: "Organ Function",
      },
      {
        id: 5,
        name: "Kidney Function Test (KFT)",
        detail: "Urea, Creatinine, Uric acid",
        mrp: 900,
        price: 650,
        category: "Organ Function",
      },
      {
        id: 6,
        name: "Thyroid Profile (T3, T4, TSH)",
        detail: "Thyroid hormone levels",
        mrp: 750,
        price: 550,
        category: "Hormones",
      },
      {
        id: 7,
        name: "Urine Routine",
        detail: "Infection & kidney health",
        mrp: 200,
        price: 150,
        category: "General Health",
      },
      {
        id: 8,
        name: "Vitamin D3 & B12",
        detail: "Bone & nerve health",
        mrp: 1450,
        price: 999,
        category: "Vitamins",
      },
    ],
  },
  diabetes: {
    title: "Diabetes Care",
    desc: "HbA1c, Sugar, Lipid",
    image: bmiImg,
    color: "#fde3e3",
    colorDark: "#ef5350",
    totalMrp: 2800,
    totalPrice: 1499,
    items: [
      {
        id: 1,
        name: "HbA1c (Glycated Hemoglobin)",
        detail: "3-month average blood sugar",
        mrp: 500,
        price: 350,
        category: "Diabetes Profile",
      },
      {
        id: 2,
        name: "Fasting Blood Sugar (FBS)",
        detail: "8–12 hrs fasting required",
        mrp: 150,
        price: 100,
        category: "Diabetes Profile",
      },
      {
        id: 3,
        name: "Post Prandial (PPBS)",
        detail: "2 hrs after meal",
        mrp: 180,
        price: 120,
        category: "Diabetes Profile",
      },
      {
        id: 4,
        name: "Lipid Profile",
        detail: "Cholesterol, HDL, LDL, TG",
        mrp: 700,
        price: 500,
        category: "Heart & Lipid",
      },
      {
        id: 5,
        name: "Kidney Function Test (KFT)",
        detail: "Urea, Creatinine, Uric acid",
        mrp: 900,
        price: 650,
        category: "Organ Function",
      },
      {
        id: 6,
        name: "Urine Microalbumin",
        detail: "Early kidney damage marker",
        mrp: 370,
        price: 250,
        category: "Organ Function",
      },
    ],
  },
};

export default function HealthPackageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pkg = packagesData[slug];

  const [openCategory, setOpenCategory] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">
            Package not found
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-[13px] font-semibold text-[#005c55] underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Group items by category for the dropdowns
  const groupedItems = pkg.items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

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
              Health Package
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-32 overflow-y-auto">
          {/* Hero card (Same as DiagnosticDetail) */}
          <div className="px-4 pt-4">
            <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5 flex flex-col">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: pkg.color }}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[16px] font-bold text-gray-900 leading-tight">
                    {pkg.title}
                  </h2>
                  <p className="text-[11px] text-gray-500 mt-1">{pkg.desc}</p>
                </div>
              </div>

              {/* Price Section inside Hero */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Total Package Price
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[18px] font-black text-[#005c55]">
                      ₹{pkg.totalPrice}
                    </span>
                    <span className="text-[12px] text-gray-400 line-through">
                      ₹{pkg.totalMrp}
                    </span>
                  </div>
                </div>
                <div className="bg-[#e4f4e8] text-[#2e9e48] px-2.5 py-1 rounded-lg text-[11px] font-bold">
                  {Math.round(
                    ((pkg.totalMrp - pkg.totalPrice) / pkg.totalMrp) * 100,
                  )}
                  % OFF
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Accordion List */}
          <div className="px-4 mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-gray-900">
                Package Includes
              </h3>
              <span className="text-[10px] font-semibold text-[#005c55] bg-[#9cf2e8]/50 px-2 py-0.5 rounded-full">
                {pkg.items.length} tests
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {Object.entries(groupedItems).map(([category, items], index) => {
                const isOpen = openCategory === category;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden transition-all duration-300"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${pkg.color}40`,
                            color: pkg.colorDark,
                          }}
                        >
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-extrabold text-[#14284b]">
                          {category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                          {items.length} tests
                        </span>
                        {isOpen ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className="border-t border-[#f0f2f8] bg-[#fafbff]">
                        {items.map((item, i) => (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-3.5 pl-4 ${i !== items.length - 1 ? "border-b border-[#f0f2f8]" : ""}`}
                          >
                            <div className="flex-1 min-w-0 pr-3">
                              <h4 className="text-[12px] font-bold text-gray-900 leading-tight">
                                {item.name}
                              </h4>
                              {item.detail && (
                                <p className="text-[10px] text-gray-500 leading-tight mt-1 truncate">
                                  {item.detail}
                                </p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-[10px] text-gray-400 line-through leading-none">
                                ₹{item.mrp}
                              </p>
                              <p className="text-[12.5px] font-bold text-[#005c55] leading-none mt-0.5">
                                ₹{item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
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
              Book Full Package <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ===== CONFIRM MODAL ===== */}
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
                Our team will contact you shortly to confirm the details.
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
