import { useNavigate } from "react-router-dom";
import { Bell, ChevronRight, X } from "lucide-react";
import { notificationsData } from "./NotificationsData";

export default function NotificationDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Show only top 3 recent notifications
  const recentNotifications = notificationsData.slice(0, 3);

  return (
    <>
      {/* Backdrop for click outside */}
      <div
        className="fixed inset-0 z-40 bg-black/20 sm:hidden"
        onClick={onClose}
      ></div>

      {/* Dropdown Panel */}
      <div className="absolute right-0 top-12 z-50 w-[290px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.15)] border border-[#eaedff] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-3 py-2.5 border-b border-[#eaedff] bg-[#faf8ff] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bell size={14} className="text-[#005c55]" />
            <h3 className="text-[13px] font-black text-[#005c55]">
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-white rounded-full border border-gray-200 text-gray-500 hover:text-gray-800"
          >
            <X size={12} />
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col">
          {recentNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                navigate(`/notifications/${notif.id}`);
                onClose();
              }}
              className={`px-3.5 py-2.5 border-b border-gray-50 cursor-pointer hover:bg-[#f4f6fb] transition ${!notif.isRead ? "bg-[#f0faf8]" : ""}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="relative flex-shrink-0 mt-0.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${!notif.isRead ? "bg-[#E0F2F1]" : "bg-gray-100"}`}
                  >
                    <Bell
                      size={12}
                      className={
                        !notif.isRead ? "text-[#005c55]" : "text-gray-400"
                      }
                    />
                  </div>
                  {!notif.isRead && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#e91e63] border border-white rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[12px] leading-tight truncate ${!notif.isRead ? "font-extrabold text-[#1a237e]" : "font-semibold text-gray-700"}`}
                  >
                    {notif.title}
                  </p>
                  <p className="text-[10.5px] text-gray-500 mt-1 line-clamp-2 leading-snug">
                    {notif.message}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium mt-1">
                    {notif.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer View All */}
        <div className="p-2 border-t border-[#eaedff] bg-white">
          <button
            onClick={() => {
              navigate("/notifications");
              onClose();
            }}
            className="w-full py-2 bg-[#E0F2F1] text-[#005c55] font-bold text-[11.5px] rounded-lg flex items-center justify-center gap-1 active:scale-[0.98] transition"
          >
            View All Notifications <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
