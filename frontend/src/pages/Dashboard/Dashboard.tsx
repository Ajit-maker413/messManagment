import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCard from "../../components/StatsCard/StatsCard";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import SpecialMealCard from "../../components/SpecialMealCard/SpecialMealCard";
import FeedbackTable from "../../components/FeedbackTable/FeedbackTable";
import MessCard from "../../components/MessCard/MessCard";

import "./Dashboard.css";
import {
  getMessCardView,
  getMonthlyBill,
  getYearlyBill,
  getFeedback,
  openMessCard,
  closeMessCard,
  joinSpecialMeal
} from "../../api/mess";

const Dashboard = () => {
  const [messCardData, setMessCardData] = useState<any>(null);
  const [monthlyBill, setMonthlyBill] = useState<any>(null);
  const [yearlyBill, setYearlyBill] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth, selectedYear]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [cardRes, billRes, yearRes, feedbackRes] = await Promise.all([
        getMessCardView(selectedMonth, selectedYear),
        getMonthlyBill(selectedMonth, selectedYear),
        getYearlyBill(selectedYear),
        getFeedback()
      ]);

      setMessCardData(cardRes.data);
      setMonthlyBill(billRes.data);
      setYearlyBill(yearRes.data);
      setFeedbacks(feedbackRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMessCard = async () => {
    try {
      await openMessCard();
      fetchDashboardData();
    } catch (error) {
      console.error("Error opening mess card:", error);
    }
  };

  const handleCloseMessCard = async () => {
    try {
      await closeMessCard();
      fetchDashboardData();
    } catch (error) {
      console.error("Error closing mess card:", error);
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="content">

        <h1>Student Dashboard</h1>
        <p style={{ color: "#666" }}>
          Welcome back! Here's your dining activity.
        </p>

        {/* STATS */}
        <div className="stats-container">
          <StatsCard title="Monthly Bill" value={`$${monthlyBill?.total || 0}`} />
          <StatsCard title="Yearly Bill" value={`$${yearlyBill?.total || 0}`} />
          <StatsCard title="Active Days" value={messCardData?.summary?.total_active_days || "0"} />
        </div>

        {/* GRAPH */}
        <div className="card">
          <ExpenseChart />
        </div>

        {/* LOWER SECTION */}
        <div className="row">

          <div className="card">
            <div className="card-header">
              <h3>Special Meals</h3>
              <span className="link">View All</span>
            </div>

            <SpecialMealCard
              title="Festive Night Dinner"
              date="Friday, Oct 20 • 7:30 PM"
              status="Limited Slots"
            />
            <SpecialMealCard
              title="Chef's Pasta Special"
              date="Monday, Oct 23 • 12:30 PM"
              status="Open"
            />
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Feedback History</h3>
              <span className="link">Submit New</span>
            </div>

            <FeedbackTable feedbacks={feedbacks} />
          </div>

        </div>

        {/* MESS CARD MANAGEMENT */}
        <div className="card">
          <div className="card-header">
            <h3>Mess Card Actions</h3>
          </div>
          <div className="card-actions">
            <button className="btn-primary" onClick={handleOpenMessCard}>
              Open New Mess Card
            </button>
            <button className="btn-secondary" onClick={handleCloseMessCard}>
              Close Mess Card
            </button>
          </div>
        </div>

        {/* MESS CARD */}
        {messCardData && (
          <MessCard
            studentName="Student"
            messData={messCardData}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;