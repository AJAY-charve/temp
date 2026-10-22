import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import { healthTipsData } from "./HealthTipsData";
import logo from "../../assets/daibmetalogo.jpeg";

export default function HealthTipsList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = healthTipsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(healthTipsData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito">
      <header className="px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => navigate("/home")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <h1 className="text-base font-black text-[#1a237e] flex-1 text-center">
          Health Tips
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-5 overflow-y-auto pb-8">
        <div className="mb-6">
          <h2 className="text-[24px] font-black text-[#1a237e] mb-1">
            Daily Health Tips
          </h2>
          <p className="text-[13px] text-gray-500 font-medium">
            Explore expert advice to manage your health better.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {currentItems.map((tip) => (
            <button
              key={tip.id}
              onClick={() => navigate(`/health-tips/${tip.id}`)}
              className="bg-white rounded-2xl border border-[#eaedff] p-3.5 flex items-center justify-between text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.98] transition group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#E0F2F1] flex items-center justify-center flex-shrink-0 group-hover:bg-[#b2dfdb] transition">
                  <BookOpen size={20} className="text-[#005c55]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[9px] font-extrabold ${tip.tagColor} tracking-wider uppercase bg-gray-50 px-2 py-0.5 rounded-sm`}
                    >
                      {tip.tag}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {tip.time} read
                    </span>
                  </div>
                  <h3 className="text-[14px] font-extrabold text-[#1a237e] leading-tight">
                    {tip.title}
                  </h3>
                  <p className="text-[11.5px] text-gray-500 font-medium mt-1 leading-snug line-clamp-1">
                    {tip.desc}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="text-gray-300 flex-shrink-0 group-hover:text-[#005c55] transition"
              />
            </button>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-[12px] font-bold text-[#005c55] disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <div className="flex gap-1.5">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-7 h-7 rounded-full text-[11px] font-bold transition ${
                    currentPage === i + 1
                      ? "bg-[#005c55] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-[12px] font-bold text-[#005c55] disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
