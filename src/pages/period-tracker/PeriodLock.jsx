// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronLeft, ChevronRight, X, Lock } from "lucide-react";
// import logo from "../../assets/daibmetalogo.jpeg";
// import illustration from "../../assets/periodtracker/period-illustration.png";

// /* ---------- Custom icons ---------- */
// const LockIcon = ({ size = 30 }) => (
//   <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
//     <path
//       d="M9.5 14V10.5a6.5 6.5 0 0 1 13 0V14"
//       stroke="#e8305f"
//       strokeWidth="3"
//       strokeLinecap="round"
//     />
//     <rect x="5" y="13" width="22" height="16" rx="3.5" fill="#e8305f" />
//     <circle cx="16" cy="20" r="2.2" fill="#fff" />
//     <rect x="15" y="21" width="2" height="4.5" rx="1" fill="#fff" />
//   </svg>
// );

// const UnlockIcon = ({ size = 30 }) => (
//   <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
//     <path
//       d="M17.5 14V9.5a5.5 5.5 0 0 1 11 0V12"
//       stroke="#64748b"
//       strokeWidth="3"
//       strokeLinecap="round"
//       transform="translate(-4 -2)"
//     />
//     <rect x="3" y="13" width="22" height="16" rx="3.5" fill="#64748b" />
//     <circle cx="14" cy="20" r="2.2" fill="#fff" />
//     <rect x="13" y="21" width="2" height="4.5" rx="1" fill="#fff" />
//   </svg>
// );

// const ShieldCheckIcon = ({ size = 40 }) => (
//   <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
//     <path
//       d="M20 2 4 8v13c0 10 7 18 16 21 9-3 16-11 16-21V8L20 2Z"
//       fill="#1e88e5"
//     />
//     <path
//       d="m12.5 22 5.5 5.5L28 16.5"
//       stroke="#fff"
//       strokeWidth="3.6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export default function PeriodLock() {
//   const navigate = useNavigate();

//   // Modal States
//   const [showPinModal, setShowPinModal] = useState(false);
//   const [pin, setPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = () => {
//     if (pin.length !== 4) {
//       setError("PIN must be exactly 4 digits.");
//       return;
//     }
//     if (pin !== confirmPin) {
//       setError("PINs do not match. Please try again.");
//       return;
//     }

//     // Save and proceed
//     localStorage.setItem("period_pin", pin);
//     setShowPinModal(false);
//     navigate("/period-tracker");
//   };

//   const closeModal = () => {
//     setShowPinModal(false);
//     setPin("");
//     setConfirmPin("");
//     setError("");
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col font-nunito relative overflow-hidden">
//       {/* FIXED HEADER */}
//       <header className="px-4 py-4 flex items-center justify-between bg-white relative z-10">
//         <button onClick={() => navigate("/home")} className="p-1 w-8">
//           <ChevronLeft size={24} className="text-[#1a237e]" />
//         </button>

//         <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
//           Period Tracker
//         </h1>

//         <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
//       </header>

//       <div className="h-6 bg-gradient-to-b from-[#fff1f6] to-transparent -mt-0.5" />

//       <main className="flex-1 flex flex-col items-center px-5 pt-6 relative z-10">
//         <img
//           src={illustration}
//           alt="Period Tracker"
//           className="w-[270px] h-auto mb-5 select-none"
//           draggable={false}
//         />

//         <h2 className="text-[24px] font-extrabold text-[#1a1f6b] text-center mb-12 w-full leading-tight">
//           Protect Your Period Tracker
//         </h2>

//         <div className="w-full max-w-[320px] space-y-4">
//           {/* Set PIN */}
//           <button
//             onClick={() => setShowPinModal(true)}
//             className="w-full bg-[#fff0f5] border border-[#fadce7] rounded-xl px-5 py-4 flex items-center justify-between active:bg-pink-100 transition"
//           >
//             <div className="flex items-center gap-4">
//               <LockIcon />
//               <span className="text-[15px] font-bold text-[#1a1f6b]">
//                 Set 4-Digit PIN
//               </span>
//             </div>
//             <ChevronRight
//               size={22}
//               className="text-[#e8305f]"
//               strokeWidth={2.5}
//             />
//           </button>

