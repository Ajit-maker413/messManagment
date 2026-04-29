/**
 * Dashboard Pages Index
 * 
 * This file documents all dashboard pages created for the Mess Management System.
 * Each dashboard is role-specific and follows the existing component structure.
 * 
 * Dashboard Pages:
 * 1. StudentDashboard - For regular students
 * 2. WardenDashboard - For wardens/hostel administrators
 * 3. CareTakerDashboard - For care takers
 * 4. MessSecretaryDashboard - For mess secretaries
 * 5. MessSupervisorDashboard - For mess supervisors
 */

// Import all dashboard components
import Dashboard from "./Dashboard/Dashboard"; // Student Dashboard
import WardenDashboard from "./WardenDashboard/WardenDashboard";
import CareTakerDashboard from "./CareTakerDashboard/CareTakerDashboard";
import MessSecretaryDashboard from "./MessSecretaryDashboard/MessSecretaryDashboard";
import MessSupervisorDashboard from "./MessSupervisorDashboard/MessSupervisorDashboard";

/**
 * Dashboard Route Configuration
 * 
 * Example usage in App.tsx or routing setup:
 * 
 * import { ProtectedRoute } from "./components/ProtectedRoute";
 * 
 * <Routes>
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard/student" element={<Dashboard />} />
 *     <Route path="/dashboard/warden" element={<WardenDashboard />} />
 *     <Route path="/dashboard/care-taker" element={<CareTakerDashboard />} />
 *     <Route path="/dashboard/mess-secretary" element={<MessSecretaryDashboard />} />
 *     <Route path="/dashboard/mess-supervisor" element={<MessSupervisorDashboard />} />
 *   </Route>
 * </Routes>
 */

export const dashboardRoutes = [
  {
    path: "/dashboard/student",
    component: Dashboard,
    role: "STUDENT",
    label: "Student Dashboard"
  },
  {
    path: "/dashboard/warden",
    component: WardenDashboard,
    role: "WARDEN",
    label: "Warden Dashboard"
  },
  {
    path: "/dashboard/care-taker",
    component: CareTakerDashboard,
    role: "CARE_TAKER",
    label: "Care Taker Dashboard"
  },
  {
    path: "/dashboard/mess-secretary",
    component: MessSecretaryDashboard,
    role: "MESS_SECRETARY",
    label: "Mess Secretary Dashboard"
  },
  {
    path: "/dashboard/mess-supervisor",
    component: MessSupervisorDashboard,
    role: "MESS_SUPERVISOR",
    label: "Mess Supervisor Dashboard"
  }
];

/**
 * Helper function to get dashboard for user role
 * 
 * Usage: const dashboard = getDashboardByRole("STUDENT");
 */
export const getDashboardByRole = (role: string) => {
  return dashboardRoutes.find((route) => route.role === role);
};

export {
  Dashboard,
  WardenDashboard,
  CareTakerDashboard,
  MessSecretaryDashboard,
  MessSupervisorDashboard
};
