import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import BmiCheck from "./pages/BmiCheck";
import DiagnosticDetail from "./pages/DiagnosticDetail";
import HealthPlanDetail from "./pages/HealthPlanDetail";
import DiabetesAssessment from "./pages/DiabetesAssessment";
import DiabetesResult from "./pages/DiabetesResult";
import DiabetesHealthPlanDetail from "./pages/DiabetesHealthPlanDetail"; // Naya Import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/bmi" element={<BmiCheck />} />
      <Route path="/diagnostic/:slug" element={<DiagnosticDetail />} />
      <Route
        path="/health-plan/:category/:planType"
        element={<HealthPlanDetail />}
      />

      {/* Diabetes Routes */}
      <Route path="/diabetes" element={<DiabetesAssessment />} />
      <Route path="/diabetes/result" element={<DiabetesResult />} />
      <Route
        path="/diabetes/health-plan/:level/:planType"
        element={<DiabetesHealthPlanDetail />}
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
