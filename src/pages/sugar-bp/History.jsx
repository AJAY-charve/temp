import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

const SUGAR_TYPES = [
  { key: "fasting", label: "Fasting", bg: "#e0eefc" },
  { key: "postBreakfast", label: "Post Breakfast", bg: "#e4f4e8" },
  { key: "beforeLunch", label: "Before Lunch", bg: "#fdf1d3" },
  { key: "postLunch", label: "Post Lunch", bg: "#fde3e3" },
  { key: "beforeDinner", label: "Before Dinner", bg: "#EDE7F6" },
  { key: "postDinner", label: "Post Dinner", bg: "#E0F7FA" },
  { key: "random", label: "Random", bg: "#f5f5f5" },
];

const SUGAR_LOGS = [
  {
    id: 1,
    date: "20 Oct 2026",
    day: "Tue",
    logs: { fasting: 126, postBreakfast: 168, postLunch: 142, postDinner: 118 },
  },
  {
    id: 2,
    date: "18 Oct 2026",
    day: "Sun",
    logs: { fasting: 110, postLunch: 164, beforeDinner: 138 },
  },
  {
    id: 3,
    date: "16 Oct 2026",
    day: "Fri",
    logs: { fasting: 142, postBreakfast: 196, beforeDinner: 158 },
  },
  {
    id: 4,
    date: "14 Oct 2026",
    day: "Wed",
    logs: { fasting: 98, postBreakfast: 134, beforeDinner: 120 },
  },
];

const BP_LOGS = [
  { id: 1, date: "20 Oct 2026", time: "8:15 AM", sys: 120, dia: 80 },
  { id: 2, date: "18 Oct 2026", time: "7:30 AM", sys: 118, dia: 76 },
  { id: 3, date: "16 Oct 2026", time: "7:45 PM", sys: 124, dia: 82 },
  { id: 4, date: "14 Oct 2026", time: "8:20 AM", sys: 136, dia: 84 },
];

const getSugarColor = (type, val) => {
  if (!val) return "text-gray-400";
  if (val < 70) return "text-[#ef5350]";
  const isBeforeMeal = ["fasting", "beforeLunch", "beforeDinner"].includes(
    type,
  );
  if (isBeforeMeal) {
    return val <= 130 ? "text-[#2e9e48]" : "text-[#ef5350]";
  }
  return val <= 160 ? "text-[#2e9e48]" : "text-[#ef5350]";
};

export default function History() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialTab = query.get("tab") || "sugar";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/sugar-bp")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              Logbook History
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* TABS: Only Sugar & BP */}
          <div className="flex px-4 pb-3 gap-2">
            <button
              onClick={() => setActiveTab("sugar")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${
                activeTab === "sugar"
                  ? "bg-[#ef5350] text-white shadow-sm"
                  : "bg-[#f4f5fb] text-gray-500"
              }`}
            >
              Sugar Logs
            </button>
            <button
              onClick={() => setActiveTab("bp")}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition ${
                activeTab === "bp"
                  ? "bg-[#2f8cf0] text-white shadow-sm"
                  : "bg-[#f4f5fb] text-gray-500"
              }`}
            >
              BP Logs
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-3">
          {/* SUGAR TABLE */}
          {activeTab === "sugar" && (
            <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[700px]">
                  <div className="flex bg-[#faf8ff] border-b border-[#eaedff] p-2">
                    <div className="w-24 flex-none px-1 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      Date
                    </div>
                    {SUGAR_TYPES.map((t) => (
                      <div
                        key={t.key}
                        className="flex-1 px-1 text-center text-[9px] font-bold text-gray-500 uppercase tracking-wide leading-tight"
                      >
                        {t.label}
                      </div>
                    ))}
                    <div className="w-16 flex-none text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      Action
                    </div>
                  </div>

                  {SUGAR_LOGS.map((row) => (
                    <div
                      key={row.id}
                      className="flex border-b border-[#f0f2f8] last:border-0 p-2 items-center"
                    >
                      <div className="w-24 flex-none px-1">
                        <p className="text-[12px] font-bold text-[#14284b]">
                          {row.date}
                        </p>
                        <p className="text-[10px] text-gray-400">{row.day}</p>
                      </div>
                      {SUGAR_TYPES.map((t) => {
                        const val = row.logs[t.key];
                        const color = getSugarColor(t.key, val);
                        return (
                          <div
                            key={t.key}
                            className="flex-1 px-1 flex flex-col items-center justify-center"
                          >
                            {val ? (
                              <div
                                className="w-full rounded-lg py-1.5 flex flex-col items-center"
                                style={{ backgroundColor: t.bg }}
                              >
                                <span
                                  className={`text-[13px] font-black ${color}`}
                                >
                                  {val}
                                </span>
                                <span className="text-[7px] text-gray-500 font-bold mt-0.5">
                                  mg/dL
                                </span>
                              </div>
                            ) : (
                              <span className="text-[14px] text-gray-300">
                                —
                              </span>
                            )}
                          </div>
                        );
                      })}
                      <div className="w-16 flex-none flex items-center justify-center gap-2">
                        <button className="text-[#2f8cf0] active:scale-90">
                          <Edit3 size={16} />
                        </button>
                        <button className="text-[#ef5350] active:scale-90">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BP LIST */}
          {activeTab === "bp" && (
            <div className="flex flex-col gap-3">
              {BP_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#eaedff] shadow-sm flex items-center gap-3"
                >
                  <div className="w-[85px] flex-none border-r border-gray-100 pr-2">
                    <p className="text-[12px] font-bold text-[#14284b]">
                      {log.date}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {log.time}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center gap-3 pl-1">
                    <div>
                      <p className="text-[9px] font-bold text-[#2f8cf0] mb-1">
                        BP
                      </p>
                      <div className="bg-[#e0eefc] px-3 py-1 rounded-lg flex items-baseline gap-1">
                        <p className="text-[16px] font-black text-[#14284b] leading-none">
                          {log.sys}
                        </p>
                        <p className="text-[16px] font-black text-[#14284b] leading-none">
                          / {log.dia}
                        </p>
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-500 font-bold mt-3">
                      mmHg
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-l border-gray-100 pl-3">
                    <button className="text-[#2f8cf0] active:scale-90">
                      <Edit3 size={16} />
                    </button>
                    <button className="text-[#ef5350] active:scale-90">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
