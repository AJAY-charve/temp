import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Loader2,
  CheckCircle2,
  Info,
  Lightbulb,
  Sparkles,
  RotateCcw,
  BookmarkPlus,
  Bookmark,
  ShieldCheck,
  ChevronDown,
  Trash2,
  ScanLine,
} from "lucide-react";

const NAVY = "#14284b";
const GREEN = "#2e9e3a";
const BLUE = "#1976d2";
const DAILY_GOAL = 2000;
const STORAGE_KEY = "diabmeta_saved_meals";

/* ------------------------------------------------------------------ */
/*  SVG FOOD ICONS (replace photos)                                    */
/* ------------------------------------------------------------------ */

const IconFrame = ({ bg, children }) => (
  <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
    <rect width="48" height="48" rx="12" fill={bg} />
    {children}
  </svg>
);

const RotiIcon = () => (
  <IconFrame bg="#fdf1dc">
    <ellipse cx="24" cy="30" rx="15" ry="5" fill="#d9a35a" opacity=".5" />
    <circle cx="24" cy="23" r="14" fill="#f1c27a" />
    <circle
      cx="24"
      cy="23"
      r="14"
      fill="none"
      stroke="#d99a45"
      strokeWidth="1.5"
    />
    <circle cx="18" cy="19" r="2.2" fill="#b97a2c" opacity=".75" />
    <circle cx="28" cy="17" r="1.6" fill="#b97a2c" opacity=".75" />
    <circle cx="30" cy="26" r="2.4" fill="#b97a2c" opacity=".75" />
    <circle cx="21" cy="28" r="1.7" fill="#b97a2c" opacity=".75" />
    <circle cx="25" cy="22" r="1.1" fill="#b97a2c" opacity=".6" />
  </IconFrame>
);

const DalIcon = () => (
  <IconFrame bg="#fff4cc">
    <ellipse cx="24" cy="25" rx="16" ry="6" fill="#b5651d" />
    <path d="M8 25c0 9 7 15 16 15s16-6 16-15z" fill="#c9742a" />
    <ellipse cx="24" cy="25" rx="14" ry="4.6" fill="#f2b705" />
    <ellipse cx="24" cy="24" rx="9" ry="2.4" fill="#f8d34a" opacity=".8" />
    <circle cx="19" cy="25" r="1" fill="#5aa02c" />
    <circle cx="27" cy="26" r="1" fill="#d94a2b" />
    <path
      d="M17 12c-2 2 2 3 0 5M24 10c-2 2 2 3 0 5M31 12c-2 2 2 3 0 5"
      stroke="#c9a14a"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
  </IconFrame>
);

const SabziIcon = () => (
  <IconFrame bg="#ffe9d6">
    <ellipse cx="24" cy="25" rx="16" ry="6" fill="#8a3b12" />
    <path d="M8 25c0 9 7 15 16 15s16-6 16-15z" fill="#a8481a" />
    <ellipse cx="24" cy="25" rx="14" ry="4.6" fill="#e0701f" />
    <circle cx="18" cy="24" r="2.4" fill="#4c9a2a" />
    <circle cx="25" cy="26" r="2.2" fill="#f5c542" />
    <rect
      x="28"
      y="22"
      width="4"
      height="4"
      rx="1"
      fill="#f0f0f0"
      transform="rotate(20 30 24)"
    />
    <circle cx="22" cy="23" r="1.4" fill="#d94a2b" />
    <circle cx="30" cy="26" r="1.5" fill="#4c9a2a" />
    <path
      d="M18 12c-2 2 2 3 0 5M25 10c-2 2 2 3 0 5"
      stroke="#d9a177"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
  </IconFrame>
);

const RiceIcon = () => (
  <IconFrame bg="#eaf3fb">
    <path d="M9 27c0 9 6.5 14 15 14s15-5 15-14z" fill="#5b8fc7" />
    <path
      d="M11 27c1-11 6-16 13-16s12 5 13 16z"
      fill="#ffffff"
      stroke="#d4dde8"
      strokeWidth="1"
    />
    <g fill="#e6ebf1">
      <ellipse cx="19" cy="21" rx="2.2" ry="1" transform="rotate(-25 19 21)" />
      <ellipse cx="26" cy="18" rx="2.2" ry="1" transform="rotate(20 26 18)" />
      <ellipse cx="29" cy="24" rx="2.2" ry="1" transform="rotate(-10 29 24)" />
      <ellipse cx="22" cy="25" rx="2.2" ry="1" transform="rotate(30 22 25)" />
      <ellipse cx="16" cy="25" rx="2.2" ry="1" transform="rotate(10 16 25)" />
    </g>
    <path
      d="M18 8c-2 2 2 3 0 5M24 6c-2 2 2 3 0 5M30 8c-2 2 2 3 0 5"
      stroke="#b9c7d6"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
  </IconFrame>
);

