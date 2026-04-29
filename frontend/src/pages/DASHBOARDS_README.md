# Dashboard Pages Implementation Guide

## Overview
This document describes the 5 dashboard pages created for the Mess Management System. Each dashboard is role-specific and fully integrated with the backend API.

## Dashboard Pages

### 1. **Student Dashboard** (`Dashboard.tsx`)
**Location:** `pages/Dashboard/`
**Role:** `STUDENT`
**Features:**
- Mess card monthly view
- Monthly and yearly billing
- Feedback submission and history
- Special meals viewing
- Open/Close mess card functionality
- Active days tracking

**Key Functions:**
```typescript
import {
  getMessCardView,
  getMonthlyBill,
  getYearlyBill,
  getFeedback,
  openMessCard,
  closeMessCard,
  joinSpecialMeal,
  addSubscription
} from "@/api/mess";
```

---

### 2. **Warden Dashboard** (`WardenDashboard.tsx`)
**Location:** `pages/WardenDashboard/`
**Role:** `WARDEN`
**Features:**
- Staff management (add/remove staff)
- Mess summary overview
- Active mess cards monitoring
- Statistics (active cards, total staff, active days)
- Staff list with role badges
- Email configuration updates

**Key Functions:**
```typescript
import {
  addStaff,
  getAllStaff,
  removeStaff,
  getMessSummary,
  getAllMessActiveCards,
  updateEmailConfig
} from "@/api/warden";
```

---

### 3. **Care Taker Dashboard** (`CareTakerDashboard.tsx`)
**Location:** `pages/CareTakerDashboard/`
**Role:** `CARE_TAKER`
**Features:**
- Student management (add new students)
- Hostel hostel details tracking
- Mess card creation for students
- Expense tracking and management
- Student status overview (active/inactive)
- Expense categorization

**Key Functions:**
```typescript
import {
  addNewStudent,
  getAllStudents,
  addNewCard,
  addExpense,
  getExpenses
} from "@/api/careTaker";
```

---

### 4. **Mess Secretary Dashboard** (`MessSecretaryDashboard.tsx`)
**Location:** `pages/MessSecretaryDashboard/`
**Role:** `MESS_SECRETARY`
**Features:**
- Ration consumption tracking
- Ration item management
- Special meal creation and management
- Weekly expense tracking
- Net card statistics (total/open/closed)
- Active cards monitoring
- Special meal polling

**Key Functions:**
```typescript
import {
  getActiveCards,
  getNetCard,
  getRation,
  addRationConsumption,
  getSpecialMealSummary,
  createSpecialMeal,
  getSpecialMeals,
  addSpecialMealStudent,
  addWeeklyExpense,
  getWeeklyExpense
} from "@/api/messSecretary";
```

---

### 5. **Mess Supervisor Dashboard** (`MessSupervisorDashboard.tsx`)
**Location:** `pages/MessSupervisorDashboard/`
**Role:** `MESS_SUPERVISOR`
**Features:**
- Ration item inventory management (CRUD)
- Monthly consumption tracking
- Inventory valuation
- Item-wise cost tracking
- Supplier management
- Consumption statistics

**Key Functions:**
```typescript
import {
  addRationItem,
  getRationItems,
  updateRationItem,
  deleteRationItem,
  getMonthlyConsumption
} from "@/api/messSupervisor";
```

---

## Integration with Routing

### Setup in `App.tsx` or `main routing file`:

```typescript
import { ProtectedRoute } from "./components/ProtectedRoute";
import { dashboardRoutes } from "./pages";

<Routes>
  <Route element={<ProtectedRoute />}>
    {dashboardRoutes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={<route.component />}
      />
    ))}
  </Route>
</Routes>
```

### Or manual setup:

```typescript
import {
  Dashboard,
  WardenDashboard,
  CareTakerDashboard,
  MessSecretaryDashboard,
  MessSupervisorDashboard
} from "./pages";
import { ProtectedRoute } from "./components/ProtectedRoute";

<Routes>
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard/student" element={<Dashboard />} />
    <Route path="/dashboard/warden" element={<WardenDashboard />} />
    <Route path="/dashboard/care-taker" element={<CareTakerDashboard />} />
    <Route path="/dashboard/mess-secretary" element={<MessSecretaryDashboard />} />
    <Route path="/dashboard/mess-supervisor" element={<MessSupervisorDashboard />} />
  </Route>
</Routes>
```

---

## Navigation Setup

### Add navigation links based on user role:

```typescript
export const getRoleBasedDashboard = (role: string) => {
  const dashboardMap: Record<string, string> = {
    STUDENT: "/dashboard/student",
    WARDEN: "/dashboard/warden",
    CARE_TAKER: "/dashboard/care-taker",
    MESS_SECRETARY: "/dashboard/mess-secretary",
    MESS_SUPERVISOR: "/dashboard/mess-supervisor"
  };
  return dashboardMap[role] || "/";
};

// In AuthContext or useAuth hook
const handleLoginRedirect = (role: string) => {
  const dashboardUrl = getRoleBasedDashboard(role);
  navigate(dashboardUrl);
};
```

---

## Common Features in All Dashboards

✅ **Sidebar Navigation** - Consistent navigation component
✅ **Stats Cards** - Key metrics display
✅ **Responsive Design** - Mobile-friendly layouts
✅ **Form Management** - Add/Edit/Delete operations
✅ **Real-time Data** - API integration with loading states
✅ **Error Handling** - Try-catch blocks for API calls
✅ **Professional Styling** - Consistent color scheme and spacing

---

## CSS Styling

Each dashboard has its own CSS file with:
- Component-specific styling
- Responsive breakpoints (768px for tablets)
- Consistent color scheme
- Button and form styling
- Table and list layouts

**Color Scheme:**
- Primary: `#007bff` (Blue)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Info: `#17a2b8` (Teal)
- Background: `#f5f5f5` (Light Gray)

---

## API Integration Pattern

All dashboards follow this pattern:

```typescript
const [data, setData] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await apiFunction();
    setData(response.data);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};
```

---

## Required Dependencies

- React 18+
- TypeScript
- Axios (for API calls)
- react-router-dom (for routing)
- Existing components (Sidebar, StatsCard, etc.)

---

## Testing Checklist

- [ ] Dashboard loads without errors
- [ ] API data fetches correctly
- [ ] Forms submit and update data
- [ ] Delete operations work
- [ ] Responsive design works on mobile
- [ ] Loading states display
- [ ] Error handling works
- [ ] Navigation between dashboards works
- [ ] Role-based access control enforced

---

## File Structure

```
frontend/src/pages/
├── Dashboard/
│   ├── Dashboard.tsx
│   └── Dashboard.css
├── WardenDashboard/
│   ├── WardenDashboard.tsx
│   └── WardenDashboard.css
├── CareTakerDashboard/
│   ├── CareTakerDashboard.tsx
│   └── CareTakerDashboard.css
├── MessSecretaryDashboard/
│   ├── MessSecretaryDashboard.tsx
│   └── MessSecretaryDashboard.css
├── MessSupervisorDashboard/
│   ├── MessSupervisorDashboard.tsx
│   └── MessSupervisorDashboard.css
└── index.ts (exports all dashboards)
```

---

## Support

For issues or additional features needed in specific dashboards, refer to the corresponding API module in `frontend/src/api/`.
