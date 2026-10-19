import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Save } from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function AddFamilyMember() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    relation: "Wife",
    age: "",
    gender: "Female",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Yaha validation lag sakta hai (agar name/age khali ho)
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
              <div className="flex-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Relation
                </label>
                <select
                  name="relation"
                  value={form.relation}
                  onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition appearance-none"
                >
                  <option value="Wife">Wife</option>
                  <option value="Husband">Husband</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 placeholder-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Gender & Blood Group Row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition appearance-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] font-semibold text-gray-900 transition appearance-none"
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
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
      </div>
    </div>
  );
}
