import axiosInstance from "./axiosInstance";

export const sendOtp = (email: string, role: string) => {
  return axiosInstance.post("/users/send-otp", { email, role });
};

export const verifyOtp = (otp: string, token: string, role: string) => {
  return axiosInstance.post("/users/verify-otp", { otp, token, role });
};