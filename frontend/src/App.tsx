import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ChiefWardenPanel from "./pages/ChiefWardenPanel/ChiefWardenPanel";
import Dashboard from "./pages/Dashboard/Dashboard";
import FeedbackPage from "./pages/FeedbackPage/Feedback";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();

  const hideLayoutRoutes = ["/admin", "/chief-warden", "/dashboard"];

  const isDashboardPage = hideLayoutRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!isDashboardPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chief-warden"
          element={
            <ProtectedRoute allowedRoles={["WARDEN"]}>
              <ChiefWardenPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isDashboardPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