const SaladIcon = () => (
  <IconFrame bg="#e6f6e4">
    <circle
      cx="24"
      cy="25"
      r="16"
      fill="#ffffff"
      stroke="#cfe3cc"
      strokeWidth="1.5"
    />
    <circle cx="24" cy="25" r="11" fill="#9bd27a" />
    <circle
      cx="19"
      cy="21"
      r="4.2"
      fill="#d8f0b8"
      stroke="#6fb04a"
      strokeWidth="1.2"
    />
    <circle cx="19" cy="21" r="1.4" fill="#a6d57d" />
    <circle cx="29" cy="22" r="4.6" fill="#e5493a" />
    <path
      d="M26.8 20.4c1.4-1 3.2-1 4.4.1"
      stroke="#ff8a7a"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M17 30c2.5-2.6 6-3 9-1.2"
      stroke="#b46bd0"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M24 27c2-1 4.5-.4 5.8 1.2"
      stroke="#b46bd0"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </IconFrame>
);

/* ------------------------------------------------------------------ */
/*  SVG MACRO ICONS                                                    */
/* ------------------------------------------------------------------ */

const WheatIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} aria-hidden="true">
    <path d="M20 3c-6 0-11 3.5-11 9.5 0 1.2.2 2.2.6 3.1C8.6 14.7 8 13.2 8 11.5 8 8.6 9.2 6.6 11 5 7 6 4 9.2 4 13.5 4 17.6 7 20 10.5 20c.4 1.1.6 1.6.6 1.6l1.5-.4s-.1-.6-.2-1.4C17.5 18.8 20 12.8 20 3z" />
  </svg>
);

const ProteinIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} aria-hidden="true">
    <path d="M13.5 2s.8 3.2-1.4 5.6C10.4 9.4 8 10.6 8 14a6 6 0 0 0 12 0c0-3-1.8-4.6-3.2-6-.3 1.3-1 2.2-1.9 2.6C15.5 8 15 4.6 13.5 2z" />
    <path
      d="M5.5 11.5C4 13 3.3 14.4 3.3 16a4.4 4.4 0 0 0 3.4 4.3C5.9 19 5.5 17.6 5.5 16c0-1.6.3-2.8 0-4.5z"
      opacity=".6"
    />
  </svg>
);

const FatIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} aria-hidden="true">
    <path d="M12 2.5C9.5 6.4 6 9.6 6 14a6 6 0 0 0 12 0c0-4.4-3.5-7.6-6-11.5z" />
    <path
      d="M9.2 14.2a2.8 2.8 0 0 0 2.2 2.7"
      stroke="#fff"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      opacity=".8"
    />
  </svg>
);

const FiberIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} aria-hidden="true">
    <path d="M12 21c-1.3 0-2-.8-2-2v-5.2C7.2 13.2 5.5 11 5.5 8.6c0-2 1.3-3.6 3.2-4 .9-1.6 2.5-2.6 3.3-2.6s2.4 1 3.3 2.6c1.9.4 3.2 2 3.2 4 0 2.4-1.7 4.6-4.5 5.2V19c0 1.2-.7 2-2 2z" />
  </svg>
);

const IdliIcon = () => (
  <IconFrame bg="#eef1f7">
    <ellipse cx="24" cy="34" rx="18" ry="5" fill="#c9d3e3" />
    <path
      d="M9 33a8 8 0 0 1 16 0z"
      fill="#fff"
      stroke="#d4dde8"
      strokeWidth="1.2"
    />
    <path
      d="M23 33a8 8 0 0 1 16 0z"
      fill="#fff"
      stroke="#d4dde8"
      strokeWidth="1.2"
    />
    <path
      d="M16 26a8 8 0 0 1 16 0z"
      fill="#fff"
      stroke="#d4dde8"
      strokeWidth="1.2"
    />
    <circle cx="24" cy="21" r="1" fill="#e3e8f0" />
  </IconFrame>
);

const FruitIcon = () => (
  <IconFrame bg="#fde8e6">
    <path
      d="M24 16c-5-3-12 0-12 8 0 8 5 15 9 15 1.5 0 2-.8 3-.8s1.5.8 3 .8c4 0 9-7 9-15 0-8-7-11-12-8z"
      fill="#e53935"
    />
    <ellipse
      cx="18"
      cy="23"
      rx="2"
      ry="4"
      fill="#fff"
      opacity=".25"
      transform="rotate(15 18 23)"
    />
    <path
      d="M24 16c0-3 1-5 3-7"
      stroke="#6d4c41"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M27 12c3-2 6-1 7 1-3 2-6 2-7-1z" fill="#4caf50" />
  </IconFrame>
);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const ICONS = {
  roti: RotiIcon,
  dal: DalIcon,
  sabzi: SabziIcon,
  rice: RiceIcon,
  salad: SaladIcon,
  idli: IdliIcon,
  fruit: FruitIcon,
};

