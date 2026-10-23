import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle, Check } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

const QUESTIONS = [
  {
    id: 1,
    question: "How often do you exercise?",
    options: ["Daily", "3-4 times a week", "Rarely", "Never"],
    correctAnswer: "Daily",
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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

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

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
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
        <main className="flex-1 pb-28 px-4 pt-5">
          {/* Timer & Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-[17px] font-extrabold text-[#14284b]">
                Answer the following
              </h2>
              <p className="text-[11.5px] font-medium text-gray-500 mt-1">
                {answeredCount} of {QUESTIONS.length} questions answered
              </p>
            </div>
            <div
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-bold text-[13px] shadow-sm transition-all ${
                timeLeft <= 60
                  ? "bg-[#fde3e3] text-[#ef5350] border-[#fbcaca] animate-pulse"
                  : "bg-white text-[#005c55] border-[#eaedff]"
              }`}
            >
              <Clock
                size={15}
                className={timeLeft <= 60 ? "text-[#ef5350]" : "text-[#005c55]"}
              />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Questions */}
          <div className="flex flex-col gap-6">
            {QUESTIONS.map((q, qIndex) => (
              <div
                key={q.id}
                className="bg-white rounded-[24px] border border-[#eaedff] p-5 shadow-[0_4px_16px_rgba(15,23,42,0.03)]"
              >
                <h3 className="text-[14px] font-extrabold text-[#14284b] leading-snug mb-4 flex gap-2">
                  <span className="text-[#0d6b63] bg-[#E0F2F1] w-6 h-6 rounded-md flex items-center justify-center flex-none text-[12px]">
                    {qIndex + 1}
                  </span>
                  {q.question}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {q.options.map((option, oIndex) => {
                    const selected = answers[qIndex] === option;
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelect(qIndex, option)}
                        className={`w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                          selected
                            ? "border-[#0d6b63] bg-[#E0F2F1]/50 shadow-sm"
                            : "border-[#eaedff] bg-[#faf8ff] hover:bg-gray-50 active:scale-[0.99]"
                        }`}
                      >
                        <span
                          className={`text-[13px] font-bold ${
                            selected ? "text-[#0d6b63]" : "text-gray-600"
                          }`}
                        >
                          {option}
                        </span>
                        {selected && (
                          <div className="w-5 h-5 rounded-full bg-[#0d6b63] flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* SUBMIT BUTTON */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_24px_rgba(15,23,42,0.06)]">
          <div className="max-w-md mx-auto px-5 py-4">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-[#0d6b63] text-white font-bold text-[14.5px] py-4 rounded-2xl active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(13,107,99,0.25)] flex items-center justify-center gap-2 hover:bg-[#0a5750]"
            >
              Submit Quiz
            </button>
          </div>
        </div>

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
                  Submit Quiz?
                </h3>
                <p className="text-[12.5px] text-gray-500 mt-2 leading-relaxed max-w-[250px]">
                  You have answered <strong>{answeredCount}</strong> out of{" "}
                  {QUESTIONS.length} questions. Are you sure you want to submit?
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
                  onClick={confirmSubmit}
                  className="flex-1 bg-[#0d6b63] text-white font-bold text-[13px] py-3.5 rounded-2xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-1.5 hover:bg-[#0a5750]"
                >
                  <Check size={16} /> Confirm
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
