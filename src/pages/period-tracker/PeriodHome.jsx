import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Calendar,
  Droplet,
  BarChart2,
  Bell,
  BookOpen,
  Info,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function PeriodHome() {
  const navigate = useNavigate();

  const calendarDays = [
    { d: 27, prev: true },
    { d: 28, prev: true },
    { d: 29, prev: true },
    { d: 30, prev: true },
    { d: 1 },
    { d: 2 },
    { d: 3 },
    { d: 4 },
    { d: 5 },
    { d: 6 },
    { d: 7 },
    { d: 8 },
    { d: 9 },
    { d: 10 },
    { d: 11, type: "period" },
    { d: 12, type: "period" },
    { d: 13, type: "period" },
    { d: 14, type: "period" },
    { d: 15 },
    { d: 16 },
    { d: 17 },
    { d: 18, type: "today" },
    { d: 19 },
    { d: 20 },
    { d: 21 },
    { d: 22 },
    { d: 23 },
    { d: 24 },
    { d: 25 },
    { d: 26 },
    { d: 27 },
    { d: 28, type: "expected" },
    { d: 29, type: "expected" },
    { d: 30, type: "expected" },
    { d: 31 },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito">
      {/* HEADER (Logo on Right) */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-40">
        <button
          onClick={() => navigate("/period-tracker/lock")}
          className="p-1 w-8"
        >
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-[17px] font-black text-[#1a237e]">
            My Period Tracker
          </h1>
          <p className="text-[11px] text-gray-500 font-medium">
            Track your cycle, symptoms and stay informed.
          </p>
        </div>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {/* CALENDAR */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-black text-[#1a237e]">
              October 2026
            </h2>
            <div className="flex gap-3 text-[#1a237e]">
              <ChevronLeft size={18} className="cursor-pointer" />
              <ChevronRight size={18} className="cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-7 text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <div key={i} className="text-[11px] font-bold text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center">
            {calendarDays.map((item, idx) => {
              let cls =
                "w-8 h-8 mx-auto flex items-center justify-center text-xs font-semibold rounded-full ";
              if (item.prev) cls += "text-gray-300";
              else if (item.type === "period") cls += "bg-[#e91e63] text-white";
              else if (item.type === "today")
                cls += "bg-[#bbdefb] text-[#1a237e]";
              else if (item.type === "expected")
                cls += "bg-[#fce4ec] text-[#e91e63]";
              else cls += "text-[#1a237e]";
              return (
                <div key={idx} className={cls}>
                  {item.d}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-5 text-[11px] text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#e91e63]"></span>Period
              days
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#fce4ec]"></span>
              Expected period
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#bbdefb]"></span>Today
            </div>
          </div>
        </div>

        {/* NEXT PERIOD */}
        <div className="bg-[#fce4ec] rounded-xl border border-pink-100 p-4 flex items-center gap-3 mb-5 shadow-sm relative">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <Calendar size={24} className="text-[#e91e63]" />
          </div>
          <div>
            <p className="text-[12px] text-gray-600 font-medium">
              Next expected period
            </p>
            <p className="text-[18px] font-black text-[#1a237e]">
              28 October 2026
            </p>
            <p className="text-[13px] text-[#1a237e] font-bold">In 10 days</p>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">
              Estimated from your previous cycle details.
            </p>
          </div>
          {/* Settings Icon shifted here */}
          <button className="absolute top-3 right-3 p-1.5 bg-white/60 rounded-full text-[#1a237e]">
            <Settings size={16} />
          </button>
        </div>

        {/* GRID NAVIGATION */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <NavCard
            title="Period Log"
            sub="Bleeding, symptoms & mood"
            icon={
              <Droplet size={20} className="text-[#e91e63]" fill="#e91e63" />
            }
            bg="bg-pink-50"
            onClick={() => navigate("/period-tracker/daily-log")}
          />
          <NavCard
            title="Cycle Insights"
            sub="Patterns, trends & records"
            icon={<BarChart2 size={20} className="text-green-600" />}
            bg="bg-green-50"
            onClick={() => navigate("/period-tracker/insights")}
          />
          <NavCard
            title="Reminders"
            sub="Manage period alerts"
            icon={<Bell size={20} className="text-orange-500" fill="#f97316" />}
            bg="bg-orange-50"
            onClick={() => navigate("/period-tracker/reminders")}
          />
          <NavCard
            title="Period Health Guide"
            sub="Tips, self-care & when to consult a doctor"
            icon={
              <BookOpen size={20} className="text-purple-600" fill="#9333ea" />
            }
            bg="bg-purple-50"
            onClick={() => navigate("/period-tracker/health-guide")}
          />
        </div>

        <div className="bg-[#e3f2fd] rounded-xl p-4 flex items-start gap-3">
          <Info size={20} className="text-[#2196F3] flex-shrink-0 mt-0.5" />
          <p className="text-[11.5px] text-[#1a237e] font-medium leading-relaxed">
            Period predictions are estimates and may vary, especially with
            irregular cycles.
          </p>
        </div>
      </main>
    </div>
  );
}

function NavCard({ title, sub, icon, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-3.5 flex flex-col justify-between text-left h-[110px] shadow-sm active:scale-[0.98] transition"
    >
      <div className="flex items-center justify-between w-full">
        <div
          className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}
        >
          {icon}
        </div>
        <ChevronRight size={18} className="text-[#e91e63]" />
      </div>
      <div className="mt-2">
        <p className="text-[14px] font-extrabold text-[#1a237e] leading-tight">
          {title}
        </p>
        <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">
          {sub}
        </p>
      </div>
    </button>
  );
}
