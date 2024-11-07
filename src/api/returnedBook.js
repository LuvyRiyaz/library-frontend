import axiosInstance from "./axiosInstance";

export const returnBook = async (getReturnDetails) => {
  const response = await axiosInstance.post(`/issues/return`, getReturnDetails);
  return response.data;
};

export const getReturnedBooks = async () => {
  const response = await axiosInstance.get(`/issues/getReturnedBook`);
  return response.data;
};
