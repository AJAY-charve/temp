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
import DiabetesHealthPlanDetail from "./pages/DiabetesHealthPlanDetail";
import ScanFood from "./pages/ScanFood";
import Records from "./pages/Records";
import Store from "./pages/Store";
import BookingHistory from "./pages/BookingHistory";
import ProductDetail from "./pages/ProductDetail";
import DiseasesList from "./pages/DiseasesList";
import DiseaseDetail from "./pages/DiseaseDetail";
import SymptomsList from "./pages/SymptomsList";
import SymptomDetail from "./pages/SymptomDetail";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import QuizStart from "./pages/QuizStart";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import AddFamilyMember from "./pages/AddFamilyMember"; // <-- Naya Import

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
      {/* Scan Food Route */}
      <Route path="/scan-food" element={<ScanFood />} />
      {/* Records Route */}
      <Route path="/records" element={<Records />} />
      {/* Store Routes */}
      <Route path="/store" element={<Store />} />
      <Route path="/store/history" element={<BookingHistory />} />
      <Route path="/store/product/:id" element={<ProductDetail />} />
      {/* Know Your Diseases Routes */}
      <Route path="/diseases" element={<DiseasesList />} />
      <Route path="/diseases/:id" element={<DiseaseDetail />} />
      {/* Know Your Symptoms Routes */}
      <Route path="/symptoms" element={<SymptomsList />} />
      <Route path="/symptoms/:id" element={<SymptomDetail />} />
      {/* New Routes */}
      <Route path="/contact" element={<Contact />} />
      {/* Profile Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/add-member" element={<AddFamilyMember />} />{" "}
      {/* <-- Naya Route */}
      {/* Quiz Routes */}
      <Route path="/quiz" element={<QuizStart />} />
      <Route path="/quiz/start" element={<Quiz />} />
      <Route path="/quiz/result" element={<QuizResult />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
