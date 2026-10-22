import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  History,
  ShoppingBag,
  Calendar,
  MapPin,
  ChevronDown,
  Receipt,
} from "lucide-react";
import { getBookings } from "./Store"; // Path is correct (same folder)

// LOGO IMPORT (Path Updated)
import logo from "../../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";

const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

/* ============ STATIC DEMO BOOKINGS (for preview) ============ */
const DEMO_BOOKINGS = [
  {
    id: "#DBM482913",
    items: [
      {
        id: "s1",
        name: "Vitamin D3 60K",
        brand: "HealthVita",
        unit: "4 Capsules",
        price: 320,
        qty: 2,
        color: "#e4f4e8",
      },
      {
        id: "d4",
        name: "Test Strips (50)",
        brand: "AccuCheck",
        unit: "50 Strips",
        price: 750,
        qty: 1,
        color: "#fde3e3",
      },
    ],
    total: 1390,
    date: "18 Mar 2025, 10:42 AM",
    status: "Confirmed",
  },
  {
    id: "#DBM471662",
    items: [
      {
        id: "d1",
        name: "Glucometer Kit",
        brand: "AccuCheck",
        unit: "1 Kit + 25 Strips",
        price: 899,
        qty: 1,
        color: "#e0eefc",
      },
    ],
    total: 899,
    date: "12 Mar 2025, 06:15 PM",
    status: "Confirmed",
  },
  {
    id: "#DBM459027",
    items: [
      {
        id: "s4",
        name: "Metabolic Support",
        brand: "DiabCare",
        unit: "60 Capsules",
        price: 680,
        qty: 1,
        color: "#fde3e3",
      },
      {
        id: "s2",
        name: "Omega-3 Fish Oil",
        brand: "NutriLife",
        unit: "60 Softgels",
        price: 540,
        qty: 1,
        color: "#e0eefc",
      },
    ],
    total: 1220,
    date: "05 Mar 2025, 09:20 AM",
    status: "Delivered",
  },
];

export default function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // localStorage wali + static demo — dono combine
    const saved = getBookings();
    setBookings([...saved, ...DEMO_BOOKINGS]);
  }, []);

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

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
            <h1 className="font-bold text-gray-900 text-[15px]">
              Booking History
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
        <main className="flex-1 pb-8 px-4 pt-4">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-[#eef1f8] flex items-center justify-center mb-3">
                <History size={32} className="text-gray-400" />
              </div>
              <p className="text-[13px] font-bold text-gray-800">
                No bookings yet
              </p>
              <p className="text-[11px] text-gray-500 mt-1 max-w-[240px] leading-snug">
                Your product bookings will appear here once you book something
                from the store.
              </p>
              <button
                onClick={() => navigate("/store")}
                className="mt-4 bg-[#0d6b63] text-white font-bold text-[12px] px-4 py-2.5 rounded-xl active:scale-95 transition"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <p className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wide px-1">
                {bookings.length} booking{bookings.length > 1 ? "s" : ""}
              </p>
              {bookings.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  expanded={expandedId === b.id}
                  onToggle={() => toggleExpand(b.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ============ BOOKING CARD ============ */
function BookingCard({ booking, expanded, onToggle }) {
  const itemCount = booking.items.reduce((s, p) => s + p.qty, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Summary row */}
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center gap-3 text-left active:bg-[#fafbff] transition"
      >
        <div className="w-11 h-11 rounded-xl bg-[#E0F2F1] flex items-center justify-center flex-none">
          <Receipt size={20} className="text-[#005c55]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-[12px] font-extrabold text-gray-900 truncate">
              {booking.id}
            </p>
            <span
              className={`text-[8px] font-bold px-1.5 py-0.5 rounded leading-none ${
                booking.status === "Delivered"
                  ? "text-[#2e8f3a] bg-[#e4f4e8]"
                  : "text-[#0d6b63] bg-[#E0F2F1]"
              }`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            {itemCount} item{itemCount > 1 ? "s" : ""} · {booking.date}
          </p>
        </div>
        <div className="text-right flex-none">
          <p className="text-[13px] font-extrabold text-[#005c55] leading-none">
            {formatPrice(booking.total)}
          </p>
          <ChevronDown
            size={16}
            className={`text-gray-400 mt-1 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3 pb-3 border-t border-[#eaedff] pt-3">
          <div className="flex flex-col gap-2">
            {booking.items.map((p) => (
              <div key={p.id} className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-none"
                  style={{ backgroundColor: p.color }}
                >
                  <ShoppingBag
                    size={16}
                    className="text-white/80"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11.5px] font-bold text-gray-900 truncate leading-tight">
                    {p.name}
                  </p>
                  <p className="text-[9.5px] text-gray-500 mt-0.5">
                    {p.brand} · {p.unit} · Qty {p.qty}
                  </p>
                </div>
                <p className="text-[11px] font-bold text-gray-700 flex-none">
                  {formatPrice(p.price * p.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#eaedff] mt-3 pt-2.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-[#005c55] flex-none" />
              <span className="text-[10.5px] text-gray-600">
                DiabMeta Clinic, Sector 18
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-[#005c55] flex-none" />
              <span className="text-[10.5px] text-gray-600">
                Pickup after 4:00 PM
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