const MACRO_META = [
  {
    key: "carbs",
    label: "Carbohydrates",
    short: "Carbs",
    color: "#2e9e3a",
    kcal: 4,
    Icon: WheatIcon,
  },
  {
    key: "protein",
    label: "Protein",
    short: "Protein",
    color: "#f07c1a",
    kcal: 4,
    Icon: ProteinIcon,
  },
  {
    key: "fat",
    label: "Fat",
    short: "Fat",
    color: "#f2b300",
    kcal: 9,
    Icon: FatIcon,
  },
  {
    key: "fiber",
    label: "Fiber",
    short: "Fiber",
    color: "#8e44ad",
    kcal: 0,
    Icon: FiberIcon,
  },
];

const MEAL_COLORS = {
  Breakfast: "#f59e0b",
  Lunch: "#2e9e3a",
  Dinner: "#5c6bc0",
  Snack: "#e91e63",
};

const sumCal = (items) => items.reduce((s, i) => s + i.cal, 0);

const splitMacros = (m) => {
  const total = MACRO_META.reduce((s, x) => s + m[x.key] * x.kcal, 0);
  return MACRO_META.map((x) => ({
    ...x,
    grams: m[x.key],
    percent: x.kcal ? Math.round(((m[x.key] * x.kcal) / total) * 100) : null,
  }));
};

// Result shown after a scan (static for now, replace with API response)
const currentMeal = {
  mealType: "Lunch",
  score: 82,
  items: [
    {
      name: "Roti (Wheat Chapati)",
      qty: "2 pieces (medium)",
      cal: 180,
      icon: "roti",
    },
    {
      name: "Dal (Toor/Yellow Dal)",
      qty: "1 katori (150 ml)",
      cal: 160,
      icon: "dal",
    },
    {
      name: "Mixed Vegetable Sabzi",
      qty: "1 katori (100 g)",
      cal: 120,
      icon: "sabzi",
    },
    { name: "Steamed Rice", qty: "1 katori (150 g)", cal: 200, icon: "rice" },
    {
      name: "Salad (Cucumber, Tomato, Onion)",
      qty: "1 small serving",
      cal: 30,
      icon: "salad",
    },
  ],
  macros: { carbs: 92, protein: 24, fat: 22, fiber: 10 },
};

const micronutrients = [
  { name: "Iron", level: "Good" },
  { name: "Calcium", level: "Moderate" },
  { name: "Vitamin A", level: "Good" },
  { name: "Vitamin C", level: "Good" },
  { name: "Potassium", level: "Moderate" },
];

// Static previously-saved scans
const INITIAL_SAVED = [
  {
    id: 1,
    mealType: "Breakfast",
    day: "Today",
    time: "9:10 AM",
    score: 88,
    items: [
      { name: "Idli", qty: "3 pieces", cal: 150, icon: "idli" },
      { name: "Sambar", qty: "1 katori (150 ml)", cal: 90, icon: "dal" },
    ],
    macros: { carbs: 46, protein: 9, fat: 3, fiber: 5 },
  },
  {
    id: 2,
    mealType: "Dinner",
    day: "Yesterday",
    time: "8:45 PM",
    score: 79,
    items: [
      {
        name: "Roti (Wheat Chapati)",
        qty: "2 pieces (medium)",
        cal: 180,
        icon: "roti",
      },
      {
        name: "Palak Paneer",
        qty: "1 katori (120 g)",
        cal: 220,
        icon: "sabzi",
      },
      {
        name: "Salad (Cucumber, Tomato, Onion)",
        qty: "1 small serving",
        cal: 30,
        icon: "salad",
      },
    ],
    macros: { carbs: 40, protein: 18, fat: 22, fiber: 8 },
  },
  {
    id: 3,
    mealType: "Lunch",
    day: "Yesterday",
    time: "1:20 PM",
    score: 84,
    items: [
      { name: "Steamed Rice", qty: "1 katori (150 g)", cal: 200, icon: "rice" },
      {
        name: "Dal (Toor/Yellow Dal)",
        qty: "1 katori (150 ml)",
        cal: 160,
        icon: "dal",
      },
      {
        name: "Mixed Vegetable Sabzi",
        qty: "1 katori (100 g)",
        cal: 120,
        icon: "sabzi",
      },
      {
        name: "Salad (Cucumber, Tomato, Onion)",
        qty: "1 small serving",
        cal: 30,
        icon: "salad",
      },
    ],
    macros: { carbs: 75, protein: 19, fat: 12, fiber: 9 },
  },
  {
    id: 4,
    mealType: "Snack",
    day: "Yesterday",
    time: "4:30 PM",
    score: 90,
    items: [
      { name: "Apple", qty: "1 medium", cal: 95, icon: "fruit" },
      { name: "Papaya", qty: "1 katori (100 g)", cal: 60, icon: "fruit" },
    ],
    macros: { carbs: 40, protein: 2, fat: 1, fiber: 7 },
  },
];

