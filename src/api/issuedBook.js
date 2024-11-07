import axiosInstance from "./axiosInstance";

export const issueBook = async (issueDetails) => {
    const response = await axiosInstance.post(`/issues/issuebook`, issueDetails)
    return response.data;
  };

  export const getIssueBook = async () => {
    const response = await axiosInstance.get(`issues/getIssuedBook`, )
    return response.data;
  };