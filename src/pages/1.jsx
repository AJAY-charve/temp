import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashImg from "../assets/splashscreen.png";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home", { replace: true }), 1000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white overflow-hidden">
      <img
        src={splashImg}
        alt="DiabMeta"
        className="w-full h-full object-fit"
      />
    </div>
  );
}