const loadSaved = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    /* ignore and fall back to static data */
  }
  return INITIAL_SAVED;
};

/* ------------------------------------------------------------------ */
/*  SMALL UI PIECES                                                    */
/* ------------------------------------------------------------------ */

const Card = ({ children, className = "" }) => (
  <section
    className={`bg-white rounded-2xl p-4 border border-[#e3ebf7] ${className}`}
    style={{ boxShadow: "0 2px 10px rgba(20,40,75,0.05)" }}
  >
    {children}
  </section>
);

const ScoreRing = ({ score }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#e1efe2"
          strokeWidth="6"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={GREEN}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[16px] font-black text-[#1b5e20]">{score}</span>
        <span className="text-[8px] font-bold text-[#2e7d32] mt-0.5">
          / 100
        </span>
      </div>
    </div>
  );
};

const TABS = [
  { id: "scan", label: "Scan Food", Icon: ScanLine },
  { id: "saved", label: "Saved Meals", Icon: Bookmark },
];

function TabBar({ tab, onChange, count, dark }) {
  return (
    <div
      role="tablist"
      className={`flex p-1 rounded-xl gap-1 ${
        dark
          ? "bg-white/15 backdrop-blur-md"
          : "bg-white border border-[#d9e6f7]"
      }`}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = tab === id;
        const activeCls = dark ? "bg-white text-[#14284b]" : "text-white";
        const idleCls = dark ? "text-white/80" : "text-gray-500";
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`flex-1 h-9 rounded-lg text-[12.5px] font-bold flex items-center justify-center gap-1.5 transition active:scale-[0.98] ${
              active ? activeCls : idleCls
            }`}
            style={active && !dark ? { background: NAVY } : undefined}
          >
            <Icon size={15} />
            {label}
            {id === "saved" && (
              <span
                className="min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center"
                style={{
                  background: active
                    ? dark
                      ? NAVY
                      : "rgba(255,255,255,0.25)"
                    : "rgba(120,130,150,0.2)",
                  color: active && dark ? "#fff" : "inherit",
                }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function LightHeader({ tab, onTab, count, onBack }) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(231,241,252,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="h-14 px-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95"
          style={{ color: NAVY }}
          aria-label="Back to home"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <div className="text-center">
          <h1 className="font-extrabold text-[16px]" style={{ color: NAVY }}>
            {tab === "scan" ? "Scan Your Meal" : "Saved Meals"}
          </h1>
          <p className="text-[10px] text-gray-500 font-medium">
            Healthy Choices. A Healthier You.
          </p>
        </div>
        <button
          className="w-9 h-9 flex items-center justify-center text-gray-500"
          aria-label="About estimates"
        >
          <Info size={20} />
        </button>
      </div>
      <div className="px-4 pb-3">
        <TabBar tab={tab} onChange={onTab} count={count} />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  SAVED MEALS TAB                                                    */
/* ------------------------------------------------------------------ */

function SavedMealCard({ meal, open, onToggle, onDelete }) {
  const color = MEAL_COLORS[meal.mealType] || NAVY;
  const total = sumCal(meal.items);
  const split = splitMacros(meal.macros);
  const shown = meal.items.slice(0, 4);
  const extra = meal.items.length - shown.length;

  return (
    <article
      className="bg-white rounded-2xl border overflow-hidden"
      style={{
        borderColor: meal.isNew ? GREEN : "#e3ebf7",
        boxShadow: "0 2px 10px rgba(20,40,75,0.05)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full p-3.5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full"
              style={{ background: `${color}1f`, color }}
            >
              {meal.mealType}
            </span>
            <span className="text-[11px] text-gray-500 truncate">
              {meal.day}, {meal.time}
            </span>
            {meal.isNew && (
              <span
                className="text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
                style={{ background: GREEN }}
              >
                NEW
              </span>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5 flex-shrink-0">
            {shown.map((it, i) => {
              const Icon = ICONS[it.icon] || RotiIcon;
              return (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white"
                >
                  <Icon />
                </div>
              );
            })}
            {extra > 0 && (
              <div
                className="w-10 h-10 rounded-xl ring-2 ring-white bg-[#eef2f8] text-[11px] font-extrabold flex items-center justify-center"
                style={{ color: NAVY }}
              >
                +{extra}
              </div>
            )}
          </div>
          <p
            className="flex-1 min-w-0 text-[12px] font-semibold leading-snug line-clamp-2"
            style={{ color: NAVY }}
          >
            {meal.items.map((i) => i.name.split(" (")[0]).join(", ")}
          </p>
          <div className="text-right flex-shrink-0">
            <p
              className="text-[18px] font-black leading-none"
              style={{ color: NAVY }}
            >
              {total}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">kcal</p>
          </div>
        </div>

        <div className="flex gap-3 mt-3 text-[11px] font-bold">
          {split
            .filter((m) => m.key !== "fiber")
            .map((m) => (
              <span
                key={m.key}
                className="flex items-center gap-1.5 text-gray-600"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: m.color }}
                />
                {m.short} {m.grams}g
              </span>
            ))}
        </div>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 pt-3 border-t border-[#eef2f8] flex flex-col gap-3">
          {meal.image && (
            <img
              src={meal.image}
              alt="Saved plate"
              className="w-full aspect-[16/9] object-cover rounded-xl"
            />
          )}

          <ul className="flex flex-col">
            {meal.items.map((it, i) => {
              const Icon = ICONS[it.icon] || RotiIcon;
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-[#f1f4f9] last:border-0"
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                    <Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[12px] font-bold leading-tight"
                      style={{ color: NAVY }}
                    >
                      {it.name}
                    </p>
                    <p className="text-[10.5px] text-gray-500 mt-0.5">
                      {it.qty}
                    </p>
                  </div>
                  <span
                    className="text-[13px] font-extrabold"
                    style={{ color: NAVY }}
                  >
                    {it.cal}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="grid grid-cols-4 gap-2 text-center bg-[#f6f9fe] rounded-xl py-2.5">
            {split.map((m) => (
              <div key={m.key}>
                <p
                  className="text-[14px] font-black leading-none"
                  style={{ color: m.color }}
                >
                  {m.grams}g
                </p>
                <p className="text-[9.5px] text-gray-500 mt-1">{m.short}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20]">
              Health score {meal.score}/100
            </span>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 text-[11px] font-bold text-red-500 px-2 py-1 rounded-lg active:scale-95"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function SavedTab({ meals, openId, setOpenId, onDelete, onScan }) {
  const today = meals.filter((m) => m.day === "Today");
  const todayKcal = today.reduce((s, m) => s + sumCal(m.items), 0);
  const pct = Math.min(100, Math.round((todayKcal / DAILY_GOAL) * 100));
  const todayMacros = MACRO_META.filter((m) => m.key !== "fiber").map((m) => ({
    ...m,
    grams: today.reduce((s, x) => s + x.macros[m.key], 0),
  }));

  return (
    <main className="flex-1 px-4 pt-3 pb-10 flex flex-col gap-3">
      <Card>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-500">
              Today&rsquo;s intake
            </p>
            <p
              className="text-[26px] font-black leading-none mt-1.5"
              style={{ color: NAVY }}
            >
              {todayKcal}{" "}
              <span className="text-[13px] font-bold text-gray-400">
                / {DAILY_GOAL} kcal
              </span>
            </p>
          </div>
          <span className="text-[12px] font-extrabold px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20]">
            {today.length} {today.length === 1 ? "meal" : "meals"}
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-[#e8eef7] mt-3 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: GREEN }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {todayMacros.map((m) => (
            <div
              key={m.key}
              className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: m.color }}
              />
              {m.short} {m.grams}g
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between px-1 mt-1">
        <h2 className="text-[14px] font-extrabold" style={{ color: NAVY }}>
          Your scans
        </h2>
        <span className="text-[11px] text-gray-500 font-medium">
          {meals.length} saved
        </span>
      </div>

      {meals.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-[14px] font-extrabold" style={{ color: NAVY }}>
            No saved meals yet
          </p>
          <p className="text-[12px] text-gray-500 mt-1">
            Scan a plate and tap Save to Food Log.
          </p>
          <button
            onClick={onScan}
            className="mt-4 h-10 px-5 rounded-xl text-white text-[13px] font-extrabold active:scale-95"
            style={{ background: GREEN }}
          >
            Scan a meal
          </button>
        </Card>
      ) : (
        meals.map((meal) => (
          <SavedMealCard
            key={meal.id}
            meal={meal}
            open={openId === meal.id}
            onToggle={() => setOpenId(openId === meal.id ? null : meal.id)}
            onDelete={() => onDelete(meal.id)}
          />
        ))
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ScanFood() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanTimer = useRef(null);

  const [tab, setTab] = useState("scan");
  const [step, setStep] = useState("camera");
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedMeals, setSavedMeals] = useState(loadSaved);
  const [openId, setOpenId] = useState(null);

  // Persist saved meals (photos and "new" flag are session-only)
  useEffect(() => {
    try {
      const slim = savedMeals.map(({ image, isNew, ...rest }) => rest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
    } catch (e) {
      /* storage full or unavailable */
    }
  }, [savedMeals]);

  useEffect(() => () => clearTimeout(scanTimer.current), []);

  // Camera runs only on the Scan tab while waiting for a photo
  useEffect(() => {
    if (tab !== "scan" || step !== "camera") return;

    let stream = null;
    let cancelled = false;
    setIsCameraOn(false);
    setError("");

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Camera API not supported in this browser.");
          return;
        }
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsCameraOn(true);
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera permission denied or no camera found.");
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [tab, step]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      alert("Video or Canvas not ready!");
      return;
    }
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert("Camera is still loading. Please wait a second and try again.");
      return;
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedImage(imageUrl);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((t) => t.stop());
      }
      setIsCameraOn(false);
      setSaved(false);
      setStep("scanning");
      scanTimer.current = setTimeout(() => setStep("result"), 2500);
    } catch (err) {
      console.error("Capture failed:", err);
      alert("Failed to capture image. Check browser permissions.");
    }
  };

  const handleScanAgain = () => {
    clearTimeout(scanTimer.current);
    setCapturedImage(null);
    setError("");
    setSaved(false);
    setStep("camera");
    setTab("scan");
  };

  const handleSave = () => {
    if (saved) return;
    const id = Date.now();
    const time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setSavedMeals((prev) => [
      {
        id,
        ...currentMeal,
        day: "Today",
        time,
        image: capturedImage,
        isNew: true,
      },
      ...prev,
    ]);
    setSaved(true);
    setOpenId(id);
    setTab("saved");
  };

  const handleDelete = (id) => {
    setSavedMeals((prev) => prev.filter((m) => m.id !== id));
    if (openId === id) setOpenId(null);
  };

  /* ========== SAVED TAB ========== */
  if (tab === "saved") {
    return (
      <div
        className="min-h-[100dvh] flex justify-center"
        style={{
          background:
            "linear-gradient(180deg,#e7f1fc 0%,#f2f7fd 45%,#fafcff 100%)",
          fontFamily: "'Nunito','Noto Sans Devanagari',system-ui,sans-serif",
        }}
      >
        <div className="w-full max-w-md min-h-[100dvh] flex flex-col">
          <LightHeader
            tab={tab}
            onTab={setTab}
            count={savedMeals.length}
            onBack={() => navigate("/home")}
          />
          <SavedTab
            meals={savedMeals}
            openId={openId}
            setOpenId={setOpenId}
            onDelete={handleDelete}
            onScan={handleScanAgain}
          />
        </div>
      </div>
    );
  }

  /* ========== CAMERA & SCANNING VIEW ========== */
  if (step === "camera" || step === "scanning") {
    return (
      <div className="h-[100dvh] bg-black flex justify-center">
        <div className="w-full max-w-md h-full flex flex-col relative overflow-hidden">
          <header
            className="shrink-0 bg-black"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <div className="h-14 px-4 flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white active:scale-95"
                aria-label="Go back"
              >
                <ArrowLeft size={22} />
              </button>
              <h1 className="font-extrabold text-[16px] text-white">
                Scan Your Meal
              </h1>
              <div className="w-9" />
            </div>
            <div className="px-4 pb-3">
              <TabBar
                tab={tab}
                onChange={setTab}
                count={savedMeals.length}
                dark
              />
            </div>
          </header>

          {error && (
            <div className="absolute top-32 left-4 right-4 z-50 bg-red-500 text-white p-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <div className="flex-1 min-h-0 relative overflow-hidden bg-[#111]">
            {!capturedImage && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute left-5 right-5 top-4 bottom-5 rounded-3xl border-2 border-dashed border-white/50 pointer-events-none">
                  <span className="absolute -top-0.5 -left-0.5 w-9 h-9 border-t-4 border-l-4 border-white rounded-tl-3xl" />
                  <span className="absolute -top-0.5 -right-0.5 w-9 h-9 border-t-4 border-r-4 border-white rounded-tr-3xl" />
                  <span className="absolute -bottom-0.5 -left-0.5 w-9 h-9 border-b-4 border-l-4 border-white rounded-bl-3xl" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-9 h-9 border-b-4 border-r-4 border-white rounded-br-3xl" />
                  {isCameraOn && (
                    <p className="absolute bottom-4 inset-x-0 text-center text-white/90 text-xs font-medium drop-shadow">
                      Keep your full plate inside the frame
                    </p>
                  )}
                </div>
              </>
            )}

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured meal"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {step === "scanning" && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-4">
                  <Loader2
                    size={96}
                    className="text-[#2e9e3a] animate-spin"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-white font-bold text-lg animate-pulse">
                  Analyzing Meal...
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Detecting items & calories
                </p>
              </div>
            )}
          </div>

          <div
            className="shrink-0 bg-black flex items-center justify-center"
            style={{
              height: "calc(7rem + env(safe-area-inset-bottom))",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {step === "camera" && (
              <button
                onClick={handleCapture}
                type="button"
                aria-label="Capture photo"
                className="w-20 h-20 rounded-full bg-white border-4 border-gray-400 flex items-center justify-center active:scale-90 transition shadow-lg"
              >
                <Camera size={32} className="text-black" />
              </button>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    );
  }

  /* ========== RESULT VIEW ========== */
  const totalCalories = sumCal(currentMeal.items);
  const split = splitMacros(currentMeal.macros);

  return (
    <div
      className="min-h-[100dvh] flex justify-center"
      style={{
        background:
          "linear-gradient(180deg,#e7f1fc 0%,#f2f7fd 45%,#fafcff 100%)",
        fontFamily: "'Nunito','Noto Sans Devanagari',system-ui,sans-serif",
      }}
    >
      <div className="w-full max-w-md min-h-[100dvh] flex flex-col">
        <LightHeader
          tab={tab}
          onTab={setTab}
          count={savedMeals.length}
          onBack={() => navigate("/home")}
        />

        <main className="flex-1 px-4 pt-1 pb-28 flex flex-col gap-3">
          {/* SUCCESS BANNER */}
          <div
            className="rounded-2xl p-3 flex items-center gap-3 border"
            style={{ background: "#e8f5e9", borderColor: "#c8e6c9" }}
          >
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: GREEN }}
            >
              <CheckCircle2
                size={22}
                className="text-white"
                strokeWidth={2.4}
              />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-extrabold text-[#1b5e20] leading-tight">
                Meal Analyzed!
              </p>
              <p className="text-[11px] text-[#2e7d32] mt-0.5">
                Here is the estimated nutritional information
              </p>
            </div>
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Your plate"
                className="w-12 h-12 rounded-xl object-cover border-2 border-white flex-shrink-0"
              />
            )}
          </div>

          {/* HEALTH SCORE */}
          <Card className="flex items-center gap-4">
            <ScoreRing score={currentMeal.score} />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-extrabold" style={{ color: NAVY }}>
                Balanced meal
              </p>
              <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                Good mix of carbs, protein and fiber for a lunch or dinner
                plate.
              </p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20]">
                  Homemade
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#1565c0]">
                  {currentMeal.items.length} items
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff4d6] text-[#8a5a00]">
                  Vegetarian
                </span>
              </div>
            </div>
          </Card>

          {/* ITEMS DETECTED */}
          <Card>
            <div className="flex justify-between items-center mb-3">
              <h2
                className="text-[14px] font-extrabold"
                style={{ color: BLUE }}
              >
                Items Detected
              </h2>
              <span className="text-[11px] font-bold" style={{ color: BLUE }}>
                Calories (kcal)
              </span>
            </div>
            <ul className="flex flex-col">
              {currentMeal.items.map(({ name, qty, cal, icon }) => {
                const Icon = ICONS[icon];
                return (
                  <li
                    key={name}
                    className="flex items-center gap-3 py-2.5 border-b border-[#eef2f8] last:border-0 last:pb-0 first:pt-0"
                  >
                    <div className="w-11 h-11 flex-shrink-0 rounded-xl overflow-hidden">
                      <Icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-bold leading-tight"
                        style={{ color: NAVY }}
                      >
                        {name}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{qty}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className="text-[15px] font-extrabold leading-none"
                        style={{ color: NAVY }}
                      >
                        {cal}
                      </p>
                      <p className="text-[9px] text-gray-400 mt-1">
                        {Math.round((cal / totalCalories) * 100)}%
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* TOTAL CALORIES */}
          <div
            className="rounded-2xl px-4 py-3.5 flex justify-between items-center border"
            style={{ background: "#e8f5e9", borderColor: "#c8e6c9" }}
          >
            <div>
              <p className="text-[16px] font-extrabold text-[#1b5e20] leading-tight">
                Total Calories
              </p>
              <p className="text-[10px] text-[#2e7d32] mt-0.5">
                About {Math.round((totalCalories / DAILY_GOAL) * 100)}% of a{" "}
                {DAILY_GOAL.toLocaleString()} kcal day
              </p>
            </div>
            <p className="text-[24px] font-black text-[#1b5e20] leading-none">
              {totalCalories} <span className="text-[15px]">kcal</span>
            </p>
          </div>

          {/* MACRONUTRIENTS */}
          <Card>
            <h2
              className="text-[14px] font-extrabold mb-3"
              style={{ color: NAVY }}
            >
              Macronutrients (Estimated)
            </h2>
            <div className="flex h-2.5 rounded-full overflow-hidden mb-4 bg-gray-100">
              {split
                .filter((m) => m.percent)
                .map((m) => (
                  <div
                    key={m.key}
                    style={{ width: `${m.percent}%`, background: m.color }}
                    title={`${m.label} ${m.percent}%`}
                  />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {split.map(({ key, label, grams, percent, color, Icon }) => (
                <div key={key} className="flex flex-col items-center">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-1.5"
                    style={{ background: `${color}1f` }}
                  >
                    <Icon color={color} />
                  </span>
                  <span className="text-[10.5px] font-semibold text-gray-500 leading-tight">
                    {label}
                  </span>
                  <span
                    className="text-[16px] font-black mt-1 leading-none"
                    style={{ color }}
                  >
                    {grams} g
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1 h-3">
                    {percent ? `(${percent}%)` : ""}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9.5px] text-gray-400 mt-3 text-center">
              Percentages show share of calories from carbs, protein and fat.
            </p>
          </Card>

          {/* MICRONUTRIENTS */}
          <Card>
            <h2
              className="text-[14px] font-extrabold mb-3"
              style={{ color: NAVY }}
            >
              Key Vitamins & Minerals
            </h2>
            <div className="flex flex-wrap gap-2">
              {micronutrients.map((m) => (
                <span
                  key={m.name}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full border"
                  style={
                    m.level === "Good"
                      ? {
                          background: "#e8f5e9",
                          color: "#1b5e20",
                          borderColor: "#c8e6c9",
                        }
                      : {
                          background: "#fff8e1",
                          color: "#8a5a00",
                          borderColor: "#ffe9a8",
                        }
                  }
                >
                  {m.name} · {m.level}
                </span>
              ))}
            </div>
          </Card>

          {/* AI INSIGHT */}
          <div
            className="rounded-2xl p-3.5 flex items-start gap-3 border"
            style={{ background: "#e3f2fd", borderColor: "#bbdefb" }}
          >
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} style={{ color: BLUE }} />
            </span>
            <div>
              <p className="text-[13px] font-extrabold text-[#1565c0]">
                AI Insight
              </p>
              <p className="text-[12px] text-[#1565c0] font-medium leading-snug mt-1">
                This is a balanced homemade meal. Good fiber content. To reduce
                calories, you can try 1 roti instead of 2 or a smaller portion
                of rice.
              </p>
            </div>
          </div>

          {/* TIP */}
          <div
            className="rounded-2xl p-3 flex items-start gap-2 border"
            style={{ background: "#e8f5e9", borderColor: "#c8e6c9" }}
          >
            <Lightbulb
              size={16}
              className="flex-shrink-0 mt-0.5"
              style={{ color: GREEN }}
            />
            <p className="text-[11px] text-[#1b5e20] font-medium leading-snug">
              Tip: Take a clear photo of your full plate from above for best
              results.
            </p>
          </div>

          <p className="flex items-start gap-1.5 text-[10px] text-gray-400 leading-snug px-1">
            <ShieldCheck size={12} className="flex-shrink-0 mt-px" />
            Values are AI estimates based on typical Indian home portions and
            may vary. Not a substitute for advice from a doctor or dietitian.
          </p>
        </main>

        {/* STICKY ACTIONS */}
        <div className="fixed bottom-0 inset-x-0 flex justify-center z-40 pointer-events-none">
          <div
            className="w-full max-w-md px-4 pt-3 flex gap-3 pointer-events-auto"
            style={{
              paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
              background:
                "linear-gradient(180deg,rgba(250,252,255,0) 0%,rgba(250,252,255,0.95) 35%)",
            }}
          >
            <button
              onClick={handleScanAgain}
              className="flex-1 h-12 rounded-xl bg-white border border-[#cfe0f5] flex items-center justify-center gap-2 text-[13px] font-extrabold active:scale-[0.98] transition"
              style={{ color: NAVY }}
            >
              <RotateCcw size={16} />
              Scan Again
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex-[1.4] h-12 rounded-xl flex items-center justify-center gap-2 text-[13px] font-extrabold text-white active:scale-[0.98] transition disabled:opacity-90"
              style={{ background: saved ? "#1b5e20" : GREEN }}
            >
              {saved ? <CheckCircle2 size={17} /> : <BookmarkPlus size={17} />}
              {saved ? "Saved to Log" : "Save to Food Log"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
