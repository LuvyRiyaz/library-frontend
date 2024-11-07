import axios from 'axios';

const API_URL = 'http://localhost:5000/auth/'

export const loginUser = async (user) => {
  const { data } = await axios.post(`${API_URL}login`, user);
  return data;
};
