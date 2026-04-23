import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const getDashboardData = async () => {
  const response = await apiClient.get(API_ENDPOINTS.DASHBOARD);
  return response.data;
};
