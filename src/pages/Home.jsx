import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Bell,
  Stethoscope,
  Activity,
  BookOpen,
  ClipboardList,
  Pill,
  Camera,
  Flame,
  Folder,
  Calendar,
  BadgeCheck,
  Star,
  Heart,
  Droplet,
  Lightbulb,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Home as HomeIcon,
  CalendarDays,
  ShoppingBag,
  Headset,
  Check,
  Users,
  Smartphone,
  Salad,
  Smile,
  TestTube,
  Percent,
} from "lucide-react";

// ============ LOGO ============
import logo from "../assets/daibmetalogo.jpeg";

// ============ BANNER IMAGES ============
import banner1 from "../assets/banner/homebanner1.png";
import banner2 from "../assets/banner/homebanner2.png";

// ============ QUICK ACTION IMAGES ============
import bookApptImg from "../assets/cards/book-appt.png";
import bmiImg from "../assets/cards/bmi.jpeg";
import diabetesImg from "../assets/cards/diabetes.jpeg";
import sugarImg from "../assets/cards/sugar.jpeg";
import reminderImg from "../assets/cards/reminder.jpeg";
import scanFoodImg from "../assets/cards/scan-food.jpeg";
import caloriesImg from "../assets/cards/calories.jpeg";
import recordsImg from "../assets/cards/records.jpeg";
import periodImg from "../assets/cards/period.jpeg";
import supplementsImg from "../assets/cards/supplements.png";
import devicesImg from "../assets/cards/devices.png";
import knowYourDiseasesImg from "../assets/cards/knowyourdiseases.png";
import knowYourSymptomsImg from "../assets/cards/knowyoursymptoms.png";

// ============ HEALTH TIPS DATA ============
import { healthTipsData } from "./health-tips/HealthTipsData";

// ============ NOTIFICATIONS COMPONENTS & DATA ============
import NotificationDropdown from "./notifications/NotificationDropdown";
import { notificationsData } from "./notifications/NotificationsData";

import Sidebar from "../components/Sidebar";

const BANNERS = [banner1, banner2];

