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
import diseaseImg from "../assets/cards/disease.png";
import reminderImg from "../assets/cards/reminder.jpeg";
import scanFoodImg from "../assets/cards/scan-food.jpeg";
import caloriesImg from "../assets/cards/calories.jpeg";
import recordsImg from "../assets/cards/records.png";
import periodImg from "../assets/cards/period.jpeg";
import supplementsImg from "../assets/cards/supplements.png";
import devicesImg from "../assets/cards/devices.png";

import Sidebar from "../components/Sidebar";

const BANNERS = [banner1, banner2];

export default function Home() {
  const navigate = useNavigate();
  const [familyOpen, setFamilyOpen] = useState(false);
  const [activeMember, setActiveMember] = useState("Rahul");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Banner State
  const [bannerIndex, setBannerIndex] = useState(0);
  const scrollRef = useRef(null);

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

  const familyMembers = [
    { name: "Rahul", relation: "Self" },
    { name: "Priya", relation: "Wife" },
    { name: "Aarav", relation: "Son" },
    { name: "Sunita", relation: "Mother" },
  ];

  const row1 = [
    { image: bmiImg, title: "BMI", path: "/bmi" },
    { image: diabetesImg, title: "Diabetes", path: "/diabetes" },
    { image: sugarImg, title: "Sugar" },
    { image: diseaseImg, title: "Disease" },
  ];

  const row2 = [
    { image: reminderImg, title: "Reminder" },
    { image: scanFoodImg, title: "Scan Food" },
    { image: caloriesImg, title: "Calories" },
    { image: recordsImg, title: "Records" },
    { image: periodImg, title: "Period" },
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
      path: "/store",
    },
    {
      image: devicesImg,
      title: "Medical Devices",
      desc: "CGM, strips & BP meters",
      path: "/store",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col relative">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-2 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 rounded-full bg-[#9cf2e8]/60 text-[#005c55] flex items-center justify-center text-[11px] font-bold active:scale-95 flex-shrink-0"
              >
                {activeMember.substring(0, 2).toUpperCase()}
              </button>

              <button className="inline-flex items-center gap-1 bg-[#9cf2e8]/60 text-[#005c55] px-2.5 py-1.5 rounded-full text-[11px] font-semibold active:scale-95 flex-shrink-0 whitespace-nowrap ml-1">
                <UserPlus size={13} />
                <span>Add Member</span>
              </button>

              <button className="inline-flex items-center gap-1 bg-[#9cf2e8]/60 text-[#005c55] px-2.5 py-1.5 rounded-full text-[11px] font-semibold active:scale-95 flex-shrink-0 whitespace-nowrap">
                <span>Health Guide</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 active:scale-95">
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
              </button>
              <img
                src={logo}
                alt="DiabMeta"
                className="h-9 w-auto object-contain"
              />
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-24">
          {/* Greeting */}
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
                  <button className="w-full flex items-center gap-2 px-3 py-2.5 border-t border-[#eaedff] text-[#005c55] hover:bg-[#f4f6fb] transition">
                    <UserPlus size={14} />
                    <span className="text-[12px] font-bold">Add Member</span>
                  </button>
                </div>
              </>
            )}
          </section>

          {/* Banner Slider */}
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

          {/* Quick Actions */}
          <section className="px-4 mb-6 mt-1">
            <div className="flex gap-2.5 items-stretch">
              {/* BOOK APPOINTMENT TALL CARD */}
              <div
                className="flex-shrink-0 w-[110px] h-[220px] bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eaedff] overflow-hidden flex flex-col justify-between active:scale-[0.98] transition cursor-pointer"
                onClick={() => navigate("/appointment")}
              >
                {/* 60% Image Area */}
                <div className="w-full h-[60%] flex items-center justify-center overflow-hidden bg-[#f4f6fb] border-b border-[#f0f2f8]">
                  <img
                    src={bookApptImg}
                    alt="Book Appointment"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 40% Text & Button Area */}
                <div className="w-full h-[40%] px-2 py-2 flex flex-col justify-between items-center text-center">
                  {/* Sub-heading (3-4 words) */}
                  <div className="flex flex-col items-center justify-center h-full mb-2">
                    <p className="text-[9.5px] text-gray-700 font-bold leading-tight">
                      Book Doctor
                      <br />
                      Consultation
                    </p>
                  </div>

                  {/* Green Button with Arrow (2 Line Text) */}
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

              {/* RIGHT SIDE (Mini Cards) */}
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

          {/* Clinic Patient Privileges */}
          <section className="px-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <BadgeCheck size={18} className="text-[#005c55]" />
                <h3 className="text-[13px] font-bold text-gray-900">
                  Clinic Patient Privileges
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#005c55] bg-[#9cf2e8]/50 px-2 py-0.5 rounded-full">
                DiabMeta Exclusive
              </span>
            </div>
            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4">
              <PrivilegeCard
                icon={<Star size={16} />}
                iconBg="bg-[#005c55]"
                iconColor="text-white"
                tag="Special"
                tagColor="text-[#005c55] bg-[#9cf2e8]/50"
                title="Only for DiabMeta Clinic Pt."
                desc="Exclusive privileges & premium clinic care."
                cta="View Benefits"
              />
              <PrivilegeCard
                icon={<Stethoscope size={16} />}
                iconBg="bg-[#E0F2F1]"
                iconColor="text-[#005c55]"
                tag="100% Free"
                tagColor="text-[#00695C] bg-[#E0F2F1]"
                title="Free Monthly Health Checkup"
                desc="Routine clinical vitals & sugar screening."
                cta="Book Checkup"
              />
              <PrivilegeCard
                icon={<Droplet size={16} />}
                iconBg="bg-[#EDE7F6]"
                iconColor="text-[#7E57C2]"
                tag="Free Advice"
                tagColor="text-[#932265] bg-[#ffd8e7]"
                title="Free Dietician Opinion"
                desc="Personalized meal chart from nutritionist."
                cta="Consult Now"
              />
            </div>
          </section>

          {/* Diagnostic & Clinic Services */}
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
                    <TipItem
                      tag="POST-MEAL"
                      tagColor="text-[#00695C]"
                      time="2 min"
                      title="10–Min Stroll"
                      desc="Blunts glucose spikes by 22%."
                      bg="bg-[#F4F6FB]"
                    />
                    <TipItem
                      tag="HYDRATION"
                      tagColor="text-[#3949AB]"
                      time="1 min"
                      title="Water"
                      desc="Dilutes sugar levels."
                      bg="bg-[#F4F6FB]"
                    />
                    <TipItem
                      tag="DIET SWAP"
                      tagColor="text-[#C2185B]"
                      time="2 min"
                      title="Protein First"
                      desc="Eat fiber before carbs."
                      bg="bg-[#FDF2F4]"
                    />
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t border-[#eaedff] text-center">
                  <a
                    href="#"
                    className="text-[10px] font-bold text-[#005c55] hover:underline inline-flex items-center gap-0.5"
                  >
                    All Tips <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* BOTTOM NAV */}
        <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(15,23,42,0.05)]">
          <div className="max-w-md mx-auto flex items-stretch justify-around h-16 px-1">
            <NavItem
              icon={<HomeIcon size={20} />}
              label="Home"
              active
              onClick={() => navigate("/home")}
            />
            <NavItem
              icon={<CalendarDays size={20} />}
              label="Appointment"
              onClick={() => navigate("/appointment")}
            />
            <NavItem icon={<ClipboardList size={20} />} label="Quiz" />
            <NavItem icon={<Headset size={20} />} label="Contact" />
            <NavItem
              icon={<ShoppingBag size={20} />}
              label="Store"
              onClick={() => navigate("/store")}
            />
          </div>
        </nav>
      </div>
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
      <div className="w-full h-[70%] flex items-center justify-center overflow-hidden bg-[#f4f6fb] border-b border-[#f0f2f8]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[30%] flex items-center justify-center px-1">
        <h4 className="text-[10px] font-bold text-gray-900 leading-tight text-center truncate">
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

