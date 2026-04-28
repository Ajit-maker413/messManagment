import axiosInstance from "./axiosInstance";

export const logoutApi = () => axiosInstance.post("/users/logout");