export default function Home() {
  const navigate = useNavigate();
  const [familyOpen, setFamilyOpen] = useState(false);
  const [activeMember, setActiveMember] = useState("Rahul");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);

  // Banner State
  const [bannerIndex, setBannerIndex] = useState(0);
  const scrollRef = useRef(null);

  // Privileges Scroll State
  const privilegeScrollRef = useRef(null);
  const [privilegeIndex, setPrivilegeIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = bannerIndex + 1;
      if (nextIndex >= BANNERS.length) nextIndex = 0;
      setBannerIndex(nextIndex);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: nextIndex * scrollRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerIndex]);

  const handleBannerScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== bannerIndex) setBannerIndex(newIndex);
  };

  const handlePrivilegeScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = 140 + 12; // Card width (w-[140px]) + Gap (gap-3 = 12px)
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== privilegeIndex) setPrivilegeIndex(newIndex);
  };

  const familyMembers = [
    { name: "Rahul", relation: "Self" },
    { name: "Priya", relation: "Wife" },
    { name: "Aarav", relation: "Son" },
    { name: "Sunita", relation: "Mother" },
  ];

  const row1 = [
    { image: bmiImg, title: "BMI", path: "/bmi" },
    { image: diabetesImg, title: "Diabetes", path: "/diabetes" },
    { image: sugarImg, title: "Sugar & BP Logbook", path: "/sugar-bp" },
    {
      image: knowYourDiseasesImg,
      title: "Know Your Diseases",
      path: "/diseases",
    },
    {
      image: knowYourSymptomsImg,
      title: "Know Your Symptoms",
      path: "/symptoms",
    },
  ];

  const row2 = [
    { image: periodImg, title: "Period", path: "/period-tracker/lock" },
    { image: caloriesImg, title: "Calories", path: "/calorie-tracker" },
    { image: scanFoodImg, title: "Scan Food", path: "/scan-food" },
    { image: reminderImg, title: "Pill Reminder", path: "/pill-reminder" },
    { image: recordsImg, title: "Records", path: "/records" },
  ];

  const diagnostics = [
    {
      image: bmiImg,
      title: "Blood & Pathology",
      desc: "HbA1c, Fasting, Lipid",
      path: "/diagnostic/blood-test",
    },
    {
      image: bmiImg,
      title: "ECG Testing",
      desc: "12–Lead Clinical ECG",
      path: "/diagnostic/ecg",
    },
    {
      image: bmiImg,
      title: "USG / X-Ray / CT",
      desc: "Radiology partner slots",
      path: "/diagnostic/xray",
    },
  ];

  const storeServices = [
    {
      image: supplementsImg,
      title: "Supplements",
      desc: "Vitamins & metabolic aids",
      path: "/store?type=supplements",
    },
    {
      image: devicesImg,
      title: "Medical Devices",
      desc: "CGM, strips & BP meters",
      path: "/store?type=devices",
    },
  ];

  // Privileges Data
  const staticPrivilege = {
    title: "Free Monthly Health Checkup",
    icon: <Stethoscope size={24} className="text-[#005c55]" />,
    cta: "Book Checkup",
  };

  const dynamicPrivileges = [
    { title: "Free Monthly Dietitian Consultation", cta: "Book Consultation" },
    { title: "Free Monthly Dental Checkup", cta: "Book Checkup" },
    {
      title: "Free Monthly Physiotherapy Consultation",
      cta: "Book Consultation",
    },
    { title: "Free Quarterly Lab Test", cta: "Book Test" },
    { title: "10% Off on Medicines", cta: "View Store" },
  ];

  const allPrivileges = [
    { ...staticPrivilege, isStatic: true },
    ...dynamicPrivileges.map((p) => ({
      ...p,
      icon: <BadgeCheck size={24} className="text-[#005c55]" />,
      isStatic: false,
    })),
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col relative">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-2 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 rounded-full bg-[#9cf2e8]/60 text-[#005c55] flex items-center justify-center text-[11px] font-bold active:scale-95 flex-shrink-0"
              >
                {activeMember.substring(0, 2).toUpperCase()}
              </button>

              {/* CHANGED: Add Member to Add Family Member */}
              <button
                onClick={() => navigate("/profile/add-member")}
                className="inline-flex items-center gap-1 bg-[#9cf2e8]/60 text-[#005c55] px-2.5 py-1.5 rounded-full text-[11px] font-semibold active:scale-95 flex-shrink-0 whitespace-nowrap ml-1"
              >
                <UserPlus size={13} />
                <span>Add Family Member</span>
              </button>

              {/* REMOVED: Health Guide button */}
            </div>

            {/* NOTIFICATION & LOGO SECTION */}
            <div className="flex items-center gap-1.5 flex-shrink-0 relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-9 h-9 flex items-center justify-center text-gray-500 active:scale-95"
              >
                <Bell size={19} />
                {/* Notification Counter Badge */}
                <span className="absolute top-0.5 right-0.5 min-w-[15px] h-[15px] bg-pink-500 rounded-full ring-2 ring-white flex items-center justify-center text-[9px] text-white font-bold px-0.5">
                  {notificationsData.filter((n) => !n.isRead).length}
                </span>
              </button>

              <img
                src={logo}
                alt="DiabMeta"
                className="h-9 w-auto object-contain"
              />

              {/* Notification Dropdown Popup */}
              <NotificationDropdown
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>
          </div>
        </header>

        <main className="flex-1 pb-24">
          <section className="px-4 pt-5 pb-2 relative">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setFamilyOpen((p) => !p)}
                className="flex items-center gap-1.5 active:scale-95 transition"
              >
                <h1 className="text-[20px] font-bold text-gray-900 tracking-tight truncate">
                  Hello, {activeMember}
                </h1>
                <ChevronDown
                  size={18}
                  className={`text-gray-700 transition-transform ${familyOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {familyOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setFamilyOpen(false)}
                ></div>
                <div className="absolute left-4 top-[54px] z-50 w-56 bg-white rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,0.12)] border border-[#eaedff] overflow-hidden">
                  <div className="px-3 py-2 border-b border-[#eaedff] bg-[#faf8ff]">
                    <p className="text-[10px] font-bold text-[#005c55] uppercase tracking-wide">
                      Switch Member
                    </p>
                  </div>
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {familyMembers.map((m) => (
                      <button
                        key={m.name}
                        onClick={() => {
                          setActiveMember(m.name);
                          setFamilyOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#f4f6fb] active:scale-[0.99] transition"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#9cf2e8]/60 text-[#005c55] flex items-center justify-center text-[12px] font-bold flex-shrink-0">
                          {m.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-[13px] font-semibold text-gray-900 truncate">
                            {m.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {m.relation}
                          </p>
                        </div>
                        {activeMember === m.name && (
                          <Check size={16} className="text-[#005c55]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setFamilyOpen(false);
                      navigate("/profile/add-member");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 border-t border-[#eaedff] text-[#005c55] hover:bg-[#f4f6fb] transition"
                  >
                    <UserPlus size={14} />
                    <span className="text-[12px] font-bold">
                      Add Family Member
                    </span>
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="px-4 mb-4 mt-2">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleBannerScroll}
              style={{ scrollBehavior: "smooth" }}
            >
              {BANNERS.map((banner, i) => (
                <div key={i} className="w-full flex-shrink-0 snap-center px-1">
                  <img
                    src={banner}
                    alt={`Banner ${i + 1}`}
                    className="w-full h-auto max-h-[180px] object-contain rounded-xl"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {BANNERS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setBannerIndex(i);
                    if (scrollRef.current)
                      scrollRef.current.scrollTo({
                        left: i * scrollRef.current.offsetWidth,
                        behavior: "smooth",
                      });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${bannerIndex === i ? "w-4 bg-[#005c55]" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </section>

          <section className="px-4 mb-6 mt-1">
            <div className="flex gap-2.5 items-stretch">
              <div
                className="flex-shrink-0 w-[110px] h-[220px] bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eaedff] overflow-hidden flex flex-col justify-between active:scale-[0.98] transition cursor-pointer"
                onClick={() => navigate("/appointment")}
              >
                <div className="w-full h-[60%] flex items-center justify-center overflow-hidden bg-[#f4f6fb] border-b border-[#f0f2f8]">
                  <img
                    src={bookApptImg}
                    alt="Book Appointment"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full h-[40%] px-2 py-2 flex flex-col justify-between items-center text-center">
                  <div className="flex flex-col items-center justify-center h-full mb-2">
                    <p className="text-[9.5px] text-gray-700 font-bold leading-tight">
                      Book Doctor
                      <br />
                      Consultation
                    </p>
                  </div>

                  <div className="w-full py-1.5 bg-[#0d6b63] text-white text-[8px] font-bold rounded-lg flex items-center justify-center text-center leading-tight gap-1">
                    <span>
                      Book
                      <br />
                      Appointment
                    </span>
                    <ArrowRight size={10} />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-2 justify-between">
                <div className="flex overflow-x-auto gap-2 py-0.5 scrollbar-hide snap-x snap-mandatory">
                  {row1.map((c, i) => (
                    <MiniCard
                      key={i}
                      image={c.image}
                      title={c.title}
                      onClick={() => c.path && navigate(c.path)}
                    />
                  ))}
                </div>
                <div className="flex overflow-x-auto gap-2 py-0.5 scrollbar-hide snap-x snap-mandatory">
                  {row2.map((c, i) => (
                    <MiniCard
                      key={i}
                      image={c.image}
                      title={c.title}
                      onClick={() => c.path && navigate(c.path)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* CLINIC PRIVILEGES                          */}
          {/* ========================================== */}
          <section className="mb-6">
            <div className="px-4 flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg border border-[#005c55]/30 flex items-center justify-center text-[#005c55] flex-shrink-0">
                <Star size={20} fill="#005c55" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 leading-tight">
                  DiabMeta Clinic Patient Privileges
                </h2>
              </div>
            </div>

            <div
              ref={privilegeScrollRef}
              onScroll={handlePrivilegeScroll}
              className="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide px-4 pb-2"
              style={{ scrollPaddingLeft: "16px" }}
            >
              {allPrivileges.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[140px] flex-shrink-0 bg-white rounded-2xl border border-[#eaedff] p-3 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.04)] snap-start"
                >
                  <div className="w-10 h-10 rounded-full bg-[#f4f6fb] flex items-center justify-center mb-2.5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="text-[12px] font-bold text-gray-900 leading-[1.25] mb-2.5 flex-1 line-clamp-2">
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <span className="text-[9px] font-extrabold text-[#0d6b63] truncate pr-1">
                      {item.cta}
                    </span>
                    <ArrowRight
                      size={12}
                      className="text-[#0d6b63] flex-shrink-0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-1.5 mt-2">
              {allPrivileges.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${privilegeIndex === i ? "w-4 bg-[#005c55]" : "w-1.5 bg-gray-300"}`}
                ></div>
              ))}
            </div>
          </section>

          {/* ========================================== */}
          {/* DIAGNOSTIC & CLINIC SERVICES & TIPS        */}
          {/* ========================================== */}
          <section className="px-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg border border-[#005c55]/30 flex items-center justify-center text-[#005c55]">
                  <Stethoscope size={20} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-gray-900 leading-tight">
                    Diagnostic & Clinic Services
                  </h2>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Certified testing, labs & health guidance
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="text-[12px] text-[#005c55] font-bold hover:underline flex-shrink-0"
              >
                View All
              </a>
            </div>

            <div className="grid grid-cols-[1.25fr_0.75fr] gap-2">
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  {diagnostics.map((d, i) => (
                    <DiagnosticRow
                      key={i}
                      image={d.image}
                      title={d.title}
                      desc={d.desc}
                      onClick={() => d.path && navigate(d.path)}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2 mt-[10px]">
                  {storeServices.map((d, i) => (
                    <DiagnosticRow
                      key={i}
                      image={d.image}
                      title={d.title}
                      desc={d.desc}
                      onClick={() => d.path && navigate(d.path)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-2xl border border-[#eaedff] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-md bg-[#E0F2F1] text-[#005c55] flex items-center justify-center">
                        <Lightbulb size={13} />
                      </div>
                      <h4 className="text-[11px] font-bold text-gray-900">
                        Tips
                      </h4>
                    </div>
                    <span className="text-[8.5px] font-semibold text-[#005c55] bg-[#E0F2F1] px-1.5 py-0.5 rounded-full">
                      Daily
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {healthTipsData.slice(0, 4).map((tip) => (
                      <button
                        key={tip.id}
                        onClick={() => navigate(`/health-tips/${tip.id}`)}
                        className="bg-[#F4F6FB] p-1.5 rounded-lg flex flex-col text-left active:scale-[0.98] transition"
                      >
                        <div className="flex items-center justify-between leading-none">
                          <span
                            className={`text-[8px] font-bold ${tip.tagColor} tracking-wide uppercase`}
                          >
                            {tip.tag}
                          </span>
                          <span className="text-[8px] text-gray-500">
                            {tip.time}
                          </span>
                        </div>
                        <h5 className="text-[10px] font-bold text-gray-900 mt-0.5 leading-tight">
                          {tip.title}
                        </h5>
                        <p className="text-[8.5px] text-gray-500 leading-tight mt-0.5 line-clamp-1">
                          {tip.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t border-[#eaedff] text-center">
                  <button
                    onClick={() => navigate("/health-tips")}
                    className="text-[10px] font-bold text-[#005c55] hover:underline inline-flex items-center gap-0.5"
                  >
                    All Tips <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(15,23,42,0.05)] pb-safe">
          <div className="max-w-md mx-auto flex items-stretch justify-around h-16 px-1">
            <button
              onClick={() => navigate("/home")}
              className="flex flex-col items-center justify-center flex-1 min-w-0 py-2 cursor-pointer text-[#005c55]"
            >
              <HomeIcon size={20} className="mb-1" />
              <span className="text-[9px] font-extrabold leading-tight truncate w-full text-center px-0.5">
                Home
              </span>
            </button>

            <NavItem
              icon={<CalendarDays size={20} />}
              label="Appointment"
              onClick={() => navigate("/appointment")}
            />

            <button
              onClick={() => navigate("/quiz")}
              className="flex flex-col items-center justify-center flex-1 min-w-0 py-2 cursor-pointer group"
            >
              <ClipboardList
                size={20}
                className="text-[#2563EB] animate-quiz-pulse mb-1"
              />
              <span className="text-[9px] font-extrabold text-[#2563EB] animate-quiz-pulse leading-tight truncate w-full text-center px-0.5">
                Quiz
              </span>
            </button>

            <NavItem
              icon={<Headset size={20} />}
              label="About Us"
              onClick={() => navigate("/contact")}
            />
            <NavItem
              icon={<ShoppingBag size={20} />}
              label="Store"
              onClick={() => navigate("/store")}
            />
          </div>
        </nav>
      </div>

      <style>{`
        @keyframes quiz-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        .animate-quiz-pulse {
          animation: quiz-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ============ Mini Card ============ */
function MiniCard({ image, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[78px] h-[105px] flex-shrink-0 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eaedff] flex flex-col items-center overflow-hidden active:scale-[0.96] transition snap-start"
    >
      <div className="w-full h-[65%] flex items-center justify-center overflow-hidden bg-[#f4f6fb] border-b border-[#f0f2f8]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[35%] flex items-center justify-center px-1">
        <h4 className="text-[9px] font-bold text-gray-900 leading-[1.15] text-center line-clamp-2">
          {title}
        </h4>
      </div>
    </button>
  );
}

/* ============ Diagnostic Row ============ */
function DiagnosticRow({ image, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#eaedff] flex items-center gap-2 p-2 cursor-pointer active:scale-[0.99] transition"
    >
      <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#f4f6fb] flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[11px] font-bold text-gray-900 leading-tight truncate">
          {title}
        </h3>
        <p className="text-[9px] text-gray-500 leading-tight mt-0.5 truncate">
          {desc}
        </p>
      </div>
      <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 min-w-0 py-2 cursor-pointer transition-colors ${active ? "text-[#005c55] font-bold" : "text-gray-500 hover:text-[#005c55]"}`}
    >
      {icon}
      <span className="text-[9px] leading-tight mt-1 truncate w-full text-center px-0.5">
        {label}
      </span>
    </button>
  );
}
