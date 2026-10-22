import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Loader2,
  Bookmark,
  ScanLine,
  HelpCircle,
} from "lucide-react";

const NAVY = "#14284b";

export default function ScanFood() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanTimer = useRef(null);
  const fileInputRef = useRef(null);

  const [tab, setTab] = useState("scan");
  const [step, setStep] = useState("camera");
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tab !== "scan" || step !== "camera") return;

    let stream = null;
    let cancelled = false;
    setIsCameraOn(false);
    setError("");

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Camera API not supported in this browser.");
          return;
        }
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsCameraOn(true);
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera permission denied or no camera found.");
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
  }, [tab, step]);

  const processImage = (imageUrl) => {
    setCapturedImage(imageUrl);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
    setIsCameraOn(false);
    setStep("scanning");

    scanTimer.current = setTimeout(() => {
      navigate("/scan-food/result", { state: { image: imageUrl } });
    }, 2000);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
      processImage(imageUrl);
    } catch (err) {
      console.error("Capture failed:", err);
    }
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    processImage(url);
    e.target.value = "";
  };

  const TABS = [
    {
      id: "scan",
      label: "Scan Food",
      Icon: ScanLine,
      onClick: () => setTab("scan"),
    },
    {
      id: "saved",
      label: "Saved Meals",
      Icon: Bookmark,
      onClick: () => navigate("/scan-food/saved"),
    },
  ];

  return (
    <div className="h-[100dvh] bg-black flex justify-center">
      <div className="w-full max-w-md h-full flex flex-col relative overflow-hidden">
        <header className="shrink-0 bg-black pt-2">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white active:scale-95"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="font-extrabold text-[16px] text-white">
              Scan Your Meal
            </h1>
            <div className="w-9" />
          </div>
          <div className="px-4 pb-3">
            <div className="flex p-1 rounded-xl gap-1 bg-white border border-[#d9e6f7]">
              {TABS.map(({ id, label, Icon, onClick }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setTab(id);
                      if (onClick) onClick();
                    }}
                    className={`flex-1 h-9 rounded-lg text-[12.5px] font-bold flex items-center justify-center gap-1.5 transition ${
                      active ? "text-white" : "text-gray-500"
                    }`}
                    style={active ? { background: NAVY } : undefined}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {error && (
          <div className="absolute top-32 left-4 right-4 z-50 bg-red-500 text-white p-3 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        <div className="flex-1 min-h-0 relative overflow-hidden bg-[#111]">
          {!capturedImage && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute left-5 right-5 top-4 bottom-5 rounded-3xl border-2 border-dashed border-white/50 pointer-events-none">
                <span className="absolute -top-0.5 -left-0.5 w-9 h-9 border-t-4 border-l-4 border-white rounded-tl-3xl" />
                <span className="absolute -top-0.5 -right-0.5 w-9 h-9 border-t-4 border-r-4 border-white rounded-tr-3xl" />
                <span className="absolute -bottom-0.5 -left-0.5 w-9 h-9 border-b-4 border-l-4 border-white rounded-bl-3xl" />
                <span className="absolute -bottom-0.5 -right-0.5 w-9 h-9 border-b-4 border-r-4 border-white rounded-br-3xl" />
              </div>
            </>
          )}

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured meal"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {step === "scanning" && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
              <Loader2
                size={64}
                className="text-[#0d6b63] animate-spin mb-4"
                strokeWidth={1.5}
              />
              <p className="text-white font-bold text-lg animate-pulse">
                Analyzing Meal...
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0 bg-black flex flex-col items-center justify-center pb-6 pt-3 gap-4">
          {step === "camera" && (
            <>
              <button
                onClick={handleCapture}
                className="w-16 h-16 rounded-full bg-white border-4 border-gray-400 flex items-center justify-center active:scale-90 transition shadow-lg"
              >
                <Camera size={28} className="text-black" />
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-white/10 text-white font-bold text-[13px] px-5 py-2.5 rounded-full active:scale-95 transition"
              >
                <ImageIcon size={16} /> Upload from Gallery
              </button>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleGalleryUpload}
        />
      </div>
    </div>
  );
}
