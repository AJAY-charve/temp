import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle, Check } from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

const QUESTIONS = [
  {
    id: 1,
    question: "How often do you exercise?",
    options: ["Daily", "3-4 times a week", "Rarely", "Never"],
    correctAnswer: "Daily", // <-- Yaha correct answer set kiya
  },
  {
    id: 2,
    question: "How would you rate your daily diet?",
    options: ["Very Healthy", "Moderate", "Unhealthy", "Junk food mostly"],
    correctAnswer: "Very Healthy",
  },
  {
    id: 3,
    question: "Do you have a family history of diabetes?",
    options: ["Yes", "No", "Not sure"],
    correctAnswer: "No",
  },
  {
    id: 4,
    question: "How many hours of sleep do you get on average?",
    options: ["7-8 hours", "5-6 hours", "Less than 5 hours"],
    correctAnswer: "7-8 hours",
  },
  {
    id: 5,
    question: "Do you experience frequent fatigue?",
    options: ["Never", "Sometimes", "Often", "Always"],
    correctAnswer: "Never",
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleAutoSubmit = () => {
    navigate("/quiz/result", { state: { answers, questions: QUESTIONS } });
  };

  const confirmSubmit = () => {
    setShowConfirm(false);
    navigate("/quiz/result", { state: { answers, questions: QUESTIONS } });
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
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

        <main className="flex-1 pb-24 px-4 pt-4">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-[16px] font-bold text-gray-900">
                Answer the following
              </h2>
            </div>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-bold text-[12px] shadow-sm transition-colors ${
                timeLeft <= 60
                  ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                  : "bg-white text-[#005c55] border-[#eaedff]"
              }`}
            >
              <Clock
                size={14}
                className={timeLeft <= 60 ? "text-red-500" : "text-[#005c55]"}
              />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {QUESTIONS.map((q, qIndex) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-[#eaedff] p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-[13.5px] font-extrabold text-[#14284b] leading-snug mb-4">
                  <span className="text-[#005c55] mr-1">{qIndex + 1}.</span>
                  {q.question}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {q.options.map((option, oIndex) => {
                    const selected = answers[qIndex] === option;
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelect(qIndex, option)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                          selected
                            ? "border-[#005c55] bg-[#9cf2e8]/30"
                            : "border-[#eaedff] bg-[#faf8ff] active:scale-[0.99]"
                        }`}
                      >
                        <span
                          className={`text-[12.5px] font-semibold ${selected ? "text-[#005c55]" : "text-gray-700"}`}
                        >
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-[#0d6b63] text-white font-bold text-[14px] py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2"
            >
              Submit Quiz
            </button>
          </div>
        </div>

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
                  Submit Quiz?
                </h3>
                <p className="text-[12px] text-gray-500 mt-2 leading-snug max-w-[240px]">
                  Are you sure you want to submit? Your answers will be final.
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
                  onClick={confirmSubmit}
                  className="flex-1 bg-[#0d6b63] text-white font-bold text-[12.5px] py-3 rounded-xl active:scale-[0.98] transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check size={16} /> Confirm
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
