import axiosInstance from "./axiosInstance";

// ===== Ration Item Management =====
export const addRationItem = (data: {
  name: string;
  unit: string;
  unit_cost: number;
  supplier_id?: number;
}) => axiosInstance.post("/messSupervisor/add-ration-item", data);

export const getRationItems = () =>
  axiosInstance.get("/messSupervisor/get-ration-items");

export const updateRationItem = (
  id: number,
  data: {
    name?: string;
    unit?: string;
    unit_cost?: number;
    supplier_id?: number;
  }
) => axiosInstance.post(`/messSupervisor/update-ration-item/${id}`, data);

export const deleteRationItem = (id: number) =>
  axiosInstance.delete(`/messSupervisor/delete-ration-item/${id}`);

// ===== Consumption Tracking =====
export const getMonthlyConsumption = (month?: number, year?: number) => {
  return axiosInstance.get("/messSupervisor/monthly-consumption", {
    params: { month, year }
  });
};
