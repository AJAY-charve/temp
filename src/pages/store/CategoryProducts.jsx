import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";

import logo from "../../assets/daibmetalogo.jpeg";
import {
  PRODUCTS,
  STORE_CATEGORIES,
  getCart,
  saveCart,
  getCartCount,
  getCartTotal,
} from "./StoreData";

const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function CategoryProducts() {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const categoryObj = STORE_CATEGORIES.find((c) => c.key === categoryKey);

  const [activeSub, setActiveSub] = useState("all");
  const [cart, setCart] = useState({});
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (product) => {
    const newCart = { ...cart, [product.id]: (cart[product.id] || 0) + 1 };
    updateCart(newCart);
    setLastAdded(product);
  };

  const decreaseQty = (id) => {
    const newCart = { ...cart };
    if (newCart[id] > 1) newCart[id] -= 1;
    else delete newCart[id];
    updateCart(newCart);
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === categoryKey);
  }, [categoryKey]);

  const subCategories = useMemo(() => {
    const brands = [...new Set(categoryProducts.map((p) => p.brand))];
    return [
      {
        id: "all",
        label: "All Products",
        image: categoryObj?.image,
        count: categoryProducts.length,
      },
      ...brands.map((b) => ({
        id: b,
        label: b,
        image: categoryObj?.image,
        count: categoryProducts.filter((p) => p.brand === b).length,
      })),
    ];
  }, [categoryProducts, categoryObj]);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(
      (p) => activeSub === "all" || p.brand === activeSub,
    );
  }, [categoryProducts, activeSub]);

  if (!categoryObj) return null;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md h-screen max-h-screen flex flex-col relative overflow-hidden">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex-shrink-0">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/store")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-extrabold text-gray-900 text-[16px]">
              {categoryObj.label}
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

        <main className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-[32%] bg-white border-r border-[#eaedff] overflow-y-auto scrollbar-hide flex flex-col flex-shrink-0">
            {subCategories.map((sub) => {
              const isActive = activeSub === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`flex flex-col items-center justify-start py-3.5 px-2 text-center border-b border-gray-50 transition-colors relative ${
                    isActive
                      ? "bg-[#f4fbf9]"
                      : "bg-transparent hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0d6b63]" />
                  )}

                  <div
                    className={`w-10 h-10 rounded-full overflow-hidden mb-2 flex-shrink-0 border-2 ${isActive ? "border-[#0d6b63]" : "border-gray-100"}`}
                  >
                    <img
                      src={sub.image}
                      alt={sub.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span
                    className={`text-[9.5px] font-extrabold leading-tight line-clamp-2 ${isActive ? "text-[#0d6b63]" : "text-gray-500"}`}
                  >
                    {sub.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Products */}
          <div className="w-[68%] bg-[#faf8ff] overflow-y-auto px-3 pb-24 pt-3">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                {filteredProducts.length} items
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <ShoppingBag size={24} className="text-gray-300 mb-2" />
                <p className="text-[11px] font-bold text-gray-600">
                  No items found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    qty={cart[p.id] || 0}
                    onAdd={() => addToCart(p)}
                    onDecrease={() => decreaseQty(p.id)}
                    onOpen={() => navigate(`/store/product/${p.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {cartCount > 0 && (
          <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center px-4 pb-4">
            <div className="w-full max-w-md bg-[#0d6b63] text-white rounded-2xl shadow-[0_8px_30px_rgba(13,107,99,0.3)] px-5 py-3.5 flex items-center justify-between animate-slide-up border border-[#0a5750]">
              <div>
                <p className="text-[11px] font-semibold text-white/80 leading-none">
                  {cartCount} item{cartCount > 1 ? "s" : ""}
                </p>
                <p className="text-[18px] font-black mt-1 leading-none">
                  {formatPrice(cartTotal)}
                </p>
              </div>
              <button
                onClick={() => navigate("/store/cart")}
                className="bg-white text-[#0d6b63] font-extrabold text-[12px] px-5 py-2.5 rounded-xl active:scale-95 transition shadow-sm hover:bg-gray-50"
              >
                View Cart
              </button>
            </div>
          </div>
        )}

        {lastAdded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setLastAdded(null)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop p-6 pb-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#e4f4e8] flex items-center justify-center mx-auto mb-4">
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
                1 × {lastAdded.name} has been added.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLastAdded(null);
                    navigate("/store/cart");
                  }}
                  className="w-full bg-[#0d6b63] text-white font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg"
                >
                  View Cart
                </button>
                <button
                  onClick={() => setLastAdded(null)}
                  className="w-full bg-white border-2 border-gray-100 text-gray-600 font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-gray-50"
                >
                  Continue Shopping
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

function ProductCard({ product, qty, onAdd, onDecrease, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden flex flex-col group">
      <button
        onClick={onOpen}
        className="w-full h-[90px] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: product.color }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </button>
      <div className="p-2.5 flex flex-col flex-1">
        <button onClick={onOpen} className="text-left">
          <h3 className="text-[11px] font-extrabold text-gray-900 leading-tight line-clamp-2 min-h-[28px]">
            {product.name}
          </h3>
          <p className="text-[9px] font-medium text-gray-500 mt-1">
            {product.unit}
          </p>
        </button>
        <div className="flex items-end gap-1 mt-2 mb-2">
          <p className="text-[12.5px] font-black text-gray-900 leading-none">
            {formatPrice(product.price)}
          </p>
          <p className="text-[9px] font-medium text-gray-400 line-through leading-none">
            {formatPrice(product.mrp)}
          </p>
        </div>
        <div className="mt-auto">
          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="w-full bg-[#005c55]/10 text-[#005c55] font-extrabold text-[10px] py-2 rounded-lg active:scale-95 transition-colors flex items-center justify-center gap-1 hover:bg-[#005c55]/15"
            >
              <Plus size={11} /> Add
            </button>
          ) : (
            <div className="w-full bg-[#005c55] text-white rounded-lg flex items-center justify-between px-1.5 py-1 shadow-sm">
              <button
                onClick={onDecrease}
                className="w-5 h-5 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus size={11} />
              </button>
              <span className="text-[11px] font-black">{qty}</span>
              <button
                onClick={onAdd}
                className="w-5 h-5 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus size={11} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
