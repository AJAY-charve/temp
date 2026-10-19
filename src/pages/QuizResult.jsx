import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Home,
  XCircle,
  Award,
  Check,
} from "lucide-react";
import logo from "../assets/daibmetalogo.jpeg";

export default function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const answers = location.state?.answers || {};
  const questions = location.state?.questions || [];

  let correctCount = 0;
  let attemptedCount = Object.keys(answers).length;
  let totalQuestions = questions.length;

  questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      correctCount++;
    }
  });

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
            <h1 className="font-bold text-gray-900 text-[15px]">Quiz Result</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-10 px-4 pt-6">
          {/* Success Message Drop */}
          <div className="bg-[#e4f4e8] border border-[#bde5c4] rounded-2xl p-4 flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-none">
              <Check size={18} className="text-[#2e9e48]" />
            </div>
            <div>
              <h4 className="text-[12.5px] font-bold text-[#2e9e48]">
                Result Saved!
              </h4>
              <p className="text-[10.5px] text-[#2e9e48]/80 mt-0.5 leading-snug">
                Your attempt has been recorded. You can view this in your past
                attempts.
              </p>
            </div>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-3xl border border-[#eaedff] p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#E0F2F1] flex items-center justify-center mx-auto mb-4">
              <Award size={40} className="text-[#0d6b63]" strokeWidth={2.2} />
            </div>
            <h2 className="text-[22px] font-extrabold text-[#14284b]">
              {correctCount} / {totalQuestions}
            </h2>
            <p className="text-[12px] text-gray-500 font-medium mt-1">
              Questions Correct
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 border-t border-[#eaedff] pt-4">
              <div className="text-center">
                <p className="text-[16px] font-bold text-[#005c55]">
                  {attemptedCount}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                  Attempted
                </p>
              </div>
              <div className="w-px h-8 bg-[#eaedff]" />
              <div className="text-center">
                <p className="text-[16px] font-bold text-[#0d6b63]">
                  {correctCount}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                  Correct
                </p>
              </div>
              <div className="w-px h-8 bg-[#eaedff]" />
              <div className="text-center">
                <p className="text-[16px] font-bold text-[#e53935]">
                  {attemptedCount - correctCount}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                  Wrong
                </p>
              </div>
            </div>
          </div>

          {/* Details / Review List */}
          <div className="bg-white rounded-3xl border border-[#eaedff] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-6">
            <h3 className="text-[13px] font-bold text-gray-900 mb-4">
              Review Answers
            </h3>
            <div className="flex flex-col gap-3">
              {questions.map((q, i) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.correctAnswer;
                const isSkipped = !userAns;

                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#fafbff] border border-[#f0f2f8]"
                  >
                    <div className="mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 size={16} className="text-[#0d6b63]" />
                      ) : (
                        <XCircle size={16} className="text-[#e53935]" />
                      )}
                    </div>
                    <div>
                      <p className="text-[11.5px] font-bold text-gray-900 leading-tight mb-1">
                        {i + 1}. {q.question}
                      </p>
                      <p className="text-[10.5px] text-gray-500">
                        {isSkipped ? (
                          <span className="text-orange-500 font-semibold">
                            Not Attempted
                          </span>
                        ) : (
                          <>
                            Your answer:{" "}
                            <span
                              className={
                                isCorrect
                                  ? "font-semibold text-[#0d6b63]"
                                  : "font-semibold text-[#e53935]"
                              }
                            >
                              {userAns}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-[#0d6b63] text-white font-bold text-[13.5px] py-4 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2"
          >
            <Home size={18} /> Back to Home
          </button>
        </main>
      </div>
    </div>
  );
}