//           {/* Continue Without PIN */}
//           <button
//             onClick={() => navigate("/period-tracker")}
//             className="w-full bg-white border border-[#e3e8f2] rounded-xl px-5 py-4 flex items-center justify-between active:bg-gray-50 transition"
//           >
//             <div className="flex items-center gap-4">
//               <UnlockIcon />
//               <span className="text-[15px] font-bold text-[#1a1f6b]">
//                 Continue Without PIN
//               </span>
//             </div>
//             <ChevronRight
//               size={22}
//               className="text-[#64748b]"
//               strokeWidth={2.5}
//             />
//           </button>
//         </div>

//         {/* Privacy note */}
//         <div className="w-full bg-[#e8f3fd] rounded-xl px-5 py-4 flex items-center gap-4 mt-auto mb-8">
//           <div className="flex-shrink-0">
//             <ShieldCheckIcon size={34} />
//           </div>
//           <p className="text-[13px] text-[#1a1f6b] font-normal leading-relaxed">
//             We respect your privacy. Your period data is encrypted and stored
//             only on this device.
//           </p>
//         </div>
//       </main>

//       {/* ============ SET PIN MODAL ============ */}
//       {showPinModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black/40 backdrop-blur-sm transition-opacity">
//           <div className="w-full max-w-sm bg-white rounded-3xl p-6 pb-5 shadow-2xl animate-pop relative">
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 active:scale-95 transition"
//             >
//               <X size={16} />
//             </button>

//             <div className="text-center mb-6 mt-2">
//               <div className="w-14 h-14 bg-[#fff0f5] rounded-full flex items-center justify-center mx-auto mb-3">
//                 <Lock size={24} className="text-[#e8305f]" />
//               </div>
//               <h3 className="text-[18px] font-extrabold text-[#1a1f6b]">
//                 Set Security PIN
//               </h3>
//               <p className="text-[12px] text-gray-500 font-medium mt-1">
//                 Create a 4-digit code to protect your data
//               </p>
//             </div>

//             {/* Input Fields */}
//             <div className="flex flex-col gap-4 mb-6">
//               <div>
//                 <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">
//                   Enter 4-Digit PIN
//                 </label>
//                 <input
//                   type="password"
//                   inputMode="numeric"
//                   maxLength={4}
//                   value={pin}
//                   onChange={(e) => {
//                     setError("");
//                     setPin(e.target.value.replace(/\D/g, ""));
//                   }}
//                   placeholder="••••"
//                   className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-[20px] font-black tracking-[0.5em] text-[#1a1f6b] outline-none focus:border-[#e8305f] focus:bg-white transition"
//                 />
//               </div>

//               <div>
//                 <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">
//                   Confirm PIN
//                 </label>
//                 <input
//                   type="password"
//                   inputMode="numeric"
//                   maxLength={4}
//                   value={confirmPin}
//                   onChange={(e) => {
//                     setError("");
//                     setConfirmPin(e.target.value.replace(/\D/g, ""));
//                   }}
//                   placeholder="••••"
//                   className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-[20px] font-black tracking-[0.5em] text-[#1a1f6b] outline-none focus:border-[#e8305f] focus:bg-white transition"
//                 />
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <p className="text-[11px] font-bold text-red-500 text-center mb-4 -mt-2">
//                 {error}
//               </p>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-3 mt-2">
//               <button
//                 onClick={closeModal}
//                 className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="flex-1 bg-[#e8305f] text-white font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg shadow-[#e8305f]/30 hover:bg-[#d42250]"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
//         .animate-pop { animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
//       `}</style>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Lock } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";
import illustration from "../../assets/periodtracker/period-illustration.png";

/* ---------- Custom icons ---------- */
const LockIcon = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M9.5 14V10.5a6.5 6.5 0 0 1 13 0V14"
      stroke="#e8305f"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect x="5" y="13" width="22" height="16" rx="3.5" fill="#e8305f" />
    <circle cx="16" cy="20" r="2.2" fill="#fff" />
    <rect x="15" y="21" width="2" height="4.5" rx="1" fill="#fff" />
  </svg>
);

const UnlockIcon = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M17.5 14V9.5a5.5 5.5 0 0 1 11 0V12"
      stroke="#64748b"
      strokeWidth="3"
      strokeLinecap="round"
      transform="translate(-4 -2)"
    />
    <rect x="3" y="13" width="22" height="16" rx="3.5" fill="#64748b" />
    <circle cx="14" cy="20" r="2.2" fill="#fff" />
    <rect x="13" y="21" width="2" height="4.5" rx="1" fill="#fff" />
  </svg>
);

const ShieldCheckIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
    <path
      d="M20 2 4 8v13c0 10 7 18 16 21 9-3 16-11 16-21V8L20 2Z"
      fill="#1e88e5"
    />
    <path
      d="m12.5 22 5.5 5.5L28 16.5"
      stroke="#fff"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PeriodLock() {
  const navigate = useNavigate();

  // UI TABS STATE
  const [activeTab, setActiveTab] = useState("setup"); // "setup" | "enter"

  // ENTER PIN STATE (4 boxes)
  const [pin, setPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const inputRefs = useRef([]);

  // MODAL STATES
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [modalError, setModalError] = useState("");

  // Handle Enter PIN Input Change
  const handlePinChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only allow numbers
    setPinError(false);

    const newPin = [...pin];
    // If user pastes multiple digits
    if (value.length > 1) {
      const digits = value.split("").slice(0, 4 - index);
      digits.forEach((digit, i) => {
        if (index + i < 4) newPin[index + i] = digit;
      });
      setPin(newPin);
      const nextIndex = Math.min(index + digits.length, 3);
      inputRefs.current[nextIndex]?.focus();
      checkPin(newPin.join(""));
      return;
    }

    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all filled
    if (index === 3 && value) {
      checkPin(newPin.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
    }
  };

  const checkPin = (enteredPin) => {
    if (enteredPin.length === 4) {
      const savedPin = localStorage.getItem("period_pin");
      if (enteredPin === savedPin) {
        setTimeout(() => navigate("/period-tracker"), 300);
      } else {
        setTimeout(() => {
          setPinError(true);
          setPin(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 300);
      }
    }
  };

  // Handle Save New PIN (Setup / Forgot)
  const handleSavePin = () => {
    if (newPin.length !== 4) {
      setModalError("PIN must be exactly 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      setModalError("PINs do not match. Please try again.");
      return;
    }

    localStorage.setItem("period_pin", newPin);

    if (showForgotModal) {
      setShowForgotModal(false);
      navigate("/period-tracker");
    } else {
      setShowSetupModal(false);
      setActiveTab("enter");
      setPin(["", "", "", ""]);
    }

    setNewPin("");
    setConfirmPin("");
    setModalError("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-nunito relative overflow-hidden">
      {/* FIXED HEADER */}
      <header className="px-4 py-4 flex items-center justify-between bg-white relative z-10">
        <button onClick={() => navigate("/home")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Period Tracker
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <div className="h-4 bg-gradient-to-b from-[#fff1f6] to-transparent -mt-0.5" />

      {/* TAB SWITCHER */}
      <div className="px-5 mb-6 relative z-10">
        <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
          <button
            onClick={() => setActiveTab("setup")}
            className={`flex-1 py-2.5 text-[13px] font-extrabold rounded-lg transition-all ${
              activeTab === "setup"
                ? "bg-white text-[#e8305f] shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Setup PIN
          </button>
          <button
            onClick={() => setActiveTab("enter")}
            className={`flex-1 py-2.5 text-[13px] font-extrabold rounded-lg transition-all ${
              activeTab === "enter"
                ? "bg-white text-[#e8305f] shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Enter PIN
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center px-5 relative z-10 pb-8 overflow-y-auto">
        {/* ================= TAB 1: SETUP ================= */}
        {activeTab === "setup" && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <img
              src={illustration}
              alt="Period Tracker"
              className="w-[240px] h-auto mb-6 select-none"
              draggable={false}
            />

            <h2 className="text-[22px] font-extrabold text-[#1a1f6b] text-center mb-8 w-full leading-tight">
              Protect Your Period Tracker
            </h2>

            <div className="w-full max-w-[320px] space-y-4">
              <button
                onClick={() => setShowSetupModal(true)}
                className="w-full bg-[#fff0f5] border border-[#fadce7] rounded-xl px-5 py-4 flex items-center justify-between active:bg-pink-100 transition shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <LockIcon />
                  <span className="text-[15px] font-bold text-[#1a1f6b]">
                    Set 4-Digit PIN
                  </span>
                </div>
                <ChevronRight
                  size={22}
                  className="text-[#e8305f]"
                  strokeWidth={2.5}
                />
              </button>

              <button
                onClick={() => navigate("/period-tracker")}
                className="w-full bg-white border border-[#e3e8f2] rounded-xl px-5 py-4 flex items-center justify-between active:bg-gray-50 transition shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <UnlockIcon />
                  <span className="text-[15px] font-bold text-[#1a1f6b]">
                    Continue Without PIN
                  </span>
                </div>
                <ChevronRight
                  size={22}
                  className="text-[#64748b]"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ENTER PIN ================= */}
        {activeTab === "enter" && (
          <div className="w-full max-w-[320px] flex flex-col items-center animate-fade-in mt-6">
            <div className="w-16 h-16 bg-[#fff0f5] rounded-full flex items-center justify-center mb-5 shadow-sm">
              <LockIcon size={32} />
            </div>

            <h2 className="text-[22px] font-extrabold text-[#1a1f6b] text-center mb-2">
              Enter Passcode
            </h2>
            <p
              className={`text-[12px] font-bold text-center mb-10 transition-colors ${pinError ? "text-red-500" : "text-gray-400"}`}
            >
              {pinError
                ? "Incorrect PIN. Please try again."
                : "Enter your 4-digit PIN to access data"}
            </p>

            {/* 4-BOX PIN INPUT */}
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={pin[index]}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-16 rounded-2xl text-center text-[28px] font-black outline-none transition-all duration-200 border-2 ${
                    pinError
                      ? "border-red-300 bg-red-50 text-red-600"
                      : pin[index]
                        ? "border-[#e8305f] bg-[#fff0f5] text-[#e8305f]"
                        : "border-gray-200 bg-gray-50 text-gray-800 focus:border-[#e8305f] focus:bg-white"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setShowForgotModal(true)}
              className="text-[13px] font-bold text-[#e8305f] hover:underline transition-all"
            >
              Forgot PIN?
            </button>
          </div>
        )}

        {/* Privacy note */}
        <div className="w-full bg-[#e8f3fd] rounded-xl px-5 py-4 flex items-center gap-4 mt-auto mb-2">
          <div className="flex-shrink-0">
            <ShieldCheckIcon size={34} />
          </div>
          <p className="text-[12px] text-[#1a1f6b] font-normal leading-relaxed">
            We respect your privacy. Your period data is encrypted and stored
            only on this device.
          </p>
        </div>
      </main>

      {/* ============ SETUP / FORGOT PIN MODAL ============ */}
      {(showSetupModal || showForgotModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 pb-5 shadow-2xl animate-pop relative">
            <button
              onClick={() => {
                setShowSetupModal(false);
                setShowForgotModal(false);
                setModalError("");
                setNewPin("");
                setConfirmPin("");
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 active:scale-95 transition"
            >
              <X size={16} />
            </button>

            <div className="text-center mb-6 mt-2">
              <div className="w-14 h-14 bg-[#fff0f5] rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock size={24} className="text-[#e8305f]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#1a1f6b]">
                {showForgotModal ? "Reset Security PIN" : "Set Security PIN"}
              </h3>
              <p className="text-[12px] text-gray-500 font-medium mt-1">
                Create a 4-digit code to protect your data
              </p>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">
                  Enter New PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => {
                    setModalError("");
                    setNewPin(e.target.value.replace(/\D/g, ""));
                  }}
                  placeholder="••••"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-[20px] font-black tracking-[0.5em] text-[#1a1f6b] outline-none focus:border-[#e8305f] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => {
                    setModalError("");
                    setConfirmPin(e.target.value.replace(/\D/g, ""));
                  }}
                  placeholder="••••"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-[20px] font-black tracking-[0.5em] text-[#1a1f6b] outline-none focus:border-[#e8305f] focus:bg-white transition"
                />
              </div>
            </div>

            {modalError && (
              <p className="text-[11px] font-bold text-red-500 text-center mb-4 -mt-2">
                {modalError}
              </p>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  setShowSetupModal(false);
                  setShowForgotModal(false);
                  setModalError("");
                  setNewPin("");
                  setConfirmPin("");
                }}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePin}
                className="flex-1 bg-[#e8305f] text-white font-bold text-[13px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg shadow-[#e8305f]/30 hover:bg-[#d42250]"
              >
                Save PIN
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-pop { animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
