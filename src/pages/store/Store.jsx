import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  X,
  Check,
  CheckCircle2,
  Layers,
  Pill,
  Stethoscope,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  History,
} from "lucide-react";

// LOGO IMPORT (Path Updated)
import logo from "../../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";

const HISTORY_KEY = "diabmeta_bookings";

export const saveBooking = (booking) => {
  try {
    const prev = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    localStorage.setItem(HISTORY_KEY, JSON.stringify([booking, ...prev]));
  } catch (e) {
    console.warn("Booking save failed", e);
  }
};

export const getBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
};

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

const FILTERS = [
  { key: "all", label: "All", icon: Layers },
  { key: "supplements", label: "Supplements", icon: Pill },
  { key: "devices", label: "Devices", icon: Stethoscope },
];

const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function Store() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = FILTERS.some((f) => f.key === searchParams.get("type"))
    ? searchParams.get("type")
    : "all";

  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  const changeFilter = (key) => {
    setFilter(key);
    if (key === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ type: key });
    }
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchFilter = filter === "all" || p.category === filter;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const countFor = (key) =>
    key === "all"
      ? PRODUCTS.length
      : PRODUCTS.filter((p) => p.category === key).length;

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const decreaseQty = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const removeFromCart = (id) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }))
    .filter((p) => p.id);
  const cartTotal = cartItems.reduce((t, p) => t + p.price * p.qty, 0);

  const handleBookAll = () => {
    const items = cartItems;
    const booking = {
      id: `#DBM${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      total: cartTotal,
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Confirmed",
    };
    saveBooking(booking);
    setCart({});
    setShowCart(false);
    setSuccessBooking(booking);
  };

  const openProduct = (product) => {
    navigate(`/store/product/${product.id}`);
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
            <h1 className="font-bold text-gray-900 text-[15px]">Store</h1>

            {/* RIGHT SIDE - HISTORY, CART & LOGO */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate("/store/history")}
                className="w-8 h-8 flex items-center justify-center text-gray-700 active:scale-95"
                title="Booking History"
              >
                <History size={18} />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative w-8 h-8 flex items-center justify-center text-gray-700 active:scale-95 mr-1"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-[14px] h-3.5 px-1 bg-[#005c55] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* LOGO */}
              <img
                src={logo}
                alt="DiabMeta"
                className="h-9 w-auto object-contain"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 pb-24 px-4 pt-4">
          <div className="flex items-center gap-2 px-3 py-2.5 mb-3 rounded-xl border border-[#eaedff] bg-white">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or brands..."
              className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              const Icon = f.icon;
              return (
                <button
                  key={f.key}
                  onClick={() => changeFilter(f.key)}
                  className={`group relative flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-2xl text-[11.5px] font-bold transition-all duration-200 ${
                    active
                      ? "text-white shadow-[0_6px_16px_rgba(13,107,99,0.28)] scale-[1.02]"
                      : "text-gray-600 bg-white border border-[#eaedff] active:scale-95"
                  }`}
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg,#0d6b63 0%,#149386 100%)",
                        }
                      : undefined
                  }
                >
                  <Icon
                    size={13}
                    strokeWidth={2.4}
                    className={active ? "text-white" : "text-[#005c55]"}
                  />
                  <span className="whitespace-nowrap">{f.label}</span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none ${
                      active
                        ? "bg-white/25 text-white"
                        : "bg-[#f0f2f8] text-gray-500"
                    }`}
                  >
                    {countFor(f.key)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wide">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
            {search && (
              <p className="text-[10px] text-gray-500">for "{search}"</p>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-[#eef1f8] flex items-center justify-center mb-3">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <p className="text-[13px] font-bold text-gray-800">
                No products found
              </p>
              <p className="text-[11px] text-gray-500 mt-1 max-w-[220px] leading-snug">
                Try changing search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  qty={cart[p.id] || 0}
                  onAdd={() => addToCart(p.id)}
                  onDecrease={() => decreaseQty(p.id)}
                  onOpen={() => openProduct(p)}
                />
              ))}
            </div>
          )}
        </main>

        {cartCount > 0 && !showCart && (
          <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center px-4 pb-4">
            <div className="w-full max-w-md bg-[#0d6b63] text-white rounded-2xl shadow-2xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-white/80 leading-none">
                  {cartCount} item{cartCount > 1 ? "s" : ""} in cart
                </p>
                <p className="text-[16px] font-extrabold mt-1 leading-none">
                  {formatPrice(cartTotal)}
                </p>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="bg-white text-[#0d6b63] font-bold text-[12px] px-4 py-2.5 rounded-xl active:scale-95 transition"
              >
                View Cart
              </button>
            </div>
          </div>
        )}

        {showCart && (
          <CartSheet
            items={cartItems}
            total={cartTotal}
            count={cartCount}
            onClose={() => setShowCart(false)}
            onAdd={addToCart}
            onDecrease={decreaseQty}
            onRemove={removeFromCart}
            onBook={handleBookAll}
          />
        )}

        {successBooking && (
          <SuccessModal
            booking={successBooking}
            onClose={() => setSuccessBooking(null)}
            onDone={() => {
              setSuccessBooking(null);
              navigate("/home");
            }}
          />
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, qty, onAdd, onDecrease, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      <button
        onClick={onOpen}
        className="w-full h-[100px] flex items-center justify-center relative active:opacity-90 transition"
        style={{ backgroundColor: product.color }}
      >
        <ShoppingBag size={32} className="text-white/70" strokeWidth={1.6} />
      </button>

      <div className="p-2.5 flex flex-col flex-1">
        <button onClick={onOpen} className="text-left">
          <p className="text-[8.5px] font-bold text-gray-400 uppercase tracking-wide leading-none">
            {product.brand}
          </p>
          <h3 className="text-[11.5px] font-bold text-gray-900 leading-tight mt-1 line-clamp-2 min-h-[28px]">
            {product.name}
          </h3>
          <p className="text-[9px] text-gray-500 mt-0.5">{product.unit}</p>
        </button>

        <div className="flex items-end gap-1 mt-2 mb-2">
          <p className="text-[13px] font-extrabold text-gray-900 leading-none">
            {formatPrice(product.price)}
          </p>
          <p className="text-[9px] text-gray-400 line-through leading-none">
            {formatPrice(product.mrp)}
          </p>
        </div>

        <div className="mt-auto">
          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="w-full bg-[#005c55]/10 text-[#005c55] font-bold text-[11px] py-2 rounded-lg active:scale-95 transition flex items-center justify-center gap-1"
            >
              <Plus size={12} /> Add
            </button>
          ) : (
            <div className="w-full bg-[#005c55] text-white rounded-lg flex items-center justify-between px-1.5 py-1">
              <button
                onClick={onDecrease}
                className="w-6 h-6 flex items-center justify-center active:scale-90"
              >
                <Minus size={12} />
              </button>
              <span className="text-[12px] font-extrabold">{qty}</span>
              <button
                onClick={onAdd}
                className="w-6 h-6 flex items-center justify-center active:scale-90"
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartSheet({
  items,
  total,
  count,
  onClose,
  onAdd,
  onDecrease,
  onRemove,
  onBook,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl p-4 pb-6 shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3 flex-none" />
        <div className="flex items-center justify-between mb-3 flex-none">
          <h3 className="text-[15px] font-extrabold" style={{ color: NAVY }}>
            Your Cart ({count})
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#eef1f8] flex items-center justify-center mb-3">
              <ShoppingCart size={28} className="text-gray-400" />
            </div>
            <p className="text-[13px] font-bold text-gray-800">
              Your cart is empty
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Add products to see them here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 mb-3">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#eaedff] bg-[#fafbff]"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-none"
                    style={{ backgroundColor: p.color }}
                  >
                    <ShoppingBag
                      size={18}
                      className="text-white/80"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] font-bold text-gray-900 truncate leading-tight">
                      {p.name}
                    </p>
                    <p className="text-[9.5px] text-gray-500 mt-0.5">
                      {p.brand} · {p.unit}
                    </p>
                    <p className="text-[11px] font-extrabold text-[#005c55] mt-1">
                      {formatPrice(p.price * p.qty)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-none">
                    <button
                      onClick={() => onRemove(p.id)}
                      className="text-red-500 active:scale-90"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="flex items-center bg-[#005c55] text-white rounded-lg px-1 py-0.5">
                      <button
                        onClick={() => onDecrease(p.id)}
                        className="w-6 h-6 flex items-center justify-center active:scale-90"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-[11px] font-extrabold px-1 min-w-[14px] text-center">
                        {p.qty}
                      </span>
                      <button
                        onClick={() => onAdd(p.id)}
                        className="w-6 h-6 flex items-center justify-center active:scale-90"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-none border-t border-[#eaedff] pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-semibold text-gray-600">
                  Total
                </span>
                <span className="text-[18px] font-extrabold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                onClick={onBook}
                className="w-full bg-[#0d6b63] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2"
              >
                <Check size={16} /> Book All Items
              </button>
              <p className="text-[9.5px] text-gray-500 text-center mt-2 leading-snug">
                Static demo — booking is not actually placed.
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.28s ease-out; }
      `}</style>
    </div>
  );
}

function SuccessModal({ booking, onClose, onDone }) {
  const itemCount = booking.items.reduce((s, p) => s + p.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop text-center">
        <div className="bg-[#E0F2F1] pt-7 pb-6 px-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
            <CheckCircle2
              size={40}
              className="text-[#0d6b63]"
              strokeWidth={2.2}
            />
          </div>
          <h3 className="text-[17px] font-extrabold" style={{ color: NAVY }}>
            Booking Confirmed!
          </h3>
          <p className="text-[11.5px] text-gray-600 mt-1.5 leading-snug max-w-[240px]">
            Your {itemCount} item{itemCount > 1 ? "s" : ""} have been booked
            successfully. Pick them up from the clinic.
          </p>
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="rounded-2xl border border-[#eaedff] bg-[#fafbff] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                Items
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                Amount
              </span>
            </div>
            <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto">
              {booking.items.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-gray-900 truncate pr-2">
                    {p.name} × {p.qty}
                  </p>
                  <p className="text-[11px] font-bold text-gray-700 flex-none">
                    {formatPrice(p.price * p.qty)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#eaedff] mt-2 pt-2 flex items-center justify-between">
              <span className="text-[11.5px] font-bold text-gray-900">
                Total
              </span>
              <span className="text-[13px] font-extrabold text-[#005c55]">
                {formatPrice(booking.total)}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[10.5px] text-gray-500 font-medium">
              Booking ID
            </span>
            <span className="text-[11px] font-extrabold text-gray-900">
              {booking.id}
            </span>
          </div>
        </div>

        <div className="px-4 pb-4 pt-3">
          <button
            onClick={onDone}
            className="w-full bg-[#0d6b63] text-white font-bold text-[12px] py-3 rounded-xl active:scale-[0.98] transition shadow-lg"
          >
            Done
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        .animate-pop { animation: popIn 0.22s ease-out; }
      `}</style>
    </div>
  );
}
