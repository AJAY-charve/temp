import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertCircle,
  History,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

export default function QuizStart() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  // Static Attempt Data (5 me se 3 attempt bache hain)
  const attemptsLeft = 3;
  const attemptsTotal = 5;

  const historyData = [
    { id: 1, date: "12 Mar 2025", score: "4 / 5", status: "Good" },
    { id: 2, date: "05 Mar 2025", score: "3 / 5", status: "Moderate" },
  ];

  const handleStartQuiz = () => {
    setShowConfirm(false);
    navigate("/quiz/start");
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">Health Quiz</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-10 px-4 pt-6">
          {/* Info Card with Logo */}
          <div className="bg-gradient-to-br from-[#E0F2F1] to-[#f0fbf9] rounded-[28px] border border-[#B2DFDB] p-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 text-center flex flex-col items-center">
              {/* DiabMeta Logo in the hero card */}
              <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(0,92,85,0.08)] border border-[#B2DFDB]/50 p-2.5">
                <img
                  src={logo}
                  alt="DiabMeta Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <h2 className="text-[20px] font-extrabold text-[#005c55] mb-2 tracking-tight">
                Ready to test yourself?
              </h2>
              <p className="text-[12px] text-[#005c55]/80 leading-relaxed max-w-[260px] mx-auto font-medium">
                Test your knowledge about metabolic health. You have{" "}
                <strong className="text-[#005c55]">{attemptsLeft}</strong>{" "}
                attempts remaining out of {attemptsTotal}.
              </p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14.5px] py-4 rounded-2xl active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(13,107,99,0.25)] flex items-center justify-center gap-2 mb-10 hover:bg-[#0a5750]"
          >
            <Play size={18} fill="white" /> Start Quiz Now
          </button>

          {/* Past History Section */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <History size={16} className="text-gray-400" />
                <h3 className="text-[13px] font-extrabold text-gray-900 uppercase tracking-wide">
                  Past Attempts
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#0d6b63] bg-[#E0F2F1] px-2 py-1 rounded-md">
                {historyData.length} Records
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {historyData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-[#eaedff] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.99] transition cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#f4f6fb] flex items-center justify-center text-[#005c55]">
                      <CheckCircle2 size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#14284b]">
                        Score: {item.score}
                      </p>
                      <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        item.status === "Good"
                          ? "bg-[#e4f4e8] text-[#2e8f3a]"
                          : "bg-[#fdf1d3] text-[#d97706]"
                      }`}
                    >
                      {item.status}
                    </span>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* CONFIRMATION MODAL */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-[#14284b]/40 backdrop-blur-sm transition-opacity"
              onClick={() => setShowConfirm(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl animate-pop text-center">
              <div className="px-6 pt-8 pb-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#E0F2F1] flex items-center justify-center mb-4">
                  <AlertCircle
                    size={32}
                    className="text-[#005c55]"
                    strokeWidth={2.2}
                  />
                </div>
                <h3 className="text-[20px] font-extrabold text-[#14284b]">
                  Start Quiz?
                </h3>
                <p className="text-[12.5px] text-gray-500 mt-2 leading-relaxed max-w-[250px]">
                  Are you ready to start the quiz? You will have{" "}
                  <strong>5 minutes</strong> to complete it.
                </p>
              </div>
              <div className="px-5 pb-5 flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-white border-2 border-[#eaedff] text-gray-600 font-bold text-[13px] py-3.5 rounded-2xl active:scale-[0.98] transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 bg-[#0d6b63] text-white font-bold text-[13px] py-3.5 rounded-2xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-1.5 hover:bg-[#0a5750]"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          .animate-pop { animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        `}</style>
      </div>
    </div>
  );
}
