import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  X,
  Plus,
  Minus,
  ShoppingCart,
  History,
  Store as StoreIcon,
  ChevronRight,
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

export default function Store() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});

  useEffect(() => {
    setCart(getCart());
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (id) => {
    const newCart = { ...cart, [id]: (cart[id] || 0) + 1 };
    updateCart(newCart);
  };

  const decreaseQty = (id) => {
    const newCart = { ...cart };
    if (newCart[id] > 1) newCart[id] -= 1;
    else delete newCart[id];
    updateCart(newCart);
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const filtered = useMemo(() => {
    if (!search) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [search]);

  const openProduct = (product) => navigate(`/store/product/${product.id}`);
  const openCategory = (categoryKey) =>
    navigate(`/store/category/${categoryKey}`);

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
            <h1 className="font-extrabold text-gray-900 text-[16px]">Store</h1>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate("/store/history")}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#005c55] active:scale-95 transition"
              >
                <History size={18} />
              </button>
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

        <main className="flex-1 pb-24 px-4 pt-4">
          {/* SEARCH */}
          <div className="flex items-center gap-2 px-3.5 py-3 mb-5 rounded-2xl border border-[#eaedff] bg-white shadow-sm focus-within:border-[#0d6b63] focus-within:ring-1 focus-within:ring-[#0d6b63]/20 transition-all">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or brands..."
              className="flex-1 bg-transparent outline-none text-[13px] font-medium text-gray-800 placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* CATEGORIES */}
          <div className="flex gap-3.5 mb-6 overflow-x-auto scrollbar-hide pb-2 pt-1 px-0.5">
            {STORE_CATEGORIES.map((f) => (
              <button
                key={f.key}
                onClick={() => openCategory(f.key)}
                className="flex-shrink-0 flex flex-col items-center justify-start w-[52px] rounded-xl transition-all duration-200 border border-[#eaedff] bg-white hover:shadow-md hover:border-[#0d6b63]/30 active:scale-95 overflow-hidden"
              >
                <div className="w-full aspect-square flex-shrink-0">
                  <img
                    src={f.image}
                    alt={f.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full py-1 px-0.5 text-center border-t border-gray-50">
                  <span className="text-[8px] font-bold leading-tight truncate block text-gray-600">
                    {f.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* SELLER BANNER */}
          <div
            onClick={() => navigate("/store/seller")}
            className="mb-6 bg-white rounded-2xl border border-[#eaedff] p-3.5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition shadow-sm hover:shadow-md"
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

          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wide">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
            {search && (
              <p className="text-[10px] text-gray-400">for "{search}"</p>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <p className="text-[14px] font-bold text-gray-800">
                No products found
              </p>
              <p className="text-[11px] text-gray-500 mt-1 max-w-[220px] leading-snug">
                Try changing search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5">
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

        {/* FLOATING CART */}
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
      </div>
    </div>
  );
}

function ProductCard({ product, qty, onAdd, onDecrease, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 overflow-hidden flex flex-col group">
      <button
        onClick={onOpen}
        className="w-full h-[110px] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: product.color }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </button>

      <div className="p-3 flex flex-col flex-1">
        <button onClick={onOpen} className="text-left">
          <p className="text-[8.5px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">
            {product.brand}
          </p>
          <h3 className="text-[12px] font-bold text-gray-900 leading-tight mt-1.5 line-clamp-2 min-h-[30px]">
            {product.name}
          </h3>
          <p className="text-[9.5px] font-medium text-gray-500 mt-1">
            {product.unit}
          </p>
        </button>

        <div className="flex items-end gap-1.5 mt-2 mb-2">
          <p className="text-[14px] font-black text-gray-900 leading-none">
            {formatPrice(product.price)}
          </p>
          <p className="text-[10px] font-medium text-gray-400 line-through leading-none">
            {formatPrice(product.mrp)}
          </p>
        </div>

        <div className="mt-auto pt-1">
          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="w-full bg-[#005c55]/10 text-[#005c55] font-extrabold text-[11px] py-2.5 rounded-lg active:scale-95 transition-colors flex items-center justify-center gap-1 hover:bg-[#005c55]/15"
            >
              <Plus size={12} /> Add
            </button>
          ) : (
            <div className="w-full bg-[#005c55] text-white rounded-lg flex items-center justify-between px-2 py-1.5 shadow-sm">
              <button
                onClick={onDecrease}
                className="w-6 h-6 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus size={14} />
              </button>
              <span className="text-[12px] font-extrabold">{qty}</span>
              <button
                onClick={onAdd}
                className="w-6 h-6 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
