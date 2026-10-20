import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Save, ChevronDown } from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

// 18 se 100 tak ki ages ki array
const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => i + 18);

export default function AddFamilyMember() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Custom Dropdown states
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [showRelationDropdown, setShowRelationDropdown] = useState(false);

  // Form State (Age default 18)
  const [form, setForm] = useState({
    name: "",
    relation: "Wife",
    age: "18",
    gender: "female",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate("/profile"); // Save hone ke baad wapas profile pe
    }, 2000);
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
            <h1 className="font-bold text-gray-900 text-[15px]">Add Member</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-10 px-4 pt-6">
          <p className="text-[11.5px] text-gray-500 mb-6 px-1">
            Add a new family member to manage their health records and book
            appointments.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl border border-[#eaedff] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6 flex flex-col gap-4"
          >
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
                placeholder="e.g. Priya Sharma"
                className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Relation & Age Row */}
            <div className="flex gap-3">
              {/* RELATION CUSTOM DROPDOWN */}
              <div className="flex-1 relative">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Relation
                </label>
                <button
                  type="button"
                  onClick={() => setShowRelationDropdown(!showRelationDropdown)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition"
                >
                  {form.relation}
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {showRelationDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowRelationDropdown(false)}
                    ></div>
                    <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-[#eaedff] rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto animate-pop">
                      {[
                        "Wife",
                        "Husband",
                        "Son",
                        "Daughter",
                        "Father",
                        "Mother",
                        "Other",
                      ].map((rel) => (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => {
                            updateField("relation", rel);
                            setShowRelationDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-[13px] transition ${
                            form.relation === rel
                              ? "bg-[#9cf2e8]/30 text-[#005c55] font-bold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {rel}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* AGE CUSTOM DROPDOWN */}
              <div className="flex-1 relative">
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
            </div>

            {/* Gender Toggle (Patient Modal Style) */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg mt-2 ${
                saved
                  ? "bg-[#E0F2F1] text-[#005c55]"
                  : "bg-[#0d6b63] text-white"
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={18} /> Member Added
                </>
              ) : (
                <>
                  <Save size={18} /> Save Member
                </>
              )}
            </button>
          </form>
        </main>

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-pop { animation: popIn 0.15s ease-out; }
        `}</style>
      </div>
    </div>
  );
}
