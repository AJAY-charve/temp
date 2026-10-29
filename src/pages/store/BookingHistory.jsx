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
import { getBookings } from "./StoreData";
import logo from "../../assets/daibmetalogo.jpeg";

const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

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
    const saved = getBookings();
    setBookings([...saved, ...DEMO_BOOKINGS]);
  }, []);

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-extrabold text-gray-900 text-[16px]">
              Booking History
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-8 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 pb-10 px-4 pt-5">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <History size={32} className="text-gray-300" />
              </div>
              <p className="text-[16px] font-extrabold text-gray-900">
                No bookings yet
              </p>
              <p className="text-[12px] text-gray-500 mt-1 max-w-[240px] leading-snug font-medium">
                Your product bookings will appear here once you book something
                from the store.
              </p>
              <button
                onClick={() => navigate("/store")}
                className="mt-6 bg-[#0d6b63] text-white font-bold text-[13px] px-6 py-3 rounded-xl active:scale-95 transition shadow-lg hover:bg-[#0a5750]"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wide px-1">
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

function BookingCard({ booking, expanded, onToggle }) {
  const itemCount = booking.items.reduce((s, p) => s + p.qty, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-3.5 text-left active:bg-gray-50 transition-colors"
      >
        <div className="w-11 h-11 rounded-xl bg-[#E0F2F1] flex items-center justify-center flex-none">
          <Receipt size={20} className="text-[#005c55]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-extrabold text-gray-900 truncate">
              {booking.id}
            </p>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-md leading-none uppercase tracking-wide ${booking.status === "Delivered" ? "text-[#2e9e48] bg-[#e4f4e8]" : "text-[#0d6b63] bg-[#E0F2F1]"}`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-[10.5px] font-medium text-gray-500 mt-1">
            {itemCount} item{itemCount > 1 ? "s" : ""} · {booking.date}
          </p>
        </div>
        <div className="text-right flex-none">
          <p className="text-[14px] font-black text-[#005c55] leading-none">
            {formatPrice(booking.total)}
          </p>
          <ChevronDown
            size={16}
            className={`text-gray-400 mt-1.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4 bg-[#fafbff]">
          <div className="flex flex-col gap-3">
            {booking.items.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-none border border-gray-200"
                  style={{ backgroundColor: p.color }}
                >
                  <ShoppingBag
                    size={16}
                    className="text-gray-700/50"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-gray-900 truncate leading-tight">
                    {p.name}
                  </p>
                  <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                    {p.brand} · {p.unit} · Qty {p.qty}
                  </p>
                </div>
                <p className="text-[12px] font-extrabold text-gray-800 flex-none">
                  {formatPrice(p.price * p.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200/60 mt-4 pt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={13} className="text-[#005c55] flex-none" />
              <span className="text-[11px] font-medium">
                DiabMeta Clinic, Sector 18
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={13} className="text-[#005c55] flex-none" />
              <span className="text-[11px] font-medium">
                Pickup after 4:00 PM
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