function PrivilegeCard({
  icon,
  iconBg,
  iconColor,
  tag,
  tagColor,
  title,
  desc,
  cta,
}) {
  return (
    <div className="flex-shrink-0 w-[170px] p-3 rounded-2xl border border-[#005c55]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)] bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div
            className={`w-7 h-7 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}
          >
            {icon}
          </div>
          <span
            className={`text-[8.5px] font-bold ${tagColor} px-1.5 py-0.5 rounded`}
          >
            {tag}
          </span>
        </div>
        <h4 className="text-[11px] font-bold text-gray-900 leading-tight">
          {title}
        </h4>
        <p className="text-[9px] text-gray-500 mt-1 leading-snug line-clamp-2">
          {desc}
        </p>
      </div>
      <div className="mt-2 pt-1 flex items-center justify-between text-[#005c55] font-bold text-[10px]">
        <span>{cta}</span>
        <ArrowRight size={13} />
      </div>
    </div>
  );
}

function TipItem({ tag, tagColor, time, title, desc, bg }) {
  return (
    <div className={`${bg} p-1.5 rounded-lg flex flex-col`}>
      <div className="flex items-center justify-between leading-none">
        <span
          className={`text-[8px] font-bold ${tagColor} tracking-wide uppercase`}
        >
          {tag}
        </span>
        <span className="text-[8px] text-gray-500">{time}</span>
      </div>
      <h5 className="text-[10px] font-bold text-gray-900 mt-0.5 leading-tight">
        {title}
      </h5>
      <p className="text-[8.5px] text-gray-500 leading-tight mt-0.5">{desc}</p>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 min-w-0 py-2 ${active ? "text-[#005c55] font-bold" : "text-gray-500 hover:text-[#005c55]"}`}
    >
      {icon}
      <span className="text-[9px] leading-tight mt-1 truncate w-full text-center px-0.5">
        {label}
      </span>
    </button>
  );
}
