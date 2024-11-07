import axiosInstance from './axiosInstance';

const fetchOverview = async () => {
  const { data } = await axiosInstance.get('/api/overview');
  return data;
};

export { fetchOverview };
