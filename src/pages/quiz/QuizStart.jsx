import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertCircle,
  History,
} from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg"; // <-- Path updated

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
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
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
          {/* Info Card */}
          <div className="bg-[#E0F2F1] rounded-3xl border border-[#B2DFDB] p-5 mb-6 text-center shadow-sm">
            <h2 className="text-[18px] font-extrabold text-[#005c55] mb-2">
              Start Your Health Quiz
            </h2>
            <p className="text-[11.5px] text-[#005c55]/80 leading-snug">
              Test your knowledge about metabolic health and diseases. You have{" "}
              <strong>{attemptsLeft}</strong> attempts remaining out of{" "}
              {attemptsTotal}.
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-4 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 mb-8"
          >
            <Play size={18} fill="white" /> Start Quiz Now
          </button>

          {/* Past History Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <History size={16} className="text-gray-500" />
              <h3 className="text-[13px] font-bold text-gray-900">
                Past Attempts
              </h3>
            </div>

            <div className="flex flex-col gap-2.5">
              {historyData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#eaedff] flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f4f6fb] flex items-center justify-center text-[#005c55]">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-gray-900">
                        Score: {item.score}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#2e8f3a] bg-[#e4f4e8] px-2 py-1 rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* CONFIRMATION MODAL */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-pop text-center">
              <div className="px-6 pt-7 pb-5 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#E0F2F1] flex items-center justify-center mb-3">
                  <AlertCircle
                    size={32}
                    className="text-[#005c55]"
                    strokeWidth={2.2}
                  />
                </div>
                <h3 className="text-[18px] font-extrabold text-[#14284b]">
                  Start Quiz?
                </h3>
                <p className="text-[12px] text-gray-500 mt-2 leading-snug max-w-[240px]">
                  Are you ready to start the quiz? You will have 5 minutes to
                  complete it.
                </p>
              </div>
              <div className="px-4 pb-4 flex gap-2.5">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-white border-2 border-[#eaedff] text-gray-700 font-bold text-[12.5px] py-3 rounded-xl active:scale-[0.98] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 bg-[#0d6b63] text-white font-bold text-[12.5px] py-3 rounded-xl active:scale-[0.98] transition shadow-md flex items-center justify-center gap-1.5"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
          .animate-pop { animation: popIn 0.22s ease-out; }
        `}</style>
      </div>
    </div>
  );
}
