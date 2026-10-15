import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  User,
  Phone,
  Lock,
  RotateCw,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function Register() {
  const navigate = useNavigate();
  const [gender, setGender] = useState("male");
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(44);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Countdown
  useEffect(() => {
    if (!otpSent || timer <= 0) return;
    const t = setInterval(() => setTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [otpSent, timer]);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleMobile = (v) => {
    update("mobile", v.replace(/\D/g, "").slice(0, 10));
  };

  const canSubmit =
    form.name.trim() &&
    form.age &&
    form.mobile.length === 10 &&
    form.password.trim();

  const sendOtp = () => {
    if (!canSubmit) return;
    setOtpSent(true);
    setTimer(44);
    setOtp(["", "", "", "", "", ""]);
  };

  const resendOtp = () => {
    setTimer(44);
    setOtp(["", "", "", "", "", ""]);
    document.getElementById("reg-otp-0")?.focus();
  };

  const handleOtp = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) document.getElementById(`reg-otp-${idx + 1}`)?.focus();
  };

  const formatTime = (s) => `0:${String(s).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#faf8ff] font-sans flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#faf8ff] flex flex-col">
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="text-gray-700 p-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-gray-900 text-[15px] tracking-tight">
            DiabMeta
          </h1>
          <button className="text-gray-500 p-1">
            <HelpCircle size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 px-5 pt-3 pb-8 overflow-y-auto">
          {/* Logo */}
          <div className="flex justify-center mb-1">
            <LogoBlock />
          </div>

          {/* Patient Login link */}
          <div className="flex justify-end mt-2 mb-3">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1 text-blue-600 text-[13px] font-semibold hover:text-blue-700 transition"
            >
              <span className="underline underline-offset-2 decoration-blue-600">
                Patient Login
              </span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Heading (no subtitle) */}
          <div className="text-center mb-4 mt-2">
            <h2 className="text-[19px] font-bold text-gray-900">
              New Patient Registration
            </h2>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100">
            {/* Full Name */}
            <label className="text-[12px] font-semibold text-gray-700">
              Full Name
            </label>
            <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-[#f4f5fb] focus-within:border-[#0d6b63] focus-within:bg-white transition">
              <User size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Rahul Gupta"
                disabled={otpSent}
                className="flex-1 bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400 disabled:opacity-70"
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-[1fr_1.6fr] gap-3 mb-3">
              <div>
                <label className="text-[12px] font-semibold text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder="e.g. 32"
                  disabled={otpSent}
                  className="mt-1.5 w-full px-3 py-3 rounded-xl border border-gray-200 bg-[#f4f5fb] focus:border-[#0d6b63] focus:bg-white outline-none text-[13px] text-gray-700 placeholder-gray-400 transition disabled:opacity-70"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-gray-700">
                  Sex / Gender
                </label>
                <div className="mt-1.5 bg-[#eef1f8] rounded-xl p-1 flex gap-1">
                  {["male", "female", "other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => !otpSent && setGender(g)}
                      disabled={otpSent}
                      className={`flex-1 py-2 rounded-lg text-[11px] font-semibold capitalize transition disabled:opacity-70 ${
                        gender === g
                          ? "bg-white text-[#0d6b63] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                          : "text-gray-500"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <label className="text-[12px] font-semibold text-gray-700">
              Mobile Number
            </label>
            <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-[#f4f5fb] focus-within:border-[#0d6b63] focus-within:bg-white transition">
              <Phone size={16} className="text-gray-400 shrink-0" />
              <span className="text-[13px] text-gray-700 font-medium">+91</span>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => handleMobile(e.target.value)}
                placeholder="98765 43210"
                maxLength={10}
                inputMode="numeric"
                disabled={otpSent}
                className="flex-1 bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400 disabled:opacity-70"
              />
            </div>

            {/* Password */}
            <label className="text-[12px] font-semibold text-gray-700">
              Password
            </label>
            <div className="mt-1.5 mb-4 flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-[#f4f5fb] focus-within:border-[#0d6b63] focus-within:bg-white transition">
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Create a password"
                disabled={otpSent}
                className="flex-1 bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400 disabled:opacity-70"
              />
            </div>

            {/* ============ OTP SECTION (after send) ============ */}
            {otpSent && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-semibold text-gray-700">
                    Enter OTP / Verification Code
                  </label>
                  <span className="text-[11px] text-[#0d6b63] font-medium">
                    Code sent
                  </span>
                </div>

                <div className="flex gap-1.5 justify-between mb-2">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      id={`reg-otp-${i}`}
                      value={v}
                      onChange={(e) => handleOtp(e.target.value, i)}
                      maxLength={1}
                      inputMode="numeric"
                      className="w-full h-12 text-center rounded-lg border border-gray-200 bg-[#f4f5fb] focus:border-[#0d6b63] focus:bg-white outline-none text-[15px] font-semibold text-gray-800"
                    />
                  ))}
                </div>

                {/* Timer / Resend */}
                <div className="flex justify-between items-center text-[11px] mb-4">
                  <span className="text-gray-500">Didn't receive code?</span>
                  {timer > 0 ? (
                    <span className="text-gray-400 font-medium">
                      Resend code in {formatTime(timer)}
                    </span>
                  ) : (
                    <button
                      onClick={resendOtp}
                      className="text-[#0d6b63] font-semibold hover:underline flex items-center gap-1"
                    >
                      <RotateCw size={12} />
                      Resend Code
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Register & Get OTP button (before OTP sent) */}
            {!otpSent && (
              <button
                onClick={sendOtp}
                disabled={!canSubmit}
                className="w-full bg-[#0d6b63] hover:bg-[#0a564f] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 rounded-xl mb-3 transition flex items-center justify-center gap-2"
              >
                Register & Get OTP <ArrowRight size={16} />
              </button>
            )}

            {/* Verify & Create Account button (after OTP sent) */}
            {otpSent && (
              <button
                onClick={() => navigate("/splash")}
                disabled={!agree || otp.some((d) => !d)}
                className="w-full bg-[#0d6b63] hover:bg-[#0a564f] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 rounded-xl mb-3 transition flex items-center justify-center gap-2"
              >
                Verify & Create Account <ArrowRight size={16} />
              </button>
            )}

            {/* Terms checkbox (only after OTP sent) */}
            {otpSent && (
              <label className="flex items-start gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#0d6b63] rounded"
                />
                <span className="text-[11px] text-gray-600 leading-snug">
                  I agree to the{" "}
                  <span className="text-[#0d6b63] font-semibold">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-[#0d6b63] font-semibold underline">
                    Clinical Privacy Policy
                  </span>
                </span>
              </label>
            )}

            {/* Terms text (before OTP sent) */}
            {!otpSent && (
              <p className="text-center text-[11px] text-gray-500 leading-snug">
                By registering, you agree to DiabMeta Medical{" "}
                <span className="text-[#0d6b63] font-semibold underline">
                  Privacy & Terms
                </span>
              </p>
            )}
          </div>

          {/* Secure badge */}
          <p className="text-center text-[11px] text-gray-500 mt-5 flex items-center justify-center gap-1">
            <ShieldCheck size={13} className="text-[#0d6b63]" />
            Secure & Confidential Medical Portal
          </p>
        </div>

        {/* FAKE SYSTEM NAV (UI demo only) */}
        <div className="bg-white border-t border-gray-100 py-3 flex items-center justify-around">
          <div className="flex flex-col gap-[3px] items-center">
            <div className="w-4 h-[1.5px] bg-gray-500 rounded-full"></div>
            <div className="w-4 h-[1.5px] bg-gray-500 rounded-full"></div>
            <div className="w-4 h-[1.5px] bg-gray-500 rounded-full"></div>
          </div>
          <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-500"></div>
          <div className="w-2 h-2 border-l-[1.5px] border-b-[1.5px] border-gray-500 rotate-45"></div>
        </div>
      </div>
    </div>
  );
}

/* ==================== LOGO ==================== */
function LogoBlock() {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="DiabMeta" className="w-16 h-16 object-contain" />
    </div>
  );
}
