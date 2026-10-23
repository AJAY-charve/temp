import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Award, Check, FileText } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

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
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition"
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
          {/* Success Banner */}
          <div className="bg-[#e4f4e8]/60 border border-[#bde5c4] rounded-[20px] p-4 flex items-start gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-none shadow-sm">
              <Check size={16} className="text-[#2e9e48]" strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-[12.5px] font-extrabold text-[#2e9e48]">
                Result Saved Successfully!
              </h4>
              <p className="text-[11px] text-[#2e9e48]/80 mt-0.5 leading-snug font-medium">
                Your attempt has been recorded. You can view this in your past
                attempts.
              </p>
            </div>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-[32px] border border-[#eaedff] p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] text-center mb-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#E0F2F1]/50 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-[#E0F2F1] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Award size={48} className="text-[#0d6b63]" strokeWidth={2} />
              </div>
              <h2 className="text-[32px] font-extrabold text-[#14284b] tracking-tight">
                {correctCount}{" "}
                <span className="text-[20px] text-gray-400 font-bold">
                  / {totalQuestions}
                </span>
              </h2>
              <p className="text-[12px] text-gray-500 font-bold mt-1 uppercase tracking-wide">
                Questions Correct
              </p>

              <div className="mt-6 flex items-center justify-center gap-6 border-t border-[#eaedff] pt-6">
                <div className="text-center">
                  <p className="text-[18px] font-extrabold text-[#14284b]">
                    {attemptedCount}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">
                    Attempted
                  </p>
                </div>
                <div className="w-px h-10 bg-[#eaedff]" />
                <div className="text-center">
                  <p className="text-[18px] font-extrabold text-[#2e9e48]">
                    {correctCount}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">
                    Correct
                  </p>
                </div>
                <div className="w-px h-10 bg-[#eaedff]" />
                <div className="text-center">
                  <p className="text-[18px] font-extrabold text-[#ef5350]">
                    {attemptedCount - correctCount}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">
                    Wrong
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Review Answers (No Correct/Wrong marking) */}
          <div className="bg-white rounded-[28px] border border-[#eaedff] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] mb-8">
            <h3 className="text-[14px] font-extrabold text-[#14284b] mb-4 flex items-center gap-2">
              <FileText size={16} className="text-[#0d6b63]" />
              Your Answers
            </h3>
            <div className="flex flex-col gap-3">
              {questions.map((q, i) => {
                const userAns = answers[i];
                const isSkipped = !userAns;

                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[#fafbff] border border-[#f0f2f8]"
                  >
                    <div>
                      <p className="text-[12px] font-bold text-[#14284b] leading-snug mb-2">
                        {i + 1}. {q.question}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-gray-400 font-medium">
                          Your answer:
                        </span>
                        {isSkipped ? (
                          <span className="text-gray-400 font-bold italic">
                            Not Answered
                          </span>
                        ) : (
                          <span className="font-bold text-[#0d6b63] bg-[#E0F2F1] px-2 py-0.5 rounded-md">
                            {userAns}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-[#0d6b63] text-white font-bold text-[14.5px] py-4 rounded-2xl active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(13,107,99,0.25)] flex items-center justify-center gap-2 hover:bg-[#0a5750]"
          >
            <Home size={18} /> Back to Home
          </button>
        </main>
      </div>
    </div>
  );
}
