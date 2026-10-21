import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pill,
  Camera,
  Clock,
  Calendar,
  ChevronRight,
  Plus,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";
const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
const DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

export default function AddMedicine() {
  const navigate = useNavigate();

  const galleryInputRef = useRef(null);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  // Camera Modal States
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // Refs for Custom Camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [times, setTimes] = useState(["08:00"]);
  const [scheduleType, setScheduleType] = useState("everyday");
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState([]);

  // --- CAMERA LOGIC ---
  useEffect(() => {
    if (!showCamera) return;

    let stream = null;
    let cancelled = false;

    const startCamera = async () => {
      try {
        setCameraError("");
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError("Unable to access camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [showCamera]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
      setPhoto(imageUrl);
      closeCamera();
    } catch (err) {
      console.error("Capture failed:", err);
    }
  };

  const closeCamera = () => {
    setShowCamera(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  // --- FORM HANDLERS ---
  const handleGalleryUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
    e.target.value = "";
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const addTime = () => setTimes([...times, "12:00"]);
  const removeTime = (index) => {
    if (times.length === 1) return;
    setTimes(times.filter((_, i) => i !== index));
  };

  const toggleWeekDay = (dayIndex) => {
    if (selectedWeekDays.includes(dayIndex)) {
      setSelectedWeekDays(selectedWeekDays.filter((d) => d !== dayIndex));
    } else {
      setSelectedWeekDays([...selectedWeekDays, dayIndex]);
    }
  };

  const toggleMonthDay = (dayNum) => {
    if (selectedMonthDays.includes(dayNum)) {
      setSelectedMonthDays(selectedMonthDays.filter((d) => d !== dayNum));
    } else {
      setSelectedMonthDays([...selectedMonthDays, dayNum]);
    }
  };

  const handleSave = () => {
    if (!name || times.some((t) => !t)) {
      alert("Please enter medicine name and valid times.");
      return;
    }
    alert(`Medicine "${name}" saved successfully!`);
    navigate("/pill-reminder");
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
            <h1 className="font-bold text-gray-900 text-[15px]">
              Add Medicine
            </h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN FORM */}
        <main className="flex-1 px-4 pt-4 pb-10 flex flex-col gap-4">
          {/* Medicine Name */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#E0F2F1] flex items-center justify-center flex-none">
                <Pill size={18} className="text-[#005c55]" />
              </div>
              <label className="text-[14px] font-extrabold text-[#14284b]">
                Medicine Name
              </label>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sugar ki Dawai / Metformin 500mg"
              className="w-full px-4 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[13px] text-gray-800 transition"
            />
          </div>

          {/* Medicine Photo (Inline Buttons) */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#E0F2F1] flex items-center justify-center flex-none">
                <Camera size={18} className="text-[#005c55]" />
              </div>
              <label className="text-[14px] font-extrabold text-[#14284b]">
                Medicine Photo{" "}
                <span className="text-gray-400 font-medium text-[12px]">
                  (Optional)
                </span>
              </label>
            </div>

            {/* Photo Preview or Buttons */}
            {photo ? (
              <div className="relative w-24 h-24">
                <img
                  src={photo}
                  alt="Med"
                  className="w-full h-full object-cover rounded-xl border border-[#eaedff]"
                />
                <button
                  onClick={() => setPhoto(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md active:scale-90"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                {/* Camera Button */}
                <button
                  onClick={() => setShowCamera(true)}
                  className="flex-1 h-20 rounded-xl border border-[#eaedff] bg-[#faf8ff] flex flex-col items-center justify-center active:scale-95 transition hover:bg-[#E0F2F1]/40"
                >
                  <Camera size={22} className="text-[#005c55] mb-1.5" />
                  <span className="text-[11px] font-bold text-[#005c55]">
                    Camera
                  </span>
                </button>

                {/* Gallery Button */}
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex-1 h-20 rounded-xl border border-[#eaedff] bg-[#faf8ff] flex flex-col items-center justify-center active:scale-95 transition hover:bg-[#E0F2F1]/40"
                >
                  <ImageIcon size={22} className="text-[#005c55] mb-1.5" />
                  <span className="text-[11px] font-bold text-[#005c55]">
                    Gallery
                  </span>
                </button>
              </div>
            )}

            {/* Hidden Input for Gallery */}
            <input
              type="file"
              accept="image/*"
              ref={galleryInputRef}
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </div>

          {/* Reminder Times */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#E0F2F1] flex items-center justify-center flex-none">
                <Clock size={18} className="text-[#005c55]" />
              </div>
              <label className="text-[14px] font-extrabold text-[#14284b]">
                Reminder Time
              </label>
            </div>

            <div className="flex flex-col gap-3">
              {times.map((t, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="time"
                      value={t}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] focus:bg-white focus:border-[#005c55] outline-none text-[15px] font-bold text-[#14284b] transition appearance-none"
                    />
                    <ChevronRight
                      size={18}
                      className="text-[#005c55] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  {times.length > 1 && (
                    <button
                      onClick={() => removeTime(index)}
                      className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-500 active:scale-95 transition flex-none"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addTime}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-3 bg-[#E0F2F1] text-[#005c55] text-[12.5px] font-bold rounded-xl active:scale-95"
            >
              <Plus size={16} /> Add Another Time
            </button>
          </div>

          {/* When to Take */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm mb-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#E0F2F1] flex items-center justify-center flex-none">
                <Calendar size={18} className="text-[#005c55]" />
              </div>
              <label className="text-[14px] font-extrabold text-[#14284b]">
                When to Take
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "everyday", label: "Every Day", icon: Calendar },
                { id: "week", label: "Days of Week", icon: Calendar },
                { id: "month", label: "Days of Month", icon: Calendar },
              ].map((item) => {
                const active = scheduleType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setScheduleType(item.id)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition ${
                      active
                        ? "border-[#005c55] bg-[#9cf2e8]/20"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <item.icon
                      size={20}
                      className={active ? "text-[#005c55]" : "text-gray-400"}
                    />
                    <span
                      className={`text-[10.5px] font-bold mt-1 text-center leading-tight ${active ? "text-[#005c55]" : "text-gray-600"}`}
                    >
                      {item.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-2 flex items-center justify-center ${active ? "border-[#005c55]" : "border-gray-300"}`}
                    >
                      {active && (
                        <div className="w-2 h-2 rounded-full bg-[#005c55]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {scheduleType === "week" && (
              <div className="mt-4 pt-4 border-t border-[#eaedff] animate-pop">
                <p className="text-[11px] font-semibold text-gray-500 mb-3 text-center">
                  Select Days of Week
                </p>
                <div className="flex justify-between gap-1">
                  {DAYS_OF_WEEK.map((day, i) => {
                    const isSelected = selectedWeekDays.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleWeekDay(i)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold transition ${
                          isSelected
                            ? "bg-[#0d6b63] text-white shadow-sm"
                            : "bg-[#f4f5fb] text-gray-500 border border-[#eaedff]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {scheduleType === "month" && (
              <div className="mt-4 pt-4 border-t border-[#eaedff] animate-pop">
                <p className="text-[11px] font-semibold text-gray-500 mb-3 text-center">
                  Select Days of Month
                </p>
                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS_OF_MONTH.map((dayNum) => {
                    const isSelected = selectedMonthDays.includes(dayNum);
                    return (
                      <button
                        key={dayNum}
                        onClick={() => toggleMonthDay(dayNum)}
                        className={`aspect-square rounded-full flex items-center justify-center text-[11px] font-bold transition ${
                          isSelected
                            ? "bg-[#0d6b63] text-white shadow-sm"
                            : "bg-[#f4f5fb] text-gray-500 border border-[#eaedff]"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 mt-1"
          >
            Save Medicine Reminder
          </button>
        </main>

        {/* CUSTOM IN-APP CAMERA MODAL */}
        {showCamera && (
          <div className="fixed inset-0 z-[60] bg-black flex justify-center">
            <div className="w-full max-w-md h-full flex flex-col relative">
              {/* Camera Header */}
              <div className="h-14 px-4 flex items-center justify-between bg-black pt-2">
                <button
                  onClick={closeCamera}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white"
                >
                  <X size={22} />
                </button>
                <h1 className="font-bold text-[15px] text-white">
                  Capture Photo
                </h1>
                <div className="w-9" />
              </div>

              {/* Video Stream */}
              <div className="flex-1 relative overflow-hidden bg-[#111] flex items-center justify-center">
                {cameraError ? (
                  <p className="text-white text-center px-6">{cameraError}</p>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Capture Button */}
              <div className="h-28 bg-black flex items-center justify-center pb-4">
                <button
                  onClick={capturePhoto}
                  disabled={!!cameraError}
                  className="w-20 h-20 rounded-full bg-white border-4 border-gray-400 flex items-center justify-center active:scale-90 transition disabled:opacity-50"
                >
                  <Camera size={32} className="text-black" />
                </button>
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        )}

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-pop { animation: popIn 0.15s ease-out; }
        `}</style>
      </div>
    </div>
  );
}
