import axiosInstance from "./axiosInstance";

// ===== Staff Management =====
export const addStaff = (data: {
  name: string;
  email: string;
  role: string;
  hostel_id: number;
}) => axiosInstance.post("/warden/add-staff", data);

export const getAllStaff = () =>
  axiosInstance.get("/warden/get-all-staff");

export const removeStaff = (id: number) =>
  axiosInstance.delete(`/warden/remove-staff/${id}`);

// ===== Mess Management =====
export const getMessSummary = () =>
  axiosInstance.get("/warden/mess-summary");

export const getAllMessActiveCards = () =>
  axiosInstance.get("/warden/all-mess-active-cards");

export const updateEmailConfig = (messId: number, emailConfig: Record<string, any>) =>
  axiosInstance.post(`/warden/update-email/${messId}`, emailConfig);
