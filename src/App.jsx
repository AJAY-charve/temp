import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import BmiCheck from "./pages/BmiCheck";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/bmi" element={<BmiCheck />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
