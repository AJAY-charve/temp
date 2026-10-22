import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bell, CheckCircle2 } from "lucide-react";
import { notificationsData } from "./NotificationsData";
import logo from "../../assets/daibmetalogo.jpeg";

export default function NotificationsList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notificationsData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(notificationsData.length / itemsPerPage);

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
          All Notifications
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-4 overflow-y-auto pb-8">
        <div className="flex flex-col gap-3 mb-6">
          {currentItems.map((notif) => (
            <button
              key={notif.id}
              onClick={() => navigate(`/notifications/${notif.id}`)}
              className={`bg-white rounded-2xl border p-3.5 flex items-start text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.98] transition relative ${
                !notif.isRead
                  ? "border-[#9cf2e8] bg-[#f4fbf9]"
                  : "border-[#eaedff]"
              }`}
            >
              {/* Icon Section */}
              <div className="mr-3 mt-0.5 flex-shrink-0 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notif.isRead ? "bg-[#E0F2F1]" : "bg-gray-100"
                  }`}
                >
                  <Bell
                    size={18}
                    className={
                      !notif.isRead ? "text-[#005c55]" : "text-gray-400"
                    }
                  />
                </div>
                {/* Unread Dot */}
                {!notif.isRead && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-[#e91e63] border-2 border-white rounded-full"></span>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between mb-0.5">
                  <h3
                    className={`text-[13.5px] truncate ${
                      !notif.isRead
                        ? "font-extrabold text-[#1a237e]"
                        : "font-bold text-gray-700"
                    }`}
                  >
                    {notif.title}
                  </h3>
                </div>

                <p
                  className={`text-[12px] leading-snug line-clamp-2 mt-0.5 ${!notif.isRead ? "text-gray-700 font-medium" : "text-gray-500"}`}
                >
                  {notif.message}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-gray-400 font-medium">
                    {notif.date} · {notif.time}
                  </span>

                  {/* Read/Unread Status Tag */}
                  {notif.isRead ? (
                    <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <CheckCircle2 size={10} /> Read
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-[#005c55] bg-[#E0F2F1] px-2 py-0.5 rounded-sm flex items-center gap-1">
                      Unread
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-gray-300 flex-shrink-0 mt-3"
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
