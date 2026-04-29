import axiosInstance from "./axiosInstance";

// ===== Active Cards =====
export const getActiveCards = (date?: string) => {
  return axiosInstance.get("/messSecretary/no-of-active-cards", {
    params: { date }
  });
};

// ===== Net Card (Total/Open/Closed) =====
export const getNetCard = () =>
  axiosInstance.get("/messSecretary/net-card");

// ===== Ration Management =====
export const getRation = (month?: number, year?: number) => {
  return axiosInstance.get("/messSecretary/ration", {
    params: { month, year }
  });
};

export const addRationConsumption = (data: {
  ration_item_id: number;
  quantity: number;
  date: string;
  cost?: number;
}) => axiosInstance.post("/messSecretary/ration-consumption", data);

// ===== Special Meal Management =====
export const getSpecialMealSummary = () =>
  axiosInstance.get("/messSecretary/special-meal-summary");

export const createSpecialMeal = (data: {
  name: string;
  description?: string;
  date: string;
  cost: number;
  max_students?: number;
}) => axiosInstance.post("/messSecretary/special-meal-poll", data);

export const getSpecialMeals = () =>
  axiosInstance.get("/messSecretary/special-meal");

export const addSpecialMealStudent = (specialMealId: number, data: {
  student_id: number;
}) => axiosInstance.post(`/messSecretary/add-special-meal/${specialMealId}`, data);

// ===== Weekly Expense =====
export const addWeeklyExpense = (data: {
  week_start_date: string;
  week_end_date: string;
  description: string;
  amount: number;
  category: string;
}) => axiosInstance.post("/messSecretary/add-weekly-expense", data);

export const getWeeklyExpense = (month?: number, year?: number) => {
  return axiosInstance.get("/messSecretary/get-weekly-expense", {
    params: { month, year }
  });
};
