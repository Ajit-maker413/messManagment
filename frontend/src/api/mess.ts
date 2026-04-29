import axiosInstance from "./axiosInstance";

// ===== Student Mess Card Endpoints =====
export const getMessCardView = (month: number, year: number) =>
  axiosInstance.get("/mess/get-card-view", {
    params: { month, year }
  });

export const getMonthlyBill = (month: number, year: number) =>
  axiosInstance.get("/mess/get-monthly-bill", {
    params: { month, year }
  });

export const getYearlyBill = (year: number) =>
  axiosInstance.get("/mess/get-yearly-bill", {
    params: { year }
  });

export const openMessCard = () => axiosInstance.post("/mess/open-mess-card");

export const closeMessCard = () => axiosInstance.post("/mess/close-mess-card");

// ===== Feedback Endpoints =====
export const submitFeedback = (data: {
  food_rating: number;
  hygiene_rating: number;
  comments?: string;
}) => axiosInstance.post("/mess/feedback", data);

export const getFeedback = () => axiosInstance.get("/mess/feedback");

// ===== Special Meal Endpoints =====
export const getSpecialMealHistory = () =>
  axiosInstance.get("/mess/get-special-meal-history");

export const joinSpecialMeal = (special_id: number) =>
  axiosInstance.post("/mess/join-special-meal", { special_id });

// ===== Subscription Endpoints =====
export const addSubscription = (payload: {
  item_name: string;
  cost: number;
  start_date: string;
  end_date: string;
}) => axiosInstance.post("/mess/add-subscription", payload);
