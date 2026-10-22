import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";

// BMI Module
import BmiCheck from "./pages/bmi/BmiCheck";
import DiagnosticDetail from "./pages/bmi/DiagnosticDetail";
import HealthPlanDetail from "./pages/bmi/HealthPlanDetail";

// Diabetes Module
import DiabetesAssessment from "./pages/diabetes/DiabetesAssessment";
import DiabetesResult from "./pages/diabetes/DiabetesResult";
import DiabetesHealthPlanDetail from "./pages/diabetes/DiabetesHealthPlanDetail";

// Period Tracker Module
import PeriodLock from "./pages/period-tracker/PeriodLock";
import PeriodSetup from "./pages/period-tracker/PeriodSetup";
import PeriodHome from "./pages/period-tracker/PeriodHome";
import PeriodDailyLog from "./pages/period-tracker/PeriodDailyLog";
import PeriodInsights from "./pages/period-tracker/PeriodInsights";
import PeriodReminders from "./pages/period-tracker/PeriodReminders";
import PeriodHealthGuide from "./pages/period-tracker/PeriodHealthGuide";
import PeriodGuideDetail from "./pages/period-tracker/PeriodGuideDetail";

// Health Tips Module
import HealthTipsList from "./pages/health-tips/HealthTipsList";
import HealthTipDetail from "./pages/health-tips/HealthTipDetail";

// Notifications Module
import NotificationsList from "./pages/notifications/NotificationsList";
import NotificationDetail from "./pages/notifications/NotificationDetail";

import Records from "./pages/Records";
import DiseasesList from "./pages/DiseasesList";
import DiseaseDetail from "./pages/DiseaseDetail";
import SymptomsList from "./pages/SymptomsList";
import SymptomDetail from "./pages/SymptomDetail";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AddFamilyMember from "./pages/AddFamilyMember";

// Pill Reminder Imports
import PillReminder from "./pages/pill-reminder/PillReminder";
import AddMedicine from "./pages/pill-reminder/AddMedicine";

// Sugar & BP Logbook Imports
import LogbookHome from "./pages/sugar-bp/LogbookHome";
import AddSugar from "./pages/sugar-bp/AddSugar";
import AddBP from "./pages/sugar-bp/AddBP";
import History from "./pages/sugar-bp/History";
import Trends from "./pages/sugar-bp/Trends";

// Calorie Tracker Imports
import CalorieHome from "./pages/calorie-tracker/CalorieHome";
import NutritionIntake from "./pages/calorie-tracker/NutritionIntake";
import CalorieBurn from "./pages/calorie-tracker/CalorieBurn";
import CalorieBalance from "./pages/calorie-tracker/CalorieBalance";

// Store Imports
import Store from "./pages/store/Store";
import BookingHistory from "./pages/store/BookingHistory";
import ProductDetail from "./pages/store/ProductDetail";

// Quiz Imports
import QuizStart from "./pages/quiz/QuizStart";
import Quiz from "./pages/quiz/Quiz";
import QuizResult from "./pages/quiz/QuizResult";

// Scan Food Imports
import ScanFood from "./pages/scan-food/ScanFood";
import ScanResult from "./pages/scan-food/ScanResult";
import SavedMeals from "./pages/scan-food/SavedMeals";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />

      {/* BMI Routes */}
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

      {/* Period Tracker Routes */}
      <Route path="/period-tracker/lock" element={<PeriodLock />} />
      <Route path="/period-tracker/setup" element={<PeriodSetup />} />
      <Route path="/period-tracker" element={<PeriodHome />} />
      <Route path="/period-tracker/daily-log" element={<PeriodDailyLog />} />
      <Route path="/period-tracker/insights" element={<PeriodInsights />} />
      <Route path="/period-tracker/reminders" element={<PeriodReminders />} />
      <Route
        path="/period-tracker/health-guide"
        element={<PeriodHealthGuide />}
      />
      <Route
        path="/period-tracker/health-guide/:id"
        element={<PeriodGuideDetail />}
      />

      {/* Health Tips Routes */}
      <Route path="/health-tips" element={<HealthTipsList />} />
      <Route path="/health-tips/:id" element={<HealthTipDetail />} />

      {/* Notifications Routes */}
      <Route path="/notifications" element={<NotificationsList />} />
      <Route path="/notifications/:id" element={<NotificationDetail />} />

      {/* Scan Food Routes */}
      <Route path="/scan-food" element={<ScanFood />} />
      <Route path="/scan-food/result" element={<ScanResult />} />
      <Route path="/scan-food/saved" element={<SavedMeals />} />

      {/* Pill Reminder Routes */}
      <Route path="/pill-reminder" element={<PillReminder />} />
      <Route path="/pill-reminder/add" element={<AddMedicine />} />

      {/* Sugar & BP Logbook Routes */}
      <Route path="/sugar-bp" element={<LogbookHome />} />
      <Route path="/sugar-bp/add-sugar" element={<AddSugar />} />
      <Route path="/sugar-bp/add-bp" element={<AddBP />} />
      <Route path="/sugar-bp/history" element={<History />} />
      <Route path="/sugar-bp/trends" element={<Trends />} />

      {/* Calorie Tracker Routes */}
      <Route path="/calorie-tracker" element={<CalorieHome />} />
      <Route path="/calorie-tracker/intake" element={<NutritionIntake />} />
      <Route path="/calorie-tracker/burn" element={<CalorieBurn />} />
      <Route path="/calorie-tracker/balance" element={<CalorieBalance />} />

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
      <Route path="/profile/add-member" element={<AddFamilyMember />} />

      {/* Quiz Routes */}
      <Route path="/quiz" element={<QuizStart />} />
      <Route path="/quiz/start" element={<Quiz />} />
      <Route path="/quiz/result" element={<QuizResult />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
