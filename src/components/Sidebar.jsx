import { useNavigate } from "react-router-dom";
import {
  X,
  Home as HomeIcon,
  CalendarDays,
  ClipboardList,
  FileText,
  Activity,
  Headset,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  // Yaha routes aur icons update kiye hain
  const items = [
    { icon: <HomeIcon size={18} />, label: "Home", path: "/home" },
    { icon: <User size={18} />, label: "My Profile", path: "/profile" },
    {
      icon: <CalendarDays size={18} />,
      label: "Appointment",
      path: "/appointment",
    },
    { icon: <Activity size={18} />, label: "BMI Check", path: "/bmi" },
    { icon: <ClipboardList size={18} />, label: "Quiz", path: "/quiz" },
    { icon: <FileText size={18} />, label: "My Records", path: "/records" },
    { icon: <Headset size={18} />, label: "Contact Us", path: "/contact" },
  ];

  const go = (path) => {
    if (path) navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop - z-50 ensures it covers the header */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      ></div>

      {/* Drawer - z-50 ensures it's on top */}
      <aside
        className="fixed top-0 left-0 bottom-0 w-72 max-w-[80%] bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideRight 0.25s ease" }}
      >
        {/* Header */}
        <div className="px-4 py-5 border-b border-gray-100 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => go("/profile")}
          >
            <div className="w-11 h-11 rounded-full bg-[#9cf2e8] flex items-center justify-center text-[#005c55] font-bold text-[15px]">
              R
            </div>
            <div>
              <p className="text-[14px] font-bold text-gray-900">Rahul Gupta</p>
              <p className="text-[11px] text-gray-500">View Profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95"
          >
            <X size={16} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-2">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => go(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f4f6fb] active:scale-[0.99] transition"
            >
              <span className="text-[#005c55]">{item.icon}</span>
              <span className="text-[13px] font-semibold text-gray-800">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={() => go("/login")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 active:scale-[0.99] transition"
          >
            <LogOut size={18} />
            <span className="text-[13px] font-bold">Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}
