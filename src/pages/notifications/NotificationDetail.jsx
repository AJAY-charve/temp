import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, Calendar, Clock } from "lucide-react";
import { notificationsData } from "./NotificationsData";
import logo from "../../assets/daibmetalogo.jpeg";

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const notif =
    notificationsData.find((n) => n.id === id) || notificationsData[0];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito">
      <header className="px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => navigate("/notifications")} className="p-1 w-8">
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>
        <h1 className="text-base font-black text-[#1a237e] flex-1 text-center">
          Notification
        </h1>
        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-6 overflow-y-auto pb-10">
        <div className="bg-white rounded-[24px] border border-[#eaedff] p-6 mb-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#E0F2F1] flex items-center justify-center mb-4">
            <Bell size={24} className="text-[#005c55]" />
          </div>

          <h1 className="text-[20px] font-black text-[#1a237e] leading-tight mb-2">
            {notif.title}
          </h1>

          <div className="flex items-center gap-4 mb-5 text-[11px] text-gray-500 font-medium">
            <div className="flex items-center gap-1">
              <Calendar size={12} /> {notif.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} /> {notif.time}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
              {notif.details}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
