import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Bell,
  CircleUserRound,
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
  ScanLine,
  Syringe,
  Smartphone,
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
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function Home() {
  const navigate = useNavigate();
  const [familyOpen, setFamilyOpen] = useState(false);
  const [activeMember, setActiveMember] = useState("Rahul");

  const familyMembers = [
    { name: "Rahul", relation: "Self" },
    { name: "Priya", relation: "Wife" },
    { name: "Aarav", relation: "Son" },
    { name: "Sunita", relation: "Mother" },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col">
        {/* ============ HEADER ============ */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9cf2e8]/60 text-[#005c55] active:scale-95">
                <CircleUserRound size={20} />
              </button>
              <button className="inline-flex items-center gap-1.5 bg-[#9cf2e8]/60 text-[#005c55] px-3 py-1.5 rounded-full text-[12px] font-semibold active:scale-95">
                <UserPlus size={14} />
                <span>Add Member</span>
              </button>
              <button className="inline-flex items-center gap-1.5 bg-[#9cf2e8]/60 text-[#005c55] px-3 py-1.5 rounded-full text-[12px] font-semibold active:scale-95">
                <span>Health Guide</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 active:scale-95">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
              </button>
              <img
                src={logo}
                alt="DiabMeta"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </header>

        {/* ============ MAIN ============ */}
        <main className="flex-1 pb-24">
          {/* Greeting with Family Member dropdown */}
          <section className="px-4 pt-5 pb-2 relative">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-[20px] font-bold text-gray-900 tracking-tight truncate">
                Hello, {activeMember}
              </h1>

              <button
                onClick={() => setFamilyOpen((p) => !p)}
                className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#9cf2e8]/60 text-[#005c55] px-3 py-1.5 rounded-full text-[12px] font-semibold active:scale-95 border border-[#005c55]/15"
              >
                <Users size={14} />
                <span>Family Member</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    familyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {familyOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setFamilyOpen(false)}
                ></div>

                <div className="absolute right-4 top-[54px] z-50 w-56 bg-white rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,0.12)] border border-[#eaedff] overflow-hidden">
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

          {/* Quick Actions */}
          <section className="px-4 mb-6 mt-1">
            <div className="flex gap-2.5 items-stretch">
              {/* Book Appt tall card */}
              <div className="flex-shrink-0 w-[122px] bg-white rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] border border-[#eaedff] p-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-[#9cf2e8] flex items-center justify-center text-[#005c55]">
                      <Stethoscope size={16} />
                    </div>
                    <span className="text-[8.5px] font-bold text-white bg-[#005c55] px-1.5 py-0.5 rounded">
                      TOP
                    </span>
                  </div>
                  <h3 className="text-[13px] font-bold text-gray-900 leading-tight">
                    Book Appt.
                  </h3>
                  <p className="text-[10px] font-semibold text-[#005c55] mt-0.5">
                    Doctor Consult
                  </p>
                  <p className="text-[9px] text-gray-500 mt-1 leading-snug line-clamp-2">
                    Endocrinologists & Diabetologists
                  </p>
                </div>
                <button
                  onClick={() => navigate("/appointment")}
                  className="mt-2 w-full h-7 bg-[#005c55] text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-0.5 active:scale-95"
                >
                  Book Now <ArrowRight size={12} />
                </button>
              </div>

              {/* Right: 2 scrollable rows */}
              <div className="flex-1 min-w-0 flex flex-col gap-2 justify-between">
                <div className="flex overflow-x-auto gap-2 py-0.5 scrollbar-hide">
                  <QCard
                    icon={<Activity size={20} />}
                    iconBg="bg-[#9cf2e8]"
                    iconColor="text-[#005c55]"
                    title="BMI"
                    desc="Check Your BMI Level"
                    onClick={() => navigate("/bmi")}
                  />
                  <QCard
                    icon={<Heart size={20} />}
                    iconBg="bg-[#dce1ff]"
                    iconColor="text-[#4059aa]"
                    title="Diabetes"
                    desc="Check diabetes"
                  />
                  <QCard
                    icon={<BookOpen size={20} />}
                    iconBg="bg-[#ffd8e7]"
                    iconColor="text-[#932265]"
                    title="Sugar"
                    desc="Log sugar & BP"
                  />
                  <QCard
                    icon={<ClipboardList size={20} />}
                    iconBg="bg-[#9cf2e8]"
                    iconColor="text-[#005c55]"
                    title="Disease"
                    desc="Guide & care tips"
                  />
                </div>

                <div className="flex overflow-x-auto gap-2 py-0.5 scrollbar-hide">
                  <QCard
                    icon={<Pill size={20} />}
                    iconBg="bg-[#9cf2e8]"
                    iconColor="text-[#005c55]"
                    title="Reminder"
                    desc="Medicine alerts"
                  />
                  <QCard
                    icon={<Camera size={20} />}
                    iconBg="bg-[#dce1ff]"
                    iconColor="text-[#4059aa]"
                    title="Scan Food"
                    desc="Scan your meal"
                  />
                  <QCard
                    icon={<Flame size={20} />}
                    iconBg="bg-[#ffd8e7]"
                    iconColor="text-[#932265]"
                    title="Calories"
                    desc="Track your food"
                  />
                  <QCard
                    icon={<Folder size={20} />}
                    iconBg="bg-[#9cf2e8]"
                    iconColor="text-[#005c55]"
                    title="Records"
                    desc="Cloud locker"
                  />
                  <QCard
                    icon={<Calendar size={20} />}
                    iconBg="bg-[#ffd8e7]"
                    iconColor="text-[#932265]"
                    title="Period"
                    desc="Cycle log"
                  />
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
                  <h2 className="text-[16px] font-bold text-gray-900 leading-tight">
                    Diagnostic & Clinic Services
                  </h2>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Certified testing, labs & health guidance
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="text-[12px] text-[#005c55] font-bold hover:underline"
              >
                View All
              </a>
            </div>

            <div className="grid grid-cols-[1.25fr_0.75fr] gap-2">
              <div className="flex flex-col gap-2">
                <ServiceRow
                  icon={<Droplet size={18} />}
                  iconBg="bg-[#EDE7F6]"
                  iconColor="text-[#7E57C2]"
                  title="Blood & Pathology"
                  desc="HbA1c, Fasting, Lipid"
                />
                <ServiceRow
                  icon={<Heart size={18} />}
                  iconBg="bg-[#E0F2F1]"
                  iconColor="text-[#00897B]"
                  title="ECG Testing"
                  desc="12–Lead Clinical ECG"
                />
                <ServiceRow
                  icon={<ScanLine size={18} />}
                  iconBg="bg-[#E8EAF6]"
                  iconColor="text-[#3F51B5]"
                  title="USG / X-Ray / CT"
                  desc="Radiology partner slots"
                />
                <ServiceRow
                  icon={<Syringe size={18} />}
                  iconBg="bg-[#E0F7FA]"
                  iconColor="text-[#0097A7]"
                  title="Supplements"
                  desc="Vitamins & metabolic aids"
                />
                <ServiceRow
                  icon={<Smartphone size={18} />}
                  iconBg="bg-[#E8EAF6]"
                  iconColor="text-[#5C6BC0]"
                  title="Medical Devices"
                  desc="CGM, strips & BP meters"
                />
              </div>

              {/* Health Tips */}
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

        {/* ============ BOTTOM NAV ============ */}
        <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(15,23,42,0.05)]">
          <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
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
            <NavItem icon={<ClipboardList size={20} />} label="Health Quiz" />
            <NavItem icon={<Headset size={20} />} label="Contact Us" />
            <NavItem icon={<ShoppingBag size={20} />} label="Store" />
          </div>
        </nav>
      </div>
    </div>
  );
}

/* ============ Helper Components ============ */

function QCard({ icon, iconBg, iconColor, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[110px] flex-shrink-0 bg-white p-2.5 rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col items-center text-center gap-1.5 active:scale-[0.97] transition"
    >
      <div
        className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center leading-tight">
        <h4 className="text-[12px] font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">
        {desc}
      </p>
    </button>
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

function ServiceRow({ icon, iconBg, iconColor, title, desc }) {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#eaedff] flex items-center justify-between gap-1.5 cursor-pointer active:scale-[0.99] transition">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div
          className={`w-9 h-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0`}
        >
          {icon}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-[11px] font-bold text-gray-900 truncate leading-tight">
            {title}
          </h3>
          <p className="text-[9px] text-gray-500 truncate mt-0.5">{desc}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
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
      className={`flex flex-col items-center justify-center flex-1 min-w-0 min-h-[44px] ${
        active
          ? "text-[#005c55] font-bold"
          : "text-gray-500 hover:text-[#005c55]"
      }`}
    >
      {icon}
      <span className="text-[10px] leading-none mt-1 truncate">{label}</span>
    </button>
  );
}
