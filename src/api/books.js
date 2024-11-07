
// src/api/books.js
import axiosInstance from './axiosInstance'; // Import the configured axios instance


export const fetchBooks = async () => {
  // No need to manually add headers here; axiosInstance handles it
  const response = await axiosInstance.get(`/books/getbooks`);
  return response.data;
};

export const addBook = async (book) => {
  // No need to manually add headers here; axiosInstance handles it
  const response = await axiosInstance.post(`books/addbook`, book);
  return response.data;
};

export const uploadBooksFromExcel = async (formData) => {
  const response = await axiosInstance.post('/api/books/excel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};