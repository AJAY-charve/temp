import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  CheckCircle2,
  X,
  AlertCircle,
  Receipt,
  Store as StoreIcon,
  ChevronRight,
} from "lucide-react";

import logo from "../../assets/daibmetalogo.jpeg";
import { PRODUCTS, getCart, saveCart, saveBooking } from "./StoreData";

const NAVY = "#14284b";
const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

// FEES
const PROCESSING_FEE = 20;
const DELIVERY_FEE = 50;
const OTHER_FEES = 10;

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (id) => updateCart({ ...cart, [id]: (cart[id] || 0) + 1 });

  const decreaseQty = (id) => {
    const newCart = { ...cart };
    if (newCart[id] > 1) newCart[id] -= 1;
    else delete newCart[id];
    updateCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = { ...cart };
    delete newCart[id];
    updateCart(newCart);
  };

  const clearCart = () => updateCart({});

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }))
    .filter((p) => p.id);

  const cartCount = cartItems.reduce((s, p) => s + p.qty, 0);
  const itemTotal = cartItems.reduce((t, p) => t + p.price * p.qty, 0);
  const finalDeliveryFee = 0; // Delivery is FREE
  const grandTotal = itemTotal + PROCESSING_FEE + finalDeliveryFee + OTHER_FEES;

  const handleCheckout = () => {
    const booking = {
      id: `#DBM${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      itemTotal,
      processingFee: PROCESSING_FEE,
      deliveryFee: finalDeliveryFee,
      otherFees: OTHER_FEES,
      total: grandTotal,
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
    updateCart({});
    setShowCheckoutModal(false);
    setSuccessBooking(booking);
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
            <h1 className="font-extrabold text-gray-900 text-[16px]">
              Your Cart
            </h1>
            <div className="flex items-center gap-1">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full active:scale-95 transition"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <img
                src={logo}
                alt="DiabMeta"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 pb-36 px-4 pt-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <p className="text-[16px] font-extrabold text-gray-900">
                Your cart is empty
              </p>
              <p className="text-[12px] text-gray-500 mt-1 max-w-[200px] leading-snug font-medium">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => navigate("/store")}
                className="mt-6 bg-[#0d6b63] text-white font-bold text-[13px] px-6 py-3 rounded-xl active:scale-95 transition shadow-lg hover:bg-[#0a5750]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wide px-1">
                {cartCount} Item{cartCount > 1 ? "s" : ""}
              </p>

              {/* ITEMS */}
              {cartItems.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#eaedff] p-3.5 shadow-sm flex items-center gap-3.5"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-none overflow-hidden border border-gray-100"
                    style={{ backgroundColor: p.color }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13.5px] font-extrabold text-gray-900 truncate leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[10.5px] font-medium text-gray-500 mt-1">
                      {p.brand} · {p.unit}
                    </p>
                    <p className="text-[15px] font-black text-[#005c55] mt-1.5">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2.5 flex-none">
                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="text-gray-300 hover:text-red-500 active:scale-90 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1">
                      <button
                        onClick={() => decreaseQty(p.id)}
                        className="w-6 h-6 flex items-center justify-center text-[#005c55] active:scale-90 transition-transform"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-[12.5px] font-extrabold text-gray-900 px-2 min-w-[20px] text-center">
                        {p.qty}
                      </span>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="w-6 h-6 flex items-center justify-center text-[#005c55] active:scale-90 transition-transform"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* SELLER INFO BANNER IN CART */}
              <div
                onClick={() => navigate("/store/seller")}
                className="bg-white rounded-2xl border border-[#eaedff] p-3.5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition shadow-sm hover:shadow-md mt-2"
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

              {/* BILL SUMMARY */}
              <div className="bg-white rounded-2xl border border-[#eaedff] p-4.5 shadow-sm">
                <h3 className="text-[13.5px] font-extrabold text-gray-900 mb-4 flex items-center gap-1.5">
                  <Receipt size={16} className="text-[#0d6b63]" /> Price Details
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[12.5px]">
                    <span className="text-gray-600 font-medium">
                      Item Total
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatPrice(itemTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[12.5px]">
                    <span className="text-gray-600 font-medium">
                      Processing Fee
                    </span>
                    <span className="font-bold text-gray-900">
                      + {formatPrice(PROCESSING_FEE)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[12.5px]">
                    <span className="text-gray-600 font-medium">
                      Delivery Fee
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through text-[11px] font-medium">
                        {formatPrice(DELIVERY_FEE)}
                      </span>
                      <span className="font-extrabold text-[#2e9e48]">
                        FREE
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[12.5px]">
                    <span className="text-gray-600 font-medium">
                      Other Fees
                    </span>
                    <span className="font-bold text-gray-900">
                      + {formatPrice(OTHER_FEES)}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-1 pt-3 flex justify-between items-center">
                    <span className="text-[14px] font-black text-gray-900">
                      Total Payable
                    </span>
                    <span className="text-[18px] font-black text-[#005c55]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {cartItems.length > 0 && (
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] px-4 py-4">
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                  Total
                </p>
                <p className="text-[20px] font-black text-[#005c55] leading-none mt-0.5">
                  {formatPrice(grandTotal)}
                </p>
              </div>
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="flex-1 bg-[#0d6b63] text-white font-extrabold text-[14.5px] py-4 rounded-xl active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(13,107,99,0.25)] flex items-center justify-center gap-2 hover:bg-[#0a5750]"
              >
                <CheckCircle2 size={18} /> Proceed to Book
              </button>
            </div>
          </div>
        )}

        {/* CHECKOUT CONFIRM MODAL */}
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowCheckoutModal(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop">
              <div className="flex items-center justify-between px-5 pt-5">
                <h3 className="text-[16px] font-extrabold text-gray-900">
                  Confirm Booking
                </h3>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="px-5 py-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E0F2F1] flex items-center justify-center mb-4 shadow-sm">
                  <AlertCircle size={30} className="text-[#005c55]" />
                </div>
                <p className="text-[13.5px] font-bold text-gray-800 leading-relaxed px-2">
                  Our team will call you shortly to confirm your order and
                  pickup time.
                </p>
              </div>
              <div className="px-5 pb-5 flex gap-3">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-[#0d6b63] text-white font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 hover:bg-[#0a5750]"
                >
                  <Check size={16} /> Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS MODAL */}
        {successBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSuccessBooking(null)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop text-center">
              <div className="bg-[#f4fbf9] pt-8 pb-6 px-6 flex flex-col items-center border-b border-[#e4f4e8]">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2
                    size={44}
                    className="text-[#2e9e48]"
                    strokeWidth={2.2}
                  />
                </div>
                <h3 className="text-[20px] font-black text-gray-900">
                  Order Confirmed!
                </h3>
                <p className="text-[12.5px] text-gray-500 mt-2 leading-relaxed max-w-[240px] font-medium">
                  Your items have been booked successfully. Our team will
                  contact you soon.
                </p>
              </div>
              <div className="px-5 pb-5 pt-4">
                <button
                  onClick={() => {
                    setSuccessBooking(null);
                    navigate("/store/history");
                  }}
                  className="w-full bg-[#0d6b63] text-white font-bold text-[13.5px] py-4 rounded-xl active:scale-[0.98] transition shadow-lg hover:bg-[#0a5750]"
                >
                  View Booking History
                </button>
              </div>
            </div>
          </div>
        )}
        <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } } .animate-pop { animation: popIn 0.22s ease-out; }`}</style>
      </div>
    </div>
  );
}
