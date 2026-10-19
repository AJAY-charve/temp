import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  X,
  Camera,
  Package,
  Heart,
} from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";

/* 
  Mock images: abhi URLs nahi hain, isliye har product ke liye 
  4 mock "views" hain (icons + thoda different shade)
  Real images aane pe yaha URLs daal dena: ["/img/1.jpg", "/img/2.jpg", ...]
*/
const buildImages = (product) => [
  { id: "img1", type: "main", color: product.color, Icon: ShoppingBag },
  { id: "img2", type: "side", color: product.color, Icon: Package },
  { id: "img3", type: "angle", color: product.color, Icon: Camera },
  { id: "img4", type: "detail", color: product.color, Icon: Heart },
];

const PRODUCTS = [
  {
    id: "s1",
    name: "Vitamin D3 60K",
    category: "supplements",
    brand: "HealthVita",
    price: 320,
    mrp: 450,
    unit: "4 Capsules",
    color: "#e4f4e8",
    description:
      "High-potency Vitamin D3 supplement to support bone health, immunity and muscle function. Ideal for adults with Vitamin D deficiency.",
    specs: [
      { label: "Form", value: "Capsule" },
      { label: "Strength", value: "60,000 IU" },
      { label: "Pack Size", value: "4 Capsules" },
      { label: "Shelf Life", value: "24 months" },
      { label: "Prescription", value: "Not required" },
      { label: "Storage", value: "Cool, dry place" },
    ],
  },
  {
    id: "s2",
    name: "Omega-3 Fish Oil",
    category: "supplements",
    brand: "NutriLife",
    price: 540,
    mrp: 720,
    unit: "60 Softgels",
    color: "#e0eefc",
    description:
      "Molecularly distilled Omega-3 with EPA & DHA to support heart health, joint comfort and cognitive function.",
    specs: [
      { label: "Form", value: "Softgel" },
      { label: "EPA", value: "180 mg" },
      { label: "DHA", value: "120 mg" },
      { label: "Pack Size", value: "60 Softgels" },
      { label: "Shelf Life", value: "18 months" },
      { label: "Storage", value: "Cool, dry place" },
    ],
  },
  {
    id: "s3",
    name: "Multivitamin Daily",
    category: "supplements",
    brand: "HealthVita",
    price: 410,
    mrp: 550,
    unit: "30 Tablets",
    color: "#fdf1d3",
    description:
      "Complete daily multivitamin with 23 essential vitamins and minerals for everyday wellness and energy support.",
    specs: [
      { label: "Form", value: "Tablet" },
      { label: "Vitamins", value: "13 essential" },
      { label: "Minerals", value: "10 essential" },
      { label: "Pack Size", value: "30 Tablets" },
      { label: "Shelf Life", value: "24 months" },
      { label: "Storage", value: "Cool, dry place" },
    ],
  },
  {
    id: "s4",
    name: "Metabolic Support",
    category: "supplements",
    brand: "DiabCare",
    price: 680,
    mrp: 850,
    unit: "60 Capsules",
    color: "#fde3e3",
    description:
      "Clinically formulated blend of herbs and minerals to support metabolic health, insulin sensitivity and energy levels.",
    specs: [
      { label: "Form", value: "Capsule" },
      { label: "Key Herbs", value: "Berberine, Fenugreek" },
      { label: "Pack Size", value: "60 Capsules" },
      { label: "Shelf Life", value: "18 months" },
      { label: "Prescription", value: "Not required" },
      { label: "Storage", value: "Cool, dry place" },
    ],
  },
  {
    id: "s5",
    name: "Calcium + D3",
    category: "supplements",
    brand: "NutriLife",
    price: 290,
    mrp: 380,
    unit: "30 Tablets",
    color: "#EDE7F6",
    description:
      "Combination of Calcium and Vitamin D3 for strong bones, teeth and improved calcium absorption.",
    specs: [
      { label: "Form", value: "Tablet" },
      { label: "Calcium", value: "500 mg" },
      { label: "Vitamin D3", value: "250 IU" },
      { label: "Pack Size", value: "30 Tablets" },
      { label: "Shelf Life", value: "24 months" },
      { label: "Storage", value: "Cool, dry place" },
    ],
  },
  {
    id: "d1",
    name: "Glucometer Kit",
    category: "devices",
    brand: "AccuCheck",
    price: 899,
    mrp: 1299,
    unit: "1 Kit + 25 Strips",
    color: "#e0eefc",
    description:
      "Accurate blood glucose monitoring kit with 25 test strips, lancets and lancing device. Ideal for home sugar tracking.",
    specs: [
      { label: "Type", value: "Blood Glucose Meter" },
      { label: "Strips Included", value: "25" },
      { label: "Sample Size", value: "0.6 µL" },
      { label: "Result Time", value: "5 seconds" },
      { label: "Memory", value: "500 readings" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    id: "d2",
    name: "CGM Sensor (14 days)",
    category: "devices",
    brand: "LibrePro",
    price: 3499,
    mrp: 4200,
    unit: "1 Sensor",
    color: "#e4f4e8",
    description:
      "Continuous Glucose Monitoring sensor that tracks sugar levels 24x7 for 14 days. Water-resistant and smartphone-friendly.",
    specs: [
      { label: "Type", value: "CGM Sensor" },
      { label: "Duration", value: "14 days" },
      { label: "Water Resistance", value: "IP67" },
      { label: "Reading Interval", value: "1 minute" },
      { label: "App Support", value: "iOS & Android" },
      { label: "Warranty", value: "NA" },
    ],
  },
  {
    id: "d3",
    name: "BP Monitor Digital",
    category: "devices",
    brand: "OmronPro",
    price: 1899,
    mrp: 2500,
    unit: "1 Device",
    color: "#fdf1d3",
    description:
      "Clinically validated digital BP monitor with irregular heartbeat detection and large backlit display.",
    specs: [
      { label: "Type", value: "Upper Arm BP Monitor" },
      { label: "Cuff Size", value: "22–42 cm" },
      { label: "Memory", value: "2 users × 60 readings" },
      { label: "Power", value: "Battery + Adapter" },
      { label: "Display", value: "LCD backlit" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    id: "d4",
    name: "Test Strips (50)",
    category: "devices",
    brand: "AccuCheck",
    price: 750,
    mrp: 950,
    unit: "50 Strips",
    color: "#fde3e3",
    description:
      "Genuine AccuCheck test strips for accurate and reliable blood glucose readings. Compatible with Active/Instant meters.",
    specs: [
      { label: "Type", value: "Test Strips" },
      { label: "Pack Size", value: "50 Strips" },
      { label: "Sample Size", value: "0.6 µL" },
      { label: "Compatibility", value: "AccuCheck Active" },
      { label: "Shelf Life", value: "18 months" },
      { label: "Storage", value: "Cool, dry place" },
    ],
  },
  {
    id: "d5",
    name: "Digital Thermometer",
    category: "devices",
    brand: "MediSafe",
    price: 240,
    mrp: 350,
    unit: "1 Unit",
    color: "#EDE7F6",
    description:
      "Fast-read digital thermometer with flexible tip, beep alert and auto shut-off. Suitable for all ages.",
    specs: [
      { label: "Type", value: "Digital Thermometer" },
      { label: "Reading Time", value: "10 seconds" },
      { label: "Tip", value: "Flexible" },
      { label: "Display", value: "LCD" },
      { label: "Power", value: "Battery" },
      { label: "Warranty", value: "1 year" },
    ],
  },
];

const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);

  const [tab, setTab] = useState("details");
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0); // index of selected image
  const [showBookConfirm, setShowBookConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">
            Product not found
          </p>
          <button
            onClick={() => navigate("/store")}
            className="mt-3 text-[13px] font-semibold text-[#005c55] underline"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const images = buildImages(product);
  const currentImage = images[activeImage];

  const handleConfirmBooking = () => {
    setShowBookConfirm(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px] truncate max-w-[180px]">
              {product.name}
            </h1>
            {/* TOP RIGHT LOGO */}
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 pb-32">
          {/* ============ BIG IMAGE ============ */}
          <div
            className="w-full h-[240px] flex items-center justify-center relative transition-colors duration-300"
            style={{ backgroundColor: currentImage.color }}
          >
            <currentImage.Icon
              size={80}
              className="text-white/70"
              strokeWidth={1.4}
            />
          </div>

          {/* ============ THUMBNAILS ============ */}
          <div className="px-4 mt-3 flex items-center gap-2">
            {images.map((img, i) => {
              const Icon = img.Icon;
              const isActive = i === activeImage;
              return (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-1 aspect-square rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "ring-2 ring-[#005c55] ring-offset-1"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: img.color }}
                >
                  <Icon size={22} className="text-white/80" strokeWidth={1.8} />
                </button>
              );
            })}
          </div>

          <div className="px-4 pt-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              {product.brand}
            </p>
            <h2
              className="text-[18px] font-extrabold leading-tight mt-1"
              style={{ color: NAVY }}
            >
              {product.name}
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">{product.unit}</p>

            <div className="flex items-end gap-2 mt-3">
              <p className="text-[24px] font-extrabold text-[#005c55] leading-none">
                {formatPrice(product.price)}
              </p>
              <p className="text-[13px] text-gray-400 line-through leading-none mb-1">
                {formatPrice(product.mrp)}
              </p>
            </div>
          </div>

          <div className="px-4 mt-5">
            <div className="flex bg-[#f0f2f8] rounded-xl p-1">
              <button
                onClick={() => setTab("details")}
                className={`flex-1 text-[12px] font-bold py-2 rounded-lg transition ${
                  tab === "details"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setTab("specs")}
                className={`flex-1 text-[12px] font-bold py-2 rounded-lg transition ${
                  tab === "specs"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Specification
              </button>
            </div>
          </div>

          <div className="px-4 mt-3">
            {tab === "details" ? (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-4">
                <h3
                  className="text-[13px] font-extrabold mb-2"
                  style={{ color: NAVY }}
                >
                  About this product
                </h3>
                <p className="text-[11.5px] text-[#3b4a66] leading-relaxed">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-4">
                <h3
                  className="text-[13px] font-extrabold mb-3"
                  style={{ color: NAVY }}
                >
                  Specifications
                </h3>
                <div className="flex flex-col">
                  {product.specs.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-start justify-between gap-3 py-2.5 ${
                        i < product.specs.length - 1
                          ? "border-b border-[#eef1f8]"
                          : ""
                      }`}
                    >
                      <span className="text-[11px] text-gray-500 font-medium flex-shrink-0">
                        {s.label}
                      </span>
                      <span className="text-[11.5px] font-bold text-gray-900 text-right">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-2.5">
            <div className="flex items-center bg-[#f0f2f8] rounded-xl px-1.5 py-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#005c55] active:scale-90"
              >
                <Minus size={13} />
              </button>
              <span className="text-[13px] font-extrabold text-[#005c55] px-2 min-w-[20px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#005c55] active:scale-90"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              onClick={() => setShowBookConfirm(true)}
              className="flex-1 bg-[#0d6b63] text-white font-bold text-[12.5px] py-3 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={15} />
              Book Now · {formatPrice(product.price * qty)}
            </button>
          </div>
        </div>

        {showBookConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowBookConfirm(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop">
              <div className="flex items-center justify-between px-4 pt-3.5">
                <h3
                  className="text-[15px] font-extrabold"
                  style={{ color: NAVY }}
                >
                  Confirm Booking
                </h3>
                <button
                  onClick={() => setShowBookConfirm(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="px-4 pt-3 pb-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-[#eaedff] bg-[#fafbff]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-none"
                    style={{ backgroundColor: product.color }}
                  >
                    <ShoppingBag
                      size={20}
                      className="text-white/80"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-gray-900 truncate leading-tight">
                      {product.name}
                    </p>
                    <p className="text-[9.5px] text-gray-500 mt-0.5">
                      {product.brand} · {product.unit}
                    </p>
                  </div>
                  <div className="text-right flex-none">
                    <p className="text-[13px] font-extrabold text-[#005c55] leading-none">
                      {formatPrice(product.price * qty)}
                    </p>
                    <p className="text-[9px] text-gray-500 mt-0.5">Qty {qty}</p>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={() => setShowBookConfirm(false)}
                  className="flex-1 bg-white border-2 border-[#eaedff] text-gray-700 font-bold text-[12px] py-3 rounded-xl active:scale-[0.98] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-[#0d6b63] text-white font-bold text-[12px] py-3 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Check size={14} /> Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSuccess(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop text-center">
              <div className="bg-[#E0F2F1] pt-7 pb-6 px-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                  <Check
                    size={36}
                    className="text-[#0d6b63]"
                    strokeWidth={2.6}
                  />
                </div>
                <h3
                  className="text-[17px] font-extrabold"
                  style={{ color: NAVY }}
                >
                  Booking Confirmed!
                </h3>
                <p className="text-[11.5px] text-gray-600 mt-1.5 leading-snug max-w-[240px]">
                  Your booking has been placed. Pick it up from the clinic.
                </p>
              </div>
              <div className="px-4 pb-4 pt-4">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    navigate("/store");
                  }}
                  className="w-full bg-[#0d6b63] text-white font-bold text-[12px] py-3 rounded-xl active:scale-[0.98] transition shadow-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
          .animate-pop { animation: popIn 0.22s ease-out; }
        `}</style>
      </div>
    </div>
  );
}
