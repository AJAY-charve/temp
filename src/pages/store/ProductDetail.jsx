import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Store as StoreIcon,
  ChevronRight,
} from "lucide-react";

// LOGO IMPORT
import logo from "../../assets/daibmetalogo.jpeg";

// DATA & CART IMPORTS
import { PRODUCTS, getCart, saveCart, getCartCount } from "./StoreData";

const NAVY = "#14284b";
const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);

  const [tab, setTab] = useState("details");
  const [qty, setQty] = useState(1);
  const [showAddedPopup, setShowAddedPopup] = useState(false);

  // GLOBAL CART STATE
  const [cart, setCart] = useState({});
  useEffect(() => {
    setCart(getCart());
  }, []);

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

  const cartCount = getCartCount();

  const handleAddToCart = () => {
    const newCart = { ...cart };
    newCart[product.id] = (newCart[product.id] || 0) + qty;
    setCart(newCart);
    saveCart(newCart);
    setShowAddedPopup(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-extrabold text-gray-900 text-[15px] truncate max-w-[180px]">
              {product.name}
            </h1>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate("/store/cart")}
                className="relative w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#005c55] active:scale-95 mr-1 transition"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-[14px] h-3.5 px-1 bg-[#005c55] text-white text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <img
                src={logo}
                alt="DiabMeta"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 pb-32">
          {/* ============ BIG IMAGE ============ */}
          <div
            className="w-full h-[260px] flex items-center justify-center relative transition-colors duration-300 overflow-hidden"
            style={{ backgroundColor: product.color }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-4 pt-4">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">
              {product.brand}
            </p>
            <h2
              className="text-[18px] font-extrabold leading-tight mt-1"
              style={{ color: NAVY }}
            >
              {product.name}
            </h2>
            <p className="text-[11px] font-medium text-gray-500 mt-1">
              {product.unit}
            </p>

            <div className="flex items-end gap-2 mt-3">
              <p className="text-[24px] font-black text-[#005c55] leading-none">
                {formatPrice(product.price)}
              </p>
              <p className="text-[13px] font-medium text-gray-400 line-through leading-none mb-1">
                {formatPrice(product.mrp)}
              </p>
            </div>
          </div>

          {/* SELLER INFO BANNER */}
          <div className="px-4 mt-5">
            <div
              onClick={() => navigate("/store/seller")}
              className="bg-white rounded-2xl border border-[#eaedff] p-3.5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] flex items-center justify-center flex-shrink-0">
                  <StoreIcon size={20} className="text-[#005c55]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold text-gray-900">
                    Seller Information
                  </h3>
                  <p className="text-[10.5px] text-gray-500 font-medium mt-0.5">
                    DiabMeta Clinic • Verified
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>

          {/* TABS */}
          <div className="px-4 mt-6">
            <div className="flex bg-[#f0f2f8] rounded-xl p-1">
              <button
                onClick={() => setTab("details")}
                className={`flex-1 text-[12px] font-bold py-2.5 rounded-lg transition ${
                  tab === "details"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setTab("specs")}
                className={`flex-1 text-[12px] font-bold py-2.5 rounded-lg transition ${
                  tab === "specs"
                    ? "bg-white text-[#005c55] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Specification
              </button>
            </div>
          </div>

          <div className="px-4 mt-4">
            {tab === "details" ? (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-4 shadow-sm">
                <h3
                  className="text-[13.5px] font-extrabold mb-2"
                  style={{ color: NAVY }}
                >
                  About this product
                </h3>
                <p className="text-[12px] text-gray-600 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-4 shadow-sm">
                <h3
                  className="text-[13.5px] font-extrabold mb-3"
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
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <span className="text-[11.5px] text-gray-500 font-medium flex-shrink-0">
                        {s.label}
                      </span>
                      <span className="text-[12px] font-bold text-gray-900 text-right">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* BOTTOM ACTION BAR */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
          <div className="max-w-md mx-auto px-4 py-3.5 flex items-center gap-3">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-1.5 py-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#005c55] active:scale-90 transition-transform"
              >
                <Minus size={14} />
              </button>
              <span className="text-[14px] font-black text-gray-900 px-2 min-w-[24px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#005c55] active:scale-90 transition-transform"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#0d6b63] text-white font-extrabold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(13,107,99,0.25)] flex items-center justify-center gap-2 hover:bg-[#0a5750]"
            >
              <ShoppingCart size={16} />
              Add to Cart · {formatPrice(product.price * qty)}
            </button>
          </div>
        </div>

        {/* ADDED TO CART POPUP MODAL */}
        {showAddedPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={() => setShowAddedPopup(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop p-6 pb-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#e4f4e8] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2
                  size={32}
                  className="text-[#2e9e48]"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="text-[18px] font-black text-gray-900">
                Added to Cart!
              </h3>
              <p className="text-[12px] text-gray-500 mt-1 mb-5 font-medium">
                {qty} × {product.name} has been added.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowAddedPopup(false);
                    navigate("/store/cart");
                  }}
                  className="w-full bg-[#0d6b63] text-white font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 hover:bg-[#0a5750]"
                >
                  <ShoppingCart size={16} /> View Cart
                </button>
                <button
                  onClick={() => setShowAddedPopup(false)}
                  className="w-full bg-white border-2 border-gray-100 text-gray-600 font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-gray-50"
                >
                  Continue Shopping
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
