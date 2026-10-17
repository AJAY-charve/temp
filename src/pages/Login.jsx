import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  RotateCw,
  ArrowRight,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function Login() {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] font-sans flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#faf8ff] flex flex-col">
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100">
          <button className="text-gray-700 p-1">
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
        <div className="flex-1 px-5 pt-4 pb-8 overflow-y-auto">
          {/* Logo (no settings icon) */}
          <div className="flex justify-center mb-1">
            <LogoBlock />
          </div>

          {/* Register link */}
          <div className="flex justify-end mt-2 mb-3">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-1 text-blue-600 text-[13px] font-semibold hover:text-blue-700 transition"
            >
              <span className="underline underline-offset-2 decoration-blue-600">
                Register
              </span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-5 mt-5">
            <h2 className="text-[19px] font-bold text-gray-900">
              Welcome Back
            </h2>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100">
            <PatientForm agree={agree} setAgree={setAgree} />
          </div>

          {/* Secure badge */}
          <p className="text-center text-[11px] text-gray-500 mt-4 flex items-center justify-center gap-1">
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

/* ==================== PATIENT FORM ==================== */
function PatientForm({ agree, setAgree }) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(44);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    if (!codeSent || timer <= 0) return;
    const t = setInterval(() => setTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [codeSent, timer]);

  const sendCode = () => {
    if (mobile.length < 10) return;
    setCodeSent(true);
    setTimer(44);
    setOtp(["", "", "", "", "", ""]);
  };

  const resendCode = () => {
    setTimer(44);
    setOtp(["", "", "", "", "", ""]);
    document.getElementById("otp-0")?.focus();
  };

  const handleOtp = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleMobile = (v) => {
    setMobile(v.replace(/\D/g, "").slice(0, 10));
  };

  const formatTime = (s) => `0:${String(s).padStart(2, "0")}`;

  return (
    <>
      {/* Mobile Number */}
      <label className="text-[12px] font-semibold text-gray-700">
        Mobile Number
      </label>
      <div className="mt-1.5 mb-3 flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-[#f4f5fb] focus-within:border-[#0d6b63] focus-within:bg-white transition">
        <Smartphone size={16} className="text-gray-400 shrink-0" />
        <span className="text-[13px] font-semibold text-gray-700">+91</span>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => handleMobile(e.target.value)}
          placeholder="Enter Mobile Number"
          disabled={codeSent}
          maxLength={10}
          inputMode="numeric"
          className="flex-1 bg-transparent outline-none text-[13px] text-gray-700 font-medium placeholder-gray-400 disabled:opacity-70"
        />
      </div>

      {/* Send Code */}
      {!codeSent && (
        <button
          onClick={sendCode}
          disabled={mobile.length < 10}
          className="w-full bg-[#0d6b63] hover:bg-[#0a564f] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] text-white text-[13px] font-semibold py-3 rounded-xl transition"
        >
          Send Code
        </button>
      )}

      {/* OTP section */}
      {codeSent && (
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
                id={`otp-${i}`}
                value={v}
                onChange={(e) => handleOtp(e.target.value, i)}
                maxLength={1}
                inputMode="numeric"
                className="w-full h-12 text-center rounded-lg border border-gray-200 bg-[#f4f5fb] focus:border-[#0d6b63] focus:bg-white outline-none text-[15px] font-semibold text-gray-800"
              />
            ))}
          </div>

          {/* Timer / Resend */}
          <div className="flex justify-between items-center text-[11px] mb-3">
            <span className="text-gray-500">Didn't receive code?</span>
            {timer > 0 ? (
              <span className="text-gray-400 font-medium">
                Resend code in {formatTime(timer)}
              </span>
            ) : (
              <button
                onClick={resendCode}
                className="text-[#0d6b63] font-semibold hover:underline flex items-center gap-1"
              >
                <RotateCw size={12} />
                Resend Code
              </button>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 mb-4 cursor-pointer">
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

          {/* Verify */}
          <button
            onClick={() => navigate("/splash")}
            disabled={!agree || otp.some((d) => !d)}
            className="w-full bg-[#0d6b63] hover:bg-[#0a564f] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            Verify & Log In <ArrowRight size={16} />
          </button>
        </>
      )}

      {/* Continue without Login */}
      <button
        onClick={() => navigate("/splash")}
        className={`w-full border border-[#0d6b63] text-[#0d6b63] hover:bg-[#e8f3f1] text-[13px] font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 ${
          codeSent ? "mt-6" : "mt-3"
        }`}
      >
        Continue without Login <ArrowRight size={15} />
      </button>
    </>
  );
}
