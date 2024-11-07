import axiosInstance from "./axiosInstance";

export const fetchEmployees = async () => {
  const response = await axiosInstance.get(`employees/getemployee`);
  return response.data;
};

export const addEmployee = async (newEmployee) => {
  const response = await axiosInstance.post(`employees/addemployee`, newEmployee)
  return response.data;
};


