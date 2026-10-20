import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LogOut,
  Camera,
  CheckCircle2,
  Save,
  UserPlus,
  Users,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

// 18 se 100 tak ki ages ki array
const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => i + 18);

export default function Profile() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Custom Dropdown state
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);

  // Main User Form State (Gender lowercase for toggle)
  const [form, setForm] = useState({
    name: "Rahul Sharma",
    email: "", // Optional
    age: "34",
    gender: "male",
    phone: "+91 98765 43210",
  });

  // Static Family Members List
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: "Priya Sharma", relation: "Wife", age: 30 },
    { id: 2, name: "Aarav Sharma", relation: "Son", age: 8 },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
            <h1 className="font-bold text-gray-900 text-[15px]">My Profile</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-10 px-4 pt-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#9cf2e8]/60 text-[#005c55] flex items-center justify-center text-[32px] font-extrabold border-4 border-white shadow-md">
                {form.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#005c55] flex items-center justify-center text-white border-2 border-white shadow-sm active:scale-90 transition">
                <Camera size={14} />
              </button>
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6 flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                <span>Email Address</span>
                <span className="text-[9px] text-gray-400 font-normal lowercase">
                  (optional)
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 placeholder-gray-400 transition"
              />
            </div>

            {/* Age & Phone Row */}
            <div className="flex gap-3">
              {/* AGE CUSTOM DROPDOWN */}
              <div className="w-[100px] relative flex-shrink-0">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Age
                </label>
                <button
                  type="button"
                  onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition"
                >
                  {form.age}
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {showAgeDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowAgeDropdown(false)}
                    ></div>
                    <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-[#eaedff] rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto animate-pop">
                      {AGE_OPTIONS.map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => {
                            updateField("age", age);
                            setShowAgeDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-[13px] transition ${
                            form.age == age
                              ? "bg-[#9cf2e8]/30 text-[#005c55] font-bold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* PHONE */}
              <div className="flex-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition"
                />
              </div>
            </div>

            {/* GENDER TOGGLE (Patient Modal Style) */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Gender
              </label>
              <div className="bg-[#eef1f8] rounded-xl p-1 flex gap-1 h-[46px]">
                {["male", "female", "other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateField("gender", g)}
                    className={`flex-1 py-2 rounded-lg text-[11px] font-semibold capitalize transition ${
                      form.gender === g
                        ? "bg-white text-[#005c55] shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`w-full font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg mb-6 ${
              saved ? "bg-[#E0F2F1] text-[#005c55]" : "bg-[#0d6b63] text-white"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 size={18} /> Profile Saved
              </>
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>

          {/* Family Members Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-[#005c55]" />
                <h3 className="text-[13px] font-bold text-gray-900">
                  Family Members
                </h3>
              </div>

              <button
                onClick={() => navigate("/profile/add-member")}
                className="flex items-center gap-1 text-[11px] font-bold text-[#005c55] bg-[#9cf2e8]/40 px-2.5 py-1.5 rounded-full active:scale-95 transition"
              >
                <UserPlus size={12} /> Add Member
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#eaedff] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              {familyMembers.map((member, i) => (
                <button
                  key={member.id}
                  className={`w-full px-4 py-3.5 flex items-center justify-between active:bg-[#fafbff] transition ${
                    i !== familyMembers.length - 1
                      ? "border-b border-[#f0f2f8]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#f4f6fb] text-[#005c55] flex items-center justify-center text-[13px] font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-[12.5px] font-bold text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {member.relation} · {member.age} Yrs
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-red-50 text-red-600 font-bold text-[12.5px] py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2 border border-red-100"
          >
            <LogOut size={16} /> Log Out
          </button>
        </main>

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-pop { animation: popIn 0.15s ease-out; }
        `}</style>
      </div>
    </div>
  );
}
