// src/api/overdueBooks.js
import axiosInstance from "./axiosInstance";

export const getOverdueBooks = async () => {
  const response = await axiosInstance.get(`/issues/overdue`);
  return response.data;
};
