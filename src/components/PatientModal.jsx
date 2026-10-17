import { useState } from "react";
import { X, Check, User, Phone } from "lucide-react";

export default function PatientModal({
  title = "Patient Details",
  subtitle = "",
  confirmText = "Confirm",
  onClose,
  onConfirm,
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    sex: "male",
  });
  const [booked, setBooked] = useState(false);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const canBook =
    form.name.trim() && form.age && form.phone.length === 10 && form.sex;

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      if (onConfirm) {
        onConfirm(form); // Parent navigate karega
      }
    }, 1500); // 1.5 sec success check
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={booked ? undefined : onClose}
      ></div>

      <div
        className="relative w-full max-w-md bg-white rounded-t-3xl p-5 max-h-[90vh] overflow-y-auto"
        style={{ animation: "slideUp 0.3s ease" }}
      >
        {booked ? (
          <div className="py-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#9cf2e8] flex items-center justify-center mb-3">
              <Check size={32} className="text-[#005c55]" strokeWidth={3} />
            </div>
            <h3 className="text-[18px] font-bold text-gray-900">Success!</h3>
            <p className="text-[12px] text-gray-500 mt-1 px-4 leading-snug">
              Redirecting to home...
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-gray-900">{title}</h3>
                {subtitle && (
                  <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                  <User size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Enter Full Name"
                    className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1.6fr] gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="e.g. 32"
                    className="mt-1 w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus:bg-white focus:border-[#005c55] outline-none text-[13px] text-gray-800 placeholder-gray-400 transition"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-700">
                    Sex
                  </label>
                  <div className="mt-1 bg-[#eef1f8] rounded-xl p-1 flex gap-1">
                    {["male", "female", "other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => update("sex", g)}
                        className={`flex-1 py-2 rounded-lg text-[11px] font-semibold capitalize transition ${
                          form.sex === g
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

              <div>
                <label className="text-[11px] font-semibold text-gray-700">
                  Mobile Number
                </label>
                <div className="mt-1 flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus-within:bg-white focus-within:border-[#005c55] transition">
                  <Phone size={16} className="text-gray-400 flex-shrink-0" />
                  <span className="text-[13px] font-medium text-gray-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      update(
                        "phone",
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={!canBook}
                className="w-full bg-[#005c55] text-white font-bold py-3.5 rounded-xl disabled:opacity-40 active:scale-[0.98] transition mt-2 shadow-lg shadow-[#005c55]/25"
              >
                {confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
